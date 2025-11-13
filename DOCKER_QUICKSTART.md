# Docker Quick Start Guide 🚀

Get DevOpsFlow running with Docker in 3 simple steps!

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (usually comes with Docker Desktop)
- Firebase project set up ([Firebase Console](https://console.firebase.google.com/))

## Quick Start

### Option 1: Using the Deployment Script (Easiest)

```bash
# 1. Set up Firebase credentials
cp .env.docker.example .env.docker
nano .env.docker  # Add your Firebase credentials

# 2. Run the deployment script
./deploy-docker.sh

# 3. Select option 1 (Deploy Production)
```

### Option 2: Using Makefile

```bash
# 1. Set up Firebase credentials
cp .env.docker.example .env.docker
nano .env.docker  # Add your Firebase credentials

# 2. Build and run
make build
make up

# Access at http://localhost
```

### Option 3: Using Docker Compose Directly

```bash
# 1. Set up Firebase credentials
cp .env.docker.example .env.docker
nano .env.docker  # Add your Firebase credentials

# 2. Load environment variables
export $(cat .env.docker | xargs)

# 3. Build and run
docker-compose -f docker-compose.prod.yml up -d

# Access at http://localhost
```

## Firebase Setup

Get your Firebase credentials from [Firebase Console](https://console.firebase.google.com/):

1. Go to Project Settings → General
2. Scroll to "Your apps" section
3. Click on the web app (</> icon)
4. Copy the config values to `.env.docker`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Development Mode

For development with hot reload:

```bash
# 1. Set up local environment
cp .env.local.example .env.local
nano .env.local  # Add your Firebase credentials

# 2. Start dev environment
make dev

# Or using docker-compose
export $(cat .env.local | xargs)
docker-compose -f docker-compose.dev.yml up
```

## Common Commands

```bash
# View logs
make logs

# Check status
docker-compose -f docker-compose.prod.yml ps

# Stop containers
make down

# Restart
make restart

# Clean up everything
make clean-all
```

## Accessing the Application

After deployment:
- **With nginx**: http://localhost
- **Direct access**: http://localhost:3000
- **Login page**: http://localhost/login

## Troubleshooting

### "Firebase not configured" error
- Make sure `.env.docker` exists and has all Firebase variables
- Rebuild the image: `make build`

### Port already in use
```bash
# Check what's using port 80
lsof -i :80

# Or use different port
docker-compose -f docker-compose.prod.yml up -d --scale nginx=0
# Access at http://localhost:3000
```

### Container won't start
```bash
# Check logs
docker logs devopsflow-app

# Check health
docker inspect devopsflow-app --format='{{.State.Health.Status}}'
```

### Authentication not working
1. Check Firebase Console → Authentication → Settings → Authorized domains
2. Add your domain (e.g., `localhost`, `yourdomain.com`)
3. Restart containers: `make restart`

## Production Deployment

For production deployment to cloud:

1. **Update authorized domains** in Firebase Console
2. **Set up SSL** (update nginx.conf)
3. **Use environment-specific .env files**
4. **Enable monitoring** (health checks are already configured)

See [DOCKER.md](./DOCKER.md) for detailed production deployment guide.

## Need Help?

- Check [DOCKER.md](./DOCKER.md) for detailed documentation
- Check [AUTHENTICATION.md](./AUTHENTICATION.md) for auth setup
- View logs: `make logs`
- Check container status: `docker ps`

---

**Happy Deploying! 🐳**
