"use client";

import * as React from "react";
import Link from "next/link";
import { Icon, fmtDate, fmtMoney, intlLocale, type IconName } from "@hwe/ui";
import type { User } from "@hwe/types";
import { api } from "../lib/api";
import { t } from "../lib/i18n";

interface TodoItem {
  key: string;
  href: string;
  icon: IconName;
  text: string;
  /** Urgent (retard) : mis en avant. */
  urgent?: boolean;
}

/** Réponses récentes à des candidatures : 14 derniers jours. */
const RECENT_MS = 14 * 86400000;

/** Valeur d'une promesse réglée, ou repli si elle a échoué (erreurs silencieuses). */
function ok<T>(r: PromiseSettledResult<T>, fallback: T): T {
  return r.status === "fulfilled" ? r.value : fallback;
}

/**
 * Ce qui attend le locataire / voyageur, en tête de l'accueil connecté :
 * loyer à payer, bail / avenant / état des lieux à signer, visites
 * confirmées, réponses à des candidatures, réservation à payer ou avis à
 * laisser, messages non lus. Chargement non bloquant (le catalogue
 * s'affiche sans attendre), erreurs silencieuses, seulement ce qui existe.
 */
export function HomeTodo({ user }: { user: User }) {
  const [items, setItems] = React.useState<TodoItem[] | null>(null);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      const [rentsR, leasesR, visitsR, inquiriesR, bookingsR, unreadR] = await Promise.allSettled([
        api.myRents(),
        api.myLeases(),
        api.myVisits(),
        api.inquiriesSent(),
        api.myBookings(),
        api.unreadMessagesCount(),
      ]);
      const out: TodoItem[] = [];
      const now = Date.now();

      // 1. Loyer : prochaine échéance à régler, tous baux confondus.
      const due = ok(rentsR, [])
        .flatMap((b) => b.periods.map((p) => ({ p, currency: p.currency || b.lease.currency || "EUR" })))
        .filter(({ p }) => p.status === "DUE" || p.status === "LATE")
        .sort((a, b) => +new Date(a.p.dueDate) - +new Date(b.p.dueDate))[0];
      if (due) {
        const late = due.p.status === "LATE" || +new Date(due.p.dueDate) < now;
        const params = {
          period: due.p.periodLabel,
          amount: fmtMoney(due.p.amountDue ?? due.p.amount, due.currency),
          date: fmtDate(due.p.dueDate),
        };
        out.push({
          key: "rent",
          href: "/mes-loyers",
          icon: "wallet",
          text: late ? t("todo.rentLate", params) : t("todo.rentDue", params),
          urgent: late,
        });
      }

      // 2. Signatures : bail, colocation, avenants, états des lieux.
      const me = user.email.trim().toLowerCase();
      const leases = ok(leasesR, []).filter((l) => l.status !== "EXPIRED" && l.status !== "TERMINATED");
      let toSign = 0;
      for (const l of leases) {
        const primary = l.tenantEmail.trim().toLowerCase() === me;
        if (primary && !l.tenantSignedAt) toSign++;
        if ((l.coTenants ?? []).some((c) => c.email.trim().toLowerCase() === me && !c.signedAt)) toSign++;
      }
      const extras = await Promise.allSettled(
        leases
          .filter((l) => l.status === "ACTIVE" || l.status === "SIGNED")
          .flatMap((l) => [
            api.listInspections(l.id).then((list) => list.filter((i) => !i.tenantSignedAt).length),
            l.tenantEmail.trim().toLowerCase() === me
              ? (l.amendments ? Promise.resolve(l.amendments) : api.listAmendments(l.id)).then(
                  (list) => list.filter((a) => !a.tenantSignedAt).length,
                )
              : Promise.resolve(0),
          ]),
      );
      toSign += extras.reduce((s, r) => s + ok(r, 0), 0);
      if (toSign > 0) {
        out.push({ key: "sign", href: "/ma-location", icon: "signature", text: t("todo.toSign", { count: toSign }) });
      }

      // 3. Visites confirmées à venir.
      const visits = ok(visitsR, [])
        .filter((v) => v.status === "CONFIRMED" && +new Date(v.proposedAt) > now)
        .sort((a, b) => +new Date(a.proposedAt) - +new Date(b.proposedAt));
      if (visits[0]) {
        const d = new Date(visits[0].proposedAt);
        out.push({
          key: "visits",
          href: "/mes-visites",
          icon: "calendarCheck",
          text: t("todo.visits", {
            count: visits.length,
            date: d.toLocaleDateString(intlLocale(), { weekday: "long", day: "numeric", month: "long" }),
            time: d.toLocaleTimeString(intlLocale(), { hour: "2-digit", minute: "2-digit" }),
          }),
        });
      }

      // 4. Réponses reçues à des candidatures (récentes).
      const answers = ok(inquiriesR, []).filter(
        (i) => (i.status === "ACCEPTED" || i.status === "REJECTED") && i.resolvedAt && now - +new Date(i.resolvedAt) < RECENT_MS,
      );
      if (answers.length > 0) {
        out.push({ key: "answers", href: "/inquiries", icon: "inbox", text: t("todo.answers", { count: answers.length }) });
      }

      // 5. Voyage : réservation acceptée à payer, avis à laisser.
      const bookings = ok(bookingsR, []);
      const toPay = bookings.filter((b) => b.status === "ACCEPTED");
      if (toPay[0]) {
        out.push({
          key: "booking",
          href: "/voyage/reservations",
          icon: "creditCard",
          text: t("todo.bookingToPay", { place: toPay[0].property.title }),
          urgent: true,
        });
      }
      const toReview = bookings.filter((b) => b.status === "COMPLETED" && b.canReview && !b.review);
      if (toReview.length > 0) {
        out.push({ key: "review", href: "/voyage/reservations", icon: "pen", text: t("todo.review", { count: toReview.length }) });
      }

      // 6. Messages non lus.
      const unread = ok(unreadR, { count: 0 }).count;
      if (unread > 0) {
        out.push({ key: "messages", href: "/messages", icon: "messages", text: t("todo.unread", { count: unread }) });
      }

      if (alive) setItems(out);
    })();
    return () => {
      alive = false;
    };
  }, [user.id, user.email]);

  // Pendant le chargement : rien (le catalogue n'attend pas).
  if (items === null) return null;
  if (items.length === 0) {
    return (
      <p className="mb-8 text-sm text-ink-muted inline-flex items-center gap-1.5">
        <Icon name="checkCircle" size={16} className="text-success" />
        {t("todo.none")}
      </p>
    );
  }

  return (
    <section aria-labelledby="home-todo" className="mb-8 rounded-2xl border border-border bg-surface p-3 sm:p-4">
      <h2 id="home-todo" className="px-1 mb-2 text-xs font-semibold text-ink-muted uppercase tracking-wide">
        {t("todo.title")}
      </h2>
      <ul className="divide-y divide-border/70">
        {items.map((it) => (
          <li key={it.key}>
            <Link
              href={it.href}
              className="group flex items-center gap-3 px-1 py-2.5 min-w-0 rounded-lg hover:bg-cream-100 dark:hover:bg-white/[0.04]"
            >
              <span
                className={`h-8 w-8 shrink-0 rounded-full inline-flex items-center justify-center ${
                  it.urgent
                    ? "bg-danger/10 text-danger"
                    : "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                }`}
              >
                <Icon name={it.icon} size={16} />
              </span>
              <span className={`flex-1 min-w-0 text-sm [overflow-wrap:anywhere] ${it.urgent ? "text-ink font-medium" : "text-ink"}`}>
                {it.text}
              </span>
              <Icon name="chevronRight" size={16} className="shrink-0 text-ink-muted group-hover:text-ink" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
