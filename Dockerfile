# ---------- Runtime-Only Dockerfile ----------
    FROM node:20-alpine

    WORKDIR /app
    
    # Only install prod dependencies
    COPY package*.json ./
    RUN npm install --omit=dev
    
    # Copy backend & built frontend
    COPY server.js ./
    COPY dist ./dist
     
    EXPOSE 80
    
    CMD ["node", "server.js"]
    