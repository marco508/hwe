import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { AgencyRole, Prisma } from "@prisma/client";
import { createHash, randomBytes } from "crypto";
import { lockKey } from "../common/advisory-lock";
import { normalizeEmail } from "../common/email.util";
import { assertCanAddAgent, loadSettings } from "../common/subscription";

type Tx = Prisma.TransactionClient;

/** Durée de validité d'une invitation d'agent. */
export const AGENCY_INVITE_DAYS = 14;

/** Slugs réservés (routes /agencies/<…>). */
const RESERVED_SLUGS = new Set(["me", "invites", "search", "new", "admin"]);

/** « Agence Dupont & Fils » → « agence-dupont-fils ». */
export function slugify(name: string): string {
  const base = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return base || "agence";
}

/** Code court lisible communiqué aux propriétaires (sans 0/O/1/I ambigus). */
export function agencyCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  let out = "";
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `AG-${out}`;
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function newInviteToken(): { token: string; tokenHash: string } {
  const token = randomBytes(24).toString("base64url");
  return { token, tokenHash: hashToken(token) };
}

export function ownerWebBase(): string {
  return (process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech").replace(/\/+$/, "");
}

export function agencyInviteUrl(token: string): string {
  return `${ownerWebBase()}/invitation/agence/${encodeURIComponent(token)}`;
}

/** Slug unique dérivé du nom (suffixe -2, -3… en cas de collision). */
async function uniqueSlug(tx: Tx, name: string): Promise<string> {
  const base = slugify(name);
  for (let i = 1; i < 200; i++) {
    const candidate = i === 1 ? base : `${base}-${i}`;
    if (RESERVED_SLUGS.has(candidate)) continue;
    const exists = await tx.agency.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!exists) return candidate;
  }
  return `${base}-${randomBytes(3).toString("hex")}`;
}

async function uniqueCode(tx: Tx): Promise<string> {
  for (let i = 0; i < 20; i++) {
    const code = agencyCode();
    const exists = await tx.agency.findUnique({ where: { code }, select: { id: true } });
    if (!exists) return code;
  }
  throw new ConflictException("Impossible de générer un code d'agence, réessayez.");
}

/**
 * Crée une agence dont `userId` devient MANAGER. Refus (409) si
 * l'utilisateur appartient déjà à une agence.
 *
 * Essai gratuit (`trialDays`, 60 par défaut) : un seul par personne. Si le
 * créateur a déjà consommé le sien (`User.proTrialUsedAt`, posé à la
 * création de sa première agence), la nouvelle agence n'a PAS d'essai
 * (`trialEndsAt` null) : offre gratuite, ou lecture seule si elle est coupée.
 */
export async function createAgencyFor(
  tx: Tx,
  userId: string,
  data: { name: string; email?: string | null; phone?: string | null; city?: string | null; country?: string | null },
) {
  await lockKey(tx, `agency-member:${userId}`);
  const already = await tx.agencyMember.findUnique({ where: { userId }, select: { id: true } });
  if (already) {
    throw new ConflictException({
      statusCode: 409,
      code: "ALREADY_IN_AGENCY",
      message: "Vous faites déjà partie d'une agence.",
    });
  }
  const name = data.name.trim().slice(0, 120);
  const [{ settings }, user] = await Promise.all([
    loadSettings(tx),
    tx.user.findUniqueOrThrow({ where: { id: userId }, select: { proTrialUsedAt: true } }),
  ]);
  const now = new Date();
  const trialEndsAt = user.proTrialUsedAt ? null : new Date(now.getTime() + settings.trialDays * 24 * 3600 * 1000);
  if (!user.proTrialUsedAt) await tx.user.update({ where: { id: userId }, data: { proTrialUsedAt: now } });
  const agency = await tx.agency.create({
    data: {
      trialEndsAt,
      name,
      slug: await uniqueSlug(tx, name),
      code: await uniqueCode(tx),
      email: data.email ?? null,
      phone: data.phone ?? null,
      city: data.city ?? null,
      ...(data.country ? { country: data.country } : {}),
    },
  });
  await tx.agencyMember.create({ data: { agencyId: agency.id, userId, role: "MANAGER" } });
  return agency;
}

/** Invitation valide (non expirée, non utilisée) à partir du jeton en clair. */
export async function findValidInvite(db: Tx, token: string) {
  const invite = await db.agencyInvite.findUnique({
    where: { tokenHash: hashToken(String(token ?? "")) },
    include: { agency: { select: { id: true, name: true, slug: true, logoKey: true } } },
  });
  if (!invite) {
    throw new NotFoundException({ statusCode: 404, code: "INVITE_NOT_FOUND", message: "Invitation introuvable ou annulée." });
  }
  if (invite.acceptedAt) {
    throw new ConflictException({ statusCode: 409, code: "INVITE_USED", message: "Cette invitation a déjà été utilisée." });
  }
  if (invite.expiresAt.getTime() < Date.now()) {
    throw new ConflictException({ statusCode: 409, code: "INVITE_EXPIRED", message: "Cette invitation a expiré : demandez-en une nouvelle à l'agence." });
  }
  return invite;
}

/**
 * Rattache l'utilisateur à l'agence de l'invitation (usage unique). L'e-mail
 * du compte doit être celui de l'invitation.
 */
export async function joinAgencyWithInvite(tx: Tx, user: { id: string; email: string }, token: string): Promise<{ agencyId: string; role: AgencyRole }> {
  const invite = await findValidInvite(tx, token);
  if (normalizeEmail(invite.email) !== normalizeEmail(user.email)) {
    throw new ForbiddenException({
      statusCode: 403,
      code: "INVITE_EMAIL_MISMATCH",
      message: `Cette invitation est destinée à ${invite.email} : connectez-vous ou inscrivez-vous avec cette adresse.`,
    });
  }
  await lockKey(tx, `agency-member:${user.id}`);
  const already = await tx.agencyMember.findUnique({ where: { userId: user.id }, select: { agencyId: true } });
  if (already) {
    throw new ConflictException({
      statusCode: 409,
      code: "ALREADY_IN_AGENCY",
      message: "Vous faites déjà partie d'une agence : quittez-la avant d'en rejoindre une autre.",
    });
  }
  const { count } = await tx.agencyInvite.updateMany({
    where: { id: invite.id, acceptedAt: null },
    data: { acceptedAt: new Date() },
  });
  if (count === 0) {
    throw new ConflictException({ statusCode: 409, code: "INVITE_USED", message: "Cette invitation a déjà été utilisée." });
  }
  // Abonnement : agence non suspendue et limite d'agents de l'offre.
  await lockKey(tx, `agency:${invite.agencyId}`);
  await assertCanAddAgent(tx, invite.agencyId, { countPendingInvites: false });
  await tx.agencyMember.create({ data: { agencyId: invite.agencyId, userId: user.id, role: invite.role } });
  return { agencyId: invite.agencyId, role: invite.role };
}
