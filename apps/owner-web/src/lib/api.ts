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
} from "@hwe/types";
import { commonApi, request as coreRequest, tokenStore } from "@hwe/ui";

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
    property: { id: string; title: string; addressLine: string; city: string; currency?: string };
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
};