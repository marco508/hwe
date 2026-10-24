import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PaymentMethod, Prisma, SubscriptionRequestStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mail/mailer.service";
import type { NoticeParams } from "../mail/templates";
import { asLang, pdfLang, planText, requestLang, t, type Lang } from "../i18n/i18n";
import { APP_TIME_ZONE } from "../common/dates";
import { lockKey, withAdvisoryLock } from "../common/advisory-lock";
import { agencyLogoUrl } from "../common/media.util";
import { ownerWebBase } from "../agencies/agency.util";
import {
  AgencySubscription,
  FREE_PLAN_CODE,
  ReminderKind,
  daysLeft,
  formatInvoiceNumber,
  invalidateSubscriptionCache,
  loadAgencySubscription,
  loadSettings,
  loadWritableMandates,
  paymentPeriod,
  reminderFor,
} from "../common/subscription";
import { buildInvoicePdf } from "./invoice-pdf";
import { FxService } from "../fx/fx.service";
import { basePrice, billingCurrencyOf, normalizePrices, planOffer, type PriceRow } from "./pricing";
import {
  AdminAgencySubscriptionDto,
  AdminPaymentDto,
  CreateSubscriptionRequestDto,
  PlanDto,
  PlatformSettingsDto,
  UpdatePlanDto,
} from "./subscription.dto";

type Tx = Prisma.TransactionClient;

/** Libellé d'un moyen de paiement dans la langue (factures). */
const methodLabel = (lang: Lang, m: PaymentMethod) => t(lang, `pdf.method.${m}`);

const num = (d: Prisma.Decimal | number | null | undefined) => (d == null ? null : Number(d));

const PLAN_SELECT = {
  id: true,
  code: true,
  name: true,
  monthlyPrice: true,
  currency: true,
  maxAgents: true,
  maxActiveMandates: true,
  active: true,
  position: true,
  prices: { select: { currency: true, monthlyPrice: true } },
} as const;

type PlanRow = Prisma.PlanGetPayload<{ select: typeof PLAN_SELECT }>;

/** Offre → JSON (prix en nombre à 2 décimales ; `prices` : prix par devise). */
export function shapePlan(p: PlanRow) {
  const monthlyPrice = num(p.monthlyPrice) ?? 0;
  const prices = normalizePrices(
    p.prices.length ? p.prices.map((x) => ({ currency: x.currency, monthlyPrice: num(x.monthlyPrice) ?? 0 })) : [{ currency: p.currency, monthlyPrice }],
  );
  return { ...p, monthlyPrice, prices, isFree: p.code === FREE_PLAN_CODE };
}

type ShapedPlan = ReturnType<typeof shapePlan>;

const REQUEST_INCLUDE = {
  plan: { select: PLAN_SELECT },
  agency: { select: { id: true, name: true, slug: true, code: true } },
} as const;

type RequestRow = Prisma.SubscriptionRequestGetPayload<{ include: typeof REQUEST_INCLUDE }>;

const PAYMENT_INCLUDE = {
  plan: { select: { id: true, code: true, name: true } },
  agency: { select: { id: true, name: true, slug: true, code: true } },
} as const;

type PaymentRow = Prisma.AgencyPaymentGetPayload<{ include: typeof PAYMENT_INCLUDE }>;


/**
 * Abonnement des professionnels (phase 1 : paiement MANUEL, aucun
 * prestataire). L'agence déclare « J'ai payé », l'admin valide : paiement
 * numéroté FAC-<année>-<n>, prolongation de `paidUntil`, facture PDF.
 * Rappels (J-15, J-7, J-1, grâce, offre gratuite, suspension) : e-mail aux
 * responsables, déclenchés paresseusement au chargement du tableau de bord
 * pro et par une tâche quotidienne ; idempotents via `Agency.lastReminderKey`.
 */
@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly fx: FxService,
  ) {}

  // ─────────────────────────── Devises ───────────────────────────

  /** Devise de facturation de l'agence (choisie, sinon celle de son pays). */
  private async billingOf(agencyId: string) {
    const a = await this.prisma.agency.findUniqueOrThrow({ where: { id: agencyId }, select: { billingCurrency: true, country: true } });
    return { ...billingCurrencyOf(a), chosen: a.billingCurrency ?? null };
  }

  /** Offre dans la devise demandée + « ≈ » indicatif quand on facture dans une autre devise. */
  private async withOffer(plan: ShapedPlan, requested: string) {
    const offer = planOffer(plan, requested);
    let approx: { currency: string; monthlyPrice: number } | null = null;
    if (offer.currency !== offer.requested) {
      const v = await this.fx.convert(offer.monthlyPrice, offer.currency, offer.requested);
      if (v !== null) approx = { currency: offer.requested, monthlyPrice: Math.round(v * 100) / 100 };
    }
    return { ...plan, offer, approx };
  }

  // ─────────────────────────── Outils ───────────────────────────

  private async membership(userId: string) {
    const m = await this.prisma.agencyMember.findUnique({ where: { userId } });
    if (!m) {
      throw new NotFoundException({
        statusCode: 404,
        code: "NO_AGENCY",
        message: "Vous n'appartenez à aucune agence : créez la vôtre ou acceptez une invitation.",
      });
    }
    return m;
  }

  private async managerOf(userId: string) {
    const m = await this.membership(userId);
    if (m.role !== "MANAGER") {
      throw new ForbiddenException({
        statusCode: 403,
        code: "MANAGER_ONLY",
        message: "Seul un responsable de l'agence gère l'abonnement.",
      });
    }
    return m;
  }

  /** Numéro FAC-<année>-<n> : compteur annuel incrémenté atomiquement. */
  private async nextInvoiceNumber(tx: Tx): Promise<string> {
    const year = new Date().getUTCFullYear();
    const rows = await tx.$queryRaw<Array<{ last: number }>>`
      INSERT INTO "InvoiceCounter" ("year", "last") VALUES (${year}::int, 1)
      ON CONFLICT ("year") DO UPDATE SET "last" = "InvoiceCounter"."last" + 1
      RETURNING "last"`;
    return formatInvoiceNumber(year, Number(rows[0]?.last ?? 0));
  }

  private shapeRequest(r: RequestRow) {
    return { ...r, amount: num(r.amount) ?? 0, plan: shapePlan(r.plan) };
  }

  private shapePayment(p: PaymentRow) {
    return { ...p, amount: num(p.amount) ?? 0 };
  }

  /** Usage de l'agence (agents, invitations, mandats) face aux limites. */
  private async usage(agencyId: string, sub: AgencySubscription) {
    const [agents, pendingInvites, activeMandates, pendingMandates, writable] = await Promise.all([
      this.prisma.agencyMember.count({ where: { agencyId } }),
      this.prisma.agencyInvite.count({ where: { agencyId, acceptedAt: null, expiresAt: { gt: new Date() } } }),
      this.prisma.mandate.count({ where: { agencyId, status: "ACTIVE" } }),
      this.prisma.mandate.count({ where: { agencyId, status: "PENDING_OWNER" } }),
      loadWritableMandates(this.prisma, sub),
    ]);
    const readOnlyMandates = !sub.writable ? activeMandates : writable ? Math.max(0, activeMandates - writable.size) : 0;
    return { agents, pendingInvites, activeMandates, pendingMandates, readOnlyMandates };
  }

  /** Résumé de statut (partagé agence / admin). */
  private async summary(agencyId: string) {
    const sub = await loadAgencySubscription(this.prisma, agencyId);
    const now = new Date();
    const [usage, freePlan] = await Promise.all([
      this.usage(agencyId, sub),
      this.prisma.plan.findUnique({ where: { code: FREE_PLAN_CODE }, select: PLAN_SELECT }),
    ]);
    const plan = sub.plan
      ? await this.prisma.plan.findUnique({ where: { id: sub.plan.id }, select: PLAN_SELECT })
      : null;
    const reminder = reminderFor(sub, now, sub.settings);
    return {
      status: sub.status,
      writable: sub.writable,
      manualSuspension: sub.manualSuspension,
      trialEndsAt: sub.trialEndsAt,
      paidUntil: sub.paidUntil,
      coverageEnd: sub.coverageEnd,
      graceEndsAt: sub.graceEndsAt,
      /** Jours avant la fin de la couverture (essai ou période payée), null sans couverture. */
      daysLeft: sub.coverageEnd ? daysLeft(sub.coverageEnd, now) : null,
      plan: plan ? shapePlan(plan) : null,
      limits: sub.limits,
      usage,
      freePlan: {
        enabled: sub.settings.freePlanEnabled,
        maxAgents: freePlan?.maxAgents ?? 1,
        maxActiveMandates: freePlan?.maxActiveMandates ?? 2,
      },
      graceDays: sub.settings.graceDays,
      trialDays: sub.settings.trialDays,
      reminder: reminder ? { kind: reminder.kind, end: reminder.end } : null,
    };
  }

  // ─────────────────────────── Public ───────────────────────────

  /** GET /plans : offres actives (landing, page abonnement). */
  async publicPlans() {
    const [{ settings }, plans] = await Promise.all([
      loadSettings(this.prisma),
      this.prisma.plan.findMany({ where: { active: true }, select: PLAN_SELECT, orderBy: [{ position: "asc" }, { monthlyPrice: "asc" }] }),
    ]);
    const free = plans.find((p) => p.code === FREE_PLAN_CODE);
    return {
      trialDays: settings.trialDays,
      freePlan: settings.freePlanEnabled && free ? shapePlan(free) : null,
      plans: plans.filter((p) => p.code !== FREE_PLAN_CODE).map(shapePlan),
    };
  }

  // ─────────────────────────── Agence ───────────────────────────

  /** GET /agencies/me/subscription — tout membre ; détails de paiement : responsable. */
  async mine(userId: string) {
    const m = await this.membership(userId);
    this.remind(m.agencyId).catch((e) => this.logger.warn(`Rappel abonnement : ${(e as Error).message}`));
    const isManager = m.role === "MANAGER";
    const [summary, plans, settings] = await Promise.all([
      this.summary(m.agencyId),
      this.publicPlans(),
      this.prisma.platformSettings.findUnique({ where: { id: 1 } }),
    ]);
    const billing = await this.billingOf(m.agencyId);
    const offered = await Promise.all(plans.plans.map((p) => this.withOffer(p, billing.currency)));
    const base = { ...summary, isManager, billing, plans: offered, durations: [1, 3, 6, 12] };
    if (!isManager) return { ...base, paymentInstructions: null, pendingRequest: null, requests: [], payments: [] };
    const [requests, payments] = await Promise.all([
      this.prisma.subscriptionRequest.findMany({
        where: { agencyId: m.agencyId },
        include: REQUEST_INCLUDE,
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      this.prisma.agencyPayment.findMany({
        where: { agencyId: m.agencyId },
        include: PAYMENT_INCLUDE,
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);
    const pending = requests.find((r) => r.status === "PENDING");
    return {
      ...base,
      paymentInstructions: settings?.paymentInstructions ?? null,
      pendingRequest: pending ? this.shapeRequest(pending) : null,
      requests: requests.map((r) => this.shapeRequest(r)),
      payments: payments.map((p) => this.shapePayment(p)),
    };
  }

  /** « J'ai payé » : une seule demande en attente par agence. */
  async createRequest(userId: string, dto: CreateSubscriptionRequestDto) {
    const m = await this.managerOf(userId);
    const row = await this.prisma.plan.findUnique({ where: { code: dto.planCode.toUpperCase() }, select: PLAN_SELECT });
    if (!row || !row.active || row.code === FREE_PLAN_CODE) {
      throw new BadRequestException({ statusCode: 400, code: "PLAN_NOT_FOUND", message: "Offre inconnue ou indisponible." });
    }
    const plan = shapePlan(row);
    // Prix dans la devise de facturation de l'agence s'il existe, sinon en EUR.
    const offer = planOffer(plan, (await this.billingOf(m.agencyId)).currency);
    const already = () =>
      new ConflictException({
        statusCode: 409,
        code: "REQUEST_ALREADY_PENDING",
        message: "Une déclaration de paiement est déjà en attente de validation.",
      });
    const id = await this.prisma.$transaction(async (tx) => {
      await lockKey(tx, `subscription:${m.agencyId}`);
      const pending = await tx.subscriptionRequest.findFirst({ where: { agencyId: m.agencyId, status: "PENDING" } });
      if (pending) throw already();
      const r = await tx.subscriptionRequest.create({
        data: {
          agencyId: m.agencyId,
          planId: plan.id,
          months: dto.months,
          amount: new Prisma.Decimal(offer.monthlyPrice).mul(dto.months),
          currency: offer.currency,
          method: dto.method,
          reference: dto.reference,
          note: dto.note?.trim() || null,
          createdById: userId,
        },
      });
      return r.id;
    });
    return this.shapeRequest(await this.prisma.subscriptionRequest.findUniqueOrThrow({ where: { id }, include: REQUEST_INCLUDE }));
  }

  /** Annulation de sa propre demande en attente. */
  async cancelRequest(userId: string, id: string) {
    const m = await this.managerOf(userId);
    const r = await this.prisma.subscriptionRequest.findUnique({ where: { id } });
    if (!r || r.agencyId !== m.agencyId) {
      throw new NotFoundException({ statusCode: 404, code: "REQUEST_NOT_FOUND", message: "Demande introuvable." });
    }
    const { count } = await this.prisma.subscriptionRequest.updateMany({
      where: { id, status: "PENDING" },
      data: { status: "CANCELLED", resolvedAt: new Date(), resolvedById: userId },
    });
    if (count === 0) {
      throw new ConflictException({ statusCode: 409, code: "REQUEST_NOT_PENDING", message: "Cette demande n'est plus en attente." });
    }
    return this.shapeRequest(await this.prisma.subscriptionRequest.findUniqueOrThrow({ where: { id }, include: REQUEST_INCLUDE }));
  }

  /** Facture PDF : responsable de l'agence, ou admin. */
  async invoicePdf(user: { sub: string; role: string }, paymentId: string) {
    const p = await this.prisma.agencyPayment.findUnique({
      where: { id: paymentId },
      include: {
        plan: { select: { code: true, name: true, monthlyPrice: true } },
        agency: { select: { name: true, address: true, city: true, country: true, registrationNumber: true, email: true } },
      },
    });
    const notFound = () => new NotFoundException({ statusCode: 404, code: "PAYMENT_NOT_FOUND", message: "Facture introuvable." });
    if (!p) throw notFound();
    if (user.role !== "ADMIN") {
      const m = await this.prisma.agencyMember.findUnique({ where: { userId: user.sub } });
      if (!m || m.agencyId !== p.agencyId) throw notFound();
      if (m.role !== "MANAGER") {
        throw new ForbiddenException({ statusCode: 403, code: "MANAGER_ONLY", message: "Seul un responsable de l'agence télécharge les factures." });
      }
    }
    const amount = num(p.amount) ?? 0;
    // Langue du document : celle de l'utilisateur qui télécharge.
    const me = await this.prisma.user.findUnique({ where: { id: user.sub }, select: { locale: true } });
    const lang = pdfLang(asLang(me?.locale, requestLang()));
    const buffer = await buildInvoicePdf({
      lang,
      number: p.number,
      issuedAt: p.createdAt,
      agencyName: p.agency.name,
      agencyDetails: [
        [p.agency.address, p.agency.city, p.agency.country].filter(Boolean).join(", "),
        p.agency.registrationNumber ? t(lang, "pdf.invoice.registration", { number: p.agency.registrationNumber }) : "",
        p.agency.email ?? "",
      ],
      planName: planText(lang, p.plan),
      months: p.months,
      periodStart: p.periodStart,
      periodEnd: p.periodEnd,
      monthlyPrice: p.months > 0 ? Math.round((amount / p.months) * 100) / 100 : amount,
      amount,
      currency: p.currency,
      method: methodLabel(lang, p.method),
      reference: p.reference,
    });
    return { buffer, filename: `facture-${p.number}.pdf` };
  }

  // ─────────────────────────── Propriétaires ───────────────────────────

  /**
   * GET /subscriptions/owner-alerts : agences mandataires qui ne peuvent plus
   * agir sur les biens du propriétaire (suspendues, ou mandat hors limite).
   */
  async ownerAlerts(ownerId: string) {
    const mandates = await this.prisma.mandate.findMany({
      where: { ownerId, status: "ACTIVE" },
      select: {
        id: true,
        reference: true,
        type: true,
        agencyId: true,
        property: { select: { id: true, title: true, city: true } },
        agency: { select: { id: true, name: true, slug: true, logoKey: true } },
      },
      orderBy: { createdAt: "asc" },
    });
    const byAgency = new Map<string, typeof mandates>();
    for (const m of mandates) byAgency.set(m.agencyId, [...(byAgency.get(m.agencyId) ?? []), m]);
    const out: unknown[] = [];
    for (const [agencyId, list] of byAgency) {
      const sub = await loadAgencySubscription(this.prisma, agencyId);
      const writable = sub.writable ? await loadWritableMandates(this.prisma, sub) : null;
      const blocked = sub.writable ? (writable ? list.filter((m) => !writable.has(m.id)) : []) : list;
      if (blocked.length === 0) continue;
      const a = list[0]!.agency;
      out.push({
        agency: { id: a.id, name: a.name, slug: a.slug, logoUrl: agencyLogoUrl(a.logoKey) },
        reason: sub.writable ? "PLAN_LIMIT" : "SUSPENDED",
        mandates: blocked.map(({ agency: _a, agencyId: _i, ...m }) => m),
      });
    }
    return out;
  }

  // ─────────────────────────── Rappels ───────────────────────────

  /** Rappel → clé d'e-mail `mail.sub.<kind>` et paramètres (dates formatées par destinataire). */
  private reminderNotice(kind: ReminderKind, agencyName: string, end: Date | null, s: { graceDays: number }) {
    const graceEnd = end ? new Date(end.getTime() + s.graceDays * 24 * 3600 * 1000) : null;
    switch (kind) {
      case "D15":
      case "D7":
      case "D1":
        return { kind: "reminderDays", params: { agency: agencyName, n: kind === "D15" ? 15 : kind === "D7" ? 7 : 1, end } };
      case "GRACE":
        return { kind: "grace", params: { agency: agencyName, end, graceEnd } };
      case "FREE":
        return { kind: "free", params: { agency: agencyName } };
      default:
        return { kind: "suspended", params: { agency: agencyName } };
    }
  }

  /** Envoie le rappel dû (au plus une fois par clé). Renvoie la clé envoyée. */
  async remind(agencyId: string, now = new Date()): Promise<string | null> {
    const sub = await loadAgencySubscription(this.prisma, agencyId, now);
    const r = reminderFor(sub, now, sub.settings);
    if (!r) return null;
    // Idempotence : la clé n'est posée qu'une fois (course entre deux chargements comprise).
    const { count } = await this.prisma.agency.updateMany({
      where: { id: agencyId, OR: [{ lastReminderKey: null }, { lastReminderKey: { not: r.key } }] },
      data: { lastReminderKey: r.key },
    });
    if (count === 0) return null;
    const agency = await this.prisma.agency.findUniqueOrThrow({ where: { id: agencyId }, select: { name: true } });
    const managers = await this.prisma.user.findMany({
      where: { agencyMember: { agencyId, role: "MANAGER" } },
      select: { email: true, firstName: true },
    });
    const { kind, params } = this.reminderNotice(r.kind, agency.name, r.end, sub.settings);
    for (const u of managers) {
      this.mailer.subscriptionNotice(u.email, u.firstName, kind, params, `${ownerWebBase()}/pro/abonnement`).catch(() => {});
    }
    return r.key;
  }

  /** Tâche quotidienne (08:00, Paris) : rappels de toutes les agences. */
  @Cron("0 8 * * *", { timeZone: APP_TIME_ZONE })
  async runDaily(): Promise<void> {
    if (process.env.DISABLE_SCHEDULERS === "1") return;
    await withAdvisoryLock(this.prisma, "subscriptions-daily", async () => {
      const agencies = await this.prisma.agency.findMany({ select: { id: true } });
      let sent = 0;
      for (const a of agencies) if (await this.remind(a.id).catch(() => null)) sent++;
      if (sent > 0) this.logger.log(`${sent} rappel(s) d'abonnement envoyé(s).`);
    });
  }

  // ─────────────────────────── Admin ───────────────────────────

  async adminRequests(status?: SubscriptionRequestStatus) {
    const rows = await this.prisma.subscriptionRequest.findMany({
      where: status ? { status } : {},
      include: REQUEST_INCLUDE,
      orderBy: [{ createdAt: "desc" }],
      take: 200,
    });
    const users = await this.prisma.user.findMany({
      where: { id: { in: [...new Set(rows.map((r) => r.createdById))] } },
      select: { id: true, firstName: true, lastName: true, email: true },
    });
    return rows.map((r) => ({ ...this.shapeRequest(r), createdBy: users.find((u) => u.id === r.createdById) ?? null }));
  }

  /** Enregistre un paiement (demande validée ou saisie directe) et prolonge l'abonnement. */
  private async recordPayment(
    tx: Tx,
    agencyId: string,
    plan: { id: string; monthlyPrice: Prisma.Decimal; currency: string },
    months: number,
    method: PaymentMethod,
    reference: string | null,
    adminId: string,
    requestId: string | null,
    amount?: Prisma.Decimal,
  ) {
    await lockKey(tx, `subscription:${agencyId}`);
    const agency = await tx.agency.findUniqueOrThrow({
      where: { id: agencyId },
      select: { trialEndsAt: true, paidUntil: true, manualSuspension: true },
    });
    const { start, end } = paymentPeriod(agency, new Date(), months);
    const payment = await tx.agencyPayment.create({
      data: {
        number: await this.nextInvoiceNumber(tx),
        agencyId,
        planId: plan.id,
        months,
        amount: amount ?? plan.monthlyPrice.mul(months),
        currency: plan.currency,
        method,
        reference,
        periodStart: start,
        periodEnd: end,
        recordedById: adminId,
        requestId,
      },
    });
    await tx.agency.update({ where: { id: agencyId }, data: { paidUntil: end, planId: plan.id } });
    return payment;
  }

  private async notifyManagers(agencyId: string, kind: string, params: NoticeParams) {
    const managers = await this.prisma.user.findMany({
      where: { agencyMember: { agencyId, role: "MANAGER" } },
      select: { email: true, firstName: true },
    });
    for (const u of managers) {
      this.mailer.subscriptionNotice(u.email, u.firstName, kind, params, `${ownerWebBase()}/pro/abonnement`).catch(() => {});
    }
  }

  async approveRequest(adminId: string, id: string) {
    const paymentId = await this.prisma.$transaction(async (tx) => {
      const r = await tx.subscriptionRequest.findUnique({ where: { id }, include: { plan: true } });
      if (!r) throw new NotFoundException({ statusCode: 404, code: "REQUEST_NOT_FOUND", message: "Demande introuvable." });
      const { count } = await tx.subscriptionRequest.updateMany({
        where: { id, status: "PENDING" },
        data: { status: "APPROVED", resolvedAt: new Date(), resolvedById: adminId },
      });
      if (count === 0) {
        throw new ConflictException({ statusCode: 409, code: "REQUEST_NOT_PENDING", message: "Cette demande n'est plus en attente." });
      }
      const p = await this.recordPayment(
        tx, r.agencyId, { ...r.plan, currency: r.currency }, r.months, r.method, r.reference, adminId, r.id, r.amount,
      );
      await tx.subscriptionRequest.update({ where: { id }, data: { paymentId: p.id } });
      return p.id;
    });
    const payment = await this.prisma.agencyPayment.findUniqueOrThrow({ where: { id: paymentId }, include: PAYMENT_INCLUDE });
    await this.notifyManagers(payment.agencyId, "approved", {
      number: payment.number,
      plan: payment.plan.name,
      planCode: payment.plan.code,
      months: payment.months,
      end: payment.periodEnd,
    });
    const request = await this.prisma.subscriptionRequest.findUniqueOrThrow({ where: { id }, include: REQUEST_INCLUDE });
    return { request: this.shapeRequest(request), payment: this.shapePayment(payment), subscription: await this.summary(payment.agencyId) };
  }

  async rejectRequest(adminId: string, id: string, reason: string) {
    const r = await this.prisma.subscriptionRequest.findUnique({ where: { id } });
    if (!r) throw new NotFoundException({ statusCode: 404, code: "REQUEST_NOT_FOUND", message: "Demande introuvable." });
    const { count } = await this.prisma.subscriptionRequest.updateMany({
      where: { id, status: "PENDING" },
      data: { status: "REJECTED", resolvedAt: new Date(), resolvedById: adminId, rejectReason: reason },
    });
    if (count === 0) {
      throw new ConflictException({ statusCode: 409, code: "REQUEST_NOT_PENDING", message: "Cette demande n'est plus en attente." });
    }
    await this.notifyManagers(r.agencyId, "rejected", { reference: r.reference, reason });
    return this.shapeRequest(await this.prisma.subscriptionRequest.findUniqueOrThrow({ where: { id }, include: REQUEST_INCLUDE }));
  }

  /** Agences + statut d'abonnement. */
  async adminAgencies(q?: string) {
    const rows = await this.prisma.agency.findMany({
      where: q
        ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { code: { equals: q.toUpperCase() } }, { email: { contains: q, mode: "insensitive" } }] }
        : {},
      select: {
        id: true,
        name: true,
        slug: true,
        code: true,
        email: true,
        createdAt: true,
        members: { where: { role: "MANAGER" }, select: { user: { select: { id: true, email: true, firstName: true, lastName: true } } } },
        subscriptionRequests: { where: { status: "PENDING" }, select: { id: true } },
        billingCurrency: true,
        country: true,
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    const out = [];
    for (const { members, subscriptionRequests, ...a } of rows) {
      const { billingCurrency, country, ...rest } = a;
      out.push({
        ...rest,
        // Devise de facturation effective (choisie, sinon celle du pays).
        billingCurrency: billingCurrencyOf({ billingCurrency, country }).currency,
        managers: members.map((x) => x.user),
        pendingRequestId: subscriptionRequests[0]?.id ?? null,
        subscription: await this.summary(a.id),
      });
    }
    return out;
  }

  async adminAgency(id: string) {
    const a = await this.prisma.agency.findUnique({ where: { id }, select: { id: true, name: true, slug: true, code: true } });
    if (!a) throw new NotFoundException({ statusCode: 404, code: "AGENCY_NOT_FOUND", message: "Agence introuvable." });
    const payments = await this.prisma.agencyPayment.findMany({ where: { agencyId: id }, include: PAYMENT_INCLUDE, orderBy: { createdAt: "desc" } });
    return { ...a, subscription: await this.summary(id), payments: payments.map((p) => this.shapePayment(p)) };
  }

  /** Prolonger l'essai, fixer la fin payée, changer l'offre, suspendre / réactiver. */
  async adminUpdateAgency(id: string, dto: AdminAgencySubscriptionDto) {
    await this.adminAgency(id);
    const data: Prisma.AgencyUncheckedUpdateInput = {};
    if (dto.trialEndsAt !== undefined) data.trialEndsAt = dto.trialEndsAt ? new Date(dto.trialEndsAt) : null;
    if (dto.paidUntil !== undefined) data.paidUntil = dto.paidUntil ? new Date(dto.paidUntil) : null;
    if (dto.manualSuspension !== undefined) data.manualSuspension = dto.manualSuspension;
    if (dto.planCode !== undefined) {
      if (dto.planCode === null) data.planId = null;
      else {
        const plan = await this.prisma.plan.findUnique({ where: { code: dto.planCode.toUpperCase() } });
        if (!plan) throw new BadRequestException({ statusCode: 400, code: "PLAN_NOT_FOUND", message: "Offre inconnue." });
        data.planId = plan.id;
      }
    }
    const before = await loadAgencySubscription(this.prisma, id);
    await this.prisma.agency.update({ where: { id }, data });
    if (dto.manualSuspension !== undefined && dto.manualSuspension !== before.manualSuspension) {
      await this.notifyManagers(id, dto.manualSuspension ? "adminSuspended" : "adminReactivated", {});
    }
    return this.adminAgency(id);
  }

  async adminRecordPayment(adminId: string, agencyId: string, dto: AdminPaymentDto) {
    await this.adminAgency(agencyId);
    const row = await this.prisma.plan.findUnique({ where: { code: dto.planCode.toUpperCase() }, select: PLAN_SELECT });
    if (!row || row.code === FREE_PLAN_CODE) {
      throw new BadRequestException({ statusCode: 400, code: "PLAN_NOT_FOUND", message: "Offre inconnue." });
    }
    // Même règle que la déclaration de l'agence : sa devise de facturation si l'offre y a un prix, sinon EUR.
    const offer = planOffer(shapePlan(row), (await this.billingOf(agencyId)).currency);
    const plan = { id: row.id, monthlyPrice: new Prisma.Decimal(offer.monthlyPrice), currency: offer.currency };
    const p = await this.prisma.$transaction((tx) =>
      this.recordPayment(tx, agencyId, plan, dto.months, dto.method, dto.reference?.trim() || null, adminId, null),
    );
    const payment = await this.prisma.agencyPayment.findUniqueOrThrow({ where: { id: p.id }, include: PAYMENT_INCLUDE });
    await this.notifyManagers(agencyId, "recorded", {
      number: payment.number,
      plan: payment.plan.name,
      planCode: payment.plan.code,
      months: payment.months,
      end: payment.periodEnd,
    });
    return { payment: this.shapePayment(payment), subscription: await this.summary(agencyId) };
  }

  async adminPayments(agencyId?: string) {
    const rows = await this.prisma.agencyPayment.findMany({
      where: agencyId ? { agencyId } : {},
      include: PAYMENT_INCLUDE,
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return rows.map((p) => this.shapePayment(p));
  }

  // Offres
  async adminPlans() {
    const rows = await this.prisma.plan.findMany({ select: PLAN_SELECT, orderBy: [{ position: "asc" }, { code: "asc" }] });
    return rows.map(shapePlan);
  }

  async createPlan(dto: PlanDto) {
    const exists = await this.prisma.plan.findUnique({ where: { code: dto.code } });
    if (exists) throw new ConflictException({ statusCode: 409, code: "PLAN_EXISTS", message: "Une offre porte déjà ce code." });
    const p = await this.prisma.plan.create({
      data: {
        code: dto.code,
        name: dto.name,
        monthlyPrice: new Prisma.Decimal(dto.monthlyPrice),
        currency: dto.currency ?? "EUR",
        maxAgents: dto.maxAgents ?? null,
        maxActiveMandates: dto.maxActiveMandates ?? null,
        active: dto.active ?? true,
        position: dto.position ?? 0,
        prices: {
          create: normalizePrices([{ currency: dto.currency ?? "EUR", monthlyPrice: dto.monthlyPrice }, ...(dto.prices ?? [])]).map((x) => ({
            currency: x.currency,
            monthlyPrice: new Prisma.Decimal(x.monthlyPrice),
          })),
        },
      },
      select: PLAN_SELECT,
    });
    invalidateSubscriptionCache();
    return shapePlan(p);
  }

  async updatePlan(id: string, dto: UpdatePlanDto) {
    const plan = await this.prisma.plan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException({ statusCode: 404, code: "PLAN_NOT_FOUND", message: "Offre introuvable." });
    const data: Prisma.PlanUpdateInput = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.monthlyPrice !== undefined) data.monthlyPrice = new Prisma.Decimal(dto.monthlyPrice);
    if (dto.currency !== undefined) data.currency = dto.currency;
    if (dto.maxAgents !== undefined) data.maxAgents = dto.maxAgents;
    if (dto.maxActiveMandates !== undefined) data.maxActiveMandates = dto.maxActiveMandates;
    if (dto.active !== undefined) data.active = dto.active;
    if (dto.position !== undefined) data.position = dto.position;
    await this.prisma.plan.update({ where: { id }, data });
    // Le prix de base (colonnes historiques) reste aussi un prix par devise.
    if (dto.monthlyPrice !== undefined || dto.currency !== undefined) {
      const fresh = await this.prisma.plan.findUniqueOrThrow({ where: { id } });
      await this.prisma.planPrice.upsert({
        where: { planId_currency: { planId: id, currency: fresh.currency.toUpperCase() } },
        create: { planId: id, currency: fresh.currency.toUpperCase(), monthlyPrice: fresh.monthlyPrice },
        update: { monthlyPrice: fresh.monthlyPrice },
      });
    }
    invalidateSubscriptionCache();
    return shapePlan(await this.prisma.plan.findUniqueOrThrow({ where: { id }, select: PLAN_SELECT }));
  }

  /** PUT /admin/plans/:id/prices — remplace les prix par devise d'une offre. */
  async setPlanPrices(id: string, rows: PriceRow[]) {
    const plan = await this.prisma.plan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException({ statusCode: 404, code: "PLAN_NOT_FOUND", message: "Offre introuvable." });
    const prices = normalizePrices(rows);
    const base = basePrice(prices);
    if (!base) throw new BadRequestException({ statusCode: 400, code: "PRICES_REQUIRED", message: "Indiquez au moins un prix." });
    await this.prisma.$transaction([
      this.prisma.planPrice.deleteMany({ where: { planId: id, currency: { notIn: prices.map((p) => p.currency) } } }),
      ...prices.map((p) =>
        this.prisma.planPrice.upsert({
          where: { planId_currency: { planId: id, currency: p.currency } },
          create: { planId: id, currency: p.currency, monthlyPrice: new Prisma.Decimal(p.monthlyPrice) },
          update: { monthlyPrice: new Prisma.Decimal(p.monthlyPrice) },
        }),
      ),
      this.prisma.plan.update({ where: { id }, data: { monthlyPrice: new Prisma.Decimal(base.monthlyPrice), currency: base.currency } }),
    ]);
    invalidateSubscriptionCache();
    return shapePlan(await this.prisma.plan.findUniqueOrThrow({ where: { id }, select: PLAN_SELECT }));
  }

  // Paramètres
  async settings() {
    const row = await this.prisma.platformSettings.upsert({
      where: { id: 1 },
      create: { id: 1 },
      update: {},
    });
    return row;
  }

  async updateSettings(dto: PlatformSettingsDto) {
    const data: Prisma.PlatformSettingsUpdateInput = {};
    if (dto.trialDays !== undefined) data.trialDays = dto.trialDays;
    if (dto.graceDays !== undefined) data.graceDays = dto.graceDays;
    if (dto.freePlanEnabled !== undefined) data.freePlanEnabled = dto.freePlanEnabled;
    if (dto.paymentInstructions !== undefined) data.paymentInstructions = dto.paymentInstructions?.trim() || null;
    const row = await this.prisma.platformSettings.upsert({
      where: { id: 1 },
      create: { id: 1, ...(data as Prisma.PlatformSettingsCreateInput) },
      update: data,
    });
    invalidateSubscriptionCache();
    return row;
  }

  /** Pour le tableau de bord admin. */
  async adminCounts() {
    const pendingRequests = await this.prisma.subscriptionRequest.count({ where: { status: "PENDING" } });
    return { pendingSubscriptionRequests: pendingRequests };
  }
}

