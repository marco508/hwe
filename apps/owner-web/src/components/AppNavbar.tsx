"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  otherParty,
  partnerName,
  Navbar,
  Button,
  ThemeToggle,
  CurrencySwitch,
  NotificationsBell,
  type BellPreviewItem,
} from "@hwe/ui";
import { useAuth } from "../lib/auth-context";
import { api } from "../lib/api";
import { EmailVerifyBanner } from "./EmailVerifyBanner";
import { t, LangSwitch } from "../lib/i18n";
import { isManager, isPro } from "../lib/pro";
import { Icon, type IconName } from "@hwe/ui";
import { SubscriptionBlockedDialog } from "./pro/SubscriptionKit";

/** Navigation de l'espace pro (ordre du cahier des charges). */
const PRO_LINKS: { href: string; label: string; icon: IconName; manager?: boolean; exact?: boolean }[] = [
  { href: "/pro", label: "nav.pro.dashboard", icon: "layers", exact: true },
  { href: "/pro/biens", label: "nav.pro.properties", icon: "building" },
  { href: "/pro/proprietaires", label: "nav.pro.owners", icon: "users" },
  { href: "/pro/mandats", label: "nav.pro.mandates", icon: "handshake" },
  { href: "/dashboard/inquiries", label: "nav.requests", icon: "inbox" },
  { href: "/dashboard/visites", label: "nav.visits", icon: "calendar" },
  { href: "/dashboard/loyers", label: "nav.rents", icon: "wallet" },
  { href: "/dashboard/tickets", label: "nav.incidents", icon: "wrench" },
  { href: "/dashboard/messages", label: "nav.messages", icon: "messages" },
  { href: "/pro/honoraires", label: "nav.pro.fees", icon: "coins" },
  { href: "/pro/agence", label: "nav.pro.agency", icon: "store" },
  { href: "/pro/abonnement", label: "nav.pro.subscription", icon: "creditCard" },
];

function ProNav({ manager, pathname }: { manager: boolean; pathname: string }) {
  const listRef = React.useRef<HTMLDivElement>(null);
  // La barre défile horizontalement : l'onglet actif (souvent « Abonnement », le dernier) reste visible.
  React.useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);
  return (
    <nav
      aria-label={t("nav.pro.aria")}
      data-pro-nav
      className="hidden lg:block sticky top-16 z-20 border-b border-border/70 bg-cream-50/90 dark:bg-background/85 backdrop-blur-xl"
    >
      <div ref={listRef} className="container-app flex items-center gap-1 overflow-x-auto py-2">
        {PRO_LINKS.filter((l) => !l.manager || manager).map((l) => {
          const active = l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-sm whitespace-nowrap transition-colors ${
                active
                  ? "bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950"
                  : "text-ink-muted hover:text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40"
              }`}
            >
              <Icon name={l.icon} size={15} />
              {t(l.label)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppNavbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  // La page messages sonde déjà la liste : la navbar ne double pas l'appel (P1).
  const onMessagesPage = pathname?.startsWith("/dashboard/messages") ?? false;
  const [unread, setUnread] = React.useState(0);
  const [preview, setPreview] = React.useState<BellPreviewItem[]>([]);

  const refresh = React.useCallback(async () => {
    if (!user) return;
    try {
      const [{ count }, list] = await Promise.all([
        api.unreadMessagesCount(),
        api.listConversations(),
      ]);
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
              partner?.firstName && partner?.lastName
                ? `${partner.firstName[0]}${partner.lastName[0]}`.toUpperCase()
                : "?",
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

  const pro = isPro(user);
  const manager = isManager(user);

  const onLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
    <Navbar
      brand={<Link href={pro ? "/pro" : "/"}>hwe</Link>}
      audienceLabel={pro ? t("nav.audiencePro") : t("nav.audience")}
      collapseBelow="lg"
      mobileExtra={
        <>
          <LangSwitch />
          <CurrencySwitch />
        </>
      }
      right={
        <>
          {user && (
            <NotificationsBell
              unreadCount={unread}
              preview={preview}
              seeAllHref="/dashboard/messages"
              onOpen={refresh}
            />
          )}
          <LangSwitch className="hidden lg:inline-flex" />
          <CurrencySwitch className="hidden lg:inline-flex" />
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-ink-muted hidden xl:inline max-w-[10rem] truncate">
                {user.firstName}
                {pro && user.agency ? ` · ${user.agency.name}` : ""}
              </span>
              <Button variant="ghost" size="sm" onClick={onLogout} aria-label={t("nav.logout")}>
                <span className="hidden sm:inline">{t("nav.logout")}</span>
                <span className="sm:hidden" aria-hidden="true">⏻</span>
              </Button>
            </>
          ) : loading ? null : (
            <>
              {/* Liens stylés en bouton (pas de <button> dans un <a>). */}
              <Link
                href="/login"
                className="inline-flex items-center h-8 px-3 rounded-md text-sm font-medium text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-flex items-center h-8 px-3 rounded-md text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 hover:text-white dark:bg-brand-500"
              >
                {t("nav.signup")}
              </Link>
            </>
          )}
        </>
      }
    >
      <Link href="/" className="hidden lg:inline">{t("nav.market")}</Link>
      {pro && PRO_LINKS.filter((l) => !l.manager || manager).map((l) => (
        // Pro : liens dans le tiroir mobile ; sur ordinateur, barre ProNav dédiée.
        <Link key={l.href} href={l.href} className="lg:hidden">{t(l.label)}</Link>
      ))}
      {user && !pro && <Link href="/dashboard" className="hidden lg:inline">{t("nav.myProperties")}</Link>}
      {user && !pro && <Link href="/dashboard/mandats" className="hidden lg:inline">{t("nav.mandates")}</Link>}
      {user && !pro && <Link href="/dashboard/loyers" className="hidden lg:inline">{t("nav.rents")}</Link>}
      {user && !pro && (
        <Link href="/dashboard/inquiries" className="hidden lg:inline">
          {t("nav.requests")}
        </Link>
      )}
      {user && !pro && <Link href="/dashboard/visites" className="hidden lg:inline">{t("nav.visits")}</Link>}
      {user && !pro && <Link href="/dashboard/messages" className="hidden lg:inline">{t("nav.messages")}</Link>}
      {user && !pro && <Link href="/dashboard/tickets" className="hidden lg:inline">{t("nav.incidents")}</Link>}
      {user?.role === "ADMIN" && <Link href="/dashboard/admin" className="hidden lg:inline">{t("nav.admin")}</Link>}
      {!user && !loading && <Link href="/register" className="lg:hidden">{t("nav.signup")}</Link>}
      {user && <Link href="/profile" className="hidden lg:inline">{t("nav.profile")}</Link>}
    </Navbar>
    {pro && <ProNav manager={manager} pathname={pathname ?? ""} />}
    {/* Refus d'abonnement (402) : fenêtre claire avec lien vers l'abonnement. */}
    {pro && <SubscriptionBlockedDialog />}
    <EmailVerifyBanner />
    </>
  );
}
