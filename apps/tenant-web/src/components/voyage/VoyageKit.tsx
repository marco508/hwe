"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Button, Icon, Input, Label, Select, intlLocale, loginHref, toast, type IconName } from "@hwe/ui";
import {
  nightTaken,
  voyageImage,
  type BookingStatus,
  type CircuitCard,
  type DestinationCard,
  type PlaceCard,
  type PlaceCategory,
  type StaySearchItem,
  type TripSummary,
  type VoyageEventCard,
  type VoyageEventKind,
  type VoyageEventOccurrence,
} from "@hwe/types";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { useAuth } from "../../lib/auth-context";
import { useCurrency } from "../../lib/currency-context";

// ─────────────────────────── Formats ───────────────────────────

export const CATEGORY_ICON: Record<PlaceCategory, IconName> = {
  HISTORY: "landmark",
  CULTURE: "users",
  NATURE: "leaf",
  BEACH: "droplet",
  MUSEUM: "building",
  MARKET: "store",
  RELIGION: "sparkles",
  FESTIVAL: "party",
  GASTRONOMY: "flame",
  LEISURE: "compass",
};

/** Jour stocké (AAAA-MM-JJ…) → « sam. 20 déc. 2026 » dans la langue courante. */
export function fmtDay(iso: string | null | undefined, opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short", year: "numeric" }) {
  if (!iso) return "";
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  return d.toLocaleDateString(intlLocale(), { ...opts, timeZone: "UTC" });
}

export function fmtDuration(min: number | null | undefined): string {
  if (!min) return "";
  if (min < 60) return t("voy.duration.min", { n: min });
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? t("voy.duration.hm", { h, m }) : t("voy.duration.h", { count: h });
}

/** Aujourd'hui + n jours, AAAA-MM-JJ (fuseau du navigateur). */
export function isoIn(n = 0, from?: string): string {
  const base = from ? new Date(`${from}T12:00:00Z`) : new Date();
  const d = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + n));
  return d.toISOString().slice(0, 10);
}

export function nights(checkIn: string, checkOut: string): number {
  return Math.round((Date.parse(`${checkOut}T00:00:00Z`) - Date.parse(`${checkIn}T00:00:00Z`)) / 86400000);
}

export const BOOKING_TONE: Record<BookingStatus, "accent" | "success" | "danger" | "neutral" | "brand"> = {
  REQUESTED: "accent",
  ACCEPTED: "brand",
  CONFIRMED: "success",
  DECLINED: "neutral",
  EXPIRED: "neutral",
  CANCELLED: "danger",
  COMPLETED: "neutral",
};

export function BookingBadge({ status }: { status: BookingStatus }) {
  return <Badge tone={BOOKING_TONE[status]}>{t(`voy.bookingStatus.${status}`)}</Badge>;
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500" aria-label={t("voy.reviews.stars", { n: value })}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(value) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

// ─────────────────────────── Images ───────────────────────────

const GRADIENTS: Record<PlaceCategory | "DEFAULT", string> = {
  HISTORY: "from-amber-700 to-rose-800",
  CULTURE: "from-orange-500 to-red-700",
  NATURE: "from-emerald-600 to-teal-800",
  BEACH: "from-sky-500 to-cyan-700",
  MUSEUM: "from-stone-500 to-stone-800",
  MARKET: "from-yellow-500 to-orange-700",
  RELIGION: "from-violet-600 to-indigo-800",
  FESTIVAL: "from-fuchsia-600 to-rose-700",
  GASTRONOMY: "from-red-500 to-orange-700",
  LEISURE: "from-lime-600 to-emerald-700",
  DEFAULT: "from-brand-600 to-ocean-700",
};

/** Image d'un guide, ou dégradé + pictogramme quand il n'y en a pas. */
export function VoyageCover({
  cover,
  alt,
  category,
  size = 480,
  className = "",
  eager = false,
}: {
  cover: string | null | undefined;
  alt: string;
  category?: PlaceCategory;
  size?: 480 | 1200;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = React.useState(false);
  const src = voyageImage(cover, size);
  if (src && !failed) {
    const isStatic = !!cover?.startsWith("/images/voyage/");
    return (
      <img
        src={src}
        srcSet={isStatic ? `${voyageImage(cover, 480)} 480w, ${voyageImage(cover, 1200)} 1200w` : undefined}
        sizes={isStatic ? (size === 1200 ? "100vw" : "(min-width: 1024px) 33vw, 100vw") : undefined}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={`object-cover w-full h-full ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`w-full h-full bg-gradient-to-br ${GRADIENTS[category ?? "DEFAULT"]} flex items-center justify-center text-white/85 ${className}`}
    >
      <Icon name={category ? CATEGORY_ICON[category] : "compass"} size={size === 1200 ? 64 : 40} />
    </div>
  );
}

// ─────────────────────────── Cartes ───────────────────────────

export function DestinationTile({ d }: { d: DestinationCard }) {
  return (
    <Link
      href={`/voyage/destinations/${d.slug}`}
      className="group relative block rounded-2xl overflow-hidden aspect-[4/3] bg-surface shadow-sm hover:shadow-card transition text-white hover:text-white"
    >
      <VoyageCover cover={d.cover} alt={d.name} className="group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 min-w-0">
        <div className="text-[11px] uppercase tracking-[0.14em] opacity-80">{d.region}</div>
        <div className="font-display text-xl leading-tight [overflow-wrap:anywhere]">{d.name}</div>
        <p className="text-xs opacity-90 line-clamp-2 mt-1">{d.summary}</p>
        {!!d.placeCount && <div className="text-xs mt-2 opacity-80">{t("voy.placeCount", { count: d.placeCount })}</div>}
      </div>
    </Link>
  );
}

export function PlaceTile({ p, action }: { p: PlaceCard; action?: React.ReactNode }) {
  return (
    <div className="group rounded-2xl border border-border bg-surface overflow-hidden shadow-sm hover:shadow-card transition flex flex-col min-w-0">
      <Link href={`/voyage/lieux/${p.slug}`} className="block aspect-[3/2] overflow-hidden">
        <VoyageCover cover={p.cover} alt={p.name} category={p.category} className="group-hover:scale-105 transition-transform duration-500" />
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs text-ink-muted flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Icon name={CATEGORY_ICON[p.category]} size={14} />
            {t(`voy.cat.${p.category}`)}
          </span>
          {p.destination && <span>· {p.destination.name}</span>}
          {p.visitMinutes ? <span>· {fmtDuration(p.visitMinutes)}</span> : null}
        </div>
        <Link href={`/voyage/lieux/${p.slug}`} className="font-semibold text-ink hover:text-brand-700 dark:hover:text-brand-300 [overflow-wrap:anywhere]">
          {p.name}
        </Link>
        <p className="text-sm text-ink-muted line-clamp-3">{p.summary}</p>
        {action && <div className="mt-auto pt-2">{action}</div>}
      </div>
    </div>
  );
}

export function CircuitTile({ c }: { c: CircuitCard }) {
  return (
    <Link
      href={`/voyage/circuits/${c.slug}`}
      className="group rounded-2xl border border-border bg-surface overflow-hidden shadow-sm hover:shadow-card transition flex flex-col sm:flex-row min-w-0 text-ink hover:text-ink"
    >
      <div className="sm:w-48 aspect-[3/2] sm:aspect-auto shrink-0 overflow-hidden">
        <VoyageCover cover={c.cover} alt={c.title} className="group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4 min-w-0">
        <Badge tone="ocean">{t("voy.circuit.days", { count: c.days })}</Badge>
        <div className="font-display text-lg mt-2 [overflow-wrap:anywhere]">{c.title}</div>
        <p className="text-sm text-ink-muted line-clamp-3 mt-1">{c.summary}</p>
      </div>
    </Link>
  );
}

export function StayTile({ s, query }: { s: StaySearchItem; query?: string }) {
  const { format } = useCurrency();
  const photo = s.media[0]?.url;
  return (
    <Link
      href={`/properties/${s.id}${query ? `?${query}` : ""}`}
      className="group rounded-2xl border border-border bg-surface overflow-hidden shadow-sm hover:shadow-card transition flex flex-col min-w-0 text-ink hover:text-ink"
    >
      <div className="aspect-[3/2] overflow-hidden bg-cream-100 dark:bg-white/5">
        {photo ? (
          <img src={photo} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-muted">
            <Icon name="bed" size={40} />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 min-w-0">
        <div className="flex items-center justify-between gap-2 text-xs text-ink-muted">
          <span className="truncate">{s.city}</span>
          {s.rating !== null ? (
            <span className="inline-flex items-center gap-1 shrink-0">
              <Stars value={s.rating} size={12} /> {s.rating.toLocaleString(intlLocale())} ({s.reviewCount})
            </span>
          ) : (
            <span className="shrink-0">{t("voy.stay.new")}</span>
          )}
        </div>
        <div className="font-semibold [overflow-wrap:anywhere] line-clamp-2">{s.title}</div>
        <div className="text-xs text-ink-muted">
          {t("voy.stay.guestsMax", { count: s.maxGuests })} · {t("voy.stay.bedrooms", { count: s.bedrooms })}
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-2 flex-wrap">
          <span>
            <span className="font-semibold">{format(s.nightly, s.currency)}</span>{" "}
            <span className="text-xs text-ink-muted">{t("voy.stay.perNight")}</span>
          </span>
          {s.quote && (
            <span className="text-xs text-ink-muted">
              {t("voy.stay.totalFor", { total: format(s.quote.total ?? 0, s.currency), count: s.quote.nights })}
            </span>
          )}
        </div>
        <div className="text-xs text-ink-muted">
          {t(`voy.payMode.${s.paymentMode}`)} · {t(`voy.policy.${s.cancellationPolicy}.short`)}
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────── Recherche de séjour ───────────────────────────

export interface StayQuery {
  destination?: string;
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  country?: string;
}

export function stayQueryString(q: StayQuery): string {
  const u = new URLSearchParams();
  if (q.destination) u.set("destination", q.destination);
  if (q.city) u.set("ville", q.city);
  if (q.checkIn) u.set("arrivee", q.checkIn);
  if (q.checkOut) u.set("depart", q.checkOut);
  if (q.guests && q.guests > 1) u.set("voyageurs", String(q.guests));
  if (q.country) u.set("pays", q.country);
  return u.toString();
}

export function StaySearchBar({
  initial,
  destinations,
  compact = false,
}: {
  initial?: StayQuery;
  destinations?: DestinationCard[];
  compact?: boolean;
}) {
  const router = useRouter();
  const [where, setWhere] = React.useState(initial?.destination ? `@${initial.destination}` : initial?.city ?? "");
  const [checkIn, setCheckIn] = React.useState(initial?.checkIn ?? "");
  const [checkOut, setCheckOut] = React.useState(initial?.checkOut ?? "");
  const [guests, setGuests] = React.useState(initial?.guests ?? 2);
  const min = isoIn(1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkIn && checkOut && checkOut <= checkIn) {
      toast.error(t("voy.search.badDates"));
      return;
    }
    const q: StayQuery = { checkIn: checkIn || undefined, checkOut: checkOut || undefined, guests, country: initial?.country };
    if (where.startsWith("@")) q.destination = where.slice(1);
    else if (where.trim()) q.city = where.trim();
    router.push(`/voyage/sejours?${stayQueryString(q)}`);
  };

  return (
    <form
      onSubmit={submit}
      className={`rounded-2xl border border-border bg-surface/95 backdrop-blur shadow-card p-3 grid gap-3 ${compact ? "sm:grid-cols-[1.4fr_1fr_1fr_0.7fr_auto]" : "md:grid-cols-[1.4fr_1fr_1fr_0.7fr_auto]"} items-end text-ink`}
      aria-label={t("voy.search.label")}
    >
      <div className="min-w-0">
        <Label htmlFor="stay-where">{t("voy.search.where")}</Label>
        {destinations && destinations.length ? (
          <Select id="stay-where" value={where} onChange={(e) => setWhere(e.target.value)}>
            <option value="">{t("voy.search.anywhere")}</option>
            {destinations.map((d) => (
              <option key={d.slug} value={`@${d.slug}`}>
                {d.name}
              </option>
            ))}
          </Select>
        ) : (
          <Input id="stay-where" value={where.startsWith("@") ? "" : where} onChange={(e) => setWhere(e.target.value)} placeholder={t("voy.search.cityPh")} />
        )}
      </div>
      <div className="min-w-0">
        <Label htmlFor="stay-in">{t("voy.search.checkIn")}</Label>
        <Input
          id="stay-in"
          type="date"
          min={min}
          value={checkIn}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (e.target.value && (!checkOut || checkOut <= e.target.value)) setCheckOut(isoIn(2, e.target.value));
          }}
        />
      </div>
      <div className="min-w-0">
        <Label htmlFor="stay-out">{t("voy.search.checkOut")}</Label>
        <Input id="stay-out" type="date" min={checkIn ? isoIn(1, checkIn) : min} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      </div>
      <div className="min-w-0">
        <Label htmlFor="stay-guests">{t("voy.search.guests")}</Label>
        <Input id="stay-guests" type="number" min={1} max={50} value={guests} onChange={(e) => setGuests(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} />
      </div>
      <Button type="submit" variant="gradient" className="gap-2 h-10">
        <Icon name="search" size={16} />
        {t("voy.search.submit")}
      </Button>
    </form>
  );
}

// ─────────────────────────── Calendrier de dates ───────────────────────────

/**
 * Sélection arrivée → départ sur un calendrier de deux mois. Les nuits prises
 * sont barrées ; un départ peut tomber le jour d'une arrivée suivante.
 */
export function RangeCalendar({
  taken,
  checkIn,
  checkOut,
  onChange,
  minDay,
}: {
  taken: Array<{ start: string; end: string }>;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
  minDay: string;
}) {
  const first = new Date(`${minDay.slice(0, 7)}-01T12:00:00Z`);
  // Ouvre sur le mois de l'arrivée déjà choisie (dates venues de la recherche).
  const [offset, setOffset] = React.useState(() => {
    if (!checkIn || checkIn < minDay) return 0;
    const d = new Date(`${checkIn}T12:00:00Z`);
    return Math.min(16, (d.getUTCFullYear() - first.getUTCFullYear()) * 12 + d.getUTCMonth() - first.getUTCMonth());
  });
  const months = [0, 1].map((k) => new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + offset + k, 1)));
  const loc = intlLocale();
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(Date.UTC(2024, 0, 1 + i)).toLocaleDateString(loc, { weekday: "narrow", timeZone: "UTC" }),
  );

  const pick = (day: string) => {
    if (!checkIn || (checkIn && checkOut) || day <= checkIn) {
      if (nightTaken(day, taken)) return;
      onChange(day, null);
      return;
    }
    // Départ : aucune nuit prise entre l'arrivée et la veille du départ.
    for (let d = checkIn; d < day; d = isoIn(1, d)) {
      if (nightTaken(d, taken)) {
        toast.error(t("voy.cal.crossesTaken"));
        return;
      }
    }
    onChange(checkIn, day);
  };

  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between mb-2">
        <button type="button" className="h-8 w-8 rounded-full hover:bg-cream-100 dark:hover:bg-white/5 disabled:opacity-30 flex items-center justify-center" onClick={() => setOffset((o) => o - 1)} disabled={offset <= 0} aria-label={t("voy.cal.prev")}>
          <Icon name="chevronLeft" size={16} />
        </button>
        <button type="button" className="h-8 w-8 rounded-full hover:bg-cream-100 dark:hover:bg-white/5 disabled:opacity-30 flex items-center justify-center" onClick={() => setOffset((o) => o + 1)} disabled={offset >= 16} aria-label={t("voy.cal.next")}>
          <Icon name="chevronRight" size={16} />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {months.map((m) => {
          const y = m.getUTCFullYear();
          const mo = m.getUTCMonth();
          const daysIn = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
          const lead = (new Date(Date.UTC(y, mo, 1)).getUTCDay() + 6) % 7;
          return (
            <div key={`${y}-${mo}`} className="min-w-0">
              <div className="text-sm font-semibold text-center mb-2 capitalize">
                {m.toLocaleDateString(loc, { month: "long", year: "numeric", timeZone: "UTC" })}
              </div>
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
                  const past = day < minDay;
                  const isTaken = nightTaken(day, taken);
                  const selecting = !!checkIn && !checkOut && day > checkIn;
                  // Jour pris mais sélectionnable comme départ (la nuit d'avant est libre).
                  const disabled = past || (isTaken && !selecting);
                  const inRange = checkIn && checkOut && day > checkIn && day < checkOut;
                  const edge = day === checkIn || day === checkOut;
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={disabled}
                      onClick={() => pick(day)}
                      aria-pressed={edge || !!inRange}
                      aria-label={`${fmtDay(day)}${isTaken ? ` — ${t("voy.cal.taken")}` : ""}`}
                      className={`h-9 rounded-md text-sm tabular-nums transition ${
                        edge
                          ? "bg-brand-600 text-white font-semibold"
                          : inRange
                            ? "bg-brand-100 text-brand-900 dark:bg-brand-900/50 dark:text-brand-100"
                            : disabled
                              ? "text-ink-muted/50 line-through cursor-not-allowed"
                              : "hover:bg-cream-100 dark:hover:bg-white/5"
                      }`}
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
    </div>
  );
}

// ─────────────────────────── Fenêtre ───────────────────────────

export function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 bg-black/50" onClick={onClose} aria-label={t("com.close")} />
      <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface border border-border shadow-xl p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="font-display text-xl">{title}</h2>
          <button type="button" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-cream-100 dark:hover:bg-white/5 flex items-center justify-center shrink-0" aria-label={t("com.close")}>
            <Icon name="x" size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────── Ajouter au carnet ───────────────────────────

export function AddToTripButton({ place, country, className = "", size = "sm" }: { place: PlaceCard; country: string; className?: string; size?: "sm" | "md" }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [trips, setTrips] = React.useState<TripSummary[] | null>(null);
  const [tripId, setTripId] = React.useState<string>("");
  const [day, setDay] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const openDialog = async () => {
    if (!user) {
      router.push(loginHref());
      return;
    }
    setOpen(true);
    try {
      const list = (await api.trips()).filter((x) => x.country === country);
      setTrips(list);
      setTripId(list[0]?.id ?? "new");
      setTitle(t("voy.trip.defaultTitle", { country: countryName(country) }));
    } catch (e) {
      toast.error(e);
    }
  };

  const selected = trips?.find((x) => x.id === tripId);

  const save = async () => {
    setBusy(true);
    try {
      let id = tripId;
      if (id === "new") {
        const created = await api.createTrip({ title: title.trim() || t("voy.trip.untitled"), country, dayCount: 3 });
        id = created.id;
      }
      await api.addTripItem(id, { kind: "PLACE", placeId: place.id, day });
      setOpen(false);
      toast.success(t("voy.trip.added"), {
        action: { label: t("voy.trip.open"), onClick: () => router.push(`/voyage/mes-voyages/${id}`) },
      });
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Button type="button" size={size} variant="secondary" className={`gap-1.5 ${className}`} onClick={openDialog}>
        <Icon name="plus" size={14} />
        {t("voy.trip.add")}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title={t("voy.trip.addTitle", { place: place.name })}>
        {!trips ? (
          <p className="text-ink-muted text-sm">{t("com.loading")}</p>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="add-trip">{t("voy.trip.which")}</Label>
              <Select id="add-trip" value={tripId} onChange={(e) => { setTripId(e.target.value); setDay(0); }}>
                {trips.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.title}
                  </option>
                ))}
                <option value="new">{t("voy.trip.newOption")}</option>
              </Select>
            </div>
            {tripId === "new" && (
              <div>
                <Label htmlFor="add-trip-title">{t("voy.trip.title")}</Label>
                <Input id="add-trip-title" value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} />
              </div>
            )}
            <div>
              <Label htmlFor="add-trip-day">{t("voy.trip.day")}</Label>
              <Select id="add-trip-day" value={String(day)} onChange={(e) => setDay(Number(e.target.value))}>
                <option value="0">{t("voy.trip.unscheduled")}</option>
                {Array.from({ length: selected?.dayCount ?? 3 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    {dayLabel(i + 1, selected?.startDate ?? null)}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                {t("com.cancel")}
              </Button>
              <Button type="button" onClick={save} disabled={busy}>
                {t("voy.trip.addConfirm")}
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}

/** « Jour 2 — dim. 21 déc. » (date si le voyage est daté). */
export function dayLabel(day: number, startDate: string | null): string {
  if (day === 0) return t("voy.trip.unscheduled");
  if (!startDate) return t("voy.trip.dayN", { n: day });
  return `${t("voy.trip.dayN", { n: day })} — ${fmtDay(isoIn(day - 1, startDate.slice(0, 10)), { weekday: "short", day: "numeric", month: "short" })}`;
}

export function countryName(cc: string): string {
  try {
    return new Intl.DisplayNames([intlLocale()], { type: "region" }).of(cc) ?? cc;
  } catch {
    return cc;
  }
}

/** Lien OpenStreetMap (aucune carte embarquée : pas de requête tierce à l'affichage). */
export function mapHref(lat: number | null | undefined, lng: number | null | undefined, label?: string): string | null {
  if (lat == null || lng == null) return null;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}${label ? "" : ""}`;
}

export function VoyageCrumbs({ items }: { items: Array<{ href?: string; label: string }> }) {
  return (
    <nav aria-label={t("voy.crumbs")} className="text-sm text-ink-muted mb-4 flex items-center gap-1.5 flex-wrap min-w-0">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevronRight" size={12} className="shrink-0" />}
          {it.href ? (
            <Link href={it.href} className="hover:text-ink [overflow-wrap:anywhere]">
              {it.label}
            </Link>
          ) : (
            <span className="text-ink [overflow-wrap:anywhere]">{it.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ─────────────────────────── Fêtes et événements ───────────────────────────

export const EVENT_KIND_ICON: Record<VoyageEventKind, IconName> = {
  NATIONAL: "landmark",
  RELIGIOUS: "sparkles",
  TRADITIONAL: "users",
  FESTIVAL: "party",
  SEASONAL: "flame",
};

/** Dégradé de repli (sans photo) : celui de la catégorie de lieu la plus proche. */
export const EVENT_KIND_CATEGORY: Record<VoyageEventKind, PlaceCategory> = {
  NATIONAL: "HISTORY",
  RELIGIOUS: "RELIGION",
  TRADITIONAL: "CULTURE",
  FESTIVAL: "FESTIVAL",
  SEASONAL: "LEISURE",
};

const MONTH_ONLY: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
const DAY_MONTH: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
const FULL: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "long", year: "numeric" };

/** « sam. 10 janvier 2027 », « 8 – 10 janvier 2027 », « vers le 20 mars 2027 », « février – mars 2027 ». */
export function fmtOccurrence(o: VoyageEventOccurrence): string {
  if (o.period) {
    const a = fmtDay(o.start, { month: "long" });
    const b = fmtDay(o.end, MONTH_ONLY);
    return o.start.slice(0, 7) === o.end.slice(0, 7) ? fmtDay(o.start, MONTH_ONLY) : `${a} – ${b}`;
  }
  const one = o.start === o.end;
  const text = one ? fmtDay(o.start, FULL) : `${fmtDay(o.start, DAY_MONTH)} – ${fmtDay(o.end, { ...DAY_MONTH, year: "numeric" })}`;
  return o.approx ? t("voy.ev.around", { date: text }) : text;
}

/** Pastille de date (jour + mois abrégé), ou mois pour une période. */
export function EventDateChip({ o }: { o: VoyageEventOccurrence | undefined }) {
  if (!o) return null;
  return (
    <div className="shrink-0 w-14 rounded-xl bg-brand-50 dark:bg-brand-900/40 text-brand-800 dark:text-brand-200 text-center py-1.5 leading-tight" aria-hidden="true">
      {o.period ? (
        <>
          <div className="text-[11px] uppercase tracking-wide">{fmtDay(o.start, { month: "short" })}</div>
          <div className="text-[10px] opacity-75">{t("voy.ev.chipPeriod")}</div>
        </>
      ) : (
        <>
          <div className="text-xl font-display">{o.approx ? "~" : ""}{fmtDay(o.start, { day: "numeric" })}</div>
          <div className="text-[11px] uppercase tracking-wide">{fmtDay(o.start, { month: "short" })}</div>
        </>
      )}
    </div>
  );
}

export function EventBadges({ e }: { e: Pick<VoyageEventCard, "kind" | "publicHoliday" | "caution"> }) {
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      <Badge tone="ocean">
        <span className="inline-flex items-center gap-1">
          <Icon name={EVENT_KIND_ICON[e.kind]} size={12} /> {t(`voy.ev.kind.${e.kind}`)}
        </span>
      </Badge>
      {e.publicHoliday && <Badge tone="accent">{t("voy.ev.holiday")}</Badge>}
      {e.caution && (
        <Badge tone="danger">
          <span className="inline-flex items-center gap-1">
            <Icon name="alert" size={12} /> {t("voy.ev.caution")}
          </span>
        </Badge>
      )}
    </span>
  );
}

/** Où : lieu, destination ou texte libre. */
export function eventWhere(e: VoyageEventCard): string | null {
  return e.place?.name ?? e.destination?.name ?? e.where;
}

export function EventTile({ e }: { e: VoyageEventCard }) {
  const o = e.occurrences[0];
  const where = eventWhere(e);
  return (
    <Link
      href={`/voyage/fetes/${e.slug}`}
      className="group rounded-2xl border border-border bg-surface overflow-hidden shadow-sm hover:shadow-card transition flex flex-col min-w-0 text-ink hover:text-ink"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <VoyageCover cover={e.cover} alt={e.name} category={EVENT_KIND_CATEGORY[e.kind]} className="group-hover:scale-105 transition-transform duration-500" />
        {o && (
          <span className="absolute top-3 start-3 rounded-full bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 max-w-[calc(100%-1.5rem)] truncate">
            {fmtOccurrence(o)}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1 min-w-0">
        <EventBadges e={e} />
        <div className="font-semibold [overflow-wrap:anywhere]">{e.name}</div>
        <p className="text-sm text-ink-muted line-clamp-3">{e.summary}</p>
        {where && (
          <div className="mt-auto pt-1 text-xs text-ink-muted inline-flex items-center gap-1 min-w-0">
            <Icon name="mapPin" size={12} className="shrink-0" /> <span className="truncate">{where}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

/** Ligne compacte (calendrier, carnet, fiches destination / lieu). */
export function EventRow({ e, o = e.occurrences[0] }: { e: VoyageEventCard; o?: VoyageEventOccurrence }) {
  const where = eventWhere(e);
  return (
    <Link
      href={`/voyage/fetes/${e.slug}`}
      className="flex gap-3 items-start rounded-2xl border border-border bg-surface p-3 hover:border-brand-400 hover:shadow-card transition text-ink hover:text-ink min-w-0"
    >
      <EventDateChip o={o} />
      <span className="min-w-0 flex-1 space-y-1">
        <span className="block font-semibold [overflow-wrap:anywhere]">{e.name}</span>
        <span className="block text-xs text-ink-muted">
          {o ? fmtOccurrence(o) : ""}
          {where ? ` · ${where}` : ""}
        </span>
        <span className="block text-sm text-ink-muted line-clamp-2">{e.summary}</span>
        <EventBadges e={e} />
      </span>
    </Link>
  );
}
