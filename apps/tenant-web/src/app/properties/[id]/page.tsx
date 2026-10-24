"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Label,
  Textarea,
  errorText,
  Stepper,
  EnergyClassBadge,
  EmailVerifyNotice,
  ErrorState,
  SafeImage,
  OWNER_URL,
  countryLabel,
  isNotFound,
  loginHref,
  priceUnitSuffix,
  toast,
  tUi,
  useAsync,
  type StepperItem,
  type EnergyClassLetter,
  Icon,
  IconBadge,
  IlloEmpty,
  PropertyGallery,
  AgencyLogo,
  type IconName,
} from "@hwe/ui";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useCurrency } from "../../../lib/currency-context";
import { useAuth } from "../../../lib/auth-context";
import type {
  Property,
  PricingRate,
  LeaseDurationUnit,
  User,
} from "@hwe/types";
import { computeRentalTotal } from "@hwe/types";

type DurationUnit = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

/**
 * Montant affiché « à partir de » : le prix du bien, ou — location tarifée
 * uniquement par la grille (F10, contrat §8) — le tarif de l'unité `priceUnit`.
 */
function headlinePrice(p: Property, rates: PricingRate[]): number {
  // `displayPrice` (API) = montant correspondant à `priceUnit`.
  if (p.listingType === "RENT" && p.displayPrice != null) return p.displayPrice;
  if (p.price) return p.price;
  const unit = p.priceUnit ?? "MONTHS";
  return rates.find((r) => r.unit === unit)?.amount ?? rates[0]?.amount ?? 0;
}

/** Libellé lisible d'un pays stocké en code ISO. */
function countryName(code: string) {
  return /^[A-Za-z]{2}$/.test(code ?? "") ? countryLabel(code.toUpperCase(), code.toUpperCase()) : code;
}

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const { format: fmtPrice } = useCurrency();
  // Jeton optionnel : le propriétaire voit aussi son brouillon (contrat §8).
  const { data: p, error, reload } = useAsync<Property>(
    () => api.getProperty(params!.id),
    [params?.id, user?.id],
    { enabled: !!params?.id },
  );
  const [rates, setRates] = React.useState<PricingRate[]>([]);
  const [isFav, setIsFav] = React.useState(false);
  const [favLoading, setFavLoading] = React.useState(false);

  React.useEffect(() => {
    if (!params?.id) return;
    api
      .getPricingRates(params.id)
      .then((r) => setRates(r as unknown as PricingRate[]))
      .catch(() => setRates([]));
  }, [params?.id]);

  React.useEffect(() => {
    if (!user || !params?.id) return;
    api
      .favoriteIds()
      .then((r) => setIsFav(r.ids.includes(params.id)))
      .catch(() => {});
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
    } catch (e) {
      toast.error(e);
    } finally {
      setFavLoading(false);
    }
  };

  // Lien mort (bien supprimé, brouillon d'un autre) → page introuvable propre.
  if (error && isNotFound(error)) notFound();
  if (error && !p) {
    return (
      <div className="max-w-6xl mx-auto">
        <ErrorState error={error} onRetry={reload} />
      </div>
    );
  }

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
    <article className="max-w-6xl mx-auto pb-12 min-w-0">
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
  currentUser: User | null;
  fmtPrice: (n: number, currency?: string) => string;
}) {
  // ── Steps du wizard ──────────────────────────────────────────────────────
  const { lang } = useLang();
  // Contrat §8 : un bien loué / vendu reste consultable mais n'accepte plus
  // de candidature, d'offre ni de visite (F16).
  const isOpen = (p.status ?? "PUBLISHED") === "PUBLISHED";
  const unitSuffix = priceUnitSuffix(p.priceUnit);
  const mainPrice = headlinePrice(p, rates);
  const STEPS: StepperItem[] = React.useMemo(() => {
    const base: StepperItem[] = [
      { id: "overview", title: t("prop.step.overview"), icon: <Icon name="eye" size={18} /> },
      { id: "gallery", title: t("prop.step.gallery"), icon: <Icon name="camera" size={18} /> },
      { id: "features", title: t("prop.step.features"), icon: <Icon name="ruler" size={18} /> },
    ];
    if (isSale) {
      base.push({ id: "sale-info", title: t("prop.step.saleInfo"), icon: <Icon name="tag" size={18} /> });
    } else {
      base.push({ id: "rent-info", title: t("prop.step.rentInfo"), icon: <Icon name="key" size={18} /> });
    }
    base.push({ id: "location", title: t("prop.step.location"), icon: <Icon name="mapPin" size={18} /> });
    if (isOwner) base.push({ id: "your-bien", title: t("prop.step.yourBien"), icon: <Icon name="user" size={18} /> });
    else if (isOpen)
      base.push({
        id: "contact",
        title: isSale ? t("prop.step.offer") : t("prop.step.apply"),
        icon: <Icon name="mail" size={18} />,
      });
    return base;
  }, [isSale, isOwner, isOpen, lang]);

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
              aria-pressed={isFav}
              className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-xl transition-all ${
                isFav
                  ? "bg-danger/10 text-danger hover:bg-danger/20"
                  : "bg-surface text-ink-muted hover:bg-cream-100 dark:hover:bg-white/5 hover:text-danger"
              } border border-border disabled:opacity-50`}
            >
              <Icon name="heart" size={18} className={isFav ? "fill-current" : ""} />
            </button>
          )}
        </div>

        {/* Hero — titre + listing badge + prix */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {!isOpen && (
                <Badge tone="danger">{tUi(`ui.status.${p.status}`)}</Badge>
              )}
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
            <h1 className="display-serif text-3xl sm:text-5xl leading-[1.05] mb-2 text-ink [overflow-wrap:anywhere]">
              {p.title}
            </h1>
            <div className="text-ink-muted flex items-start gap-1.5 min-w-0 [overflow-wrap:anywhere]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 mt-1"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="min-w-0">{p.addressLine}, {p.postalCode} {p.city}</span>
            </div>
          </div>

          <div className="lg:text-end">
            <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted mb-1">
              {isSale ? t("prop.price.sale") : p.priceUnit && p.priceUnit !== "MONTHS" ? t("prop.price.rate") : t("prop.price.rent")}
            </div>
            <div className="display-serif text-3xl sm:text-4xl gradient-text leading-none">
              {fmtPrice(mainPrice, p.currency)}
              {!isSale && (
                <span className="text-sm font-normal text-ink-muted ms-1">{unitSuffix}</span>
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

      {/* ── Bien loué / vendu : plus de candidature ni de visite (F16) ─── */}
      {!isOpen && !isOwner && (
        <div role="status" className="mb-6 rounded-2xl border border-border bg-cream-100 dark:bg-white/5 px-5 py-4 text-sm text-ink">
          {t(p.status === "SOLD" ? "fix.prop.closedSold" : "fix.prop.closedRent")}
        </div>
      )}

      {/* ── Bannière "votre bien" ────────────────────────────────────────── */}
      {isOwner && (
        <div className="mb-6 rounded-2xl border border-accent-300 dark:border-accent-700/40 bg-accent-50 dark:bg-accent-700/15 px-5 py-4 flex items-center gap-4 flex-wrap">
          <IconBadge name="user" tone="accent" size="lg" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-ink">
              {t("prop.owner.title")}
            </div>
            <div className="text-sm text-ink-muted">
              {isSale ? t("prop.owner.textSale") : t("prop.owner.textRent")}
            </div>
          </div>
          <a
            // F3 : URL publique de l'espace propriétaire (repli prod, jamais localhost).
            href={`${OWNER_URL}/dashboard/${p.id}/edit`}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t("prop.owner.edit")}
          </a>
        </div>
      )}

      {/* ── Wizard Stepper ───────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-surface/90 p-2 sm:p-3 mb-6 sticky top-20 z-20 backdrop-blur max-w-full overflow-x-auto">
        <Stepper steps={STEPS} activeId={activeStep} onChange={setActiveStep} />
      </div>

      {/* ── Contenu de l'étape active ────────────────────────────────────── */}
      <div className="min-h-[400px] animate-fade-in">
        {activeStep === "overview" && (
          <StepOverview
            property={p}
            fmtPrice={fmtPrice}
            isSale={isSale}
            mainPrice={mainPrice}
            unitSuffix={unitSuffix}
            onContact={isOpen && !isOwner ? () => setActiveStep("contact") : undefined}
          />
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
        {activeStep === "contact" && !isOwner && isOpen && (
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
        <div className="text-xs text-ink-muted order-first w-full text-center sm:order-none sm:w-auto">
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

// U7 : la première étape montre l'essentiel (photos, prix, description,
// caractéristiques) sans obliger à parcourir tout l'assistant.
function StepOverview({
  property: p,
  fmtPrice,
  isSale,
  mainPrice,
  unitSuffix,
  onContact,
}: {
  property: Property;
  fmtPrice: (n: number, currency?: string) => string;
  isSale: boolean;
  mainPrice: number;
  unitSuffix: string;
  onContact?: () => void;
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-6 min-w-0">
      <div className="lg:col-span-2 space-y-6 min-w-0">
        {/* Galerie : grande photo, vignettes, plein écran */}
        <PropertyGallery
          images={(p.media ?? []).map((m) => ({ url: m.url, alt: m.alt ?? p.title }))}
          propertyType={p.propertyType}
        />
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">{t("prop.description")}</h2>
          </CardHeader>
          <CardBody>
            <p className="whitespace-pre-line text-sm leading-relaxed [overflow-wrap:anywhere]">
              {p.description}
            </p>
          </CardBody>
        </Card>
        <StepFeatures property={p} />
      </div>

      {/* Récap rapide */}
      <aside className="space-y-4 min-w-0">
        <Card className="glass-strong">
          <CardBody className="space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted mb-1">
                {isSale ? t("prop.price.sale") : p.priceUnit && p.priceUnit !== "MONTHS" ? t("prop.price.rate") : t("prop.price.rent")}
              </div>
              <div className="display-serif text-3xl gradient-text leading-none">
                {fmtPrice(mainPrice, p.currency)}
                {!isSale && <span className="text-sm font-sans text-ink-muted ms-1">{unitSuffix}</span>}
              </div>
              {isSale && p.surface > 0 && (
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
            {onContact && (
              <Button variant="gradient" className="w-full" onClick={onContact}>
                {isSale ? t("prop.step.offer") : t("prop.step.apply")}
              </Button>
            )}
          </CardBody>
        </Card>

        {p.managedBy ? (
          <AgencyCard agency={p.managedBy} onContact={onContact} />
        ) : (
          p.owner && <OwnerCard owner={p.owner} onContact={onContact} />
        )}

        <Card>
          <CardHeader>
            <h3 className="font-medium text-sm">{t("prop.keyPoints")}</h3>
          </CardHeader>
          <CardBody className="space-y-2 text-sm">
            {p.furnished && <KeyPoint icon="sofa" text={t("prop.furnished")} />}
            {p.hasParking && (
              <KeyPoint icon="car" text={t("prop.parkingIncluded")} />
            )}
            {p.hasBalcony && <KeyPoint icon="balcony" text={t("prop.balcony")} />}
            {p.hasGarden && <KeyPoint icon="leaf" text={t("prop.garden")} />}
            {p.hasElevator && <KeyPoint icon="elevator" text={t("prop.elevator")} />}
            {!isSale && p.rentalKind && (
              <KeyPoint icon="key" text={t("prop.rentalKind." + p.rentalKind)} />
            )}
            {isSale && p.isNew && (
              <KeyPoint icon="sparkles" text={t("prop.newVefa")} />
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

/** Bien géré par un professionnel : « Proposé par <agence> » à la place du propriétaire. */
function AgencyCard({
  agency,
  onContact,
}: {
  agency: NonNullable<Property["managedBy"]>;
  onContact?: () => void;
}) {
  return (
    <Card className="overflow-hidden" data-agency-card>
      <CardBody className="flex items-center gap-4">
        <AgencyLogo name={agency.name} logoUrl={agency.logoUrl} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">{t("pro.offeredBy")}</div>
          <div className="font-display text-xl text-ink leading-tight [overflow-wrap:anywhere]">{agency.name}</div>
          <Link
            href={`/agences/${encodeURIComponent(agency.slug)}`}
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-700 dark:text-brand-300 hover:underline"
          >
            <Icon name="building" size={14} />
            {t("pro.seeAgency")}
          </Link>
        </div>
      </CardBody>
      {onContact && (
        <div className="px-5 pb-5 -mt-1">
          <Button variant="secondary" className="w-full" onClick={onContact}>
            <Icon name="message" size={16} className="me-1.5" />
            {t("pro.contactAgency")}
          </Button>
        </div>
      )}
    </Card>
  );
}

/** Propriétaire mis en avant : avatar (ou initiales), nom, statut particulier. */
function OwnerCard({ owner, onContact }: { owner: NonNullable<Property["owner"]>; onContact?: () => void }) {
  const initials = `${owner.firstName?.[0] ?? ""}${owner.lastName?.[0] ?? ""}`.toUpperCase();
  const lastInitial = owner.lastName ? ` ${owner.lastName.charAt(0).toUpperCase()}.` : "";
  return (
    <Card className="overflow-hidden">
      <CardBody className="flex items-center gap-4">
        <span className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden ring-4 ring-brand-50 dark:ring-brand-900/40 bg-gradient-to-br from-brand-500 to-accent-500 text-white flex items-center justify-center font-display text-xl">
          <SafeImage
            src={owner.avatarUrl}
            alt={`${owner.firstName}${lastInitial}`}
            className="h-full w-full object-cover"
            fallbackClassName="h-full w-full from-brand-600 to-accent-500 text-white"
            fallback={<span className="font-display text-xl">{initials || "?"}</span>}
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">{t("vis.owner.by")}</div>
          <div className="font-display text-xl text-ink leading-tight [overflow-wrap:anywhere]">
            {owner.firstName}
            {lastInitial}
          </div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs text-brand-700 dark:text-brand-300">
            <Icon name="shield" size={14} />
            {t("vis.owner.private")}
          </div>
        </div>
      </CardBody>
      {onContact && (
        <div className="px-5 pb-5 -mt-1">
          <Button variant="secondary" className="w-full" onClick={onContact}>
            <Icon name="message" size={16} className="me-1.5" />
            {t("vis.owner.contact")}
          </Button>
        </div>
      )}
    </Card>
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
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted truncate">
        {label}
      </div>
      <div className="display-serif text-lg mt-0.5 [overflow-wrap:anywhere]">{value}</div>
    </div>
  );
}

function KeyPoint({ icon, text }: { icon: IconName; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} size={16} className="text-brand-600 dark:text-brand-300" />
      {text}
    </div>
  );
}

function StepGallery({ property: p }: { property: Property }) {
  return (
    <PropertyGallery
      images={(p.media ?? []).map((m) => ({ url: m.url, alt: m.alt ?? p.title }))}
      propertyType={p.propertyType}
      aspectClassName="aspect-[4/3] sm:aspect-[16/9]"
    />
  );
}

function StepFeatures({ property: p }: { property: Property }) {
  const yesNo = (v: boolean) => (v ? t("prop.yes") : t("prop.no"));
  const items: { label: string; value: React.ReactNode; icon: IconName }[] = [
    { icon: "ruler", label: t("prop.surface"), value: `${p.surface} m²` },
    { icon: "door", label: t("prop.rooms"), value: p.rooms || "—" },
    { icon: "bed", label: t("prop.bedrooms"), value: p.bedrooms || "—" },
    { icon: "bath", label: t("prop.bathrooms"), value: p.bathrooms || "—" },
  ];
  if (p.floor !== null && p.floor !== undefined)
    items.push({ icon: "stairs", label: t("prop.floor"), value: p.floor });
  if (p.yearBuilt)
    items.push({ icon: "calendar", label: t("prop.year"), value: p.yearBuilt });
  items.push(
    { icon: "sofa", label: t("prop.furnished"), value: yesNo(p.furnished) },
    { icon: "car", label: t("prop.parking"), value: yesNo(p.hasParking) },
    { icon: "balcony", label: t("prop.balcony"), value: yesNo(p.hasBalcony) },
    { icon: "leaf", label: t("prop.garden"), value: yesNo(p.hasGarden) },
    { icon: "elevator", label: t("prop.elevator"), value: yesNo(p.hasElevator) },
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
            className="rounded-xl border border-border/60 bg-cream-50/60 dark:bg-surface/60 px-3 sm:px-4 py-3 min-w-0"
          >
            <div className="flex items-center gap-2 mb-1 min-w-0">
              <Icon name={it.icon} size={18} className="text-brand-600 dark:text-brand-300" />
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink-muted truncate">
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
                      className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/20 p-3 sm:p-4 text-center min-w-0"
                    >
                      <div className="text-[11px] text-ink-muted mb-1 uppercase tracking-[0.14em]">
                        {t("prop.rates.per", {
                          unit: t("prop.unit." + unit).replace("(s)", ""),
                        })}
                      </div>
                      <div className="display-serif text-lg sm:text-xl gradient-text [overflow-wrap:anywhere]">
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
          <div className="text-base [overflow-wrap:anywhere]">
            {p.addressLine}
            <br />
            {p.postalCode} {p.city}
            <br />
            {countryName(p.country)}
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
              <div className="absolute bottom-3 start-3 end-3 w-fit max-w-full truncate px-3 py-1.5 rounded-full bg-surface text-xs text-ink-muted shadow-card">
                {p.city}, {countryName(p.country)}
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
  // F3 : URL publique de l'espace propriétaire (repli prod).
  const ownerUrl = OWNER_URL;
  return (
    <Card>
      <CardHeader>
        <h2 className="font-display text-lg">{t("prop.own.title")}</h2>
        <p className="text-sm text-ink-muted mt-1">{t("prop.own.sub")}</p>
      </CardHeader>
      <CardBody className="grid sm:grid-cols-2 gap-3">
        <ActionTile
          href={`${ownerUrl}/dashboard/${p.id}/edit`}
          icon="pencil"
          title={t("prop.owner.edit")}
          desc={t("prop.own.editDesc")}
        />
        <ActionTile
          href={`${ownerUrl}/dashboard/${p.id}/documents`}
          icon="folder"
          title={t("prop.own.docs")}
          desc={t("prop.own.docsDesc")}
        />
        {p.listingType === "RENT" && (
          <ActionTile
            href={`${ownerUrl}/dashboard/${p.id}/lease`}
            icon="clipboard"
            title={t("prop.own.lease")}
            desc={t("prop.own.leaseDesc")}
          />
        )}
        <ActionTile
          href={`${ownerUrl}/dashboard/inquiries`}
          icon="inbox"
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
  icon: IconName;
  title: string;
  desc: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-xl border border-border bg-surface px-5 py-4 hover:border-brand-300 hover:bg-cream-50 dark:hover:bg-white/5 transition-colors flex items-start gap-3 min-w-0"
    >
      <span className="shrink-0 group-hover:scale-110 transition-transform">
        <IconBadge name={icon} size="sm" />
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
  currentUser: User | null;
  isSale: boolean;
  fmtPrice: (n: number, currency?: string) => string;
}) {
  const router = useRouter();
  const uid = React.useId();
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
  // Conversation ouverte avec la demande (contrat §11), pour « Discuter ».
  const [conversationId, setConversationId] = React.useState<string | null>(null);
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
      const created = await api.sendInquiry({
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
      let convo = created?.conversationId ?? null;
      if (!convo) {
        try {
          const mine = await api.inquiriesSent();
          convo = mine.find((i) => i.id === created?.id)?.conversationId ?? null;
        } catch {
          /* non bloquant */
        }
      }
      setConversationId(convo);
    } catch (e) {
      toast.error(e);
      setError(errorText(e));
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <Card>
        <CardBody className="text-center py-12 px-6">
          <IlloEmpty kind="key" className="mx-auto mb-4 w-40" />
          <h3 className="display-serif text-2xl mb-2">
            {isSale ? t("prop.form.loginSale") : t("prop.form.loginRent")}
          </h3>
          <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
            {t("prop.form.loginSub")}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href={`/register?next=${encodeURIComponent(`/properties/${p.id}`)}`}>
              <Button variant="gradient">{t("prop.form.signup")}</Button>
            </Link>
            <Link href={loginHref(`/properties/${p.id}`)}>
              <Button variant="secondary">{t("prop.form.login")}</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  // Contrat §2 : e-mail non confirmé → encart de vérification au lieu du
  // formulaire (pas de saisie perdue sur un refus 403).
  if (!currentUser.emailVerifiedAt) {
    return <EmailVerifyNotice />;
  }

  if (sent) {
    return (
      <Card>
        <CardBody className="text-center py-12 px-6">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300"><Icon name="party" size={30} /></div>
          <h3 className="display-serif text-3xl mb-2">
            {t("prop.form.sentTitle")}
          </h3>
          <p className="text-sm text-ink-muted mb-2 max-w-md mx-auto">
            {t("prop.form.sentSub")}
          </p>
          {/* U7 : annoncé seulement si la conversation existe réellement. */}
          {conversationId && (
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-ink-muted bg-cream-100 dark:bg-surface/60 px-4 py-2 rounded-full">
              <span className="h-2 w-2 rounded-full bg-success" />
              {t("prop.form.sentConvo")}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {conversationId && (
              <Link href={`/messages?c=${encodeURIComponent(conversationId)}`}>
                <Button variant="gradient">{t("prop.form.openChat")}</Button>
              </Link>
            )}
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
    { id: "1", title: t("prop.form.step1"), icon: <Icon name="phone" size={18} /> },
    {
      id: "2",
      title: isSale ? t("prop.form.step2Sale") : t("prop.form.step2Rent"),
      icon: <Icon name="calendar" size={18} />,
    },
    { id: "3", title: t("prop.form.step3"), icon: <Icon name="send" size={18} /> },
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
              router.push(`/messages?c=${encodeURIComponent(convo.id)}`);
            } catch (e) {
              toast.error(e);
            }
          }}
          className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-full border border-border bg-cream-50 dark:bg-surface/60 text-sm font-medium text-ink hover:border-brand-400 transition-colors max-w-full"
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
                <Label htmlFor={`${uid}-email`}>{t("prop.form.email")}</Label>
                <Input
                  id={`${uid}-email`}
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm({ ...form, contactEmail: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`${uid}-phone`}>{t("prop.form.phone")}</Label>
                <Input
                  id={`${uid}-phone`}
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
                <Label htmlFor={`${uid}-date`}>
                  {isSale ? t("prop.form.dateSale") : t("prop.form.dateRent")}
                  <span className="text-ink-subtle ms-1">
                    {t("prop.form.optional")}
                  </span>
                </Label>
                <Input
                  id={`${uid}-date`}
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <Input
                          aria-label={t("fix.prop.durationValue")}
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
                          aria-label={t("fix.prop.durationUnit")}
                          value={form.leaseDurationUnit}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              leaseDurationUnit: e.target.value as DurationUnit,
                            })
                          }
                          className="h-10 rounded-md border border-border bg-surface text-ink px-3 text-sm"
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
                        <div className="rounded-lg bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 px-4 py-3">
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
                <Label htmlFor={`${uid}-msg`}>{t("prop.form.message")}</Label>
                <Textarea
                  id={`${uid}-msg`}
                  maxLength={4000}
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
                <div role="alert" className="rounded-md border border-danger/30 bg-danger/10 text-danger dark:text-red-300 text-sm px-3 py-2 [overflow-wrap:anywhere]">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navigation entre sous-étapes */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-4 border-t border-border">
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
  // Créneau minimum = maintenant (heure locale, format datetime-local).
  const minSlot = React.useMemo(() => {
    const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    return d.toISOString().slice(0, 16);
  }, []);

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
        className="mt-3 ms-0 sm:ms-3 inline-flex items-center gap-2 px-4 h-10 rounded-full border border-border bg-cream-50 dark:bg-surface/60 text-sm font-medium text-ink hover:border-brand-400 transition-colors"
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
      toast.success(t("fix.prop.visitSent"));
    } catch (e) {
      toast.error(e);
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
          aria-label={t("prop.visit.title")}
          value={slot}
          min={minSlot}
          onChange={(e) => setSlot(e.target.value)}
          className="max-w-[15rem]"
        />
        <Input
          aria-label={t("prop.visit.note")}
          maxLength={500}
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
