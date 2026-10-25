# --- Build stage -------------------------------------------------------------
FROM node:20-alpine AS build

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /repo

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json apps/api/
COPY packages/types/package.json packages/types/

COPY packages/types packages/types
COPY apps/api apps/api

RUN pnpm install --filter @hwe/api...

WORKDIR /repo/apps/api

# DATABASE_URL fictive uniquement pour prisma generate (pas de vraie connexion)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN pnpm exec prisma generate
RUN pnpm build

# --- Runtime stage -----------------------------------------------------------
FROM node:20-alpine AS run

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /repo

COPY --from=build /repo /repo

WORKDIR /repo/apps/api

ENV NODE_ENV=production
ENV API_PORT=4000
# Pool de threads libuv : hachages bcrypt natifs (au plus 2 à la fois, cf.
# PASSWORD_HASH_CONCURRENCY) + lectures des fichiers téléversés.
ENV UV_THREADPOOL_SIZE=8
EXPOSE 4000

# Point de montage du volume des fichiers téléversés (MEDIA_DIR=/data/media) :
# créé ici au nom de l'utilisateur node pour qu'un volume nommé neuf hérite de
# ces droits. Sans MEDIA_DIR, rien n'y est écrit (tout reste en base).
RUN mkdir -p /data/media && chown node:node /data/media

COPY apps/api/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# Pas de root à l'exécution : l'API ne fait que lire le dépôt.
USER node
CMD ["/entrypoint.sh"]