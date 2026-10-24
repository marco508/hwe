/**
 * Générateur UNIQUE du texte de contrat de bail (F7).
 *
 * Utilisé à l'identique par l'espace propriétaire (aperçu + téléchargement)
 * et par l'espace locataire (lecture avant signature) : les deux parties
 * lisent donc exactement le même texte.
 *
 * Textes : dictionnaires `lease-locales/<langue>.json` (fr = version qui fait
 * foi ; une traduction affiche en tête la note « Traduction fournie à titre
 * indicatif ; la version française fait foi. »).
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
import { intlLocaleOf, translate, type Dict, type Dicts, type Lang } from "./i18n";
import { countryName } from "./geo";
import fr from "./lease-locales/fr.json";
import en from "./lease-locales/en.json";
import es from "./lease-locales/es.json";
import pt from "./lease-locales/pt.json";
import ar from "./lease-locales/ar.json";

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
  /** Langue du texte (fr par défaut : version qui fait foi). */
  lang?: Lang;
}

const RULE = "═══════════════════════════════════════════════════════════════";
const THIN = "─────────────────────────────────────────────────────";

const LEASE_DICTS: Dicts = { fr: fr as Dict, en: en as Dict, es: es as Dict, pt: pt as Dict, ar: ar as Dict };

/** Devise effective d'un bail : celle du bail, sinon celle du bien, sinon EUR. */
export function leaseCurrency(
  lease: Pick<LeaseContract, "currency" | "property">,
  fallback?: string | null,
): string {
  const fromLease = lease.currency ?? undefined;
  const fromProperty = (lease.property as { currency?: string | null } | undefined)?.currency ?? undefined;
  return (fromLease || fromProperty || fallback || "EUR").toUpperCase();
}

function money(n: number | null | undefined, currency: string, locale: string): string {
  const v = typeof n === "number" && Number.isFinite(n) ? n : 0;
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(v);
  } catch {
    return `${new Intl.NumberFormat(locale).format(v)} ${currency}`;
  }
}

// Dates de bail = dates civiles : on formate en UTC pour éviter le décalage
// d'un jour selon le fuseau du lecteur.
function day(iso: string | null | undefined, locale: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function dateTime(iso: string | null | undefined, locale: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
  const lang: Lang = input.lang ?? "fr";
  const L = (key: string, params?: Record<string, string | number | null | undefined>) =>
    translate(LEASE_DICTS, lang, key, params);
  const loc = intlLocaleOf(lang);
  const M = (n: number | null | undefined, cur: string) => money(n, cur, loc);
  const D = (iso: string | null | undefined) => day(iso, loc);

  const property: LeaseContractPropertyInput = input.property ?? lease.property ?? {};
  const owner: LeaseContractPartyInput | null =
    input.owner ?? (lease.property?.owner as LeaseContractPartyInput | undefined) ?? null;

  const currency = leaseCurrency(lease, property.currency);
  const isFrance = (property.country ?? "").trim().toUpperCase() === "FR";
  const shortStay = Boolean(lease.shortStay);

  const ownerName = fullName(owner, L("owner.default"));
  const tenantName = fullName(
    { firstName: lease.tenantFirstName, lastName: lease.tenantLastName },
    L("tenant.default"),
  );
  const address = [
    property.addressLine,
    [property.postalCode, property.city].filter(Boolean).join(" "),
    property.country ? countryName(property.country, lang) : "",
  ]
    .filter((x) => x && String(x).trim())
    .join(", ");
  const nature = property.propertyType
    ? (() => {
        const k = `type.${String(property.propertyType)}`;
        const v = L(k);
        return v === k ? String(property.propertyType) : v;
      })()
    : null;
  const furnishedTxt = lease.furnished ? L("furnished.yes") : L("furnished.no");

  /** Mentions du mandataire (bien géré par une agence) et de l'auteur du bail. */
  const mandataryLines = (): (string | null)[] => {
    const m = lease.managedBy;
    const out: (string | null)[] = [];
    if (m) {
      const details = [
        m.registrationNumber ? L("mandatary.registration", { number: m.registrationNumber }) : null,
        m.email || null,
        m.phone || null,
      ].filter(Boolean);
      out.push(
        "",
        L("mandatary.title"),
        L("mandatary.managedBy", {
          name: m.name,
          details: details.length ? ` (${details.join(", ")})` : "",
          mandate: m.mandateReference ? L("mandatary.mandate", { reference: m.mandateReference }) : "",
        }),
      );
    }
    const p = lease.preparedBy;
    if (p) {
      const name = `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim();
      if (name) out.push(L("mandatary.preparedBy", { name, agency: p.agencyName ? ` (${p.agencyName})` : "" }));
    }
    return out;
  };

  const out: string[] = [];

  // ── Note de traduction ──
  if (lang !== "fr") out.push(L("note.translation"));

  // ── En-tête ──
  if (shortStay) {
    out.push(lines(L("short.title"), L("short.housing", { furnished: furnishedTxt }), "", L("short.intro")));
  } else {
    out.push(
      lines(
        L("long.title"),
        lease.furnished ? L("furnished.upper.yes") : L("furnished.upper.no"),
        "",
        isFrance ? L("long.lawFr") : L("long.lawOther"),
      ),
    );
  }

  // ── Article 1 : parties ──
  out.push(
    section(
      L("art1.title"),
      lines(
        L("art1.landlord"),
        L("field.name", { value: ownerName }),
        owner?.email ? L("field.email", { value: owner.email }) : null,
        owner?.phone ? L("field.phone", { value: owner.phone }) : null,
        ...mandataryLines(),
        "",
        L("art1.tenant"),
        L("field.name", { value: tenantName }),
        lease.tenantEmail ? L("field.email", { value: lease.tenantEmail }) : null,
        lease.tenantPhone ? L("field.phone", { value: lease.tenantPhone }) : null,
        lease.tenantAddress ? L("field.address", { value: lease.tenantAddress }) : null,
        ...(lease.coTenants ?? []).flatMap((c) => [
          "",
          L("art1.coTenant"),
          L("field.name", { value: fullName(c, "—") }),
          c.email ? L("field.email", { value: c.email }) : null,
        ]),
      ),
    ),
  );

  // ── Article 2 : bien ──
  out.push(
    section(
      L("art2.title"),
      lines(
        L("art2.intro"),
        address || "—",
        "",
        nature ? L("art2.nature", { value: nature }) : null,
        L("art2.surface", { value: property.surface ?? "—" }),
        L("art2.rooms", { value: property.rooms ?? "—" }),
        L("short.housing", { furnished: furnishedTxt }),
      ),
    ),
  );

  // ── Article 3 : durée ──
  if (shortStay) {
    // endDate = dernier jour d'occupation, inclus (contrat API) : +1 jour.
    const nights = lease.endDate ? daysBetween(lease.startDate, lease.endDate) + 1 : null;
    out.push(
      section(
        L("art3.shortTitle"),
        lines(
          L("art3.stay", { start: D(lease.startDate), end: D(lease.endDate) }) +
            (nights ? L("art3.nights", { count: nights }) : "."),
          "",
          L("art3.shortEnd"),
        ),
      ),
    );
  } else {
    out.push(
      section(
        L("art3.title"),
        lines(
          lease.endDate ? L("art3.fixed") : L("art3.open"),
          L("art3.start", { date: D(lease.startDate) }),
          lease.endDate ? L("art3.end", { date: D(lease.endDate) }) : null,
          "",
          L("art3.notice", { count: lease.noticePeriod }),
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
        L("art4.title"),
        lines(
          L("art4.stayTotal", { amount: M(total, currency) }),
          L("art4.stayPay"),
          "",
          lease.deposit > 0 ? L("art4.stayDeposit", { amount: M(lease.deposit, currency) }) : L("art4.noDeposit"),
        ),
      ),
    );
  } else {
    const rentTotal = lease.monthlyRent + (lease.charges ?? 0);
    const payDay = lease.rentPaymentDay === 1 ? L("art4.firstDay") : String(lease.rentPaymentDay);
    const depositMonths =
      lease.monthlyRent > 0 && lease.deposit > 0
        ? Math.round((lease.deposit / lease.monthlyRent) * 10) / 10
        : null;
    out.push(
      section(
        L("art4.title"),
        lines(
          L("art4.rent", { amount: M(lease.monthlyRent, currency) }),
          L("art4.charges", { amount: M(lease.charges, currency) }),
          THIN,
          L("art4.total", { amount: M(rentTotal, currency) }),
          "",
          L("art4.payDay", { day: payDay }),
          "",
          L("art4.deposit", { amount: M(lease.deposit, currency) }),
          depositMonths !== null
            ? L("art4.depositMonths", { months: new Intl.NumberFormat(loc, { maximumFractionDigits: 1 }).format(depositMonths), count: depositMonths })
            : null,
          isFrance ? L("art4.depositFr") : L("art4.depositOther"),
        ),
      ),
    );
  }

  // ── Articles 5 et 6 : obligations ──
  out.push(
    section(
      L("art5.title"),
      lines(
        L("art5.intro"),
        L("art5.decent"),
        L("art5.peace"),
        shortStay ? null : L("art5.maintain"),
        shortStay ? null : L("art5.repairs"),
      ),
    ),
  );
  out.push(
    section(
      L("art6.title"),
      lines(
        L("art6.intro"),
        shortStay ? L("art6.payStay") : L("art6.payRent"),
        L("art6.use"),
        L("art6.damage"),
        shortStay ? L("art6.returnStay") : L("art6.upkeep"),
        shortStay ? null : L("art6.insurance"),
        L("art6.noChange"),
      ),
    ),
  );

  let n = 7;
  if (!shortStay) {
    // ── Révision ──
    out.push(
      section(L("article.n", { n: n++, title: L("revision.title") }), isFrance ? L("revision.fr") : L("revision.other")),
    );
    // ── Résiliation ──
    out.push(
      section(
        L("article.n", { n: n++, title: L("termination.title") }),
        lines(
          L("termination.tenant", { count: lease.noticePeriod }),
          "",
          isFrance ? L("termination.ownerFr", { months: lease.furnished ? 3 : 6 }) : L("termination.ownerOther"),
        ),
      ),
    );
  }

  if (lease.specialClauses && lease.specialClauses.trim()) {
    out.push(section(L("article.n", { n: n++, title: L("clauses.title") }), lease.specialClauses));
  }

  // ── Signatures ──
  const sig = (label: string, name: string, at: string | null | undefined) =>
    at
      ? `${label} — ${name}\n  ${L("sign.signed", { date: dateTime(at, loc) })}`
      : `${label} — ${name}\n  ${L("sign.pending")}`;
  out.push(
    section(
      L("sign.title"),
      lines(
        L("sign.intro"),
        "",
        sig(L("sign.landlord"), ownerName, lease.ownerSignedAt) +
          (lease.ownerSignedAt && lease.ownerSignatureMention ? `\n  ${lease.ownerSignatureMention}` : ""),
        "",
        sig(L("sign.tenant"), tenantName, lease.tenantSignedAt),
        ...(lease.coTenants ?? []).flatMap((c) => ["", sig(L("sign.coTenant"), fullName(c, "—"), c.signedAt)]),
      ),
    ),
  );

  out.push(
    lines(
      "─────────────────────────────────────────────────────────────────",
      L("footer"),
      "─────────────────────────────────────────────────────────────────",
    ),
  );

  return out.join("\n\n");
}
