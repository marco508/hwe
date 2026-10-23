import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { MEDIA_SELECT, withMediaUrl } from "../common/media.util";
import { PUBLIC_DETAIL_STATUSES } from "../properties/properties.service";

// Première photo uniquement, par URL (jamais le contenu).
const propertyInclude = {
  media: { orderBy: { position: "asc" as const }, take: 1, select: MEDIA_SELECT },
} as const;

function shapeFav<T extends { property: { media: Array<{ id: string }> } }>(f: T): T {
  return { ...f, property: { ...f.property, media: f.property.media.map(withMediaUrl) } };
}

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    const favs = await this.prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        property: {
          include: propertyInclude,
        },
      },
    });
    return favs.map(shapeFav);
  }

  async add(userId: string, propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      select: { id: true, status: true, ownerId: true },
    });
    if (!property || (!PUBLIC_DETAIL_STATUSES.includes(property.status) && property.ownerId !== userId)) {
      throw new NotFoundException("Bien introuvable");
    }

    try {
      return shapeFav(
        await this.prisma.favorite.create({
          data: { userId, propertyId },
          include: { property: { include: propertyInclude } },
        }),
      );
    } catch (e) {
      // Seul le doublon devient un 409 (une panne de base reste une vraie erreur).
      if ((e as Prisma.PrismaClientKnownRequestError)?.code === "P2002") {
        throw new ConflictException("Ce bien est déjà dans vos favoris");
      }
      throw e;
    }
  }

  async remove(userId: string, propertyId: string) {
    const { count } = await this.prisma.favorite.deleteMany({
      where: { userId, propertyId },
    });
    if (count === 0) throw new NotFoundException("Favori introuvable");
    return { ok: true };
  }

  /** Returns a Set of propertyIds the user has favourited — for quick lookup */
  async listIds(userId: string): Promise<Set<string>> {
    const favs = await this.prisma.favorite.findMany({
      where: { userId },
      select: { propertyId: true },
    });
    return new Set(favs.map((f) => f.propertyId));
  }
}
