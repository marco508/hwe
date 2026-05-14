"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { PropertyForm, PropertyFormValue } from "../../../components/PropertyForm";

export default function NewPropertyPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (!user) return null;

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

      const created = await api.createProperty({
        ...rest,
        price: finalPrice,
        media: mediaUrls.map((url, i) => ({ url, position: i })),
      } as any);

      if (validRates.length > 0) {
        await api.upsertPricingRates(
          created.id,
          validRates.map((r) => ({ unit: r.unit, amount: Number(r.amount) })),
        );
      }

      router.push(`/properties/${created.id}`);
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h1 className="font-display text-3xl mb-6">Ajouter un bien</h1>
      <PropertyForm onSubmit={onSubmit} submitting={submitting} submitLabel="Publier" />
    </section>
  );
}
