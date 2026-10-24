import { ForbiddenException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { AgencyRole, MandateStatus, MandateType, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { today as todayDay } from "./dates";
import { SUBSCRIPTION_CODES, loadAgencySubscription, loadWritableMandates, mandateWriteGate } from "./subscription";

/**
 * PERMISSIONS SUR UN BIEN — point unique de décision.
 *
 * Qui peut agir sur un bien : son propriétaire (toujours), ou un
 * professionnel (rôle AGENT) dont l'agence détient un mandat ACTIVE sur ce
 * bien, à condition d'être MANAGER de l'agence ou l'agent ASSIGNÉ au mandat.
 * Toute autre personne (autre agence, agent non assigné, mandat en attente,
 * refusé ou terminé) est refusée.
 *
 * Abonnement : un pro dont l'agence est SUSPENDED (ou dont le mandat dépasse
 * la limite de l'offre) garde la LECTURE mais toute écriture est refusée
 * (402 SUBSCRIPTION_SUSPENDED / PLAN_LIMIT_MANDATES). Le propriétaire n'est
 * jamais concerné.
 *
 * La règle elle-même (`decideAccess`) est PURE et testée unitairement ; le
 * service charge le contexte (bien, propriétaire, adhésion, mandat) et lève
 * une 403 normalisée `{ statusCode, code, message }` en cas de refus.
 */

export type AccessAction =
  /** Voir le bien et tout son suivi (demandes, visites, messages, loyers, EDL, incidents, documents) */
  | "READ"
  /** Lire les baux (seul droit restant à un mandat LETTING après signature) */
  | "LEASE_READ"
  /** Modifier l'annonce, photos, tarifs, documents ; publier / archiver */
  | "EDIT_LISTING"
  /** Répondre aux messages, gérer les visites */
  | "MESSAGES"
  /** Choisir le locataire (accepter une demande) */
  | "ACCEPT_TENANT"
  /** Proposer un candidat au propriétaire */
  | "PROPOSE_TENANT"
  /** Refuser une demande */
  | "REJECT_INQUIRY"
  /** Préparer / modifier / supprimer le bail brouillon */
  | "LEASE_DRAFT"
  /** Signer le bail comme bailleur */
  | "SIGN_LEASE"
  /** État des lieux : rédiger et signer côté bailleur */
  | "INSPECTION"
  /** Caution, colocataires, incidents, avenants (préparation), régularisation */
  | "MANAGE"
  /** Signature bailleur d'un avenant */
  | "SIGN_AMENDMENT"
  /** Loyers : valider / refuser, quittances */
  | "RENTS"
  /** Congé bailleur */
  | "OWNER_NOTICE"
  /** Supprimer le bien */
  | "DELETE_PROPERTY";

export const ALL_ACTIONS: AccessAction[] = [
  "READ", "LEASE_READ", "EDIT_LISTING", "MESSAGES", "ACCEPT_TENANT", "PROPOSE_TENANT",
  "REJECT_INQUIRY", "LEASE_DRAFT", "SIGN_LEASE", "INSPECTION", "MANAGE", "SIGN_AMENDMENT",
  "RENTS", "OWNER_NOTICE", "DELETE_PROPERTY",
];

/** Décisions clés réservées au propriétaire (sauf propriétaire non activé). */
const OWNER_DECISIONS = new Set<AccessAction>(["ACCEPT_TENANT", "SIGN_LEASE", "SIGN_AMENDMENT"]);

/** Ce qu'un mandat de VENTE permet au professionnel. */
const SALE_ACTIONS = new Set<AccessAction>([
  "READ", "LEASE_READ", "EDIT_LISTING", "MESSAGES", "PROPOSE_TENANT", "REJECT_INQUIRY", "ACCEPT_TENANT",
]);

export interface AccessMandate {
  id: string;
  reference: string;
  type: MandateType;
  status: MandateStatus;
  agencyId: string;
  assignedAgentId: string | null;
  endDate: Date | null;
  /** Mandat LETTING : instant de la double signature d'un bail conclu sous ce mandat. */
  lettingCompletedAt: Date | null;
}

export interface AccessContext {
  userId: string;
  property: { id: string; ownerId: string };
  /** Le propriétaire a activé son compte (sinon le pro peut agir pour son compte). */
  ownerActivated: boolean;
  /** Adhésion de l'utilisateur à une agence (pro), sinon null. */
  membership: { agencyId: string; role: AgencyRole } | null;
  /** Mandat de l'agence de l'utilisateur sur ce bien (ouvert de préférence). */
  mandate: AccessMandate | null;
  /** Jour courant (fuseau plateforme) */
  today: Date;
  /**
   * Verrou d'abonnement de l'agence sur ce mandat (null/absent : écritures
   * permises). Seules READ et LEASE_READ restent possibles s'il est posé.
   */
  writeGate?: { code: string; message: string } | null;
}

/** Actions de pure lecture : toujours permises, même agence suspendue. */
export const READ_ONLY_ACTIONS = new Set<AccessAction>(["READ", "LEASE_READ"]);

export type AccessAs = "OWNER" | "PRO" | "NONE";

export interface AccessDecision {
  allowed: boolean;
  as: AccessAs;
  /** Le pro agit POUR LE COMPTE d'un propriétaire non activé (à journaliser). */
  onBehalf: boolean;
  code?: string;
  message?: string;
}

const deny = (as: AccessAs, code: string, message: string): AccessDecision => ({
  allowed: false,
  as,
  onBehalf: false,
  code,
  message,
});

/** Le mandat donne-t-il encore accès aujourd'hui (ACTIVE et non échu) ? */
export function mandateIsLive(m: { status: MandateStatus; endDate: Date | null }, today: Date): boolean {
  return m.status === "ACTIVE" && (!m.endDate || m.endDate.getTime() >= today.getTime());
}

/** RÈGLE PURE : matrice des permissions (voir AGENCES.md). */
export function decideAccess(ctx: AccessContext, action: AccessAction): AccessDecision {
  if (ctx.property.ownerId === ctx.userId) return { allowed: true, as: "OWNER", onBehalf: false };

  const m = ctx.mandate;
  if (!ctx.membership || !m || m.agencyId !== ctx.membership.agencyId) {
    return deny("NONE", "PROPERTY_ACCESS_DENIED", "Vous n'êtes pas propriétaire de ce bien");
  }
  if (!mandateIsLive(m, ctx.today)) {
    return deny(
      "NONE",
      "MANDATE_INACTIVE",
      m.status === "PENDING_OWNER"
        ? "Le mandat attend l'accord du propriétaire : aucun accès au bien pour l'instant."
        : "Le mandat sur ce bien n'est plus actif : accès retiré.",
    );
  }
  if (ctx.membership.role !== "MANAGER" && m.assignedAgentId !== ctx.userId) {
    return deny("NONE", "NOT_ASSIGNED", "Ce bien n'est pas assigné à votre compte : demandez au responsable de l'agence.");
  }

  // ── Professionnel autorisé : périmètre du mandat ──
  if (action === "DELETE_PROPERTY") {
    return deny("PRO", "OWNER_ONLY", "Seul le propriétaire peut supprimer ce bien.");
  }
  if (m.type === "LETTING" && m.lettingCompletedAt) {
    if (action === "LEASE_READ") return { allowed: true, as: "PRO", onBehalf: false };
    return deny(
      "PRO",
      "LETTING_MANDATE_COMPLETED",
      "Mandat de mise en location : le bail est signé, la gestion revient au propriétaire (lecture du bail seulement).",
    );
  }
  if (m.type === "SALE" && !SALE_ACTIONS.has(action)) {
    return deny("PRO", "MANDATE_SCOPE", "Cette action ne fait pas partie d'un mandat de vente.");
  }
  if (action === "OWNER_NOTICE" && m.type !== "MANAGEMENT") {
    return deny("PRO", "MANDATE_SCOPE", "Le congé bailleur par le professionnel exige un mandat de gestion.");
  }
  // Abonnement : lecture seule (agence suspendue ou mandat hors limite).
  if (ctx.writeGate && !READ_ONLY_ACTIONS.has(action)) {
    return deny("PRO", ctx.writeGate.code, ctx.writeGate.message);
  }
  if (OWNER_DECISIONS.has(action)) {
    if (ctx.ownerActivated) {
      return deny(
        "PRO",
        "OWNER_DECISION_REQUIRED",
        action === "ACCEPT_TENANT"
          ? "Le choix du locataire revient au propriétaire : proposez-lui ce candidat."
          : "La signature côté bailleur revient au propriétaire.",
      );
    }
    return { allowed: true, as: "PRO", onBehalf: true };
  }
  return { allowed: true, as: "PRO", onBehalf: false };
}

export function accessDenied(d: AccessDecision): HttpException {
  // Codes d'abonnement : 402 (le filtre d'exceptions l'impose aussi).
  if (d.code && SUBSCRIPTION_CODES.has(d.code)) {
    return new HttpException({ statusCode: 402, code: d.code, message: d.message }, 402);
  }
  return new ForbiddenException({ statusCode: 403, code: d.code, message: d.message });
}

// ─────────────────────────── Chargement du contexte ───────────────────────────

type Db = Pick<
  PrismaService,
  "property" | "agencyMember" | "mandate" | "leaseContract" | "user" | "agency" | "plan" | "platformSettings"
>;

/** Instant de complétion d'un mandat LETTING (bail doublement signé depuis son début). */
async function lettingCompletion(
  db: Db,
  propertyIds: string[],
  sinceByProperty: Map<string, Date>,
): Promise<Map<string, Date>> {
  const out = new Map<string, Date>();
  if (propertyIds.length === 0) return out;
  const leases = await db.leaseContract.findMany({
    where: {
      propertyId: { in: propertyIds },
      status: { not: "DRAFT" },
      ownerSignedAt: { not: null },
      tenantSignedAt: { not: null },
    },
    select: { propertyId: true, ownerSignedAt: true, tenantSignedAt: true },
  });
  for (const l of leases) {
    const done = new Date(Math.max(l.ownerSignedAt!.getTime(), l.tenantSignedAt!.getTime()));
    const since = sinceByProperty.get(l.propertyId);
    if (!since || done.getTime() < since.getTime()) continue;
    const prev = out.get(l.propertyId);
    if (!prev || done < prev) out.set(l.propertyId, done);
  }
  return out;
}

const MANDATE_ACCESS_SELECT = {
  id: true,
  reference: true,
  type: true,
  status: true,
  agencyId: true,
  assignedAgentId: true,
  endDate: true,
  acceptedAt: true,
  createdAt: true,
  propertyId: true,
  ownerId: true,
} as const;

/** Charge le contexte d'accès d'un utilisateur à un bien (404 si le bien n'existe pas). */
export async function loadAccessContext(db: Db, propertyId: string, userId: string): Promise<AccessContext> {
  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { id: true, ownerId: true, owner: { select: { activatedAt: true } } },
  });
  if (!property) throw new NotFoundException("Bien introuvable");
  const base: AccessContext = {
    userId,
    property: { id: property.id, ownerId: property.ownerId },
    ownerActivated: !!property.owner.activatedAt,
    membership: null,
    mandate: null,
    today: todayDay(),
  };
  if (property.ownerId === userId) return base;

  const membership = await db.agencyMember.findUnique({
    where: { userId },
    select: { agencyId: true, role: true },
  });
  if (!membership) return base;
  const mandates = await db.mandate.findMany({
    where: { propertyId, agencyId: membership.agencyId },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: MANDATE_ACCESS_SELECT,
  });
  const m = mandates.find((x) => x.status === "ACTIVE") ?? mandates.find((x) => x.status === "PENDING_OWNER") ?? mandates[0];
  if (!m) return { ...base, membership };
  let lettingCompletedAt: Date | null = null;
  if (m.type === "LETTING") {
    const since = m.acceptedAt ?? m.createdAt;
    lettingCompletedAt = (await lettingCompletion(db, [propertyId], new Map([[propertyId, since]]))).get(propertyId) ?? null;
  }
  // Verrou d'abonnement (seulement utile si le mandat donne accès).
  let writeGate: AccessContext["writeGate"] = null;
  if (m.status === "ACTIVE") {
    const sub = await loadAgencySubscription(db, membership.agencyId);
    writeGate = mandateWriteGate(sub, sub.writable ? await loadWritableMandates(db, sub) : null, m.id);
  }
  return {
    ...base,
    writeGate,
    membership,
    mandate: {
      id: m.id,
      reference: m.reference,
      type: m.type,
      status: m.status,
      agencyId: m.agencyId,
      assignedAgentId: m.assignedAgentId,
      endDate: m.endDate,
      lettingCompletedAt,
    },
  };
}

/**
 * Biens sur lesquels l'utilisateur (pro) peut effectuer `action` via un
 * mandat actif de son agence. Le propriétaire, lui, est couvert par
 * `ownerId` dans les requêtes.
 */
export async function managedPropertyIds(db: Db, userId: string, action: AccessAction): Promise<string[]> {
  const membership = await db.agencyMember.findUnique({
    where: { userId },
    select: { agencyId: true, role: true },
  });
  if (!membership) return [];
  const today = todayDay();
  const mandates = await db.mandate.findMany({
    where: {
      agencyId: membership.agencyId,
      status: "ACTIVE",
      OR: [{ endDate: null }, { endDate: { gte: today } }],
      ...(membership.role === "MANAGER" ? {} : { assignedAgentId: userId }),
    },
    select: { ...MANDATE_ACCESS_SELECT, property: { select: { owner: { select: { activatedAt: true } } } } },
  });
  const sub = await loadAgencySubscription(db, membership.agencyId);
  const writable = sub.writable ? await loadWritableMandates(db, sub) : null;
  const letting = mandates.filter((m) => m.type === "LETTING");
  const completion = await lettingCompletion(
    db,
    letting.map((m) => m.propertyId),
    new Map(letting.map((m) => [m.propertyId, m.acceptedAt ?? m.createdAt])),
  );
  return mandates
    .filter((m) =>
      decideAccess(
        {
          userId,
          property: { id: m.propertyId, ownerId: m.ownerId },
          ownerActivated: !!m.property.owner.activatedAt,
          membership,
          mandate: {
            id: m.id,
            reference: m.reference,
            type: m.type,
            status: m.status,
            agencyId: m.agencyId,
            assignedAgentId: m.assignedAgentId,
            endDate: m.endDate,
            lettingCompletedAt: completion.get(m.propertyId) ?? null,
          },
          today,
          writeGate: mandateWriteGate(sub, writable, m.id),
        },
        action,
      ).allowed,
    )
    .map((m) => m.propertyId);
}

/**
 * Service injectable : utilisé par TOUS les services qui vérifiaient
 * auparavant `property.ownerId === user.id`.
 */
@Injectable()
export class PropertyAccessService {
  constructor(private readonly prisma: PrismaService) {}

  context(propertyId: string, userId: string): Promise<AccessContext> {
    return loadAccessContext(this.prisma, propertyId, userId);
  }

  /** Vérifie `action` sur le bien ; 404 si le bien n'existe pas, 403 normalisée sinon. */
  async assert(propertyId: string, userId: string, action: AccessAction) {
    const ctx = await this.context(propertyId, userId);
    const decision = decideAccess(ctx, action);
    if (!decision.allowed) throw accessDenied(decision);
    return { ctx, decision };
  }

  /** Décision sans lever d'exception. */
  async check(propertyId: string, userId: string, action: AccessAction) {
    const ctx = await this.context(propertyId, userId);
    return { ctx, decision: decideAccess(ctx, action) };
  }

  managedPropertyIds(userId: string, action: AccessAction): Promise<string[]> {
    return managedPropertyIds(this.prisma, userId, action);
  }

  /** Filtre Prisma « biens accessibles » : les miens + ceux que je gère. */
  async propertyWhere(userId: string, action: AccessAction): Promise<Prisma.PropertyWhereInput> {
    const managed = await this.managedPropertyIds(userId, action);
    return managed.length ? { OR: [{ ownerId: userId }, { id: { in: managed } }] } : { ownerId: userId };
  }

  /** Journalise un événement de mandat (best-effort hors transaction). */
  async logEvent(
    mandateId: string | null | undefined,
    actorId: string | null,
    kind: string,
    data?: Prisma.InputJsonValue,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    if (!mandateId) return;
    const db = tx ?? this.prisma;
    await db.mandateEvent.create({ data: { mandateId, actorId, kind, ...(data !== undefined ? { data } : {}) } });
  }

  /** « Prénom Nom (Agence) » d'un pro, pour les mentions et l'historique. */
  async proLabel(userId: string): Promise<{ name: string; agencyName: string | null }> {
    const u = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { firstName: true, lastName: true, agencyMember: { select: { agency: { select: { name: true } } } } },
    });
    return {
      name: u ? `${u.firstName} ${u.lastName}`.trim() : "",
      agencyName: u?.agencyMember?.agency.name ?? null,
    };
  }

  /**
   * Mention de signature « pour le compte de » :
   * « Signé par X (Agence), mandataire, pour le compte de Y — mandat MAN-… ».
   */
  async onBehalfMention(ctx: AccessContext): Promise<string> {
    const [pro, owner] = await Promise.all([
      this.proLabel(ctx.userId),
      this.prisma.user.findUnique({
        where: { id: ctx.property.ownerId },
        select: { firstName: true, lastName: true },
      }),
    ]);
    const ownerName = owner ? `${owner.firstName} ${owner.lastName}`.trim() : "le propriétaire";
    return `Signé par ${pro.name}${pro.agencyName ? ` (${pro.agencyName})` : ""}, mandataire, pour le compte de ${ownerName} — mandat ${ctx.mandate?.reference ?? ""}`.trim();
  }

  /** Mention « par X, mandataire de Y » (état des lieux signé par un pro). */
  async agentMention(ctx: AccessContext): Promise<string> {
    const [pro, owner] = await Promise.all([
      this.proLabel(ctx.userId),
      this.prisma.user.findUnique({
        where: { id: ctx.property.ownerId },
        select: { firstName: true, lastName: true },
      }),
    ]);
    const ownerName = owner ? `${owner.firstName} ${owner.lastName}`.trim() : "le propriétaire";
    return `par ${pro.name}${pro.agencyName ? ` (${pro.agencyName})` : ""}, mandataire de ${ownerName}`;
  }

  /** Mandat ACTIVE (non échu) sur un bien, s'il existe. */
  activeMandate(propertyId: string, db: Prisma.TransactionClient | PrismaService = this.prisma) {
    const today = todayDay();
    return db.mandate.findFirst({
      where: { propertyId, status: "ACTIVE", OR: [{ endDate: null }, { endDate: { gte: today } }] },
      include: { agency: { select: { id: true, name: true, slug: true, logoKey: true, paymentIban: true, paymentHolder: true, registrationNumber: true } } },
    });
  }

  /** Destinataires « côté pro » d'un bien géré : l'agent assigné, sinon les responsables. */
  async proRecipients(propertyId: string): Promise<Array<{ id: string; email: string; firstName: string }>> {
    const m = await this.activeMandate(propertyId);
    if (!m) return [];
    return this.prisma.user.findMany({
      where: m.assignedAgentId ? { id: m.assignedAgentId } : { agencyMember: { agencyId: m.agencyId, role: "MANAGER" } },
      select: { id: true, email: true, firstName: true },
    });
  }
}
