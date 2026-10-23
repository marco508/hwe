// Jours calendaires, échéances de loyer, prorata, avenants, location courte.
import { test } from "node:test";
import assert from "node:assert/strict";
import { addMonths, dayOf, diffDays, toDay, today } from "../src/common/dates";
import { computePeriod, periodsUpTo, termsAt } from "../src/rents/rent-calc";
import { draftLeaseTerms } from "../src/inquiries/inquiries.service";

const D = (s: string) => new Date(`${s}T00:00:00.000Z`);

test("addMonths borne au dernier jour du mois", () => {
  assert.deepEqual(addMonths(D("2026-01-31"), 1), D("2026-02-28"));
  assert.deepEqual(addMonths(D("2028-01-31"), 1), D("2028-02-29"));
  assert.deepEqual(addMonths(D("2026-08-31"), 6), D("2027-02-28"));
  assert.deepEqual(addMonths(D("2026-11-15"), 3), D("2027-02-15"));
});

test("jour courant dans le fuseau Europe/Paris", () => {
  // 23 oct. 23:30 UTC = 24 oct. 01:30 à Paris (heure d'été)
  assert.deepEqual(today(new Date("2026-10-23T23:30:00Z")), D("2026-10-24"));
  assert.deepEqual(dayOf(new Date("2026-12-31T22:59:00Z")), D("2026-12-31"));
  assert.deepEqual(toDay("2026-11-01"), D("2026-11-01"));
  assert.equal(toDay("2026-02-31"), null);
  assert.equal(toDay("pas une date"), null);
  assert.deepEqual(toDay("2026-11-01T00:00:00.000Z"), D("2026-11-01"));
  assert.equal(diffDays(D("2026-11-08"), D("2026-11-01")), 7);
});

const lease = {
  startDate: D("2026-01-01"),
  endDate: null as Date | null,
  monthlyRent: 600,
  charges: 50,
  rentPaymentDay: 5,
  shortStay: false,
  stayTotal: null as number | null,
};

test("échéance mensuelle : montant figé loyer + charges, jour de paiement", () => {
  const p = computePeriod(lease, 2026, 3)!;
  assert.deepEqual(p.dueDate, D("2026-03-05"));
  assert.equal(p.rentAmount, 600);
  assert.equal(p.chargesAmount, 50);
  assert.equal(p.amount, 650);
  assert.equal(computePeriod(lease, 2025, 12), null);
});

test("prorata du premier et du dernier mois, échéance jamais avant l'entrée", () => {
  const l = { ...lease, startDate: D("2026-04-21"), endDate: D("2026-06-10") };
  const first = computePeriod(l, 2026, 4)!; // 10 jours sur 30
  assert.equal(first.rentAmount, 200);
  assert.equal(first.chargesAmount, 16.67);
  assert.deepEqual(first.dueDate, D("2026-04-21"));
  const last = computePeriod(l, 2026, 6)!; // 10 jours sur 30
  assert.equal(last.rentAmount, 200);
  assert.equal(computePeriod(l, 2026, 7), null);
});

test("les échéances s'arrêtent au mois courant (jamais d'échéance future)", () => {
  const ps = periodsUpTo(lease, D("2026-03-04"));
  assert.deepEqual(ps.map((p) => p.periodMonth), [1, 2, 3]);
  assert.equal(periodsUpTo({ ...lease, startDate: D("2026-05-01") }, D("2026-03-04")).length, 0);
});

test("un avenant ne réécrit pas les mois antérieurs à sa date d'effet", () => {
  const amendments = [
    { effectiveDate: D("2026-03-01"), appliedAt: D("2026-03-01"), prevMonthlyRent: 600, prevCharges: 50 },
  ];
  const current = { ...lease, monthlyRent: 700, charges: 60 };
  assert.deepEqual(termsAt(current, amendments, D("2026-02-01")), { rent: 600, charges: 50 });
  assert.deepEqual(termsAt(current, amendments, D("2026-03-01")), { rent: 700, charges: 60 });
  const ps = periodsUpTo(current, D("2026-04-10"), amendments);
  assert.deepEqual(ps.map((p) => p.amount), [650, 650, 760, 760]);
});

test("location courte : une seule échéance du total, due à l'arrivée", () => {
  const l = { ...lease, startDate: D("2026-07-30"), endDate: D("2026-08-01"), shortStay: true, stayTotal: 135 };
  const ps = periodsUpTo(l, D("2026-09-01"));
  assert.equal(ps.length, 1);
  assert.equal(ps[0]!.amount, 135);
  assert.deepEqual(ps[0]!.dueDate, D("2026-07-30"));
});

test("bail brouillon depuis une demande : 3 jours à 45 €/jour = 135 € (pas 1 350 €)", () => {
  const property = {
    price: 900, furnished: true, deposit: null, chargesIncluded: true, chargesAmount: null,
    pricingRates: [{ unit: "DAYS" as const, amount: 45 }],
  };
  const t = draftLeaseTerms(property, {
    desiredStartDate: D("2026-12-01"), leaseDuration: 3, leaseDurationUnit: "DAYS",
  }, D("2026-10-23"));
  assert.equal(t.shortStay, true);
  assert.equal(t.stayTotal, 135);
  assert.equal(t.deposit, 0);
  assert.deepEqual(t.endDate, D("2026-12-03")); // dernier jour d'occupation

  const long = draftLeaseTerms({ ...property, pricingRates: [] }, {
    desiredStartDate: D("2026-11-01"), leaseDuration: 12, leaseDurationUnit: "MONTHS",
  }, D("2026-10-23"));
  assert.equal(long.shortStay, false);
  assert.equal(long.monthlyRent, 900);
  assert.equal(long.deposit, 1800); // meublé : 2 mois faute de caution saisie
  assert.deepEqual(long.endDate, D("2027-10-31"));

  // Date souhaitée déjà passée : départ aujourd'hui
  const past = draftLeaseTerms(property, { desiredStartDate: D("2026-01-01"), leaseDuration: null, leaseDurationUnit: null }, D("2026-10-23"));
  assert.deepEqual(past.startDate, D("2026-10-23"));
});
