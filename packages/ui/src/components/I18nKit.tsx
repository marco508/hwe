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

/** Langue courante des composants partagés (formatteurs, messages d'erreur). */
export function getUiLang(): Lang {
  return uiLang;
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
    "ui.detectedViaIp": "Suggéré d'après la langue de votre navigateur",
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
    // ── Ajouts : erreurs, session, vérification e-mail, statuts ──
    "ui.close": "Fermer",
    "ui.retry": "Réessayer",
    "ui.loading": "Chargement…",
    "ui.perDay": "/ jour",
    "ui.perWeek": "/ semaine",
    "ui.perYear": "/ an",
    "ui.currency": "Devise",
    "ui.allCountries": "Tous les pays",
    "ui.ratesNote": "Conversion indicative (taux du {date}). Le montant contractuel reste celui de l'annonce.",
    "ui.err.generic": "Une erreur est survenue. Réessayez.",
    "ui.err.network": "Connexion au serveur impossible. Vérifiez votre réseau puis réessayez.",
    "ui.err.server": "Le service est momentanément indisponible. Réessayez dans un instant.",
    "ui.err.rateLimit": "Trop de tentatives. Patientez un instant avant de réessayer.",
    "ui.err.session": "Votre session a expiré. Reconnectez-vous.",
    "ui.err.tooLarge": "Fichier trop volumineux.",
    "ui.err.notFound": "Élément introuvable.",
    "ui.err.forbidden": "Vous n'avez pas accès à cette ressource.",
    "ui.err.emailNotVerified": "Confirmez d'abord votre adresse e-mail grâce au lien reçu par e-mail.",
    "ui.err.loadTitle": "Chargement impossible",
    "ui.err.fileType": "Format non accepté : JPG, PNG, WebP ou PDF.",
    "ui.err.imageType": "Format non accepté : JPG, PNG ou WebP.",
    "ui.err.fileTooBig": "Fichier trop volumineux (maximum {max}).",
    "ui.err.openDoc": "Impossible d'ouvrir ce document.",
    "ui.err.imageRead": "Impossible de lire cette image.",
    "ui.session.offline": "Connexion au serveur perdue — nouvelle tentative automatique…",
    "ui.session.retryNow": "Réessayer maintenant",
    "ui.verify.title": "Confirmez votre adresse e-mail",
    "ui.verify.text": "Pour publier un bien, envoyer une demande ou réserver une visite, confirmez d'abord votre adresse e-mail grâce au lien que nous vous avons envoyé.",
    "ui.verify.banner": "Confirmez votre adresse e-mail pour débloquer toutes les fonctionnalités.",
    "ui.verify.resend": "Renvoyer le lien",
    "ui.verify.sending": "Envoi…",
    "ui.verify.sent": "Lien envoyé — vérifiez votre boîte mail (et les indésirables).",
    "ui.verify.already": "Votre adresse est déjà confirmée.",
    "ui.verify.done": "J'ai confirmé mon adresse",
    "ui.verify.stillPending": "Adresse pas encore confirmée : ouvrez le lien reçu par e-mail.",
    "ui.status.RENTED": "Loué",
    "ui.status.SOLD": "Vendu",
    "ui.status.DRAFT": "Brouillon",
    "ui.status.ARCHIVED": "Archivé",
    "ui.status.PUBLISHED": "Publié",
    "ui.imageUnavailable": "Image indisponible",
    "ui.notFound.title": "Page introuvable",
    "ui.notFound.text": "Cette page n'existe pas ou n'est plus disponible.",
    "ui.notFound.home": "Retour à l'accueil",
    "ui.error.title": "Une erreur est survenue",
    "ui.error.text": "La page n'a pas pu s'afficher. Vous pouvez réessayer.",
    "ui.roleGuard.title": "Espace réservé",
    "ui.roleGuard.text": "Cette page est réservée aux comptes propriétaires.",
    // Pièces d'identité (composant partagé)
    "ui.docs.title": "Documents d'identité",
    "ui.docs.sub": "CNI, passeport, titre de séjour… Ces documents restent privés et confidentiels.",
    "ui.docs.add": "+ Ajouter",
    "ui.docs.typeLabel": "Type de document",
    "ui.docs.nameLabel": "Nom / libellé",
    "ui.docs.fileLabel": "Fichier",
    "ui.docs.chooseFile": "Choisir un fichier",
    "ui.docs.changeFile": "Changer de fichier",
    "ui.docs.fileHint": "JPG, PNG, WebP ou PDF — 8 Mo maximum",
    "ui.docs.empty": "Aucun document d'identité ajouté pour le moment.",
    "ui.docs.verified": "✓ Vérifié",
    "ui.docs.view": "Voir",
    "ui.docs.delete": "Supprimer",
    "ui.docs.confirmDelete": "Supprimer ce document ?",
    "ui.docs.save": "Enregistrer",
    "ui.docs.sending": "Envoi…",
    "ui.docs.cancel": "Annuler",
    "ui.docs.added": "Document ajouté.",
    "ui.docs.deleted": "Document supprimé.",
    "ui.docType.NATIONAL_ID": "Carte nationale d'identité",
    "ui.docType.PASSPORT": "Passeport",
    "ui.docType.DRIVERS_LICENSE": "Permis de conduire",
    "ui.docType.RESIDENCE_PERMIT": "Titre de séjour",
    "ui.docType.INCOME_PROOF": "Justificatif de revenus",
    "ui.docType.EMPLOYMENT_CONTRACT": "Contrat de travail",
    "ui.docType.TAX_NOTICE": "Avis d'imposition",
    "ui.docType.GUARANTOR_ID": "Pièce d'identité du garant",
    "ui.docType.GUARANTOR_INCOME": "Revenus du garant",
    "ui.docType.OTHER": "Autre",
    // Avatar (composant partagé)
    "ui.avatar.change": "Changer la photo",
    "ui.avatar.remove": "Retirer la photo",
    "ui.avatar.alt": "Photo de profil",
    "ui.avatar.hint": "JPG, PNG ou WebP — 2 Mo maximum",
    // Messagerie (vue partagée)
    "ui.msg.anonymous": "Anonyme",
    "ui.msg.someone": "Quelqu'un",
    "ui.msg.newFrom": "Nouveau message de {name}",
    "ui.msg.enableNotifs": "🔔 Activer les notifications",
    "ui.msg.notifsOn": "Notifications du navigateur actives",
    "ui.msg.selectTitle": "Sélectionnez une conversation",
    "ui.msg.selectSub": "Choisissez un fil de discussion dans la liste pour lire les messages et y répondre.",
    "ui.msg.backToList": "Retour à la liste",
    "ui.msg.noMessages": "Aucun message pour l'instant. Écrivez le premier !",
    "ui.msg.unread1": "{n} message non lu.",
    "ui.msg.unreadN": "{n} messages non lus.",
    "ui.msg.roleOwner": "propriétaire",
    "ui.msg.roleContact": "candidat",
    "ui.msg.notFound": "Cette conversation est introuvable.",
  },
  en: {
    "ui.time.now": "just now",
    "ui.time.min": "{n} min",
    "ui.time.hours": "{n} hr",
    "ui.time.days": "{n} d",
    "ui.scrollLeft": "Scroll left",
    "ui.scrollRight": "Scroll right",
    "ui.detectedViaIp": "Suggested from your browser language",
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
    "ui.close": "Close",
    "ui.retry": "Try again",
    "ui.loading": "Loading…",
    "ui.perDay": "/ day",
    "ui.perWeek": "/ week",
    "ui.perYear": "/ year",
    "ui.currency": "Currency",
    "ui.allCountries": "All countries",
    "ui.ratesNote": "Indicative conversion (rates as of {date}). The contractual amount is the one in the listing.",
    "ui.err.generic": "Something went wrong. Please try again.",
    "ui.err.network": "Can't reach the server. Check your connection and try again.",
    "ui.err.server": "The service is temporarily unavailable. Please try again shortly.",
    "ui.err.rateLimit": "Too many attempts. Please wait a moment before trying again.",
    "ui.err.session": "Your session has expired. Please sign in again.",
    "ui.err.tooLarge": "File too large.",
    "ui.err.notFound": "Item not found.",
    "ui.err.forbidden": "You don't have access to this resource.",
    "ui.err.emailNotVerified": "Please confirm your email address first, using the link we emailed you.",
    "ui.err.loadTitle": "Couldn't load",
    "ui.err.fileType": "Unsupported format: JPG, PNG, WebP or PDF.",
    "ui.err.imageType": "Unsupported format: JPG, PNG or WebP.",
    "ui.err.fileTooBig": "File too large (maximum {max}).",
    "ui.err.openDoc": "This document can't be opened.",
    "ui.err.imageRead": "This image can't be read.",
    "ui.session.offline": "Lost connection to the server — retrying automatically…",
    "ui.session.retryNow": "Retry now",
    "ui.verify.title": "Confirm your email address",
    "ui.verify.text": "To publish a property, send a request or book a visit, first confirm your email address using the link we sent you.",
    "ui.verify.banner": "Confirm your email address to unlock every feature.",
    "ui.verify.resend": "Resend the link",
    "ui.verify.sending": "Sending…",
    "ui.verify.sent": "Link sent — check your inbox (and spam folder).",
    "ui.verify.already": "Your address is already confirmed.",
    "ui.verify.done": "I've confirmed my address",
    "ui.verify.stillPending": "Address not confirmed yet: open the link we emailed you.",
    "ui.status.RENTED": "Rented",
    "ui.status.SOLD": "Sold",
    "ui.status.DRAFT": "Draft",
    "ui.status.ARCHIVED": "Archived",
    "ui.status.PUBLISHED": "Published",
    "ui.imageUnavailable": "Image unavailable",
    "ui.notFound.title": "Page not found",
    "ui.notFound.text": "This page doesn't exist or is no longer available.",
    "ui.notFound.home": "Back to home",
    "ui.error.title": "Something went wrong",
    "ui.error.text": "The page couldn't be displayed. You can try again.",
    "ui.roleGuard.title": "Restricted area",
    "ui.roleGuard.text": "This page is reserved for landlord accounts.",
    "ui.docs.title": "Identity documents",
    "ui.docs.sub": "ID card, passport, residence permit… These documents remain private and confidential.",
    "ui.docs.add": "+ Add",
    "ui.docs.typeLabel": "Document type",
    "ui.docs.nameLabel": "Name / label",
    "ui.docs.fileLabel": "File",
    "ui.docs.chooseFile": "Choose a file",
    "ui.docs.changeFile": "Choose another file",
    "ui.docs.fileHint": "JPG, PNG, WebP or PDF — 8 MB maximum",
    "ui.docs.empty": "No identity document added yet.",
    "ui.docs.verified": "✓ Verified",
    "ui.docs.view": "View",
    "ui.docs.delete": "Delete",
    "ui.docs.confirmDelete": "Delete this document?",
    "ui.docs.save": "Save",
    "ui.docs.sending": "Sending…",
    "ui.docs.cancel": "Cancel",
    "ui.docs.added": "Document added.",
    "ui.docs.deleted": "Document deleted.",
    "ui.docType.NATIONAL_ID": "National ID card",
    "ui.docType.PASSPORT": "Passport",
    "ui.docType.DRIVERS_LICENSE": "Driver's license",
    "ui.docType.RESIDENCE_PERMIT": "Residence permit",
    "ui.docType.INCOME_PROOF": "Proof of income",
    "ui.docType.EMPLOYMENT_CONTRACT": "Employment contract",
    "ui.docType.TAX_NOTICE": "Tax notice",
    "ui.docType.GUARANTOR_ID": "Guarantor's ID",
    "ui.docType.GUARANTOR_INCOME": "Guarantor's income",
    "ui.docType.OTHER": "Other",
    "ui.avatar.change": "Change photo",
    "ui.avatar.remove": "Remove photo",
    "ui.avatar.alt": "Profile photo",
    "ui.avatar.hint": "JPG, PNG or WebP — 2 MB maximum",
    "ui.msg.anonymous": "Anonymous",
    "ui.msg.someone": "Someone",
    "ui.msg.newFrom": "New message from {name}",
    "ui.msg.enableNotifs": "🔔 Enable notifications",
    "ui.msg.notifsOn": "Browser notifications enabled",
    "ui.msg.selectTitle": "Select a conversation",
    "ui.msg.selectSub": "Pick a thread from the list to read the messages and reply.",
    "ui.msg.backToList": "Back to the list",
    "ui.msg.noMessages": "No messages yet. Write the first one!",
    "ui.msg.unread1": "{n} unread message.",
    "ui.msg.unreadN": "{n} unread messages.",
    "ui.msg.roleOwner": "landlord",
    "ui.msg.roleContact": "applicant",
    "ui.msg.notFound": "This conversation can't be found.",
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

    // Attribut lang du document (lecteurs d'écran, césure).
    React.useEffect(() => {
      try {
        document.documentElement.lang = lang;
      } catch {
        /* rien */
      }
    }, [lang]);

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

    // `key={lang}` : les pages appellent t() sans s'abonner au contexte ; on
    // remonte donc l'arbre au changement de langue pour tout retraduire.
    return (
      <Ctx.Provider value={{ lang, setLang }}>
        <React.Fragment key={lang}>{children}</React.Fragment>
      </Ctx.Provider>
    );
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
            aria-pressed={lang === l}
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
