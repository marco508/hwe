"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../lib/api";
import { useAuth } from "../../../../lib/auth-context";
import { PropertyForm, PropertyFormValue } from "../../../../components/PropertyForm";
import { AnimatedBackground, Button } from "@hwe/ui";
import type { Property, PricingRate, LeaseDurationUnit } from "@hwe/types";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const [property, setProperty] = React.useState<Property | null>(null);
  const [rates, setRates] = React.useState<PricingRate[]>([]);
  const [ratesLoaded, setRatesLoaded] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  React.useEffect(() => {
    if (!params?.id) return;
    api.getProperty(params.id).then(setProperty);
    api.getPricingRates(params.id).then((r) => {
      setRates(r as unknown as PricingRate[]);
      setRatesLoaded(true);
    });
  }, [params?.id]);

  if (!property || !ratesLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-32 rounded-2xl skeleton" />
        <div className="h-96 rounded-2xl skeleton" />
      </div>
    );
  }

  const onSubmit = async (v: PropertyFormValue) => {
    setSubmitting(true);
    try {
      const { mediaUrls, pricingRates, ...rest } = v;
      const validRates = pricingRates.filter(
        (r) => r.amount !== "" && Number(r.amount) > 0,
      );

      let finalPrice = rest.price;
      if (rest.listingType === "RENT" && validRates.length > 0 && !rest.price) {
        const monthly = validRates.find((r) => r.unit === "MONTHS");
        const fallback = validRates[0];
        finalPrice = monthly
          ? Number(monthly.amount)
          : fallback
          ? Number(fallback.amount)
          : rest.price;
      }

      await api.updateProperty(property.id, {
        ...rest,
        price: finalPrice,
        media: mediaUrls.map((url, i) => ({ url, position: i })),
      } as any);

      await api.upsertPricingRates(
        property.id,
        validRates.map((r) => ({ unit: r.unit, amount: Number(r.amount) })),
      );

      router.push("/dashboard");
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
      setSubmitting(false);
    }
  };

  const initial: Partial<PropertyFormValue> = {
    ...property,
    mediaUrls: property.media.map((m) => m.url),
    pricingRates: rates.map((r) => ({
      unit: r.unit as LeaseDurationUnit,
      amount: String(r.amount),
    })),
  };

  return (
    <section>
      <AnimatedBackground
        variant="blobs"
        className="rounded-2xl border border-border/60 px-8 py-8 mb-8"
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink mb-3 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Retour au tableau de bord
        </Link>
        <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
          {property.status === "PUBLISHED" ? "🌍 Annonce publiée" : "📝 Brouillon"}
        </span>
        <h1 className="font-display text-4xl mb-2">
          Modifier <span className="gradient-text">{property.title}</span>
        </h1>
        <p className="text-ink-muted">
          {property.city}, {property.country} · {property.surface} m² · {property.rooms} {property.rooms > 1 ? "pièces" : "pièce"}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          <Link href={`/dashboard/${property.id}/documents`}>
            <Button variant="secondary" size="sm">🗂️ Documents légaux</Button>
          </Link>
          {property.listingType === "RENT" && (
            <Link href={`/dashboard/${property.id}/lease`}>
              <Button variant="secondary" size="sm">📋 Contrats de location</Button>
            </Link>
          )}
          <Link href={`/properties/${property.id}`}>
            <Button variant="ghost" size="sm">👁 Aperçu public</Button>
          </Link>
        </div>
      </AnimatedBackground>

      <PropertyForm
        initial={initial}
        onSubmit={onSubmit}
        submitting={submitting}
        submitLabel="Mettre à jour"
      />
    </section>
  );
}
