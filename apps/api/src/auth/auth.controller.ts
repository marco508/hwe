import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ActivateOwnerDto, RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ForgotPasswordDto, ResetPasswordDto, VerifyEmailDto } from "./dto/reset-password.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { CurrentUser, JwtPayload } from "./current-user.decorator";

// Limitation de débit : appliquée dans main.ts (middleware) sur login,
// register, forgot/reset-password, verify-email et send-verification
// uniquement — jamais sur /auth/me.
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("forgot-password")
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  // Vérification d'e-mail : confirmation par jeton + renvoi du lien.
  @Post("verify-email")
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Post("send-verification")
  sendVerification(@CurrentUser() user: JwtPayload) {
    return this.authService.resendVerification(user.sub);
  }

  @Post("reset-password")
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.password);
  }

  /** Page d'activation d'un propriétaire invité (public). */
  @Get("owner-invite/:token")
  ownerInvite(@Param("token") token: string) {
    return this.authService.ownerInviteInfo(token);
  }

  /** Activation : choix du mot de passe → { accessToken, user }. */
  @Post("owner-invite/:token/activate")
  activateOwner(@Param("token") token: string, @Body() dto: ActivateOwnerDto) {
    return this.authService.activateOwner(token, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUser() user: JwtPayload) {
    return this.authService.me(user.sub);
  }
}
