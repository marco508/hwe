"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { tUi, TENANT_URL, useLoginRedirect, Icon } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { t } from "../../lib/i18n";

/**
 * Garde de rôle côté client pour tout /dashboard (F4, A4) — sans middleware :
 * - session en cours de restauration → squelette ;
 * - pas de session → /login?next=<page> ;
 * - compte non propriétaire → « Espace réservé » (jamais de squelette infini) ;
 * - /dashboard/admin réservé aux administrateurs.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useLoginRedirect(auth, router);

  if (auth.loading || !auth.user) {
    return (
      <div className="space-y-6" aria-busy="true">
        <div className="h-32 rounded-2xl skeleton" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 rounded-xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  const role = auth.user.role;
  const adminOnly = pathname?.startsWith("/dashboard/admin");
  const allowed = adminOnly ? role === "ADMIN" : role === "OWNER" || role === "ADMIN";

  if (!allowed) {
    return (
      <div role="alert" className="max-w-lg mx-auto text-center py-16">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300" aria-hidden="true">
          <Icon name="lock" size={28} />
        </div>
        <h1 className="display-serif text-3xl text-ink">{tUi("ui.roleGuard.title")}</h1>
        <p className="text-ink-muted mt-3">{tUi("ui.roleGuard.text")}</p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center h-11 px-6 rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-cream-100 dark:hover:bg-white/5"
          >
            {t("guard.home")}
          </Link>
          {role === "TENANT" && (
            <a
              href={TENANT_URL}
              className="inline-flex items-center h-11 px-6 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90"
            >
              {t("guard.tenantSpace")}
            </a>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
