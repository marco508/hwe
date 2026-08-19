import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface DestinationCardProps {
  name: string;
  region?: string;
  count?: number;
  /** Optional photo URL (object-cover full bleed). */
  imageUrl?: string | null;
  /** Tailwind background classes for the fallback gradient (e.g. "from-brand-600 to-accent-500"). */
  gradient?: string;
  href?: string;
  /** SVG decoration shown when no image (e.g. mountain silhouette). */
  decoration?: React.ReactNode;
  className?: string;
}

/**
 * Full-bleed destination card with image (or branded gradient fallback)
 * and an editorial overlay. Designed to live in a horizontal rail or
 * an asymmetric grid.
 */
export const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  region,
  count,
  imageUrl,
  gradient = "from-brand-700 via-brand-500 to-accent-500",
  href,
  decoration,
  className,
}) => {
  const Wrapper: React.ElementType = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className={cn(
        "group relative block aspect-[3/4] rounded-3xl overflow-hidden shine-on-hover hover-lift",
        "ring-1 ring-border/60",
        className,
      )}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            gradient,
          )}
          aria-hidden="true"
        >
          {/* Subtle pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25 mix-blend-overlay"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id={`dots-${name.replace(/\s+/g, "")}`}
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill={`url(#dots-${name.replace(/\s+/g, "")})`}
            />
          </svg>
          {decoration}
        </div>
      )}

      {/* Bottom darkening for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

      {/* Top-right count badge */}
      {count !== undefined && (
        <div className="absolute top-4 right-4 glass-strong rounded-full px-3 py-1 text-[11px] font-medium text-ink">
          {count > 1
            ? tUi("ui.countProperties", { n: count })
            : tUi("ui.countProperty", { n: count })}
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        {region && (
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/80 mb-1">
            {region}
          </div>
        )}
        <h3 className="display-serif text-2xl sm:text-3xl text-white leading-none">
          {name}
        </h3>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/90">
          <span>{tUi("ui.discover")}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Wrapper>
  );
};
