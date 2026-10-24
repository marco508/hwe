// Polices auto-hébergées (packages/ui/src/fonts) : aucune requête vers Google Fonts.
import "@hwe/ui/fonts.css";
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
  title: "hwe — Espace propriétaire",
  description: "Propriétaires et professionnels : gérez vos biens à la vente ou à la location, vos mandats, baux et loyers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <LangProvider>
          <LocalizedTitle />
          <CurrencyProvider>
            {/* Decorative blob (single, static) */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
            >
              <span className="absolute -top-32 -start-32 w-[500px] h-[500px] rounded-full bg-brand-300/15 dark:bg-brand-800/20 blur-3xl" />
              <span className="absolute bottom-[-200px] end-[-100px] w-[500px] h-[500px] rounded-full bg-accent-300/12 dark:bg-accent-700/15 blur-3xl" />
            </div>

            <AppNavbar />
            {/* w-full + min-w-0 : avec mx-auto dans un flex colonne, la largeur suivrait
                le contenu (mot très long → défilement horizontal sur mobile). */}
            <main className="container-app py-10 flex-1 relative w-full min-w-0">
              {children}
            </main>
            <footer className="container-app w-full py-10 text-xs text-ink-muted flex flex-wrap gap-2 items-center justify-between border-t border-border/50">
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
