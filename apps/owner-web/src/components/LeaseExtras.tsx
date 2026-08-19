"use client";

import * as React from "react";
import { Button, Input, Label, Textarea, Badge } from "@hwe/ui";
import { api } from "../lib/api";
import { t } from "../lib/i18n";
import type {
  Inspection,
  InspectionItem,
  InspectionType,
  LeaseContract,
  LeaseAmendment,
  InsuranceSummary,
  ChargeRegularization,
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
      alert(t("lease.errorPrefix") + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (lease.depositReturnedAt) {
    return (
      <div className="text-sm space-y-1">
        <p>
          {t("lease.deposit.paidOn")} <strong>{fmtDate(lease.depositPaidAt!)}</strong>,{" "}
          {t("lease.deposit.returnedOn")}{" "}
          <strong>{fmtDate(lease.depositReturnedAt)}</strong>
          {lease.depositRetained ? (
            <span>
              {" "}
              — {t("lease.deposit.retained")} <strong>{fmtMoney(lease.depositRetained)}</strong>
            </span>
          ) : (
            <span> — {t("lease.deposit.noRetention")}</span>
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
          {t("lease.deposit.paidOn")} <strong>{fmtDate(lease.depositPaidAt)}</strong> ({fmtMoney(lease.deposit)})
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
          <div>
            <Label htmlFor={`ret-${lease.id}`}>{t("lease.deposit.retainedLabel")}</Label>
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
            <Label htmlFor={`note-${lease.id}`}>{t("lease.deposit.reasonLabel")}</Label>
            <Input
              id={`note-${lease.id}`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("lease.deposit.reasonPlaceholder")}
            />
          </div>
        </div>
        <Button size="sm" variant="secondary" disabled={busy} onClick={() => act("RETURNED")}>
          {t("lease.deposit.markReturned")}
        </Button>
      </div>
    );
  }

  return (
    <div className="text-sm space-y-3">
      <p className="text-ink-muted">
        {fmtMoney(lease.deposit)} — {t("lease.deposit.notReceived")}
      </p>
      <Button size="sm" disabled={busy} onClick={() => act("PAID")}>
        {t("lease.deposit.markPaid")}
      </Button>
    </div>
  );
}

// ─── États des lieux ──────────────────────────────────────────────────────

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
      alert(t("lease.errorPrefix") + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4 border border-ink-subtle rounded-xl p-4 bg-brand-50/60 dark:bg-brand-900/20">
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <Label>{t("lease.inspection.date")}</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <Label>{t("lease.inspection.keys")}</Label>
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
          <Label>{t("lease.inspection.meterElec")}</Label>
          <Input value={elec} onChange={(e) => setElec(e.target.value)} />
        </div>
        <div>
          <Label>{t("lease.inspection.meterWater")}</Label>
          <Input value={water} onChange={(e) => setWater(e.target.value)} />
        </div>
        <div>
          <Label>{t("lease.inspection.meterGas")}</Label>
          <Input value={gas} onChange={(e) => setGas(e.target.value)} />
        </div>
      </div>

      <div>
        <Label>{t("lease.inspection.roomByRoom")}</Label>
        <div className="space-y-2 mt-1">
          {items.map((it, i) => (
            <div key={i} className="flex flex-wrap gap-2 items-center">
              <Input
                className="flex-1 min-w-[10rem]"
                placeholder={t("lease.inspection.itemPlaceholder")}
                value={it.label}
                onChange={(e) => setItem(i, { label: e.target.value })}
              />
              <select
                className="h-10 rounded-lg border border-ink-subtle bg-white px-2 text-sm"
                value={it.condition}
                onChange={(e) => setItem(i, { condition: e.target.value })}
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {t("lease.condition." + c)}
                  </option>
                ))}
              </select>
              <Input
                className="flex-1 min-w-[8rem]"
                placeholder={t("lease.inspection.notePlaceholder")}
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
          {t("lease.inspection.addLine")}
        </Button>
      </div>

      <div>
        <Label>{t("lease.inspection.generalNotes")}</Label>
        <Textarea
          rows={3}
          value={generalNote}
          onChange={(e) => setGeneralNote(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button size="sm" disabled={busy} onClick={save}>
          {busy ? t("lease.saving") : t("lease.save")}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          {t("lease.cancel")}
        </Button>
      </div>
      {(initial?.ownerSignedAt || initial?.tenantSignedAt) && (
        <p className="text-xs text-ink-muted">
          {t("lease.inspection.editVoidsSignatures")}
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
      alert(t("lease.errorPrefix") + (e as Error).message);
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
      <span className="font-medium w-16">{t("lease.inspection.type." + type)}</span>
      {inspection ? (
        <>
          <span>{fmtDate(inspection.date)}</span>
          <span className="text-ink-muted">
            {(inspection.items?.length ?? 0)}{" "}
            {(inspection.items?.length ?? 0) > 1
              ? t("lease.inspection.lines")
              : t("lease.inspection.line")}
          </span>
          <span title={t("lease.owner")}>
            {inspection.ownerSignedAt ? "✅" : "⏳"} {t("lease.inspection.ownerAbbr")}
          </span>
          <span title={t("lease.tenant")}>
            {inspection.tenantSignedAt ? "✅" : "⏳"} {t("lease.inspection.tenantAbbr")}
          </span>
          {locked && <Badge tone="success">{t("lease.inspection.locked")}</Badge>}
          {!inspection.ownerSignedAt && (
            <Button size="sm" variant="secondary" disabled={busy} onClick={sign}>
              {t("lease.sign")}
            </Button>
          )}
          {!locked && (
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
              {t("lease.edit")}
            </Button>
          )}
        </>
      ) : (
        <>
          <span className="text-ink-muted">{t("lease.inspection.notDrafted")}</span>
          <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>
            {t("lease.inspection.draft")}
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
      alert(t("lease.amendment.atLeastOne"));
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
      alert(t("lease.errorPrefix") + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 text-sm">
      {amendments.length === 0 ? (
        <p className="text-ink-muted">{t("lease.amendment.none")}</p>
      ) : (
        <ul className="space-y-1">
          {amendments.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-2">
              <span>
                {t("lease.amendment.asOf")} <strong>{fmtDate(a.effectiveDate)}</strong> :
                {a.newMonthlyRent != null && <> {t("lease.amendment.rentWord")} <strong>{fmtMoney(a.newMonthlyRent)}</strong></>}
                {a.newCharges != null && <> · {t("lease.amendment.chargesWord")} <strong>{fmtMoney(a.newCharges)}</strong></>}
                {a.newEndDate != null && <> · {t("lease.amendment.endWord")} <strong>{fmtDate(a.newEndDate)}</strong></>}
              </span>
              {a.tenantSignedAt ? (
                <Badge tone="success">{t("lease.amendment.signedApplied")}</Badge>
              ) : (
                <Badge tone="accent">{t("lease.amendment.awaitingSignature")}</Badge>
              )}
            </li>
          ))}
        </ul>
      )}
      {open ? (
        <div className="space-y-3 border border-ink-subtle rounded-xl p-4 bg-brand-50/60 dark:bg-brand-900/20 max-w-xl">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>{t("lease.amendment.effectiveDate")}</Label>
              <Input type="date" value={form.effectiveDate} onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })} />
            </div>
            <div>
              <Label>{t("lease.amendment.newRent")}</Label>
              <Input type="number" min="0" step="0.01" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} />
            </div>
            <div>
              <Label>{t("lease.amendment.newCharges")}</Label>
              <Input type="number" min="0" step="0.01" value={form.charges} onChange={(e) => setForm({ ...form, charges: e.target.value })} />
            </div>
            <div>
              <Label>{t("lease.amendment.newEndDate")}</Label>
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>{t("lease.amendment.reason")}</Label>
            <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" disabled={busy || !form.effectiveDate} onClick={submit}>
              {busy ? t("lease.creating") : t("lease.amendment.submit")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>{t("lease.cancel")}</Button>
          </div>
          <p className="text-xs text-ink-muted">{t("lease.amendment.appliesAfterSignature")}</p>
        </div>
      ) : (
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
          {t("lease.amendment.propose")}
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
      alert(t("lease.errorPrefix") + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm(t("lease.coTenant.confirmRemove"))) return;
    try {
      await api.removeCoTenant(propertyId, lease.id, id);
      setCoTenants((arr) => arr.filter((c) => c.id !== id));
    } catch (e) {
      alert(t("lease.errorPrefix") + (e as Error).message);
    }
  };

  return (
    <div className="space-y-3 text-sm">
      {coTenants.length === 0 ? (
        <p className="text-ink-muted">{t("lease.coTenant.none")}</p>
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
          <Input placeholder={t("lease.coTenant.firstName")} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="max-w-[9rem]" />
          <Input placeholder={t("lease.coTenant.lastName")} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="max-w-[9rem]" />
          <Input placeholder={t("lease.coTenant.email")} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="max-w-[14rem]" />
          <Button size="sm" disabled={busy} onClick={add}>{t("lease.add")}</Button>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>{t("lease.cancel")}</Button>
        </div>
      ) : (
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
          {t("lease.coTenant.addBtn")}
        </Button>
      )}
      <p className="text-xs text-ink-muted">
        {t("lease.coTenant.hint")}
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
      alert(t("lease.errorPrefix") + (e as Error).message);
    }
  };

  if (!latest) {
    return <p className="text-sm"><Badge tone="accent">{t("lease.insurance.none")}</Badge></p>;
  }
  const expired = new Date(latest.validUntil).getTime() < now;
  return (
    <div className="text-sm flex flex-wrap items-center gap-2">
      <Badge tone={expired ? "accent" : "success"}>
        {expired
          ? t("lease.insurance.expiredOn", { date: fmtDate(latest.validUntil) })
          : t("lease.insurance.validUntil", { date: fmtDate(latest.validUntil) })}
      </Badge>
      <button className="underline text-ink-muted" onClick={() => view(latest.id)}>
        {t("lease.insurance.view")}
      </button>
    </div>
  );
}


// ─── Congé donné par le propriétaire ───────────────────────────────

function OwnerNoticeBlock({
  propertyId,
  lease,
  onUpdate,
}: {
  propertyId: string;
  lease: LeaseContract;
  onUpdate: (l: LeaseContract) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState<"SALE" | "REPOSSESSION" | "OTHER">("SALE");
  const [desired, setDesired] = React.useState("");
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  if (lease.ownerNoticeGivenAt) {
    return (
      <p className="text-sm">
        {t("lease.notice.givenOn")} <strong>{fmtDate(lease.ownerNoticeGivenAt)}</strong> —{" "}
        {lease.ownerNoticeReason ? t("lease.noticeReason." + lease.ownerNoticeReason) : null} —{" "}
        {t("lease.notice.leaseEndsOn")}{" "}
        <strong>{lease.ownerNoticeEffectiveDate ? fmtDate(lease.ownerNoticeEffectiveDate) : "—"}</strong>.
      </p>
    );
  }
  if (lease.noticeGivenAt) {
    return (
      <p className="text-sm text-ink-muted">
        {t("lease.notice.tenantAlready")}{" "}
        {lease.noticeEffectiveDate ? fmtDate(lease.noticeEffectiveDate) : "—"}.
      </p>
    );
  }
  const active = lease.status === "ACTIVE" || lease.status === "SIGNED";
  if (!active) return <p className="text-sm text-ink-muted">{t("lease.notice.availableWhenActive")}</p>;

  const minMonths = lease.furnished ? 3 : 6;

  if (!open) {
    return (
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        {t("lease.notice.giveBtn")}
      </Button>
    );
  }

  const submit = async () => {
    if (!confirm(t("lease.notice.confirm"))) return;
    setBusy(true);
    try {
      const updated = await api.giveOwnerNotice(propertyId, lease.id, {
        reason,
        desiredDate: desired || undefined,
        note: note || undefined,
      });
      onUpdate({ ...lease, ...updated });
      setOpen(false);
    } catch (e) {
      alert(t("lease.errorPrefix") + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 max-w-lg text-sm">
      <p className="text-ink-muted">
        {t("lease.notice.legalNotice", {
          n: minMonths,
          type: lease.furnished ? t("lease.furnishedWord") : t("lease.unfurnishedWord"),
        })}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>{t("lease.notice.legalReason")}</Label>
          <select
            className="h-10 w-full rounded-lg border border-ink-subtle bg-white px-2 text-sm"
            value={reason}
            onChange={(e) => setReason(e.target.value as typeof reason)}
          >
            <option value="SALE">{t("lease.noticeReason.SALE")}</option>
            <option value="REPOSSESSION">{t("lease.noticeReason.REPOSSESSION")}</option>
            <option value="OTHER">{t("lease.noticeReason.OTHER")}</option>
          </select>
        </div>
        <div>
          <Label>{t("lease.notice.desiredEnd")}</Label>
          <Input type="date" value={desired} onChange={(e) => setDesired(e.target.value)} />
        </div>
      </div>
      <div>
        <Label>{t("lease.notice.detail")}</Label>
        <Input value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" disabled={busy} onClick={submit}>
          {busy ? t("lease.sending") : t("lease.notice.notifyBtn")}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>{t("lease.cancel")}</Button>
      </div>
    </div>
  );
}

// ─── Régularisation des charges ───────────────────────────────────

function ChargeRegularizationBlock({ propertyId, lease }: { propertyId: string; lease: LeaseContract }) {
  const [regs, setRegs] = React.useState<ChargeRegularization[] | null>(null);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ periodLabel: "", provisions: "", actual: "", note: "" });
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (regs === null) {
      api.listChargeRegularizations(lease.id).then(setRegs).catch(() => setRegs([]));
    }
  }, [regs, lease.id]);

  const submit = async () => {
    if (!form.periodLabel || form.provisions === "" || form.actual === "") return;
    setBusy(true);
    try {
      const created = await api.createChargeRegularization(propertyId, lease.id, {
        periodLabel: form.periodLabel,
        provisionsCollected: parseFloat(form.provisions),
        actualCharges: parseFloat(form.actual),
        note: form.note || undefined,
      });
      setRegs((arr) => [created, ...(arr ?? [])]);
      setForm({ periodLabel: "", provisions: "", actual: "", note: "" });
      setOpen(false);
    } catch (e) {
      alert(t("lease.errorPrefix") + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 text-sm">
      {regs === null ? (
        <p className="text-ink-muted">{t("lease.loading")}</p>
      ) : regs.length === 0 ? (
        <p className="text-ink-muted">{t("lease.reg.none")}</p>
      ) : (
        <ul className="space-y-1">
          {regs.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{r.periodLabel}</span>
              <span className="text-ink-muted">
                {t("lease.reg.provisionsWord")} {fmtMoney(r.provisionsCollected)} ·{" "}
                {t("lease.reg.actualWord")} {fmtMoney(r.actualCharges)}
              </span>
              {r.balance > 0 ? (
                <Badge tone="accent">+{fmtMoney(r.balance)} {t("lease.reg.dueByTenant")}</Badge>
              ) : r.balance < 0 ? (
                <Badge tone="brand">{fmtMoney(-r.balance)} {t("lease.reg.toRefund")}</Badge>
              ) : (
                <Badge tone="success">{t("lease.reg.balanced")}</Badge>
              )}
            </li>
          ))}
        </ul>
      )}
      {open ? (
        <div className="space-y-3 border border-ink-subtle rounded-xl p-4 bg-brand-50/60 dark:bg-brand-900/20 max-w-xl">
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <Label>{t("lease.reg.period")}</Label>
              <Input placeholder="2026" value={form.periodLabel} onChange={(e) => setForm({ ...form, periodLabel: e.target.value })} />
            </div>
            <div>
              <Label>{t("lease.reg.provisionsCollected")}</Label>
              <Input type="number" min="0" step="0.01" value={form.provisions} onChange={(e) => setForm({ ...form, provisions: e.target.value })} />
            </div>
            <div>
              <Label>{t("lease.reg.actualCharges")}</Label>
              <Input type="number" min="0" step="0.01" value={form.actual} onChange={(e) => setForm({ ...form, actual: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>{t("lease.reg.detail")}</Label>
            <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" disabled={busy} onClick={submit}>
              {busy ? t("lease.saving") : t("lease.reg.saveNotify")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>{t("lease.cancel")}</Button>
          </div>
          <p className="text-xs text-ink-muted">
            {t("lease.reg.hint")}
          </p>
        </div>
      ) : (
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
          {t("lease.reg.addBtn")}
        </Button>
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
        {open ? "▾" : "▸"} {t("lease.extras.toggle")}
      </button>
      {open && (
        <div className="mt-4 space-y-6">
          {lease.noticeGivenAt && (
            <div className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-4 py-2 text-sm">
              {t("lease.extras.noticeReceivedOn")} <strong>{fmtDate(lease.noticeGivenAt)}</strong> —{" "}
              {t("lease.notice.leaseEndsOn")}{" "}
              <strong>{lease.noticeEffectiveDate ? fmtDate(lease.noticeEffectiveDate) : "—"}</strong>.{" "}
              {t("lease.extras.noticeReminder")}
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              {t("lease.section.deposit")}
            </h3>
            <DepositBlock propertyId={propertyId} lease={lease} onUpdate={onLeaseUpdate} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              {t("lease.section.inspections")}
            </h3>
            {inspections === null ? (
              <p className="text-sm text-ink-muted">{t("lease.loading")}</p>
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
              {t("lease.section.amendments")}
            </h3>
            <AmendmentsBlock propertyId={propertyId} lease={lease} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              {t("lease.section.coTenants")}
            </h3>
            <CoTenantsBlock propertyId={propertyId} lease={lease} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              {t("lease.section.reg")}
            </h3>
            <ChargeRegularizationBlock propertyId={propertyId} lease={lease} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              {t("lease.section.ownerNotice")}
            </h3>
            <OwnerNoticeBlock propertyId={propertyId} lease={lease} onUpdate={onLeaseUpdate} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              {t("lease.section.insurance")}
            </h3>
            <InsuranceStatus lease={lease} />
          </div>
        </div>
      )}
    </div>
  );
}
