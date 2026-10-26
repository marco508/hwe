"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Breadcrumbs, Icon, SectionTabs, navMatch, type SectionTab } from "@hwe/ui";
import type { Property } from "@hwe/types";
import { useAuth } from "../lib/auth-context";
import { t } from "../lib/i18n";
import { isPro, usePortfolioItem } from "../lib/pro";
import { matchPropertyPath, useCachedProperty, useNavCounts, withParams, type PropertySub } from "../lib/nav";

/**
 * Navigation interne des rubriques, rendue par les layouts (/dashboard, /pro) :
 * - pages d'un bien (`/dashboard/:id…`) : fil d'Ariane + onglets du bien ;
 * - listes filtrées sur un bien (`?bien=<id>`) : idem + puce « <bien> ✕ » ;
 * - Locations : Demandes · Visites · Loyers · Incidents (· Séjours pour un pro) ;
 * - pro : Biens · Propriétaires ; Mandats · Honoraires.
 */
export function SectionNav() {
  // useSearchParams exige une frontière Suspense (prérendu des coquilles).
  return (
    <React.Suspense fallback={null}>
      <SectionNavInner />
    </React.Suspense>
  );
}

/** Listes partagées propriétaire / pro, filtrables par bien. */
const LIST_PAGES = ["/dashboard/inquiries", "/dashboard/visites", "/dashboard/loyers", "/dashboard/tickets"] as const;
type ListPage = (typeof LIST_PAGES)[number];

function SectionNavInner() {
  const pathname = usePathname() ?? "";
  const search = useSearchParams();
  const { user } = useAuth();
  const pro = isPro(user);
  const counts = useNavCounts();

  const prop = matchPropertyPath(pathname);
  if (prop) return <PropertyNav id={prop.id} sub={prop.sub} />;

  const list = LIST_PAGES.find((p) => navMatch(pathname, { href: p, paths: [`${p}/*`] })) as ListPage | undefined;
  const bien = search?.get("bien")?.trim();
  if (list && bien) return <PropertyNav id={bien} list={list} />;

  const locations = list || (pro && navMatch(pathname, { href: "/dashboard/sejours", paths: ["/dashboard/sejours/*"] }));
  if (locations) {
    const tabs: SectionTab[] = [
      { href: "/dashboard/inquiries", label: t("nav.requests"), icon: "inbox", paths: ["/dashboard/inquiries/*"], count: counts.inquiries ?? undefined },
      { href: "/dashboard/visites", label: t("nav.visits"), icon: "calendar", paths: ["/dashboard/visites/*"], count: counts.visits ?? undefined },
      { href: "/dashboard/loyers", label: t("nav.rents"), icon: "wallet", paths: ["/dashboard/loyers/*"], count: counts.rents ?? undefined },
      { href: "/dashboard/tickets", label: t("nav.incidents"), icon: "wrench", paths: ["/dashboard/tickets/*"], count: counts.tickets ?? undefined },
      ...(pro
        ? [{ href: "/dashboard/sejours", label: t("nav.stays"), icon: "bed" as const, paths: ["/dashboard/sejours/*"], count: counts.stays ?? undefined }]
        : []),
    ];
    return <SectionTabs tabs={tabs} pathname={pathname} Link={Link} label={t("nav.rentals")} />;
  }

  if (pro && navMatch(pathname, { href: "/pro/biens", paths: ["/pro/biens/*", "/pro/proprietaires/*"] })) {
    return (
      <SectionTabs
        tabs={[
          { href: "/pro/biens", label: t("nav.pro.properties"), icon: "building", paths: ["/pro/biens/*"] },
          { href: "/pro/proprietaires", label: t("nav.pro.owners"), icon: "users", paths: ["/pro/proprietaires/*"] },
        ]}
        pathname={pathname}
        Link={Link}
        label={t("nav.pro.properties")}
      />
    );
  }

  if (pro && navMatch(pathname, { href: "/pro/mandats", paths: ["/pro/mandats/*", "/pro/honoraires/*"] })) {
    return (
      <SectionTabs
        tabs={[
          { href: "/pro/mandats", label: t("nav.pro.mandates"), icon: "handshake", paths: ["/pro/mandats/*"] },
          { href: "/pro/honoraires", label: t("nav.pro.fees"), icon: "coins", paths: ["/pro/honoraires/*"] },
        ]}
        pathname={pathname}
        Link={Link}
        label={t("nav.pro.mandates")}
      />
    );
  }

  return null;
}

/**
 * Droits d'affichage sur un bien (mêmes règles que les verrous de l'API) :
 * pro → droits du portefeuille (EDIT_LISTING, RENTS, STAYS) et verrou
 * « mise en location terminée » (mandat LETTING, bail signé).
 */
export function propertyRights(
  p: Pick<Property, "listingType">,
  pro: boolean,
  item: Property | null,
  /** Type du mandat en cours s'il est connu (sinon celui du portefeuille). */
  mandateType?: string | null,
) {
  const can = item?.access?.can;
  const lettingDone = pro && (mandateType ?? item?.mandate?.type) === "LETTING" && !!can && !can.EDIT_LISTING;
  const isRent = p.listingType === "RENT";
  return {
    lettingDone,
    isRent,
    edit: !lettingDone,
    docs: !lettingDone,
    lease: isRent,
    stays: isRent && !lettingDone && (!pro || !!can?.STAYS),
    requests: !lettingDone,
    visits: !lettingDone,
    rents: isRent && !lettingDone && (!pro || !!can?.RENTS),
    tickets: isRent && !lettingDone,
    messages: !lettingDone,
  };
}

/** Onglets d'un bien (adresses comprises), selon les droits. */
export function propertyTabs(id: string, rights: ReturnType<typeof propertyRights>): (SectionTab & { key: string })[] {
  const enc = encodeURIComponent(id);
  const base = `/dashboard/${enc}`;
  const all: (SectionTab & { key: string; show: boolean })[] = [
    { key: "", href: base, label: t("prop.tab.overview"), icon: "layers", show: true },
    { key: "edit", href: `${base}/edit`, label: t("pro.hub.edit"), icon: "pen", show: rights.edit },
    { key: "documents", href: `${base}/documents`, label: t("pro.hub.docs"), icon: "folder", show: rights.docs },
    { key: "lease", href: `${base}/lease`, label: t("prop.tab.lease"), icon: "clipboard", show: rights.lease },
    { key: "sejour", href: `${base}/sejour`, label: t("nav.stays"), icon: "bed", show: rights.stays },
    { key: "/dashboard/inquiries", href: `/dashboard/inquiries?bien=${enc}`, label: t("nav.requests"), icon: "inbox", show: rights.requests },
    { key: "/dashboard/visites", href: `/dashboard/visites?bien=${enc}`, label: t("nav.visits"), icon: "calendar", show: rights.visits },
    { key: "/dashboard/loyers", href: `/dashboard/loyers?bien=${enc}`, label: t("nav.rents"), icon: "wallet", show: rights.rents },
    { key: "/dashboard/tickets", href: `/dashboard/tickets?bien=${enc}`, label: t("nav.incidents"), icon: "wrench", show: rights.tickets },
  ];
  return all.filter((x) => x.show).map(({ show: _s, ...x }) => x);
}

/** Fil d'Ariane « Mes biens › <titre> › <onglet> » + onglets du bien. */
function PropertyNav({ id, sub, list }: { id: string; sub?: PropertySub; list?: ListPage }) {
  const pathname = usePathname() ?? "";
  const search = useSearchParams();
  const { user } = useAuth();
  const { data: p, failed } = useCachedProperty(id);
  const { pro, item, loading: pfLoading } = usePortfolioItem(id);

  const root = pro ? { href: "/pro/biens", label: t("nav.pro.properties") } : { href: "/dashboard", label: t("nav.myProperties") };
  // Pro : bien hors portefeuille → la page affiche « Bien non accessible ».
  if (!user || failed || (pro && !pfLoading && !item)) return null;
  if (!p) {
    // Chargement (ou bien inaccessible : la page affiche son propre message).
    return (
      <div className="mb-6" aria-hidden="true">
        <div className="h-5 w-48 rounded skeleton mb-4" />
        <div className="h-11 rounded skeleton" />
      </div>
    );
  }

  const tabs = propertyTabs(p.id, propertyRights(p, pro, item));
  const currentKey = list ?? sub ?? "";
  const current = tabs.find((x) => x.key === currentKey);
  const hub = `/dashboard/${encodeURIComponent(p.id)}`;
  const crumbs = [root, current && currentKey !== "" ? { href: hub, label: p.title } : { label: p.title }];
  if (current && currentKey !== "") crumbs.push({ label: current.label });

  return (
    <div className="mb-6 min-w-0">
      <Breadcrumbs items={crumbs} Link={Link} />
      <SectionTabs tabs={tabs} pathname={pathname} Link={Link} label={t("prop.tabsAria", { title: p.title })} className="mb-0" />
      {list && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink-muted">{t("prop.filteredOn")}</span>
          <Link
            href={withParams(list, search as unknown as URLSearchParams, { bien: null })}
            className="inline-flex items-center gap-1.5 max-w-full h-8 ps-3 pe-2 rounded-full border border-brand-300 bg-brand-50 text-brand-800 dark:border-brand-700 dark:bg-brand-900/40 dark:text-brand-100 hover:border-brand-500"
            aria-label={t("prop.clearFilter", { title: p.title })}
            title={t("prop.clearFilter", { title: p.title })}
          >
            <span className="truncate">{p.title}</span>
            <Icon name="x" size={14} className="shrink-0" />
          </Link>
        </div>
      )}
    </div>
  );
}
