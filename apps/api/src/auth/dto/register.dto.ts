import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Role } from "@prisma/client";

// Rôles autorisés à l'inscription publique : JAMAIS ADMIN.
// (Sans cette restriction, n'importe qui pouvait se créer un compte
// administrateur via POST /api/auth/register.)
export type PublicRole = Extract<Role, "OWNER" | "TENANT">;

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsIn(["OWNER", "TENANT"])
  role!: PublicRole;
}
