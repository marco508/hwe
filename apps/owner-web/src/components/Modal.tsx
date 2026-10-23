"use client";

import * as React from "react";
import { tUi } from "@hwe/ui";

/**
 * Fenêtre modale accessible (M2) : role="dialog", aria-modal, titre relié,
 * fermeture par Échap ou clic sur le fond, focus initial dans la fenêtre,
 * focus restitué à l'élément d'origine à la fermeture, défilement interne
 * sur petit écran.
 */
export function Modal({
  title,
  onClose,
  children,
  size = "md",
}: {
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  size?: "md" | "lg" | "xl";
}) {
  const titleId = React.useId();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  React.useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(
      "input:not([type=hidden]), select, textarea, button:not([data-modal-close]), [href], [tabindex]:not([tabindex='-1'])",
    );
    (first ?? panel)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      // Piège à focus minimal : Tab reste dans la fenêtre.
      if (e.key === "Tab" && panel) {
        const items = Array.from(
          panel.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
          ),
        );
        if (items.length === 0) return;
        const firstEl = items[0]!;
        const lastEl = items[items.length - 1]!;
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, []);

  const width = size === "xl" ? "max-w-3xl" : size === "lg" ? "max-w-2xl" : "max-w-lg";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative bg-surface text-ink rounded-t-2xl sm:rounded-2xl shadow-2xl w-full ${width} max-h-[92vh] overflow-y-auto p-5 sm:p-8 focus:outline-none`}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <h2 id={titleId} className="font-display text-xl min-w-0 [overflow-wrap:anywhere]">
            {title}
          </h2>
          <button
            type="button"
            data-modal-close
            onClick={onClose}
            aria-label={tUi("ui.close")}
            className="shrink-0 h-8 w-8 rounded-full inline-flex items-center justify-center text-ink-muted hover:text-ink hover:bg-cream-100 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
