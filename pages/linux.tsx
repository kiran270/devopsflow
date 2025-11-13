import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Terminal, Folder, Lock, Network } from 'lucide-react'

export default function Linux() {
  const [scenario, setScenario] = useState<'intro' | 'basics' | 'files' | 'permissions' | 'processes' | 'networking' | 'shell' | 'usecases'>('intro')

  const scenarios = {
    intro: {
      name: 'Introduction to Linux',
      description: 'Learn Linux fundamentals and command line basics',
      steps: [
        {
          title: 'What is Linux?',
          code: `Linux is a free, open-source operating system kernel.

Key Features:
• Open Source - Free to use and modify
• Stable & Secure - Powers 90% of cloud infrastructure
• Multi-user - Multiple users can work simultaneously
• Command Line Power - Automate everything
• Package Management - Easy software installation

Popular Distributions:
• Ubuntu - Beginner-friendly, great for desktops
• CentOS/RHEL - Enterprise servers
• Debian - Stable, reliable
• Arch Linux - Cutting-edge, customizable`,
          explanation: 'Linux powers most servers, cloud infrastructure, and Android devices.',
          concept: 'Linux Fundamentals',
          useCase: '🎯 Used by Google, Facebook, Amazon, and 96% of top web servers'
        },
        {
          title: 'Linux File System Hierarchy',
          code: `/                    Root directory
├── /bin             Essential user binaries (ls, cat, cp)
├── /boot            Boot loader files
├── /dev             Device files (hard drives, USB)
├── /etc             System configuration files
├── /home            User home directories
│   └── /home/user   Your personal files
├── /lib             System libraries
├── /opt             Optional software
├── /root            Root user home directory
├── /tmp             Temporary files (cleared on reboot)
├── /usr             User programs and data
│   ├── /usr/bin     User binaries
│   └── /usr/local   Locally installed software
└── /var             Variable data (logs, databases)
    └── /var/log     System logs`,
          explanation: 'Everything in Linux is a file, organized in a hierarchical tree structure.',
          concept: 'File System Structure',
          useCase: '📁 Understanding where files live is crucial for system administration'
        }
      ]
    },
    basics: {
      name: 'Basic Commands',
      description: 'Essential Linux commands every developer should know',
      steps: [
        {
          title: 'Navigation & File Operations',
          code: `# Navigation
pwd                    # Print working directory
ls                     # List files
ls -la                 # List all files with details
cd /path/to/dir        # Change directory
cd ~                   # Go to home directory
cd ..                  # Go up one directory

# File Operations
touch file.txt         # Create empty file
mkdir mydir            # Create directory
mkdir -p a/b/c         # Create nested directories
cp file.txt backup.txt # Copy file
cp -r dir1 dir2        # Copy directory recursively
mv old.txt new.txt     # Rename/move file
rm file.txt            # Delete file
rm -rf directory       # Delete directory (be careful!)

# Viewing Files
cat file.txt           # Display entire file
less file.txt          # View file page by page (q to quit)
head -n 10 file.txt    # First 10 lines
tail -n 10 file.txt    # Last 10 lines
tail -f app.log        # Follow log file in real-time`,
          explanation: 'Master these commands to navigate and manipulate files efficiently.',
          concept: 'File Management',
          useCase: '💻 Daily tasks for developers and system administrators'
        },
        {
          title: 'Text Processing & Search',
          code: `# Search in Files
grep "error" app.log              # Find lines containing "error"
grep -r "TODO" .                  # Search recursively in all files
grep -i "warning" log.txt         # Case-insensitive search
grep -v "debug" log.txt           # Exclude lines with "debug"

# Find Files
find . -name "*.js"               # Find all JavaScript files
find /var/log -mtime -7           # Files modified in last 7 days
find . -type f -size +100M        # Files larger than 100MB

# Text Manipulation
wc -l file.txt                    # Count lines
sort file.txt                     # Sort lines alphabetically
uniq file.txt                     # Remove duplicate lines
cut -d',' -f1,3 data.csv          # Extract columns from CSV
sed 's/old/new/g' file.txt        # Replace text
awk '{print $1}' file.txt         # Print first column`,
          explanation: 'Powerful text processing tools for log analysis and data manipulation.',
          concept: 'Text Processing',
          useCase: '🔍 Essential for debugging and log analysis'
        }
      ]
    },
    files: {
      name: 'File Management',
      description: 'Advanced file operations and management',
      steps: [
        {
          title: 'File Compression & Archives',
          code: `# Tar Archives
tar -czf archive.tar.gz folder/    # Create compressed archive
tar -xzf archive.tar.gz            # Extract archive
tar -tzf archive.tar.gz            # List contents

# Zip Files
zip -r archive.zip folder/         # Create zip archive
unzip archive.zip                  # Extract zip
unzip -l archive.zip               # List contents

# Other Compression
gzip file.txt                      # Compress (creates file.txt.gz)
gunzip file.txt.gz                 # Decompress
bzip2 file.txt                     # Better compression
bunzip2 file.txt.bz2               # Decompress bzip2`,
          explanation: 'Compress files for storage and transfer.',
          concept: 'Compression',
          useCase: '📦 Backup files and reduce storage space'
        }
      ]
    },
    permissions: {
      name: 'Permissions & Ownership',
      description: 'Linux file permissions and user management',
      steps: [
        {
          title: 'Understanding Permissions',
          code: `# Permission Format: rwxrwxrwx
# r = read (4), w = write (2), x = execute (1)
# First 3: Owner, Next 3: Group, Last 3: Others

# View Permissions
ls -l file.txt
# Output: -rw-r--r-- 1 user group 1234 Nov 12 10:00 file.txt
#         │││││││││
#         │││││││└└─ Others: read only
#         ││││││└─── Group: read only  
#         │││└└└──── Owner: read + write
#         ││└─────── Number of links
#         │└──────── File type (- = file, d = directory)

# Change Permissions
chmod 755 script.sh    # rwxr-xr-x (owner: all, others: read+execute)
chmod 644 file.txt     # rw-r--r-- (owner: rw, others: read)
chmod +x script.sh     # Add execute permission
chmod -w file.txt      # Remove write permission
chmod u+x,g+x file.sh  # Add execute for user and group

# Change Ownership
chown user:group file.txt       # Change owner and group
chown -R user:group directory/  # Recursive change
sudo chown root:root file.txt   # Change to root (needs sudo)`,
          explanation: 'Control who can read, write, or execute files.',
          concept: 'File Permissions',
          useCase: '🔒 Security and access control'
        }
      ]
    },
    processes: {
      name: 'Process Management',
      description: 'Managing running processes and system resources',
      steps: [
        {
          title: 'Process Commands',
          code: `# View Processes
ps aux                 # List all processes
ps aux | grep nginx    # Find specific process
top                    # Real-time process monitor (q to quit)
htop                   # Better process monitor (if installed)

# Process Control
command &              # Run in background
jobs                   # List background jobs
fg %1                  # Bring job 1 to foreground
bg %1                  # Resume job 1 in background
Ctrl+Z                 # Suspend current process
Ctrl+C                 # Kill current process

# Kill Processes
kill 1234              # Kill process by PID
kill -9 1234           # Force kill
killall nginx          # Kill all nginx processes
pkill -f "python app"  # Kill by name pattern

# System Resources
free -h                # Memory usage
df -h                  # Disk space
du -sh folder/         # Folder size
uptime                 # System uptime and load`,
          explanation: 'Monitor and control running processes.',
          concept: 'Process Management',
          useCase: '⚙️ Troubleshoot performance issues and manage services'
        }
      ]
    },
    networking: {
      name: 'Networking',
      description: 'Network configuration and troubleshooting',
      steps: [
        {
          title: 'Network Commands',
          code: `# Network Information
ip addr                # Show IP addresses
ip route               # Show routing table
hostname               # Show hostname
hostname -I            # Show IP address

# Connectivity Testing
ping google.com        # Test connectivity
ping -c 4 8.8.8.8      # Ping 4 times
traceroute google.com  # Trace route to host
mtr google.com         # Combined ping + traceroute

# DNS
nslookup google.com    # DNS lookup
dig google.com         # Detailed DNS info
host google.com        # Simple DNS lookup

# Network Connections
netstat -tuln          # Show listening ports
ss -tuln               # Modern alternative to netstat
lsof -i :3000          # What's using port 3000?

# Download Files
wget https://example.com/file.zip    # Download file
curl https://api.example.com         # Make HTTP request
curl -X POST -d '{"key":"value"}' \\
  https://api.example.com            # POST request`,
          explanation: 'Network diagnostics and connectivity tools.',
          concept: 'Networking',
          useCase: '🌐 Debug network issues and test APIs'
        }
      ]
    },
    shell: {
      name: 'Shell Scripting',
      description: 'Automate tasks with bash scripts',
      steps: [
        {
          title: 'Basic Shell Script',
          code: `#!/bin/bash
# Simple backup script

# Variables
BACKUP_DIR="/backup"
SOURCE_DIR="/home/user/documents"
DATE=$(date +%Y%m%d)
BACKUP_FILE="backup_$DATE.tar.gz"

# Create backup
echo "Starting backup..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE" "$SOURCE_DIR"

# Check if successful
if [ $? -eq 0 ]; then
    echo "Backup successful: $BACKUP_FILE"
else
    echo "Backup failed!"
    exit 1
fi

# Delete old backups (older than 7 days)
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
echo "Old backups cleaned up"`,
          explanation: 'Automate repetitive tasks with shell scripts.',
          concept: 'Shell Scripting',
          useCase: '🤖 Automate backups, deployments, and maintenance tasks'
        }
      ]
    },
    usecases: {
      name: 'Real-World Use Cases',
      description: 'Practical Linux examples used in production',
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Linux Tutorial
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Master Linux command line and system administration
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
              onClick={() => setScenario('basics')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'basics' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Terminal size={14} />
              Basics
            </button>
            <button
              onClick={() => setScenario('files')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'files' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Folder size={14} />
              Files
            </button>
            <button
              onClick={() => setScenario('permissions')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'permissions' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Lock size={14} />
              Permissions
            </button>
            <button
              onClick={() => setScenario('processes')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'processes' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              ⚙️ Processes
            </button>
            <button
              onClick={() => setScenario('networking')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'networking' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Network size={14} />
              Networking
            </button>
            <button
              onClick={() => setScenario('shell')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'shell' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              📝 Shell Scripting
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
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">💼</span>
                    Real-World Linux Use Cases
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Use Case 1: Server Deployment */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        🚀 Server Deployment & Management
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Deploy and manage production servers with Linux
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`# Complete server setup script
#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y nginx nodejs npm postgresql

# Configure firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable

# Setup application
cd /var/www
git clone https://github.com/user/app.git
cd app
npm install
npm run build

# Configure nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Setup SSL with Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com

echo "Server setup complete!"`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Used for: Production server setup, web hosting, application deployment
                      </div>
                    </div>

                    {/* Use Case 2: Log Analysis */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        📊 Log Analysis & Monitoring
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Analyze logs to find errors and monitor system health
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`# Find errors in logs
grep -i "error" /var/log/nginx/error.log | tail -20

# Count 404 errors
grep "404" /var/log/nginx/access.log | wc -l

# Find top 10 IP addresses
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# Monitor logs in real-time
tail -f /var/log/syslog | grep --color=auto "error\\|warning"

# Find large log files
find /var/log -type f -size +100M -exec ls -lh {} \\;

# Analyze Apache access logs
cat /var/log/apache2/access.log | \\
  awk '{print $7}' | \\
  sort | uniq -c | sort -rn | head -20

# Check disk usage by logs
du -sh /var/log/* | sort -rh | head -10

# Archive old logs
find /var/log -name "*.log" -mtime +30 -exec gzip {} \\;

# Real-time error monitoring script
#!/bin/bash
while true; do
  ERROR_COUNT=$(grep -c "ERROR" /var/log/app.log)
  if [ $ERROR_COUNT -gt 10 ]; then
    echo "Alert: $ERROR_COUNT errors found!"
    # Send notification
  fi
  sleep 60
done`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Essential for: Debugging, security monitoring, performance analysis
                      </div>
                    </div>

                    {/* Use Case 3: Backup Automation */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        💾 Automated Backup System
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Automated backup script with rotation and remote storage
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`#!/bin/bash
# Automated backup script with rotation

BACKUP_DIR="/backup"
SOURCE_DIRS="/var/www /etc /home"
DATE=$(date +%Y%m%d_%H%M%S)
HOSTNAME=$(hostname)
BACKUP_FILE="$BACKUP_DIR/$\{HOSTNAME\}_backup_$DATE.tar.gz"
RETENTION_DAYS=7
REMOTE_SERVER="backup@remote-server.com"
REMOTE_DIR="/backups"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
echo "Starting backup at $(date)"
tar -czf $BACKUP_FILE $SOURCE_DIRS 2>/dev/null

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "Backup created: $BACKUP_FILE"
    SIZE=$(du -h $BACKUP_FILE | cut -f1)
    echo "Backup size: $SIZE"
    
    # Upload to remote server
    echo "Uploading to remote server..."
    scp $BACKUP_FILE $REMOTE_SERVER:$REMOTE_DIR/
    
    if [ $? -eq 0 ]; then
        echo "Backup uploaded successfully"
    else
        echo "Failed to upload backup"
    fi
else
    echo "Backup failed!"
    exit 1
fi

# Delete old backups (local)
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete

# Delete old backups (remote)
ssh $REMOTE_SERVER "find $REMOTE_DIR -name '*.tar.gz' -mtime +$RETENTION_DAYS -delete"

echo "Backup completed at $(date)"

# Add to crontab for daily execution at 2 AM:
# 0 2 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Critical for: Data protection, disaster recovery, compliance
                      </div>
                    </div>

                    {/* Use Case 4: System Monitoring */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        📈 System Health Monitoring
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Monitor CPU, memory, disk, and send alerts
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`#!/bin/bash
# System monitoring script

# Thresholds
CPU_THRESHOLD=80
MEM_THRESHOLD=85
DISK_THRESHOLD=90

# Get metrics
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
MEM_USAGE=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100)}')
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | cut -d'%' -f1)

echo "=== System Health Report ==="
echo "Date: $(date)"
echo "Hostname: $(hostname)"
echo "Uptime: $(uptime -p)"
echo ""
echo "CPU Usage: $CPU_USAGE%"
echo "Memory Usage: $MEM_USAGE%"
echo "Disk Usage: $DISK_USAGE%"
echo ""

# Check CPU
if (( $(echo "$CPU_USAGE > $CPU_THRESHOLD" | bc -l) )); then
    echo "⚠️  WARNING: High CPU usage!"
    # Top CPU processes
    echo "Top CPU processes:"
    ps aux --sort=-%cpu | head -6
fi

# Check Memory
if [ $MEM_USAGE -gt $MEM_THRESHOLD ]; then
    echo "⚠️  WARNING: High memory usage!"
    # Top memory processes
    echo "Top memory processes:"
    ps aux --sort=-%mem | head -6
fi

# Check Disk
if [ $DISK_USAGE -gt $DISK_THRESHOLD ]; then
    echo "⚠️  WARNING: High disk usage!"
    # Largest directories
    echo "Largest directories:"
    du -h / 2>/dev/null | sort -rh | head -10
fi

# Check failed services
echo ""
echo "Failed services:"
systemctl --failed

# Network connections
echo ""
echo "Active connections:"
netstat -tuln | grep LISTEN | wc -l

# Load average
echo ""
echo "Load average: $(uptime | awk -F'load average:' '{print $2}')"

# Run every 5 minutes:
# */5 * * * * /path/to/monitor.sh >> /var/log/monitor.log 2>&1`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Prevents: Downtime, performance issues, resource exhaustion
                      </div>
                    </div>

                    {/* Use Case 5: User Management */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        👥 User & Permission Management
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Manage users, groups, and permissions securely
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`# Create new user with home directory
sudo useradd -m -s /bin/bash john
sudo passwd john

# Add user to sudo group
sudo usermod -aG sudo john

# Create developer group
sudo groupadd developers
sudo usermod -aG developers john

# Setup SSH key authentication
sudo -u john mkdir -p /home/john/.ssh
sudo -u john chmod 700 /home/john/.ssh
sudo -u john touch /home/john/.ssh/authorized_keys
sudo -u john chmod 600 /home/john/.ssh/authorized_keys

# Add public key
echo "ssh-rsa AAAAB3... user@host" | sudo tee -a /home/john/.ssh/authorized_keys

# Disable password authentication (SSH keys only)
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

# Setup project directory with proper permissions
sudo mkdir -p /var/www/project
sudo chown -R :developers /var/www/project
sudo chmod -R 775 /var/www/project
sudo chmod g+s /var/www/project  # Set GID bit

# List all users
cut -d: -f1 /etc/passwd

# List users in a group
getent group developers

# Find files owned by user
find /home -user john -type f

# Audit user activity
last -a john
lastlog -u john

# Lock/unlock user account
sudo usermod -L john  # Lock
sudo usermod -U john  # Unlock

# Delete user
sudo userdel -r john  # Remove user and home directory`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Essential for: Security, access control, team collaboration
                      </div>
                    </div>

                    {/* Use Case 6: Performance Tuning */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        ⚡ Performance Optimization
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Identify and fix performance bottlenecks
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`# Find processes using most CPU
ps aux --sort=-%cpu | head -10

# Find processes using most memory
ps aux --sort=-%mem | head -10

# Check I/O wait
iostat -x 1 5

# Find which process is using a file
lsof /path/to/file

# Find open files by process
lsof -p <PID>

# Network performance
iftop                    # Real-time bandwidth usage
nethogs                  # Per-process bandwidth
ss -s                    # Socket statistics

# Disk I/O performance
iotop                    # Real-time disk I/O
hdparm -tT /dev/sda      # Disk speed test

# Find large files
find / -type f -size +1G -exec ls -lh {} \\; 2>/dev/null

# Clear cache (be careful!)
sync && echo 3 | sudo tee /proc/sys/vm/drop_caches

# Check swap usage
swapon --show
free -h

# Optimize MySQL
sudo mysqltuner

# Check system limits
ulimit -a

# Increase file descriptor limit
echo "* soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65536" | sudo tee -a /etc/security/limits.conf

# Enable TCP BBR (better congestion control)
echo "net.core.default_qdisc=fq" | sudo tee -a /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Improves: Response time, throughput, resource utilization
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
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-xs font-bold">
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
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded">
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
