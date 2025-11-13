import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Node {
  value: number
  id: string
}

interface LinkedListVisualizationProps {
  nodes: Node[]
  highlightIndex?: number
  operation?: string
}

export default function LinkedListVisualization({ 
  nodes, 
  highlightIndex = -1, 
  operation = '' 
}: LinkedListVisualizationProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full">
      <div className="text-base sm:text-lg font-semibold">
        Linked List (Dynamic Linear Structure)
      </div>
      
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex items-center gap-4 min-w-max">
          <AnimatePresence>
            {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="flex items-center gap-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Node */}
              <motion.div
                className={`relative flex items-center ${
                  index === highlightIndex 
                    ? 'ring-2 ring-yellow-400' 
                    : ''
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {/* Data part */}
                <div className={`w-16 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-l-lg flex items-center justify-center font-bold text-white ${
                  index === highlightIndex ? 'bg-yellow-500' : ''
                }`}>
                  {node.value}
                </div>
                
                {/* Pointer part */}
                <div className={`w-8 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-r-lg flex items-center justify-center ${
                  index === highlightIndex ? 'bg-yellow-600' : ''
                }`}>
                  {index < nodes.length - 1 ? (
                    <ArrowRight size={14} className="text-white" />
                  ) : (
                    <span className="text-white text-xs">∅</span>
                  )}
                </div>
              </motion.div>
              
              {/* Arrow between nodes */}
              {index < nodes.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: (index + 1) * 0.1 + 0.3 }}
                  className="w-8 h-0.5 bg-gray-400"
                />
              )}
            </motion.div>
            ))}
          </AnimatePresence>
          
          {nodes.length === 0 && (
            <motion.div
              className="text-gray-400 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Empty List
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Head pointer */}
      {nodes.length > 0 && (
        <motion.div
          className="flex items-center gap-2 text-green-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>HEAD</span>
          <ArrowRight size={16} />
        </motion.div>
      )}
      
      {operation && (
        <motion.div
          className="glass-card px-4 py-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-green-400 font-semibold">
            {operation}
          </span>
        </motion.div>
      )}
    </div>
  )
}