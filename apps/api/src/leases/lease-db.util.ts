import { ConflictException } from "@nestjs/common";
import { LeaseStatus, Prisma } from "@prisma/client";
import { OPEN_LEASE_STATUSES, rangesOverlap } from "./lease-rules";

/** Coordonnées du propriétaire visibles des PARTIES au bail (jamais du public). */
export const LEASE_OWNER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  avatarKey: true,
} as const;

/**
 * Objet bail complet, identique pour la liste et toutes les mutations :
 * colocataires, avenants, attestations (sans fichier), bien (sans médias).
 */
export const LEASE_FULL_INCLUDE = {
  coTenants: { orderBy: { createdAt: "asc" as const } },
  amendments: { orderBy: { createdAt: "desc" as const } },
  insurances: {
    select: { id: true, validUntil: true, uploadedAt: true },
    orderBy: { validUntil: "desc" as const },
  },
  property: { include: { owner: { select: LEASE_OWNER_SELECT } } },
} satisfies Prisma.LeaseContractInclude;

/**
 * Refuse (409) un bail qui chevaucherait un autre bail ouvert du même bien.
 * À appeler dans une transaction après `lockKey(tx, "property:<id>")`.
 */
export async function assertNoLeaseOverlap(
  tx: Prisma.TransactionClient,
  propertyId: string,
  start: Date,
  end: Date | null,
  opts: { excludeLeaseId?: string; statuses?: LeaseStatus[] } = {},
): Promise<void> {
  const others = await tx.leaseContract.findMany({
    where: {
      propertyId,
      status: { in: opts.statuses ?? OPEN_LEASE_STATUSES },
      ...(opts.excludeLeaseId ? { id: { not: opts.excludeLeaseId } } : {}),
    },
    select: { id: true, startDate: true, endDate: true, status: true },
  });
  const clash = others.find((o) => rangesOverlap(start, end, o.startDate, o.endDate));
  if (clash) {
    throw new ConflictException({
      statusCode: 409,
      code: "LEASE_OVERLAP",
      message:
        clash.status === "DRAFT"
          ? "Un bail brouillon couvre déjà cette période pour ce bien : modifiez-le ou supprimez-le d'abord."
          : "Un bail signé ou en cours couvre déjà cette période pour ce bien.",
    });
  }
}

/**
 * Identifiants des baux dont l'utilisateur peut être locataire : e-mail du
 * bail, auteur de la demande d'origine, ou colocataire. Trois recherches
 * INDEXÉES (e-mails normalisés en base, index tenantEmail / email /
 * senderId) au lieu d'un OR de sous-requêtes qui parcourait toute la table
 * des baux. Le filtrage fin (e-mail vérifié, etc.) reste leasePartyFlags.
 */
export async function candidateTenantLeaseIds(
  db: Prisma.TransactionClient,
  user: { id: string; email: string },
): Promise<string[]> {
  const email = (user.email || "").trim().toLowerCase();
  const [byEmail, byInquiry, byCoTenant] = await Promise.all([
    email
      ? db.leaseContract.findMany({ where: { tenantEmail: email }, select: { id: true } })
      : Promise.resolve([] as Array<{ id: string }>),
    db.inquiry.findMany({ where: { senderId: user.id, leaseId: { not: null } }, select: { leaseId: true } }),
    email
      ? db.leaseCoTenant.findMany({ where: { email }, select: { leaseId: true } })
      : Promise.resolve([] as Array<{ leaseId: string }>),
  ]);
  const ids = new Set<string>();
  for (const r of byEmail) ids.add(r.id);
  for (const r of byInquiry) if (r.leaseId) ids.add(r.leaseId);
  for (const r of byCoTenant) ids.add(r.leaseId);
  return [...ids];
}
