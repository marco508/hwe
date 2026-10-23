"use client";

import * as React from "react";
import { fmtMoney } from "../client/format";
import { tUi } from "./I18nKit";

/**
 * Devise d'affichage (F2, S6).
 *
 * - Les prix restent stockés dans leur devise d'origine ; seule la
 *   présentation est convertie, avec des TAUX INDICATIFS DATÉS (base EUR).
 * - Jamais de taux implicite : si la devise source OU cible est inconnue de
 *   la table, le montant est affiché tel quel dans sa devise d'origine.
 * - XOF et XAF : parité fixe 655,957 pour 1 EUR.
 * - Aucun appel tiers depuis le navigateur (plus d'ipapi.co ni d'API de
 *   taux) : devise mémorisée, sinon déduite de la langue du navigateur.
 * - Les baux et loyers ne passent PAS par ici : ils s'affichent toujours dans
 *   `lease.currency` via fmtMoney().
 */

/** Date des taux indicatifs ci-dessous (à mettre à jour périodiquement). */
export const RATES_DATE = "2025-06-30";

/** Unités de devise pour 1 EUR — valeurs indicatives (sauf parités fixes). */
export const INDICATIVE_RATES: Record<string, number> = {
  EUR: 1,
  // Parités fixes avec l'euro (francs CFA UEMOA / CEMAC)
  XOF: 655.957,
  XAF: 655.957,
  // Indicatifs
  USD: 1.15,
  GBP: 0.85,
  CAD: 1.57,
  CHF: 0.94,
  MAD: 10.5,
  DZD: 151,
  TND: 3.43,
  EGP: 57,
  NGN: 1780,
  GHS: 11.9,
  GNF: 9950,
  KES: 148,
  RWF: 1650,
  ETB: 157,
  TZS: 3000,
  UGX: 4130,
  ZAR: 20.6,
  AOA: 1050,
  NAD: 20.6,
  MGA: 5150,
  MUR: 52.5,
  CDF: 3300,
};

/** Devises proposées dans le sélecteur. */
export const SUPPORTED_CURRENCIES = [
  { code: "EUR", label: "€ EUR" },
  { code: "XOF", label: "FCFA (XOF)" },
  { code: "XAF", label: "FCFA (XAF)" },
  { code: "USD", label: "$ USD" },
  { code: "GBP", label: "£ GBP" },
  { code: "CAD", label: "$ CAD" },
  { code: "CHF", label: "CHF" },
  { code: "MAD", label: "MAD" },
  { code: "NGN", label: "₦ NGN" },
  { code: "GHS", label: "₵ GHS" },
  { code: "KES", label: "KES" },
  { code: "ZAR", label: "ZAR" },
] as const;

const SELECTABLE = new Set<string>(SUPPORTED_CURRENCIES.map((c) => c.code));
const CURRENCY_KEY = "hwe.currency";

// Région de la langue du navigateur → devise par défaut (sans réseau).
const REGION_CURRENCY: Record<string, string> = {
  FR: "EUR", BE: "EUR", LU: "EUR", DE: "EUR", ES: "EUR", IT: "EUR", PT: "EUR", NL: "EUR", IE: "EUR", AT: "EUR",
  CI: "XOF", SN: "XOF", BJ: "XOF", TG: "XOF", BF: "XOF", ML: "XOF", NE: "XOF", GW: "XOF",
  CM: "XAF", GA: "XAF", CG: "XAF", TD: "XAF", CF: "XAF", GQ: "XAF",
  US: "USD", CD: "USD", GB: "GBP", CA: "CAD", CH: "CHF",
  MA: "MAD", NG: "NGN", GH: "GHS", KE: "KES", ZA: "ZAR",
};

function currencyFromBrowser(): string | null {
  try {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const l of langs) {
      const region = l?.split("-")[1]?.toUpperCase();
      const cur = region ? REGION_CURRENCY[region] : undefined;
      if (cur && SELECTABLE.has(cur)) return cur;
    }
  } catch {
    /* navigateur sans navigator.languages */
  }
  return null;
}

/** Convertit `amount` de `from` vers `to`, ou null si une des devises est inconnue. */
export function convertAmount(amount: number, from: string, to: string): number | null {
  const f = (from || "EUR").toUpperCase();
  const t = (to || "EUR").toUpperCase();
  if (f === t) return amount;
  const rf = INDICATIVE_RATES[f];
  const rt = INDICATIVE_RATES[t];
  if (!rf || !rt) return null;
  return (amount / rf) * rt;
}

interface CurrencyContextValue {
  userCurrency: string;
  setUserCurrency: (code: string) => void;
  rates: Record<string, number>;
  ratesDate: string;
  /** Montant converti, ou le montant d'origine si conversion impossible. */
  convert: (amount: number, fromCurrency?: string) => number;
  /** Peut-on convertir depuis cette devise ? */
  canConvert: (fromCurrency?: string) => boolean;
  /**
   * Prix formaté pour l'affichage : converti dans la devise choisie (préfixe
   * « ≈ ») si possible, sinon dans la devise d'origine.
   */
  format: (amount: number, fromCurrency?: string) => string;
  loading: boolean;
}

function makeFormat(userCurrency: string) {
  return (amount: number, fromCurrency = "EUR") => {
    const from = (fromCurrency || "EUR").toUpperCase();
    if (from === userCurrency) return fmtMoney(amount, from);
    const converted = convertAmount(amount, from, userCurrency);
    if (converted === null) return fmtMoney(amount, from);
    // Conversion indicative : arrondie à l'unité et signalée par « ≈ ».
    return `≈ ${fmtMoney(Math.round(converted), userCurrency)}`;
  };
}

const CurrencyContext = React.createContext<CurrencyContextValue>({
  userCurrency: "EUR",
  setUserCurrency: () => {},
  rates: INDICATIVE_RATES,
  ratesDate: RATES_DATE,
  convert: (a) => a,
  canConvert: () => true,
  format: makeFormat("EUR"),
  loading: false,
});

export function useCurrency() {
  return React.useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Rendu serveur et premier rendu client identiques (EUR) : la préférence
  // est appliquée après le montage pour éviter toute erreur d'hydratation.
  const [userCurrency, setUserCurrencyState] = React.useState("EUR");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let chosen: string | null = null;
    try {
      chosen = window.localStorage.getItem(CURRENCY_KEY);
    } catch {
      /* stockage indisponible */
    }
    const next = chosen && SELECTABLE.has(chosen) ? chosen : currencyFromBrowser();
    if (next) setUserCurrencyState(next);
    setLoading(false);
  }, []);

  const setUserCurrency = React.useCallback((code: string) => {
    if (!SELECTABLE.has(code)) return;
    setUserCurrencyState(code);
    try {
      window.localStorage.setItem(CURRENCY_KEY, code);
    } catch {
      /* best effort */
    }
  }, []);

  const value = React.useMemo<CurrencyContextValue>(
    () => ({
      userCurrency,
      setUserCurrency,
      rates: INDICATIVE_RATES,
      ratesDate: RATES_DATE,
      convert: (amount, from = "EUR") => convertAmount(amount, from, userCurrency) ?? amount,
      canConvert: (from = "EUR") => convertAmount(1, from, userCurrency) !== null,
      format: makeFormat(userCurrency),
      loading,
    }),
    [userCurrency, setUserCurrency, loading],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

/** Sélecteur compact de devise, à poser dans une navbar ou un tiroir mobile. */
export function CurrencySwitch({ className = "" }: { className?: string }) {
  const { userCurrency, setUserCurrency, ratesDate } = useCurrency();
  return (
    <select
      aria-label={tUi("ui.currency")}
      title={tUi("ui.ratesNote", { date: ratesDate })}
      value={userCurrency}
      onChange={(e) => setUserCurrency(e.target.value)}
      className={
        "h-9 rounded-full border border-border bg-surface px-2.5 text-xs font-medium text-ink-muted hover:text-ink cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 " +
        className
      }
    >
      {SUPPORTED_CURRENCIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
