import PDFDocument = require("pdfkit");
import { formatMoneyPdf } from "../common/money";
import { APP_TIME_ZONE } from "../common/dates";

/**
 * Relevé de gérance mensuel en PDF (même facture que la quittance) :
 * loyers encaissés sur le mois, honoraires de l'agence, net propriétaire.
 * Document de suivi : hwe n'encaisse rien.
 */
export interface StatementPdfData {
  title: string; // « Relevé de gérance — octobre 2026 »
  reference: string | null; // mandat
  agencyName: string;
  agencyDetails: string[];
  ownerName: string;
  propertyLines: string[];
  currency: string;
  rents: Array<{ label: string; tenant: string; paidAt: Date | null; amount: number }>;
  fees: Array<{ label: string; status: string; amount: number }>;
  totals: { collected: number; fees: number; net: number };
  generatedAt: Date;
}

export function buildStatementPdf(data: StatementPdfData): Promise<Buffer> {
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

    doc.fontSize(18).fillColor(vert).font("Helvetica-Bold").text(data.title);
    doc.moveDown(0.2);
    doc.fontSize(10).fillColor(gris).font("Helvetica")
      .text(`${data.reference ? `Mandat ${data.reference} — ` : ""}édité le ${jour(data.generatedAt)}`);
    doc.moveDown(1);

    doc.fontSize(11).fillColor("#1f2430");
    doc.font("Helvetica-Bold").text("Mandataire : ", { continued: true }).font("Helvetica").text(data.agencyName);
    for (const l of data.agencyDetails.filter(Boolean)) doc.fontSize(9).fillColor(gris).text(l);
    doc.fontSize(11).fillColor("#1f2430");
    doc.font("Helvetica-Bold").text("Propriétaire : ", { continued: true }).font("Helvetica").text(data.ownerName);
    for (const l of data.propertyLines) {
      doc.font("Helvetica-Bold").text("Bien : ", { continued: true }).font("Helvetica").text(l);
    }
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

    doc.font("Helvetica-Bold").fontSize(12).fillColor(vert).text("Loyers encaissés", x);
    doc.moveDown(0.3);
    if (data.rents.length === 0) row("Aucun loyer validé sur la période.", "", false, gris);
    for (const r of data.rents) {
      row(`${r.label} — ${r.tenant}${r.paidAt ? ` (validé le ${jour(r.paidAt)})` : ""}`, M(r.amount));
    }
    rule();
    row("Total encaissé", M(data.totals.collected), true);
    doc.moveDown(0.8);

    doc.font("Helvetica-Bold").fontSize(12).fillColor(vert).text("Honoraires de l'agence", x);
    doc.moveDown(0.3);
    if (data.fees.length === 0) row("Aucun honoraire sur la période.", "", false, gris);
    for (const f of data.fees) {
      row(`${f.label}${f.status === "SETTLED" ? " — réglé" : " — dû"}`, `- ${M(f.amount)}`);
    }
    rule();
    row("Total honoraires", `- ${M(data.totals.fees)}`, true);
    doc.moveDown(0.8);

    rule();
    row("Net propriétaire", M(data.totals.net), true, vert);
    doc.moveDown(1.5);

    doc.fontSize(9).fillColor(gris).font("Helvetica").text(
      "Relevé établi à partir des loyers validés et des honoraires calculés sur la plateforme hwe, " +
        "selon les conditions du mandat. hwe ne détient pas les fonds : les règlements se font hors plateforme.",
      x,
      doc.y,
      { width: largeur, align: "justify" },
    );
    doc.end();
  });
}
