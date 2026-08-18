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
  EmptyState,
  Input,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import type { OwnerRentPeriod, RentStatus } from "../../../lib/api";

function fmtEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

const STATUS_LABEL: Record<RentStatus, string> = {
  DUE: "À payer",
  DECLARED: "À vérifier",
  PAID: "Payé",
  LATE: "En retard",
};

const STATUS_TONE: Record<RentStatus, "neutral" | "success" | "brand" | "accent"> = {
  DUE: "accent",
  DECLARED: "brand",
  PAID: "success",
  LATE: "neutral",
};

const FILTERS: { value: RentStatus | "ALL"; label: string }[] = [
  { value: "DECLARED", label: "À vérifier" },
  { value: "LATE", label: "En retard" },
  { value: "DUE", label: "À venir" },
  { value: "PAID", label: "Payés" },
  { value: "ALL", label: "Tout" },
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

function StatCard({ icon, value, label, highlight }: { icon: string; value: React.ReactNode; label: string; highlight?: boolean }) {
  return (
    <div className={"glass rounded-xl px-4 py-3 hover-lift" + (highlight ? " ring-2 ring-brand-500/40" : "")}>
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <div>
          <div className="font-display text-xl leading-none gradient-text">{value}</div>
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
        `Confirmez-vous avoir reçu ${fmtEUR(period.amount)} de ${period.lease.tenantName} ` +
          `pour ${period.periodLabel} ?\n\nVérifiez la réception sur votre relevé (banque / opérateur), ` +
          `pas seulement sur la capture. La quittance sera générée et envoyée au locataire.`,
      );
      if (!ok) return;
    }
    setBusy(true);
    try {
      const updated = await api.reviewRent(period.id, accept, accept ? undefined : reason.trim() || undefined);
      onReviewed(updated);
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const download = async () => {
    setDownloading(true);
    try {
      await api.downloadReceipt(period.id);
    } catch (e) {
      alert("Téléchargement impossible : " + (e as Error).message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Card className={period.status === "DECLARED" ? "ring-1 ring-ocean-300/50" : undefined}>
      <CardBody className="space-y-3">
        {/* Ligne de synthèse : qui, quoi, combien, statut */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="min-w-52">
            <p className="text-sm font-semibold text-ink capitalize leading-tight">
              {period.periodLabel} — <span className="display-serif">{fmtEUR(period.amount)}</span>
            </p>
            <p className="text-xs text-ink-muted mt-0.5">
              {period.lease.property.title}, {period.lease.property.city}
            </p>
          </div>
          <div className="text-xs text-ink-muted">
            <p className="font-medium text-ink">{period.lease.tenantName}</p>
            <p>{period.lease.tenantEmail}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <p className="text-xs text-ink-muted hidden sm:block">échéance {fmtDate(period.dueDate)}</p>
            <Badge tone={STATUS_TONE[period.status]}>{STATUS_LABEL[period.status]}</Badge>
          </div>
        </div>

        {/* Déclaration à vérifier */}
        {period.status === "DECLARED" && (
          <div className="rounded-xl border border-ocean-200 dark:border-ocean-700/50 bg-ocean-50/60 dark:bg-ocean-700/10 p-4 sm:p-5 space-y-3">
            <div className="text-sm text-ink space-y-1">
              <p>
                Déclaré le {period.declaredAt ? fmtDate(period.declaredAt) : "—"}
                {period.declaredMethod ? <> via <strong>{period.declaredMethod}</strong></> : null}
              </p>
              {period.declaredRef && (
                <p>
                  Identifiant de transaction :{" "}
                  <code className="font-mono text-xs bg-surface border border-border rounded px-1.5 py-0.5">
                    {period.declaredRef}
                  </code>
                </p>
              )}
              {period.tenantNote && (
                <p className="text-ink-muted italic">« {period.tenantNote} »</p>
              )}
            </div>

            {period.proofDataUrl && (
              <div>
                <button
                  onClick={() => setShowProof((v) => !v)}
                  className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
                >
                  {showProof ? "▲ Masquer la capture" : "▼ Voir la capture du reçu"}
                </button>
                {showProof && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={period.proofDataUrl}
                    alt="Capture du reçu"
                    className="mt-2 max-h-96 rounded-lg border border-border shadow-card"
                  />
                )}
              </div>
            )}

            <p className="text-xs text-ink-muted">
              ⚠️ Vérifiez la réception <strong>sur votre relevé</strong> (banque ou opérateur), pas
              seulement sur la capture : une capture peut se falsifier, votre relevé non.
            </p>

            {!rejecting ? (
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => review(true)} disabled={busy}>
                  {busy ? "…" : "✓ J'ai bien reçu — valider"}
                </Button>
                <Button variant="ghost" onClick={() => setRejecting(true)} disabled={busy} className="text-danger dark:text-red-300">
                  Refuser
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Motif du refus (ex. : montant non reçu sur mon compte)"
                  maxLength={300}
                />
                <div className="flex gap-2">
                  <Button variant="danger" onClick={() => review(false)} disabled={busy}>
                    {busy ? "…" : "Confirmer le refus"}
                  </Button>
                  <Button variant="ghost" onClick={() => setRejecting(false)}>
                    Annuler
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
              ✓ Payé le {period.paidAt ? fmtDate(period.paidAt) : "—"}
              {period.declaredMethod ? ` via ${period.declaredMethod}` : ""}
            </span>
            {period.receiptNo && (
              <Button size="sm" variant="secondary" onClick={download} disabled={downloading}>
                {downloading ? "…" : `📄 Quittance ${period.receiptNo}`}
              </Button>
            )}
          </div>
        )}

        {period.status !== "PAID" && period.status !== "DECLARED" && period.rejectReason && (
          <p className="text-xs text-ink-muted">Dernier refus : {period.rejectReason}</p>
        )}
      </CardBody>
    </Card>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function LoyersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [periods, setPeriods] = React.useState<OwnerRentPeriod[]>([]);
  const [filter, setFilter] = React.useState<RentStatus | "ALL">("DECLARED");
  const [working, setWorking] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    api
      .ownerRents()
      .then((r) => {
        setPeriods(r);
        // S'il n'y a rien à vérifier, ouvrir directement sur « Tout ».
        if (!r.some((p) => p.status === "DECLARED")) setFilter("ALL");
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setWorking(false));
  }, [user, loading, router]);

  const counts = React.useMemo(() => {
    const now = new Date();
    const inMonth = (p: OwnerRentPeriod) => {
      const d = new Date(p.dueDate);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    };
    return {
      declared: periods.filter((p) => p.status === "DECLARED").length,
      late: periods.filter((p) => p.status === "LATE").length,
      collectedMonth: periods.filter((p) => p.status === "PAID" && inMonth(p)).reduce((s, p) => s + p.amount, 0),
      expectedMonth: periods.filter(inMonth).reduce((s, p) => s + p.amount, 0),
    };
  }, [periods]);

  const shown = periods.filter((p) => filter === "ALL" || p.status === filter);

  if (loading || working) return <LoadingSkeleton />;
  if (error) return <p className="text-danger">Erreur lors du chargement des loyers : {error}</p>;

  return (
    <section className="space-y-6">
      {/* Bandeau + chiffres clés */}
      <AnimatedBackground variant="soft" className="rounded-2xl border border-border/60 px-6 sm:px-8 py-7">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl mb-1">
              Suivi des <span className="gradient-text">loyers</span>
            </h1>
            <p className="text-ink-muted max-w-xl">
              Vos locataires paient sur vos coordonnées (
              <Link href="/profile" className="font-medium text-brand-600 dark:text-brand-300 hover:underline">
                rubrique Profil
              </Link>
              ) puis déclarent ici. Validez après vérification sur votre relevé — la quittance part toute seule.
            </p>
          </div>
        </div>

        {periods.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 stagger">
            <StatCard icon="🔍" value={counts.declared} label="À vérifier" highlight={counts.declared > 0} />
            <StatCard icon="⏰" value={counts.late} label="En retard" />
            <StatCard icon="✅" value={fmtEUR(counts.collectedMonth)} label="Encaissé ce mois-ci" />
            <StatCard icon="📆" value={fmtEUR(counts.expectedMonth)} label="Attendu ce mois-ci" />
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
              onClick={() => setFilter(f.value)}
              className={
                "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors " +
                (filter === f.value
                  ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                  : "border-border bg-surface text-ink-muted hover:text-ink hover:border-ink/30")
              }
            >
              {f.label}
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
          title={filter === "DECLARED" ? "Rien à vérifier" : "Rien à afficher"}
          description={
            periods.length === 0
              ? "Les échéances apparaîtront dès qu'un bail actif est enregistré sur l'un de vos biens."
              : filter === "DECLARED"
                ? "Aucune déclaration de versement en attente. Vous serez alerté par e-mail dès qu'un locataire déclare un paiement."
                : "Aucune échéance dans cette catégorie."
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
