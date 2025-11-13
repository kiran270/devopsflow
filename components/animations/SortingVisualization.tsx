import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface SortingVisualizationProps {
  array: number[]
  comparing?: number[]
  swapping?: number[]
  sorted?: number[]
  algorithm?: string
  isAnimating?: boolean
}

export default function SortingVisualization({ 
  array, 
  comparing = [], 
  swapping = [], 
  sorted = [],
  algorithm = '',
  isAnimating = false
}: SortingVisualizationProps) {
  const maxValue = Math.max(...array, 1)
  
  const getBarColor = (index: number, value: number) => {
    if (sorted.includes(index)) return 'bg-green-500'
    if (swapping.includes(index)) return 'bg-red-500'
    if (comparing.includes(index)) return 'bg-yellow-500'
    return 'bg-blue-500'
  }

  const getBarHeight = (value: number) => {
    return (value / maxValue) * 200 + 20
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full">
      <div className="text-base sm:text-lg font-semibold">
        {algorithm} Sorting Algorithm
      </div>
      
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex items-end gap-1 h-64 min-w-max px-4">
          <AnimatePresence>
            {array.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                className={`${getBarColor(index, value)} rounded-t-lg flex items-end justify-center text-white text-xs font-bold min-w-[30px] relative`}
                style={{ 
                  height: getBarHeight(value),
                  width: Math.max(400 / array.length, 30)
                }}
                initial={{ scaleY: 0 }}
                animate={{ 
                  scaleY: 1,
                  height: getBarHeight(value)
                }}
                transition={{ 
                  duration: isAnimating ? 0.8 : 1.0,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="absolute bottom-1">{value}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Sorted</span>
        </div>
      </div>
    </div>
  )
}