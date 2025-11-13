import { motion } from 'framer-motion'
import { FileCode, CheckCircle, Lightbulb } from 'lucide-react'

interface JenkinsVisualizationProps {
  scenario: 'pipeline' | 'build' | 'deploy' | 'test' | 'parallel' | 'params'
  step: number
}

const tutorialData = {
  pipeline: {
    title: 'Building Your First Pipeline',
    icon: '🚀',
    finalCode: `pipeline {
    agent any
    
    triggers {
        cron('H 2 * * *')
        pollSCM('H/15 * * * *')
    }
    
    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker build -t myapp .'
                sh 'docker push myapp'
            }
        }
    }
}`,
    steps: [
      { line: 0, highlight: false },
      { line: 1, highlight: true },
      { line: 2, highlight: true },
      { line: 3, highlight: true },
      { line: 4, highlight: true },
      { line: 5, highlight: true },
      { line: 6, highlight: true },
      { line: 7, highlight: true },
      { line: 8, highlight: true },
      { line: 9, highlight: true },
    ]
  },
  build: {
    title: 'Using Environment Variables',
    icon: '⚙️',
    finalCode: `pipeline {
    agent any
    
    environment {
        APP_NAME = 'my-app'
        REGISTRY = 'registry.example.com'
        DOCKER_CREDS = credentials('docker-hub-id')
    }
    
    stages {
        stage('Setup') {
            steps {
                script {
                    env.VERSION = sh(
                        script: 'git describe --tags --always',
                        returnStdout: true
                    ).trim()
                }
                echo "Building \${APP_NAME} version \${VERSION}"
            }
        }
        stage('Build') {
            environment {
                BUILD_ENV = 'production'
            }
            steps {
                sh """
                    docker build \\
                        -t \${REGISTRY}/\${APP_NAME}:\${VERSION} \\
                        --build-arg ENV=\${BUILD_ENV} \\
                        .
                """
            }
        }
        stage('Push') {
            steps {
                sh 'docker login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW'
                sh "docker push \${REGISTRY}/\${APP_NAME}:\${VERSION}"
            }
        }
    }
}`,
    steps: [
      { line: 0, highlight: false },
      { line: 1, highlight: true },
      { line: 2, highlight: true },
      { line: 3, highlight: true },
      { line: 4, highlight: true },
      { line: 5, highlight: true },
      { line: 6, highlight: true },
      { line: 7, highlight: true },
    ]
  },
  test: {
    title: 'Conditional Stage Execution',
    icon: '🔀',
    finalCode: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Preview') {
            when { changeRequest() }
            steps {
                sh 'deploy-preview.sh'
            }
        }
        stage('Deploy Dev') {
            when { branch 'develop' }
            steps {
                sh 'deploy-dev.sh'
            }
        }
        stage('Deploy Staging') {
            when {
                allOf {
                    branch 'main'
                    not { tag pattern: "v*" }
                }
            }
            steps {
                sh 'deploy-staging.sh'
            }
        }
        stage('Release') {
            when {
                tag pattern: "v\\\\d+\\\\.\\\\d+\\\\.\\\\d+", 
                    comparator: "REGEXP"
            }
            steps {
                sh 'deploy-production.sh'
                sh 'create-release-notes.sh'
            }
        }
    }
}`,
    steps: [
      { line: 0, highlight: false },
      { line: 1, highlight: true },
      { line: 2, highlight: true },
      { line: 3, highlight: true },
      { line: 4, highlight: true },
      { line: 5, highlight: true },
      { line: 6, highlight: true },
      { line: 7, highlight: true },
    ]
  },
  deploy: {
    title: 'Error Handling & Notifications',
    icon: '🛡️',
    finalCode: `pipeline {
    agent any
    
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    
    stages {
        stage('Build') {
            steps {
                retry(2) {
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    sh 'npm test'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    try {
                        sh './deploy.sh'
                    } catch (Exception e) {
                        echo "Deploy failed: \${e.message}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        stage('Docs') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'generate-docs.sh'
                }
            }
        }
    }
    
    post {
        success {
            slackSend color: 'good', message: 'Build succeeded!'
        }
        unstable {
            slackSend color: 'warning', message: 'Build unstable'
        }
        failure {
            slackSend color: 'danger', message: 'Build failed!'
            emailext subject: "Failed: \${JOB_NAME}",
                     body: "Check \${BUILD_URL}",
                     to: 'team@example.com'
        }
        always {
            junit '**/test-results/*.xml'
            cleanWs()
        }
    }
}`,
    steps: [
      { line: 0, highlight: false },
      { line: 1, highlight: true },
      { line: 2, highlight: true },
      { line: 3, highlight: true },
      { line: 4, highlight: true },
      { line: 5, highlight: true },
      { line: 6, highlight: true },
      { line: 7, highlight: true },
      { line: 8, highlight: true },
    ]
  },
  parallel: {
    title: 'Parallel Execution for Speed',
    icon: '⚡',
    finalCode: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Parallel Tests') {
            failFast true
            parallel {
                stage('Unit') {
                    steps {
                        sh 'npm run test:unit'
                    }
                }
                stage('Integration') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
                stage('E2E') {
                    agent { label 'e2e-runner' }
                    steps {
                        sh 'npm run test:e2e'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh './deploy.sh'
            }
        }
    }
}`,
    steps: [
      { line: 0, highlight: false },
      { line: 1, highlight: true },
      { line: 2, highlight: true },
      { line: 3, highlight: true },
      { line: 4, highlight: true },
      { line: 5, highlight: true },
    ]
  },
  params: {
    title: 'Interactive Pipelines with Parameters',
    icon: '🎛️',
    finalCode: `pipeline {
    agent any
    
    parameters {
        choice(name: 'ENV',
               choices: ['dev', 'staging', 'prod'])
        string(name: 'VERSION', defaultValue: '1.0.0')
        booleanParam(name: 'RUN_TESTS', defaultValue: true)
    }
    
    stages {
        stage('Build') {
            steps {
                sh "docker build -t app:\${params.VERSION} ."
            }
        }
        stage('Test') {
            when {
                expression { params.RUN_TESTS }
            }
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            when {
                expression { params.ENV == 'prod' }
            }
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    input message: 'Deploy to production?'
                }
                sh "./deploy.sh \${params.ENV} \${params.VERSION}"
            }
        }
    }
}`,
    steps: [
      { line: 0, highlight: false },
      { line: 1, highlight: true },
      { line: 2, highlight: true },
      { line: 3, highlight: true },
      { line: 4, highlight: true },
      { line: 5, highlight: true },
      { line: 6, highlight: true },
      { line: 7, highlight: true },
    ]
  }
}

export default function JenkinsVisualization({ scenario, step }: JenkinsVisualizationProps) {
  const data = tutorialData[scenario]
  const codeLines = data.finalCode.split('\n')
  
  // Show all lines, but fade out future ones
  const linesToShow = codeLines.length

  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[400px] flex flex-col p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="text-4xl">{data.icon}</div>
        <div>
          <h3 className="text-lg font-bold text-white">{data.title}</h3>
          <p className="text-xs text-gray-400">Watch the Jenkinsfile being built step by step</p>
        </div>
      </motion.div>

      {/* Code Editor Mockup */}
      <div className="flex-1 glass-card bg-gray-900/90 border border-gray-700 rounded-lg overflow-hidden flex flex-col">
        {/* Editor Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <FileCode size={16} className="text-orange-400" />
            <span className="text-sm font-mono text-gray-300">Jenkinsfile</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <div className="font-mono text-sm p-4">
            {codeLines.map((line, index) => {
              // Show more lines as we progress through steps
              // Each step reveals approximately 4-5 more lines
              const revealedLines = Math.min((step + 1) * 5, codeLines.length)
              const isRevealed = index < revealedLines
              const isHighlighted = index >= (step * 5) && index < ((step + 1) * 5)
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isRevealed ? 1 : 0.15,
                    x: 0,
                    backgroundColor: isHighlighted ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                  }}
                  transition={{ delay: isRevealed ? index * 0.02 : 0 }}
                  className={`flex items-center gap-3 py-0.5 px-2 rounded ${
                    isHighlighted ? 'border-l-2 border-blue-500' : ''
                  }`}
                >
                  {/* Line Number */}
                  <span className={`select-none w-8 text-right text-xs ${
                    isRevealed ? 'text-gray-500' : 'text-gray-700'
                  }`}>
                    {index + 1}
                  </span>
                  
                  {/* Code Line */}
                  <span className={`whitespace-pre ${
                    isRevealed ? 'text-green-300' : 'text-gray-800'
                  }`}>
                    {line}
                  </span>
                  
                  {/* Current Section Indicator */}
                  {isHighlighted && index === step * 5 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progress Footer */}
        <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CheckCircle size={14} className="text-green-500" />
            <span>Lines: {Math.min((step + 1) * 5, codeLines.length)} / {codeLines.length}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Lightbulb size={14} className="text-yellow-500" />
            <span>Follow along in the console →</span>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {step >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 glass-card p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
        >
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle size={20} />
            <span className="font-semibold">Tutorial Complete! Your Jenkinsfile is ready to use.</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
