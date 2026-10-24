"use client";

import * as React from "react";
import type { AdminSubscriptionAgency, PaymentMethod, Plan, PlatformSettings, SubscriptionRequest } from "@hwe/types";
import { Badge, Button, CurrencyPicker, Icon, Input, Label, Select, Textarea, fmtDate, fmtDateTime, fmtMoney, toast } from "@hwe/ui";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { Modal } from "../Modal";
import { ConfirmDialog, SectionCard } from "./ProUi";

/**
 * Onglet « Abonnements » de l'admin : déclarations de paiement à valider ou
 * refuser, agences et statut (prolonger l'essai, enregistrer un paiement,
 * changer l'offre, suspendre / réactiver), offres et paramètres plateforme.
 */

const METHODS: PaymentMethod[] = ["TRANSFER", "MOBILE_MONEY", "CASH", "OTHER"];
const TONE = { TRIAL: "brand", ACTIVE: "success", GRACE: "danger", FREE: "ocean", SUSPENDED: "danger" } as const;

const isoDay = (d: string | null) => (d ? d.slice(0, 10) : "");
const lim = (n: number | null) => (n === null ? "∞" : String(n));

type Dialog =
  | { kind: "reject"; request: SubscriptionRequest }
  | { kind: "trial"; agency: AdminSubscriptionAgency }
  | { kind: "pay"; agency: AdminSubscriptionAgency }
  | { kind: "plan"; agency: AdminSubscriptionAgency }
  | null;

export function AdminSubscriptions({ q }: { q: string }) {
  const [requests, setRequests] = React.useState<SubscriptionRequest[]>([]);
  const [agencies, setAgencies] = React.useState<AdminSubscriptionAgency[]>([]);
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [settings, setSettings] = React.useState<PlatformSettings | null>(null);
  const [dialog, setDialog] = React.useState<Dialog>(null);
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    const [r, a, p, s] = await Promise.all([
      api.adminSubscriptionRequests("PENDING"),
      api.adminSubscriptionAgencies(q || undefined),
      api.adminPlans(),
      api.adminSettings(),
    ]);
    setRequests(r);
    setAgencies(a);
    setPlans(p);
    setSettings(s);
  }, [q]);

  React.useEffect(() => {
    const id = setTimeout(() => load().catch((e) => toast.error(e)), 300);
    return () => clearTimeout(id);
  }, [load]);

  const run = async (fn: () => Promise<unknown>, done = t("ops.admin.done")) => {
    setBusy(true);
    try {
      await fn();
      toast.success(done);
      setDialog(null);
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
      load().catch(() => {});
    }
  };

  const paidPlans = plans.filter((p) => !p.isFree);

  return (
    <div className="space-y-6" data-admin-subscriptions>
      <SectionCard title={`${t("sub.admin.requests")} (${requests.length})`} icon="inbox">
        {requests.length === 0 ? (
          <p className="text-sm text-ink-muted">{t("sub.admin.noRequests")}</p>
        ) : (
          <ul className="space-y-3">
            {requests.map((r) => (
              <li key={r.id} className="rounded-xl border border-border p-3 flex flex-wrap items-center justify-between gap-3" data-request={r.id}>
                <div className="min-w-0 text-sm">
                  <p className="font-medium [overflow-wrap:anywhere]">
                    {r.agency.name} <span className="font-mono text-xs text-ink-muted">{r.agency.code}</span>
                  </p>
                  <p className="text-ink-muted [overflow-wrap:anywhere]">
                    {r.plan.name} · {t("sub.months", { n: r.months })} · <strong className="text-ink">{fmtMoney(r.amount, r.currency)}</strong> ·{" "}
                    {t(`sub.method.${r.method}`)} · {t("sub.reference")} : <span className="font-mono">{r.reference}</span>
                  </p>
                  <p className="text-xs text-ink-muted">
                    {r.createdBy ? `${r.createdBy.firstName} ${r.createdBy.lastName} (${r.createdBy.email}) · ` : ""}
                    {fmtDateTime(r.createdAt)}
                  </p>
                  {r.note && <p className="text-xs mt-1 [overflow-wrap:anywhere]">{t("common.quote", { text: r.note })}</p>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" disabled={busy} onClick={() => run(() => api.adminApproveRequest(r.id))} data-approve>
                    <Icon name="check" size={14} /> {t("sub.admin.approve")}
                  </Button>
                  <Button size="sm" variant="secondary" disabled={busy} onClick={() => setDialog({ kind: "reject", request: r })}>
                    <Icon name="x" size={14} /> {t("sub.admin.reject")}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <SectionCard title={t("sub.admin.agencies")} icon="store">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-sub-agencies>
            <thead className="text-start text-ink-muted">
              <tr>
                <th className="py-2 pe-3 font-medium">{t("sub.admin.colAgency")}</th>
                <th className="py-2 pe-3 font-medium">{t("sub.admin.colStatus")}</th>
                <th className="py-2 pe-3 font-medium">{t("sub.admin.colPlan")}</th>
                <th className="py-2 pe-3 font-medium">{t("sub.admin.colUntil")}</th>
                <th className="py-2 pe-3 font-medium">{t("sub.admin.colUsage")}</th>
                <th className="py-2 font-medium">{t("sub.admin.colActions")}</th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((a) => {
                const s = a.subscription;
                const end = s.status === "TRIAL" ? s.trialEndsAt : s.paidUntil ?? s.trialEndsAt;
                return (
                  <tr key={a.id} className="border-t border-border align-top" data-sub-agency={a.code}>
                    <td className="py-2 pe-3">
                      <p className="font-medium">{a.name}</p>
                      <p className="text-xs text-ink-muted font-mono">{a.code}</p>
                      <p className="text-xs text-ink-muted">{a.managers.map((m) => m.email).join(", ")}</p>
                    </td>
                    <td className="py-2 pe-3">
                      <Badge tone={TONE[s.status]}>{t(`sub.status.${s.status}`)}</Badge>
                      {s.manualSuspension && <p className="text-xs text-danger mt-1">{t("sub.admin.manual")}</p>}
                      {a.pendingRequestId && <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">{t("sub.admin.colRequest")} {t("sub.admin.pending")}</p>}
                    </td>
                    <td className="py-2 pe-3 text-ink-muted">{s.plan?.name ?? "—"}</td>
                    <td className="py-2 pe-3 text-ink-muted">
                      {end ? fmtDate(end) : "—"}
                      {s.status === "GRACE" && s.graceEndsAt && <p className="text-xs">{t("sub.graceEnds")} : {fmtDate(s.graceEndsAt)}</p>}
                    </td>
                    <td className="py-2 pe-3 text-ink-muted tabular-nums">
                      {s.usage.agents}/{lim(s.limits.maxAgents)} · {s.usage.activeMandates}/{lim(s.limits.maxActiveMandates)}
                    </td>
                    <td className="py-2">
                      <div className="flex flex-wrap gap-1.5">
                        <Button size="sm" variant="secondary" onClick={() => setDialog({ kind: "trial", agency: a })}>
                          <Icon name="calendar" size={14} /> {t("sub.admin.extendTrial")}
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => setDialog({ kind: "pay", agency: a })}>
                          <Icon name="banknote" size={14} /> {t("sub.admin.recordPayment")}
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => setDialog({ kind: "plan", agency: a })}>
                          <Icon name="layers" size={14} /> {t("sub.admin.changePlan")}
                        </Button>
                        <Button
                          size="sm"
                          variant={s.manualSuspension ? "primary" : "danger"}
                          disabled={busy}
                          onClick={() => run(() => api.adminUpdateAgencySubscription(a.id, { manualSuspension: !s.manualSuspension }))}
                        >
                          <Icon name={s.manualSuspension ? "check" : "ban"} size={14} />{" "}
                          {s.manualSuspension ? t("sub.admin.reactivate") : t("sub.admin.suspend")}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid xl:grid-cols-2 gap-6">
        <SectionCard title={t("sub.admin.plans")} icon="tag">
          <p className="text-xs text-ink-muted mb-3">{t("sub.admin.unlimitedHint")}</p>
          <div className="space-y-3">
            {plans.map((p) => (
              <div key={p.id} className="space-y-2">
                <PlanRow plan={p} onSave={(body) => run(() => api.adminUpdatePlan(p.id, body), t("sub.admin.saved"))} />
                {!p.isFree && (
                  <PlanPrices plan={p} busy={busy} onSave={(prices) => run(() => api.adminSetPlanPrices(p.id, prices), t("sub.admin.saved"))} />
                )}
              </div>
            ))}
          </div>
        </SectionCard>
        {settings && <SettingsForm settings={settings} onSave={(body) => run(() => api.adminUpdateSettings(body), t("sub.admin.saved"))} />}
      </div>

      {dialog?.kind === "reject" && (
        <ConfirmDialog
          title={t("sub.admin.rejectTitle")}
          confirmLabel={t("sub.admin.reject")}
          tone="danger"
          busy={busy}
          requireText={{ label: t("sub.admin.rejectReason"), min: 3 }}
          onClose={() => setDialog(null)}
          onConfirm={(reason) => run(() => api.adminRejectRequest(dialog.request.id, reason))}
        >
          <p>
            {dialog.request.agency.name} · {dialog.request.plan.name} · {fmtMoney(dialog.request.amount, dialog.request.currency)} · {dialog.request.reference}
          </p>
        </ConfirmDialog>
      )}
      {dialog?.kind === "trial" && (
        <DateDialog
          title={t("sub.admin.extendTitle", { name: dialog.agency.name })}
          initial={isoDay(dialog.agency.subscription.trialEndsAt)}
          busy={busy}
          onClose={() => setDialog(null)}
          onSave={(d) => run(() => api.adminUpdateAgencySubscription(dialog.agency.id, { trialEndsAt: `${d}T23:59:59.000Z` }))}
        />
      )}
      {dialog?.kind === "pay" && (
        <PaymentDialog
          agency={dialog.agency}
          plans={paidPlans}
          busy={busy}
          onClose={() => setDialog(null)}
          onSave={(body) => run(() => api.adminRecordPayment(dialog.agency.id, body))}
        />
      )}
      {dialog?.kind === "plan" && (
        <PlanDialog
          agency={dialog.agency}
          plans={paidPlans}
          busy={busy}
          onClose={() => setDialog(null)}
          onSave={(code) => run(() => api.adminUpdateAgencySubscription(dialog.agency.id, { planCode: code }))}
        />
      )}
    </div>
  );
}

function PlanRow({ plan, onSave }: { plan: Plan; onSave: (b: Partial<Plan>) => void }) {
  const [f, setF] = React.useState({
    name: plan.name,
    monthlyPrice: String(plan.monthlyPrice),
    maxAgents: plan.maxAgents === null ? "" : String(plan.maxAgents),
    maxActiveMandates: plan.maxActiveMandates === null ? "" : String(plan.maxActiveMandates),
    active: plan.active,
  });
  const n = (s: string) => (s.trim() === "" ? null : Number(s));
  const id = `plan-${plan.code}`;
  return (
    <form
      className="rounded-xl border border-border p-3 grid grid-cols-2 sm:grid-cols-6 gap-2 items-end"
      data-plan-row={plan.code}
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          name: f.name.trim(),
          monthlyPrice: Number(f.monthlyPrice.replace(",", ".")),
          maxAgents: n(f.maxAgents),
          maxActiveMandates: n(f.maxActiveMandates),
          active: f.active,
        });
      }}
    >
      <div className="col-span-2 sm:col-span-2">
        <Label htmlFor={`${id}-name`}>
          {t("sub.admin.colName")} <span className="font-mono text-xs text-ink-muted">{plan.code}</span>
        </Label>
        <Input id={`${id}-name`} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </div>
      <div>
        <Label htmlFor={`${id}-price`}>{t("sub.admin.colPrice")}</Label>
        <Input id={`${id}-price`} inputMode="decimal" disabled={plan.isFree} value={f.monthlyPrice} onChange={(e) => setF({ ...f, monthlyPrice: e.target.value })} />
      </div>
      <div>
        <Label htmlFor={`${id}-agents`}>{t("sub.admin.colAgents")}</Label>
        <Input id={`${id}-agents`} inputMode="numeric" value={f.maxAgents} onChange={(e) => setF({ ...f, maxAgents: e.target.value })} />
      </div>
      <div>
        <Label htmlFor={`${id}-mandates`}>{t("sub.admin.colMandates")}</Label>
        <Input id={`${id}-mandates`} inputMode="numeric" value={f.maxActiveMandates} onChange={(e) => setF({ ...f, maxActiveMandates: e.target.value })} />
      </div>
      <div className="col-span-2 sm:col-span-6 flex items-center justify-end gap-3">
        {!plan.isFree && (
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} />
            {t("sub.admin.colActive")}
          </label>
        )}
        <Button size="sm" type="submit">
          {t("sub.admin.save")}
        </Button>
      </div>
    </form>
  );
}

/**
 * Prix d'une offre par devise : l'agence paie dans sa devise de facturation
 * si un prix y est défini, sinon en EUR (avec un « ≈ » indicatif).
 */
function PlanPrices({
  plan,
  busy,
  onSave,
}: {
  plan: Plan;
  busy: boolean;
  onSave: (prices: { currency: string; monthlyPrice: number }[]) => void;
}) {
  const initial = (plan.prices?.length ? plan.prices : [{ currency: plan.currency, monthlyPrice: plan.monthlyPrice }]).map((p) => ({
    currency: p.currency,
    price: String(p.monthlyPrice),
  }));
  const [rows, setRows] = React.useState(initial);
  const [adding, setAdding] = React.useState("XOF");
  const used = new Set(rows.map((r) => r.currency));
  const valid = rows.length > 0 && rows.every((r) => r.price.trim() !== "" && Number(r.price.replace(",", ".")) >= 0);
  return (
    <form
      className="rounded-xl border border-dashed border-border p-3 space-y-2"
      data-plan-prices={plan.code}
      onSubmit={(e) => {
        e.preventDefault();
        onSave(rows.map((r) => ({ currency: r.currency, monthlyPrice: Number(r.price.replace(",", ".")) })));
      }}
    >
      <p className="text-sm font-medium text-ink">{t("sub.admin.prices", { name: plan.name })}</p>
      <p className="text-xs text-ink-muted">{t("sub.admin.pricesHint")}</p>
      <ul className="space-y-1.5">
        {rows.map((r, i) => (
          <li key={r.currency} className="flex items-center gap-2" data-price-row={r.currency}>
            <span className="w-12 font-mono text-sm">{r.currency}</span>
            <Input
              aria-label={t("sub.admin.priceIn", { currency: r.currency })}
              inputMode="decimal"
              value={r.price}
              onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))}
              className="max-w-[10rem]"
            />
            <span className="text-xs text-ink-muted">{t("pro.perMonthShort")}</span>
            {r.currency !== "EUR" && (
              <Button size="sm" variant="ghost" type="button" aria-label={t("sub.admin.removePrice", { currency: r.currency })} onClick={() => setRows(rows.filter((_, j) => j !== i))}>
                <Icon name="trash" size={14} />
              </Button>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2">
        <CurrencyPicker compact value={adding} onChange={setAdding} label={t("sub.admin.addCurrency")} />
        <Button
          size="sm"
          variant="secondary"
          type="button"
          disabled={used.has(adding)}
          onClick={() => setRows([...rows, { currency: adding, price: "" }])}
        >
          <Icon name="plus" size={14} /> {t("sub.admin.addPrice", { currency: adding })}
        </Button>
        <Button size="sm" type="submit" disabled={busy || !valid} className="ms-auto">
          {t("sub.admin.savePrices")}
        </Button>
      </div>
    </form>
  );
}

function SettingsForm({ settings, onSave }: { settings: PlatformSettings; onSave: (b: Partial<PlatformSettings>) => void }) {
  const [f, setF] = React.useState({
    trialDays: String(settings.trialDays),
    graceDays: String(settings.graceDays),
    freePlanEnabled: settings.freePlanEnabled,
    paymentInstructions: settings.paymentInstructions ?? "",
  });
  return (
    <SectionCard title={t("sub.admin.settings")} icon="wrench">
      <form
        className="space-y-4"
        data-sub-settings
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            trialDays: Number(f.trialDays),
            graceDays: Number(f.graceDays),
            freePlanEnabled: f.freePlanEnabled,
            paymentInstructions: f.paymentInstructions.trim() || null,
          });
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="set-trial">{t("sub.admin.trialDays")}</Label>
            <Input id="set-trial" inputMode="numeric" value={f.trialDays} onChange={(e) => setF({ ...f, trialDays: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="set-grace">{t("sub.admin.graceDays")}</Label>
            <Input id="set-grace" inputMode="numeric" value={f.graceDays} onChange={(e) => setF({ ...f, graceDays: e.target.value })} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" id="set-free" checked={f.freePlanEnabled} onChange={(e) => setF({ ...f, freePlanEnabled: e.target.checked })} />
          {t("sub.admin.freeEnabled")}
        </label>
        <div>
          <Label htmlFor="set-instr">{t("sub.admin.instructions")}</Label>
          <Textarea id="set-instr" rows={4} maxLength={4000} value={f.paymentInstructions} onChange={(e) => setF({ ...f, paymentInstructions: e.target.value })} />
        </div>
        <Button type="submit">{t("sub.admin.save")}</Button>
      </form>
    </SectionCard>
  );
}

function DateDialog({ title, initial, busy, onClose, onSave }: { title: string; initial: string; busy: boolean; onClose: () => void; onSave: (d: string) => void }) {
  const [d, setD] = React.useState(initial);
  return (
    <Modal title={title} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="trial-date">{t("sub.admin.newDate")}</Label>
          <Input id="trial-date" type="date" value={d} onChange={(e) => setD(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>{t("pro.cancel")}</Button>
          <Button variant="gradient" disabled={busy || !d} onClick={() => onSave(d)}>{t("sub.admin.confirm")}</Button>
        </div>
      </div>
    </Modal>
  );
}

function PaymentDialog({
  agency,
  plans,
  busy,
  onClose,
  onSave,
}: {
  agency: AdminSubscriptionAgency;
  plans: Plan[];
  busy: boolean;
  onClose: () => void;
  onSave: (b: { planCode: string; months: number; method: PaymentMethod; reference?: string }) => void;
}) {
  const [planCode, setPlanCode] = React.useState(agency.subscription.plan?.code && !agency.subscription.plan.isFree ? agency.subscription.plan.code : plans[0]?.code ?? "");
  const [months, setMonths] = React.useState("1");
  const [method, setMethod] = React.useState<PaymentMethod>("TRANSFER");
  const [reference, setReference] = React.useState("");
  const plan = plans.find((p) => p.code === planCode);
  // Même règle que l'API : prix dans la devise de facturation de l'agence s'il existe, sinon EUR.
  const billing = agency.billingCurrency ?? "EUR";
  const prices = plan ? (plan.prices?.length ? plan.prices : [{ currency: plan.currency, monthlyPrice: plan.monthlyPrice }]) : [];
  const offer = prices.find((x) => x.currency === billing) ?? prices.find((x) => x.currency === "EUR") ?? prices[0];
  return (
    <Modal title={t("sub.admin.recordTitle", { name: agency.name })} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="pay-plan">{t("sub.plan")}</Label>
            <Select id="pay-plan" value={planCode} onChange={(e) => setPlanCode(e.target.value)}>
              {plans.map((p) => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="pay-months">{t("sub.admin.months")}</Label>
            <Input id="pay-months" inputMode="numeric" value={months} onChange={(e) => setMonths(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="pay-method">{t("sub.method")}</Label>
            <Select id="pay-method" value={method} onChange={(e) => setMethod(e.target.value as PaymentMethod)}>
              {METHODS.map((m) => (
                <option key={m} value={m}>{t(`sub.method.${m}`)}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="pay-ref">{t("sub.reference")}</Label>
            <Input id="pay-ref" value={reference} onChange={(e) => setReference(e.target.value)} />
          </div>
        </div>
        {plan && offer && Number(months) > 0 && (
          <p className="text-sm">
            {t("sub.total")} : <strong>{fmtMoney(Math.round(offer.monthlyPrice * Number(months) * 100) / 100, offer.currency)}</strong>
            <span className="text-xs text-ink-muted"> · {t("sub.billingCurrency")} : {billing}</span>
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>{t("pro.cancel")}</Button>
          <Button
            variant="gradient"
            disabled={busy || !plan || !(Number(months) >= 1)}
            onClick={() => onSave({ planCode, months: Number(months), method, reference: reference.trim() || undefined })}
          >
            {t("sub.admin.confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function PlanDialog({ agency, plans, busy, onClose, onSave }: { agency: AdminSubscriptionAgency; plans: Plan[]; busy: boolean; onClose: () => void; onSave: (code: string) => void }) {
  const [code, setCode] = React.useState(agency.subscription.plan?.code ?? plans[0]?.code ?? "");
  return (
    <Modal title={t("sub.admin.planTitle", { name: agency.name })} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="chg-plan">{t("sub.plan")}</Label>
          <Select id="chg-plan" value={code} onChange={(e) => setCode(e.target.value)}>
            {plans.map((p) => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>{t("pro.cancel")}</Button>
          <Button variant="gradient" disabled={busy || !code} onClick={() => onSave(code)}>{t("sub.admin.confirm")}</Button>
        </div>
      </div>
    </Modal>
  );
}
