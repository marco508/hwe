/**
 * URLs publiques des applications hwe.
 *
 * Les variables NEXT_PUBLIC_* sont figées au build par Next (y compris dans ce
 * package, transpilé par chaque app). Les replis pointent vers la production
 * — jamais vers localhost — pour qu'un oubli de variable au build ne produise
 * pas de liens morts en prod (F3). En local, définir les variables dans .env.
 */

// Typage minimal (le package n'embarque pas @types/node) ; Next remplace
// process.env.NEXT_PUBLIC_* par leur valeur au build.
declare const process: { env: Record<string, string | undefined> };

function clean(url: string | undefined, fallback: string): string {
  const v = (url ?? "").trim() || fallback;
  return v.replace(/\/+$/, "");
}

/** Racine de l'API (sans /api). */
export const API_URL = clean(process.env.NEXT_PUBLIC_API_URL, "https://hwe.dkpsolution.tech");
/** Espace propriétaire. */
export const OWNER_URL = clean(process.env.NEXT_PUBLIC_OWNER_URL, "https://owner.hwe.dkpsolution.tech");
/** Espace locataire / acheteur. */
export const TENANT_URL = clean(process.env.NEXT_PUBLIC_TENANT_URL, "https://tenant.hwe.dkpsolution.tech");
/** Site vitrine (pages légales). */
export const LANDING_URL = clean(process.env.NEXT_PUBLIC_LANDING_URL, "https://hwe.dkpsolution.tech");
