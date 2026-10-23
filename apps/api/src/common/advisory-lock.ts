import { Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

const logger = new Logger("AdvisoryLock");

/**
 * Exécute `fn` sous un verrou consultatif PostgreSQL (pg_try_advisory_xact_lock),
 * tenu par une transaction ouverte pendant toute la tâche : si une autre
 * exécution (autre réplica, redémarrage en cours de tâche) détient déjà le
 * verrou, on n'exécute rien. Le verrou est libéré automatiquement à la fin de
 * la transaction, même en cas de plantage.
 */
export async function withAdvisoryLock(
  prisma: PrismaService,
  name: string,
  fn: () => Promise<void>,
  timeoutMs = 30 * 60_000,
): Promise<boolean> {
  let ran = false;
  await prisma.$transaction(
    async (tx) => {
      const rows = await tx.$queryRaw<Array<{ locked: boolean }>>`
        SELECT pg_try_advisory_xact_lock(hashtext(${name})) AS locked`;
      if (!rows[0]?.locked) {
        logger.warn(`Tâche « ${name} » déjà en cours ailleurs : exécution ignorée.`);
        return;
      }
      ran = true;
      await fn();
    },
    { timeout: timeoutMs, maxWait: 10_000 },
  );
  return ran;
}

/**
 * Verrou transactionnel sur une clé métier (ex. un bien), à appeler DANS une
 * transaction interactive : sérialise les opérations concurrentes sur la clé
 * (création de bail, acceptation de demande…) jusqu'à la fin de la transaction.
 */
export async function lockKey(
  tx: { $executeRaw: PrismaService["$executeRaw"] },
  key: string,
): Promise<void> {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${key}))`;
}
