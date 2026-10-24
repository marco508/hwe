import "./globals.css";
import { LANG_BOOT_SCRIPT } from "@hwe/types";
import type { Metadata } from "next";
import { AppNavbar } from "../components/AppNavbar";
import { FooterText } from "../components/FooterText";
import { AuthProvider } from "../lib/auth-context";
import { CurrencyProvider } from "../lib/currency-context";
import { LangProvider } from "../lib/i18n";
import { LocalizedTitle } from "../components/LocalizedTitle";
import { AppToaster } from "../components/AppToaster";

export const metadata: Metadata = {
  title: "hwe — Trouvez votre logement",
  description: "Achetez ou louez un bien immobilier près de chez vous.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Polices de la charte (titres Fraunces, texte Inter), comme la landing et l'espace propriétaire. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flash: apply saved theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <LangProvider>
          <LocalizedTitle />
          <CurrencyProvider>
          <AppNavbar />
          <main className="container-app py-10">{children}</main>
          <footer className="container-app py-10 text-xs text-ink-muted">
            <FooterText />
          </footer>
          <AppToaster />
          </CurrencyProvider>
          </LangProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
