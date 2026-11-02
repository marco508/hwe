"use client";

import * as React from "react";
import type { User } from "@hwe/types";
import { DkpCallback, dkpStartUrl } from "@hwe/ui";
import { t } from "../../../lib/i18n";

// Retour « Continuer avec un compte DKP » : jeton dans le fragment de l'URL.
const destination = (_u: User, next: string) => next || "/";

export default function DkpReturnPage() {
  return (
    <DkpCallback
      defaultNext={destination}
      wrongRole={
        <div role="alert" className="rounded-lg border border-brand-200 bg-brand-50/70 dark:border-brand-800 dark:bg-brand-900/25 px-4 py-3 text-sm space-y-2 text-start">
          <p className="font-medium text-ink">{t("login.proTitle")}</p>
          <p className="text-ink-muted">{t("login.proText")}</p>
          <a
            href={dkpStartUrl("owner")}
            className="inline-flex items-center h-9 px-4 rounded-full bg-brand-600 text-white hover:text-white hover:bg-brand-700 text-sm font-medium"
          >
            {t("login.proCta")}
          </a>
        </div>
      }
    />
  );
}
