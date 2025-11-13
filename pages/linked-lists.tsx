import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import LinkedListVisualization from '../components/animations/LinkedListVisualization'
import { Plus, Minus, RotateCcw, Search } from 'lucide-react'

interface Node {
  value: number
  id: string
}

export default function LinkedLists() {
  const [nodes, setNodes] = useState<Node[]>([
    { value: 1, id: '1' },
    { value: 5, id: '2' },
    { value: 3, id: '3' }
  ])
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [operation, setOperation] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [steps, setSteps] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [operationType, setOperationType] = useState<string>('')

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  const generateId = () => Math.random().toString(36).substr(2, 9)

  const animateInsertAtHead = async (value: number) => {
    setIsAnimating(true)
    setOperationType('Insert at Head')
    const newSteps: string[] = []
    
    newSteps.push(`Step 1: Starting insert at HEAD for value ${value}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 2: Create new node with value ${value}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 3: Set new node's next pointer to current head`)
    setSteps([...newSteps])
    await sleep(1000)
    
    const newNode = { value, id: generateId() }
    const newNodes = [newNode, ...nodes]
    setNodes(newNodes)
    setHighlightIndex(0)
    newSteps.push(`Step 4: Update head pointer to new node`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 5: ✅ Successfully inserted ${value} at head. List size: ${newNodes.length}`)
    setSteps([...newSteps])
    setOperation(`Inserted ${value} at head`)
    await sleep(1000)
    
    setHighlightIndex(-1)
    setIsAnimating(false)
    setOperationType('')
  }

  const animateInsertAtTail = async (value: number) => {
    setIsAnimating(true)
    setOperationType('Insert at Tail')
    const newSteps: string[] = []
    
    newSteps.push(`Step 1: Starting insert at TAIL for value ${value}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 2: Traverse to the last node`)
    setSteps([...newSteps])
    for (let i = 0; i < nodes.length; i++) {
      setHighlightIndex(i)
      await sleep(500)
    }
    await sleep(500)
    
    newSteps.push(`Step 3: Create new node with value ${value}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    const newNode = { value, id: generateId() }
    const newNodes = [...nodes, newNode]
    setNodes(newNodes)
    setHighlightIndex(nodes.length)
    newSteps.push(`Step 4: Set last node's next pointer to new node`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 5: ✅ Successfully inserted ${value} at tail. List size: ${newNodes.length}`)
    setSteps([...newSteps])
    setOperation(`Inserted ${value} at tail`)
    await sleep(1000)
    
    setHighlightIndex(-1)
    setIsAnimating(false)
    setOperationType('')
  }

  const animateDelete = async (index: number) => {
    setIsAnimating(true)
    setOperationType('Delete Node')
    const newSteps: string[] = []
    const deletedValue = nodes[index].value
    
    newSteps.push(`Step 1: Starting delete at index ${index}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    if (index === 0) {
      newSteps.push(`Step 2: Deleting head node (value: ${deletedValue})`)
      setSteps([...newSteps])
      setHighlightIndex(0)
      await sleep(1000)
      
      newSteps.push(`Step 3: Update head pointer to next node`)
      setSteps([...newSteps])
      await sleep(1000)
    } else {
      newSteps.push(`Step 2: Traverse to node before index ${index}`)
      setSteps([...newSteps])
      for (let i = 0; i < index; i++) {
        setHighlightIndex(i)
        await sleep(500)
      }
      
      setHighlightIndex(index)
      newSteps.push(`Step 3: Found node to delete (value: ${deletedValue})`)
      setSteps([...newSteps])
      await sleep(1000)
      
      newSteps.push(`Step 4: Update previous node's next pointer`)
      setSteps([...newSteps])
      await sleep(1000)
    }
    
    const newNodes = nodes.filter((_, i) => i !== index)
    setNodes(newNodes)
    newSteps.push(`Step 5: ✅ Successfully deleted ${deletedValue}. List size: ${newNodes.length}`)
    setSteps([...newSteps])
    setOperation(`Deleted ${deletedValue}`)
    await sleep(1000)
    
    setHighlightIndex(-1)
    setIsAnimating(false)
    setOperationType('')
  }

  const animateSearch = async (value: number) => {
    setIsAnimating(true)
    setOperationType('Search')
    const newSteps: string[] = []
    
    newSteps.push(`Step 1: Starting search for value ${value}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 2: Traversing list from head...`)
    setSteps([...newSteps])
    await sleep(1000)
    
    for (let i = 0; i < nodes.length; i++) {
      setHighlightIndex(i)
      newSteps.push(`Step ${i + 3}: Checking node ${i}: ${nodes[i].value} ${nodes[i].value === value ? '✓ Match!' : '✗ Not a match'}`)
      setSteps([...newSteps])
      await sleep(800)
      
      if (nodes[i].value === value) {
        newSteps.push(`Step ${i + 4}: ✅ Found ${value} at index ${i}!`)
        setSteps([...newSteps])
        setOperation(`Found ${value} at index ${i}`)
        await sleep(1500)
        setIsAnimating(false)
        setOperationType('')
        return
      }
    }
    
    setHighlightIndex(-1)
    newSteps.push(`Step ${nodes.length + 3}: ❌ Value ${value} not found in list`)
    setSteps([...newSteps])
    setOperation(`${value} not found`)
    await sleep(1500)
    
    setIsAnimating(false)
    setOperationType('')
  }

  const handleInsertAtHead = () => {
    if (inputValue && !isNaN(Number(inputValue)) && !isAnimating) {
      const value = Number(inputValue)
      animateInsertAtHead(value)
      setInputValue('')
    }
  }

  const handleInsertAtTail = () => {
    if (inputValue && !isNaN(Number(inputValue)) && !isAnimating) {
      const value = Number(inputValue)
      animateInsertAtTail(value)
      setInputValue('')
    }
  }

  const handleDeleteAtIndex = (index: number) => {
    if (index >= 0 && index < nodes.length && !isAnimating) {
      animateDelete(index)
    }
  }

  const handleSearch = (value: number) => {
    if (!isAnimating) {
      animateSearch(value)
    }
  }

  const reset = () => {
    setNodes([
      { value: 1, id: '1' },
      { value: 5, id: '2' },
      { value: 3, id: '3' }
    ])
    setHighlightIndex(-1)
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Linked Lists
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Dynamic linear data structure with nodes connected via pointers
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
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleInsertAtHead}
                disabled={!inputValue}
                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Plus size={14} />
                Head
              </button>
              <button
                onClick={handleInsertAtTail}
                disabled={!inputValue}
                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Plus size={14} />
                Tail
              </button>
              {nodes.map((node, index) => (
                <button
                  key={node.id}
                  onClick={() => handleDeleteAtIndex(index)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs transition-colors"
                >
                  <Minus size={12} />
                  Del {node.value}
                </button>
              ))}
              <button
                onClick={reset}
                className="flex items-center gap-1.5 bg-gray-600 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors text-sm"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-3 flex-1 min-h-0">
          <motion.div
            className="lg:col-span-2 glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">Visualization</h2>
            <div className="flex-1 min-h-0 overflow-auto">
              <LinkedListVisualization 
                nodes={nodes} 
                highlightIndex={highlightIndex}
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
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">Info</h2>
            <div className="flex-1 min-h-0 overflow-auto space-y-3">
              <div className="glass-card p-2 sm:p-3 bg-white/5">
                <div className="text-xs sm:text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Length:</span>
                    <span className="text-green-400">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Head:</span>
                    <span className="text-green-400">
                      {nodes.length > 0 ? nodes[0].value : 'null'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tail:</span>
                    <span className="text-green-400">
                      {nodes.length > 0 ? nodes[nodes.length - 1].value : 'null'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">
                  {operationType || 'Execution Steps'}
                </h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {steps.length === 0 ? (
                    <div className="glass-card p-3 bg-white/5 text-center text-gray-400 text-xs">
                      Perform an operation to see step-by-step execution
                    </div>
                  ) : (
                    steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-2 bg-white/5 border-l-4 border-green-400"
                      >
                        <p className="text-xs text-gray-200">{step}</p>
                      </motion.div>
                    ))
                  )}
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
            Linked List Properties (Click to expand)
          </summary>
          <div className="p-3 sm:p-4 pt-0">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-green-400">Time Complexity</h3>
              <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
                <li>• Access: O(n)</li>
                <li>• Search: O(n)</li>
                <li>• Insertion: O(1) at head</li>
                <li>• Deletion: O(1) at head</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Advantages</h3>
              <ul className="space-y-1 text-gray-300">
                <li>• Dynamic size</li>
                <li>• Efficient insertion/deletion</li>
                <li>• Memory efficient</li>
                <li>• No memory waste</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-400">Disadvantages</h3>
              <ul className="space-y-1 text-gray-300">
                <li>• No random access</li>
                <li>• Extra memory for pointers</li>
                <li>• Not cache friendly</li>
                <li>• Sequential access only</li>
              </ul>
            </div>
          </div>
          </div>
        </motion.details>
      </div>
    </Layout>
  )
}