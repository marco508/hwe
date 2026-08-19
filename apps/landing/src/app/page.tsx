"use client";

import * as React from "react";
import {
  PropertyCard,
  ThemeToggle,
  SearchComposer,
  CategoryRail,
  StepsRail,
  SectionHeading,
  RevealOnScroll,
  LocationProvider,
  CountryPicker,
  useLocation,
  SUPPORTED_COUNTRIES,
  CurrencyProvider,
  CurrencySwitch,
  useCurrency,
  IlloSkyline,
  IlloSearchHome,
  type CategoryRailItem,
} from "@hwe/ui";
import { t, LangProvider, useLang, LangSwitch } from "../lib/i18n";
import { publicApi } from "../lib/api";
import type { Property, ListingType, PropertyType } from "@hwe/types";

const TENANT_URL =
  process.env.NEXT_PUBLIC_TENANT_URL ?? "https://tenant.hwe.dkpsolution.tech";
const OWNER_URL =
  process.env.NEXT_PUBLIC_OWNER_URL ?? "https://owner.hwe.dkpsolution.tech";

// ─── Catégories (traduites au rendu) ────────────────────────────────────────
function buildCategories(): CategoryRailItem[] {
  return [
    { id: "ALL", label: t("cats.all"), icon: <IconCompass /> },
    { id: "APARTMENT", label: t("cats.apartments"), icon: <IconBuilding /> },
    { id: "HOUSE", label: t("cats.houses"), icon: <IconHouse /> },
    { id: "STUDIO", label: t("cats.studios"), icon: <IconStudio /> },
    { id: "VILLA", label: t("cats.villas"), icon: <IconVilla /> },
    { id: "LAND", label: t("cats.land"), icon: <IconLand /> },
    { id: "COMMERCIAL", label: t("cats.commercial"), icon: <IconCity /> },
  ];
}

const PROPERTY_TYPE_BY_CATEGORY: Record<string, PropertyType | null> = {
  ALL: null,
  APARTMENT: "APARTMENT",
  HOUSE: "HOUSE",
  STUDIO: "STUDIO",
  VILLA: "HOUSE",
  LAND: "LAND",
  COMMERCIAL: "COMMERCIAL",
};

// ─── Étapes (traduites au rendu) ─────────────────────────────────────────────
function buildSteps() {
  return [
    { title: t("steps.1.title"), description: t("steps.1.desc") },
    { title: t("steps.2.title"), description: t("steps.2.desc") },
    { title: t("steps.3.title"), description: t("steps.3.desc") },
  ];
}

// ─── Page wrapper avec Provider ─────────────────────────────────────────────
export default function LandingPage() {
  return (
    <LangProvider>
      <CurrencyProvider>
        <LocationProvider>
          <LandingInner />
        </LocationProvider>
      </CurrencyProvider>
    </LangProvider>
  );
}

// ─── Page (consomme useLocation) ────────────────────────────────────────────
function LandingInner() {
  const { country, countryCode, city, setCity, isAutoDetected, isDetecting } =
    useLocation();
  const { lang } = useLang();
  const { format: fmtPrice } = useCurrency();

  // « à Cotonou » / « au Bénin » en français, « in Cotonou » en anglais.
  const place = city
    ? lang === "fr"
      ? `à ${city}`
      : `in ${city}`
    : lang === "fr"
      ? prepEnPays(country.name)
      : `in ${country.name}`;
  const plural = (n: number) => (lang === "fr" ? (n !== 1 ? "s" : "") : n !== 1 ? "ies" : "y");
  const CATEGORIES = buildCategories();
  const STEPS = buildSteps();

  const [properties, setProperties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [category, setCategory] = React.useState<string>("ALL");
  const [listingFilter, setListingFilter] =
    React.useState<"ALL" | ListingType>("ALL");
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    publicApi
      .listProperties({ pageSize: 200 })
      .then((r) => {
        if (cancelled) return;
        setProperties(r.items ?? []);
      })
      .catch(() => {
        if (!cancelled) setProperties([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Index par pays (codes ISO) ────────────────────────────────────────────
  const { citiesByCountry, countsByCountry } = React.useMemo(() => {
    const cbc: Record<string, Set<string>> = {};
    const counts: Record<string, number> = {};
    for (const c of SUPPORTED_COUNTRIES) {
      cbc[c.code] = new Set();
      counts[c.code] = 0;
    }
    for (const p of properties) {
      const code = (p.country ?? "").trim().toUpperCase();
      if (!code) continue;
      if (!(code in cbc)) {
        cbc[code] = new Set();
        counts[code] = 0;
      }
      counts[code]++;
      if (p.city) cbc[code].add(p.city);
    }
    return {
      citiesByCountry: Object.fromEntries(
        Object.entries(cbc).map(([k, v]) => [
          k,
          Array.from(v).sort((a, b) => a.localeCompare(b)),
        ]),
      ) as Record<string, string[]>,
      countsByCountry: counts,
    };
  }, [properties]);

  // ── Biens filtrés par localisation (code ISO) ─────────────────────────────
  const localizedProperties = React.useMemo(() => {
    return properties.filter((p) => {
      const code = (p.country ?? "").trim().toUpperCase();
      if (code !== countryCode.toUpperCase()) return false;
      if (city && p.city !== city) return false;
      return true;
    });
  }, [properties, countryCode, city]);

  const visible = localizedProperties.filter((p) => {
    const cat = PROPERTY_TYPE_BY_CATEGORY[category];
    if (cat && p.propertyType !== cat) return false;
    if (listingFilter !== "ALL" && p.listingType !== listingFilter)
      return false;
    return true;
  });

  const featured = visible[0];
  const rest = visible.slice(1, 13);

  // ── Destinations dérivées de la DB ────────────────────────────────────────
  // Pour chaque ville présente en base dans le pays courant : on agrège count,
  // photo représentative (1ère image du 1er bien), et fourchette de prix.
  const destinations = React.useMemo(() => {
    const byCity = new Map<
      string,
      { name: string; count: number; image: string | null }
    >();
    for (const p of properties) {
      if ((p.country ?? "").toUpperCase() !== countryCode.toUpperCase())
        continue;
      if (!p.city) continue;
      const existing = byCity.get(p.city);
      const firstImage = p.media?.[0]?.url ?? null;
      if (existing) {
        existing.count++;
        if (!existing.image && firstImage) existing.image = firstImage;
      } else {
        byCity.set(p.city, {
          name: p.city,
          count: 1,
          image: firstImage,
        });
      }
    }
    return Array.from(byCity.values()).sort((a, b) => b.count - a.count);
  }, [properties, countryCode]);

  const toggleFav = (id: string) =>
    setFavorites((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // ── Stats globales (réelles, dérivées de la DB) ──────────────────────────
  const totalProperties = properties.length;
  const totalCities = React.useMemo(() => {
    const s = new Set<string>();
    for (const p of properties) if (p.city) s.add(`${p.country}|${p.city}`);
    return s.size;
  }, [properties]);
  const totalCountries = Object.values(countsByCountry).filter((n) => n > 0)
    .length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-cream-50/90 dark:bg-background/85 border-b border-border/60">
        <div className="container-app flex items-center justify-between h-16 gap-4">
          <a href="#" className="flex items-center gap-2">
            <LogoMark />
            <span className="display-serif text-2xl tracking-tight text-ink">
              hwe
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-ink-muted">
            {destinations.length > 0 && (
              <a
                href="#destinations"
                className="hover:text-ink transition-colors"
              >
                {t("nav.destinations")}
              </a>
            )}
            <a href="#catalogue" className="hover:text-ink transition-colors">
              {t("nav.catalog")}
            </a>
            <a href="#etapes" className="hover:text-ink transition-colors">
              {t("nav.how")}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <CountryPicker
              citiesByCountry={citiesByCountry}
              countsByCountry={countsByCountry}
            />
            <LangSwitch className="hidden sm:inline-flex" />
            <CurrencySwitch className="hidden md:inline-flex" />
            <ThemeToggle />
            <a
              href={`${OWNER_URL}/login`}
              className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 hover:opacity-90 transition-opacity"
            >
              {t("nav.owner")}
            </a>
          </div>
        </div>
      </header>

      {/* ── Bandeau de localisation ───────────────────────────────────── */}
      {(isAutoDetected || city) && (
        <div className="border-b border-border/50 bg-cream-100/50 dark:bg-surface/40">
          <div className="container-app py-2.5 text-xs flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-ink-muted">
              <span className="text-base leading-none" aria-hidden="true">
                {country.flag}
              </span>
              <span>
                {t("loc.exploring")}{" "}
                <strong className="text-ink font-medium">
                  {city ? `${city}, ${country.name}` : country.name}
                </strong>
                {isAutoDetected && (
                  <span className="text-ink-subtle"> {t("loc.auto")}</span>
                )}
              </span>
            </div>
            {city && (
              <button
                type="button"
                onClick={() => setCity(null)}
                className="text-ink-muted hover:text-ink transition-colors underline underline-offset-2"
              >
                {t("loc.seeAll", { country: country.name })}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="hero-cinematic pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="container-app relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="eyebrow inline-flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-brand-500 pulse-dot" />
                <span className="relative h-2 w-2 rounded-full bg-brand-500" />
              </span>
              {isDetecting
                ? t("hero.detecting")
                : loading
                ? t("hero.loading")
                : localizedProperties.length > 0
                ? t("hero.count", {
                    n: localizedProperties.length,
                    s: plural(localizedProperties.length),
                    place,
                  })
                : t("hero.coming", { place })}
            </span>

            <h1 className="display-serif text-display-md sm:text-display-lg lg:text-display-xl text-ink">
              <span className="block">{t("hero.title1")}</span>
              <span className="block italic gradient-text">{t("hero.title2")}</span>
            </h1>

            <p className="text-ink-muted text-lg sm:text-xl max-w-2xl mx-auto mt-8 leading-relaxed">
              {t("hero.sub", { place })}
            </p>

            <IlloSkyline className="mx-auto mt-8 w-full max-w-xl" />
          </div>

          <div className="mt-10">
            <SearchComposer
              value={{ location: city ?? country.name }}
              onSubmit={(v) => {
                if (v.listing === "RENT" || v.listing === "SALE")
                  setListingFilter(v.listing);
                else setListingFilter("ALL");
                const cities = citiesByCountry[countryCode] ?? [];
                const match = cities.find(
                  (c) =>
                    c.toLowerCase() === v.location.trim().toLowerCase() ||
                    c.toLowerCase().includes(v.location.trim().toLowerCase()),
                );
                if (match) setCity(match);
                document
                  .getElementById("catalogue")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>

          {/* Stats — dérivées de la DB uniquement */}
          {totalProperties > 0 && (
            <div className="mt-14 grid grid-cols-3 gap-3 max-w-3xl mx-auto">
              <FloatingStat
                kicker={t("stats.props")}
                value={`${totalProperties}`}
                hint={t("stats.propsHint")}
              />
              <FloatingStat
                kicker={t("stats.cities")}
                value={`${totalCities}`}
                hint={t("stats.citiesHint")}
              />
              <FloatingStat
                kicker={t("stats.countries")}
                value={`${totalCountries}`}
                hint={t("stats.countriesHint")}
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Destinations (dérivées de la DB) ─────────────────────────────── */}
      {destinations.length > 0 && (
        <section
          id="destinations"
          className="py-20 border-t border-border/40 bg-cream-100/40 dark:bg-surface/20"
        >
          <div className="container-app">
            <RevealOnScroll>
              <SectionHeading
                eyebrow={`${t("dest.eyebrow")} · ${country.flag} ${country.name}`}
                title={
                  <>
                    {t("dest.title1")} <em className="italic">{t("dest.title2")}</em>.
                  </>
                }
                description={t("dest.desc")}
              />
            </RevealOnScroll>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger">
              {destinations.map((d) => (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => {
                    setCity(d.name);
                    document
                      .getElementById("catalogue")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative block aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-border/60 hover-lift text-left"
                >
                  {d.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-500 to-accent-500" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute top-4 right-4 glass-strong rounded-full px-3 py-1 text-[11px] font-medium text-ink">
                    {lang === "fr"
                      ? `${d.count} bien${d.count > 1 ? "s" : ""}`
                      : `${d.count} propert${d.count > 1 ? "ies" : "y"}`}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="display-serif text-2xl sm:text-3xl text-white leading-none">
                      {d.name}
                    </h3>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/90">
                      <span>{t("dest.discover")}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Catégories + Catalogue ──────────────────────────────────────── */}
      <section
        id="catalogue"
        className="py-16 lg:py-20 border-y border-border/40"
      >
        <div className="container-app">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={`${t("cat.eyebrow")} · ${country.flag} ${country.name}${city ? ` · ${city}` : ""}`}
              title={
                <>
                  {t("cat.title1")} <em className="italic">{t("cat.title2")}</em>.
                </>
              }
              description={
                city
                  ? t("cat.descCity", { city })
                  : t("cat.descCountry", { place })
              }
            />
          </RevealOnScroll>

          <div className="mt-8">
            <CategoryRail
              items={CATEGORIES}
              active={category}
              onChange={setCategory}
            />
          </div>

          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            <div className="text-sm text-ink-muted">
              {loading
                ? t("cat.loading")
                : t("cat.selection", { n: visible.length, s: plural(visible.length) })}
            </div>
            <div className="inline-flex p-1 rounded-full bg-surface border border-border text-sm">
              {(["ALL", "RENT", "SALE"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setListingFilter(k)}
                  className={`h-8 px-4 rounded-full transition-all ${
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
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : visible.length === 0 ? (
              <EmptyCountry
                country={country.name}
                flag={country.flag}
                hasCity={Boolean(city)}
                onClearCity={() => setCity(null)}
                hasAnyInCountry={(countsByCountry[countryCode] ?? 0) > 0}
              />
            ) : (
              <>
                {featured && (
                  <RevealOnScroll className="mb-12">
                    <FeaturedSpread
                      property={featured}
                      isFavorite={favorites.has(featured.id)}
                      onToggleFavorite={() => toggleFav(featured.id)}
                    />
                  </RevealOnScroll>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {rest.map((p) => (
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
                      displayPrice={fmtPrice(p.price, p.currency)}
                      href={`${TENANT_URL}/properties/${p.id}`}
                      favoritable
                      isFavorite={favorites.has(p.id)}
                      onToggleFavorite={() => toggleFav(p.id)}
                    />
                  ))}
                </div>
              </>
            )}
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
          <RevealOnScroll className="mt-12">
            <StepsRail items={STEPS} />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-app">
          <RevealOnScroll>
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 dark:from-brand-950 dark:via-brand-900 dark:to-brand-800 text-cream-50 px-8 sm:px-16 py-16 sm:py-24">
              <span
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent-400/25 blur-3xl"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-24 -left-12 w-80 h-80 rounded-full bg-brand-300/15 blur-3xl"
              />
              <div className="relative max-w-2xl">
                <span className="eyebrow text-cream-200/80">
                  {t("cta.eyebrow")} {country.flag}
                </span>
                <h2 className="display-serif text-5xl sm:text-6xl mt-3 leading-[1.05]">
                  {t("cta.title")}{" "}
                  <em className="italic text-accent-200">{place}</em>.
                </h2>
                <p className="text-cream-200/80 text-lg mt-6 leading-relaxed">
                  {t("cta.sub")}
                </p>
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

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-brand-950 text-cream-200 mt-auto">
        <div className="container-app py-16">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <LogoMark inverted />
                <span className="display-serif text-2xl text-cream-50">
                  hwe
                </span>
              </div>
              <p className="text-cream-200/70 text-sm max-w-md leading-relaxed">
                {t("footer.about")}
              </p>
            </div>
            <FooterCol
              title={t("footer.explore")}
              links={[
                ...(destinations.length > 0
                  ? [{ label: t("nav.destinations"), href: "#destinations" }]
                  : []),
                { label: t("nav.catalog"), href: "#catalogue" },
                { label: t("nav.how"), href: "#etapes" },
              ]}
            />
            <FooterCol
              title={t("footer.account")}
              links={[
                { label: t("footer.tenant"), href: `${TENANT_URL}` },
                { label: t("footer.owner"), href: `${OWNER_URL}` },
                { label: t("footer.signup"), href: `${TENANT_URL}/register` },
              ]}
            />
            <FooterCol
              title="hwe"
              links={[
                { label: t("footer.contact"), href: "#" },
                { label: t("footer.legal"), href: "#" },
                { label: t("footer.terms"), href: "#" },
              ]}
            />
          </div>
          <div className="border-t border-cream-50/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-200/60">
            <span>{t("footer.tagline", { year: new Date().getFullYear() })}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Sous-composants ─────────────────────────────────────────────────────────

// « au Bénin », « en France », « aux Pays-Bas », « à Madagascar »…
// Un simple `en ${pays}` produit des fautes (« en Bénin ») : la préposition
// dépend du genre/nombre du pays. Règles vérifiées sur toute la liste supportée.
function prepEnPays(name: string): string {
  const lower = name.toLowerCase();
  if (lower === "madagascar" || lower === "maurice") return `à ${name}`;
  if (lower === "rd congo") return `en ${name}`;
  if (lower.startsWith("pays")) return `aux ${name}`;
  if (/^[aeiouéèêâîôûà]/i.test(name)) return `en ${name}`;
  if (lower.endsWith("e")) return `en ${name}`;
  return `au ${name}`;
}

// Version i18n-consciente de prepEnPays pour les composants hors LandingInner.
function placeOf(countryName: string): string {
  return t("hero.title1") === "Rent, buy, sell —" ? `in ${countryName}` : prepEnPays(countryName);
}

function prepDePays(name: string): string {
  const lower = name.toLowerCase();
  if (lower.startsWith("côte")) return `de ${name}`;
  if (lower.startsWith("le ")) return `du ${name.slice(3)}`;
  if (lower.endsWith("s") || lower.startsWith("pays")) return `des ${name}`;
  if (/^[aeiouéèêâîôû]/i.test(name)) return `de l'${name}`;
  return `de la ${name}`;
}

function EmptyCountry({
  country,
  flag,
  hasCity,
  onClearCity,
  hasAnyInCountry,
}: {
  country: string;
  flag: string;
  hasCity: boolean;
  onClearCity: () => void;
  hasAnyInCountry: boolean;
}) {
  const ownerUrl = process.env.NEXT_PUBLIC_OWNER_URL ?? "https://owner.hwe.dkpsolution.tech";
  return (
    <div className="relative rounded-3xl border border-dashed border-border bg-surface/60 p-10 sm:p-16 text-center overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-brand-200/40 dark:bg-brand-800/30 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent-200/40 dark:bg-accent-700/20 blur-3xl"
      />
      <div className="relative">
        <IlloSearchHome className="mx-auto mb-4 w-40" />
        <div className="text-3xl mb-3" aria-hidden="true">
          {flag}
        </div>
        <div className="display-serif text-3xl text-ink mb-3 leading-tight">
          {hasCity
            ? t("empty.city")
            : hasAnyInCountry
            ? t("empty.filters")
            : t("empty.first", { place: placeOf(country) })}
        </div>
        <p className="text-sm text-ink-muted max-w-md mx-auto mb-6 leading-relaxed">
          {hasCity
            ? t("empty.cityDesc")
            : hasAnyInCountry
            ? t("empty.filtersDesc", { place: placeOf(country) })
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
            href={`${ownerUrl}/register`}
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

function FloatingStat({
  kicker,
  value,
  hint,
}: {
  kicker: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="glass rounded-2xl px-5 py-5 hover-lift">
      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted mb-1">
        {kicker}
      </div>
      <div className="display-serif text-3xl text-ink leading-none">{value}</div>
      <div className="text-[11px] text-ink-muted mt-2">{hint}</div>
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

function FeaturedSpread({
  property,
  isFavorite,
  onToggleFavorite,
}: {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const tenantUrl =
    process.env.NEXT_PUBLIC_TENANT_URL ?? "https://tenant.hwe.dkpsolution.tech";
  const { format: fmtPrice } = useCurrency();
  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
      <div className="lg:col-span-3 relative">
        <PropertyCard
          title={property.title}
          city={property.city}
          price={property.price}
          currency={property.currency}
          surface={property.surface}
          rooms={property.rooms}
          listingType={property.listingType}
          propertyType={property.propertyType}
          images={(property.media ?? []).map((m) => ({
            url: m.url,
            alt: m.alt ?? property.title,
          }))}
          thumbnailUrl={property.media?.[0]?.url ?? null}
          displayPrice={fmtPrice(property.price, property.currency)}
          href={`${tenantUrl}/properties/${property.id}`}
          favoritable
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          eyebrow={t("featured.eyebrow")}
        />
      </div>
      <div className="lg:col-span-2 flex flex-col justify-center">
        <span className="eyebrow">{t("featured.eyebrow")}</span>
        <h3 className="display-serif text-4xl sm:text-5xl mt-3 leading-[1.05]">
          {property.title}
        </h3>
        <p className="text-ink-muted mt-5 leading-relaxed line-clamp-4">
          {property.description}
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
          <Specced label={t("featured.surface")} value={`${property.surface} m²`} />
          <Specced label={t("featured.rooms")} value={property.rooms || "—"} />
          <Specced label={t("featured.city")} value={property.city} />
        </div>
        <a
          href={`${tenantUrl}/properties/${property.id}`}
          className="mt-8 inline-flex items-center gap-2 h-11 w-fit px-6 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {t("featured.discover")}
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

function Specced({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </div>
      <div className="display-serif text-xl mt-1 text-ink">{value}</div>
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="eyebrow text-cream-200/70 mb-4">{title}</div>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-cream-200/85 hover:text-cream-50 transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Icônes catégories ───────────────────────────────────────────────────────
function IconSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
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
function IconVilla() {
  return (
    <IconSvg>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9h14v-9" />
      <rect x="9" y="13" width="6" height="6" />
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

function LogoMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={inverted ? "#d3f2e2" : "#0b6143"} />
          <stop offset="100%" stopColor="#e17942" />
        </linearGradient>
      </defs>
      <path
        d="M6 26 V12 L16 4 L26 12 V26 H20 V18 H12 V26 Z"
        fill="url(#logo-grad)"
      />
    </svg>
  );
}
