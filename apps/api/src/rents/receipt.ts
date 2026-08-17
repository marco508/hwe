import PDFDocument = require("pdfkit");

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
  rent: number;
  charges: number;
  total: number;
  method: string | null;
  reference: string | null;
}

const EUR = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

export function buildReceiptPdf(data: ReceiptData): Promise<Buffer> {
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
    doc.fontSize(20).fillColor(vert).font("Helvetica-Bold").text("Quittance de loyer");
    doc.moveDown(0.2);
    doc.fontSize(10).fillColor(gris).font("Helvetica")
      .text(`N° ${data.receiptNo} — émise le ${data.paidAt.toLocaleDateString("fr-FR")}`);
    doc.moveDown(1.2);

    // Parties
    doc.fontSize(11).fillColor("#1f2430");
    doc.font("Helvetica-Bold").text("Bailleur : ", { continued: true }).font("Helvetica").text(data.ownerName);
    doc.font("Helvetica-Bold").text("Locataire : ", { continued: true }).font("Helvetica").text(data.tenantName);
    doc.font("Helvetica-Bold").text("Logement : ", { continued: true }).font("Helvetica")
      .text(`${data.propertyTitle}${data.propertyAddress ? " — " + data.propertyAddress : ""}`);
    doc.moveDown(1);

    // Corps
    doc.font("Helvetica").fontSize(11).text(
      `Je soussigné(e) ${data.ownerName}, bailleur, atteste avoir reçu de ${data.tenantName} ` +
        `la somme de ${EUR(data.total)} au titre du loyer et des charges pour la période de ` +
        `${data.periodLabel}, et lui en donne quittance, sous réserve de tous mes droits.`,
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
    row("Loyer", EUR(data.rent));
    row("Charges", EUR(data.charges));
    doc.moveTo(x, doc.y + 2).lineTo(x + largeur, doc.y + 2).strokeColor(ligne).stroke();
    doc.moveDown(0.4);
    row("Total reçu", EUR(data.total), true);
    doc.moveDown(1);

    // Traçabilité du versement
    doc.fontSize(10).fillColor(gris);
    if (data.method) doc.text(`Moyen de paiement déclaré : ${data.method}`);
    if (data.reference) doc.text(`Identifiant de transaction : ${data.reference}`);
    doc.text("Versement déclaré par le locataire puis confirmé par le bailleur sur la plateforme hwe.");
    doc.moveDown(2);

    // Signature
    doc.fillColor("#1f2430").fontSize(11)
      .text(`Fait le ${data.paidAt.toLocaleDateString("fr-FR")}`, { align: "right" })
      .moveDown(0.3)
      .text(data.ownerName, { align: "right" });

    doc.end();
  });
}
