"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Icon, Input, Label, toast, tUi, useLoginRedirect, AnimatedBackground } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";

/** Garde de l'espace pro : compte AGENT, rattaché à une agence. */
export default function ProLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  useLoginRedirect(auth, router);

  if (auth.loading || !auth.user) {
    return (
      <div className="space-y-6" aria-busy="true">
        <div className="h-32 rounded-2xl skeleton" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (auth.user.role !== "AGENT") {
    return (
      <div role="alert" className="max-w-lg mx-auto text-center py-16">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300" aria-hidden="true">
          <Icon name="lock" size={28} />
        </div>
        <h1 className="display-serif text-3xl text-ink">{tUi("ui.roleGuard.title")}</h1>
        <p className="text-ink-muted mt-3">{t("pro.guard.text")}</p>
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center h-11 px-6 rounded-full bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950 text-sm font-medium hover:opacity-90"
          >
            {t("pro.guard.toOwner")}
          </Link>
        </div>
      </div>
    );
  }

  if (!auth.user.agency) return <CreateAgency />;

  return <>{children}</>;
}

function CreateAgency() {
  const { user, refresh } = useAuth();
  const [form, setForm] = React.useState({ name: "", email: user?.email ?? "", phone: user?.phone ?? "", city: "" });
  const [busy, setBusy] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.createAgency({
        name: form.name.trim(),
        email: form.email.trim() || undefined,
        phone: form.phone.trim() || undefined,
        city: form.city.trim() || undefined,
      });
      await refresh();
      toast.success(t("pro.agency.created"));
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto">
      <AnimatedBackground variant="aurora" className="rounded-2xl border border-border/60 px-5 sm:px-8 py-8 mb-6">
        <h1 className="display-serif text-3xl sm:text-4xl">
          {t("pro.agency.createTitle1")} <span className="gradient-text">{t("pro.agency.createTitle2")}</span>
        </h1>
        <p className="text-ink-muted mt-2">{t("pro.agency.createSub")}</p>
      </AnimatedBackground>
      <Card>
        <CardBody>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="ag-name">{t("pro.agency.name")}</Label>
              <Input id="ag-name" required minLength={2} maxLength={120} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ag-email">{t("pro.agency.email")}</Label>
                <Input id="ag-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="ag-phone">{t("pro.agency.phone")}</Label>
                <Input id="ag-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <Label htmlFor="ag-city">{t("pro.agency.city")}</Label>
              <Input id="ag-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <Button type="submit" variant="gradient" disabled={busy || form.name.trim().length < 2} className="w-full sm:w-auto">
              {busy ? t("pro.saving") : t("pro.agency.createBtn")}
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
