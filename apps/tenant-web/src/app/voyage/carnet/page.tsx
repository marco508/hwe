"use client";

import * as React from "react";
import { notFound, useRouter } from "next/navigation";
import { ErrorState, isNotFound, useAsync, useLoginRedirect } from "@hwe/ui";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useAuth } from "../../../lib/auth-context";
import { useShellParams } from "../../../lib/route-params";
import { TripView } from "../../../components/voyage/TripView";
import { VoyageCrumbs } from "../../../components/voyage/VoyageKit";

export default function TripPage() {
  const params = useShellParams<{ id: string }>("/voyage/mes-voyages/:id");
  const auth = useAuth();
  const router = useRouter();
  const { lang } = useLang();
  useLoginRedirect(auth, router);
  const { data, error, reload } = useAsync(() => api.trip(params!.id), [params?.id, auth.user?.id, lang], { enabled: !!params?.id && !!auth.user });
  if (error && isNotFound(error)) notFound();
  if (error && !data) return <ErrorState error={error} onRetry={reload} />;
  if (!data) return <p className="text-ink-muted">{t("com.loading")}</p>;
  return (
    <>
      <div className="print:hidden">
        <VoyageCrumbs items={[{ href: "/voyage", label: t("voy.crumb.home") }, { href: "/voyage/mes-voyages", label: t("voy.trips.title") }, { label: data.title }]} />
      </div>
      <TripView key={data.id + lang} initial={data} editable />
    </>
  );
}
