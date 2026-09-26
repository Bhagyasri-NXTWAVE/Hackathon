import React, { useState } from 'react';
import {
  Compass,
  Search,
  Filter,
  Building2,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  GitCompare,
  Star
} from 'lucide-react';
import { ALL_EXAMS } from '../data/examsData';
import { Exam } from '../types';

interface ExamsExplorerViewProps {
  onSelectExam: (examId: string) => void;
  onCompareExams: () => void;
  trackedExamIds?: string[];
  onToggleTrackExam?: (examId: string) => void;
}

export const ExamsExplorerView: React.FC<ExamsExplorerViewProps> = ({
  onSelectExam,
  onCompareExams,
  trackedExamIds = [],
  onToggleTrackExam
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExams = ALL_EXAMS.filter(exam => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'appsc'
        ? exam.category === 'appsc' || exam.isAPPSCGroup
        : selectedCategory === 'central'
        ? exam.category === 'central'
        : selectedCategory === 'engineering'
        ? exam.category === 'engineering'
        : selectedCategory === 'banking'
        ? exam.category === 'banking'
        : true;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      exam.title.toLowerCase().includes(query) ||
      exam.shortDescription.toLowerCase().includes(query) ||
      exam.jobRoles.some(role => role.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0F172A] border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-md text-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-blue-300" />
            <span>Option 2: Exam & Career Explorer</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Competitive Exams & Recruitments
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Select an exam to view detailed job profiles, eligibility, syllabus, selection pattern, salary scale, and personalized AI preparation guidance.
          </p>
        </div>

        <button
          onClick={onCompareExams}
          className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all hover:text-white flex-shrink-0"
        >
          <GitCompare className="w-4 h-4 text-blue-400" />
          <span>Compare 2 Careers</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Exams' },
            { id: 'appsc', label: 'APPSC Groups (AP)' },
            { id: 'central', label: 'Central (UPSC / SSC / RRB)' },
            { id: 'engineering', label: 'GATE / Tech' },
            { id: 'banking', label: 'Banking (IBPS / SBI)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search exam, role, degree..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map(exam => (
          <div
            key={exam.id}
            onClick={() => onSelectExam(exam.id)}
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  exam.isAPPSCGroup
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {exam.isAPPSCGroup ? `APPSC ${exam.groupType}` : exam.category}
                </span>
                <span className="text-[11px] text-slate-400">{exam.frequency}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                {exam.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                {exam.shortDescription}
              </p>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3 mb-6">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Qualification:</span>
                  <span className="font-medium truncate max-w-[160px] text-slate-800">{exam.eligibility.qualification}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Salary Scale:</span>
                  <span className="font-semibold text-emerald-700 truncate max-w-[160px]">{exam.salaryRange}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-blue-600">
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Details & Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </span>

              {onToggleTrackExam && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTrackExam(exam.id);
                  }}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                    trackedExamIds.includes(exam.id)
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                  }`}
                  title={trackedExamIds.includes(exam.id) ? 'Untrack Exam' : 'Track for Real-time Alerts'}
                >
                  <Star className={`w-3.5 h-3.5 ${trackedExamIds.includes(exam.id) ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                  <span className="text-[10px]">{trackedExamIds.includes(exam.id) ? 'Tracking' : 'Track'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
