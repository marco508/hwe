import { DocumentType } from "@prisma/client";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { Trim } from "../../common/email.util";

export class CreateDocumentDto {
  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name!: string;

  @IsEnum(DocumentType)
  documentType!: DocumentType;

  // Fichier téléversé uniquement (data-URL validée strictement dans le
  // service) : plus d'URL externe.
  @IsString()
  fileUrl!: string;

  // Indicatifs : recalculés à partir du fichier.
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

/** Modification : champs explicites (le PATCH n'était pas validé du tout). */
export class UpdateDocumentDto {
  @IsOptional()
  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEnum(DocumentType)
  documentType?: DocumentType;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string | null;
}
