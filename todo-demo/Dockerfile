# Base image
FROM node:22-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/
# Copy prisma config for generation
COPY prisma.config.ts ./

# Install dependencies (use ci for reliable builds)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client and build
RUN npx prisma generate
RUN npm run build

# --- Runtime stage ---
FROM node:22-alpine

WORKDIR /app

# Install openssl and libstdc++ for Prisma/Bcrypt (needed on Alpine)
RUN apk add --no-cache openssl libstdc++

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/entrypoint.sh ./

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 8000

# Default command
CMD ["./entrypoint.sh"]
