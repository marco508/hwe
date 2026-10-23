import {
  Allow,
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
import {
  ListingType,
  PropertyType,
  PropertyStatus,
  EnergyClass,
  RentalKind,
} from "@prisma/client";
import { Trim } from "../../common/email.util";

/** Bornes communes (un prix de 1e300 passait). */
export const MAX_AMOUNT = 1_000_000_000;
export const MAX_PHOTOS = 20;

/**
 * Photo d'un bien : data-URL d'image (téléversement) OU URL `…/api/media/<id>`
 * d'une photo déjà enregistrée sur CE bien (conservée lors d'une édition).
 * Toute autre URL (javascript:, http externe…) est refusée par le service.
 */
export class MediaInputDto {
  @IsString() @MaxLength(12_000_000) url!: string;
  @IsOptional() @IsString() @MaxLength(200) alt?: string;
  @IsOptional() @IsInt() @Min(0) @Max(100) position?: number;
}

const upper = () =>
  Transform(({ value }) => (typeof value === "string" ? value.trim().toUpperCase() : value));

export class CreatePropertyDto {
  @Trim() @IsString() @MinLength(3) @MaxLength(120) title!: string;
  @IsString() @MaxLength(5000) description!: string;

  @IsEnum(ListingType) listingType!: ListingType;
  @IsEnum(PropertyType) propertyType!: PropertyType;
  // À la création : brouillon ou publié seulement.
  @IsOptional() @IsEnum(["DRAFT", "PUBLISHED"]) status?: PropertyStatus;

  // Location : peut être 0/absent si une grille tarifaire est définie ensuite.
  @IsOptional() @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) price?: number;
  @IsOptional() @upper() @IsString() @Matches(/^[A-Z]{3}$/) currency?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(MAX_AMOUNT) surface!: number;
  @IsInt() @Min(0) @Max(1000) rooms!: number;
  @IsInt() @Min(0) @Max(1000) bedrooms!: number;
  @IsInt() @Min(0) @Max(1000) bathrooms!: number;
  @IsOptional() @IsInt() @Min(-10) @Max(300) floor?: number;
  @IsOptional() @IsInt() @Min(1000) @Max(2100) yearBuilt?: number;

  @IsOptional() @IsBoolean() furnished?: boolean;
  @IsOptional() @IsBoolean() hasParking?: boolean;
  @IsOptional() @IsBoolean() hasBalcony?: boolean;
  @IsOptional() @IsBoolean() hasGarden?: boolean;
  @IsOptional() @IsBoolean() hasElevator?: boolean;

  // ── Spécifique vente ────────────────────────────────────────────────
  @IsOptional() @IsNumber() @Min(0) @Max(MAX_AMOUNT) coOwnershipFees?: number;
  @IsOptional() @IsNumber() @Min(0) @Max(MAX_AMOUNT) propertyTax?: number;
  @IsOptional() @IsEnum(EnergyClass) energyClass?: EnergyClass;
  @IsOptional() @IsNumber() @Min(0) @Max(100) notaryFeesRate?: number;
  @IsOptional() @IsBoolean() isNew?: boolean;

  // ── Spécifique location ─────────────────────────────────────────────
  @IsOptional() @IsEnum(RentalKind) rentalKind?: RentalKind;
  @IsOptional() @IsBoolean() chargesIncluded?: boolean;
  @IsOptional() @IsNumber() @Min(0) @Max(MAX_AMOUNT) chargesAmount?: number;
  @IsOptional() @IsNumber() @Min(0) @Max(MAX_AMOUNT) deposit?: number;
  @IsOptional() @IsInt() @Min(0) @Max(36) noticeMonths?: number;
  @IsOptional() @IsBoolean() petsAllowed?: boolean;

  @Trim() @IsString() @MinLength(1) @MaxLength(255) addressLine!: string;
  @Trim() @IsString() @MinLength(1) @MaxLength(100) city!: string;
  @Trim() @IsString() @MaxLength(20) postalCode!: string;
  @IsOptional() @Trim() @IsString() @MaxLength(60) country?: string;
  @IsOptional() @IsNumber() @Min(-90) @Max(90) latitude?: number;
  @IsOptional() @IsNumber() @Min(-180) @Max(180) longitude?: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_PHOTOS)
  @ValidateNested({ each: true })
  @Type(() => MediaInputDto)
  media?: MediaInputDto[];
}

/**
 * Champs en lecture seule que le formulaire d'édition renvoie tels quels
 * (objet GET réinjecté) : acceptés pour ne pas casser le front avec
 * forbidNonWhitelisted, puis IGNORÉS par le service.
 */
export const IGNORED_PROPERTY_FIELDS = [
  "id",
  "ownerId",
  "owner",
  "createdAt",
  "updatedAt",
  "pricingRates",
  "priceUnit",
  "displayPrice",
  "_count",
  "managedBy",
  "soldPrice",
  "soldAt",
  "mandate",
  "access",
] as const;

export class ReadOnlyPropertyFields {
  @IsOptional() @Allow() id?: unknown;
  @IsOptional() @Allow() ownerId?: unknown;
  @IsOptional() @Allow() owner?: unknown;
  @IsOptional() @Allow() createdAt?: unknown;
  @IsOptional() @Allow() updatedAt?: unknown;
  @IsOptional() @Allow() pricingRates?: unknown;
  @IsOptional() @Allow() priceUnit?: unknown;
  @IsOptional() @Allow() displayPrice?: unknown;
  @IsOptional() @Allow() _count?: unknown;
  @IsOptional() @Allow() managedBy?: unknown;
  @IsOptional() @Allow() soldPrice?: unknown;
  @IsOptional() @Allow() soldAt?: unknown;
  @IsOptional() @Allow() mandate?: unknown;
  @IsOptional() @Allow() access?: unknown;
}
