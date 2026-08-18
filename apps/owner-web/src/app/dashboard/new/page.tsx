"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@hwe/ui";
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
      {/* ── Hero d'introduction ──────────────────────────────────────────── */}
      <AnimatedBackground
        variant="blobs"
        className="rounded-2xl border border-border/60 px-8 py-8 mb-8"
      >
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
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
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 pulse-dot" />
              Nouveau bien
            </span>
            <h1 className="font-display text-4xl mb-2">
              Présentez votre bien <span className="gradient-text">avec soin</span>
            </h1>
            <p className="text-ink-muted leading-relaxed max-w-xl">
              Une annonce complète et illustrée attire des candidats sérieux. Comptez 10 à 15 minutes pour saisir tous les détails — vous pourrez modifier à tout moment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <TipCard icon="📸" text="Photos lumineuses, plusieurs angles" />
            <TipCard icon="📍" text="Adresse précise, ville exacte" />
            <TipCard icon="💶" text="Prix juste, devise locale" />
            <TipCard icon="📝" text="Description honnête et vivante" />
          </div>
        </div>
      </AnimatedBackground>

      <PropertyForm onSubmit={onSubmit} submitting={submitting} />
    </section>
  );
}

function TipCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="glass rounded-xl px-3 py-2.5 flex items-center gap-2 text-xs">
      <span className="text-base leading-none shrink-0" aria-hidden="true">{icon}</span>
      <span className="text-ink-muted leading-tight">{text}</span>
    </div>
  );
}
