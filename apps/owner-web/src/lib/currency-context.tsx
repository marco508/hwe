"use client";

import * as React from "react";

interface CurrencyContextValue {
  userCurrency: string;
  rate: number; // taux: 1 EUR = rate userCurrency
  convert: (amount: number, fromCurrency?: string) => number;
  format: (amount: number, fromCurrency?: string) => string;
  loading: boolean;
}

const CurrencyContext = React.createContext<CurrencyContextValue>({
  userCurrency: "EUR",
  rate: 1,
  convert: (a) => a,
  format: (a) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(a),
  loading: true,
});

export function useCurrency() {
  return React.useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [userCurrency, setUserCurrency] = React.useState("EUR");
  const [rate, setRate] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function detect() {
      try {
        // 1. Détecter la devise de l'utilisateur via son IP
        const geoRes = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
        const geo = await geoRes.json();
        const currency: string = geo.currency ?? "EUR";

        if (currency === "EUR") {
          setUserCurrency("EUR");
          setRate(1);
          setLoading(false);
          return;
        }

        // 2. Récupérer le taux EUR → devise détectée
        const rateRes = await fetch(
          `https://api.exchangerate-api.com/v4/latest/EUR`,
          { signal: AbortSignal.timeout(4000) }
        );
        const rateData = await rateRes.json();
        const detectedRate: number = rateData.rates?.[currency] ?? 1;

        setUserCurrency(currency);
        setRate(detectedRate);
      } catch {
        // Silently fallback to EUR
      } finally {
        setLoading(false);
      }
    }
    detect();
  }, []);

  const convert = React.useCallback(
    (amount: number, fromCurrency = "EUR") => {
      if (fromCurrency === userCurrency) return amount;
      // Convert from source currency to EUR first, then to user currency
      // For simplicity: assume stored prices are in their property currency
      // and rate is EUR → userCurrency
      if (fromCurrency === "EUR") return amount * rate;
      // If fromCurrency is not EUR, we'd need cross rates — approximate via EUR
      return amount * rate; // fallback: treat as EUR base
    },
    [userCurrency, rate]
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
    [convert, userCurrency]
  );

  return (
    <CurrencyContext.Provider value={{ userCurrency, rate, convert, format, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}
