import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AccessAction, PropertyAccessService } from "../common/property-access";
import { CreateDocumentDto, UpdateDocumentDto } from "./dto/create-document.dto";
import { assertDataUrl } from "../common/upload.util";
import { persistPrivateFile } from "../common/file-store";

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: PropertyAccessService,
  ) {}

  /** Lecture : propriétaire ou pro autorisé (READ) ; écriture : EDIT_LISTING. */
  private async assertOwner(propertyId: string, userId: string, action: AccessAction = "EDIT_LISTING") {
    await this.access.assert(propertyId, userId, action);
  }

  async list(propertyId: string, ownerId: string) {
    await this.assertOwner(propertyId, ownerId, "READ");
    return this.prisma.propertyDocument.findMany({
      where: { propertyId },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(propertyId: string, ownerId: string, dto: CreateDocumentDto) {
    await this.assertOwner(propertyId, ownerId);
    const file = assertDataUrl(dto.fileUrl, "document");
    const fileUrl = (await persistPrivateFile(dto.fileUrl))!;
    return this.prisma.propertyDocument.create({
      data: {
        propertyId,
        name: dto.name,
        documentType: dto.documentType,
        fileUrl,
        fileSize: file.size,
        mimeType: file.mime,
        notes: dto.notes ?? null,
      },
    });
  }

  async update(
    propertyId: string,
    docId: string,
    ownerId: string,
    dto: UpdateDocumentDto,
  ) {
    await this.assertOwner(propertyId, ownerId);
    const doc = await this.prisma.propertyDocument.findUnique({
      where: { id: docId },
    });
    if (!doc || doc.propertyId !== propertyId) throw new NotFoundException("Document introuvable");
    // Champs explicites : impossible de déplacer le document vers un autre bien.
    const file = dto.fileUrl !== undefined ? assertDataUrl(dto.fileUrl, "document") : null;
    const fileUrl = file ? await persistPrivateFile(dto.fileUrl) : null;
    return this.prisma.propertyDocument.update({
      where: { id: docId },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.documentType !== undefined ? { documentType: dto.documentType } : {}),
        ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
        ...(file && fileUrl ? { fileUrl, fileSize: file.size, mimeType: file.mime } : {}),
      },
    });
  }

  async remove(propertyId: string, docId: string, ownerId: string) {
    await this.assertOwner(propertyId, ownerId);
    const doc = await this.prisma.propertyDocument.findUnique({
      where: { id: docId },
    });
    if (!doc || doc.propertyId !== propertyId) throw new NotFoundException("Document introuvable");
    await this.prisma.propertyDocument.delete({ where: { id: docId } });
    return { ok: true };
  }
}
