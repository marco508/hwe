# hwe dans l'écosystème DKP Solution

Contrat commun : `/opt/dkp/CONTRAT.md`. Chaque fonction ci-dessous est activée
par ses variables d'environnement (API) ; **sans elles, hwe se comporte comme
avant** (boutons et liens masqués, e-mails par SMTP seul). Les fronts lisent
`GET /api/dkp/config` (aucun secret) pour savoir quoi afficher : aucune
reconstruction des fronts n'est nécessaire pour activer ou couper une fonction.

## Variables (API)

| Variable | Rôle |
|---|---|
| `DKP_HUB_URL` | URL serveur du hub (prod : `https://dkpsolution.tech` — les apps se joignent par leurs URL publiques HTTPS, sans réseau docker partagé) |
| `DKP_PUBLIC_URL` | URL du hub vue par le navigateur (`https://dkpsolution.tech`) ; active aussi « Services DKP » dans les pieds de page |
| `DKP_CLIENT_ID` / `DKP_CLIENT_SECRET` | identifiants de hwe sur le hub (portées `login,email,payments`) |
| `DKP_LOGIN` | `0` = masquer « Continuer avec un compte DKP » (défaut : actif si hub configuré) |
| `DKP_PAYMENTS` | `0` = masquer le paiement en ligne de l'abonnement pro (défaut : actif si le hub le propose) |
| `DKP_REDIRECT_URI` | (facultatif) adresse de retour OAuth ; défaut `PUBLIC_API_URL` + `/auth/dkp/callback` — à déclarer telle quelle sur le hub |
| `DKP_PARTNER_KEYS` | clés des apps qui appellent hwe : `familyfe:<clé>` (16 caractères min.) |
| `ZEMI_PUBLIC_URL` | lien « Faire livrer des courses à ce logement — Zémi Market » (biens au Bénin) |
| `AFROCHINA_PUBLIC_URL` / `AFROCHINA_REQUEST_PATH` | lien « Équiper ce logement depuis la Chine » (chemin par défaut `/client/request/new`) |
| `GESTIPRO_PARTNER_URL` | API GestiPro : active « Facturation GestiPro » dans l'espace pro |
| `GESTIPRO_PUBLIC_URL` / `FAMILYFE_PUBLIC_URL` | (facultatif) liens affichés ; sinon URL de l'annuaire DKP |

Enregistrer hwe sur le hub (secret écrit dans un fichier chmod 600, jamais affiché) :

```
docker exec -e SECRET_OUT=/tmp/c.env <conteneur du hub> node src/cli.js client hwe "hwe" login,email,payments https://hwe.dkpsolution.tech/api/auth/dkp/callback
```

## Fonctions

- **Compte DKP** (`GET /api/auth/dkp/start?space=owner|tenant&next=…`, puis
  `/api/auth/dkp/callback`) : OAuth 2 + PKCE S256, état gardé 10 min dans un
  cookie httpOnly signé. Rattachement : `User.dkpSub` déjà lié, sinon e-mail
  **vérifié par le hub** (jamais un e-mail non vérifié), sinon nouveau compte
  au rôle public de l'espace (OWNER côté propriétaire, TENANT côté locataire ;
  jamais AGENT ni ADMIN). Un compte ADMIN ne se connecte jamais ainsi. Le jeton
  hwe est remis au front dans le fragment (`/auth/dkp#access=…`).
- **E-mails** : sans `SMTP_HOST`, tous les e-mails (invitations, mandats,
  loyers, réinitialisation…) partent par `POST /hub/v1/email`.
- **Abonnement pro payé en ligne** (KkiaPay via le hub, XOF) :
  `GET|POST /api/agencies/me/subscription/online`, puis `…/online/confirm`
  `{reference, transactionId}` ; la transaction est vérifiée par le hub
  (montant attendu, référence unique) avant d'enregistrer le paiement comme
  une validation manuelle (facture FAC-…, moyen « KKIAPAY »). Le paiement
  manuel reste disponible. **Jamais pour un loyer.**
- **FamiLyfe** : le locataire crée un code de partage du loyer (30 jours,
  révocable : `/api/leases/:id/rent-share`) ; FamiLyfe lit
  `GET /api/partners/v1/loyer/:code` (`Authorization: Bearer <clé>`,
  `X-DKP-Partner: familyfe`).
- **GestiPro** : l'agence colle sa clé `gp_…` (jamais renvoyée au front),
  la teste, puis envoie le relevé mensuel des honoraires : une facture par
  propriétaire et par devise, référence `HWE-<agence>-<AAAA-MM>-<propriétaire>-<devise>`
  (idempotente côté GestiPro).
- **Zémi Market / AfroChina** : liens pré-remplis (`dkp_source=hwe`) sur le
  bail et les réservations confirmées au Bénin, et sur la fiche d'un bien loué.

Migration : `20261102100000_ecosysteme_dkp` (additive).
