"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, EmptyState, ErrorState, Icon, Input, Label, Select, toast, useAsync, useLoginRedirect } from "@hwe/ui";
import { VOYAGE_COUNTRIES, VOYAGE_DEFAULT_COUNTRY, type TripSummary } from "@hwe/types";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { useAuth } from "../../../lib/auth-context";
import { Dialog, VoyageCrumbs, countryName, fmtDay, isoIn } from "../../../components/voyage/VoyageKit";

export default function MyTripsPage() {
  const auth = useAuth();
  const router = useRouter();
  useLoginRedirect(auth, router);
  const { data: trips, error, reload } = useAsync<TripSummary[]>(() => api.trips(), [auth.user?.id], { enabled: !!auth.user });
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [country, setCountry] = React.useState(VOYAGE_DEFAULT_COUNTRY);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [days, setDays] = React.useState(5);
  const [travelers, setTravelers] = React.useState(2);
  const [busy, setBusy] = React.useState(false);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (start && end && end < start) {
      toast.error(t("voy.trip.badDates"));
      return;
    }
    setBusy(true);
    try {
      const trip = await api.createTrip({
        title: title.trim() || t("voy.trip.defaultTitle", { country: countryName(country) }),
        country,
        startDate: start || null,
        endDate: start ? end || null : null,
        dayCount: days,
        travelers,
      });
      router.push(`/voyage/mes-voyages/${trip.id}`);
    } catch (err) {
      toast.error(err);
      setBusy(false);
    }
  };

  if (error && !trips) return <ErrorState error={error} onRetry={reload} />;
  if (auth.loading || !trips) return <p className="text-ink-muted">{t("com.loading")}</p>;

  return (
    <section className="space-y-6 pb-12 min-w-0">
      <VoyageCrumbs items={[{ href: "/voyage", label: t("voy.crumb.home") }, { label: t("voy.trips.title") }]} />
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl">{t("voy.trips.title")}</h1>
          <p className="text-ink-muted">{t("voy.trips.sub")}</p>
        </div>
        <Button variant="gradient" className="gap-2" onClick={() => setOpen(true)}>
          <Icon name="plus" size={16} /> {t("voy.trips.new")}
        </Button>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          illustration="calendar"
          title={t("voy.trips.emptyTitle")}
          description={t("voy.trips.emptyDesc")}
          action={
            <Link href="/voyage" className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
              {t("voy.trips.explore")}
            </Link>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((tr) => (
            <Link key={tr.id} href={`/voyage/mes-voyages/${tr.id}`} className="rounded-2xl border border-border bg-surface p-5 hover:border-brand-400 hover:shadow-card transition text-ink hover:text-ink min-w-0">
              <div className="text-xs uppercase tracking-[0.12em] text-ink-muted">{countryName(tr.country)}</div>
              <div className="font-display text-xl mt-1 [overflow-wrap:anywhere]">{tr.title}</div>
              <div className="text-sm text-ink-muted mt-2">
                {tr.startDate ? t("voy.trips.dates", { from: fmtDay(tr.startDate), to: fmtDay(tr.endDate) }) : t("voy.trips.undated", { count: tr.dayCount })}
              </div>
              <div className="text-sm text-ink-muted">
                {t("voy.trips.steps", { count: tr.itemCount ?? 0 })} · {t("voy.trips.travelers", { count: tr.travelers })}
              </div>
              {tr.shareToken && <div className="text-xs text-brand-700 dark:text-brand-300 mt-2">{t("voy.trips.shared")}</div>}
            </Link>
          ))}
        </div>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} title={t("voy.trips.new")}>
        <form onSubmit={create} className="space-y-4">
          <div>
            <Label htmlFor="t-title">{t("voy.trip.title")}</Label>
            <Input id="t-title" value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} placeholder={t("voy.trip.defaultTitle", { country: countryName(country) })} />
          </div>
          <div>
            <Label htmlFor="t-country">{t("voy.trip.country")}</Label>
            <Select id="t-country" value={country} onChange={(e) => setCountry(e.target.value)}>
              {VOYAGE_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {countryName(c)}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="t-start">{t("voy.trip.startDate")}</Label>
              <Input id="t-start" type="date" min={isoIn(0)} value={start} onChange={(e) => { setStart(e.target.value); if (e.target.value && (!end || end < e.target.value)) setEnd(isoIn(days - 1, e.target.value)); }} />
            </div>
            <div>
              <Label htmlFor="t-end">{t("voy.trip.endDate")}</Label>
              <Input id="t-end" type="date" min={start || isoIn(0)} value={end} disabled={!start} onChange={(e) => setEnd(e.target.value)} />
            </div>
          </div>
          {!start && (
            <div>
              <Label htmlFor="t-days">{t("voy.trip.dayCount")}</Label>
              <Input id="t-days" type="number" min={1} max={60} value={days} onChange={(e) => setDays(Math.max(1, Math.min(60, Number(e.target.value) || 1)))} />
            </div>
          )}
          <div>
            <Label htmlFor="t-trav">{t("voy.trip.travelers")}</Label>
            <Input id="t-trav" type="number" min={1} max={50} value={travelers} onChange={(e) => setTravelers(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              {t("com.cancel")}
            </Button>
            <Button type="submit" disabled={busy}>
              {t("voy.trips.create")}
            </Button>
          </div>
        </form>
      </Dialog>
    </section>
  );
}
