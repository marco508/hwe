"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface ImageCarouselProps {
  images: { url: string; alt?: string | null }[];
  /** Tailwind aspect class, defaults to "aspect-[4/3]". */
  aspectClassName?: string;
  className?: string;
  /** Show small dots under the image. */
  showDots?: boolean;
  /** Show prev/next arrows. */
  showArrows?: boolean;
  /** Show "1 / 6" counter. */
  showCounter?: boolean;
  /** Rounded class on the container. Defaults to none (parent handles it). */
  rounded?: string;
  /** Auto advance every X ms (0 disables). */
  autoPlayMs?: number;
  /** Fallback content when there are no images. */
  fallback?: React.ReactNode;
  /** Visuel de repli plein cadre (photo d'illustration) : prioritaire sur `fallback`. */
  placeholder?: React.ReactNode;
  /** Charge la première image immédiatement (au-dessus de la ligne de flottaison). */
  eager?: boolean;
}

/**
 * Lightweight image carousel — no external dep.
 * Supports keyboard arrows, swipe, dots, autoplay (paused on hover).
 */
export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  aspectClassName = "aspect-[4/3]",
  className,
  showDots = true,
  showArrows = true,
  showCounter = true,
  rounded = "",
  autoPlayMs = 0,
  fallback,
  placeholder,
  eager = false,
}) => {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  // URLs en échec de chargement → repli visuel au lieu de l'icône cassée.
  const [broken, setBroken] = React.useState<Record<string, true>>({});
  const total = images.length;

  React.useEffect(() => {
    if (index >= total) setIndex(0);
  }, [index, total]);

  const next = React.useCallback(
    () => setIndex((i) => (i + 1) % Math.max(total, 1)),
    [total],
  );
  const prev = React.useCallback(
    () => setIndex((i) => (i - 1 + total) % Math.max(total, 1)),
    [total],
  );

  React.useEffect(() => {
    if (!autoPlayMs || autoPlayMs <= 0 || paused || total <= 1) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, paused, next, total]);

  // Swipe handling
  const startX = React.useRef<number | null>(null);
  const onTouchStart: React.TouchEventHandler = (e) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (startX.current == null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - startX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    startX.current = null;
  };

  if (total === 0 && placeholder) {
    return <div className={cn("relative w-full overflow-hidden", aspectClassName, rounded, className)}>{placeholder}</div>;
  }

  if (total === 0) {
    return (
      <div
        className={cn(
          aspectClassName,
          "w-full bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/40 flex items-center justify-center text-brand-700 dark:text-brand-300 font-display text-2xl",
          rounded,
          className,
        )}
      >
        {fallback ?? "hwe"}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden group",
        aspectClassName,
        rounded,
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={tUi("ui.propertyGallery")}
    >
      {/* Slides track */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) =>
          (broken[img.url] || !img.url) && placeholder ? (
            <div key={i} className="relative w-full h-full shrink-0">
              {placeholder}
            </div>
          ) : broken[img.url] || !img.url ? (
            <div
              key={i}
              role="img"
              aria-label={img.alt || tUi("ui.imageUnavailable")}
              className="w-full h-full shrink-0 bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/40 flex flex-col items-center justify-center gap-1 text-brand-700 dark:text-brand-300"
            >
              <span className="font-display text-2xl">{fallback ?? "hwe"}</span>
              <span className="text-[11px] opacity-80">{tUi("ui.imageUnavailable")}</span>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={img.url}
              alt={img.alt ?? ""}
              loading={i === 0 && eager ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full shrink-0 object-cover"
              draggable={false}
              onError={() => setBroken((b) => ({ ...b, [img.url]: true }))}
            />
          ),
        )}
      </div>

      {/* Subtle gradient at the bottom for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />

      {/* Counter */}
      {showCounter && total > 1 && (
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-medium text-white/95 bg-black/40 backdrop-blur-md">
          {index + 1} / {total}
        </div>
      )}

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            aria-label={tUi("ui.prevImage")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            className="absolute z-20 left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 dark:bg-black/55 backdrop-blur shadow-md text-ink dark:text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity flex items-center justify-center hover:scale-105 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={tUi("ui.nextImage")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            className="absolute z-20 right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 dark:bg-black/55 backdrop-blur shadow-md text-ink dark:text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity flex items-center justify-center hover:scale-105 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div className="absolute z-20 bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={tUi("ui.goToImage", { n: i + 1 })}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/55 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
