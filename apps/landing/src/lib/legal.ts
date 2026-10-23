/**
 * Contenu des pages légales (U5) — FR et EN.
 *
 * Texte générique pour une plateforme de MISE EN RELATION qui ne détient
 * aucun fonds. Toute information réelle encore inconnue est signalée par le
 * jeton `{{TODO}}`, rendu comme un marqueur visible « [À compléter] » :
 * aucune identité n'est inventée. À faire relire par un juriste avant mise
 * en production.
 */

export type LegalDocId = "legal" | "terms" | "privacy";

/** Bloc : paragraphe (string) ou liste à puces (string[]). */
export type LegalBlock = string | string[];

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const TODO = "{{TODO}}";

const fr: Record<LegalDocId, LegalDoc> = {
  legal: {
    title: "Mentions légales",
    intro:
      "Informations relatives à l'éditeur et à l'hébergeur du site hwe, conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).",
    sections: [
      {
        id: "editeur",
        title: "Éditeur du site",
        blocks: [
          [
            `Raison sociale : ${TODO}`,
            `Forme juridique et capital social : ${TODO}`,
            `Siège social : ${TODO}`,
            `Immatriculation (RCS / SIREN) : ${TODO}`,
            `Numéro de TVA intracommunautaire : ${TODO}`,
          ],
        ],
      },
      {
        id: "publication",
        title: "Directeur de la publication",
        blocks: [`Directeur ou directrice de la publication : ${TODO}`],
      },
      {
        id: "hebergeur",
        title: "Hébergement",
        blocks: [[`Hébergeur : ${TODO}`, `Adresse de l'hébergeur : ${TODO}`, `Contact de l'hébergeur : ${TODO}`]],
      },
      {
        id: "contact",
        title: "Contact",
        blocks: [
          "Pour toute question relative au site, à un contenu publié ou à vos données personnelles, vous pouvez nous écrire :",
          [`Adresse e-mail : ${TODO}`, `Téléphone : ${TODO}`, `Adresse postale : ${TODO}`],
          "Pour signaler une annonce ou un message illicite, indiquez le lien de la page concernée et la raison de votre signalement.",
        ],
      },
      {
        id: "service",
        title: "Nature du service",
        blocks: [
          "hwe est une plateforme de mise en relation entre propriétaires et candidats locataires ou acheteurs. Elle met à disposition des outils : publication d'annonces, messagerie, demandes de visite, modèles de bail, états des lieux, suivi des loyers et quittances.",
          "hwe n'est ni une agence immobilière, ni un administrateur de biens, ni un conseil juridique. La plateforme ne perçoit, ne détient et ne transfère aucune somme : loyers, cautions et prix de vente sont réglés directement entre les parties.",
        ],
      },
      {
        id: "propriete",
        title: "Propriété intellectuelle",
        blocks: [
          "La structure du site, sa charte graphique, ses textes, logos et logiciels sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation sans autorisation écrite est interdite.",
          "Les annonces, photos et messages restent la propriété de leurs auteurs, qui concèdent à hwe le droit de les afficher sur la plateforme pour les besoins du service.",
        ],
      },
      {
        id: "responsabilite",
        title: "Responsabilité",
        blocks: [
          "Les annonces sont publiées sous la seule responsabilité des utilisateurs qui les rédigent. hwe ne garantit ni l'exactitude des informations publiées, ni l'issue d'une location ou d'une vente.",
          "hwe s'efforce d'assurer l'accès au site en continu mais ne peut être tenue responsable d'une interruption, d'une erreur technique ou d'un dommage résultant de l'utilisation du site.",
        ],
      },
    ],
  },

  terms: {
    title: "Conditions générales d'utilisation",
    intro:
      "Les présentes conditions encadrent l'utilisation de la plateforme hwe (site vitrine, espace locataire et espace propriétaire). En créant un compte, vous les acceptez.",
    sections: [
      {
        id: "objet",
        title: "1. Objet",
        blocks: [
          "hwe met en relation des propriétaires qui proposent un bien à la location ou à la vente et des personnes qui recherchent un logement ou souhaitent acheter. La plateforme fournit des outils de publication, de messagerie et de gestion locative.",
          "hwe n'intervient pas dans la négociation, ne représente aucune des parties et n'est pas partie aux contrats conclus entre utilisateurs.",
        ],
      },
      {
        id: "comptes",
        title: "2. Inscription et comptes",
        blocks: [
          "L'inscription est gratuite. Deux types de comptes existent :",
          [
            "compte propriétaire : publication d'annonces, réponse aux demandes, préparation et signature des baux, suivi des loyers ;",
            "compte locataire / acheteur : recherche, favoris, demandes de location ou offres d'achat, visites, signature du bail, déclaration des paiements.",
          ],
          "Vous devez fournir des informations exactes, confirmer votre adresse e-mail et garder votre mot de passe confidentiel. Toute action réalisée depuis votre compte est réputée faite par vous.",
        ],
      },
      {
        id: "obligations",
        title: "3. Obligations des utilisateurs",
        blocks: [
          "Chaque utilisateur s'engage à :",
          [
            "respecter la législation applicable, notamment en matière de logement décent, de non-discrimination et de protection des données ;",
            "ne publier que des biens dont il a la disposition et des informations sincères ;",
            "ne pas utiliser la plateforme pour du démarchage, de l'escroquerie ou des contenus illicites, injurieux ou trompeurs ;",
            "ne pas collecter les données d'autres utilisateurs à d'autres fins que la transaction envisagée.",
          ],
        ],
      },
      {
        id: "annonces",
        title: "4. Annonces",
        blocks: [
          "Le propriétaire est seul responsable du contenu de ses annonces (description, photos, prix, disponibilité, diagnostics). hwe peut retirer ou suspendre une annonce manifestement illicite, trompeuse ou signalée à juste titre.",
          "Les montants affichés dans une autre devise que celle de l'annonce sont des conversions indicatives : seul le montant de l'annonce fait foi.",
        ],
      },
      {
        id: "messagerie",
        title: "5. Messagerie et demandes",
        blocks: [
          "La messagerie sert exclusivement aux échanges liés à un bien. Les messages ne doivent contenir ni coordonnées bancaires sensibles, ni pièces d'identité : utilisez pour cela l'espace « dossier » prévu à cet effet.",
          "Ne versez jamais d'argent avant d'avoir visité le bien et signé un contrat. Méfiez-vous de toute demande de paiement urgente ou par un moyen intraçable.",
        ],
      },
      {
        id: "documents",
        title: "6. Documents et pièces justificatives",
        blocks: [
          "Les pièces d'identité et justificatifs déposés dans votre dossier restent privés. Ils ne sont communiqués à un propriétaire que si vous choisissez de partager votre dossier avec une demande.",
          "Les modèles de bail, états des lieux et quittances générés par hwe sont fournis à titre indicatif. Ils ne remplacent pas un conseil juridique ; il appartient aux parties de vérifier leur conformité avec la loi du pays où se situe le bien.",
        ],
      },
      {
        id: "paiements",
        title: "7. Absence de paiement via la plateforme",
        blocks: [
          "hwe ne perçoit, ne détient et ne reverse aucune somme. Loyers, charges, cautions, frais et prix de vente sont réglés directement entre les parties, par les moyens qu'elles choisissent.",
          "Les fonctions de « déclaration de paiement » et de quittance ne font que documenter un paiement intervenu en dehors de la plateforme ; hwe n'en garantit pas la réalité.",
        ],
      },
      {
        id: "responsabilite",
        title: "8. Responsabilité",
        blocks: [
          "hwe fournit un service de mise en relation et des outils, sans garantie de résultat. La plateforme ne saurait être tenue responsable des relations, litiges ou dommages entre utilisateurs, ni du contenu publié par eux.",
          "hwe met en œuvre des moyens raisonnables pour assurer la disponibilité et la sécurité du service, sans pouvoir garantir une absence totale d'interruption ou d'erreur.",
        ],
      },
      {
        id: "suspension",
        title: "9. Suspension et suppression de compte",
        blocks: [
          "En cas de manquement aux présentes conditions, hwe peut suspendre ou supprimer un compte ou une annonce, après information de l'utilisateur sauf urgence ou obligation légale.",
          "Vous pouvez demander la suppression de votre compte à tout moment depuis le contact indiqué dans les mentions légales.",
        ],
      },
      {
        id: "donnees",
        title: "10. Données personnelles",
        blocks: ["Le traitement de vos données est décrit dans la politique de confidentialité."],
      },
      {
        id: "modification",
        title: "11. Modification des conditions",
        blocks: [
          "hwe peut faire évoluer les présentes conditions. Les utilisateurs sont informés des changements importants ; la poursuite de l'utilisation vaut acceptation de la nouvelle version.",
        ],
      },
      {
        id: "droit",
        title: "12. Droit applicable et litiges",
        blocks: [
          `Les présentes conditions sont soumises au droit ${TODO}. En cas de litige, les parties recherchent d'abord une solution amiable. Le consommateur peut recourir gratuitement à un médiateur de la consommation : ${TODO}. À défaut, les tribunaux compétents sont ceux désignés par la loi.`,
        ],
      },
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    intro:
      "Cette politique explique quelles données personnelles hwe traite, pourquoi, combien de temps et quels sont vos droits, conformément au Règlement général sur la protection des données (RGPD).",
    sections: [
      {
        id: "responsable",
        title: "1. Responsable du traitement",
        blocks: [
          `Le responsable du traitement est l'éditeur du site : ${TODO} (voir les mentions légales).`,
          `Délégué à la protection des données ou contact « données personnelles » : ${TODO}`,
        ],
      },
      {
        id: "donnees",
        title: "2. Données collectées",
        blocks: [
          [
            "Compte : nom, prénom, adresse e-mail, téléphone (facultatif), photo de profil (facultative), rôle, mot de passe (stocké sous forme chiffrée).",
            "Annonces : description du bien, adresse, photos, prix, documents du bien.",
            "Échanges : messages, demandes de location ou d'achat, demandes de visite.",
            "Gestion locative : baux, signatures électroniques horodatées, états des lieux, échéances et déclarations de paiement, incidents.",
            "Pièces justificatives : pièces d'identité, justificatifs de revenus ou de garant, attestation d'assurance, que vous déposez volontairement.",
            "Données techniques : journaux de connexion et de sécurité nécessaires au fonctionnement du service.",
          ],
          "hwe ne réalise aucune géolocalisation à partir de votre adresse IP. Vos préférences de langue, de devise et de pays sont enregistrées uniquement dans votre navigateur.",
        ],
      },
      {
        id: "finalites",
        title: "3. Finalités et bases légales",
        blocks: [
          [
            "Fournir le service (compte, annonces, messagerie, baux, loyers) : exécution du contrat (CGU).",
            "Sécuriser la plateforme, prévenir la fraude et les abus : intérêt légitime.",
            "Envoyer les e-mails de service (confirmation d'adresse, réinitialisation du mot de passe, notifications liées à vos demandes) : exécution du contrat.",
            "Respecter nos obligations légales (conservation de certaines données, réponse aux autorités) : obligation légale.",
          ],
          "Aucune donnée n'est vendue ni utilisée à des fins publicitaires.",
        ],
      },
      {
        id: "conservation",
        title: "4. Durées de conservation",
        blocks: [
          [
            "Compte et annonces : pendant la durée d'utilisation du compte, puis suppression ou anonymisation après sa clôture.",
            `Comptes inactifs : ${TODO}.`,
            "Pièces justificatives : jusqu'à leur suppression par vous, et au plus tard à la clôture du compte.",
            `Baux, quittances et documents liés à une location : ${TODO} (selon les délais de prescription applicables).`,
            `Journaux techniques : ${TODO}.`,
          ],
        ],
      },
      {
        id: "destinataires",
        title: "5. Destinataires",
        blocks: [
          [
            "L'autre partie à une demande : le propriétaire reçoit votre demande et, si vous le choisissez, votre dossier ; le candidat voit les informations publiques de l'annonce et le nom du propriétaire.",
            `Nos sous-traitants techniques : hébergement (${TODO}) et envoi d'e-mails (${TODO}), tenus à la confidentialité.`,
            "Les autorités, uniquement sur demande légalement fondée.",
          ],
          "L'adresse e-mail et le téléphone des propriétaires ne sont pas affichés publiquement : le contact passe par la messagerie.",
        ],
      },
      {
        id: "transferts",
        title: "6. Transferts hors de l'Union européenne",
        blocks: [
          `Localisation des serveurs et éventuels transferts hors UE : ${TODO}. Tout transfert est encadré par des garanties appropriées (clauses contractuelles types de la Commission européenne ou décision d'adéquation).`,
        ],
      },
      {
        id: "securite",
        title: "7. Sécurité",
        blocks: [
          "Les mots de passe sont chiffrés, les échanges passent par une connexion sécurisée (HTTPS) et l'accès aux pièces justificatives est limité à leur propriétaire et aux personnes avec qui il les partage. Aucun système n'étant infaillible, signalez-nous tout incident suspect.",
        ],
      },
      {
        id: "droits",
        title: "8. Vos droits",
        blocks: [
          "Vous disposez des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données, ainsi que du droit de définir des directives sur leur sort après votre décès.",
          `Pour les exercer, écrivez à : ${TODO}. Une réponse vous est apportée dans un délai d'un mois.`,
          "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr) ou de l'autorité de protection des données de votre pays.",
        ],
      },
      {
        id: "cookies",
        title: "9. Cookies et stockage local",
        blocks: [
          "hwe n'utilise aucun traceur publicitaire ni outil de mesure d'audience tiers. Seuls des éléments strictement nécessaires sont enregistrés dans votre navigateur (stockage local) :",
          [
            "le jeton de session, pour rester connecté à votre espace ;",
            "vos préférences de langue, de devise d'affichage, de pays et de thème (clair ou sombre).",
          ],
          "Ces éléments ne nécessitent pas de consentement ; vous pouvez les effacer à tout moment depuis les réglages de votre navigateur.",
        ],
      },
      {
        id: "modification",
        title: "10. Modification de la politique",
        blocks: ["Cette politique peut évoluer. La date de dernière mise à jour figure en haut de la page."],
      },
    ],
  },
};

const en: Record<LegalDocId, LegalDoc> = {
  legal: {
    title: "Legal notice",
    intro:
      "Information about the publisher and the host of the hwe website, in accordance with article 6 of French law no. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN).",
    sections: [
      {
        id: "editeur",
        title: "Publisher",
        blocks: [
          [
            `Company name: ${TODO}`,
            `Legal form and share capital: ${TODO}`,
            `Registered office: ${TODO}`,
            `Registration (RCS / SIREN): ${TODO}`,
            `EU VAT number: ${TODO}`,
          ],
        ],
      },
      {
        id: "publication",
        title: "Publication director",
        blocks: [`Publication director: ${TODO}`],
      },
      {
        id: "hebergeur",
        title: "Hosting",
        blocks: [[`Host: ${TODO}`, `Host address: ${TODO}`, `Host contact: ${TODO}`]],
      },
      {
        id: "contact",
        title: "Contact",
        blocks: [
          "For any question about the website, published content or your personal data, you can write to us:",
          [`Email: ${TODO}`, `Phone: ${TODO}`, `Postal address: ${TODO}`],
          "To report an unlawful listing or message, include the link to the page concerned and the reason for your report.",
        ],
      },
      {
        id: "service",
        title: "Nature of the service",
        blocks: [
          "hwe is a platform that connects landlords with prospective tenants or buyers. It provides tools: listings, messaging, visit requests, lease templates, inventories, rent tracking and receipts.",
          "hwe is not a real-estate agency, a property manager or a legal adviser. The platform does not collect, hold or transfer any money: rents, deposits and sale prices are paid directly between the parties.",
        ],
      },
      {
        id: "propriete",
        title: "Intellectual property",
        blocks: [
          "The structure of the website, its design, texts, logos and software are protected by intellectual property law. Any reproduction or reuse without written permission is prohibited.",
          "Listings, photos and messages remain the property of their authors, who grant hwe the right to display them on the platform for the purposes of the service.",
        ],
      },
      {
        id: "responsabilite",
        title: "Liability",
        blocks: [
          "Listings are published under the sole responsibility of the users who write them. hwe does not guarantee the accuracy of published information or the outcome of a rental or sale.",
          "hwe strives to keep the website available at all times but cannot be held liable for interruptions, technical errors or damage resulting from the use of the website.",
        ],
      },
    ],
  },

  terms: {
    title: "Terms of use",
    intro:
      "These terms govern the use of the hwe platform (public website, tenant space and landlord space). By creating an account, you accept them.",
    sections: [
      {
        id: "objet",
        title: "1. Purpose",
        blocks: [
          "hwe connects landlords offering a property for rent or sale with people looking for a home or wishing to buy. The platform provides listing, messaging and rental management tools.",
          "hwe does not take part in negotiations, does not represent either party and is not a party to the contracts concluded between users.",
        ],
      },
      {
        id: "comptes",
        title: "2. Registration and accounts",
        blocks: [
          "Registration is free. There are two types of accounts:",
          [
            "landlord account: publishing listings, answering requests, preparing and signing leases, tracking rents;",
            "tenant / buyer account: searching, favorites, rental requests or purchase offers, visits, signing the lease, declaring payments.",
          ],
          "You must provide accurate information, confirm your email address and keep your password confidential. Any action taken from your account is deemed to have been taken by you.",
        ],
      },
      {
        id: "obligations",
        title: "3. User obligations",
        blocks: [
          "Every user undertakes to:",
          [
            "comply with applicable law, in particular regarding decent housing, non-discrimination and data protection;",
            "only list properties they are entitled to offer, with truthful information;",
            "not use the platform for unsolicited canvassing, fraud or unlawful, abusive or misleading content;",
            "not collect other users' data for any purpose other than the intended transaction.",
          ],
        ],
      },
      {
        id: "annonces",
        title: "4. Listings",
        blocks: [
          "The landlord is solely responsible for the content of their listings (description, photos, price, availability, diagnostics). hwe may remove or suspend a listing that is clearly unlawful, misleading or rightly reported.",
          "Amounts shown in a currency other than the listing's are indicative conversions: only the listing amount is binding.",
        ],
      },
      {
        id: "messagerie",
        title: "5. Messaging and requests",
        blocks: [
          "Messaging is only for exchanges about a property. Messages must not contain sensitive bank details or identity documents: use the dedicated « file » area instead.",
          "Never send money before visiting the property and signing a contract. Be wary of any urgent payment request or untraceable payment method.",
        ],
      },
      {
        id: "documents",
        title: "6. Documents and supporting files",
        blocks: [
          "Identity documents and supporting files stored in your file remain private. They are only shared with a landlord if you choose to share your file with a request.",
          "Lease templates, inventories and receipts generated by hwe are provided for information only. They do not replace legal advice; the parties must check that they comply with the law of the country where the property is located.",
        ],
      },
      {
        id: "paiements",
        title: "7. No payments through the platform",
        blocks: [
          "hwe does not collect, hold or pay out any money. Rents, charges, deposits, fees and sale prices are paid directly between the parties, by the means they choose.",
          "The « payment declaration » and receipt features only document a payment made outside the platform; hwe does not guarantee that it actually took place.",
        ],
      },
      {
        id: "responsabilite",
        title: "8. Liability",
        blocks: [
          "hwe provides a matchmaking service and tools, with no guarantee of results. The platform cannot be held liable for relationships, disputes or damage between users, nor for the content they publish.",
          "hwe uses reasonable means to ensure the availability and security of the service, without being able to guarantee that it will be free of interruptions or errors.",
        ],
      },
      {
        id: "suspension",
        title: "9. Account suspension and deletion",
        blocks: [
          "In the event of a breach of these terms, hwe may suspend or delete an account or a listing, after informing the user unless there is an emergency or legal obligation.",
          "You can ask for your account to be deleted at any time using the contact details given in the legal notice.",
        ],
      },
      {
        id: "donnees",
        title: "10. Personal data",
        blocks: ["How your data is processed is described in the privacy policy."],
      },
      {
        id: "modification",
        title: "11. Changes to the terms",
        blocks: [
          "hwe may update these terms. Users are informed of significant changes; continued use means acceptance of the new version.",
        ],
      },
      {
        id: "droit",
        title: "12. Governing law and disputes",
        blocks: [
          `These terms are governed by the law of ${TODO}. In the event of a dispute, the parties first seek an amicable solution. Consumers may use a consumer mediator free of charge: ${TODO}. Failing that, the competent courts are those designated by law.`,
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy policy",
    intro:
      "This policy explains which personal data hwe processes, why, for how long and what your rights are, in accordance with the General Data Protection Regulation (GDPR).",
    sections: [
      {
        id: "responsable",
        title: "1. Data controller",
        blocks: [
          `The data controller is the website publisher: ${TODO} (see the legal notice).`,
          `Data protection officer or « personal data » contact: ${TODO}`,
        ],
      },
      {
        id: "donnees",
        title: "2. Data collected",
        blocks: [
          [
            "Account: last name, first name, email address, phone (optional), profile photo (optional), role, password (stored encrypted).",
            "Listings: property description, address, photos, price, property documents.",
            "Exchanges: messages, rental or purchase requests, visit requests.",
            "Rental management: leases, time-stamped electronic signatures, inventories, rent instalments and payment declarations, incidents.",
            "Supporting documents: identity documents, proof of income or guarantor documents, insurance certificate, which you upload voluntarily.",
            "Technical data: connection and security logs needed to run the service.",
          ],
          "hwe does not geolocate you from your IP address. Your language, currency and country preferences are stored only in your browser.",
        ],
      },
      {
        id: "finalites",
        title: "3. Purposes and legal bases",
        blocks: [
          [
            "Providing the service (account, listings, messaging, leases, rents): performance of the contract (terms of use).",
            "Securing the platform, preventing fraud and abuse: legitimate interest.",
            "Sending service emails (address confirmation, password reset, notifications about your requests): performance of the contract.",
            "Complying with our legal obligations (retention of certain data, answering authorities): legal obligation.",
          ],
          "No data is sold or used for advertising.",
        ],
      },
      {
        id: "conservation",
        title: "4. Retention periods",
        blocks: [
          [
            "Account and listings: for as long as the account is used, then deleted or anonymised after it is closed.",
            `Inactive accounts: ${TODO}.`,
            "Supporting documents: until you delete them, and at the latest when the account is closed.",
            `Leases, receipts and rental documents: ${TODO} (according to applicable limitation periods).`,
            `Technical logs: ${TODO}.`,
          ],
        ],
      },
      {
        id: "destinataires",
        title: "5. Recipients",
        blocks: [
          [
            "The other party to a request: the landlord receives your request and, if you choose, your file; the applicant sees the public listing information and the landlord's name.",
            `Our technical processors: hosting (${TODO}) and email delivery (${TODO}), bound by confidentiality.`,
            "Authorities, only upon a legally founded request.",
          ],
          "Landlords' email addresses and phone numbers are not displayed publicly: contact goes through messaging.",
        ],
      },
      {
        id: "transferts",
        title: "6. Transfers outside the European Union",
        blocks: [
          `Server location and any transfers outside the EU: ${TODO}. Any transfer is subject to appropriate safeguards (European Commission standard contractual clauses or adequacy decision).`,
        ],
      },
      {
        id: "securite",
        title: "7. Security",
        blocks: [
          "Passwords are encrypted, exchanges use a secure connection (HTTPS) and access to supporting documents is restricted to their owner and the people they share them with. No system is infallible: please report any suspicious incident to us.",
        ],
      },
      {
        id: "droits",
        title: "8. Your rights",
        blocks: [
          "You have the right to access, rectify, erase, restrict, object to and port your data, as well as the right to set guidelines for what happens to it after your death.",
          `To exercise them, write to: ${TODO}. You will receive an answer within one month.`,
          "If you believe your rights are not respected, you may lodge a complaint with the CNIL (www.cnil.fr) or with the data protection authority of your country.",
        ],
      },
      {
        id: "cookies",
        title: "9. Cookies and local storage",
        blocks: [
          "hwe uses no advertising trackers or third-party analytics. Only strictly necessary items are stored in your browser (local storage):",
          [
            "the session token, to keep you signed in to your space;",
            "your language, display currency, country and theme (light or dark) preferences.",
          ],
          "These items do not require consent; you can clear them at any time from your browser settings.",
        ],
      },
      {
        id: "modification",
        title: "10. Changes to this policy",
        blocks: ["This policy may change. The date of the last update is shown at the top of the page."],
      },
    ],
  },
};

export const LEGAL_DOCS: Record<"fr" | "en", Record<LegalDocId, LegalDoc>> = { fr, en };
export const TODO_TOKEN = TODO;
