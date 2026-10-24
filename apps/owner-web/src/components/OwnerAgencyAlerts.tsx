"use client";

import * as React from "react";
import Link from "next/link";
import { AgencyLogo, Icon, useAsync } from "@hwe/ui";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth-context";
import { t } from "../lib/i18n";

/**
 * Bandeau propriétaire : une agence mandataire ne peut plus agir sur ses
 * biens (abonnement suspendu, ou mandat au-delà des limites de son offre).
 * Le propriétaire garde tous ses droits : il gère lui-même ou met fin au
 * mandat (résiliation existante, page « Mes mandats »).
 */
export function OwnerAgencyAlerts() {
  const { user } = useAuth();
  const { data } = useAsync(() => api.ownerAgencyAlerts(), [user?.id], { enabled: user?.role === "OWNER" });
  if (!data || data.length === 0) return null;
  return (
    <div className="space-y-3 mb-6">
      {data.map((a) => (
        <div
          key={a.agency.id}
          role="alert"
          data-owner-agency-alert={a.reason}
          className="rounded-2xl border border-danger/40 bg-danger/5 px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-3 text-ink"
        >
          <span className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
            <AgencyLogo name={a.agency.name} logoUrl={a.agency.logoUrl} size="sm" />
            <span className="[overflow-wrap:anywhere]">
              {a.reason === "SUSPENDED"
                ? t("sub.owner.suspended", { name: a.agency.name })
                : t("sub.owner.limit", { name: a.agency.name, titles: a.mandates.map((m) => `« ${m.property.title} »`).join(", ") })}
            </span>
          </span>
          <Link
            href="/dashboard/mandats"
            className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium bg-surface text-ink border border-border hover:border-ink/30"
          >
            <Icon name="handshake" size={14} />
            {t("sub.owner.cta")}
          </Link>
        </div>
      ))}
    </div>
  );
}
