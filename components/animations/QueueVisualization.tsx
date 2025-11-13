import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface QueueVisualizationProps {
  queue: number[]
  operation?: 'enqueue' | 'dequeue' | null
  newElement?: number
}

export default function QueueVisualization({ 
  queue, 
  operation = null, 
  newElement 
}: QueueVisualizationProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full">
      <div className="text-base sm:text-lg font-semibold">
        Queue (FIFO - First In, First Out)
      </div>
      
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex flex-col gap-4 min-w-max">
          {/* Queue visualization */}
          <div className="flex items-center gap-2">
            {/* Front indicator */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-orange-400 text-sm font-semibold">FRONT</span>
              <ArrowRight className="text-orange-400" size={20} />
            </div>
            
            {/* Queue elements */}
            <div className="flex gap-1 min-w-[200px] justify-start">
              <AnimatePresence mode="popLayout">
                {queue.map((value, index) => (
                  <motion.div
                    key={`${index}-${value}`}
                    className={`data-node bg-gradient-to-r from-orange-500 to-red-500 ${
                      index === 0 ? 'ring-2 ring-orange-400' : ''
                    } ${index === queue.length - 1 ? 'ring-2 ring-red-400' : ''}`}
                    initial={{ 
                      scale: 0, 
                      x: operation === 'enqueue' ? 50 : 0,
                      opacity: 0 
                    }}
                    animate={{ 
                      scale: 1, 
                      x: 0, 
                      opacity: 1 
                    }}
                    exit={{ 
                      scale: 0, 
                      x: operation === 'dequeue' ? -50 : 0, 
                      opacity: 0 
                    }}
                    transition={{ 
                      duration: 1.2,
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
              
              {queue.length === 0 && (
                <div className="data-node bg-gray-600 opacity-50 border-2 border-dashed border-gray-400">
                  Empty
                </div>
              )}
            </div>
            
            {/* Rear indicator */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-red-400 text-sm font-semibold">REAR</span>
              <ArrowRight className="text-red-400 rotate-180" size={20} />
            </div>
          </div>
          
          {/* Operation labels */}
          <div className="flex justify-between text-sm text-gray-400 px-12">
            <span>← Dequeue (Remove)</span>
            <span>Enqueue (Add) →</span>
          </div>
        </div>
      </div>
      
      {operation && (
        <motion.div
          className="glass-card px-4 py-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-orange-400 font-semibold">
            {operation === 'enqueue' ? `Enqueue ${newElement}` : 'Dequeue'}
          </span>
        </motion.div>
      )}
    </div>
  )
}