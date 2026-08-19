import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface MessageBubbleProps {
  content: string;
  /** Whether this message was sent by the current user (right-aligned). */
  fromMe: boolean;
  /** Author display name (shown above non-self messages). */
  authorName?: string;
  /** Author avatar (URL or null/undefined for initials). */
  avatarUrl?: string | null;
  /** Initials fallback when no avatar. */
  initials?: string;
  /** ISO timestamp — displayed in tooltip and below the bubble. */
  timestamp?: string;
  /** Show a small "Lu" indicator (own messages, when readAt set). */
  read?: boolean;
}

const formatTime = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  return sameDay
    ? d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  fromMe,
  authorName,
  avatarUrl,
  initials = "?",
  timestamp,
  read = false,
}) => {
  return (
    <div
      className={cn(
        "flex items-end gap-2 max-w-[85%]",
        fromMe ? "ml-auto flex-row-reverse" : "mr-auto",
      )}
    >
      {/* Avatar */}
      {!fromMe && (
        <span className="shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white text-xs font-bold flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={authorName ?? ""}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </span>
      )}

      <div className={cn("flex flex-col", fromMe ? "items-end" : "items-start")}>
        {!fromMe && authorName && (
          <span className="text-[10px] text-ink-subtle mb-0.5 px-1">
            {authorName}
          </span>
        )}
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed shadow-sm",
            fromMe
              ? "bg-gradient-to-br from-brand-600 to-brand-500 text-cream-50 rounded-br-md"
              : "bg-surface border border-border text-ink rounded-bl-md",
          )}
        >
          {content}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 px-1 text-[10px] text-ink-subtle">
          {timestamp && <span>{formatTime(timestamp)}</span>}
          {fromMe && read && (
            <span title={tUi("ui.read")} className="text-brand-600">
              ✓✓
            </span>
          )}
          {fromMe && !read && (
            <span title={tUi("ui.sent")} className="text-ink-subtle">
              ✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
