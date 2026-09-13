# Build from inside web-next:
#   docker build -t csswitch \
#     --build-arg MONGODB_URI="mongodb+srv://..." \
#     --build-arg NEXT_PUBLIC_SITE_URL="https://csswitch-design-lab.fly.dev" .
#
# The build stage needs a REACHABLE database. With cacheComponents enabled the
# gallery pages and the catalogue API routes are prerendered, and prerendering
# executes their `"use cache"` queries. Without MONGODB_URI the build stops with
# an "Invalid environment variables" error from lib/server/env.ts.
#
# Debian-based rather than Alpine so bcrypt uses its prebuilt glibc binary.
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Read at build time: the queries below are prerendered.
ARG MONGODB_URI
# NEXT_PUBLIC_* is inlined into the output, so the real origin must be present
# here or Open Graph URLs are baked as http://localhost:3000.
ARG NEXT_PUBLIC_SITE_URL
ENV MONGODB_URI=$MONGODB_URI
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
# lib/server/env.ts validates every variable when the build loads server code,
# so a placeholder is needed here. ENV does not carry over to the runner stage;
# the real secret is supplied there at runtime.
ENV JWT_SECRET=build-time-placeholder
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN useradd --system --uid 1001 nextjs

# `output: "standalone"` emits a self-contained server plus only the traced deps.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
# MONGODB_URI and JWT_SECRET must be supplied to the container at runtime.
CMD ["node", "server.js"]
