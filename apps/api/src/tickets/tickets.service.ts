import {
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
import { CreateTicketDto, ReviewTicketDto } from "./dto/ticket.dto";

type AuthUser = { sub: string; email: string };

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  /** Le locataire signale un incident sur son logement. */
  async create(leaseId: string, user: AuthUser, dto: CreateTicketDto) {
    const { lease, isTenant } = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!isTenant) {
      throw new ForbiddenException("Seul le locataire signale un incident");
    }
    await assertEmailVerified(this.prisma, user.sub);
    assertValidDataUrl(dto.photoDataUrl, "photo");

    const ticket = await this.prisma.ticket.create({
      data: {
        leaseId,
        authorId: user.sub,
        title: dto.title,
        description: dto.description,
        photoDataUrl: dto.photoDataUrl || null,
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
    });
  }

  /** Vue propriétaire : les incidents sur tous mes biens. */
  owner(ownerId: string, status?: TicketStatus) {
    return this.prisma.ticket.findMany({
      where: {
        lease: { property: { ownerId } },
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
    });
  }

  /** Le propriétaire fait avancer le ticket : en cours, puis résolu. */
  async review(ticketId: string, ownerId: string, dto: ReviewTicketDto) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        lease: { include: { property: true } },
        author: { select: { email: true, firstName: true } },
      },
    });
    if (!ticket) throw new NotFoundException("Incident introuvable");
    if (ticket.lease.property.ownerId !== ownerId) {
      throw new ForbiddenException("Cet incident ne concerne pas vos biens");
    }

    const resolved = dto.status === "RESOLVED";
    const updated = await this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: dto.status,
        resolutionNote: dto.resolutionNote ?? ticket.resolutionNote,
        resolvedAt: resolved ? new Date() : null,
      },
    });

    if (resolved && ticket.status !== "RESOLVED") {
      this.mailer
        .ticketResolved(ticket.author.email, ticket.author.firstName, ticket.title)
        .catch(() => {});
    }
    return updated;
  }
}
