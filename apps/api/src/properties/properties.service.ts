import {
  BadRequestException,
  ConflictException,
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
import { MEDIA_SELECT, USER_PUBLIC_SELECT, mediaIdFromUrl, withMediaUrl, agencyLogoUrl } from "../common/media.util";
import { AccessAction, PropertyAccessService, decideAccess } from "../common/property-access";
import { FeesService } from "../mandates/fees.service";
import { today as todayDay } from "../common/dates";

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

/** Agence qui gère un bien (mandat ACTIVE), telle que montrée publiquement. */
export interface ManagedBy {
  agencyId: string;
  name: string;
  slug: string;
  logoUrl: string | null;
}

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: PropertyAccessService,
    private readonly fees: FeesService,
  ) {}

  /** `managedBy` de chaque bien : agence titulaire d'un mandat ACTIVE, sinon null. */
  async managedByMap(propertyIds: string[]): Promise<Map<string, ManagedBy>> {
    const out = new Map<string, ManagedBy>();
    if (propertyIds.length === 0) return out;
    const today = todayDay();
    const mandates = await this.prisma.mandate.findMany({
      where: {
        propertyId: { in: propertyIds },
        status: "ACTIVE",
        OR: [{ endDate: null }, { endDate: { gte: today } }],
      },
      select: { propertyId: true, agency: { select: { id: true, name: true, slug: true, logoKey: true } } },
    });
    for (const m of mandates) {
      out.set(m.propertyId, {
        agencyId: m.agency.id,
        name: m.agency.name,
        slug: m.agency.slug,
        logoUrl: agencyLogoUrl(m.agency.logoKey),
      });
    }
    return out;
  }

  private async withManagedBy<T extends { id: string }>(items: T[]): Promise<Array<T & { managedBy: ManagedBy | null }>> {
    const map = await this.managedByMap(items.map((i) => i.id));
    return items.map((i) => ({ ...i, managedBy: map.get(i.id) ?? null }));
  }

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

    // Prix de vente final : donnée privée (propriétaire et mandataire).
    const publicItems = items.map(shape).map(({ soldPrice: _s, ...rest }) => rest);
    return { items: await this.withManagedBy(publicItems), total, page, pageSize };
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
    // Propriétaire ou pro mandataire autorisé : vue complète.
    const privileged =
      !!viewerId &&
      (p.ownerId === viewerId || decideAccess(await this.access.context(id, viewerId), "LEASE_READ").allowed);
    if (!PUBLIC_DETAIL_STATUSES.includes(p.status) && !privileged) {
      // Brouillon / archive : propriétaire et pro mandataire seulement.
      throw new NotFoundException("Annonce introuvable.");
    }
    const shaped = shape(p);
    const [withManaged] = await this.withManagedBy([
      privileged ? shaped : (({ soldPrice: _s, ...rest }) => rest)(shaped),
    ]);
    return withManaged;
  }

  /**
   * Mes biens. Propriétaire : ses biens. Professionnel (AGENT) : les biens
   * que son agence gère et qui lui sont accessibles (manager : tous ; agent :
   * ceux qui lui sont assignés), avec le mandat et le propriétaire.
   */
  async listMine(userId: string, role?: string) {
    if (role === "AGENT") return this.listManaged(userId);
    const items = await this.prisma.property.findMany({
      where: { ownerId: userId },
      include: {
        media: { orderBy: { position: "asc" }, select: MEDIA_SELECT },
        pricingRates: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return this.withManagedBy(items.map(shape));
  }

  /** Portefeuille d'un pro (mêmes champs que listMine + mandate, owner, access). */
  async listManaged(userId: string) {
    const ids = await this.access.managedPropertyIds(userId, "LEASE_READ");
    if (ids.length === 0) return [];
    const items = await this.prisma.property.findMany({
      where: { id: { in: ids } },
      include: {
        media: { orderBy: { position: "asc" }, select: MEDIA_SELECT },
        pricingRates: true,
        owner: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, activatedAt: true } },
        mandates: {
          where: { status: "ACTIVE" },
          select: { id: true, reference: true, type: true, status: true, assignedAgentId: true, startDate: true, endDate: true, rentPayee: true },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const withManaged = await this.withManagedBy(items.map(shape));
    const out = [];
    for (const p of withManaged) {
      const ctx = await this.access.context(p.id, userId);
      const actions = (["READ", "EDIT_LISTING", "ACCEPT_TENANT", "SIGN_LEASE", "RENTS", "OWNER_NOTICE"] as AccessAction[]);
      const can: Record<string, boolean> = {};
      for (const a of actions) can[a] = decideAccess(ctx, a).allowed;
      const { mandates, owner, ...rest } = p;
      out.push({
        ...rest,
        owner: { ...owner, activated: !!owner.activatedAt },
        mandate: mandates[0] ?? null,
        access: { as: "PRO", ownerActivated: ctx.ownerActivated, can },
      });
    }
    return out;
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

  /**
   * Création d'un bien. `opts.tx` / `opts.skipEmailCheck` : création par un
   * professionnel pour un propriétaire invité (l'e-mail vérifié exigé est
   * celui du pro, contrôlé par l'appelant).
   */
  async create(
    ownerId: string,
    dto: CreatePropertyDto,
    opts: { skipEmailCheck?: boolean; tx?: Prisma.TransactionClient } = {},
  ) {
    if (!opts.skipEmailCheck) await assertEmailVerified(this.prisma, ownerId);
    const media = dto.media ?? [];
    this.assertNewMedia(media);
    const price = dto.price ?? 0;
    if (dto.listingType === "SALE" && !(price > 0)) {
      throw new BadRequestException("Indiquez le prix de vente.");
    }
    const data = cleanData(dto as unknown as Record<string, unknown>);
    const created = await (opts.tx ?? this.prisma).property.create({
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

  async update(userId: string, id: string, dto: UpdatePropertyDto) {
    const existing = await this.prisma.property.findUnique({
      where: { id },
      include: { media: { select: { id: true } } },
    });
    if (!existing) throw new NotFoundException("Annonce introuvable.");
    const { decision } = await this.access.assert(id, userId, "EDIT_LISTING");

    // Vente conclue : prix final requis si un mandat de vente est actif.
    const salePrice = dto.salePrice;
    const becomesSold = dto.status === "SOLD" && existing.status !== "SOLD";
    if (salePrice != null && dto.status !== "SOLD" && existing.status !== "SOLD") {
      throw new BadRequestException("Le prix de vente final s'indique en passant le bien en « vendu » (SOLD).");
    }
    if (becomesSold && salePrice == null) {
      const saleMandate = await this.prisma.mandate.findFirst({
        where: { propertyId: id, status: "ACTIVE", type: "SALE" },
        select: { id: true },
      });
      if (saleMandate) {
        throw new BadRequestException({
          statusCode: 400,
          code: "SALE_PRICE_REQUIRED",
          message: "Indiquez le prix de vente final (salePrice) : il sert au calcul des honoraires.",
        });
      }
    }

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
    delete data.salePrice;
    if (becomesSold) {
      data.soldAt = new Date();
      if (salePrice != null) data.soldPrice = salePrice;
    } else if (salePrice != null && existing.status === "SOLD") {
      data.soldPrice = salePrice;
    }
    const updated = await this.prisma.$transaction(async (tx) => {
      if (salePrice != null && (becomesSold || existing.status === "SOLD")) {
        await this.fees.onPropertySold(tx, id, salePrice, userId);
      }
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
    if (decision.as === "PRO") {
      const m = await this.access.activeMandate(id);
      if (m) {
        await this.access.logEvent(m.id, userId, becomesSold ? "PROPERTY_SOLD" : "PROPERTY_UPDATED", {
          fields: Object.keys(data).slice(0, 30),
          ...(becomesSold ? { salePrice: salePrice ?? null } : {}),
        });
      }
    } else if (becomesSold) {
      const m = await this.access.activeMandate(id);
      if (m) await this.access.logEvent(m.id, userId, "PROPERTY_SOLD", { salePrice: salePrice ?? null });
    }
    const [withManaged] = await this.withManagedBy([shape(updated)]);
    return withManaged;
  }

  /**
   * Suppression : seulement si le bien n'a jamais eu de bail signé. Sinon
   * 409 → l'archiver (PATCH status ARCHIVED) : l'historique des baux et
   * quittances du locataire doit rester.
   */
  async remove(userId: string, id: string) {
    const existing = await this.prisma.property.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Annonce introuvable.");
    await this.access.assert(id, userId, "DELETE_PROPERTY");
    // Un mandat ouvert ou porteur d'honoraires : on archive, on ne supprime pas.
    const keptMandates = await this.prisma.mandate.count({
      where: {
        propertyId: id,
        OR: [{ status: { in: ["ACTIVE", "PENDING_OWNER"] } }, { fees: { some: {} } }],
      },
    });
    if (keptMandates > 0) {
      throw new ConflictException({
        statusCode: 409,
        code: "PROPERTY_HAS_MANDATE",
        message: "Ce bien est (ou a été) confié à un professionnel : mettez fin au mandat puis archivez-le plutôt que de le supprimer.",
      });
    }
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
      this.prisma.mandate.deleteMany({ where: { propertyId: id } }),
      this.prisma.property.delete({ where: { id } }),
    ]);
    return { ok: true };
  }
}
