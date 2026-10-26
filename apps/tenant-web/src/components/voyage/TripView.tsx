"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Icon, Input, Label, Select, Textarea, TENANT_URL, toast } from "@hwe/ui";
import type { PlaceCard, TripDetail, TripItem } from "@hwe/types";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import {
  BookingBadge,
  CATEGORY_ICON,
  Dialog,
  EVENT_KIND_ICON,
  EventRow,
  VoyageCover,
  countryName,
  dayLabel,
  fmtDay,
  fmtDuration,
  isoIn,
  stayQueryString,
} from "./VoyageKit";

/** Jour du voyage (1…n) d'une date AAAA-MM-JJ, ou null hors voyage. */
function dayOf(trip: TripDetail, iso: string): number | null {
  if (!trip.startDate) return null;
  const n = Math.round((Date.parse(`${iso.slice(0, 10)}T00:00:00Z`) - Date.parse(`${trip.startDate.slice(0, 10)}T00:00:00Z`)) / 86400000) + 1;
  return n >= 1 && n <= trip.dayCount ? n : null;
}

export function TripView({ initial, editable }: { initial: TripDetail; editable: boolean }) {
  const router = useRouter();
  const [trip, setTrip] = React.useState(initial);
  const [editOpen, setEditOpen] = React.useState(false);
  const [addDay, setAddDay] = React.useState<number | null>(null);
  const [noteDay, setNoteDay] = React.useState<number | null>(null);
  const [notes, setNotes] = React.useState(initial.notes ?? "");

  const refresh = React.useCallback(async () => {
    try {
      setTrip(await api.trip(trip.id));
    } catch (e) {
      toast.error(e);
    }
  }, [trip.id]);

  const items = (day: number) => trip.items.filter((i) => i.day === day).sort((a, b) => a.position - b.position);
  const days = Array.from({ length: trip.dayCount }, (_, i) => i + 1);
  const unscheduled = items(0);
  const shareUrl = trip.shareToken ? `${TENANT_URL}/voyage/partage/${trip.shareToken}` : null;

  const patchItem = async (it: TripItem, body: Parameters<typeof api.updateTripItem>[2]) => {
    setTrip((tr) => ({ ...tr, items: tr.items.map((x) => (x.id === it.id ? { ...x, ...body } : x)) }));
    try {
      const updated = await api.updateTripItem(trip.id, it.id, body);
      setTrip((tr) => ({ ...tr, items: tr.items.map((x) => (x.id === it.id ? { ...x, ...updated, place: x.place } : x)) }));
    } catch (e) {
      toast.error(e);
      void refresh();
    }
  };

  const move = async (it: TripItem, dir: -1 | 1) => {
    const list = items(it.day);
    const idx = list.findIndex((x) => x.id === it.id);
    const swap = list[idx + dir];
    if (!swap) return;
    const ids = list.map((x) => x.id);
    [ids[idx], ids[idx + dir]] = [ids[idx + dir]!, ids[idx]!];
    setTrip((tr) => ({ ...tr, items: tr.items.map((x) => (x.day === it.day ? { ...x, position: ids.indexOf(x.id) } : x)) }));
    try {
      await api.reorderTrip(trip.id, it.day, ids);
    } catch (e) {
      toast.error(e);
      void refresh();
    }
  };

  const remove = async (it: TripItem) => {
    setTrip((tr) => ({ ...tr, items: tr.items.filter((x) => x.id !== it.id) }));
    try {
      await api.removeTripItem(trip.id, it.id);
    } catch (e) {
      toast.error(e);
      void refresh();
    }
  };

  const toggleShare = async () => {
    try {
      if (trip.shareToken) {
        await api.unshareTrip(trip.id);
        setTrip((tr) => ({ ...tr, shareToken: null }));
        toast.success(t("voy.trip.unshared"));
      } else {
        const { shareToken } = await api.shareTrip(trip.id);
        setTrip((tr) => ({ ...tr, shareToken }));
        const url = `${TENANT_URL}/voyage/partage/${shareToken}`;
        await navigator.clipboard?.writeText(url).catch(() => {});
        toast.success(t("voy.trip.sharedCopied"));
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const del = async () => {
    if (!confirm(t("voy.trip.confirmDelete"))) return;
    try {
      await api.deleteTrip(trip.id);
      router.push("/voyage/mes-voyages");
    } catch (e) {
      toast.error(e);
    }
  };

  const saveNotes = async () => {
    if ((trip.notes ?? "") === notes) return;
    try {
      await api.updateTrip(trip.id, { notes: notes || null });
      setTrip((tr) => ({ ...tr, notes }));
      toast.success(t("voy.trip.notesSaved"));
    } catch (e) {
      toast.error(e);
    }
  };

  const staysQuery =
    trip.startDate && trip.endDate
      ? stayQueryString({ checkIn: trip.startDate.slice(0, 10), checkOut: isoIn(1, trip.endDate.slice(0, 10)), guests: trip.travelers, country: trip.country })
      : stayQueryString({ country: trip.country, guests: trip.travelers });

  // Fêtes à date précise : rappelées sur chaque jour concerné ; toutes listées à côté.
  const tripEvents = trip.events ?? [];
  const feastsOn = (day: number) =>
    tripEvents.flatMap((e) =>
      e.occurrences
        .filter((o) => !o.period)
        .filter((o) => {
          const a = dayOf(trip, o.start) ?? (o.start < (trip.startDate ?? "") ? 1 : null);
          const b = dayOf(trip, o.end) ?? (o.end > (trip.endDate ?? "") ? trip.dayCount : null);
          return a !== null && b !== null && a <= day && day <= b;
        })
        .map((o) => ({ e, o })),
    );

  const stayEvents = (day: number) =>
    trip.stays.flatMap((s) => {
      const inDay = dayOf(trip, s.checkIn);
      const outDay = dayOf(trip, s.checkOut);
      const out: Array<{ kind: "in" | "out"; s: typeof s }> = [];
      if (inDay === day) out.push({ kind: "in", s });
      if (outDay === day) out.push({ kind: "out", s });
      return out;
    });

  const renderItem = (it: TripItem, list: TripItem[], idx: number) => (
    <li key={it.id} className={`rounded-2xl border border-border bg-surface p-3 flex gap-3 min-w-0 ${it.done ? "opacity-60" : ""}`}>
      {it.place ? (
        <Link href={`/voyage/lieux/${it.place.slug}`} className="h-16 w-20 sm:w-24 rounded-xl overflow-hidden shrink-0 print:hidden">
          <VoyageCover cover={it.place.cover} alt={it.place.name} category={it.place.category} />
        </Link>
      ) : (
        <span className="h-10 w-10 rounded-xl bg-cream-100 dark:bg-white/5 flex items-center justify-center shrink-0 text-ink-muted">
          <Icon name="pencil" size={16} />
        </span>
      )}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {it.time && <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 me-2 tabular-nums">{it.time}</span>}
            {it.place ? (
              <Link href={`/voyage/lieux/${it.place.slug}`} className={`font-semibold text-ink hover:text-brand-700 [overflow-wrap:anywhere] ${it.done ? "line-through" : ""}`}>
                {it.place.name}
              </Link>
            ) : (
              <span className={`font-semibold [overflow-wrap:anywhere] ${it.done ? "line-through" : ""}`}>{it.title || t("voy.trip.note")}</span>
            )}
            {it.place && (
              <div className="text-xs text-ink-muted flex items-center gap-1 flex-wrap">
                <Icon name={CATEGORY_ICON[it.place.category]} size={12} /> {t(`voy.cat.${it.place.category}`)}
                {it.place.destination && <> · {it.place.destination.name}</>}
                {it.place.visitMinutes ? <> · {fmtDuration(it.place.visitMinutes)}</> : null}
              </div>
            )}
          </div>
          {editable && (
            <label className="inline-flex items-center gap-1 text-xs text-ink-muted shrink-0 print:hidden">
              <input type="checkbox" checked={it.done} onChange={(e) => patchItem(it, { done: e.target.checked })} />
              {t("voy.trip.done")}
            </label>
          )}
        </div>
        {it.note && !editable && <p className="text-sm text-ink-muted whitespace-pre-line">{it.note}</p>}
        {editable && (
          <ItemEditor
            item={it}
            dayCount={trip.dayCount}
            startDate={trip.startDate}
            canUp={idx > 0}
            canDown={idx < list.length - 1}
            onPatch={(b) => patchItem(it, b)}
            onMove={(d) => move(it, d)}
            onRemove={() => remove(it)}
          />
        )}
      </div>
    </li>
  );

  return (
    <div className="space-y-6 pb-12 min-w-0">
      <header className="rounded-3xl border border-border bg-surface p-5 sm:p-6 flex flex-col md:flex-row md:items-end gap-4 justify-between">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.14em] text-ink-muted">
            {countryName(trip.country)}
            {trip.authorFirstName ? ` · ${t("voy.trip.by", { name: trip.authorFirstName })}` : ""}
          </div>
          <h1 className="font-display text-3xl [overflow-wrap:anywhere]">{trip.title}</h1>
          <p className="text-ink-muted text-sm mt-1">
            {trip.startDate ? t("voy.trips.dates", { from: fmtDay(trip.startDate), to: fmtDay(trip.endDate) }) : t("voy.trips.undated", { count: trip.dayCount })}
            {" · "}
            {t("voy.trips.travelers", { count: trip.travelers })}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap print:hidden">
          {editable && (
            <>
              <Button size="sm" variant="secondary" className="gap-1.5" onClick={() => setEditOpen(true)}>
                <Icon name="pencil" size={14} /> {t("voy.trip.edit")}
              </Button>
              <Button size="sm" variant="secondary" className="gap-1.5" onClick={toggleShare} aria-pressed={!!trip.shareToken}>
                <Icon name="send" size={14} /> {trip.shareToken ? t("voy.trip.unshare") : t("voy.trip.share")}
              </Button>
            </>
          )}
          <Button size="sm" variant="secondary" className="gap-1.5" onClick={() => window.print()}>
            <Icon name="download" size={14} /> {t("voy.trip.print")}
          </Button>
          {editable && (
            <Button size="sm" variant="ghost" className="gap-1.5 text-danger" onClick={del}>
              <Icon name="trash" size={14} /> {t("com.delete")}
            </Button>
          )}
        </div>
      </header>

      {editable && shareUrl && (
        <div className="rounded-2xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30 p-3 text-sm flex items-center gap-2 flex-wrap print:hidden">
          <Icon name="send" size={14} /> {t("voy.trip.shareLink")}
          <code className="text-xs bg-surface rounded px-2 py-1 [overflow-wrap:anywhere] min-w-0">{shareUrl}</code>
          <Button size="sm" variant="ghost" onClick={() => navigator.clipboard?.writeText(shareUrl).then(() => toast.success(t("voy.trip.copied")), () => {})}>
            {t("voy.trip.copy")}
          </Button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-8 min-w-0">
          {unscheduled.length > 0 && (
            <section>
              <h2 className="font-display text-xl mb-3">{t("voy.trip.unscheduled")}</h2>
              <ul className="space-y-2">{unscheduled.map((it, i) => renderItem(it, unscheduled, i))}</ul>
            </section>
          )}
          {days.map((day) => {
            const list = items(day);
            const events = stayEvents(day);
            return (
              <section key={day} className="break-inside-avoid">
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <h2 className="font-display text-xl">{dayLabel(day, trip.startDate)}</h2>
                  {editable && (
                    <div className="flex gap-2 print:hidden">
                      <Button size="sm" variant="secondary" className="gap-1" onClick={() => setAddDay(day)}>
                        <Icon name="mapPin" size={14} /> {t("voy.trip.addPlace")}
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1" onClick={() => setNoteDay(day)}>
                        <Icon name="plus" size={14} /> {t("voy.trip.addNote")}
                      </Button>
                    </div>
                  )}
                </div>
                {events.map(({ kind, s }) => (
                  <Link
                    key={`${s.id}-${kind}`}
                    href={editable ? "/voyage/reservations" : `/properties/${s.property.id}`}
                    className="mb-2 rounded-2xl border border-ocean-200 dark:border-ocean-700 bg-ocean-50 dark:bg-ocean-700/20 p-3 flex items-center gap-3 text-ink hover:text-ink min-w-0"
                  >
                    <Icon name="bed" size={18} className="shrink-0" />
                    <span className="text-sm min-w-0 [overflow-wrap:anywhere]">
                      {kind === "in" ? t("voy.trip.checkIn", { title: s.property.title }) : t("voy.trip.checkOut", { title: s.property.title })}
                    </span>
                    {editable && <BookingBadge status={s.status} />}
                  </Link>
                ))}
                {feastsOn(day).map(({ e, o }) => (
                  <Link
                    key={`${e.id}-${o.start}`}
                    href={`/voyage/fetes/${e.slug}`}
                    className="mb-2 rounded-2xl border border-accent-200 dark:border-accent-700 bg-accent-50 dark:bg-accent-700/20 p-3 flex items-center gap-3 text-ink hover:text-ink min-w-0"
                  >
                    <Icon name={EVENT_KIND_ICON[e.kind]} size={18} className="shrink-0" />
                    <span className="text-sm min-w-0 [overflow-wrap:anywhere]">
                      <span className="font-medium">{e.name}</span>
                      {e.publicHoliday ? ` · ${t("voy.ev.holiday")}` : ""}
                      {o.approx ? ` · ${t("voy.ev.approxShort")}` : ""}
                    </span>
                  </Link>
                ))}
                {list.length === 0 && events.length === 0 && feastsOn(day).length === 0 ? (
                  <p className="text-sm text-ink-muted rounded-2xl border border-dashed border-border p-4">{t("voy.trip.emptyDay")}</p>
                ) : (
                  <ul className="space-y-2">{list.map((it, i) => renderItem(it, list, i))}</ul>
                )}
              </section>
            );
          })}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 print:hidden">
          <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
            <div className="font-semibold flex items-center gap-2">
              <Icon name="bed" size={16} /> {t("voy.trip.sleep")}
            </div>
            {trip.stays.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {trip.stays.map((s) => (
                  <li key={s.id} className="min-w-0">
                    <div className="font-medium [overflow-wrap:anywhere]">{s.property.title}</div>
                    <div className="text-ink-muted text-xs">
                      {fmtDay(s.checkIn)} → {fmtDay(s.checkOut)}
                    </div>
                    {editable && <BookingBadge status={s.status} />}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">{t("voy.trip.noStay")}</p>
            )}
            <Link href={`/voyage/sejours?${staysQuery}`} className="inline-block text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline">
              {t("voy.trip.findStay")}
            </Link>
          </div>
          {trip.startDate && trip.endDate && (
            <div className="rounded-2xl border border-border bg-surface p-4 space-y-3">
              <div className="font-semibold flex items-center gap-2">
                <Icon name="party" size={16} /> {t("voy.trip.events")}
              </div>
              {tripEvents.length > 0 ? (
                <ul className="space-y-2">
                  {tripEvents.map((e) => (
                    <li key={e.id} className="min-w-0">
                      <EventRow e={e} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-muted">{t("voy.trip.noEvents")}</p>
              )}
              <Link
                href={`/voyage/fetes?pays=${trip.country}&du=${trip.startDate.slice(0, 10)}&au=${trip.endDate.slice(0, 10)}`}
                className="inline-block text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline"
              >
                {t("voy.trip.eventsCalendar")}
              </Link>
            </div>
          )}
          <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
            <Label htmlFor="trip-notes">{t("voy.trip.notes")}</Label>
            {editable ? (
              <>
                <Textarea id="trip-notes" rows={6} maxLength={5000} value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={saveNotes} placeholder={t("voy.trip.notesPh")} />
                <p className="text-xs text-ink-muted">{t("voy.trip.notesHint")}</p>
              </>
            ) : (
              <p className="text-sm whitespace-pre-line text-ink-muted">{trip.notes || "—"}</p>
            )}
          </div>
          <Link href={`/voyage?pays=${trip.country}`} className="block rounded-2xl border border-border bg-surface p-4 text-sm hover:border-brand-400 text-ink hover:text-ink">
            <Icon name="compass" size={16} className="inline me-1" /> {t("voy.trip.explore", { country: countryName(trip.country) })}
          </Link>
        </aside>
      </div>

      {editable && (
        <>
          <TripEditDialog open={editOpen} onClose={() => setEditOpen(false)} trip={trip} onSaved={() => { setEditOpen(false); void refresh(); }} />
          <PlacePicker
            open={addDay !== null}
            country={trip.country}
            onClose={() => setAddDay(null)}
            onPick={async (p) => {
              const day = addDay ?? 0;
              setAddDay(null);
              try {
                await api.addTripItem(trip.id, { kind: "PLACE", placeId: p.id, day });
                await refresh();
                toast.success(t("voy.trip.added"));
              } catch (e) {
                toast.error(e);
              }
            }}
          />
          <NoteDialog
            open={noteDay !== null}
            onClose={() => setNoteDay(null)}
            onSave={async (title, note, time) => {
              const day = noteDay ?? 0;
              setNoteDay(null);
              try {
                await api.addTripItem(trip.id, { kind: "NOTE", day, title, note, time: time || undefined });
                await refresh();
              } catch (e) {
                toast.error(e);
              }
            }}
          />
        </>
      )}
    </div>
  );
}

function ItemEditor({
  item,
  dayCount,
  startDate,
  canUp,
  canDown,
  onPatch,
  onMove,
  onRemove,
}: {
  item: TripItem;
  dayCount: number;
  startDate: string | null;
  canUp: boolean;
  canDown: boolean;
  onPatch: (b: { day?: number; note?: string | null; time?: string | null }) => void;
  onMove: (d: -1 | 1) => void;
  onRemove: () => void;
}) {
  const [note, setNote] = React.useState(item.note ?? "");
  React.useEffect(() => setNote(item.note ?? ""), [item.note]);
  return (
    <div className="space-y-2 print:hidden">
      <Textarea
        rows={1}
        maxLength={2000}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={() => note !== (item.note ?? "") && onPatch({ note: note || null })}
        placeholder={t("voy.trip.itemNotePh")}
        aria-label={t("voy.trip.itemNote")}
        className="text-sm min-h-[2.25rem]"
      />
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          type="time"
          value={item.time ?? ""}
          onChange={(e) => onPatch({ time: e.target.value || null })}
          aria-label={t("voy.trip.time")}
          className="!w-28 !h-8 text-sm"
        />
        <Select value={String(item.day)} onChange={(e) => onPatch({ day: Number(e.target.value) })} aria-label={t("voy.trip.moveTo")} className="!w-auto !h-8 text-sm">
          <option value="0">{t("voy.trip.unscheduled")}</option>
          {Array.from({ length: dayCount }, (_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {dayLabel(i + 1, startDate)}
            </option>
          ))}
        </Select>
        <span className="ms-auto flex gap-1">
          <button type="button" disabled={!canUp} onClick={() => onMove(-1)} className="h-8 w-8 rounded-md border border-border disabled:opacity-30 flex items-center justify-center" aria-label={t("voy.trip.up")}>
            <Icon name="chevronLeft" size={14} className="rotate-90" />
          </button>
          <button type="button" disabled={!canDown} onClick={() => onMove(1)} className="h-8 w-8 rounded-md border border-border disabled:opacity-30 flex items-center justify-center" aria-label={t("voy.trip.down")}>
            <Icon name="chevronRight" size={14} className="rotate-90" />
          </button>
          <button type="button" onClick={onRemove} className="h-8 w-8 rounded-md border border-border text-danger flex items-center justify-center" aria-label={t("com.delete")}>
            <Icon name="trash" size={14} />
          </button>
        </span>
      </div>
    </div>
  );
}

function TripEditDialog({ open, onClose, trip, onSaved }: { open: boolean; onClose: () => void; trip: TripDetail; onSaved: () => void }) {
  const [title, setTitle] = React.useState(trip.title);
  const [start, setStart] = React.useState(trip.startDate?.slice(0, 10) ?? "");
  const [end, setEnd] = React.useState(trip.endDate?.slice(0, 10) ?? "");
  const [days, setDays] = React.useState(trip.dayCount);
  const [travelers, setTravelers] = React.useState(trip.travelers);
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    setTitle(trip.title);
    setStart(trip.startDate?.slice(0, 10) ?? "");
    setEnd(trip.endDate?.slice(0, 10) ?? "");
    setDays(trip.dayCount);
    setTravelers(trip.travelers);
  }, [open, trip]);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (start && end && end < start) {
      toast.error(t("voy.trip.badDates"));
      return;
    }
    setBusy(true);
    try {
      await api.updateTrip(trip.id, { title: title.trim() || trip.title, startDate: start || null, endDate: start ? end || null : null, dayCount: days, travelers });
      onSaved();
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} title={t("voy.trip.edit")}>
      <form onSubmit={save} className="space-y-4">
        <div>
          <Label htmlFor="e-title">{t("voy.trip.title")}</Label>
          <Input id="e-title" value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="e-start">{t("voy.trip.startDate")}</Label>
            <Input id="e-start" type="date" value={start} onChange={(e) => { setStart(e.target.value); if (e.target.value && (!end || end < e.target.value)) setEnd(isoIn(days - 1, e.target.value)); }} />
          </div>
          <div>
            <Label htmlFor="e-end">{t("voy.trip.endDate")}</Label>
            <Input id="e-end" type="date" min={start} value={end} disabled={!start} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>
        {!start && (
          <div>
            <Label htmlFor="e-days">{t("voy.trip.dayCount")}</Label>
            <Input id="e-days" type="number" min={1} max={60} value={days} onChange={(e) => setDays(Math.max(1, Math.min(60, Number(e.target.value) || 1)))} />
          </div>
        )}
        <div>
          <Label htmlFor="e-trav">{t("voy.trip.travelers")}</Label>
          <Input id="e-trav" type="number" min={1} max={50} value={travelers} onChange={(e) => setTravelers(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} />
        </div>
        <p className="text-xs text-ink-muted">{t("voy.trip.shrinkHint")}</p>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            {t("com.cancel")}
          </Button>
          <Button type="submit" disabled={busy}>
            {t("com.save")}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function PlacePicker({ open, country, onClose, onPick }: { open: boolean; country: string; onClose: () => void; onPick: (p: PlaceCard) => void }) {
  const [q, setQ] = React.useState("");
  const [list, setList] = React.useState<PlaceCard[] | null>(null);
  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const h = setTimeout(() => {
      api
        .voyagePlaces({ country, q: q.trim() || undefined })
        .then((r) => !cancelled && setList(r))
        .catch((e) => toast.error(e));
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(h);
    };
  }, [open, q, country]);
  return (
    <Dialog open={open} onClose={onClose} title={t("voy.trip.addPlace")}>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("voy.trip.searchPlace")} aria-label={t("voy.trip.searchPlace")} autoFocus />
      <ul className="mt-3 space-y-2 max-h-[55vh] overflow-y-auto">
        {!list ? (
          <li className="text-sm text-ink-muted">{t("com.loading")}</li>
        ) : list.length === 0 ? (
          <li className="text-sm text-ink-muted">{t("voy.trip.noPlace")}</li>
        ) : (
          list.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => onPick(p)} className="w-full text-start rounded-xl border border-border p-2 flex gap-3 hover:border-brand-400 min-w-0">
                <span className="h-12 w-16 rounded-lg overflow-hidden shrink-0">
                  <VoyageCover cover={p.cover} alt={p.name} category={p.category} />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-sm [overflow-wrap:anywhere]">{p.name}</span>
                  <span className="block text-xs text-ink-muted">
                    {t(`voy.cat.${p.category}`)}
                    {p.destination ? ` · ${p.destination.name}` : ""}
                  </span>
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </Dialog>
  );
}

function NoteDialog({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (title: string, note: string, time: string) => void }) {
  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");
  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    if (open) {
      setTitle("");
      setNote("");
      setTime("");
    }
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose} title={t("voy.trip.addNote")}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() && !note.trim()) return;
          onSave(title.trim(), note.trim(), time);
        }}
      >
        <div>
          <Label htmlFor="n-title">{t("voy.trip.noteTitle")}</Label>
          <Input id="n-title" value={title} maxLength={160} onChange={(e) => setTitle(e.target.value)} placeholder={t("voy.trip.noteTitlePh")} />
        </div>
        <div>
          <Label htmlFor="n-note">{t("voy.trip.note")}</Label>
          <Textarea id="n-note" rows={3} maxLength={2000} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="n-time">{t("voy.trip.time")}</Label>
          <Input id="n-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="!w-32" />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            {t("com.cancel")}
          </Button>
          <Button type="submit">{t("com.save")}</Button>
        </div>
      </form>
    </Dialog>
  );
}
