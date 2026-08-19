// Dictionnaire de zone — formulaire de bien (PropertyForm, ImageUploader,
// pages nouveau bien / édition). fr = textes d'origine, en = traduction.
export const fr: Record<string, string> = {
  // ── Sélecteur de pays ──
  "pf.country.select": "Sélectionner un pays…",
  "pf.country.search": "Rechercher un pays…",
  "pf.country.noResult": "Aucun résultat",

  // ── Type d'annonce ──
  "pf.listingType.title": "Type d'annonce",
  "pf.listingType.sub":
    "Choisissez d'abord : les champs et conseils s'adaptent au type d'annonce.",
  "pf.sale": "Vente",
  "pf.sale.desc": "DPE, copropriété, taxe foncière, frais de notaire",
  "pf.rent": "Location",
  "pf.rent.desc": "Bail, charges, dépôt, préavis, type de location",

  // ── Description ──
  "pf.desc.title": "Description",
  "pf.title": "Titre de l'annonce",
  "pf.title.phSale": "ex : Bel appartement haussmannien avec balcon",
  "pf.title.phRent": "ex : Studio meublé au cœur du centre-ville",
  "pf.description": "Description",
  "pf.description.phSale":
    "Décrivez les atouts du bien, son histoire, le quartier, les travaux récents…",
  "pf.description.phRent":
    "Décrivez l'ambiance, la décoration, les services à proximité, les conditions du bail…",
  "pf.propertyType": "Type de bien",
  "pf.type.APARTMENT": "Appartement",
  "pf.type.HOUSE": "Maison",
  "pf.type.STUDIO": "Studio",
  "pf.type.LAND": "Terrain",
  "pf.type.COMMERCIAL": "Local commercial",
  "pf.type.OTHER": "Autre",

  // ── Caractéristiques ──
  "pf.features": "Caractéristiques",
  "pf.surface": "Surface (m²)",
  "pf.rooms": "Nombre de pièces",
  "pf.bedrooms": "Chambres",
  "pf.bathrooms": "Salles de bain",
  "pf.floor": "Étage",
  "pf.yearBuilt": "Année de construction",
  "pf.furnished": "Meublé",
  "pf.parking": "Parking",
  "pf.balcony": "Balcon",
  "pf.garden": "Jardin",
  "pf.elevator": "Ascenseur",

  // ── Localisation ──
  "pf.location": "Localisation",
  "pf.address": "Adresse",
  "pf.postalCode": "Code postal",
  "pf.city": "Ville",
  "pf.country": "Pays",
  "pf.currency": "Devise",
  "pf.latitude": "Latitude",
  "pf.longitude": "Longitude",

  // ── Prix principal ──
  "pf.price.saleTitle": "Prix de vente",
  "pf.price.rentTitle": "Loyer mensuel",
  "pf.price.saleSub":
    "Prix de vente affiché sur l'annonce. Hors frais de notaire.",
  "pf.price.rentSub":
    "Loyer mensuel hors charges. Vous pouvez ajouter une grille tarifaire pour la location courte durée.",
  "pf.price.sale": "Prix",
  "pf.price.rent": "Loyer / mois",

  // ── Informations vente ──
  "pf.saleInfo.title": "Informations vente",
  "pf.saleInfo.sub":
    "Diagnostics, charges, fiscalité — tout ce qui rassure un acheteur.",
  "pf.dpe": "Classe énergétique (DPE)",
  "pf.dpe.help": "Note A (très économe) à G (très énergivore).",
  "pf.dpe.classAria": "Classe {c}",
  "pf.dpe.clear": "Effacer",
  "pf.coOwnershipFees": "Charges de copropriété / mois",
  "pf.propertyTax": "Taxe foncière annuelle",
  "pf.notaryFees": "Frais de notaire (%)",
  "pf.notaryFees.help": "~7-8 % dans l'ancien, ~2-3 % dans le neuf.",
  "pf.isNew": "Bien neuf / VEFA",
  "pf.isNew.check": "Construction neuve ou VEFA",
  "pf.ph": "ex : {v}",

  // ── Informations location ──
  "pf.rentInfo.title": "Informations location",
  "pf.rentInfo.sub":
    "Type de bail, charges, dépôt — tout ce que le futur locataire doit savoir avant de candidater.",
  "pf.rentalKind": "Type de location",
  "pf.rentalKind.BARE": "Location nue",
  "pf.rentalKind.FURNISHED": "Location meublée",
  "pf.rentalKind.SEASONAL": "Location saisonnière",
  "pf.rentalKind.STUDENT": "Bail étudiant",
  "pf.charges": "Charges",
  "pf.charges.included": "✓ Charges comprises dans le loyer",
  "pf.charges.extra": "Charges en supplément",
  "pf.charges.amount": "Montant mensuel des charges",
  "pf.deposit": "Dépôt de garantie",
  "pf.deposit.phWithPrice": "ex : {amount} (1 mois)",
  "pf.deposit.ph": "ex : 1 mois de loyer",
  "pf.deposit.help": "Généralement 1 mois (nu) ou 2 mois (meublé).",
  "pf.notice": "Préavis (mois)",
  "pf.notice.help": "Délai entre la résiliation et le départ.",
  "pf.pets": "Animaux",
  "pf.pets.yes": "🐾 Acceptés",
  "pf.pets.no": "✕ Non autorisés",

  // ── Grille tarifaire ──
  "pf.rates.title": "Grille tarifaire détaillée",
  "pf.rates.sub":
    "Optionnel — pour les locations courtes ou saisonnières : tarif au jour, à la semaine, au mois ou à l'année.",
  "pf.rates.per": "Par {unit}",
  "pf.unit.DAYS": "jour",
  "pf.unit.WEEKS": "semaine",
  "pf.unit.MONTHS": "mois",
  "pf.unit.YEARS": "an",

  // ── Photos ──
  "pf.photos.title": "Photos",
  "pf.photos.sub": "Jusqu'à 10 photos. La première sera la photo principale.",

  // ── Publication ──
  "pf.publish.title": "Publication",
  "pf.status.draft": "Brouillon",
  "pf.status.draftDesc": "Visible seulement par vous.",
  "pf.status.published": "Publié",
  "pf.status.publishedDesc":
    "Visible immédiatement sur la landing publique.",
  "pf.submit.saving": "Enregistrement…",
  "pf.submit.publish": "Publier le bien",
  "pf.submit.draft": "Enregistrer en brouillon",

  // ── ImageUploader ──
  "pf.up.readError": "Erreur de lecture du fichier",
  "pf.up.loadError": "Certains fichiers n'ont pas pu être chargés.",
  "pf.up.drop": "Glissez vos photos ici ou",
  "pf.up.browse": "cliquez pour parcourir",
  "pf.up.formats": "JPG, PNG, WEBP · max {max} photos",
  "pf.up.added": "· {n}/{max} ajoutée",
  "pf.up.addedPlural": "· {n}/{max} ajoutées",
  "pf.up.photoAlt": "Photo {n}",
  "pf.up.main": "Principale",
  "pf.up.moveLeft": "Déplacer à gauche",
  "pf.up.moveRight": "Déplacer à droite",
  "pf.up.delete": "Supprimer",
  "pf.up.add": "Ajouter",

  // ── Pages nouveau bien / édition ──
  "pf.errPrefix": "Erreur : ",
  "pf.back": "Retour au tableau de bord",
  "pf.new.badge": "Nouveau bien",
  "pf.new.title1": "Présentez votre bien",
  "pf.new.title2": "avec soin",
  "pf.new.sub":
    "Une annonce complète et illustrée attire des candidats sérieux. Comptez 10 à 15 minutes pour saisir tous les détails — vous pourrez modifier à tout moment.",
  "pf.new.tip1": "Photos lumineuses, plusieurs angles",
  "pf.new.tip2": "Adresse précise, ville exacte",
  "pf.new.tip3": "Prix juste, devise locale",
  "pf.new.tip4": "Description honnête et vivante",
  "pf.edit.published": "🌍 Annonce publiée",
  "pf.edit.draft": "📝 Brouillon",
  "pf.edit.title": "Modifier",
  "pf.edit.room": "pièce",
  "pf.edit.roomsPlural": "pièces",
  "pf.edit.docs": "🗂️ Documents légaux",
  "pf.edit.leases": "📋 Contrats de location",
  "pf.edit.preview": "👁 Aperçu public",
  "pf.edit.submit": "Mettre à jour",
};

export const en: Record<string, string> = {
  // ── Country picker ──
  "pf.country.select": "Select a country…",
  "pf.country.search": "Search for a country…",
  "pf.country.noResult": "No results",

  // ── Listing type ──
  "pf.listingType.title": "Listing type",
  "pf.listingType.sub":
    "Choose first: the fields and tips adapt to the listing type.",
  "pf.sale": "Sale",
  "pf.sale.desc": "Energy rating, co-ownership, property tax, notary fees",
  "pf.rent": "Rental",
  "pf.rent.desc": "Lease, charges, deposit, notice period, rental type",

  // ── Description ──
  "pf.desc.title": "Description",
  "pf.title": "Listing title",
  "pf.title.phSale": "e.g. Beautiful Haussmann-style apartment with balcony",
  "pf.title.phRent": "e.g. Furnished studio in the heart of the city centre",
  "pf.description": "Description",
  "pf.description.phSale":
    "Describe the property's strengths, its history, the neighbourhood, recent renovations…",
  "pf.description.phRent":
    "Describe the atmosphere, the decoration, nearby amenities, the lease terms…",
  "pf.propertyType": "Property type",
  "pf.type.APARTMENT": "Apartment",
  "pf.type.HOUSE": "House",
  "pf.type.STUDIO": "Studio",
  "pf.type.LAND": "Land",
  "pf.type.COMMERCIAL": "Commercial premises",
  "pf.type.OTHER": "Other",

  // ── Features ──
  "pf.features": "Features",
  "pf.surface": "Surface area (m²)",
  "pf.rooms": "Number of rooms",
  "pf.bedrooms": "Bedrooms",
  "pf.bathrooms": "Bathrooms",
  "pf.floor": "Floor",
  "pf.yearBuilt": "Year built",
  "pf.furnished": "Furnished",
  "pf.parking": "Parking",
  "pf.balcony": "Balcony",
  "pf.garden": "Garden",
  "pf.elevator": "Elevator",

  // ── Location ──
  "pf.location": "Location",
  "pf.address": "Address",
  "pf.postalCode": "Postal code",
  "pf.city": "City",
  "pf.country": "Country",
  "pf.currency": "Currency",
  "pf.latitude": "Latitude",
  "pf.longitude": "Longitude",

  // ── Main price ──
  "pf.price.saleTitle": "Sale price",
  "pf.price.rentTitle": "Monthly rent",
  "pf.price.saleSub":
    "Sale price shown on the listing. Notary fees not included.",
  "pf.price.rentSub":
    "Monthly rent excluding charges. You can add a pricing grid for short-term rentals.",
  "pf.price.sale": "Price",
  "pf.price.rent": "Rent / month",

  // ── Sale details ──
  "pf.saleInfo.title": "Sale details",
  "pf.saleInfo.sub":
    "Surveys, charges, taxes — everything that reassures a buyer.",
  "pf.dpe": "Energy class (EPC)",
  "pf.dpe.help": "Rated A (very efficient) to G (very energy-intensive).",
  "pf.dpe.classAria": "Class {c}",
  "pf.dpe.clear": "Clear",
  "pf.coOwnershipFees": "Co-ownership fees / month",
  "pf.propertyTax": "Annual property tax",
  "pf.notaryFees": "Notary fees (%)",
  "pf.notaryFees.help": "~7-8% for existing homes, ~2-3% for new builds.",
  "pf.isNew": "New build / off-plan",
  "pf.isNew.check": "New construction or off-plan (VEFA)",
  "pf.ph": "e.g. {v}",

  // ── Rental details ──
  "pf.rentInfo.title": "Rental details",
  "pf.rentInfo.sub":
    "Lease type, charges, deposit — everything a prospective tenant needs to know before applying.",
  "pf.rentalKind": "Rental type",
  "pf.rentalKind.BARE": "Unfurnished rental",
  "pf.rentalKind.FURNISHED": "Furnished rental",
  "pf.rentalKind.SEASONAL": "Seasonal rental",
  "pf.rentalKind.STUDENT": "Student lease",
  "pf.charges": "Charges",
  "pf.charges.included": "✓ Charges included in the rent",
  "pf.charges.extra": "Charges billed separately",
  "pf.charges.amount": "Monthly amount of charges",
  "pf.deposit": "Security deposit",
  "pf.deposit.phWithPrice": "e.g. {amount} (1 month)",
  "pf.deposit.ph": "e.g. 1 month's rent",
  "pf.deposit.help": "Usually 1 month (unfurnished) or 2 months (furnished).",
  "pf.notice": "Notice period (months)",
  "pf.notice.help": "Time between giving notice and moving out.",
  "pf.pets": "Pets",
  "pf.pets.yes": "🐾 Allowed",
  "pf.pets.no": "✕ Not allowed",

  // ── Pricing grid ──
  "pf.rates.title": "Detailed pricing grid",
  "pf.rates.sub":
    "Optional — for short-term or seasonal rentals: daily, weekly, monthly or yearly rates.",
  "pf.rates.per": "Per {unit}",
  "pf.unit.DAYS": "day",
  "pf.unit.WEEKS": "week",
  "pf.unit.MONTHS": "month",
  "pf.unit.YEARS": "year",

  // ── Photos ──
  "pf.photos.title": "Photos",
  "pf.photos.sub": "Up to 10 photos. The first one will be the main photo.",

  // ── Publication ──
  "pf.publish.title": "Publication",
  "pf.status.draft": "Draft",
  "pf.status.draftDesc": "Visible only to you.",
  "pf.status.published": "Published",
  "pf.status.publishedDesc":
    "Immediately visible on the public landing page.",
  "pf.submit.saving": "Saving…",
  "pf.submit.publish": "Publish the property",
  "pf.submit.draft": "Save as draft",

  // ── ImageUploader ──
  "pf.up.readError": "Failed to read the file",
  "pf.up.loadError": "Some files could not be loaded.",
  "pf.up.drop": "Drag your photos here or",
  "pf.up.browse": "click to browse",
  "pf.up.formats": "JPG, PNG, WEBP · max {max} photos",
  "pf.up.added": "· {n}/{max} added",
  "pf.up.addedPlural": "· {n}/{max} added",
  "pf.up.photoAlt": "Photo {n}",
  "pf.up.main": "Main",
  "pf.up.moveLeft": "Move left",
  "pf.up.moveRight": "Move right",
  "pf.up.delete": "Delete",
  "pf.up.add": "Add",

  // ── New / edit property pages ──
  "pf.errPrefix": "Error: ",
  "pf.back": "Back to dashboard",
  "pf.new.badge": "New property",
  "pf.new.title1": "Present your property",
  "pf.new.title2": "with care",
  "pf.new.sub":
    "A complete, illustrated listing attracts serious applicants. Allow 10 to 15 minutes to enter all the details — you can edit at any time.",
  "pf.new.tip1": "Bright photos, several angles",
  "pf.new.tip2": "Precise address, exact city",
  "pf.new.tip3": "Fair price, local currency",
  "pf.new.tip4": "Honest, lively description",
  "pf.edit.published": "🌍 Listing published",
  "pf.edit.draft": "📝 Draft",
  "pf.edit.title": "Edit",
  "pf.edit.room": "room",
  "pf.edit.roomsPlural": "rooms",
  "pf.edit.docs": "🗂️ Legal documents",
  "pf.edit.leases": "📋 Rental agreements",
  "pf.edit.preview": "👁 Public preview",
  "pf.edit.submit": "Update",
};
