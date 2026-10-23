// Règles de sécurité : réponses assainies, data-URL, e-mails, médias publics.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import { sanitizeResponse } from "../src/common/response-sanitizer.interceptor";
import { assertDataUrl, parseDataUrl, IMAGE_MIME, MAX_AVATAR_BYTES } from "../src/common/upload.util";
import { maskEmail, normalizeEmail } from "../src/common/email.util";
import { mediaIdFromUrl, mediaUrl } from "../src/common/media.util";
import { leasePartyFlags } from "../src/common/lease-party.util";

const PNG_1PX =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

test("aucune clé password/tokenVersion ne sort, même imbriquée", () => {
  const out = sanitizeResponse({
    id: "l1",
    property: { owner: { id: "u1", email: "a@b.c", password: "$2a$10$hash", tokenVersion: 3 } },
    list: [{ password: "x", ok: 1 }],
  }) as any;
  assert.equal(out.property.owner.password, undefined);
  assert.equal(out.property.owner.tokenVersion, undefined);
  assert.equal("password" in out.list[0], false);
  assert.equal(out.list[0].ok, 1);
  assert.equal(JSON.stringify(out).includes("$2a$"), false);
});

test("avatarKey devient une URL publique, la data-URL d'avatar ne sort jamais", () => {
  const out = sanitizeResponse({ id: "u1", avatarKey: "abcdef0123456789" }) as any;
  assert.equal(out.avatarKey, undefined);
  assert.match(out.avatarUrl, /\/api\/media\/avatar\/abcdef0123456789$/);
  const none = sanitizeResponse({ id: "u2", avatarKey: null }) as any;
  assert.equal(none.avatarUrl, null);
  const raw = sanitizeResponse({ id: "u3", avatarUrl: PNG_1PX }) as any;
  assert.equal(raw.avatarUrl, null);
});

test("un média de bien en data-URL est remplacé par son URL", () => {
  const out = sanitizeResponse({ media: [{ id: "cm0abcdefgh1234567890", url: PNG_1PX, position: 0 }] }) as any;
  assert.equal(out.media[0].url, mediaUrl("cm0abcdefgh1234567890"));
});

test("les dates et les tampons sont laissés intacts", () => {
  const d = new Date("2026-10-23T00:00:00Z");
  const out = sanitizeResponse({ at: d, buf: Buffer.from("x") }) as any;
  assert.ok(out.at instanceof Date);
  assert.ok(Buffer.isBuffer(out.buf));
});

test("data-URL : formes valides et invalides", () => {
  assert.ok(parseDataUrl(PNG_1PX));
  assert.equal(parseDataUrl("javascript:alert(1)"), null);
  assert.equal(parseDataUrl("data:image/png;base64,abc"), null); // base64 tronqué
  assert.equal(parseDataUrl("data:image/png;base64,ab$d"), null);
  assert.equal(parseDataUrl("https://example.com/a.png"), null);
  assert.equal(parseDataUrl(PNG_1PX)!.mime, "image/png");
});

test("data-URL : type et taille contrôlés, messages en français", () => {
  assert.doesNotThrow(() => assertDataUrl(PNG_1PX, "photo", { allowed: IMAGE_MIME }));
  assert.throws(() => assertDataUrl("javascript:alert(1)", "photo"), /doit être/);
  assert.throws(
    () => assertDataUrl("data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=", "photo", { allowed: IMAGE_MIME }),
    /non accepté/,
  );
  assert.throws(() => assertDataUrl("data:application/pdf;base64,JVBERg==", "avatar", { allowed: IMAGE_MIME }), /non accepté/);
  const big = "data:image/png;base64," + "A".repeat(Math.ceil((MAX_AVATAR_BYTES * 4) / 3) + 400);
  assert.throws(() => assertDataUrl(big, "avatar", { allowed: IMAGE_MIME, maxBytes: MAX_AVATAR_BYTES }), /dépasse/);
  assert.throws(() => assertDataUrl("", "document"), /requis/);
});

test("e-mails : normalisation et masquage dans les journaux", () => {
  assert.equal(normalizeEmail("  Jean.Dupont@GMAIL.com "), "jean.dupont@gmail.com");
  assert.equal(normalizeEmail(undefined), "");
  assert.equal(maskEmail("jean.dupont@gmail.com"), "j***@g***.com");
  assert.equal(maskEmail(""), "(vide)");
});

test("URL de média : seul un /media/<id> est reconnu (pas l'avatar, pas javascript:)", () => {
  assert.equal(mediaIdFromUrl("https://api.hwe.dkpsolution.tech/api/media/cm1234567890abcdef"), "cm1234567890abcdef");
  assert.equal(mediaIdFromUrl("http://localhost:4005/api/media/cm1234567890abcdef?v=1"), "cm1234567890abcdef");
  assert.equal(mediaIdFromUrl("https://x/api/media/avatar/abcdef0123456789"), null);
  assert.equal(mediaIdFromUrl("javascript:alert(1)"), null);
  assert.equal(mediaIdFromUrl("https://evil.example/a.png"), null);
});

test("rattachement au bail : e-mail vérifié requis, colocataire distingué du titulaire", () => {
  const lease = {
    tenantEmail: "Jean@Gmail.com",
    property: { ownerId: "owner" },
    inquiry: null,
    coTenants: [{ email: "coloc@x.fr" }],
  };
  const verified = new Date();
  assert.deepEqual(leasePartyFlags(lease, { id: "u1", email: "jean@gmail.com", emailVerifiedAt: null }), {
    isOwner: false, isPrincipalTenant: false, isCoTenant: false, isTenant: false,
  });
  const main = leasePartyFlags(lease, { id: "u1", email: "jean@gmail.com", emailVerifiedAt: verified });
  assert.equal(main.isPrincipalTenant, true);
  const co = leasePartyFlags(lease, { id: "u2", email: "COLOC@x.fr", emailVerifiedAt: verified });
  assert.equal(co.isCoTenant, true);
  assert.equal(co.isPrincipalTenant, false);
  assert.equal(co.isTenant, true);
  const owner = leasePartyFlags(lease, { id: "owner", email: "o@x.fr", emailVerifiedAt: null });
  assert.equal(owner.isOwner, true);
  // Auteur de la demande d'origine (même avec une autre adresse)
  const bySender = leasePartyFlags({ ...lease, inquiry: { senderId: "u9" } }, { id: "u9", email: "autre@x.fr", emailVerifiedAt: verified });
  assert.equal(bySender.isPrincipalTenant, true);
});
