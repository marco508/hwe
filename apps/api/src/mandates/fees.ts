import { BadRequestException, ConflictException } from "@nestjs/common";
import { FeeStatus, MandateType } from "@prisma/client";
import { percentOf, toCents, fromCents } from "../common/money";

/**
 * Honoraires d'agence — règles PURES (testées).
 * Tous les calculs passent par des centimes entiers (common/money), arrondis
 * au centime, puis reviennent à 2 décimales.
 */

export const FEE_BOUNDS = {
  managementFeeRate: { min: 0, max: 30 },
  lettingFeeMonths: { min: 0, max: 3 },
  saleFeeRate: { min: 0, max: 15 },
} as const;

export interface MandateFees {
  managementFeeRate?: number | null;
  lettingFeeAmount?: number | null;
  lettingFeeMonths?: number | null;
  saleFeeRate?: number | null;
}

/** Honoraires de gestion : `rate` % × (loyer + charges) effectivement validés. */
export function managementFee(rate: number | null | undefined, rentAmount: number, chargesAmount: number): number | null {
  if (rate == null || !(rate > 0)) return null;
  return percentOf(fromCents(toCents(rentAmount) + toCents(chargesAmount)), rate);
}

/**
 * Honoraires de mise en location, dus à la double signature du bail :
 * montant fixe, sinon `lettingFeeMonths` mois de loyer HORS charges.
 */
export function lettingFee(fees: MandateFees, monthlyRent: number): number | null {
  if (fees.lettingFeeAmount != null && fees.lettingFeeAmount > 0) return fromCents(toCents(fees.lettingFeeAmount));
  if (fees.lettingFeeMonths != null && fees.lettingFeeMonths > 0) {
    // mois × loyer, au centime (1,5 mois de 733,33 → 1 100,00 arrondi au centime)
    const cents = Math.round(toCents(monthlyRent) * Math.round(fees.lettingFeeMonths * 100) / 100);
    return fromCents(cents);
  }
  return null;
}

/** Honoraires de vente : `rate` % du prix de vente final. */
export function saleFee(rate: number | null | undefined, salePrice: number): number | null {
  if (rate == null || !(rate > 0) || !(salePrice > 0)) return null;
  return percentOf(salePrice, rate);
}

/** Référence lisible d'un mandat : MAN-2026-00012. */
export function formatMandateReference(year: number, n: number): string {
  return `MAN-${year}-${String(n).padStart(5, "0")}`;
}

/** « 2026-10 » → { year: 2026, month: 10 } ; null si invalide. */
export function parseMonth(value: string | null | undefined): { year: number; month: number } | null {
  const m = /^(\d{4})-(\d{2})$/.exec(String(value ?? "").trim());
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  if (month < 1 || month > 12 || year < 2000 || year > 2200) return null;
  return { year, month };
}

/**
 * Cohérence des honoraires avec le type de mandat (400 sinon) :
 * bornes, pas de montant fixe ET de mois en même temps, pas d'honoraire de
 * vente sur un mandat locatif ni l'inverse.
 */
export function assertFees(type: MandateType, fees: MandateFees): void {
  const bad = (message: string) =>
    new BadRequestException({ statusCode: 400, code: "INVALID_FEES", message });
  const inRange = (v: number | null | undefined, min: number, max: number) =>
    v == null || (Number.isFinite(v) && v >= min && v <= max);
  if (!inRange(fees.managementFeeRate, 0, 30)) throw bad("Taux de gestion : entre 0 et 30 %.");
  if (!inRange(fees.lettingFeeMonths, 0, 3)) throw bad("Honoraires de location : entre 0 et 3 mois de loyer.");
  if (!inRange(fees.saleFeeRate, 0, 15)) throw bad("Taux de vente : entre 0 et 15 %.");
  if (fees.lettingFeeAmount != null && !(Number.isFinite(fees.lettingFeeAmount) && fees.lettingFeeAmount >= 0)) {
    throw bad("Montant des honoraires de location invalide.");
  }
  if (fees.lettingFeeAmount != null && fees.lettingFeeMonths != null) {
    throw bad("Honoraires de location : indiquez un montant fixe OU un nombre de mois, pas les deux.");
  }
  if (type === "SALE") {
    if (fees.managementFeeRate != null || fees.lettingFeeAmount != null || fees.lettingFeeMonths != null) {
      throw bad("Un mandat de vente ne porte que sur un taux de vente.");
    }
  } else {
    if (fees.saleFeeRate != null) throw bad("Un taux de vente ne s'applique qu'à un mandat de vente.");
    if (type === "LETTING" && fees.managementFeeRate != null) {
      throw bad("Un mandat de mise en location n'a pas d'honoraires de gestion.");
    }
  }
}

/** Le type de mandat doit correspondre au type d'annonce du bien. */
export function assertMandateMatchesListing(type: MandateType, listingType: "SALE" | "RENT"): void {
  if ((type === "SALE") !== (listingType === "SALE")) {
    throw new BadRequestException({
      statusCode: 400,
      code: "MANDATE_TYPE_MISMATCH",
      message:
        type === "SALE"
          ? "Un mandat de vente porte sur un bien à vendre."
          : "Un mandat de location ou de gestion porte sur un bien à louer.",
    });
  }
}

/** Transition manuelle d'un honoraire (PATCH /fees/:id) : DUE ⇄ SETTLED, jamais depuis CANCELLED. */
export function assertFeeTransition(current: FeeStatus, target: FeeStatus): void {
  if (target !== "DUE" && target !== "SETTLED") {
    throw new BadRequestException("Statut d'honoraire invalide (DUE ou SETTLED).");
  }
  if (current === "CANCELLED") {
    throw new ConflictException({
      statusCode: 409,
      code: "FEE_CANCELLED",
      message: "Cet honoraire a été annulé (validation de loyer annulée) : il ne peut plus changer de statut.",
    });
  }
}
