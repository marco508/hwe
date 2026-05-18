"use client";

import * as React from "react";
import { cn } from "../utils";

export interface MessageComposerProps {
  onSend: (content: string) => void | Promise<void>;
  disabled?: boolean;
  /** Placeholder text. */
  placeholder?: string;
  className?: string;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  disabled = false,
  placeholder = "Écrivez votre message…",
  className,
}) => {
  const [value, setValue] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize textarea
  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  }, [value]);

  const submit = async () => {
    const trimmed = value.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      await onSend(trimmed);
      setValue("");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className={cn(
        "flex items-end gap-2 p-3 rounded-2xl border border-border bg-surface shadow-card",
        disabled && "opacity-60 pointer-events-none",
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={placeholder}
        rows={1}
        disabled={disabled || sending}
        className="flex-1 resize-none bg-transparent text-sm text-ink placeholder:text-ink-subtle outline-none px-2 py-1.5 leading-relaxed max-h-[180px]"
      />
      <button
        type="submit"
        disabled={!value.trim() || sending}
        aria-label="Envoyer"
        className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center transition-all shrink-0",
          value.trim() && !sending
            ? "bg-gradient-to-br from-brand-600 to-brand-500 text-cream-50 hover:shadow-glow"
            : "bg-cream-200 text-ink-subtle cursor-not-allowed",
        )}
      >
        {sending ? (
          <span className="inline-block h-4 w-4 rounded-full border-2 border-cream-50/40 border-t-cream-50 animate-spin" />
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        )}
      </button>
    </form>
  );
};
