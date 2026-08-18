"use client";

import * as React from "react";
import { cn } from "../utils";
import { ImageCarousel } from "./ImageCarousel";

export interface PropertyCardProps {
  title: string;
  city: string;
  price: number;
  currency?: string;
  surface: number;
  rooms: number;
  listingType: "SALE" | "RENT";
  propertyType: string;
  thumbnailUrl?: string | null;
  /** Multiple images — when provided, replaces thumbnailUrl and shows a carousel. */
  images?: { url: string; alt?: string | null }[];
  href?: string;
  className?: string;
  footer?: React.ReactNode;
  /** Formatted price string overriding the default formatting (used for currency conversion) */
  displayPrice?: string;
  /** Optional rating (0-5) shown in the top-right corner. */
  rating?: number;
  /** Optional eyebrow label above the title (e.g. "Coup de cœur"). */
  eyebrow?: string;
  /** Show a heart favorite button at top-right. */
  favoritable?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const formatPrice = (n: number, currency = "EUR") => {
  // Try the user's currency. Some platforms refuse exotic codes (rare for ISO 4217
  // but possible) — we fall back to a plain number + ISO code suffix.
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${new Intl.NumberFormat("fr-FR").format(n)} ${currency}`;
  }
};

const PROPERTY_LABEL: Record<string, string> = {
  APARTMENT: "Appartement",
  HOUSE: "Maison",
  STUDIO: "Studio",
  LAND: "Terrain",
  COMMERCIAL: "Local",
  OTHER: "Autre",
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  city,
  price,
  currency = "EUR",
  surface,
  rooms,
  listingType,
  propertyType,
  thumbnailUrl,
  images,
  href,
  className,
  footer,
  displayPrice,
  rating,
  eyebrow,
  favoritable = false,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const Wrapper: React.ElementType = href ? "a" : "div";

  const gallery = React.useMemo(() => {
    if (images && images.length > 0) return images;
    if (thumbnailUrl) return [{ url: thumbnailUrl, alt: title }];
    return [];
  }, [images, thumbnailUrl, title]);

  return (
    <Wrapper
      href={href}
      className={cn(
        "group block hover-lift",
        className,
      )}
    >
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden ring-1 ring-border/60 shadow-card">
        <ImageCarousel
          images={gallery}
          aspectClassName="aspect-[4/5]"
          showArrows
          showDots
          showCounter={false}
          fallback={<span className="display-serif">hwe</span>}
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md",
              listingType === "SALE"
                ? "bg-accent-700/95 text-white"
                : "bg-brand-700/95 text-white",
            )}
          >
            {listingType === "SALE" ? "À vendre" : "À louer"}
          </span>
          {eyebrow && (
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-white/95 text-brand-950 backdrop-blur-md">
              {eyebrow}
            </span>
          )}
        </div>

        {/* Heart button */}
        {favoritable && (
          <button
            type="button"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center text-ink dark:bg-black/50 dark:hover:bg-black/70 dark:text-white transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isFavorite ? "#e11d48" : "none"}
              stroke={isFavorite ? "#e11d48" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-all",
                isFavorite ? "scale-110" : "scale-100",
              )}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}

        {/* Bottom-right rating */}
        {typeof rating === "number" && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-white/95 dark:bg-black/65 backdrop-blur-md text-[11px] font-medium text-ink dark:text-white">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="#f59e0b"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-3 px-1">
        <div className="flex items-start justify-between gap-3 mb-0.5">
          <h3 className="font-medium text-[15px] text-ink leading-snug line-clamp-1">
            {title}
          </h3>
          <span className="text-[11px] text-ink-muted shrink-0 mt-0.5">
            {PROPERTY_LABEL[propertyType] ?? propertyType}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[13px] text-ink-muted mb-1.5">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
          >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="truncate">{city}</span>
          <span className="text-ink-subtle px-1">·</span>
          <span>
            {surface} m² · {rooms} {rooms > 1 ? "pièces" : "pièce"}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="display-serif text-lg text-ink">
            {displayPrice ?? formatPrice(price, currency)}
          </span>
          {listingType === "RENT" && (
            <span className="text-xs text-ink-muted">/ mois</span>
          )}
        </div>

        {footer && (
          <div className="mt-3 pt-3 border-t border-border/60">{footer}</div>
        )}
      </div>
    </Wrapper>
  );
};
