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
import { SEED_COUNTRIES } from "../src/voyage/seed";
import { VOYAGE_COUNTRIES } from "../../../packages/types/src/voyage";
import { easterSunday, eventOccurrences, isValidEventRule, nextOccurrence } from "../../../packages/types/src/voyage-events";
import * as fs from "node:fs";
import * as path from "node:path";

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

test("guides de départ : un par pays de VOYAGE_COUNTRIES, identifiants uniques, circuits résolus, 5 langues complètes", () => {
  assert.deepEqual(
    SEED_COUNTRIES.map((c) => c.guide.country),
    [...VOYAGE_COUNTRIES],
  );
  // Les slugs sont uniques dans toute la base, tous pays confondus.
  const allDest = SEED_COUNTRIES.flatMap((c) => c.destinations.map((d) => d.slug));
  const allPlaces = SEED_COUNTRIES.flatMap((c) => c.destinations.flatMap((d) => d.places.map((p) => p.slug)));
  const allCircuits = SEED_COUNTRIES.flatMap((c) => c.circuits.map((x) => x.slug));
  for (const [what, list] of [["destinations", allDest], ["lieux", allPlaces], ["circuits", allCircuits]] as const) {
    const dup = list.filter((x, i) => list.indexOf(x) !== i);
    assert.deepEqual(dup, [], `${what} en double`);
  }
  const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  for (const x of [...allDest, ...allPlaces, ...allCircuits]) assert.match(x, SLUG);

  for (const { guide, destinations, circuits, i18n } of SEED_COUNTRIES) {
    const cc = guide.country;
    const places = destinations.flatMap((d) => d.places);
    assert.ok(guide.intro && guide.sections.length >= 6, `${cc} guide`);
    assert.equal(guide.en.sections.length, guide.sections.length, `${cc} en rubriques`);
    assert.ok(destinations.length >= 4, `${cc} destinations`);
    assert.ok(places.length >= 12, `${cc} lieux`);
    for (const d of destinations) {
      assert.ok(Math.abs(d.lat) <= 90 && Math.abs(d.lng) <= 180, `${cc} ${d.slug} coordonnées`);
      assert.ok(d.places.length >= 1, `${cc} ${d.slug} sans lieu`);
      if (d.cover) assert.equal(checkCover(d.cover), d.cover, `${cc} ${d.slug} image`);
      assert.ok(d.en.summary && d.en.description, `${cc} ${d.slug} en`);
    }
    for (const c of circuits) {
      for (const st of c.steps) {
        assert.ok(st.day >= 1 && st.day <= c.days, `${c.slug} jour ${st.day}`);
        if (st.place) assert.ok(places.some((p) => p.slug === st.place), `${c.slug} → ${st.place}`);
        if (st.destination) assert.ok(destinations.some((d) => d.slug === st.destination), `${c.slug} → ${st.destination}`);
        if (st.note) assert.ok(st.noteEn, `${c.slug} note sans anglais`);
      }
    }
    for (const p of places) assert.ok(p.en.summary && p.en.description, `${cc} ${p.slug} en`);
    // es, pt, ar : tout le guide traduit (mêmes identifiants, mêmes rubriques).
    for (const lang of ["es", "pt", "ar"] as const) {
      const tr = i18n[lang];
      assert.ok(tr, `${cc} ${lang} absent`);
      assert.equal(tr.guide.sections.length, guide.sections.length, `${cc} ${lang} rubriques`);
      for (const d of destinations) assert.ok(tr.destinations[d.slug]?.summary, `${cc} ${lang} ${d.slug}`);
      for (const p of places) assert.ok(tr.places[p.slug]?.description, `${cc} ${lang} ${p.slug}`);
      for (const c of circuits) assert.ok(tr.circuits[c.slug]?.title, `${cc} ${lang} ${c.slug}`);
      circuits.forEach((c) =>
        c.steps.forEach((st, k) => {
          if (st.note) assert.ok(tr.stepNotes[`${c.slug}:${k}`], `${cc} ${lang} note ${c.slug}:${k}`);
        }),
      );
    }
  }
});

test("fêtes : dates calculées (fixe, Pâques, hégire, n-ième jour, période)", () => {
  assert.equal(easterSunday(2026).toISOString().slice(0, 10), "2026-04-05");
  assert.equal(easterSunday(2027).toISOString().slice(0, 10), "2027-03-28");
  assert.equal(easterSunday(2030).toISOString().slice(0, 10), "2030-04-21");
  const y = (r: Parameters<typeof eventOccurrences>[0], from = "2026-01-01", to = "2026-12-31") => eventOccurrences(r, from, to);
  assert.deepEqual(y({ type: "fixed", month: 8, day: 1 }), [{ start: "2026-08-01", end: "2026-08-01" }]);
  assert.deepEqual(y({ type: "fixed", month: 2, day: 29 }), []); // 2026 n'est pas bissextile
  assert.deepEqual(y({ type: "easter", offset: 1 }), [{ start: "2026-04-06", end: "2026-04-06" }]);
  assert.deepEqual(y({ type: "easter", offset: 39 }), [{ start: "2026-05-14", end: "2026-05-14" }]);
  assert.deepEqual(y({ type: "easter", offset: 50 }), [{ start: "2026-05-25", end: "2026-05-25" }]);
  // Hégire (Umm al-Qura) : Aïd el-Fitr 1447 = 20 mars 2026, Tabaski 1447 = 27 mai 2026.
  assert.deepEqual(y({ type: "hijri", month: 10, day: 1 }), [{ start: "2026-03-20", end: "2026-03-20", approx: true }]);
  assert.deepEqual(y({ type: "hijri", month: 12, day: 10 }), [{ start: "2026-05-27", end: "2026-05-27", approx: true }]);
  // Une date hégire peut tomber deux fois dans la même année grégorienne (2033 : Aïd el-Fitr le 3 janvier et le 23 décembre).
  assert.equal(y({ type: "hijri", month: 10, day: 1 }, "2033-01-01", "2033-12-31").length, 2);
  assert.deepEqual(y({ type: "nth-weekday", month: 8, weekday: 6, nth: 1 }), [{ start: "2026-08-01", end: "2026-08-01" }]);
  assert.deepEqual(y({ type: "nth-weekday", month: 11, weekday: 5, nth: -1 }), [{ start: "2026-11-27", end: "2026-11-27" }]);
  assert.deepEqual(y({ type: "nth-weekday", month: 2, weekday: 0, nth: 5 }), []); // pas de 5e dimanche en février 2026
  // Période à cheval sur deux années, durée sur plusieurs jours, occurrence en cours.
  assert.deepEqual(y({ type: "period", from: 12, to: 1 }, "2026-10-26", "2027-10-26"), [{ start: "2026-12-01", end: "2027-01-31", period: true }]);
  assert.deepEqual(y({ type: "fixed", month: 1, day: 8, days: 3 }, "2027-01-09", "2027-01-09"), [{ start: "2027-01-08", end: "2027-01-10" }]);
  assert.deepEqual(nextOccurrence({ type: "fixed", month: 1, day: 10 }, "2026-10-26"), { start: "2027-01-10", end: "2027-01-10" });
  assert.equal(isValidEventRule({ type: "fixed", month: 13, day: 1 }), false);
  assert.equal(isValidEventRule({ type: "hijri", month: 9, day: 1, days: 30 }), true);
  assert.equal(isValidEventRule({ type: "other" }), false);
});

test("fêtes de départ : règles valides, liens résolus, sources, 5 langues complètes, une date dans les 3 ans", () => {
  const slugs = SEED_COUNTRIES.flatMap((c) => c.events.map((e) => e.slug));
  assert.equal(new Set(slugs).size, slugs.length, "slug d'événement en double");
  for (const c of SEED_COUNTRIES) {
    const dest = new Set(c.destinations.map((d) => d.slug));
    const places = new Set(c.destinations.flatMap((d) => d.places.map((p) => p.slug)));
    for (const e of c.events) {
      const w = `${c.guide.country} ${e.slug}`;
      assert.ok(isValidEventRule(e.rule), `${w} : règle invalide`);
      assert.ok(nextOccurrence(e.rule, "2026-10-26"), `${w} : aucune date`);
      if (e.destination) assert.ok(dest.has(e.destination), `${w} : destination ${e.destination}`);
      if (e.place) assert.ok(places.has(e.place), `${w} : lieu ${e.place}`);
      assert.ok(e.sources.length > 0 && e.sources.every((s) => /^https?:\/\//.test(s)), `${w} : sources`);
      for (const tr of [e.en, e.i18n.es, e.i18n.pt, e.i18n.ar]) {
        assert.ok(tr?.name?.trim() && tr.summary?.trim() && tr.description?.trim(), `${w} : traduction incomplète`);
        for (const k of ["tips", "where", "dateNote"] as const) if (e[k]) assert.ok(tr[k]?.trim(), `${w} : ${k} non traduit`);
      }
    }
  }
});

test("photos du contenu de départ : chaque image existe (480 et 1200) et a son crédit", () => {
  // HWE_ROOT : dépôt complet quand les tests tournent sur une copie sans les images.
  const root = process.env.HWE_ROOT ?? path.resolve(__dirname, "../../..");
  const dirs = ["apps/tenant-web/public/images/voyage", "apps/landing/public/images/voyage"].map((d) => path.join(root, d));
  const credits = fs.readFileSync(path.join(root, "apps/tenant-web/public/images/CREDITS.md"), "utf8");
  const covers = SEED_COUNTRIES.flatMap((c) => [
    ...c.destinations.flatMap((d) => [d.cover, ...d.places.map((p) => p.cover)]),
    ...c.circuits.map((x) => x.cover),
    ...c.events.map((e) => e.cover),
  ]).filter((x): x is string => !!x);
  for (const cover of new Set(covers)) {
    const name = cover.replace("/images/voyage/", "");
    for (const size of [480, 1200]) {
      assert.ok(dirs.some((d) => fs.existsSync(path.join(d, `${name}-${size}.webp`))), `${name}-${size}.webp absent`);
    }
    assert.ok(credits.includes(`voyage/${name}-{480,1200}.webp`), `crédit absent : ${name}`);
  }
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
