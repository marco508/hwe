"use client";

import * as React from "react";
import type {
  AgencyMine,
  Mandate,
  MandateTerms,
  MandateType,
  Property,
  User,
} from "@hwe/types";
import { fmtMoney, getUiLang, intlLocale, isApiError, useAsync } from "@hwe/ui";
import { api } from "./api";
import { useAuth } from "./auth-context";
import { t } from "./i18n";

/** Compte professionnel (responsable ou agent d'agence). */
export const isPro = (u: Pick<User, "role"> | null | undefined) => u?.role === "AGENT";
export const isManager = (u: User | null | undefined) => isPro(u) && u?.agency?.role === "MANAGER";

// ── Portefeuille du pro (GET /properties/mine/list) — cache court partagé ──
let portfolioCache: { at: number; userId: string; data: Promise<Property[]> } | null = null;

export function loadPortfolio(userId: string, force = false): Promise<Property[]> {
  if (!force && portfolioCache && portfolioCache.userId === userId && Date.now() - portfolioCache.at < 15_000) {
    return portfolioCache.data;
  }
  const data = api.listMine();
  portfolioCache = { at: Date.now(), userId, data };
  data.catch(() => {
    portfolioCache = null;
  });
  return data;
}

export function invalidatePortfolio() {
  portfolioCache = null;
}

/**
 * Accès du compte courant à un bien : pour un pro, l'entrée du portefeuille
 * (mandat, propriétaire, droits) ; pour un propriétaire, `null`.
 */
export function usePortfolioItem(propertyId: string | undefined) {
  const { user } = useAuth();
  const pro = isPro(user);
  const { data, loading } = useAsync(
    () => loadPortfolio(user!.id),
    [user?.id, propertyId],
    { enabled: pro && !!user && !!propertyId },
  );
  const item = pro ? data?.find((p) => p.id === propertyId) ?? null : null;
  return { pro, item, loading: pro && loading };
}

/** Agence du pro connecté (GET /agencies/me). */
export function useMyAgency() {
  const { user } = useAuth();
  return useAsync<AgencyMine>(() => api.myAgency(), [user?.id, user?.agency?.id], {
    enabled: isPro(user) && !!user?.agency,
  });
}

/** Map userId → « Prénom Nom » des membres de l'agence (auteur des actions). */
export function useMemberNames() {
  const { user } = useAuth();
  const ag = useMyAgency();
  return React.useCallback(
    (id: string | null | undefined): string | null => {
      if (!id) return null;
      if (id === user?.id) return t("pro.you");
      const m = ag.data?.members.find((x) => x.userId === id);
      return m ? `${m.user.firstName} ${m.user.lastName}` : null;
    },
    [ag.data, user?.id],
  );
}

export const MANDATE_TYPES: MandateType[] = ["MANAGEMENT", "LETTING", "SALE"];

export const mandateTypeLabel = (type: MandateType) => t(`pro.mtype.${type}`);
export const mandateStatusLabel = (s: Mandate["status"]) => t(`pro.mstatus.${s}`);
export const mandateStatusTone = (s: Mandate["status"]) =>
  (({ ACTIVE: "success", PENDING_OWNER: "accent", REJECTED: "danger", ENDED: "neutral" }) as const)[s];

/** Résumé lisible des honoraires d'un mandat. */
export function feeTermsLines(
  m: Pick<Mandate, "type" | "managementFeeRate" | "lettingFeeAmount" | "lettingFeeMonths" | "saleFeeRate" | "currency">,
): string[] {
  const out: string[] = [];
  if (m.type === "SALE") {
    if (m.saleFeeRate != null) out.push(t("pro.fee.saleRate", { rate: fmtRate(m.saleFeeRate) }));
  } else {
    if (m.type === "MANAGEMENT" && m.managementFeeRate != null)
      out.push(t("pro.fee.mgmtRate", { rate: fmtRate(m.managementFeeRate) }));
    if (m.lettingFeeAmount != null) out.push(t("pro.fee.lettingAmount", { amount: fmtMoney(m.lettingFeeAmount, m.currency) }));
    else if (m.lettingFeeMonths != null) out.push(t("pro.fee.lettingMonths", { n: fmtRate(m.lettingFeeMonths) }));
  }
  if (out.length === 0) out.push(t("pro.fee.none"));
  return out;
}

export const fmtRate = (n: number) =>
  new Intl.NumberFormat(intlLocale(), { maximumFractionDigits: 2 }).format(n);

/** Formulaire des conditions de mandat → corps API. */
export interface TermsForm {
  type: MandateType;
  managementFeeRate: string;
  lettingMode: "amount" | "months" | "none";
  lettingFeeAmount: string;
  lettingFeeMonths: string;
  saleFeeRate: string;
  rentPayee: "OWNER" | "AGENCY";
  startDate: string;
  endDate: string;
}

export const todayIso = () => new Date().toISOString().slice(0, 10);

export const defaultTerms = (type: MandateType = "MANAGEMENT"): TermsForm => ({
  type,
  managementFeeRate: type === "MANAGEMENT" ? "7" : "",
  lettingMode: type === "SALE" ? "none" : "months",
  lettingFeeAmount: "",
  lettingFeeMonths: type === "SALE" ? "" : "1",
  saleFeeRate: type === "SALE" ? "4" : "",
  rentPayee: "OWNER",
  startDate: todayIso(),
  endDate: "",
});

export function termsBody(f: TermsForm): MandateTerms {
  const num = (s: string) => (s.trim() === "" ? undefined : Number(s.replace(",", ".")));
  const body: MandateTerms = { type: f.type, rentPayee: f.type === "SALE" ? "OWNER" : f.rentPayee, startDate: f.startDate || undefined };
  if (f.endDate) body.endDate = f.endDate;
  if (f.type === "SALE") {
    body.saleFeeRate = num(f.saleFeeRate);
  } else {
    if (f.type === "MANAGEMENT") body.managementFeeRate = num(f.managementFeeRate);
    if (f.lettingMode === "amount") body.lettingFeeAmount = num(f.lettingFeeAmount);
    if (f.lettingMode === "months") body.lettingFeeMonths = num(f.lettingFeeMonths);
  }
  return body;
}

/** Message clair pour un refus d'accès du module (403 du contrat). */
export function proDeniedCode(e: unknown): string | null {
  if (!isApiError(e)) return null;
  if (e.status !== 403 && e.status !== 404) return null;
  return e.code ?? null;
}

/** Mois courant AAAA-MM (fuseau local). */
export function currentMonth(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Auteur d'une action (validation de loyer, réponse à une visite, incident) :
 * « par <membre> » côté pro, « par <agence> » côté propriétaire. null si
 * l'action vient de l'utilisateur courant ou si l'auteur est inconnu.
 */
export function useActorLabel() {
  const { user } = useAuth();
  const pro = isPro(user);
  const names = useMemberNames();
  const mine = useAsync(() => loadPortfolio(user!.id), [user?.id], { enabled: !!user && !pro && user.role === "OWNER" });
  return React.useCallback(
    (actorId: string | null | undefined, propertyId?: string | null): string | null => {
      if (!actorId || actorId === user?.id) return null;
      if (pro) {
        const n = names(actorId);
        return t("pro.byName", { name: n ?? t("pro.theOwner") });
      }
      const ag = mine.data?.find((p) => p.id === propertyId)?.managedBy;
      return ag ? t("pro.byName", { name: ag.name }) : null;
    },
    [user?.id, pro, names, mine.data],
  );
}

/**
 * Libellé d'un honoraire : celui de l'API (rédigé en français) en FR ;
 * en anglais, un libellé reconstruit (type + mois d'échéance).
 */
export function feeLabel(f: { label: string; kind: "MANAGEMENT" | "LETTING" | "SALE"; dueDate: string }): string {
  if (getUiLang() === "fr") return f.label;
  const month = new Intl.DateTimeFormat(intlLocale(), { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(f.dueDate));
  return t(`pro.feeLabel.${f.kind}`, { month });
}

/** « octobre 2026 » / « October 2026 » à partir de AAAA-MM. */
export function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  if (!y || !m) return month;
  return new Intl.DateTimeFormat(intlLocale(), { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 1)));
}
