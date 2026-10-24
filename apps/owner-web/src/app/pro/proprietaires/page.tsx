"use client";

import * as React from "react";
import Link from "next/link";
import type { Mandate } from "@hwe/types";
import { Badge, Button, EmptyState, ErrorState, Icon, Input, InviteLinkBox, toast, useAsync } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { LINK_PRIMARY, MandateStatusBadge, MandateTypeBadge, ProHero } from "../../../components/pro/ProUi";

type OwnerGroup = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  activated: boolean;
  mandates: Mandate[];
};

export default function ProOwnersPage() {
  const { user } = useAuth();
  const { data, error, loading, reload } = useAsync(() => api.listMandates(), [user?.id]);
  const [q, setQ] = React.useState("");
  const [links, setLinks] = React.useState<Record<string, string>>({});

  const groups = React.useMemo(() => {
    const map = new Map<string, OwnerGroup>();
    for (const m of data ?? []) {
      if (!m.owner) continue;
      const g = map.get(m.owner.id) ?? { ...m.owner, mandates: [] };
      g.mandates.push(m);
      map.set(m.owner.id, g);
    }
    return [...map.values()].sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`));
  }, [data]);

  const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const visible = groups.filter((g) => (q.trim() ? norm(`${g.firstName} ${g.lastName} ${g.email}`).includes(norm(q.trim())) : true));

  const resend = async (g: OwnerGroup) => {
    const m = g.mandates.find((x) => x.status === "ACTIVE" && x.me.canResendOwnerInvite);
    if (!m) return;
    try {
      const r = await api.resendOwnerInvite(m.id);
      setLinks((l) => ({ ...l, [g.id]: r.ownerInviteUrl }));
      toast.success(t("pro.owner.linkReady"));
    } catch (e) {
      toast.error(e);
    }
  };

  if (error && !data) return <ErrorState error={error} title={t("pro.owners.loadError")} onRetry={reload} />;

  return (
    <section>
      <ProHero
        title={t("pro.owners.title1")}
        accent={t("pro.owners.title2")}
        sub={t("pro.owners.sub")}
        actions={
          <Link href="/pro/nouveau" className={LINK_PRIMARY}>
            <Icon name="plus" size={16} strokeWidth={2.2} /> {t("pro.dash.add")}
          </Link>
        }
      />
      <div className="relative max-w-md mb-6">
        <Icon name="search" size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
        <Input aria-label={t("pro.owners.search")} placeholder={t("pro.owners.search")} value={q} onChange={(e) => setQ(e.target.value)} className="ps-9" />
      </div>

      {loading && !data ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl skeleton" />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <EmptyState illustration="home" title={t("pro.owners.empty")} description={t("pro.owners.emptySub")} />
      ) : visible.length === 0 ? (
        <EmptyState illustration="search" title={t("pro.biens.noMatch")} />
      ) : (
        <ul className="grid lg:grid-cols-2 gap-4">
          {visible.map((g) => {
            const canResend = !g.activated && g.mandates.some((x) => x.status === "ACTIVE" && x.me.canResendOwnerInvite);
            return (
              <li key={g.id} className="rounded-2xl border border-border bg-surface p-4 sm:p-5 min-w-0" data-owner={`${g.firstName} ${g.lastName}`}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="h-11 w-11 rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-white font-semibold inline-flex items-center justify-center shrink-0">
                      {(g.firstName[0] ?? "") + (g.lastName[0] ?? "")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-lg leading-tight [overflow-wrap:anywhere]">
                        {g.firstName} {g.lastName}
                      </p>
                      <p className="text-xs text-ink-muted [overflow-wrap:anywhere]">
                        {g.email}
                        {g.phone ? ` · ${g.phone}` : ""}
                      </p>
                    </div>
                  </div>
                  {g.activated ? <Badge tone="success">{t("pro.owner.activated")}</Badge> : <Badge tone="accent">{t("pro.owner.notActivated")}</Badge>}
                </div>
                <ul className="mt-4 space-y-2">
                  {g.mandates.map((m) => (
                    <li key={m.id}>
                      <Link href={`/pro/mandats/${m.id}`} className="flex items-center justify-between gap-2 rounded-xl border border-border/70 px-3 py-2 text-sm text-ink hover:border-brand-300 min-w-0">
                        <span className="truncate">{m.property.title}</span>
                        <span className="flex items-center gap-1.5 shrink-0">
                          <MandateTypeBadge type={m.type} />
                          <MandateStatusBadge status={m.status} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {canResend && (
                  <div className="mt-4">
                    {links[g.id] ? (
                      <InviteLinkBox url={links[g.id]!} title={t("pro.owner.activationLink")} message={t("pro.owner.waMessage", { agency: user?.agency?.name ?? "" })} />
                    ) : (
                      <Button size="sm" variant="secondary" onClick={() => resend(g)}>
                        <Icon name="send" size={14} className="me-1.5" /> {t("pro.owner.resend")}
                      </Button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
