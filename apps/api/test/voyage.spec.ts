// Espace Voyage : règles des séjours (prix, disponibilité, annulation),
// calendriers iCal (export / import / protection SSRF), contenus traduits,
// e-mails de réservation dans chaque langue.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import {
  checkStay,
  mergeRanges,
  nightsBetween,
  quoteStay,
  refundFor,
  averageRating,
  isClock,
} from "../src/stays/stays-rules";
import { buildIcal, checkImportUrl, isPrivateAddress, parseIcal } from "../src/stays/ical";
import { checkCover, cleanTranslations, localize, localized, slugify } from "../src/voyage/voyage-content";
import { tripDays } from "../src/voyage/trips.service";
import * as mail from "../src/mail/templates";
import { BENIN_CIRCUITS, BENIN_DESTINATIONS } from "../src/voyage/seed/benin";

const D = (s: string) => new Date(`${s}T00:00:00Z`);

test("séjours : nuits, devis, dégressif semaine et mois, ménage une fois", () => {
  assert.equal(nightsBetween(D("2026-12-20"), D("2026-12-27")), 7);
  const rates = { nightly: 30000, weekly: 175000, monthly: 600000, cleaningFee: 10000 };
  const q3 = quoteStay(rates, 3)!;
  assert.deepEqual([q3.nightlyRate, q3.subtotal, q3.total, q3.discount], [30000, 90000, 100000, null]);
  const q7 = quoteStay(rates, 7)!;
  assert.equal(q7.discount, "WEEK");
  assert.equal(q7.nightlyRate, 25000);
  assert.equal(q7.total, 185000);
  const q30 = quoteStay(rates, 30)!;
  assert.equal(q30.discount, "MONTH");
  assert.equal(q30.nightlyRate, 20000);
  // Tarif semaine plus cher que la nuit : pas appliqué.
  assert.equal(quoteStay({ nightly: 20, weekly: 200, cleaningFee: 0 }, 8)!.discount, null);
  // Sans prix par nuit : repli sur la semaine ramenée à la nuit.
  assert.equal(quoteStay({ nightly: null, weekly: 70, cleaningFee: 0 }, 2)!.nightlyRate, 10);
  assert.equal(quoteStay({ nightly: null, cleaningFee: 5 }, 2), null);
});

test("séjours : demande refusée pour chaque règle, acceptée sinon", () => {
  const c = { minNights: 2, maxNights: 10, maxGuests: 4, minNoticeDays: 1 };
  const today = D("2026-11-01");
  const taken = [{ start: D("2026-11-10"), end: D("2026-11-12") }];
  const ok = { checkIn: D("2026-11-05"), checkOut: D("2026-11-08"), guests: 2 };
  assert.deepEqual(checkStay(ok, c, taken, today), []);
  assert.deepEqual(checkStay({ ...ok, checkOut: ok.checkIn }, c, taken, today), ["DATES_INVALID"]);
  assert.ok(checkStay({ ...ok, checkIn: today }, c, taken, today).includes("TOO_SOON"));
  assert.ok(checkStay({ ...ok, checkOut: D("2026-11-06") }, c, taken, today).includes("MIN_NIGHTS"));
  assert.ok(checkStay({ ...ok, checkOut: D("2026-11-20") }, c, taken, today).includes("MAX_NIGHTS"));
  assert.ok(checkStay({ ...ok, guests: 5 }, c, taken, today).includes("MAX_GUESTS"));
  assert.ok(checkStay({ ...ok, checkIn: D("2028-06-01"), checkOut: D("2028-06-03") }, c, taken, today).includes("TOO_FAR"));
  // Chevauchement : [9, 11[ touche [10, 12[ ; départ le 10 = arrivée possible le 10.
  assert.ok(checkStay({ checkIn: D("2026-11-09"), checkOut: D("2026-11-11"), guests: 1 }, c, taken, today).includes("UNAVAILABLE"));
  assert.deepEqual(checkStay({ checkIn: D("2026-11-08"), checkOut: D("2026-11-10"), guests: 1 }, c, taken, today), []);
  assert.deepEqual(checkStay({ checkIn: D("2026-11-12"), checkOut: D("2026-11-14"), guests: 1 }, c, taken, today), []);
});

test("séjours : plages fusionnées, notes moyennes, heures", () => {
  const m = mergeRanges([
    { start: D("2026-11-10"), end: D("2026-11-12") },
    { start: D("2026-11-01"), end: D("2026-11-03") },
    { start: D("2026-11-12"), end: D("2026-11-15") },
  ]);
  assert.equal(m.length, 2);
  assert.equal(m[1]!.end.toISOString().slice(0, 10), "2026-11-15");
  assert.equal(averageRating([5, 4, 4]), 4.3);
  assert.equal(averageRating([]), null);
  assert.ok(isClock("15:00") && !isClock("25:00") && !isClock("9:00"));
});

test("séjours : remboursement selon la politique d'annulation", () => {
  const ci = D("2026-12-20");
  assert.equal(refundFor("FLEXIBLE", 100, ci, D("2026-12-19"), "GUEST"), 100);
  assert.equal(refundFor("FLEXIBLE", 100, ci, D("2026-12-20"), "GUEST"), 0);
  assert.equal(refundFor("MODERATE", 100, ci, D("2026-12-15"), "GUEST"), 100);
  assert.equal(refundFor("MODERATE", 100, ci, D("2026-12-17"), "GUEST"), 50);
  assert.equal(refundFor("STRICT", 100, ci, D("2026-12-13"), "GUEST"), 50);
  assert.equal(refundFor("STRICT", 100, ci, D("2026-12-14"), "GUEST"), 0);
  assert.equal(refundFor("STRICT", 100, ci, D("2026-12-19"), "HOST"), 100);
});

test("iCal : export valide puis relu à l'identique ; événements annulés ignorés", () => {
  const ics = buildIcal("hwe — Villa, plage", [
    { uid: "b1@hwe", start: D("2026-12-20"), end: D("2026-12-27"), summary: "Réservé (hwe)" },
    { uid: "k1@hwe", start: D("2027-01-02"), end: D("2027-01-03"), summary: "Indisponible" },
  ]);
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/);
  assert.match(ics, /DTSTART;VALUE=DATE:20261220\r\n/);
  assert.match(ics, /X-WR-CALNAME:hwe — Villa\\, plage/);
  const back = parseIcal(ics);
  assert.deepEqual(back.map((r) => [r.start.toISOString().slice(0, 10), r.end.toISOString().slice(0, 10)]), [
    ["2026-12-20", "2026-12-27"],
    ["2027-01-02", "2027-01-03"],
  ]);
  const airbnb = [
    "BEGIN:VCALENDAR",
    "BEGIN:VEVENT",
    "DTSTART;VALUE=DATE:20261101",
    "DTEND;VALUE=DATE:20261105",
    "SUMMARY:Reserved",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "DTSTART:20261110T140000Z",
    "SUMMARY:sans fin",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "DTSTART;VALUE=DATE:20261120",
    "DTEND;VALUE=DATE:20261122",
    "STATUS:CANCELLED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const r = parseIcal(airbnb);
  assert.equal(r.length, 2);
  assert.equal(r[1]!.end.toISOString().slice(0, 10), "2026-11-11");
});

test("iCal : import limité aux adresses publiques (SSRF)", () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.20.0.5", "192.168.1.1", "169.254.169.254", "100.64.0.1", "0.0.0.0", "::1", "fd00::1", "fe80::1", "::ffff:127.0.0.1"]) {
    assert.equal(isPrivateAddress(ip), true, ip);
  }
  for (const ip of ["8.8.8.8", "41.138.1.1", "2a00:1450:4007::1"]) assert.equal(isPrivateAddress(ip), false, ip);
  assert.ok(checkImportUrl("https://www.airbnb.fr/calendar/ical/123.ics?s=abc"));
  for (const u of ["file:///etc/passwd", "https://localhost/x", "http://127.0.0.1/x", "https://user:pw@example.com/x", "https://example.com:8443/x", "http://[::1]/x", "gopher://x", "pas une url"]) {
    assert.equal(checkImportUrl(u), null, u);
  }
});

test("contenus Voyage : traduction langue → en → fr, nettoyage des saisies", () => {
  const row = { name: "Porte du Non-Retour", summary: "Mémorial", translations: { en: { name: "Door of No Return" }, es: { name: "" } } };
  assert.equal(localized("fr", row, "name"), "Porte du Non-Retour");
  assert.equal(localized("en", row, "name"), "Door of No Return");
  assert.equal(localized("es", row, "name"), "Door of No Return");
  assert.equal(localized("ar", row, "summary"), "Mémorial");
  const out = localize("en", row, ["name", "summary"]);
  assert.equal("translations" in out, false);
  assert.deepEqual(cleanTranslations({ en: { name: " X ", evil: "y" }, fr: { name: "z" }, xx: { name: "q" } }, ["name"]), { en: { name: "X" } });
  assert.equal(cleanTranslations({}, ["name"]), null);
  assert.equal(slugify("Cité lacustre de Ganvié !"), "cite-lacustre-de-ganvie");
  assert.equal(checkCover("/images/voyage/ouidah"), "/images/voyage/ouidah");
  assert.equal(checkCover(""), null);
  assert.throws(() => checkCover("https://evil.example/x.png"));
  assert.throws(() => checkCover("/images/../../etc"));
  assert.equal(tripDays(D("2026-12-20"), D("2026-12-26")), 7);
});

test("guide Bénin : identifiants uniques, étapes de circuit toutes résolues, anglais complet", () => {
  const places = BENIN_DESTINATIONS.flatMap((d) => d.places);
  const slugs = [...BENIN_DESTINATIONS.map((d) => d.slug), ...places.map((p) => p.slug)];
  assert.equal(new Set(places.map((p) => p.slug)).size, places.length);
  assert.equal(new Set(BENIN_DESTINATIONS.map((d) => d.slug)).size, BENIN_DESTINATIONS.length);
  for (const c of BENIN_CIRCUITS) {
    for (const s of c.steps) {
      assert.ok(s.day >= 1 && s.day <= c.days, `${c.slug} jour ${s.day}`);
      if (s.place) assert.ok(places.some((p) => p.slug === s.place), s.place);
      if (s.destination) assert.ok(BENIN_DESTINATIONS.some((d) => d.slug === s.destination), s.destination);
    }
  }
  for (const p of places) assert.ok(p.en.summary && p.en.description, p.slug);
  assert.ok(slugs.length > 30);
});

test("e-mails de réservation : chaque événement a sujet et texte dans les 5 langues", () => {
  const base = {
    name: "Awa",
    reference: "SEJ-2026-00001",
    title: "Villa Ouidah",
    checkIn: D("2026-12-20"),
    checkOut: D("2026-12-27"),
    nights: 7,
    guests: 2,
    total: 185000,
    currency: "XOF",
    url: "https://tenant.example/voyage/reservations",
    guest: "Koffi A.",
  };
  for (const lang of ["fr", "en", "es", "pt", "ar"] as const) {
    for (const kind of mail.BOOKING_MAIL_KINDS) {
      const m = mail.bookingEvent(lang, { ...base, kind });
      assert.ok(!m.subject.includes("mail.booking"), `${lang} ${kind} sujet`);
      assert.ok(!m.text.includes("mail.booking"), `${lang} ${kind} texte`);
      assert.ok(m.text.includes("SEJ-2026-00001"));
      assert.ok(!/\{[a-zA-Z]+\}/.test(m.text), `${lang} ${kind} : placeholder non remplacé`);
    }
  }
  const fr = mail.bookingEvent("fr", { ...base, kind: "requested" });
  assert.match(fr.text, /Koffi A\. souhaite séjourner/);
  assert.match(fr.text, /20\/12\/2026/);
});
