"use client";

import * as React from "react";
import Link from "next/link";
import {
  PropertyCard,
  EmptyState,
  ErrorState,
  AnimatedBackground,
  countryLabel,
  useAsync,
  useCurrency,
} from "@hwe/ui";
import { api } from "../lib/api";
import type { Property } from "@hwe/types";
import { t } from "../lib/i18n";

export default function HomePage() {
  // Erreur API ≠ catalogue vide (L2). pageSize ≤ 50 (contrat §8).
  const { data, error, loading, reload } = useAsync(() => api.listProperties({ pageSize: 48 }), []);
  const items: Property[] = data?.items ?? [];
  const { format } = useCurrency();
  const [query, setQuery] = React.useState("");
  const [country, setCountry] = React.useState<string>("");

  const visible = items.filter((p) => {
    if (country && p.country !== country) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.propertyType.toLowerCase().includes(q) ||
      t("pf.type." + p.propertyType).toLowerCase().includes(q)
    );
  });

  // Compteurs par pays (codes ISO)
  const countriesSeen = React.useMemo(() => {
    const set = new Map<string, number>();
    for (const p of items) {
      const c = (p.country ?? "").trim().toUpperCase();
      if (!c) continue;
      set.set(c, (set.get(c) ?? 0) + 1);
    }
    return Array.from(set.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  return (
    <section>
      <AnimatedBackground
        variant="blobs"
        className="rounded-2xl border border-border/60 px-5 sm:px-8 py-10 mb-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:justify-between">
          <div className="max-w-2xl min-w-0">
            <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 pulse-dot" />
              {t("market.badge")}
            </span>
            <h1 className="font-display text-4xl mb-2">
              {t("market.title1")} <span className="gradient-text">{t("market.title2")}</span>
            </h1>
            <p className="text-ink-muted">
              {t("market.sub")}
            </p>
          </div>
          <div className="lg:w-80">
            <label htmlFor="market-search" className="block text-xs font-medium text-ink-muted mb-1">
              {t("market.search")}
            </label>
            <div className="relative">
              <input
                id="market-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("market.searchPh")}
                className="h-11 w-full pl-10 pr-3 rounded-lg glass-strong text-sm text-ink outline-none focus-visible:shadow-focus focus-visible:ring-2 focus-visible:ring-brand-400"
              />
              <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Pays présents */}
        {countriesSeen.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={country === ""}
              onClick={() => setCountry("")}
              className={`h-8 px-3 rounded-full text-xs font-medium transition-all border ${
                country === ""
                  ? "bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink border-transparent"
                  : "bg-surface text-ink-muted border-border hover:text-ink"
              }`}
            >
              {t("market.allCountries", { n: items.length })}
            </button>
            {countriesSeen.map(([code, count]) => (
              <button
                key={code}
                type="button"
                aria-pressed={country === code}
                onClick={() => setCountry(country === code ? "" : code)}
                className={`h-8 px-3 rounded-full text-xs font-medium transition-all border ${
                  country === code
                    ? "bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink border-transparent"
                    : "bg-surface text-ink-muted border-border hover:text-ink"
                }`}
              >
                {countryLabel(code, code)} · {count}
              </button>
            ))}
          </div>
        )}
      </AnimatedBackground>

      {error && !data ? (
        <ErrorState error={error} title={t("market.loadError")} onRetry={reload} />
      ) : loading && !data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface overflow-hidden"
            >
              <div className="aspect-[4/5] skeleton" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded skeleton" />
                <div className="h-4 w-1/2 rounded skeleton" />
                <div className="h-5 w-1/3 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : visible.length === 0 ? (
        <EmptyState
          illustration={items.length === 0 ? "home" : "search"}
          title={items.length === 0 ? t("market.emptyTitle") : t("market.noMatchTitle")}
          description={items.length === 0 ? t("market.emptyDesc") : t("market.noMatchDesc")}
          action={
            items.length === 0 ? (
              <Link
                href="/dashboard/new"
                className="inline-flex items-center justify-center h-10 px-4 rounded-md text-sm font-medium text-white hover:text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 shadow-md"
              >
                {t("dash.addFirst")}
              </Link>
            ) : null
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {visible.map((p) => (
            <PropertyCard
              key={p.id}
              title={p.title}
              city={p.city}
              price={p.displayPrice ?? p.price}
              currency={p.currency}
              surface={p.surface}
              rooms={p.rooms}
              listingType={p.listingType}
              propertyType={p.propertyType}
              images={(p.media ?? []).map((m) => ({
                url: m.url,
                alt: m.alt ?? p.title,
              }))}
              thumbnailUrl={p.media?.[0]?.url ?? null}
              // displayPrice = montant de l'unité priceUnit (contrat API) ; vente : prix.
              displayPrice={(p.displayPrice ?? p.price) > 0 ? format(p.displayPrice ?? p.price, p.currency) : "—"}
              priceUnit={p.priceUnit}
              status={p.status}
              href={`/properties/${p.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
