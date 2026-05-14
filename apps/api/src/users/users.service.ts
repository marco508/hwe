import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IdentityDocumentType } from "@prisma/client";

const USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  avatarUrl: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      avatarUrl?: string;
    },
  ) {
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
      fileSize?: number;
      mimeType?: string;
      notes?: string;
    },
  ) {
    return this.prisma.userDocument.create({
      data: { ...data, userId },
    });
  }

  async updateDocument(
    userId: string,
    docId: string,
    data: { name?: string; notes?: string },
  ) {
    const doc = await this.prisma.userDocument.findUnique({ where: { id: docId } });
    if (!doc) throw new NotFoundException();
    if (doc.userId !== userId) throw new ForbiddenException();
    return this.prisma.userDocument.update({ where: { id: docId }, data });
  }

  async deleteDocument(userId: string, docId: string) {
    const doc = await this.prisma.userDocument.findUnique({ where: { id: docId } });
    if (!doc) throw new NotFoundException();
    if (doc.userId !== userId) throw new ForbiddenException();
    await this.prisma.userDocument.delete({ where: { id: docId } });
    return { ok: true };
  }
}

