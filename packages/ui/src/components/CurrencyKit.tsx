"use client";

import * as React from "react";

/**
 * Devise d'affichage — même mécanique qu'AfroChina :
 * choix explicite persisté (hwe.currency), sinon détection par IP au premier
 * passage ; taux récupérés une fois (base EUR) avec repli statique hors ligne.
 * Les prix restent stockés dans leur devise d'origine, seule la présentation
 * est convertie.
 */

export const SUPPORTED_CURRENCIES = [
  { code: "EUR", label: "€ EUR" },
  { code: "XOF", label: "FCFA" },
  { code: "USD", label: "$ USD" },
  { code: "GBP", label: "£ GBP" },
  { code: "CAD", label: "$ CAD" },
  { code: "NGN", label: "₦ NGN" },
] as const;

const CURRENCY_KEY = "hwe.currency";

// Repli si l'API de taux est injoignable (XOF : parité fixe avec l'euro).
const FALLBACK_RATES: Record<string, number> = {
  EUR: 1,
  XOF: 655.957,
  USD: 1.08,
  GBP: 0.85,
  CAD: 1.48,
  NGN: 1750,
};

interface CurrencyContextValue {
  userCurrency: string;
  setUserCurrency: (code: string) => void;
  rates: Record<string, number>;
  convert: (amount: number, fromCurrency?: string) => number;
  format: (amount: number, fromCurrency?: string) => string;
  loading: boolean;
}

const CurrencyContext = React.createContext<CurrencyContextValue>({
  userCurrency: "EUR",
  setUserCurrency: () => {},
  rates: FALLBACK_RATES,
  convert: (a) => a,
  format: (a) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(a),
  loading: true,
});

export function useCurrency() {
  return React.useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [userCurrency, setUserCurrencyState] = React.useState("EUR");
  const [rates, setRates] = React.useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    async function init() {
      // 1. Choix explicite déjà enregistré ?
      let chosen: string | null = null;
      try {
        chosen = window.localStorage.getItem(CURRENCY_KEY);
      } catch {
        /* stockage indisponible */
      }

      if (chosen && FALLBACK_RATES[chosen] != null) {
        if (!cancelled) setUserCurrencyState(chosen);
      } else {
        // 2. Sinon : détection par IP, limitée aux devises supportées.
        try {
          const geoRes = await fetch("https://ipapi.co/json/", {
            signal: AbortSignal.timeout(4000),
          });
          const geo = await geoRes.json();
          const detected: string = geo.currency ?? "EUR";
          if (!cancelled && FALLBACK_RATES[detected] != null) {
            setUserCurrencyState(detected);
          }
        } catch {
          /* EUR par défaut */
        }
      }

      // 3. Taux réels (base EUR), fusionnés au repli statique.
      try {
        const rateRes = await fetch("https://api.exchangerate-api.com/v4/latest/EUR", {
          signal: AbortSignal.timeout(4000),
        });
        const data = await rateRes.json();
        if (!cancelled && data?.rates) {
          setRates((prev) => {
            const merged = { ...prev };
            for (const { code } of SUPPORTED_CURRENCIES) {
              if (typeof data.rates[code] === "number") merged[code] = data.rates[code];
            }
            return merged;
          });
        }
      } catch {
        /* repli statique */
      }

      if (!cancelled) setLoading(false);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const setUserCurrency = React.useCallback((code: string) => {
    if (FALLBACK_RATES[code] == null) return;
    setUserCurrencyState(code);
    try {
      window.localStorage.setItem(CURRENCY_KEY, code);
    } catch {
      /* best effort */
    }
  }, []);

  const convert = React.useCallback(
    (amount: number, fromCurrency = "EUR") => {
      if (fromCurrency === userCurrency) return amount;
      const from = rates[fromCurrency] ?? 1;
      const to = rates[userCurrency] ?? 1;
      return (amount / from) * to;
    },
    [rates, userCurrency],
  );

  const format = React.useCallback(
    (amount: number, fromCurrency = "EUR") => {
      const converted = convert(amount, fromCurrency);
      try {
        return new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: userCurrency,
          maximumFractionDigits: 0,
        }).format(converted);
      } catch {
        return `${Math.round(converted)} ${userCurrency}`;
      }
    },
    [convert, userCurrency],
  );

  return (
    <CurrencyContext.Provider
      value={{ userCurrency, setUserCurrency, rates, convert, format, loading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

/** Sélecteur compact de devise, à poser dans une navbar. */
export function CurrencySwitch({ className = "" }: { className?: string }) {
  const { userCurrency, setUserCurrency } = useCurrency();
  return (
    <select
      aria-label="Devise"
      value={userCurrency}
      onChange={(e) => setUserCurrency(e.target.value)}
      className={
        "h-9 rounded-full border border-border bg-surface px-2.5 text-xs font-medium text-ink-muted hover:text-ink cursor-pointer focus:outline-none " +
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
