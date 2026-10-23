import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePropertyDto, IGNORED_PROPERTY_FIELDS, MediaInputDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { MAX_PAGE_SIZE, QueryPropertyDto } from "./dto/query-property.dto";
import { LeaseDurationUnit, Prisma, PropertyStatus } from "@prisma/client";
import { assertEmailVerified } from "../common/email-verified.util";
import { assertDataUrl, IMAGE_MIME } from "../common/upload.util";
import { MEDIA_SELECT, USER_PUBLIC_SELECT, mediaIdFromUrl, withMediaUrl } from "../common/media.util";

// Propriétaire tel que montré publiquement : jamais e-mail ni téléphone
// (aspiration, RGPD). Le contact passe par la messagerie ou la candidature.
const ownerSelect = USER_PUBLIC_SELECT;

/** Statuts visibles publiquement (fiche) ; DRAFT/ARCHIVED : propriétaire seulement. */
export const PUBLIC_DETAIL_STATUSES: PropertyStatus[] = ["PUBLISHED", "RENTED", "SOLD"];

const UNIT_ORDER: LeaseDurationUnit[] = ["DAYS", "WEEKS", "MONTHS", "YEARS"];

// Champs non nullables : un `null` envoyé par le formulaire vaut « inchangé ».
const NON_NULLABLE = new Set([
  "title", "description", "listingType", "propertyType", "status", "price", "currency",
  "surface", "rooms", "bedrooms", "bathrooms", "furnished", "hasParking", "hasBalcony",
  "hasGarden", "hasElevator", "isNew", "addressLine", "city", "postalCode", "country",
]);

/**
 * Unité et prix d'affichage : pour une location, l'unité la plus courte de
 * la grille tarifaire si elle existe (« 45 €/jour »), sinon le mois.
 */
export function derivePriceDisplay(p: {
  listingType: string;
  price: number;
  pricingRates?: Array<{ unit: LeaseDurationUnit; amount: number }>;
}): { priceUnit: LeaseDurationUnit | null; displayPrice: number } {
  if (p.listingType !== "RENT") return { priceUnit: null, displayPrice: p.price };
  const rates = [...(p.pricingRates ?? [])].sort(
    (a, b) => UNIT_ORDER.indexOf(a.unit) - UNIT_ORDER.indexOf(b.unit),
  );
  const shortest = rates[0];
  if (shortest) return { priceUnit: shortest.unit, displayPrice: shortest.amount };
  return { priceUnit: "MONTHS", displayPrice: p.price };
}

function shape<T extends { listingType: string; price: number; media?: Array<{ id: string }>; pricingRates?: Array<{ unit: LeaseDurationUnit; amount: number }> }>(p: T) {
  return {
    ...p,
    media: (p.media ?? []).map(withMediaUrl),
    ...derivePriceDisplay(p),
  };
}

function cleanData<T extends Record<string, unknown>>(dto: T): Record<string, unknown> {
  const data: Record<string, unknown> = { ...dto };
  for (const k of IGNORED_PROPERTY_FIELDS) delete data[k];
  delete data.media;
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || (v === null && NON_NULLABLE.has(k))) delete data[k];
  }
  return data;
}

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(q: QueryPropertyDto) {
    const page = q.page ?? 1;
    const pageSize = Math.min(q.pageSize ?? 20, MAX_PAGE_SIZE);

    const where: Prisma.PropertyWhereInput = {
      status: "PUBLISHED",
      ...(q.listingType ? { listingType: q.listingType } : {}),
      ...(q.propertyType ? { propertyType: q.propertyType } : {}),
      ...(q.country
        ? { country: { contains: q.country, mode: "insensitive" as const } }
        : {}),
      ...(q.city
        ? { city: { contains: q.city, mode: "insensitive" } }
        : {}),
      ...(q.minPrice !== undefined || q.maxPrice !== undefined
        ? {
            price: {
              ...(q.minPrice !== undefined ? { gte: q.minPrice } : {}),
              ...(q.maxPrice !== undefined ? { lte: q.maxPrice } : {}),
            },
          }
        : {}),
      ...(q.minSurface !== undefined || q.maxSurface !== undefined
        ? {
            surface: {
              ...(q.minSurface !== undefined ? { gte: q.minSurface } : {}),
              ...(q.maxSurface !== undefined ? { lte: q.maxSurface } : {}),
            },
          }
        : {}),
      ...(q.minRooms !== undefined ? { rooms: { gte: q.minRooms } } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        // Liste : uniquement la PREMIÈRE photo, et jamais son contenu (URL).
        include: {
          media: { orderBy: { position: "asc" }, take: 1, select: MEDIA_SELECT },
          owner: { select: ownerSelect },
          pricingRates: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.property.count({ where }),
    ]);

    return { items: items.map(shape), total, page, pageSize };
  }

  /** Compteurs publics de la landing (annonces publiées). */
  async stats() {
    const [byCountryRows, total, cityRows] = await Promise.all([
      this.prisma.property.groupBy({
        by: ["country"],
        where: { status: "PUBLISHED" },
        _count: { _all: true },
      }),
      this.prisma.property.count({ where: { status: "PUBLISHED" } }),
      this.prisma.$queryRaw<Array<{ n: bigint }>>`
        SELECT count(DISTINCT lower(btrim("city"))) AS n
        FROM "Property" WHERE "status" = 'PUBLISHED'`,
    ]);
    const byCountry: Record<string, number> = {};
    for (const r of byCountryRows) byCountry[r.country] = r._count._all;
    return {
      total,
      byCountry,
      cities: Number(cityRows[0]?.n ?? 0),
      countries: byCountryRows.length,
    };
  }

  /**
   * Fiche d'un bien. Publique pour PUBLISHED/RENTED/SOLD (le front affiche
   * un badge et masque candidature/visite hors PUBLISHED) ; brouillons et
   * archives : 404 sauf pour leur propriétaire connecté.
   */
  async findById(id: string, viewerId?: string | null) {
    const p = await this.prisma.property.findUnique({
      where: { id },
      include: {
        media: { orderBy: { position: "asc" }, select: MEDIA_SELECT },
        owner: { select: ownerSelect },
        pricingRates: true,
      },
    });
    if (!p) throw new NotFoundException("Annonce introuvable.");
    if (!PUBLIC_DETAIL_STATUSES.includes(p.status) && p.ownerId !== viewerId) {
      throw new NotFoundException("Annonce introuvable.");
    }
    return shape(p);
  }

  async listMine(ownerId: string) {
    const items = await this.prisma.property.findMany({
      where: { ownerId },
      include: {
        media: { orderBy: { position: "asc" }, select: MEDIA_SELECT },
        pricingRates: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return items.map(shape);
  }

  /** Valide les photos neuves (data-URL d'image) ; refuse toute autre URL. */
  private assertNewMedia(media: MediaInputDto[]) {
    for (const m of media) {
      if (!m.url?.startsWith("data:")) {
        throw new BadRequestException(
          "Chaque photo doit être une image téléversée (JPEG, PNG ou WebP).",
        );
      }
      assertDataUrl(m.url, "photo", { allowed: IMAGE_MIME });
    }
  }

  async create(ownerId: string, dto: CreatePropertyDto) {
    await assertEmailVerified(this.prisma, ownerId);
    const media = dto.media ?? [];
    this.assertNewMedia(media);
    const price = dto.price ?? 0;
    if (dto.listingType === "SALE" && !(price > 0)) {
      throw new BadRequestException("Indiquez le prix de vente.");
    }
    const data = cleanData(dto as unknown as Record<string, unknown>);
    const created = await this.prisma.property.create({
      data: {
        ...(data as Omit<Prisma.PropertyUncheckedCreateInput, "ownerId">),
        price,
        ownerId,
        media: media.length
          ? {
              create: media.map((m, i) => ({
                url: m.url,
                alt: m.alt ?? null,
                position: m.position ?? i,
              })),
            }
          : undefined,
      },
      include: {
        media: { orderBy: { position: "asc" }, select: MEDIA_SELECT },
        owner: { select: ownerSelect },
        pricingRates: true,
      },
    });
    return shape(created);
  }

  async update(ownerId: string, id: string, dto: UpdatePropertyDto) {
    const existing = await this.prisma.property.findUnique({
      where: { id },
      include: { media: { select: { id: true } } },
    });
    if (!existing) throw new NotFoundException("Annonce introuvable.");
    if (existing.ownerId !== ownerId)
      throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");

    // Photos : data-URL = nouvelle photo ; URL /media/<id> = photo existante
    // de CE bien, conservée (son id, donc son cache, ne change pas).
    const media = dto.media;
    const keep = new Map<string, { position: number; alt: string | null }>();
    const fresh: Array<{ url: string; alt: string | null; position: number }> = [];
    if (media) {
      const own = new Set(existing.media.map((m) => m.id));
      media.forEach((m, i) => {
        const position = m.position ?? i;
        if (m.url?.startsWith("data:")) {
          assertDataUrl(m.url, "photo", { allowed: IMAGE_MIME });
          fresh.push({ url: m.url, alt: m.alt ?? null, position });
          return;
        }
        const mid = mediaIdFromUrl(m.url);
        if (!mid || !own.has(mid)) {
          throw new BadRequestException(
            "Photo invalide : téléversez une image (JPEG, PNG ou WebP) ou conservez une photo existante du bien.",
          );
        }
        keep.set(mid, { position, alt: m.alt ?? null });
      });
    }

    const data = cleanData(dto as unknown as Record<string, unknown>);
    const updated = await this.prisma.$transaction(async (tx) => {
      if (media) {
        await tx.propertyMedia.deleteMany({
          where: { propertyId: id, id: { notIn: [...keep.keys()] } },
        });
        for (const [mid, v] of keep) {
          await tx.propertyMedia.update({
            where: { id: mid },
            data: { position: v.position, ...(v.alt != null ? { alt: v.alt } : {}) },
          });
        }
        if (fresh.length) {
          await tx.propertyMedia.createMany({
            data: fresh.map((m) => ({ ...m, propertyId: id })),
          });
        }
      }
      return tx.property.update({
        where: { id },
        data: data as Prisma.PropertyUncheckedUpdateInput,
        include: {
          media: { orderBy: { position: "asc" }, select: MEDIA_SELECT },
          owner: { select: ownerSelect },
          pricingRates: true,
        },
      });
    });
    return shape(updated);
  }

  /**
   * Suppression : seulement si le bien n'a jamais eu de bail signé. Sinon
   * 409 → l'archiver (PATCH status ARCHIVED) : l'historique des baux et
   * quittances du locataire doit rester.
   */
  async remove(ownerId: string, id: string) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Annonce introuvable.");
    if (existing.ownerId !== ownerId) throw new ForbiddenException("Vous n'êtes pas propriétaire de ce bien");
    const signed = await this.prisma.leaseContract.count({
      where: { propertyId: id, status: { not: "DRAFT" } },
    });
    if (signed > 0) {
      throw new ConflictException({
        statusCode: 409,
        code: "PROPERTY_HAS_LEASES",
        message: "Ce bien a un historique de bail : archivez-le plutôt que de le supprimer.",
      });
    }
    await this.prisma.$transaction([
      this.prisma.leaseContract.deleteMany({ where: { propertyId: id, status: "DRAFT" } }),
      this.prisma.property.delete({ where: { id } }),
    ]);
    return { ok: true };
  }
}
