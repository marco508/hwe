"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Badge, Card, CardBody, CardHeader } from "@hwe/ui";
import { api } from "../../../lib/api";
import { useCurrency } from "../../../lib/currency-context";
import type { Property } from "@hwe/types";

const formatPrice = (n: number, currency = "EUR") =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const { format: fmtPrice } = useCurrency();
  const [p, setP] = React.useState<Property | null>(null);

  React.useEffect(() => {
    if (params?.id) api.getProperty(params.id).then(setP);
  }, [params?.id]);

  if (!p) return <p className="text-ink-muted">Chargement…</p>;

  return (
    <article className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <header>
          <div className="flex gap-2 mb-3">
            <Badge tone={p.listingType === "SALE" ? "accent" : "brand"}>
              {p.listingType === "SALE" ? "Vente" : "Location"}
            </Badge>
            <Badge>{p.propertyType}</Badge>
          </div>
          <h1 className="font-display text-3xl mb-1">{p.title}</h1>
          <div className="text-ink-muted">
            {p.addressLine}, {p.postalCode} {p.city}
          </div>
        </header>

        {p.media.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {p.media.map((m) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={m.id}
                src={m.url}
                alt={m.alt ?? p.title}
                className="rounded-md w-full aspect-[4/3] object-cover border border-border"
              />
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">Description</h2>
          </CardHeader>
          <CardBody>
            <p className="whitespace-pre-line text-sm">{p.description}</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">Caractéristiques</h2>
          </CardHeader>
          <CardBody className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-sm">
            <div><span className="text-ink-muted">Surface</span><div>{p.surface} m²</div></div>
            <div><span className="text-ink-muted">Pièces</span><div>{p.rooms}</div></div>
            <div><span className="text-ink-muted">Chambres</span><div>{p.bedrooms}</div></div>
            <div><span className="text-ink-muted">Salles de bain</span><div>{p.bathrooms}</div></div>
            {p.floor !== null && <div><span className="text-ink-muted">Étage</span><div>{p.floor}</div></div>}
            {p.yearBuilt && <div><span className="text-ink-muted">Année</span><div>{p.yearBuilt}</div></div>}
            <div><span className="text-ink-muted">Meublé</span><div>{p.furnished ? "Oui" : "Non"}</div></div>
            <div><span className="text-ink-muted">Parking</span><div>{p.hasParking ? "Oui" : "Non"}</div></div>
            <div><span className="text-ink-muted">Balcon</span><div>{p.hasBalcony ? "Oui" : "Non"}</div></div>
            <div><span className="text-ink-muted">Jardin</span><div>{p.hasGarden ? "Oui" : "Non"}</div></div>
            <div><span className="text-ink-muted">Ascenseur</span><div>{p.hasElevator ? "Oui" : "Non"}</div></div>
          </CardBody>
        </Card>
      </div>

      <aside className="space-y-4">
        <Card>
          <CardBody>
            <div className="text-3xl font-display text-brand-700">
              {formatPrice(p.price, p.currency)}
              {p.listingType === "RENT" && (
                <span className="text-sm font-normal text-ink-muted"> /mois</span>
              )}
            </div>
            <div className="text-sm text-ink-muted mt-2">
              {p.surface} m² · {p.rooms} {p.rooms > 1 ? "pièces" : "pièce"}
            </div>
          </CardBody>
        </Card>

        {p.owner && (
          <Card>
            <CardHeader>
              <h2 className="font-display text-lg">Propriétaire</h2>
            </CardHeader>
            <CardBody className="text-sm space-y-1">
              <div>
                {p.owner.firstName} {p.owner.lastName}
              </div>
              <div className="text-ink-muted">{p.owner.email}</div>
              {p.owner.phone && (
                <div className="text-ink-muted">{p.owner.phone}</div>
              )}
            </CardBody>
          </Card>
        )}
      </aside>
    </article>
  );
}
