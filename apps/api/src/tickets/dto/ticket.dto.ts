import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateTicketDto {
  @IsString() @MinLength(3) @MaxLength(120) title!: string;
  @IsString() @MinLength(3) @MaxLength(2000) description!: string;
  // Photo du problème, en data URL (même mécanique que les documents).
  @IsOptional() @IsString() photoDataUrl?: string;
}

export class ReviewTicketDto {
  @IsIn(["IN_PROGRESS", "RESOLVED"])
  status!: "IN_PROGRESS" | "RESOLVED";

  @IsOptional() @IsString() @MaxLength(1000) resolutionNote?: string;
}
