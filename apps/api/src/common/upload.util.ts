import { BadRequestException } from "@nestjs/common";

// Validation des fichiers envoyés en data-URL (photos, justificatifs, pièces).
// Sans elle, n'importe quel contenu de n'importe quelle taille (jusqu'à la
// limite body de 50 Mo) atterrissait tel quel dans PostgreSQL.

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

// 8 Mo de binaire ≈ 10,7 Mo en base64.
const MAX_DATA_URL_LENGTH = 11 * 1024 * 1024;

export function assertValidDataUrl(value: string | null | undefined, label = "fichier"): void {
  if (value == null || value === "") return;
  const m = /^data:([a-z0-9.+/-]+);base64,/i.exec(value);
  if (!m) {
    throw new BadRequestException(`Le ${label} doit être une image (JPEG/PNG/WebP) ou un PDF.`);
  }
  const mime = (m[1] ?? "").toLowerCase();
  if (!ALLOWED_MIME.has(mime)) {
    throw new BadRequestException(`Type de ${label} non accepté (${mime}) — JPEG, PNG, WebP ou PDF uniquement.`);
  }
  if (value.length > MAX_DATA_URL_LENGTH) {
    throw new BadRequestException(`Le ${label} dépasse 8 Mo — compressez-le avant l'envoi.`);
  }
}
