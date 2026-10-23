import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PropertyAccessService } from "../common/property-access";
import { LeaseDurationUnit } from "@prisma/client";

export interface UpsertRateDto {
  unit: LeaseDurationUnit;
  amount: number;
}

@Injectable()
export class PricingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: PropertyAccessService,
  ) {}

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
    await this.access.assert(propertyId, ownerId, "EDIT_LISTING");

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
    await this.access.assert(propertyId, ownerId, "EDIT_LISTING");

    await this.prisma.pricingRate.deleteMany({ where: { propertyId, unit } });
    return { ok: true };
  }
}
