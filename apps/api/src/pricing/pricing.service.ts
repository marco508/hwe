import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LeaseDurationUnit } from "@prisma/client";

export interface UpsertRateDto {
  unit: LeaseDurationUnit;
  amount: number;
}

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  /** Retourne toutes les lignes tarifaires d'un bien (accessible à tous). */
  async list(propertyId: string) {
    return this.prisma.pricingRate.findMany({
      where: { propertyId },
      orderBy: { unit: "asc" },
    });
  }

  /**
   * Crée ou met à jour les tarifs d'un bien.
   * Remplace la grille complète (upsert sur propertyId+unit).
   * Seul le propriétaire du bien peut modifier.
   */
  async upsertMany(propertyId: string, ownerId: string, rates: UpsertRateDto[]) {
    const property = await this.prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new NotFoundException("Bien introuvable");
    if (property.ownerId !== ownerId) throw new ForbiddenException();

    // Upsert chaque ligne
    const upserted = await Promise.all(
      rates.map((r) =>
        this.prisma.pricingRate.upsert({
          where: { propertyId_unit: { propertyId, unit: r.unit } },
          create: { propertyId, unit: r.unit, amount: r.amount },
          update: { amount: r.amount },
        }),
      ),
    );

    // Supprimer les unités retirées de la grille
    const keptUnits = rates.map((r) => r.unit);
    await this.prisma.pricingRate.deleteMany({
      where: { propertyId, unit: { notIn: keptUnits } },
    });

    return upserted;
  }

  /** Supprime un tarif spécifique. */
  async remove(propertyId: string, unit: LeaseDurationUnit, ownerId: string) {
    const property = await this.prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new NotFoundException("Bien introuvable");
    if (property.ownerId !== ownerId) throw new ForbiddenException();

    await this.prisma.pricingRate.deleteMany({ where: { propertyId, unit } });
    return { ok: true };
  }
}
