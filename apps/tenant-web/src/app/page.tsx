"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardBody, EmptyState, Input, Label, PropertyCard, Select } from "@hwe/ui";
import { api } from "../lib/api";
import { useCurrency } from "../lib/currency-context";
import { useAuth } from "../lib/auth-context";
import type { Property, PropertyQuery } from "@hwe/types";

function HeartButton({
  propertyId,
  isFav,
  onToggle,
}: {
  propertyId: string;
  isFav: boolean;
  onToggle: (propertyId: string) => void;
}) {
  return (
    <button
      type="button"
      aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle(propertyId);
      }}
      className={`flex items-center gap-1 text-sm font-medium transition-colors ${
        isFav
          ? "text-red-500 hover:text-red-700"
          : "text-ink-muted hover:text-red-400"
      }`}
    >
      {isFav ? "♥" : "♡"} {isFav ? "Sauvegardé" : "Sauvegarder"}
    </button>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  const { format: fmtPrice } = useCurrency();
  const [items, setItems] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<PropertyQuery>({});
  const [favIds, setFavIds] = React.useState<Set<string>>(new Set());

  const load = React.useCallback(() => {
    setLoading(true);
    api
      .listProperties({ ...filters, pageSize: 24 })
      .then((r) => setItems(r.items))
      .finally(() => setLoading(false));
  }, [filters]);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    if (!user) { setFavIds(new Set()); return; }
    api.favoriteIds().then((r) => setFavIds(new Set(r.ids)));
  }, [user]);

  const toggleFav = async (propertyId: string) => {
    if (!user) return;
    const wasFav = favIds.has(propertyId);
    setFavIds((prev) => {
      const next = new Set(prev);
      wasFav ? next.delete(propertyId) : next.add(propertyId);
      return next;
    });
    try {
      if (wasFav) {
        await api.removeFavorite(propertyId);
      } else {
        await api.addFavorite(propertyId);
      }
    } catch {
      setFavIds((prev) => {
        const next = new Set(prev);
        wasFav ? next.add(propertyId) : next.delete(propertyId);
        return next;
      });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    load();
  };

  return (
    <section>
      <header className="mb-8">
        <h1 className="font-display text-3xl mb-2">Trouvez votre logement</h1>
        <p className="text-ink-muted max-w-2xl">
          Annonces publiées par les propriétaires. Contactez-les directement.
        </p>
      </header>

      <Card className="mb-8">
        <CardBody>
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 items-end"
          >
            <div className="space-y-1">
              <Label>Type</Label>
              <Select
                value={filters.listingType ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, listingType: (e.target.value || undefined) as any })
                }
              >
                <option value="">Tous</option>
                <option value="RENT">Location</option>
                <option value="SALE">Vente</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Bien</Label>
              <Select
                value={filters.propertyType ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: (e.target.value || undefined) as any })
                }
              >
                <option value="">Tous</option>
                <option value="APARTMENT">Appartement</option>
                <option value="HOUSE">Maison</option>
                <option value="STUDIO">Studio</option>
                <option value="LAND">Terrain</option>
                <option value="COMMERCIAL">Local</option>
                <option value="OTHER">Autre</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Pays</Label>
              <Input
                placeholder="ex : France"
                value={filters.country ?? ""}
                onChange={(e) => setFilters({ ...filters, country: e.target.value || undefined })}
              />
            </div>
            <div className="space-y-1">
              <Label>Ville</Label>
              <Input
                value={filters.city ?? ""}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Prix max</Label>
              <Input
                type="number"
                min={0}
                value={filters.maxPrice ?? ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Surface min (m²)</Label>
              <Input
                type="number"
                min={0}
                value={filters.minSurface ?? ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minSurface: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="h-10 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
            >
              Rechercher
            </button>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/5] rounded-2xl skeleton" />
              <div className="pt-3 px-1 space-y-2">
                <div className="h-4 w-3/4 rounded skeleton" />
                <div className="h-3 w-1/2 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="Aucun bien ne correspond"
          description="Essayez d'élargir vos critères."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <PropertyCard
              key={p.id}
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
                user ? (
                  <HeartButton
                    propertyId={p.id}
                    isFav={favIds.has(p.id)}
                    onToggle={toggleFav}
                  />
                ) : (
                  <Link href="/login" className="text-sm text-ink-muted hover:underline">
                    ♡ Sauvegarder
                  </Link>
                )
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
