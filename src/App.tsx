import React, { useState } from 'react';
import { LayoutDashboard, Compass, Sparkles, Bot, User as UserIcon } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { CareerFinderView } from './components/CareerFinderView';
import { ExamsExplorerView } from './components/ExamsExplorerView';
import { ExamDetailView } from './components/ExamDetailView';
import { CareerComparisonView } from './components/CareerComparisonView';
import { RoadmapView } from './components/RoadmapView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { AIChatbotView } from './components/AIChatbotView';
import { AIVoiceAgentModal } from './components/AIVoiceAgentModal';
import { QuizGeneratorView } from './components/QuizGeneratorView';
import { PerformanceView } from './components/PerformanceView';
import { NotificationsView } from './components/NotificationsView';
import { AdminPanelView } from './components/AdminPanelView';
import { EligibilityCheckerModal } from './components/EligibilityCheckerModal';
import { ToastNotification } from './components/ToastNotification';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ALL_EXAMS, DEMO_NOTIFICATIONS } from './data/examsData';
import { StudentProfile, NotificationItem, ChatMessage, NotificationPreferences } from './types';
import { 
  supabase, 
  saveUserProfile, 
  fetchUserProfile, 
  saveOnboarding, 
  saveQuizAttempt, 
  fetchQuizHistory 
} from './supabase';

export default function App() {
  const [activeView, setActiveView] = useState<string>('landing');
  const [selectedExamId, setSelectedExamId] = useState<string>(ALL_EXAMS[0].id);

  // Student Profile State
  const [profile, setProfile] = useState<StudentProfile>({
    name: '',
    age: 0,
    gender: '',
    state: '',
    education: '',
    branch: '',
    graduationStatus: '',
    technicalPreference: '',
    examPreference: '',
    dailyStudyHours: 0,
    preferredLanguage: 'English',
    targetExamId: '',
    quizzesTaken: 0
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Tracked Exam IDs
  const [trackedExamIds, setTrackedExamIds] = useState<string[]>([]);

  // Notification Preferences State
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    examAlerts: true,
    deadlines: true,
    admitCardsAndResults: true,
    studyReminders: true,
    quizReadiness: true,
    soundEnabled: true,
    autoEmailAlerts: true
  });

  // Active Toast Alert State
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  // Chat History State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am GovFlow AI, your personal exam & career mentor. Ask me anything about GATE, APPSC Groups I-IV, UPSC, SSC, RRB, Banking, or study planning!`,
      timestamp: 'Just now'
    }
  ]);

  // Sidebar & Auth State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  React.useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      const user = session?.user;
      if (user) {
        setCurrentUserId(user.id);
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Aspirant';
        setProfile(prev => ({ ...prev, name }));

        // Load profile & quiz history from Supabase
        fetchUserProfile(user.id).then(dbProf => {
          if (dbProf?.target_exam) {
            setProfile(prev => ({ ...prev, targetExamId: dbProf.target_exam || prev.targetExamId }));
            setTrackedExamIds(prev => prev.length === 0 ? [dbProf.target_exam!] : prev);
          }
        });

        fetchQuizHistory(user.id).then(attempts => {
          if (attempts.length > 0) {
            const avgAcc = Math.round(attempts.reduce((sum, a) => sum + (Number(a.accuracy) || 0), 0) / attempts.length);
            setProfile(prev => ({
              ...prev,
              quizzesTaken: attempts.length,
              averageAccuracy: avgAcc
            }));
          }
        });
      } else {
        setCurrentUserId(null);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      const user = session?.user;
      if (user) {
        setCurrentUserId(user.id);
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Aspirant';
        setProfile(prev => ({ ...prev, name }));

        fetchUserProfile(user.id).then(dbProf => {
          if (dbProf?.target_exam) {
            setProfile(prev => ({ ...prev, targetExamId: dbProf.target_exam || prev.targetExamId }));
            setTrackedExamIds(prev => prev.length === 0 ? [dbProf.target_exam!] : prev);
          }
        });
      } else {
        setCurrentUserId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn && activeView === 'landing') {
      setActiveView('dashboard');
    }
  }, [isLoggedIn, activeView]);

  // Modal States
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const selectedExam = ALL_EXAMS.find(e => e.id === selectedExamId) || ALL_EXAMS[0];

  const handleSelectExam = (examId: string) => {
    setSelectedExamId(examId);
    setProfile(prev => ({ ...prev, targetExamId: examId }));
    setActiveView('exam_detail');
    if (currentUserId) {
      saveUserProfile({ id: currentUserId, target_exam: examId });
    }
  };

  const handleToggleTrackExam = (examId: string) => {
    setTrackedExamIds(prev => {
      const isTracked = prev.includes(examId);
      const next = isTracked ? prev.filter(id => id !== examId) : [...prev, examId];
      
      const exam = ALL_EXAMS.find(e => e.id === examId);
      if (exam && !isTracked) {
        const newToast: NotificationItem = {
          id: 'toast-' + Date.now(),
          type: 'exam_alert',
          examId: exam.id,
          title: `📌 Now Tracking: ${exam.title}`,
          category: 'Tracked Exam Alert',
          organization: exam.conductedBy,
          releaseDate: 'Today',
          isDemo: true,
          tag: 'Latest',
          stateFocus: exam.category === 'appsc' ? 'AP' : 'Central',
          isRead: false,
          actionView: 'exam_detail',
          actionLabel: 'View Exam Details',
          message: `You will now receive real-time notifications for application deadlines, hall tickets, and results for ${exam.title}.`
        };
        setActiveToast(newToast);
      }
      return next;
    });
  };

  const handleTriggerSimulatedAlert = (customType?: string) => {
    const alertTypes = ['deadline', 'admit_card', 'result', 'study_reminder', 'quiz_readiness'];
    const chosenType = customType || alertTypes[Math.floor(Math.random() * alertTypes.length)];

    let title = '';
    let message = '';
    let actionView = 'notifications';
    let actionLabel = 'View Update';
    let tag: any = 'Latest';

    if (chosenType === 'deadline') {
      title = '🚨 APPSC Group II Application Deadline Closing Soon!';
      message = 'Online application portal for 897 Executive & Non-Executive posts closes in 3 days. Submit your documents today.';
      actionView = 'exam_detail';
      actionLabel = 'Check APPSC Portal';
      tag = 'Closing Soon';
    } else if (chosenType === 'admit_card') {
      title = '🎟️ GATE 2027 Hall Ticket Release Portal Live';
      message = 'IISc Bangalore has released official hall tickets for Computer Science & Engineering candidate logins.';
      actionView = 'exam_detail';
      actionLabel = 'Check GATE Portal';
      tag = 'Admit Card';
    } else if (chosenType === 'result') {
      title = '📊 SSC CGL Tier-1 Official Merit Cutoff Declared';
      message = 'Staff Selection Commission has announced category-wise cutoffs for Assistant Section Officer posts.';
      actionView = 'notifications';
      actionLabel = 'View Cutoff List';
      tag = 'Result';
    } else if (chosenType === 'study_reminder') {
      title = '⏰ Personalized Study Plan Reminder: DBMS & AP History';
      message = 'Time for your 2-hour scheduled study session! Focus today on Relational Algebra & AP Bifurcation Act.';
      actionView = 'planner';
      actionLabel = 'Open Study Planner';
      tag = 'Study Plan';
    } else if (chosenType === 'quiz_readiness') {
      title = '⚡ AI Quiz Readiness: Ready for a 5-Min Memory Recall?';
      message = 'You completed 3 Computer Science & Aptitude topics this week! AI generated a 5-question quick test to solidify memory.';
      actionView = 'quiz';
      actionLabel = 'Take Quiz Now';
      tag = 'Quiz Alert';
    }

    const newNotif: NotificationItem = {
      id: 'sim-' + Date.now(),
      type: chosenType as any,
      title,
      category: 'Real-time Live Alert',
      organization: 'GovFlow System',
      releaseDate: 'Just now',
      isDemo: true,
      tag,
      stateFocus: 'AP',
      isRead: false,
      actionView,
      actionLabel,
      message,
      timestamp: 'Just now'
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
  };

  const handleSyncChatMessage = (userText: string, aiText: string) => {
    setChatMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  const handleQuizCompleted = (results?: { score: number; totalMarks: number; correctCount: number; accuracy: number; examId?: string; subject?: string; totalQuestions?: number }) => {
    setProfile(prev => {
      const newQuizzesTaken = (prev.quizzesTaken || 0) + 1;
      const newAvgAcc = results?.accuracy !== undefined
        ? Math.round(((prev.averageAccuracy || 0) * (prev.quizzesTaken || 0) + results.accuracy) / newQuizzesTaken)
        : prev.averageAccuracy;
      const updated = {
        ...prev,
        quizzesTaken: newQuizzesTaken,
        averageAccuracy: newAvgAcc
      };
      localStorage.setItem('govflow_student_profile', JSON.stringify(updated));
      return updated;
    });

    if (currentUserId && results) {
      saveQuizAttempt({
        user_id: currentUserId,
        exam_id: results.examId || selectedExamId,
        subject: results.subject || 'All Subjects',
        score: results.correctCount,
        total_questions: results.totalQuestions || 10,
        accuracy: results.accuracy,
        answers_json: results
      });
    }
  };

  if (!isLoggedIn && activeView === 'landing') {
    return (
      <LandingPage
        onStartCareerFinder={() => setIsAuthModalOpen(true)}
        onExploreExams={() => setIsAuthModalOpen(true)}
        onOpenVoice={() => setIsAuthModalOpen(true)}
        onOpenChat={() => setIsAuthModalOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col">
      {isLoggedIn && profile.targetExamId === '' && (
        <OnboardingModal
          onSelectExam={(examId) => {
            setProfile(prev => ({ ...prev, targetExamId: examId }));
            setTrackedExamIds([examId]);
            setActiveView('dashboard');
            if (currentUserId) {
              saveUserProfile({ id: currentUserId, target_exam: examId });
              saveOnboarding({ user_id: currentUserId, knows_target_exam: true, target_exam_id: examId });
            }
          }}
          onDontKnow={() => {
            setProfile(prev => ({ ...prev, targetExamId: 'pending' }));
            setActiveView('career_finder');
            if (currentUserId) {
              saveOnboarding({ user_id: currentUserId, knows_target_exam: false });
            }
          }}
        />
      )}
      
      {/* Top Navbar */}
      <Navbar
        profile={profile}
        setProfile={setProfile}
        activeView={activeView}
        onNavigate={(view) => {
          if (!isLoggedIn && view !== 'landing') {
            setIsAuthModalOpen(true);
            return;
          }
          if (view === 'profile' || view === 'settings') {
            setIsProfileModalOpen(true);
          } else {
            setActiveView(view);
          }
        }}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenChat={() => setActiveView('chat')}
        notifications={notifications}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        isLoggedIn={isLoggedIn}
      />

      <div className="flex flex-1 relative pt-16">
        
        {/* Left Sidebar navigation */}
        <Sidebar
          currentView={activeView}
          onNavigate={(view) => {
            if (!isLoggedIn && view !== 'landing') {
              setIsAuthModalOpen(true);
              return;
            }
            if (view === 'profile' || view === 'settings') {
              setIsProfileModalOpen(true);
            } else {
              setActiveView(view);
            }
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpenVoice={() => setIsVoiceModalOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 lg:pl-64 pb-24 lg:pb-12">
          {activeView === 'landing' && (
            <LandingPage
              onStartCareerFinder={() => isLoggedIn ? setActiveView('career_finder') : setIsAuthModalOpen(true)}
              onExploreExams={() => isLoggedIn ? setActiveView('exam_explorer') : setIsAuthModalOpen(true)}
              onOpenVoice={() => isLoggedIn ? setIsVoiceModalOpen(true) : setIsAuthModalOpen(true)}
              onOpenChat={() => isLoggedIn ? setActiveView('chat') : setIsAuthModalOpen(true)}
            />
          )}

          {activeView === 'dashboard' && (
            <DashboardView
              profile={profile}
              notifications={notifications}
              onNavigate={setActiveView}
              onOpenVoice={() => setIsVoiceModalOpen(true)}
              onOpenChat={() => setActiveView('chat')}
            />
          )}

          {(activeView === 'career_finder' || activeView === 'career-finder' || activeView === 'profile') && (
            <CareerFinderView
              profile={profile}
              setProfile={setProfile}
              onSelectExam={handleSelectExam}
            />
          )}

          {(activeView === 'exam_explorer' || activeView === 'explore') && (
            <ExamsExplorerView
              onSelectExam={handleSelectExam}
              onCompareExams={() => setActiveView('compare')}
              trackedExamIds={trackedExamIds}
              onToggleTrackExam={handleToggleTrackExam}
            />
          )}

          {activeView === 'exam_detail' && (
            <ExamDetailView
              exam={selectedExam}
              profile={profile}
              onOpenEligibilityModal={() => setIsEligibilityModalOpen(true)}
              onCreateRoadmap={() => {
                setProfile(prev => ({ ...prev, targetExamId: selectedExam.id }));
                setActiveView('roadmap');
              }}
              onStartPlanner={() => setActiveView('planner')}
              onOpenChat={() => setActiveView('chat')}
              onBack={() => setActiveView('exam_explorer')}
            />
          )}

          {activeView === 'compare' && (
            <CareerComparisonView
              profile={profile}
              onSelectExam={handleSelectExam}
            />
          )}

          {activeView === 'roadmap' && (
            <RoadmapView
              profile={profile}
              setProfile={setProfile}
            />
          )}

          {activeView === 'planner' && (
            <StudyPlannerView
              profile={profile}
            />
          )}

          {activeView === 'chat' && (
            <AIChatbotView
              profile={profile}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              onOpenVoice={() => setIsVoiceModalOpen(true)}
            />
          )}

          {activeView === 'quiz' && (
            <QuizGeneratorView
              profile={profile}
              onQuizCompleted={handleQuizCompleted}
            />
          )}

          {activeView === 'performance' && (
            <PerformanceView
              profile={profile}
            />
          )}

          {activeView === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              setNotifications={setNotifications}
              trackedExamIds={trackedExamIds}
              onToggleTrackExam={handleToggleTrackExam}
              preferences={notificationPreferences}
              setPreferences={setNotificationPreferences}
              onTriggerSimulatedAlert={handleTriggerSimulatedAlert}
              onNavigate={setActiveView}
            />
          )}


          {activeView === 'admin' && (
            <AdminPanelView
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-around py-2 px-2 shadow-2xl lg:hidden">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-colors ${
            activeView === 'dashboard' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveView('exam_explorer')}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-colors ${
            activeView === 'exam_explorer' || activeView === 'explore' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Exams</span>
        </button>

        <button
          onClick={() => setActiveView('career_finder')}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-colors ${
            activeView === 'career_finder' || activeView === 'career-finder' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-[10px]">AI Career</span>
        </button>

        <button
          onClick={() => setActiveView('chat')}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-colors ${
            activeView === 'chat' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-5 h-5" />
          <span className="text-[10px]">Ask AI</span>
        </button>

        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="flex flex-col items-center gap-1 px-2 py-1 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>

      {/* Real-time Toast Banner */}
      <ToastNotification
        notification={activeToast}
        onClose={() => setActiveToast(null)}
        onNavigate={setActiveView}
      />

      {/* Modals */}
      <EligibilityCheckerModal
        examTitle={selectedExam.title}
        profile={profile}
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
      />

      <AIVoiceAgentModal
        profile={profile}
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSyncChatMessage={handleSyncChatMessage}
        chatMessages={chatMessages}
      />

      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        setProfile={setProfile}
        preferences={notificationPreferences}
        setPreferences={setNotificationPreferences}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(name) => {
          setIsLoggedIn(true);
          if (name) {
            setProfile(prev => ({ ...prev, name }));
          }
        }}
        profile={profile}
        setProfile={setProfile}
      />

    </div>
  );
}
