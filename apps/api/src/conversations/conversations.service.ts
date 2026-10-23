import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { assertEmailVerified } from "../common/email-verified.util";
import { MEDIA_SELECT, USER_PUBLIC_SELECT, withMediaUrl } from "../common/media.util";
import { PropertyAccessService } from "../common/property-access";

// Interlocuteur : nom et avatar (URL) seulement — ni e-mail ni téléphone :
// démarrer une conversation ne doit pas suffire à récupérer les coordonnées
// du propriétaire.
const userPublicSelect = USER_PUBLIC_SELECT;

/** Nombre maximum de messages renvoyés par fil (les plus récents). */
const MAX_MESSAGES = 500;

// Auteur d'un message : nom, avatar et, pour un pro, son agence
// (« par <nom> (<agence>) » côté bailleur d'un bien géré).
const messageInclude = {
  sender: {
    select: {
      ...userPublicSelect,
      agencyMember: { select: { agency: { select: { name: true, slug: true } } } },
    },
  },
} as const;

type WithSender = { sender: { agencyMember?: { agency: { name: string; slug: string } } | null } & Record<string, unknown> };

/** sender.agencyMember → sender.agency ({ name, slug } | null). */
function shapeMessage<T extends WithSender>(m: T) {
  const { agencyMember, ...sender } = m.sender;
  return { ...m, sender: { ...sender, agency: agencyMember?.agency ?? null } };
}

const conversationInclude = {
  owner: { select: userPublicSelect },
  otherUser: { select: userPublicSelect },
  property: {
    select: {
      id: true,
      title: true,
      city: true,
      listingType: true,
      price: true,
      currency: true,
      media: {
        orderBy: { position: "asc" as const },
        take: 1,
        select: MEDIA_SELECT,
      },
    },
  },
} as const;

/** Photo du bien : URL publique au lieu du contenu ; auteurs des messages avec leur agence. */
function shapeConvo<T extends { property: { media: Array<{ id: string }> }; messages?: WithSender[] }>(c: T): T {
  return {
    ...c,
    property: { ...c.property, media: c.property.media.map(withMediaUrl) },
    ...(c.messages ? { messages: c.messages.map(shapeMessage) } : {}),
  } as T;
}

function isUniqueViolation(e: unknown): boolean {
  return (e as Prisma.PrismaClientKnownRequestError)?.code === "P2002";
}

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly access: PropertyAccessService,
  ) {}

  /**
   * Côté bailleur d'un fil : le propriétaire (ownerId) ou un pro mandataire
   * autorisé sur le bien. `action` : READ pour lire, MESSAGES pour écrire.
   */
  private async isLandlordSide(
    convo: { ownerId: string; propertyId: string },
    userId: string,
    action: "READ" | "MESSAGES" = "READ",
  ): Promise<boolean> {
    if (convo.ownerId === userId) return true;
    return (await this.access.check(convo.propertyId, userId, action)).decision.allowed;
  }

  /**
   * Non-lus par fil, selon le côté du lecteur : l'autre partie lit tout ce
   * qu'elle n'a pas écrit ; le côté bailleur (propriétaire ET pros) lit les
   * messages de l'autre partie. `readAt` est partagé par le côté bailleur.
   */
  private async unreadByConversation(ids: string[], userId: string): Promise<Map<string, number>> {
    if (ids.length === 0) return new Map();
    const rows = await this.prisma.$queryRaw<Array<{ id: string; n: number }>>`
      SELECT m."conversationId" AS id, count(*)::int AS n
      FROM "Message" m JOIN "Conversation" c ON c."id" = m."conversationId"
      WHERE m."readAt" IS NULL AND c."id" = ANY(${ids}::text[])
        AND ((c."otherUserId" = ${userId} AND m."senderId" <> ${userId})
          OR (c."otherUserId" <> ${userId} AND m."senderId" = c."otherUserId"))
      GROUP BY m."conversationId"`;
    return new Map(rows.map((r) => [r.id, Number(r.n)]));
  }

  /**
   * Crée (ou récupère) une conversation entre un utilisateur connecté et le
   * propriétaire d'un bien donné. Utilisé quand on clique "Discuter" sur un
   * bien sans avoir encore envoyé d'inquiry, ou pour réouvrir un fil existant.
   */
  async getOrCreate(currentUserId: string, propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      select: { id: true, ownerId: true, status: true },
    });
    if (!property) throw new NotFoundException("Bien introuvable");
    if (property.ownerId === currentUserId) {
      throw new BadRequestException(
        "Vous êtes le propriétaire de ce bien.",
      );
    }
    if ((await this.access.check(propertyId, currentUserId, "READ")).decision.allowed) {
      throw new BadRequestException("Vous gérez ce bien : retrouvez ses conversations dans votre messagerie.");
    }

    const existing = await this.prisma.conversation.findUnique({
      where: {
        ownerId_otherUserId_propertyId: {
          ownerId: property.ownerId,
          otherUserId: currentUserId,
          propertyId,
        },
      },
      include: conversationInclude,
    });
    if (existing) return shapeConvo(existing);

    // Nouveau fil : e-mail vérifié et annonce publiée (anti-spam des propriétaires).
    await assertEmailVerified(this.prisma, currentUserId);
    if (property.status !== "PUBLISHED") {
      throw new NotFoundException("Annonce introuvable ou plus disponible.");
    }
    try {
      return shapeConvo(
        await this.prisma.conversation.create({
          data: {
            propertyId,
            ownerId: property.ownerId,
            otherUserId: currentUserId,
          },
          include: conversationInclude,
        }),
      );
    } catch (e) {
      // Double clic : le fil vient d'être créé par la requête concurrente.
      if (!isUniqueViolation(e)) throw e;
      const again = await this.prisma.conversation.findUniqueOrThrow({
        where: {
          ownerId_otherUserId_propertyId: {
            ownerId: property.ownerId,
            otherUserId: currentUserId,
            propertyId,
          },
        },
        include: conversationInclude,
      });
      return shapeConvo(again);
    }
  }

  /**
   * Appelé par le module inquiries après création d'une demande pour ouvrir
   * automatiquement un fil de discussion avec le premier message.
   */
  async getOrCreateForInquiry(inquiryId: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      include: { property: { select: { ownerId: true, id: true } } },
    });
    if (!inquiry) throw new NotFoundException("Demande introuvable");

    const ownerId = inquiry.property.ownerId;
    const otherUserId = inquiry.senderId;
    const propertyId = inquiry.property.id;

    const existing = await this.prisma.conversation.findUnique({
      where: {
        ownerId_otherUserId_propertyId: { ownerId, otherUserId, propertyId },
      },
      include: conversationInclude,
    });

    let convo = existing;
    if (!convo) {
      try {
        convo = await this.prisma.conversation.create({
          data: { propertyId, ownerId, otherUserId, inquiryId },
          include: conversationInclude,
        });
      } catch (e) {
        if (!isUniqueViolation(e)) throw e;
        convo = await this.prisma.conversation.findUniqueOrThrow({
          where: { ownerId_otherUserId_propertyId: { ownerId, otherUserId, propertyId } },
          include: conversationInclude,
        });
      }
    } else if (!convo.inquiryId) {
      // Fil ouvert avant la demande : on le rattache à celle-ci.
      await this.prisma.conversation
        .updateMany({ where: { id: convo.id, inquiryId: null }, data: { inquiryId } })
        .catch(() => {});
    }

    // Si la conversation n'a pas encore de message, on insère le message
    // initial de l'inquiry comme premier message.
    const count = await this.prisma.message.count({
      where: { conversationId: convo.id },
    });
    if (count === 0 && inquiry.message?.trim()) {
      await this.postMessage(convo.id, otherUserId, inquiry.message.trim(), {
        skipAuthCheck: true,
      });
    }

    return shapeConvo(convo);
  }

  /**
   * Liste les conversations de l'utilisateur : en tant que propriétaire,
   * autre partie, ou pro mandataire des biens qu'il gère (côté bailleur).
   */
  async listMine(userId: string) {
    const managed = await this.access.managedPropertyIds(userId, "READ");
    const items = await this.prisma.conversation.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { otherUserId: userId },
          ...(managed.length ? [{ propertyId: { in: managed } }] : []),
        ],
      },
      include: {
        ...conversationInclude,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: messageInclude,
        },
      },
      orderBy: [{ lastMessageAt: "desc" }, { createdAt: "desc" }],
      take: 500,
    });
    const unread = await this.unreadByConversation(items.map((c) => c.id), userId);
    return items.map((c) => ({
      ...shapeConvo(c),
      _count: { messages: unread.get(c.id) ?? 0 },
      side: c.otherUserId === userId ? "OTHER" : "LANDLORD",
    }));
  }

  /** Récupère le détail (auth check) avec les messages. */
  async findById(conversationId: string, userId: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        ...conversationInclude,
        // Les plus récents (bornés), remis ensuite dans l'ordre chronologique.
        messages: {
          orderBy: { createdAt: "desc" },
          take: MAX_MESSAGES,
          include: messageInclude,
        },
      },
    });
    if (!convo) throw new NotFoundException("Conversation introuvable");
    if (convo.otherUserId !== userId && !(await this.isLandlordSide(convo, userId, "READ"))) {
      throw new ForbiddenException("Vous n'avez pas accès à ce fil.");
    }
    return {
      ...shapeConvo({ ...convo, messages: [...convo.messages].reverse() }),
      side: convo.otherUserId === userId ? "OTHER" : "LANDLORD",
    };
  }

  /** Envoie un message. */
  async postMessage(
    conversationId: string,
    senderId: string,
    content: string,
    opts: { skipAuthCheck?: boolean } = {},
  ) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { ownerId: true, otherUserId: true, propertyId: true },
    });
    if (!convo) throw new NotFoundException("Conversation introuvable");
    if (
      !opts.skipAuthCheck &&
      convo.otherUserId !== senderId &&
      !(await this.isLandlordSide(convo, senderId, "MESSAGES"))
    ) {
      throw new ForbiddenException("Vous n'avez pas accès à ce fil.");
    }
    const trimmed = content.trim();
    if (!trimmed)
      throw new BadRequestException("Le message ne peut pas être vide.");

    const now = new Date();
    // Anti-spam e-mail : on ne notifie le destinataire que s'il n'a AUCUN
    // message non lu dans ce fil (le premier d'une rafale suffit).
    // Écrit par le côté bailleur (propriétaire ou pro) → destinataire : l'autre partie.
    const fromOther = convo.otherUserId === senderId;
    const recipientId = fromOther ? convo.ownerId : convo.otherUserId;
    const unreadBefore = await this.prisma.message.count({
      where: fromOther
        ? { conversationId, senderId: convo.otherUserId, readAt: null }
        : { conversationId, senderId: { not: convo.otherUserId }, readAt: null },
    });

    const [message] = await this.prisma.$transaction([
      this.prisma.message.create({
        data: {
          conversationId,
          senderId,
          content: trimmed,
          createdAt: now,
        },
        include: messageInclude,
      }),
      this.prisma.conversation.update({
        where: { id: conversationId },
        data: { lastMessageAt: now },
      }),
    ]);

    if (unreadBefore === 0) {
      this.notifyRecipient(conversationId, senderId, recipientId).catch(() => {});
      // Bien géré : le pro est prévenu aussi des messages de l'autre partie.
      if (fromOther) this.notifyPros(conversationId, convo.propertyId, senderId).catch(() => {});
    }

    return shapeMessage(message);
  }

  /** Marque tous les messages non-lus de la conversation comme lus pour cet utilisateur. */
  async markAsRead(conversationId: string, userId: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { ownerId: true, otherUserId: true, propertyId: true },
    });
    if (!convo) throw new NotFoundException("Conversation introuvable");
    const isOther = convo.otherUserId === userId;
    if (!isOther && !(await this.isLandlordSide(convo, userId, "READ"))) {
      throw new ForbiddenException("Vous n'avez pas accès à ce fil.");
    }

    // Côté bailleur : seuls les messages de l'autre partie passent « lus »
    // (ceux du propriétaire restent non lus pour le locataire).
    const result = await this.prisma.message.updateMany({
      where: {
        conversationId,
        readAt: null,
        ...(isOther ? { NOT: { senderId: userId } } : { senderId: convo.otherUserId }),
      },
      data: { readAt: new Date() },
    });
    return { marked: result.count };
  }

  /** Nombre total de messages non-lus pour l'utilisateur, tous fils confondus. */
  async unreadCount(userId: string) {
    const managed = await this.access.managedPropertyIds(userId, "READ");
    const rows = await this.prisma.$queryRaw<Array<{ n: number }>>`
      SELECT count(*)::int AS n
      FROM "Message" m JOIN "Conversation" c ON c."id" = m."conversationId"
      WHERE m."readAt" IS NULL
        AND (c."ownerId" = ${userId} OR c."otherUserId" = ${userId} OR c."propertyId" = ANY(${managed}::text[]))
        AND ((c."otherUserId" = ${userId} AND m."senderId" <> ${userId})
          OR (c."otherUserId" <> ${userId} AND m."senderId" = c."otherUserId"))`;
    return { count: Number(rows[0]?.n ?? 0) };
  }

  /** E-mail « nouveau message » aux pros d'un bien géré (agent assigné ou responsables). */
  private async notifyPros(conversationId: string, propertyId: string, senderId: string) {
    const [pros, convo] = await Promise.all([
      this.access.proRecipients(propertyId),
      this.prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { property: { select: { title: true } }, otherUser: { select: { firstName: true } } },
      }),
    ]);
    if (!convo) return;
    const base = (process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech").replace(/\/+$/, "");
    for (const p of pros) {
      if (p.id === senderId) continue;
      await this.mailer.messageReceived(p.email, p.firstName, convo.otherUser.firstName, convo.property.title, `${base}/dashboard/messages`);
    }
  }

  // E-mail « nouveau message » (best-effort) — URL selon le rôle du destinataire.
  private async notifyRecipient(conversationId: string, senderId: string, recipientId: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        property: { select: { title: true } },
        owner: { select: { id: true, email: true, firstName: true } },
        otherUser: { select: { id: true, email: true, firstName: true } },
      },
    });
    if (!convo) return;
    const recipient = convo.owner.id === recipientId ? convo.owner : convo.otherUser;
    const sender =
      convo.otherUser.id === senderId
        ? convo.otherUser
        : convo.owner.id === senderId
          ? convo.owner
          : ((await this.prisma.user.findUnique({ where: { id: senderId }, select: { id: true, email: true, firstName: true } })) ?? convo.owner);
    const isOwnerRecipient = convo.owner.id === recipientId;
    const base = (
      isOwnerRecipient
        ? process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech"
        : process.env.TENANT_WEB_URL || "https://tenant.hwe.dkpsolution.tech"
    ).replace(/\/+$/, "");
    const url = isOwnerRecipient ? `${base}/dashboard/messages` : `${base}/messages`;
    await this.mailer.messageReceived(
      recipient.email,
      recipient.firstName,
      sender.firstName,
      convo.property.title,
      url,
    );
  }
}
