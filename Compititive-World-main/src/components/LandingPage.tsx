import React from 'react';
import NeonBorder from './NeonBorder';
import { signInWithGoogle } from '../supabase';

interface LandingPageProps {
  onStartCareerFinder: () => void;
  onExploreExams: () => void;
  onOpenVoice: () => void;
  onOpenChat: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreExams,
}) => {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative Vaporwave Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#2DD4BF] to-transparent opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[linear-gradient(transparent_49%,#3B82F6_50%,transparent_51%),linear-gradient(90deg,transparent_49%,#3B82F6_50%,transparent_51%)] bg-[length:40px_40px] opacity-20 transform perspective-[1000px] rotateX-[60deg] scale-150 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-3xl">
        
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
          GovTrack <span className="text-blue-400">India</span>
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
            onClick={onExploreExams}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
          >
            Explore Exams
          </button>
          
          <button
            onClick={async () => {
              try {
                await signInWithGoogle();
              } catch (e) {
                console.error(e);
              }
            }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 shadow-xl transition-all"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
