/**
 * Format du contenu de départ des guides Voyage (un fichier par pays, fr + en,
 * et un fichier -i18n pour es/pt/ar). Contenu rédigé à partir de connaissances
 * générales : inséré avec `reviewed = false`, donc « à relire » dans l'admin.
 */

export interface SeedPlace {
  slug: string;
  category: "HISTORY" | "CULTURE" | "NATURE" | "BEACH" | "MUSEUM" | "MARKET" | "RELIGION" | "FESTIVAL" | "GASTRONOMY" | "LEISURE";
  name: string;
  summary: string;
  description: string;
  tips?: string;
  bestPeriod?: string;
  visitMinutes?: number;
  lat?: number;
  lng?: number;
  /** Photo : « /images/voyage/lieu-<slug> » (banque statique, crédits dans CREDITS.md). */
  cover?: string;
  en: { name?: string; summary: string; description: string; tips?: string; bestPeriod?: string };
}

export interface SeedDestination {
  slug: string;
  name: string;
  region: string;
  summary: string;
  description: string;
  lat: number;
  lng: number;
  cover?: string;
  en: { name?: string; region?: string; summary: string; description: string };
  places: SeedPlace[];
}

export interface SeedCircuit {
  slug: string;
  title: string;
  summary: string;
  days: number;
  cover?: string;
  en: { title: string; summary: string };
  steps: Array<{ day: number; destination?: string; place?: string; note?: string; noteEn?: string }>;
}

export interface SeedGuide {
  /** Code ISO 3166-1 alpha-2 du pays. */
  country: string;
  intro: string;
  sections: Array<{ title: string; body: string }>;
  en: { intro: string; sections: Array<{ title: string; body: string }> };
}

export type SeedLang = "es" | "pt" | "ar";

export interface SeedI18n {
  guide: { intro: string; sections: Array<{ title: string; body: string }> };
  destinations: Record<string, { name?: string; region?: string; summary: string; description: string }>;
  places: Record<string, { name?: string; summary: string; description: string; tips?: string; bestPeriod?: string }>;
  circuits: Record<string, { title: string; summary: string }>;
  /** Notes d'étapes de circuit, clé = `${slugDuCircuit}:${indexDeLEtapeDansLeTableauSteps}` (index 0-based). */
  stepNotes: Record<string, string>;
}

export type SeedEventKind =
  /** Fête nationale, jour férié civil (indépendance, fête du travail…). */
  | "NATIONAL"
  /** Fête religieuse (Noël, Pâques, Tabaski, Maouloud, fête du vodun…). */
  | "RELIGIOUS"
  /** Cérémonie ou fête traditionnelle (fêtes d'ignames, Evala, Gani…). */
  | "TRADITIONAL"
  /** Festival culturel ou artistique (musique, cinéma, masques…). */
  | "FESTIVAL"
  /** Saison festive, soirées, temps forts saisonniers (fêtes de fin d'année, Detty December…). */
  | "SEASONAL";

/**
 * Règle de date d'un événement (calculée pour chaque année) :
 * - fixed : même jour chaque année ;
 * - easter : décalage en jours par rapport au dimanche de Pâques (calendrier grégorien) ;
 * - hijri : date du calendrier musulman (Umm al-Qura), estimée à ±1 jour ;
 * - nth-weekday : n-ième jour de la semaine du mois (nth = -1 : le dernier ; weekday 0 = dimanche) ;
 * - period : dates variables annoncées chaque année, entre deux mois (inclus).
 * `days` : durée en jours (1 par défaut).
 */
export type SeedEventRule =
  | { type: "fixed"; month: number; day: number; days?: number }
  | { type: "easter"; offset: number; days?: number }
  | { type: "hijri"; month: number; day: number; days?: number }
  | { type: "nth-weekday"; month: number; weekday: number; nth: number; days?: number }
  | { type: "period"; from: number; to: number };

export interface SeedEventText {
  name: string;
  summary: string;
  description: string;
  tips?: string;
  where?: string;
  dateNote?: string;
}

export interface SeedEvent extends SeedEventText {
  slug: string;
  kind: SeedEventKind;
  /** Jour férié officiel (chômé) dans le pays. */
  publicHoliday: boolean;
  /** Slug d'une destination du pays où se déroule l'événement. */
  destination?: string;
  /** Slug d'un lieu du pays. */
  place?: string;
  rule: SeedEventRule;
  /** Se déroule dans une zone déconseillée : avertissement renvoyant à la rubrique Sécurité. */
  caution?: boolean;
  /** Photo : « /images/voyage/fete-<slug> ». */
  cover?: string;
  /** Sources consultées (pour la relecture dans l'admin, non affichées aux voyageurs). */
  sources: string[];
  en: SeedEventText;
  i18n: Record<SeedLang, SeedEventText>;
}

export interface SeedCountry {
  guide: SeedGuide;
  destinations: SeedDestination[];
  circuits: SeedCircuit[];
  i18n: Partial<Record<SeedLang, SeedI18n>>;
  events: SeedEvent[];
}
