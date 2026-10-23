import { getUiLang, tUi } from "../components/I18nKit";

/**
 * Formatteurs partagés (remplacent les ~10 copies de fmtDate/fmtMoney/fmtEUR).
 * La locale suit la langue choisie (fr → fr-FR, en → en-GB).
 */

export function intlLocale(lang = getUiLang()): string {
  return lang === "en" ? "en-GB" : "fr-FR";
}

/**
 * Montant dans SA devise (jamais de conversion ici).
 * Devise inconnue d'Intl → « 1 234 XYZ ».
 */
export function fmtMoney(
  amount: number | null | undefined,
  currency: string | null | undefined = "EUR",
  locale = intlLocale(),
): string {
  const v = typeof amount === "number" && Number.isFinite(amount) ? amount : 0;
  const cur = (currency || "EUR").toUpperCase();
  try {
    return withVisibleSpaces(
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: cur,
        // 643,5 → « 643,50 » : deux décimales dès qu'il y a des centimes.
        minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
        maximumFractionDigits: Number.isInteger(v) ? 0 : 2,
      }).format(v),
    );
  } catch {
    return withVisibleSpaces(`${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(v)} ${cur}`);
  }
}

/**
 * Intl sépare les milliers en fr-FR par une espace fine insécable (U+202F),
 * absente de la police des titres (Fraunces) : « 385000 € ».
 * On la remplace par une espace insécable classique.
 */
function withVisibleSpaces(s: string): string {
  return s.replace(/ /g, " ");
}

type DateStyle = "short" | "medium" | "long";

const DATE_OPTS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { day: "2-digit", month: "2-digit", year: "numeric" },
  medium: { day: "numeric", month: "short", year: "numeric" },
  long: { day: "numeric", month: "long", year: "numeric" },
};

/**
 * Date civile (début de bail, échéance…) : formatée en UTC pour ne jamais
 * glisser d'un jour selon le fuseau. Passer `utc: false` pour un horodatage.
 */
export function fmtDate(
  iso: string | Date | null | undefined,
  style: DateStyle = "long",
  opts: { utc?: boolean; locale?: string } = {},
): string {
  if (!iso) return "—";
  const d = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(opts.locale ?? intlLocale(), {
    ...DATE_OPTS[style],
    ...(opts.utc === false ? {} : { timeZone: "UTC" }),
  });
}

/** Date + heure locales (messages, signatures, visites). */
export function fmtDateTime(iso: string | Date | null | undefined, locale = intlLocale()): string {
  if (!iso) return "—";
  const d = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** « à l'instant », « 5 min », « 3 h », « 2 j », puis date courte. */
export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return tUi("ui.time.now");
  if (min < 60) return tUi("ui.time.min", { n: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return tUi("ui.time.hours", { n: hr });
  const days = Math.floor(hr / 24);
  if (days < 7) return tUi("ui.time.days", { n: days });
  return new Date(iso).toLocaleDateString(intlLocale(), { day: "numeric", month: "short" });
}

/** Unité de prix → suffixe affiché (« / mois », « / jour »…). */
export function priceUnitSuffix(unit: string | null | undefined): string {
  switch (unit) {
    case "DAYS":
      return tUi("ui.perDay");
    case "WEEKS":
      return tUi("ui.perWeek");
    case "YEARS":
      return tUi("ui.perYear");
    default:
      return tUi("ui.perMonth");
  }
}

/** Taille de fichier lisible. */
export function fmtBytes(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
