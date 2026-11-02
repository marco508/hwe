"use client";

import * as React from "react";
import type { User } from "@hwe/types";
import { API_URL } from "../client/config";
import { request } from "../client/http";
import { isApiError } from "../client/errors";
import { useAuth, WRONG_ROLE } from "../client/auth";
import { cn } from "../utils";
import { Icon } from "./Icon";
import { tUi } from "./I18nKit";

/**
 * Écosystème DKP Solution (contrat /opt/dkp/CONTRAT.md), côté fronts.
 * Tout est piloté par GET /api/dkp/config : sans variables d'environnement
 * côté API, rien ne s'affiche (boutons et liens masqués). hwe reste la marque
 * dominante : les autres services sont cités sobrement, avec leur nom.
 */

export interface DkpConfig {
  login: boolean;
  payments: boolean;
  services: { account: string; links: { zemi: string; afrochina: string; gestipro: string; familyfe: string } } | null;
  zemi: string | null;
  afrochina: string | null;
  gestipro: boolean;
  familyfe: { url: string | null } | null;
}

const EMPTY: DkpConfig = { login: false, payments: false, services: null, zemi: null, afrochina: null, gestipro: false, familyfe: null };
let cache: DkpConfig | null = null;
let inflight: Promise<DkpConfig> | null = null;
const listeners = new Set<() => void>();

function loadDkpConfig(): Promise<DkpConfig> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = request<DkpConfig>("/dkp/config")
      .then((c) => ({ ...EMPTY, ...(c ?? {}) }))
      .catch(() => EMPTY) // hub ou API indisponible : tout reste masqué
      .then((c) => {
        cache = c;
        listeners.forEach((l) => l());
        return c;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/** Configuration DKP (null tant qu'elle n'est pas chargée). */
export function useDkpConfig(): DkpConfig | null {
  const [cfg, setCfg] = React.useState<DkpConfig | null>(cache);
  React.useEffect(() => {
    const on = () => setCfg(cache);
    listeners.add(on);
    void loadDkpConfig().then(setCfg);
    return () => {
      listeners.delete(on);
    };
  }, []);
  return cfg;
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// ─────────────────────────── Compte DKP ───────────────────────────

/** URL de départ (API) du parcours « Continuer avec un compte DKP ». */
export function dkpStartUrl(space: "owner" | "tenant", next?: string | null): string {
  const p = new URLSearchParams({ space });
  if (next && next.startsWith("/") && !next.startsWith("//")) p.set("next", next);
  return `${API_URL}/api/auth/dkp/start?${p.toString()}`;
}

/** Bouton « Continuer avec un compte DKP » (connexion et inscription), masqué sans hub. */
export function DkpLoginButton({ space, next, className }: { space: "owner" | "tenant"; next?: string | null; className?: string }) {
  const cfg = useDkpConfig();
  if (!cfg?.login) return null;
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-3 text-xs text-ink-muted" aria-hidden>
        <span className="h-px flex-1 bg-border" />
        {tUi("ui.dkp.or")}
        <span className="h-px flex-1 bg-border" />
      </div>
      <a
        href={dkpStartUrl(space, next)}
        className="flex w-full items-center justify-center gap-2 h-11 px-4 rounded-full border border-border bg-surface text-ink text-sm font-medium hover:bg-brand-50/50 dark:hover:bg-brand-900/20 transition-colors"
      >
        <Icon name="key" size={16} />
        {tUi("ui.dkp.continue")}
      </a>
      <p className="text-[11px] text-ink-muted text-center">{tUi("ui.dkp.hint")}</p>
    </div>
  );
}

/** Message lisible pour ?dkp_error=<code> (retour du parcours Compte DKP). */
export function dkpErrorText(code: string | null | undefined): string | null {
  if (!code) return null;
  const known = ["denied", "state", "hub", "email_unverified", "admin", "conflict", "disabled", "invalid"];
  return tUi(`ui.dkp.err.${known.includes(code) ? code : "hub"}`);
}

/**
 * Page /auth/dkp : lit le jeton dans le fragment (#access=…&next=…), l'efface
 * de la barre d'adresse, ouvre la session comme une connexion habituelle.
 */
export function DkpCallback({
  defaultNext,
  wrongRole,
}: {
  /** Destination après connexion (selon le rôle) quand aucun `next` n'est fourni. */
  defaultNext: (u: User, next: string) => string;
  /** Contenu affiché quand le compte relève de l'autre espace. */
  wrongRole: React.ReactNode;
}) {
  const { adoptToken } = useAuth();
  const [state, setState] = React.useState<"busy" | "wrongRole" | "error">("busy");
  const started = React.useRef(false);
  React.useEffect(() => {
    if (started.current) return;
    started.current = true;
    const frag = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    // Le jeton ne reste ni dans l'historique ni dans la barre d'adresse.
    window.history.replaceState(null, "", window.location.pathname);
    const access = frag.get("access");
    const rawNext = frag.get("next") ?? "";
    const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "";
    if (!access) {
      setState("error");
      return;
    }
    adoptToken(access)
      .then((u) => window.location.replace(defaultNext(u, next)))
      .catch((e) => setState(isApiError(e) && e.code === WRONG_ROLE ? "wrongRole" : "error"));
  }, [adoptToken, defaultNext]);

  return (
    <div className="container-app py-20 max-w-md text-center space-y-4" role="status" aria-live="polite">
      {state === "busy" && <p className="text-ink-muted">{tUi("ui.dkp.signingIn")}</p>}
      {state === "wrongRole" && wrongRole}
      {state === "error" && (
        <>
          <p className="text-danger">{tUi("ui.dkp.err.hub")}</p>
          <a href="/login" className="inline-flex font-medium underline">
            {tUi("ui.dkp.backToLogin")}
          </a>
        </>
      )}
    </div>
  );
}

// ─────────────────────────── Services DKP (pied de page) ───────────────────────────

/** « hwe fait partie des services DKP Solution » + liens (discret). */
export function DkpServices({ tone = "muted", className }: { tone?: "muted" | "inverted"; className?: string }) {
  const cfg = useDkpConfig();
  const s = cfg?.services;
  if (!s) return null;
  const link = tone === "inverted" ? "text-cream-200/80 hover:text-cream-50" : "text-ink-muted hover:text-ink";
  const items: Array<[string, string]> = [
    ["Zémi Market", s.links.zemi],
    ["AfroChina", s.links.afrochina],
    ["GestiPro", s.links.gestipro],
    ["FamiLyfe", s.links.familyfe],
    [tUi("ui.dkp.services.account"), s.account],
  ];
  return (
    <nav aria-label={tUi("ui.dkp.services.title")} className={cn("text-xs flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      <span className={tone === "inverted" ? "text-cream-200/60" : "text-ink-subtle"}>{tUi("ui.dkp.services.lead")}</span>
      {items.map(([label, href]) => (
        <a key={label} href={href} {...external} className={cn("underline-offset-2 hover:underline", link)}>
          {label}
        </a>
      ))}
    </nav>
  );
}

// ─────────────────────────── Ponts contextuels ───────────────────────────

export interface ZemiPrefill {
  address: string;
  lat?: number | null;
  lng?: number | null;
  name?: string | null;
  phone?: string | null;
  note?: string | null;
}

/** Lien pré-rempli Zémi Market (contrat §2.1). */
export function zemiDeliveryUrl(base: string, p: ZemiPrefill): string {
  const q = new URLSearchParams({ dkp_source: "hwe", adresse: p.address.slice(0, 300) });
  if (typeof p.lat === "number" && Number.isFinite(p.lat)) q.set("lat", String(p.lat));
  if (typeof p.lng === "number" && Number.isFinite(p.lng)) q.set("lng", String(p.lng));
  if (p.name) q.set("nom", p.name.slice(0, 120));
  if (p.phone) q.set("tel", p.phone.slice(0, 30));
  if (p.note) q.set("note", p.note.slice(0, 300));
  return `${base.replace(/\/+$/, "")}/?${q.toString()}`;
}

function BridgeCard({ href, title, sub, icon }: { href: string; title: string; sub: string; icon: "store" | "sofa" }) {
  return (
    <a
      href={href}
      {...external}
      className="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3 hover:bg-brand-50/50 dark:hover:bg-brand-900/20 transition-colors"
    >
      <Icon name={icon} size={18} className="mt-0.5 shrink-0 text-ink-muted" />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">{title}</span>
        <span className="block text-xs text-ink-muted">{sub}</span>
        <span className="sr-only"> {tUi("ui.dkp.newTab")}</span>
      </span>
      <Icon name="arrowRight" size={15} className="ms-auto mt-1 shrink-0 text-ink-muted rtl:rotate-180" />
    </a>
  );
}

/** « Faire livrer des courses à ce logement — Zémi Market » : biens au Bénin seulement. */
export function ZemiDeliveryLink({ country, ...prefill }: ZemiPrefill & { country?: string | null }) {
  const cfg = useDkpConfig();
  if (!cfg?.zemi || (country ?? "").toUpperCase() !== "BJ" || !prefill.address.trim()) return null;
  return <BridgeCard href={zemiDeliveryUrl(cfg.zemi, prefill)} title={tUi("ui.dkp.zemi.cta")} sub={tUi("ui.dkp.zemi.sub")} icon="store" />;
}

/** Lien pré-rempli AfroChina (contrat §2.2). */
export function afrochinaUrl(base: string, p: { title: string; description: string; quantity?: number }): string {
  const q = new URLSearchParams({ dkp_source: "hwe", titre: p.title.slice(0, 150), description: p.description.slice(0, 1500) });
  if (p.quantity && p.quantity > 0) q.set("quantite", String(Math.floor(p.quantity)));
  return `${base}${base.includes("?") ? "&" : "?"}${q.toString()}`;
}

/** « Équiper ce logement depuis la Chine — AfroChina » (propriétaire ou hôte). */
export function AfroChinaEquipLink({ property }: { property: { title: string; city?: string | null; surface?: number | null; bedrooms?: number | null } }) {
  const cfg = useDkpConfig();
  if (!cfg?.afrochina) return null;
  const href = afrochinaUrl(cfg.afrochina, {
    title: tUi("ui.dkp.afro.title", { title: property.title }),
    description: tUi("ui.dkp.afro.desc", {
      title: property.title,
      city: property.city ?? "",
      surface: property.surface ?? "?",
      bedrooms: property.bedrooms ?? "?",
    }),
    quantity: 1,
  });
  return <BridgeCard href={href} title={tUi("ui.dkp.afro.cta")} sub={tUi("ui.dkp.afro.sub")} icon="sofa" />;
}
