import React, { useState } from 'react';
import { ShieldCheck, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface EligibilityCheckerModalProps {
  examTitle: string;
  profile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  examTitle,
  profile,
  isOpen,
  onClose
}) => {
  const [age, setAge] = useState(profile.age || 21);
  const [degree, setDegree] = useState(profile.education || 'B.Tech');
  const [branch, setBranch] = useState(profile.branch || 'CSE');
  const [state, setState] = useState(profile.state || 'Andhra Pradesh');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    eligibilityStatus: string;
    reasonText: string;
    officialDisclaimer: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/ai/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examTitle,
          userAge: age,
          userQualification: degree,
          userDegree: branch,
          userState: state
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Eligibility check error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">AI Eligibility Checker</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Target Exam: <span className="font-bold text-slate-900">{examTitle}</span>
        </p>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Your Age</label>
              <input
                type="number"
                min="16"
                max="60"
                value={age}
                onChange={e => setAge(parseInt(e.target.value) || 21)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Home State</label>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Qualification</label>
              <input
                type="text"
                value={degree}
                onChange={e => setDegree(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Branch / Subject</label>
              <input
                type="text"
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Evaluating Criteria...</span>
              </>
            ) : (
              <span>Check My Eligibility</span>
            )}
          </button>
        </form>

        {/* Results Box */}
        {result && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-5 h-5 ${
                result.eligibilityStatus.includes('Eligible') ? 'text-emerald-600' : 'text-amber-600'
              }`} />
              <span className={`text-sm font-bold ${
                result.eligibilityStatus.includes('Eligible') ? 'text-emerald-800' : 'text-amber-800'
              }`}>
                Status: {result.eligibilityStatus}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {result.reasonText}
            </p>

            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-medium">
              ⚠️ {result.officialDisclaimer || 'Verify eligibility with the latest official notification before applying.'}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
