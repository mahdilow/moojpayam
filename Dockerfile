# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app
    
# Install dependencies
COPY package*.json ./
RUN npm install
    
# Copy source files for Vite build
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src
    
# Build frontend
RUN npm run build
    
# ---------- Production Stage ----------
FROM node:20-alpine
    
WORKDIR /app
    
# Copy server and production deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY server.js ./
COPY package*.json ./
    
# These will be replaced/mounted as volumes in runtime
RUN mkdir uploads data
    
# Optional: copy initial data (only used if volume is empty)
# You can uncomment this if you want initial data seeded from image
# COPY data ./data
# COPY uploads ./uploads

# Use environment variables from host or runtime
COPY .env .env
    
# Expose the backend port
EXPOSE 3000
    
CMD ["node", "server.js"]