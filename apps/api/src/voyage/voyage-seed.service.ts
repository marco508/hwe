import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { withAdvisoryLock } from "../common/advisory-lock";
import { BENIN_CIRCUITS, BENIN_DESTINATIONS, BENIN_GUIDE } from "./seed/benin";

/**
 * Contenu de départ du guide Bénin, inséré UNE fois au démarrage si le pays
 * n'a encore ni guide ni destination (VOYAGE_SEED=0 pour désactiver). Ensuite,
 * tout se modifie dans l'admin : un contenu supprimé n'est jamais recréé
 * tant qu'il reste au moins une destination ou le guide du pays.
 */
@Injectable()
export class VoyageSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(VoyageSeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    if (process.env.VOYAGE_SEED === "0") return;
    try {
      await withAdvisoryLock(this.prisma, "voyage-seed", () => this.seedBenin());
    } catch (e) {
      this.logger.warn(`contenu Voyage non inséré : ${(e as Error).message}`);
    }
  }

  async seedBenin(): Promise<void> {
    const country = BENIN_GUIDE.country;
    const [dest, guide] = await Promise.all([
      this.prisma.destination.count({ where: { country } }),
      this.prisma.countryGuide.count({ where: { country } }),
    ]);
    if (dest > 0 || guide > 0) return;
    await this.prisma.$transaction(
      async (tx) => {
        await tx.countryGuide.create({
          data: {
            country,
            intro: BENIN_GUIDE.intro,
            sections: BENIN_GUIDE.sections,
            translations: { en: BENIN_GUIDE.en } as Prisma.InputJsonValue,
          },
        });
        const placeIds = new Map<string, string>();
        const destIds = new Map<string, string>();
        for (const [i, d] of BENIN_DESTINATIONS.entries()) {
          const created = await tx.destination.create({
            data: {
              slug: d.slug,
              country,
              name: d.name,
              region: d.region,
              summary: d.summary,
              description: d.description,
              latitude: d.lat,
              longitude: d.lng,
              cover: d.cover ?? null,
              position: i,
              translations: { en: d.en } as Prisma.InputJsonValue,
            },
          });
          destIds.set(d.slug, created.id);
          for (const [j, p] of d.places.entries()) {
            const place = await tx.place.create({
              data: {
                slug: p.slug,
                destinationId: created.id,
                category: p.category,
                name: p.name,
                summary: p.summary,
                description: p.description,
                tips: p.tips ?? null,
                bestPeriod: p.bestPeriod ?? null,
                visitMinutes: p.visitMinutes ?? null,
                latitude: p.lat ?? null,
                longitude: p.lng ?? null,
                position: j,
                translations: { en: p.en } as Prisma.InputJsonValue,
              },
            });
            placeIds.set(p.slug, place.id);
          }
        }
        for (const [i, c] of BENIN_CIRCUITS.entries()) {
          await tx.circuit.create({
            data: {
              slug: c.slug,
              country,
              title: c.title,
              summary: c.summary,
              days: c.days,
              cover: c.cover ?? null,
              position: i,
              translations: { en: c.en } as Prisma.InputJsonValue,
              steps: {
                create: c.steps.map((s, k) => ({
                  day: s.day,
                  position: k,
                  placeId: s.place ? placeIds.get(s.place) ?? null : null,
                  destinationId: s.destination ? destIds.get(s.destination) ?? null : null,
                  note: s.note ?? null,
                  translations: s.noteEn ? ({ en: { note: s.noteEn } } as Prisma.InputJsonValue) : Prisma.DbNull,
                })),
              },
            },
          });
        }
      },
      { timeout: 60_000 },
    );
    this.logger.log(`guide Voyage ${country} inséré (${BENIN_DESTINATIONS.length} destinations)`);
  }
}
