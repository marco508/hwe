import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — hwe",
  description: "Éditeur, hébergeur, contact et conditions de responsabilité du site hwe.",
};

export default function MentionsLegalesPage() {
  return <LegalPage doc="legal" />;
}
