"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, CardBody, Input, Label, AnimatedBackground } from "@hwe/ui";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) return setError(t("acc.reset.mismatch"));
    if (password.length < 8) return setError(t("acc.reset.tooShort"));
    setLoading(true);
    try {
      await api.resetPassword(token, password);
      setDone(true);
    } catch {
      setError(t("acc.reset.expired"));
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-sm mb-4">{t("acc.reset.invalidLink")}</p>
        <Link href="/forgot-password"><Button className="w-full">{t("acc.reset.requestNew")}</Button></Link>
      </div>
    );
  }
  if (done) {
    return (
      <div className="text-center">
        <h1 className="font-display text-2xl mb-2">{t("acc.reset.doneTitle")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("acc.reset.doneText")}</p>
        <Button className="w-full" onClick={() => router.push("/login")}>{t("acc.reset.login")}</Button>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <h1 className="font-display text-2xl mb-1">{t("acc.reset.title")}</h1>
      <p className="text-sm text-muted-foreground mb-6">{t("acc.reset.sub")}</p>
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <Label>{t("acc.reset.new")}</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus />
      </div>
      <div className="mb-4">
        <Label>{t("acc.reset.confirm")}</Label>
        <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>{loading ? t("acc.reset.validating") : t("acc.reset.submit")}</Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AnimatedBackground variant="aurora" className="min-h-[70vh] flex items-center justify-center -mx-6 px-6 py-12">
      <div className="max-w-md w-full">
        <Card>
          <CardBody>
            <React.Suspense fallback={<p className="text-sm text-muted-foreground">{t("acc.reset.loading")}</p>}>
              <ResetForm />
            </React.Suspense>
          </CardBody>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
