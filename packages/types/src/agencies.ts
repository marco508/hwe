/**
 * Module Professionnels (agences, démarcheurs, commerciaux) — formes JSON
 * du « Contrat final » de l'API (branche agences).
 */

/** Agence du compte connecté (`user.agency`). */
export interface AuthAgency {
  id: string;
  name: string;
  slug: string;
  code: string;
  logoUrl: string | null;
  role: AgencyRole;
}

export type AgencyRole = "MANAGER" | "AGENT";

/** Agence mandataire d'un bien (mandat ACTIVE). */
export interface ManagedBy {
  agencyId: string;
  name: string;
  slug: string;
  logoUrl: string | null;
}

/** Mandataire tel que porté par un bail. */
export interface LeaseManagedBy extends ManagedBy {
  registrationNumber?: string | null;
  email?: string | null;
  phone?: string | null;
  mandateReference?: string | null;
  mandateType?: MandateType | null;
}

/** Auteur d'une action (pro ou propriétaire). */
export interface ActorRef {
  id: string;
  firstName: string;
  lastName: string;
  agencyName?: string | null;
}

export interface AgencyPublic {
  id: string;
  name: string;
  slug: string;
  code: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string;
  registrationNumber: string | null;
  description: string | null;
  logoUrl: string | null;
}

export interface Agency extends AgencyPublic {
  paymentIban: string | null;
  paymentHolder: string | null;
  /** Devise de facturation de l'abonnement (null = celle du pays). Vue membre seulement. */
  billingCurrency?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AgencyMember {
  userId: string;
  role: AgencyRole;
  createdAt: string;
  assignedMandates: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    avatarUrl: string | null;
  };
}

export interface AgencyMine {
  agency: Agency;
  me: { userId: string; role: AgencyRole; canManage: boolean };
  members: AgencyMember[];
}

export interface AgencyInvite {
  id: string;
  email: string;
  role: AgencyRole;
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
  status: "PENDING" | "ACCEPTED" | "EXPIRED";
}

/** GET /agencies/invites/:token (public). */
export interface AgencyInviteInfo {
  agencyName: string;
  agencySlug: string;
  agencyLogoUrl: string | null;
  email: string;
  role: AgencyRole;
  expiresAt: string;
}

export interface AgencySearchItem {
  id: string;
  name: string;
  slug: string;
  code: string;
  city: string | null;
  country: string;
  logoUrl: string | null;
}

export type MandateType = "LETTING" | "MANAGEMENT" | "SALE";
export type MandateStatus = "PENDING_OWNER" | "ACTIVE" | "REJECTED" | "ENDED";
export type RentPayee = "OWNER" | "AGENCY";

export interface MandateTerms {
  type: MandateType;
  managementFeeRate?: number | null;
  lettingFeeAmount?: number | null;
  lettingFeeMonths?: number | null;
  saleFeeRate?: number | null;
  rentPayee?: RentPayee;
  startDate?: string;
  endDate?: string | null;
}

export interface Mandate {
  id: string;
  reference: string;
  type: MandateType;
  status: MandateStatus;
  createdBy: "AGENCY" | "OWNER";
  startDate: string;
  endDate: string | null;
  acceptedAt: string | null;
  rejectedAt: string | null;
  endedAt: string | null;
  endReason: string | null;
  message: string | null;
  managementFeeRate: number | null;
  lettingFeeAmount: number | null;
  lettingFeeMonths: number | null;
  saleFeeRate: number | null;
  currency: string;
  rentPayee: RentPayee;
  requestId: string | null;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    city: string;
    addressLine: string;
    postalCode: string;
    country: string;
    listingType: "SALE" | "RENT";
    status: string;
    price: number;
    currency: string;
    ownerId: string;
    media: { id: string; alt: string | null; position: number; url: string }[];
  };
  agency: {
    id: string;
    name: string;
    slug: string;
    code: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    registrationNumber: string | null;
    logoUrl: string | null;
  };
  assignedAgent: { id: string; firstName: string; lastName: string; email: string; phone: string | null } | null;
  owner: { id: string; firstName: string; lastName: string; email: string; phone: string | null; activated: boolean } | null;
  feesSummary: { currency: string; due: number; settled: number; cancelled: number };
  me: {
    as: "OWNER" | "MANAGER" | "AGENT" | "NONE";
    canAccept: boolean;
    canEnd: boolean;
    canAssign: boolean;
    canEditTerms: boolean;
    canResendOwnerInvite: boolean;
  };
}

export interface MandateEvent {
  id: string;
  kind: string;
  data: Record<string, unknown> | null;
  createdAt: string;
  actor: { id: string; firstName: string; lastName: string; agencyName: string | null } | null;
}

export interface MandateDetail extends Mandate {
  events: MandateEvent[];
  fees: FeeEntry[];
}

export interface MandateRequest {
  id: string;
  agencyId: string;
  ownerId: string;
  createdById: string;
  type: MandateType;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  startDate: string;
  endDate: string | null;
  message: string | null;
  managementFeeRate: number | null;
  lettingFeeAmount: number | null;
  lettingFeeMonths: number | null;
  saleFeeRate: number | null;
  rentPayee: RentPayee;
  resolvedAt: string | null;
  createdAt: string;
  agency: { id: string; name: string; slug: string; code: string; email: string | null; phone: string | null; logoUrl: string | null };
  owner: { id: string; firstName: string; lastName: string; email: string; phone: string | null; activated: boolean } | null;
  createdByUser: { id: string; firstName: string; lastName: string } | null;
}

export type FeeKind = "MANAGEMENT" | "LETTING" | "SALE";
export type FeeStatus = "DUE" | "SETTLED" | "CANCELLED";

export interface FeeEntry {
  id: string;
  mandateId: string;
  kind: FeeKind;
  amount: number;
  currency: string;
  rentPeriodId: string | null;
  leaseId: string | null;
  label: string;
  dueDate: string;
  status: FeeStatus;
  settledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FeeListItem extends FeeEntry {
  mandate: {
    id: string;
    reference: string;
    type: MandateType;
    ownerId: string;
    property: { id: string; title: string; city: string };
    agency: { id: string; name: string; slug: string };
  };
}

export interface FeeList {
  items: FeeListItem[];
  totals: { currency: string; due: number; settled: number }[];
}

export interface Statement {
  mandate: { id: string; reference: string; type: MandateType; status: MandateStatus };
  agency: { name: string; logoUrl: string | null } & Record<string, unknown>;
  owner: { id: string; firstName: string; lastName: string };
  property: { id: string; title: string; addressLine: string; city: string };
  currency: string;
  month: string;
  monthLabel: string;
  rents: {
    periodId: string;
    periodLabel: string;
    tenantName: string;
    paidAt: string | null;
    receiptNo: string | null;
    rentAmount: number;
    chargesAmount: number;
    amount: number;
    currency: string;
  }[];
  fees: { id: string; kind: FeeKind; label: string; amount: number; status: FeeStatus; dueDate: string; currency: string }[];
  totals: { collected: number; fees: number; net: number };
}

export interface AgencyOverview {
  role: AgencyRole;
  properties: number;
  activeMandates: number;
  pendingMandates: number;
  rentsToVerify: number;
  lateRents: number;
  openTickets: number;
  upcomingVisits: number;
  pendingProposals: number;
  feesDueThisMonth: number;
  feesSettledThisMonth: number;
  feesCurrency: string | null;
  feesByCurrency: { currency: string; due: number; settled: number }[];
  byAgent: {
    userId: string | null;
    firstName: string | null;
    lastName: string | null;
    role: AgencyRole | null;
    unassigned: boolean;
    properties: number;
    activeMandates: number;
    pendingMandates: number;
    rentsToVerify: number;
    openTickets: number;
  }[];
}

/** GET /auth/owner-invite/:token (public). */
export interface OwnerInviteInfo {
  email: string;
  firstName: string;
  lastName: string;
  agency: { id: string; name: string; slug: string; logoUrl: string | null } | null;
  properties: {
    id: string;
    title: string;
    city: string;
    mandateReference: string;
    mandateType: MandateType;
    agencyName: string;
  }[];
}

/** Portefeuille pro : mandat du bien. */
export interface PortfolioMandate {
  id: string;
  reference: string;
  type: MandateType;
  status: MandateStatus;
  assignedAgentId: string | null;
  startDate: string;
  endDate: string | null;
  rentPayee: RentPayee;
}

/** Portefeuille pro : droits du pro sur le bien. */
export interface PropertyAccess {
  as: "PRO" | "OWNER";
  ownerActivated: boolean;
  can: {
    READ: boolean;
    EDIT_LISTING: boolean;
    ACCEPT_TENANT: boolean;
    SIGN_LEASE: boolean;
    RENTS: boolean;
    OWNER_NOTICE: boolean;
    /** Séjours courte durée (mandat de gestion). */
    STAYS?: boolean;
  };
}

/** Codes 403/409 propres au module : clé i18n `pro.err.<code>`. */
export const PRO_ERROR_CODES = [
  "PROPERTY_ACCESS_DENIED",
  "MANDATE_INACTIVE",
  "NOT_ASSIGNED",
  "OWNER_DECISION_REQUIRED",
  "LETTING_MANDATE_COMPLETED",
  "MANDATE_SCOPE",
  "OWNER_ONLY",
  "MANAGER_ONLY",
  "AGENCY_ONLY",
  "OWNER_NOT_FOUND",
  "OWNER_EXISTS",
  "NOT_AN_OWNER",
  "MANDATE_ALREADY_OPEN",
  "MANDATE_TYPE_MISMATCH",
  "INVALID_FEES",
  "AGENCY_IBAN_REQUIRED",
  "LAST_MANAGER",
  "ALREADY_IN_AGENCY",
  "ALREADY_MEMBER",
  "INVITE_EMAIL_MISMATCH",
  "INVITE_USED",
  "INVITE_EXPIRED",
  "INVITE_NOT_FOUND",
  "INVITED_ACCOUNT",
  "ACCOUNT_NOT_ACTIVATED",
  "SALE_PRICE_REQUIRED",
  "PROPERTY_HAS_MANDATE",
  "AGENCY_NOT_FOUND",
  "INVALID_INVITE",
  "OWNER_ALREADY_ACTIVATED",
  "MANDATE_NOT_EDITABLE",
  "AGENT_ROLE_REQUIRED",
] as const;
