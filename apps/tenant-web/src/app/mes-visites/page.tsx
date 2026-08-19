"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Button, EmptyState, IlloVisit } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import type { Visit, VisitStatus } from "@hwe/types";
import { VISIT_STATUS_LABELS } from "@hwe/types";

const TONE: Record<VisitStatus, "accent" | "success" | "danger" | "neutral"> = {
  REQUESTED: "accent",
  CONFIRMED: "success",
  DECLINED: "neutral",
  CANCELLED: "neutral",
};

function fmtSlot(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} à ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
}

export default function MesVisitesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [visits, setVisits] = React.useState<Visit[] | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    api.myVisits().then(setVisits).catch(() => setVisits([]));
  }, [user, loading, router]);

  if (loading || visits === null) return <p className="text-ink-muted">Chargement…</p>;

  const cancel = async (id: string) => {
    if (!confirm("Annuler cette demande de visite ?")) return;
    const updated = await api.cancelVisit(id);
    setVisits((arr) => (arr ?? []).map((v) => (v.id === updated.id ? { ...v, ...updated } : v)));
  };

  return (
    <section>
      <h1 className="font-display text-3xl mb-2">Mes visites</h1>
      <p className="text-ink-muted mb-8">
        Vos créneaux demandés — la demande se fait depuis la page d'une annonce.
      </p>

      {visits.length === 0 ? (
        <div className="text-center">
        <IlloVisit className="mx-auto w-48 mb-2" />
        <EmptyState
          title="Aucune visite demandée"
          description="Ouvrez une annonce et proposez un créneau."
          action={
            <Link href="/" className="text-sm">
              Parcourir les annonces
            </Link>
          }
        />
        </div>
      ) : (
        <div className="space-y-4">
          {visits.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl border border-ink-subtle bg-surface p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-semibold">{fmtSlot(v.proposedAt)}</span>
                    <Badge tone={TONE[v.status]}>{VISIT_STATUS_LABELS[v.status]}</Badge>
                  </div>
                  <Link
                    href={`/properties/${v.propertyId}`}
                    className="text-sm text-brand-600 dark:text-brand-300 hover:underline"
                  >
                    {v.property?.title} — {v.property?.city}
                  </Link>
                  {v.ownerNote && (
                    <p className="text-sm text-ink-muted mt-1">
                      Propriétaire : {v.ownerNote}
                    </p>
                  )}
                </div>
                {v.status === "REQUESTED" && (
                  <Button size="sm" variant="secondary" onClick={() => cancel(v.id)}>
                    Annuler
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
