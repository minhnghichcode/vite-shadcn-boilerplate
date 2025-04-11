#!/bin/bash

# Create or update .env file with necessary environment variables
echo "Setting up environment variables..."
cat > .env << EOL
VITE_API_BASE_URL=https://mos-backend1.minhvu.id.vn/api
# Add other environment variables as needed
EOL

# Build the Docker image with platform specified to match Windows host (amd64)
echo "Building Docker image for linux/amd64 platform..."
docker build --platform linux/amd64 -t cms-ui:latest .

# Save the image to a tar file
echo "Saving Docker image to tar file..."
docker save cms-ui:latest -o cms-ui-image.tar

echo "Done! Docker image has been saved to cms-ui-image.tar"
echo "You can now transfer this file to your Windows machine at 100.92.161.82"
echo ""
echo "After transferring, on the Windows machine run:"
echo "docker load -i cms-ui-image.tar"
echo "docker run -d -p 2003:2003 cms-ui:latest"