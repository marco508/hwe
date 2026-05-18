import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ConversationsService } from "./conversations.service";
import { SendMessageDto } from "./dto/send-message.dto";
import { StartConversationDto } from "./dto/start-conversation.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";

@UseGuards(JwtAuthGuard)
@Controller("conversations")
export class ConversationsController {
  constructor(private readonly conversations: ConversationsService) {}

  /** Liste de mes conversations (owner OU other). */
  @Get()
  list(@CurrentUser() user: JwtPayload) {
    return this.conversations.listMine(user.sub);
  }

  /** Nombre de messages non-lus, pour le badge dans la navbar. */
  @Get("unread-count")
  unreadCount(@CurrentUser() user: JwtPayload) {
    return this.conversations.unreadCount(user.sub);
  }

  /** Démarre (ou récupère) une conversation sur un bien. */
  @Post("start")
  start(
    @CurrentUser() user: JwtPayload,
    @Body() dto: StartConversationDto,
  ) {
    return this.conversations.getOrCreate(user.sub, dto.propertyId);
  }

  /** Détail d'une conversation + tous ses messages. */
  @Get(":id")
  get(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.conversations.findById(id, user.sub);
  }

  /** Envoyer un message. */
  @Post(":id/messages")
  send(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.conversations.postMessage(id, user.sub, dto.content);
  }

  /** Marquer la conversation comme lue. */
  @Post(":id/read")
  markRead(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.conversations.markAsRead(id, user.sub);
  }
}
