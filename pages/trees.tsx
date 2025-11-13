import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import TreeVisualization from '../components/animations/TreeVisualization'
import { Plus, Minus, Search, RotateCcw, TreePine } from 'lucide-react'

interface TreeNode {
  value: number
  id: string
  left?: TreeNode
  right?: TreeNode
}

export default function Trees() {
  const [root, setRoot] = useState<TreeNode | null>({
    value: 10,
    id: '10',
    left: {
      value: 5,
      id: '5',
      left: { value: 3, id: '3' },
      right: { value: 7, id: '7' }
    },
    right: {
      value: 15,
      id: '15',
      left: { value: 12, id: '12' },
      right: { value: 18, id: '18' }
    }
  })
  const [highlightNode, setHighlightNode] = useState('')
  const [operation, setOperation] = useState('')
  const [inputValue, setInputValue] = useState('')

  const generateId = (value: number) => value.toString()

  const insertNode = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) {
      return { value, id: generateId(value) }
    }
    
    if (value < node.value) {
      node.left = insertNode(node.left || null, value)
    } else if (value > node.value) {
      node.right = insertNode(node.right || null, value)
    }
    
    return node
  }

  const findMin = (node: TreeNode): TreeNode => {
    while (node.left) {
      node = node.left
    }
    return node
  }

  const deleteNode = (node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) return null
    
    if (value < node.value) {
      node.left = deleteNode(node.left ?? null, value) ?? undefined
    } else if (value > node.value) {
      node.right = deleteNode(node.right ?? null, value) ?? undefined
    } else {
      // Node to delete found
      if (!node.left && !node.right) {
        return null
      } else if (!node.left) {
        return node.right || null
      } else if (!node.right) {
        return node.left
      } else {
        // Node has two children
        const minRight = findMin(node.right)
        node.value = minRight.value
        node.id = generateId(minRight.value)
        node.right = deleteNode(node.right ?? null, minRight.value) ?? undefined
      }
    }
    
    return node
  }

  const searchNode = (node: TreeNode | null, value: number): boolean => {
    if (!node) return false
    
    if (value === node.value) {
      setHighlightNode(node.id)
      return true
    }
    
    if (value < node.value) {
      return searchNode(node.left || null, value)
    } else {
      return searchNode(node.right || null, value)
    }
  }

  const handleInsert = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      const value = Number(inputValue)
      const newRoot = insertNode(root, value)
      setRoot({ ...newRoot })
      setOperation(`Insert ${value}`)
      setHighlightNode(generateId(value))
      setInputValue('')
    }
  }

  const handleDelete = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      const value = Number(inputValue)
      const newRoot = deleteNode(root, value)
      setRoot(newRoot)
      setOperation(`Delete ${value}`)
      setHighlightNode('')
      setInputValue('')
    }
  }

  const handleSearch = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      const value = Number(inputValue)
      const found = searchNode(root, value)
      setOperation(found ? `Found ${value}` : `${value} not found`)
      if (!found) setHighlightNode('')
    }
  }

  const getTreeTraversals = (node: TreeNode | null): { inorder: number[], preorder: number[], postorder: number[] } => {
    const inorder: number[] = []
    const preorder: number[] = []
    const postorder: number[] = []
    
    const inorderTraversal = (n: TreeNode | null) => {
      if (n) {
        inorderTraversal(n.left || null)
        inorder.push(n.value)
        inorderTraversal(n.right || null)
      }
    }
    
    const preorderTraversal = (n: TreeNode | null) => {
      if (n) {
        preorder.push(n.value)
        preorderTraversal(n.left || null)
        preorderTraversal(n.right || null)
      }
    }
    
    const postorderTraversal = (n: TreeNode | null) => {
      if (n) {
        postorderTraversal(n.left || null)
        postorderTraversal(n.right || null)
        postorder.push(n.value)
      }
    }
    
    inorderTraversal(node)
    preorderTraversal(node)
    postorderTraversal(node)
    
    return { inorder, preorder, postorder }
  }

  const reset = () => {
    setRoot({
      value: 10,
      id: '10',
      left: {
        value: 5,
        id: '5',
        left: { value: 3, id: '3' },
        right: { value: 7, id: '7' }
      },
      right: {
        value: 15,
        id: '15',
        left: { value: 12, id: '12' },
        right: { value: 18, id: '18' }
      }
    })
    setHighlightNode('')
    setOperation('')
  }

  const traversals = getTreeTraversals(root)

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
            Binary Search Trees
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Hierarchical data structure with ordered nodes
          </p>
        </motion.div>

        {/* Operations Bar */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 min-w-[150px] px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleInsert}
                disabled={!inputValue}
                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Plus size={14} />
                Insert
              </button>
              <button
                onClick={handleDelete}
                disabled={!inputValue}
                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Minus size={14} />
                Delete
              </button>
              <button
                onClick={handleSearch}
                disabled={!inputValue}
                className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Search size={14} />
                Search
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 bg-gray-600 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors text-sm"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-3 flex-1 min-h-0">
          <motion.div
            className="lg:col-span-2 glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">Visualization</h2>
            <div className="flex-1 min-h-0 overflow-auto">
              <TreeVisualization 
                root={root} 
                highlightNode={highlightNode}
                operation={operation}
              />
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0 flex items-center gap-2">
              <TreePine size={18} />
              Traversals
            </h2>
            <div className="flex-1 min-h-0 overflow-auto space-y-2 text-xs sm:text-sm">
              <div>
                <span className="text-teal-400 font-semibold">Inorder:</span>
                <span className="ml-2 text-gray-300">{traversals.inorder.join(', ')}</span>
              </div>
              <div>
                <span className="text-green-400 font-semibold">Preorder:</span>
                <span className="ml-2 text-gray-300">{traversals.preorder.join(', ')}</span>
              </div>
              <div>
                <span className="text-blue-400 font-semibold">Postorder:</span>
                <span className="ml-2 text-gray-300">{traversals.postorder.join(', ')}</span>
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
            Binary Search Tree Properties (Click to expand)
          </summary>
          <div className="p-3 sm:p-4 pt-0">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-teal-400">Time Complexity (Average)</h3>
              <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
                <li>• Search: O(log n)</li>
                <li>• Insert: O(log n)</li>
                <li>• Delete: O(log n)</li>
                <li>• Traversal: O(n)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-400">Properties</h3>
              <ul className="space-y-1 text-gray-300">
                <li>• Left subtree &lt; root</li>
                <li>• Right subtree &gt; root</li>
                <li>• Inorder gives sorted sequence</li>
                <li>• Recursive structure</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Use Cases</h3>
              <ul className="space-y-1 text-gray-300">
                <li>• Database indexing</li>
                <li>• Expression parsing</li>
                <li>• File systems</li>
                <li>• Priority queues</li>
              </ul>
            </div>
          </div>
          </div>
        </motion.details>
      </div>
    </Layout>
  )
}