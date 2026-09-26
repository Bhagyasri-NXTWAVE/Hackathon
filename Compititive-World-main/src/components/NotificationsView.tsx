import React, { useState } from 'react';
import {
  Bell,
  Bookmark,
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Zap,
  Star,
  Settings,
  Volume2,
  VolumeX,
  Plus,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Trash2,
  BookOpen,
  Mail
} from 'lucide-react';
import { NotificationItem, NotificationPreferences, Exam } from '../types';
import { ALL_EXAMS } from '../data/examsData';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  trackedExamIds: string[];
  onToggleTrackExam: (examId: string) => void;
  preferences: NotificationPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<NotificationPreferences>>;
  onTriggerSimulatedAlert: (type?: string) => void;
  onNavigate: (view: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  setNotifications,
  trackedExamIds,
  onToggleTrackExam,
  preferences,
  setPreferences,
  onTriggerSimulatedAlert,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'tracked' | 'deadlines' | 'admit_cards' | 'reminders' | 'ap' | 'central'
  >('all');
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifs = notifications.filter(n => {
    if (selectedCategory === 'tracked') {
      return n.examId ? trackedExamIds.includes(n.examId) : false;
    }
    if (selectedCategory === 'deadlines') {
      return n.type === 'deadline' || n.tag === 'Closing Soon';
    }
    if (selectedCategory === 'admit_cards') {
      return n.type === 'admit_card' || n.type === 'result' || n.tag === 'Admit Card' || n.tag === 'Result';
    }
    if (selectedCategory === 'reminders') {
      return n.type === 'study_reminder' || n.type === 'quiz_readiness' || n.tag === 'Study Plan' || n.tag === 'Quiz Alert';
    }
    if (selectedCategory === 'ap') {
      return n.stateFocus === 'AP';
    }
    if (selectedCategory === 'central') {
      return n.stateFocus === 'Central';
    }
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (notif: NotificationItem) => {
    switch (notif.type) {
      case 'deadline':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'admit_card':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'result':
        return <Award className="w-5 h-5 text-emerald-600" />;
      case 'study_reminder':
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'quiz_readiness':
        return <Zap className="w-5 h-5 text-cyan-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-md text-white space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Bell className="w-3.5 h-3.5 text-blue-300" />
              <span>Real-time Exam & Career Notification System</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Notifications & Alerts
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Live alerts for application deadlines, admit cards, exam results, personalized study plan reminders, and AI quiz readiness challenges.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setPreferences(prev => ({ ...prev, autoEmailAlerts: !prev.autoEmailAlerts }))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                preferences.autoEmailAlerts
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
              title="Toggle automatic email alerts for deadlines and roadmaps"
            >
              <Mail className="w-4 h-4" />
              <span>{preferences.autoEmailAlerts ? 'Auto Email: Active' : 'Auto Email: Off'}</span>
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Preferences</span>
            </button>

            <button
              onClick={markAllAsRead}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Mark All Read</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Trigger Bar */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Test Real-Time Alert Engine:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onTriggerSimulatedAlert('deadline')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-[11px] font-semibold transition-colors"
            >
              + Deadline Alert
            </button>
            <button
              onClick={() => onTriggerSimulatedAlert('admit_card')}
              className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 text-[11px] font-semibold transition-colors"
            >
              + Admit Card
            </button>
            <button
              onClick={() => onTriggerSimulatedAlert('study_reminder')}
              className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 text-[11px] font-semibold transition-colors"
            >
              + Study Plan Reminder
            </button>
            <button
              onClick={() => onTriggerSimulatedAlert('quiz_readiness')}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold transition-colors"
            >
              + Quiz Challenge
            </button>
          </div>
        </div>
      </div>

      {/* Notification Preferences Drawer */}
      {showSettings && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Real-Time Notification Preferences
            </h3>
            <span className="text-xs text-slate-500">Configure what triggers real-time alerts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-bold text-slate-800">Exam Release Alerts</p>
                <p className="text-[10px] text-slate-500">New official notifications</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.examAlerts}
                onChange={e => setPreferences(prev => ({ ...prev, examAlerts: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600"
              />
            </label>

            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-bold text-slate-800">Application Deadlines</p>
                <p className="text-[10px] text-slate-500">3-day closing warnings</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.deadlines}
                onChange={e => setPreferences(prev => ({ ...prev, deadlines: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600"
              />
            </label>

            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-bold text-slate-800">Admit Cards & Results</p>
                <p className="text-[10px] text-slate-500">Hall tickets & cutoff list</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.admitCardsAndResults}
                onChange={e => setPreferences(prev => ({ ...prev, admitCardsAndResults: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600"
              />
            </label>

            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-bold text-slate-800">Study Plan Reminders</p>
                <p className="text-[10px] text-slate-500">Scheduled task alerts</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.studyReminders}
                onChange={e => setPreferences(prev => ({ ...prev, studyReminders: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600"
              />
            </label>

            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-bold text-slate-800">AI Quiz Readiness</p>
                <p className="text-[10px] text-slate-500">Topic mastery challenges</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.quizReadiness}
                onChange={e => setPreferences(prev => ({ ...prev, quizReadiness: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600"
              />
            </label>

            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-bold text-slate-800">Auto Email Dispatch</p>
                <p className="text-[10px] text-slate-500">Auto-send updates to registered email</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.autoEmailAlerts}
                onChange={e => setPreferences(prev => ({ ...prev, autoEmailAlerts: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600"
              />
            </label>

            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-2">
                {preferences.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <div>
                  <p className="font-bold text-slate-800">Alert Sound Effect</p>
                  <p className="text-[10px] text-slate-500">Web Audio synth cue</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.soundEnabled}
                onChange={e => setPreferences(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600"
              />
            </label>
          </div>
        </div>
      )}

      {/* Tracked Exams Quick Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Tracked Exams ({trackedExamIds.length})
          </span>
          <button
            onClick={() => onNavigate('exam_explorer')}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Track More Exams</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {ALL_EXAMS.map(exam => {
            const isTracked = trackedExamIds.includes(exam.id);
            return (
              <button
                key={exam.id}
                onClick={() => onToggleTrackExam(exam.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  isTracked
                    ? 'bg-blue-50 text-blue-800 border-blue-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isTracked ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                <span>{exam.title.split('(')[0]}</span>
                {isTracked ? <span className="text-[10px] text-blue-600 font-bold">✓</span> : <span className="text-[10px] text-slate-400">+</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'all', label: `All Alerts (${notifications.length})` },
          { id: 'tracked', label: `⭐ Tracked Exams (${notifications.filter(n => n.examId && trackedExamIds.includes(n.examId)).length})` },
          { id: 'deadlines', label: '🚨 Application Deadlines' },
          { id: 'admit_cards', label: '🎟️ Admit Cards & Results' },
          { id: 'reminders', label: '⏰ Study & Quiz Reminders' },
          { id: 'ap', label: 'APPSC (Andhra Pradesh)' },
          { id: 'central', label: 'Central Govt Exams' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              selectedCategory === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List Feed */}
      <div className="space-y-4">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl space-y-3">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Notifications in this Category</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You're all caught up! You can track more exams above or trigger a test notification to see real-time updates.
            </p>
          </div>
        ) : (
          filteredNotifs.map(notif => {
            const isBookmarked = bookmarkedIds.includes(notif.id);
            const isTrackedExam = notif.examId ? trackedExamIds.includes(notif.examId) : false;

            return (
              <div
                key={notif.id}
                className={`p-6 rounded-2xl bg-white border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
                  !notif.isRead ? 'border-blue-300 ring-2 ring-blue-500/10' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex-shrink-0 mt-1">
                    {getNotificationIcon(notif)}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[11px]">
                        {notif.tag}
                      </span>
                      {isTrackedExam && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Tracked Exam
                        </span>
                      )}
                      <span className="text-slate-500 font-medium">{notif.category}</span>
                      <span className="text-slate-400 text-[11px]">• {notif.timestamp || notif.releaseDate}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {notif.title}
                    </h3>

                    {notif.message && (
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {notif.message}
                      </p>
                    )}

                    <div className="text-[11px] text-slate-500 flex items-center gap-4 pt-1">
                      <span>Organized by: <strong className="text-slate-800">{notif.organization}</strong></span>
                      {notif.vacancies && <span>Vacancies: <strong className="text-emerald-700">{notif.vacancies}</strong></span>}
                      {notif.applyLastDate && (
                        <span>Deadline: <strong className="text-amber-700">{notif.applyLastDate}</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 justify-end md:justify-start pt-2 md:pt-0">
                  {notif.actionView && (
                    <button
                      onClick={() => onNavigate(notif.actionView!)}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>{notif.actionLabel || 'View Action'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {notif.link && !notif.actionView && (
                    <a
                      href={notif.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => toggleBookmark(notif.id)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                      isBookmarked
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800'
                    }`}
                    title="Bookmark Notification"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete Notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
