import { randomBytes } from "node:crypto";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BookingStatus, Prisma, StaySettings } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import { assertEmailVerified } from "../common/email-verified.util";
import { lockKey } from "../common/advisory-lock";
import { today as todayDay, toDay } from "../common/dates";
import { PropertyAccessService } from "../common/property-access";
import { MEDIA_SELECT, withMediaUrl } from "../common/media.util";
import { agencyCollectsRent } from "../rents/rents.service";
import { tr } from "../i18n/i18n";
import {
  BLOCKING_STATUSES,
  DayRange,
  StayRates,
  addDays,
  averageRating,
  baseNightly,
  checkStay,
  isClock,
  mergeRanges,
  nightsBetween,
  overlaps,
  quoteStay,
  refundFor,
} from "./stays-rules";
import { checkImportUrl } from "./ical";
import type { BlockInput, BookingRequestInput, ReviewInput, StaySettingsInput } from "./stays.dto";

/** Délai de réponse de l'hôte à une demande. */
export const ANSWER_HOURS = 48;
/** Délai de paiement après acceptation (paiement avant l'arrivée). */
export const PAYMENT_HOURS = 72;
/** Demandes en attente simultanées par voyageur. */
export const MAX_PENDING_REQUESTS = 5;
/** Délai pour laisser un avis après le départ. */
export const REVIEW_WINDOW_DAYS = 60;

const HOUR_MS = 3600 * 1000;

const PROPERTY_CARD = {
  id: true,
  title: true,
  city: true,
  country: true,
  addressLine: true,
  propertyType: true,
  bedrooms: true,
  bathrooms: true,
  surface: true,
  currency: true,
  ownerId: true,
  media: { orderBy: { position: "asc" as const }, take: 1, select: MEDIA_SELECT },
} as const;

type BookingWithProperty = Prisma.BookingGetPayload<{ include: { property: { select: typeof PROPERTY_CARD } } }>;

function shapeProperty<T extends { media: Array<{ id: string }> }>(p: T) {
  return { ...p, media: p.media.map(withMediaUrl) };
}

/** Échéance plafonnée : jamais après le jour d'arrivée (midi UTC), au moins 6 h. */
function deadline(hours: number, checkIn: Date, now = Date.now()): Date {
  const cap = checkIn.getTime() + 12 * HOUR_MS;
  return new Date(Math.max(now + 6 * HOUR_MS, Math.min(now + hours * HOUR_MS, cap)));
}

const ownerUrl = () => (process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech").replace(/\/+$/, "");
const tenantUrl = () => (process.env.TENANT_WEB_URL || "https://tenant.hwe.dkpsolution.tech").replace(/\/+$/, "");

@Injectable()
export class StaysService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly access: PropertyAccessService,
  ) {}

  // ─────────────────────────── Lecture des tarifs et des dates ───────────────────────────

  private async rates(propertyId: string, settings: Pick<StaySettings, "nightlyPrice" | "cleaningFee">): Promise<StayRates> {
    const grid = await this.prisma.pricingRate.findMany({ where: { propertyId } });
    const of = (u: string) => grid.find((r) => r.unit === u)?.amount ?? null;
    return {
      nightly: settings.nightlyPrice ?? of("DAYS"),
      weekly: of("WEEKS"),
      monthly: of("MONTHS"),
      cleaningFee: settings.cleaningFee,
    };
  }

  /** Plages prises (réservations bloquantes + fermetures) qui touchent [from, to[. */
  async takenRanges(
    propertyId: string,
    from: Date,
    to: Date,
    db: Prisma.TransactionClient | PrismaService = this.prisma,
    exceptBookingId?: string,
  ): Promise<DayRange[]> {
    const [bookings, blocks] = await Promise.all([
      db.booking.findMany({
        where: {
          propertyId,
          status: { in: BLOCKING_STATUSES },
          checkIn: { lt: to },
          checkOut: { gt: from },
          ...(exceptBookingId ? { id: { not: exceptBookingId } } : {}),
        },
        select: { checkIn: true, checkOut: true },
      }),
      db.stayBlock.findMany({
        where: { propertyId, startDate: { lt: to }, endDate: { gt: from } },
        select: { startDate: true, endDate: true },
      }),
    ]);
    return [
      ...bookings.map((b) => ({ start: b.checkIn, end: b.checkOut })),
      ...blocks.map((b) => ({ start: b.startDate, end: b.endDate })),
    ];
  }

  private async settingsOrNull(propertyId: string) {
    return this.prisma.staySettings.findUnique({ where: { propertyId } });
  }

  private async commissionPct(): Promise<number> {
    const s = await this.prisma.platformSettings.findUnique({ where: { id: 1 }, select: { stayCommissionPct: true } });
    return Math.max(0, Math.min(100, s?.stayCommissionPct ?? 0));
  }

  // ─────────────────────────── Public ───────────────────────────

  /** Fiche séjour publique d'un bien : réglages visibles, dates prises (18 mois), avis. */
  async publicInfo(propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      select: { id: true, status: true, listingType: true, currency: true },
    });
    if (!property) throw new NotFoundException("Bien introuvable");
    const s = await this.settingsOrNull(propertyId);
    if (!s?.enabled || property.status !== "PUBLISHED" || property.listingType !== "RENT") {
      return { enabled: false as const };
    }
    const from = todayDay();
    const to = addDays(from, 548);
    const [rates, taken, reviews] = await Promise.all([
      this.rates(propertyId, s),
      this.takenRanges(propertyId, from, to),
      this.reviewSummary(propertyId),
    ]);
    return {
      enabled: true as const,
      currency: property.currency,
      nightly: baseNightly(rates),
      weekly: rates.weekly ?? null,
      monthly: rates.monthly ?? null,
      cleaningFee: s.cleaningFee,
      minNights: s.minNights,
      maxNights: s.maxNights,
      maxGuests: s.maxGuests,
      minNoticeDays: s.minNoticeDays,
      checkInFrom: s.checkInFrom,
      checkOutBefore: s.checkOutBefore,
      cancellationPolicy: s.cancellationPolicy,
      paymentMode: s.paymentMode,
      houseRules: s.houseRules,
      unavailable: mergeRanges(taken).map((r) => ({ start: r.start, end: r.end })),
      rating: reviews.rating,
      reviewCount: reviews.count,
    };
  }

  /** Devis pour des dates (toujours recalculé côté serveur). */
  async quote(propertyId: string, q: { checkIn?: string; checkOut?: string; guests?: number }) {
    const info = await this.settingsOrNull(propertyId);
    const property = await this.prisma.property.findUnique({ where: { id: propertyId }, select: { status: true, listingType: true, currency: true } });
    if (!property || !info?.enabled || property.status !== "PUBLISHED" || property.listingType !== "RENT") {
      throw new NotFoundException("Ce logement ne se réserve pas en séjour.");
    }
    const checkIn = toDay(q.checkIn ?? null);
    const checkOut = toDay(q.checkOut ?? null);
    if (!checkIn || !checkOut) throw new BadRequestException("Dates d'arrivée et de départ obligatoires.");
    const guests = q.guests ?? 1;
    const taken = await this.takenRanges(propertyId, checkIn, checkOut);
    const refusals = checkStay({ checkIn, checkOut, guests }, info, taken, todayDay());
    const nights = nightsBetween(checkIn, checkOut);
    const quote = nights >= 1 ? quoteStay(await this.rates(propertyId, info), nights) : null;
    return { available: refusals.length === 0 && !!quote, refusals, currency: property.currency, ...(quote ?? { nights }) };
  }

  /**
   * Recherche de logements disponibles : ville (ou proximité d'une
   * destination Voyage), dates, voyageurs. 24 résultats par page.
   */
  async search(q: { country?: string; city?: string; destination?: string; checkIn?: string; checkOut?: string; guests?: number; page?: number }) {
    const guests = Math.max(1, Math.min(q.guests ?? 1, 50));
    const checkIn = toDay(q.checkIn ?? null);
    const checkOut = toDay(q.checkOut ?? null);
    const dated = !!checkIn && !!checkOut && checkOut.getTime() > checkIn.getTime();
    const page = Math.max(1, q.page ?? 1);
    const pageSize = 24;

    const place: Prisma.PropertyWhereInput[] = [];
    let destinationName: string | null = null;
    if (q.destination) {
      const d = await this.prisma.destination.findFirst({
        where: { slug: q.destination, published: true },
        select: { name: true, country: true, latitude: true, longitude: true },
      });
      if (d) {
        destinationName = d.name;
        const near: Prisma.PropertyWhereInput[] = [{ city: { contains: d.name, mode: "insensitive" } }];
        if (d.latitude != null && d.longitude != null) {
          // ≈ 30 km autour de la destination.
          near.push({
            latitude: { gte: d.latitude - 0.27, lte: d.latitude + 0.27 },
            longitude: { gte: d.longitude - 0.27, lte: d.longitude + 0.27 },
          });
        }
        place.push({ OR: near });
      }
    }
    if (q.city) place.push({ city: { contains: q.city, mode: "insensitive" } });
    if (q.country) place.push({ country: q.country.toUpperCase() });

    const where: Prisma.PropertyWhereInput = {
      status: "PUBLISHED",
      listingType: "RENT",
      staySettings: { is: { enabled: true, maxGuests: { gte: guests } } },
      AND: place,
      ...(dated
        ? {
            bookings: { none: { status: { in: BLOCKING_STATUSES }, checkIn: { lt: checkOut! }, checkOut: { gt: checkIn! } } },
            stayBlocks: { none: { startDate: { lt: checkOut! }, endDate: { gt: checkIn! } } },
          }
        : {}),
    };
    const rows = await this.prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        ...PROPERTY_CARD,
        rentalKind: true,
        staySettings: true,
        pricingRates: { select: { unit: true, amount: true } },
      },
    });
    const today = todayDay();
    const nights = dated ? nightsBetween(checkIn!, checkOut!) : 0;
    const fitting = rows.filter((p) => {
      const s = p.staySettings!;
      if (!dated) return true;
      return checkStay({ checkIn: checkIn!, checkOut: checkOut!, guests }, s, [], today).length === 0;
    });
    const slice = fitting.slice((page - 1) * pageSize, page * pageSize);
    const ratings = await this.ratingsFor(slice.map((p) => p.id));
    const items = slice
      .map((p) => {
        const s = p.staySettings!;
        const of = (u: string) => p.pricingRates.find((r) => r.unit === u)?.amount ?? null;
        const rates: StayRates = { nightly: s.nightlyPrice ?? of("DAYS"), weekly: of("WEEKS"), monthly: of("MONTHS"), cleaningFee: s.cleaningFee };
        const nightly = baseNightly(rates);
        if (nightly === null) return null;
        const { staySettings: _s, pricingRates: _r, ownerId: _o, addressLine: _a, ...card } = p;
        const r = ratings.get(p.id);
        return {
          ...shapeProperty(card),
          nightly,
          maxGuests: s.maxGuests,
          minNights: s.minNights,
          paymentMode: s.paymentMode,
          cancellationPolicy: s.cancellationPolicy,
          rating: r?.rating ?? null,
          reviewCount: r?.count ?? 0,
          quote: dated ? quoteStay(rates, nights) : null,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
    return { items, total: fitting.length, page, pageSize, destinationName, nights: dated ? nights : null };
  }

  private async ratingsFor(propertyIds: string[]) {
    const out = new Map<string, { rating: number | null; count: number }>();
    if (!propertyIds.length) return out;
    const rows = await this.prisma.stayReview.groupBy({
      by: ["propertyId"],
      where: { propertyId: { in: propertyIds }, hidden: false },
      _avg: { rating: true },
      _count: { _all: true },
    });
    for (const r of rows) {
      out.set(r.propertyId, { rating: r._avg.rating === null ? null : Math.round(r._avg.rating * 10) / 10, count: r._count._all });
    }
    return out;
  }

  async reviewSummary(propertyId: string) {
    const rows = await this.prisma.stayReview.findMany({ where: { propertyId, hidden: false }, select: { rating: true } });
    return { rating: averageRating(rows.map((r) => r.rating)), count: rows.length };
  }

  async reviews(propertyId: string) {
    const rows = await this.prisma.stayReview.findMany({
      where: { propertyId, hidden: false },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { author: { select: { firstName: true, avatarUrl: true } }, booking: { select: { checkIn: true, nights: true } } },
    });
    return rows.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      reply: r.reply,
      repliedAt: r.repliedAt,
      createdAt: r.createdAt,
      author: { firstName: r.author.firstName },
      stayMonth: r.booking.checkIn,
      nights: r.booking.nights,
    }));
  }

  // ─────────────────────────── Hôte : réglages et calendrier ───────────────────────────

  /** Biens en location accessibles à l'hôte (propriétaire ou pro sous mandat de gestion). */
  async hostProperties(userId: string) {
    const where = await this.access.propertyWhere(userId, "STAYS");
    const rows = await this.prisma.property.findMany({
      where: { AND: [where, { listingType: "RENT" }] },
      orderBy: { createdAt: "desc" },
      select: {
        ...PROPERTY_CARD,
        status: true,
        rentalKind: true,
        staySettings: { select: { enabled: true, maxGuests: true, minNights: true, nightlyPrice: true, paymentMode: true, icalImportUrl: true, icalSyncedAt: true, icalError: true } },
        pricingRates: { select: { unit: true, amount: true } },
        _count: { select: { bookings: { where: { status: "REQUESTED" } } } },
      },
    });
    return rows.map(({ _count, ...p }) => ({ ...shapeProperty(p), pendingRequests: _count.bookings }));
  }

  private async assertHost(propertyId: string, userId: string) {
    return this.access.assert(propertyId, userId, "STAYS");
  }

  /** Réglages complets (création à la volée, désactivés par défaut). */
  async hostSettings(propertyId: string, userId: string) {
    await this.assertHost(propertyId, userId);
    const property = await this.prisma.property.findUniqueOrThrow({
      where: { id: propertyId },
      select: { id: true, title: true, city: true, currency: true, status: true, listingType: true, rentalKind: true },
    });
    const s =
      (await this.settingsOrNull(propertyId)) ??
      (await this.prisma.staySettings.upsert({
        where: { propertyId },
        create: { propertyId, icalToken: randomBytes(24).toString("base64url") },
        update: {},
      }));
    const rates = await this.rates(propertyId, s);
    return { property, settings: s, gridNightly: rates.nightly === s.nightlyPrice ? null : rates.nightly, rates };
  }

  async saveSettings(propertyId: string, userId: string, dto: StaySettingsInput) {
    await this.hostSettings(propertyId, userId);
    const property = await this.prisma.property.findUniqueOrThrow({ where: { id: propertyId }, select: { listingType: true } });
    if (dto.checkInFrom !== undefined && !isClock(dto.checkInFrom)) throw new BadRequestException("Heure d'arrivée invalide (HH:MM).");
    if (dto.checkOutBefore !== undefined && !isClock(dto.checkOutBefore)) throw new BadRequestException("Heure de départ invalide (HH:MM).");
    if (dto.icalImportUrl && !checkImportUrl(dto.icalImportUrl)) {
      throw new BadRequestException("Adresse du calendrier à importer invalide (lien iCal https://…).");
    }
    const data: Prisma.StaySettingsUpdateInput = {};
    for (const k of [
      "enabled", "nightlyPrice", "cleaningFee", "minNights", "maxNights", "maxGuests", "checkInFrom", "checkOutBefore",
      "cancellationPolicy", "paymentMode", "minNoticeDays",
    ] as const) {
      if (dto[k] !== undefined) (data as Record<string, unknown>)[k] = dto[k];
    }
    for (const k of ["houseRules", "arrivalInstructions"] as const) {
      if (dto[k] !== undefined) data[k] = dto[k]?.trim() || null;
    }
    if (dto.icalImportUrl !== undefined) {
      data.icalImportUrl = dto.icalImportUrl?.trim() || null;
      data.icalError = null;
      if (!data.icalImportUrl) await this.prisma.stayBlock.deleteMany({ where: { propertyId, source: "ICAL" } });
    }
    return this.prisma.$transaction(async (tx) => {
      const s = await tx.staySettings.update({ where: { propertyId }, data });
      if (s.maxNights !== null && s.maxNights < s.minNights) {
        throw new BadRequestException("La durée maximale est inférieure à la durée minimale.");
      }
      if (s.enabled) {
        if (property.listingType !== "RENT") throw new BadRequestException("Seul un bien en location peut se réserver en séjour.");
        const grid = await tx.pricingRate.findMany({ where: { propertyId } });
        const rates: StayRates = {
          nightly: s.nightlyPrice ?? grid.find((r) => r.unit === "DAYS")?.amount ?? null,
          weekly: grid.find((r) => r.unit === "WEEKS")?.amount ?? null,
          monthly: grid.find((r) => r.unit === "MONTHS")?.amount ?? null,
          cleaningFee: s.cleaningFee,
        };
        if (baseNightly(rates) === null) {
          throw new BadRequestException("Indiquez un prix par nuit (ou un tarif jour dans la grille du bien) avant d'ouvrir les réservations.");
        }
      }
      return s;
    });
  }

  async regenerateIcalToken(propertyId: string, userId: string) {
    await this.hostSettings(propertyId, userId);
    return this.prisma.staySettings.update({
      where: { propertyId },
      data: { icalToken: randomBytes(24).toString("base64url") },
      select: { icalToken: true },
    });
  }

  /** Calendrier de l'hôte : réservations et fermetures sur une période. */
  async hostCalendar(propertyId: string, userId: string, fromS?: string, toS?: string) {
    await this.assertHost(propertyId, userId);
    const from = toDay(fromS ?? null) ?? addDays(todayDay(), -31);
    const to = toDay(toS ?? null) ?? addDays(from, 400);
    if (to.getTime() <= from.getTime() || nightsBetween(from, to) > 800) throw new BadRequestException("Période invalide.");
    const [bookings, blocks] = await Promise.all([
      this.prisma.booking.findMany({
        where: { propertyId, checkIn: { lt: to }, checkOut: { gt: from }, status: { in: ["REQUESTED", ...BLOCKING_STATUSES] } },
        orderBy: { checkIn: "asc" },
        select: { id: true, reference: true, status: true, checkIn: true, checkOut: true, guests: true, guest: { select: { firstName: true, lastName: true } } },
      }),
      this.prisma.stayBlock.findMany({
        where: { propertyId, startDate: { lt: to }, endDate: { gt: from } },
        orderBy: { startDate: "asc" },
      }),
    ]);
    return { from, to, bookings, blocks };
  }

  async addBlock(propertyId: string, userId: string, dto: BlockInput) {
    await this.assertHost(propertyId, userId);
    const start = toDay(dto.startDate);
    const end = toDay(dto.endDate);
    if (!start || !end || end.getTime() <= start.getTime()) throw new BadRequestException("Période invalide : la fin doit suivre le début.");
    if (nightsBetween(start, end) > 400) throw new BadRequestException("Fermeture trop longue (400 nuits au plus).");
    return this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `stay:${propertyId}`);
      const clash = await tx.booking.findFirst({
        where: { propertyId, status: { in: ["ACCEPTED", "CONFIRMED"] }, checkIn: { lt: end }, checkOut: { gt: start } },
        select: { reference: true },
      });
      if (clash) {
        throw new ConflictException(`Ces dates comprennent une réservation acceptée (${clash.reference}) : annulez-la d'abord si nécessaire.`);
      }
      return tx.stayBlock.create({ data: { propertyId, startDate: start, endDate: end, note: dto.note?.trim() || null, source: "MANUAL" } });
    });
  }

  async removeBlock(blockId: string, userId: string) {
    const block = await this.prisma.stayBlock.findUnique({ where: { id: blockId } });
    if (!block) throw new NotFoundException("Fermeture introuvable.");
    await this.assertHost(block.propertyId, userId);
    if (block.source === "ICAL") {
      throw new ConflictException("Cette fermeture vient du calendrier importé : modifiez-la sur l'autre plateforme.");
    }
    await this.prisma.stayBlock.delete({ where: { id: blockId } });
    return { ok: true };
  }

  // ─────────────────────────── Voyageur : demandes ───────────────────────────

  async request(guestId: string, dto: BookingRequestInput) {
    await assertEmailVerified(this.prisma, guestId);
    const checkIn = toDay(dto.checkIn);
    const checkOut = toDay(dto.checkOut);
    if (!checkIn || !checkOut) throw new BadRequestException("Dates d'arrivée et de départ obligatoires.");
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
      select: { id: true, title: true, status: true, listingType: true, currency: true, ownerId: true, owner: { select: { email: true, firstName: true } } },
    });
    if (!property) throw new NotFoundException("Bien introuvable");
    if (property.ownerId === guestId) throw new BadRequestException("Vous êtes propriétaire de ce logement.");
    const s = await this.settingsOrNull(property.id);
    if (!s?.enabled || property.status !== "PUBLISHED" || property.listingType !== "RENT") {
      throw new ConflictException("Ce logement n'accepte pas de réservation pour le moment.");
    }
    const { decision } = await this.access.check(property.id, guestId, "READ");
    if (decision.as === "PRO") throw new BadRequestException("Vous gérez ce logement : vous ne pouvez pas le réserver.");

    const rates = await this.rates(property.id, s);
    const commissionPct = await this.commissionPct();
    const booking = await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `stay:${property.id}`);
      await lockKey(tx, `stay-guest:${guestId}`);
      const taken = await this.takenRanges(property.id, checkIn, checkOut, tx);
      const refusals = checkStay({ checkIn, checkOut, guests: dto.guests }, s, taken, todayDay());
      if (refusals.length) throw this.refusal(refusals[0]!, s);
      const quote = quoteStay(rates, nightsBetween(checkIn, checkOut));
      if (!quote) throw new ConflictException("Ce logement n'a pas encore de prix par nuit.");
      const pending = await tx.booking.findMany({
        where: { guestId, status: "REQUESTED" },
        select: { propertyId: true, checkIn: true, checkOut: true },
      });
      if (pending.length >= MAX_PENDING_REQUESTS) {
        throw new ConflictException(`Vous avez déjà ${MAX_PENDING_REQUESTS} demandes en attente : attendez une réponse ou annulez-en une.`);
      }
      if (pending.some((p) => p.propertyId === property.id && overlaps({ start: p.checkIn, end: p.checkOut }, { start: checkIn, end: checkOut }))) {
        throw new ConflictException("Vous avez déjà une demande en attente pour ce logement à ces dates.");
      }
      const year = new Date().getUTCFullYear();
      const counter = await tx.bookingCounter.upsert({
        where: { year },
        create: { year, last: 1 },
        update: { last: { increment: 1 } },
      });
      return tx.booking.create({
        data: {
          reference: `SEJ-${year}-${String(counter.last).padStart(5, "0")}`,
          propertyId: property.id,
          guestId,
          checkIn,
          checkOut,
          nights: quote.nights,
          guests: dto.guests,
          currency: property.currency,
          nightlyRate: quote.nightlyRate,
          cleaningFee: quote.cleaningFee,
          total: quote.total,
          commissionPct,
          cancellationPolicy: s.cancellationPolicy,
          paymentMode: s.paymentMode,
          message: dto.message?.trim() || null,
          expiresAt: deadline(ANSWER_HOURS, checkIn),
        },
        include: { property: { select: PROPERTY_CARD } },
      });
    });

    const guest = await this.prisma.user.findUnique({ where: { id: guestId }, select: { firstName: true, lastName: true } });
    const guestName = `${guest?.firstName ?? ""} ${guest?.lastName ?? ""}`.trim();
    await this.notifyHosts(booking, "requested", { guest: guestName });
    return this.shapeBooking(booking, "GUEST");
  }

  private refusal(code: string, s: StaySettings) {
    switch (code) {
      case "TOO_SOON":
        return new BadRequestException(`Ce logement se réserve au moins ${s.minNoticeDays} jour(s) à l'avance.`);
      case "TOO_FAR":
        return new BadRequestException("Les réservations sont ouvertes jusqu'à 18 mois à l'avance.");
      case "MIN_NIGHTS":
        return new BadRequestException(`Séjour de ${s.minNights} nuit(s) minimum pour ce logement.`);
      case "MAX_NIGHTS":
        return new BadRequestException("Séjour trop long pour ce logement.");
      case "MAX_GUESTS":
        return new BadRequestException(`Ce logement accueille ${s.maxGuests} voyageur(s) au plus.`);
      case "UNAVAILABLE":
        return new ConflictException("Ces dates ne sont plus disponibles.");
      default:
        return new BadRequestException("Dates invalides : le départ doit suivre l'arrivée.");
    }
  }

  async myBookings(guestId: string) {
    const rows = await this.prisma.booking.findMany({
      where: { guestId },
      orderBy: { checkIn: "desc" },
      take: 300,
      include: { property: { select: PROPERTY_CARD }, review: true },
    });
    return Promise.all(rows.map((b) => this.shapeBooking(b, "GUEST")));
  }

  /** Une réservation (voyageur ou hôte) ; instructions d'arrivée une fois confirmée. */
  async getBooking(bookingId: string, userId: string) {
    const b = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: { select: PROPERTY_CARD }, review: true, guest: { select: { firstName: true, lastName: true, email: true, phone: true } } },
    });
    if (!b) throw new NotFoundException("Réservation introuvable.");
    if (b.guestId === userId) {
      const { guest: _g, ...rest } = b;
      return this.shapeBooking(rest, "GUEST");
    }
    const { decision } = await this.access.check(b.propertyId, userId, "STAYS");
    if (!decision.allowed) throw new NotFoundException("Réservation introuvable.");
    return this.shapeBooking(b, "HOST");
  }

  private async paymentMethods(propertyId: string, ownerId: string) {
    const m = await this.access.activeMandate(propertyId);
    const full = m
      ? await this.prisma.mandate.findUnique({ where: { id: m.id }, select: { rentPayee: true, agency: { select: { id: true, name: true, paymentIban: true, paymentHolder: true } } } })
      : null;
    if (full && agencyCollectsRent(full)) {
      return [
        {
          id: `agency-${full.agency.id}`,
          label: tr("label.agencyTransfer", { agency: full.agency.name }),
          value: full.agency.paymentIban!,
          holder: full.agency.paymentHolder ?? full.agency.name,
          instructions: tr("label.agencyTransferInstructions", { agency: full.agency.name }),
        },
      ];
    }
    return this.prisma.ownerPaymentMethod.findMany({
      where: { ownerId, active: true },
      orderBy: [{ position: "asc" }],
      select: { id: true, label: true, value: true, holder: true, instructions: true },
    });
  }

  private async shapeBooking(b: BookingWithProperty & { review?: unknown; guest?: unknown }, as: "GUEST" | "HOST") {
    const { property, ...rest } = b;
    const settings =
      b.status === "CONFIRMED" || b.status === "COMPLETED" || b.status === "ACCEPTED" || as === "HOST"
        ? await this.prisma.staySettings.findUnique({
            where: { propertyId: b.propertyId },
            select: { arrivalInstructions: true, checkInFrom: true, checkOutBefore: true, houseRules: true },
          })
        : null;
    const revealAddress = as === "HOST" || b.status === "CONFIRMED" || b.status === "COMPLETED";
    const needsPayment = b.status === "ACCEPTED" && b.paymentMode === "BEFORE_ARRIVAL";
    const { ownerId: _o, addressLine, ...card } = property;
    const commission = Math.round(b.total * b.commissionPct) / 100;
    return {
      ...rest,
      // Commission : information de l'hôte seulement.
      commissionPct: as === "HOST" ? b.commissionPct : undefined,
      commissionAmount: as === "HOST" ? commission : undefined,
      hostPayout: as === "HOST" ? Math.round((b.total - commission) * 100) / 100 : undefined,
      property: { ...shapeProperty(card), addressLine: revealAddress ? addressLine : undefined },
      arrivalInstructions: revealAddress ? settings?.arrivalInstructions ?? null : undefined,
      checkInFrom: settings?.checkInFrom,
      checkOutBefore: settings?.checkOutBefore,
      houseRules: settings?.houseRules ?? null,
      paymentMethods: needsPayment || (as === "HOST" && b.paymentMode === "BEFORE_ARRIVAL")
        ? await this.paymentMethods(b.propertyId, property.ownerId)
        : undefined,
      canReview: as === "GUEST" && this.reviewOpen(b) && !b.review,
    };
  }

  private reviewOpen(b: { status: BookingStatus; checkOut: Date }) {
    return b.status === "COMPLETED" && todayDay().getTime() <= addDays(b.checkOut, REVIEW_WINDOW_DAYS).getTime();
  }

  // ─────────────────────────── Hôte : réponses ───────────────────────────

  async hostBookings(userId: string, q: { status?: BookingStatus; propertyId?: string }) {
    const where = await this.access.propertyWhere(userId, "STAYS");
    const rows = await this.prisma.booking.findMany({
      where: {
        property: where,
        ...(q.status ? { status: q.status } : {}),
        ...(q.propertyId ? { propertyId: q.propertyId } : {}),
      },
      orderBy: [{ checkIn: "asc" }],
      take: 500,
      include: {
        property: { select: PROPERTY_CARD },
        review: true,
        guest: { select: { firstName: true, lastName: true, email: true, phone: true } },
      },
    });
    return Promise.all(rows.map((b) => this.shapeBooking(b, "HOST")));
  }

  private async loadForHost(bookingId: string, userId: string) {
    const b = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: { select: PROPERTY_CARD }, guest: { select: { id: true, email: true, firstName: true, lastName: true } } },
    });
    if (!b) throw new NotFoundException("Réservation introuvable.");
    const { decision, ctx } = await this.access.check(b.propertyId, userId, "STAYS");
    if (!decision.allowed) {
      throw new ForbiddenException({
        statusCode: 403,
        code: decision.code,
        message: decision.as === "NONE" ? "Cette réservation ne concerne pas vos logements." : decision.message,
      });
    }
    return { b, decision, ctx };
  }

  /** Transition atomique (statut attendu) → 409 si la réservation vient de changer. */
  private async transition(
    tx: Prisma.TransactionClient,
    id: string,
    from: BookingStatus[],
    data: Prisma.BookingUpdateManyMutationInput,
  ) {
    const { count } = await tx.booking.updateMany({ where: { id, status: { in: from } }, data });
    if (count === 0) throw new ConflictException("Cette réservation vient d'être modifiée : rechargez la page.");
  }

  private async logPro(decisionAs: string, propertyId: string, userId: string, kind: string, data: Prisma.InputJsonValue) {
    if (decisionAs !== "PRO") return;
    const m = await this.access.activeMandate(propertyId);
    if (m) await this.access.logEvent(m.id, userId, kind, data).catch(() => {});
  }

  async accept(bookingId: string, userId: string, note?: string | null) {
    const { b, decision } = await this.loadForHost(bookingId, userId);
    if (b.status !== "REQUESTED") throw new ConflictException("Cette demande n'est plus en attente.");
    if (b.expiresAt && b.expiresAt.getTime() < Date.now()) throw new ConflictException("Le délai de réponse est dépassé : la demande a expiré.");
    const confirmed = b.paymentMode === "ON_ARRIVAL";
    let declined: Array<{ id: string }> = [];
    try {
      declined = await this.prisma.$transaction(async (tx) => {
        await lockKey(tx, `stay:${b.propertyId}`);
        const taken = await this.takenRanges(b.propertyId, b.checkIn, b.checkOut, tx, b.id);
        if (taken.some((r) => overlaps(r, { start: b.checkIn, end: b.checkOut }))) {
          throw new ConflictException("Ces dates sont déjà prises (autre réservation ou fermeture).");
        }
        await this.transition(tx, b.id, ["REQUESTED"], {
          status: confirmed ? "CONFIRMED" : "ACCEPTED",
          answeredAt: new Date(),
          answeredById: userId,
          hostNote: note?.trim() || b.hostNote,
          expiresAt: confirmed ? null : deadline(PAYMENT_HOURS, b.checkIn),
        });
        // Les autres demandes sur ces dates deviennent impossibles : refusées.
        const others = await tx.booking.findMany({
          where: { propertyId: b.propertyId, status: "REQUESTED", id: { not: b.id }, checkIn: { lt: b.checkOut }, checkOut: { gt: b.checkIn } },
          select: { id: true },
        });
        if (others.length) {
          await tx.booking.updateMany({
            where: { id: { in: others.map((o) => o.id) }, status: "REQUESTED" },
            data: { status: "DECLINED", answeredAt: new Date(), answeredById: userId, hostNote: tr("stay.autoDeclined") },
          });
        }
        return others;
      });
    } catch (e) {
      // Contrainte d'exclusion (chevauchement) : course perdue avec une autre acceptation.
      if ((e as { code?: string })?.code === "P2010" || /Booking_no_overlap/.test(String((e as Error)?.message))) {
        throw new ConflictException("Ces dates sont déjà prises (autre réservation ou fermeture).");
      }
      throw e;
    }
    await this.logPro(decision.as, b.propertyId, userId, "STAY_ACCEPTED", { bookingId: b.id, reference: b.reference });
    await this.notifyGuest(b, confirmed ? "confirmed" : "accepted", { note: note?.trim() || undefined });
    for (const o of declined) {
      const other = await this.prisma.booking.findUnique({ where: { id: o.id }, include: { property: { select: PROPERTY_CARD }, guest: { select: { id: true, email: true, firstName: true, lastName: true } } } });
      if (other) await this.notifyGuest(other, "declined", { note: tr("stay.autoDeclined") });
    }
    return this.getBooking(b.id, userId);
  }

  async decline(bookingId: string, userId: string, note?: string | null) {
    const { b, decision } = await this.loadForHost(bookingId, userId);
    if (b.status !== "REQUESTED") throw new ConflictException("Cette demande n'est plus en attente.");
    await this.prisma.$transaction((tx) =>
      this.transition(tx, b.id, ["REQUESTED"], { status: "DECLINED", answeredAt: new Date(), answeredById: userId, hostNote: note?.trim() || null }),
    );
    await this.logPro(decision.as, b.propertyId, userId, "STAY_DECLINED", { bookingId: b.id, reference: b.reference });
    await this.notifyGuest(b, "declined", { note: note?.trim() || undefined });
    return this.getBooking(b.id, userId);
  }

  /** Voyageur : « j'ai payé » (paiement avant l'arrivée). */
  async declarePayment(bookingId: string, guestId: string, dto: { method: string; reference: string }) {
    const b = await this.prisma.booking.findUnique({ where: { id: bookingId }, include: { property: { select: PROPERTY_CARD } } });
    if (!b || b.guestId !== guestId) throw new NotFoundException("Réservation introuvable.");
    if (b.status !== "ACCEPTED" || b.paymentMode !== "BEFORE_ARRIVAL") {
      throw new ConflictException("Aucun paiement n'est attendu pour cette réservation.");
    }
    await this.prisma.$transaction((tx) =>
      this.transition(tx, b.id, ["ACCEPTED"], {
        paymentDeclaredAt: new Date(),
        paymentMethod: dto.method.trim().slice(0, 80),
        paymentReference: dto.reference.trim().slice(0, 120),
      }),
    );
    await this.notifyHosts(b, "paymentDeclared", { method: dto.method.trim(), payRef: dto.reference.trim() });
    return this.getBooking(b.id, guestId);
  }

  /** Hôte : paiement reçu → séjour confirmé. */
  async confirmPayment(bookingId: string, userId: string) {
    const { b, decision } = await this.loadForHost(bookingId, userId);
    if (b.status !== "ACCEPTED") throw new ConflictException("Cette réservation n'attend pas de paiement.");
    await this.prisma.$transaction((tx) =>
      this.transition(tx, b.id, ["ACCEPTED"], { status: "CONFIRMED", paidAt: new Date(), expiresAt: null }),
    );
    await this.logPro(decision.as, b.propertyId, userId, "STAY_PAID", { bookingId: b.id, reference: b.reference });
    await this.notifyGuest(b, "confirmed", {});
    return this.getBooking(b.id, userId);
  }

  /** Hôte : paiement déclaré mais non reçu → le voyageur doit vérifier (délai prolongé de 24 h). */
  async rejectPayment(bookingId: string, userId: string, note?: string | null) {
    const { b } = await this.loadForHost(bookingId, userId);
    if (b.status !== "ACCEPTED" || !b.paymentDeclaredAt) throw new ConflictException("Aucun paiement déclaré à vérifier.");
    await this.prisma.$transaction((tx) =>
      this.transition(tx, b.id, ["ACCEPTED"], {
        paymentDeclaredAt: null,
        hostNote: note?.trim() || b.hostNote,
        expiresAt: deadline(24, b.checkIn),
      }),
    );
    await this.notifyGuest(b, "paymentRejected", { note: note?.trim() || undefined });
    return this.getBooking(b.id, userId);
  }

  /** Annulation par le voyageur (demande ou séjour à venir). */
  async cancelByGuest(bookingId: string, guestId: string, reason?: string | null) {
    const b = await this.prisma.booking.findUnique({ where: { id: bookingId }, include: { property: { select: PROPERTY_CARD } } });
    if (!b || b.guestId !== guestId) throw new NotFoundException("Réservation introuvable.");
    if (!["REQUESTED", "ACCEPTED", "CONFIRMED"].includes(b.status)) throw new ConflictException("Cette réservation ne peut plus être annulée.");
    const today = todayDay();
    if (b.status !== "REQUESTED" && b.checkIn.getTime() <= today.getTime()) {
      throw new ConflictException("Le séjour a commencé : contactez l'hôte.");
    }
    const paid = !!b.paidAt;
    const refund = paid ? refundFor(b.cancellationPolicy, b.total, b.checkIn, today, "GUEST") : null;
    await this.prisma.$transaction((tx) =>
      this.transition(tx, b.id, [b.status], {
        status: "CANCELLED",
        cancelledAt: new Date(),
        cancelledBy: "GUEST",
        cancelReason: reason?.trim() || null,
        refundAmount: refund,
        expiresAt: null,
      }),
    );
    await this.notifyHosts(b, "cancelledByGuest", { reason: reason?.trim() || undefined });
    return this.getBooking(b.id, guestId);
  }

  /** Annulation par l'hôte (motif obligatoire) : remboursement intégral si payé. */
  async cancelByHost(bookingId: string, userId: string, reason: string) {
    const { b, decision } = await this.loadForHost(bookingId, userId);
    if (!["ACCEPTED", "CONFIRMED"].includes(b.status)) throw new ConflictException("Cette réservation ne peut pas être annulée.");
    if (b.checkOut.getTime() <= todayDay().getTime()) throw new ConflictException("Le séjour est terminé.");
    if (!reason?.trim()) throw new BadRequestException("Indiquez le motif de l'annulation au voyageur.");
    await this.prisma.$transaction((tx) =>
      this.transition(tx, b.id, [b.status], {
        status: "CANCELLED",
        cancelledAt: new Date(),
        cancelledBy: "HOST",
        cancelReason: reason.trim(),
        refundAmount: b.paidAt ? refundFor(b.cancellationPolicy, b.total, b.checkIn, todayDay(), "HOST") : null,
        expiresAt: null,
      }),
    );
    await this.logPro(decision.as, b.propertyId, userId, "STAY_CANCELLED", { bookingId: b.id, reference: b.reference });
    await this.notifyGuest(b, "cancelledByHost", { reason: reason.trim() });
    return this.getBooking(b.id, userId);
  }

  // ─────────────────────────── Avis ───────────────────────────

  async review(bookingId: string, guestId: string, dto: ReviewInput) {
    const b = await this.prisma.booking.findUnique({ where: { id: bookingId }, include: { review: true, property: { select: PROPERTY_CARD } } });
    if (!b || b.guestId !== guestId) throw new NotFoundException("Réservation introuvable.");
    if (b.review) throw new ConflictException("Vous avez déjà laissé un avis pour ce séjour.");
    if (!this.reviewOpen(b)) throw new ConflictException(`Un avis se laisse après le séjour, dans les ${REVIEW_WINDOW_DAYS} jours qui suivent le départ.`);
    try {
      await this.prisma.stayReview.create({
        data: { bookingId, propertyId: b.propertyId, authorId: guestId, rating: dto.rating, comment: dto.comment.trim() },
      });
    } catch (e) {
      if ((e as Prisma.PrismaClientKnownRequestError)?.code === "P2002") throw new ConflictException("Vous avez déjà laissé un avis pour ce séjour.");
      throw e;
    }
    await this.notifyHosts(b, "reviewed", { rating: dto.rating });
    return this.getBooking(bookingId, guestId);
  }

  async replyReview(reviewId: string, userId: string, reply: string) {
    const r = await this.prisma.stayReview.findUnique({ where: { id: reviewId } });
    if (!r) throw new NotFoundException("Avis introuvable.");
    await this.assertHost(r.propertyId, userId);
    if (r.reply) throw new ConflictException("Vous avez déjà répondu à cet avis.");
    return this.prisma.stayReview.update({ where: { id: reviewId }, data: { reply: reply.trim(), repliedAt: new Date() } });
  }

  // ─────────────────────────── Administration ───────────────────────────

  async adminOverview() {
    const [byStatus, upcoming, reviews, enabled] = await Promise.all([
      this.prisma.booking.groupBy({ by: ["status"], _count: { _all: true }, _sum: { total: true } }),
      this.prisma.booking.findMany({
        where: { status: { in: ["REQUESTED", "ACCEPTED", "CONFIRMED"] } },
        orderBy: { checkIn: "asc" },
        take: 100,
        include: { property: { select: { id: true, title: true, city: true, currency: true } }, guest: { select: { firstName: true, lastName: true, email: true } } },
      }),
      this.prisma.stayReview.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        include: { property: { select: { id: true, title: true } }, author: { select: { firstName: true, lastName: true } } },
      }),
      this.prisma.staySettings.count({ where: { enabled: true } }),
    ]);
    return {
      enabledProperties: enabled,
      byStatus: byStatus.map((s) => ({ status: s.status, count: s._count._all, total: s._sum.total ?? 0 })),
      upcoming,
      reviews,
      commissionPct: await this.commissionPct(),
    };
  }

  async setReviewHidden(reviewId: string, hidden: boolean) {
    const r = await this.prisma.stayReview.findUnique({ where: { id: reviewId }, select: { id: true } });
    if (!r) throw new NotFoundException("Avis introuvable.");
    return this.prisma.stayReview.update({ where: { id: reviewId }, data: { hidden } });
  }

  async setCommission(pct: number) {
    await this.prisma.platformSettings.upsert({
      where: { id: 1 },
      create: { id: 1, stayCommissionPct: pct },
      update: { stayCommissionPct: pct },
    });
    return { commissionPct: pct };
  }

  // ─────────────────────────── Notifications ───────────────────────────

  private mailParams(b: { reference: string; checkIn: Date; checkOut: Date; nights: number; guests: number; total: number; currency: string; property: { title: string } }) {
    return { reference: b.reference, title: b.property.title, checkIn: b.checkIn, checkOut: b.checkOut, nights: b.nights, guests: b.guests, total: b.total, currency: b.currency };
  }

  async notifyGuest(
    b: BookingWithProperty & { guest?: { email: string; firstName: string } | null },
    kind: string,
    extra: { note?: string; reason?: string },
  ) {
    const guest = b.guest ?? (await this.prisma.user.findUnique({ where: { id: b.guestId }, select: { email: true, firstName: true } }));
    if (!guest) return;
    this.mailer
      .bookingEvent(guest.email, guest.firstName, kind, { ...this.mailParams(b), ...extra, url: `${tenantUrl()}/voyage/reservations` })
      .catch(() => {});
  }

  async notifyHosts(b: BookingWithProperty, kind: string, extra: { guest?: string; reason?: string; method?: string; payRef?: string; rating?: number }) {
    const owner = await this.prisma.user.findUnique({ where: { id: b.property.ownerId }, select: { id: true, email: true, firstName: true, activatedAt: true } });
    const pros = await this.access.proRecipients(b.propertyId).catch(() => []);
    const seen = new Set<string>();
    const params = { ...this.mailParams(b), ...extra, url: `${ownerUrl()}/dashboard/sejours` };
    for (const r of [...(owner?.activatedAt ? [owner] : []), ...pros]) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      this.mailer.bookingEvent(r.email, r.firstName, kind, params).catch(() => {});
    }
  }

  // ─────────────────────────── Tâches planifiées ───────────────────────────

  /** Demandes sans réponse et paiements non reçus à temps → expirées ; séjours passés → terminés. */
  async sweep(now = new Date()) {
    const expiredRequests = await this.prisma.booking.findMany({
      where: { status: "REQUESTED", expiresAt: { lt: now } },
      include: { property: { select: PROPERTY_CARD }, guest: { select: { id: true, email: true, firstName: true, lastName: true } } },
      take: 500,
    });
    for (const b of expiredRequests) {
      const { count } = await this.prisma.booking.updateMany({ where: { id: b.id, status: "REQUESTED" }, data: { status: "EXPIRED" } });
      if (count) {
        await this.notifyGuest(b, "expired", {});
        await this.notifyHosts(b, "expiredHost", {});
      }
    }
    const unpaid = await this.prisma.booking.findMany({
      where: { status: "ACCEPTED", paymentDeclaredAt: null, expiresAt: { lt: now } },
      include: { property: { select: PROPERTY_CARD }, guest: { select: { id: true, email: true, firstName: true, lastName: true } } },
      take: 500,
    });
    for (const b of unpaid) {
      const { count } = await this.prisma.booking.updateMany({
        where: { id: b.id, status: "ACCEPTED", paymentDeclaredAt: null },
        data: { status: "EXPIRED", expiresAt: null },
      });
      if (count) {
        await this.notifyGuest(b, "unpaidExpired", {});
        await this.notifyHosts(b, "unpaidExpiredHost", {});
      }
    }
    const today = todayDay(now);
    const done = await this.prisma.booking.updateMany({
      where: { status: "CONFIRMED", checkOut: { lte: today } },
      data: { status: "COMPLETED" },
    });
    return { expired: expiredRequests.length, unpaid: unpaid.length, completed: done.count };
  }
}
