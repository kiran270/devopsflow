import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isConfigured } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If Firebase is not configured, allow access (development mode)
    if (!isConfigured) {
      return
    }

    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router, isConfigured])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  // If Firebase not configured, show content (development mode)
  if (!isConfigured) {
    return <>{children}</>
  }

  // If no user, show nothing (will redirect)
  if (!user) {
    return null
  }

  // User is authenticated, show content
  return <>{children}</>
}
