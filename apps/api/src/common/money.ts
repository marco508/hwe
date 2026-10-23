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
