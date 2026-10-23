"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../lib/api";
import { useAuth } from "../../../../lib/auth-context";
import { t } from "../../../../lib/i18n";
import { PropertyForm, PropertyFormValue, toPropertyBody } from "../../../../components/PropertyForm";
import { tUi, AnimatedBackground, ErrorState, isNotFound, toast, EmptyState } from "@hwe/ui";
import type { Property, PricingRate, LeaseDurationUnit } from "@hwe/types";

// Lien stylé en bouton (pas de <button> dans un <a>).
const secondaryLink =
  "inline-flex items-center h-8 px-3 rounded-md text-sm font-medium bg-surface text-ink border border-border hover:border-ink/30";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [property, setProperty] = React.useState<Property | null>(null);
  const [rates, setRates] = React.useState<PricingRate[]>([]);
  const [ratesLoaded, setRatesLoaded] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [loadError, setLoadError] = React.useState<unknown>(null);
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!params?.id || !user) return;
    let cancelled = false;
    setLoadError(null);
    Promise.all([api.getProperty(params.id), api.getPricingRates(params.id)])
      .then(([p, r]) => {
        if (cancelled) return;
        setProperty(p);
        setRates(r as unknown as PricingRate[]);
        setRatesLoaded(true);
      })
      .catch((e) => {
        if (!cancelled) setLoadError(e);
      });
    return () => {
      cancelled = true;
    };
  }, [params?.id, user, tick]);

  if (loadError) {
    return isNotFound(loadError) ? (
      <EmptyState title={t("pf.notFound")} />
    ) : (
      <ErrorState error={loadError} title={t("pf.loadError")} onRetry={() => setTick((n) => n + 1)} />
    );
  }

  // Un bien d'un autre propriétaire (publié) reste lisible publiquement :
  // on n'ouvre l'édition qu'à son propriétaire.
  // Pro mandataire : l'API (PATCH) tranche ; un bien hors portefeuille → 403 clair.
  if (property && user && property.ownerId !== user.id && user.role !== "ADMIN" && user.role !== "AGENT") {
    return <EmptyState title={t("pf.notFound")} />;
  }

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

      // F10 : prix facultatif quand la grille est remplie (0 = « voir grille »).
      // Les photos existantes sont renvoyées par leur URL https (contrat §6).
      await api.updateProperty(property.id, {
        ...toPropertyBody(rest),
        price: Number(rest.price) > 0 ? Number(rest.price) : 0,
        media: mediaUrls.map((url, i) => ({ url, position: i })),
      });

      // Grille vidée en vente (aucun tarif) : on envoie une liste vide.
      await api.upsertPricingRates(
        property.id,
        rest.listingType === "RENT"
          ? validRates.map((r) => ({ unit: r.unit, amount: Number(r.amount) }))
          : [],
      );

      toast.success(t("pf.saved"));
      router.push(user?.role === "AGENT" ? `/dashboard/${property.id}` : "/dashboard");
    } catch (e) {
      toast.error(e);
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
        className="rounded-2xl border border-border/60 px-5 sm:px-8 py-8 mb-8"
      >
        <Link
          href={user?.role === "AGENT" ? `/dashboard/${property.id}` : "/dashboard"}
          className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink mb-3 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t("pf.back")}
        </Link>
        <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
          {property.status === "PUBLISHED"
            ? t("pf.edit.published")
            : property.status === "DRAFT"
              ? t("pf.edit.draft")
              : tUi(`ui.status.${property.status}`)}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl mb-2 [overflow-wrap:anywhere]">
          {t("pf.edit.title")} <span className="gradient-text">{property.title}</span>
        </h1>
        <p className="text-ink-muted [overflow-wrap:anywhere]">
          {property.city}, {property.country} · {property.surface} m² · {property.rooms} {property.rooms > 1 ? t("pf.edit.roomsPlural") : t("pf.edit.room")}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          <Link href={`/dashboard/${property.id}/documents`} className={secondaryLink}>
            {t("pf.edit.docs")}
          </Link>
          {property.listingType === "RENT" && (
            <Link href={`/dashboard/${property.id}/lease`} className={secondaryLink}>
              {t("pf.edit.leases")}
            </Link>
          )}
          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center h-8 px-3 rounded-md text-sm font-medium text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40"
          >
            {t("pf.edit.preview")}
          </Link>
        </div>
      </AnimatedBackground>

      <PropertyForm
        initial={initial}
        onSubmit={onSubmit}
        submitting={submitting}
        submitLabel={t("pf.edit.submit")}
      />
    </section>
  );
}
