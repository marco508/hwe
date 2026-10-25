// Performance, 2e passe : mots de passe (bcrypt natif), fichiers hors base,
// cache des PDF, recherche indexée des baux d'un locataire.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import { mkdtempSync, rmSync, readdirSync, existsSync, utimesSync, writeFileSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import type { AddressInfo } from "net";
import * as bcryptjs from "bcryptjs";
import { hashPassword, verifyPassword, DUMMY_HASH } from "../src/common/password";
import {
  fileStoreConfig,
  filePath,
  isFileRef,
  makeFileRef,
  parseFileRef,
  persistPrivateFile,
  persistPublicFile,
  refToDataUrl,
  resetFileStoreConfig,
  storeBytes,
  verifyStored,
  BINARY_COLUMNS,
} from "../src/common/file-store";
import { sanitizeResponse, inlineFileRefs, type FileRefSlot } from "../src/common/response-sanitizer.interceptor";
import { MediaController, mediaFastPath } from "../src/media/media.controller";
import { mediaRefCache, mediaCache } from "../src/common/media-cache";
import { gcFiles, referencedHashes, type RawDb } from "../src/media/media-files";
import { pdfCacheKey, renderPdf, pdfStats, pdfCache } from "../src/common/pdf-render";
import { candidateTenantLeaseIds } from "../src/leases/lease-db.util";
import { DocumentsService } from "../src/documents/documents.service";
import { UsersService } from "../src/users/users.service";

const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4, 5, 6, 7, 8, 0xff, 0xd9]);
const jpegDataUrl = (buf = JPEG) => `data:image/jpeg;base64,${buf.toString("base64")}`;
const PDF = Buffer.from("%PDF-1.4\n%secret\n%%EOF\n");
const pdfDataUrl = `data:application/pdf;base64,${PDF.toString("base64")}`;

function withMediaDir(dbCopy: "0" | "1" = "1"): string {
  const dir = mkdtempSync(path.join(tmpdir(), "hwe-media-"));
  process.env.MEDIA_DIR = dir;
  process.env.MEDIA_DB_COPY = dbCopy;
  process.env.MEDIA_ALLOW_NON_MOUNT = "1";
  resetFileStoreConfig();
  return dir;
}
function noMediaDir() {
  delete process.env.MEDIA_DIR;
  delete process.env.MEDIA_DB_COPY;
  resetFileStoreConfig();
}

// ───────────────────────── Mots de passe ─────────────────────────

test("bcrypt natif : les hachages bcryptjs existants ($2a$, coût 10) restent valides", async () => {
  // Hachage réel produit par bcryptjs (comptes de charge, mot de passe « Charge-Test-2026 »).
  const legacy = "$2a$10$jMjLsVijdNvzn3nvfo2/duEMbIfMqYuOqD9tvBxw4wKx4hhDktqtm";
  assert.equal(await verifyPassword("Charge-Test-2026", legacy), true);
  assert.equal(await verifyPassword("charge-test-2026", legacy), false);
  // Accents, emoji, longueur > 72 octets : mêmes règles que bcryptjs.
  for (const pw of ["Mot-de-passe-éàç-Ünïcode", "clé🔑sécurisée", "x".repeat(80) + "fin", "court"]) {
    const h = bcryptjs.hashSync(pw, 4);
    assert.ok(h.startsWith("$2a$04$"));
    assert.equal(await verifyPassword(pw, h), true, pw);
    assert.equal(await verifyPassword(pw + "!", h), pw.length > 72 ? true : false, pw);
  }
});

test("bcrypt natif : un hachage neuf ($2b$) est vérifiable par bcryptjs (retour arrière possible)", async () => {
  const h = await hashPassword("Retour-Arrière-2026", 4);
  assert.match(h, /^\$2b\$04\$/);
  assert.equal(bcryptjs.compareSync("Retour-Arrière-2026", h), true);
  assert.equal(bcryptjs.compareSync("autre", h), false);
  assert.equal(await verifyPassword("Retour-Arrière-2026", h), true);
  assert.match(DUMMY_HASH, /^\$2b\$10\$/);
});

test("bcrypt natif : hachage absent ou mal formé → false, jamais d'exception", async () => {
  for (const bad of [null, undefined, "", "pas-un-hash", "$2a$10$tropcourt", "$5$rounds=1$abc"]) {
    assert.equal(await verifyPassword("x", bad as string), false);
  }
});

test("bcrypt natif : la boucle d'événements reste libre pendant les hachages", async () => {
  let ticks = 0;
  const timer = setInterval(() => ticks++, 5);
  const t0 = Date.now();
  await Promise.all(Array.from({ length: 6 }, (_, i) => hashPassword(`pw-${i}`, 10)));
  const elapsed = Date.now() - t0;
  clearInterval(timer);
  // Avec bcryptjs (JS pur), aucun tick n'aurait lieu pendant chaque hachage.
  assert.ok(ticks >= Math.floor(elapsed / 5) * 0.5, `ticks=${ticks} en ${elapsed} ms`);
});

// ───────────────────────── Stockage fichiers ─────────────────────────

test("stockage : écriture adressée par le contenu, dédoublonnée, vérifiable", async () => {
  const dir = withMediaDir();
  try {
    const ref = await storeBytes(JPEG, "image/jpeg");
    const again = await storeBytes(JPEG, "image/jpeg");
    assert.deepEqual(again, ref);
    const p = filePath(ref.sha256)!;
    assert.ok(p.startsWith(dir) && existsSync(p));
    assert.equal(path.basename(p), ref.sha256);
    assert.equal(readdirSync(path.dirname(p)).length, 1); // pas de .tmp résiduel
    assert.equal(await verifyStored(ref), true);
    const key = makeFileRef(ref);
    assert.ok(isFileRef(key));
    assert.deepEqual(parseFileRef(key), ref);
    assert.equal(await refToDataUrl(key), jpegDataUrl());
    // Référence forgée / chemin : refusés.
    assert.equal(parseFileRef("hwef:image/svg+xml:" + "a".repeat(64) + ":1"), null);
    assert.equal(parseFileRef("hwef:image/jpeg:../../etc/passwd:1"), null);
    assert.equal(filePath("../x"), null);
  } finally {
    rmSync(dir, { recursive: true, force: true });
    noMediaDir();
  }
});

test("stockage : copie en base conservée par défaut (MEDIA_DB_COPY=1), référence seule avec MEDIA_DB_COPY=0", async () => {
  noMediaDir();
  assert.deepEqual(await persistPublicFile(jpegDataUrl()), { value: jpegDataUrl(), fileKey: null });
  assert.equal(await persistPrivateFile(pdfDataUrl), pdfDataUrl);

  let dir = withMediaDir("1");
  try {
    const pub = await persistPublicFile(jpegDataUrl());
    assert.equal(pub.value, jpegDataUrl()); // octets toujours en base
    assert.ok(isFileRef(pub.fileKey));
    assert.equal(await persistPrivateFile(pdfDataUrl), pdfDataUrl);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  dir = withMediaDir("0");
  try {
    const pub = await persistPublicFile(jpegDataUrl());
    assert.ok(isFileRef(pub.value) && pub.value === pub.fileKey);
    const priv = await persistPrivateFile(pdfDataUrl);
    assert.ok(isFileRef(priv));
    assert.equal(await refToDataUrl(priv!), pdfDataUrl);
    assert.equal(await persistPrivateFile(null), null);
  } finally {
    rmSync(dir, { recursive: true, force: true });
    noMediaDir();
  }
});

test("stockage : MEDIA_DIR non inscriptible → repli base, sans erreur", async () => {
  // Parent = fichier ordinaire : répertoire impossible à créer (ENOTDIR).
  const f = path.join(mkdtempSync(path.join(tmpdir(), "hwe-nodir-")), "fichier");
  writeFileSync(f, "x");
  process.env.MEDIA_DIR = path.join(f, "media");
  resetFileStoreConfig();
  assert.equal(fileStoreConfig().dir, null);
  assert.equal((await persistPublicFile(jpegDataUrl())).fileKey, null);
  noMediaDir();
});

// ───────────────────────── Photos publiques : fichier puis repli base ─────────────────────────

async function serve(ctrl: MediaController) {
  // express : dépendance de @nestjs/platform-express
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const express = require(require.resolve("express", { paths: [require.resolve("@nestjs/platform-express")] }));
  const app = express();
  app.use(mediaFastPath);
  const wrap = (fn: (k: string, req: any, res: any) => Promise<unknown>) => (req: any, res: any) =>
    fn(req.params.k, req, res).catch((e: any) => res.status(e?.status ?? 500).end());
  app.get("/api/media/avatar/:k", wrap((k, q, r) => ctrl.avatar(k, q, r)));
  app.get("/api/media/agency/:k", wrap((k, q, r) => ctrl.agencyLogo(k, q, r)));
  app.get("/api/media/:k", wrap((k, q, r) => ctrl.media(k, q, r)));
  const srv = app.listen(0);
  await new Promise((r) => srv.once("listening", r));
  const base = `http://127.0.0.1:${(srv.address() as AddressInfo).port}/api`;
  return { base, close: () => new Promise((r) => srv.close(r)) };
}

test("photo publique : lue sur le volume en priorité, repli base si le fichier manque", async () => {
  const dir = withMediaDir();
  mediaRefCache.delete("mediaFile0001");
  mediaCache.delete("m-mediaFile0001");
  const other = Buffer.concat([JPEG, Buffer.from("autre")]);
  const ref = await storeBytes(other, "image/jpeg");
  const calls: string[] = [];
  const row = { fileKey: makeFileRef(ref) as string | null, url: jpegDataUrl() };
  const prisma: any = {
    propertyMedia: {
      findUnique: async ({ where, select }: any) => {
        calls.push(Object.keys(select).join(","));
        return where.id === "mediaFile0001" ? (select.url ? { url: row.url } : { fileKey: row.fileKey }) : null;
      },
    },
  };
  const { base, close } = await serve(new MediaController(prisma));
  try {
    let r = await fetch(`${base}/media/mediaFile0001`);
    assert.equal(r.status, 200);
    assert.equal(r.headers.get("content-type"), "image/jpeg");
    assert.equal(r.headers.get("cache-control"), "public, max-age=31536000, immutable");
    const etag = r.headers.get("etag")!;
    assert.equal(etag, `"${ref.sha256.slice(0, 32)}"`);
    assert.deepEqual(Buffer.from(await r.arrayBuffer()), other); // contenu du FICHIER
    assert.deepEqual(calls, ["fileKey"]); // jamais la colonne lourde

    r = await fetch(`${base}/media/mediaFile0001`, { headers: { "If-None-Match": etag } });
    assert.equal(r.status, 304);
    assert.deepEqual(calls, ["fileKey"]); // référence en cache mémoire

    // Voie rapide (hors chaîne Nest) : mêmes octets et en-têtes, aucune requête SQL.
    r = await fetch(`${base}/media/mediaFile0001`);
    assert.equal(r.status, 200);
    assert.equal(r.headers.get("x-frame-options"), "DENY");
    assert.equal(r.headers.get("x-content-type-options"), "nosniff");
    assert.equal(r.headers.get("etag"), etag);
    assert.deepEqual(Buffer.from(await r.arrayBuffer()), other);
    assert.deepEqual(calls, ["fileKey"]);

    // Fichier disparu du volume → contenu de la base, sans erreur.
    rmSync(filePath(ref.sha256)!);
    r = await fetch(`${base}/media/mediaFile0001`);
    assert.equal(r.status, 200);
    assert.deepEqual(Buffer.from(await r.arrayBuffer()), JPEG);
    assert.ok(calls.includes("url"));

    // Ligne sans référence (pas encore copiée) : base directement.
    row.fileKey = null;
    mediaRefCache.delete("mediaFile0001");
    mediaCache.delete("m-mediaFile0001");
    r = await fetch(`${base}/media/mediaFile0001`);
    assert.equal(r.status, 200);
    assert.deepEqual(Buffer.from(await r.arrayBuffer()), JPEG);

    assert.equal((await fetch(`${base}/media/inconnu00001`)).status, 404);
  } finally {
    await close();
    rmSync(dir, { recursive: true, force: true });
    noMediaDir();
  }
});

test("médias publics : un PDF (document privé) n'est jamais servi, même référencé", async () => {
  const dir = withMediaDir("0");
  try {
    const ref = await storeBytes(PDF, "application/pdf");
    const key = makeFileRef(ref);
    const prisma: any = {
      propertyMedia: { findUnique: async ({ select }: any) => (select.url ? { url: key } : { fileKey: key }) },
      user: { findUnique: async ({ select }: any) => (select.avatarUrl ? { avatarUrl: pdfDataUrl } : { avatarFileKey: key }) },
      agency: { findUnique: async ({ select }: any) => (select.logoDataUrl ? { logoDataUrl: key } : { logoFileKey: null }) },
    };
    mediaRefCache.delete("pdfMedia0001");
    const { base, close } = await serve(new MediaController(prisma));
    try {
      assert.equal((await fetch(`${base}/media/pdfMedia0001`)).status, 404);
      assert.equal((await fetch(`${base}/media/avatar/abcdefgh1234`)).status, 404);
      assert.equal((await fetch(`${base}/media/agency/abcdefgh1234`)).status, 404);
    } finally {
      await close();
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
    noMediaDir();
  }
});

// ───────────────────────── Documents privés ─────────────────────────

test("documents privés : référence remplacée par la data-URL dans la réponse autorisée, jamais ailleurs", async () => {
  const dir = withMediaDir("0");
  try {
    const key = (await persistPrivateFile(pdfDataUrl))!;
    const refs: FileRefSlot[] = [];
    const out = sanitizeResponse(
      {
        docs: [{ id: "d1", fileUrl: key }],
        ticket: { photoDataUrl: key },
        rent: { proofDataUrl: key },
        // Une référence tapée dans un champ libre n'est JAMAIS résolue.
        message: { content: key, note: key },
        media: [{ id: "cm0abcdefgh1234567890", url: key, position: 0, fileKey: key }],
        user: { id: "u1", avatarUrl: key, avatarFileKey: key },
      },
      0,
      refs,
    ) as any;
    await inlineFileRefs(refs);
    assert.equal(out.docs[0].fileUrl, pdfDataUrl);
    assert.equal(out.ticket.photoDataUrl, pdfDataUrl);
    assert.equal(out.rent.proofDataUrl, pdfDataUrl);
    assert.equal(out.message.content, key);
    assert.equal(out.message.note, key);
    assert.match(out.media[0].url, /\/api\/media\/cm0abcdefgh1234567890$/);
    assert.equal("fileKey" in out.media[0], false);
    assert.equal(out.user.avatarUrl, null);
    assert.equal("avatarFileKey" in out.user, false);
    // Fichier manquant : null, jamais la référence.
    rmSync(filePath(parseFileRef(key)!.sha256)!);
    const refs2: FileRefSlot[] = [];
    const o2 = sanitizeResponse({ fileUrl: key }, 0, refs2) as any;
    await inlineFileRefs(refs2);
    assert.equal(o2.fileUrl, null);
  } finally {
    rmSync(dir, { recursive: true, force: true });
    noMediaDir();
  }
});

test("documents privés : contrôle d'accès inchangé (refus avant toute lecture, fichier écrit seulement si autorisé)", async () => {
  const dir = withMediaDir("0");
  try {
    let reads = 0;
    const prisma: any = {
      propertyDocument: {
        findMany: async () => {
          reads++;
          return [{ id: "d1", fileUrl: "x" }];
        },
        create: async ({ data }: any) => ({ id: "d2", ...data }),
      },
    };
    const deny: any = {
      assert: async () => {
        const { ForbiddenException } = await import("@nestjs/common");
        throw new ForbiddenException("Accès refusé");
      },
    };
    const svc = new DocumentsService(prisma, deny);
    await assert.rejects(() => svc.list("p1", "intrus"), /Accès refusé/);
    await assert.rejects(() => svc.create("p1", "intrus", { name: "x", documentType: "OTHER", fileUrl: pdfDataUrl } as any), /Accès refusé/);
    assert.equal(reads, 0);
    assert.equal(readdirSync(dir).length, 0); // rien écrit pour un refus

    const allow: any = { assert: async () => ({}) };
    const ok = new DocumentsService(prisma, allow);
    const created: any = await ok.create("p1", "proprio", { name: "Bail", documentType: "OTHER", fileUrl: pdfDataUrl } as any);
    assert.ok(isFileRef(created.fileUrl));
    assert.equal(created.mimeType, "application/pdf");

    // Pièces d'identité : toujours filtrées par le titulaire.
    let where: any = null;
    const users = new UsersService({ userDocument: { findMany: async (a: any) => ((where = a.where), []) } } as any);
    await users.listDocuments("moi");
    assert.deepEqual(where, { userId: "moi" });
  } finally {
    rmSync(dir, { recursive: true, force: true });
    noMediaDir();
  }
});

// ───────────────────────── Ménage des orphelins ─────────────────────────

test("ménage : supprime seulement les fichiers non référencés et anciens", async () => {
  const dir = withMediaDir("0");
  try {
    const kept = await storeBytes(Buffer.from("garde"), "image/jpeg");
    const old = await storeBytes(Buffer.from("orphelin-ancien"), "image/png");
    const young = await storeBytes(Buffer.from("orphelin-recent"), "image/webp");
    const t = new Date(Date.now() - 3 * 24 * 3600_000);
    utimesSync(filePath(old.sha256)!, t, t);
    utimesSync(filePath(kept.sha256)!, t, t);
    mkdirSync(path.join(dir, "zz"), { recursive: true });
    writeFileSync(path.join(dir, "zz", "pas-un-hash"), "x");
    const db: RawDb = {
      $queryRawUnsafe: async (sql: string) => (/"Ticket".*"photoDataUrl"/s.test(sql) && sql.includes("LIKE 'hwef:%'") ? [{ v: makeFileRef(kept) }] : []) as any,
      $executeRawUnsafe: async () => 0,
    };
    assert.ok((await referencedHashes(db)).has(kept.sha256));
    const dry = await gcFiles(db, { apply: false });
    assert.equal(dry.orphans, 2);
    assert.equal(dry.removed, 0);
    const st = await gcFiles(db, { apply: true });
    assert.equal(st.removed, 1);
    assert.equal(st.young, 1);
    assert.ok(existsSync(filePath(kept.sha256)!));
    assert.ok(!existsSync(filePath(old.sha256)!));
    assert.ok(existsSync(filePath(young.sha256)!));
    // Erreur de lecture de la base : aucun fichier supprimé.
    const broken: RawDb = { $queryRawUnsafe: async () => { throw new Error("db down"); }, $executeRawUnsafe: async () => 0 };
    await assert.rejects(() => gcFiles(broken, { apply: true, graceMs: 0 }));
    assert.ok(existsSync(filePath(young.sha256)!));
    // Toutes les colonnes binaires sont couvertes (source unique).
    assert.deepEqual(
      BINARY_COLUMNS.map((c) => `${c.table}.${c.column}`).sort(),
      ["Agency.logoDataUrl", "InsuranceCertificate.fileUrl", "PropertyDocument.fileUrl", "PropertyMedia.url", "RentPeriod.proofDataUrl", "Ticket.photoDataUrl", "User.avatarUrl", "UserDocument.fileUrl"],
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
    noMediaDir();
  }
});

// ───────────────────────── PDF ─────────────────────────

const receipt = (over: Record<string, unknown> = {}) =>
  ({
    lang: "ar",
    receiptNo: "HWE-2026-00042",
    paidAt: new Date("2026-09-05T10:00:00Z"),
    periodLabel: "سبتمبر 2026",
    propertyTitle: "شقة",
    propertyAddress: "Dakar",
    ownerName: "Awa Diop",
    tenantName: "Omar Ba",
    rent: 500,
    charges: 50,
    total: 550,
    currency: "XOF",
    method: "TRANSFER",
    reference: "TX-1",
    ...over,
  }) as any;

test("PDF : quittance mise en cache, régénérée dès qu'une donnée change", async () => {
  const before = pdfStats.renders;
  const a = await renderPdf("receipt", receipt());
  const b = await renderPdf("receipt", receipt());
  assert.equal(pdfStats.renders - before, 1);
  assert.equal(a, b);
  assert.equal(a.subarray(0, 4).toString(), "%PDF");
  // Montant, langue ou nom modifiés → autre clé → nouveau document.
  const c = await renderPdf("receipt", receipt({ total: 551 }));
  const d = await renderPdf("receipt", receipt({ lang: "fr" }));
  const e = await renderPdf("receipt", receipt({ tenantName: "Omar Ba Junior" }));
  assert.equal(pdfStats.renders - before, 4);
  assert.notEqual(c, a);
  assert.notEqual(d, a);
  assert.notEqual(e, a);
  // Requêtes simultanées identiques : une seule génération.
  const f = receipt({ receiptNo: "HWE-2026-00043" });
  const [x, y] = await Promise.all([renderPdf("receipt", f), renderPdf("receipt", { ...f })]);
  assert.equal(x, y);
  assert.equal(pdfStats.renders - before, 5);
});

test("PDF : clé stable (ordre des champs), date d'édition du relevé au jour près", () => {
  const base = { title: "R", reference: "MAN-1", agencyName: "A", agencyDetails: [], ownerName: "O", propertyLines: [], currency: "EUR", rents: [], fees: [], totals: { collected: 0, fees: 0, net: 0 } };
  const k1 = pdfCacheKey("statement", { ...base, generatedAt: new Date("2026-10-25T08:00:00Z") } as any);
  const k2 = pdfCacheKey("statement", { generatedAt: new Date("2026-10-25T17:00:00Z"), ...base } as any);
  const k3 = pdfCacheKey("statement", { ...base, generatedAt: new Date("2026-10-26T08:00:00Z") } as any);
  assert.equal(k1, k2);
  assert.notEqual(k1, k3);
  assert.notEqual(pdfCacheKey("receipt", receipt()), pdfCacheKey("invoice", receipt()));
  assert.ok(pdfCache.maxBytes > 0);
});

// ───────────────────────── Baux d'un locataire ─────────────────────────

test("baux d'un locataire : trois recherches indexées sur l'e-mail normalisé", async () => {
  const seen: any[] = [];
  const db: any = {
    leaseContract: { findMany: async (a: any) => (seen.push(["lease", a.where]), [{ id: "L1" }, { id: "L2" }]) },
    inquiry: { findMany: async (a: any) => (seen.push(["inq", a.where]), [{ leaseId: "L2" }, { leaseId: "L3" }]) },
    leaseCoTenant: { findMany: async (a: any) => (seen.push(["co", a.where]), [{ leaseId: "L4" }]) },
  };
  const ids = await candidateTenantLeaseIds(db, { id: "u1", email: "  Jean.Dupont@Gmail.COM " });
  assert.deepEqual(ids.sort(), ["L1", "L2", "L3", "L4"]);
  assert.deepEqual(seen.find((s) => s[0] === "lease")[1], { tenantEmail: "jean.dupont@gmail.com" });
  assert.deepEqual(seen.find((s) => s[0] === "co")[1], { email: "jean.dupont@gmail.com" });
  assert.deepEqual(seen.find((s) => s[0] === "inq")[1], { senderId: "u1", leaseId: { not: null } });
  // Aucun mode « insensitive » (parcours complet) dans les filtres.
  assert.equal(JSON.stringify(seen).includes("insensitive"), false);
});
