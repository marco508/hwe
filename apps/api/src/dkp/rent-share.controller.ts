import {
  BadRequestException,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Header,
  Injectable,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { resolveLeaseParty } from "../common/lease-party.util";
import { today } from "../common/dates";
import {
  RENT_SHARE_DAYS,
  RENT_SHARE_MAX_ACTIVE,
  checkPartner,
  hashShareCode,
  monthKey,
  newShareCode,
  normalizeShareCode,
  shareState,
} from "./rent-share";

const SHAREABLE = ["SIGNED", "ACTIVE"] as const;

@Injectable()
export class RentShareService {
  constructor(private readonly prisma: PrismaService) {}

  private async tenantLease(leaseId: string, user: JwtPayload) {
    const party = await resolveLeaseParty(this.prisma, leaseId, user);
    if (!party.isTenant) {
      throw new ForbiddenException({ statusCode: 403, code: "TENANT_ONLY", message: "Seul le locataire partage son loyer." });
    }
    return party.lease;
  }

  private shape(r: { id: string; hint: string; expiresAt: Date; revokedAt: Date | null; lastUsedAt: Date | null; useCount: number; createdAt: Date }) {
    return {
      id: r.id,
      hint: r.hint,
      expiresAt: r.expiresAt,
      revokedAt: r.revokedAt,
      lastUsedAt: r.lastUsedAt,
      useCount: r.useCount,
      createdAt: r.createdAt,
      state: shareState(r),
    };
  }

  async list(leaseId: string, user: JwtPayload) {
    await this.tenantLease(leaseId, user);
    const rows = await this.prisma.rentShareCode.findMany({ where: { leaseId }, orderBy: { createdAt: "desc" }, take: 20 });
    return rows.map((r) => this.shape(r));
  }

  async create(leaseId: string, user: JwtPayload) {
    const lease = await this.tenantLease(leaseId, user);
    if (!SHAREABLE.includes(lease.status as (typeof SHAREABLE)[number]) || lease.shortStay) {
      throw new BadRequestException({ statusCode: 400, code: "LEASE_NOT_SHAREABLE", message: "Ce bail ne permet pas de partager le loyer." });
    }
    const now = new Date();
    const active = await this.prisma.rentShareCode.count({ where: { leaseId, revokedAt: null, expiresAt: { gt: now } } });
    if (active >= RENT_SHARE_MAX_ACTIVE) {
      throw new ConflictException({ statusCode: 409, code: "TOO_MANY_SHARE_CODES", message: "Trop de codes de partage actifs : révoquez-en un d'abord." });
    }
    const code = newShareCode();
    const row = await this.prisma.rentShareCode.create({
      data: {
        leaseId,
        createdById: user.sub,
        codeHash: hashShareCode(code),
        hint: code.slice(-4),
        expiresAt: new Date(now.getTime() + RENT_SHARE_DAYS * 86_400_000),
      },
    });
    // Le code n'est renvoyé qu'ici, une seule fois (seule son empreinte est gardée).
    return { ...this.shape(row), code };
  }

  async revoke(leaseId: string, id: string, user: JwtPayload) {
    await this.tenantLease(leaseId, user);
    const row = await this.prisma.rentShareCode.findUnique({ where: { id } });
    if (!row || row.leaseId !== leaseId) {
      throw new NotFoundException({ statusCode: 404, code: "SHARE_CODE_NOT_FOUND", message: "Code de partage introuvable." });
    }
    const updated = row.revokedAt ? row : await this.prisma.rentShareCode.update({ where: { id }, data: { revokedAt: new Date() } });
    return this.shape(updated);
  }

  /** Lecture partenaire (FamiLyfe) : champs du contrat §2.5, rien d'autre. */
  async partnerRead(rawCode: string) {
    const notFound = () => new NotFoundException({ statusCode: 404, code: "SHARE_CODE_INVALID", message: "Code de partage invalide ou expiré." });
    const code = normalizeShareCode(rawCode);
    if (!/^HWE-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) throw notFound();
    const row = await this.prisma.rentShareCode.findUnique({
      where: { codeHash: hashShareCode(code) },
      include: {
        lease: {
          select: {
            status: true,
            shortStay: true,
            monthlyRent: true,
            charges: true,
            currency: true,
            rentPaymentDay: true,
            property: { select: { title: true, addressLine: true, city: true, country: true } },
          },
        },
      },
    });
    if (!row || shareState(row) !== "ACTIVE") throw notFound();
    const l = row.lease;
    if (!SHAREABLE.includes(l.status as (typeof SHAREABLE)[number]) || l.shortStay) throw notFound();
    await this.prisma.rentShareCode.update({ where: { id: row.id }, data: { lastUsedAt: new Date(), useCount: { increment: 1 } } });
    return {
      logement: l.property.title,
      adresse: [l.property.addressLine, l.property.city, l.property.country].filter(Boolean).join(", "),
      loyer: l.monthlyRent,
      charges: l.charges,
      devise: l.currency,
      jourEcheance: l.rentPaymentDay,
      periode: monthKey(today()),
      expireLe: row.expiresAt,
    };
  }
}

/** Espace locataire : codes de partage d'un bail. */
@UseGuards(JwtAuthGuard)
@Controller("leases/:leaseId/rent-share")
export class RentShareController {
  constructor(private readonly shares: RentShareService) {}

  @Get()
  list(@Param("leaseId") leaseId: string, @CurrentUser() user: JwtPayload) {
    return this.shares.list(leaseId, user);
  }

  @Post()
  create(@Param("leaseId") leaseId: string, @CurrentUser() user: JwtPayload) {
    return this.shares.create(leaseId, user);
  }

  @Delete(":id")
  revoke(@Param("leaseId") leaseId: string, @Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.shares.revoke(leaseId, id, user);
  }
}

/** API partenaire (clé `familyfe` dans DKP_PARTNER_KEYS). */
@Controller("partners/v1")
export class PartnersController {
  constructor(private readonly shares: RentShareService) {}

  @Get("loyer/:code")
  @Header("Cache-Control", "no-store")
  loyer(@Param("code") code: string, @Req() req: Request) {
    if (!checkPartner(req.headers, "familyfe")) {
      throw new UnauthorizedException({ statusCode: 401, code: "PARTNER_UNAUTHORIZED", message: "Clé partenaire invalide." });
    }
    return this.shares.partnerRead(code);
  }
}
