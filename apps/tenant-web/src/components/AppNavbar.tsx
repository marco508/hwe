"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Navbar,
  Button,
  ThemeToggle,
  CurrencySwitch,
  NotificationsBell,
  otherParty,
  partnerName,
  type BellPreviewItem,
} from "@hwe/ui";
import { useAuth } from "../lib/auth-context";
import { api } from "../lib/api";
import { EmailVerifyBanner } from "./EmailVerifyBanner";
import { t, LangSwitch } from "../lib/i18n";

export function AppNavbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [unread, setUnread] = React.useState(0);
  const [preview, setPreview] = React.useState<BellPreviewItem[]>([]);

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

  return (
    <>
      <Navbar
        brand={<Link href="/">hwe</Link>}
        audienceLabel={t("fix.nav.audience")}
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
                seeAllHref="/messages"
                onOpen={refreshPreview}
              />
            )}
            <LangSwitch className="hidden lg:inline-flex" />
            <CurrencySwitch className="hidden lg:inline-flex" />
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-sm text-ink-muted hidden xl:inline max-w-[8rem] truncate">{user.firstName}</span>
                <Button variant="ghost" size="sm" onClick={onLogout} aria-label={t("nav.logout")}>
                  <span className="hidden sm:inline">{t("nav.logout")}</span>
                  <span className="sm:hidden" aria-hidden="true">
                    ⏻
                  </span>
                </Button>
              </>
            ) : loading ? null : (
              <>
                {/* Liens stylés en bouton (pas de <button> dans un <a>) ; « Créer un compte »
                    passe dans le tiroir sur téléphone pour ne pas déborder à 375 px. */}
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
        <Link href="/" className="hidden lg:inline">{t("nav.listings")}</Link>
        {user && <Link href="/ma-location" className="hidden lg:inline">{t("nav.myRental")}</Link>}
        {user && <Link href="/mes-loyers" className="hidden lg:inline">{t("nav.myRents")}</Link>}
        {user && <Link href="/mes-visites" className="hidden lg:inline">{t("nav.myVisits")}</Link>}
        {user && <Link href="/favorites" className="hidden lg:inline">{t("nav.favorites")}</Link>}
        {user && <Link href="/inquiries" className="hidden lg:inline">{t("nav.myRequests")}</Link>}
        {user && <Link href="/messages" className="hidden lg:inline">{t("nav.messages")}</Link>}
        {user && <Link href="/profile" className="hidden lg:inline">{t("nav.profile")}</Link>}
        {!user && !loading && <Link href="/register" className="lg:hidden">{t("nav.signup")}</Link>}
      </Navbar>
      <EmailVerifyBanner />
    </>
  );
}
