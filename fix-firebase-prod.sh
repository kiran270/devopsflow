#!/bin/bash

# Fix Firebase Configuration in Production
# This script ensures Firebase env vars are properly baked into the Docker image

set -e

echo "🔧 Fixing Firebase Configuration in Production"
echo "=============================================="
echo ""

# Check if .env.docker exists
if [ ! -f .env.docker ]; then
    echo "❌ Error: .env.docker not found!"
    echo "Please create it with your Firebase credentials"
    exit 1
fi

# Load environment variables
echo "📦 Loading environment variables..."
export $(cat .env.docker | grep -v '^#' | xargs)

# Verify Firebase API key is set
if [ -z "$NEXT_PUBLIC_FIREBASE_API_KEY" ]; then
    echo "❌ Error: NEXT_PUBLIC_FIREBASE_API_KEY is empty!"
    echo "Please check your .env.docker file"
    exit 1
fi

echo "✅ Firebase API Key found: ${NEXT_PUBLIC_FIREBASE_API_KEY:0:10}..."
echo ""

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Remove old image to force rebuild
echo "🗑️  Removing old image..."
docker rmi devopsflow:latest 2>/dev/null || true
docker rmi devopsflow_devopsflow 2>/dev/null || true

# Build with explicit build args
echo "🔨 Building Docker image with Firebase configuration..."
docker build \
    --no-cache \
    --build-arg NEXT_PUBLIC_FIREBASE_API_KEY="$NEXT_PUBLIC_FIREBASE_API_KEY" \
    --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" \
    --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID="$NEXT_PUBLIC_FIREBASE_PROJECT_ID" \
    --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" \
    --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" \
    --build-arg NEXT_PUBLIC_FIREBASE_APP_ID="$NEXT_PUBLIC_FIREBASE_APP_ID" \
    -t devopsflow:latest \
    .

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Start containers
echo "🚀 Starting containers..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for container to be ready
echo "⏳ Waiting for container to start..."
sleep 5

# Verify Firebase config in the built image
echo ""
echo "🔍 Verifying Firebase configuration..."
echo "======================================="

# Check if container is running
if ! docker ps | grep -q devopsflow-app; then
    echo "❌ Container is not running!"
    echo "Check logs: docker logs devopsflow-app"
    exit 1
fi

# Check environment variables in container
echo "Checking environment variables in container..."
FIREBASE_KEY=$(docker exec devopsflow-app sh -c 'echo $NEXT_PUBLIC_FIREBASE_API_KEY' 2>/dev/null || echo "")

if [ -z "$FIREBASE_KEY" ]; then
    echo "⚠️  Warning: Firebase API key not found in container environment"
    echo "But it should be baked into the Next.js build..."
else
    echo "✅ Firebase API Key in container: ${FIREBASE_KEY:0:10}..."
fi

# Check if the built files contain Firebase config
echo ""
echo "Checking if Firebase config is in built files..."
docker exec devopsflow-app sh -c 'grep -r "FIREBASE_API_KEY" .next/static 2>/dev/null | head -1' && echo "✅ Firebase config found in build!" || echo "⚠️  Firebase config not found in build files"

echo ""
echo "=============================================="
echo "✅ Deployment Complete!"
echo ""
echo "🌐 Access your app at: https://devopsflow.duckdns.org"
echo ""
echo "📋 Useful commands:"
echo "  View logs:    docker logs devopsflow-app"
echo "  Check status: docker ps"
echo "  Restart:      docker-compose -f docker-compose.prod.yml restart"
echo ""
