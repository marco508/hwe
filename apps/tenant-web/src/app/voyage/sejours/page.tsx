"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button, EmptyState, ErrorState, useAsync } from "@hwe/ui";
import { VOYAGE_DEFAULT_COUNTRY } from "@hwe/types";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { StaySearchBar, StayTile, VoyageCrumbs, fmtDay, stayQueryString } from "../../../components/voyage/VoyageKit";

const ISO = /^\d{4}-\d{2}-\d{2}$/;

function Results() {
  const sp = useSearchParams();
  const { lang } = useLang();
  const q = {
    destination: sp.get("destination") ?? undefined,
    city: sp.get("ville") ?? undefined,
    checkIn: ISO.test(sp.get("arrivee") ?? "") ? sp.get("arrivee")! : undefined,
    checkOut: ISO.test(sp.get("depart") ?? "") ? sp.get("depart")! : undefined,
    guests: Math.max(1, Number(sp.get("voyageurs")) || 1),
    country: (sp.get("pays") ?? "").toUpperCase() || undefined,
  };
  const key = sp.toString();
  const [page, setPage] = React.useState(1);
  React.useEffect(() => setPage(1), [key]);
  const country = q.country ?? VOYAGE_DEFAULT_COUNTRY;
  const { data: guide } = useAsync(() => api.voyageCountry(country), [country, lang]);
  const { data, error, reload } = useAsync(() => api.staySearch({ ...q, page }), [key, page]);
  // Les dates/voyageurs suivent jusqu'à la fiche (le calendrier s'y pré-remplit).
  const carry = stayQueryString({ checkIn: q.checkIn, checkOut: q.checkOut, guests: q.guests });

  return (
    <div className="space-y-6 pb-12 min-w-0">
      <VoyageCrumbs items={[{ href: "/voyage", label: t("voy.crumb.home") }, { label: t("voy.stays.title") }]} />
      <h1 className="font-display text-3xl">
        {data?.destinationName ? t("voy.stays.titleIn", { place: data.destinationName }) : q.city ? t("voy.stays.titleIn", { place: q.city }) : t("voy.stays.title")}
      </h1>
      <StaySearchBar key={key} initial={q} destinations={guide?.destinations} />
      {q.checkIn && q.checkOut && (
        <p className="text-sm text-ink-muted">
          {t("voy.stays.dates", { from: fmtDay(q.checkIn), to: fmtDay(q.checkOut), count: q.guests })}
        </p>
      )}
      {error && !data ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-2xl skeleton" />
          ))}
        </div>
      ) : data.items.length === 0 ? (
        <EmptyState illustration="search" title={t("voy.stays.emptyTitle")} description={t("voy.stays.emptyDesc")} />
      ) : (
        <>
          <p className="text-sm text-ink-muted">{t("voy.stays.count", { count: data.total })}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.items.map((s) => (
              <StayTile key={s.id} s={s} query={carry} />
            ))}
          </div>
          {data.total > data.page * data.pageSize && (
            <div className="text-center">
              <Button variant="secondary" onClick={() => setPage((p) => p + 1)}>
                {t("voy.stays.more")}
              </Button>
            </div>
          )}
        </>
      )}
      <p className="text-xs text-ink-muted">{t("voy.stays.hostHint")}</p>
    </div>
  );
}

export default function StaysPage() {
  return (
    <React.Suspense fallback={<p className="text-ink-muted">{t("com.loading")}</p>}>
      <Results />
    </React.Suspense>
  );
}
