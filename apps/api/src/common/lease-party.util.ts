import { ForbiddenException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { normalizeEmail } from "./email.util";
import { emailNotVerified } from "./email-verified.util";

export interface LeasePartyFlags {
  /** Propriétaire du bien */
  isOwner: boolean;
  /** Locataire principal (e-mail du bail ou auteur de la demande d'origine) */
  isPrincipalTenant: boolean;
  /** Colocataire déclaré sur le bail */
  isCoTenant: boolean;
  /** Locataire principal OU colocataire */
  isTenant: boolean;
}

/**
 * Règle pure de rattachement d'un utilisateur à un bail.
 * Le rattachement côté locataire repose sur l'e-mail : il n'est reconnu que
 * si l'e-mail du compte est VÉRIFIÉ (sinon un usurpateur qui s'inscrit avec
 * l'adresse saisie par le propriétaire pourrait donner congé, signer un
 * avenant, lire les attestations…).
 */
export function leasePartyFlags(
  lease: {
    tenantEmail: string;
    property: { ownerId: string };
    inquiry?: { senderId: string } | null;
    coTenants: Array<{ email: string }>;
  },
  user: { id: string; email: string; emailVerifiedAt: Date | null },
): LeasePartyFlags {
  const isOwner = lease.property.ownerId === user.id;
  const verified = !!user.emailVerifiedAt;
  const email = normalizeEmail(user.email);
  const isPrincipalTenant =
    verified &&
    !isOwner &&
    (normalizeEmail(lease.tenantEmail) === email || lease.inquiry?.senderId === user.id);
  const isCoTenant =
    verified && !isOwner && !isPrincipalTenant && lease.coTenants.some((c) => normalizeEmail(c.email) === email);
  return { isOwner, isPrincipalTenant, isCoTenant, isTenant: isPrincipalTenant || isCoTenant };
}

/**
 * Résout la position de l'utilisateur vis-à-vis d'un bail : propriétaire du
 * bien, locataire principal ou colocataire. Lève 403 si l'utilisateur n'est
 * aucune des parties.
 */
export async function resolveLeaseParty(
  prisma: PrismaService,
  leaseId: string,
  user: { sub: string },
) {
  const [lease, account] = await Promise.all([
    prisma.leaseContract.findUnique({
      where: { id: leaseId },
      include: {
        property: {
          select: {
            id: true,
            ownerId: true,
            title: true,
            status: true,
            owner: { select: { id: true, email: true, firstName: true, lastName: true } },
          },
        },
        inquiry: { select: { senderId: true } },
        coTenants: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: user.sub },
      select: { id: true, email: true, emailVerifiedAt: true },
    }),
  ]);
  if (!account) throw new UnauthorizedException("Session expirée — reconnectez-vous.");
  if (!lease) throw new NotFoundException("Bail introuvable");

  const flags = leasePartyFlags(lease, account);
  if (!flags.isOwner && !flags.isTenant) {
    if (!account.emailVerifiedAt) throw emailNotVerified();
    throw new ForbiddenException("Vous n'êtes pas partie à ce bail.");
  }
  return { lease, account, ...flags };
}
