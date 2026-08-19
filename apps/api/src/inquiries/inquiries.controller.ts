import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { InquiriesService } from "./inquiries.service";
import { CreateInquiryDto } from "./dto/create-inquiry.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { IsEnum } from "class-validator";

class RespondDto {
  @IsEnum(["ACCEPTED", "REJECTED"])
  decision!: "ACCEPTED" | "REJECTED";
}

@UseGuards(JwtAuthGuard)
@Controller("inquiries")
export class InquiriesController {
  constructor(private readonly inquiries: InquiriesService) {}

  // A tenant (or any logged user) sends an inquiry
  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateInquiryDto) {
    return this.inquiries.create(user.sub, dto);
  }

  // Tenant cancels their own PENDING inquiry
  @Delete(":id")
  cancel(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.inquiries.cancel(id, user.sub);
  }

  // Owner accepts or rejects an inquiry
  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Patch(":id/respond")
  respond(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: RespondDto,
  ) {
    return this.inquiries.respond(id, user.sub, dto.decision);
  }

  // What I have sent (tenant view)
  @Get("sent")
  sent(@CurrentUser() user: JwtPayload) {
    return this.inquiries.listSent(user.sub);
  }

  // What I have received on my properties (owner view)
  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Get("received")
  received(@CurrentUser() user: JwtPayload) {
    return this.inquiries.listReceived(user.sub);
  }

  // Owner views the applicant's shared dossier
  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Get(":id/dossier")
  dossier(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.inquiries.getDossier(id, user.sub);
  }
}
