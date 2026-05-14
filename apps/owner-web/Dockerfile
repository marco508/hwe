# --- Build stage -------------------------------------------------------------
FROM node:20-alpine AS build

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /repo

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/owner-web/package.json apps/owner-web/
COPY packages/types/package.json packages/types/
COPY packages/ui/package.json packages/ui/

COPY packages/types packages/types
COPY packages/ui packages/ui
COPY apps/owner-web apps/owner-web

ARG NEXT_PUBLIC_API_URL=http://localhost:4005
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN pnpm install --filter @hwe/owner-web...

WORKDIR /repo/apps/owner-web
RUN pnpm build

# --- Runtime stage -----------------------------------------------------------
FROM node:20-alpine AS run

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /repo

COPY --from=build /repo /repo

WORKDIR /repo/apps/owner-web

ENV NODE_ENV=production
ENV PORT=3005
EXPOSE 3005

CMD ["pnpm", "start"]