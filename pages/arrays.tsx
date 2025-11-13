import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import ArrayVisualization from '../components/animations/ArrayVisualization'
import { Play, RotateCcw, Plus, Minus } from 'lucide-react'

export default function Arrays() {
  const [array, setArray] = useState([1, 5, 3, 8, 2])
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [operation, setOperation] = useState('')
  const [newValue, setNewValue] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [steps, setSteps] = useState<string[]>([])
  const [operationType, setOperationType] = useState<'insert' | 'delete' | 'search' | null>(null)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const animateInsert = async (value: number) => {
    setIsAnimating(true)
    setOperationType('insert')
    const newSteps: string[] = []
    
    newSteps.push(`Step 1: Starting insert operation for value ${value}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 2: Current array has ${array.length} elements`)
    setSteps([...newSteps])
    await sleep(1000)
    
    const insertIndex = array.length
    newSteps.push(`Step 3: Inserting ${value} at the end (index ${insertIndex})`)
    setSteps([...newSteps])
    setHighlightIndex(insertIndex)
    await sleep(1000)
    
    const newArray = [...array, value]
    setArray(newArray)
    newSteps.push(`Step 4: ✅ Successfully inserted ${value}. Array size is now ${newArray.length}`)
    setSteps([...newSteps])
    setOperation(`Inserted ${value} at index ${insertIndex}`)
    await sleep(1000)
    
    setHighlightIndex(-1)
    setIsAnimating(false)
    setOperationType(null)
  }

  const animateDelete = async (index: number) => {
    setIsAnimating(true)
    setOperationType('delete')
    const newSteps: string[] = []
    const deletedValue = array[index]
    
    newSteps.push(`Step 1: Starting delete operation at index ${index}`)
    setSteps([...newSteps])
    setHighlightIndex(index)
    await sleep(1000)
    
    newSteps.push(`Step 2: Element at index ${index} is ${deletedValue}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 3: Removing element ${deletedValue}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    setArray(array.filter((_, i) => i !== index))
    newSteps.push(`Step 4: Shifting remaining elements left`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 5: ✅ Successfully deleted ${deletedValue}. Array size is now ${array.length - 1}`)
    setSteps([...newSteps])
    setOperation(`Deleted ${deletedValue} from index ${index}`)
    await sleep(1000)
    
    setHighlightIndex(-1)
    setIsAnimating(false)
    setOperationType(null)
  }

  const animateSearch = async (value: number) => {
    setIsAnimating(true)
    setOperationType('search')
    const newSteps: string[] = []
    
    newSteps.push(`Step 1: Starting search for value ${value}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 2: Checking each element sequentially...`)
    setSteps([...newSteps])
    await sleep(1000)
    
    for (let i = 0; i < array.length; i++) {
      setHighlightIndex(i)
      newSteps.push(`Step ${i + 3}: Checking index ${i}: ${array[i]} ${array[i] === value ? '✓ Match!' : '✗ Not a match'}`)
      setSteps([...newSteps])
      await sleep(800)
      
      if (array[i] === value) {
        newSteps.push(`Step ${i + 4}: ✅ Found ${value} at index ${i}!`)
        setSteps([...newSteps])
        setOperation(`Found ${value} at index ${i}`)
        await sleep(1500)
        setIsAnimating(false)
        setOperationType(null)
        return
      }
    }
    
    setHighlightIndex(-1)
    newSteps.push(`Step ${array.length + 3}: ❌ Value ${value} not found in array`)
    setSteps([...newSteps])
    setOperation(`${value} not found`)
    await sleep(1500)
    
    setIsAnimating(false)
    setOperationType(null)
  }

  const handleInsert = () => {
    if (newValue && !isNaN(Number(newValue)) && !isAnimating) {
      const value = Number(newValue)
      animateInsert(value)
      setNewValue('')
    }
  }

  const handleDelete = (index: number) => {
    if (!isAnimating) {
      animateDelete(index)
    }
  }

  const handleSearch = (value: number) => {
    if (!isAnimating) {
      animateSearch(value)
    }
  }

  const reset = () => {
    setArray([1, 5, 3, 8, 2])
    setHighlightIndex(-1)
    setOperation('')
    setSteps([])
    setOperationType(null)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Arrays
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            A collection of elements stored at contiguous memory locations
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
            {/* Insert */}
            <div className="flex gap-2 flex-1 min-w-[200px]">
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
              />
              <button
                onClick={handleInsert}
                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Plus size={14} />
                Insert
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-2 flex-1 min-w-[200px]">
              <input
                type="number"
                placeholder="Search"
                className="flex-1 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = Number((e.target as HTMLInputElement).value)
                    if (!isNaN(value)) handleSearch(value)
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Search"]') as HTMLInputElement
                  const value = Number(input.value)
                  if (!isNaN(value)) handleSearch(value)
                }}
                className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Play size={14} />
                Search
              </button>
            </div>

            {/* Delete buttons */}
            <div className="flex flex-wrap gap-1.5">
              {array.map((value, index) => (
                <button
                  key={index}
                  onClick={() => handleDelete(index)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs transition-colors"
                >
                  <Minus size={12} />
                  Del {value}
                </button>
              ))}
            </div>

            <button
              onClick={reset}
              className="flex items-center gap-1.5 bg-gray-600 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Main Content: Visualization and Steps */}
        <div className="grid lg:grid-cols-3 gap-3 flex-1 min-h-0">
          {/* Visualization */}
          <motion.div
            className="lg:col-span-2 glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">Visualization</h2>
            <div className="flex-1 min-h-0 overflow-auto">
              <ArrayVisualization 
                array={array} 
                highlightIndex={highlightIndex}
                operation={operation}
              />
            </div>
          </motion.div>

          {/* Step-by-Step Guide */}
          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">
              {operationType ? `${operationType.charAt(0).toUpperCase() + operationType.slice(1)} Operation` : 'Execution Steps'}
            </h2>
            <div className="flex-1 min-h-0 overflow-auto custom-scrollbar space-y-2 p-2">
              {steps.length === 0 ? (
                <div className="glass-card p-4 bg-white/5 text-center text-gray-400">
                  <p className="text-sm">Perform an operation to see step-by-step execution</p>
                  <p className="text-xs mt-2">Try Insert, Delete, or Search</p>
                </div>
              ) : (
                steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-3 bg-white/5 border-l-4 border-blue-400"
                  >
                    <p className="text-xs sm:text-sm text-gray-200">{step}</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Theory - Collapsible */}
        <motion.details
          className="glass-card mt-3 sm:mt-4 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <summary className="cursor-pointer p-3 sm:p-4 font-semibold text-base sm:text-lg hover:bg-white/5 rounded-lg transition-colors">
            Array Properties & Complexity (Click to expand)
          </summary>
          <div className="p-3 sm:p-4 pt-0">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Time Complexity</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="glass-card p-3 bg-white/5">
                  <div className="font-semibold text-green-400 mb-1">Access</div>
                  <div className="text-gray-300">O(1) - Direct index access</div>
                </div>
                <div className="glass-card p-3 bg-white/5">
                  <div className="font-semibold text-yellow-400 mb-1">Search</div>
                  <div className="text-gray-300">O(n) - Linear search</div>
                </div>
                <div className="glass-card p-3 bg-white/5">
                  <div className="font-semibold text-orange-400 mb-1">Insert</div>
                  <div className="text-gray-300">O(n) - Shift elements</div>
                </div>
                <div className="glass-card p-3 bg-white/5">
                  <div className="font-semibold text-red-400 mb-1">Delete</div>
                  <div className="text-gray-300">O(n) - Shift elements</div>
                </div>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Array Properties & Use Cases</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-green-400">Advantages</h3>
              <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
                <li>• Fast random access O(1)</li>
                <li>• Memory efficient</li>
                <li>• Cache friendly</li>
                <li>• Simple implementation</li>
                <li>• Predictable memory layout</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-red-400">Disadvantages</h3>
              <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
                <li>• Fixed size (static arrays)</li>
                <li>• Expensive insertion/deletion</li>
                <li>• Memory waste if not full</li>
                <li>• No automatic resizing</li>
                <li>• Homogeneous data only</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-400">Use Cases</h3>
              <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
                <li>• Mathematical computations</li>
                <li>• Image processing</li>
                <li>• Database records</li>
                <li>• Lookup tables</li>
                <li>• Matrix operations</li>
              </ul>
            </div>
          </div>
          </div>
        </motion.details>
      </div>
    </Layout>
  )
}