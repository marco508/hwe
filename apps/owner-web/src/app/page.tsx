"use client";

import * as React from "react";
import Link from "next/link";
import {
  PropertyCard,
  EmptyState,
  AnimatedBackground,
  Button,
} from "@hwe/ui";
import { api } from "../lib/api";
import type { Property } from "@hwe/types";

export default function HomePage() {
  const [items, setItems] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [country, setCountry] = React.useState<string>("");

  React.useEffect(() => {
    api
      .listProperties({ pageSize: 60 })
      .then((r) => setItems(r.items))
      .finally(() => setLoading(false));
  }, []);

  const visible = items.filter((p) => {
    if (country && p.country !== country) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.propertyType.toLowerCase().includes(q)
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
        className="rounded-2xl border border-border/60 px-8 py-10 mb-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 pulse-dot" />
              Marché immobilier · temps réel
            </span>
            <h1 className="font-display text-4xl mb-2">
              Le marché <span className="gradient-text">immobilier</span>
            </h1>
            <p className="text-ink-muted">
              Tous les biens publiés sur la plateforme — comparez les prix et les annonces.
            </p>
          </div>
          <div className="lg:w-80">
            <label className="block text-xs font-medium text-ink-muted mb-1">
              Recherche rapide
            </label>
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ville, type, titre…"
                className="h-11 w-full pl-10 pr-3 rounded-lg glass-strong text-sm outline-none focus-visible:shadow-focus focus-visible:ring-2 focus-visible:ring-brand-400"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
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
              onClick={() => setCountry("")}
              className={`h-8 px-3 rounded-full text-xs font-medium transition-all border ${
                country === ""
                  ? "bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink border-transparent"
                  : "bg-surface text-ink-muted border-border hover:text-ink"
              }`}
            >
              Tous les pays · {items.length}
            </button>
            {countriesSeen.map(([code, count]) => (
              <button
                key={code}
                type="button"
                onClick={() => setCountry(country === code ? "" : code)}
                className={`h-8 px-3 rounded-full text-xs font-medium transition-all border ${
                  country === code
                    ? "bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink border-transparent"
                    : "bg-surface text-ink-muted border-border hover:text-ink"
                }`}
              >
                {code} · {count}
              </button>
            ))}
          </div>
        )}
      </AnimatedBackground>

      {loading ? (
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
          title={
            items.length === 0
              ? "Le catalogue ouvre ses portes"
              : "Aucun bien ne correspond à votre recherche"
          }
          description={
            items.length === 0
              ? "Publiez votre première annonce — visible immédiatement sur la page publique."
              : "Modifiez les filtres ou essayez d'autres mots-clés."
          }
          action={
            items.length === 0 ? (
              <Link href="/dashboard/new">
                <Button variant="gradient">Ajouter le premier bien</Button>
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
              price={p.price}
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
              href={`/properties/${p.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
