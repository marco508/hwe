"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_URL, Badge, Button, ErrorState, Icon, Input, Label, Select, Textarea, isNotFound, toast, useAsync, intlLocale } from "@hwe/ui";
import type { CancellationPolicy, StayPaymentMode, StaySettings } from "@hwe/types";
import { api } from "../../../../lib/api";
import { t } from "../../../../lib/i18n";
import { useShellParams } from "../../../../lib/route-params";
import { Modal } from "../../../../components/Modal";
import { fmtDay, fmtMoney, isoIn } from "../../../../components/stays/StaysKit";

type Form = {
  enabled: boolean;
  nightlyPrice: string;
  cleaningFee: string;
  minNights: string;
  maxNights: string;
  maxGuests: string;
  minNoticeDays: string;
  checkInFrom: string;
  checkOutBefore: string;
  cancellationPolicy: CancellationPolicy;
  paymentMode: StayPaymentMode;
  houseRules: string;
  arrivalInstructions: string;
  icalImportUrl: string;
};

const toForm = (s: StaySettings): Form => ({
  enabled: s.enabled,
  nightlyPrice: s.nightlyPrice != null ? String(s.nightlyPrice) : "",
  cleaningFee: String(s.cleaningFee ?? 0),
  minNights: String(s.minNights),
  maxNights: s.maxNights != null ? String(s.maxNights) : "",
  maxGuests: String(s.maxGuests),
  minNoticeDays: String(s.minNoticeDays),
  checkInFrom: s.checkInFrom,
  checkOutBefore: s.checkOutBefore,
  cancellationPolicy: s.cancellationPolicy,
  paymentMode: s.paymentMode,
  houseRules: s.houseRules ?? "",
  arrivalInstructions: s.arrivalInstructions ?? "",
  icalImportUrl: s.icalImportUrl ?? "",
});

const num = (v: string) => (v.trim() === "" ? null : Number(v.replace(",", ".")));

export default function StaySettingsPage() {
  const params = useShellParams<{ id: string }>("/dashboard/:id/sejour");
  const id = params?.id;
  const { data, setData, error, reload } = useAsync(() => api.staySettings(id!), [id], { enabled: !!id });
  const [form, setForm] = React.useState<Form | null>(null);
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    if (data) setForm(toForm(data.settings));
  }, [data]);

  if (error && isNotFound(error)) notFound();
  if (error && !data) return <ErrorState error={error} onRetry={reload} />;
  if (!data || !form || !id) return <p className="text-ink-muted">{t("com.loading")}</p>;
  const { property, settings, rates } = data;
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  const save = async (patch?: Partial<Form>) => {
    const f = { ...form, ...patch };
    setBusy(true);
    try {
      const saved = await api.saveStaySettings(id, {
        enabled: f.enabled,
        nightlyPrice: num(f.nightlyPrice),
        cleaningFee: num(f.cleaningFee) ?? 0,
        minNights: Number(f.minNights) || 1,
        maxNights: num(f.maxNights),
        maxGuests: Number(f.maxGuests) || 1,
        minNoticeDays: Number(f.minNoticeDays) || 0,
        checkInFrom: f.checkInFrom,
        checkOutBefore: f.checkOutBefore,
        cancellationPolicy: f.cancellationPolicy,
        paymentMode: f.paymentMode,
        houseRules: f.houseRules || null,
        arrivalInstructions: f.arrivalInstructions || null,
        icalImportUrl: f.icalImportUrl.trim() || null,
      });
      setData((d) => (d ? { ...d, settings: saved } : d));
      toast.success(saved.enabled ? t("stays.settings.savedOpen") : t("stays.settings.saved"));
    } catch (e) {
      toast.error(e);
      if (patch?.enabled) set("enabled", false);
    } finally {
      setBusy(false);
    }
  };

  const exportUrl = `${API_URL}/api/stays/ical/${settings.icalToken}.ics`;

  return (
    <section className="space-y-8 min-w-0">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl">{t("stays.settings.title")}</h1>
          <p className="text-ink-muted [overflow-wrap:anywhere]">
            {property.title} · {property.city}
          </p>
        </div>
        <label className="inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 cursor-pointer">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={form.enabled}
            disabled={busy}
            onChange={(e) => {
              set("enabled", e.target.checked);
              void save({ enabled: e.target.checked });
            }}
          />
          <span>
            <span className="block font-semibold">{form.enabled ? t("stays.open") : t("stays.closed")}</span>
            <span className="block text-xs text-ink-muted">{t("stays.settings.toggleHint")}</span>
          </span>
        </label>
      </div>
      {property.rentalKind !== "SEASONAL" && <p className="text-sm rounded-xl bg-accent/10 p-3">{t("stays.settings.notSeasonal")}</p>}
      {property.status !== "PUBLISHED" && <p className="text-sm rounded-xl bg-accent/10 p-3">{t("stays.settings.notPublished")}</p>}

      <form
        className="grid lg:grid-cols-2 gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <fieldset className="rounded-2xl border border-border bg-surface p-5 space-y-4 min-w-0">
          <legend className="font-display text-lg px-1">{t("stays.settings.prices")}</legend>
          <div>
            <Label htmlFor="s-night">{t("stays.settings.nightly", { currency: property.currency })}</Label>
            <Input id="s-night" inputMode="decimal" value={form.nightlyPrice} onChange={(e) => set("nightlyPrice", e.target.value)} placeholder={rates.nightly ? String(rates.nightly) : ""} />
            <p className="text-xs text-ink-muted mt-1">
              {rates.nightly && !form.nightlyPrice ? t("stays.settings.gridUsed", { amount: fmtMoney(rates.nightly, property.currency) }) : t("stays.settings.nightlyHint")}
            </p>
            {(rates.weekly || rates.monthly) && (
              <p className="text-xs text-ink-muted mt-1">
                {t("stays.settings.degressive", {
                  week: rates.weekly ? fmtMoney(rates.weekly, property.currency) : "—",
                  month: rates.monthly ? fmtMoney(rates.monthly, property.currency) : "—",
                })}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="s-clean">{t("stays.settings.cleaning", { currency: property.currency })}</Label>
            <Input id="s-clean" inputMode="decimal" value={form.cleaningFee} onChange={(e) => set("cleaningFee", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="s-pay">{t("stays.settings.payMode")}</Label>
            <Select id="s-pay" value={form.paymentMode} onChange={(e) => set("paymentMode", e.target.value as StayPaymentMode)}>
              <option value="ON_ARRIVAL">{t("stays.payMode.ON_ARRIVAL")}</option>
              <option value="BEFORE_ARRIVAL">{t("stays.payMode.BEFORE_ARRIVAL")}</option>
            </Select>
            <p className="text-xs text-ink-muted mt-1">{t(`stays.settings.payModeHint.${form.paymentMode}`)}</p>
            {form.paymentMode === "BEFORE_ARRIVAL" && (
              <Link href="/profile" className="text-xs text-brand-700 dark:text-brand-300 hover:underline">
                {t("stays.settings.payMethodsLink")}
              </Link>
            )}
          </div>
          <div>
            <Label htmlFor="s-policy">{t("stays.settings.policy")}</Label>
            <Select id="s-policy" value={form.cancellationPolicy} onChange={(e) => set("cancellationPolicy", e.target.value as CancellationPolicy)}>
              {(["FLEXIBLE", "MODERATE", "STRICT"] as const).map((p) => (
                <option key={p} value={p}>
                  {t(`stays.policy.${p}`)}
                </option>
              ))}
            </Select>
            <p className="text-xs text-ink-muted mt-1">{t(`stays.policyLong.${form.cancellationPolicy}`)}</p>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-surface p-5 space-y-4 min-w-0">
          <legend className="font-display text-lg px-1">{t("stays.settings.rules")}</legend>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="s-min">{t("stays.settings.minNights")}</Label>
              <Input id="s-min" type="number" min={1} max={180} value={form.minNights} onChange={(e) => set("minNights", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="s-max">{t("stays.settings.maxNights")}</Label>
              <Input id="s-max" type="number" min={1} max={180} value={form.maxNights} onChange={(e) => set("maxNights", e.target.value)} placeholder="180" />
            </div>
            <div>
              <Label htmlFor="s-guests">{t("stays.settings.maxGuests")}</Label>
              <Input id="s-guests" type="number" min={1} max={50} value={form.maxGuests} onChange={(e) => set("maxGuests", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="s-notice">{t("stays.settings.notice")}</Label>
              <Input id="s-notice" type="number" min={0} max={60} value={form.minNoticeDays} onChange={(e) => set("minNoticeDays", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="s-in">{t("stays.settings.checkIn")}</Label>
              <Input id="s-in" type="time" value={form.checkInFrom} onChange={(e) => set("checkInFrom", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="s-out">{t("stays.settings.checkOut")}</Label>
              <Input id="s-out" type="time" value={form.checkOutBefore} onChange={(e) => set("checkOutBefore", e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="s-rules">{t("stays.settings.houseRules")}</Label>
            <Textarea id="s-rules" rows={3} maxLength={4000} value={form.houseRules} onChange={(e) => set("houseRules", e.target.value)} placeholder={t("stays.settings.houseRulesPh")} />
          </div>
          <div>
            <Label htmlFor="s-arrival">{t("stays.settings.arrival")}</Label>
            <Textarea id="s-arrival" rows={4} maxLength={4000} value={form.arrivalInstructions} onChange={(e) => set("arrivalInstructions", e.target.value)} placeholder={t("stays.settings.arrivalPh")} />
            <p className="text-xs text-ink-muted mt-1">{t("stays.settings.arrivalHint")}</p>
          </div>
        </fieldset>

        <div className="lg:col-span-2 flex justify-end">
          <Button type="submit" disabled={busy}>
            {t("stays.settings.save")}
          </Button>
        </div>
      </form>

      <HostCalendar propertyId={id} />

      <section className="rounded-2xl border border-border bg-surface p-5 space-y-4">
        <h2 className="font-display text-xl">{t("stays.ical.title")}</h2>
        <p className="text-sm text-ink-muted">{t("stays.ical.intro")}</p>
        <div>
          <Label htmlFor="ical-export">{t("stays.ical.export")}</Label>
          <div className="flex gap-2 flex-wrap">
            <Input id="ical-export" readOnly value={exportUrl} className="flex-1 min-w-0 font-mono text-xs" onFocus={(e) => e.currentTarget.select()} />
            <Button type="button" variant="secondary" onClick={() => navigator.clipboard?.writeText(exportUrl).then(() => toast.success(t("stays.ical.copied")), () => {})}>
              {t("stays.ical.copy")}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={async () => {
                if (!confirm(t("stays.ical.regenConfirm"))) return;
                try {
                  const r = await api.regenerateStayIcal(id);
                  setData((d) => (d ? { ...d, settings: { ...d.settings, icalToken: r.icalToken } } : d));
                } catch (e) {
                  toast.error(e);
                }
              }}
            >
              {t("stays.ical.regen")}
            </Button>
          </div>
          <p className="text-xs text-ink-muted mt-1">{t("stays.ical.exportHint")}</p>
        </div>
        <div>
          <Label htmlFor="ical-import">{t("stays.ical.import")}</Label>
          <div className="flex gap-2 flex-wrap">
            <Input id="ical-import" value={form.icalImportUrl} onChange={(e) => set("icalImportUrl", e.target.value)} placeholder="https://www.airbnb.fr/calendar/ical/….ics" className="flex-1 min-w-0" />
            <Button type="button" variant="secondary" disabled={busy} onClick={() => save()}>
              {t("com.save")}
            </Button>
            {settings.icalImportUrl && (
              <Button
                type="button"
                variant="ghost"
                onClick={async () => {
                  try {
                    const r = await api.syncStayIcal(id);
                    if (r.ok) toast.success(t("stays.ical.synced", { count: r.blocks }));
                    else toast.error(t(`stays.ical.err.${r.error ?? "ICAL_FETCH_FAILED"}`));
                    void reload();
                  } catch (e) {
                    toast.error(e);
                  }
                }}
              >
                {t("stays.ical.syncNow")}
              </Button>
            )}
          </div>
          <p className="text-xs text-ink-muted mt-1">
            {settings.icalError
              ? <span className="text-danger">{t(`stays.ical.err.${settings.icalError}`)}</span>
              : settings.icalSyncedAt
                ? t("stays.ical.lastSync", { date: new Date(settings.icalSyncedAt).toLocaleString(intlLocale()) })
                : t("stays.ical.importHint")}
          </p>
        </div>
      </section>
    </section>
  );
}

// ─────────────────────────── Calendrier de l'hôte ───────────────────────────

function HostCalendar({ propertyId }: { propertyId: string }) {
  const [offset, setOffset] = React.useState(0);
  const from = React.useMemo(() => {
    const d = new Date();
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + offset, 1)).toISOString().slice(0, 10);
  }, [offset]);
  const to = React.useMemo(() => {
    const d = new Date(`${from}T12:00:00Z`);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 3, 1)).toISOString().slice(0, 10);
  }, [from]);
  const { data, reload } = useAsync(() => api.stayCalendar(propertyId, from, to), [propertyId, from, to]);
  const [start, setStart] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState<{ start: string; end: string } | null>(null);
  const [note, setNote] = React.useState("");
  const loc = intlLocale();
  const today = isoIn(0);

  const dayInfo = (day: string) => {
    const b = data?.bookings.find((x) => x.checkIn.slice(0, 10) <= day && day < x.checkOut.slice(0, 10));
    const k = data?.blocks.find((x) => x.startDate.slice(0, 10) <= day && day < x.endDate.slice(0, 10));
    return { b, k };
  };

  const click = (day: string) => {
    if (day < today) return;
    const { b, k } = dayInfo(day);
    if (!start) {
      if ((b && b.status !== "REQUESTED") || k) return;
      setStart(day);
      return;
    }
    const s = day < start ? day : start;
    const e = day < start ? start : day;
    setStart(null);
    setPending({ start: s, end: isoIn(1, e) });
  };

  const addBlock = async () => {
    if (!pending) return;
    try {
      await api.addStayBlock(propertyId, { startDate: pending.start, endDate: pending.end, note: note.trim() || undefined });
      toast.success(t("stays.cal.blocked"));
      setPending(null);
      setNote("");
      void reload();
    } catch (e) {
      toast.error(e);
    }
  };

  const months = [0, 1, 2].map((k) => {
    const d = new Date(`${from}T12:00:00Z`);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + k, 1));
  });
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2024, 0, 1 + i)).toLocaleDateString(loc, { weekday: "narrow", timeZone: "UTC" }));

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="font-display text-xl">{t("stays.cal.title")}</h2>
        <div className="flex gap-1">
          <Button size="sm" variant="secondary" disabled={offset <= 0} onClick={() => setOffset((o) => Math.max(0, o - 3))} aria-label={t("stays.cal.prev")}>
            <Icon name="chevronLeft" size={14} />
          </Button>
          <Button size="sm" variant="secondary" disabled={offset >= 15} onClick={() => setOffset((o) => o + 3)} aria-label={t("stays.cal.next")}>
            <Icon name="chevronRight" size={14} />
          </Button>
        </div>
      </div>
      <p className="text-sm text-ink-muted">{start ? t("stays.cal.pickEnd", { date: fmtDay(start) }) : t("stays.cal.howTo")}</p>
      <div className="flex gap-3 text-xs flex-wrap">
        <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded bg-brand-600" /> {t("stays.cal.booked")}</span>
        <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded border-2 border-accent" /> {t("stays.cal.requested")}</span>
        <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded bg-ink-muted/40" /> {t("stays.cal.closed")}</span>
        <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded bg-ocean-400" /> {t("stays.cal.imported")}</span>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {months.map((m) => {
          const y = m.getUTCFullYear();
          const mo = m.getUTCMonth();
          const daysIn = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
          const lead = (new Date(Date.UTC(y, mo, 1)).getUTCDay() + 6) % 7;
          return (
            <div key={`${y}-${mo}`} className="min-w-0">
              <div className="text-sm font-semibold text-center mb-2 capitalize">{m.toLocaleDateString(loc, { month: "long", year: "numeric", timeZone: "UTC" })}</div>
              <div className="grid grid-cols-7 gap-0.5 text-center text-[11px] text-ink-muted mb-1">
                {weekdays.map((w, i) => (
                  <div key={i}>{w}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: lead }).map((_, i) => (
                  <div key={`l${i}`} />
                ))}
                {Array.from({ length: daysIn }, (_, i) => {
                  const day = `${y}-${String(mo + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
                  const { b, k } = dayInfo(day);
                  const past = day < today;
                  const cls = b && b.status !== "REQUESTED"
                    ? "bg-brand-600 text-white"
                    : k?.source === "ICAL"
                      ? "bg-ocean-400 text-white"
                      : k
                        ? "bg-ink-muted/40"
                        : b
                          ? "border-2 border-accent"
                          : "hover:bg-cream-100 dark:hover:bg-white/5";
                  const label = b ? `${b.reference} — ${b.guest.firstName} ${b.guest.lastName}` : k ? (k.note ?? t("stays.cal.closed")) : "";
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => click(day)}
                      disabled={past}
                      title={label || undefined}
                      aria-label={`${fmtDay(day)}${label ? ` — ${label}` : ""}`}
                      className={`h-9 rounded-md text-sm tabular-nums ${cls} ${past ? "opacity-40" : ""} ${day === start ? "ring-2 ring-brand-500" : ""}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {data && data.blocks.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-2">{t("stays.cal.closures")}</h3>
          <ul className="space-y-1 text-sm">
            {data.blocks.map((k) => (
              <li key={k.id} className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 min-w-0">
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  {fmtDay(k.startDate)} → {fmtDay(isoIn(-1, k.endDate.slice(0, 10)))}
                  {k.note ? ` · ${k.note}` : ""} {k.source === "ICAL" && <Badge tone="ocean">{t("stays.cal.imported")}</Badge>}
                </span>
                {k.source === "MANUAL" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={async () => {
                      try {
                        await api.removeStayBlock(k.id);
                        void reload();
                      } catch (e) {
                        toast.error(e);
                      }
                    }}
                  >
                    {t("stays.cal.reopen")}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {pending && (
        <Modal title={t("stays.cal.blockTitle")} onClose={() => setPending(null)}>
          <div className="space-y-3">
            <p className="text-sm">{t("stays.cal.blockText", { from: fmtDay(pending.start), to: fmtDay(isoIn(-1, pending.end)) })}</p>
            <Input value={note} maxLength={200} onChange={(e) => setNote(e.target.value)} placeholder={t("stays.cal.notePh")} aria-label={t("stays.cal.notePh")} />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setPending(null)}>
                {t("stays.back")}
              </Button>
              <Button onClick={addBlock}>{t("stays.cal.block")}</Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
