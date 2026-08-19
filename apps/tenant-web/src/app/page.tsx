"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardBody, EmptyState, Input, Label, PropertyCard, Select } from "@hwe/ui";
import { api } from "../lib/api";
import { useCurrency } from "../lib/currency-context";
import { useAuth } from "../lib/auth-context";
import { t } from "../lib/i18n";
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
      aria-label={isFav ? t("acc.fav.remove") : t("acc.fav.add")}
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
      {isFav ? "♥" : "♡"} {isFav ? t("acc.fav.saved") : t("acc.fav.save")}
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
        <h1 className="font-display text-3xl mb-2">{t("home.title")}</h1>
        <p className="text-ink-muted max-w-2xl">
          {t("home.sub")}
        </p>
      </header>

      {/* Mon espace : tout ce que le locataire peut faire, en un coup d'œil */}
      {user && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { href: "/ma-location", icon: "🏠", label: t("home.tile.rental"), hint: t("home.tile.rentalHint") },
            { href: "/mes-loyers", icon: "💶", label: t("home.tile.rents"), hint: t("home.tile.rentsHint") },
            { href: "/mes-visites", icon: "📅", label: t("home.tile.visits"), hint: t("home.tile.visitsHint") },
            { href: "/inquiries", icon: "📨", label: t("home.tile.requests"), hint: t("home.tile.requestsHint") },
            { href: "/messages", icon: "💬", label: t("home.tile.messages"), hint: t("home.tile.messagesHint") },
            { href: "/profile", icon: "📁", label: t("home.tile.dossier"), hint: t("home.tile.dossierHint") },
          ].map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 transition-colors"
            >
              <span className="text-2xl">{t.icon}</span>
              <p className="mt-2 font-medium group-hover:text-brand-600 dark:group-hover:text-brand-300">
                {t.label}
              </p>
              <p className="text-xs text-ink-muted">{t.hint}</p>
            </Link>
          ))}
        </div>
      )}

      <Card className="mb-8">
        <CardBody>
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 items-end"
          >
            <div className="space-y-1">
              <Label>{t("acc.search.type")}</Label>
              <Select
                value={filters.listingType ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, listingType: (e.target.value || undefined) as any })
                }
              >
                <option value="">{t("acc.search.all")}</option>
                <option value="RENT">{t("acc.search.rent")}</option>
                <option value="SALE">{t("acc.search.sale")}</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>{t("acc.search.property")}</Label>
              <Select
                value={filters.propertyType ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: (e.target.value || undefined) as any })
                }
              >
                <option value="">{t("acc.search.all")}</option>
                <option value="APARTMENT">{t("acc.search.propertyType.APARTMENT")}</option>
                <option value="HOUSE">{t("acc.search.propertyType.HOUSE")}</option>
                <option value="STUDIO">{t("acc.search.propertyType.STUDIO")}</option>
                <option value="LAND">{t("acc.search.propertyType.LAND")}</option>
                <option value="COMMERCIAL">{t("acc.search.propertyType.COMMERCIAL")}</option>
                <option value="OTHER">{t("acc.search.propertyType.OTHER")}</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>{t("acc.search.country")}</Label>
              <Input
                placeholder={t("acc.search.countryPlaceholder")}
                value={filters.country ?? ""}
                onChange={(e) => setFilters({ ...filters, country: e.target.value || undefined })}
              />
            </div>
            <div className="space-y-1">
              <Label>{t("acc.search.city")}</Label>
              <Input
                value={filters.city ?? ""}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>{t("acc.search.maxPrice")}</Label>
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
              <Label>{t("acc.search.minSurface")}</Label>
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
              {t("acc.search.submit")}
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
          title={t("acc.list.emptyTitle")}
          description={t("acc.list.emptyDesc")}
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
                    ♡ {t("acc.fav.save")}
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
