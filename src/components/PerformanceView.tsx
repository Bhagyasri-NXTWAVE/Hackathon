import React from 'react';
import { BarChart3, Award, Flame, CheckCircle2, AlertTriangle, Sparkles, TrendingUp } from 'lucide-react';
import { StudentProfile } from '../types';

interface PerformanceViewProps {
  profile: StudentProfile;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({ profile }) => {
  const hasData = profile.quizzesTaken && profile.quizzesTaken > 0;
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-md text-white space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
          <BarChart3 className="w-3.5 h-3.5 text-blue-300" />
          <span>Student Analytics Dashboard</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Performance & Analytics
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm">
          Track overall preparation level, quiz performance history, subject strengths, and AI growth tips.
        </p>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Overall Prep Completion</span>
          <div className="text-3xl font-black text-slate-900">{hasData ? '68%' : '0%'}</div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full bg-emerald-600 rounded-full ${hasData ? 'w-[68%]' : 'w-0'}`} />
          </div>
          <p className="text-[10px] text-slate-500 pt-1">{hasData ? '+5% from last week' : 'Start studying to track progress'}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Average Quiz Accuracy</span>
          <div className="text-3xl font-black text-blue-600">{hasData ? '78%' : '0%'}</div>
          <p className="text-xs text-slate-600">Based on {profile.quizzesTaken || 0} practice quizzes</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Active Study Streak</span>
          <div className="text-3xl font-black text-rose-600 flex items-center gap-1">
            {hasData ? '7 Days 🔥' : '0 Days'}
          </div>
          <p className="text-xs text-slate-600">{hasData ? 'Consistently active' : 'Complete a task to start streak'}</p>
        </div>
      </div>

      {!hasData ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <Sparkles className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Performance Data Yet</h3>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">Take your first quiz or complete a study milestone to unlock AI-driven insights, strong/weak subject analysis, and growth guidance.</p>
        </div>
      ) : (
        <>
          {/* AI Subject Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strong Subjects */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Strong Subjects & Mastered Topics
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <span className="font-bold text-sm block">Database Management Systems (DBMS)</span>
                  <p className="text-[10px] text-emerald-700 mt-1">Accuracy: 88% • 4 Quizzes Completed</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <span className="font-bold text-sm block">General Aptitude & Mathematics</span>
                  <p className="text-[10px] text-emerald-700 mt-1">Accuracy: 82% • High speed calculations</p>
                </div>
              </div>
            </div>

            {/* Weak Subjects */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Areas Requiring Focus
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <span className="font-bold text-sm block">Operating Systems - Deadlocks & Synchronization</span>
                  <p className="text-[10px] text-amber-700 mt-1">Accuracy: 40% • Recommended: Review Semaphore PYQs</p>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  <span className="font-bold text-sm block">AP State Economy & Welfare Schemes</span>
                  <p className="text-[10px] text-rose-700 mt-1">APPSC Group II Mains specific topic revision required</p>
                </div>
              </div>
            </div>

          </div>

          {/* AI Mentor Insights */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50 border border-blue-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Competitive AI Growth Guidance</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              “Your DBMS and Aptitude performance is very strong! Dedicating 45 minutes of your daily {profile.dailyStudyHours || 3}-hour plan to Operating Systems deadlocks and AP Economy schemes will yield an estimated 15-20% overall score increase in upcoming full-length mock tests.”
            </p>
          </div>
        </>
      )}

    </div>
  );
};
