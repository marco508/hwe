import "./globals.css";
import type { Metadata } from "next";
import { AppNavbar } from "../components/AppNavbar";
import { AuthProvider } from "../lib/auth-context";
import { CurrencyProvider } from "../lib/currency-context";
import { LangProvider } from "../lib/i18n";

export const metadata: Metadata = {
  title: "hwe — Espace propriétaire",
  description: "Gérez vos biens immobiliers à la vente ou à la location.",
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
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <LangProvider>
          <CurrencyProvider>
            {/* Decorative blob (single, static) */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
            >
              <span className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-300/15 dark:bg-brand-800/20 blur-3xl" />
              <span className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-accent-300/12 dark:bg-accent-700/15 blur-3xl" />
            </div>

            <AppNavbar />
            <main className="container-app py-10 flex-1 relative">
              {children}
            </main>
            <footer className="container-app py-10 text-xs text-ink-muted flex items-center justify-between border-t border-border/50">
              <span>
                © {new Date().getFullYear()} hwe — Espace propriétaire
              </span>
              <span className="hidden sm:inline text-ink-subtle">
                Habiter avec élégance ✦
              </span>
            </footer>
          </CurrencyProvider>
          </LangProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
