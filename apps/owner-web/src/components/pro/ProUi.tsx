"use client";

import * as React from "react";
import Link from "next/link";
import type { Mandate, MandateType } from "@hwe/types";
import {
  AnimatedBackground,
  AgencyLogo,
  Badge,
  Button,
  Icon,
  IconBadge,
  Input,
  Label,
  Select,
  type IconName,
} from "@hwe/ui";
import { t } from "../../lib/i18n";
import { mandateStatusLabel, mandateStatusTone, type TermsForm } from "../../lib/pro";
import { Modal } from "../Modal";

export const LINK_PRIMARY =
  "inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full text-sm font-medium text-white hover:text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 shadow-md hover:shadow-glow";
export const LINK_SECONDARY =
  "inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full text-sm font-medium bg-surface text-ink border border-border hover:border-ink/30";
export const LINK_SM =
  "inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium bg-surface text-ink border border-border hover:border-ink/30";

/** En-tête des pages pro : titre Fraunces, sous-titre, actions. */
export function ProHero({
  kicker,
  title,
  accent,
  sub,
  actions,
  agency,
  children,
}: {
  kicker?: string;
  title: string;
  accent?: string;
  sub?: React.ReactNode;
  actions?: React.ReactNode;
  agency?: { name: string; logoUrl?: string | null } | null;
  children?: React.ReactNode;
}) {
  return (
    <AnimatedBackground variant="aurora" className="rounded-2xl border border-border/60 px-5 sm:px-8 py-7 sm:py-8 mb-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4 min-w-0">
          {agency && <AgencyLogo name={agency.name} logoUrl={agency.logoUrl} size="lg" className="hidden sm:inline-flex" />}
          <div className="min-w-0">
            {kicker && (
              <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-glow" />
                {kicker}
              </span>
            )}
            <h1 className="font-display text-3xl sm:text-4xl leading-tight [overflow-wrap:anywhere]">
              {title} {accent && <span className="gradient-text">{accent}</span>}
            </h1>
            {sub && <div className="text-ink-muted mt-2 max-w-2xl">{sub}</div>}
          </div>
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </AnimatedBackground>
  );
}

export function StatTile({
  icon,
  label,
  value,
  hint,
  href,
  tone = "brand",
  highlight,
}: {
  icon: IconName;
  label: string;
  value: React.ReactNode;
  hint?: string;
  href?: string;
  tone?: "brand" | "accent" | "ocean" | "neutral" | "danger" | "success";
  highlight?: boolean;
}) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <IconBadge name={icon} tone={tone} />
        {highlight && <span className="h-2.5 w-2.5 rounded-full bg-accent-500 animate-pulse-glow" aria-hidden="true" />}
      </div>
      <div className="mt-3 font-display text-2xl leading-none text-ink [overflow-wrap:anywhere]">{value}</div>
      <div className="mt-1 text-sm font-medium text-ink">{label}</div>
      {hint && <div className="text-xs text-ink-muted mt-0.5">{hint}</div>}
    </>
  );
  const cls = `group block min-w-0 rounded-2xl border bg-surface p-4 transition ${
    highlight ? "border-accent-300 dark:border-accent-700/60" : "border-border"
  } ${href ? "hover:border-brand-400 hover:shadow-card text-ink" : ""}`;
  return href ? (
    <Link href={href} className={cls} data-stat={label}>
      {body}
    </Link>
  ) : (
    <div className={cls} data-stat={label}>
      {body}
    </div>
  );
}

export function SectionCard({
  title,
  icon,
  actions,
  children,
  className = "",
  id,
}: {
  title: string;
  icon?: IconName;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`rounded-2xl border border-border bg-surface p-4 sm:p-6 min-w-0 ${className}`}>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <h2 className="font-display text-xl flex items-center gap-2 min-w-0">
          {icon && <Icon name={icon} size={20} className="text-brand-600 dark:text-brand-300" />}
          <span className="[overflow-wrap:anywhere]">{title}</span>
        </h2>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

export function MandateStatusBadge({ status }: { status: Mandate["status"] }) {
  return <Badge tone={mandateStatusTone(status)}>{mandateStatusLabel(status)}</Badge>;
}

export function MandateTypeBadge({ type }: { type: MandateType }) {
  const tone = type === "SALE" ? "accent" : type === "LETTING" ? "ocean" : "brand";
  return <Badge tone={tone}>{t(`pro.mtype.${type}`)}</Badge>;
}

/** Ligne libellé / valeur (fiches conditions, coordonnées). */
export function KV({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-border/60 last:border-0 text-sm min-w-0">
      <span className="text-ink-muted shrink-0">{label}</span>
      <span className="font-medium text-end min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </div>
  );
}

/** Champs des conditions d'un mandat (type, honoraires, encaissement, dates). */
export function MandateTermsFields({
  value,
  onChange,
  currency,
  lockType,
  allowedTypes,
  agencyHasIban = true,
}: {
  value: TermsForm;
  onChange: (v: TermsForm) => void;
  currency: string;
  lockType?: boolean;
  allowedTypes?: MandateType[];
  agencyHasIban?: boolean;
}) {
  const uid = React.useId();
  const set = <K extends keyof TermsForm>(k: K, v: TermsForm[K]) => onChange({ ...value, [k]: v });
  const types = allowedTypes ?? (["MANAGEMENT", "LETTING", "SALE"] as MandateType[]);
  const setType = (type: MandateType) =>
    onChange({
      ...value,
      type,
      managementFeeRate: type === "MANAGEMENT" ? value.managementFeeRate || "7" : "",
      saleFeeRate: type === "SALE" ? value.saleFeeRate || "4" : "",
      lettingMode: type === "SALE" ? "none" : value.lettingMode === "none" ? "months" : value.lettingMode,
      lettingFeeMonths: type === "SALE" ? "" : value.lettingFeeMonths || "1",
      rentPayee: type === "SALE" ? "OWNER" : value.rentPayee,
    });

  return (
    <div className="space-y-5">
      <fieldset disabled={lockType}>
        <legend className="text-sm font-medium mb-2">{t("pro.terms.type")}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="radiogroup">
          {types.map((ty) => {
            const active = value.type === ty;
            return (
              <button
                key={ty}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setType(ty)}
                className={`text-start rounded-xl border p-3 transition min-w-0 ${
                  active
                    ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/30 dark:bg-brand-900/30"
                    : "border-border bg-surface hover:border-brand-300"
                } disabled:opacity-60`}
              >
                <div className="font-medium text-sm flex items-center gap-1.5">
                  <Icon name={ty === "SALE" ? "tag" : ty === "LETTING" ? "key" : "layers"} size={16} />
                  {t(`pro.mtype.${ty}`)}
                </div>
                <div className="text-xs text-ink-muted mt-1">{t(`pro.mtypeDesc.${ty}`)}</div>
              </button>
            );
          })}
        </div>
      </fieldset>

      {value.type === "SALE" ? (
        <div className="max-w-xs">
          <Label htmlFor={`${uid}-sale`}>{t("pro.terms.saleRate")}</Label>
          <Input id={`${uid}-sale`} type="number" min="0" max="15" step="0.1" value={value.saleFeeRate} onChange={(e) => set("saleFeeRate", e.target.value)} />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {value.type === "MANAGEMENT" && (
            <div>
              <Label htmlFor={`${uid}-mgmt`}>{t("pro.terms.mgmtRate")}</Label>
              <Input id={`${uid}-mgmt`} type="number" min="0" max="30" step="0.1" value={value.managementFeeRate} onChange={(e) => set("managementFeeRate", e.target.value)} />
              <p className="text-xs text-ink-muted mt-1">{t("pro.terms.mgmtHint")}</p>
            </div>
          )}
          <div>
            <Label htmlFor={`${uid}-lmode`}>{t("pro.terms.lettingFee")}</Label>
            <Select id={`${uid}-lmode`} value={value.lettingMode} onChange={(e) => set("lettingMode", e.target.value as TermsForm["lettingMode"])}>
              <option value="months">{t("pro.terms.lettingMonthsOpt")}</option>
              <option value="amount">{t("pro.terms.lettingAmountOpt", { cur: currency })}</option>
              <option value="none">{t("pro.terms.lettingNoneOpt")}</option>
            </Select>
            {value.lettingMode === "months" && (
              <Input
                aria-label={t("pro.terms.lettingMonthsOpt")}
                id={`${uid}-lmonths`}
                className="mt-2"
                type="number"
                min="0"
                max="3"
                step="0.25"
                value={value.lettingFeeMonths}
                onChange={(e) => set("lettingFeeMonths", e.target.value)}
              />
            )}
            {value.lettingMode === "amount" && (
              <Input
                aria-label={t("pro.terms.lettingAmountOpt", { cur: currency })}
                id={`${uid}-lamount`}
                className="mt-2"
                type="number"
                min="0"
                step="1"
                value={value.lettingFeeAmount}
                onChange={(e) => set("lettingFeeAmount", e.target.value)}
              />
            )}
          </div>
          <div className="sm:col-span-2">
            <span className="text-sm font-medium">{t("pro.terms.payee")}</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["OWNER", "AGENCY"] as const).map((p) => (
                <label
                  key={p}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 h-9 text-sm cursor-pointer ${
                    value.rentPayee === p ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30" : "border-border"
                  } ${p === "AGENCY" && !agencyHasIban ? "opacity-60" : ""}`}
                >
                  <input
                    type="radio"
                    name={`${uid}-payee`}
                    checked={value.rentPayee === p}
                    disabled={p === "AGENCY" && !agencyHasIban}
                    onChange={() => set("rentPayee", p)}
                  />
                  {t(`pro.terms.payee.${p}`)}
                </label>
              ))}
            </div>
            {!agencyHasIban && <p className="text-xs text-ink-muted mt-1">{t("pro.terms.payeeNeedsIban")}</p>}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${uid}-start`}>{t("pro.terms.start")}</Label>
          <Input id={`${uid}-start`} type="date" value={value.startDate} onChange={(e) => set("startDate", e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`${uid}-end`}>{t("pro.terms.end")}</Label>
          <Input id={`${uid}-end`} type="date" min={value.startDate || undefined} value={value.endDate} onChange={(e) => set("endDate", e.target.value)} />
        </div>
      </div>
    </div>
  );
}

/**
 * Confirmation explicite (remplace confirm()) — utilisée pour les actions
 * « pour le compte du propriétaire » : l'avertissement est lu AVANT l'action.
 */
export function ConfirmDialog({
  title,
  children,
  confirmLabel,
  onConfirm,
  onClose,
  tone = "primary",
  busy,
  requireText,
}: {
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  onConfirm: (text: string) => void | Promise<void>;
  onClose: () => void;
  tone?: "primary" | "danger" | "warning";
  busy?: boolean;
  /** Libellé d'un champ texte obligatoire (motif…). */
  requireText?: { label: string; min?: number; placeholder?: string };
}) {
  const [text, setText] = React.useState("");
  const uid = React.useId();
  const ok = !requireText || text.trim().length >= (requireText.min ?? 1);
  return (
    <Modal title={title} onClose={onClose}>
      <div className="space-y-4 text-sm" data-confirm-dialog>
        {children}
        {requireText && (
          <div>
            <Label htmlFor={`${uid}-txt`}>{requireText.label}</Label>
            <Input id={`${uid}-txt`} value={text} placeholder={requireText.placeholder} onChange={(e) => setText(e.target.value)} />
          </div>
        )}
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            {t("pro.cancel")}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "gradient"}
            disabled={busy || !ok}
            onClick={() => onConfirm(text.trim())}
            data-confirm
          >
            {busy ? t("pro.processing") : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/** Encadré d'avertissement (action pour le compte du propriétaire). */
export function WarningNote({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div role="note" className="rounded-xl border border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700/60 dark:bg-amber-900/20 dark:text-amber-100 p-4 flex gap-3" data-warning>
      <Icon name="alert" size={20} className="shrink-0 mt-0.5" />
      <div className="min-w-0 space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/** Note d'explication quand un bouton est désactivé / masqué. */
export function LockedNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-border bg-cream-50/70 dark:bg-white/5 px-3 py-2 text-xs text-ink-muted" data-locked-note>
      <Icon name="lock" size={14} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
