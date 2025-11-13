# DevOpsFlow Project Structure

## 📁 Root Files

### Configuration Files
- `package.json` - Node.js dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

### Docker Files
- `Dockerfile` - Production Docker image (multi-stage build)
- `Dockerfile.dev` - Development Docker image (hot reload)
- `docker-compose.prod.yml` - Production deployment with nginx
- `docker-compose.dev.yml` - Development environment
- `.dockerignore` - Files to exclude from Docker build
- `nginx.conf` - Nginx reverse proxy configuration

### Environment Files
- `.env.local` - Local development environment variables (not in git)
- `.env.local.example` - Template for local development
- `.env.docker` - Docker deployment environment variables (not in git)
- `.env.docker.example` - Template for Docker deployment

### Scripts
- `deploy-docker.sh` - Interactive deployment script
- `test-docker.sh` - Test Docker setup
- `Makefile` - Quick Docker commands

### Documentation
- `README.md` - Main project documentation
- `DOCKER.md` - Comprehensive Docker guide
- `DOCKER_QUICKSTART.md` - Quick start for Docker
- `AUTHENTICATION.md` - Authentication setup guide
- `FIREBASE_SETUP.md` - Firebase configuration guide
- `FIREBASE_FIX_LOCALHOST.md` - Localhost Firebase issues

## 📁 Directories

### `/pages`
Next.js pages (routes)
- `_app.tsx` - App wrapper with AuthProvider
- `_document.tsx` - HTML document structure
- `index.tsx` - Home page with course list
- `login.tsx` - Login page (Google sign-in)
- `about.tsx` - About page
- Data structure pages: `arrays.tsx`, `linked-lists.tsx`, `stacks.tsx`, `queues.tsx`, `trees.tsx`
- Algorithm pages: `algorithms.tsx`, `sorting.tsx`
- DevOps pages: `git.tsx`, `jenkins.tsx`, `docker.tsx`, `kubernetes.tsx`, `aws.tsx`
- Programming pages: `python.tsx`, `linux.tsx`

### `/components`
React components
- `/layout` - Layout components (Header, Footer, Navigation)
- `/animations` - Interactive visualizations
- `/auth` - Authentication components (ProtectedRoute)

### `/contexts`
React contexts
- `AuthContext.tsx` - Firebase authentication context

### `/lib`
Utility libraries
- `firebase.ts` - Firebase configuration and initialization

### `/styles`
CSS files
- `globals.css` - Global styles and Tailwind imports

### `/public`
Static assets
- Images, icons, fonts

### `/.github`
GitHub configuration
- `/workflows/docker.yml` - CI/CD pipeline for Docker

### `/aws`
AWS deployment files
- `cloudformation-template.yaml` - CloudFormation template
- `ecs-task-definition.json` - ECS task definition

## 🔒 Files Not in Git (.gitignore)

- `node_modules/` - Dependencies
- `.next/` - Next.js build output
- `.env.local` - Local environment variables
- `.env.docker` - Docker environment variables
- `*.log` - Log files

## 📊 Project Stats

- **Total Pages**: 15+ interactive courses
- **Components**: 20+ reusable components
- **Animations**: 10+ interactive visualizations
- **Docker Images**: 2 (production + development)
- **Documentation**: 6 comprehensive guides

## 🚀 Quick Commands

```bash
# Local Development
npm install
npm run dev

# Docker Production
./deploy-docker.sh
# or
make build && make up

# Docker Development
make dev

# Testing
./test-docker.sh
```

## 📝 Notes

- All pages require authentication (except `/login`)
- Firebase is required for authentication
- Docker deployment includes nginx reverse proxy
- Health checks configured for production
- Hot reload enabled in development mode
