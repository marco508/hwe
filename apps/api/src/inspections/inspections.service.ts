import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InspectionType, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { resolveLeaseParty } from "../common/lease-party.util";
import { UpsertInspectionDto } from "./dto/inspection.dto";

type AuthUser = { sub: string; email: string };

@Injectable()
export class InspectionsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Les deux états des lieux (entrée/sortie) du bail, visibles par les deux parties. */
  async list(leaseId: string, user: AuthUser) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    return this.prisma.inspection.findMany({
      where: { leaseId },
      orderBy: { type: "asc" },
    });
  }

  /**
   * Création ou mise à jour par le propriétaire.
   * Toute modification du contenu annule les signatures déjà posées : on ne
   * signe que ce qu'on a lu, pas une version qui a changé après coup.
   */
  async upsert(
    leaseId: string,
    type: InspectionType,
    user: AuthUser,
    dto: UpsertInspectionDto,
  ) {
    const { isOwner } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isOwner) {
      throw new ForbiddenException("Seul le propriétaire rédige l'état des lieux");
    }

    const existing = await this.prisma.inspection.findUnique({
      where: { leaseId_type: { leaseId, type } },
    });
    if (existing?.ownerSignedAt && existing?.tenantSignedAt) {
      throw new BadRequestException(
        "État des lieux signé par les deux parties : il est verrouillé.",
      );
    }

    const data = {
      date: new Date(dto.date),
      items: (dto.items ?? []) as unknown as Prisma.InputJsonValue,
      generalNote: dto.generalNote ?? null,
      meterElectricity: dto.meterElectricity ?? null,
      meterWater: dto.meterWater ?? null,
      meterGas: dto.meterGas ?? null,
      keysCount: dto.keysCount ?? null,
    };

    return this.prisma.inspection.upsert({
      where: { leaseId_type: { leaseId, type } },
      create: { leaseId, type, ...data },
      update: { ...data, ownerSignedAt: null, tenantSignedAt: null },
    });
  }

  /** Signature électronique horodatée, chaque partie signe pour elle-même. */
  async sign(leaseId: string, type: InspectionType, user: AuthUser) {
    const { isOwner } = await resolveLeaseParty(this.prisma, leaseId, user);
    const inspection = await this.prisma.inspection.findUnique({
      where: { leaseId_type: { leaseId, type } },
    });
    if (!inspection) throw new NotFoundException("État des lieux introuvable");

    if (isOwner) {
      if (inspection.ownerSignedAt) return inspection; // idempotent
      return this.prisma.inspection.update({
        where: { id: inspection.id },
        data: { ownerSignedAt: new Date() },
      });
    }
    if (inspection.tenantSignedAt) return inspection;
    return this.prisma.inspection.update({
      where: { id: inspection.id },
      data: { tenantSignedAt: new Date() },
    });
  }
}
