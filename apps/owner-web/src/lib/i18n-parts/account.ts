// Dictionnaire de zone — compte, profil, documents, mots de passe, vue marché.
export const fr: Record<string, string> = {
  // Partagé
  "acc.save": "Enregistrer",
  "acc.saving": "Enregistrement…",
  "acc.cancel": "Annuler",
  "acc.delete": "Supprimer",
  "acc.view": "Voir",
  "acc.edit": "Modifier",
  "acc.loading": "Chargement…",
  "acc.sending": "Envoi…",
  "acc.email": "E-mail",
  "acc.yes": "Oui",
  "acc.no": "Non",
  "acc.confirmDeleteDoc": "Supprimer ce document ?",
  "acc.confirmDeleteProperty": "Supprimer ce bien ?",
  "acc.errorPrefix": "Erreur : ",
  "acc.unit.b": "o",
  "acc.unit.kb": "Ko",
  "acc.unit.mb": "Mo",

  // Profil
  "acc.profile.title": "Mon profil",
  "acc.profile.loggedInAs": "Connecté en tant que propriétaire",
  "acc.profile.firstName": "Prénom",
  "acc.profile.lastName": "Nom",
  "acc.profile.phone": "Téléphone",
  "acc.profile.updated": "Profil mis à jour ✓",

  // Avatar
  "acc.avatar.clickTitle": "Cliquer pour changer la photo",
  "acc.avatar.editOverlay": "📷 Modifier",
  "acc.avatar.change": "Changer la photo",

  // Types de documents d'identité
  "acc.docType.NATIONAL_ID": "Carte nationale d'identité",
  "acc.docType.PASSPORT": "Passeport",
  "acc.docType.DRIVERS_LICENSE": "Permis de conduire",
  "acc.docType.RESIDENCE_PERMIT": "Titre de séjour",
  "acc.docType.INCOME_PROOF": "Justificatif de revenus",
  "acc.docType.EMPLOYMENT_CONTRACT": "Contrat de travail",
  "acc.docType.TAX_NOTICE": "Avis d'imposition",
  "acc.docType.GUARANTOR_ID": "Pièce d'identité du garant",
  "acc.docType.GUARANTOR_INCOME": "Revenus du garant",
  "acc.docType.OTHER": "Autre",

  // Documents d'identité (carte profil)
  "acc.idDocs.title": "Documents d'identité",
  "acc.idDocs.sub":
    "CNI, passeport, titre de séjour… Ces documents restent privés et confidentiels.",
  "acc.idDocs.add": "+ Ajouter",
  "acc.idDocs.typeLabel": "Type de document",
  "acc.idDocs.nameLabel": "Nom / libellé",
  "acc.idDocs.fileLabel": "Fichier (image ou PDF)",
  "acc.idDocs.changeFile": "Changer de fichier",
  "acc.idDocs.clickSelect": "Cliquer pour sélectionner un fichier",
  "acc.idDocs.fileHint": "JPG, PNG, PDF — max 10 Mo",
  "acc.idDocs.empty": "Aucun document d'identité ajouté pour le moment.",
  "acc.idDocs.verified": "✓ Vérifié",

  // Types de documents légaux du bien
  "acc.propDocType.TITLE_DEED": "Acte de propriété",
  "acc.propDocType.PROPERTY_TAX": "Taxe foncière",
  "acc.propDocType.CO_OWNERSHIP_RULES": "Règlement de copropriété",
  "acc.propDocType.DIAGNOSTICS": "Diagnostics techniques (DDT)",
  "acc.propDocType.INSURANCE": "Assurance",
  "acc.propDocType.WORK_PERMIT": "Permis de construire / Déclaration travaux",
  "acc.propDocType.ENERGY_AUDIT": "Audit énergétique",
  "acc.propDocType.OTHER": "Autre",

  // Documents légaux du bien
  "acc.docs.back": "Retour au bien",
  "acc.docs.title": "Documents légaux",
  "acc.docs.add": "+ Ajouter un document",
  "acc.docs.editTitle": "Modifier le document",
  "acc.docs.addTitle": "Ajouter un document",
  "acc.docs.nameLabel": "Nom du document *",
  "acc.docs.namePh": "ex : Acte notarié 2020",
  "acc.docs.typeLabel": "Type de document *",
  "acc.docs.urlLabel": "URL du fichier *",
  "acc.docs.urlPh": "https://storage.exemple.com/fichier.pdf",
  "acc.docs.urlHelp":
    "Copiez l'URL après avoir déposé votre fichier sur votre service de stockage (Drive, Dropbox, S3…).",
  "acc.docs.notesLabel": "Notes (optionnel)",
  "acc.docs.notesPh": "Remarques, date d'expiration, références…",
  "acc.docs.update": "Mettre à jour",
  "acc.docs.addBtn": "Ajouter",
  "acc.docs.emptyTitle": "Aucun document enregistré",
  "acc.docs.emptySub":
    "Centralisez tous les documents officiels de ce bien en un seul endroit.",
  "acc.docs.addedOn": "Ajouté le",
  "acc.docs.manageLeases": "Gérer les contrats de location",

  // Mot de passe oublié
  "acc.fp.sentTitle": "Vérifiez votre boîte mail",
  "acc.fp.sentSub":
    "Si un compte existe pour cet e-mail, un lien de réinitialisation vient d'y être envoyé. Le lien est valable 30 minutes.",
  "acc.fp.backToLogin": "Retour à la connexion",
  "acc.fp.title": "Mot de passe oublié",
  "acc.fp.sub":
    "Saisissez votre e-mail : nous vous enverrons un lien pour définir un nouveau mot de passe.",
  "acc.fp.send": "Envoyer le lien",

  // Réinitialisation du mot de passe
  "acc.rp.errMismatch": "Les deux mots de passe ne correspondent pas.",
  "acc.rp.errShort": "Au moins 8 caractères.",
  "acc.rp.errExpired":
    "Ce lien a expiré ou a déjà été utilisé. Redemandez une réinitialisation.",
  "acc.rp.invalidLink": "Lien de réinitialisation invalide.",
  "acc.rp.requestAgain": "Redemander un lien",
  "acc.rp.doneTitle": "Mot de passe réinitialisé",
  "acc.rp.doneSub":
    "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
  "acc.rp.login": "Se connecter",
  "acc.rp.title": "Nouveau mot de passe",
  "acc.rp.sub": "Choisissez un nouveau mot de passe (au moins 8 caractères).",
  "acc.rp.confirmLabel": "Confirmer le mot de passe",
  "acc.rp.submitting": "Validation…",
  "acc.rp.submit": "Valider",

  // Fiche bien (vue marché)
  "acc.prop.forSale": "À vendre",
  "acc.prop.forRent": "À louer",
  "acc.prop.noPhoto": "Aucune photo",
  "acc.prop.description": "Description",
  "acc.prop.features": "Caractéristiques",
  "acc.prop.salePrice": "Prix de vente",
  "acc.prop.monthlyRent": "Loyer mensuel",
  "acc.prop.perMonth": "/mois",
  "acc.prop.roomOne": "pièce",
  "acc.prop.roomMany": "pièces",
  "acc.prop.owner": "Propriétaire",
  "acc.prop.tipTitle": "Astuce",
  "acc.prop.tipBody":
    "Comparez ce bien avec d'autres annonces en sauvegardant vos favoris depuis l'espace locataire.",
  "acc.feat.surface": "Surface",
  "acc.feat.rooms": "Pièces",
  "acc.feat.bedrooms": "Chambres",
  "acc.feat.bathrooms": "Salles de bain",
  "acc.feat.floor": "Étage",
  "acc.feat.year": "Année",
  "acc.feat.furnished": "Meublé",
  "acc.feat.parking": "Parking",
  "acc.feat.balcony": "Balcon",
  "acc.feat.garden": "Jardin",
  "acc.feat.elevator": "Ascenseur",

  // Tableau de bord (restes)
  "acc.dash.emptyTitle": "Vous n'avez encore aucun bien",
  "acc.dash.emptySub":
    "Publiez votre première annonce en quelques minutes. Photos, surface, prix : tout se fait en un seul écran.",
  "acc.dash.addProperty": "Ajouter un bien",
  "acc.dash.leases": "Contrats de location",

  // Pied de page
  "acc.footer.owner": "Espace propriétaire",
  "acc.footer.tagline": "Habiter avec élégance",
};

export const en: Record<string, string> = {
  // Shared
  "acc.save": "Save",
  "acc.saving": "Saving…",
  "acc.cancel": "Cancel",
  "acc.delete": "Delete",
  "acc.view": "View",
  "acc.edit": "Edit",
  "acc.loading": "Loading…",
  "acc.sending": "Sending…",
  "acc.email": "Email",
  "acc.yes": "Yes",
  "acc.no": "No",
  "acc.confirmDeleteDoc": "Delete this document?",
  "acc.confirmDeleteProperty": "Delete this property?",
  "acc.errorPrefix": "Error: ",
  "acc.unit.b": "B",
  "acc.unit.kb": "KB",
  "acc.unit.mb": "MB",

  // Profile
  "acc.profile.title": "My profile",
  "acc.profile.loggedInAs": "Signed in as landlord",
  "acc.profile.firstName": "First name",
  "acc.profile.lastName": "Last name",
  "acc.profile.phone": "Phone",
  "acc.profile.updated": "Profile updated ✓",

  // Avatar
  "acc.avatar.clickTitle": "Click to change the photo",
  "acc.avatar.editOverlay": "📷 Edit",
  "acc.avatar.change": "Change photo",

  // Identity document types
  "acc.docType.NATIONAL_ID": "National ID card",
  "acc.docType.PASSPORT": "Passport",
  "acc.docType.DRIVERS_LICENSE": "Driver's license",
  "acc.docType.RESIDENCE_PERMIT": "Residence permit",
  "acc.docType.INCOME_PROOF": "Proof of income",
  "acc.docType.EMPLOYMENT_CONTRACT": "Employment contract",
  "acc.docType.TAX_NOTICE": "Tax notice",
  "acc.docType.GUARANTOR_ID": "Guarantor's ID",
  "acc.docType.GUARANTOR_INCOME": "Guarantor's income",
  "acc.docType.OTHER": "Other",

  // Identity documents (profile card)
  "acc.idDocs.title": "Identity documents",
  "acc.idDocs.sub":
    "ID card, passport, residence permit… These documents remain private and confidential.",
  "acc.idDocs.add": "+ Add",
  "acc.idDocs.typeLabel": "Document type",
  "acc.idDocs.nameLabel": "Name / label",
  "acc.idDocs.fileLabel": "File (image or PDF)",
  "acc.idDocs.changeFile": "Choose another file",
  "acc.idDocs.clickSelect": "Click to select a file",
  "acc.idDocs.fileHint": "JPG, PNG, PDF — max 10 MB",
  "acc.idDocs.empty": "No identity document added yet.",
  "acc.idDocs.verified": "✓ Verified",

  // Property legal document types
  "acc.propDocType.TITLE_DEED": "Title deed",
  "acc.propDocType.PROPERTY_TAX": "Property tax",
  "acc.propDocType.CO_OWNERSHIP_RULES": "Co-ownership rules",
  "acc.propDocType.DIAGNOSTICS": "Technical diagnostics (DDT)",
  "acc.propDocType.INSURANCE": "Insurance",
  "acc.propDocType.WORK_PERMIT": "Building permit / Works declaration",
  "acc.propDocType.ENERGY_AUDIT": "Energy audit",
  "acc.propDocType.OTHER": "Other",

  // Property legal documents
  "acc.docs.back": "Back to property",
  "acc.docs.title": "Legal documents",
  "acc.docs.add": "+ Add a document",
  "acc.docs.editTitle": "Edit document",
  "acc.docs.addTitle": "Add a document",
  "acc.docs.nameLabel": "Document name *",
  "acc.docs.namePh": "e.g. Notarial deed 2020",
  "acc.docs.typeLabel": "Document type *",
  "acc.docs.urlLabel": "File URL *",
  "acc.docs.urlPh": "https://storage.example.com/file.pdf",
  "acc.docs.urlHelp":
    "Paste the URL after uploading your file to your storage service (Drive, Dropbox, S3…).",
  "acc.docs.notesLabel": "Notes (optional)",
  "acc.docs.notesPh": "Remarks, expiry date, references…",
  "acc.docs.update": "Update",
  "acc.docs.addBtn": "Add",
  "acc.docs.emptyTitle": "No document on file",
  "acc.docs.emptySub":
    "Keep all of this property's official documents in one place.",
  "acc.docs.addedOn": "Added on",
  "acc.docs.manageLeases": "Manage rental agreements",

  // Forgot password
  "acc.fp.sentTitle": "Check your inbox",
  "acc.fp.sentSub":
    "If an account exists for this email, a reset link has just been sent to it. The link is valid for 30 minutes.",
  "acc.fp.backToLogin": "Back to login",
  "acc.fp.title": "Forgot password",
  "acc.fp.sub":
    "Enter your email: we'll send you a link to set a new password.",
  "acc.fp.send": "Send the link",

  // Reset password
  "acc.rp.errMismatch": "The two passwords do not match.",
  "acc.rp.errShort": "At least 8 characters.",
  "acc.rp.errExpired":
    "This link has expired or was already used. Request a new reset.",
  "acc.rp.invalidLink": "Invalid reset link.",
  "acc.rp.requestAgain": "Request a new link",
  "acc.rp.doneTitle": "Password reset",
  "acc.rp.doneSub": "You can now log in with your new password.",
  "acc.rp.login": "Log in",
  "acc.rp.title": "New password",
  "acc.rp.sub": "Choose a new password (at least 8 characters).",
  "acc.rp.confirmLabel": "Confirm password",
  "acc.rp.submitting": "Validating…",
  "acc.rp.submit": "Confirm",

  // Property page (market view)
  "acc.prop.forSale": "For sale",
  "acc.prop.forRent": "For rent",
  "acc.prop.noPhoto": "No photos",
  "acc.prop.description": "Description",
  "acc.prop.features": "Features",
  "acc.prop.salePrice": "Sale price",
  "acc.prop.monthlyRent": "Monthly rent",
  "acc.prop.perMonth": "/month",
  "acc.prop.roomOne": "room",
  "acc.prop.roomMany": "rooms",
  "acc.prop.owner": "Owner",
  "acc.prop.tipTitle": "Tip",
  "acc.prop.tipBody":
    "Compare this property with other listings by saving your favorites from the tenant space.",
  "acc.feat.surface": "Surface",
  "acc.feat.rooms": "Rooms",
  "acc.feat.bedrooms": "Bedrooms",
  "acc.feat.bathrooms": "Bathrooms",
  "acc.feat.floor": "Floor",
  "acc.feat.year": "Year",
  "acc.feat.furnished": "Furnished",
  "acc.feat.parking": "Parking",
  "acc.feat.balcony": "Balcony",
  "acc.feat.garden": "Garden",
  "acc.feat.elevator": "Elevator",

  // Dashboard (leftovers)
  "acc.dash.emptyTitle": "You don't have any properties yet",
  "acc.dash.emptySub":
    "Publish your first listing in minutes. Photos, surface area, price: everything happens on a single screen.",
  "acc.dash.addProperty": "Add a property",
  "acc.dash.leases": "Rental agreements",

  // Footer
  "acc.footer.owner": "Owner space",
  "acc.footer.tagline": "Living with elegance",
};
