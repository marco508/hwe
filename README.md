# hwe — Plateforme immobilière

Monorepo Turborepo : un backend NestJS + Prisma/PostgreSQL et deux frontends
Next.js partageant le même design system.

## Structure

```
hwe/
├─ apps/
│  ├─ api/         NestJS + Prisma + JWT (port 4000)
│  ├─ owner-web/   Espace propriétaire (port 3000)
│  └─ tenant-web/  Espace locataire / acheteur (port 3001)
└─ packages/
   ├─ ui/          Design system partagé (Tailwind preset + composants)
   └─ types/       Types TypeScript partagés
```

## Stack

- Backend : NestJS, Prisma, PostgreSQL (PostGIS-ready), JWT, bcrypt, class-validator
- Frontends : Next.js 14 (App Router), React 18, Tailwind CSS via preset partagé
- Outillage : pnpm workspaces, Turborepo, TypeScript strict

## Démarrage rapide (Docker, recommandé)

Prérequis : Docker Desktop.

Sur Windows, double-cliquez sur **`start.bat`** à la racine. Le script
construit les images, démarre Postgres + API + les deux frontends, attend
que l'API réponde, puis vous propose de seeder des données de démo.

Sur macOS / Linux :
```bash
docker compose up -d --build
docker compose exec api pnpm prisma:seed   # données de démo (optionnel)
```

URLs après démarrage :
- API : http://localhost:4005/api
- Espace propriétaire : http://localhost:3005
- Espace locataire : http://localhost:3004
- Postgres : `localhost:5435` (user/pass : `hwe`/`hwe`)

Commandes utiles :
- Logs : `docker compose logs -f`
- Arrêt : `docker compose down`
- Reset complet (données comprises) : `docker compose down -v`

### Ports déjà occupés ?

Les ports par défaut sont **API 4005**, **owner 3005**, **tenant 3004**,
**postgres 5435**. Si l'un est pris, changez-le avant de lancer :

```
set HWE_OWNER_PORT=3010
set HWE_TENANT_PORT=3011
set HWE_API_PORT=4001
start.bat
```

Pour libérer un port pris par un autre processus :

```
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Démarrage en local (sans Docker pour les apps)

Prérequis : Node 20+, pnpm 9, Docker (juste pour Postgres).

1. Démarrer Postgres :
   ```bash
   docker compose up -d postgres
   ```
2. Installer :
   ```bash
   pnpm install
   ```
3. Variables d'environnement :
   ```bash
   cp .env.example .env
   ```
4. Initialiser la base et seeder :
   ```bash
   pnpm --filter @hwe/api prisma:generate
   pnpm --filter @hwe/api prisma:migrate
   pnpm --filter @hwe/api prisma:seed
   ```
5. Lancer tout en dev :
   ```bash
   pnpm dev
   ```

## Comptes de démo (après seed)

- Propriétaire : `owner@hwe.test` / `owner1234`
- Locataire : `tenant@hwe.test` / `tenant1234`

## API REST

Préfixe : `/api`.

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | — | Crée un compte (`role: OWNER` ou `TENANT`) |
| POST | `/auth/login` | — | Retourne `{ accessToken, user }` |
| GET | `/auth/me` | JWT | Profil courant |
| GET | `/users/me` | JWT | Idem |
| PATCH | `/users/me` | JWT | Met à jour `firstName / lastName / phone` |
| GET | `/properties` | — | Liste publique paginée + filtres |
| GET | `/properties/:id` | — | Détail d'un bien |
| GET | `/properties/mine/list` | OWNER | Mes biens |
| POST | `/properties` | OWNER | Créer un bien |
| PATCH | `/properties/:id` | OWNER | Mettre à jour |
| DELETE | `/properties/:id` | OWNER | Supprimer |
| POST | `/inquiries` | JWT | Envoyer une demande au propriétaire |
| GET | `/inquiries/sent` | JWT | Mes demandes envoyées (locataire) |
| GET | `/inquiries/received` | OWNER | Demandes reçues sur mes biens |

Filtres `/properties` : `listingType`, `propertyType`, `city`, `minPrice`,
`maxPrice`, `minSurface`, `maxSurface`, `minRooms`, `page`, `pageSize`.

## Modèle de données (Prisma)

- `User { id, email, password, firstName, lastName, phone?, role }`
  rôles : `OWNER | TENANT | ADMIN`
- `Property { …détails…, addressLine, city, postalCode, country, latitude?, longitude?, ownerId }`
- `PropertyMedia { url, alt?, position, propertyId }`
- `Inquiry { propertyId, senderId, message, contactEmail, contactPhone? }`

PostGIS est activé via l'image `postgis/postgis:16-3.4`. La géolocalisation
est stockée en `Float` pour la simplicité. Pour passer à de la vraie
recherche géospatiale, ajoutez une colonne `geog geography(Point)` via une
migration SQL et indexez-la avec GIST.

## Design system

Les deux frontends importent `@hwe/ui` et le preset Tailwind partagé. Les
tokens (palette `brand`, fontes Inter + Fraunces, rayons, ombres) sont
définis une seule fois dans `packages/ui/tailwind-preset.js`. Toute
modification s'applique aux deux apps.

## Pour aller plus loin (production)

- Stockage S3 / Cloudflare R2 pour les médias, upload signé côté client
- Meilisearch pour la recherche full-text/facettes (sync via Prisma middleware)
- Redis + BullMQ pour les jobs (resize images, notifications email)
- Resend / Postmark pour les emails transactionnels
- Sentry, Pino logs, Prometheus/Grafana
- CDN (Cloudflare) devant les fronts et l'API
- Migration vers PostGIS `geography(Point)` quand le volume le justifie
