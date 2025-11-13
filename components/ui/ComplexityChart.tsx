import { motion } from 'framer-motion'

interface ComplexityData {
  operation: string
  timeComplexity: string
  spaceComplexity: string
  description: string
  color: string
}

interface ComplexityChartProps {
  title: string
  data: ComplexityData[]
}

export default function ComplexityChart({ title, data }: ComplexityChartProps) {
  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('O(1)')) return 'text-green-400'
    if (complexity.includes('O(log n)')) return 'text-blue-400'
    if (complexity.includes('O(n)')) return 'text-yellow-400'
    if (complexity.includes('O(n²)') || complexity.includes('O(n^2)')) return 'text-orange-400'
    if (complexity.includes('O(2^n)')) return 'text-red-400'
    return 'text-gray-400'
  }

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-3 px-2">Operation</th>
              <th className="text-left py-3 px-2">Time</th>
              <th className="text-left py-3 px-2">Space</th>
              <th className="text-left py-3 px-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                key={index}
                className="border-b border-gray-700 hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-3 px-2">
                  <span className={`font-semibold ${item.color}`}>
                    {item.operation}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={getComplexityColor(item.timeComplexity)}>
                    {item.timeComplexity}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={getComplexityColor(item.spaceComplexity)}>
                    {item.spaceComplexity}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-300">
                  {item.description}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Complexity Legend */}
      <div className="mt-4 pt-4 border-t border-gray-600">
        <h4 className="text-sm font-semibold mb-2">Complexity Guide:</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>O(1) - Excellent</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>O(log n) - Good</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>O(n) - Fair</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span>O(n²) - Poor</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span>O(2^n) - Terrible</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}