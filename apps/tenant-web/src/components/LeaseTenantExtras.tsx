"use client";

import * as React from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Input,
  Label,
  Textarea,
  DOC_ACCEPT,
  IMAGE_ACCEPT,
  IMAGE_MIME_TYPES,
  DOC_MIME_TYPES,
  fmtDate as fmtDateShared,
  fmtMoney as fmtMoneyShared,
  openDataUrl,
  compressImage,
  readFileAsDataUrl,
  toast,
  Icon,
  FileInput,
} from "@hwe/ui";
import { leaseCurrency } from "@hwe/types";
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

const fmtDate = (iso: string) => fmtDateShared(iso, "medium");

/** Montant dans la devise du bail (F2) — jamais d'EUR implicite. */
const money = (n: number, lease: LeaseContract) => fmtMoneyShared(n, leaseCurrency(lease));

/**
 * État constaté d'un élément d'état des lieux : valeur stockée (code stable ou
 * ancien libellé français) → libellé traduit (U4).
 */
const CONDITION_KEYS: Record<string, string> = {
  GOOD: "good",
  Bon: "good",
  WORN: "worn",
  Usé: "worn",
  TO_REPAIR: "repair",
  REPAIR: "repair",
  "À réparer": "repair",
  NEW: "new",
  Neuf: "new",
};
function conditionLabel(c: string) {
  const k = CONDITION_KEYS[c];
  return k ? t("fix.condition." + k) : c;
}

/** Lit un fichier après contrôle du type et de la taille ; null si refusé (toast). */
async function pickFile(f: File, allowed: readonly string[], maxBytes: number, tooBigKey: string) {
  if (!allowed.includes(f.type)) {
    toast.error(t(allowed.includes("application/pdf") ? "fix.file.docType" : "fix.file.imageType"));
    return null;
  }
  if (f.size > maxBytes) {
    toast.error(t(tooBigKey));
    return null;
  }
  try {
    return await readFileAsDataUrl(f);
  } catch (e) {
    toast.error(e);
    return null;
  }
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
            {" "}{t("rental.deposit.retained")} <strong>{money(lease.depositRetained, lease)}</strong>
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
        {t("rental.deposit.paidOn")} <strong>{fmtDate(lease.depositPaidAt)}</strong> ({money(lease.deposit, lease)})
      </p>
    );
  }
  return (
    <p className="text-sm text-ink-muted">
      {t("rental.deposit.notPaid", { amount: money(lease.deposit, lease) })}
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
      toast.success(t("fix.inspection.signed"));
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="text-sm space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium w-16">{t("rental.inspection.type." + inspection.type)}</span>
        <span>{fmtDate(inspection.date)}</span>
        <span title={t("rental.inspection.ownerTitle")}><Icon name={inspection.ownerSignedAt ? "checkCircle" : "hourglass"} size={14} className={inspection.ownerSignedAt ? "text-success" : "text-ink-subtle"} /> {t("rental.inspection.ownerShort")}</span>
        <span title={t("rental.inspection.youTitle")}><Icon name={inspection.tenantSignedAt ? "checkCircle" : "hourglass"} size={14} className={inspection.tenantSignedAt ? "text-success" : "text-ink-subtle"} /> {t("rental.inspection.youShort")}</span>
        <button
          type="button"
          aria-expanded={openDetail}
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
      {inspection.ownerSignedAt && inspection.ownerSignatureMention && (
        <p className="text-xs text-ink-muted [overflow-wrap:anywhere]">
          {t("pro.inspection.mention", { mention: inspection.ownerSignatureMention })}
        </p>
      )}
      {openDetail && (
        <div className="rounded-lg border border-border bg-brand-50/60 dark:bg-brand-900/20 p-3 space-y-2">
          {(inspection.items ?? []).length > 0 && (
            <ul className="space-y-1">
              {(inspection.items ?? []).map((it, i) => (
                <li key={i} className="[overflow-wrap:anywhere]">
                  <strong>{it.label}</strong> — {conditionLabel(it.condition)}
                  {it.note ? <span className="text-ink-muted"> · {it.note}</span> : null}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-4 text-ink-muted">
            {inspection.meterElectricity && <span className="inline-flex items-center gap-1"><Icon name="zap" size={14} />{inspection.meterElectricity}</span>}
            {inspection.meterWater && <span className="inline-flex items-center gap-1"><Icon name="droplet" size={14} />{inspection.meterWater}</span>}
            {inspection.meterGas && <span className="inline-flex items-center gap-1"><Icon name="flame" size={14} />{inspection.meterGas}</span>}
            {inspection.keysCount != null && <span>{t("rental.inspection.keys", { count: inspection.keysCount })}</span>}
          </div>
          {inspection.generalNote && (
            <p className="whitespace-pre-line [overflow-wrap:anywhere]">{inspection.generalNote}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Incidents ──────────────────────────────────────────────────────────────

export function TicketForm({
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

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!(IMAGE_MIME_TYPES as readonly string[]).includes(f.type)) {
      toast.error(t("fix.file.imageType"));
      return;
    }
    try {
      // Photo compressée avant envoi (corps JSON limité côté API).
      setPhoto(await compressImage(f));
    } catch {
      toast.error(t("fix.file.openError"));
    }
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
      toast.success(t("fix.ticket.created"));
    } catch (err) {
      toast.error(err);
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
        <FileInput id={`tp-${leaseId}`} accept={IMAGE_ACCEPT} onChange={onFile} />
        {photo && <p className="text-xs text-ink-muted mt-1 inline-flex items-center gap-1"><Icon name="check" size={13} className="text-success" />{t("fix.file.ready")}</p>}
      </div>
      <Button type="submit" size="sm" disabled={busy}>
        {busy ? t("rental.sending") : t("rental.ticket.submit")}
      </Button>
    </form>
  );
}


/** Une ligne d'incident : statut, titre, date, photo, réponse du propriétaire. */
export function TicketRow({ ticket, place }: { ticket: Ticket; place?: string }) {
  return (
    <li className="text-sm flex flex-wrap items-center gap-2 min-w-0">
      <Badge tone={TICKET_TONE[ticket.status]}>{t("rental.ticket." + ticket.status)}</Badge>
      <span className="font-medium min-w-0 [overflow-wrap:anywhere]">{ticket.title}</span>
      {place && <span className="text-ink-muted min-w-0 [overflow-wrap:anywhere]">· {place}</span>}
      <span className="text-ink-muted">· {fmtDate(ticket.createdAt)}</span>
      {ticket.photoDataUrl && (
        <button
          type="button"
          className="underline text-ink-muted"
          onClick={() => {
            if (!openDataUrl(ticket.photoDataUrl, "incident")) toast.error(t("fix.file.openError"));
          }}
        >
          {t("fix.ticket.photo")}
        </button>
      )}
      {ticket.status === "RESOLVED" && ticket.resolutionNote && (
        <span className="text-ink-muted min-w-0 [overflow-wrap:anywhere]">— {ticket.resolutionNote}</span>
      )}
    </li>
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
        {lease.noticeNote ? <span className="text-ink-muted [overflow-wrap:anywhere]"> {lease.noticeNote}</span> : null}
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
      toast.success(t("fix.notice.sent"));
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 max-w-lg text-sm">
      <p className="text-ink-muted">
        {t("rental.notice.info1", { count: lease.noticePeriod })}{" "}
        <strong>{fmtDateShared(minDate, "long", { utc: false })}</strong>. {t("rental.notice.info2")}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`nd-${lease.id}`}>{t("rental.notice.desiredDate")}</Label>
          <Input id={`nd-${lease.id}`} type="date" value={desired} onChange={(e) => setDesired(e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`nm-${lease.id}`}>{t("rental.notice.message")}</Label>
          <Input id={`nm-${lease.id}`} value={note} maxLength={1000} onChange={(e) => setNote(e.target.value)} />
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

function AmendmentsBlock({ lease, canSign }: { lease: LeaseContract; canSign: boolean }) {
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
      setAmendments((arr) => (arr ?? []).map((a) => (a.id === signed.id ? { ...a, ...signed } : a)));
      toast.success(t("fix.amendment.signed"));
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(null);
    }
  };

  return (
    <ul className="space-y-2 text-sm">
      {amendments.map((a) => (
        <li key={a.id} className="flex flex-wrap items-center gap-2">
          <span className="min-w-0 [overflow-wrap:anywhere]">
            {t("rental.amendments.on")} <strong>{fmtDate(a.effectiveDate)}</strong> :
            {a.newMonthlyRent != null && <> {t("rental.amendments.rent")} <strong>{money(a.newMonthlyRent, lease)}</strong></>}
            {a.newCharges != null && <> {t("rental.amendments.charges")} <strong>{money(a.newCharges, lease)}</strong></>}
            {a.newEndDate != null && <> {t("rental.amendments.end")} <strong>{fmtDate(a.newEndDate)}</strong></>}
          </span>
          {a.note && <span className="text-ink-muted [overflow-wrap:anywhere]">— {a.note}</span>}
          {a.tenantSignedAt ? (
            <Badge tone="success">{t("rental.amendments.signedOn", { date: fmtDate(a.tenantSignedAt) })}</Badge>
          ) : canSign ? (
            <Button size="sm" disabled={busy === a.id} onClick={() => sign(a.id)}>
              {t("rental.sign.button")}
            </Button>
          ) : (
            <Badge tone="neutral">{t("fix.amendment.awaitPrimary")}</Badge>
          )}
          {/* Préparé par un pro : le propriétaire doit aussi signer. */}
          {!a.ownerSignedAt && (
            <Badge tone="accent">{t("pro.amendment.awaitingOwner")}</Badge>
          )}
          {/* Avenant appliqué à sa date d'effet seulement (contrat §9). */}
          {a.tenantSignedAt && a.ownerSignedAt && !a.appliedAt && (
            <span className="text-xs text-ink-muted">
              {t("fix.amendment.pendingApply", { date: fmtDate(a.effectiveDate) })}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

// ─── Colocataires ─────────────────────────────────────────────────

function CoTenantsBlock({ lease, onMerge }: { lease: LeaseContract; onMerge?: (l: LeaseContract) => void }) {
  const { user } = useAuth();
  const [coTenants, setCoTenants] = React.useState(lease.coTenants ?? []);
  const [busy, setBusy] = React.useState(false);

  if (coTenants.length === 0)
    return <p className="text-sm text-ink-muted">{t("rental.coTenants.empty")}</p>;

  const me = user?.email?.trim().toLowerCase();
  const mine = coTenants.find((c) => c.email.trim().toLowerCase() === me);

  const sign = async () => {
    if (!confirm(t("rental.coTenants.signConfirm"))) return;
    setBusy(true);
    try {
      const signed = await api.signAsCoTenant(lease.id);
      // Sous-ressource renvoyée : fusionnée dans le bail (contrat / signatures à jour).
      const next = coTenants.map((c) => (c.id === signed.id ? { ...c, ...signed } : c));
      setCoTenants(next);
      onMerge?.({ ...lease, coTenants: next });
      toast.success(t("fix.lease.signed"));
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2 text-sm">
      <ul className="space-y-1">
        {coTenants.map((c) => (
          <li key={c.id} className="flex flex-wrap items-center gap-2">
            <Icon name={c.signedAt ? "checkCircle" : "hourglass"} size={16} className={c.signedAt ? "text-success" : "text-ink-subtle"} />
            <span className="font-medium">{c.firstName} {c.lastName}</span>
            <span className="text-ink-muted [overflow-wrap:anywhere] min-w-0">{c.email}</span>
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

function InsuranceBlock({ lease, onMerge }: { lease: LeaseContract; onMerge?: (l: LeaseContract) => void }) {
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

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setFile(await pickFile(f, DOC_MIME_TYPES, 8 * 1024 * 1024, "rental.insurance.fileTooBig"));
  };

  const submit = async () => {
    if (!file || !validUntil) return;
    setBusy(true);
    try {
      const created = await api.addInsurance(lease.id, { fileUrl: file, validUntil });
      const next = [created, ...certs];
      setCerts(next);
      onMerge?.({ ...lease, insurances: next });
      setFile(null);
      setValidUntil("");
      toast.success(t("fix.insurance.sent"));
    } catch (e) {
      toast.error(e);
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
        <div className="min-w-0 max-w-full">
          <Label htmlFor={`if-${lease.id}`}>{t("rental.insurance.file")}</Label>
          <FileInput id={`if-${lease.id}`} accept={DOC_ACCEPT} onChange={onFile} />
        </div>
        <div>
          <Label htmlFor={`iv-${lease.id}`}>{t("rental.insurance.validUntil")}</Label>
          <Input id={`iv-${lease.id}`} type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
        </div>
        <Button size="sm" disabled={busy || !file || !validUntil} onClick={submit}>
          {busy ? t("rental.sending") : t("rental.insurance.submit")}
        </Button>
      </div>
    </div>
  );
}


// ─── Régularisations de charges (lecture) ───────────────────────────

function ChargeRegsBlock({ lease }: { lease: LeaseContract }) {
  const leaseId = lease.id;
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
              provisions: money(r.provisionsCollected, lease),
              actual: money(r.actualCharges, lease),
            })}
          </span>
          {r.balance > 0 ? (
            <Badge tone="accent">{t("rental.charges.toPay", { amount: money(r.balance, lease) })}</Badge>
          ) : r.balance < 0 ? (
            <Badge tone="brand">{t("rental.charges.toRefund", { amount: money(-r.balance, lease) })}</Badge>
          ) : (
            <Badge tone="success">{t("rental.charges.balanced")}</Badge>
          )}
          {r.note && <span className="text-ink-muted [overflow-wrap:anywhere]">— {r.note}</span>}
        </li>
      ))}
    </ul>
  );
}

// ─── Bloc combiné, monté dans la carte de bail ─────────────────────────────

export function LeaseTenantExtras({
  lease,
  onLeaseUpdate,
  isPrimary = true,
}: {
  lease: LeaseContract;
  onLeaseUpdate?: (l: LeaseContract) => void;
  /** Locataire principal ? (sinon colocataire : ni préavis ni signature d'avenant). */
  isPrimary?: boolean;
}) {
  const [inspections, setInspections] = React.useState<Inspection[] | null>(null);
  const [tickets, setTickets] = React.useState<Ticket[] | null>(null);

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

      <section id={`bail-${lease.id}-inspections`} className="scroll-mt-28">
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
          {lease.ownerNoticeNote ? <span className="text-ink-muted [overflow-wrap:anywhere]"> {lease.ownerNoticeNote}</span> : null}
        </div>
      )}

      <section id={`bail-${lease.id}-fin`} className="scroll-mt-28">
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.notice")}
        </h3>
        {isPrimary ? (
          <NoticeBlock lease={lease} onUpdate={(l) => onLeaseUpdate?.(l)} />
        ) : (
          <p className="text-sm text-ink-muted">{t("fix.coTenant.noticeByPrimary")}</p>
        )}
      </section>

      <section id={`bail-${lease.id}-avenants`} className="scroll-mt-28">
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.amendments")}
        </h3>
        <AmendmentsBlock lease={lease} canSign={isPrimary} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.coTenants")}
        </h3>
        <CoTenantsBlock lease={lease} onMerge={onLeaseUpdate} />
      </section>

      <section>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.charges")}
        </h3>
        <ChargeRegsBlock lease={lease} />
      </section>

      <section id={`bail-${lease.id}-assurance`} className="scroll-mt-28">
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.insurance")}
        </h3>
        <InsuranceBlock lease={lease} onMerge={onLeaseUpdate} />
      </section>

      {/* Incidents : gérés dans l'onglet dédié (tous baux) ; ici un simple résumé. */}
      <section id={`bail-${lease.id}-incidents`} className="scroll-mt-28">
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {t("rental.section.tickets")}
        </h3>
        <Link
          href="/mes-incidents"
          className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm hover:border-brand-400 transition-colors"
        >
          <span className="min-w-0">
            {tickets === null
              ? t("rental.loading")
              : t("rental.tickets.open", { count: tickets.filter((x) => x.status !== "RESOLVED").length })}
          </span>
          <span className="shrink-0 inline-flex items-center gap-1 font-medium text-brand-600 dark:text-brand-300">
            {t("rental.tickets.manage")}
            <Icon name="arrowRight" size={14} />
          </span>
        </Link>
      </section>
    </>
  );
}
