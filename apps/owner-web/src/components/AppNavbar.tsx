"use client";

import * as React from "react";
import Link from "next/link";
import {
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
  const { user, logout } = useAuth();
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
          const partner = c.otherUser;
          const last = c.messages?.[0];
          return {
            id: c.id,
            partnerName:
              `${partner?.firstName ?? ""} ${partner?.lastName ?? ""}`.trim() ||
              partner?.email ||
              "Anonyme",
            initials:
              partner?.firstName && partner?.lastName
                ? `${partner.firstName[0]}${partner.lastName[0]}`.toUpperCase()
                : "?",
            avatarUrl: partner?.avatarUrl ?? null,
            preview: last?.content ?? "(aucun message)",
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
    if (!user) return;
    refresh();
    const id = setInterval(refresh, 15000);
    return () => clearInterval(id);
  }, [user, refresh]);

  return (
    <>
    <Navbar
      brand={<Link href="/">hwe</Link>}
      audienceLabel="Espace propriétaire"
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
          <LangSwitch className="hidden sm:inline-flex" />
          <CurrencySwitch className="hidden md:inline-flex" />
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-ink-muted hidden sm:inline">
                {user.firstName}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <span className="hidden sm:inline">{t("nav.logout")}</span>
                <span className="sm:hidden">⏻</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{t("nav.signup")}</Button>
              </Link>
            </>
          )}
        </>
      }
    >
      <Link href="/" className="hidden md:inline">{t("nav.market")}</Link>
      {user && <Link href="/dashboard" className="hidden md:inline">{t("nav.myProperties")}</Link>}
      {user && <Link href="/dashboard/loyers" className="hidden md:inline">{t("nav.rents")}</Link>}
      {user && (
        <Link href="/dashboard/inquiries" className="hidden md:inline">
          {t("nav.requests")}
        </Link>
      )}
      {user && <Link href="/dashboard/visites" className="hidden md:inline">{t("nav.visits")}</Link>}
      {user && <Link href="/dashboard/messages" className="hidden md:inline">{t("nav.messages")}</Link>}
      {user && <Link href="/dashboard/tickets" className="hidden md:inline">{t("nav.incidents")}</Link>}
      {user?.role === "ADMIN" && <Link href="/dashboard/admin" className="hidden md:inline">{t("nav.admin")}</Link>}
      {user && <Link href="/profile" className="hidden md:inline">{t("nav.profile")}</Link>}
    </Navbar>
    <EmailVerifyBanner />
    </>
  );
}
