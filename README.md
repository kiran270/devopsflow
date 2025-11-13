# DevOpsFlow ⚡

An interactive learning platform for mastering DevOps, CI/CD pipelines, containerization, orchestration, and data structures through beautiful animations and real-world examples.

## Features

- **Interactive Visualizations**: Watch data structures and DevOps workflows come to life with smooth animations
- **DevOps Tools**: Git, Jenkins, Docker, Kubernetes with practical use cases
- **Data Structures**: Arrays, Linked Lists, Stacks, Queues, and Sorting Algorithms
- **Real-World Examples**: Production-ready code snippets and CI/CD pipelines
- **Coding Problems**: 20+ algorithmic problems with step-by-step execution
- **Modern UI**: Built with Next.js, Tailwind CSS, and Framer Motion
- **Educational Content**: Learn best practices, time complexity, and real-world applications

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ (for local development)
- Docker & Docker Compose (for containerized deployment)
- Firebase project (for authentication)

### Setup Firebase Authentication

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication
3. Copy your Firebase config

### Option 1: Docker Deployment (Recommended) 🐳

**Quick Start:**
```bash
# 1. Set up Firebase credentials
cp .env.docker.example .env.docker
nano .env.docker  # Add your Firebase credentials

# 2. Deploy with one command
./deploy-docker.sh
```

**Or using Makefile:**
```bash
make build  # Build production image
make up     # Start containers
```

**Or using Docker Compose:**
```bash
export $(cat .env.docker | xargs)
docker-compose -f docker-compose.prod.yml up -d
```

Access at: http://localhost

📖 See [DOCKER_QUICKSTART.md](./DOCKER_QUICKSTART.md) for detailed Docker guide

### Option 2: Local Development

1. **Set up environment**:
   ```bash
   cp .env.local.example .env.local
   nano .env.local  # Add your Firebase credentials
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

#### Development with Hot Reload

```bash
# Run development environment with hot reload
docker-compose -f docker-compose.dev.yml up

# Your changes will be reflected instantly!
```

#### Docker Commands

```bash
# Build the image
docker build -t devopsflow:latest .

# Run the container
docker run -d -p 3000:3000 --name devopsflow devopsflow:latest

# View logs
docker logs -f devopsflow

# Stop the container
docker stop devopsflow

# Remove the container
docker rm devopsflow

# Using Docker Compose
docker-compose up -d          # Start in background
docker-compose down           # Stop and remove
docker-compose logs -f        # View logs
docker-compose ps             # List containers
```

**Access the application**: `http://localhost:3000`

## Available Data Structures

### ✅ Implemented
- **Arrays**: Linear data structure with indexed access
- **Stacks**: LIFO (Last In, First Out) operations
- **Linked Lists**: Dynamic linear structure with pointers

### 🚧 Coming Soon
- **Queues**: FIFO (First In, First Out) operations
- **Trees**: Hierarchical data structures
- **Graphs**: Network structures with nodes and edges

## Project Structure

```
├── components/
│   ├── animations/          # Visualization components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── pages/                  # Next.js pages
├── styles/                 # Global styles
└── lib/                    # Utility functions
```

## Features by Data Structure

### Arrays
- Insert elements at any position
- Delete elements by index
- Search for values with highlighting
- Visual index indicators

### Stacks
- Push elements to top
- Pop elements from top
- Real-time stack state display
- LIFO operation visualization

### Linked Lists
- Insert at head or tail
- Delete any node
- Search with traversal animation
- Pointer visualization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and teaching!

## Roadmap

- [ ] Queue implementation
- [ ] Binary Tree visualization
- [ ] Graph algorithms
- [ ] Sorting algorithm animations
- [ ] Code examples in multiple languages
- [ ] Performance benchmarking
- [ ] Mobile responsiveness improvements

---

Built with ❤️ for computer science education