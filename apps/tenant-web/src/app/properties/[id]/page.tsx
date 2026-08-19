"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Label,
  Textarea,
  ImageCarousel,
  Stepper,
  EnergyClassBadge,
  type StepperItem,
  type EnergyClassLetter,
} from "@hwe/ui";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useCurrency } from "../../../lib/currency-context";
import { useAuth } from "../../../lib/auth-context";
import type {
  Property,
  PricingRate,
  LeaseDurationUnit,
} from "@hwe/types";
import { computeRentalTotal } from "@hwe/types";

type DurationUnit = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

const formatPrice = (n: number, currency = "EUR", decimals = 0) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const { format: fmtPrice } = useCurrency();
  const [p, setP] = React.useState<Property | null>(null);
  const [rates, setRates] = React.useState<PricingRate[]>([]);
  const [isFav, setIsFav] = React.useState(false);
  const [favLoading, setFavLoading] = React.useState(false);

  React.useEffect(() => {
    if (!params?.id) return;
    api.getProperty(params.id).then(setP);
    api
      .getPricingRates(params.id)
      .then((r) => setRates(r as unknown as PricingRate[]));
  }, [params?.id]);

  React.useEffect(() => {
    if (!user || !params?.id) return;
    api.favoriteIds().then((r) => setIsFav(r.ids.includes(params.id)));
  }, [user, params?.id]);

  const toggleFav = async () => {
    if (!p) return;
    setFavLoading(true);
    try {
      if (isFav) {
        await api.removeFavorite(p.id);
        setIsFav(false);
      } else {
        await api.addFavorite(p.id);
        setIsFav(true);
      }
    } finally {
      setFavLoading(false);
    }
  };

  if (!p) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="h-12 w-2/3 rounded skeleton" />
        <div className="aspect-[16/9] rounded-2xl skeleton" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 rounded-2xl skeleton" />
          <div className="h-64 rounded-2xl skeleton" />
        </div>
      </div>
    );
  }

  const isSale = p.listingType === "SALE";
  const isOwner = !!user && user.id === p.ownerId;

  return (
    <article className="max-w-6xl mx-auto pb-12">
      <PropertyDetailInner
        property={p}
        rates={rates}
        isSale={isSale}
        isOwner={isOwner}
        isFav={isFav}
        favLoading={favLoading}
        onToggleFav={toggleFav}
        currentUser={user}
        fmtPrice={fmtPrice}
      />
    </article>
  );
}

// ─── Composant interne (séparé pour clarifier les hooks) ────────────────────
function PropertyDetailInner({
  property: p,
  rates,
  isSale,
  isOwner,
  isFav,
  favLoading,
  onToggleFav,
  currentUser,
  fmtPrice,
}: {
  property: Property;
  rates: PricingRate[];
  isSale: boolean;
  isOwner: boolean;
  isFav: boolean;
  favLoading: boolean;
  onToggleFav: () => void;
  currentUser: { id: string; email: string; phone?: string | null } | null;
  fmtPrice: (n: number, currency?: string) => string;
}) {
  // ── Steps du wizard ──────────────────────────────────────────────────────
  const { lang } = useLang();
  const STEPS: StepperItem[] = React.useMemo(() => {
    const base: StepperItem[] = [
      { id: "overview", title: t("prop.step.overview"), icon: "👁" },
      { id: "gallery", title: t("prop.step.gallery"), icon: "📸" },
      { id: "features", title: t("prop.step.features"), icon: "📐" },
    ];
    if (isSale) {
      base.push({ id: "sale-info", title: t("prop.step.saleInfo"), icon: "🏷️" });
    } else {
      base.push({ id: "rent-info", title: t("prop.step.rentInfo"), icon: "🔑" });
    }
    base.push({ id: "location", title: t("prop.step.location"), icon: "📍" });
    base.push(
      isOwner
        ? { id: "your-bien", title: t("prop.step.yourBien"), icon: "👤" }
        : {
            id: "contact",
            title: isSale ? t("prop.step.offer") : t("prop.step.apply"),
            icon: "✉️",
          },
    );
    return base;
  }, [isSale, isOwner, lang]);

  const [activeStep, setActiveStep] = React.useState<string>("overview");

  // Active step index for nav buttons
  const activeIndex = STEPS.findIndex((s) => s.id === activeStep);
  const canPrev = activeIndex > 0;
  const canNext = activeIndex >= 0 && activeIndex < STEPS.length - 1;
  const goPrev = () => {
    const prev = STEPS[activeIndex - 1];
    if (prev) setActiveStep(prev.id);
  };
  const goNext = () => {
    const next = STEPS[activeIndex + 1];
    if (next) setActiveStep(next.id);
  };

  // ── Calcul frais de notaire estimés ──────────────────────────────────────
  const notaryFees = React.useMemo(() => {
    if (!isSale) return null;
    const rate = p.notaryFeesRate ?? (p.isNew ? 2.5 : 7.5);
    return Math.round((p.price * rate) / 100);
  }, [isSale, p.price, p.notaryFeesRate, p.isNew]);

  return (
    <>
      {/* ── Header avec retour + favori ────────────────────────────────── */}
      <header className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t("prop.back")}
          </Link>
          {currentUser && !isOwner && (
            <button
              type="button"
              disabled={favLoading}
              onClick={onToggleFav}
              aria-label={isFav ? t("prop.fav.remove") : t("prop.fav.add")}
              className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-xl transition-all ${
                isFav
                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                  : "bg-surface text-ink-muted hover:bg-cream-100 hover:text-red-400"
              } border border-border disabled:opacity-50`}
            >
              {isFav ? "♥" : "♡"}
            </button>
          )}
        </div>

        {/* Hero — titre + listing badge + prix */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge tone={isSale ? "accent" : "brand"} glow>
                {isSale ? t("prop.badge.sale") : t("prop.badge.rent")}
              </Badge>
              <Badge tone="neutral">{t("prop.type." + p.propertyType)}</Badge>
              {!isSale && p.rentalKind && (
                <Badge tone="ocean">{t("prop.rentalKind." + p.rentalKind)}</Badge>
              )}
              {isSale && p.isNew && (
                <Badge tone="success">{t("prop.badge.new")}</Badge>
              )}
              {isSale && p.energyClass && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-2 py-0.5 text-xs">
                  {t("prop.badge.dpe")}
                  <EnergyClassBadge
                    value={p.energyClass as EnergyClassLetter}
                    withStrip={false}
                    className="!h-5 !w-5 text-[10px]"
                  />
                </span>
              )}
            </div>
            <h1 className="display-serif text-4xl sm:text-5xl leading-[1.05] mb-2 text-ink">
              {p.title}
            </h1>
            <div className="text-ink-muted flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {p.addressLine}, {p.postalCode} {p.city}
            </div>
          </div>

          <div className="lg:text-right">
            <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted mb-1">
              {isSale ? t("prop.price.sale") : t("prop.price.rent")}
            </div>
            <div className="display-serif text-4xl gradient-text leading-none">
              {fmtPrice(p.price, p.currency)}
              {!isSale && (
                <span className="text-sm font-normal text-ink-muted ml-1">
                  {t("prop.perMonth")}
                </span>
              )}
            </div>
            {!isSale && p.chargesIncluded === false && p.chargesAmount && (
              <div className="text-xs text-ink-muted mt-1">
                {t("prop.chargesExtra", {
                  amount: fmtPrice(p.chargesAmount, p.currency),
                })}
              </div>
            )}
            {!isSale && p.chargesIncluded === true && (
              <div className="text-xs text-ink-muted mt-1">
                {t("prop.chargesIncluded")}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Bannière "votre bien" ────────────────────────────────────────── */}
      {isOwner && (
        <div className="mb-6 rounded-2xl border border-accent-300 bg-accent-50 dark:bg-accent-900/20 px-5 py-4 flex items-center gap-4 flex-wrap">
          <span className="text-3xl shrink-0">👤</span>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-ink">
              {t("prop.owner.title")}
            </div>
            <div className="text-sm text-ink-muted">
              {isSale ? t("prop.owner.textSale") : t("prop.owner.textRent")}
            </div>
          </div>
          <a
            href={
              (process.env.NEXT_PUBLIC_OWNER_URL ?? "http://localhost:3004") +
              `/dashboard/${p.id}/edit`
            }
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t("prop.owner.edit")}
          </a>
        </div>
      )}

      {/* ── Wizard Stepper ───────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-surface/60 p-3 mb-6 sticky top-20 z-20 backdrop-blur">
        <Stepper steps={STEPS} activeId={activeStep} onChange={setActiveStep} />
      </div>

      {/* ── Contenu de l'étape active ────────────────────────────────────── */}
      <div className="min-h-[400px] animate-fade-in">
        {activeStep === "overview" && (
          <StepOverview property={p} fmtPrice={fmtPrice} isSale={isSale} />
        )}
        {activeStep === "gallery" && <StepGallery property={p} />}
        {activeStep === "features" && <StepFeatures property={p} />}
        {activeStep === "sale-info" && isSale && (
          <StepSaleInfo
            property={p}
            notaryFees={notaryFees}
            fmtPrice={fmtPrice}
          />
        )}
        {activeStep === "rent-info" && !isSale && (
          <StepRentInfo property={p} rates={rates} fmtPrice={fmtPrice} />
        )}
        {activeStep === "location" && <StepLocation property={p} />}
        {activeStep === "your-bien" && isOwner && (
          <StepYourBien property={p} />
        )}
        {activeStep === "contact" && !isOwner && (
          <StepContact
            property={p}
            rates={rates}
            currentUser={currentUser}
            isSale={isSale}
            fmtPrice={fmtPrice}
          />
        )}
      </div>

      {/* ── Navigation prev / next ───────────────────────────────────────── */}
      <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
        <Button
          variant="secondary"
          onClick={goPrev}
          disabled={!canPrev}
          className="gap-1.5"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t("prop.nav.prev")}
        </Button>
        <div className="text-xs text-ink-muted">
          {t("prop.nav.progress", {
            n: activeIndex + 1,
            total: STEPS.length,
          })}
        </div>
        <Button
          variant="gradient"
          onClick={goNext}
          disabled={!canNext}
          className="gap-1.5"
        >
          {t("prop.nav.next")}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Button>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ÉTAPES
// ════════════════════════════════════════════════════════════════════════════

function StepOverview({
  property: p,
  fmtPrice,
  isSale,
}: {
  property: Property;
  fmtPrice: (n: number, currency?: string) => string;
  isSale: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Photo principale */}
        <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-border">
          <ImageCarousel
            images={(p.media ?? []).map((m) => ({
              url: m.url,
              alt: m.alt ?? p.title,
            }))}
            aspectClassName="aspect-[16/10]"
            showArrows
            showDots
            showCounter
            autoPlayMs={6000}
            fallback={
              <span className="display-serif">{t("prop.noPhoto")}</span>
            }
          />
        </div>
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">{t("prop.description")}</h2>
          </CardHeader>
          <CardBody>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {p.description}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Récap rapide */}
      <aside className="space-y-4">
        <Card className="glass-strong">
          <CardBody className="space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted mb-1">
                {isSale ? t("prop.price.sale") : t("prop.price.rent")}
              </div>
              <div className="display-serif text-3xl gradient-text leading-none">
                {fmtPrice(p.price, p.currency)}
              </div>
              {isSale && p.surface && (
                <div className="text-xs text-ink-muted mt-1">
                  {t("prop.pricePerSqm", {
                    amount: fmtPrice(
                      Math.round(p.price / p.surface),
                      p.currency,
                    ),
                  })}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
              <Mini label={t("prop.surface")} value={`${p.surface} m²`} />
              <Mini label={t("prop.rooms")} value={p.rooms || "—"} />
              <Mini label={t("prop.bedrooms")} value={p.bedrooms || "—"} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-medium text-sm">{t("prop.keyPoints")}</h3>
          </CardHeader>
          <CardBody className="space-y-2 text-sm">
            {p.furnished && <KeyPoint icon="🛋️" text={t("prop.furnished")} />}
            {p.hasParking && (
              <KeyPoint icon="🅿️" text={t("prop.parkingIncluded")} />
            )}
            {p.hasBalcony && <KeyPoint icon="🪟" text={t("prop.balcony")} />}
            {p.hasGarden && <KeyPoint icon="🌿" text={t("prop.garden")} />}
            {p.hasElevator && <KeyPoint icon="🛗" text={t("prop.elevator")} />}
            {!isSale && p.rentalKind && (
              <KeyPoint icon="🔑" text={t("prop.rentalKind." + p.rentalKind)} />
            )}
            {isSale && p.isNew && (
              <KeyPoint icon="✨" text={t("prop.newVefa")} />
            )}
            {!p.furnished &&
              !p.hasParking &&
              !p.hasBalcony &&
              !p.hasGarden &&
              !p.hasElevator && (
                <div className="text-xs text-ink-subtle">
                  {t("prop.noAmenities")}
                </div>
              )}
          </CardBody>
        </Card>
      </aside>
    </div>
  );
}

function Mini({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </div>
      <div className="display-serif text-lg mt-0.5">{value}</div>
    </div>
  );
}

function KeyPoint({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true">{icon}</span>
      {text}
    </div>
  );
}

function StepGallery({ property: p }: { property: Property }) {
  if (!p.media || p.media.length === 0) {
    return (
      <Card>
        <CardBody className="py-16 text-center text-ink-muted">
          {t("prop.gallery.empty")}
        </CardBody>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-border">
        <ImageCarousel
          images={p.media.map((m) => ({ url: m.url, alt: m.alt ?? p.title }))}
          aspectClassName="aspect-[16/9]"
          showArrows
          showDots
          showCounter
          autoPlayMs={5000}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {p.media.map((m) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={m.id}
            src={m.url}
            alt={m.alt ?? p.title}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover rounded-xl border border-border hover-lift cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

function StepFeatures({ property: p }: { property: Property }) {
  const yesNo = (v: boolean) => (v ? t("prop.yes") : t("prop.no"));
  const items: { label: string; value: React.ReactNode; icon: string }[] = [
    { icon: "📐", label: t("prop.surface"), value: `${p.surface} m²` },
    { icon: "🚪", label: t("prop.rooms"), value: p.rooms || "—" },
    { icon: "🛏️", label: t("prop.bedrooms"), value: p.bedrooms || "—" },
    { icon: "🛁", label: t("prop.bathrooms"), value: p.bathrooms || "—" },
  ];
  if (p.floor !== null && p.floor !== undefined)
    items.push({ icon: "🏢", label: t("prop.floor"), value: p.floor });
  if (p.yearBuilt)
    items.push({ icon: "📅", label: t("prop.year"), value: p.yearBuilt });
  items.push(
    { icon: "🛋️", label: t("prop.furnished"), value: yesNo(p.furnished) },
    { icon: "🅿️", label: t("prop.parking"), value: yesNo(p.hasParking) },
    { icon: "🪟", label: t("prop.balcony"), value: yesNo(p.hasBalcony) },
    { icon: "🌿", label: t("prop.garden"), value: yesNo(p.hasGarden) },
    { icon: "🛗", label: t("prop.elevator"), value: yesNo(p.hasElevator) },
  );

  return (
    <Card>
      <CardHeader>
        <h2 className="font-display text-lg">{t("prop.features.title")}</h2>
      </CardHeader>
      <CardBody className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="rounded-xl border border-border/60 bg-cream-50/60 dark:bg-surface/60 px-4 py-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg" aria-hidden="true">
                {it.icon}
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                {it.label}
              </span>
            </div>
            <div className="font-display text-lg text-ink">{it.value}</div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

function StepSaleInfo({
  property: p,
  notaryFees,
  fmtPrice,
}: {
  property: Property;
  notaryFees: number | null;
  fmtPrice: (n: number, currency?: string) => string;
}) {
  return (
    <div className="space-y-6">
      {/* DPE */}
      {p.energyClass && (
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">{t("prop.dpe.title")}</h2>
            <p className="text-sm text-ink-muted mt-1">{t("prop.dpe.scale")}</p>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-6 flex-wrap">
              <EnergyClassBadge
                value={p.energyClass as EnergyClassLetter}
                withStrip={true}
              />
              <div>
                <div className="display-serif text-3xl">
                  {t("prop.dpe.class", { letter: p.energyClass })}
                </div>
                <p className="text-sm text-ink-muted">
                  {p.energyClass === "A" || p.energyClass === "B"
                    ? t("prop.dpe.good")
                    : p.energyClass === "C" || p.energyClass === "D"
                    ? t("prop.dpe.ok")
                    : t("prop.dpe.bad")}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Coûts récurrents */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("prop.sale.costs")}</h2>
        </CardHeader>
        <CardBody className="grid sm:grid-cols-2 gap-4">
          {p.coOwnershipFees != null && (
            <FinanceLine
              label={t("prop.sale.coOwnership")}
              value={t("prop.perMonthAmount", {
                amount: fmtPrice(p.coOwnershipFees, p.currency),
              })}
              hint={t("prop.perYearAmount", {
                amount: fmtPrice(p.coOwnershipFees * 12, p.currency),
              })}
            />
          )}
          {p.propertyTax != null && (
            <FinanceLine
              label={t("prop.sale.propertyTax")}
              value={fmtPrice(p.propertyTax, p.currency)}
              hint={t("prop.sale.propertyTaxHint")}
            />
          )}
          {(p.coOwnershipFees == null && p.propertyTax == null) && (
            <div className="col-span-2 text-sm text-ink-muted">
              {t("prop.sale.noCostInfo")}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Frais d'acquisition */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("prop.sale.acqTitle")}</h2>
          <p className="text-sm text-ink-muted mt-1">
            {t("prop.sale.acqHint")}
          </p>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/60">
            <span className="text-sm text-ink-muted">
              {t("prop.price.sale")}
            </span>
            <span className="font-display text-lg">
              {fmtPrice(p.price, p.currency)}
            </span>
          </div>
          {notaryFees && (
            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <span className="text-sm text-ink-muted">
                {t("prop.sale.notary", {
                  rate: p.notaryFeesRate ?? (p.isNew ? 2.5 : 7.5),
                })}
              </span>
              <span className="font-display text-lg">
                {fmtPrice(notaryFees, p.currency)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between py-2 bg-cream-100/60 dark:bg-surface/60 rounded-lg px-3">
            <span className="text-sm font-medium">
              {t("prop.sale.totalBudget")}
            </span>
            <span className="display-serif text-2xl gradient-text">
              {fmtPrice(p.price + (notaryFees ?? 0), p.currency)}
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function StepRentInfo({
  property: p,
  rates,
  fmtPrice,
}: {
  property: Property;
  rates: PricingRate[];
  fmtPrice: (n: number, currency?: string) => string;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("prop.rent.leaseTerms")}</h2>
        </CardHeader>
        <CardBody className="grid sm:grid-cols-2 gap-4">
          {p.rentalKind && (
            <FinanceLine
              label={t("prop.rent.leaseType")}
              value={t("prop.rentalKind." + p.rentalKind)}
              hint={
                p.rentalKind === "BARE"
                  ? t("prop.rent.hintBare")
                  : p.rentalKind === "FURNISHED"
                  ? t("prop.rent.hintFurnished")
                  : p.rentalKind === "SEASONAL"
                  ? t("prop.rent.hintSeasonal")
                  : t("prop.rent.hintStudent")
              }
            />
          )}
          <FinanceLine
            label={t("prop.rent.charges")}
            value={
              p.chargesIncluded === true
                ? t("prop.rent.chargesIn")
                : p.chargesIncluded === false
                ? t("prop.rent.chargesPlus", {
                    amount: fmtPrice(p.chargesAmount ?? 0, p.currency),
                  })
                : t("prop.notSpecified")
            }
            hint={
              p.chargesIncluded === false
                ? t("prop.rent.chargesHint")
                : undefined
            }
          />
          {p.deposit != null && (
            <FinanceLine
              label={t("prop.rent.deposit")}
              value={fmtPrice(p.deposit, p.currency)}
              hint={t("prop.rent.depositHint")}
            />
          )}
          {p.noticeMonths != null && (
            <FinanceLine
              label={t("prop.rent.notice")}
              value={`${p.noticeMonths} ${
                p.noticeMonths > 1 ? t("prop.months") : t("prop.month")
              }`}
              hint={t("prop.rent.noticeHint")}
            />
          )}
          {p.petsAllowed != null && (
            <FinanceLine
              label={t("prop.rent.pets")}
              value={
                p.petsAllowed ? t("prop.rent.petsYes") : t("prop.rent.petsNo")
              }
            />
          )}
        </CardBody>
      </Card>

      {/* Récapitulatif "Budget mensuel" */}
      <Card className="glass-strong">
        <CardHeader>
          <h2 className="font-display text-lg">
            {t("prop.rent.monthlyBudget")}
          </h2>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/60">
            <span className="text-sm text-ink-muted">
              {t("prop.rent.rentExcl")}
            </span>
            <span className="font-display text-lg">
              {fmtPrice(p.price, p.currency)}
            </span>
          </div>
          {p.chargesIncluded === false && p.chargesAmount != null && (
            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <span className="text-sm text-ink-muted">
                {t("prop.rent.charges")}
              </span>
              <span className="font-display text-lg">
                + {fmtPrice(p.chargesAmount, p.currency)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between py-2 bg-cream-100/60 dark:bg-surface/60 rounded-lg px-3">
            <span className="text-sm font-medium">
              {t("prop.rent.totalPerMonth")}
            </span>
            <span className="display-serif text-2xl gradient-text">
              {fmtPrice(
                p.price +
                  (p.chargesIncluded === false ? p.chargesAmount ?? 0 : 0),
                p.currency,
              )}
            </span>
          </div>
          {p.deposit != null && (
            <div className="text-xs text-ink-muted mt-2">
              {t("prop.rent.depositNote", {
                amount: fmtPrice(p.deposit, p.currency),
              })}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Grille tarifaire éventuelle */}
      {rates.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">{t("prop.rates.title")}</h2>
            <p className="text-sm text-ink-muted mt-1">{t("prop.rates.sub")}</p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["DAYS", "WEEKS", "MONTHS", "YEARS"] as DurationUnit[])
                .filter((u) => rates.some((r) => r.unit === u))
                .map((unit) => {
                  const rate = rates.find((r) => r.unit === unit)!;
                  return (
                    <div
                      key={unit}
                      className="rounded-xl border border-brand-200 bg-brand-50 dark:bg-brand-900/20 p-4 text-center"
                    >
                      <div className="text-[11px] text-ink-muted mb-1 uppercase tracking-[0.14em]">
                        {t("prop.rates.per", {
                          unit: t("prop.unit." + unit).replace("(s)", ""),
                        })}
                      </div>
                      <div className="display-serif text-xl gradient-text">
                        {fmtPrice(rate.amount, p.currency)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

function StepLocation({ property: p }: { property: Property }) {
  const hasGeo = p.latitude != null && p.longitude != null;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">{t("prop.loc.address")}</h2>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="text-base">
            {p.addressLine}
            <br />
            {p.postalCode} {p.city}
            <br />
            {p.country}
          </div>
          {hasGeo && (
            <div className="text-xs text-ink-subtle font-mono">
              {p.latitude}, {p.longitude}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Carte (placeholder visuel, intégration carte réelle = lib séparée) */}
      {hasGeo ? (
        <Card>
          <CardBody className="p-0 overflow-hidden">
            <div className="aspect-[16/9] relative bg-gradient-to-br from-ocean-200 via-brand-100 to-sand-100 dark:from-ocean-900 dark:via-brand-900 dark:to-sand-900">
              <div className="absolute inset-0 bg-grid opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="#0b6143"
                    stroke="white"
                    strokeWidth="1.5"
                    className="drop-shadow-lg"
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                    <circle cx="12" cy="10" r="3" fill="white" stroke="none" />
                  </svg>
                  <span className="absolute inset-0 rounded-full bg-brand-500/30 animate-ping" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-surface text-xs text-ink-muted shadow-card">
                {p.city}, {p.country}
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody className="text-sm text-ink-muted">
            {t("prop.loc.noGps")}
          </CardBody>
        </Card>
      )}
    </div>
  );
}

function StepYourBien({ property: p }: { property: Property }) {
  const ownerUrl = process.env.NEXT_PUBLIC_OWNER_URL ?? "http://localhost:3004";
  return (
    <Card>
      <CardHeader>
        <h2 className="font-display text-lg">{t("prop.own.title")}</h2>
        <p className="text-sm text-ink-muted mt-1">{t("prop.own.sub")}</p>
      </CardHeader>
      <CardBody className="grid sm:grid-cols-2 gap-3">
        <ActionTile
          href={`${ownerUrl}/dashboard/${p.id}/edit`}
          icon="✏️"
          title={t("prop.owner.edit")}
          desc={t("prop.own.editDesc")}
        />
        <ActionTile
          href={`${ownerUrl}/dashboard/${p.id}/documents`}
          icon="🗂️"
          title={t("prop.own.docs")}
          desc={t("prop.own.docsDesc")}
        />
        {p.listingType === "RENT" && (
          <ActionTile
            href={`${ownerUrl}/dashboard/${p.id}/lease`}
            icon="📋"
            title={t("prop.own.lease")}
            desc={t("prop.own.leaseDesc")}
          />
        )}
        <ActionTile
          href={`${ownerUrl}/dashboard/inquiries`}
          icon="📩"
          title={t("prop.own.inquiries")}
          desc={t("prop.own.inquiriesDesc")}
        />
      </CardBody>
    </Card>
  );
}

function ActionTile({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-xl border border-border bg-surface px-5 py-4 hover:border-brand-300 hover:bg-cream-50 transition-colors flex items-start gap-3"
    >
      <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-medium text-ink">{title}</div>
        <div className="text-xs text-ink-muted mt-0.5">{desc}</div>
      </div>
    </a>
  );
}

// ── Mini-wizard de contact (à l'intérieur de la step "contact") ─────────────
function StepContact({
  property: p,
  rates,
  currentUser,
  isSale,
  fmtPrice,
}: {
  property: Property;
  rates: PricingRate[];
  currentUser: { id: string; email: string; phone?: string | null } | null;
  isSale: boolean;
  fmtPrice: (n: number, currency?: string) => string;
}) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [form, setForm] = React.useState({
    contactEmail: currentUser?.email ?? "",
    contactPhone: currentUser?.phone ?? "",
    desiredStartDate: "",
    leaseDuration: "",
    leaseDurationUnit: "MONTHS" as DurationUnit,
    isDurationLimited: false,
    message: "",
    shareDossier: false,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Sync auth → form on mount
  React.useEffect(() => {
    if (currentUser) {
      setForm((f) => ({
        ...f,
        contactEmail: f.contactEmail || currentUser.email,
        contactPhone: f.contactPhone || currentUser.phone || "",
      }));
    }
  }, [currentUser]);

  const simulatedTotal = React.useMemo((): number | null => {
    if (!form.isDurationLimited || !form.leaseDuration) return null;
    const n = parseInt(form.leaseDuration, 10);
    if (!n || n <= 0) return null;
    return computeRentalTotal(
      rates,
      n,
      form.leaseDurationUnit as LeaseDurationUnit,
    );
  }, [
    rates,
    form.isDurationLimited,
    form.leaseDuration,
    form.leaseDurationUnit,
  ]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await api.sendInquiry({
        propertyId: p.id,
        message: form.message,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone || undefined,
        shareDossier: form.shareDossier || undefined,
        desiredStartDate: form.desiredStartDate || undefined,
        leaseDuration:
          form.isDurationLimited && form.leaseDuration
            ? parseInt(form.leaseDuration, 10)
            : undefined,
        leaseDurationUnit:
          form.isDurationLimited && form.leaseDuration
            ? form.leaseDurationUnit
            : undefined,
      });
      setSent(true);
    } catch (e) {
      setError((e as Error).message || t("prop.form.errSend"));
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <Card>
        <CardBody className="text-center py-12 px-6">
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="display-serif text-2xl mb-2">
            {isSale ? t("prop.form.loginSale") : t("prop.form.loginRent")}
          </h3>
          <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
            {t("prop.form.loginSub")}
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/register">
              <Button variant="gradient">{t("prop.form.signup")}</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary">{t("prop.form.login")}</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (sent) {
    return (
      <Card>
        <CardBody className="text-center py-12 px-6">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="display-serif text-3xl mb-2">
            {t("prop.form.sentTitle")}
          </h3>
          <p className="text-sm text-ink-muted mb-2 max-w-md mx-auto">
            {t("prop.form.sentSub")}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-ink-muted bg-cream-100 dark:bg-surface/60 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-success" />
            {t("prop.form.sentConvo")}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/messages">
              <Button variant="gradient">{t("prop.form.openChat")}</Button>
            </Link>
            <Link href="/inquiries">
              <Button variant="secondary">
                {t("prop.form.viewRequests")}
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  const SUBSTEPS: StepperItem[] = [
    { id: "1", title: t("prop.form.step1"), icon: "📞" },
    {
      id: "2",
      title: isSale ? t("prop.form.step2Sale") : t("prop.form.step2Rent"),
      icon: "🗓️",
    },
    { id: "3", title: t("prop.form.step3"), icon: "✉️" },
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="font-display text-lg">
          {isSale ? t("prop.form.titleSale") : t("prop.form.titleRent")}
        </h2>
        <p className="text-sm text-ink-muted mt-1">{t("prop.form.sub")}</p>

        {/* Raccourci : ouvrir une discussion directe (sans remplir la candidature) */}
        <button
          type="button"
          onClick={async () => {
            try {
              const convo = await api.startConversation(p.id);
              window.location.href = `/messages?c=${convo.id}`;
            } catch (e) {
              alert(
                t("prop.form.errChat", {
                  msg: (e as Error).message ?? t("prop.form.errUnknown"),
                }),
              );
            }
          }}
          className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-full border border-border bg-cream-50 dark:bg-surface/60 text-sm font-medium text-ink hover:border-brand-400 transition-colors"
        >
          {t("prop.form.directChat")}
        </button>

        <VisitRequest propertyId={p.id} />

        <div className="mt-4">
          <Stepper
            steps={SUBSTEPS}
            activeId={String(step)}
            onChange={(id) => setStep(Number(id) as 1 | 2 | 3)}
          />
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={send} className="space-y-4">
          {step === 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="space-y-1">
                <Label>{t("prop.form.email")}</Label>
                <Input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm({ ...form, contactEmail: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>{t("prop.form.phone")}</Label>
                <Input
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm({ ...form, contactPhone: e.target.value })
                  }
                  placeholder={t("prop.form.phonePlaceholder")}
                />
              </div>
              <p className="text-xs text-ink-muted">
                {t("prop.form.privacy")}
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <Label>
                  {isSale ? t("prop.form.dateSale") : t("prop.form.dateRent")}
                  <span className="text-ink-subtle ml-1">
                    {t("prop.form.optional")}
                  </span>
                </Label>
                <Input
                  type="date"
                  value={form.desiredStartDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setForm({ ...form, desiredStartDate: e.target.value })
                  }
                />
              </div>

              {!isSale && (
                <div className="rounded-xl border border-border bg-cream-50 dark:bg-surface/60 p-4 space-y-3">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isDurationLimited}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          isDurationLimited: e.target.checked,
                          leaseDuration: "",
                        })
                      }
                      className="h-4 w-4 accent-brand-600"
                    />
                    {t("prop.form.limited")}
                  </label>

                  {form.isDurationLimited && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={1}
                          max={9999}
                          placeholder={t("prop.form.egPlaceholder")}
                          value={form.leaseDuration}
                          onChange={(e) =>
                            setForm({ ...form, leaseDuration: e.target.value })
                          }
                          className="w-24"
                        />
                        <select
                          value={form.leaseDurationUnit}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              leaseDurationUnit: e.target.value as DurationUnit,
                            })
                          }
                          className="h-10 rounded-md border border-border bg-surface px-3 text-sm"
                        >
                          {(rates.length > 0
                            ? (rates.map((r) => r.unit) as DurationUnit[])
                            : (["DAYS", "WEEKS", "MONTHS", "YEARS"] as DurationUnit[])
                          ).map((u) => (
                            <option key={u} value={u}>
                              {t("prop.unit." + u)}
                            </option>
                          ))}
                        </select>
                      </div>

                      {simulatedTotal !== null && (
                        <div className="rounded-lg bg-brand-50 dark:bg-brand-900/20 border border-brand-200 px-4 py-3">
                          <div className="text-xs text-ink-muted mb-1">
                            {t("prop.form.simTotal")}
                          </div>
                          <div className="display-serif text-2xl gradient-text">
                            {fmtPrice(simulatedTotal, p.currency)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {isSale && (
                <div className="rounded-xl border border-border bg-cream-50 dark:bg-surface/60 p-4 text-sm text-ink-muted">
                  {t("prop.form.saleTip")}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 animate-fade-in">
              <div className="space-y-1">
                <Label>{t("prop.form.message")}</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  minLength={10}
                  required
                  rows={6}
                  placeholder={
                    isSale ? t("prop.form.phSale") : t("prop.form.phRent")
                  }
                />
                <p className="text-[11px] text-ink-subtle">
                  {t("prop.form.msgHint")}
                </p>
              </div>
              {!isSale && (
                <label className="flex items-start gap-2 cursor-pointer select-none text-sm">
                  <input
                    type="checkbox"
                    checked={form.shareDossier}
                    onChange={(e) => setForm({ ...form, shareDossier: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded"
                  />
                  <span>
                    {t("prop.form.share1")}{" "}
                    <Link href="/profile" className="underline">
                      {t("prop.form.shareLink")}
                    </Link>
                    {t("prop.form.share2")}
                  </span>
                </label>
              )}
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 text-danger text-sm px-3 py-2">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navigation entre sous-étapes */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={step === 1}
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2) : s))}
            >
              {t("prop.form.prev")}
            </Button>
            {step < 3 ? (
              <Button
                type="button"
                variant="gradient"
                size="sm"
                onClick={() => setStep((s) => (s < 3 ? ((s + 1) as 2 | 3) : s))}
              >
                {t("prop.form.next")}
              </Button>
            ) : (
              <Button type="submit" variant="gradient" disabled={submitting}>
                {submitting
                  ? t("prop.form.sending")
                  : isSale
                  ? t("prop.form.submitSale")
                  : t("prop.form.submitRent")}
              </Button>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

// ─── Petits sous-composants ──────────────────────────────────────────────────

function FinanceLine({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted mb-0.5">
        {label}
      </div>
      <div className="display-serif text-lg text-ink leading-tight">
        {value}
      </div>
      {hint && <div className="text-[11px] text-ink-subtle mt-1">{hint}</div>}
    </div>
  );
}

// ─── Demande de visite ─────────────────────────────────────────────────

function VisitRequest({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = React.useState(false);
  const [slot, setSlot] = React.useState("");
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [done, setDone] = React.useState(false);

  if (done) {
    return (
      <p className="mt-3 text-sm text-success">
        {t("prop.visit.done1")}{" "}
        <Link href="/mes-visites" className="underline">
          {t("prop.visit.doneLink")}
        </Link>
        .
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 ml-0 sm:ml-3 inline-flex items-center gap-2 px-4 h-10 rounded-full border border-border bg-cream-50 dark:bg-surface/60 text-sm font-medium text-ink hover:border-brand-400 transition-colors"
      >
        {t("prop.visit.cta")}
      </button>
    );
  }

  const submit = async () => {
    if (!slot) return;
    setBusy(true);
    try {
      await api.requestVisit({ propertyId, proposedAt: new Date(slot).toISOString(), note: note || undefined });
      setDone(true);
    } catch (e) {
      alert(t("prop.visit.err", { msg: (e as Error).message }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4 rounded-xl border border-border bg-cream-50 dark:bg-surface/60 p-4 space-y-3">
      <p className="text-sm font-medium">{t("prop.visit.title")}</p>
      <div className="flex flex-wrap gap-2 items-center">
        <Input
          type="datetime-local"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="max-w-[15rem]"
        />
        <Input
          placeholder={t("prop.visit.note")}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-1 min-w-[10rem]"
        />
        <Button type="button" size="sm" disabled={busy || !slot} onClick={submit}>
          {busy ? t("prop.form.sending") : t("prop.visit.submit")}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          {t("prop.visit.cancel")}
        </Button>
      </div>
    </div>
  );
}
