import React, { useState } from 'react';
import { GitCompare, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { ALL_EXAMS } from '../data/examsData';
import { StudentProfile } from '../types';

interface CareerComparisonViewProps {
  profile: StudentProfile;
  onSelectExam: (examId: string) => void;
}

export const CareerComparisonView: React.FC<CareerComparisonViewProps> = ({
  profile,
  onSelectExam
}) => {
  const [exam1Id, setExam1Id] = useState(ALL_EXAMS[0].id);
  const [exam2Id, setExam2Id] = useState(ALL_EXAMS[1].id);
  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);

  const handleCompare = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam1Id,
          exam2Id,
          studentProfile: profile
        })
      });
      const data = await response.json();
      setComparisonResult(data);
    } catch (err) {
      console.error('Comparison error:', err);
    } finally {
      setLoading(false);
    }
  };

  const ex1 = ALL_EXAMS.find(e => e.id === exam1Id) || ALL_EXAMS[0];
  const ex2 = ALL_EXAMS.find(e => e.id === exam2Id) || ALL_EXAMS[1];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <GitCompare className="w-3.5 h-3.5 text-blue-600" />
          <span>AI Career Comparison Tool</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Compare Two Competitive Exams
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          Compare eligibility, syllabus, difficulty, salary, and career growth side-by-side.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Select First Exam</label>
          <select
            value={exam1Id}
            onChange={e => setExam1Id(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            {ALL_EXAMS.map(e => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Select Second Exam</label>
          <select
            value={exam2Id}
            onChange={e => setExam2Id(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            {ALL_EXAMS.map(e => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 flex justify-center pt-2">
          <button
            onClick={handleCompare}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>AI Analyzing Comparison...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Run AI Career Comparison</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side by Side Specs Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Exam 1 Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Exam 1</span>
          <h3 className="text-xl font-bold text-slate-900">{ex1.title}</h3>
          
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Conducting Body</span>
              <span className="font-semibold text-slate-900">{ex1.conductedBy}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Qualification Required</span>
              <span className="font-semibold text-slate-900">{ex1.eligibility.qualification}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Salary Scale</span>
              <span className="font-semibold text-emerald-700">{ex1.salaryRange}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectExam(ex1.id)}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-blue-600 transition-colors"
          >
            Explore {ex1.title.split(' ')[0]}
          </button>
        </div>

        {/* Exam 2 Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">Exam 2</span>
          <h3 className="text-xl font-bold text-slate-900">{ex2.title}</h3>
          
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Conducting Body</span>
              <span className="font-semibold text-slate-900">{ex2.conductedBy}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Qualification Required</span>
              <span className="font-semibold text-slate-900">{ex2.eligibility.qualification}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Salary Scale</span>
              <span className="font-semibold text-emerald-700">{ex2.salaryRange}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectExam(ex2.id)}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-indigo-600 transition-colors"
          >
            Explore {ex2.title.split(' ')[0]}
          </button>
        </div>

      </div>

      {/* AI Comparative Verdict */}
      {comparisonResult && comparisonResult.comparison && (
        <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>AI Mentor Comparative Verdict</span>
          </div>

          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {comparisonResult.comparison.recommendationSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 pt-2">
            <div className="p-3 rounded-xl bg-white border border-blue-100">
              <strong className="text-slate-900 block mb-1">Eligibility Fit:</strong>
              {comparisonResult.comparison.eligibilityComparison}
            </div>
            <div className="p-3 rounded-xl bg-white border border-blue-100">
              <strong className="text-slate-900 block mb-1">Difficulty & Duration:</strong>
              {comparisonResult.comparison.difficultyComparison}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
