"use client";

import * as React from "react";
import Link from "next/link";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth-context";
import { t as tr } from "../lib/i18n";

// null = compteur indisponible (erreur réseau/API) : on ne prétend pas
// « rien à traiter » quand on ne sait pas (L2).
type Counts = {
  inquiries: number | null;
  visits: number | null;
  rents: number | null;
  tickets: number | null;
  unread: number | null;
};

/** Ce qui attend une action du propriétaire, en tête de tableau de bord.
 * Chaque tuile mène à l'écran concerné ; le badge indique le nombre à traiter. */
export function ActionCenter() {
  const { user } = useAuth();
  const [counts, setCounts] = React.useState<Counts | null>(null);

  React.useEffect(() => {
    if (!user) return;
    Promise.allSettled([
      api.inquiriesReceived(),
      api.ownerVisits(),
      api.ownerRents(),
      api.ownerTickets(),
      api.unreadMessagesCount(),
    ]).then(([inq, vis, rents, tick, unread]) => {
      setCounts({
        inquiries:
          inq.status === "fulfilled"
            ? inq.value.filter((i) => i.status === "PENDING").length
            : null,
        visits:
          vis.status === "fulfilled"
            ? vis.value.filter((v) => v.status === "REQUESTED").length
            : null,
        rents:
          rents.status === "fulfilled"
            ? rents.value.filter((r) => r.status === "DECLARED").length
            : null,
        tickets:
          tick.status === "fulfilled"
            ? tick.value.filter((t) => t.status !== "RESOLVED").length
            : null,
        unread: unread.status === "fulfilled" ? unread.value.count : null,
      });
    });
  }, [user]);

  const tiles = [
    { href: "/dashboard/inquiries", icon: "📨", label: tr("action.requests"), count: counts?.inquiries, hint: tr("action.requestsHint") },
    { href: "/dashboard/visites", icon: "📅", label: tr("action.visits"), count: counts?.visits, hint: tr("action.visitsHint") },
    { href: "/dashboard/loyers", icon: "💶", label: tr("action.rents"), count: counts?.rents, hint: tr("action.rentsHint") },
    { href: "/dashboard/tickets", icon: "🔧", label: tr("action.tickets"), count: counts?.tickets, hint: tr("action.ticketsHint") },
    { href: "/dashboard/messages", icon: "💬", label: tr("action.messages"), count: counts?.unread, hint: tr("action.messagesHint") },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
      {tiles.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className="group min-w-0 rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 transition-colors text-ink"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">{t.icon}</span>
            {t.count != null && t.count > 0 && (
              <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full bg-accent-500 text-white text-xs font-semibold">
                {t.count}
              </span>
            )}
          </div>
          <p className="mt-2 font-medium group-hover:text-brand-600 dark:group-hover:text-brand-300">
            {t.label}
          </p>
          <p className="text-xs text-ink-muted">
            {counts && t.count === null
              ? tr("action.unavailable")
              : t.count != null && t.count > 0
                ? `${t.count} ${t.hint}`
                : tr("action.clear")}
          </p>
        </Link>
      ))}
    </div>
  );
}
