import { Controller, Get, NotFoundException, Param, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { createHash } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { IMAGE_MIME, parseDataUrl } from "../common/upload.util";

/**
 * Médias PUBLICS servis en binaire : photos de biens et avatars.
 * Les URL portent un identifiant qui change avec l'image → cache immuable
 * d'un an côté navigateur/CDN. Seules les images (JPEG/PNG/WebP) sont
 * servies : tout autre contenu historique (SVG, HTML…) répond 404.
 * Les documents privés (pièces, justificatifs, attestations) ne sont JAMAIS
 * exposés ici.
 */
@Controller("media")
export class MediaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("avatar/:key")
  async avatar(@Param("key") key: string, @Req() req: Request, @Res() res: Response) {
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(key)) throw new NotFoundException("Image introuvable.");
    const user = await this.prisma.user.findUnique({
      where: { avatarKey: key },
      select: { avatarUrl: true },
    });
    if (!user?.avatarUrl) throw new NotFoundException("Image introuvable.");
    return this.send(user.avatarUrl, `a-${key}`, req, res);
  }

  @Get("agency/:key")
  async agencyLogo(@Param("key") key: string, @Req() req: Request, @Res() res: Response) {
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(key)) throw new NotFoundException("Image introuvable.");
    const agency = await this.prisma.agency.findUnique({
      where: { logoKey: key },
      select: { logoDataUrl: true },
    });
    if (!agency?.logoDataUrl) throw new NotFoundException("Image introuvable.");
    return this.send(agency.logoDataUrl, `g-${key}`, req, res);
  }

  @Get(":id")
  async media(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(id)) throw new NotFoundException("Image introuvable.");
    const media = await this.prisma.propertyMedia.findUnique({
      where: { id },
      select: { url: true },
    });
    if (!media?.url) throw new NotFoundException("Image introuvable.");
    // Média historique saisi comme URL externe https : simple redirection.
    if (/^https:\/\//i.test(media.url)) {
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.redirect(302, media.url);
    }
    return this.send(media.url, `m-${id}`, req, res);
  }

  private send(dataUrl: string, tag: string, req: Request, res: Response) {
    const parsed = parseDataUrl(dataUrl);
    if (!parsed || !(IMAGE_MIME as readonly string[]).includes(parsed.mime)) {
      throw new NotFoundException("Image introuvable.");
    }
    const etag = `"${createHash("sha1").update(tag).update(String(parsed.size)).digest("base64url")}"`;
    res.setHeader("ETag", etag);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    if (req.headers["if-none-match"] === etag) {
      res.status(304).end();
      return;
    }
    const buf = Buffer.from(parsed.base64, "base64");
    res.setHeader("Content-Type", parsed.mime);
    res.setHeader("Content-Length", String(buf.length));
    res.status(200).end(buf);
  }
}
