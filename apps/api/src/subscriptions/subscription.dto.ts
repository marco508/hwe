import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsIn,
  IsInt,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from "class-validator";
import { Trim } from "../common/email.util";

export const PAYMENT_METHODS = ["TRANSFER", "MOBILE_MONEY", "CASH", "OTHER"] as const;
export const DURATIONS = [1, 3, 6, 12] as const;

/** « J'ai payé » (responsable de l'agence). */
export class CreateSubscriptionRequestDto {
  @Trim() @IsString() @MinLength(2) @MaxLength(30) planCode!: string;
  @Type(() => Number) @IsIn(DURATIONS as unknown as number[]) months!: number;
  @IsIn(PAYMENT_METHODS as unknown as string[]) method!: (typeof PAYMENT_METHODS)[number];
  /** Référence du virement / de la transaction mobile money / du reçu. */
  @Trim() @IsString() @MinLength(2) @MaxLength(120) reference!: string;
  @IsOptional() @Trim() @IsString() @MaxLength(1000) note?: string;
}

export class RejectSubscriptionRequestDto {
  @Trim() @IsString() @MinLength(3) @MaxLength(1000) reason!: string;
}

/** Paiement saisi directement par l'admin (sans demande). */
export class AdminPaymentDto {
  @Trim() @IsString() @MinLength(2) @MaxLength(30) planCode!: string;
  @Type(() => Number) @IsInt() @Min(1) @Max(36) months!: number;
  @IsIn(PAYMENT_METHODS as unknown as string[]) method!: (typeof PAYMENT_METHODS)[number];
  @IsOptional() @Trim() @IsString() @MaxLength(120) reference?: string;
}

/** Réglages d'une agence par l'admin (dates ISO, null efface). */
export class AdminAgencySubscriptionDto {
  @IsOptional() @ValidateIf((o) => o.trialEndsAt !== null) @IsISO8601() trialEndsAt?: string | null;
  @IsOptional() @ValidateIf((o) => o.paidUntil !== null) @IsISO8601() paidUntil?: string | null;
  @IsOptional() @ValidateIf((o) => o.planCode !== null) @IsString() @MaxLength(30) planCode?: string | null;
  @IsOptional() @IsBoolean() manualSuspension?: boolean;
}

/** Prix d'une offre dans une devise. */
export class PlanPriceDto {
  @Trim() @IsString() @Matches(/^[A-Z]{3}$/) currency!: string;
  @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @Max(1_000_000_000) monthlyPrice!: number;
}

export class PlanPricesDto {
  @IsArray() @ArrayMinSize(1) @ArrayMaxSize(200) @ValidateNested({ each: true }) @Type(() => PlanPriceDto) prices!: PlanPriceDto[];
}

export class PlanDto {
  @Trim() @IsString() @Matches(/^[A-Z0-9_]{2,30}$/, { message: "code : 2 à 30 caractères A-Z, 0-9, _" }) code!: string;
  @Trim() @IsString() @MinLength(2) @MaxLength(60) name!: string;
  @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @Max(1_000_000) monthlyPrice!: number;
  @IsOptional() @Trim() @IsString() @Matches(/^[A-Z]{3}$/) currency?: string;
  @IsOptional() @ValidateIf((o) => o.maxAgents !== null) @Type(() => Number) @IsInt() @Min(1) @Max(100000) maxAgents?: number | null;
  @IsOptional() @ValidateIf((o) => o.maxActiveMandates !== null) @Type(() => Number) @IsInt() @Min(0) @Max(1000000) maxActiveMandates?: number | null;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) @Max(1000) position?: number;
  /** Prix supplémentaires par devise. */
  @IsOptional() @IsArray() @ArrayMaxSize(200) @ValidateNested({ each: true }) @Type(() => PlanPriceDto) prices?: PlanPriceDto[];
}

export class UpdatePlanDto {
  @IsOptional() @Trim() @IsString() @MinLength(2) @MaxLength(60) name?: string;
  @IsOptional() @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @Max(1_000_000) monthlyPrice?: number;
  @IsOptional() @Trim() @IsString() @Matches(/^[A-Z]{3}$/) currency?: string;
  @IsOptional() @ValidateIf((o) => o.maxAgents !== null) @Type(() => Number) @IsInt() @Min(1) @Max(100000) maxAgents?: number | null;
  @IsOptional() @ValidateIf((o) => o.maxActiveMandates !== null) @Type(() => Number) @IsInt() @Min(0) @Max(1000000) maxActiveMandates?: number | null;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) @Max(1000) position?: number;
}

export class PlatformSettingsDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) @Max(365) trialDays?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) @Max(90) graceDays?: number;
  @IsOptional() @IsBoolean() freePlanEnabled?: boolean;
  @IsOptional() @ValidateIf((o) => o.paymentInstructions !== null) @IsString() @MaxLength(4000) paymentInstructions?: string | null;
}
