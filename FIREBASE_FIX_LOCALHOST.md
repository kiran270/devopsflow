# Fix: Firebase Localhost Authorization Error

If you're getting an error when trying to sign in, follow these steps:

## Quick Fix: Add localhost to Authorized Domains

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com/
2. Select your project: **devopsflow-b0729**

### Step 2: Add Localhost to Authorized Domains
1. Click **Authentication** in the left sidebar
2. Click the **Settings** tab (next to "Sign-in method")
3. Scroll down to **Authorized domains** section
4. Click **Add domain**
5. Enter: `localhost`
6. Click **Add**

### Step 3: Test Again
1. Go back to your app: http://localhost:3001
2. Click the **Sign In** button in the top-right corner
3. Select your Google account
4. You should now be signed in! ✅

---

## Alternative: Use Redirect Instead of Popup

If popups are being blocked, you can use redirect method instead:

Edit `contexts/AuthContext.tsx`:

```typescript
import { signInWithRedirect, getRedirectResult } from 'firebase/auth'

// In signInWithGoogle function:
await signInWithRedirect(auth, googleProvider)

// In useEffect, add:
getRedirectResult(auth).then((result) => {
  if (result) {
    console.log('Signed in via redirect:', result.user)
  }
})
```

---

## Verify Your Setup

Your current Firebase configuration:
- **Project ID**: devopsflow-b0729
- **Auth Domain**: devopsflow-b0729.firebaseapp.com
- **App is running on**: http://localhost:3001

Make sure:
- ✅ Google Sign-in is enabled in Firebase Console
- ✅ `localhost` is in Authorized domains
- ✅ `.env.local` file exists with correct values
- ✅ Dev server was restarted after creating `.env.local`

---

## Still Having Issues?

Check the browser console (F12) for detailed error messages.

Common issues:
1. **Popup blocked** - Allow popups in browser settings
2. **Domain not authorized** - Add localhost to Firebase Console
3. **Invalid API key** - Double-check your `.env.local` values
4. **Port mismatch** - Make sure you're accessing the correct port (3001)
