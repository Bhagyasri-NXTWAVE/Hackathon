import React from 'react';
import {
  Sparkles,
  Target,
  Calendar,
  Flame,
  Clock,
  Bot,
  Mic,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Bell,
  BookOpen,
  Award,
  BarChart2,
  Compass
} from 'lucide-react';
import { StudentProfile, NotificationItem } from '../types';

interface DashboardViewProps {
  profile: StudentProfile;
  notifications: NotificationItem[];
  onNavigate: (view: string) => void;
  onOpenVoice: () => void;
  onOpenChat: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  notifications,
  onNavigate,
  onOpenVoice,
  onOpenChat
}) => {
  const currentGoal = profile.targetExamId
    ? profile.targetExamId.toUpperCase().replace('-', ' ')
    : 'GATE CSE / APPSC Group II';

  const todayTasks: any[] = [];
  const hasData = profile.quizzesTaken && profile.quizzesTaken > 0;

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* Personalized Header & Quick Status */}
      <div className="bg-[#0F172A] border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-md text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Personalized AI Learning Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Good Morning, {profile.name || 'Student'} 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              {profile.education} ({profile.branch}) • State: {profile.state}
            </p>
          </div>

          {/* Prominent Quick Action AI Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenChat}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:scale-105"
            >
              <Bot className="w-4 h-4 text-blue-400" />
              <span>Ask Competitive AI</span>
            </button>

            <button
              onClick={onOpenVoice}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Mic className="w-4 h-4 text-cyan-200 animate-pulse" />
              <span>Talk to AI Voice Mentor</span>
            </button>
          </div>
        </div>

        {/* Top 4 Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-medium mb-1">
              <Target className="w-4 h-4" /> Current Goal
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">
              {currentGoal}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Target Exam</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium mb-1">
              <Award className="w-4 h-4" /> Prep Progress
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {hasData ? '68%' : '0%'}
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
              <div className={`h-full bg-emerald-400 rounded-full ${hasData ? 'w-[68%]' : 'w-0'}`} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-medium mb-1">
              <Clock className="w-4 h-4" /> Today’s Study
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              0 / {profile.dailyStudyHours || 3} hrs
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Daily Target</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-medium mb-1">
              <Flame className="w-4 h-4 text-rose-400" /> Study Streak
            </div>
            <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-1">
              {hasData ? '7 Days' : '0 Days'} {hasData && <span className="text-xs text-rose-400 font-normal">🔥</span>}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Consistency Streak</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Plan & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Today's Plan & Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Study Plan Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Today’s Study Plan
                </h2>
                <p className="text-xs text-slate-500">Generated by Competitive AI Study Planner</p>
              </div>
              <button
                onClick={() => onNavigate('planner')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                <span>Full Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {todayTasks.length === 0 ? (
                <div className="text-center p-4 text-slate-500 text-sm italic">
                  No tasks scheduled for today.
                </div>
              ) : (
                todayTasks.map((task, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                      task.completed
                        ? 'bg-slate-50 border-slate-200 text-slate-400'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          task.completed ? 'text-emerald-500' : 'text-slate-300'
                        }`}
                      />
                      <div>
                        <p className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {task.title}
                        </p>
                        <span className="text-[10px] text-slate-500">{task.time}</span>
                      </div>
                    </div>
                    {!task.completed && (
                      <button
                        onClick={() => onNavigate('planner')}
                        className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 text-xs font-semibold"
                      >
                        Start
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Recommendation Banner */}
          <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200/80 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  AI Mentor Recommendation
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {hasData ? 'Focus on AP Economy & High-Weightage DBMS' : 'Take your first quiz to unlock AI insights'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {hasData 
                    ? 'Based on your last quiz score (72%), reviewing AP State Welfare Schemes and Database Indexing will boost your upcoming test rank by an estimated 15%.'
                    : 'Your AI mentor needs data to analyze your strengths and weaknesses. Start by taking a practice quiz!'}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => onNavigate('quiz')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Take Practice Quiz
                  </button>
                  <button
                    onClick={() => onNavigate('roadmap')}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold"
                  >
                    View Roadmap
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Weak Topics + Notifications */}
        <div className="space-y-6">
          
          {/* Weak Topics Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Weak Subject Focus
            </h3>
            {!hasData ? (
              <div className="text-center p-4 text-slate-500 text-sm italic">
                No weak subjects identified yet.
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <p className="font-semibold text-amber-900">Operating Systems - Deadlocks</p>
                  <p className="text-[10px] text-amber-700 mt-0.5">Accuracy: 40% (2 incorrect answers in quiz)</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  <p className="font-semibold text-rose-900">AP Bifurcation Act Details</p>
                  <p className="text-[10px] text-rose-700 mt-0.5">Needs review for APPSC Group II Mains</p>
                </div>
              </div>
            )}
            <button
              onClick={() => onNavigate('performance')}
              className="w-full mt-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
            >
              Analyze All Strengths
            </button>
          </div>

          {/* Upcoming Notifications Preview */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                Latest Job Alerts
              </h3>
              <button
                onClick={() => onNavigate('notifications')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 3).map(notif => (
                <div
                  key={notif.id}
                  onClick={() => onNavigate('notifications')}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                >
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                    {notif.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span className="text-blue-600 font-medium">{notif.category}</span>
                    <span>Last Date: {notif.applyLastDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
