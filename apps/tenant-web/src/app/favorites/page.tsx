"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EmptyState, ErrorState, PropertyCard, toast, useAsync, useLoginRedirect, Icon } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { useCurrency } from "../../lib/currency-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import type { Favorite } from "@hwe/types";

export default function FavoritesPage() {
  const auth = useAuth();
  const { user, loading } = auth;
  const { format: fmtPrice } = useCurrency();
  const router = useRouter();
  const [removing, setRemoving] = React.useState<string | null>(null);
  useLoginRedirect(auth, router);

  // Erreur de chargement ≠ liste vide (L1, L2).
  const { data, setData, error, loading: working, reload } = useAsync<Favorite[]>(
    () => api.listFavorites(),
    [user?.id],
    { enabled: !!user },
  );
  const items = data ?? [];

  const remove = async (propertyId: string) => {
    setRemoving(propertyId);
    try {
      await api.removeFavorite(propertyId);
      setData((prev) => (prev ?? []).filter((f) => f.propertyId !== propertyId));
      toast.success(t("fix.fav.removed"));
    } catch (e) {
      toast.error(e);
    } finally {
      setRemoving(null);
    }
  };

  if (loading || !user || (working && !data)) return <p className="text-ink-muted">{t("com.loading")}</p>;

  return (
    <section className="min-w-0">
      <h1 className="font-display text-3xl mb-2">{t("com.fav.title")}</h1>
      <p className="text-ink-muted mb-8">{t("com.fav.sub")}</p>

      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : items.length === 0 ? (
        <EmptyState
          illustration="heart"
          title={t("com.fav.emptyTitle")}
          description={t("com.fav.emptyDesc")}
          action={
            <Link href="/" className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
              {t("vis.browse")}
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((fav) => {
            const p = fav.property;
            if (!p) return null;
            return (
              <PropertyCard
                key={fav.id}
                title={p.title}
                city={p.city}
              price={p.displayPrice ?? p.price}
              currency={p.currency}
              displayPrice={fmtPrice(p.displayPrice ?? p.price, p.currency)}
                priceUnit={p.priceUnit}
                status={p.status}
                surface={p.surface}
                rooms={p.rooms}
                listingType={p.listingType}
                propertyType={p.propertyType}
                thumbnailUrl={p.media?.[0]?.url ?? null}
                href={`/properties/${p.id}`}
                footer={
                  <button
                    type="button"
                    disabled={removing === p.id}
                    onClick={() => remove(p.id)}
                    className="flex items-center gap-1 text-sm font-medium text-danger hover:underline disabled:opacity-50 transition-colors"
                  >
                    <Icon name="heart" size={15} className="fill-current" />
                    {removing === p.id ? t("com.fav.removing") : t("com.fav.remove")}
                  </button>
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
