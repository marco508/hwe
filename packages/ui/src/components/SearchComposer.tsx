"use client";

import * as React from "react";
import { cn } from "../utils";

export type SearchComposerListing = "ALL" | "RENT" | "SALE";

export interface SearchComposerValue {
  location: string;
  listing: SearchComposerListing;
  startDate: string;
  guests: number;
}

export interface SearchComposerProps {
  value?: Partial<SearchComposerValue>;
  onSubmit?: (v: SearchComposerValue) => void;
  className?: string;
}

/**
 * Airbnb-inspired floating search composer: pill bar with 4 segments
 * (Lieu / Type / Date / Voyageurs) and a gradient submit button.
 */
export const SearchComposer: React.FC<SearchComposerProps> = ({
  value,
  onSubmit,
  className,
}) => {
  const [location, setLocation] = React.useState(value?.location ?? "");
  const [listing, setListing] = React.useState<SearchComposerListing>(
    value?.listing ?? "ALL",
  );
  const [startDate, setStartDate] = React.useState(value?.startDate ?? "");
  const [guests, setGuests] = React.useState(value?.guests ?? 2);
  const [active, setActive] = React.useState<string | null>(null);

  const segCls = (key: string) =>
    cn(
      "relative flex flex-col items-start gap-0.5 px-5 py-3 text-left transition-colors",
      "rounded-full hover:bg-cream-100/80 dark:hover:bg-white/5",
      active === key && "bg-white shadow-card ring-1 ring-border dark:bg-surface",
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ location, listing, startDate, guests });
      }}
      className={cn(
        "glass-strong rounded-full p-1.5 sm:p-2 flex items-stretch shadow-elevated",
        "border border-border/70",
        className,
      )}
      role="search"
      aria-label="Recherche de biens"
    >
      <button
        type="button"
        className={segCls("location")}
        onClick={() => setActive("location")}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Destination
        </span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setActive("location")}
          placeholder="Paris, Bordeaux, Lyon…"
          className="bg-transparent outline-none text-sm font-medium text-ink placeholder:text-ink-subtle min-w-[140px]"
        />
      </button>

      <Divider />

      <button
        type="button"
        className={segCls("listing")}
        onClick={() => setActive("listing")}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Type
        </span>
        <select
          value={listing}
          onChange={(e) =>
            setListing(e.target.value as SearchComposerListing)
          }
          onFocus={() => setActive("listing")}
          className="bg-transparent outline-none text-sm font-medium text-ink cursor-pointer pr-1"
        >
          <option value="ALL">Tous les biens</option>
          <option value="RENT">À louer</option>
          <option value="SALE">À vendre</option>
        </select>
      </button>

      <Divider />

      <button
        type="button"
        className={segCls("date")}
        onClick={() => setActive("date")}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Quand
        </span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onFocus={() => setActive("date")}
          className="bg-transparent outline-none text-sm font-medium text-ink min-w-[110px]"
        />
      </button>

      <Divider />

      <button
        type="button"
        className={segCls("guests")}
        onClick={() => setActive("guests")}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Voyageurs
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
          <button
            type="button"
            aria-label="Moins de voyageurs"
            onClick={(e) => {
              e.stopPropagation();
              setGuests((g) => Math.max(1, g - 1));
            }}
            className="h-6 w-6 inline-flex items-center justify-center rounded-full border border-border hover:bg-cream-200 dark:hover:bg-white/5"
          >
            −
          </button>
          {guests}
          <button
            type="button"
            aria-label="Plus de voyageurs"
            onClick={(e) => {
              e.stopPropagation();
              setGuests((g) => Math.min(20, g + 1));
            }}
            className="h-6 w-6 inline-flex items-center justify-center rounded-full border border-border hover:bg-cream-200 dark:hover:bg-white/5"
          >
            +
          </button>
        </span>
      </button>

      <button
        type="submit"
        aria-label="Rechercher"
        className="ml-2 my-1 inline-flex items-center justify-center gap-2 h-12 px-5 sm:px-6 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 text-white text-sm font-medium shadow-md hover:shadow-glow transition-shadow"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="hidden sm:inline">Rechercher</span>
      </button>
    </form>
  );
};

function Divider() {
  return <span className="self-center w-px h-8 bg-border/80 mx-0.5" />;
}
