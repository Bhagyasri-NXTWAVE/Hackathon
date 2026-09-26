import React, { useState, useEffect } from 'react';
import { Map, Sparkles, CheckCircle2, Clock, BookOpen, Flag, Loader2, ArrowRight } from 'lucide-react';
import { ALL_EXAMS } from '../data/examsData';
import { StudentProfile, RoadmapPhase } from '../types';

interface RoadmapViewProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ profile, setProfile }) => {
  const [targetExamId, setTargetExamId] = useState(profile.targetExamId || ALL_EXAMS[0].id);
  const [loading, setLoading] = useState(false);
  const [phases, setPhases] = useState<RoadmapPhase[]>([]);
  const [isDemo, setIsDemo] = useState(false);

  const selectedExam = ALL_EXAMS.find(e => e.id === targetExamId) || ALL_EXAMS[0];

  const fetchRoadmap = async (examTitle: string) => {
    setLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      const hours = profile.dailyStudyHours || 3;
      const duration1 = Math.max(1, Math.round(30 / (hours / 3))) + ' Days';
      const duration2 = Math.max(1, Math.round(45 / (hours / 3))) + ' Days';
      const duration3 = Math.max(1, Math.round(15 / (hours / 3))) + ' Days';
      const eduContext = profile.education || 'Graduate';

      const personalizedPhases: RoadmapPhase[] = [
        {
          phaseNumber: 1,
          title: `Phase 1: Foundation for ${eduContext}`,
          duration: duration1,
          focusTopics: ['Syllabus Analysis', 'Basic Concepts', 'Previous Year Papers Review'],
          recommendedResources: [],
          keyMilestones: ['Complete subject overview', `Setup ${hours}hrs/day habit`],
          status: 'in_progress'
        },
        {
          phaseNumber: 2,
          title: `Phase 2: Core Subject Mastery`,
          duration: duration2,
          focusTopics: ['In-depth topic study', 'Sectional Mocks', 'Short Notes Creation'],
          recommendedResources: [],
          keyMilestones: ['Score 60%+ in sectionals', 'Complete 80% syllabus'],
          status: 'upcoming'
        },
        {
          phaseNumber: 3,
          title: `Phase 3: Final Revision & Full Mocks`,
          duration: duration3,
          focusTopics: ['Full-length Mocks', 'Weak Area Revision', 'Time Management'],
          recommendedResources: [],
          keyMilestones: ['Attempt 5 Full Mocks', 'Consistent 75%+ score'],
          status: 'upcoming'
        }
      ];

      setPhases(personalizedPhases);
      setIsDemo(false);
    } catch (err) {
      console.error('Roadmap fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap(selectedExam.title);
  }, [targetExamId]);

  const handleExamSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setTargetExamId(newId);
    setProfile(prev => ({ ...prev, targetExamId: newId }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-md text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
              <Map className="w-3.5 h-3.5 text-blue-300" />
              <span>AI Personalized Preparation Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              My Preparation Timeline
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Phased roadmap customized for {profile.dailyStudyHours || 3} daily study hours.
            </p>
          </div>

          {/* Exam Target Selector */}
          <div className="w-full md:w-72">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Exam</label>
            <select
              value={targetExamId}
              onChange={handleExamSelect}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              {ALL_EXAMS.map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">Generating Phased Roadmap for {selectedExam.title}...</p>
        </div>
      ) : (
        /* Phases Timeline */
        <div className="relative space-y-6 before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-slate-200">
          {phases.map((phase, idx) => (
            <div key={idx} className="relative pl-12 sm:pl-16 group">
              
              {/* Phase Badge Circle */}
              <div className={`absolute left-2 sm:left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                phase.status === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : phase.status === 'in_progress'
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : 'bg-slate-200 text-slate-600 border border-slate-300'
              }`}>
                {phase.phaseNumber}
              </div>

              {/* Phase Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all space-y-4 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {phase.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-blue-600" />
                    {phase.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Focus Topics:</span>
                    <ul className="space-y-1 text-slate-700">
                      {phase.focusTopics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-blue-600 font-bold">•</span> {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Key Milestones:</span>
                    <ul className="space-y-1 text-slate-700">
                      {phase.keyMilestones.map((ms, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Flag className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> {ms}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
