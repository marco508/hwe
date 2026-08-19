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
    if (password !== confirm) return setError(t("acc.rp.errMismatch"));
    if (password.length < 8) return setError(t("acc.rp.errShort"));
    setLoading(true);
    try {
      await api.resetPassword(token, password);
      setDone(true);
    } catch {
      setError(t("acc.rp.errExpired"));
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-sm mb-4">{t("acc.rp.invalidLink")}</p>
        <Link href="/forgot-password"><Button className="w-full">{t("acc.rp.requestAgain")}</Button></Link>
      </div>
    );
  }
  if (done) {
    return (
      <div className="text-center">
        <h1 className="font-display text-2xl mb-2">{t("acc.rp.doneTitle")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("acc.rp.doneSub")}</p>
        <Button className="w-full" onClick={() => router.push("/login")}>{t("acc.rp.login")}</Button>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <h1 className="font-display text-2xl mb-1">{t("acc.rp.title")}</h1>
      <p className="text-sm text-muted-foreground mb-6">{t("acc.rp.sub")}</p>
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <Label>{t("acc.rp.title")}</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus />
      </div>
      <div className="mb-4">
        <Label>{t("acc.rp.confirmLabel")}</Label>
        <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>{loading ? t("acc.rp.submitting") : t("acc.rp.submit")}</Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AnimatedBackground variant="aurora" className="min-h-[70vh] flex items-center justify-center -mx-6 px-6 py-12">
      <div className="max-w-md w-full">
        <Card>
          <CardBody>
            <React.Suspense fallback={<p className="text-sm text-muted-foreground">{t("acc.loading")}</p>}>
              <ResetForm />
            </React.Suspense>
          </CardBody>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
