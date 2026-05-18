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

export default function RegisterPage() {
  const router = useRouter();
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
      await register(form);
      router.push("/dashboard");
    } catch (err) {
      const msg = (err as Error).message;
      setError(
        msg.includes("409")
          ? "Email déjà utilisé."
          : "Échec de la création du compte.",
      );
      setLoading(false);
    }
  };

  return (
    <AnimatedBackground
      variant="aurora"
      className="min-h-[70vh] flex items-center justify-center -mx-6 px-6 py-12"
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse-glow" />
            Compte gratuit
          </span>
          <h1 className="font-display text-4xl mb-1">
            Créer un compte <span className="gradient-text">propriétaire</span>
          </h1>
          <p className="text-ink-muted text-sm">
            Publiez vos biens à la vente ou à la location et gérez les contacts
            entrants.
          </p>
        </div>

        <Card className="glass-strong border-brand-200 dark:border-brand-800/50 shadow-card-hover">
          <CardBody>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={set("firstName")}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={set("lastName")}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" value={form.phone} onChange={set("phone")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  minLength={8}
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
                {loading ? "Création…" : "Créer mon compte"}
              </Button>
              <p className="text-sm text-ink-muted text-center">
                Déjà inscrit ?{" "}
                <Link href="/login" className="font-medium">
                  Connexion
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
