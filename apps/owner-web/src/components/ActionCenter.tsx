"use client";

import * as React from "react";
import Link from "next/link";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth-context";
import { t as tr } from "../lib/i18n";
import { AgencyLogo, Icon, IconBadge, type IconName } from "@hwe/ui";
import type { Inquiry } from "@hwe/types";

type Alert = { key: string; href: string; text: string; agency: { name: string; logoUrl: string | null } | null };

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
  const [alerts, setAlerts] = React.useState<Alert[]>([]);

  React.useEffect(() => {
    if (!user) return;
    Promise.allSettled([
      api.inquiriesReceived(),
      api.ownerVisits(),
      api.ownerRents(),
      api.ownerTickets(),
      api.unreadMessagesCount(),
      api.listMandates({ status: "PENDING_OWNER" }),
      api.mandateRequests(),
    ]).then(([inq, vis, rents, tick, unread, mand, reqs]) => {
      // Encarts : candidats proposés par l'agence, mandats à accepter.
      const next: Alert[] = [];
      if (inq.status === "fulfilled") {
        const props = inq.value.filter((i: Inquiry) => i.status === "PENDING" && i.proposedAt && !i.ownerDecision);
        if (props.length > 0) {
          const ag = props[0]!.managedBy ?? null;
          const names = [...new Set(props.map((i) => i.managedBy?.name ?? i.proposedBy?.agencyName).filter(Boolean))];
          next.push({
            key: "proposals",
            href: "/dashboard/inquiries?tab=proposed",
            text: tr("pro.alert.proposals", { count: props.length, agency: names.join(", ") }),
            agency: ag ? { name: ag.name, logoUrl: ag.logoUrl } : null,
          });
        }
      }
      const pendingM = (mand.status === "fulfilled" ? mand.value.length : 0) +
        (reqs.status === "fulfilled" ? reqs.value.filter((r) => r.status === "PENDING").length : 0);
      if (pendingM > 0) {
        const first = mand.status === "fulfilled" && mand.value[0] ? mand.value[0].agency : reqs.status === "fulfilled" ? reqs.value.find((r) => r.status === "PENDING")?.agency : undefined;
        next.push({
          key: "mandates",
          href: "/dashboard/mandats",
          text: tr(pendingM > 1 ? "pro.alert.mandatesN" : "pro.alert.mandates1", { count: pendingM, agency: first?.name ?? "" }),
          agency: first ? { name: first.name, logoUrl: first.logoUrl } : null,
        });
      }
      setAlerts(next);
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
    { href: "/dashboard/inquiries", icon: "inbox" as IconName, tone: "brand" as const, label: tr("action.requests"), count: counts?.inquiries, hint: tr("action.requestsHint") },
    { href: "/dashboard/visites", icon: "calendar" as IconName, tone: "ocean" as const, label: tr("action.visits"), count: counts?.visits, hint: tr("action.visitsHint") },
    { href: "/dashboard/loyers", icon: "wallet" as IconName, tone: "accent" as const, label: tr("action.rents"), count: counts?.rents, hint: tr("action.rentsHint") },
    { href: "/dashboard/tickets", icon: "wrench" as IconName, tone: "neutral" as const, label: tr("action.tickets"), count: counts?.tickets, hint: tr("action.ticketsHint") },
    { href: "/dashboard/messages", icon: "messages" as IconName, tone: "brand" as const, label: tr("action.messages"), count: counts?.unread, hint: tr("action.messagesHint") },
  ];

  return (
    <>
    {alerts.length > 0 && (
      <div className="space-y-3 mb-6">
        {alerts.map((a) => (
          <Link
            key={a.key}
            href={a.href}
            data-alert={a.key}
            className="flex items-center gap-3 rounded-2xl border border-accent-300 bg-accent-50/70 dark:border-accent-700/50 dark:bg-accent-700/15 p-4 text-ink hover:shadow-card transition"
          >
            {a.agency ? <AgencyLogo name={a.agency.name} logoUrl={a.agency.logoUrl} size="sm" /> : <IconBadge name="bell" tone="accent" size="sm" />}
            <span className="flex-1 min-w-0 font-medium [overflow-wrap:anywhere]">{a.text}</span>
            <Icon name="arrowRight" size={18} className="shrink-0 text-accent-600 dark:text-accent-300" />
          </Link>
        ))}
      </div>
    )}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
      {tiles.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className="group min-w-0 rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 hover:shadow-card transition text-ink"
        >
          <div className="flex items-center justify-between">
            <IconBadge name={t.icon} tone={t.tone} />
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
    </>
  );
}
