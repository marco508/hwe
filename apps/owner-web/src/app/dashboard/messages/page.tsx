"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MessagesView } from "@hwe/ui";
import { t } from "../../../lib/i18n";

// Page strictement dynamique : session + useSearchParams.
export const dynamic = "force-dynamic";

export default function MessagesPage() {
  return (
    <React.Suspense fallback={null}>
      <MessagesPageInner />
    </React.Suspense>
  );
}

/**
 * Messagerie : vue partagée @hwe/ui (Q1). Interlocuteur correct même si le
 * propriétaire est aussi locataire ailleurs (F19), notifications fiables
 * (L4), erreurs visibles et sondage suspendu onglet masqué (L1, P1).
 * Session/rôle garantis par dashboard/layout.tsx.
 */
function MessagesPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  return (
    <MessagesView
      activeId={params.get("c")}
      onSelect={(id) => router.push(`/dashboard/messages${id ? `?c=${encodeURIComponent(id)}` : ""}`)}
      propertyHref={(id) => `/properties/${id}`}
      title1={t("com.msgTitle1")}
      title2={t("com.msgTitle2")}
      subtitle={t("com.msgSub")}
      emptyAction={
        <Link href="/dashboard/inquiries" className="inline-flex items-center h-9 px-4 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
          {t("vis.seeInquiries")}
        </Link>
      }
      emptyText={t("com.noConversations")}
      tabTitle={t("com.msgTabTitle")}
    />
  );
}
