# Fix: "Firebase Not Configured" in Production

## Problem
You see "Firebase Not Configured" message even though `.env.docker` has values.

## Root Cause
Next.js bakes `NEXT_PUBLIC_*` environment variables into the build at **build time**, not runtime. If the variables aren't available during `docker build`, they won't be in the final image.

## Complete Fix (Run on Production Server)

### Step 1: Verify .env.docker has values

```bash
cd /home/ubuntu/devopsflow/devopsflow

# Check if file exists and has values
cat .env.docker | grep FIREBASE_API_KEY

# Should show something like:
# NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
```

If it shows placeholder values like `your_api_key_here`, update it with real values!

### Step 2: Run the fix script

```bash
# Make sure you're in the project directory
cd /home/ubuntu/devopsflow/devopsflow

# Run the fix script
./fix-firebase-prod.sh
```

This script will:
1. Load environment variables from `.env.docker`
2. Remove old Docker images
3. Build fresh with Firebase config baked in
4. Start containers
5. Verify Firebase config is present

### Step 3: Verify it worked

```bash
# Check if container is running
docker ps | grep devopsflow-app

# Check logs for errors
docker logs devopsflow-app | tail -20

# Visit your site
curl -I https://devopsflow.duckdns.org/login
```

## Manual Fix (If script doesn't work)

### Method 1: Build with explicit environment variables

```bash
# Load variables
export $(cat .env.docker | grep -v '^#' | xargs)

# Verify they're loaded
echo "API Key: ${NEXT_PUBLIC_FIREBASE_API_KEY:0:10}..."

# Stop containers
docker-compose -f docker-compose.prod.yml down

# Remove old image
docker rmi devopsflow:latest

# Build with --build-arg for each variable
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

# Start containers
docker-compose -f docker-compose.prod.yml up -d
```

### Method 2: Create .env file (Docker Compose default)

```bash
# Copy .env.docker to .env (Docker Compose reads .env by default)
cp .env.docker .env

# Rebuild
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

## Debugging Steps

### 1. Check if .env.docker has real values

```bash
cat .env.docker
```

Should show:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...  (not "your_api_key_here")
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
...
```

### 2. Check if variables are loaded in shell

```bash
export $(cat .env.docker | xargs)
echo $NEXT_PUBLIC_FIREBASE_API_KEY
```

Should print your actual API key.

### 3. Check if variables are in Docker build

```bash
# During build, you should see:
# Step X/Y : ARG NEXT_PUBLIC_FIREBASE_API_KEY
# Step X/Y : ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
```

### 4. Check if variables are in the built Next.js files

```bash
# After build, check if Firebase config is in the static files
docker run --rm devopsflow:latest sh -c 'grep -r "firebaseapp" .next/static 2>/dev/null | head -1'
```

Should show Firebase domain in the output.

### 5. Check browser console

Open https://devopsflow.duckdns.org/login and press F12:

```javascript
// In browser console, check:
console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
```

Should show your API key (not undefined).

## Common Issues

### Issue 1: .env.docker has placeholder values

**Symptom**: File exists but has `your_api_key_here`

**Fix**: Update with real Firebase credentials from Firebase Console

### Issue 2: Variables not exported before build

**Symptom**: Build succeeds but Firebase not configured

**Fix**: Always export variables before building:
```bash
export $(cat .env.docker | xargs)
```

### Issue 3: Using docker-compose without .env file

**Symptom**: docker-compose.prod.yml can't find variables

**Fix**: Either:
- Create `.env` file: `cp .env.docker .env`
- Or use: `docker-compose --env-file .env.docker ...`

### Issue 4: Old image cached

**Symptom**: Rebuild doesn't help

**Fix**: Remove old image first:
```bash
docker rmi devopsflow:latest
docker rmi devopsflow_devopsflow
```

### Issue 5: Next.js not picking up env vars

**Symptom**: Variables set but not in build

**Fix**: Ensure variables start with `NEXT_PUBLIC_`:
```
✅ NEXT_PUBLIC_FIREBASE_API_KEY
❌ FIREBASE_API_KEY
```

## Verification Checklist

After fixing, verify:

- [ ] `.env.docker` exists and has real values (not placeholders)
- [ ] Variables exported: `echo $NEXT_PUBLIC_FIREBASE_API_KEY` shows value
- [ ] Docker image built with `--build-arg` for each variable
- [ ] Container is running: `docker ps | grep devopsflow-app`
- [ ] No errors in logs: `docker logs devopsflow-app`
- [ ] Login page shows "Sign in with Google" button (not "Firebase Not Configured")
- [ ] Browser console shows Firebase API key (not undefined)
- [ ] Domain added to Firebase Console authorized domains

## Quick Test

```bash
# One-liner to test if Firebase is configured
docker exec devopsflow-app sh -c 'node -e "console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? \"✅ Configured\" : \"❌ Not configured\")"'
```

## Still Not Working?

### Check the Dockerfile

Make sure Dockerfile has:

```dockerfile
# Stage 2: Builder
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# ... other args

ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# ... other envs

RUN npm run build  # This bakes the env vars into the build
```

### Check lib/firebase.ts

Make sure it's reading from `process.env`:

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // ...
}
```

## Complete Rebuild Command

If all else fails, complete rebuild:

```bash
cd /home/ubuntu/devopsflow/devopsflow

# 1. Stop everything
docker-compose -f docker-compose.prod.yml down

# 2. Remove all images
docker rmi $(docker images | grep devopsflow | awk '{print $3}')

# 3. Load env vars
export $(cat .env.docker | grep -v '^#' | xargs)

# 4. Verify
echo "API Key: ${NEXT_PUBLIC_FIREBASE_API_KEY:0:10}..."

# 5. Build from scratch
docker build --no-cache \
    --build-arg NEXT_PUBLIC_FIREBASE_API_KEY="$NEXT_PUBLIC_FIREBASE_API_KEY" \
    --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" \
    --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID="$NEXT_PUBLIC_FIREBASE_PROJECT_ID" \
    --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" \
    --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" \
    --build-arg NEXT_PUBLIC_FIREBASE_APP_ID="$NEXT_PUBLIC_FIREBASE_APP_ID" \
    -t devopsflow:latest .

# 6. Start
docker-compose -f docker-compose.prod.yml up -d

# 7. Check
docker logs devopsflow-app
```

---

**TL;DR**: Run `./fix-firebase-prod.sh` on your production server. It handles everything automatically!
