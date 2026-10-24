import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { LeaseStatus, Prisma, RentStatus, Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { assertEmailVerified } from "../common/email-verified.util";
import { assertValidDataUrl } from "../common/upload.util";
import { leasePartyFlags } from "../common/lease-party.util";
import { MailerService } from "../mail/mailer.service";
import { today as todayDay, yearOf } from "../common/dates";
import { buildReceiptPdf } from "./receipt";
import { asLang, pdfLang, requestLang, tr } from "../i18n/i18n";
import { periodLabel as periodLabelIn } from "../i18n/labels";
import { periodsUpTo } from "./rent-calc";
import { PropertyAccessService, decideAccess, loadAccessContext } from "../common/property-access";
import { FeesService } from "../mandates/fees.service";

/**
 * Loyers : paiement direct au propriétaire, déclaré puis validé.
 *
 * Le locataire verse le loyer directement au propriétaire, sur les
 * coordonnées que celui-ci publie. Il déclare son versement (identifiant de
 * transaction de l'opérateur, unique en base — une même preuve ne peut pas
 * couvrir deux échéances) ; le propriétaire, seul à voir son compte, valide.
 * La validation émet la quittance. La plateforme ne détient jamais les fonds.
 *
 * Le locataire d'un bail est relié par son adresse e-mail VÉRIFIÉE (bail,
 * demande d'origine ou colocation) : le bail est saisi par le propriétaire,
 * le locataire n'a pas forcément de compte au moment de la saisie.
 *
 * Les échéances sont générées par le planificateur (et à la double
 * signature), plus jamais pendant un GET (des milliers de requêtes par
 * affichage de la page Loyers).
 */

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
export const periodLabel = (y: number, m: number) => `${MOIS[m - 1]} ${y}`;

type PeriodRow = {
  id: string; leaseId: string; periodYear: number; periodMonth: number; dueDate: Date;
  amount: number; rentAmount: number; chargesAmount: number; status: RentStatus;
  declaredAt: Date | null; declaredMethod: string | null; declaredRef: string | null;
  proofDataUrl: string | null; tenantNote: string | null; paidAt: Date | null;
  receiptNo: string | null; rejectReason: string | null; reviewedById?: string | null;
};

export function shapePeriod(p: PeriodRow, currency: string) {
  return {
    id: p.id,
    leaseId: p.leaseId,
    periodYear: p.periodYear,
    periodMonth: p.periodMonth,
    periodLabel: periodLabel(p.periodYear, p.periodMonth),
    dueDate: p.dueDate,
    amount: p.amount,
    rentAmount: p.rentAmount,
    chargesAmount: p.chargesAmount,
    currency,
    status: p.status,
    declaredAt: p.declaredAt,
    declaredMethod: p.declaredMethod,
    declaredRef: p.declaredRef,
    proofDataUrl: p.proofDataUrl,
    tenantNote: p.tenantNote,
    paidAt: p.paidAt,
    receiptNo: p.receiptNo,
    rejectReason: p.rejectReason,
    reviewedById: p.reviewedById ?? null,
  };
}

const TENANT_VISIBLE_STATUSES: LeaseStatus[] = ["SIGNED", "ACTIVE", "EXPIRED", "TERMINATED"];

/**
 * Règle d'encaissement : l'agence encaisse les loyers si le mandat actif le
 * prévoit (`rentPayee = AGENCY`) et qu'elle a renseigné ses coordonnées de
 * paiement ; sinon le locataire paie le propriétaire (ses moyens de paiement).
 */
export function agencyCollectsRent(m: { rentPayee: string; agency: { paymentIban: string | null } }): boolean {
  return m.rentPayee === "AGENCY" && !!m.agency.paymentIban;
}

@Injectable()
export class RentsService {
  private readonly logger = new Logger(RentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly access: PropertyAccessService,
    private readonly fees: FeesService,
  ) {}

  // ────────────────── Coordonnées de paiement du propriétaire ──────────────────

  listMethods(ownerId: string) {
    return this.prisma.ownerPaymentMethod.findMany({
      where: { ownerId },
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    });
  }

  async addMethod(
    ownerId: string,
    dto: { label: string; value: string; holder?: string | null; instructions?: string | null; active?: boolean },
  ) {
    const nb = await this.prisma.ownerPaymentMethod.count({ where: { ownerId } });
    if (nb >= 8) throw new BadRequestException("Nombre maximum de moyens de paiement atteint (8).");
    return this.prisma.ownerPaymentMethod.create({
      data: {
        ownerId,
        label: dto.label.trim(),
        value: dto.value.trim(),
        holder: dto.holder?.trim() || null,
        instructions: dto.instructions?.trim() || null,
        active: dto.active ?? true,
        position: nb,
      },
    });
  }

  async updateMethod(
    ownerId: string,
    id: string,
    dto: { label?: string; value?: string; holder?: string | null; instructions?: string | null; active?: boolean },
  ) {
    const m = await this.prisma.ownerPaymentMethod.findUnique({ where: { id } });
    if (!m || m.ownerId !== ownerId) throw new NotFoundException("Moyen de paiement introuvable.");
    return this.prisma.ownerPaymentMethod.update({
      where: { id },
      data: {
        ...(dto.label !== undefined ? { label: dto.label.trim() } : {}),
        ...(dto.value !== undefined ? { value: dto.value.trim() } : {}),
        ...(dto.holder !== undefined ? { holder: dto.holder?.trim() || null } : {}),
        ...(dto.instructions !== undefined ? { instructions: dto.instructions?.trim() || null } : {}),
        ...(dto.active !== undefined ? { active: dto.active } : {}),
      },
    });
  }

  async removeMethod(ownerId: string, id: string) {
    const m = await this.prisma.ownerPaymentMethod.findUnique({ where: { id } });
    if (!m || m.ownerId !== ownerId) throw new NotFoundException("Moyen de paiement introuvable.");
    await this.prisma.ownerPaymentMethod.delete({ where: { id } });
    return { ok: true };
  }

  // ─────────────────────── Génération des échéances ───────────────────────

  /**
   * Crée les échéances manquantes d'un bail signé, du début jusqu'au mois
   * courant, en UNE requête (createMany skipDuplicates). Loyer et charges
   * sont figés à la création, au prorata et aux conditions en vigueur ce
   * mois-là : une modification ultérieure ne réécrit pas les quittances.
   */
  async generateForLease(leaseId: string, today: Date = todayDay()): Promise<number> {
    const lease = await this.prisma.leaseContract.findUnique({
      where: { id: leaseId },
      include: {
        amendments: {
          where: { appliedAt: { not: null } },
          select: { effectiveDate: true, appliedAt: true, prevMonthlyRent: true, prevCharges: true },
        },
      },
    });
    if (!lease || (lease.status !== "SIGNED" && lease.status !== "ACTIVE")) return 0;
    const drafts = periodsUpTo(lease, today, lease.amendments);
    if (drafts.length === 0) return 0;
    const { count } = await this.prisma.rentPeriod.createMany({
      // Une échéance déjà passée naît « en retard » (même règle que markLate),
      // sans attendre le passage du planificateur du lendemain.
      data: drafts.map((d) => ({ ...d, leaseId, ...(d.dueDate < today ? { status: RentStatus.LATE } : {}) })),
      skipDuplicates: true,
    });
    return count;
  }

  /** Planificateur : toutes les échéances manquantes des baux en cours. */
  async generateAll(today: Date = todayDay()): Promise<number> {
    const leases = await this.prisma.leaseContract.findMany({
      where: { status: { in: ["SIGNED", "ACTIVE"] }, startDate: { lte: today } },
      select: { id: true },
    });
    let created = 0;
    for (const l of leases) {
      try {
        created += await this.generateForLease(l.id, today);
      } catch (e) {
        this.logger.error(`Génération des échéances du bail ${l.id} : ${(e as Error).message}`);
      }
    }
    return created;
  }

  // ──────────────────────────── Vues ────────────────────────────

  /** Baux dont l'utilisateur (e-mail vérifié) est locataire ou colocataire. */
  private async tenantLeases(userId: string) {
    await assertEmailVerified(this.prisma, userId);
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, emailVerifiedAt: true },
    });
    if (!user) throw new NotFoundException("Compte introuvable.");
    const leases = await this.prisma.leaseContract.findMany({
      where: {
        status: { in: TENANT_VISIBLE_STATUSES },
        OR: [
          { tenantEmail: { equals: user.email, mode: "insensitive" } },
          { inquiry: { senderId: user.id } },
          { coTenants: { some: { email: { equals: user.email, mode: "insensitive" } } } },
        ],
      },
      include: {
        property: { select: { id: true, title: true, addressLine: true, city: true, ownerId: true } },
        inquiry: { select: { senderId: true } },
        coTenants: { select: { email: true } },
      },
      orderBy: { startDate: "desc" },
    });
    return leases.filter((l) => leasePartyFlags(l, user).isTenant);
  }

  /** Échéances des baux dont l'utilisateur connecté est locataire ou colocataire. */
  async myRents(userId: string) {
    const leases = await this.tenantLeases(userId);
    const periods = await this.prisma.rentPeriod.findMany({
      where: { leaseId: { in: leases.map((l) => l.id) } },
      orderBy: [{ periodYear: "desc" }, { periodMonth: "desc" }],
    });
    const ownerIds = [...new Set(leases.map((l) => l.property.ownerId))];
    const methods = await this.prisma.ownerPaymentMethod.findMany({
      where: { ownerId: { in: ownerIds }, active: true },
      orderBy: [{ position: "asc" }],
      select: { id: true, ownerId: true, label: true, value: true, holder: true, instructions: true },
    });
    // Mandat « loyers encaissés par l'agence » : l'IBAN de l'agence remplace
    // les coordonnées du propriétaire.
    const mandates = await this.prisma.mandate.findMany({
      where: { propertyId: { in: leases.map((l) => l.property.id) }, status: "ACTIVE" },
      select: {
        propertyId: true,
        rentPayee: true,
        agency: { select: { id: true, name: true, paymentIban: true, paymentHolder: true } },
      },
    });
    const agencyMethods = (propertyId: string) => {
      const m = mandates.find((x) => x.propertyId === propertyId);
      if (!m || !agencyCollectsRent(m)) return null;
      return [
        {
          id: `agency-${m.agency.id}`,
          ownerId: null,
          label: tr("label.agencyTransfer", { agency: m.agency.name }),
          value: m.agency.paymentIban,
          holder: m.agency.paymentHolder ?? m.agency.name,
          instructions: tr("label.agencyTransferInstructions", { agency: m.agency.name }),
        },
      ];
    };
    return leases.map((l) => ({
      lease: {
        id: l.id,
        monthlyRent: l.monthlyRent,
        charges: l.charges,
        currency: l.currency,
        shortStay: l.shortStay,
        stayTotal: l.stayTotal,
        startDate: l.startDate,
        endDate: l.endDate,
        rentPaymentDay: l.rentPaymentDay,
        status: l.status,
        property: {
          id: l.property.id,
          title: l.property.title,
          addressLine: l.property.addressLine,
          city: l.property.city,
          ownerId: l.property.ownerId,
        },
      },
      paymentMethods: agencyMethods(l.property.id) ?? methods.filter((m) => m.ownerId === l.property.ownerId),
      payee: agencyMethods(l.property.id) ? "AGENCY" : "OWNER",
      periods: periods.filter((p) => p.leaseId === l.id).map((p) => shapePeriod(p, l.currency)),
    }));
  }

  /** Échéances de tous les baux des biens du propriétaire connecté (ou gérés par le pro). */
  async ownerRents(ownerId: string, status?: RentStatus) {
    const propertyWhere = await this.access.propertyWhere(ownerId, "READ");
    const leases = await this.prisma.leaseContract.findMany({
      where: { property: propertyWhere },
      include: { property: { select: { id: true, title: true, addressLine: true, city: true, ownerId: true } } },
    });
    // Destinataire des loyers, même règle que l'espace locataire (`myRents`) :
    // l'agence si un mandat actif prévoit qu'elle encaisse ET qu'elle a des
    // coordonnées de paiement ; sinon le propriétaire.
    const mandates = await this.prisma.mandate.findMany({
      where: { propertyId: { in: [...new Set(leases.map((l) => l.property.id))] }, status: "ACTIVE" },
      select: { propertyId: true, rentPayee: true, agency: { select: { id: true, name: true, paymentIban: true } } },
    });
    const payeeOf = (propertyId: string) => {
      const m = mandates.find((x) => x.propertyId === propertyId);
      return {
        payee: m && agencyCollectsRent(m) ? ("AGENCY" as const) : ("OWNER" as const),
        agency: m ? { id: m.agency.id, name: m.agency.name } : null,
      };
    };
    const periods = await this.prisma.rentPeriod.findMany({
      where: { leaseId: { in: leases.map((l) => l.id) }, ...(status ? { status } : {}) },
      orderBy: [{ status: "asc" }, { dueDate: "desc" }],
      take: 2000,
    });
    const parBail = new Map(leases.map((l) => [l.id, l]));
    return periods.map((p) => {
      const l = parBail.get(p.leaseId)!;
      return {
        ...shapePeriod(p, l.currency),
        lease: {
          id: l.id,
          tenantName: `${l.tenantFirstName} ${l.tenantLastName}`,
          tenantEmail: l.tenantEmail,
          currency: l.currency,
          shortStay: l.shortStay,
          property: l.property,
          /** Qui reçoit les loyers ; `agency` = agence sous mandat actif (encaissant ou non). */
          ...payeeOf(l.property.id),
        },
      };
    });
  }

  // ──────────────────────────── Déclaration ────────────────────────────

  async declare(
    userId: string,
    periodId: string,
    dto: { method: string; reference: string; proofDataUrl?: string | null; note?: string | null },
  ) {
    assertValidDataUrl(dto.proofDataUrl, "justificatif");
    const { period, lease, user } = await this.loadForTenant(userId, periodId);
    if (period.status === RentStatus.PAID) throw new ConflictException("Ce loyer est déjà réglé.");
    if (period.status === RentStatus.DECLARED)
      throw new ConflictException("Un versement est déjà déclaré pour cette échéance : attendez la vérification.");

    const reference = dto.reference.trim();
    if (reference.length < 4)
      throw new BadRequestException("Indiquez l'identifiant de transaction reçu par SMS de votre opérateur.");

    try {
      // Atomique : seule une échéance encore à payer passe en « déclarée ».
      const { count } = await this.prisma.rentPeriod.updateMany({
        where: { id: periodId, status: { in: [RentStatus.DUE, RentStatus.LATE] } },
        data: {
          status: RentStatus.DECLARED,
          declaredAt: new Date(),
          declaredMethod: dto.method.trim(),
          declaredRef: reference,
          proofDataUrl: dto.proofDataUrl || null,
          tenantNote: dto.note?.trim() || null,
          rejectReason: null,
        },
      });
      if (count === 0) throw new ConflictException("Cette échéance vient d'être mise à jour : rechargez la page.");
    } catch (e) {
      if ((e as Prisma.PrismaClientKnownRequestError)?.code === "P2002")
        throw new ConflictException("Cet identifiant de transaction a déjà été utilisé pour un autre loyer.");
      throw e;
    }
    const maj = await this.prisma.rentPeriod.findUniqueOrThrow({ where: { id: periodId } });
    const owner = await this.prisma.user.findUnique({
      where: { id: lease.property.ownerId },
      select: { email: true, firstName: true, lastName: true },
    });
    // Bien géré : l'agent assigné (sinon les responsables) est aussi prévenu.
    const m = await this.access.activeMandate(lease.propertyId);
    if (m) {
      const recipients = await this.prisma.user.findMany({
        where: m.assignedAgentId
          ? { id: m.assignedAgentId }
          : { agencyMember: { agencyId: m.agencyId, role: "MANAGER" } },
        select: { email: true, firstName: true, lastName: true },
      });
      for (const r of recipients) {
        this.mailer
          .rentDeclared(r.email, `${r.firstName} ${r.lastName}`, `${user.firstName} ${user.lastName}`, { year: period.periodYear, month: period.periodMonth }, period.amount, lease.currency)
          .catch(() => {});
      }
    }
    if (owner) {
      this.mailer
        .rentDeclared(
          owner.email,
          `${owner.firstName} ${owner.lastName}`,
          `${user.firstName} ${user.lastName}`,
          { year: period.periodYear, month: period.periodMonth },
          period.amount,
          lease.currency,
        )
        .catch(() => {});
    }
    return shapePeriod(maj, lease.currency);
  }

  // ──────────────────────────── Validation ────────────────────────────

  /**
   * Validation par le PROPRIÉTAIRE du bien uniquement (la quittance porte
   * « Je soussigné(e) <bailleur> » : l'administrateur ne peut pas l'émettre).
   * Atomique : la vérification « déclarée » et l'attribution du numéro de
   * quittance se font dans la même transaction.
   */
  async review(userId: string, periodId: string, accept: boolean, reason?: string | null) {
    const period = await this.prisma.rentPeriod.findUnique({
      where: { id: periodId },
      include: { lease: { include: { property: { select: { id: true, ownerId: true, title: true } } } } },
    });
    if (!period) throw new NotFoundException("Échéance introuvable.");
    // Propriétaire, ou pro mandataire autorisé (mandat de gestion).
    const { decision } = await this.access.check(period.lease.property.id, userId, "RENTS");
    if (!decision.allowed) {
      throw new ForbiddenException({
        statusCode: 403,
        code: decision.code,
        message: decision.as === "NONE" ? "Seul le propriétaire du bien peut valider ce loyer." : decision.message,
      });
    }
    const propertyId = period.lease.property.id;
    const logPro = async (kind: string, data: Record<string, unknown>) => {
      if (decision.as !== "PRO") return;
      const m = await this.access.activeMandate(propertyId);
      if (m) await this.access.logEvent(m.id, userId, kind, data as never).catch(() => {});
    };

    const tenantName = `${period.lease.tenantFirstName} ${period.lease.tenantLastName}`;
    const libelle = periodLabel(period.periodYear, period.periodMonth);
    const periode = { year: period.periodYear, month: period.periodMonth };
    const currency = period.lease.currency;

    if (!accept) {
      const { count } = await this.prisma.rentPeriod.updateMany({
        where: { id: periodId, status: RentStatus.DECLARED },
        // Refus → l'échéance redevient à payer : le locataire peut corriger
        // sa déclaration (l'identifiant erroné est libéré).
        data: {
          status: RentStatus.DUE,
          rejectReason: reason?.trim() || null,
          declaredRef: null,
          reviewedById: userId,
        },
      });
      if (count === 0) throw new ConflictException("Aucune déclaration en attente sur cette échéance.");
      // Refus : un éventuel honoraire de gestion de l'échéance est annulé.
      await this.fees.onRentCancelled(this.prisma, periodId);
      await logPro("RENT_REJECTED", { periodId });
      const maj = await this.prisma.rentPeriod.findUniqueOrThrow({ where: { id: periodId } });
      this.mailer.rentRejected(period.lease.tenantEmail, tenantName, periode, reason?.trim() || "").catch(() => {});
      return shapePeriod(maj, currency);
    }

    const maj = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.rentPeriod.updateMany({
        where: { id: periodId, status: RentStatus.DECLARED },
        data: { status: RentStatus.PAID, paidAt: new Date(), reviewedById: userId },
      });
      if (count === 0) throw new ConflictException("Aucune déclaration en attente sur cette échéance.");
      const receiptNo = await this.nextReceiptNo(tx);
      const paid = await tx.rentPeriod.update({ where: { id: periodId }, data: { receiptNo } });
      // Honoraires de gestion (mandat MANAGEMENT actif), idempotents par échéance.
      await this.fees.onRentValidated(tx, paid, propertyId, currency, userId);
      return paid;
    });
    await logPro("RENT_VALIDATED", { periodId, receiptNo: maj.receiptNo });
    this.mailer
      .rentValidated(period.lease.tenantEmail, tenantName, periode, period.amount, maj.receiptNo!, currency)
      .catch(() => {});
    this.logger.log(`Loyer ${libelle} validé (${maj.receiptNo}) — bail ${period.leaseId}.`);
    return shapePeriod(maj, currency);
  }

  /**
   * Numéro de quittance séquentiel par ANNÉE D'ÉMISSION, via un compteur
   * incrémenté atomiquement (pas de doublon ni de trou en cas de course).
   */
  private async nextReceiptNo(tx: Prisma.TransactionClient): Promise<string> {
    const year = yearOf(new Date());
    const rows = await tx.$queryRaw<Array<{ last: number }>>`
      INSERT INTO "ReceiptCounter" ("year", "last") VALUES (${year}::int, 1)
      ON CONFLICT ("year") DO UPDATE SET "last" = "ReceiptCounter"."last" + 1
      RETURNING "last"`;
    const n = Number(rows[0]?.last ?? 0);
    return `HWE-${year}-${String(n).padStart(5, "0")}`;
  }

  // ──────────────────────────── Quittance PDF ────────────────────────────

  async receiptPdf(userId: string, role: Role, periodId: string): Promise<{ buffer: Buffer; filename: string }> {
    const period = await this.prisma.rentPeriod.findUnique({
      where: { id: periodId },
      include: {
        lease: {
          include: {
            property: {
              select: { id: true, ownerId: true, title: true, addressLine: true, city: true, owner: { select: { firstName: true, lastName: true } } },
            },
            inquiry: { select: { senderId: true } },
            coTenants: { select: { email: true } },
          },
        },
      },
    });
    if (!period || period.status !== RentStatus.PAID || !period.receiptNo || !period.paidAt)
      throw new NotFoundException("Quittance indisponible : le loyer n'est pas validé.");

    // Accessible au propriétaire du bien, aux locataires du bail (e-mail vérifié), à l'admin.
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, emailVerifiedAt: true, locale: true },
    });
    const flags = user ? leasePartyFlags(period.lease, user) : null;
    let autorise = role === Role.ADMIN || !!flags?.isOwner || !!flags?.isTenant;
    if (!autorise && user) {
      // Pro mandataire autorisé à suivre les loyers du bien.
      autorise = decideAccess(await loadAccessContext(this.prisma, period.lease.property.id, user.id), "READ").allowed;
    }
    if (!autorise) throw new ForbiddenException("Cette quittance ne vous concerne pas.");

    const owner = period.lease.property.owner;
    // Langue du document : celle de l'utilisateur qui télécharge.
    const lang = pdfLang(asLang(user?.locale, requestLang()));
    const buffer = await buildReceiptPdf({
      lang,
      receiptNo: period.receiptNo,
      paidAt: period.paidAt,
      periodLabel: periodLabelIn(lang, period.periodYear, period.periodMonth),
      propertyTitle: period.lease.property.title,
      propertyAddress: [period.lease.property.addressLine, period.lease.property.city].filter(Boolean).join(", "),
      ownerName: `${owner.firstName} ${owner.lastName}`,
      tenantName: `${period.lease.tenantFirstName} ${period.lease.tenantLastName}`,
      // Montants FIGÉS de la période (et non ceux du bail actuel).
      rent: period.rentAmount,
      charges: period.chargesAmount,
      total: period.amount,
      currency: period.lease.currency,
      method: period.declaredMethod,
      reference: period.declaredRef,
    });
    return { buffer, filename: `quittance-${period.receiptNo}.pdf` };
  }

  // ──────────────────────────── Interne ────────────────────────────

  private async loadForTenant(userId: string, periodId: string) {
    await assertEmailVerified(this.prisma, userId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("Compte introuvable.");
    const period = await this.prisma.rentPeriod.findUnique({
      where: { id: periodId },
      include: {
        lease: {
          include: {
            property: { select: { ownerId: true } },
            inquiry: { select: { senderId: true } },
            coTenants: { select: { email: true } },
          },
        },
      },
    });
    if (!period) throw new NotFoundException("Échéance introuvable.");
    if (!leasePartyFlags(period.lease, user).isTenant)
      throw new ForbiddenException("Cette échéance ne vous concerne pas.");
    return { period, lease: period.lease, user };
  }
}
