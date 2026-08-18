import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mailer: MailerService,
  ) {}

  // Secret de signature du jeton de réinitialisation : LIÉ au hash du mot de
  // passe actuel → le jeton devient invalide dès que le mot de passe change
  // (usage unique automatique, sans table dédiée).
  private resetSigningKey(passwordHash: string): string {
    return `${process.env.JWT_SECRET ?? "dev-secret"}|password-reset|${(passwordHash || "none").slice(-24)}`;
  }

  // Base de l'URL de la page de réinitialisation, selon le rôle (espaces séparés).
  private resetUrlBase(role: string): string {
    if (role === "OWNER") {
      return process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech";
    }
    return process.env.TENANT_WEB_URL || "https://tenant.hwe.dkpsolution.tech";
  }

  // Demande de réinitialisation : anti-énumération (réponse générique toujours).
  async forgotPassword(email: string): Promise<{ ok: true }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = await this.jwt.signAsync(
        { sub: user.id, scope: "password-reset" },
        { secret: this.resetSigningKey(user.password), expiresIn: "30m" },
      );
      const url = `${this.resetUrlBase(user.role).replace(/\/+$/, "")}/reset-password?token=${encodeURIComponent(token)}`;
      await this.mailer.passwordReset(user.email, user.firstName, url);
    }
    return { ok: true };
  }

  // Application du nouveau mot de passe à partir du jeton reçu par e-mail.
  async resetPassword(token: string, password: string): Promise<{ ok: true }> {
    if (!password || password.length < 8) {
      throw new UnauthorizedException("Le mot de passe doit faire au moins 8 caractères.");
    }
    const decoded: any = this.jwt.decode(token);
    if (!decoded || decoded.scope !== "password-reset" || typeof decoded.sub !== "string") {
      throw new UnauthorizedException("Lien de réinitialisation invalide ou expiré.");
    }
    const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) throw new UnauthorizedException("Lien de réinitialisation invalide ou expiré.");
    try {
      await this.jwt.verifyAsync(token, { secret: this.resetSigningKey(user.password) });
    } catch {
      throw new UnauthorizedException("Ce lien a expiré ou a déjà été utilisé. Redemandez une réinitialisation.");
    }
    const hash = await bcrypt.hash(password, 10);
    await this.prisma.user.update({ where: { id: user.id }, data: { password: hash } });
    return { ok: true };
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException("Email déjà utilisé");

    const password = await bcrypt.hash(dto.password, 10);
    // Défense en profondeur : le rôle est re-restreint ici même si le DTO
    // était contourné — l'inscription publique ne crée JAMAIS d'ADMIN.
    const role = dto.role === "OWNER" ? "OWNER" : "TENANT";
    const user = await this.prisma.user.create({
      data: { ...dto, role, password },
    });
    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException("Identifiants invalides");
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException("Identifiants invalides");
    return this.signToken(user);
  }

  private signToken(user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    const { ...rest } = user;
    return {
      accessToken,
      user: {
        id: rest.id,
        email: rest.email,
        firstName: rest.firstName,
        lastName: rest.lastName,
        phone: rest.phone,
        role: rest.role,
        createdAt: rest.createdAt,
        updatedAt: rest.updatedAt,
      },
    };
  }
}
