"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  ErrorState,
  Label,
  Select,
  useAsync,
  useLoginRedirect,
} from "@hwe/ui";
import type { LeaseContract, Ticket } from "@hwe/types";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { TicketForm, TicketRow } from "../../components/LeaseTenantExtras";

/**
 * Incidents de tous mes baux : liste + « Signaler un incident » (choix du bail
 * s'il y en a plusieurs). Mêmes appels et même rendu que l'ancienne section
 * Incidents de « Mon bail ».
 */
export default function MesIncidentsPage() {
  const auth = useAuth();
  const { user, loading } = auth;
  const router = useRouter();
  useLoginRedirect(auth, router);
  const leasesQ = useAsync<LeaseContract[]>(() => api.myLeases(), [user?.id], { enabled: !!user });
  const ticketsQ = useAsync<Ticket[]>(() => api.myTickets(), [user?.id], { enabled: !!user });
  const [showForm, setShowForm] = React.useState(false);
  const [leaseId, setLeaseId] = React.useState("");

  const leases = React.useMemo(() => leasesQ.data ?? [], [leasesQ.data]);
  // Un incident se signale sur un bail signé / en cours.
  const reportable = React.useMemo(
    () => leases.filter((l) => l.status === "ACTIVE" || l.status === "SIGNED"),
    [leases],
  );
  React.useEffect(() => {
    if (!leaseId && reportable[0]) setLeaseId(reportable[0].id);
  }, [reportable, leaseId]);

  const error = leasesQ.error ?? ticketsQ.error;
  if (error && !(leasesQ.data && ticketsQ.data)) {
    return (
      <ErrorState
        error={error}
        onRetry={() => {
          leasesQ.reload();
          ticketsQ.reload();
        }}
      />
    );
  }
  if (loading || !user || !leasesQ.data || !ticketsQ.data) return <p className="text-ink-muted">{t("rental.loading")}</p>;

  const tickets = [...ticketsQ.data].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const placeOf = (tk: Ticket) =>
    leases.length > 1
      ? tk.lease?.property?.title ?? leases.find((l) => l.id === tk.leaseId)?.property?.title
      : undefined;
  const open = tickets.filter((x) => x.status !== "RESOLVED");
  const closed = tickets.filter((x) => x.status === "RESOLVED");

  return (
    <section className="min-w-0">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div className="min-w-0">
          <h1 className="font-display text-3xl mb-2">{t("incidents.title")}</h1>
          <p className="text-ink-muted">{t("incidents.sub")}</p>
        </div>
        {reportable.length > 0 && !showForm && (
          <Button onClick={() => setShowForm(true)}>{t("rental.ticket.report")}</Button>
        )}
      </div>

      {leases.length === 0 ? (
        <EmptyState
          illustration="key"
          title={t("rental.empty.title")}
          description={t("incidents.noLease")}
          action={
            <Link href="/" className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
              {t("rental.empty.cta")}
            </Link>
          }
        />
      ) : (
        <div className="space-y-6">
          {showForm && reportable.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h2 className="font-display text-lg">{t("rental.ticket.report")}</h2>
                  <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
                    {t("rental.ticket.close")}
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                {reportable.length > 1 && (
                  <div className="max-w-lg space-y-1">
                    <Label htmlFor="incident-lease">{t("incidents.lease")}</Label>
                    <Select id="incident-lease" value={leaseId} onChange={(e) => setLeaseId(e.target.value)}>
                      {reportable.map((l) => (
                        <option key={l.id} value={l.id}>
                          {[l.property?.title, l.property?.city].filter(Boolean).join(" — ") || t("rental.lease.propertyFallback")}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}
                {leaseId && (
                  <TicketForm
                    key={leaseId}
                    leaseId={leaseId}
                    onCreated={(tk) => {
                      ticketsQ.setData((arr) => [tk, ...(arr ?? [])]);
                      setShowForm(false);
                    }}
                  />
                )}
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader>
              <h2 className="font-display text-lg">{t("incidents.openTitle")}</h2>
            </CardHeader>
            <CardBody>
              {open.length === 0 ? (
                <p className="text-sm text-ink-muted">{t("incidents.noneOpen")}</p>
              ) : (
                <ul className="space-y-2">
                  {open.map((tk) => (
                    <TicketRow key={tk.id} ticket={tk} place={placeOf(tk)} />
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>

          {closed.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="font-display text-lg">{t("incidents.resolved")}</h2>
              </CardHeader>
              <CardBody>
                <ul className="space-y-2">
                  {closed.map((tk) => (
                    <TicketRow key={tk.id} ticket={tk} place={placeOf(tk)} />
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
          {reportable.length === 0 && <p className="text-sm text-ink-muted">{t("incidents.noActiveLease")}</p>}
        </div>
      )}
    </section>
  );
}
