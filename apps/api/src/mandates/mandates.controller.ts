import { Body, Controller, Get, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { MandatesService } from "./mandates.service";
import {
  AcceptRequestDto,
  ByOwnerDto,
  EndMandateDto,
  FeeQueryDto,
  InviteMandateDto,
  MandateQueryDto,
  MonthQueryDto,
  RejectMandateDto,
  UpdateFeeDto,
  UpdateMandateDto,
  WithNewOwnerDto,
} from "./dto/mandate.dto";

function sendPdf(res: Response, buffer: Buffer, filename: string) {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Cache-Control", "private, no-store");
  res.send(buffer);
}

/** Mandats : routes fixes déclarées AVANT `:id`. */
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("mandates")
export class MandatesController {
  constructor(private readonly mandates: MandatesService) {}

  @Get()
  @Roles(Role.OWNER, Role.AGENT, Role.ADMIN)
  list(@CurrentUser() user: JwtPayload, @Query() q: MandateQueryDto) {
    return this.mandates.list(user, q);
  }

  @Post("invite")
  @Roles(Role.AGENT)
  invite(@CurrentUser() user: JwtPayload, @Body() dto: InviteMandateDto) {
    return this.mandates.invite(user, dto);
  }

  @Post("with-new-owner")
  @Roles(Role.AGENT)
  withNewOwner(@CurrentUser() user: JwtPayload, @Body() dto: WithNewOwnerDto) {
    return this.mandates.withNewOwner(user, dto);
  }

  @Post("by-owner")
  @Roles(Role.OWNER, Role.ADMIN)
  byOwner(@CurrentUser() user: JwtPayload, @Body() dto: ByOwnerDto) {
    return this.mandates.byOwner(user, dto);
  }

  @Get("requests")
  @Roles(Role.OWNER, Role.AGENT, Role.ADMIN)
  requests(@CurrentUser() user: JwtPayload) {
    return this.mandates.listRequests(user);
  }

  @Post("requests/:id/accept")
  @Roles(Role.OWNER, Role.ADMIN)
  acceptRequest(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: AcceptRequestDto) {
    return this.mandates.acceptRequest(user, id, dto);
  }

  /** Propriétaire : refuse ; pro : annule sa demande. */
  @Post("requests/:id/reject")
  @Roles(Role.OWNER, Role.AGENT, Role.ADMIN)
  rejectRequest(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.mandates.rejectRequest(user, id);
  }

  @Get(":id")
  @Roles(Role.OWNER, Role.AGENT, Role.ADMIN)
  detail(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.mandates.detail(user, id);
  }

  @Patch(":id")
  @Roles(Role.AGENT)
  update(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: UpdateMandateDto) {
    return this.mandates.update(user, id, dto);
  }

  @Post(":id/accept")
  @Roles(Role.OWNER, Role.ADMIN)
  accept(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.mandates.accept(user, id);
  }

  @Post(":id/reject")
  @Roles(Role.OWNER, Role.ADMIN)
  reject(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: RejectMandateDto) {
    return this.mandates.reject(user, id, dto.reason);
  }

  @Post(":id/end")
  @Roles(Role.OWNER, Role.AGENT, Role.ADMIN)
  end(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: EndMandateDto) {
    return this.mandates.end(user, id, dto.reason);
  }

  @Post(":id/resend-owner-invite")
  @Roles(Role.AGENT)
  resend(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.mandates.resendOwnerInvite(user, id);
  }

  @Get(":id/statements")
  @Roles(Role.OWNER, Role.AGENT, Role.ADMIN)
  statement(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Query() q: MonthQueryDto) {
    return this.mandates.statement(user, id, q.month);
  }

  @Get(":id/statements/:month/pdf")
  @Roles(Role.OWNER, Role.AGENT, Role.ADMIN)
  async statementPdf(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
    @Param("month") month: string,
    @Res() res: Response,
  ) {
    const { buffer, filename } = await this.mandates.statementPdf(user, id, month);
    sendPdf(res, buffer, filename);
  }
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("fees")
export class FeesController {
  constructor(private readonly mandates: MandatesService) {}

  @Get()
  @Roles(Role.OWNER, Role.AGENT, Role.ADMIN)
  list(@CurrentUser() user: JwtPayload, @Query() q: FeeQueryDto) {
    return this.mandates.listFees(user, q);
  }

  @Patch(":id")
  @Roles(Role.AGENT)
  update(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: UpdateFeeDto) {
    return this.mandates.updateFee(user, id, dto.status);
  }
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("statements")
export class StatementsController {
  constructor(private readonly mandates: MandatesService) {}

  /** Relevé consolidé de tous les biens du propriétaire pour le mois. */
  @Get("owner")
  @Roles(Role.OWNER, Role.ADMIN)
  owner(@CurrentUser() user: JwtPayload, @Query() q: MonthQueryDto) {
    return this.mandates.ownerStatement(user, q.month);
  }
}
