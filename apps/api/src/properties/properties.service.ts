import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { QueryPropertyDto } from "./dto/query-property.dto";
import { Prisma } from "@prisma/client";
import { assertEmailVerified } from "../common/email-verified.util";
import { assertValidDataUrl } from "../common/upload.util";

const ownerSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
} as const;

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(q: QueryPropertyDto) {
    const page = q.page ?? 1;
    const pageSize = Math.min(q.pageSize ?? 20, 100);

    const where: Prisma.PropertyWhereInput = {
      status: "PUBLISHED",
      ...(q.listingType ? { listingType: q.listingType } : {}),
      ...(q.propertyType ? { propertyType: q.propertyType } : {}),
      ...(q.country
        ? { country: { contains: q.country, mode: "insensitive" as const } }
        : {}),
      ...(q.city
        ? { city: { contains: q.city, mode: "insensitive" } }
        : {}),
      ...(q.minPrice !== undefined || q.maxPrice !== undefined
        ? {
            price: {
              ...(q.minPrice !== undefined ? { gte: q.minPrice } : {}),
              ...(q.maxPrice !== undefined ? { lte: q.maxPrice } : {}),
            },
          }
        : {}),
      ...(q.minSurface !== undefined || q.maxSurface !== undefined
        ? {
            surface: {
              ...(q.minSurface !== undefined ? { gte: q.minSurface } : {}),
              ...(q.maxSurface !== undefined ? { lte: q.maxSurface } : {}),
            },
          }
        : {}),
      ...(q.minRooms !== undefined ? { rooms: { gte: q.minRooms } } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: { media: { orderBy: { position: "asc" } }, owner: { select: ownerSelect }, pricingRates: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.property.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findById(id: string) {
    const p = await this.prisma.property.findUnique({
      where: { id },
      include: {
        media: { orderBy: { position: "asc" } },
        owner: { select: ownerSelect },
        pricingRates: true,
      },
    });
    if (!p) throw new NotFoundException();
    return p;
  }

  async listMine(ownerId: string) {
    return this.prisma.property.findMany({
      where: { ownerId },
      include: { media: { orderBy: { position: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(ownerId: string, dto: CreatePropertyDto) {
    await assertEmailVerified(this.prisma, ownerId);
    for (const m of dto.media ?? []) {
      if (m.url?.startsWith("data:")) assertValidDataUrl(m.url, "média");
    }
    const { media, ...rest } = dto;
    return this.prisma.property.create({
      data: {
        ...rest,
        ownerId,
        media: media?.length
          ? { create: media.map((m, i) => ({ ...m, position: m.position ?? i })) }
          : undefined,
      },
      include: { media: true, owner: { select: ownerSelect } },
    });
  }

  async update(ownerId: string, id: string, dto: UpdatePropertyDto) {
    for (const m of dto.media ?? []) {
      if (m.url?.startsWith("data:")) assertValidDataUrl(m.url, "média");
    }
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException();
    if (existing.ownerId !== ownerId)
      throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");

    const { media, ...rest } = dto;
    return this.prisma.$transaction(async (tx) => {
      if (media) {
        await tx.propertyMedia.deleteMany({ where: { propertyId: id } });
        if (media.length) {
          await tx.propertyMedia.createMany({
            data: media.map((m, i) => ({
              ...m,
              position: m.position ?? i,
              propertyId: id,
            })),
          });
        }
      }
      return tx.property.update({
        where: { id },
        data: rest,
        include: { media: true, owner: { select: ownerSelect } },
      });
    });
  }

  async remove(ownerId: string, id: string) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException();
    if (existing.ownerId !== ownerId) throw new ForbiddenException();
    await this.prisma.property.delete({ where: { id } });
    return { ok: true };
  }
}
