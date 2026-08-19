"use client";

import { createI18n } from "@hwe/ui";
import * as p0 from "./i18n-parts/property";
import * as p1 from "./i18n-parts/rental";
import * as p2 from "./i18n-parts/rents";
import * as p3 from "./i18n-parts/comms";
import * as p4 from "./i18n-parts/account";

// fr = textes d'origine ; en = traduction. Couvre la coque de l'app
// (navigation, auth, accueil) — les écrans de gestion restent en français.
const fr: Record<string, string> = {
  "common.loading": "Chargement…",

  "meta.title": "hwe — Trouvez votre logement",
  "meta.description": "Achetez ou louez un bien immobilier près de chez vous.",

  "nav.listings": "Annonces",
  "nav.myRental": "Ma location",
  "nav.myRents": "Mes loyers",
  "nav.myVisits": "Mes visites",
  "nav.favorites": "❤ Favoris",
  "nav.myRequests": "Mes demandes",
  "nav.messages": "Messages",
  "nav.profile": "Profil",
  "nav.logout": "Déconnexion",
  "nav.login": "Connexion",
  "nav.signup": "Créer un compte",

  "banner.text": "Confirmez votre e-mail pour contacter un propriétaire et accéder à votre bail.",
  "banner.sent": "Lien envoyé — vérifiez votre boîte mail.",
  "banner.resend": "Renvoyer le lien",
  "banner.sending": "Envoi…",

  "login.title1": "Bon retour sur",
  "login.sub": "Retrouvez vos favoris, vos demandes, votre bail et vos loyers.",
  "login.email": "Email",
  "login.password": "Mot de passe",
  "login.forgot": "Mot de passe oublié ?",
  "login.submit": "Se connecter",
  "login.submitting": "Connexion…",
  "login.noAccount": "Pas de compte ?",
  "login.signup": "Créer un compte",
  "login.errCreds": "Identifiants invalides.",

  "register.title1": "Bienvenue sur",
  "register.sub": "Contactez les propriétaires, suivez vos demandes, gérez votre location.",
  "register.firstName": "Prénom",
  "register.lastName": "Nom",
  "register.phone": "Téléphone",
  "register.submit": "Créer mon compte",
  "register.submitting": "Création…",
  "register.already": "Déjà inscrit ?",
  "register.login": "Connexion",
  "register.errTaken": "Email déjà utilisé.",
  "register.errFail": "Échec de l'inscription.",

  "home.title": "Trouvez votre logement",
  "home.sub": "Annonces publiées par les propriétaires. Contactez-les directement.",
  "home.tile.rental": "Ma location",
  "home.tile.rentalHint": "bail, état des lieux, préavis",
  "home.tile.rents": "Mes loyers",
  "home.tile.rentsHint": "payer, quittances",
  "home.tile.visits": "Mes visites",
  "home.tile.visitsHint": "créneaux demandés",
  "home.tile.requests": "Mes demandes",
  "home.tile.requestsHint": "candidatures envoyées",
  "home.tile.messages": "Messages",
  "home.tile.messagesHint": "échanger",
  "home.tile.dossier": "Mon dossier",
  "home.tile.dossierHint": "identité, revenus, garant",

  "verify.pending": "Vérification…",
  "verify.okTitle": "Adresse confirmée",
  "verify.okSub": "Votre compte est actif : contactez, candidatez, suivez votre bail.",
  "verify.okCta": "Chercher un logement",
  "verify.errTitle": "Lien invalide ou expiré",
  "verify.errSub": "Redemandez un lien depuis le bandeau de votre espace, puis réessayez.",
  "verify.errCta": "Retour à l'accueil",
};

const en: Record<string, string> = {
  "common.loading": "Loading…",

  "meta.title": "hwe — Find your home",
  "meta.description": "Buy or rent a property near you.",

  "nav.listings": "Listings",
  "nav.myRental": "My rental",
  "nav.myRents": "My rent",
  "nav.myVisits": "My visits",
  "nav.favorites": "❤ Favorites",
  "nav.myRequests": "My requests",
  "nav.messages": "Messages",
  "nav.profile": "Profile",
  "nav.logout": "Log out",
  "nav.login": "Log in",
  "nav.signup": "Sign up",

  "banner.text": "Confirm your email to contact a landlord and access your lease.",
  "banner.sent": "Link sent — check your inbox.",
  "banner.resend": "Resend link",
  "banner.sending": "Sending…",

  "login.title1": "Welcome back to",
  "login.sub": "Your favorites, requests, lease and rents in one place.",
  "login.email": "Email",
  "login.password": "Password",
  "login.forgot": "Forgot password?",
  "login.submit": "Log in",
  "login.submitting": "Logging in…",
  "login.noAccount": "No account?",
  "login.signup": "Sign up",
  "login.errCreds": "Invalid credentials.",

  "register.title1": "Welcome to",
  "register.sub": "Contact landlords, track your requests, manage your rental.",
  "register.firstName": "First name",
  "register.lastName": "Last name",
  "register.phone": "Phone",
  "register.submit": "Create my account",
  "register.submitting": "Creating…",
  "register.already": "Already registered?",
  "register.login": "Log in",
  "register.errTaken": "Email already in use.",
  "register.errFail": "Sign-up failed.",

  "home.title": "Find your home",
  "home.sub": "Listings published by landlords. Contact them directly.",
  "home.tile.rental": "My rental",
  "home.tile.rentalHint": "lease, inspection, notice",
  "home.tile.rents": "My rent",
  "home.tile.rentsHint": "pay, receipts",
  "home.tile.visits": "My visits",
  "home.tile.visitsHint": "requested slots",
  "home.tile.requests": "My requests",
  "home.tile.requestsHint": "applications sent",
  "home.tile.messages": "Messages",
  "home.tile.messagesHint": "chat",
  "home.tile.dossier": "My file",
  "home.tile.dossierHint": "identity, income, guarantor",

  "verify.pending": "Verifying…",
  "verify.okTitle": "Email confirmed",
  "verify.okSub": "Your account is active: contact, apply, track your lease.",
  "verify.okCta": "Find a home",
  "verify.errTitle": "Invalid or expired link",
  "verify.errSub": "Request a new link from the banner in your space, then try again.",
  "verify.errCta": "Back to home",
};

export const { t, LangProvider, useLang, LangSwitch } = createI18n({
  fr: { ...fr, ...p0.fr, ...p1.fr, ...p2.fr, ...p3.fr, ...p4.fr },
  en: { ...en, ...p0.en, ...p1.en, ...p2.en, ...p3.en, ...p4.en },
});
