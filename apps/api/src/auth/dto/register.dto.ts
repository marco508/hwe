import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Role } from "@prisma/client";
import { NormalizeEmail, Trim } from "../../common/email.util";

// Rôles autorisés à l'inscription publique : JAMAIS ADMIN.
// (Sans cette restriction, n'importe qui pouvait se créer un compte
// administrateur via POST /api/auth/register.)
export type PublicRole = Extract<Role, "OWNER" | "TENANT">;

export class RegisterDto {
  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName!: string;

  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName!: string;

  @IsOptional()
  @Trim()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsIn(["OWNER", "TENANT"])
  role!: PublicRole;
}
