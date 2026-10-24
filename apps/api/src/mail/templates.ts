import { APP_TIME_ZONE } from "../common/dates";
import { longDay, money, monthYear, shortDate, shortTime, t, type Lang } from "../i18n/i18n";

/**
 * Gabarits des e-mails (fonctions pures, testées) : sujet + texte dans la
 * langue du destinataire. Textes dans i18n/locales/<langue>.json (`mail.*`).
 * Structure commune : « Bonjour X, » / corps / « hwe ».
 */

export interface MailContent {
  subject: string;
  text: string;
}

type P = Record<string, string | number | null | undefined>;

/** Lignes jointes par « \n » (null/false ignorés, "" = ligne vide). */
function lines(...parts: (string | null | false | undefined)[]): string {
  return parts.filter((p): p is string => typeof p === "string").join("\n");
}

function compose(lang: Lang, name: string | null, body: string): string {
  const greeting = name ? t(lang, "mail.greeting", { name }) : t(lang, "mail.greetingAnon");
  return `${greeting}\n\n${body}\n\n${t(lang, "mail.signature")}`;
}

function subject(lang: Lang, key: string, params?: P): string {
  return `hwe — ${t(lang, key, params)}`;
}

/** Échéance de loyer (année, mois 1..12) → « octobre 2026 ». */
export interface Period {
  year: number;
  month: number;
}

function period(lang: Lang, p: Period): string {
  return monthYear(lang, p.year, p.month);
}

const quoted = (lang: Lang, text: string) => t(lang, "mail.quoted", { text });

// ───────────────────────────── Loyers ─────────────────────────────

export function rentDeclared(lang: Lang, d: { ownerName: string; tenantName: string; period: Period; amount: number; currency: string }): MailContent {
  const p = { tenant: d.tenantName, amount: money(lang, d.amount, d.currency), period: period(lang, d.period) };
  return {
    subject: subject(lang, "mail.rentDeclared.subject", p),
    text: compose(lang, d.ownerName, lines(t(lang, "mail.rentDeclared.l1", p), "", t(lang, "mail.rentDeclared.l2"), "", t(lang, "mail.rentDeclared.l3"))),
  };
}

export function rentValidated(lang: Lang, d: { tenantName: string; period: Period; amount: number; receiptNo: string; currency: string }): MailContent {
  const p = { amount: money(lang, d.amount, d.currency), period: period(lang, d.period), receipt: d.receiptNo };
  return {
    subject: subject(lang, "mail.rentValidated.subject", p),
    text: compose(lang, d.tenantName, lines(t(lang, "mail.rentValidated.l1", p), t(lang, "mail.rentValidated.l2", p))),
  };
}

export function rentRejected(lang: Lang, d: { tenantName: string; period: Period; reason: string }): MailContent {
  const p = { period: period(lang, d.period), reason: d.reason };
  return {
    subject: subject(lang, "mail.rentRejected.subject", p),
    text: compose(
      lang,
      d.tenantName,
      lines(t(lang, "mail.rentRejected.l1", p), d.reason ? t(lang, "mail.reason", p) : null, "", t(lang, "mail.rentRejected.l2"), t(lang, "mail.rentRejected.l3")),
    ),
  };
}

export function rentReminder(lang: Lang, d: { tenantName: string; period: Period; amount: number; late: boolean; currency: string }): MailContent {
  const p = { period: period(lang, d.period), amount: money(lang, d.amount, d.currency) };
  const k = d.late ? "late" : "due";
  return {
    subject: subject(lang, `mail.rentReminder.subject.${k}`, p),
    text: compose(lang, d.tenantName, lines(t(lang, `mail.rentReminder.l1.${k}`, p), t(lang, "mail.rentReminder.l2"))),
  };
}

// ─────────────────────────── Fins de bail ───────────────────────────

export function leaseExpiry(lang: Lang, d: { name: string; propertyTitle: string; daysLeft: number; isOwner: boolean }): MailContent {
  const when =
    d.daysLeft <= 0 ? t(lang, "mail.when.today") : d.daysLeft === 1 ? t(lang, "mail.when.tomorrow") : t(lang, "mail.when.inDays", { count: d.daysLeft });
  const p = { title: d.propertyTitle, when };
  const who = d.isOwner ? "owner" : "tenant";
  return {
    subject: subject(lang, "mail.leaseExpiry.subject", p),
    text: compose(lang, d.name, lines(t(lang, `mail.leaseExpiry.l1.${who}`, p), t(lang, `mail.leaseExpiry.l2.${who}`))),
  };
}

export function leaseExpired(lang: Lang, d: { name: string; propertyTitle: string; isOwner: boolean }): MailContent {
  const p = { title: d.propertyTitle };
  return {
    subject: subject(lang, "mail.leaseExpired.subject", p),
    text: compose(lang, d.name, lines(t(lang, "mail.leaseExpired.l1", p), d.isOwner && t(lang, "mail.leaseExpired.l2.owner"))),
  };
}

// ─────────────────────── Compte ───────────────────────

export function emailVerification(lang: Lang, d: { name: string; url: string }): MailContent {
  return {
    subject: subject(lang, "mail.emailVerification.subject"),
    text: compose(lang, d.name, lines(t(lang, "mail.emailVerification.l1"), "", d.url, "", t(lang, "mail.emailVerification.l2"))),
  };
}

export function passwordReset(lang: Lang, d: { name: string; url: string }): MailContent {
  return {
    subject: subject(lang, "mail.passwordReset.subject"),
    text: compose(lang, d.name, lines(t(lang, "mail.passwordReset.l1"), "", d.url, "", t(lang, "mail.passwordReset.l2"))),
  };
}

// ─────────────────────── Demandes & messages ───────────────────────

export function inquiryReceived(lang: Lang, d: { ownerName: string; propertyTitle: string; senderName: string | null; url: string }): MailContent {
  const p = { title: d.propertyTitle, sender: d.senderName || t(lang, "mail.someVisitor") };
  return {
    subject: subject(lang, "mail.inquiryReceived.subject", p),
    text: compose(lang, d.ownerName, lines(t(lang, "mail.inquiryReceived.l1", p), t(lang, "mail.inquiryReceived.l2"), "", d.url)),
  };
}

export function messageReceived(lang: Lang, d: { name: string; senderName: string; propertyTitle: string; url: string }): MailContent {
  const p = { sender: d.senderName, title: d.propertyTitle };
  return {
    subject: subject(lang, "mail.messageReceived.subject", p),
    text: compose(lang, d.name, lines(t(lang, "mail.messageReceived.l1", p), t(lang, "mail.messageReceived.l2"), "", d.url)),
  };
}

// ─────────────────────── Incidents ───────────────────────

export function ticketOpened(lang: Lang, d: { ownerName: string; propertyTitle: string; title: string; url: string }): MailContent {
  const p = { title: d.propertyTitle, ticket: d.title };
  return {
    subject: subject(lang, "mail.ticketOpened.subject", p),
    text: compose(lang, d.ownerName, lines(t(lang, "mail.ticketOpened.l1", p), t(lang, "mail.ticketOpened.l2"), "", d.url)),
  };
}

export function ticketResolved(lang: Lang, d: { tenantName: string; title: string }): MailContent {
  const p = { ticket: d.title };
  return {
    subject: subject(lang, "mail.ticketResolved.subject", p),
    text: compose(lang, d.tenantName, t(lang, "mail.ticketResolved.l1", p)),
  };
}

// ─────────── Préavis, avenants, visites, congé, régularisation ───────────

export function noticeGiven(lang: Lang, d: { ownerName: string; propertyTitle: string; tenantName: string; effectiveDate: Date }): MailContent {
  const p = { title: d.propertyTitle, tenant: d.tenantName, date: longDay(lang, d.effectiveDate) };
  return {
    subject: subject(lang, "mail.noticeGiven.subject", p),
    text: compose(lang, d.ownerName, lines(t(lang, "mail.noticeGiven.l1", p), t(lang, "mail.noticeGiven.l2"))),
  };
}

export function amendmentCreated(lang: Lang, d: { tenantName: string; propertyTitle: string; url: string }): MailContent {
  const p = { title: d.propertyTitle };
  return {
    subject: subject(lang, "mail.amendmentCreated.subject", p),
    text: compose(lang, d.tenantName, lines(t(lang, "mail.amendmentCreated.l1"), t(lang, "mail.amendmentCreated.l2"), "", d.url)),
  };
}

export function amendmentSigned(lang: Lang, d: { ownerName: string; propertyTitle: string }): MailContent {
  const p = { title: d.propertyTitle };
  return {
    subject: subject(lang, "mail.amendmentSigned.subject", p),
    text: compose(lang, d.ownerName, t(lang, "mail.amendmentSigned.l1")),
  };
}

export function visitRequested(lang: Lang, d: { ownerName: string; propertyTitle: string; requesterName: string; date: Date; url: string }): MailContent {
  const p = {
    title: d.propertyTitle,
    requester: d.requesterName,
    date: shortDate(lang, d.date, APP_TIME_ZONE),
    time: shortTime(lang, d.date, APP_TIME_ZONE),
  };
  return {
    subject: subject(lang, "mail.visitRequested.subject", p),
    text: compose(lang, d.ownerName, lines(t(lang, "mail.visitRequested.l1", p), t(lang, "mail.visitRequested.l2"), "", d.url)),
  };
}

export function visitAnswered(lang: Lang, d: { name: string; propertyTitle: string; date: Date; confirmed: boolean; note?: string }): MailContent {
  const k = d.confirmed ? "confirmed" : "declined";
  const p = { title: d.propertyTitle, date: shortDate(lang, d.date, APP_TIME_ZONE), time: shortTime(lang, d.date, APP_TIME_ZONE), note: d.note };
  return {
    subject: subject(lang, `mail.visitAnswered.subject.${k}`, p),
    text: compose(lang, d.name, lines(t(lang, `mail.visitAnswered.l1.${k}`, p), d.note ? t(lang, "mail.visitAnswered.note", p) : null)),
  };
}

export function ownerNoticeGiven(lang: Lang, d: { tenantName: string; propertyTitle: string; reason: string; effectiveDate: Date }): MailContent {
  const known = ["SALE", "REPOSSESSION", "OTHER"].includes(d.reason);
  const p = {
    title: d.propertyTitle,
    reason: t(lang, `mail.ownerNoticeGiven.reason.${known ? d.reason : "DEFAULT"}`),
    date: longDay(lang, d.effectiveDate),
  };
  return {
    subject: subject(lang, "mail.ownerNoticeGiven.subject", p),
    text: compose(lang, d.tenantName, lines(t(lang, "mail.ownerNoticeGiven.l1", p), t(lang, "mail.ownerNoticeGiven.l2", p), t(lang, "mail.ownerNoticeGiven.l3"))),
  };
}

export function chargeRegularization(
  lang: Lang,
  d: { tenantName: string; propertyTitle: string; periodLabel: string; balance: number; currency: string },
): MailContent {
  const p = { title: d.propertyTitle, period: d.periodLabel, amount: money(lang, Math.abs(d.balance), d.currency) };
  const k = d.balance > 0 ? "due" : d.balance < 0 ? "refund" : "even";
  return {
    subject: subject(lang, "mail.chargeRegularization.subject", p),
    text: compose(
      lang,
      d.tenantName,
      lines(t(lang, "mail.chargeRegularization.l1", p), t(lang, `mail.chargeRegularization.balance.${k}`, p), t(lang, "mail.chargeRegularization.l3")),
    ),
  };
}

// ─────────────────────── Professionnels ───────────────────────

export function agencyInvite(lang: Lang, d: { agencyName: string; inviterName: string; url: string }): MailContent {
  const p = { agency: d.agencyName, inviter: d.inviterName };
  return {
    subject: subject(lang, "mail.agencyInvite.subject", p),
    text: compose(lang, null, lines(t(lang, "mail.agencyInvite.l1", p), t(lang, "mail.agencyInvite.l2"), "", d.url, "", t(lang, "mail.agencyInvite.l3"))),
  };
}

export function ownerInvite(lang: Lang, d: { name: string; agencyName: string; propertyTitles: string[]; url: string }): MailContent {
  const properties = d.propertyTitles.length
    ? d.propertyTitles.map((x) => quoted(lang, x)).join(", ")
    : t(lang, "mail.ownerInvite.yourProperty");
  const p = { agency: d.agencyName, properties };
  return {
    subject: subject(lang, "mail.ownerInvite.subject", p),
    text: compose(lang, d.name, lines(t(lang, "mail.ownerInvite.l1", p), t(lang, "mail.ownerInvite.l2"), "", d.url, "", t(lang, "mail.ownerInvite.l3"))),
  };
}

/** `propertyTitles` null : demande de mandat sans bien désigné. */
export function mandateProposed(lang: Lang, d: { name: string; agencyName: string; propertyTitles: string[] | null; url: string }): MailContent {
  const what = d.propertyTitles ? d.propertyTitles.map((x) => quoted(lang, x)).join(", ") : t(lang, "mail.mandateProposed.anyProperty");
  const p = { agency: d.agencyName, what };
  return {
    subject: subject(lang, "mail.mandateProposed.subject", p),
    text: compose(lang, d.name, lines(t(lang, "mail.mandateProposed.l1", p), t(lang, "mail.mandateProposed.l2"), "", d.url)),
  };
}

export function candidateProposed(
  lang: Lang,
  d: { ownerName: string; propertyTitle: string; candidateName: string; agencyName: string; note: string | null; url: string },
): MailContent {
  const p = { title: d.propertyTitle, candidate: d.candidateName, agency: d.agencyName, note: d.note };
  return {
    subject: subject(lang, "mail.candidateProposed.subject", p),
    text: compose(
      lang,
      d.ownerName,
      lines(t(lang, "mail.candidateProposed.l1", p), d.note ? t(lang, "mail.candidateProposed.note", p) : null, t(lang, "mail.candidateProposed.l2"), "", d.url),
    ),
  };
}

export type NoticeParams = Record<string, string | number | Date | null | undefined>;

/**
 * Avis « sujet + phrase + lien » (mandats, abonnement) : clés
 * `mail.<base>.subject` et `mail.<base>.body` (familles plurielles choisies par `count`, sinon `n` ou `months`).
 * Les dates des paramètres sont formatées dans la langue (jj/mm/aaaa, fuseau de la plateforme).
 */
export function notice(lang: Lang, d: { name: string; base: string; params: NoticeParams; url: string }): MailContent {
  const p: P = {};
  for (const [k, v] of Object.entries(d.params)) p[k] = v instanceof Date ? shortDate(lang, v, APP_TIME_ZONE) : v;
  // Pluriel (Intl.PluralRules) : `count` = nombre de jours (`n`) ou de mois (`months`).
  if (p.count === undefined) {
    const c = typeof d.params.n === "number" ? d.params.n : typeof d.params.months === "number" ? d.params.months : undefined;
    if (c !== undefined) p.count = c;
  }
  return {
    subject: subject(lang, `mail.${d.base}.subject`, p),
    text: compose(lang, d.name, `${t(lang, `mail.${d.base}.body`, p)}\n\n${d.url}`),
  };
}
