# État des lieux des processus — hwe

*Établi le 17 août 2026, après la mise en place du module loyers et la refonte visuelle des écrans associés.*

hwe est une plateforme de mise en relation immobilière (vente et location) avec trois interfaces : **landing** (vitrine), **espace propriétaire** et **espace locataire/acheteur**. Principe fondateur : **la plateforme ne détient jamais d'argent** — elle organise l'information, la relation et la preuve.

---

## 1. Processus opérationnels et fonctionnels

### 1.1 Découverte et mise en relation
| Étape | Qui | État |
|---|---|---|
| Parcours des annonces avec filtres (type, bien, pays, ville, prix, surface) | Public | ✅ En prod |
| Fiche détaillée d'un bien (photos en carrousel, caractéristiques, DPE) | Public | ✅ En prod |
| Favoris | Locataire connecté | ✅ En prod |
| Demande de contact (message, date souhaitée, durée envisagée) | Locataire → Propriétaire | ✅ En prod |
| Messagerie par bien (conversations, non-lus, cloche de notification) | Les deux | ✅ En prod |

### 1.2 Publication et gestion des biens
| Étape | Qui | État |
|---|---|---|
| Création/édition d'annonce (photos multiples, vente ou location) | Propriétaire | ✅ En prod |
| Grille tarifaire (prix par jour/semaine/mois pour la location) | Propriétaire | ✅ En prod |
| Documents légaux attachés au bien | Propriétaire | ✅ En prod |
| Statuts du bien (publié, loué, vendu) avec re-publication automatique en fin de bail | Automatique | ✅ En prod |

### 1.3 Bail
| Étape | Qui | État |
|---|---|---|
| Génération du contrat (conforme loi 89-462 / ALUR, meublé ou non) | Propriétaire | ✅ En prod |
| Rattachement du locataire par son adresse e-mail | Automatique | ✅ En prod |
| Signature électronique des deux parties | Les deux | ✅ En prod |
| Suivi de la durée (barre de progression, compte à rebours) | Locataire | ✅ En prod |
| Alertes de fin de bail J-7 et J-1 (e-mail aux deux parties) | Cron quotidien 8 h | ✅ En prod* |
| Expiration automatique : bail → expiré, bien → re-publié | Cron quotidien 8 h | ✅ En prod |

### 1.4 Loyers (nouveau — modèle « paiement direct »)
| Étape | Qui | État |
|---|---|---|
| Coordonnées de paiement publiées (IBAN, mobile money…, max 8) | Propriétaire | ✅ En prod |
| Génération d'une échéance par mois de bail, montant figé (loyer + charges) | Cron 7 h + rattrapage à l'ouverture des pages | ✅ En prod |
| Déclaration de versement : identifiant de transaction **unique en base**, capture optionnelle, note | Locataire | ✅ En prod |
| Validation ou refus motivé (consigne : vérifier LE RELEVÉ, pas la capture) | Propriétaire (ou admin) | ✅ En prod |
| Quittance PDF numérotée `HWE-AAAA-NNNNN`, téléchargeable par les deux parties | Automatique à la validation | ✅ En prod |
| Passage « en retard » après échéance + rappels e-mail (max 1/semaine) | Cron 7 h | ✅ En prod* |
| Anti-fraude : une référence refusée est libérée ; une référence validée est définitivement consommée | Automatique | ✅ En prod, testé (27 vérifications e2e) |

*\* Les e-mails sont **journalisés** tant que le SMTP n'est pas configuré (voir §3).*

### 1.5 Profils et identité
| Étape | Qui | État |
|---|---|---|
| Profil (nom, téléphone, photo) | Les deux | ✅ En prod |
| Documents d'identité privés (CNI, passeport…) | Les deux | ✅ En prod |
| Conversion de devise à l'affichage | Locataire | ✅ En prod |

---

## 2. Ce qui manque (par ordre de priorité conseillé)

1. **Mot de passe oublié** — aucun moyen de récupérer un compte. Premier irritant réel dès les premiers utilisateurs. *(Demande le SMTP, voir §3.)*
2. **Vérification de l'adresse e-mail à l'inscription** — d'autant plus importante que le bail et les loyers sont rattachés par e-mail : une faute de frappe du propriétaire dans `tenantEmail` prive le locataire de son espace (et une vérification ferme la porte à l'usurpation).
3. **Interface d'administration** — le rôle ADMIN existe côté API (il peut arbitrer un loyer), mais il n'y a aucune page dédiée : ni supervision des comptes, ni modération des annonces, ni statistiques globales.
4. **Notifications e-mail des messages et demandes** — la messagerie n'alerte qu'à l'intérieur de l'app ; un propriétaire qui ne se connecte pas ne voit pas les demandes.
5. **Caution / état des lieux** — le dépôt de garantie est mentionné au contrat mais ni son versement ni sa restitution ne sont suivis ; pas d'état des lieux d'entrée/sortie dans l'app.
6. **Côté vente** — le processus s'arrête à la mise en relation (normal : la vente se conclut chez le notaire), mais un suivi d'étapes (offre, compromis, acte) donnerait de la valeur.

## 3. Points techniques à connaître

- **SMTP absent en prod** : renseigner `SMTP_HOST/PORT/USER/PASS/FROM` dans `/opt/hwe/.env` active d'un coup rappels de loyers, quittances, alertes de fin de bail — et débloque le « mot de passe oublié » le jour où il est développé.
- **Images en base de données** (photos, preuves, avatars en base64) : simple et sans dépendance, mais la base grossit vite. À migrer vers un stockage objet (R2/S3) si l'usage décolle.
- **Migrations Prisma** : l'historique est cassé ; le déploiement s'appuie sur `prisma db push` (documenté dans le Dockerfile). Fonctionnel, mais à assainir avant tout gros changement de schéma.
- **Pas de limitation de débit** sur l'API (contrairement à AfroChina) : à ajouter si le trafic devient réel.
- **Sauvegardes** : pas de cron de sauvegarde de la base hwe sur le VPS (seul bjdrive en a un). Des dumps manuels sont faits avant chaque déploiement.
- **Déploiement** : `/opt/hwe` est un clone git ; `git pull` puis `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`.

## 4. Parcours utilisateur de référence

```
Propriétaire                              Locataire
────────────                              ─────────
Publie le bien ──────────────────────────▶ Découvre l'annonce, favoris
      ◀───────────────────────────────────  Demande de contact / messagerie
Crée le bail (e-mail du locataire) ──────▶ Retrouve le bail dans son espace
Signe ◀──────────────────────────────────▶ Signe
      │  (cron : échéances mensuelles)
Renseigne ses coordonnées de paiement ───▶ Voit comment payer
      ◀───────────────────────────────────  Paie hors plateforme puis déclare
Vérifie son relevé, valide ──────────────▶ Reçoit sa quittance PDF
      │  (cron : rappels, retards, fin de bail J-7/J-1)
Fin de bail : bien re-publié automatiquement
```
