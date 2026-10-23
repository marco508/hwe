"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Mandate } from "@hwe/types";
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
import { KV, LINK_SECONDARY, LockedNote, MandateStatusBadge, MandateTypeBadge, SectionCard, WarningNote } from "../../../components/pro/ProUi";
import { Modal } from "../../../components/Modal";

/** Fiche de gestion d'un bien — commune au propriétaire et au pro mandataire. */
export default function PropertyHubPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { user } = useAuth();
  const pro = isPro(user);
  const prop = useAsync(() => api.getProperty(id!), [id, user?.id], { enabled: !!id && !!user });
  const { item, loading: pfLoading } = usePortfolioItem(id);
  const mandates = useAsync(() => api.listMandates({ propertyId: id }), [id, user?.id], { enabled: !!id && !!user });
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
  const lettingDone = pro && current?.type === "LETTING" && can && !can.EDIT_LISTING;
  const isRent = p.listingType === "RENT";
  const mandateHref = (m: Mandate) => (pro ? `/pro/mandats/${m.id}` : `/dashboard/mandats/${m.id}`);

  const links: { href: string; icon: IconName; label: string; hint: string; show: boolean }[] = [
    { href: `/dashboard/${p.id}/edit`, icon: "pen", label: t("pro.hub.edit"), hint: t("pro.hub.editHint"), show: !lettingDone },
    { href: `/dashboard/${p.id}/documents`, icon: "folder", label: t("pro.hub.docs"), hint: t("pro.hub.docsHint"), show: !lettingDone },
    { href: `/dashboard/${p.id}/lease`, icon: "clipboard", label: t("pro.hub.leases"), hint: t("pro.hub.leasesHint"), show: isRent },
    { href: `/dashboard/inquiries`, icon: "inbox", label: t("nav.requests"), hint: t("pro.hub.requestsHint"), show: !lettingDone },
    { href: `/dashboard/visites`, icon: "calendar", label: t("nav.visits"), hint: t("pro.hub.visitsHint"), show: !lettingDone },
    { href: `/dashboard/loyers`, icon: "wallet", label: t("nav.rents"), hint: t("pro.hub.rentsHint"), show: isRent && !lettingDone && (!pro || !!can?.RENTS) },
    { href: `/dashboard/tickets`, icon: "wrench", label: t("nav.incidents"), hint: t("pro.hub.ticketsHint"), show: isRent && !lettingDone },
    { href: `/dashboard/messages`, icon: "messages", label: t("nav.messages"), hint: t("pro.hub.messagesHint"), show: !lettingDone },
  ];

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
      <Link href={pro ? "/pro/biens" : "/dashboard"} className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
        <Icon name="chevronLeft" size={14} /> {pro ? t("pro.hub.backPortfolio") : t("pf.back")}
      </Link>

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
                <Icon name="checkCircle" size={16} className="text-success mr-1" />
                {t("pro.hub.soldFor", { price: fmtMoney(p.soldPrice, p.currency), date: p.soldAt ? fmtDate(p.soldAt) : "—" })}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/properties/${p.id}`} className={LINK_SECONDARY}>
                <Icon name="eye" size={16} /> {t("pro.hub.preview")}
              </Link>
              {p.listingType === "SALE" && p.status !== "SOLD" && (!pro || can?.EDIT_LISTING) && (
                <Button variant="gradient" onClick={() => setSoldOpen(true)}>
                  <Icon name="party" size={16} className="mr-1.5" /> {t("pro.hub.markSold")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {lettingDone && <LockedNote>{tUi("ui.pro.err.LETTING_MANDATE_COMPLETED")}</LockedNote>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {links
          .filter((l) => l.show)
          .map((l) => (
            <Link key={l.href + l.label} href={l.href} className="group rounded-2xl border border-border bg-surface p-4 hover:border-brand-400 hover:shadow-card transition text-ink min-w-0">
              <IconBadge name={l.icon} />
              <p className="mt-2 font-medium group-hover:text-brand-700 dark:group-hover:text-brand-300">{l.label}</p>
              <p className="text-xs text-ink-muted">{l.hint}</p>
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
                      <Icon name="send" size={16} className="mr-1.5" /> {t("pro.owner.resend")}
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
