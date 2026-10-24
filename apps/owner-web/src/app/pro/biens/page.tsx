"use client";

import * as React from "react";
import Link from "next/link";
import type { MandateType, Property } from "@hwe/types";
import {
  Badge,
  EmptyState,
  ErrorState,
  Icon,
  Input,
  PropertyCard,
  Select,
  tUi,
  useAsync,
  useCurrency,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { t } from "../../../lib/i18n";
import { isManager, loadPortfolio, MANDATE_TYPES, useMyAgency } from "../../../lib/pro";
import { LINK_PRIMARY, LINK_SM, MandateTypeBadge, ProHero } from "../../../components/pro/ProUi";

const STATUSES = ["PUBLISHED", "DRAFT", "RENTED", "SOLD", "ARCHIVED"] as const;

export default function ProPortfolioPage() {
  const { user } = useAuth();
  const manager = isManager(user);
  const { format } = useCurrency();
  const { data, error, loading, reload } = useAsync(() => loadPortfolio(user!.id, true), [user?.id]);
  const agency = useMyAgency();
  const [q, setQ] = React.useState("");
  const [agent, setAgent] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [type, setType] = React.useState<MandateType | "">("");
  const [status, setStatus] = React.useState("");

  const items: Property[] = data ?? [];
  const owners = React.useMemo(() => {
    const m = new Map<string, string>();
    for (const p of items) if (p.owner) m.set(p.owner.id, `${p.owner.firstName} ${p.owner.lastName}`);
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [items]);
  const agentName = (id: string | null | undefined) => {
    if (!id) return null;
    const m = agency.data?.members.find((x) => x.userId === id);
    return m ? `${m.user.firstName} ${m.user.lastName}` : null;
  };

  const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const visible = items.filter((p) => {
    if (q.trim()) {
      const hay = norm(`${p.title} ${p.city} ${p.owner?.firstName ?? ""} ${p.owner?.lastName ?? ""} ${p.mandate?.reference ?? ""}`);
      if (!hay.includes(norm(q.trim()))) return false;
    }
    if (agent === "none" && p.mandate?.assignedAgentId) return false;
    if (agent && agent !== "none" && p.mandate?.assignedAgentId !== agent) return false;
    if (owner && p.owner?.id !== owner) return false;
    if (type && p.mandate?.type !== type) return false;
    if (status && p.status !== status) return false;
    return true;
  });

  if (error && !data) return <ErrorState error={error} title={t("pro.biens.loadError")} onRetry={reload} />;

  return (
    <section>
      <ProHero
        title={t("pro.biens.title1")}
        accent={t("pro.biens.title2")}
        sub={t("pro.biens.sub")}
        actions={
          <Link href="/pro/nouveau" className={LINK_PRIMARY}>
            <Icon name="plus" size={16} strokeWidth={2.2} /> {t("pro.dash.add")}
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6" role="search">
        <div className="sm:col-span-2 lg:col-span-1 relative">
          <Icon name="search" size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <Input aria-label={t("pro.biens.search")} placeholder={t("pro.biens.search")} value={q} onChange={(e) => setQ(e.target.value)} className="ps-9" id="pf-search" />
        </div>
        {manager && (
          <Select aria-label={t("pro.biens.fAgent")} value={agent} onChange={(e) => setAgent(e.target.value)} id="pf-agent">
            <option value="">{t("pro.biens.allAgents")}</option>
            <option value="none">{t("pro.dash.unassigned")}</option>
            {(agency.data?.members ?? []).map((m) => (
              <option key={m.userId} value={m.userId}>
                {m.user.firstName} {m.user.lastName}
              </option>
            ))}
          </Select>
        )}
        <Select aria-label={t("pro.biens.fOwner")} value={owner} onChange={(e) => setOwner(e.target.value)} id="pf-owner">
          <option value="">{t("pro.biens.allOwners")}</option>
          {owners.map(([id, n]) => (
            <option key={id} value={id}>
              {n}
            </option>
          ))}
        </Select>
        <Select aria-label={t("pro.biens.fType")} value={type} onChange={(e) => setType(e.target.value as MandateType | "")} id="pf-type">
          <option value="">{t("pro.biens.allTypes")}</option>
          {MANDATE_TYPES.map((ty) => (
            <option key={ty} value={ty}>
              {t(`pro.mtype.${ty}`)}
            </option>
          ))}
        </Select>
        <Select aria-label={t("pro.biens.fStatus")} value={status} onChange={(e) => setStatus(e.target.value)} id="pf-status">
          <option value="">{t("pro.biens.allStatuses")}</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {tUi(`ui.status.${s}`)}
            </option>
          ))}
        </Select>
      </div>

      {loading && !data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-80 rounded-xl skeleton" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          illustration="home"
          title={t("pro.biens.emptyTitle")}
          description={t("pro.biens.emptySub")}
          action={
            <Link href="/pro/nouveau" className={LINK_PRIMARY}>
              {t("pro.dash.add")}
            </Link>
          }
        />
      ) : visible.length === 0 ? (
        <EmptyState illustration="search" title={t("pro.biens.noMatch")} description={t("pro.biens.noMatchSub")} />
      ) : (
        <>
          <p className="text-sm text-ink-muted mb-3" aria-live="polite">
            {t("pro.biens.count", { count: visible.length })}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {visible.map((p) => {
              const assigned = agentName(p.mandate?.assignedAgentId);
              return (
                <PropertyCard
                  key={p.id}
                  title={p.title}
                  city={p.city}
                  price={p.displayPrice ?? p.price}
                  currency={p.currency}
                  surface={p.surface}
                  rooms={p.rooms}
                  listingType={p.listingType}
                  propertyType={p.propertyType}
                  images={(p.media ?? []).map((m) => ({ url: m.url, alt: m.alt ?? p.title }))}
                  thumbnailUrl={p.media?.[0]?.url ?? null}
                  displayPrice={(p.displayPrice ?? p.price) > 0 ? format(p.displayPrice ?? p.price, p.currency) : "—"}
                  priceUnit={p.priceUnit}
                  status={p.status}
                  href={`/dashboard/${p.id}`}
                  footer={
                    <div className="space-y-2 text-sm" data-portfolio-item={p.title}>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {p.mandate && <MandateTypeBadge type={p.mandate.type} />}
                        {p.mandate && <span className="text-xs text-ink-muted font-mono">{p.mandate.reference}</span>}
                      </div>
                      {p.owner && (
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Icon name="user" size={14} className="text-ink-subtle shrink-0" />
                          <span className="truncate">
                            {p.owner.firstName} {p.owner.lastName}
                          </span>
                          {p.owner.activated === false && <Badge tone="accent">{t("pro.owner.notActivated")}</Badge>}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-ink-muted min-w-0">
                        <Icon name="idCard" size={14} className="shrink-0" />
                        <span className="truncate">{assigned ? t("pro.biens.assignedTo", { name: assigned }) : t("pro.dash.unassigned")}</span>
                      </div>
                      <Link href={`/dashboard/${p.id}`} className={`${LINK_SM} w-full`}>
                        {t("pro.biens.manage")} <Icon name="arrowRight" size={14} className="rtl:rotate-180" />
                      </Link>
                    </div>
                  }
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
