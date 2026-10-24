"use client";

import * as React from "react";
import {
  COUNTRY_CURRENCY,
  SELECTABLE_CURRENCIES,
  STATIC_EUR_RATES,
  STATIC_RATES_DATE,
  convertWithRates,
  currencyOfCountry,
  withFixedPegs,
  type FxRatesResponse,
} from "@hwe/types";
import { fmtDate, fmtMoney, intlLocale } from "../client/format";
import { request } from "../client/http";
import { getUiLang, readPref, tUi, useDismiss, writePref } from "./I18nKit";
import { Icon } from "./Icon";

/**
 * Devise d'affichage (F2, S6).
 *
 * - Les prix restent stockés dans leur devise d'origine ; seule la
 *   présentation est convertie (« ≈ »), avec les TAUX RÉELS DU JOUR servis par
 *   l'API (`GET /api/fx`, base EUR) ; la table statique de @hwe/types sert
 *   au premier rendu et si l'API est injoignable.
 * - Jamais de taux implicite : devise source OU cible inconnue → montant
 *   affiché tel quel dans sa devise d'origine.
 * - XOF et XAF : parité fixe 655,957 pour 1 EUR.
 * - Aucun appel tiers depuis le navigateur.
 * - Choix mémorisé dans un cookie du domaine parent (partagé entre les
 *   apps), localStorage en secours ; première visite : région du navigateur
 *   → devise (table complète pays → devise). Choisir un pays (sélecteur de
 *   pays) règle la devise sur celle du pays ; l'utilisateur peut la changer.
 * - Montants contractuels (baux, loyers, honoraires…) : toujours dans leur
 *   devise via fmtMoney(), avec au plus un « ≈ » discret (<Approx />) sur les
 *   tableaux de bord et listes.
 */

/** Date des taux de secours (compatibilité). */
export const RATES_DATE = STATIC_RATES_DATE;

/** Unités de devise pour 1 EUR — taux de secours. */
export const INDICATIVE_RATES: Record<string, number> = withFixedPegs(STATIC_EUR_RATES);

/** Devises proposées dans le sélecteur (compatibilité : { code, label }). */
export const SUPPORTED_CURRENCIES = SELECTABLE_CURRENCIES.map((code) => ({ code, label: code }));

const SELECTABLE = new Set<string>(SELECTABLE_CURRENCIES);
const CURRENCY_KEY = "hwe.currency";
export const CURRENCY_COOKIE = "hwe_currency";

/** Événement émis quand l'utilisateur choisit un pays (sélecteurs de pays). */
export const COUNTRY_CHOSEN_EVENT = "hwe:country-chosen";

/** À appeler quand l'utilisateur choisit un pays : la devise d'affichage suit. */
export function announceCountryChoice(countryCode: string, currency?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COUNTRY_CHOSEN_EVENT, { detail: { country: countryCode, currency } }));
}

function currencyFromBrowser(): string | null {
  try {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const l of langs) {
      const region = l?.split("-")[1]?.toUpperCase();
      const cur = region ? COUNTRY_CURRENCY[region] : undefined;
      if (cur && SELECTABLE.has(cur)) return cur;
    }
  } catch {
    /* navigateur sans navigator.languages */
  }
  return null;
}

/** Convertit avec les taux de secours (compatibilité), ou null si une devise est inconnue. */
export function convertAmount(amount: number, from: string, to: string): number | null {
  return convertWithRates(amount, from, to, INDICATIVE_RATES);
}

/** Symbole d'une devise dans la langue courante (« € », « FCFA », « $ US »…). */
export function currencySymbol(code: string, lang = getUiLang()): string {
  try {
    const parts = new Intl.NumberFormat(intlLocale(lang), { style: "currency", currency: code, currencyDisplay: "narrowSymbol" }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value ?? code;
  } catch {
    return code;
  }
}

const currencyNames = new Map<string, Intl.DisplayNames | null>();
/** Nom de la devise dans la langue courante (Intl.DisplayNames). */
export function currencyName(code: string, lang = getUiLang()): string {
  let f = currencyNames.get(lang);
  if (f === undefined) {
    try {
      f = new Intl.DisplayNames([intlLocale(lang)], { type: "currency" });
    } catch {
      f = null;
    }
    currencyNames.set(lang, f);
  }
  try {
    return f?.of(code) ?? code;
  } catch {
    return code;
  }
}

interface CurrencyContextValue {
  userCurrency: string;
  setUserCurrency: (code: string) => void;
  rates: Record<string, number>;
  /** Date réelle des taux (AAAA-MM-JJ). */
  ratesDate: string;
  /** « open.er-api.com », « ecb », « static ». */
  ratesSource: string;
  /** Montant converti, ou le montant d'origine si conversion impossible. */
  convert: (amount: number, fromCurrency?: string) => number;
  /** Peut-on convertir depuis cette devise ? */
  canConvert: (fromCurrency?: string) => boolean;
  /**
   * Prix formaté pour l'affichage : converti dans la devise choisie (préfixe
   * « ≈ ») si possible, sinon dans la devise d'origine.
   */
  format: (amount: number, fromCurrency?: string) => string;
  /** « ≈ 65 596 FCFA » si la devise d'affichage diffère et que la conversion est possible, sinon null. */
  approx: (amount: number, fromCurrency?: string) => string | null;
  loading: boolean;
}

function makeFormat(userCurrency: string, rates: Record<string, number>) {
  return (amount: number, fromCurrency = "EUR") => {
    const from = (fromCurrency || "EUR").toUpperCase();
    if (from === userCurrency) return fmtMoney(amount, from);
    const converted = convertWithRates(amount, from, userCurrency, rates);
    if (converted === null) return fmtMoney(amount, from);
    // Conversion indicative : arrondie à l'unité et signalée par « ≈ ».
    return `≈ ${fmtMoney(Math.round(converted), userCurrency)}`;
  };
}

function makeApprox(userCurrency: string, rates: Record<string, number>) {
  return (amount: number, fromCurrency = "EUR") => {
    const from = (fromCurrency || "EUR").toUpperCase();
    if (from === userCurrency || !Number.isFinite(amount)) return null;
    const converted = convertWithRates(amount, from, userCurrency, rates);
    return converted === null ? null : `≈ ${fmtMoney(Math.round(converted), userCurrency)}`;
  };
}

const CurrencyContext = React.createContext<CurrencyContextValue>({
  userCurrency: "EUR",
  setUserCurrency: () => {},
  rates: INDICATIVE_RATES,
  ratesDate: RATES_DATE,
  ratesSource: "static",
  convert: (a) => a,
  canConvert: () => true,
  format: makeFormat("EUR", INDICATIVE_RATES),
  approx: () => null,
  loading: false,
});

export function useCurrency() {
  return React.useContext(CurrencyContext);
}

// Taux partagés entre les montages (une seule requête par page).
let fxPromise: Promise<FxRatesResponse | null> | null = null;
function loadFx(): Promise<FxRatesResponse | null> {
  fxPromise ??= request<FxRatesResponse>("/fx").catch(() => {
    fxPromise = null;
    return null;
  });
  return fxPromise;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Rendu serveur et premier rendu client identiques (EUR, taux de secours) :
  // la préférence et les taux du jour sont appliqués après le montage.
  const [userCurrency, setUserCurrencyState] = React.useState("EUR");
  const [loading, setLoading] = React.useState(true);
  const [fx, setFx] = React.useState<{ rates: Record<string, number>; date: string; source: string }>({
    rates: INDICATIVE_RATES,
    date: RATES_DATE,
    source: "static",
  });

  React.useEffect(() => {
    const chosen = readPref(CURRENCY_COOKIE, CURRENCY_KEY);
    const next = chosen && SELECTABLE.has(chosen) ? chosen : currencyFromBrowser();
    if (next) setUserCurrencyState(next);
    setLoading(false);
    let alive = true;
    void loadFx().then((r) => {
      if (!alive || !r || !r.rates) return;
      setFx({ rates: withFixedPegs({ ...INDICATIVE_RATES, ...r.rates }), date: r.date, source: r.source });
    });
    return () => {
      alive = false;
    };
  }, []);

  const setUserCurrency = React.useCallback((code: string) => {
    const c = (code || "").toUpperCase();
    if (!SELECTABLE.has(c)) return;
    setUserCurrencyState(c);
    writePref(CURRENCY_COOKIE, CURRENCY_KEY, c);
  }, []);

  // Choix d'un pays (landing, marché) → devise du pays.
  React.useEffect(() => {
    const onCountry = (e: Event) => {
      const d = (e as CustomEvent<{ country?: string; currency?: string }>).detail ?? {};
      const cur = (d.currency || currencyOfCountry(d.country, "")).toUpperCase();
      if (cur && SELECTABLE.has(cur)) setUserCurrency(cur);
    };
    window.addEventListener(COUNTRY_CHOSEN_EVENT, onCountry);
    return () => window.removeEventListener(COUNTRY_CHOSEN_EVENT, onCountry);
  }, [setUserCurrency]);

  const value = React.useMemo<CurrencyContextValue>(
    () => ({
      userCurrency,
      setUserCurrency,
      rates: fx.rates,
      ratesDate: fx.date,
      ratesSource: fx.source,
      convert: (amount, from = "EUR") => convertWithRates(amount, from, userCurrency, fx.rates) ?? amount,
      canConvert: (from = "EUR") => convertWithRates(1, from, userCurrency, fx.rates) !== null,
      format: makeFormat(userCurrency, fx.rates),
      approx: makeApprox(userCurrency, fx.rates),
      loading,
    }),
    [userCurrency, setUserCurrency, fx, loading],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

/** Texte de l'infobulle des conversions (date réelle des taux). */
export function useRatesNote(): string {
  const { ratesDate } = useCurrency();
  return tUi("ui.ratesNote", { date: fmtDate(ratesDate, "medium") });
}

/**
 * « ≈ montant converti », discret, à côté d'un montant contractuel (tableaux
 * de bord, listes) — rien si la devise d'affichage est celle du montant.
 */
export function Approx({
  amount,
  currency,
  className = "",
}: {
  amount: number | null | undefined;
  currency: string | null | undefined;
  className?: string;
}) {
  const { approx } = useCurrency();
  const note = useRatesNote();
  if (typeof amount !== "number" || !currency) return null;
  const text = approx(amount, currency);
  if (!text) return null;
  return (
    <span data-approx="" title={note} className={"ms-1 whitespace-nowrap text-xs font-normal text-ink-muted " + className}>
      {text}
    </span>
  );
}

/** Ligne d'une devise : code, symbole, nom dans la langue courante. */
function CurrencyRow({ code }: { code: string }) {
  const sym = currencySymbol(code);
  return (
    <>
      <span className="w-10 shrink-0 font-semibold tabular-nums">{code}</span>
      <span className="w-12 shrink-0 truncate text-ink-muted">{sym !== code ? sym : ""}</span>
      <span className="min-w-0 flex-1 truncate">{currencyName(code)}</span>
    </>
  );
}

/**
 * Sélecteur de devise avec recherche (code, symbole, nom) — contrôlé.
 * `compact` : bouton court pour une barre de navigation.
 */
export function CurrencyPicker({
  value,
  onChange,
  codes = SELECTABLE_CURRENCIES,
  compact = false,
  className = "",
  id,
  label,
  title,
}: {
  value: string;
  onChange: (code: string) => void;
  codes?: readonly string[];
  compact?: boolean;
  className?: string;
  id?: string;
  label?: string;
  title?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const close = React.useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);
  useDismiss(open, close, ref);
  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const q = query.trim().toLowerCase();
  const list = React.useMemo(
    () =>
      codes.filter(
        (c) =>
          !q ||
          c.toLowerCase().includes(q) ||
          currencyName(c).toLowerCase().includes(q) ||
          currencySymbol(c).toLowerCase().includes(q),
      ),
    [codes, q],
  );
  const aria = label ?? tUi("ui.currency");

  return (
    <div ref={ref} className={"relative " + (compact ? "inline-flex " : "flex ") + className}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${aria} : ${value}`}
        title={title}
        data-currency-picker=""
        className={
          compact
            ? "inline-flex h-9 items-center gap-1 rounded-full border border-border bg-surface px-2.5 text-xs font-medium text-ink-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            : "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        }
      >
        <span className="tabular-nums">{value}</span>
        {!compact && <span className="min-w-0 flex-1 truncate text-start text-ink-muted">{currencyName(value)}</span>}
        <Icon name="search" size={compact ? 12 : 14} className="shrink-0 opacity-60" />
      </button>
      {open && (
        <div className="absolute end-0 top-full z-50 mt-1 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-surface p-2 shadow-lg">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tUi("ui.searchCurrency")}
            aria-label={tUi("ui.searchCurrency")}
            data-currency-search=""
            className="mb-2 h-9 w-full rounded-lg border border-border bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" && list[0]) {
                e.preventDefault();
                onChange(list[0]);
                close();
              }
            }}
          />
          <ul role="listbox" aria-label={aria} className="max-h-64 overflow-y-auto">
            {list.length === 0 && <li className="px-3 py-2 text-sm text-ink-muted">{tUi("ui.noCurrencyMatch", { query })}</li>}
            {list.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c === value}
                  data-currency={c}
                  onClick={() => {
                    onChange(c);
                    close();
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-start text-sm ${
                    c === value
                      ? "bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950"
                      : "text-ink hover:bg-cream-100 dark:hover:bg-white/5"
                  }`}
                >
                  <CurrencyRow code={c} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Sélecteur compact de la devise d'affichage, à poser dans une navbar ou un tiroir mobile. */
export function CurrencySwitch({ className = "" }: { className?: string }) {
  const { userCurrency, setUserCurrency } = useCurrency();
  const note = useRatesNote();
  return <CurrencyPicker compact value={userCurrency} onChange={setUserCurrency} className={className} title={note} />;
}
