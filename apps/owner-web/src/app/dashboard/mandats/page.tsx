"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import type { AgencySearchItem, Mandate, MandateRequest, Property } from "@hwe/types";
import {
  AgencyLogo,
  Button,
  EmptyState,
  ErrorState,
  Icon,
  Input,
  Label,
  Select,
  Textarea,
  fmtDate,
  toast,
  useAsync,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { defaultTerms, feeTermsLines, termsBody, type TermsForm } from "../../../lib/pro";
import { ConfirmDialog, KV, MandateTermsFields, MandateTypeBadge, ProHero, SectionCard } from "../../../components/pro/ProUi";
import { MandateRow } from "../../../components/pro/MandateRow";

export default function OwnerMandatesPage() {
  return (
    <React.Suspense fallback={null}>
      <Inner />
    </React.Suspense>
  );
}

function Inner() {
  const params = useSearchParams();
  const { user } = useAuth();
  const mandates = useAsync(() => api.listMandates(), [user?.id]);
  const requests = useAsync(() => api.mandateRequests(), [user?.id]);
  const props = useAsync(() => api.listMine(), [user?.id]);
  const [entrustOpen, setEntrustOpen] = React.useState(!!params.get("confier"));

  const reloadAll = () => {
    mandates.reload();
    requests.reload();
    props.reload();
  };

  if (mandates.error && !mandates.data) return <ErrorState error={mandates.error} title={t("pro.own.loadError")} onRetry={reloadAll} />;

  const all = mandates.data ?? [];
  const pending = all.filter((m) => m.status === "PENDING_OWNER");
  const active = all.filter((m) => m.status === "ACTIVE");
  const past = all.filter((m) => m.status === "ENDED" || m.status === "REJECTED");
  const reqs = (requests.data ?? []).filter((r) => r.status === "PENDING");
  const openIds = new Set(all.filter((m) => m.status === "ACTIVE" || m.status === "PENDING_OWNER").map((m) => m.property.id));
  const free = (props.data ?? []).filter((p) => !openIds.has(p.id) && p.status !== "SOLD" && p.status !== "ARCHIVED");

  return (
    <section className="space-y-6">
      <ProHero
        title={t("pro.own.title1")}
        accent={t("pro.own.title2")}
        sub={t("pro.own.sub")}
        actions={
          <Button variant="gradient" onClick={() => setEntrustOpen((o) => !o)}>
            <Icon name="handshake" size={16} className="me-1.5" /> {t("pro.own.entrust")}
          </Button>
        }
      />

      {entrustOpen && (
        <EntrustForm
          properties={free}
          initialPropertyId={params.get("confier") ?? ""}
          onDone={() => {
            setEntrustOpen(false);
            reloadAll();
          }}
          onCancel={() => setEntrustOpen(false)}
        />
      )}

      {(pending.length > 0 || reqs.length > 0) && (
        <SectionCard title={t("pro.own.toReview")} icon="bell">
          <div className="space-y-4">
            {pending.map((m) => (
              <PendingMandate key={m.id} m={m} onDone={reloadAll} />
            ))}
            {reqs.map((r) => (
              <PendingRequest key={r.id} r={r} properties={free} onDone={reloadAll} />
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard title={t("pro.own.managed")} icon="building">
        {mandates.loading && !mandates.data ? (
          <div className="h-24 rounded-xl skeleton" />
        ) : active.length === 0 ? (
          <EmptyState illustration="home" title={t("pro.own.noneTitle")} description={t("pro.own.noneSub")} />
        ) : (
          <ul className="space-y-3">
            {active.map((m) => (
              <MandateRow key={m.id} m={m} href={`/dashboard/mandats/${m.id}`} who="agency" />
            ))}
          </ul>
        )}
      </SectionCard>

      {past.length > 0 && (
        <SectionCard title={t("pro.own.past")} icon="clock">
          <ul className="space-y-3">
            {past.map((m) => (
              <MandateRow key={m.id} m={m} href={`/dashboard/mandats/${m.id}`} who="agency" />
            ))}
          </ul>
        </SectionCard>
      )}
    </section>
  );
}

function TermsSummary({ m }: { m: Pick<Mandate, "type" | "managementFeeRate" | "lettingFeeAmount" | "lettingFeeMonths" | "saleFeeRate" | "currency" | "rentPayee" | "startDate" | "endDate" | "message"> }) {
  return (
    <div className="mt-2">
      <KV label={t("pro.m.fees")}>
        {feeTermsLines(m).map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </KV>
      {m.type !== "SALE" && <KV label={t("pro.terms.payee")}>{t(`pro.terms.payee.${m.rentPayee}`)}</KV>}
      <KV label={t("pro.terms.start")}>{fmtDate(m.startDate)}</KV>
      <KV label={t("pro.m.endLabel")}>{m.endDate ? fmtDate(m.endDate) : t("pro.m.noEnd")}</KV>
      {m.message && <KV label={t("pro.m.message")}>{m.message}</KV>}
    </div>
  );
}

function PendingMandate({ m, onDone }: { m: Mandate; onDone: () => void }) {
  const [busy, setBusy] = React.useState(false);
  const [rejecting, setRejecting] = React.useState(false);
  const act = async (accept: boolean, reason?: string) => {
    setBusy(true);
    try {
      if (accept) await api.acceptMandate(m.id);
      else await api.rejectMandate(m.id, reason);
      toast.success(accept ? t("pro.m.accepted") : t("pro.m.rejected"));
      onDone();
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
      setRejecting(false);
    }
  };
  return (
    <div className="rounded-2xl border border-accent-300/70 dark:border-accent-700/50 bg-accent-50/40 dark:bg-accent-700/10 p-4" data-pending-mandate={m.reference}>
      <div className="flex items-start gap-3 flex-wrap">
        <AgencyLogo name={m.agency.name} logoUrl={m.agency.logoUrl} />
        <div className="min-w-0 flex-1">
          <p className="font-medium [overflow-wrap:anywhere]">{t("pro.own.proposes", { agency: m.agency.name, title: m.property.title })}</p>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <MandateTypeBadge type={m.type} />
            <span className="font-mono text-xs text-ink-muted">{m.reference}</span>
          </div>
        </div>
      </div>
      <TermsSummary m={m} />
      <div className="mt-3 flex flex-wrap gap-2 justify-end">
        <Button variant="secondary" disabled={busy} onClick={() => setRejecting(true)}>
          {t("pro.m.reject")}
        </Button>
        <Button variant="gradient" disabled={busy} onClick={() => act(true)}>
          <Icon name="check" size={16} className="me-1.5" /> {t("pro.m.accept")}
        </Button>
      </div>
      {rejecting && (
        <ConfirmDialog title={t("pro.m.rejectTitle")} confirmLabel={t("pro.m.reject")} tone="danger" busy={busy} onClose={() => setRejecting(false)} onConfirm={(r) => act(false, r)}>
          <p className="text-ink-muted">{t("pro.m.rejectText", { agency: m.agency.name })}</p>
        </ConfirmDialog>
      )}
    </div>
  );
}

function PendingRequest({ r, properties, onDone }: { r: MandateRequest; properties: Property[]; onDone: () => void }) {
  const wanted = properties.filter((p) => (r.type === "SALE" ? p.listingType === "SALE" : p.listingType === "RENT"));
  const [sel, setSel] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);
  const accept = async () => {
    setBusy(true);
    try {
      await api.acceptMandateRequest(r.id, sel);
      toast.success(t("pro.m.accepted"));
      onDone();
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };
  const reject = async () => {
    setBusy(true);
    try {
      await api.rejectMandateRequest(r.id);
      toast.success(t("pro.m.rejected"));
      onDone();
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="rounded-2xl border border-accent-300/70 dark:border-accent-700/50 bg-accent-50/40 dark:bg-accent-700/10 p-4" data-mandate-request={r.agency.name}>
      <div className="flex items-start gap-3">
        <AgencyLogo name={r.agency.name} logoUrl={r.agency.logoUrl} />
        <div className="min-w-0">
          <p className="font-medium [overflow-wrap:anywhere]">{t("pro.own.requestTitle", { agency: r.agency.name })}</p>
          <p className="text-xs text-ink-muted">
            {r.createdByUser ? t("pro.byName", { name: `${r.createdByUser.firstName} ${r.createdByUser.lastName}` }) : ""} · {fmtDate(r.createdAt)}
          </p>
          <div className="mt-1">
            <MandateTypeBadge type={r.type} />
          </div>
        </div>
      </div>
      <TermsSummary m={{ ...r, currency: "EUR" }} />
      <fieldset className="mt-3">
        <legend className="text-sm font-medium mb-2">{t("pro.own.chooseProps")}</legend>
        {wanted.length === 0 ? (
          <p className="text-sm text-ink-muted">{t("pro.own.noFreeProps")}</p>
        ) : (
          <div className="space-y-1.5">
            {wanted.map((p) => (
              <label key={p.id} className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm cursor-pointer min-w-0 max-w-full">
                <input
                  type="checkbox"
                  checked={sel.includes(p.id)}
                  onChange={(e) => setSel((s) => (e.target.checked ? [...s, p.id] : s.filter((x) => x !== p.id)))}
                />
                <span className="truncate min-w-0">{p.title}</span>
                <span className="text-ink-muted text-xs ms-auto shrink-0">{p.city}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>
      <div className="mt-3 flex flex-wrap gap-2 justify-end">
        <Button variant="secondary" disabled={busy} onClick={reject}>
          {t("pro.m.reject")}
        </Button>
        <Button variant="gradient" disabled={busy || sel.length === 0} onClick={accept}>
          <Icon name="check" size={16} className="me-1.5" /> {t("pro.own.entrustN", { n: sel.length })}
        </Button>
      </div>
    </div>
  );
}

function EntrustForm({
  properties,
  initialPropertyId,
  onDone,
  onCancel,
}: {
  properties: Property[];
  initialPropertyId: string;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [q, setQ] = React.useState("");
  const [results, setResults] = React.useState<AgencySearchItem[] | null>(null);
  const [agency, setAgency] = React.useState<AgencySearchItem | null>(null);
  const [propertyId, setPropertyId] = React.useState(initialPropertyId && properties.some((p) => p.id === initialPropertyId) ? initialPropertyId : "");
  const prop = properties.find((p) => p.id === propertyId);
  const [terms, setTerms] = React.useState<TermsForm>(defaultTerms(prop?.listingType === "SALE" ? "SALE" : "MANAGEMENT"));
  const [message, setMessage] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (prop) setTerms((tt) => (prop.listingType === "SALE" ? defaultTerms("SALE") : tt.type === "SALE" ? defaultTerms("MANAGEMENT") : tt));
  }, [prop?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setResults(null);
      return;
    }
    const h = setTimeout(() => {
      api.searchAgencies(term).then(setResults).catch(() => setResults([]));
    }, 300);
    return () => clearTimeout(h);
  }, [q]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agency || !propertyId) return;
    setBusy(true);
    try {
      await api.mandateByOwner({ ...termsBody(terms), propertyId, agencySlug: agency.slug, message: message.trim() || undefined });
      toast.success(t("pro.own.entrusted", { agency: agency.name }));
      onDone();
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SectionCard title={t("pro.own.entrustTitle")} icon="handshake" id="confier">
      <form onSubmit={submit} className="space-y-6">
        <div>
          <Label htmlFor="ag-search">{t("pro.own.searchAgency")}</Label>
          {agency ? (
            <div className="flex items-center gap-3 rounded-xl border border-brand-300 bg-brand-50/60 dark:bg-brand-900/20 p-3" data-chosen-agency={agency.name}>
              <AgencyLogo name={agency.name} logoUrl={agency.logoUrl} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{agency.name}</p>
                <p className="text-xs text-ink-muted">
                  {agency.code}
                  {agency.city ? ` · ${agency.city}` : ""}
                </p>
              </div>
              <Button type="button" size="sm" variant="ghost" onClick={() => setAgency(null)}>
                {t("pro.own.change")}
              </Button>
            </div>
          ) : (
            <>
              <Input id="ag-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("pro.own.searchPh")} autoComplete="off" />
              {results && (
                <ul className="mt-2 rounded-xl border border-border divide-y divide-border/70 overflow-hidden" role="listbox">
                  {results.length === 0 ? (
                    <li className="px-3 py-2 text-sm text-ink-muted">{t("pro.own.noAgency")}</li>
                  ) : (
                    results.map((a) => (
                      <li key={a.id}>
                        <button type="button" role="option" aria-selected={false} onClick={() => setAgency(a)} className="w-full flex items-center gap-3 px-3 py-2 text-start hover:bg-brand-50 dark:hover:bg-brand-900/30">
                          <AgencyLogo name={a.name} logoUrl={a.logoUrl} size="sm" />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium truncate">{a.name}</span>
                            <span className="block text-xs text-ink-muted">
                              {a.code}
                              {a.city ? ` · ${a.city}` : ""}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </>
          )}
        </div>
        <div className="max-w-md">
          <Label htmlFor="ag-prop">{t("pro.own.whichProperty")}</Label>
          <Select id="ag-prop" required value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
            <option value="">{t("pro.own.chooseProperty")}</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} — {p.city}
              </option>
            ))}
          </Select>
          {properties.length === 0 && <p className="text-xs text-ink-muted mt-1">{t("pro.own.noFreeProps")}</p>}
        </div>
        {prop && (
          <MandateTermsFields
            value={terms}
            onChange={setTerms}
            currency={prop.currency}
            allowedTypes={prop.listingType === "SALE" ? ["SALE"] : ["MANAGEMENT", "LETTING"]}
          />
        )}
        <div>
          <Label htmlFor="ag-msg">{t("pro.new.message")}</Label>
          <Textarea id="ag-msg" rows={2} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <p className="text-xs text-ink-muted">{t("pro.own.entrustNote")}</p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t("pro.cancel")}
          </Button>
          <Button type="submit" variant="gradient" disabled={busy || !agency || !propertyId}>
            {busy ? t("pro.processing") : t("pro.own.entrustSubmit")}
          </Button>
        </div>
      </form>
    </SectionCard>
  );
}

