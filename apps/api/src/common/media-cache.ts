/**
 * Cache mémoire LRU des photos d'annonces décodées, borné en octets.
 *
 * Les photos sont stockées en base sous forme de data-URL (~120 Ko de texte
 * par photo) : sans cache, chaque affichage relisait la ligne, la faisait
 * transiter par Prisma puis la décodait en base64 — c'était la première
 * consommation de CPU de l'API lors des tests de charge (12 vignettes par page
 * de catalogue). Les identifiants de média changent avec l'image (URL
 * immuables) : une entrée en cache ne peut pas devenir fausse, seulement
 * orpheline ; la durée de vie bornée (TTL) purge les médias supprimés.
 */
export interface CachedMedia {
  mime: string;
  buf: Buffer;
  etag: string;
}

export class MediaCache {
  private readonly map = new Map<string, CachedMedia & { at: number }>();
  private bytes = 0;

  constructor(
    readonly maxBytes: number,
    readonly ttlMs: number,
    /** Au-delà, l'image n'est pas mise en cache (ne pas vider le cache pour une seule). */
    readonly maxItemBytes = Math.max(1, Math.floor(maxBytes / 8)),
  ) {}

  get(key: string, now = Date.now()): CachedMedia | null {
    const e = this.map.get(key);
    if (!e) return null;
    if (now - e.at > this.ttlMs) {
      this.delete(key);
      return null;
    }
    // LRU : remise en fin d'ordre d'insertion.
    this.map.delete(key);
    this.map.set(key, e);
    return e;
  }

  set(key: string, value: CachedMedia, now = Date.now()): void {
    if (this.maxBytes <= 0 || value.buf.length > this.maxItemBytes) return;
    this.delete(key);
    this.map.set(key, { ...value, at: now });
    this.bytes += value.buf.length;
    for (const [k] of this.map) {
      if (this.bytes <= this.maxBytes) break;
      this.delete(k);
    }
  }

  delete(key: string): void {
    const e = this.map.get(key);
    if (!e) return;
    this.map.delete(key);
    this.bytes -= e.buf.length;
  }

  get size(): number {
    return this.map.size;
  }

  get usedBytes(): number {
    return this.bytes;
  }
}

/**
 * Petit cache LRU borné en NOMBRE d'entrées, avec TTL : id de photo → référence
 * du fichier sur le volume (quelques dizaines d'octets par entrée). Évite une
 * requête SQL par image servie ; invalidé comme le cache d'octets (photo
 * retirée ou bien supprimé) et purgé par le TTL.
 */
export class RefCache {
  private readonly map = new Map<string, { v: string; at: number }>();
  constructor(readonly maxEntries: number, readonly ttlMs: number) {}

  get(key: string, now = Date.now()): string | null {
    const e = this.map.get(key);
    if (!e) return null;
    if (now - e.at > this.ttlMs) {
      this.map.delete(key);
      return null;
    }
    this.map.delete(key);
    this.map.set(key, e);
    return e.v;
  }

  set(key: string, v: string, now = Date.now()): void {
    if (this.maxEntries <= 0) return;
    this.map.delete(key);
    this.map.set(key, { v, at: now });
    while (this.map.size > this.maxEntries) {
      const first = this.map.keys().next().value as string;
      this.map.delete(first);
    }
  }

  delete(key: string): void {
    this.map.delete(key);
  }

  get size(): number {
    return this.map.size;
  }
}

/**
 * Cache d'octets : ne sert plus qu'au REPLI base (photos pas encore copiées
 * sur le volume, ou MEDIA_DIR absent). Avec les fichiers, le cache de pages du
 * noyau joue ce rôle : défaut 64 Mo sans MEDIA_DIR, 16 Mo avec
 * (MEDIA_CACHE_MB, 0 = désactivé), TTL 10 min.
 */
const defaultCacheMb = (process.env.MEDIA_DIR || "").trim() ? 16 : 64;
export const mediaCache = new MediaCache(
  Math.max(0, Number(process.env.MEDIA_CACHE_MB ?? defaultCacheMb)) * 1024 * 1024,
  10 * 60_000,
);

/** id de photo → référence de fichier (50 000 entrées ≈ 8 Mo au plus). */
export const mediaRefCache = new RefCache(50_000, 10 * 60_000);

/** Retrait d'une photo : plus servie depuis les caches mémoire. */
export function forgetMedia(id: string): void {
  mediaCache.delete(`m-${id}`);
  mediaRefCache.delete(id);
}
