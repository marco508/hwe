"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  AgencyLogo,
  Button,
  Card,
  CardBody,
  EmptyState,
  Icon,
  Input,
  Label,
  errorText,
  isApiError,
  toast,
  useAsync,
} from "@hwe/ui";
import { useAuth } from "../../../../lib/auth-context";
import { api } from "../../../../lib/api";
import { t } from "../../../../lib/i18n";

export default function AgencyInvitationPage() {
  const params = useParams<{ token: string }>();
  const token = decodeURIComponent(params?.token ?? "");
  const router = useRouter();
  const { user, loading: authLoading, register, refresh, logout } = useAuth();
  const info = useAsync(() => api.agencyInviteInfo(token), [token], { enabled: !!token });
  const [form, setForm] = React.useState({ firstName: "", lastName: "", phone: "", password: "" });
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  if (info.error) {
    const code = isApiError(info.error) ? info.error.code : undefined;
    return (
      <EmptyState
        illustration="inbox"
        title={code === "INVITE_USED" ? t("pro.inv.used") : code === "INVITE_EXPIRED" ? t("pro.inv.expired") : t("pro.inv.invalid")}
        description={t("pro.inv.askNew")}
        action={
          <Link href="/login" className="inline-flex items-center h-10 px-4 rounded-full border border-border bg-surface text-sm font-medium text-ink">
            {t("nav.login")}
          </Link>
        }
      />
    );
  }
  const inv = info.data;
  if (!inv || authLoading) return <div className="max-w-xl mx-auto h-80 rounded-2xl skeleton" aria-busy="true" />;

  const accept = async () => {
    setBusy(true);
    try {
      await api.acceptAgencyInvite(token);
      await refresh();
      toast.success(t("pro.inv.joined", { agency: inv.agencyName }));
      router.push("/pro");
    } catch (e) {
      toast.error(e);
      setBusy(false);
    }
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: inv.email,
        phone: form.phone.trim() || undefined,
        password: form.password,
        role: "AGENT",
        agencyInviteToken: token,
      });
      toast.success(t("pro.inv.joined", { agency: inv.agencyName }));
      router.push("/pro");
    } catch (e2) {
      setErr(errorText(e2));
      setBusy(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto">
      <div className="text-center mb-6">
        <AgencyLogo name={inv.agencyName} logoUrl={inv.agencyLogoUrl} size="xl" className="mx-auto" />
        <h1 className="font-display text-3xl sm:text-4xl mt-4 [overflow-wrap:anywhere]">
          {t("pro.inv.title", { agency: inv.agencyName })}
        </h1>
        <p className="text-ink-muted mt-2">
          {t("pro.inv.sub", { role: t(`pro.role.${inv.role}`), email: inv.email })}
        </p>
      </div>

      <Card className="glass-strong">
        <CardBody>
          {user ? (
            user.role === "AGENT" && !user.agency && user.email.toLowerCase() === inv.email.toLowerCase() ? (
              <div className="space-y-4 text-center">
                <p>{t("pro.inv.loggedAs", { name: `${user.firstName} ${user.lastName}` })}</p>
                <Button variant="gradient" disabled={busy} onClick={accept} className="w-full">
                  <Icon name="check" size={16} className="me-1.5" /> {t("pro.inv.accept")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <p role="alert" className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700/60 px-3 py-2">
                  {t("pro.inv.wrongAccount", { email: user.email, invited: inv.email })}
                </p>
                <Button variant="secondary" onClick={() => logout()}>
                  {t("nav.logout")}
                </Button>
              </div>
            )
          ) : (
            <form onSubmit={signup} className="space-y-4">
              <p className="text-sm text-ink-muted">{t("pro.inv.createText")}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">{t("register.firstName")}</Label>
                  <Input id="firstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="lastName">{t("register.lastName")}</Label>
                  <Input id="lastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="email">{t("login.email")}</Label>
                <Input id="email" type="email" value={inv.email} readOnly disabled />
              </div>
              <div>
                <Label htmlFor="phone">{t("register.phone")}</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="password">{t("login.password")}</Label>
                <Input id="password" type="password" autoComplete="new-password" minLength={8} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              {err && (
                <div role="alert" className="rounded-md border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900/40 text-danger dark:text-red-300 text-sm px-3 py-2">
                  {err}
                </div>
              )}
              <Button type="submit" variant="gradient" disabled={busy} className="w-full">
                {busy ? t("register.submitting") : t("pro.inv.join")}
              </Button>
              <p className="text-sm text-ink-muted text-center">
                {t("pro.inv.haveAccount")}{" "}
                <Link href={`/login?next=${encodeURIComponent(`/invitation/agence/${encodeURIComponent(token)}`)}`} className="font-medium">
                  {t("nav.login")}
                </Link>
              </p>
            </form>
          )}
        </CardBody>
      </Card>
    </section>
  );
}
