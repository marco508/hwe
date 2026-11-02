import { randomBytes } from "node:crypto";
import { planOffer, type PricedPlan } from "./pricing";

/**
 * Paiement en ligne de l'abonnement (KkiaPay via le hub DKP) : règles pures.
 * KkiaPay encaisse en francs CFA (XOF) : prix XOF de l'offre s'il existe,
 * sinon conversion (EUR → XOF : parité fixe 655,957) arrondie à l'unité supérieure.
 */

export const ONLINE_CURRENCY = "XOF";

export async function xofAmount(
  plan: PricedPlan,
  months: number,
  convert: (amount: number, from: string, to: string) => Promise<number | null>,
): Promise<number | null> {
  const offer = planOffer(plan, ONLINE_CURRENCY);
  const total = offer.monthlyPrice * months;
  if (!(total > 0)) return null;
  if (offer.currency === ONLINE_CURRENCY) return Math.ceil(total);
  const v = await convert(total, offer.currency, ONLINE_CURRENCY);
  return v !== null && Number.isFinite(v) && v > 0 ? Math.ceil(v) : null;
}

/** Référence unique transmise au hub (une transaction ne sert qu'une référence). */
export function onlineReference(): string {
  return `HWE-SUB-${randomBytes(9).toString("hex").toUpperCase()}`;
}

/** Statuts du hub qui ne valent pas refus définitif (on peut réessayer). */
export function isRetryableStatus(status: string | undefined): boolean {
  return status === "PROVIDER_ERROR" || status === "PENDING" || status === "NOT_CONFIGURED" || status === "UNKNOWN";
}
