import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import bidiFactory from "bidi-js";
import type { Lang } from "../i18n/i18n";

/**
 * Écriture du texte des PDF (factures, relevés, quittances), de gauche à
 * droite ou de droite à gauche.
 *
 * - Langues latines : polices standard de PDFKit (Helvetica) et appels
 *   PDFKit inchangés — les PDF fr/en/es/pt sont identiques à ceux d'avant.
 * - Arabe : police Amiri embarquée (assets/fonts, licence OFL ; elle contient
 *   aussi le latin et les chiffres), blocs alignés à droite et colonnes en
 *   miroir. PDFKit (fontkit) sait lier les lettres arabes (formes
 *   contextuelles) mais ne fait pas l'algorithme bidirectionnel, et coupe le
 *   texte mot à mot (chaque mot arabe est retourné, la phrase reste de gauche
 *   à droite). Chaque ligne est donc découpée ici, ordonnée par bidi-js
 *   (UAX #9 : nombres, montants, dates, FAC-/MAN-, noms latins restent
 *   lisibles), puis dessinée run par run à des positions explicites :
 *   un run arabe est confié tel quel (ordre logique) à fontkit, qui le met en
 *   forme et le retourne lui-même.
 */

const bidi = bidiFactory();

export interface PdfSeg {
  text: string;
  bold?: boolean;
}

export interface PdfTextOptions {
  x?: number;
  y?: number;
  width?: number;
  align?: "left" | "right" | "center" | "justify";
  lineGap?: number;
}

export interface PdfText {
  /** Document de droite à gauche (arabe). */
  rtl: boolean;
  /** Noms de police à passer à `doc.font()`. */
  regular: string;
  bold: string;
  /**
   * Bloc de texte, mêmes paramètres que `doc.text()`. En RTL, la zone
   * [x, x + width] est reflétée dans la page et l'alignement inversé
   * (gauche ↔ droite, justifié → droite).
   */
  text(content: string, opts?: PdfTextOptions): void;
  /** « Libellé : valeur », libellé en gras (style des en-têtes). */
  labelValue(label: string, value: string): void;
}

const RTL_LANGS: ReadonlySet<Lang> = new Set<Lang>(["ar"]);

const FONT_FILES = { regular: "Amiri-Regular.ttf", bold: "Amiri-Bold.ttf" } as const;
const fontCache = new Map<string, Buffer>();

/** Dossier des polices : apps/api/assets/fonts (sources ts-node comme dist/ compilé). */
function fontsDir(): string {
  const candidates = [
    join(__dirname, "../../assets/fonts"), // src/common
    join(__dirname, "../../../../../assets/fonts"), // dist/apps/api/src/common
    join(process.cwd(), "assets/fonts"),
    join(process.cwd(), "apps/api/assets/fonts"),
  ];
  const dir = candidates.find((d) => existsSync(join(d, FONT_FILES.regular)));
  if (!dir) throw new Error(`Police arabe introuvable (${FONT_FILES.regular}) : ${candidates.join(", ")}`);
  return dir;
}

function fontData(file: string): Buffer {
  let buf = fontCache.get(file);
  if (!buf) {
    buf = readFileSync(join(fontsDir(), file));
    fontCache.set(file, buf);
  }
  return buf;
}

/** Langue écrite de droite à gauche ? */
export function isRtl(lang: Lang): boolean {
  return RTL_LANGS.has(lang);
}

export function pdfText(doc: PDFKit.PDFDocument, lang: Lang): PdfText {
  if (!isRtl(lang)) return ltrText(doc);
  doc.registerFont("Amiri", fontData(FONT_FILES.regular));
  doc.registerFont("Amiri-Bold", fontData(FONT_FILES.bold));
  return rtlText(doc, "Amiri", "Amiri-Bold");
}

// ───────────────────────── Gauche à droite : PDFKit tel quel ─────────────────────────

function ltrText(doc: PDFKit.PDFDocument): PdfText {
  return {
    rtl: false,
    regular: "Helvetica",
    bold: "Helvetica-Bold",
    text(content, opts) {
      if (!opts) {
        doc.text(content);
        return;
      }
      const { x, y, ...rest } = opts;
      if (x !== undefined || y !== undefined) doc.text(content, x, y, rest);
      else doc.text(content, rest);
    },
    labelValue(label, value) {
      doc.font("Helvetica-Bold").text(label, { continued: true }).font("Helvetica").text(value);
    },
  };
}

// ───────────────────────── Droite à gauche ─────────────────────────

/** Écritures que fontkit retourne d'elle-même (détection par script). */
const RTL_SCRIPT = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Syriac}\p{Script=Thaana}\p{Script=Nko}]/u;
/** Marques et contrôles bidi : pris en compte par l'algorithme, jamais dessinés. */
const BIDI_CONTROL = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/;
/** `features` explicites : PDFKit met alors en forme le run d'un bloc, sans le couper aux espaces. */
const WHOLE_RUN = { features: [] as PDFKit.Mixins.OpenTypeFeatures[] };

type Font = string;

/** Largeurs de texte déjà mesurées (toutes polices embarquées ; borné). */
const WIDTH_CACHE = new Map<string, number>();
const WIDTH_CACHE_MAX = 20_000;

function rtlText(doc: PDFKit.PDFDocument, regular: Font, bold: Font): PdfText {
  // Police courante (posée par `doc.font(P.bold)` dans les gabarits) : par
  // identité de l'objet police de PDFKit.
  const fontObj = () => (doc as unknown as { _font?: object })._font;
  doc.font(bold);
  const boldObj = fontObj();
  doc.font(regular);
  const currentFont = (): Font => (fontObj() === boldObj ? bold : regular);

  const width = (s: string, font: Font) => {
    doc.font(font);
    // Mise en forme (fontkit) coûteuse et répétée par la coupure en lignes :
    // largeurs mémorisées par police, corps et texte (résultat identique).
    const key = `${font}\u0000${(doc as unknown as { _fontSize: number })._fontSize}\u0000${s}`;
    const hit = WIDTH_CACHE.get(key);
    if (hit !== undefined) return hit;
    const w = doc.widthOfString(s, WHOLE_RUN);
    if (WIDTH_CACHE.size >= WIDTH_CACHE_MAX) WIDTH_CACHE.delete(WIDTH_CACHE.keys().next().value as string);
    WIDTH_CACHE.set(key, w);
    return w;
  };

  /** Largeur (ordre logique) d'une portion de texte à polices mêlées. */
  const spanWidth = (chars: string[], fonts: Font[], from: number, to: number) => {
    let w = 0;
    let i = from;
    while (i < to) {
      let j = i;
      let s = "";
      while (j < to && fonts[j] === fonts[i]) {
        if (!BIDI_CONTROL.test(chars[j]!)) s += chars[j];
        j++;
      }
      if (s) w += width(s, fonts[i]!);
      i = j;
    }
    return w;
  };

  /** Coupure en lignes (ordre logique), aux espaces. Renvoie [début, fin[ de chaque ligne. */
  const wrap = (chars: string[], fonts: Font[], maxWidth: number): Array<[number, number]> => {
    const lines: Array<[number, number]> = [];
    let start = 0;
    while (start < chars.length) {
      let end = start; // fin retenue (exclue)
      let i = start;
      while (i < chars.length) {
        let j = i;
        while (j < chars.length && chars[j] !== " ") j++; // fin du mot
        if (end > start && spanWidth(chars, fonts, start, j) > maxWidth) break;
        end = j;
        while (j < chars.length && chars[j] === " ") j++; // espaces après le mot
        i = j;
      }
      if (end === start) end = Math.max(i, start + 1);
      lines.push([start, end]);
      start = end;
      while (start < chars.length && chars[start] === " ") start++;
    }
    return lines;
  };

  /** Dessine une ligne [start, end[ du paragraphe, ordonnée par bidi. */
  const drawLine = (
    text: string,
    chars: string[],
    fonts: Font[],
    levels: ReturnType<typeof bidi.getEmbeddingLevels>,
    start: number,
    end: number,
    left: number,
    boxWidth: number,
    align: "left" | "right" | "center",
    y: number,
  ) => {
    // Indices de code-units → bidi-js travaille sur la chaîne JS ; `chars` est
    // découpé par point de code : on garde la correspondance.
    const offsets: number[] = [];
    let off = 0;
    for (const c of chars) {
      offsets.push(off);
      off += c.length;
    }
    const cuStart = offsets[start]!;
    const cuEnd = (offsets[end - 1] ?? cuStart) + (chars[end - 1]?.length ?? 1) - 1;
    const cuToChar = new Map<number, number>();
    offsets.forEach((o, i) => cuToChar.set(o, i));
    const visual = bidi
      .getReorderedIndices(text, levels, cuStart, cuEnd)
      .slice(cuStart, cuEnd + 1)
      .map((cu) => cuToChar.get(cu))
      .filter((i): i is number => i !== undefined && !BIDI_CONTROL.test(chars[i]!));

    // Runs visuels : même police, même niveau, indices logiques contigus.
    const runs: Array<{ s: string; font: Font; w: number }> = [];
    let k = 0;
    while (k < visual.length) {
      const first = visual[k]!;
      const lvl = levels.levels[offsets[first]!]!;
      const group = [first];
      let m = k + 1;
      while (m < visual.length) {
        const idx = visual[m]!;
        const prev = group[group.length - 1]!;
        if (fonts[idx] !== fonts[first] || levels.levels[offsets[idx]!] !== lvl) break;
        if (Math.abs(idx - prev) !== 1) break;
        group.push(idx);
        m++;
      }
      const rtlRun = lvl % 2 === 1;
      // Run de droite à gauche : caractères en miroir (« ( » ↔ « ) », règle
      // L4 ; Amiri n'a pas de `rtlm` qui le ferait).
      const glyphChar = (i: number) => (rtlRun ? (bidi.getMirroredCharacter(chars[i]!) ?? chars[i]!) : chars[i]!);
      const logical = (rtlRun ? [...group].reverse() : group).map(glyphChar).join("");
      let s: string;
      if (RTL_SCRIPT.test(logical)) {
        // fontkit met en forme (lettres liées) puis retourne lui-même le run.
        // Run gauche-à-droite contenant des caractères arabes (chiffres
        // arabo-indiens) : retourné d'avance pour rester dans l'ordre.
        s = rtlRun ? logical : [...logical].reverse().join("");
      } else {
        // Sans écriture arabe, fontkit ne retourne rien : ordre visuel tel quel.
        s = group.map(glyphChar).join("");
      }
      runs.push({ s, font: fonts[first]!, w: width(s, fonts[first]!) });
      k = m;
    }

    const total = runs.reduce((a, r) => a + r.w, 0);
    let cx = align === "left" ? left : align === "center" ? left + (boxWidth - total) / 2 : left + boxWidth - total;
    for (const r of runs) {
      doc.font(r.font);
      doc.text(r.s, cx, y, { lineBreak: false, ...WHOLE_RUN });
      cx += r.w;
    }
  };

  let lastBreak: { page: unknown; fromY: number; toY: number } | null = null;

  const block = (segs: PdfSeg[] | string, opts: PdfTextOptions = {}) => {
    const baseFont = currentFont();
    const parts: PdfSeg[] = typeof segs === "string" ? [{ text: segs, bold: baseFont === bold }] : segs;
    const pageLeft = doc.page.margins.left;
    const pageRight = doc.page.width - doc.page.margins.right;
    const x = opts.x ?? doc.x;
    const boxWidth = opts.width ?? pageRight - x;
    const left = pageLeft + pageRight - (x + boxWidth); // zone reflétée
    const align = opts.align === "right" ? "left" : opts.align === "center" ? "center" : "right";
    const lineGap = opts.lineGap ?? 0;
    let y = opts.y ?? doc.y;
    // Cellule voisine (même `y`) d'une cellule renvoyée en haut de page.
    if (opts.y !== undefined && lastBreak && lastBreak.page === doc.page && lastBreak.fromY === opts.y) y = lastBreak.toY;

    // Paragraphes (retours à la ligne explicites), espaces insécables → espaces.
    const all = parts.map((p) => ({ ...p, text: p.text.replace(/[\u00A0\u202F]/g, " ") }));
    const paragraphs: PdfSeg[][] = [[]];
    for (const p of all) {
      p.text.split("\n").forEach((piece, i) => {
        if (i > 0) paragraphs.push([]);
        paragraphs[paragraphs.length - 1]!.push({ text: piece, bold: p.bold });
      });
    }

    let lastFont = baseFont;
    for (const para of paragraphs) {
      const chars: string[] = [];
      const fonts: Font[] = [];
      for (const p of para) {
        for (const c of p.text) {
          chars.push(c);
          fonts.push(p.bold ? bold : regular);
        }
      }
      if (para.length) lastFont = para[para.length - 1]!.bold ? bold : regular;
      const text = chars.join("");
      doc.font(lastFont);
      const lineHeight = doc.currentLineHeight(true);
      if (!text.trim()) {
        y += lineHeight + lineGap;
        continue;
      }
      // Paragraphe de droite à gauche s'il contient de l'arabe (ou une marque
      // RLM/ALM, cf. montants formatés en arabe) ; une ligne purement latine
      // (adresse, e-mail, nom) garde son ordre naturel, alignée à droite.
      const levels = bidi.getEmbeddingLevels(text, RTL_SCRIPT.test(text) || /[\u200F\u061C]/.test(text) ? "rtl" : "ltr");
      const lines = wrap(chars, fonts, boxWidth);
      const bottom = doc.page.height - doc.page.margins.bottom;
      const height = lines.length * (lineHeight + lineGap);
      // Cellule de tableau (y imposé) qui déborde : entière sur la page suivante,
      // et ses voisines de ligne avec elle.
      if (opts.y !== undefined && y + height > bottom && height <= bottom - doc.page.margins.top) {
        const fromY = y;
        doc.addPage();
        y = doc.page.margins.top;
        lastBreak = { page: doc.page, fromY, toY: y };
      }
      for (const [s, e] of lines) {
        if (y + lineHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          y = doc.page.margins.top;
        }
        drawLine(text, chars, fonts, levels, s, e, left, boxWidth, align, y);
        y += lineHeight + lineGap;
      }
    }
    doc.font(lastFont);
    doc.x = x;
    doc.y = y;
  };

  return {
    rtl: true,
    regular,
    bold,
    text: (content, opts) => block(content, opts),
    labelValue: (label, value) =>
      block([
        { text: label, bold: true },
        { text: value, bold: false },
      ]),
  };
}
