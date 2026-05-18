"use client";

import * as React from "react";
import { cn } from "../utils";
import {
  useLocation,
  groupCountriesByRegion,
  type Country,
} from "./LocationContext";

export interface CountryPickerProps {
  citiesByCountry?: Record<string, string[]>;
  countsByCountry?: Record<string, number>;
  className?: string;
}

/**
 * Country picker with regional groups (Afrique de l'Ouest, Maghreb, Europe…),
 * search field and a separate "Ville" tab.
 */
export const CountryPicker: React.FC<CountryPickerProps> = ({
  citiesByCountry,
  countsByCountry,
  className,
}) => {
  const {
    country,
    countryCode,
    city,
    setCountry,
    setCity,
    isAutoDetected,
    isDetecting,
  } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<"country" | "city">("country");
  const [query, setQuery] = React.useState("");
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Reset query when popover closes
  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const groups = React.useMemo(() => groupCountriesByRegion(), []);

  const filteredGroups = React.useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.trim().toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        countries: g.countries.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.code.toLowerCase().includes(q) ||
            c.propertyCountry.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.countries.length > 0);
  }, [groups, query]);

  const cities = citiesByCountry?.[countryCode] ?? [];

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setTab("country");
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-2 h-9 px-3 rounded-full text-sm font-medium",
          "border border-border bg-surface hover:border-ink/30 transition-colors",
        )}
        title={isAutoDetected ? "Détecté via votre adresse IP" : "Modifier la localisation"}
      >
        <span aria-hidden="true" className="text-base leading-none">{country.flag}</span>
        <span className="hidden sm:inline">{country.name}</span>
        {city && (
          <>
            <span className="text-ink-subtle">·</span>
            <span className="hidden sm:inline text-ink-muted">{city}</span>
          </>
        )}
        {isAutoDetected && (
          <span className="hidden md:inline h-1.5 w-1.5 rounded-full bg-brand-500 pulse-dot" />
        )}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choisir une localisation"
          className="absolute right-0 mt-2 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-surface shadow-elevated z-50 overflow-hidden animate-scale-in origin-top-right"
        >
          {/* Tabs */}
          <div className="flex border-b border-border bg-cream-100/40 dark:bg-surface/60">
            <TabButton active={tab === "country"} onClick={() => setTab("country")}>
              Pays
            </TabButton>
            <TabButton
              active={tab === "city"}
              onClick={() => setTab("city")}
              disabled={cities.length === 0}
            >
              Ville
              {cities.length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-cream-200 dark:bg-surface text-[10px] text-ink-muted">
                  {cities.length}
                </span>
              )}
            </TabButton>
          </div>

          {tab === "country" && (
            <div>
              {isDetecting && (
                <div className="px-4 py-2 text-[11px] text-ink-muted bg-cream-100/60 border-b border-border flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 pulse-dot" />
                  Détection de votre position en cours…
                </div>
              )}
              {/* Search */}
              <div className="px-3 pt-3 pb-2">
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un pays…"
                    className="h-9 w-full pl-9 pr-3 rounded-full border border-border bg-cream-100/40 dark:bg-surface/60 text-sm text-ink placeholder:text-ink-subtle outline-none focus-visible:border-brand-500 focus-visible:shadow-focus"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto pb-1">
                {filteredGroups.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-ink-muted">
                    Aucun pays ne correspond à "{query}"
                  </div>
                )}
                {filteredGroups.map((g) => (
                  <div key={g.region}>
                    <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-[0.16em] text-ink-subtle font-medium">
                      {g.label}
                    </div>
                    <ul>
                      {g.countries.map((c) => {
                        const active = c.code === countryCode;
                        const count = countsByCountry?.[c.code] ?? 0;
                        return (
                          <li key={c.code}>
                            <button
                              type="button"
                              onClick={() => {
                                setCountry(c.code);
                                const hasCities =
                                  (citiesByCountry?.[c.code]?.length ?? 0) > 0;
                                if (hasCities) {
                                  setTab("city");
                                  setQuery("");
                                } else {
                                  setOpen(false);
                                }
                              }}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors",
                                active
                                  ? "bg-cream-200/50 dark:bg-brand-900/30 text-ink"
                                  : "text-ink-muted hover:bg-cream-100 dark:hover:bg-white/[0.04] hover:text-ink",
                              )}
                            >
                              <span aria-hidden="true" className="text-xl leading-none shrink-0">
                                {c.flag}
                              </span>
                              <span className="flex-1 text-left">
                                {c.name}
                                <span className="block text-[10px] text-ink-subtle">
                                  {c.currency}
                                </span>
                              </span>
                              {count > 0 && (
                                <span className="text-[11px] text-ink-subtle whitespace-nowrap">
                                  {count} bien{count > 1 ? "s" : ""}
                                </span>
                              )}
                              {active && (
                                <span className="text-brand-600 dark:text-brand-300">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "city" && (
            <div>
              <div className="max-h-[400px] overflow-y-auto py-1">
                <button
                  type="button"
                  onClick={() => {
                    setCity(null);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                    city === null
                      ? "bg-cream-200/50 dark:bg-brand-900/30 text-ink"
                      : "text-ink-muted hover:bg-cream-100 dark:hover:bg-white/[0.04] hover:text-ink",
                  )}
                >
                  <span aria-hidden="true">🌍</span>
                  <span className="flex-1 text-left">
                    Tout le pays · {country.name}
                  </span>
                  {city === null && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                {cities.map((c) => {
                  const active = c === city;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCity(c);
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                        active
                          ? "bg-cream-200/50 dark:bg-brand-900/30 text-ink"
                          : "text-ink-muted hover:bg-cream-100 dark:hover:bg-white/[0.04] hover:text-ink",
                      )}
                    >
                      <span aria-hidden="true">📍</span>
                      <span className="flex-1 text-left">{c}</span>
                      {active && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="px-4 py-2 text-[11px] text-ink-subtle bg-cream-100/40 dark:bg-surface/40 border-t border-border">
            {isAutoDetected
              ? "Détecté via votre adresse IP"
              : "Choix mémorisé sur cet appareil"}
          </div>
        </div>
      )}
    </div>
  );
};

function TabButton({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex-1 text-[11px] font-semibold uppercase tracking-[0.12em] py-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
        active
          ? "text-ink border-b-2 border-brand-500"
          : "text-ink-muted hover:text-ink border-b-2 border-transparent",
      )}
    >
      {children}
    </button>
  );
}
