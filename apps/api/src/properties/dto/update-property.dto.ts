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
import { ListingType, PropertyType, PropertyStatus } from "@prisma/client";
import { MediaInputDto } from "./create-property.dto";

export class UpdatePropertyDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;

  @IsOptional() @IsEnum(ListingType) listingType?: ListingType;
  @IsOptional() @IsEnum(PropertyType) propertyType?: PropertyType;
  @IsOptional() @IsEnum(PropertyStatus) status?: PropertyStatus;

  @IsOptional() @IsNumber() @Min(0) price?: number;
  @IsOptional() @IsString() currency?: string;

  @IsOptional() @IsNumber() @Min(0) surface?: number;
  @IsOptional() @IsInt() @Min(0) rooms?: number;
  @IsOptional() @IsInt() @Min(0) bedrooms?: number;
  @IsOptional() @IsInt() @Min(0) bathrooms?: number;
  @IsOptional() @IsInt() floor?: number | null;
  @IsOptional() @IsInt() yearBuilt?: number | null;

  @IsOptional() @IsBoolean() furnished?: boolean;
  @IsOptional() @IsBoolean() hasParking?: boolean;
  @IsOptional() @IsBoolean() hasBalcony?: boolean;
  @IsOptional() @IsBoolean() hasGarden?: boolean;
  @IsOptional() @IsBoolean() hasElevator?: boolean;

  @IsOptional() @IsString() addressLine?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() postalCode?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsNumber() latitude?: number | null;
  @IsOptional() @IsNumber() longitude?: number | null;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MediaInputDto)
  media?: MediaInputDto[];
}
