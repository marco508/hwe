"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { MandateStatus, MandateType } from "@hwe/types";
import { Badge, Button, EmptyState, ErrorState, Icon, Input, Select, fmtDate, toast, useAsync } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { MANDATE_TYPES, isManager, useMyAgency } from "../../../lib/pro";
import { LINK_PRIMARY, ProHero, SectionCard } from "../../../components/pro/ProUi";
import { MandateRow } from "../../../components/pro/MandateRow";

const STATUSES: MandateStatus[] = ["ACTIVE", "PENDING_OWNER", "ENDED", "REJECTED"];

export default function ProMandatesPage() {
  return (
    <React.Suspense fallback={null}>
      <Inner />
    </React.Suspense>
  );
}

function Inner() {
  const params = useSearchParams();
  const { user } = useAuth();
  const manager = isManager(user);
  const agency = useMyAgency();
  const [status, setStatus] = React.useState<MandateStatus | "">((params.get("status") as MandateStatus) || "");
  const [type, setType] = React.useState<MandateType | "">("");
  const [agentId, setAgentId] = React.useState("");
  const [q, setQ] = React.useState("");
  const { data, error, loading, reload } = useAsync(
    () => api.listMandates({ status: status || undefined, type: type || undefined, agentId: agentId || undefined }),
    [user?.id, status, type, agentId],
  );
  const requests = useAsync(() => api.mandateRequests(), [user?.id]);

  const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const items = (data ?? []).filter((m) =>
    q.trim()
      ? norm(`${m.reference} ${m.property.title} ${m.property.city} ${m.owner?.firstName ?? ""} ${m.owner?.lastName ?? ""}`).includes(norm(q.trim()))
      : true,
  );
  const pendingReq = (requests.data ?? []).filter((r) => r.status === "PENDING");

  const cancelRequest = async (id: string) => {
    try {
      await api.rejectMandateRequest(id);
      toast.success(t("pro.req.cancelled"));
      requests.reload();
    } catch (e) {
      toast.error(e);
    }
  };

  if (error && !data) return <ErrorState error={error} title={t("pro.mlist.loadError")} onRetry={reload} />;

  return (
    <section>
      <ProHero
        title={t("pro.mlist.title1")}
        accent={t("pro.mlist.title2")}
        sub={t("pro.mlist.sub")}
        actions={
          <Link href="/pro/nouveau" className={LINK_PRIMARY}>
            <Icon name="plus" size={16} strokeWidth={2.2} /> {t("pro.mlist.new")}
          </Link>
        }
      />

      {pendingReq.length > 0 && (
        <SectionCard title={t("pro.req.title")} icon="send" className="mb-6">
          <ul className="divide-y divide-border/70 text-sm">
            {pendingReq.map((r) => (
              <li key={r.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium [overflow-wrap:anywhere]">
                    {r.owner ? `${r.owner.firstName} ${r.owner.lastName}` : "—"}{" "}
                    <span className="text-ink-muted font-normal">· {r.owner?.email}</span>
                  </p>
                  <p className="text-xs text-ink-muted">
                    {t(`pro.mtype.${r.type}`)} · {t("pro.req.sentOn", { date: fmtDate(r.createdAt) })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="accent">{t("pro.req.waiting")}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => cancelRequest(r.id)}>
                    {t("pro.req.cancel")}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6" role="search">
        <div className="relative">
          <Icon name="search" size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <Input aria-label={t("pro.mlist.search")} placeholder={t("pro.mlist.search")} value={q} onChange={(e) => setQ(e.target.value)} className="ps-9" />
        </div>
        <Select aria-label={t("pro.mlist.fStatus")} value={status} onChange={(e) => setStatus(e.target.value as MandateStatus | "")} id="ml-status">
          <option value="">{t("pro.mlist.allStatuses")}</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {t(`pro.mstatus.${s}`)}
            </option>
          ))}
        </Select>
        <Select aria-label={t("pro.biens.fType")} value={type} onChange={(e) => setType(e.target.value as MandateType | "")} id="ml-type">
          <option value="">{t("pro.biens.allTypes")}</option>
          {MANDATE_TYPES.map((ty) => (
            <option key={ty} value={ty}>
              {t(`pro.mtype.${ty}`)}
            </option>
          ))}
        </Select>
        {manager && (
          <Select aria-label={t("pro.biens.fAgent")} value={agentId} onChange={(e) => setAgentId(e.target.value)} id="ml-agent">
            <option value="">{t("pro.biens.allAgents")}</option>
            {(agency.data?.members ?? []).map((m) => (
              <option key={m.userId} value={m.userId}>
                {m.user.firstName} {m.user.lastName}
              </option>
            ))}
          </Select>
        )}
      </div>

      {loading && !data ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl skeleton" />
          ))}
        </div>
      ) : items.length === 0 ? (
        // « En attente » : les invitations envoyées (ci-dessus) suffisent à remplir la liste.
        status === "PENDING_OWNER" && pendingReq.length > 0 ? null : (
          <EmptyState illustration="inbox" title={t("pro.mlist.empty")} description={t("pro.mlist.emptySub")} />
        )
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <MandateRow key={m.id} m={m} href={`/pro/mandats/${m.id}`} who="owner" />
          ))}
        </ul>
      )}
    </section>
  );
}
