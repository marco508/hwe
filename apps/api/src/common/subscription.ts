import { HttpException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

/**
 * ABONNEMENT DES PROFESSIONNELS — règles pures + chargement.
 *
 * C'est l'AGENCE qui paie, jamais le propriétaire ni le locataire. Le statut
 * n'est stocké nulle part : il se CALCULE à la volée à partir des dates de
 * l'agence et des paramètres plateforme (aucune tâche planifiée requise).
 *
 * Ordre de décision (`subscriptionStatus`) :
 *  1. suspension manuelle (admin) → SUSPENDED (prioritaire) ;
 *  2. now < trialEndsAt                        → TRIAL (aucune limite) ;
 *  3. paidUntil > now                          → ACTIVE (limites de l'offre payée) ;
 *  4. now < max(trialEndsAt, paidUntil) + grâce → GRACE ;
 *  5. offre gratuite activée                   → FREE (limites de l'offre FREE) ;
 *  6. sinon                                    → SUSPENDED (lecture seule).
 *
 * Lecture seule = SUSPENDED. Au-delà des limites (FREE ou offre payée), on
 * ne supprime rien : on empêche d'AJOUTER (agents, mandats), et seuls les N
 * mandats actifs les plus anciens (N = limite) restent modifiables ; les
 * autres passent en lecture seule (`writableMandateIds`).
 */

export type SubscriptionStatus = "TRIAL" | "ACTIVE" | "GRACE" | "FREE" | "SUSPENDED";

export interface SubscriptionAgency {
  trialEndsAt: Date | null;
  paidUntil: Date | null;
  manualSuspension: boolean;
}

export interface SubscriptionSettings {
  trialDays: number;
  graceDays: number;
  freePlanEnabled: boolean;
}

export const DEFAULT_SETTINGS: SubscriptionSettings = { trialDays: 60, graceDays: 7, freePlanEnabled: true };

export interface PlanLimits {
  maxAgents: number | null;
  maxActiveMandates: number | null;
}

/** Limites de repli de l'offre FREE si la ligne a disparu de la base. */
export const FREE_FALLBACK: PlanLimits = { maxAgents: 1, maxActiveMandates: 2 };
export const FREE_PLAN_CODE = "FREE";

const DAY_MS = 24 * 3600 * 1000;

/** Fin de la couverture : max(fin d'essai, fin payée) ; null si ni essai ni paiement. */
export function coverageEnd(a: SubscriptionAgency): Date | null {
  const t = a.trialEndsAt?.getTime() ?? null;
  const p = a.paidUntil?.getTime() ?? null;
  if (t === null && p === null) return null;
  return new Date(Math.max(t ?? -Infinity, p ?? -Infinity));
}

/** Fin de la grâce (null si aucune couverture). */
export function graceEnd(a: SubscriptionAgency, s: Pick<SubscriptionSettings, "graceDays">): Date | null {
  const end = coverageEnd(a);
  return end ? new Date(end.getTime() + Math.max(0, s.graceDays) * DAY_MS) : null;
}

/** RÈGLE PURE : statut d'abonnement d'une agence à l'instant `now`. */
export function subscriptionStatus(a: SubscriptionAgency, now: Date, s: SubscriptionSettings): SubscriptionStatus {
  if (a.manualSuspension) return "SUSPENDED";
  const t = now.getTime();
  if (a.trialEndsAt && t < a.trialEndsAt.getTime()) return "TRIAL";
  if (a.paidUntil && a.paidUntil.getTime() > t) return "ACTIVE";
  const g = graceEnd(a, s);
  if (g && t < g.getTime()) return "GRACE";
  if (s.freePlanEnabled) return "FREE";
  return "SUSPENDED";
}

export interface EffectiveLimits extends PlanLimits {
  /** D'où viennent les limites : essai (aucune), offre payée, offre gratuite. */
  source: "TRIAL" | "PLAN" | "FREE" | "NONE";
}

/**
 * RÈGLE PURE : limites applicables.
 *  - TRIAL : aucune ;
 *  - ACTIVE : offre payée (aucune si l'agence n'a pas d'offre) ;
 *  - GRACE : celles de l'offre payée si l'agence a déjà payé, sinon aucune
 *    (prolongation de l'essai) ;
 *  - FREE : offre gratuite ;
 *  - SUSPENDED : sans objet (tout ajout est refusé), on renvoie l'offre courante.
 */
export function effectiveLimits(
  status: SubscriptionStatus,
  agency: { paidUntil: Date | null },
  plan: PlanLimits | null,
  freePlan: PlanLimits | null,
): EffectiveLimits {
  const none: EffectiveLimits = { maxAgents: null, maxActiveMandates: null, source: "NONE" };
  switch (status) {
    case "TRIAL":
      return { ...none, source: "TRIAL" };
    case "ACTIVE":
      return plan ? { maxAgents: plan.maxAgents, maxActiveMandates: plan.maxActiveMandates, source: "PLAN" } : none;
    case "GRACE":
      return agency.paidUntil && plan
        ? { maxAgents: plan.maxAgents, maxActiveMandates: plan.maxActiveMandates, source: "PLAN" }
        : { ...none, source: "TRIAL" };
    case "FREE": {
      const f = freePlan ?? FREE_FALLBACK;
      return { maxAgents: f.maxAgents, maxActiveMandates: f.maxActiveMandates, source: "FREE" };
    }
    default:
      return plan ? { maxAgents: plan.maxAgents, maxActiveMandates: plan.maxActiveMandates, source: "PLAN" } : none;
  }
}

/** RÈGLE PURE : peut-on ajouter `n` éléments à `current` sous la limite `max` (null = illimité) ? */
export function withinLimit(max: number | null, current: number, n = 1): boolean {
  return max === null || current + n <= max;
}

/**
 * RÈGLE PURE : mandats actifs encore modifiables sous la limite — les N plus
 * anciens (createdAt puis id). `null` = tous (pas de limite).
 */
export function writableMandateIds(
  active: Array<{ id: string; createdAt: Date }>,
  max: number | null,
): Set<string> | null {
  if (max === null) return null;
  const sorted = [...active].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime() || a.id.localeCompare(b.id));
  return new Set(sorted.slice(0, Math.max(0, max)).map((m) => m.id));
}

/** Jours restants (arrondi au supérieur) avant `end`. */
export function daysLeft(end: Date, now: Date): number {
  return Math.ceil((end.getTime() - now.getTime()) / DAY_MS);
}

export type ReminderKind = "D15" | "D7" | "D1" | "GRACE" | "FREE" | "SUSPENDED";

/**
 * RÈGLE PURE : rappel dû à l'instant `now` (null : aucun). La clé inclut la
 * date de fin de couverture : après un paiement, un nouveau cycle de rappels
 * recommence. Un rappel n'est envoyé que si sa clé diffère de la dernière
 * envoyée (`Agency.lastReminderKey`) : idempotent.
 */
export function reminderFor(
  a: SubscriptionAgency,
  now: Date,
  s: SubscriptionSettings,
): { kind: ReminderKind; key: string; end: Date | null } | null {
  const status = subscriptionStatus(a, now, s);
  const end = coverageEnd(a);
  const tag = end ? end.toISOString().slice(0, 10) : "none";
  if (status === "SUSPENDED") {
    return { kind: "SUSPENDED", key: a.manualSuspension ? "manual:SUSPENDED" : `${tag}:SUSPENDED`, end };
  }
  if (status === "FREE") return { kind: "FREE", key: `${tag}:FREE`, end };
  if (status === "GRACE") return { kind: "GRACE", key: `${tag}:GRACE`, end };
  if (!end) return null;
  const d = daysLeft(end, now);
  const kind: ReminderKind | null = d <= 1 ? "D1" : d <= 7 ? "D7" : d <= 15 ? "D15" : null;
  return kind ? { kind, key: `${tag}:${kind}`, end } : null;
}

/** Ajoute `months` mois calendaires (UTC), en restant sur le dernier jour si besoin. */
export function addMonths(d: Date, months: number): Date {
  const r = new Date(d.getTime());
  const day = r.getUTCDate();
  r.setUTCDate(1);
  r.setUTCMonth(r.getUTCMonth() + months);
  const last = new Date(Date.UTC(r.getUTCFullYear(), r.getUTCMonth() + 1, 0)).getUTCDate();
  r.setUTCDate(Math.min(day, last));
  return r;
}

/**
 * RÈGLE PURE : période couverte par un paiement de `months` mois.
 * Début = max(now, paidUntil, trialEndsAt si l'essai est en cours).
 */
export function paymentPeriod(a: SubscriptionAgency, now: Date, months: number): { start: Date; end: Date } {
  let start = now.getTime();
  if (a.paidUntil) start = Math.max(start, a.paidUntil.getTime());
  if (a.trialEndsAt && a.trialEndsAt.getTime() > now.getTime()) start = Math.max(start, a.trialEndsAt.getTime());
  const s = new Date(start);
  return { start: s, end: addMonths(s, months) };
}

/** FAC-<année>-<n sur 5 chiffres>. */
export function formatInvoiceNumber(year: number, n: number): string {
  return `FAC-${year}-${String(n).padStart(5, "0")}`;
}

// ─────────────────────────── Erreurs ───────────────────────────

/**
 * Codes « abonnement » : HTTP 402 (Payment Required). Le client partagé
 * (@hwe/ui) ne traite spécialement que 401 et 403 EMAIL_NOT_VERIFIED, donc
 * 402 ne pose aucun problème ; le filtre d'exceptions force 402 pour ces
 * codes même s'ils sont levés via une ForbiddenException (refus d'accès
 * normalisé de PropertyAccessService).
 */
export const SUBSCRIPTION_CODES = new Set(["SUBSCRIPTION_SUSPENDED", "PLAN_LIMIT_AGENTS", "PLAN_LIMIT_MANDATES"]);

export const SUSPENDED_MESSAGE =
  "Abonnement de l'agence suspendu : compte en lecture seule. Réglez votre abonnement pour agir à nouveau.";
export const MANDATE_OVER_LIMIT_MESSAGE =
  "Ce mandat dépasse la limite de votre offre : il reste consultable mais n'est plus modifiable. Passez à une offre supérieure.";

export function subscriptionError(code: "SUBSCRIPTION_SUSPENDED" | "PLAN_LIMIT_AGENTS" | "PLAN_LIMIT_MANDATES", message?: string) {
  const defaults = {
    SUBSCRIPTION_SUSPENDED: SUSPENDED_MESSAGE,
    PLAN_LIMIT_AGENTS: "Limite d'agents de votre offre atteinte : passez à une offre supérieure pour inviter un agent.",
    PLAN_LIMIT_MANDATES: "Limite de mandats actifs de votre offre atteinte : passez à une offre supérieure.",
  } as const;
  return new HttpException({ statusCode: 402, code, message: message ?? defaults[code] }, 402);
}

// ─────────────────────────── Chargement ───────────────────────────

type Db = Pick<Prisma.TransactionClient, "agency" | "plan" | "platformSettings" | "mandate">;

let settingsCache: { at: number; settings: SubscriptionSettings; free: PlanLimits | null } | null = null;
const CACHE_MS = 10_000;

/** À appeler après toute modification des paramètres ou des offres. */
export function invalidateSubscriptionCache() {
  settingsCache = null;
}

/** Paramètres plateforme + limites FREE (cache court, invalidé par l'admin). */
export async function loadSettings(db: Db): Promise<{ settings: SubscriptionSettings; free: PlanLimits | null }> {
  if (settingsCache && Date.now() - settingsCache.at < CACHE_MS) return settingsCache;
  const [row, free] = await Promise.all([
    db.platformSettings.findUnique({ where: { id: 1 } }),
    db.plan.findUnique({ where: { code: FREE_PLAN_CODE }, select: { maxAgents: true, maxActiveMandates: true } }),
  ]);
  const settings: SubscriptionSettings = row
    ? { trialDays: row.trialDays, graceDays: row.graceDays, freePlanEnabled: row.freePlanEnabled }
    : DEFAULT_SETTINGS;
  settingsCache = { at: Date.now(), settings, free: free ?? null };
  return settingsCache;
}

export interface AgencySubscription {
  agencyId: string;
  status: SubscriptionStatus;
  /** Écritures permises (tout sauf SUSPENDED). */
  writable: boolean;
  limits: EffectiveLimits;
  settings: SubscriptionSettings;
  trialEndsAt: Date | null;
  paidUntil: Date | null;
  manualSuspension: boolean;
  coverageEnd: Date | null;
  graceEndsAt: Date | null;
  plan: { id: string; code: string; name: string; maxAgents: number | null; maxActiveMandates: number | null } | null;
}

/** Statut et limites d'une agence (2 à 3 requêtes, paramètres en cache). */
export async function loadAgencySubscription(db: Db, agencyId: string, now = new Date()): Promise<AgencySubscription> {
  const [{ settings, free }, a] = await Promise.all([
    loadSettings(db),
    db.agency.findUniqueOrThrow({
      where: { id: agencyId },
      select: {
        trialEndsAt: true,
        paidUntil: true,
        manualSuspension: true,
        plan: { select: { id: true, code: true, name: true, maxAgents: true, maxActiveMandates: true } },
      },
    }),
  ]);
  const status = subscriptionStatus(a, now, settings);
  return {
    agencyId,
    status,
    writable: status !== "SUSPENDED",
    limits: effectiveLimits(status, a, a.plan, free),
    settings,
    trialEndsAt: a.trialEndsAt,
    paidUntil: a.paidUntil,
    manualSuspension: a.manualSuspension,
    coverageEnd: coverageEnd(a),
    graceEndsAt: graceEnd(a, settings),
    plan: a.plan,
  };
}

/** Mandats actifs modifiables de l'agence sous sa limite (null = tous). */
export async function loadWritableMandates(db: Db, sub: AgencySubscription): Promise<Set<string> | null> {
  if (sub.limits.maxActiveMandates === null) return null;
  const active = await db.mandate.findMany({
    where: { agencyId: sub.agencyId, status: "ACTIVE" },
    select: { id: true, createdAt: true },
  });
  return writableMandateIds(active, sub.limits.maxActiveMandates);
}

/**
 * Verrou d'écriture d'un pro sur un mandat : null si permis, sinon le refus
 * (agence suspendue, ou mandat au-delà de la limite de l'offre).
 */
export function mandateWriteGate(
  sub: AgencySubscription,
  writable: Set<string> | null,
  mandateId: string,
): { code: "SUBSCRIPTION_SUSPENDED" | "PLAN_LIMIT_MANDATES"; message: string } | null {
  if (!sub.writable) return { code: "SUBSCRIPTION_SUSPENDED", message: SUSPENDED_MESSAGE };
  if (writable && !writable.has(mandateId)) return { code: "PLAN_LIMIT_MANDATES", message: MANDATE_OVER_LIMIT_MESSAGE };
  return null;
}

/** Lève 402 SUBSCRIPTION_SUSPENDED si l'agence est en lecture seule. */
export async function assertAgencyWritable(db: Db, agencyId: string): Promise<AgencySubscription> {
  const sub = await loadAgencySubscription(db, agencyId);
  if (!sub.writable) throw subscriptionError("SUBSCRIPTION_SUSPENDED");
  return sub;
}

/** Ajout de `n` mandats ouverts (ACTIVE + en attente) : 402 si suspendu ou au-delà de la limite. */
export async function assertCanAddMandates(db: Db, agencyId: string, n = 1): Promise<void> {
  const sub = await assertAgencyWritable(db, agencyId);
  const max = sub.limits.maxActiveMandates;
  if (max === null) return;
  const open = await db.mandate.count({ where: { agencyId, status: { in: ["ACTIVE", "PENDING_OWNER"] } } });
  if (!withinLimit(max, open, n)) {
    throw subscriptionError(
      "PLAN_LIMIT_MANDATES",
      `Votre offre permet ${max} mandat(s) actif(s) (${open} en cours ou en attente) : passez à une offre supérieure pour en ajouter.`,
    );
  }
}

/**
 * Ajout d'un agent : 402 si suspendu ou au-delà de la limite. Compte les
 * membres + les invitations encore en attente (`countPendingInvites`), pour
 * qu'une invitation acceptée plus tard ne dépasse pas la limite.
 */
export async function assertCanAddAgent(
  db: Db & Pick<Prisma.TransactionClient, "agencyMember" | "agencyInvite">,
  agencyId: string,
  opts: { countPendingInvites: boolean },
): Promise<void> {
  const sub = await assertAgencyWritable(db, agencyId);
  const max = sub.limits.maxAgents;
  if (max === null) return;
  const [members, invites] = await Promise.all([
    db.agencyMember.count({ where: { agencyId } }),
    opts.countPendingInvites
      ? db.agencyInvite.count({ where: { agencyId, acceptedAt: null, expiresAt: { gt: new Date() } } })
      : Promise.resolve(0),
  ]);
  if (!withinLimit(max, members + invites, 1)) {
    throw subscriptionError(
      "PLAN_LIMIT_AGENTS",
      invites
        ? `Votre offre permet ${max} membre(s) dans l'agence (${members} membre(s), ${invites} invitation(s) en attente) : passez à une offre supérieure pour en ajouter.`
        : `Votre offre permet ${max} membre(s) dans l'agence (${members} membre(s)) : passez à une offre supérieure pour en ajouter.`,
    );
  }
}
