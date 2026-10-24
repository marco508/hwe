import PDFDocument = require("pdfkit");
import { APP_TIME_ZONE } from "../common/dates";
import { moneyPdf, pdfLang, shortDate, t, type Lang } from "../i18n/i18n";

/**
 * Quittance de loyer en PDF, générée en mémoire.
 *
 * Volontairement sobre : une quittance est un document probant, pas une
 * plaquette. Elle reprend les identités, le bien, la période, les montants
 * (loyer et charges séparés — certaines démarches l'exigent), le moyen de
 * paiement déclaré et l'identifiant de transaction, et rappelle que le
 * versement a été confirmé par le bailleur.
 */
export interface ReceiptData {
  receiptNo: string;
  paidAt: Date;
  periodLabel: string; // « août 2026 »
  propertyTitle: string;
  propertyAddress: string;
  ownerName: string;
  tenantName: string;
  /** Montants figés de la période */
  rent: number;
  charges: number;
  total: number;
  /** Devise du bail */
  currency: string;
  method: string | null;
  reference: string | null;
  /** Langue du document (User.locale de celui qui télécharge) ; fr par défaut. */
  lang?: Lang;
}

export function buildReceiptPdf(data: ReceiptData): Promise<Buffer> {
  const lang = pdfLang(data.lang ?? "fr");
  const L = (key: string, params?: Record<string, string | number>) => t(lang, `pdf.receipt.${key}`, params);
  const EUR = (n: number) => moneyPdf(lang, n, data.currency);
  const jour = (d: Date) => shortDate(lang, d, APP_TIME_ZONE);
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 56 });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const vert = "#1a642f";
    const gris = "#6b7280";
    const ligne = "#d8e0e8";

    // En-tête
    doc.fontSize(20).fillColor(vert).font("Helvetica-Bold").text(L("title"));
    doc.moveDown(0.2);
    doc.fontSize(10).fillColor(gris).font("Helvetica")
      .text(L("number", { number: data.receiptNo, date: jour(data.paidAt) }));
    doc.moveDown(1.2);

    // Parties
    doc.fontSize(11).fillColor("#1f2430");
    doc.font("Helvetica-Bold").text(L("landlord"), { continued: true }).font("Helvetica").text(data.ownerName);
    doc.font("Helvetica-Bold").text(L("tenant"), { continued: true }).font("Helvetica").text(data.tenantName);
    doc.font("Helvetica-Bold").text(L("home"), { continued: true }).font("Helvetica")
      .text(`${data.propertyTitle}${data.propertyAddress ? " — " + data.propertyAddress : ""}`);
    doc.moveDown(1);

    // Corps
    doc.font("Helvetica").fontSize(11).text(
      L("body", { owner: data.ownerName, tenant: data.tenantName, total: EUR(data.total), period: data.periodLabel }),
      { align: "justify", lineGap: 3 },
    );
    doc.moveDown(1.2);

    // Détail des montants
    const x = doc.x;
    const largeur = 483;
    const row = (label: string, value: string, bold = false) => {
      doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(11);
      const y = doc.y;
      doc.text(label, x, y, { width: largeur - 140 });
      doc.text(value, x + largeur - 140, y, { width: 140, align: "right" });
      doc.moveDown(0.35);
    };
    row(L("rent"), EUR(data.rent));
    row(L("charges"), EUR(data.charges));
    doc.moveTo(x, doc.y + 2).lineTo(x + largeur, doc.y + 2).strokeColor(ligne).stroke();
    doc.moveDown(0.4);
    row(L("total"), EUR(data.total), true);
    doc.moveDown(1);

    // Traçabilité du versement
    doc.fontSize(10).fillColor(gris);
    if (data.method) doc.text(L("method", { method: data.method === "OTHER" ? t(lang, "pdf.method.OTHER") : data.method }));
    if (data.reference) doc.text(L("reference", { reference: data.reference }));
    doc.text(L("confirmed"));
    doc.moveDown(2);

    // Signature
    doc.fillColor("#1f2430").fontSize(11)
      .text(L("doneOn", { date: jour(data.paidAt) }), { align: "right" })
      .moveDown(0.3)
      .text(data.ownerName, { align: "right" });

    doc.end();
  });
}
