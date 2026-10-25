"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ErrorState, isNotFound, useAsync } from "@hwe/ui";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useShellParams } from "../../../lib/route-params";
import { TripView } from "../../../components/voyage/TripView";

export default function SharedTripPage() {
  const params = useShellParams<{ token: string }>("/voyage/partage/:token");
  const { lang } = useLang();
  const { data, error, reload } = useAsync(() => api.sharedTrip(params!.token), [params?.token, lang], { enabled: !!params?.token });
  if (error && isNotFound(error)) notFound();
  if (error && !data) return <ErrorState error={error} onRetry={reload} />;
  if (!data) return <p className="text-ink-muted">{t("com.loading")}</p>;
  return (
    <>
      <p className="text-sm text-ink-muted mb-4 print:hidden">
        {t("voy.shared.intro")}{" "}
        <Link href="/voyage" className="text-brand-700 dark:text-brand-300 hover:underline">
          {t("voy.shared.cta")}
        </Link>
      </p>
      <TripView key={data.id + lang} initial={data} editable={false} />
    </>
  );
}
