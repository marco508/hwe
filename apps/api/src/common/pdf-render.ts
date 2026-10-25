/**
 * Rendu des PDF (quittances, relevés, factures) :
 *
 * 1. Cache mémoire LRU borné (PDF_CACHE_MB, défaut 32 Mo, 0 = désactivé).
 *    Clé = empreinte SHA-256 de TOUTES les données du document (type, langue,
 *    numéro, montants, noms…) : si une donnée change, la clé change et le
 *    document est régénéré — pas d'invalidation à oublier. La date d'édition
 *    d'un relevé n'entre dans la clé qu'au jour près (elle n'est imprimée
 *    qu'au jour près). Les contrôles d'accès restent faits à CHAQUE requête,
 *    avant l'appel (le cache ne contient que des octets déjà autorisés pour
 *    une requête précédente et n'est adressable que par leurs données).
 * 2. Requêtes identiques simultanées : une seule génération.
 * 3. Génération dans un thread dédié (PDF_WORKERS, défaut 1 ; 0 = dans le
 *    processus principal) : file d'attente, au plus PDF_WORKERS documents en
 *    parallèle, la boucle d'événements reste libre.
 */
import { createHash } from "crypto";
import { existsSync } from "fs";
import * as path from "path";
import { Worker } from "worker_threads";
import { Logger } from "@nestjs/common";
import { PDF_BUILDERS, type PdfJobs, type PdfKind } from "./pdf-builders";
import { MediaCache } from "./media-cache";

const log = new Logger("PdfRender");

/** Sérialisation stable (clés triées, dates ISO) pour la clé de cache. */
export function stableKey(value: unknown): string {
  const walk = (v: unknown): unknown => {
    if (v instanceof Date) return { $d: v.toISOString() };
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") {
      const o: Record<string, unknown> = {};
      for (const k of Object.keys(v as object).sort()) o[k] = walk((v as Record<string, unknown>)[k]);
      return o;
    }
    return v;
  };
  return JSON.stringify(walk(value));
}

export function pdfCacheKey<K extends PdfKind>(kind: K, data: PdfJobs[K]): string {
  const d = { ...(data as unknown as Record<string, unknown>) };
  // Relevé : date d'édition imprimée au jour près.
  if (d.generatedAt instanceof Date) d.generatedAt = d.generatedAt.toISOString().slice(0, 10);
  return createHash("sha256").update(kind).update("\0").update(stableKey(d)).digest("hex");
}

// ───────────────────────── Pool de threads ─────────────────────────

interface Job {
  id: number;
  kind: PdfKind;
  data: unknown;
  resolve: (b: Buffer) => void;
  reject: (e: Error) => void;
}

class PdfPool {
  private workers: Array<{ w: Worker; job: Job | null; timer: NodeJS.Timeout | null }> = [];
  private queue: Job[] = [];
  private seq = 0;

  constructor(private readonly size: number, private readonly script: string, private readonly timeoutMs = 30_000) {}

  run(kind: PdfKind, data: unknown): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.queue.push({ id: ++this.seq, kind, data, resolve, reject });
      this.pump();
    });
  }

  private spawn() {
    const slot: { w: Worker; job: Job | null; timer: NodeJS.Timeout | null } = {
      w: new Worker(this.script),
      job: null,
      timer: null,
    };
    slot.w.unref();
    slot.w.on("message", (m: { id: number; buf?: Uint8Array; error?: string }) => {
      const job = slot.job;
      if (!job || job.id !== m.id) return;
      if (slot.timer) clearTimeout(slot.timer);
      slot.job = null;
      slot.timer = null;
      if (m.error || !m.buf) job.reject(new Error(m.error || "PDF vide"));
      else job.resolve(Buffer.from(m.buf.buffer, m.buf.byteOffset, m.buf.byteLength));
      this.pump();
    });
    const fail = (err: Error) => {
      if (slot.timer) clearTimeout(slot.timer);
      slot.job?.reject(err);
      slot.job = null;
      this.workers = this.workers.filter((x) => x !== slot);
      this.pump();
    };
    slot.w.on("error", (e) => {
      log.error(`thread PDF : ${e.message}`);
      fail(e);
    });
    slot.w.on("exit", (code) => {
      if (this.workers.includes(slot)) fail(new Error(`thread PDF arrêté (code ${code})`));
    });
    this.workers.push(slot);
    return slot;
  }

  private pump() {
    while (this.queue.length) {
      let slot = this.workers.find((x) => !x.job);
      if (!slot) {
        if (this.workers.length >= this.size) return;
        slot = this.spawn();
      }
      const job = this.queue.shift()!;
      slot.job = job;
      const s = slot;
      s.timer = setTimeout(() => {
        log.error(`génération PDF > ${this.timeoutMs} ms : thread relancé`);
        void s.w.terminate();
      }, this.timeoutMs);
      s.w.postMessage({ id: job.id, kind: job.kind, data: job.data });
    }
  }
}

function workerScript(): string | null {
  // Thread seulement depuis le code compilé (dist/*.js) ; en test (ts-node), dans le processus.
  if (!__filename.endsWith(".js")) return null;
  const p = path.join(__dirname, "pdf-worker.js");
  return existsSync(p) ? p : null;
}

const WORKERS = Math.max(0, Number(process.env.PDF_WORKERS ?? 1) || 0);
let pool: PdfPool | null | undefined;
function getPool(): PdfPool | null {
  if (pool === undefined) {
    const script = WORKERS > 0 ? workerScript() : null;
    pool = script ? new PdfPool(WORKERS, script) : null;
  }
  return pool;
}

// ───────────────────────── Cache ─────────────────────────

export const pdfCache = new MediaCache(
  Math.max(0, Number(process.env.PDF_CACHE_MB ?? 32)) * 1024 * 1024,
  24 * 3600_000,
  4 * 1024 * 1024,
);
const inflight = new Map<string, Promise<Buffer>>();

/** Statistiques (tests). */
export const pdfStats = { hits: 0, renders: 0 };

export async function renderPdf<K extends PdfKind>(kind: K, data: PdfJobs[K]): Promise<Buffer> {
  const key = pdfCacheKey(kind, data);
  const hit = pdfCache.get(key);
  if (hit) {
    pdfStats.hits++;
    return hit.buf;
  }
  const pending = inflight.get(key);
  if (pending) return pending;
  const p = (async () => {
    pdfStats.renders++;
    const pl = getPool();
    const buf = pl ? await pl.run(kind, data) : await PDF_BUILDERS[kind](data);
    pdfCache.set(key, { mime: "application/pdf", buf, etag: key });
    return buf;
  })();
  inflight.set(key, p);
  try {
    return await p;
  } finally {
    inflight.delete(key);
  }
}
