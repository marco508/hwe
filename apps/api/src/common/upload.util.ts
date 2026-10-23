import { BadRequestException } from "@nestjs/common";

// Validation des fichiers envoyés en data-URL (photos, justificatifs, pièces).
// Stricte : MIME en liste blanche, base64 complet et valide, taille DÉCODÉE
// bornée. Le type annoncé par le client (mimeType/fileSize) n'est jamais
// cru : on le déduit du fichier lui-même.

export const DOCUMENT_MIME = ["image/jpeg", "image/png", "image/webp", "application/pdf"] as const;
export const IMAGE_MIME = ["image/jpeg", "image/png", "image/webp"] as const;

export const MAX_DOCUMENT_BYTES = 8 * 1024 * 1024;
export const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export interface ParsedDataUrl {
  mime: string;
  base64: string;
  /** Taille décodée en octets */
  size: number;
}

const DATA_URL_RE = /^data:([a-z0-9.+/-]+);base64,/i;
const BASE64_RE = /^[A-Za-z0-9+/]*={0,2}$/;

/** Analyse une data-URL base64, sans lever ; null si la forme est invalide. */
export function parseDataUrl(value: string): ParsedDataUrl | null {
  if (typeof value !== "string") return null;
  const m = DATA_URL_RE.exec(value);
  if (!m) return null;
  const base64 = value.slice(m[0].length);
  if (base64.length === 0 || base64.length % 4 !== 0 || !BASE64_RE.test(base64)) return null;
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return {
    mime: (m[1] ?? "").toLowerCase(),
    base64,
    size: (base64.length / 4) * 3 - padding,
  };
}

function humanSize(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} Mo`;
}

/**
 * Valide une data-URL et renvoie ses caractéristiques. Lève une 400 claire
 * (en français) si le fichier est absent, mal formé, d'un type refusé ou
 * trop lourd.
 */
export function assertDataUrl(
  value: unknown,
  label = "fichier",
  opts: { allowed?: readonly string[]; maxBytes?: number } = {},
): ParsedDataUrl {
  const allowed = opts.allowed ?? DOCUMENT_MIME;
  const maxBytes = opts.maxBytes ?? MAX_DOCUMENT_BYTES;
  const kinds = allowed.includes("application/pdf")
    ? "une image (JPEG, PNG, WebP) ou un PDF"
    : "une image (JPEG, PNG ou WebP)";
  if (typeof value !== "string" || !value) {
    throw new BadRequestException(`Le ${label} est requis : téléversez ${kinds}.`);
  }
  // Contrôle de taille AVANT le décodage (évite de parcourir 25 Mo pour rien)
  if (value.length > Math.ceil((maxBytes * 4) / 3) + 128) {
    throw new BadRequestException(`Le ${label} dépasse ${humanSize(maxBytes)} — compressez-le avant l'envoi.`);
  }
  const parsed = parseDataUrl(value);
  if (!parsed) {
    throw new BadRequestException(`Le ${label} doit être ${kinds}, envoyé comme fichier.`);
  }
  if (!allowed.includes(parsed.mime)) {
    throw new BadRequestException(
      `Type de ${label} non accepté (${parsed.mime}) — ${kinds} uniquement.`,
    );
  }
  if (parsed.size > maxBytes) {
    throw new BadRequestException(`Le ${label} dépasse ${humanSize(maxBytes)} — compressez-le avant l'envoi.`);
  }
  return parsed;
}

/** Variante facultative : ne fait rien si la valeur est vide. */
export function assertValidDataUrl(
  value: string | null | undefined,
  label = "fichier",
  opts: { allowed?: readonly string[]; maxBytes?: number } = {},
): ParsedDataUrl | null {
  if (value == null || value === "") return null;
  return assertDataUrl(value, label, opts);
}
