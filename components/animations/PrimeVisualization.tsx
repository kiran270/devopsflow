import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PrimeVisualizationProps {
  number: number
  isChecking: boolean
  currentDivisor?: number
  isPrime?: boolean
  steps: string[]
  algorithm: 'basic' | 'optimized' | 'sieve'
}

export default function PrimeVisualization({
  number,
  isChecking,
  currentDivisor = 2,
  isPrime,
  steps,
  algorithm
}: PrimeVisualizationProps) {
  const [checkedDivisors, setCheckedDivisors] = useState<number[]>([])

  useEffect(() => {
    if (currentDivisor && isChecking) {
      setCheckedDivisors(prev => [...prev, currentDivisor])
    }
  }, [currentDivisor, isChecking])

  useEffect(() => {
    if (!isChecking) {
      setCheckedDivisors([])
    }
  }, [isChecking, number])

  const renderBasicCheck = () => {
    const divisors = []
    const limit = algorithm === 'optimized' ? Math.sqrt(number) : number - 1
    
    for (let i = 2; i <= limit; i++) {
      divisors.push(i)
    }

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2 text-blue-400">{number}</div>
          <div className="text-sm text-gray-400">
            {algorithm === 'optimized' ? `Checking divisors up to √${number} ≈ ${Math.floor(Math.sqrt(number))}` : `Checking divisors from 2 to ${number - 1}`}
          </div>
        </div>

        <div className="grid grid-cols-10 gap-2 max-w-2xl">
          {divisors.map((divisor) => {
            const isCurrentlyChecking = divisor === currentDivisor && isChecking
            const hasBeenChecked = checkedDivisors.includes(divisor)
            const isDivisible = number % divisor === 0

            return (
              <motion.div
                key={divisor}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCurrentlyChecking
                    ? 'bg-yellow-500 text-black scale-110 ring-2 ring-yellow-300'
                    : hasBeenChecked
                      ? isDivisible
                        ? 'bg-red-500 text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: isCurrentlyChecking ? 1.1 : 1 }}
                whileHover={{ scale: 1.05 }}
              >
                {divisor}
              </motion.div>
            )
          })}
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
            <span>Not checked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Currently checking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Not divisible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Divisible</span>
          </div>
        </div>
      </div>
    )
  }

  const renderSieveOfEratosthenes = () => {
    const numbers = Array.from({ length: Math.min(number, 100) }, (_, i) => i + 1)
    
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold mb-2">Sieve of Eratosthenes</div>
          <div className="text-sm text-gray-400">Finding all primes up to {number}</div>
        </div>

        <div className="grid grid-cols-10 gap-1 max-w-2xl">
          {numbers.map((num) => {
            const isPrimeNumber = isPrime && num <= number
            const isComposite = !isPrimeNumber && num > 1

            return (
              <motion.div
                key={num}
                className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                  num === 1
                    ? 'bg-gray-800 text-gray-500'
                    : isPrimeNumber
                      ? 'bg-blue-500 text-white'
                      : isComposite
                        ? 'bg-red-400 text-white line-through'
                        : 'bg-gray-600 text-gray-300'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: num * 0.01 }}
              >
                {num}
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-lg font-semibold mb-4">
        Prime Number Check - {algorithm === 'basic' ? 'Basic Algorithm' : algorithm === 'optimized' ? 'Optimized Algorithm' : 'Sieve of Eratosthenes'}
      </div>

      {algorithm === 'sieve' ? renderSieveOfEratosthenes() : renderBasicCheck()}

      {/* Result */}
      <AnimatePresence>
        {isPrime !== undefined && !isChecking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`glass-card p-4 text-center ${
              isPrime ? 'border-green-500' : 'border-red-500'
            } border-2`}
          >
            <div className={`text-2xl font-bold mb-2 ${
              isPrime ? 'text-green-400' : 'text-red-400'
            }`}>
              {number} is {isPrime ? 'PRIME' : 'NOT PRIME'}
            </div>
            {!isPrime && currentDivisor && (
              <div className="text-sm text-gray-300">
                Divisible by {currentDivisor}: {number} ÷ {currentDivisor} = {number / currentDivisor}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}