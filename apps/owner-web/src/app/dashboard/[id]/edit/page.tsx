"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../lib/api";
import { useAuth } from "../../../../lib/auth-context";
import { PropertyForm, PropertyFormValue } from "../../../../components/PropertyForm";
import { Button } from "@hwe/ui";
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

  if (!property || !ratesLoaded) return <p className="text-ink-muted">Chargement…</p>;

  const onSubmit = async (v: PropertyFormValue) => {
    setSubmitting(true);
    try {
      const { mediaUrls, pricingRates, ...rest } = v;
      const validRates = pricingRates.filter((r) => r.amount !== "" && Number(r.amount) > 0);

      // Pour une location, dériver le price depuis la grille (tarif MONTHS en priorité)
      let finalPrice = rest.price;
      if (rest.listingType === "RENT" && validRates.length > 0) {
        const monthly = validRates.find((r) => r.unit === "MONTHS");
        const fallback = validRates[0];
        finalPrice = monthly ? Number(monthly.amount) : fallback ? Number(fallback.amount) : rest.price;
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
      <h1 className="font-display text-3xl mb-4">Modifier le bien</h1>

      <div className="flex flex-wrap gap-3 mb-8 p-4 bg-sand-50 rounded-xl border border-sand-200">
        <span className="text-sm text-ink-muted self-center mr-2">Gestion du bien :</span>
        <Link href={`/dashboard/${property.id}/documents`}>
          <Button variant="secondary" size="sm">🗂️ Documents légaux</Button>
        </Link>
        {property.listingType === "RENT" && (
          <Link href={`/dashboard/${property.id}/lease`}>
            <Button variant="secondary" size="sm">📋 Contrats de location</Button>
          </Link>
        )}
      </div>

      <PropertyForm
        initial={initial}
        onSubmit={onSubmit}
        submitting={submitting}
        submitLabel="Mettre à jour"
      />
    </section>
  );
}
