# Espace Voyage

Guides de voyage, carnets de voyage et séjours courte durée, dans l'espace
locataire (`/voyage`) et l'espace propriétaire (`/dashboard/sejours`).

## Guides

- **Pays** (`CountryGuide`) : introduction et rubriques d'infos pratiques.
- **Destinations** (`Destination`) → **lieux** (`Place`, 10 catégories).
- **Circuits** (`Circuit` + `CircuitStep`) : programme jour par jour, copiable
  en carnet de voyage.
- Textes en français dans les colonnes, autres langues dans `translations`
  (`{ en: { champ: texte }, es: … }`) ; repli langue → en → fr.
- Images : banque statique des fronts (`/images/voyage/<slug>-{480,1200}.webp`,
  crédits dans `apps/landing/public/images/CREDITS.md`) ou image téléversée
  dans l'admin (`VoyageImage`, servie par `/api/media/voyage/<clé>`).
- `reviewed = false` : contenu « à relire » dans l'admin (onglet Voyage).
- Contenu de départ du Bénin : `apps/api/src/voyage/seed/` (fr, en, es, pt, ar),
  inséré une seule fois au démarrage de l'API si le pays n'a ni guide ni
  destination (`VOYAGE_SEED=0` pour désactiver). Ensuite tout se gère dans
  l'admin.

## Carnets de voyage

`Trip` + `TripItem` (lieu ou note, jour, heure, fait). Jour 0 = « à placer ».
Le carnet affiche aussi les séjours réservés pendant le voyage. Partage en
lecture seule par lien (`/voyage/partage/<jeton>`), révocable.

## Séjours courte durée

Sur un bien en location (de préférence « location saisonnière ») :

1. L'hôte (propriétaire, ou pro sous **mandat de gestion** — action `STAYS`)
   ouvre les réservations : prix par nuit (sinon tarif « jour » de la grille ;
   tarifs semaine et mois appliqués en dégressif), ménage, nuits min/max,
   voyageurs, délai, horaires, politique d'annulation, mode de paiement,
   règlement, instructions d'arrivée.
2. Le voyageur choisit ses dates sur le calendrier et envoie une demande
   (`REQUESTED`, 48 h pour répondre, 5 demandes en attente au plus).
3. L'hôte accepte : `CONFIRMED` (paiement sur place) ou `ACCEPTED`
   (paiement avant l'arrivée, 72 h). Les demandes concurrentes sur les mêmes
   dates sont refusées automatiquement.
4. Paiement avant l'arrivée : le voyageur paie l'hôte directement (moyens de
   paiement du profil, ou IBAN de l'agence si elle encaisse les loyers),
   déclare « j'ai payé », l'hôte confirme → `CONFIRMED`. **hwe n'encaisse
   rien** (paiement en ligne : décision en attente).
5. Adresse exacte et instructions d'arrivée visibles une fois confirmé.
6. Après le départ : `COMPLETED`, avis 1–5 dans les 60 jours, réponse publique
   de l'hôte, modération dans l'admin.

Annulation : par le voyageur selon la politique (flexible / modérée /
stricte, montant à rembourser calculé), par l'hôte avec motif (remboursement
intégral si payé).

Double réservation impossible : verrou consultatif par bien + contrainte
d'exclusion PostgreSQL (`Booking_no_overlap`, extension `btree_gist`).

Tâches planifiées (`StaysSchedulerService`) : toutes les 10 min, expiration
des demandes et des paiements non reçus, séjours terminés ; toutes les heures,
relecture des calendriers importés.

### Calendriers (iCal)

- Export : `/api/stays/ical/<jeton>.ics` (réservations + fermetures manuelles,
  sans donnée personnelle), jeton régénérable.
- Import : URL iCal d'Airbnb, Booking… relue toutes les heures ; protection
  SSRF (http/https publics uniquement, adresses privées refusées à la
  connexion, 3 redirections, 2 Mo, 10 s).

### Commission

`PlatformSettings.stayCommissionPct` (admin, 0 par défaut), figée sur chaque
réservation, à la charge de l'hôte, jamais montrée au voyageur.

## Tests

- Unitaires : `apps/api/test/voyage.spec.ts` (prix, disponibilité,
  remboursements, iCal, SSRF, traductions, e-mails dans les 5 langues).
