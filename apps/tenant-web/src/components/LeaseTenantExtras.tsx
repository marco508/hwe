"use client";

import * as React from "react";
import { Badge, Button, Input, Label, Textarea } from "@hwe/ui";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth-context";
import { t } from "../lib/i18n";
import type {
  Inspection,
  LeaseContract,
  Ticket,
  TicketStatus,
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

const TICKET_TONE: Record<TicketStatus, "neutral" | "accent" | "success"> = {
  OPEN: "accent",
  IN_PROGRESS: "neutral",
  RESOLVED: "success",
};

/** Motif du congé donné par le propriétaire, avec repli sur le motif générique. */
function noticeReasonLabel(code?: string | null) {
  const key = `rental.noticeReason.${code ?? ""}`;
  const label = t(key);
  return label === key ? t("rental.noticeReason.fallback") : label;
}

// ─── Caution (lecture seule côté locataire) ────────────────────────────────

function DepositInfo({ lease }: { lease: LeaseContract }) {
  if (lease.depositReturnedAt) {
    return (
      <p className="text-sm">
        {t("rental.deposit.returnedOn")} <strong>{fmtDate(lease.depositReturnedAt)}</strong>
        {lease.depositRetained ? (
          <span>
            {" "}{t("rental.deposit.retained")} <strong>{fmtMoney(lease.depositRetained)}</strong>
            {lease.depositNote ? ` (${lease.depositNote})` : ""}
          </span>
        ) : (
          <span>{t("rental.deposit.noRetention")}</span>
        )}
      </p>
    );
  }
  if (lease.depositPaidAt) {
    return (
      <p className="text-sm">
        {t("rental.deposit.paidOn")} <strong>{fmtDate(lease.depositPaidAt)}</strong> ({fmtMoney(lease.deposit)})
      </p>
    );
  }
  return (
    <p className="text-sm text-ink-muted">
      {t("rental.deposit.notPaid", { amount: fmtMoney(lease.deposit) })}
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
    if (!confirm(t("rental.inspection.signConfirm"))) return;
    setBusy(true);
    try {
      onChange(await api.signInspection(leaseId, inspection.type));
    } catch (e) {
      alert(t("rental.error", { message: (e as Error).message }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="text-sm space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium w-16">{t("rental.inspection.type." + inspection.type)}</span>
        <span>{fmtDate(inspection.date)}</span>
        <span title={t("rental.inspection.ownerTitle")}>{inspection.ownerSignedAt ? "✅" : "⏳"} {t("rental.inspection.ownerShort")}</span>
        <span title={t("rental.inspection.youTitle")}>{inspection.tenantSignedAt ? "✅" : "⏳"} {t("rental.inspection.youShort")}</span>
        <button
          className="underline text-ink-muted"
          onClick={() => setOpenDetail((o) => !o)}
        >
          {openDetail ? t("rental.inspection.hide") : t("rental.inspection.detail")}
        </button>
        {!inspection.tenantSignedAt && (
          <Button size="sm" disabled={busy} onClick={sign}>
            {t("rental.sign.button")}
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
            {inspection.keysCount != null && <span>{t(inspection.keysCount > 1 ? "rental.inspection.keys.other" : "rental.inspection.keys.one", { n: inspection.keysCount })}</span>}
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
      alert(t("rental.ticket.photoTooBig"));
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
      const created = await api.createTicket(leaseId, {
        title,
        description,
        photoDataUrl: photo ?? undefined,
      });
      onCreated(created);
      setTitle("");
      setDescription("");
      setPhoto(null);
    } catch (err) {
      alert(t("rental.error", { message: (err as Error).message }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-w-lg">
      <div>
        <Label htmlFor={`tt-${leaseId}`}>{t("rental.ticket.title")}</Label>
        <Input
          id={`tt-${leaseId}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("rental.ticket.titlePlaceholder")}
          required
          minLength={3}
        />
      </div>
      <div>
        <Label htmlFor={`td-${leaseId}`}>{t("rental.ticket.description")}</Label>
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
        <Label htmlFor={`tp-${leaseId}`}>{t("rental.ticket.photo")}</Label>
        <input
          id={`tp-${leaseId}`}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFile}
          className="block text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={busy}>
        {busy ? t("rental.sending") : t("rental.ticket.submit")}
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
        {t("rental.notice.givenOn")} <strong>{fmtDate(lease.noticeGivenAt)}</strong> {t("rental.notice.leaseEndsOn")}{" "}
        <strong>{lease.noticeEffectiveDate ? fmtDate(lease.noticeEffectiveDate) : "—"}</strong>.
        {lease.noticeNote ? <span className="text-ink-muted"> {lease.noticeNote}</span> : null}
      </p>
    );
  }

  const active = lease.status === "ACTIVE" || lease.status === "SIGNED";
  if (!active) {
    return <p className="text-sm text-ink-muted">{t("rental.notice.onlyActive")}</p>;
  }

  if (!open) {
    return (
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        {t("rental.notice.give")}
      </Button>
    );
  }

  const submit = async () => {
    if (!confirm(t("rental.notice.confirm"))) return;
    setBusy(true);
    try {
      const updated = await api.giveNotice(lease.id, {
        desiredDate: desired || undefined,
        note: note || undefined,
      });
      onUpdate({ ...lease, ...updated });
      setOpen(false);
    } catch (e) {
      alert(t("rental.error", { message: (e as Error).message }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 max-w-lg text-sm">
      <p className="text-ink-muted">
        {t("rental.notice.info1", { n: lease.noticePeriod })}{" "}
        <strong>{minDate.toLocaleDateString("fr-FR")}</strong>. {t("rental.notice.info2")}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>{t("rental.notice.desiredDate")}</Label>
          <Input type="date" value={desired} onChange={(e) => setDesired(e.target.value)} />
        </div>
        <div>
          <Label>{t("rental.notice.message")}</Label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" disabled={busy} onClick={submit}>
          {busy ? t("rental.sending") : t("rental.notice.submit")}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
          {t("rental.cancel")}
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

  if (amendments === null) return <p className="text-sm text-ink-muted">{t("rental.loading")}</p>;
  if (amendments.length === 0)
    return <p className="text-sm text-ink-muted">{t("rental.amendments.empty")}</p>;

  const sign = async (id: string) => {
    if (!confirm(t("rental.amendments.signConfirm"))) return;
    setBusy(id);
    try {
      const signed = await api.signAmendment(lease.id, id);
      setAmendments((arr) => (arr ?? []).map((a) => (a.id === signed.id ? signed : a)));
    } catch (e) {
      alert(t("rental.error", { message: (e as Error).message }));
    } finally {
      setBusy(null);
    }
  };

  return (
    <ul className="space-y-2 text-sm">
      {amendments.map((a) => (
        <li key={a.id} className="flex flex-wrap items-center gap-2">
          <span>
            {t("rental.amendments.on")} <strong>{fmtDate(a.effectiveDate)}</strong> :
            {a.newMonthlyRent != null && <> {t("rental.amendments.rent")} <strong>{fmtMoney(a.newMonthlyRent)}</strong></>}
            {a.newCharges != null && <> {t("rental.amendments.charges")} <strong>{fmtMoney(a.newCharges)}</strong></>}
            {a.newEndDate != null && <> {t("rental.amendments.end")} <strong>{fmtDate(a.newEndDate)}</strong></>}
          </span>
          {a.note && <span className="text-ink-muted">— {a.note}</span>}
          {a.tenantSignedAt ? (
            <Badge tone="success">{t("rental.amendments.signedOn", { date: fmtDate(a.tenantSignedAt) })}</Badge>
          ) : (
            <Button size="sm" disabled={busy === a.id} onClick={() => sign(a.id)}>
              {t("rental.sign.button")}
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
    return <p className="text-sm text-ink-muted">{t("rental.coTenants.empty")}</p>;

  const mine = coTenants.find((c) => c.email === user?.email);

  const sign = async () => {
    if (!confirm(t("rental.coTenants.signConfirm"))) return;
    setBusy(true);
    try {
      const signed = await api.signAsCoTenant(lease.id);
      setCoTenants((arr) => arr.map((c) => (c.id === signed.id ? signed : c)));
    } catch (e) {
      alert(t("rental.error", { message: (e as Error).message }));
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
            {c.signedAt && <span className="text-ink-muted">{t("rental.coTenants.signedOn", { date: fmtDate(c.signedAt) })}</span>}
          </li>
        ))}
      </ul>
      {mine && !mine.signedAt && (
        <Button size="sm" disabled={busy} onClick={sign}>
          {t("rental.coTenants.sign")}
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
    ? { text: t("rental.insurance.none"), tone: "accent" as const }
    : new Date(latest.validUntil).getTime() < now
      ? { text: t("rental.insurance.expired", { date: fmtDate(latest.validUntil) }), tone: "accent" as const }
      : new Date(latest.validUntil).getTime() < now + 30 * 86400000
        ? { text: t("rental.insurance.expiring", { date: fmtDate(latest.validUntil) }), tone: "accent" as const }
        : { text: t("rental.insurance.valid", { date: fmtDate(latest.validUntil) }), tone: "success" as const };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      alert(t("rental.insurance.fileTooBig"));
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
      alert(t("rental.error", { message: (e as Error).message }));
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
          <Label>{t("rental.insurance.file")}</Label>
          <input
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            onChange={onFile}
            className="block text-sm"
          />
        </div>
        <div>
          <Label>{t("rental.insurance.validUntil")}</Label>
          <Input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
        </div>
        <Button size="sm" disabled={busy || !file || !validUntil} onClick={submit}>
          {busy ? t("rental.sending") : t("rental.insurance.submit")}
        </Button>
      </div>
    </div>
  );
}


// ─── Régularisations de charges (lecture) ───────────────────────────

function ChargeRegsBlock({ leaseId }: { leaseId: string }) {
  const [regs, setRegs] = React.useState<ChargeRegularization[] | null>(null);

  React.useEffect(() => {
    api.listChargeRegularizations(leaseId).then(setRegs).catch(() => setRegs([]));
  }, [leaseId]);

  if (regs === null) return <p className="text-sm text-ink-muted">{t("rental.loading")}</p>;
  if (regs.length === 0)
    return <p className="text-sm text-ink-muted">{t("rental.charges.empty")}</p>;

  return (
    <ul className="space-y-1 text-sm">
      {regs.map((r) => (
        <li key={r.id} className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{r.periodLabel}</span>
          <span className="text-ink-muted">
            {t("rental.charges.detail", {
              provisions: fmtMoney(r.provisionsCollected),
              actual: fmtMoney(r.actualCharges),
            })}
          </span>
          {r.balance > 0 ? (
            <Badge tone="accent">{t("rental.charges.toPay", { amount: fmtMoney(r.balance) })}</Badge>
          ) : r.balance < 0 ? (
            <Badge tone="brand">{t("rental.charges.toRefund", { amount: fmtMoney(-r.balance) })}</Badge>
          ) : (
            <Badge tone="success">{t("rental.charges.balanced")}</Badge>
          )}
          {r.note && <span className="text-ink-muted">— {r.note}</span>}
        </li>
      ))}
    </ul>
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
          {t("rental.section.deposit")}
        </h3>
        <DepositInfo lease={lease} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.inspections")}
        </h3>
        {inspections === null ? (
          <p className="text-sm text-ink-muted">{t("rental.loading")}</p>
        ) : inspections.length === 0 ? (
          <p className="text-sm text-ink-muted">
            {t("rental.inspection.empty")}
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

      {lease.ownerNoticeGivenAt && (
        <div className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-4 py-3 text-sm">
          {t("rental.ownerNotice.given")} <strong>{fmtDate(lease.ownerNoticeGivenAt)}</strong>{" "}
          ({noticeReasonLabel(lease.ownerNoticeReason)}) {t("rental.ownerNotice.endOn")}{" "}
          <strong>{lease.ownerNoticeEffectiveDate ? fmtDate(lease.ownerNoticeEffectiveDate) : "—"}</strong>.
          {lease.ownerNoticeNote ? <span className="text-ink-muted"> {lease.ownerNoticeNote}</span> : null}
        </div>
      )}

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.notice")}
        </h3>
        <NoticeBlock lease={lease} onUpdate={(l) => onLeaseUpdate?.(l)} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.amendments")}
        </h3>
        <AmendmentsBlock lease={lease} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.coTenants")}
        </h3>
        <CoTenantsBlock lease={lease} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.charges")}
        </h3>
        <ChargeRegsBlock leaseId={lease.id} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.insurance")}
        </h3>
        <InsuranceBlock lease={lease} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            {t("rental.section.tickets")}
          </h3>
          <Button size="sm" variant="secondary" onClick={() => setShowForm((s) => !s)}>
            {showForm ? t("rental.ticket.close") : t("rental.ticket.report")}
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
          <p className="text-sm text-ink-muted">{t("rental.loading")}</p>
        ) : tickets.length === 0 ? (
          <p className="text-sm text-ink-muted">{t("rental.ticket.empty")}</p>
        ) : (
          <ul className="space-y-2">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="text-sm flex flex-wrap items-center gap-2">
                <Badge tone={TICKET_TONE[ticket.status]}>{t("rental.ticket." + ticket.status)}</Badge>
                <span className="font-medium">{ticket.title}</span>
                <span className="text-ink-muted">· {fmtDate(ticket.createdAt)}</span>
                {ticket.status === "RESOLVED" && ticket.resolutionNote && (
                  <span className="text-ink-muted">— {ticket.resolutionNote}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
