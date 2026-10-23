"use client";

import * as React from "react";
import Link from "next/link";
import {
  ErrorState,
  SafeImage,
  toast,
  tUi,
  fmtMoney,
  fmtDate as fmtDateShared,
  openDataUrl,
  useAsync,
  AnimatedBackground,
  Badge,
  Button,
  Card,
  CardBody,
  EmptyState,
  Input,
  Icon,
  IconBadge,
  type IconName,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import type { OwnerRentPeriod, RentStatus } from "../../../lib/api";

// F2 : chaque échéance est dans la devise de SON bail (montant figé, contrat §9).
function periodCurrency(p: OwnerRentPeriod): string {
  return (p.currency ?? p.lease.currency ?? p.lease.property.currency ?? "EUR").toUpperCase();
}
function periodAmount(p: OwnerRentPeriod): number {
  return p.amountDue ?? p.amount;
}
function fmtPeriod(p: OwnerRentPeriod): string {
  return fmtMoney(periodAmount(p), periodCurrency(p));
}
/** Somme par devise (jamais d'addition entre devises) : « 1 200 € + 300 000 F CFA ». */
function sumByCurrency(list: OwnerRentPeriod[]): string {
  const by = new Map<string, number>();
  for (const p of list) by.set(periodCurrency(p), (by.get(periodCurrency(p)) ?? 0) + periodAmount(p));
  if (by.size === 0) return fmtMoney(0, "EUR");
  return Array.from(by.entries())
    .map(([cur, n]) => fmtMoney(n, cur))
    .join(" + ");
}

const fmtDate = (d: string) => fmtDateShared(d);

const STATUS_TONE: Record<RentStatus, "neutral" | "success" | "brand" | "accent"> = {
  DUE: "accent",
  DECLARED: "brand",
  PAID: "success",
  LATE: "neutral",
};

const FILTERS: { value: RentStatus | "ALL"; label: string }[] = [
  { value: "DECLARED", label: "rent.filter.DECLARED" },
  { value: "LATE", label: "rent.filter.LATE" },
  { value: "DUE", label: "rent.filter.DUE" },
  { value: "PAID", label: "rent.filter.PAID" },
  { value: "ALL", label: "rent.filter.ALL" },
];

// ── Squelette de chargement ─────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-40 rounded-2xl skeleton" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full skeleton" />
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-24 rounded-xl skeleton" />
      ))}
    </div>
  );
}

function StatCard({ icon, value, label, highlight }: { icon: IconName; value: React.ReactNode; label: string; highlight?: boolean }) {
  return (
    <div className={"glass rounded-xl px-4 py-3 hover-lift min-w-0" + (highlight ? " ring-2 ring-brand-500/40" : "")}>
      <div className="flex items-center gap-3 min-w-0">
        <IconBadge name={icon} size="sm" />
        <div className="min-w-0">
          <div className="font-display text-xl leading-tight gradient-text [overflow-wrap:anywhere]">{value}</div>
          <div className="text-[11px] text-ink-muted mt-0.5">{label}</div>
        </div>
      </div>
    </div>
  );
}

// ── Carte d'une échéance ────────────────────────────────────────────────────

function PeriodCard({
  period,
  onReviewed,
}: {
  period: OwnerRentPeriod;
  onReviewed: (p: OwnerRentPeriod) => void;
}) {
  const [showProof, setShowProof] = React.useState(false);
  const [rejecting, setRejecting] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);

  const review = async (accept: boolean) => {
    if (accept) {
      const ok = confirm(
        t("rent.confirmReceive", {
          amount: fmtPeriod(period),
          tenant: period.lease.tenantName,
          period: period.periodLabel,
        }),
      );
      if (!ok) return;
    }
    setBusy(true);
    try {
      const updated = await api.reviewRent(period.id, accept, accept ? undefined : reason.trim() || undefined);
      onReviewed(updated);
      toast.success(accept ? t("rent.validated") : t("rent.rejectedToast"));
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

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
    <Card className={period.status === "DECLARED" ? "ring-1 ring-ocean-300/50" : undefined}>
      <CardBody className="space-y-3">
        {/* Ligne de synthèse : qui, quoi, combien, statut */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="min-w-0 sm:min-w-52">
            <p className="text-sm font-semibold text-ink capitalize leading-tight">
              {period.periodLabel} — <span className="display-serif">{fmtPeriod(period)}</span>
            </p>
            <p className="text-xs text-ink-muted mt-0.5 [overflow-wrap:anywhere]">
              {period.lease.property.title}, {period.lease.property.city}
            </p>
          </div>
          <div className="text-xs text-ink-muted min-w-0">
            <p className="font-medium text-ink [overflow-wrap:anywhere]">{period.lease.tenantName}</p>
            <p className="[overflow-wrap:anywhere]">{period.lease.tenantEmail}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <p className="text-xs text-ink-muted hidden sm:block">{t("rent.dueOn", { date: fmtDate(period.dueDate) })}</p>
            <Badge tone={STATUS_TONE[period.status]}>{t("rent.status." + period.status)}</Badge>
          </div>
        </div>

        {/* Déclaration à vérifier */}
        {period.status === "DECLARED" && (
          <div className="rounded-xl border border-ocean-200 dark:border-ocean-700/50 bg-ocean-50/60 dark:bg-ocean-700/10 p-4 sm:p-5 space-y-3">
            <div className="text-sm text-ink space-y-1">
              <p>
                {t("rent.declaredOn", { date: period.declaredAt ? fmtDate(period.declaredAt) : "—" })}
                {period.declaredMethod ? <> {t("rent.via")} <strong>{methodLabel(period.declaredMethod)}</strong></> : null}
              </p>
              {period.declaredRef && (
                <p>
                  {t("rent.txId")}{" "}
                  <code className="font-mono text-xs bg-surface border border-border rounded px-1.5 py-0.5 [overflow-wrap:anywhere]">
                    {period.declaredRef}
                  </code>
                </p>
              )}
              {period.tenantNote && (
                <p className="text-ink-muted italic [overflow-wrap:anywhere]">« {period.tenantNote} »</p>
              )}
            </div>

            {period.proofDataUrl && (
              <div>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    aria-expanded={showProof}
                    onClick={() => setShowProof((v) => !v)}
                    className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
                  >
                    {showProof ? t("rent.hideProof") : t("rent.showProof")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!openDataUrl(period.proofDataUrl, "justificatif")) toast.error(tUi("ui.err.openDoc"));
                    }}
                    className="text-sm font-medium text-ink-muted hover:underline"
                  >
                    {t("rent.openProof")}
                  </button>
                </div>
                {showProof && (
                  <SafeImage
                    src={period.proofDataUrl.startsWith("data:image/") ? period.proofDataUrl : null}
                    alt={t("rent.proofAlt")}
                    className="mt-2 max-h-96 max-w-full rounded-lg border border-border shadow-card"
                    fallbackClassName="mt-2 h-24 w-40 rounded-lg border border-border"
                    fallback={<Icon name="file" size={28} className="text-brand-600" />}
                  />
                )}
              </div>
            )}

            <p className="text-xs text-ink-muted">
              {t("rent.checkStatement1")} <strong>{t("rent.checkStatement2")}</strong>{" "}
              {t("rent.checkStatement3")}
            </p>

            {!rejecting ? (
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => review(true)} disabled={busy}>
                  {busy ? "…" : t("rent.validate")}
                </Button>
                <Button variant="ghost" onClick={() => setRejecting(true)} disabled={busy} className="text-danger dark:text-red-300">
                  {t("rent.reject")}
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  aria-label={t("rent.rejectPlaceholder")}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t("rent.rejectPlaceholder")}
                  maxLength={300}
                />
                <div className="flex gap-2">
                  <Button variant="danger" onClick={() => review(false)} disabled={busy}>
                    {busy ? "…" : t("rent.confirmReject")}
                  </Button>
                  <Button variant="ghost" onClick={() => setRejecting(false)}>
                    {t("rent.cancel")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payé */}
        {period.status === "PAID" && (
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
            <span>
              {t("rent.paidOn", { date: period.paidAt ? fmtDate(period.paidAt) : "—" })}
              {period.declaredMethod ? ` ${t("rent.via")} ${methodLabel(period.declaredMethod)}` : ""}
            </span>
            {period.receiptNo && (
              <Button size="sm" variant="secondary" onClick={download} disabled={downloading}>
                {downloading ? "…" : t("rent.receiptBtn", { no: period.receiptNo })}
              </Button>
            )}
          </div>
        )}

        {period.status !== "PAID" && period.status !== "DECLARED" && period.rejectReason && (
          <p className="text-xs text-ink-muted">{t("rent.lastReject", { reason: period.rejectReason })}</p>
        )}
      </CardBody>
    </Card>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

/** « OTHER » (choix « Autre » du locataire) → libellé traduit. */
const methodLabel = (m: string) => (m === "OTHER" || m === "Autre" ? t("rent.methodOther") : m);

export default function LoyersPage() {
  // Session/rôle : dashboard/layout.tsx.
  const { user } = useAuth();
  const [filter, setFilter] = React.useState<RentStatus | "ALL">("DECLARED");
  const { data, setData, error, loading: working, reload } = useAsync(
    async () => {
      const r = await api.ownerRents();
      // S'il n'y a rien à vérifier, ouvrir directement sur « Tout ».
      if (!r.some((p) => p.status === "DECLARED")) setFilter("ALL");
      return r;
    },
    [user?.id],
    { enabled: !!user },
  );
  const periods: OwnerRentPeriod[] = data ?? [];
  const setPeriods = (fn: (prev: OwnerRentPeriod[]) => OwnerRentPeriod[]) => setData((cur) => fn(cur ?? []));

  const counts = React.useMemo(() => {
    const now = new Date();
    const inMonth = (p: OwnerRentPeriod) => {
      const d = new Date(p.dueDate);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    };
    return {
      declared: periods.filter((p) => p.status === "DECLARED").length,
      late: periods.filter((p) => p.status === "LATE").length,
      collectedMonth: sumByCurrency(periods.filter((p) => p.status === "PAID" && inMonth(p))),
      expectedMonth: sumByCurrency(periods.filter(inMonth)),
    };
  }, [periods]);

  const shown = periods.filter((p) => filter === "ALL" || p.status === filter);

  if (error && !data) return <ErrorState error={error} title={t("rent.loadErrorTitle")} onRetry={reload} />;
  if (working && !data) return <LoadingSkeleton />;

  return (
    <section className="space-y-6">
      {/* Bandeau + chiffres clés */}
      <AnimatedBackground variant="soft" className="rounded-2xl border border-border/60 px-6 sm:px-8 py-7">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl mb-1">
              {t("rent.title1")} <span className="gradient-text">{t("rent.title2")}</span>
            </h1>
            <p className="text-ink-muted max-w-xl">
              {t("rent.intro1")}
              <Link href="/profile" className="font-medium text-brand-600 dark:text-brand-300 hover:underline">
                {t("rent.introProfileLink")}
              </Link>
              {t("rent.intro2")}
            </p>
          </div>
        </div>

        {periods.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 stagger">
            <StatCard icon="search" value={counts.declared} label={t("rent.stat.declared")} highlight={counts.declared > 0} />
            <StatCard icon="alarm" value={counts.late} label={t("rent.stat.late")} />
            <StatCard icon="checkCircle" value={counts.collectedMonth} label={t("rent.stat.collected")} />
            <StatCard icon="calendar" value={counts.expectedMonth} label={t("rent.stat.expected")} />
          </div>
        )}
      </AnimatedBackground>

      {/* Filtres */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const n =
            f.value === "ALL" ? periods.length : periods.filter((p) => p.status === f.value).length;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={
                "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors " +
                (filter === f.value
                  ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                  : "border-border bg-surface text-ink-muted hover:text-ink hover:border-ink/30")
              }
            >
              {t(f.label)}
              {n > 0 && (
                <span
                  className={
                    "ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 text-[11px] font-semibold " +
                    (filter === f.value ? "bg-white/25" : "bg-cream-200 dark:bg-white/10 text-ink-muted")
                  }
                >
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          illustration="wallet"
          action={
            periods.length === 0 ? (
              <Link href="/dashboard" className="text-sm font-medium">
                {t("vis.seeLeases")}
              </Link>
            ) : undefined
          }
          title={filter === "DECLARED" ? t("rent.empty.nothingToVerify") : t("rent.empty.nothingToShow")}
          description={
            periods.length === 0
              ? t("rent.empty.noLease")
              : filter === "DECLARED"
                ? t("rent.empty.noDeclared")
                : t("rent.empty.noneInCategory")
          }
        />
      ) : (
        <div className="space-y-4 stagger">
          {shown.map((p) => (
            <PeriodCard
              key={p.id}
              period={p}
              onReviewed={(updated) =>
                setPeriods((prev) => prev.map((x) => (x.id === updated.id ? { ...x, ...updated } : x)))
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
