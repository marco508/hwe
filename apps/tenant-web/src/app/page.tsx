"use client";

import * as React from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  EmptyState,
  ErrorState,
  Input,
  Label,
  PropertyCard,
  Select,
  SUPPORTED_COUNTRIES,
  countryLabel,
  loginHref,
  toast,
} from "@hwe/ui";
import { api } from "../lib/api";
import { useCurrency } from "../lib/currency-context";
import { useAuth } from "../lib/auth-context";
import { t } from "../lib/i18n";
import type { Property, PropertyQuery } from "@hwe/types";

const PAGE_SIZE = 24;

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
      aria-pressed={isFav}
      onClick={() => onToggle(propertyId)}
      className={`flex items-center gap-1 text-sm font-medium transition-colors ${
        isFav
          ? "text-danger hover:underline"
          : "text-ink-muted hover:text-danger"
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
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);
  // `draft` = saisie en cours ; `filters` = critères appliqués (F15).
  const [draft, setDraft] = React.useState<PropertyQuery>({});
  const [filters, setFilters] = React.useState<PropertyQuery>({});
  const [favIds, setFavIds] = React.useState<Set<string>>(new Set());
  const [tick, setTick] = React.useState(0);
  const abortRef = React.useRef<AbortController | null>(null);

  // Saisie : application automatique après 400 ms sans frappe (debounce).
  React.useEffect(() => {
    const id = setTimeout(() => setFilters(draft), 400);
    return () => clearTimeout(id);
  }, [draft]);

  // Chargement de la page 1 à chaque changement de critères ; la requête
  // précédente est annulée → jamais de réponse hors ordre.
  React.useEffect(() => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);
    api
      .listProperties({ ...filters, page: 1, pageSize: PAGE_SIZE }, { signal: ctrl.signal })
      .then((r) => {
        if (ctrl.signal.aborted) return;
        setItems(r.items);
        setTotal(r.total ?? r.items.length);
        setPage(1);
      })
      .catch((e) => {
        if (!ctrl.signal.aborted) setError(e);
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });
    return () => ctrl.abort();
  }, [filters, tick]);

  const loadMore = async () => {
    const ctrl = abortRef.current;
    setLoadingMore(true);
    try {
      const r = await api.listProperties(
        { ...filters, page: page + 1, pageSize: PAGE_SIZE },
        { signal: ctrl?.signal },
      );
      setItems((prev) => {
        const seen = new Set(prev.map((p) => p.id));
        return [...prev, ...r.items.filter((p) => !seen.has(p.id))];
      });
      setTotal(r.total ?? total);
      setPage((n) => n + 1);
    } catch (e) {
      if (!(e as Error)?.name?.includes("Abort")) toast.error(e);
    } finally {
      setLoadingMore(false);
    }
  };

  React.useEffect(() => {
    if (!user) { setFavIds(new Set()); return; }
    api.favoriteIds().then((r) => setFavIds(new Set(r.ids))).catch(() => {});
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
    } catch (e) {
      setFavIds((prev) => {
        const next = new Set(prev);
        wasFav ? next.add(propertyId) : next.delete(propertyId);
        return next;
      });
      toast.error(e);
    }
  };

  // « Rechercher » applique immédiatement (sans attendre le debounce).
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...draft });
  };

  const countries = React.useMemo(
    () =>
      [...SUPPORTED_COUNTRIES]
        .map((c) => ({ code: c.code, label: countryLabel(c.code, c.name) }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [],
  );

  return (
    <section className="min-w-0">
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
              className="group min-w-0 rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 transition-colors"
            >
              <span className="text-2xl" aria-hidden="true">{t.icon}</span>
              <p className="mt-2 font-medium text-ink group-hover:text-brand-600 dark:group-hover:text-brand-300 [overflow-wrap:anywhere]">
                {t.label}
              </p>
              <p className="text-xs text-ink-muted [overflow-wrap:anywhere]">{t.hint}</p>
            </Link>
          ))}
        </div>
      )}

      <Card className="mb-8">
        <CardBody>
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 items-end"
          >
            <div className="space-y-1">
              <Label htmlFor="s-type">{t("acc.search.type")}</Label>
              <Select
                id="s-type"
                value={draft.listingType ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, listingType: (e.target.value || undefined) as any })
                }
              >
                <option value="">{t("acc.search.all")}</option>
                <option value="RENT">{t("acc.search.rent")}</option>
                <option value="SALE">{t("acc.search.sale")}</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-prop">{t("acc.search.property")}</Label>
              <Select
                id="s-prop"
                value={draft.propertyType ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, propertyType: (e.target.value || undefined) as any })
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
              <Label htmlFor="s-country">{t("acc.search.country")}</Label>
              {/* Pays stocké en code ISO (« FR ») : sélection par code, plus de texte libre. */}
              <Select
                id="s-country"
                value={draft.country ?? ""}
                onChange={(e) => setDraft({ ...draft, country: e.target.value || undefined })}
              >
                <option value="">{t("acc.search.all")}</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-city">{t("acc.search.city")}</Label>
              <Input
                id="s-city"
                value={draft.city ?? ""}
                onChange={(e) => setDraft({ ...draft, city: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-max">{t("acc.search.maxPrice")}</Label>
              <Input
                id="s-max"
                type="number"
                min={0}
                value={draft.maxPrice ?? ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-surf">{t("acc.search.minSurface")}</Label>
              <Input
                id="s-surf"
                type="number"
                min={0}
                value={draft.minSurface ?? ""}
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
              className="h-10 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
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
      ) : error ? (
        // API en panne ≠ « aucun bien » (L2).
        <ErrorState error={error} onRetry={() => setTick((n) => n + 1)} />
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
              price={p.displayPrice ?? p.price}
              currency={p.currency}
              displayPrice={fmtPrice(p.displayPrice ?? p.price, p.currency)}
              surface={p.surface}
              rooms={p.rooms}
              listingType={p.listingType}
              propertyType={p.propertyType}
              thumbnailUrl={p.media?.[0]?.url ?? null}
              priceUnit={p.priceUnit}
              status={p.status}
              href={`/properties/${p.id}`}
              footer={
                user ? (
                  <HeartButton
                    propertyId={p.id}
                    isFav={favIds.has(p.id)}
                    onToggle={toggleFav}
                  />
                ) : (
                  <Link href={loginHref("/")} className="text-sm text-ink-muted hover:underline">
                    ♡ {t("acc.fav.save")}
                  </Link>
                )
              }
            />
          ))}
        </div>
      )}

      {/* Pagination réelle (F15) : total connu, chargement par lots. */}
      {!loading && !error && items.length > 0 && (
        <div className="mt-10 flex flex-col items-center gap-3 text-sm text-ink-muted">
          <span>{t("fix.home.shown", { n: items.length, total })}</span>
          {items.length < total && (
            <Button variant="secondary" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? t("com.loading") : t("fix.home.more")}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
