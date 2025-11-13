import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Home, Github, Menu, X, LogIn, LogOut, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signInWithGoogle, signOut, isConfigured } = useAuth()
  const router = useRouter()

  const handleAuth = async () => {
    try {
      if (user) {
        await signOut()
        // Redirect to login page after sign out
        router.push('/login')
      } else {
        // This shouldn't happen as unauthenticated users are redirected to login
        router.push('/login')
      }
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        className="glass-card p-3 sm:p-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold">
            <span className="text-xl sm:text-2xl">⚡</span>
            <span className="hidden xs:inline">DevOpsFlow</span>
            <span className="xs:hidden">DOF</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <Home size={18} />
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">
              About
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Github size={18} />
              GitHub
            </a>
            
            {/* Auth Button - Only show if Firebase is configured */}
            {isConfigured && (
              <button
                onClick={handleAuth}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-sm"
              >
                {user ? (
                  <>
                    <User size={16} />
                    <span className="hidden lg:inline">{user.displayName?.split(' ')[0]}</span>
                    <LogOut size={16} />
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            )}
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/20">
                <Link 
                  href="/" 
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home size={18} />
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Github size={18} />
                  GitHub
                </a>
                
                {/* Mobile Auth Button - Only show if Firebase is configured */}
                {isConfigured && (
                  <button
                    onClick={() => {
                      handleAuth()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-sm"
                  >
                    {user ? (
                      <>
                        <User size={18} />
                        <span>{user.displayName}</span>
                        <LogOut size={18} />
                      </>
                    ) : (
                      <>
                        <LogIn size={18} />
                        <span>Sign In with Google</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}