#!/bin/bash

# Create or update .env file with necessary environment variables
echo "Setting up environment variables..."
cat > .env << EOL
VITE_API_BASE_URL=https://api.copdsense.minhvu.id.vn
# Add other environment variables as needed
EOL

# Stop any existing containers using port 2003
echo "Stopping any existing containers on port 2003..."
docker stop $(docker ps -q --filter publish=2003) 2>/dev/null || true

# Build the Docker image with platform specified to match Windows/Linux hosts
echo "Building Docker image for linux/amd64 platform..."
docker build --platform linux/amd64 -t cms-ui:latest .

# Run the Docker container
echo "Starting Docker container on port 2003..."
docker run -d -p 2003:2003 cms-ui:latest

# Check if container is running
if [ $? -eq 0 ]; then
    echo "Container started successfully!"
    echo "Local URL: http://localhost:2003"
    
    # Start Cloudflare tunnel
    echo "Starting Cloudflare tunnel to expose the application..."
    echo "Your application will be available at: https://copdsense.minhvu.id.vn"
    docker run -d cloudflare/cloudflared:latest tunnel --no-autoupdate run --token eyJhIjoiOThlMDUwY2ZhYjllZDY3OTZlZjdmM2Y3MzNkYzc1MTMiLCJ0IjoiZjMyNGUzYTYtZjA1OS00ZjNiLTgwMjMtMGFhYTU2Y2U0YjYwIiwicyI6IlpUUmtNalF6T1dFdE5qVXdNeTAwTWpJMExXRmpOemt0TURkak9ESm1NVE5tTkdFMyJ9
    
    echo "Deployment complete! Your application is now accessible at:"
    echo "https://copdsense.minhvu.id.vn"
else
    echo "Failed to start the container. Please check for errors."
fi