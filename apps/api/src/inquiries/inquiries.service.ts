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
import { lockKey } from "../common/advisory-lock";
import { addDays, addMonths, today as todayDay, toDay } from "../common/dates";
import { assertNoLeaseOverlap } from "../leases/lease-db.util";
import { round2 } from "../leases/lease-rules";

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
  ) {}

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
    ownerId: string,
    decision: "ACCEPTED" | "REJECTED",
  ) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      include: {
        property: { include: { pricingRates: true } },
        sender: { select: { id: true, email: true, firstName: true, lastName: true, phone: true } },
      },
    });

    if (!inquiry) throw new NotFoundException("Demande introuvable");
    if (inquiry.property.ownerId !== ownerId)
      throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");
    if (inquiry.status !== "PENDING")
      throw new ConflictException("Cette demande a déjà été traitée");

    if (decision === "REJECTED") {
      const { count } = await this.prisma.inquiry.updateMany({
        where: { id: inquiryId, status: "PENDING" },
        data: { status: "REJECTED", resolvedAt: new Date() },
      });
      if (count === 0) throw new ConflictException("Cette demande a déjà été traitée");
      return this.findFull(inquiryId);
    }

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
    return withConv;
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

  // For owners: inquiries received on their properties
  async listReceived(ownerId: string) {
    const items = await this.prisma.inquiry.findMany({
      where: { property: { ownerId } },
      orderBy: { createdAt: "desc" },
      include: { property: propertySummary, sender: senderSelect },
      take: 500,
    });
    return this.withConversationIds(items, () => ownerId);
  }

  /**
   * Dossier de candidature : documents du profil du candidat, s'il l'a
   * partagé, et seulement tant que la demande est en attente ou acceptée
   * (plus rien après un refus ou une annulation).
   */
  async getDossier(inquiryId: string, ownerId: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      include: { property: { select: { ownerId: true } } },
    });
    if (!inquiry) throw new NotFoundException("Demande introuvable");
    if (inquiry.property.ownerId !== ownerId) {
      throw new ForbiddenException("Cette demande ne concerne pas vos biens");
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
