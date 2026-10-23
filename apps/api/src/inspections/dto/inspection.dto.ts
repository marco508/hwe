import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

/** Une ligne du relevé : pièce ou élément, état constaté, remarque. */
export class InspectionItemDto {
  @IsString() @MaxLength(80) label!: string;
  // État libre mais court : « bon », « usé », « à réparer »…
  @IsString() @MaxLength(40) condition!: string;
  @IsOptional() @IsString() @MaxLength(300) note?: string | null;
}

export class UpsertInspectionDto {
  @IsDateString()
  date!: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => InspectionItemDto)
  items?: InspectionItemDto[];

  @IsOptional() @IsString() @MaxLength(2000) generalNote?: string | null;

  @IsOptional() @IsString() @MaxLength(40) meterElectricity?: string | null;
  @IsOptional() @IsString() @MaxLength(40) meterWater?: string | null;
  @IsOptional() @IsString() @MaxLength(40) meterGas?: string | null;

  @IsOptional() @IsInt() @Min(0) @Max(1000) keysCount?: number | null;
}
