# ────────────────────────────────────────────────
#  Builder stage
# ────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Use faster package manager (optional but helps a lot)
RUN corepack enable && corepack prepare pnpm@latest --activate
#               or just use npm with --prefer-offline --no-audit

WORKDIR /app

# Copy only dependency files first → great caching
COPY package.json package-lock.json* ./

# Install dependencies (use ci for clean & fast install in CI/Docker)
RUN npm ci --prefer-offline --no-audit --silent
#               or → pnpm install --frozen-lockfile

# Now copy the rest of the source code
COPY . .

# Build (you can add --no-cache if you want to force clean build)
RUN npm run build:production


# ────────────────────────────────────────────────
#  Final small image
# ────────────────────────────────────────────────
FROM nginx:alpine

# Copy custom nginx config (if you have one)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

