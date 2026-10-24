// PDF en arabe (quittance, facture, relevé) : police arabe embarquée (Amiri),
// plus de Helvetica, glyphes arabes réellement écrits ; PDF latins inchangés
// (Helvetica, pas de police embarquée). Les chaînes arabes sont posées par le
// test : il ne dépend pas de l'avancement du dictionnaire ar.json.
import { test } from "node:test";
import assert from "node:assert/strict";
import { inflateSync } from "node:zlib";
import "reflect-metadata";
import { API_DICTS, type Lang } from "../src/i18n/i18n";
import { buildReceiptPdf } from "../src/rents/receipt";
import { buildInvoicePdf } from "../src/subscriptions/invoice-pdf";
import { buildStatementPdf } from "../src/mandates/statement-pdf";

const AR = {
  "pdf.receipt.title": "إيصال إيجار",
  "pdf.receipt.number": "رقم {number} — صدر في {date}",
  "pdf.receipt.landlord": "المؤجر: ",
  "pdf.receipt.tenant": "المستأجر: ",
  "pdf.receipt.body": "أقرّ {owner} بأنه استلم من {tenant} مبلغ {total} عن الفترة {period}.",
  "pdf.invoice.title": "فاتورة {number}",
  "pdf.invoice.total": "المجموع",
  "pdf.statement.net": "الصافي للمالك",
};

async function withArabic<T>(fn: () => Promise<T>): Promise<T> {
  const ar = API_DICTS.ar;
  API_DICTS.ar = { ...(ar ?? {}), ...AR };
  try {
    return await fn();
  } finally {
    API_DICTS.ar = ar;
  }
}

const day = new Date("2026-10-05T09:00:00Z");
const receipt = (lang: Lang) =>
  buildReceiptPdf({
    lang,
    receiptNo: "Q-2026-000123",
    paidAt: day,
    periodLabel: "أكتوبر 2026",
    propertyTitle: "شقة T3",
    propertyAddress: "4 شارع الحرية، الرباط",
    ownerName: "محمد العلي",
    tenantName: "Sara Benali",
    rent: 6000,
    charges: 500,
    total: 6500,
    currency: "MAD",
    method: "OTHER",
    reference: "OM-77812-XZ",
  });
const invoice = (lang: Lang) =>
  buildInvoicePdf({
    lang,
    number: "FAC-2026-00042",
    issuedAt: day,
    agencyName: "Immo Plus",
    agencyDetails: ["12 rue des Lilas, Paris"],
    planName: "Pro",
    months: 12,
    periodStart: day,
    periodEnd: day,
    monthlyPrice: 29.9,
    amount: 358.8,
    currency: "EUR",
    method: "Virement",
    reference: null,
  });
const statement = (lang: Lang) =>
  buildStatementPdf({
    lang,
    title: "كشف الإدارة — أكتوبر 2026",
    reference: "MAN-2026-00001",
    agencyName: "Immo Plus",
    agencyDetails: [],
    ownerName: "محمد العلي",
    propertyLines: ["شقة T3"],
    currency: "MAD",
    rents: [{ label: "إيجار أكتوبر 2026", tenant: "Sara Benali", paidAt: day, amount: 6500 }],
    fees: [{ label: "أتعاب الإدارة", status: "SETTLED", amount: 975 }],
    totals: { collected: 6500, fees: 975, net: 5525 },
    generatedAt: day,
  });

/** Contenu décompressé de tous les flux du PDF (dont les CMap ToUnicode). */
function streams(pdf: Buffer): string {
  const out: string[] = [];
  let i = 0;
  for (;;) {
    const s = pdf.indexOf("stream\n", i);
    if (s < 0) break;
    const e = pdf.indexOf("\nendstream", s);
    try {
      out.push(inflateSync(pdf.subarray(s + 7, e)).toString("latin1"));
    } catch {
      /* flux non compressé (police) */
    }
    i = e + 10;
  }
  return out.join("\n");
}

test("le PDF arabe embarque la police arabe et ne contient pas Helvetica", async () => {
  for (const [name, build] of [
    ["quittance", receipt],
    ["facture", invoice],
    ["relevé", statement],
  ] as const) {
    const pdf = await withArabic(() => build("ar"));
    const raw = pdf.toString("latin1");
    assert.match(raw, /\/BaseFont \/[A-Z]{6}\+Amiri-Regular/, `${name} : Amiri embarquée`);
    assert.match(raw, /\/FontFile2 /, `${name} : police TrueType incluse`);
    assert.doesNotMatch(raw, /Helvetica/, `${name} : plus de Helvetica`);
    // ف (U+0641) et ر (U+0631) écrits : présents dans la table ToUnicode.
    const cmaps = streams(pdf);
    assert.match(cmaps, /<0641>/i, `${name} : lettres arabes écrites`);
    assert.match(cmaps, /<0631>/i, `${name} : lettres arabes écrites`);
  }
});

test("PDF latins inchangés : Helvetica, aucune police embarquée", async () => {
  for (const lang of ["fr", "en", "es", "pt"] as const) {
    const raw = (await withArabic(() => receipt(lang))).toString("latin1");
    assert.match(raw, /\/BaseFont \/Helvetica/, lang);
    assert.doesNotMatch(raw, /Amiri|\/FontFile2/, lang);
  }
});
