import PDFDocument = require("pdfkit");
import { APP_TIME_ZONE } from "../common/dates";
import { pdfText } from "../common/pdf-text";
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
    // Texte gauche-à-droite (Helvetica) ou droite-à-gauche (arabe, police embarquée).
    const P = pdfText(doc, lang);

    const vert = "#1a642f";
    const gris = "#6b7280";
    const ligne = "#d8e0e8";
    const x = 56;
    const largeur = 483;

    doc.fontSize(18).fillColor(vert).font(P.bold);
    P.text(data.title);
    doc.moveDown(0.2);
    doc.fontSize(10).fillColor(gris).font(P.regular);
    P.text(
      data.reference
        ? L("editedWithMandate", { reference: data.reference, date: jour(data.generatedAt) })
        : L("edited", { date: jour(data.generatedAt) }),
    );
    doc.moveDown(1);

    doc.fontSize(11).fillColor("#1f2430");
    P.labelValue(L("agent"), data.agencyName);
    for (const l of data.agencyDetails.filter(Boolean)) {
      doc.fontSize(9).fillColor(gris);
      P.text(l);
    }
    doc.fontSize(11).fillColor("#1f2430");
    P.labelValue(L("owner"), data.ownerName);
    for (const l of data.propertyLines) P.labelValue(L("property"), l);
    doc.moveDown(1);

    const row = (label: string, value: string, bold = false, color = "#1f2430") => {
      doc.font(bold ? P.bold : P.regular).fontSize(10).fillColor(color);
      const y = doc.y;
      P.text(label, { x, y, width: largeur - 130 });
      const h = doc.y;
      P.text(value, { x: x + largeur - 130, y, width: 130, align: "right" });
      doc.y = Math.max(h, doc.y);
      // Retour à la marge gauche et à la police normale (la cellule de droite les laisse modifiées).
      doc.x = x;
      doc.font(P.regular);
      doc.moveDown(0.3);
    };
    const rule = () => {
      doc.moveTo(x, doc.y + 2).lineTo(x + largeur, doc.y + 2).strokeColor(ligne).stroke();
      doc.moveDown(0.4);
    };

    doc.font(P.bold).fontSize(12).fillColor(vert);
    P.text(L("rents"), { x });
    doc.moveDown(0.3);
    if (data.rents.length === 0) row(L("noRents"), "", false, gris);
    for (const r of data.rents) {
      row(`${r.label} — ${r.tenant}${r.paidAt ? ` ${L("validatedOn", { date: jour(r.paidAt) })}` : ""}`, M(r.amount));
    }
    rule();
    row(L("totalCollected"), M(data.totals.collected), true);
    doc.moveDown(0.8);

    doc.font(P.bold).fontSize(12).fillColor(vert);
    P.text(L("fees"), { x });
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

    doc.fontSize(9).fillColor(gris).font(P.regular);
    P.text(L("footer"), { x, y: doc.y, width: largeur, align: "justify" });
    doc.end();
  });
}
