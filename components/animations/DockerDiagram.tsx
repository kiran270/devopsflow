import { motion } from 'framer-motion'

interface DockerDiagramProps {
  type: 'architecture' | 'workflow' | 'compose' | 'microservices' | 'cicd' | 'volumes'
}

export default function DockerDiagram({ type }: DockerDiagramProps) {
  if (type === 'architecture') {
    return <DockerArchitecture />
  } else if (type === 'workflow') {
    return <DockerWorkflow />
  } else if (type === 'compose') {
    return <DockerCompose />
  } else if (type === 'microservices') {
    return <DockerMicroservices />
  } else if (type === 'cicd') {
    return <DockerCICD />
  } else if (type === 'volumes') {
    return <DockerVolumes />
  }
  return null
}

// Docker Architecture
function DockerArchitecture() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 300" className="w-full h-auto max-h-48">
        {/* Host OS */}
        <rect x="50" y="220" width="500" height="60" rx="5" fill="#1F2937" />
        <text x="300" y="255" textAnchor="middle" fill="#9CA3AF" fontSize="14">Host Operating System</text>

        {/* Docker Engine */}
        <motion.rect
          x="50" y="150" width="500" height="60" rx="5" fill="#2563EB"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
        <text x="300" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Docker Engine</text>

        {/* Containers */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <rect x="70" y="50" width="120" height="80" rx="5" fill="#10B981" />
          <text x="130" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Container 1</text>
          <text x="130" y="95" textAnchor="middle" fill="white" fontSize="10">Node.js App</text>
          <text x="130" y="110" textAnchor="middle" fill="#D1FAE5" fontSize="9">Isolated Process</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <rect x="240" y="50" width="120" height="80" rx="5" fill="#8B5CF6" />
          <text x="300" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Container 2</text>
          <text x="300" y="95" textAnchor="middle" fill="white" fontSize="10">PostgreSQL</text>
          <text x="300" y="110" textAnchor="middle" fill="#EDE9FE" fontSize="9">Isolated Process</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <rect x="410" y="50" width="120" height="80" rx="5" fill="#F59E0B" />
          <text x="470" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Container 3</text>
          <text x="470" y="95" textAnchor="middle" fill="white" fontSize="10">Redis</text>
          <text x="470" y="110" textAnchor="middle" fill="#FEF3C7" fontSize="9">Isolated Process</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 130 130 L 130 150" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />
        <motion.path d="M 300 130 L 300 150" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.3 }} />
        <motion.path d="M 470 130 L 470 150" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.3 }} />
      </svg>
    </div>
  )
}

// Docker Build & Run Workflow
function DockerWorkflow() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 700 250" className="w-full h-auto max-h-40">
        {/* Dockerfile */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="50" y="100" width="100" height="60" rx="5" fill="#3B82F6" />
          <text x="100" y="125" textAnchor="middle" fill="white" fontSize="12">📄</text>
          <text x="100" y="145" textAnchor="middle" fill="white" fontSize="11">Dockerfile</text>
        </motion.g>

        {/* Build Arrow */}
        <motion.path d="M 150 130 L 220 130" stroke="#10B981" strokeWidth="3" fill="none" markerEnd="url(#arrowgreen)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
        <text x="185" y="120" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold">docker build</text>

        {/* Docker Image */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
          <rect x="220" y="100" width="100" height="60" rx="5" fill="#8B5CF6" />
          <text x="270" y="125" textAnchor="middle" fill="white" fontSize="12">📦</text>
          <text x="270" y="145" textAnchor="middle" fill="white" fontSize="11">Image</text>
        </motion.g>

        {/* Run Arrow */}
        <motion.path d="M 320 130 L 390 130" stroke="#F59E0B" strokeWidth="3" fill="none" markerEnd="url(#arroworange)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.5 }} />
        <text x="355" y="120" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold">docker run</text>

        {/* Container */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6 }}>
          <rect x="390" y="100" width="100" height="60" rx="5" fill="#10B981" />
          <text x="440" y="125" textAnchor="middle" fill="white" fontSize="12">🚀</text>
          <text x="440" y="145" textAnchor="middle" fill="white" fontSize="11">Container</text>
        </motion.g>

        {/* Push to Registry */}
        <motion.path d="M 270 100 L 270 40 L 570 40 L 570 100" stroke="#EC4899" strokeWidth="2" strokeDasharray="5,5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.8, duration: 0.7 }} />
        <text x="420" y="30" textAnchor="middle" fill="#EC4899" fontSize="10">docker push</text>

        {/* Docker Registry */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
          <rect x="520" y="100" width="120" height="60" rx="5" fill="#EC4899" />
          <text x="580" y="125" textAnchor="middle" fill="white" fontSize="12">🏪</text>
          <text x="580" y="145" textAnchor="middle" fill="white" fontSize="10">Docker Hub</text>
        </motion.g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#10B981" />
          </marker>
          <marker id="arroworange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#F59E0B" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

// Docker Compose Multi-Container
function DockerCompose() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 280" className="w-full h-auto max-h-44">
        {/* Docker Compose File */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="50" y="110" width="120" height="60" rx="5" fill="#2563EB" />
          <text x="110" y="135" textAnchor="middle" fill="white" fontSize="11">docker-compose</text>
          <text x="110" y="150" textAnchor="middle" fill="white" fontSize="11">.yml</text>
        </motion.g>

        {/* Network Box */}
        <rect x="230" y="40" width="330" height="200" rx="8" fill="none" stroke="#4B5563" strokeWidth="2" strokeDasharray="5,5" />
        <text x="395" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="12">Docker Network</text>

        {/* Frontend Container */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <rect x="250" y="60" width="90" height="70" rx="5" fill="#10B981" />
          <text x="295" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Frontend</text>
          <text x="295" y="100" textAnchor="middle" fill="white" fontSize="9">React</text>
          <text x="295" y="115" textAnchor="middle" fill="#D1FAE5" fontSize="8">:3000</text>
        </motion.g>

        {/* Backend Container */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <rect x="250" y="150" width="90" height="70" rx="5" fill="#8B5CF6" />
          <text x="295" y="175" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Backend</text>
          <text x="295" y="190" textAnchor="middle" fill="white" fontSize="9">Node.js</text>
          <text x="295" y="205" textAnchor="middle" fill="#EDE9FE" fontSize="8">:5000</text>
        </motion.g>

        {/* Database Container */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <rect x="380" y="105" width="90" height="70" rx="5" fill="#3B82F6" />
          <text x="425" y="130" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Database</text>
          <text x="425" y="145" textAnchor="middle" fill="white" fontSize="9">PostgreSQL</text>
          <text x="425" y="160" textAnchor="middle" fill="#DBEAFE" fontSize="8">:5432</text>
        </motion.g>

        {/* Connections */}
        <motion.path d="M 295 130 L 295 150" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.3 }} />
        <motion.path d="M 340 185 L 380 140" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.3 }} />

        {/* Command Arrow */}
        <motion.path d="M 170 140 L 230 140" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.4 }} />
        <text x="200" y="130" textAnchor="middle" fill="#10B981" fontSize="9">docker-compose up</text>
      </svg>
    </div>
  )
}


// Docker Microservices
function DockerMicroservices() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 200" className="w-full h-auto max-h-36">
        {/* API Gateway */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="40" y="75" width="90" height="50" rx="5" fill="#10B981" />
          <text x="85" y="97" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">API Gateway</text>
          <text x="85" y="112" textAnchor="middle" fill="white" fontSize="8">:80</text>
        </motion.g>

        {/* Microservices */}
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <rect x="180" y="30" width="80" height="45" rx="5" fill="#8B5CF6" />
          <text x="220" y="50" textAnchor="middle" fill="white" fontSize="9">Auth Service</text>
          <text x="220" y="63" textAnchor="middle" fill="white" fontSize="8">:3001</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <rect x="180" y="85" width="80" height="45" rx="5" fill="#EC4899" />
          <text x="220" y="105" textAnchor="middle" fill="white" fontSize="9">User Service</text>
          <text x="220" y="118" textAnchor="middle" fill="white" fontSize="8">:3002</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <rect x="180" y="140" width="80" height="45" rx="5" fill="#F59E0B" />
          <text x="220" y="160" textAnchor="middle" fill="white" fontSize="9">Order Service</text>
          <text x="220" y="173" textAnchor="middle" fill="white" fontSize="8">:3003</text>
        </motion.g>

        {/* Databases */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
          <rect x="310" y="85" width="80" height="45" rx="5" fill="#3B82F6" />
          <text x="350" y="105" textAnchor="middle" fill="white" fontSize="9">PostgreSQL</text>
          <text x="350" y="118" textAnchor="middle" fill="white" fontSize="8">:5432</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
          <rect x="440" y="85" width="80" height="45" rx="5" fill="#EF4444" />
          <text x="480" y="105" textAnchor="middle" fill="white" fontSize="9">Redis</text>
          <text x="480" y="118" textAnchor="middle" fill="white" fontSize="8">:6379</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 130 90 L 180 52" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.2 }} />
        <motion.path d="M 130 100 L 180 107" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.2 }} />
        <motion.path d="M 130 110 L 180 162" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.2 }} />
        <motion.path d="M 260 107 L 310 107" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.2 }} />
        <motion.path d="M 390 107 L 440 107" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.2 }} />
      </svg>
    </div>
  )
}

// Docker CI/CD Pipeline
function DockerCICD() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 650 180" className="w-full h-auto max-h-36">
        {/* Code */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="40" y="65" width="80" height="50" rx="5" fill="#3B82F6" />
          <text x="80" y="87" textAnchor="middle" fill="white" fontSize="10">Git Push</text>
          <text x="80" y="102" textAnchor="middle" fill="white" fontSize="9">📝 Code</text>
        </motion.g>

        {/* Build */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <rect x="160" y="65" width="80" height="50" rx="5" fill="#8B5CF6" />
          <text x="200" y="87" textAnchor="middle" fill="white" fontSize="10">Build</text>
          <text x="200" y="102" textAnchor="middle" fill="white" fontSize="9">🔨 Image</text>
        </motion.g>

        {/* Test */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
          <rect x="280" y="65" width="80" height="50" rx="5" fill="#10B981" />
          <text x="320" y="87" textAnchor="middle" fill="white" fontSize="10">Test</text>
          <text x="320" y="102" textAnchor="middle" fill="white" fontSize="9">✓ Pass</text>
        </motion.g>

        {/* Push Registry */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
          <rect x="400" y="65" width="80" height="50" rx="5" fill="#F59E0B" />
          <text x="440" y="87" textAnchor="middle" fill="white" fontSize="10">Registry</text>
          <text x="440" y="102" textAnchor="middle" fill="white" fontSize="9">📦 Push</text>
        </motion.g>

        {/* Deploy */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}>
          <rect x="520" y="65" width="80" height="50" rx="5" fill="#EC4899" />
          <text x="560" y="87" textAnchor="middle" fill="white" fontSize="10">Deploy</text>
          <text x="560" y="102" textAnchor="middle" fill="white" fontSize="9">🚀 Live</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 120 90 L 160 90" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.2 }} />
        <motion.path d="M 240 90 L 280 90" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.2 }} />
        <motion.path d="M 360 90 L 400 90" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.2 }} />
        <motion.path d="M 480 90 L 520 90" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.2 }} />

        <text x="325" y="150" textAnchor="middle" fill="#9CA3AF" fontSize="10">Automated Docker Pipeline</text>
      </svg>
    </div>
  )
}

// Docker Volumes
function DockerVolumes() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 550 200" className="w-full h-auto max-h-36">
        {/* Host */}
        <rect x="30" y="30" width="490" height="140" rx="8" fill="none" stroke="#4B5563" strokeWidth="2" strokeDasharray="5,5" />
        <text x="275" y="20" textAnchor="middle" fill="#9CA3AF" fontSize="11" fontWeight="bold">Host Machine</text>

        {/* Container 1 */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <rect x="60" y="60" width="100" height="80" rx="5" fill="#3B82F6" />
          <text x="110" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Container 1</text>
          <text x="110" y="100" textAnchor="middle" fill="white" fontSize="9">App</text>
          <rect x="75" y="110" width="70" height="20" rx="3" fill="#60A5FA" />
          <text x="110" y="124" textAnchor="middle" fill="white" fontSize="8">/app/data</text>
        </motion.g>

        {/* Container 2 */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <rect x="200" y="60" width="100" height="80" rx="5" fill="#8B5CF6" />
          <text x="250" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Container 2</text>
          <text x="250" y="100" textAnchor="middle" fill="white" fontSize="9">Database</text>
          <rect x="215" y="110" width="70" height="20" rx="3" fill="#A78BFA" />
          <text x="250" y="124" textAnchor="middle" fill="white" fontSize="8">/var/lib/db</text>
        </motion.g>

        {/* Volume */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <rect x="360" y="70" width="130" height="60" rx="5" fill="#10B981" />
          <text x="425" y="92" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Docker Volume</text>
          <text x="425" y="107" textAnchor="middle" fill="white" fontSize="9">Persistent Data</text>
          <text x="425" y="120" textAnchor="middle" fill="#D1FAE5" fontSize="8">my-volume</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 145 120 L 360 100" stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />
        <motion.path d="M 285 120 L 360 105" stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.3 }} />

        <text x="275" y="185" textAnchor="middle" fill="#9CA3AF" fontSize="9">Data persists even if containers are removed</text>
      </svg>
    </div>
  )
}
