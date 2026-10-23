import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Authentification facultative (routes publiques qui montrent davantage au
 * propriétaire connecté). Jeton absent, invalide ou expiré → visiteur
 * anonyme, jamais de 401 (qui déconnecterait le front à tort).
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = unknown>(_err: unknown, user: TUser): TUser {
    return (user || null) as TUser;
  }
}
