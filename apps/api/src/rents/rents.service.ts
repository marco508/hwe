import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { LeaseStatus, Prisma, RentStatus, Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { assertEmailVerified } from "../common/email-verified.util";
import { assertValidDataUrl } from "../common/upload.util";
import { MailerService } from "../mail/mailer.service";
import { buildReceiptPdf } from "./receipt";

/**
 * Loyers : paiement direct au propriétaire, déclaré puis validé.
 *
 * Le locataire verse le loyer directement au propriétaire, sur les
 * coordonnées que celui-ci publie. Il déclare son versement (identifiant de
 * transaction de l'opérateur, unique en base — une même preuve ne peut pas
 * couvrir deux échéances) ; le propriétaire, seul à voir son compte, valide.
 * La validation émet la quittance. La plateforme ne détient jamais les fonds.
 *
 * Le locataire d'un bail est relié par son adresse e-mail (tenantEmail) : le
 * bail est saisi par le propriétaire, le locataire n'a pas forcément de
 * compte au moment de la signature.
 */

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
export const periodLabel = (y: number, m: number) => `${MOIS[m - 1]} ${y}`;

@Injectable()
export class RentsService {
  private readonly logger = new Logger(RentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
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
    dto: { label: string; value: string; holder?: string; instructions?: string },
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
        position: nb,
      },
    });
  }

  async updateMethod(
    ownerId: string,
    id: string,
    dto: { label?: string; value?: string; holder?: string; instructions?: string; active?: boolean },
  ) {
    const m = await this.prisma.ownerPaymentMethod.findUnique({ where: { id } });
    if (!m || m.ownerId !== ownerId) throw new NotFoundException("Moyen de paiement introuvable.");
    return this.prisma.ownerPaymentMethod.update({
      where: { id },
      data: {
        ...(dto.label !== undefined ? { label: dto.label.trim() } : {}),
        ...(dto.value !== undefined ? { value: dto.value.trim() } : {}),
        ...(dto.holder !== undefined ? { holder: dto.holder.trim() || null } : {}),
        ...(dto.instructions !== undefined ? { instructions: dto.instructions.trim() || null } : {}),
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
   * Crée l'échéance d'un mois donné pour un bail, si elle n'existe pas déjà.
   * Le montant (loyer + charges) est figé à la création : une modification
   * ultérieure du bail ne réécrit pas les quittances passées.
   */
  async ensurePeriod(leaseId: string, year: number, month: number) {
    const lease = await this.prisma.leaseContract.findUnique({ where: { id: leaseId } });
    if (!lease) return null;
    const day = Math.min(Math.max(lease.rentPaymentDay || 1, 1), 28);
    const dueDate = new Date(Date.UTC(year, month - 1, day));
    try {
      return await this.prisma.rentPeriod.create({
        data: {
          leaseId,
          periodYear: year,
          periodMonth: month,
          dueDate,
          amount: lease.monthlyRent + lease.charges,
        },
      });
    } catch (e) {
      // Déjà générée (contrainte unique bail+année+mois) : rien à faire.
      if ((e as Prisma.PrismaClientKnownRequestError)?.code === "P2002") return null;
      throw e;
    }
  }

  /** Toutes les échéances dues depuis le début du bail jusqu'au mois courant. */
  async backfillLease(leaseId: string) {
    const lease = await this.prisma.leaseContract.findUnique({ where: { id: leaseId } });
    if (!lease) return 0;
    const now = new Date();
    const fin = lease.endDate && lease.endDate < now ? lease.endDate : now;
    let y = lease.startDate.getUTCFullYear();
    let m = lease.startDate.getUTCMonth() + 1;
    let crees = 0;
    while (y < fin.getUTCFullYear() || (y === fin.getUTCFullYear() && m <= fin.getUTCMonth() + 1)) {
      if (await this.ensurePeriod(leaseId, y, m)) crees++;
      m++;
      if (m > 12) { m = 1; y++; }
    }
    return crees;
  }

  // ──────────────────────────── Vues ────────────────────────────

  /** Échéances des baux dont l'utilisateur connecté est le locataire (par e-mail). */
  async myRents(userId: string) {
    await assertEmailVerified(this.prisma, userId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("Compte introuvable.");
    const leases = await this.prisma.leaseContract.findMany({
      where: {
        tenantEmail: { equals: user.email, mode: "insensitive" },
        status: { in: [LeaseStatus.ACTIVE, LeaseStatus.SIGNED, LeaseStatus.EXPIRED] },
      },
      include: {
        property: { select: { id: true, title: true, addressLine: true, city: true, ownerId: true } },
      },
    });
    // Rattrapage paresseux : un locataire qui ouvre sa page voit toujours
    // ses échéances à jour, même si le planificateur n'est pas encore passé.
    for (const l of leases) await this.backfillLease(l.id);

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
    return leases.map((l) => ({
      lease: {
        id: l.id,
        monthlyRent: l.monthlyRent,
        charges: l.charges,
        rentPaymentDay: l.rentPaymentDay,
        status: l.status,
        property: l.property,
      },
      paymentMethods: methods.filter((m) => m.ownerId === l.property.ownerId),
      periods: periods.filter((p) => p.leaseId === l.id).map(this.shapePeriod),
    }));
  }

  /** Échéances de tous les baux des biens du propriétaire connecté. */
  async ownerRents(ownerId: string, status?: RentStatus) {
    const leases = await this.prisma.leaseContract.findMany({
      where: { property: { ownerId } },
      include: { property: { select: { id: true, title: true, addressLine: true, city: true } } },
    });
    for (const l of leases) {
      if (l.status === LeaseStatus.ACTIVE || l.status === LeaseStatus.SIGNED) {
        await this.backfillLease(l.id);
      }
    }
    const periods = await this.prisma.rentPeriod.findMany({
      where: { leaseId: { in: leases.map((l) => l.id) }, ...(status ? { status } : {}) },
      orderBy: [{ status: "asc" }, { dueDate: "desc" }],
    });
    const parBail = new Map(leases.map((l) => [l.id, l]));
    return periods.map((p) => {
      const l = parBail.get(p.leaseId)!;
      return {
        ...this.shapePeriod(p),
        lease: {
          id: l.id,
          tenantName: `${l.tenantFirstName} ${l.tenantLastName}`,
          tenantEmail: l.tenantEmail,
          property: l.property,
        },
      };
    });
  }

  private shapePeriod = (p: {
    id: string; leaseId: string; periodYear: number; periodMonth: number; dueDate: Date;
    amount: number; status: RentStatus; declaredAt: Date | null; declaredMethod: string | null;
    declaredRef: string | null; proofDataUrl: string | null; tenantNote: string | null;
    paidAt: Date | null; receiptNo: string | null; rejectReason: string | null;
  }) => ({
    id: p.id,
    leaseId: p.leaseId,
    periodYear: p.periodYear,
    periodMonth: p.periodMonth,
    periodLabel: periodLabel(p.periodYear, p.periodMonth),
    dueDate: p.dueDate,
    amount: p.amount,
    status: p.status,
    declaredAt: p.declaredAt,
    declaredMethod: p.declaredMethod,
    declaredRef: p.declaredRef,
    proofDataUrl: p.proofDataUrl,
    tenantNote: p.tenantNote,
    paidAt: p.paidAt,
    receiptNo: p.receiptNo,
    rejectReason: p.rejectReason,
  });

  // ──────────────────────────── Déclaration ────────────────────────────

  async declare(
    userId: string,
    periodId: string,
    dto: { method: string; reference: string; proofDataUrl?: string; note?: string },
  ) {
    await assertEmailVerified(this.prisma, userId);
    assertValidDataUrl(dto.proofDataUrl, "justificatif");
    const { period, lease, user } = await this.loadForTenant(userId, periodId);
    if (period.status === RentStatus.PAID) throw new BadRequestException("Ce loyer est déjà réglé.");
    if (period.status === RentStatus.DECLARED)
      throw new BadRequestException("Un versement est déjà déclaré pour cette échéance : attendez la vérification.");

    const reference = dto.reference.trim();
    if (reference.length < 4)
      throw new BadRequestException("Indiquez l'identifiant de transaction reçu par SMS de votre opérateur.");

    try {
      const maj = await this.prisma.rentPeriod.update({
        where: { id: periodId },
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
      const owner = await this.prisma.user.findUnique({
        where: { id: lease.property.ownerId },
        select: { email: true, firstName: true, lastName: true },
      });
      if (owner) {
        this.mailer.rentDeclared(
          owner.email,
          `${owner.firstName} ${owner.lastName}`,
          `${user.firstName} ${user.lastName}`,
          periodLabel(period.periodYear, period.periodMonth),
          period.amount,
        );
      }
      return this.shapePeriod(maj);
    } catch (e) {
      if ((e as Prisma.PrismaClientKnownRequestError)?.code === "P2002")
        throw new BadRequestException("Cet identifiant de transaction a déjà été utilisé pour un autre loyer.");
      throw e;
    }
  }

  // ──────────────────────────── Validation ────────────────────────────

  async review(userId: string, role: Role, periodId: string, accept: boolean, reason?: string) {
    const period = await this.prisma.rentPeriod.findUnique({
      where: { id: periodId },
      include: { lease: { include: { property: { select: { ownerId: true, title: true, addressLine: true, city: true } } } } },
    });
    if (!period) throw new NotFoundException("Échéance introuvable.");
    const autorise = role === Role.ADMIN || period.lease.property.ownerId === userId;
    if (!autorise) throw new ForbiddenException("Seul le propriétaire du bien peut valider ce loyer.");
    if (period.status !== RentStatus.DECLARED)
      throw new BadRequestException("Aucune déclaration en attente sur cette échéance.");

    const tenantName = `${period.lease.tenantFirstName} ${period.lease.tenantLastName}`;
    const libelle = periodLabel(period.periodYear, period.periodMonth);

    if (!accept) {
      const maj = await this.prisma.rentPeriod.update({
        where: { id: periodId },
        // Refus → l'échéance redevient à payer : le locataire peut corriger
        // sa déclaration (l'identifiant erroné est libéré).
        data: {
          status: RentStatus.DUE,
          rejectReason: reason?.trim() || null,
          declaredRef: null,
        },
      });
      this.mailer.rentRejected(period.lease.tenantEmail, tenantName, libelle, reason?.trim() || "");
      return this.shapePeriod(maj);
    }

    const receiptNo = await this.nextReceiptNo(period.periodYear);
    const maj = await this.prisma.rentPeriod.update({
      where: { id: periodId },
      data: { status: RentStatus.PAID, paidAt: new Date(), receiptNo },
    });
    this.mailer.rentValidated(period.lease.tenantEmail, tenantName, libelle, period.amount, receiptNo);
    this.logger.log(`Loyer ${libelle} validé (${receiptNo}) — bail ${period.leaseId}.`);
    return this.shapePeriod(maj);
  }

  /** Numéro de quittance séquentiel par année, avec reprise en cas de course. */
  private async nextReceiptNo(year: number): Promise<string> {
    const count = await this.prisma.rentPeriod.count({
      where: { receiptNo: { startsWith: `HWE-${year}-` } },
    });
    for (let i = 1; i <= 5; i++) {
      const candidat = `HWE-${year}-${String(count + i).padStart(5, "0")}`;
      const existe = await this.prisma.rentPeriod.findUnique({ where: { receiptNo: candidat } });
      if (!existe) return candidat;
    }
    return `HWE-${year}-${Date.now()}`;
  }

  // ──────────────────────────── Quittance PDF ────────────────────────────

  async receiptPdf(userId: string, role: Role, periodId: string): Promise<{ buffer: Buffer; filename: string }> {
    const period = await this.prisma.rentPeriod.findUnique({
      where: { id: periodId },
      include: {
        lease: {
          include: {
            property: {
              select: { ownerId: true, title: true, addressLine: true, city: true, owner: { select: { firstName: true, lastName: true, email: true } } },
            },
          },
        },
      },
    });
    if (!period || period.status !== RentStatus.PAID || !period.receiptNo || !period.paidAt)
      throw new NotFoundException("Quittance indisponible : le loyer n'est pas validé.");

    // Accessible au propriétaire du bien, au locataire du bail, à l'admin.
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const estLocataire = user && period.lease.tenantEmail.toLowerCase() === user.email.toLowerCase();
    const autorise = role === Role.ADMIN || period.lease.property.ownerId === userId || estLocataire;
    if (!autorise) throw new ForbiddenException("Cette quittance ne vous concerne pas.");

    const owner = period.lease.property.owner;
    const buffer = await buildReceiptPdf({
      receiptNo: period.receiptNo,
      paidAt: period.paidAt,
      periodLabel: periodLabel(period.periodYear, period.periodMonth),
      propertyTitle: period.lease.property.title,
      propertyAddress: [period.lease.property.addressLine, period.lease.property.city].filter(Boolean).join(", "),
      ownerName: `${owner.firstName} ${owner.lastName}`,
      tenantName: `${period.lease.tenantFirstName} ${period.lease.tenantLastName}`,
      rent: period.lease.monthlyRent,
      charges: period.lease.charges,
      total: period.amount,
      method: period.declaredMethod,
      reference: period.declaredRef,
    });
    return { buffer, filename: `quittance-${period.receiptNo}.pdf` };
  }

  // ──────────────────────────── Interne ────────────────────────────

  private async loadForTenant(userId: string, periodId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("Compte introuvable.");
    const period = await this.prisma.rentPeriod.findUnique({
      where: { id: periodId },
      include: { lease: { include: { property: { select: { ownerId: true } } } } },
    });
    if (!period) throw new NotFoundException("Échéance introuvable.");
    if (period.lease.tenantEmail.toLowerCase() !== user.email.toLowerCase())
      throw new ForbiddenException("Cette échéance ne vous concerne pas.");
    return { period, lease: period.lease, user };
  }
}
