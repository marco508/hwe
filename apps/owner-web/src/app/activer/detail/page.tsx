"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShellParams } from "../../../lib/route-params";
import { AgencyLogo, Button, Card, CardBody, EmptyState, Icon, Input, Label, errorText, toast, useAsync } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";

/** Activation d'un compte propriétaire créé par un professionnel. */
export default function ActivateOwnerPage() {
  const params = useShellParams<{ token: string }>("/activer/:token");
  const token = decodeURIComponent(params?.token ?? "");
  const router = useRouter();
  const { adopt } = useAuth();
  const info = useAsync(() => api.ownerInviteInfo(token), [token], { enabled: !!token });
  const [pw, setPw] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  if (info.error) {
    return (
      <EmptyState
        illustration="inbox"
        title={t("pro.act.invalid")}
        description={t("pro.act.invalidSub")}
        action={
          <Link href="/forgot-password" className="inline-flex items-center h-10 px-4 rounded-full border border-border bg-surface text-sm font-medium text-ink">
            {t("login.forgot")}
          </Link>
        }
      />
    );
  }
  const inv = info.data;
  if (!inv) return <div className="max-w-xl mx-auto h-80 rounded-2xl skeleton" aria-busy="true" />;
  const agencyName = inv.agency?.name ?? inv.properties[0]?.agencyName ?? "";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (pw !== pw2) return setErr(t("pro.act.mismatch"));
    setBusy(true);
    try {
      const r = await api.activateOwner(token, pw);
      await adopt(r.accessToken, r.user);
      toast.success(t("pro.act.done"));
      router.push("/dashboard");
    } catch (e2) {
      setErr(errorText(e2));
      setBusy(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto">
      <div className="text-center mb-6">
        <AgencyLogo name={agencyName || "hwe"} logoUrl={inv.agency?.logoUrl} size="xl" className="mx-auto" />
        <h1 className="font-display text-3xl sm:text-4xl mt-4 [overflow-wrap:anywhere]">
          {t("pro.act.hello", { name: inv.firstName })}
        </h1>
        <p className="text-ink-muted mt-2" data-activation-intro>
          {inv.properties.length === 1
            ? t("pro.act.manages1", { agency: agencyName, title: inv.properties[0]!.title })
            : t("pro.act.managesN", { agency: agencyName, count: inv.properties.length })}
        </p>
      </div>

      {inv.properties.length > 1 && (
        <ul className="mb-4 space-y-2">
          {inv.properties.map((p) => (
            <li key={p.id} className="rounded-xl border border-border bg-surface px-4 py-2 text-sm flex justify-between gap-2">
              <span className="truncate">{p.title}</span>
              <span className="text-ink-muted shrink-0">{p.city}</span>
            </li>
          ))}
        </ul>
      )}

      <Card className="glass-strong">
        <CardBody>
          <form onSubmit={submit} className="space-y-4">
            <p className="text-sm text-ink-muted">{t("pro.act.text")}</p>
            <div>
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input id="email" type="email" value={inv.email} readOnly disabled />
            </div>
            <div>
              <Label htmlFor="password">{t("pro.act.password")}</Label>
              <Input id="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={pw} onChange={(e) => setPw(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password2">{t("pro.act.password2")}</Label>
              <Input id="password2" type="password" autoComplete="new-password" minLength={8} required value={pw2} onChange={(e) => setPw2(e.target.value)} />
            </div>
            {err && (
              <div role="alert" className="rounded-md border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900/40 text-danger dark:text-red-300 text-sm px-3 py-2">
                {err}
              </div>
            )}
            <Button type="submit" variant="gradient" disabled={busy} className="w-full">
              <Icon name="key" size={16} className="me-1.5" /> {busy ? t("pro.processing") : t("pro.act.submit")}
            </Button>
            <p className="text-xs text-ink-muted text-center">{t("pro.act.optional")}</p>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
