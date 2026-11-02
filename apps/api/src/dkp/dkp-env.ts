/**
 * Écosystème DKP Solution (contrat /opt/dkp/CONTRAT.md) : chaque intégration
 * est activée par ses variables d'environnement. Sans elles, hwe se comporte
 * exactement comme avant (boutons et liens masqués, e-mails par SMTP seul).
 *
 * Variables (noms seulement ; valeurs dans le .env, jamais dans le dépôt) :
 *   DKP_HUB_URL            URL serveur du hub (ex. http://dkp-hub:3020)
 *   DKP_PUBLIC_URL         URL du hub vue par le navigateur (ex. https://dkpsolution.tech)
 *   DKP_CLIENT_ID          identifiant de hwe sur le hub (« hwe »)
 *   DKP_CLIENT_SECRET      secret de hwe sur le hub
 *   DKP_LOGIN              « 0 » pour masquer « Continuer avec un compte DKP » (défaut : actif si hub configuré)
 *   DKP_PAYMENTS           « 0 » pour masquer le paiement en ligne de l'abonnement (défaut : actif si hub configuré)
 *   DKP_REDIRECT_URI       (facultatif) adresse de retour OAuth ; défaut PUBLIC_API_URL + /auth/dkp/callback
 *   DKP_PARTNER_KEYS       clés partenaires acceptées (ex. familyfe:<clé>)
 *   ZEMI_PUBLIC_URL        lien « Faire livrer… — Zémi Market » (ex. https://bjdrive.dkpsolution.tech)
 *   AFROCHINA_PUBLIC_URL   lien « Équiper ce logement depuis la Chine » (ex. https://afrochina.dkpsolution.tech)
 *   AFROCHINA_REQUEST_PATH (facultatif) chemin du formulaire de demande AfroChina
 *   GESTIPRO_PARTNER_URL   API GestiPro (ex. http://gestipro-api:3000) : « Connecter GestiPro »
 *   GESTIPRO_PUBLIC_URL    (facultatif) lien GestiPro dans « Services DKP »
 *   FAMILYFE_PUBLIC_URL    (facultatif) lien FamiLyfe (partage du loyer, « Services DKP »)
 */

const clean = (v: string | undefined) => (v ?? "").trim().replace(/\/+$/, "");

export const DKP_DEFAULT_LINKS = {
  zemi: "https://bjdrive.dkpsolution.tech",
  afrochina: "https://afrochina.dkpsolution.tech",
  gestipro: "https://crm.dkpsolution.tech",
  familyfe: "https://familyfe.dkpsolution.tech",
} as const;

export function dkpEnv() {
  const e = process.env;
  return {
    hubUrl: clean(e.DKP_HUB_URL),
    publicUrl: clean(e.DKP_PUBLIC_URL),
    clientId: (e.DKP_CLIENT_ID ?? "").trim(),
    clientSecret: (e.DKP_CLIENT_SECRET ?? "").trim(),
    redirectUri: (e.DKP_REDIRECT_URI ?? "").trim(),
    zemiUrl: clean(e.ZEMI_PUBLIC_URL),
    afrochinaUrl: clean(e.AFROCHINA_PUBLIC_URL),
    afrochinaPath: (e.AFROCHINA_REQUEST_PATH ?? "").trim() || "/client/demandes/nouvelle",
    gestiproApi: clean(e.GESTIPRO_PARTNER_URL),
    gestiproPublic: clean(e.GESTIPRO_PUBLIC_URL),
    familyfeUrl: clean(e.FAMILYFE_PUBLIC_URL),
    loginFlag: (e.DKP_LOGIN ?? "").trim(),
    paymentsFlag: (e.DKP_PAYMENTS ?? "").trim(),
  };
}

/** Le hub est utilisable côté serveur (URL + identifiants). */
export function hubConfigured(): boolean {
  const c = dkpEnv();
  return !!(c.hubUrl && c.clientId && c.clientSecret);
}

/** « Continuer avec un compte DKP » : hub + URL publique du hub. */
export function dkpLoginEnabled(): boolean {
  const c = dkpEnv();
  return hubConfigured() && !!c.publicUrl && c.loginFlag !== "0";
}

/** Paiement en ligne de l'abonnement pro (KkiaPay via le hub). */
export function dkpPaymentsEnabled(): boolean {
  return hubConfigured() && dkpEnv().paymentsFlag !== "0";
}

/** Adresse de retour OAuth (doit être déclarée telle quelle sur le hub). */
export function dkpRedirectUri(): string {
  const c = dkpEnv();
  if (c.redirectUri) return c.redirectUri;
  const api = clean(process.env.PUBLIC_API_URL) || "http://localhost:4005/api";
  return `${api}/auth/dkp/callback`;
}

/** Clés partenaires « app:clé,app:clé » → Map(app → clé). Entrées mal formées ignorées. */
export function parsePartnerKeys(raw: string | undefined): Map<string, string> {
  const out = new Map<string, string>();
  for (const part of (raw ?? "").split(",")) {
    const i = part.indexOf(":");
    if (i <= 0) continue;
    const app = part.slice(0, i).trim().toLowerCase();
    const key = part.slice(i + 1).trim();
    if (app && key.length >= 16) out.set(app, key);
  }
  return out;
}
