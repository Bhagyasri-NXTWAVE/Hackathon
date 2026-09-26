import React, { useState } from 'react';
import NeonBorder from './NeonBorder';
import { signInWithGoogle } from '../supabase';
import { X, Compass, BookOpen, Map, ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStartCareerFinder: () => void;
  onExploreExams: () => void;
  onOpenVoice: () => void;
  onOpenChat: () => void;
}

const SAMPLE_EXAMS = [
  { title: 'GATE CSE 2027', org: 'IISc Bangalore', date: 'Feb 2027', tag: 'Central', color: 'blue' },
  { title: 'APPSC Group II', org: 'APPSC Amaravati', date: 'Mar 2027', tag: 'AP State', color: 'emerald' },
  { title: 'SSC CGL 2027', org: 'Staff Selection Commission', date: 'Apr 2027', tag: 'Central', color: 'purple' },
  { title: 'UPSC Civil Services', org: 'UPSC New Delhi', date: 'May 2027', tag: 'Central', color: 'amber' },
  { title: 'RRB NTPC 2027', org: 'Railway Recruitment Board', date: 'Jun 2027', tag: 'Central', color: 'rose' },
  { title: 'APPSC Group I', org: 'APPSC Amaravati', date: 'Jul 2027', tag: 'AP State', color: 'cyan' },
];

const SAMPLE_ROADMAPS = [
  { exam: 'GATE CSE', steps: ['Data Structures & Algorithms', 'Database Management', 'Operating Systems', 'Computer Networks', 'Mock Tests & Analysis'] },
  { exam: 'APPSC Group II', steps: ['AP History & Culture', 'Indian Polity & Governance', 'Economy & Environment', 'Current Affairs', 'Previous Year Papers'] },
];

const tagColors: Record<string, string> = {
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  rose: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
};

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreExams,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleExploreClick = () => {
    setShowPreview(true);
  };

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative Vaporwave Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#2DD4BF] to-transparent opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[linear-gradient(transparent_49%,#3B82F6_50%,transparent_51%),linear-gradient(90deg,transparent_49%,#3B82F6_50%,transparent_51%)] bg-[length:40px_40px] opacity-20 transform perspective-[1000px] rotateX-[60deg] scale-150 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-3xl">
        
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
          Gov<span className="text-blue-400">Flow</span>
        </h1>

        {/* Neon Border Card with Description */}
        <div className="w-full mb-10">
          <NeonBorder
            color="#2DD4BF"
            borderSize={30}
            thickness={3}
            rounded={20}
            glow={50}
          >
            <div className="bg-slate-900/80 backdrop-blur-md p-8 md:p-12 text-center h-full w-full flex flex-col justify-center items-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">
                Every Government Exam. One Smart Tracker.
              </h2>
              <p className="text-slate-300 text-sm md:text-lg max-w-2xl leading-relaxed">
                Discover exams, track application deadlines, explore syllabi, and never miss an opportunity again.
              </p>
            </div>
          </NeonBorder>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-4">
          <button
            onClick={handleExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
          >
            Explore Exams
          </button>
          
          <button
            onClick={handleSignInWithGoogle}
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Connecting...</span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>
      </div>

      {/* Explore Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm" onClick={() => setShowPreview(false)}>
          <div
            className="bg-[#0F172A] border border-slate-700 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-base">GovFlow — Sample Exams & Roadmaps</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Sign in to access full features, track deadlines & personalized AI guidance</p>
                </div>
              </div>
              <button onClick={() => setShowPreview(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Sample Exams */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <h3 className="text-white font-bold text-sm">Upcoming Government Exams (Preview)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SAMPLE_EXAMS.map((exam, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-white font-bold text-sm">{exam.title}</p>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold flex-shrink-0 ${tagColors[exam.color]}`}>
                          {exam.tag}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">{exam.org}</p>
                      <p className="text-slate-500 text-xs mt-1">📅 Expected: {exam.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Roadmaps */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Map className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-white font-bold text-sm">AI Study Roadmaps (Preview)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SAMPLE_ROADMAPS.map((rm, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-cyan-500/20">
                      <p className="text-cyan-300 font-bold text-sm mb-3 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" /> {rm.exam} Roadmap
                      </p>
                      <ol className="space-y-1.5">
                        {rm.steps.map((step, si) => (
                          <li key={si} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 flex-shrink-0">{si + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked hint */}
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-700/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-blue-300" />
                </div>
                <p className="text-blue-200 text-xs leading-relaxed">
                  <span className="font-bold">Sign in to unlock:</span> Full exam catalog, live deadline tracking, personalized AI roadmaps, quiz generator, performance analytics, and real-time notifications.
                </p>
              </div>
            </div>

            {/* CTA Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleSignInWithGoogle}
                disabled={isLoading}
                className="w-full sm:flex-1 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? 'Connecting...' : 'Sign in with Google to Access All Features'}
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
