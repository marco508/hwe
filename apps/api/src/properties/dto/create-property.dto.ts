import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import {
  ListingType,
  PropertyType,
  PropertyStatus,
  EnergyClass,
  RentalKind,
} from "@prisma/client";

export class MediaInputDto {
  @IsString() url!: string;
  @IsOptional() @IsString() alt?: string;
  @IsOptional() @IsInt() position?: number;
}

export class CreatePropertyDto {
  @IsString() title!: string;
  @IsString() description!: string;

  @IsEnum(ListingType) listingType!: ListingType;
  @IsEnum(PropertyType) propertyType!: PropertyType;
  @IsOptional() @IsEnum(PropertyStatus) status?: PropertyStatus;

  @IsNumber() @Min(0) price!: number;
  @IsOptional() @IsString() currency?: string;

  @IsNumber() @Min(0) surface!: number;
  @IsInt() @Min(0) rooms!: number;
  @IsInt() @Min(0) bedrooms!: number;
  @IsInt() @Min(0) bathrooms!: number;
  @IsOptional() @IsInt() floor?: number;
  @IsOptional() @IsInt() yearBuilt?: number;

  @IsOptional() @IsBoolean() furnished?: boolean;
  @IsOptional() @IsBoolean() hasParking?: boolean;
  @IsOptional() @IsBoolean() hasBalcony?: boolean;
  @IsOptional() @IsBoolean() hasGarden?: boolean;
  @IsOptional() @IsBoolean() hasElevator?: boolean;

  // ── Spécifique vente ────────────────────────────────────────────────
  @IsOptional() @IsNumber() @Min(0) coOwnershipFees?: number;
  @IsOptional() @IsNumber() @Min(0) propertyTax?: number;
  @IsOptional() @IsEnum(EnergyClass) energyClass?: EnergyClass;
  @IsOptional() @IsNumber() @Min(0) notaryFeesRate?: number;
  @IsOptional() @IsBoolean() isNew?: boolean;

  // ── Spécifique location ─────────────────────────────────────────────
  @IsOptional() @IsEnum(RentalKind) rentalKind?: RentalKind;
  @IsOptional() @IsBoolean() chargesIncluded?: boolean;
  @IsOptional() @IsNumber() @Min(0) chargesAmount?: number;
  @IsOptional() @IsNumber() @Min(0) deposit?: number;
  @IsOptional() @IsInt() @Min(0) noticeMonths?: number;
  @IsOptional() @IsBoolean() petsAllowed?: boolean;

  @IsString() addressLine!: string;
  @IsString() city!: string;
  @IsString() postalCode!: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsNumber() latitude?: number;
  @IsOptional() @IsNumber() longitude?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MediaInputDto)
  media?: MediaInputDto[];
}
