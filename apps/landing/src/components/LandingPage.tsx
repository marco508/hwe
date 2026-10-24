"use client";

import * as React from "react";
import {
  PropertyCard,
  SearchComposer,
  CategoryRail,
  SectionHeading,
  RevealOnScroll,
  CountryPicker,
  useLocation,
  SUPPORTED_COUNTRIES,
  ALL_COUNTRIES_CODE,
  useCurrency,
  Approx,
  IlloSearchHome,
  Photo,
  CityCard,
  Icon,
  IconBadge,
  FEATURED_CITIES,
  type IconName,
  type PhotoId,
  ErrorState,
  toast,
  tUi,
  countryLabel,
  TENANT_URL,
  OWNER_URL,
  fmtMoney,
  type CategoryRailItem,
} from "@hwe/ui";
import { t, useLang } from "../lib/i18n";
import { publicApi } from "../lib/api";
import { SiteProviders, SiteHeader, SiteFooter, ArrowRightIcon } from "../components/SiteShell";
import type { Property, ListingType, PropertyType, PropertyStats, Paginated, PublicPlans } from "@hwe/types";

// Taille de page du catalogue (l'API plafonne à 50, contrat §8).
const PAGE_SIZE = 24;
// Index léger pour les villes/destinations : jusqu'à INDEX_PAGES × 50 biens.
const INDEX_PAGE_SIZE = 50;
const INDEX_PAGES = 4;
// Clé de LocationContext (packages/ui) : voir la bascule « Tous les pays » plus bas.
const LOCATION_STORAGE_KEY = "hwe:location";

// ─── Catégories (traduites au rendu) — « Villas » retirée (doublon de Maisons) ─
function buildCategories(): CategoryRailItem[] {
  return [
    { id: "ALL", label: t("cats.all"), icon: <IconCompass /> },
    { id: "APARTMENT", label: t("cats.apartments"), icon: <IconBuilding /> },
    { id: "HOUSE", label: t("cats.houses"), icon: <IconHouse /> },
    { id: "STUDIO", label: t("cats.studios"), icon: <IconStudio /> },
    { id: "LAND", label: t("cats.land"), icon: <IconLand /> },
    { id: "COMMERCIAL", label: t("cats.commercial"), icon: <IconCity /> },
  ];
}

function buildSteps(): { title: string; description: string; photo: PhotoId; icon: IconName }[] {
  return [
    { title: t("steps.1.title"), description: t("steps.1.desc"), photo: "steps/search", icon: "search" },
    { title: t("steps.2.title"), description: t("steps.2.desc"), photo: "steps/visit", icon: "calendarCheck" },
    { title: t("steps.3.title"), description: t("steps.3.desc"), photo: "steps/sign", icon: "pen" },
    { title: t("steps.4.title"), description: t("steps.4.desc"), photo: "steps/move", icon: "key" },
  ];
}

function buildBenefits(): { title: string; description: string; photo: PhotoId; icon: IconName }[] {
  return [
    { title: t("ben.1.title"), description: t("ben.1.desc"), photo: "people/benefit-1", icon: "handshake" },
    { title: t("ben.2.title"), description: t("ben.2.desc"), photo: "people/benefit-2", icon: "layers" },
    { title: t("ben.3.title"), description: t("ben.3.desc"), photo: "people/benefit-3", icon: "shield" },
  ];
}

// ─── Prépositions de lieu ────────────────────────────────────────────────────
// « au Bénin », « en France », « aux Pays-Bas », « à Madagascar »…
function prepEnPays(name: string): string {
  const lower = name.toLowerCase();
  if (lower === "madagascar" || lower === "maurice") return `à ${name}`;
  if (lower === "rd congo") return `en ${name}`;
  if (lower.startsWith("pays")) return `aux ${name}`;
  if (/^[aeiouéèêâîôûà]/i.test(name)) return `en ${name}`;
  if (lower.endsWith("e")) return `en ${name}`;
  return `au ${name}`;
}

/** Complément de lieu selon la langue courante (plus de détection par traduction, U4). */
function placeOf(lang: string, code: string, frName: string, city?: string | null): string {
  if (city) return t("place.inCity", { city });
  if (code === ALL_COUNTRIES_CODE) return t("place.all");
  // Français : article selon le pays (règle ci-dessus) ; autres langues : clé du dictionnaire.
  return lang === "fr" ? prepEnPays(frName) : t("place.inCountry", { name: countryLabel(code, frName) });
}

/** Libellé de pays, « Tous les pays » compris. */
function countryName(code: string, frName: string): string {
  return code === ALL_COUNTRIES_CODE ? tUi("ui.allCountries") : countryLabel(code, frName);
}

function propertyHref(id: string) {
  return `${TENANT_URL}/properties/${encodeURIComponent(id)}`;
}

/**
 * Favoris : la landing n'a pas de session ; le cœur renvoie vers l'espace
 * locataire qui gère les favoris (plus d'état local perdu au rechargement).
 */
function goFavorite(id: string) {
  toast.info(t("fav.login"));
  window.location.assign(`${TENANT_URL}/login?next=${encodeURIComponent(`/properties/${id}`)}`);
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <SiteProviders>
      <LandingInner />
    </SiteProviders>
  );
}

function LandingInner() {
  const { country, countryCode, city, setCity, setCountry, isAutoDetected } = useLocation();
  const { lang } = useLang();
  const { format: fmtPrice } = useCurrency();
  const isAll = countryCode === ALL_COUNTRIES_CODE;
  const cName = countryName(country.code, country.name);
  const place = placeOf(lang, country.code, country.name, city);
  /** Singulier / pluriel par clés du dictionnaire (`<clé>.one` / `<clé>.other`). */
  const plural = (key: string, n: number, params: Record<string, string | number> = {}) =>
    t(`${key}.${n === 1 ? "one" : "other"}`, { n, ...params });
  const CATEGORIES = buildCategories();
  const STEPS = buildSteps();
  const BENEFITS = buildBenefits();

  const [category, setCategory] = React.useState<string>("ALL");
  const [listingFilter, setListingFilter] = React.useState<"ALL" | ListingType>("ALL");

  // ── Statistiques globales (GET /properties/stats) ─────────────────────────
  const [stats, setStats] = React.useState<PropertyStats | null>(null);
  // ── Index léger (villes, destinations, repli des compteurs) ───────────────
  const [index, setIndex] = React.useState<Property[]>([]);
  const [indexReady, setIndexReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    publicApi
      .propertyStats()
      .then((s) => {
        if (!cancelled && s && typeof s.total === "number") setStats(s);
      })
      .catch(() => {
        /* repli : calcul local depuis l'index */
      });
    (async () => {
      const all: Property[] = [];
      try {
        for (let page = 1; page <= INDEX_PAGES; page++) {
          const r = await publicApi.listProperties({ page, pageSize: INDEX_PAGE_SIZE });
          const items = r.items ?? [];
          all.push(...items);
          if (all.length >= (r.total ?? 0) || items.length < INDEX_PAGE_SIZE) break;
        }
      } catch {
        /* index partiel : le catalogue reste servi par l'API */
      }
      if (!cancelled) {
        setIndex(all);
        setIndexReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { citiesByCountry, countsByCountry } = React.useMemo(() => {
    const cbc: Record<string, Set<string>> = {};
    const counts: Record<string, number> = {};
    for (const c of SUPPORTED_COUNTRIES) {
      cbc[c.code] = new Set();
      counts[c.code] = 0;
    }
    for (const p of index) {
      const code = (p.country ?? "").trim().toUpperCase();
      if (!code) continue;
      const set = (cbc[code] ??= new Set());
      counts[code] = (counts[code] ?? 0) + 1;
      if (p.city) set.add(p.city);
    }
    // Les compteurs officiels (stats) priment sur l'index partiel.
    if (stats?.byCountry) {
      for (const [k, v] of Object.entries(stats.byCountry)) counts[k.toUpperCase()] = v;
    }
    return {
      citiesByCountry: Object.fromEntries(
        Object.entries(cbc).map(([k, v]) => [k, Array.from(v).sort((a, b) => a.localeCompare(b))]),
      ) as Record<string, string[]>,
      countsByCountry: counts,
    };
  }, [index, stats]);

  // Pays suggéré d'après la langue mais sans aucun bien : on montre tout le
  // catalogue plutôt qu'une page vide, sans mémoriser ce choix (l'utilisateur
  // n'a rien choisi : la suggestion sera réévaluée à la prochaine visite).
  React.useEffect(() => {
    if (!isAutoDetected || isAll || !indexReady) return;
    if ((countsByCountry[countryCode] ?? 0) > 0) return;
    setCountry(ALL_COUNTRIES_CODE);
    try {
      window.localStorage.removeItem(LOCATION_STORAGE_KEY);
    } catch {
      /* stockage indisponible */
    }
  }, [isAutoDetected, isAll, indexReady, countsByCountry, countryCode, setCountry]);

  // ── Catalogue paginé côté API (filtres pays/ville/type/annonce) ───────────
  const [catalog, setCatalog] = React.useState<Paginated<Property> | null>(null);
  const [catalogLoading, setCatalogLoading] = React.useState(true);
  const [catalogError, setCatalogError] = React.useState<unknown>(null);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [reloadTick, setReloadTick] = React.useState(0);

  const query = React.useMemo(
    () => ({
      country: isAll ? undefined : countryCode,
      city: city ?? undefined,
      propertyType: category === "ALL" ? undefined : (category as PropertyType),
      listingType: listingFilter === "ALL" ? undefined : listingFilter,
      pageSize: PAGE_SIZE,
    }),
    [isAll, countryCode, city, category, listingFilter],
  );

  React.useEffect(() => {
    const ctrl = new AbortController();
    setCatalogLoading(true);
    setCatalogError(null);
    publicApi
      .listProperties({ ...query, page: 1 }, { signal: ctrl.signal })
      .then((r) => setCatalog(r))
      .catch((e) => {
        if ((e as Error)?.name !== "AbortError") setCatalogError(e);
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setCatalogLoading(false);
      });
    return () => ctrl.abort();
  }, [query, reloadTick]);

  const loadMore = async () => {
    if (!catalog) return;
    setLoadingMore(true);
    try {
      const r = await publicApi.listProperties({ ...query, page: (catalog.page ?? 1) + 1 });
      setCatalog({ ...r, items: [...catalog.items, ...(r.items ?? [])] });
    } catch (e) {
      toast.error(e);
    } finally {
      setLoadingMore(false);
    }
  };

  const visible = catalog?.items ?? [];
  const total = catalog?.total ?? 0;
  const featured = visible[0];
  const rest = visible.slice(1);

  // Nombre de biens pour le lieu courant (indépendant des filtres de type).
  const localCount = React.useMemo(() => {
    if (city)
      return index.filter((p) => p.city === city && (isAll || (p.country ?? "").toUpperCase() === countryCode))
        .length;
    if (isAll) return stats?.total ?? index.length;
    return countsByCountry[countryCode] ?? 0;
  }, [city, index, isAll, countryCode, stats, countsByCountry]);

  // ── Destinations (villes les plus fournies, pays courant ou monde) ────────
  const destinations = React.useMemo(() => {
    const byCity = new Map<string, { key: string; name: string; country: string; count: number; image: string | null }>();
    for (const p of index) {
      const code = (p.country ?? "").toUpperCase();
      if (!isAll && code !== countryCode) continue;
      if (!p.city) continue;
      const key = `${code}|${p.city}`;
      const existing = byCity.get(key);
      const firstImage = p.media?.[0]?.url ?? null;
      if (existing) {
        existing.count++;
        if (!existing.image && firstImage) existing.image = firstImage;
      } else {
        byCity.set(key, { key, name: p.city, country: code, count: 1, image: firstImage });
      }
    }
    const live = Array.from(byCity.values()).sort((a, b) => b.count - a.count);
    // Complète avec les villes mises en avant (photo locale) : la section
    // reste illustrée même quand le catalogue est encore mince.
    const seen = new Set(live.map((d) => d.name.toLowerCase()));
    const curated = FEATURED_CITIES.filter(
      (c) => (isAll || c.country === countryCode) && !seen.has(c.name.toLowerCase()),
    ).map((c) => ({ key: `${c.country}|${c.name}`, name: c.name, country: c.country, count: 0, image: null as string | null }));
    return [...live, ...curated].slice(0, 8);
  }, [index, isAll, countryCode]);

  // ── Stats globales ─────────────────────────────────────────────────────────
  const totalProperties = stats?.total ?? index.length;
  const totalCities =
    stats?.cities ?? new Set(index.filter((p) => p.city).map((p) => `${p.country}|${p.city}`)).size;
  const totalCountries = stats?.countries ?? Object.values(countsByCountry).filter((n) => n > 0).length;

  const goToCatalogue = () =>
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const navLinks = [
    ...(destinations.length > 0 ? [{ label: t("nav.destinations"), href: "#destinations" }] : []),
    { label: t("nav.catalog"), href: "#catalogue" },
    { label: t("nav.how"), href: "#etapes" },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <SiteHeader
        links={navLinks}
        homeHref="#"
        extra={<CountryPicker citiesByCountry={citiesByCountry} countsByCountry={countsByCountry} />}
      />

      {/* ── Bandeau de localisation ───────────────────────────────────── */}
      {(isAutoDetected || city) && (
        <div className="border-b border-border/50 bg-cream-100/50 dark:bg-surface/40">
          <div className="container-app py-2.5 text-xs flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-ink-muted min-w-0">
              <span className="text-base leading-none" aria-hidden="true">
                {country.flag}
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">
                {t("loc.exploring")}{" "}
                <strong className="text-ink font-medium">{city ? `${city}, ${cName}` : cName}</strong>
                {isAutoDetected && <span className="text-ink-subtle"> {t("loc.auto")}</span>}
              </span>
            </div>
            {city && (
              <button
                type="button"
                onClick={() => setCity(null)}
                className="text-ink-muted hover:text-ink transition-colors underline underline-offset-2"
              >
                {t("loc.seeAll", { country: cName })}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="hero-cinematic pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="container-app relative">
          <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] gap-x-12 xl:gap-x-16 gap-y-8 items-center">
            {/* Accroche */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <span className="eyebrow inline-flex items-center gap-2 mb-5 max-w-full [overflow-wrap:anywhere]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-brand-500 pulse-dot" />
                  <span className="relative h-2 w-2 rounded-full bg-brand-500" />
                </span>
                {!indexReady && !stats
                  ? t("hero.loading")
                  : localCount > 0
                    ? plural("hero.count", localCount, { place })
                    : t("hero.coming", { place })}
              </span>

              <h1 className="display-serif text-[2.6rem] leading-[1.04] sm:text-display-md xl:text-display-lg text-ink">
                <span className="block">{t("hero.title1")}</span>
                {/* Marge basse : background-clip:text coupait les jambages (g, y) avec un interligne serré. */}
                <span className="block italic gradient-text pb-[0.14em] pe-[0.06em]">{t("hero.title2")}</span>
              </h1>

              <p className="text-ink-muted text-lg sm:text-xl max-w-xl mt-5 leading-relaxed [overflow-wrap:anywhere]">
                {t("hero.sub", { place })}
              </p>
            </div>

            {/* Visuel : photo principale + vignette + pastilles */}
            <div className="relative min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="relative overflow-hidden rounded-[1.75rem] lg:rounded-[2.25rem] ring-1 ring-border/60 shadow-elevated aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/5] lg:ms-8 bg-brand-900">
                <Photo
                  id="hero/hero-main"
                  priority
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 44vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute start-3 bottom-3 sm:start-4 sm:bottom-4 lg:start-auto lg:end-4 flex flex-wrap gap-2 max-w-[calc(100%-1.5rem)]">
                  <HeroChip icon="handshake">{t("hero.chip1")}</HeroChip>
                  <HeroChip icon="pen" className="hidden min-[400px]:inline-flex">{t("hero.chip2")}</HeroChip>
                </div>
              </div>
              {/* Vignette « remise des clés » (grand écran) */}
              <div className="hidden lg:block absolute -start-4 xl:-start-8 bottom-10 w-[38%] overflow-hidden rounded-3xl ring-4 ring-background shadow-elevated aspect-[4/5] bg-brand-900">
                <Photo id="hero/hero-keys" sizes="220px" className="h-full w-full object-cover" />
              </div>
              <div className="hidden lg:flex absolute -top-4 start-0 xl:-start-2 items-center gap-2 rounded-full glass-strong px-3.5 py-2 text-xs font-medium text-ink shadow-card">
                <Icon name="globe" size={16} className="text-brand-600 dark:text-brand-300" />
                {t("hero.chip3")}
              </div>
            </div>

            {/* Recherche + compteurs */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-2">
              <SearchComposer
                value={{ location: city ?? (isAll ? "" : cName) }}
                onSubmit={(v) => {
                  if (v.listing === "RENT" || v.listing === "SALE") setListingFilter(v.listing);
                  else setListingFilter("ALL");
                  const q = v.location.trim().toLowerCase();
                  if (q) {
                    const pool = isAll ? Object.values(citiesByCountry).flat() : citiesByCountry[countryCode] ?? [];
                    const match = pool.find((c) => c.toLowerCase() === q || c.toLowerCase().includes(q));
                    if (match) setCity(match);
                  }
                  goToCatalogue();
                }}
              />

              {/* Stats — /properties/stats, repli sur l'index local */}
              {totalProperties > 0 && (
                <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
                  <FloatingStat kicker={t("stats.props")} value={`${totalProperties}`} hint={t("stats.propsHint")} />
                  <FloatingStat kicker={t("stats.cities")} value={`${totalCities}`} hint={t("stats.citiesHint")} />
                  <FloatingStat kicker={t("stats.countries")} value={`${totalCountries}`} hint={t("stats.countriesHint")} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Destinations ─────────────────────────────────────────────────── */}
      {destinations.length > 0 && (
        <section id="destinations" className="py-16 sm:py-20 border-t border-border/40 bg-cream-100/40 dark:bg-surface/20">
          <div className="container-app">
            <RevealOnScroll>
              <SectionHeading
                eyebrow={`${t("dest.eyebrow")} · ${country.flag} ${cName}`}
                title={
                  <>
                    {t("dest.title1")} <em className="italic">{t("dest.title2")}</em>.
                  </>
                }
                description={t("dest.desc")}
              />
            </RevealOnScroll>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 stagger">
              {destinations.map((d) => (
                <CityCard
                  key={d.key}
                  name={d.name}
                  image={d.image}
                  badge={d.count > 0 ? plural("dest.count", d.count) : undefined}
                  cta={
                    <>
                      <span>{t("dest.discover")}</span>
                      <ArrowRightIcon />
                    </>
                  }
                  onClick={() => {
                    if (d.country && d.country !== countryCode) setCountry(d.country);
                    setCity(d.name);
                    goToCatalogue();
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ── Catégories + Catalogue ──────────────────────────────────────── */}
      <section id="catalogue" className="py-16 lg:py-20 border-y border-border/40">
        <div className="container-app">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={`${t("cat.eyebrow")} · ${country.flag} ${cName}${city ? ` · ${city}` : ""}`}
              title={
                <>
                  {t("cat.title1")} <em className="italic">{t("cat.title2")}</em>.
                </>
              }
              description={city ? t("cat.descCity", { city }) : t("cat.descCountry", { place })}
            />
          </RevealOnScroll>

          <div className="mt-8">
            <CategoryRail items={CATEGORIES} active={category} onChange={setCategory} />
          </div>

          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            <div className="text-sm text-ink-muted" aria-live="polite">
              {catalogLoading ? t("cat.loading") : plural("cat.selection", total)}
            </div>
            <div className="inline-flex p-1 rounded-full bg-surface border border-border text-sm" role="group">
              {(["ALL", "RENT", "SALE"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={listingFilter === k}
                  onClick={() => setListingFilter(k)}
                  className={`h-8 px-3 sm:px-4 rounded-full transition-all ${
                    listingFilter === k
                      ? "bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {k === "ALL" ? t("cat.all") : k === "RENT" ? t("cat.rent") : t("cat.sale")}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            {catalogLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : catalogError ? (
              <ErrorState error={catalogError} title={t("cat.error")} onRetry={() => setReloadTick((n) => n + 1)} />
            ) : visible.length === 0 ? (
              <EmptyCountry
                lang={lang}
                countryCode={country.code}
                countryFrName={country.name}
                flag={country.flag}
                hasCity={Boolean(city)}
                onClearCity={() => setCity(null)}
                hasAnyInCountry={localCount > 0}
              />
            ) : (
              <>
                {featured && (
                  <RevealOnScroll className="mb-12">
                    <FeaturedSpread property={featured} />
                  </RevealOnScroll>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {rest.map((p) => (
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
                      priceUnit={p.priceUnit}
                      status={p.status}
                      images={(p.media ?? []).map((m) => ({ url: m.url, alt: m.alt ?? p.title }))}
                      displayPrice={fmtPrice(p.displayPrice ?? p.price, p.currency)}
                      href={propertyHref(p.id)}
                      favoritable
                      onToggleFavorite={() => goFavorite(p.id)}
                    />
                  ))}
                </div>

                {visible.length < total && (
                  <div className="mt-12 flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-cream-100 dark:hover:bg-white/5 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {loadingMore ? t("cat.loadingMore") : t("cat.more")}
                    </button>
                    <span className="text-xs text-ink-subtle">{t("cat.showing", { shown: visible.length, total })}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Arguments ───────────────────────────────────────────────────── */}
      <section id="pourquoi" className="py-20 bg-cream-100/40 dark:bg-surface/20 border-b border-border/40">
        <div className="container-app">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={t("ben.eyebrow")}
              title={
                <>
                  {t("ben.title1")} <em className="italic">{t("ben.title2")}</em>.
                </>
              }
              description={t("ben.desc")}
            />
          </RevealOnScroll>
          <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-3 stagger">
            {BENEFITS.map((b) => (
              <article key={b.title} className="group min-w-0 overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-card hover-lift">
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-200 dark:bg-brand-950">
                  <Photo
                    id={b.photo}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-900/40 dark:text-brand-300 dark:ring-brand-800/60">
                    <Icon name={b.icon} size={20} />
                  </span>
                  <h3 className="display-serif text-xl sm:text-2xl mt-4 text-ink">{b.title}</h3>
                  <p className="text-sm text-ink-muted mt-2 leading-relaxed">{b.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Étapes ───────────────────────────────────────────────────────── */}
      <section id="etapes" className="py-20">
        <div className="container-app">
          <RevealOnScroll>
            <SectionHeading
              align="center"
              eyebrow={t("steps.eyebrow")}
              title={
                <>
                  {t("steps.title1")} <em className="italic">{t("steps.title2")}</em>.
                </>
              }
              description={t("steps.desc")}
            />
          </RevealOnScroll>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger">
            {STEPS.map((s, i) => (
              <li key={s.title} className="min-w-0 flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-200 dark:bg-brand-950">
                  <Photo id={s.photo} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 start-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/95 display-serif text-lg text-brand-700 dark:text-brand-300 shadow-card"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="display-serif text-xl text-ink flex items-center gap-2">
                    <Icon name={s.icon} size={20} className="text-accent-500" />
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-muted mt-2 leading-relaxed">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* ── Professionnels ───────────────────────────────────────────────── */}
      <section id="professionnels" className="py-20 border-t border-border/40" data-pro-section>
        <div className="container-app">
          <RevealOnScroll>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-border/60 shadow-card">
                <Photo
                  id="people/benefit-2"
                  alt={t("pro.photoAlt")}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-transparent" />
              </div>
              <div className="min-w-0">
                <span className="eyebrow">{t("pro.eyebrow")}</span>
                <h2 className="display-serif text-4xl sm:text-5xl mt-3 leading-[1.05] text-ink [overflow-wrap:anywhere]">
                  {t("pro.title")}
                </h2>
                <p className="text-ink-muted text-lg mt-4 leading-relaxed">{t("pro.sub")}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-300/60 bg-accent-50 dark:bg-accent-700/15 px-3 py-1 text-sm font-medium text-ink" data-pro-trial>
                  <Icon name="sparkles" size={15} className="text-accent-500" />
                  {t("pro.trial")}
                </p>
                <ul className="mt-8 space-y-5">
                  {(
                    [
                      { icon: "users", k: "p1" },
                      { icon: "handshake", k: "p2" },
                      { icon: "coins", k: "p3" },
                    ] as { icon: IconName; k: string }[]
                  ).map((a) => (
                    <li key={a.k} className="flex gap-4">
                      <IconBadge name={a.icon} tone={a.k === "p3" ? "accent" : "brand"} />
                      <div className="min-w-0">
                        <div className="font-display text-lg text-ink">{t(`pro.${a.k}.title`)}</div>
                        <p className="text-sm text-ink-muted leading-relaxed">{t(`pro.${a.k}.desc`)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <a
                  href={`${OWNER_URL}/register?type=pro`}
                  className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-900 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {t("pro.cta")}
                  <ArrowRightIcon />
                </a>
              </div>
            </div>
            <ProPricing />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-app">
          <RevealOnScroll>
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 dark:from-brand-950 dark:via-brand-900 dark:to-brand-800 text-cream-50 px-6 sm:px-16 py-14 sm:py-24">
              <span aria-hidden="true" className="absolute -top-20 -end-20 w-96 h-96 rounded-full bg-accent-400/25 blur-3xl" />
              <span aria-hidden="true" className="absolute -bottom-24 -start-12 w-80 h-80 rounded-full bg-brand-300/15 blur-3xl" />
              {/* Photo d'intérieur en fondu sur la droite (grand écran) */}
              <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 end-0 w-[42%]">
                <Photo id="hero/hero-interior" alt="" sizes="40vw" className="h-full w-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/40 to-transparent dark:from-brand-950 dark:via-brand-950/40" />
              </div>
              <div className="relative max-w-2xl">
                <span className="eyebrow text-cream-200/80">
                  {t("cta.eyebrow")} {country.flag}
                </span>
                <h2 className="display-serif text-4xl sm:text-6xl mt-3 leading-[1.05] [overflow-wrap:anywhere]">
                  {t("cta.title")} <em className="italic text-accent-200">{place}</em>.
                </h2>
                <p className="text-cream-200/80 text-lg mt-6 leading-relaxed">{t("cta.sub")}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`${TENANT_URL}/register`}
                    className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-accent-400 text-brand-900 text-sm font-medium hover:bg-accent-300 transition-colors"
                  >
                    {t("cta.find")}
                    <ArrowRightIcon />
                  </a>
                  <a
                    href={`${OWNER_URL}/register`}
                    className="inline-flex items-center h-12 px-7 rounded-full border border-cream-50/30 text-cream-50 text-sm font-medium hover:bg-cream-50/10 transition-colors"
                  >
                    {t("cta.publish")}
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <SiteFooter
        exploreLinks={[
          ...(destinations.length > 0 ? [{ label: t("nav.destinations"), href: "#destinations" }] : []),
          { label: t("nav.catalog"), href: "#catalogue" },
          { label: t("nav.how"), href: "#etapes" },
        ]}
      />
    </div>
  );
}

// ─── Sous-composants ─────────────────────────────────────────────────────────

function EmptyCountry({
  lang,
  countryCode,
  countryFrName,
  flag,
  hasCity,
  onClearCity,
  hasAnyInCountry,
}: {
  lang: string;
  countryCode: string;
  countryFrName: string;
  flag: string;
  hasCity: boolean;
  onClearCity: () => void;
  hasAnyInCountry: boolean;
}) {
  const isAll = countryCode === ALL_COUNTRIES_CODE;
  const country = countryName(countryCode, countryFrName);
  const place = placeOf(lang, countryCode, countryFrName);
  return (
    <div className="relative rounded-3xl border border-dashed border-border bg-surface/60 p-6 sm:p-16 text-center overflow-hidden">
      <span aria-hidden="true" className="absolute -top-16 -start-16 w-48 h-48 rounded-full bg-brand-200/40 dark:bg-brand-800/30 blur-3xl" />
      <span aria-hidden="true" className="absolute -bottom-16 -end-16 w-48 h-48 rounded-full bg-accent-200/40 dark:bg-accent-700/20 blur-3xl" />
      <div className="relative">
        <IlloSearchHome className="mx-auto mb-4 w-40" />
        <div className="text-3xl mb-3" aria-hidden="true">
          {flag}
        </div>
        <div className="display-serif text-2xl sm:text-3xl text-ink mb-3 leading-tight">
          {hasCity ? t("empty.city") : hasAnyInCountry ? t("empty.filters") : t("empty.first", { place })}
        </div>
        <p className="text-sm text-ink-muted max-w-md mx-auto mb-6 leading-relaxed">
          {hasCity
            ? t("empty.cityDesc")
            : hasAnyInCountry
              ? t("empty.filtersDesc", { place })
              : isAll
                ? t("empty.firstAll")
                : t("empty.firstDesc", { country })}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {hasCity && (
            <button
              type="button"
              onClick={onClearCity}
              className="inline-flex items-center gap-1.5 px-5 h-10 rounded-full border border-ink/15 bg-surface hover:bg-cream-200 dark:hover:bg-white/10 text-sm font-medium text-ink transition-colors"
            >
              {t("loc.seeAll", { country })}
            </button>
          )}
          <a
            href={`${OWNER_URL}/register`}
            className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t("cta.publish")}
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function HeroChip({ icon, children, className = "" }: { icon: IconName; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-black/60 px-3 py-1.5 text-xs font-medium text-ink dark:text-white backdrop-blur-md shadow-sm ${className}`}
    >
      <Icon name={icon} size={14} className="text-brand-600 dark:text-brand-300" />
      {children}
    </span>
  );
}

function FloatingStat({ kicker, value, hint }: { kicker: string; value: string; hint: string }) {
  return (
    <div className="glass rounded-2xl px-3 py-4 sm:px-5 sm:py-5 hover-lift min-w-0">
      <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-ink-muted mb-1 [overflow-wrap:anywhere]">
        {kicker}
      </div>
      <div className="display-serif text-2xl sm:text-3xl text-ink leading-none">{value}</div>
      <div className="text-[10px] sm:text-[11px] text-ink-muted mt-2 [overflow-wrap:anywhere]">{hint}</div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div>
      <div className="aspect-[4/5] rounded-2xl skeleton" />
      <div className="pt-3 px-1 space-y-2">
        <div className="h-4 w-3/4 rounded skeleton" />
        <div className="h-3 w-1/2 rounded skeleton" />
        <div className="h-4 w-1/3 rounded skeleton" />
      </div>
    </div>
  );
}

function FeaturedSpread({ property }: { property: Property }) {
  const { format: fmtPrice } = useCurrency();
  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
      <div className="lg:col-span-3 relative min-w-0">
        <PropertyCard
          title={property.title}
          city={property.city}
          price={property.displayPrice ?? property.price}
          currency={property.currency}
          surface={property.surface}
          rooms={property.rooms}
          listingType={property.listingType}
          propertyType={property.propertyType}
          priceUnit={property.priceUnit}
          status={property.status}
          images={(property.media ?? []).map((m) => ({ url: m.url, alt: m.alt ?? property.title }))}
          displayPrice={fmtPrice(property.displayPrice ?? property.price, property.currency)}
          href={propertyHref(property.id)}
          favoritable
          onToggleFavorite={() => goFavorite(property.id)}
          eyebrow={t("featured.eyebrow")}
        />
      </div>
      <div className="lg:col-span-2 flex flex-col justify-center min-w-0">
        <span className="eyebrow">{t("featured.eyebrow")}</span>
        <h3 className="display-serif text-3xl sm:text-5xl mt-3 leading-[1.05] line-clamp-3 [overflow-wrap:anywhere]">
          {property.title}
        </h3>
        <p className="text-ink-muted mt-5 leading-relaxed line-clamp-4 [overflow-wrap:anywhere]">{property.description}</p>
        <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
          <Specced label={t("featured.surface")} value={`${property.surface} m²`} />
          <Specced label={t("featured.rooms")} value={property.rooms || "—"} />
          <Specced label={t("featured.city")} value={property.city} />
        </div>
        <a
          href={propertyHref(property.id)}
          className="mt-8 inline-flex items-center gap-2 h-11 w-fit px-6 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {t("featured.discover")}
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

function Specced({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">{label}</div>
      <div className="display-serif text-xl mt-1 text-ink truncate">{value}</div>
    </div>
  );
}

// ─── Icônes catégories ───────────────────────────────────────────────────────
function IconSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
function IconCompass() {
  return (
    <IconSvg>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </IconSvg>
  );
}
function IconBuilding() {
  return (
    <IconSvg>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4" />
    </IconSvg>
  );
}
function IconHouse() {
  return (
    <IconSvg>
      <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" />
    </IconSvg>
  );
}
function IconStudio() {
  return (
    <IconSvg>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 12h18" />
    </IconSvg>
  );
}
function IconLand() {
  return (
    <IconSvg>
      <path d="M3 18l4-6 5 4 5-7 4 9" />
      <path d="M3 20h18" />
    </IconSvg>
  );
}
function IconCity() {
  return (
    <IconSvg>
      <path d="M3 22V8l5-2v16M8 22V4l5 2v16M13 22V10l5-2v14" />
      <path d="M3 22h18" />
    </IconSvg>
  );
}

/**
 * Tarifs des professionnels, lus depuis l'API publique (GET /plans) : offre
 * gratuite (si activée) puis offres payantes actives. Rien n'est affiché si
 * l'API ne répond pas (la section reste lisible sans tarifs).
 */
/**
 * Prix d'une offre dans la devise du visiteur si l'offre y a un prix ; sinon
 * le prix EUR (facturé en EUR) avec un « ≈ » indicatif en devise du visiteur.
 */
function PlanPriceLine({ plan }: { plan: PublicPlans["plans"][number] }) {
  const { userCurrency } = useCurrency();
  const prices = plan.prices?.length ? plan.prices : [{ currency: plan.currency, monthlyPrice: plan.monthlyPrice }];
  const exact = prices.find((x) => x.currency === userCurrency);
  const shown = exact ?? prices.find((x) => x.currency === "EUR") ?? prices[0]!;
  return (
    <span className="flex flex-col">
      <span className="font-display text-3xl text-ink tabular-nums" data-plan-price={shown.currency}>
        {fmtMoney(shown.monthlyPrice, shown.currency)}
        <span className="text-sm text-ink-muted font-sans"> {t("pro.pricing.perMonth")}</span>
      </span>
      {!exact && !plan.isFree && <Approx amount={shown.monthlyPrice} currency={shown.currency} className="ms-0 mt-0.5" />}
    </span>
  );
}

function ProPricing() {
  const [plans, setPlans] = React.useState<PublicPlans | null>(null);
  React.useEffect(() => {
    publicApi.plans().then(setPlans).catch(() => setPlans(null));
  }, []);
  if (!plans || (plans.plans.length === 0 && !plans.freePlan)) return null;
  const cards = [...(plans.freePlan ? [plans.freePlan] : []), ...plans.plans];
  return (
    <div className="mt-12" data-pro-pricing>
      <h3 className="display-serif text-2xl text-ink">{t("pro.pricing.title")}</h3>
      <p className="text-sm text-ink-muted mt-1">{t("pro.pricing.sub", { days: plans.trialDays })}</p>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((p) => (
          <li key={p.code} className="rounded-2xl border border-border/70 bg-surface p-5 flex flex-col gap-2 min-w-0" data-plan={p.code}>
            <span className="font-display text-lg text-ink [overflow-wrap:anywhere]">{p.isFree ? t("pro.pricing.free") : p.name}</span>
            <PlanPriceLine plan={p} />
            <span className="text-sm text-ink-muted flex items-center gap-1.5">
              <Icon name="users" size={14} />
              {p.maxAgents === null ? t("pro.pricing.agentsUnl") : t("pro.pricing.agents", { n: p.maxAgents })}
            </span>
            <span className="text-sm text-ink-muted flex items-center gap-1.5">
              <Icon name="handshake" size={14} />
              {p.maxActiveMandates === null ? t("pro.pricing.mandatesUnl") : t("pro.pricing.mandates", { n: p.maxActiveMandates })}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-muted mt-3">{t("pro.pricing.note")}</p>
    </div>
  );
}
