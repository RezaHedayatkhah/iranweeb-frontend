# Use official Node.js runtime as a base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application in standalone mode
RUN npm run build

# Production image, copy all the files and run Next.js
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from the builder stage
COPY --from=deps /app/public ./public
COPY --from=deps /app/.next/standalone ./standalone
COPY --from=deps /app/.next/static ./.next/static

# Expose port 3000
EXPOSE 3000

# Start the Next.js server in standalone mode
CMD ["node", "standalone/server.js"]
