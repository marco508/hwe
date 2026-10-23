"use client";

import { LANDING_URL } from "@hwe/ui";
import { t } from "../lib/i18n";

/**
 * Texte du pied de page. Le layout est un Server Component : il ne peut pas
 * appeler t(), d'où ce petit composant client monté à l'intérieur du <footer>.
 * Liens vers les pages légales hébergées sur la landing (U5).
 */
export function FooterText() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <span>
        © {new Date().getFullYear()} hwe — {t("acc.footer")}
      </span>
      <nav aria-label={t("fix.footer.legalNav")} className="flex flex-wrap gap-x-4 gap-y-1">
        <a href={`${LANDING_URL}/mentions-legales`} className="text-ink-muted hover:text-ink">
          {t("fix.footer.legal")}
        </a>
        <a href={`${LANDING_URL}/cgu`} className="text-ink-muted hover:text-ink">
          {t("fix.footer.terms")}
        </a>
        <a href={`${LANDING_URL}/confidentialite`} className="text-ink-muted hover:text-ink">
          {t("fix.footer.privacy")}
        </a>
      </nav>
    </div>
  );
}
