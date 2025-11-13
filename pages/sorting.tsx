import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import SortingVisualization from '../components/animations/SortingVisualization'
import { Play, Pause, RotateCcw, Shuffle, BarChart3 } from 'lucide-react'

export default function Sorting() {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 5])
  const [comparing, setComparing] = useState<number[]>([])
  const [swapping, setSwapping] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])
  const [algorithm, setAlgorithm] = useState('Bubble Sort')
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [shouldStop, setShouldStop] = useState(false)
  const [speed, setSpeed] = useState(1000)
  const [currentStep, setCurrentStep] = useState('')

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const checkPauseOrStop = async () => {
    while (isPaused && !shouldStop) {
      await sleep(100)
    }
    return shouldStop
  }

  const bubbleSort = useCallback(async () => {
    const arr = [...array]
    const n = arr.length
    setIsAnimating(true)
    setCurrentStep('Starting Bubble Sort...')
    await sleep(speed)
    
    for (let i = 0; i < n - 1; i++) {
      setCurrentStep(`Pass ${i + 1}: Finding largest element in unsorted portion`)
      await sleep(speed / 2)
      
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentStep(`Comparing ${arr[j]} and ${arr[j + 1]}`)
        setComparing([j, j + 1])
        await sleep(speed)
        
        if (arr[j] > arr[j + 1]) {
          setCurrentStep(`${arr[j]} > ${arr[j + 1]}, swapping them`)
          setSwapping([j, j + 1])
          await sleep(speed)
          
          const temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          setArray([...arr])
          await sleep(speed)
        } else {
          setCurrentStep(`${arr[j]} ≤ ${arr[j + 1]}, no swap needed`)
          await sleep(speed / 2)
        }
        
        setSwapping([])
        setComparing([])
      }
      setSorted(prev => [...prev, n - 1 - i])
      setCurrentStep(`Element ${arr[n - 1 - i]} is now in its final position`)
      await sleep(speed / 2)
    }
    
    setSorted(prev => [...prev, 0])
    setCurrentStep('✅ Array is fully sorted!')
    setIsAnimating(false)
  }, [array, speed])

  const selectionSort = useCallback(async () => {
    const arr = [...array]
    const n = arr.length
    setIsAnimating(true)
    setCurrentStep('Starting Selection Sort...')
    await sleep(speed)
    
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      setCurrentStep(`Finding minimum element in unsorted region (position ${i} to ${n - 1})`)
      setComparing([i])
      await sleep(speed / 2)
      
      for (let j = i + 1; j < n; j++) {
        setCurrentStep(`Checking ${arr[j]}, current minimum is ${arr[minIdx]}`)
        setComparing([i, j, minIdx])
        await sleep(speed)
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j
          setCurrentStep(`Found new minimum: ${arr[j]}`)
          await sleep(speed / 2)
        }
      }
      
      if (minIdx !== i) {
        setCurrentStep(`Swapping ${arr[i]} with minimum ${arr[minIdx]}`)
        setSwapping([i, minIdx])
        await sleep(speed)
        
        const temp = arr[i]
        arr[i] = arr[minIdx]
        arr[minIdx] = temp
        setArray([...arr])
        await sleep(speed)
      } else {
        setCurrentStep(`${arr[i]} is already the minimum, no swap needed`)
        await sleep(speed / 2)
      }
      
      setSorted(prev => [...prev, i])
      setCurrentStep(`Position ${i} is now sorted with value ${arr[i]}`)
      setSwapping([])
      setComparing([])
      await sleep(speed / 2)
    }
    
    setSorted(prev => [...prev, n - 1])
    setCurrentStep('✅ Array is fully sorted!')
    setIsAnimating(false)
  }, [array, speed])

  const insertionSort = useCallback(async () => {
    const arr = [...array]
    const n = arr.length
    setIsAnimating(true)
    setCurrentStep('Starting Insertion Sort...')
    setSorted([0])
    await sleep(speed)
    
    for (let i = 1; i < n; i++) {
      const key = arr[i]
      let j = i - 1
      
      setCurrentStep(`Inserting ${key} into sorted portion`)
      setComparing([i])
      await sleep(speed)
      
      let shifted = false
      while (j >= 0 && arr[j] > key) {
        setCurrentStep(`${arr[j]} > ${key}, shifting ${arr[j]} to the right`)
        setComparing([j, j + 1])
        setSwapping([j, j + 1])
        await sleep(speed)
        
        arr[j + 1] = arr[j]
        setArray([...arr])
        await sleep(speed)
        shifted = true
        j--
      }
      
      arr[j + 1] = key
      setArray([...arr])
      
      if (shifted) {
        setCurrentStep(`Placed ${key} at position ${j + 1}`)
      } else {
        setCurrentStep(`${key} is already in correct position`)
      }
      
      setSorted(prev => [...prev, i])
      setSwapping([])
      setComparing([])
      await sleep(speed / 2)
    }
    
    setCurrentStep('✅ Array is fully sorted!')
    setIsAnimating(false)
  }, [array, speed])

  const quickSort = useCallback(async () => {
    const arr = [...array]
    setIsAnimating(true)
    setCurrentStep('Starting Quick Sort...')
    await sleep(speed)
    
    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high]
      let i = low - 1
      
      setCurrentStep(`Partitioning: Pivot = ${pivot} (position ${high})`)
      await sleep(speed / 2)
      
      for (let j = low; j < high; j++) {
        setCurrentStep(`Comparing ${arr[j]} with pivot ${pivot}`)
        setComparing([j, high])
        await sleep(speed)
        
        if (arr[j] < pivot) {
          i++
          if (i !== j) {
            setCurrentStep(`${arr[j]} < ${pivot}, moving to left partition`)
            setSwapping([i, j])
            await sleep(speed)
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
            setArray([...arr])
            await sleep(speed)
          }
        } else {
          setCurrentStep(`${arr[j]} ≥ ${pivot}, stays in right partition`)
          await sleep(speed / 2)
        }
      }
      
      setCurrentStep(`Placing pivot ${pivot} in its final position`)
      setSwapping([i + 1, high])
      await sleep(speed)
      const temp = arr[i + 1]
      arr[i + 1] = arr[high]
      arr[high] = temp
      setArray([...arr])
      await sleep(speed)
      
      setSwapping([])
      setComparing([])
      return i + 1
    }
    
    const quickSortHelper = async (low: number, high: number) => {
      if (low < high) {
        setCurrentStep(`Sorting subarray from position ${low} to ${high}`)
        await sleep(speed / 2)
        
        const pi = await partition(low, high)
        setSorted(prev => [...prev, pi])
        setCurrentStep(`Pivot ${arr[pi]} is now in final position ${pi}`)
        await sleep(speed / 2)
        
        await quickSortHelper(low, pi - 1)
        await quickSortHelper(pi + 1, high)
      } else if (low === high) {
        setSorted(prev => [...prev, low])
      }
    }
    
    await quickSortHelper(0, arr.length - 1)
    setCurrentStep('✅ Array is fully sorted!')
    setIsAnimating(false)
  }, [array, speed])

  const algorithms = {
    'Bubble Sort': bubbleSort,
    'Selection Sort': selectionSort,
    'Insertion Sort': insertionSort,
    'Quick Sort': quickSort
  }

  const handleSort = () => {
    if (isAnimating) return
    reset()
    setTimeout(() => {
      algorithms[algorithm as keyof typeof algorithms]()
    }, 100)
  }

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 95) + 5)
    setArray(newArray)
    reset()
  }

  const reset = () => {
    setComparing([])
    setSwapping([])
    setSorted([])
    setIsAnimating(false)
    setCurrentStep('')
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Sorting Algorithms
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Watch sorting algorithms in action with animated visualizations
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
            {/* Algorithm Selection */}
            <div className="flex-1 min-w-[180px]">
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                disabled={isAnimating}
                className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 text-sm"
              >
                {Object.keys(algorithms).map(alg => (
                  <option key={alg} value={alg} className="bg-gray-800">{alg}</option>
                ))}
              </select>
            </div>

            {/* Speed Control */}
            <div className="flex-1 min-w-[150px]">
              <div className="flex items-center gap-2">
                <span className="text-xs whitespace-nowrap">Speed:</span>
                <input
                  type="range"
                  min="500"
                  max="2000"
                  step="250"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  disabled={isAnimating}
                  className="flex-1"
                />
                <span className="text-xs w-12">{speed}ms</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isAnimating && !isPaused && (
                <button
                  onClick={handleSort}
                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  <Play size={14} />
                  Sort
                </button>
              )}
              {isAnimating && (
                <button
                  onClick={() => setIsPaused(true)}
                  className="flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  <Pause size={14} />
                  Pause
                </button>
              )}
              {isPaused && (
                <button
                  onClick={() => setIsPaused(false)}
                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  <Play size={14} />
                  Resume
                </button>
              )}
              <button
                onClick={() => { setShouldStop(true); reset(); }}
                disabled={!isAnimating && !isPaused}
                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <RotateCcw size={14} />
                Stop
              </button>
              <button
                onClick={generateRandomArray}
                disabled={isAnimating}
                className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <Shuffle size={14} />
                Shuffle
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content: Visualization and Info */}
        <div className="grid lg:grid-cols-3 gap-3 flex-1 lg:min-h-0 lg:overflow-hidden">
          {/* Visualization */}
          <motion.div
            className="lg:col-span-2 glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">Visualization</h2>
            <div className="flex-1 min-h-0 overflow-auto">
              <SortingVisualization 
                array={array}
                comparing={comparing}
                swapping={swapping}
                sorted={sorted}
                algorithm={algorithm}
                isAnimating={isAnimating}
              />
            </div>
          </motion.div>

          {/* Algorithm Explanation Sidebar */}
          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">{algorithm}</h2>
            <div className="flex-1 min-h-0 overflow-auto space-y-3 custom-scrollbar">
              {/* Current Array */}
              <div className="glass-card p-2 sm:p-3 bg-white/5">
                <h3 className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <BarChart3 size={16} />
                  Current Array
                </h3>
                <div className="text-xs text-gray-300 break-all">
                  [{array.join(', ')}]
                </div>
              </div>

              {/* Live Step Explanation */}
              {currentStep && (
                <motion.div 
                  className="glass-card p-2 sm:p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={currentStep}
                >
                  <h3 className="text-sm font-semibold mb-1.5 text-blue-300">Current Step</h3>
                  <p className="text-xs text-white font-medium">{currentStep}</p>
                </motion.div>
              )}

              {/* Algorithm Explanation */}
              <div className="glass-card p-2 sm:p-3 bg-white/5">
                <h3 className="text-sm font-semibold mb-2">How it Works</h3>
                <div className="text-xs text-gray-300 space-y-2">
                  {algorithm === 'Bubble Sort' && (
                    <>
                      <p>Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.</p>
                      <p className="font-semibold text-blue-400">Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Compare adjacent elements</li>
                        <li>Swap if left {'>'} right</li>
                        <li>Repeat until no swaps needed</li>
                        <li>Largest elements "bubble" to the end</li>
                      </ol>
                    </>
                  )}
                  {algorithm === 'Selection Sort' && (
                    <>
                      <p>Selection Sort divides the array into sorted and unsorted regions, repeatedly selecting the minimum element from unsorted region.</p>
                      <p className="font-semibold text-green-400">Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Find minimum in unsorted region</li>
                        <li>Swap with first unsorted element</li>
                        <li>Move boundary of sorted region</li>
                        <li>Repeat until array is sorted</li>
                      </ol>
                    </>
                  )}
                  {algorithm === 'Insertion Sort' && (
                    <>
                      <p>Insertion Sort builds the final sorted array one item at a time, inserting each element into its correct position.</p>
                      <p className="font-semibold text-purple-400">Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Start with second element</li>
                        <li>Compare with elements before it</li>
                        <li>Shift larger elements right</li>
                        <li>Insert element in correct position</li>
                      </ol>
                    </>
                  )}
                  {algorithm === 'Quick Sort' && (
                    <>
                      <p>Quick Sort uses divide-and-conquer by selecting a pivot element and partitioning the array around it.</p>
                      <p className="font-semibold text-orange-400">Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Choose a pivot element</li>
                        <li>Partition: smaller left, larger right</li>
                        <li>Recursively sort both partitions</li>
                        <li>Combine sorted partitions</li>
                      </ol>
                    </>
                  )}
                </div>
              </div>

              {/* Complexity */}
              <div className="glass-card p-2 sm:p-3 bg-white/5">
                <h3 className="text-sm font-semibold mb-2">Time Complexity</h3>
                <div className="text-xs text-gray-300 space-y-1">
                  {algorithm === 'Bubble Sort' && (
                    <>
                      <p><span className="text-green-400">Best:</span> O(n) - Already sorted</p>
                      <p><span className="text-yellow-400">Average:</span> O(n²)</p>
                      <p><span className="text-red-400">Worst:</span> O(n²) - Reverse sorted</p>
                      <p><span className="text-blue-400">Space:</span> O(1) - In-place</p>
                    </>
                  )}
                  {algorithm === 'Selection Sort' && (
                    <>
                      <p><span className="text-green-400">Best:</span> O(n²)</p>
                      <p><span className="text-yellow-400">Average:</span> O(n²)</p>
                      <p><span className="text-red-400">Worst:</span> O(n²)</p>
                      <p><span className="text-blue-400">Space:</span> O(1) - In-place</p>
                    </>
                  )}
                  {algorithm === 'Insertion Sort' && (
                    <>
                      <p><span className="text-green-400">Best:</span> O(n) - Already sorted</p>
                      <p><span className="text-yellow-400">Average:</span> O(n²)</p>
                      <p><span className="text-red-400">Worst:</span> O(n²) - Reverse sorted</p>
                      <p><span className="text-blue-400">Space:</span> O(1) - In-place</p>
                    </>
                  )}
                  {algorithm === 'Quick Sort' && (
                    <>
                      <p><span className="text-green-400">Best:</span> O(n log n)</p>
                      <p><span className="text-yellow-400">Average:</span> O(n log n)</p>
                      <p><span className="text-red-400">Worst:</span> O(n²) - Bad pivot choice</p>
                      <p><span className="text-blue-400">Space:</span> O(log n) - Recursion stack</p>
                    </>
                  )}
                </div>
              </div>

              {/* Use Cases */}
              <div className="glass-card p-2 sm:p-3 bg-white/5">
                <h3 className="text-sm font-semibold mb-2">When to Use</h3>
                <div className="text-xs text-gray-300 space-y-1">
                  {algorithm === 'Bubble Sort' && (
                    <>
                      <p>✅ Small datasets</p>
                      <p>✅ Educational purposes</p>
                      <p>✅ Nearly sorted data</p>
                      <p>❌ Large datasets (inefficient)</p>
                    </>
                  )}
                  {algorithm === 'Selection Sort' && (
                    <>
                      <p>✅ Small datasets</p>
                      <p>✅ Memory is limited (in-place)</p>
                      <p>✅ Minimizing swaps is important</p>
                      <p>❌ Large datasets (inefficient)</p>
                    </>
                  )}
                  {algorithm === 'Insertion Sort' && (
                    <>
                      <p>✅ Small datasets</p>
                      <p>✅ Nearly sorted data</p>
                      <p>✅ Online sorting (streaming data)</p>
                      <p>✅ Stable sort needed</p>
                    </>
                  )}
                  {algorithm === 'Quick Sort' && (
                    <>
                      <p>✅ Large datasets</p>
                      <p>✅ Average case performance matters</p>
                      <p>✅ In-place sorting preferred</p>
                      <p>❌ Guaranteed O(n log n) needed</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Algorithm Comparison - Collapsible */}
        <motion.details
          className="glass-card mt-3 sm:mt-4 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <summary className="cursor-pointer p-3 sm:p-4 font-semibold text-base sm:text-lg hover:bg-white/5 rounded-lg transition-colors">
            Algorithm Comparison (Click to expand)
          </summary>
          <div className="p-3 sm:p-4 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">Algorithm</th>
                  <th className="text-left py-2">Best Case</th>
                  <th className="text-left py-2">Average Case</th>
                  <th className="text-left py-2">Worst Case</th>
                  <th className="text-left py-2">Space</th>
                  <th className="text-left py-2">Stable</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-semibold text-blue-400">Bubble Sort</td>
                  <td className="py-2">O(n)</td>
                  <td className="py-2">O(n²)</td>
                  <td className="py-2">O(n²)</td>
                  <td className="py-2">O(1)</td>
                  <td className="py-2">Yes</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-semibold text-green-400">Selection Sort</td>
                  <td className="py-2">O(n²)</td>
                  <td className="py-2">O(n²)</td>
                  <td className="py-2">O(n²)</td>
                  <td className="py-2">O(1)</td>
                  <td className="py-2">No</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-semibold text-purple-400">Insertion Sort</td>
                  <td className="py-2">O(n)</td>
                  <td className="py-2">O(n²)</td>
                  <td className="py-2">O(n²)</td>
                  <td className="py-2">O(1)</td>
                  <td className="py-2">Yes</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-orange-400">Quick Sort</td>
                  <td className="py-2">O(n log n)</td>
                  <td className="py-2">O(n log n)</td>
                  <td className="py-2">O(n²)</td>
                  <td className="py-2">O(log n)</td>
                  <td className="py-2">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </motion.details>
      </div>
    </Layout>
  )
}