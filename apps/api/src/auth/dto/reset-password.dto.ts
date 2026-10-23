import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { NormalizeEmail } from "../../common/email.util";

export class ForgotPasswordDto {
  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email!: string;
}

export class ResetPasswordDto {
  @IsString()
  @MaxLength(2048)
  token!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}

export class VerifyEmailDto {
  @IsString()
  @MaxLength(2048)
  token!: string;
}
