"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, CardBody, CardHeader, EmptyState } from "@hwe/ui";
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

const STATUS_ICONS: Record<InquiryStatus, string> = {
  PENDING: "⏳",
  ACCEPTED: "🎉",
  REJECTED: "❌",
  CANCELLED: "🚫",
};

const TABS: { key: InquiryStatus | "ALL"; emoji: string }[] = [
  { key: "ALL",       emoji: "📋" },
  { key: "PENDING",   emoji: "⏳" },
  { key: "ACCEPTED",  emoji: "🏠" },
  { key: "REJECTED",  emoji: "❌" },
  { key: "CANCELLED", emoji: "🚫" },
];

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
    <div className={`${sizeClass} rounded-full overflow-hidden shrink-0 bg-brand-100 text-brand-700 font-bold flex items-center justify-center border border-border`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover" />
      ) : (
        <span className="select-none">{initials}</span>
      )}
    </div>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function InquiryDetailModal({
  inquiry,
  onClose,
  onCancel,
  cancelling,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onCancel: (id: string) => void;
  cancelling: string | null;
}) {
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const computeEndDate = () => {
    if (!inquiry.desiredStartDate || !inquiry.leaseDuration || !inquiry.leaseDurationUnit) return null;
    const start = new Date(inquiry.desiredStartDate);
    const end = new Date(start);
    const n = inquiry.leaseDuration;
    switch (inquiry.leaseDurationUnit) {
      case "DAYS":  end.setDate(end.getDate() + n); break;
      case "WEEKS": end.setDate(end.getDate() + n * 7); break;
      case "YEARS": end.setFullYear(end.getFullYear() + n); break;
      default:      end.setMonth(end.getMonth() + n);
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
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <UserAvatar
              avatarUrl={inquiry.sender?.avatarUrl}
              firstName={inquiry.sender?.firstName}
              lastName={inquiry.sender?.lastName}
              size="lg"
            />
            <div>
              <div className="font-display text-xl font-semibold">
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
            onClick={onClose}
            className="text-ink-muted hover:text-ink text-xl leading-none mt-1 shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Property */}
          {inquiry.property && (
            <div>
              <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">{t("com.inq.property")}</div>
              <Link
                href={`/properties/${inquiry.property.id}`}
                className="font-medium text-brand-600 hover:underline"
              >
                {inquiry.property.title}
              </Link>
              <div className="text-sm text-ink-muted">{inquiry.property.city}</div>
            </div>
          )}

          {/* Message */}
          <div>
            <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">{t("com.inq.myMessage")}</div>
            <p className="text-sm whitespace-pre-line bg-surface-2 rounded-lg p-3 border border-border">
              {inquiry.message}
            </p>
          </div>

          {/* Rental wishes */}
          {(inquiry.desiredStartDate || inquiry.leaseDuration) && (
            <div className="p-3 rounded-lg bg-slate-50 border border-border text-sm space-y-1">
              <div className="font-semibold text-ink mb-2">📅 {t("com.inq.wishes")}</div>
              {inquiry.desiredStartDate && (
                <div className="flex justify-between">
                  <span className="text-ink-muted">{t("com.inq.startWanted")}</span>
                  <span className="font-medium">
                    {new Date(inquiry.desiredStartDate).toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
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
                  <span className="font-medium text-emerald-700">
                    {endDate.toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Status message */}
          <div className={`rounded-lg px-4 py-3 text-sm flex items-start gap-2 ${
            inquiry.status === "ACCEPTED"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
              : inquiry.status === "REJECTED"
              ? "bg-red-50 text-red-800 border border-red-100"
              : inquiry.status === "CANCELLED"
              ? "bg-slate-50 text-slate-700 border border-slate-200"
              : "bg-amber-50 text-amber-800 border border-amber-100"
          }`}>
            <span className="text-base shrink-0">{STATUS_ICONS[inquiry.status]}</span>
            <span>{t("com.statusMsg." + inquiry.status)}</span>
          </div>

          {/* Timestamps */}
          <div className="text-xs text-ink-muted space-y-0.5">
            <div>{t("com.inq.sentOn", { date: new Date(inquiry.createdAt).toLocaleString("fr-FR") })}</div>
            {inquiry.resolvedAt && <div>{t("com.inq.repliedOn", { date: new Date(inquiry.resolvedAt).toLocaleString("fr-FR") })}</div>}
            {inquiry.cancelledAt && <div>{t("com.inq.cancelledOn", { date: new Date(inquiry.cancelledAt).toLocaleString("fr-FR") })}</div>}
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
            <div className="text-xs text-emerald-700 font-medium">
              {t("com.inq.acceptedNote", { email: inquiry.contactEmail ?? "" })}
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
  cancelling,
  onCancel,
  onViewDetails,
}: {
  i: Inquiry;
  cancelling: string | null;
  onCancel: (id: string) => void;
  onViewDetails: (i: Inquiry) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {/* User's own avatar */}
          <UserAvatar
            avatarUrl={i.sender?.avatarUrl}
            firstName={i.sender?.firstName}
            lastName={i.sender?.lastName}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <Link href={`/properties/${i.property?.id}`} className="font-display text-lg hover:underline truncate">
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
        <p className="text-sm whitespace-pre-line text-ink-muted mb-3 line-clamp-2">{i.message}</p>

        {(i.desiredStartDate || i.leaseDuration) && (
          <div className="flex flex-wrap gap-4 text-sm mb-4 p-3 rounded-lg bg-slate-50 border border-border">
            {i.desiredStartDate && (
              <div>
                <span className="text-ink-muted">{t("com.inq.startWantedC")}</span>
                <span className="font-medium">
                  {new Date(i.desiredStartDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
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

        <div className={`rounded-lg px-4 py-3 text-sm flex items-start gap-2 mb-3 ${
          i.status === "ACCEPTED"
            ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
            : i.status === "REJECTED"
            ? "bg-red-50 text-red-800 border border-red-100"
            : i.status === "CANCELLED"
            ? "bg-slate-50 text-slate-700 border border-slate-200"
            : "bg-amber-50 text-amber-800 border border-amber-100"
        }`}>
          <span className="text-base shrink-0">{STATUS_ICONS[i.status]}</span>
          <span>{t("com.statusMsg." + i.status)}</span>
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="text-xs text-ink-muted">
            {t("com.inq.sentOn", { date: new Date(i.createdAt).toLocaleString("fr-FR") })}
            {i.resolvedAt && <span> · {t("com.inq.repliedOn", { date: new Date(i.resolvedAt).toLocaleString("fr-FR") })}</span>}
            {i.cancelledAt && <span> · {t("com.inq.cancelledOn", { date: new Date(i.cancelledAt).toLocaleString("fr-FR") })}</span>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button size="sm" variant="secondary" onClick={() => onViewDetails(i)}>
              🔍 {t("com.details")}
            </Button>
            <Link href="/messages">
              <Button size="sm" variant="gradient">
                💬 {t("com.chat")}
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
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = React.useState<Inquiry[]>([]);
  const [working, setWorking] = React.useState(true);
  const [cancelling, setCancelling] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<InquiryStatus | "ALL">("ALL");
  const [detailInquiry, setDetailInquiry] = React.useState<Inquiry | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    api.inquiriesSent().then((r) => { setItems(r); setWorking(false); });
  }, [user, loading, router]);

  const cancel = async (id: string) => {
    if (!confirm(t("com.inq.confirmCancel"))) return;
    setCancelling(id);
    try {
      const updated = await api.cancelInquiry(id);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch (e) {
      alert(t("com.error") + (e as Error).message);
    } finally {
      setCancelling(null);
    }
  };

  if (loading || working) return <p className="text-ink-muted">{t("com.loading")}</p>;

  const countByStatus = (key: InquiryStatus | "ALL") =>
    key === "ALL" ? items.length : items.filter((i) => i.status === key).length;

  const visibleItems =
    activeTab === "ALL" ? items : items.filter((i) => i.status === activeTab);

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">{t("com.inq.title")}</h1>
      <p className="text-ink-muted mb-6">
        {t("com.inq.sub")}
      </p>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
        {TABS.map(({ key, emoji }) => {
          const count = countByStatus(key);
          if (key !== "ALL" && count === 0) return null;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-brand-600 text-brand-700"
                  : "border-transparent text-ink-muted hover:text-ink hover:border-border"
              }`}
            >
              <span>{emoji}</span>
              <span>{t("com.tab." + key)}</span>
              <span className={`ml-1 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                isActive ? "bg-brand-100 text-brand-700" : "bg-surface-2 text-ink-muted"
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
          title={t("com.inq.emptyTitle")}
          description={t("com.inq.emptyDesc")}
        />
      ) : visibleItems.length === 0 ? (
        <EmptyState
          title={t("com.inq.emptyTabTitle")}
          description={t("com.inq.emptyTabDesc")}
        />
      ) : (
        <div className="space-y-4">
          {visibleItems.map((i) => (
            <InquiryCard
              key={i.id}
              i={i}
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
          onClose={() => setDetailInquiry(null)}
          onCancel={cancel}
          cancelling={cancelling}
        />
      )}
    </section>
  );
}
