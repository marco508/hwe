"use client";

import * as React from "react";
import {
  Button,
  Input,
  Label,
  Select,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  countryLabel,
} from "@hwe/ui";
import type {
  Property,
  PricingRate,
  LeaseDurationUnit,
  EnergyClass,
  RentalKind,
} from "@hwe/types";
import { ENERGY_CLASS_COLORS } from "@hwe/types";
import { t } from "../lib/i18n";
import { ImageUploader } from "./ImageUploader";

export type PropertyFormValue = Omit<
  Property,
  | "id"
  | "ownerId"
  | "owner"
  | "createdAt"
  | "updatedAt"
  | "media"
  | "pricingRates"
> & {
  mediaUrls: string[];
  pricingRates: Array<{ unit: LeaseDurationUnit; amount: string }>;
};

const empty: PropertyFormValue = {
  title: "",
  description: "",
  listingType: "SALE",
  propertyType: "APARTMENT",
  status: "PUBLISHED",
  price: 0,
  currency: "EUR",
  surface: 0,
  rooms: 1,
  bedrooms: 1,
  bathrooms: 1,
  floor: null,
  yearBuilt: null,
  furnished: false,
  hasParking: false,
  hasBalcony: false,
  hasGarden: false,
  hasElevator: false,
  // Sale
  coOwnershipFees: null,
  propertyTax: null,
  energyClass: null,
  notaryFeesRate: null,
  isNew: false,
  // Rent
  rentalKind: null,
  chargesIncluded: null,
  chargesAmount: null,
  deposit: null,
  noticeMonths: null,
  petsAllowed: null,
  // Localisation
  addressLine: "",
  city: "",
  postalCode: "",
  country: "FR",
  latitude: null,
  longitude: null,
  mediaUrls: [],
  pricingRates: [],
};

// ── Pays + devises ──────────────────────────────────────────────────────────
const COUNTRIES: { code: string; name: string; currency: string }[] = [
  { code: "AF", name: "Afghanistan", currency: "AFN" },
  { code: "ZA", name: "Afrique du Sud", currency: "ZAR" },
  { code: "AL", name: "Albanie", currency: "ALL" },
  { code: "DZ", name: "Algérie", currency: "DZD" },
  { code: "DE", name: "Allemagne", currency: "EUR" },
  { code: "AD", name: "Andorre", currency: "EUR" },
  { code: "AO", name: "Angola", currency: "AOA" },
  { code: "AG", name: "Antigua-et-Barbuda", currency: "XCD" },
  { code: "SA", name: "Arabie saoudite", currency: "SAR" },
  { code: "AR", name: "Argentine", currency: "ARS" },
  { code: "AM", name: "Arménie", currency: "AMD" },
  { code: "AU", name: "Australie", currency: "AUD" },
  { code: "AT", name: "Autriche", currency: "EUR" },
  { code: "AZ", name: "Azerbaïdjan", currency: "AZN" },
  { code: "BS", name: "Bahamas", currency: "BSD" },
  { code: "BH", name: "Bahreïn", currency: "BHD" },
  { code: "BD", name: "Bangladesh", currency: "BDT" },
  { code: "BB", name: "Barbade", currency: "BBD" },
  { code: "BE", name: "Belgique", currency: "EUR" },
  { code: "BZ", name: "Belize", currency: "BZD" },
  { code: "BJ", name: "Bénin", currency: "XOF" },
  { code: "BT", name: "Bhoutan", currency: "BTN" },
  { code: "BY", name: "Biélorussie", currency: "BYN" },
  { code: "BO", name: "Bolivie", currency: "BOB" },
  { code: "BA", name: "Bosnie-Herzégovine", currency: "BAM" },
  { code: "BW", name: "Botswana", currency: "BWP" },
  { code: "BR", name: "Brésil", currency: "BRL" },
  { code: "BN", name: "Brunéi", currency: "BND" },
  { code: "BG", name: "Bulgarie", currency: "BGN" },
  { code: "BF", name: "Burkina Faso", currency: "XOF" },
  { code: "BI", name: "Burundi", currency: "BIF" },
  { code: "CV", name: "Cabo Verde", currency: "CVE" },
  { code: "KH", name: "Cambodge", currency: "KHR" },
  { code: "CM", name: "Cameroun", currency: "XAF" },
  { code: "CA", name: "Canada", currency: "CAD" },
  { code: "CF", name: "Centrafrique", currency: "XAF" },
  { code: "CL", name: "Chili", currency: "CLP" },
  { code: "CN", name: "Chine", currency: "CNY" },
  { code: "CY", name: "Chypre", currency: "EUR" },
  { code: "CO", name: "Colombie", currency: "COP" },
  { code: "KM", name: "Comores", currency: "KMF" },
  { code: "CG", name: "Congo", currency: "XAF" },
  { code: "CD", name: "Congo (RDC)", currency: "CDF" },
  { code: "KR", name: "Corée du Sud", currency: "KRW" },
  { code: "CR", name: "Costa Rica", currency: "CRC" },
  { code: "CI", name: "Côte d'Ivoire", currency: "XOF" },
  { code: "HR", name: "Croatie", currency: "EUR" },
  { code: "CU", name: "Cuba", currency: "CUP" },
  { code: "DK", name: "Danemark", currency: "DKK" },
  { code: "DJ", name: "Djibouti", currency: "DJF" },
  { code: "DM", name: "Dominique", currency: "XCD" },
  { code: "EG", name: "Égypte", currency: "EGP" },
  { code: "AE", name: "Émirats arabes unis", currency: "AED" },
  { code: "EC", name: "Équateur", currency: "USD" },
  { code: "ER", name: "Érythrée", currency: "ERN" },
  { code: "ES", name: "Espagne", currency: "EUR" },
  { code: "EE", name: "Estonie", currency: "EUR" },
  { code: "SZ", name: "Eswatini", currency: "SZL" },
  { code: "ET", name: "Éthiopie", currency: "ETB" },
  { code: "FJ", name: "Fidji", currency: "FJD" },
  { code: "FI", name: "Finlande", currency: "EUR" },
  { code: "FR", name: "France", currency: "EUR" },
  { code: "GA", name: "Gabon", currency: "XAF" },
  { code: "GM", name: "Gambie", currency: "GMD" },
  { code: "GE", name: "Géorgie", currency: "GEL" },
  { code: "GH", name: "Ghana", currency: "GHS" },
  { code: "GR", name: "Grèce", currency: "EUR" },
  { code: "GD", name: "Grenade", currency: "XCD" },
  { code: "GT", name: "Guatemala", currency: "GTQ" },
  { code: "GN", name: "Guinée", currency: "GNF" },
  { code: "GW", name: "Guinée-Bissau", currency: "XOF" },
  { code: "GQ", name: "Guinée équatoriale", currency: "XAF" },
  { code: "GY", name: "Guyana", currency: "GYD" },
  { code: "HT", name: "Haïti", currency: "HTG" },
  { code: "HN", name: "Honduras", currency: "HNL" },
  { code: "HU", name: "Hongrie", currency: "HUF" },
  { code: "IN", name: "Inde", currency: "INR" },
  { code: "ID", name: "Indonésie", currency: "IDR" },
  { code: "IQ", name: "Irak", currency: "IQD" },
  { code: "IR", name: "Iran", currency: "IRR" },
  { code: "IE", name: "Irlande", currency: "EUR" },
  { code: "IS", name: "Islande", currency: "ISK" },
  { code: "IL", name: "Israël", currency: "ILS" },
  { code: "IT", name: "Italie", currency: "EUR" },
  { code: "JM", name: "Jamaïque", currency: "JMD" },
  { code: "JP", name: "Japon", currency: "JPY" },
  { code: "JO", name: "Jordanie", currency: "JOD" },
  { code: "KZ", name: "Kazakhstan", currency: "KZT" },
  { code: "KE", name: "Kenya", currency: "KES" },
  { code: "KG", name: "Kirghizistan", currency: "KGS" },
  { code: "KI", name: "Kiribati", currency: "AUD" },
  { code: "KW", name: "Koweït", currency: "KWD" },
  { code: "LA", name: "Laos", currency: "LAK" },
  { code: "LS", name: "Lesotho", currency: "LSL" },
  { code: "LV", name: "Lettonie", currency: "EUR" },
  { code: "LB", name: "Liban", currency: "LBP" },
  { code: "LR", name: "Libéria", currency: "LRD" },
  { code: "LY", name: "Libye", currency: "LYD" },
  { code: "LI", name: "Liechtenstein", currency: "CHF" },
  { code: "LT", name: "Lituanie", currency: "EUR" },
  { code: "LU", name: "Luxembourg", currency: "EUR" },
  { code: "MK", name: "Macédoine du Nord", currency: "MKD" },
  { code: "MG", name: "Madagascar", currency: "MGA" },
  { code: "MY", name: "Malaisie", currency: "MYR" },
  { code: "MW", name: "Malawi", currency: "MWK" },
  { code: "MV", name: "Maldives", currency: "MVR" },
  { code: "ML", name: "Mali", currency: "XOF" },
  { code: "MT", name: "Malte", currency: "EUR" },
  { code: "MA", name: "Maroc", currency: "MAD" },
  { code: "MH", name: "Marshall", currency: "USD" },
  { code: "MU", name: "Maurice", currency: "MUR" },
  { code: "MR", name: "Mauritanie", currency: "MRU" },
  { code: "MX", name: "Mexique", currency: "MXN" },
  { code: "FM", name: "Micronésie", currency: "USD" },
  { code: "MD", name: "Moldavie", currency: "MDL" },
  { code: "MC", name: "Monaco", currency: "EUR" },
  { code: "MN", name: "Mongolie", currency: "MNT" },
  { code: "ME", name: "Monténégro", currency: "EUR" },
  { code: "MZ", name: "Mozambique", currency: "MZN" },
  { code: "MM", name: "Myanmar", currency: "MMK" },
  { code: "NA", name: "Namibie", currency: "NAD" },
  { code: "NR", name: "Nauru", currency: "AUD" },
  { code: "NP", name: "Népal", currency: "NPR" },
  { code: "NI", name: "Nicaragua", currency: "NIO" },
  { code: "NE", name: "Niger", currency: "XOF" },
  { code: "NG", name: "Nigéria", currency: "NGN" },
  { code: "NO", name: "Norvège", currency: "NOK" },
  { code: "NZ", name: "Nouvelle-Zélande", currency: "NZD" },
  { code: "OM", name: "Oman", currency: "OMR" },
  { code: "UG", name: "Ouganda", currency: "UGX" },
  { code: "UZ", name: "Ouzbékistan", currency: "UZS" },
  { code: "PK", name: "Pakistan", currency: "PKR" },
  { code: "PW", name: "Palaos", currency: "USD" },
  { code: "PA", name: "Panama", currency: "PAB" },
  { code: "PG", name: "Papouasie-Nouvelle-Guinée", currency: "PGK" },
  { code: "PY", name: "Paraguay", currency: "PYG" },
  { code: "NL", name: "Pays-Bas", currency: "EUR" },
  { code: "PE", name: "Pérou", currency: "PEN" },
  { code: "PH", name: "Philippines", currency: "PHP" },
  { code: "PL", name: "Pologne", currency: "PLN" },
  { code: "PT", name: "Portugal", currency: "EUR" },
  { code: "QA", name: "Qatar", currency: "QAR" },
  { code: "DO", name: "République dominicaine", currency: "DOP" },
  { code: "CZ", name: "République tchèque", currency: "CZK" },
  { code: "RO", name: "Roumanie", currency: "RON" },
  { code: "GB", name: "Royaume-Uni", currency: "GBP" },
  { code: "RU", name: "Russie", currency: "RUB" },
  { code: "RW", name: "Rwanda", currency: "RWF" },
  { code: "KN", name: "Saint-Kitts-et-Nevis", currency: "XCD" },
  { code: "LC", name: "Sainte-Lucie", currency: "XCD" },
  { code: "VC", name: "Saint-Vincent-et-les-Grenadines", currency: "XCD" },
  { code: "SB", name: "Salomon", currency: "SBD" },
  { code: "WS", name: "Samoa", currency: "WST" },
  { code: "SM", name: "Saint-Marin", currency: "EUR" },
  { code: "ST", name: "Sao Tomé-et-Principe", currency: "STN" },
  { code: "SN", name: "Sénégal", currency: "XOF" },
  { code: "RS", name: "Serbie", currency: "RSD" },
  { code: "SC", name: "Seychelles", currency: "SCR" },
  { code: "SL", name: "Sierra Leone", currency: "SLL" },
  { code: "SG", name: "Singapour", currency: "SGD" },
  { code: "SK", name: "Slovaquie", currency: "EUR" },
  { code: "SI", name: "Slovénie", currency: "EUR" },
  { code: "SO", name: "Somalie", currency: "SOS" },
  { code: "SD", name: "Soudan", currency: "SDG" },
  { code: "SS", name: "Soudan du Sud", currency: "SSP" },
  { code: "LK", name: "Sri Lanka", currency: "LKR" },
  { code: "SE", name: "Suède", currency: "SEK" },
  { code: "CH", name: "Suisse", currency: "CHF" },
  { code: "SR", name: "Suriname", currency: "SRD" },
  { code: "SY", name: "Syrie", currency: "SYP" },
  { code: "TJ", name: "Tadjikistan", currency: "TJS" },
  { code: "TZ", name: "Tanzanie", currency: "TZS" },
  { code: "TD", name: "Tchad", currency: "XAF" },
  { code: "TH", name: "Thaïlande", currency: "THB" },
  { code: "TL", name: "Timor oriental", currency: "USD" },
  { code: "TG", name: "Togo", currency: "XOF" },
  { code: "TO", name: "Tonga", currency: "TOP" },
  { code: "TT", name: "Trinité-et-Tobago", currency: "TTD" },
  { code: "TN", name: "Tunisie", currency: "TND" },
  { code: "TM", name: "Turkménistan", currency: "TMT" },
  { code: "TR", name: "Turquie", currency: "TRY" },
  { code: "TV", name: "Tuvalu", currency: "AUD" },
  { code: "UA", name: "Ukraine", currency: "UAH" },
  { code: "UY", name: "Uruguay", currency: "UYU" },
  { code: "VU", name: "Vanuatu", currency: "VUV" },
  { code: "VE", name: "Venezuela", currency: "VES" },
  { code: "VN", name: "Viêt Nam", currency: "VND" },
  { code: "YE", name: "Yémen", currency: "YER" },
  { code: "ZM", name: "Zambie", currency: "ZMW" },
  { code: "ZW", name: "Zimbabwe", currency: "ZWL" },
  { code: "US", name: "États-Unis", currency: "USD" },
];

const COUNTRY_TO_CURRENCY: Record<string, string> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c.currency]),
);

function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find((c) => c.code === value);
  const filtered = query.trim()
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          countryLabel(c.code, c.name).toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase()),
      )
    : COUNTRIES;

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setQuery("");
        }}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-border bg-surface px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <span>{selected ? countryLabel(selected.code, selected.name) : t("pf.country.select")}</span>
        <span className="text-ink-muted ml-2">▾</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-white shadow-lg">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              placeholder={t("pf.country.search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">{t("pf.country.noResult")}</li>
            ) : (
              filtered.map((c) => (
                <li
                  key={c.code}
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`cursor-pointer px-3 py-2 text-sm hover:bg-brand-50 hover:text-brand-700 ${
                    c.code === value
                      ? "bg-brand-50 font-medium text-brand-700"
                      : "text-ink"
                  }`}
                >
                  {countryLabel(c.code, c.name)}
                  <span className="ml-1 text-xs text-ink-muted">{c.currency}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Form principal ──────────────────────────────────────────────────────────
export function PropertyForm({
  initial,
  onSubmit,
  submitting,
  submitLabel,
}: {
  initial?: Partial<PropertyFormValue>;
  onSubmit: (value: PropertyFormValue) => void;
  submitting?: boolean;
  submitLabel?: string;
}) {
  const [v, setV] = React.useState<PropertyFormValue>({ ...empty, ...initial });

  const set = <K extends keyof PropertyFormValue>(
    k: K,
    val: PropertyFormValue[K],
  ) => setV((s) => ({ ...s, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(v);
  };

  const isSale = v.listingType === "SALE";

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* ── Choix Vente / Location en gros ─────────────────────────────── */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("pf.listingType.title")}</h2>
          <p className="text-sm text-ink-muted mt-1">
            {t("pf.listingType.sub")}
          </p>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ListingTypeChoice
              active={v.listingType === "SALE"}
              onClick={() =>
                setV((s) => ({
                  ...s,
                  listingType: "SALE",
                  // Reset des champs location lors du switch
                  rentalKind: null,
                  chargesIncluded: null,
                  chargesAmount: null,
                  deposit: null,
                  noticeMonths: null,
                  petsAllowed: null,
                  pricingRates: [],
                }))
              }
              title={t("pf.sale")}
              icon="🏷️"
              desc={t("pf.sale.desc")}
              tone="accent"
            />
            <ListingTypeChoice
              active={v.listingType === "RENT"}
              onClick={() =>
                setV((s) => ({
                  ...s,
                  listingType: "RENT",
                  // Reset des champs vente
                  coOwnershipFees: null,
                  propertyTax: null,
                  energyClass: null,
                  notaryFeesRate: null,
                  isNew: false,
                }))
              }
              title={t("pf.rent")}
              icon="🔑"
              desc={t("pf.rent.desc")}
              tone="brand"
            />
          </div>
        </CardBody>
      </Card>

      {/* ── Description ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("pf.desc.title")}</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">{t("pf.title")}</Label>
            <Input
              id="title"
              value={v.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder={
                isSale ? t("pf.title.phSale") : t("pf.title.phRent")
              }
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">{t("pf.description")}</Label>
            <Textarea
              id="description"
              value={v.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={
                isSale
                  ? t("pf.description.phSale")
                  : t("pf.description.phRent")
              }
              required
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.propertyType")}</Label>
            <Select
              value={v.propertyType}
              onChange={(e) => set("propertyType", e.target.value as any)}
            >
              <option value="APARTMENT">{t("pf.type.APARTMENT")}</option>
              <option value="HOUSE">{t("pf.type.HOUSE")}</option>
              <option value="STUDIO">{t("pf.type.STUDIO")}</option>
              <option value="LAND">{t("pf.type.LAND")}</option>
              <option value="COMMERCIAL">{t("pf.type.COMMERCIAL")}</option>
              <option value="OTHER">{t("pf.type.OTHER")}</option>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* ── Caractéristiques ──────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("pf.features")}</h2>
        </CardHeader>
        <CardBody className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label>{t("pf.surface")}</Label>
            <Input
              type="number"
              min={0}
              value={v.surface}
              onChange={(e) => set("surface", Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.rooms")}</Label>
            <Input
              type="number"
              min={0}
              value={v.rooms}
              onChange={(e) => set("rooms", Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.bedrooms")}</Label>
            <Input
              type="number"
              min={0}
              value={v.bedrooms}
              onChange={(e) => set("bedrooms", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.bathrooms")}</Label>
            <Input
              type="number"
              min={0}
              value={v.bathrooms}
              onChange={(e) => set("bathrooms", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.floor")}</Label>
            <Input
              type="number"
              value={v.floor ?? ""}
              onChange={(e) =>
                set("floor", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.yearBuilt")}</Label>
            <Input
              type="number"
              value={v.yearBuilt ?? ""}
              onChange={(e) =>
                set(
                  "yearBuilt",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
            />
          </div>
          <div className="col-span-2 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {(
              [
                ["furnished", t("pf.furnished")],
                ["hasParking", t("pf.parking")],
                ["hasBalcony", t("pf.balcony")],
                ["hasGarden", t("pf.garden")],
                ["hasElevator", t("pf.elevator")],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={v[key] as boolean}
                  onChange={(e) => set(key, e.target.checked as any)}
                />
                {label}
              </label>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* ── Localisation ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("pf.location")}</h2>
        </CardHeader>
        <CardBody className="grid grid-cols-2 gap-3">
          <div className="space-y-1 col-span-2">
            <Label>{t("pf.address")}</Label>
            <Input
              value={v.addressLine}
              onChange={(e) => set("addressLine", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.postalCode")}</Label>
            <Input
              value={v.postalCode}
              onChange={(e) => set("postalCode", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.city")}</Label>
            <Input
              value={v.city}
              onChange={(e) => set("city", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <Label>{t("pf.country")}</Label>
            <CountrySelect
              value={v.country}
              onChange={(code) => {
                const currency = COUNTRY_TO_CURRENCY[code] ?? "EUR";
                setV((s) => ({ ...s, country: code, currency }));
              }}
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.currency")}</Label>
            <div className="flex h-10 items-center rounded-lg border border-border bg-surface/60 px-3 text-sm text-ink-muted select-none">
              {v.currency || "—"}
            </div>
          </div>
          <div className="space-y-1">
            <Label>{t("pf.latitude")}</Label>
            <Input
              type="number"
              step="any"
              value={v.latitude ?? ""}
              onChange={(e) =>
                set(
                  "latitude",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
            />
          </div>
          <div className="space-y-1">
            <Label>{t("pf.longitude")}</Label>
            <Input
              type="number"
              step="any"
              value={v.longitude ?? ""}
              onChange={(e) =>
                set(
                  "longitude",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
            />
          </div>
        </CardBody>
      </Card>

      {/* ── Prix principal ───────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">
            {isSale ? t("pf.price.saleTitle") : t("pf.price.rentTitle")}
          </h2>
          <p className="text-sm text-ink-muted mt-1">
            {isSale ? t("pf.price.saleSub") : t("pf.price.rentSub")}
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex items-end gap-3">
            <div className="space-y-1 flex-1">
              <Label htmlFor="price">
                {isSale ? t("pf.price.sale") : t("pf.price.rent")}
              </Label>
              <Input
                id="price"
                type="number"
                min={0}
                step="0.01"
                value={v.price || ""}
                onChange={(e) => set("price", Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-1 w-32">
              <Label>{t("pf.currency")}</Label>
              <div className="flex h-10 items-center justify-center rounded-lg border border-border bg-cream-100/50 px-3 text-sm font-medium text-ink-muted">
                {v.currency || "—"}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* SECTIONS SPÉCIFIQUES — VENTE                                       */}
      {/* ────────────────────────────────────────────────────────────────── */}
      {isSale && (
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg flex items-center gap-2">
              <span aria-hidden="true">🏷️</span> {t("pf.saleInfo.title")}
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              {t("pf.saleInfo.sub")}
            </p>
          </CardHeader>
          <CardBody className="space-y-5">
            {/* DPE */}
            <div>
              <Label>{t("pf.dpe")}</Label>
              <p className="text-xs text-ink-muted mb-2">
                {t("pf.dpe.help")}
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  ["A", "B", "C", "D", "E", "F", "G"] as EnergyClass[]
                ).map((c) => {
                  const active = v.energyClass === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() =>
                        set("energyClass", active ? null : c)
                      }
                      className={`h-10 w-10 rounded-lg font-semibold text-white transition-transform ${
                        active
                          ? "ring-2 ring-offset-2 ring-ink scale-110"
                          : "opacity-70 hover:opacity-100 hover:scale-105"
                      }`}
                      style={{ backgroundColor: ENERGY_CLASS_COLORS[c] }}
                      aria-label={t("pf.dpe.classAria", { c })}
                    >
                      {c}
                    </button>
                  );
                })}
                {v.energyClass && (
                  <button
                    type="button"
                    onClick={() => set("energyClass", null)}
                    className="h-10 px-3 rounded-lg text-xs text-ink-muted hover:text-ink"
                  >
                    {t("pf.dpe.clear")}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>{t("pf.coOwnershipFees")}</Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={v.coOwnershipFees ?? ""}
                  onChange={(e) =>
                    set(
                      "coOwnershipFees",
                      e.target.value === "" ? null : Number(e.target.value),
                    )
                  }
                  placeholder={t("pf.ph", { v: 180 })}
                />
              </div>
              <div className="space-y-1">
                <Label>{t("pf.propertyTax")}</Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={v.propertyTax ?? ""}
                  onChange={(e) =>
                    set(
                      "propertyTax",
                      e.target.value === "" ? null : Number(e.target.value),
                    )
                  }
                  placeholder={t("pf.ph", { v: 1200 })}
                />
              </div>
              <div className="space-y-1">
                <Label>{t("pf.notaryFees")}</Label>
                <Input
                  type="number"
                  min={0}
                  max={20}
                  step="0.1"
                  value={v.notaryFeesRate ?? ""}
                  onChange={(e) =>
                    set(
                      "notaryFeesRate",
                      e.target.value === "" ? null : Number(e.target.value),
                    )
                  }
                  placeholder={t("pf.ph", { v: 7.5 })}
                />
                <p className="text-[11px] text-ink-subtle">
                  {t("pf.notaryFees.help")}
                </p>
              </div>
              <div className="space-y-1">
                <Label>{t("pf.isNew")}</Label>
                <label className="flex items-center gap-2 h-10 px-3 rounded-lg border border-border cursor-pointer hover:border-ink/30">
                  <input
                    type="checkbox"
                    checked={!!v.isNew}
                    onChange={(e) => set("isNew", e.target.checked)}
                    className="accent-brand-600"
                  />
                  <span className="text-sm">{t("pf.isNew.check")}</span>
                </label>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* SECTIONS SPÉCIFIQUES — LOCATION                                    */}
      {/* ────────────────────────────────────────────────────────────────── */}
      {!isSale && (
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg flex items-center gap-2">
              <span aria-hidden="true">🔑</span> {t("pf.rentInfo.title")}
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              {t("pf.rentInfo.sub")}
            </p>
          </CardHeader>
          <CardBody className="space-y-5">
            {/* Type de bail */}
            <div>
              <Label>{t("pf.rentalKind")}</Label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  ["BARE", "FURNISHED", "SEASONAL", "STUDENT"] as RentalKind[]
                ).map((k) => {
                  const active = v.rentalKind === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() =>
                        set("rentalKind", active ? null : k)
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                        active
                          ? "bg-brand-50 dark:bg-brand-900/30 border-brand-500 text-ink ring-2 ring-brand-500/30"
                          : "bg-surface border-border text-ink-muted hover:border-ink/30 hover:text-ink"
                      }`}
                    >
                      {t("pf.rentalKind." + k)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Charges */}
            <div>
              <Label>{t("pf.charges")}</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => set("chargesIncluded", true)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    v.chargesIncluded === true
                      ? "bg-brand-50 dark:bg-brand-900/30 border-brand-500 text-ink ring-2 ring-brand-500/30"
                      : "bg-surface border-border text-ink-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {t("pf.charges.included")}
                </button>
                <button
                  type="button"
                  onClick={() => set("chargesIncluded", false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    v.chargesIncluded === false
                      ? "bg-brand-50 dark:bg-brand-900/30 border-brand-500 text-ink ring-2 ring-brand-500/30"
                      : "bg-surface border-border text-ink-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {t("pf.charges.extra")}
                </button>
              </div>
              {v.chargesIncluded === false && (
                <div className="mt-3 space-y-1">
                  <Label>{t("pf.charges.amount")}</Label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={v.chargesAmount ?? ""}
                    onChange={(e) =>
                      set(
                        "chargesAmount",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    placeholder={t("pf.ph", { v: 80 })}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>{t("pf.deposit")}</Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={v.deposit ?? ""}
                  onChange={(e) =>
                    set(
                      "deposit",
                      e.target.value === "" ? null : Number(e.target.value),
                    )
                  }
                  placeholder={
                    v.price
                      ? t("pf.deposit.phWithPrice", {
                          amount: Math.round(Number(v.price)),
                        })
                      : t("pf.deposit.ph")
                  }
                />
                <p className="text-[11px] text-ink-subtle">
                  {t("pf.deposit.help")}
                </p>
              </div>
              <div className="space-y-1">
                <Label>{t("pf.notice")}</Label>
                <Input
                  type="number"
                  min={0}
                  max={12}
                  value={v.noticeMonths ?? ""}
                  onChange={(e) =>
                    set(
                      "noticeMonths",
                      e.target.value === "" ? null : Number(e.target.value),
                    )
                  }
                  placeholder={t("pf.ph", { v: 1 })}
                />
                <p className="text-[11px] text-ink-subtle">
                  {t("pf.notice.help")}
                </p>
              </div>
            </div>

            <div>
              <Label>{t("pf.pets")}</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => set("petsAllowed", true)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    v.petsAllowed === true
                      ? "bg-brand-50 dark:bg-brand-900/30 border-brand-500 text-ink ring-2 ring-brand-500/30"
                      : "bg-surface border-border text-ink-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {t("pf.pets.yes")}
                </button>
                <button
                  type="button"
                  onClick={() => set("petsAllowed", false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    v.petsAllowed === false
                      ? "bg-brand-50 dark:bg-brand-900/30 border-brand-500 text-ink ring-2 ring-brand-500/30"
                      : "bg-surface border-border text-ink-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {t("pf.pets.no")}
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* ── Grille tarifaire (location uniquement) ──────────────────────── */}
      {!isSale && (
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">{t("pf.rates.title")}</h2>
            <p className="text-sm text-ink-muted mt-1">
              {t("pf.rates.sub")}
            </p>
          </CardHeader>
          <CardBody className="space-y-2">
            {(["DAYS", "WEEKS", "MONTHS", "YEARS"] as LeaseDurationUnit[]).map(
              (unit) => {
                const UNIT_SINGULAR: Record<LeaseDurationUnit, string> = {
                  DAYS: t("pf.unit.DAYS"),
                  WEEKS: t("pf.unit.WEEKS"),
                  MONTHS: t("pf.unit.MONTHS"),
                  YEARS: t("pf.unit.YEARS"),
                };
                const row = v.pricingRates.find((r) => r.unit === unit);
                const checked = !!row;
                const displayVal = row?.amount ?? "";
                return (
                  <div
                    key={unit}
                    className={`rounded-xl border px-4 py-3 transition-colors ${
                      checked
                        ? "border-brand-300 bg-white"
                        : "border-border bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <input
                        type="checkbox"
                        id={`rate-${unit}`}
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            set("pricingRates", [
                              ...v.pricingRates,
                              { unit, amount: "" },
                            ]);
                          } else {
                            set(
                              "pricingRates",
                              v.pricingRates.filter((r) => r.unit !== unit),
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-border accent-brand-600 shrink-0"
                      />
                      <label
                        htmlFor={`rate-${unit}`}
                        className="text-sm font-medium w-20 cursor-pointer"
                      >
                        {t("pf.rates.per", { unit: UNIT_SINGULAR[unit] })}
                      </label>
                      {checked && (
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Input
                            type="number"
                            min={0}
                            step="0.01"
                            placeholder={t("pf.ph", { v: 100 })}
                            value={displayVal}
                            onChange={(e) =>
                              set(
                                "pricingRates",
                                v.pricingRates.map((r) =>
                                  r.unit === unit
                                    ? { ...r, amount: e.target.value }
                                    : r,
                                ),
                              )
                            }
                            className="w-32"
                          />
                          <span className="text-sm text-ink-muted shrink-0">
                            {v.currency || "—"} / {UNIT_SINGULAR[unit]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("pf.photos.title")}</h2>
          <p className="text-sm text-ink-muted mt-1">
            {t("pf.photos.sub")}
          </p>
        </CardHeader>
        <CardBody>
          <ImageUploader
            value={v.mediaUrls}
            onChange={(urls) => set("mediaUrls", urls)}
            maxImages={10}
          />
        </CardBody>
      </Card>

      {/* ── Statut de publication ─────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("pf.publish.title")}</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(
              [
                {
                  val: "DRAFT",
                  title: t("pf.status.draft"),
                  desc: t("pf.status.draftDesc"),
                  icon: "📝",
                },
                {
                  val: "PUBLISHED",
                  title: t("pf.status.published"),
                  desc: t("pf.status.publishedDesc"),
                  icon: "🌍",
                },
              ] as const
            ).map((opt) => {
              const active = v.status === opt.val;
              return (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => set("status", opt.val as any)}
                  className={`text-left rounded-xl border px-4 py-3 transition-all ${
                    active
                      ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/20 ring-2 ring-brand-500/30"
                      : "border-border bg-surface hover:border-ink/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {opt.icon}
                    </span>
                    <div>
                      <div className="font-medium text-ink">{opt.title}</div>
                      <div className="text-xs text-ink-muted mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <Button
          type="submit"
          disabled={submitting}
          size="lg"
          variant="gradient"
        >
          {submitting
            ? t("pf.submit.saving")
            : submitLabel ??
              (v.status === "PUBLISHED"
                ? t("pf.submit.publish")
                : t("pf.submit.draft"))}
        </Button>
      </div>
    </form>
  );
}

// ── Sous-composant : choix vente/location ───────────────────────────────────
function ListingTypeChoice({
  active,
  onClick,
  title,
  icon,
  desc,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  icon: string;
  desc: string;
  tone: "brand" | "accent";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-xl border p-4 transition-all ${
        active
          ? tone === "accent"
            ? "border-accent-500 bg-accent-50/40 ring-2 ring-accent-500/30"
            : "border-brand-500 bg-brand-50/40 ring-2 ring-brand-500/30"
          : "border-border bg-surface hover:border-ink/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl shrink-0" aria-hidden="true">
          {icon}
        </span>
        <div>
          <div className="font-display text-xl text-ink">{title}</div>
          <div className="text-xs text-ink-muted mt-1">{desc}</div>
        </div>
        {active && (
          <span
            className={`absolute top-3 right-3 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs ${
              tone === "accent" ? "bg-accent-500" : "bg-brand-500"
            }`}
            aria-hidden="true"
          >
            ✓
          </span>
        )}
      </div>
    </button>
  );
}
