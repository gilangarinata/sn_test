# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

# ---------- Base ----------
FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /app

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
# Ensure next.config.js has: module.exports = { output: 'standalone' };
RUN npm run build

# ---------- Runtime ----------
FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Run as non-root
RUN useradd -m -u 1001 nextjs
USER 1001

# Copy standalone server + assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# If you use Prisma/native binaries, uncomment:
# COPY --from=deps /app/node_modules ./node_modules






HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "process.exit(0)"

EXPOSE 3000
CMD ["node", "server.js"]
