import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

/**
 * LeaseSchedulerService
 *
 * Tâches planifiées liées aux baux :
 *  - Notification d'approche de fin (J-7 et J-1) → propriétaire + locataire
 *  - Remise en libre du bien quand la date de fin est dépassée
 *
 * NestJS @nestjs/schedule n'est pas encore ajouté aux dépendances ;
 * ce service expose une méthode `runChecks()` qui doit être appelée
 * depuis un cron externe (ex. setInterval dans main.ts, ou après
 * l'ajout de @nestjs/schedule).
 *
 * Pour activer le scheduler NestJS natif, installer le package :
 *   pnpm add @nestjs/schedule
 * puis décommenter les décorateurs @Cron ci-dessous et enregistrer
 * ScheduleModule.forRoot() dans AppModule.
 */
@Injectable()
export class LeaseSchedulerService {
  private readonly logger = new Logger(LeaseSchedulerService.name);

  // Nombre de jours avant la fin pour envoyer les alertes
  private readonly ALERT_DAYS = [7, 1];

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Vérification quotidienne des baux actifs.
   * À appeler via @Cron("0 8 * * *") ou depuis un setInterval.
   */
  // @Cron("0 8 * * *")  // ← décommenter avec @nestjs/schedule
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

        // ── Notification propriétaire ──────────────────────────────────────
        this.logger.log(
          `[NOTIF PROPRIÉTAIRE] ${lease.property.owner.email} — ` +
          `Bail du bien « ${lease.property.title } » se termine dans ${daysLeft} jour(s) (${endLabel}). ` +
          `Locataire : ${lease.tenantFirstName} ${lease.tenantLastName} <${lease.tenantEmail}>`,
        );
        // TODO: await this.mailer.send({ to: lease.property.owner.email, template: "lease-expiry-owner", ... })

        // ── Notification locataire ─────────────────────────────────────────
        this.logger.log(
          `[NOTIF LOCATAIRE] ${lease.tenantEmail} — ` +
          `Votre bail pour « ${lease.property.title} » se termine dans ${daysLeft} jour(s) (${endLabel}).`,
        );
        // TODO: await this.mailer.send({ to: lease.tenantEmail, template: "lease-expiry-tenant", ... })
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
          include: { owner: { select: { email: true, firstName: true } } },
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

      // ── Notification finale propriétaire ──────────────────────────────
      this.logger.log(
        `[NOTIF PROPRIÉTAIRE] ${lease.property.owner.email} — ` +
        `Le bail de « ${lease.property.title} » a expiré. Le bien est de nouveau disponible à la location.`,
      );
      // TODO: await this.mailer.send({ to: lease.property.owner.email, template: "lease-expired-owner", ... })

      // ── Notification finale locataire ──────────────────────────────────
      this.logger.log(
        `[NOTIF LOCATAIRE] ${lease.tenantEmail} — ` +
        `Votre bail pour « ${lease.property.title} » a pris fin.`,
      );
      // TODO: await this.mailer.send({ to: lease.tenantEmail, template: "lease-expired-tenant", ... })
    }

    if (expiredLeases.length > 0) {
      this.logger.log(`[EXPIRATION] ${expiredLeases.length} bail(s) expiré(s) traité(s).`);
    }
  }
}
