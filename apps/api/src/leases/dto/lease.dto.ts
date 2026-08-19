import { LeaseStatus } from "@prisma/client";
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class CreateLeaseDto {
  // Tenant
  @IsString()
  @MaxLength(100)
  tenantFirstName!: string;

  @IsString()
  @MaxLength(100)
  tenantLastName!: string;

  @IsEmail()
  tenantEmail!: string;

  @IsOptional()
  @IsString()
  tenantPhone?: string;

  @IsOptional()
  @IsString()
  tenantAddress?: string;

  // Financial
  @IsNumber()
  @Min(0)
  monthlyRent!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  charges?: number;

  @IsNumber()
  @Min(0)
  deposit!: number;

  // Dates
  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(36)
  noticePeriod?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(28)
  rentPaymentDay?: number;

  @IsOptional()
  @IsBoolean()
  furnished?: boolean;

  @IsOptional()
  @IsString()
  specialClauses?: string;
}

export class UpdateLeaseDto {
  @IsOptional()
  @IsEnum(LeaseStatus)
  status?: LeaseStatus;

  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @IsOptional()
  @IsString()
  specialClauses?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

/** Suivi de la caution : marquer versée ou restituée (retenue éventuelle). */
export class LeaseDepositDto {
  @IsIn(["PAID", "RETURNED"])
  action!: "PAID" | "RETURNED";

  // Montant retenu à la restitution (dégradations, loyers impayés…).
  @IsOptional()
  @IsNumber()
  @Min(0)
  retained?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

/** Préavis donné par le locataire. */
export class GiveNoticeDto {
  // Date de départ souhaitée ; ramenée au minimum légal si trop proche.
  @IsOptional()
  @IsDateString()
  desiredDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

/** Avenant proposé par le propriétaire (au moins un champ modifié). */
export class CreateAmendmentDto {
  @IsDateString()
  effectiveDate!: string;

  @IsOptional() @IsNumber() @Min(0) newMonthlyRent?: number;
  @IsOptional() @IsNumber() @Min(0) newCharges?: number;
  @IsOptional() @IsDateString() newEndDate?: string;
  @IsOptional() @IsString() @MaxLength(1000) note?: string;
}

/** Colocataire ajouté au bail par le propriétaire. */
export class CoTenantDto {
  @IsString() @MaxLength(100) firstName!: string;
  @IsString() @MaxLength(100) lastName!: string;
  @IsEmail() email!: string;
  @IsOptional() @IsString() phone?: string;
}

/** Attestation d'assurance habitation déposée par le locataire. */
export class InsuranceDto {
  @IsString() fileUrl!: string;
  @IsDateString() validUntil!: string;
}
