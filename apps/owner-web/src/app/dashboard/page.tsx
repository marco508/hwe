"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  EmptyState,
  PropertyCard,
  AnimatedBackground,
} from "@hwe/ui";
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

  if (loading || working) {
    return (
      <div className="space-y-6">
        <div className="h-32 rounded-2xl skeleton" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface overflow-hidden"
            >
              <div className="aspect-[4/3] skeleton" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded skeleton" />
                <div className="h-4 w-1/2 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Stats simples calculées localement
  const totalCount = items.length;
  const rentCount = items.filter((p) => p.listingType === "RENT").length;
  const saleCount = items.filter((p) => p.listingType === "SALE").length;
  const avgPrice =
    items.length > 0
      ? Math.round(items.reduce((s, p) => s + p.price, 0) / items.length)
      : 0;

  return (
    <section>
      {/* Hero header */}
      <AnimatedBackground
        variant="aurora"
        className="rounded-2xl border border-border/60 px-8 py-8 mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-glow" />
              Tableau de bord
            </span>
            <h1 className="font-display text-4xl mb-1">
              Mes <span className="gradient-text">biens</span>
            </h1>
            <p className="text-ink-muted">
              Gérez vos annonces à la vente ou à la location en un coup d'œil.
            </p>
          </div>
          <Link href="/dashboard/new">
            <Button variant="gradient" size="lg">
              <span className="mr-1">＋</span> Ajouter un bien
            </Button>
          </Link>
        </div>

        {/* Mini stats */}
        {totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 stagger">
            <StatCard icon="🏠" value={totalCount} label="Biens publiés" />
            <StatCard icon="🔑" value={rentCount} label="En location" />
            <StatCard icon="🏷️" value={saleCount} label="À la vente" />
            <StatCard
              icon="💶"
              value={
                avgPrice
                  ? new Intl.NumberFormat("fr-FR", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(avgPrice) + " €"
                  : "—"
              }
              label="Prix moyen"
            />
          </div>
        )}
      </AnimatedBackground>

      {items.length === 0 ? (
        <EmptyState
          title="Vous n'avez encore aucun bien"
          description="Publiez votre première annonce en quelques minutes. Photos, surface, prix : tout se fait en un seul écran."
          action={
            <Link href="/dashboard/new">
              <Button variant="gradient">Ajouter un bien</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
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
              images={(p.media ?? []).map((m) => ({
                url: m.url,
                alt: m.alt ?? p.title,
              }))}
              thumbnailUrl={p.media?.[0]?.url ?? null}
              footer={
                <div className="flex gap-2 flex-wrap">
                  <Link href={`/dashboard/${p.id}/edit`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      Modifier
                    </Button>
                  </Link>
                  <Link href={`/dashboard/${p.id}/documents`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Documents légaux"
                    >
                      🗂️
                    </Button>
                  </Link>
                  {p.listingType === "RENT" && (
                    <Link href={`/dashboard/${p.id}/lease`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Contrats de location"
                      >
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

function StatCard({
  icon,
  value,
  label,
}: {
  icon: string;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="glass rounded-xl px-4 py-3 hover-lift">
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <div>
          <div className="font-display text-xl leading-none gradient-text">
            {value}
          </div>
          <div className="text-[11px] text-ink-muted mt-0.5">{label}</div>
        </div>
      </div>
    </div>
  );
}
