"use client";

import * as React from "react";
import { Badge, Button, Icon, Textarea, intlLocale, toast } from "@hwe/ui";
import type { Booking, BookingStatus } from "@hwe/types";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { Modal } from "../Modal";

export const BOOKING_TONE: Record<BookingStatus, "accent" | "success" | "danger" | "neutral" | "brand"> = {
  REQUESTED: "accent",
  ACCEPTED: "brand",
  CONFIRMED: "success",
  DECLINED: "neutral",
  EXPIRED: "neutral",
  CANCELLED: "danger",
  COMPLETED: "neutral",
};

/** Montant dans SA devise (côté hôte : jamais converti). */
export function fmtMoney(n: number, currency: string) {
  try {
    return n.toLocaleString(intlLocale(), { style: "currency", currency, maximumFractionDigits: currency === "XOF" || currency === "XAF" ? 0 : 2 });
  } catch {
    return `${n} ${currency}`;
  }
}

export function fmtDay(iso: string | null | undefined, opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short", year: "numeric" }) {
  if (!iso) return "";
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString(intlLocale(), { ...opts, timeZone: "UTC" });
}

export function fmtInstant(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleDateString(intlLocale(), { day: "numeric", month: "long" })} ${d.toLocaleTimeString(intlLocale(), { hour: "2-digit", minute: "2-digit" })}`;
}

export function isoIn(n = 0, from?: string): string {
  const base = from ? new Date(`${from}T12:00:00Z`) : new Date();
  return new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + n)).toISOString().slice(0, 10);
}

/** Carte d'une réservation côté hôte, avec les actions possibles selon son statut. */
export function HostBookingCard({ b, onUpdate }: { b: Booking; onUpdate: (b: Booking) => void }) {
  const [busy, setBusy] = React.useState(false);
  const [dialog, setDialog] = React.useState<null | "accept" | "decline" | "cancel" | "reject">(null);
  const [note, setNote] = React.useState("");
  const photo = b.property.media[0]?.url;
  const money = (n: number) => fmtMoney(n, b.currency);

  const run = async (fn: () => Promise<Booking>, ok: string) => {
    setBusy(true);
    try {
      onUpdate(await fn());
      toast.success(ok);
      setDialog(null);
      setNote("");
    } catch (e) {
      toast.error(e);
    } finally {
      setBusy(false);
    }
  };

  const confirmDialog = () => {
    if (dialog === "accept") return run(() => api.acceptBooking(b.id, note || undefined), t("stays.accepted"));
    if (dialog === "decline") return run(() => api.declineBooking(b.id, note || undefined), t("stays.declined"));
    if (dialog === "reject") return run(() => api.rejectBookingPayment(b.id, note || undefined), t("stays.paymentRejected"));
    if (dialog === "cancel") {
      if (note.trim().length < 3) {
        toast.error(t("stays.reasonRequired"));
        return;
      }
      return run(() => api.hostCancelBooking(b.id, note.trim()), t("stays.cancelled"));
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <article className="rounded-2xl border border-border bg-surface shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 min-w-0">
      <div className="sm:w-40 aspect-[3/2] rounded-xl overflow-hidden bg-cream-100 dark:bg-white/5 shrink-0">
        {photo ? <img src={photo} alt="" className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full flex items-center justify-center text-ink-muted"><Icon name="bed" size={28} /></div>}
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <div className="text-xs text-ink-muted">
              {b.reference} · {b.property.title}
            </div>
            <div className="font-semibold">
              {fmtDay(b.checkIn)} → {fmtDay(b.checkOut)}
            </div>
            <div className="text-sm text-ink-muted">{t("stays.nightsGuests", { nights: b.nights, guests: b.guests })}</div>
          </div>
          <Badge tone={BOOKING_TONE[b.status]}>{t(`stays.status.${b.status}`)}</Badge>
        </div>
        {b.guest && (
          <p className="text-sm [overflow-wrap:anywhere]">
            <Icon name="user" size={14} className="inline me-1" />
            {b.guest.firstName} {b.guest.lastName} · {b.guest.email}
            {b.guest.phone ? ` · ${b.guest.phone}` : ""}
          </p>
        )}
        {b.message && <p className="text-sm text-ink-muted whitespace-pre-line [overflow-wrap:anywhere] border-s-2 border-border ps-2">{b.message}</p>}
        <div className="text-sm flex gap-x-4 gap-y-1 flex-wrap">
          <span>
            {t("stays.total")} <strong>{money(b.total)}</strong>
          </span>
          {b.commissionPct ? (
            <span className="text-ink-muted">
              {t("stays.payout", { amount: money(b.hostPayout ?? b.total), pct: b.commissionPct })}
            </span>
          ) : null}
          <span className="text-ink-muted">{t(`stays.payMode.${b.paymentMode}`)}</span>
        </div>
        {b.status === "REQUESTED" && b.expiresAt && <p className="text-sm rounded-xl bg-accent/10 p-2">{t("stays.answerBefore", { date: fmtInstant(b.expiresAt) })}</p>}
        {b.status === "ACCEPTED" && (
          <p className="text-sm rounded-xl bg-brand-50 dark:bg-brand-900/30 p-2">
            {b.paymentDeclaredAt
              ? t("stays.paymentDeclared", { date: fmtInstant(b.paymentDeclaredAt), method: b.paymentMethod ?? "", ref: b.paymentReference ?? "" })
              : t("stays.awaitingPayment", { date: b.expiresAt ? fmtInstant(b.expiresAt) : "—" })}
          </p>
        )}
        {b.status === "CANCELLED" && (
          <p className="text-sm text-ink-muted [overflow-wrap:anywhere]">
            {t(b.cancelledBy === "HOST" ? "stays.cancelledByHost" : "stays.cancelledByGuest")}
            {b.cancelReason ? ` — ${b.cancelReason}` : ""}
            {b.refundAmount ? ` · ${t("stays.refundDue", { amount: money(b.refundAmount) })}` : ""}
          </p>
        )}
        {b.review && (
          <ReviewReply review={b.review} />
        )}
        <div className="flex gap-2 flex-wrap pt-1">
          {b.status === "REQUESTED" && (
            <>
              <Button size="sm" onClick={() => setDialog("accept")} disabled={busy}>
                {t("stays.accept")}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setDialog("decline")} disabled={busy}>
                {t("stays.decline")}
              </Button>
            </>
          )}
          {b.status === "ACCEPTED" && (
            <>
              <Button size="sm" onClick={() => run(() => api.confirmBookingPayment(b.id), t("stays.paymentConfirmed"))} disabled={busy}>
                {t("stays.confirmPayment")}
              </Button>
              {b.paymentDeclaredAt && (
                <Button size="sm" variant="secondary" onClick={() => setDialog("reject")} disabled={busy}>
                  {t("stays.rejectPayment")}
                </Button>
              )}
            </>
          )}
          {(b.status === "ACCEPTED" || b.status === "CONFIRMED") && b.checkOut.slice(0, 10) > today && (
            <Button size="sm" variant="ghost" className="text-danger" onClick={() => setDialog("cancel")} disabled={busy}>
              {t("stays.cancel")}
            </Button>
          )}
        </div>
      </div>
      {dialog && (
        <Modal title={t(`stays.dialog.${dialog}.title`)} onClose={() => setDialog(null)}>
          <div className="space-y-3">
            <p className="text-sm text-ink-muted">{t(`stays.dialog.${dialog}.text`, { payMode: t(`stays.payMode.${b.paymentMode}`) })}</p>
            <Textarea rows={3} maxLength={1000} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t(`stays.dialog.${dialog}.ph`)} aria-label={t(`stays.dialog.${dialog}.ph`)} />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setDialog(null)}>
                {t("stays.back")}
              </Button>
              <Button onClick={confirmDialog} disabled={busy} variant={dialog === "cancel" || dialog === "decline" ? "secondary" : "primary"}>
                {t(`stays.dialog.${dialog}.confirm`)}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </article>
  );
}

function ReviewReply({ review }: { review: NonNullable<Booking["review"]> }) {
  const [reply, setReply] = React.useState("");
  const [done, setDone] = React.useState(review.reply);
  const [busy, setBusy] = React.useState(false);
  return (
    <div className="rounded-xl bg-cream-100/60 dark:bg-white/5 p-3 text-sm space-y-2">
      <div className="font-semibold">
        {t("stays.review", { rating: review.rating })} <span className="text-amber-500">{"★".repeat(review.rating)}</span>
      </div>
      <p className="[overflow-wrap:anywhere]">{review.comment}</p>
      {done ? (
        <p className="text-ink-muted [overflow-wrap:anywhere]">{t("stays.yourReply", { reply: done })}</p>
      ) : (
        <form
          className="space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (reply.trim().length < 2) return;
            setBusy(true);
            try {
              await api.replyStayReview(review.id, reply.trim());
              setDone(reply.trim());
              toast.success(t("stays.replied"));
            } catch (err) {
              toast.error(err);
            } finally {
              setBusy(false);
            }
          }}
        >
          <Textarea rows={2} maxLength={2000} value={reply} onChange={(e) => setReply(e.target.value)} placeholder={t("stays.replyPh")} aria-label={t("stays.replyPh")} />
          <Button size="sm" type="submit" disabled={busy}>
            {t("stays.reply")}
          </Button>
        </form>
      )}
    </div>
  );
}
