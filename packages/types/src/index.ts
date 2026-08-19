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
  emailVerifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type IdentityDocumentType =
  | "NATIONAL_ID"
  | "PASSPORT"
  | "DRIVERS_LICENSE"
  | "RESIDENCE_PERMIT"
  | "INCOME_PROOF"
  | "EMPLOYMENT_CONTRACT"
  | "TAX_NOTICE"
  | "GUARANTOR_ID"
  | "GUARANTOR_INCOME"
  | "OTHER";

export const IDENTITY_DOCUMENT_TYPE_LABELS: Record<IdentityDocumentType, string> = {
  NATIONAL_ID: "Carte nationale d'identité",
  PASSPORT: "Passeport",
  DRIVERS_LICENSE: "Permis de conduire",
  RESIDENCE_PERMIT: "Titre de séjour",
  INCOME_PROOF: "Justificatif de revenus",
  EMPLOYMENT_CONTRACT: "Contrat de travail",
  TAX_NOTICE: "Avis d'imposition",
  GUARANTOR_ID: "Pièce d'identité du garant",
  GUARANTOR_INCOME: "Revenus du garant",
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
  shareDossier?: boolean;
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
  depositPaidAt?: string | null;
  depositReturnedAt?: string | null;
  depositRetained?: number | null;
  depositNote?: string | null;
  noticeGivenAt?: string | null;
  noticeEffectiveDate?: string | null;
  noticeNote?: string | null;
  ownerNoticeGivenAt?: string | null;
  ownerNoticeEffectiveDate?: string | null;
  ownerNoticeReason?: string | null;
  ownerNoticeNote?: string | null;
  coTenants?: LeaseCoTenant[];
  amendments?: LeaseAmendment[];
  insurances?: InsuranceSummary[];
  createdAt: string;
  updatedAt: string;
  property?: Pick<Property, "id" | "title" | "addressLine" | "city" | "postalCode" | "country" | "surface" | "rooms"> & {
    owner?: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone">;
  };
}

// ── États des lieux ──
export type InspectionType = "ENTRY" | "EXIT";

export interface InspectionItem {
  label: string;
  condition: string;
  note?: string;
}

export interface Inspection {
  id: string;
  leaseId: string;
  type: InspectionType;
  date: string;
  items?: InspectionItem[] | null;
  generalNote?: string | null;
  meterElectricity?: string | null;
  meterWater?: string | null;
  meterGas?: string | null;
  keysCount?: number | null;
  ownerSignedAt?: string | null;
  tenantSignedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ── Incidents (tickets) ──
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export interface Ticket {
  id: string;
  leaseId: string;
  authorId: string;
  title: string;
  description: string;
  photoDataUrl?: string | null;
  status: TicketStatus;
  resolutionNote?: string | null;
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  lease?: {
    id?: string;
    tenantFirstName?: string;
    tenantLastName?: string;
    property?: { id: string; title: string; city?: string };
  };
  author?: { firstName: string; lastName: string; email: string };
}

// ── Avenants, colocation, assurance, visites ──
export interface LeaseAmendment {
  id: string;
  leaseId: string;
  effectiveDate: string;
  newMonthlyRent?: number | null;
  newCharges?: number | null;
  newEndDate?: string | null;
  note?: string | null;
  ownerSignedAt: string;
  tenantSignedAt?: string | null;
  appliedAt?: string | null;
  createdAt: string;
}

export interface LeaseCoTenant {
  id: string;
  leaseId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  signedAt?: string | null;
  createdAt: string;
}

export interface InsuranceSummary {
  id: string;
  validUntil: string;
  uploadedAt: string;
}

export type VisitStatus = "REQUESTED" | "CONFIRMED" | "DECLINED" | "CANCELLED";

export const VISIT_STATUS_LABELS: Record<VisitStatus, string> = {
  REQUESTED: "En attente",
  CONFIRMED: "Confirmée",
  DECLINED: "Non retenue",
  CANCELLED: "Annulée",
};

export interface Visit {
  id: string;
  propertyId: string;
  requesterId: string;
  proposedAt: string;
  status: VisitStatus;
  note?: string | null;
  ownerNote?: string | null;
  createdAt: string;
  updatedAt: string;
  property?: { id: string; title: string; city?: string; addressLine?: string };
  requester?: { firstName: string; lastName: string; email: string; phone?: string | null };
}

export const OWNER_NOTICE_REASON_LABELS: Record<string, string> = {
  SALE: "Mise en vente",
  REPOSSESSION: "Reprise du logement",
  OTHER: "Motif légitime et sérieux",
};

export interface ChargeRegularization {
  id: string;
  leaseId: string;
  periodLabel: string;
  provisionsCollected: number;
  actualCharges: number;
  /// positif = complément dû par le locataire, négatif = à lui rembourser
  balance: number;
  note?: string | null;
  createdAt: string;
}
