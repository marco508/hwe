import "./globals.css";
import type { Metadata } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_LANDING_URL || "https://hwe.dkpsolution.tech").replace(/\/+$/, "");
const DESCRIPTION =
  "Trouvez un logement, gérez vos biens ou vendez sans agence. Une plateforme éditoriale qui connecte locataires et propriétaires avec soin.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "hwe — Habiter avec élégance",
  description: DESCRIPTION,
  // U8 : aperçu de lien (WhatsApp, Facebook, LinkedIn…).
  openGraph: {
    type: "website",
    siteName: "hwe",
    title: "hwe — Habiter avec élégance",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "fr_FR",
    alternateLocale: ["en_GB"],
  },
  twitter: { card: "summary", title: "hwe — Habiter avec élégance", description: DESCRIPTION },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Charge uniquement les poids utilisés, italique en 400 seulement */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
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
