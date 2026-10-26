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
  ManagedByBadge,
  Select,
  SUPPORTED_COUNTRIES,
  countryLabel,
  loginHref,
  toast,
  Icon,
  CityCard,
  FEATURED_CITIES,
  announceCountryChoice,
} from "@hwe/ui";
import { useRouter } from "next/navigation";
import { HomeTodo } from "../components/HomeTodo";
import { api } from "../lib/api";
import { useCurrency } from "../lib/currency-context";
import { useAuth } from "../lib/auth-context";
import { t } from "../lib/i18n";
import type { Property, PropertyQuery } from "@hwe/types";

const PAGE_SIZE = 24;

/**
 * Critères de recherche dans l'URL (« /?ville=Cotonou&prixmax=500 ») : un
 * retour depuis une annonce retrouve la même recherche.
 */
const URL_KEYS = {
  listingType: "type",
  propertyType: "bien",
  country: "pays",
  city: "ville",
  maxPrice: "prixmax",
  minSurface: "surfacemin",
} as const;
type UrlKey = keyof typeof URL_KEYS;
const NUMERIC: UrlKey[] = ["maxPrice", "minSurface"];

function filtersFromUrl(search: string): PropertyQuery {
  const sp = new URLSearchParams(search);
  const out: Record<string, string | number> = {};
  for (const [k, name] of Object.entries(URL_KEYS) as [UrlKey, string][]) {
    const v = sp.get(name)?.trim();
    if (!v) continue;
    if (NUMERIC.includes(k)) {
      const n = Number(v);
      if (Number.isFinite(n) && n >= 0) out[k] = n;
    } else {
      out[k] = v;
    }
  }
  return out as PropertyQuery;
}

function filtersToUrl(f: PropertyQuery): string {
  const sp = new URLSearchParams();
  for (const [k, name] of Object.entries(URL_KEYS) as [UrlKey, string][]) {
    const v = (f as Record<string, unknown>)[k];
    if (v !== undefined && v !== null && v !== "") sp.set(name, String(v));
  }
  const q = sp.toString();
  return q ? `/?${q}` : "/";
}

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
      <Icon name="heart" size={16} className={isFav ? "fill-current" : ""} />
      {isFav ? t("acc.fav.saved") : t("acc.fav.save")}
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
  const router = useRouter();
  // Critères lus dans l'URL au chargement (aucune requête avant).
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const initial = filtersFromUrl(window.location.search);
    setDraft(initial);
    setFilters(initial);
    setReady(true);
  }, []);

  // Critères appliqués → URL (remplacement : pas d'entrée d'historique par frappe).
  React.useEffect(() => {
    if (!ready) return;
    const target = filtersToUrl(filters);
    if (target !== window.location.pathname + window.location.search) router.replace(target, { scroll: false });
  }, [filters, ready, router]);

  // Saisie : application automatique après 400 ms sans frappe (debounce).
  React.useEffect(() => {
    // Mêmes critères → même objet : pas de rechargement inutile.
    const id = setTimeout(() => setFilters((prev) => (JSON.stringify(prev) === JSON.stringify(draft) ? prev : draft)), 400);
    return () => clearTimeout(id);
  }, [draft]);

  // Chargement de la page 1 à chaque changement de critères ; la requête
  // précédente est annulée → jamais de réponse hors ordre.
  React.useEffect(() => {
    if (!ready) return;
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
  }, [filters, tick, ready]);

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

  const hasFilters = Object.values(filters).some((v) => v !== undefined && v !== "");

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

      {/* À faire : ce qui attend le locataire / voyageur (seulement ce qui existe). */}
      {user && <HomeTodo user={user} />}

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
                onChange={(e) => {
                  setDraft({ ...draft, country: e.target.value || undefined });
                  // Choisir un pays règle la devise d'affichage sur celle du pays.
                  if (e.target.value) announceCountryChoice(e.target.value);
                }}
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
                  setDraft({
                    ...draft,
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
                  setDraft({
                    ...draft,
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

      {/* Destinations populaires : une photo par ville, un clic = filtre ville */}
      {!hasFilters && (
        <div className="mb-10 min-w-0">
          <div className="flex items-end justify-between gap-3 mb-3">
            <div className="min-w-0">
              <h2 className="font-display text-xl text-ink">{t("vis.dest.title")}</h2>
              <p className="text-xs text-ink-muted">{t("vis.dest.sub")}</p>
            </div>
          </div>
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
            {FEATURED_CITIES.slice(0, 6).map((c) => (
              <CityCard
                key={c.name}
                name={c.name}
                className="w-36 sm:w-44 lg:w-auto shrink-0 snap-start"
                sizes="(min-width: 1024px) 16vw, 176px"
                cta={<span>{t("vis.dest.see")}</span>}
                onClick={() => {
                  const next = { ...draft, city: c.name, country: c.country };
                  setDraft(next);
                  setFilters(next);
                }}
              />
            ))}
          </div>
        </div>
      )}

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
          illustration="search"
          title={t("acc.list.emptyTitle")}
          description={t("acc.list.emptyDesc")}
          action={
            hasFilters ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setDraft({});
                  setFilters({});
                }}
              >
                {t("vis.resetFilters")}
              </Button>
            ) : undefined
          }
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
                <div className="flex items-center justify-between gap-2 flex-wrap min-w-0">
                  {user ? (
                    <HeartButton
                      propertyId={p.id}
                      isFav={favIds.has(p.id)}
                      onToggle={toggleFav}
                    />
                  ) : (
                    <Link href={loginHref(filtersToUrl(filters))} className="text-sm text-ink-muted hover:underline">
                      <Icon name="heart" size={16} className="me-1" />
                      {t("acc.fav.save")}
                    </Link>
                  )}
                  {p.managedBy && (
                    <ManagedByBadge
                      name={p.managedBy.name}
                      logoUrl={p.managedBy.logoUrl}
                      label={t("pro.offeredByName", { name: p.managedBy.name })}
                    />
                  )}
                </div>
              }
            />
          ))}
        </div>
      )}

      {/* Pagination réelle (F15) : total connu, chargement par lots. */}
      {!loading && !error && items.length > 0 && (
        <div className="mt-10 flex flex-col items-center gap-3 text-sm text-ink-muted">
          <span>{t("fix.home.shown", { count: items.length, total })}</span>
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
