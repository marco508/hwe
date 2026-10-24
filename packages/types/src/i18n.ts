/**
 * Langues de la plateforme — partagé par l'API et les trois fronts.
 *
 * - fr = langue de référence (textes d'origine) ; en = traduction complète ;
 *   es, pt, ar = à traduire (fichiers dédiés par langue, voir POLYGLOTTE.md).
 * - Repli d'une clé manquante : langue → en → fr (jamais de clé brute à l'écran
 *   tant que fr la contient).
 * - Locales Intl : ar → `ar-u-nu-latn` (chiffres latins, plus lisibles au
 *   Maghreb).
 */

export const LANGS = ["fr", "en", "es", "pt", "ar"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export interface LangInfo {
  /** Nom de la langue dans la langue elle-même (menu de choix). */
  native: string;
  /** Locale Intl (dates, nombres, montants). */
  intl: string;
  dir: "ltr" | "rtl";
}

export const LANG_INFO: Record<Lang, LangInfo> = {
  fr: { native: "Français", intl: "fr-FR", dir: "ltr" },
  en: { native: "English", intl: "en-GB", dir: "ltr" },
  es: { native: "Español", intl: "es-ES", dir: "ltr" },
  pt: { native: "Português", intl: "pt-PT", dir: "ltr" },
  ar: { native: "العربية", intl: "ar-u-nu-latn", dir: "rtl" },
};

export function isLang(x: unknown): x is Lang {
  return typeof x === "string" && (LANGS as readonly string[]).includes(x);
}

/** « en-US », « pt_BR », « AR » → langue prise en charge, sinon null. */
export function normalizeLang(x: string | null | undefined): Lang | null {
  if (!x) return null;
  const base = String(x).trim().toLowerCase().split(/[-_;,\s]/)[0] ?? "";
  return isLang(base) ? base : null;
}

/** Première langue prise en charge d'une liste (navigator.languages, Accept-Language). */
export function pickLang(candidates: readonly (string | null | undefined)[]): Lang | null {
  for (const c of candidates) {
    const l = normalizeLang(c);
    if (l) return l;
  }
  return null;
}

/** Langue d'un en-tête Accept-Language (« es-ES,es;q=0.9,fr;q=0.8 »), sinon null. */
export function langFromAcceptLanguage(header: string | null | undefined): Lang | null {
  if (!header) return null;
  const parts = header
    .split(",")
    .map((p) => {
      const [tag, ...params] = p.trim().split(";");
      const q = params.map((s) => s.trim()).find((s) => s.startsWith("q="));
      return { tag: tag ?? "", q: q ? Number(q.slice(2)) || 0 : 1 };
    })
    .filter((p) => p.tag && p.tag !== "*")
    .sort((a, b) => b.q - a.q);
  return pickLang(parts.map((p) => p.tag));
}

/** Ordre de recherche d'une clé : langue → en → fr. */
export function fallbackChain(lang: Lang): Lang[] {
  const out: Lang[] = [lang];
  if (!out.includes("en")) out.push("en");
  if (!out.includes("fr")) out.push("fr");
  return out;
}

export function intlLocaleOf(lang: Lang): string {
  return LANG_INFO[lang]?.intl ?? "fr-FR";
}

export type Dict = Record<string, string>;
export type Dicts = Partial<Record<Lang, Dict>> & { fr: Dict };

/** Remplace les `{param}` du texte. */
export function interpolate(text: string, params?: Record<string, string | number | null | undefined>): string {
  if (!params) return text;
  let out = text;
  for (const [k, v] of Object.entries(params)) out = out.split(`{${k}}`).join(String(v ?? ""));
  return out;
}

// ───────────── Pluriels (Intl.PluralRules) ─────────────
//
// Convention : une clé plurielle est une FAMILLE `base.<catégorie>` avec les
// catégories CLDR de la langue — fr/en/es/pt : `one`, `other` ; ar : `zero`,
// `one`, `two`, `few`, `many`, `other`. Passer `{ count: n }` à t() choisit la
// forme de la langue (`base.<catégorie>`, sinon `base.other`, sinon `base`
// tout court) ; `{count}` est remplacé dans le texte comme tout paramètre.
// Rétrocompatible : sans `count`, ou sans famille, la clé simple est utilisée.

export const PLURAL_CATEGORIES = ["zero", "one", "two", "few", "many", "other"] as const;
export type PluralCategory = (typeof PLURAL_CATEGORIES)[number];

const pluralRulesCache = new Map<string, Intl.PluralRules>();

/** Catégorie plurielle CLDR de `count` dans la langue (« other » si Intl indisponible). */
export function pluralCategory(lang: Lang, count: number): PluralCategory {
  try {
    const loc = intlLocaleOf(lang);
    let pr = pluralRulesCache.get(loc);
    if (!pr) {
      pr = new Intl.PluralRules(loc);
      pluralRulesCache.set(loc, pr);
    }
    return pr.select(count) as PluralCategory;
  } catch {
    return count === 1 ? "one" : "other";
  }
}

type Params = Record<string, string | number | null | undefined>;

function pick(dict: Dict | undefined, lang: Lang, key: string, params?: Params): string | null {
  if (!dict) return null;
  const count = params?.count;
  if (typeof count === "number" && Number.isFinite(count)) {
    for (const k of [`${key}.${pluralCategory(lang, count)}`, `${key}.other`]) {
      const v = dict[k];
      if (typeof v === "string" && v !== "") return v;
    }
  }
  const v = dict[key];
  return typeof v === "string" && v !== "" ? v : null;
}

/**
 * Texte d'une clé avec repli langue → en → fr ; la clé seulement si fr l'ignore
 * aussi. Avec `params.count` (nombre), forme plurielle de la langue (voir plus haut).
 */
export function translate(dicts: Dicts, lang: Lang, key: string, params?: Params): string {
  for (const l of fallbackChain(lang)) {
    const v = pick(dicts[l], l, key, params);
    if (v !== null) return interpolate(v, params);
  }
  return interpolate(key, params);
}

/** Vrai si une traduction existe (dans la langue ou ses replis), clé simple ou famille plurielle. */
export function hasKey(dicts: Dicts, lang: Lang, key: string): boolean {
  return fallbackChain(lang).some((l) => pick(dicts[l], l, key, { count: 2 }) !== null);
}

/** Cookie du domaine parent qui porte la langue (partagé entre les 3 apps). */
export const LANG_COOKIE_NAME = "hwe_lang";

/**
 * Script à poser dans <head> : applique lang/dir avant l'hydratation (pas de
 * « saut » de mise en page en arabe). Même ordre que le LangProvider :
 * cookie, localStorage, navigateur, fr.
 */
export const LANG_BOOT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )hwe_lang=([a-z]{2})/);var l=m?m[1]:localStorage.getItem('hwe.lang');if(!l){var n=(navigator.languages&&navigator.languages[0])||navigator.language||'';l=String(n).slice(0,2).toLowerCase();}if(['fr','en','es','pt','ar'].indexOf(l)<0)l='fr';var d=document.documentElement;d.lang=l;d.dir=l==='ar'?'rtl':'ltr';}catch(e){}})();`;
