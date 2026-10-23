"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  ErrorState,
  SafeImage,
  isNotFound,
  priceUnitSuffix,
  tUi,
  useAsync,
  Icon,
  PropertyGallery,
  type IconName,
  AgencyLogo,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { useCurrency } from "../../../lib/currency-context";
import { t } from "../../../lib/i18n";
import type { Property } from "@hwe/types";


const FEATURE_ICONS: Record<string, IconName> = {
  surface: "ruler",
  rooms: "door",
  bedrooms: "bed",
  bathrooms: "bath",
  floor: "stairs",
  year: "calendar",
  furnished: "sofa",
  parking: "car",
  balcony: "balcony",
  garden: "leaf",
  elevator: "elevator",
};

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  // U6 : prix converti dans la devise d'affichage (comme le reste de l'app).
  const { format: fmtPrice } = useCurrency();
  const { user } = useAuth();
  const { data: p, error, reload } = useAsync<Property>(
    () => api.getProperty(params!.id),
    [params?.id],
    { enabled: !!params?.id },
  );

  if (error && !p) {
    return isNotFound(error) ? (
      <EmptyState title={t("prop.notFound")} />
    ) : (
      <ErrorState error={error} title={t("prop.loadError")} onRetry={reload} />
    );
  }

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
      <div className="lg:col-span-2 space-y-6 min-w-0">
        <header className="animate-fade-in-up">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge tone={p.listingType === "SALE" ? "accent" : "brand"} glow>
              {p.listingType === "SALE" ? t("acc.prop.forSale") : t("acc.prop.forRent")}
            </Badge>
            <Badge tone="ocean">{t("pf.type." + p.propertyType)}</Badge>
            {p.status !== "PUBLISHED" && <Badge tone="neutral">{tUi(`ui.status.${p.status}`)}</Badge>}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl mb-2 leading-tight [overflow-wrap:anywhere]">
            {p.title}
          </h1>
          <div className="flex items-start gap-1.5 text-ink-muted [overflow-wrap:anywhere] min-w-0">
            <svg aria-hidden="true" className="shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {p.addressLine}, {p.postalCode} {p.city}
          </div>
        </header>

        {/* Galerie principale : grande photo, vignettes, plein écran */}
        <PropertyGallery images={galleryImages} propertyType={p.propertyType} />

        {/* Description */}
        <Card className="hover-lift">
          <CardHeader>
            <h2 className="font-display text-lg flex items-center gap-2">
              <Icon name="file" size={18} className="text-brand-600 dark:text-brand-300" /> {t("acc.prop.description")}
            </h2>
          </CardHeader>
          <CardBody>
            <p className="whitespace-pre-line text-sm leading-relaxed [overflow-wrap:anywhere]">
              {p.description}
            </p>
          </CardBody>
        </Card>

        {/* Caractéristiques */}
        <Card className="hover-lift">
          <CardHeader>
            <h2 className="font-display text-lg flex items-center gap-2">
              <Icon name="sparkles" size={18} className="text-brand-600 dark:text-brand-300" /> {t("acc.prop.features")}
            </h2>
          </CardHeader>
          <CardBody className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm stagger">
            {features.map((f) => (
              <div
                key={f.key}
                className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon name={FEATURE_ICONS[f.key] ?? "dots"} size={18} className="text-brand-600 dark:text-brand-300" />
                  <div className="min-w-0">
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
      <aside className="space-y-4 lg:sticky lg:top-24 self-start min-w-0">
        <Card className="glass-strong border-brand-200 dark:border-brand-800/50">
          <CardBody>
            <div className="text-[11px] uppercase tracking-wider text-ink-muted mb-1">
              {p.listingType === "SALE" ? t("acc.prop.salePrice") : p.priceUnit && p.priceUnit !== "MONTHS" ? t("acc.prop.rate") : t("acc.prop.monthlyRent")}
            </div>
            <div className="text-3xl font-display gradient-text leading-tight [overflow-wrap:anywhere]">
              {(p.displayPrice ?? p.price) > 0 ? fmtPrice(p.displayPrice ?? p.price, p.currency) : t("prop.priceOnGrid")}
              {p.listingType === "RENT" && (p.displayPrice ?? p.price) > 0 && (
                <span className="text-sm font-normal text-ink-muted ml-1">
                  {priceUnitSuffix(p.priceUnit)}
                </span>
              )}
            </div>
            <div className="text-sm text-ink-muted mt-3 flex items-center gap-3">
              <span className="inline-flex items-center gap-1"><Icon name="ruler" size={14} />{p.surface} m²</span>
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
                <span className="h-10 w-10 shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-brand-500 to-accent-500 text-white flex items-center justify-center font-display">
                  <SafeImage
                    src={p.owner.avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    fallbackClassName="h-full w-full from-brand-600 to-accent-500 text-white"
                    fallback={(p.owner.firstName?.[0] ?? "") + (p.owner.lastName?.[0] ?? "")}
                  />
                </span>
                <div className="min-w-0">
                  <div className="font-medium [overflow-wrap:anywhere]">
                    {p.owner.firstName} {p.owner.lastName}
                  </div>
                </div>
              </div>
              {/* Contrat §8 : plus d'e-mail ni de téléphone publics. */}
              <p className="text-ink-muted text-xs">{t("prop.contactHint")}</p>
            </CardBody>
          </Card>
        )}

        {p.managedBy && (
          <div className="rounded-2xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-900/20 p-4 flex items-center gap-3" data-managed-card>
            <AgencyLogo name={p.managedBy.name} logoUrl={p.managedBy.logoUrl} />
            <div className="min-w-0">
              <p className="text-xs text-ink-muted">{t("pro.prop.offeredBy")}</p>
              <p className="font-medium [overflow-wrap:anywhere]">{p.managedBy.name}</p>
            </div>
          </div>
        )}

        {user && (p.ownerId === user.id || (user.role === "AGENT" && !!p.managedBy)) && (
          <Link
            href={user.role === "AGENT" ? `/dashboard/${p.id}` : `/dashboard/${p.id}/edit`}
            className="flex items-center justify-center h-11 rounded-md text-sm font-medium text-white hover:text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 shadow-md"
          >
            {t("prop.editMine")}
          </Link>
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
