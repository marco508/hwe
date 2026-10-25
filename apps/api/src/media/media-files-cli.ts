/**
 * Commande d'exploitation des fichiers hors base (dans le conteneur API) :
 *
 *   node dist/apps/api/src/media/media-files-cli.js <commande> [--apply] [--deep]
 *
 *   copy           copie les photos/avatars/logos encore en base vers le volume
 *                  (ce que fait déjà l'API au démarrage) ;
 *   verify [--deep] contrôle que chaque référence en base désigne un fichier
 *                  présent (--deep : relit et recalcule chaque SHA-256) ;
 *   purge          SIMULATION de la purge des octets en base (aucune écriture
 *                  en base) ; avec --apply : remplace chaque data-URL par la
 *                  référence du fichier, après écriture ET vérification ;
 *   gc             liste les fichiers orphelins (> 24 h) ; --apply les supprime.
 *
 * Prérequis : MEDIA_DIR et DATABASE_URL (ceux du conteneur). Code de sortie
 * ≠ 0 en cas d'échec ou de fichier manquant.
 */
import { PrismaClient } from "@prisma/client";
import { fileStoreConfig } from "../common/file-store";
import { copyPublicToFiles, gcFiles, purgeDbBytes, verifyFiles } from "./media-files";

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const apply = rest.includes("--apply");
  const deep = rest.includes("--deep");
  if (!fileStoreConfig().dir) {
    console.error("MEDIA_DIR absent ou non inscriptible : rien à faire.");
    process.exit(2);
  }
  const db = new PrismaClient();
  let code = 0;
  try {
    if (cmd === "copy") {
      const r = await copyPublicToFiles(db, { batch: 50 });
      console.table(r);
      if (Object.values(r).some((s) => s.failed > 0)) code = 1;
    } else if (cmd === "verify") {
      const { stats, missing } = await verifyFiles(db, { deep });
      console.table(stats);
      for (const m of missing.slice(0, 50)) console.log("MANQUANT", m);
      if (missing.length) code = 1;
    } else if (cmd === "purge") {
      if (!apply) console.log("Simulation (ajoutez --apply pour purger la base).");
      const r = await purgeDbBytes(db, { apply });
      console.table(r);
      if (Object.values(r).some((s) => s.failed > 0)) code = 1;
      if (apply) {
        const { missing } = await verifyFiles(db, { deep: true });
        console.log(missing.length ? `ATTENTION : ${missing.length} référence(s) sans fichier` : "Vérification après purge : OK (toutes les références ont leur fichier intact).");
        if (missing.length) code = 1;
        console.log("Espace disque de la base : il est réutilisé automatiquement ; pour le rendre au système, VACUUM FULL des tables concernées (verrou exclusif, à faire hors heures).");
      }
    } else if (cmd === "gc") {
      const st = await gcFiles(db, { apply });
      console.table([st]);
      if (!apply && st.orphans) console.log("Simulation : ajoutez --apply pour supprimer les orphelins anciens.");
    } else {
      console.error("Usage : media-files-cli.js copy | verify [--deep] | purge [--apply] | gc [--apply]");
      code = 2;
    }
  } finally {
    await db.$disconnect();
  }
  process.exit(code);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
