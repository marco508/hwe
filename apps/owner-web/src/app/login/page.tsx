"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  AnimatedBackground,
} from "@hwe/ui";
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
      const u = await login(email, password);
      if (u.role !== "OWNER" && u.role !== "ADMIN") {
        setError("Ce compte n'est pas un compte propriétaire.");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Identifiants invalides.");
      setLoading(false);
    }
  };

  return (
    <AnimatedBackground variant="aurora" className="min-h-[70vh] flex items-center justify-center -mx-6 px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-glow" />
            Connexion sécurisée
          </span>
          <h1 className="font-display text-4xl">
            Bon retour, <span className="gradient-text">propriétaire</span>
          </h1>
          <p className="text-ink-muted text-sm mt-2">
            Accédez à votre tableau de bord pour gérer vos biens.
          </p>
        </div>

        <Card className="glass-strong border-brand-200 dark:border-brand-800/50 shadow-card-hover">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                    Mot de passe oublié ?
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
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900/40 text-danger dark:text-red-300 text-sm px-3 py-2">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                variant="gradient"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Connexion…" : "Se connecter"}
              </Button>
              <p className="text-sm text-ink-muted text-center">
                Pas de compte ?{" "}
                <Link href="/register" className="font-medium">
                  Créer un compte propriétaire
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
