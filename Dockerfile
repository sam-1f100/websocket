# Use small and secure base image
FROM node:20-alpine

# App directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy app source
COPY server.js .

# Expose websocket port
EXPOSE 3000

# Run server
CMD ["node", "server.js"]
