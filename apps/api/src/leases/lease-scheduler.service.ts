import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { LeasesService } from "./leases.service";
import { addDays, APP_TIME_ZONE, diffDays, formatDayFr, today as todayDay } from "../common/dates";
import { withAdvisoryLock } from "../common/advisory-lock";
import { RUNNING_LEASE_STATUSES, endStatus } from "./lease-rules";

/**
 * LeaseSchedulerService — une fois par jour à 08:00 (heure de Paris), sous
 * verrou consultatif PostgreSQL (une seule exécution, même avec plusieurs
 * réplicas). Plus de second déclenchement depuis main.ts (doublons d'e-mails).
 *
 *  - SIGNED → ACTIVE le jour du début du bail ;
 *  - avenants signés appliqués à leur date d'effet ;
 *  - expiration le LENDEMAIN du dernier jour (EXPIRED, ou TERMINATED après
 *    congé/préavis), le bien n'étant republié que si plus aucun bail ne
 *    court dessus ;
 *  - alertes J-7 et J-1 aux deux parties, une seule fois chacune (marqueurs).
 */
@Injectable()
export class LeaseSchedulerService {
  private readonly logger = new Logger(LeaseSchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly leases: LeasesService,
  ) {}

  @Cron("0 8 * * *", { timeZone: APP_TIME_ZONE })
  async runChecks(): Promise<void> {
    if (process.env.DISABLE_SCHEDULERS === "1") return;
    await withAdvisoryLock(this.prisma, "leases-daily", async () => {
      const day = todayDay();
      await this.activateStarted(day);
      await this.applyDueAmendments(day);
      await this.expireLeases(day);
      await this.notifyUpcomingExpiries(day);
    });
  }

  /** SIGNED → ACTIVE dès que le jour de début est atteint. */
  async activateStarted(day: Date): Promise<number> {
    const { count } = await this.prisma.leaseContract.updateMany({
      where: { status: "SIGNED", startDate: { lte: day } },
      data: { status: "ACTIVE" },
    });
    if (count > 0) this.logger.log(`${count} bail(s) passé(s) en cours (ACTIVE).`);
    return count;
  }

  /** Avenants signés dont la date d'effet est atteinte. */
  async applyDueAmendments(day: Date): Promise<number> {
    const due = await this.prisma.leaseAmendment.findMany({
      where: {
        tenantSignedAt: { not: null },
        ownerSignedAt: { not: null },
        appliedAt: null,
        effectiveDate: { lte: day },
        lease: { status: { in: RUNNING_LEASE_STATUSES } },
      },
      select: { id: true },
    });
    let n = 0;
    for (const a of due) if (await this.leases.applyAmendment(a.id)) n++;
    if (n > 0) this.logger.log(`${n} avenant(s) appliqué(s) à leur date d'effet.`);
    return n;
  }

  /** Alertes de fin de bail J-7 et J-1, une seule fois chacune. */
  private async notifyUpcomingExpiries(day: Date): Promise<void> {
    const leases = await this.prisma.leaseContract.findMany({
      where: {
        status: { in: RUNNING_LEASE_STATUSES },
        endDate: { gte: day, lte: addDays(day, 7) },
        OR: [{ expiryReminder7At: null }, { expiryReminder1At: null }],
      },
      include: {
        property: {
          include: { owner: { select: { email: true, firstName: true, lastName: true } } },
        },
      },
    });

    for (const lease of leases) {
      const daysLeft = diffDays(lease.endDate!, day);
      let kind: "J1" | "J7" | null = null;
      if (daysLeft <= 1 && !lease.expiryReminder1At) kind = "J1";
      else if (daysLeft > 1 && !lease.expiryReminder7At) kind = "J7";
      if (!kind) continue;

      // Réservation atomique du marqueur AVANT l'envoi : jamais de doublon.
      const { count } = await this.prisma.leaseContract.updateMany({
        where:
          kind === "J1"
            ? { id: lease.id, expiryReminder1At: null }
            : { id: lease.id, expiryReminder7At: null },
        data:
          kind === "J1"
            ? { expiryReminder1At: new Date(), expiryReminder7At: lease.expiryReminder7At ?? new Date() }
            : { expiryReminder7At: new Date() },
      });
      if (count === 0) continue;

      this.logger.log(
        `[FIN DE BAIL J-${daysLeft}] bail ${lease.id} (« ${lease.property.title} », fin le ${formatDayFr(lease.endDate!)}).`,
      );
      await this.mailer.leaseExpiry(
        lease.property.owner.email,
        `${lease.property.owner.firstName} ${lease.property.owner.lastName}`.trim(),
        lease.property.title,
        daysLeft,
        true,
      );
      await this.mailer.leaseExpiry(
        lease.tenantEmail,
        `${lease.tenantFirstName} ${lease.tenantLastName}`.trim(),
        lease.property.title,
        daysLeft,
        false,
      );
    }
  }

  /**
   * Expire les baux dont le dernier jour est passé (sur la seule date de fin,
   * quel que soit le statut du bien). Le bien ne repasse en PUBLISHED que
   * s'il était RENTED et qu'aucun autre bail signé ne court dessus.
   */
  private async expireLeases(day: Date): Promise<void> {
    const expired = await this.prisma.leaseContract.findMany({
      where: {
        status: { in: RUNNING_LEASE_STATUSES },
        endDate: { lt: day },
      },
      include: {
        property: {
          include: { owner: { select: { email: true, firstName: true, lastName: true } } },
        },
      },
    });

    for (const lease of expired) {
      const republished = await this.prisma.$transaction(async (tx) => {
        await tx.leaseContract.update({
          where: { id: lease.id },
          data: { status: endStatus(lease) },
        });
        const others = await tx.leaseContract.count({
          where: {
            propertyId: lease.propertyId,
            id: { not: lease.id },
            status: { in: RUNNING_LEASE_STATUSES },
          },
        });
        if (others > 0) return false;
        const { count } = await tx.property.updateMany({
          where: { id: lease.propertyId, status: "RENTED" },
          data: { status: "PUBLISHED" },
        });
        return count > 0;
      });

      this.logger.log(
        `[EXPIRATION] Bail ${lease.id} terminé (dernier jour : ${formatDayFr(lease.endDate!)}).` +
          (republished ? ` Bien ${lease.propertyId} republié.` : ""),
      );

      await this.mailer.leaseExpired(
        lease.property.owner.email,
        `${lease.property.owner.firstName} ${lease.property.owner.lastName}`.trim(),
        lease.property.title,
        true,
      );
      await this.mailer.leaseExpired(
        lease.tenantEmail,
        `${lease.tenantFirstName} ${lease.tenantLastName}`.trim(),
        lease.property.title,
        false,
      );
    }

    if (expired.length > 0) {
      this.logger.log(`[EXPIRATION] ${expired.length} bail(s) expiré(s) traité(s).`);
    }
  }
}
