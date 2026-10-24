import { getUiLang, tUi, UI_DICT } from "../components/I18nKit";

/**
 * Erreur normalisée renvoyée par `request()`.
 * Corps API attendu : { statusCode, message: string | string[], code? }.
 * `status = 0` = erreur réseau (API injoignable, CORS, coupure).
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly messages: string[];

  constructor(status: number, messages: string[], code?: string) {
    super(messages[0] ?? `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.messages = messages;
  }

  /** Erreur temporaire : réseau, 429, 5xx → on peut réessayer, la session est conservée. */
  get retryable(): boolean {
    return this.status === 0 || this.status === 408 || this.status === 429 || this.status >= 500;
  }

  get isEmailNotVerified(): boolean {
    return this.status === 403 && this.code === "EMAIL_NOT_VERIFIED";
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}

/** Codes « abonnement » de l'API (HTTP 402) : lecture seule ou limite de l'offre. */
export const SUBSCRIPTION_ERROR_CODES = new Set(["SUBSCRIPTION_SUSPENDED", "PLAN_LIMIT_AGENTS", "PLAN_LIMIT_MANDATES"]);

/** Refus lié à l'abonnement de l'agence (message clair + lien vers l'abonnement). */
export function isSubscriptionError(e: unknown): e is ApiError {
  return isApiError(e) && !!e.code && SUBSCRIPTION_ERROR_CODES.has(e.code);
}

/**
 * Fenêtre « abonnement » montée (espace pro) : les erreurs d'abonnement y
 * sont affichées, avec un lien vers la page abonnement, plutôt qu'en toast.
 */
let subscriptionDialogs = 0;
export function registerSubscriptionDialog(): () => void {
  subscriptionDialogs += 1;
  return () => {
    subscriptionDialogs = Math.max(0, subscriptionDialogs - 1);
  };
}
export const subscriptionDialogMounted = () => subscriptionDialogs > 0;

/** Parse un corps d'erreur JSON (ou texte) sans jamais lever. */
export function parseErrorBody(status: number, raw: string): ApiError {
  let messages: string[] = [];
  let code: string | undefined;
  try {
    const body = JSON.parse(raw) as { message?: unknown; code?: unknown; error?: unknown };
    if (Array.isArray(body.message)) messages = body.message.map(String);
    else if (typeof body.message === "string") messages = [body.message];
    else if (typeof body.error === "string") messages = [body.error];
    if (typeof body.code === "string") code = body.code;
  } catch {
    // Corps non JSON (proxy, page HTML d'erreur…) : on ne l'affiche jamais tel quel.
  }
  return new ApiError(status, messages.filter(Boolean), code);
}

/**
 * Texte lisible (FR/EN) à afficher pour une erreur quelconque.
 * - réseau / 429 / 5xx / 413 / 401 / e-mail non vérifié : message générique traduit ;
 * - 400 / 403 / 404 / 409 : message de l'API (déjà rédigé pour l'utilisateur).
 */
export function errorText(e: unknown, fallbackKey = "ui.err.generic"): string {
  if (isApiError(e)) {
    if (e.isEmailNotVerified) return tUi("ui.err.emailNotVerified");
    if (e.status === 0) return tUi("ui.err.network");
    if (e.status === 401) return tUi("ui.err.session");
    if (e.status === 413 || e.code === "PAYLOAD_TOO_LARGE") return tUi("ui.err.tooLarge");
    if (e.status === 429 || e.code === "TOO_MANY_REQUESTS") return tUi("ui.err.rateLimit");
    if (e.status >= 500) return tUi("ui.err.server");
    // Codes du module Professionnels : texte traduit (en français, le message
    // de l'API, souvent plus précis, reste prioritaire).
    const proKey = e.code ? `ui.pro.err.${e.code}` : "";
    if (proKey && UI_DICT.fr[proKey]) {
      if (getUiLang() === "fr" && e.messages.length > 0) return e.messages.join(" · ");
      return tUi(proKey);
    }
    if (e.messages.length > 0) return e.messages.join(" · ");
    if (e.status === 404) return tUi("ui.err.notFound");
    if (e.status === 403) return tUi("ui.err.forbidden");
    return tUi(fallbackKey);
  }
  if (e instanceof Error && e.message && !/^\d{3}\b/.test(e.message)) return e.message;
  return tUi(fallbackKey);
}
