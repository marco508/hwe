import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { assertValidDataUrl } from "../common/upload.util";

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertOwner(propertyId: string, ownerId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) throw new NotFoundException("Bien introuvable");
    if (property.ownerId !== ownerId)
      throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");
    return property;
  }

  async list(propertyId: string, ownerId: string) {
    await this.assertOwner(propertyId, ownerId);
    return this.prisma.propertyDocument.findMany({
      where: { propertyId },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(propertyId: string, ownerId: string, dto: CreateDocumentDto) {
    await this.assertOwner(propertyId, ownerId);
    assertValidDataUrl(dto.fileUrl, "document");
    return this.prisma.propertyDocument.create({
      data: { ...dto, propertyId },
    });
  }

  async update(
    propertyId: string,
    docId: string,
    ownerId: string,
    dto: Partial<CreateDocumentDto>,
  ) {
    await this.assertOwner(propertyId, ownerId);
    assertValidDataUrl(dto.fileUrl, "document");
    const doc = await this.prisma.propertyDocument.findUnique({
      where: { id: docId },
    });
    if (!doc || doc.propertyId !== propertyId) throw new NotFoundException();
    return this.prisma.propertyDocument.update({
      where: { id: docId },
      data: dto,
    });
  }

  async remove(propertyId: string, docId: string, ownerId: string) {
    await this.assertOwner(propertyId, ownerId);
    const doc = await this.prisma.propertyDocument.findUnique({
      where: { id: docId },
    });
    if (!doc || doc.propertyId !== propertyId) throw new NotFoundException();
    await this.prisma.propertyDocument.delete({ where: { id: docId } });
    return { ok: true };
  }
}
