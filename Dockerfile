FROM node:18

WORKDIR /app

# Copy package.json and lockfile first
COPY package*.json ./

# Install dependencies
# (npm ci is often preferred in CI/CD because it uses the exact lockfile)
RUN npm ci

# Copy over the rest of the code
COPY . .

# Build the frontend
RUN npm run build

# Expose the port
EXPOSE 3001

# Start the server
CMD ["node", "server/index.js"]
