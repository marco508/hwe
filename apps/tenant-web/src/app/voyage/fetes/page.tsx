"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorState, Icon, Input, Label, Select, useAsync } from "@hwe/ui";
import { VOYAGE_COUNTRIES, VOYAGE_DEFAULT_COUNTRY, VOYAGE_EVENT_KINDS, type VoyageEventCard, type VoyageEventKind, type VoyageEventOccurrence } from "@hwe/types";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { EVENT_KIND_ICON, EventRow, VoyageCrumbs, countryName, fmtDay, isoIn } from "../../../components/voyage/VoyageKit";

type Filter = "" | "HOLIDAY" | VoyageEventKind;
const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** Calendrier des fêtes d'un pays : 12 prochains mois ou dates choisies, par mois. */
function EventsCalendar() {
  const router = useRouter();
  const search = useSearchParams();
  const { lang } = useLang();
  const raw = (search.get("pays") ?? VOYAGE_DEFAULT_COUNTRY).toUpperCase();
  const cc = /^[A-Z]{2}$/.test(raw) ? raw : VOYAGE_DEFAULT_COUNTRY;
  const qFrom = search.get("du") ?? "";
  const qTo = search.get("au") ?? "";
  const custom = ISO.test(qFrom) && ISO.test(qTo) && qTo >= qFrom;
  const [filter, setFilter] = React.useState<Filter>("");
  const [from, setFrom] = React.useState(custom ? qFrom : "");
  const [to, setTo] = React.useState(custom ? qTo : "");

  const { data: countries } = useAsync(() => api.voyageCountries(), [lang]);
  const { data, error, reload } = useAsync(
    () => api.voyageEvents(cc, custom ? { from: qFrom, to: qTo } : {}),
    [cc, lang, custom ? qFrom : "", custom ? qTo : ""],
  );

  const setQuery = (patch: Record<string, string | null>) => {
    const p = new URLSearchParams(search.toString());
    for (const [k, v] of Object.entries(patch)) (v ? p.set(k, v) : p.delete(k));
    router.replace(`/voyage/fetes?${p.toString()}`);
  };

  const available = new Set((countries ?? []).map((c) => c.country));
  const options = [...new Set([...VOYAGE_COUNTRIES, ...available])];
  const keep = (e: VoyageEventCard) => (!filter ? true : filter === "HOLIDAY" ? e.publicHoliday : e.kind === filter);

  // Une ligne par occurrence, rangée dans le mois où elle commence (au plus tôt : début de la période affichée).
  const rows = (data?.events ?? [])
    .filter(keep)
    .flatMap((e) => e.occurrences.map((o) => ({ e, o })))
    .sort((a, b) => (a.o.start < b.o.start ? -1 : a.o.start > b.o.start ? 1 : (a.o.period ? 1 : 0) - (b.o.period ? 1 : 0)));
  const months = new Map<string, Array<{ e: VoyageEventCard; o: VoyageEventOccurrence }>>();
  for (const r of rows) {
    const key = (data && r.o.start < data.from ? data.from : r.o.start).slice(0, 7);
    months.set(key, [...(months.get(key) ?? []), r]);
  }
  const anyApprox = rows.some((r) => r.o.approx);
  const anyPeriod = rows.some((r) => r.o.period);
  const counts = (f: Filter) => (data?.events ?? []).filter((e) => (!f ? true : f === "HOLIDAY" ? e.publicHoliday : e.kind === f)).length;

  return (
    <div className="space-y-8 pb-12 min-w-0">
      <VoyageCrumbs items={[{ href: "/voyage", label: t("voy.crumb.home") }, { href: `/voyage?pays=${cc}`, label: countryName(cc) }, { label: t("voy.ev.title") }]} />
      <header className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="font-display text-3xl sm:text-4xl leading-tight">{t("voy.ev.pageTitle", { country: countryName(cc) })}</h1>
          <label className="sr-only" htmlFor="ev-country">
            {t("voy.home.country")}
          </label>
          <Select id="ev-country" value={cc} onChange={(e) => setQuery({ pays: e.target.value })} className="!w-auto !h-9 !text-sm">
            {options.map((c) => (
              <option key={c} value={c}>
                {countryName(c)}
              </option>
            ))}
          </Select>
        </div>
        <p className="text-ink-muted max-w-3xl">{t("voy.ev.pageSub")}</p>
      </header>

      <section className="rounded-2xl border border-border bg-surface p-4 space-y-4">
        <form
          className="flex gap-3 items-end flex-wrap"
          onSubmit={(e) => {
            e.preventDefault();
            if (ISO.test(from) && ISO.test(to) && to >= from) setQuery({ du: from, au: to });
          }}
        >
          <div className="space-y-1">
            <Label htmlFor="ev-from">{t("voy.ev.from")}</Label>
            <Input id="ev-from" type="date" value={from} min={isoIn(-31)} onChange={(e) => setFrom(e.target.value)} className="!w-auto" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ev-to">{t("voy.ev.to")}</Label>
            <Input id="ev-to" type="date" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} className="!w-auto" />
          </div>
          <button
            type="submit"
            disabled={!(ISO.test(from) && ISO.test(to) && to >= from)}
            className="h-10 px-4 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-50"
          >
            {t("voy.ev.myDates")}
          </button>
          {custom && (
            <button
              type="button"
              onClick={() => {
                setFrom("");
                setTo("");
                setQuery({ du: null, au: null });
              }}
              className="h-10 px-3 text-sm text-brand-700 dark:text-brand-300 hover:underline"
            >
              {t("voy.ev.next12")}
            </button>
          )}
        </form>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none" role="group" aria-label={t("voy.ev.filter")}>
          {(["", "HOLIDAY", ...VOYAGE_EVENT_KINDS] as Filter[]).map((f) => (
            <button
              key={f || "all"}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`shrink-0 inline-flex items-center gap-1.5 h-9 px-3 rounded-full border text-sm transition ${
                filter === f ? "bg-brand-600 border-brand-600 text-white" : "bg-surface border-border hover:border-brand-400"
              }`}
            >
              <Icon name={!f ? "calendar" : f === "HOLIDAY" ? "calendarCheck" : EVENT_KIND_ICON[f]} size={14} />
              {!f ? t("voy.ev.all") : f === "HOLIDAY" ? t("voy.ev.holidays") : t(`voy.ev.kinds.${f}`)}
              {data ? ` (${counts(f)})` : ""}
            </button>
          ))}
        </div>
        {data && (
          <p className="text-sm text-ink-muted">
            {custom ? t("voy.ev.rangeCustom", { from: fmtDay(data.from), to: fmtDay(data.to) }) : t("voy.ev.range12", { from: fmtDay(data.from), to: fmtDay(data.to) })}
          </p>
        )}
      </section>

      {(anyApprox || anyPeriod) && (
        <div className="rounded-2xl bg-accent-50 dark:bg-accent-700/20 border border-accent-200/60 dark:border-accent-700 p-4 text-sm flex gap-2">
          <Icon name="info" size={16} className="shrink-0 mt-0.5" />
          <div className="space-y-1">
            {anyApprox && <p>{t("voy.ev.approxNote")}</p>}
            {anyPeriod && <p>{t("voy.ev.periodNote")}</p>}
          </div>
        </div>
      )}

      {error && !data ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl skeleton" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center space-y-2">
          <Icon name="calendar" size={32} className="mx-auto text-ink-muted" />
          <p className="font-semibold">{t("voy.ev.empty")}</p>
          <p className="text-sm text-ink-muted">{t("voy.ev.emptySub")}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {[...months.entries()].map(([month, list]) => (
            <section key={month} aria-labelledby={`m-${month}`}>
              <h2 id={`m-${month}`} className="font-display text-2xl mb-3 capitalize">
                {fmtDay(`${month}-01`, { month: "long", year: "numeric" })}
              </h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {list.map(({ e, o }) => (
                  <li key={`${e.id}-${o.start}`} className="min-w-0" data-ev>
                    <EventRow e={e} o={o} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <section className="rounded-2xl border border-border bg-surface p-5 flex gap-4 items-center flex-wrap">
        <Icon name="bed" size={22} className="text-brand-600 dark:text-brand-300" />
        <div className="flex-1 min-w-[12rem]">
          <div className="font-semibold">{t("voy.ev.planTitle")}</div>
          <p className="text-sm text-ink-muted">{t("voy.ev.planText")}</p>
        </div>
        <Link href={`/voyage/sejours?pays=${cc}`} className="inline-flex items-center h-10 px-4 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
          {t("voy.ev.planCta")}
        </Link>
      </section>
    </div>
  );
}

export default function EventsPage() {
  return (
    <React.Suspense fallback={<p className="text-ink-muted">{t("com.loading")}</p>}>
      <EventsCalendar />
    </React.Suspense>
  );
}
