import { motion, AnimatePresence } from 'framer-motion'

interface StackVisualizationProps {
  stack: number[]
  operation?: 'push' | 'pop' | null
  newElement?: number
}

export default function StackVisualization({ 
  stack, 
  operation = null, 
  newElement 
}: StackVisualizationProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full">
      <div className="text-base sm:text-lg font-semibold">
        Stack (LIFO - Last In, First Out)
      </div>
      
      <div className="relative max-h-[400px] overflow-y-auto custom-scrollbar">
        {/* Stack Base */}
        <div className="w-20 h-4 bg-gray-600 rounded-b-lg"></div>
        
        {/* Stack Elements */}
        <div className="flex flex-col-reverse gap-1">
          <AnimatePresence>
            {stack.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                className={`data-node bg-gradient-to-r from-purple-500 to-pink-500 ${
                  index === stack.length - 1 ? 'ring-2 ring-yellow-400' : ''
                }`}
                initial={{ 
                  scale: 0, 
                  y: operation === 'push' ? -50 : 0,
                  opacity: 0 
                }}
                animate={{ 
                  scale: 1, 
                  y: 0, 
                  opacity: 1 
                }}
                exit={{ 
                  scale: 0, 
                  y: operation === 'pop' ? -50 : 0, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: 1.0,
                  type: "spring",
                  stiffness: 200,
                  damping: 25
                }}
                whileHover={{ scale: 1.1 }}
              >
                {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Top Indicator */}
        <motion.div
          className="absolute -right-16 top-0 flex items-center gap-2 text-yellow-400"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span>← TOP</span>
        </motion.div>
      </div>
      
      {operation && (
        <motion.div
          className="glass-card px-4 py-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-purple-400 font-semibold">
            {operation === 'push' ? `Push ${newElement}` : 'Pop'}
          </span>
        </motion.div>
      )}
    </div>
  )
}