/**
 * Fichiers & liens sûrs (S1, S3, F11, F12).
 *
 * - Jamais de `document.write`, jamais de `<a href="data:…">` : une data-URL
 *   est convertie en Blob puis ouverte via `URL.createObjectURL` + `noopener`.
 * - `safeHref` n'accepte que https:, http: (local uniquement) et blob:.
 */

/** Types acceptés par l'API pour les documents privés. */
export const DOC_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"] as const;
export const DOC_ACCEPT = DOC_MIME_TYPES.join(",");
/** Types acceptés pour les photos (biens, avatar, ticket). */
export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const IMAGE_ACCEPT = IMAGE_MIME_TYPES.join(",");
/** Limite API des documents privés. */
export const MAX_DOC_BYTES = 8 * 1024 * 1024;
/** Limite API de l'avatar. */
export const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

const DATA_URL_RE = /^data:([a-z]+\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/i;

function isLocalHost(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host.endsWith(".localhost");
}

/** URL sûre pour un href/src, sinon null. */
export function safeHref(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  try {
    const u = new URL(trimmed, typeof window !== "undefined" ? window.location.href : "https://x.invalid");
    if (u.protocol === "https:" || u.protocol === "blob:") return u.href;
    if (u.protocol === "http:" && isLocalHost(u.hostname)) return u.href;
  } catch {
    /* URL invalide */
  }
  return null;
}

/** Vérifie strictement une data-URL (MIME autorisé + base64 complet). */
export function parseDataUrl(
  dataUrl: string,
  allowed: readonly string[] = DOC_MIME_TYPES,
): { mime: string; base64: string } | null {
  const m = DATA_URL_RE.exec(dataUrl.trim());
  if (!m) return null;
  const mime = (m[1] ?? "").toLowerCase();
  if (!allowed.includes(mime)) return null;
  return { mime, base64: m[2] ?? "" };
}

/** data-URL → Blob (décodage local, sans réseau). */
export function dataUrlToBlob(dataUrl: string, allowed: readonly string[] = DOC_MIME_TYPES): Blob | null {
  const parsed = parseDataUrl(dataUrl, allowed);
  if (!parsed) return null;
  const bin = atob(parsed.base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: parsed.mime });
}

/**
 * Ouvre un document privé (data-URL) dans un nouvel onglet, en toute sécurité.
 * Une URL https/blob est ouverte telle quelle (noopener). Renvoie false si le
 * document est invalide ou bloqué (l'appelant affiche alors un message).
 */
export function openDataUrl(url: string | null | undefined, filename = "document"): boolean {
  if (!url) return false;
  if (url.startsWith("data:")) {
    const blob = dataUrlToBlob(url);
    if (!blob) return false;
    const objectUrl = URL.createObjectURL(blob);
    // Pas de « noopener » dans les options : window.open renverrait alors
    // toujours null et le repli ci-dessous ouvrirait le document une 2e fois
    // (onglet + téléchargement). On coupe le lien opener à la main.
    const w = window.open(objectUrl, "_blank");
    if (w) {
      try {
        w.opener = null;
      } catch {
        /* rien */
      }
    } else {
      // Pop-up bloquée (ou noopener renvoie null selon le navigateur) :
      // on bascule sur un téléchargement, toujours sans data: dans un href.
      const a = document.createElement("a");
      a.href = objectUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      if (blob.type === "application/pdf" || !blob.type.startsWith("image/")) a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    return true;
  }
  const safe = safeHref(url);
  if (!safe) return false;
  window.open(safe, "_blank", "noopener,noreferrer");
  return true;
}

/** Lit un fichier en data-URL. */
export function readFileAsDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error ?? new Error("read"));
    r.readAsDataURL(file);
  });
}

/**
 * Redimensionne/compresse une image côté client (F11) : JPEG/PNG/WebP en
 * entrée, JPEG (ou WebP si transparence non nécessaire) en sortie, côté max
 * `maxSide` px. Renvoie la data-URL compressée.
 */
export async function compressImage(
  file: File,
  { maxSide = 1600, quality = 0.82, mime = "image/jpeg" }: { maxSide?: number; quality?: number; mime?: string } = {},
): Promise<string> {
  const src = await readFileAsDataUrl(file);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("decode"));
    i.src = src;
  });
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return src;
  if (mime === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(img, 0, 0, w, h);
  const out = canvas.toDataURL(mime, quality);
  // Si la compression n'apporte rien (petite image déjà optimisée), on garde l'original.
  return out.length < src.length ? out : src;
}

/** Taille approximative (octets) d'une data-URL. */
export function dataUrlBytes(dataUrl: string): number {
  const i = dataUrl.indexOf(",");
  const b64 = i >= 0 ? dataUrl.slice(i + 1) : dataUrl;
  return Math.floor((b64.length * 3) / 4);
}
