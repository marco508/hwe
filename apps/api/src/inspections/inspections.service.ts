import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InspectionType, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { resolveLeaseParty } from "../common/lease-party.util";
import { UpsertInspectionDto } from "./dto/inspection.dto";
import { toDay } from "../common/dates";
import { PropertyAccessService } from "../common/property-access";

type AuthUser = { sub: string };

// États des lieux possibles sur un bail signé (y compris terminé : la sortie
// se fait souvent le dernier jour ou juste après).
const INSPECTABLE = ["SIGNED", "ACTIVE", "EXPIRED", "TERMINATED"];

@Injectable()
export class InspectionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: PropertyAccessService,
  ) {}

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
    const party = await resolveLeaseParty(this.prisma, leaseId, user);
    const { lease } = party;
    if (!party.isLandlord) {
      throw new ForbiddenException("Seul le propriétaire rédige l'état des lieux");
    }
    // Propriétaire, ou pro mandataire (mandat de gestion / location en cours).
    party.must("INSPECTION");
    if (!INSPECTABLE.includes(lease.status)) {
      throw new ConflictException("L'état des lieux se fait sur un bail signé.");
    }
    if (type === "EXIT") {
      const entry = await this.prisma.inspection.findUnique({
        where: { leaseId_type: { leaseId, type: "ENTRY" } },
        select: { id: true },
      });
      if (!entry) {
        throw new ConflictException("Rédigez d'abord l'état des lieux d'entrée.");
      }
    }
    const date = toDay(dto.date);
    if (!date) throw new BadRequestException("Date de l'état des lieux invalide.");

    const existing = await this.prisma.inspection.findUnique({
      where: { leaseId_type: { leaseId, type } },
    });
    if (existing?.ownerSignedAt && existing?.tenantSignedAt) {
      throw new BadRequestException(
        "État des lieux signé par les deux parties : il est verrouillé.",
      );
    }

    const data = {
      date,
      items: (dto.items ?? []) as unknown as Prisma.InputJsonValue,
      generalNote: dto.generalNote ?? null,
      meterElectricity: dto.meterElectricity ?? null,
      meterWater: dto.meterWater ?? null,
      meterGas: dto.meterGas ?? null,
      keysCount: dto.keysCount ?? null,
    };

    const saved = await this.prisma.inspection.upsert({
      where: { leaseId_type: { leaseId, type } },
      create: { leaseId, type, ...data, updatedById: user.sub },
      update: {
        ...data,
        updatedById: user.sub,
        ownerSignedAt: null,
        tenantSignedAt: null,
        ownerSignedById: null,
        ownerSignatureMention: null,
      },
    });
    if (party.isAgent) {
      const m = await this.access.activeMandate(lease.propertyId);
      if (m) await this.access.logEvent(m.id, user.sub, "INSPECTION_UPDATED", { leaseId, type }).catch(() => {});
    }
    return saved;
  }

  /** Signature électronique horodatée, chaque partie signe pour elle-même. */
  async sign(leaseId: string, type: InspectionType, user: AuthUser) {
    const party = await resolveLeaseParty(this.prisma, leaseId, user);
    const { lease } = party;
    if (party.isAgent) party.must("INSPECTION");
    if (!INSPECTABLE.includes(lease.status)) {
      throw new ConflictException("L'état des lieux se signe sur un bail signé.");
    }
    const inspection = await this.prisma.inspection.findUnique({
      where: { leaseId_type: { leaseId, type } },
    });
    if (!inspection) throw new NotFoundException("État des lieux introuvable");

    if (party.isLandlord) {
      if (inspection.ownerSignedAt) return inspection; // idempotent
      // Signé par un pro : « par <agent> (<agence>), mandataire de <propriétaire> ».
      const mention = party.isAgent ? await this.access.agentMention(party.access) : null;
      const signed = await this.prisma.inspection.update({
        where: { id: inspection.id },
        data: { ownerSignedAt: new Date(), ownerSignedById: user.sub, ownerSignatureMention: mention },
      });
      if (party.isAgent) {
        const m = await this.access.activeMandate(lease.propertyId);
        if (m) await this.access.logEvent(m.id, user.sub, "INSPECTION_SIGNED", { leaseId, type, mention }).catch(() => {});
      }
      return signed;
    }
    if (inspection.tenantSignedAt) return inspection;
    return this.prisma.inspection.update({
      where: { id: inspection.id },
      data: { tenantSignedAt: new Date() },
    });
  }
}
