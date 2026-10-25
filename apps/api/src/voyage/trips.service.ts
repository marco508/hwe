import { randomBytes } from "node:crypto";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { toDay } from "../common/dates";
import { lockKey } from "../common/advisory-lock";
import { requestLang } from "../i18n/i18n";
import { MEDIA_SELECT, withMediaUrl } from "../common/media.util";
import { PLACE_TEXT, coverUrl, localize, localized } from "./voyage-content";
import { addDays, nightsBetween } from "../stays/stays-rules";
import type { FromCircuitInput, TripInput, TripItemInput } from "./voyage.dto";

/** Garde-fous : un carnet reste un carnet. */
export const MAX_TRIPS_PER_USER = 50;
export const MAX_ITEMS_PER_TRIP = 300;
export const MAX_TRIP_DAYS = 60;

const DAY_MS = 24 * 3600 * 1000;

/** Nombre de jours d'un voyage daté (bornes incluses). */
export function tripDays(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / DAY_MS) + 1;
}

const itemPlaceSelect = {
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
  openingHours: true,
  published: true,
  destination: { select: { slug: true, name: true, translations: true } },
} as const;

type Db = Prisma.TransactionClient | PrismaService;

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Dates et nombre de jours cohérents (dates prioritaires sur dayCount). */
  private resolveDates(dto: TripInput, cur?: { startDate: Date | null; endDate: Date | null; dayCount: number }) {
    const start = dto.startDate === undefined ? cur?.startDate ?? null : dto.startDate ? toDay(dto.startDate) : null;
    let end = dto.endDate === undefined ? cur?.endDate ?? null : dto.endDate ? toDay(dto.endDate) : null;
    if ((dto.startDate && !start) || (dto.endDate && !end)) throw new BadRequestException("Date invalide.");
    let dayCount = dto.dayCount ?? cur?.dayCount ?? 3;
    if (start && !end) end = addDays(start, dayCount - 1);
    if (!start) end = null;
    if (start && end) {
      if (end.getTime() < start.getTime()) throw new BadRequestException("La date de retour précède la date de départ.");
      dayCount = tripDays(start, end);
    }
    if (dayCount > MAX_TRIP_DAYS) throw new BadRequestException(`Un voyage dure au plus ${MAX_TRIP_DAYS} jours.`);
    return { startDate: start, endDate: end, dayCount };
  }

  private async owned(tripId: string, userId: string, db: Db = this.prisma) {
    const trip = await db.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.userId !== userId) throw new NotFoundException("Voyage introuvable.");
    return trip;
  }

  async list(userId: string) {
    const trips = await this.prisma.trip.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { items: true } } },
      take: MAX_TRIPS_PER_USER,
    });
    return trips.map(({ _count, ...t }) => ({ ...t, itemCount: _count.items }));
  }

  async create(userId: string, dto: TripInput) {
    if (!dto.title?.trim() || !dto.country) throw new BadRequestException("Titre et pays obligatoires.");
    const dates = this.resolveDates(dto);
    return this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `trips:${userId}`);
      if ((await tx.trip.count({ where: { userId } })) >= MAX_TRIPS_PER_USER) {
        throw new ConflictException(`Vous avez déjà ${MAX_TRIPS_PER_USER} voyages : supprimez-en un pour en créer un nouveau.`);
      }
      return tx.trip.create({
        data: {
          userId,
          title: dto.title!.trim(),
          country: dto.country!.toUpperCase(),
          travelers: dto.travelers ?? 1,
          notes: dto.notes?.trim() || null,
          ...dates,
        },
      });
    });
  }

  async update(tripId: string, userId: string, dto: TripInput) {
    const cur = await this.owned(tripId, userId);
    const dates = this.resolveDates(dto, cur);
    return this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.update({
        where: { id: tripId },
        data: {
          ...(dto.title !== undefined ? { title: dto.title.trim() || cur.title } : {}),
          ...(dto.country !== undefined ? { country: dto.country.toUpperCase() } : {}),
          ...(dto.travelers !== undefined ? { travelers: dto.travelers } : {}),
          ...(dto.notes !== undefined ? { notes: dto.notes?.trim() || null } : {}),
          ...dates,
        },
      });
      // Voyage raccourci : les étapes des jours disparus passent « à placer ».
      await tx.tripItem.updateMany({ where: { tripId, day: { gt: dates.dayCount } }, data: { day: 0 } });
      return trip;
    });
  }

  async remove(tripId: string, userId: string) {
    await this.owned(tripId, userId);
    await this.prisma.trip.delete({ where: { id: tripId } });
    return { ok: true };
  }

  /** Carnet complet : étapes (lieux traduits), séjours réservés pendant le voyage. */
  async get(tripId: string, userId: string) {
    const trip = await this.owned(tripId, userId);
    return this.shape(trip, userId);
  }

  private async shape(trip: Prisma.TripGetPayload<object>, viewerId: string | null) {
    const lang = requestLang();
    const items = await this.prisma.tripItem.findMany({
      where: { tripId: trip.id },
      orderBy: [{ day: "asc" }, { position: "asc" }],
      include: { place: { select: itemPlaceSelect } },
    });
    const shaped = items.map((i) => ({
      ...i,
      place: i.place
        ? (() => {
            const { cover, destination, ...rest } = localize(lang, i.place as unknown as Record<string, unknown>, PLACE_TEXT) as Record<string, unknown> & {
              cover?: string | null;
              destination?: Record<string, unknown>;
            };
            return {
              ...rest,
              cover: coverUrl(cover),
              destination: i.place.destination
                ? { slug: i.place.destination.slug, name: localized(lang, i.place.destination as unknown as Record<string, unknown>, "name") }
                : null,
            };
          })()
        : null,
    }));
    // Séjours réservés sur hwe pendant le voyage (carnet du titulaire seulement).
    let stays: unknown[] = [];
    if (viewerId && trip.startDate && trip.endDate) {
      const bookings = await this.prisma.booking.findMany({
        where: {
          guestId: viewerId,
          status: { in: ["REQUESTED", "ACCEPTED", "CONFIRMED", "COMPLETED"] },
          checkIn: { lt: addDays(trip.endDate, 1) },
          checkOut: { gt: trip.startDate },
        },
        orderBy: { checkIn: "asc" },
        include: {
          property: {
            select: { id: true, title: true, city: true, media: { orderBy: { position: "asc" }, take: 1, select: MEDIA_SELECT } },
          },
        },
      });
      stays = bookings.map((b) => ({
        id: b.id,
        reference: b.reference,
        status: b.status,
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        nights: nightsBetween(b.checkIn, b.checkOut),
        total: b.total,
        currency: b.currency,
        property: { ...b.property, media: b.property.media.map(withMediaUrl) },
      }));
    }
    return { ...trip, items: shaped, stays };
  }

  private async nextPosition(tx: Db, tripId: string, day: number) {
    const last = await tx.tripItem.findFirst({ where: { tripId, day }, orderBy: { position: "desc" }, select: { position: true } });
    return (last?.position ?? -1) + 1;
  }

  async addItem(tripId: string, userId: string, dto: TripItemInput) {
    const kind = dto.kind ?? (dto.placeId ? "PLACE" : "NOTE");
    if (kind === "PLACE") {
      if (!dto.placeId) throw new BadRequestException("Choisissez un lieu.");
      const place = await this.prisma.place.findFirst({ where: { id: dto.placeId, published: true }, select: { id: true } });
      if (!place) throw new NotFoundException("Lieu introuvable.");
    } else if (!dto.title?.trim() && !dto.note?.trim()) {
      throw new BadRequestException("Écrivez un titre ou une note.");
    }
    return this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `trip:${tripId}`);
      const trip = await this.owned(tripId, userId, tx);
      const day = Math.min(dto.day ?? 0, trip.dayCount);
      if ((await tx.tripItem.count({ where: { tripId } })) >= MAX_ITEMS_PER_TRIP) {
        throw new ConflictException(`Un voyage compte au plus ${MAX_ITEMS_PER_TRIP} étapes.`);
      }
      const item = await tx.tripItem.create({
        data: {
          tripId,
          kind,
          placeId: kind === "PLACE" ? dto.placeId! : null,
          day,
          position: await this.nextPosition(tx, tripId, day),
          title: dto.title?.trim() || null,
          note: dto.note?.trim() || null,
          time: dto.time || null,
        },
      });
      await tx.trip.update({ where: { id: tripId }, data: { updatedAt: new Date() } });
      return item;
    });
  }

  async updateItem(tripId: string, itemId: string, userId: string, dto: TripItemInput) {
    return this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `trip:${tripId}`);
      const trip = await this.owned(tripId, userId, tx);
      const item = await tx.tripItem.findFirst({ where: { id: itemId, tripId } });
      if (!item) throw new NotFoundException("Étape introuvable.");
      const day = dto.day !== undefined ? Math.min(dto.day, trip.dayCount) : item.day;
      const moved = day !== item.day;
      const updated = await tx.tripItem.update({
        where: { id: itemId },
        data: {
          day,
          ...(moved ? { position: await this.nextPosition(tx, tripId, day) } : dto.position !== undefined ? { position: dto.position } : {}),
          ...(dto.title !== undefined ? { title: dto.title?.trim() || null } : {}),
          ...(dto.note !== undefined ? { note: dto.note?.trim() || null } : {}),
          ...(dto.time !== undefined ? { time: dto.time || null } : {}),
          ...(dto.done !== undefined ? { done: dto.done } : {}),
        },
      });
      await tx.trip.update({ where: { id: tripId }, data: { updatedAt: new Date() } });
      return updated;
    });
  }

  async removeItem(tripId: string, itemId: string, userId: string) {
    await this.owned(tripId, userId);
    const { count } = await this.prisma.tripItem.deleteMany({ where: { id: itemId, tripId } });
    if (!count) throw new NotFoundException("Étape introuvable.");
    return { ok: true };
  }

  /** Ordre des étapes d'un jour (les identifiants donnés, dans l'ordre). */
  async reorder(tripId: string, userId: string, day: number, ids: string[]) {
    return this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `trip:${tripId}`);
      const trip = await this.owned(tripId, userId, tx);
      if (day > trip.dayCount) throw new BadRequestException("Jour hors du voyage.");
      const items = await tx.tripItem.findMany({ where: { tripId, id: { in: ids } }, select: { id: true } });
      if (items.length !== new Set(ids).size) throw new NotFoundException("Étape introuvable.");
      for (let i = 0; i < ids.length; i++) {
        await tx.tripItem.update({ where: { id: ids[i]! }, data: { day, position: i } });
      }
      await tx.trip.update({ where: { id: tripId }, data: { updatedAt: new Date() } });
      return { ok: true };
    });
  }

  /** Nouveau voyage à partir d'un circuit conseillé (étapes copiées jour par jour). */
  async fromCircuit(userId: string, slug: string, dto: FromCircuitInput) {
    const circuit = await this.prisma.circuit.findFirst({
      where: { slug, published: true },
      include: {
        steps: {
          orderBy: [{ day: "asc" }, { position: "asc" }],
          include: { place: { select: { id: true, published: true } }, destination: { select: { name: true, translations: true } } },
        },
      },
    });
    if (!circuit) throw new NotFoundException("Circuit introuvable.");
    const lang = requestLang();
    const trip = await this.create(userId, {
      title: localized(lang, circuit as unknown as Record<string, unknown>, "title") ?? circuit.title,
      country: circuit.country,
      dayCount: circuit.days,
      startDate: dto.startDate ?? undefined,
      travelers: dto.travelers,
    });
    const pos = new Map<number, number>();
    const rows: Prisma.TripItemCreateManyInput[] = [];
    for (const s of circuit.steps) {
      const position = pos.get(s.day) ?? 0;
      pos.set(s.day, position + 1);
      const note = localized(lang, s as unknown as Record<string, unknown>, "note");
      if (s.place?.published) {
        rows.push({ tripId: trip.id, kind: "PLACE", placeId: s.place.id, day: s.day, position, note });
      } else if (s.destination || note) {
        rows.push({
          tripId: trip.id,
          kind: "NOTE",
          day: s.day,
          position,
          title: s.destination ? localized(lang, s.destination as unknown as Record<string, unknown>, "name") : null,
          note,
        });
      }
    }
    if (rows.length) await this.prisma.tripItem.createMany({ data: rows.slice(0, MAX_ITEMS_PER_TRIP) });
    return trip;
  }

  async share(tripId: string, userId: string) {
    const trip = await this.owned(tripId, userId);
    if (trip.shareToken) return { shareToken: trip.shareToken };
    const shareToken = randomBytes(18).toString("base64url");
    await this.prisma.trip.update({ where: { id: tripId }, data: { shareToken } });
    return { shareToken };
  }

  async unshare(tripId: string, userId: string) {
    await this.owned(tripId, userId);
    await this.prisma.trip.update({ where: { id: tripId }, data: { shareToken: null } });
    return { ok: true };
  }

  /** Carnet partagé (lecture seule) : jamais l'identité complète ni les séjours. */
  async shared(token: string) {
    if (!/^[A-Za-z0-9_-]{20,40}$/.test(token)) throw new NotFoundException("Voyage introuvable.");
    const trip = await this.prisma.trip.findUnique({
      where: { shareToken: token },
      include: { user: { select: { firstName: true } } },
    });
    if (!trip) throw new NotFoundException("Voyage introuvable.");
    const { user, userId: _u, shareToken: _s, ...rest } = trip;
    const shaped = await this.shape(rest as unknown as Prisma.TripGetPayload<object>, null);
    const { userId: _x, shareToken: _y, ...pub } = shaped as typeof shaped & { userId?: string; shareToken?: string };
    return { ...pub, authorFirstName: user.firstName };
  }
}
