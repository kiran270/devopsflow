import { NextPageContext } from 'next'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

interface ErrorProps {
  statusCode: number
  hasGetInitialPropsRun?: boolean
  err?: Error
}

function Error({ statusCode }: ErrorProps) {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-red-400 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <AlertTriangle size={64} className="mx-auto" />
          </motion.div>
          
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong'}
          </motion.h1>
          
          <motion.p
            className="text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {statusCode === 404
              ? "The page you're looking for doesn't exist."
              : `A ${statusCode} error occurred on the server.`}
          </motion.p>
          
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors"
            >
              <Home size={20} />
              Go Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors"
            >
              <RefreshCw size={20} />
              Refresh
            </button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error