"use client";

import * as React from "react";
import { Badge, Button, Input, Label, fmtDate, json, request, toast } from "@hwe/ui";
import { t } from "../../lib/i18n";
import { SectionCard } from "./ProUi";

/**
 * « Connecter GestiPro » (écosystème DKP) : l'agence colle sa clé
 * d'intégration GestiPro (gp_…), la teste, puis envoie le relevé mensuel des
 * honoraires en factures GestiPro. La clé n'est jamais renvoyée par l'API
 * (seulement un indice « gp_…1234 »). Masqué si l'API n'active pas le pont.
 */

interface GpStatus {
  available: boolean;
  connected: boolean;
  hint: string | null;
  tenantName: string | null;
  connectedAt: string | null;
  isManager: boolean;
}
interface GpSendResult {
  month: string;
  fees: number;
  sent: number;
  failed: number;
  invoices: Array<{ reference: string; customer: string; ok: boolean; url: string | null }>;
}

const gp = {
  status: () => request<GpStatus>("/agencies/me/gestipro", { auth: true }),
  connect: (key: string) => request<GpStatus>("/agencies/me/gestipro", { method: "PUT", auth: true, body: json({ key }) }),
  disconnect: () => request<GpStatus>("/agencies/me/gestipro", { method: "DELETE", auth: true }),
  test: () => request<{ ok: true; tenantName: string | null }>("/agencies/me/gestipro/test", { method: "POST", auth: true, body: json({}) }),
  send: (month: string) => request<GpSendResult>("/agencies/me/gestipro/send", { method: "POST", auth: true, body: json({ month }) }),
};

/** Dernier mois terminé : c'est celui qu'on envoie (le mois en cours est refusé). */
function lastMonth(): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function GestiproSection() {
  const [st, setSt] = React.useState<GpStatus | null>(null);
  const [key, setKey] = React.useState("");
  const [month, setMonth] = React.useState(lastMonth);
  const [busy, setBusy] = React.useState<null | "connect" | "test" | "send" | "disconnect">(null);
  const [result, setResult] = React.useState<GpSendResult | null>(null);

  React.useEffect(() => {
    gp.status().then(setSt, () => setSt(null));
  }, []);

  if (!st?.available || !st.isManager) return null;

  const run = async <T,>(what: NonNullable<typeof busy>, fn: () => Promise<T>, after: (r: T) => void) => {
    setBusy(what);
    try {
      after(await fn());
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(null);
    }
  };

  return (
    <SectionCard title={t("dkp.gp.title")} icon="file" id="gestipro">
      <p className="text-sm text-ink-muted mb-4">{t("dkp.gp.lead")}</p>
      {st.connected ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge tone="success">{t("dkp.gp.connected")}</Badge>
            {st.tenantName && <span className="font-medium">{st.tenantName}</span>}
            <span className="font-mono text-xs text-ink-muted" dir="ltr">{st.hint}</span>
            {st.connectedAt && <span className="text-xs text-ink-muted">{t("dkp.gp.since", { date: fmtDate(st.connectedAt) })}</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" disabled={!!busy} onClick={() => run("test", gp.test, (r) => toast.success(t("dkp.gp.testOk", { name: r.tenantName ?? "GestiPro" })))}>
              {t("dkp.gp.test")}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={!!busy}
              onClick={() => {
                if (confirm(t("dkp.gp.disconnectConfirm"))) void run("disconnect", gp.disconnect, setSt);
              }}
            >
              {t("dkp.gp.disconnect")}
            </Button>
          </div>
          <form
            className="flex flex-wrap items-end gap-3 pt-2 border-t border-border/60"
            onSubmit={(e) => {
              e.preventDefault();
              void run("send", () => gp.send(month), (r) => {
                setResult(r);
                if (r.invoices.length === 0) toast.success(t("dkp.gp.nothing"));
                else if (r.failed === 0) toast.success(t("dkp.gp.sent", { count: r.sent }));
                else toast.error(t("dkp.gp.partial", { sent: r.sent, failed: r.failed }));
              });
            }}
          >
            <div className="space-y-1">
              <Label htmlFor="gp-month">{t("dkp.gp.month")}</Label>
              <Input id="gp-month" type="month" value={month} max={lastMonth()} onChange={(e) => setMonth(e.target.value)} required className="w-44" />
            </div>
            <Button type="submit" disabled={!!busy || !/^\d{4}-\d{2}$/.test(month)}>
              {busy === "send" ? t("dkp.gp.sending") : t("dkp.gp.send")}
            </Button>
          </form>
          {result && result.invoices.length > 0 && (
            <ul className="text-sm space-y-1" aria-live="polite">
              {result.invoices.map((i) => (
                <li key={i.reference} className="flex flex-wrap items-center gap-2">
                  <Badge tone={i.ok ? "success" : "danger"}>{i.ok ? t("dkp.gp.ok") : t("dkp.gp.failed")}</Badge>
                  <span>{i.customer}</span>
                  {i.url && (
                    <a href={i.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 dark:text-brand-300 hover:underline">
                      {t("dkp.gp.open")}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-ink-muted">{t("dkp.gp.idempotent")}</p>
        </div>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            void run("connect", () => gp.connect(key.trim()), (r) => {
              setSt(r);
              setKey("");
              toast.success(t("dkp.gp.connectedToast"));
            });
          }}
        >
          <div className="space-y-1">
            <Label htmlFor="gp-key">{t("dkp.gp.key")}</Label>
            <Input id="gp-key" type="password" autoComplete="off" placeholder="gp_…" value={key} onChange={(e) => setKey(e.target.value)} required dir="ltr" />
            <p className="text-xs text-ink-muted">{t("dkp.gp.keyHelp")}</p>
          </div>
          <Button type="submit" disabled={!!busy || !key.trim().startsWith("gp_")}>
            {busy === "connect" ? t("dkp.gp.connecting") : t("dkp.gp.connect")}
          </Button>
        </form>
      )}
    </SectionCard>
  );
}
