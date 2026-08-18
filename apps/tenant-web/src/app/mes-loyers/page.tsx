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
  Input,
  Label,
  Select,
  Textarea,
} from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import type { OwnerPaymentMethod, RentPeriod, RentStatus, TenantRentBundle } from "../../lib/api";

function fmtEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
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

const STATUS_DOT: Record<RentStatus, string> = {
  DUE: "bg-accent-500",
  DECLARED: "bg-ocean-400",
  PAID: "bg-brand-500",
  LATE: "bg-danger",
};

/** Devine une icône selon le libellé du moyen de paiement. */
function methodIcon(label: string) {
  const l = label.toLowerCase();
  if (/(iban|virement|sepa|banque|bank)/.test(l)) return "🏦";
  if (/(momo|mobile|orange|mtn|wave|moov|m-pesa)/.test(l)) return "📱";
  if (/(paypal|lydia|revolut|wise|paylib)/.test(l)) return "💳";
  if (/(espèce|especes|cash|liquide)/.test(l)) return "💶";
  if (/(chèque|cheque)/.test(l)) return "🖋️";
  return "💰";
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
    { icon: "1", title: "Payez votre propriétaire", text: "directement sur ses coordonnées ci-dessous" },
    { icon: "2", title: "Déclarez le versement", text: "avec l'identifiant de la transaction" },
    { icon: "3", title: "Recevez votre quittance", text: "dès qu'il confirme la réception" },
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

function PaymentMethods({ methods }: { methods: OwnerPaymentMethod[] }) {
  const [copied, setCopied] = React.useState<string | null>(null);

  if (methods.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-cream-50 dark:bg-white/[0.03] px-4 py-4 text-sm text-ink-muted">
        Votre propriétaire n&apos;a pas encore renseigné ses coordonnées de paiement.
        Demandez-les-lui via la <Link href="/messages" className="font-medium text-brand-600 dark:text-brand-300 hover:underline">messagerie</Link>.
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
            <span className="text-lg" aria-hidden="true">{methodIcon(m.label)}</span>
            <p className="text-sm font-semibold text-ink">{m.label}</p>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-cream-100 dark:bg-white/[0.05] px-3 py-2">
            <p className="text-sm font-mono font-medium text-ink break-all">{m.value}</p>
            <button
              onClick={() => copy(m)}
              className={
                "shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors " +
                (copied === m.id
                  ? "bg-brand-600 text-white"
                  : "bg-surface border border-border text-brand-600 dark:text-brand-300 hover:border-brand-400")
              }
            >
              {copied === m.id ? "✓ Copié" : "Copier"}
            </button>
          </div>
          {(m.holder || m.instructions) && (
            <div className="mt-2 space-y-0.5">
              {m.holder && <p className="text-xs text-ink-muted">Titulaire : {m.holder}</p>}
              {m.instructions && <p className="text-xs text-ink-muted">{m.instructions}</p>}
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
    setError(null);
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
    <form
      onSubmit={submit}
      className="mt-3 space-y-4 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-900/20 p-5"
    >
      <div>
        <p className="text-sm font-semibold text-ink">
          Déclarer le versement de {fmtEUR(period.amount)} — {period.periodLabel}
        </p>
        <p className="text-xs text-ink-muted mt-0.5">
          Votre propriétaire vérifiera la réception avant de valider et d&apos;émettre la quittance.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label>Moyen utilisé</Label>
          {methods.length > 0 ? (
            <Select value={method} onChange={(e) => setMethod(e.target.value)}>
              {methods.map((m) => (
                <option key={m.id} value={m.label}>{m.label}</option>
              ))}
              <option value="Autre">Autre</option>
            </Select>
          ) : (
            <Input
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Virement, espèces…"
            />
          )}
        </div>
        <div className="space-y-1">
          <Label>Identifiant de transaction *</Label>
          <Input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Référence du virement / reçu"
            required
            minLength={4}
            className="font-mono"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Capture du reçu <span className="font-normal text-ink-subtle">(optionnel, image ≤ 4 Mo)</span></Label>
        <input
          type="file"
          accept="image/*"
          onChange={onFile}
          className="block w-full text-xs text-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:text-white file:px-3 file:py-1.5 file:text-xs file:font-semibold hover:file:bg-brand-700 file:cursor-pointer"
        />
        {proof && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={proof} alt="Aperçu du reçu" className="mt-2 max-h-40 rounded-lg border border-border" />
        )}
      </div>

      <div className="space-y-1">
        <Label>Note pour le propriétaire <span className="font-normal text-ink-subtle">(optionnel)</span></Label>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={500} />
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={sending}>
          {sending ? "Envoi…" : "Déclarer le versement"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
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
    <li className="py-3.5 border-b border-border/70 last:border-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${STATUS_DOT[period.status]}`} aria-hidden="true" />
        <div className="min-w-36">
          <p className="text-sm font-semibold text-ink capitalize leading-tight">{period.periodLabel}</p>
          <p className="text-xs text-ink-muted">échéance le {fmtDate(period.dueDate)}</p>
        </div>
        <p className="display-serif text-base text-ink tabular-nums">{fmtEUR(period.amount)}</p>
        <Badge tone={STATUS_TONE[period.status]}>{STATUS_LABEL[period.status]}</Badge>

        <div className="ml-auto flex gap-2">
          {(period.status === "DUE" || period.status === "LATE") && (
            <Button size="sm" variant={declaring ? "ghost" : "primary"} onClick={() => setDeclaring((v) => !v)}>
              {declaring ? "Fermer" : "J'ai payé — déclarer"}
            </Button>
          )}
          {period.status === "PAID" && period.receiptNo && (
            <Button size="sm" variant="secondary" onClick={download} disabled={downloading}>
              {downloading ? "…" : "📄 Quittance"}
            </Button>
          )}
        </div>
      </div>

      {period.status === "DECLARED" && (
        <p className="mt-1.5 ml-6 text-xs text-ink-muted">
          Déclaré le {period.declaredAt ? fmtDate(period.declaredAt) : "—"}
          {period.declaredMethod ? ` via ${period.declaredMethod}` : ""} · en attente de confirmation du propriétaire.
        </p>
      )}
      {period.status === "PAID" && period.receiptNo && (
        <p className="mt-1.5 ml-6 text-xs text-ink-muted">
          Quittance n° {period.receiptNo}
          {period.paidAt ? ` · confirmé le ${fmtDate(period.paidAt)}` : ""}
        </p>
      )}
      {period.rejectReason && period.status !== "PAID" && period.status !== "DECLARED" && (
        <p className="mt-1.5 ml-6 text-xs text-danger">
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

  // Prochaine échéance à régler, tous baux confondus (pour le bandeau).
  const nextDue = React.useMemo(() => {
    const open = bundles
      .flatMap((b) => b.periods)
      .filter((p) => p.status === "DUE" || p.status === "LATE")
      .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));
    return open[0] ?? null;
  }, [bundles]);

  if (loading || working) return <LoadingSkeleton />;
  if (error) return <p className="text-danger">Erreur lors du chargement de vos loyers : {error}</p>;

  return (
    <section className="space-y-6">
      {/* Bandeau */}
      <AnimatedBackground variant="soft" className="rounded-2xl border border-border/60 px-6 sm:px-8 py-7">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl mb-1">
              Mes <span className="gradient-text">loyers</span>
            </h1>
            <p className="text-ink-muted max-w-xl">
              Échéances, déclarations de versement, quittances.
            </p>
          </div>
          {nextDue ? (
            <div className="glass rounded-xl px-4 py-3">
              <p className="text-[11px] text-ink-muted uppercase tracking-wide">Prochaine échéance</p>
              <p className="font-display text-lg leading-tight capitalize">
                {nextDue.periodLabel} · {fmtEUR(nextDue.amount)}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                {nextDue.status === "LATE" || +new Date(nextDue.dueDate) < Date.now()
                  ? "⚠️ échéance dépassée depuis le"
                  : "à régler avant le"}{" "}
                {fmtDate(nextDue.dueDate)}
              </p>
            </div>
          ) : bundles.length > 0 ? (
            <div className="glass rounded-xl px-4 py-3">
              <p className="font-display text-lg leading-tight">✓ Vous êtes à jour</p>
              <p className="text-xs text-ink-muted mt-0.5">Aucun loyer en attente</p>
            </div>
          ) : null}
        </div>
      </AnimatedBackground>

      {bundles.length === 0 ? (
        <EmptyState
          title="Aucun loyer à afficher"
          description="Vous n'avez pas de bail actif enregistré à votre adresse email. Si vous venez de signer un bail, contactez votre propriétaire."
          action={<Link href="/" className="text-sm">Parcourir les annonces</Link>}
        />
      ) : (
        <>
          <HowItWorks />

          {bundles.map((b) => (
            <Card key={b.lease.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink">
                      {b.lease.property.title}
                    </h2>
                    <p className="text-sm text-ink-muted mt-0.5">
                      {b.lease.property.addressLine}, {b.lease.property.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="display-serif text-lg text-ink">{fmtEUR(b.lease.monthlyRent + b.lease.charges)}<span className="text-xs text-ink-muted font-sans"> /mois</span></p>
                    <p className="text-xs text-ink-muted">
                      payable le {b.lease.rentPaymentDay}
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
        </>
      )}
    </section>
  );
}
