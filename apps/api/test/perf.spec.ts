// Correctifs de performance issus des tests de charge : cache LRU des photos,
// cache des compteurs publics de la landing.
import { test } from "node:test";
import assert from "node:assert/strict";
import "reflect-metadata";
import { MediaCache } from "../src/common/media-cache";
import { PropertiesService, STATS_TTL_MS } from "../src/properties/properties.service";

const img = (n: number) => ({ mime: "image/jpeg", buf: Buffer.alloc(n), etag: `"e${n}"` });

test("MediaCache : LRU borné en octets, éviction de la plus ancienne", () => {
  const c = new MediaCache(300, 60_000, 200);
  c.set("a", img(100));
  c.set("b", img(100));
  assert.ok(c.get("a")); // a devient la plus récente
  c.set("c", img(150)); // 350 > 300 → éviction de b (la moins récemment lue)
  assert.equal(c.get("b"), null);
  assert.ok(c.get("a"));
  assert.ok(c.get("c"));
  assert.ok(c.usedBytes <= 300);
});

test("MediaCache : TTL, image trop grosse ignorée, suppression, désactivation", () => {
  const c = new MediaCache(1000, 1000, 500);
  c.set("x", img(10), 0);
  assert.ok(c.get("x", 500));
  assert.equal(c.get("x", 2000), null);
  assert.equal(c.usedBytes, 0);
  c.set("big", img(600));
  assert.equal(c.get("big"), null);
  c.set("y", img(10));
  c.delete("y");
  assert.equal(c.get("y"), null);
  assert.equal(c.usedBytes, 0);
  const off = new MediaCache(0, 1000);
  off.set("z", img(1));
  assert.equal(off.get("z"), null);
});

function fakePrisma(counter: { n: number }, fail = false) {
  return {
    property: {
      groupBy: async () => {
        counter.n++;
        if (fail) throw new Error("db");
        return [{ country: "FR", _count: { _all: 2 } }];
      },
      count: async () => 2,
    },
    $queryRaw: async () => [{ n: BigInt(1) }],
  };
}

test("stats() : mise en cache STATS_TTL_MS, appels simultanés partagés", async () => {
  const counter = { n: 0 };
  const svc = new PropertiesService(fakePrisma(counter) as never, {} as never, {} as never);
  const [a, b] = await Promise.all([svc.stats(0), svc.stats(10)]);
  assert.deepEqual(a, { total: 2, byCountry: { FR: 2 }, cities: 1, countries: 1 });
  assert.equal(a, b);
  await svc.stats(STATS_TTL_MS - 1);
  assert.equal(counter.n, 1);
  await svc.stats(STATS_TTL_MS + 1);
  assert.equal(counter.n, 2);
});

test("stats() : une erreur n'est pas mise en cache", async () => {
  const counter = { n: 0 };
  const svc = new PropertiesService(fakePrisma(counter, true) as never, {} as never, {} as never);
  await assert.rejects(svc.stats(0));
  await new Promise((r) => setImmediate(r));
  await assert.rejects(svc.stats(1));
  assert.equal(counter.n, 2);
});
