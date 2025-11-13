import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react'

interface Step {
  title: string
  description: string
  code?: string
  highlight?: string[]
}

interface StepByStepGuideProps {
  steps: Step[]
  currentStep: number
  onStepChange: (step: number) => void
  isPlaying?: boolean
  onPlay?: () => void
  onPause?: () => void
  onReset?: () => void
}

export default function StepByStepGuide({
  steps,
  currentStep,
  onStepChange,
  isPlaying = false,
  onPlay,
  onPause,
  onReset
}: StepByStepGuideProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1)
    }
  }

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Step-by-Step Guide</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Controls */}
            <div className="flex items-center gap-2 mb-4">
              {onPlay && onPause && (
                <button
                  onClick={isPlaying ? onPause : onPlay}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              )}
              {onReset && (
                <button
                  onClick={onReset}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              )}
            </div>

            {/* Step Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Current Step */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <h4 className="text-lg font-semibold mb-2 text-blue-400">
                  {steps[currentStep]?.title}
                </h4>
                <p className="text-gray-300 mb-3">
                  {steps[currentStep]?.description}
                </p>
                
                {steps[currentStep]?.code && (
                  <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">{steps[currentStep].code}</pre>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onStepChange(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep 
                        ? 'bg-blue-500' 
                        : index < currentStep 
                          ? 'bg-green-500' 
                          : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}