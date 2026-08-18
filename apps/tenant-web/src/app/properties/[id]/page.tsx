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
import { useCurrency } from "../../../lib/currency-context";
import { useAuth } from "../../../lib/auth-context";
import type {
  Property,
  PricingRate,
  LeaseDurationUnit,
  RentalKind,
} from "@hwe/types";
import {
  LEASE_DURATION_UNIT_LABELS,
  RENTAL_KIND_LABELS,
  computeRentalTotal,
} from "@hwe/types";

type DurationUnit = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

const UNIT_LABELS: Record<DurationUnit, string> = {
  DAYS: "jour(s)",
  WEEKS: "semaine(s)",
  MONTHS: "mois",
  YEARS: "an(s)",
};

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
  const STEPS: StepperItem[] = React.useMemo(() => {
    const base: StepperItem[] = [
      { id: "overview", title: "Aperçu", icon: "👁" },
      { id: "gallery", title: "Galerie", icon: "📸" },
      { id: "features", title: "Caractéristiques", icon: "📐" },
    ];
    if (isSale) {
      base.push({ id: "sale-info", title: "Informations vente", icon: "🏷️" });
    } else {
      base.push({ id: "rent-info", title: "Conditions de location", icon: "🔑" });
    }
    base.push({ id: "location", title: "Localisation", icon: "📍" });
    base.push(
      isOwner
        ? { id: "your-bien", title: "Votre bien", icon: "👤" }
        : { id: "contact", title: isSale ? "Faire une offre" : "Candidater", icon: "✉️" },
    );
    return base;
  }, [isSale, isOwner]);

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
            Retour au catalogue
          </Link>
          {currentUser && !isOwner && (
            <button
              type="button"
              disabled={favLoading}
              onClick={onToggleFav}
              aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
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
                {isSale ? "À vendre" : "À louer"}
              </Badge>
              <Badge tone="neutral">{p.propertyType}</Badge>
              {!isSale && p.rentalKind && (
                <Badge tone="ocean">{RENTAL_KIND_LABELS[p.rentalKind]}</Badge>
              )}
              {isSale && p.isNew && <Badge tone="success">Neuf / VEFA</Badge>}
              {isSale && p.energyClass && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-2 py-0.5 text-xs">
                  DPE
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
              {isSale ? "Prix de vente" : "Loyer mensuel"}
            </div>
            <div className="display-serif text-4xl gradient-text leading-none">
              {fmtPrice(p.price, p.currency)}
              {!isSale && (
                <span className="text-sm font-normal text-ink-muted ml-1">
                  /mois
                </span>
              )}
            </div>
            {!isSale && p.chargesIncluded === false && p.chargesAmount && (
              <div className="text-xs text-ink-muted mt-1">
                + {fmtPrice(p.chargesAmount, p.currency)} de charges
              </div>
            )}
            {!isSale && p.chargesIncluded === true && (
              <div className="text-xs text-ink-muted mt-1">Charges incluses</div>
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
              C'est votre annonce
            </div>
            <div className="text-sm text-ink-muted">
              Vous ne pouvez pas {isSale ? "acheter" : "louer"} votre propre
              bien. Gérez-le depuis votre tableau de bord.
            </div>
          </div>
          <a
            href={
              (process.env.NEXT_PUBLIC_OWNER_URL ?? "http://localhost:3004") +
              `/dashboard/${p.id}/edit`
            }
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Modifier l'annonce
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
          Étape précédente
        </Button>
        <div className="text-xs text-ink-muted">
          Étape {activeIndex + 1} sur {STEPS.length}
        </div>
        <Button
          variant="gradient"
          onClick={goNext}
          disabled={!canNext}
          className="gap-1.5"
        >
          Étape suivante
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
            fallback={<span className="display-serif">Aucune photo</span>}
          />
        </div>
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">Description</h2>
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
                {isSale ? "Prix de vente" : "Loyer mensuel"}
              </div>
              <div className="display-serif text-3xl gradient-text leading-none">
                {fmtPrice(p.price, p.currency)}
              </div>
              {isSale && p.surface && (
                <div className="text-xs text-ink-muted mt-1">
                  Soit {fmtPrice(Math.round(p.price / p.surface), p.currency)}{" "}
                  / m²
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
              <Mini label="Surface" value={`${p.surface} m²`} />
              <Mini label="Pièces" value={p.rooms || "—"} />
              <Mini label="Chambres" value={p.bedrooms || "—"} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-medium text-sm">Points clés</h3>
          </CardHeader>
          <CardBody className="space-y-2 text-sm">
            {p.furnished && <KeyPoint icon="🛋️" text="Meublé" />}
            {p.hasParking && <KeyPoint icon="🅿️" text="Parking inclus" />}
            {p.hasBalcony && <KeyPoint icon="🪟" text="Balcon" />}
            {p.hasGarden && <KeyPoint icon="🌿" text="Jardin" />}
            {p.hasElevator && <KeyPoint icon="🛗" text="Ascenseur" />}
            {!isSale && p.rentalKind && (
              <KeyPoint icon="🔑" text={RENTAL_KIND_LABELS[p.rentalKind]} />
            )}
            {isSale && p.isNew && <KeyPoint icon="✨" text="Bien neuf / VEFA" />}
            {!p.furnished &&
              !p.hasParking &&
              !p.hasBalcony &&
              !p.hasGarden &&
              !p.hasElevator && (
                <div className="text-xs text-ink-subtle">
                  Aucun équipement renseigné.
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
          Aucune photo disponible pour ce bien.
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
  const items: { label: string; value: React.ReactNode; icon: string }[] = [
    { icon: "📐", label: "Surface", value: `${p.surface} m²` },
    { icon: "🚪", label: "Pièces", value: p.rooms || "—" },
    { icon: "🛏️", label: "Chambres", value: p.bedrooms || "—" },
    { icon: "🛁", label: "Salles de bain", value: p.bathrooms || "—" },
  ];
  if (p.floor !== null && p.floor !== undefined)
    items.push({ icon: "🏢", label: "Étage", value: p.floor });
  if (p.yearBuilt)
    items.push({ icon: "📅", label: "Année", value: p.yearBuilt });
  items.push(
    { icon: "🛋️", label: "Meublé", value: p.furnished ? "Oui" : "Non" },
    { icon: "🅿️", label: "Parking", value: p.hasParking ? "Oui" : "Non" },
    { icon: "🪟", label: "Balcon", value: p.hasBalcony ? "Oui" : "Non" },
    { icon: "🌿", label: "Jardin", value: p.hasGarden ? "Oui" : "Non" },
    { icon: "🛗", label: "Ascenseur", value: p.hasElevator ? "Oui" : "Non" },
  );

  return (
    <Card>
      <CardHeader>
        <h2 className="font-display text-lg">Caractéristiques détaillées</h2>
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
            <h2 className="font-display text-lg">
              Diagnostic de Performance Énergétique
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Échelle officielle de A (très économe) à G (très énergivore).
            </p>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-6 flex-wrap">
              <EnergyClassBadge
                value={p.energyClass as EnergyClassLetter}
                withStrip={true}
              />
              <div>
                <div className="display-serif text-3xl">
                  Classe {p.energyClass}
                </div>
                <p className="text-sm text-ink-muted">
                  {p.energyClass === "A" || p.energyClass === "B"
                    ? "Bien très peu énergivore — factures réduites."
                    : p.energyClass === "C" || p.energyClass === "D"
                    ? "Performance énergétique correcte."
                    : "Travaux d'isolation potentiellement à prévoir."}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Coûts récurrents */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">Charges & fiscalité</h2>
        </CardHeader>
        <CardBody className="grid sm:grid-cols-2 gap-4">
          {p.coOwnershipFees != null && (
            <FinanceLine
              label="Charges de copropriété"
              value={`${fmtPrice(p.coOwnershipFees, p.currency)} / mois`}
              hint={`Soit ${fmtPrice(p.coOwnershipFees * 12, p.currency)} / an`}
            />
          )}
          {p.propertyTax != null && (
            <FinanceLine
              label="Taxe foncière annuelle"
              value={fmtPrice(p.propertyTax, p.currency)}
              hint="Acquittée chaque année par le propriétaire"
            />
          )}
          {(p.coOwnershipFees == null && p.propertyTax == null) && (
            <div className="col-span-2 text-sm text-ink-muted">
              Aucune information sur les charges ou la fiscalité renseignée par
              le propriétaire.
            </div>
          )}
        </CardBody>
      </Card>

      {/* Frais d'acquisition */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-lg">Frais d'acquisition estimés</h2>
          <p className="text-sm text-ink-muted mt-1">
            Estimation à titre indicatif. À confirmer par votre notaire.
          </p>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/60">
            <span className="text-sm text-ink-muted">Prix de vente</span>
            <span className="font-display text-lg">
              {fmtPrice(p.price, p.currency)}
            </span>
          </div>
          {notaryFees && (
            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <span className="text-sm text-ink-muted">
                Frais de notaire (~{p.notaryFeesRate ?? (p.isNew ? 2.5 : 7.5)} %)
              </span>
              <span className="font-display text-lg">
                {fmtPrice(notaryFees, p.currency)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between py-2 bg-cream-100/60 dark:bg-surface/60 rounded-lg px-3">
            <span className="text-sm font-medium">Budget total estimé</span>
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
          <h2 className="font-display text-lg">Conditions du bail</h2>
        </CardHeader>
        <CardBody className="grid sm:grid-cols-2 gap-4">
          {p.rentalKind && (
            <FinanceLine
              label="Type de bail"
              value={RENTAL_KIND_LABELS[p.rentalKind as RentalKind]}
              hint={
                p.rentalKind === "BARE"
                  ? "Logement vide, bail 3 ans (renouvelable)"
                  : p.rentalKind === "FURNISHED"
                  ? "Logement meublé, bail 1 an minimum"
                  : p.rentalKind === "SEASONAL"
                  ? "Court séjour, vacances"
                  : "Bail étudiant 9 mois"
              }
            />
          )}
          <FinanceLine
            label="Charges"
            value={
              p.chargesIncluded === true
                ? "Incluses dans le loyer"
                : p.chargesIncluded === false
                ? `+ ${fmtPrice(p.chargesAmount ?? 0, p.currency)} / mois`
                : "Non renseigné"
            }
            hint={
              p.chargesIncluded === false
                ? "Eau, chauffage, copro, ascenseur…"
                : undefined
            }
          />
          {p.deposit != null && (
            <FinanceLine
              label="Dépôt de garantie"
              value={fmtPrice(p.deposit, p.currency)}
              hint="Restitué en fin de bail, déduction faite des éventuels manquements"
            />
          )}
          {p.noticeMonths != null && (
            <FinanceLine
              label="Préavis"
              value={`${p.noticeMonths} ${p.noticeMonths > 1 ? "mois" : "mois"}`}
              hint="Délai à respecter pour résilier"
            />
          )}
          {p.petsAllowed != null && (
            <FinanceLine
              label="Animaux"
              value={p.petsAllowed ? "🐾 Acceptés" : "✕ Non autorisés"}
            />
          )}
        </CardBody>
      </Card>

      {/* Récapitulatif "Budget mensuel" */}
      <Card className="glass-strong">
        <CardHeader>
          <h2 className="font-display text-lg">Budget mensuel</h2>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/60">
            <span className="text-sm text-ink-muted">Loyer hors charges</span>
            <span className="font-display text-lg">
              {fmtPrice(p.price, p.currency)}
            </span>
          </div>
          {p.chargesIncluded === false && p.chargesAmount != null && (
            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <span className="text-sm text-ink-muted">Charges</span>
              <span className="font-display text-lg">
                + {fmtPrice(p.chargesAmount, p.currency)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between py-2 bg-cream-100/60 dark:bg-surface/60 rounded-lg px-3">
            <span className="text-sm font-medium">Total à prévoir / mois</span>
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
              + dépôt de garantie de {fmtPrice(p.deposit, p.currency)} à l'entrée
              dans les lieux.
            </div>
          )}
        </CardBody>
      </Card>

      {/* Grille tarifaire éventuelle */}
      {rates.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">Grille tarifaire détaillée</h2>
            <p className="text-sm text-ink-muted mt-1">
              Tarifs proposés par le propriétaire selon la durée du séjour.
            </p>
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
                        Par {UNIT_LABELS[unit].replace("(s)", "")}
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
          <h2 className="font-display text-lg">Adresse</h2>
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
            Les coordonnées GPS ne sont pas renseignées pour ce bien.
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
        <h2 className="font-display text-lg">Gérer votre annonce</h2>
        <p className="text-sm text-ink-muted mt-1">
          Vous êtes propriétaire de ce bien. Voici vos raccourcis.
        </p>
      </CardHeader>
      <CardBody className="grid sm:grid-cols-2 gap-3">
        <ActionTile
          href={`${ownerUrl}/dashboard/${p.id}/edit`}
          icon="✏️"
          title="Modifier l'annonce"
          desc="Mettre à jour photos, prix, description"
        />
        <ActionTile
          href={`${ownerUrl}/dashboard/${p.id}/documents`}
          icon="🗂️"
          title="Documents légaux"
          desc="Titre, taxes, diagnostics, copro"
        />
        {p.listingType === "RENT" && (
          <ActionTile
            href={`${ownerUrl}/dashboard/${p.id}/lease`}
            icon="📋"
            title="Contrats de bail"
            desc="Génération, signature, suivi"
          />
        )}
        <ActionTile
          href={`${ownerUrl}/dashboard/inquiries`}
          icon="📩"
          title="Demandes reçues"
          desc="Voir les candidatures pour ce bien"
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
      setError(
        (e as Error).message ||
          "Impossible d'envoyer la demande. Êtes-vous connecté ?",
      );
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
            Connectez-vous pour {isSale ? "faire une offre" : "candidater"}
          </h3>
          <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
            Créez un compte gratuit pour contacter le propriétaire directement,
            sauvegarder vos coups de cœur et suivre vos demandes.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/register">
              <Button variant="gradient">Créer un compte</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary">Se connecter</Button>
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
          <h3 className="display-serif text-3xl mb-2">Demande envoyée</h3>
          <p className="text-sm text-ink-muted mb-2 max-w-md mx-auto">
            Le propriétaire a reçu votre message. Vous pouvez maintenant
            continuer l'échange en direct via la messagerie.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-ink-muted bg-cream-100 dark:bg-surface/60 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-success" />
            Une conversation a été ouverte automatiquement.
          </div>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/messages">
              <Button variant="gradient">💬 Ouvrir la discussion</Button>
            </Link>
            <Link href="/inquiries">
              <Button variant="secondary">Voir mes demandes</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  const SUBSTEPS: StepperItem[] = [
    { id: "1", title: "Coordonnées", icon: "📞" },
    { id: "2", title: isSale ? "Votre projet" : "Souhaits", icon: "🗓️" },
    { id: "3", title: "Message", icon: "✉️" },
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="font-display text-lg">
          {isSale
            ? "Faire une offre auprès du propriétaire"
            : "Candidater à cette location"}
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Trois étapes — moins d'une minute. Une conversation s'ouvrira
          automatiquement après envoi.
        </p>

        {/* Raccourci : ouvrir une discussion directe (sans remplir la candidature) */}
        <button
          type="button"
          onClick={async () => {
            try {
              const convo = await api.startConversation(p.id);
              window.location.href = `/messages?c=${convo.id}`;
            } catch (e) {
              alert(
                "Impossible d'ouvrir la discussion : " +
                  ((e as Error).message ?? "erreur inconnue"),
              );
            }
          }}
          className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-full border border-border bg-cream-50 dark:bg-surface/60 text-sm font-medium text-ink hover:border-brand-400 transition-colors"
        >
          💬 Ou démarrer une discussion directe avec le propriétaire
        </button>

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
                <Label>Votre email</Label>
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
                <Label>Téléphone (optionnel)</Label>
                <Input
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm({ ...form, contactPhone: e.target.value })
                  }
                  placeholder="+33 6 00 00 00 00"
                />
              </div>
              <p className="text-xs text-ink-muted">
                Le propriétaire utilisera ces coordonnées pour vous recontacter.
                Elles restent privées.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <Label>
                  {isSale ? "Date de visite souhaitée" : "Date d'entrée souhaitée"}
                  <span className="text-ink-subtle ml-1">(optionnel)</span>
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
                    Durée limitée (séjour court, location saisonnière…)
                  </label>

                  {form.isDurationLimited && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={1}
                          max={9999}
                          placeholder="ex : 3"
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
                              {UNIT_LABELS[u]}
                            </option>
                          ))}
                        </select>
                      </div>

                      {simulatedTotal !== null && (
                        <div className="rounded-lg bg-brand-50 dark:bg-brand-900/20 border border-brand-200 px-4 py-3">
                          <div className="text-xs text-ink-muted mb-1">
                            Montant estimé pour votre séjour
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
                  Précisez dans votre message si vous comptez financer par prêt
                  immobilier, si vous avez un délai pour la signature, ou toute
                  autre information utile au propriétaire.
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 animate-fade-in">
              <div className="space-y-1">
                <Label>Votre message au propriétaire</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  minLength={10}
                  required
                  rows={6}
                  placeholder={
                    isSale
                      ? "Bonjour, je suis intéressé(e) par votre bien. Mon projet est…"
                      : "Bonjour, je suis intéressé(e) par votre annonce. Je suis…"
                  }
                />
                <p className="text-[11px] text-ink-subtle">
                  Présentez-vous brièvement : votre situation, ce qui vous a
                  plu, vos contraintes éventuelles.
                </p>
              </div>
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
              ← Précédent
            </Button>
            {step < 3 ? (
              <Button
                type="button"
                variant="gradient"
                size="sm"
                onClick={() => setStep((s) => (s < 3 ? ((s + 1) as 2 | 3) : s))}
              >
                Suivant →
              </Button>
            ) : (
              <Button type="submit" variant="gradient" disabled={submitting}>
                {submitting
                  ? "Envoi…"
                  : isSale
                  ? "Envoyer mon offre"
                  : "Envoyer ma candidature"}
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
