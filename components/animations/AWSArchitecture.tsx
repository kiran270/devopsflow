import { motion } from 'framer-motion'

interface AWSArchitectureProps {
  type: 'web-app' | 'serverless' | 'data-pipeline' | 'microservices'
}

export default function AWSArchitecture({ type }: AWSArchitectureProps) {
  if (type === 'web-app') {
    return <WebAppArchitecture />
  } else if (type === 'serverless') {
    return <ServerlessArchitecture />
  } else if (type === 'data-pipeline') {
    return <DataPipelineArchitecture />
  } else if (type === 'microservices') {
    return <MicroservicesArchitecture />
  }
  return null
}

// Scalable Web Application Architecture (Compact)
function WebAppArchitecture() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 220" className="w-full h-auto max-h-40">
        {/* User */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="60" cy="110" r="20" fill="#60A5FA" />
          <text x="60" y="115" textAnchor="middle" fill="white" fontSize="16">👤</text>
        </motion.g>

        {/* CloudFront */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <rect x="120" y="90" width="70" height="40" rx="5" fill="#8B5CF6" />
          <text x="155" y="115" textAnchor="middle" fill="white" fontSize="10">CloudFront</text>
        </motion.g>

        {/* ALB */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <rect x="230" y="90" width="60" height="40" rx="5" fill="#10B981" />
          <text x="260" y="115" textAnchor="middle" fill="white" fontSize="10">ALB</text>
        </motion.g>

        {/* EC2 Instances */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <rect x="220" y="160" width="40" height="40" rx="4" fill="#EC4899" />
          <text x="240" y="185" textAnchor="middle" fill="white" fontSize="9">EC2</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <rect x="270" y="160" width="40" height="40" rx="4" fill="#EC4899" />
          <text x="290" y="185" textAnchor="middle" fill="white" fontSize="9">EC2</text>
        </motion.g>

        {/* RDS */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <rect x="350" y="90" width="70" height="40" rx="5" fill="#3B82F6" />
          <text x="385" y="115" textAnchor="middle" fill="white" fontSize="10">RDS</text>
        </motion.g>

        {/* S3 */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
          <rect x="460" y="90" width="60" height="40" rx="5" fill="#10B981" />
          <text x="490" y="115" textAnchor="middle" fill="white" fontSize="10">S3</text>
        </motion.g>

        {/* ElastiCache */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
          <rect x="350" y="160" width="70" height="40" rx="5" fill="#EF4444" />
          <text x="385" y="185" textAnchor="middle" fill="white" fontSize="9">Cache</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 80 110 L 120 110" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.2 }} />
        <motion.path d="M 190 110 L 230 110" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.2 }} />
        <motion.path d="M 260 130 L 240 160" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.2 }} />
        <motion.path d="M 260 130 L 290 160" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.2 }} />
        <motion.path d="M 290 110 L 350 110" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3, duration: 0.2 }} />
        <motion.path d="M 290 110 L 460 110" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.2 }} />

        <text x="300" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="10">Auto-Scaling Web App</text>
      </svg>
    </div>
  )
}

// Serverless API Architecture (Compact)
function ServerlessArchitecture() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 220" className="w-full h-auto max-h-40">
        {/* User */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="60" cy="110" r="20" fill="#60A5FA" />
          <text x="60" y="115" textAnchor="middle" fill="white" fontSize="16">📱</text>
        </motion.g>

        {/* API Gateway */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <rect x="120" y="85" width="90" height="50" rx="5" fill="#10B981" />
          <text x="165" y="107" textAnchor="middle" fill="white" fontSize="10">API</text>
          <text x="165" y="122" textAnchor="middle" fill="white" fontSize="10">Gateway</text>
        </motion.g>

        {/* Lambda Functions */}
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <rect x="260" y="50" width="70" height="40" rx="5" fill="#FF9900" />
          <text x="295" y="75" textAnchor="middle" fill="white" fontSize="9">Lambda</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <rect x="260" y="100" width="70" height="40" rx="5" fill="#FF9900" />
          <text x="295" y="125" textAnchor="middle" fill="white" fontSize="9">Lambda</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <rect x="260" y="150" width="70" height="40" rx="5" fill="#FF9900" />
          <text x="295" y="175" textAnchor="middle" fill="white" fontSize="9">Lambda</text>
        </motion.g>

        {/* DynamoDB */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
          <rect x="380" y="90" width="90" height="50" rx="5" fill="#3B82F6" />
          <text x="425" y="120" textAnchor="middle" fill="white" fontSize="10">DynamoDB</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 80 110 L 120 110" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.2 }} />
        <motion.path d="M 210 100 L 260 70" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.2 }} />
        <motion.path d="M 210 110 L 260 120" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.2 }} />
        <motion.path d="M 210 120 L 260 170" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.2 }} />
        <motion.path d="M 330 120 L 380 115" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.2 }} />

        <text x="300" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="10">Serverless API</text>
      </svg>
    </div>
  )
}

// Data Pipeline Architecture (Compact)
function DataPipelineArchitecture() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 650 220" className="w-full h-auto max-h-40">
        {/* Data Sources */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="50" y="85" width="70" height="50" rx="5" fill="#8B5CF6" />
          <text x="85" y="115" textAnchor="middle" fill="white" fontSize="10">IoT/Apps</text>
        </motion.g>

        {/* Kinesis */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <rect x="160" y="85" width="80" height="50" rx="5" fill="#FF9900" />
          <text x="200" y="115" textAnchor="middle" fill="white" fontSize="10">Kinesis</text>
        </motion.g>

        {/* Lambda */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <rect x="280" y="85" width="70" height="50" rx="5" fill="#10B981" />
          <text x="315" y="115" textAnchor="middle" fill="white" fontSize="10">Lambda</text>
        </motion.g>

        {/* S3 Data Lake */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <rect x="390" y="85" width="80" height="50" rx="5" fill="#3B82F6" />
          <text x="430" y="110" textAnchor="middle" fill="white" fontSize="10">S3</text>
          <text x="430" y="125" textAnchor="middle" fill="white" fontSize="9">Data Lake</text>
        </motion.g>

        {/* Athena */}
        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <rect x="390" y="155" width="80" height="45" rx="5" fill="#EC4899" />
          <text x="430" y="182" textAnchor="middle" fill="white" fontSize="10">Athena</text>
        </motion.g>

        {/* QuickSight */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}>
          <rect x="510" y="105" width="90" height="50" rx="5" fill="#8B5CF6" />
          <text x="555" y="135" textAnchor="middle" fill="white" fontSize="10">QuickSight</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 120 110 L 160 110" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.2 }} />
        <motion.path d="M 240 110 L 280 110" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.2 }} />
        <motion.path d="M 350 110 L 390 110" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.2 }} />
        <motion.path d="M 430 135 L 430 155" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.2 }} />
        <motion.path d="M 470 177 L 510 130" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.2 }} />

        <text x="325" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="10">Real-time Data Pipeline</text>
      </svg>
    </div>
  )
}

// Microservices Architecture (Compact)
function MicroservicesArchitecture() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 240" className="w-full h-auto max-h-44">
        {/* User */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="60" cy="120" r="20" fill="#60A5FA" />
          <text x="60" y="125" textAnchor="middle" fill="white" fontSize="16">👤</text>
        </motion.g>

        {/* ALB */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <rect x="120" y="100" width="70" height="40" rx="5" fill="#10B981" />
          <text x="155" y="125" textAnchor="middle" fill="white" fontSize="10">ALB</text>
        </motion.g>

        {/* EKS Cluster */}
        <rect x="230" y="30" width="330" height="190" rx="8" fill="none" stroke="#326CE5" strokeWidth="2" strokeDasharray="5,5" />
        <text x="395" y="25" textAnchor="middle" fill="#326CE5" fontSize="11" fontWeight="bold">EKS Cluster</text>

        {/* Microservices */}
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <rect x="250" y="50" width="80" height="45" rx="5" fill="#EC4899" />
          <text x="290" y="70" textAnchor="middle" fill="white" fontSize="9">Auth</text>
          <text x="290" y="85" textAnchor="middle" fill="white" fontSize="8">Service</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <rect x="250" y="105" width="80" height="45" rx="5" fill="#8B5CF6" />
          <text x="290" y="125" textAnchor="middle" fill="white" fontSize="9">User</text>
          <text x="290" y="140" textAnchor="middle" fill="white" fontSize="8">Service</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <rect x="250" y="160" width="80" height="45" rx="5" fill="#F59E0B" />
          <text x="290" y="180" textAnchor="middle" fill="white" fontSize="9">Order</text>
          <text x="290" y="195" textAnchor="middle" fill="white" fontSize="8">Service</text>
        </motion.g>

        {/* RDS */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
          <rect x="380" y="105" width="70" height="45" rx="5" fill="#3B82F6" />
          <text x="415" y="132" textAnchor="middle" fill="white" fontSize="10">RDS</text>
        </motion.g>

        {/* Redis */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}>
          <rect x="470" y="50" width="70" height="45" rx="5" fill="#EF4444" />
          <text x="505" y="77" textAnchor="middle" fill="white" fontSize="10">Redis</text>
        </motion.g>

        {/* SQS */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}>
          <rect x="470" y="160" width="70" height="45" rx="5" fill="#EC4899" />
          <text x="505" y="187" textAnchor="middle" fill="white" fontSize="10">SQS</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 80 120 L 120 120" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.2 }} />
        <motion.path d="M 190 115 L 250 72" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.2 }} />
        <motion.path d="M 190 120 L 250 127" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.2 }} />
        <motion.path d="M 190 125 L 250 182" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.2 }} />
        <motion.path d="M 330 127 L 380 127" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.2 }} />
        <motion.path d="M 330 72 L 470 72" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.2 }} />
        <motion.path d="M 330 182 L 470 182" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3, duration: 0.2 }} />

        <text x="300" y="230" textAnchor="middle" fill="#9CA3AF" fontSize="9">Container Orchestration</text>
      </svg>
    </div>
  )
}
