"use client";

import { useParams } from "next/navigation";
import { MandateDetailView } from "../../../../components/pro/MandateDetailView";

export default function OwnerMandatePage() {
  const params = useParams<{ id: string }>();
  if (!params?.id) return null;
  return <MandateDetailView id={params.id} backHref="/dashboard/mandats" />;
}
