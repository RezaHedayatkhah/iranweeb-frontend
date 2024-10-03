# Use official Node.js runtime as a base image
FROM node:20-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat git

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Set environment to production
ENV NODE_ENV=production

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port 3000
EXPOSE 3000
ENV PORT 3000

# Start the Next.js app using the standalone output
CMD ["node", ".next/standalone/server.js"]
