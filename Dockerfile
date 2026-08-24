# Build genérico para apps Next.js do monorepo fluxa-ui.
# Uso: docker build --build-arg APP=agent-ui -t fluxa-agent-ui .
# ou:   docker build --build-arg APP=admin-ui -t fluxa-admin-ui .
ARG APP=agent-ui

# ── Deps ──────────────────────────────────────────────────────
FROM node:22-alpine AS deps

ARG APP

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY apps/${APP}/package.json ./apps/${APP}/
COPY packages ./packages

RUN pnpm install --frozen-lockfile

# ── Build ─────────────────────────────────────────────────────
FROM node:22-alpine AS builder

ARG APP

ENV CI=true
ENV PNPM_CONFIRM_MODULES_PURGE=false

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY --from=deps /app/ ./
COPY . .

RUN pnpm --filter @fluxa/${APP} build

# ── Runtime ──────────────────────────────────────────────────
FROM node:22-alpine AS runtime

ARG APP

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# Copia output do Next.
COPY --from=builder /app/apps/${APP}/package.json /app/apps/${APP}/
COPY --from=builder /app/apps/${APP}/next.config.mjs /app/apps/${APP}/next.config.mjs
COPY --from=builder /app/apps/${APP}/.next /app/apps/${APP}/.next
# public é opcional; cria dir vazio se nao existir.
COPY --from=builder /app/apps/${APP}/public /app/apps/${APP}/public

# Workspace deps (necessarios pro runtime dos packages compartilhados).
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --from=builder /app/turbo.json /app/turbo.json
COPY --from=builder /app/.npmrc /app/.npmrc
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/node_modules /app/node_modules

WORKDIR /app/apps/${APP}

# Usuario nao-root (uid alto pra evitar conflito com usuario node:alpine).
RUN apk add --no-cache shadow && \
    addgroup -g 10000 fluxa && adduser -D -G fluxa -u 10000 fluxa && chown -R fluxa:fluxa /app
USER fluxa

EXPOSE 3000

CMD ["pnpm", "start"]