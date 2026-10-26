import { BadRequestException } from "@nestjs/common";
import { fallbackChain, isLang, type Lang } from "../shared/hwe-types";
import { publicApiUrl } from "../common/media.util";

/**
 * Contenus des guides Voyage : textes en français dans les colonnes,
 * traductions dans `translations` = { en: { name: "…" }, es: {…} }.
 * Lecture dans une langue : langue → en → fr (comme les dictionnaires).
 */

export type Translations = Partial<Record<Lang, Record<string, string>>>;

/** Champ traduit (repli langue → en → colonne française). */
export function localized(lang: Lang, row: Record<string, unknown>, field: string): string | null {
  const tr = (row.translations ?? null) as Translations | null;
  for (const l of fallbackChain(lang)) {
    if (l === "fr") break;
    const v = tr?.[l]?.[field];
    if (typeof v === "string" && v.trim()) return v;
  }
  const base = row[field];
  return typeof base === "string" ? base : null;
}

/** Copie de `row` avec les champs listés traduits ; `translations` retiré. */
export function localize<T extends Record<string, unknown>>(lang: Lang, row: T, fields: readonly string[]): Omit<T, "translations"> {
  const { translations: _t, ...rest } = row as T & { translations?: unknown };
  const out: Record<string, unknown> = { ...rest };
  for (const f of fields) if (f in row) out[f] = localized(lang, row, f);
  return out as Omit<T, "translations">;
}

/** Image : chemin statique des fronts (« /images/voyage/ouidah ») ou image téléversée. */
export function coverUrl(cover: string | null | undefined): string | null {
  if (!cover) return null;
  if (cover.startsWith("img:")) return `${publicApiUrl()}/media/voyage/${encodeURIComponent(cover.slice(4))}`;
  return cover;
}

const STATIC_COVER = /^\/images\/voyage\/[a-z0-9-]{1,60}$/;
const UPLOADED_COVER = /^img:[a-f0-9]{32}$/;

/** Valide une image saisie dans l'admin (null/"" = aucune). */
export function checkCover(v: string | null | undefined): string | null | undefined {
  if (v === undefined) return undefined;
  if (v === null || v === "") return null;
  if (STATIC_COVER.test(v) || UPLOADED_COVER.test(v)) return v;
  throw new BadRequestException("Image invalide : téléversez une image ou choisissez une image de la banque.");
}

/**
 * Traductions saisies dans l'admin : seules les langues prises en charge
 * (hors fr, qui est dans les colonnes) et les champs prévus sont gardés ;
 * textes vides retirés, longueur bornée.
 */
export function cleanTranslations(input: unknown, fields: readonly string[], maxLen = 8000): Translations | null | undefined {
  if (input === undefined) return undefined;
  if (input === null) return null;
  if (typeof input !== "object" || Array.isArray(input)) {
    throw new BadRequestException("Traductions invalides.");
  }
  const out: Translations = {};
  for (const [lang, values] of Object.entries(input as Record<string, unknown>)) {
    if (!isLang(lang) || lang === "fr" || !values || typeof values !== "object") continue;
    const kept: Record<string, string> = {};
    for (const f of fields) {
      const v = (values as Record<string, unknown>)[f];
      if (typeof v === "string" && v.trim()) kept[f] = v.trim().slice(0, maxLen);
    }
    if (Object.keys(kept).length) out[lang] = kept;
  }
  return Object.keys(out).length ? out : null;
}

/** Identifiant d'URL : minuscules, chiffres, tirets. */
export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const DESTINATION_TEXT = ["name", "region", "summary", "description"] as const;
export const PLACE_TEXT = ["name", "summary", "description", "tips", "openingHours", "priceInfo", "bestPeriod", "address"] as const;
export const CIRCUIT_TEXT = ["title", "summary"] as const;
export const STEP_TEXT = ["note"] as const;
export const GUIDE_TEXT = ["intro"] as const;
export const EVENT_TEXT = ["name", "summary", "description", "tips", "where", "dateNote"] as const;

/** Sections d'un guide pays traduites : translations[lang].sections = JSON [{title, body}]. */
export function localizedSections(lang: Lang, guide: { sections: unknown; translations: unknown }): Array<{ title: string; body: string }> {
  const tr = (guide.translations ?? null) as Record<string, { sections?: unknown }> | null;
  for (const l of fallbackChain(lang)) {
    if (l === "fr") break;
    const s = tr?.[l]?.sections;
    if (Array.isArray(s) && s.length) return cleanSections(s);
  }
  return cleanSections(guide.sections);
}

export function cleanSections(input: unknown): Array<{ title: string; body: string }> {
  if (!Array.isArray(input)) return [];
  return input
    .filter((x): x is { title: unknown; body: unknown } => !!x && typeof x === "object")
    .map((x) => ({ title: String(x.title ?? "").trim().slice(0, 200), body: String(x.body ?? "").trim().slice(0, 4000) }))
    .filter((x) => x.title && x.body)
    .slice(0, 30);
}
