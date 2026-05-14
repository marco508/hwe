import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

const propertyInclude = {
  media: { orderBy: { position: "asc" as const }, take: 1 },
} as const;

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
    return favs;
  }

  async add(userId: string, propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) throw new NotFoundException("Bien introuvable");

    try {
      return await this.prisma.favorite.create({
        data: { userId, propertyId },
        include: { property: { include: propertyInclude } },
      });
    } catch {
      throw new ConflictException("Ce bien est déjà dans vos favoris");
    }
  }

  async remove(userId: string, propertyId: string) {
    const fav = await this.prisma.favorite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
    if (!fav) throw new NotFoundException("Favori introuvable");
    await this.prisma.favorite.delete({
      where: { userId_propertyId: { userId, propertyId } },
    });
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
