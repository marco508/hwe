"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedBackground, Button, Card, CardBody, Input, Label } from "@hwe/ui";
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

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(form);
      router.push("/");
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg.includes("409") ? "Email déjà utilisé." : "Échec de l'inscription.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatedBackground variant="soft" className="rounded-2xl border border-border/60 px-6 py-7 mb-6 text-center">
        <h1 className="font-display text-3xl mb-1">
          Bienvenue sur <span className="gradient-text">hwe</span>
        </h1>
        <p className="text-sm text-ink-muted">
          Contactez les propriétaires, suivez vos demandes, gérez votre location.
        </p>
      </AnimatedBackground>
      <Card>
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" value={form.firstName} onChange={set("firstName")} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" value={form.lastName} onChange={set("lastName")} required />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={set("email")} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={form.phone} onChange={set("phone")} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" value={form.password} onChange={set("password")} minLength={8} required />
            </div>
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Création…" : "Créer mon compte"}
            </Button>
            <p className="text-sm text-ink-muted text-center">
              Déjà inscrit ?{" "}
              <Link href="/login" className="font-medium">Connexion</Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
