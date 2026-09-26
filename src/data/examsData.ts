import { Exam, NotificationItem } from '../types';

export const ALL_EXAMS: Exam[] = [
  {
    id: 'gate-cse',
    title: 'GATE (Graduate Aptitude Test in Engineering)',
    category: 'engineering',
    shortDescription: 'Gateway for M.Tech admissions in IITs/NITs and direct recruitment in premier PSUs like ONGC, IOCL, NTPC.',
    fullDescription: 'GATE is a national-level entrance examination conducted jointly by the IISc and seven IITs on behalf of the National Coordination Board (NCB)-GATE. High scores open opportunities for master degree programs and top engineering government posts in PSUs.',
    conductedBy: 'IITs & IISc Bangalore (Rotational)',
    frequency: 'Once a year (February)',
    jobRoles: ['Executive Engineer in PSUs', 'Scientist B (ISRO / DRDO)', 'Management Trainee', 'Research Associate'],
    responsibilities: ['Technical project design', 'Plant operations & maintenance', 'R&D in engineering technologies'],
    eligibility: {
      ageLimit: 'No Age Limit',
      qualification: 'B.E. / B.Tech / B.Arch / Master’s degree in Science/Computer Applications',
      stream: 'Engineering / Science / Computer Science',
      stateCriteria: 'Open to candidates across all Indian states and abroad.'
    },
    selectionProcess: ['Computer-Based Test (CBT)', 'GATE Scorecard Validity (3 Years)', 'PSU Interview / CCMT Counseling'],
    examPattern: {
      stages: 'Single Stage Computer Based Test (65 Questions, 100 Marks)',
      duration: '3 Hours',
      mode: 'Online CBT',
      negativeMarking: '1/3 mark for 1-mark MCQs, 2/3 mark for 2-mark MCQs (No negative for MSQs & NATs)'
    },
    subjects: ['General Aptitude', 'Engineering Mathematics', 'Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Theory of Computation', 'Compiler Design'],
    syllabusOverview: [
      'Engineering Mathematics: Linear Algebra, Calculus, Discrete Math, Probability',
      'Computer Science Core: Programming, Algorithms, Data Structures, Digital Logic',
      'Systems: Operating Systems, Computer Architecture, Database Systems, Computer Networks'
    ],
    preparationStrategy: [
      'Master core subjects concepts thoroughly before solving problems.',
      'Solve previous 15 years GATE question papers repeatedly.',
      'Take subject-wise tests and full-length mock tests under 3-hour timed conditions.'
    ],
    careerGrowth: ['Assistant Executive Engineer -> Executive Engineer -> General Manager / Director in PSUs'],
    salaryRange: '₹8,000,000 - ₹1,800,000 per annum + allowances (PSUs)',
    officialWebsite: 'https://gate2026.iisc.ac.in',
    upcomingNotificationDate: 'August / September 2026'
  },
  {
    id: 'appsc-group-2',
    title: 'APPSC Group II Services',
    category: 'appsc',
    isAPPSCGroup: true,
    groupType: 'Group II',
    shortDescription: 'Recruitment for non-gazetted & executive cadre state government posts in Andhra Pradesh.',
    fullDescription: 'Andhra Pradesh Public Service Commission (APPSC) Group II examination is one of the most popular state competitive exams offering administrative positions like Executive Officers, Sub-Registrars, Municipal Commissioners, and Assistant Section Officers in AP Government Departments.',
    conductedBy: 'Andhra Pradesh Public Service Commission (APPSC)',
    frequency: 'As per State Government Recruitment Vacancy Notifications',
    jobRoles: ['Executive Officer Grade-III', 'Sub-Registrar Grade-II', 'Deputy Tahsildar', 'Assistant Commercial Tax Officer (ACTO)', 'Assistant Section Officer (ASO in AP Secretariat)', 'Senior Accountant'],
    responsibilities: ['State administration and revenue collection', 'Implementation of state welfare schemes in AP', 'District and Mandal level public service management'],
    eligibility: {
      ageLimit: '18 to 42 Years (Age relaxation applies for SC/ST/BC/EWS/Ex-Servicemen as per AP Govt rules)',
      qualification: 'Bachelor’s Degree in any discipline from a recognized University in India',
      stream: 'Any Bachelor Degree (BA / B.Sc / B.Com / B.Tech / BBA)',
      stateCriteria: 'Candidates claiming local status of Andhra Pradesh get reservation benefits.'
    },
    selectionProcess: ['Preliminary Examination (Screening Test)', 'Mains Examination (2 Papers)', 'Computer Proficiency Test (CPT)', 'Document Verification'],
    examPattern: {
      stages: 'Prelims (150 Marks) + Mains (300 Marks: Paper 1 & Paper 2)',
      duration: '150 Minutes per paper',
      mode: 'Objective Offline OMR / Online CBT',
      negativeMarking: '1/3rd mark deducted for each wrong answer'
    },
    subjects: ['AP Economy & Indian Economy', 'AP History & Social Structure', 'Indian Constitution & Polity', 'General Studies & Mental Ability', 'Current Affairs (National & AP)'],
    syllabusOverview: [
      'Prelims: Indian History, Geography, Indian Society, Current Affairs, Mental Ability',
      'Mains Paper 1: Social and Cultural History of Andhra Pradesh & Indian Constitution',
      'Mains Paper 2: Indian and AP Economy, Science and Technology'
    ],
    preparationStrategy: [
      'Thoroughly study AP State Board Textbooks and Telugu Academy books for AP History & Economy.',
      'Stay updated with Andhra Pradesh State Budget, Economic Survey, and Navaratnalu / welfare schemes.',
      'Practice regular daily MCQs and weekly APPSC prelims mock tests.'
    ],
    careerGrowth: ['Assistant Section Officer -> Section Officer -> Deputy Secretary -> Joint Secretary in AP Secretariat'],
    salaryRange: '₹35,800 - ₹1,07,210 (Scale of Pay as per PRC) + HRA & DA',
    officialWebsite: 'https://psc.ap.gov.in',
    upcomingNotificationDate: 'Expected Late 2026 / Early 2027'
  },
  {
    id: 'appsc-group-1',
    title: 'APPSC Group I Services',
    category: 'appsc',
    isAPPSCGroup: true,
    groupType: 'Group I',
    shortDescription: 'Highest administrative cadre civil service posts in Andhra Pradesh state government.',
    fullDescription: 'APPSC Group I is the premier state civil services exam in Andhra Pradesh. Successful candidates are appointed directly as Deputy Collectors, Deputy Superintendent of Police (DSP), Commercial Tax Officers, and District Registrar positions.',
    conductedBy: 'Andhra Pradesh Public Service Commission (APPSC)',
    frequency: 'Periodical state vacancy notification',
    jobRoles: ['Deputy Collector (Civil Services)', 'Deputy Superintendent of Police (DSP)', 'Commercial Tax Officer (CTO)', 'District Registrar', 'Regional Transport Officer (RTO)', 'District Panchayat Officer (DPO)'],
    responsibilities: ['Law and order maintenance', 'District level administrative leadership', 'Revenue collection and policy implementation'],
    eligibility: {
      ageLimit: '18 to 42 Years (DSP age limit: 21 to 30 years)',
      qualification: 'Graduate degree from any recognized university in India',
      stream: 'Any Graduation discipline',
      stateCriteria: 'Both local AP candidates and non-local candidates eligible (reservation for AP locals).'
    },
    selectionProcess: ['Screening Test (Prelims - 2 Papers)', 'Written Main Examination (Descriptive - 5 Papers)', 'Personality Test / Oral Interview'],
    examPattern: {
      stages: 'Prelims (240 Marks) -> Mains (Descriptive 750 Marks) -> Interview (75 Marks)',
      duration: '150 Minutes per prelims paper; 180 minutes per mains paper',
      mode: 'Prelims CBT/OMR + Mains Descriptive Pen & Paper',
      negativeMarking: '1/3rd negative marking in Prelims screening test'
    },
    subjects: ['General Studies', 'AP & Indian History', 'Polity & Governance', 'Indian & AP Economy', 'Science & Technology', 'Data Interpretation', 'Ethics & Aptitude'],
    syllabusOverview: [
      'Paper 1: History, Culture, Geography of India & Andhra Pradesh',
      'Paper 2: Indian Constitution, Polity, Governance & Law',
      'Paper 3: Indian & AP Economy, Planning & Development',
      'Paper 4: Science, Technology & Environmental Issues',
      'Paper 5: Data Interpretation & Problem Solving Skills'
    ],
    preparationStrategy: [
      'Focus heavily on answer writing skills for descriptive Mains papers in English/Telugu.',
      'Master AP specific issues: Bifurcation Act, Polavaram project, Amaravati development, AP Economy.',
      'Maintain daily revision notes for current national and AP state developments.'
    ],
    careerGrowth: ['Deputy Collector -> Joint Collector -> Collector & District Magistrate (IAS Conferment)'],
    salaryRange: '₹54,060 - ₹1,40,540 basic pay + allowances (Group-1 Officers)',
    officialWebsite: 'https://psc.ap.gov.in',
    upcomingNotificationDate: 'Notification expected annually as per job calendar'
  },
  {
    id: 'upsc-cse',
    title: 'UPSC Civil Services Examination (IAS / IPS / IFS)',
    category: 'central',
    shortDescription: 'India’s premier competitive exam for administrative, police, and foreign civil services.',
    fullDescription: 'Conducted annually by the Union Public Service Commission, the Civil Services Examination recruits officers for prestigious All India Services (IAS, IPS) and Central Services (IFS, IRS, IAAS).',
    conductedBy: 'Union Public Service Commission (UPSC)',
    frequency: 'Annual (May/June Prelims, Sept Mains)',
    jobRoles: ['Indian Administrative Service (IAS)', 'Indian Police Service (IPS)', 'Indian Foreign Service (IFS)', 'Indian Revenue Service (IRS)'],
    responsibilities: ['Policy formulation at Union & State level', 'District administration & law enforcement', 'Diplomatic representation overseas'],
    eligibility: {
      ageLimit: '21 to 32 Years for General (Relaxations: OBC - 3 years, SC/ST - 5 years)',
      qualification: 'Graduate in any discipline from a recognized university',
      stream: 'Any Stream',
      stateCriteria: 'Indian Citizen (All States)'
    },
    selectionProcess: ['Preliminary Exam (Objective)', 'Main Exam (Descriptive 9 Papers)', 'Personality Test / Interview'],
    examPattern: {
      stages: 'Prelims (400 Marks) -> Mains (1750 Marks) -> Interview (275 Marks)',
      duration: '2 Hours per Prelims paper',
      mode: 'Offline Pen & Paper OMR for Prelims',
      negativeMarking: '1/3rd mark for wrong answers in CSAT & GS Prelims'
    },
    subjects: ['History', 'Polity', 'Geography', 'Economy', 'Environment & Ecology', 'International Relations', 'Ethics', 'Optional Subject'],
    syllabusOverview: [
      'GS Paper I: Indian Heritage, History, Geography & Society',
      'GS Paper II: Governance, Constitution, Polity, Social Justice & IR',
      'GS Paper III: Technology, Economic Development, Biodiversity, Environment, Security & Disaster Management',
      'GS Paper IV: Ethics, Integrity and Aptitude'
    ],
    preparationStrategy: [
      'Read NCERT textbooks (Class 6 to 12) for foundational conceptual clarity.',
      'Follow standard sources like M. Laxmikanth for Polity, Ramesh Singh for Economy.',
      'Practice answer writing daily and analyze Hindu/Indian Express editorials.'
    ],
    careerGrowth: ['Assistant Collector -> District Magistrate -> Divisional Commissioner -> Cabinet Secretary of India'],
    salaryRange: '₹56,100 - ₹2,50,000 per month + apex government perks & official residence',
    officialWebsite: 'https://upsc.gov.in',
    upcomingNotificationDate: 'February 2027'
  },
  {
    id: 'ssc-cgl',
    title: 'SSC CGL (Combined Graduate Level)',
    category: 'central',
    shortDescription: 'National exam for Group B & C posts in central Ministries, Departments & Inspectorates.',
    fullDescription: 'Staff Selection Commission CGL offers non-technical executive roles like Income Tax Inspector, Assistant Section Officer in MEA/IB, GST Inspector, and Assistant Audit Officer across central government bodies.',
    conductedBy: 'Staff Selection Commission (SSC)',
    frequency: 'Annual',
    jobRoles: ['Income Tax Inspector', 'Central Excise / GST Inspector', 'Assistant Section Officer (MEA / CSS)', 'Assistant Enforcement Officer (ED)', 'Sub-Inspector (CBI)'],
    responsibilities: ['Tax assessment & anti-evasion operations', 'Ministry desk policy work', 'Audit and financial review'],
    eligibility: {
      ageLimit: '18 to 30/32 Years depending on specific post',
      qualification: 'Bachelor’s Degree in any discipline',
      stream: 'Any Stream',
      stateCriteria: 'All India Eligibility'
    },
    selectionProcess: ['Tier-I Computer Based Examination', 'Tier-II Computer Based Examination + Data Entry Speed Test (DEST)', 'Document Verification'],
    examPattern: {
      stages: 'Tier I (200 Marks) -> Tier II (Mathematical Abilities, Reasoning, English, General Awareness, Computer Test)',
      duration: '60 minutes for Tier I',
      mode: 'Online CBT',
      negativeMarking: '0.50 marks deducted per wrong answer in Tier I'
    },
    subjects: ['Quantitative Aptitude', 'Reasoning & General Intelligence', 'English Comprehension', 'General Awareness', 'Computer Knowledge'],
    syllabusOverview: [
      'Quantitative Aptitude: Arithmetic, Algebra, Geometry, Trigonometry, Mensuration',
      'Reasoning: Verbal & Non-verbal logic, Puzzles, Coding-Decoding',
      'English: Grammar, Vocabulary, Reading Comprehension, Error Spotting'
    ],
    preparationStrategy: [
      'Speed and accuracy in Quantitative Aptitude and English are paramount.',
      'Memorize short tricks and formulas for fast calculations in Tier II.',
      'Attempt 50+ mock tests before the actual examination.'
    ],
    careerGrowth: ['Inspector -> Superintendent -> Assistant Commissioner of Central Tax / Income Tax'],
    salaryRange: '₹35,400 - ₹1,42,400 (Pay Level 6 to Level 8 as per 7th CPC)',
    officialWebsite: 'https://ssc.gov.in',
    upcomingNotificationDate: 'June / July 2026'
  },
  {
    id: 'rrb-ntpc',
    title: 'RRB NTPC (Non-Technical Popular Categories)',
    category: 'central',
    shortDescription: 'Railway recruitment for Station Master, Goods Guard, Commercial Apprentice, and Traffic Assistant.',
    fullDescription: 'Railway Recruitment Control Board conducts NTPC exam to fill graduate and undergraduate level administrative and operational positions in Indian Railways zones across India.',
    conductedBy: 'Railway Recruitment Boards (RRBs)',
    frequency: 'Periodic Recruitment Drives',
    jobRoles: ['Station Master', 'Goods Train Manager (Goods Guard)', 'Commercial Apprentice', 'Senior Clerk cum Typist', 'Junior Accounts Assistant'],
    responsibilities: ['Train operations & station management', 'Freight logistics management', 'Railway ticket & commercial operations'],
    eligibility: {
      ageLimit: '18 to 33 Years (Graduate Posts) / 18 to 30 Years (Undergraduate Posts)',
      qualification: '12th Pass (Undergraduate posts) or Degree in any stream (Graduate posts)',
      stream: 'Any Stream',
      stateCriteria: 'All India Candidates can apply to regional RRBs (e.g. RRB Secunderabad, RRB Vijayawada)'
    },
    selectionProcess: ['1st Stage CBT', '2nd Stage CBT', 'Computer Based Aptitude Test (CBAT for Station Master) / Typing Skill Test', 'Document Verification & Medical Exam'],
    examPattern: {
      stages: 'CBT 1 (100 Questions) -> CBT 2 (120 Questions) -> CBAT / Skill Test',
      duration: '90 Minutes per stage',
      mode: 'Online CBT in multiple regional languages including Telugu',
      negativeMarking: '1/3rd mark for wrong answers'
    },
    subjects: ['General Awareness', 'Mathematics / Numerical Ability', 'General Intelligence & Reasoning'],
    syllabusOverview: [
      'General Awareness: Current Events, Indian History, Science, Geography, Railway Facts',
      'Mathematics: Number System, BODMAS, Decimals, Fractions, LCM, HCF, Ratio, Percentage',
      'Reasoning: Analogies, Syllogism, Venn Diagrams, Mathematical Operations'
    ],
    preparationStrategy: [
      'Master basic Class 10 Science (Physics, Chemistry, Biology) and Railway History.',
      'Solve previous RRB Secunderabad question papers available in Telugu / English.',
      'Practice mental math to improve speed for 90-minute 120-question CBT 2.'
    ],
    careerGrowth: ['Station Master -> Assistant Traffic Manager -> Divisional Traffic Manager in Railways'],
    salaryRange: '₹29,200 - ₹92,300 + Railway Pass, Running Allowance & Medical perks',
    officialWebsite: 'https://rrbsecunderabad.gov.in',
    upcomingNotificationDate: 'Periodic announcement by Railway Ministry'
  },
  {
    id: 'ibps-po',
    title: 'IBPS PO / SBI PO (Probationary Officer)',
    category: 'banking',
    shortDescription: 'Officer level management career in Public Sector Banks across India.',
    fullDescription: 'Institute of Banking Personnel Selection (IBPS) and State Bank of India (SBI) conduct annual national entrance exams for selecting Probationary Officers in nationalized public sector banks.',
    conductedBy: 'IBPS & State Bank of India',
    frequency: 'Annual (August - October)',
    jobRoles: ['Probationary Officer (Assistant Manager)', 'Branch Operations Manager', 'Credit Analyst', 'Loan Officer'],
    responsibilities: ['Retail banking operations & credit appraisal', 'Customer relationship management', 'Branch treasury & loan sanctions'],
    eligibility: {
      ageLimit: '20 to 30 Years',
      qualification: 'Graduate in any discipline from a recognized University',
      stream: 'Any Stream',
      stateCriteria: 'All India Eligibility'
    },
    selectionProcess: ['Preliminary Examination', 'Main Examination + Descriptive Test', 'Psychometric Test & Group Exercise / Interview'],
    examPattern: {
      stages: 'Prelims (100 Marks, 1 Hour) -> Mains (200 Marks + 25 Marks Descriptive) -> Interview',
      duration: '60 minutes Prelims (Sectional Timing)',
      mode: 'Online CBT',
      negativeMarking: '0.25 marks deducted for wrong answers'
    },
    subjects: ['Reasoning Ability & Computer Aptitude', 'Quantitative Aptitude / Data Interpretation', 'English Language', 'General / Economy / Banking Awareness'],
    syllabusOverview: [
      'Data Analysis & Interpretation: Pie charts, Bar graphs, Caselets, Missing DI',
      'Reasoning: Complex Puzzles, Seating Arrangements, Input-Output, Critical Reasoning',
      'Banking Awareness: RBI Policies, Monetary Terms, Fintech, Current Financial News'
    ],
    preparationStrategy: [
      'Focus intensely on High-Level Puzzles and Data Interpretation caselets.',
      'Read financial newspapers like Business Standard or Economic Times daily.',
      'Practice sectional timing management in mock tests.'
    ],
    careerGrowth: ['Probationary Officer -> Scale II Manager -> Chief Manager -> Assistant General Manager -> Director/MD'],
    salaryRange: '₹52,000 - ₹68,000 starting gross monthly salary + leased accommodation',
    officialWebsite: 'https://ibps.in',
    upcomingNotificationDate: 'August 2026'
  },
  {
    id: 'appsc-group-3',
    title: 'APPSC Group III (Panchayat Secretary)',
    category: 'appsc',
    isAPPSCGroup: true,
    groupType: 'Group III',
    shortDescription: 'Rural development administrative positions in Andhra Pradesh Panchayat Raj department.',
    fullDescription: 'Panchayat Secretary posts under APPSC Group III drive grass-roots governance, rural infrastructure development, and welfare distribution across Gram Panchayats in Andhra Pradesh.',
    conductedBy: 'Andhra Pradesh Public Service Commission (APPSC)',
    frequency: 'As per State Vacancies',
    jobRoles: ['Panchayat Secretary Grade-IV', 'Executive Officer Rural Development'],
    responsibilities: ['Gram Sabha administration & revenue collection', 'Implementation of MGNREGS & rural welfare schemes', 'Sanitation and local infrastructure in villages'],
    eligibility: {
      ageLimit: '18 to 42 Years',
      qualification: 'Degree from any recognized University',
      stream: 'Any Stream',
      stateCriteria: 'Local status of AP district considered'
    },
    selectionProcess: ['Screening Test (Prelims)', 'Main Examination', 'Document Verification'],
    examPattern: {
      stages: 'Prelims (150 Marks) -> Mains (300 Marks)',
      duration: '150 Minutes',
      mode: 'Objective OMR / Online CBT',
      negativeMarking: '1/3rd negative marking'
    },
    subjects: ['General Studies & Mental Ability', 'Rural Development & Problems in Rural AP', 'Evolution of Panchayat Raj System in India & AP'],
    syllabusOverview: [
      'Paper 1: General Studies, Current Affairs, Mental Ability',
      'Paper 2: Rural Development, AP Government Schemes, 73rd Constitutional Amendment, Panchayat Raj Act'
    ],
    preparationStrategy: [
      'Master the 73rd Constitutional Amendment and AP Panchayat Raj Act 1994.',
      'Thoroughly study AP Rural Welfare schemes (YSR Rythu Bharosa, Jagananna schemes context).',
      'Practice regional AP geography and rural economy questions.'
    ],
    careerGrowth: ['Panchayat Secretary Grade IV -> Grade I -> Divisional Panchayat Officer'],
    salaryRange: '₹25,220 - ₹80,910 pay scale + rural allowances',
    officialWebsite: 'https://psc.ap.gov.in',
    upcomingNotificationDate: 'Expected State Job Calendar Announcement'
  },
  {
    id: 'appsc-group-4',
    title: 'APPSC Group IV (Junior Assistant cum Computer Assistant)',
    category: 'appsc',
    isAPPSCGroup: true,
    groupType: 'Group IV',
    shortDescription: 'Ministerial administrative and computer assistant clerical positions in AP Government.',
    fullDescription: 'APPSC Group IV recruits Junior Assistants in Revenue, Endowment, and Ministerial departments across AP districts. Requires basic computer efficiency.',
    conductedBy: 'APPSC',
    frequency: 'State District Recruitment Drives',
    jobRoles: ['Junior Assistant cum Computer Assistant', 'Executive Officer Grade-IV (Endowments)'],
    responsibilities: ['Office file maintenance & digital data entry', 'Public service desk management', 'Departmental records upkeep'],
    eligibility: {
      ageLimit: '18 to 42 Years',
      qualification: 'Bachelor’s Degree + Computer Proficiency',
      stream: 'Any Graduate',
      stateCriteria: 'District-wise local reservation applies'
    },
    selectionProcess: ['Screening Test', 'Mains Exam', 'Computer Proficiency Test (CPT)'],
    examPattern: {
      stages: 'Prelims (150 Marks) -> Mains (300 Marks: GS & Telugu/English)',
      duration: '150 Minutes',
      mode: 'Objective OMR / CBT',
      negativeMarking: '1/3rd mark deduction'
    },
    subjects: ['General Studies', 'General English', 'General Telugu', 'Basic Computer Skills'],
    syllabusOverview: [
      'General Studies: General Science, Current Affairs, History of AP & India',
      'Secretarial Abilities: Basic Grammar in English & Telugu, Sentence Correction, Comprehension'
    ],
    preparationStrategy: [
      'Focus on Telugu and English language fundamentals alongside General Studies.',
      'Prepare MS Office, Internet Basics, and Typing for CPT practical test.'
    ],
    careerGrowth: ['Junior Assistant -> Senior Assistant -> Superintendent -> Assistant Secretary'],
    salaryRange: '₹22,460 - ₹72,850 pay scale + government allowances',
    officialWebsite: 'https://psc.ap.gov.in',
    upcomingNotificationDate: 'District Wise Vacancy Release'
  }
];

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'exam_alert',
    examId: 'appsc-group-2',
    title: 'APPSC Group II Services Official Notification Released',
    category: 'AP State Government',
    organization: 'Andhra Pradesh Public Service Commission (APPSC)',
    releaseDate: '2026-08-07',
    applyLastDate: '2026-08-30',
    vacancies: '897 Executive & Non-Executive Posts',
    link: 'https://psc.ap.gov.in',
    isDemo: true,
    tag: 'Latest',
    stateFocus: 'AP',
    isRead: false,
    actionView: 'exam_detail',
    actionLabel: 'View Exam Details',
    timestamp: '10 mins ago',
    message: 'Official notification published. Check eligibility and start your preparation roadmap now!'
  },
  {
    id: 'notif-sr1',
    type: 'study_reminder',
    examId: 'appsc-group-2',
    title: '⏰ Daily Study Plan Reminder: AP History & Polity',
    category: 'Personalized Study Plan',
    organization: 'Competitive AI Study Engine',
    releaseDate: '2026-08-08',
    isDemo: true,
    tag: 'Study Plan',
    stateFocus: 'General',
    isRead: false,
    actionView: 'planner',
    actionLabel: 'Open Study Planner',
    timestamp: '25 mins ago',
    message: 'Today’s scheduled session: 90 mins on AP History Socio-Cultural movements & Indian Constitution articles.'
  },
  {
    id: 'notif-qr1',
    type: 'quiz_readiness',
    examId: 'gate-cse',
    title: '⚡ Quiz Readiness Alert: Test your Data Structures & Operating Systems recall!',
    category: 'AI Practice Challenge',
    organization: 'Competitive World Quiz Engine',
    releaseDate: '2026-08-08',
    isDemo: true,
    tag: 'Quiz Alert',
    stateFocus: 'General',
    isRead: false,
    actionView: 'quiz',
    actionLabel: 'Take 5-Min Quiz',
    timestamp: '1 hour ago',
    message: 'You completed 3 core topics this week! AI generated a 5-question quick quiz to test your memory retainment.'
  },
  {
    id: 'notif-2',
    type: 'deadline',
    examId: 'gate-cse',
    title: 'GATE 2027 Registration Portal Opening Announcement',
    category: 'National / Engineering',
    organization: 'IISc Bangalore / National GATE Board',
    releaseDate: '2026-08-01',
    applyLastDate: '2026-09-28',
    vacancies: 'M.Tech Seats & PSU Recruitment 2027',
    link: 'https://gate2026.iisc.ac.in',
    isDemo: true,
    tag: 'Upcoming',
    stateFocus: 'Central',
    isRead: true,
    actionView: 'exam_detail',
    actionLabel: 'View GATE Details',
    timestamp: 'Yesterday'
  },
  {
    id: 'notif-3',
    type: 'admit_card',
    examId: 'ssc-cgl',
    title: 'SSC CGL Tier-II Examination Hall Ticket Released',
    category: 'Central Government',
    organization: 'Staff Selection Commission (SSC)',
    releaseDate: '2026-08-05',
    applyLastDate: '2026-08-20',
    vacancies: '17,727 Posts',
    link: 'https://ssc.gov.in',
    isDemo: true,
    tag: 'Admit Card',
    stateFocus: 'Central',
    isRead: true,
    actionView: 'exam_detail',
    actionLabel: 'Check Hall Ticket Portal',
    timestamp: '2 days ago'
  },
  {
    id: 'notif-4',
    type: 'result',
    examId: 'rrb-ntpc',
    title: 'RRB NTPC CBT-1 Merit List & Cutoff Marks Declared',
    category: 'Railways',
    organization: 'Railway Recruitment Board (RRB Secunderabad)',
    releaseDate: '2026-08-02',
    applyLastDate: '2026-08-15',
    vacancies: '11,558 Posts',
    link: 'https://rrbsecunderabad.gov.in',
    isDemo: true,
    tag: 'Result',
    stateFocus: 'AP',
    isRead: true,
    actionView: 'notifications',
    actionLabel: 'View Results',
    timestamp: '3 days ago'
  },
  {
    id: 'notif-5',
    type: 'deadline',
    title: 'IBPS PO Application Closing in 4 Days',
    category: 'Banking',
    organization: 'Institute of Banking Personnel Selection',
    releaseDate: '2026-07-20',
    applyLastDate: '2026-08-12',
    vacancies: '4,455 PO Vacancies',
    link: 'https://ibps.in',
    isDemo: true,
    tag: 'Closing Soon',
    stateFocus: 'General',
    isRead: true,
    actionView: 'notifications',
    actionLabel: 'Apply Now Link',
    timestamp: '4 days ago'
  }
];
