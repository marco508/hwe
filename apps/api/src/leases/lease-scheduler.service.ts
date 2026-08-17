import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";

/**
 * LeaseSchedulerService
 *
 * Tâches planifiées liées aux baux :
 *  - Notification d'approche de fin (J-7 et J-1) → propriétaire + locataire
 *  - Remise en libre du bien quand la date de fin est dépassée
 */
@Injectable()
export class LeaseSchedulerService {
  private readonly logger = new Logger(LeaseSchedulerService.name);

  // Nombre de jours avant la fin pour envoyer les alertes
  private readonly ALERT_DAYS = [7, 1];

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  /** Vérification quotidienne des baux actifs. */
  @Cron("0 8 * * *")
  async runChecks(): Promise<void> {
    await Promise.all([
      this.notifyUpcomingExpiries(),
      this.expireLeases(),
    ]);
  }

  /**
   * Notifie les deux parties quand la fin de bail approche (J-7 et J-1).
   * En production, remplacer les logger.log par l'envoi d'emails / push.
   */
  private async notifyUpcomingExpiries(): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const daysLeft of this.ALERT_DAYS) {
      const target = new Date(today);
      target.setDate(target.getDate() + daysLeft);
      const targetEnd = new Date(target);
      targetEnd.setHours(23, 59, 59, 999);

      const leases = await this.prisma.leaseContract.findMany({
        where: {
          status: { in: ["ACTIVE", "SIGNED", "DRAFT"] },
          endDate: { gte: target, lte: targetEnd },
        },
        include: {
          property: {
            include: { owner: { select: { email: true, firstName: true, lastName: true } } },
          },
        },
      });

      for (const lease of leases) {
        const endLabel = new Date(lease.endDate!).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        this.logger.log(
          `[FIN DE BAIL J-${daysLeft}] « ${lease.property.title} » (${endLabel}) — ` +
          `propriétaire ${lease.property.owner.email}, locataire ${lease.tenantEmail}`,
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
  }

  /**
   * Repasse en PUBLISHED (et le bail en EXPIRED) tout bien dont la date de
   * fin de bail est dépassée et dont le statut est encore RENTED.
   */
  private async expireLeases(): Promise<void> {
    const now = new Date();

    // Trouver les baux expirés dont le bien est encore RENTED
    const expiredLeases = await this.prisma.leaseContract.findMany({
      where: {
        status: { in: ["ACTIVE", "SIGNED", "DRAFT"] },
        endDate: { lt: now },
        property: { status: "RENTED" },
      },
      include: {
        property: {
          include: { owner: { select: { email: true, firstName: true, lastName: true } } },
        },
      },
    });

    for (const lease of expiredLeases) {
      await this.prisma.$transaction(async (tx) => {
        // Bail → EXPIRED
        await tx.leaseContract.update({
          where: { id: lease.id },
          data: { status: "EXPIRED" },
        });

        // Bien → PUBLISHED (réapparaît dans les annonces)
        await tx.property.update({
          where: { id: lease.propertyId },
          data: { status: "PUBLISHED" },
        });
      });

      const endLabel = new Date(lease.endDate!).toLocaleDateString("fr-FR", {
        day: "numeric", month: "long", year: "numeric",
      });

      this.logger.log(
        `[EXPIRATION] Bail ${lease.id} expiré le ${endLabel}. ` +
        `Bien « ${lease.property.title} » (${lease.propertyId}) repassé en PUBLISHED.`,
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

    if (expiredLeases.length > 0) {
      this.logger.log(`[EXPIRATION] ${expiredLeases.length} bail(s) expiré(s) traité(s).`);
    }
  }
}
