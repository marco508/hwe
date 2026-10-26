"use client";

import * as React from "react";
import Link from "next/link";
import { useShellParams } from "../../../lib/route-params";
import type { Inquiry, LeaseContract, Mandate, Property } from "@hwe/types";
import {
  Badge,
  Button,
  EmptyState,
  ErrorState,
  Icon,
  IconBadge,
  InviteLinkBox,
  Input,
  Label,
  ManagedByBadge,
  SafeImage,
  fmtDate,
  fmtMoney,
  isNotFound,
  toast,
  tUi,
  useAsync,
  type IconName,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { feeTermsLines, invalidatePortfolio, isPro, usePortfolioItem } from "../../../lib/pro";
import { propertyRights } from "../../../components/SectionNav";
import { invalidateProperty, loadProperty } from "../../../lib/nav";
import { KV, LINK_SECONDARY, LockedNote, MandateStatusBadge, MandateTypeBadge, SectionCard, WarningNote } from "../../../components/pro/ProUi";
import { Modal } from "../../../components/Modal";

/** Fiche de gestion d'un bien — commune au propriétaire et au pro mandataire. */
export default function PropertyHubPage() {
  const params = useShellParams<{ id: string }>("/dashboard/:id");
  const id = params?.id;
  const { user } = useAuth();
  const pro = isPro(user);
  // Cache partagé avec le fil d'Ariane / les onglets (une seule requête).
  const prop = useAsync(() => loadProperty(id!), [id, user?.id], { enabled: !!id && !!user });
  const { item, loading: pfLoading } = usePortfolioItem(id);
  const mandates = useAsync(() => api.listMandates({ propertyId: id }), [id, user?.id], { enabled: !!id && !!user });
  // Activité du bien (résumé + prochaines étapes) : listes globales filtrées
  // sur ce bien, erreurs silencieuses (droits pro, bien en vente…).
  const listingType = prop.data?.listingType;
  const activity = useAsync(
    async () => {
      const rent = listingType === "RENT";
      const [inq, vis, rents, tick, docs, leases, stay] = await Promise.allSettled([
        api.inquiriesReceived(),
        api.ownerVisits(),
        rent ? api.ownerRents() : Promise.resolve<Awaited<ReturnType<typeof api.ownerRents>>>([]),
        rent ? api.ownerTickets() : Promise.resolve<Awaited<ReturnType<typeof api.ownerTickets>>>([]),
        api.listDocuments(id!),
        rent ? api.listLeases(id!) : Promise.resolve<LeaseContract[]>([]),
        rent ? api.staySettings(id!) : Promise.reject(new Error("sale")),
      ]);
      const ok = <T,>(r: PromiseSettledResult<T>): T | null => (r.status === "fulfilled" ? r.value : null);
      const inquiries = ok(inq)?.filter((i) => i.propertyId === id) ?? null;
      return {
        inquiries,
        pendingInquiries: inquiries ? inquiries.filter((i) => i.status === "PENDING").length : null,
        requestedVisits: ok(vis)?.filter((v) => (v.property?.id ?? v.propertyId) === id && v.status === "REQUESTED").length ?? null,
        declaredRents: ok(rents)?.filter((r) => r.lease.property.id === id && r.status === "DECLARED").length ?? null,
        openTickets: ok(tick)?.filter((x) => x.lease?.property?.id === id && x.status !== "RESOLVED").length ?? null,
        documents: ok(docs)?.length ?? null,
        leases: ok(leases),
        staysEnabled: ok(stay)?.settings.enabled ?? null,
        rentalKind: ok(stay)?.property.rentalKind ?? null,
      };
    },
    [id, user?.id, listingType],
    { enabled: !!id && !!user && !!listingType },
  );
  const [soldOpen, setSoldOpen] = React.useState(false);
  const [inviteUrl, setInviteUrl] = React.useState<string | null>(null);

  const p = prop.data;
  if (prop.error && !p) {
    return isNotFound(prop.error) ? (
      <EmptyState title={t("pf.notFound")} />
    ) : (
      <ErrorState error={prop.error} title={t("pf.loadError")} onRetry={prop.reload} />
    );
  }
  if (!p) return <div className="h-64 rounded-2xl skeleton" aria-busy="true" />;

  const isOwner = p.ownerId === user?.id;
  if (!isOwner && !pro && user?.role !== "ADMIN") return <EmptyState title={t("pf.notFound")} />;
  // Pro : un bien hors de son portefeuille (agent non assigné, mandat terminé…).
  if (pro && !pfLoading && !item) {
    return (
      <EmptyState
        illustration="search"
        title={t("pro.hub.noAccess")}
        description={tUi("ui.pro.err.NOT_ASSIGNED")}
        action={
          <Link href="/pro/biens" className={LINK_SECONDARY}>
            {t("pro.hub.backPortfolio")}
          </Link>
        }
      />
    );
  }

  const all: Mandate[] = mandates.data ?? [];
  const current = all.find((m) => m.status === "ACTIVE") ?? all.find((m) => m.status === "PENDING_OWNER") ?? null;
  const can = item?.access?.can;
  const mandateHref = (m: Mandate) => (pro ? `/pro/mandats/${m.id}` : `/dashboard/mandats/${m.id}`);

  const rights = propertyRights(p, pro, item, current?.type);
  const enc = encodeURIComponent(p.id);
  const a = activity.data;
  // Tuiles : mêmes destinations que les onglets ; listes filtrées sur ce bien.
  const links: { href: string; icon: IconName; label: string; hint: string; count?: number | null; show: boolean }[] = [
    { href: `/dashboard/${enc}/edit`, icon: "pen", label: t("pro.hub.edit"), hint: t("pro.hub.editHint"), show: rights.edit },
    { href: `/dashboard/${enc}/documents`, icon: "folder", label: t("pro.hub.docs"), hint: t("pro.hub.docsHint"), show: rights.docs },
    { href: `/dashboard/${enc}/lease`, icon: "clipboard", label: t("pro.hub.leases"), hint: t("pro.hub.leasesHint"), show: rights.lease },
    { href: `/dashboard/inquiries?bien=${enc}`, icon: "inbox", label: t("nav.requests"), hint: t("pro.hub.requestsHint"), count: a?.pendingInquiries, show: rights.requests },
    { href: `/dashboard/visites?bien=${enc}`, icon: "calendar", label: t("nav.visits"), hint: t("pro.hub.visitsHint"), count: a?.requestedVisits, show: rights.visits },
    { href: `/dashboard/loyers?bien=${enc}`, icon: "wallet", label: t("nav.rents"), hint: t("pro.hub.rentsHint"), count: a?.declaredRents, show: rights.rents },
    { href: `/dashboard/${enc}/sejour`, icon: "bed", label: t("stays.hubLink"), hint: t("stays.hubHint"), show: rights.stays },
    { href: `/dashboard/tickets?bien=${enc}`, icon: "wrench", label: t("nav.incidents"), hint: t("pro.hub.ticketsHint"), count: a?.openTickets, show: rights.tickets },
    { href: `/dashboard/messages`, icon: "messages", label: t("nav.messages"), hint: t("pro.hub.messagesHint"), show: rights.messages },
  ];

  const canMarkSold = p.listingType === "SALE" && p.status !== "SOLD" && (!pro || !!can?.EDIT_LISTING);
  const steps = nextSteps({
    p,
    a,
    rights,
    canMarkSold,
    offerMandate: isOwner && !pro && !current && !mandates.loading,
    onMarkSold: () => setSoldOpen(true),
  });

  const resend = async () => {
    if (!current) return;
    try {
      const r = await api.resendOwnerInvite(current.id);
      setInviteUrl(r.ownerInviteUrl);
      toast.success(t("pro.owner.linkReady"));
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="grid sm:grid-cols-[minmax(0,260px)_1fr]">
          <div className="aspect-[4/3] sm:aspect-auto sm:h-full bg-cream-100 dark:bg-white/5">
            <SafeImage src={p.media?.[0]?.url} alt={p.title} className="h-full w-full object-cover" fallbackClassName="h-full w-full" />
          </div>
          <div className="p-5 sm:p-6 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge tone={p.listingType === "SALE" ? "accent" : "brand"}>{p.listingType === "SALE" ? t("pro.hub.sale") : t("pro.hub.rent")}</Badge>
              <Badge tone={p.status === "PUBLISHED" ? "success" : "neutral"}>{tUi(`ui.status.${p.status}`)}</Badge>
              {p.managedBy && <ManagedByBadge name={p.managedBy.name} logoUrl={p.managedBy.logoUrl} />}
            </div>
            <h1 className="font-display text-3xl leading-tight [overflow-wrap:anywhere]">{p.title}</h1>
            <p className="text-ink-muted mt-1 [overflow-wrap:anywhere]">
              {p.addressLine}, {p.postalCode} {p.city}
            </p>
            <p className="mt-3 font-display text-xl">
              {(p.displayPrice ?? p.price) > 0 ? fmtMoney(p.displayPrice ?? p.price, p.currency) : "—"}
              {p.listingType === "RENT" && <span className="text-sm text-ink-muted font-sans"> {t("pro.hub.perMonth")}</span>}
            </p>
            {p.status === "SOLD" && p.soldPrice != null && (
              <p className="mt-2 text-sm" data-sold-price>
                <Icon name="checkCircle" size={16} className="text-success me-1" />
                {t("pro.hub.soldFor", { price: fmtMoney(p.soldPrice, p.currency), date: p.soldAt ? fmtDate(p.soldAt) : "—" })}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/properties/${p.id}`} className={LINK_SECONDARY}>
                <Icon name="eye" size={16} /> {t("pro.hub.preview")}
              </Link>
              {canMarkSold && (
                <Button variant="gradient" onClick={() => setSoldOpen(true)}>
                  <Icon name="party" size={16} className="me-1.5" /> {t("pro.hub.markSold")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {rights.lettingDone && <LockedNote>{tUi("ui.pro.err.LETTING_MANDATE_COMPLETED")}</LockedNote>}

      <NextSteps steps={steps} loading={activity.loading && !activity.data} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {links
          .filter((l) => l.show)
          .map((l) => (
            <Link key={l.href + l.label} href={l.href} className="group rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 hover:shadow-card transition text-ink min-w-0">
              <div className="flex items-center justify-between gap-2">
                <IconBadge name={l.icon} />
                {!!l.count && (
                  <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full bg-accent-500 text-white text-xs font-semibold tabular-nums">
                    {l.count}
                  </span>
                )}
              </div>
              <p className="mt-2 font-medium group-hover:text-brand-700 dark:group-hover:text-brand-300">{l.label}</p>
              <p className="text-xs text-ink-muted">{l.count ? t("prop.toHandle", { count: l.count }) : l.hint}</p>
            </Link>
          ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {pro && item?.owner && (
          <SectionCard title={t("pro.hub.owner")} icon="user">
            <KV label={t("pro.hub.ownerName")}>
              {item.owner.firstName} {item.owner.lastName}
            </KV>
            {item.owner.email && <KV label={t("pro.agency.email")}>{item.owner.email}</KV>}
            {item.owner.phone && <KV label={t("pro.agency.phone")}>{item.owner.phone}</KV>}
            <KV label={t("pro.hub.account")}>
              {item.owner.activated ? (
                <Badge tone="success">{t("pro.owner.activated")}</Badge>
              ) : (
                <Badge tone="accent">{t("pro.owner.notActivated")}</Badge>
              )}
            </KV>
            {!item.owner.activated && (
              <div className="mt-4 space-y-3">
                <WarningNote title={t("pro.hub.onBehalfTitle")}>{t("pro.hub.onBehalfText")}</WarningNote>
                {inviteUrl ? (
                  <InviteLinkBox url={inviteUrl} title={t("pro.owner.activationLink")} message={t("pro.owner.waMessage", { agency: user?.agency?.name ?? "" })} />
                ) : (
                  current?.status === "ACTIVE" && (
                    <Button variant="secondary" onClick={resend}>
                      <Icon name="send" size={16} className="me-1.5" /> {t("pro.owner.resend")}
                    </Button>
                  )
                )}
              </div>
            )}
          </SectionCard>
        )}

        <SectionCard
          title={t("pro.hub.mandate")}
          icon="handshake"
          actions={current ? <Link href={mandateHref(current)} className="text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline">{t("pro.hub.mandateOpen")}</Link> : null}
        >
          {mandates.loading && !mandates.data ? (
            <div className="h-24 rounded-xl skeleton" />
          ) : current ? (
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <MandateTypeBadge type={current.type} />
                <MandateStatusBadge status={current.status} />
                <span className="font-mono text-xs text-ink-muted">{current.reference}</span>
              </div>
              <KV label={t("pro.m.agency")}>{current.agency.name}</KV>
              {current.assignedAgent && (
                <KV label={t("pro.m.agent")}>
                  {current.assignedAgent.firstName} {current.assignedAgent.lastName}
                </KV>
              )}
              <KV label={t("pro.m.fees")}>{feeTermsLines(current).join(" · ")}</KV>
              <KV label={t("pro.m.since")}>{fmtDate(current.startDate)}</KV>
            </div>
          ) : isOwner ? (
            <div className="text-sm space-y-3">
              <p className="text-ink-muted">{t("pro.hub.noMandateOwner")}</p>
              <Link href={`/dashboard/mandats?confier=${p.id}`} className={LINK_SECONDARY}>
                <Icon name="handshake" size={16} /> {t("pro.own.entrust")}
              </Link>
            </div>
          ) : (
            <p className="text-sm text-ink-muted">{t("pro.hub.noMandate")}</p>
          )}
        </SectionCard>
      </div>

      {soldOpen && (
        <SoldModal
          currency={p.currency}
          onClose={() => setSoldOpen(false)}
          onDone={(updated) => {
            prop.setData((cur) => (cur ? { ...cur, ...updated } : cur));
            invalidateProperty(p.id);
            invalidatePortfolio();
            mandates.reload();
            setSoldOpen(false);
          }}
          propertyId={p.id}
          hasSaleMandate={current?.type === "SALE" && current.status === "ACTIVE"}
          saleFeeRate={current?.saleFeeRate ?? null}
        />
      )}
    </section>
  );
}

function SoldModal({
  propertyId,
  currency,
  onClose,
  onDone,
  hasSaleMandate,
  saleFeeRate,
}: {
  propertyId: string;
  currency: string;
  onClose: () => void;
  onDone: (p: Awaited<ReturnType<typeof api.markSold>>) => void;
  hasSaleMandate: boolean;
  saleFeeRate: number | null;
}) {
  const [price, setPrice] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const n = Number(price.replace(",", "."));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(n > 0)) return;
    setBusy(true);
    try {
      const updated = await api.markSold(propertyId, n);
      toast.success(t("pro.hub.soldDone"));
      onDone(updated);
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal title={t("pro.hub.markSold")} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4 text-sm">
        <p className="text-ink-muted">{t("pro.hub.soldIntro")}</p>
        <div>
          <Label htmlFor="sold-price">{t("pro.hub.soldPrice", { cur: currency })}</Label>
          <Input id="sold-price" type="number" min="1" step="1" required value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        {hasSaleMandate && saleFeeRate != null && n > 0 && (
          <p className="rounded-lg bg-brand-50 dark:bg-brand-900/30 px-3 py-2" data-fee-preview>
            {t("pro.hub.soldFeePreview", { rate: String(saleFeeRate), amount: fmtMoney(Math.round(n * saleFeeRate) / 100, currency) })}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            {t("pro.cancel")}
          </Button>
          <Button type="submit" variant="gradient" disabled={busy || !(n > 0)}>
            {busy ? t("pro.processing") : t("pro.hub.soldConfirm")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ── Prochaines étapes ───────────────────────────────────────────────────────

/** Activité du bien (chargée par la page). */
type Activity = {
  inquiries: Inquiry[] | null;
  pendingInquiries: number | null;
  requestedVisits: number | null;
  declaredRents: number | null;
  openTickets: number | null;
  documents: number | null;
  leases: LeaseContract[] | null;
  staysEnabled: boolean | null;
  rentalKind: string | null;
};

type Step = { key: string; icon: IconName; text: string; count?: number; href?: string; onClick?: () => void; cta: string };

/** Étapes utiles pour ce bien, dans l'ordre où on les traite. */
function nextSteps({
  p,
  a,
  rights,
  canMarkSold,
  offerMandate,
  onMarkSold,
}: {
  p: Property;
  a: Activity | null | undefined;
  rights: ReturnType<typeof propertyRights>;
  canMarkSold: boolean;
  offerMandate: boolean;
  onMarkSold: () => void;
}): Step[] {
  const enc = encodeURIComponent(p.id);
  const out: Step[] = [];
  const name = (x: { tenantFirstName?: string; tenantLastName?: string; sender?: { firstName?: string; lastName?: string } | null }) =>
    x.sender ? `${x.sender.firstName ?? ""} ${x.sender.lastName ?? ""}`.trim() : `${x.tenantFirstName ?? ""} ${x.tenantLastName ?? ""}`.trim();

  if (rights.edit && p.status === "DRAFT")
    out.push({ key: "publish", icon: "eye", text: t("prop.step.publish"), href: `/dashboard/${enc}/edit`, cta: t("prop.step.publishCta") });
  if (rights.edit && (p.media?.length ?? 0) === 0)
    out.push({ key: "photos", icon: "camera", text: t("prop.step.photos"), href: `/dashboard/${enc}/edit`, cta: t("prop.step.photosCta") });
  if (!a) return out;

  if (rights.requests && a.pendingInquiries)
    out.push({ key: "inquiries", icon: "inbox", text: t("prop.step.inquiries"), count: a.pendingInquiries, href: `/dashboard/inquiries?bien=${enc}&tab=pending`, cta: t("prop.step.open") });
  if (rights.visits && a.requestedVisits)
    out.push({ key: "visits", icon: "calendar", text: t("prop.step.visits"), count: a.requestedVisits, href: `/dashboard/visites?bien=${enc}`, cta: t("prop.step.open") });
  if (rights.lease && a.inquiries && a.leases) {
    // Candidat accepté sans bail, ou bail préparé encore à signer.
    const accepted = a.inquiries.find((i) => i.status === "ACCEPTED" && !i.leaseId && i.property?.listingType !== "SALE");
    if (accepted)
      out.push({ key: "prepareLease", icon: "clipboard", text: t("prop.step.prepareLease", { name: name(accepted) }), href: `/dashboard/${enc}/lease`, cta: t("prop.step.leaseCta") });
    const draft = a.leases.find((l) => l.status === "DRAFT" && !l.ownerSignedAt);
    if (draft)
      out.push({ key: "signLease", icon: "signature", text: t("prop.step.signLease", { name: name(draft) }), href: `/dashboard/${enc}/lease`, cta: t("prop.step.leaseCta") });
  }
  if (rights.rents && a.declaredRents)
    out.push({ key: "rents", icon: "wallet", text: t("prop.step.rents"), count: a.declaredRents, href: `/dashboard/loyers?bien=${enc}`, cta: t("prop.step.open") });
  if (rights.tickets && a.openTickets)
    out.push({ key: "tickets", icon: "wrench", text: t("prop.step.tickets"), count: a.openTickets, href: `/dashboard/tickets?bien=${enc}`, cta: t("prop.step.open") });
  if (canMarkSold && a.inquiries?.some((i) => i.status === "ACCEPTED"))
    out.push({ key: "sold", icon: "party", text: t("prop.step.sold"), onClick: onMarkSold, cta: t("pro.hub.markSold") });
  if (rights.docs && a.documents === 0)
    out.push({ key: "docs", icon: "folder", text: t("prop.step.docs"), href: `/dashboard/${enc}/documents`, cta: t("prop.step.docsCta") });
  if (rights.stays && a.rentalKind === "SEASONAL" && a.staysEnabled === false)
    out.push({ key: "stays", icon: "bed", text: t("prop.step.stays"), href: `/dashboard/${enc}/sejour`, cta: t("prop.step.staysCta") });
  if (offerMandate)
    out.push({ key: "mandate", icon: "handshake", text: t("prop.step.mandate"), href: `/dashboard/mandats?confier=${enc}`, cta: t("pro.own.entrust") });
  return out;
}

function NextSteps({ steps, loading }: { steps: Step[]; loading: boolean }) {
  return (
    <SectionCard title={t("prop.step.title")} icon="sparkles">
      {steps.length === 0 ? (
        loading ? (
          <div className="h-16 rounded-xl skeleton" aria-busy="true" />
        ) : (
          <p className="text-sm text-ink-muted flex items-center gap-2" data-next-steps="none">
            <Icon name="checkCircle" size={16} className="text-success shrink-0" /> {t("prop.step.none")}
          </p>
        )
      ) : (
        <ul className="divide-y divide-border/70" data-next-steps={steps.length}>
          {steps.map((s) => {
            const cls =
              "inline-flex items-center justify-center gap-1 h-8 px-3 rounded-full text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 hover:text-white dark:bg-brand-500 shrink-0";
            return (
              <li key={s.key} className="py-3 first:pt-0 last:pb-0 flex flex-wrap items-center gap-3" data-step={s.key}>
                <IconBadge name={s.icon} size="sm" />
                <span className="flex-1 min-w-[10rem] text-sm text-ink [overflow-wrap:anywhere]">
                  {s.text}
                  {!!s.count && (
                    <span className="ms-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-accent-500 text-white text-[11px] font-semibold tabular-nums align-middle">
                      {s.count}
                    </span>
                  )}
                </span>
                {s.href ? (
                  <Link href={s.href} className={cls}>
                    {s.cta} <Icon name="arrowRight" size={14} />
                  </Link>
                ) : (
                  <button type="button" onClick={s.onClick} className={cls}>
                    {s.cta}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
