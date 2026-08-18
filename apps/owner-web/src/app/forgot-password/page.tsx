"use client";

import * as React from "react";
import Link from "next/link";
import { Button, Card, CardBody, Input, Label, AnimatedBackground } from "@hwe/ui";
import { api } from "../../lib/api";

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
                <h1 className="font-display text-2xl mb-2">Vérifiez votre boîte mail</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Si un compte existe pour cet e-mail, un lien de réinitialisation vient d'y être envoyé.
                  Le lien est valable 30 minutes.
                </p>
                <Link href="/login"><Button className="w-full">Retour à la connexion</Button></Link>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <h1 className="font-display text-2xl mb-1">Mot de passe oublié</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Saisissez votre e-mail : nous vous enverrons un lien pour définir un nouveau mot de passe.
                </p>
                <div className="mb-4">
                  <Label>E-mail</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Envoi…" : "Envoyer le lien"}
                </Button>
                <div className="text-center mt-4">
                  <Link href="/login" className="text-sm text-muted-foreground hover:underline">Retour à la connexion</Link>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
