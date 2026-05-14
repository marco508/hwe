import { DocumentType } from "@prisma/client";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from "class-validator";

export class CreateDocumentDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsEnum(DocumentType)
  documentType!: DocumentType;

  @IsString()
  fileUrl!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  fileSize?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  mimeType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
