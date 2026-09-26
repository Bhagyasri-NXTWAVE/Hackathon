export type ExamCategory = 'central' | 'appsc' | 'banking' | 'defence' | 'engineering';

export interface Exam {
  id: string;
  title: string;
  category: ExamCategory;
  shortDescription: string;
  fullDescription: string;
  conductedBy: string;
  frequency: string;
  jobRoles: string[];
  responsibilities: string[];
  eligibility: {
    ageLimit: string;
    qualification: string;
    stream: string;
    stateCriteria?: string;
  };
  selectionProcess: string[];
  examPattern: {
    stages: string;
    duration: string;
    mode: string;
    negativeMarking: string;
  };
  subjects: string[];
  syllabusOverview: string[];
  preparationStrategy: string[];
  careerGrowth: string[];
  salaryRange: string;
  officialWebsite: string;
  upcomingNotificationDate: string;
  isAPPSCGroup?: boolean;
  groupType?: 'Group I' | 'Group II' | 'Group III' | 'Group IV';
}

export interface StudentProfile {
  name: string;
  age: number;
  gender?: string;
  state: string;
  education: string;
  degree: string;
  branch: string;
  currentYear: string;
  graduationStatus: 'Pursuing' | 'Graduated';
  interests: string[];
  strongSubjects: string[];
  weakSubjects: string[];
  technicalPreference: 'Technical' | 'Non-Technical' | 'Both';
  examPreference: 'Central' | 'State' | 'Both';
  preferredJobType: 'Government Desk' | 'Executive / Field' | 'Technical Engineering' | 'Public Sector Undertaking';
  dailyStudyHours: number;
  preparationExperience: 'Beginner' | 'Intermediate' | 'Advanced';
  targetExamId?: string;
  preferredLanguage: 'English' | 'Telugu' | 'Teluglish';
  quizzesTaken?: number;
}

export interface CareerRecommendation {
  examId: string;
  examTitle: string;
  matchPercentage: number;
  matchReason: string;
  eligibilityStatus: 'Likely Eligible' | 'Needs Verification' | 'Likely Not Eligible';
  difficultyLevel: 'High' | 'Moderate' | 'Very High';
  estimatedPrepDuration: string;
  careerGrowthPotential: string;
  nextRecommendedStep: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  duration: string;
  focusTopics: string[];
  recommendedResources: string[];
  keyMilestones: string[];
  status: 'completed' | 'in_progress' | 'upcoming';
}

export interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  completed: boolean;
  date: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export type NotificationType = 
  | 'exam_alert' 
  | 'deadline' 
  | 'admit_card' 
  | 'result' 
  | 'study_reminder' 
  | 'quiz_readiness';

export interface NotificationItem {
  id: string;
  type?: NotificationType;
  title: string;
  category: string;
  organization: string;
  releaseDate: string;
  applyLastDate?: string;
  vacancies?: string;
  link?: string;
  isDemo: boolean;
  tag: 'Latest' | 'Upcoming' | 'Closing Soon' | 'Admit Card' | 'Result' | 'Study Plan' | 'Quiz Alert';
  stateFocus: 'AP' | 'Central' | 'General';
  examId?: string;
  isRead?: boolean;
  isBookmarked?: boolean;
  actionView?: string;
  actionLabel?: string;
  timestamp?: string;
  message?: string;
}

export interface NotificationPreferences {
  examAlerts: boolean;
  deadlines: boolean;
  admitCardsAndResults: boolean;
  studyReminders: boolean;
  quizReadiness: boolean;
  soundEnabled: boolean;
  autoEmailAlerts: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isVoice?: boolean;
  language?: 'English' | 'Telugu' | 'Teluglish';
}

export interface PerformanceStats {
  overallPreparationPercent: number;
  quizzesTaken: number;
  averageScorePercent: number;
  studyStreakDays: number;
  completedTasksCount: number;
  strongSubjects: string[];
  weakSubjects: string[];
  weeklyHoursLogged: number[];
}
