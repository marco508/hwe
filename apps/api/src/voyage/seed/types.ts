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

export interface SeedCountry {
  guide: SeedGuide;
  destinations: SeedDestination[];
  circuits: SeedCircuit[];
  i18n: Partial<Record<SeedLang, SeedI18n>>;
}
