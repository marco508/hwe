"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge, Button, Icon, Input, EmptyState, ErrorState, SafeImage, toast, fmtDate as fmtDateShared, useAsync } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { isPro, useActorLabel } from "../../../lib/pro";
import { refreshNavCounts, useBienParam, useChatFinder } from "../../../lib/nav";
import type { Ticket, TicketStatus } from "@hwe/types";

const TONE: Record<TicketStatus, "accent" | "neutral" | "success"> = {
  OPEN: "accent",
  IN_PROGRESS: "neutral",
  RESOLVED: "success",
};

const fmtDate = (iso: string) => fmtDateShared(iso, "short", { utc: false });

function TicketCard({
  ticket,
  onUpdate,
  actor,
  chatHref,
}: {
  ticket: Ticket;
  onUpdate: (t: Ticket) => void;
  actor?: string | null;
  /** Conversation avec le locataire, si elle existe. */
  chatHref?: string | null;
}) {
  const { user } = useAuth();
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [showPhoto, setShowPhoto] = React.useState(false);

  const move = async (status: "IN_PROGRESS" | "RESOLVED") => {
    setBusy(true);
    try {
      onUpdate(await api.reviewTicket(ticket.id, {
        status,
        resolutionNote: status === "RESOLVED" && note ? note : undefined,
      }));
      toast.success(t("ops.tickets.updated"));
      void refreshNavCounts(user);
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6 shadow-sm space-y-3 min-w-0">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-semibold [overflow-wrap:anywhere] min-w-0">{ticket.title}</span>
            <Badge tone={TONE[ticket.status]}>{t("ops.ticketStatus." + ticket.status)}</Badge>
          </div>
          <p className="text-sm text-ink-muted [overflow-wrap:anywhere]">
            {ticket.lease?.property ? (
              <Link href={`/dashboard/${encodeURIComponent(ticket.lease.property.id)}`} className="font-medium text-ink hover:underline">
                {ticket.lease.property.title}
              </Link>
            ) : null}
            {ticket.lease?.property?.city ? ` — ${ticket.lease.property.city}` : ""} ·{" "}
            {ticket.author
              ? `${ticket.author.firstName} ${ticket.author.lastName}`
              : `${ticket.lease?.tenantFirstName ?? ""} ${ticket.lease?.tenantLastName ?? ""}`}{" "}
            · {fmtDate(ticket.createdAt)}
          </p>
        </div>
        {chatHref && (
          <Link
            href={chatHref}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium text-ink border border-border bg-surface hover:border-ink/30 shrink-0"
          >
            <Icon name="message" size={15} /> {t("com.discuss")}
          </Link>
        )}
      </div>

      <p className="text-sm whitespace-pre-line [overflow-wrap:anywhere]">{ticket.description}</p>

      {ticket.photoDataUrl && (
        <div>
          <button
            type="button"
            aria-expanded={showPhoto}
            className="text-sm underline text-ink-muted"
            onClick={() => setShowPhoto((s) => !s)}
          >
            {showPhoto ? t("ops.tickets.hidePhoto") : t("ops.tickets.showPhoto")}
          </button>
          {showPhoto && (
            <SafeImage
              src={ticket.photoDataUrl}
              alt={t("ops.tickets.photoAlt")}
              className="mt-2 max-h-80 max-w-full rounded-xl border border-border"
              fallbackClassName="mt-2 h-24 w-40 rounded-xl border border-border"
            />
          )}
        </div>
      )}

      {ticket.status === "RESOLVED" ? (
        <p className="text-sm text-ink-muted [overflow-wrap:anywhere]">
          {t("ops.tickets.resolvedOn")} {ticket.resolvedAt ? fmtDate(ticket.resolvedAt) : "—"}
          {ticket.resolutionNote ? ` — ${ticket.resolutionNote}` : ""}
          {actor ? ` · ${actor}` : ""}
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {ticket.status === "OPEN" && (
            <Button size="sm" variant="secondary" disabled={busy} onClick={() => move("IN_PROGRESS")}>
              {t("ops.tickets.takeOver")}
            </Button>
          )}
          <Input
            className="flex-1 min-w-0 sm:min-w-[12rem]"
            aria-label={t("ops.tickets.notePlaceholder")}
            placeholder={t("ops.tickets.notePlaceholder")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button size="sm" disabled={busy} onClick={() => move("RESOLVED")}>
            {t("ops.tickets.markResolved")}
          </Button>
        </div>
      )}
    </div>
  );
}

type Filter = TicketStatus | "ALL" | "TODO";
const isTodo = (x: Ticket) => x.status !== "RESOLVED";

export default function TicketsPage() {
  // useSearchParams (filtre ?bien=, ?filtre=todo) exige une frontière Suspense.
  return (
    <React.Suspense fallback={null}>
      <TicketsInner />
    </React.Suspense>
  );
}

function TicketsInner() {
  // Session/rôle : dashboard/layout.tsx. Erreur ≠ liste vide (L2).
  const { user } = useAuth();
  const pro = isPro(user);
  const bien = useBienParam();
  const search = useSearchParams();
  const chatFor = useChatFinder();
  const actorLabel = useActorLabel();
  // « À traiter » (ouverts + en cours) depuis le centre d'actions.
  const [filter, setFilter] = React.useState<Filter>(search.get("filtre") === "todo" ? "TODO" : "ALL");
  const { data, setData: setTickets, error, reload } = useAsync(
    () => api.ownerTickets(),
    [user?.id],
    { enabled: !!user },
  );

  if (error && !data) return <ErrorState error={error} title={t("ops.tickets.loadError")} onRetry={reload} />;
  if (!data) return <p className="text-ink-muted">{t("ops.loading")}</p>;
  // Filtre « par bien » (?bien=<id>), côté client.
  const tickets = data.filter((x) => !bien || x.lease?.property?.id === bien);

  const shown = filter === "ALL" ? tickets : filter === "TODO" ? tickets.filter(isTodo) : tickets.filter((t) => t.status === filter);

  return (
    <section className="min-w-0">
      <h1 className="font-display text-3xl mb-2">{t("ops.tickets.title")}</h1>
      <p className="text-ink-muted mb-6">
        {t("ops.tickets.sub")}
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["ALL", "TODO", "OPEN", "IN_PROGRESS", "RESOLVED"] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f
                ? "bg-brand-600 text-white border-brand-600"
                : "border-ink-subtle text-ink-muted hover:border-brand-400"
            }`}
          >
            {f === "ALL" ? t("ops.tickets.filterAll") : f === "TODO" ? t("ops.tickets.filterTodo") : t("ops.ticketStatus." + f)}
            {f !== "ALL" && ` (${(f === "TODO" ? tickets.filter(isTodo) : tickets.filter((t) => t.status === f)).length})`}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          illustration="tools"
          title={t("ops.tickets.emptyTitle")}
          description={t("ops.emptyDesc")}
          action={
            <Link href={bien ? `/dashboard/${encodeURIComponent(bien)}` : pro ? "/pro" : "/dashboard"} className="text-sm font-medium">
              {bien ? t("prop.backToProperty") : t("vis.backDashboard")}
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {shown.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
              actor={actorLabel(t.handledById, t.lease?.property?.id)}
              chatHref={chatFor(t.lease?.property?.id, t.authorId)}
              onUpdate={(u) =>
                setTickets((arr) => (arr ?? []).map((x) => (x.id === u.id ? { ...x, ...u } : x)))
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
