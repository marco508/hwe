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
  VoyageCountrySummary,
  CountryVoyage,
  CountryEvents,
  VoyageEventDetail,
  DestinationDetail,
  PlaceCard,
  PlaceDetail,
  CircuitDetail,
  TripSummary,
  TripDetail,
  TripItem,
  StayPublicInfo,
  StayQuote,
  StaySearchResult,
  StayReview,
  Booking,
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

  // ── Voyage : guides ──
  voyageCountries: () => request<VoyageCountrySummary[]>("/voyage/countries"),
  voyageCountry: (cc: string) => request<CountryVoyage>(`/voyage/countries/${encodeURIComponent(cc)}`),
  voyageDestination: (slug: string) => request<DestinationDetail>(`/voyage/destinations/${encodeURIComponent(slug)}`),
  voyagePlaces: (q: { country?: string; destination?: string; category?: string; q?: string }) =>
    request<PlaceCard[]>(`/voyage/places?${qs(q)}`),
  voyagePlace: (slug: string) => request<PlaceDetail>(`/voyage/places/${encodeURIComponent(slug)}`),
  voyageCircuit: (slug: string) => request<CircuitDetail>(`/voyage/circuits/${encodeURIComponent(slug)}`),
  voyageEvents: (cc: string, q: { from?: string; to?: string } = {}) =>
    request<CountryEvents>(`/voyage/countries/${encodeURIComponent(cc)}/events?${qs(q)}`),
  voyageEvent: (slug: string) => request<VoyageEventDetail>(`/voyage/events/${encodeURIComponent(slug)}`),

  // ── Voyage : carnets ──
  trips: () => request<TripSummary[]>("/trips", {}, true),
  trip: (id: string) => request<TripDetail>(`/trips/${encodeURIComponent(id)}`, {}, true),
  sharedTrip: (token: string) => request<TripDetail>(`/trips/shared/${encodeURIComponent(token)}`),
  createTrip: (body: { title: string; country: string; startDate?: string | null; endDate?: string | null; dayCount?: number; travelers?: number }) =>
    request<TripSummary>("/trips", { method: "POST", body: JSON.stringify(body) }, true),
  updateTrip: (id: string, body: Partial<{ title: string; country: string; startDate: string | null; endDate: string | null; dayCount: number; travelers: number; notes: string | null }>) =>
    request<TripSummary>(`/trips/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) }, true),
  deleteTrip: (id: string) => request<{ ok: true }>(`/trips/${encodeURIComponent(id)}`, { method: "DELETE" }, true),
  tripFromCircuit: (slug: string, body: { startDate?: string | null; travelers?: number }) =>
    request<TripSummary>(`/trips/from-circuit/${encodeURIComponent(slug)}`, { method: "POST", body: JSON.stringify(body) }, true),
  addTripItem: (id: string, body: { kind?: "PLACE" | "NOTE"; placeId?: string; day?: number; title?: string; note?: string; time?: string }) =>
    request<TripItem>(`/trips/${encodeURIComponent(id)}/items`, { method: "POST", body: JSON.stringify(body) }, true),
  updateTripItem: (id: string, itemId: string, body: Partial<{ day: number; position: number; title: string | null; note: string | null; time: string | null; done: boolean }>) =>
    request<TripItem>(`/trips/${encodeURIComponent(id)}/items/${encodeURIComponent(itemId)}`, { method: "PATCH", body: JSON.stringify(body) }, true),
  removeTripItem: (id: string, itemId: string) =>
    request<{ ok: true }>(`/trips/${encodeURIComponent(id)}/items/${encodeURIComponent(itemId)}`, { method: "DELETE" }, true),
  reorderTrip: (id: string, day: number, ids: string[]) =>
    request<{ ok: true }>(`/trips/${encodeURIComponent(id)}/reorder`, { method: "POST", body: JSON.stringify({ day, ids }) }, true),
  shareTrip: (id: string) => request<{ shareToken: string }>(`/trips/${encodeURIComponent(id)}/share`, { method: "POST" }, true),
  unshareTrip: (id: string) => request<{ ok: true }>(`/trips/${encodeURIComponent(id)}/share`, { method: "DELETE" }, true),

  // ── Voyage : séjours ──
  staySearch: (q: { country?: string; city?: string; destination?: string; checkIn?: string; checkOut?: string; guests?: number; page?: number }) =>
    request<StaySearchResult>(`/stays/search?${qs(q)}`),
  stayInfo: (propertyId: string) => request<StayPublicInfo>(`/stays/property/${encodeURIComponent(propertyId)}`),
  stayQuote: (propertyId: string, q: { checkIn: string; checkOut: string; guests: number }) =>
    request<StayQuote>(`/stays/property/${encodeURIComponent(propertyId)}/quote?${qs(q)}`),
  stayReviews: (propertyId: string) => request<StayReview[]>(`/stays/property/${encodeURIComponent(propertyId)}/reviews`),
  requestBooking: (body: { propertyId: string; checkIn: string; checkOut: string; guests: number; message?: string }) =>
    request<Booking>("/stays/bookings", { method: "POST", body: JSON.stringify(body) }, true),
  myBookings: () => request<Booking[]>("/stays/bookings/my", {}, true),
  cancelBooking: (id: string, reason?: string) =>
    request<Booking>(`/stays/bookings/${encodeURIComponent(id)}/cancel`, { method: "PATCH", body: JSON.stringify({ reason }) }, true),
  declareBookingPayment: (id: string, body: { method: string; reference: string }) =>
    request<Booking>(`/stays/bookings/${encodeURIComponent(id)}/declare-payment`, { method: "PATCH", body: JSON.stringify(body) }, true),
  reviewBooking: (id: string, body: { rating: number; comment: string }) =>
    request<Booking>(`/stays/bookings/${encodeURIComponent(id)}/review`, { method: "POST", body: JSON.stringify(body) }, true),
};

/** Chaîne de requête sans les valeurs vides. */
function qs(q: Record<string, string | number | undefined | null>): string {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) if (v !== undefined && v !== null && v !== "") u.set(k, String(v));
  return u.toString();
}

