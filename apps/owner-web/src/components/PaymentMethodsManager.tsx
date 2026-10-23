"use client";

import * as React from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardHeader, Input, Label, ErrorState, toast, errorText } from "@hwe/ui";
import { api } from "../lib/api";
import { t } from "../lib/i18n";
import type { OwnerPaymentMethod } from "../lib/api";

/**
 * Gestion des coordonnées de paiement du propriétaire.
 * Elles sont affichées aux locataires dans « Mes loyers » : le loyer est versé
 * directement au propriétaire (IBAN, mobile money, etc.), jamais via la plateforme.
 */

/** Devine une icône selon le libellé du moyen de paiement. */
function methodIcon(label: string) {
  const l = label.toLowerCase();
  if (/(iban|virement|sepa|banque|bank)/.test(l)) return "🏦";
  if (/(momo|mobile|orange|mtn|wave|moov|m-pesa)/.test(l)) return "📱";
  if (/(paypal|lydia|revolut|wise|paylib)/.test(l)) return "💳";
  if (/(espèce|especes|cash|liquide)/.test(l)) return "💶";
  if (/(chèque|cheque)/.test(l)) return "🖋️";
  return "💰";
}

export function PaymentMethodsManager() {
  const [methods, setMethods] = React.useState<OwnerPaymentMethod[]>([]);
  const [adding, setAdding] = React.useState(false);
  const [form, setForm] = React.useState({ label: "", value: "", holder: "", instructions: "" });
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loadError, setLoadError] = React.useState<unknown>(null);
  const [tick, setTick] = React.useState(0);
  const uid = React.useId();

  React.useEffect(() => {
    setLoadError(null);
    api.listPaymentMethods().then(setMethods).catch(setLoadError);
  }, [tick]);

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
      toast.success(t("rent.pm.added"));
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  };

  // Contrat §15 : PATCH partiel, on n'envoie que le champ modifié.
  const toggle = async (m: OwnerPaymentMethod) => {
    try {
      const updated = await api.updatePaymentMethod(m.id, { active: !m.active });
      setMethods((prev) => prev.map((x) => (x.id === m.id ? { ...x, ...updated } : x)));
    } catch (err) {
      toast.error(err);
    }
  };

  const remove = async (m: OwnerPaymentMethod) => {
    if (!confirm(t("rent.pm.deleteConfirm", { label: m.label }))) return;
    try {
      await api.removePaymentMethod(m.id);
      setMethods((prev) => prev.filter((x) => x.id !== m.id));
      toast.success(t("rent.pm.deleted"));
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="font-medium">{t("rent.pm.title")}</div>
        <div className="text-sm text-ink-muted">
          {t("rent.pm.desc1")}{" "}
          <Link href="/dashboard/loyers" className="font-medium text-brand-600 dark:text-brand-300 hover:underline">
            {t("rent.pm.descLink")}
          </Link>.
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        {loadError ? (
          <ErrorState compact error={loadError} title={t("rent.pm.loadError")} onRetry={() => setTick((n) => n + 1)} />
        ) : null}
        {!loadError && methods.length === 0 && !adding && (
          <div className="rounded-xl border border-dashed border-border bg-cream-50 dark:bg-white/[0.03] px-4 py-4 text-sm text-ink-muted">
            {t("rent.pm.empty")}
          </div>
        )}

        <ul className="space-y-2.5">
          {methods.map((m) => (
            <li
              key={m.id}
              className={
                "rounded-xl border border-border bg-surface p-4 flex flex-wrap items-start gap-3 transition-opacity " +
                (m.active ? "" : "opacity-50")
              }
            >
              <span className="text-xl mt-0.5" aria-hidden="true">{methodIcon(m.label)}</span>
              <div className="min-w-0 sm:min-w-48 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-ink [overflow-wrap:anywhere]">{m.label}</p>
                  {!m.active && (
                    <span className="text-[11px] rounded-full bg-cream-200 dark:bg-white/10 px-2 py-0.5 text-ink-muted">
                      {t("rent.pm.hidden")}
                    </span>
                  )}
                </div>
                <p className="text-sm font-mono text-ink-muted break-all mt-0.5">{m.value}</p>
                {m.holder && <p className="text-xs text-ink-muted mt-1 [overflow-wrap:anywhere]">{t("rent.pm.holder", { name: m.holder })}</p>}
                {m.instructions && <p className="text-xs text-ink-muted [overflow-wrap:anywhere]">{m.instructions}</p>}
              </div>
              <div className="flex gap-1 flex-wrap">
                <Button size="sm" variant="ghost" type="button" onClick={() => toggle(m)}>
                  {m.active ? t("rent.pm.hide") : t("rent.pm.reactivate")}
                </Button>
                <Button size="sm" variant="ghost" type="button" onClick={() => remove(m)} className="text-danger dark:text-red-300">
                  {t("rent.pm.delete")}
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {adding ? (
          <form onSubmit={add} className="space-y-3 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-900/20 p-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`${uid}-lbl`}>{t("rent.pm.labelField")}</Label>
                <Input
                  id={`${uid}-lbl`}
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder={t("rent.pm.labelPlaceholder")}
                  required
                  minLength={2}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`${uid}-val`}>{t("rent.pm.valueField")}</Label>
                <Input
                  id={`${uid}-val`}
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  placeholder={t("rent.pm.valuePlaceholder")}
                  required
                  minLength={2}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`${uid}-hld`}>{t("rent.pm.holderField")} <span className="font-normal text-ink-subtle">{t("rent.pm.optional")}</span></Label>
                <Input
                  id={`${uid}-hld`}
                  value={form.holder}
                  onChange={(e) => setForm({ ...form, holder: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`${uid}-ins`}>{t("rent.pm.instructionsField")} <span className="font-normal text-ink-subtle">{t("rent.pm.optional")}</span></Label>
                <Input
                  id={`${uid}-ins`}
                  value={form.instructions}
                  onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                  placeholder={t("rent.pm.instructionsPlaceholder")}
                />
              </div>
            </div>
            {error && <p role="alert" className="text-sm text-danger">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={busy}>
                {busy ? t("rent.pm.adding") : t("rent.pm.add")}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setAdding(false)}>
                {t("rent.cancel")}
              </Button>
            </div>
          </form>
        ) : (
          <Button type="button" variant="secondary" onClick={() => setAdding(true)}>
            {t("rent.pm.addBtn")}
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
