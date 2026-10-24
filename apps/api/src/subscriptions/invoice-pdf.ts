import PDFDocument = require("pdfkit");
import { formatMoneyPdf } from "../common/money";
import { APP_TIME_ZONE } from "../common/dates";

/**
 * Facture d'abonnement en PDF (même moteur que les relevés de gérance) :
 * émise par hwe à l'agence, acquittée (le paiement est déjà reçu et validé).
 */
export interface InvoicePdfData {
  number: string; // FAC-2026-00001
  issuedAt: Date;
  agencyName: string;
  agencyDetails: string[];
  planName: string;
  months: number;
  periodStart: Date;
  periodEnd: Date;
  monthlyPrice: number;
  amount: number;
  currency: string;
  method: string; // libellé lisible
  reference: string | null;
}

export function buildInvoicePdf(data: InvoicePdfData): Promise<Buffer> {
  const M = (n: number) => formatMoneyPdf(n, data.currency);
  const jour = (d: Date) => d.toLocaleDateString("fr-FR", { timeZone: APP_TIME_ZONE });
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 56 });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const vert = "#1a642f";
    const gris = "#6b7280";
    const ligne = "#d8e0e8";
    const x = 56;
    const largeur = 483;

    doc.fontSize(18).fillColor(vert).font("Helvetica-Bold").text(`Facture ${data.number}`);
    doc.moveDown(0.2);
    doc.fontSize(10).fillColor(gris).font("Helvetica").text(`émise le ${jour(data.issuedAt)} — acquittée`);
    doc.moveDown(1);

    doc.fontSize(11).fillColor("#1f2430");
    doc.font("Helvetica-Bold").text("Émetteur : ", { continued: true }).font("Helvetica").text("hwe — plateforme de gestion immobilière");
    doc.font("Helvetica-Bold").text("Client : ", { continued: true }).font("Helvetica").text(data.agencyName);
    for (const l of data.agencyDetails.filter(Boolean)) doc.fontSize(9).fillColor(gris).text(l);
    doc.moveDown(1);

    const row = (label: string, value: string, bold = false, color = "#1f2430") => {
      doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(10).fillColor(color);
      const y = doc.y;
      doc.text(label, x, y, { width: largeur - 130 });
      const h = doc.y;
      doc.text(value, x + largeur - 130, y, { width: 130, align: "right" });
      doc.y = Math.max(h, doc.y);
      doc.moveDown(0.3);
    };
    const rule = () => {
      doc.moveTo(x, doc.y + 2).lineTo(x + largeur, doc.y + 2).strokeColor(ligne).stroke();
      doc.moveDown(0.4);
    };

    doc.font("Helvetica-Bold").fontSize(12).fillColor(vert).text("Détail", x);
    doc.moveDown(0.3);
    row(
      `Abonnement ${data.planName} — ${data.months} mois (${M(data.monthlyPrice)} / mois), du ${jour(data.periodStart)} au ${jour(data.periodEnd)}`,
      M(data.amount),
    );
    rule();
    row("Total", M(data.amount), true, vert);
    doc.moveDown(0.8);
    row("Moyen de paiement", data.method);
    if (data.reference) row("Référence", data.reference);
    doc.moveDown(1.5);

    doc.fontSize(9).fillColor(gris).font("Helvetica").text(
      "Paiement reçu et validé par hwe. Les propriétaires et locataires n'ont jamais rien à payer : " +
        "l'abonnement est réglé par l'agence.",
      x,
      doc.y,
      { width: largeur, align: "justify" },
    );
    doc.end();
  });
}
