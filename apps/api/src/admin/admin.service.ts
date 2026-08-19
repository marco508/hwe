import { Injectable, NotFoundException } from "@nestjs/common";
import { PropertyStatus, Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

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
    return {
      users: Object.fromEntries(usersByRole.map((r) => [r.role, r._count._all])),
      properties: Object.fromEntries(propsByStatus.map((p) => [p.status, p._count._all])),
      leases,
      ticketsOpen,
      inquiries,
      usersUnverified: unverified,
    };
  }

  /** Recherche d'utilisateurs (e-mail ou nom), avec volumes d'activité. */
  users(q?: string, role?: Role) {
    return this.prisma.user.findMany({
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
        createdAt: true,
        _count: { select: { properties: true, inquiries: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
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
    return { ok: true };
  }

  /** Modération : forcer le statut d'une annonce (retrait, archivage…). */
  async setPropertyStatus(propertyId: string, status: PropertyStatus) {
    const property = await this.prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new NotFoundException("Annonce introuvable");
    return this.prisma.property.update({
      where: { id: propertyId },
      data: { status },
    });
  }
}
