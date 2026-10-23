/**
 * Générateur UNIQUE du texte de contrat de bail (F7).
 *
 * Utilisé à l'identique par l'espace propriétaire (aperçu + téléchargement)
 * et par l'espace locataire (lecture avant signature) : les deux parties
 * lisent donc exactement le même texte.
 *
 * Document juridique rédigé en français volontairement (non traduit).
 * - Les montants sont toujours formatés dans la devise du bail (`lease.currency`).
 * - Les références à la loi française (loi de 1989, ALUR, IRL) ne sont
 *   insérées que pour un bien situé en France ; ailleurs, renvoi générique
 *   à la législation du pays de situation du bien.
 * - Le cas « séjour courte durée » (bail `shortStay`) produit un contrat de
 *   séjour avec une échéance unique au lieu d'un loyer mensuel.
 * - Les signatures électroniques (bailleur, locataire, colocataires) sont
 *   reportées en fin de document.
 *
 * Module sans dépendance au DOM : utilisable côté navigateur comme côté Node.
 */

import type { LeaseContract, PropertyType } from "./index";

export interface LeaseContractPropertyInput {
  addressLine?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
  surface?: number | null;
  rooms?: number | null;
  propertyType?: PropertyType | string | null;
  currency?: string | null;
}

export interface LeaseContractPartyInput {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface LeaseContractInput {
  lease: LeaseContract;
  /** Bien loué ; à défaut, `lease.property`. */
  property?: LeaseContractPropertyInput | null;
  /** Bailleur ; à défaut, `lease.property.owner`. */
  owner?: LeaseContractPartyInput | null;
}

const RULE = "═══════════════════════════════════════════════════════════════";
const THIN = "─────────────────────────────────────────────────────";

const PROPERTY_TYPE_FR: Record<string, string> = {
  APARTMENT: "Appartement",
  HOUSE: "Maison",
  STUDIO: "Studio",
  LAND: "Terrain",
  COMMERCIAL: "Local commercial",
  OTHER: "Autre",
};

/** Devise effective d'un bail : celle du bail, sinon celle du bien, sinon EUR. */
export function leaseCurrency(
  lease: Pick<LeaseContract, "currency" | "property">,
  fallback?: string | null,
): string {
  const fromLease = lease.currency ?? undefined;
  const fromProperty = (lease.property as { currency?: string | null } | undefined)?.currency ?? undefined;
  return (fromLease || fromProperty || fallback || "EUR").toUpperCase();
}

function money(n: number | null | undefined, currency: string): string {
  const v = typeof n === "number" && Number.isFinite(n) ? n : 0;
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(v);
  } catch {
    return `${new Intl.NumberFormat("fr-FR").format(v)} ${currency}`;
  }
}

// Dates de bail = dates civiles : on formate en UTC pour éviter le décalage
// d'un jour selon le fuseau du lecteur.
function day(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function dateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function countryName(code: string | null | undefined): string {
  if (!code) return "";
  const upper = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return code;
  try {
    return new Intl.DisplayNames(["fr"], { type: "region" }).of(upper) ?? upper;
  } catch {
    return upper;
  }
}

function fullName(p: LeaseContractPartyInput | null | undefined, fallback: string): string {
  const n = `${p?.firstName ?? ""} ${p?.lastName ?? ""}`.trim();
  return n || fallback;
}

function lines(...parts: (string | false | null | undefined)[]): string {
  return parts.filter((p) => typeof p === "string").join("\n");
}

function section(title: string, body: string): string {
  return `${RULE}\n${title}\n${RULE}\n\n${body.trim()}\n`;
}

/** Nombre de jours entre deux dates (au moins 0). */
function daysBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

export function generateLeaseContract(input: LeaseContractInput): string {
  const { lease } = input;
  const property: LeaseContractPropertyInput = input.property ?? lease.property ?? {};
  const owner: LeaseContractPartyInput | null =
    input.owner ?? (lease.property?.owner as LeaseContractPartyInput | undefined) ?? null;

  const currency = leaseCurrency(lease, property.currency);
  const isFrance = (property.country ?? "").trim().toUpperCase() === "FR";
  const shortStay = Boolean(lease.shortStay);

  const ownerName = fullName(owner, "Le propriétaire");
  const tenantName = fullName(
    { firstName: lease.tenantFirstName, lastName: lease.tenantLastName },
    "Le locataire",
  );
  const address = [
    property.addressLine,
    [property.postalCode, property.city].filter(Boolean).join(" "),
    countryName(property.country),
  ]
    .filter((x) => x && String(x).trim())
    .join(", ");
  const nature = property.propertyType
    ? PROPERTY_TYPE_FR[String(property.propertyType)] ?? String(property.propertyType)
    : null;
  const furnishedTxt = lease.furnished ? "meublé" : "non meublé";

  const out: string[] = [];

  // ── En-tête ──
  if (shortStay) {
    out.push(
      lines(
        "CONTRAT DE LOCATION — SÉJOUR DE COURTE DURÉE",
        `Logement ${furnishedTxt}`,
        "",
        "Location consentie pour un séjour temporaire, qui ne constitue pas la",
        "résidence principale du locataire.",
      ),
    );
  } else {
    out.push(
      lines(
        "CONTRAT DE BAIL D'HABITATION",
        lease.furnished ? "MEUBLÉ" : "NON MEUBLÉ",
        "",
        isFrance
          ? "Établi conformément à la loi n° 89-462 du 6 juillet 1989 modifiée\net à la loi n° 2014-366 du 24 mars 2014 (loi ALUR)."
          : "Établi conformément à la législation applicable dans le pays\nde situation du bien loué.",
      ),
    );
  }

  // ── Article 1 : parties ──
  out.push(
    section(
      "ARTICLE 1 — LES PARTIES",
      lines(
        "BAILLEUR (Propriétaire)",
        `Nom : ${ownerName}`,
        owner?.email ? `E-mail : ${owner.email}` : null,
        owner?.phone ? `Téléphone : ${owner.phone}` : null,
        "",
        "PRENEUR (Locataire)",
        `Nom : ${tenantName}`,
        lease.tenantEmail ? `E-mail : ${lease.tenantEmail}` : null,
        lease.tenantPhone ? `Téléphone : ${lease.tenantPhone}` : null,
        lease.tenantAddress ? `Adresse actuelle : ${lease.tenantAddress}` : null,
        ...(lease.coTenants ?? []).flatMap((c) => [
          "",
          "COLOCATAIRE",
          `Nom : ${fullName(c, "—")}`,
          c.email ? `E-mail : ${c.email}` : null,
        ]),
      ),
    ),
  );

  // ── Article 2 : bien ──
  out.push(
    section(
      "ARTICLE 2 — DÉSIGNATION DU BIEN",
      lines(
        "Le présent contrat porte sur le logement situé à l'adresse suivante :",
        address || "—",
        "",
        nature ? `Nature : ${nature}` : null,
        `Surface habitable : ${property.surface ?? "—"} m²`,
        `Nombre de pièces principales : ${property.rooms ?? "—"}`,
        `Logement ${furnishedTxt}`,
      ),
    ),
  );

  // ── Article 3 : durée ──
  if (shortStay) {
    // endDate = dernier jour d'occupation, inclus (contrat API) : +1 jour.
    const nights = lease.endDate ? daysBetween(lease.startDate, lease.endDate) + 1 : null;
    out.push(
      section(
        "ARTICLE 3 — DURÉE DU SÉJOUR",
        lines(
          `Séjour du ${day(lease.startDate)} au ${day(lease.endDate)}` +
            (nights ? ` (${nights} jour${nights > 1 ? "s" : ""}).` : "."),
          "",
          "Le séjour prend fin de plein droit à la date indiquée, sans qu'il soit",
          "nécessaire de délivrer un congé. Toute prolongation fait l'objet d'un",
          "nouvel accord écrit entre les parties.",
        ),
      ),
    );
  } else {
    out.push(
      section(
        "ARTICLE 3 — DURÉE DU BAIL",
        lines(
          `Le présent bail est conclu pour une ${lease.endDate ? "durée déterminée" : "durée indéterminée"}.`,
          `Date de prise d'effet : ${day(lease.startDate)}`,
          lease.endDate ? `Date de fin : ${day(lease.endDate)}` : null,
          "",
          `Préavis : ${lease.noticePeriod} mois.`,
        ),
      ),
    );
  }

  // ── Article 4 : conditions financières ──
  if (shortStay) {
    const total =
      typeof lease.stayTotal === "number" && lease.stayTotal > 0
        ? lease.stayTotal
        : lease.monthlyRent + (lease.charges ?? 0);
    out.push(
      section(
        "ARTICLE 4 — CONDITIONS FINANCIÈRES",
        lines(
          `Montant total du séjour : ${money(total, currency)}`,
          "Payable en une seule échéance, au plus tard à la date d'arrivée.",
          "",
          lease.deposit > 0
            ? `Caution : ${money(lease.deposit, currency)}, restituée à la fin du séjour,\ndéduction faite des éventuelles retenues justifiées.`
            : "Aucune caution n'est demandée.",
        ),
      ),
    );
  } else {
    const rentTotal = lease.monthlyRent + (lease.charges ?? 0);
    const payDay = lease.rentPaymentDay === 1 ? "1er" : String(lease.rentPaymentDay);
    const depositMonths =
      lease.monthlyRent > 0 && lease.deposit > 0
        ? Math.round((lease.deposit / lease.monthlyRent) * 10) / 10
        : null;
    out.push(
      section(
        "ARTICLE 4 — CONDITIONS FINANCIÈRES",
        lines(
          `Loyer mensuel hors charges : ${money(lease.monthlyRent, currency)}`,
          `Charges mensuelles : ${money(lease.charges, currency)}`,
          THIN,
          `Total mensuel : ${money(rentTotal, currency)}`,
          "",
          `Le loyer est payable le ${payDay} de chaque mois.`,
          "",
          `Dépôt de garantie : ${money(lease.deposit, currency)}`,
          depositMonths !== null
            ? `(soit ${String(depositMonths).replace(".", ",")} mois de loyer hors charges)`
            : null,
          isFrance
            ? "Le dépôt de garantie sera restitué dans un délai maximal de 2 mois suivant\nla remise des clés, déduction faite des éventuelles retenues justifiées."
            : "Le dépôt de garantie sera restitué après la remise des clés, déduction\nfaite des éventuelles retenues justifiées, dans les délais prévus par la loi.",
        ),
      ),
    );
  }

  // ── Articles 5 et 6 : obligations ──
  out.push(
    section(
      "ARTICLE 5 — OBLIGATIONS DU BAILLEUR",
      lines(
        "Le bailleur s'engage à :",
        "• Délivrer un logement décent et en bon état d'usage et de réparation.",
        "• Assurer au preneur la jouissance paisible du logement.",
        shortStay ? null : "• Entretenir les locaux en état de servir à l'usage prévu.",
        shortStay ? null : "• Effectuer toutes les réparations autres que locatives.",
      ),
    ),
  );
  out.push(
    section(
      "ARTICLE 6 — OBLIGATIONS DU LOCATAIRE",
      lines(
        "Le locataire s'engage à :",
        shortStay
          ? "• Régler le montant du séjour aux conditions convenues."
          : "• Payer le loyer et les charges aux termes convenus.",
        "• Utiliser paisiblement les locaux loués suivant la destination prévue.",
        "• Répondre des dégradations et pertes survenues pendant la durée du contrat.",
        shortStay
          ? "• Restituer le logement à la date de fin du séjour."
          : "• Prendre à sa charge l'entretien courant du logement et les réparations locatives.",
        shortStay ? null : "• Souscrire une assurance contre les risques locatifs.",
        "• Ne pas transformer les locaux et équipements sans accord écrit du bailleur.",
      ),
    ),
  );

  let n = 7;
  if (!shortStay) {
    // ── Révision ──
    out.push(
      section(
        `ARTICLE ${n++} — RÉVISION DU LOYER`,
        isFrance
          ? "Le loyer est révisable annuellement à la date anniversaire du bail,\nselon la variation de l'Indice de Référence des Loyers (IRL) publié\npar l'INSEE, conformément à l'article 17-1 de la loi du 6 juillet 1989."
          : "Le loyer peut être révisé à la date anniversaire du bail, dans les\nlimites prévues par la législation applicable. Toute révision fait\nl'objet d'un avenant signé par les parties.",
      ),
    );
    // ── Résiliation ──
    out.push(
      section(
        `ARTICLE ${n++} — RÉSILIATION`,
        lines(
          "Le preneur peut résilier le bail à tout moment, sous réserve de respecter",
          `un préavis de ${lease.noticePeriod} mois notifié par écrit au bailleur.`,
          "",
          isFrance
            ? `Le bailleur peut donner congé pour l'échéance du bail en respectant un\npréavis de ${lease.furnished ? "3 mois" : "6 mois"} et pour l'un des motifs prévus par la loi.`
            : "Le bailleur peut donner congé dans les conditions et délais prévus par\nla législation applicable.",
        ),
      ),
    );
  }

  if (lease.specialClauses && lease.specialClauses.trim()) {
    out.push(section(`ARTICLE ${n++} — CLAUSES PARTICULIÈRES`, lease.specialClauses));
  }

  // ── Signatures ──
  const sig = (label: string, name: string, at: string | null | undefined) =>
    at
      ? `${label} — ${name}\n  ✔ Signé électroniquement le ${dateTime(at)}`
      : `${label} — ${name}\n  En attente de signature électronique`;
  out.push(
    section(
      "SIGNATURES",
      lines(
        "Les parties signent le présent contrat par voie électronique depuis",
        "leur espace hwe ; la date et l'heure de chaque signature sont",
        "enregistrées ci-dessous.",
        "",
        sig("Le Bailleur", ownerName, lease.ownerSignedAt),
        "",
        sig("Le Locataire", tenantName, lease.tenantSignedAt),
        ...(lease.coTenants ?? []).flatMap((c) => ["", sig("Colocataire", fullName(c, "—"), c.signedAt)]),
      ),
    ),
  );

  out.push(
    lines(
      "─────────────────────────────────────────────────────────────────",
      "Document généré par hwe — plateforme de mise en relation immobilière.",
      "Modèle fourni à titre indicatif : il est recommandé de le faire valider",
      "par un professionnel du droit avant signature.",
      "─────────────────────────────────────────────────────────────────",
    ),
  );

  return out.join("\n\n");
}
