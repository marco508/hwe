"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AgencyLogo,
  AnimatedBackground,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  ErrorState,
  Icon,
  IconBadge,
  PropertyCard,
  isNotFound,
  useAsync,
  type IconName,
} from "@hwe/ui";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useCurrency } from "../../../lib/currency-context";

function regionName(code: string | null | undefined, lang: string): string {
  if (!code) return "";
  try {
    return new Intl.DisplayNames([lang], { type: "region" }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

/** Page publique d'une agence : profil, coordonnées et biens publiés. */
export default function AgencyPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const { lang } = useLang();
  const { format: fmtPrice } = useCurrency();
  const { data, error, loading, reload } = useAsync(() => api.getAgency(slug), [slug], {
    enabled: !!slug,
  });

  if (error && !data) {
    return isNotFound(error) ? (
      <EmptyState
        illustration="search"
        title={t("pro.agency.notFound")}
        description={t("pro.agency.notFoundSub")}
        action={
          <Link
            href="/"
            className="inline-flex items-center h-10 px-5 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90"
          >
            {t("pro.agency.browse")}
          </Link>
        }
      />
    ) : (
      <ErrorState error={error} title={t("pro.agency.loadError")} onRetry={reload} />
    );
  }

  if (loading || !data) {
    return (
      <div className="space-y-6" aria-busy="true">
        <div className="h-44 rounded-2xl skeleton" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 rounded-xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  const a = data;
  const place = [a.city, regionName(a.country, lang)].filter(Boolean).join(", ");
  const props = a.properties ?? [];
  const contacts: { icon: IconName; label: string; value: string; href?: string }[] = [];
  if (a.email) contacts.push({ icon: "mail", label: t("pro.agency.email"), value: a.email, href: `mailto:${a.email}` });
  if (a.phone) contacts.push({ icon: "phone", label: t("pro.agency.phone"), value: a.phone, href: `tel:${a.phone.replace(/\s+/g, "")}` });
  if (a.address) contacts.push({ icon: "mapPin", label: t("pro.agency.address"), value: a.address });
  if (a.registrationNumber)
    contacts.push({ icon: "idCard", label: t("pro.agency.registration"), value: a.registrationNumber });

  return (
    <section className="min-w-0">
      <AnimatedBackground variant="aurora" className="rounded-2xl border border-border/60 px-5 sm:px-8 py-8 mb-8">
        <div className="flex items-center gap-5 flex-wrap min-w-0">
          <AgencyLogo name={a.name} logoUrl={a.logoUrl} size="xl" className="shadow-card" />
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
              <Icon name="building" size={12} />
              {t("pro.agency.kicker")}
            </span>
            <h1 className="display-serif text-3xl sm:text-4xl text-ink leading-tight [overflow-wrap:anywhere]">{a.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
              {place && (
                <span className="inline-flex items-center gap-1">
                  <Icon name="mapPin" size={14} />
                  {place}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Icon name="home" size={14} />
                {t("pro.agency.listingsCount", { count: props.length })}
              </span>
            </div>
          </div>
        </div>
      </AnimatedBackground>

      <div className="grid lg:grid-cols-3 gap-6 mb-10 min-w-0">
        <Card className="lg:col-span-2 min-w-0">
          <CardHeader>
            <h2 className="font-display text-lg">{t("pro.agency.about")}</h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm leading-relaxed whitespace-pre-line text-ink [overflow-wrap:anywhere]">
              {a.description?.trim() || <span className="text-ink-muted">{t("pro.agency.noDescription")}</span>}
            </p>
          </CardBody>
        </Card>
        <Card className="min-w-0">
          <CardHeader>
            <h2 className="font-display text-lg">{t("pro.agency.contact")}</h2>
          </CardHeader>
          <CardBody className="space-y-3">
            {contacts.map((c) => (
              <div key={c.label} className="flex items-start gap-3 min-w-0">
                <IconBadge name={c.icon} size="sm" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-sm font-medium text-ink hover:underline [overflow-wrap:anywhere]">
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-ink [overflow-wrap:anywhere]">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3 min-w-0">
              <IconBadge name="tag" size="sm" tone="neutral" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">{t("pro.agency.code")}</div>
                <div className="text-sm font-mono text-ink">{a.code}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <h2 className="display-serif text-2xl mb-4">{t("pro.agency.listings")}</h2>
      {props.length === 0 ? (
        <EmptyState
          illustration="home"
          title={t("pro.agency.empty")}
          description={t("pro.agency.emptySub")}
          action={
            <Link
              href="/"
              className="inline-flex items-center h-10 px-5 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90"
            >
              {t("pro.agency.browse")}
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((p) => (
            <PropertyCard
              key={p.id}
              title={p.title}
              city={p.city}
              price={p.displayPrice ?? p.price}
              currency={p.currency}
              displayPrice={fmtPrice(p.displayPrice ?? p.price, p.currency)}
              surface={p.surface}
              rooms={p.rooms}
              listingType={p.listingType}
              propertyType={p.propertyType}
              thumbnailUrl={p.media?.[0]?.url ?? null}
              priceUnit={p.priceUnit}
              status={p.status}
              href={`/properties/${p.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
