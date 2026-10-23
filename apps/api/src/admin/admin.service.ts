import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PropertyStatus, Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";

@Injectable()
export class AdminService {
  private readonly logger = new Logger("Admin");

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  /** Chiffres clés de la plateforme, pour le tableau de bord admin. */
  async overview() {
    const [usersByRole, propsByStatus, leases, ticketsOpen, inquiries, unverified] =
      await Promise.all([
        this.prisma.user.groupBy({ by: ["role"], _count: { _all: true } }),
        this.prisma.property.groupBy({ by: ["status"], _count: { _all: true } }),
        this.prisma.leaseContract.count(),
        this.prisma.ticket.count({ where: { status: { not: "RESOLVED" } } }),
        this.prisma.inquiry.count(),
        this.prisma.user.count({ where: { emailVerifiedAt: null } }),
      ]);
    const [agencies, activeMandates, usersNotActivated] = await Promise.all([
      this.prisma.agency.count(),
      this.prisma.mandate.count({ where: { status: "ACTIVE" } }),
      this.prisma.user.count({ where: { activatedAt: null } }),
    ]);
    return {
      users: Object.fromEntries(usersByRole.map((r) => [r.role, r._count._all])),
      properties: Object.fromEntries(propsByStatus.map((p) => [p.status, p._count._all])),
      leases,
      ticketsOpen,
      inquiries,
      usersUnverified: unverified,
      agencies,
      activeMandates,
      usersNotActivated,
      // Sans SMTP, aucun e-mail ne part (vérification, réinitialisation, relances).
      smtpConfigured: this.mailer.isConfigured,
    };
  }

  /** Recherche d'utilisateurs (e-mail ou nom), avec volumes d'activité. */
  async users(q?: string, role?: Role) {
    const rows = await this.prisma.user.findMany({
      where: {
        ...(role ? { role } : {}),
        ...(q
          ? {
              OR: [
                { email: { contains: q, mode: "insensitive" } },
                { firstName: { contains: q, mode: "insensitive" } },
                { lastName: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        emailVerifiedAt: true,
        activatedAt: true,
        createdAt: true,
        _count: { select: { properties: true, inquiries: true } },
        agencyMember: { select: { role: true, agency: { select: { id: true, name: true, slug: true } } } },
        invitedByAgency: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    // Agence affichée dans la liste : celle du pro, ou celle qui a invité le propriétaire.
    return rows.map(({ agencyMember, ...u }) => ({
      ...u,
      agency: agencyMember ? { ...agencyMember.agency, role: agencyMember.role } : null,
    }));
  }

  /** Annonces, filtrables par statut ou texte — pour la modération. */
  properties(q?: string, status?: PropertyStatus) {
    return this.prisma.property.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { city: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        title: true,
        city: true,
        status: true,
        listingType: true,
        price: true,
        createdAt: true,
        owner: { select: { id: true, email: true, firstName: true, lastName: true } },
        _count: { select: { inquiries: true, leases: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  /** Validation manuelle d'un e-mail (compte bloqué, lien perdu…). */
  async verifyUserEmail(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("Utilisateur introuvable");
    if (user.emailVerifiedAt) return { ok: true, alreadyVerified: true };
    await this.prisma.user.update({
      where: { id: userId },
      data: { emailVerifiedAt: new Date() },
    });
    this.logger.log(`E-mail du compte ${userId} validé manuellement par un administrateur.`);
    return { ok: true };
  }

  /** Modération : forcer le statut d'une annonce (retrait, archivage…). */
  async setPropertyStatus(propertyId: string, status: PropertyStatus) {
    const property = await this.prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new NotFoundException("Annonce introuvable");
    this.logger.log(`Annonce ${propertyId} : statut ${property.status} → ${status} (modération).`);
    return this.prisma.property.update({
      where: { id: propertyId },
      data: { status },
      select: { id: true, title: true, city: true, status: true, listingType: true, price: true, createdAt: true },
    });
  }
}
