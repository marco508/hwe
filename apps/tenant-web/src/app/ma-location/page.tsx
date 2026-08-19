"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge, Card, CardBody, CardHeader, EmptyState } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { useCurrency } from "../../lib/currency-context";
import { api } from "../../lib/api";
import { LeaseTenantExtras } from "../../components/LeaseTenantExtras";
import type { LeaseContract, LeaseStatus } from "@hwe/types";
import { LEASE_STATUS_LABELS } from "@hwe/types";

// ── helpers ─────────────────────────────────────────────────────────────────

function fmt(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fmtCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(amount);
}

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
  const now = Date.now();
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
}

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

  const getRemaining = React.useCallback(
    () => (end - Date.now()) / 1000,
    [end],
  );

  const [remaining, setRemaining] = React.useState(getRemaining);

  React.useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, [getRemaining]);

  const expired = remaining <= 0;
  const { days, hours, minutes, seconds } = decompose(remaining);

  if (expired) {
    return (
      <div className="rounded-lg bg-ink-subtle/10 dark:bg-ink-subtle/20 border border-border px-4 py-3 text-sm text-ink-muted text-center">
        La période de location est terminée.
      </div>
    );
  }

  const pct = progress(
    new Date(end - remaining * 1000 - days * 86400000).toISOString(),
    targetDate,
  );
  // Recalculate progress properly using the stored startDate passed from parent
  // (we'll do it via a wrapper below)

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { label: "jours", value: days },
    { label: "heures", value: hours },
    { label: "min", value: minutes },
    { label: "sec", value: seconds },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-ink-muted uppercase tracking-wide">
        Temps restant
      </p>
      <div className="grid grid-cols-4 gap-2">
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-lg bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 py-3"
          >
            <span className="font-display text-2xl font-semibold text-brand-700 dark:text-brand-300 tabular-nums">
              {pad(value)}
            </span>
            <span className="text-[10px] text-ink-muted uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Wrapper qui calcule le % de progression et l'affiche */
function LeaseProgress({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const [pct, setPct] = React.useState(() => progress(startDate, endDate));
  React.useEffect(() => {
    const id = setInterval(() => setPct(progress(startDate, endDate)), 1000);
    return () => clearInterval(id);
  }, [startDate, endDate]);

  const totalDays = Math.round(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000,
  );
  const elapsedDays = Math.round(
    (Date.now() - new Date(startDate).getTime()) / 86400000,
  );

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-ink-muted">
        <span>{fmt(startDate)}</span>
        <span>{Math.round(pct)}% écoulé</span>
        <span>{fmt(endDate)}</span>
      </div>
      <div className="h-2 rounded-full bg-brand-100 dark:bg-brand-900/40 overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-500 dark:bg-brand-400 transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-ink-muted text-center">
        {Math.max(0, elapsedDays)} jour{elapsedDays !== 1 ? "s" : ""} sur {totalDays} écoulé{totalDays !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// ── Contract text generator (tenant copy) ────────────────────────────────────

function generateContractText(lease: LeaseContract): string {
  const ownerName = lease.property?.owner
    ? `${lease.property.owner.firstName} ${lease.property.owner.lastName}`
    : "Le propriétaire";
  const property = lease.property;
  const address = property
    ? `${property.addressLine}, ${property.postalCode} ${property.city}, ${property.country}`
    : "";
  const tenantName = `${lease.tenantFirstName} ${lease.tenantLastName}`;
  const startDateFmt = fmt(lease.startDate);
  const endDateFmt = lease.endDate ? fmt(lease.endDate) : "indéterminée";
  const rentTotal = lease.monthlyRent + lease.charges;
  const leaseDuration = lease.endDate ? "durée déterminée" : "durée indéterminée";
  const noticeTxt = `${lease.noticePeriod} mois`;
  const paymentDaySuffix = lease.rentPaymentDay === 1 ? "er" : "";

  return `CONTRAT DE BAIL D'HABITATION
${lease.furnished ? "MEUBLÉ" : "NON MEUBLÉ"}

Établi conformément à la loi n° 89-462 du 6 juillet 1989 modifiée
et à la loi n° 2014-366 du 24 mars 2014 (loi ALUR).

═══════════════════════════════════════════════════════════════
ARTICLE 1 — LES PARTIES
═══════════════════════════════════════════════════════════════

BAILLEUR (Propriétaire)
Nom : ${ownerName}
${lease.property?.owner?.email ? `Email : ${lease.property.owner.email}` : ""}

PRENEUR (Locataire)
Nom : ${tenantName}
Email : ${lease.tenantEmail}
${lease.tenantPhone ? `Téléphone : ${lease.tenantPhone}` : ""}

═══════════════════════════════════════════════════════════════
ARTICLE 2 — DÉSIGNATION DU BIEN
═══════════════════════════════════════════════════════════════

Le présent bail porte sur le logement situé à l'adresse suivante :
${address}

Surface habitable : ${property?.surface ?? "—"} m²
Nombre de pièces principales : ${property?.rooms ?? "—"}
Logement ${lease.furnished ? "meublé" : "non meublé"}

═══════════════════════════════════════════════════════════════
ARTICLE 3 — DURÉE DU BAIL
═══════════════════════════════════════════════════════════════

Le présent bail est conclu pour une ${leaseDuration}.
Date de prise d'effet : ${startDateFmt}
${lease.endDate ? `Date de fin : ${endDateFmt}` : ""}

Préavis : ${noticeTxt} (conformément à la législation en vigueur).

═══════════════════════════════════════════════════════════════
ARTICLE 4 — CONDITIONS FINANCIÈRES
═══════════════════════════════════════════════════════════════

Loyer mensuel hors charges : ${fmtCurrency(lease.monthlyRent)}
Charges mensuelles : ${fmtCurrency(lease.charges)}
─────────────────────────────────────────────────
Total mensuel : ${fmtCurrency(rentTotal)}

Le loyer est payable le ${lease.rentPaymentDay}${paymentDaySuffix} de chaque mois.

Dépôt de garantie : ${fmtCurrency(lease.deposit)}

${lease.specialClauses ? `═══════════════════════════════════════════════════════════════\nCLAUSES PARTICULIÈRES\n═══════════════════════════════════════════════════════════════\n\n${lease.specialClauses}` : ""}

═══════════════════════════════════════════════════════════════
SIGNATURES
═══════════════════════════════════════════════════════════════

Le Bailleur                              Le Locataire
${ownerName}                             ${tenantName}

${lease.ownerSignedAt ? `✅ Signé électroniquement le ${fmt(lease.ownerSignedAt)}` : "En attente de signature du propriétaire"}    ${lease.tenantSignedAt ? `✅ Signé électroniquement le ${fmt(lease.tenantSignedAt)}` : "En attente de signature du locataire"}
`;
}

// ── Lease card ───────────────────────────────────────────────────────────────

function LeaseCard({
  lease,
  onUpdate,
}: {
  lease: LeaseContract;
  onUpdate: (updated: LeaseContract) => void;
}) {
  const { format: fmtCurrencyUser } = useCurrency();
  const property = lease.property;
  const hasTimer = !!lease.endDate;
  const isActive = lease.status === "ACTIVE" || lease.status === "SIGNED";
  const [showContract, setShowContract] = React.useState(false);
  const [signing, setSigning] = React.useState(false);

  const hasTenantSigned = !!lease.tenantSignedAt;

  const handleSign = async () => {
    if (!confirm("En cliquant sur OK, vous signez électroniquement ce contrat de bail. Confirmez-vous ?")) return;
    setSigning(true);
    try {
      const updated = await api.signLease(lease.id);
      onUpdate(updated);
    } catch (e) {
      alert("Erreur lors de la signature : " + (e as Error).message);
    } finally {
      setSigning(false);
    }
  };

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              {property?.title ?? "Bien"}
            </h2>
            <p className="text-sm text-ink-muted mt-0.5">
              {property?.addressLine}, {property?.postalCode} {property?.city},{" "}
              {property?.country}
            </p>
          </div>
          <Badge tone={STATUS_TONE[lease.status]}>
            {LEASE_STATUS_LABELS[lease.status]}
          </Badge>
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
      {/* Bandeau informatif pour les baux en attente de finalisation */}
        {lease.status === "DRAFT" && (
          <div className="rounded-lg border border-accent-500/30 bg-accent-500/10 dark:bg-accent-500/10 px-4 py-3 text-sm text-ink">
            <span className="font-semibold">📋 Bail généré, en attente de signature.</span>{" "}
            Consultez le contrat ci-dessous et signez-le électroniquement.
          </div>
        )}

        {/* Section contrat + signature */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Contrat de bail
            </h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowContract((v) => !v)}
                className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
              >
                {showContract ? "▲ Masquer le contrat" : "▼ Lire le contrat"}
              </button>
              {lease.pdfUrl && (
                <a
                  href={lease.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
                >
                  📄 Télécharger PDF
                </a>
              )}
            </div>
          </div>

          {showContract && (
            <div className="rounded-xl border border-ink-subtle bg-white dark:bg-ink/5 p-6 shadow-sm max-h-96 overflow-y-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap text-ink leading-relaxed">
                {generateContractText(lease)}
              </pre>
            </div>
          )}

          {/* Statut de signature */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span>{lease.ownerSignedAt ? "✅" : "⏳"}</span>
              <span className="text-ink-muted">
                Propriétaire :{" "}
                {lease.ownerSignedAt
                  ? `signé le ${fmt(lease.ownerSignedAt)}`
                  : "en attente"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>{lease.tenantSignedAt ? "✅" : "⏳"}</span>
              <span className="text-ink-muted">
                Locataire :{" "}
                {lease.tenantSignedAt
                  ? `signé le ${fmt(lease.tenantSignedAt)}`
                  : "en attente"}
              </span>
            </div>
          </div>

          {/* Bouton de signature — disparaît après signature */}
          {!hasTenantSigned && (
            <button
              onClick={handleSign}
              disabled={signing}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              {signing ? "Signature en cours…" : "✍️ Signer le bail électroniquement"}
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
              <p className="text-sm font-semibold text-ink">💶 Mes loyers et quittances</p>
              <p className="text-xs text-ink-muted mt-0.5">
                Payer, déclarer un versement et télécharger vos quittances
              </p>
            </div>
            <span className="text-brand-600 dark:text-brand-300" aria-hidden="true">→</span>
          </Link>
        )}

        {/* Minuteur + barre de progression si durée limitée */}
        {hasTimer && isActive && lease.status !== "DRAFT" && (
          <section className="space-y-4 p-4 rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/20">
            <h3 className="text-sm font-semibold text-brand-700 dark:text-brand-300">
              ⏱ Location à durée limitée
            </h3>
            <LeaseProgress startDate={lease.startDate} endDate={lease.endDate!} />
            <Countdown targetDate={lease.endDate!} />
          </section>
        )}

        {/* Dates */}
        <section>
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
            Période
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Début" value={fmt(lease.startDate)} />
            <Detail
              label="Fin"
              value={lease.endDate ? fmt(lease.endDate) : "Indéterminée"}
            />
          </div>
        </section>

        {/* Financier */}
        <section>
          <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
            Conditions financières
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Detail label="Loyer mensuel HC" value={fmtCurrencyUser(lease.monthlyRent, "EUR")} />
            <Detail label="Charges" value={fmtCurrencyUser(lease.charges, "EUR")} />
            <Detail
              label="Total mensuel (HC + charges)"
              value={fmtCurrencyUser(lease.monthlyRent + lease.charges, "EUR")}
            />
            <Detail label="Dépôt de garantie" value={fmtCurrencyUser(lease.deposit, "EUR")} />
            {lease.endDate && (() => {
              const start = new Date(lease.startDate).getTime();
              const end = new Date(lease.endDate).getTime();
              const totalMonths = (end - start) / (1000 * 60 * 60 * 24 * 30.44);
              const total = (lease.monthlyRent + lease.charges) * totalMonths;
              return (
                <Detail
                  label="Montant total de la location"
                  value={fmtCurrencyUser(Math.round(total), "EUR")}
                />
              );
            })()}
            <Detail
              label="Paiement le"
              value={`${lease.rentPaymentDay}${lease.rentPaymentDay === 1 ? "er" : "ème"} du mois`}
            />
            <Detail
              label="Préavis"
              value={`${lease.noticePeriod} mois`}
            />
            <Detail label="Meublé" value={lease.furnished ? "Oui" : "Non"} />
          </div>
        </section>

        {/* Bien */}
        {property && (
          <section>
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
              Caractéristiques du bien
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Detail label="Surface" value={`${property.surface} m²`} />
              <Detail label="Pièces" value={String(property.rooms)} />
            </div>
          </section>
        )}

        {/* Propriétaire */}
        {property?.owner && (
          <section>
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
              Votre propriétaire
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Detail
                label="Nom"
                value={`${property.owner.firstName} ${property.owner.lastName}`}
              />
              <Detail label="Email" value={property.owner.email} />
              {property.owner.phone && (
                <Detail label="Téléphone" value={property.owner.phone} />
              )}
            </div>
          </section>
        )}

        {/* Clauses spéciales */}
        {lease.specialClauses && (
          <section>
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
              Clauses particulières
            </h3>
            <p className="text-sm text-ink whitespace-pre-line leading-relaxed">
              {lease.specialClauses}
            </p>
          </section>
        )}

        <LeaseTenantExtras lease={lease} onLeaseUpdate={onUpdate} />

      </CardBody>
    </Card>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-ink-subtle uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MaLocationPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [leases, setLeases] = React.useState<LeaseContract[]>([]);
  const [working, setWorking] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    api
      .myLeases()
      .then(setLeases)
      .catch((e) => setError((e as Error).message))
      .finally(() => setWorking(false));
  }, [user, loading, router]);

  if (loading || working)
    return <p className="text-ink-muted">Chargement…</p>;

  if (error)
    return (
      <p className="text-danger">
        Erreur lors du chargement de vos baux : {error}
      </p>
    );

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">Ma location</h1>
      <p className="text-ink-muted mb-8">
        Retrouvez ici les détails de votre bail en cours.
      </p>

      {leases.length === 0 ? (
        <EmptyState
          title="Aucune location active"
          description="Vous n'avez pas de bail actif enregistré à votre adresse email. Si vous venez de signer un bail, contactez votre propriétaire."
          action={
            <Link href="/" className="text-sm">
              Parcourir les annonces
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
                setLeases((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
