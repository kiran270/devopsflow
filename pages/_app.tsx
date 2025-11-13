import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '../contexts/AuthContext'
import ProtectedRoute from '../components/auth/ProtectedRoute'

export default function App({ Component, pageProps, router }: AppProps) {
  // Public routes that don't require authentication
  const publicRoutes = ['/login']
  const isPublicRoute = publicRoutes.includes(router.pathname)

  return (
    <AuthProvider>
      <AnimatePresence mode="wait" initial={false}>
        {isPublicRoute ? (
          <Component {...pageProps} key={router.asPath} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} key={router.asPath} />
          </ProtectedRoute>
        )}
      </AnimatePresence>
    </AuthProvider>
  )
}