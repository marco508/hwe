"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, EmptyState, ErrorState, Icon, Input, Label, Select, Textarea, intlLocale, toast, useAsync, useLoginRedirect } from "@hwe/ui";
import type { Booking } from "@hwe/types";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { useAuth } from "../../../lib/auth-context";
import { useCurrency } from "../../../lib/currency-context";
import { BookingBadge, Stars, VoyageCrumbs, fmtDay } from "../../../components/voyage/VoyageKit";

function fmtInstant(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleDateString(intlLocale(), { day: "numeric", month: "long" })} ${d.toLocaleTimeString(intlLocale(), { hour: "2-digit", minute: "2-digit" })}`;
}

export default function ReservationsPage() {
  const auth = useAuth();
  const router = useRouter();
  useLoginRedirect(auth, router);
  const { data, setData, error, reload } = useAsync<Booking[]>(() => api.myBookings(), [auth.user?.id], { enabled: !!auth.user });
  const update = (b: Booking) => setData((arr) => (arr ?? []).map((x) => (x.id === b.id ? b : x)));

  if (error && !data) return <ErrorState error={error} onRetry={reload} />;
  if (auth.loading || !data) return <p className="text-ink-muted">{t("com.loading")}</p>;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = data.filter((b) => ["REQUESTED", "ACCEPTED", "CONFIRMED"].includes(b.status) && b.checkOut.slice(0, 10) >= today);
  const past = data.filter((b) => !upcoming.includes(b));

  return (
    <section className="space-y-8 pb-12 min-w-0">
      <VoyageCrumbs items={[{ href: "/voyage", label: t("voy.crumb.home") }, { label: t("voy.bookings.title") }]} />
      <div>
        <h1 className="font-display text-3xl">{t("voy.bookings.title")}</h1>
        <p className="text-ink-muted">{t("voy.bookings.sub")}</p>
      </div>
      {data.length === 0 ? (
        <EmptyState
          illustration="calendar"
          title={t("voy.bookings.emptyTitle")}
          description={t("voy.bookings.emptyDesc")}
          action={
            <Link href="/voyage/sejours" className="inline-flex items-center h-10 px-5 rounded-full bg-brand-600 text-white hover:text-white text-sm font-medium hover:bg-brand-700">
              {t("voy.bookings.find")}
            </Link>
          }
        />
      ) : (
        <>
          {upcoming.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl">{t("voy.bookings.upcoming")}</h2>
              {upcoming.map((b) => (
                <BookingCard key={b.id} b={b} onUpdate={update} />
              ))}
            </div>
          )}
          {past.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl">{t("voy.bookings.past")}</h2>
              {past.map((b) => (
                <BookingCard key={b.id} b={b} onUpdate={update} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function BookingCard({ b, onUpdate }: { b: Booking; onUpdate: (b: Booking) => void }) {
  const { format } = useCurrency();
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);
  const photo = b.property.media[0]?.url;
  const money = (n: number) => format(n, b.currency);

  const act = async (fn: () => Promise<Booking>, ok: string) => {
    setBusy(true);
    try {
      onUpdate(await fn());
      toast.success(ok);
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  const cancel = () => {
    const msg = b.status === "REQUESTED" ? t("voy.bookings.confirmCancelRequest") : t(`voy.bookings.confirmCancel.${b.cancellationPolicy}`);
    if (!confirm(msg)) return;
    const reason = b.status === "REQUESTED" ? undefined : prompt(t("voy.bookings.reasonPrompt")) ?? undefined;
    void act(() => api.cancelBooking(b.id, reason || undefined), t("voy.bookings.cancelled"));
  };

  const contact = async () => {
    try {
      const c = await api.startConversation(b.propertyId);
      router.push(`/messages?c=${c.id}`);
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <article className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden min-w-0">
      <div className="flex flex-col sm:flex-row">
        <Link href={`/properties/${b.propertyId}`} className="sm:w-56 aspect-[3/2] sm:aspect-auto shrink-0 bg-cream-100 dark:bg-white/5">
          {photo ? <img src={photo} alt={b.property.title} className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full flex items-center justify-center text-ink-muted"><Icon name="bed" size={36} /></div>}
        </Link>
        <div className="p-4 sm:p-5 flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="text-xs text-ink-muted">
                {b.reference} · {b.property.city}
              </div>
              <Link href={`/properties/${b.propertyId}`} className="font-semibold text-ink hover:text-brand-700 [overflow-wrap:anywhere]">
                {b.property.title}
              </Link>
            </div>
            <BookingBadge status={b.status} />
          </div>
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-xs text-ink-muted">{t("voy.search.checkIn")}</div>
              {fmtDay(b.checkIn)}
              {b.checkInFrom && <span className="text-ink-muted"> · {t("voy.bookings.from", { time: b.checkInFrom })}</span>}
            </div>
            <div>
              <div className="text-xs text-ink-muted">{t("voy.search.checkOut")}</div>
              {fmtDay(b.checkOut)}
              {b.checkOutBefore && <span className="text-ink-muted"> · {t("voy.bookings.before", { time: b.checkOutBefore })}</span>}
            </div>
            <div>
              <div className="text-xs text-ink-muted">{t("voy.bookings.total")}</div>
              <span className="font-semibold">{money(b.total)}</span>
              <span className="text-ink-muted"> · {t("voy.stay.nightsGuests", { nights: b.nights, guests: b.guests })}</span>
            </div>
          </div>

          {b.status === "REQUESTED" && b.expiresAt && (
            <p className="text-sm rounded-xl bg-accent/10 p-3">{t("voy.bookings.waiting", { date: fmtInstant(b.expiresAt) })}</p>
          )}
          {b.hostNote && <p className="text-sm text-ink-muted [overflow-wrap:anywhere]">{t("voy.bookings.hostNote", { note: b.hostNote })}</p>}

          {b.status === "ACCEPTED" && <PaymentPanel b={b} money={money} busy={busy} onDeclare={(m, r) => act(() => api.declareBookingPayment(b.id, { method: m, reference: r }), t("voy.bookings.declared"))} />}

          {(b.status === "CONFIRMED" || b.status === "COMPLETED") && (
            <div className="rounded-xl border border-success/40 bg-success/5 p-3 space-y-2 text-sm">
              {b.property.addressLine && (
                <div className="flex gap-2">
                  <Icon name="mapPin" size={16} className="shrink-0 mt-0.5" />
                  <span className="[overflow-wrap:anywhere]">
                    {b.property.addressLine}, {b.property.city}
                  </span>
                </div>
              )}
              {b.arrivalInstructions ? (
                <div>
                  <div className="font-semibold">{t("voy.bookings.instructions")}</div>
                  <p className="whitespace-pre-line [overflow-wrap:anywhere]">{b.arrivalInstructions}</p>
                </div>
              ) : (
                <p className="text-ink-muted">{t("voy.bookings.noInstructions")}</p>
              )}
              {b.paymentMode === "ON_ARRIVAL" && b.status === "CONFIRMED" && <p className="text-ink-muted">{t("voy.bookings.payOnArrival", { total: money(b.total) })}</p>}
            </div>
          )}

          {b.houseRules && ["ACCEPTED", "CONFIRMED"].includes(b.status) && (
            <details className="text-sm">
              <summary className="cursor-pointer font-medium">{t("voy.stay.houseRules")}</summary>
              <p className="whitespace-pre-line text-ink-muted mt-1">{b.houseRules}</p>
            </details>
          )}

          {b.status === "CANCELLED" && (
            <p className="text-sm text-ink-muted [overflow-wrap:anywhere]">
              {t(b.cancelledBy === "HOST" ? "voy.bookings.cancelledByHost" : "voy.bookings.cancelledByYou")}
              {b.cancelReason ? ` — ${b.cancelReason}` : ""}
              {b.refundAmount ? ` · ${t("voy.bookings.refund", { amount: money(b.refundAmount) })}` : ""}
            </p>
          )}
          {b.status === "EXPIRED" && <p className="text-sm text-ink-muted">{t(b.answeredAt ? "voy.bookings.expiredUnpaid" : "voy.bookings.expiredNoAnswer")}</p>}

          {b.status === "COMPLETED" && b.canReview && <ReviewForm onSubmit={(rating, comment) => act(() => api.reviewBooking(b.id, { rating, comment }), t("voy.reviews.thanks"))} busy={busy} />}
          {b.review && (
            <div className="rounded-xl bg-cream-100/60 dark:bg-white/5 p-3 text-sm space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{t("voy.reviews.yours")}</span> <Stars value={b.review.rating} />
              </div>
              <p className="[overflow-wrap:anywhere]">{b.review.comment}</p>
              {b.review.reply && <p className="text-ink-muted [overflow-wrap:anywhere]">{t("voy.reviews.hostReply", { reply: b.review.reply })}</p>}
            </div>
          )}

          <div className="flex gap-2 flex-wrap pt-1">
            <Button size="sm" variant="secondary" className="gap-1.5" onClick={contact}>
              <Icon name="message" size={14} /> {t("voy.bookings.contact")}
            </Button>
            {["REQUESTED", "ACCEPTED", "CONFIRMED"].includes(b.status) && b.checkIn.slice(0, 10) > new Date().toISOString().slice(0, 10) && (
              <Button size="sm" variant="ghost" className="text-danger" onClick={cancel} disabled={busy}>
                {b.status === "REQUESTED" ? t("voy.bookings.cancelRequest") : t("voy.bookings.cancel")}
              </Button>
            )}
          </div>
          <p className="text-xs text-ink-muted">{t(`voy.policy.${b.cancellationPolicy}.long`)}</p>
        </div>
      </div>
    </article>
  );
}

function PaymentPanel({ b, money, busy, onDeclare }: { b: Booking; money: (n: number) => string; busy: boolean; onDeclare: (method: string, ref: string) => void }) {
  const methods = b.paymentMethods ?? [];
  const [method, setMethod] = React.useState(methods[0]?.label ?? "");
  const [ref, setRef] = React.useState("");
  if (b.paymentDeclaredAt) {
    return (
      <p className="text-sm rounded-xl bg-brand-50 dark:bg-brand-900/30 p-3">
        {t("voy.bookings.declaredOn", { date: fmtInstant(b.paymentDeclaredAt), method: b.paymentMethod ?? "", ref: b.paymentReference ?? "" })}
      </p>
    );
  }
  return (
    <div className="rounded-xl border border-brand-300/60 bg-brand-50/60 dark:bg-brand-900/20 p-3 space-y-3 text-sm">
      <div className="font-semibold">{t("voy.bookings.payTitle", { total: money(b.total) })}</div>
      {b.expiresAt && <p>{t("voy.bookings.payBefore", { date: fmtInstant(b.expiresAt) })}</p>}
      {methods.length === 0 ? (
        <p className="text-ink-muted">{t("voy.bookings.noMethods")}</p>
      ) : (
        <ul className="space-y-2">
          {methods.map((m) => (
            <li key={m.id} className="rounded-lg bg-surface border border-border p-2 [overflow-wrap:anywhere]">
              <div className="font-medium">{m.label}</div>
              <div className="font-mono text-xs">{m.value}</div>
              {m.holder && <div className="text-xs text-ink-muted">{t("voy.bookings.holder", { name: m.holder })}</div>}
              {m.instructions && <div className="text-xs text-ink-muted">{m.instructions}</div>}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-ink-muted">{t("voy.bookings.payWarn", { ref: b.reference })}</p>
      <form
        className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          if (method.trim().length < 2 || ref.trim().length < 2) {
            toast.error(t("voy.bookings.payMissing"));
            return;
          }
          onDeclare(method.trim(), ref.trim());
        }}
      >
        <div>
          <Label htmlFor={`pm-${b.id}`}>{t("voy.bookings.payMethod")}</Label>
          {methods.length ? (
            <Select id={`pm-${b.id}`} value={method} onChange={(e) => setMethod(e.target.value)}>
              {methods.map((m) => (
                <option key={m.id} value={m.label}>
                  {m.label}
                </option>
              ))}
            </Select>
          ) : (
            <Input id={`pm-${b.id}`} value={method} maxLength={80} onChange={(e) => setMethod(e.target.value)} />
          )}
        </div>
        <div>
          <Label htmlFor={`pr-${b.id}`}>{t("voy.bookings.payRef")}</Label>
          <Input id={`pr-${b.id}`} value={ref} maxLength={120} onChange={(e) => setRef(e.target.value)} placeholder={t("voy.bookings.payRefPh")} />
        </div>
        <Button type="submit" size="sm" disabled={busy}>
          {t("voy.bookings.declare")}
        </Button>
      </form>
    </div>
  );
}

function ReviewForm({ onSubmit, busy }: { onSubmit: (rating: number, comment: string) => void; busy: boolean }) {
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");
  return (
    <form
      className="rounded-xl border border-border p-3 space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (comment.trim().length < 10) {
          toast.error(t("voy.reviews.tooShort"));
          return;
        }
        onSubmit(rating, comment.trim());
      }}
    >
      <div className="font-semibold text-sm">{t("voy.reviews.leave")}</div>
      <div className="flex gap-1" role="radiogroup" aria-label={t("voy.reviews.rating")}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" role="radio" aria-checked={rating === n} onClick={() => setRating(n)} className="p-1" aria-label={t("voy.reviews.stars", { n })}>
            <span className={`text-2xl leading-none ${n <= rating ? "text-amber-500" : "text-ink-muted/40"}`} aria-hidden="true">
              ★
            </span>
          </button>
        ))}
      </div>
      <Textarea rows={3} maxLength={3000} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("voy.reviews.placeholder")} aria-label={t("voy.reviews.comment")} />
      <Button type="submit" size="sm" disabled={busy}>
        {t("voy.reviews.publish")}
      </Button>
    </form>
  );
}
