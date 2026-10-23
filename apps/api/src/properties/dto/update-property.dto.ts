import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { ListingType, PropertyType, PropertyStatus, EnergyClass, RentalKind } from "@prisma/client";
import { MAX_AMOUNT, MAX_PHOTOS, MediaInputDto, ReadOnlyPropertyFields } from "./create-property.dto";
import { Trim } from "../../common/email.util";

const upper = () =>
  Transform(({ value }) => (typeof value === "string" ? value.trim().toUpperCase() : value));

export class UpdatePropertyDto extends ReadOnlyPropertyFields {
  @IsOptional() @Trim() @IsString() @MinLength(3) @MaxLength(120) title?: string;
  @IsOptional() @IsString() @MaxLength(5000) description?: string;

  @IsOptional() @IsEnum(ListingType) listingType?: ListingType;
  @IsOptional() @IsEnum(PropertyType) propertyType?: PropertyType;
  @IsOptional() @IsEnum(PropertyStatus) status?: PropertyStatus;

  @IsOptional() @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) price?: number;
  @IsOptional() @upper() @IsString() @Matches(/^[A-Z]{3}$/) currency?: string;

  @IsOptional() @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) surface?: number;
  @IsOptional() @IsInt() @Min(0) @Max(1000) rooms?: number;
  @IsOptional() @IsInt() @Min(0) @Max(1000) bedrooms?: number;
  @IsOptional() @IsInt() @Min(0) @Max(1000) bathrooms?: number;
  @IsOptional() @IsInt() @Min(-10) @Max(300) floor?: number | null;
  @IsOptional() @IsInt() @Min(1000) @Max(2100) yearBuilt?: number | null;

  @IsOptional() @IsBoolean() furnished?: boolean;
  @IsOptional() @IsBoolean() hasParking?: boolean;
  @IsOptional() @IsBoolean() hasBalcony?: boolean;
  @IsOptional() @IsBoolean() hasGarden?: boolean;
  @IsOptional() @IsBoolean() hasElevator?: boolean;

  // ── Spécifique vente ──
  @IsOptional() @IsNumber() @Min(0) @Max(MAX_AMOUNT) coOwnershipFees?: number | null;
  @IsOptional() @IsNumber() @Min(0) @Max(MAX_AMOUNT) propertyTax?: number | null;
  @IsOptional() @IsEnum(EnergyClass) energyClass?: EnergyClass | null;
  @IsOptional() @IsNumber() @Min(0) @Max(100) notaryFeesRate?: number | null;
  @IsOptional() @IsBoolean() isNew?: boolean;

  // ── Spécifique location ──
  @IsOptional() @IsEnum(RentalKind) rentalKind?: RentalKind | null;
  @IsOptional() @IsBoolean() chargesIncluded?: boolean | null;
  @IsOptional() @IsNumber() @Min(0) @Max(MAX_AMOUNT) chargesAmount?: number | null;
  @IsOptional() @IsNumber() @Min(0) @Max(MAX_AMOUNT) deposit?: number | null;
  @IsOptional() @IsInt() @Min(0) @Max(36) noticeMonths?: number | null;
  @IsOptional() @IsBoolean() petsAllowed?: boolean | null;

  @IsOptional() @Trim() @IsString() @MinLength(1) @MaxLength(255) addressLine?: string;
  @IsOptional() @Trim() @IsString() @MinLength(1) @MaxLength(100) city?: string;
  @IsOptional() @Trim() @IsString() @MaxLength(20) postalCode?: string;
  @IsOptional() @Trim() @IsString() @MaxLength(60) country?: string;
  @IsOptional() @IsNumber() @Min(-90) @Max(90) latitude?: number | null;
  @IsOptional() @IsNumber() @Min(-180) @Max(180) longitude?: number | null;

  /** Prix de vente final, avec status SOLD (honoraires de vente d'un mandat SALE). */
  @IsOptional() @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) salePrice?: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_PHOTOS)
  @ValidateNested({ each: true })
  @Type(() => MediaInputDto)
  media?: MediaInputDto[];
}
