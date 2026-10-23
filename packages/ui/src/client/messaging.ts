import type { Conversation, ConversationUser } from "@hwe/types";

/**
 * Interlocuteur d'une conversation pour l'utilisateur courant (F19) :
 * si je suis le propriétaire du bien, c'est `otherUser`, sinon `owner`.
 */
export function otherParty(c: Conversation, meId: string | undefined): ConversationUser | undefined {
  return landlordSide(c, meId) ? c.otherUser : c.owner;
}

/** Suis-je « côté bailleur » (propriétaire, ou pro mandataire du bien) ? */
export function landlordSide(c: Conversation, meId: string | undefined): boolean {
  return c.side ? c.side === "LANDLORD" : c.ownerId === meId;
}

/** Rôle de l'interlocuteur dans la conversation. */
export function partnerRole(c: Conversation, meId: string | undefined): "owner" | "contact" {
  return landlordSide(c, meId) ? "contact" : "owner";
}

export function partnerName(p: ConversationUser | undefined, anonymous: string): string {
  const n = `${p?.firstName ?? ""} ${p?.lastName ?? ""}`.trim();
  return n || p?.email || anonymous;
}
