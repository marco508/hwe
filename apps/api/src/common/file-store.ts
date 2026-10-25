/**
 * Stockage des fichiers téléversés (photos, avatars, logos, documents privés)
 * HORS de la base, sur un volume : MEDIA_DIR (ex. /data/media).
 *
 * - Fichiers adressés par leur contenu : <MEDIA_DIR>/<2 premiers hex>/<sha256>.
 *   Le nom n'est jamais exposé : les photos publiques restent servies par
 *   /api/media/<id> (contrôle en base), les documents privés uniquement via
 *   les routes authentifiées existantes.
 * - En base, une colonne binaire peut contenir soit l'ancienne data-URL, soit
 *   une RÉFÉRENCE `hwef:<mime>:<sha256>:<taille>` (voir FILE_REF_RE).
 * - MEDIA_DB_COPY (défaut 1) : les nouveaux fichiers sont AUSSI conservés en
 *   base (data-URL) tant que la purge explicite (scripts/media-files.ts purge)
 *   n'a pas été faite → aucun fichier n'existe seulement sur le volume pendant
 *   la transition. Après purge vérifiée : MEDIA_DB_COPY=0.
 * - Sans MEDIA_DIR (ou volume non inscriptible) : comportement historique,
 *   tout reste en base.
 */
import { createHash, randomBytes } from "crypto";
import { promises as fsp, statSync, mkdirSync, writeFileSync, unlinkSync } from "fs";
import * as path from "path";
import { Logger } from "@nestjs/common";
import { parseDataUrl } from "./upload.util";

export const FILE_REF_RE = /^hwef:(image\/jpeg|image\/png|image\/webp|application\/pdf):([0-9a-f]{64}):(\d{1,10})$/;
const STORABLE_MIME = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

export interface FileRef {
  mime: string;
  sha256: string;
  size: number;
}

export function makeFileRef(r: FileRef): string {
  return `hwef:${r.mime}:${r.sha256}:${r.size}`;
}

export function parseFileRef(value: unknown): FileRef | null {
  if (typeof value !== "string" || value.length > 120) return null;
  const m = FILE_REF_RE.exec(value);
  if (!m) return null;
  return { mime: m[1]!, sha256: m[2]!, size: Number(m[3]) };
}

export function isFileRef(value: unknown): value is string {
  return parseFileRef(value) !== null;
}

const log = new Logger("FileStore");

interface StoreState {
  dir: string | null;
  dbCopy: boolean;
  checked: boolean;
}
const state: StoreState = { dir: null, dbCopy: true, checked: false };

/**
 * Lit la configuration (une fois). Le répertoire doit être inscriptible, sinon
 * le stockage fichier est désactivé (repli base, sans perte).
 */
export function fileStoreConfig(): { dir: string | null; dbCopy: boolean } {
  if (state.checked) return { dir: state.dir, dbCopy: state.dbCopy };
  state.checked = true;
  state.dbCopy = process.env.MEDIA_DB_COPY !== "0";
  const raw = (process.env.MEDIA_DIR || "").trim();
  if (!raw) return { dir: null, dbCopy: state.dbCopy };
  const dir = path.resolve(raw);
  try {
    mkdirSync(dir, { recursive: true });
    const probe = path.join(dir, `.probe-${process.pid}-${randomBytes(4).toString("hex")}`);
    writeFileSync(probe, "ok");
    unlinkSync(probe);
    state.dir = dir;
    // Volume monté ? (répertoire sur un autre périphérique que son parent)
    try {
      if (statSync(dir).dev === statSync(path.dirname(dir)).dev && process.env.MEDIA_ALLOW_NON_MOUNT !== "1") {
        log.warn(`MEDIA_DIR=${dir} n'est pas un point de montage : montez un volume, sinon les fichiers seront perdus à la recréation du conteneur.`);
      }
    } catch {
      /* indicatif seulement */
    }
    log.log(`Fichiers téléversés dans ${dir} (copie en base : ${state.dbCopy ? "oui" : "non"})`);
  } catch (e) {
    log.error(`MEDIA_DIR=${dir} inutilisable (${(e as Error).message}) : fichiers conservés en base.`);
    state.dir = null;
  }
  return { dir: state.dir, dbCopy: state.dbCopy };
}

/** Réinitialise la configuration (tests). */
export function resetFileStoreConfig(): void {
  state.checked = false;
  state.dir = null;
  state.dbCopy = true;
}

export function fileStoreEnabled(): boolean {
  return fileStoreConfig().dir !== null;
}

/** Chemin absolu d'un fichier référencé (null si le stockage est désactivé). */
export function filePath(sha256: string): string | null {
  const { dir } = fileStoreConfig();
  if (!dir || !/^[0-9a-f]{64}$/.test(sha256)) return null;
  return path.join(dir, sha256.slice(0, 2), sha256);
}

export function sha256Hex(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

/**
 * Écrit un contenu (idempotent : un fichier identique déjà présent est
 * conservé). Écriture atomique : fichier temporaire, fsync, puis rename.
 */
export async function storeBytes(buf: Buffer, mime: string): Promise<FileRef> {
  if (!STORABLE_MIME.has(mime)) throw new Error(`type non stockable : ${mime}`);
  const sha256 = sha256Hex(buf);
  const target = filePath(sha256);
  if (!target) throw new Error("stockage fichier désactivé");
  const ref = { mime, sha256, size: buf.length };
  try {
    const st = await fsp.stat(target);
    if (st.size === buf.length) {
      // Fichier réutilisé : horodatage rafraîchi (le ménage des orphelins
      // ne supprime que des fichiers anciens).
      const now = new Date();
      await fsp.utimes(target, now, now).catch(() => undefined);
      return ref;
    }
  } catch {
    /* absent : on l'écrit */
  }
  await fsp.mkdir(path.dirname(target), { recursive: true });
  const tmp = `${target}.${randomBytes(6).toString("hex")}.tmp`;
  const fh = await fsp.open(tmp, "wx", 0o640);
  try {
    await fh.writeFile(buf);
    await fh.datasync();
  } finally {
    await fh.close();
  }
  await fsp.rename(tmp, target);
  return ref;
}

/** Relit un fichier et vérifie taille + empreinte (migration / purge). */
export async function verifyStored(ref: FileRef): Promise<boolean> {
  const p = filePath(ref.sha256);
  if (!p) return false;
  try {
    const buf = await fsp.readFile(p);
    return buf.length === ref.size && sha256Hex(buf) === ref.sha256;
  } catch {
    return false;
  }
}

/** Contenu d'une référence (null si le fichier manque ou est tronqué). */
export async function readRef(ref: FileRef): Promise<Buffer | null> {
  const p = filePath(ref.sha256);
  if (!p) return null;
  try {
    const buf = await fsp.readFile(p);
    if (buf.length !== ref.size) {
      log.error(`fichier ${ref.sha256} : taille ${buf.length} ≠ ${ref.size}`);
      return null;
    }
    return buf;
  } catch (e) {
    log.error(`fichier ${ref.sha256} illisible : ${(e as Error).message}`);
    return null;
  }
}

/** Data-URL reconstituée depuis une référence (contrat JSON inchangé). */
export async function refToDataUrl(value: string): Promise<string | null> {
  const ref = parseFileRef(value);
  if (!ref) return null;
  const buf = await readRef(ref);
  return buf ? `data:${ref.mime};base64,${buf.toString("base64")}` : null;
}

/** Décode une data-URL (déjà validée par assertDataUrl) et l'écrit sur le volume. */
export async function storeDataUrl(dataUrl: string): Promise<FileRef | null> {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed || !STORABLE_MIME.has(parsed.mime)) return null;
  return storeBytes(Buffer.from(parsed.base64, "base64"), parsed.mime);
}

/**
 * Valeur à enregistrer pour un fichier PRIVÉ (document, justificatif, photo
 * d'incident, attestation) : la data-URL (stockage désactivé ou copie en base
 * demandée) ou la référence du fichier écrit sur le volume.
 */
export async function persistPrivateFile(dataUrl: string | null | undefined): Promise<string | null> {
  if (!dataUrl) return null;
  const { dir, dbCopy } = fileStoreConfig();
  if (!dir || dbCopy) return dataUrl;
  const ref = await storeDataUrl(dataUrl);
  return ref ? makeFileRef(ref) : dataUrl;
}

/**
 * Fichier PUBLIC (photo d'annonce, avatar, logo) : `value` va dans la colonne
 * historique (data-URL, ou référence si plus de copie en base), `fileKey`
 * dans la colonne de référence (lecture directe sur le volume).
 */
export async function persistPublicFile(dataUrl: string): Promise<{ value: string; fileKey: string | null }> {
  const { dir, dbCopy } = fileStoreConfig();
  if (!dir) return { value: dataUrl, fileKey: null };
  const ref = await storeDataUrl(dataUrl);
  if (!ref) return { value: dataUrl, fileKey: null };
  const key = makeFileRef(ref);
  return { value: dbCopy ? dataUrl : key, fileKey: key };
}

/**
 * Colonnes susceptibles de contenir une data-URL ou une référence de fichier.
 * Source UNIQUE pour la migration, la purge, la vérification et le ménage des
 * fichiers orphelins : toute nouvelle colonne binaire doit être ajoutée ici.
 * `keyColumn` : colonne de référence lue en priorité (fichiers publics).
 */
export interface BinaryColumn {
  table: string;
  column: string;
  keyColumn?: string;
  /** Contrainte de cohérence pour l'écriture de keyColumn (ex. clé publique inchangée). */
  guardColumn?: string;
  public: boolean;
}

export const BINARY_COLUMNS: readonly BinaryColumn[] = [
  { table: "PropertyMedia", column: "url", keyColumn: "fileKey", public: true },
  { table: "User", column: "avatarUrl", keyColumn: "avatarFileKey", guardColumn: "avatarKey", public: true },
  { table: "Agency", column: "logoDataUrl", keyColumn: "logoFileKey", guardColumn: "logoKey", public: true },
  { table: "UserDocument", column: "fileUrl", public: false },
  { table: "PropertyDocument", column: "fileUrl", public: false },
  { table: "Ticket", column: "photoDataUrl", public: false },
  { table: "RentPeriod", column: "proofDataUrl", public: false },
  { table: "InsuranceCertificate", column: "fileUrl", public: false },
];

/** Clés JSON des réponses dont une référence est remplacée par la data-URL. */
export const PRIVATE_FILE_KEYS = new Set(["fileUrl", "photoDataUrl", "proofDataUrl"]);
