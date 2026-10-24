"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";
import { Icon } from "./Icon";
import { errorText, isSubscriptionError, subscriptionDialogMounted } from "../client/errors";

/**
 * Notifications non bloquantes (remplacent les `alert()` bruts, F17).
 * `toast.error(e)` accepte une erreur quelconque : le texte affiché est
 * toujours lisible (cf. errorText). Monter <Toaster /> une fois par app.
 */

export type ToastTone = "success" | "error" | "info";

interface ToastItem {
  id: number;
  tone: ToastTone;
  text: string;
  action?: { label: string; onClick: () => void };
}

type Listener = (items: ToastItem[]) => void;

let items: ToastItem[] = [];
let seq = 0;
const listeners = new Set<Listener>();

function publish() {
  for (const l of listeners) l(items);
}

function push(tone: ToastTone, text: string, opts: { durationMs?: number; action?: ToastItem["action"] } = {}) {
  const id = ++seq;
  // Pas de doublon visuel si la même erreur arrive deux fois de suite.
  items = [...items.filter((i) => i.text !== text), { id, tone, text, action: opts.action }].slice(-4);
  publish();
  const ms = opts.durationMs ?? (tone === "error" ? 7000 : 4000);
  if (ms > 0) setTimeout(() => dismiss(id), ms);
  return id;
}

function dismiss(id: number) {
  items = items.filter((i) => i.id !== id);
  publish();
}

export const toast = {
  success: (text: string, opts?: { durationMs?: number }) => push("success", text, opts),
  info: (text: string, opts?: { durationMs?: number; action?: ToastItem["action"] }) => push("info", text, opts),
  /** Erreur : texte ou objet d'erreur (ApiError, Error…). */
  error: (e: unknown, opts?: { durationMs?: number; action?: ToastItem["action"] }) => {
    // Refus d'abonnement : déjà affiché par la fenêtre dédiée (lien vers l'abonnement).
    if (isSubscriptionError(e) && subscriptionDialogMounted()) return 0;
    return push("error", typeof e === "string" ? e : errorText(e), opts);
  },
  dismiss,
};

export function Toaster() {
  const [list, setList] = React.useState<ToastItem[]>([]);
  React.useEffect(() => {
    listeners.add(setList);
    setList(items);
    return () => {
      listeners.delete(setList);
    };
  }, []);

  return (
    <div
      className="fixed z-[100] bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:w-96 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      role="status"
    >
      {list.map((it) => (
        <div
          key={it.id}
          role={it.tone === "error" ? "alert" : undefined}
          className={cn(
            "pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-elevated bg-surface text-ink animate-fade-in-up",
            it.tone === "error" && "border-danger/40",
            it.tone === "success" && "border-success/40",
            it.tone === "info" && "border-border",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "mt-1 h-2 w-2 rounded-full shrink-0",
              it.tone === "error" ? "bg-danger" : it.tone === "success" ? "bg-success" : "bg-brand-500",
            )}
          />
          <p className="flex-1 min-w-0 [overflow-wrap:anywhere] leading-snug">{it.text}</p>
          {it.action && (
            <button
              type="button"
              onClick={() => {
                it.action?.onClick();
                dismiss(it.id);
              }}
              className="shrink-0 text-xs font-medium underline underline-offset-2 text-brand-700 dark:text-brand-300"
            >
              {it.action.label}
            </button>
          )}
          <button
            type="button"
            onClick={() => dismiss(it.id)}
            aria-label={tUi("ui.close")}
            className="shrink-0 -mr-1 h-6 w-6 inline-flex items-center justify-center rounded-full text-ink-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Icon name="x" size={14} strokeWidth={2.2} />
          </button>
        </div>
      ))}
    </div>
  );
}
