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

// Interlocuteur : nom et avatar (URL) seulement — ni e-mail ni téléphone :
// démarrer une conversation ne doit pas suffire à récupérer les coordonnées
// du propriétaire.
const userPublicSelect = USER_PUBLIC_SELECT;

/** Nombre maximum de messages renvoyés par fil (les plus récents). */
const MAX_MESSAGES = 500;

const messageInclude = {
  sender: { select: userPublicSelect },
} as const;

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

/** Photo du bien : URL publique au lieu du contenu. */
function shapeConvo<T extends { property: { media: Array<{ id: string }> } }>(c: T): T {
  return { ...c, property: { ...c.property, media: c.property.media.map(withMediaUrl) } };
}

function isUniqueViolation(e: unknown): boolean {
  return (e as Prisma.PrismaClientKnownRequestError)?.code === "P2002";
}

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

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

  /** Liste les conversations de l'utilisateur (en tant que owner ou other). */
  async listMine(userId: string) {
    const items = await this.prisma.conversation.findMany({
      where: {
        OR: [{ ownerId: userId }, { otherUserId: userId }],
      },
      include: {
        ...conversationInclude,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: messageInclude,
        },
        _count: {
          select: {
            messages: {
              where: {
                readAt: null,
                NOT: { senderId: userId },
              },
            },
          },
        },
      },
      orderBy: [{ lastMessageAt: "desc" }, { createdAt: "desc" }],
      take: 500,
    });
    return items.map(shapeConvo);
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
    if (convo.ownerId !== userId && convo.otherUserId !== userId) {
      throw new ForbiddenException("Vous n'avez pas accès à ce fil.");
    }
    return shapeConvo({ ...convo, messages: [...convo.messages].reverse() });
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
      select: { ownerId: true, otherUserId: true },
    });
    if (!convo) throw new NotFoundException("Conversation introuvable");
    if (
      !opts.skipAuthCheck &&
      convo.ownerId !== senderId &&
      convo.otherUserId !== senderId
    ) {
      throw new ForbiddenException("Vous n'avez pas accès à ce fil.");
    }
    const trimmed = content.trim();
    if (!trimmed)
      throw new BadRequestException("Le message ne peut pas être vide.");

    const now = new Date();
    // Anti-spam e-mail : on ne notifie le destinataire que s'il n'a AUCUN
    // message non lu dans ce fil (le premier d'une rafale suffit).
    const recipientId = convo.ownerId === senderId ? convo.otherUserId : convo.ownerId;
    const unreadBefore = await this.prisma.message.count({
      where: { conversationId, senderId: { not: recipientId }, readAt: null },
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
    }

    return message;
  }

  /** Marque tous les messages non-lus de la conversation comme lus pour cet utilisateur. */
  async markAsRead(conversationId: string, userId: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { ownerId: true, otherUserId: true },
    });
    if (!convo) throw new NotFoundException("Conversation introuvable");
    if (convo.ownerId !== userId && convo.otherUserId !== userId) {
      throw new ForbiddenException("Vous n'avez pas accès à ce fil.");
    }

    const result = await this.prisma.message.updateMany({
      where: {
        conversationId,
        readAt: null,
        NOT: { senderId: userId },
      },
      data: { readAt: new Date() },
    });
    return { marked: result.count };
  }

  /** Nombre total de messages non-lus pour l'utilisateur, tous fils confondus. */
  async unreadCount(userId: string) {
    const count = await this.prisma.message.count({
      where: {
        readAt: null,
        NOT: { senderId: userId },
        conversation: {
          OR: [{ ownerId: userId }, { otherUserId: userId }],
        },
      },
    });
    return { count };
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
    const sender = convo.owner.id === senderId ? convo.owner : convo.otherUser;
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
