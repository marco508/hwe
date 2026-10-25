"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: React.ReactNode;
  audienceLabel?: string;
  right?: React.ReactNode;
  /** Contrôles ajoutés en bas du tiroir mobile (langue, devise…) (M4). */
  mobileExtra?: React.ReactNode;
  /** Largeur sous laquelle les liens passent dans le tiroir (lg si beaucoup de liens). */
  collapseBelow?: "md" | "lg" | "2xl";
}

// Classes littérales (Tailwind ne génère que ce qu'il voit en clair).
const BP = {
  md: { burger: "md:hidden", nav: "hidden md:flex", drawer: "md:hidden" },
  lg: { burger: "lg:hidden", nav: "hidden lg:flex", drawer: "lg:hidden" },
  // Très nombreux liens (compte connecté) : tiroir jusqu'aux très grands écrans.
  "2xl": { burger: "2xl:hidden", nav: "hidden 2xl:flex", drawer: "2xl:hidden" },
} as const;

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  audienceLabel,
  right,
  mobileExtra,
  collapseBelow = "md",
  className,
  children,
  ...props
}) => {
  const bp = BP[collapseBelow];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const childArray = React.Children.toArray(children).filter(
    (c) => React.isValidElement(c),
  ) as React.ReactElement[];

  // Close on Escape and route change (best-effort)
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full border-b border-border/70",
        "bg-surface/85 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70",
        "before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-brand-500/0 before:via-brand-500/70 before:to-accent-500/70",
        className,
      )}
      {...props}
    >
      <div className="container-app flex h-16 items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          {/* Burger mobile (uniquement si on a au moins un lien) */}
          {(childArray.length > 0 || mobileExtra) && (
            <button
              type="button"
              aria-label={tUi("ui.menu")}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                bp.burger,
                "h-9 w-9 inline-flex items-center justify-center rounded-full border border-border bg-surface hover:bg-cream-100 dark:hover:bg-white/5 text-ink shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              )}
              aria-controls="hwe-mobile-nav"
            >
              {mobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          )}
          <div className="font-display text-xl font-semibold gradient-text shrink-0 whitespace-nowrap">
            {brand}
          </div>
          {audienceLabel && (
            <span
              className={cn(
                // Beaucoup de liens (repli en lg) : le badge ne s'affiche que sur très grand écran.
                collapseBelow !== "md" ? "hidden 2xl:inline-block" : "hidden sm:inline-block",
                "rounded-full bg-brand-50 dark:bg-brand-900/50 px-2.5 py-0.5 text-[11px] font-medium text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-800 shrink-0",
              )}
            >
              {audienceLabel}
            </span>
          )}
        </div>

        {/* Liens desktop */}
        <nav className={cn(bp.nav, "items-center gap-3 xl:gap-4 text-sm text-ink-muted whitespace-nowrap min-w-0")}>
          {childArray.map((child, i) =>
            React.cloneElement(child, {
              key: i,
              className: cn(
                "relative hover:text-ink transition-colors",
                "after:absolute after:start-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-brand-500 after:transition-all hover:after:w-full",
                (child as any).props?.className,
              ),
            }),
          )}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">{right}</div>
      </div>

      {/* Drawer mobile */}
      {mobileOpen && (childArray.length > 0 || mobileExtra) && (
        <div id="hwe-mobile-nav" className={cn(bp.drawer, "border-t border-border bg-surface/95 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto")}>
          <nav className="container-app py-4 grid gap-1">
            {childArray.map((child, i) => {
              const own = (child as any).props?.onClick as ((e: unknown) => void) | undefined;
              return React.cloneElement(child, {
                key: `m-${i}`,
                // On conserve le onClick du lien (ex. déconnexion) puis on ferme.
                onClick: (e: unknown) => {
                  own?.(e);
                  setMobileOpen(false);
                },
                className: cn(
                  "block px-3 py-2.5 rounded-lg text-sm text-ink hover:bg-cream-100 dark:hover:bg-white/[0.04] transition-colors",
                  ((child as any).props?.className ?? "").replace(/hidden (md|lg):inline(-flex)?/g, ""),
                ),
              });
            })}
          </nav>
          {mobileExtra && (
            <div className="container-app pb-4 pt-1 flex flex-wrap items-center gap-2 border-t border-border/60">
              {mobileExtra}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
