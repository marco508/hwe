import type {
  AuthResponse,
  Property,
  Paginated,
  PropertyQuery,
  Inquiry,
  User,
  PropertyDocument,
  DocumentType,
  LeaseContract,
  LeaseStatus,
  UserDocument,
  IdentityDocumentType,
  Conversation,
  Message,
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
} from "@hwe/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const TOKEN_KEY = "hwe.token";

export const tokenStore = {
  get: () =>
    typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY),
  set: (t: string) => window.localStorage.setItem(TOKEN_KEY, t),
  clear: () => window.localStorage.removeItem(TOKEN_KEY),
};

async function request<T>(
  path: string,
  init: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (auth) {
    const t = tokenStore.get();
    if (t) headers.set("Authorization", `Bearer ${t}`);
  }
  const res = await fetch(`${API_URL}/api${path}`, { ...init, headers });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${txt}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Loyers ──────────────────────────────────────────────────────────────
export type RentStatus = "DUE" | "DECLARED" | "PAID" | "LATE";

export interface OwnerPaymentMethod {
  id: string;
  label: string;
  value: string;
  holder: string | null;
  instructions: string | null;
  active: boolean;
  position: number;
}

export interface OwnerRentPeriod {
  id: string;
  leaseId: string;
  periodYear: number;
  periodMonth: number;
  periodLabel: string;
  dueDate: string;
  amount: number;
  status: RentStatus;
  declaredAt: string | null;
  declaredMethod: string | null;
  declaredRef: string | null;
  proofDataUrl: string | null;
  tenantNote: string | null;
  paidAt: string | null;
  receiptNo: string | null;
  rejectReason: string | null;
  lease: {
    id: string;
    tenantName: string;
    tenantEmail: string;
    property: { id: string; title: string; addressLine: string; city: string };
  };
}

type ListingType = "SALE" | "RENT";
type PropertyType = "APARTMENT" | "HOUSE" | "LAND" | "COMMERCIAL" | "OTHER";
type PropertyStatus = "DRAFT" | "PUBLISHED" | "RENTED" | "SOLD" | "ARCHIVED";

interface MediaInput {
  url: string;
  alt?: string;
  position?: number;
}

interface CreatePropertyBody {
  title: string;
  description: string;
  listingType: ListingType;
  propertyType: PropertyType;
  status?: PropertyStatus;
  price: number;
  currency?: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  yearBuilt?: number;
  furnished?: boolean;
  hasParking?: boolean;
  hasBalcony?: boolean;
  hasGarden?: boolean;
  hasElevator?: boolean;
  addressLine: string;
  city: string;
  postalCode: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  media?: MediaInput[];
}

type UpdatePropertyBody = Partial<CreatePropertyBody>;

export const api = {
  // auth
  register: (body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: "OWNER" | "TENANT";
  }) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  login: (body: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  forgotPassword: (email: string) =>
    request<{ ok: true }>("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
  resetPassword: (token: string, password: string) =>
    request<{ ok: true }>("/auth/reset-password", { method: "POST", body: JSON.stringify({ token, password }) }),
  me: () => request<User>("/auth/me", {}, true),
  verifyEmail: (token: string) =>
    request<{ ok: true }>("/auth/verify-email", { method: "POST", body: JSON.stringify({ token }) }),
  sendVerification: () =>
    request<{ ok: true; alreadyVerified?: boolean }>("/auth/send-verification", { method: "POST" }, true),
  updateMe: (body: Partial<Pick<User, "firstName" | "lastName" | "phone" | "avatarUrl">>) =>
    request<User>("/users/me", { method: "PATCH", body: JSON.stringify(body) }, true),

  // identity documents
  listMyDocuments: () =>
    request<UserDocument[]>("/users/me/documents", {}, true),
  createMyDocument: (body: {
    name: string;
    documentType: IdentityDocumentType;
    fileUrl: string;
    fileSize?: number;
    mimeType?: string;
    notes?: string;
  }) =>
    request<UserDocument>("/users/me/documents", {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  deleteMyDocument: (docId: string) =>
    request<{ ok: true }>(`/users/me/documents/${docId}`, { method: "DELETE" }, true),

  // properties
  listProperties: (q: PropertyQuery = {}) => {
    const search = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") search.set(k, String(v));
    });
    return request<Paginated<Property>>(`/properties?${search.toString()}`);
  },
  getProperty: (id: string) => request<Property>(`/properties/${id}`),
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
  sendInquiry: (body: {
    propertyId: string;
    message: string;
    contactEmail: string;
    contactPhone?: string;
  }) =>
    request<Inquiry>("/inquiries", {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  inquiriesSent: () => request<Inquiry[]>("/inquiries/sent", {}, true),
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
  getLease: (propertyId: string, leaseId: string) =>
    request<LeaseContract>(`/properties/${propertyId}/leases/${leaseId}`, {}, true),
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
    body: { status?: LeaseStatus; pdfUrl?: string; specialClauses?: string; endDate?: string },
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
  listAmendments: (leaseId: string) =>
    request<LeaseAmendment[]>(`/leases/${leaseId}/amendments`, {}, true),
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
  listInsurances: (leaseId: string) =>
    request<InsuranceSummary[]>(`/leases/${leaseId}/insurances`, {}, true),
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
    body: { label: string; value: string; holder?: string; instructions?: string; active?: boolean },
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
  downloadReceipt: async (periodId: string) => {
    const t = tokenStore.get();
    const res = await fetch(`${API_URL}/api/rents/${periodId}/receipt`, {
      headers: t ? { Authorization: `Bearer ${t}` } : undefined,
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const blob = await res.blob();
    const cd = res.headers.get("Content-Disposition") ?? "";
    const name = /filename="([^"]+)"/.exec(cd)?.[1] ?? "quittance.pdf";
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  },

  // ── Messagerie ────────────────────────────────────────────────────────
  listConversations: () =>
    request<Conversation[]>("/conversations", {}, true),
  unreadMessagesCount: () =>
    request<{ count: number }>("/conversations/unread-count", {}, true),
  startConversation: (propertyId: string) =>
    request<Conversation>(
      "/conversations/start",
      { method: "POST", body: JSON.stringify({ propertyId }) },
      true,
    ),
  getConversation: (id: string) =>
    request<Conversation>(`/conversations/${id}`, {}, true),
  sendMessage: (conversationId: string, content: string) =>
    request<Message>(
      `/conversations/${conversationId}/messages`,
      { method: "POST", body: JSON.stringify({ content }) },
      true,
    ),
  markConversationRead: (conversationId: string) =>
    request<{ marked: number }>(
      `/conversations/${conversationId}/read`,
      { method: "POST" },
      true,
    ),
};