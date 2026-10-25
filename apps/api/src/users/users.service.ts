import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { IdentityDocumentType } from "@prisma/client";
import {
  assertDataUrl,
  IMAGE_MIME,
  MAX_AVATAR_BYTES,
} from "../common/upload.util";
import { avatarUrlFromKey } from "../common/media.util";
import { persistPrivateFile, persistPublicFile } from "../common/file-store";

// avatarKey → avatarUrl (URL publique) par l'intercepteur de réponse : la
// data-URL de l'avatar ne part plus jamais dans le JSON.
const USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  avatarKey: true,
  role: true,
  emailVerifiedAt: true,
  locale: true,
  createdAt: true,
  updatedAt: true,
};

const MAX_USER_DOCUMENTS = 30;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });
    if (!user) throw new NotFoundException("Compte introuvable.");
    return user;
  }

  async update(
    id: string,
    dto: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      avatarUrl?: string | null;
      locale?: string;
    },
  ) {
    const data: {
      firstName?: string;
      lastName?: string;
      phone?: string | null;
      avatarUrl?: string | null;
      avatarKey?: string | null;
      avatarFileKey?: string | null;
      locale?: string;
    } = {};
    if (dto.locale !== undefined) data.locale = dto.locale;
    if (dto.firstName !== undefined) data.firstName = dto.firstName;
    if (dto.lastName !== undefined) data.lastName = dto.lastName;
    if (dto.phone !== undefined) data.phone = dto.phone || null;

    if (dto.avatarUrl === null || dto.avatarUrl === "") {
      data.avatarUrl = null;
      data.avatarKey = null;
      data.avatarFileKey = null;
    } else if (dto.avatarUrl !== undefined) {
      if (dto.avatarUrl.startsWith("data:")) {
        assertDataUrl(dto.avatarUrl, "avatar", { allowed: IMAGE_MIME, maxBytes: MAX_AVATAR_BYTES });
        const st = await persistPublicFile(dto.avatarUrl);
        data.avatarUrl = st.value;
        data.avatarFileKey = st.fileKey;
        // Nouvelle clé à chaque image : le cache HTTP immuable reste juste.
        data.avatarKey = randomBytes(16).toString("hex");
      } else {
        // URL renvoyée telle quelle par le front : seule l'URL actuelle est admise (inchangé).
        const current = await this.prisma.user.findUnique({ where: { id }, select: { avatarKey: true } });
        if (!current?.avatarKey || dto.avatarUrl !== avatarUrlFromKey(current.avatarKey)) {
          throw new BadRequestException("L'avatar doit être une image (JPEG, PNG ou WebP) envoyée comme fichier.");
        }
      }
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: USER_SELECT,
    });
  }

  // ── Identity documents ──────────────────────────────────────────────────

  async listDocuments(userId: string) {
    return this.prisma.userDocument.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async createDocument(
    userId: string,
    data: {
      name: string;
      documentType: IdentityDocumentType;
      fileUrl: string;
      notes?: string;
    },
  ) {
    const file = assertDataUrl(data.fileUrl, "document");
    const count = await this.prisma.userDocument.count({ where: { userId } });
    if (count >= MAX_USER_DOCUMENTS) {
      throw new BadRequestException(`Nombre maximum de documents atteint (${MAX_USER_DOCUMENTS}) : supprimez-en un d'abord.`);
    }
    const fileUrl = (await persistPrivateFile(data.fileUrl))!;
    return this.prisma.userDocument.create({
      data: {
        userId,
        name: data.name,
        documentType: data.documentType,
        fileUrl,
        fileSize: file.size,
        mimeType: file.mime,
        notes: data.notes ?? null,
      },
    });
  }

  async updateDocument(
    userId: string,
    docId: string,
    data: { name?: string; notes?: string },
  ) {
    const doc = await this.prisma.userDocument.findUnique({ where: { id: docId } });
    // 404 aussi pour le document d'autrui : on ne confirme pas son existence.
    if (!doc || doc.userId !== userId) throw new NotFoundException("Document introuvable.");
    return this.prisma.userDocument.update({
      where: { id: docId },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.notes !== undefined ? { notes: data.notes } : {}),
      },
    });
  }

  async deleteDocument(userId: string, docId: string) {
    const doc = await this.prisma.userDocument.findUnique({ where: { id: docId } });
    if (!doc || doc.userId !== userId) throw new NotFoundException("Document introuvable.");
    await this.prisma.userDocument.delete({ where: { id: docId } });
    return { ok: true };
  }
}
