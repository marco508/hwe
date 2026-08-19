"use client";

import * as React from "react";
import { Badge, Button, Input, Label, Textarea } from "@hwe/ui";
import { api } from "../lib/api";
import type { Inspection, InspectionType, LeaseContract, Ticket, TicketStatus } from "@hwe/types";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR");
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

const TYPE_LABEL: Record<InspectionType, string> = { ENTRY: "Entrée", EXIT: "Sortie" };

const TICKET_TONE: Record<TicketStatus, "neutral" | "accent" | "success"> = {
  OPEN: "accent",
  IN_PROGRESS: "neutral",
  RESOLVED: "success",
};

const TICKET_LABEL: Record<TicketStatus, string> = {
  OPEN: "Ouvert",
  IN_PROGRESS: "En cours",
  RESOLVED: "Résolu",
};

// ─── Caution (lecture seule côté locataire) ────────────────────────────────

function DepositInfo({ lease }: { lease: LeaseContract }) {
  if (lease.depositReturnedAt) {
    return (
      <p className="text-sm">
        Restituée le <strong>{fmtDate(lease.depositReturnedAt)}</strong>
        {lease.depositRetained ? (
          <span>
            {" "}— retenue : <strong>{fmtMoney(lease.depositRetained)}</strong>
            {lease.depositNote ? ` (${lease.depositNote})` : ""}
          </span>
        ) : (
          <span> — sans retenue</span>
        )}
      </p>
    );
  }
  if (lease.depositPaidAt) {
    return (
      <p className="text-sm">
        Versée le <strong>{fmtDate(lease.depositPaidAt)}</strong> ({fmtMoney(lease.deposit)})
      </p>
    );
  }
  return (
    <p className="text-sm text-ink-muted">
      {fmtMoney(lease.deposit)} — pas encore marquée comme versée par le propriétaire.
    </p>
  );
}

// ─── État des lieux : consultation + signature ─────────────────────────────

function InspectionView({
  leaseId,
  inspection,
  onChange,
}: {
  leaseId: string;
  inspection: Inspection;
  onChange: (i: Inspection) => void;
}) {
  const [openDetail, setOpenDetail] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  const sign = async () => {
    if (!confirm("Vous signez électroniquement cet état des lieux. Confirmez-vous ?")) return;
    setBusy(true);
    try {
      onChange(await api.signInspection(leaseId, inspection.type));
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="text-sm space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium w-16">{TYPE_LABEL[inspection.type]}</span>
        <span>{fmtDate(inspection.date)}</span>
        <span title="Propriétaire">{inspection.ownerSignedAt ? "✅" : "⏳"} prop.</span>
        <span title="Vous">{inspection.tenantSignedAt ? "✅" : "⏳"} vous</span>
        <button
          className="underline text-ink-muted"
          onClick={() => setOpenDetail((o) => !o)}
        >
          {openDetail ? "Masquer" : "Détail"}
        </button>
        {!inspection.tenantSignedAt && (
          <Button size="sm" disabled={busy} onClick={sign}>
            Signer
          </Button>
        )}
      </div>
      {openDetail && (
        <div className="rounded-lg border border-border bg-brand-50/60 dark:bg-brand-900/20 p-3 space-y-2">
          {(inspection.items ?? []).length > 0 && (
            <ul className="space-y-1">
              {(inspection.items ?? []).map((it, i) => (
                <li key={i}>
                  <strong>{it.label}</strong> — {it.condition}
                  {it.note ? <span className="text-ink-muted"> · {it.note}</span> : null}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-4 text-ink-muted">
            {inspection.meterElectricity && <span>⚡ {inspection.meterElectricity}</span>}
            {inspection.meterWater && <span>💧 {inspection.meterWater}</span>}
            {inspection.meterGas && <span>🔥 {inspection.meterGas}</span>}
            {inspection.keysCount != null && <span>🔑 {inspection.keysCount} clé{inspection.keysCount > 1 ? "s" : ""}</span>}
          </div>
          {inspection.generalNote && (
            <p className="whitespace-pre-line">{inspection.generalNote}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Incidents ──────────────────────────────────────────────────────────────

function TicketForm({
  leaseId,
  onCreated,
}: {
  leaseId: string;
  onCreated: (t: Ticket) => void;
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [photo, setPhoto] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      alert("La photo dépasse 8 Mo — compressez-la avant l'envoi.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const t = await api.createTicket(leaseId, {
        title,
        description,
        photoDataUrl: photo ?? undefined,
      });
      onCreated(t);
      setTitle("");
      setDescription("");
      setPhoto(null);
    } catch (err) {
      alert("Erreur : " + (err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-w-lg">
      <div>
        <Label htmlFor={`tt-${leaseId}`}>Problème</Label>
        <Input
          id={`tt-${leaseId}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex : fuite sous l'évier"
          required
          minLength={3}
        />
      </div>
      <div>
        <Label htmlFor={`td-${leaseId}`}>Description</Label>
        <Textarea
          id={`td-${leaseId}`}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={3}
        />
      </div>
      <div>
        <Label htmlFor={`tp-${leaseId}`}>Photo (optionnelle)</Label>
        <input
          id={`tp-${leaseId}`}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFile}
          className="block text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={busy}>
        {busy ? "Envoi…" : "Signaler"}
      </Button>
    </form>
  );
}

// ─── Bloc combiné, monté dans la carte de bail ─────────────────────────────

export function LeaseTenantExtras({ lease }: { lease: LeaseContract }) {
  const [inspections, setInspections] = React.useState<Inspection[] | null>(null);
  const [tickets, setTickets] = React.useState<Ticket[] | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    api.listInspections(lease.id).then(setInspections).catch(() => setInspections([]));
    api
      .myTickets()
      .then((all) => setTickets(all.filter((t) => t.leaseId === lease.id)))
      .catch(() => setTickets([]));
  }, [lease.id]);

  const upsertInspection = (i: Inspection) =>
    setInspections((arr) => {
      const rest = (arr ?? []).filter((x) => x.type !== i.type);
      return [...rest, i].sort((a, b) => a.type.localeCompare(b.type));
    });

  return (
    <>
      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          Caution
        </h3>
        <DepositInfo lease={lease} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          États des lieux
        </h3>
        {inspections === null ? (
          <p className="text-sm text-ink-muted">Chargement…</p>
        ) : inspections.length === 0 ? (
          <p className="text-sm text-ink-muted">
            Aucun pour l'instant — le propriétaire les rédige, vous les signez ici.
          </p>
        ) : (
          <div className="space-y-3">
            {inspections.map((i) => (
              <InspectionView
                key={i.id}
                leaseId={lease.id}
                inspection={i}
                onChange={upsertInspection}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Incidents
          </h3>
          <Button size="sm" variant="secondary" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Fermer" : "Signaler un incident"}
          </Button>
        </div>
        {showForm && (
          <div className="mb-4">
            <TicketForm
              leaseId={lease.id}
              onCreated={(t) => {
                setTickets((arr) => [t, ...(arr ?? [])]);
                setShowForm(false);
              }}
            />
          </div>
        )}
        {tickets === null ? (
          <p className="text-sm text-ink-muted">Chargement…</p>
        ) : tickets.length === 0 ? (
          <p className="text-sm text-ink-muted">Aucun incident signalé.</p>
        ) : (
          <ul className="space-y-2">
            {tickets.map((t) => (
              <li key={t.id} className="text-sm flex flex-wrap items-center gap-2">
                <Badge tone={TICKET_TONE[t.status]}>{TICKET_LABEL[t.status]}</Badge>
                <span className="font-medium">{t.title}</span>
                <span className="text-ink-muted">· {fmtDate(t.createdAt)}</span>
                {t.status === "RESOLVED" && t.resolutionNote && (
                  <span className="text-ink-muted">— {t.resolutionNote}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
