"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SectionTabs, type NavLinkComponent, type SectionTab } from "@hwe/ui";
import { useAuth } from "../lib/auth-context";
import { t } from "../lib/i18n";

/**
 * <Link> de Next au format attendu par la navigation @hwe/ui (le type de
 * next/link, dont href accepte aussi un objet, n'y est pas assignable tel quel).
 */
export const NavLink: NavLinkComponent = (props) => <Link {...props} />;

/**
 * Onglets internes des rubriques (en tête de page, au-dessus du titre).
 * Montés par les layout.tsx des pages concernées : ils restent affichés
 * pendant le chargement de la page. Rien pour un visiteur (ces pages le
 * renvoient vers la connexion).
 */
function Tabs({ label, tabs }: { label: string; tabs: SectionTab[] }) {
  const { user } = useAuth();
  const pathname = usePathname() ?? "/";
  if (!user) return null;
  return <SectionTabs label={label} tabs={tabs} pathname={pathname} Link={NavLink} className="print:hidden" />;
}

/** Mes démarches : Candidatures · Visites · Favoris. */
export function StepsTabs() {
  return (
    <Tabs
      label={t("nav.steps")}
      tabs={[
        { href: "/inquiries", label: t("tabs.steps.inquiries"), icon: "inbox" },
        { href: "/mes-visites", label: t("tabs.steps.visits"), icon: "calendar" },
        { href: "/favorites", label: t("tabs.steps.favorites"), icon: "heart" },
      ]}
    />
  );
}

/** Mon logement : Mon bail · Loyers · Incidents. */
export function HomeTabs() {
  return (
    <Tabs
      label={t("nav.myHome")}
      tabs={[
        { href: "/ma-location", label: t("tabs.home.lease"), icon: "file" },
        { href: "/mes-loyers", label: t("tabs.home.rents"), icon: "wallet" },
        { href: "/mes-incidents", label: t("tabs.home.incidents"), icon: "wrench" },
      ]}
    />
  );
}

/**
 * Voyage : Découvrir · Mes voyages · Réservations. Les pages à identifiant
 * sont servies par une coquille (/voyage/destination…) : les deux formes de
 * chemin sont listées. Pas d'onglets sur la page publique de partage.
 */
export function VoyageTabs() {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/voyage/partage")) return null;
  return (
    <Tabs
      label={t("nav.voyage")}
      tabs={[
        {
          href: "/voyage",
          label: t("tabs.voyage.discover"),
          icon: "compass",
          paths: [
            "/voyage",
            "/voyage/destinations/*",
            "/voyage/destination",
            "/voyage/lieux/*",
            "/voyage/lieu",
            "/voyage/circuits/*",
            "/voyage/circuit",
            "/voyage/sejours",
          ],
        },
        {
          href: "/voyage/mes-voyages",
          label: t("tabs.voyage.trips"),
          icon: "mapPin",
          paths: ["/voyage/mes-voyages/*", "/voyage/carnet"],
        },
        { href: "/voyage/reservations", label: t("tabs.voyage.bookings"), icon: "calendarCheck" },
      ]}
    />
  );
}
