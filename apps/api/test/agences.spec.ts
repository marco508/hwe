// Module Professionnels : matrice des permissions, honoraires, références de
// mandat, propriétaire non activé.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import { BadRequestException, ConflictException, ForbiddenException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import {
  ALL_ACTIONS,
  AccessAction,
  AccessContext,
  decideAccess,
  mandateIsLive,
} from "../src/common/property-access";
import {
  assertFeeTransition,
  assertFees,
  assertMandateMatchesListing,
  formatMandateReference,
  lettingFee,
  managementFee,
  parseMonth,
  saleFee,
} from "../src/mandates/fees";
import { FeesService } from "../src/mandates/fees.service";
import { MandatesService } from "../src/mandates/mandates.service";
import { percentOf, sumMoney, toCents } from "../src/common/money";
import { AuthService } from "../src/auth/auth.service";
import { buildValidationPipe } from "../src/common/validation";
import { RegisterDto } from "../src/auth/dto/register.dto";
import { slugify } from "../src/agencies/agency.util";

const D = (s: string) => new Date(`${s}T00:00:00.000Z`);
const TODAY = D("2026-10-23");

// ─────────────────────────── Matrice des permissions ───────────────────────────

const OWNER = "owner-1";
const MANAGER = "manager-1";
const AGENT = "agent-1";
const OTHER_AGENT = "agent-2";

function ctx(over: Partial<AccessContext> & { mandate?: Partial<NonNullable<AccessContext["mandate"]>> | null } = {}): AccessContext {
  const mandate =
    over.mandate === null
      ? null
      : {
          id: "m1",
          reference: "MAN-2026-00001",
          type: "MANAGEMENT" as const,
          status: "ACTIVE" as const,
          agencyId: "ag-1",
          assignedAgentId: AGENT,
          endDate: null,
          lettingCompletedAt: null,
          ...(over.mandate ?? {}),
        };
  return {
    userId: over.userId ?? AGENT,
    property: { id: "p1", ownerId: OWNER },
    ownerActivated: over.ownerActivated ?? true,
    membership: over.membership === undefined ? { agencyId: "ag-1", role: "AGENT" } : over.membership,
    mandate,
    today: TODAY,
  };
}

const allowedSet = (c: AccessContext) => new Set(ALL_ACTIONS.filter((a) => decideAccess(c, a).allowed));

/** Ce qu'un pro autorisé peut faire sous mandat de gestion, propriétaire activé. */
const PRO_MANAGEMENT: AccessAction[] = [
  "READ", "LEASE_READ", "EDIT_LISTING", "MESSAGES", "PROPOSE_TENANT", "REJECT_INQUIRY",
  "LEASE_DRAFT", "INSPECTION", "MANAGE", "RENTS", "OWNER_NOTICE", "STAYS",
];

test("permissions : le propriétaire peut tout faire, même sous mandat actif", () => {
  const c = ctx({ userId: OWNER, membership: null });
  assert.deepEqual([...allowedSet(c)].sort(), [...ALL_ACTIONS].sort());
  for (const a of ALL_ACTIONS) assert.equal(decideAccess(c, a).as, "OWNER");
});

test("permissions : MANAGER de l'agence (mandat de gestion actif) — tout sauf décisions clés et suppression", () => {
  const c = ctx({ userId: MANAGER, membership: { agencyId: "ag-1", role: "MANAGER" }, mandate: { assignedAgentId: AGENT } });
  assert.deepEqual([...allowedSet(c)].sort(), [...PRO_MANAGEMENT].sort());
  assert.equal(decideAccess(c, "ACCEPT_TENANT").code, "OWNER_DECISION_REQUIRED");
  assert.equal(decideAccess(c, "SIGN_LEASE").code, "OWNER_DECISION_REQUIRED");
  assert.equal(decideAccess(c, "SIGN_AMENDMENT").code, "OWNER_DECISION_REQUIRED");
  assert.equal(decideAccess(c, "DELETE_PROPERTY").code, "OWNER_ONLY");
});

test("permissions : agent assigné = même périmètre que le manager", () => {
  const c = ctx({ userId: AGENT });
  assert.deepEqual([...allowedSet(c)].sort(), [...PRO_MANAGEMENT].sort());
  assert.equal(decideAccess(c, "READ").as, "PRO");
});

test("permissions : agent NON assigné → aucun accès", () => {
  const c = ctx({ userId: OTHER_AGENT });
  assert.equal(allowedSet(c).size, 0);
  assert.equal(decideAccess(c, "READ").code, "NOT_ASSIGNED");
  // mandat sans agent assigné : seuls les responsables y ont accès
  assert.equal(allowedSet(ctx({ userId: AGENT, mandate: { assignedAgentId: null } })).size, 0);
});

test("permissions : autre agence, ou pro sans mandat → aucun accès", () => {
  const other = ctx({ userId: "x", membership: { agencyId: "ag-2", role: "MANAGER" } });
  assert.equal(allowedSet(other).size, 0);
  assert.equal(decideAccess(other, "READ").code, "PROPERTY_ACCESS_DENIED");
  const none = ctx({ userId: "x", membership: { agencyId: "ag-2", role: "MANAGER" }, mandate: null });
  assert.equal(allowedSet(none).size, 0);
  const stranger = ctx({ userId: "tenant", membership: null });
  assert.equal(allowedSet(stranger).size, 0);
});

test("permissions : mandat terminé, refusé, en attente ou échu → aucun accès", () => {
  for (const status of ["ENDED", "REJECTED", "PENDING_OWNER"] as const) {
    const c = ctx({ userId: MANAGER, membership: { agencyId: "ag-1", role: "MANAGER" }, mandate: { status } });
    assert.equal(allowedSet(c).size, 0, status);
    assert.equal(decideAccess(c, "READ").code, "MANDATE_INACTIVE");
  }
  const expired = ctx({ mandate: { endDate: D("2026-10-22") } });
  assert.equal(allowedSet(expired).size, 0);
  assert.equal(mandateIsLive({ status: "ACTIVE", endDate: D("2026-10-23") }, TODAY), true, "dernier jour inclus");
});

test("permissions : mandat LETTING — gestion avant signature, lecture du bail seule après", () => {
  const before = ctx({ mandate: { type: "LETTING" } });
  const b = allowedSet(before);
  assert.ok(b.has("LEASE_DRAFT") && b.has("PROPOSE_TENANT") && b.has("MANAGE"));
  assert.equal(b.has("OWNER_NOTICE"), false, "congé bailleur : mandat de gestion seulement");
  const after = ctx({ mandate: { type: "LETTING", lettingCompletedAt: new Date("2026-10-20T10:00:00Z") } });
  assert.deepEqual([...allowedSet(after)], ["LEASE_READ"]);
  assert.equal(decideAccess(after, "RENTS").code, "LETTING_MANDATE_COMPLETED");
  assert.equal(decideAccess(after, "INSPECTION").code, "LETTING_MANDATE_COMPLETED");
});

test("permissions : mandat SALE — annonce, demandes, visites, messages seulement", () => {
  const c = ctx({ mandate: { type: "SALE" } });
  assert.deepEqual(
    [...allowedSet(c)].sort(),
    ["EDIT_LISTING", "LEASE_READ", "MESSAGES", "PROPOSE_TENANT", "READ", "REJECT_INQUIRY"].sort(),
  );
  assert.equal(decideAccess(c, "RENTS").code, "MANDATE_SCOPE");
});

test("permissions : propriétaire non activé — le pro agit POUR SON COMPTE (décisions clés)", () => {
  const c = ctx({ ownerActivated: false });
  for (const a of ["ACCEPT_TENANT", "SIGN_LEASE", "SIGN_AMENDMENT"] as const) {
    const d = decideAccess(c, a);
    assert.equal(d.allowed, true, a);
    assert.equal(d.onBehalf, true, a);
  }
  assert.equal(decideAccess(c, "READ").onBehalf, false);
  assert.equal(decideAccess(c, "DELETE_PROPERTY").allowed, false);
  // …mais jamais pour un agent non assigné ni après la fin du mandat
  assert.equal(decideAccess(ctx({ ownerActivated: false, userId: OTHER_AGENT }), "SIGN_LEASE").allowed, false);
  assert.equal(decideAccess(ctx({ ownerActivated: false, mandate: { status: "ENDED" } }), "ACCEPT_TENANT").allowed, false);
  // Dès l'activation, la possibilité disparaît.
  assert.equal(decideAccess(ctx({ ownerActivated: true }), "SIGN_LEASE").allowed, false);
});

// ─────────────────────────── Honoraires ───────────────────────────

test("honoraires : calcul en centimes et arrondis", () => {
  assert.equal(toCents(1.005), 101);
  assert.equal(toCents(0.1 + 0.2), 30);
  assert.equal(percentOf(0.1, 5), 0.01, "demi-centime arrondi au supérieur");
  assert.equal(managementFee(7, 850, 50), 63);
  assert.equal(managementFee(8.5, 733.33, 0), 62.33);
  assert.equal(managementFee(7.25, 1000, 0.01), 72.5);
  assert.equal(managementFee(0, 850, 50), null);
  assert.equal(managementFee(null, 850, 50), null);
  assert.equal(sumMoney([0.1, 0.2]), 0.3);
});

test("honoraires : mise en location (montant fixe ou mois de loyer hors charges), vente", () => {
  assert.equal(lettingFee({ lettingFeeAmount: 500 }, 850), 500);
  assert.equal(lettingFee({ lettingFeeMonths: 1 }, 850), 850);
  assert.equal(lettingFee({ lettingFeeMonths: 1.5 }, 733.33), 1100);
  assert.equal(lettingFee({ lettingFeeMonths: 0.5 }, 815.55), 407.78);
  assert.equal(lettingFee({}, 850), null);
  assert.equal(saleFee(5, 250000), 12500);
  assert.equal(saleFee(4.5, 199999.99), 9000);
  assert.equal(saleFee(5, 0), null);
});

test("honoraires : bornes et cohérence avec le type de mandat", () => {
  assert.doesNotThrow(() => assertFees("MANAGEMENT", { managementFeeRate: 7, lettingFeeMonths: 1 }));
  assert.throws(() => assertFees("MANAGEMENT", { managementFeeRate: 31 }), BadRequestException);
  assert.throws(() => assertFees("LETTING", { lettingFeeMonths: 3.5 }), BadRequestException);
  assert.throws(() => assertFees("SALE", { saleFeeRate: 16 }), BadRequestException);
  assert.throws(() => assertFees("LETTING", { lettingFeeAmount: 500, lettingFeeMonths: 1 }), /montant fixe OU/);
  assert.throws(() => assertFees("SALE", { managementFeeRate: 5 }), BadRequestException);
  assert.throws(() => assertFees("MANAGEMENT", { saleFeeRate: 5 }), BadRequestException);
  assert.throws(() => assertFees("LETTING", { managementFeeRate: 5 }), BadRequestException);
  assert.throws(() => assertMandateMatchesListing("SALE", "RENT"), BadRequestException);
  assert.doesNotThrow(() => assertMandateMatchesListing("MANAGEMENT", "RENT"));
  assert.throws(() => assertFeeTransition("CANCELLED", "SETTLED"), ConflictException);
  assert.doesNotThrow(() => assertFeeTransition("DUE", "SETTLED"));
  assert.doesNotThrow(() => assertFeeTransition("SETTLED", "DUE"));
});

/** Transaction factice en mémoire (FeeEntry, Mandate, MandateEvent). */
function fakeDb(mandate: Record<string, unknown> | null) {
  const fees: any[] = [];
  const events: any[] = [];
  const db: any = {
    fees,
    events,
    mandate: { findFirst: async () => mandate },
    mandateEvent: { create: async ({ data }: any) => events.push(data) },
    feeEntry: {
      findUnique: async ({ where }: any) => fees.find((f) => f.rentPeriodId === where.rentPeriodId) ?? null,
      findFirst: async ({ where }: any) =>
        fees.find((f) => f.kind === where.kind && (where.leaseId ? f.leaseId === where.leaseId : f.mandateId === where.mandateId) && f.status !== "CANCELLED") ?? null,
      create: async ({ data }: any) => {
        const row = { id: `f${fees.length + 1}`, status: "DUE", ...data };
        fees.push(row);
        return row;
      },
      update: async ({ where, data }: any) => Object.assign(fees.find((f) => f.id === where.id), data),
      updateMany: async ({ where, data }: any) => {
        let count = 0;
        for (const f of fees) if (f.rentPeriodId === where.rentPeriodId && f.status !== "CANCELLED") { Object.assign(f, data); count++; }
        return { count };
      },
    },
    $executeRaw: async () => 0,
  };
  return db;
}

const period = { id: "rp1", leaseId: "l1", rentAmount: 850, chargesAmount: 50, periodYear: 2026, periodMonth: 10 };

test("honoraires de gestion : une entrée par échéance (idempotent), annulée puis réactivée", async () => {
  const db = fakeDb({ id: "m1", type: "MANAGEMENT", managementFeeRate: 7, currency: "EUR" });
  const svc = new FeesService(db);
  await svc.onRentValidated(db, period, "p1", "EUR", "agent-1");
  await svc.onRentValidated(db, period, "p1", "EUR", "agent-1");
  assert.equal(db.fees.length, 1, "idempotent par rentPeriodId");
  assert.equal(db.fees[0].amount, 63);
  assert.equal(db.fees[0].kind, "MANAGEMENT");
  assert.equal(db.fees[0].status, "DUE");
  assert.equal(await svc.onRentCancelled(db, "rp1"), 1);
  assert.equal(db.fees[0].status, "CANCELLED");
  assert.equal(await svc.onRentCancelled(db, "rp1"), 0, "annulation idempotente");
  await svc.onRentValidated(db, period, "p1", "EUR", "agent-1");
  assert.equal(db.fees.length, 1);
  assert.equal(db.fees[0].status, "DUE", "nouvelle validation : honoraire réactivé");
});

test("honoraires de gestion : rien sans mandat de gestion actif ni taux", async () => {
  for (const m of [null, { id: "m1", type: "LETTING", managementFeeRate: null }, { id: "m1", type: "MANAGEMENT", managementFeeRate: 0 }]) {
    const db = fakeDb(m);
    await new FeesService(db).onRentValidated(db, period, "p1", "EUR", null);
    assert.equal(db.fees.length, 0);
  }
});

test("honoraires de vente : une seule entrée par mandat", async () => {
  const db = fakeDb({ id: "m9", type: "SALE", saleFeeRate: 5, currency: "XOF" });
  const svc = new FeesService(db);
  await svc.onPropertySold(db, "p1", 250000, "agent-1");
  await svc.onPropertySold(db, "p1", 260000, "agent-1");
  assert.equal(db.fees.length, 1);
  assert.equal(db.fees[0].amount, 12500);
  assert.equal(db.fees[0].currency, "XOF");
  assert.equal(db.events[0].kind, "FEE_CREATED");
});

// ─────────────────────────── Références de mandat ───────────────────────────

test("références de mandat : MAN-<année>-<n> sur 5 chiffres, compteur atomique", async () => {
  assert.equal(formatMandateReference(2026, 12), "MAN-2026-00012");
  assert.equal(formatMandateReference(2027, 123456), "MAN-2027-123456");
  let n = 0;
  const tx: any = { $queryRaw: async () => [{ last: ++n }] };
  const svc = new MandatesService({} as any, {} as any, {} as any, {} as any);
  const refs = [await svc.nextReference(tx), await svc.nextReference(tx), await svc.nextReference(tx)];
  assert.equal(new Set(refs).size, 3);
  assert.match(refs[0]!, /^MAN-\d{4}-00001$/);
  assert.match(refs[2]!, /^MAN-\d{4}-00003$/);
  assert.deepEqual(parseMonth("2026-10"), { year: 2026, month: 10 });
  assert.equal(parseMonth("2026-13"), null);
  assert.equal(parseMonth("oct"), null);
  assert.equal(slugify("Agence Dupont & Fils — Cotonou"), "agence-dupont-fils-cotonou");
  assert.equal(slugify("***"), "agence");
});

// ─────────────────────────── Propriétaire non activé ───────────────────────────

function authWith(user: any) {
  const prisma: any = {
    user: {
      findUnique: async () => user,
      findFirst: async () => user,
      create: async () => assert.fail("aucun compte ne doit être créé"),
    },
    agencyMember: { findUnique: async () => null },
  };
  const jwt: any = { sign: () => "jwt", signAsync: async () => "jwt", decode: () => null, verifyAsync: async () => ({}) };
  const mailer: any = { emailVerification: async () => {}, passwordReset: async () => {} };
  return new AuthService(prisma, jwt, mailer);
}

const invited = {
  id: "u-inv",
  email: "proprio@example.com",
  password: bcrypt.hashSync("aleatoire-inutilisable", 4),
  firstName: "Paul",
  lastName: "Proprio",
  role: "OWNER",
  activatedAt: null,
  emailVerifiedAt: null,
  tokenVersion: 0,
};

test("propriétaire non activé : connexion refusée (403 ACCOUNT_NOT_ACTIVATED)", async () => {
  const auth = authWith(invited);
  await assert.rejects(
    () => auth.login({ email: invited.email, password: "nimportequoi1" }),
    (e: unknown) => {
      assert.ok(e instanceof ForbiddenException);
      const body = e.getResponse() as any;
      assert.equal(body.code, "ACCOUNT_NOT_ACTIVATED");
      assert.match(body.message, /lien/);
      return true;
    },
  );
});

test("propriétaire non activé : inscription avec son e-mail → 409 INVITED_ACCOUNT", async () => {
  const auth = authWith(invited);
  await assert.rejects(
    () => auth.register({ email: invited.email, password: "motdepasse1", firstName: "a", lastName: "b", role: "OWNER" }),
    (e: unknown) => {
      assert.ok(e instanceof ConflictException);
      const body = e.getResponse() as any;
      assert.equal(body.code, "INVITED_ACCOUNT");
      assert.match(body.message, /mot de passe oublié/);
      return true;
    },
  );
});

test("inscription pro : rôle AGENT et nom d'agence acceptés, ADMIN toujours refusé", async () => {
  const pipe = buildValidationPipe();
  const meta = { type: "body" as const, metatype: RegisterDto, data: "" };
  const dto = await pipe.transform(
    { email: "pro@example.com", password: "motdepasse", firstName: "A", lastName: "B", role: "AGENT", agencyName: " Immo Plus " },
    meta,
  );
  assert.equal(dto.role, "AGENT");
  assert.equal(dto.agencyName, "Immo Plus");
  await assert.rejects(() =>
    pipe.transform({ email: "a@b.fr", password: "motdepasse", firstName: "A", lastName: "B", role: "ADMIN" }, meta),
  );
});

test("vue candidat : la proposition et la décision motivée du propriétaire ne fuient pas", async () => {
  const { stripProposalForTenant } = await import("../src/inquiries/inquiries.service");
  const out = stripProposalForTenant({
    id: "i1",
    status: "REJECTED",
    proposedAt: new Date(),
    proposedById: "a1",
    proposalNote: "Dossier fragile",
    ownerDecision: "DECLINED",
    ownerDecisionAt: new Date(),
    ownerDecisionNote: "Revenus insuffisants",
    proposedBy: { id: "a1" },
    managedBy: { name: "Agence" },
  });
  assert.deepEqual(Object.keys(out).sort(), ["id", "status"]);
});
