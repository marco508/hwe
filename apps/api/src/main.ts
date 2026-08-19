import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { LeaseSchedulerService } from "./leases/lease-scheduler.service";

async function bootstrap() {
  // On désactive le body-parser par défaut pour le réinstaller avec une limite
  // adaptée aux uploads d'images (envoyées en base64 dans le JSON).
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  const bodyLimit = process.env.API_BODY_LIMIT ?? "50mb";

  // useBodyParser est disponible depuis @nestjs/platform-express 10.x
  // et accepte les mêmes options que body-parser/express.
  // Si la méthode n'existe pas (vieille version), on bascule sur l'API
  // brute via le httpAdapter.
  const anyApp = app as unknown as {
    useBodyParser?: (
      type: "json" | "urlencoded",
      options?: { limit?: string; extended?: boolean },
    ) => void;
  };

  if (typeof anyApp.useBodyParser === "function") {
    anyApp.useBodyParser("json", { limit: bodyLimit });
    anyApp.useBodyParser("urlencoded", { limit: bodyLimit, extended: true });
  } else {
    // Fallback : on récupère body-parser depuis express (deps transitives).
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bodyParser = require("body-parser");
    app.use(bodyParser.json({ limit: bodyLimit }));
    app.use(bodyParser.urlencoded({ limit: bodyLimit, extended: true }));
  }

  // ── Anti-brute-force sur l'authentification ──
  // Compteur en mémoire par IP : 60 requêtes / 15 min sur /api/auth suffisent
  // largement à un usage normal et bloquent les essais de mots de passe.
  const authHits = new Map<string, { n: number; reset: number }>();
  app.use("/api/auth", (req: any, res: any, next: () => void) => {
    const now = Date.now();
    if (authHits.size > 10_000) {
      for (const [k, v] of authHits) if (now > v.reset) authHits.delete(k);
    }
    const ip = String(
      (req.headers["x-forwarded-for"] || "").split(",")[0] || req.ip || "?",
    ).trim();
    const entry = authHits.get(ip);
    if (!entry || now > entry.reset) {
      authHits.set(ip, { n: 1, reset: now + 15 * 60_000 });
      return next();
    }
    if (++entry.n > 60) {
      res.status(429).json({
        statusCode: 429,
        message: "Trop de tentatives — réessayez dans quelques minutes.",
      });
      return;
    }
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const origins = (
    process.env.CORS_ORIGINS ??
    "http://localhost:3005,http://localhost:3004,http://localhost:3001,http://localhost:3006"
  )
    .split(",")
    .map((o) => o.trim());
  app.enableCors({ origin: origins, credentials: true });

  app.setGlobalPrefix("api");

  const port = parseInt(process.env.API_PORT ?? "4005", 10);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`HWE API listening on http://localhost:${port}/api`);
  // eslint-disable-next-line no-console
  console.log(`Body limit set to ${bodyLimit}`);

  // ── Scheduler de baux ─────────────────────────────────────────────────────
  const scheduler = app.get(LeaseSchedulerService);
  scheduler.runChecks().catch(console.error);
  setInterval(
    () => scheduler.runChecks().catch(console.error),
    24 * 60 * 60 * 1000,
  );
}

bootstrap();
