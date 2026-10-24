// Langues de l'API : repli des clés, messages d'erreur traduits par
// catalogue, validation, e-mails (anglais + français inchangé), libellés
// stockés en français rendus dans la langue, langue des PDF.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import { API_DICTS, pdfLang, resetErrorPatterns, t, translateError, withLang } from "../src/i18n/i18n";
import { feeLabel, localizeMention, localizePeriod, localizeResponse } from "../src/i18n/labels";
import { translateConstraint } from "../src/common/validation";
import { localizeErrorBody } from "../src/common/all-exceptions.filter";
import * as mail from "../src/mail/templates";
import { translate } from "@hwe/types";

test("repli des clés : langue → en → fr, jamais vide", () => {
  const dicts = { fr: { a: "A fr", b: "B fr" }, en: { a: "A en" }, es: { b: "" } };
  assert.equal(translate(dicts, "es", "a"), "A en"); // es absent → en
  assert.equal(translate(dicts, "es", "b"), "B fr"); // es vide, en absent → fr
  assert.equal(translate(dicts, "ar", "zzz"), "zzz"); // inconnue partout : la clé
  // Dictionnaires de l'API : es/pt/ar vides → anglais
  assert.equal(t("es", "mail.greeting", { name: "Ana" }), "Hello Ana,");
  assert.equal(t("fr", "mail.greeting", { name: "Ana" }), "Bonjour Ana,");
  assert.ok(Object.keys(API_DICTS.fr).length > 200);
});

test("messages d'erreur : exact, gabarit à trous, mots capturés (term.*), fr inchangé", () => {
  resetErrorPatterns();
  assert.equal(translateError("Bail introuvable", "en"), "Lease not found");
  assert.equal(translateError("Bail introuvable", "fr"), "Bail introuvable");
  assert.equal(translateError("Bail introuvable", "pt"), "Lease not found"); // pt → en
  assert.equal(translateError("Ce bien est déjà sous mandat (MAN-2026-00012).", "en"), "This property is already under mandate (MAN-2026-00012).");
  assert.equal(
    translateError("Le justificatif est requis : téléversez une image (JPEG, PNG ou WebP).", "en"),
    "The proof of payment is required: upload an image (JPEG, PNG or WebP).",
  );
  assert.equal(translateError("Message inconnu du catalogue.", "en"), "Message inconnu du catalogue.");
  const body = localizeErrorBody({ statusCode: 404, message: ["Bail introuvable", "Accès refusé"], code: "X" }, "en");
  assert.deepEqual(body, { statusCode: 404, message: ["Lease not found", "Access denied"], code: "X" });
});

test("validation : message dans la langue de la requête, fr identique à l'historique", () => {
  assert.equal(translateConstraint("firstName", "isNotEmpty", "x", "fr"), "« prénom » est requis.");
  assert.equal(translateConstraint("password", "minLength", "password must be longer than or equal to 8 characters", "fr"), "« mot de passe » : 8 caractères minimum.");
  assert.equal(translateConstraint("firstName", "isNotEmpty", "x", "en"), "“first name” is required.");
  assert.equal(translateConstraint("unknownProp", "whitelistValidation", "x", "en"), "Field not allowed: “unknownProp”.");
  assert.equal(withLang("en", () => translateConstraint("email", "isEmail", "x")), "“email”: invalid email address.");
});

test("e-mail en anglais : sujet et corps", () => {
  const m = mail.rentRejected("en", { tenantName: "Ana Diallo", period: { year: 2026, month: 10 }, reason: "montant incomplet" });
  assert.equal(m.subject, "hwe — your rent payment was not approved (October 2026)");
  assert.equal(
    m.text,
    "Hello Ana Diallo,\n\nYour landlord could not confirm receiving your payment for October 2026.\nReason: montant incomplet\n\n" +
      "Check the amount, the number used and the transaction ID, then report the payment again from My rents.\n" +
      "If you are sure you paid, contact your landlord through the messaging.\n\nhwe",
  );
  const v = mail.rentValidated("en", { tenantName: "Ana", period: { year: 2026, month: 10 }, amount: 850, receiptNo: "Q-2026-00001", currency: "EUR" });
  assert.match(v.text, /Your payment of €850\.00 for October 2026 has been confirmed/);
  const s = mail.notice("en", { name: "Moussa", base: "sub.reminderDays", params: { agency: "Immo Plus", n: 7, end: new Date("2026-11-05T10:00:00Z") }, url: "https://x/pro/abonnement" });
  assert.equal(s.subject, "hwe — Immo Plus subscription: ends in 7 days");
  assert.match(s.text, /ends on 05\/11\/2026\./);
});

test("e-mails en français : texte identique à l'historique", () => {
  const r = mail.rentRejected("fr", { tenantName: "Ana Diallo", period: { year: 2026, month: 10 }, reason: "montant incomplet" });
  assert.equal(r.subject, "hwe — votre déclaration de loyer n'a pas été validée (octobre 2026)");
  assert.equal(
    r.text,
    "Bonjour Ana Diallo,\n\nVotre propriétaire n'a pas pu confirmer la réception de votre versement pour octobre 2026.\nMotif : montant incomplet\n" +
      "\nVérifiez le montant, le numéro utilisé et l'identifiant de transaction, puis déclarez à nouveau depuis Mes loyers.\n" +
      "Si vous êtes certain d'avoir payé, contactez votre propriétaire via la messagerie.\n\nhwe",
  );
  const e = mail.leaseExpiry("fr", { name: "Paul", propertyTitle: "T3 Lyon", daysLeft: 7, isOwner: true });
  assert.equal(e.subject, "hwe — le bail de « T3 Lyon » se termine dans 7 jours");
  assert.equal(
    e.text,
    "Bonjour Paul,\n\nLe bail de votre bien « T3 Lyon » arrive à échéance dans 7 jours.\n" +
      "Pensez à préparer le renouvellement, l'état des lieux de sortie ou la remise en location.\n\nhwe",
  );
  const o = mail.ownerInvite("fr", { name: "Awa", agencyName: "Immo Plus", propertyTitles: ["Villa", "T2"], url: "https://x/activer/t" });
  assert.equal(o.subject, "hwe — Immo Plus gère votre bien : activez votre espace");
  assert.match(o.text, /^Bonjour Awa,\n\nImmo Plus gère « Villa », « T2 » sur hwe et a créé votre espace propriétaire\.\n/);
  const n = mail.notice("fr", { name: "Moussa", base: "sub.reminderDays", params: { agency: "Immo Plus", n: 1, end: new Date("2026-11-05T10:00:00Z") }, url: "https://x/pro/abonnement" });
  assert.equal(n.subject, "hwe — abonnement de Immo Plus : fin dans 1 jour");
  assert.equal(
    n.text,
    "Bonjour Moussa,\n\nLa période en cours (essai ou abonnement) de « Immo Plus » se termine le 05/11/2026. Réglez votre abonnement pour continuer sans limite.\n\nhttps://x/pro/abonnement\n\nhwe",
  );
  const m = mail.mandateProposed("fr", { name: "Awa", agencyName: "Immo Plus", propertyTitles: null, url: "u" });
  assert.match(m.text, /Immo Plus vous propose de gérer un ou plusieurs de vos biens\./);
  const i = mail.inquiryReceived("fr", { ownerName: "Paul", propertyTitle: "T3", senderName: null, url: "u" });
  assert.match(i.text, /Un visiteur vous a envoyé une demande pour « T3 »\./);
});

test("libellés stockés en français : honoraires, mentions, périodes", () => {
  assert.equal(feeLabel({ kind: "MANAGEMENT", label: "Honoraires de gestion — octobre 2026 (7.5 %)" }, "en"), "Management fees — October 2026 (7.5%)");
  assert.equal(feeLabel({ kind: "LETTING", label: "Honoraires de mise en location — bail de Ana Diallo" }, "en"), "Letting fees — lease of Ana Diallo");
  assert.equal(
    feeLabel({ kind: "SALE", label: "Honoraires de vente — 5 % de 250 000,00 €", currency: "EUR" }, "en"),
    "Sale fees — 5% of €250,000.00",
  );
  assert.equal(feeLabel({ kind: "MANAGEMENT", label: "Libellé libre" }, "en"), "Libellé libre");
  assert.equal(feeLabel({ kind: "MANAGEMENT", label: "Honoraires de gestion — octobre 2026 (7.5 %)" }, "fr"), "Honoraires de gestion — octobre 2026 (7.5 %)");
  assert.equal(
    localizeMention("Signé par Alice Agent (Immo Plus), mandataire, pour le compte de Paul Martin — mandat MAN-2026-00001", "en"),
    "Signed by Alice Agent (Immo Plus), agent, on behalf of Paul Martin — mandate MAN-2026-00001",
  );
  assert.equal(localizeMention("par Alice Agent (Immo Plus), mandataire de Paul Martin", "en"), "by Alice Agent (Immo Plus), agent for Paul Martin");
  assert.equal(localizePeriod("août 2026", "en"), "August 2026");
  assert.equal(localizePeriod("Régularisation 2025", "en"), "Régularisation 2025");
  const res = localizeResponse(
    { rents: [{ periodLabel: "octobre 2026" }], fees: [{ kind: "LETTING", label: "Honoraires de mise en location — bail de A B", dueDate: new Date() }], lease: { ownerSignatureMention: null } },
    "en",
  ) as { rents: { periodLabel: string }[]; fees: { label: string }[] };
  assert.equal(res.rents[0]!.periodLabel, "October 2026");
  assert.equal(res.fees[0]!.label, "Letting fees — lease of A B");
});

test("PDF : l'arabe sort en anglais (polices standard sans glyphes arabes)", () => {
  assert.equal(pdfLang("ar"), "en");
  assert.equal(pdfLang("es"), "es");
  assert.equal(pdfLang("fr"), "fr");
  assert.equal(t("en", "pdf.receipt.title"), "Rent receipt");
});
