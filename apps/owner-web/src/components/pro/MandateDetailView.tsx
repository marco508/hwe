"use client";

import * as React from "react";
import Link from "next/link";
import type { FeeEntry, MandateDetail, MandateEvent, Statement } from "@hwe/types";
import {
  AgencyLogo,
  Badge,
  Button,
  EmptyState,
  ErrorState,
  Icon,
  Input,
  InviteLinkBox,
  Label,
  SafeImage,
  Select,
  fmtDate,
  fmtDateTime,
  fmtMoney,
  isNotFound,
  toast,
  useAsync,
} from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { currentMonth, feeLabel, feeTermsLines, invalidatePortfolio, monthLabel, useMyAgency } from "../../lib/pro";
import { ConfirmDialog, KV, MandateStatusBadge, MandateTypeBadge, SectionCard, WarningNote } from "./ProUi";

export function MandateDetailView({ id, backHref }: { id: string; backHref: string }) {
  const { user } = useAuth();
  const { data: m, setData, error, loading, reload } = useAsync(() => api.getMandate(id), [id, user?.id]);
  const agency = useMyAgency();
  const [ending, setEnding] = React.useState(false);
  const [rejecting, setRejecting] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [inviteUrl, setInviteUrl] = React.useState<string | null>(null);

  if (error && !m) {
    return isNotFound(error) ? (
      <EmptyState illustration="search" title={t("pro.m.notFound")} description={t("pro.m.notFoundSub")} />
    ) : (
      <ErrorState error={error} title={t("pro.m.loadError")} onRetry={reload} />
    );
  }
  if (loading || !m) return <div className="h-96 rounded-2xl skeleton" aria-busy="true" />;

  const asOwner = m.me.as === "OWNER";
  const merge = (u: Partial<MandateDetail>) => setData((cur) => (cur ? { ...cur, ...u } : cur));

  const accept = async () => {
    setBusy(true);
    try {
      merge(await api.acceptMandate(m.id));
      toast.success(t("pro.m.accepted"));
      reload();
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };
  const reject = async (reason: string) => {
    setBusy(true);
    try {
      merge(await api.rejectMandate(m.id, reason));
      toast.success(t("pro.m.rejected"));
      setRejecting(false);
      reload();
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };
  const end = async (reason: string) => {
    setBusy(true);
    try {
      merge(await api.endMandate(m.id, reason));
      invalidatePortfolio();
      toast.success(t("pro.m.ended"));
      setEnding(false);
      reload();
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };
  const assign = async (agentId: string) => {
    try {
      merge(await api.updateMandate(m.id, { assignedAgentId: agentId || null }));
      invalidatePortfolio();
      toast.success(t("pro.m.assigned"));
      reload();
    } catch (e) {
      toast.error(e);
    }
  };
  const resend = async () => {
    try {
      const r = await api.resendOwnerInvite(m.id);
      setInviteUrl(r.ownerInviteUrl);
      toast.success(t("pro.owner.linkReady"));
    } catch (e) {
      toast.error(e);
    }
  };

  const cur = m.currency;
  const photo = m.property.media?.[0]?.url;
  const propHref = asOwner || m.status === "ACTIVE" ? `/dashboard/${m.property.id}` : null;

  return (
    <section className="space-y-6" data-mandate={m.reference}>
      <Link href={backHref} className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
        <Icon name="chevronLeft" size={14} className="rtl:rotate-180" /> {t("pro.m.back")}
      </Link>

      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
        <SafeImage src={photo} alt={m.property.title} className="h-24 w-full sm:w-32 rounded-xl object-cover" fallbackClassName="h-24 w-full sm:w-32 rounded-xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <MandateTypeBadge type={m.type} />
            <MandateStatusBadge status={m.status} />
            <span className="font-mono text-xs text-ink-muted">{m.reference}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl leading-tight [overflow-wrap:anywhere]">
            {propHref ? (
              <Link href={propHref} className="text-ink hover:text-brand-700">
                {m.property.title}
              </Link>
            ) : (
              m.property.title
            )}
          </h1>
          <p className="text-sm text-ink-muted [overflow-wrap:anywhere]">
            {m.property.addressLine}, {m.property.postalCode} {m.property.city}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {m.me.canAccept && m.status === "PENDING_OWNER" && (
            <>
              <Button variant="secondary" disabled={busy} onClick={() => setRejecting(true)}>
                {t("pro.m.reject")}
              </Button>
              <Button variant="gradient" disabled={busy} onClick={accept}>
                <Icon name="check" size={16} className="me-1.5" /> {t("pro.m.accept")}
              </Button>
            </>
          )}
          {m.me.canEnd && m.status === "ACTIVE" && (
            <Button variant="danger" onClick={() => setEnding(true)}>
              {t("pro.m.end")}
            </Button>
          )}
        </div>
      </div>

      {m.status === "ENDED" && (
        <p className="rounded-xl border border-border bg-cream-50/70 dark:bg-white/5 px-4 py-3 text-sm">
          {t("pro.m.endedOn", { date: m.endedAt ? fmtDate(m.endedAt) : "—" })}
          {m.endReason ? ` — ${t("common.quote", { text: m.endReason })}` : ""}
          {!asOwner && <span className="block text-ink-muted mt-1">{t("pro.m.endedProNote")}</span>}
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <SectionCard title={t("pro.m.terms")} icon="clipboard" className="lg:col-span-2">
          <KV label={t("pro.terms.type")}>{t(`pro.mtype.${m.type}`)}</KV>
          <KV label={t("pro.m.fees")}>
            {feeTermsLines(m).map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </KV>
          {m.type !== "SALE" && <KV label={t("pro.terms.payee")}>{t(`pro.terms.payee.${m.rentPayee}`)}</KV>}
          <KV label={t("pro.terms.start")}>{fmtDate(m.startDate)}</KV>
          <KV label={t("pro.m.endLabel")}>{m.endDate ? fmtDate(m.endDate) : t("pro.m.noEnd")}</KV>
          <KV label={t("pro.m.origin")}>{m.createdBy === "OWNER" ? t("pro.m.originOwner") : t("pro.m.originAgency")}</KV>
          {m.message && <KV label={t("pro.m.message")}>{m.message}</KV>}
        </SectionCard>

        <SectionCard title={t("pro.m.parties")} icon="users">
          <div className="flex items-center gap-3 mb-3">
            <AgencyLogo name={m.agency.name} logoUrl={m.agency.logoUrl} />
            <div className="min-w-0">
              <p className="font-medium [overflow-wrap:anywhere]">{m.agency.name}</p>
              <p className="text-xs text-ink-muted [overflow-wrap:anywhere]">
                {[m.agency.email, m.agency.phone].filter(Boolean).join(" · ") || m.agency.code}
              </p>
            </div>
          </div>
          <KV label={t("pro.m.agent")}>
            {m.me.canAssign && agency.data ? (
              <Select aria-label={t("pro.m.assign")} value={m.assignedAgent?.id ?? ""} onChange={(e) => assign(e.target.value)} className="h-9 text-sm" id="assign-agent">
                <option value="">{t("pro.dash.unassigned")}</option>
                {agency.data.members.map((x) => (
                  <option key={x.userId} value={x.userId}>
                    {x.user.firstName} {x.user.lastName}
                  </option>
                ))}
              </Select>
            ) : m.assignedAgent ? (
              `${m.assignedAgent.firstName} ${m.assignedAgent.lastName}`
            ) : (
              t("pro.dash.unassigned")
            )}
          </KV>
          {m.owner && (
            <KV label={t("pro.hub.owner")}>
              <span className="block">
                {m.owner.firstName} {m.owner.lastName}
              </span>
              {!asOwner && (
                <span className="block text-xs text-ink-muted font-normal">{m.owner.email}</span>
              )}
              {!m.owner.activated && <Badge tone="accent">{t("pro.owner.notActivated")}</Badge>}
            </KV>
          )}
          {m.me.canResendOwnerInvite && (
            <div className="mt-3">
              {inviteUrl ? (
                <InviteLinkBox url={inviteUrl} title={t("pro.owner.activationLink")} message={t("pro.owner.waMessage", { agency: m.agency.name })} />
              ) : (
                <Button size="sm" variant="secondary" onClick={resend}>
                  <Icon name="send" size={14} className="me-1.5" /> {t("pro.owner.resend")}
                </Button>
              )}
            </div>
          )}
        </SectionCard>
      </div>

      <FeesSection m={m} onChanged={reload} />
      {m.type !== "SALE" && <StatementSection mandateId={m.id} currency={cur} />}

      <SectionCard title={t("pro.m.history")} icon="clock">
        <Timeline events={m.events} />
      </SectionCard>

      {ending && (
        <ConfirmDialog
          title={t("pro.m.endTitle")}
          confirmLabel={t("pro.m.endConfirm")}
          tone="danger"
          busy={busy}
          onClose={() => setEnding(false)}
          onConfirm={end}
          requireText={{ label: t("pro.m.endReason"), min: 3 }}
        >
          <WarningNote>{asOwner ? t("pro.m.endWarnOwner", { agency: m.agency.name }) : t("pro.m.endWarnPro")}</WarningNote>
        </ConfirmDialog>
      )}
      {rejecting && (
        <ConfirmDialog
          title={t("pro.m.rejectTitle")}
          confirmLabel={t("pro.m.reject")}
          tone="danger"
          busy={busy}
          onClose={() => setRejecting(false)}
          onConfirm={reject}
        >
          <p className="text-ink-muted">{t("pro.m.rejectText", { agency: m.agency.name })}</p>
        </ConfirmDialog>
      )}
    </section>
  );
}

function FeesSection({ m, onChanged }: { m: MandateDetail; onChanged: () => void }) {
  const { user } = useAuth();
  const manager = user?.agency?.role === "MANAGER" && m.me.as === "MANAGER";
  const s = m.feesSummary;
  const toggle = async (f: FeeEntry) => {
    try {
      await api.setFeeStatus(f.id, f.status === "SETTLED" ? "DUE" : "SETTLED");
      toast.success(f.status === "SETTLED" ? t("pro.fees.reopened") : t("pro.fees.settledToast"));
      onChanged();
    } catch (e) {
      toast.error(e);
    }
  };
  return (
    <SectionCard title={t("pro.m.feesTitle")} icon="coins">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-accent-50/70 dark:bg-accent-700/15 p-3">
          <p className="text-xs text-ink-muted">{t("pro.fees.due")}</p>
          <p className="font-display text-xl" data-fees-due>{fmtMoney(s.due, s.currency)}</p>
        </div>
        <div className="rounded-xl bg-brand-50 dark:bg-brand-900/30 p-3">
          <p className="text-xs text-ink-muted">{t("pro.fees.settled")}</p>
          <p className="font-display text-xl">{fmtMoney(s.settled, s.currency)}</p>
        </div>
      </div>
      {m.fees.length === 0 ? (
        <p className="text-sm text-ink-muted">{t("pro.fees.none")}</p>
      ) : (
        <ul className="divide-y divide-border/70 text-sm">
          {m.fees.map((f) => (
            <li key={f.id} className="py-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 justify-between" data-fee={f.kind}>
              <div className="min-w-0">
                <p className="font-medium [overflow-wrap:anywhere]">{feeLabel(f)}</p>
                <p className="text-xs text-ink-muted">
                  {t(`pro.feeKind.${f.kind}`)} · {fmtDate(f.dueDate)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tabular-nums">{fmtMoney(f.amount, f.currency)}</span>
                <Badge tone={f.status === "SETTLED" ? "success" : f.status === "DUE" ? "accent" : "neutral"}>{t(`pro.feeStatus.${f.status}`)}</Badge>
                {manager && f.status !== "CANCELLED" && (
                  <Button size="sm" variant="ghost" onClick={() => toggle(f)}>
                    {f.status === "SETTLED" ? t("pro.fees.markDue") : t("pro.fees.markSettled")}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

export function StatementSection({ mandateId, currency }: { mandateId: string; currency: string }) {
  const [month, setMonth] = React.useState(currentMonth());
  const { data, error, loading } = useAsync<Statement>(() => api.statement(mandateId, month), [mandateId, month], {
    enabled: /^\d{4}-\d{2}$/.test(month),
  });
  const [dl, setDl] = React.useState(false);
  const download = async () => {
    setDl(true);
    try {
      await api.downloadStatement(mandateId, month);
    } catch (e) {
      toast.error(e);
    } finally {
      setDl(false);
    }
  };
  const cur = data?.currency ?? currency;
  return (
    <SectionCard
      title={t("pro.st.title")}
      icon="file"
      actions={
        <div className="flex items-end gap-2">
          <div>
            <Label htmlFor={`st-${mandateId}`} className="sr-only">
              {t("pro.st.month")}
            </Label>
            <Input id={`st-${mandateId}`} type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="h-9 w-40" />
          </div>
          <Button size="sm" variant="secondary" onClick={download} disabled={dl}>
            <Icon name="file" size={14} className="me-1.5" /> {dl ? t("pro.processing") : t("pro.st.pdf")}
          </Button>
        </div>
      }
    >
      {loading && !data ? (
        <div className="h-20 rounded-xl skeleton" />
      ) : error ? (
        <p className="text-sm text-ink-muted">{t("pro.st.error")}</p>
      ) : data ? (
        <div className="text-sm space-y-3" data-statement={data.month}>
          <p className="text-ink-muted">{t("pro.st.period", { label: monthLabel(data.month) })}</p>
          {data.rents.length === 0 && data.fees.length === 0 ? (
            <p className="text-ink-muted">{t("pro.st.empty")}</p>
          ) : (
            <ul className="divide-y divide-border/70">
              {data.rents.map((r) => (
                <li key={r.periodId} className="py-2 flex justify-between gap-3">
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    {t("pro.st.rent", { label: r.periodLabel, tenant: r.tenantName })}
                  </span>
                  <span className="tabular-nums">{fmtMoney(r.amount, r.currency)}</span>
                </li>
              ))}
              {data.fees.map((f) => (
                <li key={f.id} className="py-2 flex justify-between gap-3 text-ink-muted">
                  <span className="min-w-0 [overflow-wrap:anywhere]">{feeLabel(f)}</span>
                  <span className="tabular-nums">− {fmtMoney(f.amount, f.currency)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
            <div>
              <p className="text-xs text-ink-muted">{t("pro.st.collected")}</p>
              <p className="font-semibold tabular-nums">{fmtMoney(data.totals.collected, cur)}</p>
            </div>
            <div>
              <p className="text-xs text-ink-muted">{t("pro.st.fees")}</p>
              <p className="font-semibold tabular-nums">{fmtMoney(data.totals.fees, cur)}</p>
            </div>
            <div>
              <p className="text-xs text-ink-muted">{t("pro.st.net")}</p>
              <p className="font-semibold tabular-nums text-brand-700 dark:text-brand-300">{fmtMoney(data.totals.net, cur)}</p>
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}

const EVENT_ICON: Record<string, Parameters<typeof Icon>[0]["name"]> = {
  CREATED: "sparkles",
  ACCEPTED: "checkCircle",
  REJECTED: "xCircle",
  ENDED: "ban",
  AGENT_ASSIGNED: "idCard",
  TENANT_PROPOSED: "handshake",
  TENANT_APPROVED: "checkCircle",
  TENANT_DECLINED: "xCircle",
  LEASE_PREPARED: "clipboard",
  ACTED_ON_BEHALF: "alert",
  RENT_VALIDATED: "wallet",
  FEE_CREATED: "coins",
  PROPERTY_SOLD: "party",
  OWNER_ACTIVATED: "user",
  INSPECTION_UPDATED: "clipboard",
  INSPECTION_SIGNED: "signature",
  TERMS_UPDATED: "pen",
  INQUIRY_REJECTED: "xCircle",
  AMENDMENT_PREPARED: "clipboard",
  TICKET_UPDATED: "wrench",
  VISIT_ANSWERED: "calendarCheck",
  RENT_REJECTED: "xCircle",
  OWNER_NOTICE_GIVEN: "mail",
  PROPERTY_UPDATED: "pen",
  FEE_SETTLED: "checkCircle",
  FEE_REOPENED: "coins",
  OWNER_INVITE_SENT: "send",
};

export function Timeline({ events }: { events: MandateEvent[] }) {
  if (events.length === 0) return <p className="text-sm text-ink-muted">{t("pro.m.noEvents")}</p>;
  return (
    <ol className="relative border-s border-border ms-3 space-y-4" data-timeline>
      {[...events].reverse().map((e) => {
        const mention = typeof e.data?.mention === "string" ? (e.data.mention as string) : null;
        const reason = typeof e.data?.reason === "string" ? (e.data.reason as string) : null;
        return (
          <li key={e.id} className="ms-5">
            <span className="absolute -start-3 mt-0.5 h-6 w-6 rounded-full bg-surface ring-1 ring-border inline-flex items-center justify-center text-brand-700 dark:text-brand-300">
              <Icon name={EVENT_ICON[e.kind] ?? "dots"} size={13} />
            </span>
            <p className="text-sm font-medium" data-event={e.kind}>
              {t(`pro.ev.${e.kind}`) === `pro.ev.${e.kind}` ? e.kind : t(`pro.ev.${e.kind}`)}
              {e.kind === "ACTED_ON_BEHALF" && typeof e.data?.action === "string" && (
                <span className="font-normal text-ink-muted"> — {t(`pro.evAction.${e.data.action as string}`)}</span>
              )}
            </p>
            <p className="text-xs text-ink-muted">
              {fmtDateTime(e.createdAt)}
              {e.actor && (
                <>
                  {" · "}
                  {t("pro.byName", {
                    name: `${e.actor.firstName} ${e.actor.lastName}${e.actor.agencyName ? ` (${e.actor.agencyName})` : ""}`,
                  })}
                </>
              )}
            </p>
            {(mention || reason) && <p className="text-xs mt-1 italic text-ink-muted [overflow-wrap:anywhere]">{mention ?? reason}</p>}
          </li>
        );
      })}
    </ol>
  );
}
