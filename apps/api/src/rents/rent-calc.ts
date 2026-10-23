import { daysInMonth, monthEnd, monthStart } from "../common/dates";

/**
 * Calcul des échéances de loyer (pur, testé unitairement).
 *
 *  - une échéance par mois calendaire couvert par le bail, jusqu'au mois
 *    courant (jamais d'échéance future) ;
 *  - premier et dernier mois au prorata des jours occupés ;
 *  - loyer et charges pris tels qu'en vigueur ce mois-là (les avenants
 *    appliqués après ne réécrivent pas le passé) ;
 *  - échéance au jour de paiement du mois, jamais avant l'entrée dans les lieux ;
 *  - location courte durée : une seule échéance du total, due à l'arrivée.
 */

export interface LeaseForRent {
  startDate: Date;
  endDate: Date | null;
  monthlyRent: number;
  charges: number;
  rentPaymentDay: number;
  shortStay: boolean;
  stayTotal: number | null;
}

export interface AppliedAmendment {
  effectiveDate: Date;
  appliedAt: Date | null;
  prevMonthlyRent: number | null;
  prevCharges: number | null;
}

export interface PeriodDraft {
  periodYear: number;
  periodMonth: number;
  dueDate: Date;
  rentAmount: number;
  chargesAmount: number;
  amount: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Loyer et charges en vigueur à un jour donné, en « défaisant » les avenants postérieurs. */
export function termsAt(
  lease: Pick<LeaseForRent, "monthlyRent" | "charges">,
  amendments: AppliedAmendment[],
  day: Date,
): { rent: number; charges: number } {
  let rent = lease.monthlyRent;
  let charges = lease.charges;
  const applied = amendments
    .filter((a) => a.appliedAt)
    .sort((a, b) => b.effectiveDate.getTime() - a.effectiveDate.getTime());
  for (const a of applied) {
    if (a.effectiveDate.getTime() <= day.getTime()) break;
    if (a.prevMonthlyRent != null) rent = a.prevMonthlyRent;
    if (a.prevCharges != null) charges = a.prevCharges;
  }
  return { rent, charges };
}

/** Échéance d'un mois donné, ou null si le bail ne couvre pas ce mois. */
export function computePeriod(
  lease: LeaseForRent,
  year: number,
  month: number,
  amendments: AppliedAmendment[] = [],
): PeriodDraft | null {
  const ms = monthStart(year, month);
  const me = monthEnd(year, month);
  const start = lease.startDate;
  const end = lease.endDate;
  if (start.getTime() > me.getTime()) return null;
  if (end && end.getTime() < ms.getTime()) return null;

  if (lease.shortStay) {
    // Une seule échéance : le mois d'arrivée, due le jour d'arrivée.
    if (start.getUTCFullYear() !== year || start.getUTCMonth() + 1 !== month) return null;
    const total = round2(lease.stayTotal ?? lease.monthlyRent);
    return {
      periodYear: year,
      periodMonth: month,
      dueDate: start,
      rentAmount: total,
      chargesAmount: 0,
      amount: total,
    };
  }

  const firstDay = start.getTime() > ms.getTime() ? start : ms;
  const lastDay = end && end.getTime() < me.getTime() ? end : me;
  const occupied = Math.round((lastDay.getTime() - firstDay.getTime()) / 86_400_000) + 1;
  const dim = daysInMonth(year, month);
  const ratio = occupied >= dim ? 1 : occupied / dim;

  const { rent, charges } = termsAt(lease, amendments, firstDay);
  const rentAmount = round2(rent * ratio);
  const chargesAmount = round2(charges * ratio);

  const day = Math.min(Math.max(lease.rentPaymentDay || 1, 1), 28);
  let dueDate = new Date(Date.UTC(year, month - 1, day));
  if (dueDate.getTime() < firstDay.getTime()) dueDate = firstDay;

  return {
    periodYear: year,
    periodMonth: month,
    dueDate,
    rentAmount,
    chargesAmount,
    amount: round2(rentAmount + chargesAmount),
  };
}

/** Toutes les échéances du début du bail jusqu'au mois de `today` inclus. */
export function periodsUpTo(
  lease: LeaseForRent,
  today: Date,
  amendments: AppliedAmendment[] = [],
): PeriodDraft[] {
  const out: PeriodDraft[] = [];
  if (lease.startDate.getTime() > today.getTime()) return out;
  const last = lease.endDate && lease.endDate.getTime() < today.getTime() ? lease.endDate : today;
  let y = lease.startDate.getUTCFullYear();
  let m = lease.startDate.getUTCMonth() + 1;
  const ly = last.getUTCFullYear();
  const lm = last.getUTCMonth() + 1;
  while (y < ly || (y === ly && m <= lm)) {
    const p = computePeriod(lease, y, m, amendments);
    if (p) out.push(p);
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  return out;
}
