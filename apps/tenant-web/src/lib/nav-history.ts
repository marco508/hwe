"use client";

/**
 * Navigation interne : sait-on revenir en arrière sans quitter le site ?
 * La barre de navigation (toujours montée) signale chaque changement de page ;
 * un lien « Retour » peut alors utiliser l'historique au lieu d'un lien fixe
 * (le visiteur retrouve sa recherche, ses filtres, sa position).
 */
let navigatedInApp = false;

/** Appelé par AppNavbar à chaque changement de page (sauf le premier affichage). */
export function markInAppNavigation() {
  navigatedInApp = true;
}

/** Vrai si la page précédente appartient à ce site (navigation interne ou lien du même site). */
export function cameFromThisSite(): boolean {
  if (navigatedInApp) return true;
  if (typeof document === "undefined" || !document.referrer) return false;
  try {
    return new URL(document.referrer).origin === window.location.origin && window.history.length > 1;
  } catch {
    return false;
  }
}
