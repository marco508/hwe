"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";
import { Icon } from "./Icon";
import { errorText, isApiError } from "../client/errors";
import { commonApi } from "../client/common-api";
import { useOptionalAuth } from "../client/auth";
import { toast } from "./Toast";

/**
 * Bloc d'erreur de chargement avec bouton « Réessayer » (L1, L2) :
 * distinct d'un état vide.
 */
export function ErrorState({
  error,
  onRetry,
  title,
  className,
  compact = false,
}: {
  error?: unknown;
  onRetry?: () => void;
  title?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-2xl border border-danger/30 bg-danger/5 text-center",
        compact ? "px-4 py-4" : "px-6 py-10",
        className,
      )}
    >
      {!compact && (
        <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-700/20 dark:text-accent-300" aria-hidden="true">
          <Icon name="alert" size={24} />
        </div>
      )}
      <div className="font-medium text-ink">{title ?? tUi("ui.err.loadTitle")}</div>
      <p className="text-sm text-ink-muted mt-1 max-w-md mx-auto [overflow-wrap:anywhere]">
        {errorText(error)}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center h-9 px-4 rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-cream-100 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {tUi("ui.retry")}
        </button>
      )}
    </div>
  );
}

/** Erreur 404 ? (pour afficher « introuvable » plutôt que « réessayer »). */
export function isNotFound(e: unknown): boolean {
  return isApiError(e) && e.status === 404;
}

function useResend() {
  const auth = useOptionalAuth();
  const [state, setState] = React.useState<"idle" | "busy" | "sent">("idle");
  const resend = async () => {
    setState("busy");
    try {
      const r = await commonApi.sendVerification();
      if (r?.alreadyVerified) {
        toast.success(tUi("ui.verify.already"));
        await auth?.refresh();
      }
      setState("sent");
    } catch (e) {
      toast.error(e);
      setState("idle");
    }
  };
  const recheck = async () => {
    await auth?.refresh();
  };
  return { state, resend, recheck };
}

/**
 * Encart affiché À LA PLACE d'un formulaire bloquant (nouveau bien,
 * candidature, visite) tant que l'e-mail n'est pas confirmé (contrat §2).
 */
export function EmailVerifyNotice({ className, text }: { className?: string; text?: string }) {
  const { state, resend, recheck } = useResend();
  const auth = useOptionalAuth();
  const [checked, setChecked] = React.useState(false);
  return (
    <div
      role="status"
      className={cn(
        "rounded-2xl border border-accent-300/60 bg-accent-50 dark:bg-accent-700/15 dark:border-accent-700/40 px-5 py-5 sm:px-6",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 shrink-0" aria-hidden="true">
          <Icon name="mail" size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-ink">{tUi("ui.verify.title")}</div>
          <p className="text-sm text-ink-muted mt-1 [overflow-wrap:anywhere]">
            {text ?? tUi("ui.verify.text")}
            {auth?.user?.email && (
              <>
                {" "}
                <strong className="text-ink font-medium">{auth.user.email}</strong>
              </>
            )}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {state === "sent" ? (
              <span className="text-sm font-medium text-success">{tUi("ui.verify.sent")}</span>
            ) : (
              <button
                type="button"
                onClick={resend}
                disabled={state === "busy"}
                className="inline-flex items-center h-9 px-4 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {state === "busy" ? tUi("ui.verify.sending") : tUi("ui.verify.resend")}
              </button>
            )}
            {auth && (
              <button
                type="button"
                onClick={async () => {
                  await recheck();
                  setChecked(true);
                }}
                className="inline-flex items-center h-9 px-4 rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-cream-100 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {tUi("ui.verify.done")}
              </button>
            )}
          </div>
          {checked && !auth?.emailVerified && (
            <p className="text-xs text-ink-muted mt-2">{tUi("ui.verify.stillPending")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Bandeau global (sous la navbar) tant que l'e-mail n'est pas confirmé (F5),
 * et bandeau « connexion perdue » pendant une panne réseau (A1).
 */
export function SessionBanners({ text }: { text?: string }) {
  const auth = useOptionalAuth();
  const { state, resend } = useResend();
  if (!auth) return null;
  if (auth.sessionError) {
    return (
      <div role="status" className="bg-cream-200/70 dark:bg-white/5 border-b border-border px-4 sm:px-6 py-2 text-sm flex flex-wrap items-center justify-center gap-3 text-center text-ink">
        <span>{tUi("ui.session.offline")}</span>
        <button type="button" onClick={() => void auth.refresh()} className="underline font-medium">
          {tUi("ui.session.retryNow")}
        </button>
      </div>
    );
  }
  if (!auth.user || auth.user.emailVerifiedAt) return null;
  return (
    <div role="status" className="bg-accent-50 dark:bg-accent-700/15 border-b border-accent-300/50 dark:border-accent-700/40 px-4 sm:px-6 py-2 text-sm flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-ink">
      <span className="[overflow-wrap:anywhere]">{text ?? tUi("ui.verify.banner")}</span>
      {state === "sent" ? (
        <span className="font-medium">{tUi("ui.verify.sent")}</span>
      ) : (
        <button type="button" onClick={resend} disabled={state === "busy"} className="underline font-medium disabled:opacity-50">
          {state === "busy" ? tUi("ui.verify.sending") : tUi("ui.verify.resend")}
        </button>
      )}
    </div>
  );
}

/** Page « introuvable » (not-found.tsx des apps). */
export function NotFoundView({ homeHref = "/" }: { homeHref?: string }) {
  return (
    <div className="max-w-lg mx-auto text-center py-20 px-4">
      <div className="display-serif text-6xl gradient-text mb-4">404</div>
      <h1 className="display-serif text-3xl text-ink">{tUi("ui.notFound.title")}</h1>
      <p className="text-ink-muted mt-3">{tUi("ui.notFound.text")}</p>
      <a
        href={homeHref}
        className="mt-8 inline-flex items-center h-11 px-6 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90"
      >
        {tUi("ui.notFound.home")}
      </a>
    </div>
  );
}

/** Page d'erreur (error.tsx des apps) avec « Réessayer ». */
export function ErrorView({ onRetry, homeHref = "/" }: { onRetry?: () => void; homeHref?: string }) {
  return (
    <div role="alert" className="max-w-lg mx-auto text-center py-20 px-4">
      <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-700/20 dark:text-accent-300" aria-hidden="true">
        <Icon name="alert" size={30} />
      </div>
      <h1 className="display-serif text-3xl text-ink">{tUi("ui.error.title")}</h1>
      <p className="text-ink-muted mt-3">{tUi("ui.error.text")}</p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center h-11 px-6 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {tUi("ui.retry")}
          </button>
        )}
        <a
          href={homeHref}
          className="inline-flex items-center h-11 px-6 rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-cream-100 dark:hover:bg-white/5"
        >
          {tUi("ui.notFound.home")}
        </a>
      </div>
    </div>
  );
}
