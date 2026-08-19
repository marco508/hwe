"use client";

import * as React from "react";
import { cn } from "../utils";
import { UnreadBadge } from "./UnreadBadge";
import { tUi } from "./I18nKit";

export interface BellPreviewItem {
  id: string;
  /** Nom de l'interlocuteur. */
  partnerName: string;
  /** Initiales (fallback avatar). */
  initials?: string;
  /** URL avatar. */
  avatarUrl?: string | null;
  /** Aperçu du dernier message. */
  preview: string;
  /** Horodatage ISO. */
  timestamp?: string | null;
  /** Non-lu côté user courant. */
  unread?: boolean;
  /** URL de destination au clic. */
  href: string;
}

export interface NotificationsBellProps {
  /** Nombre total de messages non-lus. */
  unreadCount: number;
  /** Conversations récentes (max ~5 affichées). */
  preview?: BellPreviewItem[];
  /** URL "Tout voir". */
  seeAllHref: string;
  /** Polling/refresh callback déclenché à l'ouverture du popover. */
  onOpen?: () => void;
  /** Texte d'en-tête (par défaut "Messages"). */
  label?: string;
  className?: string;
}

const timeAgo = (iso?: string | null) => {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return tUi("ui.time.now");
  if (min < 60) return tUi("ui.time.min", { n: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return tUi("ui.time.hours", { n: hr });
  const days = Math.floor(hr / 24);
  if (days < 7) return tUi("ui.time.days", { n: days });
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
};

/**
 * Bouton "cloche" pour la navbar : icône SVG + badge unread + popover avec
 * aperçu des derniers messages. Fermeture au clic extérieur ou Escape.
 */
export const NotificationsBell: React.FC<NotificationsBellProps> = ({
  unreadCount,
  preview = [],
  seeAllHref,
  onOpen,
  label = tUi("ui.messages"),
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    onOpen?.();
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={`${label}${unreadCount > 0 ? ` (${tUi("ui.unreadCount", { n: unreadCount })})` : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface hover:border-ink/30 transition-colors text-ink"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1">
            <UnreadBadge count={unreadCount} />
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={label}
          className="absolute right-0 mt-2 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-surface shadow-elevated z-50 overflow-hidden animate-scale-in origin-top-right"
        >
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="font-display text-base text-ink">{label}</div>
            {unreadCount > 0 && (
              <UnreadBadge count={unreadCount} className="!h-5 !min-w-5 px-1.5" />
            )}
          </div>

          {preview.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <div className="text-3xl mb-2">💭</div>
              <div className="text-sm text-ink-muted">
                {tUi("ui.noMessagesYet")}
              </div>
              <div className="text-xs text-ink-subtle mt-1">
                {tUi("ui.conversationsAppearHere")}
              </div>
            </div>
          ) : (
            <ul className="max-h-[340px] overflow-y-auto">
              {preview.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 hover:bg-cream-100 dark:hover:bg-white/[0.04] transition-colors",
                      item.unread && "bg-brand-50/40 dark:bg-brand-900/15",
                    )}
                  >
                    <span className="relative shrink-0">
                      <span className="block h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white text-xs font-bold flex items-center justify-center overflow-hidden">
                        {item.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.avatarUrl}
                            alt={item.partnerName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          item.initials ?? "?"
                        )}
                      </span>
                      {item.unread && (
                        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-surface" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-ink truncate">
                          {item.partnerName}
                        </span>
                        <span className="text-[10px] text-ink-subtle shrink-0">
                          {timeAgo(item.timestamp)}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "text-xs truncate",
                          item.unread
                            ? "text-ink font-medium"
                            : "text-ink-muted",
                        )}
                      >
                        {item.preview}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <a
            href={seeAllHref}
            onClick={() => setOpen(false)}
            className="block text-center text-sm font-medium py-3 border-t border-border bg-cream-50/60 dark:bg-surface/60 hover:bg-cream-100 dark:hover:bg-white/[0.04] text-ink transition-colors"
          >
            {tUi("ui.seeAllConversations")}
          </a>
        </div>
      )}
    </div>
  );
};
