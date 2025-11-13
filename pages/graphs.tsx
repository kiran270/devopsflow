import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import GraphVisualization from '../components/animations/GraphVisualization'
import { Plus, Minus, Search, RotateCcw, Network, Route } from 'lucide-react'

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

export default function Graphs() {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: '1', value: 1, x: 100, y: 100 },
    { id: '2', value: 2, x: 200, y: 80 },
    { id: '3', value: 3, x: 300, y: 120 },
    { id: '4', value: 4, x: 150, y: 200 },
    { id: '5', value: 5, x: 250, y: 220 }
  ])
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: '1', to: '2', weight: 5 },
    { from: '1', to: '4', weight: 3 },
    { from: '2', to: '3', weight: 2 },
    { from: '2', to: '5', weight: 4 },
    { from: '3', to: '5', weight: 1 },
    { from: '4', to: '5', weight: 6 }
  ])
  const [highlightNode, setHighlightNode] = useState('')
  const [highlightPath, setHighlightPath] = useState<string[]>([])
  const [operation, setOperation] = useState('')
  const [isDirected, setIsDirected] = useState(false)
  const [nodeValue, setNodeValue] = useState('')
  const [edgeFrom, setEdgeFrom] = useState('')
  const [edgeTo, setEdgeTo] = useState('')
  const [edgeWeight, setEdgeWeight] = useState('')

  const generateRandomPosition = () => ({
    x: Math.random() * 300 + 50,
    y: Math.random() * 200 + 50
  })

  const handleAddNode = () => {
    if (nodeValue && !isNaN(Number(nodeValue))) {
      const value = Number(nodeValue)
      const id = value.toString()

      if (nodes.find(n => n.id === id)) {
        setOperation(`Node ${value} already exists`)
        return
      }

      const position = generateRandomPosition()
      const newNode: GraphNode = {
        id,
        value,
        ...position
      }

      setNodes([...nodes, newNode])
      setOperation(`Added node ${value}`)
      setHighlightNode(id)
      setNodeValue('')
    }
  }

  const handleRemoveNode = () => {
    if (nodeValue && !isNaN(Number(nodeValue))) {
      const value = Number(nodeValue)
      const id = value.toString()

      const nodeExists = nodes.find(n => n.id === id)
      if (!nodeExists) {
        setOperation(`Node ${value} not found`)
        return
      }

      setNodes(nodes.filter(n => n.id !== id))
      setEdges(edges.filter(e => e.from !== id && e.to !== id))
      setOperation(`Removed node ${value}`)
      setHighlightNode('')
      setNodeValue('')
    }
  }

  const handleAddEdge = () => {
    if (edgeFrom && edgeTo && !isNaN(Number(edgeFrom)) && !isNaN(Number(edgeTo))) {
      const fromId = edgeFrom
      const toId = edgeTo
      const weight = edgeWeight ? Number(edgeWeight) : undefined

      const fromExists = nodes.find(n => n.id === fromId)
      const toExists = nodes.find(n => n.id === toId)

      if (!fromExists || !toExists) {
        setOperation('Both nodes must exist')
        return
      }

      const edgeExists = edges.find(e =>
        (e.from === fromId && e.to === toId) ||
        (!isDirected && e.from === toId && e.to === fromId)
      )

      if (edgeExists) {
        setOperation('Edge already exists')
        return
      }

      const newEdge: GraphEdge = { from: fromId, to: toId, weight }
      setEdges([...edges, newEdge])
      setOperation(`Added edge ${fromId} → ${toId}${weight ? ` (weight: ${weight})` : ''}`)
      setEdgeFrom('')
      setEdgeTo('')
      setEdgeWeight('')
    }
  }

  const handleRemoveEdge = () => {
    if (edgeFrom && edgeTo) {
      const fromId = edgeFrom
      const toId = edgeTo

      const edgeIndex = edges.findIndex(e =>
        (e.from === fromId && e.to === toId) ||
        (!isDirected && e.from === toId && e.to === fromId)
      )

      if (edgeIndex === -1) {
        setOperation('Edge not found')
        return
      }

      setEdges(edges.filter((_, i) => i !== edgeIndex))
      setOperation(`Removed edge ${fromId} → ${toId}`)
      setEdgeFrom('')
      setEdgeTo('')
    }
  }

  const bfs = (startId: string, targetId: string): string[] => {
    const visited = new Set<string>()
    const queue: { id: string, path: string[] }[] = [{ id: startId, path: [startId] }]

    while (queue.length > 0) {
      const { id, path } = queue.shift()!

      if (visited.has(id)) continue
      visited.add(id)

      if (id === targetId) {
        return path
      }

      const neighbors = edges
        .filter(e => e.from === id || (!isDirected && e.to === id))
        .map(e => e.from === id ? e.to : e.from)

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push({ id: neighbor, path: [...path, neighbor] })
        }
      }
    }

    return []
  }

  const handleFindPath = () => {
    if (edgeFrom && edgeTo) {
      const path = bfs(edgeFrom, edgeTo)
      if (path.length > 0) {
        setHighlightPath(path)
        setOperation(`Path found: ${path.join(' → ')}`)
      } else {
        setHighlightPath([])
        setOperation(`No path from ${edgeFrom} to ${edgeTo}`)
      }
    }
  }

  const reset = () => {
    setNodes([
      { id: '1', value: 1, x: 100, y: 100 },
      { id: '2', value: 2, x: 200, y: 80 },
      { id: '3', value: 3, x: 300, y: 120 },
      { id: '4', value: 4, x: 150, y: 200 },
      { id: '5', value: 5, x: 250, y: 220 }
    ])
    setEdges([
      { from: '1', to: '2', weight: 5 },
      { from: '1', to: '4', weight: 3 },
      { from: '2', to: '3', weight: 2 },
      { from: '2', to: '5', weight: 4 },
      { from: '3', to: '5', weight: 1 },
      { from: '4', to: '5', weight: 6 }
    ])
    setHighlightNode('')
    setHighlightPath([])
    setOperation('')
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            Graphs
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Network structures with nodes and edges
          </p>
        </motion.div>

        {/* Operations Bar */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 items-center">
              <input
                type="number"
                value={nodeValue}
                onChange={(e) => setNodeValue(e.target.value)}
                placeholder="Node"
                className="w-20 px-2 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
              />
              <button
                onClick={handleAddNode}
                disabled={!nodeValue}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 px-2 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap"
              >
                <Plus size={12} />
                Add Node
              </button>
              <button
                onClick={handleRemoveNode}
                disabled={!nodeValue}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 px-2 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap"
              >
                <Minus size={12} />
                Remove
              </button>
              <div className="h-4 w-px bg-white/20"></div>
              <input
                type="number"
                value={edgeFrom}
                onChange={(e) => setEdgeFrom(e.target.value)}
                placeholder="From"
                className="w-16 px-2 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
              />
              <input
                type="number"
                value={edgeTo}
                onChange={(e) => setEdgeTo(e.target.value)}
                placeholder="To"
                className="w-16 px-2 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
              />
              <button
                onClick={handleAddEdge}
                disabled={!edgeFrom || !edgeTo}
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-2 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap"
              >
                <Plus size={12} />
                Edge
              </button>
              <button
                onClick={handleFindPath}
                disabled={!edgeFrom || !edgeTo}
                className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 px-2 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap"
              >
                <Search size={12} />
                Path
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 px-2 py-1.5 rounded-lg transition-colors text-xs"
              >
                <RotateCcw size={12} />
              </button>
              <button
                onClick={() => setIsDirected(!isDirected)}
                className={`px-2 py-1.5 rounded text-xs transition-colors ${isDirected ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-600 hover:bg-gray-700'}`}
              >
                {isDirected ? 'Directed' : 'Undirected'}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-3 flex-1 min-h-0">
          {/* Visualization */}
          <motion.div
            className="glass-card p-4 sm:p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Visualization</h2>
              <button
                onClick={() => setIsDirected(!isDirected)}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors ${isDirected
                  ? 'bg-pink-500 hover:bg-pink-600'
                  : 'bg-gray-600 hover:bg-gray-700'
                  }`}
              >
                {isDirected ? 'Directed' : 'Undirected'}
              </button>
            </div>
            <GraphVisualization
              nodes={nodes}
              edges={edges}
              highlightNode={highlightNode}
              highlightPath={highlightPath}
              operation={operation}
              isDirected={isDirected}
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            className="glass-card p-4 sm:p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Operations</h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Node Operations */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <Network size={18} />
                  Node Operations
                </h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="number"
                    value={nodeValue}
                    onChange={(e) => setNodeValue(e.target.value)}
                    placeholder="Node value"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm sm:text-base"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddNode}
                      disabled={!nodeValue}
                      className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-colors flex-1 sm:flex-none text-xs sm:text-sm"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                    <button
                      onClick={handleRemoveNode}
                      disabled={!nodeValue}
                      className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-colors flex-1 sm:flex-none text-xs sm:text-sm"
                    >
                      <Minus size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Edge Operations */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <Route size={18} />
                  Edge Operations
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={edgeFrom}
                    onChange={(e) => setEdgeFrom(e.target.value)}
                    placeholder="From"
                    className="px-2 sm:px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-xs sm:text-sm"
                  />
                  <input
                    type="number"
                    value={edgeTo}
                    onChange={(e) => setEdgeTo(e.target.value)}
                    placeholder="To"
                    className="px-2 sm:px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-xs sm:text-sm"
                  />
                  <input
                    type="number"
                    value={edgeWeight}
                    onChange={(e) => setEdgeWeight(e.target.value)}
                    placeholder="Wt"
                    className="px-2 sm:px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-xs sm:text-sm"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleAddEdge}
                    disabled={!edgeFrom || !edgeTo}
                    className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-colors flex-1 text-xs sm:text-sm"
                  >
                    <Plus size={14} />
                    Add Edge
                  </button>
                  <button
                    onClick={handleRemoveEdge}
                    disabled={!edgeFrom || !edgeTo}
                    className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-colors flex-1 text-xs sm:text-sm"
                  >
                    <Minus size={14} />
                    Remove Edge
                  </button>
                </div>
                <button
                  onClick={handleFindPath}
                  disabled={!edgeFrom || !edgeTo}
                  className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-colors w-full text-xs sm:text-sm"
                >
                  <Search size={14} />
                  Find Path (BFS)
                </button>
              </div>

              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors w-full text-sm sm:text-base"
              >
                <RotateCcw size={16} />
                Reset
              </button>

              {/* Graph Info */}
              <div className="glass-card p-3 sm:p-4 bg-white/5">
                <div className="text-xs sm:text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Nodes:</span>
                    <span className="text-pink-400">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Edges:</span>
                    <span className="text-pink-400">{edges.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-pink-400">{isDirected ? 'Directed' : 'Undirected'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Theory - Collapsible */}
        <motion.details
          className="glass-card mt-3 sm:mt-4 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <summary className="cursor-pointer p-3 sm:p-4 font-semibold text-base sm:text-lg hover:bg-white/5 rounded-lg transition-colors">
            Graph Properties (Click to expand)
          </summary>
          <div className="p-3 sm:p-4 pt-0">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-pink-400">Time Complexity</h3>
                <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
                  <li>• Add Vertex: O(1)</li>
                  <li>• Add Edge: O(1)</li>
                  <li>• BFS/DFS: O(V + E)</li>
                  <li>• Find Path: O(V + E)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-400">Types</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• Directed/Undirected</li>
                  <li>• Weighted/Unweighted</li>
                  <li>• Cyclic/Acyclic</li>
                  <li>• Connected/Disconnected</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Use Cases</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• Social networks</li>
                  <li>• Route planning</li>
                  <li>• Web crawling</li>
                  <li>• Dependency resolution</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.details>
      </div>
    </Layout>
  )
}