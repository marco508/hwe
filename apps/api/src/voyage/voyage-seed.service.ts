import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { withAdvisoryLock } from "../common/advisory-lock";
import { RETIRED_CIRCUITS, SEED_COUNTRIES } from "./seed";
import type { SeedCountry, SeedDestination, SeedGuide, SeedLang, SeedPlace } from "./seed/types";

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

const guideData = (g: SeedGuide, i18n: I18n) => ({
  intro: g.intro,
  sections: g.sections,
  translations: withLangs(g.en, (l) => i18n[l]?.guide),
});

const destinationData = (d: SeedDestination, i18n: I18n) => ({
  name: d.name,
  region: d.region,
  summary: d.summary,
  description: d.description,
  latitude: d.lat,
  longitude: d.lng,
  cover: d.cover ?? null,
  translations: withLangs(d.en, (l) => i18n[l]?.destinations[d.slug]),
});

const placeData = (p: SeedPlace, i18n: I18n) => ({
  category: p.category,
  name: p.name,
  summary: p.summary,
  description: p.description,
  tips: p.tips ?? null,
  bestPeriod: p.bestPeriod ?? null,
  visitMinutes: p.visitMinutes ?? null,
  latitude: p.lat ?? null,
  longitude: p.lng ?? null,
  translations: withLangs(p.en, (l) => i18n[l]?.places[p.slug]),
});

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
 * Contenu de départ des guides (seed/), inséré UNE fois par pays au démarrage si le pays
 * n'a encore ni guide ni destination (VOYAGE_SEED=0 pour désactiver). Ensuite,
 * tout se modifie dans l'admin : un contenu supprimé n'est jamais recréé
 * tant qu'il reste au moins une destination ou le guide du pays.
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
    const { guide: GUIDE, destinations: DESTINATIONS, circuits: CIRCUITS, i18n: I18N } = c;
    const country = GUIDE.country;
    const [dest, guide] = await Promise.all([
      this.prisma.destination.count({ where: { country } }),
      this.prisma.countryGuide.count({ where: { country } }),
    ]);
    if (dest > 0 || guide > 0) return this.refreshUntouched(c);
    await this.prisma.$transaction(
      async (tx) => {
        await tx.countryGuide.create({ data: { country, ...guideData(GUIDE, I18N) } });
        const placeIds = new Map<string, string>();
        const destIds = new Map<string, string>();
        for (const [i, d] of DESTINATIONS.entries()) {
          const created = await tx.destination.create({
            data: { slug: d.slug, country, position: i, ...destinationData(d, I18N) },
          });
          destIds.set(d.slug, created.id);
          for (const [j, p] of d.places.entries()) {
            const place = await tx.place.create({
              data: { slug: p.slug, destinationId: created.id, position: j, ...placeData(p, I18N) },
            });
            placeIds.set(p.slug, place.id);
          }
        }
        for (const [i, ci] of CIRCUITS.entries()) {
          await tx.circuit.create({
            data: {
              slug: ci.slug,
              country,
              title: ci.title,
              summary: ci.summary,
              days: ci.days,
              cover: ci.cover ?? null,
              position: i,
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
                        const n = I18N[l]?.stepNotes[`${ci.slug}:${k}`];
                        return n ? { note: n } : undefined;
                      })
                    : Prisma.DbNull,
                })),
              },
            },
          });
        }
      },
      { timeout: 60_000 },
    );
    this.logger.log(`guide Voyage ${country} inséré (${DESTINATIONS.length} destinations)`);
  }

  /**
   * Met à jour le contenu de départ resté intact (voir la doc de la classe).
   * « Intact » : `reviewed = false` et `updatedAt` = `createdAt` ; le guide,
   * sans `createdAt`, est comparé à l'insertion des destinations du pays (même
   * transaction). `updatedAt` est réécrit à sa valeur d'origine pour que le
   * contenu reste « intact » aux démarrages suivants.
   */
  async refreshUntouched({ guide: GUIDE, destinations: DESTINATIONS, i18n: I18N }: SeedCountry): Promise<void> {
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
    for (const d of DESTINATIONS) {
      const row = dests.find((x) => x.slug === d.slug);
      if (!row) continue;
      if (intact(row)) {
        const data = destinationData(d, I18N);
        if (differs(row, data)) {
          await this.prisma.destination.update({ where: { id: row.id }, data: { ...data, updatedAt: row.createdAt } });
          changed++;
        }
      }
      for (const p of d.places) {
        const prow = row.places.find((x) => x.slug === p.slug);
        if (!prow || !intact(prow)) continue;
        const data = placeData(p, I18N);
        if (differs(prow, data)) {
          await this.prisma.place.update({ where: { id: prow.id }, data: { ...data, updatedAt: prow.createdAt } });
          changed++;
        }
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
