"use client";

import * as React from "react";
import Link from "next/link";
import {
  Button,
  EmptyState,
  ErrorState,
  PropertyCard,
  AnimatedBackground,
  isApiError,
  toast,
  useAsync,
  useCurrency,
} from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { ActionCenter } from "../../components/ActionCenter";
import { t } from "../../lib/i18n";
import { IlloManage, Icon, IconBadge, ManagedByBadge, type IconName } from "@hwe/ui";
import type { Property } from "@hwe/types";

// Lien stylé en bouton (évite <button> dans <a>, HTML invalide — M3).
const linkBtn =
  "inline-flex items-center justify-center h-8 px-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

export default function DashboardPage() {
  // La garde de rôle/session est dans dashboard/layout.tsx.
  const { user } = useAuth();
  const { convert, canConvert, format, userCurrency } = useCurrency();
  const { data, setData, error, loading: working, reload } = useAsync(
    () => api.listMine(),
    [user?.id],
    { enabled: !!user },
  );
  const items: Property[] = data ?? [];
  const setItems = (fn: (s: Property[]) => Property[]) => setData((cur) => fn(cur ?? []));

  const onDelete = async (id: string) => {
    if (!confirm(t("acc.confirmDeleteProperty"))) return;
    try {
      await api.deleteProperty(id);
      setItems((s) => s.filter((p) => p.id !== id));
      toast.success(t("dash.deleted"));
    } catch (e) {
      // Contrat §8 : bien ayant eu un bail → 409, on propose l'archivage.
      if (isApiError(e) && e.status === 409) {
        if (!confirm(t("dash.archiveInstead"))) return;
        try {
          const updated = await api.updateProperty(id, { status: "ARCHIVED" });
          setItems((s) => s.map((p) => (p.id === id ? { ...p, ...updated } : p)));
          toast.success(t("dash.archived"));
        } catch (e2) {
          toast.error(e2);
        }
        return;
      }
      toast.error(e);
    }
  };

  if (error && !data) {
    return <ErrorState error={error} title={t("dash.loadError")} onRetry={reload} />;
  }

  if (working && !data) {
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
  // Moyenne convertie dans la devise d'affichage, sur les seuls biens
  // convertibles (jamais de taux implicite entre devises — F2).
  const convertible = items.filter((p) => p.price > 0 && canConvert(p.currency));
  const avgPrice =
    convertible.length > 0
      ? Math.round(convertible.reduce((s, p) => s + convert(p.price, p.currency), 0) / convertible.length)
      : 0;

  return (
    <section>
      {/* Hero header */}
      <AnimatedBackground
        variant="aurora"
        className="rounded-2xl border border-border/60 px-5 sm:px-8 py-8 mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-glow" />
              {t("dash.badge")}
            </span>
            <h1 className="font-display text-4xl mb-1">
              {t("dash.title1")} <span className="gradient-text">{t("dash.title2")}</span>
            </h1>
            <p className="text-ink-muted">
              {t("dash.sub")}
            </p>
          </div>
          <IlloManage className="hidden lg:block w-52" />
          <Link
            href="/dashboard/new"
            className="inline-flex items-center justify-center h-12 px-6 rounded-md text-base font-medium text-white hover:text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 shadow-md hover:shadow-glow"
          >
            <Icon name="plus" size={18} strokeWidth={2.2} className="mr-1.5" /> {t("dash.add")}
          </Link>
        </div>

        {/* Mini stats */}
        {totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 stagger">
            <StatCard icon="home" value={totalCount} label={t("dash.stat.published")} />
            <StatCard icon="key" value={rentCount} label={t("dash.stat.rent")} />
            <StatCard icon="tag" value={saleCount} label={t("dash.stat.sale")} />
            <StatCard
              icon="wallet"
              value={avgPrice ? format(avgPrice, userCurrency) : "—"}
              title={t("dash.avgNote")}
              label={t("dash.stat.avg")}
            />
          </div>
        )}
      </AnimatedBackground>

      <ActionCenter />

      {items.length === 0 ? (
        <EmptyState
          illustration="home"
          title={t("acc.dash.emptyTitle")}
          description={t("acc.dash.emptySub")}
          action={
            <Link
              href="/dashboard/new"
              className="inline-flex items-center justify-center h-10 px-4 rounded-md text-sm font-medium text-white hover:text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 shadow-md"
            >
              {t("acc.dash.addProperty")}
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
              price={p.displayPrice ?? p.price}
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
              // displayPrice = montant de l'unité priceUnit (contrat API) ; vente : prix.
              displayPrice={(p.displayPrice ?? p.price) > 0 ? format(p.displayPrice ?? p.price, p.currency) : "—"}
              priceUnit={p.priceUnit}
              status={p.status}
              href={`/properties/${p.id}`}
              footer={
                <div className="space-y-2">
                {p.managedBy && <ManagedByBadge name={p.managedBy.name} logoUrl={p.managedBy.logoUrl} />}
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/dashboard/${p.id}`}
                    className={`${linkBtn} text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40`}
                    title={t("pro.hub.manage")}
                    aria-label={t("pro.hub.manage")}
                  >
                    <Icon name="layers" size={16} />
                  </Link>
                  <Link
                    href={`/dashboard/${p.id}/edit`}
                    className={`${linkBtn} flex-1 bg-surface text-ink border border-border hover:border-ink/30`}
                  >
                    {t("acc.edit")}
                  </Link>
                  <Link
                    href={`/dashboard/${p.id}/documents`}
                    className={`${linkBtn} text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40`}
                    title={t("acc.docs.title")}
                    aria-label={t("acc.docs.title")}
                  >
                    <Icon name="folder" size={16} />
                  </Link>
                  {p.listingType === "RENT" && (
                    <Link
                      href={`/dashboard/${p.id}/lease`}
                      className={`${linkBtn} text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40`}
                      title={t("acc.dash.leases")}
                      aria-label={t("acc.dash.leases")}
                    >
                      <Icon name="clipboard" size={16} />
                    </Link>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(p.id)}
                  >
                    {t("acc.delete")}
                  </Button>
                </div>
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
  title,
}: {
  icon: IconName;
  value: React.ReactNode;
  label: string;
  title?: string;
}) {
  return (
    <div
      className="glass rounded-xl px-4 py-3 hover-lift min-w-0"
      title={title ?? (typeof value === "string" ? value : undefined)}
    >
      <div className="flex items-center gap-3 min-w-0">
        <IconBadge name={icon} size="sm" />
        <div className="min-w-0">
          {/* Un montant ne se coupe jamais au milieu (« 520 00 / 0 € ») : tronqué au pire, valeur en infobulle. */}
          <div className="font-display text-lg sm:text-xl leading-tight gradient-text whitespace-nowrap truncate">
            {value}
          </div>
          <div className="text-[11px] text-ink-muted mt-0.5">{label}</div>
        </div>
      </div>
    </div>
  );
}
