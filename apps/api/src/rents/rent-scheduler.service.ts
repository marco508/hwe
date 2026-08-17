import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { RentsService, periodLabel } from "./rents.service";

/**
 * Tâches planifiées liées aux loyers :
 *  - génération de l'échéance du mois courant pour chaque bail actif
 *    (le rattrapage des mois passés est fait à la volée par RentsService) ;
 *  - passage DUE → LATE des échéances dépassées ;
 *  - rappels e-mail au locataire (J-3 avant échéance, puis en retard),
 *    avec `remindedAt` pour ne pas relancer plus d'une fois par semaine.
 */
@Injectable()
export class RentSchedulerService {
  private readonly logger = new Logger(RentSchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rents: RentsService,
    private readonly mailer: MailerService,
  ) {}

  @Cron("0 7 * * *")
  async runDaily(): Promise<void> {
    await this.generateCurrentPeriods();
    await this.markLate();
    await this.sendReminders();
  }

  private async generateCurrentPeriods(): Promise<void> {
    const now = new Date();
    const leases = await this.prisma.leaseContract.findMany({
      where: {
        status: { in: ["ACTIVE", "SIGNED"] },
        startDate: { lte: now },
        OR: [{ endDate: null }, { endDate: { gte: now } }],
      },
      select: { id: true },
    });
    let created = 0;
    for (const lease of leases) {
      const p = await this.rents.ensurePeriod(lease.id, now.getUTCFullYear(), now.getUTCMonth() + 1);
      if (p) created++;
    }
    if (created > 0) this.logger.log(`${created} échéance(s) de loyer générée(s) pour ${periodLabel(now.getUTCFullYear(), now.getUTCMonth() + 1)}.`);
  }

  private async markLate(): Promise<void> {
    const { count } = await this.prisma.rentPeriod.updateMany({
      where: { status: "DUE", dueDate: { lt: new Date() } },
      data: { status: "LATE" },
    });
    if (count > 0) this.logger.log(`${count} loyer(s) passé(s) en retard.`);
  }

  private async sendReminders(): Promise<void> {
    const now = new Date();
    const soon = new Date(now.getTime() + 3 * 24 * 3600 * 1000);
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
        lease: { select: { tenantEmail: true, tenantFirstName: true, tenantLastName: true } },
      },
      take: 200,
    });

    for (const p of periods) {
      await this.mailer.rentReminder(
        p.lease.tenantEmail,
        `${p.lease.tenantFirstName} ${p.lease.tenantLastName}`.trim(),
        periodLabel(p.periodYear, p.periodMonth),
        p.amount,
        p.status === "LATE",
      );
      await this.prisma.rentPeriod.update({
        where: { id: p.id },
        data: { remindedAt: now },
      });
    }
    if (periods.length > 0) this.logger.log(`${periods.length} rappel(s) de loyer envoyé(s).`);
  }
}
