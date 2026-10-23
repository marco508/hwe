"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  ErrorState,
  downloadText,
  fmtDate,
  fmtMoney,
  toast,
  useAsync,
  useLoginRedirect,
} from "@hwe/ui";
import { generateLeaseContract, leaseCurrency } from "@hwe/types";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { payDayText } from "../../lib/rent-format";
import { LeaseTenantExtras } from "../../components/LeaseTenantExtras";
import type { LeaseContract, LeaseStatus } from "@hwe/types";

// ── helpers ─────────────────────────────────────────────────────────────────

const fmt = (date: string) => fmtDate(date);

/** Décompose un nombre de secondes en jours / heures / minutes / secondes */
function decompose(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds };
}

/** Retourne le % de progression de la location (0-100) */
function progress(startDate: string, endDate: string) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  if (!(end > start)) return 100;
  return Math.min(100, Math.max(0, ((Date.now() - start) / (end - start)) * 100));
}

// Contrat §9 : SIGNED (début futur) et ACTIVE sont tous deux « signé / en cours ».
const STATUS_TONE: Record<LeaseStatus, "neutral" | "success" | "brand" | "accent"> = {
  DRAFT: "neutral",
  SIGNED: "brand",
  ACTIVE: "success",
  EXPIRED: "neutral",
  TERMINATED: "neutral",
};

// ── Countdown component ──────────────────────────────────────────────────────

function Countdown({ targetDate }: { targetDate: string }) {
  const end = React.useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  // Valeur initiale identique serveur/client (0) puis mise à jour au montage.
  const [remaining, setRemaining] = React.useState<number | null>(null);

  React.useEffect(() => {
    const tick = () => setRemaining((end - Date.now()) / 1000);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  if (remaining === null) return null;

  if (remaining <= 0) {
    return (
      <div className="rounded-lg bg-ink-subtle/10 dark:bg-ink-subtle/20 border border-border px-4 py-3 text-sm text-ink-muted text-center">
        {t("rental.countdown.finished")}
      </div>
    );
  }

  const { days, hours, minutes, seconds } = decompose(remaining);
  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { label: t("rental.countdown.days"), value: days },
    { label: t("rental.countdown.hours"), value: hours },
    { label: t("rental.countdown.min"), value: minutes },
    { label: t("rental.countdown.sec"), value: seconds },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-ink-muted uppercase tracking-wide">
        {t("rental.countdown.remaining")}
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-lg bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 py-3 min-w-0"
          >
            <span className="font-display text-xl sm:text-2xl font-semibold text-brand-700 dark:text-brand-300 tabular-nums">
              {pad(value)}
            </span>
            <span className="text-[10px] text-ink-muted uppercase tracking-wider truncate max-w-full px-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Wrapper qui calcule le % de progression et l'affiche */
function LeaseProgress({ startDate, endDate }: { startDate: string; endDate: string }) {
  const [pct, setPct] = React.useState<number | null>(null);
  React.useEffect(() => {
    const tick = () => setPct(progress(startDate, endDate));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [startDate, endDate]);

  if (pct === null) return null;
  const totalDays = Math.max(
    1,
    Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000),
  );
  const elapsedDays = Math.min(
    totalDays,
    Math.max(0, Math.round((Date.now() - new Date(startDate).getTime()) / 86400000)),
  );

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between gap-2 text-xs text-ink-muted flex-wrap">
        <span>{fmt(startDate)}</span>
        <span>{t("rental.progress.elapsedPct", { pct: Math.round(pct) })}</span>
        <span>{fmt(endDate)}</span>
      </div>
      <div className="h-2 rounded-full bg-brand-100 dark:bg-brand-900/40 overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-500 dark:bg-brand-400 transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-ink-muted text-center">
        {/* U4 : « écoulé » s'accorde avec le nombre de jours écoulés. */}
        {t("rental.progress.days", {
          elapsed: elapsedDays,
          sElapsed: elapsedDays > 1 ? "s" : "",
          total: totalDays,
          sTotal: totalDays > 1 ? "s" : "",
        })}
      </p>
    </div>
  );
}

// ── Lease card ───────────────────────────────────────────────────────────────

function LeaseCard({
  lease,
  onUpdate,
}: {
  lease: LeaseContract;
  onUpdate: (updated: LeaseContract) => void;
}) {
  // F2 : montants toujours dans la devise du bail (jamais d'EUR implicite).
  const currency = leaseCurrency(lease);
  const money = (n: number) => fmtMoney(n, currency);
  const property = lease.property;
  const shortStay = Boolean(lease.shortStay);
  const hasTimer = !!lease.endDate;
  const isActive = lease.status === "ACTIVE" || lease.status === "SIGNED";
  const [showContract, setShowContract] = React.useState(false);
  const [signing, setSigning] = React.useState(false);

  const { user } = useAuth();
  // Principal = e-mail du bail ; sinon colocataire (signe via /cotenants/sign).
  const isPrimary =
    !!user && lease.tenantEmail.trim().toLowerCase() === user.email.trim().toLowerCase();
  const hasTenantSigned = !!lease.tenantSignedAt;
  // F7 : même générateur que l'espace propriétaire (signatures, devise, séjour).
  const contractText = React.useMemo(() => generateLeaseContract({ lease }), [lease]);

  const handleSign = async () => {
    if (!confirm(t("rental.sign.confirm"))) return;
    setSigning(true);
    try {
      const updated = await api.signLease(lease.id);
      onUpdate({ ...lease, ...updated });
      toast.success(t("fix.lease.signed"));
    } catch (e) {
      toast.error(e);
    } finally {
      setSigning(false);
    }
  };

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold text-ink [overflow-wrap:anywhere]">
              {property?.title ?? t("rental.lease.propertyFallback")}
            </h2>
            <p className="text-sm text-ink-muted mt-0.5 [overflow-wrap:anywhere]">
              {property?.addressLine}, {property?.postalCode} {property?.city},{" "}
              {property?.country}
            </p>
          </div>
          <Badge tone={STATUS_TONE[lease.status]}>
            {t("rental.status." + lease.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
      {/* Bandeau informatif pour les baux en attente de finalisation */}
        {lease.status === "DRAFT" && (
          <div className="rounded-lg border border-accent-500/30 bg-accent-500/10 dark:bg-accent-500/10 px-4 py-3 text-sm text-ink">
            <span className="font-semibold">{t("rental.draft.title")}</span>{" "}
            {t("rental.draft.text")}
          </div>
        )}

        {/* Section contrat + signature */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t("rental.contract.title")}
            </h3>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                aria-expanded={showContract}
                onClick={() => setShowContract((v) => !v)}
                className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
              >
                {showContract ? t("rental.contract.hide") : t("rental.contract.read")}
              </button>
              {/* S3 : plus de lien `pdfUrl` (non contrôlé) ; le contrat est généré
                  localement par le générateur partagé, identique côté propriétaire. */}
              <button
                type="button"
                onClick={() => downloadText(contractText, `contrat-bail-${lease.id.slice(0, 8)}.txt`)}
                className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
              >
                {t("fix.lease.download")}
              </button>
            </div>
          </div>

          {showContract && (
            <div className="rounded-xl border border-ink-subtle bg-surface dark:bg-ink/5 p-3 sm:p-6 shadow-sm max-h-96 overflow-y-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap text-ink leading-relaxed [overflow-wrap:anywhere]">
                {contractText}
              </pre>
            </div>
          )}

          {/* Statut de signature */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 min-w-0">
              <span>{lease.ownerSignedAt ? "✅" : "⏳"}</span>
              <span className="text-ink-muted">
                {t("rental.sign.owner")}{" "}
                {lease.ownerSignedAt
                  ? t("rental.sign.signedOn", { date: fmt(lease.ownerSignedAt) })
                  : t("rental.sign.pending")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>{lease.tenantSignedAt ? "✅" : "⏳"}</span>
              <span className="text-ink-muted">
                {t("rental.sign.tenant")}{" "}
                {lease.tenantSignedAt
                  ? t("rental.sign.signedOn", { date: fmt(lease.tenantSignedAt) })
                  : t("rental.sign.pending")}
              </span>
            </div>
          </div>

          {/* Bouton de signature — disparaît après signature */}
          {!hasTenantSigned && isPrimary && (
            <button
              type="button"
              onClick={handleSign}
              disabled={signing}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              {signing ? t("rental.sign.busy") : t("rental.sign.cta")}
            </button>
          )}
        </section>

        {/* Accès direct aux loyers du bail */}
        {isActive && (
          <Link
            href="/mes-loyers"
            className="flex items-center justify-between gap-3 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-900/20 px-4 py-3 hover:shadow-card transition-shadow"
          >
            <div>
              <p className="text-sm font-semibold text-ink">{t("rental.rentsLink.title")}</p>
              <p className="text-xs text-ink-muted mt-0.5">
                {t("rental.rentsLink.text")}
              </p>
            </div>
            <span className="text-brand-600 dark:text-brand-300" aria-hidden="true">→</span>
          </Link>
        )}

        {/* Minuteur + barre de progression si durée limitée */}
        {hasTimer && isActive && lease.status !== "DRAFT" && (
          <section className="space-y-4 p-4 rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/20">
            <h3 className="text-sm font-semibold text-brand-700 dark:text-brand-300">
              {t("rental.timer.title")}
            </h3>
            <LeaseProgress startDate={lease.startDate} endDate={lease.endDate!} />
            <Countdown targetDate={lease.endDate!} />
          </section>
        )}

        {/* Dates */}
        <section>
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
            {t("rental.section.period")}
          </h3>
          {shortStay && (
            <p className="mb-3 text-sm font-medium text-ink">
              {t("fix.lease.stay", {
                start: fmt(lease.startDate),
                end: lease.endDate ? fmt(lease.endDate) : "—",
                total: money(lease.stayTotal ?? lease.monthlyRent + lease.charges),
              })}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Detail label={t("rental.period.start")} value={fmt(lease.startDate)} />
            <Detail
              label={t("rental.period.end")}
              value={lease.endDate ? fmt(lease.endDate) : t("rental.period.indefinite")}
            />
          </div>
        </section>

        {/* Financier */}
        <section>
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
            {t("rental.section.finance")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {shortStay ? (
              // Séjour courte durée : une échéance unique du montant total.
              <Detail
                label={t("fix.lease.stayTotal")}
                value={money(lease.stayTotal ?? lease.monthlyRent + lease.charges)}
              />
            ) : (
              <>
                <Detail label={t("rental.finance.rent")} value={money(lease.monthlyRent)} />
                <Detail label={t("rental.finance.charges")} value={money(lease.charges)} />
                <Detail label={t("rental.finance.total")} value={money(lease.monthlyRent + lease.charges)} />
              </>
            )}
            <Detail label={t("rental.finance.deposit")} value={money(lease.deposit)} />
            {!shortStay && lease.endDate && (() => {
              // Mois calendaires (fin = dernier jour inclus : 25 oct. → 24 oct. = 12 mois),
              // reste au prorata ; à ±1 jour près on arrondit au mois entier.
              const s = new Date(lease.startDate);
              const e = new Date(new Date(lease.endDate).getTime() + 86400000);
              const whole = (e.getUTCFullYear() - s.getUTCFullYear()) * 12 + (e.getUTCMonth() - s.getUTCMonth());
              const raw = Math.max(0, whole + (e.getUTCDate() - s.getUTCDate()) / 30);
              const totalMonths = Math.abs(raw - Math.round(raw)) <= 1 / 30 ? Math.round(raw) : raw;
              const total = (lease.monthlyRent + lease.charges) * totalMonths;
              return <Detail label={t("rental.finance.grandTotal")} value={money(Math.round(total))} />;
            })()}
            {!shortStay && (
              <Detail label={t("rental.finance.paymentDay")} value={payDayText(lease.rentPaymentDay)} />
            )}
            {!shortStay && (
              <Detail
                label={t("rental.finance.notice")}
                value={t(
                  lease.noticePeriod === 1 ? "rental.months.one" : "rental.months.other",
                  { n: lease.noticePeriod },
                )}
              />
            )}
            <Detail
              label={t("rental.finance.furnished")}
              value={lease.furnished ? t("rental.yes") : t("rental.no")}
            />
          </div>
        </section>

        {/* Bien */}
        {property && (
          <section>
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
              {t("rental.section.property")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Detail label={t("rental.property.surface")} value={`${property.surface} m²`} />
              <Detail label={t("rental.property.rooms")} value={String(property.rooms)} />
            </div>
          </section>
        )}

        {/* Propriétaire */}
        {property?.owner && (
          <section>
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
              {t("rental.section.owner")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Detail
                label={t("rental.owner.name")}
                value={`${property.owner.firstName} ${property.owner.lastName}`}
              />
              {property.owner.email && (
                <Detail label={t("rental.owner.email")} value={property.owner.email} />
              )}
              {property.owner.phone && (
                <Detail label={t("rental.owner.phone")} value={property.owner.phone} />
              )}
            </div>
          </section>
        )}

        {/* Clauses spéciales */}
        {lease.specialClauses && (
          <section>
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
              {t("rental.section.clauses")}
            </h3>
            <p className="text-sm text-ink whitespace-pre-line leading-relaxed [overflow-wrap:anywhere]">
              {lease.specialClauses}
            </p>
          </section>
        )}

        <LeaseTenantExtras lease={lease} onLeaseUpdate={onUpdate} isPrimary={isPrimary} />

      </CardBody>
    </Card>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] text-ink-subtle uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm font-medium text-ink [overflow-wrap:anywhere]">{value}</p>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MaLocationPage() {
  const auth = useAuth();
  const { user, loading } = auth;
  const router = useRouter();
  useLoginRedirect(auth, router);
  const { data, setData, error, reload } = useAsync<LeaseContract[]>(() => api.myLeases(), [user?.id], {
    enabled: !!user,
  });
  const leases = data ?? [];

  if (error && !data) return <ErrorState error={error} onRetry={reload} />;
  if (loading || !user || !data) return <p className="text-ink-muted">{t("rental.loading")}</p>;

  return (
    <section className="min-w-0">
      <h1 className="font-display text-3xl mb-2">{t("rental.page.title")}</h1>
      <p className="text-ink-muted mb-8">
        {t("rental.page.sub")}
      </p>

      {leases.length === 0 ? (
        <EmptyState
          title={t("rental.empty.title")}
          description={t("rental.empty.desc")}
          action={
            <Link href="/" className="text-sm">
              {t("rental.empty.cta")}
            </Link>
          }
        />
      ) : (
        <div className="space-y-8">
          {leases.map((lease) => (
            <LeaseCard
              key={lease.id}
              lease={lease}
              onUpdate={(updated) =>
                // F8 : fusion (une réponse partielle n'efface pas assurances/avenants).
                setData((prev) => (prev ?? []).map((l) => (l.id === updated.id ? { ...l, ...updated } : l)))
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
