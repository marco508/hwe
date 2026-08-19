import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateLeaseDto,
  UpdateLeaseDto,
  LeaseDepositDto,
  GiveNoticeDto,
  CreateAmendmentDto,
  CoTenantDto,
  InsuranceDto,
} from "./dto/lease.dto";
import { MailerService } from "../mail/mailer.service";
import { resolveLeaseParty } from "../common/lease-party.util";
import { assertValidDataUrl } from "../common/upload.util";
import { assertEmailVerified } from "../common/email-verified.util";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class LeasesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

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
      include: {
        coTenants: true,
        amendments: { orderBy: { createdAt: "desc" } },
        insurances: {
          select: { id: true, validUntil: true, uploadedAt: true },
          orderBy: { validUntil: "desc" },
        },
      },
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
          { coTenants: { some: { email: tenantEmail } } },
        ],
      },
      include: {
        property: {
          include: { owner: true },
        },
        coTenants: true,
        amendments: { orderBy: { createdAt: "desc" } },
        insurances: {
          select: { id: true, validUntil: true, uploadedAt: true },
          orderBy: { validUntil: "desc" },
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


  // ── Préavis ──

  /** Le locataire donne son congé ; la date effective respecte le préavis. */
  async giveNotice(
    leaseId: string,
    tenantEmail: string,
    tenantUserId: string,
    dto: GiveNoticeDto,
  ) {
    const { lease, isTenant } = await resolveLeaseParty(this.prisma, leaseId, {
      sub: tenantUserId,
      email: tenantEmail,
    });
    if (!isTenant) throw new ForbiddenException("Seul le locataire donne son préavis");
    if (lease.status !== "ACTIVE" && lease.status !== "SIGNED") {
      throw new BadRequestException("Ce bail n'est pas actif.");
    }
    if (lease.noticeGivenAt) {
      throw new BadRequestException(
        `Préavis déjà donné — fin de bail le ${lease.noticeEffectiveDate?.toLocaleDateString("fr-FR")}.`,
      );
    }

    const min = new Date();
    min.setMonth(min.getMonth() + lease.noticePeriod);
    let effective = dto.desiredDate ? new Date(dto.desiredDate) : min;
    if (isNaN(effective.getTime()) || effective < min) effective = min;

    const updated = await this.prisma.leaseContract.update({
      where: { id: leaseId },
      data: {
        noticeGivenAt: new Date(),
        noticeEffectiveDate: effective,
        noticeNote: dto.note ?? null,
        endDate: effective,
      },
    });

    const tenantName = `${lease.tenantFirstName} ${lease.tenantLastName}`;
    this.mailer
      .noticeGiven(
        lease.property.owner.email,
        lease.property.owner.firstName,
        lease.property.title,
        tenantName,
        effective,
      )
      .catch(() => {});

    return updated;
  }

  // ── Avenants ──

  /** Le propriétaire propose un avenant ; il s'applique à la signature du locataire. */
  async createAmendment(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: CreateAmendmentDto,
  ) {
    await this.assertOwner(propertyId, ownerId);
    const lease = await this.prisma.leaseContract.findUnique({ where: { id: leaseId } });
    if (!lease || lease.propertyId !== propertyId) throw new NotFoundException();
    if (
      dto.newMonthlyRent == null &&
      dto.newCharges == null &&
      dto.newEndDate == null
    ) {
      throw new BadRequestException("Un avenant doit modifier au moins une condition.");
    }

    const amendment = await this.prisma.leaseAmendment.create({
      data: {
        leaseId,
        effectiveDate: new Date(dto.effectiveDate),
        newMonthlyRent: dto.newMonthlyRent ?? null,
        newCharges: dto.newCharges ?? null,
        newEndDate: dto.newEndDate ? new Date(dto.newEndDate) : null,
        note: dto.note ?? null,
      },
    });

    const tenantBase = (
      process.env.TENANT_WEB_URL || "https://tenant.hwe.dkpsolution.tech"
    ).replace(/\/+$/, "");
    const property = await this.prisma.property.findUnique({ where: { id: propertyId } });
    this.mailer
      .amendmentCreated(
        lease.tenantEmail,
        lease.tenantFirstName,
        property?.title ?? "votre logement",
        `${tenantBase}/ma-location`,
      )
      .catch(() => {});

    return amendment;
  }

  /** Les avenants du bail, visibles par les deux parties. */
  async listAmendments(leaseId: string, user: { sub: string; email: string }) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    return this.prisma.leaseAmendment.findMany({
      where: { leaseId },
      orderBy: { createdAt: "desc" },
    });
  }

  /** Le locataire signe l'avenant : il est aussitôt appliqué au bail. */
  async signAmendment(
    leaseId: string,
    amendmentId: string,
    user: { sub: string; email: string },
  ) {
    const { lease, isTenant } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isTenant) throw new ForbiddenException("Seul le locataire signe l'avenant");

    const amendment = await this.prisma.leaseAmendment.findUnique({
      where: { id: amendmentId },
    });
    if (!amendment || amendment.leaseId !== leaseId) throw new NotFoundException();
    if (amendment.tenantSignedAt) return amendment; // idempotent

    const [signed] = await this.prisma.$transaction([
      this.prisma.leaseAmendment.update({
        where: { id: amendmentId },
        data: { tenantSignedAt: new Date(), appliedAt: new Date() },
      }),
      this.prisma.leaseContract.update({
        where: { id: leaseId },
        data: {
          ...(amendment.newMonthlyRent != null ? { monthlyRent: amendment.newMonthlyRent } : {}),
          ...(amendment.newCharges != null ? { charges: amendment.newCharges } : {}),
          ...(amendment.newEndDate != null ? { endDate: amendment.newEndDate } : {}),
        },
      }),
    ]);

    this.mailer
      .amendmentSigned(
        lease.property.owner.email,
        lease.property.owner.firstName,
        lease.property.title,
      )
      .catch(() => {});

    return signed;
  }

  // ── Colocation ──

  async addCoTenant(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: CoTenantDto,
  ) {
    await this.assertOwner(propertyId, ownerId);
    const lease = await this.prisma.leaseContract.findUnique({ where: { id: leaseId } });
    if (!lease || lease.propertyId !== propertyId) throw new NotFoundException();
    if (dto.email === lease.tenantEmail) {
      throw new BadRequestException("C'est déjà le locataire principal.");
    }
    try {
      return await this.prisma.leaseCoTenant.create({
        data: { leaseId, ...dto },
      });
    } catch {
      throw new BadRequestException("Ce colocataire est déjà sur le bail.");
    }
  }

  async removeCoTenant(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    coTenantId: string,
  ) {
    await this.assertOwner(propertyId, ownerId);
    const coTenant = await this.prisma.leaseCoTenant.findUnique({
      where: { id: coTenantId },
    });
    if (!coTenant || coTenant.leaseId !== leaseId) throw new NotFoundException();
    if (coTenant.signedAt) {
      throw new BadRequestException(
        "Ce colocataire a signé : retirez-le par avenant, pas par suppression.",
      );
    }
    await this.prisma.leaseCoTenant.delete({ where: { id: coTenantId } });
    return { ok: true };
  }

  /** Le colocataire connecté signe sa propre ligne (rattachement par e-mail). */
  async signAsCoTenant(leaseId: string, email: string, userId: string) {
    await assertEmailVerified(this.prisma, userId);
    const coTenant = await this.prisma.leaseCoTenant.findUnique({
      where: { leaseId_email: { leaseId, email } },
    });
    if (!coTenant) throw new NotFoundException("Vous n'êtes pas colocataire de ce bail");
    if (coTenant.signedAt) return coTenant; // idempotent
    return this.prisma.leaseCoTenant.update({
      where: { id: coTenant.id },
      data: { signedAt: new Date() },
    });
  }

  // ── Assurance habitation ──

  /** Le locataire dépose une attestation (PDF ou image, bornée). */
  async addInsurance(
    leaseId: string,
    user: { sub: string; email: string },
    dto: InsuranceDto,
  ) {
    const { isTenant } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isTenant) throw new ForbiddenException("Seul le locataire dépose l'attestation");
    assertValidDataUrl(dto.fileUrl, "attestation");
    const validUntil = new Date(dto.validUntil);
    if (isNaN(validUntil.getTime()) || validUntil.getTime() < Date.now()) {
      throw new BadRequestException("L'attestation doit encore être valide.");
    }
    return this.prisma.insuranceCertificate.create({
      data: { leaseId, fileUrl: dto.fileUrl, validUntil },
      select: { id: true, validUntil: true, uploadedAt: true },
    });
  }

  /** Liste (sans fichiers, trop lourds) — visible par les deux parties. */
  async listInsurances(leaseId: string, user: { sub: string; email: string }) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    return this.prisma.insuranceCertificate.findMany({
      where: { leaseId },
      select: { id: true, validUntil: true, uploadedAt: true },
      orderBy: { validUntil: "desc" },
    });
  }

  /** Le fichier d'une attestation, à la demande. */
  async getInsuranceFile(
    leaseId: string,
    insuranceId: string,
    user: { sub: string; email: string },
  ) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    const cert = await this.prisma.insuranceCertificate.findUnique({
      where: { id: insuranceId },
    });
    if (!cert || cert.leaseId !== leaseId) throw new NotFoundException();
    return { fileUrl: cert.fileUrl };
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
