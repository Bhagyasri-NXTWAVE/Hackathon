import React, { useState } from 'react';
import {
  Sparkles,
  User,
  GraduationCap,
  Building2,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  BarChart,
  BookOpen,
  Loader2,
  Briefcase
} from 'lucide-react';
import { StudentProfile, CareerRecommendation } from '../types';

interface CareerFinderViewProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onSelectExam: (examId: string) => void;
}

export const CareerFinderView: React.FC<CareerFinderViewProps> = ({
  profile,
  setProfile,
  onSelectExam
}) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[] | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleInputChange = (field: keyof StudentProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFindCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/ai/career-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await response.json();
      if (data.recommendations) {
        setRecommendations(data.recommendations);
        setIsDemoMode(!!data.isDemo);
      }
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Option 1: AI Career & Exam Recommendation Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Find Your Ideal Competitive Exam
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Tell us about your degree, branch, age, and interests. Our AI will analyze official exam patterns and state/central opportunities to find your best matches.
        </p>
      </div>

      {/* Form Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <form onSubmit={handleFindCareer} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Student Name</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="e.g. Anusha V"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Age (Years)</label>
              <input
                type="number"
                min="16"
                max="50"
                required
                value={profile.age || ''}
                onChange={e => handleInputChange('age', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Gender</label>
              <select
                value={profile.gender || ''}
                onChange={e => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Home State</label>
              <select
                value={profile.state}
                onChange={e => handleInputChange('state', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi / Other">Delhi / Other Indian State</option>
              </select>
            </div>

            {/* Education / Degree */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Education / Qualification</label>
              <select
                value={profile.education}
                onChange={e => handleInputChange('education', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                <option value="B.Sc / Degree">B.Sc / Degree</option>
                <option value="B.Com">B.Com</option>
                <option value="BA / Arts">BA / Arts</option>
                <option value="BBA / MBA">BBA / MBA</option>
                <option value="Intermediate (10+2)">Intermediate (10+2)</option>
              </select>
            </div>

            {/* Branch / Stream */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Branch / Stream</label>
              <input
                type="text"
                value={profile.branch}
                onChange={e => handleInputChange('branch', e.target.value)}
                placeholder="e.g. CSE, IT, ECE, Mechanical, Commerce"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Graduation Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Graduation Status</label>
              <select
                value={profile.graduationStatus}
                onChange={e => handleInputChange('graduationStatus', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="Pursuing">Pursuing (2nd/3rd/4th Year)</option>
                <option value="Graduated">Graduated / Completed</option>
              </select>
            </div>

            {/* Technical vs Non-Tech Preference */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Tech / Non-Tech Preference</label>
              <select
                value={profile.technicalPreference}
                onChange={e => handleInputChange('technicalPreference', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="Technical">Technical (Engineering/PSU/GATE)</option>
                <option value="Non-Technical">Non-Technical (Admin/Civil Services)</option>
                <option value="Both">Open to Both</option>
              </select>
            </div>

            {/* Central vs State Preference */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Central / State Preference</label>
              <select
                value={profile.examPreference}
                onChange={e => handleInputChange('examPreference', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="State">State Focus (APPSC Group I-IV / AP Govt)</option>
                <option value="Central">Central Focus (GATE, UPSC, SSC, RRB)</option>
                <option value="Both">Both State & Central</option>
              </select>
            </div>

            {/* Daily Hours Available */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Daily Available Study Hours</label>
              <input
                type="number"
                min="1"
                max="16"
                value={profile.dailyStudyHours}
                onChange={e => handleInputChange('dailyStudyHours', parseInt(e.target.value) || 3)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>AI Analyzing Career Opportunities...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-cyan-200" />
                  <span>Generate AI Career Recommendations</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* AI Recommendations Results Section */}
      {recommendations && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              AI Recommended Careers & Exams ({recommendations.length})
            </h2>
            {isDemoMode && (
              <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                Demo AI Mode
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Top Match Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-200">
                      {rec.matchPercentage}% Match
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Duration: {rec.estimatedPrepDuration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {rec.examTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {rec.matchReason}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-6">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Eligibility</span>
                      <span className="font-semibold text-emerald-700">{rec.eligibilityStatus}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Difficulty</span>
                      <span className="font-semibold text-amber-700">{rec.difficultyLevel}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 mb-6">
                    <p><strong className="text-slate-800">Career Scope:</strong> {rec.careerGrowthPotential}</p>
                    <p><strong className="text-slate-800">Next Step:</strong> {rec.nextRecommendedStep}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectExam(rec.examId)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore This Career</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
