"use client";

import { useShellParams } from "../../../../lib/route-params";
import { MandateDetailView } from "../../../../components/pro/MandateDetailView";

export default function OwnerMandatePage() {
  const params = useShellParams<{ id: string }>("/dashboard/mandats/:id");
  if (!params?.id) return null;
  return <MandateDetailView id={params.id} backHref="/dashboard/mandats" />;
}
