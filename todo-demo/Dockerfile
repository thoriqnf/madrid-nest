# Base image
FROM node:22-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

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

# Install openssl for Prisma (needed on Alpine)
RUN apk add --no-cache openssl

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 8000

# Default command
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
