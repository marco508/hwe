"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@hwe/ui";
import { api } from "./api";
import { t } from "./i18n";

/**
 * « Écrire au propriétaire » (ou à l'agence) d'un bien : rouvre la discussion
 * existante si on la retrouve, sinon en démarre une (API /conversations/start,
 * qui renvoie aussi un fil déjà ouvert). Un bien déjà loué n'accepte pas de
 * NOUVEAU fil côté API : message clair dans ce cas.
 */
export function useLandlordChat() {
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);

  const open = React.useCallback(
    async (propertyId: string) => {
      if (busy) return;
      setBusy(true);
      try {
        const list = await api.listConversations().catch(() => []);
        // Fil où je ne suis pas le bailleur, sur ce bien.
        const found = list.find((c) => c.propertyId === propertyId && c.side !== "LANDLORD");
        const convo = found ?? (await api.startConversation(propertyId));
        router.push(`/messages?c=${encodeURIComponent(convo.id)}`);
      } catch {
        toast.error(t("chat.unavailable"));
      } finally {
        setBusy(false);
      }
    },
    [busy, router],
  );

  return { open, busy };
}
