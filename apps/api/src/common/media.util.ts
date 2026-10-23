/**
 * Médias publics (photos de biens, avatars) servis par URL.
 *
 * Les fichiers restent stockés en data-URL en base, mais ne sont plus
 * renvoyés dans le JSON : chaque réponse porte une URL absolue
 * `<PUBLIC_API_URL>/media/<id>` servie en binaire avec un cache long
 * (l'identifiant change quand l'image change). Les documents privés ne
 * passent JAMAIS par ici.
 */

export function publicApiUrl(): string {
  return (process.env.PUBLIC_API_URL || "http://localhost:4005/api").replace(/\/+$/, "");
}

export function mediaUrl(mediaId: string): string {
  return `${publicApiUrl()}/media/${encodeURIComponent(mediaId)}`;
}

export function avatarUrlFromKey(key: string | null | undefined): string | null {
  return key ? `${publicApiUrl()}/media/avatar/${encodeURIComponent(key)}` : null;
}

/** Logo public d'une agence : /api/media/agency/<clé>, null sans logo. */
export function agencyLogoUrl(key: string | null | undefined): string | null {
  return key ? `${publicApiUrl()}/media/agency/${encodeURIComponent(key)}` : null;
}

/**
 * Si `url` désigne un média déjà servi par l'API (`…/api/media/<id>`),
 * renvoie cet id ; sinon null. L'hôte n'est pas imposé (local, préproduction,
 * production partagent la même base de code) : seul l'id compte, et il est
 * ensuite vérifié en base comme appartenant au bon bien.
 */
export function mediaIdFromUrl(url: string): string | null {
  if (typeof url !== "string") return null;
  const m = /^https?:\/\/[^/\s]+(?:\/[^\s?#]*)?\/media\/([A-Za-z0-9_-]{8,64})(?:[?#].*)?$/.exec(url.trim());
  if (!m || /\/media\/(avatar|agency)\//.test(url)) return null;
  return m[1] ?? null;
}

/** Sélection Prisma d'un média SANS son contenu (le binaire part par URL). */
export const MEDIA_SELECT = { id: true, alt: true, position: true } as const;

export function withMediaUrl<T extends { id: string }>(m: T): T & { url: string } {
  return { ...m, url: mediaUrl(m.id) };
}

/** Sélection publique d'un utilisateur (jamais e-mail ni téléphone). */
export const USER_PUBLIC_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  avatarKey: true,
} as const;
