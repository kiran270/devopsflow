# Firebase Authentication Setup Guide

This guide will help you set up Google Authentication for DevOpsFlow using Firebase.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Enter project name: `devopsflow` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication** from the left sidebar
2. Click "Get started" if it's your first time
3. Go to the **Sign-in method** tab
4. Click on **Google** provider
5. Toggle **Enable**
6. Set a project support email
7. Click **Save**

## Step 3: Register Your Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`)
4. Register app:
   - App nickname: `DevOpsFlow Web`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"
5. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Firebase configuration values in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   ```

## Step 5: Install Dependencies

```bash
npm install
# or
yarn install
```

## Step 6: Run the Application

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` and click "Sign In" to test Google authentication!

## Step 7: Configure Authorized Domains (Production)

When deploying to production:

1. Go to Firebase Console > Authentication > Settings
2. Under "Authorized domains", add your production domain
3. Example: `devopsflow.com`, `www.devopsflow.com`

## Features Implemented

✅ Google Sign-In with popup
✅ User authentication state management
✅ Sign out functionality
✅ User display name in navigation
✅ Protected routes (optional - can be added)
✅ Persistent authentication across page reloads

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Firebase API keys are safe to expose in client-side code
- Use Firebase Security Rules to protect your data

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Authorized domains in Firebase Console
- For localhost, add: `localhost` and `127.0.0.1`

### "Firebase: Error (auth/popup-blocked)"
- Allow popups in your browser
- Or use redirect method instead of popup

### Authentication not persisting
- Check if cookies are enabled
- Clear browser cache and try again

## Optional: Add Protected Routes

To protect specific pages, create a `ProtectedRoute` component:

```typescript
// components/ProtectedRoute.tsx
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) return <div>Loading...</div>
  if (!user) return null

  return <>{children}</>
}
```

Then wrap protected pages:

```typescript
<ProtectedRoute>
  <YourProtectedContent />
</ProtectedRoute>
```

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs/auth)
- [Next.js Documentation](https://nextjs.org/docs)
