"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge, Card, CardBody, CardHeader, EmptyState } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import type { OwnerPaymentMethod, RentPeriod, RentStatus, TenantRentBundle } from "../../lib/api";

function fmtEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

const STATUS_LABEL: Record<RentStatus, string> = {
  DUE: "À payer",
  DECLARED: "En vérification",
  PAID: "Payé",
  LATE: "En retard",
};

const STATUS_TONE: Record<RentStatus, "neutral" | "success" | "brand" | "accent"> = {
  DUE: "accent",
  DECLARED: "brand",
  PAID: "success",
  LATE: "neutral",
};

// ── Coordonnées de paiement du propriétaire ─────────────────────────────────

function PaymentMethods({ methods }: { methods: OwnerPaymentMethod[] }) {
  const [copied, setCopied] = React.useState<string | null>(null);

  if (methods.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        Votre propriétaire n&apos;a pas encore renseigné ses coordonnées de paiement.
        Contactez-le via la messagerie.
      </p>
    );
  }

  const copy = async (m: OwnerPaymentMethod) => {
    try {
      await navigator.clipboard.writeText(m.value);
      setCopied(m.id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard indisponible */
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {methods.map((m) => (
        <div key={m.id} className="rounded-lg border border-border bg-white dark:bg-ink/5 p-4 space-y-1">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">{m.label}</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-mono font-medium text-ink break-all">{m.value}</p>
            <button
              onClick={() => copy(m)}
              className="shrink-0 text-xs font-medium text-brand-600 dark:text-brand-300 hover:underline"
            >
              {copied === m.id ? "✓ Copié" : "Copier"}
            </button>
          </div>
          {m.holder && <p className="text-xs text-ink-muted">Titulaire : {m.holder}</p>}
          {m.instructions && <p className="text-xs text-ink-muted">{m.instructions}</p>}
        </div>
      ))}
    </div>
  );
}

// ── Déclaration de versement ────────────────────────────────────────────────

function DeclareForm({
  period,
  methods,
  onDone,
  onCancel,
}: {
  period: RentPeriod;
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

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) {
      setError("La capture ne doit pas dépasser 4 Mo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setProof(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (reference.trim().length < 4) {
      setError("L'identifiant de transaction doit contenir au moins 4 caractères.");
      return;
    }
    setSending(true);
    try {
      const updated = await api.declareRent(period.id, {
        method: method || "Autre",
        reference: reference.trim(),
        proofDataUrl: proof ?? undefined,
        note: note.trim() || undefined,
      });
      onDone(updated);
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg.includes("déjà été utilisé") ? "Cet identifiant de transaction a déjà été utilisé." : msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-3 space-y-3 rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/20 p-4">
      <p className="text-sm font-semibold text-ink">
        Déclarer le versement de {fmtEUR(period.amount)} — {period.periodLabel}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-xs font-medium text-ink-muted">Moyen utilisé</span>
          {methods.length > 0 ? (
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-white dark:bg-ink/10 px-3 py-2 text-sm"
            >
              {methods.map((m) => (
                <option key={m.id} value={m.label}>{m.label}</option>
              ))}
              <option value="Autre">Autre</option>
            </select>
          ) : (
            <input
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Virement, espèces…"
              className="mt-1 w-full rounded-lg border border-border bg-white dark:bg-ink/10 px-3 py-2 text-sm"
            />
          )}
        </label>

        <label className="block text-sm">
          <span className="text-xs font-medium text-ink-muted">Identifiant de transaction *</span>
          <input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Référence du virement / reçu"
            required
            minLength={4}
            className="mt-1 w-full rounded-lg border border-border bg-white dark:bg-ink/10 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="text-xs font-medium text-ink-muted">Capture du reçu (optionnel, image ≤ 4 Mo)</span>
        <input type="file" accept="image/*" onChange={onFile} className="mt-1 block w-full text-xs text-ink-muted" />
      </label>
      {proof && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={proof} alt="Aperçu du reçu" className="max-h-40 rounded-lg border border-border" />
      )}

      <label className="block text-sm">
        <span className="text-xs font-medium text-ink-muted">Note pour le propriétaire (optionnel)</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          maxLength={500}
          className="mt-1 w-full rounded-lg border border-border bg-white dark:bg-ink/10 px-3 py-2 text-sm"
        />
      </label>

      {error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={sending}
          className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          {sending ? "Envoi…" : "Déclarer le versement"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border text-sm font-medium px-4 py-2 text-ink-muted hover:text-ink"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

// ── Ligne d'échéance ────────────────────────────────────────────────────────

function PeriodRow({
  period,
  methods,
  onUpdate,
}: {
  period: RentPeriod;
  methods: OwnerPaymentMethod[];
  onUpdate: (p: RentPeriod) => void;
}) {
  const [declaring, setDeclaring] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);

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
    <li className="py-3 border-b border-border last:border-0">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-40">
          <p className="text-sm font-semibold text-ink capitalize">{period.periodLabel}</p>
          <p className="text-xs text-ink-muted">Échéance le {fmtDate(period.dueDate)}</p>
        </div>
        <p className="text-sm font-medium text-ink tabular-nums">{fmtEUR(period.amount)}</p>
        <Badge tone={STATUS_TONE[period.status]}>{STATUS_LABEL[period.status]}</Badge>

        <div className="ml-auto flex gap-2">
          {(period.status === "DUE" || period.status === "LATE") && (
            <button
              onClick={() => setDeclaring((v) => !v)}
              className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
            >
              {declaring ? "Fermer" : "J'ai payé — déclarer"}
            </button>
          )}
          {period.status === "PAID" && period.receiptNo && (
            <button
              onClick={download}
              disabled={downloading}
              className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline disabled:opacity-60"
            >
              {downloading ? "…" : `📄 Quittance ${period.receiptNo}`}
            </button>
          )}
        </div>
      </div>

      {period.status === "DECLARED" && (
        <p className="mt-1 text-xs text-ink-muted">
          Déclaré le {period.declaredAt ? fmtDate(period.declaredAt) : "—"}
          {period.declaredMethod ? ` via ${period.declaredMethod}` : ""} — en attente de confirmation
          par votre propriétaire.
        </p>
      )}
      {period.rejectReason && period.status !== "PAID" && period.status !== "DECLARED" && (
        <p className="mt-1 text-xs text-danger">
          Déclaration précédente refusée : {period.rejectReason}
        </p>
      )}

      {declaring && (
        <DeclareForm
          period={period}
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
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bundles, setBundles] = React.useState<TenantRentBundle[]>([]);
  const [working, setWorking] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    api
      .myRents()
      .then(setBundles)
      .catch((e) => setError((e as Error).message))
      .finally(() => setWorking(false));
  }, [user, loading, router]);

  const updatePeriod = (leaseId: string, p: RentPeriod) => {
    setBundles((prev) =>
      prev.map((b) =>
        b.lease.id === leaseId
          ? { ...b, periods: b.periods.map((x) => (x.id === p.id ? p : x)) }
          : b,
      ),
    );
  };

  if (loading || working) return <p className="text-ink-muted">Chargement…</p>;
  if (error) return <p className="text-danger">Erreur lors du chargement de vos loyers : {error}</p>;

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">Mes loyers</h1>
      <p className="text-ink-muted mb-8">
        Payez votre loyer directement à votre propriétaire avec les coordonnées ci-dessous,
        puis déclarez le versement : il le confirme et votre quittance est générée automatiquement.
      </p>

      {bundles.length === 0 ? (
        <EmptyState
          title="Aucun loyer à afficher"
          description="Vous n'avez pas de bail actif enregistré à votre adresse email."
          action={<Link href="/" className="text-sm">Parcourir les annonces</Link>}
        />
      ) : (
        <div className="space-y-8">
          {bundles.map((b) => (
            <Card key={b.lease.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink">
                      {b.lease.property.title}
                    </h2>
                    <p className="text-sm text-ink-muted mt-0.5">
                      {b.lease.property.addressLine}, {b.lease.property.city} —{" "}
                      {fmtEUR(b.lease.monthlyRent + b.lease.charges)}/mois, payable le{" "}
                      {b.lease.rentPaymentDay}
                      {b.lease.rentPaymentDay === 1 ? "er" : ""} du mois
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="space-y-6">
                <section>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
                    Comment payer votre propriétaire
                  </h3>
                  <PaymentMethods methods={b.paymentMethods} />
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    Échéances
                  </h3>
                  <ul>
                    {b.periods.map((p) => (
                      <PeriodRow
                        key={p.id}
                        period={p}
                        methods={b.paymentMethods}
                        onUpdate={(x) => updatePeriod(b.lease.id, x)}
                      />
                    ))}
                  </ul>
                </section>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
