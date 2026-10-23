import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { AgenciesService } from "./agencies.service";
import { CreateAgencyDto, InviteAgentDto, MemberRoleDto, UpdateAgencyDto } from "./dto/agency.dto";

/**
 * Agences et équipes. Routes fixes déclarées AVANT `:slug` (page publique).
 */
@Controller("agencies")
export class AgenciesController {
  constructor(private readonly agencies: AgenciesService) {}

  /** Un pro sans agence crée la sienne (il en devient MANAGER). */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateAgencyDto) {
    return this.agencies.create(user.sub, user.role, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Get("me")
  mine(@CurrentUser() user: JwtPayload) {
    return this.agencies.mine(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Patch("me")
  update(@CurrentUser() user: JwtPayload, @Body() dto: UpdateAgencyDto) {
    return this.agencies.update(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Get("me/overview")
  overview(@CurrentUser() user: JwtPayload) {
    return this.agencies.overview(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Post("me/invites")
  invite(@CurrentUser() user: JwtPayload, @Body() dto: InviteAgentDto) {
    return this.agencies.invite(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Get("me/invites")
  invites(@CurrentUser() user: JwtPayload) {
    return this.agencies.listInvites(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Delete("me/invites/:id")
  revokeInvite(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.agencies.revokeInvite(user.sub, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Patch("me/members/:userId")
  setRole(@CurrentUser() user: JwtPayload, @Param("userId") userId: string, @Body() dto: MemberRoleDto) {
    return this.agencies.setMemberRole(user.sub, userId, dto.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Delete("me/members/:userId")
  removeMember(@CurrentUser() user: JwtPayload, @Param("userId") userId: string) {
    return this.agencies.removeMember(user.sub, userId);
  }

  /** Public : page d'invitation d'un agent. */
  @Get("invites/:token")
  inviteInfo(@Param("token") token: string) {
    return this.agencies.inviteInfo(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post("invites/:token/accept")
  accept(@CurrentUser() user: JwtPayload, @Param("token") token: string) {
    return this.agencies.acceptInvite(user.sub, user.role, token);
  }

  /** Public : recherche par nom ou code (propriétaire qui confie un bien). */
  @Get("search")
  search(@Query("q") q?: string) {
    return this.agencies.search(typeof q === "string" ? q : undefined);
  }

  /** Public : profil et biens publiés de l'agence. */
  @Get(":slug")
  profile(@Param("slug") slug: string) {
    return this.agencies.publicProfile(slug);
  }
}
