import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSecret } from "../common/jwt-secret.util";
import { PrismaService } from "../prisma/prisma.service";
import { JwtPayload } from "./current-user.decorator";

/**
 * Validation du JWT : on RELIT l'utilisateur à chaque requête.
 *  - compte supprimé → 401 ;
 *  - version de jeton différente (mot de passe réinitialisé depuis) → 401 ;
 *  - rôle et e-mail toujours ceux de la base, jamais ceux figés dans le jeton.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret(),
    });
  }

  async validate(payload: { sub?: string; tv?: number; scope?: string }): Promise<JwtPayload> {
    // Les jetons à usage spécial (reset, vérification) ne sont pas des sessions.
    if (!payload?.sub || payload.scope) throw new UnauthorizedException("Session invalide.");
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true, tokenVersion: true },
    });
    // Jetons émis avant l'ajout de la version : considérés en version 0.
    if (!user || (payload.tv ?? 0) !== user.tokenVersion) {
      throw new UnauthorizedException("Session expirée — reconnectez-vous.");
    }
    return { sub: user.id, email: user.email, role: user.role };
  }
}
