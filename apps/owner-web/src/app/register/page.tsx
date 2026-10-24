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
  Icon,
} from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { errorText, isApiError } from "@hwe/ui";
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
  const params = useSearchParams();
  const [kind, setKind] = React.useState<"OWNER" | "AGENT">(params.get("type") === "pro" ? "AGENT" : "OWNER");
  const [agencyName, setAgencyName] = React.useState("");
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

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const pro = kind === "AGENT";
      await register({
        ...form,
        phone: form.phone.trim() || undefined,
        role: kind,
        agencyName: pro && agencyName.trim() ? agencyName.trim() : undefined,
      });
      router.push(pro ? "/pro" : "/dashboard");
    } catch (err) {
      // 409 = adresse déjà utilisée (ou compte créé par un pro) ; sinon message lisible.
      if (isApiError(err) && err.code === "INVITED_ACCOUNT") setError(errorText(err));
      else if (isApiError(err) && err.status === 409) setError(t("register.errTaken"));
      else if (isApiError(err) && err.status === 400 && err.messages.length) setError(errorText(err));
      else if (isApiError(err)) setError(errorText(err));
      else setError(t("register.errFail"));
      setLoading(false);
    }
  };

  return (
    <AuthSplit
      photo="auth/auth-owner"
      title={kind === "AGENT" ? t("register.photoPro") : t("vis.auth.registerTitle")}
      points={
        kind === "AGENT"
          ? [
              { icon: "building", text: t("register.proP1") },
              { icon: "handshake", text: t("register.proP2") },
              { icon: "coins", text: t("register.proP3") },
            ]
          : [
              { icon: "sparkles", text: t("vis.auth.p1") },
              { icon: "layers", text: t("vis.auth.p2") },
              { icon: "wallet", text: t("vis.auth.p3") },
            ]
      }
      className="py-4 sm:py-8"
    >
      <div className="w-full">
        <div className="mb-6 text-center lg:text-start">
          <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse-glow" />
            {kind === "AGENT" ? t("register.badgePro") : t("register.badge")}
          </span>
          <h1 className="font-display text-4xl mb-1">
            {t("register.title1")} <span className="gradient-text">{kind === "AGENT" ? t("register.title2Pro") : t("register.title2")}</span>
          </h1>
          <p className="text-ink-muted text-sm">
            {kind === "AGENT" ? t("register.subPro") : t("register.sub")}
          </p>
        </div>

        <Card className="glass-strong border-brand-200 dark:border-brand-800/50 shadow-card-hover">
          <CardBody>
            <form onSubmit={onSubmit} className="space-y-4">
              <fieldset>
                <legend className="text-sm font-medium mb-2">{t("register.kind")}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup">
                  {(["OWNER", "AGENT"] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      role="radio"
                      aria-checked={kind === k}
                      onClick={() => setKind(k)}
                      className={`text-start rounded-xl border p-3 transition ${
                        kind === k
                          ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/30 dark:bg-brand-900/30"
                          : "border-border bg-surface hover:border-brand-300"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <Icon name={k === "OWNER" ? "home" : "store"} size={16} />
                        {t(k === "OWNER" ? "register.kindOwner" : "register.kindPro")}
                      </span>
                      <span className="block text-xs text-ink-muted mt-0.5">
                        {t(k === "OWNER" ? "register.kindOwnerSub" : "register.kindProSub")}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
              {kind === "AGENT" && (
                <div className="space-y-1">
                  <Label htmlFor="agencyName">{t("register.agencyName")}</Label>
                  <Input id="agencyName" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} minLength={2} maxLength={120} required />
                  <p className="text-xs text-ink-muted">{t("register.agencyNameHint")}</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="firstName">{t("register.firstName")}</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={set("firstName")}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">{t("register.lastName")}</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={set("lastName")}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">{t("login.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">{t("register.phone")}</Label>
                <Input id="phone" value={form.phone} onChange={set("phone")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">{t("login.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={set("password")}
                  minLength={8}
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
                {loading ? t("register.submitting") : t("register.submit")}
              </Button>
              <p className="text-sm text-ink-muted text-center">
                {t("register.already")}{" "}
                <Link href="/login" className="font-medium">
                  {t("nav.login")}
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </AuthSplit>
  );
}
