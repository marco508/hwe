# --- Build stage -------------------------------------------------------------
FROM node:20-alpine AS build

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /repo

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/tenant-web/package.json apps/tenant-web/
COPY packages/ui/package.json packages/ui/
COPY packages/types/package.json packages/types/

COPY packages/ui packages/ui
COPY packages/types packages/types
COPY apps/tenant-web apps/tenant-web

RUN pnpm install --filter @hwe/tenant-web...

ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /repo/apps/tenant-web
RUN pnpm build

# --- Runtime stage -----------------------------------------------------------
FROM node:20-alpine AS run

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /repo
COPY --from=build /repo /repo
WORKDIR /repo/apps/tenant-web

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["pnpm", "start"]
