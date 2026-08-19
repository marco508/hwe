"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Card, CardBody, AnimatedBackground } from "@hwe/ui";
import { api } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

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
    return <p className="text-sm text-muted-foreground text-center">Vérification…</p>;
  }
  if (state === "ok") {
    return (
      <div className="text-center">
        <h1 className="font-display text-2xl mb-2">Adresse confirmée</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Votre compte est actif : publiez, répondez, gérez vos baux.
        </p>
        <Link href="/dashboard">
          <Button className="w-full">Aller à mes biens</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="text-center">
      <h1 className="font-display text-2xl mb-2">Lien invalide ou expiré</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Redemandez un lien depuis le bandeau de votre espace, puis réessayez.
      </p>
      <Link href="/dashboard">
        <Button variant="secondary" className="w-full">Retour à mon espace</Button>
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
            <React.Suspense fallback={<p className="text-sm text-muted-foreground">Chargement…</p>}>
              <VerifyContent />
            </React.Suspense>
          </CardBody>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
