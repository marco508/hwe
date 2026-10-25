/**
 * Fichiers hors de la base : copie des photos existantes vers le volume,
 * purge EXPLICITE des octets en base, vérification, ménage des orphelins.
 *
 * Ordre sûr :
 *  1. copie (au démarrage, en tâche de fond, idempotente, par lots) : les
 *     photos/avatars/logos en data-URL sont écrits sur le volume, relus et
 *     vérifiés (SHA-256), puis la colonne de référence est renseignée. Les
 *     octets RESTENT en base : la lecture se fait sur le volume, avec repli
 *     base si le fichier manque.
 *  2. purge (commande manuelle `node dist/apps/api/src/media/media-files-cli.js
 *     purge --apply`, après sauvegarde du volume ET de la base) : pour chaque
 *     colonne binaire (publique ou privée), fichier écrit/vérifié puis
 *     data-URL remplacée par la référence, ligne par ligne, seulement si la
 *     valeur n'a pas changé entre-temps (md5).
 *  3. vérification (`verify`) : chaque référence en base → fichier présent,
 *     taille et empreinte exactes.
 *  4. ménage (`gc --apply`, et chaque nuit) : fichiers non référencés depuis
 *     plus de 24 h supprimés (documents effacés : plus de copie résiduelle).
 *
 * Les noms de tables/colonnes viennent exclusivement de BINARY_COLUMNS
 * (constante du code), jamais d'une entrée utilisateur.
 */
import { promises as fsp } from "fs";
import * as path from "path";
import { Logger } from "@nestjs/common";
import { parseDataUrl } from "../common/upload.util";
import {
  BINARY_COLUMNS,
  type BinaryColumn,
  type FileRef,
  fileStoreConfig,
  filePath,
  makeFileRef,
  parseFileRef,
  storeBytes,
  verifyStored,
} from "../common/file-store";

export interface RawDb {
  $queryRawUnsafe<T = unknown>(query: string, ...values: unknown[]): Promise<T>;
  $executeRawUnsafe(query: string, ...values: unknown[]): Promise<number>;
}

const log = new Logger("MediaFiles");
const q = (id: string) => `"${id.replace(/"/g, "")}"`;
const STORABLE = /^data:(image\/jpeg|image\/png|image\/webp|application\/pdf);base64,/i;

/** Écrit puis relit/vérifie le contenu d'une data-URL. null = contenu non stockable. */
async function storeVerified(dataUrl: string): Promise<FileRef | null> {
  if (!STORABLE.test(dataUrl)) return null;
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) return null;
  const ref = await storeBytes(Buffer.from(parsed.base64, "base64"), parsed.mime);
  if (ref.size !== parsed.size || !(await verifyStored(ref))) {
    throw new Error(`vérification échouée pour ${ref.sha256}`);
  }
  return ref;
}

/**
 * Lot suivant (pagination par id) : les identifiants d'abord, par l'index de
 * clé primaire SANS lire la colonne lourde (un filtre LIKE sur la data-URL
 * obligeait PostgreSQL à décompresser toutes les lignes à chaque lot), puis
 * les valeurs de ces seules lignes.
 */
async function batchRows<T extends { id: string }>(
  db: RawDb,
  c: BinaryColumn,
  where: string,
  cols: string,
  after: string,
  batch: number,
): Promise<T[]> {
  const ids = await db.$queryRawUnsafe<Array<{ id: string }>>(
    `SELECT "id" FROM ${q(c.table)} WHERE "id" > $1 AND ${where} ORDER BY "id" LIMIT ${batch}`,
    after,
  );
  if (ids.length === 0) return [];
  const rows = await db.$queryRawUnsafe<T[]>(
    `SELECT "id", ${cols} FROM ${q(c.table)} WHERE "id" = ANY($1::text[]) ORDER BY "id"`,
    ids.map((r) => r.id),
  );
  // Ligne supprimée entre-temps : on avance quand même le curseur.
  const last = ids[ids.length - 1]!.id;
  if (!rows.length || rows[rows.length - 1]!.id !== last) rows.push({ id: last } as T);
  return rows;
}

export interface CopyStats {
  copied: number;
  skipped: number;
  failed: number;
}

/**
 * Étape 1 : copie des fichiers PUBLICS (colonnes avec keyColumn) sans
 * référence. Idempotente ; `pauseMs` entre les lots pour ne pas monopoliser
 * l'API au démarrage.
 */
export async function copyPublicToFiles(db: RawDb, opts: { batch?: number; pauseMs?: number } = {}): Promise<Record<string, CopyStats>> {
  const batch = opts.batch ?? 20;
  const out: Record<string, CopyStats> = {};
  if (!fileStoreConfig().dir) return out;
  for (const c of BINARY_COLUMNS.filter((x) => x.keyColumn)) {
    const st: CopyStats = { copied: 0, skipped: 0, failed: 0 };
    out[`${c.table}.${c.column}`] = st;
    let after = "";
    for (;;) {
      const guard = c.guardColumn ? `, ${q(c.guardColumn)} AS guard` : "";
      const rows = await batchRows<{ id: string; v: string | null; guard?: string | null }>(
        db,
        c,
        `${q(c.keyColumn!)} IS NULL AND ${q(c.column)} IS NOT NULL`,
        `${q(c.column)} AS v${guard}`,
        after,
        batch,
      );
      if (rows.length === 0) break;
      for (const r of rows) {
        after = r.id;
        if (typeof r.v !== "string" || !r.v.startsWith("data:")) continue;
        try {
          const ref = await storeVerified(r.v);
          if (!ref) {
            st.skipped++;
            continue;
          }
          const n = await db.$executeRawUnsafe(
            `UPDATE ${q(c.table)} SET ${q(c.keyColumn!)} = $1
              WHERE "id" = $2 AND ${q(c.keyColumn!)} IS NULL AND md5(${q(c.column)}) = md5($3)` +
              (c.guardColumn ? ` AND ${q(c.guardColumn)} IS NOT DISTINCT FROM $4` : ""),
            makeFileRef(ref),
            r.id,
            r.v,
            ...(c.guardColumn ? [r.guard ?? null] : []),
          );
          if (n === 1) st.copied++;
          else st.skipped++;
        } catch (e) {
          st.failed++;
          log.error(`${c.table}.${c.column} ${r.id} : ${(e as Error).message}`);
        }
      }
      if (opts.pauseMs) await new Promise((res) => setTimeout(res, opts.pauseMs));
    }
  }
  return out;
}

export interface PurgeStats {
  rows: number;
  bytes: number;
  purged: number;
  notStorable: number;
  changed: number;
  failed: number;
}

/**
 * Étape 2 (manuelle) : remplace les data-URL par des références, après
 * écriture ET vérification du fichier. `apply=false` : simulation (fichiers
 * écrits/vérifiés quand même — sans effet sur la base).
 */
export async function purgeDbBytes(db: RawDb, opts: { apply: boolean; batch?: number }): Promise<Record<string, PurgeStats>> {
  if (!fileStoreConfig().dir) throw new Error("MEDIA_DIR non configuré ou inutilisable : purge impossible.");
  const batch = opts.batch ?? 20;
  const out: Record<string, PurgeStats> = {};
  for (const c of BINARY_COLUMNS) {
    const st: PurgeStats = { rows: 0, bytes: 0, purged: 0, notStorable: 0, changed: 0, failed: 0 };
    out[`${c.table}.${c.column}`] = st;
    let after = "";
    for (;;) {
      const rows = await batchRows<{ id: string; v: string | null }>(db, c, `${q(c.column)} IS NOT NULL`, `${q(c.column)} AS v`, after, batch);
      if (rows.length === 0) break;
      for (const r of rows) {
        after = r.id;
        if (typeof r.v !== "string" || !r.v.startsWith("data:")) continue;
        st.rows++;
        st.bytes += r.v.length;
        try {
          const ref = await storeVerified(r.v);
          if (!ref) {
            st.notStorable++;
            continue;
          }
          if (!opts.apply) continue;
          const key = makeFileRef(ref);
          const n = await db.$executeRawUnsafe(
            `UPDATE ${q(c.table)} SET ${q(c.column)} = $1${c.keyColumn ? `, ${q(c.keyColumn)} = $1` : ""}
              WHERE "id" = $2 AND md5(${q(c.column)}) = md5($3)`,
            key,
            r.id,
            r.v,
          );
          if (n === 1) st.purged++;
          else st.changed++;
        } catch (e) {
          st.failed++;
          log.error(`${c.table}.${c.column} ${r.id} : ${(e as Error).message}`);
        }
      }
    }
  }
  return out;
}

export interface VerifyStats {
  refs: number;
  ok: number;
  missing: number;
  dataUrlsInDb: number;
}

/** Étape 3 : toute référence en base désigne un fichier présent et intact. */
export async function verifyFiles(db: RawDb, opts: { deep?: boolean } = {}): Promise<{ stats: Record<string, VerifyStats>; missing: string[] }> {
  if (!fileStoreConfig().dir) throw new Error("MEDIA_DIR non configuré ou inutilisable.");
  const stats: Record<string, VerifyStats> = {};
  const missing: string[] = [];
  for (const c of BINARY_COLUMNS) {
    const st: VerifyStats = { refs: 0, ok: 0, missing: 0, dataUrlsInDb: 0 };
    stats[`${c.table}.${c.column}`] = st;
    const [row] = await db.$queryRawUnsafe<Array<{ n: bigint | number }>>(
      `SELECT count(*) AS n FROM ${q(c.table)} WHERE ${q(c.column)} LIKE 'data:%'`,
    );
    st.dataUrlsInDb = Number(row?.n ?? 0);
    for (const col of [c.column, c.keyColumn].filter(Boolean) as string[]) {
      const rows = await db.$queryRawUnsafe<Array<{ id: string; v: string }>>(
        `SELECT "id", ${q(col)} AS v FROM ${q(c.table)} WHERE ${q(col)} LIKE 'hwef:%'`,
      );
      for (const r of rows) {
        st.refs++;
        const ref = parseFileRef(r.v);
        let ok = false;
        if (ref) {
          if (opts.deep) ok = await verifyStored(ref);
          else {
            const p = filePath(ref.sha256);
            ok = !!p && (await fsp.stat(p).then((s) => s.size === ref.size, () => false));
          }
        }
        if (ok) st.ok++;
        else {
          st.missing++;
          missing.push(`${c.table}.${col} ${r.id} ${r.v}`);
        }
      }
    }
  }
  return { stats, missing };
}

/** Empreintes référencées par la base (toutes colonnes binaires et de référence). */
export async function referencedHashes(db: RawDb, columns: readonly BinaryColumn[] = BINARY_COLUMNS): Promise<Set<string>> {
  const set = new Set<string>();
  for (const c of columns) {
    for (const col of [c.column, c.keyColumn].filter(Boolean) as string[]) {
      const rows = await db.$queryRawUnsafe<Array<{ v: string }>>(
        `SELECT ${q(col)} AS v FROM ${q(c.table)} WHERE ${q(col)} LIKE 'hwef:%'`,
      );
      for (const r of rows) {
        const ref = parseFileRef(r.v);
        if (ref) set.add(ref.sha256);
      }
    }
  }
  return set;
}

export interface GcStats {
  files: number;
  referenced: number;
  orphans: number;
  removed: number;
  young: number;
  tmpRemoved: number;
}

/**
 * Étape 4 : supprime les fichiers que plus aucune ligne ne référence, plus
 * vieux que `graceMs` (un téléversement en cours écrit le fichier AVANT la
 * ligne ; un fichier réutilisé voit son horodatage rafraîchi). Toute erreur
 * de lecture de la base interrompt le ménage sans rien supprimer.
 */
export async function gcFiles(db: RawDb, opts: { apply: boolean; graceMs?: number; now?: number }): Promise<GcStats> {
  const dir = fileStoreConfig().dir;
  if (!dir) throw new Error("MEDIA_DIR non configuré ou inutilisable.");
  const grace = opts.graceMs ?? 24 * 3600_000;
  const cutoff = (opts.now ?? Date.now()) - grace;
  const refs = await referencedHashes(db);
  const st: GcStats = { files: 0, referenced: 0, orphans: 0, removed: 0, young: 0, tmpRemoved: 0 };
  const subdirs = (await fsp.readdir(dir, { withFileTypes: true })).filter((d) => d.isDirectory() && /^[0-9a-f]{2}$/.test(d.name));
  for (const sd of subdirs) {
    const sdir = path.join(dir, sd.name);
    for (const name of await fsp.readdir(sdir)) {
      const full = path.join(sdir, name);
      if (/\.tmp$/.test(name)) {
        const s = await fsp.stat(full).catch(() => null);
        if (s && s.mtimeMs < cutoff && opts.apply) {
          await fsp.unlink(full).catch(() => undefined);
          st.tmpRemoved++;
        }
        continue;
      }
      if (!/^[0-9a-f]{64}$/.test(name) || !name.startsWith(sd.name)) continue;
      st.files++;
      if (refs.has(name)) {
        st.referenced++;
        continue;
      }
      st.orphans++;
      // Horodatage relu juste avant la suppression (fichier réutilisé entre-temps).
      const s = await fsp.stat(full).catch(() => null);
      if (!s || s.mtimeMs >= cutoff) {
        st.young++;
        continue;
      }
      if (opts.apply) {
        await fsp.unlink(full);
        st.removed++;
      }
    }
  }
  return st;
}
