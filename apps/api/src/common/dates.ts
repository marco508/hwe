/**
 * Dates « jour calendaire ».
 *
 * Toutes les dates métier qui désignent un JOUR (début/fin de bail, échéance
 * de loyer, date d'effet d'un avenant, préavis…) sont stockées à minuit UTC
 * de ce jour, et comparées au « jour courant » du fuseau de la plateforme
 * (Europe/Paris), jamais à l'instant présent : un loyer dû le 5 n'est pas en
 * retard le 5, un bail qui finit le 30 court jusqu'au 30 inclus.
 */

export const APP_TIME_ZONE = process.env.APP_TIME_ZONE || "Europe/Paris";

const DAY_MS = 24 * 3600 * 1000;

const fmtCache = new Map<string, Intl.DateTimeFormat>();
function formatter(tz: string): Intl.DateTimeFormat {
  let f = fmtCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    fmtCache.set(tz, f);
  }
  return f;
}

/** Jour calendaire (dans le fuseau donné) d'un instant, à minuit UTC. */
export function dayOf(instant: Date, tz = APP_TIME_ZONE): Date {
  const parts = formatter(tz).formatToParts(instant);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return new Date(Date.UTC(get("year"), get("month") - 1, get("day")));
}

/** Aujourd'hui (fuseau de la plateforme), à minuit UTC. */
export function today(now: Date = new Date(), tz = APP_TIME_ZONE): Date {
  return dayOf(now, tz);
}

/**
 * Convertit une saisie en jour calendaire : « 2026-11-01 » → 1er novembre ;
 * un horodatage complet → son jour dans le fuseau de la plateforme.
 * Renvoie null si la valeur n'est pas une date valide.
 */
export function toDay(value: string | Date | null | undefined, tz = APP_TIME_ZONE): Date | null {
  if (value == null || value === "") return null;
  if (typeof value === "string") {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    if (m) {
      const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
      // Rejette les dates impossibles (« 2026-02-31 »)
      if (d.getUTCMonth() !== Number(m[2]) - 1) return null;
      return d;
    }
  }
  const d = value instanceof Date ? value : new Date(value);
  if (isNaN(d.getTime())) return null;
  // Déjà à minuit UTC (valeur stockée) : c'est le jour lui-même.
  if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0) {
    return d;
  }
  return dayOf(d, tz);
}

export function addDays(day: Date, n: number): Date {
  return new Date(day.getTime() + n * DAY_MS);
}

/** Nombre de jours de `from` à `to` (jours calendaires, peut être négatif). */
export function diffDays(to: Date, from: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Ajoute n mois en bornant au dernier jour du mois (31 janv. + 1 mois = 28/29 févr.). */
export function addMonths(day: Date, n: number): Date {
  const y = day.getUTCFullYear();
  const m = day.getUTCMonth() + n;
  const targetY = y + Math.floor(m / 12);
  const targetM = ((m % 12) + 12) % 12;
  const d = Math.min(day.getUTCDate(), daysInMonth(targetY, targetM + 1));
  return new Date(Date.UTC(targetY, targetM, d));
}

/** Premier jour du mois (année, mois 1..12). */
export function monthStart(year: number, month: number): Date {
  return new Date(Date.UTC(year, month - 1, 1));
}

/** Dernier jour du mois (année, mois 1..12). */
export function monthEnd(year: number, month: number): Date {
  return new Date(Date.UTC(year, month - 1, daysInMonth(year, month)));
}

/** Format court français d'un jour (« 1 novembre 2026 »). */
export function formatDayFr(day: Date): string {
  return day.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Année d'un instant dans le fuseau de la plateforme. */
export function yearOf(instant: Date = new Date()): number {
  return dayOf(instant).getUTCFullYear();
}
