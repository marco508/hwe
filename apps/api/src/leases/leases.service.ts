import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLeaseDto, UpdateLeaseDto, LeaseDepositDto } from "./dto/lease.dto";
import { assertEmailVerified } from "../common/email-verified.util";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class LeasesService {
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
    return this.prisma.leaseContract.findMany({
      where: { propertyId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(propertyId: string, leaseId: string, ownerId: string) {
    await this.assertOwner(propertyId, ownerId);
    const lease = await this.prisma.leaseContract.findUnique({
      where: { id: leaseId },
      include: { property: { include: { owner: true } } },
    });
    if (!lease || lease.propertyId !== propertyId)
      throw new NotFoundException();
    return lease;
  }

  /** Retourne tous les baux liés au locataire connecté.
   * Stratégie double :
   *  1. Match par tenantEmail (email de contact saisi dans la demande)
   *  2. Match par l'inquiry dont le senderId correspond à l'userId du locataire
   * On inclut les statuts DRAFT/SIGNED/ACTIVE (DRAFT = généré, en attente de signature).
   */
  async findMyLeases(tenantEmail: string, tenantUserId: string) {
    await assertEmailVerified(this.prisma, tenantUserId);
    return this.prisma.leaseContract.findMany({
      where: {
        status: { in: ["DRAFT", "ACTIVE", "SIGNED"] },
        OR: [
          { tenantEmail },
          { inquiry: { senderId: tenantUserId } },
        ],
      },
      include: {
        property: {
          include: { owner: true },
        },
      },
      orderBy: { startDate: "desc" },
    });
  }

  async create(propertyId: string, ownerId: string, dto: CreateLeaseDto) {
    await this.assertOwner(propertyId, ownerId);
    return this.prisma.leaseContract.create({
      data: {
        ...dto,
        charges: dto.charges ?? 0,
        noticePeriod: dto.noticePeriod ?? 1,
        rentPaymentDay: dto.rentPaymentDay ?? 1,
        furnished: dto.furnished ?? false,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        propertyId,
      },
    });
  }

  async update(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: UpdateLeaseDto,
  ) {
    await this.assertOwner(propertyId, ownerId);
    const lease = await this.prisma.leaseContract.findUnique({
      where: { id: leaseId },
    });
    if (!lease || lease.propertyId !== propertyId)
      throw new NotFoundException();
    return this.prisma.leaseContract.update({
      where: { id: leaseId },
      data: {
        ...dto,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async remove(propertyId: string, leaseId: string, ownerId: string) {
    await this.assertOwner(propertyId, ownerId);
    const lease = await this.prisma.leaseContract.findUnique({
      where: { id: leaseId },
    });
    if (!lease || lease.propertyId !== propertyId)
      throw new NotFoundException();
    await this.prisma.leaseContract.delete({ where: { id: leaseId } });
    return { ok: true };
  }

  /** Le locataire signe électroniquement son bail. */
  async signByTenant(leaseId: string, tenantEmail: string, tenantUserId: string) {
    await assertEmailVerified(this.prisma, tenantUserId);
    const lease = await this.prisma.leaseContract.findUnique({
      where: { id: leaseId },
      include: { inquiry: true },
    });
    if (!lease) throw new NotFoundException("Bail introuvable");

    // Vérification d'identité : email ou inquiry sender
    const isLinked =
      lease.tenantEmail === tenantEmail ||
      (lease.inquiry && lease.inquiry.senderId === tenantUserId);
    if (!isLinked) throw new ForbiddenException("Vous n'êtes pas le locataire de ce bail");

    if (lease.tenantSignedAt) return lease; // déjà signé, idempotent

    // Détermine le nouveau statut : SIGNED dès que le locataire signe (le propriétaire signe via updateLease)
    const bothSigned = !!lease.ownerSignedAt;
    return this.prisma.leaseContract.update({
      where: { id: leaseId },
      data: {
        tenantSignedAt: new Date(),
        status: bothSigned ? "SIGNED" : lease.status,
      },
      include: { property: { include: { owner: true } } },
    });
  }

  /** Suivi de la caution : versée / restituée, avec retenue éventuelle. */
  async markDeposit(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: LeaseDepositDto,
  ) {
    await this.assertOwner(propertyId, ownerId);
    const lease = await this.prisma.leaseContract.findUnique({
      where: { id: leaseId },
    });
    if (!lease || lease.propertyId !== propertyId) throw new NotFoundException();

    if (dto.action === "PAID") {
      if (lease.depositPaidAt) return lease; // idempotent
      return this.prisma.leaseContract.update({
        where: { id: leaseId },
        data: { depositPaidAt: new Date(), depositNote: dto.note ?? lease.depositNote },
      });
    }

    // RETURNED
    if (!lease.depositPaidAt) {
      throw new BadRequestException("Marquez d'abord la caution comme versée.");
    }
    const retained = dto.retained ?? 0;
    if (retained > lease.deposit) {
      throw new BadRequestException("La retenue ne peut pas dépasser la caution.");
    }
    return this.prisma.leaseContract.update({
      where: { id: leaseId },
      data: {
        depositReturnedAt: new Date(),
        depositRetained: retained,
        depositNote: dto.note ?? lease.depositNote,
      },
    });
  }

  /** Le propriétaire signe électroniquement son bail. */
  async signByOwner(propertyId: string, leaseId: string, ownerId: string) {
    await this.assertOwner(propertyId, ownerId);
    const lease = await this.prisma.leaseContract.findUnique({
      where: { id: leaseId },
    });
    if (!lease || lease.propertyId !== propertyId) throw new NotFoundException();

    if (lease.ownerSignedAt) return lease; // déjà signé, idempotent

    const bothSigned = !!lease.tenantSignedAt;
    return this.prisma.leaseContract.update({
      where: { id: leaseId },
      data: {
        ownerSignedAt: new Date(),
        status: bothSigned ? "SIGNED" : lease.status,
      },
    });
  }
}
