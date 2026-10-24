import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Role, SubscriptionRequestStatus } from "@prisma/client";
import type { Response } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { SubscriptionsService } from "./subscriptions.service";
import {
  AdminAgencySubscriptionDto,
  AdminPaymentDto,
  CreateSubscriptionRequestDto,
  PlanDto,
  PlatformSettingsDto,
  RejectSubscriptionRequestDto,
  UpdatePlanDto,
} from "./subscription.dto";

function sendPdf(res: Response, buffer: Buffer, filename: string) {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Cache-Control", "private, no-store");
  res.send(buffer);
}

const clip = (q?: string) => (typeof q === "string" && q.trim() ? q.trim().slice(0, 100) : undefined);

/** Public : offres actives (landing, page abonnement). */
@Controller("plans")
export class PlansController {
  constructor(private readonly subs: SubscriptionsService) {}

  @Get()
  list() {
    return this.subs.publicPlans();
  }
}

/** Abonnement de MON agence (préfixe /agencies/me/subscription). */
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.AGENT)
@Controller("agencies/me/subscription")
export class AgencySubscriptionController {
  constructor(private readonly subs: SubscriptionsService) {}

  @Get()
  mine(@CurrentUser() user: JwtPayload) {
    return this.subs.mine(user.sub);
  }

  @Post("requests")
  request(@CurrentUser() user: JwtPayload, @Body() dto: CreateSubscriptionRequestDto) {
    return this.subs.createRequest(user.sub, dto);
  }

  @Delete("requests/:id")
  cancel(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.subs.cancelRequest(user.sub, id);
  }

  @Get("payments/:id/pdf")
  async invoice(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Res() res: Response) {
    const { buffer, filename } = await this.subs.invoicePdf(user, id);
    sendPdf(res, buffer, filename);
  }
}

/** Propriétaire : agences mandataires qui ne peuvent plus agir sur ses biens. */
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN)
@Controller("subscriptions")
export class OwnerSubscriptionController {
  constructor(private readonly subs: SubscriptionsService) {}

  @Get("owner-alerts")
  alerts(@CurrentUser() user: JwtPayload) {
    return this.subs.ownerAlerts(user.sub);
  }
}

/** Admin : demandes, agences, paiements, offres, paramètres. */
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("admin")
export class AdminSubscriptionsController {
  constructor(private readonly subs: SubscriptionsService) {}

  @Get("subscriptions/requests")
  requests(@Query("status") status?: string) {
    const parsed =
      status && Object.values(SubscriptionRequestStatus).includes(status as SubscriptionRequestStatus)
        ? (status as SubscriptionRequestStatus)
        : undefined;
    return this.subs.adminRequests(parsed);
  }

  @Post("subscriptions/requests/:id/approve")
  approve(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.subs.approveRequest(user.sub, id);
  }

  @Post("subscriptions/requests/:id/reject")
  reject(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: RejectSubscriptionRequestDto) {
    return this.subs.rejectRequest(user.sub, id, dto.reason);
  }

  @Get("subscriptions/agencies")
  agencies(@Query("q") q?: string) {
    return this.subs.adminAgencies(clip(q));
  }

  @Get("subscriptions/agencies/:id")
  agency(@Param("id") id: string) {
    return this.subs.adminAgency(id);
  }

  @Patch("subscriptions/agencies/:id")
  updateAgency(@Param("id") id: string, @Body() dto: AdminAgencySubscriptionDto) {
    return this.subs.adminUpdateAgency(id, dto);
  }

  @Post("subscriptions/agencies/:id/payments")
  pay(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: AdminPaymentDto) {
    return this.subs.adminRecordPayment(user.sub, id, dto);
  }

  @Get("subscriptions/payments")
  payments(@Query("agencyId") agencyId?: string) {
    return this.subs.adminPayments(clip(agencyId));
  }

  @Get("subscriptions/payments/:id/pdf")
  async invoice(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Res() res: Response) {
    const { buffer, filename } = await this.subs.invoicePdf(user, id);
    sendPdf(res, buffer, filename);
  }

  @Get("plans")
  plans() {
    return this.subs.adminPlans();
  }

  @Post("plans")
  createPlan(@Body() dto: PlanDto) {
    return this.subs.createPlan(dto);
  }

  @Patch("plans/:id")
  updatePlan(@Param("id") id: string, @Body() dto: UpdatePlanDto) {
    return this.subs.updatePlan(id, dto);
  }

  @Get("settings")
  settings() {
    return this.subs.settings();
  }

  @Patch("settings")
  updateSettings(@Body() dto: PlatformSettingsDto) {
    return this.subs.updateSettings(dto);
  }
}
