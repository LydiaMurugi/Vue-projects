# Stage 1: Build the application
# We use a Node image to compile the Vue code. 
# Node 22 is used to match the project's engine requirements.
FROM node:22-alpine AS build-stage

WORKDIR /app

# Copy package files first to leverage Docker's layer caching.
# If these files don't change, Docker will skip 'npm install'.
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the build script defined in package.json
RUN npm run build

# Stage 2: Serve the application with Nginx
# This produces a much smaller final image because we leave the Node.js 
# environment and source code behind, keeping only the 'dist' folder.
FROM nginx:stable-alpine AS production-stage

# Copy the build output from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy our custom nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Inform Docker (and deployment platforms) that the container listens on port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
