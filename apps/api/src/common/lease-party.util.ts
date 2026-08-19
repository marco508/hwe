import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

/**
 * Résout la position de l'utilisateur vis-à-vis d'un bail : propriétaire du
 * bien, ou locataire (rattaché par e-mail de contact ou par la demande
 * d'origine). Lève 403 si l'utilisateur n'est aucune des deux parties.
 */
export async function resolveLeaseParty(
  prisma: PrismaService,
  leaseId: string,
  user: { sub: string; email: string },
) {
  const lease = await prisma.leaseContract.findUnique({
    where: { id: leaseId },
    include: {
      property: {
        include: {
          owner: { select: { id: true, email: true, firstName: true } },
        },
      },
      inquiry: { select: { senderId: true } },
      coTenants: true,
    },
  });
  if (!lease) throw new NotFoundException("Bail introuvable");

  const isOwner = lease.property.ownerId === user.sub;
  const isTenant =
    lease.tenantEmail === user.email ||
    lease.inquiry?.senderId === user.sub ||
    lease.coTenants.some((c) => c.email === user.email);
  if (!isOwner && !isTenant) {
    throw new ForbiddenException("Vous n'êtes pas partie à ce bail");
  }
  return { lease, isOwner, isTenant };
}
