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
EXPOSE 4000

CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate --accept-data-loss && node dist/src/main.js"]