"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardBody, Input, Label, errorText, isApiError, safeNext, AuthSplit, OWNER_URL } from "@hwe/ui";
import { useAuth, WRONG_ROLE } from "../../lib/auth-context";
import { t } from "../../lib/i18n";

// useSearchParams exige une frontière Suspense au prérendu.
export default function LoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginInner />
    </React.Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  // Retour à la page demandée après connexion (A3) — chemin relatif uniquement.
  const next = safeNext(params.get("next"), "/");
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  // Compte professionnel (agence) : il se connecte dans l'espace pro.
  const [proAccount, setProAccount] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProAccount(false);
    setLoading(true);
    try {
      await login(email, password);
      router.push(next);
    } catch (err) {
      if (isApiError(err) && err.code === WRONG_ROLE) {
        setProAccount(true);
        setLoading(false);
        return;
      }
      // A5 : seul un 401 signifie « identifiants invalides ».
      setError(isApiError(err) && err.status === 401 ? t("login.errCreds") : errorText(err));
      setLoading(false);
    }
  };

  return (
    <AuthSplit
      photo="auth/auth-tenant"
      title={t("vis.auth.loginTitle")}
      points={[
        { icon: "handshake", text: t("vis.auth.p1") },
        { icon: "folder", text: t("vis.auth.p2") },
        { icon: "globe", text: t("vis.auth.p3") },
      ]}
      className="py-2 sm:py-6"
    >
      <div className="mb-6 text-center lg:text-start">
        <h1 className="font-display text-3xl mb-1">
          {t("login.title1")} <span className="gradient-text">hwe</span>
        </h1>
        <p className="text-sm text-ink-muted">
          {t("login.sub")}
        </p>
      </div>
      <Card>
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("login.password")}</Label>
                <Link href="/forgot-password" className="text-xs text-ink-muted hover:underline">
                  {t("login.forgot")}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p role="alert" className="text-sm text-danger [overflow-wrap:anywhere]">{error}</p>}
            {proAccount && (
              <div role="alert" className="rounded-lg border border-brand-200 bg-brand-50/70 dark:border-brand-800 dark:bg-brand-900/25 px-4 py-3 text-sm space-y-2">
                <p className="font-medium text-ink">{t("login.proTitle")}</p>
                <p className="text-ink-muted">{t("login.proText")}</p>
                <a
                  href={`${OWNER_URL}/login`}
                  className="inline-flex items-center h-9 px-4 rounded-full bg-brand-600 text-white hover:text-white hover:bg-brand-700 text-sm font-medium"
                >
                  {t("login.proCta")}
                </a>
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("login.submitting") : t("login.submit")}
            </Button>
            <p className="text-sm text-ink-muted text-center">
              {t("login.noAccount")}{" "}
              <Link href={next !== "/" ? `/register?next=${encodeURIComponent(next)}` : "/register"} className="font-medium">
                {t("login.signup")}
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </AuthSplit>
  );
}
