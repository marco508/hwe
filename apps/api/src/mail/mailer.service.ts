import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { maskEmail } from "../common/email.util";
import { PrismaService } from "../prisma/prisma.service";
import { asLang, type Lang } from "../i18n/i18n";
import * as tpl from "./templates";
import type { MailContent, NoticeParams, Period } from "./templates";

/**
 * Envoi d'e-mails de suivi (loyers, fins de bail).
 *
 * Sans SMTP_HOST configuré, rien n'est envoyé : on journalise seulement le
 * destinataire MASQUÉ et le sujet — jamais le texte, qui contient des liens
 * de réinitialisation et de vérification (quiconque lisait les logs pouvait
 * prendre la main sur un compte). En production, un avertissement clair est
 * émis au démarrage et l'état est visible dans GET /admin/overview.
 *
 * Tous les envois sont « best effort » : un e-mail qui échoue ne doit jamais
 * faire échouer l'opération métier qui l'a déclenché.
 *
 * Langue : celle du DESTINATAIRE (User.locale, retrouvé par e-mail), fr par
 * défaut ; pour une adresse sans compte ou sans langue choisie, `fallback`
 * (langue de l'expéditeur : invitation d'agent, propriétaire invité).
 * Textes : mail/templates.ts + i18n/locales/<langue>.json (`mail.*`).
 */
@Injectable()
export class MailerService implements OnModuleInit {
  private readonly logger = new Logger(MailerService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const host = this.config.get<string>("SMTP_HOST");
    if (host) {
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(this.config.get("SMTP_PORT")) || 587,
        secure: Number(this.config.get("SMTP_PORT")) === 465,
        auth: this.config.get("SMTP_USER")
          ? {
              user: this.config.get<string>("SMTP_USER"),
              pass: this.config.get<string>("SMTP_PASS"),
            }
          : undefined,
        // Bornes : un relais qui ne répond plus ne doit pas accumuler des
        // connexions ouvertes ni bloquer les tâches planifiées.
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      });
    }
  }

  onModuleInit() {
    if (!this.transporter && process.env.NODE_ENV === "production") {
      this.logger.warn(
        "⚠️  SMTP NON CONFIGURÉ (SMTP_HOST absent) : AUCUN e-mail ne part — vérification de compte, " +
          "réinitialisation de mot de passe, relances de loyer. Renseignez SMTP_HOST/SMTP_USER/SMTP_PASS/SMTP_FROM.",
      );
    }
  }

  /** Vrai si un relais SMTP est configuré (exposé dans GET /admin/overview). */
  get isConfigured(): boolean {
    return this.transporter !== null;
  }

  private get from(): string {
    return this.config.get<string>("SMTP_FROM") || "hwe <no-reply@hwe.local>";
  }

  async send(to: string, subject: string, text: string): Promise<void> {
    if (!to) return;
    if (!this.transporter) {
      // Jamais le corps : il peut contenir un lien de réinitialisation.
      void text;
      this.logger.log(`(SMTP non configuré, non envoyé) À: ${maskEmail(to)} — ${subject}`);
      return;
    }
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, text });
      this.logger.log(`E-mail envoyé à ${maskEmail(to)} : ${subject}`);
    } catch (e) {
      this.logger.error(`Échec d'envoi à ${maskEmail(to)} : ${(e as Error).message}`);
    }
  }

  /** Langue du destinataire : User.locale (e-mail insensible à la casse), sinon `fallback`, sinon fr. */
  async langOf(email: string, fallback?: Lang | string | null): Promise<Lang> {
    let locale: string | null = null;
    try {
      const u = await this.prisma.user.findFirst({
        where: { email: { equals: email.trim(), mode: "insensitive" } },
        select: { locale: true },
      });
      locale = u?.locale ?? null;
    } catch {
      /* best effort : langue par défaut */
    }
    return asLang(locale ?? fallback ?? null, "fr");
  }

  /** Langue préférée d'un utilisateur (par id), null s'il n'en a pas choisi. */
  async userLang(userId: string | null | undefined): Promise<Lang | null> {
    if (!userId) return null;
    const u = await this.prisma.user.findUnique({ where: { id: userId }, select: { locale: true } }).catch(() => null);
    return u?.locale ? asLang(u.locale) : null;
  }

  private async deliver(to: string, build: (lang: Lang) => MailContent, fallback?: Lang | string | null) {
    if (!to) return;
    const { subject, text } = build(await this.langOf(to, fallback));
    return this.send(to, subject, text);
  }

  // ───────────────────────────── Loyers ─────────────────────────────

  rentDeclared(ownerEmail: string, ownerName: string, tenantName: string, period: Period, amount: number, currency = "EUR") {
    return this.deliver(ownerEmail, (l) => tpl.rentDeclared(l, { ownerName, tenantName, period, amount, currency }));
  }

  rentValidated(tenantEmail: string, tenantName: string, period: Period, amount: number, receiptNo: string, currency = "EUR") {
    return this.deliver(tenantEmail, (l) => tpl.rentValidated(l, { tenantName, period, amount, receiptNo, currency }));
  }

  rentRejected(tenantEmail: string, tenantName: string, period: Period, reason: string) {
    return this.deliver(tenantEmail, (l) => tpl.rentRejected(l, { tenantName, period, reason }));
  }

  rentReminder(tenantEmail: string, tenantName: string, period: Period, amount: number, late: boolean, currency = "EUR") {
    return this.deliver(tenantEmail, (l) => tpl.rentReminder(l, { tenantName, period, amount, late, currency }));
  }

  // ─────────────────────────── Fins de bail ───────────────────────────

  leaseExpiry(to: string, name: string, propertyTitle: string, daysLeft: number, isOwner: boolean) {
    return this.deliver(to, (l) => tpl.leaseExpiry(l, { name, propertyTitle, daysLeft, isOwner }));
  }

  leaseExpired(to: string, name: string, propertyTitle: string, isOwner: boolean) {
    return this.deliver(to, (l) => tpl.leaseExpired(l, { name, propertyTitle, isOwner }));
  }

  // ─────────────────────── Compte ───────────────────────

  emailVerification(to: string, name: string, url: string) {
    return this.deliver(to, (l) => tpl.emailVerification(l, { name, url }));
  }

  passwordReset(to: string, name: string, url: string) {
    return this.deliver(to, (l) => tpl.passwordReset(l, { name, url }));
  }

  // ─────────────────────── Demandes & messages ───────────────────────

  /** `senderName` null : « Un visiteur » dans la langue du destinataire. */
  inquiryReceived(ownerEmail: string, ownerName: string, propertyTitle: string, senderName: string | null, url: string) {
    return this.deliver(ownerEmail, (l) => tpl.inquiryReceived(l, { ownerName, propertyTitle, senderName, url }));
  }

  messageReceived(to: string, name: string, senderName: string, propertyTitle: string, url: string) {
    return this.deliver(to, (l) => tpl.messageReceived(l, { name, senderName, propertyTitle, url }));
  }

  // ─────────────────────── Tickets (incidents) ───────────────────────

  ticketOpened(ownerEmail: string, ownerName: string, propertyTitle: string, title: string, url: string) {
    return this.deliver(ownerEmail, (l) => tpl.ticketOpened(l, { ownerName, propertyTitle, title, url }));
  }

  ticketResolved(tenantEmail: string, tenantName: string, title: string) {
    return this.deliver(tenantEmail, (l) => tpl.ticketResolved(l, { tenantName, title }));
  }

  // ─────────── Préavis, avenants, visites ───────────

  noticeGiven(ownerEmail: string, ownerName: string, propertyTitle: string, tenantName: string, effectiveDate: Date) {
    return this.deliver(ownerEmail, (l) => tpl.noticeGiven(l, { ownerName, propertyTitle, tenantName, effectiveDate }));
  }

  amendmentCreated(tenantEmail: string, tenantName: string, propertyTitle: string, url: string) {
    return this.deliver(tenantEmail, (l) => tpl.amendmentCreated(l, { tenantName, propertyTitle, url }));
  }

  amendmentSigned(ownerEmail: string, ownerName: string, propertyTitle: string) {
    return this.deliver(ownerEmail, (l) => tpl.amendmentSigned(l, { ownerName, propertyTitle }));
  }

  visitRequested(ownerEmail: string, ownerName: string, propertyTitle: string, requesterName: string, date: Date, url: string) {
    return this.deliver(ownerEmail, (l) => tpl.visitRequested(l, { ownerName, propertyTitle, requesterName, date, url }));
  }

  visitAnswered(to: string, name: string, propertyTitle: string, date: Date, confirmed: boolean, note?: string) {
    return this.deliver(to, (l) => tpl.visitAnswered(l, { name, propertyTitle, date, confirmed, note }));
  }

  ownerNoticeGiven(tenantEmail: string, tenantName: string, propertyTitle: string, reason: string, effectiveDate: Date) {
    return this.deliver(tenantEmail, (l) => tpl.ownerNoticeGiven(l, { tenantName, propertyTitle, reason, effectiveDate }));
  }

  chargeRegularization(tenantEmail: string, tenantName: string, propertyTitle: string, periodLabel: string, balance: number, currency = "EUR") {
    return this.deliver(tenantEmail, (l) => tpl.chargeRegularization(l, { tenantName, propertyTitle, periodLabel, balance, currency }));
  }

  // ─────────────────────── Séjours courte durée ───────────────────────

  bookingEvent(
    to: string,
    name: string,
    kind: string,
    d: Omit<Parameters<typeof tpl.bookingEvent>[1], "name" | "kind">,
  ) {
    return this.deliver(to, (l) => tpl.bookingEvent(l, { ...d, name, kind }));
  }

  // ─────────────────────── Professionnels (agences, mandats) ───────────────────────

  /** `fallback` : langue de l'invitant (l'adresse n'a souvent pas encore de compte). */
  agencyInvite(to: string, agencyName: string, inviterName: string, url: string, fallback?: Lang | null) {
    return this.deliver(to, (l) => tpl.agencyInvite(l, { agencyName, inviterName, url }), fallback);
  }

  /** `fallback` : langue du professionnel qui a créé le compte (propriétaire invité sans langue). */
  ownerInvite(to: string, name: string, agencyName: string, propertyTitles: string[], url: string, fallback?: Lang | null) {
    return this.deliver(to, (l) => tpl.ownerInvite(l, { name, agencyName, propertyTitles, url }), fallback);
  }

  /** `propertyTitles` null : demande de mandat sans bien désigné (« un ou plusieurs de vos biens »). */
  mandateProposed(to: string, name: string, agencyName: string, propertyTitles: string[] | null, url: string) {
    return this.deliver(to, (l) => tpl.mandateProposed(l, { name, agencyName, propertyTitles, url }));
  }

  /** Avis de mandat : `kind` = accepted | rejected | endedByOwner | endedByAgency | entrusted | requestAccepted. */
  mandateUpdate(to: string, name: string, kind: string, params: NoticeParams, url: string) {
    return this.deliver(to, (l) => tpl.notice(l, { name, base: `mandate.${kind}`, params, url }));
  }

  candidateProposed(
    ownerEmail: string,
    ownerName: string,
    propertyTitle: string,
    candidateName: string,
    agencyName: string,
    note: string | null,
    url: string,
  ) {
    return this.deliver(ownerEmail, (l) => tpl.candidateProposed(l, { ownerName, propertyTitle, candidateName, agencyName, note, url }));
  }

  // ─────────────────────── Abonnement des professionnels ───────────────────────

  /**
   * Rappels et décisions d'abonnement (envoyés aux responsables de l'agence) :
   * `kind` = reminderDays | grace | free | suspended | approved | rejected |
   * adminSuspended | adminReactivated | recorded (clés `mail.sub.<kind>.*`).
   */
  subscriptionNotice(to: string, name: string, kind: string, params: NoticeParams, url: string) {
    return this.deliver(to, (l) => tpl.notice(l, { name, base: `sub.${kind}`, params, url }));
  }
}
