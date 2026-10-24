"use client";

import * as React from "react";
import {
  ThemeToggle,
  CurrencySwitch,
  CurrencyProvider,
  LocationProvider,
  Toaster,
  TENANT_URL,
  OWNER_URL,
} from "@hwe/ui";
import { t, LangProvider, LangSwitch } from "../lib/i18n";
import { LocalizedTitle } from "./LocalizedTitle";

/**
 * Coque commune de la landing et des pages légales : fournisseurs (langue,
 * devise, localisation), en-tête responsive et pied de page.
 * Rien ici ne lit window / localStorage / navigator pendant le rendu :
 * les préférences sont appliquées après le montage (pas d'écart serveur/client).
 */
export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <LocalizedTitle />
      <CurrencyProvider>
        <LocationProvider>
          {children}
          <Toaster />
        </LocationProvider>
      </CurrencyProvider>
    </LangProvider>
  );
}

export interface NavLink {
  label: string;
  href: string;
}

/**
 * En-tête : liens d'ancre (desktop), contrôles à droite. Sous `sm`, la
 * langue, la devise et le lien « Propriétaire » passent dans un tiroir
 * ouvert par un bouton menu accessible (M4).
 */
export function SiteHeader({
  links = [],
  extra,
  homeHref = "/",
}: {
  links?: NavLink[];
  /** Contrôle supplémentaire toujours visible (ex. sélecteur de pays). */
  extra?: React.ReactNode;
  homeHref?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 dark:bg-background/85 border-b border-border/60 backdrop-blur-md">
      <div className="container-app flex items-center justify-between h-16 gap-2 sm:gap-4">
        <a href={homeHref} className="flex items-center gap-2 shrink-0" aria-label="hwe">
          <LogoMark />
          <span className="display-serif text-2xl tracking-tight text-ink">hwe</span>
        </a>
        {links.length > 0 && (
          <nav className="hidden lg:flex items-center gap-7 text-sm text-ink-muted">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {extra}
          <LangSwitch className="hidden sm:inline-flex" />
          <CurrencySwitch className="hidden md:inline-flex" />
          <ThemeToggle />
          <a
            href={`${OWNER_URL}/login`}
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 hover:opacity-90 transition-opacity"
          >
            {t("nav.owner")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={t("nav.menu")}
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-full border border-border bg-surface text-ink shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id={panelId} className="md:hidden border-t border-border bg-surface/95">
          <div className="container-app py-4 grid gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-ink hover:bg-cream-100 dark:hover:bg-white/[0.04]"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`${OWNER_URL}/login`}
              className="block px-3 py-2.5 rounded-lg text-sm text-ink hover:bg-cream-100 dark:hover:bg-white/[0.04]"
            >
              {t("nav.owner")}
            </a>
            <a
              href={`${TENANT_URL}/login`}
              className="block px-3 py-2.5 rounded-lg text-sm text-ink hover:bg-cream-100 dark:hover:bg-white/[0.04]"
            >
              {t("footer.tenant")}
            </a>
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-1 border-t border-border/60">
              <LangSwitch />
              <CurrencySwitch />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/** Pied de page commun (liens légaux reliés, U5). */
export function SiteFooter({ exploreLinks }: { exploreLinks?: NavLink[] }) {
  // Année figée au build côté serveur et côté client identique au rendu
  // initial : on l'obtient après montage pour éviter un écart au réveillon.
  const [year, setYear] = React.useState<number | null>(null);
  React.useEffect(() => setYear(new Date().getFullYear()), []);
  const explore = exploreLinks ?? [
    { label: t("nav.catalog"), href: "/#catalogue" },
    { label: t("nav.how"), href: "/#etapes" },
  ];
  return (
    <footer className="bg-brand-950 text-cream-200 mt-auto">
      <div className="container-app py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <LogoMark inverted />
              <span className="display-serif text-2xl text-cream-50">hwe</span>
            </div>
            <p className="text-cream-200/70 text-sm max-w-md leading-relaxed">{t("footer.about")}</p>
          </div>
          <FooterCol title={t("footer.explore")} links={explore} />
          <FooterCol
            title={t("footer.account")}
            links={[
              { label: t("footer.tenant"), href: `${TENANT_URL}` },
              { label: t("footer.owner"), href: `${OWNER_URL}` },
              { label: t("footer.signup"), href: `${TENANT_URL}/register` },
            ]}
          />
          <FooterCol
            title="hwe"
            links={[
              { label: t("footer.contact"), href: "/mentions-legales#contact" },
              { label: t("footer.legal"), href: "/mentions-legales" },
              { label: t("footer.terms"), href: "/cgu" },
              { label: t("footer.privacy"), href: "/confidentialite" },
            ]}
          />
        </div>
        <div className="border-t border-cream-50/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-200/60">
          <span>{t("footer.tagline", { year: year ?? "" }).replace("©  ", "© ")}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <div className="eyebrow text-cream-200/70 mb-4">{title}</div>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-cream-200/85 hover:text-cream-50 transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Logo : identifiant de dégradé unique (le logo est rendu plusieurs fois). */
export function LogoMark({ inverted = false }: { inverted?: boolean }) {
  const id = React.useId().replace(/:/g, "");
  const gradId = `logo-grad-${id}`;
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={inverted ? "#d3f2e2" : "#0b6143"} />
          <stop offset="100%" stopColor="#e17942" />
        </linearGradient>
      </defs>
      <path d="M6 26 V12 L16 4 L26 12 V26 H20 V18 H12 V26 Z" fill={`url(#${gradId})`} />
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="rtl:-scale-x-100">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
