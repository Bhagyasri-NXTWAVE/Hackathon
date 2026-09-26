import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  ExternalLink,
  Bot,
  Map,
  Calendar,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { Exam, StudentProfile } from '../types';

interface ExamDetailViewProps {
  exam: Exam;
  profile: StudentProfile;
  onOpenEligibilityModal: () => void;
  onCreateRoadmap: () => void;
  onStartPlanner: () => void;
  onOpenChat: () => void;
  onBack: () => void;
}

export const ExamDetailView: React.FC<ExamDetailViewProps> = ({
  exam,
  profile,
  onOpenEligibilityModal,
  onCreateRoadmap,
  onStartPlanner,
  onOpenChat,
  onBack
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
      >
        ← Back to Exam Explorer
      </button>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-md text-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            Conducted by: {exam.conductedBy}
          </span>
          <span className="text-xs text-slate-300">Frequency: {exam.frequency}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {exam.title}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {exam.fullDescription}
        </p>

        {/* 4 Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenEligibilityModal}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check My Eligibility</span>
          </button>

          <button
            onClick={onCreateRoadmap}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <Map className="w-4 h-4" />
            <span>Create My Roadmap</span>
          </button>

          <button
            onClick={onStartPlanner}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Start Preparation</span>
          </button>

          <button
            onClick={onOpenChat}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Ask Competitive AI</span>
          </button>
        </div>
      </div>

      {/* Grid: Job Roles & Eligibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Job Roles & Responsibilities */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Job Roles & Career Profile
          </h2>

          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-2 uppercase tracking-wider">Posts & Designation:</span>
            <div className="flex flex-wrap gap-2">
              {exam.jobRoles.map((role, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs border border-slate-200">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-2 uppercase tracking-wider">Responsibilities:</span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {exam.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Eligibility Requirements */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Eligibility Criteria
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Age Limit</span>
              <span className="font-semibold text-slate-900">{exam.eligibility.ageLimit}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Qualification Required</span>
              <span className="font-semibold text-slate-900">{exam.eligibility.qualification}</span>
            </div>

            {exam.eligibility.stateCriteria && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">State Criteria</span>
                <span className="text-slate-700">{exam.eligibility.stateCriteria}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Selection Process & Exam Pattern */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          Selection Process & Exam Pattern
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Exam Stages</span>
            <span className="font-bold text-slate-900">{exam.examPattern.stages}</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Duration</span>
            <span className="font-bold text-slate-900">{exam.examPattern.duration}</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Mode</span>
            <span className="font-bold text-slate-900">{exam.examPattern.mode}</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Negative Marking</span>
            <span className="font-bold text-amber-700">{exam.examPattern.negativeMarking}</span>
          </div>
        </div>
      </div>

      {/* Syllabus & Preparation Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Syllabus Overview
          </h2>
          <ul className="space-y-2 text-xs text-slate-700">
            {exam.syllabusOverview.map((item, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Preparation Strategy & Salary
          </h2>
          
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <span className="text-[10px] font-bold text-emerald-700 uppercase block">Expected Pay Scale</span>
            <span className="text-base font-black text-emerald-900">{exam.salaryRange}</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-700">
            {exam.preparationStrategy.map((strat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>{strat}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Official Sources Notice */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start justify-between gap-4">
        <div>
          <p className="font-bold text-sm mb-1 text-amber-900">Official Source Verification Notice</p>
          <p className="text-amber-800 leading-relaxed">
            Exam dates, vacancies, and eligibility criteria are subject to official government gazette releases. Always verify current details from official websites prior to submitting applications.
          </p>
        </div>
        <a
          href={exam.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs flex items-center gap-1.5 flex-shrink-0 transition-colors"
        >
          <span>Official Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
