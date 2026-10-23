"use client";

import { SessionBanners } from "@hwe/ui";
import { t } from "../lib/i18n";

/**
 * Bandeaux de session (composant partagé @hwe/ui) :
 * - e-mail non confirmé → rappel + « Renvoyer le lien » (F5) ;
 * - API injoignable → « connexion perdue, nouvelle tentative… » (A1).
 */
export function EmailVerifyBanner() {
  return <SessionBanners text={t("banner.text")} />;
}
