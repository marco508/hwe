import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import { DUMMY_HASH, hashPassword, verifyPassword } from "../common/password";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { jwtSecret } from "../common/jwt-secret.util";
import { normalizeEmail } from "../common/email.util";
import { agencyLogoUrl } from "../common/media.util";
import { requestLang } from "../i18n/i18n";
import { createAgencyFor, joinAgencyWithInvite, ownerWebBase } from "../agencies/agency.util";

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
  activatedAt: true,
  locale: true,
  createdAt: true,
  updatedAt: true,
} as const;

/** Agence de l'utilisateur (pro) telle que renvoyée par login / register / me. */
export const AUTH_AGENCY_SELECT = {
  role: true,
  agency: { select: { id: true, name: true, slug: true, code: true, logoKey: true } },
} as const;

export function shapeAuthAgency(
  m: { role: string; agency: { id: string; name: string; slug: string; code: string; logoKey: string | null } } | null | undefined,
) {
  if (!m) return null;
  return {
    id: m.agency.id,
    name: m.agency.name,
    slug: m.agency.slug,
    code: m.agency.code,
    logoUrl: agencyLogoUrl(m.agency.logoKey),
    role: m.role,
  };
}

export const ACCOUNT_NOT_ACTIVATED_MESSAGE =
  "Ce compte a été créé par un professionnel et n'est pas encore activé : ouvrez le lien d'invitation reçu (ou utilisez « mot de passe oublié ») pour choisir votre mot de passe.";

export const INVITED_ACCOUNT_MESSAGE =
  "Un professionnel a déjà créé votre espace : utilisez le lien d'invitation reçu ou « mot de passe oublié » pour l'activer.";

// Hash factice (DUMMY_HASH, common/password) : un login sur un compte
// inexistant coûte autant qu'un vrai (pas d'énumération par le temps de réponse).

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
    if (role === "OWNER" || role === "AGENT") {
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
    const hash = await hashPassword(password);
    // Compte invité : « mot de passe oublié » l'ACTIVE (le lien reçu prouve l'adresse).
    const now = new Date();
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hash,
        tokenVersion: { increment: 1 },
        ...(!user.activatedAt ? { activatedAt: now, emailVerifiedAt: user.emailVerifiedAt ?? now } : {}),
      },
    });
    this.logger.log(`Mot de passe réinitialisé (compte ${user.id}) : sessions précédentes révoquées.`);
    return { ok: true };
  }

  async register(dto: RegisterDto) {
    const email = normalizeEmail(dto.email);
    const existing = await this.findByEmail(email);
    if (existing && !existing.activatedAt) {
      // Compte créé par un professionnel, jamais activé.
      throw new ConflictException({ statusCode: 409, code: "INVITED_ACCOUNT", message: INVITED_ACCOUNT_MESSAGE });
    }
    if (existing) throw new ConflictException("Un compte existe déjà avec cette adresse e-mail.");

    const password = await hashPassword(dto.password);
    // Défense en profondeur : le rôle est re-restreint ici même si le DTO
    // était contourné — l'inscription publique ne crée JAMAIS d'ADMIN.
    // Une invitation d'agence fait toujours un compte professionnel.
    const role =
      dto.agencyInviteToken || dto.role === "AGENT" ? "AGENT" : dto.role === "OWNER" ? "OWNER" : "TENANT";
    if (role !== "AGENT" && dto.agencyName) {
      throw new BadRequestException("Le nom d'agence ne concerne que les comptes professionnels.");
    }
    let user;
    try {
      user = await this.prisma.$transaction(async (tx) => {
        const created = await tx.user.create({
          data: {
            email,
            password,
            firstName: dto.firstName,
            lastName: dto.lastName,
            phone: dto.phone || null,
            role,
            activatedAt: new Date(),
            // Langue de l'interface à l'inscription (e-mails, PDF dans sa langue).
            locale: dto.locale ?? requestLang(),
          },
        });
        if (dto.agencyInviteToken) {
          await joinAgencyWithInvite(tx, created, dto.agencyInviteToken);
        } else if (role === "AGENT" && dto.agencyName) {
          await createAgencyFor(tx, created.id, { name: dto.agencyName, email, phone: dto.phone || null });
        }
        return created;
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

  // ── Propriétaire invité par un professionnel ─────────────────────────
  // Jeton signé avec une clé dérivée du hash du mot de passe (aléatoire et
  // inutilisable tant que le compte n'est pas activé) : le lien devient
  // invalide dès que le mot de passe est choisi (usage unique, sans table).

  private ownerInviteKey(passwordHash: string): string {
    return `${jwtSecret()}|owner-invite|${(passwordHash || "none").slice(-24)}`;
  }

  /** Lien d'activation d'un compte propriétaire invité (30 jours). */
  async ownerInviteUrl(user: { id: string; password: string }): Promise<string> {
    const token = await this.jwt.signAsync(
      { sub: user.id, scope: "owner-invite" },
      { secret: this.ownerInviteKey(user.password), expiresIn: "30d" },
    );
    return `${ownerWebBase()}/activer/${encodeURIComponent(token)}`;
  }

  private async userFromOwnerInvite(token: string) {
    const invalid = () =>
      new BadRequestException({
        statusCode: 400,
        code: "INVALID_INVITE",
        message: "Lien d'activation invalide, expiré ou déjà utilisé. Demandez un nouveau lien au professionnel, ou utilisez « mot de passe oublié ».",
      });
    const decoded: any = this.jwt.decode(token);
    if (!decoded || decoded.scope !== "owner-invite" || typeof decoded.sub !== "string") throw invalid();
    const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user || user.activatedAt) throw invalid();
    try {
      await this.jwt.verifyAsync(token, { secret: this.ownerInviteKey(user.password) });
    } catch {
      throw invalid();
    }
    return user;
  }

  /** Page /activer/[token] : « <Agence> gère votre bien <titre> ». */
  async ownerInviteInfo(token: string) {
    const user = await this.userFromOwnerInvite(token);
    const [agency, mandates] = await Promise.all([
      user.invitedByAgencyId
        ? this.prisma.agency.findUnique({
            where: { id: user.invitedByAgencyId },
            select: { id: true, name: true, slug: true, logoKey: true },
          })
        : null,
      this.prisma.mandate.findMany({
        where: { ownerId: user.id, status: { in: ["ACTIVE", "PENDING_OWNER"] } },
        select: {
          reference: true,
          type: true,
          property: { select: { id: true, title: true, city: true } },
          agency: { select: { name: true } },
        },
        orderBy: { createdAt: "asc" },
      }),
    ]);
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      agency: agency ? { id: agency.id, name: agency.name, slug: agency.slug, logoUrl: agencyLogoUrl(agency.logoKey) } : null,
      properties: mandates.map((m) => ({ ...m.property, mandateReference: m.reference, mandateType: m.type, agencyName: m.agency.name })),
    };
  }

  /** Activation : mot de passe choisi, compte activé et e-mail vérifié (le lien le prouve). */
  async activateOwner(token: string, password: string) {
    const user = await this.userFromOwnerInvite(token);
    const hash = await hashPassword(password);
    const now = new Date();
    const { count } = await this.prisma.user.updateMany({
      where: { id: user.id, activatedAt: null, password: user.password },
      data: {
        password: hash,
        activatedAt: now,
        emailVerifiedAt: user.emailVerifiedAt ?? now,
        tokenVersion: { increment: 1 },
      },
    });
    if (count === 0) {
      throw new BadRequestException({ statusCode: 400, code: "INVALID_INVITE", message: "Ce lien a déjà été utilisé." });
    }
    const fresh = await this.prisma.user.findUniqueOrThrow({ where: { id: user.id } });
    this.logger.log(`Compte propriétaire invité ${user.id} activé.`);
    // Historique des mandats : le propriétaire a activé son espace.
    const mandates = await this.prisma.mandate.findMany({
      where: { ownerId: user.id, status: { in: ["ACTIVE", "PENDING_OWNER"] } },
      select: { id: true },
    });
    for (const m of mandates) {
      await this.prisma.mandateEvent.create({ data: { mandateId: m.id, actorId: user.id, kind: "OWNER_ACTIVATED" } });
    }
    return this.signToken(fresh);
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
    const ok = await verifyPassword(dto.password, user?.password ?? DUMMY_HASH);
    // Compte invité non activé : 403 explicite (son mot de passe aléatoire
    // n'est connu de personne — il doit passer par son lien).
    if (user && !user.activatedAt) {
      throw new ForbiddenException({ statusCode: 403, code: "ACCOUNT_NOT_ACTIVATED", message: ACCOUNT_NOT_ACTIVATED_MESSAGE });
    }
    if (!user || !ok) throw new UnauthorizedException("Identifiants invalides");
    return this.signToken(user);
  }

  /** Profil courant (mêmes champs que la réponse de login). */
  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { ...AUTH_USER_SELECT, agencyMember: { select: AUTH_AGENCY_SELECT } },
    });
    if (!user) throw new UnauthorizedException("Session expirée — reconnectez-vous.");
    const { agencyMember, ...rest } = user;
    return { ...rest, agency: shapeAuthAgency(agencyMember) };
  }

  private async signToken(user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    avatarKey: string | null;
    emailVerifiedAt: Date | null;
    activatedAt?: Date | null;
    locale?: string | null;
    tokenVersion: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const membership = await this.prisma.agencyMember.findUnique({
      where: { userId: user.id },
      select: AUTH_AGENCY_SELECT,
    });
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
        activatedAt: user.activatedAt ?? null,
        locale: user.locale ?? null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        agency: shapeAuthAgency(membership),
      },
    };
  }
}
