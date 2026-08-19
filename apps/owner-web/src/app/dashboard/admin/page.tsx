"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Input, Select } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";

type Overview = {
  users: Record<string, number>;
  properties: Record<string, number>;
  leases: number;
  ticketsOpen: number;
  inquiries: number;
  usersUnverified: number;
};

type AdminUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  role: string;
  emailVerifiedAt?: string | null;
  createdAt: string;
  _count: { properties: number; inquiries: number };
};

type AdminProperty = {
  id: string;
  title: string;
  city: string;
  status: string;
  listingType: string;
  price: number;
  createdAt: string;
  owner: { id: string; email: string; firstName: string; lastName: string };
  _count: { inquiries: number; leases: number };
};

const PROPERTY_STATUSES = ["DRAFT", "PUBLISHED", "RENTED", "SOLD", "ARCHIVED"] as const;

function statusLabel(code: string) {
  return (PROPERTY_STATUSES as readonly string[]).includes(code)
    ? t("ops.propStatus." + code)
    : code;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR");
}

function StatTile({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-subtle bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-ink-muted mb-1">{label}</p>
      <p className="font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [overview, setOverview] = React.useState<Overview | null>(null);
  const [tab, setTab] = React.useState<"users" | "properties">("users");
  const [q, setQ] = React.useState("");
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [properties, setProperties] = React.useState<AdminProperty[]>([]);

  const isAdmin = user?.role === "ADMIN";

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  const load = React.useCallback(async () => {
    if (!isAdmin) return;
    const [o, u, p] = await Promise.all([
      api.adminOverview(),
      api.adminUsers(q || undefined),
      api.adminProperties(q || undefined),
    ]);
    setOverview(o);
    setUsers(u as unknown as AdminUser[]);
    setProperties(p as unknown as AdminProperty[]);
  }, [isAdmin, q]);

  React.useEffect(() => {
    load().catch(() => {});
  }, [load]);

  if (loading) return <p className="text-ink-muted">{t("ops.loading")}</p>;
  if (user && !isAdmin) {
    return <p className="text-ink-muted">{t("ops.admin.adminsOnly")}</p>;
  }
  if (!overview) return <p className="text-ink-muted">{t("ops.loading")}</p>;

  const totalUsers = Object.values(overview.users).reduce((a, b) => a + b, 0);

  return (
    <section>
      <h1 className="font-display text-3xl mb-6">{t("ops.admin.title")}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <StatTile label={t("ops.admin.statAccounts")} value={totalUsers} />
        <StatTile label={t("ops.admin.statUnverified")} value={overview.usersUnverified} />
        <StatTile
          label={t("ops.admin.statPublished")}
          value={overview.properties.PUBLISHED ?? 0}
        />
        <StatTile label={t("ops.admin.statLeases")} value={overview.leases} />
        <StatTile label={t("ops.admin.statInquiries")} value={overview.inquiries} />
        <StatTile label={t("ops.admin.statOpenTickets")} value={overview.ticketsOpen} />
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("users")}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              tab === "users"
                ? "bg-brand-600 text-white border-brand-600"
                : "border-ink-subtle text-ink-muted"
            }`}
          >
            {t("ops.admin.tabUsers")} ({totalUsers})
          </button>
          <button
            onClick={() => setTab("properties")}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              tab === "properties"
                ? "bg-brand-600 text-white border-brand-600"
                : "border-ink-subtle text-ink-muted"
            }`}
          >
            {t("ops.admin.tabProperties")}
          </button>
        </div>
        <Input
          className="max-w-xs"
          placeholder={t("ops.admin.searchPlaceholder")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {tab === "users" ? (
        <div className="overflow-x-auto rounded-2xl border border-ink-subtle">
          <table className="w-full text-sm">
            <thead className="bg-brand-50/60 dark:bg-brand-900/20 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colAccount")}</th>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colRole")}</th>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colEmailVerified")}</th>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colPropsInquiries")}</th>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colSignedUp")}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-ink-subtle">
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {u.firstName} {u.lastName}
                    </p>
                    <p className="text-ink-muted">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={u.role === "ADMIN" ? "accent" : "neutral"}>{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    {u.emailVerifiedAt ? `✅ ${fmtDate(u.emailVerifiedAt)}` : t("ops.admin.notVerified")}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {u._count.properties} / {u._count.inquiries}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{fmtDate(u.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    {!u.emailVerifiedAt && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={async () => {
                          await api.adminVerifyUserEmail(u.id);
                          load().catch(() => {});
                        }}
                      >
                        {t("ops.admin.verifyEmail")}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink-subtle">
          <table className="w-full text-sm">
            <thead className="bg-brand-50/60 dark:bg-brand-900/20 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colListing")}</th>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colOwner")}</th>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colStatus")}</th>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colInquiriesLeases")}</th>
                <th className="px-4 py-3 font-medium">{t("ops.admin.colCreated")}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-t border-ink-subtle">
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.title}</p>
                    <p className="text-ink-muted">{p.city}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{p.owner.email}</td>
                  <td className="px-4 py-3">
                    <Badge tone={p.status === "PUBLISHED" ? "success" : "neutral"}>
                      {statusLabel(p.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {p._count.inquiries} / {p._count.leases}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{fmtDate(p.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <Select
                      value={p.status}
                      onChange={async (e) => {
                        await api.adminSetPropertyStatus(
                          p.id,
                          e.target.value as (typeof PROPERTY_STATUSES)[number],
                        );
                        load().catch(() => {});
                      }}
                    >
                      {PROPERTY_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {t("ops.propStatus." + s)}
                        </option>
                      ))}
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
