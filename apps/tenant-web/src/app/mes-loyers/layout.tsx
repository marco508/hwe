import { HomeTabs } from "../../components/SectionNav";

// Rubrique « Mon logement » : onglets communs, affichés aussi pendant le chargement.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeTabs />
      {children}
    </>
  );
}
