import { motion } from 'framer-motion'

interface KubernetesDiagramProps {
  type: 'architecture' | 'deployment' | 'service'
}

export default function KubernetesDiagram({ type }: KubernetesDiagramProps) {
  if (type === 'architecture') {
    return <K8sArchitecture />
  } else if (type === 'deployment') {
    return <K8sDeployment />
  } else if (type === 'service') {
    return <K8sService />
  }
  return null
}

// Kubernetes Cluster Architecture
function K8sArchitecture() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 700 320" className="w-full h-auto max-h-52">
        {/* Cluster Border */}
        <rect x="30" y="30" width="640" height="260" rx="10" fill="none" stroke="#326CE5" strokeWidth="3" strokeDasharray="8,4" />
        <text x="350" y="20" textAnchor="middle" fill="#326CE5" fontSize="14" fontWeight="bold">Kubernetes Cluster</text>

        {/* Control Plane */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <rect x="50" y="50" width="180" height="220" rx="8" fill="#1E40AF" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
          <text x="140" y="75" textAnchor="middle" fill="#60A5FA" fontSize="12" fontWeight="bold">Control Plane</text>
          
          <rect x="70" y="90" width="140" height="35" rx="4" fill="#3B82F6" />
          <text x="140" y="112" textAnchor="middle" fill="white" fontSize="10">API Server</text>
          
          <rect x="70" y="135" width="140" height="35" rx="4" fill="#3B82F6" />
          <text x="140" y="157" textAnchor="middle" fill="white" fontSize="10">Scheduler</text>
          
          <rect x="70" y="180" width="140" height="35" rx="4" fill="#3B82F6" />
          <text x="140" y="202" textAnchor="middle" fill="white" fontSize="10">Controller</text>
          
          <rect x="70" y="225" width="140" height="35" rx="4" fill="#3B82F6" />
          <text x="140" y="247" textAnchor="middle" fill="white" fontSize="10">etcd</text>
        </motion.g>

        {/* Worker Nodes */}
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <rect x="270" y="50" width="180" height="220" rx="8" fill="#059669" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
          <text x="360" y="75" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">Worker Node 1</text>
          
          <rect x="290" y="90" width="140" height="30" rx="4" fill="#10B981" />
          <text x="360" y="110" textAnchor="middle" fill="white" fontSize="10">Kubelet</text>
          
          <rect x="290" y="130" width="60" height="50" rx="4" fill="#8B5CF6" />
          <text x="320" y="158" textAnchor="middle" fill="white" fontSize="9">Pod 1</text>
          
          <rect x="370" y="130" width="60" height="50" rx="4" fill="#8B5CF6" />
          <text x="400" y="158" textAnchor="middle" fill="white" fontSize="9">Pod 2</text>
          
          <rect x="290" y="190" width="140" height="30" rx="4" fill="#10B981" />
          <text x="360" y="210" textAnchor="middle" fill="white" fontSize="10">kube-proxy</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          <rect x="480" y="50" width="180" height="220" rx="8" fill="#059669" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
          <text x="570" y="75" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">Worker Node 2</text>
          
          <rect x="500" y="90" width="140" height="30" rx="4" fill="#10B981" />
          <text x="570" y="110" textAnchor="middle" fill="white" fontSize="10">Kubelet</text>
          
          <rect x="500" y="130" width="60" height="50" rx="4" fill="#8B5CF6" />
          <text x="530" y="158" textAnchor="middle" fill="white" fontSize="9">Pod 3</text>
          
          <rect x="580" y="130" width="60" height="50" rx="4" fill="#8B5CF6" />
          <text x="610" y="158" textAnchor="middle" fill="white" fontSize="9">Pod 4</text>
          
          <rect x="500" y="190" width="140" height="30" rx="4" fill="#10B981" />
          <text x="570" y="210" textAnchor="middle" fill="white" fontSize="10">kube-proxy</text>
        </motion.g>

        {/* Connections */}
        <motion.path d="M 230 160 L 270 160" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.4 }} />
        <motion.path d="M 230 160 L 480 160" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.4 }} />
      </svg>
    </div>
  )
}

// Deployment with Replicas
function K8sDeployment() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 280" className="w-full h-auto max-h-44">
        {/* Deployment */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <rect x="50" y="100" width="120" height="80" rx="5" fill="#3B82F6" />
          <text x="110" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Deployment</text>
          <text x="110" y="145" textAnchor="middle" fill="white" fontSize="10">my-app</text>
          <text x="110" y="165" textAnchor="middle" fill="#DBEAFE" fontSize="9">replicas: 3</text>
        </motion.g>

        {/* ReplicaSet */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <rect x="230" y="100" width="120" height="80" rx="5" fill="#8B5CF6" />
          <text x="290" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ReplicaSet</text>
          <text x="290" y="145" textAnchor="middle" fill="white" fontSize="9">Manages Pods</text>
          <text x="290" y="165" textAnchor="middle" fill="#EDE9FE" fontSize="9">Ensures 3 replicas</text>
        </motion.g>

        {/* Pods */}
        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <rect x="410" y="50" width="80" height="60" rx="5" fill="#10B981" />
          <text x="450" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Pod 1</text>
          <text x="450" y="95" textAnchor="middle" fill="white" fontSize="9">🚀 Running</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <rect x="410" y="130" width="80" height="60" rx="5" fill="#10B981" />
          <text x="450" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Pod 2</text>
          <text x="450" y="175" textAnchor="middle" fill="white" fontSize="9">🚀 Running</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <rect x="410" y="210" width="80" height="60" rx="5" fill="#10B981" />
          <text x="450" y="235" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Pod 3</text>
          <text x="450" y="255" textAnchor="middle" fill="white" fontSize="9">🚀 Running</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 170 140 L 230 140" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.3 }} />
        <motion.path d="M 350 120 L 410 80" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />
        <motion.path d="M 350 140 L 410 160" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.3 }} />
        <motion.path d="M 350 160 L 410 240" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.3 }} />
      </svg>
    </div>
  )
}

// Service Load Balancing
function K8sService() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 600 280" className="w-full h-auto max-h-44">
        {/* External Traffic */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <circle cx="80" cy="140" r="30" fill="#60A5FA" />
          <text x="80" y="145" textAnchor="middle" fill="white" fontSize="12">🌐</text>
          <text x="80" y="190" textAnchor="middle" fill="#9CA3AF" fontSize="10">External</text>
          <text x="80" y="205" textAnchor="middle" fill="#9CA3AF" fontSize="10">Traffic</text>
        </motion.g>

        {/* Service */}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <rect x="180" y="100" width="140" height="80" rx="5" fill="#8B5CF6" />
          <text x="250" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Service</text>
          <text x="250" y="145" textAnchor="middle" fill="white" fontSize="10">LoadBalancer</text>
          <text x="250" y="165" textAnchor="middle" fill="#EDE9FE" fontSize="9">Port: 80 → 3000</text>
        </motion.g>

        {/* Pods */}
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <rect x="380" y="50" width="90" height="60" rx="5" fill="#10B981" />
          <text x="425" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Pod 1</text>
          <text x="425" y="95" textAnchor="middle" fill="white" fontSize="9">:3000</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <rect x="380" y="130" width="90" height="60" rx="5" fill="#10B981" />
          <text x="425" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Pod 2</text>
          <text x="425" y="175" textAnchor="middle" fill="white" fontSize="9">:3000</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
          <rect x="380" y="210" width="90" height="60" rx="5" fill="#10B981" />
          <text x="425" y="235" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Pod 3</text>
          <text x="425" y="255" textAnchor="middle" fill="white" fontSize="9">:3000</text>
        </motion.g>

        {/* Arrows */}
        <motion.path d="M 110 140 L 180 140" stroke="#60A5FA" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.3 }} />
        <motion.path d="M 320 120 L 380 80" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.3 }} />
        <motion.path d="M 320 140 L 380 160" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3, duration: 0.3 }} />
        <motion.path d="M 320 160 L 380 240" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.3 }} />

        {/* Load Balancing Label */}
        <text x="350" y="30" textAnchor="middle" fill="#9CA3AF" fontSize="10">Round-robin load balancing</text>
      </svg>
    </div>
  )
}
