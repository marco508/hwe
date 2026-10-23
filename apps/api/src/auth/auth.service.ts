import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { jwtSecret } from "../common/jwt-secret.util";
import { normalizeEmail } from "../common/email.util";

/** Champs du compte renvoyés au front (login, register, /auth/me). */
export const AUTH_USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  role: true,
  avatarKey: true,
  emailVerifiedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

// Hash factice : un login sur un compte inexistant coûte autant qu'un vrai
// (pas d'énumération des comptes par le temps de réponse).
const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 10);

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mailer: MailerService,
  ) {}

  /**
   * Recherche par e-mail normalisé. Repli insensible à la casse pour les
   * rares comptes historiques qui n'ont pas pu être normalisés (doublons de
   * casse laissés tels quels par la migration).
   */
  private async findByEmail(rawEmail: string) {
    const email = normalizeEmail(rawEmail);
    if (!email) return null;
    const exact = await this.prisma.user.findUnique({ where: { email } });
    if (exact) return exact;
    return this.prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      orderBy: { createdAt: "asc" },
    });
  }

  // Secret de signature du jeton de réinitialisation : LIÉ au hash du mot de
  // passe actuel → le jeton devient invalide dès que le mot de passe change
  // (usage unique automatique, sans table dédiée).
  private resetSigningKey(passwordHash: string): string {
    return `${jwtSecret()}|password-reset|${(passwordHash || "none").slice(-24)}`;
  }

  // Base de l'URL de la page de réinitialisation, selon le rôle (espaces séparés).
  private resetUrlBase(role: string): string {
    if (role === "OWNER") {
      return process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech";
    }
    return process.env.TENANT_WEB_URL || "https://tenant.hwe.dkpsolution.tech";
  }

  // Demande de réinitialisation : anti-énumération (réponse générique
  // toujours, et l'envoi part en arrière-plan : même temps de réponse que le
  // compte existe ou non).
  async forgotPassword(email: string): Promise<{ ok: true }> {
    const user = await this.findByEmail(email);
    if (user) {
      const token = await this.jwt.signAsync(
        { sub: user.id, scope: "password-reset" },
        { secret: this.resetSigningKey(user.password), expiresIn: "30m" },
      );
      const url = `${this.resetUrlBase(user.role).replace(/\/+$/, "")}/reset-password?token=${encodeURIComponent(token)}`;
      this.mailer.passwordReset(user.email, user.firstName, url).catch(() => {});
    }
    return { ok: true };
  }

  // Application du nouveau mot de passe à partir du jeton reçu par e-mail.
  // Incrémente tokenVersion : toutes les sessions ouvertes avant sont closes.
  async resetPassword(token: string, password: string): Promise<{ ok: true }> {
    if (!password || password.length < 8) {
      throw new BadRequestException("Le mot de passe doit faire au moins 8 caractères.");
    }
    const decoded: any = this.jwt.decode(token);
    if (!decoded || decoded.scope !== "password-reset" || typeof decoded.sub !== "string") {
      throw new BadRequestException("Lien de réinitialisation invalide ou expiré.");
    }
    const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) throw new BadRequestException("Lien de réinitialisation invalide ou expiré.");
    try {
      await this.jwt.verifyAsync(token, { secret: this.resetSigningKey(user.password) });
    } catch {
      throw new BadRequestException("Ce lien a expiré ou a déjà été utilisé. Redemandez une réinitialisation.");
    }
    const hash = await bcrypt.hash(password, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hash, tokenVersion: { increment: 1 } },
    });
    this.logger.log(`Mot de passe réinitialisé (compte ${user.id}) : sessions précédentes révoquées.`);
    return { ok: true };
  }

  async register(dto: RegisterDto) {
    const email = normalizeEmail(dto.email);
    const existing = await this.findByEmail(email);
    if (existing) throw new ConflictException("Un compte existe déjà avec cette adresse e-mail.");

    const password = await bcrypt.hash(dto.password, 10);
    // Défense en profondeur : le rôle est re-restreint ici même si le DTO
    // était contourné — l'inscription publique ne crée JAMAIS d'ADMIN.
    const role = dto.role === "OWNER" ? "OWNER" : "TENANT";
    let user;
    try {
      user = await this.prisma.user.create({
        data: {
          email,
          password,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone || null,
          role,
        },
      });
    } catch (e) {
      // Inscription simultanée avec la même adresse (index unique, y compris lower(email)).
      if ((e as Prisma.PrismaClientKnownRequestError)?.code === "P2002") {
        throw new ConflictException("Un compte existe déjà avec cette adresse e-mail.");
      }
      throw e;
    }
    // Lien de vérification d'e-mail (best-effort : l'inscription reste valide).
    this.sendVerificationEmail(user).catch(() => {});
    return this.signToken(user);
  }

  // ── Vérification d'e-mail ─────────────────────────────────────────────
  // Le rattachement locataire↔bail repose sur l'e-mail : sans vérification,
  // une faute de frappe (ou un usurpateur) donne accès aux loyers/quittances.
  // Jeton signé avec une clé dérivée de l'e-mail → invalidé si l'e-mail change.

  private verifySigningKey(email: string): string {
    return `${jwtSecret()}|email-verify|${email}`;
  }

  private async sendVerificationEmail(user: { id: string; email: string; firstName: string; role: string }) {
    const token = await this.jwt.signAsync(
      { sub: user.id, scope: "email-verify" },
      { secret: this.verifySigningKey(user.email), expiresIn: "48h" },
    );
    const base = this.resetUrlBase(user.role).replace(/\/+$/, "");
    const url = `${base}/verify-email?token=${encodeURIComponent(token)}`;
    await this.mailer.emailVerification(user.email, user.firstName, url);
  }

  async resendVerification(userId: string): Promise<{ ok: true; alreadyVerified?: boolean }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException("Compte introuvable.");
    if (user.emailVerifiedAt) return { ok: true, alreadyVerified: true };
    await this.sendVerificationEmail(user);
    return { ok: true };
  }

  async verifyEmail(token: string): Promise<{ ok: true }> {
    const decoded: any = this.jwt.decode(token);
    if (!decoded || decoded.scope !== "email-verify" || typeof decoded.sub !== "string") {
      throw new BadRequestException("Lien de vérification invalide ou expiré.");
    }
    const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) throw new BadRequestException("Lien de vérification invalide ou expiré.");
    try {
      await this.jwt.verifyAsync(token, { secret: this.verifySigningKey(user.email) });
    } catch {
      throw new BadRequestException("Lien de vérification invalide ou expiré — redemandez-en un.");
    }
    if (!user.emailVerifiedAt) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { emailVerifiedAt: new Date() },
      });
    }
    return { ok: true };
  }

  async login(dto: LoginDto) {
    const user = await this.findByEmail(dto.email);
    // bcrypt exécuté dans tous les cas (temps de réponse identique).
    const ok = await bcrypt.compare(dto.password, user?.password ?? DUMMY_HASH);
    if (!user || !ok) throw new UnauthorizedException("Identifiants invalides");
    return this.signToken(user);
  }

  /** Profil courant (mêmes champs que la réponse de login). */
  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: AUTH_USER_SELECT,
    });
    if (!user) throw new UnauthorizedException("Session expirée — reconnectez-vous.");
    return user;
  }

  private signToken(user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    avatarKey: string | null;
    emailVerifiedAt: Date | null;
    tokenVersion: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      tv: user.tokenVersion,
    });
    return {
      accessToken,
      // avatarKey → avatarUrl (URL publique) par l'intercepteur de réponse
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        avatarKey: user.avatarKey,
        emailVerifiedAt: user.emailVerifiedAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
