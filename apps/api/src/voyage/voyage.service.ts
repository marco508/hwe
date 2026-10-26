import { randomBytes } from "node:crypto";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PlaceCategory, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { requestLang } from "../i18n/i18n";
import { assertDataUrl, IMAGE_MIME } from "../common/upload.util";
import { persistPublicFile } from "../common/file-store";
import { cleanEventRule, eventOccurrences, isValidEventRule, nextOccurrence, type VoyageEventOccurrence, type VoyageEventRule } from "../shared/hwe-types";
import {
  CIRCUIT_TEXT,
  DESTINATION_TEXT,
  EVENT_TEXT,
  GUIDE_TEXT,
  PLACE_TEXT,
  STEP_TEXT,
  checkCover,
  cleanSections,
  cleanTranslations,
  coverUrl,
  localize,
  localized,
  localizedSections,
  slugify,
} from "./voyage-content";
import type {
  CircuitInput,
  DestinationInput,
  EventInput,
  GuideInput,
  PlaceInput,
} from "./voyage.dto";

const MAX_VOYAGE_IMAGE_BYTES = 4 * 1024 * 1024;

type Row = Record<string, unknown>;

const placeCardSelect = {
  id: true,
  slug: true,
  category: true,
  name: true,
  summary: true,
  translations: true,
  cover: true,
  latitude: true,
  longitude: true,
  visitMinutes: true,
  position: true,
  destination: { select: { slug: true, name: true, translations: true, country: true } },
} as const;

const destinationCardSelect = {
  id: true,
  slug: true,
  country: true,
  name: true,
  region: true,
  summary: true,
  translations: true,
  cover: true,
  coverCredit: true,
  latitude: true,
  longitude: true,
  position: true,
  _count: { select: { places: { where: { published: true } } } },
} as const;

const eventCardSelect = {
  id: true,
  slug: true,
  country: true,
  kind: true,
  publicHoliday: true,
  name: true,
  summary: true,
  where: true,
  dateNote: true,
  caution: true,
  cover: true,
  rule: true,
  position: true,
  translations: true,
  destination: { select: { slug: true, name: true, translations: true, published: true } },
  place: { select: { slug: true, name: true, translations: true, published: true } },
} as const;

/** Date du jour (AAAA-MM-JJ, UTC). */
export const todayIso = () => new Date().toISOString().slice(0, 10);
const plusDays = (day: string, n: number) => new Date(Date.parse(day + "T00:00:00Z") + n * 86_400_000).toISOString().slice(0, 10);
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

@Injectable()
export class VoyageService {
  constructor(private readonly prisma: PrismaService) {}

  // ─────────────────────────── Mise en forme ───────────────────────────

  private destinationCard(d: Row & { _count?: { places: number } }) {
    const lang = requestLang();
    const { _count, cover, ...rest } = localize(lang, d, DESTINATION_TEXT) as Row & { _count?: { places: number }; cover?: string | null };
    return { ...rest, cover: coverUrl(cover), placeCount: d._count?.places ?? undefined };
  }

  private placeCard(p: Row & { destination?: Row | null }) {
    const lang = requestLang();
    const { cover, destination, ...rest } = localize(lang, p, PLACE_TEXT) as Row & { cover?: string | null; destination?: Row | null };
    return {
      ...rest,
      cover: coverUrl(cover),
      destination: p.destination
        ? { slug: p.destination.slug, name: localized(lang, p.destination, "name"), country: p.destination.country }
        : undefined,
    };
  }

  /** Carte d'événement traduite, avec ses occurrences (déjà calculées). */
  eventCard(e: Row, occurrences: VoyageEventOccurrence[]) {
    const lang = requestLang();
    const { cover, destination, place, position: _p, ...rest } = localize(lang, e, EVENT_TEXT) as Row & {
      cover?: string | null;
      destination?: Row | null;
      place?: Row | null;
    };
    const link = (x?: Row | null) => (x && x.published !== false ? { slug: x.slug as string, name: localized(lang, x, "name") } : null);
    return { ...rest, cover: coverUrl(cover), destination: link(destination), place: link(place), occurrences };
  }

  /** Événements publiés d'un pays (ou d'une destination / d'un lieu) qui ont lieu entre `from` et `to`, par date. */
  async eventsBetween(where: Prisma.VoyageEventWhereInput, from: string, to: string) {
    const rows = await this.prisma.voyageEvent.findMany({
      where: { published: true, ...where },
      orderBy: [{ position: "asc" }, { name: "asc" }],
      select: eventCardSelect,
    });
    return rows
      .map((e) => ({ e, occ: eventOccurrences(e.rule as unknown as VoyageEventRule, from, to) }))
      .filter((x) => x.occ.length)
      .sort((a, b) => {
        const x = a.occ[0]!;
        const y = b.occ[0]!;
        return x.start < y.start ? -1 : x.start > y.start ? 1 : (x.period ? 1 : 0) - (y.period ? 1 : 0);
      })
      .map((x) => this.eventCard(x.e as unknown as Row, x.occ));
  }

  /** Calendrier d'un pays : par défaut, les 12 prochains mois (3 ans au plus). */
  async countryEvents(cc: string, q: { from?: string; to?: string }) {
    const from = q.from && ISO_DAY.test(q.from) ? q.from : todayIso();
    let to = q.to && ISO_DAY.test(q.to) && q.to >= from ? q.to : plusDays(from, 365);
    if (to > plusDays(from, 3 * 366)) to = plusDays(from, 3 * 366);
    return { country: cc.toUpperCase(), from, to, events: await this.eventsBetween({ country: cc.toUpperCase() }, from, to) };
  }

  /** Prochaine occurrence des événements liés (destination, lieu). */
  private async upcomingFor(where: Prisma.VoyageEventWhereInput) {
    const today = todayIso();
    return (await this.eventsBetween(where, today, plusDays(today, 366))).map((e) => ({ ...e, occurrences: e.occurrences.slice(0, 1) }));
  }

  async event(slug: string) {
    const e = await this.prisma.voyageEvent.findFirst({
      where: { slug, published: true },
      select: { ...eventCardSelect, description: true, tips: true, coverCredit: true, reviewed: true, updatedAt: true },
    });
    if (!e) throw new NotFoundException("Événement introuvable.");
    const today = todayIso();
    const occ = eventOccurrences(e.rule as unknown as VoyageEventRule, today, plusDays(today, 3 * 366)).slice(0, 3);
    const lang = requestLang();
    // Autour de la prochaine date : autres temps forts du pays dans les 45 jours.
    const anchor = occ[0]?.start ?? today;
    const related = (await this.eventsBetween({ country: e.country, id: { not: e.id } }, plusDays(anchor, -45), plusDays(anchor, 45)))
      .filter((x) => !x.occurrences[0]?.period)
      .slice(0, 6);
    const card = this.eventCard(e as unknown as Row, occ);
    return {
      ...card,
      description: localized(lang, e as unknown as Row, "description"),
      tips: localized(lang, e as unknown as Row, "tips"),
      related,
    };
  }

  // ─────────────────────────── Lecture publique ───────────────────────────

  /** Pays ayant au moins une destination publiée (avec compteurs). */
  async countries() {
    const [dest, places, guides] = await Promise.all([
      this.prisma.destination.groupBy({ by: ["country"], where: { published: true }, _count: { _all: true } }),
      this.prisma.$queryRaw<Array<{ country: string; n: bigint }>>`
        SELECT d."country", count(*)::bigint AS n FROM "Place" p
        JOIN "Destination" d ON d."id" = p."destinationId"
        WHERE p."published" AND d."published" GROUP BY d."country"`,
      this.prisma.countryGuide.findMany({ where: { published: true }, select: { country: true } }),
    ]);
    const guideSet = new Set(guides.map((g) => g.country));
    return dest.map((d) => ({
      country: d.country,
      destinations: d._count._all,
      places: Number(places.find((p) => p.country === d.country)?.n ?? 0),
      hasGuide: guideSet.has(d.country),
    }));
  }

  /** Page pays : infos pratiques, destinations, circuits, lieux à la une. */
  async country(cc: string) {
    const country = cc.toUpperCase();
    const lang = requestLang();
    const [guide, destinations, circuits, featured, byCategory] = await Promise.all([
      this.prisma.countryGuide.findFirst({ where: { country, published: true } }),
      this.prisma.destination.findMany({
        where: { country, published: true },
        orderBy: [{ position: "asc" }, { name: "asc" }],
        select: destinationCardSelect,
      }),
      this.prisma.circuit.findMany({
        where: { country, published: true },
        orderBy: [{ position: "asc" }, { title: "asc" }],
        select: { id: true, slug: true, title: true, summary: true, days: true, cover: true, translations: true },
      }),
      this.prisma.place.findMany({
        where: { published: true, destination: { country, published: true } },
        orderBy: [{ position: "asc" }, { name: "asc" }],
        take: 12,
        select: placeCardSelect,
      }),
      this.prisma.place.groupBy({
        by: ["category"],
        where: { published: true, destination: { country, published: true } },
        _count: { _all: true },
      }),
    ]);
    if (!guide && destinations.length === 0) throw new NotFoundException("Ce pays n'a pas encore de guide.");
    return {
      country,
      guide: guide
        ? {
            intro: localized(lang, guide as unknown as Row, "intro"),
            sections: localizedSections(lang, guide),
            updatedAt: guide.updatedAt,
          }
        : null,
      destinations: destinations.map((d) => this.destinationCard(d as unknown as Row)),
      circuits: circuits.map((c) => {
        const { cover, ...rest } = localize(lang, c as unknown as Row, CIRCUIT_TEXT) as Row & { cover?: string | null };
        return { ...rest, cover: coverUrl(cover) };
      }),
      featured: featured.map((p) => this.placeCard(p as unknown as Row)),
      categories: byCategory.map((c) => ({ category: c.category, count: c._count._all })),
    };
  }

  async destination(slug: string) {
    const lang = requestLang();
    const d = await this.prisma.destination.findFirst({
      where: { slug, published: true },
      include: {
        places: {
          where: { published: true },
          orderBy: [{ position: "asc" }, { name: "asc" }],
          select: placeCardSelect,
        },
      },
    });
    if (!d) throw new NotFoundException("Destination introuvable.");
    const circuits = await this.prisma.circuit.findMany({
      where: { published: true, steps: { some: { OR: [{ destinationId: d.id }, { place: { destinationId: d.id } }] } } },
      select: { id: true, slug: true, title: true, summary: true, days: true, cover: true, translations: true },
      take: 6,
    });
    const events = await this.upcomingFor({ OR: [{ destinationId: d.id }, { place: { destinationId: d.id } }] });
    const { places, cover, ...rest } = localize(lang, d as unknown as Row, DESTINATION_TEXT) as Row & {
      places: Row[];
      cover?: string | null;
    };
    return {
      ...rest,
      cover: coverUrl(cover),
      events,
      places: (places ?? []).map((p) => this.placeCard(p)),
      circuits: circuits.map((c) => {
        const { cover: cc, ...r } = localize(lang, c as unknown as Row, CIRCUIT_TEXT) as Row & { cover?: string | null };
        return { ...r, cover: coverUrl(cc) };
      }),
    };
  }

  /** Recherche de lieux (pays, destination, catégorie, texte). */
  async places(q: { country?: string; destination?: string; category?: string; q?: string; take?: number }) {
    const where: Prisma.PlaceWhereInput = {
      published: true,
      destination: {
        published: true,
        ...(q.country ? { country: q.country.toUpperCase() } : {}),
        ...(q.destination ? { slug: q.destination } : {}),
      },
      ...(q.category && (Object.values(PlaceCategory) as string[]).includes(q.category)
        ? { category: q.category as PlaceCategory }
        : {}),
      ...(q.q
        ? {
            OR: [
              { name: { contains: q.q, mode: "insensitive" } },
              { summary: { contains: q.q, mode: "insensitive" } },
              { destination: { name: { contains: q.q, mode: "insensitive" } } },
            ],
          }
        : {}),
    };
    const rows = await this.prisma.place.findMany({
      where,
      orderBy: [{ position: "asc" }, { name: "asc" }],
      take: Math.min(Math.max(q.take ?? 60, 1), 200),
      select: placeCardSelect,
    });
    return rows.map((p) => this.placeCard(p as unknown as Row));
  }

  async place(slug: string) {
    const lang = requestLang();
    const p = await this.prisma.place.findFirst({
      where: { slug, published: true, destination: { published: true } },
      include: { destination: { select: destinationCardSelect } },
    });
    if (!p) throw new NotFoundException("Lieu introuvable.");
    const nearby = await this.prisma.place.findMany({
      where: { destinationId: p.destinationId, published: true, id: { not: p.id } },
      orderBy: [{ position: "asc" }, { name: "asc" }],
      take: 6,
      select: placeCardSelect,
    });
    const events = await this.upcomingFor({ placeId: p.id });
    const { destination, cover, ...rest } = localize(lang, p as unknown as Row, PLACE_TEXT) as Row & {
      destination: Row;
      cover?: string | null;
    };
    return {
      ...rest,
      cover: coverUrl(cover),
      events,
      destination: this.destinationCard(destination),
      nearby: nearby.map((n) => this.placeCard(n as unknown as Row)),
    };
  }

  async circuit(slug: string) {
    const c = await this.prisma.circuit.findFirst({
      where: { slug, published: true },
      include: {
        steps: {
          orderBy: [{ day: "asc" }, { position: "asc" }],
          include: {
            destination: { select: { ...destinationCardSelect, published: true } },
            place: { select: { ...placeCardSelect, published: true } },
          },
        },
      },
    });
    if (!c) throw new NotFoundException("Circuit introuvable.");
    return this.shapeCircuit(c as unknown as Row & { steps: Row[] });
  }

  shapeCircuit(c: Row & { steps: Row[] }) {
    const lang = requestLang();
    const { steps, cover, ...rest } = localize(lang, c, CIRCUIT_TEXT) as Row & { steps: Row[]; cover?: string | null };
    return {
      ...rest,
      cover: coverUrl(cover),
      // Lieu / destination dépubliés : l'étape garde sa note, sans le lien.
      steps: (c.steps ?? [])
        .map((s) => {
          const place = s.place && (s.place as Row).published !== false ? (s.place as Row) : null;
          const dest = s.destination && (s.destination as Row).published !== false ? (s.destination as Row) : null;
          return {
            id: s.id as string,
            day: s.day as number,
            position: s.position as number,
            note: localized(lang, s, "note"),
            destination: dest ? this.destinationCard(dest) : null,
            place: place ? this.placeCard(place) : null,
          };
        })
        .filter((s) => s.place || s.destination || s.note),
    };
  }

  // ─────────────────────────── Administration ───────────────────────────

  /** Tout le contenu d'un pays (brouillons compris), données brutes + traductions. */
  async adminContent(country?: string) {
    const cc = country?.toUpperCase();
    const [guides, destinations, circuits, events] = await Promise.all([
      this.prisma.countryGuide.findMany({ where: cc ? { country: cc } : {}, orderBy: { country: "asc" } }),
      this.prisma.destination.findMany({
        where: cc ? { country: cc } : {},
        orderBy: [{ country: "asc" }, { position: "asc" }, { name: "asc" }],
        include: { places: { orderBy: [{ position: "asc" }, { name: "asc" }] } },
      }),
      this.prisma.circuit.findMany({
        where: cc ? { country: cc } : {},
        orderBy: [{ country: "asc" }, { position: "asc" }],
        include: { steps: { orderBy: [{ day: "asc" }, { position: "asc" }] } },
      }),
      this.prisma.voyageEvent.findMany({
        where: cc ? { country: cc } : {},
        orderBy: [{ country: "asc" }, { position: "asc" }, { name: "asc" }],
      }),
    ]);
    const today = todayIso();
    const withUrl = <T extends { cover: string | null }>(x: T) => ({ ...x, coverUrl: coverUrl(x.cover) });
    return {
      guides,
      destinations: destinations.map((d) => ({ ...withUrl(d), places: d.places.map(withUrl) })),
      circuits: circuits.map(withUrl),
      events: events.map((e) => ({ ...withUrl(e), next: nextOccurrence(e.rule as unknown as VoyageEventRule, today) })),
    };
  }

  /** Image téléversée (JPEG, PNG, WebP ≤ 4 Mo) → valeur `cover` à enregistrer. */
  async uploadImage(dataUrl: string) {
    assertDataUrl(dataUrl, "image", { allowed: IMAGE_MIME, maxBytes: MAX_VOYAGE_IMAGE_BYTES });
    const st = await persistPublicFile(dataUrl);
    const key = randomBytes(16).toString("hex");
    await this.prisma.voyageImage.create({ data: { key, dataUrl: st.value, fileKey: st.fileKey } });
    const cover = `img:${key}`;
    return { cover, url: coverUrl(cover) };
  }

  private async uniqueSlug(kind: "destination" | "place" | "circuit" | "event", wanted: string, exceptId?: string): Promise<string> {
    const base = slugify(wanted) || kind;
    for (let i = 0; i < 50; i++) {
      const slug = i === 0 ? base : `${base}-${i + 1}`;
      const where = { slug };
      const found =
        kind === "destination"
          ? await this.prisma.destination.findUnique({ where, select: { id: true } })
          : kind === "place"
            ? await this.prisma.place.findUnique({ where, select: { id: true } })
            : kind === "event"
              ? await this.prisma.voyageEvent.findUnique({ where, select: { id: true } })
              : await this.prisma.circuit.findUnique({ where, select: { id: true } });
      if (!found || found.id === exceptId) return slug;
    }
    throw new ConflictException("Identifiant d'URL déjà utilisé : choisissez-en un autre.");
  }

  private destinationData(dto: DestinationInput) {
    return {
      ...(dto.country !== undefined ? { country: dto.country.toUpperCase() } : {}),
      ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
      ...(dto.region !== undefined ? { region: dto.region?.trim() || null } : {}),
      ...(dto.summary !== undefined ? { summary: dto.summary.trim() } : {}),
      ...(dto.description !== undefined ? { description: dto.description.trim() } : {}),
      ...(dto.latitude !== undefined ? { latitude: dto.latitude } : {}),
      ...(dto.longitude !== undefined ? { longitude: dto.longitude } : {}),
      ...(dto.cover !== undefined ? { cover: checkCover(dto.cover) } : {}),
      ...(dto.coverCredit !== undefined ? { coverCredit: dto.coverCredit?.trim() || null } : {}),
      ...(dto.position !== undefined ? { position: dto.position } : {}),
      ...(dto.published !== undefined ? { published: dto.published } : {}),
      ...(dto.reviewed !== undefined ? { reviewed: dto.reviewed } : {}),
      ...(dto.translations !== undefined
        ? { translations: (cleanTranslations(dto.translations, DESTINATION_TEXT) ?? Prisma.DbNull) as Prisma.InputJsonValue }
        : {}),
    };
  }

  async createDestination(dto: DestinationInput) {
    if (!dto.name?.trim() || !dto.country || !dto.summary?.trim() || !dto.description?.trim()) {
      throw new BadRequestException("Nom, pays, résumé et description sont obligatoires.");
    }
    const slug = await this.uniqueSlug("destination", dto.slug || dto.name);
    return this.prisma.destination.create({
      data: { ...this.destinationData(dto), slug } as Prisma.DestinationUncheckedCreateInput,
    });
  }

  async updateDestination(id: string, dto: DestinationInput) {
    const cur = await this.prisma.destination.findUnique({ where: { id }, select: { id: true } });
    if (!cur) throw new NotFoundException("Destination introuvable.");
    const slug = dto.slug ? await this.uniqueSlug("destination", dto.slug, id) : undefined;
    return this.prisma.destination.update({ where: { id }, data: { ...this.destinationData(dto), ...(slug ? { slug } : {}) } });
  }

  async deleteDestination(id: string) {
    const { count } = await this.prisma.destination.deleteMany({ where: { id } });
    if (!count) throw new NotFoundException("Destination introuvable.");
    return { ok: true };
  }

  private placeData(dto: PlaceInput) {
    const str = (v: string | null | undefined) => (v === undefined ? undefined : v?.trim() || null);
    const data: Record<string, unknown> = {};
    if (dto.destinationId !== undefined) data.destinationId = dto.destinationId;
    if (dto.category !== undefined) data.category = dto.category;
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.summary !== undefined) data.summary = dto.summary.trim();
    if (dto.description !== undefined) data.description = dto.description.trim();
    for (const k of ["tips", "address", "openingHours", "priceInfo", "bestPeriod", "website"] as const) {
      const v = str(dto[k]);
      if (v !== undefined) data[k] = v;
    }
    if (dto.website && !/^https?:\/\/\S+$/.test(dto.website.trim())) {
      throw new BadRequestException("Site web : adresse invalide (https://…).");
    }
    for (const k of ["latitude", "longitude", "visitMinutes", "position"] as const) {
      if (dto[k] !== undefined) data[k] = dto[k];
    }
    if (dto.cover !== undefined) data.cover = checkCover(dto.cover);
    if (dto.coverCredit !== undefined) data.coverCredit = str(dto.coverCredit);
    if (dto.published !== undefined) data.published = dto.published;
    if (dto.reviewed !== undefined) data.reviewed = dto.reviewed;
    if (dto.translations !== undefined) {
      data.translations = (cleanTranslations(dto.translations, PLACE_TEXT) ?? Prisma.DbNull) as Prisma.InputJsonValue;
    }
    return data;
  }

  async createPlace(dto: PlaceInput) {
    if (!dto.destinationId || !dto.category || !dto.name?.trim() || !dto.summary?.trim() || !dto.description?.trim()) {
      throw new BadRequestException("Destination, catégorie, nom, résumé et description sont obligatoires.");
    }
    const dest = await this.prisma.destination.findUnique({ where: { id: dto.destinationId }, select: { id: true } });
    if (!dest) throw new BadRequestException("Destination introuvable.");
    const slug = await this.uniqueSlug("place", dto.slug || dto.name);
    return this.prisma.place.create({ data: { ...this.placeData(dto), slug } as Prisma.PlaceUncheckedCreateInput });
  }

  async updatePlace(id: string, dto: PlaceInput) {
    const cur = await this.prisma.place.findUnique({ where: { id }, select: { id: true } });
    if (!cur) throw new NotFoundException("Lieu introuvable.");
    if (dto.destinationId) {
      const dest = await this.prisma.destination.findUnique({ where: { id: dto.destinationId }, select: { id: true } });
      if (!dest) throw new BadRequestException("Destination introuvable.");
    }
    const slug = dto.slug ? await this.uniqueSlug("place", dto.slug, id) : undefined;
    return this.prisma.place.update({ where: { id }, data: { ...this.placeData(dto), ...(slug ? { slug } : {}) } });
  }

  async deletePlace(id: string) {
    const { count } = await this.prisma.place.deleteMany({ where: { id } });
    if (!count) throw new NotFoundException("Lieu introuvable.");
    return { ok: true };
  }

  /** Création / mise à jour d'un circuit ; `steps` fourni = remplace toutes les étapes. */
  async saveCircuit(id: string | null, dto: CircuitInput) {
    if (!id && (!dto.title?.trim() || !dto.country || !dto.summary?.trim() || !dto.days)) {
      throw new BadRequestException("Titre, pays, résumé et nombre de jours sont obligatoires.");
    }
    if (id) {
      const cur = await this.prisma.circuit.findUnique({ where: { id }, select: { id: true } });
      if (!cur) throw new NotFoundException("Circuit introuvable.");
    }
    const steps = dto.steps;
    const days = dto.days;
    if (steps) {
      const maxDay = days ?? (id ? (await this.prisma.circuit.findUniqueOrThrow({ where: { id } })).days : 0);
      for (const s of steps) {
        if (s.day < 1 || s.day > maxDay) throw new BadRequestException("Étape : jour hors du circuit.");
        if (!s.placeId && !s.destinationId && !s.note?.trim()) {
          throw new BadRequestException("Étape : choisissez un lieu, une destination ou écrivez une note.");
        }
      }
      const placeIds = steps.map((s) => s.placeId).filter((x): x is string => !!x);
      const destIds = steps.map((s) => s.destinationId).filter((x): x is string => !!x);
      const [pc, dc] = await Promise.all([
        this.prisma.place.count({ where: { id: { in: placeIds } } }),
        this.prisma.destination.count({ where: { id: { in: destIds } } }),
      ]);
      if (pc !== new Set(placeIds).size || dc !== new Set(destIds).size) {
        throw new BadRequestException("Étape : lieu ou destination introuvable.");
      }
    }
    const data: Record<string, unknown> = {};
    if (dto.country !== undefined) data.country = dto.country.toUpperCase();
    if (dto.title !== undefined) data.title = dto.title.trim();
    if (dto.summary !== undefined) data.summary = dto.summary.trim();
    if (dto.days !== undefined) data.days = dto.days;
    if (dto.cover !== undefined) data.cover = checkCover(dto.cover);
    if (dto.coverCredit !== undefined) data.coverCredit = dto.coverCredit?.trim() || null;
    if (dto.position !== undefined) data.position = dto.position;
    if (dto.published !== undefined) data.published = dto.published;
    if (dto.reviewed !== undefined) data.reviewed = dto.reviewed;
    if (dto.translations !== undefined) {
      data.translations = (cleanTranslations(dto.translations, CIRCUIT_TEXT) ?? Prisma.DbNull) as Prisma.InputJsonValue;
    }
    if (dto.slug || !id) data.slug = await this.uniqueSlug("circuit", dto.slug || dto.title!, id ?? undefined);
    return this.prisma.$transaction(async (tx) => {
      const c = id
        ? await tx.circuit.update({ where: { id }, data })
        : await tx.circuit.create({ data: data as Prisma.CircuitUncheckedCreateInput });
      if (steps) {
        await tx.circuitStep.deleteMany({ where: { circuitId: c.id } });
        if (steps.length) {
          await tx.circuitStep.createMany({
            data: steps.map((s, i) => ({
              circuitId: c.id,
              day: s.day,
              position: s.position ?? i,
              placeId: s.placeId || null,
              destinationId: s.destinationId || null,
              note: s.note?.trim() || null,
              translations: (cleanTranslations(s.translations, STEP_TEXT) ?? Prisma.DbNull) as Prisma.InputJsonValue,
            })),
          });
        }
      }
      return tx.circuit.findUniqueOrThrow({ where: { id: c.id }, include: { steps: { orderBy: [{ day: "asc" }, { position: "asc" }] } } });
    });
  }

  async deleteCircuit(id: string) {
    const { count } = await this.prisma.circuit.deleteMany({ where: { id } });
    if (!count) throw new NotFoundException("Circuit introuvable.");
    return { ok: true };
  }

  private async eventData(dto: EventInput, country: string | null) {
    const str = (v: string | null | undefined) => (v === undefined ? undefined : v?.trim() || null);
    const data: Record<string, unknown> = {};
    if (dto.country !== undefined) data.country = dto.country.toUpperCase();
    for (const k of ["kind", "publicHoliday", "caution", "position", "published", "reviewed"] as const) {
      if (dto[k] !== undefined) data[k] = dto[k];
    }
    for (const k of ["name", "summary", "description"] as const) if (dto[k] !== undefined) data[k] = dto[k]!.trim();
    for (const k of ["tips", "where", "dateNote", "coverCredit"] as const) {
      const v = str(dto[k]);
      if (v !== undefined) data[k] = v;
    }
    if (dto.rule !== undefined) {
      if (!isValidEventRule(dto.rule)) throw new BadRequestException("Date de l'événement invalide.");
      data.rule = cleanEventRule(dto.rule) as unknown as Prisma.InputJsonValue;
    }
    if (dto.cover !== undefined) data.cover = checkCover(dto.cover);
    if (dto.sources !== undefined) {
      const src = (dto.sources ?? []).map((x) => x.trim()).filter(Boolean);
      if (src.some((x) => !/^https?:\/\/\S+$/.test(x))) throw new BadRequestException("Sources : adresses invalides (https://…).");
      data.sources = src.length ? src : Prisma.DbNull;
    }
    if (dto.translations !== undefined) {
      data.translations = (cleanTranslations(dto.translations, EVENT_TEXT) ?? Prisma.DbNull) as Prisma.InputJsonValue;
    }
    // Liens : destination / lieu du même pays.
    const cc = (data.country as string | undefined) ?? country;
    if (dto.destinationId !== undefined) {
      if (dto.destinationId) {
        const d = await this.prisma.destination.findUnique({ where: { id: dto.destinationId }, select: { country: true } });
        if (!d || d.country !== cc) throw new BadRequestException("Destination introuvable dans ce pays.");
      }
      data.destinationId = dto.destinationId || null;
    }
    if (dto.placeId !== undefined) {
      if (dto.placeId) {
        const p = await this.prisma.place.findUnique({ where: { id: dto.placeId }, select: { destination: { select: { country: true } } } });
        if (!p || p.destination.country !== cc) throw new BadRequestException("Lieu introuvable dans ce pays.");
      }
      data.placeId = dto.placeId || null;
    }
    return data;
  }

  async createEvent(dto: EventInput) {
    if (!dto.name?.trim() || !dto.country || !dto.kind || !dto.summary?.trim() || !dto.description?.trim() || !dto.rule) {
      throw new BadRequestException("Nom, pays, type, date, résumé et description sont obligatoires.");
    }
    const slug = await this.uniqueSlug("event", dto.slug || dto.name);
    const data = await this.eventData(dto, dto.country.toUpperCase());
    return this.prisma.voyageEvent.create({ data: { ...data, slug } as Prisma.VoyageEventUncheckedCreateInput });
  }

  async updateEvent(id: string, dto: EventInput) {
    const cur = await this.prisma.voyageEvent.findUnique({ where: { id }, select: { id: true, country: true } });
    if (!cur) throw new NotFoundException("Événement introuvable.");
    const slug = dto.slug ? await this.uniqueSlug("event", dto.slug, id) : undefined;
    const data = await this.eventData(dto, cur.country);
    return this.prisma.voyageEvent.update({ where: { id }, data: { ...data, ...(slug ? { slug } : {}) } });
  }

  async deleteEvent(id: string) {
    const { count } = await this.prisma.voyageEvent.deleteMany({ where: { id } });
    if (!count) throw new NotFoundException("Événement introuvable.");
    return { ok: true };
  }

  async saveGuide(country: string, dto: GuideInput) {
    const cc = country.toUpperCase();
    const translations =
      dto.translations === undefined
        ? undefined
        : (() => {
            const base = cleanTranslations(dto.translations, GUIDE_TEXT) ?? {};
            const raw = (dto.translations ?? {}) as Record<string, { sections?: unknown }>;
            for (const [lang, v] of Object.entries(raw)) {
              const secs = cleanSections(v?.sections);
              if (secs.length && lang !== "fr" && ["en", "es", "pt", "ar"].includes(lang)) {
                (base as Record<string, Record<string, unknown>>)[lang] = { ...(base as Record<string, Record<string, unknown>>)[lang], sections: secs };
              }
            }
            return Object.keys(base).length ? (base as Prisma.InputJsonValue) : Prisma.DbNull;
          })();
    const sections = dto.sections !== undefined ? (cleanSections(dto.sections) as unknown as Prisma.InputJsonValue) : undefined;
    const existing = await this.prisma.countryGuide.findUnique({ where: { country: cc } });
    if (!existing) {
      if (!dto.intro?.trim()) throw new BadRequestException("Introduction obligatoire.");
      return this.prisma.countryGuide.create({
        data: {
          country: cc,
          intro: dto.intro.trim(),
          sections: sections ?? [],
          ...(translations !== undefined ? { translations } : {}),
          ...(dto.published !== undefined ? { published: dto.published } : {}),
          ...(dto.reviewed !== undefined ? { reviewed: dto.reviewed } : {}),
        },
      });
    }
    return this.prisma.countryGuide.update({
      where: { country: cc },
      data: {
        ...(dto.intro !== undefined ? { intro: dto.intro.trim() } : {}),
        ...(sections !== undefined ? { sections } : {}),
        ...(translations !== undefined ? { translations } : {}),
        ...(dto.published !== undefined ? { published: dto.published } : {}),
        ...(dto.reviewed !== undefined ? { reviewed: dto.reviewed } : {}),
      },
    });
  }
}
