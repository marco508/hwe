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
import type { Property } from "@hwe/types";

const formatPrice = (n: number, currency = "EUR") =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

const FEATURE_ICONS: Record<string, string> = {
  Surface: "📐",
  Pièces: "🚪",
  Chambres: "🛏️",
  "Salles de bain": "🛁",
  Étage: "🏢",
  Année: "📅",
  Meublé: "🛋️",
  Parking: "🅿️",
  Balcon: "🪟",
  Jardin: "🌿",
  Ascenseur: "🛗",
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

  const features: { label: string; value: React.ReactNode }[] = [
    { label: "Surface", value: `${p.surface} m²` },
    { label: "Pièces", value: p.rooms },
    { label: "Chambres", value: p.bedrooms },
    { label: "Salles de bain", value: p.bathrooms },
  ];
  if (p.floor !== null && p.floor !== undefined)
    features.push({ label: "Étage", value: p.floor });
  if (p.yearBuilt) features.push({ label: "Année", value: p.yearBuilt });
  features.push(
    { label: "Meublé", value: p.furnished ? "Oui" : "Non" },
    { label: "Parking", value: p.hasParking ? "Oui" : "Non" },
    { label: "Balcon", value: p.hasBalcony ? "Oui" : "Non" },
    { label: "Jardin", value: p.hasGarden ? "Oui" : "Non" },
    { label: "Ascenseur", value: p.hasElevator ? "Oui" : "Non" },
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
              {p.listingType === "SALE" ? "À vendre" : "À louer"}
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
              <div className="font-display text-3xl">Aucune photo</div>
            }
          />
        </div>

        {/* Description */}
        <Card className="hover-lift">
          <CardHeader>
            <h2 className="font-display text-lg flex items-center gap-2">
              <span aria-hidden="true">📝</span> Description
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
              <span aria-hidden="true">✨</span> Caractéristiques
            </h2>
          </CardHeader>
          <CardBody className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm stagger">
            {features.map((f) => (
              <div
                key={f.label}
                className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-base">
                    {FEATURE_ICONS[f.label] ?? "•"}
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
              {p.listingType === "SALE" ? "Prix de vente" : "Loyer mensuel"}
            </div>
            <div className="text-3xl font-display gradient-text leading-none">
              {formatPrice(p.price, p.currency)}
              {p.listingType === "RENT" && (
                <span className="text-sm font-normal text-ink-muted ml-1">
                  /mois
                </span>
              )}
            </div>
            <div className="text-sm text-ink-muted mt-3 flex items-center gap-3">
              <span>📐 {p.surface} m²</span>
              <span>•</span>
              <span>
                {p.rooms} {p.rooms > 1 ? "pièces" : "pièce"}
              </span>
            </div>
          </CardBody>
        </Card>

        {p.owner && (
          <Card className="hover-lift">
            <CardHeader>
              <h2 className="font-display text-lg">Propriétaire</h2>
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
            Astuce
          </div>
          Comparez ce bien avec d'autres annonces en sauvegardant vos favoris
          depuis l'espace locataire.
        </div>
      </aside>
    </article>
  );
}
