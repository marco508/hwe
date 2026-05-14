"use client";

import * as React from "react";
import Link from "next/link";
import { PropertyCard, EmptyState } from "@hwe/ui";
import { api } from "../lib/api";
import type { Property } from "@hwe/types";

export default function HomePage() {
  const [items, setItems] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api
      .listProperties({ pageSize: 24 })
      .then((r) => setItems(r.items))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <header className="mb-8">
        <h1 className="font-display text-3xl mb-2">Le marché immobilier</h1>
        <p className="text-ink-muted max-w-2xl">
          Tous les biens publiés sur la plateforme. Côté propriétaire,
          retrouvez la liste des annonces de vos confrères pour comparer prix
          et tendances.
        </p>
      </header>

      {loading ? (
        <p className="text-ink-muted">Chargement…</p>
      ) : items.length === 0 ? (
        <EmptyState
          title="Aucun bien pour le moment"
          description="Soyez le premier à publier une annonce."
          action={
            <Link
              href="/dashboard/new"
              className="inline-block rounded-md bg-brand-600 px-4 h-10 leading-10 text-white text-sm"
            >
              Ajouter un bien
            </Link>
          }
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
              surface={p.surface}
              rooms={p.rooms}
              listingType={p.listingType}
              propertyType={p.propertyType}
              thumbnailUrl={p.media?.[0]?.url ?? null}
              href={`/properties/${p.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
