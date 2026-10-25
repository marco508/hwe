"use client";

import * as React from "react";
import Link from "next/link";
import { Badge, EmptyState, ErrorState, Icon, useAsync } from "@hwe/ui";
import type { Booking, HostStayProperty } from "@hwe/types";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { HostBookingCard } from "../../../components/stays/StaysKit";

type Tab = "requests" | "upcoming" | "history";

export default function StaysDashboardPage() {
  const { data: props, error: pErr, reload: pReload } = useAsync<HostStayProperty[]>(() => api.stayProperties(), []);
  const { data: bookings, setData, error, reload } = useAsync<Booking[]>(() => api.stayBookings(), []);
  const [tab, setTab] = React.useState<Tab>("requests");
  const [propertyId, setPropertyId] = React.useState("");

  const update = (b: Booking) => {
    setData((arr) => (arr ?? []).map((x) => (x.id === b.id ? { ...x, ...b } : x)));
    // Une acceptation peut refuser d'autres demandes sur les mêmes dates.
    if (b.status === "ACCEPTED" || b.status === "CONFIRMED") void reload();
  };

  if ((error && !bookings) || (pErr && !props)) return <ErrorState error={error ?? pErr} onRetry={() => { reload(); pReload(); }} />;
  if (!bookings || !props) return <p className="text-ink-muted">{t("com.loading")}</p>;

  const today = new Date().toISOString().slice(0, 10);
  const list = bookings.filter((b) => !propertyId || b.propertyId === propertyId);
  const groups: Record<Tab, Booking[]> = {
    requests: list.filter((b) => b.status === "REQUESTED"),
    upcoming: list.filter((b) => (b.status === "ACCEPTED" || b.status === "CONFIRMED") && b.checkOut.slice(0, 10) >= today),
    history: list.filter((b) => !["REQUESTED"].includes(b.status) && !((b.status === "ACCEPTED" || b.status === "CONFIRMED") && b.checkOut.slice(0, 10) >= today)).reverse(),
  };
  const shown = groups[tab];

  return (
    <section className="space-y-8 min-w-0">
      <div>
        <h1 className="font-display text-3xl">{t("stays.title")}</h1>
        <p className="text-ink-muted max-w-3xl">{t("stays.sub")}</p>
      </div>

      {/* ── Logements ── */}
      <div>
        <h2 className="font-display text-xl mb-3">{t("stays.properties")}</h2>
        {props.length === 0 ? (
          <p className="text-sm text-ink-muted">{t("stays.noRentProperty")}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {props.map((p) => (
              <Link key={p.id} href={`/dashboard/${p.id}/sejour`} className="rounded-2xl border border-border bg-surface p-3 flex gap-3 hover:border-brand-400 hover:shadow-card transition text-ink hover:text-ink min-w-0">
                <span className="h-16 w-20 rounded-xl overflow-hidden bg-cream-100 dark:bg-white/5 shrink-0">
                  {p.media[0] ? <img src={p.media[0].url} alt="" className="w-full h-full object-cover" /> : null}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium [overflow-wrap:anywhere] line-clamp-2">{p.title}</span>
                  <span className="block text-xs text-ink-muted">{p.city}</span>
                  <span className="flex gap-1 mt-1 flex-wrap">
                    {p.staySettings?.enabled ? <Badge tone="success">{t("stays.open")}</Badge> : <Badge tone="neutral">{t("stays.closed")}</Badge>}
                    {p.pendingRequests > 0 && <Badge tone="accent">{t("stays.pending", { count: p.pendingRequests })}</Badge>}
                    {p.staySettings?.icalError && <Badge tone="danger">{t("stays.icalErrorBadge")}</Badge>}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
        <p className="text-xs text-ink-muted mt-2">{t("stays.propertiesHint")}</p>
      </div>

      {/* ── Réservations ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-2 flex-wrap" role="tablist">
            {(["requests", "upcoming", "history"] as Tab[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`h-9 px-4 rounded-full text-sm border transition ${tab === k ? "bg-brand-600 border-brand-600 text-white" : "bg-surface border-border hover:border-brand-400"}`}
              >
                {t(`stays.tab.${k}`)} ({groups[k].length})
              </button>
            ))}
          </div>
          {props.length > 1 && (
            <select value={propertyId} onChange={(e) => setPropertyId(e.target.value)} className="h-9 rounded-md border border-border bg-surface px-2 text-sm max-w-full" aria-label={t("stays.filterProperty")}>
              <option value="">{t("stays.allProperties")}</option>
              {props.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          )}
        </div>
        {shown.length === 0 ? (
          <EmptyState illustration="calendar" title={t(`stays.empty.${tab}`)} description={t("stays.emptyDesc")} />
        ) : (
          <div className="space-y-3">
            {shown.map((b) => (
              <HostBookingCard key={b.id} b={b} onUpdate={update} />
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-ink-muted flex gap-3">
        <Icon name="info" size={18} className="shrink-0 mt-0.5" />
        <p>{t("stays.paymentNote")}</p>
      </div>
    </section>
  );
}
