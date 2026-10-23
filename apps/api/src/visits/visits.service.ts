import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { VisitStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { assertEmailVerified } from "../common/email-verified.util";
import { lockKey } from "../common/advisory-lock";

/** Anti-harcèlement : demandes de visite par candidat sur 24 h. */
const MAX_VISIT_REQUESTS_PER_DAY = 10;

@Injectable()
export class VisitsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  /** Le candidat propose un créneau de visite sur une annonce. */
  async request(
    requesterId: string,
    dto: { propertyId: string; proposedAt: string; note?: string | null },
  ) {
    await assertEmailVerified(this.prisma, requesterId);

    const proposedAt = new Date(dto.proposedAt);
    if (isNaN(proposedAt.getTime()) || proposedAt.getTime() < Date.now()) {
      throw new BadRequestException("Choisissez un créneau dans le futur.");
    }

    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
      include: { owner: { select: { id: true, email: true, firstName: true } } },
    });
    if (!property) throw new NotFoundException("Annonce introuvable");
    if (property.ownerId === requesterId) {
      throw new BadRequestException("Vous êtes propriétaire de cette annonce.");
    }
    if (property.status !== "PUBLISHED") {
      throw new ConflictException("Cette annonce n'est plus disponible à la visite.");
    }

    const visit = await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `visit:${requesterId}`);
      const pending = await tx.visit.count({
        where: { propertyId: dto.propertyId, requesterId, status: "REQUESTED" },
      });
      if (pending > 0) {
        throw new ConflictException(
          "Vous avez déjà une demande de visite en attente pour ce bien : attendez la réponse ou annulez-la.",
        );
      }
      const recent = await tx.visit.count({
        where: { requesterId, createdAt: { gte: new Date(Date.now() - 24 * 3600 * 1000) } },
      });
      if (recent >= MAX_VISIT_REQUESTS_PER_DAY) {
        throw new ConflictException("Trop de demandes de visite aujourd'hui — réessayez demain.");
      }
      return tx.visit.create({
        data: {
          propertyId: dto.propertyId,
          requesterId,
          proposedAt,
          note: dto.note || null,
        },
        include: { property: { select: { id: true, title: true, city: true } } },
      });
    });

    const requester = await this.prisma.user.findUnique({
      where: { id: requesterId },
      select: { firstName: true, lastName: true },
    });
    const ownerBase = (
      process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech"
    ).replace(/\/+$/, "");
    this.mailer
      .visitRequested(
        property.owner.email,
        property.owner.firstName,
        property.title,
        `${requester?.firstName ?? ""} ${requester?.lastName ?? ""}`.trim(),
        proposedAt,
        `${ownerBase}/dashboard/visites`,
      )
      .catch(() => {});

    return visit;
  }

  /** Mes demandes de visite (côté candidat). */
  my(requesterId: string) {
    return this.prisma.visit.findMany({
      where: { requesterId },
      include: {
        property: { select: { id: true, title: true, city: true, addressLine: true } },
      },
      orderBy: { proposedAt: "desc" },
      take: 500,
    });
  }

  /** Les visites demandées sur mes biens (côté propriétaire). */
  owner(ownerId: string, status?: VisitStatus) {
    return this.prisma.visit.findMany({
      where: {
        property: { ownerId },
        ...(status ? { status } : {}),
      },
      include: {
        property: { select: { id: true, title: true, city: true, addressLine: true } },
        requester: { select: { firstName: true, lastName: true, email: true, phone: true } },
      },
      orderBy: { proposedAt: "asc" },
      take: 500,
    });
  }

  /** Le propriétaire confirme ou refuse (avec message éventuel). */
  async answer(
    visitId: string,
    ownerId: string,
    dto: { status: "CONFIRMED" | "DECLINED"; ownerNote?: string | null },
  ) {
    const visit = await this.prisma.visit.findUnique({
      where: { id: visitId },
      include: {
        property: { select: { ownerId: true, title: true } },
        requester: { select: { email: true, firstName: true } },
      },
    });
    if (!visit) throw new NotFoundException("Visite introuvable");
    if (visit.property.ownerId !== ownerId) {
      throw new ForbiddenException("Cette visite ne concerne pas vos biens");
    }
    if (visit.status === "CANCELLED") {
      throw new ConflictException("Le candidat a annulé cette visite.");
    }
    if (visit.status === "DECLINED") {
      throw new ConflictException("Cette visite a déjà été refusée.");
    }
    if (visit.proposedAt.getTime() < Date.now()) {
      throw new ConflictException("Ce créneau est passé : la visite ne peut plus être modifiée.");
    }
    if (visit.status === dto.status) {
      return this.prisma.visit.findUniqueOrThrow({ where: { id: visitId } }); // idempotent
    }

    const { count } = await this.prisma.visit.updateMany({
      where: { id: visitId, status: visit.status },
      data: { status: dto.status, ownerNote: dto.ownerNote ?? visit.ownerNote },
    });
    if (count === 0) throw new ConflictException("Cette visite vient d'être modifiée : rechargez la page.");
    const updated = await this.prisma.visit.findUniqueOrThrow({ where: { id: visitId } });

    this.mailer
      .visitAnswered(
        visit.requester.email,
        visit.requester.firstName,
        visit.property.title,
        visit.proposedAt,
        dto.status === "CONFIRMED",
        dto.ownerNote ?? undefined,
      )
      .catch(() => {});

    return updated;
  }

  /** Le candidat annule sa demande. */
  async cancel(visitId: string, requesterId: string) {
    const visit = await this.prisma.visit.findUnique({ where: { id: visitId } });
    if (!visit || visit.requesterId !== requesterId) {
      throw new NotFoundException("Visite introuvable");
    }
    if (visit.status === "CANCELLED") return visit;
    return this.prisma.visit.update({
      where: { id: visitId },
      data: { status: "CANCELLED" },
    });
  }
}
