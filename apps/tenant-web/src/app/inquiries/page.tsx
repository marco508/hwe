"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  ErrorState,
  SafeImage,
  fmtDate,
  fmtDateTime,
  toast,
  useAsync,
  useLoginRedirect,
  Icon,
  type IconName,
} from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import type { Inquiry, InquiryStatus } from "@hwe/types";

const STATUS_TONE: Record<InquiryStatus, "neutral" | "success" | "danger" | "accent" | "brand"> = {
  PENDING: "accent",
  ACCEPTED: "success",
  REJECTED: "danger",
  CANCELLED: "neutral",
};

const STATUS_ICONS: Record<InquiryStatus, IconName> = {
  PENDING: "hourglass",
  ACCEPTED: "party",
  REJECTED: "xCircle",
  CANCELLED: "ban",
};

// Encadré de statut, lisible en clair comme en sombre (U1).
const STATUS_BOX: Record<InquiryStatus, string> = {
  ACCEPTED:
    "bg-brand-50 text-brand-800 border border-brand-100 dark:bg-brand-900/30 dark:text-brand-200 dark:border-brand-800",
  REJECTED: "bg-danger/10 text-danger border border-danger/30 dark:text-red-300",
  CANCELLED: "bg-cream-100 text-ink-muted border border-border dark:bg-white/5",
  PENDING:
    "bg-accent-50 text-accent-700 border border-accent-100 dark:bg-accent-700/15 dark:text-accent-200 dark:border-accent-700/40",
};

/** Lien « Discuter » : conversation de la demande si connue (F18). */
const chatHref = (i: Inquiry) =>
  i.conversationId ? `/messages?c=${encodeURIComponent(i.conversationId)}` : "/messages";

const TABS: { key: InquiryStatus | "ALL"; icon: IconName }[] = [
  { key: "ALL",       icon: "layers" },
  { key: "PENDING",   icon: "hourglass" },
  { key: "ACCEPTED",  icon: "home" },
  { key: "REJECTED",  icon: "xCircle" },
  { key: "CANCELLED", icon: "ban" },
];

type Me = { firstName?: string; lastName?: string; avatarUrl?: string | null } | null;

// ── UserAvatar ────────────────────────────────────────────────────────────────
function UserAvatar({
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
    size === "sm" ? "w-8 h-8 text-xs" :
    size === "lg" ? "w-16 h-16 text-xl" :
    "w-10 h-10 text-sm";
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden shrink-0 bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 font-bold flex items-center justify-center border border-border`}>
      <SafeImage
        src={avatarUrl}
        alt={`${firstName ?? ""} ${lastName ?? ""}`.trim()}
        className="w-full h-full object-cover"
        fallbackClassName="w-full h-full bg-transparent"
        fallback={<span className="select-none">{initials}</span>}
      />
    </div>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function InquiryDetailModal({
  inquiry,
  me,
  onClose,
  onCancel,
  cancelling,
}: {
  inquiry: Inquiry;
  me: Me;
  onClose: () => void;
  onCancel: (id: string) => void;
  cancelling: string | null;
}) {
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();

  // Focus initial dans la modale, rendu au déclencheur à la fermeture (M2).
  React.useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => prev?.focus?.();
  }, []);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const computeEndDate = () => {
    if (!inquiry.desiredStartDate || !inquiry.leaseDuration || !inquiry.leaseDurationUnit) return null;
    // Calcul en UTC (date civile), cohérent avec fmtDate.
    const start = new Date(inquiry.desiredStartDate);
    const end = new Date(start);
    const n = inquiry.leaseDuration;
    switch (inquiry.leaseDurationUnit) {
      case "DAYS":  end.setUTCDate(end.getUTCDate() + n); break;
      case "WEEKS": end.setUTCDate(end.getUTCDate() + n * 7); break;
      case "YEARS": end.setUTCFullYear(end.getUTCFullYear() + n); break;
      default:      end.setUTCMonth(end.getUTCMonth() + n);
    }
    return end;
  };

  const endDate = computeEndDate();

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-surface text-ink rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto min-w-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            {/* F13 : c'est ma propre demande → mon avatar (useAuth). */}
            <UserAvatar
              avatarUrl={me?.avatarUrl}
              firstName={me?.firstName}
              lastName={me?.lastName}
              size="lg"
            />
            <div className="min-w-0">
              <div id={titleId} className="font-display text-xl font-semibold">
                {t("com.inq.myRequest")}
              </div>
              <div className="flex gap-2 mt-1 flex-wrap">
                <Badge tone={STATUS_TONE[inquiry.status]}>
                  {t("com.status." + inquiry.status)}
                </Badge>
                <Badge tone={inquiry.property?.listingType === "SALE" ? "accent" : "brand"}>
                  {inquiry.property?.listingType === "SALE" ? t("com.listing.sale") : t("com.listing.rent")}
                </Badge>
              </div>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("fix.close")}
            className="text-ink-muted hover:text-ink text-xl leading-none mt-1 shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Icon name="x" size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Property */}
          {inquiry.property && (
            <div>
              <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">{t("com.inq.property")}</div>
              <Link
                href={`/properties/${inquiry.property.id}`}
                className="font-medium text-brand-600 hover:underline [overflow-wrap:anywhere]"
              >
                {inquiry.property.title}
              </Link>
              <div className="text-sm text-ink-muted">{inquiry.property.city}</div>
            </div>
          )}

          {/* Message */}
          <div>
            <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">{t("com.inq.myMessage")}</div>
            <p className="text-sm whitespace-pre-line bg-cream-100 dark:bg-white/5 rounded-lg p-3 border border-border [overflow-wrap:anywhere]">
              {inquiry.message}
            </p>
          </div>

          {/* Rental wishes */}
          {(inquiry.desiredStartDate || inquiry.leaseDuration) && (
            <div className="p-3 rounded-lg bg-cream-100 dark:bg-white/5 border border-border text-sm space-y-1">
              <div className="font-semibold text-ink mb-2 flex items-center gap-1.5"><Icon name="calendar" size={16} /> {t("com.inq.wishes")}</div>
              {inquiry.desiredStartDate && (
                <div className="flex justify-between">
                  <span className="text-ink-muted">{t("com.inq.startWanted")}</span>
                  <span className="font-medium">
                    {fmtDate(inquiry.desiredStartDate)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-ink-muted">{t("com.inq.duration")}</span>
                <span className="font-medium">
                  {inquiry.leaseDuration
                    ? `${inquiry.leaseDuration} ${t("com.unit." + (inquiry.leaseDurationUnit ?? "MONTHS"))}`
                    : t("com.inq.openEnded")}
                </span>
              </div>
              {endDate && (
                <div className="flex justify-between">
                  <span className="text-ink-muted">{t("com.inq.endDate")}</span>
                  <span className="font-medium text-brand-700 dark:text-brand-300">
                    {fmtDate(endDate)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Status message */}
          <div className={`rounded-lg px-4 py-3 text-sm flex items-start gap-2 ${STATUS_BOX[inquiry.status]}`}>
            <Icon name={STATUS_ICONS[inquiry.status]} size={18} className="mt-px" />
            <span>{t("com.statusMsg." + inquiry.status)}</span>
          </div>

          {/* Timestamps */}
          <div className="text-xs text-ink-muted space-y-0.5">
            <div>{t("com.inq.sentOn", { date: fmtDateTime(inquiry.createdAt) })}</div>
            {inquiry.resolvedAt && <div>{t("com.inq.repliedOn", { date: fmtDateTime(inquiry.resolvedAt) })}</div>}
            {inquiry.cancelledAt && <div>{t("com.inq.cancelledOn", { date: fmtDateTime(inquiry.cancelledAt) })}</div>}
          </div>

          {/* Actions */}
          {inquiry.status === "PENDING" && (
            <Button
              variant="danger"
              disabled={cancelling === inquiry.id}
              onClick={() => { onCancel(inquiry.id); onClose(); }}
            >
              {cancelling === inquiry.id ? t("com.inq.cancelling") : t("com.inq.cancelRequest")}
            </Button>
          )}
          {inquiry.status === "ACCEPTED" && (
            <div className="space-y-3">
              <div className="text-xs text-brand-700 dark:text-brand-300 font-medium">
                {t("com.inq.acceptedNote", { email: inquiry.contactEmail ?? "" })}
              </div>
              <Link href={chatHref(inquiry)}>
                <Button size="sm" variant="gradient"><Icon name="message" size={15} className="me-1.5" />{t("com.chat")}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── InquiryCard ───────────────────────────────────────────────────────────────
function InquiryCard({
  i,
  me,
  cancelling,
  onCancel,
  onViewDetails,
}: {
  i: Inquiry;
  me: Me;
  cancelling: string | null;
  onCancel: (id: string) => void;
  onViewDetails: (i: Inquiry) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {/* Mon avatar (la demande est la mienne : `sender` n'est pas renvoyé) — F13 */}
          <UserAvatar avatarUrl={me?.avatarUrl} firstName={me?.firstName} lastName={me?.lastName} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <Link href={`/properties/${i.property?.id}`} className="font-display text-lg hover:underline min-w-0 [overflow-wrap:anywhere] line-clamp-2">
                {i.property?.title}
              </Link>
              <div className="flex items-center gap-2 shrink-0">
                <Badge tone={i.property?.listingType === "SALE" ? "accent" : "brand"}>
                  {i.property?.listingType === "SALE" ? t("com.listing.sale") : t("com.listing.rent")}
                </Badge>
                <Badge tone={STATUS_TONE[i.status]}>
                  {t("com.status." + i.status)}
                </Badge>
              </div>
            </div>
            <div className="text-sm text-ink-muted">{i.property?.city}</div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm whitespace-pre-line text-ink-muted mb-3 line-clamp-2 [overflow-wrap:anywhere]">{i.message}</p>

        {(i.desiredStartDate || i.leaseDuration) && (
          <div className="flex flex-wrap gap-4 text-sm mb-4 p-3 rounded-lg bg-cream-100 dark:bg-white/5 border border-border">
            {i.desiredStartDate && (
              <div>
                <span className="text-ink-muted">{t("com.inq.startWantedC")}</span>
                <span className="font-medium">
                  {fmtDate(i.desiredStartDate)}
                </span>
              </div>
            )}
            <div>
              <span className="text-ink-muted">{t("com.inq.durationC")}</span>
              <span className="font-medium">
                {i.leaseDuration
                  ? `${i.leaseDuration} ${t("com.unit." + (i.leaseDurationUnit ?? "MONTHS"))}`
                  : t("com.inq.openEnded")}
              </span>
            </div>
          </div>
        )}

        <div className={`rounded-lg px-4 py-3 text-sm flex items-start gap-2 mb-3 ${STATUS_BOX[i.status]}`}>
          <Icon name={STATUS_ICONS[i.status]} size={18} className="mt-px" />
          <span>{t("com.statusMsg." + i.status)}</span>
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="text-xs text-ink-muted">
            {t("com.inq.sentOn", { date: fmtDateTime(i.createdAt) })}
            {i.resolvedAt && <span> · {t("com.inq.repliedOn", { date: fmtDateTime(i.resolvedAt) })}</span>}
            {i.cancelledAt && <span> · {t("com.inq.cancelledOn", { date: fmtDateTime(i.cancelledAt) })}</span>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button size="sm" variant="secondary" onClick={() => onViewDetails(i)}>
              <Icon name="eye" size={15} className="me-1.5" />{t("com.details")}
            </Button>
            <Link href={chatHref(i)}>
              <Button size="sm" variant="gradient">
                <Icon name="message" size={15} className="me-1.5" />{t("com.chat")}
              </Button>
            </Link>
            {i.status === "PENDING" && (
              <Button
                size="sm"
                variant="danger"
                disabled={cancelling === i.id}
                onClick={() => onCancel(i.id)}
              >
                {cancelling === i.id ? t("com.inq.cancelling") : t("com.cancel")}
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SentInquiriesPage() {
  const auth = useAuth();
  const { user, loading } = auth;
  const router = useRouter();
  useLoginRedirect(auth, router);
  const { data, setData, error, reload } = useAsync<Inquiry[]>(() => api.inquiriesSent(), [user?.id], {
    enabled: !!user,
  });
  const items = data ?? [];
  const setItems = (fn: (prev: Inquiry[]) => Inquiry[]) => setData((prev) => fn(prev ?? []));
  const [cancelling, setCancelling] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<InquiryStatus | "ALL">("ALL");
  const [detailInquiry, setDetailInquiry] = React.useState<Inquiry | null>(null);

  const cancel = async (id: string) => {
    if (!confirm(t("com.inq.confirmCancel"))) return;
    setCancelling(id);
    try {
      const updated = await api.cancelInquiry(id);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? { ...i, ...updated } : i)));
      toast.success(t("fix.inq.cancelled"));
    } catch (e) {
      toast.error(e);
    } finally {
      setCancelling(null);
    }
  };

  if (error && !data) {
    return (
      <section>
        <h1 className="font-display text-3xl mb-6">{t("com.inq.title")}</h1>
        <ErrorState error={error} onRetry={reload} />
      </section>
    );
  }
  if (loading || !user || !data) return <p className="text-ink-muted">{t("com.loading")}</p>;
  const me: Me = user;

  const countByStatus = (key: InquiryStatus | "ALL") =>
    key === "ALL" ? items.length : items.filter((i) => i.status === key).length;

  const visibleItems =
    activeTab === "ALL" ? items : items.filter((i) => i.status === activeTab);

  return (
    <section className="min-w-0">
      <h1 className="font-display text-3xl mb-2">{t("com.inq.title")}</h1>
      <p className="text-ink-muted mb-6">
        {t("com.inq.sub")}
      </p>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
        {TABS.map(({ key, icon }) => {
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
              <span>{t("com.tab." + key)}</span>
              <span className={`ms-1 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                isActive ? "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300" : "bg-cream-100 dark:bg-white/5 text-ink-muted"
              }`}>
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
          title={t("com.inq.emptyTitle")}
          description={t("com.inq.emptyDesc")}
          action={
            <Link href="/" className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
              {t("vis.browse")}
            </Link>
          }
        />
      ) : visibleItems.length === 0 ? (
        <EmptyState
          illustration="search"
          title={t("com.inq.emptyTabTitle")}
          description={t("com.inq.emptyTabDesc")}
        />
      ) : (
        <div className="space-y-4">
          {visibleItems.map((i) => (
            <InquiryCard
              key={i.id}
              i={i}
              me={me}
              cancelling={cancelling}
              onCancel={cancel}
              onViewDetails={setDetailInquiry}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {detailInquiry && (
        <InquiryDetailModal
          inquiry={detailInquiry}
          me={me}
          onClose={() => setDetailInquiry(null)}
          onCancel={cancel}
          cancelling={cancelling}
        />
      )}
    </section>
  );
}
