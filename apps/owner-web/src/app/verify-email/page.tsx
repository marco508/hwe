"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Card, CardBody, AnimatedBackground } from "@hwe/ui";
import { api } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import { t } from "../../lib/i18n";

function VerifyContent() {
  const token = useSearchParams().get("token") || "";
  const { refresh } = useAuth();
  const [state, setState] = React.useState<"pending" | "ok" | "error">("pending");

  React.useEffect(() => {
    if (!token) {
      setState("error");
      return;
    }
    api
      .verifyEmail(token)
      .then(() => {
        setState("ok");
        refresh().catch(() => {});
      })
      .catch(() => setState("error"));
  }, [token, refresh]);

  if (state === "pending") {
    return <p className="text-sm text-muted-foreground text-center">{t("verify.pending")}</p>;
  }
  if (state === "ok") {
    return (
      <div className="text-center">
        <h1 className="font-display text-2xl mb-2">{t("verify.okTitle")}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {t("verify.okSub")}
        </p>
        <Link href="/dashboard">
          <Button className="w-full">{t("verify.okCta")}</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="text-center">
      <h1 className="font-display text-2xl mb-2">{t("verify.errTitle")}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {t("verify.errSub")}
      </p>
      <Link href="/dashboard">
        <Button variant="secondary" className="w-full">{t("verify.errCta")}</Button>
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <AnimatedBackground variant="aurora" className="min-h-[70vh] flex items-center justify-center -mx-6 px-6 py-12">
      <div className="max-w-md w-full">
        <Card>
          <CardBody>
            <React.Suspense fallback={<p className="text-sm text-muted-foreground">{t("common.loading")}</p>}>
              <VerifyContent />
            </React.Suspense>
          </CardBody>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
