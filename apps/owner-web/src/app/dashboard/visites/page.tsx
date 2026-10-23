"use client";

import * as React from "react";
import { Badge, Button, Input, EmptyState, ErrorState, IlloVisit, toast, intlLocale, useAsync } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import type { Visit, VisitStatus } from "@hwe/types";

const TONE: Record<VisitStatus, "accent" | "success" | "danger" | "neutral"> = {
  REQUESTED: "accent",
  CONFIRMED: "success",
  DECLINED: "neutral",
  CANCELLED: "neutral",
};

// Créneau traduit (U4) : plus de « à » codé en dur.
function fmtSlot(iso: string) {
  const d = new Date(iso);
  const loc = intlLocale();
  return t("ops.visits.slot", {
    date: d.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" }),
    time: d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" }),
  });
}

function VisitCard({ visit, onUpdate }: { visit: Visit; onUpdate: (v: Visit) => void }) {
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const answer = async (status: "CONFIRMED" | "DECLINED") => {
    setBusy(true);
    try {
      onUpdate(await api.answerVisit(visit.id, { status, ownerNote: note || undefined }));
      toast.success(t("ops.visits.answered"));
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6 shadow-sm space-y-3 min-w-0">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-semibold">{fmtSlot(visit.proposedAt)}</span>
            <Badge tone={TONE[visit.status]}>{t("ops.visitStatus." + visit.status)}</Badge>
          </div>
          <p className="text-sm text-ink-muted [overflow-wrap:anywhere]">
            {visit.property?.title} — {visit.property?.addressLine}, {visit.property?.city}
          </p>
          <p className="text-sm mt-1 [overflow-wrap:anywhere]">
            {visit.requester
              ? `${visit.requester.firstName} ${visit.requester.lastName} · ${visit.requester.email}${visit.requester.phone ? ` · ${visit.requester.phone}` : ""}`
              : ""}
          </p>
          {visit.note && <p className="text-sm text-ink-muted mt-1 [overflow-wrap:anywhere]">« {visit.note} »</p>}
          {visit.ownerNote && (
            <p className="text-sm text-ink-muted mt-1 [overflow-wrap:anywhere]">{t("ops.visits.yourReply")} {visit.ownerNote}</p>
          )}
        </div>
      </div>

      {visit.status === "REQUESTED" && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Input
            className="flex-1 min-w-0 sm:min-w-[12rem]"
            aria-label={t("ops.visits.msgPlaceholder")}
            placeholder={t("ops.visits.msgPlaceholder")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button size="sm" disabled={busy} onClick={() => answer("CONFIRMED")}>
            {t("ops.visits.confirm")}
          </Button>
          <Button size="sm" variant="secondary" disabled={busy} onClick={() => answer("DECLINED")}>
            {t("ops.visits.decline")}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function VisitesPage() {
  // Session/rôle : dashboard/layout.tsx. Erreur ≠ liste vide (L2).
  const { user } = useAuth();
  const [filter, setFilter] = React.useState<VisitStatus | "ALL">("REQUESTED");
  const { data: visits, setData: setVisits, error, reload } = useAsync(
    () => api.ownerVisits(),
    [user?.id],
    { enabled: !!user },
  );

  if (error && !visits) return <ErrorState error={error} title={t("ops.visits.loadError")} onRetry={reload} />;
  if (!visits) return <p className="text-ink-muted">{t("ops.loading")}</p>;

  const shown = filter === "ALL" ? visits : visits.filter((v) => v.status === filter);

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">{t("ops.visits.title")}</h1>
      <p className="text-ink-muted mb-6">
        {t("ops.visits.sub")}
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["REQUESTED", "CONFIRMED", "ALL"] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f
                ? "bg-brand-600 text-white border-brand-600"
                : "border-ink-subtle text-ink-muted hover:border-brand-400"
            }`}
          >
            {f === "ALL" ? t("ops.visits.filterAll") : t("ops.visitStatus." + f)}
            {f !== "ALL" && ` (${visits.filter((v) => v.status === f).length})`}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="text-center">
          <IlloVisit className="mx-auto w-48 mb-2" />
          <EmptyState title={t("ops.visits.emptyTitle")} description={t("ops.emptyDesc")} />
        </div>
      ) : (
        <div className="space-y-4">
          {shown.map((v) => (
            <VisitCard
              key={v.id}
              visit={v}
              onUpdate={(u) =>
                setVisits((arr) => (arr ?? []).map((x) => (x.id === u.id ? { ...x, ...u } : x)))
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
