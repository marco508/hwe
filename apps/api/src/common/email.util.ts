import { Transform } from "class-transformer";

/**
 * E-mails : normalisés partout (minuscules, sans espaces) — l'unicité des
 * comptes et le rattachement locataire↔bail en dépendent. Sans cela,
 * « Jean@Gmail.com » et « jean@gmail.com » donnaient deux comptes distincts.
 */
export function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/** Décorateur DTO : normalise le champ e-mail avant validation. */
export const NormalizeEmail = () =>
  Transform(({ value }) => (typeof value === "string" ? normalizeEmail(value) : value));

/** Décorateur DTO : supprime les espaces de début/fin d'une chaîne libre. */
export const Trim = () =>
  Transform(({ value }) => (typeof value === "string" ? value.trim() : value));

/** Masque une adresse pour les journaux : « jean.dupont@gmail.com » → « j***@g***.com ». */
export function maskEmail(email: string | null | undefined): string {
  if (!email) return "(vide)";
  const at = email.lastIndexOf("@");
  if (at < 1) return "***";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const dot = domain.lastIndexOf(".");
  const tld = dot > 0 ? domain.slice(dot) : "";
  const host = dot > 0 ? domain.slice(0, dot) : domain;
  return `${local[0]}***@${host[0] ?? ""}***${tld}`;
}
