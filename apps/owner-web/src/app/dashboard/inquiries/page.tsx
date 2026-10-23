"use client";

import * as React from "react";
import Link from "next/link";
import {
  SafeImage,
  ErrorState,
  toast,
  errorText,
  fmtDate,
  fmtDateTime,
  openDataUrl,
  useAsync,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  Badge,
  Button,
  AnimatedBackground,
  Stepper,
  type StepperItem,
  Icon,
  IconBadge,
  type IconName,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import type { Inquiry, InquiryStatus } from "@hwe/types";

/** F18 : « Discuter » ouvre la conversation liée à la demande. */
const chatHref = (i: Inquiry) =>
  i.conversationId ? `/dashboard/messages?c=${encodeURIComponent(i.conversationId)}` : "/dashboard/messages";

// Lien stylé en bouton (évite <button> dans <a>).
const LINK_BTN =
  "inline-flex items-center justify-center h-8 px-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";
const LINK_GRADIENT = `${LINK_BTN} text-white hover:text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 shadow-md`;

const STATUS_TONE: Record<
  InquiryStatus,
  "neutral" | "success" | "danger" | "accent" | "brand"
> = {
  PENDING: "accent",
  ACCEPTED: "success",
  REJECTED: "danger",
  CANCELLED: "neutral",
};

const TABS: { key: InquiryStatus | "ALL"; labelKey: string; icon: IconName }[] = [
  { key: "ALL", labelKey: "com.tab.all", icon: "layers" },
  { key: "PENDING", labelKey: "com.tab.pending", icon: "hourglass" },
  { key: "ACCEPTED", labelKey: "com.tab.accepted", icon: "checkCircle" },
  { key: "REJECTED", labelKey: "com.tab.rejected", icon: "xCircle" },
  { key: "CANCELLED", labelKey: "com.tab.cancelled", icon: "ban" },
];

// ── Stepper transaction ────────────────────────────────────────────────────
function getTransactionSteps(i: Inquiry): {
  steps: StepperItem[];
  activeId: string;
} {
  const isSale = i.property?.listingType === "SALE";
  const steps: StepperItem[] = isSale
    ? [
        { id: "received", title: t("com.step.received"), icon: <Icon name="inbox" size={18} />, done: true },
        {
          id: "accepted",
          title: t("com.step.accepted"),
          icon: <Icon name="handshake" size={18} />,
          done: i.status === "ACCEPTED",
        },
        {
          id: "offer",
          title: t("com.step.offer"),
          icon: <Icon name="message" size={18} />,
          done: i.status === "ACCEPTED",
        },
        { id: "deed", title: t("com.step.deed"), icon: <Icon name="signature" size={18} /> },
      ]
    : [
        { id: "received", title: t("com.step.received"), icon: <Icon name="inbox" size={18} />, done: true },
        {
          id: "accepted",
          title: t("com.step.accepted"),
          icon: <Icon name="handshake" size={18} />,
          done: i.status === "ACCEPTED",
        },
        {
          id: "lease",
          title: t("com.step.lease"),
          icon: <Icon name="clipboard" size={18} />,
          done: i.status === "ACCEPTED" && !!i.leaseId,
        },
        { id: "signed", title: t("com.step.signed"), icon: <Icon name="signature" size={18} /> },
        { id: "active", title: t("com.step.active"), icon: <Icon name="home" size={18} /> },
      ];

  let activeId = "received";
  if (i.status === "ACCEPTED") activeId = isSale ? "offer" : "lease";
  if (i.status === "REJECTED" || i.status === "CANCELLED")
    activeId = "received";

  return { steps, activeId };
}

// ── Avatar helper ─────────────────────────────────────────────────────────
function SenderAvatar({
  avatarUrl,
  firstName,
  lastName,
  size = "md",
}: {
  avatarUrl?: string | null;
  firstName?: string;
  lastName?: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : "?";
  const sizeClass =
    size === "sm"
      ? "w-8 h-8 text-xs"
      : size === "lg"
      ? "w-16 h-16 text-xl"
      : "w-11 h-11 text-sm";
  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-brand-500 to-accent-500 text-white font-bold flex items-center justify-center shadow-card`}
    >
      <SafeImage
        src={avatarUrl}
        alt={`${firstName ?? ""} ${lastName ?? ""}`.trim()}
        className="w-full h-full object-cover"
        fallbackClassName="w-full h-full from-brand-600 to-accent-500 text-white select-none"
        fallback={initials}
      />
    </div>
  );
}

// ── Modal de détail ───────────────────────────────────────────────────────
function InquiryDetailModal({
  inquiry,
  onClose,
  onRespond,
  processing,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onRespond: (id: string, decision: "ACCEPTED" | "REJECTED") => void;
  processing: string | null;
}) {
  const isPending = inquiry.status === "PENDING";
  const isLoading = processing === inquiry.id;
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();
  const { steps, activeId } = getTransactionSteps(inquiry);

  // M2 : focus initial dans la fenêtre, restitué à la fermeture.
  React.useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus?.();
  }, []);
  const isSale = inquiry.property?.listingType === "SALE";

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const computeEndDate = () => {
    if (
      !inquiry.desiredStartDate ||
      !inquiry.leaseDuration ||
      !inquiry.leaseDurationUnit
    )
      return null;
    const start = new Date(inquiry.desiredStartDate);
    const end = new Date(start);
    const n = inquiry.leaseDuration;
    switch (inquiry.leaseDurationUnit) {
      case "DAYS":
        end.setDate(end.getDate() + n);
        break;
      case "WEEKS":
        end.setDate(end.getDate() + n * 7);
        break;
      case "YEARS":
        end.setFullYear(end.getFullYear() + n);
        break;
      default:
        end.setMonth(end.getMonth() + n);
    }
    return end;
  };
  const endDate = computeEndDate();

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-surface text-ink rounded-3xl shadow-elevated w-full max-w-2xl max-h-[92vh] overflow-y-auto animate-scale-in"
      >
        {/* Header avec gradient */}
        <div
          className={`relative px-5 sm:px-8 py-6 ${
            isSale
              ? "bg-gradient-to-br from-accent-500/20 to-sand-200/40"
              : "bg-gradient-to-br from-brand-500/20 to-ocean-200/40"
          }`}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-surface/80 hover:bg-surface flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
            aria-label={t("com.close")}
          >
            <Icon name="x" size={16} strokeWidth={2.2} />
          </button>
          <div className="flex items-center gap-4 flex-wrap pr-8">
            <SenderAvatar
              avatarUrl={inquiry.sender?.avatarUrl}
              firstName={inquiry.sender?.firstName}
              lastName={inquiry.sender?.lastName}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <div id={titleId} className="display-serif text-2xl text-ink leading-tight [overflow-wrap:anywhere]">
                {inquiry.sender?.firstName} {inquiry.sender?.lastName}
              </div>
              <div className="text-sm text-ink-muted [overflow-wrap:anywhere]">
                {inquiry.contactEmail}
              </div>
              {inquiry.contactPhone && (
                <div className="text-sm text-ink-muted">
                  {inquiry.contactPhone}
                </div>
              )}
            </div>
            <Badge tone={STATUS_TONE[inquiry.status]} glow>
              {t("com.status." + inquiry.status)}
            </Badge>
          </div>
        </div>

        {/* Stepper transaction */}
        <div className="px-5 sm:px-8 pt-6 overflow-x-auto">
          <Stepper steps={steps} activeId={activeId} onChange={() => {}} />
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Bien concerné */}
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-cream-50/60 dark:bg-white/5">
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${
                isSale
                  ? "bg-accent-100 text-accent-700"
                  : "bg-brand-100 text-brand-700"
              }`}
              aria-hidden="true"
            >
              <Icon name={isSale ? "tag" : "key"} size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                {isSale ? t("com.sale") : t("com.rental")}
              </div>
              {inquiry.property && (
                <Link
                  href={`/properties/${inquiry.property.id}`}
                  className="font-medium text-ink hover:text-brand-700 transition-colors [overflow-wrap:anywhere]"
                >
                  {inquiry.property.title}
                </Link>
              )}
              <div className="text-xs text-ink-muted">
                {inquiry.property?.city}
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted mb-2">
              {t("com.message")}
            </div>
            <p className="text-sm whitespace-pre-line rounded-xl p-4 bg-cream-50/60 dark:bg-white/5 border border-border leading-relaxed [overflow-wrap:anywhere]">
              {inquiry.message}
            </p>
          </div>

          {/* Dossier de candidature partagé */}
          {inquiry.shareDossier && <DossierBlock inquiryId={inquiry.id} />}

          {/* Souhaits (adaptés au type d'annonce) */}
          {inquiry.desiredStartDate && (
            <div
              className={`p-4 rounded-xl border ${
                isSale
                  ? "bg-accent-50/50 dark:bg-accent-700/15 border-accent-200 dark:border-accent-700/40"
                  : "bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800"
              }`}
            >
              <div
                className={`text-[10px] uppercase tracking-[0.14em] mb-3 font-medium ${
                  isSale
                    ? "text-accent-700 dark:text-accent-300"
                    : "text-brand-700 dark:text-brand-300"
                }`}
              >
                {isSale ? t("com.purchaseProject") : t("com.rentalWishes")}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">
                    {isSale ? t("com.visitDateWanted") : t("com.entryDateWanted")}
                  </span>
                  <span className="font-medium">
                    {fmtDate(inquiry.desiredStartDate)}
                  </span>
                </div>
                {/* Durée et fin prévue : uniquement pour les locations */}
                {!isSale && inquiry.leaseDuration && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">{t("com.durationWanted")}</span>
                      <span className="font-medium">
                        {inquiry.leaseDuration}{" "}
                        {inquiry.leaseDurationUnit
                          ? t("com.duration." + inquiry.leaseDurationUnit)
                          : t("com.duration.MONTHS")}
                      </span>
                    </div>
                    {endDate && (
                      <div className="flex justify-between">
                        <span className="text-ink-muted">{t("com.plannedEnd")}</span>
                        <span className="font-medium text-brand-700 dark:text-brand-300">
                          {fmtDate(endDate)}
                        </span>
                      </div>
                    )}
                  </>
                )}
                {!isSale && !inquiry.leaseDuration && (
                  <div className="flex justify-between">
                    <span className="text-ink-muted">{t("com.durationWanted")}</span>
                    <span className="text-ink-subtle italic">
                      {t("com.notSpecified")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="text-xs text-ink-muted space-y-0.5 pt-2 border-t border-border/60">
            <div>
              {t("com.receivedOn")}{" "}
              {fmtDateTime(inquiry.createdAt)}
            </div>
            {inquiry.resolvedAt && (
              <div>
                {t("com.processedOn")}{" "}
                {fmtDateTime(inquiry.resolvedAt)}
              </div>
            )}
          </div>

          {/* Actions */}
          {isPending ? (
            <div className="flex gap-2 pt-2">
              <Button
                variant="danger"
                disabled={isLoading}
                onClick={() => {
                  onRespond(inquiry.id, "REJECTED");
                  onClose();
                }}
                className="flex-1"
              >
                <Icon name="x" size={16} className="mr-1.5" />
                {t("com.reject")}
              </Button>
              <Button
                variant="gradient"
                disabled={isLoading}
                onClick={() => {
                  onRespond(inquiry.id, "ACCEPTED");
                  onClose();
                }}
                className="flex-1"
              >
                {!isLoading && <Icon name="check" size={16} className="mr-1.5" />}
                {isLoading ? t("com.processing") : t("com.accept")}
              </Button>
            </div>
          ) : inquiry.status === "ACCEPTED" && !isSale && inquiry.leaseId ? (
            <Link href={`/dashboard/${inquiry.propertyId}/lease`} className={`${LINK_GRADIENT} w-full h-10`}>
              <Icon name="clipboard" size={16} className="mr-1.5" />
              {t("com.viewLease")}
            </Link>
          ) : inquiry.status === "ACCEPTED" && isSale ? (
            <div className="rounded-xl border border-accent-200 dark:border-accent-700/40 bg-accent-50/50 dark:bg-accent-700/15 p-4 text-sm">
              <div className="font-medium text-ink mb-1">
                {t("com.buyerAccepted")}
              </div>
              <p className="text-ink-muted text-xs leading-relaxed mb-3">
                {t("com.buyerAcceptedBody1")}
                {" "}
                {inquiry.sender?.firstName}
                {" "}
                {t("com.buyerAcceptedBody2")}
              </p>
              <Link
                href={chatHref(inquiry)}
                className="inline-flex items-center gap-1.5 px-4 h-9 rounded-full bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <Icon name="message" size={14} />
                {t("com.openDiscussion")}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ── InquiryCard ───────────────────────────────────────────────────────────
function InquiryCard({
  i,
  processing,
  onRespond,
  onViewDetails,
}: {
  i: Inquiry;
  processing: string | null;
  onRespond: (id: string, decision: "ACCEPTED" | "REJECTED") => void;
  onViewDetails: (i: Inquiry) => void;
}) {
  const isPending = i.status === "PENDING";
  const isLoading = processing === i.id;
  const isSale = i.property?.listingType === "SALE";
  const { steps, activeId } = getTransactionSteps(i);

  return (
    <Card className="hover-lift overflow-hidden">
      <CardHeader className="border-b-0 pb-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <SenderAvatar
              avatarUrl={i.sender?.avatarUrl}
              firstName={i.sender?.firstName}
              lastName={i.sender?.lastName}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="font-display text-lg [overflow-wrap:anywhere]">
                  {i.sender?.firstName} {i.sender?.lastName}
                </span>
                <Badge tone={STATUS_TONE[i.status]}>
                  {t("com.status." + i.status)}
                </Badge>
              </div>
              <div className="text-sm text-ink-muted [overflow-wrap:anywhere]">
                {i.contactEmail}
                {i.contactPhone && ` · ${i.contactPhone}`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <Badge tone={isSale ? "accent" : "brand"}>
              {isSale ? t("com.saleBadge") : t("com.rentalBadge")}
            </Badge>
            <Link
              href={`/properties/${i.property?.id}`}
              className="text-sm font-medium hover:underline truncate max-w-[180px]"
            >
              {i.property?.title}
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm whitespace-pre-line mb-4 line-clamp-2 text-ink-muted [overflow-wrap:anywhere]">
          {i.message}
        </p>

        {i.desiredStartDate && (
          <div className="flex flex-wrap gap-4 text-xs mb-4 p-3 rounded-lg bg-cream-50/60 dark:bg-white/5 border border-border">
            <div>
              <span className="text-ink-muted">
                {isSale ? t("com.visitWanted") : t("com.entryWanted")}{" "}
              </span>
              <span className="font-medium">
                {fmtDate(i.desiredStartDate, "medium")}
              </span>
            </div>
            {/* Durée — uniquement pour les locations */}
            {!isSale && i.leaseDuration && (
              <div>
                <span className="text-ink-muted">{t("com.durationLabel")} </span>
                <span className="font-medium">
                  {i.leaseDuration}{" "}
                  {i.leaseDurationUnit
                    ? t("com.duration." + i.leaseDurationUnit)
                    : t("com.duration.MONTHS")}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Mini-stepper transaction */}
        {i.status !== "CANCELLED" && i.status !== "REJECTED" && (
          <div className="mb-4 p-3 rounded-xl border border-border bg-cream-50/40 dark:bg-surface/40 overflow-x-auto">
            <Stepper
              steps={steps}
              activeId={activeId}
              onChange={() => {}}
            />
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-ink-muted">
            {t("com.received")} {timeAgo(i.createdAt)}
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onViewDetails(i)}
            >
              <Icon name="eye" size={15} className="mr-1.5" />
              {t("com.details")}
            </Button>
            <Link href={chatHref(i)} className={`${LINK_BTN} text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40`}>
              <Icon name="message" size={15} className="mr-1.5" />
              {t("com.discuss")}
            </Link>
            {isPending ? (
              <>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={isLoading}
                  onClick={() => onRespond(i.id, "REJECTED")}
                >
                  <Icon name="x" size={15} className="mr-1" />
                  {t("com.reject")}
                </Button>
                <Button
                  size="sm"
                  variant="gradient"
                  disabled={isLoading}
                  onClick={() => onRespond(i.id, "ACCEPTED")}
                >
                  {!isLoading && <Icon name="check" size={15} className="mr-1" />}
                  {isLoading ? "…" : t("com.accept")}
                </Button>
              </>
            ) : i.status === "ACCEPTED" && !isSale && i.leaseId ? (
              <Link href={`/dashboard/${i.propertyId}/lease`} className={LINK_GRADIENT}>
                <Icon name="clipboard" size={15} className="mr-1.5" />
                {t("com.contract")}
              </Link>
            ) : null}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return t("com.justNow");
  if (min < 60) return t("com.minAgo", { n: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return t("com.hrAgo", { n: hr });
  const days = Math.floor(hr / 24);
  if (days < 7) return t("com.dayAgo", { n: days });
  return fmtDate(dateStr, "short", { utc: false });
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function ReceivedInquiriesPage() {
  // Session/rôle : dashboard/layout.tsx.
  const { user } = useAuth();
  const { data, setData, error, loading: working, reload } = useAsync(
    () => api.inquiriesReceived(),
    [user?.id],
    { enabled: !!user },
  );
  const items: Inquiry[] = data ?? [];
  const setItems = (fn: (prev: Inquiry[]) => Inquiry[]) => setData((cur) => fn(cur ?? []));
  const [processing, setProcessing] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<InquiryStatus | "ALL">(
    "ALL",
  );
  const [detailInquiry, setDetailInquiry] = React.useState<Inquiry | null>(
    null,
  );

  const respond = async (id: string, decision: "ACCEPTED" | "REJECTED") => {
    const target = items.find((i) => i.id === id);
    // U3 / contrat §10 : la confirmation annonce les vraies conséquences.
    const question =
      decision === "ACCEPTED"
        ? target?.property?.listingType === "SALE"
          ? t("com.confirmAcceptSale")
          : t("com.confirmAcceptRent")
        : t("com.confirmReject");
    if (!confirm(question)) return;
    setProcessing(id);
    try {
      const updated = await api.respondToInquiry(id, decision);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? { ...i, ...updated } : i)));
      toast.success(decision === "ACCEPTED" ? t("com.accepted") : t("com.rejected"));
      // Les autres demandes du bien ont pu être déclinées côté API : on recharge.
      if (decision === "ACCEPTED") reload();
    } catch (e) {
      toast.error(e);
    } finally {
      setProcessing(null);
    }
  };

  if (error && !data) {
    return <ErrorState error={error} title={t("com.loadError")} onRetry={reload} />;
  }

  if (working && !data) {
    return (
      <div className="space-y-6">
        <div className="h-32 rounded-2xl skeleton" />
        <div className="h-24 rounded-2xl skeleton" />
        <div className="h-32 rounded-2xl skeleton" />
      </div>
    );
  }

  const countByStatus = (key: InquiryStatus | "ALL") =>
    key === "ALL"
      ? items.length
      : items.filter((i) => i.status === key).length;

  const visibleItems =
    activeTab === "ALL" ? items : items.filter((i) => i.status === activeTab);

  const stats = {
    total: items.length,
    pending: items.filter((i) => i.status === "PENDING").length,
    accepted: items.filter((i) => i.status === "ACCEPTED").length,
    rejected: items.filter((i) => i.status === "REJECTED").length,
  };

  return (
    <section>
      {/* Hero */}
      <AnimatedBackground
        variant="aurora"
        className="rounded-2xl border border-border/60 px-5 sm:px-8 py-8 mb-8"
      >
        <h1 className="display-serif text-4xl mb-2">
          {t("com.heroTitle1")}{" "}
          <span className="gradient-text">{t("com.heroTitle2")}</span>
        </h1>
        <p className="text-ink-muted">{t("com.heroSub")}</p>

        {/* Stats */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <StatTile
              kicker={t("com.statTotal")}
              value={stats.total}
              icon="inbox"
            />
            <StatTile
              kicker={t("com.tab.pending")}
              value={stats.pending}
              icon="hourglass"
              accent={stats.pending > 0}
            />
            <StatTile
              kicker={t("com.tab.accepted")}
              value={stats.accepted}
              icon="checkCircle"
              accent={false}
            />
            <StatTile
              kicker={t("com.tab.rejected")}
              value={stats.rejected}
              icon="xCircle"
              accent={false}
            />
          </div>
        )}
      </AnimatedBackground>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
        {TABS.map(({ key, labelKey, icon }) => {
          const count = countByStatus(key);
          if (key !== "ALL" && count === 0) return null;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-brand-600 text-brand-700 dark:text-brand-300"
                  : "border-transparent text-ink-muted hover:text-ink hover:border-border"
              }`}
            >
              <Icon name={icon} size={15} />
              <span>{t(labelKey)}</span>
              <span
                className={`ml-1 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                  isActive
                    ? "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
                    : "bg-cream-100 dark:bg-white/5 text-ink-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <EmptyState
          illustration="inbox"
          title={t("com.emptyTitle")}
          description={t("com.emptyDesc")}
          action={
            <Link href="/dashboard" className={LINK_GRADIENT}>
              {t("vis.seeListings")}
            </Link>
          }
        />
      ) : visibleItems.length === 0 ? (
        <EmptyState
          illustration="search"
          title={t("com.emptyTabTitle")}
          description={t("com.emptyTabDesc")}
        />
      ) : (
        <div className="space-y-4">
          {visibleItems.map((i) => (
            <InquiryCard
              key={i.id}
              i={i}
              processing={processing}
              onRespond={respond}
              onViewDetails={setDetailInquiry}
            />
          ))}
        </div>
      )}

      {detailInquiry && (
        <InquiryDetailModal
          inquiry={detailInquiry}
          onClose={() => setDetailInquiry(null)}
          onRespond={respond}
          processing={processing}
        />
      )}
    </section>
  );
}

function StatTile({
  kicker,
  value,
  icon,
  accent = false,
}: {
  kicker: string;
  value: number;
  icon: IconName;
  accent?: boolean;
}) {
  return (
    <div
      className={`glass rounded-xl px-4 py-3 ${
        accent && value > 0 ? "ring-2 ring-accent-300" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <IconBadge name={icon} size="sm" tone={accent && value > 0 ? "accent" : "brand"} />
        <div>
          <div className="display-serif text-xl leading-none gradient-text">
            {value}
          </div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted mt-0.5">
            {kicker}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dossier de candidature ───────────────────────────────────────

function DossierBlock({ inquiryId }: { inquiryId: string }) {
  const [docs, setDocs] = React.useState<Awaited<ReturnType<typeof api.getInquiryDossier>> | null>(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = async () => {
    setOpen(true);
    if (docs) return;
    try {
      setDocs(await api.getInquiryDossier(inquiryId));
    } catch (e) {
      setError(errorText(e));
    }
  };

  // S1 : jamais de document.write d'une donnée fournie par le candidat :
  // data-URL → Blob → URL.createObjectURL, ouverte avec noopener.
  const view = (fileUrl: string, name: string) => {
    if (!openDataUrl(fileUrl, name)) toast.error(t("com.dossierOpenError"));
  };

  return (
    <div className="p-4 rounded-xl border border-brand-200 bg-brand-50 dark:bg-brand-900/20 dark:border-brand-800">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm font-medium">{t("com.dossierShared")}</p>
        {!open && (
          <button type="button" className="text-sm underline" onClick={load}>
            {t("com.dossierView")}
          </button>
        )}
      </div>
      {open && (
        <div className="mt-3 text-sm">
          {error ? (
            <p className="text-ink-muted">{error}</p>
          ) : docs === null ? (
            <p className="text-ink-muted">{t("com.loading")}</p>
          ) : docs.length === 0 ? (
            <p className="text-ink-muted">{t("com.dossierEmpty")}</p>
          ) : (
            <ul className="space-y-1.5">
              {docs.map((d) => (
                <li key={d.id} className="flex flex-wrap items-center gap-2">
                  <span className="font-medium [overflow-wrap:anywhere]">{d.name}</span>
                  <span className="text-ink-muted">
                    {t("com.docType." + d.documentType)}
                  </span>
                  <button type="button" className="underline text-ink-muted" onClick={() => view(d.fileUrl, d.name)}>
                    {t("com.open")}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
