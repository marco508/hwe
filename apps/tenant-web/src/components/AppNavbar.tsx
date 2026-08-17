"use client";

import * as React from "react";
import Link from "next/link";
import {
  Navbar,
  Button,
  ThemeToggle,
  NotificationsBell,
  type BellPreviewItem,
} from "@hwe/ui";
import { useAuth } from "../lib/auth-context";
import { api } from "../lib/api";

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
          const partner = c.ownerId === user.id ? c.otherUser : c.owner;
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
            href: `/messages?c=${c.id}`,
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
    <Navbar
      brand={<Link href="/">hwe</Link>}
      audienceLabel="Espace locataire / acheteur"
      right={
        <>
          {user && (
            <NotificationsBell
              unreadCount={unread}
              preview={preview}
              seeAllHref="/messages"
              onOpen={refresh}
            />
          )}
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-ink-muted hidden sm:inline">
                {user.firstName}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <span className="hidden sm:inline">Déconnexion</span>
                <span className="sm:hidden">⏻</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Créer un compte</Button>
              </Link>
            </>
          )}
        </>
      }
    >
      <Link href="/" className="hidden md:inline">Annonces</Link>
      {user && <Link href="/ma-location" className="hidden md:inline">Ma location</Link>}
      {user && <Link href="/mes-loyers" className="hidden md:inline">Mes loyers</Link>}
      {user && <Link href="/favorites" className="hidden md:inline">❤ Favoris</Link>}
      {user && <Link href="/inquiries" className="hidden md:inline">Mes demandes</Link>}
      {user && <Link href="/messages" className="hidden md:inline">Messages</Link>}
      {user && <Link href="/profile" className="hidden md:inline">Profil</Link>}
    </Navbar>
  );
}
