import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { LeaseDurationUnit } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateInquiryDto } from "./dto/create-inquiry.dto";
import { ConversationsService } from "../conversations/conversations.service";
import { MailerService } from "../mail/mailer.service";
import { assertEmailVerified } from "../common/email-verified.util";
import { normalizeEmail } from "../common/email.util";
import { agencyLogoUrl } from "../common/media.util";
import { lockKey } from "../common/advisory-lock";
import { addDays, addMonths, today as todayDay, toDay } from "../common/dates";
import { assertNoLeaseOverlap } from "../leases/lease-db.util";
import { round2 } from "../leases/lease-rules";
import { PropertyAccessService, accessDenied } from "../common/property-access";

/**
 * Conditions du bail brouillon généré à l'acceptation (pur, testé).
 *  - durée en jours/semaines → location courte : une seule échéance du
 *    TOTAL (tarif × durée), caution = celle saisie sur l'annonce, sinon 0 ;
 *  - sinon loyer mensuel (grille MONTHS/YEARS ou prix de l'annonce), caution
 *    = celle de l'annonce, sinon 1 mois (nu) ou 2 mois (meublé).
 * La fin est le DERNIER jour d'occupation (début + durée - 1 jour).
 */
export function draftLeaseTerms(
  property: {
    price: number;
    furnished: boolean;
    deposit: number | null;
    chargesIncluded: boolean | null;
    chargesAmount: number | null;
    pricingRates: Array<{ unit: LeaseDurationUnit; amount: number }>;
  },
  inquiry: {
    desiredStartDate: Date | null;
    leaseDuration: number | null;
    leaseDurationUnit: LeaseDurationUnit | null;
  },
  today: Date,
) {
  // Date souhaitée déjà passée au moment de l'acceptation : départ aujourd'hui.
  const desired = toDay(inquiry.desiredStartDate);
  const start = desired && desired.getTime() > today.getTime() ? desired : today;
  const n = inquiry.leaseDuration ?? null;
  const unit = inquiry.leaseDurationUnit ?? "MONTHS";
  let endExclusive: Date | null = null;
  if (n) {
    switch (unit) {
      case "DAYS": endExclusive = addDays(start, n); break;
      case "WEEKS": endExclusive = addDays(start, n * 7); break;
      case "YEARS": endExclusive = addMonths(start, n * 12); break;
      default: endExclusive = addMonths(start, n);
    }
  }
  const endDate = endExclusive ? addDays(endExclusive, -1) : null;
  const rate = property.pricingRates.find((r) => r.unit === unit);
  const shortStay = !!n && (unit === "DAYS" || unit === "WEEKS");

  if (shortStay) {
    const perUnit =
      rate?.amount ??
      (unit === "DAYS" ? property.price / 30 : (property.price * 7) / 30);
    const stayTotal = round2(perUnit * n!);
    return {
      startDate: start,
      endDate,
      shortStay: true,
      stayTotal,
      monthlyRent: stayTotal,
      charges: 0,
      deposit: round2(property.deposit ?? 0),
    };
  }

  let monthlyRent = property.price;
  if (rate && unit === "MONTHS") monthlyRent = rate.amount;
  else if (rate && unit === "YEARS") monthlyRent = rate.amount / 12;
  else if (!monthlyRent) {
    const monthly = property.pricingRates.find((r) => r.unit === "MONTHS");
    const yearly = property.pricingRates.find((r) => r.unit === "YEARS");
    monthlyRent = monthly?.amount ?? (yearly ? yearly.amount / 12 : 0);
  }
  monthlyRent = round2(monthlyRent);
  const charges = property.chargesIncluded ? 0 : round2(property.chargesAmount ?? 0);
  return {
    startDate: start,
    endDate,
    shortStay: false,
    stayTotal: null,
    monthlyRent,
    charges,
    deposit: round2(property.deposit ?? monthlyRent * (property.furnished ? 2 : 1)),
  };
}

const propertySummary = {
  select: {
    id: true,
    title: true,
    city: true,
    price: true,
    currency: true,
    listingType: true,
    status: true,
  },
} as const;

const senderSelect = {
  select: {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    avatarKey: true,
  },
} as const;

@Injectable()
export class InquiriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly conversations: ConversationsService,
    private readonly mailer: MailerService,
    private readonly access: PropertyAccessService,
  ) {}

  private ownerBase(): string {
    return (process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech").replace(/\/+$/, "");
  }

  async create(senderId: string, dto: CreateInquiryDto) {
    await assertEmailVerified(this.prisma, senderId);
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
      include: { owner: { select: { email: true, firstName: true } } },
    });
    if (!property) throw new NotFoundException("Bien introuvable");

    // Un propriétaire ne peut pas envoyer de demande sur son propre bien.
    if (property.ownerId === senderId) {
      throw new BadRequestException(
        "Vous ne pouvez pas envoyer de demande sur votre propre bien.",
      );
    }
    if ((await this.access.check(property.id, senderId, "READ")).decision.allowed) {
      throw new BadRequestException("Vous gérez ce bien : vous ne pouvez pas y candidater.");
    }

    // Un bien doit être publié pour recevoir des demandes.
    if (property.status !== "PUBLISHED") {
      throw new ConflictException(
        "Ce bien n'accepte pas de nouvelles demandes pour le moment.",
      );
    }

    const desiredStartDate = dto.desiredStartDate ? toDay(dto.desiredStartDate) : null;
    if (dto.desiredStartDate && !desiredStartDate) {
      throw new BadRequestException("Date de début souhaitée invalide.");
    }

    // Une seule demande en attente par locataire+bien (verrou : pas de doublon
    // en cas de double clic).
    const created = await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `inquiry:${senderId}:${dto.propertyId}`);
      const existing = await tx.inquiry.findFirst({
        where: { propertyId: dto.propertyId, senderId, status: "PENDING" },
      });
      if (existing) {
        throw new ConflictException("Vous avez déjà une demande en attente pour ce bien.");
      }
      return tx.inquiry.create({
        data: {
          propertyId: dto.propertyId,
          senderId,
          message: dto.message,
          contactEmail: normalizeEmail(dto.contactEmail),
          contactPhone: dto.contactPhone || null,
          shareDossier: dto.shareDossier ?? false,
          desiredStartDate,
          leaseDuration: dto.leaseDuration ?? null,
          leaseDurationUnit: dto.leaseDurationUnit ?? null,
        },
      });
    });

    // Le propriétaire est prévenu par e-mail (sinon il ne sait jamais
    // qu'on l'a contacté tant qu'il ne se connecte pas).
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      select: { firstName: true, lastName: true },
    });
    const ownerBase = (process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech").replace(/\/+$/, "");
    this.mailer
      .inquiryReceived(
        property.owner.email,
        property.owner.firstName,
        property.title,
        sender ? `${sender.firstName} ${sender.lastName}` : "Un visiteur",
        `${ownerBase}/dashboard/inquiries`,
      )
      .catch(() => {});
    // Bien géré : le pro (agent assigné, sinon responsables) est aussi prévenu.
    for (const r of await this.access.proRecipients(property.id)) {
      this.mailer
        .inquiryReceived(r.email, r.firstName, property.title, sender ? `${sender.firstName} ${sender.lastName}` : "Un visiteur", `${ownerBase}/dashboard/inquiries`)
        .catch(() => {});
    }

    // Crée automatiquement le fil de discussion avec le message initial.
    let conversationId: string | null = null;
    try {
      conversationId = (await this.conversations.getOrCreateForInquiry(created.id)).id;
    } catch {
      /* la création de l'inquiry reste valide même si la conversation
         ne se crée pas (cas limite : utilisateur supprimé entre temps) */
    }

    return { ...created, conversationId };
  }

  // Tenant cancels their own PENDING inquiry
  async cancel(inquiryId: string, senderId: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
    });
    if (!inquiry || inquiry.senderId !== senderId) throw new NotFoundException("Demande introuvable");
    const { count } = await this.prisma.inquiry.updateMany({
      where: { id: inquiryId, status: "PENDING" },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    });
    if (count === 0) throw new ConflictException("Seules les demandes en attente peuvent être annulées");
    return this.findFull(inquiryId);
  }

  /**
   * Le propriétaire accepte ou refuse — atomique : la demande doit être
   * encore en attente AU MOMENT de l'écriture (double clic, deux onglets).
   * Acceptation : les autres demandes en attente sur le bien sont déclinées ;
   * location : un bail BROUILLON est préparé (le bien ne passe en RENTED qu'à
   * la double signature).
   */
  async respond(
    inquiryId: string,
    userId: string,
    decision: "ACCEPTED" | "REJECTED",
  ) {
    const inquiry = await this.loadForDecision(inquiryId);
    // Propriétaire : accepte ou refuse. Pro : refuse ; accepter exige l'accord
    // du propriétaire (POST /inquiries/:id/propose), sauf propriétaire non
    // activé (le pro accepte alors pour son compte).
    const { decision: access } = await this.access.check(
      inquiry.property.id,
      userId,
      decision === "ACCEPTED" ? "ACCEPT_TENANT" : "REJECT_INQUIRY",
    );
    if (!access.allowed) {
      if (access.as === "NONE") throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");
      throw accessDenied(access);
    }
    if (inquiry.status !== "PENDING")
      throw new ConflictException("Cette demande a déjà été traitée");

    if (decision === "REJECTED") {
      const { count } = await this.prisma.inquiry.updateMany({
        where: { id: inquiryId, status: "PENDING" },
        data: { status: "REJECTED", resolvedAt: new Date() },
      });
      if (count === 0) throw new ConflictException("Cette demande a déjà été traitée");
      if (access.as === "PRO") await this.logPro(inquiry.property.id, userId, "INQUIRY_REJECTED", { inquiryId });
      return this.findFull(inquiryId);
    }

    await this.accept(inquiry, access.as === "PRO" ? userId : null);
    if (access.onBehalf) {
      await this.prisma.inquiry.update({
        where: { id: inquiryId },
        data: { ownerDecision: "APPROVED", ownerDecisionAt: new Date(), ownerDecisionNote: "Approuvé par le mandataire pour le compte du propriétaire (compte non activé)." },
      });
      await this.logPro(inquiry.property.id, userId, "ACTED_ON_BEHALF", { action: "ACCEPT_TENANT", inquiryId });
    }
    return this.findFull(inquiryId);
  }

  private async loadForDecision(inquiryId: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      include: {
        property: { include: { pricingRates: true } },
        sender: { select: { id: true, email: true, firstName: true, lastName: true, phone: true } },
      },
    });
    if (!inquiry) throw new NotFoundException("Demande introuvable");
    return inquiry;
  }

  private async logPro(propertyId: string, actorId: string, kind: string, data: Record<string, unknown>) {
    const m = await this.access.activeMandate(propertyId);
    if (m) await this.access.logEvent(m.id, actorId, kind, data as never).catch(() => {});
  }

  /**
   * Acceptation effective (logique historique) : la demande passe ACCEPTED,
   * bail brouillon pour une location, autres demandes en attente déclinées.
   * `preparedById` : pro à l'origine (le brouillon l'indique).
   */
  private async accept(
    inquiry: Awaited<ReturnType<InquiriesService["loadForDecision"]>>,
    preparedById: string | null,
  ) {
    const inquiryId = inquiry.id;
    if (inquiry.status !== "PENDING")
      throw new ConflictException("Cette demande a déjà été traitée");

    // Une annonce « location meublée » est meublée même si la case n'a pas été cochée.
    const property = {
      ...inquiry.property,
      furnished: inquiry.property.furnished || inquiry.property.rentalKind === "FURNISHED",
    };
    if (property.status !== "PUBLISHED") {
      throw new ConflictException("Ce bien n'est plus disponible (loué, vendu ou retiré).");
    }

    await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `property:${property.id}`);
      const { count } = await tx.inquiry.updateMany({
        where: { id: inquiryId, status: "PENDING" },
        data: { status: "ACCEPTED", resolvedAt: new Date() },
      });
      if (count === 0) throw new ConflictException("Cette demande a déjà été traitée");

      // ── Location : brouillon de bail ─────────────────────────────────
      // (Vente : pas de bail, le compromis se fait chez le notaire ; le
      // propriétaire passe l'annonce en SOLD une fois la vente conclue.)
      if (property.listingType === "RENT") {
        const terms = draftLeaseTerms(property, inquiry, todayDay());
        await assertNoLeaseOverlap(tx, property.id, terms.startDate, terms.endDate);
        const tenant = inquiry.sender;
        const lease = await tx.leaseContract.create({
          data: {
            propertyId: property.id,
            status: "DRAFT",
            tenantFirstName: tenant.firstName,
            tenantLastName: tenant.lastName,
            // E-mail VÉRIFIÉ du compte candidat (et non l'adresse de contact libre).
            tenantEmail: normalizeEmail(tenant.email),
            tenantPhone: inquiry.contactPhone ?? tenant.phone ?? null,
            currency: property.currency || "EUR",
            monthlyRent: terms.monthlyRent,
            charges: terms.charges,
            deposit: terms.deposit,
            shortStay: terms.shortStay,
            stayTotal: terms.stayTotal,
            startDate: terms.startDate,
            endDate: terms.endDate,
            noticePeriod: property.noticeMonths ?? 1,
            rentPaymentDay: 1,
            furnished: property.furnished,
            preparedById,
          },
        });
        await tx.inquiry.update({ where: { id: inquiryId }, data: { leaseId: lease.id } });
      }

      // Les autres demandes en attente sur ce bien sont déclinées.
      await tx.inquiry.updateMany({
        where: { propertyId: property.id, status: "PENDING", id: { not: inquiryId } },
        data: { status: "REJECTED", resolvedAt: new Date() },
      });
    });
  }

  /**
   * Le pro PROPOSE le candidat au propriétaire, qui décidera
   * (POST /inquiries/:id/owner-decision). Propriétaire prévenu par e-mail.
   */
  async propose(inquiryId: string, userId: string, note?: string | null) {
    const inquiry = await this.loadForDecision(inquiryId);
    const { decision } = await this.access.check(inquiry.property.id, userId, "PROPOSE_TENANT");
    if (!decision.allowed) throw accessDenied(decision);
    if (decision.as !== "PRO") {
      throw new BadRequestException("En tant que propriétaire, acceptez directement la demande.");
    }
    if (inquiry.status !== "PENDING") throw new ConflictException("Cette demande a déjà été traitée");
    const { count } = await this.prisma.inquiry.updateMany({
      where: { id: inquiryId, status: "PENDING" },
      data: {
        proposedAt: new Date(),
        proposedById: userId,
        proposalNote: note?.trim() || null,
        ownerDecision: null,
        ownerDecisionAt: null,
        ownerDecisionNote: null,
      },
    });
    if (count === 0) throw new ConflictException("Cette demande a déjà été traitée");
    await this.logPro(inquiry.property.id, userId, "TENANT_PROPOSED", {
      inquiryId,
      candidate: `${inquiry.sender.firstName} ${inquiry.sender.lastName}`,
      note: note?.trim() || null,
    });
    const [owner, pro] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: inquiry.property.ownerId }, select: { email: true, firstName: true } }),
      this.access.proLabel(userId),
    ]);
    if (owner) {
      this.mailer
        .candidateProposed(
          owner.email,
          owner.firstName,
          inquiry.property.title,
          `${inquiry.sender.firstName} ${inquiry.sender.lastName}`,
          pro.agencyName ?? pro.name,
          note?.trim() || null,
          `${this.ownerBase()}/dashboard/inquiries`,
        )
        .catch(() => {});
    }
    return this.findFull(inquiryId);
  }

  /**
   * Décision du propriétaire sur un candidat (proposé ou non) :
   * APPROVED = acceptation réelle (même logique que respond ACCEPTED),
   * DECLINED = demande refusée. Un pro ne décide que pour le compte d'un
   * propriétaire non activé (ACTED_ON_BEHALF).
   */
  async ownerDecision(inquiryId: string, userId: string, decisionValue: "APPROVED" | "DECLINED", note?: string | null) {
    const inquiry = await this.loadForDecision(inquiryId);
    const { decision } = await this.access.check(inquiry.property.id, userId, "ACCEPT_TENANT");
    if (!decision.allowed) {
      if (decision.as === "NONE") throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");
      throw accessDenied(decision);
    }
    if (inquiry.status !== "PENDING") throw new ConflictException("Cette demande a déjà été traitée");
    const decisionData = {
      ownerDecision: decisionValue,
      ownerDecisionAt: new Date(),
      ownerDecisionNote: note?.trim() || null,
    };
    if (decisionValue === "DECLINED") {
      const { count } = await this.prisma.inquiry.updateMany({
        where: { id: inquiryId, status: "PENDING" },
        data: { status: "REJECTED", resolvedAt: new Date(), ...decisionData },
      });
      if (count === 0) throw new ConflictException("Cette demande a déjà été traitée");
    } else {
      await this.accept(inquiry, inquiry.proposedById ?? (decision.as === "PRO" ? userId : null));
      await this.prisma.inquiry.update({ where: { id: inquiryId }, data: decisionData });
    }
    const m = await this.access.activeMandate(inquiry.property.id);
    if (m) {
      await this.access
        .logEvent(m.id, userId, decisionValue === "APPROVED" ? "TENANT_APPROVED" : "TENANT_DECLINED", {
          inquiryId,
          note: note?.trim() || null,
        })
        .catch(() => {});
      if (decision.onBehalf) {
        await this.access
          .logEvent(m.id, userId, "ACTED_ON_BEHALF", { action: decisionValue === "APPROVED" ? "APPROVE_TENANT" : "DECLINE_TENANT", inquiryId })
          .catch(() => {});
      }
    }
    return this.findFull(inquiryId);
  }

  /** Identifiant de conversation de chaque demande (fil propriétaire ↔ candidat). */
  private async withConversationIds<T extends { id: string; propertyId: string; senderId: string; property: { id: string } }>(
    items: T[],
    ownerOf: (i: T) => string | undefined,
  ): Promise<Array<T & { conversationId: string | null }>> {
    if (items.length === 0) return [];
    const convs = await this.prisma.conversation.findMany({
      where: {
        OR: [
          { inquiryId: { in: items.map((i) => i.id) } },
          {
            propertyId: { in: [...new Set(items.map((i) => i.propertyId))] },
            otherUserId: { in: [...new Set(items.map((i) => i.senderId))] },
          },
        ],
      },
      select: { id: true, inquiryId: true, propertyId: true, otherUserId: true, ownerId: true },
    });
    return items.map((i) => {
      const direct = convs.find((c) => c.inquiryId === i.id);
      const byTriple = convs.find(
        (c) =>
          c.propertyId === i.propertyId &&
          c.otherUserId === i.senderId &&
          (!ownerOf(i) || c.ownerId === ownerOf(i)),
      );
      return { ...i, conversationId: (direct ?? byTriple)?.id ?? null };
    });
  }

  private async findFull(inquiryId: string) {
    const inq = await this.prisma.inquiry.findUniqueOrThrow({
      where: { id: inquiryId },
      include: {
        property: { select: { ...propertySummary.select, ownerId: true } },
        sender: senderSelect,
      },
    });
    const [withConv] = await this.withConversationIds([inq], (i) => i.property.ownerId);
    const [decorated] = await this.withProposal([withConv!]);
    return decorated;
  }

  /** `proposedBy` (pro auteur de la proposition) et `managedBy` (agence) de chaque demande. */
  private async withProposal<T extends { propertyId: string; proposedById: string | null }>(items: T[]) {
    if (items.length === 0) return [] as Array<T & { proposedBy: unknown; managedBy: unknown }>;
    const proIds = [...new Set(items.map((i) => i.proposedById).filter((x): x is string => !!x))];
    const [pros, mandates] = await Promise.all([
      proIds.length
        ? this.prisma.user.findMany({
            where: { id: { in: proIds } },
            select: { id: true, firstName: true, lastName: true, agencyMember: { select: { agency: { select: { name: true } } } } },
          })
        : Promise.resolve([]),
      this.prisma.mandate.findMany({
        where: { propertyId: { in: [...new Set(items.map((i) => i.propertyId))] }, status: "ACTIVE" },
        select: { propertyId: true, reference: true, agency: { select: { id: true, name: true, slug: true, logoKey: true } } },
      }),
    ]);
    return items.map((i) => {
      const p = pros.find((u) => u.id === i.proposedById);
      const m = mandates.find((x) => x.propertyId === i.propertyId);
      return {
        ...i,
        proposedBy: p ? { id: p.id, firstName: p.firstName, lastName: p.lastName, agencyName: p.agencyMember?.agency.name ?? null } : null,
        managedBy: m
          ? { agencyId: m.agency.id, name: m.agency.name, slug: m.agency.slug, logoUrl: agencyLogoUrl(m.agency.logoKey), mandateReference: m.reference }
          : null,
      };
    });
  }

  // For tenants: their sent inquiries
  async listSent(senderId: string) {
    const items = await this.prisma.inquiry.findMany({
      where: { senderId },
      orderBy: { createdAt: "desc" },
      include: { property: { select: { ...propertySummary.select, ownerId: true } } },
      take: 500,
    });
    return this.withConversationIds(items, (i) => i.property.ownerId);
  }

  // For owners (and pros): inquiries received on accessible properties
  async listReceived(userId: string) {
    const propertyWhere = await this.access.propertyWhere(userId, "READ");
    const items = await this.prisma.inquiry.findMany({
      where: { property: propertyWhere },
      orderBy: { createdAt: "desc" },
      include: { property: { select: { ...propertySummary.select, ownerId: true } }, sender: senderSelect },
      take: 500,
    });
    return this.withProposal(await this.withConversationIds(items, (i) => i.property.ownerId));
  }

  /**
   * Dossier de candidature : documents du profil du candidat, s'il l'a
   * partagé, et seulement tant que la demande est en attente ou acceptée
   * (plus rien après un refus ou une annulation).
   */
  async getDossier(inquiryId: string, ownerId: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      include: { property: { select: { id: true, ownerId: true } } },
    });
    if (!inquiry) throw new NotFoundException("Demande introuvable");
    const { decision } = await this.access.check(inquiry.property.id, ownerId, "READ");
    if (!decision.allowed) {
      throw new ForbiddenException({ statusCode: 403, code: decision.code, message: "Cette demande ne concerne pas vos biens" });
    }
    if (!inquiry.shareDossier) {
      throw new ForbiddenException("Le candidat n'a pas partagé son dossier.");
    }
    if (inquiry.status !== "PENDING" && inquiry.status !== "ACCEPTED") {
      throw new ForbiddenException("Cette demande est close : le dossier n'est plus accessible.");
    }
    return this.prisma.userDocument.findMany({
      where: { userId: inquiry.senderId },
      orderBy: { createdAt: "desc" },
    });
  }
}
