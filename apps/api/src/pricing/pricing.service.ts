import {
  BadRequestException,
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
   * Remplace la grille complète, en une transaction (upsert par unité puis
   * suppression des unités retirées). Unités en double → 400.
   * Seul le propriétaire du bien peut modifier.
   */
  async upsertMany(propertyId: string, ownerId: string, rates: UpsertRateDto[]) {
    const units = rates.map((r) => r.unit);
    if (new Set(units).size !== units.length) {
      throw new BadRequestException("Chaque unité (jour, semaine, mois, année) ne peut apparaître qu'une fois.");
    }
    const property = await this.prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new NotFoundException("Bien introuvable");
    if (property.ownerId !== ownerId) throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");

    return this.prisma.$transaction(async (tx) => {
      const upserted = [];
      for (const r of rates) {
        upserted.push(
          await tx.pricingRate.upsert({
            where: { propertyId_unit: { propertyId, unit: r.unit } },
            create: { propertyId, unit: r.unit, amount: r.amount },
            update: { amount: r.amount },
          }),
        );
      }
      await tx.pricingRate.deleteMany({
        where: { propertyId, unit: { notIn: units } },
      });
      return upserted;
    });
  }

  /** Supprime un tarif spécifique. */
  async remove(propertyId: string, unit: LeaseDurationUnit, ownerId: string) {
    const property = await this.prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new NotFoundException("Bien introuvable");
    if (property.ownerId !== ownerId) throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");

    await this.prisma.pricingRate.deleteMany({ where: { propertyId, unit } });
    return { ok: true };
  }
}
