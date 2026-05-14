# --- Build stage -------------------------------------------------------------
FROM node:20-alpine AS build

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /repo

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/landing/package.json apps/landing/
COPY packages/types/package.json packages/types/
COPY packages/ui/package.json packages/ui/

COPY packages/types packages/types
COPY packages/ui packages/ui
COPY apps/landing apps/landing

ARG NEXT_PUBLIC_API_URL=http://localhost:4005
ARG NEXT_PUBLIC_TENANT_URL=http://localhost:3004
ARG NEXT_PUBLIC_OWNER_URL=http://localhost:3005

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_TENANT_URL=${NEXT_PUBLIC_TENANT_URL}
ENV NEXT_PUBLIC_OWNER_URL=${NEXT_PUBLIC_OWNER_URL}

RUN pnpm install --filter @hwe/landing...

WORKDIR /repo/apps/landing
RUN pnpm build

# --- Runtime stage -----------------------------------------------------------
FROM node:20-alpine AS run

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /repo

COPY --from=build /repo /repo

WORKDIR /repo/apps/landing

ENV NODE_ENV=production
ENV PORT=3006
EXPOSE 3006

CMD ["pnpm", "start"]
