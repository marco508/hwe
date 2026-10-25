/**
 * Espace Voyage : guides (pays, destinations, lieux, circuits), carnets de
 * voyage, séjours courte durée. Types des réponses de l'API (/voyage,
 * /trips, /stays) partagés par les fronts.
 */

export const PLACE_CATEGORIES = [
  "HISTORY", "CULTURE", "NATURE", "BEACH", "MUSEUM", "MARKET", "RELIGION", "FESTIVAL", "GASTRONOMY", "LEISURE",
] as const;
export type PlaceCategory = (typeof PLACE_CATEGORIES)[number];

/** Pays proposés dans l'espace Voyage (Afrique de l'Ouest d'abord) ; les autres s'ajoutent dans l'admin. */
export const VOYAGE_COUNTRIES = ["BJ", "TG", "GH", "NG", "CI", "SN", "BF", "NE", "ML", "GN"] as const;
export const VOYAGE_DEFAULT_COUNTRY = "BJ";

export interface VoyageCountrySummary {
  country: string;
  destinations: number;
  places: number;
  hasGuide: boolean;
}

export interface DestinationCard {
  id: string;
  slug: string;
  country: string;
  name: string;
  region: string | null;
  summary: string;
  /** Chemin statique (« /images/voyage/x », décliné en -480/-1200.webp) ou URL absolue. */
  cover: string | null;
  coverCredit?: string | null;
  latitude: number | null;
  longitude: number | null;
  placeCount?: number;
}

export interface PlaceCard {
  id: string;
  slug: string;
  category: PlaceCategory;
  name: string;
  summary: string;
  cover: string | null;
  latitude: number | null;
  longitude: number | null;
  visitMinutes: number | null;
  destination?: { slug: string; name: string; country?: string };
}

export interface PlaceDetail extends PlaceCard {
  description: string;
  tips: string | null;
  address: string | null;
  openingHours: string | null;
  priceInfo: string | null;
  bestPeriod: string | null;
  website: string | null;
  coverCredit: string | null;
  reviewed: boolean;
  destination: DestinationCard;
  nearby: PlaceCard[];
}

export interface CircuitCard {
  id: string;
  slug: string;
  title: string;
  summary: string;
  days: number;
  cover: string | null;
}

export interface CircuitDetail extends CircuitCard {
  country: string;
  coverCredit?: string | null;
  steps: Array<{ id: string; day: number; position: number; note: string | null; destination: DestinationCard | null; place: PlaceCard | null }>;
}

export interface DestinationDetail extends DestinationCard {
  description: string;
  reviewed: boolean;
  places: PlaceCard[];
  circuits: CircuitCard[];
}

export interface CountryVoyage {
  country: string;
  guide: { intro: string; sections: Array<{ title: string; body: string }>; updatedAt: string } | null;
  destinations: DestinationCard[];
  circuits: CircuitCard[];
  featured: PlaceCard[];
  categories: Array<{ category: PlaceCategory; count: number }>;
}

// ─────────────────────────── Carnets ───────────────────────────

export interface TripSummary {
  id: string;
  title: string;
  country: string;
  startDate: string | null;
  endDate: string | null;
  dayCount: number;
  travelers: number;
  notes: string | null;
  shareToken: string | null;
  updatedAt: string;
  itemCount?: number;
}

export interface TripItem {
  id: string;
  tripId: string;
  day: number;
  position: number;
  kind: "PLACE" | "NOTE";
  placeId: string | null;
  title: string | null;
  note: string | null;
  time: string | null;
  done: boolean;
  place: (PlaceCard & { openingHours?: string | null; published?: boolean }) | null;
}

export interface TripStay {
  id: string;
  reference: string;
  status: BookingStatus;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  currency: string;
  property: { id: string; title: string; city: string; media: Array<{ id: string; url: string }> };
}

export interface TripDetail extends TripSummary {
  items: TripItem[];
  stays: TripStay[];
  authorFirstName?: string;
}

// ─────────────────────────── Séjours ───────────────────────────

export type CancellationPolicy = "FLEXIBLE" | "MODERATE" | "STRICT";
export type StayPaymentMode = "ON_ARRIVAL" | "BEFORE_ARRIVAL";
export type BookingStatus = "REQUESTED" | "ACCEPTED" | "CONFIRMED" | "DECLINED" | "EXPIRED" | "CANCELLED" | "COMPLETED";
export type StayRefusal = "DATES_INVALID" | "TOO_SOON" | "TOO_FAR" | "MIN_NIGHTS" | "MAX_NIGHTS" | "MAX_GUESTS" | "UNAVAILABLE";

export interface StayPublicInfo {
  enabled: boolean;
  currency?: string;
  nightly?: number | null;
  weekly?: number | null;
  monthly?: number | null;
  cleaningFee?: number;
  minNights?: number;
  maxNights?: number | null;
  maxGuests?: number;
  minNoticeDays?: number;
  checkInFrom?: string;
  checkOutBefore?: string;
  cancellationPolicy?: CancellationPolicy;
  paymentMode?: StayPaymentMode;
  houseRules?: string | null;
  unavailable?: Array<{ start: string; end: string }>;
  rating?: number | null;
  reviewCount?: number;
}

export interface StayQuote {
  available: boolean;
  refusals: StayRefusal[];
  currency: string;
  nights: number;
  nightlyRate?: number;
  subtotal?: number;
  cleaningFee?: number;
  total?: number;
  discount?: "WEEK" | "MONTH" | null;
}

export interface StaySearchItem {
  id: string;
  title: string;
  city: string;
  country: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  currency: string;
  rentalKind?: string | null;
  media: Array<{ id: string; url: string; alt?: string | null }>;
  nightly: number;
  maxGuests: number;
  minNights: number;
  paymentMode: StayPaymentMode;
  cancellationPolicy: CancellationPolicy;
  rating: number | null;
  reviewCount: number;
  quote: Omit<StayQuote, "available" | "refusals" | "currency"> | null;
}

export interface StaySearchResult {
  items: StaySearchItem[];
  total: number;
  page: number;
  pageSize: number;
  destinationName: string | null;
  nights: number | null;
}

export interface StayPaymentMethod {
  id: string;
  label: string;
  value: string;
  holder: string | null;
  instructions: string | null;
}

export interface StayReview {
  id: string;
  rating: number;
  comment: string;
  reply: string | null;
  repliedAt: string | null;
  createdAt: string;
  author: { firstName: string };
  stayMonth: string;
  nights: number;
  hidden?: boolean;
}

export interface Booking {
  id: string;
  reference: string;
  propertyId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  currency: string;
  nightlyRate: number;
  cleaningFee: number;
  total: number;
  cancellationPolicy: CancellationPolicy;
  paymentMode: StayPaymentMode;
  message: string | null;
  hostNote: string | null;
  status: BookingStatus;
  expiresAt: string | null;
  answeredAt: string | null;
  paymentDeclaredAt: string | null;
  paymentMethod: string | null;
  paymentReference: string | null;
  paidAt: string | null;
  cancelledAt: string | null;
  cancelledBy: "GUEST" | "HOST" | null;
  cancelReason: string | null;
  refundAmount: number | null;
  createdAt: string;
  property: {
    id: string;
    title: string;
    city: string;
    country: string;
    addressLine?: string;
    propertyType: string;
    currency: string;
    media: Array<{ id: string; url: string; alt?: string | null }>;
  };
  arrivalInstructions?: string | null;
  checkInFrom?: string;
  checkOutBefore?: string;
  houseRules?: string | null;
  paymentMethods?: StayPaymentMethod[];
  canReview?: boolean;
  review?: { id: string; rating: number; comment: string; reply: string | null } | null;
  guest?: { firstName: string; lastName: string; email: string; phone?: string | null };
  commissionPct?: number;
  commissionAmount?: number;
  hostPayout?: number;
}

export interface StaySettings {
  propertyId: string;
  enabled: boolean;
  nightlyPrice: number | null;
  cleaningFee: number;
  minNights: number;
  maxNights: number | null;
  maxGuests: number;
  checkInFrom: string;
  checkOutBefore: string;
  cancellationPolicy: CancellationPolicy;
  paymentMode: StayPaymentMode;
  minNoticeDays: number;
  houseRules: string | null;
  arrivalInstructions: string | null;
  icalToken: string;
  icalImportUrl: string | null;
  icalSyncedAt: string | null;
  icalError: string | null;
}

export interface StayBlock {
  id: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  source: "MANUAL" | "ICAL";
  note: string | null;
}

export interface HostStayProperty {
  id: string;
  title: string;
  city: string;
  country: string;
  currency: string;
  status: string;
  rentalKind: string | null;
  media: Array<{ id: string; url: string }>;
  staySettings: { enabled: boolean; maxGuests: number; minNights: number; nightlyPrice: number | null; paymentMode: StayPaymentMode; icalImportUrl: string | null; icalSyncedAt: string | null; icalError: string | null } | null;
  pricingRates: Array<{ unit: string; amount: number }>;
  pendingRequests: number;
}

/** Nuit `day` (AAAA-MM-JJ) prise par une des plages [start, end[ ? */
export function nightTaken(day: string, ranges: Array<{ start: string; end: string }>): boolean {
  return ranges.some((r) => r.start.slice(0, 10) <= day && day < r.end.slice(0, 10));
}

/** Image d'un guide en taille voulue (chemins statiques déclinés en -480/-1200.webp). */
export function voyageImage(cover: string | null | undefined, size: 480 | 1200 = 480): string | null {
  if (!cover) return null;
  return cover.startsWith("/images/voyage/") ? `${cover}-${size}.webp` : cover;
}
