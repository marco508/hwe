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
import { IsOptional, IsString, IsEnum, IsInt, Min } from "class-validator";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { IdentityDocumentType } from "@prisma/client";

class UpdateMeDto {
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() avatarUrl?: string;
}

class CreateUserDocumentDto {
  @IsString() name!: string;
  @IsEnum(IdentityDocumentType) documentType!: IdentityDocumentType;
  @IsString() fileUrl!: string;
  @IsOptional() @IsInt() @Min(0) fileSize?: number;
  @IsOptional() @IsString() mimeType?: string;
  @IsOptional() @IsString() notes?: string;
}

class UpdateUserDocumentDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() notes?: string;
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
