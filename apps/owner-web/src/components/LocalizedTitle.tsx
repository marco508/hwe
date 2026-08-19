"use client";

import * as React from "react";
import { t, useLang } from "../lib/i18n";

/**
 * Titre de l'onglet selon la langue. Les `metadata` de Next.js sont rendues
 * cote serveur et ne peuvent pas lire la locale choisie : on garde le francais
 * comme rendu initial (bon pour le referencement sur le marche principal) et
 * on ajuste ici des que l'utilisateur passe en anglais.
 */
export function LocalizedTitle() {
  const { lang } = useLang();
  React.useEffect(() => {
    document.title = t("meta.title");
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", t("meta.description"));
  }, [lang]);
  return null;
}
