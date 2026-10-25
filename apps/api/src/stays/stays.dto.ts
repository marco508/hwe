import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { CancellationPolicy, StayPaymentMode } from "@prisma/client";

export class StaySettingsInput {
  @IsOptional() @IsBoolean() enabled?: boolean;
  @IsOptional() @IsNumber() @Min(0.01) @Max(100_000_000) nightlyPrice?: number | null;
  @IsOptional() @IsNumber() @Min(0) @Max(100_000_000) cleaningFee?: number;
  @IsOptional() @IsInt() @Min(1) @Max(180) minNights?: number;
  @IsOptional() @IsInt() @Min(1) @Max(180) maxNights?: number | null;
  @IsOptional() @IsInt() @Min(1) @Max(50) maxGuests?: number;
  @IsOptional() @IsString() @MaxLength(5) checkInFrom?: string;
  @IsOptional() @IsString() @MaxLength(5) checkOutBefore?: string;
  @IsOptional() @IsEnum(CancellationPolicy) cancellationPolicy?: CancellationPolicy;
  @IsOptional() @IsEnum(StayPaymentMode) paymentMode?: StayPaymentMode;
  @IsOptional() @IsInt() @Min(0) @Max(60) minNoticeDays?: number;
  @IsOptional() @IsString() @MaxLength(4000) houseRules?: string | null;
  @IsOptional() @IsString() @MaxLength(4000) arrivalInstructions?: string | null;
  @IsOptional() @IsString() @MaxLength(1000) icalImportUrl?: string | null;
}

export class BlockInput {
  @IsDateString() startDate!: string;
  @IsDateString() endDate!: string;
  @IsOptional() @IsString() @MaxLength(200) note?: string | null;
}

export class BookingRequestInput {
  @IsString() @MaxLength(64) propertyId!: string;
  @IsDateString() checkIn!: string;
  @IsDateString() checkOut!: string;
  @IsInt() @Min(1) @Max(50) guests!: number;
  @IsOptional() @IsString() @MaxLength(2000) message?: string | null;
}

export class HostNoteInput {
  @IsOptional() @IsString() @MaxLength(1000) note?: string | null;
}

export class CancelInput {
  @IsOptional() @IsString() @MaxLength(1000) reason?: string | null;
}

export class HostCancelInput {
  @IsString() @MinLength(3) @MaxLength(1000) reason!: string;
}

export class DeclarePaymentInput {
  @IsString() @MinLength(2) @MaxLength(80) method!: string;
  @IsString() @MinLength(2) @MaxLength(120) reference!: string;
}

export class ReviewInput {
  @IsInt() @Min(1) @Max(5) rating!: number;
  @IsString() @MinLength(10) @MaxLength(3000) comment!: string;
}

export class ReplyInput {
  @IsString() @MinLength(2) @MaxLength(2000) reply!: string;
}

export class HiddenInput {
  @IsBoolean() hidden!: boolean;
}

export class CommissionInput {
  @IsNumber() @Min(0) @Max(50) commissionPct!: number;
}

export const BOOKING_STATUS_FILTER = ["REQUESTED", "ACCEPTED", "CONFIRMED", "DECLINED", "EXPIRED", "CANCELLED", "COMPLETED"] as const;
