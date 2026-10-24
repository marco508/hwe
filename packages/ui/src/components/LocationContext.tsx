"use client";

import * as React from "react";
import { tUi } from "./I18nKit";
import { announceCountryChoice } from "./CurrencyKit";

// ─── Pays supportés ──────────────────────────────────────────────────────────
export type CountryRegion =
  | "africa-west"
  | "africa-central"
  | "africa-north"
  | "africa-east"
  | "africa-south"
  | "africa-islands"
  | "europe";

/** Libellés français des régions (référence) ; affichage : `regionLabel()` (clés ui.region.*). */
export const REGION_LABELS: Record<CountryRegion, string> = {
  "africa-west": "Afrique de l'Ouest",
  "africa-central": "Afrique centrale",
  "africa-north": "Maghreb & Afrique du Nord",
  "africa-east": "Afrique de l'Est",
  "africa-south": "Afrique australe",
  "africa-islands": "Océan Indien",
  europe: "Europe",
};

/** Nom de la région dans la langue courante. */
export function regionLabel(r: CountryRegion): string {
  return tUi(`ui.region.${r}`);
}

/** Display order of regions (Africa first because of primary audience). */
export const REGION_ORDER: CountryRegion[] = [
  "africa-west",
  "africa-central",
  "africa-north",
  "africa-east",
  "africa-south",
  "africa-islands",
  "europe",
];

export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  flag: string;
  currency: string; // ISO 4217 (XOF, XAF, MAD, EUR, NGN, ZAR, …)
  /** Match the `country` field on Property records (locale name in French). */
  propertyCountry: string;
  region: CountryRegion;
}

export const SUPPORTED_COUNTRIES: Country[] = [
  // ── Afrique de l'Ouest ──────────────────────────────────────────────────
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", currency: "XOF", propertyCountry: "Côte d'Ivoire", region: "africa-west" },
  { code: "SN", name: "Sénégal", flag: "🇸🇳", currency: "XOF", propertyCountry: "Sénégal", region: "africa-west" },
  { code: "BJ", name: "Bénin", flag: "🇧🇯", currency: "XOF", propertyCountry: "Bénin", region: "africa-west" },
  { code: "TG", name: "Togo", flag: "🇹🇬", currency: "XOF", propertyCountry: "Togo", region: "africa-west" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫", currency: "XOF", propertyCountry: "Burkina Faso", region: "africa-west" },
  { code: "ML", name: "Mali", flag: "🇲🇱", currency: "XOF", propertyCountry: "Mali", region: "africa-west" },
  { code: "NE", name: "Niger", flag: "🇳🇪", currency: "XOF", propertyCountry: "Niger", region: "africa-west" },
  { code: "GN", name: "Guinée", flag: "🇬🇳", currency: "GNF", propertyCountry: "Guinée", region: "africa-west" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS", propertyCountry: "Ghana", region: "africa-west" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN", propertyCountry: "Nigeria", region: "africa-west" },

  // ── Afrique centrale ────────────────────────────────────────────────────
  { code: "CM", name: "Cameroun", flag: "🇨🇲", currency: "XAF", propertyCountry: "Cameroun", region: "africa-central" },
  { code: "GA", name: "Gabon", flag: "🇬🇦", currency: "XAF", propertyCountry: "Gabon", region: "africa-central" },
  { code: "CG", name: "Congo", flag: "🇨🇬", currency: "XAF", propertyCountry: "Congo", region: "africa-central" },
  { code: "CD", name: "RD Congo", flag: "🇨🇩", currency: "USD", propertyCountry: "RD Congo", region: "africa-central" },
  { code: "TD", name: "Tchad", flag: "🇹🇩", currency: "XAF", propertyCountry: "Tchad", region: "africa-central" },

  // ── Maghreb & Afrique du Nord ───────────────────────────────────────────
  { code: "MA", name: "Maroc", flag: "🇲🇦", currency: "MAD", propertyCountry: "Maroc", region: "africa-north" },
  { code: "DZ", name: "Algérie", flag: "🇩🇿", currency: "DZD", propertyCountry: "Algérie", region: "africa-north" },
  { code: "TN", name: "Tunisie", flag: "🇹🇳", currency: "TND", propertyCountry: "Tunisie", region: "africa-north" },
  { code: "EG", name: "Égypte", flag: "🇪🇬", currency: "EGP", propertyCountry: "Égypte", region: "africa-north" },

  // ── Afrique de l'Est ────────────────────────────────────────────────────
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES", propertyCountry: "Kenya", region: "africa-east" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", currency: "RWF", propertyCountry: "Rwanda", region: "africa-east" },
  { code: "ET", name: "Éthiopie", flag: "🇪🇹", currency: "ETB", propertyCountry: "Éthiopie", region: "africa-east" },
  { code: "TZ", name: "Tanzanie", flag: "🇹🇿", currency: "TZS", propertyCountry: "Tanzanie", region: "africa-east" },
  { code: "UG", name: "Ouganda", flag: "🇺🇬", currency: "UGX", propertyCountry: "Ouganda", region: "africa-east" },

  // ── Afrique australe ────────────────────────────────────────────────────
  { code: "ZA", name: "Afrique du Sud", flag: "🇿🇦", currency: "ZAR", propertyCountry: "Afrique du Sud", region: "africa-south" },
  { code: "AO", name: "Angola", flag: "🇦🇴", currency: "AOA", propertyCountry: "Angola", region: "africa-south" },
  { code: "NA", name: "Namibie", flag: "🇳🇦", currency: "NAD", propertyCountry: "Namibie", region: "africa-south" },

  // ── Océan Indien ────────────────────────────────────────────────────────
  { code: "MG", name: "Madagascar", flag: "🇲🇬", currency: "MGA", propertyCountry: "Madagascar", region: "africa-islands" },
  { code: "MU", name: "Maurice", flag: "🇲🇺", currency: "MUR", propertyCountry: "Maurice", region: "africa-islands" },

  // ── Europe ──────────────────────────────────────────────────────────────
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", propertyCountry: "France", region: "europe" },
  { code: "BE", name: "Belgique", flag: "🇧🇪", currency: "EUR", propertyCountry: "Belgique", region: "europe" },
  { code: "CH", name: "Suisse", flag: "🇨🇭", currency: "CHF", propertyCountry: "Suisse", region: "europe" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺", currency: "EUR", propertyCountry: "Luxembourg", region: "europe" },
  { code: "ES", name: "Espagne", flag: "🇪🇸", currency: "EUR", propertyCountry: "Espagne", region: "europe" },
  { code: "IT", name: "Italie", flag: "🇮🇹", currency: "EUR", propertyCountry: "Italie", region: "europe" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", currency: "EUR", propertyCountry: "Portugal", region: "europe" },
  { code: "DE", name: "Allemagne", flag: "🇩🇪", currency: "EUR", propertyCountry: "Allemagne", region: "europe" },
  { code: "NL", name: "Pays-Bas", flag: "🇳🇱", currency: "EUR", propertyCountry: "Pays-Bas", region: "europe" },
];

/** Code spécial « tous les pays » (aucun filtre géographique). */
export const ALL_COUNTRIES_CODE = "ALL";

/** Pseudo-pays « Tous les pays ». */
export const ALL_COUNTRIES: Country = {
  code: ALL_COUNTRIES_CODE,
  name: "Tous les pays",
  flag: "🌍",
  currency: "EUR",
  propertyCountry: "",
  region: "europe",
};

/**
 * Pays par défaut avant toute préférence : « tous les pays » (même rendu
 * serveur et client → pas d'erreur d'hydratation, aucun bien masqué).
 */
export const DEFAULT_COUNTRY_CODE = ALL_COUNTRIES_CODE;

/** Helper: group countries by region in display order. */
export function groupCountriesByRegion(): {
  region: CountryRegion;
  label: string;
  countries: Country[];
}[] {
  const groups: Record<CountryRegion, Country[]> = {
    "africa-west": [],
    "africa-central": [],
    "africa-north": [],
    "africa-east": [],
    "africa-south": [],
    "africa-islands": [],
    europe: [],
  };
  for (const c of SUPPORTED_COUNTRIES) {
    groups[c.region].push(c);
  }
  return REGION_ORDER.map((r) => ({
    region: r,
    label: regionLabel(r),
    countries: groups[r],
  })).filter((g) => g.countries.length > 0);
}

// ─── Contexte ────────────────────────────────────────────────────────────────
export interface LocationState {
  countryCode: string;
  country: Country;
  city: string | null;
  isAutoDetected: boolean;
  isDetecting: boolean;
  detectedCity: string | null;
  setCountry: (code: string) => void;
  setCity: (city: string | null) => void;
}

const LocationContext = React.createContext<LocationState | null>(null);

const STORAGE_KEY = "hwe:location";

function findCountry(code: string): Country {
  return SUPPORTED_COUNTRIES.find((c) => c.code === code.toUpperCase()) ?? ALL_COUNTRIES;
}

// ─── Provider ────────────────────────────────────────────────────────────────
export interface LocationProviderProps {
  children: React.ReactNode;
  initialCountry?: string;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
  initialCountry = DEFAULT_COUNTRY_CODE,
}) => {
  const [countryCode, setCountryCodeRaw] =
    React.useState<string>(initialCountry);
  const [city, setCityRaw] = React.useState<string | null>(null);
  const [isAutoDetected, setIsAutoDetected] = React.useState(false);
  // Conservés pour compatibilité d'API : plus de détection réseau.
  const isDetecting = false;
  const detectedCity: string | null = null;

  // Préférence appliquée APRÈS le montage (pas d'écart serveur/client) :
  // 1. choix mémorisé ; 2. sinon région de la langue du navigateur, si elle
  // fait partie des pays supportés. Aucun appel réseau tiers (S6).
  React.useEffect(() => {
    const fromStorage = readStored();
    if (fromStorage?.countryCode) {
      setCountryCodeRaw(fromStorage.countryCode);
      setCityRaw(fromStorage.city ?? null);
      setIsAutoDetected(false);
      return;
    }
    const fromBrowser = countryFromBrowser();
    if (fromBrowser) {
      setCountryCodeRaw(fromBrowser);
      setIsAutoDetected(true);
    }
  }, []);

  const setCountry = React.useCallback((code: string) => {
    const upper = code.toUpperCase();
    setCountryCodeRaw(upper);
    setCityRaw(null);
    setIsAutoDetected(false);
    writeStored({ countryCode: upper, city: null });
    // Choix explicite d'un pays : la devise d'affichage suit (modifiable ensuite).
    const chosen = SUPPORTED_COUNTRIES.find((c) => c.code === upper);
    if (chosen) announceCountryChoice(chosen.code, chosen.currency);
  }, []);

  const setCity = React.useCallback(
    (next: string | null) => {
      setCityRaw(next);
      writeStored({ countryCode, city: next });
    },
    [countryCode],
  );

  const country = React.useMemo(() => findCountry(countryCode), [countryCode]);

  const value: LocationState = {
    countryCode,
    country,
    city,
    isAutoDetected,
    isDetecting,
    detectedCity,
    setCountry,
    setCity,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useLocation(): LocationState {
  const ctx = React.useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used within <LocationProvider>");
  }
  return ctx;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
type Stored = { countryCode: string; city: string | null };

function readStored(): Stored | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.countryCode === "string") {
      return {
        countryCode: parsed.countryCode,
        city: typeof parsed.city === "string" ? parsed.city : null,
      };
    }
    return null;
  } catch {
    return null;
  }
}

function writeStored(s: Stored) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

/** Région de la langue du navigateur (« fr-SN » → « SN ») si elle est supportée. */
function countryFromBrowser(): string | null {
  try {
    if (typeof navigator === "undefined") return null;
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const l of langs) {
      const region = l?.split("-")[1]?.toUpperCase();
      if (region && SUPPORTED_COUNTRIES.some((c) => c.code === region)) return region;
    }
  } catch {
    /* rien */
  }
  return null;
}
