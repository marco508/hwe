import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";
import { AgencyRole } from "@prisma/client";
import { NormalizeEmail, Trim } from "../../common/email.util";

export class CreateAgencyDto {
  @Trim() @IsString() @MinLength(2) @MaxLength(120) name!: string;
  @IsOptional() @NormalizeEmail() @IsEmail() @MaxLength(254) email?: string;
  @IsOptional() @Trim() @IsString() @MaxLength(30) phone?: string;
  @IsOptional() @Trim() @IsString() @MaxLength(100) city?: string;
  @IsOptional() @Trim() @IsString() @MaxLength(60) country?: string;
}

export class UpdateAgencyDto {
  @IsOptional() @Trim() @IsString() @MinLength(2) @MaxLength(120) name?: string;
  /** data-URL d'image (≤ 2 Mo), URL actuelle (inchangé) ou null (suppression). */
  @IsOptional() @ValidateIf((o) => o.logoUrl !== null) @IsString() @MaxLength(3_000_000) logoUrl?: string | null;
  @IsOptional() @ValidateIf((o) => o.email !== null && o.email !== "") @NormalizeEmail() @IsEmail() @MaxLength(254) email?: string | null;
  @IsOptional() @ValidateIf((o) => o.phone !== null) @Trim() @IsString() @MaxLength(30) phone?: string | null;
  @IsOptional() @ValidateIf((o) => o.address !== null) @Trim() @IsString() @MaxLength(255) address?: string | null;
  @IsOptional() @ValidateIf((o) => o.city !== null) @Trim() @IsString() @MaxLength(100) city?: string | null;
  @IsOptional() @Trim() @IsString() @MaxLength(60) country?: string;
  @IsOptional() @ValidateIf((o) => o.registrationNumber !== null) @Trim() @IsString() @MaxLength(100) registrationNumber?: string | null;
  @IsOptional() @ValidateIf((o) => o.description !== null) @IsString() @MaxLength(2000) description?: string | null;
  @IsOptional() @ValidateIf((o) => o.paymentIban !== null) @Trim() @IsString() @MaxLength(80) paymentIban?: string | null;
  @IsOptional() @ValidateIf((o) => o.paymentHolder !== null) @Trim() @IsString() @MaxLength(120) paymentHolder?: string | null;
}

export class InviteAgentDto {
  @NormalizeEmail() @IsEmail() @MaxLength(254) email!: string;
  @IsOptional() @IsIn(["MANAGER", "AGENT"]) role?: AgencyRole;
}

export class MemberRoleDto {
  @IsIn(["MANAGER", "AGENT"]) role!: AgencyRole;
}
