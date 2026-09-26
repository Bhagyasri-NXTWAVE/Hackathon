import React, { useState, useEffect, useRef } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  RotateCcw, 
  Loader2, 
  Bookmark, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  BarChart2, 
  FileText, 
  Check, 
  HelpCircle,
  ShieldCheck,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ALL_EXAMS } from '../data/examsData';
import { EXAM_QUIZ_CONFIGS } from '../data/quizDatabase';
import { QuizQuestion, StudentProfile } from '../types';

interface QuizGeneratorViewProps {
  profile: StudentProfile;
  onQuizCompleted?: (results: { score: number; totalMarks: number; correctCount: number; accuracy: number; examId?: string; subject?: string; totalQuestions?: number }) => void;
}

type QuestionStatus = 'unanswered' | 'answered' | 'review' | 'answered_review';

export const QuizGeneratorView: React.FC<QuizGeneratorViewProps> = ({ profile, onQuizCompleted }) => {
  const defaultExamId = profile.targetExamId && profile.targetExamId !== 'pending' ? profile.targetExamId : ALL_EXAMS[0].id;
  const [targetExamId, setTargetExamId] = useState(defaultExamId);
  const [subject, setSubject] = useState('ALL_SUBJECTS');
  const [questionCountType, setQuestionCountType] = useState<'10' | '25' | 'full'>('10');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);

  // Active exam configuration
  const selectedExam = ALL_EXAMS.find(e => e.id === targetExamId) || ALL_EXAMS[0];
  const examConfig = EXAM_QUIZ_CONFIGS[targetExamId] || {
    examId: targetExamId,
    examTitle: selectedExam.title,
    totalRealExamQuestions: 50,
    realExamDurationMinutes: 60,
    negativeMarkRatio: 0.33,
    marksPerQuestion: 1,
    subjects: selectedExam.subjects || ['General Studies', 'General Aptitude']
  };

  // Compute available subjects for the dropdown
  const availableSubjects = examConfig.subjects || selectedExam.subjects || [];

  // When exam changes, reset subject to ALL_SUBJECTS
  const handleExamChange = (newExamId: string) => {
    setTargetExamId(newExamId);
    setSubject('ALL_SUBJECTS');
  };

  // Question count and duration mapping
  const getTestSpecs = () => {
    if (questionCountType === '10') {
      return { count: 10, minutes: 15, label: 'Quick Topic Drill (10 Questions • 15 Mins)' };
    }
    if (questionCountType === '25') {
      return { count: 25, minutes: 35, label: 'Sectional Mock Test (25 Questions • 35 Mins)' };
    }
    return {
      count: examConfig.totalRealExamQuestions,
      minutes: examConfig.realExamDurationMinutes,
      label: `Full Real Mock Exam (${examConfig.totalRealExamQuestions} Questions • ${examConfig.realExamDurationMinutes} Mins)`
    };
  };

  const testSpecs = getTestSpecs();

  // Quiz Player State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [reviewFlags, setReviewFlags] = useState<{ [qId: string]: boolean }>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(testSpecs.minutes * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [activeReviewFilter, setActiveReviewFilter] = useState<'all' | 'incorrect' | 'correct' | 'review'>('all');
  
  // Timer effect
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerActive && secondsRemaining > 0 && !quizFinished) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, secondsRemaining, quizFinished]);

  // Generate / Launch Mock Test
  const handleStartExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setQuizFinished(false);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setReviewFlags({});
    setShowConfirmSubmit(false);

    const specs = getTestSpecs();
    setSecondsRemaining(specs.minutes * 60);

    try {
      const response = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: targetExamId,
          examTitle: selectedExam.title,
          subject,
          difficulty,
          numQuestions: specs.count
        })
      });
      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setIsTimerActive(true);
      }
    } catch (err) {
      console.error('Quiz launch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (optIdx: number) => {
    if (!questions) return;
    const currentQ = questions[currentIdx];
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const handleClearResponse = () => {
    if (!questions) return;
    const currentQ = questions[currentIdx];
    setSelectedAnswers(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const handleToggleReview = () => {
    if (!questions) return;
    const currentQ = questions[currentIdx];
    setReviewFlags(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleSaveAndNext = () => {
    if (!questions) return;
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowConfirmSubmit(true);
    }
  };

  const handleMarkReviewAndNext = () => {
    if (!questions) return;
    const currentQ = questions[currentIdx];
    setReviewFlags(prev => ({ ...prev, [currentQ.id]: true }));
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowConfirmSubmit(true);
    }
  };

  const handleSubmitQuiz = () => {
    setIsTimerActive(false);
    setShowConfirmSubmit(false);
    setQuizFinished(true);

    if (onQuizCompleted && questions) {
      const stats = calculateDetailedScore();
      onQuizCompleted({
        score: stats.netScore,
        totalMarks: stats.totalMaxMarks,
        correctCount: stats.correctCount,
        accuracy: stats.accuracy,
        examId: targetExamId,
        subject: subject === 'ALL_SUBJECTS' ? 'All Subjects' : subject,
        totalQuestions: questions.length
      });
    }
  };

  // Status helper for question palette
  const getQuestionStatus = (qId: string): QuestionStatus => {
    const isAnswered = selectedAnswers[qId] !== undefined;
    const isReview = !!reviewFlags[qId];

    if (isAnswered && isReview) return 'answered_review';
    if (isAnswered) return 'answered';
    if (isReview) return 'review';
    return 'unanswered';
  };

  // Detailed Scoring with Real Negative Marking
  const calculateDetailedScore = () => {
    if (!questions) return {
      correctCount: 0,
      incorrectCount: 0,
      unansweredCount: 0,
      grossScore: 0,
      negativePenalty: 0,
      netScore: 0,
      totalMaxMarks: 0,
      accuracy: 0
    };

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach(q => {
      const ans = selectedAnswers[q.id];
      if (ans === undefined) {
        unanswered++;
      } else if (ans === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const marksPerQ = examConfig.marksPerQuestion || 1;
    const penaltyPerWrong = marksPerQ * (examConfig.negativeMarkRatio || 0.33);

    const grossScore = correct * marksPerQ;
    const negativePenalty = Number((incorrect * penaltyPerWrong).toFixed(2));
    const netScore = Number(Math.max(0, grossScore - negativePenalty).toFixed(2));
    const totalMaxMarks = questions.length * marksPerQ;
    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    return {
      correctCount: correct,
      incorrectCount: incorrect,
      unansweredCount: unanswered,
      grossScore,
      negativePenalty,
      netScore,
      totalMaxMarks,
      accuracy
    };
  };

  // Time format helper
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scoreStats = calculateDetailedScore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">

      {/* Mode 1: Configuration Form when NOT in active test */}
      {(!questions || quizFinished) && (
        <div className="space-y-6">
          
          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 shadow-xl text-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-300" />
              <span>Official Mock & Sectional Testing Arena</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Exam-Standard Mock Testing Engine
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Experience authentic exam conditions with strictly isolated subjects, realistic question counts, negative marking, and real-time TCS iON-style question navigation.
            </p>

            {/* Configurator Form */}
            <form onSubmit={handleStartExam} className="space-y-4 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Target Exam Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    Target Exam
                  </label>
                  <select
                    value={targetExamId}
                    onChange={e => handleExamChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {ALL_EXAMS.map(e => (
                      <option key={e.id} value={e.id}>
                        {e.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Strict Subject / Section Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    Subject / Section (Isolated)
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="ALL_SUBJECTS">🎯 Full Mock Exam (All Sections Balanced)</option>
                    {availableSubjects.map((sub, sIdx) => (
                      <option key={sIdx} value={sub}>
                        📖 {sub}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Test Format & Length */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Test Length & Duration
                  </label>
                  <select
                    value={questionCountType}
                    onChange={e => setQuestionCountType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="10">⚡ 10 Questions (15 Mins Quick Drill)</option>
                    <option value="25">📘 25 Questions (35 Mins Sectional Mock)</option>
                    <option value="full">
                      🏆 Real Exam Simulation ({examConfig.totalRealExamQuestions} Qs • {examConfig.realExamDurationMinutes} Mins)
                    </option>
                  </select>
                </div>

                {/* 4. Difficulty Standard */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="Medium">Medium (Official Prelims Standard)</option>
                    <option value="Hard">Hard (High-Rank Challenger)</option>
                    <option value="Easy">Easy (Foundational Concepts)</option>
                  </select>
                </div>

              </div>

              {/* Exam Rules & Pattern Blueprint Banner */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300">Total Questions: <strong className="text-white">{testSpecs.count}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-slate-300">Duration: <strong className="text-white">{testSpecs.minutes} Mins</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-slate-300">Marking Scheme: <strong className="text-white">+{examConfig.marksPerQuestion} / -{(examConfig.marksPerQuestion * examConfig.negativeMarkRatio).toFixed(2)}</strong></span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Generating Calibrated Mock...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-cyan-200" />
                      <span>Launch Test ({testSpecs.count} Questions)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">Strict Subject Purity</span>
              <p className="text-xs text-slate-600">Selecting a subject ensures 100% of the questions are strictly from that official syllabus without any random mixed domains.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Real Negative Marking</span>
              <p className="text-xs text-slate-600">Authentic penalty deduction ({examConfig.negativeMarkRatio === 0.5 ? '1/2' : '1/3'}rd mark) mirrors the actual competitive exam scoring system.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">Full CBT Simulation</span>
              <p className="text-xs text-slate-600">Interactive question palette, timer alerts, question flags, and instant performance analysis upon submission.</p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Live Real Exam Interface */}
      {questions && questions.length > 0 && !quizFinished && (
        <div className="space-y-4">
          
          {/* Top Exam Navigation Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] border border-slate-800 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg sticky top-2 z-20">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold">
                  {selectedExam.title.split('(')[0]}
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-300 text-xs font-semibold">
                  {subject === 'ALL_SUBJECTS' ? 'Full Mock Exam' : subject}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Marking: +{examConfig.marksPerQuestion} / -{(examConfig.marksPerQuestion * examConfig.negativeMarkRatio).toFixed(2)} | Q{currentIdx + 1} of {questions.length}
              </p>
            </div>

            {/* Timer and Submit Action */}
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-mono font-bold text-sm ${
                secondsRemaining < 120 
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse'
                  : secondsRemaining < 300
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-emerald-400'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Main Layout: 2 Columns (Question Canvas + Question Palette) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8 Columns: Active Question Area */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              
              {/* Question Header & Badges */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs">
                    Question {currentIdx + 1} of {questions.length}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
                    {questions[currentIdx].subject}
                  </span>
                </div>

                <button
                  onClick={handleToggleReview}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    reviewFlags[questions[currentIdx].id]
                      ? 'bg-purple-50 border-purple-300 text-purple-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${reviewFlags[questions[currentIdx].id] ? 'fill-purple-600 text-purple-600' : 'text-slate-400'}`} />
                  <span>{reviewFlags[questions[currentIdx].id] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Problem Statement */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {questions[currentIdx].question}
                </h3>
              </div>

              {/* 4 Interactive Options */}
              <div className="space-y-3 pt-2">
                {questions[currentIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[questions[currentIdx].id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(oIdx)}
                      className={`w-full p-4 rounded-xl border text-xs sm:text-sm font-medium text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-600 text-blue-950 shadow-xs ring-1 ring-blue-600/30'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    disabled={selectedAnswers[questions[currentIdx].id] === undefined}
                    onClick={handleClearResponse}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Clear Response
                  </button>

                  <button
                    onClick={handleMarkReviewAndNext}
                    className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200 transition-colors cursor-pointer"
                  >
                    Mark for Review & Next
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    onClick={handleSaveAndNext}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{currentIdx < questions.length - 1 ? 'Save & Next' : 'Finish Test'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right 4 Columns: TCS iON Style Question Palette */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
              
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Question Palette
                </h4>
                <p className="text-[11px] text-slate-500">Jump to any question instantly</p>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                    ✓
                  </span>
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
                    ★
                  </span>
                  <span>Review ({Object.values(reviewFlags).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-slate-100 border border-slate-300 text-slate-600 text-[10px] font-bold flex items-center justify-center">
                    -
                  </span>
                  <span>Unanswered ({questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-blue-300">
                    •
                  </span>
                  <span>Current (Q{currentIdx + 1})</span>
                </div>
              </div>

              {/* Numbered Question Chips Grid */}
              <div className="max-h-[360px] overflow-y-auto pr-1">
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const status = getQuestionStatus(q.id);
                    const isCurrent = currentIdx === idx;

                    let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                    if (status === 'answered') bgClass = 'bg-emerald-500 text-white font-bold';
                    if (status === 'review') bgClass = 'bg-purple-500 text-white font-bold';
                    if (status === 'answered_review') bgClass = 'bg-purple-600 text-white font-bold ring-2 ring-emerald-400';

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${bgClass} ${
                          isCurrent ? 'ring-2 ring-blue-600 ring-offset-1 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Submit Full Mock Test</span>
                </button>
              </div>

            </div>

          </div>

          {/* Submission Confirmation Modal */}
          {showConfirmSubmit && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Ready to Submit Your Exam?</h3>
                  <p className="text-xs text-slate-500">
                    Review your status before final submission. Your score with negative marking will be calculated immediately.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-700">
                    <span>Total Questions:</span>
                    <strong className="text-slate-900">{questions.length}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Answered:</span>
                    <strong className="font-bold">{Object.keys(selectedAnswers).length}</strong>
                  </div>
                  <div className="flex justify-between text-purple-700 font-medium">
                    <span>Marked for Review:</span>
                    <strong className="font-bold">{Object.values(reviewFlags).filter(Boolean).length}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Unanswered:</span>
                    <strong>{questions.length - Object.keys(selectedAnswers).length}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Resume Test
                  </button>
                  <button
                    onClick={handleSubmitQuiz}
                    className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    Confirm & Submit
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Mode 3: Detailed Real Exam Results & Solution Review */}
      {quizFinished && questions && (
        <div className="space-y-6">
          
          {/* Result Score Card Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 shadow-xl text-white space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                  Official Exam Score Report
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {selectedExam.title} Mock Results
                </h2>
                <p className="text-xs text-slate-300">
                  {subject === 'ALL_SUBJECTS' ? 'Complete Mock Simulation' : `Subject Test: ${subject}`}
                </p>
              </div>

              <button
                onClick={() => {
                  setQuestions(null);
                  setQuizFinished(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Take Another Mock Test</span>
              </button>
            </div>

            {/* Score Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Net Calculated Score</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {scoreStats.netScore} <span className="text-xs text-slate-400 font-normal">/ {scoreStats.totalMaxMarks}</span>
                </div>
                <span className="text-[10px] text-slate-400">Negative marking applied</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Accuracy Rate</span>
                <div className="text-2xl sm:text-3xl font-black text-blue-400">
                  {scoreStats.accuracy}%
                </div>
                <span className="text-[10px] text-slate-400">{scoreStats.correctCount} of {scoreStats.correctCount + scoreStats.incorrectCount} attempted</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Correct Answers</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {scoreStats.correctCount}
                </div>
                <span className="text-[10px] text-emerald-400/80">+{scoreStats.grossScore} marks earned</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Negative Marks Lost</span>
                <div className="text-2xl sm:text-3xl font-black text-rose-400">
                  -{scoreStats.negativePenalty}
                </div>
                <span className="text-[10px] text-rose-400/80">{scoreStats.incorrectCount} wrong answers</span>
              </div>
            </div>
          </div>

          {/* Solutions & Explanations Review Section */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Detailed Solution & Error Analysis
                </h3>
                <p className="text-xs text-slate-500">
                  Learn from mistakes with comprehensive step-by-step conceptual explanations
                </p>
              </div>

              {/* Review Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveReviewFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeReviewFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({questions.length})
                </button>
                <button
                  onClick={() => setActiveReviewFilter('incorrect')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeReviewFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Incorrect ({scoreStats.incorrectCount})
                </button>
                <button
                  onClick={() => setActiveReviewFilter('correct')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeReviewFilter === 'correct' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  Correct ({scoreStats.correctCount})
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions
                .filter(q => {
                  const userAns = selectedAnswers[q.id];
                  if (activeReviewFilter === 'incorrect') return userAns !== undefined && userAns !== q.correctAnswer;
                  if (activeReviewFilter === 'correct') return userAns === q.correctAnswer;
                  return true;
                })
                .map((q, idx) => {
                  const userAns = selectedAnswers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  const isSkipped = userAns === undefined;

                  return (
                    <div 
                      key={q.id} 
                      className={`p-5 rounded-2xl border space-y-3 text-xs transition-all ${
                        isSkipped
                          ? 'bg-slate-50/70 border-slate-200'
                          : isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">
                            Q{idx + 1}: {q.question}
                          </span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] ${
                          isSkipped
                            ? 'bg-slate-200 text-slate-700'
                            : isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isSkipped ? 'Skipped' : isCorrect ? 'Correct (+1)' : `Incorrect (-${(examConfig.marksPerQuestion * examConfig.negativeMarkRatio).toFixed(2)})`}
                        </span>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt, oIdx) => {
                          const isOptionCorrect = oIdx === q.correctAnswer;
                          const isOptionChosen = userAns === oIdx;

                          let optStyle = 'bg-white border-slate-200 text-slate-700';
                          if (isOptionCorrect) optStyle = 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold';
                          else if (isOptionChosen && !isOptionCorrect) optStyle = 'bg-rose-100/80 border-rose-400 text-rose-950 font-bold line-through';

                          return (
                            <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${optStyle}`}>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-500">({String.fromCharCode(65 + oIdx)})</span>
                                <span>{opt}</span>
                              </div>
                              {isOptionCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                              {isOptionChosen && !isOptionCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Conceptual Explanation Box */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                          <span>Official Solution & Explanation:</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-xs">
                          {q.explanation}
                        </p>
                      </div>

                    </div>
                  );
                })}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
