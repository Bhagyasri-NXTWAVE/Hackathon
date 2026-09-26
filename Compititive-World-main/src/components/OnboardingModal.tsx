import React from 'react';
import { Target, Compass } from 'lucide-react';
import { ALL_EXAMS } from '../data/examsData';

interface OnboardingModalProps {
  onSelectExam: (examId: string) => void;
  onDontKnow: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  onSelectExam,
  onDontKnow
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome to GovTrack India!</h2>
          <p className="text-slate-600 mt-2">To personalize your experience, which exam are you preparing for?</p>
        </div>

        <div className="space-y-4">
          <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {ALL_EXAMS.map(exam => (
              <button
                key={exam.id}
                onClick={() => onSelectExam(exam.id)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-700">{exam.title}</h4>
                  <p className="text-xs text-slate-500">{exam.conductedBy}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-slate-500">OR</span>
            </div>
          </div>

          <button
            onClick={onDontKnow}
            className="w-full p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Compass className="w-5 h-5 text-indigo-500" />
            <span>I don't know, help me choose</span>
          </button>
        </div>
      </div>
    </div>
  );
};
