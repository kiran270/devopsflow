import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Play, Pause, RotateCcw, Code, Zap, TrendingUp } from 'lucide-react'

type Solution = 'brute' | 'optimized'

type TraceRow = {
  iteration?: number
  variables: Record<string, any>
}

export default function CodingProblems() {
  const [selectedProblem, setSelectedProblem] = useState(1)
  const [selectedSolution, setSelectedSolution] = useState<Solution>('brute')
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [steps, setSteps] = useState<string[]>([])
  const [currentValue, setCurrentValue] = useState<any>(null)
  const [traceTable, setTraceTable] = useState<TraceRow[]>([])
  const [input, setInput] = useState('17')
  const [speed, setSpeed] = useState(1000)
  const pausedRef = useRef(false)
  const stepsEndRef = useRef<HTMLDivElement>(null)
  const traceEndRef = useRef<HTMLTableRowElement>(null)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  useEffect(() => {
    if (stepsEndRef.current) {
      stepsEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [steps])

  useEffect(() => {
    if (traceEndRef.current) {
      traceEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [traceTable])

  const addStep = (step: string) => {
    setSteps(prev => [...prev, step])
  }

  const addTraceRow = (variables: Record<string, any>, iteration?: number) => {
    setTraceTable(prev => [...prev, { iteration, variables }])
  }

  // Problem 1: Prime Number
  const checkPrimeBrute = useCallback(async (n: number) => {
    addStep(`🔍 Starting prime check for ${n}`)
    addStep(`📝 A prime number is only divisible by 1 and itself`)
    addStep(`🎯 We will check all numbers from 2 to ${n - 1}`)
    addTraceRow({ n, i: '-', quotient: '-', remainder: '-', isPrime: '?' }, 0)
    
    if (n < 2) {
      addStep(`❌ ${n} is less than 2, so it cannot be prime`)
      addTraceRow({ n, result: 'false' })
      setCurrentValue(false)
      return
    }

    if (n === 2) {
      addStep(`✅ ${n} is the smallest prime number`)
      addTraceRow({ n, result: 'true' })
      setCurrentValue(true)
      return
    }

    for (let i = 2; i < n; i++) {
      if (pausedRef.current) break
      setCurrentValue(i)
      addStep(`🔢 Testing divisor ${i}`)
      addStep(`➗ Dividing ${n} by ${i}...`)
      
      const quotient = Math.floor(n / i)
      const remainder = n % i
      addTraceRow({ n, i, quotient, remainder, divisible: remainder === 0 ? 'YES' : 'NO' }, i - 1)
      await sleep(speed)
      
      if (remainder === 0) {
        addStep(`💡 ${n} ÷ ${i} = ${quotient} with remainder ${remainder}`)
        addStep(`❌ Since remainder is 0, ${i} divides ${n} evenly`)
        addStep(`🚫 ${n} is NOT prime because it's divisible by ${i}`)
        addTraceRow({ n, i, result: 'NOT PRIME' })
        setCurrentValue(false)
        return
      }
      addStep(`✓ ${n} ÷ ${i} = ${quotient} remainder ${remainder}`)
      addStep(`✓ ${i} does not divide ${n} evenly, continue checking...`)
    }
    
    if (!pausedRef.current) {
      addStep(`🎉 No divisors found from 2 to ${n - 1}`)
      addStep(`✅ ${n} is PRIME!`)
      addTraceRow({ n, result: 'PRIME' })
      setCurrentValue(true)
    }
  }, [speed])

  const checkPrimeOptimized = useCallback(async (n: number) => {
    const limit = Math.floor(Math.sqrt(n))
    addStep(`🚀 Starting OPTIMIZED prime check for ${n}`)
    addStep(`💡 Key insight: If n has a divisor > √n, it must have one < √n`)
    addStep(`📐 √${n} ≈ ${limit}, so we only check up to ${limit}`)
    addStep(`⚡ This reduces checks from ${n - 2} to ${limit - 1}!`)
    
    if (n < 2) {
      addStep(`❌ ${n} is less than 2, not prime`)
      setCurrentValue(false)
      return
    }
    
    if (n === 2) {
      addStep(`✅ ${n} is the only even prime number`)
      setCurrentValue(true)
      return
    }
    
    if (n % 2 === 0) {
      addStep(`❌ ${n} is even (divisible by 2), so not prime`)
      setCurrentValue(false)
      return
    }

    addStep(`🎯 Checking only ODD numbers from 3 to ${limit}`)
    addStep(`💡 We skip even numbers since we already checked 2`)
    
    for (let i = 3; i <= limit; i += 2) {
      if (pausedRef.current) break
      setCurrentValue(i)
      addStep(`🔢 Testing divisor ${i}`)
      addStep(`➗ Calculating ${n} ÷ ${i}...`)
      await sleep(speed)
      
      const quotient = Math.floor(n / i)
      const remainder = n % i
      
      if (remainder === 0) {
        addStep(`💡 ${n} ÷ ${i} = ${quotient} with remainder ${remainder}`)
        addStep(`❌ ${i} divides ${n} evenly!`)
        addStep(`🚫 ${n} is NOT prime`)
        setCurrentValue(false)
        return
      }
      addStep(`✓ ${n} ÷ ${i} = ${quotient} remainder ${remainder}`)
      addStep(`✓ ${i} doesn't divide ${n}, continue...`)
    }
    
    if (!pausedRef.current) {
      addStep(`🎉 No divisors found up to √${n}`)
      addStep(`✅ ${n} is PRIME!`)
      setCurrentValue(true)
    }
  }, [speed])

  // Problem 3: GCD
  const gcdBrute = useCallback(async (a: number, b: number) => {
    addStep(`🔍 Finding GCD (Greatest Common Divisor) of ${a} and ${b}`)
    addStep(`📝 GCD is the largest number that divides both numbers`)
    addStep(`🎯 We'll check every number from 1 to ${Math.min(a, b)}`)
    
    let result = 1
    addTraceRow({ i: 0, a, b, 'divides both': '-', gcd: 1 }, 0)
    
    for (let i = 1; i <= Math.min(a, b); i++) {
      if (pausedRef.current) break
      setCurrentValue(i)
      addStep(`🔢 Testing ${i}...`)
      await sleep(speed / 2)
      
      const divA = a % i === 0
      const divB = b % i === 0
      
      addStep(`➗ Does ${i} divide ${a}? ${a} ÷ ${i} = ${Math.floor(a / i)} remainder ${a % i}`)
      addStep(`➗ Does ${i} divide ${b}? ${b} ÷ ${i} = ${Math.floor(b / i)} remainder ${b % i}`)
      
      if (divA && divB) {
        result = i
        addStep(`✅ ${i} divides BOTH ${a} and ${b}! Current GCD = ${i}`)
        addTraceRow({ i, a, b, 'divides both': 'YES', gcd: result }, i)
      } else {
        addStep(`❌ ${i} doesn't divide both numbers`)
      }
    }
    
    if (!pausedRef.current) {
      addStep(`🎉 Largest common divisor found!`)
      addStep(`✅ GCD(${a}, ${b}) = ${result}`)
      addTraceRow({ result: `GCD = ${result}` })
      setCurrentValue(result)
    }
  }, [speed])

  const gcdOptimized = useCallback(async (a: number, b: number) => {
    addStep(`🚀 Finding GCD using EUCLIDEAN ALGORITHM`)
    addStep(`💡 Key insight: GCD(a, b) = GCD(b, a mod b)`)
    addStep(`⚡ This is MUCH faster than checking all numbers!`)
    addStep(`🎯 Starting with GCD(${a}, ${b})`)
    
    let tempA = a, tempB = b
    let step = 1
    addTraceRow({ step: 0, a: tempA, b: tempB, quotient: '-', remainder: '-' }, 0)
    
    while (tempB !== 0) {
      if (pausedRef.current) break
      addStep(`\n📍 Step ${step}: GCD(${tempA}, ${tempB})`)
      await sleep(speed)
      
      const quotient = Math.floor(tempA / tempB)
      const remainder = tempA % tempB
      
      addStep(`➗ Divide ${tempA} by ${tempB}`)
      addStep(`💡 ${tempA} = ${tempB} × ${quotient} + ${remainder}`)
      addStep(`📝 Quotient = ${quotient}, Remainder = ${remainder}`)
      addTraceRow({ step, a: tempA, b: tempB, quotient, remainder }, step)
      setCurrentValue(remainder)
      await sleep(speed)
      
      if (remainder === 0) {
        addStep(`🎯 Remainder is 0, we're done!`)
        break
      }
      
      addStep(`🔄 Replace: GCD(${tempA}, ${tempB}) → GCD(${tempB}, ${remainder})`)
      tempA = tempB
      tempB = remainder
      step++
    }
    
    if (!pausedRef.current) {
      addStep(`\n🎉 Algorithm complete!`)
      addStep(`✅ GCD(${a}, ${b}) = ${tempA}`)
      addStep(`⚡ Time Complexity: O(log n) - Super fast!`)
      addTraceRow({ result: `GCD = ${tempA}` })
      setCurrentValue(tempA)
    }
  }, [speed])

  // Problem 4: Power
  const powerBrute = useCallback(async (x: number, n: number) => {
    addStep(`🔍 Calculating ${x}^${n} using REPEATED MULTIPLICATION`)
    addStep(`📝 We'll multiply ${x} by itself ${n} times`)
    addStep(`🎯 Starting with result = 1`)
    addTraceRow({ i: 0, x, result: 1 }, 0)
    
    let result = 1
    for (let i = 0; i < n; i++) {
      if (pausedRef.current) break
      const oldResult = result
      result *= x
      addStep(`\n🔢 Multiplication ${i + 1} of ${n}:`)
      addStep(`➗ ${oldResult} × ${x} = ${result}`)
      addTraceRow({ i: i + 1, x, result }, i + 1)
      setCurrentValue(result)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      addStep(`\n🎉 Completed ${n} multiplications!`)
      addStep(`✅ ${x}^${n} = ${result}`)
      addStep(`⚠️ Time Complexity: O(n) - Linear time`)
      setCurrentValue(result)
    }
  }, [speed])

  const powerOptimized = useCallback(async (x: number, n: number) => {
    addStep(`🚀 Calculating ${x}^${n} using BINARY EXPONENTIATION`)
    addStep(`💡 Key insight: x^n = (x^(n/2))^2`)
    addStep(`⚡ This reduces multiplications exponentially!`)
    addStep(`📐 Example: 2^10 = (2^5)^2, not 2×2×2×2×2×2×2×2×2×2`)
    
    let callCount = 0
    const power = async (base: number, exp: number, depth: number = 0): Promise<number> => {
      callCount++
      if (exp === 0) {
        addStep(`${'  '.repeat(depth)}📝 Base case: ${base}^0 = 1`)
        addTraceRow({ call: callCount, exp: 0, result: 1 }, callCount)
        return 1
      }
      
      addStep(`\n${'  '.repeat(depth)}🎯 Computing ${base}^${exp}`)
      addStep(`${'  '.repeat(depth)}🔄 First, calculate ${base}^${Math.floor(exp / 2)}`)
      await sleep(speed)
      
      const half = await power(base, Math.floor(exp / 2), depth + 1)
      
      if (exp % 2 === 0) {
        const result = half * half
        addStep(`${'  '.repeat(depth)}💡 ${exp} is EVEN`)
        addStep(`${'  '.repeat(depth)}➗ ${base}^${exp} = (${base}^${Math.floor(exp / 2)})^2`)
        addStep(`${'  '.repeat(depth)}✓ ${base}^${exp} = ${half} × ${half} = ${result}`)
        addTraceRow({ call: callCount, exp, half, result }, callCount)
        return result
      } else {
        const result = half * half * base
        addStep(`${'  '.repeat(depth)}💡 ${exp} is ODD`)
        addStep(`${'  '.repeat(depth)}➗ ${base}^${exp} = (${base}^${Math.floor(exp / 2)})^2 × ${base}`)
        addStep(`${'  '.repeat(depth)}✓ ${base}^${exp} = ${half} × ${half} × ${base} = ${result}`)
        addTraceRow({ call: callCount, exp, half, result }, callCount)
        return result
      }
    }
    
    const result = await power(x, n)
    if (!pausedRef.current) {
      addStep(`\n🎉 Algorithm complete!`)
      addStep(`✅ ${x}^${n} = ${result}`)
      addStep(`⚡ Time Complexity: O(log n) - Exponentially faster!`)
      addTraceRow({ final: `${x}^${n} = ${result}` })
      setCurrentValue(result)
    }
  }, [speed])

  // Problem 5: Count Digits
  const countDigitsBrute = useCallback(async (n: number) => {
    addStep(`🔍 Counting digits in ${n} using STRING CONVERSION`)
    addStep(`📝 We'll convert the number to a string and count characters`)
    addTraceRow({ n, method: 'String conversion' })
    await sleep(speed)
    
    const absN = Math.abs(n)
    addStep(`🎯 Working with absolute value: ${absN}`)
    addTraceRow({ step: 1, absN })
    await sleep(speed)
    
    const str = String(absN)
    addStep(`🔄 Convert ${absN} to string: "${str}"`)
    addTraceRow({ step: 2, string: str })
    await sleep(speed)
    
    const count = str.length
    addStep(`📏 Count characters in "${str}": ${count} characters`)
    addStep(`✅ ${n} has ${count} digits`)
    addStep(`💾 Space Complexity: O(d) - Creates string in memory`)
    addTraceRow({ step: 3, count })
    setCurrentValue(count)
  }, [speed])

  const countDigitsOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Counting digits in ${n} using LOGARITHM`)
    addStep(`💡 Key insight: digits = floor(log₁₀(n)) + 1`)
    addStep(`📐 This is a mathematical property of numbers!`)
    await sleep(speed)
    
    if (n === 0) {
      addStep(`📝 Special case: 0 has exactly 1 digit`)
      setCurrentValue(1)
      return
    }
    
    const absN = Math.abs(n)
    addStep(`🎯 Working with absolute value: ${absN}`)
    await sleep(speed)
    
    const logValue = Math.log10(absN)
    addStep(`🔢 Calculate log₁₀(${absN}) = ${logValue.toFixed(4)}`)
    await sleep(speed)
    
    const floorValue = Math.floor(logValue)
    addStep(`📉 Take floor: floor(${logValue.toFixed(4)}) = ${floorValue}`)
    await sleep(speed)
    
    const count = floorValue + 1
    addStep(`➕ Add 1: ${floorValue} + 1 = ${count}`)
    addStep(`✅ ${n} has ${count} digits`)
    addStep(`⚡ Time Complexity: O(1) - Constant time!`)
    addStep(`💾 Space Complexity: O(1) - No extra space!`)
    setCurrentValue(count)
  }, [speed])

  // Problem 6: Reverse Number
  const reverseNumberBrute = useCallback(async (n: number) => {
    addStep(`🔍 Reversing ${n} using STRING MANIPULATION`)
    addStep(`📝 We'll convert to string, reverse it, convert back`)
    
    const sign = n < 0 ? -1 : 1
    const absN = Math.abs(n)
    addStep(`🎯 Working with absolute value: ${absN}`)
    addTraceRow({ step: 1, n, absN, sign })
    await sleep(speed)
    
    const str = String(absN)
    addStep(`🔄 Convert ${absN} to string: "${str}"`)
    addTraceRow({ step: 2, string: str })
    await sleep(speed)
    
    const reversed = str.split('').reverse().join('')
    addStep(`🔀 Reverse the string: "${str}" → "${reversed}"`)
    addTraceRow({ step: 3, reversed })
    await sleep(speed)
    
    const result = parseInt(reversed) * sign
    addStep(`🔢 Convert back to number: ${parseInt(reversed)}`)
    if (sign === -1) addStep(`➖ Apply negative sign: ${result}`)
    addStep(`✅ Result: ${result}`)
    addTraceRow({ step: 4, result })
    setCurrentValue(result)
  }, [speed])

  const reverseNumberOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Reversing ${n} MATHEMATICALLY`)
    addStep(`💡 Extract digits one by one using modulo and division`)
    addStep(`📐 Build reversed number: result = result × 10 + digit`)
    
    const sign = n < 0 ? -1 : 1
    let num = Math.abs(n)
    let result = 0
    let step = 0
    
    addStep(`🎯 Starting with num = ${num}, result = 0`)
    addTraceRow({ step, num, digit: '-', result }, step)
    
    while (num > 0) {
      if (pausedRef.current) break
      step++
      const digit = num % 10
      addStep(`\n🔢 Extract last digit: ${num} % 10 = ${digit}`)
      await sleep(speed)
      
      const oldResult = result
      result = result * 10 + digit
      addStep(`➕ Build reversed: ${oldResult} × 10 + ${digit} = ${result}`)
      num = Math.floor(num / 10)
      addTraceRow({ step, num, digit, result }, step)
      setCurrentValue(result)
      await sleep(speed)
      
      addStep(`➗ Remove last digit: num = ${num}`)
    }
    
    if (!pausedRef.current) {
      const final = result * sign
      if (sign === -1) addStep(`\n➖ Apply negative sign`)
      addStep(`✅ Reversed: ${final}`)
      addStep(`⚡ Time: O(d), Space: O(1) where d = digits`)
      addTraceRow({ result: final })
      setCurrentValue(final)
    }
  }, [speed])

  // Problem 7: Palindrome
  const palindromeBrute = useCallback(async (n: number) => {
    addStep(`🔍 Checking if ${n} is PALINDROME using STRING`)
    addStep(`📝 Palindrome reads same forwards and backwards`)
    addStep(`🎯 Examples: 121, 12321, 1001`)
    
    if (n < 0) {
      addStep(`❌ Negative numbers are not palindromes`)
      addTraceRow({ n, result: 'NOT PALINDROME' })
      setCurrentValue(false)
      return
    }
    
    const str = String(n)
    addStep(`🔄 Convert ${n} to string: "${str}"`)
    addTraceRow({ step: 1, n, string: str })
    await sleep(speed)
    
    const reversed = str.split('').reverse().join('')
    addStep(`🔀 Reverse the string: "${reversed}"`)
    addTraceRow({ step: 2, reversed })
    await sleep(speed)
    
    addStep(`🔍 Compare: "${str}" vs "${reversed}"`)
    const result = str === reversed
    addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}a palindrome`)
    addTraceRow({ step: 3, match: result ? 'YES' : 'NO', result: result ? 'PALINDROME' : 'NOT PALINDROME' })
    setCurrentValue(result)
  }, [speed])

  const palindromeOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Checking if ${n} is palindrome (OPTIMIZED)`)
    addStep(`💡 Only reverse HALF the number!`)
    addStep(`📐 Compare first half with reversed second half`)
    
    if (n < 0) {
      addStep(`❌ Negative numbers are not palindromes`)
      addTraceRow({ result: 'NOT PALINDROME' })
      setCurrentValue(false)
      return
    }
    
    if (n !== 0 && n % 10 === 0) {
      addStep(`❌ Numbers ending in 0 (except 0) are not palindromes`)
      addTraceRow({ result: 'NOT PALINDROME' })
      setCurrentValue(false)
      return
    }
    
    let original = n
    let reversed = 0
    let step = 0
    addStep(`🎯 Start: n = ${n}, reversed = 0`)
    addTraceRow({ step, n, digit: '-', reversed }, step)
    
    while (n > reversed) {
      if (pausedRef.current) break
      step++
      const digit = n % 10
      addStep(`\n🔢 Extract digit: ${n} % 10 = ${digit}`)
      reversed = reversed * 10 + digit
      addStep(`➕ Build reversed: ${reversed}`)
      n = Math.floor(n / 10)
      addStep(`➗ Reduce n: ${n}`)
      addTraceRow({ step, n, digit, reversed }, step)
      setCurrentValue(reversed)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      addStep(`\n🎯 Stopped when n ≤ reversed`)
      addStep(`📊 n = ${n}, reversed = ${reversed}`)
      const result = n === reversed || n === Math.floor(reversed / 10)
      addStep(`💡 For odd length: ignore middle digit`)
      addStep(`${result ? '✅' : '❌'} ${original} is ${result ? '' : 'NOT '}a palindrome`)
      addTraceRow({ result: result ? 'PALINDROME' : 'NOT PALINDROME' })
      setCurrentValue(result)
    }
  }, [speed])

  // Problem 8: Sum of Digits
  const sumDigitsBrute = useCallback(async (n: number) => {
    addStep(`🔍 Summing digits of ${n} using STRING`)
    addStep(`📝 Convert to string and add each character`)
    
    const absN = Math.abs(n)
    const str = String(absN)
    addStep(`🔄 Convert ${absN} to string: "${str}"`)
    let sum = 0
    addTraceRow({ i: 0, char: '-', digit: '-', sum: 0 }, 0)
    
    for (let i = 0; i < str.length; i++) {
      if (pausedRef.current) break
      const digit = parseInt(str[i])
      addStep(`\n🔢 Character ${i + 1}: "${str[i]}" → ${digit}`)
      sum += digit
      addStep(`➕ Add to sum: ${sum - digit} + ${digit} = ${sum}`)
      addTraceRow({ i: i + 1, char: str[i], digit, sum }, i + 1)
      setCurrentValue(sum)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      addStep(`\n✅ Sum of all digits: ${sum}`)
      addTraceRow({ result: sum })
      setCurrentValue(sum)
    }
  }, [speed])

  const sumDigitsOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Summing digits of ${n} MATHEMATICALLY`)
    addStep(`💡 Extract digits using modulo and division`)
    addStep(`📐 No string conversion needed!`)
    
    let num = Math.abs(n)
    let sum = 0
    let step = 0
    addStep(`🎯 Starting with num = ${num}, sum = 0`)
    addTraceRow({ step, num, digit: '-', sum }, step)
    
    while (num > 0) {
      if (pausedRef.current) break
      step++
      const digit = num % 10
      addStep(`\n🔢 Extract last digit: ${num} % 10 = ${digit}`)
      sum += digit
      addStep(`➕ Add to sum: ${sum - digit} + ${digit} = ${sum}`)
      num = Math.floor(num / 10)
      addTraceRow({ step, num, digit, sum }, step)
      setCurrentValue(sum)
      await sleep(speed)
      
      addStep(`➗ Remove last digit: num = ${num}`)
    }
    
    if (!pausedRef.current) {
      addStep(`\n✅ Sum of all digits: ${sum}`)
      addStep(`⚡ Time: O(d), Space: O(1) - No string needed!`)
      addTraceRow({ result: sum })
      setCurrentValue(sum)
    }
  }, [speed])

  // Problem 9: Factorial
  const factorialBrute = useCallback(async (n: number) => {
    addStep(`🔍 Calculating ${n}! using LOOP`)
    addStep(`📝 Multiply all numbers from 1 to n`)
    addStep(`This creates intermediate results`)
    addTraceRow({ i: 0, result: 1 }, 0)
    await sleep(speed)
    
    let result = 1
    for (let i = 1; i <= n; i++) {
      if (pausedRef.current) break
      result *= i
      addStep(`🔢 ${i}! = ${result}`)
      addTraceRow({ i, result }, i)
      setCurrentValue(result)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      addStep(`✅ ${n}! = ${result}`)
      addTraceRow({ final: `${n}! = ${result}` })
      setCurrentValue(result)
    }
  }, [speed])

  const factorialOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Calculating ${n}! iteratively`)
    addStep(`📝 Factorial: n! = n × (n-1) × ... × 2 × 1`)
    let result = 1
    addTraceRow({ i: 0, result: 1 }, 0)
    
    for (let i = 1; i <= n; i++) {
      if (pausedRef.current) break
      result *= i
      addStep(`🔢 ${i}! = ${result}`)
      addTraceRow({ i, result }, i)
      setCurrentValue(result)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      addStep(`✅ ${n}! = ${result}`)
      addTraceRow({ result: `${n}! = ${result}` })
      setCurrentValue(result)
    }
  }, [speed])

  // Problem 10: Perfect Square
  const perfectSquareBrute = useCallback(async (n: number) => {
    addStep(`🔍 Checking if ${n} is perfect square (linear)`)
    addStep(`📝 Test all numbers from 0 until i² > n`)
    
    for (let i = 0; i * i <= n; i++) {
      if (pausedRef.current) break
      const square = i * i
      setCurrentValue(i)
      addStep(`🔢 Checking ${i}² = ${square}`)
      addTraceRow({ i, square, match: square === n ? 'YES' : 'NO' }, i)
      await sleep(speed)
      
      if (square === n) {
        addStep(`✅ ${n} = ${i}² (perfect square)`)
        addTraceRow({ result: 'PERFECT SQUARE' })
        setCurrentValue(true)
        return
      }
    }
    
    if (!pausedRef.current) {
      addStep(`✗ ${n} is not a perfect square`)
      addTraceRow({ result: 'NOT PERFECT SQUARE' })
      setCurrentValue(false)
    }
  }, [speed])

  const perfectSquareOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Checking if ${n} is perfect square (binary search)`)
    addStep(`💡 Search for k where k² = ${n}`)
    let left = 0, right = Math.floor(n / 2) + 1
    let step = 0
    
    while (left <= right) {
      if (pausedRef.current) break
      step++
      const mid = Math.floor((left + right) / 2)
      const square = mid * mid
      
      addStep(`🔢 Step ${step}: mid = ${mid}, ${mid}² = ${square}`)
      addTraceRow({ step, left, right, mid, square, compare: square === n ? '=' : square < n ? '<' : '>' }, step)
      setCurrentValue(mid)
      await sleep(speed)
      
      if (square === n) {
        addStep(`✅ ${n} = ${mid}² (perfect square)`)
        addTraceRow({ result: 'PERFECT SQUARE' })
        setCurrentValue(true)
        return
      } else if (square < n) {
        addStep(`${square} < ${n}, search right half`)
        left = mid + 1
      } else {
        addStep(`${square} > ${n}, search left half`)
        right = mid - 1
      }
    }
    
    if (!pausedRef.current) {
      addStep(`✗ ${n} is not a perfect square`)
      addTraceRow({ result: 'NOT PERFECT SQUARE' })
      setCurrentValue(false)
    }
  }, [speed])

  // Problem 11: LCM
  const lcmBrute = useCallback(async (a: number, b: number) => {
    addStep(`🔍 Finding LCM of ${a} and ${b}`)
    addStep(`📝 Check multiples starting from max(a, b)`)
    let result = Math.max(a, b)
    let step = 0
    
    while (true) {
      if (pausedRef.current) break
      step++
      setCurrentValue(result)
      const divA = result % a === 0
      const divB = result % b === 0
      addStep(`🔢 Checking ${result}`)
      addTraceRow({ step, num: result, 'div by a': divA ? 'YES' : 'NO', 'div by b': divB ? 'YES' : 'NO' }, step)
      await sleep(speed)
      
      if (divA && divB) {
        addStep(`✅ LCM(${a}, ${b}) = ${result}`)
        addTraceRow({ result: `LCM = ${result}` })
        setCurrentValue(result)
        return
      }
      result++
    }
  }, [speed])

  const lcmOptimized = useCallback(async (a: number, b: number) => {
    addStep(`🚀 Finding LCM using GCD formula`)
    addStep(`💡 LCM(a,b) = (a × b) / GCD(a,b)`)
    addStep(`🎯 First, find GCD(${a}, ${b})`)
    
    let tempA = a, tempB = b
    let step = 0
    addTraceRow({ step, a: tempA, b: tempB, remainder: '-' }, step)
    
    while (tempB !== 0) {
      if (pausedRef.current) break
      step++
      addStep(`GCD(${tempA}, ${tempB})`)
      const remainder = tempA % tempB
      addTraceRow({ step, a: tempA, b: tempB, remainder }, step)
      await sleep(speed)
      const temp = tempB
      tempB = remainder
      tempA = temp
    }
    
    if (!pausedRef.current) {
      const gcd = tempA
      const lcm = (a * b) / gcd
      addStep(`\n📊 GCD = ${gcd}`)
      addStep(`🔢 LCM = (${a} × ${b}) / ${gcd}`)
      addStep(`✅ LCM = ${a * b} / ${gcd} = ${lcm}`)
      addTraceRow({ gcd, lcm })
      setCurrentValue(lcm)
    }
  }, [speed])

  // Problem 12: Armstrong Number
  const armstrongBrute = useCallback(async (n: number) => {
    addStep(`🔍 Checking if ${n} is Armstrong number`)
    addStep(`📝 Armstrong: sum of digits^length = number`)
    const str = String(n)
    const len = str.length
    addStep(`💡 Number has ${len} digits`)
    addTraceRow({ n, digits: len })
    
    let sum = 0
    for (let i = 0; i < str.length; i++) {
      if (pausedRef.current) break
      const digit = parseInt(str[i])
      const power = Math.pow(digit, len)
      sum += power
      addStep(`🔢 ${digit}^${len} = ${power}, sum = ${sum}`)
      addTraceRow({ i: i + 1, digit, power, sum }, i + 1)
      setCurrentValue(sum)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      const result = sum === n
      addStep(`\n📊 ${sum} ${result ? '===' : '!=='} ${n}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}an Armstrong number`)
      addTraceRow({ result: result ? 'ARMSTRONG' : 'NOT ARMSTRONG' })
      setCurrentValue(result)
    }
  }, [speed])

  const armstrongOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Checking if ${n} is Armstrong (optimized)`)
    addStep(`📝 Armstrong: sum of digits^length = number`)
    const len = String(n).length
    addStep(`💡 Number has ${len} digits`)
    let num = n, sum = 0
    let step = 0
    
    while (num > 0) {
      if (pausedRef.current) break
      step++
      const digit = num % 10
      const power = Math.pow(digit, len)
      sum += power
      addStep(`🔢 ${digit}^${len} = ${power}, sum = ${sum}`)
      addTraceRow({ step, digit, power, sum }, step)
      setCurrentValue(sum)
      await sleep(speed)
      num = Math.floor(num / 10)
    }
    
    if (!pausedRef.current) {
      const result = sum === n
      addStep(`\n📊 Sum = ${sum}, Original = ${n}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}an Armstrong number`)
      addTraceRow({ result: result ? 'ARMSTRONG' : 'NOT ARMSTRONG' })
      setCurrentValue(result)
    }
  }, [speed])

  // Problem 13: Sum of N
  const sumOfNBrute = useCallback(async (n: number) => {
    addStep(`🔍 Calculating sum 1 to ${n} using LOOP`)
    addStep(`📝 Add each number from 1 to ${n}`)
    let sum = 0
    addTraceRow({ i: 0, sum: 0 }, 0)
    
    for (let i = 1; i <= n; i++) {
      if (pausedRef.current) break
      sum += i
      if (i <= 10 || i === n) {
        addStep(`🔢 Add ${i}: sum = ${sum}`)
        addTraceRow({ i, sum }, i)
        setCurrentValue(sum)
        await sleep(speed / 2)
      }
    }
    
    if (!pausedRef.current) {
      addStep(`✅ Sum of 1 to ${n} = ${sum}`)
      addTraceRow({ result: sum })
      setCurrentValue(sum)
    }
  }, [speed])

  const sumOfNOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Calculating sum 1 to ${n} using FORMULA`)
    addStep(`💡 Formula: n × (n + 1) / 2`)
    addStep(`📐 This is Gauss's formula - O(1) time!`)
    addTraceRow({ n, 'n+1': n + 1, formula: 'n×(n+1)/2' })
    await sleep(speed)
    
    const product = n * (n + 1)
    addStep(`🔢 Step 1: ${n} × ${n + 1} = ${product}`)
    addTraceRow({ step: 1, calculation: `${n} × ${n + 1}`, result: product })
    await sleep(speed)
    
    const sum = product / 2
    addStep(`🔢 Step 2: ${product} / 2 = ${sum}`)
    addTraceRow({ step: 2, calculation: `${product} / 2`, result: sum })
    await sleep(speed)
    
    addStep(`✅ Sum of 1 to ${n} = ${sum}`)
    addTraceRow({ final: `Sum = ${sum}` })
    setCurrentValue(sum)
  }, [speed])

  // Problem 14: Binary to Decimal
  const binaryToDecimalBrute = useCallback(async (binary: string) => {
    addStep(`🔍 Converting binary ${binary} to decimal`)
    addStep(`📝 Each position: bit × 2^position`)
    let decimal = 0
    addTraceRow({ position: 'start', bit: '-', power: '-', value: '-', decimal: 0 }, 0)
    
    for (let i = 0; i < binary.length; i++) {
      if (pausedRef.current) break
      const position = binary.length - 1 - i
      const bit = parseInt(binary[i])
      const power = Math.pow(2, position)
      const value = bit * power
      decimal += value
      addStep(`🔢 Position ${position}: ${bit} × 2^${position} = ${value}, total = ${decimal}`)
      addTraceRow({ position, bit, power, value, decimal }, i + 1)
      setCurrentValue(decimal)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      addStep(`✅ Binary ${binary} = Decimal ${decimal}`)
      addTraceRow({ result: decimal })
      setCurrentValue(decimal)
    }
  }, [speed])

  const binaryToDecimalOptimized = useCallback(async (binary: string) => {
    addStep(`🚀 Converting binary ${binary} using POSITIONAL METHOD`)
    addStep(`💡 Each position has value: bit × 2^position`)
    let decimal = 0
    
    addTraceRow({ position: 'start', bit: '-', power: '-', value: '-', decimal: 0 }, 0)
    
    for (let i = 0; i < binary.length; i++) {
      if (pausedRef.current) break
      const position = binary.length - 1 - i
      const bit = parseInt(binary[i])
      const power = Math.pow(2, position)
      const value = bit * power
      decimal += value
      
      addStep(`🔢 Position ${position}: ${bit} × 2^${position} = ${bit} × ${power} = ${value}`)
      addTraceRow({ position, bit, power, value, decimal }, i + 1)
      setCurrentValue(decimal)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      addStep(`✅ Binary ${binary} = Decimal ${decimal}`)
      addTraceRow({ result: decimal })
      setCurrentValue(decimal)
    }
  }, [speed])

  // Problem 15: Decimal to Binary
  const decimalToBinaryBrute = useCallback(async (n: number) => {
    addStep(`🔍 Converting decimal ${n} to binary`)
    addStep(`📝 Divide by 2, collect remainders`)
    let binary = ''
    let num = n
    let step = 0
    
    if (n === 0) {
      addTraceRow({ result: '0' })
      setCurrentValue('0')
      return
    }
    
    while (num > 0) {
      if (pausedRef.current) break
      step++
      const bit = num % 2
      binary = bit + binary
      addStep(`🔢 ${num} % 2 = ${bit}, binary = ${binary}`)
      addTraceRow({ step, num, quotient: Math.floor(num / 2), remainder: bit, binary }, step)
      setCurrentValue(binary)
      await sleep(speed)
      num = Math.floor(num / 2)
    }
    
    if (!pausedRef.current) {
      addStep(`✅ Decimal ${n} = Binary ${binary}`)
      addTraceRow({ result: binary })
      setCurrentValue(binary)
    }
  }, [speed])

  const decimalToBinaryOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Converting decimal ${n} using DIVISION METHOD`)
    addStep(`💡 Divide by 2, collect remainders`)
    let num = n
    let binary = ''
    let step = 0
    
    if (n === 0) {
      addTraceRow({ result: '0' })
      setCurrentValue('0')
      return
    }
    
    while (num > 0) {
      if (pausedRef.current) break
      step++
      const remainder = num % 2
      binary = remainder + binary
      addStep(`🔢 ${num} ÷ 2 = ${Math.floor(num / 2)} remainder ${remainder}`)
      addTraceRow({ step, num, quotient: Math.floor(num / 2), remainder, binary }, step)
      setCurrentValue(binary)
      await sleep(speed)
      num = Math.floor(num / 2)
    }
    
    if (!pausedRef.current) {
      addStep(`✅ Decimal ${n} = Binary ${binary}`)
      addTraceRow({ result: binary })
      setCurrentValue(binary)
    }
  }, [speed])

  // Problem 16: Perfect Number
  const perfectNumberBrute = useCallback(async (n: number) => {
    addStep(`🔍 Checking if ${n} is perfect number`)
    addStep(`📝 Perfect: sum of divisors = number`)
    addStep(`🎯 Check all numbers from 1 to ${n - 1}`)
    let sum = 0
    let step = 0
    
    for (let i = 1; i < n; i++) {
      if (pausedRef.current) break
      if (n % i === 0) {
        step++
        sum += i
        addStep(`🔢 ${i} divides ${n}, sum = ${sum}`)
        addTraceRow({ step, divisor: i, sum }, step)
        setCurrentValue(sum)
        await sleep(speed)
      }
    }
    
    if (!pausedRef.current) {
      const result = sum === n
      addStep(`\n📊 Sum = ${sum}, Original = ${n}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}perfect`)
      addTraceRow({ result: result ? 'PERFECT' : 'NOT PERFECT' })
      setCurrentValue(result)
    }
  }, [speed])

  const perfectNumberOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Checking if ${n} is perfect (optimized)`)
    addStep(`💡 Perfect: sum of divisors = number`)
    addStep(`📐 Check divisors up to √${n}`)
    let sum = 1
    const sqrt = Math.floor(Math.sqrt(n))
    let step = 0
    
    addTraceRow({ step, divisor: 1, pair: '-', sum: 1 }, step)
    
    for (let i = 2; i <= sqrt; i++) {
      if (pausedRef.current) break
      if (n % i === 0) {
        step++
        const pair = n / i
        sum += i
        if (i !== pair) sum += pair
        addStep(`🔢 Found divisors ${i} and ${pair}, sum = ${sum}`)
        addTraceRow({ step, divisor: i, pair: i !== pair ? pair : '-', sum }, step)
        setCurrentValue(sum)
        await sleep(speed)
      }
    }
    
    if (!pausedRef.current) {
      const result = sum === n && n !== 1
      addStep(`\n📊 Sum of divisors = ${sum}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}perfect`)
      addTraceRow({ result: result ? 'PERFECT' : 'NOT PERFECT' })
      setCurrentValue(result)
    }
  }, [speed])

  // Problem 17: Strong Number
  const strongNumberBrute = useCallback(async (n: number) => {
    addStep(`🔍 Checking if ${n} is strong number`)
    addStep(`📝 Strong: sum of factorials of digits = number`)
    addStep(`💡 Example: 145 = 1! + 4! + 5!`)
    const str = String(n)
    let sum = 0
    
    for (let i = 0; i < str.length; i++) {
      if (pausedRef.current) break
      const digit = parseInt(str[i])
      let fact = 1
      for (let j = 1; j <= digit; j++) fact *= j
      sum += fact
      addStep(`🔢 ${digit}! = ${fact}, sum = ${sum}`)
      addTraceRow({ step: i + 1, digit, factorial: fact, sum }, i + 1)
      setCurrentValue(sum)
      await sleep(speed)
    }
    
    if (!pausedRef.current) {
      const result = sum === n
      addStep(`\n📊 Sum = ${sum}, Original = ${n}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}strong`)
      addTraceRow({ result: result ? 'STRONG' : 'NOT STRONG' })
      setCurrentValue(result)
    }
  }, [speed])

  const strongNumberOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Checking if ${n} is strong (with lookup)`)
    addStep(`💡 Strong: sum of factorials of digits = number`)
    addStep(`📊 Using precomputed factorial table`)
    const factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
    let num = n, sum = 0
    let step = 0
    
    while (num > 0) {
      if (pausedRef.current) break
      step++
      const digit = num % 10
      const factorial = factorials[digit]
      sum += factorial
      addStep(`🔢 ${digit}! = ${factorial}, sum = ${sum}`)
      addTraceRow({ step, digit, factorial, sum }, step)
      setCurrentValue(sum)
      await sleep(speed)
      num = Math.floor(num / 10)
    }
    
    if (!pausedRef.current) {
      const result = sum === n
      addStep(`\n📊 Sum = ${sum}, Original = ${n}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}strong`)
      addTraceRow({ result: result ? 'STRONG' : 'NOT STRONG' })
      setCurrentValue(result)
    }
  }, [speed])

  // Problem 18: Automorphic Number
  const automorphicBrute = useCallback(async (n: number) => {
    addStep(`🔍 Checking if ${n} is automorphic`)
    addStep(`📝 Automorphic: n² ends with n`)
    addStep(`💡 Example: 25² = 625 (ends with 25)`)
    addTraceRow({ n })
    await sleep(speed)
    
    const square = n * n
    addStep(`🔢 ${n}² = ${square}`)
    addTraceRow({ step: 1, n, square })
    setCurrentValue(square)
    await sleep(speed)
    
    const squareStr = String(square)
    const nStr = String(n)
    const result = squareStr.endsWith(nStr)
    addStep(`🔍 Does "${squareStr}" end with "${nStr}"?`)
    addTraceRow({ step: 2, squareStr, nStr, endsWith: result ? 'YES' : 'NO' })
    await sleep(speed)
    
    addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}automorphic`)
    addTraceRow({ result: result ? 'AUTOMORPHIC' : 'NOT AUTOMORPHIC' })
    setCurrentValue(result)
  }, [speed])

  const automorphicOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Checking if ${n} is automorphic (modulo)`)
    addStep(`💡 Automorphic: n² ends with n`)
    addStep(`📐 Example: 25² = 625 (ends with 25)`)
    
    const square = n * n
    addStep(`🔢 Step 1: Calculate ${n}² = ${square}`)
    addTraceRow({ step: 1, n, square }, 1)
    await sleep(speed)
    
    const digits = String(n).length
    const mod = Math.pow(10, digits)
    addStep(`🔢 Step 2: Get last ${digits} digits using mod ${mod}`)
    addTraceRow({ step: 2, digits, mod }, 2)
    await sleep(speed)
    
    const lastDigits = square % mod
    addStep(`🔢 Step 3: ${square} % ${mod} = ${lastDigits}`)
    addTraceRow({ step: 3, square, mod, lastDigits }, 3)
    await sleep(speed)
    
    const result = lastDigits === n
    addStep(`\n📊 Last digits: ${lastDigits}, Original: ${n}`)
    addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}automorphic`)
    addTraceRow({ result: result ? 'AUTOMORPHIC' : 'NOT AUTOMORPHIC' })
    setCurrentValue(result)
  }, [speed])

  // Problem 19: Neon Number
  const neonNumberBrute = useCallback(async (n: number) => {
    addStep(`🔍 Checking if ${n} is neon number`)
    addStep(`📝 Neon: sum of digits of n² = n`)
    addStep(`💡 Example: 9² = 81, 8+1 = 9`)
    
    const square = n * n
    addStep(`🔢 ${n}² = ${square}`)
    addTraceRow({ step: 1, n, square })
    setCurrentValue(square)
    await sleep(speed)
    
    let sum = 0
    const str = String(square)
    addStep(`🎯 Sum digits of ${square}`)
    
    for (let i = 0; i < str.length; i++) {
      if (pausedRef.current) break
      const digit = parseInt(str[i])
      sum += digit
      addStep(`➕ Add ${digit}: sum = ${sum}`)
      addTraceRow({ step: i + 2, digit, sum }, i + 2)
      await sleep(speed / 2)
    }
    
    if (!pausedRef.current) {
      const result = sum === n
      addStep(`\n📊 Sum = ${sum}, Original = ${n}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}neon`)
      addTraceRow({ result: result ? 'NEON' : 'NOT NEON' })
      setCurrentValue(result)
    }
  }, [speed])

  const neonNumberOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Checking if ${n} is neon (optimized)`)
    addStep(`💡 Neon: sum of digits of n² = n`)
    addStep(`📐 Example: 9² = 81, 8+1 = 9`)
    
    const square = n * n
    addStep(`🔢 Step 1: ${n}² = ${square}`)
    addTraceRow({ step: 1, n, square }, 1)
    await sleep(speed)
    
    let sum = 0, num = square
    let step = 1
    
    while (num > 0) {
      if (pausedRef.current) break
      step++
      const digit = num % 10
      sum += digit
      addStep(`🔢 Extract digit ${digit}, sum = ${sum}`)
      addTraceRow({ step, num, digit, sum }, step)
      await sleep(speed)
      num = Math.floor(num / 10)
    }
    
    if (!pausedRef.current) {
      const result = sum === n
      addStep(`\n📊 Sum of digits = ${sum}, Original = ${n}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}neon`)
      addTraceRow({ result: result ? 'NEON' : 'NOT NEON' })
      setCurrentValue(result)
    }
  }, [speed])

  // Problem 20: Happy Number
  const happyNumberBrute = useCallback(async (n: number) => {
    addStep(`Checking if ${n} is happy number`)
    addStep(`Happy: sum of squares of digits eventually = 1`)
    
    let num = n
    const seen = new Set()
    
    while (num !== 1 && !seen.has(num)) {
      if (pausedRef.current) break
      seen.add(num)
      let sum = 0
      const str = String(num)
      
      for (let i = 0; i < str.length; i++) {
        const digit = parseInt(str[i])
        sum += digit * digit
      }
      
      addStep(`${num} → ${sum}`)
      setCurrentValue(sum)
      await sleep(speed)
      num = sum
    }
    
    if (!pausedRef.current) {
      const result = num === 1
      addStep(`✅ ${n} is ${result ? '' : 'not '}happy`)
      setCurrentValue(result)
    }
  }, [speed])

  const happyNumberOptimized = useCallback(async (n: number) => {
    addStep(`🚀 Checking if ${n} is happy (Floyd's cycle detection)`)
    addStep(`💡 Happy: repeatedly sum squares of digits → reaches 1`)
    addStep(`📐 Use slow/fast pointers to detect cycles`)
    
    let slow = n, fast = n
    let step = 0
    
    const sumSquares = (num: number) => {
      let sum = 0
      while (num > 0) {
        const digit = num % 10
        sum += digit * digit
        num = Math.floor(num / 10)
      }
      return sum
    }
    
    addTraceRow({ step: 0, slow, fast }, 0)
    
    do {
      if (pausedRef.current) break
      step++
      slow = sumSquares(slow)
      fast = sumSquares(sumSquares(fast))
      
      addStep(`🔢 Step ${step}: slow = ${slow}, fast = ${fast}`)
      addTraceRow({ step, slow, fast, match: slow === fast ? 'YES' : 'NO' }, step)
      setCurrentValue(slow)
      await sleep(speed)
    } while (slow !== fast)
    
    if (!pausedRef.current) {
      const result = slow === 1
      addStep(`\n📊 Cycle detected at ${slow}`)
      addStep(`${result ? '✅' : '❌'} ${n} is ${result ? '' : 'NOT '}happy`)
      addTraceRow({ result: result ? 'HAPPY' : 'NOT HAPPY' })
      setCurrentValue(result)
    }
  }, [speed])

  const handleRun = async () => {
    if (isRunning && !isPaused) return
    
    if (isPaused) {
      setIsPaused(false)
      pausedRef.current = false
      setIsRunning(true)
      return
    }
    
    setIsRunning(true)
    setIsPaused(false)
    pausedRef.current = false
    setSteps([])
    setCurrentValue(null)
    setTraceTable([])
    
    const n = parseInt(input) || 17
    
    try {
      if (selectedProblem === 1) {
        if (selectedSolution === 'brute') await checkPrimeBrute(n)
        else await checkPrimeOptimized(n)
      } else if (selectedProblem === 3) {
        const a = n, b = parseInt(input.split(',')[1]) || 18
        if (selectedSolution === 'brute') await gcdBrute(a, b)
        else await gcdOptimized(a, b)
      } else if (selectedProblem === 4) {
        const x = n, pow = parseInt(input.split(',')[1]) || 10
        if (selectedSolution === 'brute') await powerBrute(x, pow)
        else await powerOptimized(x, pow)
      } else if (selectedProblem === 5) {
        if (selectedSolution === 'brute') await countDigitsBrute(n)
        else await countDigitsOptimized(n)
      } else if (selectedProblem === 6) {
        if (selectedSolution === 'brute') await reverseNumberBrute(n)
        else await reverseNumberOptimized(n)
      } else if (selectedProblem === 7) {
        if (selectedSolution === 'brute') await palindromeBrute(n)
        else await palindromeOptimized(n)
      } else if (selectedProblem === 8) {
        if (selectedSolution === 'brute') await sumDigitsBrute(n)
        else await sumDigitsOptimized(n)
      } else if (selectedProblem === 9) {
        if (selectedSolution === 'brute') await factorialBrute(n)
        else await factorialOptimized(n)
      } else if (selectedProblem === 10) {
        if (selectedSolution === 'brute') await perfectSquareBrute(n)
        else await perfectSquareOptimized(n)
      } else if (selectedProblem === 11) {
        const a = n, b = parseInt(input.split(',')[1]) || 18
        if (selectedSolution === 'brute') await lcmBrute(a, b)
        else await lcmOptimized(a, b)
      } else if (selectedProblem === 12) {
        if (selectedSolution === 'brute') await armstrongBrute(n)
        else await armstrongOptimized(n)
      } else if (selectedProblem === 13) {
        if (selectedSolution === 'brute') await sumOfNBrute(n)
        else await sumOfNOptimized(n)
      } else if (selectedProblem === 14) {
        if (selectedSolution === 'brute') await binaryToDecimalBrute(input)
        else await binaryToDecimalOptimized(input)
      } else if (selectedProblem === 15) {
        if (selectedSolution === 'brute') await decimalToBinaryBrute(n)
        else await decimalToBinaryOptimized(n)
      } else if (selectedProblem === 16) {
        if (selectedSolution === 'brute') await perfectNumberBrute(n)
        else await perfectNumberOptimized(n)
      } else if (selectedProblem === 17) {
        if (selectedSolution === 'brute') await strongNumberBrute(n)
        else await strongNumberOptimized(n)
      } else if (selectedProblem === 18) {
        if (selectedSolution === 'brute') await automorphicBrute(n)
        else await automorphicOptimized(n)
      } else if (selectedProblem === 19) {
        if (selectedSolution === 'brute') await neonNumberBrute(n)
        else await neonNumberOptimized(n)
      } else if (selectedProblem === 20) {
        if (selectedSolution === 'brute') await happyNumberBrute(n)
        else await happyNumberOptimized(n)
      }
    } catch (error) {
      console.error(error)
    }
    
    setIsRunning(false)
  }

  const handlePause = () => {
    pausedRef.current = true
    setIsPaused(true)
    setIsRunning(false)
  }

  const handleStop = () => {
    pausedRef.current = true
    setIsRunning(false)
    setIsPaused(false)
    setSteps([])
    setCurrentValue(null)
    setTraceTable([])
  }

  const problems = [
    { id: 1, name: 'Prime Number', input: '17', desc: 'Check if number is prime' },
    { id: 3, name: 'GCD', input: '48,18', desc: 'Greatest Common Divisor' },
    { id: 4, name: 'Power', input: '2,10', desc: 'Calculate x^n' },
    { id: 5, name: 'Count Digits', input: '12345', desc: 'Count digits in number' },
    { id: 6, name: 'Reverse Number', input: '12345', desc: 'Reverse digits of number' },
    { id: 7, name: 'Palindrome', input: '12321', desc: 'Check if number is palindrome' },
    { id: 8, name: 'Sum of Digits', input: '12345', desc: 'Sum all digits' },
    { id: 9, name: 'Factorial', input: '5', desc: 'Calculate n!' },
    { id: 10, name: 'Perfect Square', input: '16', desc: 'Check if perfect square' },
    { id: 11, name: 'LCM', input: '12,18', desc: 'Least Common Multiple' },
    { id: 12, name: 'Armstrong', input: '153', desc: 'Check Armstrong number' },
    { id: 13, name: 'Sum of N', input: '100', desc: 'Sum 1 to n' },
    { id: 14, name: 'Binary to Decimal', input: '1010', desc: 'Convert binary to decimal' },
    { id: 15, name: 'Decimal to Binary', input: '10', desc: 'Convert decimal to binary' },
    { id: 16, name: 'Perfect Number', input: '28', desc: 'Check if perfect number' },
    { id: 17, name: 'Strong Number', input: '145', desc: 'Check if strong number' },
    { id: 18, name: 'Automorphic', input: '25', desc: 'Check if automorphic' },
    { id: 19, name: 'Neon Number', input: '9', desc: 'Check if neon number' },
    { id: 20, name: 'Happy Number', input: '19', desc: 'Check if happy number' }
  ]

  const currentProblem = problems.find(p => p.id === selectedProblem) || problems[0]

  const problemDescriptions: Record<number, { title: string; description: string; example: string }> = {
    1: {
      title: 'Prime Number',
      description: 'A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. In other words, it can only be divided evenly by 1 and the number itself.',
      example: 'Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23... (2 is the only even prime)'
    },

    3: {
      title: 'Greatest Common Divisor (GCD)',
      description: 'The GCD of two numbers is the largest positive integer that divides both numbers without a remainder. It\'s useful for simplifying fractions and solving various mathematical problems.',
      example: 'GCD(48, 18) = 6 (both 48 and 18 are divisible by 6)'
    },
    4: {
      title: 'Power (Exponentiation)',
      description: 'Calculating x raised to the power of n (x^n) means multiplying x by itself n times. This is a fundamental operation in mathematics and computer science.',
      example: '2^10 = 1024 (multiply 2 by itself 10 times)'
    },
    5: {
      title: 'Count Digits',
      description: 'Counting the number of digits in a number is a basic operation. For example, 12345 has 5 digits. This is useful for validation, formatting, and various algorithms.',
      example: '12345 has 5 digits, 999 has 3 digits, 0 has 1 digit'
    },
    6: {
      title: 'Reverse Number',
      description: 'Reversing a number means reading its digits from right to left. This operation is useful for palindrome checking and various number manipulation tasks.',
      example: '12345 reversed is 54321, 100 reversed is 1'
    },
    7: {
      title: 'Palindrome Number',
      description: 'A palindrome number reads the same forwards and backwards. These numbers have a special symmetry property that makes them interesting in mathematics and computer science.',
      example: '121, 12321, 1001 are palindromes. 123 is not a palindrome.'
    },
    8: {
      title: 'Sum of Digits',
      description: 'Adding all the digits of a number together. This operation is used in various algorithms including checksum calculations and divisibility tests.',
      example: 'Sum of digits of 12345 = 1+2+3+4+5 = 15'
    },
    9: {
      title: 'Factorial',
      description: 'The factorial of n (written as n!) is the product of all positive integers less than or equal to n. It grows very rapidly and is used in permutations, combinations, and probability.',
      example: '5! = 5×4×3×2×1 = 120, 0! = 1 (by definition)'
    },
    10: {
      title: 'Perfect Square',
      description: 'A perfect square is a number that can be expressed as the product of an integer with itself. In other words, it\'s the square of a whole number.',
      example: '16 is a perfect square (4×4), 25 is (5×5), but 20 is not'
    },
    11: {
      title: 'Least Common Multiple (LCM)',
      description: 'The LCM of two numbers is the smallest positive integer that is divisible by both numbers. It\'s useful for adding fractions and solving scheduling problems.',
      example: 'LCM(12, 18) = 36 (smallest number divisible by both)'
    },
    12: {
      title: 'Armstrong Number',
      description: 'An Armstrong number (also called narcissistic number) is a number that equals the sum of its digits each raised to the power of the number of digits.',
      example: '153 = 1³+5³+3³ = 1+125+27 = 153 (Armstrong number)'
    },
    13: {
      title: 'Sum of First N Natural Numbers',
      description: 'Finding the sum of all positive integers from 1 to n. This has a beautiful mathematical formula discovered by young Gauss: n×(n+1)/2.',
      example: 'Sum of 1 to 5 = 1+2+3+4+5 = 15, or 5×6/2 = 15'
    },
    14: {
      title: 'Binary to Decimal Conversion',
      description: 'Converting a binary (base-2) number to decimal (base-10). Each binary digit represents a power of 2, and we sum these values to get the decimal equivalent.',
      example: 'Binary 1010 = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8+0+2+0 = 10'
    },
    15: {
      title: 'Decimal to Binary Conversion',
      description: 'Converting a decimal (base-10) number to binary (base-2). We repeatedly divide by 2 and collect the remainders to build the binary representation.',
      example: 'Decimal 10 = Binary 1010 (10÷2=5 r0, 5÷2=2 r1, 2÷2=1 r0, 1÷2=0 r1)'
    },
    16: {
      title: 'Perfect Number',
      description: 'A perfect number is a positive integer that equals the sum of its proper divisors (divisors excluding the number itself). These are rare and have fascinated mathematicians for centuries.',
      example: '6 = 1+2+3, 28 = 1+2+4+7+14 (both are perfect numbers)'
    },
    17: {
      title: 'Strong Number',
      description: 'A strong number is a number whose sum of the factorials of its digits equals the number itself. Also known as a Krishnamurthy number.',
      example: '145 = 1! + 4! + 5! = 1 + 24 + 120 = 145 (strong number)'
    },
    18: {
      title: 'Automorphic Number',
      description: 'An automorphic number is a number whose square ends with the number itself. These numbers have an interesting self-referential property.',
      example: '25² = 625 (ends with 25), 76² = 5776 (ends with 76)'
    },
    19: {
      title: 'Neon Number',
      description: 'A neon number is a number where the sum of digits of its square equals the number itself. Only a few neon numbers exist.',
      example: '9² = 81, and 8+1 = 9 (neon number). Also: 0, 1'
    },
    20: {
      title: 'Happy Number',
      description: 'A happy number is defined by repeatedly replacing it with the sum of squares of its digits. If this process eventually reaches 1, it\'s happy. If it loops endlessly, it\'s not.',
      example: '19 → 1²+9² = 82 → 8²+2² = 68 → 6²+8² = 100 → 1²+0²+0² = 1 (happy!)'
    }
  }

  const currentDescription = problemDescriptions[selectedProblem]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Coding Problems
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Watch algorithms execute step-by-step
          </p>
        </motion.div>

        {/* Problem Selection */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 flex-wrap mb-3">
            {problems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => {
                  setSelectedProblem(problem.id)
                  setInput(problem.input)
                  handleStop()
                }}
                disabled={isRunning}
                className={`px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  selectedProblem === problem.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                } disabled:opacity-50`}
              >
                {problem.name}
              </button>
            ))}
          </div>

          {/* Problem Description */}
          <motion.div
            key={selectedProblem}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg"
          >
            <h3 className="text-sm font-bold text-cyan-300 mb-2 flex items-center gap-2">
              <span className="text-lg">📚</span>
              {currentDescription.title}
            </h3>
            <p className="text-xs text-gray-300 mb-2 leading-relaxed">
              {currentDescription.description}
            </p>
            <div className="bg-black/30 p-2 rounded border border-cyan-500/20">
              <p className="text-xs text-cyan-200 font-mono">
                <span className="text-yellow-400 font-semibold">Example:</span> {currentDescription.example}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {/* Input */}
            <div>
              <label className="block text-xs font-semibold mb-2">Input</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isRunning}
                placeholder={currentProblem.input}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">{currentProblem.desc}</p>
            </div>

            {/* Solution Type */}
            <div>
              <label className="block text-xs font-semibold mb-2">Solution Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => { setSelectedSolution('brute'); handleStop() }}
                  disabled={isRunning}
                  className={`flex-1 px-3 py-2 rounded-lg transition-colors text-xs whitespace-nowrap ${
                    selectedSolution === 'brute'
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  } disabled:opacity-50`}
                >
                  <TrendingUp size={14} className="inline mr-1" />
                  Brute
                </button>
                <button
                  onClick={() => { setSelectedSolution('optimized'); handleStop() }}
                  disabled={isRunning}
                  className={`flex-1 px-3 py-2 rounded-lg transition-colors text-xs whitespace-nowrap ${
                    selectedSolution === 'optimized'
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  } disabled:opacity-50`}
                >
                  <Zap size={14} className="inline mr-1" />
                  Optimized
                </button>
              </div>
            </div>

            {/* Speed Control */}
            <div>
              <label className="block text-xs font-semibold mb-2">Speed: {speed}ms</label>
              <input
                type="range"
                min="500"
                max="2000"
                step="250"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isRunning}
                className="w-full mt-2"
              />
            </div>

            {/* Action Buttons */}
            <div>
              <label className="block text-xs font-semibold mb-2">Actions</label>
              <div className="flex gap-2">
                {!isRunning && !isPaused && (
                  <button
                    onClick={handleRun}
                    className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg transition-colors text-sm flex-1"
                  >
                    <Play size={16} />
                    Run
                  </button>
                )}
                {isRunning && (
                  <button
                    onClick={handlePause}
                    className="flex items-center justify-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-colors text-sm flex-1"
                  >
                    <Pause size={16} />
                    Pause
                  </button>
                )}
                {isPaused && (
                  <button
                    onClick={handleRun}
                    className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg transition-colors text-sm flex-1"
                  >
                    <Play size={16} />
                    Resume
                  </button>
                )}
                <button
                  onClick={handleStop}
                  disabled={!isRunning && !isPaused}
                  className="flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-3 flex-1 lg:min-h-0">
          <motion.div
            className="lg:col-span-2 glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-2 flex-shrink-0">
              Trace Table
            </h2>
            <div className="flex-1 min-h-0 overflow-auto">
              {traceTable.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    {currentValue !== null && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-6xl font-bold text-cyan-400 mb-4"
                      >
                        {String(currentValue)}
                      </motion.div>
                    )}
                    {!isRunning && !isPaused && steps.length === 0 && (
                      <div className="text-gray-400 text-sm">
                        Click "Run" to see the trace table
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-cyan-500/20 border-b-2 border-cyan-500">
                        {traceTable[0].iteration !== undefined && (
                          <th className="px-2 py-2 text-left font-semibold text-cyan-300">
                            Step
                          </th>
                        )}
                        {Object.keys(traceTable[0].variables).map((key) => (
                          <th
                            key={key}
                            className="px-2 py-2 text-left font-semibold text-cyan-300"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {traceTable.map((row, idx) => (
                        <motion.tr
                          key={idx}
                          ref={idx === traceTable.length - 1 ? traceEndRef : null}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`border-b border-gray-700 ${
                            idx === traceTable.length - 1
                              ? 'bg-cyan-500/10'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          {row.iteration !== undefined && (
                            <td className="px-2 py-2 font-mono text-gray-300">
                              {row.iteration}
                            </td>
                          )}
                          {Object.values(row.variables).map((value, vIdx) => (
                            <td
                              key={vIdx}
                              className="px-2 py-2 font-mono text-gray-200"
                            >
                              {String(value)}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col min-h-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 flex-shrink-0">
              <Code size={18} className="text-cyan-400" />
              Steps
            </h2>
            <div className="flex-1 min-h-0 overflow-auto custom-scrollbar space-y-1">
              {steps.length === 0 ? (
                <div className="text-gray-400 text-xs italic">
                  Execution steps will appear here...
                </div>
              ) : (
                <>
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`text-xs p-2 rounded ${
                        index === steps.length - 1 && !isRunning
                          ? 'bg-cyan-500/20 border border-cyan-500/30'
                          : 'bg-white/5'
                      }`}
                    >
                      <span className="text-cyan-400 font-mono mr-2">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-gray-200">{step}</span>
                    </motion.div>
                  ))}
                  <div ref={stepsEndRef} />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
