"use client";

import * as React from "react";
import { PropertyCard, Badge, ThemeToggle } from "@hwe/ui";
import { publicApi } from "../lib/api";
import type { Property, ListingType, PropertyType } from "@hwe/types";

// ─── URLs des deux espaces (env ou fallback dev) ─────────────────────────────
const TENANT_URL =
  process.env.NEXT_PUBLIC_TENANT_URL ?? "http://localhost:3001";
const OWNER_URL =
  process.env.NEXT_PUBLIC_OWNER_URL ?? "http://localhost:3004";

// ─── Constantes UI ───────────────────────────────────────────────────────────
const STATS = [
  { value: "148+", label: "biens actifs" },
  { value: "3", label: "grandes villes" },
  { value: "48 h", label: "délai de mise en ligne" },
  { value: "94 %", label: "satisfaction" },
];

const LISTING_TYPE_FILTERS: { label: string; value: "ALL" | ListingType }[] = [
  { label: "Tous", value: "ALL" },
  { label: "Location", value: "RENT" },
  { label: "Vente", value: "SALE" },
];

const PROPERTY_TYPE_FILTERS: { label: string; value: "ALL" | PropertyType }[] =
  [
    { label: "Tout type", value: "ALL" },
    { label: "Appartement", value: "APARTMENT" },
    { label: "Maison", value: "HOUSE" },
    { label: "Studio", value: "STUDIO" },
  ];

// ─── Composant principal ─────────────────────────────────────────────────────
export default function LandingPage() {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [listingFilter, setListingFilter] = React.useState<
    "ALL" | ListingType
  >("ALL");
  const [typeFilter, setTypeFilter] = React.useState<"ALL" | PropertyType>(
    "ALL"
  );

  React.useEffect(() => {
    publicApi
      .listProperties({ pageSize: 9 })
      .then((r) => setProperties(r.items))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  const visible = properties.filter(
    (p) =>
      (listingFilter === "ALL" || p.listingType === listingFilter) &&
      (typeFilter === "ALL" || p.propertyType === typeFilter)
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-surface border-b border-border">
        <div className="container-app flex items-center justify-between h-14">
          {/* Logo */}
          <span className="font-display text-xl text-brand-700 dark:text-brand-300 tracking-tight">
            hwe
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={`${TENANT_URL}/login`}
              className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium
                         border border-border bg-surface text-ink hover:border-ink/30 transition-colors"
            >
              Espace locataire
            </a>
            <a
              href={`${OWNER_URL}/login`}
              className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium
                         bg-brand-600 text-white hover:bg-brand-700 transition-colors"
            >
              Espace propriétaire
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-gradient pt-20 pb-16 text-center">
        <div className="container-app">
          <span
            className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-medium
                           bg-brand-50 text-brand-700 border border-brand-100
                           dark:bg-brand-900/40 dark:text-brand-300 dark:border-brand-800"
          >
            Location · Vente · Gestion immobilière
          </span>

          <h1 className="font-display text-5xl lg:text-6xl leading-[1.1] mb-5 max-w-2xl mx-auto">
            Votre prochain chez-vous commence ici.
          </h1>

          <p className="text-ink-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            hwe connecte locataires et propriétaires autour d'une gestion
            transparente — de la recherche jusqu'à la signature du bail.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`${TENANT_URL}/register`}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-lg text-sm font-medium
                         bg-brand-600 text-white hover:bg-brand-700 transition-colors"
            >
              Trouver un logement
              <ArrowRight />
            </a>
            <a
              href={`${OWNER_URL}/register`}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-lg text-sm font-medium
                         border border-border bg-surface text-ink hover:border-ink/30 transition-colors"
            >
              Publier un bien
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="container-app">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-6 text-center">
                <dt className="text-3xl font-display text-brand-700 dark:text-brand-300 mb-1">
                  {s.value}
                </dt>
                <dd className="text-sm text-ink-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Catalogue ──────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container-app">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl mb-1">Biens disponibles</h2>
              <p className="text-ink-muted text-sm">
                {loading
                  ? "Chargement…"
                  : `${visible.length} annonce${visible.length !== 1 ? "s" : ""} en ce moment`}
              </p>
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-2">
              {LISTING_TYPE_FILTERS.map((f) => (
                <FilterChip
                  key={f.value}
                  active={listingFilter === f.value}
                  onClick={() => setListingFilter(f.value)}
                >
                  {f.label}
                </FilterChip>
              ))}
              <span className="w-px h-6 self-center bg-border" />
              {PROPERTY_TYPE_FILTERS.map((f) => (
                <FilterChip
                  key={f.value}
                  active={typeFilter === f.value}
                  onClick={() => setTypeFilter(f.value)}
                >
                  {f.label}
                </FilterChip>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-16 text-ink-muted">
              Aucun bien ne correspond à ces filtres.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  thumbnailUrl={p.media?.[0]?.url ?? null}
                  /* Redirige vers tenant-web pour voir le détail */
                  href={`${TENANT_URL}/properties/${p.id}`}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <a
              href={`${TENANT_URL}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
            >
              Voir toutes les annonces <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ── Portails ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-brand-50 dark:bg-brand-900/20 border-t border-border">
        <div className="container-app">
          <h2 className="font-display text-3xl text-center mb-2">
            Deux espaces, un seul objectif
          </h2>
          <p className="text-ink-muted text-center mb-10 max-w-lg mx-auto">
            Que vous cherchiez un logement ou que vous gériez un patrimoine,
            hwe a un espace fait pour vous.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Locataire */}
            <PortalCard
              emoji="🏡"
              title="Espace locataire"
              badge="Locataire / Acheteur"
              badgeTone="brand"
              description="Parcourez les annonces, sauvegardez vos favoris, contactez les propriétaires et signez votre bail en ligne."
              features={[
                "Recherche filtrée par type, ville et budget",
                "Favoris et suivi de vos demandes",
                "Signature de bail numérique",
                "Accès à vos documents locatifs",
              ]}
              primaryLabel="Accéder à mon espace"
              primaryHref={`${TENANT_URL}/login`}
              secondaryLabel="Créer un compte locataire"
              secondaryHref={`${TENANT_URL}/register`}
            />

            {/* Propriétaire */}
            <PortalCard
              emoji="🏢"
              title="Espace propriétaire"
              badge="Propriétaire"
              badgeTone="accent"
              description="Publiez vos annonces, gérez les candidatures, établissez des baux et suivez vos revenus locatifs."
              features={[
                "Mise en ligne rapide de vos biens",
                "Gestion centralisée des candidatures",
                "Création et signature de bail",
                "Suivi des loyers et documents",
              ]}
              primaryLabel="Accéder à mon espace"
              primaryHref={`${OWNER_URL}/login`}
              secondaryLabel="Créer un compte propriétaire"
              secondaryHref={`${OWNER_URL}/register`}
              accent
            />
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 mt-auto">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-subtle">
          <span className="font-display text-base text-brand-700 dark:text-brand-300">
            hwe
          </span>
          <span>© {new Date().getFullYear()} hwe — Gestion immobilière simplifiée</span>
          <div className="flex gap-4">
            <a href={`${TENANT_URL}`} className="hover:text-ink transition-colors">
              Espace locataire
            </a>
            <a href={`${OWNER_URL}`} className="hover:text-ink transition-colors">
              Espace propriétaire
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Sous-composants ─────────────────────────────────────────────────────────

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-3 rounded-md text-sm font-medium transition-colors border ${
        active
          ? "bg-brand-600 text-white border-brand-600"
          : "bg-surface text-ink-muted border-border hover:border-ink/30 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-brand-50 dark:bg-brand-900/30" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded bg-brand-100 dark:bg-brand-800/40" />
          <div className="h-5 w-20 rounded bg-brand-100 dark:bg-brand-800/40" />
        </div>
        <div className="h-5 w-3/4 rounded bg-brand-50 dark:bg-brand-900/30" />
        <div className="h-4 w-1/2 rounded bg-brand-50 dark:bg-brand-900/30" />
        <div className="h-5 w-1/3 rounded bg-brand-100 dark:bg-brand-800/40" />
      </div>
    </div>
  );
}

function PortalCard({
  emoji,
  title,
  badge,
  badgeTone,
  description,
  features,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  accent = false,
}: {
  emoji: string;
  title: string;
  badge: string;
  badgeTone: "brand" | "accent";
  description: string;
  features: string[];
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-surface p-8 flex flex-col gap-5 ${
        accent ? "border-brand-300 dark:border-brand-700" : "border-border"
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{emoji}</span>
        <div>
          <Badge tone={badgeTone} className="mb-2">
            {badge}
          </Badge>
          <h3 className="font-display text-xl">{title}</h3>
        </div>
      </div>

      <p className="text-ink-muted text-sm leading-relaxed">{description}</p>

      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 mt-auto pt-2">
        <a
          href={primaryHref}
          className="inline-flex items-center justify-center h-10 px-5 rounded-md text-sm font-medium
                     bg-brand-600 text-white hover:bg-brand-700 transition-colors"
        >
          {primaryLabel}
        </a>
        <a
          href={secondaryHref}
          className="inline-flex items-center justify-center h-10 px-5 rounded-md text-sm font-medium
                     border border-border bg-surface text-ink hover:border-ink/30 transition-colors"
        >
          {secondaryLabel}
        </a>
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 mt-0.5 text-brand-600 dark:text-brand-400"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5 8l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
