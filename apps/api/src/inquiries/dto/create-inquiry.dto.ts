import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export type LeaseDurationUnit = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

export class CreateInquiryDto {
  @IsString() propertyId!: string;
  @IsString() @MinLength(10) message!: string;
  @IsEmail() contactEmail!: string;
  @IsOptional() @IsString() contactPhone?: string;

  /** Date souhaitée de début de location */
  @IsOptional() @IsDateString() desiredStartDate?: string;

  /** Valeur numérique de la durée souhaitée */
  @IsOptional() @IsInt() @Min(1) leaseDuration?: number;

  /** Unité de la durée : DAYS | WEEKS | MONTHS | YEARS */
  @IsOptional() @IsEnum(["DAYS", "WEEKS", "MONTHS", "YEARS"])
  leaseDurationUnit?: LeaseDurationUnit;
}
