# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

# ---------- Base ----------
FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /app
# (No NODE_ENV here so dev deps can be installed/built)

# ---------- Deps ----------
FROM base AS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ git \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
# Force install deps (ignores peer/engine conflicts)
RUN npm install --force --no-audit --no-fund

# ---------- Build ----------
FROM deps AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Ensure standalone output via next.config.js: { output: 'standalone' }
RUN npm run build

# ---------- Runtime ----------
FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0   # bind IPv4 so Coolify can reach it

# Run as non-root
RUN useradd -m -u 1001 nextjs
USER 1001

# Copy standalone server + assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# If you use Prisma/native binaries, uncomment:
# COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "server.js"]
