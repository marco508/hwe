import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { lockKey } from "../common/advisory-lock";
import { today as todayDay } from "../common/dates";
import { formatMoney } from "../common/money";
import { lettingFee, managementFee, saleFee } from "./fees";

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

type Tx = Prisma.TransactionClient;

/**
 * Création des honoraires dus (FeeEntry) aux moments clés :
 *  - validation d'un loyer (mandat MANAGEMENT) : une entrée par échéance,
 *    idempotente (rentPeriodId unique) ; annulée si la validation l'est ;
 *  - double signature d'un bail (mandat LETTING ou MANAGEMENT avec
 *    honoraires de location) : une entrée par bail (index partiel) ;
 *  - vente conclue (mandat SALE) : une entrée par mandat (index partiel).
 */
@Injectable()
export class FeesService {
  private readonly logger = new Logger(FeesService.name);

  constructor(private readonly prisma: PrismaService) {}

  private activeMandate(db: Tx | PrismaService, propertyId: string) {
    const today = todayDay();
    return db.mandate.findFirst({
      where: { propertyId, status: "ACTIVE", OR: [{ endDate: null }, { endDate: { gte: today } }] },
    });
  }

  /** Loyer validé → honoraires de gestion (dans la transaction de validation). */
  async onRentValidated(
    tx: Tx,
    period: { id: string; leaseId: string; rentAmount: number; chargesAmount: number; periodYear: number; periodMonth: number },
    propertyId: string,
    currency: string,
    actorId: string | null,
  ): Promise<void> {
    const mandate = await this.activeMandate(tx, propertyId);
    if (!mandate || mandate.type !== "MANAGEMENT") return;
    const amount = managementFee(mandate.managementFeeRate, period.rentAmount, period.chargesAmount);
    if (amount == null) return;
    const label = `Honoraires de gestion — ${MOIS[period.periodMonth - 1]} ${period.periodYear} (${mandate.managementFeeRate} %)`;
    const existing = await tx.feeEntry.findUnique({ where: { rentPeriodId: period.id } });
    if (existing && existing.status !== "CANCELLED") return; // idempotent
    if (existing) {
      await tx.feeEntry.update({
        where: { id: existing.id },
        data: { status: "DUE", amount, label, dueDate: todayDay(), settledAt: null, mandateId: mandate.id, currency },
      });
    } else {
      await tx.feeEntry.create({
        data: {
          mandateId: mandate.id,
          kind: "MANAGEMENT",
          amount,
          currency,
          rentPeriodId: period.id,
          leaseId: period.leaseId,
          label,
          dueDate: todayDay(),
        },
      });
    }
    await tx.mandateEvent.create({
      data: { mandateId: mandate.id, actorId, kind: "FEE_CREATED", data: { kind: "MANAGEMENT", amount, rentPeriodId: period.id } },
    });
  }

  /** Validation annulée ou refusée → honoraire de gestion CANCELLED (idempotent). */
  async onRentCancelled(tx: Tx | PrismaService, periodId: string): Promise<number> {
    const { count } = await tx.feeEntry.updateMany({
      where: { rentPeriodId: periodId, status: { not: "CANCELLED" } },
      data: { status: "CANCELLED", settledAt: null },
    });
    return count;
  }

  /** Bail doublement signé → honoraires de mise en location (une fois par bail). */
  async onLeaseSigned(leaseId: string, actorId: string | null): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        const lease = await tx.leaseContract.findUnique({ where: { id: leaseId } });
        if (!lease || lease.status === "DRAFT") return;
        await lockKey(tx, `fees:lease:${leaseId}`);
        const mandate = await this.activeMandate(tx, lease.propertyId);
        if (!mandate || (mandate.type !== "LETTING" && mandate.type !== "MANAGEMENT")) return;
        const amount = lettingFee(mandate, lease.monthlyRent);
        if (amount == null) return;
        const already = await tx.feeEntry.findFirst({
          where: { leaseId, kind: "LETTING", status: { not: "CANCELLED" } },
        });
        if (already) return;
        await tx.feeEntry.create({
          data: {
            mandateId: mandate.id,
            kind: "LETTING",
            amount,
            currency: lease.currency,
            leaseId,
            label: `Honoraires de mise en location — bail de ${lease.tenantFirstName} ${lease.tenantLastName}`,
            dueDate: todayDay(),
          },
        });
        await tx.mandateEvent.create({
          data: { mandateId: mandate.id, actorId, kind: "FEE_CREATED", data: { kind: "LETTING", amount, leaseId } },
        });
      });
    } catch (e) {
      this.logger.error(`Honoraires de location du bail ${leaseId} : ${(e as Error).message}`);
    }
  }

  /** Bien vendu (status SOLD + prix final) → honoraires de vente (une fois par mandat). */
  async onPropertySold(tx: Tx, propertyId: string, salePrice: number, actorId: string | null): Promise<void> {
    const mandate = await this.activeMandate(tx, propertyId);
    if (!mandate || mandate.type !== "SALE") return;
    await lockKey(tx, `fees:sale:${mandate.id}`);
    const amount = saleFee(mandate.saleFeeRate, salePrice);
    if (amount == null) return;
    const already = await tx.feeEntry.findFirst({
      where: { mandateId: mandate.id, kind: "SALE", status: { not: "CANCELLED" } },
    });
    if (already) return;
    await tx.feeEntry.create({
      data: {
        mandateId: mandate.id,
        kind: "SALE",
        amount,
        currency: mandate.currency,
        label: `Honoraires de vente — ${mandate.saleFeeRate} % de ${formatMoney(salePrice, mandate.currency)}`,
        dueDate: todayDay(),
      },
    });
    await tx.mandateEvent.create({
      data: { mandateId: mandate.id, actorId, kind: "FEE_CREATED", data: { kind: "SALE", amount, salePrice } },
    });
  }
}
