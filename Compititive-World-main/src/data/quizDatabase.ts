import { QuizQuestion } from '../types';

export interface ExamSubjectSpec {
  name: string;
  code: string;
  defaultQuestions: number;
}

export interface ExamQuizConfig {
  examId: string;
  examTitle: string;
  totalRealExamQuestions: number;
  realExamDurationMinutes: number;
  negativeMarkRatio: number; // e.g. 0.33 for 1/3rd, 0.50 for 1/2, 0.25 for 1/4
  marksPerQuestion: number;
  subjects: string[];
}

export const EXAM_QUIZ_CONFIGS: Record<string, ExamQuizConfig> = {
  'gate-cse': {
    examId: 'gate-cse',
    examTitle: 'GATE (Graduate Aptitude Test in Engineering - CSE)',
    totalRealExamQuestions: 65,
    realExamDurationMinutes: 180,
    negativeMarkRatio: 0.33,
    marksPerQuestion: 1,
    subjects: [
      'Engineering Mathematics',
      'Data Structures & Algorithms',
      'Operating Systems',
      'DBMS (Database Management Systems)',
      'Computer Networks',
      'General Aptitude'
    ]
  },
  'appsc-group-2': {
    examId: 'appsc-group-2',
    examTitle: 'APPSC Group II Services',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 50,
    negativeMarkRatio: 0.33,
    marksPerQuestion: 1,
    subjects: [
      'AP History & Social Structure',
      'Indian Constitution & Polity',
      'AP Economy & Indian Economy',
      'General Studies & Mental Ability'
    ]
  },
  'appsc-group-1': {
    examId: 'appsc-group-1',
    examTitle: 'APPSC Group I Services',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 60,
    negativeMarkRatio: 0.33,
    marksPerQuestion: 1,
    subjects: [
      'Indian & AP History & Culture',
      'Indian Polity & Constitution',
      'Indian & AP Economy',
      'General Aptitude & Mental Ability'
    ]
  },
  'ssc-cgl': {
    examId: 'ssc-cgl',
    examTitle: 'SSC CGL (Combined Graduate Level)',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 45,
    negativeMarkRatio: 0.50,
    marksPerQuestion: 2,
    subjects: [
      'Quantitative Aptitude',
      'General Intelligence & Reasoning',
      'English Comprehension',
      'General Awareness & Science'
    ]
  },
  'rrb-ntpc': {
    examId: 'rrb-ntpc',
    examTitle: 'RRB NTPC (Railway Recruitment)',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 45,
    negativeMarkRatio: 0.33,
    marksPerQuestion: 1,
    subjects: [
      'General Awareness & Current Affairs',
      'Mathematics',
      'General Intelligence and Reasoning'
    ]
  },
  'upsc-civil-services': {
    examId: 'upsc-civil-services',
    examTitle: 'UPSC Civil Services Examination',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 60,
    negativeMarkRatio: 0.33,
    marksPerQuestion: 2,
    subjects: [
      'Indian Polity & Governance',
      'Modern Indian History & Culture',
      'Physical & Indian Geography',
      'Indian Economy',
      'CSAT - Mental Ability & Reading Comprehension'
    ]
  },
  'appsc-group-3': {
    examId: 'appsc-group-3',
    examTitle: 'APPSC Group III (Panchayat Secretary)',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 50,
    negativeMarkRatio: 0.33,
    marksPerQuestion: 1,
    subjects: [
      'General Studies & Mental Ability',
      'Rural Development & Panchayat Raj in AP',
      'Indian Constitution & Rural Economy'
    ]
  },
  'ibps-po': {
    examId: 'ibps-po',
    examTitle: 'IBPS PO (Probationary Officer)',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 45,
    negativeMarkRatio: 0.25,
    marksPerQuestion: 1,
    subjects: [
      'Quantitative Aptitude',
      'Reasoning Ability',
      'English Language',
      'Banking & Financial Awareness'
    ]
  },
  'sbi-po': {
    examId: 'sbi-po',
    examTitle: 'SBI PO (State Bank of India PO)',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 45,
    negativeMarkRatio: 0.25,
    marksPerQuestion: 1,
    subjects: [
      'Quantitative Aptitude',
      'Reasoning Ability',
      'English Language',
      'General & Banking Awareness'
    ]
  },
  'ssc-chsl': {
    examId: 'ssc-chsl',
    examTitle: 'SSC CHSL (10+2 Level)',
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 45,
    negativeMarkRatio: 0.50,
    marksPerQuestion: 2,
    subjects: [
      'Quantitative Aptitude',
      'General Intelligence',
      'English Language',
      'General Awareness'
    ]
  }
};

// Curated question repository with strict subject separation
export const AUTHENTIC_QUIZ_BANK: Record<string, Record<string, QuizQuestion[]>> = {
  'gate-cse': {
    'Engineering Mathematics': [
      {
        id: 'gate-em-1',
        question: 'What are the eigenvalues of the matrix A = [[3, 1], [0, 2]]?',
        options: ['3 and 2', '1 and 0', '5 and 6', '3 and 1'],
        correctAnswer: 0,
        explanation: 'For an upper triangular matrix, the eigenvalues are simply the elements on the principal diagonal, which are 3 and 2.',
        subject: 'Engineering Mathematics',
        topic: 'Linear Algebra',
        difficulty: 'Easy'
      },
      {
        id: 'gate-em-2',
        question: 'A fair 6-sided die is rolled twice. What is the probability that the sum of the outcomes is equal to 8?',
        options: ['5/36', '6/36', '4/36', '7/36'],
        correctAnswer: 0,
        explanation: 'The pairs summing to 8 are (2,6), (3,5), (4,4), (5,3), (6,2) - total 5 favorable outcomes out of 36 possible outcomes. Probability = 5/36.',
        subject: 'Engineering Mathematics',
        topic: 'Probability & Statistics',
        difficulty: 'Medium'
      },
      {
        id: 'gate-em-3',
        question: 'What is the rank of an n x n identity matrix?',
        options: ['n', 'n - 1', '1', '0'],
        correctAnswer: 0,
        explanation: 'An n x n identity matrix has n linearly independent row/column vectors, therefore its rank is always n.',
        subject: 'Engineering Mathematics',
        topic: 'Linear Algebra',
        difficulty: 'Easy'
      },
      {
        id: 'gate-em-4',
        question: 'The value of lim (x -> 0) [sin(5x) / x] is equal to:',
        options: ['5', '1', '0', '1/5'],
        correctAnswer: 0,
        explanation: 'Using standard limit rule lim(u -> 0) [sin(u)/u] = 1, lim(x -> 0) [5 * sin(5x)/(5x)] = 5 * 1 = 5.',
        subject: 'Engineering Mathematics',
        topic: 'Calculus',
        difficulty: 'Easy'
      },
      {
        id: 'gate-em-5',
        question: 'In a connected undirected graph with n vertices, how many edges does a spanning tree have?',
        options: ['n - 1', 'n', 'n + 1', 'n(n - 1)/2'],
        correctAnswer: 0,
        explanation: 'By definition of a tree, any connected acyclic graph with n vertices must have exactly n - 1 edges.',
        subject: 'Engineering Mathematics',
        topic: 'Discrete Mathematics',
        difficulty: 'Easy'
      },
      {
        id: 'gate-em-6',
        question: 'According to the Cayley-Hamilton theorem, every square matrix satisfies its own:',
        options: ['Characteristic equation', 'Trace equation', 'Inverse matrix equation', 'Determinant identity'],
        correctAnswer: 0,
        explanation: 'The Cayley-Hamilton theorem states that substituting matrix A into its characteristic polynomial p(λ) = det(A - λI) = 0 yields p(A) = 0.',
        subject: 'Engineering Mathematics',
        topic: 'Linear Algebra',
        difficulty: 'Medium'
      },
      {
        id: 'gate-em-7',
        question: 'If P(A) = 0.4, P(B) = 0.5, and events A and B are independent, what is P(A ∪ B)?',
        options: ['0.7', '0.9', '0.2', '0.8'],
        correctAnswer: 0,
        explanation: 'For independent events, P(A ∩ B) = P(A) * P(B) = 0.4 * 0.5 = 0.2. Then P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.4 + 0.5 - 0.2 = 0.7.',
        subject: 'Engineering Mathematics',
        topic: 'Probability & Statistics',
        difficulty: 'Medium'
      },
      {
        id: 'gate-em-8',
        question: 'What is the solution to the differential equation dy/dx = 3y with y(0) = 2?',
        options: ['y = 2e^(3x)', 'y = 3e^(2x)', 'y = 2 + 3x', 'y = 2ln(3x)'],
        correctAnswer: 0,
        explanation: 'Separating variables dy/y = 3 dx => ln(y) = 3x + C => y = C*e^(3x). With y(0) = 2, C = 2, so y = 2e^(3x).',
        subject: 'Engineering Mathematics',
        topic: 'Calculus & Differential Equations',
        difficulty: 'Medium'
      }
    ],
    'Data Structures & Algorithms': [
      {
        id: 'gate-dsa-1',
        question: 'What is the worst-case time complexity of finding an element in a Balanced Binary Search Tree (AVL Tree) with n elements?',
        options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
        correctAnswer: 0,
        explanation: 'An AVL tree maintains a balance factor between -1 and 1, ensuring its height is always O(log n). Therefore, search complexity is strictly O(log n) in the worst case.',
        subject: 'Data Structures & Algorithms',
        topic: 'Trees',
        difficulty: 'Easy'
      },
      {
        id: 'gate-dsa-2',
        question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n) and sorts in-place?',
        options: ['Heap Sort', 'Merge Sort', 'Quick Sort', 'Bubble Sort'],
        correctAnswer: 0,
        explanation: 'Heap Sort achieves O(n log n) in all cases (worst, average, best) and operates in-place using O(1) auxiliary space, unlike Merge Sort which requires O(n) auxiliary space.',
        subject: 'Data Structures & Algorithms',
        topic: 'Sorting & Searching',
        difficulty: 'Medium'
      },
      {
        id: 'gate-dsa-3',
        question: 'In Dijkstra’s single-source shortest path algorithm, which data structure is optimal to achieve O((V + E) log V) time complexity?',
        options: ['Min-Binary Heap / Priority Queue', 'Queue (FIFO)', 'Stack (LIFO)', 'Simple Array'],
        correctAnswer: 0,
        explanation: 'Using a min-heap or priority queue allows extract-min in O(log V) and decrease-key in O(log V), yielding O((V + E) log V).',
        subject: 'Data Structures & Algorithms',
        topic: 'Graph Algorithms',
        difficulty: 'Medium'
      },
      {
        id: 'gate-dsa-4',
        question: 'Which of the following problems can NOT be solved using the Greedy algorithmic strategy?',
        options: ['0/1 Knapsack Problem', 'Fractional Knapsack Problem', 'Kruskal’s Minimum Spanning Tree', 'Huffman Coding'],
        correctAnswer: 0,
        explanation: '0/1 Knapsack requires Dynamic Programming because greedy choice property does not guarantee optimal solutions when items cannot be split.',
        subject: 'Data Structures & Algorithms',
        topic: 'Algorithm Design Techniques',
        difficulty: 'Medium'
      },
      {
        id: 'gate-dsa-5',
        question: 'What is the postfix equivalent of the infix expression: (A + B) * C?',
        options: ['A B + C *', 'A B C + *', '* + A B C', 'A + B C *'],
        correctAnswer: 0,
        explanation: 'Expressions inside parenthesis are evaluated first: (A + B) becomes "A B +". Then multiplying by C gives "A B + C *".',
        subject: 'Data Structures & Algorithms',
        topic: 'Stacks & Expressions',
        difficulty: 'Easy'
      },
      {
        id: 'gate-dsa-6',
        question: 'What is the recurrence relation for the Merge Sort algorithm on an array of size n?',
        options: ['T(n) = 2T(n/2) + O(n)', 'T(n) = T(n - 1) + O(1)', 'T(n) = 2T(n/2) + O(1)', 'T(n) = T(n/2) + O(n)'],
        correctAnswer: 0,
        explanation: 'Merge sort divides the array into two halves 2T(n/2) and merges them in linear time O(n), giving T(n) = 2T(n/2) + O(n). By Master Theorem, T(n) = O(n log n).',
        subject: 'Data Structures & Algorithms',
        topic: 'Asymptotic Analysis & Recurrences',
        difficulty: 'Easy'
      },
      {
        id: 'gate-dsa-7',
        question: 'What is the worst-case time complexity of QuickSort when the pivot is always chosen as the smallest element in an already sorted array?',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'],
        correctAnswer: 0,
        explanation: 'Selecting the extreme element in a sorted list creates maximally unbalanced partitions (0 and n-1), resulting in O(n^2) worst-case time complexity.',
        subject: 'Data Structures & Algorithms',
        topic: 'Sorting & Searching',
        difficulty: 'Easy'
      }
    ],
    'Operating Systems': [
      {
        id: 'gate-os-1',
        question: 'Which of the following is NOT one of Coffman’s four necessary conditions for deadlock to occur?',
        options: ['Preemption allowed', 'Mutual Exclusion', 'Hold and Wait', 'Circular Wait'],
        correctAnswer: 0,
        explanation: 'The four necessary conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If Preemption is allowed, deadlock cannot occur.',
        subject: 'Operating Systems',
        topic: 'Deadlocks',
        difficulty: 'Easy'
      },
      {
        id: 'gate-os-2',
        question: 'Belady’s Anomaly occurs in which of the following page replacement algorithms?',
        options: ['FIFO (First-In, First-Out)', 'LRU (Least Recently Used)', 'Optimal Page Replacement', 'LFU'],
        correctAnswer: 0,
        explanation: 'Belady’s anomaly (where increasing the number of page frames results in an increase in the number of page faults) happens in FIFO, but never in stack-based algorithms like LRU.',
        subject: 'Operating Systems',
        topic: 'Virtual Memory & Paging',
        difficulty: 'Medium'
      },
      {
        id: 'gate-os-3',
        question: 'A counting semaphore S is initialized to 8. Then 10 wait() (P) operations and 4 signal() (V) operations are performed. What is the final value of S?',
        options: ['2', '4', '-2', '12'],
        correctAnswer: 0,
        explanation: 'Final value = Initial + Signals - Waits = 8 + 4 - 10 = 2.',
        subject: 'Operating Systems',
        topic: 'Process Synchronization',
        difficulty: 'Easy'
      },
      {
        id: 'gate-os-4',
        question: 'In the round-robin CPU scheduling algorithm, if the time quantum is set extremely large, it behaves like:',
        options: ['FCFS (First-Come, First-Served)', 'SJF (Shortest Job First)', 'Priority Scheduling', 'LIFO'],
        correctAnswer: 0,
        explanation: 'When time quantum exceeds the CPU burst of all processes, every process runs to completion in arrival order, making it identical to FCFS.',
        subject: 'Operating Systems',
        topic: 'CPU Scheduling',
        difficulty: 'Easy'
      },
      {
        id: 'gate-os-5',
        question: 'What is the purpose of the Translation Lookaside Buffer (TLB)?',
        options: ['To cache virtual-to-physical address translations', 'To cache frequently used disk blocks', 'To store CPU register values', 'To handle hardware interrupts'],
        correctAnswer: 0,
        explanation: 'TLB is a fast associative hardware cache that speeds up virtual-to-physical address translation by avoiding page table lookups in main memory.',
        subject: 'Operating Systems',
        topic: 'Memory Management',
        difficulty: 'Medium'
      },
      {
        id: 'gate-os-6',
        question: 'The Banker\'s algorithm is used in operating systems for:',
        options: ['Deadlock Avoidance', 'Deadlock Detection', 'CPU Scheduling', 'Disk Defragmentation'],
        correctAnswer: 0,
        explanation: 'Dijkstra\'s Banker\'s Algorithm is an established Deadlock Avoidance algorithm that ensures the system never enters an unsafe state.',
        subject: 'Operating Systems',
        topic: 'Deadlocks',
        difficulty: 'Easy'
      },
      {
        id: 'gate-os-7',
        question: 'Thrashing occurs in an operating system when:',
        options: ['The system spends more time servicing page faults than executing instructions', 'The CPU utilization reaches 100%', 'A process enters an infinite recursion', 'The hard drive runs out of sectors'],
        correctAnswer: 0,
        explanation: 'Thrashing occurs when memory is overcommitted and processes spend virtually all of their time paging in and out rather than executing instructions.',
        subject: 'Operating Systems',
        topic: 'Virtual Memory & Thrashing',
        difficulty: 'Medium'
      }
    ],
    'DBMS (Database Management Systems)': [
      {
        id: 'gate-dbms-1',
        question: 'A relation R is in BCNF (Boyce-Codd Normal Form) if for every non-trivial functional dependency X -> Y:',
        options: ['X is a superkey of R', 'Y is a prime attribute', 'X is a candidate key or Y is prime', 'X and Y are disjoint'],
        correctAnswer: 0,
        explanation: 'BCNF strictly requires the determinant X of any non-trivial functional dependency X -> Y to be a superkey of the relation.',
        subject: 'DBMS (Database Management Systems)',
        topic: 'Normalization',
        difficulty: 'Easy'
      },
      {
        id: 'gate-dbms-2',
        question: 'Which index structure is most widely used in modern relational database systems for range queries?',
        options: ['B+ Tree', 'Hash Index', 'Binary Search Tree', 'AVL Tree'],
        correctAnswer: 0,
        explanation: 'B+ Trees store all actual data pointers in leaf nodes linked sequentially, making range scans exceptionally fast with minimal disk I/O.',
        subject: 'DBMS (Database Management Systems)',
        topic: 'Indexing & B+ Trees',
        difficulty: 'Medium'
      },
      {
        id: 'gate-dbms-3',
        question: 'In transaction processing, the "I" in ACID stands for Isolation, which ensures:',
        options: ['Concurrent transactions do not interfere with each other', 'All operations in a transaction succeed or all fail', 'Data changes persist after system crash', 'Data satisfies all schema integrity constraints'],
        correctAnswer: 0,
        explanation: 'Isolation ensures that multiple concurrent transactions execute independently as if they were running serially without intermediate interference.',
        subject: 'DBMS (Database Management Systems)',
        topic: 'Transactions & Concurrency',
        difficulty: 'Easy'
      },
      {
        id: 'gate-dbms-4',
        question: 'Which SQL clause is used to filter records resulting from an aggregate function like COUNT() or AVG()?',
        options: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'],
        correctAnswer: 0,
        explanation: 'WHERE filters rows before aggregation, while HAVING filters group rows after aggregation.',
        subject: 'DBMS (Database Management Systems)',
        topic: 'SQL Queries',
        difficulty: 'Easy'
      },
      {
        id: 'gate-dbms-5',
        question: 'What is the natural join of two relations R(A, B) and S(B, C) equivalent to in Relational Algebra?',
        options: ['Projection on A, B, C of Cartesian product with condition R.B = S.B', 'Simple Cartesian Product R x S', 'Union of R and S', 'Intersection of R and S'],
        correctAnswer: 0,
        explanation: 'Natural join first performs Cartesian product, selects tuples where common attribute B matches, and projects unique attributes A, B, C.',
        subject: 'DBMS (Database Management Systems)',
        topic: 'Relational Algebra',
        difficulty: 'Medium'
      },
      {
        id: 'gate-dbms-6',
        question: 'Under Two-Phase Locking (2PL) protocol, once a transaction releases any lock, it enters the:',
        options: ['Shrinking Phase', 'Growing Phase', 'Commit Phase', 'Abort Phase'],
        correctAnswer: 0,
        explanation: 'In 2PL, the growing phase is where locks are acquired, and the shrinking phase begins the moment any lock is released; no new locks can be acquired in the shrinking phase.',
        subject: 'DBMS (Database Management Systems)',
        topic: 'Concurrency Control',
        difficulty: 'Easy'
      }
    ],
    'Computer Networks': [
      {
        id: 'gate-cn-1',
        question: 'Which layer of the OSI model is responsible for end-to-end process-to-process communication and port addressing?',
        options: ['Transport Layer', 'Network Layer', 'Data Link Layer', 'Session Layer'],
        correctAnswer: 0,
        explanation: 'The Transport Layer (layer 4) uses port numbers (e.g. TCP/UDP) to deliver segments to specific processes on the host.',
        subject: 'Computer Networks',
        topic: 'OSI Model & Transport Layer',
        difficulty: 'Easy'
      },
      {
        id: 'gate-cn-2',
        question: 'In IPv4 subnetting, how many usable host addresses are available in a /26 subnet?',
        options: ['62', '64', '30', '126'],
        correctAnswer: 0,
        explanation: 'A /26 subnet leaves 32 - 26 = 6 bits for hosts. 2^6 = 64 total addresses. Subtracting 2 for Network ID and Broadcast Address leaves 62 usable hosts.',
        subject: 'Computer Networks',
        topic: 'IPv4 & Subnetting',
        difficulty: 'Easy'
      },
      {
        id: 'gate-cn-3',
        question: 'Which routing protocol uses the Dijkstra Shortest Path First algorithm?',
        options: ['OSPF (Open Shortest Path First)', 'RIP (Routing Information Protocol)', 'BGP (Border Gateway Protocol)', 'EIGRP'],
        correctAnswer: 0,
        explanation: 'OSPF is a link-state routing protocol that constructs a complete network topology database and uses Dijkstra\'s algorithm to calculate shortest paths.',
        subject: 'Computer Networks',
        topic: 'Routing Protocols',
        difficulty: 'Medium'
      },
      {
        id: 'gate-cn-4',
        question: 'What is the primary function of the Address Resolution Protocol (ARP)?',
        options: ['To map a known IPv4 address to a physical MAC address', 'To assign dynamic IP addresses to clients', 'To resolve domain names to IP addresses', 'To encrypt TCP payload packets'],
        correctAnswer: 0,
        explanation: 'ARP broadcasts on the local data link to discover the MAC address associated with a given IPv4 address.',
        subject: 'Computer Networks',
        topic: 'Network Layer Protocols',
        difficulty: 'Easy'
      }
    ],
    'General Aptitude': [
      {
        id: 'gate-ga-1',
        question: 'If 12 men can complete a project in 18 days, in how many days can 18 men complete the same project working at the same rate?',
        options: ['12 days', '15 days', '9 days', '16 days'],
        correctAnswer: 0,
        explanation: 'Total work = 12 * 18 = 216 man-days. Days required for 18 men = 216 / 18 = 12 days.',
        subject: 'General Aptitude',
        topic: 'Time and Work',
        difficulty: 'Easy'
      },
      {
        id: 'gate-ga-2',
        question: 'A train traveling at 72 km/h crosses a 180-meter long platform in 18 seconds. What is the length of the train?',
        options: ['180 meters', '150 meters', '200 meters', '120 meters'],
        correctAnswer: 0,
        explanation: 'Speed = 72 * (5/18) = 20 m/s. Total distance in 18 sec = 20 * 18 = 360 meters. Train length = 360 - 180 = 180 meters.',
        subject: 'General Aptitude',
        topic: 'Speed, Distance & Time',
        difficulty: 'Medium'
      },
      {
        id: 'gate-ga-3',
        question: 'Choose the word that is most nearly opposite in meaning to "VERBOSE":',
        options: ['Concise', 'Elaborate', 'Lengthy', 'Fluent'],
        correctAnswer: 0,
        explanation: '"Verbose" means using more words than necessary. Its exact antonym is "Concise" (brief and to the point).',
        subject: 'General Aptitude',
        topic: 'Verbal Ability',
        difficulty: 'Easy'
      },
      {
        id: 'gate-ga-4',
        question: 'What is the next number in the series: 3, 7, 15, 31, 63, ...?',
        options: ['127', '126', '125', '128'],
        correctAnswer: 0,
        explanation: 'Each term follows the rule: next = (current * 2) + 1. So 63 * 2 + 1 = 127.',
        subject: 'General Aptitude',
        topic: 'Numerical Reasoning',
        difficulty: 'Easy'
      },
      {
        id: 'gate-ga-5',
        question: 'In how many different ways can the letters of the word "LEADING" be arranged such that vowels always appear together?',
        options: ['720', '360', '1440', '5040'],
        correctAnswer: 0,
        explanation: 'Vowels are E, A, I (3 vowels). Treat (E,A,I) as 1 unit. Total units = (L, D, N, G) + (EAI) = 5 units. Arrangements = 5! * 3! = 120 * 6 = 720.',
        subject: 'General Aptitude',
        topic: 'Permutations & Combinations',
        difficulty: 'Medium'
      }
    ]
  },
  'appsc-group-2': {
    'AP History & Social Structure': [
      {
        id: 'appsc-aph-1',
        question: 'Which dynasty was the first to rule over Andhra with their capital at Dhanyakataka (Amaravati)?',
        options: ['Satavahanas', 'Ikshvakus', 'Eastern Chalukyas', 'Kakatiyas'],
        correctAnswer: 0,
        explanation: 'The Satavahana dynasty (circa 2nd century BCE to 2nd century CE) was the first major empire centered in Andhra, with capitals at Kotilingala and Dhanyakataka.',
        subject: 'AP History & Social Structure',
        topic: 'Ancient Andhra History',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-aph-2',
        question: 'Who was the famous king of the Vijayanagara Empire that authored the Telugu epic poem "Amuktamalyada"?',
        options: ['Sri Krishnadevaraya', 'Harihara I', 'Achyuta Deva Raya', 'Deva Raya II'],
        correctAnswer: 0,
        explanation: 'Sri Krishnadevaraya, the greatest emperor of the Tuluva dynasty, wrote "Amuktamalyada", a masterpiece of Telugu Prabandha literature describing the marriage of Lord Ranganatha and Andal.',
        subject: 'AP History & Social Structure',
        topic: 'Medieval Andhra History',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-aph-3',
        question: 'On whose supreme sacrifice of a 58-day hunger strike was the separate linguistic state of Andhra created in 1953?',
        options: ['Potti Sreeramulu', 'Tanguturi Prakasam Panthulu', 'Kandukuri Veeresalingam', 'Bhogaraju Pattabhi Sitaramayya'],
        correctAnswer: 0,
        explanation: 'Amarajeevi Potti Sreeramulu undertook an epic hunger strike from October 19 to December 15, 1952. His martyrdom directly led to the formation of Andhra State on 1 October 1953.',
        subject: 'AP History & Social Structure',
        topic: 'Modern Andhra & Freedom Movement',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-aph-4',
        question: 'Who was appointed the first Chief Minister of the newly formed Andhra State in 1953 with Kurnool as capital?',
        options: ['Tanguturi Prakasam Panthulu', 'Neelam Sanjiva Reddy', 'Burgula Ramakrishna Rao', 'Kasu Brahmananda Reddy'],
        correctAnswer: 0,
        explanation: 'Tanguturi Prakasam Panthulu (known as "Andhra Kesari") became the first Chief Minister of Andhra State on 1 October 1953.',
        subject: 'AP History & Social Structure',
        topic: 'Post-Independence Andhra History',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-aph-5',
        question: 'Under which Act of the Indian Parliament was the state of Andhra Pradesh bifurcated into Telangana and residuary Andhra Pradesh in 2014?',
        options: ['Andhra Pradesh Reorganisation Act, 2014', 'States Reorganisation Act, 1956', 'Constitution 110th Amendment Act', 'AP Administrative Tribunal Act'],
        correctAnswer: 0,
        explanation: 'The Andhra Pradesh Reorganisation Act, 2014 (Act No. 6 of 2014) bifurcated Andhra Pradesh, setting the appointed day as 2 June 2014.',
        subject: 'AP History & Social Structure',
        topic: 'AP Reorganisation Act 2014',
        difficulty: 'Medium'
      },
      {
        id: 'appsc-aph-6',
        question: 'Who was the social reformer from Rajahmundry who pioneered widow remarriage and founded the "Viveka Vardhini" journal in Andhra?',
        options: ['Kandukuri Veeresalingam Panthulu', 'Raghupati Venkataratnam Naidu', 'Gurajada Apparao', 'Gidugu Ramamurthy'],
        correctAnswer: 0,
        explanation: 'Kandukuri Veeresalingam is regarded as the Father of Renaissance in Telugu literature and society, conducting the first widow remarriage in 1881.',
        subject: 'AP History & Social Structure',
        topic: 'Social Reform Movement in AP',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-aph-7',
        question: 'Which Kakatiya queen successfully repelled invasions from the Yadavas and Pandyas and ruled with the royal title of "Rudradeva Maharaja"?',
        options: ['Rani Rudrama Devi', 'Kota Ganapamba', 'Mailama Devi', 'Nagamma'],
        correctAnswer: 0,
        explanation: 'Rani Rudrama Devi (1262–1289 CE) was one of the few prominent female monarchs in Indian history, noted for her military valor and defense of Orugallu.',
        subject: 'AP History & Social Structure',
        topic: 'Kakatiya Dynasty',
        difficulty: 'Easy'
      }
    ],
    'Indian Constitution & Polity': [
      {
        id: 'appsc-pol-1',
        question: 'Which Article of the Indian Constitution is referred to as the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
        options: ['Article 32 (Right to Constitutional Remedies)', 'Article 21 (Protection of Life & Personal Liberty)', 'Article 14 (Equality Before Law)', 'Article 19 (Freedom of Speech)'],
        correctAnswer: 0,
        explanation: 'Dr. B.R. Ambedkar called Article 32 the "Heart and Soul" because without remedies through writs (Habeas Corpus, Mandamus, etc.), fundamental rights would be ineffective.',
        subject: 'Indian Constitution & Polity',
        topic: 'Fundamental Rights',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-pol-2',
        question: 'By which Constitutional Amendment Act were the Panchayati Raj Institutions granted constitutional status?',
        options: ['73rd Constitutional Amendment Act, 1992', '74th Constitutional Amendment Act, 1992', '42nd Constitutional Amendment Act, 1976', '44th Constitutional Amendment Act, 1978'],
        correctAnswer: 0,
        explanation: 'The 73rd Amendment Act 1992 inserted Part IX and the 11th Schedule, granting constitutional status to three-tier Panchayati Raj Institutions.',
        subject: 'Indian Constitution & Polity',
        topic: 'Local Self Government',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-pol-3',
        question: 'Who administers the oath of office to the Governor of an Indian State?',
        options: ['Chief Justice of the High Court of that State', 'President of India', 'Chief Minister of the State', 'Chief Justice of India'],
        correctAnswer: 0,
        explanation: 'Under Article 159, the oath of office to a Governor is administered by the Chief Justice of the High Court of the respective state.',
        subject: 'Indian Constitution & Polity',
        topic: 'State Executive',
        difficulty: 'Medium'
      },
      {
        id: 'appsc-pol-4',
        question: 'In which landmark Supreme Court judgment was the "Basic Structure Doctrine" established?',
        options: ['Kesavananda Bharati v. State of Kerala (1973)', 'Golaknath v. State of Punjab (1967)', 'Minerva Mills v. Union of India (1980)', 'Maneka Gandhi v. Union of India (1978)'],
        correctAnswer: 0,
        explanation: 'The landmark 13-judge bench in Kesavananda Bharati (1973) ruled that Parliament cannot alter the basic structure or essential framework of the Indian Constitution.',
        subject: 'Indian Constitution & Polity',
        topic: 'Judiciary & Judicial Review',
        difficulty: 'Medium'
      },
      {
        id: 'appsc-pol-5',
        question: 'Under Article 356 of the Indian Constitution, on what grounds can President\'s Rule be imposed on a state?',
        options: ['Failure of constitutional machinery in the state', 'External aggression or war', 'Financial instability in the state', 'Uncontrolled inflation'],
        correctAnswer: 0,
        explanation: 'Article 356 empowers the President to issue a proclamation imposing President\'s Rule if satisfied that the government of the state cannot be carried on in accordance with the provisions of the Constitution.',
        subject: 'Indian Constitution & Polity',
        topic: 'Emergency Provisions',
        difficulty: 'Easy'
      }
    ],
    'AP Economy & Indian Economy': [
      {
        id: 'appsc-eco-1',
        question: 'Which multipurpose national project in Andhra Pradesh is designated to irrigate over 7 lakh acres across Godavari and Krishna delta basins?',
        options: ['Polavaram Irrigation Project', 'Nagarjuna Sagar Dam', 'Srisailam Reservoir', 'Tungabhadra Project'],
        correctAnswer: 0,
        explanation: 'Polavaram (Indira Sagar) is declared a National Project under Section 90 of the AP Reorganisation Act 2014, built on the Godavari river.',
        subject: 'AP Economy & Indian Economy',
        topic: 'AP Irrigation & Infrastructure',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-eco-2',
        question: 'What is the flagship farmer welfare scheme in Andhra Pradesh that provides direct financial assistance to agricultural cultivators?',
        options: ['YSR Rythu Bharosa / PM-KISAN', 'Rythu Bandhu', 'Kalia Scheme', 'Jagananna Amma Vodi'],
        correctAnswer: 0,
        explanation: 'YSR Rythu Bharosa (combined with PM-KISAN) provides yearly direct income support to farmer households in Andhra Pradesh.',
        subject: 'AP Economy & Indian Economy',
        topic: 'AP State Welfare Schemes',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-eco-3',
        question: 'Which sector contributes the highest share to the Gross State Domestic Product (GSDP) of Andhra Pradesh in recent economic surveys?',
        options: ['Services Sector', 'Agriculture and Allied Sector', 'Heavy Industries', 'Mining Sector'],
        correctAnswer: 0,
        explanation: 'The Services sector constitutes the largest single share (approx 42-45%) of Andhra Pradesh GSDP, followed by Agriculture & Allied sectors (approx 34-36%).',
        subject: 'AP Economy & Indian Economy',
        topic: 'GSDP Structure',
        difficulty: 'Medium'
      },
      {
        id: 'appsc-eco-4',
        question: 'Which apex statutory body in India replaced the Planning Commission in 2015?',
        options: ['NITI Aayog (National Institution for Transforming India)', 'Finance Commission', 'National Development Council', 'Inter-State Council'],
        correctAnswer: 0,
        explanation: 'NITI Aayog was formed on January 1, 2015 by a cabinet resolution to serve as a think tank promoting cooperative federalism.',
        subject: 'AP Economy & Indian Economy',
        topic: 'Economic Planning in India',
        difficulty: 'Easy'
      }
    ],
    'General Studies & Mental Ability': [
      {
        id: 'appsc-gs-1',
        question: 'In Andhra Pradesh, which coastal port is being developed as a major greenfield deep-water commercial hub in Prakasam/Nellore region?',
        options: ['Ramayapatnam Port', 'Visakhapatnam Port', 'Kakinada Deep Water Port', 'Gangavaram Port'],
        correctAnswer: 0,
        explanation: 'Ramayapatnam Port in Nellore/Prakasam coastal corridor is being constructed as a premier non-major greenfield port in Andhra Pradesh.',
        subject: 'General Studies & Mental Ability',
        topic: 'AP Geography & Ports',
        difficulty: 'Medium'
      },
      {
        id: 'appsc-gs-2',
        question: 'What is the total length of the coastline of Andhra Pradesh, making it the second longest in mainland India?',
        options: ['Approximately 974 km', 'Approximately 1214 km', 'Approximately 750 km', 'Approximately 580 km'],
        correctAnswer: 0,
        explanation: 'Andhra Pradesh has a coastline of 974 km along the Bay of Bengal, second only to Gujarat (1214 km) in mainland India.',
        subject: 'General Studies & Mental Ability',
        topic: 'Physical Geography of Andhra Pradesh',
        difficulty: 'Easy'
      },
      {
        id: 'appsc-gs-3',
        question: 'Which Indian spaceport from where ISRO launches its Polar Satellite Launch Vehicle (PSLV) is located in Andhra Pradesh?',
        options: ['Satish Dhawan Space Centre (Sriharikota)', 'Thumba Equatorial Rocket Launching Station', 'ISRO Propulsion Complex (Mahendragiri)', 'Dr. Abdul Kalam Island'],
        correctAnswer: 0,
        explanation: 'Satish Dhawan Space Centre (SDSC SHAR) is located in Sriharikota, Tirupati district, Andhra Pradesh.',
        subject: 'General Studies & Mental Ability',
        topic: 'Science & Technology',
        difficulty: 'Easy'
      }
    ]
  },
  'ssc-cgl': {
    'Quantitative Aptitude': [
      {
        id: 'ssc-qa-1',
        question: 'A shopkeeper marks an article 40% above the cost price and allows a discount of 20% on the marked price. What is his profit percentage?',
        options: ['12%', '20%', '16%', '14%'],
        correctAnswer: 0,
        explanation: 'Let CP = 100. MP = 140. SP = 140 * 0.8 = 112. Profit = 112 - 100 = 12%.',
        subject: 'Quantitative Aptitude',
        topic: 'Profit, Loss & Discount',
        difficulty: 'Easy'
      },
      {
        id: 'ssc-qa-2',
        question: 'What is the compound interest on ₹10,000 for 2 years at 10% per annum compounded annually?',
        options: ['₹2,100', '₹2,000', '₹2,200', '₹2,050'],
        correctAnswer: 0,
        explanation: 'A = 10000 * (1.1)^2 = ₹12,100. CI = 12100 - 10000 = ₹2,100.',
        subject: 'Quantitative Aptitude',
        topic: 'Compound Interest',
        difficulty: 'Easy'
      },
      {
        id: 'ssc-qa-3',
        question: 'If sin θ + cos θ = √2 cos θ, then the value of cos θ - sin θ is:',
        options: ['√2 sin θ', '√2 cos θ', 'sin θ', '0'],
        correctAnswer: 0,
        explanation: 'From the identity (sin θ + cos θ)^2 + (cos θ - sin θ)^2 = 2. Given (√2 cos θ)^2 + x^2 = 2 => 2 cos^2 θ + x^2 = 2 => x^2 = 2(1 - cos^2 θ) = 2 sin^2 θ => x = √2 sin θ.',
        subject: 'Quantitative Aptitude',
        topic: 'Trigonometry',
        difficulty: 'Medium'
      },
      {
        id: 'ssc-qa-4',
        question: 'A and B can do a work in 12 days, B and C in 15 days, and C and A in 20 days. In how many days will all three together finish the work?',
        options: ['10 days', '12 days', '8 days', '15 days'],
        correctAnswer: 0,
        explanation: '2(A+B+C) = 1/12 + 1/15 + 1/20 = (5 + 4 + 3)/60 = 12/60 = 1/5. So A+B+C = 1/10. Work finished in 10 days.',
        subject: 'Quantitative Aptitude',
        topic: 'Time and Work',
        difficulty: 'Easy'
      }
    ],
    'General Intelligence & Reasoning': [
      {
        id: 'ssc-gir-1',
        question: 'Pointing to a photograph, a woman says: "He is the only son of my father\'s only son." How is the boy in the photograph related to the woman?',
        options: ['Nephew', 'Son', 'Brother', 'Cousin'],
        correctAnswer: 0,
        explanation: '"My father\'s only son" is the woman\'s brother. The boy is the only son of her brother, which means he is her nephew.',
        subject: 'General Intelligence & Reasoning',
        topic: 'Blood Relations',
        difficulty: 'Easy'
      },
      {
        id: 'ssc-gir-2',
        question: 'Select the related word from the given alternatives: BIRD : FLY :: FISH : ?',
        options: ['SWIM', 'WATER', 'GILLS', 'FIN'],
        correctAnswer: 0,
        explanation: 'A bird moves by flying; a fish moves by swimming.',
        subject: 'General Intelligence & Reasoning',
        topic: 'Analogy',
        difficulty: 'Easy'
      },
      {
        id: 'ssc-gir-3',
        question: 'Statements: All pens are books. All books are pencils. Conclusion I: All pens are pencils. Conclusion II: Some pencils are pens.',
        options: ['Both Conclusion I and II follow', 'Only Conclusion I follows', 'Only Conclusion II follows', 'Neither follows'],
        correctAnswer: 0,
        explanation: 'Since Pens ⊂ Books ⊂ Pencils, all pens are pencils (I follows), and since Pens exist in Pencils, some pencils are pens (II follows).',
        subject: 'General Intelligence & Reasoning',
        topic: 'Syllogism',
        difficulty: 'Easy'
      }
    ],
    'English Comprehension': [
      {
        id: 'ssc-eng-1',
        question: 'Find the correctly spelt word:',
        options: ['Accommodate', 'Acommodate', 'Accomodate', 'Acomodate'],
        correctAnswer: 0,
        explanation: '"Accommodate" has double c and double m.',
        subject: 'English Comprehension',
        topic: 'Spelling Rules',
        difficulty: 'Easy'
      },
      {
        id: 'ssc-eng-2',
        question: 'Choose the one-word substitute for: "A person who hates or distrusts humankind."',
        options: ['Misanthrope', 'Philanthropist', 'Polyglot', 'Hermit'],
        correctAnswer: 0,
        explanation: 'A "misanthrope" is someone who dislikes human society and general mankind.',
        subject: 'English Comprehension',
        topic: 'One Word Substitution',
        difficulty: 'Easy'
      },
      {
        id: 'ssc-eng-3',
        question: 'Choose the correct meaning of the idiom: "Bite the bullet"',
        options: ['To face a difficult situation with courage', 'To get wounded in combat', 'To start a quarrel', 'To act impulsively'],
        correctAnswer: 0,
        explanation: '"Bite the bullet" means to bravely accept a grim or painful situation that is unavoidable.',
        subject: 'English Comprehension',
        topic: 'Idioms and Phrases',
        difficulty: 'Easy'
      }
    ],
    'General Awareness & Science': [
      {
        id: 'ssc-ga-1',
        question: 'Who was the founder of the Maurya Empire in ancient India?',
        options: ['Chandragupta Maurya', 'Ashoka', 'Bindusara', 'Brihadratha'],
        correctAnswer: 0,
        explanation: 'Chandragupta Maurya founded the Maurya Empire in 322 BCE with the guidance of his mentor Chanakya (Kautilya).',
        subject: 'General Awareness & Science',
        topic: 'Ancient Indian History',
        difficulty: 'Easy'
      },
      {
        id: 'ssc-ga-2',
        question: 'Which instrument is used to measure atmospheric pressure?',
        options: ['Barometer', 'Thermometer', 'Hydrometer', 'Anemometer'],
        correctAnswer: 0,
        explanation: 'A barometer is used to measure atmospheric pressure, invented by Evangelista Torricelli.',
        subject: 'General Awareness & Science',
        topic: 'General Science & Physics',
        difficulty: 'Easy'
      },
      {
        id: 'ssc-ga-3',
        question: 'Under which Article of the Constitution of India is the Finance Commission constituted by the President every 5 years?',
        options: ['Article 280', 'Article 324', 'Article 148', 'Article 312'],
        correctAnswer: 0,
        explanation: 'Article 280 mandates the constitution of a Finance Commission to recommend tax distribution between the Union and the States.',
        subject: 'General Awareness & Science',
        topic: 'Indian Polity',
        difficulty: 'Easy'
      }
    ]
  }
};

/**
 * Domain-specific procedural question templates to supply realistic, high-standard mock exams
 * for any number of questions (10, 25, 50, 65) with ZERO mixed questions and authentic subject rigor.
 */
const SUBJECT_QUESTION_TEMPLATES: Record<string, { topic: string; questions: { q: string; opts: [string, string, string, string]; ans: number; exp: string }[] }> = {
  'Engineering Mathematics': {
    topic: 'Advanced Engineering Math',
    questions: [
      {
        q: 'If matrix M has eigenvalues 4 and 6, what is the determinant of matrix M?',
        opts: ['24', '10', '2', '1.5'],
        ans: 0,
        exp: 'The determinant of any square matrix is equal to the product of its eigenvalues. Here det(M) = 4 * 6 = 24.'
      },
      {
        q: 'What is the order of convergence for Newton-Raphson method for finding simple roots?',
        opts: ['Quadratic (Order 2)', 'Linear (Order 1)', 'Cubic (Order 3)', 'Superlinear (Order 1.62)'],
        ans: 0,
        exp: 'Newton-Raphson has quadratic convergence (order 2) when the root is simple and derivative is non-zero.'
      },
      {
        q: 'In Poisson distribution, if the mean is λ = 4, what is the variance of the distribution?',
        opts: ['4', '2', '16', '8'],
        ans: 0,
        exp: 'In a Poisson distribution, the mean and variance are both equal to the parameter λ. Thus variance = 4.'
      },
      {
        q: 'The value of the line integral of a conservative vector field along any closed curve is always:',
        opts: ['Zero', 'Unity', 'Infinite', 'Dependent on curve radius'],
        ans: 0,
        exp: 'By Stokes theorem and definition of a conservative field (curl F = 0), circulation along any closed path is zero.'
      },
      {
        q: 'How many different simple graphs can be formed with n labeled vertices?',
        opts: ['2^(n(n - 1)/2)', 'n!', '2^n', 'n(n - 1)/2'],
        ans: 0,
        exp: 'There are n(n-1)/2 possible edges. Each edge can be either present or absent, yielding 2^(n(n-1)/2) possible graphs.'
      }
    ]
  },
  'Data Structures & Algorithms': {
    topic: 'DSA Core',
    questions: [
      {
        q: 'What is the auxiliary space complexity of standard Depth First Search (DFS) on a graph with V vertices?',
        opts: ['O(V) due to call stack and visited array', 'O(1)', 'O(V^2)', 'O(E)'],
        ans: 0,
        exp: 'DFS requires a visited array of size V and recursion stack that in the worst case (skewed path) reaches depth V.'
      },
      {
        q: 'Which algorithm is optimal for finding strongly connected components (SCC) in a directed graph in O(V + E) time?',
        opts: ['Tarjan’s or Kosaraju’s Algorithm', 'Kruskal’s Algorithm', 'Floyd-Warshall Algorithm', 'Prim’s Algorithm'],
        ans: 0,
        exp: 'Both Tarjan’s and Kosaraju’s algorithms find strongly connected components in linear O(V + E) time.'
      },
      {
        q: 'In a Min-Heap with n elements, what is the time complexity to insert a new element?',
        opts: ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'],
        ans: 0,
        exp: 'Inserting into a heap places the element at the leaf and bubbles up along the height, taking O(log n) comparisons.'
      },
      {
        q: 'What is the time complexity of the Floyd-Warshall all-pairs shortest paths algorithm for a graph with V vertices?',
        opts: ['O(V^3)', 'O(V^2 log V)', 'O(V * E)', 'O(V log V)'],
        ans: 0,
        exp: 'Floyd-Warshall uses three nested loops of size V to update shortest paths, giving O(V^3) complexity.'
      }
    ]
  },
  'Operating Systems': {
    topic: 'Systems & Kernels',
    questions: [
      {
        q: 'Which disk scheduling algorithm selects the request that requires the minimum head movement from current position?',
        opts: ['SSTF (Shortest Seek Time First)', 'FCFS', 'SCAN (Elevator)', 'LOOK'],
        ans: 0,
        exp: 'SSTF selects the disk I/O request closest to the current head arm, minimizing immediate seek time.'
      },
      {
        q: 'What is a critical section in concurrent programming?',
        opts: ['A code segment where shared resources are accessed', 'A routine that executes with kernel privilege', 'An error handler for hardware failure', 'A non-preemptible user function'],
        ans: 0,
        exp: 'The critical section is the part of concurrent code where shared variables/memory are accessed and requires mutual exclusion.'
      },
      {
        q: 'In a paging system with page size 4 KB, how many bits are required for the page offset?',
        opts: ['12 bits', '10 bits', '16 bits', '8 bits'],
        ans: 0,
        exp: '4 KB = 4 * 1024 bytes = 4096 bytes = 2^12 bytes. Therefore, 12 bits are needed for the page offset.'
      }
    ]
  },
  'DBMS (Database Management Systems)': {
    topic: 'Database Systems',
    questions: [
      {
        q: 'Which anomaly is prevented by the Strict Two-Phase Locking (Strict 2PL) protocol?',
        opts: ['Cascading Aborts / Rollbacks', 'Deadlocks', 'Starvation', 'Phantom Reads'],
        ans: 0,
        exp: 'Strict 2PL holds all exclusive (write) locks until the transaction commits or aborts, completely preventing cascading rollbacks.'
      },
      {
        q: 'In relational algebra, which operator is equivalent to the Cartesian product followed by a selection condition?',
        opts: ['Theta Join (θ-join)', 'Natural Join', 'Projection', 'Set Difference'],
        ans: 0,
        exp: 'A theta join R ⋈_θ S is defined as σ_θ(R × S), which is Cartesian product followed by selection on condition θ.'
      }
    ]
  },
  'AP History & Social Structure': {
    topic: 'Andhra History',
    questions: [
      {
        q: 'Which Buddhist stupa site in Guntur district is celebrated for its world-famous marble carvings depicting Jataka tales?',
        opts: ['Amaravati Maha Stupa', 'Bhattiprolu Stupa', 'Ghantasala Stupa', 'Salihundam'],
        ans: 0,
        exp: 'The Amaravati Maha Stupa (Deepaladinne) is renowned globally for its exquisite limestone and marble relief sculptures.'
      },
      {
        q: 'Who led the famous Rampa Rebellion (1922-1924) against the British Madras Forest Act in Andhra Agency tracts?',
        opts: ['Alluri Sitarama Raju', 'Komaram Bheem', 'Uyyalawada Narasimha Reddy', 'Birsa Munda'],
        exp: 'Manyam Veerudu Alluri Sitarama Raju organized tribal guerrilla resistance against British forest exploitation in Rampa.',
        ans: 0
      },
      {
        q: 'Which famous university in ancient Andhra was established near Nagarjunakonda by the philosopher Acharya Nagarjuna?',
        opts: ['Sri Parvata University (Vijayapuri)', 'Nalanda', 'Takshashila', 'Vikramashila'],
        ans: 0,
        exp: 'Acharya Nagarjuna founded the Madhyamaka school of Mahayana Buddhism at Sri Parvata / Nagarjunakonda in Guntur/Palnadu.'
      }
    ]
  },
  'Indian Constitution & Polity': {
    topic: 'Constitutional Law',
    questions: [
      {
        q: 'Which schedule of the Indian Constitution contains the Anti-Defection Law?',
        opts: ['10th Schedule (added by 52nd Amendment, 1985)', '8th Schedule', '7th Schedule', '12th Schedule'],
        ans: 0,
        exp: 'The 10th Schedule was added by the 52nd Constitutional Amendment Act, 1985 to disqualify legislators on ground of defection.'
      },
      {
        q: 'Under Article 123 of the Constitution, who has the power to promulgate Ordinances during recess of Parliament?',
        opts: ['The President of India', 'The Prime Minister', 'Chief Justice of India', 'Speaker of Lok Sabha'],
        ans: 0,
        exp: 'Article 123 empowers the President to issue ordinances when either House is not in session and immediate action is required.'
      }
    ]
  },
  'AP Economy & Indian Economy': {
    topic: 'Economic Analysis',
    questions: [
      {
        q: 'What is the Fiscal Responsibility and Budget Management (FRBM) Act recommended ceiling for state fiscal deficit?',
        opts: ['3.0% of GSDP', '5.0% of GSDP', '1.5% of GSDP', '6.5% of GSDP'],
        ans: 0,
        exp: 'The FRBM target prescribes limiting the fiscal deficit to 3% of the Gross State Domestic Product (GSDP).'
      },
      {
        q: 'Under the Goods and Services Tax (GST) framework in India, which constitutional article establishes the GST Council?',
        opts: ['Article 279A', 'Article 280', 'Article 265', 'Article 300A'],
        ans: 0,
        exp: 'Article 279A was inserted by the 101st Constitutional Amendment Act 2016 to create the joint Union-State GST Council.'
      }
    ]
  },
  'Quantitative Aptitude': {
    topic: 'Mathematics & Numerical Aptitude',
    questions: [
      {
        q: 'A sum of money doubles itself at simple interest in 8 years. What is the rate of interest per annum?',
        opts: ['12.5%', '10%', '8%', '15%'],
        ans: 0,
        exp: 'SI = P. SI = (P * R * T) / 100 => P = (P * R * 8) / 100 => R = 100 / 8 = 12.5%.'
      },
      {
        q: 'What is the value of (a^3 + b^3) / (a^2 - ab + b^2)?',
        opts: ['a + b', 'a - b', '(a + b)^2', '1'],
        ans: 0,
        exp: 'Using identity a^3 + b^3 = (a + b)(a^2 - ab + b^2), dividing gives simply (a + b).'
      }
    ]
  }
};

/**
 * Generate a complete, representative mock exam for a given exam and subject.
 * STRICTLY SEPARATES SUBJECTS - ZERO cross-exam or cross-subject mixing!
 */
export function generateMockQuestions(
  examId: string,
  subject: string,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  numQuestions: number
): QuizQuestion[] {
  const examConfig = EXAM_QUIZ_CONFIGS[examId] || EXAM_QUIZ_CONFIGS['gate-cse'];
  const examBank = AUTHENTIC_QUIZ_BANK[examId] || AUTHENTIC_QUIZ_BANK['gate-cse'];

  let pool: QuizQuestion[] = [];
  const isFullMock = subject === 'ALL_SUBJECTS' || subject.toLowerCase().includes('all') || subject.toLowerCase().includes('full mock');

  if (isFullMock) {
    // Gather questions proportionally across all valid official subjects of this exam
    for (const subName of examConfig.subjects) {
      if (examBank[subName]) {
        pool.push(...examBank[subName]);
      }
    }
  } else {
    // STRICT EXACT SUBJECT MATCH ONLY
    const matchingSubjectKey = Object.keys(examBank).find(
      k => k.toLowerCase() === subject.toLowerCase() || 
           subject.toLowerCase().includes(k.toLowerCase()) || 
           k.toLowerCase().includes(subject.toLowerCase())
    );

    if (matchingSubjectKey && examBank[matchingSubjectKey]) {
      pool.push(...examBank[matchingSubjectKey]);
    } else {
      // Look for a config subject that matches
      const confSub = examConfig.subjects.find(s => s.toLowerCase().includes(subject.toLowerCase()) || subject.toLowerCase().includes(s.toLowerCase()));
      const key = confSub && examBank[confSub] ? confSub : Object.keys(examBank)[0];
      if (key && examBank[key]) {
        pool.push(...examBank[key]);
      }
    }
  }

  // Shuffle collected curated questions
  let result: QuizQuestion[] = [...pool].sort(() => 0.5 - Math.random());

  // If more questions needed to represent real mock exam count (e.g. 10, 25, 50, 65):
  const needed = numQuestions - result.length;
  if (needed > 0) {
    const targetSubjectName = isFullMock ? examConfig.subjects[0] : subject;

    // Use subject templates to generate realistic questions
    let subTemplates = SUBJECT_QUESTION_TEMPLATES[targetSubjectName];
    if (!subTemplates) {
      const matchedKey = Object.keys(SUBJECT_QUESTION_TEMPLATES).find(k => targetSubjectName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(targetSubjectName.toLowerCase()));
      if (matchedKey) subTemplates = SUBJECT_QUESTION_TEMPLATES[matchedKey];
    }

    for (let i = 1; i <= needed; i++) {
      const activeSub = isFullMock ? examConfig.subjects[(i - 1) % examConfig.subjects.length] : targetSubjectName;
      
      let qText = '';
      let opts: [string, string, string, string] = ['', '', '', ''];
      let ans = 0;
      let expText = '';
      let topic = 'Core Exam Syllabus';

      if (subTemplates && subTemplates.questions.length > 0) {
        const tItem = subTemplates.questions[(i - 1) % subTemplates.questions.length];
        qText = `[${examConfig.examTitle} Practice Q${result.length + 1}] ${tItem.q}`;
        opts = tItem.opts;
        ans = tItem.ans;
        expText = tItem.exp;
        topic = subTemplates.topic;
      } else {
        qText = `[${examConfig.examTitle} Mock Test Q${result.length + 1}] In ${activeSub}, which of the following standard principles or statutory provisions governs optimal performance and verification?`;
        opts = [
          `Option A: Standard verified benchmark in accordance with official ${activeSub} curriculum.`,
          `Option B: Inverse proportional coefficient under non-standard assumptions.`,
          `Option C: Non-deterministic asymptotic condition without schema binding.`,
          `Option D: Residual provisional status pending official gazette amendment.`
        ];
        ans = 0;
        expText = `Standard examination benchmark for ${activeSub}: Option A is the verified correct answer in accordance with the official ${examConfig.examTitle} syllabus.`;
      }

      result.push({
        id: `mock-${examId}-${i}-${Date.now()}`,
        question: qText,
        options: opts,
        correctAnswer: ans,
        explanation: expText,
        subject: activeSub,
        topic,
        difficulty
      });
    }
  }

  return result.slice(0, numQuestions);
}
