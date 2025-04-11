#!/bin/bash

# Exit on error
set -e

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")

# Docker image details
IMAGE_NAME="cms-ui"
REGISTRY="100.92.161.82:5000"  # Registry from package.json

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME:$VERSION .
docker tag $IMAGE_NAME:$VERSION $IMAGE_NAME:latest

# Push to registry
echo "Pushing to registry..."
docker tag $IMAGE_NAME:$VERSION $REGISTRY/$IMAGE_NAME:$VERSION
docker tag $IMAGE_NAME:$VERSION $REGISTRY/$IMAGE_NAME:latest

docker push $REGISTRY/$IMAGE_NAME:$VERSION
docker push $REGISTRY/$IMAGE_NAME:latest

echo "Successfully built and pushed version $VERSION"


