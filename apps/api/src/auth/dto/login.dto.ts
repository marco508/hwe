import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { NormalizeEmail } from "../../common/email.util";

export class LoginDto {
  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  // Borne haute : bcrypt ne lit que 72 octets, inutile de hacher 50 Mo.
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}
