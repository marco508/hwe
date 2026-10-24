import { AsyncLocalStorage } from "node:async_hooks";
import type { NextFunction, Request, Response } from "express";
import {
  fallbackChain,
  interpolate,
  intlLocaleOf,
  isLang,
  langFromAcceptLanguage,
  normalizeLang,
  translate,
  type Dict,
  type Dicts,
  type Lang,
} from "@hwe/types";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import ar from "./locales/ar.json";
import errFr from "./errors/fr.json";
import errEn from "./errors/en.json";
import errEs from "./errors/es.json";
import errPt from "./errors/pt.json";
import errAr from "./errors/ar.json";

/**
 * Module i18n de l'API.
 *
 * - `locales/<langue>.json` : textes clé → texte (e-mails, PDF, libellés
 *   générés, validation). fr = référence.
 * - `errors/<langue>.json` : messages d'erreur, la CLÉ étant le message
 *   français tel qu'il est écrit dans le code (catalogue `errors/fr.json`,
 *   tenu à jour par `scripts/i18n-check.mjs --sync-api-errors`). Une clé peut
 *   contenir des `{x}` qui capturent la partie variable du message.
 * - Langue d'une requête : en-tête Accept-Language (posé par les fronts), fr
 *   par défaut. Langue d'un destinataire (e-mails, PDF) : User.locale, fr
 *   par défaut.
 * - Repli d'une clé absente : langue → en → fr.
 */

export type { Lang };

export const API_DICTS: Dicts = { fr: fr as Dict, en: en as Dict, es: es as Dict, pt: pt as Dict, ar: ar as Dict };
export const API_ERRORS: Dicts = {
  fr: errFr as Dict,
  en: errEn as Dict,
  es: errEs as Dict,
  pt: errPt as Dict,
  ar: errAr as Dict,
};

type Params = Record<string, string | number | null | undefined>;

// ───────────────────────── Langue de la requête ─────────────────────────

const als = new AsyncLocalStorage<{ lang: Lang }>();

/** Middleware express : langue de la requête (Accept-Language), fr par défaut. */
export function langMiddleware(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers["accept-language"];
  const lang = langFromAcceptLanguage(Array.isArray(header) ? header[0] : header) ?? "fr";
  als.run({ lang }, () => next());
}

/** Langue de la requête en cours (fr hors requête : tâches planifiées). */
export function requestLang(): Lang {
  return als.getStore()?.lang ?? "fr";
}

/** Exécute `fn` dans une langue donnée (tests, tâches). */
export function withLang<T>(lang: Lang, fn: () => T): T {
  return als.run({ lang }, fn);
}

/** Valeur stockée (User.locale…) → langue prise en charge, sinon `fallback`. */
export function asLang(x: string | null | undefined, fallback: Lang = "fr"): Lang {
  return normalizeLang(x) ?? fallback;
}

export { isLang };

// ───────────────────────── Textes ─────────────────────────

/** Texte d'une clé dans `lang` (repli langue → en → fr). */
export function t(lang: Lang, key: string, params?: Params): string {
  return translate(API_DICTS, lang, key, params);
}

/** Texte d'une clé dans la langue de la requête. */
export function tr(key: string, params?: Params): string {
  return t(requestLang(), key, params);
}

// ───────────────────────── Formats ─────────────────────────

export function intlLocale(lang: Lang): string {
  return intlLocaleOf(lang);
}

/** Montant dans SA devise, formaté selon la langue (repli lisible si devise inconnue). */
export function money(lang: Lang, amount: number, currency = "EUR"): string {
  try {
    return amount.toLocaleString(intlLocale(lang), {
      style: "currency",
      currency: currency || "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

/** Variante pour PDFKit (polices standard) : espaces insécables → espaces simples. */
export function moneyPdf(lang: Lang, amount: number, currency = "EUR"): string {
  return money(lang, amount, currency).replace(/[  ]/g, " ");
}

/** Jour calendaire (stocké à minuit UTC) en toutes lettres : « 1 novembre 2026 ». */
export function longDay(lang: Lang, day: Date): string {
  return day.toLocaleDateString(intlLocale(lang), { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Date courte (« 01/11/2026 ») d'un instant dans le fuseau donné. */
export function shortDate(lang: Lang, d: Date, timeZone = "UTC"): string {
  return d.toLocaleDateString(intlLocale(lang), { day: "2-digit", month: "2-digit", year: "numeric", timeZone });
}

/** Heure (« 14:30 ») d'un instant dans le fuseau donné. */
export function shortTime(lang: Lang, d: Date, timeZone = "UTC"): string {
  return d.toLocaleTimeString(intlLocale(lang), { hour: "2-digit", minute: "2-digit", timeZone });
}

/** « octobre 2026 » / « October 2026 » (mois 1..12). */
export function monthYear(lang: Lang, year: number, month: number): string {
  return new Intl.DateTimeFormat(intlLocale(lang), { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  );
}

/** Nombre selon la langue (« 7,5 » / « 7.5 »). */
export function num(lang: Lang, n: number, maxFractionDigits = 2): string {
  return new Intl.NumberFormat(intlLocale(lang), { maximumFractionDigits: maxFractionDigits }).format(n);
}

// ───────────────────────── Messages d'erreur ─────────────────────────

interface Pattern {
  key: string;
  re: RegExp;
  names: string[];
}

let patterns: Pattern[] | null = null;

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Clés à trous (`{x}`) du catalogue, compilées en expressions régulières. */
function compiledPatterns(): Pattern[] {
  if (patterns) return patterns;
  patterns = Object.keys(API_ERRORS.fr)
    .filter((k) => /\{\w+\}/.test(k))
    .map((key) => {
      const names: string[] = [];
      const re = new RegExp(
        "^" +
          key
            .split(/(\{\w+\})/)
            .map((part) => {
              const m = /^\{(\w+)\}$/.exec(part);
              if (!m) return escapeRe(part);
              names.push(m[1]!);
              return "(.+?)";
            })
            .join("") +
          "$",
        "s",
      );
      return { key, re, names };
    });
  return patterns;
}

function lookup(dicts: Dicts, lang: Lang, key: string): string | null {
  for (const l of fallbackChain(lang)) {
    if (l === "fr") return null;
    const v = dicts[l]?.[key];
    if (typeof v === "string" && v !== "") return v;
  }
  return null;
}

/**
 * Message d'erreur (rédigé en français dans le code) traduit dans `lang`.
 * Inconnu du catalogue → renvoyé tel quel. Les parties variables capturées
 * sont elles-mêmes traduites si le catalogue les connaît, ou via la clé
 * `term.<valeur>` des dictionnaires (« fichier » → `term.fichier` → « file »).
 */
export function translateError(message: string, lang: Lang): string {
  if (lang === "fr" || !message) return message;
  const direct = lookup(API_ERRORS, lang, message);
  if (direct) return direct;
  for (const p of compiledPatterns()) {
    const m = p.re.exec(message);
    if (!m) continue;
    const tpl = lookup(API_ERRORS, lang, p.key);
    if (!tpl) return message;
    const params: Params = {};
    p.names.forEach((n, i) => {
      const v = m[i + 1] ?? "";
      params[n] = lookup(API_ERRORS, lang, v) ?? lookup(API_DICTS, lang, `term.${v}`) ?? v;
    });
    return interpolate(tpl, params);
  }
  return message;
}

/** Réinitialise le cache des motifs (tests). */
export function resetErrorPatterns() {
  patterns = null;
}
