# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

# ---------- Base for build ----------
FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /app
ENV NODE_ENV=production

# ---------- Install deps (build stage) ----------
FROM base AS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ git \
  && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
# Use lockfile if present for reproducible builds
RUN if [ -f package-lock.json ]; then npm ci --include=dev; else npm i --include=dev; fi

# ---------- Build ----------
FROM deps AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Make sure we produce a standalone build (see next.config.js below)
RUN npm run build

# ---------- Runtime image ----------
FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

# Healthcheck tool
RUN apt-get update && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

# Run as non-root
RUN useradd -m -u 1001 nextjs
USER 1001

# Copy the standalone output and static/public assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s CMD curl -fsS http://127.0.0.1:${PORT}/ || exit 1
CMD ["node", "server.js"]
