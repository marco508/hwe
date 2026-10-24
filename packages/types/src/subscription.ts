// Abonnement des professionnels (voir ABONNEMENT.md, « Contrat final »).

export type SubscriptionStatus = "TRIAL" | "ACTIVE" | "GRACE" | "FREE" | "SUSPENDED";
export type PaymentMethod = "TRANSFER" | "MOBILE_MONEY" | "CASH" | "OTHER";
export type SubscriptionRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
export type ReminderKind = "D15" | "D7" | "D1" | "GRACE" | "FREE" | "SUSPENDED";

export interface Plan {
  id: string;
  code: string;
  name: string;
  /** Prix mensuel, 2 décimales. */
  monthlyPrice: number;
  currency: string;
  /** null = illimité */
  maxAgents: number | null;
  /** null = illimité */
  maxActiveMandates: number | null;
  active: boolean;
  position: number;
  isFree: boolean;
}

export interface PublicPlans {
  trialDays: number;
  /** Offre gratuite si elle est activée, sinon null. */
  freePlan: Plan | null;
  plans: Plan[];
}

export interface SubscriptionRequest {
  id: string;
  agencyId: string;
  planId: string;
  months: number;
  amount: number;
  currency: string;
  method: PaymentMethod;
  reference: string;
  note: string | null;
  status: SubscriptionRequestStatus;
  createdById: string;
  resolvedAt: string | null;
  resolvedById: string | null;
  rejectReason: string | null;
  paymentId: string | null;
  createdAt: string;
  plan: Plan;
  agency: { id: string; name: string; slug: string; code: string };
  createdBy?: { id: string; firstName: string; lastName: string; email: string } | null;
}

export interface AgencyPayment {
  id: string;
  number: string;
  agencyId: string;
  planId: string;
  months: number;
  amount: number;
  currency: string;
  method: PaymentMethod;
  reference: string | null;
  periodStart: string;
  periodEnd: string;
  recordedById: string;
  requestId: string | null;
  createdAt: string;
  plan: { id: string; code: string; name: string };
  agency: { id: string; name: string; slug: string; code: string };
}

export interface SubscriptionSummary {
  status: SubscriptionStatus;
  /** Écritures permises (tout sauf SUSPENDED). */
  writable: boolean;
  manualSuspension: boolean;
  trialEndsAt: string | null;
  paidUntil: string | null;
  coverageEnd: string | null;
  graceEndsAt: string | null;
  daysLeft: number | null;
  plan: Plan | null;
  limits: { maxAgents: number | null; maxActiveMandates: number | null; source: "TRIAL" | "PLAN" | "FREE" | "NONE" };
  usage: { agents: number; pendingInvites: number; activeMandates: number; pendingMandates: number; readOnlyMandates: number };
  freePlan: { enabled: boolean; maxAgents: number | null; maxActiveMandates: number | null };
  graceDays: number;
  trialDays: number;
  reminder: { kind: ReminderKind; end: string | null } | null;
}

/** GET /agencies/me/subscription */
export interface MySubscription extends SubscriptionSummary {
  isManager: boolean;
  plans: Plan[];
  durations: number[];
  /** Responsable seulement (sinon null / vide). */
  paymentInstructions: string | null;
  pendingRequest: SubscriptionRequest | null;
  requests: SubscriptionRequest[];
  payments: AgencyPayment[];
}

export interface AdminSubscriptionAgency {
  id: string;
  name: string;
  slug: string;
  code: string;
  email: string | null;
  createdAt: string;
  managers: { id: string; email: string; firstName: string; lastName: string }[];
  pendingRequestId: string | null;
  subscription: SubscriptionSummary;
}

export interface PlatformSettings {
  id: number;
  trialDays: number;
  graceDays: number;
  freePlanEnabled: boolean;
  paymentInstructions: string | null;
  updatedAt: string;
}

/** GET /subscriptions/owner-alerts */
export interface OwnerAgencyAlert {
  agency: { id: string; name: string; slug: string; logoUrl: string | null };
  reason: "SUSPENDED" | "PLAN_LIMIT";
  mandates: { id: string; reference: string; type: string; property: { id: string; title: string; city: string } }[];
}
