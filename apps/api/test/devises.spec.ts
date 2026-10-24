// Devises : sources de taux (open.er-api, BCE, statique), parités fixes,
// prix des offres par devise et devise de facturation d'une agence.
import { test } from "node:test";
import assert from "node:assert/strict";
import { finalizeRates, parseEcbXml, parseErApi, staticSnapshot } from "../src/fx/fx-sources";
import { basePrice, billingCurrencyOf, normalizePrices, planOffer } from "../src/subscriptions/pricing";
import { COUNTRY_CURRENCY, SELECTABLE_CURRENCIES, convertWithRates, currencyOfCountry } from "../src/shared/hwe-types";

const ER = {
  result: "success",
  base_code: "EUR",
  time_last_update_unix: Date.UTC(2026, 9, 24) / 1000,
  rates: Object.fromEntries([["EUR", 1], ["USD", 1.12], ["XOF", 650], ["XAF", 600], ["NGN", 1700], ...Array.from({ length: 30 }, (_, i) => [`Q${String.fromCharCode(65 + (i % 26))}${i < 26 ? "A" : "B"}`, 1 + i])]),
};

test("open.er-api : taux lus, date du jour de mise à jour, XOF/XAF forcés à 655,957", () => {
  const s = parseErApi(ER)!;
  assert.equal(s.source, "open.er-api.com");
  assert.equal(s.date, "2026-10-24");
  assert.equal(s.rates.USD, 1.12);
  assert.equal(s.rates.XOF, 655.957);
  assert.equal(s.rates.XAF, 655.957);
  assert.equal(s.rates.EUR, 1);
  // Complété par la table statique (devise absente de la source)
  assert.ok(s.rates.MZN && s.rates.MZN > 0);
});

test("open.er-api : réponse invalide → null (repli BCE)", () => {
  assert.equal(parseErApi({ result: "error" }), null);
  assert.equal(parseErApi({ ...ER, base_code: "USD" }), null);
  assert.equal(parseErApi(null), null);
});

test("BCE : XML eurofxref lu, parités fixes réimposées", () => {
  const xml = `<gesmes:Envelope><Cube><Cube time='2026-10-23'>${["USD 1.1200", "JPY 169.5", "GBP 0.85", "CHF 0.93", "SEK 11.1", "NOK 11.8", "DKK 7.46", "PLN 4.24", "CZK 24.5", "HUF 390", "TRY 46"].map((x) => `<Cube currency='${x.split(" ")[0]}' rate='${x.split(" ")[1]}'/>`).join("")}</Cube></Cube></gesmes:Envelope>`;
  const s = parseEcbXml(xml)!;
  assert.equal(s.source, "ecb");
  assert.equal(s.date, "2026-10-23");
  assert.equal(s.rates.JPY, 169.5);
  assert.equal(s.rates.XOF, 655.957);
  assert.equal(parseEcbXml("<html>panne</html>"), null);
});

test("table statique : dernier repli, toutes les devises proposées convertibles", () => {
  const s = staticSnapshot();
  assert.equal(s.source, "static");
  for (const c of SELECTABLE_CURRENCIES) assert.ok(s.rates[c]! > 0, c);
  for (const c of ["MZN", "BIF", "DJF", "KMF", "MRU", "CVE", "SLE", "LRD", "GMD", "SDG", "SSP", "SOS", "ERN", "LYD", "ZMW", "MWK", "BWP", "LSL", "SZL", "SCR", "STN", "BRL", "MXN", "ARS", "COP", "CLP", "PEN", "CNY", "JPY", "INR", "AED", "SAR", "QAR", "TRY", "RUB", "SEK", "NOK", "DKK", "PLN", "AUD", "NZD"]) {
    assert.ok(SELECTABLE_CURRENCIES.includes(c), `${c} proposée`);
  }
  assert.equal(finalizeRates({ XOF: 1 }).XOF, 655.957);
  assert.equal(Math.round(convertWithRates(100, "EUR", "XOF", s.rates)!), 65596);
  assert.equal(convertWithRates(1, "EUR", "ZZZ", s.rates), null);
});

test("pays → devise : table complète, Sénégal en XOF, repli EUR", () => {
  assert.ok(Object.keys(COUNTRY_CURRENCY).length >= 245);
  assert.equal(currencyOfCountry("SN"), "XOF");
  assert.equal(currencyOfCountry("cm"), "XAF");
  assert.equal(currencyOfCountry("BR"), "BRL");
  assert.equal(currencyOfCountry("MZ"), "MZN");
  assert.equal(currencyOfCountry("??"), "EUR");
  assert.equal(currencyOfCountry(null, "USD"), "USD");
});

test("devise de facturation : choisie par l'agence, sinon celle de son pays", () => {
  assert.deepEqual(billingCurrencyOf({ billingCurrency: "XOF", country: "FR" }), { currency: "XOF", source: "AGENCY" });
  assert.deepEqual(billingCurrencyOf({ billingCurrency: null, country: "SN" }), { currency: "XOF", source: "COUNTRY" });
  assert.deepEqual(billingCurrencyOf({ country: "FR" }), { currency: "EUR", source: "COUNTRY" });
});

test("prix par devise : prix exact s'il existe, sinon EUR (facturé en EUR)", () => {
  const plan = { monthlyPrice: 19, currency: "EUR", prices: normalizePrices([{ currency: "eur", monthlyPrice: 19 }, { currency: "XOF", monthlyPrice: 12500 }]) };
  assert.deepEqual(planOffer(plan, "XOF"), { currency: "XOF", monthlyPrice: 12500, exact: true, requested: "XOF" });
  assert.deepEqual(planOffer(plan, "NGN"), { currency: "EUR", monthlyPrice: 19, exact: false, requested: "NGN" });
  assert.deepEqual(planOffer(plan, "EUR"), { currency: "EUR", monthlyPrice: 19, exact: true, requested: "EUR" });
  // Offre sans prix EUR : prix de base
  assert.deepEqual(planOffer({ monthlyPrice: 5000, currency: "XAF", prices: [{ currency: "XAF", monthlyPrice: 5000 }] }, "USD"), {
    currency: "XAF",
    monthlyPrice: 5000,
    exact: false,
    requested: "USD",
  });
});

test("prix normalisés : une ligne par devise, EUR en tête, prix de base = EUR", () => {
  const n = normalizePrices([{ currency: "xof", monthlyPrice: 1 }, { currency: "XOF", monthlyPrice: 12500.456 }, { currency: "EUR", monthlyPrice: 19 }, { currency: "BRL", monthlyPrice: 99 }]);
  assert.deepEqual(n.map((p) => p.currency), ["EUR", "BRL", "XOF"]);
  assert.equal(n.find((p) => p.currency === "XOF")!.monthlyPrice, 12500.46);
  assert.deepEqual(basePrice(n), { currency: "EUR", monthlyPrice: 19 });
  assert.deepEqual(basePrice([{ currency: "XOF", monthlyPrice: 5 }]), { currency: "XOF", monthlyPrice: 5 });
  assert.equal(basePrice([]), null);
});
