// Dictionnaire de zone — loyers (page Suivi des loyers + coordonnées de paiement).
// fr = textes d'origine ; en = traduction.
export const fr: Record<string, string> = {
  // Statuts d'une échéance de loyer
  "rent.status.DUE": "À payer",
  "rent.status.DECLARED": "À vérifier",
  "rent.status.PAID": "Payé",
  "rent.status.LATE": "En retard",

  // Filtres
  "rent.filter.DECLARED": "À vérifier",
  "rent.filter.LATE": "En retard",
  "rent.filter.DUE": "À venir",
  "rent.filter.PAID": "Payés",
  "rent.filter.ALL": "Tout",

  // Carte d'une échéance
  "rent.confirmReceive":
    "Confirmez-vous avoir reçu {amount} de {tenant} pour {period} ?\n\nVérifiez la réception sur votre relevé (banque / opérateur), pas seulement sur la capture. La quittance sera générée et envoyée au locataire.",
  "rent.error": "Erreur : {message}",
  "rent.downloadError": "Téléchargement impossible : {message}",
  "rent.dueOn": "échéance {date}",
  "rent.declaredOn": "Déclaré le {date}",
  "rent.via": "via",
  "rent.txId": "Identifiant de transaction :",
  "rent.hideProof": "▲ Masquer la capture",
  "rent.showProof": "▼ Voir la capture du reçu",
  "rent.proofAlt": "Capture du reçu",
  "rent.checkStatement1": "⚠️ Vérifiez la réception",
  "rent.checkStatement2": "sur votre relevé",
  "rent.checkStatement3":
    "(banque ou opérateur), pas seulement sur la capture : une capture peut se falsifier, votre relevé non.",
  "rent.validate": "✓ J'ai bien reçu — valider",
  "rent.reject": "Refuser",
  "rent.rejectPlaceholder": "Motif du refus (ex. : montant non reçu sur mon compte)",
  "rent.confirmReject": "Confirmer le refus",
  "rent.cancel": "Annuler",
  "rent.paidOn": "✓ Payé le {date}",
  "rent.receiptBtn": "📄 Quittance {no}",
  "rent.lastReject": "Dernier refus : {reason}",

  // Page
  "rent.loadError": "Erreur lors du chargement des loyers : {message}",
  "rent.title1": "Suivi des",
  "rent.title2": "loyers",
  "rent.intro1": "Vos locataires paient sur vos coordonnées (",
  "rent.introProfileLink": "rubrique Profil",
  "rent.intro2":
    ") puis déclarent ici. Validez après vérification sur votre relevé — la quittance part toute seule.",
  "rent.stat.declared": "À vérifier",
  "rent.stat.late": "En retard",
  "rent.stat.collected": "Encaissé ce mois-ci",
  "rent.stat.expected": "Attendu ce mois-ci",
  "rent.empty.nothingToVerify": "Rien à vérifier",
  "rent.empty.nothingToShow": "Rien à afficher",
  "rent.empty.noLease":
    "Les échéances apparaîtront dès qu'un bail actif est enregistré sur l'un de vos biens.",
  "rent.empty.noDeclared":
    "Aucune déclaration de versement en attente. Vous serez alerté par e-mail dès qu'un locataire déclare un paiement.",
  "rent.empty.noneInCategory": "Aucune échéance dans cette catégorie.",

  // Coordonnées de paiement (PaymentMethodsManager)
  "rent.pm.deleteConfirm": "Supprimer « {label} » ? Les locataires ne le verront plus.",
  "rent.pm.title": "💸 Coordonnées de paiement des loyers",
  "rent.pm.desc1":
    "Vos locataires voient ces coordonnées dans leur espace, paient directement, puis déclarent leur versement — que vous validez dans",
  "rent.pm.descLink": "Loyers",
  "rent.pm.empty":
    "Aucune coordonnée renseignée. Ajoutez un IBAN, un numéro mobile money… pour que vos locataires sachent comment payer leur loyer.",
  "rent.pm.hidden": "masqué",
  "rent.pm.holder": "Titulaire : {name}",
  "rent.pm.hide": "Masquer",
  "rent.pm.reactivate": "Réactiver",
  "rent.pm.delete": "Supprimer",
  "rent.pm.labelField": "Libellé *",
  "rent.pm.labelPlaceholder": "Virement SEPA, Orange Money…",
  "rent.pm.valueField": "Coordonnée *",
  "rent.pm.valuePlaceholder": "IBAN, numéro…",
  "rent.pm.holderField": "Titulaire",
  "rent.pm.optional": "(optionnel)",
  "rent.pm.instructionsField": "Consignes",
  "rent.pm.instructionsPlaceholder": "Ex. : indiquez votre nom et le mois en référence",
  "rent.pm.adding": "Ajout…",
  "rent.pm.add": "Ajouter",
  "rent.pm.addBtn": "+ Ajouter une coordonnée",
};

export const en: Record<string, string> = {
  // Rent period statuses
  "rent.status.DUE": "Due",
  "rent.status.DECLARED": "To verify",
  "rent.status.PAID": "Paid",
  "rent.status.LATE": "Late",

  // Filters
  "rent.filter.DECLARED": "To verify",
  "rent.filter.LATE": "Late",
  "rent.filter.DUE": "Upcoming",
  "rent.filter.PAID": "Paid",
  "rent.filter.ALL": "All",

  // Rent period card
  "rent.confirmReceive":
    "Do you confirm you received {amount} from {tenant} for {period}?\n\nCheck the funds on your statement (bank / operator), not just on the screenshot. The receipt will be generated and sent to the tenant.",
  "rent.error": "Error: {message}",
  "rent.downloadError": "Download failed: {message}",
  "rent.dueOn": "due {date}",
  "rent.declaredOn": "Declared on {date}",
  "rent.via": "via",
  "rent.txId": "Transaction ID:",
  "rent.hideProof": "▲ Hide the screenshot",
  "rent.showProof": "▼ View the receipt screenshot",
  "rent.proofAlt": "Receipt screenshot",
  "rent.checkStatement1": "⚠️ Check that the money arrived",
  "rent.checkStatement2": "on your statement",
  "rent.checkStatement3":
    "(bank or operator), not just on the screenshot: a screenshot can be faked, your statement cannot.",
  "rent.validate": "✓ I received it — validate",
  "rent.reject": "Reject",
  "rent.rejectPlaceholder": "Reason for rejection (e.g. amount not received on my account)",
  "rent.confirmReject": "Confirm rejection",
  "rent.cancel": "Cancel",
  "rent.paidOn": "✓ Paid on {date}",
  "rent.receiptBtn": "📄 Receipt {no}",
  "rent.lastReject": "Last rejection: {reason}",

  // Page
  "rent.loadError": "Error while loading rents: {message}",
  "rent.title1": "Track your",
  "rent.title2": "rents",
  "rent.intro1": "Your tenants pay using your payment details (",
  "rent.introProfileLink": "Profile section",
  "rent.intro2":
    ") then declare it here. Validate after checking your statement — the receipt goes out on its own.",
  "rent.stat.declared": "To verify",
  "rent.stat.late": "Late",
  "rent.stat.collected": "Collected this month",
  "rent.stat.expected": "Expected this month",
  "rent.empty.nothingToVerify": "Nothing to verify",
  "rent.empty.nothingToShow": "Nothing to show",
  "rent.empty.noLease":
    "Due dates will appear as soon as an active lease is registered on one of your properties.",
  "rent.empty.noDeclared":
    "No pending payment declaration. You will be alerted by email as soon as a tenant declares a payment.",
  "rent.empty.noneInCategory": "No due dates in this category.",

  // Payment details (PaymentMethodsManager)
  "rent.pm.deleteConfirm": "Delete “{label}”? Tenants will no longer see it.",
  "rent.pm.title": "💸 Rent payment details",
  "rent.pm.desc1":
    "Your tenants see these details in their space, pay directly, then declare their payment — which you validate in",
  "rent.pm.descLink": "Rents",
  "rent.pm.empty":
    "No payment details yet. Add an IBAN, a mobile money number… so your tenants know how to pay their rent.",
  "rent.pm.hidden": "hidden",
  "rent.pm.holder": "Account holder: {name}",
  "rent.pm.hide": "Hide",
  "rent.pm.reactivate": "Reactivate",
  "rent.pm.delete": "Delete",
  "rent.pm.labelField": "Label *",
  "rent.pm.labelPlaceholder": "SEPA transfer, Orange Money…",
  "rent.pm.valueField": "Details *",
  "rent.pm.valuePlaceholder": "IBAN, number…",
  "rent.pm.holderField": "Account holder",
  "rent.pm.optional": "(optional)",
  "rent.pm.instructionsField": "Instructions",
  "rent.pm.instructionsPlaceholder": "E.g.: put your name and the month as the reference",
  "rent.pm.adding": "Adding…",
  "rent.pm.add": "Add",
  "rent.pm.addBtn": "+ Add payment details",
};
