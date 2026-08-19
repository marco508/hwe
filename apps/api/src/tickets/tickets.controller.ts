import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Role, TicketStatus } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto, ReviewTicketDto } from "./dto/ticket.dto";

/** Incidents rattachés à un bail (l'accès aux parties est contrôlé dans le service). */
@UseGuards(JwtAuthGuard)
@Controller("leases/:leaseId/tickets")
export class LeaseTicketsController {
  constructor(private readonly tickets: TicketsService) {}

  @Post()
  create(
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateTicketDto,
  ) {
    return this.tickets.create(leaseId, user, dto);
  }

  @Get()
  list(@Param("leaseId") leaseId: string, @CurrentUser() user: JwtPayload) {
    return this.tickets.listForLease(leaseId, user);
  }
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("tickets")
export class TicketsController {
  constructor(private readonly tickets: TicketsService) {}

  /** Mes signalements (côté locataire — un OWNER peut aussi être locataire). */
  @Get("my")
  my(@CurrentUser() user: JwtPayload) {
    return this.tickets.my(user.sub);
  }

  /** Les incidents sur mes biens (côté propriétaire). */
  @Get("owner")
  @Roles(Role.OWNER, Role.ADMIN)
  owner(@CurrentUser() user: JwtPayload, @Query("status") status?: TicketStatus) {
    return this.tickets.owner(user.sub, status);
  }

  @Patch(":id")
  @Roles(Role.OWNER, Role.ADMIN)
  review(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: ReviewTicketDto,
  ) {
    return this.tickets.review(id, user.sub, dto);
  }
}
