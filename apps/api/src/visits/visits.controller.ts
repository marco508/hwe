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
import { Role, VisitStatus } from "@prisma/client";
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { VisitsService } from "./visits.service";

class RequestVisitDto {
  @IsString() propertyId!: string;
  @IsDateString() proposedAt!: string;
  @IsOptional() @IsString() @MaxLength(500) note?: string;
}

class AnswerVisitDto {
  @IsIn(["CONFIRMED", "DECLINED"])
  status!: "CONFIRMED" | "DECLINED";

  @IsOptional() @IsString() @MaxLength(500) ownerNote?: string;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("visits")
export class VisitsController {
  constructor(private readonly visits: VisitsService) {}

  /** Demander un créneau (tout compte connecté, e-mail vérifié). */
  @Post()
  request(@CurrentUser() user: JwtPayload, @Body() dto: RequestVisitDto) {
    return this.visits.request(user.sub, dto);
  }

  @Get("my")
  my(@CurrentUser() user: JwtPayload) {
    return this.visits.my(user.sub);
  }

  @Get("owner")
  @Roles(Role.OWNER, Role.ADMIN)
  owner(@CurrentUser() user: JwtPayload, @Query("status") status?: VisitStatus) {
    return this.visits.owner(user.sub, status);
  }

  @Patch(":id")
  @Roles(Role.OWNER, Role.ADMIN)
  answer(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: AnswerVisitDto,
  ) {
    return this.visits.answer(id, user.sub, dto);
  }

  @Patch(":id/cancel")
  cancel(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.visits.cancel(id, user.sub);
  }
}
