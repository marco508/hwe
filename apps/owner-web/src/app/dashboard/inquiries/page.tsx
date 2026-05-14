"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, EmptyState, Badge, Button } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import type { Inquiry, InquiryStatus } from "@hwe/types";
import { INQUIRY_STATUS_LABELS, LEASE_DURATION_UNIT_LABELS } from "@hwe/types";

const STATUS_TONE: Record<InquiryStatus, "neutral" | "success" | "danger" | "accent" | "brand"> = {
  PENDING: "accent",
  ACCEPTED: "success",
  REJECTED: "danger",
  CANCELLED: "neutral",
};

const TABS: { key: InquiryStatus | "ALL"; label: string; emoji: string }[] = [
  { key: "ALL",       label: "Toutes",          emoji: "📋" },
  { key: "PENDING",   label: "En attente",       emoji: "⏳" },
  { key: "ACCEPTED",  label: "Location en cours", emoji: "🏠" },
  { key: "REJECTED",  label: "Refusées",         emoji: "✕"  },
  { key: "CANCELLED", label: "Annulées",         emoji: "🚫" },
];

// ── Avatar helper ─────────────────────────────────────────────────────────────
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
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-16 h-16 text-xl" : "w-10 h-10 text-sm";
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

// ── Detail modal ──────────────────────────────────────────────────────────────
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

  // Close on backdrop click
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
            <SenderAvatar
              avatarUrl={inquiry.sender?.avatarUrl}
              firstName={inquiry.sender?.firstName}
              lastName={inquiry.sender?.lastName}
              size="lg"
            />
            <div>
              <div className="font-display text-xl font-semibold">
                {inquiry.sender?.firstName} {inquiry.sender?.lastName}
              </div>
              <div className="text-sm text-ink-muted">{inquiry.contactEmail}</div>
              {inquiry.contactPhone && (
                <div className="text-sm text-ink-muted">{inquiry.contactPhone}</div>
              )}
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
          {/* Status + property */}
          <div className="flex flex-wrap gap-2 items-center">
            <Badge tone={STATUS_TONE[inquiry.status]}>
              {INQUIRY_STATUS_LABELS[inquiry.status]}
            </Badge>
            <Badge tone={inquiry.property?.listingType === "SALE" ? "accent" : "brand"}>
              {inquiry.property?.listingType === "SALE" ? "Vente" : "Location"}
            </Badge>
            {inquiry.property && (
              <Link
                href={`/properties/${inquiry.property.id}`}
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                {inquiry.property.title}
              </Link>
            )}
          </div>

          {/* Message */}
          <div>
            <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Message</div>
            <p className="text-sm whitespace-pre-line bg-surface-2 rounded-lg p-3 border border-border">
              {inquiry.message}
            </p>
          </div>

          {/* Rental wishes */}
          {(inquiry.desiredStartDate || inquiry.leaseDuration) && (
            <div className="p-3 rounded-lg bg-brand-50 border border-brand-100 text-sm space-y-1">
              <div className="font-semibold text-brand-700 mb-2">📅 Souhaits de location</div>
              {inquiry.desiredStartDate && (
                <div className="flex justify-between">
                  <span className="text-ink-muted">Début souhaité</span>
                  <span className="font-medium">
                    {new Date(inquiry.desiredStartDate).toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-ink-muted">Durée</span>
                <span className="font-medium">
                  {inquiry.leaseDuration
                    ? `${inquiry.leaseDuration} ${inquiry.leaseDurationUnit ? LEASE_DURATION_UNIT_LABELS[inquiry.leaseDurationUnit] : "mois"}`
                    : "Indéterminée"}
                </span>
              </div>
              {endDate && (
                <div className="flex justify-between">
                  <span className="text-ink-muted">Fin prévue</span>
                  <span className="font-medium text-brand-700">
                    {endDate.toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Timestamps */}
          <div className="text-xs text-ink-muted space-y-0.5">
            <div>Reçu le {new Date(inquiry.createdAt).toLocaleString("fr-FR")}</div>
            {inquiry.resolvedAt && <div>Traité le {new Date(inquiry.resolvedAt).toLocaleString("fr-FR")}</div>}
          </div>

          {/* Actions */}
          {isPending ? (
            <div className="flex gap-2 pt-2">
              <Button
                variant="danger"
                disabled={isLoading}
                onClick={() => { onRespond(inquiry.id, "REJECTED"); onClose(); }}
              >
                ✕ Refuser
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => { onRespond(inquiry.id, "ACCEPTED"); onClose(); }}
              >
                {isLoading ? "Traitement…" : "✓ Accepter"}
              </Button>
            </div>
          ) : inquiry.status === "ACCEPTED" && inquiry.leaseId ? (
            <Link href={`/dashboard/${inquiry.propertyId}/lease`}>
              <Button variant="secondary">📋 Voir le contrat généré</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ── InquiryCard ───────────────────────────────────────────────────────────────
const InquiryCard = ({
  i,
  processing,
  onRespond,
  onViewDetails,
}: {
  i: Inquiry;
  processing: string | null;
  onRespond: (id: string, decision: "ACCEPTED" | "REJECTED") => void;
  onViewDetails: (i: Inquiry) => void;
}) => {
  const isPending = i.status === "PENDING";
  const isLoading = processing === i.id;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <SenderAvatar
              avatarUrl={i.sender?.avatarUrl}
              firstName={i.sender?.firstName}
              lastName={i.sender?.lastName}
            />
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="font-display text-lg">
                  {i.sender?.firstName} {i.sender?.lastName}
                </span>
                <Badge tone={STATUS_TONE[i.status]}>
                  {INQUIRY_STATUS_LABELS[i.status]}
                </Badge>
              </div>
              <div className="text-sm text-ink-muted">
                {i.contactEmail}
                {i.contactPhone && ` · ${i.contactPhone}`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <Badge tone={i.property?.listingType === "SALE" ? "accent" : "brand"}>
              {i.property?.listingType === "SALE" ? "Vente" : "Location"}
            </Badge>
            <Link href={`/properties/${i.property?.id}`} className="text-sm font-medium hover:underline">
              {i.property?.title}
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm whitespace-pre-line mb-3 line-clamp-3">{i.message}</p>

        {(i.desiredStartDate || i.leaseDuration !== undefined) && (
          <div className="flex flex-wrap gap-4 text-sm mb-4 p-3 rounded-lg bg-brand-50 border border-brand-100">
            <span className="text-brand-700 font-medium shrink-0">📅 Souhaits du locataire :</span>
            {i.desiredStartDate && (
              <div>
                <span className="text-ink-muted">Début : </span>
                <span className="font-medium">
                  {new Date(i.desiredStartDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            )}
            <div>
              <span className="text-ink-muted">Durée : </span>
              <span className="font-medium">
                {i.leaseDuration
                  ? `${i.leaseDuration} ${i.leaseDurationUnit ? LEASE_DURATION_UNIT_LABELS[i.leaseDurationUnit] : "mois"}`
                  : "Indéterminée"}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-ink-muted">
            Reçu le {new Date(i.createdAt).toLocaleString("fr-FR")}
            {i.resolvedAt && <span> · Traité le {new Date(i.resolvedAt).toLocaleString("fr-FR")}</span>}
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Always show details button */}
            <Button size="sm" variant="secondary" onClick={() => onViewDetails(i)}>
              🔍 Détails
            </Button>

            {isPending ? (
              <>
                <Button size="sm" variant="danger" disabled={isLoading} onClick={() => onRespond(i.id, "REJECTED")}>
                  ✕ Refuser
                </Button>
                <Button size="sm" disabled={isLoading} onClick={() => onRespond(i.id, "ACCEPTED")}>
                  {isLoading ? "Traitement…" : "✓ Accepter"}
                </Button>
              </>
            ) : i.status === "ACCEPTED" && i.leaseId ? (
              <Link href={`/dashboard/${i.propertyId}/lease`}>
                <Button size="sm" variant="secondary">📋 Contrat</Button>
              </Link>
            ) : null}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ReceivedInquiriesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = React.useState<Inquiry[]>([]);
  const [working, setWorking] = React.useState(true);
  const [processing, setProcessing] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<InquiryStatus | "ALL">("ALL");
  const [detailInquiry, setDetailInquiry] = React.useState<Inquiry | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    api.inquiriesReceived().then((r) => { setItems(r); setWorking(false); });
  }, [user, loading, router]);

  const respond = async (id: string, decision: "ACCEPTED" | "REJECTED") => {
    const label = decision === "ACCEPTED" ? "accepter" : "refuser";
    if (!confirm(`Confirmer : ${label} cette demande ?`)) return;
    setProcessing(id);
    try {
      const updated = await api.respondToInquiry(id, decision);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch (e) {
      alert("Erreur : " + (e as Error).message);
    } finally {
      setProcessing(null);
    }
  };

  if (loading || working) return <p className="text-ink-muted">Chargement…</p>;

  const countByStatus = (key: InquiryStatus | "ALL") =>
    key === "ALL" ? items.length : items.filter((i) => i.status === key).length;

  const visibleItems =
    activeTab === "ALL" ? items : items.filter((i) => i.status === activeTab);

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">Demandes de contact</h1>
      <p className="text-ink-muted mb-6">
        Acceptez ou refusez les candidatures. Un contrat de bail est généré automatiquement en cas d&apos;acceptation.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
        {TABS.map(({ key, label, emoji }) => {
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
              <span>{label}</span>
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
          title="Aucune demande pour le moment"
          description="Les messages des candidats locataires ou acheteurs apparaîtront ici."
        />
      ) : visibleItems.length === 0 ? (
        <EmptyState
          title="Aucune demande dans cette catégorie"
          description="Changez d'onglet pour voir les autres demandes."
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

      {/* Detail modal */}
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
