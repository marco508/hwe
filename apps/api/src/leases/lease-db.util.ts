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
