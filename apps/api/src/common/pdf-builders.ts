/**
 * Générateurs PDF disponibles hors de la boucle principale (pdf-worker) :
 * fonctions pures données → octets, sans accès à la base ni au contexte de
 * requête.
 */
import { buildReceiptPdf, type ReceiptData } from "../rents/receipt";
import { buildStatementPdf, type StatementPdfData } from "../mandates/statement-pdf";
import { buildInvoicePdf, type InvoicePdfData } from "../subscriptions/invoice-pdf";

export interface PdfJobs {
  receipt: ReceiptData;
  statement: StatementPdfData;
  invoice: InvoicePdfData;
}
export type PdfKind = keyof PdfJobs;

export const PDF_BUILDERS: { [K in PdfKind]: (data: PdfJobs[K]) => Promise<Buffer> } = {
  receipt: buildReceiptPdf,
  statement: buildStatementPdf,
  invoice: buildInvoicePdf,
};
