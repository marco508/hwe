import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { PlaceCategory, VoyageEventKind } from "@prisma/client";

const CC = /^[A-Za-z]{2}$/;

export class DestinationInput {
  @IsOptional() @IsString() @MaxLength(80) slug?: string;
  @IsOptional() @Matches(CC) country?: string;
  @IsOptional() @IsString() @MinLength(2) @MaxLength(120) name?: string;
  @IsOptional() @IsString() @MaxLength(120) region?: string | null;
  @IsOptional() @IsString() @MaxLength(600) summary?: string;
  @IsOptional() @IsString() @MaxLength(8000) description?: string;
  @IsOptional() @IsNumber() @Min(-90) @Max(90) latitude?: number | null;
  @IsOptional() @IsNumber() @Min(-180) @Max(180) longitude?: number | null;
  @IsOptional() @IsString() @MaxLength(200) cover?: string | null;
  @IsOptional() @IsString() @MaxLength(300) coverCredit?: string | null;
  @IsOptional() @IsInt() @Min(0) @Max(10000) position?: number;
  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsBoolean() reviewed?: boolean;
  @IsOptional() @IsObject() translations?: Record<string, Record<string, string>> | null;
}

export class PlaceInput {
  @IsOptional() @IsString() @MaxLength(80) slug?: string;
  @IsOptional() @IsString() @MaxLength(64) destinationId?: string;
  @IsOptional() @IsEnum(PlaceCategory) category?: PlaceCategory;
  @IsOptional() @IsString() @MinLength(2) @MaxLength(160) name?: string;
  @IsOptional() @IsString() @MaxLength(600) summary?: string;
  @IsOptional() @IsString() @MaxLength(8000) description?: string;
  @IsOptional() @IsString() @MaxLength(3000) tips?: string | null;
  @IsOptional() @IsString() @MaxLength(300) address?: string | null;
  @IsOptional() @IsString() @MaxLength(300) openingHours?: string | null;
  @IsOptional() @IsString() @MaxLength(300) priceInfo?: string | null;
  @IsOptional() @IsString() @MaxLength(300) bestPeriod?: string | null;
  @IsOptional() @IsString() @MaxLength(300) website?: string | null;
  @IsOptional() @IsNumber() @Min(-90) @Max(90) latitude?: number | null;
  @IsOptional() @IsNumber() @Min(-180) @Max(180) longitude?: number | null;
  @IsOptional() @IsInt() @Min(0) @Max(2880) visitMinutes?: number | null;
  @IsOptional() @IsString() @MaxLength(200) cover?: string | null;
  @IsOptional() @IsString() @MaxLength(300) coverCredit?: string | null;
  @IsOptional() @IsInt() @Min(0) @Max(10000) position?: number;
  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsBoolean() reviewed?: boolean;
  @IsOptional() @IsObject() translations?: Record<string, Record<string, string>> | null;
}

export class CircuitStepInput {
  @IsInt() @Min(1) @Max(60) day!: number;
  @IsOptional() @IsInt() @Min(0) @Max(1000) position?: number;
  @IsOptional() @IsString() @MaxLength(64) placeId?: string | null;
  @IsOptional() @IsString() @MaxLength(64) destinationId?: string | null;
  @IsOptional() @IsString() @MaxLength(2000) note?: string | null;
  @IsOptional() @IsObject() translations?: Record<string, Record<string, string>> | null;
}

export class CircuitInput {
  @IsOptional() @IsString() @MaxLength(80) slug?: string;
  @IsOptional() @Matches(CC) country?: string;
  @IsOptional() @IsString() @MinLength(2) @MaxLength(160) title?: string;
  @IsOptional() @IsString() @MaxLength(1200) summary?: string;
  @IsOptional() @IsInt() @Min(1) @Max(60) days?: number;
  @IsOptional() @IsString() @MaxLength(200) cover?: string | null;
  @IsOptional() @IsString() @MaxLength(300) coverCredit?: string | null;
  @IsOptional() @IsInt() @Min(0) @Max(10000) position?: number;
  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsBoolean() reviewed?: boolean;
  @IsOptional() @IsObject() translations?: Record<string, Record<string, string>> | null;
  @IsOptional() @IsArray() @ArrayMaxSize(200) @ValidateNested({ each: true }) @Type(() => CircuitStepInput)
  steps?: CircuitStepInput[];
}

export class GuideSectionInput {
  @IsString() @MaxLength(200) title!: string;
  @IsString() @MaxLength(4000) body!: string;
}

export class GuideInput {
  @IsOptional() @IsString() @MaxLength(4000) intro?: string;
  @IsOptional() @IsArray() @ArrayMaxSize(30) @ValidateNested({ each: true }) @Type(() => GuideSectionInput)
  sections?: GuideSectionInput[];
  @IsOptional() @IsObject() translations?: Record<string, unknown> | null;
  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsBoolean() reviewed?: boolean;
}

export class EventInput {
  @IsOptional() @IsString() @MaxLength(80) slug?: string;
  @IsOptional() @Matches(CC) country?: string;
  @IsOptional() @IsEnum(VoyageEventKind) kind?: VoyageEventKind;
  @IsOptional() @IsBoolean() publicHoliday?: boolean;
  @IsOptional() @IsString() @MinLength(2) @MaxLength(160) name?: string;
  @IsOptional() @IsString() @MaxLength(600) summary?: string;
  @IsOptional() @IsString() @MaxLength(8000) description?: string;
  @IsOptional() @IsString() @MaxLength(3000) tips?: string | null;
  @IsOptional() @IsString() @MaxLength(200) where?: string | null;
  @IsOptional() @IsString() @MaxLength(600) dateNote?: string | null;
  /** Règle de date, validée par isValidEventRule (@hwe/types). */
  @IsOptional() @IsObject() rule?: Record<string, unknown>;
  @IsOptional() @IsString() @MaxLength(64) destinationId?: string | null;
  @IsOptional() @IsString() @MaxLength(64) placeId?: string | null;
  @IsOptional() @IsBoolean() caution?: boolean;
  @IsOptional() @IsString() @MaxLength(200) cover?: string | null;
  @IsOptional() @IsString() @MaxLength(300) coverCredit?: string | null;
  @IsOptional() @IsArray() @ArrayMaxSize(20) @IsString({ each: true }) @MaxLength(500, { each: true }) sources?: string[] | null;
  @IsOptional() @IsInt() @Min(0) @Max(10000) position?: number;
  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsBoolean() reviewed?: boolean;
  @IsOptional() @IsObject() translations?: Record<string, Record<string, string>> | null;
}

export class ImageInput {
  @IsString() @MaxLength(6_000_000) dataUrl!: string;
}

// ─────────────────────────── Carnets de voyage ───────────────────────────

export class TripInput {
  @IsOptional() @IsString() @MinLength(1) @MaxLength(120) title?: string;
  @IsOptional() @Matches(CC) country?: string;
  @IsOptional() @IsDateString() startDate?: string | null;
  @IsOptional() @IsDateString() endDate?: string | null;
  @IsOptional() @IsInt() @Min(1) @Max(60) dayCount?: number;
  @IsOptional() @IsInt() @Min(1) @Max(50) travelers?: number;
  @IsOptional() @IsString() @MaxLength(5000) notes?: string | null;
}

export class TripItemInput {
  @IsOptional() @IsIn(["PLACE", "NOTE"]) kind?: "PLACE" | "NOTE";
  @IsOptional() @IsString() @MaxLength(64) placeId?: string;
  @IsOptional() @IsInt() @Min(0) @Max(60) day?: number;
  @IsOptional() @IsInt() @Min(0) @Max(1000) position?: number;
  @IsOptional() @IsString() @MaxLength(160) title?: string | null;
  @IsOptional() @IsString() @MaxLength(2000) note?: string | null;
  @IsOptional() @Matches(/^(([01]\d|2[0-3]):[0-5]\d)?$/) time?: string | null;
  @IsOptional() @IsBoolean() done?: boolean;
}

export class TripReorderInput {
  @IsInt() @Min(0) @Max(60) day!: number;
  @IsArray() @ArrayMaxSize(300) @IsString({ each: true }) ids!: string[];
}

export class FromCircuitInput {
  @IsOptional() @IsDateString() startDate?: string | null;
  @IsOptional() @IsInt() @Min(1) @Max(50) travelers?: number;
}
