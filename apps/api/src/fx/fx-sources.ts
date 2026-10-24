import { STATIC_EUR_RATES, STATIC_RATES_DATE, withFixedPegs } from "@hwe/types";

/**
 * Sources de taux (base EUR), fonctions pures (testées) :
 *  1. open.er-api.com — gratuit, sans clé, couvre les devises africaines ;
 *  2. BCE (eurofxref-daily.xml) — repli, une trentaine de devises ;
 *  3. table statique de @hwe/types — dernier repli.
 * Les devises absentes d'une source sont complétées par la table statique ;
 * XOF et XAF restent forcés à 655,957 (parité fixe).
 */

export const ER_API_URL = "https://open.er-api.com/v6/latest/EUR";
export const ECB_URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";

export interface FxSnapshot {
  date: string; // AAAA-MM-JJ
  source: string;
  rates: Record<string, number>;
}

function cleanRates(raw: Record<string, unknown>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(raw)) {
    const code = k.toUpperCase();
    const n = typeof v === "number" ? v : Number(v);
    if (/^[A-Z]{3}$/.test(code) && Number.isFinite(n) && n > 0) out[code] = n;
  }
  return out;
}

/** Complète avec la table statique et réimpose les parités fixes. */
export function finalizeRates(rates: Record<string, number>): Record<string, number> {
  return withFixedPegs({ ...STATIC_EUR_RATES, ...rates });
}

/** Réponse open.er-api.com → instantané, ou null si invalide. */
export function parseErApi(json: unknown): FxSnapshot | null {
  const j = json as { result?: string; base_code?: string; time_last_update_unix?: number; rates?: Record<string, unknown> };
  if (!j || j.result !== "success" || (j.base_code ?? "").toUpperCase() !== "EUR" || !j.rates) return null;
  const rates = cleanRates(j.rates);
  if (Object.keys(rates).length < 20) return null;
  const date = j.time_last_update_unix
    ? new Date(j.time_last_update_unix * 1000).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);
  return { date, source: "open.er-api.com", rates: finalizeRates(rates) };
}

/** XML de la BCE → instantané, ou null si invalide. */
export function parseEcbXml(xml: string): FxSnapshot | null {
  if (typeof xml !== "string" || !xml.includes("Cube")) return null;
  const date = /time=['"](\d{4}-\d{2}-\d{2})['"]/.exec(xml)?.[1];
  const rates: Record<string, number> = {};
  for (const m of xml.matchAll(/currency=['"]([A-Z]{3})['"]\s+rate=['"]([\d.]+)['"]/g)) rates[m[1]!] = Number(m[2]);
  if (!date || Object.keys(rates).length < 10) return null;
  return { date, source: "ecb", rates: finalizeRates(cleanRates(rates)) };
}

/** Dernier repli : la table statique. */
export function staticSnapshot(): FxSnapshot {
  return { date: STATIC_RATES_DATE, source: "static", rates: finalizeRates({}) };
}
