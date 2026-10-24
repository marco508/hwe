"use client";

import * as React from "react";
import type { MySubscription, PaymentMethod, Plan } from "@hwe/types";
import {
  Badge,
  Button,
  ErrorState,
  Icon,
  Input,
  Label,
  Select,
  Textarea,
  fmtDate,
  fmtMoney,
  toast,
  useAsync,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { KV, ProHero, SectionCard, StatTile } from "../../../components/pro/ProUi";
import { useSubscription } from "../../../components/pro/SubscriptionKit";

const METHODS: PaymentMethod[] = ["TRANSFER", "MOBILE_MONEY", "CASH", "OTHER"];

const statusTone = (s: MySubscription["status"]) =>
  (({ TRIAL: "brand", ACTIVE: "success", GRACE: "danger", FREE: "ocean", SUSPENDED: "danger" }) as const)[s];

/** Jauge « n / max » (max null = illimité). */
function Gauge({ label, n, max, hint }: { label: string; n: number; max: number | null; hint?: string }) {
  const pct = max === null ? 0 : max === 0 ? 100 : Math.min(100, Math.round((n / max) * 100));
  const over = max !== null && n > max;
  return (
    <div data-gauge={label}>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className={`tabular-nums ${over ? "text-danger font-semibold" : "text-ink-muted"}`}>
          {max === null ? t("sub.ofUnlimited", { n }) : t("sub.ofMax", { n, max })}
        </span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-cream-200 dark:bg-white/10 overflow-hidden" aria-hidden="true">
        <div
          className={`h-full rounded-full ${over ? "bg-danger" : pct >= 80 ? "bg-amber-500" : "bg-brand-500"}`}
          style={{ width: `${max === null ? 8 : Math.max(4, pct)}%` }}
        />
      </div>
      {hint && <p className="text-xs text-ink-muted mt-1">{hint}</p>}
    </div>
  );
}

function PlanCard({
  plan,
  current,
  selected,
  onChoose,
  free,
}: {
  plan: Pick<Plan, "code" | "name" | "monthlyPrice" | "currency" | "maxAgents" | "maxActiveMandates">;
  current: boolean;
  selected?: boolean;
  onChoose?: () => void;
  free?: boolean;
}) {
  return (
    <div
      data-plan={plan.code}
      className={`rounded-2xl border p-4 flex flex-col gap-3 min-w-0 ${
        selected ? "border-brand-500 ring-2 ring-brand-500/30 bg-brand-50/40 dark:bg-brand-900/20" : "border-border bg-surface"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-lg [overflow-wrap:anywhere]">{free ? t("sub.freeOffer") : plan.name}</p>
          {free && <p className="text-xs text-ink-muted">{t("sub.freeOfferSub")}</p>}
        </div>
        {current && <Badge tone="success">{t("sub.current")}</Badge>}
      </div>
      <p className="font-display text-2xl tabular-nums">
        {fmtMoney(plan.monthlyPrice, plan.currency)} <span className="text-sm text-ink-muted font-sans">{t("sub.perMonth")}</span>
      </p>
      <ul className="text-sm text-ink-muted space-y-1">
        <li className="flex items-center gap-1.5">
          <Icon name="users" size={14} />
          {plan.maxAgents === null ? t("sub.agentsUnl") : t("sub.agentsN", { n: plan.maxAgents })}
        </li>
        <li className="flex items-center gap-1.5">
          <Icon name="handshake" size={14} />
          {plan.maxActiveMandates === null ? t("sub.mandatesUnl") : t("sub.mandatesN", { n: plan.maxActiveMandates })}
        </li>
      </ul>
      {onChoose && (
        <Button size="sm" variant={selected ? "primary" : "secondary"} onClick={onChoose} aria-pressed={selected} className="mt-auto">
          {selected ? (
            <>
              <Icon name="check" size={14} /> {t("sub.chosen")}
            </>
          ) : (
            t("sub.choose")
          )}
        </Button>
      )}
    </div>
  );
}

export default function SubscriptionPage() {
  const { user } = useAuth();
  const ctx = useSubscription();
  const { data, error, loading, reload } = useAsync(() => api.mySubscription(), [user?.id]);
  const [planCode, setPlanCode] = React.useState<string>("");
  const [months, setMonths] = React.useState(1);
  const [method, setMethod] = React.useState<PaymentMethod>("TRANSFER");
  const [reference, setReference] = React.useState("");
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const refresh = () => {
    reload();
    ctx.reload();
  };

  if (error && !data) return <ErrorState error={error} title={t("pro.dash.loadError")} onRetry={reload} />;
  if (loading && !data) return <div className="h-64 rounded-2xl skeleton" />;
  const s = data!;
  const chosen = s.plans.find((p) => p.code === planCode) ?? null;
  const pending = s.pendingRequest;
  const lastResolved = s.requests.find((r) => r.status !== "PENDING");
  const end = s.status === "TRIAL" ? s.trialEndsAt : s.paidUntil;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chosen) return;
    setBusy(true);
    try {
      await api.declarePayment({ planCode: chosen.code, months, method, reference: reference.trim(), note: note.trim() || undefined });
      toast.success(t("sub.sent"));
      setReference("");
      setNote("");
      refresh();
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  const cancel = async () => {
    if (!pending) return;
    try {
      await api.cancelPaymentRequest(pending.id);
      toast.success(t("sub.cancelled"));
      refresh();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <section data-subscription-page={s.status}>
      <ProHero title={t("sub.title1")} accent={t("sub.title2")} sub={t("sub.sub")} agency={user?.agency ?? null} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatTile
          icon={s.status === "SUSPENDED" ? "lock" : s.status === "ACTIVE" ? "checkCircle" : "hourglass"}
          tone={statusTone(s.status) === "brand" ? "brand" : statusTone(s.status) === "success" ? "success" : statusTone(s.status) === "ocean" ? "ocean" : "danger"}
          label={t("sub.statusCard")}
          value={t(`sub.status.${s.status}`)}
          hint={s.daysLeft !== null && s.daysLeft > 0 && (s.status === "TRIAL" || s.status === "ACTIVE") ? t("sub.daysLeft", { n: s.daysLeft }) : undefined}
        />
        <StatTile icon="calendar" label={s.status === "TRIAL" ? t("sub.trialEnds") : t("sub.paidUntil")} value={end ? fmtDate(end) : "—"} />
        <StatTile icon="layers" tone="ocean" label={t("sub.plan")} value={s.plan?.name ?? (s.status === "FREE" ? t("sub.freeOffer") : t("sub.noPlan"))} />
        <StatTile icon="alarm" tone="accent" label={t("sub.graceEnds")} value={s.graceEndsAt ? fmtDate(s.graceEndsAt) : "—"} />
      </div>

      {!s.trialEndsAt && s.status !== "ACTIVE" && <p className="text-sm text-ink-muted mb-6">{t("sub.noTrial")}</p>}

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <SectionCard title={t("sub.usage")} icon="layers" className="lg:col-span-1">
          <div className="space-y-5">
            <Gauge
              label={t("sub.usageAgents")}
              n={s.usage.agents + s.usage.pendingInvites}
              max={s.limits.maxAgents}
              hint={s.usage.pendingInvites ? t("sub.pendingInvites", { n: s.usage.pendingInvites }) : undefined}
            />
            <Gauge label={t("sub.usageMandates")} n={s.usage.activeMandates + s.usage.pendingMandates} max={s.limits.maxActiveMandates} />
            {s.limits.source === "TRIAL" && <p className="text-xs text-ink-muted">{t("sub.limitsTrial")}</p>}
            {s.usage.readOnlyMandates > 0 && s.status !== "SUSPENDED" && (
              <p className="text-sm text-danger flex items-start gap-1.5">
                <Icon name="lock" size={14} className="mt-0.5 shrink-0" />
                {t("sub.readOnlyN", { n: s.usage.readOnlyMandates })}
              </p>
            )}
          </div>
        </SectionCard>

        <SectionCard title={t("sub.plans")} icon="tag" className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {s.freePlan.enabled && (
              <PlanCard
                free
                plan={{ code: "FREE", name: t("sub.freeOffer"), monthlyPrice: 0, currency: s.plans[0]?.currency ?? "EUR", maxAgents: s.freePlan.maxAgents, maxActiveMandates: s.freePlan.maxActiveMandates }}
                current={s.status === "FREE"}
              />
            )}
            {s.plans.map((p) => (
              <PlanCard
                key={p.id}
                plan={p}
                current={s.plan?.code === p.code && (s.status === "ACTIVE" || s.status === "GRACE")}
                selected={planCode === p.code}
                onChoose={s.isManager && !pending ? () => setPlanCode(p.code) : undefined}
              />
            ))}
          </div>
        </SectionCard>
      </div>

      {!s.isManager ? (
        <p className="flex items-start gap-2 text-sm text-ink-muted mb-6" data-agent-note>
          <Icon name="info" size={16} className="mt-0.5 shrink-0" />
          {t("sub.agentNote")}
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <SectionCard title={t("sub.instructions")} icon="landmark">
            {s.paymentInstructions ? (
              <p className="text-sm whitespace-pre-wrap [overflow-wrap:anywhere]" data-instructions>
                {s.paymentInstructions}
              </p>
            ) : (
              <p className="text-sm text-ink-muted">{t("sub.noInstructions")}</p>
            )}
            {lastResolved?.status === "REJECTED" && !pending && (
              <p role="alert" className="mt-4 rounded-xl border border-danger/40 bg-danger/5 px-3 py-2 text-sm">
                {t("sub.rejected", { reference: lastResolved.reference, reason: lastResolved.rejectReason ?? "" })}
              </p>
            )}
            {lastResolved?.status === "APPROVED" && !pending && lastResolved.resolvedAt && (
              <p className="mt-4 text-sm text-success flex items-center gap-1.5">
                <Icon name="checkCircle" size={15} /> {t("sub.approved", { date: fmtDate(lastResolved.resolvedAt) })}
              </p>
            )}
          </SectionCard>

          <SectionCard title={t("sub.payTitle")} icon="creditCard">
            {pending ? (
              <div className="rounded-xl border border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700/60 dark:bg-amber-900/20 dark:text-amber-100 p-4 space-y-3" data-pending-request>
                <p className="font-semibold flex items-center gap-1.5">
                  <Icon name="hourglass" size={16} /> {t("sub.pendingTitle")}
                </p>
                <p className="text-sm [overflow-wrap:anywhere]">
                  {t("sub.pendingText", {
                    plan: pending.plan.name,
                    months: pending.months,
                    amount: fmtMoney(pending.amount, pending.currency),
                    reference: pending.reference,
                    date: fmtDate(pending.createdAt),
                  })}
                </p>
                <Button size="sm" variant="secondary" onClick={cancel}>
                  {t("sub.cancelRequest")}
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" data-pay-form>
                {!chosen && <p className="text-sm text-ink-muted">{t("sub.pickPlan")}</p>}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sub-months">{t("sub.duration")}</Label>
                    <Select id="sub-months" value={String(months)} onChange={(e) => setMonths(Number(e.target.value))}>
                      {s.durations.map((m) => (
                        <option key={m} value={m}>
                          {t("sub.months", { n: m })}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sub-method">{t("sub.method")}</Label>
                    <Select id="sub-method" value={method} onChange={(e) => setMethod(e.target.value as PaymentMethod)}>
                      {METHODS.map((m) => (
                        <option key={m} value={m}>
                          {t(`sub.method.${m}`)}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="sub-ref">{t("sub.reference")}</Label>
                  <Input id="sub-ref" required minLength={2} maxLength={120} value={reference} onChange={(e) => setReference(e.target.value)} />
                  <p className="text-xs text-ink-muted mt-1">{t("sub.referenceHint")}</p>
                </div>
                <div>
                  <Label htmlFor="sub-note">{t("sub.note")}</Label>
                  <Textarea id="sub-note" rows={2} maxLength={1000} value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                {chosen && (
                  <KV label={t("sub.total")}>
                    <span className="font-display text-xl tabular-nums" data-total>
                      {fmtMoney(Math.round(chosen.monthlyPrice * months * 100) / 100, chosen.currency)}
                    </span>
                  </KV>
                )}
                <Button type="submit" variant="gradient" disabled={busy || !chosen || reference.trim().length < 2}>
                  <Icon name="checkCircle" size={16} /> {busy ? t("sub.sending") : t("sub.iPaid")}
                </Button>
              </form>
            )}
          </SectionCard>
        </div>
      )}

      {s.isManager && (
        <SectionCard title={t("sub.payments")} icon="file">
          {s.payments.length === 0 ? (
            <p className="text-sm text-ink-muted">{t("sub.noPayments")}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-invoices>
                <thead className="text-start text-ink-muted">
                  <tr>
                    <th className="py-2 pe-3 font-medium">{t("sub.colNumber")}</th>
                    <th className="py-2 pe-3 font-medium">{t("sub.colPlan")}</th>
                    <th className="py-2 pe-3 font-medium">{t("sub.colPeriod")}</th>
                    <th className="py-2 pe-3 font-medium text-end">{t("sub.colAmount")}</th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody>
                  {s.payments.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="py-2 pe-3 font-mono text-xs">{p.number}</td>
                      <td className="py-2 pe-3">{p.plan.name} · {t("sub.months", { n: p.months })}</td>
                      <td className="py-2 pe-3 text-ink-muted">{t("sub.period", { from: fmtDate(p.periodStart), to: fmtDate(p.periodEnd) })}</td>
                      <td className="py-2 pe-3 text-end tabular-nums">{fmtMoney(p.amount, p.currency)}</td>
                      <td className="py-2 text-end">
                        <Button size="sm" variant="secondary" onClick={() => api.downloadInvoice(p.id).catch((e) => toast.error(e))}>
                          <Icon name="download" size={14} /> {t("sub.download")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      )}
    </section>
  );
}
