"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  AuthSplit,
} from "@hwe/ui";
import { useAuth, WRONG_ROLE } from "../../lib/auth-context";
import { errorText, isApiError, safeNext } from "@hwe/ui";
import { t } from "../../lib/i18n";

export default function LoginPage() {
  // useSearchParams exige une frontière Suspense (prérendu).
  return (
    <React.Suspense fallback={null}>
      <LoginInner />
    </React.Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Le rôle est vérifié avant tout stockage du jeton (F4).
      const u = await login(email, password);
      // Un pro arrive sur son tableau de bord (/pro), sauf lien de retour explicite.
      const next = safeNext(params.get("next"), "");
      router.push(u.role === "AGENT" ? (next && next !== "/dashboard" ? next : "/pro") : next || "/dashboard");
    } catch (err) {
      // A5 : message adapté à la cause réelle de l'échec.
      if (isApiError(err) && err.code === WRONG_ROLE) setError(t("login.errRole"));
      else if (isApiError(err) && (err.status === 401 || err.status === 400)) setError(t("login.errCreds"));
      else setError(errorText(err));
      setLoading(false);
    }
  };

  return (
    <AuthSplit
      photo="auth/auth-owner"
      title={t("vis.auth.loginTitle")}
      points={[
        { icon: "sparkles", text: t("vis.auth.p1") },
        { icon: "layers", text: t("vis.auth.p2") },
        { icon: "wallet", text: t("vis.auth.p3") },
      ]}
      className="py-4 sm:py-8"
    >
      <div className="w-full">
        <div className="mb-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-glow" />
            {t("login.badge")}
          </span>
          <h1 className="font-display text-4xl">
            {t("login.title1")} <span className="gradient-text">{t("login.title2")}</span>
          </h1>
          <p className="text-ink-muted text-sm mt-2">
            {t("login.sub")}
          </p>
        </div>

        <Card className="glass-strong border-brand-200 dark:border-brand-800/50 shadow-card-hover">
          <CardBody>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">{t("login.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div role="alert" className="rounded-md border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900/40 text-danger dark:text-red-300 text-sm px-3 py-2">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                variant="gradient"
                disabled={loading}
                className="w-full"
              >
                {loading ? t("login.submitting") : t("login.submit")}
              </Button>
              <p className="text-sm text-ink-muted text-center">
                {t("login.noAccount")}{" "}
                <Link href="/register" className="font-medium">
                  {t("login.createOwner")}
                </Link>
                <span className="block mt-1">
                  <Link href="/register?type=pro" className="font-medium">
                    {t("login.createPro")}
                  </Link>
                </span>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </AuthSplit>
  );
}
