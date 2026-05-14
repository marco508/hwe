import * as React from "react";
import { cn } from "../utils";
import { Badge } from "./Badge";

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
  href?: string;
  className?: string;
  footer?: React.ReactNode;
  /** Formatted price string overriding the default formatting (used for currency conversion) */
  displayPrice?: string;
}

const formatPrice = (n: number, currency = "EUR") =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

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
  href,
  className,
  footer,
  displayPrice,
}) => {
  const Wrapper: React.ElementType = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className={cn(
        "group block rounded-lg border border-border bg-surface shadow-card overflow-hidden transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-brand-50">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand-300 font-display text-lg">
            hwe
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge tone={listingType === "SALE" ? "accent" : "brand"}>
            {listingType === "SALE" ? "Vente" : "Location"}
          </Badge>
          <Badge tone="neutral">{propertyType}</Badge>
        </div>
        <h3 className="font-display text-lg leading-tight mb-1">{title}</h3>
        <div className="text-sm text-ink-muted mb-3">{city}</div>
        <div className="flex items-baseline justify-between">
          <div className="font-semibold text-brand-700">
            {displayPrice ?? formatPrice(price, currency)}
            {listingType === "RENT" && (
              <span className="text-xs font-normal text-ink-muted"> /mois</span>
            )}
          </div>
          <div className="text-xs text-ink-muted">
            {surface} m² · {rooms} {rooms > 1 ? "pièces" : "pièce"}
          </div>
        </div>
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </Wrapper>
  );
};
