# Stage 1: Common Node.js environment
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN corepack enable

# Stage 2: Install locked dependencies
FROM base AS deps
WORKDIR /app
RUN corepack prepare pnpm@11.1.3 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 3: Build the Next.js application
FROM base AS builder
WORKDIR /app
RUN corepack prepare pnpm@11.1.3 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build
# Remove environment files if Next.js copied them into standalone output.
RUN find .next/standalone -type f \
    \( -name '.env' -o -name '.env.*' \) -delete \
    && mkdir -p .next/standalone/.next \
    && cp -r .next/static .next/standalone/.next/static \
    && cp -r public .next/standalone/public

# Stage 4: Minimal production runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/.next/standalone ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
