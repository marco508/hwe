import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { Role } from "@prisma/client";
import { normalizeEmail } from "../common/email.util";
import type { DkpClaims } from "./hub";

/**
 * Compte DKP (OAuth 2, code d'autorisation + PKCE S256) — règles pures,
 * testées sans base ni réseau (test/dkp.spec.ts).
 */

export type DkpSpace = "owner" | "tenant";

/** Rôle public par défaut de l'espace d'arrivée : jamais AGENT ni ADMIN. */
export function defaultRoleFor(space: DkpSpace): Role {
  return space === "owner" ? "OWNER" : "TENANT";
}

export const b64url = (buf: Buffer) => buf.toString("base64url");

export function newPkce() {
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge, state: b64url(randomBytes(18)) };
}

// ── Cookie d'état signé (10 min, httpOnly) ──

export interface DkpState {
  /** state OAuth */
  s: string;
  /** code_verifier PKCE */
  v: string;
  sp: DkpSpace;
  /** chemin interne de retour */
  n: string;
  /** échéance (ms epoch) */
  e: number;
}

export const DKP_STATE_COOKIE = "hwe_dkp";
export const DKP_STATE_TTL_MS = 10 * 60_000;

function mac(secret: string, data: string) {
  return createHmac("sha256", `${secret}|dkp-state`).update(data).digest("base64url");
}

export function signState(st: DkpState, secret: string): string {
  const data = b64url(Buffer.from(JSON.stringify(st)));
  return `${data}.${mac(secret, data)}`;
}

export function safeEqualStr(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function readState(raw: string | null | undefined, secret: string, now = Date.now()): DkpState | null {
  if (!raw) return null;
  const i = raw.lastIndexOf(".");
  if (i <= 0) return null;
  const data = raw.slice(0, i);
  if (!safeEqualStr(raw.slice(i + 1), mac(secret, data))) return null;
  try {
    const st = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as DkpState;
    if (!st || typeof st.s !== "string" || typeof st.v !== "string" || typeof st.e !== "number") return null;
    if (st.e < now) return null;
    if (st.sp !== "owner" && st.sp !== "tenant") return null;
    return { ...st, n: safeInternalPath(st.n) };
  } catch {
    return null;
  }
}

/** Chemin interne seulement (« /… » mais pas « //… ») : pas de redirection ouverte. */
export function safeInternalPath(raw: unknown): string {
  if (typeof raw !== "string" || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return "";
  if (raw.length > 500 || /[\u0000-\u001f]/.test(raw)) return "";
  if (/^\/(login|register|auth)(\/|\?|$)/.test(raw)) return "";
  return raw;
}

export function readCookie(header: string | undefined, name: string): string | null {
  const m = String(header || "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]!);
  } catch {
    return null;
  }
}

// ── Rattachement du compte local ──

export type DkpLinkError =
  /** Un compte hwe existe avec cet e-mail, mais le hub ne l'a pas vérifié. */
  | "email_unverified"
  /** Compte d'administration : connexion par mot de passe uniquement. */
  | "admin"
  /** Ce compte hwe est déjà lié à un AUTRE compte DKP. */
  | "conflict"
  | "invalid";

export interface DkpUserRow {
  id: string;
  email: string;
  role: Role;
  dkpSub: string | null;
  emailVerifiedAt: Date | null;
  activatedAt: Date | null;
}

/** Accès base minimal (PrismaService en production, faux objet en test). */
export interface DkpUserStore {
  findBySub(sub: string): Promise<DkpUserRow | null>;
  findByEmail(email: string): Promise<DkpUserRow | null>;
  link(id: string, data: { dkpSub: string; emailVerifiedAt?: Date; activatedAt?: Date }): Promise<DkpUserRow>;
  create(data: {
    email: string;
    dkpSub: string;
    role: Role;
    firstName: string;
    lastName: string;
    phone: string | null;
    emailVerifiedAt: Date | null;
  }): Promise<DkpUserRow>;
}

export function splitName(name: string | null | undefined, email: string): { firstName: string; lastName: string } {
  const clean = String(name ?? "").replace(/\s+/g, " ").trim().slice(0, 120);
  if (!clean) return { firstName: email.split("@")[0]!.slice(0, 60) || "DKP", lastName: "" };
  const i = clean.indexOf(" ");
  return i < 0 ? { firstName: clean, lastName: "" } : { firstName: clean.slice(0, i), lastName: clean.slice(i + 1) };
}

/**
 * Règles du contrat §1.1 :
 *  1. compte déjà lié par `dkpSub` ;
 *  2. sinon, par e-mail SEULEMENT si le hub l'a vérifié → on lie ;
 *  3. sinon création d'un compte (rôle public de l'espace, e-mail vérifié si le hub l'a vérifié).
 * Jamais d'élévation : un compte ADMIN ne se connecte pas par le Compte DKP.
 */
export async function resolveDkpUser(
  store: DkpUserStore,
  claims: DkpClaims,
  space: DkpSpace,
  now = new Date(),
): Promise<{ user: DkpUserRow; created: boolean; linked: boolean } | { error: DkpLinkError }> {
  const sub = typeof claims?.sub === "string" ? claims.sub.trim() : "";
  const email = normalizeEmail(claims?.email);
  if (!sub || sub.length > 120 || !email) return { error: "invalid" };
  const verified = claims.email_verified === true;

  const bySub = await store.findBySub(sub);
  if (bySub) {
    if (bySub.role === "ADMIN") return { error: "admin" };
    return { user: bySub, created: false, linked: false };
  }

  const byEmail = await store.findByEmail(email);
  if (byEmail) {
    if (!verified) return { error: "email_unverified" };
    if (byEmail.role === "ADMIN") return { error: "admin" };
    if (byEmail.dkpSub && byEmail.dkpSub !== sub) return { error: "conflict" };
    // E-mail prouvé par le hub : vaut vérification (et active un compte invité,
    // comme « mot de passe oublié »).
    const user = await store.link(byEmail.id, {
      dkpSub: sub,
      ...(byEmail.emailVerifiedAt ? {} : { emailVerifiedAt: now }),
      ...(byEmail.activatedAt ? {} : { activatedAt: now }),
    });
    return { user, created: false, linked: true };
  }

  const { firstName, lastName } = splitName(claims.name, email);
  const phone = typeof claims.phone === "string" && claims.phone.trim() ? claims.phone.trim().slice(0, 30) : null;
  const user = await store.create({
    email,
    dkpSub: sub,
    role: defaultRoleFor(space),
    firstName,
    lastName,
    phone,
    emailVerifiedAt: verified ? now : null,
  });
  return { user, created: true, linked: true };
}
