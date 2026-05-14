"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, EmptyState, PropertyCard } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import type { Property } from "@hwe/types";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = React.useState<Property[]>([]);
  const [working, setWorking] = React.useState(true);

  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    api.listMine().then((r) => {
      setItems(r);
      setWorking(false);
    });
  }, [user, loading, router]);

  const onDelete = async (id: string) => {
    if (!confirm("Supprimer ce bien ?")) return;
    await api.deleteProperty(id);
    setItems((s) => s.filter((p) => p.id !== id));
  };

  if (loading || working) return <p className="text-ink-muted">Chargement…</p>;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl mb-1">Mes biens</h1>
          <p className="text-ink-muted">
            Gérez vos annonces à la vente ou à la location.
          </p>
        </div>
        <Link href="/dashboard/new">
          <Button>+ Ajouter un bien</Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Vous n'avez encore aucun bien"
          description="Publiez votre première annonce en quelques minutes."
          action={
            <Link href="/dashboard/new">
              <Button>Ajouter un bien</Button>
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
              footer={
                <div className="flex gap-2 flex-wrap">
                  <Link href={`/dashboard/${p.id}/edit`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      Modifier
                    </Button>
                  </Link>
                  <Link href={`/dashboard/${p.id}/documents`}>
                    <Button variant="ghost" size="sm" title="Documents légaux">
                      🗂️
                    </Button>
                  </Link>
                  {p.listingType === "RENT" && (
                    <Link href={`/dashboard/${p.id}/lease`}>
                      <Button variant="ghost" size="sm" title="Contrats de location">
                        📋
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(p.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
