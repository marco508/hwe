"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";
import { Icon, type IconName } from "./Icon";

/**
 * Navigation des espaces connectés (locataire, propriétaire, pro) :
 * - barre du haut : marque, 4-5 rubriques (rubrique active surlignée), action
 *   principale, messages, menu « compte » ;
 * - téléphone (< lg) : rubriques dans une barre d'onglets fixée en bas ;
 * - SectionTabs : onglets internes d'une rubrique ; Breadcrumbs : fil d'Ariane.
 * @hwe/ui ne dépend pas de Next : l'app passe la page courante et son <Link>.
 */

/** Composant de lien de l'app (next/link ou <a>) : reçoit href, className, children, onClick, aria-*. */
export type NavLinkComponent = React.ElementType;

export interface NavItem {
  key: string;
  href: string;
  label: string;
  icon: IconName;
  /** Chemins de la rubrique : « /x » = exactement, « /x/* » = /x et tout ce qui est dessous. */
  paths?: string[];
  /** Pastille (nombre d'éléments à traiter). */
  badge?: number;
}

export interface AccountMenuLink {
  href: string;
  label: string;
  icon: IconName;
  /** Autre application (lien plein, nouvelle session possible). */
  external?: boolean;
}

export interface AppNavProps {
  pathname: string;
  Link?: NavLinkComponent;
  brand: React.ReactNode;
  audienceLabel?: string;
  /** Rubriques principales (connecté ou non). */
  items: NavItem[];
  /** Bouton d'action principal (ex. « Ajouter un bien »). */
  primaryAction?: { href: string; label: string; icon: IconName };
  /** Cloche des messages (déjà construite par l'app). */
  messages?: React.ReactNode;
  /** Menu « compte » ; absent = visiteur. */
  account?: {
    name: string;
    detail?: string;
    avatarUrl?: string | null;
    links: AccountMenuLink[];
    onLogout: () => void;
  };
  /** Langue, devise, thème : dans le menu compte (connecté) ou à droite / tiroir (visiteur). */
  settings: React.ReactNode;
  /** Boutons Connexion / Créer un compte (visiteur). */
  guest?: React.ReactNode;
  /** Barre d'onglets en bas de l'écran sur téléphone (connecté). */
  mobileTabs?: boolean;
}

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/** Le chemin courant appartient-il à la rubrique ? */
export function navMatch(pathname: string, item: { href: string; paths?: string[] }): boolean {
  const cur = norm(pathname || "/");
  const paths = item.paths ?? [item.href];
  return paths.some((p) => {
    if (p.endsWith("/*")) {
      const base = norm(p.slice(0, -2));
      return cur === base || cur.startsWith(base + "/");
    }
    return cur === norm(p.split("?")[0] ?? p);
  });
}

/** Rubrique active = la première qui correspond (l'ordre des rubriques fait foi). */
function activeKey(pathname: string, items: { key: string; href: string; paths?: string[] }[]) {
  return items.find((i) => navMatch(pathname, i))?.key;
}

const Anchor = ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...p}>{children}</a>;

function Badge({ n, className }: { n?: number; className?: string }) {
  if (!n) return null;
  return (
    <span
      className={cn(
        "min-w-[18px] h-[18px] px-1 rounded-full bg-accent-500 text-white text-[10px] font-semibold leading-[18px] text-center tabular-nums",
        className,
      )}
    >
      {n > 99 ? "99+" : n}
    </span>
  );
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

function useDismiss(open: boolean, close: () => void, ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, ref]);
}

function AccountMenu({
  account,
  settings,
  Link,
  pathname,
}: {
  account: NonNullable<AppNavProps["account"]>;
  settings: React.ReactNode;
  Link: NavLinkComponent;
  pathname: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const close = React.useCallback(() => setOpen(false), []);
  useDismiss(open, close, ref);
  React.useEffect(close, [pathname, close]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={tUi("ui.nav.account")}
        className="inline-flex items-center gap-1.5 h-9 ps-1 pe-2 rounded-full border border-border bg-surface hover:bg-cream-100 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        {account.avatarUrl ? (
          <img src={account.avatarUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
        ) : (
          <span className="h-7 w-7 rounded-full bg-brand-600 text-white text-xs font-semibold inline-flex items-center justify-center">
            {initialsOf(account.name)}
          </span>
        )}
        <span className="hidden xl:inline text-sm text-ink max-w-[9rem] truncate">{account.name.split(" ")[0]}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-muted" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-surface shadow-xl z-50 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-border/70">
            <p className="text-xs text-ink-muted">{tUi("ui.nav.signedInAs")}</p>
            <p className="font-semibold text-ink truncate">{account.name}</p>
            {account.detail && <p className="text-xs text-ink-muted truncate">{account.detail}</p>}
          </div>
          <div className="py-1">
            {account.links.map((l) => {
              const cls =
                "flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-cream-100 dark:hover:bg-white/[0.05]";
              const inner = (
                <>
                  <Icon name={l.icon} size={16} className="text-ink-muted shrink-0" />
                  <span className="flex-1">{l.label}</span>
                  {l.external && (
                    <Icon name="arrowRight" size={14} className="text-ink-muted" />
                  )}
                </>
              );
              return l.external ? (
                <a key={l.href} href={l.href} role="menuitem" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cls}
                  onClick={close}
                  aria-current={navMatch(pathname, { href: l.href }) ? "page" : undefined}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
          <div className="px-4 py-3 border-t border-border/70">
            <p className="text-xs text-ink-muted mb-2">{tUi("ui.nav.preferences")}</p>
            <div className="flex flex-wrap items-center gap-2">{settings}</div>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              close();
              account.onLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ink border-t border-border/70 hover:bg-cream-100 dark:hover:bg-white/[0.05]"
          >
            <Icon name="arrowLeft" size={16} className="text-ink-muted" />
            {tUi("ui.nav.logout")}
          </button>
        </div>
      )}
    </div>
  );
}

export function AppNav({
  pathname,
  Link = Anchor,
  brand,
  audienceLabel,
  items,
  primaryAction,
  messages,
  account,
  settings,
  guest,
  mobileTabs = true,
}: AppNavProps) {
  const active = activeKey(pathname, items);
  const [drawer, setDrawer] = React.useState(false);
  React.useEffect(() => setDrawer(false), [pathname]);
  const tabbar = !!account && mobileTabs && items.length > 1;

  // Espace réservé en bas de page pour la barre d'onglets (téléphone).
  React.useEffect(() => {
    document.body.classList.toggle("hwe-has-tabbar", tabbar);
    return () => document.body.classList.remove("hwe-has-tabbar");
  }, [tabbar]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full border-b border-border/70",
          "bg-surface/85 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70",
          "before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-brand-500/0 before:via-brand-500/70 before:to-accent-500/70",
        )}
      >
        <div className="container-app flex h-16 items-center gap-3 lg:gap-6">
          {/* Visiteur sur téléphone : tiroir pour les rubriques et les préférences. */}
          {!account && (
            <button
              type="button"
              aria-label={tUi("ui.menu")}
              aria-expanded={drawer}
              aria-controls="hwe-guest-nav"
              onClick={() => setDrawer((v) => !v)}
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full border border-border bg-surface text-ink shrink-0"
            >
              {drawer ? (
                <Icon name="x" size={16} />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          )}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <div className="font-display text-xl font-semibold gradient-text whitespace-nowrap">{brand}</div>
            {audienceLabel && (
              <span className="hidden 2xl:inline-block rounded-full bg-brand-50 dark:bg-brand-900/50 px-2.5 py-0.5 text-[11px] font-medium text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-800">
                {audienceLabel}
              </span>
            )}
          </div>

          <nav aria-label={tUi("ui.nav.main")} className="hidden lg:flex items-center gap-1 min-w-0">
            {items.map((it) => {
              const on = it.key === active;
              return (
                <Link
                  key={it.key}
                  href={it.href}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-sm whitespace-nowrap transition-colors",
                    on
                      ? "bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 font-medium"
                      : "text-ink-muted hover:text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40",
                  )}
                >
                  <Icon name={it.icon} size={16} />
                  {it.label}
                  <Badge n={it.badge} />
                </Link>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-1.5 sm:gap-2 shrink-0">
            {primaryAction && account && (
              <Link
                href={primaryAction.href}
                className="hidden md:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 hover:text-white dark:bg-brand-500"
              >
                <Icon name={primaryAction.icon} size={16} />
                {primaryAction.label}
              </Link>
            )}
            {account ? (
              <>
                {messages}
                <AccountMenu account={account} settings={settings} Link={Link} pathname={pathname} />
              </>
            ) : (
              <>
                <div className="hidden lg:flex items-center gap-2">{settings}</div>
                {guest}
              </>
            )}
          </div>
        </div>

        {!account && drawer && (
          <div id="hwe-guest-nav" className="lg:hidden border-t border-border bg-surface/95 backdrop-blur-xl">
            <nav aria-label={tUi("ui.nav.main")} className="container-app py-3 grid gap-1">
              {items.map((it) => (
                <Link
                  key={it.key}
                  href={it.href}
                  aria-current={it.key === active ? "page" : undefined}
                  onClick={() => setDrawer(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm",
                    it.key === active ? "bg-brand-50 dark:bg-brand-900/40 text-ink font-medium" : "text-ink hover:bg-cream-100 dark:hover:bg-white/[0.04]",
                  )}
                >
                  <Icon name={it.icon} size={16} className="text-ink-muted" />
                  {it.label}
                </Link>
              ))}
            </nav>
            <div className="container-app pb-4 pt-1 flex flex-wrap items-center gap-2 border-t border-border/60">{settings}</div>
          </div>
        )}
      </header>

      {tabbar && (
        <nav
          aria-label={tUi("ui.nav.main")}
          className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-surface/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
        >
          <div className="grid h-16" style={{ gridTemplateColumns: `repeat(${items.length + (primaryAction ? 1 : 0)}, minmax(0, 1fr))` }}>
            {items.map((it, i) => {
              const on = it.key === active;
              const cell = (
                <Link
                  key={it.key}
                  href={it.href}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-0.5 text-[11px] leading-tight px-0.5",
                    on ? "text-brand-700 dark:text-brand-300 font-semibold" : "text-ink-muted",
                  )}
                >
                  <span className={cn("relative inline-flex items-center justify-center h-7 w-12 rounded-full", on && "bg-brand-50 dark:bg-brand-900/50")}>
                    <Icon name={it.icon} size={19} />
                    <Badge n={it.badge} className="absolute -top-1 end-1" />
                  </span>
                  <span className="truncate max-w-full">{it.label}</span>
                </Link>
              );
              // Action principale au centre (téléphone), entre les rubriques.
              if (primaryAction && i === Math.floor(items.length / 2)) {
                return (
                  <React.Fragment key={it.key}>
                    <Link
                      href={primaryAction.href}
                      aria-label={primaryAction.label}
                      title={primaryAction.label}
                      className="flex items-center justify-center"
                    >
                      <span className="h-11 w-11 rounded-full bg-brand-600 text-white inline-flex items-center justify-center shadow-md">
                        <Icon name={primaryAction.icon} size={20} />
                      </span>
                    </Link>
                    {cell}
                  </React.Fragment>
                );
              }
              return cell;
            })}
          </div>
        </nav>
      )}
    </>
  );
}

export interface SectionTab {
  href: string;
  label: string;
  icon?: IconName;
  paths?: string[];
  count?: number;
}

/** Onglets d'une rubrique (ex. Candidatures · Visites · Favoris), en tête de page. */
export function SectionTabs({
  tabs,
  pathname,
  Link = Anchor,
  label,
  className,
}: {
  tabs: SectionTab[];
  pathname: string;
  Link?: NavLinkComponent;
  /** Nom de la rubrique (lecteurs d'écran). */
  label: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const active = tabs.find((t) => navMatch(pathname, t))?.href;
  React.useEffect(() => {
    ref.current?.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);
  return (
    <nav aria-label={label} className={cn("-mx-4 px-4 sm:mx-0 sm:px-0 mb-6", className)}>
      <div ref={ref} className="flex items-center gap-1 overflow-x-auto border-b border-border/70 scrollbar-none">
        {tabs.map((t) => {
          const on = t.href === active;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={on ? "page" : undefined}
              className={cn(
                "relative inline-flex items-center gap-1.5 h-11 px-3 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors",
                on
                  ? "border-brand-600 text-ink font-semibold dark:border-brand-400"
                  : "border-transparent text-ink-muted hover:text-ink hover:border-border",
              )}
            >
              {t.icon && <Icon name={t.icon} size={15} />}
              {t.label}
              {!!t.count && (
                <span className="ms-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-cream-100 dark:bg-white/10 text-[10px] font-semibold leading-[18px] text-center text-ink tabular-nums">
                  {t.count > 99 ? "99+" : t.count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/** Fil d'Ariane : « Mes biens › Villa Ouidah ». Le dernier élément = la page courante. */
export function Breadcrumbs({
  items,
  Link = Anchor,
  className,
}: {
  items: { href?: string; label: string }[];
  Link?: NavLinkComponent;
  className?: string;
}) {
  return (
    <nav aria-label={tUi("ui.nav.breadcrumb")} className={cn("mb-4 text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-ink-muted">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="inline-flex items-center gap-1 min-w-0">
              {i > 0 && <Icon name="chevronRight" size={14} className="shrink-0" />}
              {it.href && !last ? (
                <Link href={it.href} className="hover:text-ink underline-offset-2 hover:underline truncate max-w-[16rem]">
                  {it.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn("truncate max-w-[20rem]", last && "text-ink font-medium")}>
                  {it.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
