"use client";

import * as React from "react";
import { Button, Card, CardBody, CardHeader, Input, Label } from "@hwe/ui";
import { api } from "../lib/api";
import type { OwnerPaymentMethod } from "../lib/api";

/**
 * Gestion des coordonnées de paiement du propriétaire.
 * Elles sont affichées aux locataires dans « Mes loyers » : le loyer est versé
 * directement au propriétaire (IBAN, mobile money, etc.), jamais via la plateforme.
 */
export function PaymentMethodsManager() {
  const [methods, setMethods] = React.useState<OwnerPaymentMethod[]>([]);
  const [adding, setAdding] = React.useState(false);
  const [form, setForm] = React.useState({ label: "", value: "", holder: "", instructions: "" });
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    api.listPaymentMethods().then(setMethods).catch(() => {});
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const created = await api.addPaymentMethod({
        label: form.label.trim(),
        value: form.value.trim(),
        holder: form.holder.trim() || undefined,
        instructions: form.instructions.trim() || undefined,
      });
      setMethods((prev) => [...prev, created]);
      setForm({ label: "", value: "", holder: "", instructions: "" });
      setAdding(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (m: OwnerPaymentMethod) => {
    const updated = await api.updatePaymentMethod(m.id, {
      label: m.label,
      value: m.value,
      holder: m.holder ?? undefined,
      instructions: m.instructions ?? undefined,
      active: !m.active,
    });
    setMethods((prev) => prev.map((x) => (x.id === m.id ? updated : x)));
  };

  const remove = async (m: OwnerPaymentMethod) => {
    if (!confirm(`Supprimer « ${m.label} » ? Les locataires ne le verront plus.`)) return;
    await api.removePaymentMethod(m.id);
    setMethods((prev) => prev.filter((x) => x.id !== m.id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="font-medium">Coordonnées de paiement des loyers</div>
        <div className="text-sm text-ink-muted">
          Vos locataires paient directement sur ces coordonnées, puis déclarent leur versement.
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        {methods.length === 0 && !adding && (
          <p className="text-sm text-ink-muted">
            Aucune coordonnée renseignée. Ajoutez un IBAN, un numéro mobile money… pour que vos
            locataires sachent comment payer.
          </p>
        )}

        <ul className="space-y-2">
          {methods.map((m) => (
            <li
              key={m.id}
              className={
                "rounded-lg border border-border p-3 flex flex-wrap items-center gap-3 " +
                (m.active ? "" : "opacity-50")
              }
            >
              <div className="min-w-48">
                <p className="text-sm font-semibold text-ink">{m.label}</p>
                <p className="text-sm font-mono text-ink-muted break-all">{m.value}</p>
                {m.holder && <p className="text-xs text-ink-muted">Titulaire : {m.holder}</p>}
                {m.instructions && <p className="text-xs text-ink-muted">{m.instructions}</p>}
              </div>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => toggle(m)}
                  className="text-xs font-medium text-brand-600 dark:text-brand-300 hover:underline"
                >
                  {m.active ? "Masquer" : "Réactiver"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(m)}
                  className="text-xs font-medium text-danger hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>

        {adding ? (
          <form onSubmit={add} className="space-y-3 rounded-lg border border-border p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Libellé *</Label>
                <Input
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="Virement SEPA, Orange Money…"
                  required
                  minLength={2}
                />
              </div>
              <div className="space-y-1">
                <Label>Coordonnée *</Label>
                <Input
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  placeholder="IBAN, numéro…"
                  required
                  minLength={2}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Titulaire (optionnel)</Label>
              <Input
                value={form.holder}
                onChange={(e) => setForm({ ...form, holder: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Consignes (optionnel)</Label>
              <Input
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                placeholder="Ex. : indiquez votre nom et le mois en référence"
              />
            </div>
            {error && <p className="text-sm text-danger">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={busy}>
                {busy ? "Ajout…" : "Ajouter"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setAdding(false)}>
                Annuler
              </Button>
            </div>
          </form>
        ) : (
          <Button type="button" variant="ghost" onClick={() => setAdding(true)}>
            + Ajouter une coordonnée
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
