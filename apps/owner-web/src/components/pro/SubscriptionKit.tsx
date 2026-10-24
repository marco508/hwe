"use client";

import * as React from "react";
import Link from "next/link";
import type { MySubscription } from "@hwe/types";
import { ApiError, AUTH_EVENTS, Button, Icon, errorText, fmtDate, registerSubscriptionDialog, useAsync } from "@hwe/ui";
import { api } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import { t } from "../../lib/i18n";
import { Modal } from "../Modal";

/**
 * Abonnement de l'agence côté espace pro :
 *  - `SubscriptionProvider` charge GET /agencies/me/subscription (ce chargement
 *    déclenche aussi, côté API, les rappels paresseux J-15/J-7/J-1…) ;
 *  - `SubscriptionBanner` : bandeau selon le statut (essai discret, fin
 *    proche en orange, grâce et lecture seule en rouge) ;
 *  - `SubscriptionBlockedDialog` : toute réponse 402 SUBSCRIPTION_SUSPENDED /
 *    PLAN_LIMIT_* ouvre une fenêtre claire avec un lien vers l'abonnement
 *    (au lieu d'un toast générique). L'API reste la source de vérité : les
 *    boutons désactivés côté interface ne sont qu'un confort.
 */

interface SubscriptionCtx {
  sub: MySubscription | null;
  /** Agence en lecture seule (SUSPENDED). */
  readOnly: boolean;
  reload: () => void;
}

const Ctx = React.createContext<SubscriptionCtx>({ sub: null, readOnly: false, reload: () => {} });

export function useSubscription() {
  return React.useContext(Ctx);
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { data, reload } = useAsync(() => api.mySubscription(), [user?.id, user?.agency?.id], {
    enabled: !!user?.agency,
  });
  // Après un refus d'abonnement, le statut a pu changer : on le relit.
  React.useEffect(() => {
    const on = () => reload();
    window.addEventListener(AUTH_EVENTS.subscriptionBlocked, on);
    return () => window.removeEventListener(AUTH_EVENTS.subscriptionBlocked, on);
  }, [reload]);
  const value = React.useMemo(
    () => ({ sub: data ?? null, readOnly: data?.status === "SUSPENDED", reload }),
    [data, reload],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

const BANNER_BASE = "mb-6 rounded-2xl border px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2";
const TONES = {
  quiet: "border-border bg-surface text-ink-muted",
  warn: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700/60 dark:bg-amber-900/20 dark:text-amber-100",
  danger: "border-danger/40 bg-danger/5 text-ink",
} as const;

/** Bandeau d'abonnement en haut de chaque page /pro. */
export function SubscriptionBanner({ hideCta = false }: { hideCta?: boolean }) {
  const { sub } = useSubscription();
  if (!sub) return null;
  const date = (d: string | null) => (d ? fmtDate(d) : "");
  const free = sub.freePlan;
  const cta = (label: string, strong = false) =>
    hideCta ? null : (
      <Link
        href="/pro/abonnement"
        data-sub-cta
        className={`self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium ${
          strong ? "bg-danger text-white hover:opacity-90" : "bg-surface text-ink border border-border hover:border-ink/30"
        }`}
      >
        <Icon name="creditCard" size={14} />
        {label}
      </Link>
    );
  const manager = sub.isManager;
  const payLabel = manager ? t("sub.banner.cta") : t("sub.banner.ctaSee");

  let tone: keyof typeof TONES = "quiet";
  let icon: "hourglass" | "alert" | "lock" | "info" = "hourglass";
  let body: React.ReactNode = null;
  let action: React.ReactNode = null;

  switch (sub.status) {
    case "TRIAL": {
      const n = sub.daysLeft ?? 0;
      if (n <= 15 && !(sub.paidUntil && sub.trialEndsAt && sub.paidUntil > sub.trialEndsAt)) {
        tone = "warn";
        icon = "alert";
        body = free.enabled
          ? t("sub.banner.trialEndingFree", { date: date(sub.trialEndsAt), agents: free.maxAgents ?? "∞", mandates: free.maxActiveMandates ?? "∞" })
          : t("sub.banner.trialEndingRo", { date: date(sub.trialEndsAt) });
        action = cta(payLabel);
      } else {
        body = n <= 1 ? t("sub.banner.trial1") : t("sub.banner.trial", { n });
      }
      break;
    }
    case "ACTIVE":
      if ((sub.daysLeft ?? 99) > 15) return null;
      tone = "warn";
      icon = "alert";
      body = t("sub.banner.activeEnding", { date: date(sub.paidUntil) });
      action = cta(payLabel);
      break;
    case "GRACE":
      tone = "danger";
      icon = "alert";
      body = <strong className="font-semibold">{t("sub.banner.grace", { date: date(sub.graceEndsAt) })}</strong>;
      action = cta(payLabel, true);
      break;
    case "FREE":
      tone = sub.usage.readOnlyMandates > 0 ? "warn" : "quiet";
      icon = "info";
      body = (
        <span>
          {t("sub.banner.free", { agents: sub.limits.maxAgents ?? "∞", mandates: sub.limits.maxActiveMandates ?? "∞" })}
          {sub.usage.readOnlyMandates > 0 && <> {t("sub.banner.freeOver", { n: sub.usage.readOnlyMandates })}</>}
        </span>
      );
      action = cta(t("sub.banner.ctaUpgrade"));
      break;
    case "SUSPENDED":
      tone = "danger";
      icon = "lock";
      body = (
        <span>
          <strong className="font-semibold">{t("sub.banner.suspended")}</strong>
          {" — "}
          {sub.manualSuspension ? t("sub.banner.manual") : t("sub.banner.suspendedSub")}
        </span>
      );
      action = sub.manualSuspension ? null : cta(payLabel, true);
      break;
  }

  return (
    <div role={tone === "danger" ? "alert" : "status"} className={`${BANNER_BASE} ${TONES[tone]}`} data-sub-banner={sub.status}>
      <span className="flex items-start gap-2 min-w-0 flex-1">
        <Icon name={icon} size={16} className={`shrink-0 mt-0.5 ${tone === "danger" ? "text-danger" : ""}`} />
        <span className="[overflow-wrap:anywhere]">{body}</span>
      </span>
      {action}
    </div>
  );
}

/** Fenêtre ouverte sur toute réponse 402 (lecture seule, limite de l'offre). */
export function SubscriptionBlockedDialog() {
  const [state, setState] = React.useState<{ code: string; text: string } | null>(null);
  React.useEffect(() => {
    const unregister = registerSubscriptionDialog();
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ code: string; messages: string[] }>).detail;
      if (!d?.code) return;
      // Même texte que errorText (message de l'API en français, traduction sinon).
      setState({ code: d.code, text: errorText(new ApiError(402, d.messages ?? [], d.code)) });
    };
    window.addEventListener(AUTH_EVENTS.subscriptionBlocked, on);
    return () => {
      unregister();
      window.removeEventListener(AUTH_EVENTS.subscriptionBlocked, on);
    };
  }, []);
  if (!state) return null;
  return (
    <Modal title={t(`sub.dialog.${state.code}`)} onClose={() => setState(null)}>
      <div className="space-y-4 text-sm" data-sub-dialog={state.code}>
        <p className="flex items-start gap-2">
          <Icon name="lock" size={18} className="shrink-0 mt-0.5 text-danger" />
          <span className="[overflow-wrap:anywhere]">{state.text}</span>
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="secondary" onClick={() => setState(null)}>
            {t("pro.back")}
          </Button>
          <Link
            href="/pro/abonnement"
            onClick={() => setState(null)}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full text-sm font-medium text-white hover:text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 shadow-md"
          >
            <Icon name="creditCard" size={15} />
            {t("sub.banner.ctaSee")}
          </Link>
        </div>
      </div>
    </Modal>
  );
}
