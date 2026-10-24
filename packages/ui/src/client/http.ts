import { API_URL } from "./config";
import { ApiError, isSubscriptionError, parseErrorBody } from "./errors";
import { getUiLang } from "../components/I18nKit";

/**
 * Cœur HTTP partagé par owner-web et tenant-web (Q1).
 *
 * - 401 sur un appel authentifié (et seulement 401) → jeton effacé, événement
 *   `hwe:unauthorized`, redirection vers /login?next=<chemin courant> (A2).
 * - 403 EMAIL_NOT_VERIFIED → événement `hwe:email-not-verified` (encart de
 *   vérification) ; la session est conservée.
 * - 402 SUBSCRIPTION_SUSPENDED / PLAN_LIMIT_* → événement
 *   `hwe:subscription-blocked` (fenêtre avec lien vers l'abonnement).
 * - réseau / 429 / 5xx → ApiError « réessayable », la session est conservée (A1).
 */

const TOKEN_KEY = "hwe.token";

export const tokenStore = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(t: string) {
    try {
      window.localStorage.setItem(TOKEN_KEY, t);
    } catch {
      /* stockage indisponible : session limitée à l'onglet */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* rien */
    }
  },
};

export const AUTH_EVENTS = {
  unauthorized: "hwe:unauthorized",
  emailNotVerified: "hwe:email-not-verified",
  subscriptionBlocked: "hwe:subscription-blocked",
} as const;

function emit(name: string, detail?: unknown) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

/** N'accepte qu'un chemin relatif interne (« /… » mais pas « //… ») : pas d'open redirect (A3). */
export function safeNext(raw: string | null | undefined, fallback = "/"): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  if (/^\/(login|register)(\/|\?|$)/.test(raw)) return fallback;
  return raw;
}

/** URL de la page de connexion qui ramène ensuite à la page courante. */
export function loginHref(next?: string): string {
  const here =
    next ??
    (typeof window !== "undefined" ? window.location.pathname + window.location.search : "/");
  const safe = safeNext(here, "");
  return safe ? `/login?next=${encodeURIComponent(safe)}` : "/login";
}

let redirecting = false;

function handleUnauthorized() {
  tokenStore.clear();
  emit(AUTH_EVENTS.unauthorized);
  if (typeof window === "undefined" || redirecting) return;
  const path = window.location.pathname;
  if (path.startsWith("/login") || path.startsWith("/register")) return;
  redirecting = true;
  window.location.assign(loginHref());
}

export interface RequestOptions extends RequestInit {
  /** Joindre le jeton (Bearer). */
  auth?: boolean;
  /** Joindre le jeton s'il existe, sans déconnecter sur 401 (pages publiques). */
  optionalAuth?: boolean;
}

/** Appel brut : renvoie la Response (OK) ou lève une ApiError normalisée. */
export async function rawRequest(path: string, opts: RequestOptions = {}): Promise<Response> {
  const { auth = false, optionalAuth = false, ...init } = opts;
  const headers = new Headers(init.headers);
  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const token = auth || optionalAuth ? tokenStore.get() : null;
  if (token) headers.set("Authorization", `Bearer ${token}`);
  // Langue de l'interface : l'API rédige ses messages et libellés dans cette
  // langue (en-tête « simple » au sens CORS : aucune requête préalable).
  if (!headers.has("Accept-Language")) headers.set("Accept-Language", getUiLang());

  // Délai maximal : un serveur injoignable dont la connexion « pend » (DNS,
  // réseau mobile) doit aboutir à une erreur réessayable, jamais à un écran
  // de chargement infini. Les envois de fichiers ont un délai plus long.
  const outer = init.signal ?? null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), init.body !== undefined ? 60_000 : 12_000);
  if (outer) {
    if (outer.aborted) ctrl.abort();
    else outer.addEventListener("abort", () => ctrl.abort(), { once: true });
  }
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api${path}`, { ...init, headers, signal: ctrl.signal });
  } catch (e) {
    // Annulation demandée par l'appelant : on la propage telle quelle.
    if (outer?.aborted && (e as Error)?.name === "AbortError") throw e;
    throw new ApiError(0, []);
  } finally {
    clearTimeout(timer);
  }
  if (res.ok) return res;

  let raw = "";
  try {
    raw = await res.text();
  } catch {
    /* corps illisible */
  }
  const err = parseErrorBody(res.status, raw);
  // Page publique avec jeton expiré : on réessaie en anonyme, sans déconnecter.
  if (res.status === 401 && optionalAuth && !auth && token) {
    return rawRequest(path, { ...init });
  }
  if (res.status === 401 && auth && token) handleUnauthorized();
  if (err.isEmailNotVerified) emit(AUTH_EVENTS.emailNotVerified);
  if (isSubscriptionError(err)) emit(AUTH_EVENTS.subscriptionBlocked, { code: err.code, messages: err.messages });
  throw err;
}

/** Appel JSON typé. 204 → undefined. */
export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const res = await rawRequest(path, opts);
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

/** Corps JSON pour POST/PUT/PATCH. */
export function json(body: unknown): string {
  return JSON.stringify(body);
}

/** Construit une query string en ignorant les valeurs vides. */
export function qs(params: Record<string, unknown>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") p.set(k, String(v));
  }
  const s = p.toString();
  return s ? `?${s}` : "";
}
