import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { NormalizeEmail } from "../../common/email.util";

export type LeaseDurationUnit = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

export class CreateInquiryDto {
  @IsString() @MaxLength(64) propertyId!: string;
  @IsString() @MinLength(10) @MaxLength(5000) message!: string;
  // E-mail de contact (informatif). Le bail sera rattaché à l'e-mail VÉRIFIÉ
  // du compte, jamais à cette adresse libre.
  @NormalizeEmail() @IsEmail() @MaxLength(254) contactEmail!: string;
  @IsOptional() @IsString() @MaxLength(30) contactPhone?: string | null;

  /** Partager les documents du profil (dossier de candidature) avec le propriétaire */
  @IsOptional() @IsBoolean() shareDossier?: boolean;

  /** Date souhaitée de début de location */
  @IsOptional() @IsDateString() desiredStartDate?: string | null;

  /** Valeur numérique de la durée souhaitée */
  @IsOptional() @IsInt() @Min(1) @Max(3650) leaseDuration?: number | null;

  /** Unité de la durée : DAYS | WEEKS | MONTHS | YEARS */
  @IsOptional() @IsEnum(["DAYS", "WEEKS", "MONTHS", "YEARS"])
  leaseDurationUnit?: LeaseDurationUnit | null;
}
