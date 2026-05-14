import "./globals.css";
import type { Metadata } from "next";
import { AppNavbar } from "../components/AppNavbar";
import { AuthProvider } from "../lib/auth-context";
import { CurrencyProvider } from "../lib/currency-context";

export const metadata: Metadata = {
  title: "hwe — Trouvez votre logement",
  description: "Achetez ou louez un bien immobilier près de chez vous.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Anti-flash: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <CurrencyProvider>
          <AppNavbar />
          <main className="container-app py-10">{children}</main>
          <footer className="container-app py-10 text-xs text-ink-muted">
            © {new Date().getFullYear()} hwe — Espace locataire / acheteur
          </footer>
        </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
