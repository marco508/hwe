import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger("Prisma");

  async onModuleInit() {
    await this.$connect();
    await this.reportEmailCaseDuplicates();
  }

  /**
   * Comptes qui ne diffèrent que par la casse de l'e-mail : la migration de
   * normalisation les a laissés tels quels (aucune perte de données). On le
   * signale à chaque démarrage pour qu'un administrateur les fusionne.
   */
  private async reportEmailCaseDuplicates() {
    try {
      const rows = await this.$queryRaw<Array<{ email: string; n: bigint }>>`
        SELECT lower("email") AS email, count(*) AS n
        FROM "User" GROUP BY lower("email") HAVING count(*) > 1`;
      for (const r of rows) {
        this.logger.warn(
          `Comptes en doublon (casse de l'e-mail) à fusionner manuellement : ${r.email} (${Number(r.n)} comptes).`,
        );
      }
    } catch {
      /* contrôle informatif uniquement */
    }
  }
}
