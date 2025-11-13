import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { BookOpen, Code, Users, Zap, Heart, Github } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Interactive Learning",
      description: "Learn through hands-on interaction with real-time visualizations that respond to your actions."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Multiple Algorithms",
      description: "Explore various data structures and sorting algorithms with step-by-step animations."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Educational Content",
      description: "Comprehensive explanations of time complexity, use cases, and best practices."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "For Everyone",
      description: "Perfect for students, educators, and professionals looking to understand data structures."
    }
  ]

  const technologies = [
    { name: "Next.js 14", description: "React framework for production" },
    { name: "TypeScript", description: "Type-safe JavaScript" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "Framer Motion", description: "Production-ready motion library" },
    { name: "Lucide React", description: "Beautiful & consistent icons" }
  ]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About DevOpsFlow
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-2">
            An interactive learning platform designed to master DevOps, CI/CD, containerization, 
            and data structures through beautiful animations and real-world examples.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="glass-card p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            <h2 className="text-xl sm:text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
            We believe that learning DevOps, CI/CD pipelines, and data structures should be engaging, 
            interactive, and visual. Traditional textbook approaches can be dry and difficult 
            to understand. Our platform bridges that gap by providing animated visualizations 
            and production-ready code examples that make abstract concepts tangible and easy to grasp.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Why Choose DevOpsFlow?</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-4 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-blue-400 mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          className="glass-card p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-green-400">Data Structures</h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li>• Arrays and their operations</li>
                <li>• Linked Lists (Singly, Doubly)</li>
                <li>• Stacks and their applications</li>
                <li>• Queues and variations</li>
                <li>• Binary Search Trees</li>
                <li>• Graphs and traversal algorithms</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-purple-400">Algorithms</h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li>• Sorting algorithms (Bubble, Selection, Insertion, Quick)</li>
                <li>• Search algorithms (Linear, Binary)</li>
                <li>• Tree traversals (Inorder, Preorder, Postorder)</li>
                <li>• Graph algorithms (BFS, DFS)</li>
                <li>• Time and space complexity analysis</li>
                <li>• Best practices and optimization</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          className="glass-card p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Built With Modern Technology</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="glass-card p-3 sm:p-4 bg-white/5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold text-blue-400 mb-1 text-sm sm:text-base">{tech.name}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Source */}
        <motion.div
          className="glass-card p-4 sm:p-6 md:p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Github className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Open Source & Free</h2>
          <p className="text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base px-2">
            DevOpsFlow is completely free and open source. We believe in making quality 
            education accessible to everyone. Feel free to contribute, suggest improvements, 
            or use this project for your own learning journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              <Github size={20} />
              View on GitHub
            </a>
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <Heart size={20} />
              Support Project
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}