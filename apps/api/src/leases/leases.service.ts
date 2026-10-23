import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateLeaseDto,
  UpdateLeaseDto,
  LeaseDepositDto,
  GiveNoticeDto,
  CreateAmendmentDto,
  CoTenantDto,
  InsuranceDto,
  OwnerNoticeDto,
  ChargeRegularizationDto,
} from "./dto/lease.dto";
import { MailerService } from "../mail/mailer.service";
import { RentsService } from "../rents/rents.service";
import { resolveLeaseParty, leasePartyFlags } from "../common/lease-party.util";
import { assertDataUrl } from "../common/upload.util";
import { assertEmailVerified, emailNotVerified } from "../common/email-verified.util";
import { normalizeEmail } from "../common/email.util";
import { lockKey } from "../common/advisory-lock";
import { today as todayDay, toDay } from "../common/dates";
import {
  OPEN_LEASE_STATUSES,
  RUNNING_LEASE_STATUSES,
  assertLeaseDates,
  assertLeaseDeletable,
  assertLeaseEditable,
  assertLeaseSignable,
  leaseContentHash,
  ownerNoticeEffectiveDate,
  round2,
  statusAfterSignatures,
  tenantNoticeEffectiveDate,
} from "./lease-rules";
import { LEASE_FULL_INCLUDE, assertNoLeaseOverlap } from "./lease-db.util";
import { AccessAction, PropertyAccessService } from "../common/property-access";
import { FeesService } from "../mandates/fees.service";
import { agencyLogoUrl } from "../common/media.util";

type AuthUser = { sub: string; email?: string };

function day(value: string | null | undefined, label: string): Date | null {
  if (value == null || value === "") return null;
  const d = toDay(value);
  if (!d) throw new BadRequestException(`${label} invalide.`);
  return d;
}

@Injectable()
export class LeasesService {
  private readonly logger = new Logger(LeasesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly rents: RentsService,
    private readonly access: PropertyAccessService,
    private readonly fees: FeesService,
  ) {}

  /**
   * Accès côté bailleur au bien (PropertyAccessService) : propriétaire, ou
   * pro mandataire autorisé pour `action`. 404 si le bien n'existe pas.
   */
  private async assertOwner(propertyId: string, userId: string, action: AccessAction) {
    const { ctx, decision } = await this.access.assert(propertyId, userId, action);
    const property = await this.prisma.property.findUniqueOrThrow({ where: { id: propertyId } });
    return { property, ctx, decision };
  }

  private async ownedLease(propertyId: string, leaseId: string, userId: string, action: AccessAction) {
    const { property, ctx, decision } = await this.assertOwner(propertyId, userId, action);
    const lease = await this.prisma.leaseContract.findUnique({
      where: { id: leaseId },
      include: { coTenants: true },
    });
    if (!lease || lease.propertyId !== propertyId) throw new NotFoundException("Bail introuvable");
    return { property, lease, ctx, decision };
  }

  /** Journalise l'action d'un pro sur le mandat actif du bien. */
  private async logPro(
    propertyId: string,
    actorId: string,
    kind: string,
    data: Prisma.InputJsonValue,
  ): Promise<void> {
    const m = await this.access.activeMandate(propertyId);
    if (m) await this.access.logEvent(m.id, actorId, kind, data).catch(() => {});
  }

  /**
   * Champs ajoutés au bail : `managedBy` (agence mandataire, pour la mention
   * « Bien géré par <agence>, mandataire » du contrat) et `preparedBy`.
   */
  private async decorate<T extends { id: string; propertyId: string; preparedById?: string | null }>(leases: T[]) {
    if (leases.length === 0) return [] as Array<T & { managedBy: unknown; preparedBy: unknown }>;
    const propertyIds = [...new Set(leases.map((l) => l.propertyId))];
    const mandates = await this.prisma.mandate.findMany({
      where: { propertyId: { in: propertyIds }, status: "ACTIVE" },
      select: {
        propertyId: true,
        reference: true,
        type: true,
        agency: { select: { id: true, name: true, slug: true, logoKey: true, registrationNumber: true, email: true, phone: true } },
      },
    });
    const preparedIds = [...new Set(leases.map((l) => l.preparedById).filter((x): x is string => !!x))];
    const preparers = preparedIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: preparedIds } },
          select: { id: true, firstName: true, lastName: true, agencyMember: { select: { agency: { select: { name: true } } } } },
        })
      : [];
    return leases.map((l) => {
      const m = mandates.find((x) => x.propertyId === l.propertyId);
      const p = l.preparedById ? preparers.find((u) => u.id === l.preparedById) : null;
      return {
        ...l,
        managedBy: m
          ? {
              agencyId: m.agency.id,
              name: m.agency.name,
              slug: m.agency.slug,
              logoUrl: agencyLogoUrl(m.agency.logoKey),
              registrationNumber: m.agency.registrationNumber,
              email: m.agency.email,
              phone: m.agency.phone,
              mandateReference: m.reference,
              mandateType: m.type,
            }
          : null,
        preparedBy: p
          ? { id: p.id, firstName: p.firstName, lastName: p.lastName, agencyName: p.agencyMember?.agency.name ?? null }
          : null,
      };
    });
  }

  /** Objet bail complet (même forme pour la liste et toutes les mutations). */
  private async full(leaseId: string) {
    const lease = await this.prisma.leaseContract.findUniqueOrThrow({
      where: { id: leaseId },
      include: LEASE_FULL_INCLUDE,
    });
    const [decorated] = await this.decorate([lease]);
    return decorated!;
  }

  private tenantBase(): string {
    return (process.env.TENANT_WEB_URL || "https://tenant.hwe.dkpsolution.tech").replace(/\/+$/, "");
  }

  async list(propertyId: string, userId: string) {
    const { decision } = await this.assertOwner(propertyId, userId, "LEASE_READ");
    const leases = await this.prisma.leaseContract.findMany({
      where: {
        propertyId,
        // Mandat LETTING terminé : le pro ne garde que la lecture du bail signé.
        ...(decision.as === "PRO" && !(await this.access.check(propertyId, userId, "READ")).decision.allowed
          ? { status: { not: "DRAFT" } }
          : {}),
      },
      include: LEASE_FULL_INCLUDE,
      orderBy: { createdAt: "desc" },
    });
    return this.decorate(leases);
  }

  async findOne(propertyId: string, leaseId: string, userId: string) {
    await this.ownedLease(propertyId, leaseId, userId, "LEASE_READ");
    return this.full(leaseId);
  }

  /**
   * Baux du locataire connecté (e-mail VÉRIFIÉ) : titulaire (e-mail du bail
   * ou auteur de la demande d'origine) ou colocataire. DRAFT inclus (en
   * attente de signature).
   */
  async findMyLeases(userId: string) {
    await assertEmailVerified(this.prisma, userId);
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { id: true, email: true, emailVerifiedAt: true },
    });
    const leases = await this.prisma.leaseContract.findMany({
      where: {
        status: { in: ["DRAFT", "ACTIVE", "SIGNED"] },
        OR: [
          { tenantEmail: { equals: user.email, mode: "insensitive" } },
          { inquiry: { senderId: user.id } },
          { coTenants: { some: { email: { equals: user.email, mode: "insensitive" } } } },
        ],
      },
      include: { ...LEASE_FULL_INCLUDE, inquiry: { select: { senderId: true } } },
      orderBy: { startDate: "desc" },
    });
    return this.decorate(
      leases
        .filter((l) => leasePartyFlags(l, user).isTenant)
        .map(({ inquiry: _inquiry, ...l }) => l),
    );
  }

  async create(propertyId: string, userId: string, dto: CreateLeaseDto) {
    const { property, decision } = await this.assertOwner(propertyId, userId, "LEASE_DRAFT");
    const byPro = decision.as === "PRO";
    const start = day(dto.startDate, "Date de début");
    const end = day(dto.endDate, "Date de fin");
    assertLeaseDates(start, end);

    const lease = await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `property:${propertyId}`);
      await assertNoLeaseOverlap(tx, propertyId, start!, end);
      return tx.leaseContract.create({
        data: {
          propertyId,
          tenantFirstName: dto.tenantFirstName,
          tenantLastName: dto.tenantLastName,
          tenantEmail: normalizeEmail(dto.tenantEmail),
          tenantPhone: dto.tenantPhone || null,
          tenantAddress: dto.tenantAddress || null,
          monthlyRent: round2(dto.monthlyRent),
          charges: round2(dto.charges ?? 0),
          deposit: round2(dto.deposit),
          currency: property.currency || "EUR",
          startDate: start!,
          endDate: end,
          noticePeriod: dto.noticePeriod ?? 1,
          rentPaymentDay: dto.rentPaymentDay ?? 1,
          furnished: dto.furnished ?? (property.furnished || property.rentalKind === "FURNISHED"),
          specialClauses: dto.specialClauses || null,
          preparedById: byPro ? userId : null,
        },
      });
    });
    if (byPro) await this.logPro(propertyId, userId, "LEASE_PREPARED", { leaseId: lease.id, action: "CREATED" });
    return this.full(lease.id);
  }

  /** Modification d'un brouillon jamais signé (sinon 409 : avenant). */
  async update(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: UpdateLeaseDto,
  ) {
    const { lease, decision } = await this.ownedLease(propertyId, leaseId, ownerId, "LEASE_DRAFT");
    const byPro = decision.as === "PRO";
    assertLeaseEditable(lease);

    const start = dto.startDate !== undefined ? day(dto.startDate, "Date de début") : lease.startDate;
    const end = dto.endDate !== undefined ? day(dto.endDate, "Date de fin") : lease.endDate;
    assertLeaseDates(start, end);

    await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `property:${propertyId}`);
      if (dto.startDate !== undefined || dto.endDate !== undefined) {
        await assertNoLeaseOverlap(tx, propertyId, start!, end, { excludeLeaseId: leaseId });
      }
      // Re-vérifié sous verrou : personne n'a signé entre-temps.
      const { count } = await tx.leaseContract.updateMany({
        where: { id: leaseId, status: "DRAFT", ownerSignedAt: null, tenantSignedAt: null },
        data: {
          ...(dto.specialClauses !== undefined ? { specialClauses: dto.specialClauses || null } : {}),
          ...(dto.monthlyRent !== undefined ? { monthlyRent: round2(dto.monthlyRent) } : {}),
          ...(dto.charges !== undefined ? { charges: round2(dto.charges) } : {}),
          ...(dto.deposit !== undefined ? { deposit: round2(dto.deposit) } : {}),
          startDate: start!,
          endDate: end,
          ...(byPro ? { preparedById: ownerId } : {}),
        },
      });
      if (count === 0) {
        throw new ConflictException("Ce bail a déjà été signé : il n'est plus modifiable. Passez par un avenant.");
      }
    });
    if (byPro) await this.logPro(propertyId, ownerId, "LEASE_PREPARED", { leaseId, action: "UPDATED" });
    this.logger.log(`Bail ${leaseId} modifié par ${byPro ? "le professionnel" : "le propriétaire"} ${ownerId}.`);
    return this.full(leaseId);
  }

  async remove(propertyId: string, leaseId: string, ownerId: string) {
    const { lease } = await this.ownedLease(propertyId, leaseId, ownerId, "LEASE_DRAFT");
    assertLeaseDeletable(lease);
    const { count } = await this.prisma.leaseContract.deleteMany({
      where: { id: leaseId, status: "DRAFT", ownerSignedAt: null, tenantSignedAt: null },
    });
    if (count === 0) throw new ConflictException("Ce bail a été signé : il ne peut plus être supprimé.");
    this.logger.log(`Bail brouillon ${leaseId} supprimé par le propriétaire ${ownerId}.`);
    return { ok: true };
  }

  // ── Signatures ──

  /** Le locataire PRINCIPAL signe électroniquement son bail. */
  async signByTenant(leaseId: string, user: AuthUser) {
    const { isPrincipalTenant, isCoTenant } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isPrincipalTenant) {
      throw new ForbiddenException(
        isCoTenant
          ? "En tant que colocataire, signez votre propre ligne de colocation."
          : "Seul le locataire signe le bail ici.",
      );
    }
    return this.applySignature(leaseId, "tenant");
  }

  /**
   * Le propriétaire signe électroniquement son bail (côté bailleur). Un pro
   * ne le peut que POUR LE COMPTE d'un propriétaire non activé : mention
   * « Signé par X (Agence), mandataire, pour le compte de Y — mandat … » et
   * événement ACTED_ON_BEHALF.
   */
  async signByOwner(propertyId: string, leaseId: string, userId: string) {
    const { ctx, decision } = await this.ownedLease(propertyId, leaseId, userId, "SIGN_LEASE");
    const mention = decision.onBehalf ? await this.access.onBehalfMention(ctx) : null;
    const before = await this.prisma.leaseContract.findUniqueOrThrow({ where: { id: leaseId }, select: { ownerSignedAt: true } });
    const out = await this.applySignature(leaseId, "owner", { signedById: userId, mention, actorId: userId });
    if (decision.onBehalf && !before.ownerSignedAt) {
      await this.logPro(propertyId, userId, "ACTED_ON_BEHALF", { action: "SIGN_LEASE", leaseId, mention });
    }
    return out;
  }

  /**
   * Pose une signature sous verrou de ligne (SELECT … FOR UPDATE) : deux
   * signatures simultanées ne laissent plus le bail bloqué en DRAFT. À la
   * double signature : statut SIGNED/ACTIVE selon la date de début, empreinte
   * du contenu, bien passé en RENTED, échéances générées.
   */
  private async applySignature(
    leaseId: string,
    who: "owner" | "tenant",
    opts: { signedById?: string; mention?: string | null; actorId?: string | null } = {},
  ) {
    const now = new Date();
    const today = todayDay(now);
    const result = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "LeaseContract" WHERE "id" = ${leaseId} FOR UPDATE`;
      const lease = await tx.leaseContract.findUniqueOrThrow({ where: { id: leaseId } });
      const already = who === "owner" ? lease.ownerSignedAt : lease.tenantSignedAt;
      if (already) return { completed: false }; // idempotent
      assertLeaseSignable(lease);

      const signed = {
        ownerSignedAt: who === "owner" ? now : lease.ownerSignedAt,
        tenantSignedAt: who === "tenant" ? now : lease.tenantSignedAt,
      };
      const status = statusAfterSignatures({ ...signed, startDate: lease.startDate }, today);
      const completed = status !== "DRAFT";
      if (completed) {
        await lockKey(tx, `property:${lease.propertyId}`);
        await assertNoLeaseOverlap(tx, lease.propertyId, lease.startDate, lease.endDate, {
          excludeLeaseId: leaseId,
          statuses: RUNNING_LEASE_STATUSES,
        });
      }
      await tx.leaseContract.update({
        where: { id: leaseId },
        data: {
          ...(who === "owner"
            ? { ownerSignedAt: now, ownerSignedById: opts.signedById ?? null, ownerSignatureMention: opts.mention ?? null }
            : { tenantSignedAt: now }),
          status,
          ...(completed ? { contentHash: leaseContentHash(lease) } : {}),
        },
      });
      if (completed) {
        // Le bien loué disparaît des annonces (sauf s'il a été archivé/vendu).
        await tx.property.updateMany({
          where: { id: lease.propertyId, status: { in: ["PUBLISHED", "DRAFT"] } },
          data: { status: "RENTED" },
        });
      }
      return { completed };
    });
    if (result.completed) {
      this.logger.log(`Bail ${leaseId} signé par les deux parties.`);
      await this.rents.generateForLease(leaseId, today).catch((e) =>
        this.logger.error(`Échéances du bail ${leaseId} : ${(e as Error).message}`),
      );
      // Honoraires de mise en location (mandat LETTING / MANAGEMENT actif).
      await this.fees.onLeaseSigned(leaseId, opts.actorId ?? null);
    }
    return this.full(leaseId);
  }

  /** Suivi de la caution : versée / restituée (une seule fois, en fin de bail). */
  async markDeposit(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: LeaseDepositDto,
  ) {
    const { lease } = await this.ownedLease(propertyId, leaseId, ownerId, "MANAGE");

    if (dto.action === "PAID") {
      if (lease.depositPaidAt) return this.full(leaseId); // idempotent
      await this.prisma.leaseContract.update({
        where: { id: leaseId },
        data: { depositPaidAt: new Date(), depositNote: dto.note ?? lease.depositNote },
      });
      return this.full(leaseId);
    }

    // RETURNED
    if (!lease.depositPaidAt) {
      throw new BadRequestException("Marquez d'abord la caution comme versée.");
    }
    if (lease.depositReturnedAt) {
      throw new ConflictException("La caution a déjà été restituée.");
    }
    const ended =
      lease.status === "EXPIRED" ||
      lease.status === "TERMINATED" ||
      (!!lease.endDate && lease.endDate.getTime() <= todayDay().getTime());
    if (!ended) {
      throw new ConflictException("La caution se restitue à la fin du bail (dernier jour atteint).");
    }
    const retained = round2(dto.retained ?? 0);
    if (retained > lease.deposit) {
      throw new BadRequestException("La retenue ne peut pas dépasser la caution.");
    }
    const { count } = await this.prisma.leaseContract.updateMany({
      where: { id: leaseId, depositReturnedAt: null },
      data: {
        depositReturnedAt: new Date(),
        depositRetained: retained,
        depositNote: dto.note ?? lease.depositNote,
      },
    });
    if (count === 0) throw new ConflictException("La caution a déjà été restituée.");
    return this.full(leaseId);
  }

  // ── Préavis ──

  /**
   * Le locataire PRINCIPAL donne congé pour tout le bail ; la date effective
   * respecte le préavis contractuel (mois bornés) sans dépasser la fin prévue.
   */
  async giveNotice(leaseId: string, user: AuthUser, dto: GiveNoticeDto) {
    const { lease, isPrincipalTenant } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isPrincipalTenant) {
      throw new ForbiddenException(
        "Seul le locataire principal peut donner congé pour tout le bail. Un colocataire qui part le signale au propriétaire (retrait par avenant).",
      );
    }
    if (lease.status !== "ACTIVE" && lease.status !== "SIGNED") {
      throw new ConflictException("Ce bail n'est pas en cours.");
    }
    if (lease.noticeGivenAt) {
      throw new ConflictException(
        `Préavis déjà donné — fin de bail le ${lease.noticeEffectiveDate?.toLocaleDateString("fr-FR", { timeZone: "UTC" })}.`,
      );
    }
    if (lease.ownerNoticeGivenAt) {
      throw new ConflictException(
        "Votre propriétaire a déjà donné congé : la fin du bail est déjà fixée.",
      );
    }

    const effective = tenantNoticeEffectiveDate(
      todayDay(),
      lease.noticePeriod,
      day(dto.desiredDate, "Date souhaitée"),
      lease.endDate,
    );

    await this.prisma.leaseContract.update({
      where: { id: leaseId },
      data: {
        noticeGivenAt: new Date(),
        noticeEffectiveDate: effective,
        noticeNote: dto.note ?? null,
        endDate: effective,
        expiryReminder7At: null,
        expiryReminder1At: null,
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

    return this.full(leaseId);
  }

  // ── Avenants ──

  /** Le propriétaire propose un avenant ; il s'applique à sa date d'effet, une fois signé. */
  async createAmendment(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: CreateAmendmentDto,
  ) {
    const { property, lease, decision } = await this.ownedLease(propertyId, leaseId, ownerId, "MANAGE");
    // Préparé par un pro : la signature bailleur revient au propriétaire.
    const byPro = decision.as === "PRO";
    if (lease.status !== "ACTIVE" && lease.status !== "SIGNED") {
      throw new ConflictException("Un avenant ne concerne qu'un bail signé et en cours.");
    }
    if (dto.newMonthlyRent == null && dto.newCharges == null && dto.newEndDate == null) {
      throw new BadRequestException("Un avenant doit modifier au moins une condition.");
    }
    const effectiveDate = day(dto.effectiveDate, "Date d'effet")!;
    if (effectiveDate.getTime() < lease.startDate.getTime()) {
      throw new BadRequestException("La date d'effet ne peut pas précéder le début du bail.");
    }
    const newEndDate = day(dto.newEndDate, "Nouvelle date de fin");
    if (newEndDate && newEndDate.getTime() <= lease.startDate.getTime()) {
      throw new BadRequestException("La nouvelle date de fin doit être postérieure au début du bail.");
    }

    const amendment = await this.prisma.leaseAmendment.create({
      data: {
        leaseId,
        effectiveDate,
        newMonthlyRent: dto.newMonthlyRent != null ? round2(dto.newMonthlyRent) : null,
        newCharges: dto.newCharges != null ? round2(dto.newCharges) : null,
        newEndDate,
        note: dto.note ?? null,
        createdById: ownerId,
        ...(byPro ? { ownerSignedAt: null } : { ownerSignedById: ownerId }),
      },
    });
    if (byPro) await this.logPro(propertyId, ownerId, "AMENDMENT_PREPARED", { leaseId, amendmentId: amendment.id });

    this.mailer
      .amendmentCreated(
        lease.tenantEmail,
        lease.tenantFirstName,
        property.title,
        `${this.tenantBase()}/ma-location`,
      )
      .catch(() => {});

    return amendment;
  }

  /** Les avenants du bail, visibles par les deux parties. */
  async listAmendments(leaseId: string, user: AuthUser) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    return this.prisma.leaseAmendment.findMany({
      where: { leaseId },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Le locataire PRINCIPAL signe l'avenant (un colocataire ne peut pas
   * engager seul le titulaire). Appliqué tout de suite si sa date d'effet est
   * atteinte, sinon par le planificateur le jour venu.
   */
  async signAmendment(leaseId: string, amendmentId: string, user: AuthUser) {
    const { lease, isPrincipalTenant } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isPrincipalTenant) throw new ForbiddenException("Seul le locataire principal signe l'avenant.");
    if (lease.status !== "ACTIVE" && lease.status !== "SIGNED") {
      throw new ConflictException("Ce bail n'est plus en cours : l'avenant ne peut plus être signé.");
    }

    const amendment = await this.prisma.leaseAmendment.findUnique({
      where: { id: amendmentId },
    });
    if (!amendment || amendment.leaseId !== leaseId) throw new NotFoundException("Avenant introuvable");
    if (amendment.tenantSignedAt) return amendment; // idempotent

    await this.prisma.leaseAmendment.updateMany({
      where: { id: amendmentId, tenantSignedAt: null },
      data: { tenantSignedAt: new Date() },
    });
    // Appliqué seulement une fois signé des DEUX côtés (avenant préparé par un pro).
    if (amendment.ownerSignedAt && amendment.effectiveDate.getTime() <= todayDay().getTime()) {
      await this.applyAmendment(amendmentId);
    }

    this.mailer
      .amendmentSigned(
        lease.property.owner.email,
        lease.property.owner.firstName,
        lease.property.title,
      )
      .catch(() => {});

    return this.prisma.leaseAmendment.findUniqueOrThrow({ where: { id: amendmentId } });
  }

  /**
   * Signature bailleur d'un avenant préparé par un professionnel : le
   * propriétaire (ou le pro POUR LE COMPTE d'un propriétaire non activé).
   */
  async signAmendmentAsOwner(propertyId: string, leaseId: string, amendmentId: string, userId: string) {
    const { lease, ctx, decision } = await this.ownedLease(propertyId, leaseId, userId, "SIGN_AMENDMENT");
    if (lease.status !== "ACTIVE" && lease.status !== "SIGNED") {
      throw new ConflictException("Ce bail n'est plus en cours : l'avenant ne peut plus être signé.");
    }
    const amendment = await this.prisma.leaseAmendment.findUnique({ where: { id: amendmentId } });
    if (!amendment || amendment.leaseId !== leaseId) throw new NotFoundException("Avenant introuvable");
    if (amendment.ownerSignedAt) return amendment; // idempotent
    const mention = decision.onBehalf ? await this.access.onBehalfMention(ctx) : null;
    await this.prisma.leaseAmendment.updateMany({
      where: { id: amendmentId, ownerSignedAt: null },
      data: { ownerSignedAt: new Date(), ownerSignedById: userId, ownerSignatureMention: mention },
    });
    if (decision.onBehalf) {
      await this.logPro(propertyId, userId, "ACTED_ON_BEHALF", { action: "SIGN_AMENDMENT", leaseId, amendmentId, mention });
    }
    if (amendment.tenantSignedAt && amendment.effectiveDate.getTime() <= todayDay().getTime()) {
      await this.applyAmendment(amendmentId);
    }
    return this.prisma.leaseAmendment.findUniqueOrThrow({ where: { id: amendmentId } });
  }

  /**
   * Applique un avenant signé au bail (une seule fois), en mémorisant les
   * valeurs précédentes : les échéances antérieures à sa date d'effet
   * restent calculées sur l'ancien loyer.
   */
  async applyAmendment(amendmentId: string): Promise<boolean> {
    return this.prisma.$transaction(async (tx) => {
      const a = await tx.leaseAmendment.findUnique({ where: { id: amendmentId } });
      if (!a || !a.tenantSignedAt || !a.ownerSignedAt || a.appliedAt) return false;
      await tx.$queryRaw`SELECT "id" FROM "LeaseContract" WHERE "id" = ${a.leaseId} FOR UPDATE`;
      const lease = await tx.leaseContract.findUniqueOrThrow({ where: { id: a.leaseId } });
      const { count } = await tx.leaseAmendment.updateMany({
        where: { id: amendmentId, appliedAt: null },
        data: {
          appliedAt: new Date(),
          prevMonthlyRent: lease.monthlyRent,
          prevCharges: lease.charges,
          prevEndDate: lease.endDate,
        },
      });
      if (count === 0) return false;
      await tx.leaseContract.update({
        where: { id: a.leaseId },
        data: {
          ...(a.newMonthlyRent != null ? { monthlyRent: a.newMonthlyRent } : {}),
          ...(a.newCharges != null ? { charges: a.newCharges } : {}),
          ...(a.newEndDate != null
            ? { endDate: a.newEndDate, expiryReminder7At: null, expiryReminder1At: null }
            : {}),
        },
      });
      return true;
    });
  }

  // ── Colocation ──

  async addCoTenant(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: CoTenantDto,
  ) {
    const { lease } = await this.ownedLease(propertyId, leaseId, ownerId, "MANAGE");
    if (!OPEN_LEASE_STATUSES.includes(lease.status)) {
      throw new ConflictException("Ce bail est terminé : impossible d'ajouter un colocataire.");
    }
    const email = normalizeEmail(dto.email);
    if (email === normalizeEmail(lease.tenantEmail)) {
      throw new BadRequestException("C'est déjà le locataire principal.");
    }
    try {
      return await this.prisma.leaseCoTenant.create({
        data: {
          leaseId,
          firstName: dto.firstName,
          lastName: dto.lastName,
          email,
          phone: dto.phone || null,
        },
      });
    } catch (e) {
      if ((e as Prisma.PrismaClientKnownRequestError)?.code === "P2002") {
        throw new ConflictException("Ce colocataire est déjà sur le bail.");
      }
      throw e;
    }
  }

  async removeCoTenant(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    coTenantId: string,
  ) {
    await this.ownedLease(propertyId, leaseId, ownerId, "MANAGE");
    const coTenant = await this.prisma.leaseCoTenant.findUnique({
      where: { id: coTenantId },
    });
    if (!coTenant || coTenant.leaseId !== leaseId) throw new NotFoundException("Colocataire introuvable");
    if (coTenant.signedAt) {
      throw new ConflictException(
        "Ce colocataire a signé : retirez-le par avenant, pas par suppression.",
      );
    }
    await this.prisma.leaseCoTenant.delete({ where: { id: coTenantId } });
    return { ok: true };
  }

  /** Le colocataire connecté (e-mail vérifié) signe sa propre ligne. */
  async signAsCoTenant(leaseId: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, emailVerifiedAt: true },
    });
    if (!user?.emailVerifiedAt) throw emailNotVerified();
    const coTenant = await this.prisma.leaseCoTenant.findFirst({
      where: { leaseId, email: { equals: normalizeEmail(user.email), mode: "insensitive" } },
      include: { lease: { select: { status: true } } },
    });
    if (!coTenant) throw new NotFoundException("Vous n'êtes pas colocataire de ce bail");
    if (!OPEN_LEASE_STATUSES.includes(coTenant.lease.status)) {
      throw new ConflictException("Ce bail est terminé : il ne peut plus être signé.");
    }
    const { lease: _lease, ...row } = coTenant;
    if (row.signedAt) return row; // idempotent
    return this.prisma.leaseCoTenant.update({
      where: { id: coTenant.id },
      data: { signedAt: new Date() },
    });
  }

  // ── Assurance habitation ──

  /** Le locataire (ou colocataire) dépose une attestation (PDF ou image, ≤ 8 Mo). */
  async addInsurance(leaseId: string, user: AuthUser, dto: InsuranceDto) {
    const { lease, isTenant } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isTenant) throw new ForbiddenException("Seul le locataire dépose l'attestation");
    if (!OPEN_LEASE_STATUSES.includes(lease.status)) {
      throw new ConflictException("Ce bail est terminé.");
    }
    assertDataUrl(dto.fileUrl, "attestation");
    const validUntil = day(dto.validUntil, "Date de validité");
    if (!validUntil || validUntil.getTime() < todayDay().getTime()) {
      throw new BadRequestException("L'attestation doit encore être valide.");
    }
    return this.prisma.insuranceCertificate.create({
      data: { leaseId, fileUrl: dto.fileUrl, validUntil },
      select: { id: true, validUntil: true, uploadedAt: true },
    });
  }

  /** Liste (sans fichiers, trop lourds) — visible par les deux parties. */
  async listInsurances(leaseId: string, user: AuthUser) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    return this.prisma.insuranceCertificate.findMany({
      where: { leaseId },
      select: { id: true, validUntil: true, uploadedAt: true },
      orderBy: { validUntil: "desc" },
    });
  }

  /** Le fichier d'une attestation, à la demande. */
  async getInsuranceFile(leaseId: string, insuranceId: string, user: AuthUser) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    const cert = await this.prisma.insuranceCertificate.findUnique({
      where: { id: insuranceId },
    });
    if (!cert || cert.leaseId !== leaseId) throw new NotFoundException("Attestation introuvable");
    return { fileUrl: cert.fileUrl };
  }

  // ── Congé donné par le propriétaire ──

  /**
   * Vente, reprise ou motif légitime — préavis légal : 3 mois meublé, 6 mois
   * nu, et le congé ne vaut que pour l'échéance du bail (pas de rupture en
   * cours de période).
   */
  async giveOwnerNotice(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: OwnerNoticeDto,
  ) {
    const { property, lease, decision } = await this.ownedLease(propertyId, leaseId, ownerId, "OWNER_NOTICE");
    if (decision.as === "PRO") await this.logPro(propertyId, ownerId, "OWNER_NOTICE_GIVEN", { leaseId, reason: dto.reason });
    if (lease.status !== "ACTIVE" && lease.status !== "SIGNED") {
      throw new ConflictException("Ce bail n'est pas en cours.");
    }
    if (lease.ownerNoticeGivenAt) {
      throw new ConflictException(
        `Congé déjà donné — fin de bail le ${lease.ownerNoticeEffectiveDate?.toLocaleDateString("fr-FR", { timeZone: "UTC" })}.`,
      );
    }
    if (lease.noticeGivenAt) {
      throw new ConflictException(
        "Le locataire a déjà donné son préavis — la fin de bail est déjà fixée.",
      );
    }

    const effective = ownerNoticeEffectiveDate(
      todayDay(),
      lease.furnished ? 3 : 6,
      day(dto.desiredDate, "Date souhaitée"),
      lease.endDate,
    );

    await this.prisma.leaseContract.update({
      where: { id: leaseId },
      data: {
        ownerNoticeGivenAt: new Date(),
        ownerNoticeEffectiveDate: effective,
        ownerNoticeReason: dto.reason,
        ownerNoticeNote: dto.note ?? null,
        endDate: effective,
        expiryReminder7At: null,
        expiryReminder1At: null,
      },
    });

    this.mailer
      .ownerNoticeGiven(
        lease.tenantEmail,
        lease.tenantFirstName,
        property.title,
        dto.reason,
        effective,
      )
      .catch(() => {});

    return this.full(leaseId);
  }

  // ── Régularisation des charges ──

  /** Comparaison annuelle provisions vs réel ; une seule par période. */
  async createChargeRegularization(
    propertyId: string,
    leaseId: string,
    ownerId: string,
    dto: ChargeRegularizationDto,
  ) {
    const { property, lease } = await this.ownedLease(propertyId, leaseId, ownerId, "MANAGE");
    if (lease.status === "DRAFT") {
      throw new ConflictException("Le bail doit être signé pour régulariser les charges.");
    }
    const existing = await this.prisma.chargeRegularization.findFirst({
      where: { leaseId, periodLabel: { equals: dto.periodLabel.trim(), mode: "insensitive" } },
    });
    if (existing) {
      throw new ConflictException(`Une régularisation existe déjà pour « ${dto.periodLabel} ».`);
    }

    const balance = round2(dto.actualCharges - dto.provisionsCollected);
    const created = await this.prisma.chargeRegularization.create({
      data: {
        leaseId,
        periodLabel: dto.periodLabel.trim(),
        provisionsCollected: dto.provisionsCollected,
        actualCharges: dto.actualCharges,
        balance,
        note: dto.note ?? null,
      },
    });

    this.mailer
      .chargeRegularization(
        lease.tenantEmail,
        lease.tenantFirstName,
        property.title,
        dto.periodLabel,
        balance,
        lease.currency,
      )
      .catch(() => {});

    return created;
  }

  /** Les régularisations du bail, visibles par les deux parties. */
  async listChargeRegularizations(leaseId: string, user: AuthUser) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    return this.prisma.chargeRegularization.findMany({
      where: { leaseId },
      orderBy: { createdAt: "desc" },
    });
  }
}
