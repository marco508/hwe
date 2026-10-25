"use client";

import { useShellParams } from "../../../../lib/route-params";
import { MandateDetailView } from "../../../../components/pro/MandateDetailView";

export default function ProMandatePage() {
  const params = useShellParams<{ id: string }>("/pro/mandats/:id");
  if (!params?.id) return null;
  return <MandateDetailView id={params.id} backHref="/pro/mandats" />;
}
