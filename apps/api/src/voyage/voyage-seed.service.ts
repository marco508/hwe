import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { withAdvisoryLock } from "../common/advisory-lock";
import { RETIRED_CIRCUITS, SEED_COUNTRIES } from "./seed";
import { PHOTO_CREDITS } from "./seed/photo-credits";
import type { SeedCircuit, SeedCountry, SeedDestination, SeedEvent, SeedGuide, SeedLang, SeedPlace } from "./seed/types";

const OTHER_LANGS: SeedLang[] = ["es", "pt", "ar"];

/** Traductions d'un contenu : en (dans <pays>.ts) + es/pt/ar (<pays>-i18n.ts), champs vides retirés. */
function withLangs(en: object, pick: (l: SeedLang) => object | undefined): Prisma.InputJsonValue {
  const out: Record<string, object> = { en };
  for (const l of OTHER_LANGS) {
    const v = pick(l);
    if (v) out[l] = v;
  }
  return out as Prisma.InputJsonValue;
}

type I18n = SeedCountry["i18n"];

/** Crédit affiché sous une photo de la banque (auteur · source · licence). */
const credit = (cover?: string | null) => (cover ? PHOTO_CREDITS[cover] ?? null : null);

const guideData = (g: SeedGuide, i18n: I18n) => ({
  intro: g.intro,
  sections: g.sections,
  translations: withLangs(g.en, (l) => i18n[l]?.guide),
});

const destinationData = (d: SeedDestination, i18n: I18n, position: number) => ({
  position,
  name: d.name,
  region: d.region,
  summary: d.summary,
  description: d.description,
  latitude: d.lat,
  longitude: d.lng,
  cover: d.cover ?? null,
  coverCredit: credit(d.cover),
  translations: withLangs(d.en, (l) => i18n[l]?.destinations[d.slug]),
});

const placeData = (p: SeedPlace, i18n: I18n, position: number) => ({
  position,
  category: p.category,
  name: p.name,
  summary: p.summary,
  description: p.description,
  tips: p.tips ?? null,
  bestPeriod: p.bestPeriod ?? null,
  visitMinutes: p.visitMinutes ?? null,
  latitude: p.lat ?? null,
  longitude: p.lng ?? null,
  cover: p.cover ?? null,
  coverCredit: credit(p.cover),
  translations: withLangs(p.en, (l) => i18n[l]?.places[p.slug]),
});

/** Champs d'un événement (sans les liens destination / lieu, résolus par slug). */
const eventData = (e: SeedEvent, position: number) => ({
  position,
  kind: e.kind,
  publicHoliday: e.publicHoliday,
  name: e.name,
  summary: e.summary,
  description: e.description,
  tips: e.tips ?? null,
  where: e.where ?? null,
  dateNote: e.dateNote ?? null,
  rule: e.rule as unknown as Prisma.InputJsonValue,
  caution: e.caution ?? false,
  cover: e.cover ?? null,
  coverCredit: credit(e.cover),
  sources: e.sources as Prisma.InputJsonValue,
  translations: withLangs(e.en, (l) => e.i18n[l]),
});

type Tx = Prisma.TransactionClient;

/** JSON à clés triées (jsonb ne conserve pas l'ordre des clés), sans les valeurs undefined. */
function canonical(v: unknown): string {
  return JSON.stringify(v ?? null, (_k, x: unknown) =>
    x && typeof x === "object" && !Array.isArray(x)
      ? Object.fromEntries(Object.entries(x).filter(([, y]) => y !== undefined).sort(([a], [b]) => (a < b ? -1 : 1)))
      : x,
  );
}

/** Les champs de `data` diffèrent-ils de la ligne en base ? */
function differs(row: object, data: Record<string, unknown>): boolean {
  const r = row as Record<string, unknown>;
  return Object.entries(data).some(([k, v]) => canonical(r[k]) !== canonical(v));
}

/**
 * Contenu de départ des guides (seed/), inséré au démarrage (VOYAGE_SEED=0
 * pour désactiver) : tout le pays s'il n'a encore ni guide ni destination,
 * sinon seulement les éléments ajoutés au seed depuis (destinations, lieux,
 * circuits, événements jamais insérés, d'après VoyageSeedEntry). Ensuite,
 * tout se modifie dans l'admin : un contenu supprimé n'est jamais recréé.
 *
 * Correctifs : un contenu de départ que personne n'a touché dans l'admin
 * (non relu, jamais modifié depuis son insertion) suit la version à jour du
 * seed (textes, traductions, image) ; les circuits retirés du seed
 * (RETIRED_CIRCUITS) sont supprimés aux mêmes conditions. Un contenu modifié
 * ou marqué relu dans l'admin n'est plus jamais touché.
 */
@Injectable()
export class VoyageSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(VoyageSeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    if (process.env.VOYAGE_SEED === "0") return;
    try {
      await withAdvisoryLock(this.prisma, "voyage-seed", async () => {
        for (const c of SEED_COUNTRIES) {
          // Un pays en échec n'empêche pas les autres.
          await this.seedCountry(c).catch((e) =>
            this.logger.warn(`contenu Voyage ${c.guide.country} non inséré : ${(e as Error).message}`),
          );
        }
      });
    } catch (e) {
      this.logger.warn(`contenu Voyage non inséré : ${(e as Error).message}`);
    }
  }

  async seedCountry(c: SeedCountry): Promise<void> {
    const country = c.guide.country;
    const [dest, guide] = await Promise.all([
      this.prisma.destination.count({ where: { country } }),
      this.prisma.countryGuide.count({ where: { country } }),
    ]);
    if (dest > 0 || guide > 0) {
      await this.addNew(c);
      return this.refreshUntouched(c);
    }
    await this.prisma.$transaction(
      async (tx) => {
        await tx.countryGuide.create({ data: { country, ...guideData(c.guide, c.i18n) } });
        await this.insertItems(tx, c, () => true);
      },
      { timeout: 120_000 },
    );
    this.logger.log(`guide Voyage ${country} inséré (${c.destinations.length} destinations, ${c.events.length} événements)`);
  }

  /**
   * Insère les éléments du seed retenus par `keep(kind, slug)` et les note
   * dans VoyageSeedEntry. Lieux, étapes et événements se rattachent par slug
   * aux destinations / lieux existants (créés ici ou déjà en base).
   */
  private async insertItems(tx: Tx, c: SeedCountry, keep: (kind: string, slug: string) => boolean): Promise<number> {
    const country = c.guide.country;
    const I18N = c.i18n;
    let n = 0;
    const logged: Array<{ kind: string; slug: string }> = [];
    const allPlaces = c.destinations.flatMap((d) => d.places.map((p) => p.slug));
    const [dRows, pRows] = await Promise.all([
      tx.destination.findMany({ where: { slug: { in: c.destinations.map((d) => d.slug) } }, select: { id: true, slug: true } }),
      tx.place.findMany({ where: { slug: { in: allPlaces } }, select: { id: true, slug: true } }),
    ]);
    const destIds = new Map(dRows.map((r) => [r.slug, r.id]));
    const placeIds = new Map(pRows.map((r) => [r.slug, r.id]));
    for (const [i, d] of c.destinations.entries()) {
      if (keep("destination", d.slug) && !destIds.has(d.slug)) {
        const created = await tx.destination.create({ data: { slug: d.slug, country, ...destinationData(d, I18N, i) } });
        destIds.set(d.slug, created.id);
        logged.push({ kind: "destination", slug: d.slug });
        n++;
      }
      const destinationId = destIds.get(d.slug);
      if (!destinationId) continue; // destination supprimée dans l'admin : ses nouveaux lieux ne sont pas recréés
      for (const [j, p] of d.places.entries()) {
        if (!keep("place", p.slug) || placeIds.has(p.slug)) continue;
        const place = await tx.place.create({ data: { slug: p.slug, destinationId, ...placeData(p, I18N, j) } });
        placeIds.set(p.slug, place.id);
        logged.push({ kind: "place", slug: p.slug });
        n++;
      }
    }
    for (const [i, ci] of c.circuits.entries()) {
      if (!keep("circuit", ci.slug)) continue;
      if (await tx.circuit.findUnique({ where: { slug: ci.slug }, select: { id: true } })) continue;
      await this.createCircuit(tx, country, ci, i, I18N, placeIds, destIds);
      logged.push({ kind: "circuit", slug: ci.slug });
      n++;
    }
    for (const [i, e] of c.events.entries()) {
      if (!keep("event", e.slug)) continue;
      if (await tx.voyageEvent.findUnique({ where: { slug: e.slug }, select: { id: true } })) continue;
      await tx.voyageEvent.create({
        data: {
          slug: e.slug,
          country,
          ...eventData(e, i),
          destinationId: e.destination ? destIds.get(e.destination) ?? null : null,
          placeId: e.place ? placeIds.get(e.place) ?? null : null,
        },
      });
      logged.push({ kind: "event", slug: e.slug });
      n++;
    }
    if (logged.length) await tx.voyageSeedEntry.createMany({ data: logged, skipDuplicates: true });
    return n;
  }

  private async createCircuit(
    tx: Tx,
    country: string,
    ci: SeedCircuit,
    position: number,
    I18N: I18n,
    placeIds: Map<string, string>,
    destIds: Map<string, string>,
  ) {
    await tx.circuit.create({
      data: {
        slug: ci.slug,
        country,
        title: ci.title,
        summary: ci.summary,
        days: ci.days,
        cover: ci.cover ?? null,
        coverCredit: credit(ci.cover),
        position,
        translations: withLangs(ci.en, (l) => I18N[l]?.circuits[ci.slug]),
        steps: {
          create: ci.steps.map((s, k) => ({
            day: s.day,
            position: k,
            placeId: s.place ? placeIds.get(s.place) ?? null : null,
            destinationId: s.destination ? destIds.get(s.destination) ?? null : null,
            note: s.note ?? null,
            translations: s.noteEn
              ? withLangs({ note: s.noteEn }, (l) => {
                  const note = I18N[l]?.stepNotes[`${ci.slug}:${k}`];
                  return note ? { note } : undefined;
                })
              : Prisma.DbNull,
          })),
        },
      },
    });
  }

  /** Ajoute les éléments du seed jamais insérés (absents de VoyageSeedEntry) à un pays déjà en place. */
  async addNew(c: SeedCountry): Promise<void> {
    const seen = await this.prisma.voyageSeedEntry.findMany({ select: { kind: true, slug: true } });
    const done = new Set(seen.map((x) => `${x.kind}:${x.slug}`));
    const keep = (kind: string, slug: string) => !done.has(`${kind}:${slug}`) && !(kind === "circuit" && RETIRED_CIRCUITS.includes(slug));
    const fresh =
      c.destinations.some((d) => keep("destination", d.slug) || d.places.some((p) => keep("place", p.slug))) ||
      c.circuits.some((ci) => keep("circuit", ci.slug)) ||
      c.events.some((e) => keep("event", e.slug));
    if (!fresh) return;
    const n = await this.prisma.$transaction((tx) => this.insertItems(tx, c, keep), { timeout: 120_000 });
    if (n) this.logger.log(`guide Voyage ${c.guide.country} : ${n} nouveau(x) contenu(s) de départ ajouté(s)`);
  }

  /**
   * Met à jour le contenu de départ resté intact (voir la doc de la classe).
   * « Intact » : `reviewed = false` et `updatedAt` = `createdAt` ; le guide,
   * sans `createdAt`, est comparé à l'insertion des destinations du pays (même
   * transaction). `updatedAt` est réécrit à sa valeur d'origine pour que le
   * contenu reste « intact » aux démarrages suivants.
   */
  async refreshUntouched({ guide: GUIDE, destinations: DESTINATIONS, i18n: I18N, events: EVENTS, circuits: CIRCUITS }: SeedCountry): Promise<void> {
    const country = GUIDE.country;
    let changed = 0;
    const dests = await this.prisma.destination.findMany({ where: { country }, include: { places: true } });
    const seededAt = Math.min(...dests.map((d) => d.createdAt.getTime()));
    const intact = (r: { reviewed: boolean; createdAt: Date; updatedAt: Date }) =>
      !r.reviewed && r.createdAt.getTime() === r.updatedAt.getTime();

    const g = await this.prisma.countryGuide.findUnique({ where: { country } });
    if (g && !g.reviewed && Number.isFinite(seededAt) && Math.abs(g.updatedAt.getTime() - seededAt) < 60_000) {
      const data = guideData(GUIDE, I18N);
      if (differs(g, data)) {
        await this.prisma.countryGuide.update({ where: { country }, data: { ...data, updatedAt: g.updatedAt } });
        changed++;
      }
    }
    for (const [i, d] of DESTINATIONS.entries()) {
      const row = dests.find((x) => x.slug === d.slug);
      if (!row) continue;
      if (intact(row)) {
        const data = destinationData(d, I18N, i);
        if (differs(row, data)) {
          await this.prisma.destination.update({ where: { id: row.id }, data: { ...data, updatedAt: row.createdAt } });
          changed++;
        }
      }
      for (const [j, p] of d.places.entries()) {
        const prow = row.places.find((x) => x.slug === p.slug);
        if (!prow || !intact(prow)) continue;
        const data = placeData(p, I18N, j);
        if (differs(prow, data)) {
          await this.prisma.place.update({ where: { id: prow.id }, data: { ...data, updatedAt: prow.createdAt } });
          changed++;
        }
      }
    }
    const evRows = await this.prisma.voyageEvent.findMany({ where: { slug: { in: EVENTS.map((e) => e.slug) } } });
    const placeIdBySlug = new Map(dests.flatMap((d) => d.places.map((p) => [p.slug, p.id] as const)));
    const destIdBySlug = new Map(dests.map((d) => [d.slug, d.id] as const));
    for (const [i, e] of EVENTS.entries()) {
      const row = evRows.find((x) => x.slug === e.slug);
      if (!row || !intact(row)) continue;
      const data = {
        ...eventData(e, i),
        destinationId: e.destination ? destIdBySlug.get(e.destination) ?? null : null,
        placeId: e.place ? placeIdBySlug.get(e.place) ?? null : null,
      };
      if (differs(row, data)) {
        await this.prisma.voyageEvent.update({ where: { id: row.id }, data: { ...data, updatedAt: row.createdAt } });
        changed++;
      }
    }
    // Circuits : seuls l'image et son crédit suivent le seed (les étapes restent celles de l'insertion).
    const ciRows = await this.prisma.circuit.findMany({ where: { slug: { in: CIRCUITS.map((c) => c.slug) } } });
    for (const ci of CIRCUITS) {
      const row = ciRows.find((x) => x.slug === ci.slug);
      if (!row || !intact(row)) continue;
      const data = { cover: ci.cover ?? null, coverCredit: credit(ci.cover) };
      if (differs(row, data)) {
        await this.prisma.circuit.update({ where: { id: row.id }, data: { ...data, updatedAt: row.createdAt } });
        changed++;
      }
    }
    const retired = await this.prisma.circuit.findMany({
      where: { country, slug: { in: RETIRED_CIRCUITS }, reviewed: false },
    });
    for (const ci of retired.filter(intact)) {
      await this.prisma.circuit.delete({ where: { id: ci.id } });
      changed++;
    }
    if (changed) this.logger.log(`guide Voyage ${country} : ${changed} contenu(s) de départ mis à jour`);
  }
}
