import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from "class-validator";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { IdentityDocumentType } from "@prisma/client";
import { Trim } from "../common/email.util";

export class UpdateMeDto {
  @IsOptional() @Trim() @IsString() @MinLength(1) @MaxLength(100) firstName?: string;
  @IsOptional() @Trim() @IsString() @MinLength(1) @MaxLength(100) lastName?: string;
  @IsOptional() @Trim() @IsString() @MaxLength(30) phone?: string;
  /** data-URL d'image (≤ 2 Mo), URL actuelle (inchangé) ou null (suppression). */
  @IsOptional() @ValidateIf((o) => o.avatarUrl !== null) @IsString() @MaxLength(3_000_000) avatarUrl?: string | null;
  /** Langue préférée : e-mails, PDF et libellés générés dans cette langue. */
  @IsOptional() @IsIn(["fr", "en", "es", "pt", "ar"]) locale?: "fr" | "en" | "es" | "pt" | "ar";
}

export class CreateUserDocumentDto {
  @Trim() @IsString() @MinLength(1) @MaxLength(255) name!: string;
  @IsEnum(IdentityDocumentType) documentType!: IdentityDocumentType;
  // Vérifié strictement dans le service (data-URL, type, taille).
  @IsString() fileUrl!: string;
  // Indicatifs : recalculés à partir du fichier lui-même.
  @IsOptional() @IsInt() @Min(0) fileSize?: number;
  @IsOptional() @IsString() @MaxLength(100) mimeType?: string;
  @IsOptional() @IsString() @MaxLength(1000) notes?: string;
}

export class UpdateUserDocumentDto {
  @IsOptional() @Trim() @IsString() @MinLength(1) @MaxLength(255) name?: string;
  @IsOptional() @IsString() @MaxLength(1000) notes?: string;
}

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get("me")
  me(@CurrentUser() user: JwtPayload) {
    return this.users.findById(user.sub);
  }

  @Patch("me")
  updateMe(@CurrentUser() user: JwtPayload, @Body() dto: UpdateMeDto) {
    return this.users.update(user.sub, dto);
  }

  // ── Identity documents ──────────────────────────────────────────────────

  @Get("me/documents")
  listDocuments(@CurrentUser() user: JwtPayload) {
    return this.users.listDocuments(user.sub);
  }

  @Post("me/documents")
  createDocument(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateUserDocumentDto,
  ) {
    return this.users.createDocument(user.sub, dto);
  }

  @Patch("me/documents/:docId")
  updateDocument(
    @CurrentUser() user: JwtPayload,
    @Param("docId") docId: string,
    @Body() dto: UpdateUserDocumentDto,
  ) {
    return this.users.updateDocument(user.sub, docId, dto);
  }

  @Delete("me/documents/:docId")
  deleteDocument(
    @CurrentUser() user: JwtPayload,
    @Param("docId") docId: string,
  ) {
    return this.users.deleteDocument(user.sub, docId);
  }
}
