import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";
import { withAdvisoryLock } from "../common/advisory-lock";
import { fileStoreConfig } from "../common/file-store";
import { copyPublicToFiles, gcFiles } from "./media-files";

/**
 * - Au démarrage (MEDIA_DIR configuré, MEDIA_MIGRATE ≠ 0) : copie en tâche de
 *   fond des photos/avatars/logos encore en base vers le volume (sans bloquer
 *   le démarrage, par lots, idempotente). Les octets restent en base.
 * - Chaque nuit (04:40, MEDIA_GC ≠ 0) : ménage des fichiers orphelins.
 */
@Injectable()
export class MediaFilesService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MediaFilesService.name);

  constructor(private readonly prisma: PrismaService) {}

  onApplicationBootstrap() {
    if (!fileStoreConfig().dir || process.env.MEDIA_MIGRATE === "0") return;
    setTimeout(() => {
      const t0 = Date.now();
      copyPublicToFiles(this.prisma, { batch: 20, pauseMs: Number(process.env.MEDIA_MIGRATE_PAUSE_MS ?? 20) })
        .then((r) => {
          const parts = Object.entries(r)
            .filter(([, s]) => s.copied || s.failed || s.skipped)
            .map(([k, s]) => `${k} copiés=${s.copied} ignorés=${s.skipped} échecs=${s.failed}`);
          this.logger.log(`Copie des fichiers publics vers le volume terminée en ${Date.now() - t0} ms${parts.length ? ` : ${parts.join(" ; ")}` : " (rien à copier)"}.`);
        })
        .catch((e) => this.logger.error(`Copie des fichiers vers le volume : ${(e as Error).message}`));
    }, Number(process.env.MEDIA_MIGRATE_DELAY_MS ?? 3_000)).unref();
  }

  @Cron("40 4 * * *")
  async nightlyGc(): Promise<void> {
    if (process.env.DISABLE_SCHEDULERS === "1" || process.env.MEDIA_GC === "0" || !fileStoreConfig().dir) return;
    await withAdvisoryLock(this.prisma, "media-gc", async () => {
      const st = await gcFiles(this.prisma, { apply: true });
      if (st.removed || st.tmpRemoved) this.logger.log(`Ménage des fichiers : ${st.removed} orphelin(s) et ${st.tmpRemoved} temporaire(s) supprimé(s) (${st.files} fichiers, ${st.referenced} référencés).`);
    }).catch((e) => this.logger.error(`Ménage des fichiers : ${(e as Error).message}`));
  }
}
