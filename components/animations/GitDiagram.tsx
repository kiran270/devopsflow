import { motion } from 'framer-motion'

interface GitDiagramProps {
  type: 'workflow' | 'branching' | 'merge' | 'hotfix' | 'pullrequest' | 'revert'
}

export default function GitDiagram({ type }: GitDiagramProps) {
  if (type === 'workflow') {
    return <GitWorkflow />
  } else if (type === 'branching') {
    return <GitBranching />
  } else if (type === 'merge') {
    return <GitMerge />
  } else if (type === 'hotfix') {
    return <GitHotfix />
  } else if (type === 'pullrequest') {
    return <GitPullRequest />
  } else if (type === 'revert') {
    return <GitRevert />
  }
  return null
}

// Git Basic Workflow
function GitWorkflow() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 650 160" className="w-full h-auto max-h-32">
        {/* Working Directory */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="40" y="55" width="100" height="50" rx="5" fill="#EF4444" />
          <text x="90" y="77" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Working</text>
          <text x="90" y="92" textAnchor="middle" fill="white" fontSize="10">Directory</text>
        </motion.g>

        {/* Staging Area */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <rect x="180" y="55" width="100" height="50" rx="5" fill="#F59E0B" />
          <text x="230" y="77" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Staging</text>
          <text x="230" y="92" textAnchor="middle" fill="white" fontSize="10">Area</text>
        </motion.g>

        {/* Local Repository */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
          <rect x="320" y="55" width="100" height="50" rx="5" fill="#10B981" />
          <text x="370" y="77" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Local</text>
          <text x="370" y="92" textAnchor="middle" fill="white" fontSize="10">Repo</text>
        </motion.g>

        {/* Remote Repository */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
          <rect x="460" y="55" width="100" height="50" rx="5" fill="#3B82F6" />
          <text x="510" y="77" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Remote</text>
          <text x="510" y="92" textAnchor="middle" fill="white" fontSize="9">(GitHub)</text>
        </motion.g>

        {/* Arrows with commands */}
        <motion.path d="M 140 80 L 180 80" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.2 }} />
        <text x="160" y="72" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold">git add</text>

        <motion.path d="M 280 80 L 320 80" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.2 }} />
        <text x="300" y="72" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold">commit</text>

        <motion.path d="M 420 80 L 460 80" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.2 }} />
        <text x="440" y="72" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold">push</text>

        {/* Pull arrow */}
        <motion.path d="M 460 95 L 420 95" stroke="#EC4899" strokeWidth="2" strokeDasharray="4,4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.2 }} />
        <text x="440" y="120" textAnchor="middle" fill="#EC4899" fontSize="9" fontWeight="bold">pull</text>
      </svg>
    </div>
  )
}

// Git Branching Strategy
function GitBranching() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 280" className="w-full h-auto max-h-48">
        {/* Main branch */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="80" cy="140" r="12" fill="#10B981" />
          <circle cx="200" cy="140" r="12" fill="#10B981" />
          <circle cx="440" cy="140" r="12" fill="#10B981" />
          <circle cx="560" cy="140" r="12" fill="#10B981" />
          <path d="M 92 140 L 188 140" stroke="#10B981" strokeWidth="3" fill="none" />
          <path d="M 452 140 L 548 140" stroke="#10B981" strokeWidth="3" fill="none" />
          <text x="80" y="175" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold">main</text>
        </motion.g>

        {/* Feature branch */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <circle cx="260" cy="60" r="12" fill="#8B5CF6" />
          <circle cx="380" cy="60" r="12" fill="#8B5CF6" />
          <path d="M 200 140 L 248 60" stroke="#8B5CF6" strokeWidth="3" fill="none" />
          <path d="M 272 60 L 368 60" stroke="#8B5CF6" strokeWidth="3" fill="none" />
          <path d="M 392 60 L 440 140" stroke="#8B5CF6" strokeWidth="3" fill="none" />
          <text x="320" y="45" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontWeight="bold">feature/new-ui</text>
        </motion.g>

        {/* Hotfix branch */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <circle cx="260" cy="220" r="12" fill="#EF4444" />
          <path d="M 200 140 L 248 220" stroke="#EF4444" strokeWidth="3" fill="none" />
          <path d="M 272 220 L 428 140" stroke="#EF4444" strokeWidth="3" fill="none" />
          <text x="260" y="255" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">hotfix/bug-123</text>
        </motion.g>

        {/* Labels */}
        <text x="80" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="10">C1</text>
        <text x="200" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="10">C2</text>
        <text x="440" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="10">C5</text>
        <text x="560" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="10">C6</text>
        <text x="260" y="90" textAnchor="middle" fill="#9CA3AF" fontSize="10">C3</text>
        <text x="380" y="90" textAnchor="middle" fill="#9CA3AF" fontSize="10">C4</text>
      </svg>
    </div>
  )
}

// Git Merge Process
function GitMerge() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 550 200" className="w-full h-auto max-h-40">
        {/* Main branch before merge */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="80" cy="125" r="12" fill="#10B981" />
          <circle cx="200" cy="125" r="12" fill="#10B981" />
          <path d="M 92 125 L 188 125" stroke="#10B981" strokeWidth="3" fill="none" />
          <text x="140" y="160" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold">main</text>
        </motion.g>

        {/* Feature branch */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <circle cx="260" cy="60" r="12" fill="#8B5CF6" />
          <circle cx="380" cy="60" r="12" fill="#8B5CF6" />
          <path d="M 200 125 L 248 60" stroke="#8B5CF6" strokeWidth="3" fill="none" />
          <path d="M 272 60 L 368 60" stroke="#8B5CF6" strokeWidth="3" fill="none" />
          <text x="320" y="45" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontWeight="bold">feature</text>
        </motion.g>

        {/* Merge commit */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
          <circle cx="480" cy="125" r="14" fill="#F59E0B" />
          <path d="M 392 60 L 466 125" stroke="#8B5CF6" strokeWidth="3" fill="none" />
          <path d="M 212 125 L 466 125" stroke="#10B981" strokeWidth="3" fill="none" />
          <text x="480" y="160" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold">Merge Commit</text>
        </motion.g>

        {/* Merge command */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <rect x="200" y="180" width="280" height="40" rx="5" fill="#1F2937" />
          <text x="340" y="205" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="monospace">
            git merge feature
          </text>
        </motion.g>

        {/* Labels */}
        <text x="80" y="100" textAnchor="middle" fill="#9CA3AF" fontSize="9">C1</text>
        <text x="200" y="100" textAnchor="middle" fill="#9CA3AF" fontSize="9">C2</text>
        <text x="260" y="35" textAnchor="middle" fill="#9CA3AF" fontSize="9">C3</text>
        <text x="380" y="35" textAnchor="middle" fill="#9CA3AF" fontSize="9">C4</text>
        <text x="480" y="100" textAnchor="middle" fill="#9CA3AF" fontSize="9">C5</text>
      </svg>
    </div>
  )
}


// Git Hotfix Workflow
function GitHotfix() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 550 180" className="w-full h-auto max-h-36">
        {/* Main branch */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="60" cy="90" r="10" fill="#10B981" />
          <circle cx="160" cy="90" r="10" fill="#10B981" />
          <circle cx="460" cy="90" r="10" fill="#10B981" />
          <path d="M 70 90 L 150 90" stroke="#10B981" strokeWidth="2" fill="none" />
          <path d="M 470 90 L 520 90" stroke="#10B981" strokeWidth="2" fill="none" />
          <text x="60" y="120" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">main</text>
        </motion.g>

        {/* Hotfix branch */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <circle cx="260" cy="40" r="10" fill="#EF4444" />
          <circle cx="360" cy="40" r="10" fill="#EF4444" />
          <path d="M 160 90 L 250 40" stroke="#EF4444" strokeWidth="2" fill="none" />
          <path d="M 270 40 L 350 40" stroke="#EF4444" strokeWidth="2" fill="none" />
          <path d="M 370 40 L 450 90" stroke="#EF4444" strokeWidth="2" fill="none" />
          <text x="310" y="25" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">hotfix/critical-bug</text>
        </motion.g>

        {/* Labels */}
        <text x="60" y="15" textAnchor="middle" fill="#9CA3AF" fontSize="9">v1.0</text>
        <text x="160" y="15" textAnchor="middle" fill="#9CA3AF" fontSize="9">v1.1</text>
        <text x="260" y="65" textAnchor="middle" fill="#9CA3AF" fontSize="9">Fix</text>
        <text x="360" y="65" textAnchor="middle" fill="#9CA3AF" fontSize="9">Test</text>
        <text x="460" y="15" textAnchor="middle" fill="#9CA3AF" fontSize="9">v1.1.1</text>

        {/* Emergency label */}
        <text x="275" y="150" textAnchor="middle" fill="#EF4444" fontSize="10">🚨 Emergency Fix → Merged in 30 min</text>
      </svg>
    </div>
  )
}

// Git Pull Request Flow
function GitPullRequest() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 180" className="w-full h-auto max-h-36">
        {/* Developer Fork */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="40" y="40" width="100" height="50" rx="5" fill="#8B5CF6" />
          <text x="90" y="62" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Your Fork</text>
          <text x="90" y="77" textAnchor="middle" fill="white" fontSize="9">feature branch</text>
        </motion.g>

        {/* Pull Request */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <rect x="200" y="40" width="100" height="50" rx="5" fill="#F59E0B" />
          <text x="250" y="62" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pull Request</text>
          <text x="250" y="77" textAnchor="middle" fill="white" fontSize="9">Code Review</text>
        </motion.g>

        {/* Code Review */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <circle cx="250" cy="130" r="20" fill="#3B82F6" />
          <text x="250" y="135" textAnchor="middle" fill="white" fontSize="16">👥</text>
          <text x="250" y="160" textAnchor="middle" fill="#9CA3AF" fontSize="9">Reviewers</text>
        </motion.g>

        {/* Upstream Repo */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}>
          <rect x="360" y="40" width="100" height="50" rx="5" fill="#10B981" />
          <text x="410" y="62" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Upstream</text>
          <text x="410" y="77" textAnchor="middle" fill="white" fontSize="9">main branch</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 140 65 L 200 65" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.2 }} />
        <motion.path d="M 250 90 L 250 110" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.2 }} />
        <motion.path d="M 300 65 L 360 65" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.2 }} />

        {/* Labels */}
        <text x="170" y="55" textAnchor="middle" fill="#60A5FA" fontSize="9">Create PR</text>
        <text x="330" y="55" textAnchor="middle" fill="#10B981" fontSize="9">✓ Merge</text>
      </svg>
    </div>
  )
}

// Git Revert/Rollback
function GitRevert() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 550 160" className="w-full h-auto max-h-32">
        {/* Commits */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="60" cy="80" r="10" fill="#10B981" />
          <text x="60" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="9">C1</text>
          <text x="60" y="125" textAnchor="middle" fill="#10B981" fontSize="8">✓ Good</text>
        </motion.g>

        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <circle cx="160" cy="80" r="10" fill="#10B981" />
          <text x="160" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="9">C2</text>
          <text x="160" y="125" textAnchor="middle" fill="#10B981" fontSize="8">✓ Good</text>
        </motion.g>

        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <circle cx="260" cy="80" r="10" fill="#EF4444" />
          <text x="260" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="9">C3</text>
          <text x="260" y="125" textAnchor="middle" fill="#EF4444" fontSize="8">✗ Broken</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <circle cx="360" cy="80" r="10" fill="#F59E0B" />
          <text x="360" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="9">C4</text>
          <text x="360" y="125" textAnchor="middle" fill="#F59E0B" fontSize="8">Revert C3</text>
        </motion.g>

        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <circle cx="460" cy="80" r="10" fill="#10B981" />
          <text x="460" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="9">C5</text>
          <text x="460" y="125" textAnchor="middle" fill="#10B981" fontSize="8">✓ Fixed</text>
        </motion.g>

        {/* Connections */}
        <path d="M 70 80 L 150 80" stroke="#10B981" strokeWidth="2" fill="none" />
        <path d="M 170 80 L 250 80" stroke="#10B981" strokeWidth="2" fill="none" />
        <path d="M 270 80 L 350 80" stroke="#EF4444" strokeWidth="2" fill="none" />
        <path d="M 370 80 L 450 80" stroke="#F59E0B" strokeWidth="2" fill="none" />

        {/* Revert arrow */}
        <motion.path d="M 360 70 Q 310 40 260 70" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4,4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />
        <text x="310" y="35" textAnchor="middle" fill="#F59E0B" fontSize="9">git revert</text>

        {/* Command */}
        <text x="275" y="150" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">git revert HEAD~1</text>
      </svg>
    </div>
  )
}
