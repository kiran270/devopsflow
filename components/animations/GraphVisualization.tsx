import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GraphNode {
  id: string
  value: number
  x: number
  y: number
}

interface GraphEdge {
  from: string
  to: string
  weight?: number
}

interface GraphVisualizationProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  highlightNode?: string
  highlightPath?: string[]
  operation?: string
  isDirected?: boolean
}

export default function GraphVisualization({ 
  nodes, 
  edges, 
  highlightNode = '', 
  highlightPath = [],
  operation = '',
  isDirected = false
}: GraphVisualizationProps) {
  const [draggedNode, setDraggedNode] = useState<string | null>(null)

  const isNodeHighlighted = (nodeId: string) => {
    return highlightNode === nodeId || highlightPath.includes(nodeId)
  }

  const isEdgeHighlighted = (edge: GraphEdge) => {
    const fromIndex = highlightPath.indexOf(edge.from)
    const toIndex = highlightPath.indexOf(edge.to)
    return fromIndex !== -1 && toIndex !== -1 && Math.abs(fromIndex - toIndex) === 1
  }

  const renderArrowhead = (x1: number, y1: number, x2: number, y2: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const arrowLength = 10
    const arrowAngle = Math.PI / 6

    const arrowX1 = x2 - arrowLength * Math.cos(angle - arrowAngle)
    const arrowY1 = y2 - arrowLength * Math.sin(angle - arrowAngle)
    const arrowX2 = x2 - arrowLength * Math.cos(angle + arrowAngle)
    const arrowY2 = y2 - arrowLength * Math.sin(angle + arrowAngle)

    return (
      <polygon
        points={`${x2},${y2} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill="#64748b"
        className="pointer-events-none"
      />
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="text-lg font-semibold mb-4">
        {isDirected ? 'Directed Graph' : 'Undirected Graph'}
      </div>
      
      <div className="relative w-full h-96 overflow-hidden">
        {nodes.length > 0 ? (
          <svg width="100%" height="100%" className="border border-gray-600 rounded-lg bg-gray-900/20">
            {/* Render edges */}
            <AnimatePresence>
              {edges.map((edge, index) => {
                const fromNode = nodes.find(n => n.id === edge.from)
                const toNode = nodes.find(n => n.id === edge.to)
                
                if (!fromNode || !toNode) return null

                const isHighlighted = isEdgeHighlighted(edge)
                
                return (
                  <motion.g key={`${edge.from}-${edge.to}-${index}`}>
                    <motion.line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isHighlighted ? '#fbbf24' : '#64748b'}
                      strokeWidth={isHighlighted ? '3' : '2'}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                    
                    {isDirected && renderArrowhead(fromNode.x, fromNode.y, toNode.x, toNode.y)}
                    
                    {edge.weight && (
                      <motion.text
                        x={(fromNode.x + toNode.x) / 2}
                        y={(fromNode.y + toNode.y) / 2 - 10}
                        textAnchor="middle"
                        className="fill-gray-300 text-xs font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {edge.weight}
                      </motion.text>
                    )}
                  </motion.g>
                )
              })}
            </AnimatePresence>
            
            {/* Render nodes */}
            <AnimatePresence>
              {nodes.map((node, index) => (
                <motion.g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="25"
                    className={`${
                      isNodeHighlighted(node.id)
                        ? 'fill-yellow-500 stroke-yellow-400' 
                        : 'fill-pink-500 stroke-pink-400'
                    } stroke-2 cursor-pointer`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <motion.text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className="fill-white font-bold text-sm pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {node.value}
                  </motion.text>
                </motion.g>
              ))}
            </AnimatePresence>
          </svg>
        ) : (
          <motion.div
            className="flex items-center justify-center h-full text-gray-400 text-lg border border-gray-600 rounded-lg bg-gray-900/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Empty Graph
          </motion.div>
        )}
      </div>
      
      {operation && (
        <motion.div
          className="glass-card px-4 py-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-pink-400 font-semibold">
            {operation}
          </span>
        </motion.div>
      )}
    </div>
  )
}