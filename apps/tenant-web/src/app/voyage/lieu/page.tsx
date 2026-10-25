"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { Badge, ErrorState, Icon, isNotFound, useAsync, type IconName } from "@hwe/ui";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useShellParams } from "../../../lib/route-params";
import {
  AddToTripButton,
  CATEGORY_ICON,
  PlaceTile,
  VoyageCover,
  VoyageCrumbs,
  countryName,
  fmtDuration,
  mapHref,
} from "../../../components/voyage/VoyageKit";

function Fact({ icon, label, value }: { icon: IconName; label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-3 min-w-0">
      <Icon name={icon} size={18} className="text-brand-600 dark:text-brand-300 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.12em] text-ink-muted">{label}</div>
        <div className="text-sm [overflow-wrap:anywhere]">{value}</div>
      </div>
    </div>
  );
}

export default function PlacePage() {
  const params = useShellParams<{ slug: string }>("/voyage/lieux/:slug");
  const { lang } = useLang();
  const { data: p, error, reload } = useAsync(() => api.voyagePlace(params!.slug), [params?.slug, lang], { enabled: !!params?.slug });

  if (error && isNotFound(error)) notFound();
  if (error && !p) return <ErrorState error={error} onRetry={reload} />;
  if (!p) return <div className="aspect-[21/9] rounded-3xl skeleton" />;
  const map = mapHref(p.latitude, p.longitude);
  const country = p.destination.country;

  return (
    <article className="space-y-10 pb-12 min-w-0">
      <VoyageCrumbs
        items={[
          { href: "/voyage", label: t("voy.crumb.home") },
          { href: `/voyage?pays=${country}`, label: countryName(country) },
          { href: `/voyage/destinations/${p.destination.slug}`, label: p.destination.name },
          { label: p.name },
        ]}
      />
      <div className="grid lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 rounded-3xl overflow-hidden aspect-[3/2]">
          <VoyageCover cover={p.cover ?? p.destination.cover} alt={p.name} category={p.cover ? undefined : p.category} size={1200} eager />
        </div>
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <Badge tone="ocean">
            <span className="inline-flex items-center gap-1">
              <Icon name={CATEGORY_ICON[p.category]} size={12} /> {t(`voy.cat.${p.category}`)}
            </span>
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight [overflow-wrap:anywhere]">{p.name}</h1>
          <p className="text-ink-muted">{p.summary}</p>
          <div className="flex gap-2 flex-wrap">
            <AddToTripButton place={p} country={country} size="md" />
            {map && (
              <a href={map} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md border border-border text-sm hover:border-brand-400 text-ink hover:text-ink">
                <Icon name="mapPin" size={14} /> {t("voy.openMap")}
              </a>
            )}
          </div>
          {(p.coverCredit || p.destination.coverCredit) && (
            <p className="text-xs text-ink-muted">{t("voy.photoCredit", { credit: p.coverCredit ?? p.destination.coverCredit ?? "" })}</p>
          )}
        </div>
      </div>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <p className="whitespace-pre-line leading-relaxed">{p.description}</p>
          {p.tips && (
            <div className="rounded-2xl bg-brand-50 dark:bg-brand-900/30 border border-brand-200/60 dark:border-brand-800 p-4">
              <div className="font-semibold mb-1 flex items-center gap-2">
                <Icon name="info" size={16} /> {t("voy.place.tips")}
              </div>
              <p className="text-sm whitespace-pre-line">{p.tips}</p>
            </div>
          )}
        </div>
        <aside className="rounded-2xl border border-border bg-surface p-5 space-y-4 h-fit">
          <div className="font-semibold">{t("voy.place.practical")}</div>
          {p.visitMinutes ? <Fact icon="clock" label={t("voy.place.duration")} value={fmtDuration(p.visitMinutes)} /> : null}
          {p.bestPeriod && <Fact icon="calendar" label={t("voy.place.bestPeriod")} value={p.bestPeriod} />}
          {p.openingHours && <Fact icon="clock" label={t("voy.place.hours")} value={p.openingHours} />}
          {p.priceInfo && <Fact icon="coins" label={t("voy.place.price")} value={p.priceInfo} />}
          {p.address && <Fact icon="mapPin" label={t("voy.place.address")} value={p.address} />}
          {p.website && (
            <Fact
              icon="globe"
              label={t("voy.place.website")}
              value={
                <a href={p.website} target="_blank" rel="noopener noreferrer nofollow" className="text-brand-700 dark:text-brand-300 hover:underline">
                  {p.website.replace(/^https?:\/\//, "")}
                </a>
              }
            />
          )}
          <p className="text-xs text-ink-muted border-t border-border pt-3">{t("voy.place.indicative")}</p>
        </aside>
      </section>

      {p.nearby.length > 0 && (
        <section>
          <h2 className="font-display text-2xl mb-4">{t("voy.place.nearby", { name: p.destination.name })}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {p.nearby.map((n) => (
              <PlaceTile key={n.id} p={n} action={<AddToTripButton place={n} country={country} />} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
