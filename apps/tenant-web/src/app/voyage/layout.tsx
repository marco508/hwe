import { VoyageTabs } from "../../components/SectionNav";

// Rubrique « Voyage » : onglets communs (sauf page publique de partage).
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VoyageTabs />
      {children}
    </>
  );
}
