"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Button,
  Input,
  Label,
  Select,
  Textarea,
  Badge,
  EmptyState,
  ErrorState,
  isNotFound,
  toast,
  fmtMoney,
  fmtDate,
  fmtDateTime,
  downloadText,
  Icon,
} from "@hwe/ui";
import { useAuth } from "../../../../lib/auth-context";
import { api } from "../../../../lib/api";
import { LeaseExtras } from "../../../../components/LeaseExtras";
import { t } from "../../../../lib/i18n";
import { generateLeaseContract, leaseCurrency } from "@hwe/types";
import { usePortfolioItem } from "../../../../lib/pro";
import { ConfirmDialog, LockedNote, WarningNote } from "../../../../components/pro/ProUi";
import type { Property, LeaseContract, LeaseStatus } from "@hwe/types";

// Contrat §9 : SIGNED (début futur) et ACTIVE sont tous deux « signé / en cours ».
const STATUS_TONE: Record<LeaseStatus, "neutral" | "success" | "accent" | "danger"> = {
  DRAFT: "neutral",
  SIGNED: "success",
  ACTIVE: "success",
  EXPIRED: "neutral",
  TERMINATED: "danger",
};

/** Aucune partie n'a signé → bail encore modifiable / supprimable. */
const isUnsigned = (l: LeaseContract) => !l.ownerSignedAt && !l.tenantSignedAt;

/** Date ISO → valeur d'<input type="date"> (UTC, date civile). */
const toDateInput = (iso?: string | null) => (iso ? iso.slice(0, 10) : "");

// ─── Component ────────────────────────────────────────────────────────────────

type View = "list" | "create" | "edit" | "preview";

const EMPTY_FORM = {
  tenantFirstName: "",
  tenantLastName: "",
  tenantEmail: "",
  tenantPhone: "",
  tenantAddress: "",
  monthlyRent: "",
  charges: "0",
  deposit: "",
  startDate: "",
  endDate: "",
  noticePeriod: "1",
  rentPaymentDay: "1",
  furnished: false,
  specialClauses: "",
};

export default function LeasePage() {
  // Session et rôle garantis par dashboard/layout.tsx.
  const { user } = useAuth();
  const params = useParams<{ id: string }>();

  const [property, setProperty] = React.useState<Property | null>(null);
  const [leases, setLeases] = React.useState<LeaseContract[]>([]);
  const [working, setWorking] = React.useState(true);
  const [loadError, setLoadError] = React.useState<unknown>(null);
  const [tick, setTick] = React.useState(0);
  const [view, setView] = React.useState<View>("list");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState(EMPTY_FORM);
  // Pro mandataire : droits sur le bien (signature réservée au propriétaire,
  // sauf compte propriétaire non activé → « pour le compte de »).
  const { pro, item } = usePortfolioItem(params?.id);
  const [behalfOpen, setBehalfOpen] = React.useState(false);
  const [signing, setSigning] = React.useState(false);
  const ownerName = item?.owner ? `${item.owner.firstName} ${item.owner.lastName}` : "";
  const canSignAsPro = pro && !!item?.access?.can.SIGN_LEASE;
  // Mandat de mise en location terminé (bail signé) : lecture seule.
  const readOnly = pro && !!item?.access && !item.access.can.EDIT_LISTING;

  React.useEffect(() => {
    if (!params?.id || !user) return;
    let cancelled = false;
    setWorking(true);
    setLoadError(null);
    Promise.all([api.getProperty(params.id), api.listLeases(params.id)])
      .then(([prop, ls]) => {
        if (cancelled) return;
        setProperty(prop);
        setLeases(ls);
      })
      .catch((e) => {
        if (!cancelled) setLoadError(e);
      })
      .finally(() => {
        if (!cancelled) setWorking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params?.id, user, tick]);

  const selectedLease = leases.find((l) => l.id === selectedId) ?? null;
  const currency = (property?.currency || "EUR").toUpperCase();

  // F8 : une réponse de mutation est FUSIONNÉE (jamais d'écrasement des
  // relations insurances/coTenants/amendments).
  const mergeLease = React.useCallback((updated: Partial<LeaseContract> & { id: string }) => {
    setLeases((l) => l.map((x) => (x.id === updated.id ? { ...x, ...updated } : x)));
  }, []);

  const field = (key: keyof typeof EMPTY_FORM) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  /** Contrôles avant envoi (F21) : dates cohérentes, montants positifs. */
  const validate = (): string | null => {
    const rent = parseFloat(form.monthlyRent);
    const deposit = parseFloat(form.deposit);
    const charges = parseFloat(form.charges || "0");
    if (!(rent >= 0) || !(deposit >= 0) || !(charges >= 0)) return t("lease.err.amounts");
    if (form.endDate && form.startDate && form.endDate <= form.startDate) return t("lease.err.dates");
    return null;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params?.id) return;
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setSubmitting(true);
    try {
      const created = await api.createLease(params.id, {
        tenantFirstName: form.tenantFirstName.trim(),
        tenantLastName: form.tenantLastName.trim(),
        tenantEmail: form.tenantEmail.trim(),
        tenantPhone: form.tenantPhone.trim() || undefined,
        tenantAddress: form.tenantAddress.trim() || undefined,
        monthlyRent: parseFloat(form.monthlyRent),
        charges: parseFloat(form.charges) || 0,
        deposit: parseFloat(form.deposit),
        startDate: form.startDate,
        endDate: form.endDate || undefined,
        noticePeriod: parseInt(form.noticePeriod),
        rentPaymentDay: parseInt(form.rentPaymentDay),
        furnished: form.furnished,
        specialClauses: form.specialClauses.trim() || undefined,
      });
      setLeases((l) => [created, ...l]);
      setForm(EMPTY_FORM);
      setView("list");
      toast.success(t("lease.created"));
    } catch (err2) {
      // 409 = chevauchement avec un autre bail (contrat §9) : message de l'API.
      toast.error(err2);
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (lease: LeaseContract) => {
    setSelectedId(lease.id);
    setForm({
      ...EMPTY_FORM,
      tenantFirstName: lease.tenantFirstName,
      tenantLastName: lease.tenantLastName,
      tenantEmail: lease.tenantEmail,
      monthlyRent: String(lease.monthlyRent),
      charges: String(lease.charges ?? 0),
      deposit: String(lease.deposit),
      startDate: toDateInput(lease.startDate),
      endDate: toDateInput(lease.endDate),
      specialClauses: lease.specialClauses ?? "",
    });
    setView("edit");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params?.id || !selectedLease) return;
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setSubmitting(true);
    try {
      // Contrat §9 : seuls ces champs, et seulement avant toute signature.
      const updated = await api.updateLease(params.id, selectedLease.id, {
        monthlyRent: parseFloat(form.monthlyRent),
        charges: parseFloat(form.charges) || 0,
        deposit: parseFloat(form.deposit),
        startDate: form.startDate,
        endDate: form.endDate || undefined,
        specialClauses: form.specialClauses,
      });
      mergeLease(updated);
      setForm(EMPTY_FORM);
      setView("list");
      toast.success(t("lease.updated"));
    } catch (err2) {
      toast.error(err2);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (leaseId: string) => {
    if (!confirm(t("lease.confirmDelete")) || !params?.id) return;
    try {
      await api.deleteLease(params.id, leaseId);
      setLeases((l) => l.filter((x) => x.id !== leaseId));
      toast.success(t("lease.deleted"));
    } catch (e) {
      toast.error(e);
    }
  };

  const openPreview = (lease: LeaseContract) => {
    setSelectedId(lease.id);
    setView("preview");
  };

  // F7 : générateur UNIQUE partagé avec l'espace locataire.
  const contractText =
    selectedLease && property
      ? generateLeaseContract({
          lease: selectedLease,
          property,
          owner: property.owner ?? user ?? undefined,
        })
      : "";

  const downloadContract = () => {
    if (!contractText || !selectedLease) return;
    downloadText(
      contractText,
      `contrat-bail-${selectedLease.tenantLastName.toLowerCase().replace(/[^a-z0-9-]+/gi, "-")}-${selectedLease.startDate.split("T")[0]}.txt`,
    );
  };

  if (loadError) {
    return isNotFound(loadError) ? (
      <EmptyState title={t("pf.notFound")} />
    ) : (
      <ErrorState error={loadError} title={t("lease.loadError")} onRetry={() => setTick((n) => n + 1)} />
    );
  }

  if (working) return <p className="text-ink-muted">{t("lease.loading")}</p>;

  if (property && property.listingType === "SALE") {
    return <EmptyState title={t("lease.saleNoLease")} />;
  }

  // ── Preview view ─────────────────────────────────────────────────────────────
  if (view === "preview" && selectedLease) {
    return (
      <section>
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setView("list")}
            className="text-sm text-ink-muted hover:underline"
          >
            {t("lease.backToContracts")}
          </button>
        </div>
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h1 className="font-display text-2xl">{t("lease.previewTitle")}</h1>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={downloadContract} variant="secondary">
              {t("lease.download")}
            </Button>
            {!selectedLease.ownerSignedAt && !pro && (
              <Button
                onClick={async () => {
                  if (!params?.id) return;
                  if (!confirm(t("lease.confirmSign"))) return;
                  try {
                    const updated = await api.signLease(params.id, selectedLease.id);
                    mergeLease(updated);
                    toast.success(t("lease.signedToast"));
                  } catch (e) {
                    toast.error(e);
                  }
                }}
              >
                <Icon name="signature" size={16} className="mr-1.5" />
                {t("lease.signBtn")}
              </Button>
            )}
            {!selectedLease.ownerSignedAt && canSignAsPro && (
              <Button variant="secondary" onClick={() => setBehalfOpen(true)}>
                <Icon name="signature" size={16} className="mr-1.5" />
                {t("pro.lease.signBehalf", { owner: ownerName })}
              </Button>
            )}
            {selectedLease.ownerSignedAt && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success bg-success/10 border border-success/30 rounded-lg px-3 py-2">
                <Icon name="checkCircle" size={16} />
                {t("lease.signedOn", { date: fmtDateTime(selectedLease.ownerSignedAt) })}
              </span>
            )}
          </div>
        </div>
        {selectedLease.preparedBy && (
          <p className="mb-3 text-sm text-ink-muted" data-prepared-by>
            <Icon name="clipboard" size={14} className="mr-1" />
            {t("pro.lease.preparedBy", {
              name: `${selectedLease.preparedBy.firstName} ${selectedLease.preparedBy.lastName}${selectedLease.preparedBy.agencyName ? ` (${selectedLease.preparedBy.agencyName})` : ""}`,
            })}
            {!pro && !selectedLease.ownerSignedAt && ` — ${t("pro.lease.reviewAndSign")}`}
          </p>
        )}
        {pro && !selectedLease.ownerSignedAt && !canSignAsPro && (
          <div className="mb-4">
            <LockedNote>{t("pro.lease.ownerSigns")}</LockedNote>
          </div>
        )}
        {behalfOpen && (
          <ConfirmDialog
            title={t("pro.lease.behalfTitle")}
            confirmLabel={t("pro.lease.behalfConfirm")}
            busy={signing}
            onClose={() => setBehalfOpen(false)}
            onConfirm={async () => {
              if (!params?.id) return;
              setSigning(true);
              try {
                const updated = await api.signLease(params.id, selectedLease.id);
                mergeLease(updated);
                toast.success(t("lease.signedToast"));
                setBehalfOpen(false);
              } catch (e) {
                toast.error(e);
              } finally {
                setSigning(false);
              }
            }}
          >
            <WarningNote title={t("pro.lease.behalfWarnTitle")}>
              {t("pro.lease.behalfWarn", { owner: ownerName, agency: item?.managedBy?.name ?? "" })}
            </WarningNote>
          </ConfirmDialog>
        )}
        <div className="bg-surface border border-border rounded-2xl p-4 sm:p-8 shadow-sm overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap [overflow-wrap:anywhere] text-ink leading-relaxed">
            {contractText}
          </pre>
        </div>
        {/* Signature status */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Icon name={selectedLease.ownerSignedAt ? "checkCircle" : "hourglass"} size={16} className={selectedLease.ownerSignedAt ? "text-success" : "text-ink-subtle"} />
            <span className="text-ink-muted">
              {t("lease.ownerColon")}{" "}
              {selectedLease.ownerSignedAt
                ? t("lease.signedOnShort", {
                    date: fmtDateTime(selectedLease.ownerSignedAt),
                  })
                : t("lease.pending")}
            </span>
            {selectedLease.ownerSignatureMention && (
              <span className="block text-xs text-ink-muted italic" data-owner-mention>
                {selectedLease.ownerSignatureMention}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name={selectedLease.tenantSignedAt ? "checkCircle" : "hourglass"} size={16} className={selectedLease.tenantSignedAt ? "text-success" : "text-ink-subtle"} />
            <span className="text-ink-muted">
              {t("lease.tenantColon")}{" "}
              {selectedLease.tenantSignedAt
                ? t("lease.signedOnShort", {
                    date: fmtDateTime(selectedLease.tenantSignedAt),
                  })
                : t("lease.pending")}
            </span>
          </div>
        </div>
      </section>
    );
  }

  // ── Create form view ─────────────────────────────────────────────────────────
  if (view === "create" || view === "edit") {
    const editing = view === "edit";
    return (
      <section>
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setView("list")}
            className="text-sm text-ink-muted hover:underline"
          >
            {t("lease.backToContracts")}
          </button>
        </div>
        <h1 className="font-display text-3xl mb-2">{editing ? t("lease.editTitle") : t("lease.newTitle")}</h1>
        <p className="text-sm text-ink-muted mb-8">{t("lease.amountsIn", { currency })}</p>

        <form onSubmit={editing ? handleUpdate : handleCreate} className="max-w-2xl space-y-8">
          {/* Locataire (non modifiable après création) */}
          <fieldset disabled={editing} className="space-y-4 border border-border rounded-xl p-4 sm:p-6 disabled:opacity-70">
            <legend className="font-semibold px-2 text-sm uppercase tracking-wide text-ink-muted">
              {t("lease.section.tenant")}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tf">{t("lease.firstName")}</Label>
                <Input id="tf" {...field("tenantFirstName")} required />
              </div>
              <div>
                <Label htmlFor="tl">{t("lease.lastName")}</Label>
                <Input id="tl" {...field("tenantLastName")} required />
              </div>
            </div>
            <div>
              <Label htmlFor="te">{t("lease.email")}</Label>
              <Input id="te" type="email" autoComplete="off" {...field("tenantEmail")} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tp">{t("lease.phone")}</Label>
                <Input id="tp" type="tel" {...field("tenantPhone")} />
              </div>
              <div>
                <Label htmlFor="ta">{t("lease.currentAddress")}</Label>
                <Input id="ta" {...field("tenantAddress")} />
              </div>
            </div>
          </fieldset>

          {/* Financial */}
          <fieldset className="space-y-4 border border-border rounded-xl p-4 sm:p-6">
            <legend className="font-semibold px-2 text-sm uppercase tracking-wide text-ink-muted">
              {t("lease.section.financial")}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rent">{t("lease.rentLabelCur", { currency })}</Label>
                <Input
                  id="rent"
                  type="number"
                  min="0"
                  step="0.01"
                  {...field("monthlyRent")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="charges">{t("lease.chargesLabelCur", { currency })}</Label>
                <Input
                  id="charges"
                  type="number"
                  min="0"
                  step="0.01"
                  {...field("charges")}
                />
              </div>
              <div>
                <Label htmlFor="deposit">{t("lease.depositLabelCur", { currency })}</Label>
                <Input
                  id="deposit"
                  type="number"
                  min="0"
                  step="0.01"
                  {...field("deposit")}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rpd">{t("lease.paymentDay")}</Label>
                <Select id="rpd" disabled={editing} {...field("rentPaymentDay")}>
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d === 1 ? t("lease.paymentDayFirst") : t("lease.paymentDayN", { d })}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </fieldset>

          {/* Duration */}
          <fieldset className="space-y-4 border border-border rounded-xl p-4 sm:p-6">
            <legend className="font-semibold px-2 text-sm uppercase tracking-wide text-ink-muted">
              {t("lease.section.duration")}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sd">{t("lease.startDate")}</Label>
                <Input id="sd" type="date" {...field("startDate")} required />
              </div>
              <div>
                <Label htmlFor="ed">{t("lease.endDate")}</Label>
                <Input id="ed" type="date" min={form.startDate || undefined} {...field("endDate")} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="np">{t("lease.noticePeriod")}</Label>
                <Select id="np" disabled={editing} {...field("noticePeriod")}>
                  <option value="1">{t("lease.notice.1")}</option>
                  <option value="2">{t("lease.notice.2")}</option>
                  <option value="3">{t("lease.notice.3")}</option>
                  <option value="6">{t("lease.notice.6")}</option>
                </Select>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.furnished}
                    disabled={editing}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, furnished: e.target.checked }))
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">{t("lease.furnishedCheckbox")}</span>
                </label>
              </div>
            </div>
          </fieldset>

          {/* Special clauses */}
          <fieldset className="space-y-4 border border-border rounded-xl p-4 sm:p-6">
            <legend className="font-semibold px-2 text-sm uppercase tracking-wide text-ink-muted">
              <label htmlFor="clauses">{t("lease.section.clauses")}</label>
            </legend>
            <Textarea
              id="clauses"
              value={form.specialClauses}
              onChange={(e) =>
                setForm((f) => ({ ...f, specialClauses: e.target.value }))
              }
              rows={5}
              placeholder={t("lease.clausesPlaceholder")}
            />
          </fieldset>

          <div className="flex gap-3">
            <Button type="submit" disabled={submitting}>
              {editing
                ? submitting
                  ? t("lease.saving")
                  : t("lease.saveChanges")
                : submitting
                  ? t("lease.creating")
                  : t("lease.createSubmit")}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setView("list")}
            >
              {t("lease.cancel")}
            </Button>
          </div>
        </form>
      </section>
    );
  }

  // ── List view ─────────────────────────────────────────────────────────────────
  return (
    <section>
      <div className="mb-2">
        <Link
          href={`/dashboard/${params?.id}/edit`}
          className="text-sm text-ink-muted hover:underline"
        >
          {t("lease.backToProperty")}
        </Link>
      </div>
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="font-display text-3xl mb-1">{t("lease.title")}</h1>
          <p className="text-ink-muted [overflow-wrap:anywhere]">
            {property?.title} — {property?.addressLine}, {property?.city}
          </p>
          <Link
            href="/dashboard/loyers"
            className="inline-block mt-1 text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
          >
            {t("lease.trackRents")}
          </Link>
        </div>
        {!readOnly && (
          <Button
            onClick={() => {
              setForm(EMPTY_FORM);
              setView("create");
            }}
          >
            {t("lease.newBtn")}
          </Button>
        )}
      </div>
      {readOnly && (
        <div className="mb-6">
          <LockedNote>{t("pro.lease.readOnly")}</LockedNote>
        </div>
      )}

      {leases.length === 0 ? (
        <EmptyState
          illustration="document"
          title={t("lease.emptyTitle")}
          description={t("lease.emptySub")}
          action={<Button onClick={() => setView("create")}>{t("lease.emptyCta")}</Button>}
        />
      ) : (
        <div className="space-y-4">
          {leases.map((lease) => {
            const cur = leaseCurrency(lease, currency);
            const name = `${lease.tenantFirstName} ${lease.tenantLastName}`;
            const unsigned = isUnsigned(lease);
            return (
            <div key={lease.id} className="rounded-2xl border border-border bg-surface p-4 sm:p-6 shadow-sm min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-semibold text-lg [overflow-wrap:anywhere] min-w-0">{name}</span>
                    <Badge tone={STATUS_TONE[lease.status]}>{t("lease.status." + lease.status)}</Badge>
                    {lease.shortStay && <Badge tone="ocean">{t("lease.shortStay")}</Badge>}
                  </div>
                  <p className="text-sm text-ink-muted [overflow-wrap:anywhere]">{lease.tenantEmail}</p>
                  {lease.preparedBy && (
                    <p className="text-xs text-ink-muted mt-1">
                      {t("pro.lease.preparedBy", {
                        name: `${lease.preparedBy.firstName} ${lease.preparedBy.lastName}${lease.preparedBy.agencyName ? ` (${lease.preparedBy.agencyName})` : ""}`,
                      })}
                    </p>
                  )}
                  {lease.ownerSignatureMention && (
                    <p className="text-xs text-ink-muted italic mt-1">{lease.ownerSignatureMention}</p>
                  )}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm">
                    {lease.shortStay ? (
                      // Contrat §9 : séjour courte durée = une échéance du total.
                      <span>
                        <Icon name="calendar" size={14} className="mr-1 text-ink-subtle" />
                        <strong>
                          {t("lease.stayLine", {
                            start: fmtDate(lease.startDate),
                            end: fmtDate(lease.endDate),
                            total: fmtMoney(lease.stayTotal ?? lease.monthlyRent + lease.charges, cur),
                          })}
                        </strong>
                      </span>
                    ) : (
                      <>
                        <span>
                          <Icon name="calendar" size={14} className="mr-1 text-ink-subtle" />{t("lease.cardStart")} <strong>{fmtDate(lease.startDate)}</strong>
                        </span>
                        {lease.endDate && (
                          <span>
                            {t("lease.cardEnd")} <strong>{fmtDate(lease.endDate)}</strong>
                          </span>
                        )}
                        <span>
                          <Icon name="wallet" size={14} className="mr-1 text-ink-subtle" />
                          <strong>
                            {fmtMoney(lease.monthlyRent + lease.charges, cur)} {t("lease.perMonth")}
                          </strong>
                          {lease.charges > 0 && (
                            <span className="text-ink-muted">
                              {" "}
                              {t("lease.inclCharges", { amount: fmtMoney(lease.charges, cur) })}
                            </span>
                          )}
                        </span>
                      </>
                    )}
                    <span>
                      <Icon name="lock" size={14} className="mr-1 text-ink-subtle" />{t("lease.cardDeposit")} <strong>{fmtMoney(lease.deposit, cur)}</strong>
                      {/* F21 : pas de « Infinity mois » si le loyer vaut 0. */}
                      {!lease.shortStay && lease.monthlyRent > 0 && lease.deposit > 0 && (
                        <span className="text-ink-muted">
                          {" "}
                          ({t("lease.depositMonths", { n: Math.round((lease.deposit / lease.monthlyRent) * 10) / 10 })})
                        </span>
                      )}
                    </span>
                    {lease.furnished && (
                      <span className="text-xs bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded-full">
                        {t("lease.furnishedBadge")}
                      </span>
                    )}
                  </div>
                  {!unsigned && lease.status !== "EXPIRED" && lease.status !== "TERMINATED" && (
                    <p className="text-xs text-ink-subtle mt-2">{t("lease.lockedHint")}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 sm:shrink-0">
                  <Button variant="secondary" size="sm" onClick={() => openPreview(lease)}>
                    {t("lease.viewContract")}
                  </Button>
                  {/* F20 / contrat §9 : plus d'« Activer » ni de « Résilier » ;
                      modifier / supprimer seulement avant toute signature. */}
                  {unsigned && !readOnly && (
                    <Button variant="secondary" size="sm" onClick={() => openEdit(lease)}>
                      {t("lease.edit")}
                    </Button>
                  )}
                  {unsigned && !readOnly && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(lease.id)}
                      aria-label={t("lease.deleteAria", { name })}
                    >
                      <Icon name="trash" size={16} />
                    </Button>
                  )}
                </div>
              </div>
              {params?.id && !readOnly && (
                <LeaseExtras propertyId={params.id} lease={lease} onLeaseUpdate={mergeLease} proAccess={pro ? item?.access ?? null : undefined} ownerName={ownerName} />
              )}
            </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-border flex gap-4 flex-wrap">
        <Link
          href={`/dashboard/${params?.id}/documents`}
          className="inline-flex items-center h-10 px-4 rounded-md text-sm font-medium bg-surface text-ink border border-border hover:border-ink/30"
        >
          {t("lease.legalDocs")}
        </Link>
        <Link
          href={`/dashboard/${params?.id}/edit`}
          className="inline-flex items-center h-10 px-4 rounded-md text-sm font-medium text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40"
        >
          {t("lease.backToPropertyBtn")}
        </Link>
      </div>
    </section>
  );
}
