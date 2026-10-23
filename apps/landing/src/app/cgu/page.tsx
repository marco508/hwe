import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — hwe",
  description: "Règles d'utilisation de la plateforme de mise en relation immobilière hwe.",
};

export default function CguPage() {
  return <LegalPage doc="terms" />;
}
