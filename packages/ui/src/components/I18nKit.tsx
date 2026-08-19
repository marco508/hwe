"use client";

import * as React from "react";

/**
 * i18n maison — même mécanique qu'AfroChina : dictionnaires plats + t() avec
 * interpolation {param}, locale appliquée PENDANT le rendu du provider pour
 * que tous les enfants lisent la bonne langue. fr = textes d'origine,
 * en = traduction ; repli fr puis clé brute.
 *
 * Chaque app appelle createI18n(ses dictionnaires) et exporte t/LangProvider/useLang.
 */

export type Lang = "fr" | "en";

const LANG_KEY = "hwe.lang";

// ── Traduction des composants partages (packages/ui) ──
// Les composants du design system ne peuvent pas importer le i18n d'une app :
// ils lisent cette locale module, posee par le LangProvider pendant le rendu.
let uiLang: Lang = "fr";

export function setUiLang(l: Lang) {
  uiLang = l;
}

// ── Noms de pays ──
// Les noms francais sont ceux, soignes, des listes de l'app ; l'anglais vient
// d'Intl.DisplayNames (aucune table a maintenir pour ~190 pays). Quelques
// libelles ou la forme courante vaut mieux que celle de la CLDR.
const COUNTRY_EN_OVERRIDES: Record<string, string> = {
  CD: "DR Congo",
  CG: "Congo",
  CI: "Ivory Coast",
};

let countryFormatter: Intl.DisplayNames | null | undefined;

/** Nom du pays dans la langue courante : `code` ISO 3166-1 alpha-2, `frName` en repli. */
export function countryLabel(code: string, frName: string): string {
  if (uiLang === "fr") return frName;
  const upper = (code || "").toUpperCase();
  if (COUNTRY_EN_OVERRIDES[upper]) return COUNTRY_EN_OVERRIDES[upper];
  if (countryFormatter === undefined) {
    try {
      countryFormatter = new Intl.DisplayNames(["en"], { type: "region" });
    } catch {
      countryFormatter = null; // environnement sans ICU complet
    }
  }
  try {
    return countryFormatter?.of(upper) ?? frName;
  } catch {
    return frName;
  }
}

// Dictionnaire des textes des composants partages — rempli au fil des besoins.
export const UI_DICT: Record<Lang, Record<string, string>> = {
  fr: {
    // Temps relatif (ConversationListItem, NotificationsBell)
    "ui.time.now": "à l'instant",
    "ui.time.min": "{n} min",
    "ui.time.hours": "{n} h",
    "ui.time.days": "{n} j",
    // CategoryRail
    "ui.scrollLeft": "Faire défiler à gauche",
    "ui.scrollRight": "Faire défiler à droite",
    // CountryPicker
    "ui.detectedViaIp": "Détecté via votre adresse IP",
    "ui.changeLocation": "Modifier la localisation",
    "ui.chooseLocation": "Choisir une localisation",
    "ui.countryTab": "Pays",
    "ui.cityTab": "Ville",
    "ui.detectingLocation": "Détection de votre position en cours…",
    "ui.searchCountry": "Rechercher un pays…",
    "ui.noCountryMatch": 'Aucun pays ne correspond à "{query}"',
    "ui.wholeCountry": "Tout le pays · {name}",
    "ui.savedOnDevice": "Choix mémorisé sur cet appareil",
    "ui.region.africa-west": "Afrique de l'Ouest",
    "ui.region.africa-central": "Afrique centrale",
    "ui.region.africa-north": "Maghreb & Afrique du Nord",
    "ui.region.africa-east": "Afrique de l'Est",
    "ui.region.africa-south": "Afrique australe",
    "ui.region.africa-islands": "Océan Indien",
    "ui.region.europe": "Europe",
    "ui.countProperty": "{n} bien",
    "ui.countProperties": "{n} biens",
    // DestinationCard
    "ui.discover": "Découvrir",
    // ImageCarousel
    "ui.propertyGallery": "Galerie du bien",
    "ui.prevImage": "Image précédente",
    "ui.nextImage": "Image suivante",
    "ui.goToImage": "Aller à l'image {n}",
    // MessageBubble
    "ui.read": "Lu",
    "ui.sent": "Envoyé",
    // MessageComposer
    "ui.writeMessage": "Écrivez votre message…",
    "ui.send": "Envoyer",
    // Navbar
    "ui.menu": "Menu",
    // NotificationsBell
    "ui.messages": "Messages",
    "ui.unreadCount": "{n} non lus",
    "ui.noMessagesYet": "Aucun message pour l'instant.",
    "ui.conversationsAppearHere": "Vos conversations apparaîtront ici.",
    "ui.seeAllConversations": "Voir toutes les conversations",
    // PropertyCard
    "ui.propertyType.apartment": "Appartement",
    "ui.propertyType.house": "Maison",
    "ui.propertyType.studio": "Studio",
    "ui.propertyType.land": "Terrain",
    "ui.propertyType.commercial": "Local",
    "ui.propertyType.other": "Autre",
    "ui.forSale": "À vendre",
    "ui.forRent": "À louer",
    "ui.addFavorite": "Ajouter aux favoris",
    "ui.removeFavorite": "Retirer des favoris",
    "ui.room": "{n} pièce",
    "ui.rooms": "{n} pièces",
    "ui.perMonth": "/ mois",
    // RangeSlider
    "ui.minimum": "Minimum",
    "ui.maximum": "Maximum",
    // SearchComposer
    "ui.propertySearch": "Recherche de biens",
    "ui.destination": "Destination",
    "ui.cityExamples": "Paris, Bordeaux, Lyon…",
    "ui.type": "Type",
    "ui.allProperties": "Tous les biens",
    "ui.when": "Quand",
    "ui.guests": "Voyageurs",
    "ui.fewerGuests": "Moins de voyageurs",
    "ui.moreGuests": "Plus de voyageurs",
    "ui.search": "Rechercher",
    // Stepper
    "ui.step": "Étape {n}",
    // TestimonialCarousel
    "ui.viewTestimonial": "Voir le témoignage {n}",
    "ui.prevTestimonial": "Témoignage précédent",
    "ui.nextTestimonial": "Témoignage suivant",
    // ThemeToggle
    "ui.switchToLight": "Passer en mode clair",
    "ui.switchToDark": "Passer en mode sombre",
    "ui.lightMode": "Mode clair",
    "ui.darkMode": "Mode sombre",
    "ui.light": "Clair",
    "ui.dark": "Sombre",
    // UnreadBadge
    "ui.unreadOne": "{n} non lu",
    // LangSwitch
    "ui.language": "Langue",
  },
  en: {
    "ui.time.now": "just now",
    "ui.time.min": "{n} min",
    "ui.time.hours": "{n} hr",
    "ui.time.days": "{n} d",
    "ui.scrollLeft": "Scroll left",
    "ui.scrollRight": "Scroll right",
    "ui.detectedViaIp": "Detected from your IP address",
    "ui.changeLocation": "Change location",
    "ui.chooseLocation": "Choose a location",
    "ui.countryTab": "Country",
    "ui.cityTab": "City",
    "ui.detectingLocation": "Detecting your location…",
    "ui.searchCountry": "Search for a country…",
    "ui.noCountryMatch": 'No country matches "{query}"',
    "ui.wholeCountry": "Whole country · {name}",
    "ui.savedOnDevice": "Choice saved on this device",
    "ui.region.africa-west": "West Africa",
    "ui.region.africa-central": "Central Africa",
    "ui.region.africa-north": "Maghreb & North Africa",
    "ui.region.africa-east": "East Africa",
    "ui.region.africa-south": "Southern Africa",
    "ui.region.africa-islands": "Indian Ocean",
    "ui.region.europe": "Europe",
    "ui.countProperty": "{n} listing",
    "ui.countProperties": "{n} listings",
    "ui.discover": "Discover",
    "ui.propertyGallery": "Property gallery",
    "ui.prevImage": "Previous image",
    "ui.nextImage": "Next image",
    "ui.goToImage": "Go to image {n}",
    "ui.read": "Read",
    "ui.sent": "Sent",
    "ui.writeMessage": "Write your message…",
    "ui.send": "Send",
    "ui.menu": "Menu",
    "ui.messages": "Messages",
    "ui.unreadCount": "{n} unread",
    "ui.noMessagesYet": "No messages yet.",
    "ui.conversationsAppearHere": "Your conversations will appear here.",
    "ui.seeAllConversations": "See all conversations",
    "ui.propertyType.apartment": "Apartment",
    "ui.propertyType.house": "House",
    "ui.propertyType.studio": "Studio",
    "ui.propertyType.land": "Land",
    "ui.propertyType.commercial": "Commercial unit",
    "ui.propertyType.other": "Other",
    "ui.forSale": "For sale",
    "ui.forRent": "For rent",
    "ui.addFavorite": "Add to favorites",
    "ui.removeFavorite": "Remove from favorites",
    "ui.room": "{n} room",
    "ui.rooms": "{n} rooms",
    "ui.perMonth": "/ month",
    "ui.minimum": "Minimum",
    "ui.maximum": "Maximum",
    "ui.propertySearch": "Property search",
    "ui.destination": "Destination",
    "ui.cityExamples": "Paris, Bordeaux, Lyon…",
    "ui.type": "Type",
    "ui.allProperties": "All properties",
    "ui.when": "When",
    "ui.guests": "Guests",
    "ui.fewerGuests": "Fewer guests",
    "ui.moreGuests": "More guests",
    "ui.search": "Search",
    "ui.step": "Step {n}",
    "ui.viewTestimonial": "View testimonial {n}",
    "ui.prevTestimonial": "Previous testimonial",
    "ui.nextTestimonial": "Next testimonial",
    "ui.switchToLight": "Switch to light mode",
    "ui.switchToDark": "Switch to dark mode",
    "ui.lightMode": "Light mode",
    "ui.darkMode": "Dark mode",
    "ui.light": "Light",
    "ui.dark": "Dark",
    "ui.unreadOne": "{n} unread",
    "ui.language": "Language",
  },
};

export function tUi(key: string, params?: Record<string, string | number>): string {
  let text = UI_DICT[uiLang][key] ?? UI_DICT.fr[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.split(`{${k}}`).join(String(v ?? ""));
    }
  }
  return text;
}

export function createI18n(dicts: Record<Lang, Record<string, string>>) {
  let locale: Lang = "fr";

  function t(key: string, params?: Record<string, string | number>): string {
    let text = dicts[locale][key] ?? dicts.fr[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.split(`{${k}}`).join(String(v ?? ""));
      }
    }
    return text;
  }

  const Ctx = React.createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
    lang: "fr",
    setLang: () => {},
  });

  function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = React.useState<Lang>("fr");

    // Choix persisté, appliqué après le montage (rendu serveur = fr).
    React.useEffect(() => {
      try {
        const saved = window.localStorage.getItem(LANG_KEY);
        if (saved === "en" || saved === "fr") setLangState(saved);
      } catch {
        /* stockage indisponible */
      }
    }, []);

    // Pendant le rendu, avant les enfants : ils lisent t() dans la bonne langue.
    locale = lang;
    setUiLang(lang);

    const setLang = React.useCallback((l: Lang) => {
      setLangState(l);
      try {
        window.localStorage.setItem(LANG_KEY, l);
      } catch {
        /* best effort */
      }
    }, []);

    return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
  }

  function useLang() {
    return React.useContext(Ctx);
  }

  /** Bascule FR | EN compacte, à poser dans une navbar. */
  function LangSwitch({ className = "" }: { className?: string }) {
    const { lang, setLang } = useLang();
    return (
      <div
        className={
          "inline-flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-medium " +
          className
        }
        role="group"
        aria-label={tUi("ui.language")}
      >
        {(["fr", "en"] as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`h-7 px-2.5 rounded-full transition-colors ${
              lang === l
                ? "bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return { t, LangProvider, useLang, LangSwitch };
}
