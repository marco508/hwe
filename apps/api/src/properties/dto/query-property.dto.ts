import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";
import { Type } from "class-transformer";
import { ListingType, PropertyType } from "@prisma/client";

export const MAX_PAGE_SIZE = 50;

export class QueryPropertyDto {
  @IsOptional() @IsEnum(ListingType) listingType?: ListingType;
  @IsOptional() @IsEnum(PropertyType) propertyType?: PropertyType;
  @IsOptional() @IsString() @MaxLength(60) country?: string;
  @IsOptional() @IsString() @MaxLength(100) city?: string;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(1e12) minPrice?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(1e12) maxPrice?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(1e12) minSurface?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(1e12) maxSurface?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) @Max(10000) minRooms?: number;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100000) page?: number;
  // Au-delà de 50, la valeur est ramenée à 50 (pas d'erreur : la landing demande 200).
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) pageSize?: number;
}
