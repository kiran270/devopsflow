import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Package, Rocket, GitBranch, Database, Network, Shield } from 'lucide-react'
import KubernetesDiagram from '../components/animations/KubernetesDiagram'

export default function Kubernetes() {
  const [scenario, setScenario] = useState<'intro' | 'basics' | 'pods' | 'deployments' | 'services' | 'configmaps' | 'production' | 'usecases'>('intro')

  const scenarios = {
    intro: {
      name: 'Introduction to Kubernetes',
      description: 'Learn what Kubernetes is and why teams use it',
      steps: [
        {
          stage: 'Step 1',
          title: 'What is Kubernetes?',
          code: `Kubernetes (K8s) is a container orchestration platform that 
automates deploying, scaling, and managing containerized applications.

It handles the complexity of running containers at scale 
across multiple servers.`,
          explanation: 'Kubernetes is the industry standard for container orchestration, used by companies like Google, Netflix, and Spotify.',
          concept: 'Container Orchestration',
          useCase: '🎯 Real World: Managing thousands of containers across hundreds of servers automatically'
        },
        {
          stage: 'Step 2',
          title: 'What Kubernetes Does',
          code: `• Automatically scales apps based on load
• Self-heals by restarting failed containers
• Distributes traffic across containers
• Zero-downtime rolling updates
• Manages secrets and configuration
• Schedules containers across cluster nodes`,
          explanation: 'Kubernetes automates the operational tasks of running containerized applications at scale.',
          concept: 'Automation Benefits',
          useCase: '🎯 Real World: Your app automatically scales from 3 to 100 pods during traffic spikes'
        },
        {
          stage: 'Step 3',
          title: 'Real-World Use Cases',
          code: `• Running microservices at scale
• Auto-scaling during traffic spikes
• Multi-cloud deployments
• High availability applications
• Efficient resource utilization
• CI/CD deployment targets`,
          explanation: 'Kubernetes enables modern cloud-native architectures and DevOps practices.',
          concept: 'Industry Usage',
          useCase: '🎯 Real World: Deploy once, run anywhere - on-premise, AWS, GCP, or Azure'
        },
        {
          stage: 'Step 4',
          title: 'Kubernetes Architecture',
          code: `1. 📝 Write YAML - Define desired state
2. ☸️ kubectl apply - Submit to cluster
3. 🎯 Control Plane - Schedules workloads
4. 📦 Nodes - Run containers in Pods
5. 🌐 Services - Load balance traffic
6. 🔄 Controllers - Maintain desired state

Kubernetes continuously works to match actual state with desired state!`,
          explanation: 'Kubernetes uses a declarative model - you describe what you want, it figures out how to achieve it.',
          concept: 'Declarative Management',
          useCase: '🎯 Real World: Say "I want 5 replicas" and Kubernetes ensures there are always 5 running'
        }
      ]
    },
    basics: {
      name: 'Kubernetes Basics',
      description: 'Learn fundamental Kubernetes concepts and commands',
      steps: [
        {
          stage: 'Step 1',
          title: 'Check Cluster Info',
          code: `kubectl cluster-info
kubectl get nodes`,
          explanation: 'Verify your cluster is running and see available nodes. Nodes are the worker machines in Kubernetes.',
          concept: 'Cluster Management',
          useCase: '🎯 Real World: First thing to check when troubleshooting - is the cluster healthy?'
        },
        {
          stage: 'Step 2',
          title: 'View All Resources',
          code: `kubectl get all
kubectl get all -A  # All namespaces`,
          explanation: 'See all resources in current namespace. -A flag shows resources across all namespaces.',
          concept: 'Resource Discovery',
          useCase: '🎯 Real World: Getting an overview of what is running in your cluster'
        },
        {
          stage: 'Step 3',
          title: 'Describe Resources',
          code: `kubectl describe node <node-name>
kubectl describe pod <pod-name>`,
          explanation: 'Get detailed information about a resource including events and status.',
          concept: 'Resource Inspection',
          useCase: '🎯 Real World: Debugging why a pod is not starting - check events section'
        },
        {
          stage: 'Step 4',
          title: 'View Logs',
          code: `kubectl logs <pod-name>
kubectl logs -f <pod-name>  # Follow logs
kubectl logs <pod-name> -c <container-name>  # Specific container`,
          explanation: 'View application logs from pods. -f follows logs in real-time like tail -f.',
          concept: 'Debugging',
          useCase: '🎯 Real World: Checking application errors without SSH into containers'
        },
        {
          stage: 'Step 5',
          title: 'Execute Commands in Pod',
          code: `kubectl exec -it <pod-name> -- sh
kubectl exec <pod-name> -- ls /app`,
          explanation: '-it gives interactive terminal. Useful for debugging inside running containers.',
          concept: 'Pod Access',
          useCase: '🎯 Real World: Checking file permissions or running database migrations'
        },
        {
          stage: 'Step 6',
          title: 'Port Forwarding',
          code: `kubectl port-forward pod/<pod-name> 8080:80
kubectl port-forward service/<service-name> 8080:80`,
          explanation: 'Forward local port to pod or service. Access cluster resources from localhost.',
          concept: 'Local Access',
          useCase: '🎯 Real World: Testing a service locally before exposing it publicly'
        },
        {
          stage: 'Step 7',
          title: 'Apply Configuration',
          code: `kubectl apply -f deployment.yaml
kubectl apply -f ./k8s/  # Apply directory`,
          explanation: 'Create or update resources from YAML files. Apply is idempotent - safe to run multiple times.',
          concept: 'Declarative Management',
          useCase: '🎯 Real World: Deploying applications using GitOps workflow'
        },
        {
          stage: 'Step 8',
          title: 'Delete Resources',
          code: `kubectl delete pod <pod-name>
kubectl delete -f deployment.yaml
kubectl delete all --all  # Delete everything in namespace`,
          explanation: 'Remove resources. Be careful with delete all --all in production!',
          concept: 'Resource Cleanup',
          useCase: '🎯 Real World: Cleaning up test deployments or removing failed pods'
        }
      ]
    },
    pods: {
      name: 'Pods & Containers',
      description: 'Understanding the smallest deployable units',
      steps: [
        {
          stage: 'Step 1',
          title: 'Simple Pod Definition',
          code: `apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - containerPort: 80`,
          explanation: 'A Pod is the smallest unit in Kubernetes. It can contain one or more containers.',
          concept: 'Pod Basics',
          useCase: '🎯 Real World: Running a simple web server for testing'
        },
        {
          stage: 'Step 2',
          title: 'Multi-Container Pod',
          code: `apiVersion: v1
kind: Pod
metadata:
  name: app-with-sidecar
spec:
  containers:
  - name: app
    image: myapp:latest
    ports:
    - containerPort: 8080
  - name: log-collector
    image: fluentd:latest
    volumeMounts:
    - name: logs
      mountPath: /var/log
  volumes:
  - name: logs
    emptyDir: {}`,
          explanation: 'Multiple containers in same pod share network and storage. Common for sidecar patterns.',
          concept: 'Sidecar Pattern',
          useCase: '🎯 Real World: App container + logging sidecar that ships logs to central system'
        },
        {
          stage: 'Step 3',
          title: 'Resource Limits',
          code: `spec:
  containers:
  - name: app
    image: myapp:latest
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"`,
          explanation: 'Requests: guaranteed resources. Limits: maximum allowed. Prevents resource starvation.',
          concept: 'Resource Management',
          useCase: '🎯 Real World: Preventing one pod from consuming all cluster resources'
        },
        {
          stage: 'Step 4',
          title: 'Health Checks',
          code: `spec:
  containers:
  - name: app
    image: myapp:latest
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5`,
          explanation: 'Liveness: restart if unhealthy. Readiness: remove from service if not ready.',
          concept: 'Health Monitoring',
          useCase: '🎯 Real World: Auto-restart crashed apps, remove slow-starting pods from load balancer'
        },
        {
          stage: 'Step 5',
          title: 'Environment Variables',
          code: `spec:
  containers:
  - name: app
    image: myapp:latest
    env:
    - name: DATABASE_URL
      value: "postgresql://db:5432/myapp"
    - name: API_KEY
      valueFrom:
        secretKeyRef:
          name: api-secrets
          key: api-key`,
          explanation: 'Set env vars directly or reference from ConfigMaps/Secrets.',
          concept: 'Configuration',
          useCase: '🎯 Real World: Different configs for dev/staging/prod environments'
        },
        {
          stage: 'Step 6',
          title: 'Init Containers',
          code: `spec:
  initContainers:
  - name: init-db
    image: busybox
    command: ['sh', '-c', 'until nc -z db 5432; do sleep 1; done']
  containers:
  - name: app
    image: myapp:latest`,
          explanation: 'Init containers run before app containers. Must complete successfully.',
          concept: 'Initialization',
          useCase: '🎯 Real World: Wait for database to be ready before starting app'
        }
      ]
    },
    deployments: {
      name: 'Deployments & Scaling',
      description: 'Manage application lifecycle and scaling',
      steps: [
        {
          stage: 'Step 1',
          title: 'Basic Deployment',
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80`,
          explanation: 'Deployment manages ReplicaSets which manage Pods. Ensures desired number of replicas.',
          concept: 'Deployment Basics',
          useCase: '🎯 Real World: Running 3 replicas of your web app for high availability'
        },
        {
          stage: 'Step 2',
          title: 'Rolling Update',
          code: `kubectl set image deployment/nginx-deployment nginx=nginx:1.22
kubectl rollout status deployment/nginx-deployment`,
          explanation: 'Updates pods gradually. Old pods removed only after new ones are ready.',
          concept: 'Zero-Downtime Updates',
          useCase: '🎯 Real World: Deploying new version without service interruption'
        },
        {
          stage: 'Step 3',
          title: 'Rollback',
          code: `kubectl rollout history deployment/nginx-deployment
kubectl rollout undo deployment/nginx-deployment
kubectl rollout undo deployment/nginx-deployment --to-revision=2`,
          explanation: 'View deployment history and rollback to previous versions.',
          concept: 'Rollback Strategy',
          useCase: '🎯 Real World: Quick recovery when new deployment has bugs'
        },
        {
          stage: 'Step 4',
          title: 'Scaling',
          code: `kubectl scale deployment/nginx-deployment --replicas=5
# Or edit deployment
kubectl edit deployment/nginx-deployment`,
          explanation: 'Manually scale up or down. Kubernetes creates/removes pods to match desired state.',
          concept: 'Manual Scaling',
          useCase: '🎯 Real World: Scale up before Black Friday, scale down after'
        },
        {
          stage: 'Step 5',
          title: 'Horizontal Pod Autoscaler',
          code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`,
          explanation: 'Automatically scale based on CPU/memory usage or custom metrics.',
          concept: 'Auto-Scaling',
          useCase: '🎯 Real World: Handle traffic spikes automatically without manual intervention'
        },
        {
          stage: 'Step 6',
          title: 'Update Strategy',
          code: `spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Max pods above desired during update
      maxUnavailable: 1  # Max pods unavailable during update`,
          explanation: 'Control how updates happen. Balance between speed and availability.',
          concept: 'Update Control',
          useCase: '🎯 Real World: Ensure at least 2 pods always available during deployment'
        }
      ]
    },
    services: {
      name: 'Services & Networking',
      description: 'Expose and connect applications',
      steps: [
        {
          stage: 'Step 1',
          title: 'ClusterIP Service',
          code: `apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP  # Default, internal only
  selector:
    app: backend
  ports:
  - port: 80
    targetPort: 8080`,
          explanation: 'ClusterIP: internal service, accessible only within cluster. Most common type.',
          concept: 'Internal Service',
          useCase: '🎯 Real World: Backend API that should only be accessed by frontend pods'
        },
        {
          stage: 'Step 2',
          title: 'NodePort Service',
          code: `apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 30080  # Optional, auto-assigned if omitted`,
          explanation: 'NodePort: exposes service on each node IP at a static port (30000-32767).',
          concept: 'External Access',
          useCase: '🎯 Real World: Quick way to expose service for testing without load balancer'
        },
        {
          stage: 'Step 3',
          title: 'LoadBalancer Service',
          code: `apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 8080`,
          explanation: 'LoadBalancer: creates external load balancer (cloud provider specific).',
          concept: 'Production Exposure',
          useCase: '🎯 Real World: Production web app with cloud load balancer (AWS ELB, GCP LB)'
        },
        {
          stage: 'Step 4',
          title: 'Ingress',
          code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80`,
          explanation: 'Ingress: HTTP/HTTPS routing to services. One load balancer for multiple services.',
          concept: 'HTTP Routing',
          useCase: '🎯 Real World: Route myapp.com/ to frontend, myapp.com/api to backend'
        },
        {
          stage: 'Step 5',
          title: 'Service Discovery',
          code: `# Pods can access services by name
curl http://backend-service
curl http://backend-service.default.svc.cluster.local

# Environment variables automatically created
echo $BACKEND_SERVICE_SERVICE_HOST
echo $BACKEND_SERVICE_SERVICE_PORT`,
          explanation: 'Services get DNS names. Pods can discover and connect to services by name.',
          concept: 'DNS Discovery',
          useCase: '🎯 Real World: Frontend connects to backend without hardcoded IPs'
        }
      ]
    },
    configmaps: {
      name: 'ConfigMaps & Secrets',
      description: 'Manage configuration and sensitive data',
      steps: [
        {
          stage: 'Step 1',
          title: 'ConfigMap from Literal',
          code: `kubectl create configmap app-config \\
  --from-literal=DATABASE_HOST=postgres \\
  --from-literal=DATABASE_PORT=5432`,
          explanation: 'ConfigMaps store non-sensitive configuration data as key-value pairs.',
          concept: 'Configuration Storage',
          useCase: '🎯 Real World: Store database connection strings, API endpoints'
        },
        {
          stage: 'Step 2',
          title: 'ConfigMap from File',
          code: `# config.properties
database.host=postgres
database.port=5432

kubectl create configmap app-config --from-file=config.properties`,
          explanation: 'Create ConfigMap from configuration files. Useful for complex configs.',
          concept: 'File-based Config',
          useCase: '🎯 Real World: Import existing application.properties or config.json'
        },
        {
          stage: 'Step 3',
          title: 'Use ConfigMap as Environment Variables',
          code: `spec:
  containers:
  - name: app
    image: myapp:latest
    envFrom:
    - configMapRef:
        name: app-config
    # Or individual keys
    env:
    - name: DB_HOST
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: DATABASE_HOST`,
          explanation: 'Inject ConfigMap data as environment variables in pods.',
          concept: 'Env Injection',
          useCase: '🎯 Real World: Different configs for dev/staging/prod using same image'
        },
        {
          stage: 'Step 4',
          title: 'Mount ConfigMap as Volume',
          code: `spec:
  containers:
  - name: app
    image: myapp:latest
    volumeMounts:
    - name: config
      mountPath: /etc/config
  volumes:
  - name: config
    configMap:
      name: app-config`,
          explanation: 'Mount ConfigMap as files in container. Each key becomes a file.',
          concept: 'Volume Mount',
          useCase: '🎯 Real World: App reads config from /etc/config/database.conf'
        },
        {
          stage: 'Step 5',
          title: 'Create Secret',
          code: `kubectl create secret generic db-secret \\
  --from-literal=username=admin \\
  --from-literal=password=secretpass

# Or from file
kubectl create secret generic tls-secret \\
  --from-file=tls.crt --from-file=tls.key`,
          explanation: 'Secrets store sensitive data (base64 encoded). Similar to ConfigMaps but for secrets.',
          concept: 'Secret Management',
          useCase: '🎯 Real World: Store database passwords, API keys, TLS certificates'
        },
        {
          stage: 'Step 6',
          title: 'Use Secrets',
          code: `spec:
  containers:
  - name: app
    image: myapp:latest
    env:
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: password
    volumeMounts:
    - name: tls
      mountPath: /etc/tls
      readOnly: true
  volumes:
  - name: tls
    secret:
      secretName: tls-secret`,
          explanation: 'Use secrets as env vars or mount as files. Always mount as readOnly for security.',
          concept: 'Secret Usage',
          useCase: '🎯 Real World: App gets DB password from env, TLS cert from /etc/tls/'
        }
      ]
    },
    production: {
      name: 'Production Best Practices',
      description: 'Deploy production-ready applications',
      steps: [
        {
          stage: 'Step 1',
          title: 'Namespaces',
          code: `kubectl create namespace production
kubectl create namespace staging

# Deploy to specific namespace
kubectl apply -f deployment.yaml -n production

# Set default namespace
kubectl config set-context --current --namespace=production`,
          explanation: 'Namespaces isolate resources. Use for different environments or teams.',
          concept: 'Resource Isolation',
          useCase: '🎯 Real World: Separate prod/staging, or team-a/team-b resources'
        },
        {
          stage: 'Step 2',
          title: 'Resource Quotas',
          code: `apiVersion: v1
kind: ResourceQuota
metadata:
  name: prod-quota
  namespace: production
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    pods: "50"`,
          explanation: 'Limit total resources per namespace. Prevents resource exhaustion.',
          concept: 'Resource Limits',
          useCase: '🎯 Real World: Ensure staging does not consume all cluster resources'
        },
        {
          stage: 'Step 3',
          title: 'Pod Disruption Budget',
          code: `apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: myapp`,
          explanation: 'Ensure minimum pods available during voluntary disruptions (node drain, updates).',
          concept: 'High Availability',
          useCase: '🎯 Real World: Maintain service during cluster upgrades'
        },
        {
          stage: 'Step 4',
          title: 'Network Policies',
          code: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080`,
          explanation: 'Control network traffic between pods. Default deny, explicit allow.',
          concept: 'Network Security',
          useCase: '🎯 Real World: Only allow frontend to access backend, block everything else'
        },
        {
          stage: 'Step 5',
          title: 'Security Context',
          code: `spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL`,
          explanation: 'Run containers as non-root, drop capabilities, read-only filesystem.',
          concept: 'Container Security',
          useCase: '🎯 Real World: Prevent container breakout attacks'
        },
        {
          stage: 'Step 6',
          title: 'Complete Production Deployment',
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
spec:
  replicas: 3
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
      containers:
      - name: app
        image: myapp:v1.2.3
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 8080
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`,
          explanation: '✅ Production-ready: security, health checks, auto-scaling, zero-downtime updates, resource limits.',
          concept: 'Production Deployment',
          useCase: '🎯 Real World: Complete setup for running production workloads safely'
        }
      ]
    },
    usecases: {
      name: 'Real-World Use Cases',
      description: 'Practical Kubernetes examples used in real projects',
      steps: []
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 min-h-[calc(100vh-80px)] flex flex-col pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Learn Kubernetes - Real World Use Cases
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Master container orchestration with practical examples
          </p>
        </motion.div>

        {/* Scenario Selection */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setScenario('intro')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'intro' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              📖 Introduction
            </button>
            <button
              onClick={() => setScenario('basics')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'basics' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Rocket size={14} />
              Basics
            </button>
            <button
              onClick={() => setScenario('pods')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'pods' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Package size={14} />
              Pods
            </button>
            <button
              onClick={() => setScenario('deployments')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'deployments' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <GitBranch size={14} />
              Deployments
            </button>
            <button
              onClick={() => setScenario('services')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'services' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Network size={14} />
              Services
            </button>
            <button
              onClick={() => setScenario('configmaps')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'configmaps' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Database size={14} />
              Config & Secrets
            </button>
            <button
              onClick={() => setScenario('production')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'production' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Shield size={14} />
              Production
            </button>
            <button
              onClick={() => setScenario('usecases')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'usecases' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              💼 Use Cases
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 lg:min-h-0 lg:overflow-hidden">
          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">
              {scenarios[scenario].name}
            </h2>
            <div className="flex-1 min-h-0 overflow-auto custom-scrollbar">
              {/* Description */}
              <div className="glass-card p-2 sm:p-3 bg-white/5 mb-3">
                <p className="text-xs text-gray-300">
                  {scenarios[scenario].description}
                </p>
              </div>
              
              {/* Show Use Cases or YAML based on scenario */}
              {scenario === 'usecases' ? (
                /* Real-World Use Cases with Code Examples */
                <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">💼</span>
              Real-World Kubernetes Use Cases in Projects
            </h3>
            
            <div className="space-y-4">
              {/* Use Case 1: Auto-Scaling E-Commerce */}
              <div className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/5">
                <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span>📈</span>
                  Use Case 1: Auto-Scaling E-Commerce During Traffic Spikes
                </h4>
                
                {/* Diagram */}
                <div className="mb-3 glass-card p-2 bg-black/30">
                  <KubernetesDiagram type="deployment" />
                </div>
                
                <div className="mb-2">
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-yellow-400">Problem:</span> Black Friday traffic increases 10x. Manual scaling is too slow and causes downtime.
                  </p>
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-green-400">Solution:</span> Configure Horizontal Pod Autoscaler to automatically scale based on CPU usage.
                  </p>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    deployment.yaml
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: shopping-cart
spec:
  replicas: 3
  selector:
    matchLabels:
      app: shopping-cart
  template:
    metadata:
      labels:
        app: shopping-cart
    spec:
      containers:
      - name: cart
        image: myapp/shopping-cart:v1.0
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        ports:
        - containerPort: 3000
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: shopping-cart-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: shopping-cart
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    Apply & Monitor
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <div className="text-gray-400"># Deploy application</div>
                    <div className="text-green-300">kubectl apply -f deployment.yaml</div>
                    <div className="mt-2 text-gray-400"># Watch autoscaling in action</div>
                    <div className="text-green-300">kubectl get hpa -w</div>
                    <div className="text-gray-500">NAME                REFERENCE              TARGETS   MINPODS   MAXPODS   REPLICAS</div>
                    <div className="text-gray-500">shopping-cart-hpa   Deployment/cart        45%/70%   3         50        3</div>
                    <div className="text-yellow-300"># Traffic spike occurs...</div>
                    <div className="text-gray-500">shopping-cart-hpa   Deployment/cart        85%/70%   3         50        8</div>
                    <div className="text-gray-500">shopping-cart-hpa   Deployment/cart        72%/70%   3         50        15</div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                  <p className="text-xs text-gray-300">
                    <span className="font-semibold text-purple-300">Why this works:</span> Kubernetes monitors CPU usage every 15 seconds. When usage exceeds 70%, it automatically adds pods. Scales from 3 to 50 pods during Black Friday, then back down when traffic normalizes. No manual intervention needed.
                  </p>
                </div>
              </div>

              {/* Use Case 2: Zero-Downtime Deployment */}
              <div className="border border-green-500/30 rounded-lg p-3 bg-green-500/5">
                <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                  <span>🔄</span>
                  Use Case 2: Zero-Downtime Rolling Update
                </h4>
                
                <div className="mb-2">
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-yellow-400">Problem:</span> Need to deploy new version without any downtime or user disruption.
                  </p>
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-green-400">Solution:</span> Use rolling update strategy with readiness probes.
                  </p>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    deployment.yaml (with rolling update)
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2        # Add 2 extra pods during update
      maxUnavailable: 1  # Max 1 pod down at a time
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
      - name: api
        image: myapp/api:v2.0  # New version
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    Deployment Process
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <div className="text-gray-400"># Update to new version</div>
                    <div className="text-green-300">kubectl set image deployment/api-server api=myapp/api:v2.0</div>
                    <div className="mt-2 text-gray-400"># Watch rollout progress</div>
                    <div className="text-green-300">kubectl rollout status deployment/api-server</div>
                    <div className="text-cyan-300">Waiting for deployment "api-server" rollout to finish: 2 out of 10 new replicas updated...</div>
                    <div className="text-cyan-300">Waiting for deployment "api-server" rollout to finish: 5 out of 10 new replicas updated...</div>
                    <div className="text-cyan-300">Waiting for deployment "api-server" rollout to finish: 8 out of 10 new replicas updated...</div>
                    <div className="text-green-400">deployment "api-server" successfully rolled out</div>
                    <div className="mt-2 text-gray-400"># Rollback if issues found</div>
                    <div className="text-green-300">kubectl rollout undo deployment/api-server</div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                  <p className="text-xs text-gray-300">
                    <span className="font-semibold text-purple-300">Why this works:</span> Kubernetes gradually replaces old pods with new ones. Readiness probe ensures new pods are healthy before receiving traffic. Only 1 pod is unavailable at a time, maintaining 90% capacity. If new version fails health checks, rollout pauses automatically.
                  </p>
                </div>
              </div>

              {/* Use Case 3: Multi-Tenant SaaS */}
              <div className="border border-purple-500/30 rounded-lg p-3 bg-purple-500/5">
                <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                  <span>🏢</span>
                  Use Case 3: Multi-Tenant SaaS with Namespace Isolation
                </h4>
                
                <div className="mb-2">
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-yellow-400">Problem:</span> SaaS app needs to isolate customer data and resources. Each customer needs their own environment.
                  </p>
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-green-400">Solution:</span> Use Kubernetes namespaces with resource quotas for each tenant.
                  </p>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    tenant-setup.yaml
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`# Create namespace for customer
apiVersion: v1
kind: Namespace
metadata:
  name: customer-acme
  labels:
    tenant: acme
---
# Set resource limits for this customer
apiVersion: v1
kind: ResourceQuota
metadata:
  name: acme-quota
  namespace: customer-acme
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    pods: "50"
---
# Deploy customer's application
apiVersion: apps/v1
kind: Deployment
metadata:
  name: acme-app
  namespace: customer-acme
spec:
  replicas: 3
  selector:
    matchLabels:
      app: acme-app
  template:
    metadata:
      labels:
        app: acme-app
    spec:
      containers:
      - name: app
        image: myapp/saas:v1.0
        env:
        - name: TENANT_ID
          value: "acme"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: acme-db-secret
              key: url`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    Management Commands
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <div className="text-gray-400"># Create new customer environment</div>
                    <div className="text-green-300">kubectl apply -f tenant-setup.yaml</div>
                    <div className="mt-2 text-gray-400"># Check resource usage per customer</div>
                    <div className="text-green-300">kubectl describe quota -n customer-acme</div>
                    <div className="text-gray-500">Used: requests.cpu: 6/10, requests.memory: 12Gi/20Gi</div>
                    <div className="mt-2 text-gray-400"># Update only ACME customer's app</div>
                    <div className="text-green-300">kubectl set image deployment/acme-app app=myapp/saas:v1.1 -n customer-acme</div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                  <p className="text-xs text-gray-300">
                    <span className="font-semibold text-purple-300">Why this works:</span> Each customer gets isolated namespace with resource limits. Customer A can't consume resources meant for Customer B. Can deploy updates to specific customers without affecting others. Billing is easy - track resource usage per namespace.
                  </p>
                </div>
              </div>

              {/* Use Case 4: Self-Healing Production */}
              <div className="border border-red-500/30 rounded-lg p-3 bg-red-500/5">
                <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                  <span>🔧</span>
                  Use Case 4: Self-Healing Production System
                </h4>
                
                <div className="mb-2">
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-yellow-400">Problem:</span> Pods crash randomly due to memory leaks. Need automatic recovery without manual intervention.
                  </p>
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-green-400">Solution:</span> Configure liveness probes and restart policies for automatic healing.
                  </p>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    deployment.yaml (with self-healing)
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-service
spec:
  replicas: 5
  selector:
    matchLabels:
      app: payment
  template:
    metadata:
      labels:
        app: payment
    spec:
      containers:
      - name: payment
        image: myapp/payment:v1.0
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"  # Kill if exceeds
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
          failureThreshold: 3  # Restart after 3 failures
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
      restartPolicy: Always  # Always restart on failure`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    What Happens Automatically
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <div className="text-yellow-300"># Scenario: Pod crashes due to memory leak</div>
                    <div className="text-red-400">Pod payment-service-abc123 - OOMKilled (Out of Memory)</div>
                    <div className="text-cyan-300">→ Kubernetes immediately starts new pod</div>
                    <div className="text-green-400">→ New pod passes health checks</div>
                    <div className="text-green-400">→ Traffic routed to healthy pods only</div>
                    <div className="text-green-400">→ Service continues without downtime</div>
                    <div className="mt-2 text-yellow-300"># Scenario: Health check fails 3 times</div>
                    <div className="text-red-400">Liveness probe failed: HTTP 500</div>
                    <div className="text-cyan-300">→ Kubernetes restarts container</div>
                    <div className="text-green-400">→ Fresh start resolves the issue</div>
                    <div className="mt-2 text-gray-400"># Check restart history</div>
                    <div className="text-green-300">kubectl get pods</div>
                    <div className="text-gray-500">payment-service-abc123   1/1   Running   3   2h  # Restarted 3 times</div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                  <p className="text-xs text-gray-300">
                    <span className="font-semibold text-purple-300">Why this works:</span> Kubernetes constantly monitors pod health. Crashed pods are automatically restarted. Memory limits prevent one pod from consuming all resources. Unhealthy pods are removed from load balancer. System heals itself without human intervention - even at 3 AM.
                  </p>
                </div>
              </div>

              {/* Use Case 5: Canary Deployment for Safe Rollouts */}
              <div className="border border-yellow-500/30 rounded-lg p-3 bg-yellow-500/5">
                <h4 className="font-semibold text-yellow-300 mb-2 flex items-center gap-2">
                  <span>🐤</span>
                  Use Case 5: Canary Deployment for Gradual Rollout
                </h4>
                
                <div className="mb-2">
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-yellow-400">Problem:</span> Rolling out new version to all users at once is risky. Need to test with small percentage first.
                  </p>
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-green-400">Solution:</span> Deploy new version alongside old, route small percentage of traffic to new version, monitor, then gradually increase.
                  </p>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    deployment-stable.yaml
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-stable
spec:
  replicas: 9  # 90% of traffic
  selector:
    matchLabels:
      app: myapp
      version: stable
  template:
    metadata:
      labels:
        app: myapp
        version: stable
    spec:
      containers:
      - name: myapp
        image: myapp:v1.0
        ports:
        - containerPort: 8080`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    deployment-canary.yaml
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-canary
spec:
  replicas: 1  # 10% of traffic
  selector:
    matchLabels:
      app: myapp
      version: canary
  template:
    metadata:
      labels:
        app: myapp
        version: canary
    spec:
      containers:
      - name: myapp
        image: myapp:v2.0  # New version
        ports:
        - containerPort: 8080`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    service.yaml (Routes to both versions)
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp  # Matches both stable and canary
  ports:
  - port: 80
    targetPort: 8080`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    Gradual Rollout Process
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <div className="text-gray-400"># Step 1: Deploy canary (10% traffic)</div>
                    <div className="text-green-300">kubectl apply -f deployment-canary.yaml</div>
                    <div className="text-cyan-300">→ 9 pods v1.0, 1 pod v2.0</div>
                    <div className="mt-2 text-gray-400"># Step 2: Monitor metrics for 30 minutes</div>
                    <div className="text-cyan-300">→ Error rate: 0.1% (normal)</div>
                    <div className="text-cyan-300">→ Response time: 120ms (good)</div>
                    <div className="text-cyan-300">→ No alerts triggered</div>
                    <div className="mt-2 text-gray-400"># Step 3: Increase to 50% traffic</div>
                    <div className="text-green-300">kubectl scale deployment/myapp-canary --replicas=5</div>
                    <div className="text-green-300">kubectl scale deployment/myapp-stable --replicas=5</div>
                    <div className="text-cyan-300">→ 5 pods v1.0, 5 pods v2.0</div>
                    <div className="mt-2 text-gray-400"># Step 4: Monitor again...</div>
                    <div className="text-cyan-300">→ Still looking good!</div>
                    <div className="mt-2 text-gray-400"># Step 5: Complete rollout (100%)</div>
                    <div className="text-green-300">kubectl scale deployment/myapp-canary --replicas=10</div>
                    <div className="text-green-300">kubectl scale deployment/myapp-stable --replicas=0</div>
                    <div className="text-cyan-300">→ All traffic on v2.0</div>
                    <div className="mt-2 text-gray-400"># Step 6: Cleanup old version</div>
                    <div className="text-green-300">kubectl delete deployment myapp-stable</div>
                    <div className="text-green-300">kubectl label deployment myapp-canary version=stable</div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                  <p className="text-xs text-gray-300">
                    <span className="font-semibold text-purple-300">Why this works:</span> New version tested with real production traffic but limited blast radius. If canary shows problems (high errors, slow response), rollback by deleting canary deployment. Gradual increase gives confidence. Users don't notice the rollout. Can pause at any percentage to monitor. Much safer than big bang deployment.
                  </p>
                </div>
              </div>

              {/* Use Case 6: Cost Optimization with Cluster Autoscaler */}
              <div className="border border-green-500/30 rounded-lg p-3 bg-green-500/5">
                <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                  <span>💰</span>
                  Use Case 6: Cost Optimization with Auto-Scaling
                </h4>
                
                <div className="mb-2">
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-yellow-400">Problem:</span> Cloud costs are high. Cluster runs at full capacity 24/7 but traffic varies (high during day, low at night).
                  </p>
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="font-semibold text-green-400">Solution:</span> Use Horizontal Pod Autoscaler and Cluster Autoscaler to scale pods and nodes based on demand.
                  </p>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    deployment.yaml (with resource requests)
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 2  # Minimum replicas
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: app
        image: myapp:latest
        resources:
          requests:
            cpu: 100m      # Required for HPA
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    hpa.yaml (Horizontal Pod Autoscaler)
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <pre className="text-green-300 whitespace-pre">{`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2   # Night time minimum
  maxReplicas: 50  # Peak traffic maximum
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Wait 5min before scaling down
      policies:
      - type: Percent
        value: 50  # Scale down max 50% at a time
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0  # Scale up immediately
      policies:
      - type: Percent
        value: 100  # Can double pods quickly
        periodSeconds: 15`}</pre>
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                    Real-World Scenario
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <div className="text-gray-400"># 2 AM (Low Traffic)</div>
                    <div className="text-cyan-300">→ 2 pods running (minimum)</div>
                    <div className="text-cyan-300">→ 1 node active</div>
                    <div className="text-cyan-300">→ Cost: $50/day</div>
                    <div className="mt-2 text-gray-400"># 9 AM (Traffic increases)</div>
                    <div className="text-cyan-300">→ CPU hits 75%</div>
                    <div className="text-green-300">→ HPA scales to 8 pods</div>
                    <div className="text-green-300">→ Cluster Autoscaler adds 2 nodes</div>
                    <div className="text-cyan-300">→ Cost: $150/day</div>
                    <div className="mt-2 text-gray-400"># 12 PM (Peak Traffic)</div>
                    <div className="text-cyan-300">→ CPU still high</div>
                    <div className="text-green-300">→ HPA scales to 25 pods</div>
                    <div className="text-green-300">→ Cluster Autoscaler adds 5 more nodes</div>
                    <div className="text-cyan-300">→ Cost: $350/day</div>
                    <div className="mt-2 text-gray-400"># 6 PM (Traffic decreases)</div>
                    <div className="text-cyan-300">→ CPU drops to 40%</div>
                    <div className="text-green-300">→ HPA scales down to 10 pods</div>
                    <div className="text-green-300">→ Cluster Autoscaler removes 4 nodes</div>
                    <div className="text-cyan-300">→ Cost: $150/day</div>
                    <div className="mt-2 text-gray-400"># 11 PM (Back to low traffic)</div>
                    <div className="text-green-300">→ Scales back to 2 pods, 1 node</div>
                    <div className="text-cyan-300">→ Cost: $50/day</div>
                    <div className="mt-2 text-yellow-300"># Monthly Savings</div>
                    <div className="text-green-400">→ Old cost (always max): $10,500/month</div>
                    <div className="text-green-400">→ New cost (auto-scale): $4,200/month</div>
                    <div className="text-green-400">→ Savings: $6,300/month (60%!)</div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                  <p className="text-xs text-gray-300">
                    <span className="font-semibold text-purple-300">Why this works:</span> HPA automatically adjusts pod count based on actual CPU/memory usage. Cluster Autoscaler adds/removes nodes as needed. Pay only for resources you actually use. Scales up quickly for traffic spikes. Scales down slowly to avoid thrashing. Typical savings: 40-70% on cloud costs. Performance stays good - users don't notice scaling.
                  </p>
                </div>
              </div>
            </div>
          </div>
          ) : (
            /* YAML for other scenarios */
            <div className="space-y-3">
            {scenarios[scenario].steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-3 bg-white/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-blue-400 font-bold">{s.title}</span>
                </div>
                
                <div className="bg-gray-900/80 border border-gray-700 rounded p-3 mb-2">
                  <pre className="text-green-300 text-xs whitespace-pre-wrap">{s.code}</pre>
                </div>
                
                <div className="text-xs text-gray-300 mb-2">
                  💡 {s.explanation}
                </div>
                
                <div className="flex gap-2 text-xs flex-wrap">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                    📚 {s.concept}
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">
                    {s.useCase}
                  </span>
                </div>
              </motion.div>
            ))}
              </div>
          )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
