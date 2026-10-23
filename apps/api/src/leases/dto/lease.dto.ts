import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { NormalizeEmail, Trim } from "../../common/email.util";

const MAX_AMOUNT = 1_000_000_000;

export class CreateLeaseDto {
  // Tenant
  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  tenantFirstName!: string;

  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  tenantLastName!: string;

  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  tenantEmail!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  tenantPhone?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  tenantAddress?: string | null;

  // Financial
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(MAX_AMOUNT)
  monthlyRent!: number;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(MAX_AMOUNT)
  charges?: number | null;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(MAX_AMOUNT)
  deposit!: number;

  // Dates (jours calendaires) — fin > début, contrôlé dans le service
  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(36)
  noticePeriod?: number | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(28)
  rentPaymentDay?: number | null;

  @IsOptional()
  @IsBoolean()
  furnished?: boolean | null;

  @IsOptional()
  @IsString()
  @MaxLength(10000)
  specialClauses?: string | null;
}

/**
 * Modification d'un bail : UNIQUEMENT tant qu'aucune partie n'a signé (sinon
 * 409, passer par un avenant). Plus de `status` ni de `pdfUrl` : le statut est
 * géré par le serveur (signatures, planificateur, congés).
 */
export class UpdateLeaseDto {
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  specialClauses?: string | null;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string | null;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(MAX_AMOUNT)
  monthlyRent?: number;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(MAX_AMOUNT)
  charges?: number;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(MAX_AMOUNT)
  deposit?: number;
}

/** Suivi de la caution : marquer versée ou restituée (retenue éventuelle). */
export class LeaseDepositDto {
  @IsIn(["PAID", "RETURNED"])
  action!: "PAID" | "RETURNED";

  // Montant retenu à la restitution (dégradations, loyers impayés…).
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(MAX_AMOUNT)
  retained?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string | null;
}

/** Préavis donné par le locataire. */
export class GiveNoticeDto {
  // Date de départ souhaitée ; ramenée au minimum légal si trop proche.
  @IsOptional()
  @IsDateString()
  desiredDate?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string | null;
}

/** Avenant proposé par le propriétaire (au moins un champ modifié). */
export class CreateAmendmentDto {
  @IsDateString()
  effectiveDate!: string;

  @IsOptional() @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) newMonthlyRent?: number | null;
  @IsOptional() @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) newCharges?: number | null;
  @IsOptional() @IsDateString() newEndDate?: string | null;
  @IsOptional() @IsString() @MaxLength(1000) note?: string | null;
}

/** Colocataire ajouté au bail par le propriétaire. */
export class CoTenantDto {
  @Trim() @IsString() @MinLength(1) @MaxLength(100) firstName!: string;
  @Trim() @IsString() @MinLength(1) @MaxLength(100) lastName!: string;
  @NormalizeEmail() @IsEmail() @MaxLength(254) email!: string;
  @IsOptional() @IsString() @MaxLength(30) phone?: string | null;
}

/** Attestation d'assurance habitation déposée par le locataire. */
export class InsuranceDto {
  // data-URL (image ou PDF ≤ 8 Mo), vérifiée strictement dans le service
  @IsString() fileUrl!: string;
  @IsDateString() validUntil!: string;
}

/** Congé donné par le propriétaire (motif légal requis). */
export class OwnerNoticeDto {
  @IsIn(["SALE", "REPOSSESSION", "OTHER"])
  reason!: "SALE" | "REPOSSESSION" | "OTHER";

  @IsOptional()
  @IsDateString()
  desiredDate?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string | null;
}

/** Régularisation annuelle des charges (solde informatif). */
export class ChargeRegularizationDto {
  @Trim() @IsString() @MinLength(1) @MaxLength(60) periodLabel!: string;
  @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) provisionsCollected!: number;
  @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) actualCharges!: number;
  @IsOptional() @IsString() @MaxLength(1000) note?: string | null;
}
