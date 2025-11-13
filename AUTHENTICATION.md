# Authentication Setup

## How It Works

Your DevOpsFlow app now requires authentication to access all courses.

### User Flow:
1. **First Visit** → User sees `/login` page
2. **Click "Sign in with Google"** → Google authentication popup
3. **Successful Login** → Redirected to home page with all courses visible
4. **Sign Out** → Redirected back to login page

### Protected Routes:
- ✅ All pages require authentication (except `/login`)
- ✅ Unauthenticated users are automatically redirected to `/login`
- ✅ After successful sign-in, users are redirected to home page

### Tracking Users:
You can now track all logged-in users in Firebase Console:

1. **Firebase Console** → **Authentication** → **Users**
   - See all users who signed in
   - View email, display name, last sign-in time
   - Total user count

2. **Firebase Console** → **Analytics** → **Events**
   - Track `login` events
   - See user engagement metrics
   - Monitor active users

### Development Mode:
If Firebase is not configured (no `.env.local`), the app allows access without authentication for development purposes.

### Files Modified:
- `pages/login.tsx` - New login page
- `components/auth/ProtectedRoute.tsx` - Route protection wrapper
- `pages/_app.tsx` - Added route protection logic
- `components/layout/Layout.tsx` - Updated sign-out to redirect to login
- `contexts/AuthContext.tsx` - Authentication context

## Testing:
1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. You should be redirected to `/login`
4. Sign in with Google
5. After successful login, you'll see the home page with all courses
