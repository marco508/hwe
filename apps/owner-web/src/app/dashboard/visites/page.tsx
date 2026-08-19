"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Input, EmptyState } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import type { Visit, VisitStatus } from "@hwe/types";
import { VISIT_STATUS_LABELS } from "@hwe/types";

const TONE: Record<VisitStatus, "accent" | "success" | "danger" | "neutral"> = {
  REQUESTED: "accent",
  CONFIRMED: "success",
  DECLINED: "neutral",
  CANCELLED: "neutral",
};

function fmtSlot(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} à ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
}

function VisitCard({ visit, onUpdate }: { visit: Visit; onUpdate: (v: Visit) => void }) {
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const answer = async (status: "CONFIRMED" | "DECLINED") => {
    setBusy(true);
    try {
      onUpdate(await api.answerVisit(visit.id, { status, ownerNote: note || undefined }));
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
            <span className="font-semibold">{fmtSlot(visit.proposedAt)}</span>
            <Badge tone={TONE[visit.status]}>{VISIT_STATUS_LABELS[visit.status]}</Badge>
          </div>
          <p className="text-sm text-ink-muted">
            {visit.property?.title} — {visit.property?.addressLine}, {visit.property?.city}
          </p>
          <p className="text-sm mt-1">
            {visit.requester
              ? `${visit.requester.firstName} ${visit.requester.lastName} · ${visit.requester.email}${visit.requester.phone ? ` · ${visit.requester.phone}` : ""}`
              : ""}
          </p>
          {visit.note && <p className="text-sm text-ink-muted mt-1">« {visit.note} »</p>}
          {visit.ownerNote && (
            <p className="text-sm text-ink-muted mt-1">Votre réponse : {visit.ownerNote}</p>
          )}
        </div>
      </div>

      {visit.status === "REQUESTED" && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Input
            className="flex-1 min-w-[12rem]"
            placeholder="Message (autre créneau, code d'accès…)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button size="sm" disabled={busy} onClick={() => answer("CONFIRMED")}>
            Confirmer
          </Button>
          <Button size="sm" variant="secondary" disabled={busy} onClick={() => answer("DECLINED")}>
            Refuser
          </Button>
        </div>
      )}
    </div>
  );
}

export default function VisitesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [visits, setVisits] = React.useState<Visit[] | null>(null);
  const [filter, setFilter] = React.useState<VisitStatus | "ALL">("REQUESTED");

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  React.useEffect(() => {
    if (!user) return;
    api.ownerVisits().then(setVisits).catch(() => setVisits([]));
  }, [user]);

  if (loading || visits === null) return <p className="text-ink-muted">Chargement…</p>;

  const shown = filter === "ALL" ? visits : visits.filter((v) => v.status === filter);

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">Visites</h1>
      <p className="text-ink-muted mb-6">
        Les créneaux proposés par les candidats — confirmez ou proposez autre chose.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["REQUESTED", "CONFIRMED", "ALL"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f
                ? "bg-brand-600 text-white border-brand-600"
                : "border-ink-subtle text-ink-muted hover:border-brand-400"
            }`}
          >
            {f === "ALL" ? "Toutes" : VISIT_STATUS_LABELS[f]}
            {f !== "ALL" && ` (${visits.filter((v) => v.status === f).length})`}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState title="Aucune visite" description="Rien à traiter pour l'instant." />
      ) : (
        <div className="space-y-4">
          {shown.map((v) => (
            <VisitCard
              key={v.id}
              visit={v}
              onUpdate={(u) =>
                setVisits((arr) => (arr ?? []).map((x) => (x.id === u.id ? { ...x, ...u } : x)))
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
