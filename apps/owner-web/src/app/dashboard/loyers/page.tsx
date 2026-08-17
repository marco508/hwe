"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Badge, Card, CardBody, CardHeader, EmptyState } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import type { OwnerRentPeriod, RentStatus } from "../../../lib/api";

function fmtEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
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
  { value: "ALL", label: "Tout" },
  { value: "DUE", label: "À payer" },
  { value: "LATE", label: "En retard" },
  { value: "PAID", label: "Payés" },
];

// ── Carte d'une déclaration à vérifier ──────────────────────────────────────

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
    <Card>
      <CardBody className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-52">
            <p className="text-sm font-semibold text-ink capitalize">
              {period.periodLabel} — {fmtEUR(period.amount)}
            </p>
            <p className="text-xs text-ink-muted">
              {period.lease.property.title}, {period.lease.property.city} · {period.lease.tenantName}
            </p>
          </div>
          <Badge tone={STATUS_TONE[period.status]}>{STATUS_LABEL[period.status]}</Badge>
          <p className="text-xs text-ink-muted ml-auto">Échéance : {fmtDate(period.dueDate)}</p>
        </div>

        {period.status === "DECLARED" && (
          <div className="rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/20 p-4 space-y-3">
            <div className="text-sm text-ink space-y-1">
              <p>
                Déclaré le {period.declaredAt ? fmtDate(period.declaredAt) : "—"}
                {period.declaredMethod ? <> via <strong>{period.declaredMethod}</strong></> : null}
              </p>
              {period.declaredRef && (
                <p>
                  Identifiant de transaction :{" "}
                  <code className="font-mono text-xs bg-white dark:bg-ink/10 border border-border rounded px-1.5 py-0.5">
                    {period.declaredRef}
                  </code>
                </p>
              )}
              {period.tenantNote && <p className="text-ink-muted">Note : {period.tenantNote}</p>}
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
                    className="mt-2 max-h-96 rounded-lg border border-border"
                  />
                )}
              </div>
            )}

            <p className="text-xs text-ink-muted">
              ⚠️ Vérifiez la réception sur votre relevé (banque ou opérateur), pas seulement
              sur la capture : une capture peut se falsifier, votre relevé non.
            </p>

            {!rejecting ? (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => review(true)}
                  disabled={busy}
                  className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 transition-colors"
                >
                  {busy ? "…" : "✓ J'ai bien reçu — valider"}
                </button>
                <button
                  onClick={() => setRejecting(true)}
                  disabled={busy}
                  className="rounded-lg border border-danger/40 text-danger text-sm font-medium px-4 py-2 hover:bg-danger/5"
                >
                  Refuser
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Motif du refus (ex. : montant non reçu sur mon compte)"
                  maxLength={300}
                  className="w-full rounded-lg border border-border bg-white dark:bg-ink/10 px-3 py-2 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => review(false)}
                    disabled={busy}
                    className="rounded-lg bg-danger hover:opacity-90 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2"
                  >
                    {busy ? "…" : "Confirmer le refus"}
                  </button>
                  <button
                    onClick={() => setRejecting(false)}
                    className="rounded-lg border border-border text-sm font-medium px-4 py-2 text-ink-muted"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {period.status === "PAID" && (
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <span>
              Payé le {period.paidAt ? fmtDate(period.paidAt) : "—"}
              {period.declaredMethod ? ` via ${period.declaredMethod}` : ""}
            </span>
            {period.receiptNo && (
              <button
                onClick={download}
                disabled={downloading}
                className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline disabled:opacity-60"
              >
                {downloading ? "…" : `📄 Quittance ${period.receiptNo}`}
              </button>
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

  const load = React.useCallback(() => {
    setWorking(true);
    api
      .ownerRents()
      .then(setPeriods)
      .catch((e) => setError((e as Error).message))
      .finally(() => setWorking(false));
  }, []);

  React.useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    load();
  }, [user, loading, router, load]);

  const shown = periods.filter((p) => filter === "ALL" || p.status === filter);
  const nbDeclared = periods.filter((p) => p.status === "DECLARED").length;

  if (loading || working) return <p className="text-ink-muted">Chargement…</p>;
  if (error) return <p className="text-danger">Erreur lors du chargement des loyers : {error}</p>;

  return (
    <section>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <h1 className="font-display text-3xl">Loyers</h1>
        {nbDeclared > 0 && (
          <Badge tone="brand">{nbDeclared} déclaration{nbDeclared > 1 ? "s" : ""} à vérifier</Badge>
        )}
      </div>
      <p className="text-ink-muted mb-6">
        Vos locataires paient directement sur vos coordonnées (rubrique Profil), puis déclarent
        leur versement ici. Validez après vérification sur votre relevé : la quittance est
        générée et envoyée automatiquement.
      </p>

      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors " +
              (filter === f.value
                ? "bg-brand-600 text-white border-brand-600"
                : "border-border text-ink-muted hover:text-ink")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          title="Rien à afficher"
          description={
            filter === "DECLARED"
              ? "Aucune déclaration de versement en attente de vérification."
              : "Aucune échéance dans cette catégorie."
          }
        />
      ) : (
        <div className="space-y-4">
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
