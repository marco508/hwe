import * as React from "react";
import { cn } from "../utils";

export interface StepsRailItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface StepsRailProps {
  items: StepsRailItem[];
  className?: string;
}

/**
 * Numbered horizontal/responsive steps with serif numerals and a
 * subtle connecting line on desktop.
 */
export const StepsRail: React.FC<StepsRailProps> = ({ items, className }) => (
  <div className={cn("relative", className)}>
    {/* Connecting line (desktop) */}
    <div
      aria-hidden="true"
      className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-border via-brand-300 to-border"
    />
    <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      {items.map((s, i) => (
        <li key={i} className="text-center md:text-left">
          <div className="flex md:block items-center md:items-start gap-4">
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-cream-100 border border-border display-serif text-2xl text-brand-700 dark:bg-brand-900/40 dark:border-brand-800 dark:text-brand-300 shadow-card shrink-0"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="md:mt-5">
              <h3 className="display-serif text-xl mb-1 flex items-center gap-2">
                {s.icon && (
                  <span aria-hidden="true" className="text-brand-600 dark:text-brand-300">
                    {s.icon}
                  </span>
                )}
                {s.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {s.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  </div>
);
