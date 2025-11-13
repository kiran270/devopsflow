#!/bin/bash

# DevOpsFlow Docker Deployment Script
# This script helps you deploy the application with Docker

set -e

echo "🚀 DevOpsFlow Docker Deployment"
echo "================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to check if .env.docker exists
check_env_file() {
    if [ ! -f .env.docker ]; then
        echo "⚠️  .env.docker file not found!"
        echo ""
        echo "Creating .env.docker from example..."
        cp .env.docker.example .env.docker
        echo ""
        echo "📝 Please edit .env.docker with your Firebase credentials:"
        echo "   nano .env.docker"
        echo ""
        echo "Then run this script again."
        exit 1
    fi
}

# Function to load environment variables
load_env() {
    echo "📦 Loading environment variables..."
    export $(cat .env.docker | grep -v '^#' | xargs)
    echo "✅ Environment variables loaded"
    echo ""
}

# Function to build production image
build_production() {
    echo "🔨 Building production Docker image..."
    docker-compose -f docker-compose.prod.yml build
    echo "✅ Production image built successfully"
    echo ""
}

# Function to start production
start_production() {
    echo "🚀 Starting production containers..."
    docker-compose -f docker-compose.prod.yml up -d
    echo "✅ Production containers started"
    echo ""
    echo "🌐 Application is running at:"
    echo "   - http://localhost (with nginx)"
    echo "   - http://localhost:3000 (direct access)"
    echo ""
}

# Function to start development
start_development() {
    echo "🔧 Starting development environment..."
    
    # Check if .env.local exists
    if [ ! -f .env.local ]; then
        echo "⚠️  .env.local file not found!"
        echo "Creating from example..."
        cp .env.local.example .env.local
        echo "📝 Please edit .env.local with your Firebase credentials"
        exit 1
    fi
    
    export $(cat .env.local | grep -v '^#' | xargs)
    docker-compose -f docker-compose.dev.yml up
}

# Function to stop containers
stop_containers() {
    echo "🛑 Stopping containers..."
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
    echo "✅ Containers stopped"
}

# Function to view logs
view_logs() {
    echo "📋 Viewing logs..."
    docker-compose -f docker-compose.prod.yml logs -f
}

# Function to check status
check_status() {
    echo "📊 Container Status:"
    echo ""
    docker-compose -f docker-compose.prod.yml ps
    echo ""
    echo "🏥 Health Status:"
    docker inspect devopsflow-app --format='{{.State.Health.Status}}' 2>/dev/null || echo "Container not running"
}

# Main menu
show_menu() {
    echo "Select deployment option:"
    echo "1) Deploy Production (with nginx)"
    echo "2) Start Development (hot reload)"
    echo "3) Stop All Containers"
    echo "4) View Logs"
    echo "5) Check Status"
    echo "6) Rebuild and Deploy"
    echo "7) Exit"
    echo ""
    read -p "Enter choice [1-7]: " choice
    
    case $choice in
        1)
            check_env_file
            load_env
            build_production
            start_production
            ;;
        2)
            start_development
            ;;
        3)
            stop_containers
            ;;
        4)
            view_logs
            ;;
        5)
            check_status
            ;;
        6)
            check_env_file
            load_env
            stop_containers
            build_production
            start_production
            ;;
        7)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option"
            exit 1
            ;;
    esac
}

# Run the menu
show_menu
