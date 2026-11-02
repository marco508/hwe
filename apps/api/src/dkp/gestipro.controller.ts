import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Injectable,
  Logger,
  NotFoundException,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { Trim } from "../common/email.util";
import { monthEnd, monthStart, today } from "../common/dates";
import { asLang, monthYear, t } from "../i18n/i18n";
import { feeLabel } from "../i18n/labels";
import { parseMonth } from "../mandates/fees";
import { dkpEnv } from "./dkp-env";
import type { FetchLike } from "./hub";
import { buildGestiproInvoices, isGestiproKey, maskKey } from "./gestipro";

export class GestiproKeyDto {
  @Trim() @IsString() @MinLength(11) @MaxLength(204) key!: string;
}

export class GestiproSendDto {
  @Trim() @IsString() @Matches(/^\d{4}-(0[1-9]|1[0-2])$/) month!: string;
}

let gpFetch: FetchLike = (url, init) => fetch(url, init);
/** Tests : remplace l'appel HTTP vers GestiPro. */
export function setGestiproFetch(f: FetchLike | null) {
  gpFetch = f ?? ((url, init) => fetch(url, init));
}

@Injectable()
export class GestiproService {
  private readonly logger = new Logger("GestiPro");

  constructor(private readonly prisma: PrismaService) {}

  private apiBase(): string {
    const base = dkpEnv().gestiproApi;
    if (!base) {
      throw new NotFoundException({ statusCode: 404, code: "GESTIPRO_DISABLED", message: "Connexion GestiPro non disponible." });
    }
    return base;
  }

  private async manager(userId: string) {
    const m = await this.prisma.agencyMember.findUnique({ where: { userId } });
    if (!m) throw new NotFoundException({ statusCode: 404, code: "NO_AGENCY", message: "Vous n'appartenez à aucune agence : créez la vôtre ou acceptez une invitation." });
    if (m.role !== "MANAGER") throw new ForbiddenException({ statusCode: 403, code: "MANAGER_ONLY", message: "Seul un responsable de l'agence gère la connexion GestiPro." });
    return m;
  }

  private async call<T>(key: string, path: string, body?: unknown): Promise<{ status: number; data: T | null }> {
    let res: Response;
    try {
      res = await gpFetch(`${this.apiBase()}${path}`, {
        method: body === undefined ? "GET" : "POST",
        headers: { authorization: `Bearer ${key}`, accept: "application/json", ...(body === undefined ? {} : { "content-type": "application/json" }) },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15_000),
      });
    } catch (e) {
      this.logger.warn(`GestiPro injoignable : ${(e as Error).message}`);
      throw new BadGatewayException({ statusCode: 502, code: "GESTIPRO_UNREACHABLE", message: "GestiPro ne répond pas. Réessayez dans un instant." });
    }
    const text = await res.text().catch(() => "");
    let data: T | null = null;
    try {
      data = text ? (JSON.parse(text) as T) : null;
    } catch {
      data = null;
    }
    return { status: res.status, data };
  }

  private async ping(key: string) {
    const r = await this.call<{ ok?: boolean; tenant?: { name?: string } }>(key, "/api/integrations/v1/ping");
    if (r.status === 401 || r.status === 403) {
      throw new BadRequestException({ statusCode: 400, code: "GESTIPRO_KEY_REFUSED", message: "Clé GestiPro refusée : vérifiez-la ou créez-en une nouvelle dans GestiPro." });
    }
    if (r.status >= 400 || !r.data?.ok) {
      throw new BadGatewayException({ statusCode: 502, code: "GESTIPRO_UNREACHABLE", message: "GestiPro ne répond pas. Réessayez dans un instant." });
    }
    return { tenantName: String(r.data.tenant?.name ?? "").slice(0, 160) || null };
  }

  async status(userId: string) {
    const m = await this.prisma.agencyMember.findUnique({ where: { userId } });
    const available = !!dkpEnv().gestiproApi;
    if (!m) return { available, connected: false, hint: null, tenantName: null, connectedAt: null, isManager: false };
    const a = await this.prisma.agency.findUniqueOrThrow({
      where: { id: m.agencyId },
      select: { gestiproKey: true, gestiproKeyHint: true, gestiproTenantName: true, gestiproConnectedAt: true },
    });
    return {
      available,
      connected: !!a.gestiproKey,
      hint: a.gestiproKeyHint,
      tenantName: a.gestiproTenantName,
      connectedAt: a.gestiproConnectedAt,
      isManager: m.role === "MANAGER",
    };
  }

  async connect(userId: string, rawKey: string) {
    this.apiBase();
    const m = await this.manager(userId);
    const key = rawKey.trim();
    if (!isGestiproKey(key)) {
      throw new BadRequestException({ statusCode: 400, code: "GESTIPRO_KEY_FORMAT", message: "Clé GestiPro invalide : elle commence par « gp_ »." });
    }
    const { tenantName } = await this.ping(key);
    await this.prisma.agency.update({
      where: { id: m.agencyId },
      data: { gestiproKey: key, gestiproKeyHint: maskKey(key), gestiproTenantName: tenantName, gestiproConnectedAt: new Date() },
    });
    return this.status(userId);
  }

  async disconnect(userId: string) {
    const m = await this.manager(userId);
    await this.prisma.agency.update({
      where: { id: m.agencyId },
      data: { gestiproKey: null, gestiproKeyHint: null, gestiproTenantName: null, gestiproConnectedAt: null },
    });
    return this.status(userId);
  }

  private async keyOf(agencyId: string): Promise<string> {
    const a = await this.prisma.agency.findUniqueOrThrow({ where: { id: agencyId }, select: { gestiproKey: true } });
    if (!a.gestiproKey) {
      throw new BadRequestException({ statusCode: 400, code: "GESTIPRO_NOT_CONNECTED", message: "Connectez d'abord GestiPro (clé d'intégration)." });
    }
    return a.gestiproKey;
  }

  async test(userId: string) {
    this.apiBase();
    const m = await this.manager(userId);
    const { tenantName } = await this.ping(await this.keyOf(m.agencyId));
    await this.prisma.agency.update({ where: { id: m.agencyId }, data: { gestiproTenantName: tenantName } });
    return { ok: true, tenantName };
  }

  /** Relevé du mois (honoraires dus dans le mois, hors annulés) → factures GestiPro. */
  async send(userId: string, month: string) {
    this.apiBase();
    const m = await this.manager(userId);
    const key = await this.keyOf(m.agencyId);
    const p = parseMonth(month);
    if (!p) throw new BadRequestException({ statusCode: 400, code: "INVALID_MONTH", message: "Mois invalide (format AAAA-MM)." });
    const from = monthStart(p.year, p.month);
    const to = monthEnd(p.year, p.month);
    // Un mois n'est envoyé qu'une fois terminé : l'envoi est définitif (une facture par
    // propriétaire et par mois), des honoraires ajoutés après ne seraient jamais facturés.
    if (today().getTime() <= to.getTime()) {
      throw new BadRequestException({ statusCode: 400, code: "MONTH_NOT_CLOSED", message: "Le relevé d'un mois s'envoie une fois le mois terminé." });
    }
    const rows = await this.prisma.feeEntry.findMany({
      where: { mandate: { agencyId: m.agencyId }, status: { not: "CANCELLED" }, dueDate: { gte: from, lte: to } },
      select: {
        id: true, kind: true, label: true, amount: true, currency: true, dueDate: true,
        mandate: { select: { reference: true, ownerId: true, property: { select: { title: true, city: true } } } },
      },
      orderBy: [{ dueDate: "asc" }, { id: "asc" }],
    });
    // Le mandat ne porte que l'identifiant du propriétaire (client de la facture).
    const owners = await this.prisma.user.findMany({
      where: { id: { in: [...new Set(rows.map((f) => f.mandate.ownerId))] } },
      select: { id: true, firstName: true, lastName: true, email: true, phone: true },
    });
    const ownerById = new Map(owners.map((o) => [o.id, o]));
    const fees = rows.flatMap((f) => {
      const owner = ownerById.get(f.mandate.ownerId);
      return owner ? [{ ...f, mandate: { reference: f.mandate.reference, property: f.mandate.property, owner } }] : [];
    });
    const me = await this.prisma.user.findUnique({ where: { id: userId }, select: { locale: true } });
    const lang = asLang(me?.locale);
    const mm = `${p.year}-${String(p.month).padStart(2, "0")}`;
    const end = today().getTime() < to.getTime() ? today() : to;
    const invoices = buildGestiproInvoices(m.agencyId, mm, fees, {
      label: (f) =>
        t(lang, "dkp.gestipro.item", {
          label: feeLabel({ kind: f.kind, label: f.label, currency: f.currency }, lang),
          property: f.mandate.property.title,
          mandate: f.mandate.reference,
        }),
      notes: (refs) => t(lang, "dkp.gestipro.notes", { month: monthYear(lang, p.year, p.month), refs: refs.join(", ") }),
      issuedAt: end.toISOString().slice(0, 10),
    });
    const results: Array<{ reference: string; customer: string; ok: boolean; url: string | null; id: string | null }> = [];
    for (const inv of invoices) {
      const r = await this.call<{ id?: string; url?: string }>(key, "/api/integrations/v1/invoices", inv);
      if (r.status === 401 || r.status === 403) {
        throw new BadRequestException({ statusCode: 400, code: "GESTIPRO_KEY_REFUSED", message: "Clé GestiPro refusée : vérifiez-la ou créez-en une nouvelle dans GestiPro." });
      }
      const ok = r.status < 300;
      if (!ok) this.logger.warn(`Facture ${inv.reference} refusée par GestiPro (${r.status}).`);
      results.push({ reference: inv.reference, customer: inv.customer.name, ok, url: ok ? r.data?.url ?? null : null, id: ok ? r.data?.id ?? null : null });
    }
    return { month: mm, fees: fees.length, invoices: results, sent: results.filter((r) => r.ok).length, failed: results.filter((r) => !r.ok).length };
  }
}

/** Espace pro : « Connecter GestiPro » (contrat §2.4). */
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.AGENT)
@Controller("agencies/me/gestipro")
export class GestiproController {
  constructor(private readonly gp: GestiproService) {}

  @Get()
  status(@CurrentUser() user: JwtPayload) {
    return this.gp.status(user.sub);
  }

  @Put()
  connect(@CurrentUser() user: JwtPayload, @Body() dto: GestiproKeyDto) {
    return this.gp.connect(user.sub, dto.key);
  }

  @Delete()
  disconnect(@CurrentUser() user: JwtPayload) {
    return this.gp.disconnect(user.sub);
  }

  @Post("test")
  test(@CurrentUser() user: JwtPayload) {
    return this.gp.test(user.sub);
  }

  @Post("send")
  send(@CurrentUser() user: JwtPayload, @Body() dto: GestiproSendDto) {
    return this.gp.send(user.sub, dto.month);
  }
}
