import { monthYear, money, num, t, type Lang } from "./i18n";

/**
 * Libellés générés par l'API et STOCKÉS en français (honoraires, mentions de
 * signature, périodes « octobre 2026 ») : rendus à la volée dans la langue
 * demandée, par reconnaissance de leur format. En français, ou si le format
 * n'est pas reconnu, la valeur stockée est renvoyée telle quelle.
 */

export const MOIS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** « 7.5 » / « 7,5 » → 7.5 */
function parseNum(s: string): number | null {
  const n = Number(s.replace(/[\s  ]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/** Montant formaté à la française (« 250 000,00 € ») → nombre. */
function parseFrMoney(s: string): number | null {
  const m = /-?[\d\s  ]+(?:,\d+)?/.exec(s);
  return m ? parseNum(m[0]) : null;
}

/** « octobre 2026 » → { year, month } */
export function parseFrPeriod(s: string): { year: number; month: number } | null {
  const m = /^(\S+) (\d{4})$/.exec(s.trim());
  if (!m) return null;
  const i = MOIS_FR.indexOf(m[1]!.toLowerCase());
  return i < 0 ? null : { year: Number(m[2]), month: i + 1 };
}

/** Période d'échéance (« octobre 2026 ») dans la langue. */
export function periodLabel(lang: Lang, year: number, month: number): string {
  return monthYear(lang, year, month);
}

/** « octobre 2026 » stocké / généré en français → langue demandée. */
export function localizePeriod(value: string, lang: Lang): string {
  if (lang === "fr") return value;
  const p = parseFrPeriod(value);
  return p ? monthYear(lang, p.year, p.month) : value;
}

/** Libellé d'un honoraire (stocké en français par fees.service.ts) dans la langue. */
export function feeLabel(fee: { kind: string; label: string; currency?: string | null }, lang: Lang): string {
  if (lang === "fr" || !fee.label) return fee.label;
  const label = fee.label;
  let m: RegExpExecArray | null;
  if (fee.kind === "MANAGEMENT" && (m = /^Honoraires de gestion — (\S+) (\d{4}) \(([\d.,]+) %\)$/.exec(label))) {
    const i = MOIS_FR.indexOf(m[1]!);
    const rate = parseNum(m[3]!);
    if (i >= 0 && rate !== null) {
      return t(lang, "label.fee.MANAGEMENT", { period: monthYear(lang, Number(m[2]), i + 1), rate: num(lang, rate) });
    }
  }
  if (fee.kind === "LETTING" && (m = /^Honoraires de mise en location — bail de (.+)$/.exec(label))) {
    return t(lang, "label.fee.LETTING", { tenant: m[1]! });
  }
  if (fee.kind === "SALE" && (m = /^Honoraires de vente — ([\d.,]+) % de (.+)$/.exec(label))) {
    const rate = parseNum(m[1]!);
    const price = parseFrMoney(m[2]!);
    if (rate !== null && price !== null) {
      return t(lang, "label.fee.SALE", { rate: num(lang, rate), price: money(lang, price, fee.currency || "EUR") });
    }
  }
  return label;
}

/**
 * Mentions de signature d'un pro (common/property-access.ts), stockées en français :
 *  - « Signé par X (Agence), mandataire, pour le compte de Y — mandat MAN-… »
 *  - « par X (Agence), mandataire de Y » (état des lieux)
 */
export function localizeMention(value: string, lang: Lang): string {
  if (lang === "fr" || !value) return value;
  let m = /^Signé par (.+?)(?: \((.+)\))?, mandataire, pour le compte de (.+) — mandat ?(.*)$/.exec(value);
  if (m) {
    const owner = m[3] === "le propriétaire" ? t(lang, "label.theOwner") : m[3]!;
    const key = m[2] ? "label.mention.onBehalfAgency" : "label.mention.onBehalf";
    return t(lang, key, { pro: m[1]!, agency: m[2] ?? "", owner, mandate: m[4] ?? "" }).trim();
  }
  m = /^par (.+?)(?: \((.+)\))?, mandataire de (.+)$/.exec(value);
  if (m) {
    const owner = m[3] === "le propriétaire" ? t(lang, "label.theOwner") : m[3]!;
    const key = m[2] ? "label.mention.agentAgency" : "label.mention.agent";
    return t(lang, key, { pro: m[1]!, agency: m[2] ?? "", owner });
  }
  return value;
}

const FEE_KINDS = new Set(["MANAGEMENT", "LETTING", "SALE"]);

/**
 * Localise en place une réponse JSON (appelé par l'intercepteur de réponse) :
 * `ownerSignatureMention`, `periodLabel` / `monthLabel` au format « mois AAAA »,
 * et le `label` des honoraires (objets { kind, label, dueDate }).
 */
export function localizeResponse(value: unknown, lang: Lang, depth = 0): unknown {
  if (lang === "fr" || value === null || typeof value !== "object" || depth > 32) return value;
  if (value instanceof Date || Buffer.isBuffer(value) || ArrayBuffer.isView(value)) return value;
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) value[i] = localizeResponse(value[i], lang, depth + 1);
    return value;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) return value;
  const obj = value as Record<string, unknown>;
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === "string") {
      if (k === "ownerSignatureMention") obj[k] = localizeMention(v, lang);
      else if (k === "periodLabel" || k === "monthLabel") obj[k] = localizePeriod(v, lang);
    } else if (v && typeof v === "object") {
      obj[k] = localizeResponse(v, lang, depth + 1);
    }
  }
  if (typeof obj.kind === "string" && FEE_KINDS.has(obj.kind) && typeof obj.label === "string" && "dueDate" in obj) {
    obj.label = feeLabel({ kind: obj.kind, label: obj.label, currency: typeof obj.currency === "string" ? obj.currency : null }, lang);
  }
  return obj;
}
