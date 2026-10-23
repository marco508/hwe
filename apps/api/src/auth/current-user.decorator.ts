import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/** Utilisateur authentifié, relu en base à chaque requête (rôle et e-mail à jour). */
export interface JwtPayload {
  sub: string;
  email: string;
  role: "OWNER" | "TENANT" | "ADMIN" | "AGENT";
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
