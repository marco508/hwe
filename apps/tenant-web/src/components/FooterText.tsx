"use client";

import { t } from "../lib/i18n";

/**
 * Texte du pied de page. Le layout est un Server Component : il ne peut pas
 * appeler t(), d'où ce petit composant client monté à l'intérieur du <footer>.
 */
export function FooterText() {
  return (
    <>
      © {new Date().getFullYear()} hwe — {t("acc.footer")}
    </>
  );
}
