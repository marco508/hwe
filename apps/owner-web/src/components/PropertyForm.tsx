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
} from "@hwe/ui";
import type { Property, PricingRate, LeaseDurationUnit } from "@hwe/types";
import { LEASE_DURATION_UNIT_LABELS } from "@hwe/types";
import { ImageUploader } from "./ImageUploader";

export type PropertyFormValue = Omit<
  Property,
  "id" | "ownerId" | "owner" | "createdAt" | "updatedAt" | "media" | "pricingRates"
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
  COUNTRIES.map((c) => [c.code, c.currency])
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
    ? COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.toLowerCase().includes(query.toLowerCase())
      )
    : COUNTRIES;

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setQuery(""); }}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-border bg-surface px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <span>{selected ? selected.name : "Sélectionner un pays…"}</span>
        <span className="text-ink-muted ml-2">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-white shadow-lg">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              placeholder="Rechercher un pays…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">Aucun résultat</li>
            ) : (
              filtered.map((c) => (
                <li
                  key={c.code}
                  onClick={() => { onChange(c.code); setOpen(false); setQuery(""); }}
                  className={`cursor-pointer px-3 py-2 text-sm hover:bg-brand-50 hover:text-brand-700 ${
                    c.code === value ? "bg-brand-50 font-medium text-brand-700" : "text-ink"
                  }`}
                >
                  {c.name}
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

  const set = <K extends keyof PropertyFormValue>(k: K, val: PropertyFormValue[K]) =>
    setV((s) => ({ ...s, [k]: val }));


  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(v);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">Description</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Titre de l'annonce</Label>
            <Input
              id="title"
              value={v.title}
              onChange={(e) => set("title", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={v.description}
              onChange={(e) => set("description", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Type d'annonce</Label>
              <Select
                value={v.listingType}
                onChange={(e) => set("listingType", e.target.value as any)}
              >
                <option value="SALE">Vente</option>
                <option value="RENT">Location</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Type de bien</Label>
              <Select
                value={v.propertyType}
                onChange={(e) => set("propertyType", e.target.value as any)}
              >
                <option value="APARTMENT">Appartement</option>
                <option value="HOUSE">Maison</option>
                <option value="STUDIO">Studio</option>
                <option value="LAND">Terrain</option>
                <option value="COMMERCIAL">Local commercial</option>
                <option value="OTHER">Autre</option>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">Caractéristiques</h2>
        </CardHeader>
        <CardBody className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label>Surface (m²)</Label>
            <Input
              type="number"
              min={0}
              value={v.surface}
              onChange={(e) => set("surface", Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>Nombre de pièces</Label>
            <Input
              type="number"
              min={0}
              value={v.rooms}
              onChange={(e) => set("rooms", Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>Chambres</Label>
            <Input
              type="number"
              min={0}
              value={v.bedrooms}
              onChange={(e) => set("bedrooms", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label>Salles de bain</Label>
            <Input
              type="number"
              min={0}
              value={v.bathrooms}
              onChange={(e) => set("bathrooms", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label>Étage</Label>
            <Input
              type="number"
              value={v.floor ?? ""}
              onChange={(e) =>
                set("floor", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Année de construction</Label>
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
                ["furnished", "Meublé"],
                ["hasParking", "Parking"],
                ["hasBalcony", "Balcon"],
                ["hasGarden", "Jardin"],
                ["hasElevator", "Ascenseur"],
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

      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">Localisation</h2>
        </CardHeader>
        <CardBody className="grid grid-cols-2 gap-3">
          <div className="space-y-1 col-span-2">
            <Label>Adresse</Label>
            <Input
              value={v.addressLine}
              onChange={(e) => set("addressLine", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>Code postal</Label>
            <Input
              value={v.postalCode}
              onChange={(e) => set("postalCode", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>Ville</Label>
            <Input
              value={v.city}
              onChange={(e) => set("city", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <Label>Pays</Label>
            <CountrySelect
              value={v.country}
              onChange={(code) => {
                const currency = COUNTRY_TO_CURRENCY[code] ?? "EUR";
                setV((s) => ({ ...s, country: code, currency }));
              }}
            />
          </div>
          <div className="space-y-1">
            <Label>Devise</Label>
            <div className="flex h-10 items-center rounded-lg border border-border bg-surface/60 px-3 text-sm text-ink-muted select-none">
              {v.currency || "—"}
            </div>
          </div>
          <div className="space-y-1">
            <Label>Latitude</Label>
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
            <Label>Longitude</Label>
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

      {/* ── Grille tarifaire (location uniquement) ──────────────────────── */}
      {v.listingType === "RENT" && (
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">Grille tarifaire</h2>
            <p className="text-sm text-ink-muted mt-1">
              Définissez vos tarifs selon la durée. Cochez les unités applicables et saisissez le montant manuellement.
            </p>
          </CardHeader>
          <CardBody className="space-y-2">
            {(["DAYS", "WEEKS", "MONTHS", "YEARS"] as LeaseDurationUnit[]).map((unit) => {
              const UNIT_SINGULAR: Record<LeaseDurationUnit, string> = {
                DAYS: "jour",
                WEEKS: "semaine",
                MONTHS: "mois",
                YEARS: "an",
              };
              const row = v.pricingRates.find((r) => r.unit === unit);
              const checked = !!row;
              const displayVal = row?.amount ?? "";

              return (
                <div
                  key={unit}
                  className={`rounded-xl border px-4 py-3 transition-colors ${
                    checked ? "border-brand-300 bg-white" : "border-border bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <input
                      type="checkbox"
                      id={`rate-${unit}`}
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          set("pricingRates", [...v.pricingRates, { unit, amount: "" }]);
                        } else {
                          set("pricingRates", v.pricingRates.filter((r) => r.unit !== unit));
                        }
                      }}
                      className="h-4 w-4 rounded border-border accent-brand-600 shrink-0"
                    />
                    <label
                      htmlFor={`rate-${unit}`}
                      className="text-sm font-medium w-20 cursor-pointer"
                    >
                      Par {UNIT_SINGULAR[unit]}
                    </label>
                    {checked && (
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="ex : 100"
                          value={displayVal}
                          onChange={(e) =>
                            set(
                              "pricingRates",
                              v.pricingRates.map((r) =>
                                r.unit === unit ? { ...r, amount: e.target.value } : r,
                              ),
                            )
                          }
                          className="w-32"
                        />
                        <span className="text-sm text-ink-muted shrink-0">
                          € / {UNIT_SINGULAR[unit]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">Photos</h2>
        </CardHeader>
        <CardBody>
          <ImageUploader
            value={v.mediaUrls}
            onChange={(urls) => set("mediaUrls", urls)}
            maxImages={10}
          />
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} size="lg">
          {submitting ? "Enregistrement…" : submitLabel ?? "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
