"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface CategoryRailItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface CategoryRailProps {
  items: CategoryRailItem[];
  active?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * Horizontal scrollable rail of category pills with icons.
 * Inspired by the Airbnb category bar at the top of the home.
 */
export const CategoryRail: React.FC<CategoryRailProps> = ({
  items,
  active,
  onChange,
  className,
}) => {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  const updateArrows = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  }, []);

  React.useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: dir * 320,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("relative", className)}>
      {/* Left arrow */}
      <button
        type="button"
        aria-label={tUi("ui.scrollLeft")}
        onClick={() => scrollBy(-1)}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-surface border border-border shadow-card transition-opacity",
          canLeft ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        type="button"
        aria-label={tUi("ui.scrollRight")}
        onClick={() => scrollBy(1)}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-surface border border-border shadow-card transition-opacity",
          canRight ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="no-scrollbar mask-fade-x overflow-x-auto scroll-smooth"
      >
        <div className="flex items-stretch gap-2 sm:gap-3 px-1 py-2 min-w-max">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onChange?.(it.id)}
                className={cn(
                  "group flex flex-col items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl border transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-cream-100 border-brand-500/60 text-ink dark:bg-brand-900/40 dark:border-brand-500/60"
                    : "border-transparent text-ink-muted hover:border-border hover:text-ink hover:bg-cream-100/60 dark:hover:bg-white/[0.04]",
                )}
              >
                <span
                  className={cn(
                    "shrink-0 transition-transform group-hover:-translate-y-0.5",
                    isActive ? "text-brand-700 dark:text-brand-300" : "",
                  )}
                  aria-hidden="true"
                >
                  {it.icon}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    isActive && "text-ink dark:text-ink",
                  )}
                >
                  {it.label}
                </span>
                {/* Underline indicator */}
                <span
                  className={cn(
                    "h-[2px] w-8 rounded-full mt-0.5 transition-all",
                    isActive
                      ? "bg-gradient-to-r from-brand-500 to-accent-500"
                      : "bg-transparent",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
