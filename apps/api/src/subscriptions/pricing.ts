import { currencyOfCountry } from "../shared/hwe-types";

/**
 * Prix des offres par devise (fonctions pures, testées).
 *
 * - Devise de facturation d'une agence : `Agency.billingCurrency` (choisie),
 *   sinon celle de son pays.
 * - Une offre propose son prix dans cette devise s'il est défini (PlanPrice) ;
 *   sinon le prix EUR (à défaut, le prix de base de l'offre) : on facture alors
 *   dans cette devise-là, avec un « ≈ » indicatif en devise locale.
 */

export interface PriceRow {
  currency: string;
  monthlyPrice: number;
}

export interface PricedPlan {
  monthlyPrice: number;
  currency: string;
  prices: PriceRow[];
}

export interface PlanOffer {
  /** Devise réellement facturée. */
  currency: string;
  monthlyPrice: number;
  /** Vrai si le prix est défini dans la devise demandée. */
  exact: boolean;
  /** Devise demandée (facturation de l'agence, ou affichage du visiteur). */
  requested: string;
}

export function billingCurrencyOf(agency: { billingCurrency?: string | null; country?: string | null }): {
  currency: string;
  source: "AGENCY" | "COUNTRY";
} {
  const chosen = agency.billingCurrency?.trim().toUpperCase();
  if (chosen && /^[A-Z]{3}$/.test(chosen)) return { currency: chosen, source: "AGENCY" };
  return { currency: currencyOfCountry(agency.country, "EUR"), source: "COUNTRY" };
}

/** Prix proposé pour `requested` : exact si défini, sinon EUR (ou le prix de base). */
export function planOffer(plan: PricedPlan, requested: string): PlanOffer {
  const want = (requested || "EUR").toUpperCase();
  const exact = plan.prices.find((p) => p.currency.toUpperCase() === want);
  if (exact) return { currency: want, monthlyPrice: exact.monthlyPrice, exact: true, requested: want };
  const eur = plan.prices.find((p) => p.currency.toUpperCase() === "EUR");
  if (eur) return { currency: "EUR", monthlyPrice: eur.monthlyPrice, exact: false, requested: want };
  return { currency: plan.currency.toUpperCase(), monthlyPrice: plan.monthlyPrice, exact: false, requested: want };
}

/** Prix normalisés : devises en majuscules, une ligne par devise (la dernière l'emporte), triées. */
export function normalizePrices(rows: PriceRow[]): PriceRow[] {
  const map = new Map<string, number>();
  for (const r of rows) map.set(r.currency.trim().toUpperCase(), Math.round(Number(r.monthlyPrice) * 100) / 100);
  return [...map.entries()]
    .map(([currency, monthlyPrice]) => ({ currency, monthlyPrice }))
    .sort((a, b) => (a.currency === "EUR" ? -1 : b.currency === "EUR" ? 1 : a.currency.localeCompare(b.currency)));
}

/** Prix « de base » d'une offre (colonnes historiques Plan.monthlyPrice / currency) : EUR s'il existe. */
export function basePrice(rows: PriceRow[]): PriceRow | null {
  const n = normalizePrices(rows);
  return n.find((p) => p.currency === "EUR") ?? n[0] ?? null;
}
