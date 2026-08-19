"use client";

import * as React from "react";
import Link from "next/link";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth-context";

type Counts = {
  inquiries: number;
  visits: number;
  rents: number;
  tickets: number;
  unread: number;
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
            : 0,
        visits:
          vis.status === "fulfilled"
            ? vis.value.filter((v) => v.status === "REQUESTED").length
            : 0,
        rents:
          rents.status === "fulfilled"
            ? rents.value.filter((r) => r.status === "DECLARED").length
            : 0,
        tickets:
          tick.status === "fulfilled"
            ? tick.value.filter((t) => t.status !== "RESOLVED").length
            : 0,
        unread: unread.status === "fulfilled" ? unread.value.count : 0,
      });
    });
  }, [user]);

  const tiles = [
    { href: "/dashboard/inquiries", icon: "📨", label: "Demandes", count: counts?.inquiries, hint: "à traiter" },
    { href: "/dashboard/visites", icon: "📅", label: "Visites", count: counts?.visits, hint: "à confirmer" },
    { href: "/dashboard/loyers", icon: "💶", label: "Loyers", count: counts?.rents, hint: "à valider" },
    { href: "/dashboard/tickets", icon: "🔧", label: "Incidents", count: counts?.tickets, hint: "ouverts" },
    { href: "/dashboard/messages", icon: "💬", label: "Messages", count: counts?.unread, hint: "non lus" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
      {tiles.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className="group rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 transition-colors"
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
            {t.count != null && t.count > 0 ? `${t.count} ${t.hint}` : "rien à traiter"}
          </p>
        </Link>
      ))}
    </div>
  );
}
