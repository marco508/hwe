"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AnimatedBackground,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  ErrorState,
  Input,
  Label,
  SafeImage,
  Select,
  Textarea,
  IMAGE_ACCEPT,
  IMAGE_MIME_TYPES,
  fmtDate,
  fmtMoney,
  isApiError,
  compressImage,
  toast,
  errorText as errorTextOf,
  useAsync,
  useLoginRedirect,
  Icon,
  IconBadge,
  type IconName,
  Approx,
  paymentMethodLabel,
  FileInput,
} from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { t } from "../../lib/i18n";
import { api } from "../../lib/api";
import { payDayText } from "../../lib/rent-format";
import { useLandlordChat } from "../../lib/landlord-chat";
import type { OwnerPaymentMethod, RentPeriod, RentStatus, TenantRentBundle } from "../../lib/api";

/** Devise d'une échéance : figée sur la période, sinon celle du bail (F2, contrat §9). */
function periodCurrency(p: RentPeriod, leaseCurrency?: string | null) {
  return p.currency || leaseCurrency || "EUR";
}

/** Montant dû d'une échéance (nouveau champ amountDue, repli amount). */
function periodAmount(p: RentPeriod) {
  return p.amountDue ?? p.amount;
}

/** Valeur stable envoyée pour « Autre » (U4) ; libellé traduit à l'affichage. */
const OTHER_METHOD = "OTHER";
function methodLabel(m: string | null | undefined) {
  if (!m) return "";
  return m === OTHER_METHOD || m === "Autre" ? t("rent.declare.other") : paymentMethodLabel(m);
}


const STATUS_TONE: Record<RentStatus, "neutral" | "success" | "brand" | "accent"> = {
  DUE: "accent",
  DECLARED: "brand",
  PAID: "success",
  LATE: "neutral",
};

const STATUS_DOT: Record<RentStatus, string> = {
  DUE: "bg-accent-500",
  DECLARED: "bg-ocean-400",
  PAID: "bg-brand-500",
  LATE: "bg-danger",
};

/** Devine une icône selon le libellé du moyen de paiement. */
/** Moyen de paiement de l'agence mandataire (`agency-<id>`) → nom de l'agence. */
function agencyNameOf(m: { id: string; label: string }): string | null {
  if (!m.id.startsWith("agency-")) return null;
  return m.label.replace(/^[^—]*—\s*/, "").trim() || m.label;
}

function methodIcon(label: string): IconName {
  const l = label.toLowerCase();
  if (/(iban|virement|sepa|banque|bank)/.test(l)) return "landmark";
  if (/(momo|mobile|orange|mtn|wave|moov|m-pesa)/.test(l)) return "smartphone";
  if (/(paypal|lydia|revolut|wise|paylib)/.test(l)) return "creditCard";
  if (/(espèce|especes|cash|liquide)/.test(l)) return "banknote";
  if (/(chèque|cheque)/.test(l)) return "pen";
  return "wallet";
}

// ── Squelette de chargement ─────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-36 rounded-2xl skeleton" />
      <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
        <div className="h-5 w-1/3 rounded skeleton" />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="h-20 rounded-xl skeleton" />
          <div className="h-20 rounded-xl skeleton" />
        </div>
        <div className="h-4 w-1/4 rounded skeleton" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-12 rounded-lg skeleton" />
        ))}
      </div>
    </div>
  );
}

// ── Parcours en 3 étapes (repère visuel, toujours visible) ──────────────────

function HowItWorks() {
  const steps = [
    { icon: "1", title: t("rent.how.step1.title"), text: t("rent.how.step1.text") },
    { icon: "2", title: t("rent.how.step2.title"), text: t("rent.how.step2.text") },
    { icon: "3", title: t("rent.how.step3.title"), text: t("rent.how.step3.text") },
  ];
  return (
    <ol className="grid sm:grid-cols-3 gap-3">
      {steps.map((s) => (
        <li key={s.icon} className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface px-4 py-3">
          <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
            {s.icon}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink leading-tight">{s.title}</p>
            <p className="text-xs text-ink-muted mt-0.5">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ── Coordonnées de paiement du propriétaire ─────────────────────────────────

function PaymentMethods({ methods, propertyId }: { methods: OwnerPaymentMethod[]; propertyId: string }) {
  const [copied, setCopied] = React.useState<string | null>(null);
  const chat = useLandlordChat();

  if (methods.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-cream-50 dark:bg-white/[0.03] px-4 py-4 text-sm text-ink-muted">
        {t("rent.methods.empty")}{" "}
        {/* Discussion avec le bailleur (retrouvée ou ouverte), pas la messagerie en général. */}
        <button
          type="button"
          disabled={chat.busy}
          onClick={() => chat.open(propertyId)}
          className="font-medium text-brand-600 dark:text-brand-300 hover:underline disabled:opacity-60"
        >
          {t("rent.methods.emptyLink")}
        </button>
        .
      </div>
    );
  }

  const copy = async (m: OwnerPaymentMethod) => {
    try {
      await navigator.clipboard.writeText(m.value);
      setCopied(m.id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {methods.map((m) => (
        <div
          key={m.id}
          className="group rounded-xl border border-border bg-surface p-4 hover:shadow-card transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            <IconBadge name={methodIcon(m.label)} size="sm" />
            <p className="text-sm font-semibold text-ink min-w-0 [overflow-wrap:anywhere]">
              {agencyNameOf(m) ? t("pro.rents.transferTo", { name: agencyNameOf(m)! }) : m.label}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-cream-100 dark:bg-white/[0.05] px-3 py-2">
            <p className="text-sm font-mono font-medium text-ink break-all min-w-0">{m.value}</p>
            <button
              type="button"
              onClick={() => copy(m)}
              className={
                "shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors " +
                (copied === m.id
                  ? "bg-brand-600 text-white"
                  : "bg-surface border border-border text-brand-600 dark:text-brand-300 hover:border-brand-400")
              }
            >
              {copied === m.id ? t("rent.methods.copied") : t("rent.methods.copy")}
            </button>
          </div>
          {(m.holder || m.instructions) && (
            <div className="mt-2 space-y-0.5">
              {m.holder && <p className="text-xs text-ink-muted [overflow-wrap:anywhere]">{t("rent.methods.holder", { name: m.holder })}</p>}
              {/* Moyen de l'agence : consigne remplacée par la mention traduite. */}
              {m.instructions && !agencyNameOf(m) && <p className="text-xs text-ink-muted [overflow-wrap:anywhere] whitespace-pre-line">{m.instructions}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Déclaration de versement ────────────────────────────────────────────────

function DeclareForm({
  period,
  currency,
  methods,
  onDone,
  onCancel,
}: {
  period: RentPeriod;
  currency: string;
  methods: OwnerPaymentMethod[];
  onDone: (p: RentPeriod) => void;
  onCancel: () => void;
}) {
  const [method, setMethod] = React.useState(methods[0]?.label ?? "");
  const [reference, setReference] = React.useState("");
  const [note, setNote] = React.useState("");
  const [proof, setProof] = React.useState<string | null>(null);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const uid = React.useId();
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!(IMAGE_MIME_TYPES as readonly string[]).includes(f.type)) {
      setError(t("fix.file.imageType"));
      return;
    }
    if (f.size > 4 * 1024 * 1024) {
      setError(t("rent.declare.fileTooBig"));
      return;
    }
    setError(null);
    try {
      // Corps JSON limité côté API : image compressée (1600 px / 0,82).
      setProof(await compressImage(f));
    } catch (err) {
      toast.error(err);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (reference.trim().length < 4) {
      setError(t("rent.declare.refTooShort"));
      return;
    }
    setSending(true);
    try {
      const updated = await api.declareRent(period.id, {
        method: method || OTHER_METHOD,
        reference: reference.trim(),
        proofDataUrl: proof ?? undefined,
        note: note.trim() || undefined,
      });
      onDone(updated);
      toast.success(t("fix.rent.declared"));
    } catch (err) {
      // 409 = identifiant de transaction déjà utilisé (plus de test sur le texte FR).
      setError(isApiError(err) && err.status === 409 ? t("rent.declare.refUsed") : errorTextOf(err));
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mt-3 space-y-4 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-900/20 p-4 sm:p-5"
    >
      <div>
        <p className="text-sm font-semibold text-ink">
          {t("rent.declare.title", { amount: fmtMoney(periodAmount(period), currency), period: period.periodLabel })}
        </p>
        <p className="text-xs text-ink-muted mt-0.5">
          {t("rent.declare.subtitle")}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor={`${uid}-method`}>{t("rent.declare.method")}</Label>
          {methods.length > 0 ? (
            <Select id={`${uid}-method`} value={method} onChange={(e) => setMethod(e.target.value)}>
              {methods.map((m) => (
                <option key={m.id} value={m.label}>{m.label}</option>
              ))}
              <option value={OTHER_METHOD}>{t("rent.declare.other")}</option>
            </Select>
          ) : (
            <Input
              id={`${uid}-method`}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder={t("rent.declare.methodPlaceholder")}
            />
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`${uid}-ref`}>{t("rent.declare.reference")}</Label>
          <Input
            id={`${uid}-ref`}
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder={t("rent.declare.referencePlaceholder")}
            required
            minLength={4}
            className="font-mono"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor={`${uid}-proof`}>{t("rent.declare.proof")} <span className="font-normal text-ink-subtle">{t("rent.declare.proofHint")}</span></Label>
        <FileInput id={`${uid}-proof`} accept={IMAGE_ACCEPT} onChange={onFile} />
        {proof && (
          <SafeImage src={proof} alt={t("rent.declare.proofAlt")} className="mt-2 max-h-40 max-w-full rounded-lg border border-border" />
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor={`${uid}-note`}>{t("rent.declare.note")} <span className="font-normal text-ink-subtle">{t("rent.declare.noteHint")}</span></Label>
        <Textarea id={`${uid}-note`} value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={500} />
      </div>

      {error && <p role="alert" className="text-sm text-danger [overflow-wrap:anywhere]">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={sending}>
          {sending ? t("rent.declare.sending") : t("rent.declare.submit")}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          {t("rent.declare.cancel")}
        </Button>
      </div>
    </form>
  );
}

// ── Ligne d'échéance ────────────────────────────────────────────────────────

function PeriodRow({
  period,
  leaseCurrency,
  methods,
  onUpdate,
}: {
  period: RentPeriod;
  leaseCurrency?: string | null;
  methods: OwnerPaymentMethod[];
  onUpdate: (p: RentPeriod) => void;
}) {
  const [declaring, setDeclaring] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const currency = periodCurrency(period, leaseCurrency);

  const download = async () => {
    setDownloading(true);
    try {
      await api.downloadReceipt(period.id);
    } catch (e) {
      toast.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <li className="py-3.5 border-b border-border/70 last:border-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${STATUS_DOT[period.status]}`} aria-hidden="true" />
        <div className="min-w-0 sm:min-w-36">
          <p className="text-sm font-semibold text-ink capitalize leading-tight">{period.periodLabel}</p>
          <p className="text-xs text-ink-muted">{t("rent.row.dueOn", { date: fmtDate(period.dueDate) })}</p>
        </div>
        <p className="display-serif text-base text-ink tabular-nums">
          {fmtMoney(periodAmount(period), currency)}
          <Approx amount={periodAmount(period)} currency={currency} />
        </p>
        <Badge tone={STATUS_TONE[period.status]}>{t("rent.status." + period.status)}</Badge>

        <div className="ms-auto flex gap-2">
          {(period.status === "DUE" || period.status === "LATE") && (
            <Button size="sm" variant={declaring ? "ghost" : "primary"} onClick={() => setDeclaring((v) => !v)}>
              {declaring ? t("rent.row.close") : t("rent.row.declare")}
            </Button>
          )}
          {period.status === "PAID" && period.receiptNo && (
            <Button size="sm" variant="secondary" onClick={download} disabled={downloading}>
              {downloading ? "…" : t("rent.row.receiptBtn")}
            </Button>
          )}
        </div>
      </div>

      {period.status === "DECLARED" && (
        <p className="mt-1.5 ms-6 text-xs text-ink-muted">
          {t("rent.row.declaredOn", { date: period.declaredAt ? fmtDate(period.declaredAt) : "—" })}
          {period.declaredMethod ? ` ${t("rent.row.via")} ${methodLabel(period.declaredMethod)}` : ""} · {t("rent.row.awaiting")}
        </p>
      )}
      {period.status === "PAID" && period.receiptNo && (
        <p className="mt-1.5 ms-6 text-xs text-ink-muted">
          {t("rent.row.receiptNo", { no: period.receiptNo })}
          {period.paidAt ? ` · ${t("rent.row.confirmedOn", { date: fmtDate(period.paidAt) })}` : ""}
        </p>
      )}
      {period.rejectReason && period.status !== "PAID" && period.status !== "DECLARED" && (
        <p className="mt-1.5 ms-6 text-xs text-danger [overflow-wrap:anywhere]">
          {t("rent.row.rejected")} {period.rejectReason}
        </p>
      )}

      {declaring && (
        <DeclareForm
          period={period}
          currency={currency}
          methods={methods}
          onCancel={() => setDeclaring(false)}
          onDone={(p) => {
            setDeclaring(false);
            onUpdate(p);
          }}
        />
      )}
    </li>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function MesLoyersPage() {
  const auth = useAuth();
  const { user, loading } = auth;
  const router = useRouter();
  useLoginRedirect(auth, router);
  const { data, setData, error, reload } = useAsync<TenantRentBundle[]>(() => api.myRents(), [user?.id], {
    enabled: !!user,
  });
  const bundles = React.useMemo(() => data ?? [], [data]);

  const updatePeriod = (leaseId: string, p: RentPeriod) => {
    setData((prev) =>
      (prev ?? []).map((b) =>
        b.lease.id === leaseId
          ? { ...b, periods: b.periods.map((x) => (x.id === p.id ? { ...x, ...p } : x)) }
          : b,
      ),
    );
  };

  // Prochaine échéance à régler, tous baux confondus (pour le bandeau).
  const nextDue = React.useMemo(() => {
    const open = bundles
      .flatMap((b) => b.periods.map((p) => ({ ...p, currency: periodCurrency(p, b.lease.currency) })))
      .filter((p) => p.status === "DUE" || p.status === "LATE")
      .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));
    return open[0] ?? null;
  }, [bundles]);

  if (error && !data) return <ErrorState error={error} onRetry={reload} />;
  if (loading || !user || !data) return <LoadingSkeleton />;

  return (
    <section className="space-y-6 min-w-0">
      {/* Bandeau */}
      <AnimatedBackground variant="soft" className="rounded-2xl border border-border/60 px-4 sm:px-8 py-7">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="min-w-0">
            <h1 className="font-display text-3xl sm:text-4xl mb-1">
              {t("rent.page.title1")} <span className="gradient-text">{t("rent.page.title2")}</span>
            </h1>
            <p className="text-ink-muted max-w-xl">
              {t("rent.page.subtitle")}
            </p>
          </div>
          {nextDue ? (
            <div className="glass rounded-xl px-4 py-3">
              <p className="text-[11px] text-ink-muted uppercase tracking-wide">{t("rent.page.nextDue")}</p>
              <p className="font-display text-lg leading-tight capitalize">
                {nextDue.periodLabel} · {fmtMoney(periodAmount(nextDue), nextDue.currency)}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                {nextDue.status === "LATE" || +new Date(nextDue.dueDate) < Date.now()
                  ? t("rent.page.overdueSince")
                  : t("rent.page.payBefore")}{" "}
                {fmtDate(nextDue.dueDate)}
              </p>
            </div>
          ) : bundles.length > 0 ? (
            <div className="glass rounded-xl px-4 py-3">
              <p className="font-display text-lg leading-tight">{t("rent.page.upToDate")}</p>
              <p className="text-xs text-ink-muted mt-0.5">{t("rent.page.noPending")}</p>
            </div>
          ) : null}
        </div>
      </AnimatedBackground>

      {bundles.length === 0 ? (
        <EmptyState
          illustration="wallet"
          title={t("rent.empty.title")}
          description={t("rent.empty.desc")}
          action={<Link href="/" className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">{t("rent.empty.cta")}</Link>}
        />
      ) : (
        <>
          <HowItWorks />

          {bundles.map((b) => (
            <Card key={b.lease.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <h2 className="font-display text-xl font-semibold text-ink [overflow-wrap:anywhere]">
                      {b.lease.property.title}
                    </h2>
                    <p className="text-sm text-ink-muted mt-0.5 [overflow-wrap:anywhere]">
                      {b.lease.property.addressLine}, {b.lease.property.city}
                    </p>
                    <Link
                      href="/ma-location"
                      className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
                    >
                      {t("rent.page.seeLease")}
                      <Icon name="arrowRight" size={14} />
                    </Link>
                  </div>
                  {b.lease.shortStay ? (
                    // Séjour courte durée : une seule échéance du montant total (contrat §9).
                    <div className="sm:text-end">
                      <p className="display-serif text-lg text-ink">
                        {fmtMoney(b.lease.stayTotal ?? b.lease.monthlyRent + b.lease.charges, b.lease.currency)}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {b.lease.startDate
                          ? t("fix.rent.stayDates", {
                              start: fmtDate(b.lease.startDate),
                              end: b.lease.endDate ? fmtDate(b.lease.endDate) : "—",
                            })
                          : t("fix.rent.stayTotal")}
                      </p>
                    </div>
                  ) : (
                    <div className="sm:text-end">
                      <p className="display-serif text-lg text-ink">{fmtMoney(b.lease.monthlyRent + b.lease.charges, b.lease.currency)}<span className="text-xs text-ink-muted font-sans"> {t("rent.page.perMonth")}</span></p>
                      <p className="text-xs text-ink-muted">{payDayText(b.lease.rentPaymentDay)}</p>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardBody className="space-y-6">
                <section>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
                    {t("rent.page.howToPay")}
                  </h3>
                  {b.payee === "AGENCY" && b.paymentMethods[0] && (
                    <p className="mb-3 text-sm text-ink rounded-lg border border-brand-200 bg-brand-50/70 dark:border-brand-800 dark:bg-brand-900/25 px-3 py-2 [overflow-wrap:anywhere]" data-pay-agency>
                      {t("pro.rents.payAgency", { name: agencyNameOf(b.paymentMethods[0]) ?? "" })}
                    </p>
                  )}
                  <PaymentMethods methods={b.paymentMethods} propertyId={b.lease.property.id} />
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    {t("rent.page.schedule")}
                  </h3>
                  <ul>
                    {b.periods.map((p) => (
                      <PeriodRow
                        key={p.id}
                        period={p}
                        leaseCurrency={b.lease.currency}
                        methods={b.paymentMethods}
                        onUpdate={(x) => updatePeriod(b.lease.id, x)}
                      />
                    ))}
                  </ul>
                </section>
              </CardBody>
            </Card>
          ))}
        </>
      )}
    </section>
  );
}
