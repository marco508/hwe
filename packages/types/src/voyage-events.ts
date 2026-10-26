/**
 * Fêtes et événements de l'espace Voyage : jours fériés, fêtes religieuses et
 * traditionnelles, festivals, temps forts saisonniers. Chaque événement a une
 * règle de date ; ses dates sont calculées pour chaque année (pas de saisie
 * annuelle) :
 * - fixed : même jour chaque année ;
 * - easter : décalage en jours par rapport au dimanche de Pâques (grégorien) ;
 * - hijri : date du calendrier musulman (Umm al-Qura via Intl), estimée à ±1 jour
 *   (la date officielle dépend de l'observation de la lune dans chaque pays) ;
 * - nth-weekday : n-ième jour de la semaine d'un mois (nth = -1 : le dernier ;
 *   weekday 0 = dimanche) ;
 * - period : dates variables annoncées chaque année, entre deux mois inclus.
 */

export const VOYAGE_EVENT_KINDS = ["NATIONAL", "RELIGIOUS", "TRADITIONAL", "FESTIVAL", "SEASONAL"] as const;
export type VoyageEventKind = (typeof VOYAGE_EVENT_KINDS)[number];

export type VoyageEventRule =
  | { type: "fixed"; month: number; day: number; days?: number }
  | { type: "easter"; offset: number; days?: number }
  | { type: "hijri"; month: number; day: number; days?: number }
  | { type: "nth-weekday"; month: number; weekday: number; nth: number; days?: number }
  | { type: "period"; from: number; to: number };

/** Une occurrence : dates AAAA-MM-JJ (fin incluse). `approx` : date lunaire estimée ; `period` : seulement une fenêtre de mois. */
export interface VoyageEventOccurrence {
  start: string;
  end: string;
  approx?: boolean;
  period?: boolean;
}

export interface VoyageEventCard {
  id: string;
  slug: string;
  country: string;
  kind: VoyageEventKind;
  publicHoliday: boolean;
  name: string;
  summary: string;
  where: string | null;
  dateNote: string | null;
  caution: boolean;
  cover: string | null;
  rule: VoyageEventRule;
  destination: { slug: string; name: string } | null;
  place: { slug: string; name: string } | null;
  /** Occurrences dans la période demandée (ou la prochaine). */
  occurrences: VoyageEventOccurrence[];
}

export interface VoyageEventDetail extends VoyageEventCard {
  description: string;
  tips: string | null;
  coverCredit: string | null;
  reviewed: boolean;
  updatedAt: string;
  related: VoyageEventCard[];
}

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d));
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);

/** Dimanche de Pâques (algorithme grégorien anonyme / Meeus). */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(year, month, day);
}

let hijriFmt: Intl.DateTimeFormat | null | undefined;
function hijriFormatter(): Intl.DateTimeFormat | null {
  if (hijriFmt !== undefined) return hijriFmt;
  try {
    const f = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" });
    // Moteur sans ce calendrier : repli silencieux sur le grégorien → on vérifie.
    const probe = f.formatToParts(utc(2026, 3, 20));
    hijriFmt = probe.find((p) => p.type === "month")?.value === "10" ? f : null;
  } catch {
    hijriFmt = null;
  }
  return hijriFmt;
}

const hijriCache = new Map<number, Map<string, Date[]>>();
/** Jours grégoriens de `year` indexés par « moisHégire-jourHégire » (une date hégire peut tomber 0, 1 ou 2 fois dans l'année). */
function hijriIndex(year: number): Map<string, Date[]> | null {
  const f = hijriFormatter();
  if (!f) return null;
  const hit = hijriCache.get(year);
  if (hit) return hit;
  const out = new Map<string, Date[]>();
  for (let d = utc(year, 1, 1); d.getUTCFullYear() === year; d = addDays(d, 1)) {
    const parts = f.formatToParts(d);
    const k = `${Number(parts.find((p) => p.type === "month")?.value)}-${Number(parts.find((p) => p.type === "day")?.value)}`;
    out.set(k, [...(out.get(k) ?? []), d]);
  }
  if (hijriCache.size > 20) hijriCache.clear();
  hijriCache.set(year, out);
  return out;
}

/** Début(s) d'un événement pendant l'année grégorienne `year`. */
function startsIn(rule: VoyageEventRule, year: number): Date[] {
  switch (rule.type) {
    case "fixed": {
      const d = utc(year, rule.month, rule.day);
      return d.getUTCMonth() === rule.month - 1 ? [d] : []; // 29 février hors année bissextile
    }
    case "easter":
      return [addDays(easterSunday(year), rule.offset)].filter((d) => d.getUTCFullYear() === year);
    case "nth-weekday": {
      if (rule.nth === -1) {
        let d = utc(year, rule.month + 1, 0);
        while (d.getUTCDay() !== rule.weekday) d = addDays(d, -1);
        return [d];
      }
      let d = utc(year, rule.month, 1);
      while (d.getUTCDay() !== rule.weekday) d = addDays(d, 1);
      d = addDays(d, 7 * (rule.nth - 1));
      return d.getUTCMonth() === rule.month - 1 ? [d] : [];
    }
    case "hijri":
      return hijriIndex(year)?.get(`${rule.month}-${rule.day}`) ?? [];
    case "period":
      return [];
  }
}

/** Occurrences qui chevauchent [from, to] (AAAA-MM-JJ inclus), dans l'ordre. */
export function eventOccurrences(rule: VoyageEventRule, from: string, to: string): VoyageEventOccurrence[] {
  const y0 = Number(from.slice(0, 4));
  const y1 = Number(to.slice(0, 4));
  const out: VoyageEventOccurrence[] = [];
  for (let y = y0 - 1; y <= y1; y++) {
    if (rule.type === "period") {
      const start = utc(y, rule.from, 1);
      const endYear = rule.to < rule.from ? y + 1 : y;
      const end = utc(endYear, rule.to + 1, 0);
      const s = iso(start);
      const e = iso(end);
      if (e >= from && s <= to) out.push({ start: s, end: e, period: true });
      continue;
    }
    const days = Math.max(1, Math.min(rule.days ?? 1, 120));
    for (const d of startsIn(rule, y)) {
      const s = iso(d);
      const e = iso(addDays(d, days - 1));
      if (e >= from && s <= to) out.push({ start: s, end: e, ...(rule.type === "hijri" ? { approx: true } : {}) });
    }
  }
  return out.sort((a, b) => (a.start < b.start ? -1 : 1)).filter((o, i, a) => i === 0 || o.start !== a[i - 1]!.start);
}

/** Prochaine occurrence (en cours ou à venir) à partir de `today`, sur 3 ans. */
export function nextOccurrence(rule: VoyageEventRule, today: string): VoyageEventOccurrence | null {
  const y = Number(today.slice(0, 4));
  return eventOccurrences(rule, today, `${y + 3}-12-31`)[0] ?? null;
}

/** Règle valide ? (admin et contenu de départ) */
export function isValidEventRule(r: unknown): r is VoyageEventRule {
  if (!r || typeof r !== "object") return false;
  const x = r as Record<string, unknown>;
  const int = (v: unknown, min: number, max: number) => Number.isInteger(v) && (v as number) >= min && (v as number) <= max;
  const days = x.days === undefined || int(x.days, 1, 120);
  switch (x.type) {
    case "fixed":
      return int(x.month, 1, 12) && int(x.day, 1, 31) && days;
    case "easter":
      return int(x.offset, -60, 70) && days;
    case "hijri":
      return int(x.month, 1, 12) && int(x.day, 1, 30) && days;
    case "nth-weekday":
      return int(x.month, 1, 12) && int(x.weekday, 0, 6) && [1, 2, 3, 4, 5, -1].includes(x.nth as number) && days;
    case "period":
      return int(x.from, 1, 12) && int(x.to, 1, 12);
    default:
      return false;
  }
}

/** Règle nettoyée (champs connus seulement). */
export function cleanEventRule(r: VoyageEventRule): VoyageEventRule {
  const d = r.type !== "period" && r.days && r.days > 1 ? { days: r.days } : {};
  switch (r.type) {
    case "fixed":
      return { type: "fixed", month: r.month, day: r.day, ...d };
    case "easter":
      return { type: "easter", offset: r.offset, ...d };
    case "hijri":
      return { type: "hijri", month: r.month, day: r.day, ...d };
    case "nth-weekday":
      return { type: "nth-weekday", month: r.month, weekday: r.weekday, nth: r.nth, ...d };
    case "period":
      return { type: "period", from: r.from, to: r.to };
  }
}
