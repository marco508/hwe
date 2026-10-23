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

  const onLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
    <Navbar
      brand={<Link href="/">hwe</Link>}
      audienceLabel={t("nav.audience")}
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
              <span className="text-sm text-ink-muted hidden xl:inline max-w-[8rem] truncate">
                {user.firstName}
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
      {user && <Link href="/dashboard" className="hidden lg:inline">{t("nav.myProperties")}</Link>}
      {user && <Link href="/dashboard/loyers" className="hidden lg:inline">{t("nav.rents")}</Link>}
      {user && (
        <Link href="/dashboard/inquiries" className="hidden lg:inline">
          {t("nav.requests")}
        </Link>
      )}
      {user && <Link href="/dashboard/visites" className="hidden lg:inline">{t("nav.visits")}</Link>}
      {user && <Link href="/dashboard/messages" className="hidden lg:inline">{t("nav.messages")}</Link>}
      {user && <Link href="/dashboard/tickets" className="hidden lg:inline">{t("nav.incidents")}</Link>}
      {user?.role === "ADMIN" && <Link href="/dashboard/admin" className="hidden lg:inline">{t("nav.admin")}</Link>}
      {!user && !loading && <Link href="/register" className="lg:hidden">{t("nav.signup")}</Link>}
      {user && <Link href="/profile" className="hidden lg:inline">{t("nav.profile")}</Link>}
    </Navbar>
    <EmailVerifyBanner />
    </>
  );
}
