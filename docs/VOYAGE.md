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
- Contenu de départ de 10 pays d'Afrique de l'Ouest (`VOYAGE_COUNTRIES` :
  Bénin, Togo, Ghana, Nigeria, Côte d'Ivoire, Sénégal, Burkina Faso, Niger,
  Mali, Guinée) : `apps/api/src/voyage/seed/<pays>.ts` (fr + en) et
  `<pays>-i18n.ts` (es, pt, ar), fêtes dans `<pays>-events.ts` (5 langues et
  sources), liste dans `seed/index.ts`. Au démarrage de l'API
  (`VOYAGE_SEED=0` pour désactiver), un pays sans guide ni destination est
  inséré en entier ; sinon seuls les éléments ajoutés au seed depuis sont
  insérés (destinations, lieux, circuits, fêtes jamais insérés : journal
  `VoyageSeedEntry`). Un élément supprimé dans l'admin n'est jamais recréé.
- Mise à jour du contenu de départ : tant qu'un élément n'a été ni modifié ni
  marqué relu dans l'admin, il suit la version à jour du seed au démarrage
  (textes, traductions, image). Les circuits retirés du seed
  (`RETIRED_CIRCUITS`) sont supprimés aux mêmes conditions. Un élément modifié
  dans l'admin n'est plus jamais touché.
- Sécurité : chaque guide a une rubrique « Sécurité » fondée sur les conseils
  aux voyageurs de France Diplomatie et du FCDO (octobre 2026). Aucun circuit
  ne passe par une zone formellement déconseillée ; Burkina Faso, Niger et
  Mali, déconseillés dans leur ensemble, sont des guides « patrimoine » sans
  circuit. **À revoir à chaque évolution de ces avis.**
- Photos de la banque : WebP 3:2 en 480 et 1200 px (`lieu-<slug>` pour un
  lieu, `fete-<slug>` pour une fête, `<slug>` pour une destination), toutes
  sous licence libre (Wikimedia Commons), une ligne par photo dans
  `CREDITS.md`. Le crédit affiché sous chaque photo (auteur · source ·
  licence) vient de `seed/photo-credits.ts`, généré depuis `CREDITS.md`.
- Vérifier un fichier pays : test unitaire `voyage.spec.ts` (slugs uniques
  tous pays confondus, circuits et fêtes résolus, 5 langues complètes,
  règles de date valides, photos présentes et créditées).

## Fêtes et événements

`VoyageEvent` : jours fériés, fêtes religieuses et traditionnelles, festivals,
saisons festives et soirées, rattachés à un pays et, si possible, à une
destination ou un lieu. Les dates ne se saisissent pas chaque année : une
règle (`rule`) les calcule (`@hwe/types` → `voyage-events.ts`) :

| Règle | Exemple |
|---|---|
| `fixed` (mois, jour) | Fête de l'indépendance, 1er août |
| `easter` (décalage) | Lundi de Pâques +1, Ascension +39, lundi de Pentecôte +50 |
| `hijri` (mois, jour) | Aïd el-Fitr 10/1, Tabaski 12/10, Maouloud 3/12 — estimation Umm al-Qura à ±1 jour, signalée « vers le » |
| `nth-weekday` | 1er samedi d'août |
| `period` (mois → mois) | Festival dont les dates sont annoncées chaque année |

`days` = durée. `publicHoliday` = jour chômé ; `caution` = zone déconseillée
(avertissement renvoyant à la rubrique Sécurité) ; `sources` = URL consultées,
visibles seulement dans l'admin.

- Public : `GET /voyage/countries/:cc/events?from&to` (12 mois par défaut,
  3 ans au plus), `GET /voyage/events/:slug` ; fêtes d'une destination ou d'un
  lieu dans leurs fiches ; fêtes du pays pendant les dates d'un carnet.
- Pages : `/voyage/fetes?pays=BJ[&du=…&au=…]` (calendrier par mois, filtres),
  `/voyage/fetes/<slug>` (fiche), onglet « Fêtes et événements ».
- Admin (onglet Voyage) : création, règle de date avec aperçu des prochaines
  dates, liens, sources, traductions.

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
