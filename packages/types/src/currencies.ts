/**
 * Devises et taux de change de secours (base EUR).
 *
 * - Les taux réels viennent de l'API (`GET /api/fx`, mis à jour chaque jour
 *   côté serveur) ; cette table ne sert qu'en secours (premier rendu, API
 *   injoignable) et de dernier repli côté serveur.
 * - XOF et XAF : parité fixe 655,957 pour 1 EUR, toujours forcée.
 * - Les devises proposées dans les sélecteurs sont celles de cette table.
 */

/** Date des taux de secours ci-dessous. */
export const STATIC_RATES_DATE = "2025-06-30";

/** Parités fixes imposées quelle que soit la source. */
export const FIXED_EUR_PEGS: Record<string, number> = { XOF: 655.957, XAF: 655.957 };

/** Unités de devise pour 1 EUR — valeurs indicatives (sauf parités fixes). */
export const STATIC_EUR_RATES: Record<string, number> = {
  EUR: 1,
  XOF: 655.957,
  XAF: 655.957,
  USD: 1.17,
  GBP: 0.856,
  CAD: 1.6,
  CHF: 0.935,
  // Afrique
  MAD: 10.55,
  DZD: 152,
  TND: 3.43,
  EGP: 58,
  LYD: 6.35,
  NGN: 1790,
  GHS: 12.1,
  GNF: 10100,
  SLE: 26.5,
  LRD: 234,
  GMD: 84,
  CVE: 110.265,
  MRU: 46.5,
  KES: 151,
  RWF: 1680,
  BIF: 3480,
  ETB: 160,
  TZS: 3050,
  UGX: 4200,
  DJF: 208,
  SOS: 669,
  ERN: 17.6,
  SDG: 703,
  SSP: 5300,
  CDF: 3350,
  AOA: 1070,
  STN: 24.5,
  ZAR: 20.8,
  NAD: 20.8,
  BWP: 15.7,
  LSL: 20.8,
  SZL: 20.8,
  ZMW: 27.5,
  MWK: 2030,
  MZN: 74.8,
  MGA: 5200,
  MUR: 53,
  SCR: 16.8,
  KMF: 491.968,
  // Amériques
  BRL: 6.4,
  MXN: 22.1,
  ARS: 1390,
  COP: 4780,
  CLP: 1095,
  PEN: 4.17,
  // Asie, Moyen-Orient
  CNY: 8.4,
  JPY: 169,
  INR: 100.5,
  AED: 4.31,
  SAR: 4.4,
  QAR: 4.27,
  TRY: 46.7,
  RUB: 92,
  // Europe
  SEK: 11.15,
  NOK: 11.85,
  DKK: 7.46,
  PLN: 4.24,
  // Océanie
  AUD: 1.79,
  NZD: 1.93,
};

/** Codes proposés dans les sélecteurs (ordre : principales d'abord). */
export const SELECTABLE_CURRENCIES: string[] = Object.keys(STATIC_EUR_RATES);

/** Taux { devise: unités pour 1 EUR } avec les parités fixes réimposées. */
export function withFixedPegs(rates: Record<string, number>): Record<string, number> {
  return { ...rates, EUR: 1, ...FIXED_EUR_PEGS };
}

/** Convertit `amount` de `from` vers `to` avec `rates` (base EUR), ou null si une devise manque. */
export function convertWithRates(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>,
): number | null {
  const f = (from || "EUR").toUpperCase();
  const t = (to || "EUR").toUpperCase();
  if (f === t) return amount;
  const rf = rates[f];
  const rt = rates[t];
  if (!rf || !rt) return null;
  return (amount / rf) * rt;
}

/** Réponse de `GET /api/fx`. */
export interface FxRatesResponse {
  base: "EUR";
  /** Date des taux (AAAA-MM-JJ). */
  date: string;
  /** Source : « open.er-api.com », « ecb », « static ». */
  source: string;
  /** Instant de récupération (ISO). */
  fetchedAt: string;
  rates: Record<string, number>;
}
