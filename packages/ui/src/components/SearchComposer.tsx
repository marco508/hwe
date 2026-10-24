"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

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
  /** Afficher les segments Date et Voyageurs (masqués par défaut : non filtrants). */
  showStayFields?: boolean;
}

/**
 * Barre de recherche flottante : segments Lieu / Type (+ Date / Voyageurs en
 * option) et bouton d'envoi. Chaque segment est un <label> (jamais de champ
 * dans un <button> : HTML invalide et erreur d'hydratation React #418).
 * Empilée verticalement sur mobile, en pilule à partir de `sm`.
 */
export const SearchComposer: React.FC<SearchComposerProps> = ({
  value,
  onSubmit,
  className,
  showStayFields = false,
}) => {
  const [location, setLocation] = React.useState(value?.location ?? "");
  const [listing, setListing] = React.useState<SearchComposerListing>(
    value?.listing ?? "ALL",
  );
  const [startDate, setStartDate] = React.useState(value?.startDate ?? "");
  const [guests, setGuests] = React.useState(value?.guests ?? 2);
  const [active, setActive] = React.useState<string | null>(null);
  const uid = React.useId();

  // Suit la valeur imposée par le parent (ex. changement de pays).
  React.useEffect(() => {
    if (value?.location !== undefined) setLocation(value.location);
  }, [value?.location]);

  const segCls = (key: string) =>
    cn(
      "relative flex flex-col items-start gap-0.5 px-5 py-2.5 sm:py-3 text-start transition-colors min-w-0 cursor-text",
      "rounded-2xl sm:rounded-full hover:bg-cream-100/80 dark:hover:bg-white/5",
      "focus-within:bg-surface focus-within:shadow-card focus-within:ring-1 focus-within:ring-border",
      active === key && "bg-surface shadow-card ring-1 ring-border",
    );
  const kicker = "text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ location, listing, startDate, guests });
      }}
      className={cn(
        "glass-strong rounded-3xl sm:rounded-full p-1.5 sm:p-2 flex flex-col sm:flex-row items-stretch shadow-elevated",
        "border border-border/70",
        className,
      )}
      role="search"
      aria-label={tUi("ui.propertySearch")}
      onBlur={() => setActive(null)}
    >
      <label htmlFor={`${uid}-loc`} className={cn(segCls("location"), "sm:flex-1")}>
        <span className={kicker}>{tUi("ui.destination")}</span>
        <input
          id={`${uid}-loc`}
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setActive("location")}
          placeholder={tUi("ui.cityExamples")}
          className="w-full min-w-0 bg-transparent outline-none text-sm font-medium text-ink placeholder:text-ink-subtle"
        />
      </label>

      <Divider />

      <label htmlFor={`${uid}-type`} className={segCls("listing")}>
        <span className={kicker}>{tUi("ui.type")}</span>
        <select
          id={`${uid}-type`}
          value={listing}
          onChange={(e) => setListing(e.target.value as SearchComposerListing)}
          onFocus={() => setActive("listing")}
          className="w-full bg-transparent outline-none text-sm font-medium text-ink cursor-pointer pe-1"
        >
          <option value="ALL">{tUi("ui.allProperties")}</option>
          <option value="RENT">{tUi("ui.forRent")}</option>
          <option value="SALE">{tUi("ui.forSale")}</option>
        </select>
      </label>

      {showStayFields && (
        <>
          <Divider />
          <label htmlFor={`${uid}-date`} className={segCls("date")}>
            <span className={kicker}>{tUi("ui.when")}</span>
            <input
              id={`${uid}-date`}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onFocus={() => setActive("date")}
              className="bg-transparent outline-none text-sm font-medium text-ink min-w-[110px]"
            />
          </label>

          <Divider />

          <div className={segCls("guests")} role="group" aria-label={tUi("ui.guests")}>
            <span className={kicker}>{tUi("ui.guests")}</span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              <button
                type="button"
                aria-label={tUi("ui.fewerGuests")}
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="h-6 w-6 inline-flex items-center justify-center rounded-full border border-border hover:bg-cream-200 dark:hover:bg-white/5"
              >
                −
              </button>
              <span aria-live="polite">{guests}</span>
              <button
                type="button"
                aria-label={tUi("ui.moreGuests")}
                onClick={() => setGuests((g) => Math.min(20, g + 1))}
                className="h-6 w-6 inline-flex items-center justify-center rounded-full border border-border hover:bg-cream-200 dark:hover:bg-white/5"
              >
                +
              </button>
            </span>
          </div>
        </>
      )}

      <button
        type="submit"
        aria-label={tUi("ui.search")}
        className="mt-1.5 sm:mt-1 sm:ms-2 sm:mb-1 inline-flex items-center justify-center gap-2 h-12 px-5 sm:px-6 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 text-white text-sm font-medium shadow-md hover:shadow-glow transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500"
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
        <span>{tUi("ui.search")}</span>
      </button>
    </form>
  );
};

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="h-px mx-4 my-0.5 bg-border/80 sm:h-8 sm:w-px sm:mx-0.5 sm:my-0 self-stretch sm:self-center"
    />
  );
}
