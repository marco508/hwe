import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

/**
 * Envoi d'e-mails de suivi (loyers, fins de bail).
 *
 * Sans SMTP_HOST configuré, les messages sont journalisés au lieu d'être
 * envoyés : le développement et les tests fonctionnent sans relais, et rien
 * ne casse en production tant que le SMTP n'est pas renseigné.
 *
 * Tous les envois sont « best effort » : un e-mail qui échoue ne doit jamais
 * faire échouer l'opération métier qui l'a déclenché.
 */
@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly config: ConfigService) {
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

  private get from(): string {
    return this.config.get<string>("SMTP_FROM") || "hwe <no-reply@hwe.local>";
  }

  async send(to: string, subject: string, text: string): Promise<void> {
    if (!to) return;
    if (!this.transporter) {
      this.logger.log(`(SMTP non configuré) À: ${to} — ${subject}\n${text}`);
      return;
    }
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, text });
      this.logger.log(`E-mail envoyé à ${to} : ${subject}`);
    } catch (e) {
      this.logger.error(`Échec d'envoi à ${to} : ${(e as Error).message}`);
    }
  }

  // ───────────────────────────── Loyers ─────────────────────────────

  rentDeclared(ownerEmail: string, ownerName: string, tenantName: string, periode: string, montant: number) {
    return this.send(
      ownerEmail,
      `hwe — loyer déclaré à vérifier (${periode})`,
      `Bonjour ${ownerName},\n\n${tenantName} déclare avoir versé ${montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })} pour le loyer de ${periode}.\n\n` +
        `Vérifiez la réception SUR VOTRE COMPTE (relevé de l'opérateur), pas seulement sur la capture jointe : ` +
        `une capture se falsifie, un relevé non.\n\nValidez ou refusez depuis votre espace propriétaire, rubrique Loyers.\n\nhwe`,
    );
  }

  rentValidated(tenantEmail: string, tenantName: string, periode: string, montant: number, receiptNo: string) {
    return this.send(
      tenantEmail,
      `hwe — quittance de loyer ${periode}`,
      `Bonjour ${tenantName},\n\nVotre paiement de ${montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })} pour ${periode} a été confirmé par votre propriétaire.\n` +
        `Votre quittance n° ${receiptNo} est disponible dans votre espace locataire, rubrique Mes loyers.\n\nhwe`,
    );
  }

  rentRejected(tenantEmail: string, tenantName: string, periode: string, motif: string) {
    return this.send(
      tenantEmail,
      `hwe — votre déclaration de loyer n'a pas été validée (${periode})`,
      `Bonjour ${tenantName},\n\nVotre propriétaire n'a pas pu confirmer la réception de votre versement pour ${periode}.\n` +
        (motif ? `Motif : ${motif}\n` : "") +
        `\nVérifiez le montant, le numéro utilisé et l'identifiant de transaction, puis déclarez à nouveau depuis Mes loyers.\n` +
        `Si vous êtes certain d'avoir payé, contactez votre propriétaire via la messagerie.\n\nhwe`,
    );
  }

  rentReminder(tenantEmail: string, tenantName: string, periode: string, montant: number, enRetard: boolean) {
    return this.send(
      tenantEmail,
      enRetard ? `hwe — loyer ${periode} en retard` : `hwe — loyer ${periode} à régler`,
      `Bonjour ${tenantName},\n\n` +
        (enRetard
          ? `Le loyer de ${periode} (${montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}) est arrivé à échéance et n'a pas encore été réglé.\n`
          : `Le loyer de ${periode} (${montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}) arrive à échéance.\n`) +
        `Les coordonnées de paiement de votre propriétaire et la déclaration de versement sont dans votre espace, rubrique Mes loyers.\n\nhwe`,
    );
  }

  // ─────────────────────────── Fins de bail ───────────────────────────

  leaseExpiry(to: string, name: string, propertyTitle: string, daysLeft: number, isOwner: boolean) {
    const quand = daysLeft <= 1 ? "demain" : `dans ${daysLeft} jours`;
    return this.send(
      to,
      `hwe — le bail de « ${propertyTitle} » se termine ${quand}`,
      `Bonjour ${name},\n\nLe bail ${isOwner ? "de votre bien" : "de votre logement"} « ${propertyTitle} » arrive à échéance ${quand}.\n` +
        (isOwner
          ? `Pensez à préparer le renouvellement, l'état des lieux de sortie ou la remise en location.\n`
          : `Rapprochez-vous de votre propriétaire pour le renouvellement ou l'état des lieux de sortie.\n`) +
        `\nhwe`,
    );
  }

  leaseExpired(to: string, name: string, propertyTitle: string, isOwner: boolean) {
    return this.send(
      to,
      `hwe — le bail de « ${propertyTitle} » est arrivé à échéance`,
      `Bonjour ${name},\n\nLe bail de « ${propertyTitle} » est arrivé à son terme et a été marqué comme expiré.\n` +
        (isOwner ? `Le bien peut être remis en location depuis votre espace.\n` : ``) +
        `\nhwe`,
    );
  }

  // ─────────────────────── Vérification d'e-mail ───────────────────────

  emailVerification(to: string, name: string, url: string) {
    return this.send(
      to,
      "hwe — confirmez votre adresse e-mail",
      `Bonjour ${name},\n\nConfirmez votre adresse e-mail pour activer toutes les fonctions de votre compte ` +
        `(publier, contacter, accéder à votre bail) :\n\n${url}\n\n` +
        `Ce lien est valable 48 heures. Si vous n'avez pas créé de compte hwe, ignorez cet e-mail.\n\nhwe`,
    );
  }

  // ─────────────────────── Demandes & messages ───────────────────────

  inquiryReceived(ownerEmail: string, ownerName: string, propertyTitle: string, senderName: string, url: string) {
    return this.send(
      ownerEmail,
      `hwe — nouvelle demande pour « ${propertyTitle} »`,
      `Bonjour ${ownerName},\n\n${senderName} vous a envoyé une demande pour « ${propertyTitle} ».\n` +
        `Répondez-lui depuis votre espace :\n\n${url}\n\nhwe`,
    );
  }

  messageReceived(to: string, name: string, senderName: string, propertyTitle: string, url: string) {
    return this.send(
      to,
      `hwe — nouveau message de ${senderName}`,
      `Bonjour ${name},\n\n${senderName} vous a écrit au sujet de « ${propertyTitle} ».\n` +
        `Répondez depuis votre messagerie :\n\n${url}\n\nhwe`,
    );
  }

  // ─────────────────────── Tickets (incidents) ───────────────────────

  ticketOpened(ownerEmail: string, ownerName: string, propertyTitle: string, title: string, url: string) {
    return this.send(
      ownerEmail,
      `hwe — incident signalé sur « ${propertyTitle} »`,
      `Bonjour ${ownerName},\n\nVotre locataire a signalé un incident : « ${title} ».\n` +
        `Consultez et traitez la demande :\n\n${url}\n\nhwe`,
    );
  }

  ticketResolved(tenantEmail: string, tenantName: string, title: string) {
    return this.send(
      tenantEmail,
      `hwe — incident résolu : « ${title} »`,
      `Bonjour ${tenantName},\n\nVotre incident « ${title} » a été marqué comme résolu par le propriétaire.\n\nhwe`,
    );
  }


  // ─────────── Préavis, avenants, visites ───────────

  noticeGiven(ownerEmail: string, ownerName: string, propertyTitle: string, tenantName: string, effectiveDate: Date) {
    return this.send(
      ownerEmail,
      `hwe — préavis reçu pour « ${propertyTitle} »`,
      `Bonjour ${ownerName},\n\n${tenantName} a donné son préavis. Fin de bail effective le ${effectiveDate.toLocaleDateString("fr-FR")}.\n` +
        `Pensez à planifier l'état des lieux de sortie et la restitution de la caution.\n\nhwe`,
    );
  }

  amendmentCreated(tenantEmail: string, tenantName: string, propertyTitle: string, url: string) {
    return this.send(
      tenantEmail,
      `hwe — avenant à signer pour « ${propertyTitle} »`,
      `Bonjour ${tenantName},\n\nVotre propriétaire propose un avenant à votre bail (loyer, charges ou durée).\n` +
        `Il ne s'applique qu'après votre signature :\n\n${url}\n\nhwe`,
    );
  }

  amendmentSigned(ownerEmail: string, ownerName: string, propertyTitle: string) {
    return this.send(
      ownerEmail,
      `hwe — avenant signé (« ${propertyTitle} »)`,
      `Bonjour ${ownerName},\n\nVotre locataire a signé l'avenant : il est maintenant appliqué au bail.\n\nhwe`,
    );
  }

  visitRequested(ownerEmail: string, ownerName: string, propertyTitle: string, requesterName: string, date: Date, url: string) {
    return this.send(
      ownerEmail,
      `hwe — demande de visite pour « ${propertyTitle} »`,
      `Bonjour ${ownerName},\n\n${requesterName} propose de visiter « ${propertyTitle} » le ` +
        `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}.\n` +
        `Confirmez ou proposez autre chose :\n\n${url}\n\nhwe`,
    );
  }

  visitAnswered(to: string, name: string, propertyTitle: string, date: Date, confirmed: boolean, note?: string) {
    return this.send(
      to,
      confirmed
        ? `hwe — visite confirmée (« ${propertyTitle} »)`
        : `hwe — visite non retenue (« ${propertyTitle} »)`,
      `Bonjour ${name},\n\n` +
        (confirmed
          ? `Votre visite de « ${propertyTitle} » est confirmée le ${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}.\n`
          : `Le propriétaire n'a pas retenu ce créneau pour « ${propertyTitle} ».\n`) +
        (note ? `Message : ${note}\n` : "") +
        `\nhwe`,
    );
  }


  ownerNoticeGiven(tenantEmail: string, tenantName: string, propertyTitle: string, reason: string, effectiveDate: Date) {
    const motifs: Record<string, string> = {
      SALE: "mise en vente du logement",
      REPOSSESSION: "reprise du logement",
      OTHER: "motif légitime et sérieux",
    };
    return this.send(
      tenantEmail,
      `hwe — congé donné par votre propriétaire (« ${propertyTitle} »)`,
      `Bonjour ${tenantName},\n\nVotre propriétaire vous donne congé pour ${motifs[reason] ?? "motif légitime"}.\n` +
        `Fin de bail effective le ${effectiveDate.toLocaleDateString("fr-FR")}.\n` +
        `Les détails sont dans votre espace, rubrique Ma location.\n\nhwe`,
    );
  }

  chargeRegularization(tenantEmail: string, tenantName: string, propertyTitle: string, periodLabel: string, balance: number) {
    const fmt = Math.abs(balance).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
    return this.send(
      tenantEmail,
      `hwe — régularisation des charges ${periodLabel} (« ${propertyTitle} »)`,
      `Bonjour ${tenantName},\n\nVotre propriétaire a régularisé les charges de la période ${periodLabel}.\n` +
        (balance > 0
          ? `Complément à verser : ${fmt}.\n`
          : balance < 0
            ? `Trop-perçu à vous rembourser : ${fmt}.\n`
            : `Provisions et charges réelles s'équilibrent — rien à régler.\n`) +
        `Le détail est dans votre espace, rubrique Ma location.\n\nhwe`,
    );
  }

  // ─────────────────────── Réinitialisation de mot de passe ───────────────────────

  passwordReset(to: string, name: string, url: string) {
    return this.send(
      to,
      "hwe — réinitialisation de votre mot de passe",
      `Bonjour ${name},\n\nVous avez demandé à réinitialiser votre mot de passe. ` +
        `Ouvrez ce lien (valable 30 minutes, utilisable une seule fois) pour définir un nouveau mot de passe :\n\n${url}\n\n` +
        `Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail — votre mot de passe reste inchangé.\n\nhwe`,
    );
  }
}
