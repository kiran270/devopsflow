import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Play, Code, Zap } from 'lucide-react'
import Layout from '../components/layout/Layout'

const dataStructuresCourse = [
  {
    name: 'Arrays',
    description: 'Learn about linear data structures with indexed access',
    icon: '📊',
    path: '/arrays',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Linked Lists',
    description: 'Understand dynamic linear structures with pointers',
    icon: '🔗',
    path: '/linked-lists',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Stacks',
    description: 'Master LIFO (Last In, First Out) operations',
    icon: '📚',
    path: '/stacks',
    color: 'from-purple-500 to-violet-500'
  },
  {
    name: 'Queues',
    description: 'Explore FIFO (First In, First Out) operations',
    icon: '🚶‍♂️',
    path: '/queues',
    color: 'from-orange-500 to-red-500'
  }
]

const otherCourses = [
  {
    name: 'Coding Problems',
    description: 'Solve algorithmic problems step-by-step',
    icon: '🧮',
    path: '/algorithms',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Sorting Algorithms',
    description: 'Watch sorting algorithms in animated action',
    icon: '📈',
    path: '/sorting',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'Python',
    description: 'Master Python programming from basics to advanced',
    icon: '🐍',
    path: '/python',
    color: 'from-blue-500 to-yellow-500'
  },
  {
    name: 'Linux',
    description: 'Learn Linux command line and system administration',
    icon: '🐧',
    path: '/linux',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Git Tutorial',
    description: 'Learn Git version control with interactive animations',
    icon: '🔀',
    path: '/git',
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Docker',
    description: 'Master containerization with real-world use cases',
    icon: '🐳',
    path: '/docker',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Jenkins CI/CD',
    description: 'Learn continuous integration and deployment pipelines',
    icon: '🚀',
    path: '/jenkins',
    color: 'from-red-500 to-orange-500'
  },
  {
    name: 'Kubernetes',
    description: 'Learn container orchestration and cloud-native deployments',
    icon: '☸️',
    path: '/kubernetes',
    color: 'from-blue-500 to-purple-500'
  },
  {
    name: 'AWS',
    description: 'Master Amazon Web Services with practical examples',
    icon: '☁️',
    path: '/aws',
    color: 'from-orange-500 to-yellow-500'
  }
]

export default function Home() {
  return (
    <Layout>
      <div className="h-[calc(100vh-80px)] flex flex-col">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex-1 flex flex-col min-h-0">
          {/* Hero Section */}
          <motion.section 
            className="text-center py-2 sm:py-3 px-2 flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              DevOpsFlow ⚡
            </motion.h1>
            <motion.p 
              className="text-xs sm:text-sm text-gray-300 mb-3 max-w-2xl mx-auto px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Master DevOps, CI/CD, and Data Structures through interactive visualizations
            </motion.p>
          </motion.section>

          {/* Main Content */}
          <motion.section 
            className="px-2 flex-1 min-h-0 overflow-y-auto custom-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {/* Data Structures Course */}
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Data Structures Course
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {dataStructuresCourse.map((ds, index) => (
                  <motion.div
                    key={ds.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={ds.path}>
                      <div className={`glass-card p-2 sm:p-3 cursor-pointer group hover:bg-gradient-to-br ${ds.color} hover:bg-opacity-20 transition-all duration-300 h-full flex flex-col`}>
                        <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{ds.icon}</div>
                        <h3 className="text-sm sm:text-base font-bold mb-1 group-hover:text-white transition-colors">{ds.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-300 group-hover:text-gray-100 transition-colors line-clamp-2">{ds.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Other Courses */}
            <div className="pb-4">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Other Courses
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {otherCourses.map((course, index) => (
                  <motion.div
                    key={course.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={course.path}>
                      <div className={`glass-card p-2 sm:p-3 cursor-pointer group hover:bg-gradient-to-br ${course.color} hover:bg-opacity-20 transition-all duration-300 h-full flex flex-col`}>
                        <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{course.icon}</div>
                        <h3 className="text-sm sm:text-base font-bold mb-1 group-hover:text-white transition-colors">{course.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-300 group-hover:text-gray-100 transition-colors line-clamp-2">{course.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  )
}