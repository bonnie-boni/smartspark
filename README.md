This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Docker: Build and Run Locally

This guide documents how to build SmartSpark Revamp as a Docker image,
run it in a container, and verify that the Next.js application starts.

### 1. Prerequisites

The local environment used for this setup:

- Kali Linux
- Node.js 22
- pnpm 11.1.3
- Docker Engine and Docker CLI
- Docker Compose

Check your installed tools:

```bash
node --version
pnpm --version
docker --version
docker compose version
docker info
```

`docker info` should display both Client and Server information. If the
Server section reports an error, check that Docker Engine is running and
that your user has permission to access the Docker socket.

### 2. Configure Next.js for standalone output

Edit `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

The `standalone` output creates a minimal production-ready application
directory containing the server and the dependencies Next.js needs.
This helps keep the final Docker image smaller.

### 3. Create `.dockerignore`

Create a `.dockerignore` file in the project root:

```text
node_modules
.next
.git
.env
.env.*
!.env.example
*.tsbuildinfo
npm-debug.log*
.pnpm-debug.log*
.vercel
coverage
```

This prevents local dependencies, build output, Git history, and environment
files from being sent to the Docker build context. Environment files must
not be copied into the production image.

### 4. Create the Dockerfile

Create a file named `Dockerfile` in the project root:

```dockerfile
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

# Remove environment files and include static assets
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
```

The Dockerfile uses four stages:

1. `base` prepares Node.js and Corepack.
2. `deps` installs the locked pnpm dependencies.
3. `builder` builds the Next.js application and prepares its standalone files.
4. `runner` creates the production image without copying the source tree
   and development dependencies wholesale.

### 5. Build the Next.js application locally

Before Docker, verify the application builds:

```bash
pnpm build
```

### 6. Build the Docker image

From the project root, run:

```bash
docker build -t smartspark:local .
```

Explanation:

- `docker build` builds an image from the Dockerfile.
- `-t smartspark:local` names the image `smartspark` with the tag `local`.
- `.` sends the current directory, excluding `.dockerignore` entries, as the build context.

List the resulting image:

```bash
docker images smartspark
```

The initial successful build produced a local image of approximately 247 MB.

### 7. Start a container

Run the image:

```bash
docker run -d \
  --name smartspark-test \
  -p 3000:3000 \
  smartspark:local
```

Explanation:

- `-d` runs the container in the background.
- `--name smartspark-test` assigns the container a name.
- `-p 3000:3000` maps port 3000 on the host to port 3000 in the container.

### 8. Verify the container

Check its status:

```bash
docker ps -a --filter name=smartspark-test
```

Inspect application logs:

```bash
docker logs --tail 80 smartspark-test
```

Check the HTTP response:

```bash
curl -I http://localhost:3000
```

Open the application in a browser:

http://localhost:3000

A successful test should show the container running, Next.js reporting that
it is ready, and an HTTP response such as `200 OK`.

### 9. Stop and remove the test container

When you have finished testing:

```bash
docker stop smartspark-test
docker rm smartspark-test
```

These commands remove the test container, not the image.

To remove the local image too, if it is no longer needed:

```bash
docker rmi smartspark:local
```

Do not remove the image while you still need it for testing.

### 10. Environment variables and secrets

The `.dockerignore` file excludes `.env` files from the build context.
The Dockerfile also removes environment files from the standalone output.

Do not commit `.env` files, passwords, SMTP credentials, or API tokens to
GitHub or bake them into a Docker image.

Production environment variables must be supplied securely when the
container is started on the VPS. The application may require variables for
email delivery, AI integrations, or other server-side features.

### 11. Troubleshooting

**Docker daemon is unavailable**

```bash
docker info
sudo systemctl status docker
```

**Container is stopped or has exited**

```bash
docker ps -a
docker logs smartspark-test
```

**Port 3000 is already in use**

Stop the conflicting service or choose another host port, for example:

```bash
docker run -d \
  --name smartspark-test \
  -p 3001:3000 \
  smartspark:local
```

Then visit http://localhost:3001.

**Rebuild after changing application code**

```bash
docker build -t smartspark:local .
```

If the existing test container is still present, remove it before recreating
it with the new image.

### 12. Next deployment steps

The local Docker image and container have been tested successfully. The next
planned stages are:

1. Configure GitHub Actions to build the image automatically.
2. Publish the image to GitHub Container Registry (GHCR).
3. Configure the Hostinger VPS to pull and run the published image.
4. Configure production environment variables.
5. Connect the domain and configure HTTPS.

These deployment stages require additional configuration and are not
completed by the local Docker test alone.
