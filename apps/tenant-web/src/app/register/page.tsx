"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardBody, Input, Label, errorText, isApiError, safeNext, AuthSplit } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { t } from "../../lib/i18n";

export default function RegisterPage() {
  return (
    <React.Suspense fallback={null}>
      <RegisterInner />
    </React.Suspense>
  );
}

function RegisterInner() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"), "/");
  const { register } = useAuth();
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(form);
      router.push(next);
    } catch (err) {
      setError(
        isApiError(err) && err.status === 409
          ? t("register.errTaken")
          : isApiError(err) && err.status === 400
            ? errorText(err)
            : isApiError(err) && err.retryable
              ? errorText(err)
              : t("register.errFail"),
      );
      setLoading(false);
    }
  };

  return (
    <AuthSplit
      photo="auth/auth-tenant"
      title={t("vis.auth.registerTitle")}
      points={[
        { icon: "handshake", text: t("vis.auth.p1") },
        { icon: "folder", text: t("vis.auth.p2") },
        { icon: "globe", text: t("vis.auth.p3") },
      ]}
      className="py-2 sm:py-6"
    >
      <div className="mb-6 text-center lg:text-start">
        <h1 className="font-display text-3xl mb-1">
          {t("register.title1")} <span className="gradient-text">hwe</span>
        </h1>
        <p className="text-sm text-ink-muted">
          {t("register.sub")}
        </p>
      </div>
      <Card>
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName">{t("register.firstName")}</Label>
                <Input id="firstName" value={form.firstName} onChange={set("firstName")} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">{t("register.lastName")}</Label>
                <Input id="lastName" value={form.lastName} onChange={set("lastName")} required />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input id="email" type="email" value={form.email} onChange={set("email")} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">{t("register.phone")}</Label>
              <Input id="phone" value={form.phone} onChange={set("phone")} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Input id="password" type="password" value={form.password} onChange={set("password")} minLength={8} required />
            </div>
            {error && <p role="alert" className="text-sm text-danger [overflow-wrap:anywhere]">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("register.submitting") : t("register.submit")}
            </Button>
            <p className="text-sm text-ink-muted text-center">
              {t("register.already")}{" "}
              <Link href={next !== "/" ? `/login?next=${encodeURIComponent(next)}` : "/login"} className="font-medium">
                {t("register.login")}
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </AuthSplit>
  );
}
