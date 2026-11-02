"use client";

import * as React from "react";
import { Badge, Button, Icon, ZemiDeliveryLink, fmtDate, json, request, toast, useDkpConfig } from "@hwe/ui";
import type { LeaseContract } from "@hwe/types";
import { useAuth } from "../lib/auth-context";
import { t } from "../lib/i18n";

/**
 * Services DKP utiles depuis un bail (espace locataire) :
 *  - Zémi Market : faire livrer des courses au logement (biens au Bénin) ;
 *  - FamiLyfe : partager le loyer avec la maison (code de partage, 30 jours, révocable).
 * Rien ne s'affiche si l'API n'active pas ces ponts (variables d'environnement).
 */

interface ShareCode {
  id: string;
  hint: string;
  expiresAt: string;
  revokedAt: string | null;
  useCount: number;
  state: "ACTIVE" | "EXPIRED" | "REVOKED";
  code?: string;
}

const shareApi = {
  list: (leaseId: string) => request<ShareCode[]>(`/leases/${leaseId}/rent-share`, { auth: true }),
  create: (leaseId: string) => request<ShareCode>(`/leases/${leaseId}/rent-share`, { method: "POST", auth: true, body: json({}) }),
  revoke: (leaseId: string, id: string) => request<ShareCode>(`/leases/${leaseId}/rent-share/${id}`, { method: "DELETE", auth: true }),
};

function RentSharePanel({ lease, familyfeUrl }: { lease: LeaseContract; familyfeUrl: string | null }) {
  const [codes, setCodes] = React.useState<ShareCode[] | null>(null);
  const [fresh, setFresh] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    shareApi.list(lease.id).then(setCodes, () => setCodes([]));
  }, [lease.id]);

  const create = async () => {
    setBusy(true);
    try {
      const c = await shareApi.create(lease.id);
      setFresh(c.code ?? null);
      setCodes((list) => [{ ...c, code: undefined }, ...(list ?? [])]);
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  const revoke = async (id: string) => {
    if (!confirm(t("dkp.share.revokeConfirm"))) return;
    try {
      const r = await shareApi.revoke(lease.id, id);
      setCodes((list) => (list ?? []).map((c) => (c.id === id ? r : c)));
      toast.success(t("dkp.share.revoked"));
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <section className="space-y-3 rounded-lg border border-border px-4 py-4">
      <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
        <Icon name="users" size={16} className="text-ink-muted" />
        {t("dkp.share.title")}
      </h3>
      <p className="text-xs text-ink-muted leading-relaxed">{t("dkp.share.lead")}</p>
      {fresh && (
        <div role="status" className="rounded-md bg-brand-50/70 dark:bg-brand-900/25 border border-brand-200 dark:border-brand-800 px-3 py-2 space-y-2">
          <p className="text-xs text-ink-muted">{t("dkp.share.newCode")}</p>
          <p className="font-mono text-base tracking-wider text-ink select-all" dir="ltr">{fresh}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigator.clipboard?.writeText(fresh).then(() => toast.success(t("dkp.share.copied")), () => {})}
            >
              {t("dkp.share.copy")}
            </Button>
            {familyfeUrl && (
              <a href={familyfeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-8 px-3 rounded-full border border-border text-xs font-medium hover:underline">
                {t("dkp.share.open")}
              </a>
            )}
          </div>
        </div>
      )}
      <Button size="sm" onClick={create} disabled={busy}>
        {t("dkp.share.create")}
      </Button>
      {codes && codes.length > 0 && (
        <ul className="space-y-1.5" aria-label={t("dkp.share.listTitle")}>
          {codes.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono" dir="ltr">…{c.hint}</span>
              <Badge tone={c.state === "ACTIVE" ? "success" : "neutral"}>{t(`dkp.share.state.${c.state}`)}</Badge>
              <span className="text-ink-muted">{t("dkp.share.expires", { date: fmtDate(c.expiresAt) })}</span>
              <span className="text-ink-muted">{t("dkp.share.uses", { count: c.useCount })}</span>
              {c.state === "ACTIVE" && (
                <button type="button" onClick={() => revoke(c.id)} className="ms-auto text-danger hover:underline">
                  {t("dkp.share.revoke")}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function DkpLeaseBridges({ lease }: { lease: LeaseContract }) {
  const cfg = useDkpConfig();
  const { user } = useAuth();
  const p = lease.property;
  const live = lease.status === "ACTIVE" || lease.status === "SIGNED";
  if (!cfg || !live) return null;
  const share = !!cfg.familyfe && !lease.shortStay;
  const zemi = !!cfg.zemi && (p?.country ?? "").toUpperCase() === "BJ";
  if (!share && !zemi) return null;
  return (
    <div className="space-y-3">
      {zemi && p && (
        <ZemiDeliveryLink
          country={p.country}
          address={[p.addressLine, p.city].filter(Boolean).join(", ")}
          lat={p.latitude ?? null}
          lng={p.longitude ?? null}
          name={user ? `${user.firstName} ${user.lastName}`.trim() : `${lease.tenantFirstName} ${lease.tenantLastName}`}
          phone={user?.phone || lease.tenantPhone || null}
          note={p.title}
        />
      )}
      {share && <RentSharePanel lease={lease} familyfeUrl={cfg.familyfe?.url ?? null} />}
    </div>
  );
}
