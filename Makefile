.PHONY: help build run dev stop clean logs shell test env-check

# Variables
IMAGE_NAME=devopsflow
CONTAINER_NAME=devopsflow-app
PORT=3000

# Load environment variables from .env.docker if it exists
ifneq (,$(wildcard .env.docker))
    include .env.docker
    export
endif

help: ## Show this help message
	@echo "DevOpsFlow - Docker Commands"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

env-check: ## Check if environment variables are set
	@if [ ! -f .env.docker ]; then \
		echo "❌ .env.docker not found. Creating from example..."; \
		cp .env.docker.example .env.docker; \
		echo "📝 Please edit .env.docker with your Firebase credentials"; \
		exit 1; \
	fi
	@echo "✅ Environment file found"

build: env-check ## Build production Docker image
	docker build -t $(IMAGE_NAME):latest \
		--build-arg NEXT_PUBLIC_FIREBASE_API_KEY=$(NEXT_PUBLIC_FIREBASE_API_KEY) \
		--build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$(NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) \
		--build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=$(NEXT_PUBLIC_FIREBASE_PROJECT_ID) \
		--build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$(NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) \
		--build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$(NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) \
		--build-arg NEXT_PUBLIC_FIREBASE_APP_ID=$(NEXT_PUBLIC_FIREBASE_APP_ID) \
		.

build-dev: ## Build development Docker image
	docker build -f Dockerfile.dev -t $(IMAGE_NAME):dev .

run: ## Run production container
	docker run -d -p $(PORT):3000 --name $(CONTAINER_NAME) $(IMAGE_NAME):latest

dev: ## Run development environment with hot reload
	docker-compose -f docker-compose.dev.yml up

up: env-check ## Start with docker-compose (production)
	docker-compose -f docker-compose.prod.yml up -d

down: ## Stop and remove containers
	docker-compose -f docker-compose.prod.yml down
	docker-compose -f docker-compose.dev.yml down 2>/dev/null || true

stop: ## Stop the container
	docker stop $(CONTAINER_NAME) || true

start: ## Start the container
	docker start $(CONTAINER_NAME) || true

restart: ## Restart the container
	docker restart $(CONTAINER_NAME) || true

logs: ## View container logs
	docker logs -f $(CONTAINER_NAME)

shell: ## Open shell in running container
	docker exec -it $(CONTAINER_NAME) sh

clean: ## Remove container and image
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME):latest || true

clean-all: ## Remove all containers, images, and volumes
	docker-compose down -v
	docker rmi $(IMAGE_NAME):latest $(IMAGE_NAME):dev || true

ps: ## List running containers
	docker ps -a | grep $(IMAGE_NAME) || echo "No containers found"

inspect: ## Inspect the container
	docker inspect $(CONTAINER_NAME)

stats: ## Show container resource usage
	docker stats $(CONTAINER_NAME)

prune: ## Remove unused Docker resources
	docker system prune -af --volumes
