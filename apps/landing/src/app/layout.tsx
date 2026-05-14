import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "hwe — Gestion immobilière simplifiée",
  description:
    "Trouvez un logement ou gérez vos biens en toute simplicité. hwe connecte locataires et propriétaires.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
