"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorState, Icon, Select, useAsync } from "@hwe/ui";
import { PLACE_CATEGORIES, VOYAGE_COUNTRIES, VOYAGE_DEFAULT_COUNTRY, type PlaceCard, type PlaceCategory } from "@hwe/types";
import { api } from "../../lib/api";
import { t, useLang } from "../../lib/i18n";
import { useAuth } from "../../lib/auth-context";
import {
  AddToTripButton,
  CATEGORY_ICON,
  CircuitTile,
  DestinationTile,
  EventTile,
  PlaceTile,
  StaySearchBar,
  VoyageCover,
  countryName,
} from "../../components/voyage/VoyageKit";

function VoyageHome() {
  const router = useRouter();
  const search = useSearchParams();
  const { lang } = useLang();
  const { user } = useAuth();
  const raw = (search.get("pays") ?? VOYAGE_DEFAULT_COUNTRY).toUpperCase();
  const cc = /^[A-Z]{2}$/.test(raw) ? raw : VOYAGE_DEFAULT_COUNTRY;
  const [category, setCategory] = React.useState<PlaceCategory | "">("");

  const { data: countries } = useAsync(() => api.voyageCountries(), [lang]);
  const { data, error, reload } = useAsync(() => api.voyageCountry(cc), [cc, lang]);
  const { data: events } = useAsync(() => api.voyageEvents(cc), [cc, lang]);
  const { data: places } = useAsync<PlaceCard[]>(
    () => api.voyagePlaces({ country: cc, category: category || undefined }),
    [cc, category, lang],
    { enabled: !!category },
  );

  const available = new Set((countries ?? []).map((c) => c.country));
  const options = [...new Set([...VOYAGE_COUNTRIES, ...available])];
  const shown = category ? places ?? [] : data?.featured ?? [];
  const hero = data?.destinations.find((d) => d.cover)?.cover ?? null;
  const noGuide = !!error && !data;

  return (
    <div className="space-y-12 pb-12 min-w-0">
      {/* ── En-tête ── */}
      <section className="relative -mx-4 sm:mx-0 sm:rounded-3xl overflow-hidden min-h-[420px] flex items-end">
        <div className="absolute inset-0">
          <VoyageCover cover={hero} alt="" size={1200} eager />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>
        <div className="relative w-full p-4 sm:p-8 space-y-5 text-white">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur px-3 py-1 text-xs uppercase tracking-[0.14em]">
              <Icon name="compass" size={14} /> {t("voy.home.kicker")}
            </span>
            <label className="sr-only" htmlFor="voy-country">
              {t("voy.home.country")}
            </label>
            <Select
              id="voy-country"
              value={cc}
              onChange={(e) => router.replace(`/voyage?pays=${e.target.value}`)}
              className="!w-auto !h-8 !text-sm !bg-white/90 !text-ink"
            >
              {options.map((c) => (
                <option key={c} value={c}>
                  {countryName(c)}
                  {available.has(c) ? "" : ` — ${t("voy.home.soon")}`}
                </option>
              ))}
            </Select>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl leading-tight max-w-3xl">
            {t("voy.home.title", { country: countryName(cc) })}
          </h1>
          <p className="max-w-2xl text-white/90">{data?.guide?.intro ?? t("voy.home.sub")}</p>
          <StaySearchBar destinations={data?.destinations} initial={{ country: cc }} />
        </div>
      </section>

      {noGuide ? (
        <section className="rounded-2xl border border-border bg-surface p-6 text-center space-y-3">
          <Icon name="globe" size={36} className="mx-auto text-ink-muted" />
          <h2 className="font-display text-2xl">{t("voy.home.soonTitle", { country: countryName(cc) })}</h2>
          <p className="text-ink-muted max-w-xl mx-auto">{t("voy.home.soonText")}</p>
          <Link href={`/voyage/sejours?pays=${cc}`} className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
            {t("voy.home.soonStays")}
          </Link>
          <div className="pt-2">
            <ErrorState error={error} onRetry={reload} />
          </div>
        </section>
      ) : !data ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-2xl skeleton" />
          ))}
        </div>
      ) : (
        <>
          {/* ── Raccourcis ── */}
          <section className="grid sm:grid-cols-3 gap-3">
            {[
              { href: user ? "/voyage/mes-voyages" : "/login?next=/voyage/mes-voyages", icon: "calendar" as const, title: t("voy.home.planTitle"), text: t("voy.home.planText") },
              { href: `/voyage/sejours?pays=${cc}`, icon: "bed" as const, title: t("voy.home.staysTitle"), text: t("voy.home.staysText") },
              { href: "/voyage/reservations", icon: "calendarCheck" as const, title: t("voy.home.bookingsTitle"), text: t("voy.home.bookingsText") },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 hover:shadow-card transition text-ink hover:text-ink flex gap-3 min-w-0">
                <span className="h-10 w-10 rounded-xl bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center shrink-0">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{c.title}</span>
                  <span className="block text-sm text-ink-muted">{c.text}</span>
                </span>
              </Link>
            ))}
          </section>

          {/* ── Destinations ── */}
          {data.destinations.length > 0 && (
            <section>
              <h2 className="font-display text-2xl sm:text-3xl mb-1">{t("voy.home.destinations")}</h2>
              <p className="text-ink-muted mb-5">{t("voy.home.destinationsSub", { country: countryName(cc) })}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.destinations.map((d) => (
                  <DestinationTile key={d.id} d={d} />
                ))}
              </div>
            </section>
          )}

          {/* ── Circuits ── */}
          {data.circuits.length > 0 && (
            <section>
              <h2 className="font-display text-2xl sm:text-3xl mb-1">{t("voy.home.circuits")}</h2>
              <p className="text-ink-muted mb-5">{t("voy.home.circuitsSub")}</p>
              <div className="grid lg:grid-cols-2 gap-4">
                {data.circuits.map((c) => (
                  <CircuitTile key={c.id} c={c} />
                ))}
              </div>
            </section>
          )}

          {/* ── Fêtes et événements à venir ── */}
          {events && events.events.length > 0 && (
            <section>
              <div className="flex items-end justify-between gap-3 flex-wrap mb-5">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl mb-1">{t("voy.home.events")}</h2>
                  <p className="text-ink-muted">{t("voy.home.eventsSub", { country: countryName(cc) })}</p>
                </div>
                <Link href={`/voyage/fetes?pays=${cc}`} className="text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline inline-flex items-center gap-1">
                  {t("voy.home.eventsAll", { count: events.events.length })} <Icon name="arrowRight" size={14} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.events
                  .filter((e) => !e.occurrences[0]?.period)
                  .slice(0, 6)
                  .map((e) => (
                    <EventTile key={e.id} e={e} />
                  ))}
              </div>
            </section>
          )}

          {/* ── Lieux à voir ── */}
          <section>
            <h2 className="font-display text-2xl sm:text-3xl mb-4">{t("voy.home.places")}</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0" role="group" aria-label={t("voy.home.categories")}>
              <CategoryChip active={!category} onClick={() => setCategory("")} icon="sparkles" label={t("voy.home.featured")} />
              {PLACE_CATEGORIES.filter((c) => data.categories.some((x) => x.category === c)).map((c) => (
                <CategoryChip
                  key={c}
                  active={category === c}
                  onClick={() => setCategory(c)}
                  icon={CATEGORY_ICON[c]}
                  label={`${t(`voy.cat.${c}`)} (${data.categories.find((x) => x.category === c)?.count ?? 0})`}
                />
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shown.map((p) => (
                <PlaceTile key={p.id} p={p} action={<AddToTripButton place={p} country={cc} />} />
              ))}
            </div>
          </section>

          {/* ── Infos pratiques ── */}
          {data.guide && data.guide.sections.length > 0 && (
            <section id="infos">
              <h2 className="font-display text-2xl sm:text-3xl mb-1">{t("voy.home.practical")}</h2>
              <p className="text-ink-muted mb-5 text-sm">{t("voy.home.practicalWarn")}</p>
              <div className="grid md:grid-cols-2 gap-3">
                {data.guide.sections.map((s) => (
                  <details key={s.title} className="group rounded-2xl border border-border bg-surface p-4 open:shadow-card">
                    <summary className="cursor-pointer font-semibold flex items-center justify-between gap-2 list-none">
                      {s.title}
                      <Icon name="chevronRight" size={16} className="transition-transform group-open:rotate-90 shrink-0" />
                    </summary>
                    <p className="text-sm text-ink-muted mt-3 whitespace-pre-line leading-relaxed">{s.body}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function CategoryChip({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: Parameters<typeof Icon>[0]["name"]; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 inline-flex items-center gap-1.5 h-9 px-3 rounded-full border text-sm transition ${
        active ? "bg-brand-600 border-brand-600 text-white" : "bg-surface border-border hover:border-brand-400"
      }`}
    >
      <Icon name={icon} size={14} />
      {label}
    </button>
  );
}

export default function VoyagePage() {
  return (
    <React.Suspense fallback={<p className="text-ink-muted">{t("com.loading")}</p>}>
      <VoyageHome />
    </React.Suspense>
  );
}
