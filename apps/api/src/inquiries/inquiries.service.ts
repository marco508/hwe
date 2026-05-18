import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateInquiryDto } from "./dto/create-inquiry.dto";
import { ConversationsService } from "../conversations/conversations.service";

@Injectable()
export class InquiriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly conversations: ConversationsService,
  ) {}

  async create(senderId: string, dto: CreateInquiryDto) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
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
      throw new BadRequestException(
        "Ce bien n'accepte pas de nouvelles demandes pour le moment.",
      );
    }

    // Évite les doublons : une seule demande en attente par locataire+bien.
    const existing = await this.prisma.inquiry.findFirst({
      where: {
        propertyId: dto.propertyId,
        senderId,
        status: "PENDING",
      },
    });
    if (existing) {
      throw new BadRequestException(
        "Vous avez déjà une demande en attente pour ce bien.",
      );
    }

    const created = await this.prisma.inquiry.create({
      data: {
        propertyId: dto.propertyId,
        senderId,
        message: dto.message,
        contactEmail: dto.contactEmail,
        contactPhone: dto.contactPhone,
        desiredStartDate: dto.desiredStartDate ? new Date(dto.desiredStartDate) : undefined,
        leaseDuration: dto.leaseDuration,
        leaseDurationUnit: dto.leaseDurationUnit,
      },
    });

    // Crée automatiquement le fil de discussion avec le message initial.
    try {
      await this.conversations.getOrCreateForInquiry(created.id);
    } catch {
      /* la création de l'inquiry reste valide même si la conversation
         ne se crée pas (cas limite : utilisateur supprimé entre temps) */
    }

    return created;
  }

  // Tenant cancels their own PENDING inquiry
  async cancel(inquiryId: string, senderId: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
    });
    if (!inquiry) throw new NotFoundException("Demande introuvable");
    if (inquiry.senderId !== senderId)
      throw new ForbiddenException("Vous n'êtes pas l'auteur de cette demande");
    if (inquiry.status !== "PENDING")
      throw new BadRequestException("Seules les demandes en attente peuvent être annulées");

    return this.prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status: "CANCELLED", cancelledAt: new Date() },
      include: this.fullInclude(),
    });
  }

  // Owner responds to an inquiry: ACCEPTED or REJECTED
  async respond(
    inquiryId: string,
    ownerId: string,
    decision: "ACCEPTED" | "REJECTED",
  ) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      include: {
        property: { include: { pricingRates: true } },
        sender: true,
      },
    });

    if (!inquiry) throw new NotFoundException("Demande introuvable");
    if (inquiry.property.ownerId !== ownerId)
      throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");
    if (inquiry.status !== "PENDING")
      throw new BadRequestException("Cette demande a déjà été traitée");

    if (decision === "REJECTED") {
      return this.prisma.inquiry.update({
        where: { id: inquiryId },
        data: { status: "REJECTED", resolvedAt: new Date() },
        include: this.fullInclude(),
      });
    }

    // ── ACCEPTED — Vente ──────────────────────────────────────────────────
    // Pour une vente : pas de bail. On marque juste l'inquiry comme acceptée
    // et on laisse le bien en PUBLISHED (le compromis se fait hors plateforme
    // chez le notaire). Le propriétaire peut ensuite passer manuellement
    // l'annonce en SOLD depuis son tableau de bord lorsque la vente est
    // finalisée.
    if (inquiry.property.listingType === "SALE") {
      return this.prisma.inquiry.update({
        where: { id: inquiryId },
        data: { status: "ACCEPTED", resolvedAt: new Date() },
        include: this.fullInclude(),
      });
    }

    // ── ACCEPTED — Location ───────────────────────────────────────────────
    // Auto-génère un brouillon de bail et passe le bien en RENTED.
    return this.prisma.$transaction(async (tx) => {
      const property = inquiry.property;
      const tenant = inquiry.sender;

      // Calcule la date de fin à partir de la date de début et de la durée souhaitée
      const computedEndDate = inquiry.leaseDuration
        ? (() => {
            const start = inquiry.desiredStartDate
              ? new Date(inquiry.desiredStartDate)
              : new Date();
            const end = new Date(start);
            const n = inquiry.leaseDuration!;
            switch (inquiry.leaseDurationUnit) {
              case "DAYS":   end.setDate(end.getDate() + n); break;
              case "WEEKS":  end.setDate(end.getDate() + n * 7); break;
              case "YEARS":  end.setFullYear(end.getFullYear() + n); break;
              case "MONTHS":
              default:       end.setMonth(end.getMonth() + n); break;
            }
            return end;
          })()
        : undefined;

      // ── Calcul du loyer mensuel depuis la grille tarifaire ──────────────
      // Si une grille existe et que le locataire a précisé une durée+unité,
      // on calcule le montant total et on le convertit en équivalent mensuel.
      // Sinon on utilise le prix de base de l'annonce.
      let monthlyRent = property.price;
      let totalAmount: number | undefined;

      if (
        inquiry.leaseDuration &&
        inquiry.leaseDurationUnit &&
        (property as any).pricingRates?.length
      ) {
        const rates: Array<{ unit: string; amount: number }> = (property as any).pricingRates;
        const matchingRate = rates.find((r) => r.unit === inquiry.leaseDurationUnit);
        if (matchingRate) {
          totalAmount = matchingRate.amount * inquiry.leaseDuration;
          // Conversion en équivalent mensuel
          const monthsFactor: Record<string, number> = {
            DAYS:   inquiry.leaseDuration / 30,
            WEEKS:  inquiry.leaseDuration / 4.33,
            MONTHS: inquiry.leaseDuration,
            YEARS:  inquiry.leaseDuration * 12,
          };
          const months = monthsFactor[inquiry.leaseDurationUnit] ?? inquiry.leaseDuration;
          monthlyRent = months > 0 ? Math.round((totalAmount / months) * 100) / 100 : totalAmount;
        }
      }

      const lease = await tx.leaseContract.create({
        data: {
          propertyId: property.id,
          status: "DRAFT",
          tenantFirstName: tenant.firstName,
          tenantLastName: tenant.lastName,
          tenantEmail: inquiry.contactEmail,
          tenantPhone: inquiry.contactPhone ?? tenant.phone ?? undefined,
          monthlyRent,
          charges: 0,
          deposit: Math.round(monthlyRent * 2 * 100) / 100,
          startDate: inquiry.desiredStartDate ?? new Date(),
          endDate: computedEndDate,
          noticePeriod: 1,
          rentPaymentDay: 1,
          furnished: property.furnished,
        },
      });

      // Le bien passe en RENTED : il disparaît de la liste des annonces publiques
      await tx.property.update({
        where: { id: property.id },
        data: { status: "RENTED" },
      });

      const updated = await tx.inquiry.update({
        where: { id: inquiryId },
        data: {
          status: "ACCEPTED",
          resolvedAt: new Date(),
          leaseId: lease.id,
        },
        include: this.fullInclude(),
      });

      return updated;
    });
  }

  // For tenants: their sent inquiries
  async listSent(senderId: string) {
    return this.prisma.inquiry.findMany({
      where: { senderId },
      orderBy: { createdAt: "desc" },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            price: true,
            listingType: true,
          },
        },
      },
    });
  }

  // For owners: inquiries received on their properties
  async listReceived(ownerId: string) {
    return this.prisma.inquiry.findMany({
      where: { property: { ownerId } },
      orderBy: { createdAt: "desc" },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            price: true,
            listingType: true,
          },
        },
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  private fullInclude() {
    return {
      property: {
        select: {
          id: true,
          title: true,
          city: true,
          price: true,
          listingType: true,
        },
      },
      sender: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          avatarUrl: true,
        },
      },
    };
  }
}
