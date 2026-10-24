import PDFDocument = require("pdfkit");
import { APP_TIME_ZONE } from "../common/dates";
import { moneyPdf, pdfLang, shortDate, t, type Lang } from "../i18n/i18n";

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
  /** Langue du document ; fr par défaut. */
  lang?: Lang;
}

export function buildStatementPdf(data: StatementPdfData): Promise<Buffer> {
  const lang = pdfLang(data.lang ?? "fr");
  const L = (key: string, params?: Record<string, string | number>) => t(lang, `pdf.statement.${key}`, params);
  const M = (n: number) => moneyPdf(lang, n, data.currency);
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
    const x = 56;
    const largeur = 483;

    doc.fontSize(18).fillColor(vert).font("Helvetica-Bold").text(data.title);
    doc.moveDown(0.2);
    doc.fontSize(10).fillColor(gris).font("Helvetica")
      .text(
        data.reference
          ? L("editedWithMandate", { reference: data.reference, date: jour(data.generatedAt) })
          : L("edited", { date: jour(data.generatedAt) }),
      );
    doc.moveDown(1);

    doc.fontSize(11).fillColor("#1f2430");
    doc.font("Helvetica-Bold").text(L("agent"), { continued: true }).font("Helvetica").text(data.agencyName);
    for (const l of data.agencyDetails.filter(Boolean)) doc.fontSize(9).fillColor(gris).text(l);
    doc.fontSize(11).fillColor("#1f2430");
    doc.font("Helvetica-Bold").text(L("owner"), { continued: true }).font("Helvetica").text(data.ownerName);
    for (const l of data.propertyLines) {
      doc.font("Helvetica-Bold").text(L("property"), { continued: true }).font("Helvetica").text(l);
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

    doc.font("Helvetica-Bold").fontSize(12).fillColor(vert).text(L("rents"), x);
    doc.moveDown(0.3);
    if (data.rents.length === 0) row(L("noRents"), "", false, gris);
    for (const r of data.rents) {
      row(`${r.label} — ${r.tenant}${r.paidAt ? ` ${L("validatedOn", { date: jour(r.paidAt) })}` : ""}`, M(r.amount));
    }
    rule();
    row(L("totalCollected"), M(data.totals.collected), true);
    doc.moveDown(0.8);

    doc.font("Helvetica-Bold").fontSize(12).fillColor(vert).text(L("fees"), x);
    doc.moveDown(0.3);
    if (data.fees.length === 0) row(L("noFees"), "", false, gris);
    for (const f of data.fees) {
      row(`${f.label} — ${f.status === "SETTLED" ? L("settled") : L("due")}`, `- ${M(f.amount)}`);
    }
    rule();
    row(L("totalFees"), `- ${M(data.totals.fees)}`, true);
    doc.moveDown(0.8);

    rule();
    row(L("net"), M(data.totals.net), true, vert);
    doc.moveDown(1.5);

    doc.fontSize(9).fillColor(gris).font("Helvetica").text(
      L("footer"),
      x,
      doc.y,
      { width: largeur, align: "justify" },
    );
    doc.end();
  });
}
