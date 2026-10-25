"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Paramètres d'URL des pages « coquille statique ».
 *
 * Les pages à identifiant (/properties/<id>, /agences/<slug>…) n'ont plus de
 * segment dynamique : une réécriture (next.config.js) sert, pour toute valeur,
 * UNE page pré-rendue au build (HTML statique, aucun rendu serveur par
 * visite, et aucun cache disque par URL — une URL inventée ne crée rien).
 * Le contenu vient de l'API côté navigateur, comme avant.
 *
 * Le paramètre est lu dans l'URL réelle du navigateur (usePathname, qui suit
 * aussi les navigations client), seulement après l'hydratation : au premier
 * rendu (identique au HTML pré-rendu) il vaut null, comme useParams pendant
 * le chargement — les pages le gèrent déjà (`params?.id`).
 *
 * `pattern` : chemin public avec des segments `:nom`, ex. "/dashboard/:id/edit".
 */
export function matchRoute<T extends Record<string, string>>(pattern: string, pathname: string): T | null {
  const names: string[] = [];
  const re = new RegExp(
    "^" +
      pattern
        .split("/")
        .map((seg) => {
          if (seg.startsWith(":")) {
            names.push(seg.slice(1));
            return "([^/]+)";
          }
          return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        })
        .join("/") +
      "/?$",
  );
  const m = re.exec(pathname);
  if (!m) return null;
  const out: Record<string, string> = {};
  names.forEach((n, i) => (out[n] = m[i + 1]!));
  return out as T;
}

export function useShellParams<T extends Record<string, string>>(pattern: string): T | null {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return React.useMemo(
    () => (mounted && pathname ? matchRoute<T>(pattern, pathname) : null),
    [mounted, pathname, pattern],
  );
}
