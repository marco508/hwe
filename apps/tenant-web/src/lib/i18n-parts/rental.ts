// Dictionnaire de zone — Ma location (bail, signature, états des lieux,
// préavis, avenants, colocataires, assurance, charges, incidents).
export const fr: Record<string, string> = {
  // ── Générique ──
  "rental.loading": "Chargement…",
  "rental.sending": "Envoi…",
  "rental.cancel": "Annuler",
  "rental.yes": "Oui",
  "rental.no": "Non",
  "rental.error": "Erreur : {message}",
  "rental.months.one": "{n} mois",
  "rental.months.other": "{n} mois",

  // ── Page ──
  "rental.page.title": "Ma location",
  "rental.page.sub": "Retrouvez ici les détails de votre bail en cours.",
  "rental.page.loadError": "Erreur lors du chargement de vos baux : {message}",
  "rental.empty.title": "Aucune location active",
  "rental.empty.desc":
    "Vous n'avez pas de bail actif enregistré à votre adresse email. Si vous venez de signer un bail, contactez votre propriétaire.",
  "rental.empty.cta": "Parcourir les annonces",

  // ── Statuts de bail ──
  "rental.status.DRAFT": "Brouillon",
  "rental.status.SIGNED": "Signé",
  "rental.status.ACTIVE": "En cours",
  "rental.status.EXPIRED": "Expiré",
  "rental.status.TERMINATED": "Résilié",

  // ── Compte à rebours et progression ──
  "rental.countdown.finished": "La période de location est terminée.",
  "rental.countdown.remaining": "Temps restant",
  "rental.countdown.days": "jours",
  "rental.countdown.hours": "heures",
  "rental.countdown.min": "min",
  "rental.countdown.sec": "sec",
  "rental.progress.elapsedPct": "{pct}% écoulé",
  "rental.progress.days": "{elapsed} jour{sElapsed} sur {total} écoulé{sTotal}",
  "rental.timer.title": "⏱ Location à durée limitée",

  // ── Carte de bail ──
  "rental.lease.propertyFallback": "Bien",
  "rental.draft.title": "📋 Bail généré, en attente de signature.",
  "rental.draft.text": "Consultez le contrat ci-dessous et signez-le électroniquement.",

  // ── Contrat + signature ──
  "rental.contract.title": "Contrat de bail",
  "rental.contract.hide": "▲ Masquer le contrat",
  "rental.contract.read": "▼ Lire le contrat",
  "rental.contract.pdf": "📄 Télécharger PDF",
  "rental.sign.owner": "Propriétaire :",
  "rental.sign.tenant": "Locataire :",
  "rental.sign.signedOn": "signé le {date}",
  "rental.sign.pending": "en attente",
  "rental.sign.cta": "✍️ Signer le bail électroniquement",
  "rental.sign.busy": "Signature en cours…",
  "rental.sign.button": "Signer",
  "rental.sign.confirm":
    "En cliquant sur OK, vous signez électroniquement ce contrat de bail. Confirmez-vous ?",
  "rental.sign.error": "Erreur lors de la signature : {message}",

  // ── Accès aux loyers ──
  "rental.rentsLink.title": "💶 Mes loyers et quittances",
  "rental.rentsLink.text": "Payer, déclarer un versement et télécharger vos quittances",

  // ── Sections ──
  "rental.section.period": "Période",
  "rental.section.finance": "Conditions financières",
  "rental.section.property": "Caractéristiques du bien",
  "rental.section.owner": "Votre propriétaire",
  "rental.section.clauses": "Clauses particulières",
  "rental.section.deposit": "Caution",
  "rental.section.inspections": "États des lieux",
  "rental.section.notice": "Préavis",
  "rental.section.amendments": "Avenants",
  "rental.section.coTenants": "Colocataires",
  "rental.section.charges": "Régularisation des charges",
  "rental.section.insurance": "Assurance habitation",
  "rental.section.tickets": "Incidents",

  // ── Période ──
  "rental.period.start": "Début",
  "rental.period.end": "Fin",
  "rental.period.indefinite": "Indéterminée",

  // ── Conditions financières ──
  "rental.finance.rent": "Loyer mensuel HC",
  "rental.finance.charges": "Charges",
  "rental.finance.total": "Total mensuel (HC + charges)",
  "rental.finance.deposit": "Dépôt de garantie",
  "rental.finance.grandTotal": "Montant total de la location",
  "rental.finance.paymentDay": "Paiement le",
  "rental.finance.paymentDayValue": "{day}{suffix} du mois",
  "rental.finance.notice": "Préavis",
  "rental.finance.furnished": "Meublé",

  // ── Bien et propriétaire ──
  "rental.property.surface": "Surface",
  "rental.property.rooms": "Pièces",
  "rental.owner.name": "Nom",
  "rental.owner.email": "Email",
  "rental.owner.phone": "Téléphone",

  // ── Caution ──
  "rental.deposit.returnedOn": "Restituée le",
  "rental.deposit.retained": "— retenue :",
  "rental.deposit.noRetention": " — sans retenue",
  "rental.deposit.paidOn": "Versée le",
  "rental.deposit.notPaid": "{amount} — pas encore marquée comme versée par le propriétaire.",

  // ── États des lieux ──
  "rental.inspection.type.ENTRY": "Entrée",
  "rental.inspection.type.EXIT": "Sortie",
  "rental.inspection.ownerTitle": "Propriétaire",
  "rental.inspection.ownerShort": "prop.",
  "rental.inspection.youTitle": "Vous",
  "rental.inspection.youShort": "vous",
  "rental.inspection.detail": "Détail",
  "rental.inspection.hide": "Masquer",
  "rental.inspection.keys.one": "🔑 {n} clé",
  "rental.inspection.keys.other": "🔑 {n} clés",
  "rental.inspection.signConfirm":
    "Vous signez électroniquement cet état des lieux. Confirmez-vous ?",
  "rental.inspection.empty":
    "Aucun pour l'instant — le propriétaire les rédige, vous les signez ici.",

  // ── Congé donné par le propriétaire ──
  "rental.ownerNotice.given": "Votre propriétaire vous a donné congé le",
  "rental.ownerNotice.endOn": "— fin de bail le",
  "rental.noticeReason.SALE": "Mise en vente",
  "rental.noticeReason.REPOSSESSION": "Reprise du logement",
  "rental.noticeReason.OTHER": "Motif légitime et sérieux",
  "rental.noticeReason.fallback": "motif légitime",

  // ── Préavis du locataire ──
  "rental.notice.givenOn": "Donné le",
  "rental.notice.leaseEndsOn": "— fin de bail le",
  "rental.notice.onlyActive": "Disponible quand le bail est actif.",
  "rental.notice.give": "Donner mon préavis",
  "rental.notice.confirm": "Vous notifiez officiellement votre départ. Confirmez-vous ?",
  "rental.notice.info1": "Préavis contractuel : {n} mois — départ au plus tôt le",
  "rental.notice.info2": "Une date plus proche sera ramenée à ce minimum.",
  "rental.notice.desiredDate": "Date de départ souhaitée",
  "rental.notice.message": "Message (optionnel)",
  "rental.notice.submit": "Confirmer mon préavis",

  // ── Avenants ──
  "rental.amendments.empty": "Aucun avenant.",
  "rental.amendments.on": "Au",
  "rental.amendments.rent": "loyer",
  "rental.amendments.charges": "· charges",
  "rental.amendments.end": "· fin",
  "rental.amendments.signedOn": "Signé le {date}",
  "rental.amendments.signConfirm":
    "Vous signez cet avenant : il s'applique immédiatement au bail. Confirmez-vous ?",

  // ── Colocataires ──
  "rental.coTenants.empty": "Pas de colocataire sur ce bail.",
  "rental.coTenants.signedOn": "signé le {date}",
  "rental.coTenants.sign": "Signer ma ligne de colocataire",
  "rental.coTenants.signConfirm": "Vous signez le bail en tant que colocataire. Confirmez-vous ?",

  // ── Assurance habitation ──
  "rental.insurance.none": "Aucune attestation déposée",
  "rental.insurance.expired": "Expirée le {date}",
  "rental.insurance.expiring": "Expire le {date} — renouvelez",
  "rental.insurance.valid": "Valide jusqu'au {date}",
  "rental.insurance.file": "Attestation (PDF ou image)",
  "rental.insurance.validUntil": "Valide jusqu'au",
  "rental.insurance.submit": "Déposer",
  "rental.insurance.fileTooBig": "Le fichier dépasse 8 Mo.",

  // ── Régularisation des charges ──
  "rental.charges.empty": "Aucune régularisation pour l'instant.",
  "rental.charges.detail": "provisions {provisions} · réel {actual}",
  "rental.charges.toPay": "{amount} à verser",
  "rental.charges.toRefund": "{amount} à vous rembourser",
  "rental.charges.balanced": "Équilibré",

  // ── Incidents ──
  "rental.ticket.OPEN": "Ouvert",
  "rental.ticket.IN_PROGRESS": "En cours",
  "rental.ticket.RESOLVED": "Résolu",
  "rental.ticket.report": "Signaler un incident",
  "rental.ticket.close": "Fermer",
  "rental.ticket.empty": "Aucun incident signalé.",
  "rental.ticket.title": "Problème",
  "rental.ticket.titlePlaceholder": "Ex : fuite sous l'évier",
  "rental.ticket.description": "Description",
  "rental.ticket.photo": "Photo (optionnelle)",
  "rental.ticket.submit": "Signaler",
  "rental.ticket.photoTooBig": "La photo dépasse 8 Mo — compressez-la avant l'envoi.",
};

export const en: Record<string, string> = {
  // ── Generic ──
  "rental.loading": "Loading…",
  "rental.sending": "Sending…",
  "rental.cancel": "Cancel",
  "rental.yes": "Yes",
  "rental.no": "No",
  "rental.error": "Error: {message}",
  "rental.months.one": "{n} month",
  "rental.months.other": "{n} months",

  // ── Page ──
  "rental.page.title": "My rental",
  "rental.page.sub": "Find the details of your current lease here.",
  "rental.page.loadError": "Could not load your leases: {message}",
  "rental.empty.title": "No active rental",
  "rental.empty.desc":
    "No active lease is registered under your email address. If you have just signed a lease, contact your landlord.",
  "rental.empty.cta": "Browse listings",

  // ── Lease statuses ──
  "rental.status.DRAFT": "Draft",
  "rental.status.SIGNED": "Signed",
  "rental.status.ACTIVE": "Active",
  "rental.status.EXPIRED": "Expired",
  "rental.status.TERMINATED": "Terminated",

  // ── Countdown and progress ──
  "rental.countdown.finished": "The rental period has ended.",
  "rental.countdown.remaining": "Time remaining",
  "rental.countdown.days": "days",
  "rental.countdown.hours": "hours",
  "rental.countdown.min": "min",
  "rental.countdown.sec": "sec",
  "rental.progress.elapsedPct": "{pct}% elapsed",
  "rental.progress.days": "{elapsed} of {total} days elapsed",
  "rental.timer.title": "⏱ Fixed-term rental",

  // ── Lease card ──
  "rental.lease.propertyFallback": "Property",
  "rental.draft.title": "📋 Lease generated, awaiting signature.",
  "rental.draft.text": "Read the contract below and sign it electronically.",

  // ── Contract + signature ──
  "rental.contract.title": "Lease agreement",
  "rental.contract.hide": "▲ Hide the contract",
  "rental.contract.read": "▼ Read the contract",
  "rental.contract.pdf": "📄 Download PDF",
  "rental.sign.owner": "Landlord:",
  "rental.sign.tenant": "Tenant:",
  "rental.sign.signedOn": "signed on {date}",
  "rental.sign.pending": "pending",
  "rental.sign.cta": "✍️ Sign the lease electronically",
  "rental.sign.busy": "Signing…",
  "rental.sign.button": "Sign",
  "rental.sign.confirm":
    "By clicking OK, you electronically sign this lease agreement. Do you confirm?",
  "rental.sign.error": "Signature failed: {message}",

  // ── Rent shortcut ──
  "rental.rentsLink.title": "💶 My rent and receipts",
  "rental.rentsLink.text": "Pay, declare a payment and download your receipts",

  // ── Sections ──
  "rental.section.period": "Period",
  "rental.section.finance": "Financial terms",
  "rental.section.property": "Property features",
  "rental.section.owner": "Your landlord",
  "rental.section.clauses": "Special clauses",
  "rental.section.deposit": "Security deposit",
  "rental.section.inspections": "Inspection reports",
  "rental.section.notice": "Notice",
  "rental.section.amendments": "Amendments",
  "rental.section.coTenants": "Co-tenants",
  "rental.section.charges": "Charges reconciliation",
  "rental.section.insurance": "Home insurance",
  "rental.section.tickets": "Issues",

  // ── Period ──
  "rental.period.start": "Start",
  "rental.period.end": "End",
  "rental.period.indefinite": "Open-ended",

  // ── Financial terms ──
  "rental.finance.rent": "Monthly rent excl. charges",
  "rental.finance.charges": "Charges",
  "rental.finance.total": "Monthly total (rent + charges)",
  "rental.finance.deposit": "Security deposit",
  "rental.finance.grandTotal": "Total cost of the rental",
  "rental.finance.paymentDay": "Payment on",
  "rental.finance.paymentDayValue": "day {day} of each month",
  "rental.finance.notice": "Notice period",
  "rental.finance.furnished": "Furnished",

  // ── Property and landlord ──
  "rental.property.surface": "Surface",
  "rental.property.rooms": "Rooms",
  "rental.owner.name": "Name",
  "rental.owner.email": "Email",
  "rental.owner.phone": "Phone",

  // ── Deposit ──
  "rental.deposit.returnedOn": "Returned on",
  "rental.deposit.retained": "— withheld:",
  "rental.deposit.noRetention": " — nothing withheld",
  "rental.deposit.paidOn": "Paid on",
  "rental.deposit.notPaid": "{amount} — not yet marked as received by the landlord.",

  // ── Inspections ──
  "rental.inspection.type.ENTRY": "Move-in",
  "rental.inspection.type.EXIT": "Move-out",
  "rental.inspection.ownerTitle": "Landlord",
  "rental.inspection.ownerShort": "landlord",
  "rental.inspection.youTitle": "You",
  "rental.inspection.youShort": "you",
  "rental.inspection.detail": "Details",
  "rental.inspection.hide": "Hide",
  "rental.inspection.keys.one": "🔑 {n} key",
  "rental.inspection.keys.other": "🔑 {n} keys",
  "rental.inspection.signConfirm":
    "You are electronically signing this inspection report. Do you confirm?",
  "rental.inspection.empty":
    "None yet — your landlord writes them, you sign them here.",

  // ── Notice given by the landlord ──
  "rental.ownerNotice.given": "Your landlord gave you notice on",
  "rental.ownerNotice.endOn": "— lease ends on",
  "rental.noticeReason.SALE": "Sale of the property",
  "rental.noticeReason.REPOSSESSION": "Landlord moving back in",
  "rental.noticeReason.OTHER": "Legitimate and serious reason",
  "rental.noticeReason.fallback": "legitimate reason",

  // ── Tenant notice ──
  "rental.notice.givenOn": "Given on",
  "rental.notice.leaseEndsOn": "— lease ends on",
  "rental.notice.onlyActive": "Available once the lease is active.",
  "rental.notice.give": "Give my notice",
  "rental.notice.confirm": "You are formally notifying your departure. Do you confirm?",
  "rental.notice.info1": "Contractual notice: {n} months — earliest departure on",
  "rental.notice.info2": "An earlier date will be moved back to this minimum.",
  "rental.notice.desiredDate": "Preferred departure date",
  "rental.notice.message": "Message (optional)",
  "rental.notice.submit": "Confirm my notice",

  // ── Amendments ──
  "rental.amendments.empty": "No amendment.",
  "rental.amendments.on": "On",
  "rental.amendments.rent": "rent",
  "rental.amendments.charges": "· charges",
  "rental.amendments.end": "· end",
  "rental.amendments.signedOn": "Signed on {date}",
  "rental.amendments.signConfirm":
    "You are signing this amendment: it applies to the lease immediately. Do you confirm?",

  // ── Co-tenants ──
  "rental.coTenants.empty": "No co-tenant on this lease.",
  "rental.coTenants.signedOn": "signed on {date}",
  "rental.coTenants.sign": "Sign as co-tenant",
  "rental.coTenants.signConfirm": "You are signing the lease as a co-tenant. Do you confirm?",

  // ── Home insurance ──
  "rental.insurance.none": "No certificate uploaded",
  "rental.insurance.expired": "Expired on {date}",
  "rental.insurance.expiring": "Expires on {date} — renew it",
  "rental.insurance.valid": "Valid until {date}",
  "rental.insurance.file": "Certificate (PDF or image)",
  "rental.insurance.validUntil": "Valid until",
  "rental.insurance.submit": "Upload",
  "rental.insurance.fileTooBig": "The file exceeds 8 MB.",

  // ── Charges reconciliation ──
  "rental.charges.empty": "No reconciliation yet.",
  "rental.charges.detail": "provisions {provisions} · actual {actual}",
  "rental.charges.toPay": "{amount} to pay",
  "rental.charges.toRefund": "{amount} to be refunded to you",
  "rental.charges.balanced": "Balanced",

  // ── Issues ──
  "rental.ticket.OPEN": "Open",
  "rental.ticket.IN_PROGRESS": "In progress",
  "rental.ticket.RESOLVED": "Resolved",
  "rental.ticket.report": "Report an issue",
  "rental.ticket.close": "Close",
  "rental.ticket.empty": "No issue reported.",
  "rental.ticket.title": "Issue",
  "rental.ticket.titlePlaceholder": "E.g. leak under the sink",
  "rental.ticket.description": "Description",
  "rental.ticket.photo": "Photo (optional)",
  "rental.ticket.submit": "Report",
  "rental.ticket.photoTooBig": "The photo exceeds 8 MB — compress it before sending.",
};
