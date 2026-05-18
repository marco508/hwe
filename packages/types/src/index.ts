export type Role = "OWNER" | "TENANT" | "ADMIN";

export type ListingType = "SALE" | "RENT";

export type PropertyType =
  | "APARTMENT"
  | "HOUSE"
  | "STUDIO"
  | "LAND"
  | "COMMERCIAL"
  | "OTHER";

export type PropertyStatus = "DRAFT" | "PUBLISHED" | "RENTED" | "SOLD" | "ARCHIVED";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export type IdentityDocumentType =
  | "NATIONAL_ID"
  | "PASSPORT"
  | "DRIVERS_LICENSE"
  | "RESIDENCE_PERMIT"
  | "OTHER";

export const IDENTITY_DOCUMENT_TYPE_LABELS: Record<IdentityDocumentType, string> = {
  NATIONAL_ID: "Carte nationale d'identité",
  PASSPORT: "Passeport",
  DRIVERS_LICENSE: "Permis de conduire",
  RESIDENCE_PERMIT: "Titre de séjour",
  OTHER: "Autre",
};

export interface UserDocument {
  id: string;
  userId: string;
  name: string;
  documentType: IdentityDocumentType;
  fileUrl: string;
  fileSize?: number | null;
  mimeType?: string | null;
  notes?: string | null;
  verifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyMedia {
  id: string;
  url: string;
  alt?: string | null;
  position: number;
}

export type EnergyClass = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type RentalKind = "BARE" | "FURNISHED" | "SEASONAL" | "STUDENT";

export const RENTAL_KIND_LABELS: Record<RentalKind, string> = {
  BARE: "Location nue",
  FURNISHED: "Location meublée",
  SEASONAL: "Location saisonnière",
  STUDENT: "Bail étudiant",
};

export const ENERGY_CLASS_COLORS: Record<EnergyClass, string> = {
  A: "#00a651",
  B: "#5bc049",
  C: "#c8d100",
  D: "#fce200",
  E: "#f8a005",
  F: "#e95e0f",
  G: "#d31f23",
};

export interface Property {
  id: string;
  title: string;
  description: string;
  listingType: ListingType;
  propertyType: PropertyType;
  status: PropertyStatus;
  price: number;
  currency: string;
  surface: number; // m²
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number | null;
  yearBuilt?: number | null;
  furnished: boolean;
  hasParking: boolean;
  hasBalcony: boolean;
  hasGarden: boolean;
  hasElevator: boolean;

  // ── Spécifique VENTE ─────────────────────────────────────────────────
  coOwnershipFees?: number | null;
  propertyTax?: number | null;
  energyClass?: EnergyClass | null;
  notaryFeesRate?: number | null;
  isNew?: boolean;

  // ── Spécifique LOCATION ──────────────────────────────────────────────
  rentalKind?: RentalKind | null;
  chargesIncluded?: boolean | null;
  chargesAmount?: number | null;
  deposit?: number | null;
  noticeMonths?: number | null;
  petsAllowed?: boolean | null;

  // Localisation
  addressLine: string;
  city: string;
  postalCode: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
  // Relations
  ownerId: string;
  owner?: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone">;
  media: PropertyMedia[];
  pricingRates?: PricingRate[];
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";

export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  PENDING: "En attente",
  ACCEPTED: "Acceptée",
  REJECTED: "Refusée",
  CANCELLED: "Annulée",
};

export type LeaseDurationUnit = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

export const LEASE_DURATION_UNIT_LABELS: Record<LeaseDurationUnit, string> = {
  DAYS: "jour(s)",
  WEEKS: "semaine(s)",
  MONTHS: "mois",
  YEARS: "an(s)",
};

export const LEASE_DURATION_UNIT_SINGULAR: Record<LeaseDurationUnit, string> = {
  DAYS: "jour",
  WEEKS: "semaine",
  MONTHS: "mois",
  YEARS: "an",
};

/** Tarif unitaire défini par le propriétaire */
export interface PricingRate {
  id: string;
  propertyId: string;
  unit: LeaseDurationUnit;
  /** Montant pour 1 unité (ex: 45 = 45 €/jour) */
  amount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Calcule le montant total d'une location à partir de la grille tarifaire.
 * Retourne null si l'unité n'est pas dans la grille.
 */
export function computeRentalTotal(
  rates: PricingRate[],
  duration: number,
  unit: LeaseDurationUnit,
): number | null {
  const rate = rates.find((r) => r.unit === unit);
  if (!rate) return null;
  return rate.amount * duration;
}

/**
 * Convertit un montant total en équivalent mensuel (pour le champ monthlyRent du bail).
 */
export function toMonthlyRent(
  total: number,
  duration: number,
  unit: LeaseDurationUnit,
): number {
  // Nombre de mois approximatif selon l'unité
  const months: Record<LeaseDurationUnit, number> = {
    DAYS:   duration / 30,
    WEEKS:  duration / 4.33,
    MONTHS: duration,
    YEARS:  duration * 12,
  };
  const m = months[unit];
  return m > 0 ? Math.round((total / m) * 100) / 100 : total;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  property?: Pick<Property, "id" | "title" | "city" | "price" | "listingType">;
  senderId: string;
  sender?: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone" | "avatarUrl">;
  message: string;
  contactEmail: string;
  contactPhone?: string | null;
  /** Date souhaitée de début de location */
  desiredStartDate?: string | null;
  /** Valeur numérique de la durée souhaitée */
  leaseDuration?: number | null;
  /** Unité de la durée souhaitée */
  leaseDurationUnit?: LeaseDurationUnit | null;
  status: InquiryStatus;
  resolvedAt?: string | null;
  cancelledAt?: string | null;
  leaseId?: string | null;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

// ─── Messagerie ──────────────────────────────────────────────────────────────
export type ConversationUser = Pick<
  User,
  "id" | "firstName" | "lastName" | "email" | "avatarUrl"
>;

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: ConversationUser;
  content: string;
  readAt?: string | null;
  createdAt: string;
}

export interface Conversation {
  id: string;
  propertyId: string;
  inquiryId?: string | null;
  ownerId: string;
  otherUserId: string;
  owner?: ConversationUser;
  otherUser?: ConversationUser;
  lastMessageAt?: string | null;
  messages?: Message[];
  property?: {
    id: string;
    title: string;
    city: string;
    listingType: ListingType;
    price: number;
    currency: string;
    media?: { url: string }[];
  };
  /** Nombre de messages non-lus pour le user courant (rempli côté list). */
  _count?: { messages: number };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyQuery {
  listingType?: ListingType;
  propertyType?: PropertyType;
  country?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
  maxSurface?: number;
  minRooms?: number;
  page?: number;
  pageSize?: number;
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  property?: Property;
  createdAt: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type DocumentType =
  | "TITLE_DEED"
  | "PROPERTY_TAX"
  | "CO_OWNERSHIP_RULES"
  | "DIAGNOSTICS"
  | "INSURANCE"
  | "WORK_PERMIT"
  | "ENERGY_AUDIT"
  | "OTHER";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  TITLE_DEED: "Acte de propriété",
  PROPERTY_TAX: "Taxe foncière",
  CO_OWNERSHIP_RULES: "Règlement de copropriété",
  DIAGNOSTICS: "Diagnostics techniques (DDT)",
  INSURANCE: "Assurance",
  WORK_PERMIT: "Permis de construire / Déclaration travaux",
  ENERGY_AUDIT: "Audit énergétique",
  OTHER: "Autre",
};

export interface PropertyDocument {
  id: string;
  propertyId: string;
  name: string;
  documentType: DocumentType;
  fileUrl: string;
  fileSize?: number | null;
  mimeType?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type LeaseStatus =
  | "DRAFT"
  | "SIGNED"
  | "ACTIVE"
  | "EXPIRED"
  | "TERMINATED";

export const LEASE_STATUS_LABELS: Record<LeaseStatus, string> = {
  DRAFT: "Brouillon",
  SIGNED: "Signé",
  ACTIVE: "En cours",
  EXPIRED: "Expiré",
  TERMINATED: "Résilié",
};

export interface LeaseContract {
  id: string;
  propertyId: string;
  status: LeaseStatus;
  tenantFirstName: string;
  tenantLastName: string;
  tenantEmail: string;
  tenantPhone?: string | null;
  tenantAddress?: string | null;
  monthlyRent: number;
  charges: number;
  deposit: number;
  startDate: string;
  endDate?: string | null;
  noticePeriod: number;
  rentPaymentDay: number;
  furnished: boolean;
  specialClauses?: string | null;
  pdfUrl?: string | null;
  ownerSignedAt?: string | null;
  tenantSignedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  property?: Pick<Property, "id" | "title" | "addressLine" | "city" | "postalCode" | "country" | "surface" | "rooms"> & {
    owner?: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone">;
  };
}
