"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  Badge,
  Button,
  AnimatedBackground,
  Stepper,
  type StepperItem,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import type { Inquiry, InquiryStatus } from "@hwe/types";
import {
  INQUIRY_STATUS_LABELS,
  LEASE_DURATION_UNIT_LABELS,
} from "@hwe/types";

const STATUS_TONE: Record<
  InquiryStatus,
  "neutral" | "success" | "danger" | "accent" | "brand"
> = {
  PENDING: "accent",
  ACCEPTED: "success",
  REJECTED: "danger",
  CANCELLED: "neutral",
};

const TABS: { key: InquiryStatus | "ALL"; label: string; emoji: string }[] = [
  { key: "ALL", label: "Toutes", emoji: "📋" },
  { key: "PENDING", label: "À traiter", emoji: "⏳" },
  { key: "ACCEPTED", label: "Acceptées", emoji: "✓" },
  { key: "REJECTED", label: "Refusées", emoji: "✕" },
  { key: "CANCELLED", label: "Annulées", emoji: "🚫" },
];

// ── Stepper transaction ────────────────────────────────────────────────────
function getTransactionSteps(i: Inquiry): {
  steps: StepperItem[];
  activeId: string;
} {
  const isSale = i.property?.listingType === "SALE";
  const steps: StepperItem[] = isSale
    ? [
        { id: "received", title: "Reçue", icon: "📨", done: true },
        {
          id: "accepted",
          title: "Acceptée",
          icon: "🤝",
          done: i.status === "ACCEPTED",
        },
        {
          id: "offer",
          title: "Négociation",
          icon: "💬",
          done: i.status === "ACCEPTED",
        },
        { id: "deed", title: "Signature", icon: "✍️" },
      ]
    : [
        { id: "received", title: "Reçue", icon: "📨", done: true },
        {
          id: "accepted",
          title: "Acceptée",
          icon: "🤝",
          done: i.status === "ACCEPTED",
        },
        {
          id: "lease",
          title: "Bail généré",
          icon: "📋",
          done: i.status === "ACCEPTED" && !!i.leaseId,
        },
        { id: "signed", title: "Signé", icon: "✍️" },
        { id: "active", title: "Active", icon: "🏠" },
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
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="select-none">{initials}</span>
      )}
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
  const { steps, activeId } = getTransactionSteps(inquiry);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div className="bg-surface rounded-3xl shadow-elevated w-full max-w-2xl max-h-[92vh] overflow-y-auto animate-scale-in">
        {/* Header avec gradient */}
        <div
          className={`relative px-8 py-6 ${
            isSale
              ? "bg-gradient-to-br from-accent-500/20 to-sand-200/40"
              : "bg-gradient-to-br from-brand-500/20 to-ocean-200/40"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-surface/80 hover:bg-surface flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
          <div className="flex items-center gap-4">
            <SenderAvatar
              avatarUrl={inquiry.sender?.avatarUrl}
              firstName={inquiry.sender?.firstName}
              lastName={inquiry.sender?.lastName}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <div className="display-serif text-2xl text-ink leading-tight">
                {inquiry.sender?.firstName} {inquiry.sender?.lastName}
              </div>
              <div className="text-sm text-ink-muted">
                {inquiry.contactEmail}
              </div>
              {inquiry.contactPhone && (
                <div className="text-sm text-ink-muted">
                  {inquiry.contactPhone}
                </div>
              )}
            </div>
            <Badge tone={STATUS_TONE[inquiry.status]} glow>
              {INQUIRY_STATUS_LABELS[inquiry.status]}
            </Badge>
          </div>
        </div>

        {/* Stepper transaction */}
        <div className="px-8 pt-6">
          <Stepper steps={steps} activeId={activeId} onChange={() => {}} />
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Bien concerné */}
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-cream-50/60">
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${
                isSale
                  ? "bg-accent-100 text-accent-700"
                  : "bg-brand-100 text-brand-700"
              }`}
              aria-hidden="true"
            >
              {isSale ? "🏷️" : "🔑"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                {isSale ? "Vente" : "Location"}
              </div>
              {inquiry.property && (
                <Link
                  href={`/properties/${inquiry.property.id}`}
                  className="font-medium text-ink hover:text-brand-700 transition-colors"
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
              Message
            </div>
            <p className="text-sm whitespace-pre-line rounded-xl p-4 bg-cream-50/60 border border-border leading-relaxed">
              {inquiry.message}
            </p>
          </div>

          {/* Souhaits (adaptés au type d'annonce) */}
          {inquiry.desiredStartDate && (
            <div
              className={`p-4 rounded-xl border ${
                isSale
                  ? "bg-accent-50/50 dark:bg-accent-900/15 border-accent-200"
                  : "bg-brand-50 dark:bg-brand-900/20 border-brand-200"
              }`}
            >
              <div
                className={`text-[10px] uppercase tracking-[0.14em] mb-3 font-medium ${
                  isSale
                    ? "text-accent-700 dark:text-accent-300"
                    : "text-brand-700 dark:text-brand-300"
                }`}
              >
                {isSale ? "🏷️ Projet d'achat" : "📅 Souhaits de location"}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">
                    {isSale ? "Date de visite souhaitée" : "Date d'entrée souhaitée"}
                  </span>
                  <span className="font-medium">
                    {new Date(inquiry.desiredStartDate).toLocaleDateString(
                      "fr-FR",
                      { day: "numeric", month: "long", year: "numeric" },
                    )}
                  </span>
                </div>
                {/* Durée et fin prévue : uniquement pour les locations */}
                {!isSale && inquiry.leaseDuration && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Durée souhaitée</span>
                      <span className="font-medium">
                        {inquiry.leaseDuration}{" "}
                        {inquiry.leaseDurationUnit
                          ? LEASE_DURATION_UNIT_LABELS[
                              inquiry.leaseDurationUnit
                            ]
                          : "mois"}
                      </span>
                    </div>
                    {endDate && (
                      <div className="flex justify-between">
                        <span className="text-ink-muted">Fin prévue</span>
                        <span className="font-medium text-brand-700 dark:text-brand-300">
                          {endDate.toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </>
                )}
                {!isSale && !inquiry.leaseDuration && (
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Durée souhaitée</span>
                    <span className="text-ink-subtle italic">
                      Non précisée
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="text-xs text-ink-muted space-y-0.5 pt-2 border-t border-border/60">
            <div>
              Reçue le {new Date(inquiry.createdAt).toLocaleString("fr-FR")}
            </div>
            {inquiry.resolvedAt && (
              <div>
                Traitée le{" "}
                {new Date(inquiry.resolvedAt).toLocaleString("fr-FR")}
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
                ✕ Refuser
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
                {isLoading ? "Traitement…" : "✓ Accepter"}
              </Button>
            </div>
          ) : inquiry.status === "ACCEPTED" && !isSale && inquiry.leaseId ? (
            <Link href={`/dashboard/${inquiry.propertyId}/lease`}>
              <Button variant="gradient" className="w-full">
                📋 Voir le contrat de bail
              </Button>
            </Link>
          ) : inquiry.status === "ACCEPTED" && isSale ? (
            <div className="rounded-xl border border-accent-200 bg-accent-50/50 dark:bg-accent-900/15 p-4 text-sm">
              <div className="font-medium text-ink mb-1">
                🤝 Acheteur accepté
              </div>
              <p className="text-ink-muted text-xs leading-relaxed mb-3">
                Vous pouvez maintenant échanger directement avec
                {" "}
                {inquiry.sender?.firstName} pour la suite : visite, négociation,
                compromis chez le notaire. Quand la vente est finalisée, passez
                l'annonce en "Vendu" depuis votre tableau de bord.
              </p>
              <Link
                href={`/dashboard/messages`}
                className="inline-flex items-center gap-1.5 px-4 h-9 rounded-full bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink text-xs font-medium hover:opacity-90 transition-opacity"
              >
                💬 Ouvrir la discussion
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
            <Badge tone={isSale ? "accent" : "brand"}>
              {isSale ? "🏷️ Vente" : "🔑 Location"}
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
        <p className="text-sm whitespace-pre-line mb-4 line-clamp-2 text-ink-muted">
          {i.message}
        </p>

        {i.desiredStartDate && (
          <div className="flex flex-wrap gap-4 text-xs mb-4 p-3 rounded-lg bg-cream-50/60 border border-border">
            <div>
              <span className="text-ink-muted">
                {isSale ? "Visite souhaitée : " : "Entrée souhaitée : "}
              </span>
              <span className="font-medium">
                {new Date(i.desiredStartDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            {/* Durée — uniquement pour les locations */}
            {!isSale && i.leaseDuration && (
              <div>
                <span className="text-ink-muted">Durée : </span>
                <span className="font-medium">
                  {i.leaseDuration}{" "}
                  {i.leaseDurationUnit
                    ? LEASE_DURATION_UNIT_LABELS[i.leaseDurationUnit]
                    : "mois"}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Mini-stepper transaction */}
        {i.status !== "CANCELLED" && i.status !== "REJECTED" && (
          <div className="mb-4 p-3 rounded-xl border border-border bg-cream-50/40 dark:bg-surface/40">
            <Stepper
              steps={steps}
              activeId={activeId}
              onChange={() => {}}
            />
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-ink-muted">
            Reçue {timeAgo(i.createdAt)}
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onViewDetails(i)}
            >
              🔍 Détails
            </Button>
            <Link href="/dashboard/messages">
              <Button size="sm" variant="ghost">
                💬 Discuter
              </Button>
            </Link>
            {isPending ? (
              <>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={isLoading}
                  onClick={() => onRespond(i.id, "REJECTED")}
                >
                  ✕ Refuser
                </Button>
                <Button
                  size="sm"
                  variant="gradient"
                  disabled={isLoading}
                  onClick={() => onRespond(i.id, "ACCEPTED")}
                >
                  {isLoading ? "…" : "✓ Accepter"}
                </Button>
              </>
            ) : i.status === "ACCEPTED" && !isSale && i.leaseId ? (
              <Link href={`/dashboard/${i.propertyId}/lease`}>
                <Button size="sm" variant="gradient">
                  📋 Contrat
                </Button>
              </Link>
            ) : i.status === "ACCEPTED" && isSale ? (
              <Link href={`/dashboard/messages`}>
                <Button size="sm" variant="gradient">
                  💬 Discuter
                </Button>
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
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `il y a ${hr} h`;
  const days = Math.floor(hr / 24);
  if (days < 7) return `il y a ${days} j`;
  return new Date(dateStr).toLocaleDateString("fr-FR");
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function ReceivedInquiriesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = React.useState<Inquiry[]>([]);
  const [working, setWorking] = React.useState(true);
  const [processing, setProcessing] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<InquiryStatus | "ALL">(
    "ALL",
  );
  const [detailInquiry, setDetailInquiry] = React.useState<Inquiry | null>(
    null,
  );

  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    api.inquiriesReceived().then((r) => {
      setItems(r);
      setWorking(false);
    });
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

  if (loading || working) {
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
        className="rounded-2xl border border-border/60 px-8 py-8 mb-8"
      >
        <h1 className="display-serif text-4xl mb-2">
          Demandes <span className="gradient-text">de contact</span>
        </h1>
        <p className="text-ink-muted">
          Acceptez ou refusez les candidatures. Un contrat de bail est généré
          automatiquement en cas d'acceptation pour les locations.
        </p>

        {/* Stats */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <StatTile
              kicker="Total"
              value={stats.total}
              icon="📨"
            />
            <StatTile
              kicker="À traiter"
              value={stats.pending}
              icon="⏳"
              accent={stats.pending > 0}
            />
            <StatTile
              kicker="Acceptées"
              value={stats.accepted}
              icon="✓"
              accent={false}
            />
            <StatTile
              kicker="Refusées"
              value={stats.rejected}
              icon="✕"
              accent={false}
            />
          </div>
        )}
      </AnimatedBackground>

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
              <span
                className={`ml-1 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                  isActive
                    ? "bg-brand-100 text-brand-700"
                    : "bg-cream-100 text-ink-muted"
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
          title="Aucune demande pour le moment"
          description="Les demandes reçues sur vos biens s'afficheront ici."
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
  icon: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`glass rounded-xl px-4 py-3 ${
        accent && value > 0 ? "ring-2 ring-accent-300" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
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
