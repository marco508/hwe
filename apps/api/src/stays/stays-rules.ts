import type { BookingStatus, CancellationPolicy } from "@prisma/client";

/**
 * SÉJOURS COURTE DURÉE — règles pures (prix, nuits, disponibilité,
 * annulation), testées unitairement. Les dates sont des jours calendaires à
 * minuit UTC (common/dates.ts) ; un séjour couvre les nuits [arrivée, départ[.
 */

const DAY_MS = 24 * 3600 * 1000;

/** Statuts qui bloquent les dates d'un bien. */
export const BLOCKING_STATUSES: BookingStatus[] = ["ACCEPTED", "CONFIRMED", "COMPLETED"];

/** Durée maximale d'un séjour (au-delà : bail classique). */
export const MAX_STAY_NIGHTS = 180;

/** Fenêtre de réservation : jusqu'à 18 mois à l'avance. */
export const BOOKING_HORIZON_DAYS = 548;

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / DAY_MS);
}

export function addDays(day: Date, n: number): Date {
  return new Date(day.getTime() + n * DAY_MS);
}

/** « 2026-11-03 » d'un jour stocké. */
export function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export interface DayRange {
  start: Date;
  /** Exclu : premier jour de nouveau libre. */
  end: Date;
}

/** Deux plages [a, b[ se chevauchent-elles ? */
export function overlaps(a: DayRange, b: DayRange): boolean {
  return a.start.getTime() < b.end.getTime() && a.end.getTime() > b.start.getTime();
}

/** Fusionne des plages (triées ou non) en plages disjointes. */
export function mergeRanges(ranges: DayRange[]): DayRange[] {
  const sorted = [...ranges].sort((a, b) => a.start.getTime() - b.start.getTime());
  const out: DayRange[] = [];
  for (const r of sorted) {
    const last = out[out.length - 1];
    if (last && r.start.getTime() <= last.end.getTime()) {
      if (r.end.getTime() > last.end.getTime()) last.end = r.end;
    } else {
      out.push({ start: r.start, end: r.end });
    }
  }
  return out;
}

export interface StayRates {
  /** Prix d'une nuit (réglage séjour, sinon tarif « jour » de la grille). */
  nightly: number | null;
  /** Tarif semaine de la grille (7 nuits et plus). */
  weekly?: number | null;
  /** Tarif mois de la grille (28 nuits et plus, ramené à 30 nuits). */
  monthly?: number | null;
  cleaningFee: number;
}

export interface StayQuote {
  nights: number;
  nightlyRate: number;
  subtotal: number;
  cleaningFee: number;
  total: number;
  /** Tarif dégressif appliqué (semaine / mois), sinon null. */
  discount: "WEEK" | "MONTH" | null;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Prix de base d'une nuit (null : aucun tarif → le séjour ne peut pas être proposé). */
export function baseNightly(r: StayRates): number | null {
  if (r.nightly && r.nightly > 0) return r.nightly;
  if (r.weekly && r.weekly > 0) return round2(r.weekly / 7);
  if (r.monthly && r.monthly > 0) return round2(r.monthly / 30);
  return null;
}

/**
 * Devis d'un séjour : prix de la nuit, dégressif semaine (≥ 7 nuits) puis
 * mois (≥ 28 nuits) quand la grille du bien le rend plus avantageux, plus les
 * frais de ménage (une fois par séjour). Null si aucun tarif.
 */
export function quoteStay(r: StayRates, nights: number): StayQuote | null {
  const base = baseNightly(r);
  if (base === null || nights < 1) return null;
  let rate = base;
  let discount: StayQuote["discount"] = null;
  if (nights >= 7 && r.weekly && r.weekly > 0 && r.weekly / 7 < rate) {
    rate = r.weekly / 7;
    discount = "WEEK";
  }
  if (nights >= 28 && r.monthly && r.monthly > 0 && r.monthly / 30 < rate) {
    rate = r.monthly / 30;
    discount = "MONTH";
  }
  const nightlyRate = round2(rate);
  const subtotal = round2(nightlyRate * nights);
  const cleaningFee = round2(Math.max(0, r.cleaningFee || 0));
  return { nights, nightlyRate, subtotal, cleaningFee, total: round2(subtotal + cleaningFee), discount };
}

export interface StayConstraints {
  minNights: number;
  maxNights: number | null;
  maxGuests: number;
  minNoticeDays: number;
}

export type StayRefusal =
  | "DATES_INVALID"
  | "TOO_SOON"
  | "TOO_FAR"
  | "MIN_NIGHTS"
  | "MAX_NIGHTS"
  | "MAX_GUESTS"
  | "UNAVAILABLE";

/**
 * Vérifie une demande de séjour (dates, durée, voyageurs, disponibilité).
 * Renvoie la liste des refus (vide = possible).
 */
export function checkStay(
  req: { checkIn: Date; checkOut: Date; guests: number },
  c: StayConstraints,
  taken: DayRange[],
  today: Date,
): StayRefusal[] {
  const out: StayRefusal[] = [];
  const nights = nightsBetween(req.checkIn, req.checkOut);
  if (!(nights >= 1)) return ["DATES_INVALID"];
  if (req.checkIn.getTime() < addDays(today, Math.max(0, c.minNoticeDays)).getTime()) out.push("TOO_SOON");
  if (req.checkIn.getTime() > addDays(today, BOOKING_HORIZON_DAYS).getTime()) out.push("TOO_FAR");
  if (nights < Math.max(1, c.minNights)) out.push("MIN_NIGHTS");
  if (nights > Math.min(c.maxNights ?? MAX_STAY_NIGHTS, MAX_STAY_NIGHTS)) out.push("MAX_NIGHTS");
  if (!(req.guests >= 1) || req.guests > c.maxGuests) out.push("MAX_GUESTS");
  const want = { start: req.checkIn, end: req.checkOut };
  if (taken.some((r) => overlaps(r, want))) out.push("UNAVAILABLE");
  return out;
}

/** Jours restants avant l'arrivée (jour d'annulation → jour d'arrivée). */
export function daysBefore(checkIn: Date, day: Date): number {
  return Math.round((checkIn.getTime() - day.getTime()) / DAY_MS);
}

/**
 * Remboursement dû au voyageur qui annule un séjour PAYÉ, selon la politique :
 * - FLEXIBLE : tout jusqu'à la veille de l'arrivée (≥ 1 jour), rien ensuite ;
 * - MODERATE : tout jusqu'à 5 jours avant, la moitié ensuite (avant l'arrivée) ;
 * - STRICT : la moitié jusqu'à 7 jours avant, rien ensuite.
 * Annulation par l'hôte : toujours tout.
 */
export function refundFor(
  policy: CancellationPolicy,
  total: number,
  checkIn: Date,
  cancelDay: Date,
  by: "GUEST" | "HOST",
): number {
  if (by === "HOST") return round2(total);
  const d = daysBefore(checkIn, cancelDay);
  if (d < 0) return 0;
  switch (policy) {
    case "FLEXIBLE":
      return d >= 1 ? round2(total) : 0;
    case "MODERATE":
      return d >= 5 ? round2(total) : d >= 1 ? round2(total / 2) : 0;
    case "STRICT":
      return d >= 7 ? round2(total / 2) : 0;
  }
  return 0;
}

/** « HH:MM » valide. */
export function isClock(s: unknown): s is string {
  return typeof s === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(s);
}

/** Moyenne des notes (1 décimale), null sans avis. */
export function averageRating(ratings: number[]): number | null {
  if (ratings.length === 0) return null;
  return Math.round((ratings.reduce((s, r) => s + r, 0) / ratings.length) * 10) / 10;
}
