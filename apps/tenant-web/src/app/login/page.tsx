"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedBackground, Button, Card, CardBody, Input, Label } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";

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
      setError("Identifiants invalides.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatedBackground variant="soft" className="rounded-2xl border border-border/60 px-6 py-7 mb-6 text-center">
        <h1 className="font-display text-3xl mb-1">
          Bon retour sur <span className="gradient-text">hwe</span>
        </h1>
        <p className="text-sm text-ink-muted">
          Retrouvez vos favoris, vos demandes, votre bail et vos loyers.
        </p>
      </AnimatedBackground>
      <Card>
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Mot de passe</Label>
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
              {loading ? "Connexion…" : "Se connecter"}
            </Button>
            <p className="text-sm text-ink-muted text-center">
              Pas de compte ?{" "}
              <Link href="/register" className="font-medium">
                Créer un compte
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
