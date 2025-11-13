import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TreeNode {
  value: number
  id: string
  left?: TreeNode
  right?: TreeNode
}

interface TreeVisualizationProps {
  root: TreeNode | null
  highlightNode?: string
  operation?: string
}

interface NodePosition {
  x: number
  y: number
  node: TreeNode
}

export default function TreeVisualization({ 
  root, 
  highlightNode = '', 
  operation = '' 
}: TreeVisualizationProps) {
  const [positions, setPositions] = useState<NodePosition[]>([])
  const [dimensions, setDimensions] = useState({ width: 400, height: 300, scale: 1 })

  const getTreeDepth = (node: TreeNode | null): number => {
    if (!node) return 0
    return 1 + Math.max(getTreeDepth(node.left || null), getTreeDepth(node.right || null))
  }

  const calculatePositions = (node: TreeNode | null, x: number, y: number, spacing: number): NodePosition[] => {
    if (!node) return []
    
    const positions: NodePosition[] = [{ x, y, node }]
    
    if (node.left) {
      positions.push(...calculatePositions(node.left, x - spacing, y + 80, spacing / 2))
    }
    
    if (node.right) {
      positions.push(...calculatePositions(node.right, x + spacing, y + 80, spacing / 2))
    }
    
    return positions
  }

  useEffect(() => {
    if (root) {
      const depth = getTreeDepth(root)
      
      // Adjust spacing based on depth - more compact for deeper trees
      let baseSpacing = 80
      if (depth <= 3) baseSpacing = 120
      else if (depth === 4) baseSpacing = 80
      else if (depth === 5) baseSpacing = 50
      else baseSpacing = 35
      
      const initialSpacing = baseSpacing * Math.pow(2, Math.max(0, depth - 3))
      
      // Calculate dimensions
      const width = Math.max(600, initialSpacing * 3)
      const height = depth * 90 + 80
      
      const centerX = width / 2
      const newPositions = calculatePositions(root, centerX, 40, initialSpacing)
      
      setPositions(newPositions)
      setDimensions({ width, height, scale: 1 })
    } else {
      setPositions([])
      setDimensions({ width: 600, height: 300, scale: 1 })
    }
  }, [root])

  const renderConnections = () => {
    const connections: JSX.Element[] = []
    
    positions.forEach(({ x, y, node }) => {
      if (node.left) {
        const leftPos = positions.find(p => p.node.id === node.left!.id)
        if (leftPos) {
          connections.push(
            <motion.line
              key={`${node.id}-left`}
              x1={x}
              y1={y + 20}
              x2={leftPos.x}
              y2={leftPos.y + 20}
              stroke="#64748b"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          )
        }
      }
      
      if (node.right) {
        const rightPos = positions.find(p => p.node.id === node.right!.id)
        if (rightPos) {
          connections.push(
            <motion.line
              key={`${node.id}-right`}
              x1={x}
              y1={y + 20}
              x2={rightPos.x}
              y2={rightPos.y + 20}
              stroke="#64748b"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          )
        }
      }
    })
    
    return connections
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="text-lg font-semibold mb-4">
        Binary Search Tree
      </div>
      
      <div className="relative w-full h-96 overflow-auto custom-scrollbar bg-white/5 rounded-lg">
        {positions.length > 0 ? (
          <div className="inline-block min-w-full p-4">
            <svg 
              width={dimensions.width} 
              height={dimensions.height}
              className="mx-auto"
              style={{ minWidth: '100%' }}
            >
              {renderConnections()}
              <AnimatePresence>
                {positions.map(({ x, y, node }) => (
                  <motion.g key={node.id}>
                    <motion.circle
                      cx={x}
                      cy={y + 20}
                      r="20"
                      className={`${
                        highlightNode === node.id 
                          ? 'fill-yellow-500 stroke-yellow-400' 
                          : 'fill-teal-500 stroke-teal-400'
                      } stroke-2`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <motion.text
                      x={x}
                      y={y + 25}
                      textAnchor="middle"
                      className="fill-white font-bold text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {node.value}
                    </motion.text>
                  </motion.g>
                ))}
              </AnimatePresence>
            </svg>
          </div>
        ) : (
          <motion.div
            className="flex items-center justify-center h-full text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Empty Tree
          </motion.div>
        )}
      </div>
      
      {operation && (
        <motion.div
          className="glass-card px-4 py-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-teal-400 font-semibold">
            {operation}
          </span>
        </motion.div>
      )}
    </div>
  )
}