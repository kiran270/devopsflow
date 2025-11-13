# Docker Deployment Guide 🐳

This guide covers everything you need to know about running DevOpsFlow with Docker.

## Quick Start

### Prerequisites

1. **Set up Firebase credentials:**
   ```bash
   cp .env.docker.example .env.docker
   # Edit .env.docker with your Firebase credentials
   ```

2. **Load environment variables:**
   ```bash
   export $(cat .env.docker | xargs)
   ```

### Production Deployment

```bash
# Using Docker Compose (Recommended)
docker-compose -f docker-compose.prod.yml up -d

# Or using Docker directly
docker build -t devopsflow:latest \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID \
  .

docker run -d -p 80:80 --name devopsflow devopsflow:latest
```

Access the application at: `http://localhost` (or `http://localhost:3000` without nginx)

### Development with Hot Reload

```bash
# Load environment variables
export $(cat .env.local | xargs)

# Start development environment
docker-compose -f docker-compose.dev.yml up

# Your code changes will be reflected instantly!
```

## Docker Files Overview

### 1. Dockerfile (Production)
Multi-stage build for optimized production image:
- **Stage 1 (deps)**: Install production dependencies
- **Stage 2 (builder)**: Build the Next.js application
- **Stage 3 (runner)**: Minimal runtime image (~150MB)

Features:
- ✅ Multi-stage build (90% smaller image)
- ✅ Non-root user for security
- ✅ Health checks
- ✅ Optimized for production

### 2. Dockerfile.dev (Development)
Development image with hot reload:
- Volume mounting for instant code updates
- All dev dependencies included
- Fast rebuild times

### 3. docker-compose.yml (Production)
Production-ready compose file:
- Health checks
- Restart policies
- Network isolation

### 4. docker-compose.dev.yml (Development)
Development compose file:
- Volume mounts for hot reload
- Development environment variables

## Using Makefile Commands

We provide a Makefile for easy Docker management:

```bash
# View all available commands
make help

# Build and run
make build          # Build production image
make run            # Run production container
make dev            # Run development with hot reload

# Docker Compose
make up             # Start with docker-compose
make down           # Stop and remove containers

# Management
make logs           # View logs
make shell          # Open shell in container
make restart        # Restart container
make stats          # Show resource usage

# Cleanup
make clean          # Remove container and image
make clean-all      # Remove everything
make prune          # Clean up Docker system
```

## Environment Variables

### For Docker Deployment

Create a `.env.docker` file (copy from `.env.docker.example`):

```bash
cp .env.docker.example .env.docker
```

Edit `.env.docker` with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important:** The app requires Firebase authentication. Without these variables, users won't be able to sign in.

### For Local Development

Use `.env.local` (copy from `.env.local.example`):
```bash
cp .env.local.example .env.local
```

## Production Deployment

### Deploy to Cloud

#### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker build -t devopsflow:latest .
docker tag devopsflow:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/devopsflow:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/devopsflow:latest
```

#### Docker Hub
```bash
# Login to Docker Hub
docker login

# Tag and push
docker tag devopsflow:latest yourusername/devopsflow:latest
docker push yourusername/devopsflow:latest
```

#### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devopsflow
spec:
  replicas: 3
  selector:
    matchLabels:
      app: devopsflow
  template:
    metadata:
      labels:
        app: devopsflow
    spec:
      containers:
      - name: devopsflow
        image: yourusername/devopsflow:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: devopsflow
spec:
  selector:
    app: devopsflow
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## CI/CD Integration

### GitHub Actions
The project includes a GitHub Actions workflow (`.github/workflows/docker.yml`) that:
- Builds Docker image on push to main
- Pushes to Docker Hub
- Tags with version numbers
- Uses build cache for faster builds

Setup:
1. Add secrets to GitHub repository:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password/token

2. Push to main branch - image builds automatically!

### Jenkins Pipeline
```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t devopsflow:${BUILD_NUMBER} .'
            }
        }
        
        stage('Push') {
            steps {
                sh 'docker tag devopsflow:${BUILD_NUMBER} yourusername/devopsflow:latest'
                sh 'docker push yourusername/devopsflow:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs devopsflow

# Check if port is already in use
lsof -i :3000

# Inspect container
docker inspect devopsflow
```

### Build fails
```bash
# Clean build cache
docker builder prune

# Build without cache
docker build --no-cache -t devopsflow:latest .
```

### Permission issues
```bash
# The container runs as non-root user (nextjs)
# If you need to debug, run as root:
docker exec -it --user root devopsflow sh
```

### Hot reload not working in dev
```bash
# Make sure volumes are mounted correctly
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up --build
```

## Performance Optimization

### Image Size
- Production image: ~150MB (with multi-stage build)
- Development image: ~500MB (includes dev dependencies)

### Build Time
- First build: ~2-3 minutes
- Subsequent builds: ~30 seconds (with cache)

### Memory Usage
- Typical: 256MB
- Peak: 512MB

## Security Best Practices

✅ **Implemented:**
- Non-root user (nextjs:nodejs)
- Multi-stage build (minimal attack surface)
- Health checks
- No secrets in image
- .dockerignore to exclude sensitive files

🔒 **Additional Recommendations:**
- Use Docker secrets for sensitive data
- Scan images for vulnerabilities: `docker scan devopsflow:latest`
- Keep base images updated
- Use specific version tags (not `latest` in production)

## Monitoring

### Health Check
```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' devopsflow

# Manual health check
curl http://localhost:3000
```

### Resource Usage
```bash
# Real-time stats
docker stats devopsflow

# Detailed info
docker inspect devopsflow | jq '.[0].State'
```

## Backup & Restore

### Export Container
```bash
# Save image
docker save devopsflow:latest | gzip > devopsflow-backup.tar.gz

# Load image
gunzip -c devopsflow-backup.tar.gz | docker load
```

## Support

For issues or questions:
- Check logs: `docker logs devopsflow`
- Open an issue on GitHub
- Review this documentation

---

**Happy Dockerizing! 🐳**
