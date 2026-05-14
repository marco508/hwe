import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { LeaseSchedulerService } from "./leases/lease-scheduler.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const origins = (process.env.CORS_ORIGINS ?? "http://localhost:3005,http://localhost:3004")
    .split(",")
    .map((o) => o.trim());
  app.enableCors({ origin: origins, credentials: true });

  app.setGlobalPrefix("api");

  const port = parseInt(process.env.API_PORT ?? "4005", 10);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`HWE API listening on http://localhost:${port}/api`);

  // ── Scheduler de baux ────────────────────────────────────────────────────
  // Lance une vérification immédiate au démarrage, puis toutes les 24h.
  // Pour remplacer par @nestjs/schedule natif : voir lease-scheduler.service.ts
  const scheduler = app.get(LeaseSchedulerService);
  scheduler.runChecks().catch(console.error);
  setInterval(() => scheduler.runChecks().catch(console.error), 24 * 60 * 60 * 1000);
}

bootstrap();
