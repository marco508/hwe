"use client";

import * as React from "react";
import Link from "next/link";
import { Button, Card, CardBody, Input, Label, AnimatedBackground } from "@hwe/ui";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.forgotPassword(email.trim());
    } catch {
      // Anti-énumération : même retour quoi qu'il arrive.
    } finally {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <AnimatedBackground variant="aurora" className="min-h-[70vh] flex items-center justify-center -mx-6 px-6 py-12">
      <div className="max-w-md w-full">
        <Card>
          <CardBody>
            {sent ? (
              <div className="text-center">
                <h1 className="font-display text-2xl mb-2">{t("acc.forgot.sentTitle")}</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("acc.forgot.sentText")}
                </p>
                <Link href="/login"><Button className="w-full">{t("acc.forgot.backToLogin")}</Button></Link>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <h1 className="font-display text-2xl mb-1">{t("acc.forgot.title")}</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("acc.forgot.sub")}
                </p>
                <div className="mb-4">
                  <Label>{t("acc.forgot.email")}</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t("acc.forgot.sending") : t("acc.forgot.submit")}
                </Button>
                <div className="text-center mt-4">
                  <Link href="/login" className="text-sm text-muted-foreground hover:underline">{t("acc.forgot.backToLogin")}</Link>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
