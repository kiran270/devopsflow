import { motion } from 'framer-motion'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function Custom404() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            404
          </motion.div>
          
          <motion.h1
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Data Structure Not Found
          </motion.h1>
          
          <motion.p
            className="text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Looks like this page got lost in the algorithm! The data structure you're 
            looking for doesn't exist in our current implementation.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/">
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors">
                <Home size={20} />
                Back to Home
              </button>
            </Link>
            <Link href="/arrays">
              <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg transition-colors">
                <Search size={20} />
                Explore Arrays
              </button>
            </Link>
          </motion.div>
          
          <motion.div
            className="mt-12 glass-card p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold mb-3">Available Data Structures:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <Link href="/arrays" className="hover:text-blue-400 transition-colors">• Arrays</Link>
              <Link href="/linked-lists" className="hover:text-green-400 transition-colors">• Linked Lists</Link>
              <Link href="/stacks" className="hover:text-purple-400 transition-colors">• Stacks</Link>
              <Link href="/queues" className="hover:text-orange-400 transition-colors">• Queues</Link>
              <Link href="/trees" className="hover:text-teal-400 transition-colors">• Trees</Link>
              <Link href="/graphs" className="hover:text-pink-400 transition-colors">• Graphs</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}