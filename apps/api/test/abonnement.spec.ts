// Abonnement des professionnels : statut calculé, limites, rappels, période
// payée, numéro de facture, verrou d'écriture dans la matrice des permissions.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import {
  DEFAULT_SETTINGS,
  SubscriptionAgency,
  addMonths,
  coverageEnd,
  effectiveLimits,
  formatInvoiceNumber,
  graceEnd,
  mandateWriteGate,
  paymentPeriod,
  reminderFor,
  subscriptionStatus,
  withinLimit,
  writableMandateIds,
  AgencySubscription,
} from "../src/common/subscription";
import { ALL_ACTIONS, AccessContext, decideAccess } from "../src/common/property-access";
import { toErrorBody } from "../src/common/all-exceptions.filter";
import { ForbiddenException } from "@nestjs/common";

const T = (s: string) => new Date(s);
const NOW = T("2026-10-24T10:00:00.000Z");
const DAY = 24 * 3600 * 1000;
const at = (days: number) => new Date(NOW.getTime() + days * DAY);
const S = { ...DEFAULT_SETTINGS }; // essai 60 j, grâce 7 j, offre gratuite ACTIVÉE
const S_NO_FREE = { ...DEFAULT_SETTINGS, freePlanEnabled: false };

const ag = (over: Partial<SubscriptionAgency> = {}): SubscriptionAgency => ({
  trialEndsAt: null,
  paidUntil: null,
  manualSuspension: false,
  ...over,
});

// ─────────────────────────── Statut ───────────────────────────

test("statut : essai, payé, grâce, gratuit, suspendu (ordre de la spec)", () => {
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(30) }), NOW, S), "TRIAL");
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(-1), paidUntil: at(10) }), NOW, S), "ACTIVE");
  // Essai terminé il y a 2 jours : grâce (7 j)
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(-2) }), NOW, S), "GRACE");
  // Payé jusqu'à hier : grâce aussi
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(-90), paidUntil: at(-1) }), NOW, S), "GRACE");
  // Grâce écoulée : offre gratuite (activée par défaut)…
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(-10) }), NOW, S), "FREE");
  // …ou lecture seule si l'admin coupe l'offre gratuite
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(-10) }), NOW, S_NO_FREE), "SUSPENDED");
  // Aucun essai (déjà consommé) ni paiement : pas de grâce
  assert.equal(subscriptionStatus(ag(), NOW, S), "FREE");
  assert.equal(subscriptionStatus(ag(), NOW, S_NO_FREE), "SUSPENDED");
});

test("statut : la suspension manuelle prime sur tout (même payé, même en essai)", () => {
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(30), manualSuspension: true }), NOW, S), "SUSPENDED");
  assert.equal(subscriptionStatus(ag({ paidUntil: at(300), manualSuspension: true }), NOW, S), "SUSPENDED");
});

test("statut : bornes exactes (fin d'essai, fin de grâce, durée de grâce réglable)", () => {
  assert.equal(subscriptionStatus(ag({ trialEndsAt: NOW }), NOW, S), "GRACE"); // now < trialEndsAt faux
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(-7) }), NOW, S), "FREE"); // grâce : now < fin + 7 j faux
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(-7) }), NOW, { ...S, graceDays: 8 }), "GRACE");
  assert.equal(subscriptionStatus(ag({ trialEndsAt: at(-1) }), NOW, { ...S, graceDays: 0 }), "FREE");
  assert.equal(coverageEnd(ag({ trialEndsAt: at(5), paidUntil: at(40) }))?.getTime(), at(40).getTime());
  assert.equal(graceEnd(ag({ trialEndsAt: at(5) }), S)?.getTime(), at(12).getTime());
  assert.equal(graceEnd(ag(), S), null);
});

// ─────────────────────────── Limites ───────────────────────────

const SOLO = { maxAgents: 1, maxActiveMandates: 15 };
const FREE = { maxAgents: 1, maxActiveMandates: 2 };

test("limites : aucune pendant l'essai, offre payée ensuite, offre gratuite en FREE", () => {
  assert.deepEqual(effectiveLimits("TRIAL", ag(), SOLO, FREE), { maxAgents: null, maxActiveMandates: null, source: "TRIAL" });
  assert.deepEqual(effectiveLimits("ACTIVE", ag({ paidUntil: at(5) }), SOLO, FREE), { ...SOLO, source: "PLAN" });
  // Grâce après un paiement : limites de l'offre payée ; grâce après l'essai : aucune
  assert.equal(effectiveLimits("GRACE", ag({ paidUntil: at(-1) }), SOLO, FREE).maxActiveMandates, 15);
  assert.equal(effectiveLimits("GRACE", ag({ trialEndsAt: at(-1) }), SOLO, FREE).maxActiveMandates, null);
  assert.deepEqual(effectiveLimits("FREE", ag(), SOLO, FREE), { ...FREE, source: "FREE" });
  // Ligne FREE absente : repli 1 agent / 2 mandats
  assert.deepEqual(effectiveLimits("FREE", ag(), null, null), { maxAgents: 1, maxActiveMandates: 2, source: "FREE" });
  // Offre illimitée (RESEAU)
  assert.equal(effectiveLimits("ACTIVE", ag({ paidUntil: at(5) }), { maxAgents: null, maxActiveMandates: null }, FREE).maxAgents, null);
});

test("limites : on empêche d'ajouter, on ne retire rien", () => {
  assert.equal(withinLimit(null, 1000), true);
  assert.equal(withinLimit(2, 1), true);
  assert.equal(withinLimit(2, 2), false);
  assert.equal(withinLimit(2, 0, 3), false);
  assert.equal(withinLimit(5, 3, 2), true);
});

test("hors limite : seuls les N mandats actifs les plus anciens restent modifiables", () => {
  const ms = [
    { id: "c", createdAt: at(-1) },
    { id: "a", createdAt: at(-30) },
    { id: "b", createdAt: at(-10) },
    { id: "d", createdAt: at(-10) },
  ];
  assert.equal(writableMandateIds(ms, null), null);
  assert.deepEqual([...writableMandateIds(ms, 2)!].sort(), ["a", "b"]); // b < d à date égale (id)
  assert.equal(writableMandateIds(ms, 0)!.size, 0);
  const sub = (status: AgencySubscription["status"]) =>
    ({ status, writable: status !== "SUSPENDED" }) as AgencySubscription;
  const set = writableMandateIds(ms, 2);
  assert.equal(mandateWriteGate(sub("FREE"), set, "a"), null);
  assert.equal(mandateWriteGate(sub("FREE"), set, "c")?.code, "PLAN_LIMIT_MANDATES");
  assert.equal(mandateWriteGate(sub("SUSPENDED"), null, "a")?.code, "SUBSCRIPTION_SUSPENDED");
  assert.equal(mandateWriteGate(sub("TRIAL"), null, "c"), null);
});

// ─────────────────────────── Rappels ───────────────────────────

test("rappels : J-15, J-7, J-1, grâce, gratuit, suspension — clés distinctes et stables", () => {
  assert.equal(reminderFor(ag({ trialEndsAt: at(40) }), NOW, S), null);
  assert.equal(reminderFor(ag({ trialEndsAt: at(15) }), NOW, S)?.kind, "D15");
  assert.equal(reminderFor(ag({ trialEndsAt: at(8) }), NOW, S)?.kind, "D15");
  assert.equal(reminderFor(ag({ trialEndsAt: at(7) }), NOW, S)?.kind, "D7");
  assert.equal(reminderFor(ag({ trialEndsAt: at(0.5) }), NOW, S)?.kind, "D1");
  assert.equal(reminderFor(ag({ trialEndsAt: at(-1) }), NOW, S)?.kind, "GRACE");
  assert.equal(reminderFor(ag({ trialEndsAt: at(-10) }), NOW, S)?.kind, "FREE");
  assert.equal(reminderFor(ag({ trialEndsAt: at(-10) }), NOW, S_NO_FREE)?.kind, "SUSPENDED");
  assert.equal(reminderFor(ag({ manualSuspension: true }), NOW, S)?.key, "manual:SUSPENDED");
  // Même situation → même clé (idempotence) ; nouveau cycle après paiement → nouvelle clé
  const k1 = reminderFor(ag({ trialEndsAt: at(6) }), NOW, S)!.key;
  const k2 = reminderFor(ag({ trialEndsAt: at(6) }), new Date(NOW.getTime() + 3600_000), S)!.key;
  assert.equal(k1, k2);
  const k3 = reminderFor(ag({ trialEndsAt: at(6), paidUntil: at(13) }), NOW, S)!.key;
  assert.notEqual(k1, k3);
});

// ─────────────────────────── Paiement ───────────────────────────

test("période payée : depuis max(now, paidUntil, fin d'essai en cours)", () => {
  // Essai en cours : la période commence à la fin de l'essai
  const p1 = paymentPeriod(ag({ trialEndsAt: at(20) }), NOW, 1);
  assert.equal(p1.start.getTime(), at(20).getTime());
  // Encore payé : prolongation à partir de paidUntil
  const p2 = paymentPeriod(ag({ paidUntil: at(10) }), NOW, 3);
  assert.equal(p2.start.getTime(), at(10).getTime());
  // Grâce / gratuit : à partir de maintenant
  const p3 = paymentPeriod(ag({ trialEndsAt: at(-3), paidUntil: at(-40) }), NOW, 12);
  assert.equal(p3.start.getTime(), NOW.getTime());
  assert.equal(p3.end.toISOString(), "2027-10-24T10:00:00.000Z");
});

test("ajout de mois : fin de mois conservée, passage d'année", () => {
  assert.equal(addMonths(T("2026-01-31T00:00:00Z"), 1).toISOString(), "2026-02-28T00:00:00.000Z");
  assert.equal(addMonths(T("2026-11-15T12:00:00Z"), 3).toISOString(), "2027-02-15T12:00:00.000Z");
  assert.equal(addMonths(T("2028-01-31T00:00:00Z"), 1).toISOString(), "2028-02-29T00:00:00.000Z");
});

test("numéro de facture FAC-AAAA-NNNNN", () => {
  assert.equal(formatInvoiceNumber(2026, 1), "FAC-2026-00001");
  assert.equal(formatInvoiceNumber(2027, 12345), "FAC-2027-12345");
});

// ─────────────────────────── Permissions ───────────────────────────

const ctx = (gate: AccessContext["writeGate"], userId = "manager-1"): AccessContext => ({
  userId,
  property: { id: "p1", ownerId: "owner-1" },
  ownerActivated: false,
  membership: { agencyId: "ag-1", role: "MANAGER" },
  mandate: {
    id: "m1",
    reference: "MAN-2026-00001",
    type: "MANAGEMENT",
    status: "ACTIVE",
    agencyId: "ag-1",
    assignedAgentId: null,
    endDate: null,
    lettingCompletedAt: null,
  },
  today: T("2026-10-24T00:00:00Z"),
  writeGate: gate,
});

test("agence suspendue : le pro garde la lecture, toute écriture est refusée (402)", () => {
  const gate = { code: "SUBSCRIPTION_SUSPENDED", message: "lecture seule" };
  const allowed = ALL_ACTIONS.filter((a) => decideAccess(ctx(gate), a).allowed);
  assert.deepEqual(allowed.sort(), ["LEASE_READ", "READ"]);
  const d = decideAccess(ctx(gate), "RENTS");
  assert.equal(d.code, "SUBSCRIPTION_SUSPENDED");
  assert.equal(d.as, "PRO");
  // « Pour le compte de » (propriétaire non activé) : refusé aussi
  assert.equal(decideAccess(ctx(gate), "SIGN_LEASE").allowed, false);
  // Sans verrou : tout le périmètre habituel
  assert.equal(decideAccess(ctx(null), "RENTS").allowed, true);
  assert.equal(decideAccess(ctx(null), "SIGN_LEASE").onBehalf, true);
});

test("mandat hors limite : lecture seule avec PLAN_LIMIT_MANDATES", () => {
  const d = decideAccess(ctx({ code: "PLAN_LIMIT_MANDATES", message: "hors limite" }), "EDIT_LISTING");
  assert.equal(d.allowed, false);
  assert.equal(d.code, "PLAN_LIMIT_MANDATES");
  assert.equal(decideAccess(ctx({ code: "PLAN_LIMIT_MANDATES", message: "x" }), "READ").allowed, true);
});

test("le propriétaire n'est jamais bloqué par l'abonnement de son agence", () => {
  const gate = { code: "SUBSCRIPTION_SUSPENDED", message: "lecture seule" };
  for (const a of ALL_ACTIONS) assert.equal(decideAccess(ctx(gate, "owner-1"), a).allowed, true, a);
});

test("codes d'abonnement renvoyés en HTTP 402, même levés en 403", () => {
  const body = toErrorBody(new ForbiddenException({ statusCode: 403, code: "SUBSCRIPTION_SUSPENDED", message: "x" }));
  assert.equal(body.statusCode, 402);
  assert.equal(body.code, "SUBSCRIPTION_SUSPENDED");
  assert.equal(toErrorBody(new ForbiddenException({ statusCode: 403, code: "NOT_ASSIGNED", message: "x" })).statusCode, 403);
});
