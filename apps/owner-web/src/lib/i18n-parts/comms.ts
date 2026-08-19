// Dictionnaire de zone — communications (demandes de contact + messagerie).
// fr = textes d'origine ; en = traduction.
export const fr: Record<string, string> = {
  // ── Demandes : onglets / filtres ──
  "com.tab.all": "Toutes",
  "com.tab.pending": "À traiter",
  "com.tab.accepted": "Acceptées",
  "com.tab.rejected": "Refusées",
  "com.tab.cancelled": "Annulées",

  // ── Statuts de demande ──
  "com.status.PENDING": "En attente",
  "com.status.ACCEPTED": "Acceptée",
  "com.status.REJECTED": "Refusée",
  "com.status.CANCELLED": "Annulée",

  // ── Unités de durée de bail ──
  "com.duration.DAYS": "jour(s)",
  "com.duration.WEEKS": "semaine(s)",
  "com.duration.MONTHS": "mois",
  "com.duration.YEARS": "an(s)",

  // ── Types de documents d'identité ──
  "com.docType.NATIONAL_ID": "Carte nationale d'identité",
  "com.docType.PASSPORT": "Passeport",
  "com.docType.DRIVERS_LICENSE": "Permis de conduire",
  "com.docType.RESIDENCE_PERMIT": "Titre de séjour",
  "com.docType.INCOME_PROOF": "Justificatif de revenus",
  "com.docType.EMPLOYMENT_CONTRACT": "Contrat de travail",
  "com.docType.TAX_NOTICE": "Avis d'imposition",
  "com.docType.GUARANTOR_ID": "Pièce d'identité du garant",
  "com.docType.GUARANTOR_INCOME": "Revenus du garant",
  "com.docType.OTHER": "Autre",

  // ── Stepper transaction ──
  "com.step.received": "Reçue",
  "com.step.accepted": "Acceptée",
  "com.step.offer": "Négociation",
  "com.step.deed": "Signature",
  "com.step.lease": "Bail généré",
  "com.step.signed": "Signé",
  "com.step.active": "Active",

  // ── Demandes : hero + stats ──
  "com.heroTitle1": "Demandes",
  "com.heroTitle2": "de contact",
  "com.heroSub":
    "Acceptez ou refusez les candidatures. Un contrat de bail est généré automatiquement en cas d'acceptation pour les locations.",
  "com.statTotal": "Total",

  // ── Demandes : modal / carte ──
  "com.close": "Fermer",
  "com.sale": "Vente",
  "com.rental": "Location",
  "com.saleBadge": "🏷️ Vente",
  "com.rentalBadge": "🔑 Location",
  "com.message": "Message",
  "com.purchaseProject": "🏷️ Projet d'achat",
  "com.rentalWishes": "📅 Souhaits de location",
  "com.visitDateWanted": "Date de visite souhaitée",
  "com.entryDateWanted": "Date d'entrée souhaitée",
  "com.durationWanted": "Durée souhaitée",
  "com.plannedEnd": "Fin prévue",
  "com.notSpecified": "Non précisée",
  "com.receivedOn": "Reçue le",
  "com.processedOn": "Traitée le",
  "com.received": "Reçue",
  "com.visitWanted": "Visite souhaitée :",
  "com.entryWanted": "Entrée souhaitée :",
  "com.durationLabel": "Durée :",
  "com.reject": "✕ Refuser",
  "com.accept": "✓ Accepter",
  "com.processing": "Traitement…",
  "com.viewLease": "📋 Voir le contrat de bail",
  "com.buyerAccepted": "🤝 Acheteur accepté",
  "com.buyerAcceptedBody1": "Vous pouvez maintenant échanger directement avec",
  "com.buyerAcceptedBody2":
    "pour la suite : visite, négociation, compromis chez le notaire. Quand la vente est finalisée, passez l'annonce en \"Vendu\" depuis votre tableau de bord.",
  "com.openDiscussion": "💬 Ouvrir la discussion",
  "com.details": "🔍 Détails",
  "com.discuss": "💬 Discuter",
  "com.contract": "📋 Contrat",

  // ── Demandes : temps relatif ──
  "com.justNow": "à l'instant",
  "com.minAgo": "il y a {n} min",
  "com.hrAgo": "il y a {n} h",
  "com.dayAgo": "il y a {n} j",

  // ── Demandes : confirmations / erreurs ──
  "com.confirmAccept": "Confirmer : accepter cette demande ?",
  "com.confirmReject": "Confirmer : refuser cette demande ?",
  "com.errorPrefix": "Erreur : ",

  // ── Demandes : états vides ──
  "com.emptyTitle": "Aucune demande pour le moment",
  "com.emptyDesc": "Les demandes reçues sur vos biens s'afficheront ici.",
  "com.emptyTabTitle": "Aucune demande dans cette catégorie",
  "com.emptyTabDesc": "Changez d'onglet pour voir les autres demandes.",

  // ── Dossier de candidature ──
  "com.dossierShared": "📁 Le candidat a partagé son dossier",
  "com.dossierView": "Voir les documents",
  "com.dossierEmpty":
    "Le profil du candidat ne contient encore aucun document.",
  "com.open": "Ouvrir",
  "com.loading": "Chargement…",

  // ── Messagerie ──
  "com.msgTabTitle": "hwe — Propriétaire",
  "com.someone": "Quelqu'un",
  "com.newMessageFrom": "Nouveau message de {name}",
  "com.msgTitle1": "Messages",
  "com.msgTitle2": "en direct",
  "com.msgSub": "Discutez directement avec vos candidats acheteurs et locataires.",
  "com.unread": "non lu",
  "com.unreadPlural": "non lus",
  "com.enableNotifs": "🔔 Activer les notifications",
  "com.notifsActive": "Notifications navigateur actives",
  "com.noConversations":
    "Aucune conversation pour le moment. Elles apparaîtront ici dès qu'un candidat vous contactera.",
  "com.anonymous": "Anonyme",
  "com.selectConversation": "Sélectionnez une conversation",
  "com.selectConversationDesc":
    "Choisissez un fil de discussion dans la liste pour voir les messages et y répondre.",
  "com.backToList": "Retour à la liste",
  "com.noMessages": "Aucun message encore. Écrivez le premier !",
  "com.composerPlaceholder": "Votre réponse…",
};

export const en: Record<string, string> = {
  // ── Inquiries: tabs / filters ──
  "com.tab.all": "All",
  "com.tab.pending": "To process",
  "com.tab.accepted": "Accepted",
  "com.tab.rejected": "Rejected",
  "com.tab.cancelled": "Cancelled",

  // ── Inquiry statuses ──
  "com.status.PENDING": "Pending",
  "com.status.ACCEPTED": "Accepted",
  "com.status.REJECTED": "Rejected",
  "com.status.CANCELLED": "Cancelled",

  // ── Lease duration units ──
  "com.duration.DAYS": "day(s)",
  "com.duration.WEEKS": "week(s)",
  "com.duration.MONTHS": "month(s)",
  "com.duration.YEARS": "year(s)",

  // ── Identity document types ──
  "com.docType.NATIONAL_ID": "National ID card",
  "com.docType.PASSPORT": "Passport",
  "com.docType.DRIVERS_LICENSE": "Driver's license",
  "com.docType.RESIDENCE_PERMIT": "Residence permit",
  "com.docType.INCOME_PROOF": "Proof of income",
  "com.docType.EMPLOYMENT_CONTRACT": "Employment contract",
  "com.docType.TAX_NOTICE": "Tax notice",
  "com.docType.GUARANTOR_ID": "Guarantor's ID document",
  "com.docType.GUARANTOR_INCOME": "Guarantor's income",
  "com.docType.OTHER": "Other",

  // ── Transaction stepper ──
  "com.step.received": "Received",
  "com.step.accepted": "Accepted",
  "com.step.offer": "Negotiation",
  "com.step.deed": "Signing",
  "com.step.lease": "Lease generated",
  "com.step.signed": "Signed",
  "com.step.active": "Active",

  // ── Inquiries: hero + stats ──
  "com.heroTitle1": "Contact",
  "com.heroTitle2": "requests",
  "com.heroSub":
    "Accept or decline applications. A lease agreement is generated automatically upon acceptance for rentals.",
  "com.statTotal": "Total",

  // ── Inquiries: modal / card ──
  "com.close": "Close",
  "com.sale": "Sale",
  "com.rental": "Rental",
  "com.saleBadge": "🏷️ Sale",
  "com.rentalBadge": "🔑 Rental",
  "com.message": "Message",
  "com.purchaseProject": "🏷️ Purchase plan",
  "com.rentalWishes": "📅 Rental preferences",
  "com.visitDateWanted": "Preferred visit date",
  "com.entryDateWanted": "Preferred move-in date",
  "com.durationWanted": "Desired duration",
  "com.plannedEnd": "Expected end",
  "com.notSpecified": "Not specified",
  "com.receivedOn": "Received on",
  "com.processedOn": "Processed on",
  "com.received": "Received",
  "com.visitWanted": "Preferred visit:",
  "com.entryWanted": "Preferred move-in:",
  "com.durationLabel": "Duration:",
  "com.reject": "✕ Decline",
  "com.accept": "✓ Accept",
  "com.processing": "Processing…",
  "com.viewLease": "📋 View the lease agreement",
  "com.buyerAccepted": "🤝 Buyer accepted",
  "com.buyerAcceptedBody1": "You can now talk directly with",
  "com.buyerAcceptedBody2":
    "about the next steps: visit, negotiation, preliminary agreement at the notary. Once the sale is finalized, mark the listing as \"Sold\" from your dashboard.",
  "com.openDiscussion": "💬 Open the conversation",
  "com.details": "🔍 Details",
  "com.discuss": "💬 Chat",
  "com.contract": "📋 Lease",

  // ── Inquiries: relative time ──
  "com.justNow": "just now",
  "com.minAgo": "{n} min ago",
  "com.hrAgo": "{n} h ago",
  "com.dayAgo": "{n} d ago",

  // ── Inquiries: confirmations / errors ──
  "com.confirmAccept": "Confirm: accept this request?",
  "com.confirmReject": "Confirm: decline this request?",
  "com.errorPrefix": "Error: ",

  // ── Inquiries: empty states ──
  "com.emptyTitle": "No requests yet",
  "com.emptyDesc": "Requests received on your properties will appear here.",
  "com.emptyTabTitle": "No requests in this category",
  "com.emptyTabDesc": "Switch tabs to see the other requests.",

  // ── Application dossier ──
  "com.dossierShared": "📁 The applicant shared their dossier",
  "com.dossierView": "View the documents",
  "com.dossierEmpty":
    "The applicant's profile does not contain any documents yet.",
  "com.open": "Open",
  "com.loading": "Loading…",

  // ── Messaging ──
  "com.msgTabTitle": "hwe — Owner",
  "com.someone": "Someone",
  "com.newMessageFrom": "New message from {name}",
  "com.msgTitle1": "Live",
  "com.msgTitle2": "messages",
  "com.msgSub": "Chat directly with your prospective buyers and tenants.",
  "com.unread": "unread",
  "com.unreadPlural": "unread",
  "com.enableNotifs": "🔔 Enable notifications",
  "com.notifsActive": "Browser notifications enabled",
  "com.noConversations":
    "No conversations yet. They will appear here as soon as an applicant contacts you.",
  "com.anonymous": "Anonymous",
  "com.selectConversation": "Select a conversation",
  "com.selectConversationDesc":
    "Pick a thread from the list to view the messages and reply.",
  "com.backToList": "Back to the list",
  "com.noMessages": "No messages yet. Write the first one!",
  "com.composerPlaceholder": "Your reply…",
};
