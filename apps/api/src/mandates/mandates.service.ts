import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { MandateStatus, MandateType, Prisma, Role } from "@prisma/client";
import { hashPassword } from "../common/password";
import { randomBytes } from "crypto";
import { asLang, monthYear, pdfLang, requestLang, t } from "../i18n/i18n";
import { feeLabel, localizePeriod } from "../i18n/labels";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { AuthService } from "../auth/auth.service";
import { PropertiesService } from "../properties/properties.service";
import {
  assertAgencyWritable,
  assertCanAddMandates,
  loadAgencySubscription,
  loadWritableMandates,
  mandateWriteGate,
  subscriptionError,
  withinLimit,
} from "../common/subscription";
import { lockKey } from "../common/advisory-lock";
import { addDays, dayOf, monthEnd, monthStart, today as todayDay, toDay, yearOf } from "../common/dates";
import { normalizeEmail } from "../common/email.util";
import { assertEmailVerified } from "../common/email-verified.util";
import { MEDIA_SELECT, agencyLogoUrl, withMediaUrl } from "../common/media.util";
import { sumMoney } from "../common/money";
import { ownerWebBase } from "../agencies/agency.util";
import {
  assertFeeTransition,
  assertFees,
  assertMandateMatchesListing,
  formatMandateReference,
  parseMonth,
} from "./fees";
import { renderPdf } from "../common/pdf-render";
import {
  AcceptRequestDto,
  ByOwnerDto,
  FeeQueryDto,
  InviteMandateDto,
  MandateQueryDto,
  MandateTermsDto,
  UpdateMandateDto,
  WithNewOwnerDto,
} from "./dto/mandate.dto";

type Tx = Prisma.TransactionClient;
type AuthUser = { sub: string; role: Role | string };

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

const PERSON_SELECT = { id: true, firstName: true, lastName: true, email: true, phone: true } as const;

const MANDATE_INCLUDE = {
  property: {
    select: {
      id: true,
      title: true,
      city: true,
      addressLine: true,
      postalCode: true,
      country: true,
      listingType: true,
      status: true,
      price: true,
      currency: true,
      ownerId: true,
      media: { orderBy: { position: "asc" as const }, take: 1, select: MEDIA_SELECT },
    },
  },
  agency: {
    select: { id: true, name: true, slug: true, code: true, logoKey: true, email: true, phone: true, address: true, city: true, registrationNumber: true },
  },
} satisfies Prisma.MandateInclude;

type MandateRow = Prisma.MandateGetPayload<{ include: typeof MANDATE_INCLUDE }>;

const notFound = () =>
  new NotFoundException({ statusCode: 404, code: "MANDATE_NOT_FOUND", message: "Mandat introuvable." });

@Injectable()
export class MandatesService {
  private readonly logger = new Logger(MandatesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly auth: AuthService,
    private readonly properties: PropertiesService,
  ) {}

  // ─────────────────────────── Outils ───────────────────────────

  /** Adhésion du pro connecté (403 si pas de compte pro avec agence). */
  private async proMembership(userId: string) {
    const m = await this.prisma.agencyMember.findUnique({ where: { userId } });
    if (!m) {
      throw new ForbiddenException({
        statusCode: 403,
        code: "NO_AGENCY",
        message: "Réservé aux professionnels membres d'une agence.",
      });
    }
    return m;
  }

  /**
   * Côté propriétaire (confier un bien, accepter un mandat ou une demande) :
   * l'agence doit pouvoir recevoir `n` mandats de plus (abonnement non
   * suspendu, limite de l'offre). Le propriétaire n'est jamais bloqué sur ses
   * propres biens : seul ce nouveau mandat est refusé (409 AGENCY_UNAVAILABLE).
   */
  private async assertAgencyAvailable(agencyId: string, n: number): Promise<void> {
    const sub = await loadAgencySubscription(this.prisma, agencyId);
    const unavailable = () =>
      new ConflictException({
        statusCode: 409,
        code: "AGENCY_UNAVAILABLE",
        message: "Cette agence ne peut pas recevoir de nouveau mandat pour l'instant (abonnement). Contactez-la ou choisissez-en une autre.",
      });
    if (!sub.writable) throw unavailable();
    const max = sub.limits.maxActiveMandates;
    if (n > 0 && max !== null) {
      const open = await this.prisma.mandate.count({ where: { agencyId, status: { in: ["ACTIVE", "PENDING_OWNER"] } } });
      if (!withinLimit(max, open, n)) throw unavailable();
    }
  }

  /** Écriture d'un pro sur un mandat : agence non suspendue et mandat sous la limite de l'offre. */
  private async assertMandateWritable(agencyId: string, mandateId: string, status: string): Promise<void> {
    const sub = await assertAgencyWritable(this.prisma, agencyId);
    if (status !== "ACTIVE") return;
    const gate = mandateWriteGate(sub, await loadWritableMandates(this.prisma, sub), mandateId);
    if (gate) throw subscriptionError(gate.code, gate.message);
  }

  /** Référence MAN-<année>-<n> : compteur annuel incrémenté atomiquement. */
  async nextReference(tx: Tx): Promise<string> {
    const year = yearOf(new Date());
    const rows = await tx.$queryRaw<Array<{ last: number }>>`
      INSERT INTO "MandateCounter" ("year", "last") VALUES (${year}::int, 1)
      ON CONFLICT ("year") DO UPDATE SET "last" = "MandateCounter"."last" + 1
      RETURNING "last"`;
    return formatMandateReference(year, Number(rows[0]?.last ?? 0));
  }

  /** Un seul mandat ouvert (PENDING_OWNER / ACTIVE) par bien — sous verrou du bien. */
  private async assertNoOpenMandate(tx: Tx, propertyId: string): Promise<void> {
    await lockKey(tx, `mandate:property:${propertyId}`);
    const open = await tx.mandate.findFirst({
      where: { propertyId, status: { in: ["PENDING_OWNER", "ACTIVE"] } },
      select: { reference: true, status: true, agency: { select: { name: true } } },
    });
    if (open) {
      throw new ConflictException({
        statusCode: 409,
        code: "MANDATE_ALREADY_OPEN",
        message:
          open.status === "ACTIVE"
            ? `Ce bien est déjà géré par ${open.agency.name} (mandat ${open.reference}).`
            : `Un mandat est déjà en attente sur ce bien (${open.reference}).`,
      });
    }
  }

  private terms(dto: Partial<MandateTermsDto>, type: MandateType) {
    const fees = {
      managementFeeRate: dto.managementFeeRate ?? null,
      lettingFeeAmount: dto.lettingFeeAmount ?? null,
      lettingFeeMonths: dto.lettingFeeMonths ?? null,
      saleFeeRate: dto.saleFeeRate ?? null,
    };
    assertFees(type, fees);
    const startDate = dto.startDate ? toDay(dto.startDate) : todayDay();
    if (!startDate) throw new BadRequestException("Date de début du mandat invalide.");
    const endDate = dto.endDate ? toDay(dto.endDate) : null;
    if (dto.endDate && !endDate) throw new BadRequestException("Date de fin du mandat invalide.");
    if (endDate && endDate.getTime() < startDate.getTime()) {
      throw new BadRequestException("La fin du mandat doit suivre son début.");
    }
    if (type === "SALE" && dto.rentPayee === "AGENCY") {
      throw new BadRequestException("L'encaissement des loyers ne concerne pas un mandat de vente.");
    }
    return { ...fees, startDate, endDate, rentPayee: dto.rentPayee ?? "OWNER" };
  }

  private async assertAgencyIban(agencyId: string, rentPayee: string) {
    if (rentPayee !== "AGENCY") return;
    const a = await this.prisma.agency.findUnique({ where: { id: agencyId }, select: { paymentIban: true } });
    if (!a?.paymentIban) {
      throw new BadRequestException({
        statusCode: 400,
        code: "AGENCY_IBAN_REQUIRED",
        message: "Renseignez d'abord l'IBAN de l'agence (profil de l'agence) pour encaisser les loyers.",
      });
    }
  }

  /** Agent assigné : membre de l'agence ; un agent (non manager) s'assigne lui-même. */
  private async resolveAssignee(
    member: { agencyId: string; userId: string; role: string },
    requested?: string | null,
  ): Promise<string | null> {
    if (member.role !== "MANAGER") {
      if (requested && requested !== member.userId) {
        throw new ForbiddenException({ statusCode: 403, code: "MANAGER_ONLY", message: "Seul un responsable répartit les biens entre agents." });
      }
      return member.userId;
    }
    if (!requested) return null;
    const target = await this.prisma.agencyMember.findUnique({ where: { userId: requested } });
    if (!target || target.agencyId !== member.agencyId) {
      throw new BadRequestException({ statusCode: 400, code: "AGENT_NOT_IN_AGENCY", message: "Cet agent ne fait pas partie de l'agence." });
    }
    return requested;
  }

  private event(tx: Tx | PrismaService, mandateId: string, actorId: string | null, kind: string, data?: Prisma.InputJsonValue) {
    return tx.mandateEvent.create({ data: { mandateId, actorId, kind, ...(data !== undefined ? { data } : {}) } });
  }

  /** Droits du lecteur sur un mandat ; 404 si aucun (pas de fuite d'existence). */
  private async viewerOf(m: { ownerId: string; agencyId: string; assignedAgentId: string | null }, user: AuthUser) {
    if (m.ownerId === user.sub) return { as: "OWNER" as const, member: null };
    const member = await this.prisma.agencyMember.findUnique({ where: { userId: user.sub } });
    if (member && member.agencyId === m.agencyId) {
      if (member.role === "MANAGER") return { as: "MANAGER" as const, member };
      if (m.assignedAgentId === user.sub) return { as: "AGENT" as const, member };
    }
    throw notFound();
  }

  private async load(id: string): Promise<MandateRow> {
    const m = await this.prisma.mandate.findUnique({ where: { id }, include: MANDATE_INCLUDE });
    if (!m) throw notFound();
    return m;
  }

  /** Forme commune d'un mandat (liste et détail). */
  private async shape(rows: MandateRow[], user: AuthUser) {
    if (rows.length === 0) return [];
    const ids = [...new Set(rows.flatMap((r) => [r.ownerId, r.assignedAgentId].filter((x): x is string => !!x)))];
    const people = await this.prisma.user.findMany({
      where: { id: { in: ids } },
      select: { ...PERSON_SELECT, activatedAt: true },
    });
    const fees = await this.prisma.feeEntry.groupBy({
      by: ["mandateId", "status"],
      where: { mandateId: { in: rows.map((r) => r.id) } },
      _sum: { amount: true },
      _count: { _all: true },
    });
    const member = await this.prisma.agencyMember.findUnique({ where: { userId: user.sub } });
    return rows.map((m) => {
      const owner = people.find((p) => p.id === m.ownerId);
      const agent = m.assignedAgentId ? people.find((p) => p.id === m.assignedAgentId) : null;
      const sum = (status: string) => sumMoney([fees.find((f) => f.mandateId === m.id && f.status === status)?._sum.amount ?? 0]);
      const as =
        m.ownerId === user.sub ? "OWNER" : member?.agencyId === m.agencyId ? (member.role === "MANAGER" ? "MANAGER" : "AGENT") : "NONE";
      const open = m.status === "ACTIVE" || m.status === "PENDING_OWNER";
      const { logoKey, ...agency } = m.agency;
      return {
        id: m.id,
        reference: m.reference,
        type: m.type,
        status: m.status,
        createdBy: m.createdBy,
        startDate: m.startDate,
        endDate: m.endDate,
        acceptedAt: m.acceptedAt,
        rejectedAt: m.rejectedAt,
        endedAt: m.endedAt,
        endReason: m.endReason,
        message: m.message,
        managementFeeRate: m.managementFeeRate,
        lettingFeeAmount: m.lettingFeeAmount,
        lettingFeeMonths: m.lettingFeeMonths,
        saleFeeRate: m.saleFeeRate,
        currency: m.currency,
        rentPayee: m.rentPayee,
        requestId: m.requestId,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
        property: { ...m.property, media: m.property.media.map(withMediaUrl) },
        agency: { ...agency, logoUrl: agencyLogoUrl(logoKey) },
        assignedAgent: agent ? { id: agent.id, firstName: agent.firstName, lastName: agent.lastName, email: agent.email, phone: agent.phone } : null,
        owner: owner
          ? { id: owner.id, firstName: owner.firstName, lastName: owner.lastName, email: owner.email, phone: owner.phone, activated: !!owner.activatedAt }
          : null,
        feesSummary: {
          currency: m.currency,
          due: sum("DUE"),
          settled: sum("SETTLED"),
          cancelled: sum("CANCELLED"),
        },
        me: {
          as,
          canAccept: as === "OWNER" && m.status === "PENDING_OWNER",
          canEnd: open && (as === "OWNER" || as === "MANAGER"),
          canAssign: open && as === "MANAGER",
          canEditTerms: m.status === "PENDING_OWNER" && (as === "MANAGER" || as === "AGENT"),
          canResendOwnerInvite: open && (as === "MANAGER" || as === "AGENT") && !!owner && !owner.activatedAt,
        },
      };
    });
  }

  private async shapeOne(id: string, user: AuthUser) {
    const [m] = await this.shape([await this.load(id)], user);
    return m!;
  }

  // ─────────────────────────── Lecture ───────────────────────────

  async list(user: AuthUser, q: MandateQueryDto) {
    const member = await this.prisma.agencyMember.findUnique({ where: { userId: user.sub } });
    const where: Prisma.MandateWhereInput = member
      ? {
          agencyId: member.agencyId,
          ...(member.role === "MANAGER" ? (q.agentId ? { assignedAgentId: q.agentId } : {}) : { assignedAgentId: user.sub }),
          ...(q.ownerId ? { ownerId: q.ownerId } : {}),
        }
      : { ownerId: user.sub };
    const rows = await this.prisma.mandate.findMany({
      where: {
        ...where,
        ...(q.status ? { status: q.status } : {}),
        ...(q.type ? { type: q.type } : {}),
        ...(q.propertyId ? { propertyId: q.propertyId } : {}),
      },
      include: MANDATE_INCLUDE,
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return this.shape(rows, user);
  }

  async detail(user: AuthUser, id: string) {
    const m = await this.load(id);
    await this.viewerOf(m, user);
    const [shaped] = await this.shape([m], user);
    const [events, fees] = await Promise.all([
      this.prisma.mandateEvent.findMany({ where: { mandateId: id }, orderBy: { createdAt: "asc" }, take: 500 }),
      this.prisma.feeEntry.findMany({ where: { mandateId: id }, orderBy: { dueDate: "desc" }, take: 500 }),
    ]);
    const actorIds = [...new Set(events.map((e) => e.actorId).filter((x): x is string => !!x))];
    const actors = await this.prisma.user.findMany({
      where: { id: { in: actorIds } },
      select: { id: true, firstName: true, lastName: true, role: true, agencyMember: { select: { agency: { select: { name: true } } } } },
    });
    return {
      ...shaped,
      events: events.map((e) => {
        const a = actors.find((x) => x.id === e.actorId);
        return {
          id: e.id,
          kind: e.kind,
          data: e.data,
          createdAt: e.createdAt,
          actor: a ? { id: a.id, firstName: a.firstName, lastName: a.lastName, agencyName: a.agencyMember?.agency.name ?? null } : null,
        };
      }),
      fees,
    };
  }

  // ─────────────────────────── Invitation (propriétaire inscrit) ───────────────────────────

  async invite(user: AuthUser, dto: InviteMandateDto) {
    const member = await this.proMembership(user.sub);
    const email = normalizeEmail(dto.ownerEmail);
    const owner = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { id: true, role: true, email: true, firstName: true, activatedAt: true },
    });
    if (!owner) {
      throw new NotFoundException({
        statusCode: 404,
        code: "OWNER_NOT_FOUND",
        message: "Aucun compte propriétaire avec cette adresse : créez le bien pour ce propriétaire.",
      });
    }
    if (owner.id === user.sub || (owner.role !== "OWNER" && owner.role !== "ADMIN")) {
      throw new ConflictException({
        statusCode: 409,
        code: "NOT_AN_OWNER",
        message: "Ce compte n'est pas un compte propriétaire.",
      });
    }
    const terms = this.terms(dto, dto.type);
    await this.assertAgencyIban(member.agencyId, terms.rentPayee);
    const assignedAgentId = await this.resolveAssignee(member, dto.assignedAgentId);
    // Abonnement : agence non suspendue, limite de mandats (une demande compte pour un).
    await assertCanAddMandates(this.prisma, member.agencyId, Math.max(1, new Set(dto.propertyIds ?? []).size));
    const agency = await this.prisma.agency.findUniqueOrThrow({ where: { id: member.agencyId }, select: { name: true } });
    const url = `${ownerWebBase()}/dashboard/mandats`;

    // Sans bien désigné : demande de mandat, le propriétaire choisit ses biens.
    if (!dto.propertyIds || dto.propertyIds.length === 0) {
      const request = await this.prisma.mandateRequest.create({
        data: {
          agencyId: member.agencyId,
          ownerId: owner.id,
          createdById: user.sub,
          type: dto.type,
          message: dto.message ?? null,
          ...terms,
        },
      });
      this.mailer.mandateProposed(owner.email, owner.firstName, agency.name, null, url).catch(() => {});
      return { mandates: [], request: await this.shapeRequest(request.id) };
    }

    const ids = [...new Set(dto.propertyIds)];
    const props = await this.prisma.property.findMany({
      where: { id: { in: ids } },
      select: { id: true, ownerId: true, listingType: true, currency: true, title: true },
    });
    if (props.length !== ids.length || props.some((p) => p.ownerId !== owner.id)) {
      throw new BadRequestException({
        statusCode: 400,
        code: "PROPERTY_NOT_OWNED",
        message: "Un des biens indiqués n'appartient pas à ce propriétaire.",
      });
    }
    for (const p of props) assertMandateMatchesListing(dto.type, p.listingType);
    const created = await this.prisma.$transaction(async (tx) => {
      const out: string[] = [];
      for (const p of props) {
        await this.assertNoOpenMandate(tx, p.id);
        const m = await tx.mandate.create({
          data: {
            reference: await this.nextReference(tx),
            propertyId: p.id,
            agencyId: member.agencyId,
            assignedAgentId,
            ownerId: owner.id,
            type: dto.type,
            status: "PENDING_OWNER",
            createdBy: "AGENCY",
            createdById: user.sub,
            message: dto.message ?? null,
            currency: p.currency || "EUR",
            ...terms,
          },
        });
        await this.event(tx, m.id, user.sub, "CREATED", { origin: "AGENCY_INVITE", status: "PENDING_OWNER" });
        if (assignedAgentId) await this.event(tx, m.id, user.sub, "AGENT_ASSIGNED", { assignedAgentId });
        out.push(m.id);
      }
      return out;
    });
    this.mailer
      .mandateProposed(owner.email, owner.firstName, agency.name, props.map((p) => p.title), url)
      .catch(() => {});
    const rows = await this.prisma.mandate.findMany({ where: { id: { in: created } }, include: MANDATE_INCLUDE });
    return { mandates: await this.shape(rows, user), request: null };
  }

  // ─────────────────────────── Bien créé pour un propriétaire sans compte ───────────────────────────

  async withNewOwner(user: AuthUser, dto: WithNewOwnerDto) {
    const member = await this.proMembership(user.sub);
    await assertEmailVerified(this.prisma, user.sub);
    if (!dto.owner && !dto.ownerId) {
      throw new BadRequestException("Indiquez le propriétaire (owner) ou un propriétaire déjà invité (ownerId).");
    }
    const terms = this.terms(dto.mandate, dto.mandate.type);
    assertMandateMatchesListing(dto.mandate.type, dto.property.listingType);
    await this.assertAgencyIban(member.agencyId, terms.rentPayee);
    const assignedAgentId = await this.resolveAssignee(member, dto.assignedAgentId);
    await assertCanAddMandates(this.prisma, member.agencyId, 1);

    const exists = (msg?: string) =>
      new ConflictException({
        statusCode: 409,
        code: "OWNER_EXISTS",
        message: msg ?? "Ce propriétaire a déjà un compte hwe : invitez-le à vous confier son bien (POST /mandates/invite).",
      });

    // Propriétaire : nouveau compte invité, ou compte invité existant de CETTE agence.
    let ownerId: string;
    let createdOwner = false;
    if (dto.ownerId) {
      const o = await this.prisma.user.findUnique({ where: { id: dto.ownerId } });
      if (!o || o.invitedByAgencyId !== member.agencyId) {
        throw new NotFoundException({ statusCode: 404, code: "OWNER_NOT_FOUND", message: "Propriétaire invité introuvable pour votre agence." });
      }
      if (o.activatedAt) throw exists();
      ownerId = o.id;
    } else {
      const email = normalizeEmail(dto.owner!.email);
      const o = await this.prisma.user.findFirst({ where: { email: { equals: email, mode: "insensitive" } } });
      if (o) {
        if (o.activatedAt) throw exists();
        if (o.invitedByAgencyId !== member.agencyId) {
          throw exists("Ce propriétaire a déjà été invité par une autre agence : il doit d'abord activer son compte.");
        }
        ownerId = o.id; // bien supplémentaire pour un propriétaire déjà invité
      } else {
        ownerId = "";
        createdOwner = true;
      }
    }

    // Compte invité : mot de passe aléatoire inutilisable (haché hors transaction).
    const unusable = createdOwner ? await hashPassword(randomBytes(32).toString("hex")) : "";
    const { mandateId, ownerUserId } = await this.prisma.$transaction(async (tx) => {
      let oid = ownerId;
      if (createdOwner) {
        // Compte invité : non activé, e-mail non vérifié.
        const o = await tx.user.create({
          data: {
            email: normalizeEmail(dto.owner!.email),
            password: unusable,
            firstName: dto.owner!.firstName,
            lastName: dto.owner!.lastName,
            phone: dto.owner!.phone || null,
            role: "OWNER",
            activatedAt: null,
            emailVerifiedAt: null,
            invitedByAgencyId: member.agencyId,
          },
        });
        oid = o.id;
      }
      const property = await this.properties.create(oid, dto.property, { skipEmailCheck: true, tx });
      await this.assertNoOpenMandate(tx, property.id);
      const m = await tx.mandate.create({
        data: {
          reference: await this.nextReference(tx),
          propertyId: property.id,
          agencyId: member.agencyId,
          assignedAgentId,
          ownerId: oid,
          type: dto.mandate.type,
          status: "ACTIVE",
          acceptedAt: new Date(),
          createdBy: "AGENCY",
          createdById: user.sub,
          currency: property.currency || "EUR",
          ...terms,
        },
      });
      await this.event(tx, m.id, user.sub, "CREATED", {
        origin: "AGENCY_NEW_OWNER",
        status: "ACTIVE",
        note: "Bien créé par le professionnel pour un propriétaire sans compte : mandat actif d'emblée, le propriétaire peut y mettre fin.",
        ownerCreated: createdOwner,
      });
      if (assignedAgentId) await this.event(tx, m.id, user.sub, "AGENT_ASSIGNED", { assignedAgentId });
      return { mandateId: m.id, ownerUserId: oid };
    });

    const ownerInviteUrl = await this.sendOwnerInvite(ownerUserId, member.agencyId, user.sub);
    return {
      mandate: await this.shapeOne(mandateId, user),
      ownerInviteUrl,
      emailSent: this.mailer.isConfigured,
      ownerCreated: createdOwner,
    };
  }

  /** Lien d'activation (toujours renvoyé) + e-mail si SMTP. */
  private async sendOwnerInvite(ownerId: string, agencyId: string, actorId: string): Promise<string> {
    const owner = await this.prisma.user.findUniqueOrThrow({ where: { id: ownerId } });
    const url = await this.auth.ownerInviteUrl(owner);
    const [agency, props] = await Promise.all([
      this.prisma.agency.findUniqueOrThrow({ where: { id: agencyId }, select: { name: true } }),
      this.prisma.mandate.findMany({
        where: { ownerId, agencyId, status: "ACTIVE" },
        select: { property: { select: { title: true } } },
      }),
    ]);
    // Propriétaire sans langue choisie : celle du professionnel qui l'invite.
    const fallback = await this.mailer.userLang(actorId);
    this.mailer.ownerInvite(owner.email, owner.firstName, agency.name, props.map((p) => p.property.title), url, fallback).catch(() => {});
    return url;
  }

  async resendOwnerInvite(user: AuthUser, id: string) {
    const m = await this.load(id);
    const viewer = await this.viewerOf(m, user);
    if (viewer.as === "OWNER") throw notFound();
    const owner = await this.prisma.user.findUniqueOrThrow({ where: { id: m.ownerId }, select: { activatedAt: true } });
    if (owner.activatedAt) {
      throw new ConflictException({ statusCode: 409, code: "OWNER_ALREADY_ACTIVATED", message: "Le propriétaire a déjà activé son compte." });
    }
    if (m.status !== "ACTIVE" && m.status !== "PENDING_OWNER") {
      throw new ConflictException({ statusCode: 409, code: "MANDATE_INACTIVE", message: "Ce mandat n'est plus actif." });
    }
    await this.assertMandateWritable(m.agencyId, m.id, m.status);
    const ownerInviteUrl = await this.sendOwnerInvite(m.ownerId, m.agencyId, user.sub);
    await this.event(this.prisma, m.id, user.sub, "OWNER_INVITE_SENT");
    return { ownerInviteUrl, emailSent: this.mailer.isConfigured };
  }

  // ─────────────────────────── Décisions du propriétaire ───────────────────────────

  async accept(user: AuthUser, id: string) {
    const m = await this.load(id);
    if (m.ownerId !== user.sub) throw notFound();
    // Mandat déjà compté dans la limite tant qu'il est en attente : seul l'abonnement compte.
    if (m.status === "PENDING_OWNER") await this.assertAgencyAvailable(m.agencyId, 0);
    await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `mandate:property:${m.propertyId}`);
      const active = await tx.mandate.findFirst({
        where: { propertyId: m.propertyId, status: "ACTIVE", id: { not: id } },
        select: { reference: true },
      });
      if (active) {
        throw new ConflictException({ statusCode: 409, code: "MANDATE_ALREADY_OPEN", message: `Ce bien est déjà sous mandat (${active.reference}).` });
      }
      const { count } = await tx.mandate.updateMany({
        where: { id, status: "PENDING_OWNER" },
        data: { status: "ACTIVE", acceptedAt: new Date() },
      });
      if (count === 0) throw new ConflictException({ statusCode: 409, code: "MANDATE_NOT_PENDING", message: "Ce mandat n'est plus en attente." });
      await this.event(tx, id, user.sub, "ACCEPTED");
    });
    this.notifyAgency(m, "accepted", { reference: m.reference, title: m.property.title });
    return this.shapeOne(id, user);
  }

  async reject(user: AuthUser, id: string, reason?: string) {
    const m = await this.load(id);
    if (m.ownerId !== user.sub) throw notFound();
    const { count } = await this.prisma.mandate.updateMany({
      where: { id, status: "PENDING_OWNER" },
      data: { status: "REJECTED", rejectedAt: new Date(), endReason: reason ?? null },
    });
    if (count === 0) throw new ConflictException({ statusCode: 409, code: "MANDATE_NOT_PENDING", message: "Ce mandat n'est plus en attente." });
    await this.event(this.prisma, id, user.sub, "REJECTED", reason ? { reason } : undefined);
    this.notifyAgency(m, "rejected", { reference: m.reference, title: m.property.title });
    return this.shapeOne(id, user);
  }

  /** Fin de mandat : propriétaire (effet immédiat, motif obligatoire) ou responsable de l'agence. */
  async end(user: AuthUser, id: string, reason: string) {
    const m = await this.load(id);
    const viewer = await this.viewerOf(m, user);
    if (viewer.as === "AGENT") {
      throw new ForbiddenException({ statusCode: 403, code: "MANAGER_ONLY", message: "Seul un responsable de l'agence peut mettre fin au mandat." });
    }
    const { count } = await this.prisma.mandate.updateMany({
      where: { id, status: { in: ["ACTIVE", "PENDING_OWNER"] } },
      data: { status: "ENDED", endedAt: new Date(), endReason: reason, endedById: user.sub },
    });
    if (count === 0) throw new ConflictException({ statusCode: 409, code: "MANDATE_INACTIVE", message: "Ce mandat est déjà terminé." });
    await this.event(this.prisma, id, user.sub, "ENDED", { reason, by: viewer.as });
    if (viewer.as === "OWNER") {
      this.notifyAgency(m, "endedByOwner", { reference: m.reference, title: m.property.title, reason });
    } else {
      this.notifyOwner(m, "endedByAgency", { agency: m.agency.name, reference: m.reference, title: m.property.title, reason });
    }
    return this.shapeOne(id, user);
  }

  /** Assignation (responsable) ; honoraires et dates seulement en PENDING_OWNER. */
  async update(user: AuthUser, id: string, dto: UpdateMandateDto) {
    const m = await this.load(id);
    const viewer = await this.viewerOf(m, user);
    if (viewer.as === "OWNER") {
      throw new ForbiddenException({ statusCode: 403, code: "AGENCY_ONLY", message: "Les conditions se modifient par l'agence, avant votre accord." });
    }
    const termKeys = ["managementFeeRate", "lettingFeeAmount", "lettingFeeMonths", "saleFeeRate", "rentPayee", "startDate", "endDate", "message"] as const;
    const touchesTerms = termKeys.some((k) => dto[k] !== undefined);
    if (dto.assignedAgentId !== undefined && viewer.as !== "MANAGER") {
      throw new ForbiddenException({ statusCode: 403, code: "MANAGER_ONLY", message: "Seul un responsable répartit les biens entre agents." });
    }
    if (m.status === "ENDED" || m.status === "REJECTED") {
      throw new ConflictException({ statusCode: 409, code: "MANDATE_NOT_EDITABLE", message: "Ce mandat est clos." });
    }
    if (touchesTerms && m.status !== "PENDING_OWNER") {
      throw new ConflictException({
        statusCode: 409,
        code: "MANDATE_NOT_EDITABLE",
        message: "Les conditions d'un mandat accepté ne se modifient plus : mettez-y fin et proposez-en un nouveau.",
      });
    }
    await this.assertMandateWritable(m.agencyId, m.id, m.status);
    const data: Prisma.MandateUncheckedUpdateInput = {};
    if (touchesTerms) {
      const merged = {
        managementFeeRate: dto.managementFeeRate !== undefined ? dto.managementFeeRate : m.managementFeeRate,
        lettingFeeAmount: dto.lettingFeeAmount !== undefined ? dto.lettingFeeAmount : m.lettingFeeAmount,
        lettingFeeMonths: dto.lettingFeeMonths !== undefined ? dto.lettingFeeMonths : m.lettingFeeMonths,
        saleFeeRate: dto.saleFeeRate !== undefined ? dto.saleFeeRate : m.saleFeeRate,
        rentPayee: dto.rentPayee ?? m.rentPayee,
        startDate: dto.startDate ?? m.startDate.toISOString().slice(0, 10),
        endDate: dto.endDate !== undefined ? dto.endDate : m.endDate ? m.endDate.toISOString().slice(0, 10) : null,
      };
      const t = this.terms(merged, m.type);
      await this.assertAgencyIban(m.agencyId, t.rentPayee);
      Object.assign(data, t);
      if (dto.message !== undefined) data.message = dto.message;
    }
    if (dto.assignedAgentId !== undefined) {
      data.assignedAgentId = await this.resolveAssignee(viewer.member!, dto.assignedAgentId);
    }
    await this.prisma.mandate.update({ where: { id }, data });
    if (dto.assignedAgentId !== undefined) {
      await this.event(this.prisma, id, user.sub, "AGENT_ASSIGNED", { assignedAgentId: data.assignedAgentId as string | null });
    }
    if (touchesTerms) await this.event(this.prisma, id, user.sub, "TERMS_UPDATED", { fields: termKeys.filter((k) => dto[k] !== undefined) });
    return this.shapeOne(id, user);
  }

  /** Le propriétaire confie lui-même son bien (mandat ACTIVE d'emblée). */
  async byOwner(user: AuthUser, dto: ByOwnerDto) {
    if (!dto.agencySlug && !dto.agencyCode) throw new BadRequestException("Indiquez l'agence (agencySlug ou agencyCode).");
    const agency = await this.prisma.agency.findFirst({
      where: dto.agencySlug ? { slug: dto.agencySlug.toLowerCase() } : { code: dto.agencyCode!.toUpperCase() },
      select: { id: true, name: true },
    });
    if (!agency) throw new NotFoundException({ statusCode: 404, code: "AGENCY_NOT_FOUND", message: "Agence introuvable." });
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
      select: { id: true, ownerId: true, listingType: true, currency: true, title: true },
    });
    if (!property || property.ownerId !== user.sub) {
      throw new NotFoundException({ statusCode: 404, code: "PROPERTY_NOT_FOUND", message: "Bien introuvable." });
    }
    assertMandateMatchesListing(dto.type, property.listingType);
    const terms = this.terms(dto, dto.type);
    await this.assertAgencyIban(agency.id, terms.rentPayee);
    await this.assertAgencyAvailable(agency.id, 1);
    const id = await this.prisma.$transaction(async (tx) => {
      await this.assertNoOpenMandate(tx, property.id);
      const m = await tx.mandate.create({
        data: {
          reference: await this.nextReference(tx),
          propertyId: property.id,
          agencyId: agency.id,
          ownerId: user.sub,
          type: dto.type,
          status: "ACTIVE",
          acceptedAt: new Date(),
          createdBy: "OWNER",
          createdById: user.sub,
          message: dto.message ?? null,
          currency: property.currency || "EUR",
          ...terms,
        },
      });
      await this.event(tx, m.id, user.sub, "CREATED", { origin: "OWNER", status: "ACTIVE" });
      return m.id;
    });
    const m = await this.load(id);
    this.notifyAgency(m, "entrusted", { reference: m.reference, title: property.title });
    return this.shapeOne(id, user);
  }

  // ─────────────────────────── Demandes de mandat (sans bien) ───────────────────────────

  private async shapeRequest(id: string) {
    const r = await this.prisma.mandateRequest.findUniqueOrThrow({
      where: { id },
      include: { agency: { select: { id: true, name: true, slug: true, code: true, logoKey: true, email: true, phone: true } } },
    });
    const [owner, author] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: r.ownerId }, select: { ...PERSON_SELECT, activatedAt: true } }),
      this.prisma.user.findUnique({ where: { id: r.createdById }, select: { id: true, firstName: true, lastName: true } }),
    ]);
    const { logoKey, ...agency } = r.agency;
    return {
      ...r,
      agency: { ...agency, logoUrl: agencyLogoUrl(logoKey) },
      owner: owner ? { id: owner.id, firstName: owner.firstName, lastName: owner.lastName, email: owner.email, phone: owner.phone, activated: !!owner.activatedAt } : null,
      createdByUser: author,
    };
  }

  async listRequests(user: AuthUser) {
    const member = await this.prisma.agencyMember.findUnique({ where: { userId: user.sub } });
    const rows = await this.prisma.mandateRequest.findMany({
      where: member
        ? { agencyId: member.agencyId, ...(member.role === "MANAGER" ? {} : { createdById: user.sub }) }
        : { ownerId: user.sub },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: { id: true },
    });
    return Promise.all(rows.map((r) => this.shapeRequest(r.id)));
  }

  async acceptRequest(user: AuthUser, id: string, dto: AcceptRequestDto) {
    const r = await this.prisma.mandateRequest.findUnique({ where: { id } });
    if (!r || r.ownerId !== user.sub) throw new NotFoundException({ statusCode: 404, code: "REQUEST_NOT_FOUND", message: "Demande de mandat introuvable." });
    if (r.status !== "PENDING") throw new ConflictException({ statusCode: 409, code: "REQUEST_NOT_PENDING", message: "Cette demande n'est plus en attente." });
    const ids = [...new Set(dto.propertyIds)];
    const props = await this.prisma.property.findMany({
      where: { id: { in: ids } },
      select: { id: true, ownerId: true, listingType: true, currency: true },
    });
    if (props.length !== ids.length || props.some((p) => p.ownerId !== user.sub)) {
      throw new BadRequestException({ statusCode: 400, code: "PROPERTY_NOT_OWNED", message: "Choisissez parmi vos biens." });
    }
    for (const p of props) assertMandateMatchesListing(r.type, p.listingType);
    await this.assertAgencyAvailable(r.agencyId, props.length);
    const created = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.mandateRequest.updateMany({
        where: { id, status: "PENDING" },
        data: { status: "ACCEPTED", resolvedAt: new Date() },
      });
      if (count === 0) throw new ConflictException({ statusCode: 409, code: "REQUEST_NOT_PENDING", message: "Cette demande n'est plus en attente." });
      const creator = await tx.agencyMember.findUnique({ where: { userId: r.createdById } });
      const assignedAgentId = creator && creator.agencyId === r.agencyId && creator.role !== "MANAGER" ? r.createdById : null;
      const out: string[] = [];
      for (const p of props) {
        await this.assertNoOpenMandate(tx, p.id);
        const m = await tx.mandate.create({
          data: {
            reference: await this.nextReference(tx),
            propertyId: p.id,
            agencyId: r.agencyId,
            assignedAgentId,
            ownerId: user.sub,
            type: r.type,
            status: "ACTIVE", // c'est le propriétaire qui choisit : actif d'emblée
            acceptedAt: new Date(),
            createdBy: "AGENCY",
            createdById: r.createdById,
            message: r.message,
            currency: p.currency || "EUR",
            requestId: r.id,
            managementFeeRate: r.managementFeeRate,
            lettingFeeAmount: r.lettingFeeAmount,
            lettingFeeMonths: r.lettingFeeMonths,
            saleFeeRate: r.saleFeeRate,
            rentPayee: r.rentPayee,
            startDate: r.startDate,
            endDate: r.endDate,
          },
        });
        await this.event(tx, m.id, r.createdById, "CREATED", { origin: "AGENCY_REQUEST", requestId: r.id });
        await this.event(tx, m.id, user.sub, "ACCEPTED");
        out.push(m.id);
      }
      return out;
    });
    const rows = await this.prisma.mandate.findMany({ where: { id: { in: created } }, include: MANDATE_INCLUDE });
    for (const m of rows) this.notifyAgency(m, "requestAccepted", { reference: m.reference, title: m.property.title });
    return { request: await this.shapeRequest(id), mandates: await this.shape(rows, user) };
  }

  async rejectRequest(user: AuthUser, id: string) {
    const r = await this.prisma.mandateRequest.findUnique({ where: { id } });
    if (!r) throw new NotFoundException({ statusCode: 404, code: "REQUEST_NOT_FOUND", message: "Demande de mandat introuvable." });
    let status: "REJECTED" | "CANCELLED";
    if (r.ownerId === user.sub) status = "REJECTED";
    else {
      const member = await this.prisma.agencyMember.findUnique({ where: { userId: user.sub } });
      if (!member || member.agencyId !== r.agencyId || (member.role !== "MANAGER" && r.createdById !== user.sub)) {
        throw new NotFoundException({ statusCode: 404, code: "REQUEST_NOT_FOUND", message: "Demande de mandat introuvable." });
      }
      status = "CANCELLED";
    }
    const { count } = await this.prisma.mandateRequest.updateMany({
      where: { id, status: "PENDING" },
      data: { status, resolvedAt: new Date() },
    });
    if (count === 0) throw new ConflictException({ statusCode: 409, code: "REQUEST_NOT_PENDING", message: "Cette demande n'est plus en attente." });
    return this.shapeRequest(id);
  }

  // ─────────────────────────── Honoraires ───────────────────────────

  async listFees(user: AuthUser, q: FeeQueryDto) {
    const member = await this.prisma.agencyMember.findUnique({ where: { userId: user.sub } });
    const from = q.from ? toDay(q.from) : null;
    const to = q.to ? toDay(q.to) : null;
    const rows = await this.prisma.feeEntry.findMany({
      where: {
        mandate: member
          ? { agencyId: member.agencyId, ...(member.role === "MANAGER" ? {} : { assignedAgentId: user.sub }) }
          : { ownerId: user.sub },
        ...(q.mandateId ? { mandateId: q.mandateId } : {}),
        ...(q.status ? { status: q.status } : {}),
        ...(from || to ? { dueDate: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {}),
      },
      include: {
        mandate: {
          select: {
            id: true,
            reference: true,
            type: true,
            ownerId: true,
            property: { select: { id: true, title: true, city: true } },
            agency: { select: { id: true, name: true, slug: true } },
          },
        },
      },
      orderBy: [{ dueDate: "desc" }, { createdAt: "desc" }],
      take: 1000,
    });
    const byCurrency = new Map<string, { due: number[]; settled: number[] }>();
    for (const f of rows) {
      const e = byCurrency.get(f.currency) ?? { due: [], settled: [] };
      if (f.status === "DUE") e.due.push(f.amount);
      if (f.status === "SETTLED") e.settled.push(f.amount);
      byCurrency.set(f.currency, e);
    }
    return {
      items: rows,
      totals: [...byCurrency.entries()].map(([currency, e]) => ({ currency, due: sumMoney(e.due), settled: sumMoney(e.settled) })),
    };
  }

  async updateFee(user: AuthUser, id: string, status: "SETTLED" | "DUE") {
    const fee = await this.prisma.feeEntry.findUnique({ where: { id }, include: { mandate: { select: { agencyId: true } } } });
    const member = await this.prisma.agencyMember.findUnique({ where: { userId: user.sub } });
    if (!fee || !member || member.agencyId !== fee.mandate.agencyId) {
      throw new NotFoundException({ statusCode: 404, code: "FEE_NOT_FOUND", message: "Honoraire introuvable." });
    }
    if (member.role !== "MANAGER") {
      throw new ForbiddenException({ statusCode: 403, code: "MANAGER_ONLY", message: "Seul un responsable marque les honoraires comme réglés." });
    }
    assertFeeTransition(fee.status, status);
    await assertAgencyWritable(this.prisma, member.agencyId);
    const updated = await this.prisma.feeEntry.update({
      where: { id },
      data: { status, settledAt: status === "SETTLED" ? new Date() : null },
    });
    await this.event(this.prisma, fee.mandateId, user.sub, status === "SETTLED" ? "FEE_SETTLED" : "FEE_REOPENED", { feeId: id });
    return updated;
  }

  // ─────────────────────────── Relevés ───────────────────────────

  private monthBounds(month: string) {
    const p = parseMonth(month);
    if (!p) throw new BadRequestException({ statusCode: 400, code: "INVALID_MONTH", message: "Mois invalide (format AAAA-MM)." });
    return { ...p, from: monthStart(p.year, p.month), to: monthEnd(p.year, p.month), label: `${MOIS[p.month - 1]} ${p.year}` };
  }

  /**
   * Relevé d'un bien pour un mois : loyers VALIDÉS dans le mois (fuseau de
   * la plateforme), honoraires dus dans le mois (hors annulés), net.
   */
  private async statementFor(propertyId: string, mandateId: string | null, month: string) {
    const { rentsByProperty, feesByMandate } = await this.statementData([propertyId], mandateId ? [mandateId] : [], month);
    return this.statementShape(month, rentsByProperty.get(propertyId) ?? [], mandateId ? feesByMandate.get(mandateId) ?? [] : []);
  }

  /**
   * Données des relevés de PLUSIEURS biens et mandats en deux requêtes (au
   * lieu de deux par bien : le relevé propriétaire d'un portefeuille de 40
   * biens faisait 80+ allers-retours séquentiels — tests de charge).
   */
  private async statementData(propertyIds: string[], mandateIds: string[], month: string) {
    const b = this.monthBounds(month);
    const periods = propertyIds.length
      ? await this.prisma.rentPeriod.findMany({
          where: {
            status: "PAID",
            lease: { propertyId: { in: propertyIds } },
            paidAt: { gte: addDays(b.from, -1), lt: addDays(b.to, 2) },
          },
          include: { lease: { select: { tenantFirstName: true, tenantLastName: true, currency: true, propertyId: true } } },
          orderBy: [{ paidAt: "asc" }, { id: "asc" }],
        })
      : [];
    const fees = mandateIds.length
      ? await this.prisma.feeEntry.findMany({
          where: { mandateId: { in: mandateIds }, status: { not: "CANCELLED" }, dueDate: { gte: b.from, lte: b.to } },
          orderBy: [{ dueDate: "asc" }, { id: "asc" }],
        })
      : [];
    const rentsByProperty = new Map<string, typeof periods>();
    for (const p of periods) {
      const d = dayOf(p.paidAt!);
      if (d.getTime() < b.from.getTime() || d.getTime() > b.to.getTime()) continue;
      const list = rentsByProperty.get(p.lease.propertyId) ?? [];
      list.push(p);
      rentsByProperty.set(p.lease.propertyId, list);
    }
    const feesByMandate = new Map<string, typeof fees>();
    for (const f of fees) {
      const list = feesByMandate.get(f.mandateId) ?? [];
      list.push(f);
      feesByMandate.set(f.mandateId, list);
    }
    return { rentsByProperty, feesByMandate };
  }

  private statementShape(
    month: string,
    inMonth: Array<{
      id: string; periodMonth: number; periodYear: number; paidAt: Date | null; receiptNo: string | null;
      rentAmount: number; chargesAmount: number; amount: number;
      lease: { tenantFirstName: string; tenantLastName: string; currency: string };
    }>,
    fees: Array<{ id: string; kind: string; label: string; amount: number; status: string; dueDate: Date; currency: string }>,
  ) {
    const b = this.monthBounds(month);
    const rents = inMonth.map((p) => ({
      periodId: p.id,
      periodLabel: `${MOIS[p.periodMonth - 1]} ${p.periodYear}`,
      tenantName: `${p.lease.tenantFirstName} ${p.lease.tenantLastName}`,
      paidAt: p.paidAt,
      receiptNo: p.receiptNo,
      rentAmount: p.rentAmount,
      chargesAmount: p.chargesAmount,
      amount: p.amount,
      currency: p.lease.currency,
    }));
    const collected = sumMoney(rents.map((r) => r.amount));
    const feeTotal = sumMoney(fees.map((f) => f.amount));
    return {
      month: `${b.year}-${String(b.month).padStart(2, "0")}`,
      monthLabel: b.label,
      rents,
      fees: fees.map((f) => ({ id: f.id, kind: f.kind, label: f.label, amount: f.amount, status: f.status, dueDate: f.dueDate, currency: f.currency })),
      totals: { collected, fees: feeTotal, net: sumMoney([collected, -feeTotal]) },
    };
  }

  async statement(user: AuthUser, id: string, month: string) {
    const m = await this.load(id);
    await this.viewerOf(m, user);
    const owner = await this.prisma.user.findUniqueOrThrow({ where: { id: m.ownerId }, select: { id: true, firstName: true, lastName: true } });
    const s = await this.statementFor(m.propertyId, m.id, month);
    const { logoKey, ...agency } = m.agency;
    return {
      mandate: { id: m.id, reference: m.reference, type: m.type, status: m.status },
      agency: { ...agency, logoUrl: agencyLogoUrl(logoKey) },
      owner,
      property: { id: m.property.id, title: m.property.title, addressLine: m.property.addressLine, city: m.property.city },
      currency: m.currency,
      ...s,
    };
  }

  async statementPdf(user: AuthUser, id: string, month: string) {
    const s = await this.statement(user, id, month);
    // Langue du document : celle de l'utilisateur qui télécharge.
    const me = await this.prisma.user.findUnique({ where: { id: user.sub }, select: { locale: true } });
    const lang = pdfLang(asLang(me?.locale, requestLang()));
    const b = this.monthBounds(month);
    const buffer = await renderPdf("statement", {
      lang,
      title: t(lang, "pdf.statement.title", { month: monthYear(lang, b.year, b.month) }),
      reference: s.mandate.reference,
      agencyName: s.agency.name,
      agencyDetails: [
        [s.agency.address, s.agency.city].filter(Boolean).join(", "),
        [s.agency.email, s.agency.phone].filter(Boolean).join(" — "),
        s.agency.registrationNumber ? t(lang, "pdf.statement.registration", { number: s.agency.registrationNumber }) : "",
      ],
      ownerName: `${s.owner.firstName} ${s.owner.lastName}`,
      propertyLines: [`${s.property.title}${s.property.addressLine ? ` — ${s.property.addressLine}, ${s.property.city}` : ""}`],
      currency: s.currency,
      rents: s.rents.map((r) => ({
        label: t(lang, "label.rent", { period: localizePeriod(r.periodLabel, lang) }),
        tenant: r.tenantName,
        paidAt: r.paidAt,
        amount: r.amount,
      })),
      fees: s.fees.map((f) => ({ label: feeLabel({ kind: f.kind, label: f.label, currency: f.currency }, lang), status: f.status, amount: f.amount })),
      totals: s.totals,
      generatedAt: new Date(),
    });
    return { buffer, filename: `releve-${s.mandate.reference}-${s.month}.pdf` };
  }

  /** Relevé consolidé : tous les biens du propriétaire pour le mois. */
  async ownerStatement(user: AuthUser, month: string) {
    this.monthBounds(month);
    const props = await this.prisma.property.findMany({
      where: { ownerId: user.sub },
      select: { id: true, title: true, city: true, currency: true },
      orderBy: { createdAt: "asc" },
    });
    const mandates = await this.prisma.mandate.findMany({
      where: { ownerId: user.sub, propertyId: { in: props.map((p) => p.id) } },
      select: { id: true, propertyId: true, reference: true, status: true, type: true, agency: { select: { id: true, name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    });
    const items = [];
    const data = await this.statementData(props.map((p) => p.id), mandates.map((m) => m.id), month);
    for (const p of props) {
      const ms = mandates.filter((m) => m.propertyId === p.id);
      // Honoraires de tous les mandats du bien (un mandat a pu finir dans le mois).
      const parts = (ms.length ? ms.map((m) => m.id) : [null]).map((mid) =>
        this.statementShape(month, data.rentsByProperty.get(p.id) ?? [], mid ? data.feesByMandate.get(mid) ?? [] : []),
      );
      const rents = parts[0]!.rents;
      const fees = parts.flatMap((x) => x.fees);
      if (rents.length === 0 && fees.length === 0) continue;
      const collected = sumMoney(rents.map((r) => r.amount));
      const feeTotal = sumMoney(fees.map((f) => f.amount));
      const current = ms.find((m) => m.status === "ACTIVE") ?? ms[0] ?? null;
      items.push({
        property: p,
        mandate: current ? { id: current.id, reference: current.reference, type: current.type, status: current.status, agency: current.agency } : null,
        currency: p.currency,
        rents,
        fees,
        totals: { collected, fees: feeTotal, net: sumMoney([collected, -feeTotal]) },
      });
    }
    const byCurrency = new Map<string, { collected: number[]; fees: number[] }>();
    for (const it of items) {
      const e = byCurrency.get(it.currency) ?? { collected: [], fees: [] };
      e.collected.push(it.totals.collected);
      e.fees.push(it.totals.fees);
      byCurrency.set(it.currency, e);
    }
    const b = this.monthBounds(month);
    return {
      month: `${b.year}-${String(b.month).padStart(2, "0")}`,
      monthLabel: b.label,
      items,
      totals: [...byCurrency.entries()].map(([currency, e]) => {
        const collected = sumMoney(e.collected);
        const fees = sumMoney(e.fees);
        return { currency, collected, fees, net: sumMoney([collected, -fees]) };
      }),
    };
  }

  // ─────────────────────────── Notifications (best-effort) ───────────────────────────

  private notifyAgency(m: MandateRow, kind: string, params: Record<string, string>) {
    (async () => {
      const recipients = await this.prisma.user.findMany({
        where: m.assignedAgentId ? { id: m.assignedAgentId } : { agencyMember: { agencyId: m.agencyId, role: "MANAGER" } },
        select: { email: true, firstName: true },
      });
      for (const r of recipients) await this.mailer.mandateUpdate(r.email, r.firstName, kind, params, `${ownerWebBase()}/pro/mandats`);
    })().catch(() => {});
  }

  private notifyOwner(m: MandateRow, kind: string, params: Record<string, string>) {
    (async () => {
      const o = await this.prisma.user.findUnique({ where: { id: m.ownerId }, select: { email: true, firstName: true, activatedAt: true } });
      if (o?.activatedAt) await this.mailer.mandateUpdate(o.email, o.firstName, kind, params, `${ownerWebBase()}/dashboard/mandats`);
    })().catch(() => {});
  }

  /** Statut courant utilisé par d'autres modules (tests, overview). */
  static isOpen(status: MandateStatus): boolean {
    return status === "ACTIVE" || status === "PENDING_OWNER";
  }
}
