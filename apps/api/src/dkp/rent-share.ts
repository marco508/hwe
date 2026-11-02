import { createHash, randomInt } from "node:crypto";
import { parsePartnerKeys } from "./dkp-env";
import { safeEqualStr } from "./dkp-auth";

/** Codes de partage du loyer (FamiLyfe, contrat §2.5) : règles pures. */

export const RENT_SHARE_DAYS = 30;
export const RENT_SHARE_MAX_ACTIVE = 5;
// Sans 0/O/1/I/L : lisible à voix haute et à recopier.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** « HWE-XXXX-XXXX-XXXX » : 12 caractères aléatoires (≈ 59 bits). */
export function newShareCode(): string {
  const pick = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `HWE-${pick()}-${pick()}-${pick()}`;
}

/** Forme canonique d'un code saisi (majuscules, sans espaces). */
export function normalizeShareCode(raw: unknown): string {
  return String(raw ?? "").trim().toUpperCase().replace(/\s+/g, "");
}

export function hashShareCode(code: string): string {
  return createHash("sha256").update(`hwe-rent-share|${normalizeShareCode(code)}`).digest("hex");
}

export type ShareState = "ACTIVE" | "EXPIRED" | "REVOKED";

export function shareState(row: { expiresAt: Date; revokedAt: Date | null }, now = new Date()): ShareState {
  if (row.revokedAt) return "REVOKED";
  if (row.expiresAt.getTime() <= now.getTime()) return "EXPIRED";
  return "ACTIVE";
}

/**
 * Clé partenaire : `Authorization: Bearer <clé>` + `X-DKP-Partner: <app>`,
 * comparée en temps constant à DKP_PARTNER_KEYS. Renvoie l'app reconnue ou null.
 */
export function checkPartner(
  headers: { authorization?: string | string[]; "x-dkp-partner"?: string | string[] },
  expectedApp: string,
  raw = process.env.DKP_PARTNER_KEYS,
): string | null {
  const keys = parsePartnerKeys(raw);
  const app = String(headers["x-dkp-partner"] ?? "").trim().toLowerCase();
  const auth = String(headers.authorization ?? "");
  if (app !== expectedApp || !auth.startsWith("Bearer ")) return null;
  const expected = keys.get(app);
  if (!expected) return null;
  return safeEqualStr(auth.slice(7).trim(), expected) ? app : null;
}

/** Mois « AAAA-MM » d'une date-jour. */
export function monthKey(day: Date): string {
  return `${day.getUTCFullYear()}-${String(day.getUTCMonth() + 1).padStart(2, "0")}`;
}
