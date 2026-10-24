// Réglages de l'abonnement (PlatformSettings, offre FREE, prix) : source
// unique = la base. GET /plans public, e-mails de rappel mis en mots dans la
// langue du destinataire (durée de grâce, limites, suite sans paiement).
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import { platformPhrases } from "../src/i18n/i18n";
import * as mail from "../src/mail/templates";
import { SubscriptionsService } from "../src/subscriptions/subscriptions.service";
import { invalidateSubscriptionCache } from "../src/common/subscription";

test("réglages mis en mots : pluriels de chaque langue, null = illimité", () => {
  assert.deepEqual(platformPhrases("fr", { graceDays: 1, freeAgents: 1, freeMandates: 2 }), {
    graceDays: "1 jour",
    freeAgents: "1 agent",
    freeMandates: "2 mandats actifs",
  });
  assert.deepEqual(platformPhrases("en", { graceDays: 10, freeAgents: null, freeMandates: 1 }), {
    graceDays: "10 days",
    freeAgents: "unlimited agents",
    freeMandates: "1 active mandate",
  });
  const ar = platformPhrases("ar", { graceDays: 2, freeAgents: 2, freeMandates: 11 });
  assert.equal(ar.graceDays, "يومين");
  assert.equal(ar.freeAgents, "وكيلين");
  assert.equal(ar.freeMandates, "11 تفويضًا نشطًا");
});

test("e-mails d'abonnement : valeurs injectées, variante sans offre gratuite et sans grâce", () => {
  const ro = mail.notice("fr", {
    name: "Awa",
    base: "sub.reminderDays",
    params: { agency: "Immo", n: 7, end: new Date("2026-11-05T10:00:00Z"), graceDays: 0, freeAgents: 3, freeMandates: 9, afterKind: "SUSPENDED_NOGRACE" },
    url: "u",
  });
  assert.match(ro.text, /se termine le 05\/11\/2026\. Sans paiement, le compte passera alors en lecture seule\./);
  assert.doesNotMatch(ro.text, /gratuite|\{/);
  const free = mail.notice("es", { name: "Ana", base: "sub.free", params: { agency: "Immo", graceDays: 5, freeAgents: 3, freeMandates: null }, url: "u" });
  assert.match(free.text, /limitado a 3 agentes y mandatos activos ilimitados\./);
  const grace = mail.notice("en", {
    name: "Ann",
    base: "sub.grace",
    params: { agency: "Immo", end: new Date("2026-11-05T10:00:00Z"), graceEnd: new Date("2026-11-15T10:00:00Z"), graceDays: 10, freeAgents: 1, freeMandates: 4, afterKind: "FREE_AFTERGRACE" },
    url: "u",
  });
  assert.match(grace.text, /before 15\/11\/2026 to keep every feature\. After that, the agency moves to the free plan, limited to 1 agent and 4 active mandates\./);
});

test("GET /plans : réglages lus en base (essai, grâce, offre gratuite, prix minimum)", async () => {
  invalidateSubscriptionCache();
  const plan = (code: string, price: number, extra: Record<string, unknown> = {}) => ({
    id: code,
    code,
    name: code,
    monthlyPrice: price,
    currency: "EUR",
    maxAgents: 1,
    maxActiveMandates: 2,
    active: true,
    position: 0,
    prices: [{ currency: "EUR", monthlyPrice: price }],
    ...extra,
  });
  const prisma = {
    platformSettings: { findUnique: async () => ({ trialDays: 45, graceDays: 3, freePlanEnabled: false }) },
    plan: {
      findUnique: async () => ({ maxAgents: 2, maxActiveMandates: 5 }),
      findMany: async () => [plan("FREE", 0), plan("SOLO", 25, { prices: [{ currency: "EUR", monthlyPrice: 25 }, { currency: "XOF", monthlyPrice: 15000 }] }), plan("AGENCE", 49)],
    },
  };
  const svc = new SubscriptionsService(prisma as never, {} as never, {} as never);
  const r = await svc.publicPlans();
  invalidateSubscriptionCache();
  assert.equal(r.trialDays, 45);
  assert.equal(r.graceDays, 3);
  assert.equal(r.freePlanEnabled, false);
  assert.deepEqual(r.freeLimits, { maxAgents: 2, maxActiveMandates: 5 });
  assert.deepEqual(r.minPrice, { currency: "EUR", monthlyPrice: 25 });
  assert.equal(r.freePlan, null);
  assert.deepEqual(r.plans.map((p) => p.code), ["SOLO", "AGENCE"]);
});
