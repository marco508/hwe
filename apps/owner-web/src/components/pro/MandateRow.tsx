"use client";

import Link from "next/link";
import type { Mandate } from "@hwe/types";
import { Icon, SafeImage, fmtMoney, Approx } from "@hwe/ui";
import { t } from "../../lib/i18n";
import { MandateStatusBadge, MandateTypeBadge } from "./ProUi";

export function MandateRow({ m, href, who }: { m: Mandate; href: string; who: "owner" | "agency" }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 sm:p-4 hover:border-brand-400 hover:shadow-card transition text-ink min-w-0"
        data-mandate-row={m.reference}
      >
        <SafeImage src={m.property.media?.[0]?.url} alt="" className="h-16 w-16 sm:h-20 sm:w-24 rounded-xl object-cover shrink-0" fallbackClassName="h-16 w-16 sm:h-20 sm:w-24 rounded-xl shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <MandateTypeBadge type={m.type} />
            <MandateStatusBadge status={m.status} />
            <span className="font-mono text-[11px] text-ink-muted">{m.reference}</span>
          </div>
          <p className="font-medium truncate">{m.property.title}</p>
          <p className="text-xs text-ink-muted truncate">
            {who === "owner"
              ? `${m.owner ? `${m.owner.firstName} ${m.owner.lastName}` : "—"}${m.assignedAgent ? ` · ${m.assignedAgent.firstName} ${m.assignedAgent.lastName}` : ""}`
              : m.agency.name}
            {" · "}
            {m.property.city}
          </p>
        </div>
        <div className="hidden sm:block text-end shrink-0">
          <p className="text-xs text-ink-muted">{t("pro.fees.due")}</p>
          <p className="font-display text-lg tabular-nums">{fmtMoney(m.feesSummary.due, m.feesSummary.currency)}</p>
          <Approx amount={m.feesSummary.due} currency={m.feesSummary.currency} className="ms-0 block" />
        </div>
        <Icon name="chevronRight" size={18} className="text-ink-subtle shrink-0 rtl:rotate-180" />
      </Link>
    </li>
  );
}
