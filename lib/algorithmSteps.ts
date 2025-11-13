export interface AlgorithmStep {
  title: string
  description: string
  code?: string
  highlight?: string[]
  complexity?: string
}

export const arraySteps: AlgorithmStep[] = [
  {
    title: "Understanding Arrays",
    description: "Arrays are fundamental data structures that store elements in contiguous memory locations. Think of an array like a row of mailboxes in an apartment building - each mailbox has a unique address (index) and can hold one item (element). The key advantage is that you can instantly access any mailbox if you know its address number, making arrays incredibly efficient for random access operations.",
    complexity: "Space: O(n) - Linear space based on number of elements"
  },
  {
    title: "Direct Element Access",
    description: "Array access is like having a direct address to a house - you don't need to walk through every house on the street to find the one you want. The computer calculates the exact memory location using a simple formula: base_address + (index × element_size). This mathematical calculation happens in constant time, regardless of the array size or which element you're accessing. This is why arrays are perfect for scenarios where you need frequent random access to data.",
    complexity: "Time: O(1) - Constant time regardless of array size"
  },
  {
    title: "Element Insertion Process",
    description: "Inserting into an array is like trying to squeeze into a crowded movie theater row - everyone after your seat needs to shift over to make room. The computer must move each element one position to the right, starting from the end and working backwards to avoid overwriting data. This shifting process takes more time as the array grows larger, since more elements need to be moved. The worst case is inserting at the beginning, requiring every single element to shift.",
    complexity: "Time: O(n) - Linear time based on elements to shift"
  },
  {
    title: "Element Deletion Process", 
    description: "Deleting from an array is like someone leaving that crowded movie theater row - everyone after the empty seat slides over to fill the gap. The computer removes the target element and then shifts all subsequent elements one position to the left to maintain the contiguous structure. This prevents 'holes' in the array that would waste memory and complicate indexing. Like insertion, deletion time increases with array size since more elements may need shifting.",
    complexity: "Time: O(n) - Linear time based on elements to shift"
  },
  {
    title: "Linear Search Strategy",
    description: "Searching an unsorted array is like looking for a specific book in an unorganized library - you must check each book one by one until you find the right one or reach the end. The computer starts at index 0 and compares each element with the target value, moving sequentially through the array. In the best case, you find the element immediately; in the worst case, it's the last element or doesn't exist at all, requiring you to check every single position.",
    complexity: "Time: O(n) - Linear time, may need to check all elements"
  }
]

export const stackSteps: AlgorithmStep[] = [
  {
    title: "Understanding Stack Behavior",
    description: "A stack operates exactly like a stack of dinner plates in your kitchen cabinet. You can only add new plates to the top of the stack, and when you need a plate, you take it from the top. This Last In, First Out (LIFO) behavior is fundamental to how stacks work. The most recently added element is always the first one to be removed. This constraint might seem limiting, but it's incredibly powerful for many computing scenarios where you need to reverse the order of operations or keep track of nested processes.",
    complexity: "Space: O(n) - Grows linearly with number of elements"
  },
  {
    title: "Push Operation Mechanics",
    description: "When you push an element onto a stack, imagine placing a new plate on top of your existing stack. The new element becomes the 'top' of the stack and covers all the elements below it. In computer memory, this is implemented by creating a new node that points to the previous top element, then updating the stack's top pointer to reference this new node. This operation is incredibly fast because it doesn't matter how many elements are already in the stack - you're always just adding to the top.",
    complexity: "Time: O(1) - Constant time regardless of stack size"
  },
  {
    title: "Pop Operation Process",
    description: "Popping from a stack is like carefully lifting the top plate from your stack - you remove it and can now see the plate that was underneath. The computer saves the data from the top element, updates the top pointer to reference the second element (which becomes the new top), and then returns the saved data. If the stack is empty, this operation fails because there's nothing to remove. This operation is also constant time because you're always working with just the top element.",
    complexity: "Time: O(1) - Constant time, only touches top element"
  },
  {
    title: "Peek Operation Benefits",
    description: "Peeking at a stack is like looking at the top plate without picking it up - you can see what's there without disturbing the stack structure. This operation is useful when you need to make decisions based on what's on top but don't want to remove it yet. For example, in expression evaluation, you might peek to see if the top operator has higher precedence before deciding whether to push a new operator. Since you're only reading the top element's value without modifying the stack, this operation is very fast and safe.",
    complexity: "Time: O(1) - Just reads top element value"
  },
  {
    title: "Real-World Stack Applications",
    description: "Stacks are everywhere in computing! When you call a function in a program, the computer uses a call stack to remember where to return when the function finishes. Your browser's back button uses a stack to remember the pages you've visited. Undo operations in text editors use stacks to remember previous states. Mathematical expression evaluation uses stacks to handle parentheses and operator precedence. Even the process of converting recursive algorithms to iterative ones often involves explicitly managing a stack to simulate the recursive calls.",
    complexity: "Applications span across all areas of computer science"
  }
]

export const queueSteps: AlgorithmStep[] = [
  {
    title: "Queue Fundamentals",
    description: "A queue operates exactly like a line at your favorite coffee shop - the first person to join the line is the first person to be served. This First In, First Out (FIFO) principle ensures fairness and order. Unlike a stack where you can only access the top, a queue has two distinct ends: the front (where elements leave) and the rear (where elements enter). This dual-ended structure makes queues perfect for managing processes that need to maintain their original order, like handling customer requests or managing tasks in an operating system.",
    complexity: "Space: O(n) - Grows with number of elements in queue"
  },
  {
    title: "Enqueue Operation Details",
    description: "When you enqueue an element, imagine a new customer joining the back of the coffee shop line. The new element is added to the rear of the queue, and the rear pointer is updated to reference this new element. If the queue was empty, this new element becomes both the front and rear simultaneously. The beauty of this operation is that it doesn't matter how many people are already in line - adding someone to the back is always a simple, fast operation that takes the same amount of time whether there's 1 person or 1000 people ahead.",
    complexity: "Time: O(1) - Constant time regardless of queue size"
  },
  {
    title: "Dequeue Operation Mechanics",
    description: "Dequeuing is like the barista calling 'Next!' and serving the customer at the front of the line. The computer saves the data from the front element, moves the front pointer to the next element in line, and returns the saved data. If this was the last element in the queue, both front and rear pointers are set to null, indicating an empty queue. This operation maintains the FIFO order and ensures that elements are processed in the exact sequence they arrived, which is crucial for fair scheduling and maintaining data integrity.",
    complexity: "Time: O(1) - Only touches front element"
  },
  {
    title: "Front Inspection Benefits",
    description: "Checking the front of a queue is like looking at who's next in line without actually serving them yet. This peek operation is valuable when you need to make decisions based on what's coming next but aren't ready to process it immediately. For example, a print queue might check the front job to see if it requires special paper before processing. Since you're only reading the front element's data without modifying the queue structure, this operation is extremely fast and doesn't disturb the waiting order.",
    complexity: "Time: O(1) - Simple data access operation"
  },
  {
    title: "Queue Applications in Computing",
    description: "Queues are fundamental to fair resource management in computer systems. Operating systems use queues to schedule processes, ensuring each program gets its turn to run. Print spoolers use queues to handle multiple print jobs in order. Web servers use queues to handle incoming requests fairly. Breadth-First Search algorithms use queues to explore graph nodes level by level. Buffer systems use queues to temporarily store data between fast producers and slower consumers, like streaming video or handling keyboard input.",
    complexity: "Essential for fair ordering and resource management"
  }
]

export const linkedListSteps: AlgorithmStep[] = [
  {
    title: "Linked List Architecture",
    description: "A linked list is like a treasure hunt where each clue leads you to the next location. Unlike arrays where elements sit side by side in memory, linked list elements (called nodes) can be scattered anywhere in memory, connected by pointers that act like arrows pointing to the next node. Each node contains two parts: the actual data you want to store, and a pointer (or reference) to the next node in the sequence. This flexible structure allows the list to grow and shrink dynamically during program execution, adapting to your changing data needs.",
    complexity: "Space: O(n) - Each node requires memory for data and pointer"
  },
  {
    title: "Head Insertion Strategy",
    description: "Inserting at the head of a linked list is like adding a new car to the front of a train - you connect the new car to the existing engine and make it the new front car. This operation is remarkably efficient because you don't need to traverse the entire list or shift existing elements. You simply create a new node, set its pointer to reference the current head, and then update the head pointer to reference your new node. This makes the new node the first in the sequence, and all existing nodes remain in their original order behind it.",
    complexity: "Time: O(1) - Direct insertion without traversal"
  },
  {
    title: "Tail Insertion Process",
    description: "Adding to the tail of a linked list is like walking to the end of a train to attach a new car - you must travel through each car until you reach the caboose. The computer starts at the head and follows each pointer link until it finds a node whose next pointer is null (indicating the end). Once found, it creates a new node and updates the last node's pointer to reference this new node. This traversal requirement makes tail insertion slower than head insertion, especially for long lists.",
    complexity: "Time: O(n) - Must traverse to find the end"
  },
  {
    title: "Node Deletion Technique",
    description: "Deleting from a linked list is like removing a car from the middle of a train - you need to reconnect the cars on either side to maintain the chain. The computer must find the node before the target (the previous node) and update its pointer to skip over the target node, pointing directly to the node after the target. This effectively removes the target node from the chain. Special care is needed when deleting the head node, as this requires updating the head pointer to reference the second node.",
    complexity: "Time: O(n) - May need to traverse to find target"
  },
  {
    title: "Traversal and Search Methods",
    description: "Searching a linked list is like following a trail of breadcrumbs - you must start at the beginning and follow each pointer until you find what you're looking for or reach the end. Unlike arrays where you can jump directly to any position, linked lists require sequential access. The computer starts at the head and examines each node's data, following the next pointer to move forward. This sequential nature makes linked lists slower for searching but provides flexibility for insertion and deletion operations.",
    complexity: "Time: O(n) - Sequential access through all nodes"
  }
]

export const treeSteps: AlgorithmStep[] = [
  {
    title: "Binary Search Tree Structure",
    description: "A Binary Search Tree is like a family tree with a special rule: for any person (node), all their left descendants have smaller values and all their right descendants have larger values. This ordering property makes BSTs incredibly efficient for searching, similar to how a phone book's alphabetical order lets you quickly find names. Each node can have at most two children, and the tree structure naturally organizes data in a way that enables fast lookups, insertions, and deletions.",
    complexity: "Space: O(n) - One node per element stored"
  },
  {
    title: "BST Insertion Strategy",
    description: "Inserting into a BST is like finding the right place for a new book in a perfectly organized library. You start at the root and compare your new value with each node you encounter. If it's smaller, you go left; if larger, you go right. You continue this process until you find an empty spot (null pointer) where your new node belongs. This maintains the BST property automatically and ensures the tree stays organized. The path you take becomes shorter as the tree stays balanced, making insertion very efficient.",
    complexity: "Time: O(log n) average case, O(n) if tree becomes linear"
  },
  {
    title: "BST Search Process",
    description: "Searching a BST is like playing a sophisticated guessing game where each guess eliminates half the remaining possibilities. You start at the root and compare your target with the current node. If they match, you've found it! If the target is smaller, you know it can only be in the left subtree, so you go left. If larger, you go right. Each comparison eliminates an entire subtree from consideration, making the search incredibly efficient compared to checking every element sequentially.",
    complexity: "Time: O(log n) average case, O(n) worst case (skewed tree)"
  },
  {
    title: "Inorder Traversal Magic",
    description: "Inorder traversal of a BST has a beautiful property - it visits nodes in sorted order! The algorithm follows a simple pattern: visit left subtree, process current node, then visit right subtree. This recursive approach ensures that smaller values (left subtree) are processed before the current node, which is processed before larger values (right subtree). It's like reading a book from left to right - you naturally encounter the data in ascending order, making it perfect for generating sorted lists from tree data.",
    complexity: "Time: O(n) - Must visit every node once"
  },
  {
    title: "BST Deletion Complexity",
    description: "Deleting from a BST involves three scenarios, like removing different types of employees from a company hierarchy. If the node is a leaf (no children), simply remove it - like removing an entry-level employee with no subordinates. If it has one child, replace it with that child - like promoting the sole subordinate when a manager leaves. The tricky case is when a node has two children - you must find the inorder successor (the next larger value) to replace it, maintaining the BST property while preserving all existing relationships.",
    complexity: "Time: O(log n) average, requires finding successor in complex cases"
  }
]

export const graphSteps: AlgorithmStep[] = [
  {
    title: "Graph Introduction",
    description: "Graph is a collection of vertices (nodes) connected by edges. Can be directed or undirected, weighted or unweighted.",
    code: `class Graph {
    Map<Integer, List<Integer>> adjList;
    
    Graph() {
        adjList = new HashMap<>();
    }
}`,
    complexity: "Space: O(V + E)"
  },
  {
    title: "Adding Vertices and Edges",
    description: "Add vertices to the graph and connect them with edges. In undirected graphs, add edge in both directions.",
    code: `void addVertex(int vertex) {
    adjList.putIfAbsent(vertex, new ArrayList<>());
}

void addEdge(int from, int to) {
    adjList.get(from).add(to);
    // For undirected graph:
    adjList.get(to).add(from);
}`,
    complexity: "Time: O(1) for each operation"
  },
  {
    title: "Breadth-First Search (BFS)",
    description: "BFS explores graph level by level using a queue. Visits all neighbors before going deeper.",
    code: `void BFS(int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    
    queue.add(start);
    visited.add(start);
    
    while(!queue.isEmpty()) {
        int vertex = queue.poll();
        visit(vertex);
        
        for(int neighbor : adjList.get(vertex)) {
            if(!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
}`,
    complexity: "Time: O(V + E)"
  },
  {
    title: "Depth-First Search (DFS)",
    description: "DFS explores as far as possible along each branch before backtracking. Uses recursion or stack.",
    code: `void DFS(int vertex, Set<Integer> visited) {
    visited.add(vertex);
    visit(vertex);
    
    for(int neighbor : adjList.get(vertex)) {
        if(!visited.contains(neighbor)) {
            DFS(neighbor, visited);
        }
    }
}`,
    complexity: "Time: O(V + E)"
  },
  {
    title: "Shortest Path (BFS)",
    description: "BFS can find shortest path in unweighted graphs. Track parent nodes to reconstruct the path.",
    code: `List<Integer> shortestPath(int start, int end) {
    Map<Integer, Integer> parent = new HashMap<>();
    Queue<Integer> queue = new LinkedList<>();
    Set<Integer> visited = new HashSet<>();
    
    queue.add(start);
    visited.add(start);
    parent.put(start, -1);
    
    while(!queue.isEmpty()) {
        int vertex = queue.poll();
        if(vertex == end) break;
        
        for(int neighbor : adjList.get(vertex)) {
            if(!visited.contains(neighbor)) {
                visited.add(neighbor);
                parent.put(neighbor, vertex);
                queue.add(neighbor);
            }
        }
    }
    
    return reconstructPath(parent, start, end);
}`,
    complexity: "Time: O(V + E)"
  }
]

export const sortingSteps: AlgorithmStep[] = [
  {
    title: "Bubble Sort Introduction",
    description: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they're in wrong order.",
    code: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
}`,
    complexity: "Time: O(n²), Space: O(1)"
  },
  {
    title: "Selection Sort Process",
    description: "Selection Sort finds the minimum element and places it at the beginning, then repeats for the remaining array.",
    code: `void selectionSort(int[] arr) {
    int n = arr.length;
    for(int i = 0; i < n-1; i++) {
        int minIdx = i;
        for(int j = i+1; j < n; j++) {
            if(arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr, i, minIdx);
    }
}`,
    complexity: "Time: O(n²), Space: O(1)"
  },
  {
    title: "Insertion Sort Logic",
    description: "Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position.",
    code: `void insertionSort(int[] arr) {
    for(int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    complexity: "Time: O(n²) worst, O(n) best, Space: O(1)"
  },
  {
    title: "Quick Sort Partitioning",
    description: "Quick Sort picks a pivot and partitions array so elements smaller than pivot are on left, larger on right.",
    code: `int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for(int j = low; j < high; j++) {
        if(arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}`,
    complexity: "Time: O(n log n) average, O(n²) worst"
  },
  {
    title: "Algorithm Comparison",
    description: "Different sorting algorithms have different trade-offs between time complexity, space complexity, and stability.",
    code: `// Stability: Maintains relative order of equal elements
// Bubble Sort: Stable, O(n²), O(1) space
// Selection Sort: Unstable, O(n²), O(1) space  
// Insertion Sort: Stable, O(n²), O(1) space
// Quick Sort: Unstable, O(n log n), O(log n) space
// Merge Sort: Stable, O(n log n), O(n) space`,
    complexity: "Choose based on requirements"
  }
]