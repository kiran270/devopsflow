import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Cloud, Database, Server, Shield } from 'lucide-react'
import AWSArchitecture from '../components/animations/AWSArchitecture'

export default function AWS() {
  const [scenario, setScenario] = useState<'intro' | 'ec2' | 's3' | 'rds' | 'lambda' | 'vpc' | 'iam' | 'cloudformation' | 'elasticache' | 'sqs' | 'sns' | 'cloudwatch' | 'ecs' | 'apigateway' | 'dynamodb' | 'usecases'>('intro')

  const scenarios = {
    intro: {
      name: 'Introduction to AWS',
      description: 'Amazon Web Services (AWS) is the world\'s leading cloud platform with 200+ services. Learn cloud fundamentals, global infrastructure, and why companies like Netflix and NASA use AWS.',
      steps: [
        {
          title: 'What is AWS?',
          code: `Amazon Web Services (AWS) is the world's most comprehensive 
and broadly adopted cloud platform.

Key Benefits:
• Pay only for what you use (no upfront costs)
• Scale up or down instantly
• Global infrastructure (30+ regions worldwide)
• 200+ services available
• Enterprise-grade security`,
          explanation: 'AWS provides on-demand cloud computing platforms and APIs on a metered pay-as-you-go basis.',
          concept: 'Cloud Computing Fundamentals',
          useCase: '🎯 Used by Netflix, Airbnb, NASA, and millions of companies'
        },
        {
          title: 'AWS Global Infrastructure',
          code: `AWS Infrastructure Components:

1. Regions (30+ worldwide)
   - Geographic areas (e.g., us-east-1, eu-west-1)
   - Each region has multiple Availability Zones
   
2. Availability Zones (AZs)
   - Isolated data centers within a region
   - Connected with high-speed networking
   - Provides fault tolerance
   
3. Edge Locations (400+)
   - Content Delivery Network (CloudFront)
   - Reduces latency for users worldwide`,
          explanation: 'AWS infrastructure is designed for high availability, fault tolerance, and low latency.',
          concept: 'Global Infrastructure',
          useCase: '🌍 Deploy applications close to your users for better performance'
        },
        {
          title: 'Core AWS Services',
          code: `Compute:
• EC2 - Virtual servers in the cloud
• Lambda - Serverless compute
• ECS/EKS - Container orchestration

Storage:
• S3 - Object storage
• EBS - Block storage for EC2
• EFS - Elastic file system

Database:
• RDS - Managed relational databases
• DynamoDB - NoSQL database
• ElastiCache - In-memory cache

Networking:
• VPC - Virtual Private Cloud
• Route 53 - DNS service
• CloudFront - CDN`,
          explanation: 'AWS offers 200+ services across compute, storage, database, networking, and more.',
          concept: 'AWS Service Categories',
          useCase: '🎯 Choose the right service for your application needs'
        }
      ]
    },
    ec2: {
      name: 'EC2 - Elastic Compute Cloud',
      description: 'Virtual servers in the cloud that you can launch in minutes. Perfect for web servers, application hosting, batch processing, and any workload that needs compute power. Pay only for what you use.',
      steps: [
        {
          title: 'Launch EC2 Instance',
          code: `# Using AWS CLI to launch an EC2 instance

aws ec2 run-instances \\
  --image-id ami-0c55b159cbfafe1f0 \\
  --instance-type t2.micro \\
  --key-name MyKeyPair \\
  --security-group-ids sg-0123456789abcdef0 \\
  --subnet-id subnet-0bb1c79de3EXAMPLE \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyWebServer}]'`,
          explanation: 'Launches a t2.micro EC2 instance with specified AMI, security group, and tags.',
          concept: 'EC2 Instance Launch',
          useCase: '🎯 Create virtual servers for web applications, databases, or any workload'
        },
        {
          title: 'Connect to EC2 Instance',
          code: `# SSH into your EC2 instance

# 1. Set permissions on key file
chmod 400 MyKeyPair.pem

# 2. Connect via SSH
ssh -i MyKeyPair.pem ec2-user@ec2-54-123-45-67.compute-1.amazonaws.com

# 3. Update system
sudo yum update -y

# 4. Install web server
sudo yum install -y httpd
sudo systemctl start httpd
sudo systemctl enable httpd`,
          explanation: 'Connect to EC2 instance using SSH and set up a web server.',
          concept: 'EC2 Access & Configuration',
          useCase: '🌐 Deploy and manage applications on EC2'
        },
        {
          title: 'EC2 Instance Types',
          code: `EC2 Instance Families:

General Purpose (t3, t2, m5):
• Balanced compute, memory, networking
• Use: Web servers, small databases

Compute Optimized (c5, c6):
• High-performance processors
• Use: Batch processing, gaming servers

Memory Optimized (r5, x1):
• Fast performance for large datasets
• Use: In-memory databases, big data

Storage Optimized (i3, d2):
• High sequential read/write
• Use: Data warehousing, Hadoop

GPU Instances (p3, g4):
• Graphics processing
• Use: Machine learning, video rendering`,
          explanation: 'Choose instance type based on your workload requirements.',
          concept: 'EC2 Instance Types',
          useCase: '💡 Right-size your instances for cost optimization'
        }
      ]
    },
    s3: {
      name: 'S3 - Simple Storage Service',
      description: 'Unlimited object storage for files, backups, static websites, and data lakes. 99.999999999% durability. Use cases: host websites, store backups, serve images/videos, data analytics.',
      steps: [
        {
          title: 'Create S3 Bucket',
          code: `# Create S3 bucket using AWS CLI

# 1. Create bucket
aws s3 mb s3://my-devopsflow-bucket --region us-east-1

# 2. Enable versioning
aws s3api put-bucket-versioning \\
  --bucket my-devopsflow-bucket \\
  --versioning-configuration Status=Enabled

# 3. Enable encryption
aws s3api put-bucket-encryption \\
  --bucket my-devopsflow-bucket \\
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'`,
          explanation: 'Creates an S3 bucket with versioning and encryption enabled for security.',
          concept: 'S3 Bucket Creation',
          useCase: '📦 Store files, backups, static websites, or application data'
        },
        {
          title: 'Upload & Download Files',
          code: `# Upload files to S3

# Upload single file
aws s3 cp myfile.txt s3://my-devopsflow-bucket/

# Upload directory recursively
aws s3 cp ./website s3://my-devopsflow-bucket/ --recursive

# Download file
aws s3 cp s3://my-devopsflow-bucket/myfile.txt ./

# Sync directory (like rsync)
aws s3 sync ./local-folder s3://my-devopsflow-bucket/backup/

# List bucket contents
aws s3 ls s3://my-devopsflow-bucket/

# Delete file
aws s3 rm s3://my-devopsflow-bucket/myfile.txt`,
          explanation: 'Common S3 operations for uploading, downloading, and managing files.',
          concept: 'S3 File Operations',
          useCase: '🔄 Backup files, host static websites, or store application assets'
        },
        {
          title: 'S3 Static Website Hosting',
          code: `# Host static website on S3

# 1. Enable static website hosting
aws s3 website s3://my-devopsflow-bucket/ \\
  --index-document index.html \\
  --error-document error.html

# 2. Set bucket policy for public access
aws s3api put-bucket-policy \\
  --bucket my-devopsflow-bucket \\
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-devopsflow-bucket/*"
    }]
  }'

# 3. Upload website files
aws s3 sync ./build s3://my-devopsflow-bucket/ --delete

# Website URL:
# http://my-devopsflow-bucket.s3-website-us-east-1.amazonaws.com`,
          explanation: 'Configure S3 bucket to host a static website with public access.',
          concept: 'S3 Static Website',
          useCase: '🌐 Host React, Vue, or static HTML websites cheaply'
        }
      ]
    },
    rds: {
      name: 'RDS - Relational Database Service',
      description: 'Fully managed relational databases (PostgreSQL, MySQL, Oracle, SQL Server). AWS handles backups, patching, scaling, and high availability. Focus on your app, not database maintenance.',
      steps: [
        {
          title: 'Create RDS Database',
          code: `# Create PostgreSQL RDS instance

aws rds create-db-instance \\
  --db-instance-identifier myapp-db \\
  --db-instance-class db.t3.micro \\
  --engine postgres \\
  --engine-version 15.3 \\
  --master-username admin \\
  --master-user-password MySecurePassword123! \\
  --allocated-storage 20 \\
  --storage-type gp3 \\
  --vpc-security-group-ids sg-0123456789abcdef0 \\
  --db-subnet-group-name my-db-subnet-group \\
  --backup-retention-period 7 \\
  --preferred-backup-window "03:00-04:00" \\
  --preferred-maintenance-window "mon:04:00-mon:05:00" \\
  --multi-az \\
  --publicly-accessible false \\
  --storage-encrypted \\
  --enable-cloudwatch-logs-exports '["postgresql"]'`,
          explanation: 'Creates a production-ready PostgreSQL database with backups, encryption, and Multi-AZ.',
          concept: 'RDS Database Creation',
          useCase: '🗄️ Managed database without worrying about patches, backups, or scaling'
        },
        {
          title: 'Connect to RDS',
          code: `# Connect to RDS database

# 1. Get endpoint
aws rds describe-db-instances \\
  --db-instance-identifier myapp-db \\
  --query 'DBInstances[0].Endpoint.Address' \\
  --output text

# Output: myapp-db.c9akciq32.us-east-1.rds.amazonaws.com

# 2. Connect using psql
psql -h myapp-db.c9akciq32.us-east-1.rds.amazonaws.com \\
     -U admin \\
     -d postgres

# 3. From application (Node.js example)
const { Pool } = require('pg');

const pool = new Pool({
  host: 'myapp-db.c9akciq32.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'myapp',
  user: 'admin',
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});`,
          explanation: 'Connect to RDS database from command line or application code.',
          concept: 'RDS Connection',
          useCase: '🔌 Connect your applications to managed databases'
        }
      ]
    },
    lambda: {
      name: 'Lambda - Serverless Functions',
      description: 'Run code without provisioning servers. Pay only for compute time (per millisecond). Perfect for APIs, data processing, scheduled tasks, and event-driven architectures. Scales automatically.',
      steps: [
        {
          title: 'Create Lambda Function',
          code: `# Create a simple Lambda function

# 1. Create function code (index.js)
exports.handler = async (event) => {
    console.log('Event:', JSON.stringify(event));
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda!',
            input: event
        })
    };
    
    return response;
};

# 2. Zip the code
zip function.zip index.js

# 3. Create Lambda function
aws lambda create-function \\
  --function-name MyLambdaFunction \\
  --runtime nodejs18.x \\
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip \\
  --timeout 30 \\
  --memory-size 256`,
          explanation: 'Creates a serverless function that runs only when triggered - no servers to manage!',
          concept: 'Lambda Function Creation',
          useCase: '⚡ Run code in response to events without provisioning servers'
        },
        {
          title: 'Invoke Lambda Function',
          code: `# Test Lambda function

# 1. Invoke synchronously
aws lambda invoke \\
  --function-name MyLambdaFunction \\
  --payload '{"name": "DevOpsFlow", "action": "test"}' \\
  response.json

# 2. View response
cat response.json

# 3. View logs
aws logs tail /aws/lambda/MyLambdaFunction --follow

# 4. Update function code
zip function.zip index.js
aws lambda update-function-code \\
  --function-name MyLambdaFunction \\
  --zip-file fileb://function.zip`,
          explanation: 'Invoke Lambda function and view results and logs.',
          concept: 'Lambda Invocation',
          useCase: '🚀 Test and debug serverless functions'
        },
        {
          title: 'Lambda with API Gateway',
          code: `# Create REST API with Lambda backend

# 1. Create REST API
aws apigateway create-rest-api \\
  --name MyAPI \\
  --description "API for DevOpsFlow"

# 2. Get API ID
API_ID=$(aws apigateway get-rest-apis \\
  --query 'items[?name==\`MyAPI\`].id' \\
  --output text)

# 3. Get root resource ID
ROOT_ID=$(aws apigateway get-resources \\
  --rest-api-id $API_ID \\
  --query 'items[?path==\`/\`].id' \\
  --output text)

# 4. Create resource
aws apigateway create-resource \\
  --rest-api-id $API_ID \\
  --parent-id $ROOT_ID \\
  --path-part hello

# 5. Add Lambda integration
# ... (simplified for brevity)

# Result: https://abc123.execute-api.us-east-1.amazonaws.com/prod/hello`,
          explanation: 'Expose Lambda function as HTTP API endpoint using API Gateway.',
          concept: 'Lambda + API Gateway',
          useCase: '🌐 Build serverless REST APIs'
        }
      ]
    },
    vpc: {
      name: 'VPC - Virtual Private Cloud',
      description: 'Your own isolated network in AWS. Control IP ranges, subnets, route tables, and security. Keep databases private, expose only web servers. Essential for production security.',
      steps: [
        {
          title: 'Create VPC',
          code: `# Create VPC with public and private subnets

# 1. Create VPC
aws ec2 create-vpc \\
  --cidr-block 10.0.0.0/16 \\
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=MyVPC}]'

# 2. Create public subnet
aws ec2 create-subnet \\
  --vpc-id vpc-0123456789abcdef0 \\
  --cidr-block 10.0.1.0/24 \\
  --availability-zone us-east-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=PublicSubnet}]'

# 3. Create private subnet
aws ec2 create-subnet \\
  --vpc-id vpc-0123456789abcdef0 \\
  --cidr-block 10.0.2.0/24 \\
  --availability-zone us-east-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=PrivateSubnet}]'

# 4. Create Internet Gateway
aws ec2 create-internet-gateway \\
  --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=MyIGW}]'

# 5. Attach to VPC
aws ec2 attach-internet-gateway \\
  --vpc-id vpc-0123456789abcdef0 \\
  --internet-gateway-id igw-0123456789abcdef0`,
          explanation: 'Creates isolated network with public and private subnets for security.',
          concept: 'VPC Setup',
          useCase: '🔒 Isolate resources and control network traffic'
        }
      ]
    },
    iam: {
      name: 'IAM - Identity & Access Management',
      description: 'Control who can access what in your AWS account. Create users, roles, and policies. Follow principle of least privilege. Essential for security and compliance.',
      steps: [
        {
          title: 'Create IAM User',
          code: `# Create IAM user with programmatic access

aws iam create-user --user-name developer

# Create access key
aws iam create-access-key --user-name developer

# Attach policy
aws iam attach-user-policy \\
  --user-name developer \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`,
          explanation: 'Creates IAM user with specific permissions for secure access.',
          concept: 'IAM User Management',
          useCase: '👤 Control who can access what in your AWS account'
        }
      ]
    },
    cloudformation: {
      name: 'CloudFormation - Infrastructure as Code',
      description: 'Define your entire infrastructure as code (YAML/JSON). Version control your infrastructure, create identical environments, automate deployments. No more manual clicking in console.',
      steps: [
        {
          title: 'CloudFormation Template',
          code: `# CloudFormation template (YAML)

AWSTemplateFormatVersion: '2010-09-09'
Description: 'DevOpsFlow Infrastructure'

Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: DevOpsFlowVPC

  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0c55b159cbfafe1f0
      InstanceType: t2.micro
      KeyName: MyKeyPair
      Tags:
        - Key: Name
          Value: DevOpsFlowServer`,
          explanation: 'Define entire infrastructure as code - version controlled and repeatable.',
          concept: 'Infrastructure as Code',
          useCase: '📝 Create identical environments with one command'
        }
      ]
    },
    elasticache: {
      name: 'ElastiCache - In-Memory Caching',
      description: 'Managed Redis/Memcached for ultra-fast data access. Speed up apps 10-100x by caching database queries, sessions, and API responses. Reduce database load by 80-90%.',
      steps: [
        {
          title: 'Create Redis Cluster',
          code: `# Create ElastiCache Redis cluster for caching

# 1. Create Redis cluster
aws elasticache create-cache-cluster \\
  --cache-cluster-id my-redis-cluster \\
  --cache-node-type cache.t3.micro \\
  --engine redis \\
  --engine-version 7.0 \\
  --num-cache-nodes 1 \\
  --cache-subnet-group-name my-cache-subnet \\
  --security-group-ids sg-0123456789abcdef0 \\
  --port 6379

# 2. Get endpoint
aws elasticache describe-cache-clusters \\
  --cache-cluster-id my-redis-cluster \\
  --show-cache-node-info

# Output: my-redis-cluster.abc123.0001.use1.cache.amazonaws.com:6379`,
          explanation: 'Creates a managed Redis cluster for caching database queries and session data.',
          concept: 'In-Memory Caching',
          useCase: '⚡ Speed up applications by 10-100x with caching'
        },
        {
          title: 'Use Redis in Application',
          code: `# Node.js example with Redis caching

const redis = require('redis');
const { Pool } = require('pg');

// Connect to ElastiCache Redis
const cache = redis.createClient({
  host: 'my-redis-cluster.abc123.0001.use1.cache.amazonaws.com',
  port: 6379
});

const db = new Pool({ /* RDS config */ });

// Cache database queries
async function getUser(userId) {
  const cacheKey = \`user:\${userId}\`;
  
  // Try cache first
  const cached = await cache.get(cacheKey);
  if (cached) {
    console.log('Cache HIT');
    return JSON.parse(cached);
  }
  
  // Cache miss - query database
  console.log('Cache MISS - querying DB');
  const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];
  
  // Store in cache for 1 hour
  await cache.setex(cacheKey, 3600, JSON.stringify(user));
  
  return user;
}

// Session storage
async function saveSession(sessionId, data) {
  await cache.setex(\`session:\${sessionId}\`, 86400, JSON.stringify(data));
}

// Rate limiting
async function checkRateLimit(userId) {
  const key = \`ratelimit:\${userId}\`;
  const count = await cache.incr(key);
  
  if (count === 1) {
    await cache.expire(key, 60); // 1 minute window
  }
  
  return count <= 100; // 100 requests per minute
}`,
          explanation: 'Use Redis for caching, sessions, and rate limiting to improve performance.',
          concept: 'Redis Usage Patterns',
          useCase: '🚀 Reduce database load by 80-90%'
        }
      ]
    },
    sqs: {
      name: 'SQS - Simple Queue Service',
      description: 'Reliable message queue for decoupling microservices. Process tasks asynchronously (emails, image processing, data imports). Handles millions of messages, auto-scales, never loses data.',
      steps: [
        {
          title: 'Create SQS Queue',
          code: `# Create SQS queue for asynchronous processing

# 1. Create standard queue
aws sqs create-queue \\
  --queue-name my-task-queue \\
  --attributes '{
    "DelaySeconds": "0",
    "MessageRetentionPeriod": "345600",
    "VisibilityTimeout": "30",
    "ReceiveMessageWaitTimeSeconds": "20"
  }'

# 2. Create Dead Letter Queue (DLQ) for failed messages
aws sqs create-queue \\
  --queue-name my-task-queue-dlq

# 3. Set DLQ on main queue
aws sqs set-queue-attributes \\
  --queue-url https://sqs.us-east-1.amazonaws.com/123456789012/my-task-queue \\
  --attributes '{
    "RedrivePolicy": "{\\"deadLetterTargetArn\\":\\"arn:aws:sqs:us-east-1:123456789012:my-task-queue-dlq\\",\\"maxReceiveCount\\":\\"3\\"}"
  }'`,
          explanation: 'Creates a message queue for decoupling microservices and handling async tasks.',
          concept: 'Message Queue',
          useCase: '📬 Process tasks asynchronously without blocking'
        },
        {
          title: 'Send & Receive Messages',
          code: `# Producer - Send messages to queue

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

const queueUrl = 'https://sqs.us-east-1.amazonaws.com/123456789012/my-task-queue';

// Send message
async function sendTask(task) {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(task),
    MessageAttributes: {
      'TaskType': {
        DataType: 'String',
        StringValue: task.type
      },
      'Priority': {
        DataType: 'Number',
        StringValue: task.priority.toString()
      }
    }
  };
  
  const result = await sqs.sendMessage(params).promise();
  console.log('Message sent:', result.MessageId);
}

// Consumer - Process messages
async function processMessages() {
  while (true) {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20, // Long polling
      MessageAttributeNames: ['All']
    };
    
    const data = await sqs.receiveMessage(params).promise();
    
    if (data.Messages) {
      for (const message of data.Messages) {
        try {
          const task = JSON.parse(message.Body);
          console.log('Processing task:', task);
          
          // Process the task
          await handleTask(task);
          
          // Delete message after successful processing
          await sqs.deleteMessage({
            QueueUrl: queueUrl,
            ReceiptHandle: message.ReceiptHandle
          }).promise();
          
        } catch (error) {
          console.error('Failed to process:', error);
          // Message will return to queue or go to DLQ after 3 attempts
        }
      }
    }
  }
}

// Example: Send email task
await sendTask({
  type: 'send-email',
  to: 'user@example.com',
  subject: 'Welcome!',
  priority: 1
});`,
          explanation: 'Send and receive messages for background job processing.',
          concept: 'Queue Operations',
          useCase: '⚙️ Handle email sending, image processing, data imports'
        }
      ]
    },
    sns: {
      name: 'SNS - Simple Notification Service',
      description: 'Pub/Sub messaging to fan out events to multiple subscribers. Send notifications via email, SMS, Lambda, SQS. Perfect for event-driven architectures and real-time alerts.',
      steps: [
        {
          title: 'Create SNS Topic',
          code: `# Create SNS topic for pub/sub messaging

# 1. Create topic
aws sns create-topic --name order-events

# Output: arn:aws:sns:us-east-1:123456789012:order-events

# 2. Subscribe email endpoint
aws sns subscribe \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:order-events \\
  --protocol email \\
  --notification-endpoint admin@example.com

# 3. Subscribe Lambda function
aws sns subscribe \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:order-events \\
  --protocol lambda \\
  --notification-endpoint arn:aws:lambda:us-east-1:123456789012:function:process-order

# 4. Subscribe SQS queue
aws sns subscribe \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:order-events \\
  --protocol sqs \\
  --notification-endpoint arn:aws:sqs:us-east-1:123456789012:order-queue`,
          explanation: 'Creates a pub/sub topic that can fan out messages to multiple subscribers.',
          concept: 'Pub/Sub Messaging',
          useCase: '📢 Notify multiple services when events occur'
        },
        {
          title: 'Publish Messages',
          code: `# Publish messages to SNS topic

const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const topicArn = 'arn:aws:sns:us-east-1:123456789012:order-events';

// Publish event
async function publishOrderEvent(order) {
  const params = {
    TopicArn: topicArn,
    Message: JSON.stringify({
      eventType: 'ORDER_CREATED',
      orderId: order.id,
      customerId: order.customerId,
      total: order.total,
      timestamp: new Date().toISOString()
    }),
    Subject: 'New Order Created',
    MessageAttributes: {
      'eventType': {
        DataType: 'String',
        StringValue: 'ORDER_CREATED'
      },
      'priority': {
        DataType: 'Number',
        StringValue: '1'
      }
    }
  };
  
  const result = await sns.publish(params).promise();
  console.log('Published to SNS:', result.MessageId);
}

// Send SMS notification
async function sendSMS(phoneNumber, message) {
  await sns.publish({
    PhoneNumber: phoneNumber,
    Message: message
  }).promise();
}

// Example: Order created event
await publishOrderEvent({
  id: 'ORD-12345',
  customerId: 'CUST-789',
  total: 99.99
});

// All subscribers receive the message:
// - Email sent to admin
// - Lambda function processes order
// - SQS queue receives for async processing`,
          explanation: 'Publish events that multiple services can react to independently.',
          concept: 'Event-Driven Architecture',
          useCase: '🔔 Decouple services with event notifications'
        }
      ]
    },
    cloudwatch: {
      name: 'CloudWatch - Monitoring & Logging',
      description: 'Monitor your entire AWS infrastructure. Collect logs, set alarms, create dashboards, track metrics. Get alerted before issues become outages. Essential for production operations.',
      steps: [
        {
          title: 'CloudWatch Metrics & Alarms',
          code: `# Monitor application metrics and set alarms

# 1. Put custom metric
aws cloudwatch put-metric-data \\
  --namespace "MyApp" \\
  --metric-name "OrdersProcessed" \\
  --value 42 \\
  --unit Count \\
  --dimensions Environment=Production

# 2. Create alarm for high CPU
aws cloudwatch put-metric-alarm \\
  --alarm-name high-cpu-alarm \\
  --alarm-description "Alert when CPU exceeds 80%" \\
  --metric-name CPUUtilization \\
  --namespace AWS/EC2 \\
  --statistic Average \\
  --period 300 \\
  --threshold 80 \\
  --comparison-operator GreaterThanThreshold \\
  --evaluation-periods 2 \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:alerts

# 3. Create alarm for Lambda errors
aws cloudwatch put-metric-alarm \\
  --alarm-name lambda-errors \\
  --metric-name Errors \\
  --namespace AWS/Lambda \\
  --statistic Sum \\
  --period 60 \\
  --threshold 5 \\
  --comparison-operator GreaterThanThreshold \\
  --evaluation-periods 1 \\
  --dimensions Name=FunctionName,Value=my-function \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:alerts`,
          explanation: 'Monitor metrics and get alerted when thresholds are breached.',
          concept: 'Monitoring & Alerting',
          useCase: '🚨 Get notified before issues become outages'
        },
        {
          title: 'CloudWatch Logs',
          code: `# Application logging with CloudWatch Logs

# Node.js example with Winston
const winston = require('winston');
const CloudWatchTransport = require('winston-cloudwatch');

const logger = winston.createLogger({
  transports: [
    new CloudWatchTransport({
      logGroupName: '/aws/application/myapp',
      logStreamName: \`\${process.env.ENVIRONMENT}-\${new Date().toISOString().split('T')[0]}\`,
      awsRegion: 'us-east-1'
    })
  ]
});

// Log with structured data
logger.info('User logged in', {
  userId: 'user-123',
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...'
});

logger.error('Payment failed', {
  orderId: 'ORD-456',
  error: 'Card declined',
  amount: 99.99
});

# Query logs with CloudWatch Insights
aws logs start-query \\
  --log-group-name /aws/application/myapp \\
  --start-time $(date -u -d '1 hour ago' +%s) \\
  --end-time $(date -u +%s) \\
  --query-string '
    fields @timestamp, userId, message
    | filter message like /error/
    | stats count() by userId
    | sort count desc
    | limit 10
  '

# Create metric filter for errors
aws logs put-metric-filter \\
  --log-group-name /aws/application/myapp \\
  --filter-name ErrorCount \\
  --filter-pattern "[ERROR]" \\
  --metric-transformations \\
    metricName=ApplicationErrors,metricNamespace=MyApp,metricValue=1`,
          explanation: 'Centralized logging with powerful query capabilities.',
          concept: 'Log Management',
          useCase: '📊 Debug issues and analyze application behavior'
        }
      ]
    },
    ecs: {
      name: 'ECS - Elastic Container Service',
      description: 'Run Docker containers with AWS Fargate (serverless) or EC2. Simpler than Kubernetes for most use cases. Auto-scaling, load balancing, zero-downtime deployments built-in.',
      steps: [
        {
          title: 'Create ECS Cluster with Fargate',
          code: `# Deploy containers with ECS Fargate (serverless)

# 1. Create ECS cluster
aws ecs create-cluster --cluster-name my-app-cluster

# 2. Create task definition
cat > task-definition.json <<EOF
{
  "family": "my-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "my-app",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:db-url"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

aws ecs register-task-definition --cli-input-json file://task-definition.json`,
          explanation: 'Define how your container should run with CPU, memory, and environment.',
          concept: 'ECS Task Definition',
          useCase: '🐳 Run containers without managing EC2 instances'
        },
        {
          title: 'Create ECS Service',
          code: `# Create ECS service with load balancer

# 1. Create service
aws ecs create-service \\
  --cluster my-app-cluster \\
  --service-name my-app-service \\
  --task-definition my-app \\
  --desired-count 2 \\
  --launch-type FARGATE \\
  --network-configuration '{
    "awsvpcConfiguration": {
      "subnets": ["subnet-12345", "subnet-67890"],
      "securityGroups": ["sg-12345"],
      "assignPublicIp": "ENABLED"
    }
  }' \\
  --load-balancers '[
    {
      "targetGroupArn": "arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/my-app/abc123",
      "containerName": "my-app",
      "containerPort": 3000
    }
  ]'

# 2. Enable auto-scaling
aws application-autoscaling register-scalable-target \\
  --service-namespace ecs \\
  --resource-id service/my-app-cluster/my-app-service \\
  --scalable-dimension ecs:service:DesiredCount \\
  --min-capacity 2 \\
  --max-capacity 10

aws application-autoscaling put-scaling-policy \\
  --service-namespace ecs \\
  --resource-id service/my-app-cluster/my-app-service \\
  --scalable-dimension ecs:service:DesiredCount \\
  --policy-name cpu-scaling \\
  --policy-type TargetTrackingScaling \\
  --target-tracking-scaling-policy-configuration '{
    "TargetValue": 70.0,
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ECSServiceAverageCPUUtilization"
    }
  }'

# 3. Update service (zero-downtime deployment)
aws ecs update-service \\
  --cluster my-app-cluster \\
  --service my-app-service \\
  --task-definition my-app:2 \\
  --force-new-deployment`,
          explanation: 'Run and auto-scale containers with load balancing and zero-downtime deployments.',
          concept: 'ECS Service Management',
          useCase: '🚀 Production-ready container orchestration'
        }
      ]
    },
    apigateway: {
      name: 'API Gateway - API Management',
      description: 'Create REST and WebSocket APIs at any scale. Built-in authentication, rate limiting, caching, CORS. Perfect frontend for Lambda functions. Handle millions of requests.',
      steps: [
        {
          title: 'Create REST API',
          code: `# Create REST API with API Gateway

# 1. Create REST API
aws apigateway create-rest-api \\
  --name "My API" \\
  --description "DevOpsFlow API" \\
  --endpoint-configuration types=REGIONAL

# Get API ID
API_ID=$(aws apigateway get-rest-apis \\
  --query 'items[?name==\`My API\`].id' \\
  --output text)

# 2. Get root resource
ROOT_ID=$(aws apigateway get-resources \\
  --rest-api-id $API_ID \\
  --query 'items[?path==\`/\`].id' \\
  --output text)

# 3. Create /users resource
aws apigateway create-resource \\
  --rest-api-id $API_ID \\
  --parent-id $ROOT_ID \\
  --path-part users

USERS_ID=$(aws apigateway get-resources \\
  --rest-api-id $API_ID \\
  --query 'items[?path==\`/users\`].id' \\
  --output text)

# 4. Add GET method
aws apigateway put-method \\
  --rest-api-id $API_ID \\
  --resource-id $USERS_ID \\
  --http-method GET \\
  --authorization-type NONE

# 5. Integrate with Lambda
aws apigateway put-integration \\
  --rest-api-id $API_ID \\
  --resource-id $USERS_ID \\
  --http-method GET \\
  --type AWS_PROXY \\
  --integration-http-method POST \\
  --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:getUsers/invocations`,
          explanation: 'Create RESTful API endpoints that integrate with Lambda, EC2, or other backends.',
          concept: 'REST API Creation',
          useCase: '🌐 Build scalable APIs with authentication and rate limiting'
        },
        {
          title: 'API Gateway Features',
          code: `# Advanced API Gateway features

# 1. Add API Key for authentication
aws apigateway create-api-key \\
  --name "Mobile App Key" \\
  --enabled

# 2. Create usage plan with rate limiting
aws apigateway create-usage-plan \\
  --name "Basic Plan" \\
  --throttle burstLimit=100,rateLimit=50 \\
  --quota limit=10000,period=MONTH

# 3. Enable CORS
aws apigateway put-method-response \\
  --rest-api-id $API_ID \\
  --resource-id $USERS_ID \\
  --http-method GET \\
  --status-code 200 \\
  --response-parameters '{
    "method.response.header.Access-Control-Allow-Origin": true
  }'

# 4. Add request validation
aws apigateway create-request-validator \\
  --rest-api-id $API_ID \\
  --name "Validate body and parameters" \\
  --validate-request-body \\
  --validate-request-parameters

# 5. Deploy API
aws apigateway create-deployment \\
  --rest-api-id $API_ID \\
  --stage-name prod \\
  --stage-description "Production" \\
  --description "Production deployment"

# API URL: https://{api-id}.execute-api.us-east-1.amazonaws.com/prod/users

# 6. Custom domain
aws apigateway create-domain-name \\
  --domain-name api.example.com \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/abc123`,
          explanation: 'Add authentication, rate limiting, CORS, and custom domains to your API.',
          concept: 'API Management',
          useCase: '🔐 Production-ready APIs with security and monitoring'
        }
      ]
    },
    dynamodb: {
      name: 'DynamoDB - NoSQL Database',
      description: 'Fully managed NoSQL database with single-digit millisecond latency at any scale. Perfect for mobile apps, gaming, IoT. Auto-scales, serverless pricing, built-in backups.',
      steps: [
        {
          title: 'Create DynamoDB Table',
          code: `# Create DynamoDB table for high-performance NoSQL

# 1. Create table with on-demand billing
aws dynamodb create-table \\
  --table-name Users \\
  --attribute-definitions \\
    AttributeName=userId,AttributeType=S \\
    AttributeName=email,AttributeType=S \\
  --key-schema \\
    AttributeName=userId,KeyType=HASH \\
  --global-secondary-indexes '[
    {
      "IndexName": "EmailIndex",
      "KeySchema": [
        {"AttributeName": "email", "KeyType": "HASH"}
      ],
      "Projection": {"ProjectionType": "ALL"}
    }
  ]' \\
  --billing-mode PAY_PER_REQUEST \\
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES

# 2. Enable Point-in-Time Recovery
aws dynamodb update-continuous-backups \\
  --table-name Users \\
  --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true

# 3. Enable TTL for auto-deletion
aws dynamodb update-time-to-live \\
  --table-name Users \\
  --time-to-live-specification "Enabled=true,AttributeName=expiresAt"`,
          explanation: 'Create a NoSQL table with secondary indexes and automatic backups.',
          concept: 'DynamoDB Table',
          useCase: '⚡ Single-digit millisecond latency at any scale'
        },
        {
          title: 'DynamoDB Operations',
          code: `# CRUD operations with DynamoDB

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// 1. Put item
async function createUser(user) {
  await dynamodb.put({
    TableName: 'Users',
    Item: {
      userId: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date().toISOString(),
      expiresAt: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year TTL
    }
  }).promise();
}

// 2. Get item
async function getUser(userId) {
  const result = await dynamodb.get({
    TableName: 'Users',
    Key: { userId }
  }).promise();
  return result.Item;
}

// 3. Query by secondary index
async function getUserByEmail(email) {
  const result = await dynamodb.query({
    TableName: 'Users',
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  }).promise();
  return result.Items[0];
}

// 4. Update item
async function updateUser(userId, updates) {
  await dynamodb.update({
    TableName: 'Users',
    Key: { userId },
    UpdateExpression: 'SET #name = :name, updatedAt = :now',
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ExpressionAttributeValues: {
      ':name': updates.name,
      ':now': new Date().toISOString()
    }
  }).promise();
}

// 5. Delete item
async function deleteUser(userId) {
  await dynamodb.delete({
    TableName: 'Users',
    Key: { userId }
  }).promise();
}

// 6. Batch operations (up to 25 items)
async function batchGetUsers(userIds) {
  const result = await dynamodb.batchGet({
    RequestItems: {
      'Users': {
        Keys: userIds.map(id => ({ userId: id }))
      }
    }
  }).promise();
  return result.Responses.Users;
}

// 7. Scan with filter (use sparingly)
async function getActiveUsers() {
  const result = await dynamodb.scan({
    TableName: 'Users',
    FilterExpression: 'attribute_exists(lastLoginAt) AND lastLoginAt > :thirtyDaysAgo',
    ExpressionAttributeValues: {
      ':thirtyDaysAgo': new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  }).promise();
  return result.Items;
}`,
          explanation: 'Perform CRUD operations with DynamoDB SDK.',
          concept: 'DynamoDB Operations',
          useCase: '📱 Perfect for mobile apps, gaming, IoT'
        }
      ]
    },
    usecases: {
      name: 'Real-World Use Cases',
      description: 'Production-ready architectures used by real companies: scalable web apps, serverless APIs, CI/CD pipelines, data processing, disaster recovery, and microservices with complete code examples.',
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            AWS Tutorial
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Learn Amazon Web Services through practical examples
          </p>
        </motion.div>

        {/* Scenario Selection */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
              onClick={() => setScenario('ec2')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'ec2' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Server size={14} />
              EC2
            </button>
            <button
              onClick={() => setScenario('s3')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 's3' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Database size={14} />
              S3
            </button>
            <button
              onClick={() => setScenario('rds')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'rds' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Database size={14} />
              RDS
            </button>
            <button
              onClick={() => setScenario('lambda')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'lambda' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              ⚡ Lambda
            </button>
            <button
              onClick={() => setScenario('vpc')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'vpc' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Cloud size={14} />
              VPC
            </button>
            <button
              onClick={() => setScenario('iam')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'iam' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Shield size={14} />
              IAM
            </button>
            <button
              onClick={() => setScenario('cloudformation')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'cloudformation' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              📝 CloudFormation
            </button>
            <button
              onClick={() => setScenario('elasticache')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'elasticache' 
                  ? 'bg-red-400 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              ⚡ ElastiCache
            </button>
            <button
              onClick={() => setScenario('sqs')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'sqs' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              📬 SQS
            </button>
            <button
              onClick={() => setScenario('sns')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'sns' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              📢 SNS
            </button>
            <button
              onClick={() => setScenario('cloudwatch')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'cloudwatch' 
                  ? 'bg-blue-400 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              📊 CloudWatch
            </button>
            <button
              onClick={() => setScenario('ecs')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'ecs' 
                  ? 'bg-orange-400 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              🐳 ECS
            </button>
            <button
              onClick={() => setScenario('apigateway')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'apigateway' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              🌐 API Gateway
            </button>
            <button
              onClick={() => setScenario('dynamodb')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'dynamodb' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Database size={14} />
              DynamoDB
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

              {/* Show Use Cases or Terminal based on scenario */}
              {scenario === 'usecases' ? (
                /* Real-World Use Cases with Code Examples */
                <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">💼</span>
              Real-World AWS Use Cases in Projects
            </h3>
            
            <div className="space-y-4">
              {/* Use Case 1: Scalable Web Application */}
              <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <span>🌐</span>
                  Scalable Web Application Architecture
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-3">
                  Deploy a production-ready web app with auto-scaling, load balancing, and database
                </p>
                
                {/* Architecture Diagram */}
                <div className="mb-3 glass-card p-2 bg-black/30">
                  <AWSArchitecture type="web-app" />
                </div>
                <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                  <pre className="text-[10px] sm:text-xs text-green-400">
{`# Architecture:
# - Route 53 (DNS)
# - CloudFront (CDN)
# - Application Load Balancer
# - EC2 Auto Scaling Group
# - RDS Multi-AZ Database
# - S3 for static assets

# 1. Create Application Load Balancer
aws elbv2 create-load-balancer \\
  --name my-app-alb \\
  --subnets subnet-12345 subnet-67890 \\
  --security-groups sg-12345

# 2. Create Target Group
aws elbv2 create-target-group \\
  --name my-app-targets \\
  --protocol HTTP \\
  --port 80 \\
  --vpc-id vpc-12345 \\
  --health-check-path /health

# 3. Create Launch Template
aws ec2 create-launch-template \\
  --launch-template-name my-app-template \\
  --version-description "v1" \\
  --launch-template-data '{
    "ImageId": "ami-0c55b159cbfafe1f0",
    "InstanceType": "t3.micro",
    "UserData": "IyEvYmluL2Jhc2gKY3VybCAtc0wgaHR0cHM6Ly9naXQuaW8vdjFhbHBoYSB8IHNo"
  }'

# 4. Create Auto Scaling Group
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name my-app-asg \\
  --launch-template LaunchTemplateName=my-app-template \\
  --min-size 2 \\
  --max-size 10 \\
  --desired-capacity 2 \\
  --target-group-arns arn:aws:elasticloadbalancing:... \\
  --vpc-zone-identifier "subnet-12345,subnet-67890"

# 5. Configure Auto Scaling Policy
aws autoscaling put-scaling-policy \\
  --auto-scaling-group-name my-app-asg \\
  --policy-name cpu-scale-up \\
  --policy-type TargetTrackingScaling \\
  --target-tracking-configuration '{
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 70.0
  }'

# Result: Auto-scales from 2 to 10 instances based on CPU`}
                  </pre>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  💡 Used by: Netflix, Airbnb - handles millions of requests with automatic scaling
                </div>
              </div>

              {/* Use Case 2: Serverless API */}
              <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <span>⚡</span>
                  Serverless REST API with Lambda
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-3">
                  Build a cost-effective API that scales automatically and only charges for actual usage
                </p>
                
                {/* Architecture Diagram */}
                <div className="mb-3 glass-card p-2 bg-black/30">
                  <AWSArchitecture type="serverless" />
                </div>
                <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                  <pre className="text-[10px] sm:text-xs text-green-400">
{`# Architecture:
# - API Gateway (REST API)
# - Lambda Functions (Node.js)
# - DynamoDB (NoSQL Database)
# - CloudWatch (Logging)

# 1. Create DynamoDB Table
aws dynamodb create-table \\
  --table-name Users \\
  --attribute-definitions \\
    AttributeName=userId,AttributeType=S \\
  --key-schema AttributeName=userId,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST

# 2. Lambda Function Code (index.js)
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { httpMethod, path, body } = event;
  
  // GET /users/{userId}
  if (httpMethod === 'GET' && path.startsWith('/users/')) {
    const userId = path.split('/')[2];
    const result = await dynamodb.get({
      TableName: 'Users',
      Key: { userId }
    }).promise();
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Item)
    };
  }
  
  // POST /users
  if (httpMethod === 'POST' && path === '/users') {
    const user = JSON.parse(body);
    await dynamodb.put({
      TableName: 'Users',
      Item: user
    }).promise();
    
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User created' })
    };
  }
  
  return { statusCode: 404, body: 'Not Found' };
};

# 3. Deploy with SAM (Serverless Application Model)
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  UsersAPI:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs18.x
      Events:
        GetUser:
          Type: Api
          Properties:
            Path: /users/{userId}
            Method: get
        CreateUser:
          Type: Api
          Properties:
            Path: /users
            Method: post

# Deploy
sam build
sam deploy --guided

# Cost: ~$0.20 per million requests (vs $50+/month for EC2)`}
                  </pre>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  💡 Perfect for: Startups, microservices, APIs with variable traffic
                </div>
              </div>

              {/* Use Case 3: Static Website with CI/CD */}
              <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <span>🚀</span>
                  Static Website with CI/CD Pipeline
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-3">
                  Host React/Vue/Next.js apps with automatic deployments and global CDN
                </p>
                <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                  <pre className="text-[10px] sm:text-xs text-green-400">
{`# Architecture:
# - S3 (Static Hosting)
# - CloudFront (Global CDN)
# - Route 53 (Custom Domain)
# - CodePipeline (CI/CD)
# - GitHub (Source)

# 1. Create S3 Bucket for Website
aws s3 mb s3://my-app.example.com
aws s3 website s3://my-app.example.com \\
  --index-document index.html \\
  --error-document index.html

# 2. Create CloudFront Distribution
aws cloudfront create-distribution \\
  --origin-domain-name my-app.example.com.s3-website-us-east-1.amazonaws.com \\
  --default-root-object index.html

# 3. GitHub Actions Workflow (.github/workflows/deploy.yml)
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install & Build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to S3
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 sync ./build s3://my-app.example.com --delete
          aws cloudfront create-invalidation \\
            --distribution-id E1234567890ABC \\
            --paths "/*"

# 4. Custom Domain with Route 53
aws route53 change-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "my-app.example.com",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "d1234567890abc.cloudfront.net",
          "EvaluateTargetHealth": false
        }
      }
    }]
  }'

# Result: Push to GitHub → Auto-deploy to AWS in 2 minutes
# Cost: ~$1-5/month for most sites`}
                  </pre>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  💡 Used by: This DevOpsFlow app could be hosted this way!
                </div>
              </div>

              {/* Use Case 4: Data Processing Pipeline */}
              <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <span>📊</span>
                  Real-Time Data Processing Pipeline
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-3">
                  Process streaming data in real-time with serverless architecture
                </p>
                
                {/* Architecture Diagram */}
                <div className="mb-3 glass-card p-2 bg-black/30">
                  <AWSArchitecture type="data-pipeline" />
                </div>
                <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                  <pre className="text-[10px] sm:text-xs text-green-400">
{`# Architecture:
# - Kinesis Data Streams (Ingestion)
# - Lambda (Processing)
# - S3 (Data Lake)
# - Athena (Analytics)
# - QuickSight (Visualization)

# 1. Create Kinesis Stream
aws kinesis create-stream \\
  --stream-name user-events \\
  --shard-count 2

# 2. Lambda Function to Process Events
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const records = event.Records.map(record => {
    const payload = Buffer.from(record.kinesis.data, 'base64').toString();
    return JSON.parse(payload);
  });
  
  // Process and enrich data
  const processed = records.map(record => ({
    ...record,
    processedAt: new Date().toISOString(),
    region: process.env.AWS_REGION
  }));
  
  // Save to S3 Data Lake
  const key = \`events/year=\${new Date().getFullYear()}/month=\${new Date().getMonth() + 1}/data.json\`;
  await s3.putObject({
    Bucket: 'my-data-lake',
    Key: key,
    Body: JSON.stringify(processed)
  }).promise();
  
  return { processed: records.length };
};

# 3. Connect Lambda to Kinesis
aws lambda create-event-source-mapping \\
  --function-name process-events \\
  --event-source-arn arn:aws:kinesis:us-east-1:123456789012:stream/user-events \\
  --starting-position LATEST \\
  --batch-size 100

# 4. Query with Athena
CREATE EXTERNAL TABLE events (
  userId STRING,
  action STRING,
  timestamp STRING,
  processedAt STRING
)
PARTITIONED BY (year INT, month INT)
STORED AS JSON
LOCATION 's3://my-data-lake/events/';

SELECT action, COUNT(*) as count
FROM events
WHERE year = 2024 AND month = 11
GROUP BY action
ORDER BY count DESC;

# Result: Process millions of events per hour automatically`}
                  </pre>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  💡 Used by: Analytics platforms, IoT applications, log processing
                </div>
              </div>

              {/* Use Case 5: Disaster Recovery */}
              <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
                <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <span>🔄</span>
                  Multi-Region Disaster Recovery
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-3">
                  Ensure business continuity with automated failover across regions
                </p>
                <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                  <pre className="text-[10px] sm:text-xs text-green-400">
{`# Architecture:
# - Primary Region: us-east-1
# - DR Region: us-west-2
# - Route 53 Health Checks & Failover
# - RDS Cross-Region Replication
# - S3 Cross-Region Replication

# 1. Enable RDS Cross-Region Read Replica
aws rds create-db-instance-read-replica \\
  --db-instance-identifier myapp-db-replica \\
  --source-db-instance-identifier arn:aws:rds:us-east-1:123456789012:db:myapp-db \\
  --region us-west-2

# 2. Enable S3 Cross-Region Replication
aws s3api put-bucket-replication \\
  --bucket my-primary-bucket \\
  --replication-configuration '{
    "Role": "arn:aws:iam::123456789012:role/s3-replication",
    "Rules": [{
      "Status": "Enabled",
      "Priority": 1,
      "Filter": {},
      "Destination": {
        "Bucket": "arn:aws:s3:::my-dr-bucket",
        "ReplicationTime": {
          "Status": "Enabled",
          "Time": { "Minutes": 15 }
        }
      }
    }]
  }'

# 3. Route 53 Health Check & Failover
aws route53 create-health-check \\
  --health-check-config '{
    "Type": "HTTPS",
    "ResourcePath": "/health",
    "FullyQualifiedDomainName": "api.example.com",
    "Port": 443,
    "RequestInterval": 30,
    "FailureThreshold": 3
  }'

# 4. Failover DNS Record
aws route53 change-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "api.example.com",
        "Type": "A",
        "SetIdentifier": "Primary",
        "Failover": "PRIMARY",
        "AliasTarget": {
          "HostedZoneId": "Z1234567890ABC",
          "DNSName": "primary-alb.us-east-1.elb.amazonaws.com",
          "EvaluateTargetHealth": true
        }
      }
    }, {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "api.example.com",
        "Type": "A",
        "SetIdentifier": "Secondary",
        "Failover": "SECONDARY",
        "AliasTarget": {
          "HostedZoneId": "Z1234567890ABC",
          "DNSName": "dr-alb.us-west-2.elb.amazonaws.com",
          "EvaluateTargetHealth": true
        }
      }
    }]
  }'

# Result: Automatic failover in <60 seconds if primary region fails
# RTO: <5 minutes, RPO: <15 minutes`}
                  </pre>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  💡 Critical for: Financial services, healthcare, e-commerce
                </div>
              </div>

              {/* Use Case 6: Container Orchestration */}
              <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <span>🐳</span>
                  Microservices with ECS/EKS
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-3">
                  Deploy containerized microservices with AWS managed Kubernetes
                </p>
                
                {/* Architecture Diagram */}
                <div className="mb-3 glass-card p-2 bg-black/30">
                  <AWSArchitecture type="microservices" />
                </div>
                <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                  <pre className="text-[10px] sm:text-xs text-green-400">
{`# Architecture:
# - EKS (Managed Kubernetes)
# - ECR (Container Registry)
# - Application Load Balancer
# - RDS (Database)
# - ElastiCache (Redis)

# 1. Create EKS Cluster
eksctl create cluster \\
  --name my-cluster \\
  --region us-east-1 \\
  --nodegroup-name standard-workers \\
  --node-type t3.medium \\
  --nodes 3 \\
  --nodes-min 1 \\
  --nodes-max 10 \\
  --managed

# 2. Create ECR Repository
aws ecr create-repository --repository-name my-app

# 3. Build & Push Docker Image
aws ecr get-login-password --region us-east-1 | \\
  docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

docker build -t my-app .
docker tag my-app:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest

# 4. Kubernetes Deployment (deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: LoadBalancer
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000

# 5. Deploy to EKS
kubectl apply -f deployment.yaml

# 6. Auto-scaling
kubectl autoscale deployment my-app --cpu-percent=70 --min=3 --max=20

# Result: Self-healing, auto-scaling microservices`}
                  </pre>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  💡 Used by: Spotify, Snap, GoDaddy for production workloads
                </div>
              </div>

            </div>
          </div>
              ) : (
                /* Terminal-style Steps Display */
                <div className="space-y-3">
                  {scenarios[scenario].steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-3 bg-white/5"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm sm:text-base mb-1">{step.title}</h3>
                          <p className="text-xs text-gray-400 mb-2">{step.explanation}</p>
                        </div>
                      </div>

                      {/* Code Block */}
                      <div className="bg-black/50 rounded-lg p-2 sm:p-3 mb-2 overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400 whitespace-pre-wrap break-words">
                          {step.code}
                        </pre>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">
                          {step.concept}
                        </span>
                        <span className="text-gray-400">{step.useCase}</span>
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
