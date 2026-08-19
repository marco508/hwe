"use client";

import * as React from "react";
import { Button, Input, Label, Textarea, Badge } from "@hwe/ui";
import { api } from "../lib/api";
import type { Inspection, InspectionItem, InspectionType, LeaseContract } from "@hwe/types";

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
        {open ? "▾" : "▸"} Caution & états des lieux
      </button>
      {open && (
        <div className="mt-4 space-y-6">
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
        </div>
      )}
    </div>
  );
}
