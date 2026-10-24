"use client";

import * as React from "react";
import Link from "next/link";
import { ErrorState, Icon, fmtMoney, useAsync, EmptyState } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { isManager } from "../../lib/pro";
import { LINK_PRIMARY, LINK_SECONDARY, ProHero, SectionCard, StatTile } from "../../components/pro/ProUi";

export default function ProDashboardPage() {
  const { user } = useAuth();
  const manager = isManager(user);
  const { data, error, loading, reload } = useAsync(() => api.agencyOverview(), [user?.id]);

  if (error && !data) return <ErrorState error={error} title={t("pro.dash.loadError")} onRetry={reload} />;

  const o = data;
  const cur = o?.feesCurrency ?? "EUR";
  const more = (o?.feesByCurrency ?? []).slice(1);

  return (
    <section>
      <ProHero
        kicker={manager ? t("pro.role.MANAGER") : t("pro.role.AGENT")}
        title={t("pro.dash.title1")}
        accent={user?.firstName ?? ""}
        sub={t("pro.dash.sub", { agency: user?.agency?.name ?? "" })}
        agency={user?.agency ?? null}
        actions={
          <>
            <Link href="/pro/nouveau" className={LINK_PRIMARY}>
              <Icon name="plus" size={16} strokeWidth={2.2} /> {t("pro.dash.add")}
            </Link>
            {manager && (
              <Link href="/pro/agence#equipe" className={LINK_SECONDARY}>
                <Icon name="users" size={16} /> {t("pro.dash.inviteAgent")}
              </Link>
            )}
          </>
        }
      />

      {loading && !o ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl skeleton" />
          ))}
        </div>
      ) : o ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 stagger">
            <StatTile icon="building" label={t("pro.stat.properties")} value={o.properties} hint={t("pro.stat.activeMandates", { n: o.activeMandates })} href="/pro/biens" />
            <StatTile icon="hourglass" tone="accent" label={t("pro.stat.pendingMandates")} value={o.pendingMandates} hint={t("pro.stat.pendingHint")} href="/pro/mandats?status=PENDING_OWNER" highlight={o.pendingMandates > 0} />
            <StatTile icon="wallet" tone="accent" label={t("pro.stat.rentsToVerify")} value={o.rentsToVerify} hint={t("pro.stat.rentsHint")} href="/dashboard/loyers" highlight={o.rentsToVerify > 0} />
            <StatTile icon="alarm" tone="danger" label={t("pro.stat.lateRents")} value={o.lateRents} hint={t("pro.stat.lateHint")} href="/dashboard/loyers" highlight={o.lateRents > 0} />
            <StatTile icon="wrench" tone="neutral" label={t("pro.stat.tickets")} value={o.openTickets} hint={t("pro.stat.ticketsHint")} href="/dashboard/tickets" />
            <StatTile icon="calendar" tone="ocean" label={t("pro.stat.visits")} value={o.upcomingVisits} hint={t("pro.stat.visitsHint")} href="/dashboard/visites" />
            <StatTile icon="handshake" tone="brand" label={t("pro.stat.proposals")} value={o.pendingProposals} hint={t("pro.stat.proposalsHint")} href="/dashboard/inquiries" highlight={o.pendingProposals > 0} />
            <StatTile
              icon="coins"
              tone="success"
              label={t("pro.stat.fees")}
              value={fmtMoney(o.feesDueThisMonth, cur)}
              hint={t("pro.stat.feesHint", { settled: fmtMoney(o.feesSettledThisMonth, cur) }) + (more.length ? ` · ${more.map((m) => fmtMoney(m.due, m.currency)).join(" · ")}` : "")}
              href="/pro/honoraires"
            />
          </div>

          {manager && (
            <SectionCard title={t("pro.dash.byAgent")} icon="users" actions={<Link href="/pro/agence#equipe" className="text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline">{t("pro.dash.manageTeam")}</Link>}>
              {o.byAgent.length === 0 ? (
                <EmptyState illustration="home" title={t("pro.dash.noAgents")} description={t("pro.dash.noAgentsSub")} />
              ) : (
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-sm min-w-[520px]">
                    <thead>
                      <tr className="text-start text-xs uppercase tracking-wide text-ink-muted border-b border-border">
                        <th className="py-2 px-4 sm:px-2 font-medium">{t("pro.dash.agent")}</th>
                        <th className="py-2 px-2 font-medium text-end">{t("pro.stat.properties")}</th>
                        <th className="py-2 px-2 font-medium text-end">{t("pro.dash.colPending")}</th>
                        <th className="py-2 px-2 font-medium text-end">{t("pro.dash.colRents")}</th>
                        <th className="py-2 px-4 sm:px-2 font-medium text-end">{t("pro.dash.colTickets")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {o.byAgent.map((a) => (
                        <tr key={a.userId ?? "none"} className="border-b border-border/60 last:border-0">
                          <td className="py-2.5 px-4 sm:px-2">
                            {a.unassigned ? (
                              <span className="italic text-ink-muted">{t("pro.dash.unassigned")}</span>
                            ) : (
                              <span className="font-medium">
                                {a.firstName} {a.lastName}
                                {a.role === "MANAGER" && <span className="ms-2 text-xs text-ink-muted">{t("pro.role.MANAGER")}</span>}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-2 text-end tabular-nums">{a.properties}</td>
                          <td className="py-2.5 px-2 text-end tabular-nums">{a.pendingMandates}</td>
                          <td className="py-2.5 px-2 text-end tabular-nums">{a.rentsToVerify}</td>
                          <td className="py-2.5 px-4 sm:px-2 text-end tabular-nums">{a.openTickets}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SectionCard>
          )}

          {o.properties === 0 && (
            <EmptyState
              className="mt-8"
              illustration="home"
              title={t("pro.dash.emptyTitle")}
              description={t("pro.dash.emptySub")}
              action={
                <Link href="/pro/nouveau" className={LINK_PRIMARY}>
                  {t("pro.dash.add")}
                </Link>
              }
            />
          )}
        </>
      ) : null}
    </section>
  );
}
