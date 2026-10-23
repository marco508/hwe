"use client";

import * as React from "react";
import { loginHref } from "./http";
import type { AuthCtx } from "./auth";

/**
 * Chargement asynchrone avec états explicites (L1, L2) :
 * `loading` → `data` | `error`, et `reload()` pour le bouton « Réessayer ».
 * Les réponses obsolètes (deps changées entre-temps) sont ignorées.
 */
export function useAsync<T>(
  fn: () => Promise<T>,
  deps: React.DependencyList,
  opts: { enabled?: boolean } = {},
) {
  const enabled = opts.enabled ?? true;
  const [data, setData] = React.useState<T | undefined>(undefined);
  const [error, setError] = React.useState<unknown>(null);
  const [loading, setLoading] = React.useState<boolean>(enabled);
  const [tick, setTick] = React.useState(0);
  const fnRef = React.useRef(fn);
  fnRef.current = fn;

  React.useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fnRef
      .current()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e ?? new Error("error"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, tick, ...deps]);

  const reload = React.useCallback(() => setTick((n) => n + 1), []);
  return { data, setData, error, loading, reload };
}

/**
 * Redirige vers /login?next=<page courante> quand aucune session n'est ouverte.
 * `router` = useRouter() de next/navigation (passé pour garder @hwe/ui
 * indépendant de Next).
 */
export function useLoginRedirect(auth: Pick<AuthCtx, "user" | "loading">, router: { replace: (href: string) => void }) {
  React.useEffect(() => {
    if (!auth.loading && !auth.user) router.replace(loginHref());
  }, [auth.loading, auth.user, router]);
}
