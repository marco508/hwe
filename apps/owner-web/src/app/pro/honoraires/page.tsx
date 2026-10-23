"use client";

import * as React from "react";
import Link from "next/link";
import type { FeeListItem, FeeStatus } from "@hwe/types";
import { Badge, Button, EmptyState, ErrorState, Input, Label, Select, fmtDate, fmtMoney, toast, useAsync } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { feeLabel, isManager } from "../../../lib/pro";
import { ProHero, StatTile } from "../../../components/pro/ProUi";

export default function ProFeesPage() {
  const { user } = useAuth();
  const manager = isManager(user);
  const [status, setStatus] = React.useState<FeeStatus | "">("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const { data, error, loading, reload, setData } = useAsync(
    () => api.listFees({ status: status || undefined, from: from || undefined, to: to || undefined }),
    [user?.id, status, from, to],
  );

  const toggle = async (f: FeeListItem) => {
    try {
      const u = await api.setFeeStatus(f.id, f.status === "SETTLED" ? "DUE" : "SETTLED");
      setData((cur) => (cur ? { ...cur, items: cur.items.map((x) => (x.id === f.id ? { ...x, ...u } : x)) } : cur));
      toast.success(u.status === "SETTLED" ? t("pro.fees.settledToast") : t("pro.fees.reopened"));
      reload();
    } catch (e) {
      toast.error(e);
    }
  };

  if (error && !data) return <ErrorState error={error} title={t("pro.fees.loadError")} onRetry={reload} />;
  const totals = data?.totals ?? [];

  return (
    <section>
      <ProHero title={t("pro.fees.title1")} accent={t("pro.fees.title2")} sub={t("pro.fees.sub")} />

      {totals.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {totals.map((tt) => (
            <React.Fragment key={tt.currency}>
              <StatTile icon="hourglass" tone="accent" label={t("pro.fees.due")} value={fmtMoney(tt.due, tt.currency)} hint={tt.currency} />
              <StatTile icon="checkCircle" tone="success" label={t("pro.fees.settled")} value={fmtMoney(tt.settled, tt.currency)} hint={tt.currency} />
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 max-w-3xl">
        <div>
          <Label htmlFor="fee-status">{t("pro.fees.fStatus")}</Label>
          <Select id="fee-status" value={status} onChange={(e) => setStatus(e.target.value as FeeStatus | "")}>
            <option value="">{t("pro.fees.all")}</option>
            {(["DUE", "SETTLED", "CANCELLED"] as const).map((s) => (
              <option key={s} value={s}>
                {t(`pro.feeStatus.${s}`)}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="fee-from">{t("pro.fees.from")}</Label>
          <Input id="fee-from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="fee-to">{t("pro.fees.to")}</Label>
          <Input id="fee-to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      {loading && !data ? (
        <div className="h-48 rounded-2xl skeleton" />
      ) : (data?.items ?? []).length === 0 ? (
        <EmptyState illustration="wallet" title={t("pro.fees.emptyTitle")} description={t("pro.fees.emptySub")} />
      ) : (
        <ul className="space-y-3">
          {data!.items.map((f) => (
            <li key={f.id} className="rounded-2xl border border-border bg-surface p-4 flex flex-wrap items-center justify-between gap-3" data-fee={f.kind}>
              <div className="min-w-0">
                <p className="font-medium [overflow-wrap:anywhere]">{feeLabel(f)}</p>
                <p className="text-xs text-ink-muted [overflow-wrap:anywhere]">
                  <Link href={`/pro/mandats/${f.mandate.id}`} className="font-mono hover:underline">
                    {f.mandate.reference}
                  </Link>
                  {" · "}
                  {f.mandate.property.title} · {t(`pro.feeKind.${f.kind}`)} · {fmtDate(f.dueDate)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg tabular-nums">{fmtMoney(f.amount, f.currency)}</span>
                <Badge tone={f.status === "SETTLED" ? "success" : f.status === "DUE" ? "accent" : "neutral"}>{t(`pro.feeStatus.${f.status}`)}</Badge>
                {manager && f.status !== "CANCELLED" && (
                  <Button size="sm" variant={f.status === "SETTLED" ? "ghost" : "secondary"} onClick={() => toggle(f)}>
                    {f.status === "SETTLED" ? t("pro.fees.markDue") : t("pro.fees.markSettled")}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
