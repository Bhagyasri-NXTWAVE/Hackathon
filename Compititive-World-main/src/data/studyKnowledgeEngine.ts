import { StudentProfile } from '../types';

/**
 * Checks whether a user's query is OUT OF TOPIC (not related to studies, academic subjects, competitive exams, or career guidance).
 */
export function isOutOfTopicQuery(rawQuery: string): boolean {
  const query = (rawQuery || '').toLowerCase().trim();
  if (!query) return false;

  // 1. Explicit non-study and non-academic categories MUST BE CHECKED FIRST
  const outOfTopicPatterns = [
    // Entertainment & Movies
    /\b(movie|movies|film|films|cinema|bollywood|hollywood|tollywood|actor|actors|actress|actresses)\b/i,
    /\b(song|songs|lyrics|music album|singer|singers|netflix|ott|trailer|box office)\b/i,
    /\b(pushpa|rrr|kgf|kalki|bahubali|shah rukh|salman|prabhas|allu arjun|mahesh babu|ram charan|rajini)\b/i,
    
    // Sports gossip & betting
    /\b(ipl|cricket|cricket match|match score|who won the match|virat kohli|rohit sharma|ms dhoni|messi|ronaldo|fifa|premier league|dream11)\b/i,
    
    // Food & Cooking Recipes
    /\b(recipe|recipes|how to cook|how to make biryani|cook biryani|biryani|pizza|burger|pasta|noodles|cake recipe|baking|tasty food|restaurant menu)\b/i,
    
    // Video games & Anime
    /\b(video game|video games|gta|gta 5|pubg|free fire|minecraft|call of duty|fortnite|playstation|xbox|anime|naruto|goku|dragon ball)\b/i,
    
    // Personal dating, romance & gossip
    /\b(girlfriend|boyfriend|dating|flirt|propose|love advice|breakup|kiss|adult|sexy|romance)\b/i,
    
    // Jokes, Astrology, Shopping & Random
    /\b(tell me a joke|funny joke|say a joke|tell a joke|riddle|horoscope|astrology|zodiac|rasi phalalu)\b/i,
    /\b(weather today|tomorrow rain|shopping online|buy shoes|buy clothes|crypto trading|bitcoin price|lottery)\b/i
  ];

  for (const pattern of outOfTopicPatterns) {
    if (pattern.test(query)) {
      return true;
    }
  }

  return false;
}

export const OUT_OF_TOPIC_REPLY = 
  "Sorry, it is out of topic. I can only assist with studies, academic subjects, competitive exam preparation, syllabus, and career guidance. Please ask a study-related question!";

/**
 * Returns a direct, accurate, authoritative response to specific academic & competitive exam questions.
 */
export function getAcademicAnswer(rawQuery: string, profile: StudentProfile, language?: string): string {
  const query = (rawQuery || '').toLowerCase().trim();
  const userName = profile?.name || 'Student';
  const hours = profile?.dailyStudyHours || 3;
  const education = profile?.education || 'Graduation';
  const branch = profile?.branch || 'General';
  const state = profile?.state || 'Andhra Pradesh';

  // 1. Mandatory Out-Of-Topic Check
  if (isOutOfTopicQuery(query)) {
    return OUT_OF_TOPIC_REPLY;
  }

  // 2. Greetings
  if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|who are you|what can you do|help me)$/i.test(query)) {
    return `Hello ${userName}! I am Competitive AI, your personal academic mentor. You can ask me specific conceptual questions across Computer Science, Mathematics, Indian Polity, History, Economy, General Science, and Aptitude, or explore preparation strategies for GATE, APPSC, SSC, UPSC, and Banking exams. What topic would you like to master today?`;
  }

  // 3. COMPUTER SCIENCE & ENGINEERING
  if (query.includes('dijkstra')) {
    return `Dijkstra's Algorithm Overview:
1. Purpose: Solves the Single-Source Shortest Path (SSSP) problem on weighted graphs.
2. Strategy: Greedy Approach.
3. Time Complexity:
   - With Min-Binary Heap / Priority Queue: O((V + E) log V).
   - With simple array: O(V^2).
   - With Fibonacci Heap: O(E + V log V).
4. Critical Constraint: Edge weights MUST be non-negative. If negative edge weights exist, use the Bellman-Ford algorithm instead!`;
  }

  if (query.includes('avl tree') || query.includes('balanced binary search tree') || query.includes('red black')) {
    return `AVL Tree & Balanced Search Trees:
1. Definition: An AVL tree is a self-balancing Binary Search Tree where the Balance Factor (Height of Left Subtree - Height of Right Subtree) for every node is strictly in {-1, 0, +1}.
2. Rotations for Rebalancing:
   - Single Rotations: LL (Left-Left) and RR (Right-Right).
   - Double Rotations: LR (Left-Right) and RL (Right-Left).
3. Complexity: Guarantees O(log n) height in all cases, making search, insertion, and deletion strictly O(log n) even in the worst case (unlike a standard BST which can degenerate to O(n)).`;
  }

  if (query.includes('quicksort') || query.includes('merge sort') || query.includes('sorting algorithm')) {
    return `QuickSort vs MergeSort Comparison:
1. QuickSort:
   - Strategy: Divide and Conquer using a partition pivot.
   - Time Complexity: Best & Average O(n log n); Worst Case O(n^2) when array is already sorted and extreme pivot is selected.
   - Space: In-place, O(log n) auxiliary stack space.
2. MergeSort:
   - Strategy: Divide into two equal halves and merge sorted halves.
   - Time Complexity: O(n log n) guaranteed in all cases (best, average, worst).
   - Space: Requires O(n) auxiliary memory for merging.`;
  }

  if (query.includes('deadlock') || query.includes('banker') || query.includes('coffman')) {
    return `Deadlock & Banker's Algorithm in Operating Systems:
1. Coffman's 4 Necessary Conditions:
   - Mutual Exclusion: Non-shareable resource.
   - Hold and Wait: Process holds one resource while waiting for another.
   - No Preemption: Resources cannot be forcibly taken away.
   - Circular Wait: A closed chain of processes waiting for each other.
2. Banker's Algorithm:
   - A Deadlock Avoidance algorithm developed by Edsger Dijkstra.
   - Simulates resource allocation to verify if system remains in a "Safe State" before granting any resource request.`;
  }

  if (query.includes('paging') || query.includes('virtual memory') || query.includes('belady') || query.includes('tlb') || query.includes('thrashing')) {
    return `Virtual Memory & Paging Essentials:
1. Paging: Divides physical memory into fixed-size "Frames" and logical memory into "Pages", eliminating external fragmentation.
2. TLB (Translation Lookaside Buffer): Fast hardware cache that caches virtual-to-physical address translations to avoid 2-memory-access penalties.
3. Belady's Anomaly: An anomaly in the FIFO page replacement algorithm where increasing the number of allocated page frames results in MORE page faults. Stack-based algorithms like LRU (Least Recently Used) never suffer from Belady's anomaly!
4. Thrashing: Occurs when high degree of multiprogramming causes processes to spend more time paging in/out than executing CPU instructions.`;
  }

  if (query.includes('semaphore') || query.includes('mutex') || query.includes('critical section')) {
    return `Process Synchronization & Semaphores:
1. Critical Section: Part of program code where shared memory or variables are accessed concurrently. Requires Mutual Exclusion, Progress, and Bounded Waiting.
2. Semaphore: An integer variable accessed only via two atomic operations:
   - wait(S) or P(S): Decrements S. Blocks if S <= 0.
   - signal(S) or V(S): Increments S. Unblocks waiting process.
3. Types:
   - Binary Semaphore (Mutex): Takes value 0 or 1.
   - Counting Semaphore: Takes unrestricted non-negative values to manage a finite pool of resources.`;
  }

  if (query.includes('normalization') || query.includes('bcnf') || query.includes('3nf') || query.includes('2nf') || query.includes('functional dependenc')) {
    return `DBMS Normalization Forms:
1. 1NF: All attribute values must be atomic (no multi-valued or composite attributes).
2. 2NF: Must be in 1NF + No Partial Dependency (no non-prime attribute depends on a proper subset of any candidate key).
3. 3NF: Must be in 2NF + No Transitive Dependency (for every FD X -> Y, X is a superkey OR Y is a prime attribute).
4. BCNF (Boyce-Codd Normal Form): Stricter than 3NF. For every non-trivial FD X -> Y, X MUST be a Superkey!`;
  }

  if (query.includes('acid') || query.includes('transaction') || query.includes('concurrency')) {
    return `DBMS ACID Properties:
1. A - Atomicity: Entire transaction completes or completely rolls back ("All or Nothing"). Managed by Recovery Management / Log component.
2. C - Consistency: Database integrity constraints are preserved before and after execution.
3. I - Isolation: Concurrent transactions execute independently without interference. Managed by Concurrency Control (e.g. 2-Phase Locking).
4. D - Durability: Once a transaction commits, its modifications persist permanently even across hardware crashes.`;
  }

  if (query.includes('b+ tree') || query.includes('indexing')) {
    return `B+ Tree Indexing in Databases:
1. Structure: Balanced multi-way search tree where all actual record pointers/data reside strictly in the Leaf Nodes.
2. Range Query Advantage: Leaf nodes are sequentially linked via a doubly linked list, enabling rapid range scans without tree traversals.
3. High Fanout: Large branching factor keeps the tree height shallow (typically 3 to 4 levels for millions of records), drastically minimizing disk I/O reads.`;
  }

  if (query.includes('osi') || query.includes('tcp/ip') || query.includes('tcp vs udp') || query.includes('layers')) {
    return `Computer Networks OSI & TCP/IP Model:
1. The 7 OSI Layers:
   - Layer 7: Application (HTTP, DNS, SMTP, FTP)
   - Layer 6: Presentation (Data formatting, SSL/TLS Encryption)
   - Layer 5: Session (Session establishment & checkpoints)
   - Layer 4: Transport (TCP, UDP - Port addressing, Flow & Error Control)
   - Layer 3: Network (IP, Routers, Logical Addressing, Routing)
   - Layer 2: Data Link (Ethernet, MAC addresses, Framing, Switches)
   - Layer 1: Physical (Bits, Cables, Electrical signals)
2. TCP vs UDP:
   - TCP: Connection-oriented, 3-way handshake (SYN, SYN-ACK, ACK), reliable delivery, flow control (sliding window), higher overhead.
   - UDP: Connectionless, lightweight, low-latency, no retransmissions (used in DNS, video streaming, VoIP).`;
  }

  if (query.includes('subnet') || query.includes('cidr') || query.includes('ip address')) {
    return `IPv4 Subnetting & CIDR Calculation:
1. Usable Hosts Formula: 2^(32 - Prefix) - 2.
   (Subtract 2 for Network ID and Broadcast Address).
2. Common CIDR Examples:
   - /24: 32 - 24 = 8 bits => 2^8 - 2 = 254 usable hosts (Mask: 255.255.255.0).
   - /26: 32 - 26 = 6 bits => 2^6 - 2 = 62 usable hosts (Mask: 255.255.255.192).
   - /28: 32 - 28 = 4 bits => 2^4 - 2 = 14 usable hosts (Mask: 255.255.255.240).`;
  }

  // 4. MATHEMATICS & QUANTITATIVE APTITUDE
  if (query.includes('eigenvalue') || query.includes('eigenvector') || query.includes('cayley-hamilton')) {
    return `Eigenvalues & Cayley-Hamilton Theorem:
1. Definition: For square matrix A, eigenvalues λ satisfy the characteristic equation det(A - λI) = 0.
2. Fundamental Properties:
   - Sum of eigenvalues = Trace of matrix A (sum of diagonal elements).
   - Product of eigenvalues = Determinant of matrix A.
   - For triangular matrices, eigenvalues are simply the principal diagonal elements.
3. Cayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation, i.e., p(A) = 0. Useful for calculating matrix inverses and higher powers!`;
  }

  if (query.includes('rank of a matrix') || query.includes('determinant')) {
    return `Matrix Rank & Determinants:
1. Rank of Matrix: The maximum number of linearly independent rows or columns.
2. Computation: Transform the matrix into Row Echelon Form using elementary row operations; the number of non-zero rows is the rank.
3. Properties:
   - An n x n matrix is invertible (non-singular) if and only if its rank = n (determinant ≠ 0).
   - For any matrix A(m x n), Rank(A) <= min(m, n).`;
  }

  if (query.includes('time and work') || query.includes('time & work')) {
    return `Time & Work Concepts & Formulas:
1. Formula: Total Work = Efficiency × Time.
2. LCM Method:
   - If Person A completes work in 12 days and Person B in 18 days:
   - Assume Total Work = LCM(12, 18) = 36 units.
   - Efficiency of A = 36/12 = 3 units/day.
   - Efficiency of B = 36/18 = 2 units/day.
   - Combined Efficiency = 3 + 2 = 5 units/day.
   - Days required together = 36 / 5 = 7.2 days.`;
  }

  if (query.includes('compound interest') || query.includes('simple interest')) {
    return `Interest Calculation Formulas:
1. Simple Interest: SI = (P × R × T) / 100.
2. Compound Interest: Amount A = P(1 + R/100)^T.
   CI = Amount - Principal = P[(1 + R/100)^T - 1].
3. High-Yield Exam Shortcut:
   Difference between CI and SI for 2 years = P × (R / 100)^2.`;
  }

  if (query.includes('speed') && (query.includes('distance') || query.includes('train'))) {
    return `Speed, Distance & Time Formulas:
1. Core Formula: Distance = Speed × Time.
2. Unit Conversion:
   - km/h to m/s: Multiply by 5/18 (e.g. 72 km/h = 72 × 5/18 = 20 m/s).
   - m/s to km/h: Multiply by 18/5.
3. Relative Speed:
   - Moving in Opposite directions: Speed = S1 + S2.
   - Moving in Same direction: Speed = |S1 - S2|.
4. Train crossing a platform: Total distance covered = Length of Train + Length of Platform.`;
  }

  // 5. INDIAN CONSTITUTION & POLITY
  if (query.includes('article 32') || query.includes('writ') || query.includes('heart and soul')) {
    return `Article 32 & Constitutional Writs:
1. Significance: Dr. B.R. Ambedkar termed Article 32 the "Heart and Soul of the Indian Constitution" because it guarantees the Right to Constitutional Remedies to enforce Fundamental Rights directly in the Supreme Court.
2. The 5 Prerogative Writs:
   - Habeas Corpus ("To have the body"): Releases a person unlawfully detained.
   - Mandamus ("We command"): Directs a public official to perform their statutory duty.
   - Prohibition: Issued by higher court to stop a lower court from exceeding jurisdiction.
   - Certiorari: Quashes an order already passed by an inferior court lacking jurisdiction.
   - Quo Warranto ("By what authority"): Inquires into the legality of a person's claim to a public office.`;
  }

  if (query.includes('fundamental right') || query.includes('article 21') || query.includes('article 14') || query.includes('article 19')) {
    return `Fundamental Rights in the Indian Constitution (Articles 12 - 35, Part III):
1. Right to Equality (Articles 14 - 18): Art 14 ensures equality before law; Art 17 abolishes untouchability.
2. Right to Freedom (Articles 19 - 22): Art 19 guarantees 6 freedoms; Art 21 guarantees Protection of Life and Personal Liberty; Art 21A guarantees Free Education (6-14 years).
3. Right against Exploitation (Articles 23 - 24): Prohibits human trafficking and child labor.
4. Right to Freedom of Religion (Articles 25 - 28).
5. Cultural & Educational Rights (Articles 29 - 30).
6. Right to Constitutional Remedies (Article 32).`;
  }

  if (query.includes('basic structure') || query.includes('kesavananda')) {
    return `The Basic Structure Doctrine:
1. Established in: Landmark 13-Judge Bench Supreme Court judgment in Kesavananda Bharati v. State of Kerala (24 April 1973).
2. Principle: Parliament has wide powers to amend the Constitution under Article 368, but it CANNOT alter, damage, or destroy the "Basic Structure" or essential framework.
3. Core Elements of Basic Structure: Supremacy of the Constitution, Republican & Democratic government, Secular character, Separation of Powers, Judicial Review, and Federalism.`;
  }

  if (query.includes('panchayati raj') || query.includes('73rd amendment') || query.includes('74th amendment')) {
    return `Panchayati Raj & Local Governments:
1. Constitutional Status: Granted by the 73rd and 74th Constitutional Amendment Acts, 1992.
2. 73rd Amendment: Inserted Part IX and 11th Schedule (29 functional subjects for rural local bodies).
3. 74th Amendment: Inserted Part IX-A and 12th Schedule (18 subjects for Municipalities).
4. Three-Tier Structure: Gram Panchayat (Village), Mandal/Block Samiti (Intermediate), and Zilla Parishad (District).`;
  }

  if (query.includes('emergency') || query.includes('article 356') || query.includes('article 352')) {
    return `Emergency Provisions in Indian Constitution (Part XVIII):
1. Article 352 (National Emergency): Declared on grounds of War, External Aggression, or Armed Rebellion (44th Amendment replaced "internal disturbance").
2. Article 356 (State Emergency / President's Rule): Imposed when the constitutional machinery in a state breaks down.
3. Article 360 (Financial Emergency): Imposed when financial stability or credit of India is threatened. Has NEVER been declared in Indian history.`;
  }

  // 6. HISTORY & ANDHRA PRADESH HISTORY
  if (query.includes('1857') || query.includes('sepoy mutiny') || query.includes('revolt')) {
    return `The 1857 Indian Revolt (First War of Independence):
1. Immediate Cause: Introduction of Enfield rifle with greased cartridges containing cow and pig fat, offending Hindu and Muslim sepoys.
2. Outbreak: Started on 29 March 1857 at Barrackpore by sepoy Mangal Pandey; spread to Meerut on 10 May 1857.
3. Key Leaders: Bahadur Shah Zafar (Delhi), Rani Lakshmibai (Jhansi), Nana Saheb (Kanpur), Kunwar Singh (Bihar), Begum Hazrat Mahal (Lucknow).
4. Outcome: Abolished English East India Company rule; Government of India Act 1858 transferred direct governance to the British Crown.`;
  }

  if (query.includes('potti sreeramulu') || query.includes('andhra state 1953') || query.includes('linguistic state')) {
    return `Amarajeevi Potti Sreeramulu & Formation of Andhra State:
1. The Struggle: Potti Sreeramulu undertook an epic 58-day fast-unto-death from 19 October to 15 December 1952 demanding a separate linguistic state for Telugu people.
2. Martyrdom: His sacrifice sparked massive movements across Andhra.
3. Formation: On 1 October 1953, Andhra State was carved out of Madras State as the FIRST linguistic state in independent India.
4. Capital & 1st CM: Kurnool was the capital; Andhra Kesari Tanguturi Prakasam Panthulu served as the first Chief Minister.`;
  }

  if (query.includes('satavahana') || query.includes('amaravati') || query.includes('dhanyakataka')) {
    return `The Satavahana Dynasty in Andhra:
1. Historical Significance: The first major empire of Andhra (circa 2nd Century BCE to 2nd Century CE).
2. Capitals: Kotilingala (initial) and Dhanyakataka (modern Amaravati in Guntur).
3. Greatest Ruler: Gautamiputra Satakarni (reign described in the famous Nasik inscription by his mother Gautami Balasri).
4. Contributions: Patronized Buddhism (Amaravati Maha Stupa), issued bilingual coins, and established flourishing maritime trade with Rome.`;
  }

  if (query.includes('vijayanagara') || query.includes('krishnadevaraya')) {
    return `Vijayanagara Empire & Sri Krishnadevaraya:
1. Founding: Established in 1336 on the banks of Tungabhadra by brothers Harihara I and Bukka Raya I.
2. Sri Krishnadevaraya (1509–1529 CE): The greatest ruler of the Tuluva dynasty.
3. Literary Masterpiece: Authored "Amuktamalyada" in Telugu, describing the life of Andal and setting statecraft principles.
4. Court: Patronized the "Ashtadiggajas" (8 great Telugu poets including Allasani Peddana and Tenali Ramakrishna).`;
  }

  if (query.includes('reorganisation act 2014') || query.includes('bifurcation') || query.includes('ap bifurcation')) {
    return `Andhra Pradesh Reorganisation Act, 2014:
1. Date: Appointed Day was 2 June 2014, bifurcating Andhra Pradesh into Telangana and residuary Andhra Pradesh.
2. Section 90: Declared the Polavaram Multipurpose Irrigation Project as a National Project funded by the Central Government.
3. Capital: Hyderabad served as shared capital for 10 years until 2024; Amaravati was designated the capital of residuary Andhra Pradesh.`;
  }

  // 7. ECONOMY & GEOGRAPHY
  if (query.includes('polavaram')) {
    return `Polavaram Irrigation Project (Indira Sagar):
1. Location: Built across the Godavari river in Andhra Pradesh.
2. National Status: Designated a National Project under Section 90 of the AP Reorganisation Act, 2014.
3. Key Benefits: Irrigates over 7.2 lakh acres, generates 960 MW of hydroelectric power, and diverts 80 TMC water to the Krishna basin to combat drought in Rayalaseema and delta areas.`;
  }

  if (query.includes('niti aayog') || query.includes('planning commission')) {
    return `NITI Aayog (National Institution for Transforming India):
1. Established: 1 January 2015 via Union Cabinet resolution, replacing the 65-year-old Planning Commission.
2. Structure: Chairperson is the Prime Minister of India. Includes a Governing Council with all State Chief Ministers.
3. Philosophy: Focuses on "Cooperative Federalism" and strategic policy think-tank recommendations rather than discretionary fund allocation.`;
  }

  if (query.includes('coastline') || query.includes('andhra pradesh geography')) {
    return `Geography & Coastline of Andhra Pradesh:
1. Coastline Length: Approximately 974 km along the Bay of Bengal, making it the SECOND longest coastline in mainland India (after Gujarat's 1,214 km).
2. Major Rivers: Godavari and Krishna flow through fertile delta plains.
3. Key Commercial Ports: Visakhapatnam (Major Port), Gangavaram, Kakinada Deep Water, Krishnapatnam, and Ramayapatnam Greenfield Port.`;
  }

  // 8. GENERAL SCIENCE & ISRO
  if (query.includes('newton') || query.includes('laws of motion')) {
    return `Newton's Three Laws of Motion:
1. First Law (Inertia): An object remains at rest or in uniform motion unless acted upon by an external net force.
2. Second Law (Force): Force equals mass times acceleration (F = dp/dt = m*a). Defines the measurement of force.
3. Third Law (Action-Reaction): For every action, there is an equal and opposite reaction (e.g. rocket propulsion).`;
  }

  if (query.includes('isro') || query.includes('sriharikota') || query.includes('space centre')) {
    return `ISRO & Satish Dhawan Space Centre (SDSC SHAR):
1. Location: Sriharikota barrier island in Tirupati district, Andhra Pradesh.
2. Primary Launchers: PSLV (Polar Satellite Launch Vehicle - "Workhorse of ISRO") and LVM3 / GSLV.
3. Historic Launches: Chandrayaan-1, 2, 3 (successful lunar south pole landing), Mangalyaan (Mars Orbiter), and Aditya-L1 solar observatory.`;
  }

  // 9. EXAM PATTERNS & ELIGIBILITY
  if (query.includes('gate') && (query.includes('pattern') || query.includes('syllabus') || query.includes('marks'))) {
    return `Official GATE Exam Pattern:
1. Total Questions: 65 Questions (100 Total Marks).
2. Duration: 3 Hours (180 Minutes) in Online CBT Mode.
3. Sections:
   - General Aptitude: 15 Marks (10 Questions).
   - Engineering Mathematics: 13 to 15 Marks.
   - Core Branch Subject Syllabus: 70 to 72 Marks.
4. Marking Scheme:
   - 1-Mark MCQs: 1/3 mark deducted for incorrect answer.
   - 2-Mark MCQs: 2/3 mark deducted for incorrect answer.
   - MSQs & NATs: ZERO negative marking!`;
  }

  if (query.includes('appsc') && (query.includes('group 2') || query.includes('group ii'))) {
    return `Official APPSC Group II Exam Pattern & Eligibility:
1. Eligibility: Any Bachelor's Degree from a recognized university. Age Limit: 18 to 42 Years (with relaxations for SC/ST/BC/EWS).
2. Prelims (Screening Test - 150 Marks):
   - Indian History (30 M), Geography (30 M), Indian Society (30 M), Current Affairs (30 M), Mental Ability (30 M).
3. Mains (300 Marks):
   - Paper 1: Social History of AP & Indian Constitution (150 Marks).
   - Paper 2: Indian and AP Economy & Science and Technology (150 Marks).
4. Negative Marking: 1/3rd mark deducted for wrong answers.`;
  }

  if (query.includes('ssc cgl') || query.includes('ssc')) {
    return `SSC CGL Exam Blueprint:
1. Tier 1 (Computer Based Test):
   - 100 Questions, 200 Marks (60 Minutes).
   - Sections: Quantitative Aptitude (25 Qs), Reasoning (25 Qs), English (25 Qs), General Awareness (25 Qs).
   - Negative Marking: 0.50 marks per wrong answer.
2. Tier 2:
   - Paper 1: Mathematical Abilities, Reasoning, English, General Awareness, Computer Knowledge Module, and Data Entry Speed Test.`;
  }

  // 10. Study Timetable & Routine
  if (query.includes('hours') || query.includes('study plan') || query.includes('routine') || query.includes('time table') || query.includes('schedule')) {
    return `Your High-Yield ${hours}-Hour Daily Study Blueprint, ${userName}:
1. Slot 1 (60 Mins) — Core Theory & Concept Mastery:
   Study high-weightage syllabus topics when cognitive retention is peak. Summarize rules in 1-page notes.
2. Slot 2 (60 Mins) — Timed Problem & PYQ Solving:
   Solve 25 to 30 past-year questions under strict timed conditions without looking at answers beforehand.
3. Slot 3 (30 Mins) — Speed Drills & General Aptitude:
   Practice calculation shortcuts, reasoning questions, or daily current affairs capsules.
4. Slot 4 (30 Mins) — Error Analysis & Short Notes Revision:
   Record every wrong answer in an error notebook and re-solve yesterday's mistakes. Consistency beats marathon cramming every time!`;
  }

  // 11. Telugu language request
  if (language === 'Telugu' || query.includes('telugu') || query.includes('ela prepare') || query.includes('cheyali')) {
    return `నమస్కారం ${userName}! పోటీ పరీక్షలలో విజయం సాధించడానికి ఇక్కడ ముఖ్యమైన సూచనలు:
1. మీ రోజువారీ సమయాన్ని 3 భాగాలుగా విభజించండి: సిలబస్ కాన్సెప్ట్స్, గత 15 సంవత్సరాల ప్రశ్నలు (PYQs), మరియు రివిజన్.
2. GATE లేదా APPSC గ్రూప్స్ ఏవైనా సరే, నెగటివ్ మార్కింగ్ తగ్గించుకోవడమే ప్రధాన వ్యూహం.
3. మీకు ఏ సబ్జెక్ట్ లేదా టాపిక్‌లో సందేహం ఉందో అడగండి, నేను వివరణాత్మకంగా సహాయం చేస్తాను!`;
  }

  // 12. Contextual Fallback for Specific Study Topics
  return `Regarding "${rawQuery}", ${userName}:
1. Conceptual Scope: In standard Indian competitive examinations (like ${profile.targetExamId || 'GATE/APPSC/SSC'}), this topic tests fundamental conceptual clarity, statutory accuracy, and analytical problem-solving.
2. Exam High-Yield Rule: Focus on understanding standard principles, formula derivations, and previous 10-year paper trends.
3. Next Step: Would you like a detailed breakdown, formula summary, or practice MCQ on this topic?`;
}
