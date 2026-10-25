import { Controller, Get, NotFoundException, Param, Req, Res } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { createHash } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { IMAGE_MIME, parseDataUrl } from "../common/upload.util";
import { mediaCache, mediaRefCache, type CachedMedia } from "../common/media-cache";
import { filePath, parseFileRef, type FileRef } from "../common/file-store";

/**
 * Médias PUBLICS servis en binaire : photos de biens, avatars, logos d'agence.
 * Les URL portent un identifiant qui change avec l'image → cache immuable
 * d'un an côté navigateur/CDN. Seules les images (JPEG/PNG/WebP) sont
 * servies : tout autre contenu historique (SVG, HTML…) répond 404.
 * Les documents privés (pièces, justificatifs, attestations) ne sont JAMAIS
 * exposés ici.
 *
 * Lecture : fichier du volume (MEDIA_DIR, colonne de référence) en priorité,
 * envoyé en flux (res.sendFile) ; repli sur la data-URL en base si le
 * fichier n'est pas (encore) copié ou manque.
 */
const IMAGE_SET = new Set<string>(IMAGE_MIME);
const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

/**
 * Voie rapide (montée dans main.ts AVANT la chaîne Nest : CORS, analyse du
 * corps, langue, limiteur, intercepteurs…) : une photo dont la référence est
 * déjà en cache mémoire est envoyée directement depuis le volume. Mêmes
 * en-têtes que la route Nest ; tout autre cas (premier accès, avatar, logo,
 * requête avec Origin, fichier absent) continue vers le contrôleur.
 */
const FAST_RE = /^\/api\/media\/([A-Za-z0-9_-]{8,64})$/;
export function mediaFastPath(req: Request, res: Response, next: NextFunction) {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  if (req.headers.origin) return next();
  const m = FAST_RE.exec(req.path);
  if (!m) return next();
  const ref = parseFileRef(mediaRefCache.get(m[1]!));
  if (!ref || !IMAGE_SET.has(ref.mime)) return next();
  const p = filePath(ref.sha256);
  if (!p) return next();
  const etag = `"${ref.sha256.slice(0, 32)}"`;
  const headers: Record<string, string> = {
    "Content-Type": ref.mime,
    ETag: etag,
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Cross-Origin-Resource-Policy": "cross-origin",
  };
  if (req.headers["if-none-match"] === etag) {
    for (const [k, v] of Object.entries(headers)) if (k !== "Content-Type") res.setHeader(k, v);
    res.status(304).end();
    return;
  }
  res.sendFile(p, { etag: false, lastModified: false, cacheControl: false, acceptRanges: false, dotfiles: "deny", headers }, (err) => {
    if (!err) return;
    if (!res.headersSent) {
      mediaRefCache.delete(m[1]!);
      return next();
    }
  });
}

@Controller("media")
export class MediaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("avatar/:key")
  async avatar(@Param("key") key: string, @Req() req: Request, @Res() res: Response) {
    if (!ID_RE.test(key)) throw new NotFoundException("Image introuvable.");
    const user = await this.prisma.user.findUnique({
      where: { avatarKey: key },
      select: { avatarFileKey: true },
    });
    if (!user) throw new NotFoundException("Image introuvable.");
    const fromDb = async () =>
      (await this.prisma.user.findUnique({ where: { avatarKey: key }, select: { avatarUrl: true } }))?.avatarUrl ?? null;
    return this.serve(user.avatarFileKey, fromDb, `a-${key}`, req, res);
  }

  @Get("agency/:key")
  async agencyLogo(@Param("key") key: string, @Req() req: Request, @Res() res: Response) {
    if (!ID_RE.test(key)) throw new NotFoundException("Image introuvable.");
    const agency = await this.prisma.agency.findUnique({
      where: { logoKey: key },
      select: { logoFileKey: true },
    });
    if (!agency) throw new NotFoundException("Image introuvable.");
    const fromDb = async () =>
      (await this.prisma.agency.findUnique({ where: { logoKey: key }, select: { logoDataUrl: true } }))?.logoDataUrl ?? null;
    return this.serve(agency.logoFileKey, fromDb, `g-${key}`, req, res);
  }

  @Get(":id")
  async media(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    if (!ID_RE.test(id)) throw new NotFoundException("Image introuvable.");
    const fromDb = async () =>
      (await this.prisma.propertyMedia.findUnique({ where: { id }, select: { url: true } }))?.url ?? null;
    const cachedRef = mediaRefCache.get(id);
    if (cachedRef) return this.serve(cachedRef, fromDb, `m-${id}`, req, res);
    if (this.fromCache(`m-${id}`, req, res)) return;
    const media = await this.prisma.propertyMedia.findUnique({
      where: { id },
      select: { fileKey: true },
    });
    if (!media) throw new NotFoundException("Image introuvable.");
    if (media.fileKey && parseFileRef(media.fileKey)) mediaRefCache.set(id, media.fileKey);
    return this.serve(media.fileKey, fromDb, `m-${id}`, req, res);
  }

  /** Fichier du volume si disponible, sinon contenu de la base. */
  private async serve(
    fileKey: string | null,
    fromDb: () => Promise<string | null>,
    tag: string,
    req: Request,
    res: Response,
  ) {
    const ref = parseFileRef(fileKey);
    if (ref && IMAGE_SET.has(ref.mime)) {
      const sent = await this.sendStored(ref, req, res);
      if (sent) return;
      if (tag.startsWith("m-")) mediaRefCache.delete(tag.slice(2));
    }
    const value = await fromDb();
    if (!value) throw new NotFoundException("Image introuvable.");
    // Média historique saisi comme URL externe https : simple redirection.
    if (tag.startsWith("m-") && /^https:\/\//i.test(value)) {
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.redirect(302, value);
    }
    // Colonne purgée (référence) sans colonne de clé renseignée.
    const colRef = parseFileRef(value);
    if (colRef) {
      if (IMAGE_SET.has(colRef.mime) && (await this.sendStored(colRef, req, res))) return;
      throw new NotFoundException("Image introuvable.");
    }
    return this.send(value, tag, req, res);
  }

  private commonHeaders(res: Response, etag: string) {
    res.setHeader("ETag", etag);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }

  /** Envoi en flux depuis le volume (true = réponse envoyée). */
  private sendStored(ref: FileRef, req: Request, res: Response): Promise<boolean> {
    const p = filePath(ref.sha256);
    if (!p) return Promise.resolve(false);
    const etag = `"${ref.sha256.slice(0, 32)}"`;
    if (req.headers["if-none-match"] === etag) {
      this.commonHeaders(res, etag);
      res.status(304).end();
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      res.sendFile(
        p,
        {
          etag: false,
          lastModified: false,
          cacheControl: false,
          acceptRanges: false,
          dotfiles: "deny",
          headers: {
            "Content-Type": ref.mime,
            ETag: etag,
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Content-Type-Options": "nosniff",
            "Cross-Origin-Resource-Policy": "cross-origin",
          },
        },
        (err) => {
          if (!err) return resolve(true);
          // Fichier absent/illisible avant tout envoi : repli base.
          if (!res.headersSent) return resolve(false);
          resolve(true);
        },
      );
    });
  }

  /** Sert depuis le cache mémoire si possible (true = réponse envoyée). */
  private fromCache(tag: string, req: Request, res: Response): boolean {
    const hit = mediaCache.get(tag);
    if (!hit) return false;
    this.reply(hit, req, res);
    return true;
  }

  private send(dataUrl: string, tag: string, req: Request, res: Response) {
    const parsed = parseDataUrl(dataUrl);
    if (!parsed || !IMAGE_SET.has(parsed.mime)) {
      throw new NotFoundException("Image introuvable.");
    }
    const etag = `"${createHash("sha1").update(tag).update(String(parsed.size)).digest("base64url")}"`;
    const entry: CachedMedia = { mime: parsed.mime, buf: Buffer.from(parsed.base64, "base64"), etag };
    // Seules les photos d'annonces (volume du catalogue) passent par le cache ;
    // avatars et logos restent relus à chaque fois (retrait immédiat).
    if (tag.startsWith("m-")) mediaCache.set(tag, entry);
    this.reply(entry, req, res);
  }

  private reply(m: CachedMedia, req: Request, res: Response) {
    this.commonHeaders(res, m.etag);
    if (req.headers["if-none-match"] === m.etag) {
      res.status(304).end();
      return;
    }
    res.setHeader("Content-Type", m.mime);
    res.setHeader("Content-Length", String(m.buf.length));
    res.status(200).end(m.buf);
  }
}
