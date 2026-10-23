/** Montant formaté dans la devise du bail (repli lisible si la devise est inconnue). */
export function formatMoney(amount: number, currency = "EUR"): string {
  try {
    return amount.toLocaleString("fr-FR", {
      style: "currency",
      currency: currency || "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

/** Variante pour PDFKit (polices standard) : espaces insécables → espaces simples. */
export function formatMoneyPdf(amount: number, currency = "EUR"): string {
  return formatMoney(amount, currency).replace(/[  ]/g, " ");
}

// ── Calculs en centimes (honoraires) ──────────────────────────────────────
// Les montants sont stockés en Float (2 décimales) ; tout calcul passe par
// des centimes entiers pour éviter les erreurs d'arrondi binaire
// (0,1 + 0,2 ≠ 0,3), puis revient à 2 décimales.

/** Montant → centimes entiers (arrondi au centime le plus proche). */
export function toCents(amount: number): number {
  // toFixed(4) absorbe l'erreur binaire (1,005 × 100 = 100,49999…).
  return Math.round(Number(((Number(amount) || 0) * 100).toFixed(4)));
}

/** Centimes → montant à 2 décimales. */
export function fromCents(cents: number): number {
  return Math.round(cents) / 100;
}

/** `rate` % de `amount`, arrondi au centime (demi-centime arrondi au supérieur). */
export function percentOf(amount: number, rate: number): number {
  const cents = toCents(amount);
  // rate en centièmes de pourcent entiers (7,5 % → 750) : calcul exact en entiers.
  const bp = Math.round((Number(rate) || 0) * 100);
  return fromCents(Math.round((cents * bp) / 10_000));
}

/** Somme exacte au centime. */
export function sumMoney(values: number[]): number {
  return fromCents(values.reduce((acc, v) => acc + toCents(v), 0));
}
