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

/** Instance de l'API : MEDIA_CACHE_MB (défaut 64 Mo, 0 = désactivé), TTL 10 min. */
export const mediaCache = new MediaCache(
  Math.max(0, Number(process.env.MEDIA_CACHE_MB ?? 64)) * 1024 * 1024,
  10 * 60_000,
);
