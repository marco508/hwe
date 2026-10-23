import { BadRequestException, ConflictException } from "@nestjs/common";
import { createHash } from "crypto";
import { LeaseStatus } from "@prisma/client";
import { addMonths } from "../common/dates";

/**
 * Règles du bail (pures, testées unitairement).
 *
 * Machine à états, côté serveur uniquement (le client ne pose plus jamais
 * de statut) :
 *   DRAFT ──(double signature)──▶ SIGNED (début futur) ──(jour J)──▶ ACTIVE
 *                               └▶ ACTIVE (début atteint)
 *   SIGNED/ACTIVE ──(fin dépassée)──▶ EXPIRED, ou TERMINATED si un congé /
 *   préavis a fixé la fin.
 * Un bail signé (par qui que ce soit) n'est plus modifiable ni supprimable :
 * toute évolution passe par un avenant.
 */

export const OPEN_LEASE_STATUSES: LeaseStatus[] = ["DRAFT", "SIGNED", "ACTIVE"];
export const RUNNING_LEASE_STATUSES: LeaseStatus[] = ["SIGNED", "ACTIVE"];

interface SignableLease {
  status: LeaseStatus;
  ownerSignedAt: Date | null;
  tenantSignedAt: Date | null;
  coTenants?: Array<{ signedAt: Date | null }>;
}

export function hasAnySignature(lease: SignableLease): boolean {
  return !!(
    lease.ownerSignedAt ||
    lease.tenantSignedAt ||
    lease.coTenants?.some((c) => !!c.signedAt)
  );
}

/** PATCH autorisé seulement tant que personne n'a signé. */
export function assertLeaseEditable(lease: SignableLease): void {
  if (lease.status !== "DRAFT" || hasAnySignature(lease)) {
    throw new ConflictException(
      "Ce bail a déjà été signé : il n'est plus modifiable. Passez par un avenant.",
    );
  }
}

/** DELETE autorisé seulement pour un brouillon sans aucune signature. */
export function assertLeaseDeletable(lease: SignableLease): void {
  if (lease.status !== "DRAFT" || hasAnySignature(lease)) {
    throw new ConflictException(
      "Ce bail a été signé : il ne peut plus être supprimé (il fait foi pour les deux parties).",
    );
  }
}

/** Une signature n'est possible que sur un brouillon. */
export function assertLeaseSignable(lease: { status: LeaseStatus }): void {
  if (lease.status !== "DRAFT") {
    throw new ConflictException(
      lease.status === "EXPIRED" || lease.status === "TERMINATED"
        ? "Ce bail est terminé : il ne peut plus être signé."
        : "Ce bail est déjà signé.",
    );
  }
}

/** Statut résultant des signatures, au jour donné. */
export function statusAfterSignatures(
  lease: { ownerSignedAt: Date | null; tenantSignedAt: Date | null; startDate: Date },
  today: Date,
): LeaseStatus {
  if (!lease.ownerSignedAt || !lease.tenantSignedAt) return "DRAFT";
  return lease.startDate.getTime() <= today.getTime() ? "ACTIVE" : "SIGNED";
}

/** Statut de fin : TERMINATED si un congé/préavis a fixé la fin, sinon EXPIRED. */
export function endStatus(lease: {
  noticeGivenAt: Date | null;
  ownerNoticeGivenAt: Date | null;
}): LeaseStatus {
  return lease.noticeGivenAt || lease.ownerNoticeGivenAt ? "TERMINATED" : "EXPIRED";
}

/** Un bail est échu le LENDEMAIN de son dernier jour (le dernier jour compte). */
export function isPastEnd(endDate: Date | null, today: Date): boolean {
  return !!endDate && endDate.getTime() < today.getTime();
}

/** Contrôle date de fin > date de début. */
export function assertLeaseDates(start: Date | null, end: Date | null): void {
  if (!start) throw new BadRequestException("Date de début invalide.");
  if (end && end.getTime() <= start.getTime()) {
    throw new BadRequestException("La date de fin doit être postérieure à la date de début.");
  }
}

/** Chevauchement de deux périodes en jours inclus (fin null = sans fin). */
export function rangesOverlap(
  aStart: Date,
  aEnd: Date | null,
  bStart: Date,
  bEnd: Date | null,
): boolean {
  const aE = aEnd ? aEnd.getTime() : Infinity;
  const bE = bEnd ? bEnd.getTime() : Infinity;
  return aStart.getTime() <= bE && bStart.getTime() <= aE;
}

/**
 * Date d'effet du préavis du locataire : au plus tôt aujourd'hui + préavis
 * contractuel (mois bornés), ou la date souhaitée si elle est plus tardive,
 * sans dépasser la fin prévue du bail.
 */
export function tenantNoticeEffectiveDate(
  today: Date,
  noticeMonths: number,
  desired: Date | null,
  endDate: Date | null,
): Date {
  const min = addMonths(today, Math.max(0, noticeMonths));
  let effective = desired && desired.getTime() > min.getTime() ? desired : min;
  if (endDate && effective.getTime() > endDate.getTime()) effective = endDate;
  return effective;
}

/**
 * Date d'effet du congé donné par le bailleur : il ne vaut que pour
 * l'échéance du bail, et au plus tôt après le préavis légal (3 mois meublé,
 * 6 mois nu). Sans échéance fixée : préavis légal ou date souhaitée.
 */
export function ownerNoticeEffectiveDate(
  today: Date,
  legalMonths: number,
  desired: Date | null,
  endDate: Date | null,
): Date {
  const min = addMonths(today, legalMonths);
  if (endDate) return endDate.getTime() >= min.getTime() ? endDate : min;
  return desired && desired.getTime() > min.getTime() ? desired : min;
}

/** Empreinte du contenu signé (preuve qu'il n'a pas changé après signature). */
export function leaseContentHash(lease: {
  id: string;
  propertyId: string;
  tenantFirstName: string;
  tenantLastName: string;
  tenantEmail: string;
  monthlyRent: number;
  charges: number;
  deposit: number;
  currency: string;
  startDate: Date;
  endDate: Date | null;
  noticePeriod: number;
  rentPaymentDay: number;
  furnished: boolean;
  specialClauses: string | null;
  shortStay: boolean;
  stayTotal: number | null;
}): string {
  const canonical = JSON.stringify([
    lease.id,
    lease.propertyId,
    lease.tenantFirstName,
    lease.tenantLastName,
    lease.tenantEmail,
    lease.monthlyRent,
    lease.charges,
    lease.deposit,
    lease.currency,
    lease.startDate.toISOString(),
    lease.endDate ? lease.endDate.toISOString() : null,
    lease.noticePeriod,
    lease.rentPaymentDay,
    lease.furnished,
    lease.specialClauses ?? null,
    lease.shortStay,
    lease.stayTotal ?? null,
  ]);
  return createHash("sha256").update(canonical).digest("hex");
}

export const round2 = (n: number) => Math.round(n * 100) / 100;
