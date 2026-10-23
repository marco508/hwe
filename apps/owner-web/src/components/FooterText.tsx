"use client";

import * as React from "react";
import { t } from "../lib/i18n";
import { Icon } from "@hwe/ui";

// Le layout est un Server Component : il ne peut pas appeler t().
// Ce petit composant client porte les textes traduits du pied de page.
export function FooterText() {
  return (
    <>
      <span>
        © {new Date().getFullYear()} hwe — {t("acc.footer.owner")}
      </span>
      <span className="hidden sm:inline text-ink-subtle">
        {t("acc.footer.tagline")} <Icon name="sparkles" size={12} className="text-accent-400" />
      </span>
    </>
  );
}
