import { motion } from 'framer-motion'

interface JenkinsDiagramProps {
  type: 'pipeline' | 'cicd' | 'distributed'
}

export default function JenkinsDiagram({ type }: JenkinsDiagramProps) {
  if (type === 'pipeline') {
    return <JenkinsPipeline />
  } else if (type === 'cicd') {
    return <CICDFlow />
  } else if (type === 'distributed') {
    return <DistributedBuild />
  }
  return null
}

// Jenkins Pipeline Stages
function JenkinsPipeline() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 700 200" className="w-full h-auto max-h-36">
        {/* Stage 1: Checkout */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <rect x="50" y="70" width="90" height="60" rx="5" fill="#3B82F6" />
          <text x="95" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Checkout</text>
          <text x="95" y="115" textAnchor="middle" fill="white" fontSize="9">Git Clone</text>
        </motion.g>

        {/* Stage 2: Build */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <rect x="170" y="70" width="90" height="60" rx="5" fill="#8B5CF6" />
          <text x="215" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Build</text>
          <text x="215" y="115" textAnchor="middle" fill="white" fontSize="9">npm install</text>
        </motion.g>

        {/* Stage 3: Test */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <rect x="290" y="70" width="90" height="60" rx="5" fill="#10B981" />
          <text x="335" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Test</text>
          <text x="335" y="115" textAnchor="middle" fill="white" fontSize="9">npm test</text>
        </motion.g>

        {/* Stage 4: Docker Build */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <rect x="410" y="70" width="90" height="60" rx="5" fill="#F59E0B" />
          <text x="455" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Docker</text>
          <text x="455" y="105" textAnchor="middle" fill="white" fontSize="9">Build Image</text>
          <text x="455" y="120" textAnchor="middle" fill="white" fontSize="8">Push to Registry</text>
        </motion.g>

        {/* Stage 5: Deploy */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <rect x="530" y="70" width="90" height="60" rx="5" fill="#EC4899" />
          <text x="575" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Deploy</text>
          <text x="575" y="115" textAnchor="middle" fill="white" fontSize="9">Production</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 140 100 L 170 100" stroke="#60A5FA" strokeWidth="3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.2 }} />
        <motion.path d="M 260 100 L 290 100" stroke="#60A5FA" strokeWidth="3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.2 }} />
        <motion.path d="M 380 100 L 410 100" stroke="#60A5FA" strokeWidth="3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.2 }} />
        <motion.path d="M 500 100 L 530 100" stroke="#60A5FA" strokeWidth="3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.2 }} />

        {/* Status indicators */}
        <motion.circle cx="95" cy="150" r="8" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }} />
        <motion.circle cx="215" cy="150" r="8" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
        <motion.circle cx="335" cy="150" r="8" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }} />
        <motion.circle cx="455" cy="150" r="8" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }} />
        <motion.circle cx="575" cy="150" r="8" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
        
        <text x="350" y="180" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold">✓ Pipeline Success</text>
      </svg>
    </div>
  )
}

// CI/CD Flow
function CICDFlow() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 650 300" className="w-full h-auto max-h-48">
        {/* Developer */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="80" cy="150" r="30" fill="#60A5FA" />
          <text x="80" y="155" textAnchor="middle" fill="white" fontSize="20">👨‍💻</text>
          <text x="80" y="200" textAnchor="middle" fill="#9CA3AF" fontSize="10">Developer</text>
        </motion.g>

        {/* Git Push */}
        <motion.path d="M 110 150 L 160 150" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.3 }} />
        <text x="135" y="140" textAnchor="middle" fill="#10B981" fontSize="9">git push</text>

        {/* GitHub */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <rect x="160" y="120" width="80" height="60" rx="5" fill="#24292E" />
          <text x="200" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">GitHub</text>
          <text x="200" y="165" textAnchor="middle" fill="#9CA3AF" fontSize="9">Repository</text>
        </motion.g>

        {/* Webhook */}
        <motion.path d="M 240 150 L 290 150" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.3 }} />
        <text x="265" y="140" textAnchor="middle" fill="#F59E0B" fontSize="9">webhook</text>

        {/* Jenkins */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}>
          <rect x="290" y="120" width="80" height="60" rx="5" fill="#D24939" />
          <text x="330" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Jenkins</text>
          <text x="330" y="165" textAnchor="middle" fill="white" fontSize="9">CI Server</text>
        </motion.g>

        {/* Build & Test */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <rect x="290" y="210" width="80" height="50" rx="5" fill="#8B5CF6" />
          <text x="330" y="230" textAnchor="middle" fill="white" fontSize="10">Build & Test</text>
          <text x="330" y="245" textAnchor="middle" fill="white" fontSize="8">✓ All tests pass</text>
        </motion.g>

        {/* Deploy */}
        <motion.path d="M 370 150 L 420 150" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.8, duration: 0.3 }} />
        <text x="395" y="140" textAnchor="middle" fill="#10B981" fontSize="9">deploy</text>

        {/* Production */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.1 }}>
          <rect x="420" y="120" width="100" height="60" rx="5" fill="#10B981" />
          <text x="470" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Production</text>
          <text x="470" y="165" textAnchor="middle" fill="white" fontSize="9">🚀 Live</text>
        </motion.g>

        {/* Notification */}
        <motion.path d="M 330 120 L 330 60 L 80 60 L 80 120" stroke="#EC4899" strokeWidth="2" strokeDasharray="5,5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.4, duration: 0.5 }} />
        <text x="205" y="50" textAnchor="middle" fill="#EC4899" fontSize="9">✓ Build Success Notification</text>

        {/* Timeline */}
        <text x="325" y="290" textAnchor="middle" fill="#9CA3AF" fontSize="10">Automated CI/CD Pipeline (~5 minutes)</text>
      </svg>
    </div>
  )
}

// Distributed Build System
function DistributedBuild() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 300" className="w-full h-auto max-h-48">
        {/* Jenkins Master */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="230" y="30" width="140" height="70" rx="5" fill="#D24939" />
          <text x="300" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Jenkins Master</text>
          <text x="300" y="75" textAnchor="middle" fill="white" fontSize="10">Orchestrator</text>
          <text x="300" y="90" textAnchor="middle" fill="#FCA5A5" fontSize="8">Distributes Jobs</text>
        </motion.g>

        {/* Agent 1 */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <rect x="50" y="170" width="120" height="80" rx="5" fill="#3B82F6" />
          <text x="110" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Agent 1</text>
          <text x="110" y="215" textAnchor="middle" fill="white" fontSize="9">Linux</text>
          <text x="110" y="230" textAnchor="middle" fill="#DBEAFE" fontSize="8">Building...</text>
        </motion.g>

        {/* Agent 2 */}
        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <rect x="240" y="170" width="120" height="80" rx="5" fill="#10B981" />
          <text x="300" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Agent 2</text>
          <text x="300" y="215" textAnchor="middle" fill="white" fontSize="9">Docker</text>
          <text x="300" y="230" textAnchor="middle" fill="#D1FAE5" fontSize="8">Testing...</text>
        </motion.g>

        {/* Agent 3 */}
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <rect x="430" y="170" width="120" height="80" rx="5" fill="#8B5CF6" />
          <text x="490" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Agent 3</text>
          <text x="490" y="215" textAnchor="middle" fill="white" fontSize="9">Windows</text>
          <text x="490" y="230" textAnchor="middle" fill="#EDE9FE" fontSize="8">Deploying...</text>
        </motion.g>

        {/* Connections */}
        <motion.path d="M 280 100 L 110 170" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.3 }} />
        <motion.path d="M 300 100 L 300 170" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.3 }} />
        <motion.path d="M 320 100 L 490 170" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.3 }} />

        {/* Labels */}
        <text x="300" y="145" textAnchor="middle" fill="#9CA3AF" fontSize="10">Parallel Execution</text>
      </svg>
    </div>
  )
}
