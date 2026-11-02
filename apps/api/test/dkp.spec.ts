// Écosystème DKP : Compte DKP (rattachement), cookie d'état, clés partenaires,
// codes de partage du loyer (expiration, révocation), paiement en ligne
// vérifié par le hub (simulé), e-mails par le hub, factures GestiPro.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import { HttpException } from "@nestjs/common";
import {
  DkpUserRow,
  DkpUserStore,
  defaultRoleFor,
  readState,
  resolveDkpUser,
  safeInternalPath,
  signState,
} from "../src/dkp/dkp-auth";
import { parsePartnerKeys } from "../src/dkp/dkp-env";
import { checkPartner, hashShareCode, newShareCode, normalizeShareCode, shareState } from "../src/dkp/rent-share";
import { RentShareService } from "../src/dkp/rent-share.controller";
import { setHubFetch } from "../src/dkp/hub";
import { xofAmount } from "../src/subscriptions/online";
import { SubscriptionsService } from "../src/subscriptions/subscriptions.service";
import { MailerService } from "../src/mail/mailer.service";
import { buildGestiproInvoices, isGestiproKey, maskKey } from "../src/dkp/gestipro";
import { GestiproService, setGestiproFetch } from "../src/dkp/gestipro.controller";
import { DkpConfigController } from "../src/dkp/dkp-auth.controller";

const HUB_ENV = {
  DKP_HUB_URL: "http://hub.test:3020",
  DKP_PUBLIC_URL: "https://compte.test",
  DKP_CLIENT_ID: "hwe",
  DKP_CLIENT_SECRET: "secret-de-test-0123456789",
};
const DKP_VARS = [
  ...Object.keys(HUB_ENV), "DKP_LOGIN", "DKP_PAYMENTS", "DKP_PARTNER_KEYS", "ZEMI_PUBLIC_URL",
  "AFROCHINA_PUBLIC_URL", "GESTIPRO_PARTNER_URL", "FAMILYFE_PUBLIC_URL", "SMTP_HOST",
];
function withEnv<T>(env: Record<string, string>, fn: () => Promise<T> | T): Promise<T> {
  const saved = Object.fromEntries(DKP_VARS.map((k) => [k, process.env[k]]));
  for (const k of DKP_VARS) delete process.env[k];
  Object.assign(process.env, env);
  return Promise.resolve()
    .then(fn)
    .finally(() => {
      for (const k of DKP_VARS) {
        if (saved[k] === undefined) delete process.env[k];
        else process.env[k] = saved[k];
      }
    });
}

async function httpStatus(p: Promise<unknown>): Promise<{ status: number; code?: string }> {
  try {
    await p;
  } catch (e) {
    assert.ok(e instanceof HttpException, `HttpException attendue, reçu ${String(e)}`);
    const r = e.getResponse() as { code?: string };
    return { status: e.getStatus(), code: typeof r === "object" ? r.code : undefined };
  }
  assert.fail("erreur HTTP attendue");
}

// ─────────────────────────── Compte DKP : rattachement ───────────────────────────

function memoryStore(rows: DkpUserRow[]) {
  const calls = { link: 0, create: 0 };
  const store: DkpUserStore = {
    findBySub: async (sub) => rows.find((r) => r.dkpSub === sub) ?? null,
    findByEmail: async (email) => rows.find((r) => r.email === email) ?? null,
    link: async (id, data) => {
      calls.link++;
      const r = rows.find((x) => x.id === id)!;
      Object.assign(r, data);
      return r;
    },
    create: async (data) => {
      calls.create++;
      const r: DkpUserRow = { id: `u${rows.length + 1}`, email: data.email, role: data.role, dkpSub: data.dkpSub, emailVerifiedAt: data.emailVerifiedAt, activatedAt: new Date() };
      rows.push(r);
      return r;
    },
  };
  return { store, calls, rows };
}
const row = (over: Partial<DkpUserRow>): DkpUserRow => ({
  id: "u1", email: "awa@example.com", role: "TENANT", dkpSub: null, emailVerifiedAt: new Date(), activatedAt: new Date(), ...over,
});
const claims = (over: Record<string, unknown> = {}) => ({ sub: "dkp-1", email: "Awa@Example.com", email_verified: true, name: "Awa Kossou", phone: "+22990000000", ...over }) as any;

test("Compte DKP : compte déjà lié retrouvé par dkpSub (même si l'e-mail a changé)", async () => {
  const m = memoryStore([row({ dkpSub: "dkp-1", email: "ancienne@example.com" })]);
  const r = await resolveDkpUser(m.store, claims(), "tenant");
  assert.ok(!("error" in r));
  assert.equal(r.user.id, "u1");
  assert.equal(r.created, false);
  assert.equal(m.calls.link + m.calls.create, 0);
});

test("Compte DKP : e-mail VÉRIFIÉ par le hub → compte existant lié (e-mail normalisé)", async () => {
  const m = memoryStore([row({ emailVerifiedAt: null })]);
  const r = await resolveDkpUser(m.store, claims(), "owner");
  assert.ok(!("error" in r));
  assert.equal(r.linked, true);
  assert.equal(r.user.dkpSub, "dkp-1");
  assert.ok(r.user.emailVerifiedAt, "l'e-mail prouvé par le hub vaut vérification");
  assert.equal(r.user.role, "TENANT", "le rôle existant n'est jamais modifié");
});

test("Compte DKP : e-mail NON vérifié → aucun rattachement au compte existant", async () => {
  const m = memoryStore([row({})]);
  const r = await resolveDkpUser(m.store, claims({ email_verified: false }), "tenant");
  assert.deepEqual(r, { error: "email_unverified" });
  assert.equal(m.calls.link, 0);
  assert.equal(m.calls.create, 0);
  assert.equal(m.rows[0]!.dkpSub, null);
});

test("Compte DKP : nouveau compte = rôle public de l'espace (jamais AGENT ni ADMIN)", async () => {
  const a = memoryStore([]);
  const ro = await resolveDkpUser(a.store, claims(), "owner");
  assert.ok(!("error" in ro));
  assert.equal(ro.user.role, "OWNER");
  assert.equal(ro.created, true);
  const b = memoryStore([]);
  const rt = await resolveDkpUser(b.store, claims({ sub: "dkp-2", email: "b@example.com" }), "tenant");
  assert.ok(!("error" in rt));
  assert.equal(rt.user.role, "TENANT");
  assert.deepEqual([defaultRoleFor("owner"), defaultRoleFor("tenant")], ["OWNER", "TENANT"]);
  // Nouveau compte avec e-mail non vérifié par le hub : créé, mais non vérifié.
  const c = memoryStore([]);
  const ru = await resolveDkpUser(c.store, claims({ sub: "dkp-3", email: "c@example.com", email_verified: false }), "tenant");
  assert.ok(!("error" in ru));
  assert.equal(ru.user.emailVerifiedAt, null);
});

test("Compte DKP : admin refusé, compte lié à un autre sub refusé, invité activé", async () => {
  assert.deepEqual(await resolveDkpUser(memoryStore([row({ role: "ADMIN" })]).store, claims(), "owner"), { error: "admin" });
  assert.deepEqual(await resolveDkpUser(memoryStore([row({ role: "ADMIN", dkpSub: "dkp-1" })]).store, claims(), "owner"), { error: "admin" });
  assert.deepEqual(await resolveDkpUser(memoryStore([row({ dkpSub: "autre" })]).store, claims(), "owner"), { error: "conflict" });
  const inv = memoryStore([row({ role: "OWNER", activatedAt: null, emailVerifiedAt: null })]);
  const r = await resolveDkpUser(inv.store, claims(), "owner");
  assert.ok(!("error" in r));
  assert.ok(r.user.activatedAt, "propriétaire invité activé (e-mail prouvé, comme « mot de passe oublié »)");
  assert.deepEqual(await resolveDkpUser(memoryStore([]).store, claims({ sub: "" }), "owner"), { error: "invalid" });
});

test("Compte DKP : cookie d'état signé, falsifié, expiré ; chemin de retour interne seulement", () => {
  const secret = "secret-de-test-0123456789";
  const st = { s: "state1", v: "verifier1", sp: "owner" as const, n: "/pro", e: Date.now() + 60_000 };
  const raw = signState(st, secret);
  assert.deepEqual(readState(raw, secret), st);
  assert.equal(readState(raw, "autre-secret-0123456789"), null);
  const [data, sig] = raw.split(".");
  const forged = Buffer.from(JSON.stringify({ ...st, sp: "tenant" })).toString("base64url");
  assert.equal(readState(`${forged}.${sig}`, secret), null);
  assert.equal(readState(`${data}.x${sig!.slice(1)}`, secret), null);
  assert.equal(readState(signState({ ...st, e: Date.now() - 1 }, secret), secret), null);
  assert.equal(safeInternalPath("//evil.example"), "");
  assert.equal(safeInternalPath("https://evil.example"), "");
  assert.equal(safeInternalPath("/login?next=/x"), "");
  assert.equal(safeInternalPath("/dashboard/bien?id=1"), "/dashboard/bien?id=1");
});

// ─────────────────────────── Clés partenaires ───────────────────────────

test("partenaires : clé FamiLyfe exigée (Bearer + X-DKP-Partner), comparaison stricte", () => {
  const keys = "familyfe:cle-familyfe-0123456789,zemi:cle-zemi-0123456789,bad,court:x";
  assert.deepEqual([...parsePartnerKeys(keys).keys()], ["familyfe", "zemi"]);
  const h = (auth?: string, app?: string) => ({ authorization: auth, "x-dkp-partner": app });
  assert.equal(checkPartner(h("Bearer cle-familyfe-0123456789", "familyfe"), "familyfe", keys), "familyfe");
  assert.equal(checkPartner(h("Bearer cle-familyfe-0123456780", "familyfe"), "familyfe", keys), null);
  assert.equal(checkPartner(h("Bearer cle-zemi-0123456789", "zemi"), "familyfe", keys), null, "autre app");
  assert.equal(checkPartner(h("Bearer cle-zemi-0123456789", "familyfe"), "familyfe", keys), null, "clé d'une autre app");
  assert.equal(checkPartner(h("cle-familyfe-0123456789", "familyfe"), "familyfe", keys), null, "sans Bearer");
  assert.equal(checkPartner(h("Bearer cle-familyfe-0123456789", undefined), "familyfe", keys), null);
  assert.equal(checkPartner(h("Bearer cle-familyfe-0123456789", "familyfe"), "familyfe", ""), null, "aucune clé configurée");
});

// ─────────────────────────── Partage du loyer ───────────────────────────

function fakeRentPrisma() {
  const lease = {
    id: "L1", status: "ACTIVE", shortStay: false, monthlyRent: 150000, charges: 10000, currency: "XOF", rentPaymentDay: 5,
    tenantEmail: "awa@example.com", propertyId: "P1",
    property: { id: "P1", ownerId: "OWN", title: "Villa Akpakpa", status: "RENTED", addressLine: "Rue 12", city: "Cotonou", country: "BJ", owner: {} },
    inquiry: null, coTenants: [],
  };
  const users: Record<string, any> = {
    T: { id: "T", email: "awa@example.com", emailVerifiedAt: new Date() },
    OWN: { id: "OWN", email: "proprio@example.com", emailVerifiedAt: new Date() },
  };
  const codes: any[] = [];
  const prisma: any = {
    leaseContract: { findUnique: async () => lease },
    user: { findUnique: async ({ where }: any) => users[where.id] ?? null },
    rentShareCode: {
      count: async ({ where }: any) => codes.filter((c) => c.leaseId === where.leaseId && !c.revokedAt && c.expiresAt > where.expiresAt.gt).length,
      create: async ({ data }: any) => {
        const r = { id: `S${codes.length + 1}`, revokedAt: null, lastUsedAt: null, useCount: 0, createdAt: new Date(), ...data };
        codes.push(r);
        return r;
      },
      findMany: async () => codes,
      findUnique: async ({ where, include }: any) => {
        const r = codes.find((c) => (where.id ? c.id === where.id : c.codeHash === where.codeHash));
        return r ? (include ? { ...r, lease } : r) : null;
      },
      update: async ({ where, data }: any) => {
        const r = codes.find((c) => c.id === where.id);
        for (const [k, v] of Object.entries(data)) r[k] = (v as any)?.increment ? r[k] + (v as any).increment : v;
        return r;
      },
    },
  };
  return { prisma, lease, codes };
}

test("partage du loyer : code créé par le locataire (30 j), lu par le partenaire, champs du contrat", async () => {
  const f = fakeRentPrisma();
  const svc = new RentShareService(f.prisma);
  const created = await svc.create("L1", { sub: "T", email: "awa@example.com", role: "TENANT" } as any);
  assert.match(created.code, /^HWE-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  const days = (created.expiresAt.getTime() - Date.now()) / 86_400_000;
  assert.ok(days > 29.9 && days <= 30, "valable 30 jours");
  assert.equal(f.codes[0].codeHash, hashShareCode(created.code), "seule l'empreinte est gardée");
  assert.ok(!("code" in f.codes[0]));
  const got = await svc.partnerRead(created.code.toLowerCase());
  assert.deepEqual(Object.keys(got).sort(), ["adresse", "charges", "devise", "expireLe", "jourEcheance", "logement", "loyer", "periode"]);
  assert.equal(got.loyer, 150000);
  assert.equal(got.devise, "XOF");
  assert.equal(got.jourEcheance, 5);
  assert.match(got.periode, /^\d{4}-\d{2}$/);
  assert.equal(f.codes[0].useCount, 1);
  // Le propriétaire n'est pas le locataire : pas de code.
  assert.equal((await httpStatus(svc.create("L1", { sub: "OWN" } as any))).status, 403);
});

test("partage du loyer : code expiré ou révoqué → 404 ; bail terminé → 404", async () => {
  const f = fakeRentPrisma();
  const svc = new RentShareService(f.prisma);
  const a = await svc.create("L1", { sub: "T" } as any);
  const b = await svc.create("L1", { sub: "T" } as any);
  f.codes[0].expiresAt = new Date(Date.now() - 1000);
  assert.equal(shareState(f.codes[0]), "EXPIRED");
  assert.equal((await httpStatus(svc.partnerRead(a.code))).status, 404);
  const revoked = await svc.revoke("L1", b.id, { sub: "T" } as any);
  assert.equal(revoked.state, "REVOKED");
  assert.equal((await httpStatus(svc.partnerRead(b.code))).status, 404);
  const c = await svc.create("L1", { sub: "T" } as any);
  f.lease.status = "TERMINATED";
  assert.equal((await httpStatus(svc.partnerRead(c.code))).status, 404);
  assert.equal((await httpStatus(svc.partnerRead("n'importe quoi"))).status, 404);
  assert.equal(normalizeShareCode(" hwe-abcd-efgh-jkmn "), "HWE-ABCD-EFGH-JKMN");
  assert.notEqual(newShareCode(), newShareCode());
});

test("partage du loyer : au plus 5 codes actifs par bail", async () => {
  const f = fakeRentPrisma();
  const svc = new RentShareService(f.prisma);
  for (let i = 0; i < 5; i++) await svc.create("L1", { sub: "T" } as any);
  assert.equal((await httpStatus(svc.create("L1", { sub: "T" } as any))).status, 409);
});

// ─────────────────────────── Paiement en ligne de l'abonnement ───────────────────────────

test("paiement en ligne : montant XOF (prix XOF exact, sinon conversion arrondie au-dessus)", async () => {
  const conv = async (a: number, f: string, t: string) => (f === "EUR" && t === "XOF" ? a * 655.957 : null);
  const plan = (prices: Array<{ currency: string; monthlyPrice: number }>) => ({ currency: "EUR", monthlyPrice: 19, prices }) as any;
  assert.equal(await xofAmount(plan([{ currency: "EUR", monthlyPrice: 19 }, { currency: "XOF", monthlyPrice: 12500 }]), 3, conv), 37500);
  assert.equal(await xofAmount(plan([{ currency: "EUR", monthlyPrice: 19 }]), 1, conv), Math.ceil(19 * 655.957));
  assert.equal(await xofAmount(plan([{ currency: "USD", monthlyPrice: 20 }]), 1, async () => null), null);
});

function fakeSubs(online: any) {
  const recorded: any[] = [];
  const prisma: any = {
    agencyMember: { findUnique: async () => ({ agencyId: "A1", role: "MANAGER", userId: "M" }) },
    onlineSubscriptionPayment: {
      findUnique: async ({ where }: any) => (where.reference === online.reference ? online : null),
      findUniqueOrThrow: async () => online,
      updateMany: async ({ where, data }: any) => {
        if (online.status !== where.status) return { count: 0 };
        Object.assign(online, data);
        return { count: 1 };
      },
      update: async ({ data }: any) => Object.assign(online, data),
    },
    plan: { findUniqueOrThrow: async () => ({ id: "PL", code: "PRO", name: "Pro", monthlyPrice: 49, currency: "EUR" }) },
    agencyPayment: { findUniqueOrThrow: async () => ({ id: "PAY1", agencyId: "A1", number: "FAC-2026-1", months: 1, periodEnd: new Date(), plan: { name: "Pro", code: "PRO" } }) },
    $transaction: async (fn: any) => fn(prisma),
  };
  const svc = new SubscriptionsService(prisma, {} as any, {} as any) as any;
  svc.recordPayment = async (...args: any[]) => {
    recorded.push(args);
    return { id: "PAY1" };
  };
  svc.summary = async () => ({ status: "ACTIVE" });
  svc.notifyManagers = async () => {};
  return { svc, recorded };
}

test("paiement en ligne : transaction vérifiée par le hub (montant attendu + référence) → abonnement prolongé", async () => {
  await withEnv(HUB_ENV, async () => {
    const online = { id: "O1", reference: "HWE-SUB-0123456789ABCDEF01", agencyId: "A1", planId: "PL", months: 3, amount: 96000, status: "PENDING", paymentId: null };
    const { svc, recorded } = fakeSubs(online);
    const sent: any[] = [];
    setHubFetch(async (url, init) => {
      sent.push({ url, auth: (init?.headers as any).authorization, body: JSON.parse(String(init?.body)) });
      return new Response(JSON.stringify({ ok: true, status: "SUCCESS", amount: 96000 }), { status: 200 });
    });
    try {
      const r = await svc.onlineConfirm("M", { reference: online.reference, transactionId: "tx-42" });
      assert.equal(r.status, "PAID");
      assert.equal(sent[0].url, "http://hub.test:3020/hub/v1/paiements/verifier");
      assert.deepEqual(sent[0].body, { transactionId: "tx-42", amount: 96000, reference: online.reference });
      assert.equal(sent[0].auth, `Basic ${Buffer.from("hwe:secret-de-test-0123456789").toString("base64")}`);
      assert.equal(recorded.length, 1);
      const [, agencyId, plan, months, method, reference, by, requestId, amount] = recorded[0];
      assert.deepEqual([agencyId, plan.currency, months, method, reference, by, requestId, Number(amount)], ["A1", "XOF", 3, "KKIAPAY", "tx-42", "M", null, 96000]);
      assert.equal(online.status, "PAID");
      assert.equal(online.paymentId, "PAY1");
      // Rejeu : idempotent, aucun second paiement.
      await svc.onlineConfirm("M", { reference: online.reference, transactionId: "tx-42" });
      assert.equal(recorded.length, 1);
      assert.equal(sent.length, 1);
    } finally {
      setHubFetch(null);
    }
  });
});

test("paiement en ligne : montant insuffisant ou transaction déjà utilisée → refus, rien n'est prolongé", async () => {
  await withEnv(HUB_ENV, async () => {
    for (const status of ["AMOUNT_MISMATCH", "ALREADY_USED", "FAILED"]) {
      const online = { id: "O1", reference: "HWE-SUB-0123456789ABCDEF01", agencyId: "A1", planId: "PL", months: 1, amount: 32000, status: "PENDING", paymentId: null };
      const { svc, recorded } = fakeSubs(online);
      setHubFetch(async () => new Response(JSON.stringify({ ok: false, status }), { status: 200 }));
      try {
        assert.equal((await httpStatus(svc.onlineConfirm("M", { reference: online.reference, transactionId: "tx" }))).status, 409);
        assert.equal(recorded.length, 0);
        assert.equal(online.status, "FAILED");
      } finally {
        setHubFetch(null);
      }
    }
    // Hub injoignable : le paiement reste en attente (nouvel essai possible).
    const online = { id: "O1", reference: "HWE-SUB-0123456789ABCDEF01", agencyId: "A1", planId: "PL", months: 1, amount: 32000, status: "PENDING", paymentId: null };
    const { svc, recorded } = fakeSubs(online);
    setHubFetch(async () => {
      throw new Error("ECONNREFUSED");
    });
    try {
      assert.equal((await httpStatus(svc.onlineConfirm("M", { reference: online.reference, transactionId: "tx" }))).status, 400);
      assert.equal(online.status, "PENDING");
      assert.equal(recorded.length, 0);
      // Référence d'une autre agence : introuvable.
      assert.equal((await httpStatus(svc.onlineConfirm("M", { reference: "HWE-SUB-FFFFFFFFFFFFFFFFFF", transactionId: "tx" }))).status, 404);
    } finally {
      setHubFetch(null);
    }
  });
});

test("paiement en ligne : désactivé sans hub (DKP_PAYMENTS=0 ou variables absentes)", async () => {
  const { svc } = fakeSubs({});
  await withEnv({}, async () => assert.equal((await svc.onlineConfig("M")).enabled, false));
  await withEnv({ ...HUB_ENV, DKP_PAYMENTS: "0" }, async () => assert.equal((await svc.onlineConfig("M")).enabled, false));
});

// ─────────────────────────── E-mails par le hub ───────────────────────────

test("e-mails : sans SMTP, envoyés par le hub (Basic, JSON to/subject/text) ; sans hub, rien", async () => {
  const config: any = { get: (k: string) => process.env[k] };
  await withEnv(HUB_ENV, async () => {
    const sent: any[] = [];
    setHubFetch(async (url, init) => {
      sent.push({ url, body: JSON.parse(String(init?.body)) });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    try {
      const mailer = new MailerService(config, {} as any);
      assert.equal(mailer.isConfigured, true);
      assert.equal(mailer.channel, "dkp-hub");
      await mailer.send("awa@example.com", "Sujet", "Corps");
      assert.equal(sent.length, 1);
      assert.equal(sent[0].url, "http://hub.test:3020/hub/v1/email");
      assert.deepEqual(sent[0].body, { to: "awa@example.com", subject: "Sujet", text: "Corps" });
      // Hub en panne : l'opération métier n'échoue jamais.
      setHubFetch(async () => new Response("{}", { status: 502 }));
      await mailer.send("awa@example.com", "Sujet", "Corps");
    } finally {
      setHubFetch(null);
    }
  });
  await withEnv({}, async () => {
    let called = 0;
    setHubFetch(async () => {
      called++;
      return new Response("{}");
    });
    try {
      const mailer = new MailerService(config, {} as any);
      assert.equal(mailer.isConfigured, false);
      await mailer.send("awa@example.com", "Sujet", "Corps");
      assert.equal(called, 0);
    } finally {
      setHubFetch(null);
    }
  });
});

// ─────────────────────────── Configuration publique ───────────────────────────

test("configuration publique : tout masqué sans variables ; aucun secret exposé", async () => {
  const ctl = new DkpConfigController();
  await withEnv({}, () => {
    assert.deepEqual(ctl.config(), { login: false, payments: false, services: null, zemi: null, afrochina: null, gestipro: false, familyfe: null });
  });
  await withEnv({ ...HUB_ENV, ZEMI_PUBLIC_URL: "https://zemi.test/", DKP_PARTNER_KEYS: "familyfe:cle-familyfe-0123456789" }, () => {
    const c = ctl.config();
    assert.equal(c.login, true);
    assert.equal(c.zemi, "https://zemi.test");
    assert.equal(c.services?.account, "https://compte.test/compte");
    assert.ok(c.familyfe);
    const s = JSON.stringify(c);
    assert.ok(!s.includes("secret-de-test") && !s.includes("cle-familyfe"));
  });
  await withEnv({ ...HUB_ENV, DKP_LOGIN: "0" }, () => assert.equal(ctl.config().login, false));
});

// ─────────────────────────── GestiPro ───────────────────────────

const fee = (id: string, ownerId: string, amount: number, currency = "XOF", ref = "MAN-2026-1") => ({
  id, kind: "MANAGEMENT", label: "Honoraires de gestion — novembre 2026", amount, currency, dueDate: new Date("2026-11-05"),
  mandate: { reference: ref, property: { title: "Villa", city: "Cotonou" }, owner: { id: ownerId, firstName: "Koffi", lastName: "A", email: `${ownerId}@example.com`, phone: null } },
});

test("GestiPro : une facture par propriétaire et par devise, référence idempotente", () => {
  const inv = buildGestiproInvoices("AG1", "2026-11", [fee("f1", "o1", 15000), fee("f2", "o1", 5000, "XOF", "MAN-2026-2"), fee("f3", "o2", 20), fee("f4", "o2", 0)], {
    label: (f) => f.label,
    notes: (refs) => refs.join(","),
    issuedAt: "2026-11-30",
  });
  assert.equal(inv.length, 2);
  assert.deepEqual(inv.map((i) => i.reference), ["HWE-AG1-2026-11-o1-XOF", "HWE-AG1-2026-11-o2-XOF"]);
  assert.equal(inv[0]!.items.length, 2);
  assert.deepEqual(inv[0]!.items[0], { label: "Honoraires de gestion — novembre 2026", quantity: 1, unitPrice: 15000 });
  assert.equal(inv[0]!.notes, "MAN-2026-1,MAN-2026-2");
  assert.equal(inv[1]!.items.length, 1, "honoraire nul ignoré");
  assert.equal(inv[0]!.source, "hwe");
  assert.ok(isGestiproKey("gp_abcdefgh1234"));
  assert.ok(!isGestiproKey("sk_abcdefgh1234"));
  assert.equal(maskKey("gp_abcdefgh1234"), "gp_…1234");
});

test("GestiPro : clé jamais renvoyée, envoi du relevé avec Bearer, clé refusée → 400", async () => {
  await withEnv({ GESTIPRO_PARTNER_URL: "http://gestipro.test" }, async () => {
    const agency: any = { gestiproKey: null, gestiproKeyHint: null, gestiproTenantName: null, gestiproConnectedAt: null };
    const prisma: any = {
      agencyMember: { findUnique: async () => ({ agencyId: "AG1", role: "MANAGER" }) },
      agency: {
        findUniqueOrThrow: async () => agency,
        update: async ({ data }: any) => Object.assign(agency, data),
      },
      feeEntry: { findMany: async () => [{ ...fee("f1", "o1", 15000), mandate: { reference: "MAN-2026-1", ownerId: "o1", property: { title: "Villa", city: "Cotonou" } } }] },
      user: {
        findMany: async () => [{ id: "o1", firstName: "Koffi", lastName: "A", email: "o1@example.com", phone: null }],
        findUnique: async () => ({ locale: "fr" }),
      },
    };
    const calls: any[] = [];
    let refuse = false;
    setGestiproFetch(async (url, init) => {
      calls.push({ url, auth: (init?.headers as any).authorization, body: init?.body ? JSON.parse(String(init.body)) : null });
      if (refuse) return new Response("{}", { status: 401 });
      if (url.endsWith("/ping")) return new Response(JSON.stringify({ ok: true, tenant: { name: "Agence Lumière" } }));
      return new Response(JSON.stringify({ id: "inv1", reference: "x", url: "https://gp.test/factures/inv1" }), { status: 201 });
    });
    try {
      const svc = new GestiproService(prisma);
      const st = await svc.connect("M", "gp_cle_secrete_12345678");
      assert.equal(st.connected, true);
      assert.equal(st.hint, "gp_…5678");
      assert.equal(st.tenantName, "Agence Lumière");
      assert.ok(!JSON.stringify(st).includes("gp_cle_secrete"), "la clé ne ressort jamais");
      // Mois en cours (ou à venir) : refusé, le relevé ne part qu'une fois le mois terminé.
      const next = new Date(); next.setUTCMonth(next.getUTCMonth() + 1);
      const future = `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`;
      assert.equal((await httpStatus(svc.send("M", future))).status, 400);
      const r = await svc.send("M", "2026-10");
      assert.equal(r.sent, 1);
      const post = calls.find((c) => c.url === "http://gestipro.test/api/integrations/v1/invoices");
      assert.equal(post.auth, "Bearer gp_cle_secrete_12345678");
      assert.equal(post.body.reference, "HWE-AG1-2026-10-o1-XOF");
      assert.equal(post.body.customer.name, "Koffi A");
      refuse = true;
      assert.equal((await httpStatus(svc.test("M"))).status, 400);
      assert.equal((await httpStatus(svc.connect("M", "pas-une-cle-gp"))).status, 400);
    } finally {
      setGestiproFetch(null);
    }
  });
  await withEnv({}, async () => {
    const svc = new GestiproService({ agencyMember: { findUnique: async () => null } } as any);
    assert.equal((await svc.status("M")).available, false);
    assert.equal((await httpStatus(svc.send("M", "2026-11"))).status, 404);
  });
});
