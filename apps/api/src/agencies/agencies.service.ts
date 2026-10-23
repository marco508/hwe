import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { AgencyRole } from "@prisma/client";
import { randomBytes } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { lockKey } from "../common/advisory-lock";
import { normalizeEmail } from "../common/email.util";
import { assertDataUrl, IMAGE_MIME, MAX_AVATAR_BYTES } from "../common/upload.util";
import { MEDIA_SELECT, agencyLogoUrl, withMediaUrl } from "../common/media.util";
import { monthEnd, monthStart, today as todayDay } from "../common/dates";
import { sumMoney } from "../common/money";
import { PropertyAccessService } from "../common/property-access";
import { derivePriceDisplay } from "../properties/properties.service";
import {
  AGENCY_INVITE_DAYS,
  agencyInviteUrl,
  createAgencyFor,
  findValidInvite,
  joinAgencyWithInvite,
  newInviteToken,
} from "./agency.util";
import { CreateAgencyDto, InviteAgentDto, UpdateAgencyDto } from "./dto/agency.dto";

/** Champs d'agence renvoyés (jamais la data-URL du logo). */
const AGENCY_SELECT = {
  id: true,
  name: true,
  slug: true,
  code: true,
  logoKey: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  country: true,
  registrationNumber: true,
  description: true,
  paymentIban: true,
  paymentHolder: true,
  createdAt: true,
  updatedAt: true,
} as const;

type AgencyRow = { logoKey: string | null } & Record<string, unknown>;

/** logoKey → logoUrl ; IBAN retiré pour la vue publique. */
export function shapeAgency<T extends AgencyRow>(a: T, opts: { publicView?: boolean } = {}) {
  const { logoKey, ...rest } = a;
  const out: Record<string, unknown> = { ...rest, logoUrl: agencyLogoUrl(logoKey) };
  if (opts.publicView) {
    delete out.paymentIban;
    delete out.paymentHolder;
  }
  return out;
}

@Injectable()
export class AgenciesService {
  private readonly logger = new Logger(AgenciesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly access: PropertyAccessService,
  ) {}

  /** Adhésion de l'utilisateur ; 404 NO_AGENCY s'il n'a pas d'agence. */
  async membership(userId: string) {
    const m = await this.prisma.agencyMember.findUnique({ where: { userId } });
    if (!m) {
      throw new NotFoundException({
        statusCode: 404,
        code: "NO_AGENCY",
        message: "Vous n'appartenez à aucune agence : créez la vôtre ou acceptez une invitation.",
      });
    }
    return m;
  }

  async managerOf(userId: string) {
    const m = await this.membership(userId);
    if (m.role !== "MANAGER") {
      throw new ForbiddenException({
        statusCode: 403,
        code: "MANAGER_ONLY",
        message: "Réservé aux responsables de l'agence.",
      });
    }
    return m;
  }

  // ─────────────────────────── Agence ───────────────────────────

  async create(userId: string, role: string, dto: CreateAgencyDto) {
    if (role !== "AGENT") {
      throw new ForbiddenException({
        statusCode: 403,
        code: "AGENT_ROLE_REQUIRED",
        message: "Seul un compte professionnel peut créer une agence.",
      });
    }
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { email: true, phone: true } });
    await this.prisma.$transaction((tx) =>
      createAgencyFor(tx, userId, {
        name: dto.name,
        email: dto.email ?? user.email,
        phone: dto.phone ?? user.phone,
        city: dto.city ?? null,
        country: dto.country ?? null,
      }),
    );
    return this.mine(userId);
  }

  /** Mon agence, mes droits et les membres. */
  async mine(userId: string) {
    const m = await this.membership(userId);
    const [agency, members, assigned] = await Promise.all([
      this.prisma.agency.findUniqueOrThrow({ where: { id: m.agencyId }, select: AGENCY_SELECT }),
      this.prisma.agencyMember.findMany({
        where: { agencyId: m.agencyId },
        orderBy: { createdAt: "asc" },
        select: {
          userId: true,
          role: true,
          createdAt: true,
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, avatarKey: true } },
        },
      }),
      this.prisma.mandate.groupBy({
        by: ["assignedAgentId"],
        where: { agencyId: m.agencyId, status: "ACTIVE" },
        _count: { _all: true },
      }),
    ]);
    const isManager = m.role === "MANAGER";
    return {
      agency: shapeAgency(agency),
      me: { userId, role: m.role, canManage: isManager },
      members: members.map((x) => ({
        ...x,
        assignedMandates: assigned.find((a) => a.assignedAgentId === x.userId)?._count._all ?? 0,
      })),
    };
  }

  async update(userId: string, dto: UpdateAgencyDto) {
    const m = await this.managerOf(userId);
    const data: Record<string, unknown> = {};
    for (const k of [
      "name", "email", "phone", "address", "city", "country", "registrationNumber",
      "description", "paymentIban", "paymentHolder",
    ] as const) {
      if (dto[k] !== undefined) data[k] = dto[k] === "" ? null : dto[k];
    }
    if (data.name === null) delete data.name;
    if (data.country === null) delete data.country;
    if (dto.logoUrl === null || dto.logoUrl === "") {
      data.logoDataUrl = null;
      data.logoKey = null;
    } else if (dto.logoUrl !== undefined) {
      if (dto.logoUrl.startsWith("data:")) {
        // Mêmes règles que l'avatar : image JPEG/PNG/WebP ≤ 2 Mo.
        assertDataUrl(dto.logoUrl, "logo", { allowed: IMAGE_MIME, maxBytes: MAX_AVATAR_BYTES });
        data.logoDataUrl = dto.logoUrl;
        data.logoKey = randomBytes(16).toString("hex");
      } else {
        const current = await this.prisma.agency.findUnique({ where: { id: m.agencyId }, select: { logoKey: true } });
        if (!current?.logoKey || dto.logoUrl !== agencyLogoUrl(current.logoKey)) {
          throw new BadRequestException("Le logo doit être une image (JPEG, PNG ou WebP) envoyée comme fichier.");
        }
      }
    }
    await this.prisma.agency.update({ where: { id: m.agencyId }, data });
    return this.mine(userId);
  }

  // ─────────────────────────── Invitations ───────────────────────────

  async invite(userId: string, dto: InviteAgentDto) {
    const m = await this.managerOf(userId);
    const email = normalizeEmail(dto.email);
    const existing = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { id: true, agencyMember: { select: { agencyId: true } } },
    });
    if (existing?.agencyMember) {
      throw new ConflictException({
        statusCode: 409,
        code: existing.agencyMember.agencyId === m.agencyId ? "ALREADY_MEMBER" : "ALREADY_IN_AGENCY",
        message:
          existing.agencyMember.agencyId === m.agencyId
            ? "Cette personne fait déjà partie de votre agence."
            : "Cette personne fait déjà partie d'une autre agence.",
      });
    }
    const { token, tokenHash } = newInviteToken();
    const invite = await this.prisma.agencyInvite.create({
      data: {
        agencyId: m.agencyId,
        email,
        role: dto.role ?? "AGENT",
        tokenHash,
        expiresAt: new Date(Date.now() + AGENCY_INVITE_DAYS * 24 * 3600 * 1000),
        createdById: userId,
      },
      select: { id: true, email: true, role: true, expiresAt: true, createdAt: true },
    });
    const inviteUrl = agencyInviteUrl(token);
    const [agency, inviter] = await Promise.all([
      this.prisma.agency.findUniqueOrThrow({ where: { id: m.agencyId }, select: { name: true } }),
      this.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { firstName: true, lastName: true } }),
    ]);
    this.mailer.agencyInvite(email, agency.name, `${inviter.firstName} ${inviter.lastName}`, inviteUrl).catch(() => {});
    // Le lien est TOUJOURS renvoyé : à copier / partager (WhatsApp), le SMTP peut manquer.
    return { invite, inviteUrl, emailSent: this.mailer.isConfigured };
  }

  async listInvites(userId: string) {
    const m = await this.managerOf(userId);
    const rows = await this.prisma.agencyInvite.findMany({
      where: { agencyId: m.agencyId },
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, role: true, expiresAt: true, acceptedAt: true, createdAt: true },
      take: 200,
    });
    const now = Date.now();
    return rows.map((r) => ({
      ...r,
      status: r.acceptedAt ? "ACCEPTED" : r.expiresAt.getTime() < now ? "EXPIRED" : "PENDING",
    }));
  }

  async revokeInvite(userId: string, inviteId: string) {
    const m = await this.managerOf(userId);
    const inv = await this.prisma.agencyInvite.findUnique({ where: { id: inviteId } });
    if (!inv || inv.agencyId !== m.agencyId) throw new NotFoundException("Invitation introuvable.");
    if (inv.acceptedAt) throw new ConflictException({ statusCode: 409, code: "INVITE_USED", message: "Invitation déjà acceptée." });
    await this.prisma.agencyInvite.delete({ where: { id: inviteId } });
    return { ok: true };
  }

  /** Page publique d'invitation. */
  async inviteInfo(token: string) {
    const invite = await findValidInvite(this.prisma, token);
    return {
      agencyName: invite.agency.name,
      agencySlug: invite.agency.slug,
      agencyLogoUrl: agencyLogoUrl(invite.agency.logoKey),
      email: invite.email,
      role: invite.role,
      expiresAt: invite.expiresAt,
    };
  }

  async acceptInvite(userId: string, role: string, token: string) {
    if (role !== "AGENT") {
      throw new ForbiddenException({
        statusCode: 403,
        code: "AGENT_ROLE_REQUIRED",
        message: "Cette invitation se rejoint avec un compte professionnel : inscrivez-vous comme professionnel avec l'adresse invitée.",
      });
    }
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { id: true, email: true } });
    await this.prisma.$transaction((tx) => joinAgencyWithInvite(tx, user, token));
    return this.mine(userId);
  }

  // ─────────────────────────── Membres ───────────────────────────

  async setMemberRole(userId: string, memberUserId: string, role: AgencyRole) {
    const m = await this.managerOf(userId);
    await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `agency:${m.agencyId}`);
      const target = await tx.agencyMember.findUnique({ where: { userId: memberUserId } });
      if (!target || target.agencyId !== m.agencyId) throw new NotFoundException("Membre introuvable.");
      if (target.role === role) return;
      if (target.role === "MANAGER" && role !== "MANAGER") {
        const managers = await tx.agencyMember.count({ where: { agencyId: m.agencyId, role: "MANAGER" } });
        if (managers <= 1) throw this.lastManager();
      }
      await tx.agencyMember.update({ where: { userId: memberUserId }, data: { role } });
    });
    return this.mine(userId);
  }

  async removeMember(userId: string, memberUserId: string) {
    const m = await this.managerOf(userId);
    await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `agency:${m.agencyId}`);
      const target = await tx.agencyMember.findUnique({ where: { userId: memberUserId } });
      if (!target || target.agencyId !== m.agencyId) throw new NotFoundException("Membre introuvable.");
      if (target.role === "MANAGER") {
        const managers = await tx.agencyMember.count({ where: { agencyId: m.agencyId, role: "MANAGER" } });
        if (managers <= 1) throw this.lastManager();
      }
      // Ses biens assignés reviennent au responsable (non assignés).
      const mandates = await tx.mandate.findMany({
        where: { agencyId: m.agencyId, assignedAgentId: memberUserId, status: { in: ["ACTIVE", "PENDING_OWNER"] } },
        select: { id: true },
      });
      await tx.mandate.updateMany({
        where: { id: { in: mandates.map((x) => x.id) } },
        data: { assignedAgentId: null },
      });
      for (const x of mandates) {
        await tx.mandateEvent.create({
          data: { mandateId: x.id, actorId: userId, kind: "AGENT_ASSIGNED", data: { assignedAgentId: null, reason: "MEMBER_REMOVED" } },
        });
      }
      await tx.agencyMember.delete({ where: { userId: memberUserId } });
    });
    return this.mine(userId);
  }

  private lastManager() {
    return new ConflictException({
      statusCode: 409,
      code: "LAST_MANAGER",
      message: "L'agence doit garder au moins un responsable : nommez-en un autre d'abord.",
    });
  }

  // ─────────────────────────── Public ───────────────────────────

  /** Recherche d'agence par nom ou code (« Confier un bien à un professionnel »). */
  async search(q?: string) {
    const term = (q ?? "").trim().slice(0, 100);
    if (term.length < 2) return [];
    const rows = await this.prisma.agency.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { code: { equals: term.toUpperCase() } },
          { slug: { equals: term.toLowerCase() } },
        ],
      },
      select: { id: true, name: true, slug: true, code: true, logoKey: true, city: true, country: true },
      take: 20,
      orderBy: { name: "asc" },
    });
    return rows.map((r) => shapeAgency(r));
  }

  /** Page publique d'une agence : profil et biens publiés qu'elle gère. */
  async publicProfile(slug: string) {
    const agency = await this.prisma.agency.findUnique({ where: { slug }, select: AGENCY_SELECT });
    if (!agency) throw new NotFoundException("Agence introuvable.");
    const today = todayDay();
    const properties = await this.prisma.property.findMany({
      where: {
        status: "PUBLISHED",
        mandates: {
          some: { agencyId: agency.id, status: "ACTIVE", OR: [{ endDate: null }, { endDate: { gte: today } }] },
        },
      },
      include: {
        media: { orderBy: { position: "asc" }, take: 1, select: MEDIA_SELECT },
        owner: { select: { id: true, firstName: true, lastName: true, avatarKey: true } },
        pricingRates: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    const managedBy = { agencyId: agency.id, name: agency.name, slug: agency.slug, logoUrl: agencyLogoUrl(agency.logoKey) };
    const { createdAt: _c, updatedAt: _u, ...pub } = agency;
    return {
      ...shapeAgency(pub, { publicView: true }),
      properties: properties.map(({ soldPrice: _s, ...p }) => ({
        ...p,
        media: p.media.map(withMediaUrl),
        ...derivePriceDisplay(p),
        managedBy,
      })),
    };
  }

  // ─────────────────────────── Tableau de bord ───────────────────────────

  async overview(userId: string) {
    const m = await this.membership(userId);
    const isManager = m.role === "MANAGER";
    const propertyIds = await this.access.managedPropertyIds(userId, "LEASE_READ");
    const readIds = await this.access.managedPropertyIds(userId, "READ");
    const now = new Date();
    const today = todayDay(now);
    const from = monthStart(today.getUTCFullYear(), today.getUTCMonth() + 1);
    const to = monthEnd(today.getUTCFullYear(), today.getUTCMonth() + 1);
    const mandateScope = { agencyId: m.agencyId, ...(isManager ? {} : { assignedAgentId: userId }) };

    const [activeMandates, pendingMandates, pendingRequests, rents, openTickets, upcomingVisits, pendingProposals, fees] =
      await Promise.all([
        this.prisma.mandate.count({ where: { ...mandateScope, status: "ACTIVE" } }),
        this.prisma.mandate.count({ where: { ...mandateScope, status: "PENDING_OWNER" } }),
        isManager
          ? this.prisma.mandateRequest.count({ where: { agencyId: m.agencyId, status: "PENDING" } })
          : this.prisma.mandateRequest.count({ where: { agencyId: m.agencyId, status: "PENDING", createdById: userId } }),
        this.prisma.rentPeriod.groupBy({
          by: ["status"],
          where: { lease: { propertyId: { in: readIds } }, status: { in: ["DECLARED", "LATE"] } },
          _count: { _all: true },
        }),
        this.prisma.ticket.count({ where: { lease: { propertyId: { in: readIds } }, status: { not: "RESOLVED" } } }),
        this.prisma.visit.count({
          where: { propertyId: { in: readIds }, status: { in: ["REQUESTED", "CONFIRMED"] }, proposedAt: { gte: now } },
        }),
        this.prisma.inquiry.count({
          where: { propertyId: { in: readIds }, status: "PENDING", proposedAt: { not: null }, ownerDecision: null },
        }),
        this.prisma.feeEntry.findMany({
          where: { mandate: mandateScope, dueDate: { gte: from, lte: to }, status: { in: ["DUE", "SETTLED"] } },
          select: { amount: true, status: true, currency: true },
        }),
      ]);
    const byCurrency = new Map<string, { currency: string; due: number[]; settled: number[] }>();
    for (const f of fees) {
      const e = byCurrency.get(f.currency) ?? { currency: f.currency, due: [], settled: [] };
      (f.status === "DUE" ? e.due : e.settled).push(f.amount);
      byCurrency.set(f.currency, e);
    }
    const feesByCurrency = [...byCurrency.values()].map((e) => ({
      currency: e.currency,
      due: sumMoney(e.due),
      settled: sumMoney(e.settled),
    }));

    let byAgent: unknown[] = [];
    if (isManager) {
      const members = await this.prisma.agencyMember.findMany({
        where: { agencyId: m.agencyId },
        select: { userId: true, role: true, user: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: "asc" },
      });
      const mandates = await this.prisma.mandate.findMany({
        where: { agencyId: m.agencyId, status: { in: ["ACTIVE", "PENDING_OWNER"] } },
        select: { assignedAgentId: true, status: true, propertyId: true },
      });
      const [declared, tickets] = await Promise.all([
        this.prisma.rentPeriod.findMany({
          where: { lease: { propertyId: { in: readIds } }, status: "DECLARED" },
          select: { lease: { select: { propertyId: true } } },
        }),
        this.prisma.ticket.findMany({
          where: { lease: { propertyId: { in: readIds } }, status: { not: "RESOLVED" } },
          select: { lease: { select: { propertyId: true } } },
        }),
      ]);
      const rows = [
        ...members.map((x) => ({ userId: x.userId as string | null, firstName: x.user.firstName, lastName: x.user.lastName, role: x.role as string | null })),
        { userId: null, firstName: null as unknown as string, lastName: null as unknown as string, role: null },
      ];
      byAgent = rows.map((r) => {
        const mine = mandates.filter((x) => x.assignedAgentId === r.userId);
        const props = new Set(mine.filter((x) => x.status === "ACTIVE").map((x) => x.propertyId));
        return {
          userId: r.userId,
          firstName: r.firstName,
          lastName: r.lastName,
          role: r.role,
          /** null = biens non assignés */
          unassigned: r.userId === null,
          properties: props.size,
          activeMandates: mine.filter((x) => x.status === "ACTIVE").length,
          pendingMandates: mine.filter((x) => x.status === "PENDING_OWNER").length,
          rentsToVerify: declared.filter((d) => props.has(d.lease.propertyId)).length,
          openTickets: tickets.filter((t) => props.has(t.lease.propertyId)).length,
        };
      });
    }

    const main = feesByCurrency[0];
    return {
      role: m.role,
      properties: propertyIds.length,
      activeMandates,
      pendingMandates: pendingMandates + pendingRequests,
      rentsToVerify: rents.find((r) => r.status === "DECLARED")?._count._all ?? 0,
      lateRents: rents.find((r) => r.status === "LATE")?._count._all ?? 0,
      openTickets,
      upcomingVisits,
      pendingProposals,
      feesDueThisMonth: main?.due ?? 0,
      feesSettledThisMonth: main?.settled ?? 0,
      feesCurrency: main?.currency ?? null,
      feesByCurrency,
      byAgent,
    };
  }

  /** Admin : liste des agences. */
  async adminList(q?: string) {
    const rows = await this.prisma.agency.findMany({
      where: q
        ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { code: { equals: q.toUpperCase() } }, { email: { contains: q, mode: "insensitive" } }] }
        : {},
      select: {
        ...AGENCY_SELECT,
        _count: { select: { members: true, mandates: true } },
        members: {
          where: { role: "MANAGER" },
          select: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    const active = await this.prisma.mandate.groupBy({
      by: ["agencyId"],
      where: { status: "ACTIVE" },
      _count: { _all: true },
    });
    return rows.map(({ members, ...a }) => ({
      ...shapeAgency(a),
      managers: members.map((x) => x.user),
      activeMandates: active.find((x) => x.agencyId === a.id)?._count._all ?? 0,
    }));
  }
}
