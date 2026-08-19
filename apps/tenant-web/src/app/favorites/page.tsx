"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { EmptyState, PropertyCard } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { useCurrency } from "../../lib/currency-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import type { Favorite } from "@hwe/types";

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { format: fmtPrice } = useCurrency();
  const router = useRouter();
  const [items, setItems] = React.useState<Favorite[]>([]);
  const [working, setWorking] = React.useState(true);
  const [removing, setRemoving] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    api.listFavorites().then((r) => { setItems(r); setWorking(false); });
  }, [user, loading, router]);

  const remove = async (propertyId: string) => {
    setRemoving(propertyId);
    try {
      await api.removeFavorite(propertyId);
      setItems((prev) => prev.filter((f) => f.propertyId !== propertyId));
    } catch (e) {
      alert(t("com.error") + (e as Error).message);
    } finally {
      setRemoving(null);
    }
  };

  if (loading || working) return <p className="text-ink-muted">{t("com.loading")}</p>;

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">{t("com.fav.title")}</h1>
      <p className="text-ink-muted mb-8">
        {t("com.fav.sub")}
      </p>

      {items.length === 0 ? (
        <EmptyState
          title={t("com.fav.emptyTitle")}
          description={t("com.fav.emptyDesc")}
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
                price={p.price}
                currency={p.currency}
              displayPrice={fmtPrice(p.price, p.currency)}
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      remove(p.id);
                    }}
                    className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
                  >
                    ♥ {removing === p.id ? t("com.fav.removing") : t("com.fav.remove")}
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
