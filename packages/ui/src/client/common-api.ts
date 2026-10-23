import type {
  AuthResponse,
  Conversation,
  IdentityDocumentType,
  Message,
  Paginated,
  Property,
  PropertyQuery,
  PropertyStats,
  User,
  UserDocument,
} from "@hwe/types";
import { API_URL } from "./config";
import { json, qs, rawRequest, request } from "./http";

/**
 * Appels API communs aux deux espaces (auth, profil, pièces d'identité,
 * biens publics, messagerie, quittances). Chaque app étend cet objet avec
 * ses appels propres dans son `lib/api.ts`.
 */
export const commonApi = {
  // ── Authentification ──
  register: (body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: "OWNER" | "TENANT" | "AGENT";
    agencyName?: string;
    agencyInviteToken?: string;
  }) => request<AuthResponse>("/auth/register", { method: "POST", body: json(body) }),
  login: (body: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", { method: "POST", body: json(body) }),
  forgotPassword: (email: string) =>
    request<{ ok: true }>("/auth/forgot-password", { method: "POST", body: json({ email }) }),
  resetPassword: (token: string, password: string) =>
    request<{ ok: true }>("/auth/reset-password", { method: "POST", body: json({ token, password }) }),
  me: () => request<User>("/auth/me", { auth: true }),
  verifyEmail: (token: string) =>
    request<{ ok: true }>("/auth/verify-email", { method: "POST", body: json({ token }) }),
  sendVerification: () =>
    request<{ ok: true; alreadyVerified?: boolean }>("/auth/send-verification", {
      method: "POST",
      auth: true,
    }),

  // ── Profil ── (avatarUrl: null = suppression de l'avatar)
  updateMe: (body: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatarUrl?: string | null;
  }) => request<User>("/users/me", { method: "PATCH", body: json(body), auth: true }),

  // ── Pièces d'identité ──
  listMyDocuments: () => request<UserDocument[]>("/users/me/documents", { auth: true }),
  createMyDocument: (body: {
    name: string;
    documentType: IdentityDocumentType;
    fileUrl: string;
    fileSize?: number;
    mimeType?: string;
    notes?: string;
  }) => request<UserDocument>("/users/me/documents", { method: "POST", body: json(body), auth: true }),
  deleteMyDocument: (docId: string) =>
    request<{ ok: true }>(`/users/me/documents/${docId}`, { method: "DELETE", auth: true }),

  // ── Biens (public) ──
  listProperties: (q: PropertyQuery & { q?: string } = {}, init: RequestInit = {}) =>
    request<Paginated<Property>>(`/properties${qs(q as Record<string, unknown>)}`, init),
  /** Jeton joint s'il existe : le propriétaire voit aussi ses brouillons. */
  getProperty: (id: string) =>
    request<Property>(`/properties/${encodeURIComponent(id)}`, { optionalAuth: true }),
  propertyStats: () => request<PropertyStats>("/properties/stats"),
  getPricingRates: (propertyId: string) =>
    request<{ id: string; unit: string; amount: number }[]>(`/properties/${propertyId}/pricing`),

  // ── Messagerie ──
  listConversations: () => request<Conversation[]>("/conversations", { auth: true }),
  unreadMessagesCount: () => request<{ count: number }>("/conversations/unread-count", { auth: true }),
  startConversation: (propertyId: string) =>
    request<Conversation>("/conversations/start", {
      method: "POST",
      body: json({ propertyId }),
      auth: true,
    }),
  getConversation: (id: string) => request<Conversation>(`/conversations/${id}`, { auth: true }),
  sendMessage: (conversationId: string, content: string) =>
    request<Message>(`/conversations/${conversationId}/messages`, {
      method: "POST",
      body: json({ content }),
      auth: true,
    }),
  markConversationRead: (conversationId: string) =>
    request<{ marked: number }>(`/conversations/${conversationId}/read`, {
      method: "POST",
      auth: true,
    }),

  // ── Quittance PDF (téléchargement authentifié) ──
  downloadReceipt: async (periodId: string) => {
    const res = await rawRequest(`/rents/${periodId}/receipt`, { auth: true });
    const blob = await res.blob();
    const cd = res.headers.get("Content-Disposition") ?? "";
    const name = /filename="([^"]+)"/.exec(cd)?.[1] ?? "quittance.pdf";
    downloadBlob(blob, name);
  },
};

export type CommonApi = typeof commonApi;

/** Déclenche le téléchargement d'un Blob sous un nom donné. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/** Déclenche le téléchargement d'un texte (contrat .txt…). */
export function downloadText(text: string, filename: string) {
  downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
}

export { API_URL };
