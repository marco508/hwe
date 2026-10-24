// bidi-js (algorithme bidirectionnel Unicode) n'embarque pas de types : seules
// les fonctions utilisées par common/pdf-text.ts sont déclarées.
declare module "bidi-js" {
  export interface EmbeddingLevels {
    paragraphs: Array<{ start: number; end: number; level: number }>;
    levels: Uint8Array;
  }
  export interface Bidi {
    getEmbeddingLevels(text: string, direction?: "ltr" | "rtl" | "auto"): EmbeddingLevels;
    getReorderedIndices(text: string, levels: EmbeddingLevels, start?: number, end?: number): number[];
    getMirroredCharacter(char: string): string | null;
  }
  export default function bidiFactory(): Bidi;
}
