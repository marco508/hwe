"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessagesView, useLoginRedirect } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { t } from "../../lib/i18n";

// Page strictement dynamique : pas de prerender (auth + useSearchParams).
export const dynamic = "force-dynamic";

export default function MessagesPage() {
  return (
    <React.Suspense fallback={null}>
      <MessagesPageInner />
    </React.Suspense>
  );
}

// Vue partagée @hwe/ui (F19 interlocuteur correct, L4 notifications, erreurs visibles).
function MessagesPageInner() {
  const auth = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  useLoginRedirect(auth, router);
  if (auth.loading || !auth.user) return null;

  return (
    <MessagesView
      activeId={params.get("c")}
      onSelect={(id) => router.push(`/messages${id ? `?c=${encodeURIComponent(id)}` : ""}`)}
      propertyHref={(id) => `/properties/${id}`}
      title1={t("com.msg.title1")}
      title2={t("com.msg.title2")}
      subtitle={t("com.msg.sub")}
      emptyText={t("com.msg.emptyList")}
      tabTitle="hwe"
    />
  );
}
