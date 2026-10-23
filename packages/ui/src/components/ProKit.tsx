"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";
import { Icon } from "./Icon";
import { SafeImage } from "./SafeImage";
import { toast } from "./Toast";

/**
 * Briques partagées du module Professionnels : logo d'agence, badge
 * « Géré par », et lien d'invitation copiable / partageable sur WhatsApp
 * (le SMTP n'étant pas garanti, le lien est TOUJOURS affiché).
 */

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

export function AgencyLogo({
  name,
  logoUrl,
  size = "md",
  className,
}: {
  name: string;
  logoUrl?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const dims = {
    xs: "h-5 w-5 text-[9px] rounded",
    sm: "h-8 w-8 text-xs rounded-lg",
    md: "h-11 w-11 text-sm rounded-xl",
    lg: "h-16 w-16 text-lg rounded-2xl",
    xl: "h-24 w-24 text-2xl rounded-3xl",
  }[size];
  return (
    <span className={cn("inline-flex shrink-0 overflow-hidden bg-surface ring-1 ring-border", dims, className)}>
      <SafeImage
        src={logoUrl}
        alt={name}
        className="h-full w-full object-contain bg-white"
        fallbackClassName="h-full w-full bg-gradient-to-br from-brand-700 to-accent-500 text-white font-display font-semibold"
        fallback={initials(name)}
      />
    </span>
  );
}

/** Pastille « Géré par <agence> ». */
export function ManagedByBadge({
  name,
  logoUrl,
  className,
  label,
}: {
  name: string;
  logoUrl?: string | null;
  className?: string;
  /** Texte complet (par défaut « Géré par {name} »). */
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 max-w-full rounded-full border border-brand-200 bg-brand-50 pl-0.5 pr-2.5 py-0.5 text-xs font-medium text-brand-800",
        "dark:border-brand-800 dark:bg-brand-900/40 dark:text-brand-200",
        className,
      )}
      data-managed-by={name}
    >
      <AgencyLogo name={name} logoUrl={logoUrl} size="xs" className="rounded-full" />
      <span className="truncate">{label ?? tUi("ui.pro.managedBy", { name })}</span>
    </span>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* repli ci-dessous */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

/** Lien d'invitation : champ en lecture seule + Copier + Partager sur WhatsApp. */
export function InviteLinkBox({
  url,
  message,
  title,
  hint,
  className,
}: {
  url: string;
  /** Texte qui précède le lien dans le message WhatsApp. */
  message?: string;
  title?: string;
  hint?: string | null;
  className?: string;
}) {
  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [copied, setCopied] = React.useState(false);
  const wa = `https://wa.me/?text=${encodeURIComponent(message ? `${message} ${url}` : url)}`;

  const onCopy = async () => {
    const ok = await copyText(url);
    if (ok) {
      setCopied(true);
      toast.success(tUi("ui.pro.copied"));
      setTimeout(() => setCopied(false), 2500);
    } else {
      inputRef.current?.select();
      toast.error(tUi("ui.pro.copyFailed"));
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-200 bg-brand-50/70 p-4 dark:border-brand-800 dark:bg-brand-900/25 min-w-0",
        className,
      )}
      data-invite-box
    >
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-ink mb-2">
        <Icon name="send" size={16} className="text-brand-700 dark:text-brand-300" />
        {title ?? tUi("ui.pro.linkLabel")}
      </label>
      <input
        id={id}
        ref={inputRef}
        readOnly
        value={url}
        data-invite-url
        onFocus={(e) => e.currentTarget.select()}
        className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-xs font-mono text-ink min-w-0"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-brand-950 text-cream-50 text-sm font-medium hover:opacity-90 dark:bg-cream-100 dark:text-brand-950"
        >
          <Icon name={copied ? "check" : "clipboard"} size={15} />
          {copied ? tUi("ui.pro.copied") : tUi("ui.pro.copy")}
        </button>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#1f8f4e] text-white text-sm font-medium hover:bg-[#187a41] hover:text-white"
        >
          <Icon name="message" size={15} />
          {tUi("ui.pro.whatsapp")}
        </a>
      </div>
      {hint !== null && <p className="mt-2 text-xs text-ink-muted">{hint ?? tUi("ui.pro.linkHint")}</p>}
    </div>
  );
}
