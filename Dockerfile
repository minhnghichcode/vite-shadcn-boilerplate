# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy environment variables first so they're available during build
COPY .env* ./

# Copy all other files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files from build stage to nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Create custom nginx configuration to use port 2003
RUN echo 'server { \
    listen 2003; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 2003
EXPOSE 2003

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

    