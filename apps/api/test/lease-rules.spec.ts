// Machine à états du bail, verrouillage après signature, préavis, chevauchements.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ConflictException, BadRequestException } from "@nestjs/common";
import {
  assertLeaseDates,
  assertLeaseDeletable,
  assertLeaseEditable,
  assertLeaseSignable,
  endStatus,
  isPastEnd,
  leaseContentHash,
  ownerNoticeEffectiveDate,
  rangesOverlap,
  statusAfterSignatures,
  tenantNoticeEffectiveDate,
} from "../src/leases/lease-rules";

const D = (s: string) => new Date(`${s}T00:00:00.000Z`);
const draft = { status: "DRAFT" as const, ownerSignedAt: null, tenantSignedAt: null, coTenants: [] };

test("double signature : SIGNED si début futur, ACTIVE si début atteint", () => {
  const signed = { ownerSignedAt: new Date(), tenantSignedAt: new Date() };
  assert.equal(statusAfterSignatures({ ...signed, startDate: D("2026-11-01") }, D("2026-10-23")), "SIGNED");
  assert.equal(statusAfterSignatures({ ...signed, startDate: D("2026-10-23") }, D("2026-10-23")), "ACTIVE");
  assert.equal(statusAfterSignatures({ ownerSignedAt: new Date(), tenantSignedAt: null, startDate: D("2026-01-01") }, D("2026-10-23")), "DRAFT");
});

test("un bail signé (par une seule partie) n'est plus modifiable ni supprimable", () => {
  assert.doesNotThrow(() => assertLeaseEditable(draft));
  assert.doesNotThrow(() => assertLeaseDeletable(draft));
  const halfSigned = { ...draft, ownerSignedAt: new Date() };
  assert.throws(() => assertLeaseEditable(halfSigned), ConflictException);
  assert.throws(() => assertLeaseDeletable(halfSigned), ConflictException);
  const coSigned = { ...draft, coTenants: [{ signedAt: new Date() }] };
  assert.throws(() => assertLeaseEditable(coSigned), ConflictException);
  assert.throws(() => assertLeaseEditable({ ...draft, status: "ACTIVE" as const }), ConflictException);
  assert.throws(() => assertLeaseDeletable({ ...draft, status: "TERMINATED" as const }), ConflictException);
});

test("seul un brouillon se signe", () => {
  assert.doesNotThrow(() => assertLeaseSignable({ status: "DRAFT" }));
  assert.throws(() => assertLeaseSignable({ status: "EXPIRED" }), /terminé/);
  assert.throws(() => assertLeaseSignable({ status: "SIGNED" }), ConflictException);
});

test("fin de bail : le dernier jour compte, statut EXPIRED ou TERMINATED", () => {
  assert.equal(isPastEnd(D("2026-10-23"), D("2026-10-23")), false);
  assert.equal(isPastEnd(D("2026-10-22"), D("2026-10-23")), true);
  assert.equal(isPastEnd(null, D("2026-10-23")), false);
  assert.equal(endStatus({ noticeGivenAt: null, ownerNoticeGivenAt: null }), "EXPIRED");
  assert.equal(endStatus({ noticeGivenAt: new Date(), ownerNoticeGivenAt: null }), "TERMINATED");
});

test("dates : fin strictement après le début", () => {
  assert.throws(() => assertLeaseDates(D("2026-11-01"), D("2026-10-01")), BadRequestException);
  assert.throws(() => assertLeaseDates(D("2026-11-01"), D("2026-11-01")), BadRequestException);
  assert.doesNotThrow(() => assertLeaseDates(D("2026-11-01"), null));
});

test("chevauchement de baux (jours inclus, fin ouverte)", () => {
  assert.equal(rangesOverlap(D("2026-01-01"), D("2026-06-30"), D("2026-06-30"), null), true);
  assert.equal(rangesOverlap(D("2026-01-01"), D("2026-06-30"), D("2026-07-01"), null), false);
  assert.equal(rangesOverlap(D("2026-01-01"), null, D("2030-01-01"), D("2030-02-01")), true);
});

test("préavis locataire : mois bornés, date souhaitée plus tardive, sans dépasser la fin", () => {
  assert.deepEqual(tenantNoticeEffectiveDate(D("2026-01-31"), 1, null, null), D("2026-02-28"));
  assert.deepEqual(tenantNoticeEffectiveDate(D("2026-01-10"), 1, D("2026-01-15"), null), D("2026-02-10"));
  assert.deepEqual(tenantNoticeEffectiveDate(D("2026-01-10"), 1, D("2026-04-01"), null), D("2026-04-01"));
  assert.deepEqual(tenantNoticeEffectiveDate(D("2026-01-10"), 3, null, D("2026-03-01")), D("2026-03-01"));
});

test("congé bailleur : vaut pour l'échéance du bail, au plus tôt après le préavis légal", () => {
  // Échéance lointaine : c'est elle qui compte (pas de rupture en cours de bail)
  assert.deepEqual(ownerNoticeEffectiveDate(D("2026-01-10"), 6, null, D("2028-12-31")), D("2028-12-31"));
  // Échéance trop proche : préavis légal
  assert.deepEqual(ownerNoticeEffectiveDate(D("2026-01-10"), 6, null, D("2026-03-01")), D("2026-07-10"));
  // Sans échéance : préavis légal ou date souhaitée plus tardive
  assert.deepEqual(ownerNoticeEffectiveDate(D("2026-08-31"), 3, null, null), D("2026-11-30"));
  assert.deepEqual(ownerNoticeEffectiveDate(D("2026-01-10"), 3, D("2026-12-01"), null), D("2026-12-01"));
});

test("empreinte du contenu signé : stable et sensible aux clauses", () => {
  const base = {
    id: "l1", propertyId: "p1", tenantFirstName: "A", tenantLastName: "B", tenantEmail: "a@b.c",
    monthlyRent: 600, charges: 50, deposit: 600, currency: "EUR", startDate: D("2026-01-01"),
    endDate: null, noticePeriod: 1, rentPaymentDay: 5, furnished: false, specialClauses: null,
    shortStay: false, stayTotal: null,
  };
  assert.equal(leaseContentHash(base), leaseContentHash({ ...base }));
  assert.notEqual(leaseContentHash(base), leaseContentHash({ ...base, specialClauses: "x" }));
  assert.match(leaseContentHash(base), /^[0-9a-f]{64}$/);
});
