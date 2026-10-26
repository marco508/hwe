import { StepsTabs } from "../../components/SectionNav";

// Rubrique « Mes démarches » : onglets communs, affichés aussi pendant le chargement.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StepsTabs />
      {children}
    </>
  );
}
