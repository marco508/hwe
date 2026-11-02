"use client";

import * as React from "react";
import type { User } from "@hwe/types";
import { DkpCallback, Icon, dkpStartUrl } from "@hwe/ui";
import { t } from "../../../lib/i18n";

// Retour « Continuer avec un compte DKP » : jeton dans le fragment de l'URL.
// Un pro arrive sur son tableau de bord (/pro), comme après la connexion habituelle.
const destination = (u: User, next: string) =>
  u.role === "AGENT" ? (next && next !== "/dashboard" ? next : "/pro") : next || "/dashboard";

export default function DkpReturnPage() {
  return (
    <DkpCallback
      defaultNext={destination}
      wrongRole={
        <div role="alert" className="space-y-3">
          <p className="text-ink">{t("login.errRole")}</p>
          <a
            href={dkpStartUrl("tenant")}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90"
          >
            {t("guard.tenantSpace")} <Icon name="arrowRight" size={15} className="rtl:rotate-180" />
          </a>
        </div>
      }
    />
  );
}
