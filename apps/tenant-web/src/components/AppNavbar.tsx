"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppNav,
  ThemeToggle,
  CurrencySwitch,
  NotificationsBell,
  OWNER_URL,
  otherParty,
  partnerName,
  type AccountMenuLink,
  type BellPreviewItem,
  type NavItem,
} from "@hwe/ui";
import { useAuth } from "../lib/auth-context";
import { api } from "../lib/api";
import { markInAppNavigation } from "../lib/nav-history";
import { EmailVerifyBanner } from "./EmailVerifyBanner";
import { NavLink } from "./SectionNav";
import { t, LangSwitch } from "../lib/i18n";

/** Pages d'authentification : pas de « next » qui y ramènerait. */
const AUTH_PAGES = /^\/(login|register|forgot-password|reset-password|verify-email)(\/|$)/;

/**
 * Rubriques de l'espace locataire / voyageur. L'ordre fait foi pour la
 * rubrique active (la première qui correspond au chemin courant).
 */
function navItems(connected: boolean): NavItem[] {
  const search: NavItem = {
    key: "search",
    href: "/",
    label: t("nav.search"),
    icon: "search",
    paths: ["/", "/properties/*", "/agences/*"],
  };
  const voyage: NavItem = { key: "voyage", href: "/voyage", label: t("nav.voyage"), icon: "compass", paths: ["/voyage/*"] };
  if (!connected) return [search, voyage];
  return [
    search,
    {
      key: "steps",
      href: "/inquiries",
      label: t("nav.steps"),
      icon: "clipboard",
      paths: ["/inquiries", "/mes-visites", "/favorites"],
    },
    {
      key: "home",
      href: "/ma-location",
      label: t("nav.myHome"),
      icon: "key",
      paths: ["/ma-location", "/mes-loyers", "/mes-incidents"],
    },
    voyage,
  ];
}

export function AppNavbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const [unread, setUnread] = React.useState(0);
  const [preview, setPreview] = React.useState<BellPreviewItem[]>([]);

  // Navigation interne : un lien « Retour » peut alors utiliser l'historique.
  const firstPath = React.useRef(pathname);
  React.useEffect(() => {
    if (pathname !== firstPath.current) markInAppNavigation();
  }, [pathname]);

  // Page courante (avec sa recherche), lue après le montage : le rendu serveur
  // ne la connaît pas. Sert de « next » aux liens Connexion / Créer un compte.
  const [here, setHere] = React.useState<string | null>(null);
  React.useEffect(() => {
    setHere(AUTH_PAGES.test(pathname) || pathname === "/" ? null : window.location.pathname + window.location.search);
  }, [pathname]);
  const withNext = (base: string) => (here ? `${base}?next=${encodeURIComponent(here)}` : base);

  // P1 : le sondage ne récupère que le compteur (léger) ; la liste complète
  // (avec photos) n'est chargée qu'à l'ouverture de la cloche.
  const refreshCount = React.useCallback(async () => {
    if (!user || document.visibilityState === "hidden") return;
    try {
      const { count } = await api.unreadMessagesCount();
      setUnread(count);
    } catch {
      /* non bloquant */
    }
  }, [user]);

  const refreshPreview = React.useCallback(async () => {
    if (!user) return;
    try {
      const list = await api.listConversations();
      setPreview(
        list.slice(0, 5).map((c) => {
          // F19 : interlocuteur selon mon rôle dans la conversation.
          const partner = otherParty(c, user.id);
          const last = c.messages?.[0];
          return {
            id: c.id,
            partnerName: partnerName(partner, t("com.msg.anonymous")),
            initials:
              `${partner?.firstName?.[0] ?? ""}${partner?.lastName?.[0] ?? ""}`.toUpperCase() || "?",
            avatarUrl: partner?.avatarUrl ?? null,
            preview: last?.content ?? t("fix.nav.noMessage"),
            timestamp: c.lastMessageAt,
            unread: (c._count?.messages ?? 0) > 0,
            href: `/messages?c=${c.id}`,
          };
        }),
      );
      setUnread(list.reduce((s, c) => s + (c._count?.messages ?? 0), 0));
    } catch {
      /* non bloquant */
    }
  }, [user]);

  React.useEffect(() => {
    if (!user) return;
    void refreshCount();
    const id = setInterval(refreshCount, 15000);
    return () => clearInterval(id);
  }, [user, refreshCount]);

  const onLogout = () => {
    logout();
    router.push("/");
  };

  // Menu compte : profil (et dossier), messagerie, et l'espace propriétaire
  // pour un compte qui y a accès (autre application, lien plein).
  const accountLinks: AccountMenuLink[] = [
    { href: "/profile", label: t("nav.profile"), icon: "user" },
    { href: "/messages", label: t("nav.messages"), icon: "messages" },
  ];
  if (user && (user.role === "OWNER" || user.role === "ADMIN")) {
    accountLinks.push({ href: `${OWNER_URL}/dashboard`, label: t("nav.ownerSpace"), icon: "building", external: true });
  }

  const settings = (
    <>
      <LangSwitch />
      <CurrencySwitch />
      <ThemeToggle />
    </>
  );

  return (
    <>
      <AppNav
        pathname={pathname}
        Link={NavLink}
        brand={<Link href="/">hwe</Link>}
        audienceLabel={t("fix.nav.audience")}
        items={navItems(!!user)}
        messages={
          user ? (
            <NotificationsBell unreadCount={unread} preview={preview} seeAllHref="/messages" onOpen={refreshPreview} />
          ) : undefined
        }
        account={
          user
            ? {
                name: `${user.firstName} ${user.lastName}`.trim() || user.email,
                detail: user.email,
                avatarUrl: user.avatarUrl,
                links: accountLinks,
                onLogout,
              }
            : undefined
        }
        settings={
          user ? (
            settings
          ) : (
            <>
              {settings}
              {/* Téléphone étroit : « Créer un compte » passe dans le tiroir (pas de débordement à 375 px). */}
              <Link
                href={withNext("/register")}
                className="sm:hidden inline-flex items-center h-8 px-3 rounded-md text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 hover:text-white dark:bg-brand-500"
              >
                {t("nav.signup")}
              </Link>
            </>
          )
        }
        guest={
          user || loading ? null : (
            <>
              {/* Liens stylés en bouton (pas de <button> dans un <a>). */}
              <Link
                href={withNext("/login")}
                className="inline-flex items-center h-8 px-3 rounded-md text-sm font-medium text-ink whitespace-nowrap hover:bg-brand-50 dark:hover:bg-brand-900/40"
              >
                {t("nav.login")}
              </Link>
              <Link
                href={withNext("/register")}
                className="hidden sm:inline-flex items-center h-8 px-3 rounded-md text-sm font-medium whitespace-nowrap bg-brand-600 text-white hover:bg-brand-700 hover:text-white dark:bg-brand-500"
              >
                {t("nav.signup")}
              </Link>
            </>
          )
        }
      />
      <EmailVerifyBanner />
    </>
  );
}
