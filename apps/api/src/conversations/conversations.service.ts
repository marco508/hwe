import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

const userPublicSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  avatarUrl: true,
} as const;

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
        select: { url: true },
      },
    },
  },
} as const;

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}

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
    if (existing) return existing;

    return this.prisma.conversation.create({
      data: {
        propertyId,
        ownerId: property.ownerId,
        otherUserId: currentUserId,
      },
      include: conversationInclude,
    });
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

    const convo =
      existing ??
      (await this.prisma.conversation.create({
        data: {
          propertyId,
          ownerId,
          otherUserId,
          inquiryId,
        },
        include: conversationInclude,
      }));

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

    return convo;
  }

  /** Liste les conversations de l'utilisateur (en tant que owner ou other). */
  async listMine(userId: string) {
    return this.prisma.conversation.findMany({
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
    });
  }

  /** Récupère le détail (auth check) avec les messages. */
  async findById(conversationId: string, userId: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        ...conversationInclude,
        messages: {
          orderBy: { createdAt: "asc" },
          include: messageInclude,
        },
      },
    });
    if (!convo) throw new NotFoundException("Conversation introuvable");
    if (convo.ownerId !== userId && convo.otherUserId !== userId) {
      throw new ForbiddenException("Vous n'avez pas accès à ce fil.");
    }
    return convo;
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
}
