import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — hwe",
  description: "Données personnelles traitées par hwe, finalités, durées de conservation et droits (RGPD).",
};

export default function ConfidentialitePage() {
  return <LegalPage doc="privacy" />;
}
