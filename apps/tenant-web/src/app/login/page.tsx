"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedBackground, Button, Card, CardBody, Input, Label } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { t } from "../../lib/i18n";
import { IlloKeys } from "@hwe/ui";

export default function LoginPage() {
  const router = useRouter();
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
      await login(email, password);
      router.push("/");
    } catch {
      setError(t("login.errCreds"));
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatedBackground variant="soft" className="rounded-2xl border border-border/60 px-6 py-7 mb-6 text-center">
        <IlloKeys className="mx-auto w-40 mb-2" />
        <h1 className="font-display text-3xl mb-1">
          {t("login.title1")} <span className="gradient-text">hwe</span>
        </h1>
        <p className="text-sm text-ink-muted">
          {t("login.sub")}
        </p>
      </AnimatedBackground>
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
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("login.submitting") : t("login.submit")}
            </Button>
            <p className="text-sm text-ink-muted text-center">
              {t("login.noAccount")}{" "}
              <Link href="/register" className="font-medium">
                {t("login.signup")}
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
