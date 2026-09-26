import React, { useState } from 'react';
import { ShieldAlert, Database, Bell, Cpu, Plus, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
import { ALL_EXAMS } from '../data/examsData';
import { NotificationItem } from '../types';

interface AdminPanelViewProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  notifications,
  setNotifications
}) => {
  const [activeTab, setActiveTab] = useState<'exams' | 'notifications' | 'system'>('exams');
  
  // Notification form
  const [notifTitle, setNotifTitle] = useState('');
  const [notifOrg, setNotifOrg] = useState('');
  const [notifVacancies, setNotifVacancies] = useState('1200+');
  const [notifLastDate, setNotifLastDate] = useState('2026-09-30');

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim()) return;

    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      title: notifTitle,
      organization: notifOrg || 'State Recruitment Board',
      category: 'APPSC State Exam',
      releaseDate: '2026-08-08',
      applyLastDate: notifLastDate,
      vacancies: notifVacancies,
      link: 'https://psc.ap.gov.in',
      stateFocus: 'AP',
      tag: 'Latest',
      isDemo: true
    };

    setNotifications(prev => [newNotif, ...prev]);
    setNotifTitle('');
    setNotifOrg('');
    alert('New Exam Notification published successfully!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-md text-white space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
          <span>Platform Management Console</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Admin Control Center
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm">
          Manage exam databases, broadcast job alerts, and monitor AI engine telemetry.
        </p>

        {/* Admin Tabs */}
        <div className="flex items-center gap-2 pt-2">
          {[
            { id: 'exams', label: 'Exam Repository' },
            { id: 'notifications', label: 'Job Alerts Broadcast' },
            { id: 'system', label: 'AI Engine Status' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Repository */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Active Competitive Exams Catalog ({ALL_EXAMS.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALL_EXAMS.map(e => (
              <div key={e.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{e.title}</h3>
                  <span className="text-[10px] text-blue-600 font-bold uppercase">{e.category}</span>
                </div>
                <p className="text-slate-600 line-clamp-2">{e.shortDescription}</p>
                <div className="text-[11px] text-slate-500 flex justify-between pt-1">
                  <span>Conducted by: {e.conductedBy}</span>
                  <span>{e.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Broadcast Job Alerts */}
      {activeTab === 'notifications' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            Broadcast New Recruitment Notification
          </h2>

          <form onSubmit={handleAddNotification} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Exam / Notification Title</label>
              <input
                type="text"
                required
                placeholder="e.g. APPSC Group I 2026 Official Notification"
                value={notifTitle}
                onChange={e => setNotifTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Organization</label>
                <input
                  type="text"
                  placeholder="e.g. APPSC / UPSC / RRB"
                  value={notifOrg}
                  onChange={e => setNotifOrg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Vacancies</label>
                <input
                  type="text"
                  value={notifVacancies}
                  onChange={e => setNotifVacancies(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Last Date to Apply</label>
                <input
                  type="date"
                  value={notifLastDate}
                  onChange={e => setNotifLastDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Alert</span>
            </button>
          </form>
        </div>
      )}

      {/* System & AI Engine Telemetry */}
      {activeTab === 'system' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600" />
            AI Service & Server Health
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-slate-500 block text-[10px]">Gemini AI SDK Status</span>
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active Server Connection
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="text-slate-500 block text-[10px]">Demo Mode Safeguard</span>
              <span className="font-bold text-blue-800">Automatic Fallback Ready</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
