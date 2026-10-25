"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ErrorState, Icon, isNotFound, useAsync } from "@hwe/ui";
import type { StaySearchResult } from "@hwe/types";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useShellParams } from "../../../lib/route-params";
import {
  AddToTripButton,
  CircuitTile,
  PlaceTile,
  StaySearchBar,
  StayTile,
  VoyageCover,
  VoyageCrumbs,
  countryName,
  mapHref,
} from "../../../components/voyage/VoyageKit";

export default function DestinationPage() {
  const params = useShellParams<{ slug: string }>("/voyage/destinations/:slug");
  const { lang } = useLang();
  const { data: d, error, reload } = useAsync(() => api.voyageDestination(params!.slug), [params?.slug, lang], { enabled: !!params?.slug });
  const { data: stays } = useAsync<StaySearchResult>(() => api.staySearch({ destination: params!.slug }), [params?.slug], { enabled: !!params?.slug });

  if (error && isNotFound(error)) notFound();
  if (error && !d) return <ErrorState error={error} onRetry={reload} />;
  if (!d) return <div className="aspect-[21/9] rounded-3xl skeleton" />;
  const map = mapHref(d.latitude, d.longitude);

  return (
    <article className="space-y-10 pb-12 min-w-0">
      <VoyageCrumbs items={[{ href: "/voyage", label: t("voy.crumb.home") }, { href: `/voyage?pays=${d.country}`, label: countryName(d.country) }, { label: d.name }]} />
      <header className="relative rounded-3xl overflow-hidden min-h-[320px] flex items-end">
        <div className="absolute inset-0">
          <VoyageCover cover={d.cover} alt={d.name} size={1200} eager />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="relative p-5 sm:p-8 text-white max-w-3xl">
          <div className="text-xs uppercase tracking-[0.14em] opacity-80">{d.region} · {countryName(d.country)}</div>
          <h1 className="font-display text-3xl sm:text-5xl leading-tight [overflow-wrap:anywhere]">{d.name}</h1>
          <p className="mt-2 text-white/90">{d.summary}</p>
        </div>
      </header>
      {d.coverCredit && <p className="text-xs text-ink-muted -mt-8">{t("voy.photoCredit", { credit: d.coverCredit })}</p>}

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <p className="whitespace-pre-line leading-relaxed">{d.description}</p>
        </div>
        <aside className="space-y-3">
          {map && (
            <a href={map} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 text-ink hover:text-ink">
              <Icon name="mapPin" size={18} /> {t("voy.openMap")}
            </a>
          )}
          <div className="rounded-2xl border border-border bg-surface p-4 text-sm">
            <div className="font-semibold mb-1">{t("voy.dest.inNumbers")}</div>
            <div className="text-ink-muted">{t("voy.placeCount", { count: d.places.length })}</div>
            {stays && <div className="text-ink-muted">{t("voy.dest.staysCount", { count: stays.total })}</div>}
          </div>
        </aside>
      </section>

      {d.places.length > 0 && (
        <section>
          <h2 className="font-display text-2xl mb-4">{t("voy.dest.places", { name: d.name })}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {d.places.map((p) => (
              <PlaceTile key={p.id} p={p} action={<AddToTripButton place={p} country={d.country} />} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-display text-2xl mb-1">{t("voy.dest.stays", { name: d.name })}</h2>
        <p className="text-ink-muted mb-4">{t("voy.dest.staysSub")}</p>
        <StaySearchBar initial={{ destination: d.slug }} destinations={[d]} compact />
        {stays && stays.items.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {stays.items.slice(0, 6).map((s) => (
              <StayTile key={s.id} s={s} />
            ))}
          </div>
        ) : stays ? (
          <p className="text-sm text-ink-muted mt-4">{t("voy.dest.noStays")}</p>
        ) : null}
        {stays && stays.total > 6 && (
          <Link href={`/voyage/sejours?destination=${d.slug}`} className="inline-block mt-4 text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline">
            {t("voy.dest.allStays", { count: stays.total })}
          </Link>
        )}
      </section>

      {d.circuits.length > 0 && (
        <section>
          <h2 className="font-display text-2xl mb-4">{t("voy.dest.circuits")}</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {d.circuits.map((c) => (
              <CircuitTile key={c.id} c={c} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
