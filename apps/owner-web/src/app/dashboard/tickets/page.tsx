"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Input, EmptyState } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import type { Ticket, TicketStatus } from "@hwe/types";

const TONE: Record<TicketStatus, "accent" | "neutral" | "success"> = {
  OPEN: "accent",
  IN_PROGRESS: "neutral",
  RESOLVED: "success",
};

const LABEL: Record<TicketStatus, string> = {
  OPEN: "Ouvert",
  IN_PROGRESS: "En cours",
  RESOLVED: "Résolu",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR");
}

function TicketCard({
  ticket,
  onUpdate,
}: {
  ticket: Ticket;
  onUpdate: (t: Ticket) => void;
}) {
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
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-ink-subtle bg-white p-6 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-semibold">{ticket.title}</span>
            <Badge tone={TONE[ticket.status]}>{LABEL[ticket.status]}</Badge>
          </div>
          <p className="text-sm text-ink-muted">
            {ticket.lease?.property?.title}
            {ticket.lease?.property?.city ? ` — ${ticket.lease.property.city}` : ""} ·{" "}
            {ticket.author
              ? `${ticket.author.firstName} ${ticket.author.lastName}`
              : `${ticket.lease?.tenantFirstName ?? ""} ${ticket.lease?.tenantLastName ?? ""}`}{" "}
            · {fmtDate(ticket.createdAt)}
          </p>
        </div>
      </div>

      <p className="text-sm whitespace-pre-line">{ticket.description}</p>

      {ticket.photoDataUrl && (
        <div>
          <button
            className="text-sm underline text-ink-muted"
            onClick={() => setShowPhoto((s) => !s)}
          >
            {showPhoto ? "Masquer la photo" : "Voir la photo"}
          </button>
          {showPhoto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ticket.photoDataUrl}
              alt="Photo de l'incident"
              className="mt-2 max-h-80 rounded-xl border border-ink-subtle"
            />
          )}
        </div>
      )}

      {ticket.status === "RESOLVED" ? (
        <p className="text-sm text-ink-muted">
          Résolu le {ticket.resolvedAt ? fmtDate(ticket.resolvedAt) : "—"}
          {ticket.resolutionNote ? ` — ${ticket.resolutionNote}` : ""}
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {ticket.status === "OPEN" && (
            <Button size="sm" variant="secondary" disabled={busy} onClick={() => move("IN_PROGRESS")}>
              Prendre en charge
            </Button>
          )}
          <Input
            className="flex-1 min-w-[12rem]"
            placeholder="Note de résolution (optionnelle)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button size="sm" disabled={busy} onClick={() => move("RESOLVED")}>
            Marquer résolu
          </Button>
        </div>
      )}
    </div>
  );
}

export default function TicketsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = React.useState<Ticket[] | null>(null);
  const [filter, setFilter] = React.useState<TicketStatus | "ALL">("ALL");

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  React.useEffect(() => {
    if (!user) return;
    api.ownerTickets().then(setTickets).catch(() => setTickets([]));
  }, [user]);

  if (loading || tickets === null) return <p className="text-ink-muted">Chargement…</p>;

  const shown = filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">Incidents</h1>
      <p className="text-ink-muted mb-6">
        Les problèmes signalés par vos locataires, à traiter ici.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["ALL", "OPEN", "IN_PROGRESS", "RESOLVED"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f
                ? "bg-brand-600 text-white border-brand-600"
                : "border-ink-subtle text-ink-muted hover:border-brand-400"
            }`}
          >
            {f === "ALL" ? "Tous" : LABEL[f]}
            {f !== "ALL" && ` (${tickets.filter((t) => t.status === f).length})`}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          title="Aucun incident"
          description="Rien à traiter pour l'instant."
        />
      ) : (
        <div className="space-y-4">
          {shown.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
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
