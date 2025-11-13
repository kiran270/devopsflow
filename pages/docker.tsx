import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Play, Pause, RotateCcw, Package, Rocket, GitBranch, Database, Network } from 'lucide-react'
import DockerDiagram from '../components/animations/DockerDiagram'

export default function Docker() {
  const [scenario, setScenario] = useState<'intro' | 'basics' | 'dockerfile' | 'compose' | 'volumes' | 'networks' | 'production' | 'usecases'>('intro')

  const scenarios = {
    intro: {
      name: 'Introduction to Docker',
      description: 'Learn what Docker is and why developers use it',
      steps: [
        {
          stage: 'Step 1',
          title: 'What is Docker?',
          code: `Docker is a platform for developing, shipping, and running 
applications in containers.

Containers package your application with all dependencies,
ensuring it runs the same everywhere - from your laptop 
to production.`,
          explanation: 'Docker is the most popular containerization platform, used by millions of developers worldwide.',
          concept: 'Containerization',
          useCase: '🎯 Real World: "Works on my machine" → Works everywhere'
        },
        {
          stage: 'Step 2',
          title: 'What Docker Does',
          code: `• Packages apps with all dependencies
• Ensures consistency across environments
• Isolates applications from each other
• Starts in seconds (vs minutes for VMs)
• Uses less resources than virtual machines
• Makes deployment simple and repeatable`,
          explanation: 'Docker solves the classic problem of applications working differently in development vs production.',
          concept: 'Benefits',
          useCase: '🎯 Real World: Deploy the same container to dev, staging, and production with confidence'
        },
        {
          stage: 'Step 3',
          title: 'Real-World Use Cases',
          code: `• Microservices architecture
• Easy local development environment
• Consistent CI/CD pipelines
• Cloud-native applications
• Testing in isolated environments
• Running multiple versions of same app`,
          explanation: 'Docker enables modern development practices and makes DevOps workflows much simpler.',
          concept: 'Industry Usage',
          useCase: '🎯 Real World: Spin up a complete dev environment (app + database + cache) with one command'
        },
        {
          stage: 'Step 4',
          title: 'Docker Workflow',
          code: `1. 📄 Write Dockerfile - Define your app environment
2. 🔨 docker build - Create an image
3. 📦 Image - Portable package with everything
4. ▶️ docker run - Start a container
5. 🚀 Container - Running instance of your app

Build once, run anywhere - laptop, server, or cloud!`,
          explanation: 'This workflow ensures your application runs identically in every environment.',
          concept: 'Development Workflow',
          useCase: '🎯 Real World: Build on Mac, test on Linux, deploy to AWS - same container everywhere'
        }
      ]
    },
    basics: {
      name: 'Docker Basics',
      description: 'Learn fundamental Docker commands',
      steps: [
        {
          stage: 'Step 1',
          title: 'Pull an Image',
          code: `docker pull node:18-alpine`,
          explanation: 'Download a Docker image from Docker Hub. Alpine images are smaller (5MB vs 900MB) and more secure.',
          concept: 'Image Management',
          useCase: '🎯 Real World: Starting any new project - you need base images for your tech stack'
        },
        {
          stage: 'Step 2',
          title: 'List Images',
          code: `docker images
# or
docker image ls`,
          explanation: 'View all downloaded images on your system with their sizes and tags.',
          concept: 'Image Inspection',
          useCase: '🎯 Real World: Checking what images are taking up disk space before cleanup'
        },
        {
          stage: 'Step 3',
          title: 'Run a Container',
          code: `docker run -d --name my-app -p 3000:3000 node:18-alpine`,
          explanation: '-d runs detached (background), --name gives it a name, -p maps ports (host:container)',
          concept: 'Container Basics',
          useCase: '🎯 Real World: Running a Node.js API that needs to be accessible on localhost:3000'
        },
        {
          stage: 'Step 4',
          title: 'List Running Containers',
          code: `docker ps
# Show all containers (including stopped)
docker ps -a`,
          explanation: 'See what containers are currently running and their status.',
          concept: 'Container Monitoring',
          useCase: '🎯 Real World: Debugging why your app is not responding - check if container is running'
        },
        {
          stage: 'Step 5',
          title: 'View Container Logs',
          code: `docker logs my-app
# Follow logs in real-time
docker logs -f my-app`,
          explanation: 'View stdout/stderr from your container. -f follows logs like tail -f.',
          concept: 'Debugging',
          useCase: '🎯 Real World: Debugging application errors without SSH into the container'
        },
        {
          stage: 'Step 6',
          title: 'Execute Commands in Container',
          code: `docker exec -it my-app sh
# Run a single command
docker exec my-app ls /app`,
          explanation: '-it gives you an interactive terminal. Useful for debugging inside the container.',
          concept: 'Container Access',
          useCase: '🎯 Real World: Checking file permissions or running database migrations'
        },
        {
          stage: 'Step 7',
          title: 'Stop and Remove Container',
          code: `docker stop my-app
docker rm my-app
# Or force remove running container
docker rm -f my-app`,
          explanation: 'Stop gracefully waits for shutdown. rm removes the container (not the image).',
          concept: 'Container Lifecycle',
          useCase: '🎯 Real World: Cleaning up after testing or before redeploying with new config'
        },
        {
          stage: 'Step 8',
          title: 'Clean Up System',
          code: `# Remove unused images
docker image prune
# Remove stopped containers
docker container prune
# Remove everything unused
docker system prune -a`,
          explanation: 'Free up disk space by removing unused Docker resources.',
          concept: 'Maintenance',
          useCase: '🎯 Real World: Your disk is full and Docker is using 50GB - time to clean up!'
        }
      ]
    },
    dockerfile: {
      name: 'Writing Dockerfiles',
      description: 'Create custom Docker images',
      steps: [
        {
          stage: 'Step 1',
          title: 'Basic Dockerfile',
          code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]`,
          explanation: 'FROM sets base image, WORKDIR sets working directory, COPY adds files, RUN executes commands, CMD is the startup command.',
          concept: 'Dockerfile Basics',
          useCase: '🎯 Real World: Containerizing a Node.js Express API for deployment'
        },
        {
          stage: 'Step 2',
          title: 'Build an Image',
          code: `docker build -t my-app:1.0 .
# Build with no cache
docker build --no-cache -t my-app:1.0 .`,
          explanation: '-t tags the image with a name and version. The dot (.) is the build context (current directory).',
          concept: 'Image Building',
          useCase: '🎯 Real World: Creating a deployable image of your application'
        },
        {
          stage: 'Step 3',
          title: 'Multi-Stage Build',
          code: `# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["node", "dist/server.js"]`,
          explanation: 'Use multiple FROM statements. Copy only what you need from builder stage to keep final image small.',
          concept: 'Multi-Stage Builds',
          useCase: '🎯 Real World: Building TypeScript app - compile in one stage, run in smaller production stage'
        },
        {
          stage: 'Step 4',
          title: 'Environment Variables',
          code: `FROM node:18-alpine
WORKDIR /app

# Set default env vars
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE $PORT
CMD ["node", "server.js"]`,
          explanation: 'ENV sets environment variables. EXPOSE documents which port the container listens on.',
          concept: 'Configuration',
          useCase: '🎯 Real World: Different configs for dev/staging/prod environments'
        },
        {
          stage: 'Step 5',
          title: 'Using .dockerignore',
          code: `# .dockerignore file
node_modules
npm-debug.log
.git
.env
*.md
.DS_Store
coverage
.vscode`,
          explanation: 'Like .gitignore but for Docker. Excludes files from build context to speed up builds.',
          concept: 'Build Optimization',
          useCase: '🎯 Real World: Excluding node_modules saves time - Docker will install fresh dependencies'
        },
        {
          stage: 'Step 6',
          title: 'Layer Caching',
          code: `FROM node:18-alpine
WORKDIR /app

# Copy package files first (changes less often)
COPY package*.json ./
RUN npm install

# Copy source code last (changes more often)
COPY . .

CMD ["node", "server.js"]`,
          explanation: 'Order matters! Put frequently changing files last to leverage Docker layer caching.',
          concept: 'Build Performance',
          useCase: '🎯 Real World: Rebuilds take 2 seconds instead of 2 minutes when only code changes'
        },
        {
          stage: 'Step 7',
          title: 'Health Checks',
          code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \\
  CMD node healthcheck.js || exit 1

CMD ["node", "server.js"]`,
          explanation: 'HEALTHCHECK tells Docker how to test if container is working. Container marked unhealthy if check fails.',
          concept: 'Container Health',
          useCase: '🎯 Real World: Load balancers can automatically remove unhealthy containers'
        },
        {
          stage: 'Step 8',
          title: 'Complete Production Dockerfile',
          code: `# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
WORKDIR /app

# Copy files with correct ownership
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs package*.json ./

USER nodejs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js || exit 1

CMD ["node", "dist/server.js"]`,
          explanation: '✅ Production-ready: multi-stage, non-root user, health checks, optimized layers.',
          concept: 'Production Best Practices',
          useCase: '🎯 Real World: Secure, efficient image ready for production deployment'
        }
      ]
    },
    compose: {
      name: 'Docker Compose',
      description: 'Multi-container applications',
      steps: [
        {
          stage: 'Step 1',
          title: 'Basic docker-compose.yml',
          code: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development`,
          explanation: 'Define services in YAML. Each service is a container. Compose manages them together.',
          concept: 'Compose Basics',
          useCase: '🎯 Real World: Running your app with a single command instead of multiple docker run commands'
        },
        {
          stage: 'Step 2',
          title: 'App + Database',
          code: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    depends_on:
      - db
  
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
          explanation: 'depends_on ensures db starts before app. Services can reference each other by name (db).',
          concept: 'Service Dependencies',
          useCase: '🎯 Real World: Full-stack app with database - start everything with docker-compose up'
        },
        {
          stage: 'Step 3',
          title: 'Start Services',
          code: `# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down`,
          explanation: 'up starts all services, down stops and removes containers. Volumes persist.',
          concept: 'Compose Commands',
          useCase: '🎯 Real World: Daily development workflow - start/stop your entire stack'
        },
        {
          stage: 'Step 4',
          title: 'Development with Hot Reload',
          code: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev`,
          explanation: 'Mount source code as volume. Changes on host reflect in container immediately.',
          concept: 'Development Workflow',
          useCase: '🎯 Real World: Edit code in VS Code, see changes instantly without rebuilding'
        },
        {
          stage: 'Step 5',
          title: 'Full Stack Application',
          code: `version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
  
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`,
          explanation: '✅ Complete stack: React frontend, Node backend, PostgreSQL, Redis - all connected.',
          concept: 'Multi-Service Architecture',
          useCase: '🎯 Real World: Production-like environment on your laptop for development'
        }
      ]
    },
    volumes: {
      name: 'Data Persistence',
      description: 'Managing data with volumes',
      steps: [
        {
          stage: 'Step 1',
          title: 'Named Volumes',
          code: `docker volume create my-data
docker run -v my-data:/app/data my-app`,
          explanation: 'Named volumes are managed by Docker. Data persists even when container is removed.',
          concept: 'Volume Basics',
          useCase: '🎯 Real World: Database data that must survive container restarts'
        },
        {
          stage: 'Step 2',
          title: 'Bind Mounts',
          code: `docker run -v $(pwd)/data:/app/data my-app
# Or with --mount (more explicit)
docker run --mount type=bind,source=$(pwd)/data,target=/app/data my-app`,
          explanation: 'Bind mounts link a host directory to container. Changes sync both ways.',
          concept: 'Bind Mounts',
          useCase: '🎯 Real World: Development - edit config files on host, app sees changes immediately'
        },
        {
          stage: 'Step 3',
          title: 'Volume Management',
          code: `# List volumes
docker volume ls

# Inspect volume
docker volume inspect my-data

# Remove volume
docker volume rm my-data

# Remove unused volumes
docker volume prune`,
          explanation: 'Manage volumes separately from containers. Volumes can be shared between containers.',
          concept: 'Volume Operations',
          useCase: '🎯 Real World: Cleaning up old project volumes to free disk space'
        },
        {
          stage: 'Step 4',
          title: 'Backup Volume Data',
          code: `# Backup
docker run --rm -v my-data:/data -v $(pwd):/backup alpine \\
  tar czf /backup/backup.tar.gz -C /data .

# Restore
docker run --rm -v my-data:/data -v $(pwd):/backup alpine \\
  tar xzf /backup/backup.tar.gz -C /data`,
          explanation: 'Use a temporary container to backup/restore volume data to host filesystem.',
          concept: 'Data Backup',
          useCase: '🎯 Real World: Backing up production database before major migration'
        }
      ]
    },
    networks: {
      name: 'Container Networking',
      description: 'Connect containers together',
      steps: [
        {
          stage: 'Step 1',
          title: 'Create Network',
          code: `docker network create my-network
docker run --network my-network --name app1 my-app
docker run --network my-network --name app2 my-app`,
          explanation: 'Containers on same network can communicate using container names as hostnames.',
          concept: 'Network Basics',
          useCase: '🎯 Real World: Microservices that need to talk to each other'
        },
        {
          stage: 'Step 2',
          title: 'Network Types',
          code: `# Bridge (default) - isolated network
docker network create --driver bridge my-bridge

# Host - use host network directly
docker run --network host my-app

# None - no networking
docker run --network none my-app`,
          explanation: 'Bridge isolates containers, host shares host network, none disables networking.',
          concept: 'Network Drivers',
          useCase: '🎯 Real World: Host network for performance-critical apps, none for security'
        },
        {
          stage: 'Step 3',
          title: 'Service Discovery',
          code: `# In docker-compose.yml
version: '3.8'
services:
  api:
    build: ./api
    networks:
      - backend
  
  worker:
    build: ./worker
    environment:
      - API_URL=http://api:3000
    networks:
      - backend

networks:
  backend:`,
          explanation: 'Compose creates a network automatically. Services discover each other by service name.',
          concept: 'Service Discovery',
          useCase: '🎯 Real World: Worker processes connecting to API without hardcoded IPs'
        }
      ]
    },
    production: {
      name: 'Production Deployment',
      description: 'Best practices for production',
      steps: [
        {
          stage: 'Step 1',
          title: 'Security - Non-Root User',
          code: `FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
WORKDIR /app
COPY --chown=nodejs:nodejs . .
USER nodejs
CMD ["node", "server.js"]`,
          explanation: 'Never run as root in production. Create a dedicated user with minimal permissions.',
          concept: 'Security',
          useCase: '🎯 Real World: Preventing container breakout attacks'
        },
        {
          stage: 'Step 2',
          title: 'Resource Limits',
          code: `docker run -d \\
  --name my-app \\
  --memory="512m" \\
  --cpus="0.5" \\
  --restart=unless-stopped \\
  my-app`,
          explanation: 'Limit CPU and memory to prevent one container from consuming all resources.',
          concept: 'Resource Management',
          useCase: '🎯 Real World: Preventing memory leaks from crashing the entire server'
        },
        {
          stage: 'Step 3',
          title: 'Health Checks in Compose',
          code: `version: '3.8'
services:
  app:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 40s
    restart: unless-stopped`,
          explanation: 'Compose can restart unhealthy containers automatically.',
          concept: 'High Availability',
          useCase: '🎯 Real World: Auto-recovery from application crashes'
        },
        {
          stage: 'Step 4',
          title: 'Secrets Management',
          code: `# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    secrets:
      - db_password
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt`,
          explanation: 'Use Docker secrets instead of environment variables for sensitive data.',
          concept: 'Secrets',
          useCase: '🎯 Real World: Keeping database passwords out of environment variables'
        },
        {
          stage: 'Step 5',
          title: 'Logging',
          code: `docker run -d \\
  --name my-app \\
  --log-driver json-file \\
  --log-opt max-size=10m \\
  --log-opt max-file=3 \\
  my-app`,
          explanation: 'Configure log rotation to prevent logs from filling up disk.',
          concept: 'Log Management',
          useCase: '🎯 Real World: Preventing disk full errors from verbose logging'
        },
        {
          stage: 'Step 6',
          title: 'Production Compose File',
          code: `version: '3.8'
services:
  app:
    image: myregistry.com/myapp:\${VERSION}
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
      restart_policy:
        condition: on-failure
        max_attempts: 3
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
    secrets:
      - db_password
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

secrets:
  db_password:
    external: true`,
          explanation: '✅ Production-ready: replicas, resource limits, health checks, secrets, log rotation.',
          concept: 'Production Configuration',
          useCase: '🎯 Real World: Deploying to Docker Swarm or production environment'
        }
      ]
    },
    usecases: {
      name: 'Real-World Use Cases',
      description: 'Practical Docker examples used in real projects',
      steps: []
    }
  }



  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 min-h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Learn Docker - Real World Use Cases
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Master containerization with practical examples
          </p>
        </motion.div>

        {/* Scenario Selection */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setScenario('intro')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'intro' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                📖 Introduction
              </button>
              <button
                onClick={() => setScenario('basics')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'basics' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Rocket size={14} />
                Basics
              </button>
              <button
                onClick={() => setScenario('dockerfile')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'dockerfile' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Package size={14} />
                Dockerfile
              </button>
              <button
                onClick={() => setScenario('compose')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'compose' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <GitBranch size={14} />
                Compose
              </button>
              <button
                onClick={() => setScenario('volumes')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'volumes' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Database size={14} />
                Volumes
              </button>
              <button
                onClick={() => setScenario('networks')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'networks' 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Network size={14} />
                Networks
              </button>
              <button
                onClick={() => setScenario('production')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'production' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Rocket size={14} />
                Production
              </button>
              <button
                onClick={() => setScenario('usecases')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'usecases' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                💼 Use Cases
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 lg:min-h-0 lg:overflow-hidden">
          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">
              {scenarios[scenario].name}
            </h2>
            <div className="flex-1 min-h-0 overflow-auto space-y-3 custom-scrollbar">
              {/* Description */}
              <div className="glass-card p-2 sm:p-3 bg-white/5">
                <p className="text-xs text-gray-300">
                  {scenarios[scenario].description}
                </p>
              </div>

              {/* Show Use Cases or Terminal based on scenario */}
              {scenario === 'usecases' ? (
                /* Real-World Use Cases with Code Examples */
                <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">💼</span>
                Real-World Docker Use Cases in Projects
              </h3>
              
              <div className="space-y-4">
                {/* Use Case 1: Full-Stack App with Docker Compose */}
                <div className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/5">
                  <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <span>🏗️</span>
                    Use Case 1: Full-Stack Application (React + Node.js + PostgreSQL)
                  </h4>
                  
                  {/* Diagram */}
                  <div className="mb-3 glass-card p-2 bg-black/30">
                    <DockerDiagram type="compose" />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Team members have different OS and database versions. Setup takes hours for new developers.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Use Docker Compose to run entire stack with one command.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      docker-compose.yml
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`version: '3.8'

services:
  # Frontend - React App
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    depends_on:
      - backend

  # Backend - Node.js API
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - JWT_SECRET=your-secret-key
    depends_on:
      - db

  # Database - PostgreSQL
  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Usage Commands
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <div className="text-gray-400"># Start entire application</div>
                      <div className="text-green-300">docker-compose up</div>
                      <div className="mt-2 text-gray-400"># Stop all services</div>
                      <div className="text-green-300">docker-compose down</div>
                      <div className="mt-2 text-gray-400"># View logs</div>
                      <div className="text-green-300">docker-compose logs -f backend</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">Why this works:</span> New developers run "docker-compose up" and get the entire stack running in minutes. No need to install Node.js, PostgreSQL, or configure databases. Everyone uses identical environments.
                    </p>
                  </div>
                </div>

                {/* Use Case 2: Microservices Architecture */}
                <div className="border border-green-500/30 rounded-lg p-3 bg-green-500/5">
                  <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                    <span>🔧</span>
                    Use Case 2: Microservices with Independent Scaling
                  </h4>
                  
                  <div className="mb-3 glass-card p-2 bg-black/30">
                    <DockerDiagram type="microservices" />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> E-commerce app needs to scale payment service independently during high traffic.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Containerize each microservice separately for independent deployment and scaling.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Dockerfile (Payment Service)
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js || exit 1

# Run application
CMD ["node", "server.js"]`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Deployment Commands
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <div className="text-gray-400"># Build image</div>
                      <div className="text-green-300">docker build -t payment-service:v1.0 .</div>
                      <div className="mt-2 text-gray-400"># Run single instance</div>
                      <div className="text-green-300">docker run -d -p 3001:3001 payment-service:v1.0</div>
                      <div className="mt-2 text-gray-400"># Scale to 5 instances (with Docker Swarm)</div>
                      <div className="text-green-300">docker service scale payment-service=5</div>
                      <div className="mt-2 text-gray-400"># Update to new version with zero downtime</div>
                      <div className="text-green-300">docker service update --image payment-service:v1.1 payment-service</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">Why this works:</span> Payment service can scale to 10 instances during Black Friday while user service stays at 2 instances. Each service has its own dependencies and can be updated independently. Health checks ensure only healthy containers receive traffic.
                    </p>
                  </div>
                </div>

                {/* Use Case 3: Development Database */}
                <div className="border border-cyan-500/30 rounded-lg p-3 bg-cyan-500/5">
                  <h4 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <span>💾</span>
                    Use Case 3: Quick Database Setup for Development
                  </h4>
                  
                  <div className="mb-3 glass-card p-2 bg-black/30">
                    <DockerDiagram type="volumes" />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Need to test app with different database versions without installing them locally.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Run databases in containers, switch versions instantly.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Terminal Commands
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <div className="text-gray-400"># Run PostgreSQL 15</div>
                      <div className="text-green-300">docker run -d --name postgres15 \\</div>
                      <div className="text-green-300">  -e POSTGRES_PASSWORD=secret \\</div>
                      <div className="text-green-300">  -e POSTGRES_DB=myapp \\</div>
                      <div className="text-green-300">  -p 5432:5432 \\</div>
                      <div className="text-green-300">  -v pgdata:/var/lib/postgresql/data \\</div>
                      <div className="text-green-300">  postgres:15</div>
                      
                      <div className="mt-2 text-gray-400"># Connect to database</div>
                      <div className="text-green-300">docker exec -it postgres15 psql -U postgres -d myapp</div>
                      
                      <div className="mt-2 text-gray-400"># Run MongoDB for testing</div>
                      <div className="text-green-300">docker run -d --name mongo \\</div>
                      <div className="text-green-300">  -p 27017:27017 \\</div>
                      <div className="text-green-300">  -v mongodata:/data/db \\</div>
                      <div className="text-green-300">  mongo:7</div>
                      
                      <div className="mt-2 text-gray-400"># Run Redis for caching</div>
                      <div className="text-green-300">docker run -d --name redis \\</div>
                      <div className="text-green-300">  -p 6379:6379 \\</div>
                      <div className="text-green-300">  redis:alpine</div>
                      
                      <div className="mt-2 text-gray-400"># Stop and remove when done</div>
                      <div className="text-green-300">docker stop postgres15 mongo redis</div>
                      <div className="text-green-300">docker rm postgres15 mongo redis</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">Why this works:</span> No need to install databases on your machine. Test with PostgreSQL 14, 15, or 16 by changing the tag. Data persists in volumes. Clean up is simple - just remove containers. Perfect for testing migrations or compatibility.
                    </p>
                  </div>
                </div>

                {/* Use Case 4: Multi-Stage Build */}
                <div className="border border-orange-500/30 rounded-lg p-3 bg-orange-500/5">
                  <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                    <span>📦</span>
                    Use Case 4: Optimized Production Image with Multi-Stage Build
                  </h4>
                  
                  <div className="mb-3 glass-card p-2 bg-black/30">
                    <DockerDiagram type="workflow" />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Docker image is 1.5GB with dev dependencies. Slow to deploy and wastes resources.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Use multi-stage build to create minimal production image (150MB).
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Dockerfile (Multi-Stage)
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Build & Compare
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <div className="text-gray-400"># Build optimized image</div>
                      <div className="text-green-300">docker build -t myapp:optimized .</div>
                      <div className="mt-2 text-gray-400"># Check image size</div>
                      <div className="text-green-300">docker images myapp</div>
                      <div className="text-gray-500">myapp  optimized  150MB  (vs 1.5GB before)</div>
                      <div className="mt-2 text-gray-400"># Deploy faster</div>
                      <div className="text-cyan-300">✓ 10x faster deployment</div>
                      <div className="text-cyan-300">✓ Lower storage costs</div>
                      <div className="text-cyan-300">✓ Smaller attack surface</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">Why this works:</span> Builder stage has all dev tools for compilation. Production stage only copies compiled code and runtime dependencies. Results in 90% smaller image, faster deployments, and better security (fewer packages = fewer vulnerabilities).
                    </p>
                  </div>
                </div>

                {/* Use Case 5: Development Environment with Hot Reload */}
                <div className="border border-purple-500/30 rounded-lg p-3 bg-purple-500/5">
                  <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <span>🔥</span>
                    Use Case 5: Development Environment with Hot Reload
                  </h4>
                  
                  <div className="mb-3 glass-card p-2 bg-black/30">
                    <DockerDiagram type="architecture" />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Developers need to rebuild Docker image every time they change code. Slow feedback loop.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Mount source code as volume and use hot reload for instant updates.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      docker-compose.dev.yml
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`version: '3.8'

services:
  # React Frontend with Hot Reload
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      # Mount source code
      - ./frontend/src:/app/src
      - ./frontend/public:/app/public
      # Prevent node_modules from being overwritten
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true  # Enable hot reload
      - REACT_APP_API_URL=http://localhost:5000
    command: npm start

  # Node.js Backend with Nodemon
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "5000:5000"
      - "9229:9229"  # Debug port
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    command: nodemon --inspect=0.0.0.0:9229 server.js

  # Database
  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Dockerfile.dev (Frontend)
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Don't copy source - will be mounted as volume
EXPOSE 3000

# Start dev server with hot reload
CMD ["npm", "start"]`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Usage
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <div className="text-gray-400"># Start development environment</div>
                      <div className="text-green-300">docker-compose -f docker-compose.dev.yml up</div>
                      <div className="mt-2 text-gray-400"># Edit files in your IDE</div>
                      <div className="text-cyan-300">→ Changes appear instantly in browser!</div>
                      <div className="mt-2 text-gray-400"># Debug backend with Chrome DevTools</div>
                      <div className="text-cyan-300">→ chrome://inspect → Connect to localhost:9229</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">Why this works:</span> Source code is mounted as volume, so changes on host immediately reflect in container. Hot reload watches for file changes and updates app without restart. No need to rebuild images during development. Debug port exposed for debugging. Same environment as production but optimized for development speed.
                    </p>
                  </div>
                </div>

                {/* Use Case 6: CI/CD Integration Testing */}
                <div className="border border-yellow-500/30 rounded-lg p-3 bg-yellow-500/5">
                  <h4 className="font-semibold text-yellow-300 mb-2 flex items-center gap-2">
                    <span>🧪</span>
                    Use Case 6: Isolated Integration Testing in CI/CD
                  </h4>
                  
                  <div className="mb-3 glass-card p-2 bg-black/30">
                    <DockerDiagram type="cicd" />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Integration tests need real database and services. Can't use shared test environment (conflicts between parallel builds).
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Spin up isolated test environment in Docker for each CI build, run tests, tear down.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      docker-compose.test.yml
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`version: '3.8'

services:
  app:
    build:
      context: .
      target: test  # Multi-stage build test stage
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      - NODE_ENV=test
      - DATABASE_URL=postgresql://test:test@db:5432/testdb
      - REDIS_URL=redis://redis:6379
    command: npm run test:integration

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=test
      - POSTGRES_PASSWORD=test
      - POSTGRES_DB=testdb
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U test"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      CI Pipeline (.github/workflows/test.yml)
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`name: Integration Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Integration Tests
        run: |
          # Start services
          docker-compose -f docker-compose.test.yml up \\
            --build \\
            --abort-on-container-exit \\
            --exit-code-from app
      
      - name: Cleanup
        if: always()
        run: docker-compose -f docker-compose.test.yml down -v`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Local Testing
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <div className="text-gray-400"># Run integration tests locally</div>
                      <div className="text-green-300">docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit</div>
                      <div className="mt-2 text-gray-400"># View test results</div>
                      <div className="text-cyan-300">✓ Database connection test</div>
                      <div className="text-cyan-300">✓ Redis caching test</div>
                      <div className="text-cyan-300">✓ API endpoint tests</div>
                      <div className="text-cyan-300">✓ 45 tests passed</div>
                      <div className="mt-2 text-gray-400"># Cleanup</div>
                      <div className="text-green-300">docker-compose -f docker-compose.test.yml down -v</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">Why this works:</span> Each CI build gets completely isolated environment. No conflicts between parallel builds. Health checks ensure services are ready before tests run. Tests run against real database and Redis (not mocks). Automatic cleanup after tests. Same test environment locally and in CI. Fast - containers start in seconds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              /* Terminal for other scenarios */
              <div className="glass-card p-2 sm:p-3 bg-black/50 border border-gray-600">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-600">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400">Terminal</span>
                </div>
                
                <div className="space-y-3">
            {scenarios[scenario].steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-400 font-bold">
                      {s.title}
                    </div>
                    <div className="text-purple-300 text-xs mt-0.5">
                      📚 {s.concept}
                    </div>
                  </div>
                </div>
                
                {/* Code Block with Line Numbers */}
                <div className="mb-3">
                    <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden">
                      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                        Command
                      </div>
                      <div className="p-3">
                        {s.code.split('\n').map((line: string, lineIdx: number) => (
                          <div key={lineIdx} className="flex gap-3">
                            <span className="text-gray-600 select-none w-6 text-right">
                              {lineIdx + 1}
                            </span>
                            <pre className="text-green-300 whitespace-pre flex-1">
                              {line}
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                
                {/* Explanation */}
                <div className="p-3 rounded mb-2 bg-blue-500/10 border border-blue-400/30">
                    <div className="text-blue-300 text-xs">
                      💡 {s.explanation}
                    </div>
                  </div>
                
                {/* Use Case */}
                <div className="p-2 bg-green-500/10 border border-green-400/30 rounded">
                    <div className="text-green-300 text-xs">
                      {s.useCase}
                    </div>
                  </div>
              </motion.div>
            ))}
                </div>
              </div>
            )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
