"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  otherParty,
  partnerName,
  AppNav,
  ThemeToggle,
  CurrencySwitch,
  NotificationsBell,
  TENANT_URL,
  type AccountMenuLink,
  type BellPreviewItem,
  type NavItem,
} from "@hwe/ui";
import { useAuth } from "../lib/auth-context";
import { api } from "../lib/api";
import { EmailVerifyBanner } from "./EmailVerifyBanner";
import { t, LangSwitch } from "../lib/i18n";
import { isManager, isPro } from "../lib/pro";
import { matchPropertyPath, sumCounts, useNavCounts, useNavCountsPolling } from "../lib/nav";
import { SubscriptionBlockedDialog } from "./pro/SubscriptionKit";

/**
 * Barre de navigation (AppNav de @hwe/ui) :
 * - visiteur : Marché, préférences, Connexion / Créer un compte ;
 * - propriétaire (et admin) : Mes biens · Locations · Séjours · Mandats ;
 * - pro : Accueil · Biens · Mandats · Locations.
 * Chaque page n'active qu'UNE rubrique : les pages d'un bien (`/dashboard/:id…`)
 * appartiennent à « Mes biens » / « Biens », jamais aux autres rubriques.
 */
export function AppNavbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const pro = isPro(user);
  const manager = isManager(user);
  const counts = useNavCounts();
  // Pastilles des rubriques : sondage léger (60 s, onglet visible).
  useNavCountsPolling(user, !!user && (user.role === "OWNER" || user.role === "ADMIN" || (pro && !!user.agency)));

  // Page d'un bien : rattachée à la rubrique des biens (chemin exact ajouté).
  const propertyPage = matchPropertyPath(pathname) ? [pathname] : [];
  const locationsPaths = ["/dashboard/inquiries/*", "/dashboard/visites/*", "/dashboard/loyers/*", "/dashboard/tickets/*"];

  let items: NavItem[];
  if (!user) {
    items = [{ key: "market", href: "/", label: t("nav.market"), icon: "search", paths: ["/"] }];
  } else if (pro) {
    items = [
      { key: "home", href: "/pro", label: t("nav.pro.home"), icon: "home", paths: ["/pro"] },
      {
        key: "biens",
        href: "/pro/biens",
        label: t("nav.pro.properties"),
        icon: "building",
        paths: ["/pro/biens/*", "/pro/proprietaires/*", "/pro/nouveau/*", ...propertyPage],
      },
      {
        key: "mandats",
        href: "/pro/mandats",
        label: t("nav.pro.mandates"),
        icon: "handshake",
        paths: ["/pro/mandats/*", "/pro/honoraires/*"],
      },
      {
        key: "locations",
        href: "/dashboard/inquiries",
        label: t("nav.rentals"),
        icon: "key",
        paths: [...locationsPaths, "/dashboard/sejours/*"],
        badge: sumCounts(counts.inquiries, counts.visits, counts.rents, counts.tickets, counts.stays),
      },
    ];
  } else {
    items = [
      {
        key: "biens",
        href: "/dashboard",
        label: t("nav.myProperties"),
        icon: "home",
        paths: ["/dashboard", "/dashboard/new", ...propertyPage],
      },
      {
        key: "locations",
        href: "/dashboard/inquiries",
        label: t("nav.rentals"),
        icon: "key",
        paths: locationsPaths,
        badge: sumCounts(counts.inquiries, counts.visits, counts.rents, counts.tickets),
      },
      {
        key: "sejours",
        href: "/dashboard/sejours",
        label: t("nav.stays"),
        icon: "bed",
        paths: ["/dashboard/sejours/*"],
        badge: counts.stays ?? undefined,
      },
      {
        key: "mandats",
        href: "/dashboard/mandats",
        label: t("nav.mandates"),
        icon: "handshake",
        paths: ["/dashboard/mandats/*"],
        badge: counts.mandates ?? undefined,
      },
    ];
  }

  const links: AccountMenuLink[] = !user
    ? []
    : pro
      ? [
          { href: "/profile", label: t("nav.profile"), icon: "user" },
          { href: "/pro/agence", label: t("nav.pro.agency"), icon: "store" },
          { href: "/pro/abonnement", label: t("nav.pro.subscription"), icon: "creditCard" },
          { href: "/", label: t("nav.seeMarket"), icon: "search" },
        ]
      : [
          { href: "/profile", label: t("nav.profile"), icon: "user" },
          ...(user.role === "ADMIN" ? [{ href: "/dashboard/admin", label: t("nav.admin"), icon: "shield" as const }] : []),
          { href: "/", label: t("nav.seeMarket"), icon: "search" },
          // Les propriétaires peuvent aussi chercher / réserver côté locataire.
          { href: TENANT_URL, label: t("nav.tenantSpace"), icon: "key", external: true },
        ];

  const onLogout = () => {
    logout();
    router.push("/");
  };

  const guest = loading ? null : (
    <>
      {/* Liens stylés en bouton (pas de <button> dans un <a>). */}
      <Link
        href="/login"
        className="inline-flex items-center h-9 px-3 rounded-full text-sm font-medium text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40"
      >
        {t("nav.login")}
      </Link>
      <Link
        href="/register"
        className="hidden sm:inline-flex items-center h-9 px-3.5 rounded-full text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 hover:text-white dark:bg-brand-500"
      >
        {t("nav.signup")}
      </Link>
    </>
  );

  return (
    <>
      <AppNav
        pathname={pathname}
        Link={Link}
        brand={<Link href={pro ? "/pro" : user ? "/dashboard" : "/"}>hwe</Link>}
        audienceLabel={pro ? t("nav.audiencePro") : t("nav.audience")}
        items={items}
        primaryAction={user ? { href: pro ? "/pro/nouveau" : "/dashboard/new", label: t("nav.addProperty"), icon: "plus" } : undefined}
        messages={user ? <MessagesBell /> : undefined}
        account={
          user
            ? {
                name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
                detail:
                  pro && user.agency
                    ? `${user.agency.name} · ${manager ? t("pro.role.MANAGER") : t("pro.role.AGENT")}`
                    : user.email,
                avatarUrl: user.avatarUrl ?? null,
                links,
                onLogout,
              }
            : undefined
        }
        settings={
          <>
            <LangSwitch />
            <CurrencySwitch />
            <ThemeToggle />
          </>
        }
        guest={guest}
      />
      {/* Refus d'abonnement (402) : fenêtre claire avec lien vers l'abonnement. */}
      {pro && <SubscriptionBlockedDialog />}
      <EmailVerifyBanner />
    </>
  );
}

/** Cloche des messages : non-lus + aperçu des dernières conversations. */
function MessagesBell() {
  const { user } = useAuth();
  const pathname = usePathname();
  // La page messages sonde déjà la liste : la barre ne double pas l'appel (P1).
  const onMessagesPage = pathname?.startsWith("/dashboard/messages") ?? false;
  const [unread, setUnread] = React.useState(0);
  const [preview, setPreview] = React.useState<BellPreviewItem[]>([]);

  const refresh = React.useCallback(async () => {
    if (!user) return;
    try {
      const [{ count }, list] = await Promise.all([api.unreadMessagesCount(), api.listConversations()]);
      setUnread(count);
      setPreview(
        list.slice(0, 5).map((c) => {
          // F19 : interlocuteur = l'autre partie, que je sois propriétaire ou non.
          const partner = otherParty(c, user.id);
          const last = c.messages?.[0];
          return {
            id: c.id,
            partnerName: partnerName(partner, t("nav.anonymous")),
            initials:
              partner?.firstName && partner?.lastName ? `${partner.firstName[0]}${partner.lastName[0]}`.toUpperCase() : "?",
            avatarUrl: partner?.avatarUrl ?? null,
            preview: last?.content ?? t("nav.noMessage"),
            timestamp: c.lastMessageAt,
            unread: (c._count?.messages ?? 0) > 0,
            href: `/dashboard/messages?c=${c.id}`,
          };
        }),
      );
    } catch {
      /* ignore */
    }
  }, [user]);

  React.useEffect(() => {
    if (!user || onMessagesPage) return;
    refresh();
    // Sondage suspendu quand l'onglet est masqué (P1).
    const tick = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const id = setInterval(tick, 15000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [user, refresh, onMessagesPage]);

  return <NotificationsBell unreadCount={unread} preview={preview} seeAllHref="/dashboard/messages" onOpen={refresh} />;
}
