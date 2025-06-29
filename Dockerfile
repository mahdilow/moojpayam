# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app
    
# Install dependencies (including devDeps like terser)
COPY package*.json ./
RUN npm install
    
# Copy required source files
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY public ./public
COPY src ./src
    
# Build frontend
RUN npm run build
    
# ---------- Production Stage ----------
FROM node:20-alpine
    
WORKDIR /app
    
# فقط deps لازم برای اجرا رو نصب کن
COPY package*.json ./
RUN npm install --omit=dev
    
# Copy backend files and built frontend
COPY server.js ./
COPY .env .env
COPY --from=builder /app/dist ./dist
    
# Create runtime folders
RUN mkdir -p uploads data
    
# Expose backend port
EXPOSE 80
    
CMD ["node", "server.js"]
    