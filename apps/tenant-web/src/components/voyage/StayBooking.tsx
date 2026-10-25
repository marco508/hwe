"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, EmailVerifyNotice, Icon, Input, Label, Textarea, intlLocale, loginHref, toast } from "@hwe/ui";
import type { StayPublicInfo, StayQuote, StayReview, User } from "@hwe/types";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { useCurrency } from "../../lib/currency-context";
import { RangeCalendar, Stars, fmtDay, isoIn } from "./VoyageKit";

const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** Dates / voyageurs venus de la recherche (?arrivee=&depart=&voyageurs=). */
function fromUrl(): { checkIn: string | null; checkOut: string | null; guests: number } {
  if (typeof window === "undefined") return { checkIn: null, checkOut: null, guests: 1 };
  const sp = new URLSearchParams(window.location.search);
  const ci = sp.get("arrivee");
  const co = sp.get("depart");
  return {
    checkIn: ci && ISO.test(ci) ? ci : null,
    checkOut: co && ISO.test(co) ? co : null,
    guests: Math.max(1, Number(sp.get("voyageurs")) || 1),
  };
}

/**
 * Réservation d'un séjour sur la fiche d'un logement : calendrier des nuits
 * libres, devis recalculé par l'API, demande à l'hôte.
 */
export function StayBooking({ propertyId, info, currentUser, isOwner }: { propertyId: string; info: StayPublicInfo; currentUser: User | null; isOwner: boolean }) {
  const router = useRouter();
  const { format } = useCurrency();
  const init = React.useMemo(fromUrl, []);
  const [checkIn, setCheckIn] = React.useState<string | null>(init.checkIn);
  const [checkOut, setCheckOut] = React.useState<string | null>(init.checkOut);
  const [guests, setGuests] = React.useState(Math.min(init.guests, info.maxGuests ?? 1));
  const [message, setMessage] = React.useState("");
  const [quote, setQuote] = React.useState<StayQuote | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [sent, setSent] = React.useState<string | null>(null);
  const currency = info.currency ?? "EUR";
  const minDay = isoIn(Math.max(0, info.minNoticeDays ?? 1));

  React.useEffect(() => {
    if (!checkIn || !checkOut) {
      setQuote(null);
      return;
    }
    let cancelled = false;
    api
      .stayQuote(propertyId, { checkIn, checkOut, guests })
      .then((q) => !cancelled && setQuote(q))
      .catch(() => !cancelled && setQuote(null));
    return () => {
      cancelled = true;
    };
  }, [propertyId, checkIn, checkOut, guests]);

  const submit = async () => {
    if (!currentUser) {
      router.push(loginHref());
      return;
    }
    if (!checkIn || !checkOut) return;
    setBusy(true);
    try {
      const b = await api.requestBooking({ propertyId, checkIn, checkOut, guests, message: message.trim() || undefined });
      setSent(b.reference);
      toast.success(t("voy.book.sent"));
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-success/40 bg-success/5 p-5 space-y-3">
        <div className="font-display text-xl flex items-center gap-2">
          <Icon name="checkCircle" size={22} className="text-success" /> {t("voy.book.sentTitle")}
        </div>
        <p className="text-sm">{t("voy.book.sentText", { ref: sent })}</p>
        <Link href="/voyage/reservations" className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
          {t("voy.book.seeBookings")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6 items-start">
      <div className="lg:col-span-3 rounded-2xl border border-border bg-surface p-4 sm:p-5 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <h2 className="font-display text-lg">{t("voy.book.pickDates")}</h2>
          {(checkIn || checkOut) && (
            <button type="button" className="text-sm text-brand-700 dark:text-brand-300 hover:underline" onClick={() => { setCheckIn(null); setCheckOut(null); }}>
              {t("voy.book.clear")}
            </button>
          )}
        </div>
        <RangeCalendar
          taken={info.unavailable ?? []}
          checkIn={checkIn}
          checkOut={checkOut}
          minDay={minDay}
          onChange={(a, b) => {
            setCheckIn(a);
            setCheckOut(b);
          }}
        />
        <p className="text-xs text-ink-muted mt-3">
          {t("voy.book.rules", { min: info.minNights ?? 1, from: info.checkInFrom ?? "", to: info.checkOutBefore ?? "" })}
        </p>
      </div>

      <aside className="lg:col-span-2 rounded-2xl border border-border bg-surface p-4 sm:p-5 space-y-4 lg:sticky lg:top-24 min-w-0">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span>
            <span className="display-serif text-2xl">{format(info.nightly ?? 0, currency)}</span> <span className="text-sm text-ink-muted">{t("voy.stay.perNight")}</span>
          </span>
          {info.rating != null && (
            <span className="text-sm inline-flex items-center gap-1">
              <Stars value={info.rating} /> {info.rating.toLocaleString(intlLocale())} · {t("voy.reviews.count", { count: info.reviewCount ?? 0 })}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl border border-border p-2">
            <div className="text-xs text-ink-muted">{t("voy.search.checkIn")}</div>
            {checkIn ? fmtDay(checkIn) : "—"}
          </div>
          <div className="rounded-xl border border-border p-2">
            <div className="text-xs text-ink-muted">{t("voy.search.checkOut")}</div>
            {checkOut ? fmtDay(checkOut) : "—"}
          </div>
        </div>
        <div>
          <Label htmlFor="book-guests">{t("voy.search.guests")}</Label>
          <Input id="book-guests" type="number" min={1} max={info.maxGuests ?? 1} value={guests} onChange={(e) => setGuests(Math.max(1, Math.min(info.maxGuests ?? 1, Number(e.target.value) || 1)))} />
          <p className="text-xs text-ink-muted mt-1">{t("voy.stay.guestsMax", { count: info.maxGuests ?? 1 })}</p>
        </div>

        {quote && (
          <div className="text-sm space-y-1 border-t border-border pt-3">
            {quote.available && quote.total !== undefined ? (
              <>
                <div className="flex justify-between gap-2">
                  <span>
                    {format(quote.nightlyRate ?? 0, currency)} × {t("voy.stay.nights", { count: quote.nights })}
                    {quote.discount && <span className="text-success"> · {t(`voy.book.discount.${quote.discount}`)}</span>}
                  </span>
                  <span>{format(quote.subtotal ?? 0, currency)}</span>
                </div>
                {!!quote.cleaningFee && (
                  <div className="flex justify-between gap-2">
                    <span>{t("voy.book.cleaning")}</span>
                    <span>{format(quote.cleaningFee, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between gap-2 font-semibold text-base pt-1">
                  <span>{t("voy.bookings.total")}</span>
                  <span>{format(quote.total, currency)}</span>
                </div>
              </>
            ) : (
              <ul className="text-danger space-y-1">
                {quote.refusals.map((r) => (
                  <li key={r}>{t(`voy.refusal.${r}`, { min: info.minNights ?? 1, max: info.maxNights ?? 0, guests: info.maxGuests ?? 1, notice: info.minNoticeDays ?? 0 })}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {isOwner ? (
          <p className="text-sm text-ink-muted">{t("voy.book.ownerHint")}</p>
        ) : (
          <>
            {currentUser && !currentUser.emailVerifiedAt && <EmailVerifyNotice />}
            <div>
              <Label htmlFor="book-msg">{t("voy.book.message")}</Label>
              <Textarea id="book-msg" rows={3} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t("voy.book.messagePh")} />
            </div>
            <Button variant="gradient" className="w-full" disabled={busy || !quote?.available} onClick={submit}>
              {currentUser ? t("voy.book.request") : t("voy.book.loginToBook")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-1.5"
              onClick={async () => {
                if (!currentUser) return router.push(loginHref());
                try {
                  const c = await api.startConversation(propertyId);
                  router.push(`/messages?c=${c.id}`);
                } catch (e) {
                  toast.error(e);
                }
              }}
            >
              <Icon name="message" size={14} /> {t("voy.book.ask")}
            </Button>
            <ul className="text-xs text-ink-muted space-y-1">
              <li>• {t("voy.book.noCharge")}</li>
              <li>• {t(`voy.payMode.${info.paymentMode ?? "ON_ARRIVAL"}.long`)}</li>
              <li>• {t(`voy.policy.${info.cancellationPolicy ?? "MODERATE"}.long`)}</li>
            </ul>
          </>
        )}
        {info.houseRules && (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium">{t("voy.stay.houseRules")}</summary>
            <p className="whitespace-pre-line text-ink-muted mt-1">{info.houseRules}</p>
          </details>
        )}
      </aside>
    </div>
  );
}

export function StayReviews({ propertyId, count }: { propertyId: string; count: number }) {
  const [list, setList] = React.useState<StayReview[] | null>(null);
  React.useEffect(() => {
    if (!count) return;
    api.stayReviews(propertyId).then(setList).catch(() => setList([]));
  }, [propertyId, count]);
  if (!count || !list?.length) return null;
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl mb-3">{t("voy.reviews.title", { count })}</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {list.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-surface p-4 text-sm space-y-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{r.author.firstName}</span>
              <Stars value={r.rating} />
            </div>
            <div className="text-xs text-ink-muted">
              {fmtDay(r.stayMonth, { month: "long", year: "numeric" })} · {t("voy.stay.nights", { count: r.nights })}
            </div>
            <p className="[overflow-wrap:anywhere] whitespace-pre-line">{r.comment}</p>
            {r.reply && <p className="text-ink-muted border-s-2 border-border ps-2 [overflow-wrap:anywhere]">{t("voy.reviews.hostReply", { reply: r.reply })}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
