"use client";

import * as React from "react";
import {
  convertWithRates,
  intlLocaleOf,
  isDefaultPlanName,
  translate,
  type Lang,
  type PlanPrice,
  type PublicPlans,
} from "@hwe/types";
import { UI_DICT, getUiLang, setGlobalParams } from "./I18nKit";
import { useCurrency, INDICATIVE_RATES } from "./CurrencyKit";
import { fmtMoney } from "../client/format";
import { request } from "../client/http";

/**
 * Réglages de l'abonnement des professionnels repris dans les textes
 * (landing, inscription, CGU, espace pro) — source unique : la base, via
 * l'endpoint public GET /plans (PlatformSettings, Plan, PlanPrice).
 *
 * - Chargés une fois par page (cache mémoire 30 s + sessionStorage pour les
 *   rechargements), puis rafraîchis : une modification de l'admin est visible
 *   en moins d'une minute, sans redéploiement.
 * - En attendant (rendu serveur, premier rendu) ou en cas d'échec : valeurs
 *   par défaut identiques aux données de départ de la base.
 * - Injectés dans TOUS les textes (t() de chaque app et tUi) : placeholders
 *   {trialDays}, {trialMonths}, {trialDuration}, {trialDurationLong},
 *   {graceDays}, {graceDuration}, {freeAgents}, {freeMandates},
 *   {freeAgentsText}, {freeMandatesText}, {minPrice}, {planNames},
 *   {paidPlans}. Les composants qui affichent ces textes appellent
 *   `usePlatformTexts()` pour se mettre à jour au chargement.
 */

type PlanLite = Pick<PublicPlans["plans"][number], "code" | "name" | "monthlyPrice" | "currency" | "prices">;

export interface PlatformSettingsData {
  trialDays: number;
  graceDays: number;
  freePlanEnabled: boolean;
  freeLimits: { maxAgents: number | null; maxActiveMandates: number | null };
  minPrice: PlanPrice | null;
  freePlan: PublicPlans["freePlan"];
  plans: PlanLite[];
}

/** Valeurs de départ de la base (migration abonnement) : affichées tant que l'API n'a pas répondu. */
export const PLATFORM_DEFAULTS: PlatformSettingsData = {
  trialDays: 60,
  graceDays: 7,
  freePlanEnabled: true,
  freeLimits: { maxAgents: 1, maxActiveMandates: 2 },
  minPrice: { currency: "EUR", monthlyPrice: 19 },
  freePlan: null,
  plans: [
    { code: "SOLO", name: "Solo", monthlyPrice: 19, currency: "EUR", prices: [{ currency: "EUR", monthlyPrice: 19 }] },
    { code: "AGENCE", name: "Agence", monthlyPrice: 49, currency: "EUR", prices: [{ currency: "EUR", monthlyPrice: 49 }] },
    { code: "RESEAU", name: "Réseau", monthlyPrice: 99, currency: "EUR", prices: [{ currency: "EUR", monthlyPrice: 99 }] },
  ],
};

// ───────────── Magasin (une requête par page) ─────────────

interface StoreState {
  settings: PlatformSettingsData;
  /** Vrai dès qu'une réponse de l'API (ou du cache de session) a été appliquée. */
  loaded: boolean;
  at: number;
  /** Réponse brute (offres complètes : bloc tarifs de la landing). */
  raw: PublicPlans | null;
}

const SERVER_STATE: StoreState = { settings: PLATFORM_DEFAULTS, loaded: false, at: 0, raw: null };
let state: StoreState = SERVER_STATE;
let version = 0;
const listeners = new Set<() => void>();
let inflight: Promise<void> | null = null;
const SESSION_KEY = "hwe.platform";
const FRESH_MS = 30_000;
const SESSION_MAX_MS = 10 * 60_000;

function fromApi(r: PublicPlans): PlatformSettingsData {
  const n = (x: unknown, d: number) => (typeof x === "number" && Number.isFinite(x) ? x : d);
  return {
    trialDays: n(r.trialDays, PLATFORM_DEFAULTS.trialDays),
    graceDays: n(r.graceDays, PLATFORM_DEFAULTS.graceDays),
    freePlanEnabled: typeof r.freePlanEnabled === "boolean" ? r.freePlanEnabled : !!r.freePlan,
    freeLimits: r.freeLimits ?? (r.freePlan ? { maxAgents: r.freePlan.maxAgents, maxActiveMandates: r.freePlan.maxActiveMandates } : PLATFORM_DEFAULTS.freeLimits),
    minPrice: r.minPrice !== undefined ? r.minPrice : PLATFORM_DEFAULTS.minPrice,
    freePlan: r.freePlan ?? null,
    plans: Array.isArray(r.plans) ? r.plans : [],
  };
}

function apply(raw: PublicPlans, at: number) {
  state = { settings: fromApi(raw), loaded: true, at, raw };
  version++;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function hydrateFromSession() {
  if (state.loaded || typeof window === "undefined") return;
  try {
    const c = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) || "null") as { at: number; data: PublicPlans } | null;
    if (c && c.data && Date.now() - c.at < SESSION_MAX_MS) apply(c.data, c.at);
  } catch {
    /* stockage indisponible */
  }
}

/** Recharge les réglages (au plus une requête à la fois ; `force` ignore la fraîcheur). */
export function refreshPlatformSettings(force = false): Promise<void> {
  if (inflight) return inflight;
  if (!force && state.loaded && Date.now() - state.at < FRESH_MS && state.raw) return Promise.resolve();
  inflight = request<PublicPlans>("/plans", force ? { cache: "no-store" } : {})
    .then((r) => {
      const at = Date.now();
      apply(r, at);
      try {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ at, data: r }));
      } catch {
        /* stockage indisponible */
      }
    })
    .catch(() => {
      /* valeurs par défaut (ou dernières connues) */
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Réglages courants + état de chargement (se met à jour quand l'API répond). */
export function usePlatformState(): StoreState {
  const snap = React.useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
  React.useEffect(() => {
    hydrateFromSession();
    void refreshPlatformSettings();
  }, []);
  return snap;
}

export function usePlatformSettings(): PlatformSettingsData {
  return usePlatformState().settings;
}

// ───────────── Mise en mots (dans la langue courante) ─────────────

const tl = (lang: Lang, key: string, params?: Record<string, string | number>) => translate(UI_DICT, lang, key, params);

/** « 7 jours », « 2 mois » (multiple de 30 jours), « 45 jours ». */
export function durationText(days: number, lang: Lang = getUiLang()): string {
  if (days > 0 && days % 30 === 0) return tl(lang, "ui.plat.months", { count: days / 30 });
  return tl(lang, "ui.plat.days", { count: days });
}

/** « 1 agent », « 3 agents », « agents illimités » (null). */
export function agentsText(n: number | null, lang: Lang = getUiLang()): string {
  return n === null ? tl(lang, "ui.plat.agentsUnl") : tl(lang, "ui.plat.agents", { count: n });
}

/** « 1 mandat actif », « 2 mandats actifs », « mandats actifs illimités » (null). */
export function mandatesText(n: number | null, lang: Lang = getUiLang()): string {
  return n === null ? tl(lang, "ui.plat.mandatesUnl") : tl(lang, "ui.plat.mandates", { count: n });
}

const planName = (lang: Lang, p: { code: string; name: string }) =>
  isDefaultPlanName(p.code, p.name) ? tl(lang, `ui.plan.${p.code}`) : p.name;

function listText(lang: Lang, items: string[]): string {
  try {
    return new Intl.ListFormat(intlLocaleOf(lang), { style: "long", type: "conjunction" }).format(items);
  } catch {
    return items.join(", ");
  }
}

/**
 * Prix « à partir de » dans la devise d'affichage : prix PlanPrice de la
 * devise s'il existe pour l'offre la moins chère, sinon son prix EUR avec un
 * « ≈ » converti (taux du jour).
 */
export function minPriceText(
  s: Pick<PlatformSettingsData, "plans" | "minPrice">,
  currency: string,
  rates: Record<string, number> = INDICATIVE_RATES,
  lang: Lang = getUiLang(),
): string {
  const want = (currency || "EUR").toUpperCase();
  const locale = intlLocaleOf(lang);
  type Offer = { currency: string; monthlyPrice: number; exact: boolean; eur: number };
  const offers: Offer[] = [];
  for (const p of s.plans) {
    const prices = p.prices?.length ? p.prices : [{ currency: p.currency, monthlyPrice: p.monthlyPrice }];
    const exact = prices.find((x) => x.currency.toUpperCase() === want);
    const base = exact ?? prices.find((x) => x.currency.toUpperCase() === "EUR") ?? prices[0];
    if (!base || !(base.monthlyPrice > 0)) continue;
    const eur = convertWithRates(base.monthlyPrice, base.currency, "EUR", rates) ?? base.monthlyPrice;
    offers.push({ currency: base.currency.toUpperCase(), monthlyPrice: base.monthlyPrice, exact: !!exact, eur });
  }
  if (!offers.length && s.minPrice) {
    const m = s.minPrice;
    offers.push({ currency: m.currency.toUpperCase(), monthlyPrice: m.monthlyPrice, exact: m.currency.toUpperCase() === want, eur: 0 });
  }
  if (!offers.length) return "";
  const best = offers.reduce((a, b) => (b.eur < a.eur ? b : a));
  const shown = fmtMoney(best.monthlyPrice, best.currency, locale);
  if (best.exact || best.currency === want) return shown;
  const conv = convertWithRates(best.monthlyPrice, best.currency, want, rates);
  if (conv === null) return shown;
  return tl(lang, "ui.plat.approx", { price: shown, approx: fmtMoney(Math.round(conv), want, locale) });
}

export type PlatformParams = Record<string, string | number>;

/** Paramètres de texte (nombres bruts + formulations) pour une langue et une devise. */
export function platformParams(
  s: PlatformSettingsData,
  lang: Lang = getUiLang(),
  currency = "EUR",
  rates: Record<string, number> = INDICATIVE_RATES,
): PlatformParams {
  const trialMonths = s.trialDays > 0 && s.trialDays % 30 === 0 ? s.trialDays / 30 : "";
  const days = tl(lang, "ui.plat.days", { count: s.trialDays });
  const minPrice = minPriceText(s, currency, rates, lang);
  const names = s.plans.map((p) => planName(lang, p));
  const planNames = listText(lang, names);
  return {
    trialDays: s.trialDays,
    trialMonths,
    trialDuration: durationText(s.trialDays, lang),
    trialDurationLong: trialMonths ? tl(lang, "ui.plat.daysAndMonths", { days, months: durationText(s.trialDays, lang) }) : days,
    graceDays: s.graceDays,
    graceDuration: tl(lang, "ui.plat.days", { count: s.graceDays }),
    freeAgents: s.freeLimits.maxAgents ?? "∞",
    freeMandates: s.freeLimits.maxActiveMandates ?? "∞",
    freeAgentsText: agentsText(s.freeLimits.maxAgents, lang),
    freeMandatesText: mandatesText(s.freeLimits.maxActiveMandates, lang),
    minPrice,
    planNames,
    paidPlans: names.length && minPrice ? tl(lang, "ui.plat.paidPlans", { names: planNames, price: minPrice }) : tl(lang, "ui.plat.paidPlansNone"),
  };
}

// Devise d'affichage (posée pendant le rendu par usePlatformTexts, comme la langue).
let displayCurrency = "EUR";
let displayRates: Record<string, number> = INDICATIVE_RATES;
let cache: { key: string; rates: Record<string, number>; v: PlatformParams } | null = null;

function currentParams(lang: Lang): PlatformParams {
  const key = `${lang}|${version}|${displayCurrency}`;
  if (cache && cache.key === key && cache.rates === displayRates) return cache.v;
  const v = platformParams(state.settings, lang, displayCurrency, displayRates);
  cache = { key, rates: displayRates, v };
  return v;
}

// Injection dans tous les textes (t() des apps, tUi).
setGlobalParams(currentParams);

/**
 * À appeler dans tout composant qui affiche un texte dépendant des réglages :
 * abonne le composant (nouveau rendu quand l'API répond ou que la devise
 * change) et renvoie les paramètres (utiles hors t(), ex. textes juridiques).
 */
export function usePlatformTexts(): PlatformParams {
  usePlatformState();
  const { userCurrency, rates } = useCurrency();
  displayCurrency = userCurrency;
  displayRates = rates;
  return currentParams(getUiLang());
}
