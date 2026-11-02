"use client";

import * as React from "react";
import { Button, Icon, json, request, toast } from "@hwe/ui";
import { t } from "../../lib/i18n";

/**
 * Paiement en ligne de l'abonnement pro (KkiaPay, via le hub DKP).
 * Le montant (XOF) et la référence sont fixés par l'API ; après le widget,
 * l'API VÉRIFIE la transaction auprès du hub avant de prolonger
 * l'abonnement. Le paiement manuel (« J'ai payé ») reste disponible à côté.
 * Masqué si l'API ne propose pas le paiement en ligne.
 */

const KKIAPAY_SRC = "https://cdn.kkiapay.me/k.js";

type KkiapayWindow = Window & {
  openKkiapayWidget?: (o: Record<string, unknown>) => void;
  addSuccessListener?: (cb: (r: { transactionId?: string }) => void) => void;
  addFailedListener?: (cb: (r: unknown) => void) => void;
  removeKkiapayListener?: (event: string) => void;
};

interface OnlineConfig {
  enabled: boolean;
  sandbox: boolean;
  currency: string;
}
interface OnlineStart {
  reference: string;
  amount: number;
  currency: string;
  publicKey: string;
  sandbox: boolean;
  payer: { name: string; email: string; phone: string | null } | null;
}

const online = {
  config: () => request<OnlineConfig>("/agencies/me/subscription/online", { auth: true }),
  start: (planCode: string, months: number) =>
    request<OnlineStart>("/agencies/me/subscription/online", { method: "POST", auth: true, body: json({ planCode, months }) }),
  confirm: (reference: string, transactionId: string) =>
    request<{ status: "PAID" }>("/agencies/me/subscription/online/confirm", { method: "POST", auth: true, body: json({ reference, transactionId }) }),
};

function loadKkiapay(): Promise<void> {
  const w = window as KkiapayWindow;
  if (w.openKkiapayWidget) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let s = document.querySelector<HTMLScriptElement>(`script[src="${KKIAPAY_SRC}"]`);
    if (!s) {
      s = document.createElement("script");
      s.src = KKIAPAY_SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    const done = () => (w.openKkiapayWidget ? resolve() : reject(new Error("kkiapay")));
    s.addEventListener("load", done, { once: true });
    s.addEventListener("error", () => reject(new Error("kkiapay")), { once: true });
    setTimeout(done, 8000);
  });
}

export function OnlinePayment({ plan, months, onPaid }: { plan: { code: string } | null; months: number; onPaid: () => void }) {
  const [cfg, setCfg] = React.useState<OnlineConfig | null>(null);
  const [busy, setBusy] = React.useState(false);
  const pendingRef = React.useRef<OnlineStart | null>(null);
  const listening = React.useRef(false);

  React.useEffect(() => {
    online.config().then(setCfg, () => setCfg(null));
  }, []);

  const confirm = React.useCallback(
    async (transactionId: string | undefined) => {
      const p = pendingRef.current;
      if (!p || !transactionId) return;
      setBusy(true);
      try {
        await online.confirm(p.reference, transactionId);
        pendingRef.current = null;
        toast.success(t("dkp.pay.done"));
        onPaid();
      } catch (e) {
        toast.error(e);
      } finally {
        setBusy(false);
      }
    },
    [onPaid],
  );

  if (!cfg?.enabled) return null;

  const pay = async () => {
    if (!plan) return;
    setBusy(true);
    try {
      const [start] = await Promise.all([online.start(plan.code, months), loadKkiapay()]);
      pendingRef.current = start;
      const w = window as KkiapayWindow;
      if (!listening.current) {
        listening.current = true;
        w.addSuccessListener?.((r) => void confirm(r?.transactionId));
        w.addFailedListener?.(() => toast.error(t("dkp.pay.failed")));
      }
      w.openKkiapayWidget?.({
        amount: start.amount,
        key: start.publicKey,
        sandbox: start.sandbox,
        position: "center",
        theme: "#0b7a51",
        data: start.reference,
        ...(start.payer?.name ? { name: start.payer.name } : {}),
        ...(start.payer?.email ? { email: start.payer.email } : {}),
        ...(start.payer?.phone ? { phone: start.payer.phone } : {}),
      });
    } catch (e) {
      toast.error(e instanceof Error && e.message === "kkiapay" ? t("dkp.pay.widgetError") : e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/20 p-4 space-y-2" data-online-pay>
      <p className="font-semibold text-sm flex items-center gap-1.5">
        <Icon name="smartphone" size={16} /> {t("dkp.pay.title")}
      </p>
      <p className="text-xs text-ink-muted">{t("dkp.pay.lead")}</p>
      {cfg.sandbox && <p className="text-xs text-accent-700 dark:text-accent-300">{t("dkp.pay.sandbox")}</p>}
      {!plan && <p className="text-xs text-ink-muted">{t("sub.pickPlan")}</p>}
      <Button type="button" variant="gradient" disabled={busy || !plan} onClick={pay}>
        <Icon name="creditCard" size={16} /> {busy ? t("dkp.pay.busy") : t("dkp.pay.cta")}
      </Button>
      <p className="text-[11px] text-ink-muted">{t("dkp.pay.note", { currency: cfg.currency })}</p>
    </div>
  );
}
