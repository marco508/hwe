"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";
import { tUi, uiDir } from "./I18nKit";
import { Icon } from "./Icon";
import { PropertyPlaceholder } from "./Photos";

export interface PropertyGalleryProps {
  images: { url: string; alt?: string | null }[];
  /** Type du bien : photo d'illustration quand il n'y a aucune photo. */
  propertyType?: string | null;
  /** Ratio de la grande photo (classe Tailwind). */
  aspectClassName?: string;
  className?: string;
}

/** Glissement horizontal (tactile) → précédent / suivant. */
function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = React.useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0];
      start.current = t ? { x: t.clientX, y: t.clientY } : null;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const s = start.current;
      start.current = null;
      const t = e.changedTouches[0];
      if (!s || !t) return;
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      // De droite à gauche (arabe) : balayer vers la droite avance.
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) ((dx < 0) !== (uiDir() === "rtl") ? onNext : onPrev)();
    },
  };
}

/**
 * Galerie de fiche bien : grande photo, vignettes, visionneuse plein écran
 * (flèches, clavier ← → et Échap, balayage tactile). Sans dépendance.
 */
export function PropertyGallery({
  images,
  propertyType,
  aspectClassName = "aspect-[16/10]",
  className,
}: PropertyGalleryProps) {
  const list = React.useMemo(() => images.filter((i) => !!i.url), [images]);
  const total = list.length;
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [broken, setBroken] = React.useState<Record<string, true>>({});
  const thumbsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (index >= total) setIndex(0);
  }, [index, total]);

  const prev = React.useCallback(() => setIndex((i) => (i - 1 + total) % Math.max(total, 1)), [total]);
  const next = React.useCallback(() => setIndex((i) => (i + 1) % Math.max(total, 1)), [total]);
  const swipe = useSwipe(prev, next);

  // Vignette active toujours visible dans la bande défilante.
  React.useEffect(() => {
    const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-i="${index}"]`);
    if (el && thumbsRef.current) {
      const box = thumbsRef.current;
      const left = el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2;
      box.scrollTo({ left, behavior: "smooth" });
    }
  }, [index]);

  if (total === 0) {
    return (
      <div className={cn("relative w-full overflow-hidden rounded-2xl border border-border", aspectClassName, className)}>
        <PropertyPlaceholder propertyType={propertyType} sizes="(min-width: 1024px) 66vw, 100vw" />
      </div>
    );
  }

  const cur = (list[index] ?? list[0])!;
  const alt = (i: number) => list[i]?.alt || tUi("ui.gallery.photoOf", { n: i + 1, total });

  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn("relative w-full overflow-hidden rounded-2xl border border-border bg-cream-200 dark:bg-brand-950 group", aspectClassName)}
        {...swipe}
      >
        {broken[cur.url] ? (
          <PropertyPlaceholder propertyType={propertyType} />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute inset-0 h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
            aria-label={tUi("ui.gallery.openFull")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={cur.url}
              src={cur.url}
              alt={alt(index)}
              decoding="async"
              className="h-full w-full object-cover animate-fade-in"
              draggable={false}
              onError={() => setBroken((b) => ({ ...b, [cur.url]: true }))}
            />
          </button>
        )}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent" />
        {total > 1 && (
          <>
            <GalleryArrow side="left" onClick={prev} />
            <GalleryArrow side="right" onClick={next} />
          </>
        )}
        <div className="pointer-events-none absolute bottom-3 start-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {index + 1} / {total}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-black/60 px-3 py-1.5 text-xs font-medium text-ink dark:text-white backdrop-blur-sm hover:bg-white dark:hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <Icon name="maximize" size={14} />
          <span className="hidden min-[400px]:inline">{total > 1 ? tUi("ui.gallery.all", { n: total }) : tUi("ui.gallery.openFull")}</span>
        </button>
      </div>

      {total > 1 && (
        <div ref={thumbsRef} className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]" role="list">
          {list.map((m, i) => (
            <button
              key={`${m.url}-${i}`}
              type="button"
              data-i={i}
              role="listitem"
              aria-label={tUi("ui.gallery.thumb", { n: i + 1 })}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={cn(
                "relative shrink-0 h-16 w-24 sm:h-20 sm:w-28 overflow-hidden rounded-xl ring-2 transition focus:outline-none focus-visible:ring-brand-500",
                i === index ? "ring-brand-500 opacity-100" : "ring-transparent opacity-70 hover:opacity-100",
              )}
            >
              {broken[m.url] ? (
                <span className="absolute inset-0 bg-cream-200 dark:bg-brand-900" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.url}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={112}
                  height={80}
                  className="h-full w-full object-cover"
                  onError={() => setBroken((b) => ({ ...b, [m.url]: true }))}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {open && (
        <Lightbox
          list={list}
          index={index}
          setIndex={setIndex}
          onClose={() => setOpen(false)}
          alt={alt}
        />
      )}
    </div>
  );
}

function GalleryArrow({ side, onClick, dark }: { side: "left" | "right"; onClick: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      aria-label={side === "left" ? tUi("ui.prevImage") : tUi("ui.nextImage")}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
        side === "left" ? "start-3" : "end-3",
        dark
          ? "bg-white/15 text-white hover:bg-white/25 ring-1 ring-white/20"
          : "bg-white/90 text-ink dark:bg-black/60 dark:text-white backdrop-blur",
      )}
    >
      <Icon name={side === "left" ? "chevronLeft" : "chevronRight"} size={20} strokeWidth={2.2} />
    </button>
  );
}

function Lightbox({
  list,
  index,
  setIndex,
  onClose,
  alt,
}: {
  list: { url: string; alt?: string | null }[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  alt: (i: number) => string;
}) {
  const total = list.length;
  const prev = React.useCallback(() => setIndex((i) => (i - 1 + total) % total), [setIndex, total]);
  const next = React.useCallback(() => setIndex((i) => (i + 1) % total), [setIndex, total]);
  const swipe = useSwipe(prev, next);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") (uiDir() === "rtl" ? next : prev)();
      else if (e.key === "ArrowRight") (uiDir() === "rtl" ? prev : next)();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      before?.focus?.();
    };
  }, [onClose, prev, next]);

  const cur = (list[index] ?? list[0])!;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tUi("ui.gallery.photoOf", { n: index + 1, total })}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white animate-fade-in"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm" onClick={(e) => e.stopPropagation()}>
        <span className="tabular-nums text-white/80">
          {index + 1} / {total}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={tUi("ui.gallery.close")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <Icon name="x" size={20} />
        </button>
      </div>
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16" {...swipe}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={cur.url}
          src={cur.url}
          alt={alt(index)}
          className="max-h-full max-w-full object-contain select-none animate-fade-in"
          draggable={false}
          onClick={(e) => e.stopPropagation()}
        />
        {total > 1 && (
          <>
            <GalleryArrow side="left" onClick={prev} dark />
            <GalleryArrow side="right" onClick={next} dark />
          </>
        )}
      </div>
      {total > 1 && (
        <div className="flex justify-center gap-2 overflow-x-auto px-4 py-3" onClick={(e) => e.stopPropagation()}>
          {list.map((m, i) => (
            <button
              key={`${m.url}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={tUi("ui.gallery.thumb", { n: i + 1 })}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "shrink-0 h-12 w-16 overflow-hidden rounded-lg ring-2 transition",
                i === index ? "ring-white opacity-100" : "ring-transparent opacity-50 hover:opacity-90",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
