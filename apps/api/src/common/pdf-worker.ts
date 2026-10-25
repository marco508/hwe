/**
 * Thread de génération des PDF (worker_threads) : la mise en page PDFKit
 * (~300 ms de CPU pour un document arabe) ne bloque plus la boucle
 * d'événements de l'API.
 */
import { parentPort } from "worker_threads";
import { PDF_BUILDERS, type PdfKind } from "./pdf-builders";

parentPort?.on("message", async (msg: { id: number; kind: PdfKind; data: never }) => {
  try {
    const buf = await PDF_BUILDERS[msg.kind](msg.data);
    parentPort!.postMessage({ id: msg.id, buf });
  } catch (e) {
    parentPort!.postMessage({ id: msg.id, error: (e as Error)?.message ?? String(e) });
  }
});
