"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  city?: string;
  avatarInitials?: string;
  avatarGradient?: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayMs?: number;
  className?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlayMs = 7000,
  className,
}) => {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = testimonials.length;

  React.useEffect(() => {
    if (!autoPlayMs || paused || total <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, paused, total]);

  if (total === 0) return null;

  return (
    <div
      className={cn(
        "relative rounded-3xl border border-border/60 bg-cream-100/60 dark:bg-surface/60 p-8 sm:p-12 overflow-hidden",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative quote mark */}
      <div
        aria-hidden="true"
        className="absolute -top-6 -left-2 sm:-top-8 sm:-left-4 display-serif text-[10rem] sm:text-[14rem] leading-none text-brand-500/10 dark:text-brand-300/10 select-none"
      >
        “
      </div>

      <div className="relative">
        <div className="min-h-[180px] sm:min-h-[140px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-all duration-700",
                i === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none",
              )}
            >
              <p className="display-serif text-2xl sm:text-3xl leading-snug tracking-tight max-w-3xl">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className={cn(
                    "h-11 w-11 rounded-full flex items-center justify-center font-display text-white text-base shrink-0 shadow-md",
                    t.avatarGradient ??
                      "bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500",
                  )}
                >
                  {t.avatarInitials ??
                    t.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                </span>
                <div>
                  <div className="text-sm font-medium text-ink">{t.name}</div>
                  <div className="text-xs text-ink-muted">
                    {[t.role, t.city].filter(Boolean).join(" · ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots & arrows */}
        <div className="flex items-center justify-between mt-8 relative z-10">
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={tUi("ui.viewTestimonial", { n: i + 1 })}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-8 bg-gradient-to-r from-brand-500 to-accent-500"
                    : "w-1.5 bg-border hover:bg-ink-subtle",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={tUi("ui.prevTestimonial")}
              onClick={() => setIndex((i) => (i - 1 + total) % total)}
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border bg-surface hover:bg-cream-100 dark:hover:bg-white/[0.04] transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={tUi("ui.nextTestimonial")}
              onClick={() => setIndex((i) => (i + 1) % total)}
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border bg-surface hover:bg-cream-100 dark:hover:bg-white/[0.04] transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
