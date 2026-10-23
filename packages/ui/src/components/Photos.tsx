"use client";

import * as React from "react";
import { cn } from "../utils";
import { getUiLang, tUi } from "./I18nKit";

/**
 * Banque de photos locale (servie par chaque app depuis public/images, aucune
 * dépendance externe à l'exécution). Crédits : apps/landing/public/images/CREDITS.md.
 *
 * Chaque entrée = un fichier WebP par largeur : /images/<id>-<w>.webp.
 */
type PhotoDef = { widths: number[]; w: number; h: number; fr: string; en: string };

const P = (widths: number[], w: number, h: number, fr: string, en: string): PhotoDef => ({ widths, w, h, fr, en });
const CARD = [480, 800];

export const PHOTOS = {
  "hero/hero-main": P([640, 1280, 1920], 1920, 1280, "Famille souriante, parents et trois enfants, assise sur un canapé dans un salon lumineux", "Smiling family, two parents and three children, sitting on a sofa in a bright living room"),
  "hero/hero-keys": P(CARD, 800, 1000, "Jeune femme souriante montrant la clé de son nouveau logement, blottie contre son conjoint", "Smiling young woman showing the key to her new home, leaning against her partner"),
  "hero/hero-interior": P(CARD, 800, 1000, "Salon lumineux avec canapé bleu, coussins jaunes et fauteuil en bois", "Bright living room with a blue sofa, yellow cushions and a wooden armchair"),

  "cities/paris": P(CARD, 800, 1000, "Rue parisienne bordée d'immeubles haussmanniens avec la tour Eiffel en perspective", "Parisian street lined with Haussmann buildings, with the Eiffel Tower in the distance"),
  "cities/lyon": P(CARD, 800, 1000, "Quais de Saône à Lyon, dominés par la basilique de Fourvière", "The Saône riverbanks in Lyon, overlooked by the Fourvière basilica"),
  "cities/marseille": P(CARD, 800, 1000, "Voiliers sur le Vieux-Port de Marseille, avec Notre-Dame de la Garde sur la colline", "Sailboats in Marseille's Old Port, with Notre-Dame de la Garde on the hill"),
  "cities/bordeaux": P(CARD, 800, 1000, "Place de la Bourse à Bordeaux et la fontaine des Trois Grâces sous un ciel bleu", "Place de la Bourse in Bordeaux with the Three Graces fountain under a blue sky"),
  "cities/dakar": P(CARD, 800, 1000, "Mosquée de la Divinité à Ouakam, au bord de l'océan sur la corniche de Dakar", "The Mosque of the Divinity in Ouakam, by the ocean on Dakar's corniche"),
  "cities/abidjan": P(CARD, 800, 1000, "Tours du Plateau à Abidjan vues depuis la lagune Ébrié", "High-rise towers of Abidjan's Plateau seen across the Ébrié lagoon"),
  "cities/douala": P(CARD, 800, 1000, "Rue animée de Douala avec motos, taxis et passants", "Busy street in Douala with motorbikes, taxis and pedestrians"),
  "cities/yaounde": P(CARD, 800, 1000, "Carrefour Nlongkak à Yaoundé avec taxis jaunes et collines verdoyantes", "Nlongkak junction in Yaoundé with yellow taxis and green hills"),
  "cities/cotonou": P(CARD, 800, 1000, "Rue de quartier à Cotonou, une femme portant un panier sur la tête, mosquée en arrière-plan", "Neighbourhood street in Cotonou, a woman carrying a basket on her head, a mosque in the background"),
  "cities/lome": P(CARD, 800, 1000, "Route du bord de mer à Lomé bordée de grands cocotiers", "Seaside road in Lomé lined with tall coconut palms"),
  "cities/casablanca": P(CARD, 800, 1000, "Minaret de la mosquée Hassan II à Casablanca", "The minaret of the Hassan II Mosque in Casablanca"),
  "cities/default": P(CARD, 800, 1000, "Rue résidentielle calme bordée d'arbres", "Quiet tree-lined residential street"),

  "types/apartment": P(CARD, 800, 1000, "Photo d'illustration : façade d'immeuble d'habitation avec balcons et volets", "Illustrative photo: apartment building facade with balconies and shutters"),
  "types/house": P(CARD, 800, 1000, "Photo d'illustration : maison individuelle contemporaine blanche avec allée pavée et jardin", "Illustrative photo: white contemporary detached house with a paved driveway and garden"),
  "types/studio": P(CARD, 800, 1000, "Photo d'illustration : studio meublé lumineux avec lit, coin repas et cuisine", "Illustrative photo: bright furnished studio with a bed, dining corner and kitchen"),
  "types/land": P(CARD, 800, 1000, "Photo d'illustration : terrain de terre rouge en début de chantier, quelques ouvriers au fond", "Illustrative photo: red-soil plot at the start of construction, a few workers in the background"),
  "types/commercial": P(CARD, 800, 1000, "Photo d'illustration : local commercial vide et lumineux avec piliers blancs et sol carrelé", "Illustrative photo: empty, bright commercial space with white pillars and tiled floor"),
  "types/other": P(CARD, 800, 1000, "Photo d'illustration : salon neutre avec canapé gris, table basse en verre et grande fenêtre", "Illustrative photo: neutral living room with a grey sofa, glass coffee table and large window"),

  "steps/search": P([640], 640, 480, "Femme assise sur un canapé consultant des annonces sur son téléphone", "Woman sitting on a sofa browsing listings on her phone"),
  "steps/visit": P([640], 640, 480, "Visite d'une maison : le propriétaire accueille un couple et son bébé", "A house viewing: the owner welcomes a couple and their baby"),
  "steps/sign": P([640], 640, 480, "Poignée de main au-dessus d'un contrat signé sur une table", "Handshake over a signed contract on a table"),
  "steps/move": P([640], 640, 480, "Couple souriant emménageant avec des cartons et une plante", "Smiling couple moving in with cardboard boxes and a plant"),

  "auth/auth-tenant": P([640, 1080], 1080, 1350, "Parents et leur fils détendus sur le canapé de leur salon", "Parents and their son relaxing on the sofa in their living room"),
  "auth/auth-owner": P([640, 1080], 1080, 1350, "Homme souriant, bras ouverts, devant une maison blanche", "Smiling man with open arms in front of a white house"),

  "people/benefit-1": P([640], 640, 480, "Jeune couple portant des cartons dans son nouveau logement", "Young couple carrying boxes in their new home"),
  "people/benefit-2": P([640], 640, 480, "Homme souriant travaillant sur son ordinateur portable chez lui", "Smiling man working on his laptop at home"),
  "people/benefit-3": P([640], 640, 480, "Mère jouant avec ses trois enfants dans un salon lumineux", "Mother playing with her three children in a bright living room"),
} satisfies Record<string, PhotoDef>;

export type PhotoId = keyof typeof PHOTOS;

const BASE = "/images/";
const url = (id: string, w: number) => `${BASE}${id}-${w}.webp`;

/** Texte alternatif de la photo dans la langue courante. */
export function photoAlt(id: PhotoId): string {
  const d = PHOTOS[id];
  return getUiLang() === "en" ? d.en : d.fr;
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
        <span className="absolute bottom-2 left-2 z-[2] rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/95 backdrop-blur-sm">
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
        <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 rounded-full bg-white/90 dark:bg-black/60 px-2.5 py-0.5 text-[11px] font-medium text-ink dark:text-white backdrop-blur-md">
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
    "group relative block aspect-[4/5] w-full min-w-0 rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-border/60 bg-brand-900 text-left hover-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
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
