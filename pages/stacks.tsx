import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import StackVisualization from '../components/animations/StackVisualization'
import { Plus, Minus, RotateCcw } from 'lucide-react'

export default function Stacks() {
  const [stack, setStack] = useState([1, 5, 3])
  const [operation, setOperation] = useState<'push' | 'pop' | null>(null)
  const [newElement, setNewElement] = useState<number | undefined>()
  const [inputValue, setInputValue] = useState('')
  const [steps, setSteps] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const animatePush = async (value: number) => {
    setIsAnimating(true)
    const newSteps: string[] = []
    
    newSteps.push(`Step 1: Starting PUSH operation for value ${value}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 2: Stack follows LIFO (Last In, First Out)`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 3: Current stack size: ${stack.length}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    setNewElement(value)
    setOperation('push')
    newSteps.push(`Step 4: Pushing ${value} onto top of stack`)
    setSteps([...newSteps])
    await sleep(1000)
    
    const newStack = [...stack, value]
    setStack(newStack)
    newSteps.push(`Step 5: ✅ Successfully pushed ${value}. Stack size is now ${newStack.length}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    setOperation(null)
    setNewElement(undefined)
    setIsAnimating(false)
  }

  const animatePop = async () => {
    setIsAnimating(true)
    const newSteps: string[] = []
    const topElement = stack[stack.length - 1]
    
    newSteps.push(`Step 1: Starting POP operation`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 2: Current stack size: ${stack.length}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    newSteps.push(`Step 3: Top element is ${topElement}`)
    setSteps([...newSteps])
    setOperation('pop')
    await sleep(1000)
    
    newSteps.push(`Step 4: Removing ${topElement} from top`)
    setSteps([...newSteps])
    await sleep(1000)
    
    const newStack = stack.slice(0, -1)
    setStack(newStack)
    newSteps.push(`Step 5: ✅ Successfully popped ${topElement}. Stack size is now ${newStack.length}`)
    setSteps([...newSteps])
    await sleep(1000)
    
    setOperation(null)
    setIsAnimating(false)
  }

  const handlePush = () => {
    if (inputValue && !isNaN(Number(inputValue)) && !isAnimating) {
      const value = Number(inputValue)
      animatePush(value)
      setInputValue('')
    }
  }

  const handlePop = () => {
    if (stack.length > 0 && !isAnimating) {
      animatePop()
    }
  }

  const reset = () => {
    setStack([1, 5, 3])
    setOperation(null)
    setNewElement(undefined)
    setSteps([])
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Stacks
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            LIFO (Last In, First Out) data structure
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
              placeholder="Enter value to push"
              className="flex-1 min-w-[150px] px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handlePush()}
            />
            <div className="flex gap-2">
              <button
                onClick={handlePush}
                disabled={!inputValue || operation !== null}
                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Plus size={14} />
                Push
              </button>
              <button
                onClick={handlePop}
                disabled={stack.length === 0 || operation !== null}
                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Minus size={14} />
                Pop
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

        <div className="grid lg:grid-cols-3 gap-3 flex-1 min-h-0">
          <motion.div
            className="lg:col-span-2 glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">Visualization</h2>
            <div className="flex-1 min-h-0 overflow-auto flex justify-center">
              <StackVisualization 
                stack={stack} 
                operation={operation}
                newElement={newElement}
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
                    <span>Size:</span>
                    <span className="text-purple-400">{stack.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top Element:</span>
                    <span className="text-purple-400">
                      {stack.length > 0 ? stack[stack.length - 1] : 'Empty'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Is Empty:</span>
                    <span className="text-purple-400">
                      {stack.length === 0 ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">
                  {operation ? `${operation.toUpperCase()} Operation` : 'Execution Steps'}
                </h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {steps.length === 0 ? (
                    <div className="glass-card p-3 bg-white/5 text-center text-gray-400 text-xs">
                      Perform PUSH or POP to see execution steps
                    </div>
                  ) : (
                    steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-2 bg-white/5 border-l-4 border-purple-400"
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
            Stack Properties (Click to expand)
          </summary>
          <div className="p-3 sm:p-4 pt-0">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-purple-400">Operations</h3>
              <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
                <li>• Push: Add to top</li>
                <li>• Pop: Remove from top</li>
                <li>• Peek: View top element</li>
                <li>• isEmpty: Check if empty</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-400">Time Complexity</h3>
              <ul className="space-y-1 text-gray-300">
                <li>• Push: O(1)</li>
                <li>• Pop: O(1)</li>
                <li>• Peek: O(1)</li>
                <li>• Search: O(n)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Use Cases</h3>
              <ul className="space-y-1 text-gray-300">
                <li>• Function calls</li>
                <li>• Undo operations</li>
                <li>• Expression evaluation</li>
                <li>• Browser history</li>
              </ul>
            </div>
          </div>
          </div>
        </motion.details>
      </div>
    </Layout>
  )
}