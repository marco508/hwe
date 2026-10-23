import { ForbiddenException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { normalizeEmail } from "./email.util";
import { emailNotVerified } from "./email-verified.util";
import {
  AccessAction,
  AccessContext,
  AccessDecision,
  accessDenied,
  decideAccess,
  loadAccessContext,
} from "./property-access";

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
 * bien, professionnel mandataire autorisé (PropertyAccessService), locataire
 * principal ou colocataire. Lève 403 si l'utilisateur n'est aucune des
 * parties.
 *
 * `proAction` : droit exigé d'un professionnel pour être reconnu « côté
 * bailleur » (READ par défaut ; un mandat LETTING terminé ne garde que
 * LEASE_READ).
 */
export async function resolveLeaseParty(
  prisma: PrismaService,
  leaseId: string,
  user: { sub: string },
  proAction: AccessAction = "READ",
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
  // Côté bailleur : propriétaire, ou pro mandataire autorisé.
  let access: AccessContext | null = null;
  let isAgent = false;
  if (!flags.isOwner && !flags.isTenant) {
    access = await loadAccessContext(prisma, lease.propertyId, account.id);
    isAgent = decideAccess(access, proAction).allowed;
  }
  if (!flags.isOwner && !flags.isTenant && !isAgent) {
    if (!account.emailVerifiedAt && !access?.membership) throw emailNotVerified();
    throw new ForbiddenException("Vous n'êtes pas partie à ce bail.");
  }
  const ctx: AccessContext =
    access ??
    ({
      userId: account.id,
      property: { id: lease.property.id, ownerId: lease.property.ownerId },
      ownerActivated: true,
      membership: null,
      mandate: null,
      today: new Date(),
    } satisfies AccessContext);
  /** Décision côté bailleur pour une action (propriétaire : toujours autorisé). */
  const can = (action: AccessAction): AccessDecision => decideAccess(ctx, action);
  /** Idem, lève une 403 normalisée en cas de refus. */
  const must = (action: AccessAction): AccessDecision => {
    const d = can(action);
    if (!d.allowed) throw accessDenied(d);
    return d;
  };
  return {
    lease,
    account,
    ...flags,
    /** Propriétaire OU pro mandataire autorisé */
    isLandlord: flags.isOwner || isAgent,
    /** Pro mandataire (pas le propriétaire) */
    isAgent,
    access: ctx,
    can,
    must,
  };
}
