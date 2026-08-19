"use client";

import * as React from "react";
import { Button, Input, Label, Textarea, Badge } from "@hwe/ui";
import { api } from "../lib/api";
import type {
  Inspection,
  InspectionItem,
  InspectionType,
  LeaseContract,
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

// ─── Caution ──────────────────────────────────────────────────────────────

function DepositBlock({
  propertyId,
  lease,
  onUpdate,
}: {
  propertyId: string;
  lease: LeaseContract;
  onUpdate: (l: LeaseContract) => void;
}) {
  const [retained, setRetained] = React.useState("0");
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const act = async (action: "PAID" | "RETURNED") => {
    setBusy(true);
    try {
      const updated = await api.markDeposit(propertyId, lease.id, {
        action,
        retained: action === "RETURNED" ? parseFloat(retained) || 0 : undefined,
        note: note || undefined,
      });
      onUpdate(updated);
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (lease.depositReturnedAt) {
    return (
      <div className="text-sm space-y-1">
        <p>
          Versée le <strong>{fmtDate(lease.depositPaidAt!)}</strong>, restituée le{" "}
          <strong>{fmtDate(lease.depositReturnedAt)}</strong>
          {lease.depositRetained ? (
            <span>
              {" "}
              — retenue : <strong>{fmtMoney(lease.depositRetained)}</strong>
            </span>
          ) : (
            <span> — sans retenue</span>
          )}
        </p>
        {lease.depositNote && <p className="text-ink-muted">{lease.depositNote}</p>}
      </div>
    );
  }

  if (lease.depositPaidAt) {
    return (
      <div className="text-sm space-y-3">
        <p>
          Versée le <strong>{fmtDate(lease.depositPaidAt)}</strong> ({fmtMoney(lease.deposit)})
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
          <div>
            <Label htmlFor={`ret-${lease.id}`}>Retenue (€, 0 si aucune)</Label>
            <Input
              id={`ret-${lease.id}`}
              type="number"
              min="0"
              max={lease.deposit}
              step="0.01"
              value={retained}
              onChange={(e) => setRetained(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`note-${lease.id}`}>Motif (si retenue)</Label>
            <Input
              id={`note-${lease.id}`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex : réparation porte"
            />
          </div>
        </div>
        <Button size="sm" variant="secondary" disabled={busy} onClick={() => act("RETURNED")}>
          Marquer la caution restituée
        </Button>
      </div>
    );
  }

  return (
    <div className="text-sm space-y-3">
      <p className="text-ink-muted">
        {fmtMoney(lease.deposit)} — pas encore reçue.
      </p>
      <Button size="sm" disabled={busy} onClick={() => act("PAID")}>
        Marquer la caution versée
      </Button>
    </div>
  );
}

// ─── États des lieux ──────────────────────────────────────────────────────

const TYPE_LABEL: Record<InspectionType, string> = {
  ENTRY: "Entrée",
  EXIT: "Sortie",
};

const CONDITIONS = ["Bon", "Usé", "À réparer", "Neuf"];

function InspectionEditor({
  leaseId,
  type,
  initial,
  onSaved,
  onCancel,
}: {
  leaseId: string;
  type: InspectionType;
  initial: Inspection | null;
  onSaved: (i: Inspection) => void;
  onCancel: () => void;
}) {
  const [date, setDate] = React.useState(
    (initial?.date ?? new Date().toISOString()).split("T")[0] ?? "",
  );
  const [items, setItems] = React.useState<InspectionItem[]>(
    initial?.items?.length ? initial.items : [{ label: "", condition: "Bon", note: "" }],
  );
  const [generalNote, setGeneralNote] = React.useState(initial?.generalNote ?? "");
  const [elec, setElec] = React.useState(initial?.meterElectricity ?? "");
  const [water, setWater] = React.useState(initial?.meterWater ?? "");
  const [gas, setGas] = React.useState(initial?.meterGas ?? "");
  const [keys, setKeys] = React.useState(String(initial?.keysCount ?? ""));
  const [busy, setBusy] = React.useState(false);

  const setItem = (i: number, patch: Partial<InspectionItem>) =>
    setItems((arr) => arr.map((x, j) => (j === i ? { ...x, ...patch } : x)));

  const save = async () => {
    setBusy(true);
    try {
      const saved = await api.upsertInspection(leaseId, type, {
        date,
        items: items.filter((i) => i.label.trim()),
        generalNote: generalNote || undefined,
        meterElectricity: elec || undefined,
        meterWater: water || undefined,
        meterGas: gas || undefined,
        keysCount: keys === "" ? undefined : parseInt(keys, 10),
      });
      onSaved(saved);
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4 border border-ink-subtle rounded-xl p-4 bg-brand-50/60 dark:bg-brand-900/20">
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <Label>Clés remises</Label>
          <Input
            type="number"
            min="0"
            value={keys}
            onChange={(e) => setKeys(e.target.value)}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <Label>Compteur électricité</Label>
          <Input value={elec} onChange={(e) => setElec(e.target.value)} />
        </div>
        <div>
          <Label>Compteur eau</Label>
          <Input value={water} onChange={(e) => setWater(e.target.value)} />
        </div>
        <div>
          <Label>Compteur gaz</Label>
          <Input value={gas} onChange={(e) => setGas(e.target.value)} />
        </div>
      </div>

      <div>
        <Label>Relevé pièce par pièce</Label>
        <div className="space-y-2 mt-1">
          {items.map((it, i) => (
            <div key={i} className="flex flex-wrap gap-2 items-center">
              <Input
                className="flex-1 min-w-[10rem]"
                placeholder="Pièce / élément (ex : Cuisine — murs)"
                value={it.label}
                onChange={(e) => setItem(i, { label: e.target.value })}
              />
              <select
                className="h-10 rounded-lg border border-ink-subtle bg-white px-2 text-sm"
                value={it.condition}
                onChange={(e) => setItem(i, { condition: e.target.value })}
              >
                {CONDITIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <Input
                className="flex-1 min-w-[8rem]"
                placeholder="Remarque"
                value={it.note ?? ""}
                onChange={(e) => setItem(i, { note: e.target.value })}
              />
              <button
                type="button"
                className="text-ink-muted hover:text-red-500 px-1"
                onClick={() => setItems((arr) => arr.filter((_, j) => j !== i))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-2"
          onClick={() => setItems((arr) => [...arr, { label: "", condition: "Bon", note: "" }])}
        >
          + Ajouter une ligne
        </Button>
      </div>

      <div>
        <Label>Observations générales</Label>
        <Textarea
          rows={3}
          value={generalNote}
          onChange={(e) => setGeneralNote(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button size="sm" disabled={busy} onClick={save}>
          {busy ? "Enregistrement…" : "Enregistrer"}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
      </div>
      {(initial?.ownerSignedAt || initial?.tenantSignedAt) && (
        <p className="text-xs text-ink-muted">
          Modifier annule les signatures déjà posées.
        </p>
      )}
    </div>
  );
}

function InspectionRow({
  leaseId,
  type,
  inspection,
  onChange,
}: {
  leaseId: string;
  type: InspectionType;
  inspection: Inspection | null;
  onChange: (i: Inspection) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const locked = !!(inspection?.ownerSignedAt && inspection?.tenantSignedAt);

  const sign = async () => {
    setBusy(true);
    try {
      onChange(await api.signInspection(leaseId, type));
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (editing) {
    return (
      <InspectionEditor
        leaseId={leaseId}
        type={type}
        initial={inspection}
        onSaved={(i) => {
          onChange(i);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="font-medium w-16">{TYPE_LABEL[type]}</span>
      {inspection ? (
        <>
          <span>{fmtDate(inspection.date)}</span>
          <span className="text-ink-muted">
            {(inspection.items?.length ?? 0)} ligne{(inspection.items?.length ?? 0) > 1 ? "s" : ""}
          </span>
          <span title="Propriétaire">{inspection.ownerSignedAt ? "✅" : "⏳"} prop.</span>
          <span title="Locataire">{inspection.tenantSignedAt ? "✅" : "⏳"} loc.</span>
          {locked && <Badge tone="success">Verrouillé</Badge>}
          {!inspection.ownerSignedAt && (
            <Button size="sm" variant="secondary" disabled={busy} onClick={sign}>
              Signer
            </Button>
          )}
          {!locked && (
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
              Modifier
            </Button>
          )}
        </>
      ) : (
        <>
          <span className="text-ink-muted">Pas encore rédigé</span>
          <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>
            Rédiger
          </Button>
        </>
      )}
    </div>
  );
}


// ─── Avenants (création côté propriétaire) ─────────────────────────

function AmendmentsBlock({ propertyId, lease }: { propertyId: string; lease: LeaseContract }) {
  const [amendments, setAmendments] = React.useState<LeaseAmendment[]>(lease.amendments ?? []);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ effectiveDate: "", rent: "", charges: "", endDate: "", note: "" });
  const [busy, setBusy] = React.useState(false);

  const submit = async () => {
    if (!form.effectiveDate) return;
    if (!form.rent && !form.charges && !form.endDate) {
      alert("Modifiez au moins une condition (loyer, charges ou fin).");
      return;
    }
    setBusy(true);
    try {
      const created = await api.createAmendment(propertyId, lease.id, {
        effectiveDate: form.effectiveDate,
        newMonthlyRent: form.rent ? parseFloat(form.rent) : undefined,
        newCharges: form.charges ? parseFloat(form.charges) : undefined,
        newEndDate: form.endDate || undefined,
        note: form.note || undefined,
      });
      setAmendments((arr) => [created, ...arr]);
      setForm({ effectiveDate: "", rent: "", charges: "", endDate: "", note: "" });
      setOpen(false);
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 text-sm">
      {amendments.length === 0 ? (
        <p className="text-ink-muted">Aucun avenant.</p>
      ) : (
        <ul className="space-y-1">
          {amendments.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-2">
              <span>
                Au <strong>{fmtDate(a.effectiveDate)}</strong> :
                {a.newMonthlyRent != null && <> loyer <strong>{fmtMoney(a.newMonthlyRent)}</strong></>}
                {a.newCharges != null && <> · charges <strong>{fmtMoney(a.newCharges)}</strong></>}
                {a.newEndDate != null && <> · fin <strong>{fmtDate(a.newEndDate)}</strong></>}
              </span>
              {a.tenantSignedAt ? (
                <Badge tone="success">Signé — appliqué</Badge>
              ) : (
                <Badge tone="accent">En attente de signature</Badge>
              )}
            </li>
          ))}
        </ul>
      )}
      {open ? (
        <div className="space-y-3 border border-ink-subtle rounded-xl p-4 bg-brand-50/60 dark:bg-brand-900/20 max-w-xl">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Date d'effet</Label>
              <Input type="date" value={form.effectiveDate} onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })} />
            </div>
            <div>
              <Label>Nouveau loyer (€, vide = inchangé)</Label>
              <Input type="number" min="0" step="0.01" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} />
            </div>
            <div>
              <Label>Nouvelles charges (€)</Label>
              <Input type="number" min="0" step="0.01" value={form.charges} onChange={(e) => setForm({ ...form, charges: e.target.value })} />
            </div>
            <div>
              <Label>Nouvelle date de fin</Label>
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Motif (révision IRL, renouvellement…)</Label>
            <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" disabled={busy || !form.effectiveDate} onClick={submit}>
              {busy ? "Création…" : "Proposer l'avenant"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
          </div>
          <p className="text-xs text-ink-muted">Il ne s'applique qu'après signature du locataire.</p>
        </div>
      ) : (
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
          + Proposer un avenant
        </Button>
      )}
    </div>
  );
}

// ─── Colocataires (gestion côté propriétaire) ───────────────────────

function CoTenantsBlock({ propertyId, lease }: { propertyId: string; lease: LeaseContract }) {
  const [coTenants, setCoTenants] = React.useState(lease.coTenants ?? []);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [busy, setBusy] = React.useState(false);

  const add = async () => {
    if (!form.firstName || !form.lastName || !form.email) return;
    setBusy(true);
    try {
      const created = await api.addCoTenant(propertyId, lease.id, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || undefined,
      });
      setCoTenants((arr) => [...arr, created]);
      setForm({ firstName: "", lastName: "", email: "", phone: "" });
      setOpen(false);
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Retirer ce colocataire ?")) return;
    try {
      await api.removeCoTenant(propertyId, lease.id, id);
      setCoTenants((arr) => arr.filter((c) => c.id !== id));
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    }
  };

  return (
    <div className="space-y-3 text-sm">
      {coTenants.length === 0 ? (
        <p className="text-ink-muted">Pas de colocataire — le locataire principal figure au contrat.</p>
      ) : (
        <ul className="space-y-1">
          {coTenants.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center gap-2">
              <span>{c.signedAt ? "✅" : "⏳"}</span>
              <span className="font-medium">{c.firstName} {c.lastName}</span>
              <span className="text-ink-muted">{c.email}</span>
              {!c.signedAt && (
                <button className="text-ink-muted hover:text-red-500" onClick={() => remove(c.id)}>
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {open ? (
        <div className="flex flex-wrap gap-2 items-end max-w-2xl">
          <Input placeholder="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="max-w-[9rem]" />
          <Input placeholder="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="max-w-[9rem]" />
          <Input placeholder="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="max-w-[14rem]" />
          <Button size="sm" disabled={busy} onClick={add}>Ajouter</Button>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
        </div>
      ) : (
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
          + Ajouter un colocataire
        </Button>
      )}
      <p className="text-xs text-ink-muted">
        Le colocataire signe sa ligne depuis son espace (même adresse e-mail) et accède au bail.
      </p>
    </div>
  );
}

// ─── Assurance (lecture côté propriétaire) ───────────────────────────

function InsuranceStatus({ lease }: { lease: LeaseContract }) {
  const certs: InsuranceSummary[] = lease.insurances ?? [];
  const latest = certs[0];
  const now = Date.now();

  const view = async (id: string) => {
    try {
      const { fileUrl } = await api.getInsuranceFile(lease.id, id);
      const w = window.open();
      if (w) w.document.write(`<iframe src="${fileUrl}" style="width:100%;height:100%;border:0"></iframe>`);
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    }
  };

  if (!latest) {
    return <p className="text-sm"><Badge tone="accent">Aucune attestation déposée</Badge></p>;
  }
  const expired = new Date(latest.validUntil).getTime() < now;
  return (
    <div className="text-sm flex flex-wrap items-center gap-2">
      <Badge tone={expired ? "accent" : "success"}>
        {expired ? `Expirée le ${fmtDate(latest.validUntil)}` : `Valide jusqu'au ${fmtDate(latest.validUntil)}`}
      </Badge>
      <button className="underline text-ink-muted" onClick={() => view(latest.id)}>
        Voir l'attestation
      </button>
    </div>
  );
}

// ─── Bloc combiné, monté dans chaque carte de bail ─────────────────────────

export function LeaseExtras({
  propertyId,
  lease,
  onLeaseUpdate,
}: {
  propertyId: string;
  lease: LeaseContract;
  onLeaseUpdate: (l: LeaseContract) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [inspections, setInspections] = React.useState<Inspection[] | null>(null);

  React.useEffect(() => {
    if (!open || inspections !== null) return;
    api
      .listInspections(lease.id)
      .then(setInspections)
      .catch(() => setInspections([]));
  }, [open, inspections, lease.id]);

  const upsertLocal = (i: Inspection) =>
    setInspections((arr) => {
      const rest = (arr ?? []).filter((x) => x.type !== i.type);
      return [...rest, i].sort((a, b) => a.type.localeCompare(b.type));
    });

  return (
    <div className="mt-4 pt-4 border-t border-ink-subtle">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
      >
        {open ? "▾" : "▸"} Gérer le bail — caution, états des lieux, avenants, colocation, assurance
      </button>
      {open && (
        <div className="mt-4 space-y-6">
          {lease.noticeGivenAt && (
            <div className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-4 py-2 text-sm">
              Préavis reçu le <strong>{fmtDate(lease.noticeGivenAt)}</strong> — fin de bail le{" "}
              <strong>{lease.noticeEffectiveDate ? fmtDate(lease.noticeEffectiveDate) : "—"}</strong>.
              Pensez à l'état des lieux de sortie et à la caution.
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              Caution
            </h3>
            <DepositBlock propertyId={propertyId} lease={lease} onUpdate={onLeaseUpdate} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              États des lieux
            </h3>
            {inspections === null ? (
              <p className="text-sm text-ink-muted">Chargement…</p>
            ) : (
              <div className="space-y-3">
                <InspectionRow
                  leaseId={lease.id}
                  type="ENTRY"
                  inspection={inspections.find((i) => i.type === "ENTRY") ?? null}
                  onChange={upsertLocal}
                />
                <InspectionRow
                  leaseId={lease.id}
                  type="EXIT"
                  inspection={inspections.find((i) => i.type === "EXIT") ?? null}
                  onChange={upsertLocal}
                />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              Avenants
            </h3>
            <AmendmentsBlock propertyId={propertyId} lease={lease} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              Colocataires
            </h3>
            <CoTenantsBlock propertyId={propertyId} lease={lease} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              Assurance habitation
            </h3>
            <InsuranceStatus lease={lease} />
          </div>
        </div>
      )}
    </div>
  );
}
