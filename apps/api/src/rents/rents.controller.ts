import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { Response } from "express";
import { RentStatus, Role } from "@prisma/client";
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser } from "../auth/current-user.decorator";
import { RentsService } from "./rents.service";

class PaymentMethodDto {
  @IsString() @MinLength(2) @MaxLength(60) label!: string;
  @IsString() @MinLength(2) @MaxLength(120) value!: string;
  @IsOptional() @IsString() @MaxLength(80) holder?: string;
  @IsOptional() @IsString() @MaxLength(300) instructions?: string;
  @IsOptional() @IsBoolean() active?: boolean;
}

class DeclareRentDto {
  @IsString() @MinLength(2) @MaxLength(60) method!: string;
  // Identifiant de transaction (référence du virement ou de l'opérateur).
  @IsString() @MinLength(4) @MaxLength(80) reference!: string;
  // Capture du reçu, en data URL (même mécanique que les documents existants).
  @IsOptional() @IsString() proofDataUrl?: string;
  @IsOptional() @IsString() @MaxLength(500) note?: string;
}

class ReviewRentDto {
  @IsBoolean() accept!: boolean;
  @IsOptional() @IsString() @MaxLength(300) reason?: string;
}

type AuthUser = { sub: string; role: Role };

@Controller("rents")
@UseGuards(JwtAuthGuard, RolesGuard)
export class RentsController {
  constructor(private readonly rents: RentsService) {}

  // ── Coordonnées de paiement (propriétaire) ──

  @Get("payment-methods")
  @Roles(Role.OWNER, Role.ADMIN)
  listMethods(@CurrentUser() user: AuthUser) {
    return this.rents.listMethods(user.sub);
  }

  @Post("payment-methods")
  @Roles(Role.OWNER, Role.ADMIN)
  addMethod(@CurrentUser() user: AuthUser, @Body() dto: PaymentMethodDto) {
    return this.rents.addMethod(user.sub, dto);
  }

  @Patch("payment-methods/:id")
  @Roles(Role.OWNER, Role.ADMIN)
  updateMethod(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() dto: PaymentMethodDto) {
    return this.rents.updateMethod(user.sub, id, dto);
  }

  @Delete("payment-methods/:id")
  @Roles(Role.OWNER, Role.ADMIN)
  removeMethod(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.rents.removeMethod(user.sub, id);
  }

  // ── Locataire ──

  @Get("my")
  my(@CurrentUser() user: AuthUser) {
    return this.rents.myRents(user.sub);
  }

  @Post(":periodId/declare")
  declare(@CurrentUser() user: AuthUser, @Param("periodId") periodId: string, @Body() dto: DeclareRentDto) {
    return this.rents.declare(user.sub, periodId, dto);
  }

  // ── Propriétaire ──

  @Get("owner")
  @Roles(Role.OWNER, Role.ADMIN)
  owner(@CurrentUser() user: AuthUser, @Query("status") status?: RentStatus) {
    return this.rents.ownerRents(user.sub, status);
  }

  @Post(":periodId/review")
  @Roles(Role.OWNER, Role.ADMIN)
  review(@CurrentUser() user: AuthUser, @Param("periodId") periodId: string, @Body() dto: ReviewRentDto) {
    return this.rents.review(user.sub, user.role, periodId, dto.accept, dto.reason);
  }

  // ── Quittance (les deux parties) ──

  @Get(":periodId/receipt")
  async receipt(@CurrentUser() user: AuthUser, @Param("periodId") periodId: string, @Res() res: Response) {
    const { buffer, filename } = await this.rents.receiptPdf(user.sub, user.role, periodId);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  }
}
