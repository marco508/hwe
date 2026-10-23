import type { Conversation, ConversationUser } from "@hwe/types";

/**
 * Interlocuteur d'une conversation pour l'utilisateur courant (F19) :
 * si je suis le propriétaire du bien, c'est `otherUser`, sinon `owner`.
 */
export function otherParty(c: Conversation, meId: string | undefined): ConversationUser | undefined {
  return c.ownerId === meId ? c.otherUser : c.owner;
}

/** Rôle de l'interlocuteur dans la conversation. */
export function partnerRole(c: Conversation, meId: string | undefined): "owner" | "contact" {
  return c.ownerId === meId ? "contact" : "owner";
}

export function partnerName(p: ConversationUser | undefined, anonymous: string): string {
  const n = `${p?.firstName ?? ""} ${p?.lastName ?? ""}`.trim();
  return n || p?.email || anonymous;
}
