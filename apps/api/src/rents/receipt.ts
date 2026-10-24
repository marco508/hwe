import PDFDocument = require("pdfkit");
import { APP_TIME_ZONE } from "../common/dates";
import { pdfText } from "../common/pdf-text";
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

const PAYMENT_METHOD_CODES = new Set(["TRANSFER", "MOBILE_MONEY", "CASH", "OTHER"]);

/** Moyen déclaré : code (TRANSFER…, OTHER) ou « Autre » historique traduits ; libellé libre du bailleur tel quel. */
export function paymentMethodText(lang: Lang, method: string): string {
  const m = method.trim();
  if (m === "Autre") return t(lang, "pdf.method.OTHER");
  return PAYMENT_METHOD_CODES.has(m) ? t(lang, `pdf.method.${m}`) : m;
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
    // Texte gauche-à-droite (Helvetica) ou droite-à-gauche (arabe, police embarquée).
    const P = pdfText(doc, lang);

    const vert = "#1a642f";
    const gris = "#6b7280";
    const ligne = "#d8e0e8";

    // En-tête
    doc.fontSize(20).fillColor(vert).font(P.bold);
    P.text(L("title"));
    doc.moveDown(0.2);
    doc.fontSize(10).fillColor(gris).font(P.regular);
    P.text(L("number", { number: data.receiptNo, date: jour(data.paidAt) }));
    doc.moveDown(1.2);

    // Parties
    doc.fontSize(11).fillColor("#1f2430");
    P.labelValue(L("landlord"), data.ownerName);
    P.labelValue(L("tenant"), data.tenantName);
    P.labelValue(L("home"), `${data.propertyTitle}${data.propertyAddress ? " — " + data.propertyAddress : ""}`);
    doc.moveDown(1);

    // Corps
    doc.font(P.regular).fontSize(11);
    P.text(
      L("body", { owner: data.ownerName, tenant: data.tenantName, total: EUR(data.total), period: data.periodLabel }),
      { align: "justify", lineGap: 3 },
    );
    doc.moveDown(1.2);

    // Détail des montants
    const x = doc.x;
    const largeur = 483;
    // Ligne « libellé … montant ». Après la cellule de droite, PDFKit garde sa
    // position (x de la colonne étroite) et la police : on rétablit la marge
    // gauche et la police normale, sinon le texte suivant s'écrit en gras dans
    // une colonne de 140 pt.
    const row = (label: string, value: string, bold = false) => {
      doc.font(bold ? P.bold : P.regular).fontSize(11);
      const y = doc.y;
      P.text(label, { x, y, width: largeur - 140 });
      const h = doc.y;
      P.text(value, { x: x + largeur - 140, y, width: 140, align: "right" });
      doc.y = Math.max(h, doc.y);
      doc.x = x;
      doc.font(P.regular);
      doc.moveDown(0.35);
    };
    row(L("rent"), EUR(data.rent));
    row(L("charges"), EUR(data.charges));
    doc.moveTo(x, doc.y + 2).lineTo(x + largeur, doc.y + 2).strokeColor(ligne).stroke();
    doc.moveDown(0.4);
    row(L("total"), EUR(data.total), true);
    doc.moveDown(1);

    // Traçabilité du versement (pleine largeur, police normale)
    doc.x = x;
    doc.font(P.regular).fontSize(10).fillColor(gris);
    if (data.method) P.text(L("method", { method: paymentMethodText(lang, data.method) }));
    if (data.reference) P.text(L("reference", { reference: data.reference }));
    P.text(L("confirmed"));
    doc.moveDown(2);

    // Signature
    doc.fillColor("#1f2430").fontSize(11);
    P.text(L("doneOn", { date: jour(data.paidAt) }), { align: "right" });
    doc.moveDown(0.3);
    P.text(data.ownerName, { align: "right" });

    doc.end();
  });
}
