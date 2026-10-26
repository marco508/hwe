import type {
  Property,
  Inquiry,
  PropertyDocument,
  DocumentType,
  LeaseContract,
  Inspection,
  InspectionType,
  InspectionItem,
  Ticket,
  TicketStatus,
  LeaseAmendment,
  LeaseCoTenant,
  InsuranceSummary,
  Visit,
  VisitStatus,
  ChargeRegularization,
  UserDocument as ApplicantDocument,
  User,
  RentPeriod,
  RentStatus,
  ListingType,
  PropertyType,
  PropertyStatus,
  Booking,
  BookingStatus,
  HostStayProperty,
  StayBlock,
  StaySettings,
  VoyageEventKind,
  VoyageEventOccurrence,
  VoyageEventRule,
} from "@hwe/types";
import type {
  AgencyMine,
  AgencyInvite,
  AgencyInviteInfo,
  AgencyOverview,
  AgencyPublic,
  AgencySearchItem,
  AuthResponse,
  FeeList,
  FeeEntry,
  FeeStatus,
  Mandate,
  MandateDetail,
  MandateRequest,
  MandateTerms,
  MandateStatus,
  MandateType,
  OwnerInviteInfo,
  Statement,
  AdminSubscriptionAgency,
  AgencyPayment,
  MySubscription,
  OwnerAgencyAlert,
  PaymentMethod,
  Plan,
  PlatformSettings,
  PublicPlans,
  SubscriptionRequest,
  SubscriptionRequestStatus,
  SubscriptionSummary,
} from "@hwe/types";
import { commonApi, qs, rawRequest, request as coreRequest, tokenStore, downloadBlob } from "@hwe/ui";

/** Appel API (cœur partagé @hwe/ui : erreurs JSON, 401 → reconnexion, 403 e-mail…). */
function request<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  return coreRequest<T>(path, { ...init, auth });
}

export { tokenStore };

// ── Loyers ──────────────────────────────────────────────────────────────
export type { RentStatus };

export interface OwnerPaymentMethod {
  id: string;
  label: string;
  value: string;
  holder: string | null;
  instructions: string | null;
  active: boolean;
  position: number;
}

/** Échéance vue par le propriétaire (montants figés + devise du bail). */
export interface OwnerRentPeriod extends RentPeriod {
  lease: {
    id: string;
    tenantName: string;
    tenantEmail: string;
    currency?: string | null;
    property: { id: string; title: string; addressLine: string; city: string; currency?: string; ownerId?: string };
    /**
     * Destinataire des loyers (même règle que l'espace locataire) : l'agence si
     * le mandat actif prévoit qu'elle encaisse et qu'elle a des coordonnées de
     * paiement, sinon le propriétaire.
     */
    payee?: "OWNER" | "AGENCY";
    /** Agence sous mandat actif (qu'elle encaisse ou non). */
    agency?: { id: string; name: string } | null;
  };
}


interface MediaInput {
  url: string;
  alt?: string;
  position?: number;
}

/** Champs spécifiques vente / location (null = non renseigné). */
type SaleRentFields = Partial<
  Pick<
    Property,
    | "coOwnershipFees"
    | "propertyTax"
    | "energyClass"
    | "notaryFeesRate"
    | "isNew"
    | "rentalKind"
    | "chargesIncluded"
    | "chargesAmount"
    | "deposit"
    | "noticeMonths"
    | "petsAllowed"
  >
>;

export interface CreatePropertyBody extends SaleRentFields {
  title: string;
  description: string;
  listingType: ListingType;
  propertyType: PropertyType;
  status?: PropertyStatus;
  /** Facultatif pour une location tarifée uniquement par la grille (F10). */
  price?: number;
  currency?: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number | null;
  yearBuilt?: number | null;
  furnished?: boolean;
  hasParking?: boolean;
  hasBalcony?: boolean;
  hasGarden?: boolean;
  hasElevator?: boolean;
  addressLine: string;
  city: string;
  postalCode: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  media?: MediaInput[];
}

type UpdatePropertyBody = Partial<CreatePropertyBody>;

export const api = {
  ...commonApi,

  // properties
  listMine: () => request<Property[]>("/properties/mine/list", {}, true),
  createProperty: (body: CreatePropertyBody) =>
    request<Property>(`/properties`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  updateProperty: (id: string, body: UpdatePropertyBody) =>
    request<Property>(`/properties/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }, true),
  deleteProperty: (id: string) =>
    request<{ ok: true }>(`/properties/${id}`, { method: "DELETE" }, true),

  // inquiries
  inquiriesReceived: () => request<Inquiry[]>("/inquiries/received", {}, true),
  respondToInquiry: (id: string, decision: "ACCEPTED" | "REJECTED") =>
    request<Inquiry>(`/inquiries/${id}/respond`, {
      method: "PATCH",
      body: JSON.stringify({ decision }),
    }, true),
  /** Pro : propose le candidat au propriétaire. */
  proposeInquiry: (id: string, note?: string) =>
    request<Inquiry>(`/inquiries/${id}/propose`, {
      method: "POST",
      body: JSON.stringify({ note: note || undefined }),
    }, true),
  /** Propriétaire (ou pro pour un propriétaire non activé) : décision sur la proposition. */
  ownerDecision: (id: string, decision: "APPROVED" | "DECLINED", note?: string) =>
    request<Inquiry>(`/inquiries/${id}/owner-decision`, {
      method: "POST",
      body: JSON.stringify({ decision, note: note || undefined }),
    }, true),

  // documents légaux
  listDocuments: (propertyId: string) =>
    request<PropertyDocument[]>(`/properties/${propertyId}/documents`, {}, true),
  createDocument: (
    propertyId: string,
    body: {
      name: string;
      documentType: DocumentType;
      fileUrl: string;
      fileSize?: number;
      mimeType?: string;
      notes?: string;
    },
  ) =>
    request<PropertyDocument>(`/properties/${propertyId}/documents`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  updateDocument: (
    propertyId: string,
    docId: string,
    body: Partial<{ name: string; notes: string }>,
  ) =>
    request<PropertyDocument>(`/properties/${propertyId}/documents/${docId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }, true),
  deleteDocument: (propertyId: string, docId: string) =>
    request<{ ok: true }>(`/properties/${propertyId}/documents/${docId}`, {
      method: "DELETE",
    }, true),

  // contrats de location
  listLeases: (propertyId: string) =>
    request<LeaseContract[]>(`/properties/${propertyId}/leases`, {}, true),
  createLease: (
    propertyId: string,
    body: {
      tenantFirstName: string;
      tenantLastName: string;
      tenantEmail: string;
      tenantPhone?: string;
      tenantAddress?: string;
      monthlyRent: number;
      charges?: number;
      deposit: number;
      startDate: string;
      endDate?: string;
      noticePeriod?: number;
      rentPaymentDay?: number;
      furnished?: boolean;
      specialClauses?: string;
    },
  ) =>
    request<LeaseContract>(`/properties/${propertyId}/leases`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  updateLease: (
    propertyId: string,
    leaseId: string,
    // Contrat §9 : modifiable seulement tant qu'aucune partie n'a signé.
    body: {
      specialClauses?: string;
      startDate?: string;
      endDate?: string;
      monthlyRent?: number;
      charges?: number;
      deposit?: number;
    },
  ) =>
    request<LeaseContract>(`/properties/${propertyId}/leases/${leaseId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }, true),
  deleteLease: (propertyId: string, leaseId: string) =>
    request<{ ok: true }>(`/properties/${propertyId}/leases/${leaseId}`, {
      method: "DELETE",
    }, true),
  signLease: (propertyId: string, leaseId: string) =>
    request<LeaseContract>(`/properties/${propertyId}/leases/${leaseId}/sign`, {
      method: "POST",
    }, true),

  markDeposit: (
    propertyId: string,
    leaseId: string,
    body: { action: "PAID" | "RETURNED"; retained?: number; note?: string },
  ) =>
    request<LeaseContract>(`/properties/${propertyId}/leases/${leaseId}/deposit`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),

  // ── États des lieux ──
  listInspections: (leaseId: string) =>
    request<Inspection[]>(`/leases/${leaseId}/inspections`, {}, true),
  upsertInspection: (
    leaseId: string,
    type: InspectionType,
    body: {
      date: string;
      items?: InspectionItem[];
      generalNote?: string;
      meterElectricity?: string;
      meterWater?: string;
      meterGas?: string;
      keysCount?: number;
    },
  ) =>
    request<Inspection>(`/leases/${leaseId}/inspections/${type}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }, true),
  signInspection: (leaseId: string, type: InspectionType) =>
    request<Inspection>(`/leases/${leaseId}/inspections/${type}/sign`, { method: "POST" }, true),

  // ── Incidents ──
  ownerTickets: (status?: TicketStatus) =>
    request<Ticket[]>(`/tickets/owner${status ? `?status=${status}` : ""}`, {}, true),
  reviewTicket: (id: string, body: { status: "IN_PROGRESS" | "RESOLVED"; resolutionNote?: string }) =>
    request<Ticket>(`/tickets/${id}`, { method: "PATCH", body: JSON.stringify(body) }, true),

  // ── Administration ──
  adminOverview: () =>
    request<{
      users: Record<string, number>;
      properties: Record<string, number>;
      leases: number;
      ticketsOpen: number;
      inquiries: number;
      usersUnverified: number;
      smtpConfigured?: boolean;
    }>("/admin/overview", {}, true),
  adminUsers: (q?: string, role?: string) => {
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    if (role) search.set("role", role);
    return request<(User & { _count: { properties: number; inquiries: number } })[]>(
      `/admin/users?${search.toString()}`, {}, true,
    );
  },
  adminProperties: (q?: string, status?: string) => {
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    if (status) search.set("status", status);
    return request<{
      id: string; title: string; city: string; status: PropertyStatus;
      listingType: ListingType; price: number; createdAt: string;
      owner: { id: string; email: string; firstName: string; lastName: string };
      _count: { inquiries: number; leases: number };
    }[]>(`/admin/properties?${search.toString()}`, {}, true);
  },
  adminAgencies: (q?: string) =>
    request<unknown[]>(`/admin/agencies${qs({ q })}`, {}, true),
  adminVerifyUserEmail: (userId: string) =>
    request<{ ok: true }>(`/admin/users/${userId}/verify-email`, { method: "PATCH" }, true),
  adminSetPropertyStatus: (propertyId: string, status: PropertyStatus) =>
    request<{ ok: true }>(`/admin/properties/${propertyId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }, true),

  // ── Visites ──
  ownerVisits: (status?: VisitStatus) =>
    request<Visit[]>(`/visits/owner${status ? `?status=${status}` : ""}`, {}, true),
  answerVisit: (id: string, body: { status: "CONFIRMED" | "DECLINED"; ownerNote?: string }) =>
    request<Visit>(`/visits/${id}`, { method: "PATCH", body: JSON.stringify(body) }, true),

  // ── Avenants ──
  createAmendment: (
    propertyId: string,
    leaseId: string,
    body: { effectiveDate: string; newMonthlyRent?: number; newCharges?: number; newEndDate?: string; note?: string },
  ) =>
    request<LeaseAmendment>(`/properties/${propertyId}/leases/${leaseId}/amendments`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),

  // ── Colocation ──
  addCoTenant: (
    propertyId: string,
    leaseId: string,
    body: { firstName: string; lastName: string; email: string; phone?: string },
  ) =>
    request<LeaseCoTenant>(`/properties/${propertyId}/leases/${leaseId}/cotenants`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  removeCoTenant: (propertyId: string, leaseId: string, coTenantId: string) =>
    request<{ ok: true }>(`/properties/${propertyId}/leases/${leaseId}/cotenants/${coTenantId}`, {
      method: "DELETE",
    }, true),

  // ── Assurance ──
  getInsuranceFile: (leaseId: string, insuranceId: string) =>
    request<{ fileUrl: string }>(`/leases/${leaseId}/insurances/${insuranceId}/file`, {}, true),

  // ── Dossier de candidature ──
  getInquiryDossier: (inquiryId: string) =>
    request<ApplicantDocument[]>(`/inquiries/${inquiryId}/dossier`, {}, true),

  // ── Congé propriétaire & régularisation des charges ──
  giveOwnerNotice: (
    propertyId: string,
    leaseId: string,
    body: { reason: "SALE" | "REPOSSESSION" | "OTHER"; desiredDate?: string; note?: string },
  ) =>
    request<LeaseContract>(`/properties/${propertyId}/leases/${leaseId}/owner-notice`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  createChargeRegularization: (
    propertyId: string,
    leaseId: string,
    body: { periodLabel: string; provisionsCollected: number; actualCharges: number; note?: string },
  ) =>
    request<ChargeRegularization>(`/properties/${propertyId}/leases/${leaseId}/charge-regularizations`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  listChargeRegularizations: (leaseId: string) =>
    request<ChargeRegularization[]>(`/leases/${leaseId}/charge-regularizations`, {}, true),

  // grille tarifaire
  getPricingRates: (propertyId: string) =>
    request<{ id: string; unit: string; amount: number }[]>(
      `/properties/${propertyId}/pricing`,
    ),
  upsertPricingRates: (
    propertyId: string,
    rates: { unit: string; amount: number }[],
  ) =>
    request<{ id: string; unit: string; amount: number }[]>(
      `/properties/${propertyId}/pricing`,
      { method: "PUT", body: JSON.stringify({ rates }) },
      true,
    ),

  // ── Loyers ────────────────────────────────────────────────────────────
  listPaymentMethods: () =>
    request<OwnerPaymentMethod[]>("/rents/payment-methods", {}, true),
  addPaymentMethod: (body: {
    label: string;
    value: string;
    holder?: string;
    instructions?: string;
  }) =>
    request<OwnerPaymentMethod>("/rents/payment-methods", {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  updatePaymentMethod: (
    id: string,
    body: { label?: string; value?: string; holder?: string; instructions?: string; active?: boolean },
  ) =>
    request<OwnerPaymentMethod>(`/rents/payment-methods/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }, true),
  removePaymentMethod: (id: string) =>
    request<{ ok: true }>(`/rents/payment-methods/${id}`, { method: "DELETE" }, true),
  ownerRents: (status?: RentStatus) =>
    request<OwnerRentPeriod[]>(`/rents/owner${status ? `?status=${status}` : ""}`, {}, true),
  reviewRent: (periodId: string, accept: boolean, reason?: string) =>
    request<OwnerRentPeriod>(`/rents/${periodId}/review`, {
      method: "POST",
      body: JSON.stringify({ accept, reason }),
    }, true),
  // Quittances, messagerie : voir commonApi.

  // ── Avenant : signature bailleur (propriétaire ; pro pour un propriétaire non activé) ──
  signAmendment: (propertyId: string, leaseId: string, amendmentId: string) =>
    request<LeaseAmendment>(`/properties/${propertyId}/leases/${leaseId}/amendments/${amendmentId}/sign`, {
      method: "POST",
    }, true),

  // ── Vente conclue ──
  markSold: (propertyId: string, salePrice: number) =>
    request<Property>(`/properties/${propertyId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "SOLD", salePrice }),
    }, true),

  // ── Agence & équipe ──
  createAgency: (body: { name: string; email?: string; phone?: string; city?: string; country?: string }) =>
    request<AgencyMine>("/agencies", { method: "POST", body: JSON.stringify(body) }, true),
  myAgency: () => request<AgencyMine>("/agencies/me", {}, true),
  updateAgency: (body: Partial<{
    name: string;
    logoUrl: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    country: string;
    registrationNumber: string | null;
    description: string | null;
    paymentIban: string | null;
    paymentHolder: string | null;
  }>) => request<AgencyMine>("/agencies/me", { method: "PATCH", body: JSON.stringify(body) }, true),
  agencyOverview: () => request<AgencyOverview>("/agencies/me/overview", {}, true),
  inviteAgent: (email: string, role: "AGENT" | "MANAGER" = "AGENT") =>
    request<{ invite: AgencyInvite; inviteUrl: string; emailSent: boolean }>("/agencies/me/invites", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    }, true),
  agencyInvites: () => request<AgencyInvite[]>("/agencies/me/invites", {}, true),
  revokeAgencyInvite: (id: string) =>
    request<{ ok: true }>(`/agencies/me/invites/${id}`, { method: "DELETE" }, true),
  agencyInviteInfo: (token: string) =>
    request<AgencyInviteInfo>(`/agencies/invites/${encodeURIComponent(token)}`),
  acceptAgencyInvite: (token: string) =>
    request<AgencyMine>(`/agencies/invites/${encodeURIComponent(token)}/accept`, { method: "POST" }, true),
  setMemberRole: (userId: string, role: "MANAGER" | "AGENT") =>
    request<AgencyMine>(`/agencies/me/members/${userId}`, { method: "PATCH", body: JSON.stringify({ role }) }, true),
  removeMember: (userId: string) =>
    request<AgencyMine>(`/agencies/me/members/${userId}`, { method: "DELETE" }, true),
  searchAgencies: (q: string) =>
    request<AgencySearchItem[]>(`/agencies/search${qs({ q })}`),
  publicAgency: (slug: string) =>
    request<AgencyPublic & { properties: Property[] }>(`/agencies/${encodeURIComponent(slug)}`),

  // ── Mandats ──
  listMandates: (f: { status?: MandateStatus; type?: MandateType; agentId?: string; ownerId?: string; propertyId?: string } = {}) =>
    request<Mandate[]>(`/mandates${qs(f)}`, {}, true),
  getMandate: (id: string) => request<MandateDetail>(`/mandates/${id}`, {}, true),
  inviteOwner: (body: MandateTerms & { ownerEmail: string; propertyIds?: string[]; message?: string; assignedAgentId?: string }) =>
    request<{ mandates: Mandate[]; request: MandateRequest | null }>("/mandates/invite", {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  createWithNewOwner: (body: {
    owner?: { firstName: string; lastName: string; email: string; phone?: string };
    ownerId?: string;
    property: CreatePropertyBody;
    mandate: MandateTerms;
    assignedAgentId?: string;
  }) =>
    request<{ mandate: Mandate; ownerInviteUrl: string; emailSent: boolean; ownerCreated: boolean }>(
      "/mandates/with-new-owner",
      { method: "POST", body: JSON.stringify(body) },
      true,
    ),
  mandateByOwner: (body: MandateTerms & { propertyId: string; agencySlug?: string; agencyCode?: string; message?: string }) =>
    request<Mandate>("/mandates/by-owner", { method: "POST", body: JSON.stringify(body) }, true),
  acceptMandate: (id: string) => request<Mandate>(`/mandates/${id}/accept`, { method: "POST" }, true),
  rejectMandate: (id: string, reason?: string) =>
    request<Mandate>(`/mandates/${id}/reject`, { method: "POST", body: JSON.stringify({ reason: reason || undefined }) }, true),
  endMandate: (id: string, reason: string) =>
    request<Mandate>(`/mandates/${id}/end`, { method: "POST", body: JSON.stringify({ reason }) }, true),
  updateMandate: (id: string, body: Partial<MandateTerms> & { assignedAgentId?: string | null; message?: string }) =>
    request<Mandate>(`/mandates/${id}`, { method: "PATCH", body: JSON.stringify(body) }, true),
  resendOwnerInvite: (id: string) =>
    request<{ ownerInviteUrl: string; emailSent: boolean }>(`/mandates/${id}/resend-owner-invite`, { method: "POST" }, true),
  mandateRequests: () => request<MandateRequest[]>("/mandates/requests", {}, true),
  acceptMandateRequest: (id: string, propertyIds: string[]) =>
    request<{ request: MandateRequest; mandates: Mandate[] }>(`/mandates/requests/${id}/accept`, {
      method: "POST",
      body: JSON.stringify({ propertyIds }),
    }, true),
  rejectMandateRequest: (id: string) =>
    request<MandateRequest>(`/mandates/requests/${id}/reject`, { method: "POST" }, true),

  // ── Honoraires & relevés ──
  listFees: (f: { mandateId?: string; from?: string; to?: string; status?: FeeStatus } = {}) =>
    request<FeeList>(`/fees${qs(f)}`, {}, true),
  setFeeStatus: (id: string, status: "SETTLED" | "DUE") =>
    request<FeeEntry>(`/fees/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }, true),
  statement: (mandateId: string, month: string) =>
    request<Statement>(`/mandates/${mandateId}/statements${qs({ month })}`, {}, true),
  downloadStatement: async (mandateId: string, month: string) => {
    const res = await rawRequest(`/mandates/${mandateId}/statements/${month}/pdf`, { auth: true });
    const blob = await res.blob();
    const cd = res.headers.get("Content-Disposition") ?? "";
    const name = /filename="([^"]+)"/.exec(cd)?.[1] ?? `releve-${month}.pdf`;
    downloadBlob(blob, name);
  },

  // ── Abonnement de l'agence ──
  publicPlans: () => request<PublicPlans>("/plans"),
  mySubscription: () => request<MySubscription>("/agencies/me/subscription", {}, true),
  declarePayment: (body: { planCode: string; months: number; method: PaymentMethod; reference: string; note?: string }) =>
    request<SubscriptionRequest>("/agencies/me/subscription/requests", { method: "POST", body: JSON.stringify(body) }, true),
  cancelPaymentRequest: (id: string) =>
    request<SubscriptionRequest>(`/agencies/me/subscription/requests/${id}`, { method: "DELETE" }, true),
  downloadInvoice: async (paymentId: string, admin = false) => {
    const path = admin ? `/admin/subscriptions/payments/${paymentId}/pdf` : `/agencies/me/subscription/payments/${paymentId}/pdf`;
    const res = await rawRequest(path, { auth: true });
    const blob = await res.blob();
    const cd = res.headers.get("Content-Disposition") ?? "";
    downloadBlob(blob, /filename="([^"]+)"/.exec(cd)?.[1] ?? "facture.pdf");
  },
  /** Propriétaire : agences mandataires suspendues ou hors limite. */
  ownerAgencyAlerts: () => request<OwnerAgencyAlert[]>("/subscriptions/owner-alerts", {}, true),

  // ── Admin : abonnements ──
  adminSubscriptionRequests: (status?: SubscriptionRequestStatus) =>
    request<SubscriptionRequest[]>(`/admin/subscriptions/requests${qs({ status })}`, {}, true),
  adminApproveRequest: (id: string) =>
    request<{ request: SubscriptionRequest; payment: AgencyPayment; subscription: SubscriptionSummary }>(
      `/admin/subscriptions/requests/${id}/approve`, { method: "POST" }, true),
  adminRejectRequest: (id: string, reason: string) =>
    request<SubscriptionRequest>(`/admin/subscriptions/requests/${id}/reject`, { method: "POST", body: JSON.stringify({ reason }) }, true),
  adminSubscriptionAgencies: (q?: string) =>
    request<AdminSubscriptionAgency[]>(`/admin/subscriptions/agencies${qs({ q })}`, {}, true),
  adminUpdateAgencySubscription: (id: string, body: { trialEndsAt?: string | null; paidUntil?: string | null; planCode?: string | null; manualSuspension?: boolean }) =>
    request<unknown>(`/admin/subscriptions/agencies/${id}`, { method: "PATCH", body: JSON.stringify(body) }, true),
  adminRecordPayment: (id: string, body: { planCode: string; months: number; method: PaymentMethod; reference?: string }) =>
    request<{ payment: AgencyPayment }>(`/admin/subscriptions/agencies/${id}/payments`, { method: "POST", body: JSON.stringify(body) }, true),
  adminPayments: (agencyId?: string) =>
    request<AgencyPayment[]>(`/admin/subscriptions/payments${qs({ agencyId })}`, {}, true),
  adminPlans: () => request<Plan[]>("/admin/plans", {}, true),
  adminUpdatePlan: (id: string, body: Partial<Pick<Plan, "name" | "monthlyPrice" | "currency" | "maxAgents" | "maxActiveMandates" | "active" | "position">>) =>
    request<Plan>(`/admin/plans/${id}`, { method: "PATCH", body: JSON.stringify(body) }, true),
  /** Remplace les prix par devise d'une offre (l'EUR reste le prix de base). */
  adminSetPlanPrices: (id: string, prices: { currency: string; monthlyPrice: number }[]) =>
    request<Plan>(`/admin/plans/${id}/prices`, { method: "PUT", body: JSON.stringify({ prices }) }, true),
  /** Devise de facturation de l'agence (null = celle de son pays). */
  setBillingCurrency: (billingCurrency: string | null) =>
    request<unknown>("/agencies/me", { method: "PATCH", body: JSON.stringify({ billingCurrency }) }, true),
  adminSettings: () => request<PlatformSettings>("/admin/settings", {}, true),
  adminUpdateSettings: (body: Partial<Pick<PlatformSettings, "trialDays" | "graceDays" | "freePlanEnabled" | "paymentInstructions">>) =>
    request<PlatformSettings>("/admin/settings", { method: "PATCH", body: JSON.stringify(body) }, true),

  // ── Activation d'un compte propriétaire créé par un pro ──
  ownerInviteInfo: (token: string) =>
    request<OwnerInviteInfo>(`/auth/owner-invite/${encodeURIComponent(token)}`),
  activateOwner: (token: string, password: string) =>
    request<AuthResponse>(`/auth/owner-invite/${encodeURIComponent(token)}/activate`, {
      method: "POST",
      body: JSON.stringify({ password }),
    }),

  // ── Séjours courte durée (hôte : propriétaire ou pro sous mandat de gestion) ──
  stayProperties: () => request<HostStayProperty[]>("/stays/host/properties", {}, true),
  stayBookings: (q: { status?: BookingStatus; propertyId?: string } = {}) =>
    request<Booking[]>(`/stays/host/bookings${qs(q)}`, {}, true),
  staySettings: (propertyId: string) =>
    request<{ property: { id: string; title: string; city: string; currency: string; status: string; listingType: string; rentalKind: string | null }; settings: StaySettings; gridNightly: number | null; rates: { nightly: number | null; weekly: number | null; monthly: number | null } }>(
      `/stays/host/property/${encodeURIComponent(propertyId)}/settings`, {}, true),
  saveStaySettings: (propertyId: string, body: Partial<Omit<StaySettings, "propertyId" | "icalToken" | "icalSyncedAt" | "icalError">>) =>
    request<StaySettings>(`/stays/host/property/${encodeURIComponent(propertyId)}/settings`, { method: "PUT", body: JSON.stringify(body) }, true),
  stayCalendar: (propertyId: string, from?: string, to?: string) =>
    request<{ from: string; to: string; bookings: Array<Pick<Booking, "id" | "reference" | "status" | "checkIn" | "checkOut" | "guests"> & { guest: { firstName: string; lastName: string } }>; blocks: StayBlock[] }>(
      `/stays/host/property/${encodeURIComponent(propertyId)}/calendar${qs({ from, to })}`, {}, true),
  addStayBlock: (propertyId: string, body: { startDate: string; endDate: string; note?: string }) =>
    request<StayBlock>(`/stays/host/property/${encodeURIComponent(propertyId)}/blocks`, { method: "POST", body: JSON.stringify(body) }, true),
  removeStayBlock: (id: string) => request<{ ok: true }>(`/stays/host/blocks/${encodeURIComponent(id)}`, { method: "DELETE" }, true),
  syncStayIcal: (propertyId: string) =>
    request<{ ok: boolean; blocks: number; error?: string }>(`/stays/host/property/${encodeURIComponent(propertyId)}/ical-sync`, { method: "POST" }, true),
  regenerateStayIcal: (propertyId: string) =>
    request<{ icalToken: string }>(`/stays/host/property/${encodeURIComponent(propertyId)}/ical-token`, { method: "POST" }, true),
  acceptBooking: (id: string, note?: string) =>
    request<Booking>(`/stays/host/bookings/${encodeURIComponent(id)}/accept`, { method: "PATCH", body: JSON.stringify({ note }) }, true),
  declineBooking: (id: string, note?: string) =>
    request<Booking>(`/stays/host/bookings/${encodeURIComponent(id)}/decline`, { method: "PATCH", body: JSON.stringify({ note }) }, true),
  confirmBookingPayment: (id: string) =>
    request<Booking>(`/stays/host/bookings/${encodeURIComponent(id)}/confirm-payment`, { method: "PATCH" }, true),
  rejectBookingPayment: (id: string, note?: string) =>
    request<Booking>(`/stays/host/bookings/${encodeURIComponent(id)}/reject-payment`, { method: "PATCH", body: JSON.stringify({ note }) }, true),
  hostCancelBooking: (id: string, reason: string) =>
    request<Booking>(`/stays/host/bookings/${encodeURIComponent(id)}/cancel`, { method: "PATCH", body: JSON.stringify({ reason }) }, true),
  replyStayReview: (id: string, reply: string) =>
    request<unknown>(`/stays/host/reviews/${encodeURIComponent(id)}/reply`, { method: "PATCH", body: JSON.stringify({ reply }) }, true),

  // ── Admin : Voyage ──
  adminVoyageContent: (country?: string) => request<AdminVoyageContent>(`/voyage/admin/content${qs({ country })}`, {}, true),
  adminVoyageImage: (dataUrl: string) =>
    request<{ cover: string; url: string }>("/voyage/admin/images", { method: "POST", body: JSON.stringify({ dataUrl }) }, true),
  adminSaveGuide: (country: string, body: Record<string, unknown>) =>
    request<unknown>(`/voyage/admin/guides/${encodeURIComponent(country)}`, { method: "PUT", body: JSON.stringify(body) }, true),
  adminSaveDestination: (id: string | null, body: Record<string, unknown>) =>
    request<unknown>(id ? `/voyage/admin/destinations/${encodeURIComponent(id)}` : "/voyage/admin/destinations", { method: id ? "PATCH" : "POST", body: JSON.stringify(body) }, true),
  adminDeleteDestination: (id: string) => request<unknown>(`/voyage/admin/destinations/${encodeURIComponent(id)}`, { method: "DELETE" }, true),
  adminSavePlace: (id: string | null, body: Record<string, unknown>) =>
    request<unknown>(id ? `/voyage/admin/places/${encodeURIComponent(id)}` : "/voyage/admin/places", { method: id ? "PATCH" : "POST", body: JSON.stringify(body) }, true),
  adminDeletePlace: (id: string) => request<unknown>(`/voyage/admin/places/${encodeURIComponent(id)}`, { method: "DELETE" }, true),
  adminSaveCircuit: (id: string | null, body: Record<string, unknown>) =>
    request<unknown>(id ? `/voyage/admin/circuits/${encodeURIComponent(id)}` : "/voyage/admin/circuits", { method: id ? "PATCH" : "POST", body: JSON.stringify(body) }, true),
  adminDeleteCircuit: (id: string) => request<unknown>(`/voyage/admin/circuits/${encodeURIComponent(id)}`, { method: "DELETE" }, true),
  adminSaveEvent: (id: string | null, body: Record<string, unknown>) =>
    request<unknown>(id ? `/voyage/admin/events/${encodeURIComponent(id)}` : "/voyage/admin/events", { method: id ? "PATCH" : "POST", body: JSON.stringify(body) }, true),
  adminDeleteEvent: (id: string) => request<unknown>(`/voyage/admin/events/${encodeURIComponent(id)}`, { method: "DELETE" }, true),
  adminStaysOverview: () => request<AdminStaysOverview>("/stays/admin/overview", {}, true),
  adminHideReview: (id: string, hidden: boolean) =>
    request<unknown>(`/stays/admin/reviews/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ hidden }) }, true),
  adminStayCommission: (commissionPct: number) =>
    request<{ commissionPct: number }>("/stays/admin/commission", { method: "PUT", body: JSON.stringify({ commissionPct }) }, true),
};

type Tr = Record<string, Record<string, string>> | null;
export interface AdminPlace {
  id: string; slug: string; destinationId: string; category: string; name: string; summary: string; description: string;
  tips: string | null; address: string | null; openingHours: string | null; priceInfo: string | null; bestPeriod: string | null;
  website: string | null; latitude: number | null; longitude: number | null; visitMinutes: number | null;
  cover: string | null; coverUrl: string | null; coverCredit: string | null; position: number; published: boolean; reviewed: boolean; translations: Tr;
}
export interface AdminDestination {
  id: string; slug: string; country: string; name: string; region: string | null; summary: string; description: string;
  latitude: number | null; longitude: number | null; cover: string | null; coverUrl: string | null; coverCredit: string | null;
  position: number; published: boolean; reviewed: boolean; translations: Tr; places: AdminPlace[];
}
export interface AdminCircuit {
  id: string; slug: string; country: string; title: string; summary: string; days: number; cover: string | null; coverUrl: string | null;
  coverCredit: string | null; position: number; published: boolean; reviewed: boolean; translations: Tr;
  steps: Array<{ id: string; day: number; position: number; placeId: string | null; destinationId: string | null; note: string | null; translations: Tr }>;
}
export interface AdminGuide {
  country: string; intro: string; sections: Array<{ title: string; body: string }>; translations: Record<string, { intro?: string; sections?: Array<{ title: string; body: string }> }> | null;
  published: boolean; reviewed: boolean; updatedAt: string;
}
export interface AdminEvent {
  id: string; slug: string; country: string; kind: VoyageEventKind; publicHoliday: boolean; name: string; summary: string; description: string;
  tips: string | null; where: string | null; dateNote: string | null; rule: VoyageEventRule; destinationId: string | null; placeId: string | null;
  caution: boolean; cover: string | null; coverUrl: string | null; coverCredit: string | null; sources: string[] | null; position: number;
  published: boolean; reviewed: boolean; translations: Tr; next: VoyageEventOccurrence | null;
}
export interface AdminVoyageContent { guides: AdminGuide[]; destinations: AdminDestination[]; circuits: AdminCircuit[]; events: AdminEvent[] }
export interface AdminStaysOverview {
  enabledProperties: number;
  byStatus: Array<{ status: BookingStatus; count: number; total: number }>;
  upcoming: Array<Pick<Booking, "id" | "reference" | "status" | "checkIn" | "checkOut" | "total" | "currency"> & { property: { id: string; title: string; city: string; currency: string }; guest: { firstName: string; lastName: string; email: string } }>;
  reviews: Array<{ id: string; rating: number; comment: string; hidden: boolean; createdAt: string; property: { id: string; title: string }; author: { firstName: string; lastName: string } }>;
  commissionPct: number;
}
