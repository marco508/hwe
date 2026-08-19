"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  ImageCarousel,
} from "@hwe/ui";
import { api } from "../../../lib/api";
import { useCurrency } from "../../../lib/currency-context";
import { t } from "../../../lib/i18n";
import type { Property } from "@hwe/types";

const formatPrice = (n: number, currency = "EUR") =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

const FEATURE_ICONS: Record<string, string> = {
  surface: "📐",
  rooms: "🚪",
  bedrooms: "🛏️",
  bathrooms: "🛁",
  floor: "🏢",
  year: "📅",
  furnished: "🛋️",
  parking: "🅿️",
  balcony: "🪟",
  garden: "🌿",
  elevator: "🛗",
};

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const { format: fmtPrice } = useCurrency();
  const [p, setP] = React.useState<Property | null>(null);

  React.useEffect(() => {
    if (params?.id) api.getProperty(params.id).then(setP);
  }, [params?.id]);

  if (!p) {
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-8 w-1/3 rounded skeleton" />
          <div className="aspect-[16/10] rounded-xl skeleton" />
          <div className="h-32 rounded-lg skeleton" />
        </div>
        <div className="space-y-4">
          <div className="h-28 rounded-lg skeleton" />
          <div className="h-40 rounded-lg skeleton" />
        </div>
      </div>
    );
  }

  const yesNo = (v: boolean) => (v ? t("acc.yes") : t("acc.no"));
  const features: { key: string; label: string; value: React.ReactNode }[] = [
    { key: "surface", label: t("acc.feat.surface"), value: `${p.surface} m²` },
    { key: "rooms", label: t("acc.feat.rooms"), value: p.rooms },
    { key: "bedrooms", label: t("acc.feat.bedrooms"), value: p.bedrooms },
    { key: "bathrooms", label: t("acc.feat.bathrooms"), value: p.bathrooms },
  ];
  if (p.floor !== null && p.floor !== undefined)
    features.push({ key: "floor", label: t("acc.feat.floor"), value: p.floor });
  if (p.yearBuilt)
    features.push({ key: "year", label: t("acc.feat.year"), value: p.yearBuilt });
  features.push(
    { key: "furnished", label: t("acc.feat.furnished"), value: yesNo(p.furnished) },
    { key: "parking", label: t("acc.feat.parking"), value: yesNo(p.hasParking) },
    { key: "balcony", label: t("acc.feat.balcony"), value: yesNo(p.hasBalcony) },
    { key: "garden", label: t("acc.feat.garden"), value: yesNo(p.hasGarden) },
    { key: "elevator", label: t("acc.feat.elevator"), value: yesNo(p.hasElevator) },
  );

  const galleryImages = (p.media ?? []).map((m) => ({
    url: m.url,
    alt: m.alt ?? p.title,
  }));

  return (
    <article className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <header className="animate-fade-in-up">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge tone={p.listingType === "SALE" ? "accent" : "brand"} glow>
              {p.listingType === "SALE" ? t("acc.prop.forSale") : t("acc.prop.forRent")}
            </Badge>
            <Badge tone="ocean">{p.propertyType}</Badge>
          </div>
          <h1 className="font-display text-4xl mb-2 leading-tight">
            {p.title}
          </h1>
          <div className="flex items-center gap-1.5 text-ink-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {p.addressLine}, {p.postalCode} {p.city}
          </div>
        </header>

        {/* Galerie principale */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-card-hover">
          <ImageCarousel
            images={galleryImages}
            aspectClassName="aspect-[16/10]"
            showArrows
            showDots
            showCounter
            autoPlayMs={6000}
            fallback={
              <div className="font-display text-3xl">{t("acc.prop.noPhoto")}</div>
            }
          />
        </div>

        {/* Description */}
        <Card className="hover-lift">
          <CardHeader>
            <h2 className="font-display text-lg flex items-center gap-2">
              <span aria-hidden="true">📝</span> {t("acc.prop.description")}
            </h2>
          </CardHeader>
          <CardBody>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {p.description}
            </p>
          </CardBody>
        </Card>

        {/* Caractéristiques */}
        <Card className="hover-lift">
          <CardHeader>
            <h2 className="font-display text-lg flex items-center gap-2">
              <span aria-hidden="true">✨</span> {t("acc.prop.features")}
            </h2>
          </CardHeader>
          <CardBody className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm stagger">
            {features.map((f) => (
              <div
                key={f.key}
                className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-base">
                    {FEATURE_ICONS[f.key] ?? "•"}
                  </span>
                  <div>
                    <div className="text-[11px] text-ink-muted">
                      {f.label}
                    </div>
                    <div className="font-medium">{f.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Sidebar */}
      <aside className="space-y-4 lg:sticky lg:top-24 self-start">
        <Card className="glass-strong border-brand-200 dark:border-brand-800/50">
          <CardBody>
            <div className="text-[11px] uppercase tracking-wider text-ink-muted mb-1">
              {p.listingType === "SALE" ? t("acc.prop.salePrice") : t("acc.prop.monthlyRent")}
            </div>
            <div className="text-3xl font-display gradient-text leading-none">
              {formatPrice(p.price, p.currency)}
              {p.listingType === "RENT" && (
                <span className="text-sm font-normal text-ink-muted ml-1">
                  {t("acc.prop.perMonth")}
                </span>
              )}
            </div>
            <div className="text-sm text-ink-muted mt-3 flex items-center gap-3">
              <span>📐 {p.surface} m²</span>
              <span>•</span>
              <span>
                {p.rooms} {p.rooms > 1 ? t("acc.prop.roomMany") : t("acc.prop.roomOne")}
              </span>
            </div>
          </CardBody>
        </Card>

        {p.owner && (
          <Card className="hover-lift">
            <CardHeader>
              <h2 className="font-display text-lg">{t("acc.prop.owner")}</h2>
            </CardHeader>
            <CardBody className="text-sm space-y-2">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white flex items-center justify-center font-display">
                  {(p.owner.firstName?.[0] ?? "") + (p.owner.lastName?.[0] ?? "")}
                </span>
                <div>
                  <div className="font-medium">
                    {p.owner.firstName} {p.owner.lastName}
                  </div>
                  <div className="text-ink-muted text-xs">
                    {p.owner.email}
                  </div>
                </div>
              </div>
              {p.owner.phone && (
                <div className="text-ink-muted flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.36 1.92.7 2.83a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.25-1.27a2 2 0 0 1 2.11-.45c.91.34 1.86.57 2.83.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {p.owner.phone}
                </div>
              )}
            </CardBody>
          </Card>
        )}

        <div className="rounded-2xl glass p-5 text-sm text-ink-muted">
          <div className="font-display text-base text-ink mb-1">
            {t("acc.prop.tipTitle")}
          </div>
          {t("acc.prop.tipBody")}
        </div>
      </aside>
    </article>
  );
}
