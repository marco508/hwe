"use client";

import Link from "next/link";
import { Navbar, Button, ThemeToggle } from "@hwe/ui";
import { useAuth } from "../lib/auth-context";

export function AppNavbar() {
  const { user, logout } = useAuth();
  return (
    <Navbar
      brand={<Link href="/">hwe</Link>}
      audienceLabel="Espace locataire / acheteur"
      right={
        <>
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-ink-muted hidden sm:inline">
                {user.firstName}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Déconnexion
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
      <Link href="/">Annonces</Link>
      {user && <Link href="/ma-location">Ma location</Link>}
      {user && <Link href="/favorites">❤ Favoris</Link>}
      {user && <Link href="/inquiries">Mes demandes</Link>}
      {user && <Link href="/profile">Profil</Link>}
    </Navbar>
  );
}
