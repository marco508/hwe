"use client";

import * as React from "react";
import { Badge, Button, Input, Label, Textarea } from "@hwe/ui";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth-context";
import type {
  Inspection,
  InspectionType,
  LeaseContract,
  Ticket,
  TicketStatus,
  LeaseAmendment,
  InsuranceSummary,
} from "@hwe/types";

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


// ─── Préavis ──────────────────────────────────────────────────────

function NoticeBlock({ lease, onUpdate }: { lease: LeaseContract; onUpdate: (l: LeaseContract) => void }) {
  const [open, setOpen] = React.useState(false);
  const [desired, setDesired] = React.useState("");
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const minDate = React.useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + (lease.noticePeriod ?? 1));
    return d;
  }, [lease.noticePeriod]);

  if (lease.noticeGivenAt) {
    return (
      <p className="text-sm">
        Donné le <strong>{fmtDate(lease.noticeGivenAt)}</strong> — fin de bail le{" "}
        <strong>{lease.noticeEffectiveDate ? fmtDate(lease.noticeEffectiveDate) : "—"}</strong>.
        {lease.noticeNote ? <span className="text-ink-muted"> {lease.noticeNote}</span> : null}
      </p>
    );
  }

  const active = lease.status === "ACTIVE" || lease.status === "SIGNED";
  if (!active) {
    return <p className="text-sm text-ink-muted">Disponible quand le bail est actif.</p>;
  }

  if (!open) {
    return (
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        Donner mon préavis
      </Button>
    );
  }

  const submit = async () => {
    if (!confirm("Vous notifiez officiellement votre départ. Confirmez-vous ?")) return;
    setBusy(true);
    try {
      const updated = await api.giveNotice(lease.id, {
        desiredDate: desired || undefined,
        note: note || undefined,
      });
      onUpdate({ ...lease, ...updated });
      setOpen(false);
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 max-w-lg text-sm">
      <p className="text-ink-muted">
        Préavis contractuel : {lease.noticePeriod} mois — départ au plus tôt le{" "}
        <strong>{minDate.toLocaleDateString("fr-FR")}</strong>. Une date plus proche sera
        ramenée à ce minimum.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>Date de départ souhaitée</Label>
          <Input type="date" value={desired} onChange={(e) => setDesired(e.target.value)} />
        </div>
        <div>
          <Label>Message (optionnel)</Label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" disabled={busy} onClick={submit}>
          {busy ? "Envoi…" : "Confirmer mon préavis"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Annuler
        </Button>
      </div>
    </div>
  );
}

// ─── Avenants ─────────────────────────────────────────────────────

function AmendmentsBlock({ lease }: { lease: LeaseContract }) {
  const [amendments, setAmendments] = React.useState<LeaseAmendment[] | null>(
    lease.amendments ?? null,
  );
  const [busy, setBusy] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (amendments === null) {
      api.listAmendments(lease.id).then(setAmendments).catch(() => setAmendments([]));
    }
  }, [amendments, lease.id]);

  if (amendments === null) return <p className="text-sm text-ink-muted">Chargement…</p>;
  if (amendments.length === 0)
    return <p className="text-sm text-ink-muted">Aucun avenant.</p>;

  const sign = async (id: string) => {
    if (!confirm("Vous signez cet avenant : il s'applique immédiatement au bail. Confirmez-vous ?")) return;
    setBusy(id);
    try {
      const signed = await api.signAmendment(lease.id, id);
      setAmendments((arr) => (arr ?? []).map((a) => (a.id === signed.id ? signed : a)));
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <ul className="space-y-2 text-sm">
      {amendments.map((a) => (
        <li key={a.id} className="flex flex-wrap items-center gap-2">
          <span>
            Au <strong>{fmtDate(a.effectiveDate)}</strong> :
            {a.newMonthlyRent != null && <> loyer <strong>{fmtMoney(a.newMonthlyRent)}</strong></>}
            {a.newCharges != null && <> · charges <strong>{fmtMoney(a.newCharges)}</strong></>}
            {a.newEndDate != null && <> · fin <strong>{fmtDate(a.newEndDate)}</strong></>}
          </span>
          {a.note && <span className="text-ink-muted">— {a.note}</span>}
          {a.tenantSignedAt ? (
            <Badge tone="success">Signé le {fmtDate(a.tenantSignedAt)}</Badge>
          ) : (
            <Button size="sm" disabled={busy === a.id} onClick={() => sign(a.id)}>
              Signer
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}

// ─── Colocataires ─────────────────────────────────────────────────

function CoTenantsBlock({ lease }: { lease: LeaseContract }) {
  const { user } = useAuth();
  const [coTenants, setCoTenants] = React.useState(lease.coTenants ?? []);
  const [busy, setBusy] = React.useState(false);

  if (coTenants.length === 0)
    return <p className="text-sm text-ink-muted">Pas de colocataire sur ce bail.</p>;

  const mine = coTenants.find((c) => c.email === user?.email);

  const sign = async () => {
    if (!confirm("Vous signez le bail en tant que colocataire. Confirmez-vous ?")) return;
    setBusy(true);
    try {
      const signed = await api.signAsCoTenant(lease.id);
      setCoTenants((arr) => arr.map((c) => (c.id === signed.id ? signed : c)));
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2 text-sm">
      <ul className="space-y-1">
        {coTenants.map((c) => (
          <li key={c.id} className="flex flex-wrap items-center gap-2">
            <span>{c.signedAt ? "✅" : "⏳"}</span>
            <span className="font-medium">{c.firstName} {c.lastName}</span>
            <span className="text-ink-muted">{c.email}</span>
            {c.signedAt && <span className="text-ink-muted">signé le {fmtDate(c.signedAt)}</span>}
          </li>
        ))}
      </ul>
      {mine && !mine.signedAt && (
        <Button size="sm" disabled={busy} onClick={sign}>
          Signer ma ligne de colocataire
        </Button>
      )}
    </div>
  );
}

// ─── Assurance habitation ─────────────────────────────────────────

function InsuranceBlock({ lease }: { lease: LeaseContract }) {
  const [certs, setCerts] = React.useState<InsuranceSummary[]>(lease.insurances ?? []);
  const [file, setFile] = React.useState<string | null>(null);
  const [validUntil, setValidUntil] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const latest = certs[0];
  const now = Date.now();
  const status = !latest
    ? { text: "Aucune attestation déposée", tone: "accent" as const }
    : new Date(latest.validUntil).getTime() < now
      ? { text: `Expirée le ${fmtDate(latest.validUntil)}`, tone: "accent" as const }
      : new Date(latest.validUntil).getTime() < now + 30 * 86400000
        ? { text: `Expire le ${fmtDate(latest.validUntil)} — renouvelez`, tone: "accent" as const }
        : { text: `Valide jusqu'au ${fmtDate(latest.validUntil)}`, tone: "success" as const };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      alert("Le fichier dépasse 8 Mo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setFile(String(reader.result));
    reader.readAsDataURL(f);
  };

  const submit = async () => {
    if (!file || !validUntil) return;
    setBusy(true);
    try {
      const created = await api.addInsurance(lease.id, { fileUrl: file, validUntil });
      setCerts((arr) => [created, ...arr]);
      setFile(null);
      setValidUntil("");
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 text-sm">
      <p>
        <Badge tone={status.tone}>{status.text}</Badge>
      </p>
      <div className="flex flex-wrap items-end gap-2">
        <div>
          <Label>Attestation (PDF ou image)</Label>
          <input
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            onChange={onFile}
            className="block text-sm"
          />
        </div>
        <div>
          <Label>Valide jusqu'au</Label>
          <Input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
        </div>
        <Button size="sm" disabled={busy || !file || !validUntil} onClick={submit}>
          {busy ? "Envoi…" : "Déposer"}
        </Button>
      </div>
    </div>
  );
}

// ─── Bloc combiné, monté dans la carte de bail ─────────────────────────────

export function LeaseTenantExtras({
  lease,
  onLeaseUpdate,
}: {
  lease: LeaseContract;
  onLeaseUpdate?: (l: LeaseContract) => void;
}) {
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
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          Préavis
        </h3>
        <NoticeBlock lease={lease} onUpdate={(l) => onLeaseUpdate?.(l)} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          Avenants
        </h3>
        <AmendmentsBlock lease={lease} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          Colocataires
        </h3>
        <CoTenantsBlock lease={lease} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          Assurance habitation
        </h3>
        <InsuranceBlock lease={lease} />
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
