import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { FeeStatus, MandateStatus, MandateType, RentPayee } from "@prisma/client";
import { NormalizeEmail, Trim } from "../../common/email.util";
import { CreatePropertyDto } from "../../properties/dto/create-property.dto";

const MAX_AMOUNT = 1_000_000_000;
const num = () => IsNumber({ allowNaN: false, allowInfinity: false });

/** Conditions d'un mandat (type, honoraires, dates, encaissement des loyers). */
export class MandateTermsDto {
  @IsEnum(MandateType) type!: MandateType;
  /** % des loyers encaissés (gestion), 0 à 30 */
  @IsOptional() @ValidateIf((o) => o.managementFeeRate !== null) @num() @Min(0) @Max(30) managementFeeRate?: number | null;
  /** Montant fixe dû à la signature d'un bail */
  @IsOptional() @ValidateIf((o) => o.lettingFeeAmount !== null) @num() @Min(0) @Max(MAX_AMOUNT) lettingFeeAmount?: number | null;
  /** En mois de loyer hors charges, 0 à 3 (alternative au montant fixe) */
  @IsOptional() @ValidateIf((o) => o.lettingFeeMonths !== null) @num() @Min(0) @Max(3) lettingFeeMonths?: number | null;
  /** % du prix de vente, 0 à 15 */
  @IsOptional() @ValidateIf((o) => o.saleFeeRate !== null) @num() @Min(0) @Max(15) saleFeeRate?: number | null;
  @IsOptional() @IsEnum(RentPayee) rentPayee?: RentPayee;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @ValidateIf((o) => o.endDate !== null) @IsDateString() endDate?: string | null;
}

export class InviteMandateDto extends MandateTermsDto {
  @NormalizeEmail() @IsEmail() @MaxLength(254) ownerEmail!: string;
  @IsOptional() @IsArray() @ArrayMaxSize(50) @IsString({ each: true }) @MaxLength(64, { each: true }) propertyIds?: string[];
  @IsOptional() @IsString() @MaxLength(2000) message?: string;
  /** Agent à qui confier les biens (responsable seulement) */
  @IsOptional() @IsString() @MaxLength(64) assignedAgentId?: string;
}

export class NewOwnerDto {
  @Trim() @IsString() @MinLength(1) @MaxLength(100) firstName!: string;
  @Trim() @IsString() @MinLength(1) @MaxLength(100) lastName!: string;
  @NormalizeEmail() @IsEmail() @MaxLength(254) email!: string;
  @IsOptional() @Trim() @IsString() @MaxLength(30) phone?: string;
}

export class WithNewOwnerDto {
  /** Nouveau propriétaire (sans compte)… */
  @IsOptional() @ValidateNested() @Type(() => NewOwnerDto) owner?: NewOwnerDto;
  /** …ou propriétaire déjà invité par la même agence (bien supplémentaire). */
  @IsOptional() @IsString() @MaxLength(64) ownerId?: string;
  @ValidateNested() @Type(() => CreatePropertyDto) property!: CreatePropertyDto;
  @ValidateNested() @Type(() => MandateTermsDto) mandate!: MandateTermsDto;
  @IsOptional() @IsString() @MaxLength(64) assignedAgentId?: string;
}

export class ByOwnerDto extends MandateTermsDto {
  @IsString() @MaxLength(64) propertyId!: string;
  @IsOptional() @Trim() @IsString() @MaxLength(80) agencySlug?: string;
  @IsOptional() @Trim() @IsString() @MaxLength(20) agencyCode?: string;
  @IsOptional() @IsString() @MaxLength(2000) message?: string;
}

export class EndMandateDto {
  @Trim() @IsString() @MinLength(3) @MaxLength(1000) reason!: string;
}

export class RejectMandateDto {
  @IsOptional() @Trim() @IsString() @MaxLength(1000) reason?: string;
}

export class UpdateMandateDto {
  @IsOptional() @ValidateIf((o) => o.assignedAgentId !== null) @IsString() @MaxLength(64) assignedAgentId?: string | null;
  @IsOptional() @ValidateIf((o) => o.managementFeeRate !== null) @num() @Min(0) @Max(30) managementFeeRate?: number | null;
  @IsOptional() @ValidateIf((o) => o.lettingFeeAmount !== null) @num() @Min(0) @Max(MAX_AMOUNT) lettingFeeAmount?: number | null;
  @IsOptional() @ValidateIf((o) => o.lettingFeeMonths !== null) @num() @Min(0) @Max(3) lettingFeeMonths?: number | null;
  @IsOptional() @ValidateIf((o) => o.saleFeeRate !== null) @num() @Min(0) @Max(15) saleFeeRate?: number | null;
  @IsOptional() @IsEnum(RentPayee) rentPayee?: RentPayee;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @ValidateIf((o) => o.endDate !== null) @IsDateString() endDate?: string | null;
  @IsOptional() @IsString() @MaxLength(2000) message?: string;
}

export class AcceptRequestDto {
  @IsArray() @ArrayMinSize(1) @ArrayMaxSize(50) @IsString({ each: true }) @MaxLength(64, { each: true }) propertyIds!: string[];
}

export class MandateQueryDto {
  @IsOptional() @IsEnum(MandateStatus) status?: MandateStatus;
  @IsOptional() @IsEnum(MandateType) type?: MandateType;
  @IsOptional() @IsString() @MaxLength(64) agentId?: string;
  @IsOptional() @IsString() @MaxLength(64) ownerId?: string;
  @IsOptional() @IsString() @MaxLength(64) propertyId?: string;
}

export class FeeQueryDto {
  @IsOptional() @IsString() @MaxLength(64) mandateId?: string;
  @IsOptional() @IsDateString() from?: string;
  @IsOptional() @IsDateString() to?: string;
  @IsOptional() @IsEnum(FeeStatus) status?: FeeStatus;
}

export class UpdateFeeDto {
  @IsIn(["SETTLED", "DUE"]) status!: "SETTLED" | "DUE";
}

export class MonthQueryDto {
  @Matches(/^\d{4}-\d{2}$/) month!: string;
}
