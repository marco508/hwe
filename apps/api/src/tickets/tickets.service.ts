import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TicketStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { resolveLeaseParty } from "../common/lease-party.util";
import { assertEmailVerified } from "../common/email-verified.util";
import { assertValidDataUrl } from "../common/upload.util";
import { persistPrivateFile } from "../common/file-store";
import { CreateTicketDto, ReviewTicketDto } from "./dto/ticket.dto";
import { PropertyAccessService } from "../common/property-access";

type AuthUser = { sub: string };

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly access: PropertyAccessService,
  ) {}

  /** Le locataire signale un incident sur son logement. */
  async create(leaseId: string, user: AuthUser, dto: CreateTicketDto) {
    const { lease, isTenant } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isTenant) {
      throw new ForbiddenException("Seul le locataire signale un incident");
    }
    await assertEmailVerified(this.prisma, user.sub);
    if (lease.status !== "SIGNED" && lease.status !== "ACTIVE") {
      throw new ConflictException("Les incidents se signalent sur un bail signé et en cours.");
    }
    assertValidDataUrl(dto.photoDataUrl, "photo");
    const photoDataUrl = await persistPrivateFile(dto.photoDataUrl);

    const ticket = await this.prisma.ticket.create({
      data: {
        leaseId,
        authorId: user.sub,
        title: dto.title,
        description: dto.description,
        photoDataUrl,
      },
    });

    const ownerBase = (
      process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech"
    ).replace(/\/+$/, "");
    this.mailer
      .ticketOpened(
        lease.property.owner.email,
        lease.property.owner.firstName,
        lease.property.title,
        dto.title,
        `${ownerBase}/dashboard/tickets`,
      )
      .catch(() => {});

    return ticket;
  }

  /** Les incidents du bail, visibles par les deux parties. */
  async listForLease(leaseId: string, user: AuthUser) {
    await resolveLeaseParty(this.prisma, leaseId, user);
    return this.prisma.ticket.findMany({
      where: { leaseId },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  }

  /** Vue locataire : tous les incidents que j'ai ouverts. */
  my(userId: string) {
    return this.prisma.ticket.findMany({
      where: { authorId: userId },
      include: {
        lease: { select: { property: { select: { id: true, title: true } } } },
      },
      orderBy: { createdAt: "desc" },
      take: 500,
    });
  }

  /** Vue propriétaire (et pro) : les incidents sur tous les biens accessibles. */
  async owner(ownerId: string, status?: TicketStatus) {
    const propertyWhere = await this.access.propertyWhere(ownerId, "READ");
    return this.prisma.ticket.findMany({
      where: {
        lease: { property: propertyWhere },
        ...(status ? { status } : {}),
      },
      include: {
        lease: {
          select: {
            id: true,
            tenantFirstName: true,
            tenantLastName: true,
            property: { select: { id: true, title: true, city: true } },
          },
        },
        author: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 500,
    });
  }

  /** Le propriétaire fait avancer le ticket : en cours, puis résolu. */
  async review(ticketId: string, ownerId: string, dto: ReviewTicketDto) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        lease: { include: { property: { select: { id: true, ownerId: true } } } },
        author: { select: { email: true, firstName: true } },
      },
    });
    if (!ticket) throw new NotFoundException("Incident introuvable");
    const { decision } = await this.access.check(ticket.lease.property.id, ownerId, "MANAGE");
    if (!decision.allowed) {
      throw new ForbiddenException({
        statusCode: 403,
        code: decision.code,
        message: decision.as === "NONE" ? "Cet incident ne concerne pas vos biens" : decision.message,
      });
    }

    const resolved = dto.status === "RESOLVED";
    const updated = await this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: dto.status,
        resolutionNote: dto.resolutionNote ?? ticket.resolutionNote,
        resolvedAt: resolved ? new Date() : null,
        handledById: ownerId,
      },
    });
    if (decision.as === "PRO") {
      const m = await this.access.activeMandate(ticket.lease.property.id);
      if (m) await this.access.logEvent(m.id, ownerId, "TICKET_UPDATED", { ticketId, status: dto.status }).catch(() => {});
    }

    if (resolved && ticket.status !== "RESOLVED") {
      this.mailer
        .ticketResolved(ticket.author.email, ticket.author.firstName, ticket.title)
        .catch(() => {});
    }
    return updated;
  }
}
