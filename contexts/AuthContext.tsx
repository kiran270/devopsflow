import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  User, 
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: (onSuccess?: () => void) => Promise<void>
  signOut: () => Promise<void>
  isConfigured: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  isConfigured: false
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If Firebase is not configured, just set loading to false
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async (onSuccess?: () => void) => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      alert('Firebase authentication is not configured. Please set up your Firebase credentials in .env.local')
      return
    }

    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Sign in successful:', result.user.displayName)
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error)
      
      // Handle specific errors
      if (error.code === 'auth/unauthorized-domain') {
        alert('Error: This domain is not authorized. Please add localhost to Firebase Console:\n\n1. Go to Firebase Console\n2. Authentication > Settings\n3. Authorized domains\n4. Add: localhost')
      } else if (error.code === 'auth/popup-blocked') {
        alert('Popup was blocked by your browser. Please allow popups for this site.')
      } else if (error.code === 'auth/popup-closed-by-user') {
        // User closed popup, no need to show error
        console.log('User closed the popup')
      } else {
        alert(`Authentication error: ${error.message}`)
      }
    }
  }

  const signOut = async () => {
    if (!isFirebaseConfigured || !auth) {
      return
    }

    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isConfigured: !!isFirebaseConfigured
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
