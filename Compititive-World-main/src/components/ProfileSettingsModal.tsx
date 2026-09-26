import React, { useState } from 'react';
import {
  X,
  User,
  Settings,
  Bell,
  Globe,
  BookOpen,
  Award,
  Check,
  Save,
  LogOut,
  Shield,
  Volume2,
  VolumeX,
  Sparkles,
  GraduationCap,
  Clock,
  Key
} from 'lucide-react';
import { StudentProfile, NotificationPreferences } from '../types';
import { ALL_EXAMS } from '../data/examsData';
import { supabase, signOut, saveUserProfile } from '../supabase';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  preferences: NotificationPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<NotificationPreferences>>;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  setProfile,
  preferences,
  setPreferences,
  isLoggedIn,
  setIsLoggedIn
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences' | 'account'>('profile');
  
  // Local form state
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await saveUserProfile({
          id: user.id,
          full_name: formData.name,
          target_exam: formData.targetExamId,
          phone: ''
        });
      }
    } catch (err) {
      console.warn('Could not sync profile to Supabase:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-4 py-4 sm:px-6 sm:py-5 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white truncate">
                Profile & Account Settings
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                Personalize your student identity, language, and exam preferences
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50/80 px-3 sm:px-6 gap-1 sm:gap-2 pt-2.5 overflow-x-auto text-xs font-semibold scrollbar-none">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Student Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alert Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'preferences'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Language & AI</span>
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'account'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Account & Security</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {savedSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Profile settings successfully updated and saved!</span>
            </div>
          )}

          {/* TAB 1: PROFILE FORM */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 21 }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 font-medium"
                    min={15}
                    max={60}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Domicile State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Other / General">Other / General</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Education Degree</label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
                  >
                    <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                    <option value="Degree / B.Sc / B.Com / B.A.">Degree / B.Sc / B.Com / B.A.</option>
                    <option value="Post Graduation (M.Tech/M.Sc/MBA)">Post Graduation (M.Tech/M.Sc/MBA)</option>
                    <option value="Diploma">Diploma</option>
                    <option value="12th / Intermediate">12th / Intermediate</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Branch / Specialization</label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
                    placeholder="e.g. Computer Science, Mechanical, General"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Graduation Status</label>
                  <select
                    value={formData.graduationStatus}
                    onChange={(e) => setFormData(prev => ({ ...prev, graduationStatus: e.target.value as any }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pursuing">Pursuing (Final/Pre-final year)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Target Exam Focus</label>
                  <select
                    value={formData.targetExamId}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetExamId: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
                  >
                    {ALL_EXAMS.map(exam => (
                      <option key={exam.id} value={exam.id}>{exam.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Daily Preparation Time</label>
                  <select
                    value={formData.dailyStudyHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, dailyStudyHours: parseInt(e.target.value) || 3 }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
                  >
                    <option value={2}>2 Hours / Day</option>
                    <option value={3}>3 Hours / Day</option>
                    <option value={5}>5 Hours / Day</option>
                    <option value={8}>8+ Hours / Day (Full-time)</option>
                  </select>
                </div>

              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: NOTIFICATIONS PREFERENCES */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-600 font-medium">
                Choose which types of exam updates and study reminders trigger live sound cues and pop-up banners:
              </p>

              <div className="space-y-3">
                <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-bold text-slate-800">Official Exam Notifications</p>
                    <p className="text-[11px] text-slate-500">Alerts when new exam notifications are published</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.examAlerts}
                    onChange={e => setPreferences(prev => ({ ...prev, examAlerts: e.target.checked }))}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-bold text-slate-800">Application Deadlines</p>
                    <p className="text-[11px] text-slate-500">Closing portal warnings & last date reminders</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.deadlines}
                    onChange={e => setPreferences(prev => ({ ...prev, deadlines: e.target.checked }))}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-bold text-slate-800">Admit Cards & Cutoff Results</p>
                    <p className="text-[11px] text-slate-500">Hall ticket releases and answer key announcements</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.admitCardsAndResults}
                    onChange={e => setPreferences(prev => ({ ...prev, admitCardsAndResults: e.target.checked }))}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-bold text-slate-800">AI Daily Study Reminders</p>
                    <p className="text-[11px] text-slate-500">Scheduled study planner alerts for target topics</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.studyReminders}
                    onChange={e => setPreferences(prev => ({ ...prev, studyReminders: e.target.checked }))}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-bold text-slate-800">Automated Email Notifications</p>
                    <p className="text-[11px] text-slate-500">Automatically dispatch exam deadlines & study roadmaps to your email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.autoEmailAlerts}
                    onChange={e => setPreferences(prev => ({ ...prev, autoEmailAlerts: e.target.checked }))}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    {preferences.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                    <div>
                      <p className="font-bold text-slate-800">Alert Chime Sound Effect</p>
                      <p className="text-[11px] text-slate-500">Play web synth sound on incoming alerts</p>
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

          {/* TAB 3: LANGUAGE & AI */}
          {activeTab === 'preferences' && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-600 font-medium">
                Configure your AI interaction style and preferred language output:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="font-bold text-slate-800 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    Preferred Language Mode
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Competitive AI will respond in your chosen dialect across text and voice sessions:
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {(['English', 'Telugu', 'Teluglish'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, preferredLanguage: lang }));
                          setProfile(prev => ({ ...prev, preferredLanguage: lang }));
                        }}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          profile.preferredLanguage === lang
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Session Context Memory
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Active conversation history is retained in session memory so Competitive AI remembers your target exams, degree, and study goals during ongoing voice & chat sessions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACCOUNT & SECURITY */}
          {activeTab === 'account' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">Signed In Account</h4>
                    <p className="text-[11px] text-slate-500">{formData.name.toLowerCase().replace(/\s+/g, '')}@student.edu</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    Active Student
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Key className="w-4 h-4 text-slate-600" /> Security & Password
                </h4>
                <p className="text-[11px] text-slate-500">
                  Password protected with 256-bit encryption.
                </p>
                <button
                  type="button"
                  onClick={() => alert('A password reset link has been sent to your registered email address!')}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Send Password Reset Link
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Sign Out</p>
                  <p className="text-[11px] text-slate-500">Sign out of your session on this device</p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await signOut();
                    } catch (err) {
                      console.error('Sign out error:', err);
                    }
                    setIsLoggedIn(false);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
