import { motion, AnimatePresence } from 'framer-motion'
import { GitCommit, GitBranch } from 'lucide-react'

interface GitVisualizationProps {
  scenario: 'workflow' | 'init' | 'pull' | 'conflict' | 'undo' | 'stash' | 'log' | 'commit' | 'branch' | 'merge' | 'rebase'
  step: number
}

interface Commit {
  id: string
  message: string
  x: number
  y: number
  branch: string
  parents?: string[]
  command?: string
}

export default function GitVisualization({ scenario, step }: GitVisualizationProps) {
  const getCommits = (): Commit[] => {
    if (scenario === 'workflow') {
      const commits: Commit[] = [
        { id: 'A', message: 'Initial', x: 100, y: 200, branch: 'main', command: 'git clone' },
        { id: 'B', message: 'Commit 2', x: 200, y: 200, branch: 'main', parents: ['A'], command: 'git clone' }
      ]

      // After clone (steps 0-2)
      if (step >= 3) {
        // Branch created (step 3-4)
        commits.push({ id: 'C', message: 'Feature', x: 300, y: 150, branch: 'feature', parents: ['B'], command: 'git branch feature' })
      }
      if (step >= 8) {
        // After commit (step 8)
        commits.push({ id: 'D', message: 'New button', x: 400, y: 150, branch: 'feature', parents: ['C'], command: 'git commit -m "Add new button"' })
      }
      return commits
    }

    if (scenario === 'pull') {
      const commits: Commit[] = [
        { id: 'A', message: 'Old', x: 100, y: 200, branch: 'main', command: 'git commit' },
        { id: 'B', message: 'Local', x: 200, y: 200, branch: 'main', parents: ['A'], command: 'git commit' }
      ]
      if (step >= 1) {
        commits.push({ id: 'C', message: 'Remote 1', x: 300, y: 200, branch: 'main', parents: ['B'], command: 'git pull origin main' })
      }
      if (step >= 2) {
        commits.push({ id: 'D', message: 'Remote 2', x: 400, y: 200, branch: 'main', parents: ['C'], command: 'git pull origin main' })
      }
      return commits
    }

    if (scenario === 'conflict') {
      const commits: Commit[] = [
        { id: 'A', message: 'Base', x: 100, y: 200, branch: 'main', command: 'git commit' },
        { id: 'B', message: 'Your change', x: 200, y: 150, branch: 'main', parents: ['A'], command: 'git commit (local)' }
      ]
      if (step >= 0) {
        commits.push({ id: 'C', message: 'Their change', x: 200, y: 250, branch: 'origin', parents: ['A'], command: 'git commit (remote)' })
      }
      if (step >= 4) {
        commits.push({ id: 'M', message: 'Resolved', x: 300, y: 200, branch: 'main', parents: ['B', 'C'], command: 'git commit (resolve)' })
      }
      return commits
    }

    if (scenario === 'init') {
      const commits: Commit[] = []
      if (step >= 6) {
        commits.push({ id: 'A', message: 'Initial', x: 200, y: 200, branch: 'main', command: 'git commit -m "Initial commit"' })
      }
      return commits
    }

    if (scenario === 'undo') {
      const commits: Commit[] = [
        { id: 'A', message: 'Good', x: 100, y: 200, branch: 'main' },
        { id: 'B', message: 'Good', x: 200, y: 200, branch: 'main', parents: ['A'] }
      ]
      if (step >= 5 && step < 8) {
        commits.push({ id: 'C', message: 'Bad msg', x: 300, y: 200, branch: 'main', parents: ['B'] })
      }
      if (step >= 5) {
        commits.push({ id: 'C\'', message: 'Fixed!', x: 300, y: 200, branch: 'main', parents: ['B'] })
      }
      return commits
    }

    if (scenario === 'stash') {
      const commits: Commit[] = [
        { id: 'A', message: 'Base', x: 100, y: 200, branch: 'feature' },
        { id: 'B', message: 'Work', x: 200, y: 200, branch: 'feature', parents: ['A'] }
      ]
      if (step >= 4) {
        commits.push({ id: 'M', message: 'Main', x: 200, y: 250, branch: 'main', parents: ['A'] })
      }
      return commits
    }

    if (scenario === 'log') {
      const commits: Commit[] = [
        { id: 'A', message: 'Initial', x: 100, y: 200, branch: 'main' },
        { id: 'B', message: 'Update', x: 200, y: 200, branch: 'main', parents: ['A'] },
        { id: 'C', message: 'Fix bug', x: 300, y: 200, branch: 'main', parents: ['B'] },
        { id: 'D', message: 'Add auth', x: 400, y: 200, branch: 'main', parents: ['C'] }
      ]
      if (step >= 2) {
        commits.push({ id: 'F', message: 'Feature', x: 300, y: 150, branch: 'feature', parents: ['B'] })
      }
      return commits
    }

    if (scenario === 'commit') {
      const commits: Commit[] = [
        { id: 'A', message: 'Initial commit', x: 100, y: 200, branch: 'main' }
      ]
      if (step >= 1) commits.push({ id: 'B', message: 'Add feature', x: 200, y: 200, branch: 'main', parents: ['A'] })
      if (step >= 2) commits.push({ id: 'C', message: 'Fix bug', x: 300, y: 200, branch: 'main', parents: ['B'] })
      if (step >= 3) commits.push({ id: 'D', message: 'Update docs', x: 400, y: 200, branch: 'main', parents: ['C'] })
      return commits
    }

    if (scenario === 'branch') {
      const commits: Commit[] = [
        { id: 'A', message: 'Initial', x: 100, y: 200, branch: 'main' },
        { id: 'B', message: 'Commit 2', x: 200, y: 200, branch: 'main', parents: ['A'] }
      ]
      if (step >= 2) {
        commits.push({ id: 'C', message: 'Feature work', x: 300, y: 150, branch: 'feature', parents: ['B'] })
      }
      if (step >= 3) {
        commits.push({ id: 'D', message: 'More feature', x: 400, y: 150, branch: 'feature', parents: ['C'] })
      }
      return commits
    }

    if (scenario === 'merge') {
      const commits: Commit[] = [
        { id: 'A', message: 'Initial', x: 100, y: 200, branch: 'main' },
        { id: 'B', message: 'Commit 2', x: 200, y: 200, branch: 'main', parents: ['A'] },
        { id: 'C', message: 'Feature 1', x: 300, y: 150, branch: 'feature', parents: ['B'] },
        { id: 'D', message: 'Feature 2', x: 400, y: 150, branch: 'feature', parents: ['C'] }
      ]
      if (step >= 1) {
        commits.push({ id: 'E', message: 'Main work', x: 300, y: 250, branch: 'main', parents: ['B'] })
      }
      if (step >= 3) {
        commits.push({
          id: 'M',
          message: 'Merge feature',
          x: 500,
          y: 200,
          branch: 'main',
          parents: ['E', 'D']
        })
      }
      return commits
    }

    if (scenario === 'rebase') {
      const commits: Commit[] = [
        { id: 'A', message: 'Initial', x: 100, y: 200, branch: 'main' },
        { id: 'B', message: 'Commit 2', x: 200, y: 200, branch: 'main', parents: ['A'] },
        { id: 'C', message: 'Feature 1', x: 300, y: 150, branch: 'feature', parents: ['B'] }
      ]
      if (step >= 1) {
        commits.push({ id: 'D', message: 'Main work', x: 300, y: 250, branch: 'main', parents: ['B'] })
      }
      if (step >= 2 && step < 3) {
        commits.push({ id: 'E', message: 'Main work 2', x: 400, y: 250, branch: 'main', parents: ['D'] })
      }
      if (step >= 3) {
        commits.push({ id: 'D', message: 'Main work', x: 300, y: 200, branch: 'main', parents: ['B'] })
        commits.push({ id: 'E', message: 'Main work 2', x: 400, y: 200, branch: 'main', parents: ['D'] })
        commits.push({ id: "C'", message: 'Feature 1', x: 500, y: 200, branch: 'feature', parents: ['E'] })
      }
      return commits
    }

    return []
  }

  const commits = getCommits()

  const renderConnections = () => {
    return commits.map(commit => {
      if (!commit.parents) return null
      return commit.parents.map(parentId => {
        const parent = commits.find(c => c.id === parentId)
        if (!parent) return null

        return (
          <motion.line
            key={`${commit.id}-${parentId}`}
            x1={parent.x}
            y1={parent.y}
            x2={commit.x}
            y2={commit.y}
            stroke="#64748b"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      })
    })
  }

  const getBranchColor = (branch: string) => {
    if (branch === 'main') return 'from-blue-500 to-cyan-500'
    if (branch === 'feature') return 'from-green-500 to-emerald-500'
    return 'from-purple-500 to-pink-500'
  }

  const getBranchLabel = (branch: string) => {
    if (branch === 'main') return 'text-blue-400'
    if (branch === 'feature') return 'text-green-400'
    return 'text-purple-400'
  }

  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center overflow-x-auto">
      <svg
        viewBox="0 0 600 400"
        className="w-full h-auto max-w-[600px] min-w-[300px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections */}
        {renderConnections()}

        {/* Commits */}
        <AnimatePresence>
          {commits.map((commit, index) => (
            <motion.g
              key={commit.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {/* Commit circle */}
              <motion.circle
                cx={commit.x}
                cy={commit.y}
                r="25"
                className={`fill-gradient-to-r ${getBranchColor(commit.branch)} cursor-pointer`}
                fill={commit.branch === 'main' ? '#3b82f6' : '#10b981'}
                stroke={commit.branch === 'main' ? '#60a5fa' : '#34d399'}
                strokeWidth="3"
                whileHover={{ scale: 1.2 }}
              >
                {commit.command && (
                  <title>{commit.command}</title>
                )}
              </motion.circle>

              {/* Commit ID */}
              <motion.text
                x={commit.x}
                y={commit.y + 5}
                textAnchor="middle"
                className="fill-white font-bold text-sm pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                {commit.id}
              </motion.text>

              {/* Commit message */}
              <motion.text
                x={commit.x}
                y={commit.y + 45}
                textAnchor="middle"
                className={`text-xs ${getBranchLabel(commit.branch)} fill-current pointer-events-none`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                {commit.message}
              </motion.text>

              {/* Command tooltip on hover */}
              {commit.command && (
                <motion.g
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="pointer-events-none"
                >
                  <rect
                    x={commit.x - 80}
                    y={commit.y - 60}
                    width="160"
                    height="30"
                    rx="5"
                    fill="#1f2937"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    opacity="0.95"
                  />
                  <text
                    x={commit.x}
                    y={commit.y - 40}
                    textAnchor="middle"
                    className="fill-blue-300 text-xs font-mono"
                  >
                    {commit.command}
                  </text>
                </motion.g>
              )}
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Branch labels */}
        {scenario === 'workflow' && step >= 3 && (
          <>
            <motion.text
              x="50"
              y="210"
              className="text-sm font-semibold fill-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              main
            </motion.text>
            {step >= 4 && (
              <motion.text
                x="50"
                y="160"
                className="text-sm font-semibold fill-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                feature
              </motion.text>
            )}
          </>
        )}

        {scenario === 'branch' && step >= 1 && (
          <>
            <motion.text
              x="50"
              y="210"
              className="text-sm font-semibold fill-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              main
            </motion.text>
            {step >= 2 && (
              <motion.text
                x="50"
                y="160"
                className="text-sm font-semibold fill-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                feature
              </motion.text>
            )}
          </>
        )}

        {scenario === 'merge' && (
          <>
            <motion.text
              x="50"
              y="210"
              className="text-sm font-semibold fill-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              main
            </motion.text>
            <motion.text
              x="50"
              y="160"
              className="text-sm font-semibold fill-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              feature
            </motion.text>
          </>
        )}

        {scenario === 'rebase' && (
          <>
            <motion.text
              x="50"
              y="210"
              className="text-sm font-semibold fill-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              main
            </motion.text>
            {step < 3 && (
              <motion.text
                x="50"
                y="160"
                className="text-sm font-semibold fill-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                feature
              </motion.text>
            )}
          </>
        )}
      </svg>
    </div>
  )
}
