"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Button, EmptyState, ErrorState, Icon, intlLocale, toast, useAsync, useLoginRedirect } from "@hwe/ui";
import { useLandlordChat } from "../../lib/landlord-chat";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import type { Visit, VisitStatus } from "@hwe/types";

const TONE: Record<VisitStatus, "accent" | "success" | "danger" | "neutral"> = {
  REQUESTED: "accent",
  CONFIRMED: "success",
  DECLINED: "neutral",
  CANCELLED: "neutral",
};

// Créneau dans la langue courante (« à » / « at » via com.visits.at).
function fmtSlot(iso: string) {
  const d = new Date(iso);
  const loc = intlLocale();
  return `${d.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })} ${t("com.visits.at")} ${d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}`;
}

export default function MesVisitesPage() {
  const auth = useAuth();
  const { user, loading } = auth;
  const router = useRouter();
  useLoginRedirect(auth, router);
  const chat = useLandlordChat();
  const { data: visits, setData: setVisits, error, reload } = useAsync<Visit[]>(
    () => api.myVisits(),
    [user?.id],
    { enabled: !!user },
  );

  if (error && !visits) {
    return (
      <section>
        <h1 className="font-display text-3xl mb-6">{t("com.visits.title")}</h1>
        <ErrorState error={error} onRetry={reload} />
      </section>
    );
  }
  if (loading || !visits) return <p className="text-ink-muted">{t("com.loading")}</p>;

  const cancel = async (id: string) => {
    if (!confirm(t("com.visits.confirmCancel"))) return;
    try {
      const updated = await api.cancelVisit(id);
      setVisits((arr) => (arr ?? []).map((v) => (v.id === updated.id ? { ...v, ...updated } : v)));
      toast.success(t("fix.visits.cancelled"));
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">{t("com.visits.title")}</h1>
      <p className="text-ink-muted mb-8">
        {t("com.visits.sub")}
      </p>

      {visits.length === 0 ? (
        <EmptyState
          illustration="calendar"
          title={t("com.visits.emptyTitle")}
          description={t("com.visits.emptyDesc")}
          action={
            <Link href="/" className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
              {t("com.visits.browse")}
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {visits.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl border border-ink-subtle bg-surface p-4 sm:p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-semibold">{fmtSlot(v.proposedAt)}</span>
                    <Badge tone={TONE[v.status]}>{t("com.visitStatus." + v.status)}</Badge>
                  </div>
                  <Link
                    href={`/properties/${v.propertyId}`}
                    className="text-sm text-brand-600 dark:text-brand-300 hover:underline [overflow-wrap:anywhere]"
                  >
                    {v.property?.title} — {v.property?.city}
                  </Link>
                  {v.ownerNote && (
                    <p className="text-sm text-ink-muted mt-1 [overflow-wrap:anywhere]">
                      {t("com.visits.ownerNote", { note: v.ownerNote })}
                    </p>
                  )}
                </div>
                {v.status === "REQUESTED" && (
                  <Button size="sm" variant="secondary" onClick={() => cancel(v.id)}>
                    {t("com.cancel")}
                  </Button>
                )}
                {/* Visite confirmée : étape suivante (candidater) ou question au propriétaire. */}
                {v.status === "CONFIRMED" && (
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/properties/${v.propertyId}?etape=candidature`}
                      className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-brand-600 text-white hover:text-white hover:bg-brand-700 text-sm font-medium"
                    >
                      <Icon name="send" size={15} />
                      {t("com.visits.apply")}
                    </Link>
                    <Button size="sm" variant="secondary" disabled={chat.busy} onClick={() => chat.open(v.propertyId)}>
                      <Icon name="message" size={15} className="me-1.5" />
                      {t("com.visits.writeOwner")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
