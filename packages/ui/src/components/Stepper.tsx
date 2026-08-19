"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface StepperItem {
  /** Stable id (unique). */
  id: string;
  /** Short title shown in the rail. */
  title: string;
  /** Short eyebrow / description (optional). */
  subtitle?: string;
  /** Icon (emoji or React node) shown in the rail badge. */
  icon?: React.ReactNode;
  /** Mark this step as completed (filled checkmark). */
  done?: boolean;
}

export interface StepperProps {
  steps: StepperItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** Layout — "horizontal" (rail across the top) or "vertical" (sidebar). */
  layout?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Reusable Stepper with icon badges, animated underline (horizontal) or
 * connecting line (vertical), and click-to-jump navigation.
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeId,
  onChange,
  layout = "horizontal",
  className,
}) => {
  const activeIndex = steps.findIndex((s) => s.id === activeId);

  if (layout === "vertical") {
    return (
      <ol className={cn("relative", className)}>
        {/* Connecting line */}
        <span
          aria-hidden="true"
          className="absolute left-[19px] top-2 bottom-2 w-px bg-border"
        />
        {steps.map((s, i) => {
          const active = s.id === activeId;
          const passed = i < activeIndex || s.done;
          return (
            <li key={s.id} className="relative pl-12 pb-6 last:pb-0">
              <button
                type="button"
                onClick={() => onChange(s.id)}
                className={cn(
                  "absolute left-0 top-0 h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all",
                  active
                    ? "bg-brand-600 text-white ring-4 ring-brand-500/20"
                    : passed
                    ? "bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300"
                    : "bg-surface border border-border text-ink-muted",
                )}
              >
                {passed && !active ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  s.icon ?? <span className="font-display">{i + 1}</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => onChange(s.id)}
                className="text-left block"
              >
                <div
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {s.title}
                </div>
                {s.subtitle && (
                  <div className="text-xs text-ink-subtle mt-0.5">
                    {s.subtitle}
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    );
  }

  // Horizontal layout
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {steps.map((s, i) => {
          const active = s.id === activeId;
          const passed = i < activeIndex || s.done;
          return (
            <React.Fragment key={s.id}>
              <button
                type="button"
                onClick={() => onChange(s.id)}
                className={cn(
                  "group flex items-center gap-2 sm:gap-3 shrink-0 transition-all",
                  "rounded-full px-3 sm:px-4 py-2",
                  active
                    ? "bg-cream-200 dark:bg-brand-900/30"
                    : "hover:bg-cream-100 dark:hover:bg-white/[0.04]",
                )}
              >
                <span
                  className={cn(
                    "h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-sm shrink-0 transition-all",
                    active
                      ? "bg-brand-600 text-white shadow-glow"
                      : passed
                      ? "bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300"
                      : "bg-surface border border-border text-ink-muted",
                  )}
                >
                  {passed && !active ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s.icon ?? <span className="font-display">{i + 1}</span>
                  )}
                </span>
                <div className="text-left hidden sm:block">
                  <div
                    className={cn(
                      "text-[11px] uppercase tracking-[0.14em]",
                      active ? "text-ink-muted" : "text-ink-subtle",
                    )}
                  >
                    {tUi("ui.step", { n: i + 1 })}
                  </div>
                  <div
                    className={cn(
                      "text-sm font-medium leading-tight",
                      active ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {s.title}
                  </div>
                </div>
              </button>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px flex-1 min-w-[12px] transition-colors",
                    passed
                      ? "bg-gradient-to-r from-brand-400 to-brand-300"
                      : "bg-border",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
