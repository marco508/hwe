import type {
  Inquiry,
  Favorite,
  LeaseContract,
  Inspection,
  InspectionType,
  Ticket,
  LeaseAmendment,
  InsuranceSummary,
  LeaseCoTenant,
  Visit,
  ChargeRegularization,
  RentPeriod,
  RentStatus,
  AgencyPublic,
  Property,
} from "@hwe/types";

import { commonApi, request as coreRequest, tokenStore } from "@hwe/ui";

/** Appel API (cœur partagé @hwe/ui : erreurs JSON, 401 → reconnexion, 403 e-mail…). */
function request<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  return coreRequest<T>(path, { ...init, auth });
}

export { tokenStore };

// ── Loyers ──────────────────────────────────────────────────────────────
export type { RentPeriod, RentStatus };

export interface OwnerPaymentMethod {
  id: string;
  label: string;
  value: string;
  holder: string | null;
  instructions: string | null;
}

export interface TenantRentBundle {
  lease: {
    id: string;
    monthlyRent: number;
    charges: number;
    /** Devise du bail (contrat §9). */
    currency?: string | null;
    shortStay?: boolean | null;
    stayTotal?: number | null;
    startDate?: string;
    endDate?: string | null;
    rentPaymentDay: number;
    status: string;
    property: { id: string; title: string; addressLine: string; city: string };
  };
  paymentMethods: OwnerPaymentMethod[];
  /** AGENCY : loyers encaissés par l'agence mandataire (moyens = IBAN de l'agence). */
  payee?: "OWNER" | "AGENCY";
  periods: RentPeriod[];
}

export const api = {
  ...commonApi,

  /** Page publique d'une agence : profil + biens publiés sous mandat actif. */
  getAgency: (slug: string) =>
    request<AgencyPublic & { properties: Property[] }>(`/agencies/${encodeURIComponent(slug)}`),

  sendInquiry: (body: {
    propertyId: string;
    message: string;
    contactEmail: string;
    contactPhone?: string;
    shareDossier?: boolean;
    desiredStartDate?: string;
    leaseDuration?: number;
    leaseDurationUnit?: "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
  }) =>
    request<Inquiry>("/inquiries", {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  inquiriesSent: () => request<Inquiry[]>("/inquiries/sent", {}, true),
  cancelInquiry: (id: string) =>
    request<Inquiry>(`/inquiries/${id}`, { method: "DELETE" }, true),

  // Favorites
  favoriteIds: () =>
    request<{ ids: string[] }>("/favorites/ids", {}, true),
  listFavorites: () =>
    request<Favorite[]>("/favorites", {}, true),
  addFavorite: (propertyId: string) =>
    request<Favorite>(`/favorites/${propertyId}`, { method: "POST" }, true),
  removeFavorite: (propertyId: string) =>
    request<{ ok: true }>(`/favorites/${propertyId}`, { method: "DELETE" }, true),


  // Baux du locataire connecté
  myLeases: () => request<LeaseContract[]>("/leases/my", {}, true),
  signLease: (leaseId: string) =>
    request<LeaseContract>(`/leases/${leaseId}/sign`, { method: "POST" }, true),

  // ── Visites ──
  requestVisit: (body: { propertyId: string; proposedAt: string; note?: string }) =>
    request<Visit>("/visits", { method: "POST", body: JSON.stringify(body) }, true),
  myVisits: () => request<Visit[]>("/visits/my", {}, true),
  cancelVisit: (id: string) =>
    request<Visit>(`/visits/${id}/cancel`, { method: "PATCH" }, true),

  // ── Préavis ──
  giveNotice: (leaseId: string, body: { desiredDate?: string; note?: string }) =>
    request<LeaseContract>(`/leases/${leaseId}/notice`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),

  // ── Avenants ──
  listAmendments: (leaseId: string) =>
    request<LeaseAmendment[]>(`/leases/${leaseId}/amendments`, {}, true),
  signAmendment: (leaseId: string, amendmentId: string) =>
    request<LeaseAmendment>(`/leases/${leaseId}/amendments/${amendmentId}/sign`, { method: "POST" }, true),

  // ── Colocation ──
  signAsCoTenant: (leaseId: string) =>
    request<LeaseCoTenant>(`/leases/${leaseId}/cotenants/sign`, { method: "POST" }, true),

  // ── Assurance habitation ──
  addInsurance: (leaseId: string, body: { fileUrl: string; validUntil: string }) =>
    request<InsuranceSummary>(`/leases/${leaseId}/insurances`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),

  listChargeRegularizations: (leaseId: string) =>
    request<ChargeRegularization[]>(`/leases/${leaseId}/charge-regularizations`, {}, true),

  // ── États des lieux ──
  listInspections: (leaseId: string) =>
    request<Inspection[]>(`/leases/${leaseId}/inspections`, {}, true),
  signInspection: (leaseId: string, type: InspectionType) =>
    request<Inspection>(`/leases/${leaseId}/inspections/${type}/sign`, { method: "POST" }, true),

  // ── Incidents ──
  myTickets: () => request<Ticket[]>("/tickets/my", {}, true),
  createTicket: (
    leaseId: string,
    body: { title: string; description: string; photoDataUrl?: string },
  ) =>
    request<Ticket>(`/leases/${leaseId}/tickets`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),

  // ── Loyers ──
  myRents: () => request<TenantRentBundle[]>("/rents/my", {}, true),
  declareRent: (
    periodId: string,
    body: { method: string; reference: string; proofDataUrl?: string; note?: string },
  ) =>
    request<RentPeriod>(`/rents/${periodId}/declare`, {
      method: "POST",
      body: JSON.stringify(body),
    }, true),
  // Quittances, messagerie, profil, pièces d'identité : voir commonApi.
};

