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
  CurrencyPicker,
  Icon,
  IconBadge,
  intlLocale,
  type IconName,
} from "@hwe/ui";
import type {
  Property,
  PricingRate,
  LeaseDurationUnit,
  EnergyClass,
  RentalKind,
  PropertyType,
  PropertyStatus,
} from "@hwe/types";
import { COUNTRY_CODES, COUNTRY_CURRENCY, COUNTRY_NAMES_FR, ENERGY_CLASS_COLORS, SELECTABLE_CURRENCIES } from "@hwe/types";
import { t } from "../lib/i18n";
import { ImageUploader } from "./ImageUploader";
import type { CreatePropertyBody } from "../lib/api";

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

/** Valeur du formulaire → corps API (sans médias ni grille, gérés à part). */
export function toPropertyBody(
  v: Omit<PropertyFormValue, "mediaUrls" | "pricingRates">,
): CreatePropertyBody {
  // Liste blanche : l'objet d'édition contient aussi id, owner, media…
  const keys = [
    "title", "description", "listingType", "propertyType", "status", "currency",
    "surface", "rooms", "bedrooms", "bathrooms", "floor", "yearBuilt", "furnished",
    "hasParking", "hasBalcony", "hasGarden", "hasElevator", "addressLine", "city",
    "postalCode", "country", "latitude", "longitude", "coOwnershipFees", "propertyTax",
    "energyClass", "notaryFeesRate", "isNew", "rentalKind", "chargesIncluded",
    "chargesAmount", "deposit", "noticeMonths", "petsAllowed",
  ] as const;
  const out: Record<string, unknown> = {};
  for (const k of keys) out[k] = (v as Record<string, unknown>)[k];
  // Le formulaire ne gère que DRAFT / PUBLISHED : un bien loué, vendu ou
  // archivé garde son statut (on n'envoie pas le champ).
  if (out.status !== "DRAFT" && out.status !== "PUBLISHED") delete out.status;
  return out as unknown as CreatePropertyBody;
}

// ── Pays + devises ──────────────────────────────────────────────────────────
// Table complète partagée (@hwe/types) : pays ISO → devise ; noms affichés
// dans la langue courante (libellés français historiques en français).
const COUNTRIES: { code: string; name: string; currency: string }[] = COUNTRY_CODES.map((code) => ({
  code,
  name: COUNTRY_NAMES_FR[code] ?? code,
  currency: COUNTRY_CURRENCY[code] ?? "EUR",
}));

const COUNTRY_TO_CURRENCY: Record<string, string> = COUNTRY_CURRENCY;

/** Devises possibles pour un bien : celles des sélecteurs + celles de tous les pays. */
const PROPERTY_CURRENCIES: string[] = [...new Set([...SELECTABLE_CURRENCIES, ...Object.values(COUNTRY_CURRENCY)])].sort((a, b) =>
  a.localeCompare(b),
);

function CountrySelect({
  value,
  onChange,
  labelledBy,
}: {
  value: string;
  onChange: (code: string) => void;
  labelledBy?: string;
}) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find((c) => c.code === value);
  const sorted = React.useMemo(() => {
    const loc = intlLocale();
    return [...COUNTRIES].sort((a, b) => countryLabel(a.code, a.name).localeCompare(countryLabel(b.code, b.name), loc));
  }, []);
  const filtered = query.trim()
    ? sorted.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          countryLabel(c.code, c.name).toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase()),
      )
    : sorted;

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setQuery("");
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-border bg-surface px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <span className="truncate">{selected ? countryLabel(selected.code, selected.name) : t("pf.country.select")}</span>
        <span className="text-ink-muted ms-2">▾</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-surface shadow-lg">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              placeholder={t("pf.country.search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t("pf.country.search")}
              className="w-full rounded-lg border border-border bg-surface text-ink px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1" role="listbox" aria-labelledby={labelledBy}>
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink-muted">{t("pf.country.noResult")}</li>
            ) : (
              filtered.map((c) => (
                <li key={c.code} role="option" aria-selected={c.code === value}>
                  {/* Vrai bouton : sélection au clavier (Tab + Entrée) — M1. */}
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`w-full text-start px-3 py-2 text-sm hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-200 focus:outline-none focus-visible:bg-brand-50 dark:focus-visible:bg-brand-900/30 ${
                      c.code === value
                        ? "bg-brand-50 dark:bg-brand-900/30 font-medium text-brand-700 dark:text-brand-200"
                        : "text-ink"
                    }`}
                  >
                    {countryLabel(c.code, c.name)}
                    <span className="ms-1 text-xs text-ink-muted">{c.currency}</span>
                  </button>
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
  const [formError, setFormError] = React.useState<string | null>(null);

  const set = <K extends keyof PropertyFormValue>(
    k: K,
    val: PropertyFormValue[K],
  ) => setV((s) => ({ ...s, [k]: val }));

  const isSale = v.listingType === "SALE";
  const validRates = v.pricingRates.filter((r) => r.amount !== "" && Number(r.amount) > 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    // F10 : en location, un prix OU une grille tarifaire suffit.
    if (isSale && !(Number(v.price) > 0)) return setFormError(t("pf.err.salePrice"));
    if (!isSale && !(Number(v.price) > 0) && validRates.length === 0)
      return setFormError(t("pf.err.priceOrRates"));
    if (!isSale && validRates.length !== v.pricingRates.length)
      return setFormError(t("pf.err.rateUnits"));
    onSubmit(v);
  };

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
              icon="tag"
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
              icon="key"
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
              maxLength={120}
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
              maxLength={5000}
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
            <Label htmlFor="pf-f1">{t("pf.propertyType")}</Label>
            <Select
              id="pf-f1"value={v.propertyType}
              onChange={(e) => set("propertyType", e.target.value as PropertyType)}
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
            <Label htmlFor="pf-f2">{t("pf.surface")}</Label>
            <Input
              id="pf-f2"type="number"
              min={0}
              value={v.surface}
              onChange={(e) => set("surface", Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-f3">{t("pf.rooms")}</Label>
            <Input
              id="pf-f3"type="number"
              min={0}
              value={v.rooms}
              onChange={(e) => set("rooms", Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-f4">{t("pf.bedrooms")}</Label>
            <Input
              id="pf-f4"type="number"
              min={0}
              value={v.bedrooms}
              onChange={(e) => set("bedrooms", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-f5">{t("pf.bathrooms")}</Label>
            <Input
              id="pf-f5"type="number"
              min={0}
              value={v.bathrooms}
              onChange={(e) => set("bathrooms", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-f6">{t("pf.floor")}</Label>
            <Input
              id="pf-f6"type="number"
              value={v.floor ?? ""}
              onChange={(e) =>
                set("floor", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-f7">{t("pf.yearBuilt")}</Label>
            <Input
              id="pf-f7"type="number"
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
        <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="pf-f8">{t("pf.address")}</Label>
            <Input
              id="pf-f8"value={v.addressLine}
              onChange={(e) => set("addressLine", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-f9">{t("pf.postalCode")}</Label>
            <Input
              id="pf-f9"value={v.postalCode}
              onChange={(e) => set("postalCode", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-f10">{t("pf.city")}</Label>
            <Input
              id="pf-f10"value={v.city}
              onChange={(e) => set("city", e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <span id="pf-country-label" className="text-sm font-medium text-ink">{t("pf.country")}</span>
            <CountrySelect
              labelledBy="pf-country-label"
              value={v.country}
              onChange={(code) => {
                const currency = COUNTRY_TO_CURRENCY[code] ?? "EUR";
                setV((s) => ({ ...s, country: code, currency }));
              }}
            />
          </div>
          <div className="space-y-1">
            <span id="pf-currency-label" className="text-sm font-medium text-ink">{t("pf.currency")}</span>
            {/* Devise du pays par défaut, modifiable. */}
            <CurrencyPicker
              id="pf-currency"
              value={v.currency || "EUR"}
              onChange={(c) => set("currency", c)}
              codes={PROPERTY_CURRENCIES}
              label={t("pf.currency")}
            />
            <p className="text-xs text-ink-muted">{t("pf.currencyHint")}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="pf-f11">{t("pf.latitude")}</Label>
            <Input
              id="pf-f11"type="number"
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
            <Label htmlFor="pf-f12">{t("pf.longitude")}</Label>
            <Input
              id="pf-f12"type="number"
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
            <div className="space-y-1 flex-1 min-w-0">
              <Label htmlFor="price">
                {isSale ? t("pf.price.sale") : t("pf.price.rent")}
              </Label>
              <Input
                id="price"
                type="number"
                min={0}
                max={1000000000}
                step="0.01"
                value={v.price || ""}
                onChange={(e) => set("price", Number(e.target.value))}
                required={isSale || validRates.length === 0}
                aria-describedby={!isSale ? "pf-price-help" : undefined}
              />
            </div>
            <div className="space-y-1 w-24 sm:w-32 shrink-0">
              <p className="text-sm font-medium text-ink">{t("pf.currency")}</p>
              <div className="flex h-10 items-center justify-center rounded-lg border border-border bg-cream-100/50 dark:bg-white/5 px-3 text-sm font-medium text-ink-muted">
                {v.currency || "—"}
              </div>
            </div>
          </div>
          {!isSale && (
            <p id="pf-price-help" className="text-xs text-ink-muted mt-2">
              {t("pf.price.optional")}
            </p>
          )}
        </CardBody>
      </Card>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* SECTIONS SPÉCIFIQUES — VENTE                                       */}
      {/* ────────────────────────────────────────────────────────────────── */}
      {isSale && (
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg flex items-center gap-2">
              <Icon name="tag" size={18} className="text-accent-500" /> {t("pf.saleInfo.title")}
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              {t("pf.saleInfo.sub")}
            </p>
          </CardHeader>
          <CardBody className="space-y-5">
            {/* DPE */}
            <div>
              <p className="text-sm font-medium text-ink">{t("pf.dpe")}</p>
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
                      aria-pressed={active}
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
                <Label htmlFor="pf-f13">{t("pf.coOwnershipFees")}</Label>
                <Input
                  id="pf-f13"type="number"
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
                <Label htmlFor="pf-f14">{t("pf.propertyTax")}</Label>
                <Input
                  id="pf-f14"type="number"
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
                <Label htmlFor="pf-f15">{t("pf.notaryFees")}</Label>
                <Input
                  id="pf-f15"type="number"
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
                <p className="text-sm font-medium text-ink">{t("pf.isNew")}</p>
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
              <Icon name="key" size={18} className="text-brand-600 dark:text-brand-300" /> {t("pf.rentInfo.title")}
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              {t("pf.rentInfo.sub")}
            </p>
          </CardHeader>
          <CardBody className="space-y-5">
            {/* Type de bail */}
            <div>
              <p className="text-sm font-medium text-ink">{t("pf.rentalKind")}</p>
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
                        setV((s) => ({
                          ...s,
                          rentalKind: active ? null : k,
                          // « Location meublée » ⇒ bien meublé (case cochée) ; « nue » ⇒ non meublé.
                          furnished: !active && k === "FURNISHED" ? true : !active && k === "BARE" ? false : s.furnished,
                        }))
                      }
                      aria-pressed={active}
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
              <p className="text-sm font-medium text-ink">{t("pf.charges")}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => set("chargesIncluded", true)}
                  aria-pressed={v.chargesIncluded === true}
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
                  aria-pressed={v.chargesIncluded === false}
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
                  <Label htmlFor="pf-f16">{t("pf.charges.amount")}</Label>
                  <Input
                    id="pf-f16"type="number"
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
                <Label htmlFor="pf-f17">{t("pf.deposit")}</Label>
                <Input
                  id="pf-f17"type="number"
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
                <Label htmlFor="pf-f18">{t("pf.notice")}</Label>
                <Input
                  id="pf-f18"type="number"
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
              <p className="text-sm font-medium text-ink">{t("pf.pets")}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => set("petsAllowed", true)}
                  aria-pressed={v.petsAllowed === true}
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
                  aria-pressed={v.petsAllowed === false}
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
                        ? "border-brand-300 bg-brand-50/40 dark:bg-brand-900/20"
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
                            aria-label={t("pf.rates.per", { unit: UNIT_SINGULAR[unit] })}
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
            maxImages={20}
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
                  icon: "pen" as IconName,
                },
                {
                  val: "PUBLISHED",
                  title: t("pf.status.published"),
                  desc: t("pf.status.publishedDesc"),
                  icon: "globe" as IconName,
                },
              ] as const
            ).map((opt) => {
              const active = v.status === opt.val;
              return (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => set("status", opt.val as PropertyStatus)}
                  aria-pressed={active}
                  className={`text-start rounded-xl border px-4 py-3 transition-all ${
                    active
                      ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/20 ring-2 ring-brand-500/30"
                      : "border-border bg-surface hover:border-ink/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <IconBadge name={opt.icon} size="sm" />
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

      {formError && (
        <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 text-danger dark:text-red-300 text-sm px-3 py-2">
          {formError}
        </div>
      )}
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
  icon: IconName;
  desc: string;
  tone: "brand" | "accent";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative text-start rounded-xl border p-4 transition-all ${
        active
          ? tone === "accent"
            ? "border-accent-500 bg-accent-50/40 dark:bg-accent-700/15 ring-2 ring-accent-500/30"
            : "border-brand-500 bg-brand-50/40 dark:bg-brand-900/20 ring-2 ring-brand-500/30"
          : "border-border bg-surface hover:border-ink/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <IconBadge name={icon} size="lg" tone={tone === "accent" ? "accent" : "brand"} />
        <div>
          <div className="font-display text-xl text-ink">{title}</div>
          <div className="text-xs text-ink-muted mt-1">{desc}</div>
        </div>
        {active && (
          <span
            className={`absolute top-3 end-3 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs ${
              tone === "accent" ? "bg-accent-500" : "bg-brand-500"
            }`}
            aria-hidden="true"
          >
            <Icon name="check" size={14} strokeWidth={2.6} />
          </span>
        )}
      </div>
    </button>
  );
}
