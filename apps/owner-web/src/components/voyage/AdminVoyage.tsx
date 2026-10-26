"use client";

import * as React from "react";
import { Badge, Button, Icon, Input, Label, Select, Textarea, TENANT_URL, compressImage, intlLocale, toast, useAsync } from "@hwe/ui";
import {
  PLACE_CATEGORIES,
  VOYAGE_COUNTRIES,
  VOYAGE_EVENT_KINDS,
  eventOccurrences,
  isValidEventRule,
  voyageImage,
  type VoyageEventOccurrence,
  type VoyageEventRule,
} from "@hwe/types";
import { api, type AdminCircuit, type AdminDestination, type AdminEvent, type AdminGuide, type AdminPlace } from "../../lib/api";
import { t } from "../../lib/i18n";
import { fmtMoney } from "../stays/StaysKit";

const LANGS = ["fr", "en", "es", "pt", "ar"] as const;
type Lang = (typeof LANGS)[number];
type Tr = Record<string, Record<string, string>>;

function countryName(cc: string) {
  try {
    return new Intl.DisplayNames(["fr"], { type: "region" }).of(cc) ?? cc;
  } catch {
    return cc;
  }
}

/** Champs d'un formulaire de contenu : texte traduisible ou valeur commune. */
interface Field {
  key: string;
  label: string;
  kind?: "text" | "area" | "number" | "bool" | "select";
  options?: Array<{ value: string; label: string }>;
  translatable?: boolean;
  required?: boolean;
}

/**
 * Formulaire générique d'un contenu Voyage : le français est la référence
 * (colonnes) ; les autres langues remplissent `translations[langue]`. Un
 * champ laissé vide dans une langue retombe sur l'anglais puis le français.
 */
function ContentForm({
  initial,
  fields,
  onSave,
  onCancel,
  onDelete,
  extra,
}: {
  initial: Record<string, unknown>;
  fields: Field[];
  onSave: (body: Record<string, unknown>) => Promise<void>;
  onCancel?: () => void;
  onDelete?: () => Promise<void>;
  extra?: (v: Record<string, unknown>, set: (k: string, v: unknown) => void) => React.ReactNode;
}) {
  const [v, setV] = React.useState<Record<string, unknown>>(initial);
  const [tr, setTr] = React.useState<Tr>(((initial.translations as Tr) ?? {}) as Tr);
  const [lang, setLang] = React.useState<Lang>("fr");
  const [busy, setBusy] = React.useState(false);
  const set = (k: string, val: unknown) => setV((x) => ({ ...x, [k]: val }));
  const missing = (l: Lang) => fields.filter((f) => f.translatable && f.required && !(tr[l]?.[f.key] ?? "").trim()).length;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const body: Record<string, unknown> = { translations: tr };
      for (const f of fields) {
        const val = v[f.key];
        if (f.kind === "number") body[f.key] = val === "" || val === null || val === undefined ? null : Number(val);
        else if (f.kind === "bool") body[f.key] = !!val;
        else body[f.key] = typeof val === "string" ? val : val ?? null;
      }
      for (const k of ["cover", "coverCredit", "destinationId", "placeId", "rule", "sources"]) if (k in v) body[k] = v[k];
      // Étapes : sans identifiant (l'API remplace toutes les étapes).
      if (Array.isArray(v.steps)) {
        body.steps = (v.steps as AdminCircuit["steps"]).map((s, i) => ({
          day: s.day,
          position: i,
          placeId: s.placeId || null,
          destinationId: s.destinationId || null,
          note: s.note || null,
          ...(s.translations ? { translations: s.translations } : {}),
        }));
      }
      await onSave(body);
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex gap-1 flex-wrap" role="tablist" aria-label={t("voyAdmin.language")}>
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            role="tab"
            aria-selected={lang === l}
            onClick={() => setLang(l)}
            className={`h-8 px-3 rounded-full text-xs border uppercase ${lang === l ? "bg-brand-600 text-white border-brand-600" : "border-border"}`}
          >
            {l}
            {l !== "fr" && missing(l) > 0 ? " •" : ""}
          </button>
        ))}
        {lang !== "fr" && <span className="text-xs text-ink-muted self-center ms-2">{t("voyAdmin.trHint")}</span>}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {fields.map((f) => {
          if (lang !== "fr" && !f.translatable) return null;
          const id = `f-${f.key}-${lang}`;
          const value = lang === "fr" ? (v[f.key] as string | number | boolean | null | undefined) : tr[lang]?.[f.key] ?? "";
          const onChange = (val: string | boolean) => {
            if (lang === "fr") set(f.key, val);
            else setTr((x) => ({ ...x, [lang]: { ...(x[lang] ?? {}), [f.key]: String(val) } }));
          };
          if (f.kind === "bool") {
            return (
              <label key={f.key} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /> {f.label}
              </label>
            );
          }
          return (
            <div key={f.key} className={f.kind === "area" ? "md:col-span-2" : ""}>
              <Label htmlFor={id}>
                {f.label}
                {lang !== "fr" && <span className="text-ink-muted"> ({lang})</span>}
              </Label>
              {f.kind === "area" ? (
                <Textarea id={id} rows={4} dir={lang === "ar" ? "rtl" : undefined} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder={lang !== "fr" ? String(v[f.key] ?? "") : undefined} />
              ) : f.kind === "select" ? (
                <Select id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
                  {f.options!.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  id={id}
                  dir={lang === "ar" ? "rtl" : undefined}
                  inputMode={f.kind === "number" ? "decimal" : undefined}
                  value={value === null || value === undefined ? "" : String(value)}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={lang !== "fr" ? String(v[f.key] ?? "") : undefined}
                />
              )}
            </div>
          );
        })}
      </div>
      {lang === "fr" && "cover" in v && <CoverField value={(v.cover as string | null) ?? null} credit={(v.coverCredit as string | null) ?? ""} onChange={(c, credit) => { set("cover", c); set("coverCredit", credit); }} />}
      {extra?.(v, set)}
      <div className="flex gap-2 justify-end flex-wrap">
        {onDelete && (
          <Button
            type="button"
            variant="ghost"
            className="text-danger me-auto"
            onClick={async () => {
              if (!confirm(t("voyAdmin.confirmDelete"))) return;
              try {
                await onDelete();
              } catch (err) {
                toast.error(err);
              }
            }}
          >
            {t("com.delete")}
          </Button>
        )}
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            {t("com.cancel")}
          </Button>
        )}
        <Button type="submit" disabled={busy}>
          {t("com.save")}
        </Button>
      </div>
    </form>
  );
}

function CoverField({ value, credit, onChange }: { value: string | null; credit: string; onChange: (cover: string | null, credit: string) => void }) {
  const [busy, setBusy] = React.useState(false);
  const preview = value?.startsWith("/images/voyage/") ? `${TENANT_URL}${voyageImage(value, 480)}` : value?.startsWith("img:") ? null : null;
  const [uploaded, setUploaded] = React.useState<string | null>(null);
  return (
    <div className="rounded-xl border border-border p-3 space-y-2">
      <div className="text-sm font-medium">{t("voyAdmin.cover")}</div>
      <div className="flex gap-3 items-start flex-wrap">
        <div className="h-20 w-32 rounded-lg overflow-hidden bg-cream-100 dark:bg-white/5 flex items-center justify-center text-xs text-ink-muted shrink-0">
          {uploaded || preview ? <img src={uploaded ?? preview!} alt="" className="w-full h-full object-cover" /> : value ? value : t("voyAdmin.noCover")}
        </div>
        <div className="space-y-2 flex-1 min-w-[12rem]">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={busy}
            aria-label={t("voyAdmin.upload")}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBusy(true);
              try {
                const data = await compressImage(f, { maxSide: 1600, quality: 0.82 });
                const r = await api.adminVoyageImage(data);
                setUploaded(r.url);
                onChange(r.cover, credit);
                toast.success(t("voyAdmin.uploaded"));
              } catch (err) {
                toast.error(err);
              } finally {
                setBusy(false);
              }
            }}
            className="text-sm max-w-full"
          />
          <Input value={value ?? ""} onChange={(e) => onChange(e.target.value || null, credit)} placeholder="/images/voyage/ouidah" aria-label={t("voyAdmin.coverPath")} />
          <Input value={credit} onChange={(e) => onChange(value, e.target.value)} placeholder={t("voyAdmin.creditPh")} aria-label={t("voyAdmin.credit")} />
        </div>
      </div>
    </div>
  );
}

const FLAGS: Field[] = [
  { key: "published", label: "", kind: "bool" },
  { key: "reviewed", label: "", kind: "bool" },
];

export function AdminVoyage() {
  const [country, setCountry] = React.useState<string>("BJ");
  const { data, error, reload } = useAsync(() => api.adminVoyageContent(country), [country]);
  const { data: stays, reload: reloadStays } = useAsync(() => api.adminStaysOverview(), []);
  const [open, setOpen] = React.useState<string | null>(null);
  const [commission, setCommission] = React.useState<string>("");
  React.useEffect(() => {
    if (stays) setCommission(String(stays.commissionPct));
  }, [stays]);

  const flags = FLAGS.map((f) => ({ ...f, label: t(`voyAdmin.${f.key}`) }));
  const destFields: Field[] = [
    { key: "name", label: t("voyAdmin.name"), translatable: true, required: true },
    { key: "region", label: t("voyAdmin.region"), translatable: true },
    { key: "summary", label: t("voyAdmin.summary"), kind: "area", translatable: true, required: true },
    { key: "description", label: t("voyAdmin.description"), kind: "area", translatable: true, required: true },
    { key: "slug", label: t("voyAdmin.slug") },
    { key: "position", label: t("voyAdmin.position"), kind: "number" },
    { key: "latitude", label: t("voyAdmin.latitude"), kind: "number" },
    { key: "longitude", label: t("voyAdmin.longitude"), kind: "number" },
    ...flags,
  ];
  const placeFields: Field[] = [
    { key: "name", label: t("voyAdmin.name"), translatable: true, required: true },
    { key: "category", label: t("voyAdmin.category"), kind: "select", options: PLACE_CATEGORIES.map((c) => ({ value: c, label: t(`voyAdmin.cat.${c}`) })) },
    { key: "summary", label: t("voyAdmin.summary"), kind: "area", translatable: true, required: true },
    { key: "description", label: t("voyAdmin.description"), kind: "area", translatable: true, required: true },
    { key: "tips", label: t("voyAdmin.tips"), kind: "area", translatable: true },
    { key: "openingHours", label: t("voyAdmin.hours"), translatable: true },
    { key: "priceInfo", label: t("voyAdmin.price"), translatable: true },
    { key: "bestPeriod", label: t("voyAdmin.bestPeriod"), translatable: true },
    { key: "address", label: t("voyAdmin.address"), translatable: true },
    { key: "website", label: t("voyAdmin.website") },
    { key: "visitMinutes", label: t("voyAdmin.visitMinutes"), kind: "number" },
    { key: "slug", label: t("voyAdmin.slug") },
    { key: "position", label: t("voyAdmin.position"), kind: "number" },
    { key: "latitude", label: t("voyAdmin.latitude"), kind: "number" },
    { key: "longitude", label: t("voyAdmin.longitude"), kind: "number" },
    ...flags,
  ];
  const circuitFields: Field[] = [
    { key: "title", label: t("voyAdmin.title"), translatable: true, required: true },
    { key: "summary", label: t("voyAdmin.summary"), kind: "area", translatable: true, required: true },
    { key: "days", label: t("voyAdmin.days"), kind: "number" },
    { key: "slug", label: t("voyAdmin.slug") },
    { key: "position", label: t("voyAdmin.position"), kind: "number" },
    ...flags,
  ];

  const eventFields: Field[] = [
    { key: "name", label: t("voyAdmin.name"), translatable: true, required: true },
    { key: "kind", label: t("voyAdmin.eventKind"), kind: "select", options: VOYAGE_EVENT_KINDS.map((k) => ({ value: k, label: t(`voyAdmin.kind.${k}`) })) },
    { key: "summary", label: t("voyAdmin.summary"), kind: "area", translatable: true, required: true },
    { key: "description", label: t("voyAdmin.description"), kind: "area", translatable: true, required: true },
    { key: "tips", label: t("voyAdmin.tips"), kind: "area", translatable: true },
    { key: "where", label: t("voyAdmin.where"), translatable: true },
    { key: "dateNote", label: t("voyAdmin.dateNote"), translatable: true },
    { key: "slug", label: t("voyAdmin.slug") },
    { key: "position", label: t("voyAdmin.position"), kind: "number" },
    { key: "publicHoliday", label: t("voyAdmin.publicHoliday"), kind: "bool" },
    { key: "caution", label: t("voyAdmin.caution"), kind: "bool" },
    ...flags,
  ];

  const after = async (msg = t("voyAdmin.saved")) => {
    toast.success(msg);
    setOpen(null);
    await reload();
  };

  const allPlaces = (data?.destinations ?? []).flatMap((d) => d.places.map((p) => ({ ...p, destName: d.name })));
  const toReview =
    (data?.destinations.filter((d) => !d.reviewed).length ?? 0) +
    allPlaces.filter((p) => !p.reviewed).length +
    (data?.circuits.filter((c) => !c.reviewed).length ?? 0) +
    (data?.events.filter((e) => !e.reviewed).length ?? 0) +
    (data?.guides.filter((g) => !g.reviewed).length ?? 0);

  return (
    <div className="space-y-8 min-w-0">
      {/* ── Séjours ── */}
      <section className="rounded-2xl border border-border bg-surface p-5 space-y-4">
        <h2 className="font-display text-xl">{t("voyAdmin.stays")}</h2>
        {stays && (
          <>
            <div className="flex gap-3 flex-wrap text-sm">
              <Badge tone="success">{t("voyAdmin.enabledProps", { count: stays.enabledProperties })}</Badge>
              {stays.byStatus.map((s) => (
                <Badge key={s.status} tone="neutral">
                  {t(`stays.status.${s.status}`)} : {s.count}
                </Badge>
              ))}
            </div>
            <form
              className="flex items-end gap-2 flex-wrap"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await api.adminStayCommission(Number(commission.replace(",", ".")) || 0);
                  toast.success(t("voyAdmin.saved"));
                  void reloadStays();
                } catch (err) {
                  toast.error(err);
                }
              }}
            >
              <div>
                <Label htmlFor="commission">{t("voyAdmin.commission")}</Label>
                <Input id="commission" inputMode="decimal" value={commission} onChange={(e) => setCommission(e.target.value)} className="!w-28" />
              </div>
              <Button type="submit" size="sm">
                {t("com.save")}
              </Button>
              <p className="text-xs text-ink-muted basis-full">{t("voyAdmin.commissionHint")}</p>
            </form>
            {stays.upcoming.length > 0 && (
              <details>
                <summary className="cursor-pointer text-sm font-medium">{t("voyAdmin.upcoming", { count: stays.upcoming.length })}</summary>
                <ul className="mt-2 text-sm space-y-1">
                  {stays.upcoming.map((b) => (
                    <li key={b.id} className="[overflow-wrap:anywhere]">
                      {b.reference} · {b.property.title} · {b.checkIn.slice(0, 10)} → {b.checkOut.slice(0, 10)} · {b.guest.firstName} {b.guest.lastName} ({b.guest.email}) · {fmtMoney(b.total, b.currency)} · {t(`stays.status.${b.status}`)}
                    </li>
                  ))}
                </ul>
              </details>
            )}
            {stays.reviews.length > 0 && (
              <details>
                <summary className="cursor-pointer text-sm font-medium">{t("voyAdmin.reviews", { count: stays.reviews.length })}</summary>
                <ul className="mt-2 space-y-2 text-sm">
                  {stays.reviews.map((r) => (
                    <li key={r.id} className="rounded-lg border border-border p-2 flex gap-2 items-start justify-between min-w-0">
                      <span className="min-w-0 [overflow-wrap:anywhere]">
                        <strong>{r.rating}/5</strong> · {r.property.title} · {r.author.firstName} {r.author.lastName} — {r.comment}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={async () => {
                          try {
                            await api.adminHideReview(r.id, !r.hidden);
                            void reloadStays();
                          } catch (err) {
                            toast.error(err);
                          }
                        }}
                      >
                        {r.hidden ? t("voyAdmin.show") : t("voyAdmin.hide")}
                      </Button>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </>
        )}
      </section>

      {/* ── Guides ── */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h2 className="font-display text-xl">{t("voyAdmin.guides")}</h2>
            <p className="text-sm text-ink-muted max-w-3xl">{t("voyAdmin.guidesSub")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="adm-country" className="!mb-0">
              {t("voyAdmin.country")}
            </Label>
            <Select id="adm-country" value={country} onChange={(e) => setCountry(e.target.value)} className="!w-auto">
              {VOYAGE_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {countryName(c)}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {toReview > 0 && <p className="text-sm rounded-xl bg-accent/10 p-3">{t("voyAdmin.toReview", { count: toReview })}</p>}
        {error && !data ? (
          <Button onClick={reload}>{t("voyAdmin.retry")}</Button>
        ) : !data ? (
          <p className="text-ink-muted">{t("com.loading")}</p>
        ) : (
          <>
            <GuideEditor country={country} guide={data.guides.find((g) => g.country === country) ?? null} onSaved={() => after()} />

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{t("voyAdmin.destinations", { count: data.destinations.length })}</h3>
                <Button size="sm" variant="secondary" onClick={() => setOpen("dest:new")}>
                  <Icon name="plus" size={14} /> {t("voyAdmin.addDestination")}
                </Button>
              </div>
              {open === "dest:new" && (
                <div className="rounded-2xl border border-brand-300 bg-surface p-4">
                  <ContentForm
                    initial={{ country, name: "", region: "", summary: "", description: "", position: data.destinations.length, published: false, reviewed: false, cover: null, coverCredit: "" }}
                    fields={destFields}
                    onCancel={() => setOpen(null)}
                    onSave={async (b) => {
                      await api.adminSaveDestination(null, { ...b, country });
                      await after(t("voyAdmin.created"));
                    }}
                  />
                </div>
              )}
              {data.destinations.map((d) => (
                <DestinationBlock
                  key={d.id}
                  d={d}
                  open={open}
                  setOpen={setOpen}
                  destFields={destFields}
                  placeFields={placeFields}
                  after={after}
                />
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{t("voyAdmin.circuits", { count: data.circuits.length })}</h3>
                <Button size="sm" variant="secondary" onClick={() => setOpen("circuit:new")}>
                  <Icon name="plus" size={14} /> {t("voyAdmin.addCircuit")}
                </Button>
              </div>
              {open === "circuit:new" && (
                <div className="rounded-2xl border border-brand-300 bg-surface p-4">
                  <ContentForm
                    initial={{ country, title: "", summary: "", days: 3, position: data.circuits.length, published: false, reviewed: false, cover: null, coverCredit: "", steps: [] }}
                    fields={circuitFields}
                    onCancel={() => setOpen(null)}
                    onSave={async (b) => {
                      await api.adminSaveCircuit(null, { ...b, country });
                      await after(t("voyAdmin.created"));
                    }}
                    extra={(v, set) => <StepsEditor steps={(v.steps as AdminCircuit["steps"]) ?? []} days={Number(v.days) || 1} places={allPlaces} destinations={data.destinations} onChange={(s) => set("steps", s)} />}
                  />
                </div>
              )}
              {data.circuits.map((c) => (
                <div key={c.id} className="rounded-2xl border border-border bg-surface">
                  <button type="button" className="w-full text-start p-4 flex items-center justify-between gap-2" onClick={() => setOpen(open === `circuit:${c.id}` ? null : `circuit:${c.id}`)} aria-expanded={open === `circuit:${c.id}`}>
                    <span className="min-w-0">
                      <span className="font-medium [overflow-wrap:anywhere]">{c.title}</span>{" "}
                      <span className="text-xs text-ink-muted">· {t("voyAdmin.daysN", { count: c.days })} · {t("voyAdmin.stepsN", { count: c.steps.length })}</span>
                    </span>
                    <StatusBadges published={c.published} reviewed={c.reviewed} />
                  </button>
                  {open === `circuit:${c.id}` && (
                    <div className="p-4 border-t border-border">
                      <ContentForm
                        initial={{ ...c, steps: c.steps }}
                        fields={circuitFields}
                        onCancel={() => setOpen(null)}
                        onDelete={async () => {
                          await api.adminDeleteCircuit(c.id);
                          await after(t("voyAdmin.deleted"));
                        }}
                        onSave={async (b) => {
                          await api.adminSaveCircuit(c.id, b);
                          await after();
                        }}
                        extra={(v, set) => <StepsEditor steps={(v.steps as AdminCircuit["steps"]) ?? []} days={Number(v.days) || 1} places={allPlaces} destinations={data.destinations} onChange={(s) => set("steps", s)} />}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="font-semibold">{t("voyAdmin.events", { count: data.events.length })}</h3>
                  <p className="text-xs text-ink-muted max-w-2xl">{t("voyAdmin.eventsSub")}</p>
                </div>
                <Button size="sm" variant="secondary" onClick={() => setOpen("event:new")}>
                  <Icon name="plus" size={14} /> {t("voyAdmin.addEvent")}
                </Button>
              </div>
              {open === "event:new" && (
                <div className="rounded-2xl border border-brand-300 bg-surface p-4">
                  <ContentForm
                    initial={{
                      country, kind: "FESTIVAL", name: "", summary: "", description: "", tips: "", where: "", dateNote: "", position: data.events.length,
                      publicHoliday: false, caution: false, published: false, reviewed: false, cover: null, coverCredit: "",
                      rule: { type: "fixed", month: 1, day: 1 }, destinationId: null, placeId: null, sources: [],
                    }}
                    fields={eventFields}
                    onCancel={() => setOpen(null)}
                    onSave={async (b) => {
                      await api.adminSaveEvent(null, { ...b, country });
                      await after(t("voyAdmin.created"));
                    }}
                    extra={(v, set) => <EventExtras v={v} set={set} destinations={data.destinations} />}
                  />
                </div>
              )}
              {data.events.map((e) => (
                <div key={e.id} className="rounded-2xl border border-border bg-surface">
                  <button type="button" className="w-full text-start p-4 flex items-center justify-between gap-2" onClick={() => setOpen(open === `event:${e.id}` ? null : `event:${e.id}`)} aria-expanded={open === `event:${e.id}`}>
                    <span className="min-w-0">
                      <span className="font-medium [overflow-wrap:anywhere]">{e.name}</span>{" "}
                      <span className="text-xs text-ink-muted">
                        · {t(`voyAdmin.kind.${e.kind}`)}
                        {e.publicHoliday ? ` · ${t("voyAdmin.publicHolidayShort")}` : ""} · {e.next ? fmtOcc(e.next) : t("voyAdmin.noPreview")}
                      </span>
                    </span>
                    <StatusBadges published={e.published} reviewed={e.reviewed} />
                  </button>
                  {open === `event:${e.id}` && (
                    <div className="p-4 border-t border-border">
                      <ContentForm
                        initial={{ ...e, sources: e.sources ?? [] }}
                        fields={eventFields}
                        onCancel={() => setOpen(null)}
                        onDelete={async () => {
                          await api.adminDeleteEvent(e.id);
                          await after(t("voyAdmin.deleted"));
                        }}
                        onSave={async (b) => {
                          await api.adminSaveEvent(e.id, b);
                          await after();
                        }}
                        extra={(v, set) => <EventExtras v={v} set={set} destinations={data.destinations} />}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function StatusBadges({ published, reviewed }: { published: boolean; reviewed: boolean }) {
  return (
    <span className="flex gap-1 shrink-0">
      {!published && <Badge tone="neutral">{t("voyAdmin.draft")}</Badge>}
      {!reviewed && <Badge tone="accent">{t("voyAdmin.unreviewed")}</Badge>}
    </span>
  );
}

function DestinationBlock({
  d,
  open,
  setOpen,
  destFields,
  placeFields,
  after,
}: {
  d: AdminDestination;
  open: string | null;
  setOpen: (s: string | null) => void;
  destFields: Field[];
  placeFields: Field[];
  after: (msg?: string) => Promise<void>;
}) {
  const expanded = open?.startsWith(`d:${d.id}`) || open?.startsWith(`p:${d.id}:`);
  return (
    <div className="rounded-2xl border border-border bg-surface">
      <button type="button" className="w-full text-start p-4 flex items-center justify-between gap-2" onClick={() => setOpen(expanded ? null : `d:${d.id}`)} aria-expanded={!!expanded}>
        <span className="min-w-0">
          <span className="font-medium">{d.name}</span> <span className="text-xs text-ink-muted">· {d.region} · {t("voyAdmin.placesN", { count: d.places.length })}</span>
        </span>
        <StatusBadges published={d.published} reviewed={d.reviewed} />
      </button>
      {expanded && (
        <div className="p-4 border-t border-border space-y-4">
          {open === `d:${d.id}` ? (
            <ContentForm
              initial={d as unknown as Record<string, unknown>}
              fields={destFields}
              onCancel={() => setOpen(`d:${d.id}:list`)}
              onDelete={async () => {
                await api.adminDeleteDestination(d.id);
                await after(t("voyAdmin.deleted"));
              }}
              onSave={async (b) => {
                await api.adminSaveDestination(d.id, b);
                await after();
              }}
            />
          ) : (
            <Button size="sm" variant="secondary" onClick={() => setOpen(`d:${d.id}`)}>
              <Icon name="pencil" size={14} /> {t("voyAdmin.editDestination")}
            </Button>
          )}
          <div className="space-y-2">
            {d.places.map((p: AdminPlace) => (
              <div key={p.id} className="rounded-xl border border-border">
                <button type="button" className="w-full text-start px-3 py-2 flex items-center justify-between gap-2 text-sm" onClick={() => setOpen(open === `p:${d.id}:${p.id}` ? `d:${d.id}:list` : `p:${d.id}:${p.id}`)}>
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    {p.name} <span className="text-ink-muted">· {t(`voyAdmin.cat.${p.category}`)}</span>
                  </span>
                  <StatusBadges published={p.published} reviewed={p.reviewed} />
                </button>
                {open === `p:${d.id}:${p.id}` && (
                  <div className="p-3 border-t border-border">
                    <ContentForm
                      initial={p as unknown as Record<string, unknown>}
                      fields={placeFields}
                      onCancel={() => setOpen(`d:${d.id}:list`)}
                      onDelete={async () => {
                        await api.adminDeletePlace(p.id);
                        await after(t("voyAdmin.deleted"));
                      }}
                      onSave={async (b) => {
                        await api.adminSavePlace(p.id, b);
                        await after();
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
            {open === `p:${d.id}:new` ? (
              <div className="rounded-xl border border-brand-300 p-3">
                <ContentForm
                  initial={{ destinationId: d.id, name: "", category: "CULTURE", summary: "", description: "", position: d.places.length, published: false, reviewed: false, cover: null, coverCredit: "" }}
                  fields={placeFields}
                  onCancel={() => setOpen(`d:${d.id}:list`)}
                  onSave={async (b) => {
                    await api.adminSavePlace(null, { ...b, destinationId: d.id });
                    await after(t("voyAdmin.created"));
                  }}
                />
              </div>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setOpen(`p:${d.id}:new`)}>
                <Icon name="plus" size={14} /> {t("voyAdmin.addPlace")}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StepsEditor({
  steps,
  days,
  places,
  destinations,
  onChange,
}: {
  steps: AdminCircuit["steps"];
  days: number;
  places: Array<AdminPlace & { destName: string }>;
  destinations: AdminDestination[];
  onChange: (s: AdminCircuit["steps"]) => void;
}) {
  const upd = (i: number, patch: Partial<AdminCircuit["steps"][number]>) => onChange(steps.map((s, k) => (k === i ? { ...s, ...patch } : s)));
  return (
    <div className="rounded-xl border border-border p-3 space-y-2">
      <div className="text-sm font-medium">{t("voyAdmin.steps")}</div>
      {steps.map((s, i) => (
        <div key={i} className="grid sm:grid-cols-[5rem_1fr_1fr_auto] gap-2 items-start">
          <Select value={String(s.day)} onChange={(e) => upd(i, { day: Number(e.target.value) })} aria-label={t("voyAdmin.day")}>
            {Array.from({ length: Math.max(days, s.day) }, (_, k) => (
              <option key={k + 1} value={String(k + 1)}>
                {t("voyAdmin.dayN", { n: k + 1 })}
              </option>
            ))}
          </Select>
          <Select
            value={s.placeId ? `p:${s.placeId}` : s.destinationId ? `d:${s.destinationId}` : ""}
            onChange={(e) => {
              const v = e.target.value;
              upd(i, { placeId: v.startsWith("p:") ? v.slice(2) : null, destinationId: v.startsWith("d:") ? v.slice(2) : null });
            }}
            aria-label={t("voyAdmin.stepTarget")}
          >
            <option value="">{t("voyAdmin.noTarget")}</option>
            <optgroup label={t("voyAdmin.placesGroup")}>
              {places.map((p) => (
                <option key={p.id} value={`p:${p.id}`}>
                  {p.name} ({p.destName})
                </option>
              ))}
            </optgroup>
            <optgroup label={t("voyAdmin.destGroup")}>
              {destinations.map((d) => (
                <option key={d.id} value={`d:${d.id}`}>
                  {d.name}
                </option>
              ))}
            </optgroup>
          </Select>
          <Input value={s.note ?? ""} onChange={(e) => upd(i, { note: e.target.value })} placeholder={t("voyAdmin.stepNote")} aria-label={t("voyAdmin.stepNote")} />
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange(steps.filter((_, k) => k !== i))} aria-label={t("com.delete")}>
            <Icon name="trash" size={14} />
          </Button>
        </div>
      ))}
      <Button type="button" size="sm" variant="secondary" onClick={() => onChange([...steps, { id: "", day: Math.min(days, (steps[steps.length - 1]?.day ?? 1)), position: steps.length, placeId: null, destinationId: null, note: "", translations: null }])}>
        <Icon name="plus" size={14} /> {t("voyAdmin.addStep")}
      </Button>
      <p className="text-xs text-ink-muted">{t("voyAdmin.stepsHint")}</p>
    </div>
  );
}

function GuideEditor({ country, guide, onSaved }: { country: string; guide: AdminGuide | null; onSaved: () => void }) {
  const [lang, setLang] = React.useState<Lang>("fr");
  const [intro, setIntro] = React.useState<Record<string, string>>({});
  const [sections, setSections] = React.useState<Record<string, Array<{ title: string; body: string }>>>({});
  const [published, setPublished] = React.useState(true);
  const [reviewed, setReviewed] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const i: Record<string, string> = { fr: guide?.intro ?? "" };
    const s: Record<string, Array<{ title: string; body: string }>> = { fr: guide?.sections ?? [] };
    for (const l of LANGS) {
      if (l === "fr") continue;
      i[l] = guide?.translations?.[l]?.intro ?? "";
      s[l] = guide?.translations?.[l]?.sections ?? [];
    }
    setIntro(i);
    setSections(s);
    setPublished(guide?.published ?? true);
    setReviewed(guide?.reviewed ?? false);
  }, [guide]);

  const cur = sections[lang] ?? [];
  const setCur = (list: Array<{ title: string; body: string }>) => setSections((x) => ({ ...x, [lang]: list }));

  const save = async () => {
    setBusy(true);
    try {
      const translations: Record<string, unknown> = {};
      for (const l of LANGS) {
        if (l === "fr") continue;
        const sec = (sections[l] ?? []).filter((x) => x.title.trim() && x.body.trim());
        if (intro[l]?.trim() || sec.length) translations[l] = { intro: intro[l] ?? "", sections: sec };
      }
      await api.adminSaveGuide(country, {
        intro: intro.fr ?? "",
        sections: (sections.fr ?? []).filter((x) => x.title.trim() && x.body.trim()),
        translations,
        published,
        reviewed,
      });
      onSaved();
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface">
      <button type="button" className="w-full text-start p-4 flex items-center justify-between gap-2" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="font-medium">
          {t("voyAdmin.guide", { country: countryName(country) })} {!guide && <span className="text-xs text-ink-muted">· {t("voyAdmin.noGuide")}</span>}
        </span>
        {guide && <StatusBadges published={guide.published} reviewed={guide.reviewed} />}
      </button>
      {open && (
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex gap-1 flex-wrap">
            {LANGS.map((l) => (
              <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l} className={`h-8 px-3 rounded-full text-xs border uppercase ${lang === l ? "bg-brand-600 text-white border-brand-600" : "border-border"}`}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <Label htmlFor={`g-intro-${lang}`}>{t("voyAdmin.intro")}</Label>
            <Textarea id={`g-intro-${lang}`} rows={3} dir={lang === "ar" ? "rtl" : undefined} value={intro[lang] ?? ""} onChange={(e) => setIntro((x) => ({ ...x, [lang]: e.target.value }))} />
          </div>
          {cur.map((s, i) => (
            <div key={i} className="rounded-xl border border-border p-3 space-y-2">
              <div className="flex gap-2">
                <Input dir={lang === "ar" ? "rtl" : undefined} value={s.title} onChange={(e) => setCur(cur.map((x, k) => (k === i ? { ...x, title: e.target.value } : x)))} placeholder={t("voyAdmin.sectionTitle")} aria-label={t("voyAdmin.sectionTitle")} />
                <Button type="button" size="sm" variant="ghost" onClick={() => setCur(cur.filter((_, k) => k !== i))} aria-label={t("com.delete")}>
                  <Icon name="trash" size={14} />
                </Button>
              </div>
              <Textarea dir={lang === "ar" ? "rtl" : undefined} rows={3} value={s.body} onChange={(e) => setCur(cur.map((x, k) => (k === i ? { ...x, body: e.target.value } : x)))} placeholder={t("voyAdmin.sectionBody")} aria-label={t("voyAdmin.sectionBody")} />
            </div>
          ))}
          <Button type="button" size="sm" variant="secondary" onClick={() => setCur([...cur, { title: "", body: "" }])}>
            <Icon name="plus" size={14} /> {t("voyAdmin.addSection")}
          </Button>
          {lang !== "fr" && <p className="text-xs text-ink-muted">{t("voyAdmin.guideTrHint")}</p>}
          <div className="flex gap-4 flex-wrap text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> {t("voyAdmin.published")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={reviewed} onChange={(e) => setReviewed(e.target.checked)} /> {t("voyAdmin.reviewed")}
            </label>
          </div>
          <div className="flex justify-end">
            <Button onClick={save} disabled={busy}>
              {t("com.save")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── Fêtes et événements ───────────────────────────

const pad2 = (n: number) => String(n).padStart(2, "0");

function fmtOcc(o: VoyageEventOccurrence): string {
  const f = (d: string, opts: Intl.DateTimeFormatOptions) => new Date(`${d}T12:00:00Z`).toLocaleDateString(intlLocale(), { ...opts, timeZone: "UTC" });
  if (o.period) return `${f(o.start, { month: "long" })} – ${f(o.end, { month: "long", year: "numeric" })}`;
  const s = f(o.start, { day: "numeric", month: "long", year: "numeric" });
  const text = o.start === o.end ? s : `${s} – ${f(o.end, { day: "numeric", month: "long", year: "numeric" })}`;
  return o.approx ? `~ ${text}` : text;
}

function monthNames(): string[] {
  return Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2026, i, 15)).toLocaleDateString(intlLocale(), { month: "long", timeZone: "UTC" }));
}

function weekdayNames(): string[] {
  // 2026-03-01 est un dimanche (weekday 0).
  return Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2026, 2, 1 + i)).toLocaleDateString(intlLocale(), { weekday: "long", timeZone: "UTC" }));
}

/** Noms des mois hégiriens dans la langue de l'interface (repli : numéro). */
function hijriMonthNames(): string[] {
  const out: string[] = Array.from({ length: 12 }, (_, i) => String(i + 1));
  try {
    const num = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { month: "numeric", timeZone: "UTC" });
    const name = new Intl.DateTimeFormat(`${intlLocale()}-u-ca-islamic-umalqura`, { month: "long", timeZone: "UTC" });
    for (let d = 0; d < 400; d += 10) {
      const date = new Date(Date.UTC(2026, 0, 1 + d));
      const m = Number(num.format(date));
      if (m >= 1 && m <= 12) out[m - 1] = `${m} · ${name.format(date)}`;
    }
  } catch {
    /* calendrier non pris en charge : numéros seuls */
  }
  return out;
}

/** Règle de date, lien vers une destination / un lieu, sources, aperçu des prochaines dates. */
function EventExtras({ v, set, destinations }: { v: Record<string, unknown>; set: (k: string, v: unknown) => void; destinations: AdminDestination[] }) {
  const rule = (v.rule as VoyageEventRule) ?? { type: "fixed", month: 1, day: 1 };
  const setRule = (r: Record<string, unknown>) => set("rule", r);
  const months = monthNames();
  const num = (k: string, val: string) => setRule({ ...rule, [k]: val === "" ? undefined : Number(val) });
  const today = new Date().toISOString().slice(0, 10);
  const preview = isValidEventRule(rule) ? eventOccurrences(rule, today, `${Number(today.slice(0, 4)) + 3}-12-31`).slice(0, 3) : [];
  const sources = (v.sources as string[] | null) ?? [];
  const link = v.placeId ? `p:${v.placeId}` : v.destinationId ? `d:${v.destinationId}` : "";
  const days = "days" in rule ? rule.days ?? 1 : 1;

  const monthSelect = (id: string, value: number, onChange: (m: number) => void, names = months) => (
    <Select id={id} value={String(value)} onChange={(e) => onChange(Number(e.target.value))}>
      {names.map((m, i) => (
        <option key={i} value={i + 1}>
          {m}
        </option>
      ))}
    </Select>
  );

  return (
    <div className="space-y-4 rounded-2xl border border-border p-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-3">
          <Label htmlFor="ev-rule">{t("voyAdmin.rule")}</Label>
          <Select
            id="ev-rule"
            value={rule.type}
            onChange={(e) => {
              const type = e.target.value;
              setRule(
                type === "fixed" ? { type, month: 1, day: 1 }
                : type === "easter" ? { type, offset: 1 }
                : type === "hijri" ? { type, month: 10, day: 1 }
                : type === "nth-weekday" ? { type, month: 1, weekday: 6, nth: 1 }
                : { type: "period", from: 1, to: 1 },
              );
            }}
          >
            {(["fixed", "easter", "hijri", "nth-weekday", "period"] as const).map((x) => (
              <option key={x} value={x}>
                {t(`voyAdmin.rule.${x}`)}
              </option>
            ))}
          </Select>
        </div>
        {rule.type === "fixed" && (
          <>
            <div>
              <Label htmlFor="ev-m">{t("voyAdmin.month")}</Label>
              {monthSelect("ev-m", rule.month, (m) => setRule({ ...rule, month: m }))}
            </div>
            <div>
              <Label htmlFor="ev-d">{t("voyAdmin.dayOfMonth")}</Label>
              <Input id="ev-d" inputMode="numeric" value={String(rule.day ?? "")} onChange={(e) => num("day", e.target.value)} />
            </div>
          </>
        )}
        {rule.type === "easter" && (
          <div className="md:col-span-2">
            <Label htmlFor="ev-off">{t("voyAdmin.easterOffset")}</Label>
            <Input id="ev-off" inputMode="numeric" value={String(rule.offset ?? "")} onChange={(e) => num("offset", e.target.value)} />
            <p className="text-xs text-ink-muted mt-1">{t("voyAdmin.easterHint")}</p>
          </div>
        )}
        {rule.type === "hijri" && (
          <>
            <div>
              <Label htmlFor="ev-hm">{t("voyAdmin.hijriMonth")}</Label>
              {monthSelect("ev-hm", rule.month, (m) => setRule({ ...rule, month: m }), hijriMonthNames())}
            </div>
            <div>
              <Label htmlFor="ev-hd">{t("voyAdmin.dayOfMonth")}</Label>
              <Input id="ev-hd" inputMode="numeric" value={String(rule.day ?? "")} onChange={(e) => num("day", e.target.value)} />
            </div>
            <p className="text-xs text-ink-muted md:col-span-3">{t("voyAdmin.hijriHint")}</p>
          </>
        )}
        {rule.type === "nth-weekday" && (
          <>
            <div>
              <Label htmlFor="ev-nth">{t("voyAdmin.nth")}</Label>
              <Select id="ev-nth" value={String(rule.nth)} onChange={(e) => setRule({ ...rule, nth: Number(e.target.value) })}>
                {[1, 2, 3, 4, -1].map((n) => (
                  <option key={n} value={n}>
                    {t(`voyAdmin.nth.${n === -1 ? "last" : n}`)}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="ev-wd">{t("voyAdmin.weekday")}</Label>
              <Select id="ev-wd" value={String(rule.weekday)} onChange={(e) => setRule({ ...rule, weekday: Number(e.target.value) })}>
                {weekdayNames().map((w, i) => (
                  <option key={i} value={i}>
                    {w}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="ev-nm">{t("voyAdmin.month")}</Label>
              {monthSelect("ev-nm", rule.month, (m) => setRule({ ...rule, month: m }))}
            </div>
          </>
        )}
        {rule.type === "period" && (
          <>
            <div>
              <Label htmlFor="ev-pf">{t("voyAdmin.fromMonth")}</Label>
              {monthSelect("ev-pf", rule.from, (m) => setRule({ ...rule, from: m }))}
            </div>
            <div>
              <Label htmlFor="ev-pt">{t("voyAdmin.toMonth")}</Label>
              {monthSelect("ev-pt", rule.to, (m) => setRule({ ...rule, to: m }))}
            </div>
          </>
        )}
        {rule.type !== "period" && (
          <div>
            <Label htmlFor="ev-days">{t("voyAdmin.duration")}</Label>
            <Input id="ev-days" inputMode="numeric" value={String(days)} onChange={(e) => num("days", e.target.value)} />
          </div>
        )}
      </div>
      <div className="text-sm">
        <span className="font-medium">{t("voyAdmin.preview")} : </span>
        {preview.length ? preview.map(fmtOcc).join(" · ") : <span className="text-danger">{t("voyAdmin.noPreview")}</span>}
      </div>

      <div>
        <Label htmlFor="ev-link">{t("voyAdmin.linkTo")}</Label>
        <Select
          id="ev-link"
          value={link}
          onChange={(e) => {
            const x = e.target.value;
            set("placeId", x.startsWith("p:") ? x.slice(2) : null);
            set("destinationId", x.startsWith("d:") ? x.slice(2) : null);
          }}
        >
          <option value="">{t("voyAdmin.noLink")}</option>
          <optgroup label={t("voyAdmin.destGroup")}>
            {destinations.map((d) => (
              <option key={d.id} value={`d:${d.id}`}>
                {d.name}
              </option>
            ))}
          </optgroup>
          <optgroup label={t("voyAdmin.placesGroup")}>
            {destinations.flatMap((d) =>
              d.places.map((p) => (
                <option key={p.id} value={`p:${p.id}`}>
                  {p.name} ({d.name})
                </option>
              )),
            )}
          </optgroup>
        </Select>
      </div>

      <div>
        <Label htmlFor="ev-src">{t("voyAdmin.sources")}</Label>
        <Textarea id="ev-src" rows={3} value={sources.join("\n")} onChange={(e) => set("sources", e.target.value.split("\n").map((x) => x.trim()).filter(Boolean))} />
        <p className="text-xs text-ink-muted mt-1">{t("voyAdmin.sourcesHint")}</p>
        {sources.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs">
            {sources.filter((x) => /^https?:\/\//.test(x)).map((x) => (
              <li key={x} className="[overflow-wrap:anywhere]">
                <a href={x} target="_blank" rel="noopener noreferrer nofollow" className="text-brand-700 dark:text-brand-300 hover:underline">
                  {x}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
