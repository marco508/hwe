// Validation (champs inconnus, bornes, e-mails), erreurs Prisma, limitation de débit.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { buildValidationPipe } from "../src/common/validation";
import { toErrorBody } from "../src/common/all-exceptions.filter";
import { FixedWindowLimiter, authRateLimitMiddleware, defaultAuthRules } from "../src/common/rate-limit";
import { isUploadRoute } from "../src/common/body-limits";
import { RegisterDto } from "../src/auth/dto/register.dto";
import { LoginDto } from "../src/auth/dto/login.dto";
import { CreatePropertyDto } from "../src/properties/dto/create-property.dto";
import { UpdatePropertyDto } from "../src/properties/dto/update-property.dto";
import { UpdateLeaseDto } from "../src/leases/dto/lease.dto";
import { emailNotVerified } from "../src/common/email-verified.util";
import { derivePriceDisplay } from "../src/properties/properties.service";

const pipe = buildValidationPipe();
const body = (metatype: any) => ({ type: "body" as const, metatype, data: "" });

async function rejects(value: unknown, metatype: any): Promise<string[]> {
  try {
    await pipe.transform(value, body(metatype));
  } catch (e) {
    assert.ok(e instanceof BadRequestException);
    return (e.getResponse() as { message: string[] }).message;
  }
  assert.fail("validation attendue en échec");
}

const property = {
  title: "Appartement lumineux", description: "Bel appartement", listingType: "RENT",
  propertyType: "APARTMENT", price: 800, surface: 45, rooms: 2, bedrooms: 1, bathrooms: 1,
  addressLine: "1 rue X", city: "Cotonou", postalCode: "00000",
};

test("inscription : e-mail normalisé en minuscules, mot de passe borné à 128", async () => {
  const dto = await pipe.transform(
    { email: "  JEAN@Example.COM ", password: "motdepasse", firstName: "Jean", lastName: "D", role: "TENANT" },
    body(RegisterDto),
  );
  assert.equal(dto.email, "jean@example.com");
  const msgs = await rejects({ email: "a@b.fr", password: "x".repeat(129) }, LoginDto);
  assert.ok(msgs.some((m) => m.includes("128")));
});

test("inscription : rôle ADMIN refusé, champ inconnu refusé (message français)", async () => {
  const msgs = await rejects(
    { email: "a@b.fr", password: "motdepasse", firstName: "A", lastName: "B", role: "ADMIN", isAdmin: true },
    RegisterDto,
  );
  assert.ok(msgs.some((m) => m.includes("Champ non autorisé") && m.includes("isAdmin")));
  assert.ok(msgs.some((m) => m.includes("valeur non reconnue")));
});

test("bien : titre de 100 000 caractères, prix 1e300, javascript: — refusés ou bornés", async () => {
  const long = await rejects({ ...property, title: "x".repeat(100_000) }, CreatePropertyDto);
  assert.ok(long.some((m) => m.includes("120")));
  const huge = await rejects({ ...property, price: 1e300, surface: 1e300 }, CreatePropertyDto);
  assert.ok(huge.length >= 2);
  const ok = await pipe.transform({ ...property, currency: "xof" }, body(CreatePropertyDto));
  assert.equal(ok.currency, "XOF");
  const tooMany = await rejects(
    { ...property, media: Array.from({ length: 21 }, () => ({ url: "data:image/png;base64,AAAA" })) },
    CreatePropertyDto,
  );
  assert.ok(tooMany.some((m) => m.includes("20")), JSON.stringify(tooMany));
});

test("édition de bien : les champs lus en GET et renvoyés tels quels sont tolérés", async () => {
  const dto = await pipe.transform(
    { ...property, id: "p1", ownerId: "u1", owner: { id: "u1" }, createdAt: "x", updatedAt: "y", priceUnit: "MONTHS" },
    body(UpdatePropertyDto),
  );
  assert.equal(dto.title, property.title);
  await rejects({ title: "Appartement", hack: 1 }, UpdatePropertyDto);
});

test("bail : le statut ne se pose plus par PATCH", async () => {
  const msgs = await rejects({ status: "ACTIVE" }, UpdateLeaseDto);
  assert.ok(msgs.some((m) => m.includes("Champ non autorisé") && m.includes("statut")), JSON.stringify(msgs));
});

test("erreurs Prisma : P2002 → 409, P2025 → 404, validation → 400, jamais 500", () => {
  const known = (code: string) =>
    new Prisma.PrismaClientKnownRequestError("x", { code, clientVersion: "5" });
  assert.equal(toErrorBody(known("P2002")).statusCode, 409);
  assert.equal(toErrorBody(known("P2025")).statusCode, 404);
  assert.equal(toErrorBody(known("P2023")).statusCode, 400);
  assert.equal(toErrorBody(new Prisma.PrismaClientValidationError("bad", { clientVersion: "5" })).statusCode, 400);
  assert.equal(
    toErrorBody(new Prisma.PrismaClientUnknownRequestError("invalid byte sequence for encoding \"UTF8\": 0x00", { clientVersion: "5" })).statusCode,
    400,
  );
  assert.equal(toErrorBody(new Error("boom")).statusCode, 500);
  assert.equal(toErrorBody(new Error("boom")).message, "Erreur interne — réessayez plus tard.");
});

test("e-mail non vérifié : 403 avec code EMAIL_NOT_VERIFIED", () => {
  const e = emailNotVerified();
  assert.ok(e instanceof ForbiddenException);
  const b = toErrorBody(e);
  assert.equal(b.statusCode, 403);
  assert.equal(b.code, "EMAIL_NOT_VERIFIED");
  assert.equal(typeof b.message, "string");
});

test("limiteur à fenêtre fixe", () => {
  const l = new FixedWindowLimiter(2, 1000);
  assert.equal(l.hit("k", 0), 0);
  assert.equal(l.hit("k", 10), 0);
  assert.ok(l.hit("k", 20) > 0);
  assert.equal(l.hit("k", 1000), 0); // nouvelle fenêtre
});

function call(mw: ReturnType<typeof authRateLimitMiddleware>, url: string, ip: string, email?: string, method = "POST") {
  let status = 0;
  let nextCalled = false;
  const headers: Record<string, string> = {};
  const res: any = {
    setHeader: (k: string, v: string) => (headers[k] = v),
    status: (s: number) => ((status = s), res),
    json: () => res,
  };
  mw({ method, originalUrl: url, url, ip, body: email ? { email } : {} } as any, res, () => (nextCalled = true));
  return { status, nextCalled, headers };
}

test("anti-brute-force : /auth/me jamais limité ; login limité par e-mail même en changeant d'IP", () => {
  const mw = authRateLimitMiddleware(defaultAuthRules());
  for (let i = 0; i < 200; i++) assert.ok(call(mw, "/api/auth/me", "1.1.1.1", undefined, "GET").nextCalled);
  for (let i = 0; i < 10; i++) assert.ok(call(mw, "/api/auth/login", `10.0.0.${i}`, "Victime@x.fr").nextCalled);
  const blocked = call(mw, "/api/auth/login", "10.0.1.1", "victime@x.fr");
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers["Retry-After"]) > 0);
  // Un autre compte depuis une autre IP n'est pas affecté
  assert.ok(call(mw, "/api/auth/login", "10.0.2.1", "autre@x.fr").nextCalled);
  // Routes non concernées
  assert.ok(call(mw, "/api/properties", "10.0.0.1").nextCalled);
});

test("limite de corps élevée uniquement sur les routes d'upload", () => {
  assert.equal(isUploadRoute("POST", "/api/properties"), true);
  assert.equal(isUploadRoute("PATCH", "/api/properties/abc"), true);
  assert.equal(isUploadRoute("POST", "/api/rents/p1/declare"), true);
  assert.equal(isUploadRoute("POST", "/api/auth/login"), false);
  assert.equal(isUploadRoute("PATCH", "/api/properties/abc/leases/l1"), false);
  assert.equal(isUploadRoute("GET", "/api/properties"), false);
});

test("prix d'affichage : unité la plus courte de la grille, sinon le mois", () => {
  assert.deepEqual(derivePriceDisplay({ listingType: "RENT", price: 800 }), { priceUnit: "MONTHS", displayPrice: 800 });
  assert.deepEqual(
    derivePriceDisplay({ listingType: "RENT", price: 0, pricingRates: [{ unit: "WEEKS", amount: 250 }, { unit: "DAYS", amount: 45 }] }),
    { priceUnit: "DAYS", displayPrice: 45 },
  );
  assert.deepEqual(derivePriceDisplay({ listingType: "SALE", price: 1e5 }), { priceUnit: null, displayPrice: 1e5 });
});
