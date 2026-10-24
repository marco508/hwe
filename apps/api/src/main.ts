import "reflect-metadata";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import type { NextFunction, Request, Response } from "express";
import { AppModule } from "./app.module";
import { buildValidationPipe } from "./common/validation";
import { bodyParserMiddleware, rejectControlCharsInUrl } from "./common/body-limits";
import { authRateLimitMiddleware } from "./common/rate-limit";
import { langMiddleware } from "./i18n/i18n";

async function bootstrap() {
  // Body-parser par défaut désactivé : réinstallé plus bas avec des limites
  // par route (1 Mo partout, élevée seulement sur les routes d'upload).
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  const logger = new Logger("Bootstrap");

  // Traefik devant : l'IP cliente est celle du dernier proxy de confiance
  // (un X-Forwarded-For forgé par le client n'est plus pris tel quel).
  app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS ?? 1));
  app.disable("x-powered-by");

  // 1. CORS en premier : toutes les réponses, y compris 413/429, portent les
  //    en-têtes CORS (sinon le navigateur n'y voit qu'une erreur réseau).
  const origins = (
    process.env.CORS_ORIGINS ??
    "http://localhost:3005,http://localhost:3004,http://localhost:3001,http://localhost:3006"
  )
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins, credentials: true, exposedHeaders: ["Retry-After", "Content-Disposition"] });

  // 2. En-têtes de sécurité de base (API JSON, pas de rendu HTML).
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
  });

  // 3. URL avec caractère nul/de contrôle → 400 (au lieu d'un 500 en base).
  app.use(rejectControlCharsInUrl);

  // 4. Corps JSON : 1 Mo par défaut, limite haute sur les seules routes d'upload.
  const defaultLimit = process.env.API_BODY_LIMIT ?? "1mb";
  const uploadLimit = process.env.API_UPLOAD_BODY_LIMIT ?? "25mb";
  app.use(bodyParserMiddleware({ defaultLimit, uploadLimit }));

  // Langue de la requête (Accept-Language) : messages d'erreur et libellés.
  // Après le body-parser : le contexte asynchrone couvre ainsi toute la suite.
  app.use(langMiddleware);

  // 5. Anti-brute-force : login (IP + e-mail), register, forgot/reset,
  //    verify-email, send-verification. Jamais /auth/me.
  app.use(authRateLimitMiddleware());

  app.useGlobalPipes(buildValidationPipe());
  app.setGlobalPrefix("api");
  app.enableShutdownHooks();

  const port = parseInt(process.env.API_PORT ?? "4005", 10);
  await app.listen(port);
  logger.log(`HWE API listening on http://localhost:${port}/api`);
  logger.log(`Body limits: ${defaultLimit} (uploads: ${uploadLimit})`);
  // Les tâches planifiées (baux, loyers) tournent via @Cron uniquement,
  // sous verrou PostgreSQL : plus de setInterval doublon ici.
}

bootstrap();
