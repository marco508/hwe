"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ErrorState, Icon, isNotFound, useAsync } from "@hwe/ui";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useShellParams } from "../../../lib/route-params";
import {
  EVENT_KIND_CATEGORY,
  EventBadges,
  EventRow,
  VoyageCover,
  VoyageCrumbs,
  countryName,
  fmtOccurrence,
  isoIn,
  stayQueryString,
} from "../../../components/voyage/VoyageKit";

export default function EventPage() {
  const params = useShellParams<{ slug: string }>("/voyage/fetes/:slug");
  const { lang } = useLang();
  const { data: e, error, reload } = useAsync(() => api.voyageEvent(params!.slug), [params?.slug, lang], { enabled: !!params?.slug });

  if (error && isNotFound(error)) notFound();
  if (error && !e) return <ErrorState error={error} onRetry={reload} />;
  if (!e) return <div className="aspect-[21/9] rounded-3xl skeleton" />;
  const next = e.occurrences[0];
  const exact = next && !next.period;
  const stays = stayQueryString({
    country: e.country,
    destination: e.destination?.slug,
    // Arrivée la veille (au plus tôt aujourd'hui), départ le lendemain.
    ...(exact ? { checkIn: [isoIn(0), isoIn(-1, next.start)].sort()[1], checkOut: isoIn(1, next.end) } : {}),
  });
  const calendar = exact ? `/voyage/fetes?pays=${e.country}&du=${isoIn(-7, next.start)}&au=${isoIn(7, next.end)}` : `/voyage/fetes?pays=${e.country}`;

  return (
    <article className="space-y-10 pb-12 min-w-0">
      <VoyageCrumbs
        items={[
          { href: "/voyage", label: t("voy.crumb.home") },
          { href: `/voyage?pays=${e.country}`, label: countryName(e.country) },
          { href: `/voyage/fetes?pays=${e.country}`, label: t("voy.ev.title") },
          { label: e.name },
        ]}
      />
      <div className="grid lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 rounded-3xl overflow-hidden aspect-[3/2]">
          <VoyageCover cover={e.cover} alt={e.name} category={e.cover ? undefined : EVENT_KIND_CATEGORY[e.kind]} size={1200} eager />
        </div>
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <EventBadges e={e} />
          <h1 className="font-display text-3xl sm:text-4xl leading-tight [overflow-wrap:anywhere]">{e.name}</h1>
          <p className="text-ink-muted">{e.summary}</p>
          <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
            <div className="text-xs uppercase tracking-[0.12em] text-ink-muted">{t("voy.ev.nextDates")}</div>
            {e.occurrences.length ? (
              <ul className="space-y-1">
                {e.occurrences.map((o) => (
                  <li key={o.start} className="flex items-center gap-2 text-sm">
                    <Icon name="calendar" size={14} className="text-brand-600 dark:text-brand-300 shrink-0" />
                    <span className="first-letter:uppercase">{fmtOccurrence(o)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">{t("voy.ev.noDate")}</p>
            )}
            {e.dateNote && <p className="text-xs text-ink-muted">{e.dateNote}</p>}
            {next?.approx && <p className="text-xs text-ink-muted">{t("voy.ev.approxNote")}</p>}
            {next?.period && !e.dateNote && <p className="text-xs text-ink-muted">{t("voy.ev.periodNote")}</p>}
          </div>
          {(e.place || e.destination || e.where) && (
            <div className="flex items-center gap-2 text-sm min-w-0">
              <Icon name="mapPin" size={16} className="text-brand-600 dark:text-brand-300 shrink-0" />
              {e.place ? (
                <Link href={`/voyage/lieux/${e.place.slug}`} className="text-brand-700 dark:text-brand-300 hover:underline [overflow-wrap:anywhere]">
                  {e.place.name}
                </Link>
              ) : e.destination ? (
                <Link href={`/voyage/destinations/${e.destination.slug}`} className="text-brand-700 dark:text-brand-300 hover:underline [overflow-wrap:anywhere]">
                  {e.destination.name}
                </Link>
              ) : (
                <span className="[overflow-wrap:anywhere]">{e.where}</span>
              )}
            </div>
          )}
          {e.coverCredit && <p className="text-xs text-ink-muted">{t("voy.photoCredit", { credit: e.coverCredit })}</p>}
        </div>
      </div>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {e.caution && (
            <div className="rounded-2xl border border-danger/40 bg-danger/5 p-4 text-sm flex gap-2">
              <Icon name="alert" size={16} className="shrink-0 mt-0.5" />
              <p>
                {t("voy.ev.cautionText")}{" "}
                <Link href={`/voyage?pays=${e.country}#infos`} className="font-medium underline">
                  {t("voy.ev.cautionLink")}
                </Link>
              </p>
            </div>
          )}
          <p className="whitespace-pre-line leading-relaxed">{e.description}</p>
          {e.tips && (
            <div className="rounded-2xl bg-brand-50 dark:bg-brand-900/30 border border-brand-200/60 dark:border-brand-800 p-4">
              <div className="font-semibold mb-1 flex items-center gap-2">
                <Icon name="info" size={16} /> {t("voy.ev.tips")}
              </div>
              <p className="text-sm whitespace-pre-line">{e.tips}</p>
            </div>
          )}
          {e.publicHoliday && <p className="text-sm text-ink-muted">{t("voy.ev.holidayNote")}</p>}
        </div>
        <aside className="space-y-3 h-fit">
          <Link href={`/voyage/sejours?${stays}`} className="flex gap-3 rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 hover:shadow-card transition text-ink hover:text-ink">
            <Icon name="bed" size={18} className="text-brand-600 dark:text-brand-300 shrink-0 mt-0.5" />
            <span>
              <span className="block font-semibold">{exact ? t("voy.ev.staysAt") : t("voy.ev.staysNear")}</span>
              <span className="block text-sm text-ink-muted">{t("voy.ev.staysText")}</span>
            </span>
          </Link>
          <Link href={calendar} className="flex gap-3 rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 hover:shadow-card transition text-ink hover:text-ink">
            <Icon name="calendar" size={18} className="text-brand-600 dark:text-brand-300 shrink-0 mt-0.5" />
            <span>
              <span className="block font-semibold">{t("voy.ev.seeCalendar")}</span>
              <span className="block text-sm text-ink-muted">{t("voy.ev.seeCalendarText", { country: countryName(e.country) })}</span>
            </span>
          </Link>
          <p className="text-xs text-ink-muted px-1">{t("voy.ev.indicative")}</p>
        </aside>
      </section>

      {e.related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl mb-4">{t("voy.ev.sameTime")}</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {e.related.map((r) => (
              <li key={r.id} className="min-w-0">
                <EventRow e={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
