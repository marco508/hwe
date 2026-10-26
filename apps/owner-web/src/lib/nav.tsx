"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import type { Property, User } from "@hwe/types";
import { api } from "./api";
import { isPro } from "./pro";

/**
 * Outils de navigation partagés : pages d'un bien (`/dashboard/:id…`),
 * filtre « par bien » des listes (`?bien=<id>`), compteurs des rubriques.
 */

// Segments STATIQUES sous /dashboard : jamais un identifiant de bien.
const DASHBOARD_STATIC = new Set([
  "admin",
  "bien",
  "inquiries",
  "loyers",
  "mandats",
  "messages",
  "new",
  "sejours",
  "tickets",
  "visites",
]);

export type PropertySub = "" | "edit" | "documents" | "lease" | "sejour";

/** `/dashboard/<id>[/edit|documents|lease|sejour]` → { id, sub } ; sinon null. */
export function matchPropertyPath(pathname: string | null | undefined): { id: string; sub: PropertySub } | null {
  const m = /^\/dashboard\/([^/]+)(?:\/(edit|documents|lease|sejour))?\/?$/.exec(pathname ?? "");
  if (!m || DASHBOARD_STATIC.has(m[1]!)) return null;
  return { id: decodeURIComponent(m[1]!), sub: (m[2] ?? "") as PropertySub };
}

// ── Bien : cache court partagé (fil d'Ariane, onglets, puce de filtre) ──
const propertyCache = new Map<string, { at: number; data: Promise<Property> }>();

export function loadProperty(id: string, force = false): Promise<Property> {
  const hit = propertyCache.get(id);
  if (!force && hit && Date.now() - hit.at < 30_000) return hit.data;
  const data = api.getProperty(id);
  propertyCache.set(id, { at: Date.now(), data });
  data.catch(() => propertyCache.delete(id));
  return data;
}

/** À appeler après une modification du bien (titre, type…). */
export function invalidateProperty(id?: string) {
  if (id) propertyCache.delete(id);
  else propertyCache.clear();
}

/** Bien (cache partagé) ; `failed` : introuvable / inaccessible. */
export function useCachedProperty(id: string | null | undefined): { data: Property | null; failed: boolean } {
  const [state, setState] = React.useState<{ id: string; data: Property | null; failed: boolean } | null>(null);
  React.useEffect(() => {
    if (!id) return;
    let cancelled = false;
    loadProperty(id)
      .then((p) => !cancelled && setState({ id, data: p, failed: false }))
      .catch(() => !cancelled && setState({ id, data: null, failed: true }));
    return () => {
      cancelled = true;
    };
  }, [id]);
  return state && state.id === id ? { data: state.data, failed: state.failed } : { data: null, failed: false };
}

/**
 * Filtre « par bien » des listes (demandes, visites, loyers, incidents).
 * La page appelante doit être dans une frontière <Suspense> (useSearchParams).
 */
export function useBienParam(): string | null {
  const search = useSearchParams();
  const v = search?.get("bien")?.trim();
  return v ? v : null;
}

/** Ajoute / remplace des paramètres d'une adresse (null = retirer). */
export function withParams(path: string, current: URLSearchParams | null, set: Record<string, string | null>): string {
  const p = new URLSearchParams(current?.toString() ?? "");
  for (const [k, v] of Object.entries(set)) {
    if (v == null || v === "") p.delete(k);
    else p.set(k, v);
  }
  const qs = p.toString();
  return qs ? `${path}?${qs}` : path;
}

// ── Compteurs des rubriques (pastilles) ──────────────────────────────────
// null = inconnu (erreur ou pas encore chargé) : aucune pastille.
export type NavCounts = {
  inquiries: number | null;
  visits: number | null;
  rents: number | null;
  tickets: number | null;
  stays: number | null;
  mandates: number | null;
};

const EMPTY: NavCounts = { inquiries: null, visits: null, rents: null, tickets: null, stays: null, mandates: null };

let counts: NavCounts = EMPTY;
let countsUser: string | null = null;
let inflight: Promise<void> | null = null;
let lastAt = 0;
const listeners = new Set<() => void>();

function emit(next: NavCounts) {
  counts = next;
  listeners.forEach((l) => l());
}

const settledLen = <T,>(r: PromiseSettledResult<T[]>, keep: (x: T) => boolean): number | null =>
  r.status === "fulfilled" ? r.value.filter(keep).length : null;

/** Recharge les compteurs (erreurs silencieuses). */
export function refreshNavCounts(user: Pick<User, "id" | "role"> | null | undefined): Promise<void> {
  if (!user) return Promise.resolve();
  if (countsUser !== user.id) {
    countsUser = user.id;
    emit(EMPTY);
    inflight = null;
  }
  if (inflight) return inflight;
  const pro = isPro(user);
  const uid = user.id;
  inflight = Promise.allSettled([
    api.inquiriesReceived(),
    // Seulement ce qui est à traiter (filtre côté API) : réponses légères.
    api.ownerVisits("REQUESTED"),
    api.ownerRents("DECLARED"),
    api.ownerTickets(),
    api.stayBookings({ status: "REQUESTED" }),
    pro ? Promise.resolve([]) : api.listMandates({ status: "PENDING_OWNER" }),
    pro ? Promise.resolve([]) : api.mandateRequests(),
  ])
    .then(([inq, vis, rents, tick, stays, mand, reqs]) => {
      if (countsUser !== uid) return;
      const mandates =
        pro || mand.status !== "fulfilled"
          ? null
          : mand.value.length + (reqs.status === "fulfilled" ? reqs.value.filter((r) => r.status === "PENDING").length : 0);
      emit({
        inquiries: settledLen(inq, (i) => i.status === "PENDING"),
        visits: settledLen(vis, (v) => v.status === "REQUESTED"),
        rents: settledLen(rents, (r) => r.status === "DECLARED"),
        tickets: settledLen(tick, (t) => t.status !== "RESOLVED"),
        stays: settledLen(stays, (b) => b.status === "REQUESTED"),
        mandates,
      });
      lastAt = Date.now();
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Compteurs courants (abonnement au magasin, sans requête). */
export function useNavCounts(): NavCounts {
  return React.useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => counts,
    () => EMPTY,
  );
}

/**
 * Sondage léger des compteurs : au montage, puis toutes les 60 s quand
 * l'onglet est visible (et au retour sur l'onglet). Un seul appelant (la barre).
 */
export function useNavCountsPolling(user: Pick<User, "id" | "role"> | null | undefined, enabled: boolean) {
  React.useEffect(() => {
    if (!user || !enabled) return;
    void refreshNavCounts(user);
    const tick = () => {
      if (document.visibilityState === "visible" && Date.now() - lastAt > 55_000) void refreshNavCounts(user);
    };
    const id = setInterval(tick, 60_000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [user?.id, user?.role, enabled]); // eslint-disable-line react-hooks/exhaustive-deps
}

/** Somme des compteurs connus (null si aucun n'est connu). */
export function sumCounts(...xs: (number | null)[]): number | undefined {
  const known = xs.filter((x): x is number => x != null);
  return known.length ? known.reduce((a, b) => a + b, 0) : undefined;
}

/**
 * Conversation existante avec une personne au sujet d'un bien (visite,
 * incident) → lien « Discuter ». Liste chargée une fois ; erreurs silencieuses.
 */
export function useChatFinder() {
  const [list, setList] = React.useState<Awaited<ReturnType<typeof api.listConversations>> | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    api
      .listConversations()
      .then((l) => !cancelled && setList(l))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);
  return React.useCallback(
    (propertyId: string | null | undefined, userId: string | null | undefined): string | null => {
      if (!list || !propertyId || !userId) return null;
      const c = list.find((x) => x.propertyId === propertyId && x.otherUserId === userId);
      return c ? `/dashboard/messages?c=${encodeURIComponent(c.id)}` : null;
    },
    [list],
  );
}
