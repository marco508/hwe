"use client";

import * as React from "react";
import Link from "next/link";
import type { AgencyInvite, AgencyMine, Mandate } from "@hwe/types";
import {
  AgencyLogo,
  Badge,
  Button,
  ErrorState,
  Icon,
  IMAGE_ACCEPT,
  Input,
  InviteLinkBox,
  Label,
  Select,
  Textarea,
  compressImage,
  dataUrlBytes,
  fmtDate,
  toast,
  tUi,
  useAsync,
  TENANT_URL,
  fmtBytes,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { invalidatePortfolio } from "../../../lib/pro";
import { ConfirmDialog, KV, MandateTypeBadge, ProHero, SectionCard } from "../../../components/pro/ProUi";

export default function AgencyPage() {
  const { user, refresh } = useAuth();
  const { data, setData, error, loading, reload } = useAsync(() => api.myAgency(), [user?.id]);

  if (error && !data) return <ErrorState error={error} title={t("pro.agency.loadError")} onRetry={reload} />;
  if (loading || !data) return <div className="h-96 rounded-2xl skeleton" aria-busy="true" />;
  const canManage = data.me.canManage;

  const onSaved = async (d: AgencyMine) => {
    setData(d);
    await refresh();
  };

  return (
    <section className="space-y-6">
      <ProHero
        kicker={t(`pro.role.${data.me.role}`)}
        title={data.agency.name}
        sub={
          <span>
            {t("pro.agency.code")} <strong className="font-mono">{data.agency.code}</strong> ·{" "}
            <a className="underline" href={`${TENANT_URL}/agences/${data.agency.slug}`} target="_blank" rel="noopener noreferrer">
              {t("pro.agency.publicPage")}
            </a>
          </span>
        }
        agency={data.agency}
      />
      <ProfileSection mine={data} canManage={canManage} onSaved={onSaved} />
      <TeamSection mine={data} canManage={canManage} onChanged={setData} />
      {canManage && <AssignmentSection members={data.members} />}
    </section>
  );
}

function ProfileSection({ mine, canManage, onSaved }: { mine: AgencyMine; canManage: boolean; onSaved: (d: AgencyMine) => void }) {
  const a = mine.agency;
  const [f, setF] = React.useState({
    name: a.name,
    email: a.email ?? "",
    phone: a.phone ?? "",
    address: a.address ?? "",
    city: a.city ?? "",
    country: a.country ?? "FR",
    registrationNumber: a.registrationNumber ?? "",
    description: a.description ?? "",
    paymentIban: a.paymentIban ?? "",
    paymentHolder: a.paymentHolder ?? "",
  });
  const [logo, setLogo] = React.useState<string | null>(a.logoUrl);
  const [busy, setBusy] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const pickLogo = async (file: File) => {
    try {
      const url = await compressImage(file, { maxSide: 512, quality: 0.9, mime: "image/webp" });
      if (dataUrlBytes(url) > 2 * 1024 * 1024) return toast.error(tUi("ui.err.fileTooBig", { max: fmtBytes(2 * 1024 * 1024) }));
      setLogo(url);
    } catch {
      toast.error(tUi("ui.err.imageRead"));
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const clean = (s: string) => (s.trim() === "" ? null : s.trim());
      const d = await api.updateAgency({
        name: f.name.trim(),
        email: clean(f.email),
        phone: clean(f.phone),
        address: clean(f.address),
        city: clean(f.city),
        country: f.country.trim().toUpperCase() || "FR",
        registrationNumber: clean(f.registrationNumber),
        description: clean(f.description),
        paymentIban: clean(f.paymentIban),
        paymentHolder: clean(f.paymentHolder),
        logoUrl: logo,
      });
      setLogo(d.agency.logoUrl);
      toast.success(t("pro.agency.saved"));
      onSaved(d);
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  if (!canManage) {
    return (
      <SectionCard title={t("pro.agency.profile")} icon="store">
        <KV label={t("pro.agency.email")}>{a.email ?? "—"}</KV>
        <KV label={t("pro.agency.phone")}>{a.phone ?? "—"}</KV>
        <KV label={t("pro.agency.address")}>{[a.address, a.city].filter(Boolean).join(", ") || "—"}</KV>
        <KV label={t("pro.agency.reg")}>{a.registrationNumber ?? "—"}</KV>
        <p className="mt-3 text-xs text-ink-muted">{t("pro.agency.readOnly")}</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title={t("pro.agency.profile")} icon="store">
      <form onSubmit={save} className="space-y-5">
        <div className="flex items-center gap-4 flex-wrap">
          <AgencyLogo name={f.name || a.name} logoUrl={logo} size="xl" />
          <div className="space-y-2">
            <input
              ref={fileRef}
              type="file"
              accept={IMAGE_ACCEPT}
              className="sr-only"
              id="agency-logo"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void pickLogo(file);
                e.target.value = "";
              }}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="secondary" onClick={() => fileRef.current?.click()}>
                <Icon name="image" size={14} className="me-1.5" /> {logo ? t("pro.agency.logoChange") : t("pro.agency.logoAdd")}
              </Button>
              {logo && (
                <Button type="button" size="sm" variant="ghost" onClick={() => setLogo(null)}>
                  {t("pro.agency.logoRemove")}
                </Button>
              )}
            </div>
            <p className="text-xs text-ink-muted">{t("pro.agency.logoHint")}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="ag-n">{t("pro.agency.name")}</Label>
            <Input id="ag-n" required minLength={2} maxLength={120} value={f.name} onChange={set("name")} />
          </div>
          <div>
            <Label htmlFor="ag-e">{t("pro.agency.email")}</Label>
            <Input id="ag-e" type="email" value={f.email} onChange={set("email")} />
          </div>
          <div>
            <Label htmlFor="ag-p">{t("pro.agency.phone")}</Label>
            <Input id="ag-p" value={f.phone} onChange={set("phone")} />
          </div>
          <div>
            <Label htmlFor="ag-a">{t("pro.agency.address")}</Label>
            <Input id="ag-a" value={f.address} onChange={set("address")} />
          </div>
          <div className="grid grid-cols-[1fr_5rem] gap-2">
            <div>
              <Label htmlFor="ag-c">{t("pro.agency.city")}</Label>
              <Input id="ag-c" value={f.city} onChange={set("city")} />
            </div>
            <div>
              <Label htmlFor="ag-co">{t("pro.agency.country")}</Label>
              <Input id="ag-co" maxLength={2} value={f.country} onChange={set("country")} />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="ag-r">{t("pro.agency.reg")}</Label>
            <Input id="ag-r" value={f.registrationNumber} onChange={set("registrationNumber")} placeholder={t("pro.agency.regPh")} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="ag-d">{t("pro.agency.description")}</Label>
            <Textarea id="ag-d" rows={4} maxLength={2000} value={f.description} onChange={set("description")} />
          </div>
        </div>
        <fieldset className="rounded-xl border border-border p-4 space-y-3">
          <legend className="px-2 text-sm font-medium">{t("pro.agency.iban")}</legend>
          <p className="text-xs text-ink-muted">{t("pro.agency.ibanHint")}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ag-iban">IBAN</Label>
              <Input id="ag-iban" value={f.paymentIban} onChange={set("paymentIban")} />
            </div>
            <div>
              <Label htmlFor="ag-holder">{t("pro.agency.holder")}</Label>
              <Input id="ag-holder" value={f.paymentHolder} onChange={set("paymentHolder")} />
            </div>
          </div>
        </fieldset>
        <Button type="submit" variant="gradient" disabled={busy}>
          {busy ? t("pro.saving") : t("pro.save")}
        </Button>
      </form>
    </SectionCard>
  );
}

function TeamSection({ mine, canManage, onChanged }: { mine: AgencyMine; canManage: boolean; onChanged: (d: AgencyMine) => void }) {
  const invites = useAsync<AgencyInvite[]>(() => api.agencyInvites(), [mine.agency.id], { enabled: canManage });
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<"AGENT" | "MANAGER">("AGENT");
  const [busy, setBusy] = React.useState(false);
  const [link, setLink] = React.useState<{ url: string; email: string } | null>(null);
  const [removing, setRemoving] = React.useState<string | null>(null);

  const invite = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await api.inviteAgent(email.trim(), role);
      setLink({ url: r.inviteUrl, email: r.invite.email });
      setEmail("");
      invites.reload();
      toast.success(t("pro.team.invited"));
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };
  const changeRole = async (userId: string, r: "AGENT" | "MANAGER") => {
    try {
      onChanged(await api.setMemberRole(userId, r));
      toast.success(t("pro.team.roleChanged"));
    } catch (err) {
      toast.error(err);
    }
  };
  const remove = async (userId: string) => {
    try {
      onChanged(await api.removeMember(userId));
      invalidatePortfolio();
      toast.success(t("pro.team.removed"));
      setRemoving(null);
    } catch (err) {
      toast.error(err);
    }
  };
  const revoke = async (id: string) => {
    try {
      await api.revokeAgencyInvite(id);
      invites.reload();
      toast.success(t("pro.team.revoked"));
    } catch (err) {
      toast.error(err);
    }
  };
  const target = mine.members.find((m) => m.userId === removing);

  return (
    <SectionCard title={t("pro.team.title")} icon="users" id="equipe">
      <ul className="divide-y divide-border/70" data-team>
        {mine.members.map((m) => (
          <li key={m.userId} className="py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium [overflow-wrap:anywhere]">
                {m.user.firstName} {m.user.lastName}
                {m.userId === mine.me.userId && <span className="ms-2 text-xs text-ink-muted">({t("pro.you")})</span>}
              </p>
              <p className="text-xs text-ink-muted [overflow-wrap:anywhere]">
                {m.user.email} · {t("pro.team.mandates", { count: m.assignedMandates })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {canManage ? (
                <Select
                  aria-label={t("pro.team.role", { name: m.user.firstName })}
                  value={m.role}
                  onChange={(e) => changeRole(m.userId, e.target.value as "AGENT" | "MANAGER")}
                  className="h-9 w-40"
                >
                  <option value="AGENT">{t("pro.role.AGENT")}</option>
                  <option value="MANAGER">{t("pro.role.MANAGER")}</option>
                </Select>
              ) : (
                <Badge tone={m.role === "MANAGER" ? "brand" : "neutral"}>{t(`pro.role.${m.role}`)}</Badge>
              )}
              {canManage && m.userId !== mine.me.userId && (
                <Button size="sm" variant="ghost" onClick={() => setRemoving(m.userId)} aria-label={t("pro.team.removeAria", { name: m.user.firstName })}>
                  <Icon name="trash" size={15} />
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {canManage && (
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <form onSubmit={invite} className="space-y-3">
            <h3 className="font-medium">{t("pro.team.inviteTitle")}</h3>
            <p className="text-sm text-ink-muted">{t("pro.team.inviteText")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_10rem] gap-2">
              <div>
                <Label htmlFor="inv-email">{t("login.email")}</Label>
                <Input id="inv-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="inv-role">{t("pro.team.roleLabel")}</Label>
                <Select id="inv-role" value={role} onChange={(e) => setRole(e.target.value as "AGENT" | "MANAGER")}>
                  <option value="AGENT">{t("pro.role.AGENT")}</option>
                  <option value="MANAGER">{t("pro.role.MANAGER")}</option>
                </Select>
              </div>
            </div>
            <Button type="submit" variant="gradient" disabled={busy || !email.trim()}>
              <Icon name="send" size={15} className="me-1.5" /> {busy ? t("pro.processing") : t("pro.team.inviteBtn")}
            </Button>
          </form>
          <div className="space-y-3 min-w-0">
            {link && (
              <InviteLinkBox
                url={link.url}
                title={t("pro.team.linkFor", { email: link.email })}
                message={t("pro.team.waMessage", { agency: mine.agency.name })}
              />
            )}
            {(invites.data ?? []).length > 0 && (
              <div>
                <h3 className="font-medium mb-2">{t("pro.team.invites")}</h3>
                <ul className="divide-y divide-border/70 text-sm">
                  {invites.data!.map((i) => (
                    <li key={i.id} className="py-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="min-w-0 [overflow-wrap:anywhere]">
                        {i.email} <span className="text-ink-muted">· {t(`pro.role.${i.role}`)}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <Badge tone={i.status === "ACCEPTED" ? "success" : i.status === "PENDING" ? "accent" : "neutral"}>
                          {t(`pro.inviteStatus.${i.status}`)}
                        </Badge>
                        {i.status === "PENDING" && (
                          <>
                            <span className="text-xs text-ink-muted">{t("pro.team.until", { date: fmtDate(i.expiresAt) })}</span>
                            <Button size="sm" variant="ghost" onClick={() => revoke(i.id)}>
                              {t("pro.team.revoke")}
                            </Button>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {target && (
        <ConfirmDialog
          title={t("pro.team.removeTitle")}
          confirmLabel={t("pro.team.removeConfirm")}
          tone="danger"
          onClose={() => setRemoving(null)}
          onConfirm={() => remove(target.userId)}
        >
          <p>{t("pro.team.removeText", { name: `${target.user.firstName} ${target.user.lastName}`, count: target.assignedMandates })}</p>
        </ConfirmDialog>
      )}
    </SectionCard>
  );
}

function AssignmentSection({ members }: { members: AgencyMine["members"] }) {
  const { data, loading, reload, setData } = useAsync<Mandate[]>(() => api.listMandates({ status: "ACTIVE" }), []);
  const assign = async (m: Mandate, agentId: string) => {
    try {
      const u = await api.updateMandate(m.id, { assignedAgentId: agentId || null });
      setData((cur) => cur?.map((x) => (x.id === m.id ? { ...x, ...u } : x)));
      invalidatePortfolio();
      toast.success(t("pro.m.assigned"));
    } catch (e) {
      toast.error(e);
      reload();
    }
  };
  return (
    <SectionCard title={t("pro.assign.title")} icon="idCard">
      <p className="text-sm text-ink-muted mb-3">{t("pro.assign.text")}</p>
      {loading && !data ? (
        <div className="h-24 rounded-xl skeleton" />
      ) : (data ?? []).length === 0 ? (
        <p className="text-sm text-ink-muted">{t("pro.assign.empty")}</p>
      ) : (
        <ul className="divide-y divide-border/70" data-assignments>
          {data!.map((m) => (
            <li key={m.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <Link href={`/pro/mandats/${m.id}`} className="font-medium text-ink hover:underline [overflow-wrap:anywhere]">
                  {m.property.title}
                </Link>
                <p className="text-xs text-ink-muted flex items-center gap-1.5 flex-wrap">
                  <MandateTypeBadge type={m.type} /> <span className="font-mono">{m.reference}</span> · {m.property.city}
                </p>
              </div>
              <Select
                aria-label={t("pro.assign.selectAria", { title: m.property.title })}
                value={m.assignedAgent?.id ?? ""}
                onChange={(e) => assign(m, e.target.value)}
                className="h-9 w-full sm:w-56"
                data-assign={m.property.title}
              >
                <option value="">{t("pro.dash.unassigned")}</option>
                {members.map((x) => (
                  <option key={x.userId} value={x.userId}>
                    {x.user.firstName} {x.user.lastName}
                  </option>
                ))}
              </Select>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
