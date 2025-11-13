import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Play, Pause, RotateCcw, GitBranch, Package, Rocket } from 'lucide-react'
import JenkinsDiagram from '../components/animations/JenkinsDiagram'

export default function Jenkins() {
  const [scenario, setScenario] = useState<'intro' | 'pipeline' | 'build' | 'deploy' | 'test' | 'parallel' | 'params' | 'docker' | 'artifacts' | 'libraries' | 'triggers' | 'security' | 'notifications' | 'scripting' | 'usecases'>('intro')

  const scenarios = {
    intro: {
      name: 'Introduction to Jenkins',
      description: 'Learn what Jenkins is and why teams use it',
      steps: [
        {
          stage: 'Step 1',
          title: 'What is Jenkins?',
          code: `Jenkins is an open-source automation server that enables 
Continuous Integration and Continuous Delivery (CI/CD).

It automates building, testing, and deploying applications,
catching bugs early and speeding up releases.`,
          explanation: 'Jenkins is the leading automation server with over 1 million users worldwide.',
          concept: 'CI/CD Automation'
        },
        {
          stage: 'Step 2',
          title: 'What Jenkins Does',
          code: `• Automatically builds code on every commit
• Runs tests to catch bugs early
• Deploys to servers automatically
• Sends notifications on build status
• Integrates with 1000+ plugins
• Coordinates complex workflows`,
          explanation: 'Jenkins automates the entire software delivery pipeline from code to production.',
          concept: 'Automation Benefits'
        },
        {
          stage: 'Step 3',
          title: 'Real-World Use Cases',
          code: `• Automated testing on every pull request
• Deploy to production multiple times per day
• Build Docker images and push to registry
• Run security scans and code quality checks
• Coordinate microservices deployments
• Automated database migrations`,
          explanation: 'Companies like Netflix, LinkedIn, and NASA use Jenkins for their CI/CD pipelines.',
          concept: 'Industry Usage'
        },
        {
          stage: 'Step 4',
          title: 'CI/CD Pipeline Flow',
          code: `1. 📝 Code Push - Developer commits code
2. 🔨 Build - Compile and package application
3. 🧪 Test - Run automated tests
4. 📦 Package - Create deployable artifact
5. 🚀 Deploy - Release to production

All automated - from code commit to production in minutes!`,
          explanation: 'This is the modern way to deliver software - fast, reliable, and automated.',
          concept: 'Pipeline Workflow'
        }
      ]
    },
    pipeline: {
      name: 'Write Your First Pipeline',
      description: 'Learn Jenkinsfile syntax step by step',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Create Jenkinsfile',
          code: `// Create a file named "Jenkinsfile" in your repo root`,
          explanation: 'Jenkinsfile is a text file that contains the pipeline definition. Place it in the root of your repository.',
          concept: 'Jenkinsfile Basics'
        },
        {
          stage: 'Step 2',
          title: 'Define Pipeline Block',
          code: `pipeline {
    // All pipeline code goes here
}`,
          explanation: 'Every Jenkinsfile starts with the pipeline block. This is the container for your entire CI/CD workflow.',
          concept: 'Pipeline Structure'
        },
        {
          stage: 'Step 3',
          title: 'Specify Agent',
          code: `pipeline {
    agent any
}`,
          explanation: 'The agent directive tells Jenkins WHERE to run your pipeline. "any" means use any available agent.',
          concept: 'Agent Configuration',
          alternatives: `// Other agent options:
agent { label 'linux' }        // Specific label
agent { docker 'node:18' }     // Docker container
agent { kubernetes { ... } }   // Kubernetes pod`
        },
        {
          stage: 'Step 4',
          title: 'Add Stages Block',
          code: `pipeline {
    agent any
    
    stages {
        // Your stages go here
    }
}`,
          explanation: 'The stages block contains all the stages of your pipeline. Each stage represents a phase in your workflow.',
          concept: 'Stages Organization'
        },
        {
          stage: 'Step 5',
          title: 'Add Your First Stage',
          code: `pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building application...'
            }
        }
    }
}`,
          explanation: 'Each stage has a name and a steps block. The steps block contains the actual commands to execute.',
          concept: 'Stage Definition'
        },
        {
          stage: 'Step 6',
          title: 'Add Build Commands',
          code: `pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}`,
          explanation: 'Use "sh" to run shell commands. Each command runs in sequence. If any command fails, the pipeline stops.',
          concept: 'Shell Commands'
        },
        {
          stage: 'Step 7',
          title: 'Add Test Stage',
          code: `pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
    }
}`,
          explanation: 'Add multiple stages for different tasks. Stages run in the order they are defined.',
          concept: 'Multiple Stages'
        },
        {
          stage: 'Step 8',
          title: 'Add Options Block',
          code: `pipeline {
    agent any
    
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
          explanation: 'Options configure pipeline behavior: timeout prevents hanging, timestamps add time to logs, buildDiscarder cleans old builds.',
          concept: 'Pipeline Options'
        },
        {
          stage: 'Step 9',
          title: 'Add Triggers',
          code: `pipeline {
    agent any
    
    triggers {
        cron('H 2 * * *')  // Run daily at 2 AM
        pollSCM('H/15 * * * *')  // Check for changes every 15 min
    }
    
    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
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
          explanation: 'Triggers automatically start builds. cron schedules builds, pollSCM checks for code changes.',
          concept: 'Build Triggers'
        },
        {
          stage: 'Step 10',
          title: 'Complete Pipeline',
          code: `pipeline {
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
          explanation: '✅ Complete! This is a production-ready pipeline with triggers, options, and proper stages. Commit this Jenkinsfile to your repo.',
          concept: 'Production Pipeline'
        }
      ]
    },
    build: {
      name: 'Environment Variables',
      description: 'Use variables and configuration in your pipeline',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Add Environment Block',
          code: `pipeline {
    agent any
    
    environment {
        // Variables go here
    }
    
    stages {
        // stages...
    }
}`,
          explanation: 'The environment block defines variables available to all stages. Place it before the stages block.',
          concept: 'Environment Variables'
        },
        {
          stage: 'Step 2',
          title: 'Define Variables',
          code: `pipeline {
    agent any
    
    environment {
        APP_NAME = 'my-app'
        VERSION = '1.0.0'
        REGISTRY = 'registry.example.com'
    }
    
    stages {
        // stages...
    }
}`,
          explanation: 'Define variables as key-value pairs. Use UPPERCASE for environment variables by convention.',
          concept: 'Variable Definition'
        },
        {
          stage: 'Step 3',
          title: 'Use Variables in Steps',
          code: `stage('Build') {
    steps {
        echo "Building \${APP_NAME} version \${VERSION}"
        sh "docker build -t \${REGISTRY}/\${APP_NAME}:\${VERSION} ."
    }
}`,
          explanation: 'Access variables using ${VARIABLE_NAME} syntax. Use double quotes to enable variable interpolation.',
          concept: 'Variable Usage'
        },
        {
          stage: 'Step 4',
          title: 'Stage-Level Environment',
          code: `stage('Deploy') {
    environment {
        DEPLOY_ENV = 'production'
    }
    steps {
        echo "Deploying to \${DEPLOY_ENV}"
        sh './deploy.sh'
    }
}`,
          explanation: 'You can also define environment variables at the stage level. These are only available within that stage.',
          concept: 'Stage Environment'
        },
        {
          stage: 'Step 5',
          title: 'Using Credentials',
          code: `pipeline {
    agent any
    
    environment {
        DOCKER_CREDS = credentials('docker-hub-id')
        API_KEY = credentials('api-key-id')
    }
    
    stages {
        stage('Deploy') {
            steps {
                sh 'docker login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW'
            }
        }
    }
}`,
          explanation: 'Use credentials() to securely access secrets. Jenkins automatically creates _USR and _PSW variables for username/password credentials.',
          concept: 'Credentials Management'
        },
        {
          stage: 'Step 6',
          title: 'Built-in Variables',
          code: `stage('Info') {
    steps {
        echo "Build: \${BUILD_NUMBER}"
        echo "Job: \${JOB_NAME}"
        echo "Branch: \${GIT_BRANCH}"
        echo "Workspace: \${WORKSPACE}"
        echo "URL: \${BUILD_URL}"
    }
}`,
          explanation: 'Jenkins provides many built-in environment variables with information about the build, job, and workspace.',
          concept: 'Built-in Variables'
        },
        {
          stage: 'Step 7',
          title: 'Dynamic Variables with Script',
          code: `stage('Dynamic Config') {
    steps {
        script {
            env.BUILD_DATE = sh(
                script: 'date +%Y%m%d',
                returnStdout: true
            ).trim()
            
            env.GIT_COMMIT_SHORT = sh(
                script: 'git rev-parse --short HEAD',
                returnStdout: true
            ).trim()
            
            echo "Build date: \${env.BUILD_DATE}"
            echo "Commit: \${env.GIT_COMMIT_SHORT}"
        }
    }
}`,
          explanation: 'Use script blocks to dynamically set environment variables based on command output. Great for version tags and metadata.',
          concept: 'Dynamic Variables'
        },
        {
          stage: 'Step 8',
          title: 'Complete Example',
          code: `pipeline {
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
          explanation: '✅ Complete! This pipeline uses global, stage-level, and dynamic variables with secure credential handling.',
          concept: 'Advanced Variables'
        }
      ]
    },
    test: {
      name: 'Conditional Execution',
      description: 'Run stages based on conditions',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'When Directive - Branch',
          code: `stage('Deploy to Production') {
    when {
        branch 'main'
    }
    steps {
        sh 'kubectl apply -f prod.yaml'
    }
}`,
          explanation: 'The when directive controls whether a stage runs. This stage only runs when building the main branch.',
          concept: 'Branch Conditions'
        },
        {
          stage: 'Step 2',
          title: 'When Directive - Environment',
          code: `stage('Deploy') {
    when {
        environment name: 'DEPLOY', value: 'true'
    }
    steps {
        sh './deploy.sh'
    }
}`,
          explanation: 'Run a stage only if an environment variable matches a specific value.',
          concept: 'Environment Conditions'
        },
        {
          stage: 'Step 3',
          title: 'When Directive - Expression',
          code: `stage('Notify Success') {
    when {
        expression { 
            currentBuild.result == null || 
            currentBuild.result == 'SUCCESS' 
        }
    }
    steps {
        echo 'Build succeeded!'
    }
}`,
          explanation: 'Use expressions for complex conditions. Access build information through currentBuild object.',
          concept: 'Expression Conditions'
        },
        {
          stage: 'Step 4',
          title: 'Multiple Conditions - allOf',
          code: `stage('Production Deploy') {
    when {
        allOf {
            branch 'main'
            environment name: 'ENV', value: 'prod'
        }
    }
    steps {
        sh 'deploy-to-prod.sh'
    }
}`,
          explanation: 'Use allOf to require ALL conditions to be true. This stage runs only on main branch AND when ENV=prod.',
          concept: 'Combined Conditions'
        },
        {
          stage: 'Step 5',
          title: 'Multiple Conditions - anyOf',
          code: `stage('Deploy') {
    when {
        anyOf {
            branch 'main'
            branch 'develop'
        }
    }
    steps {
        sh './deploy.sh'
    }
}`,
          explanation: 'Use anyOf to run when ANY condition is true. This stage runs on either main or develop branch.',
          concept: 'Alternative Conditions'
        },
        {
          stage: 'Step 6',
          title: 'When - Change Request',
          code: `stage('Preview Deploy') {
    when {
        changeRequest()  // Only for pull requests
    }
    steps {
        sh 'deploy-preview.sh'
        echo "Preview: https://pr-\${CHANGE_ID}.preview.example.com"
    }
}

stage('Merge to Main') {
    when {
        changeRequest target: 'main'
    }
    steps {
        sh 'run-extra-checks.sh'
    }
}`,
          explanation: 'changeRequest() condition runs stages only for pull/merge requests. Perfect for preview deployments.',
          concept: 'Pull Request Conditions'
        },
        {
          stage: 'Step 7',
          title: 'When - Tag',
          code: `stage('Release') {
    when {
        tag pattern: "v\\\\d+\\\\.\\\\d+\\\\.\\\\d+", comparator: "REGEXP"
    }
    steps {
        sh 'create-release.sh'
        sh 'publish-to-registry.sh'
    }
}

stage('Hotfix') {
    when {
        tag pattern: "hotfix-*"
    }
    steps {
        sh 'deploy-hotfix.sh'
    }
}`,
          explanation: 'Tag conditions trigger stages when specific Git tags are pushed. Essential for release automation.',
          concept: 'Tag-based Releases'
        },
        {
          stage: 'Step 8',
          title: 'Complete Example',
          code: `pipeline {
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
          explanation: '✅ Complete! This pipeline handles PRs, branches, and releases with sophisticated conditional logic.',
          concept: 'Advanced Conditionals'
        }
      ]
    },
    deploy: {
      name: 'Error Handling & Post Actions',
      description: 'Handle failures and run cleanup tasks',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Post Block - Always',
          code: `pipeline {
    agent any
    stages {
        // stages...
    }
    post {
        always {
            echo 'This runs no matter what'
        }
    }
}`,
          explanation: 'The post block runs after all stages complete. "always" runs regardless of success or failure.',
          concept: 'Post Actions'
        },
        {
          stage: 'Step 2',
          title: 'Post Block - Success',
          code: `post {
    success {
        echo 'Build succeeded!'
        slackSend color: 'good', 
                  message: "Build #\${BUILD_NUMBER} succeeded"
    }
}`,
          explanation: 'The "success" block only runs if the pipeline succeeds. Perfect for success notifications.',
          concept: 'Success Handling'
        },
        {
          stage: 'Step 3',
          title: 'Post Block - Failure',
          code: `post {
    failure {
        echo 'Build failed!'
        emailext subject: "Build Failed: \${JOB_NAME}",
                 body: "Check console output at \${BUILD_URL}",
                 to: 'team@example.com'
    }
}`,
          explanation: 'The "failure" block runs only if the pipeline fails. Use it to send failure notifications.',
          concept: 'Failure Handling'
        },
        {
          stage: 'Step 4',
          title: 'Post Block - Cleanup',
          code: `post {
    always {
        cleanWs()  // Clean workspace
        sh 'docker system prune -f'
    }
}`,
          explanation: 'Use "always" for cleanup tasks that should run regardless of build result.',
          concept: 'Cleanup Tasks'
        },
        {
          stage: 'Step 5',
          title: 'Try-Catch in Script',
          code: `stage('Deploy') {
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
}`,
          explanation: 'Use script blocks with try-catch for fine-grained error handling within a stage.',
          concept: 'Exception Handling'
        },
        {
          stage: 'Step 6',
          title: 'Post - Unstable & Aborted',
          code: `post {
    unstable {
        echo 'Build is unstable (tests failed but build succeeded)'
        emailext subject: 'Unstable Build',
                 body: 'Some tests failed',
                 to: 'team@example.com'
    }
    aborted {
        echo 'Build was aborted'
        slackSend color: 'warning',
                  message: 'Build was cancelled'
    }
}`,
          explanation: 'unstable runs when tests fail but build succeeds. aborted runs when build is manually cancelled.',
          concept: 'Additional Post Conditions'
        },
        {
          stage: 'Step 7',
          title: 'Retry and Timeout',
          code: `stage('Flaky Test') {
    steps {
        retry(3) {
            sh 'npm run test:e2e'
        }
    }
}

stage('Deploy') {
    steps {
        timeout(time: 10, unit: 'MINUTES') {
            sh './deploy.sh'
        }
    }
}`,
          explanation: 'retry automatically retries failed steps. timeout fails the stage if it takes too long. Essential for flaky tests and deployments.',
          concept: 'Retry & Timeout'
        },
        {
          stage: 'Step 8',
          title: 'CatchError',
          code: `stage('Optional Tasks') {
    steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            sh './optional-task.sh'
        }
        echo 'Pipeline continues even if optional task fails'
    }
}`,
          explanation: 'catchError allows stages to fail without failing the entire pipeline. Perfect for optional tasks like documentation generation.',
          concept: 'Non-blocking Failures'
        },
        {
          stage: 'Step 9',
          title: 'Complete Example',
          code: `pipeline {
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
          explanation: '✅ Complete! This pipeline has comprehensive error handling with retries, timeouts, and proper notifications.',
          concept: 'Robust Pipeline'
        }
      ]
    },
    parallel: {
      name: 'Parallel Execution',
      description: 'Run multiple tasks simultaneously',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Parallel Block Basics',
          code: `stage('Tests') {
    parallel {
        stage('Unit Tests') {
            steps {
                sh 'npm run test:unit'
            }
        }
        stage('Integration Tests') {
            steps {
                sh 'npm run test:integration'
            }
        }
    }
}`,
          explanation: 'Use parallel block to run multiple stages at the same time. This speeds up your pipeline significantly.',
          concept: 'Parallel Stages'
        },
        {
          stage: 'Step 2',
          title: 'Parallel with Different Agents',
          code: `stage('Multi-Platform Build') {
    parallel {
        stage('Linux Build') {
            agent { label 'linux' }
            steps {
                sh './build-linux.sh'
            }
        }
        stage('Windows Build') {
            agent { label 'windows' }
            steps {
                bat 'build-windows.bat'
            }
        }
        stage('Mac Build') {
            agent { label 'mac' }
            steps {
                sh './build-mac.sh'
            }
        }
    }
}`,
          explanation: 'Each parallel stage can run on a different agent. Perfect for multi-platform builds.',
          concept: 'Multi-Agent Parallel'
        },
        {
          stage: 'Step 3',
          title: 'Fail Fast Option',
          code: `stage('Tests') {
    failFast true
    parallel {
        stage('Unit Tests') {
            steps {
                sh 'npm run test:unit'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npm run test:e2e'
            }
        }
    }
}`,
          explanation: 'failFast stops all parallel stages if any one fails. Saves time when a critical test fails.',
          concept: 'Fail Fast'
        },
        {
          stage: 'Step 4',
          title: 'Matrix Builds',
          code: `stage('Matrix Test') {
    matrix {
        axes {
            axis {
                name 'NODE_VERSION'
                values '14', '16', '18', '20'
            }
            axis {
                name 'OS'
                values 'linux', 'windows'
            }
        }
        stages {
            stage('Test') {
                steps {
                    sh "node --version"
                    sh "npm test"
                }
            }
        }
    }
}`,
          explanation: 'Matrix builds test multiple combinations automatically. This creates 8 parallel jobs (4 Node versions × 2 OSes).',
          concept: 'Matrix Strategy'
        },
        {
          stage: 'Step 5',
          title: 'Parallel with Script',
          code: `stage('Deploy to Regions') {
    steps {
        script {
            def regions = ['us-east', 'us-west', 'eu-central']
            def parallelStages = [:]
            
            regions.each { region ->
                parallelStages[region] = {
                    stage("Deploy \${region}") {
                        sh "deploy.sh \${region}"
                    }
                }
            }
            
            parallel parallelStages
        }
    }
}`,
          explanation: 'Use script blocks to dynamically create parallel stages. Great for deploying to multiple regions or environments.',
          concept: 'Dynamic Parallel'
        },
        {
          stage: 'Step 6',
          title: 'Complete Example',
          code: `pipeline {
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
          explanation: '✅ Complete! This pipeline runs tests in parallel, saving significant time in your CI/CD workflow.',
          concept: 'Production Parallel Pipeline'
        }
      ]
    },
    params: {
      name: 'Parameters & Input',
      description: 'Make pipelines interactive and configurable',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Define Parameters',
          code: `pipeline {
    agent any
    
    parameters {
        string(name: 'DEPLOY_ENV', 
               defaultValue: 'staging',
               description: 'Environment to deploy')
    }
    
    stages {
        // stages...
    }
}`,
          explanation: 'Parameters let users provide input when triggering a build. Define them in the parameters block.',
          concept: 'String Parameters'
        },
        {
          stage: 'Step 2',
          title: 'Multiple Parameter Types',
          code: `parameters {
    string(name: 'VERSION', defaultValue: '1.0.0')
    
    choice(name: 'ENVIRONMENT',
           choices: ['dev', 'staging', 'prod'],
           description: 'Target environment')
    
    booleanParam(name: 'RUN_TESTS',
                 defaultValue: true,
                 description: 'Run test suite?')
    
    text(name: 'RELEASE_NOTES',
         defaultValue: '',
         description: 'Release notes')
}`,
          explanation: 'Jenkins supports string, choice, boolean, text, password, and file parameters.',
          concept: 'Parameter Types'
        },
        {
          stage: 'Step 3',
          title: 'Using Parameters',
          code: `stage('Deploy') {
    steps {
        echo "Deploying version \${params.VERSION}"
        echo "To environment: \${params.ENVIRONMENT}"
        
        sh """
            ./deploy.sh \\
                --version \${params.VERSION} \\
                --env \${params.ENVIRONMENT}
        """
    }
}`,
          explanation: 'Access parameters using params.PARAMETER_NAME. They are available throughout the pipeline.',
          concept: 'Parameter Usage'
        },
        {
          stage: 'Step 4',
          title: 'Conditional on Parameters',
          code: `stage('Run Tests') {
    when {
        expression { params.RUN_TESTS == true }
    }
    steps {
        sh 'npm test'
    }
}

stage('Deploy to Production') {
    when {
        expression { params.ENVIRONMENT == 'prod' }
    }
    steps {
        sh './deploy-prod.sh'
    }
}`,
          explanation: 'Use parameters in when conditions to control which stages run based on user input.',
          concept: 'Parameter Conditions'
        },
        {
          stage: 'Step 5',
          title: 'Input Step - Manual Approval',
          code: `stage('Deploy to Production') {
    steps {
        input message: 'Deploy to production?',
              ok: 'Deploy',
              submitter: 'admin,devops'
        
        sh './deploy-prod.sh'
    }
}`,
          explanation: 'input step pauses the pipeline and waits for manual approval. Great for production deployments.',
          concept: 'Manual Approval'
        },
        {
          stage: 'Step 6',
          title: 'Input with Parameters',
          code: `stage('Deploy') {
    steps {
        script {
            def userInput = input(
                message: 'Deploy configuration',
                parameters: [
                    choice(name: 'REGION',
                           choices: ['us-east', 'us-west', 'eu'],
                           description: 'Deployment region'),
                    booleanParam(name: 'BACKUP',
                                defaultValue: true,
                                description: 'Create backup?')
                ]
            )
            
            echo "Deploying to \${userInput.REGION}"
            if (userInput.BACKUP) {
                sh './backup.sh'
            }
            sh "./deploy.sh \${userInput.REGION}"
        }
    }
}`,
          explanation: 'input can collect parameters during pipeline execution. Perfect for dynamic deployment decisions.',
          concept: 'Dynamic Input'
        },
        {
          stage: 'Step 7',
          title: 'Timeout for Input',
          code: `stage('Approval') {
    steps {
        timeout(time: 1, unit: 'HOURS') {
            input message: 'Proceed with deployment?',
                  ok: 'Yes, deploy'
        }
    }
}`,
          explanation: 'Add timeout to input steps to prevent pipelines from waiting indefinitely. Pipeline fails if timeout expires.',
          concept: 'Input Timeout'
        },
        {
          stage: 'Step 8',
          title: 'Complete Example',
          code: `pipeline {
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
          explanation: '✅ Complete! This pipeline is fully configurable with parameters and includes manual approval for production.',
          concept: 'Interactive Pipeline'
        }
      ]
    },
    docker: {
      name: 'Docker Integration',
      description: 'Build and deploy with Docker containers',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Docker Agent',
          code: `pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'node --version'
                sh 'npm install'
            }
        }
    }
}`,
          explanation: 'Run your entire pipeline inside a Docker container. The image is pulled automatically and your code runs in an isolated environment.',
          concept: 'Docker Agent'
        },
        {
          stage: 'Step 2',
          title: 'Stage-Level Docker',
          code: `pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                docker { image 'node:18' }
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            agent {
                docker { image 'node:18' }
            }
            steps {
                sh 'npm test'
            }
        }
    }
}`,
          explanation: 'Use different Docker images for different stages. Each stage runs in its own container with the right tools.',
          concept: 'Per-Stage Containers'
        },
        {
          stage: 'Step 3',
          title: 'Build Docker Image',
          code: `stage('Build Image') {
    steps {
        script {
            docker.build("myapp:\${env.BUILD_NUMBER}")
        }
    }
}`,
          explanation: 'Use docker.build() to create Docker images. The image is tagged with the build number for traceability.',
          concept: 'Building Images'
        },
        {
          stage: 'Step 4',
          title: 'Push to Registry',
          code: `stage('Push Image') {
    steps {
        script {
            docker.withRegistry('https://registry.example.com', 'docker-credentials') {
                def image = docker.build("myapp:\${env.BUILD_NUMBER}")
                image.push()
                image.push('latest')
            }
        }
    }
}`,
          explanation: 'Push images to a Docker registry with authentication. Tag with both build number and latest.',
          concept: 'Registry Push'
        },
        {
          stage: 'Step 5',
          title: 'Multi-Stage Docker Build',
          code: `stage('Build') {
    steps {
        script {
            def image = docker.build(
                "myapp:\${env.BUILD_NUMBER}",
                "--target production --build-arg VERSION=\${env.BUILD_NUMBER} ."
            )
        }
    }
}`,
          explanation: 'Use multi-stage Dockerfiles with build arguments. Target specific stages and pass variables.',
          concept: 'Advanced Docker Build'
        },
        {
          stage: 'Step 6',
          title: 'Docker Compose',
          code: `stage('Integration Test') {
    steps {
        sh 'docker-compose up -d'
        sh 'docker-compose exec -T app npm test'
        sh 'docker-compose down'
    }
}`,
          explanation: 'Use Docker Compose to spin up multiple services for integration testing.',
          concept: 'Docker Compose'
        },
        {
          stage: 'Step 7',
          title: 'Complete Example',
          code: `pipeline {
    agent any
    
    environment {
        REGISTRY = 'registry.example.com'
        IMAGE_NAME = 'myapp'
    }
    
    stages {
        stage('Build') {
            agent {
                docker { image 'node:18' }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            agent {
                docker { image 'node:18' }
            }
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Image') {
            steps {
                script {
                    docker.withRegistry("https://\${REGISTRY}", 'docker-creds') {
                        def image = docker.build(
                            "\${IMAGE_NAME}:\${BUILD_NUMBER}",
                            "--build-arg VERSION=\${BUILD_NUMBER} ."
                        )
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh """
                    docker pull \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER}
                    docker stop myapp || true
                    docker rm myapp || true
                    docker run -d --name myapp -p 3000:3000 \\
                        \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER}
                """
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -f'
        }
    }
}`,
          explanation: '✅ Complete! This pipeline builds in Docker, creates images, pushes to registry, and deploys containers.',
          concept: 'Full Docker Pipeline'
        }
      ]
    },
    artifacts: {
      name: 'Artifacts & Stashing',
      description: 'Share files between stages and jobs',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Archive Artifacts',
          code: `stage('Build') {
    steps {
        sh 'npm run build'
        archiveArtifacts artifacts: 'dist/**/*', 
                         fingerprint: true
    }
}`,
          explanation: 'Archive build artifacts so they can be downloaded later. Fingerprinting tracks file changes across builds.',
          concept: 'Archiving Artifacts'
        },
        {
          stage: 'Step 2',
          title: 'Stash Files',
          code: `stage('Build') {
    steps {
        sh 'npm run build'
        stash name: 'build-artifacts', 
              includes: 'dist/**/*'
    }
}

stage('Deploy') {
    steps {
        unstash 'build-artifacts'
        sh 'ls -la dist/'
    }
}`,
          explanation: 'Stash files to share between stages. Unlike artifacts, stashes are temporary and only available within the same pipeline run.',
          concept: 'Stash & Unstash'
        },
        {
          stage: 'Step 3',
          title: 'Stash with Excludes',
          code: `stage('Build') {
    steps {
        sh 'npm run build'
        stash name: 'app', 
              includes: '**/*',
              excludes: 'node_modules/**,*.log'
    }
}`,
          explanation: 'Use includes and excludes patterns to control what gets stashed. Exclude large folders like node_modules.',
          concept: 'Selective Stashing'
        },
        {
          stage: 'Step 4',
          title: 'Parallel with Stash',
          code: `stage('Build') {
    steps {
        sh 'npm run build'
        stash name: 'dist', includes: 'dist/**'
    }
}

stage('Parallel Deploy') {
    parallel {
        stage('Deploy US') {
            steps {
                unstash 'dist'
                sh 'deploy-us.sh'
            }
        }
        stage('Deploy EU') {
            steps {
                unstash 'dist'
                sh 'deploy-eu.sh'
            }
        }
    }
}`,
          explanation: 'Unstash the same files in multiple parallel stages. Each stage gets its own copy.',
          concept: 'Parallel Unstash'
        },
        {
          stage: 'Step 5',
          title: 'Test Results',
          code: `stage('Test') {
    steps {
        sh 'npm test'
        junit '**/test-results/*.xml'
        publishHTML([
            reportDir: 'coverage',
            reportFiles: 'index.html',
            reportName: 'Coverage Report'
        ])
    }
}`,
          explanation: 'Publish test results and HTML reports. Jenkins displays trends and makes reports easily accessible.',
          concept: 'Test Reports'
        },
        {
          stage: 'Step 6',
          title: 'Copy Artifacts from Another Job',
          code: `stage('Get Dependencies') {
    steps {
        copyArtifacts(
            projectName: 'shared-library-build',
            selector: lastSuccessful(),
            filter: 'lib/**/*.jar'
        )
    }
}`,
          explanation: 'Copy artifacts from other Jenkins jobs. Great for sharing libraries or dependencies between projects.',
          concept: 'Cross-Job Artifacts'
        },
        {
          stage: 'Step 7',
          title: 'Complete Example',
          code: `pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                stash name: 'build', includes: 'dist/**'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
                junit '**/test-results/*.xml'
                publishHTML([
                    reportDir: 'coverage',
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ])
            }
        }
        
        stage('Package') {
            steps {
                unstash 'build'
                sh 'tar -czf app.tar.gz dist/'
                archiveArtifacts artifacts: 'app.tar.gz',
                                 fingerprint: true
            }
        }
        
        stage('Deploy to Environments') {
            parallel {
                stage('Deploy Dev') {
                    steps {
                        unstash 'build'
                        sh 'deploy-dev.sh'
                    }
                }
                stage('Deploy Staging') {
                    steps {
                        unstash 'build'
                        sh 'deploy-staging.sh'
                    }
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: '**/*.log',
                             allowEmptyArchive: true
        }
    }
}`,
          explanation: '✅ Complete! This pipeline efficiently shares files between stages using stash/unstash and archives important artifacts.',
          concept: 'Artifact Management'
        }
      ]
    },
    libraries: {
      name: 'Shared Libraries',
      description: 'Reuse code across multiple pipelines',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Load Shared Library',
          code: `@Library('my-shared-library') _

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Using shared library'
            }
        }
    }
}`,
          explanation: 'Load a shared library at the top of your Jenkinsfile. The underscore (_) imports all global variables.',
          concept: 'Library Import'
        },
        {
          stage: 'Step 2',
          title: 'Use Library Function',
          code: `@Library('my-shared-library') _

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    buildApp(
                        language: 'node',
                        version: '18'
                    )
                }
            }
        }
    }
}`,
          explanation: 'Call functions from your shared library. Pass parameters to customize behavior.',
          concept: 'Library Functions'
        },
        {
          stage: 'Step 3',
          title: 'Library with Version',
          code: `@Library('my-shared-library@v1.2.3') _

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    deployToK8s(
                        namespace: 'production',
                        replicas: 3
                    )
                }
            }
        }
    }
}`,
          explanation: 'Specify a library version using @version syntax. This ensures consistent behavior across builds.',
          concept: 'Library Versioning'
        },
        {
          stage: 'Step 4',
          title: 'Multiple Libraries',
          code: `@Library('build-tools@v2.0') _
@Library('deploy-tools@v1.5') _

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    buildTools.compile()
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    deployTools.deploy('prod')
                }
            }
        }
    }
}`,
          explanation: 'Load multiple shared libraries in the same pipeline. Each library can provide different functionality.',
          concept: 'Multiple Libraries'
        },
        {
          stage: 'Step 5',
          title: 'Custom Step from Library',
          code: `// In shared library: vars/standardBuild.groovy
def call(Map config) {
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    sh "npm install"
                    sh "npm run build"
                }
            }
            stage('Test') {
                steps {
                    sh "npm test"
                }
            }
        }
    }
}

// In Jenkinsfile:
@Library('my-shared-library') _
standardBuild(
    notify: true,
    slackChannel: '#builds'
)`,
          explanation: 'Create custom pipeline steps in your library. This allows teams to standardize build processes.',
          concept: 'Custom Steps'
        },
        {
          stage: 'Step 6',
          title: 'Library Structure',
          code: `// Shared Library Structure:
my-shared-library/
├── vars/
│   ├── buildApp.groovy       // Global variable
│   ├── deployToK8s.groovy    // Global variable
│   └── notify.groovy          // Global variable
├── src/
│   └── org/
│       └── mycompany/
│           ├── Build.groovy   // Class
│           └── Deploy.groovy  // Class
└── resources/
    ├── templates/
    │   └── Dockerfile
    └── scripts/
        └── deploy.sh`,
          explanation: 'Organize your shared library with vars/ for global functions, src/ for classes, and resources/ for files.',
          concept: 'Library Structure'
        },
        {
          stage: 'Step 7',
          title: 'Complete Example',
          code: `@Library('company-pipeline-library@v2.1.0') _

pipeline {
    agent any
    
    environment {
        APP_NAME = 'my-service'
        DEPLOY_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Use shared library function
                    buildApp(
                        language: 'node',
                        version: '18',
                        buildCommand: 'npm run build'
                    )
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    runTests(
                        type: 'unit',
                        coverage: true
                    )
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    dockerBuild(
                        imageName: env.APP_NAME,
                        tag: env.BUILD_NUMBER
                    )
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    deployToK8s(
                        namespace: env.DEPLOY_ENV,
                        image: "\${APP_NAME}:\${BUILD_NUMBER}",
                        replicas: 3
                    )
                }
            }
        }
    }
    
    post {
        always {
            script {
                notify(
                    channel: '#deployments',
                    status: currentBuild.result
                )
            }
        }
    }
}`,
          explanation: '✅ Complete! This pipeline uses shared library functions for all major operations, promoting code reuse and consistency.',
          concept: 'Library-Driven Pipeline'
        }
      ]
    },
    triggers: {
      name: 'Webhooks & Triggers',
      description: 'Automate pipeline execution',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'SCM Polling',
          code: `pipeline {
    agent any
    
    triggers {
        pollSCM('H/5 * * * *')  // Check every 5 minutes
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}`,
          explanation: 'Poll your source control for changes. H/5 means every 5 minutes with a hash-based offset to distribute load.',
          concept: 'SCM Polling'
        },
        {
          stage: 'Step 2',
          title: 'Cron Triggers',
          code: `pipeline {
    agent any
    
    triggers {
        cron('H 2 * * *')           // Daily at 2 AM
        cron('H H(0-7) * * 1-5')    // Weekdays, morning
        cron('0 0 * * 0')           // Sunday midnight
    }
    
    stages {
        stage('Nightly Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}`,
          explanation: 'Schedule builds with cron syntax. Use H for hash-based distribution to avoid load spikes.',
          concept: 'Scheduled Builds'
        },
        {
          stage: 'Step 3',
          title: 'GitHub Webhook',
          code: `pipeline {
    agent any
    
    triggers {
        githubPush()  // Trigger on GitHub push events
    }
    
    stages {
        stage('Build') {
            when {
                branch 'main'
            }
            steps {
                sh 'npm run build'
            }
        }
    }
}`,
          explanation: 'Trigger builds instantly when code is pushed to GitHub. Configure webhook in GitHub repository settings.',
          concept: 'GitHub Webhooks'
        },
        {
          stage: 'Step 4',
          title: 'GitLab Webhook',
          code: `pipeline {
    agent any
    
    triggers {
        gitlab(
            triggerOnPush: true,
            triggerOnMergeRequest: true,
            branchFilterType: 'All'
        )
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}`,
          explanation: 'Configure GitLab webhooks to trigger on push and merge requests. Filter by branch patterns.',
          concept: 'GitLab Integration'
        },
        {
          stage: 'Step 5',
          title: 'Upstream Triggers',
          code: `pipeline {
    agent any
    
    triggers {
        upstream(
            upstreamProjects: 'shared-library-build',
            threshold: hudson.model.Result.SUCCESS
        )
    }
    
    stages {
        stage('Build') {
            steps {
                copyArtifacts(
                    projectName: 'shared-library-build',
                    selector: lastSuccessful()
                )
                sh 'npm run build'
            }
        }
    }
}`,
          explanation: 'Trigger this pipeline when another job completes successfully. Great for build chains and dependencies.',
          concept: 'Upstream Triggers'
        },
        {
          stage: 'Step 6',
          title: 'Generic Webhook',
          code: `pipeline {
    agent any
    
    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'ref', value: '$.ref'],
                [key: 'author', value: '$.commits[0].author.name']
            ],
            causeString: 'Triggered by $ref from $author',
            token: 'my-secret-token',
            regexpFilterText: '$ref',
            regexpFilterExpression: 'refs/heads/(main|develop)'
        )
    }
    
    stages {
        stage('Build') {
            steps {
                echo "Building ref: \${ref}"
                echo "Author: \${author}"
            }
        }
    }
}`,
          explanation: 'Create custom webhooks that extract data from JSON payloads. Filter triggers with regex patterns.',
          concept: 'Generic Webhooks'
        },
        {
          stage: 'Step 7',
          title: 'Complete Example',
          code: `pipeline {
    agent any
    
    triggers {
        // Poll SCM as backup
        pollSCM('H/15 * * * *')
        
        // Nightly full build
        cron('H 2 * * *')
        
        // GitHub webhook for instant builds
        githubPush()
        
        // Trigger after dependency builds
        upstream(
            upstreamProjects: 'library-build,common-build',
            threshold: hudson.model.Result.SUCCESS
        )
    }
    
    parameters {
        booleanParam(
            name: 'FULL_BUILD',
            defaultValue: false,
            description: 'Run full build with all tests'
        )
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    if (currentBuild.getBuildCauses('hudson.triggers.TimerTrigger$TimerTriggerCause')) {
                        echo 'Triggered by cron - running full build'
                        env.FULL_BUILD = 'true'
                    }
                }
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            when {
                expression { env.FULL_BUILD == 'true' }
            }
            steps {
                sh 'npm run test:all'
            }
        }
        
        stage('Deploy') {
            when {
                allOf {
                    branch 'main'
                    expression { 
                        currentBuild.getBuildCauses('hudson.triggers.SCMTrigger$SCMTriggerCause') ||
                        currentBuild.getBuildCauses('com.cloudbees.jenkins.GitHubPushCause')
                    }
                }
            }
            steps {
                sh './deploy.sh'
            }
        }
    }
}`,
          explanation: '✅ Complete! This pipeline uses multiple trigger types and adapts behavior based on what triggered it.',
          concept: 'Multi-Trigger Pipeline'
        }
      ]
    },
    security: {
      name: 'Security & Credentials',
      description: 'Secure your pipelines and manage secrets',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Username/Password Credentials',
          code: `pipeline {
    agent any
    
    environment {
        DOCKER_CREDS = credentials('docker-hub-credentials')
    }
    
    stages {
        stage('Login') {
            steps {
                sh '''
                    echo $DOCKER_CREDS_PSW | docker login \\
                        -u $DOCKER_CREDS_USR \\
                        --password-stdin
                '''
            }
        }
    }
}`,
          explanation: 'Store username/password in Jenkins credentials. Jenkins creates _USR and _PSW variables automatically.',
          concept: 'Username/Password'
        },
        {
          stage: 'Step 2',
          title: 'Secret Text',
          code: `pipeline {
    agent any
    
    environment {
        API_KEY = credentials('api-key-secret')
        SLACK_TOKEN = credentials('slack-webhook')
    }
    
    stages {
        stage('Deploy') {
            steps {
                sh 'curl -H "Authorization: Bearer $API_KEY" api.example.com'
            }
        }
    }
}`,
          explanation: 'Use secret text for API keys and tokens. The value is masked in console output.',
          concept: 'Secret Text'
        },
        {
          stage: 'Step 3',
          title: 'SSH Keys',
          code: `pipeline {
    agent any
    
    stages {
        stage('Deploy') {
            steps {
                sshagent(['ssh-deploy-key']) {
                    sh '''
                        ssh user@server 'bash -s' < deploy.sh
                        scp app.tar.gz user@server:/opt/app/
                    '''
                }
            }
        }
    }
}`,
          explanation: 'Use SSH keys for secure server access. sshagent makes the key available to SSH commands.',
          concept: 'SSH Authentication'
        },
        {
          stage: 'Step 4',
          title: 'Certificate Files',
          code: `pipeline {
    agent any
    
    stages {
        stage('Deploy') {
            steps {
                withCredentials([
                    file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')
                ]) {
                    sh 'kubectl apply -f deployment.yaml'
                }
            }
        }
    }
}`,
          explanation: 'Store certificate files as credentials. Jenkins copies the file to a temporary location.',
          concept: 'File Credentials'
        },
        {
          stage: 'Step 5',
          title: 'Multiple Credentials',
          code: `pipeline {
    agent any
    
    stages {
        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-hub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    ),
                    string(
                        credentialsId: 'api-key',
                        variable: 'API_KEY'
                    ),
                    file(
                        credentialsId: 'deploy-cert',
                        variable: 'CERT_FILE'
                    )
                ]) {
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                    sh 'curl -H "X-API-Key: $API_KEY" api.example.com'
                    sh 'deploy.sh --cert $CERT_FILE'
                }
            }
        }
    }
}`,
          explanation: 'Use withCredentials to access multiple credentials in a single block with custom variable names.',
          concept: 'Multiple Credentials'
        },
        {
          stage: 'Step 6',
          title: 'Credential Scoping',
          code: `pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // No credentials needed
                sh 'npm run build'
            }
        }
        
        stage('Deploy to Dev') {
            environment {
                DEPLOY_CREDS = credentials('dev-credentials')
            }
            steps {
                sh './deploy.sh dev'
            }
        }
        
        stage('Deploy to Prod') {
            environment {
                DEPLOY_CREDS = credentials('prod-credentials')
            }
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh prod'
            }
        }
    }
}`,
          explanation: 'Scope credentials to specific stages. Use different credentials for different environments.',
          concept: 'Credential Scoping'
        },
        {
          stage: 'Step 7',
          title: 'Vault Integration',
          code: `pipeline {
    agent any
    
    stages {
        stage('Deploy') {
            steps {
                script {
                    def secrets = [
                        [
                            path: 'secret/data/prod/db',
                            secretValues: [
                                [envVar: 'DB_USER', vaultKey: 'username'],
                                [envVar: 'DB_PASS', vaultKey: 'password']
                            ]
                        ],
                        [
                            path: 'secret/data/prod/api',
                            secretValues: [
                                [envVar: 'API_KEY', vaultKey: 'key']
                            ]
                        ]
                    ]
                    
                    withVault([vaultSecrets: secrets]) {
                        sh '''
                            echo "Deploying with DB: $DB_USER"
                            ./deploy.sh
                        '''
                    }
                }
            }
        }
    }
}`,
          explanation: 'Integrate with HashiCorp Vault for dynamic secrets. Secrets are fetched at runtime and never stored.',
          concept: 'Vault Integration'
        },
        {
          stage: 'Step 8',
          title: 'Complete Secure Pipeline',
          code: `pipeline {
    agent any
    
    options {
        // Mask passwords in console output
        ansiColor('xterm')
        timestamps()
    }
    
    environment {
        // Global credentials
        REGISTRY = 'registry.example.com'
        DOCKER_CREDS = credentials('docker-registry')
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Push Image') {
            steps {
                sh '''
                    echo $DOCKER_CREDS_PSW | docker login \\
                        $REGISTRY \\
                        -u $DOCKER_CREDS_USR \\
                        --password-stdin
                    
                    docker push $REGISTRY/myapp:$BUILD_NUMBER
                '''
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([
                    file(credentialsId: 'kubeconfig-prod', variable: 'KUBECONFIG')
                ]) {
                    sh 'kubectl set image deployment/myapp myapp=$REGISTRY/myapp:$BUILD_NUMBER'
                }
            }
        }
        
        stage('Update Database') {
            steps {
                sshagent(['db-server-key']) {
                    sh 'ssh dbadmin@db.example.com "migrate.sh"'
                }
            }
        }
        
        stage('Notify') {
            steps {
                withCredentials([
                    string(credentialsId: 'slack-webhook', variable: 'SLACK_URL')
                ]) {
                    sh '''
                        curl -X POST $SLACK_URL \\
                            -H 'Content-Type: application/json' \\
                            -d '{"text":"Deployment successful!"}'
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Clean up sensitive data
            sh 'docker logout $REGISTRY'
        }
    }
}`,
          explanation: '✅ Complete! This pipeline securely manages multiple credential types and cleans up after execution.',
          concept: 'Secure Production Pipeline'
        }
      ]
    },
    notifications: {
      name: 'Notifications & Reporting',
      description: 'Alert teams about build status',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Email Notifications',
          code: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
    post {
        success {
            emailext(
                subject: "✅ Build Successful: \${JOB_NAME} #\${BUILD_NUMBER}",
                body: """
                    Build succeeded!
                    
                    Job: \${JOB_NAME}
                    Build: \${BUILD_NUMBER}
                    URL: \${BUILD_URL}
                """,
                to: 'team@example.com'
            )
        }
        failure {
            emailext(
                subject: "❌ Build Failed: \${JOB_NAME} #\${BUILD_NUMBER}",
                body: "Check console output at \${BUILD_URL}console",
                to: 'team@example.com'
            )
        }
    }
}`,
          explanation: 'Send email notifications on build success or failure. Include build details and links.',
          concept: 'Email Alerts'
        },
        {
          stage: 'Step 2',
          title: 'Slack Notifications',
          code: `post {
    success {
        slackSend(
            color: 'good',
            channel: '#deployments',
            message: """
                ✅ Deployment Successful
                Job: \${JOB_NAME}
                Build: #\${BUILD_NUMBER}
                Duration: \${currentBuild.durationString}
                <\${BUILD_URL}|View Build>
            """
        )
    }
    failure {
        slackSend(
            color: 'danger',
            channel: '#deployments',
            message: """
                ❌ Build Failed
                Job: \${JOB_NAME}
                Build: #\${BUILD_NUMBER}
                <\${BUILD_URL}console|Console Output>
            """
        )
    }
}`,
          explanation: 'Send rich Slack messages with colors and links. Use different channels for different events.',
          concept: 'Slack Integration'
        },
        {
          stage: 'Step 3',
          title: 'Microsoft Teams',
          code: `post {
    always {
        script {
            def status = currentBuild.result ?: 'SUCCESS'
            def color = status == 'SUCCESS' ? '00FF00' : 'FF0000'
            def message = status == 'SUCCESS' ? 'Build succeeded' : 'Build failed'
            
            office365ConnectorSend(
                webhookUrl: env.TEAMS_WEBHOOK,
                message: message,
                status: status,
                color: color,
                factDefinitions: [
                    [name: 'Job', template: env.JOB_NAME],
                    [name: 'Build', template: env.BUILD_NUMBER],
                    [name: 'Duration', template: currentBuild.durationString]
                ]
            )
        }
    }
}`,
          explanation: 'Send notifications to Microsoft Teams with custom cards and facts.',
          concept: 'Teams Integration'
        },
        {
          stage: 'Step 4',
          title: 'Custom Webhooks',
          code: `stage('Notify') {
    steps {
        script {
            def payload = [
                event: 'build_complete',
                job: env.JOB_NAME,
                build: env.BUILD_NUMBER,
                status: currentBuild.result,
                duration: currentBuild.duration,
                url: env.BUILD_URL,
                commit: env.GIT_COMMIT,
                branch: env.GIT_BRANCH
            ]
            
            sh """
                curl -X POST https://api.example.com/webhook \\
                    -H 'Content-Type: application/json' \\
                    -d '\${groovy.json.JsonOutput.toJson(payload)}'
            """
        }
    }
}`,
          explanation: 'Send custom webhook notifications with detailed build information in JSON format.',
          concept: 'Custom Webhooks'
        },
        {
          stage: 'Step 5',
          title: 'Jira Integration',
          code: `stage('Update Jira') {
    steps {
        script {
            // Extract Jira ticket from commit message
            def jiraTicket = sh(
                script: "git log -1 --pretty=%B | grep -oP '[A-Z]+-[0-9]+'",
                returnStdout: true
            ).trim()
            
            if (jiraTicket) {
                jiraComment(
                    issueKey: jiraTicket,
                    body: """
                        Build #\${BUILD_NUMBER} completed successfully.
                        View: \${BUILD_URL}
                    """
                )
                
                jiraTransitionIssue(
                    issueKey: jiraTicket,
                    transitionName: 'Deploy to Staging'
                )
            }
        }
    }
}`,
          explanation: 'Automatically update Jira tickets with build status and transition issues through workflow.',
          concept: 'Jira Automation'
        },
        {
          stage: 'Step 6',
          title: 'GitHub Status',
          code: `stage('Update GitHub') {
    steps {
        script {
            // Set commit status
            githubNotify(
                context: 'Jenkins CI',
                description: 'Build in progress',
                status: 'PENDING',
                targetUrl: env.BUILD_URL
            )
        }
    }
}

post {
    success {
        githubNotify(
            context: 'Jenkins CI',
            description: 'Build succeeded',
            status: 'SUCCESS'
        )
    }
    failure {
        githubNotify(
            context: 'Jenkins CI',
            description: 'Build failed',
            status: 'FAILURE'
        )
    }
}`,
          explanation: 'Update GitHub commit status to show build results directly in pull requests.',
          concept: 'GitHub Status Checks'
        },
        {
          stage: 'Step 7',
          title: 'Complete Notification Pipeline',
          code: `pipeline {
    agent any
    
    environment {
        SLACK_CHANNEL = '#deployments'
        TEAMS_WEBHOOK = credentials('teams-webhook')
    }
    
    stages {
        stage('Build') {
            steps {
                githubNotify(
                    context: 'Build',
                    status: 'PENDING',
                    description: 'Building...'
                )
                sh 'npm run build'
            }
            post {
                success {
                    githubNotify(
                        context: 'Build',
                        status: 'SUCCESS'
                    )
                }
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                sh './deploy.sh'
            }
        }
    }
    
    post {
        success {
            script {
                // Slack
                slackSend(
                    color: 'good',
                    channel: env.SLACK_CHANNEL,
                    message: "✅ \${JOB_NAME} #\${BUILD_NUMBER} succeeded"
                )
                
                // Email
                emailext(
                    subject: "✅ Deployment Successful",
                    body: "View at \${BUILD_URL}",
                    to: 'team@example.com'
                )
                
                // Jira
                def ticket = sh(
                    script: "git log -1 --pretty=%B | grep -oP '[A-Z]+-[0-9]+'",
                    returnStdout: true
                ).trim()
                if (ticket) {
                    jiraComment(
                        issueKey: ticket,
                        body: "Deployed in build #\${BUILD_NUMBER}"
                    )
                }
            }
        }
        
        failure {
            script {
                slackSend(
                    color: 'danger',
                    channel: env.SLACK_CHANNEL,
                    message: "❌ \${JOB_NAME} #\${BUILD_NUMBER} failed"
                )
                
                emailext(
                    subject: "❌ Build Failed",
                    body: "Check \${BUILD_URL}console",
                    to: 'team@example.com',
                    attachLog: true
                )
            }
        }
        
        unstable {
            slackSend(
                color: 'warning',
                channel: env.SLACK_CHANNEL,
                message: "⚠️ \${JOB_NAME} #\${BUILD_NUMBER} is unstable"
            )
        }
    }
}`,
          explanation: '✅ Complete! This pipeline notifies multiple channels with appropriate messages for each build status.',
          concept: 'Multi-Channel Notifications'
        }
      ]
    },
    scripting: {
      name: 'Advanced Scripting',
      description: 'Use Groovy for complex pipeline logic',
      code: '',
      steps: [
        {
          stage: 'Step 1',
          title: 'Script Block Basics',
          code: `stage('Dynamic Logic') {
    steps {
        script {
            def buildType = env.BRANCH_NAME == 'main' ? 'production' : 'development'
            echo "Building for: \${buildType}"
            
            if (buildType == 'production') {
                sh 'npm run build:prod'
            } else {
                sh 'npm run build:dev'
            }
        }
    }
}`,
          explanation: 'Use script blocks for complex logic with variables, conditionals, and loops.',
          concept: 'Script Blocks'
        },
        {
          stage: 'Step 2',
          title: 'Functions and Methods',
          code: `def buildApp(String environment) {
    echo "Building for \${environment}"
    sh "npm run build:\${environment}"
}

def runTests(Map config) {
    if (config.unit) {
        sh 'npm run test:unit'
    }
    if (config.integration) {
        sh 'npm run test:integration'
    }
}

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    buildApp('production')
                    runTests(unit: true, integration: true)
                }
            }
        }
    }
}`,
          explanation: 'Define reusable functions outside the pipeline block. Accept parameters for flexibility.',
          concept: 'Custom Functions'
        },
        {
          stage: 'Step 3',
          title: 'Working with JSON',
          code: `stage('Parse Config') {
    steps {
        script {
            def configFile = readFile('config.json')
            def config = readJSON text: configFile
            
            echo "App name: \${config.app.name}"
            echo "Version: \${config.app.version}"
            
            config.environments.each { env ->
                echo "Environment: \${env.name}"
                echo "URL: \${env.url}"
            }
            
            // Write JSON
            def output = [
                build: env.BUILD_NUMBER,
                timestamp: new Date().format('yyyy-MM-dd HH:mm:ss'),
                status: 'success'
            ]
            writeJSON file: 'build-info.json', json: output
        }
    }
}`,
          explanation: 'Read and parse JSON files. Iterate over arrays and create JSON output.',
          concept: 'JSON Processing'
        },
        {
          stage: 'Step 4',
          title: 'Working with YAML',
          code: `stage('Parse YAML') {
    steps {
        script {
            def yamlContent = readFile('config.yaml')
            def config = readYaml text: yamlContent
            
            config.services.each { service ->
                echo "Deploying \${service.name} to \${service.port}"
                sh "deploy.sh \${service.name} \${service.port}"
            }
            
            // Write YAML
            def output = [
                deployment: [
                    version: env.BUILD_NUMBER,
                    timestamp: new Date(),
                    services: config.services
                ]
            ]
            writeYaml file: 'deployment.yaml', data: output
        }
    }
}`,
          explanation: 'Parse YAML configuration files and generate YAML output for deployments.',
          concept: 'YAML Processing'
        },
        {
          stage: 'Step 5',
          title: 'Error Handling',
          code: `stage('Deploy with Retry') {
    steps {
        script {
            def maxRetries = 3
            def retryCount = 0
            def success = false
            
            while (retryCount < maxRetries && !success) {
                try {
                    sh './deploy.sh'
                    success = true
                    echo 'Deployment successful'
                } catch (Exception e) {
                    retryCount++
                    echo "Attempt \${retryCount} failed: \${e.message}"
                    
                    if (retryCount < maxRetries) {
                        echo 'Retrying in 30 seconds...'
                        sleep 30
                    } else {
                        error 'Deployment failed after \${maxRetries} attempts'
                    }
                }
            }
        }
    }
}`,
          explanation: 'Implement custom retry logic with try-catch blocks. Handle errors gracefully.',
          concept: 'Error Handling'
        },
        {
          stage: 'Step 6',
          title: 'Dynamic Stages',
          code: `pipeline {
    agent any
    stages {
        stage('Dynamic Deployment') {
            steps {
                script {
                    def environments = ['dev', 'staging', 'prod']
                    
                    for (env in environments) {
                        stage("Deploy to \${env}") {
                            if (env == 'prod' && env.BRANCH_NAME != 'main') {
                                echo "Skipping prod deployment for branch \${env.BRANCH_NAME}"
                                continue
                            }
                            
                            echo "Deploying to \${env}"
                            sh "./deploy.sh \${env}"
                            
                            if (env == 'prod') {
                                input message: "Verify \${env} deployment"
                            }
                        }
                    }
                }
            }
        }
    }
}`,
          explanation: 'Create stages dynamically based on data. Add conditional logic within loops.',
          concept: 'Dynamic Stages'
        },
        {
          stage: 'Step 7',
          title: 'Complete Scripting Example',
          code: `@NonCPS
def parseVersion(String version) {
    def parts = version.tokenize('.')
    return [
        major: parts[0].toInteger(),
        minor: parts[1].toInteger(),
        patch: parts[2].toInteger()
    ]
}

def deployToEnvironment(String env, Map config) {
    echo "Deploying \${config.app} v\${config.version} to \${env}"
    
    withCredentials([
        string(credentialsId: "\${env}-api-key", variable: 'API_KEY')
    ]) {
        sh """
            ./deploy.sh \\
                --env \${env} \\
                --app \${config.app} \\
                --version \${config.version} \\
                --api-key \${API_KEY}
        """
    }
}

pipeline {
    agent any
    
    stages {
        stage('Setup') {
            steps {
                script {
                    // Read and parse config
                    def configText = readFile('app-config.json')
                    env.CONFIG = readJSON text: configText
                    
                    // Parse version
                    def version = parseVersion(env.CONFIG.version)
                    echo "Version: \${version.major}.\${version.minor}.\${version.patch}"
                    
                    // Determine environments to deploy
                    env.DEPLOY_ENVS = []
                    if (env.BRANCH_NAME == 'develop') {
                        env.DEPLOY_ENVS = ['dev']
                    } else if (env.BRANCH_NAME == 'main') {
                        env.DEPLOY_ENVS = ['staging', 'prod']
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    sh "npm run build"
                    
                    // Archive with version
                    def artifactName = "\${env.CONFIG.app}-\${env.CONFIG.version}.tar.gz"
                    sh "tar -czf \${artifactName} dist/"
                    archiveArtifacts artifacts: artifactName
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    env.DEPLOY_ENVS.each { environment ->
                        stage("Deploy to \${environment}") {
                            deployToEnvironment(environment, env.CONFIG)
                            
                            // Verify deployment
                            def healthCheck = sh(
                                script: "curl -f https://\${environment}.example.com/health",
                                returnStatus: true
                            )
                            
                            if (healthCheck != 0) {
                                error "Health check failed for \${environment}"
                            }
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Generate deployment report
                def report = [
                    job: env.JOB_NAME,
                    build: env.BUILD_NUMBER,
                    version: env.CONFIG.version,
                    environments: env.DEPLOY_ENVS,
                    status: currentBuild.result,
                    duration: currentBuild.durationString
                ]
                writeJSON file: 'deployment-report.json', json: report
                archiveArtifacts artifacts: 'deployment-report.json'
            }
        }
    }
}`,
          explanation: '✅ Complete! This pipeline uses advanced Groovy scripting for dynamic, data-driven deployments with custom functions.',
          concept: 'Advanced Pipeline Scripting'
        }
      ]
    },
    usecases: {
      name: 'Real-World Use Cases',
      description: 'Practical Jenkins CI/CD pipeline examples used in real projects',
      steps: []
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 min-h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Learn to Write Jenkinsfiles
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Step-by-step tutorial to build CI/CD pipelines from scratch
          </p>
        </motion.div>

        {/* Scenario Selection */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
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
                onClick={() => setScenario('pipeline')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'pipeline' 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Rocket size={14} />
                Basic Pipeline
              </button>
              <button
                onClick={() => setScenario('build')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'build' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Package size={14} />
                Variables
              </button>
              <button
                onClick={() => setScenario('test')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'test' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Play size={14} />
                Conditionals
              </button>
              <button
                onClick={() => setScenario('deploy')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'deploy' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <GitBranch size={14} />
                Error Handling
              </button>
              <button
                onClick={() => setScenario('parallel')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'parallel' 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Package size={14} />
                Parallel
              </button>
              <button
                onClick={() => setScenario('params')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'params' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Rocket size={14} />
                Parameters
              </button>
              <button
                onClick={() => setScenario('docker')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'docker' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Package size={14} />
                Docker
              </button>
              <button
                onClick={() => setScenario('artifacts')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'artifacts' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <GitBranch size={14} />
                Artifacts
              </button>
              <button
                onClick={() => setScenario('libraries')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'libraries' 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Package size={14} />
                Libraries
              </button>
              <button
                onClick={() => setScenario('triggers')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'triggers' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Rocket size={14} />
                Triggers
              </button>
              <button
                onClick={() => setScenario('security')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'security' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <GitBranch size={14} />
                Security
              </button>
              <button
                onClick={() => setScenario('notifications')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'notifications' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Rocket size={14} />
                Notifications
              </button>
              <button
                onClick={() => setScenario('scripting')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                  scenario === 'scripting' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <GitBranch size={14} />
                Scripting
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
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 lg:min-h-0 lg:overflow-hidden">
          {/* Unified Console View */}
          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">
              {scenarios[scenario].name}
            </h2>
            <div className="flex-1 min-h-0 overflow-auto space-y-3 custom-scrollbar">
              {/* Description */}
              <div className="glass-card p-2 sm:p-3 bg-white/5">
                <p className="text-xs text-gray-300">
                  {scenarios[scenario].description}
                </p>
              </div>

              {/* Show Use Cases or Code Editor based on scenario */}
              {scenario === 'usecases' ? (
                /* Real-World Use Cases with Code Examples */
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">💼</span>
                    Real-World CI/CD Pipeline Examples
                  </h3>
                  
                  <div className="space-y-4">
                {/* Use Case 1: Node.js App with Automated Testing */}
                <div className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/5">
                  <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <span>🧪</span>
                    Use Case 1: Node.js App with Automated Testing & Deployment
                  </h4>
                  
                  {/* Diagram */}
                  <div className="mb-3 glass-card p-2 bg-black/30">
                    <JenkinsDiagram type="pipeline" />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Manual testing and deployment is slow and error-prone. Need to catch bugs before production.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Automate build, test, and deployment pipeline with Jenkins.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Jenkinsfile
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/company/app.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
                sh 'npm run test:coverage'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                sh 'scp -r dist/ user@staging-server:/var/www/app'
                sh 'ssh user@staging-server "pm2 restart app"'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input 'Deploy to production?'
                sh 'scp -r dist/ user@prod-server:/var/www/app'
                sh 'ssh user@prod-server "pm2 restart app"'
            }
        }
    }
    
    post {
        success {
            slackSend color: 'good', message: "Build Successful!"
        }
        failure {
            slackSend color: 'danger', message: "Build Failed!"
        }
    }
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">What it does:</span> Automatically pulls code, installs dependencies, runs tests, builds the app, and deploys to staging. Production deployment requires manual approval. Sends Slack notifications on success/failure.
                    </p>
                  </div>
                </div>

                {/* Use Case 2: Docker Build & Push */}
                <div className="border border-cyan-500/30 rounded-lg p-3 bg-cyan-500/5">
                  <h4 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <span>🐳</span>
                    Use Case 2: Build Docker Image & Deploy to Kubernetes
                  </h4>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Need to containerize app and deploy to Kubernetes cluster automatically.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Build Docker image, push to registry, update Kubernetes deployment.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Jenkinsfile
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_TAG = "\${BUILD_NUMBER}"
        DOCKER_REGISTRY = "docker.io/mycompany"
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("\${DOCKER_REGISTRY}/\${DOCKER_IMAGE}:\${DOCKER_TAG}")
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry('https://docker.io', 'docker-credentials') {
                        docker.image("\${DOCKER_REGISTRY}/\${DOCKER_IMAGE}:\${DOCKER_TAG}").push()
                        docker.image("\${DOCKER_REGISTRY}/\${DOCKER_IMAGE}:\${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    kubectl set image deployment/myapp \\
                        myapp=\${DOCKER_REGISTRY}/\${DOCKER_IMAGE}:\${DOCKER_TAG} \\
                        --record
                    kubectl rollout status deployment/myapp
                """
            }
        }
    }
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">What it does:</span> Builds Docker image with unique tag (build number), pushes to Docker Hub, updates Kubernetes deployment with new image, and waits for rollout to complete. Enables easy rollback if needed.
                    </p>
                  </div>
                </div>

                {/* Use Case 3: Multi-Branch Pipeline */}
                <div className="border border-green-500/30 rounded-lg p-3 bg-green-500/5">
                  <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                    <span>🌿</span>
                    Use Case 3: Multi-Branch Pipeline for Feature Development
                  </h4>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Each feature branch needs its own test environment and deployment.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Automatically create pipelines for each branch with branch-specific deployments.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Jenkinsfile
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`pipeline {
    agent any
    
    stages {
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    def branchName = env.BRANCH_NAME
                    def deployUrl = ""
                    
                    if (branchName == 'main') {
                        deployUrl = 'https://app.production.com'
                        sh 'kubectl apply -f k8s/production/'
                    } else if (branchName == 'develop') {
                        deployUrl = 'https://app.staging.com'
                        sh 'kubectl apply -f k8s/staging/'
                    } else if (branchName.startsWith('feature/')) {
                        deployUrl = "https://\${branchName}.preview.com"
                        sh """
                            kubectl create namespace \${branchName} || true
                            kubectl apply -f k8s/preview/ -n \${branchName}
                        """
                    }
                    
                    echo "Deployed to: \${deployUrl}"
                }
            }
        }
    }
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">What it does:</span> Automatically detects branch name and deploys to appropriate environment. Main → production, develop → staging, feature branches → preview environments. Each feature gets its own URL for testing.
                    </p>
                  </div>
                </div>

                {/* Use Case 4: Scheduled Database Backup */}
                <div className="border border-orange-500/30 rounded-lg p-3 bg-orange-500/5">
                  <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                    <span>💾</span>
                    Use Case 4: Automated Database Backup & Health Checks
                  </h4>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Need regular database backups and health monitoring without manual intervention.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Schedule Jenkins job to backup database and run health checks.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Jenkinsfile (Scheduled Job)
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`pipeline {
    agent any
    
    triggers {
        cron('0 2 * * *')  // Run daily at 2 AM
    }
    
    stages {
        stage('Database Backup') {
            steps {
                sh """
                    DATE=\$(date +%Y%m%d_%H%M%S)
                    BACKUP_FILE="backup_\${DATE}.sql"
                    
                    # Backup PostgreSQL database
                    pg_dump -h db-server -U admin myapp > \${BACKUP_FILE}
                    
                    # Compress backup
                    gzip \${BACKUP_FILE}
                    
                    # Upload to S3
                    aws s3 cp \${BACKUP_FILE}.gz s3://backups/database/
                    
                    # Keep only last 30 days of backups
                    aws s3 ls s3://backups/database/ | \\
                        awk '{print \$4}' | \\
                        head -n -30 | \\
                        xargs -I {} aws s3 rm s3://backups/database/{}
                """
            }
        }
        
        stage('Health Check') {
            steps {
                sh """
                    # Check if app is responding
                    curl -f https://app.production.com/health || exit 1
                    
                    # Check database connectivity
                    psql -h db-server -U admin -c "SELECT 1" || exit 1
                    
                    # Check disk space
                    df -h | awk '\$5 > 80 {exit 1}'
                """
            }
        }
    }
    
    post {
        failure {
            emailext (
                subject: "ALERT: Backup or Health Check Failed",
                body: "Check Jenkins for details",
                to: "devops@company.com"
            )
        }
    }
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">What it does:</span> Runs automatically every night at 2 AM. Backs up database, compresses it, uploads to S3, and cleans old backups. Performs health checks on app, database, and disk space. Sends email alerts if anything fails.
                    </p>
                  </div>
                </div>

                {/* Use Case 5: Microservices Deployment Pipeline */}
                <div className="border border-pink-500/30 rounded-lg p-3 bg-pink-500/5">
                  <h4 className="font-semibold text-pink-300 mb-2 flex items-center gap-2">
                    <span>🔧</span>
                    Use Case 5: Microservices Deployment with Service Dependencies
                  </h4>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> E-commerce app has 5 microservices that depend on each other. Need to deploy them in correct order.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Create a pipeline that builds and deploys services in dependency order with health checks.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Jenkinsfile
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = "mycompany/ecommerce"
        VERSION = "\${BUILD_NUMBER}"
    }
    
    stages {
        stage('Build All Services') {
            parallel {
                stage('Auth Service') {
                    steps {
                        dir('auth-service') {
                            sh 'docker build -t \${DOCKER_REGISTRY}/auth:\${VERSION} .'
                            sh 'docker push \${DOCKER_REGISTRY}/auth:\${VERSION}'
                        }
                    }
                }
                stage('Product Service') {
                    steps {
                        dir('product-service') {
                            sh 'docker build -t \${DOCKER_REGISTRY}/product:\${VERSION} .'
                            sh 'docker push \${DOCKER_REGISTRY}/product:\${VERSION}'
                        }
                    }
                }
                stage('Cart Service') {
                    steps {
                        dir('cart-service') {
                            sh 'docker build -t \${DOCKER_REGISTRY}/cart:\${VERSION} .'
                            sh 'docker push \${DOCKER_REGISTRY}/cart:\${VERSION}'
                        }
                    }
                }
                stage('Payment Service') {
                    steps {
                        dir('payment-service') {
                            sh 'docker build -t \${DOCKER_REGISTRY}/payment:\${VERSION} .'
                            sh 'docker push \${DOCKER_REGISTRY}/payment:\${VERSION}'
                        }
                    }
                }
                stage('Order Service') {
                    steps {
                        dir('order-service') {
                            sh 'docker build -t \${DOCKER_REGISTRY}/order:\${VERSION} .'
                            sh 'docker push \${DOCKER_REGISTRY}/order:\${VERSION}'
                        }
                    }
                }
            }
        }
        
        stage('Deploy in Order') {
            stages {
                stage('Deploy Auth') {
                    steps {
                        sh 'kubectl set image deployment/auth auth=\${DOCKER_REGISTRY}/auth:\${VERSION}'
                        sh 'kubectl rollout status deployment/auth'
                        sh 'curl -f http://auth-service/health || exit 1'
                    }
                }
                stage('Deploy Product & Cart') {
                    parallel {
                        stage('Product') {
                            steps {
                                sh 'kubectl set image deployment/product product=\${DOCKER_REGISTRY}/product:\${VERSION}'
                                sh 'kubectl rollout status deployment/product'
                            }
                        }
                        stage('Cart') {
                            steps {
                                sh 'kubectl set image deployment/cart cart=\${DOCKER_REGISTRY}/cart:\${VERSION}'
                                sh 'kubectl rollout status deployment/cart'
                            }
                        }
                    }
                }
                stage('Deploy Payment') {
                    steps {
                        sh 'kubectl set image deployment/payment payment=\${DOCKER_REGISTRY}/payment:\${VERSION}'
                        sh 'kubectl rollout status deployment/payment'
                    }
                }
                stage('Deploy Order') {
                    steps {
                        sh 'kubectl set image deployment/order order=\${DOCKER_REGISTRY}/order:\${VERSION}'
                        sh 'kubectl rollout status deployment/order'
                    }
                }
            }
        }
        
        stage('Integration Tests') {
            steps {
                sh 'npm run test:integration'
            }
        }
    }
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">What it does:</span> Builds all 5 microservices in parallel (faster). Deploys them in dependency order: Auth first (others need it), then Product & Cart (independent), then Payment, finally Order (depends on all). Waits for each deployment to complete before moving to next. Runs integration tests after all services are up.
                    </p>
                  </div>
                </div>

                {/* Use Case 6: Blue-Green Deployment */}
                <div className="border border-indigo-500/30 rounded-lg p-3 bg-indigo-500/5">
                  <h4 className="font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                    <span>🔄</span>
                    Use Case 6: Zero-Downtime Blue-Green Deployment
                  </h4>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-yellow-400">Problem:</span> Need to deploy new version with absolutely zero downtime and instant rollback capability.
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <span className="font-semibold text-green-400">Solution:</span> Deploy to inactive environment (green), test it, then switch traffic from blue to green.
                    </p>
                  </div>

                  <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                    <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                      Jenkinsfile
                    </div>
                    <div className="p-3 font-mono text-xs">
                      <pre className="text-green-300 whitespace-pre">{`pipeline {
    agent any
    
    stages {
        stage('Determine Active Environment') {
            steps {
                script {
                    // Check which environment is currently active
                    def activeEnv = sh(
                        script: 'kubectl get service myapp -o jsonpath="{.spec.selector.version}"',
                        returnStdout: true
                    ).trim()
                    
                    if (activeEnv == 'blue') {
                        env.ACTIVE = 'blue'
                        env.INACTIVE = 'green'
                    } else {
                        env.ACTIVE = 'green'
                        env.INACTIVE = 'blue'
                    }
                    
                    echo "Active: \${env.ACTIVE}, Deploying to: \${env.INACTIVE}"
                }
            }
        }
        
        stage('Deploy to Inactive Environment') {
            steps {
                sh """
                    kubectl set image deployment/myapp-\${INACTIVE} \\
                        myapp=myapp:\${BUILD_NUMBER}
                    kubectl rollout status deployment/myapp-\${INACTIVE}
                """
            }
        }
        
        stage('Run Smoke Tests on Inactive') {
            steps {
                sh """
                    # Test the inactive environment
                    curl -f http://myapp-\${INACTIVE}-service/health
                    curl -f http://myapp-\${INACTIVE}-service/api/status
                    
                    # Run automated tests
                    npm run test:smoke -- --url=http://myapp-\${INACTIVE}-service
                """
            }
        }
        
        stage('Switch Traffic') {
            steps {
                input message: "Switch traffic to \${INACTIVE}?", ok: "Deploy"
                
                sh """
                    # Update service selector to point to inactive environment
                    kubectl patch service myapp -p '{"spec":{"selector":{"version":"\${INACTIVE}"}}}'
                    
                    echo "Traffic switched from \${ACTIVE} to \${INACTIVE}"
                """
            }
        }
        
        stage('Monitor New Environment') {
            steps {
                sh """
                    # Monitor for 5 minutes
                    for i in {1..10}; do
                        echo "Monitoring... \$i/10"
                        curl -f http://myapp-service/health || exit 1
                        sleep 30
                    done
                """
            }
        }
        
        stage('Scale Down Old Environment') {
            steps {
                sh """
                    # Keep old environment running but scaled down
                    kubectl scale deployment/myapp-\${ACTIVE} --replicas=1
                    
                    echo "Old environment (\${ACTIVE}) scaled down but available for rollback"
                """
            }
        }
    }
    
    post {
        failure {
            script {
                // Automatic rollback on failure
                sh """
                    kubectl patch service myapp -p '{"spec":{"selector":{"version":"\${ACTIVE}"}}}'
                    echo "ROLLED BACK to \${ACTIVE}"
                """
            }
        }
    }
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-purple-300">What it does:</span> Maintains two identical environments (blue and green). Deploys new version to inactive environment while active serves traffic. Runs smoke tests on new version. Switches traffic instantly by updating service selector. Monitors for issues. Old environment stays running for instant rollback if needed. Zero downtime - users never experience interruption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              /* Code Editor for other scenarios */
              <div className="glass-card p-2 sm:p-3 bg-black/50 border border-gray-600">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-600">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400">Jenkinsfile Editor</span>
                </div>
                
                <div className="font-mono text-xs space-y-4">
                  {scenarios[scenario].steps.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {/* Step Header */}
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-700">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-blue-400 font-bold">
                            {s.title}
                          </div>
                          <div className="text-purple-300 text-xs mt-0.5">
                            📚 {s.concept}
                          </div>
                        </div>
                      </div>
                      
                      {/* Code Block with Line Numbers */}
                      <div className="mb-3">
                          <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden">
                            <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                              Code
                            </div>
                            <div className="p-3">
                              {s.code.split('\n').map((line: string, lineIdx: number) => (
                                <div key={lineIdx} className="flex gap-3">
                                  <span className="text-gray-600 select-none w-6 text-right">
                                    {lineIdx + 1}
                                  </span>
                                  <pre className="text-green-300 whitespace-pre flex-1">
                                    {line}
                                  </pre>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      
                      {/* Explanation */}
                      <div className="p-3 rounded bg-blue-500/10 border border-blue-400/30">
                          <div className="text-blue-300 text-xs">
                            💡 {s.explanation}
                          </div>
                          {'alternatives' in s && s.alternatives && (
                            <div className="mt-2 pt-2 border-t border-blue-400/30">
                              <div className="text-gray-400 text-xs mb-1 font-semibold">
                                Alternative Options:
                              </div>
                              <div className="bg-gray-900/50 rounded p-2">
                                {s.alternatives.split('\n').map((line: string, lineIdx: number) => (
                                  <div key={lineIdx} className="text-gray-400 text-xs">
                                    {line}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
