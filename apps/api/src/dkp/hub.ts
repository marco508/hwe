import { dkpEnv } from "./dkp-env";

/**
 * Appels serveur à serveur vers le hub DKP (Basic client_id:secret).
 * Délais bornés : une panne du hub ne doit jamais bloquer hwe (l'appelant
 * traite l'erreur et garde son comportement habituel).
 */

export class HubError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown,
  ) {
    super(message);
  }
}

/** Fonction fetch injectable (tests). */
export type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;
let fetchImpl: FetchLike = (url, init) => fetch(url, init);
export function setHubFetch(f: FetchLike | null) {
  fetchImpl = f ?? ((url, init) => fetch(url, init));
}

function basic(): string {
  const c = dkpEnv();
  return `Basic ${Buffer.from(`${c.clientId}:${c.clientSecret}`).toString("base64")}`;
}

export async function hubRequest<T>(
  path: string,
  init: { method?: string; json?: unknown; form?: Record<string, string>; timeoutMs?: number } = {},
): Promise<T> {
  const c = dkpEnv();
  if (!c.hubUrl) throw new HubError("hub non configuré", 0);
  const headers: Record<string, string> = { authorization: basic(), accept: "application/json" };
  let body: string | undefined;
  if (init.form) {
    headers["content-type"] = "application/x-www-form-urlencoded";
    body = new URLSearchParams(init.form).toString();
  } else if (init.json !== undefined) {
    headers["content-type"] = "application/json";
    body = JSON.stringify(init.json);
  }
  let res: Response;
  try {
    res = await fetchImpl(`${c.hubUrl}${path}`, {
      method: init.method ?? (body ? "POST" : "GET"),
      headers,
      body,
      signal: AbortSignal.timeout(init.timeoutMs ?? 15_000),
    });
  } catch (e) {
    throw new HubError(`hub injoignable : ${(e as Error).message}`, 0);
  }
  const text = await res.text().catch(() => "");
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) throw new HubError(`hub ${res.status}`, res.status, data);
  return data as T;
}

export interface DkpClaims {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string | null;
  phone?: string | null;
}

/** Échange du code d'autorisation (PKCE S256). */
export function exchangeCode(code: string, redirectUri: string, verifier: string) {
  return hubRequest<{ access_token: string; user: DkpClaims }>("/hub/oauth/token", {
    form: { grant_type: "authorization_code", code, redirect_uri: redirectUri, code_verifier: verifier },
  });
}

export function hubSendEmail(mail: { to: string; subject: string; text?: string; html?: string; replyTo?: string }) {
  return hubRequest<{ ok: boolean }>("/hub/v1/email", { json: mail, timeoutMs: 20_000 });
}

export interface PaymentsConfig {
  ready: boolean;
  provider: string;
  publicKey: string | null;
  sandbox: boolean;
}

export function hubPaymentsConfig() {
  return hubRequest<PaymentsConfig>("/hub/v1/paiements/config", { timeoutMs: 8_000 });
}

export function hubVerifyPayment(transactionId: string, amount: number, reference: string) {
  return hubRequest<{ ok: boolean; status: string; amount?: number | null }>("/hub/v1/paiements/verifier", {
    json: { transactionId, amount, reference },
    timeoutMs: 25_000,
  });
}
