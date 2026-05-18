import type {
  AuthResponse,
  Property,
  Paginated,
  PropertyQuery,
  Inquiry,
  User,
  InquiryStatus,
  Favorite,
  LeaseContract,
  UserDocument,
  IdentityDocumentType,
  Conversation,
  Message,
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
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
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
  me: () => request<User>("/auth/me", {}, true),
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

  listProperties: (q: PropertyQuery = {}) => {
    const search = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") search.set(k, String(v));
    });
    return request<Paginated<Property>>(`/properties?${search.toString()}`);
  },
  getProperty: (id: string) => request<Property>(`/properties/${id}`),

  sendInquiry: (body: {
    propertyId: string;
    message: string;
    contactEmail: string;
    contactPhone?: string;
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

  // grille tarifaire (lecture seule côté locataire)
  getPricingRates: (propertyId: string) =>
    request<{ id: string; unit: string; amount: number }[]>(
      `/properties/${propertyId}/pricing`,
    ),

  // Baux du locataire connecté
  myLeases: () => request<LeaseContract[]>("/leases/my", {}, true),
  signLease: (leaseId: string) =>
    request<LeaseContract>(`/leases/${leaseId}/sign`, { method: "POST" }, true),

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

