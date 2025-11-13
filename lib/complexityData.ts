export const arrayComplexity = [
  {
    operation: 'Access',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Direct access using index',
    color: 'text-blue-400'
  },
  {
    operation: 'Search',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Linear search through elements',
    color: 'text-blue-400'
  },
  {
    operation: 'Insertion',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Shift elements to make space',
    color: 'text-green-400'
  },
  {
    operation: 'Deletion',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Shift elements to fill gap',
    color: 'text-red-400'
  }
]

export const stackComplexity = [
  {
    operation: 'Push',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Add element to top',
    color: 'text-green-400'
  },
  {
    operation: 'Pop',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Remove element from top',
    color: 'text-red-400'
  },
  {
    operation: 'Peek/Top',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'View top element',
    color: 'text-blue-400'
  },
  {
    operation: 'Search',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Linear search through stack',
    color: 'text-yellow-400'
  }
]

export const queueComplexity = [
  {
    operation: 'Enqueue',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Add element to rear',
    color: 'text-green-400'
  },
  {
    operation: 'Dequeue',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Remove element from front',
    color: 'text-red-400'
  },
  {
    operation: 'Front',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'View front element',
    color: 'text-blue-400'
  },
  {
    operation: 'Search',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Linear search through queue',
    color: 'text-yellow-400'
  }
]

export const linkedListComplexity = [
  {
    operation: 'Access',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Traverse to reach element',
    color: 'text-blue-400'
  },
  {
    operation: 'Search',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Linear search through nodes',
    color: 'text-yellow-400'
  },
  {
    operation: 'Insert at Head',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Direct insertion at beginning',
    color: 'text-green-400'
  },
  {
    operation: 'Insert at Tail',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Traverse to end then insert',
    color: 'text-green-400'
  },
  {
    operation: 'Delete',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Find node then remove',
    color: 'text-red-400'
  }
]

export const bstComplexity = [
  {
    operation: 'Search',
    timeComplexity: 'O(log n) avg, O(n) worst',
    spaceComplexity: 'O(log n)',
    description: 'Binary search property',
    color: 'text-blue-400'
  },
  {
    operation: 'Insert',
    timeComplexity: 'O(log n) avg, O(n) worst',
    spaceComplexity: 'O(log n)',
    description: 'Find position then insert',
    color: 'text-green-400'
  },
  {
    operation: 'Delete',
    timeComplexity: 'O(log n) avg, O(n) worst',
    spaceComplexity: 'O(log n)',
    description: 'Find node then restructure',
    color: 'text-red-400'
  },
  {
    operation: 'Traversal',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(log n)',
    description: 'Visit all nodes once',
    color: 'text-purple-400'
  }
]

export const graphComplexity = [
  {
    operation: 'Add Vertex',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Add to adjacency list',
    color: 'text-green-400'
  },
  {
    operation: 'Add Edge',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Update adjacency list',
    color: 'text-green-400'
  },
  {
    operation: 'BFS',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Visit all vertices and edges',
    color: 'text-blue-400'
  },
  {
    operation: 'DFS',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Visit all vertices and edges',
    color: 'text-purple-400'
  }
]

export const sortingComplexity = [
  {
    operation: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Compare adjacent elements',
    color: 'text-blue-400'
  },
  {
    operation: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Find minimum and swap',
    color: 'text-green-400'
  },
  {
    operation: 'Insertion Sort',
    timeComplexity: 'O(n²) worst, O(n) best',
    spaceComplexity: 'O(1)',
    description: 'Insert into sorted portion',
    color: 'text-purple-400'
  },
  {
    operation: 'Quick Sort',
    timeComplexity: 'O(n log n) avg, O(n²) worst',
    spaceComplexity: 'O(log n)',
    description: 'Divide and conquer',
    color: 'text-orange-400'
  },
  {
    operation: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Divide, sort, and merge',
    color: 'text-cyan-400'
  }
]