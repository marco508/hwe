"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

/**
 * Banque de photos locale (servie par chaque app depuis public/images, aucune
 * dépendance externe à l'exécution). Crédits : apps/landing/public/images/CREDITS.md.
 *
 * Chaque entrée = un fichier WebP par largeur : /images/<id>-<w>.webp.
 */
/** Texte alternatif : clé `ui.photo.<id>` des dictionnaires de packages/ui. */
type PhotoDef = { widths: number[]; w: number; h: number };

const P = (widths: number[], w: number, h: number): PhotoDef => ({ widths, w, h });
const CARD = [480, 800];

export const PHOTOS = {
  "hero/hero-main": P([640, 1280, 1920], 1920, 1280),
  "hero/hero-keys": P(CARD, 800, 1000),
  "hero/hero-interior": P(CARD, 800, 1000),

  "cities/paris": P(CARD, 800, 1000),
  "cities/lyon": P(CARD, 800, 1000),
  "cities/marseille": P(CARD, 800, 1000),
  "cities/bordeaux": P(CARD, 800, 1000),
  "cities/dakar": P(CARD, 800, 1000),
  "cities/abidjan": P(CARD, 800, 1000),
  "cities/douala": P(CARD, 800, 1000),
  "cities/yaounde": P(CARD, 800, 1000),
  "cities/cotonou": P(CARD, 800, 1000),
  "cities/lome": P(CARD, 800, 1000),
  "cities/casablanca": P(CARD, 800, 1000),
  "cities/default": P(CARD, 800, 1000),

  "types/apartment": P(CARD, 800, 1000),
  "types/house": P(CARD, 800, 1000),
  "types/studio": P(CARD, 800, 1000),
  "types/land": P(CARD, 800, 1000),
  "types/commercial": P(CARD, 800, 1000),
  "types/other": P(CARD, 800, 1000),

  "steps/search": P([640], 640, 480),
  "steps/visit": P([640], 640, 480),
  "steps/sign": P([640], 640, 480),
  "steps/move": P([640], 640, 480),

  "auth/auth-tenant": P([640, 1080], 1080, 1350),
  "auth/auth-owner": P([640, 1080], 1080, 1350),

  "people/benefit-1": P([640], 640, 480),
  "people/benefit-2": P([640], 640, 480),
  "people/benefit-3": P([640], 640, 480),
} satisfies Record<string, PhotoDef>;

export type PhotoId = keyof typeof PHOTOS;

const BASE = "/images/";
const url = (id: string, w: number) => `${BASE}${id}-${w}.webp`;

/** Texte alternatif de la photo dans la langue courante. */
export function photoAlt(id: PhotoId): string {
  return tUi(`ui.photo.${id}`);
}

/** Attributs <img> (src, srcSet, dimensions intrinsèques) d'une photo de la banque. */
export function photoAttrs(id: PhotoId) {
  const d: PhotoDef = PHOTOS[id];
  const mid = d.widths[Math.min(1, d.widths.length - 1)] ?? d.w;
  return {
    src: url(id, mid),
    srcSet: d.widths.map((w) => `${url(id, w)} ${w}w`).join(", "),
    width: d.w,
    height: d.h,
  };
}

export interface PhotoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt"> {
  id: PhotoId;
  /** Attribut sizes (défaut : 100vw). */
  sizes?: string;
  /** Image au-dessus de la ligne de flottaison : chargement immédiat et prioritaire. */
  priority?: boolean;
  /** Alt explicite (sinon celui de la banque, FR/EN) ; "" = décorative. */
  alt?: string;
}

/** <img> responsive d'une photo de la banque locale (lazy par défaut, ratio réservé). */
export function Photo({ id, sizes = "100vw", priority = false, alt, className, ...rest }: PhotoProps) {
  const a = photoAttrs(id);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...a}
      sizes={sizes}
      alt={alt ?? photoAlt(id)}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      // fetchpriority n'est pas encore typé dans React 18 : attribut brut.
      {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
      className={className}
      {...rest}
    />
  );
}

// ─── Villes ──────────────────────────────────────────────────────────────────

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, " ")
    .trim();

const CITY_SLUGS: Record<string, PhotoId> = {
  paris: "cities/paris",
  lyon: "cities/lyon",
  marseille: "cities/marseille",
  bordeaux: "cities/bordeaux",
  dakar: "cities/dakar",
  abidjan: "cities/abidjan",
  douala: "cities/douala",
  yaounde: "cities/yaounde",
  cotonou: "cities/cotonou",
  lome: "cities/lome",
  casablanca: "cities/casablanca",
};

/** Photo d'une ville connue (« Lyon 3e », « Yaoundé » → la photo de la ville), sinon null. */
export function cityPhotoId(city: string | null | undefined): PhotoId | null {
  if (!city) return null;
  const n = norm(city);
  if (CITY_SLUGS[n]) return CITY_SLUGS[n];
  const first = n.split(" ")[0] ?? "";
  return CITY_SLUGS[first] ?? null;
}

/** Villes mises en avant (landing, recherche) — code pays ISO. */
export const FEATURED_CITIES: { name: string; country: string }[] = [
  { name: "Paris", country: "FR" },
  { name: "Dakar", country: "SN" },
  { name: "Abidjan", country: "CI" },
  { name: "Lyon", country: "FR" },
  { name: "Casablanca", country: "MA" },
  { name: "Douala", country: "CM" },
  { name: "Marseille", country: "FR" },
  { name: "Cotonou", country: "BJ" },
  { name: "Yaoundé", country: "CM" },
  { name: "Bordeaux", country: "FR" },
  { name: "Lomé", country: "TG" },
];

// ─── Types de bien ───────────────────────────────────────────────────────────

const TYPE_PHOTO: Record<string, PhotoId> = {
  APARTMENT: "types/apartment",
  HOUSE: "types/house",
  VILLA: "types/house",
  STUDIO: "types/studio",
  LAND: "types/land",
  COMMERCIAL: "types/commercial",
  OTHER: "types/other",
};

export function propertyTypePhotoId(type: string | null | undefined): PhotoId {
  return TYPE_PHOTO[(type ?? "").toUpperCase()] ?? "types/other";
}

/**
 * Visuel de repli d'un bien sans photo : photo d'illustration du type de bien,
 * clairement signalée comme telle (jamais présentée comme le bien réel).
 */
export function PropertyPlaceholder({
  propertyType,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  showLabel = true,
}: {
  propertyType?: string | null;
  className?: string;
  sizes?: string;
  showLabel?: boolean;
}) {
  const id = propertyTypePhotoId(propertyType);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-cream-200 dark:bg-brand-950", className)}>
      <Photo id={id} sizes={sizes} className="absolute inset-0 h-full w-full object-cover" />
      {showLabel && (
        <span className="absolute bottom-2 start-2 z-[2] rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/95 backdrop-blur-sm">
          {tUi("ui.illustrativePhoto")}
        </span>
      )}
    </div>
  );
}

/**
 * Carte de ville (destination) : photo de la ville (ou photo par défaut),
 * dégradé de lisibilité, nom de ville à taille adaptée (jamais coupé).
 */
export function CityCard({
  name,
  image,
  badge,
  cta,
  onClick,
  href,
  sizes = "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
  className,
}: {
  name: string;
  /** Photo propre au catalogue (média d'un bien) ; sinon banque locale. */
  image?: string | null;
  badge?: React.ReactNode;
  cta?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  sizes?: string;
  className?: string;
}) {
  const id = cityPhotoId(name);
  const [failed, setFailed] = React.useState(false);
  const useOwn = !id && !!image && !failed;
  const len = name.length;
  // Taille du nom selon sa longueur : « Lyon » reste grand, « Ouagadougou » tient.
  const nameSize =
    len <= 6
      ? "text-[1.6rem] sm:text-3xl"
      : len <= 10
        ? "text-[1.3rem] sm:text-[1.7rem]"
        : "text-lg sm:text-2xl";
  const inner = (
    <>
      {useOwn ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image!}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <Photo
          id={id ?? "cities/default"}
          alt=""
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/0" />
      {badge && (
        <span className="absolute top-2.5 end-2.5 sm:top-3 sm:end-3 rounded-full bg-white/90 dark:bg-black/60 px-2.5 py-0.5 text-[11px] font-medium text-ink dark:text-white backdrop-blur-md">
          {badge}
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 p-3 sm:p-5 min-w-0 block">
        <span
          className={cn(
            "display-serif block text-white leading-[1.1] [overflow-wrap:anywhere] hyphens-auto drop-shadow-sm",
            nameSize,
          )}
        >
          {name}
        </span>
        {cta && (
          <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-white/90">{cta}</span>
        )}
      </span>
    </>
  );
  const cls = cn(
    "group relative block aspect-[4/5] w-full min-w-0 rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-border/60 bg-brand-900 text-start hover-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
    className,
  );
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
