#!/bin/bash

# Test script for Docker deployment
# This script verifies your Docker setup is working correctly

echo "🧪 DevOpsFlow Docker Test Suite"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to print test result
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        ((FAILED++))
    fi
}

# Test 1: Docker installed
echo "Testing Docker installation..."
if command -v docker &> /dev/null; then
    test_result 0 "Docker is installed"
else
    test_result 1 "Docker is not installed"
fi

# Test 2: Docker running
echo "Testing Docker daemon..."
if docker ps &> /dev/null; then
    test_result 0 "Docker daemon is running"
else
    test_result 1 "Docker daemon is not running"
fi

# Test 3: Docker Compose installed
echo "Testing Docker Compose..."
if command -v docker-compose &> /dev/null; then
    test_result 0 "Docker Compose is installed"
else
    test_result 1 "Docker Compose is not installed"
fi

# Test 4: .env.docker exists
echo "Testing environment configuration..."
if [ -f .env.docker ]; then
    test_result 0 ".env.docker file exists"
    
    # Test 5: Check if Firebase variables are set
    if grep -q "your_api_key_here" .env.docker || grep -q "your_project_id" .env.docker; then
        test_result 1 "Firebase credentials not configured (still using placeholder values)"
    else
        test_result 0 "Firebase credentials appear to be configured"
    fi
else
    test_result 1 ".env.docker file not found"
fi

# Test 6: Dockerfile exists
echo "Testing Docker configuration files..."
if [ -f Dockerfile ]; then
    test_result 0 "Dockerfile exists"
else
    test_result 1 "Dockerfile not found"
fi

# Test 7: docker-compose.prod.yml exists
if [ -f docker-compose.prod.yml ]; then
    test_result 0 "docker-compose.prod.yml exists"
else
    test_result 1 "docker-compose.prod.yml not found"
fi

# Test 8: Check if port 3000 is available
echo "Testing port availability..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    test_result 1 "Port 3000 is already in use"
else
    test_result 0 "Port 3000 is available"
fi

# Test 9: Check if port 80 is available
if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null 2>&1; then
    test_result 1 "Port 80 is already in use (may need sudo or different port)"
else
    test_result 0 "Port 80 is available"
fi

# Test 10: Try to build image (if requested)
if [ "$1" == "--build" ]; then
    echo "Testing Docker build..."
    if [ -f .env.docker ]; then
        export $(cat .env.docker | grep -v '^#' | xargs)
        if docker build -t devopsflow:test \
            --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
            --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
            --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
            --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
            --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
            --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID \
            . &> /dev/null; then
            test_result 0 "Docker image builds successfully"
            docker rmi devopsflow:test &> /dev/null
        else
            test_result 1 "Docker image build failed"
        fi
    else
        test_result 1 "Cannot test build without .env.docker"
    fi
fi

# Summary
echo ""
echo "================================"
echo "Test Summary"
echo "================================"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! You're ready to deploy!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: ./deploy-docker.sh"
    echo "2. Select option 1 (Deploy Production)"
    echo "3. Access: http://localhost"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Please fix the issues above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "- Install Docker: https://docs.docker.com/get-docker/"
    echo "- Start Docker daemon"
    echo "- Create .env.docker: cp .env.docker.example .env.docker"
    echo "- Configure Firebase credentials in .env.docker"
    exit 1
fi
