import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { RentsService, periodLabel } from "./rents.service";
import { addDays, APP_TIME_ZONE, today as todayDay } from "../common/dates";
import { withAdvisoryLock } from "../common/advisory-lock";

/**
 * Tâches planifiées liées aux loyers (07:00, heure de Paris) :
 *  - génération des échéances manquantes de chaque bail signé (une requête
 *    par bail, idempotente) ;
 *  - passage DUE → LATE des échéances dont le JOUR d'échéance est passé
 *    (jamais le jour même) ;
 *  - rappels e-mail au locataire (J-3 avant échéance, puis en retard),
 *    avec `remindedAt` pour ne pas relancer plus d'une fois par semaine.
 * Verrou consultatif PostgreSQL : jamais deux exécutions simultanées.
 */
@Injectable()
export class RentSchedulerService implements OnApplicationBootstrap {
  private readonly logger = new Logger(RentSchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rents: RentsService,
    private readonly mailer: MailerService,
  ) {}

  /**
   * Au démarrage : uniquement la génération des échéances (idempotente,
   * sans e-mail), pour qu'un déploiement ne laisse pas de mois manquant
   * jusqu'au prochain passage du planificateur.
   */
  onApplicationBootstrap() {
    if (process.env.DISABLE_SCHEDULERS === "1") return;
    setTimeout(() => {
      withAdvisoryLock(this.prisma, "rents-generate", async () => {
        const n = await this.rents.generateAll();
        if (n > 0) this.logger.log(`${n} échéance(s) de loyer générée(s) au démarrage.`);
      }).catch((e) => this.logger.error(`Génération au démarrage : ${(e as Error).message}`));
    }, 5_000).unref();
  }

  @Cron("0 7 * * *", { timeZone: APP_TIME_ZONE })
  async runDaily(): Promise<void> {
    if (process.env.DISABLE_SCHEDULERS === "1") return;
    await withAdvisoryLock(this.prisma, "rents-daily", async () => {
      const day = todayDay();
      const created = await this.rents.generateAll(day);
      if (created > 0) this.logger.log(`${created} échéance(s) de loyer générée(s).`);
      await this.markLate(day);
      await this.sendReminders(day);
    });
  }

  /** En retard le LENDEMAIN du jour d'échéance. */
  async markLate(day: Date = todayDay()): Promise<number> {
    const { count } = await this.prisma.rentPeriod.updateMany({
      where: { status: "DUE", dueDate: { lt: day } },
      data: { status: "LATE" },
    });
    if (count > 0) this.logger.log(`${count} loyer(s) passé(s) en retard.`);
    return count;
  }

  private async sendReminders(day: Date): Promise<void> {
    const now = new Date();
    const soon = addDays(day, 3);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);

    const periods = await this.prisma.rentPeriod.findMany({
      where: {
        OR: [
          { status: "LATE" },
          { status: "DUE", dueDate: { lte: soon } },
        ],
        AND: [{ OR: [{ remindedAt: null }, { remindedAt: { lt: weekAgo } }] }],
        lease: { status: { in: ["ACTIVE", "SIGNED"] } },
      },
      include: {
        lease: { select: { tenantEmail: true, tenantFirstName: true, tenantLastName: true, currency: true } },
      },
      take: 200,
    });

    for (const p of periods) {
      // Marqueur posé AVANT l'envoi : jamais de doublon, même en cas de reprise.
      await this.prisma.rentPeriod.update({
        where: { id: p.id },
        data: { remindedAt: now },
      });
      await this.mailer.rentReminder(
        p.lease.tenantEmail,
        `${p.lease.tenantFirstName} ${p.lease.tenantLastName}`.trim(),
        periodLabel(p.periodYear, p.periodMonth),
        p.amount,
        p.status === "LATE",
        p.lease.currency,
      );
    }
    if (periods.length > 0) this.logger.log(`${periods.length} rappel(s) de loyer envoyé(s).`);
  }
}
