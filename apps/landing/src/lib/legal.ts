/**
 * Contenu des pages légales (U5) — un fichier JSON par langue dans
 * `legal-locales/` (fr = version qui fait foi ; en = traduction ; es, pt, ar
 * à traduire en gardant EXACTEMENT la structure de fr.json).
 *
 * Texte générique pour une plateforme de MISE EN RELATION qui ne détient
 * aucun fonds. Toute information réelle encore inconnue est signalée par le
 * jeton `{{TODO}}`, rendu comme un marqueur visible « [À compléter] » :
 * aucune identité n'est inventée. Les traducteurs laissent ces jetons tels
 * quels. À faire relire par un juriste avant mise en production.
 */
import type { Lang } from "@hwe/ui";
import fr from "./legal-locales/fr.json";
import en from "./legal-locales/en.json";
import es from "./legal-locales/es.json";
import pt from "./legal-locales/pt.json";
import ar from "./legal-locales/ar.json";

export type LegalDocId = "legal" | "terms" | "privacy";

/** Bloc : paragraphe (string) ou liste à puces (string[]). */
export type LegalBlock = string | string[];

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const TODO_TOKEN = "{{TODO}}";

type Tree = unknown;
const SOURCES: Record<Lang, Tree> = { fr, en, es, pt, ar };

/**
 * Valeur de `path` dans la langue, sinon en, sinon fr — la structure suit
 * toujours fr (référence) : une traduction partielle ne casse pas la page.
 */
function pick(trees: Tree[], ref: Tree): Tree {
  if (typeof ref === "string") {
    for (const t of trees) if (typeof t === "string" && t.trim() !== "") return t;
    return ref;
  }
  if (Array.isArray(ref)) {
    return ref.map((r, i) => pick(trees.map((t) => (Array.isArray(t) ? t[i] : undefined)), r));
  }
  if (ref && typeof ref === "object") {
    const out: Record<string, Tree> = {};
    for (const [k, r] of Object.entries(ref as Record<string, Tree>)) {
      out[k] = k === "id" ? r : pick(trees.map((t) => (t && typeof t === "object" ? (t as Record<string, Tree>)[k] : undefined)), r);
    }
    return out;
  }
  return ref;
}

/** Document légal dans la langue (repli langue → en → fr, structure de fr). */
export function legalDoc(lang: Lang, doc: LegalDocId): { content: LegalDoc; translated: boolean } {
  const chain: Lang[] = [lang, "en", "fr"].filter((l, i, a) => a.indexOf(l) === i) as Lang[];
  const trees = chain.map((l) => (SOURCES[l] as Record<string, Tree>)?.[doc]);
  return { content: pick(trees, (fr as Record<string, Tree>)[doc]) as LegalDoc, translated: lang !== "fr" };
}
