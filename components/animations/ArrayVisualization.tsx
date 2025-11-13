import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ArrayVisualizationProps {
  array: number[]
  highlightIndex?: number
  operation?: string
}

export default function ArrayVisualization({ 
  array, 
  highlightIndex = -1, 
  operation = '' 
}: ArrayVisualizationProps) {
  const [animatingIndex, setAnimatingIndex] = useState(-1)

  useEffect(() => {
    if (highlightIndex >= 0) {
      setAnimatingIndex(highlightIndex)
      const timer = setTimeout(() => setAnimatingIndex(-1), 1000)
      return () => clearTimeout(timer)
    }
  }, [highlightIndex])

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full">
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex gap-2 items-center min-w-max">
          <AnimatePresence>
            {array.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                className={`array-cell ${
                  index === highlightIndex 
                    ? 'bg-yellow-500/40 border-yellow-400 scale-110' 
                    : 'bg-blue-500/20 border-blue-400'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: index === animatingIndex ? [1, 1.2, 1] : 1, 
                  opacity: 1 
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 1.2,
                  scale: { duration: 1.5, times: [0, 0.5, 1] }
                }}
                whileHover={{ scale: 1.1 }}
              >
                {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 text-sm text-gray-400 min-w-max">
          {array.map((_, index) => (
            <div key={index} className="w-16 text-center">
              [{index}]
            </div>
          ))}
        </div>
      </div>
      
      {operation && (
        <motion.div
          className="glass-card px-4 py-2 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-blue-400 font-semibold">Operation: </span>
          {operation}
        </motion.div>
      )}
    </div>
  )
}