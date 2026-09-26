import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  GitCompare,
  Map,
  Calendar,
  Bot,
  Mic,
  BrainCircuit,
  BarChart3,
  Bell,
  Mail,
  ShieldCheck,
  User,
  Settings,
  X,
  Building2,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenVoice?: () => void;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpen,
  onClose,
  onOpenVoice,
  onOpenAuth,
  onOpenProfile
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Exams', icon: Compass, badge: 'GATE & APPSC' },
    { id: 'career-finder', label: 'AI Career Finder', icon: Sparkles, highlight: true },
    { id: 'compare', label: 'Career Comparison', icon: GitCompare },
    { id: 'roadmap', label: 'My Roadmap', icon: Map },
    { id: 'planner', label: 'AI Study Planner', icon: Calendar },
    { id: 'chat', label: 'Ask GovFlow AI', icon: Bot },
    { id: 'voice', label: 'Talk to Voice AI', icon: Mic, voiceBadge: true },
    { id: 'quiz', label: 'AI Quiz Generator', icon: BrainCircuit },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'admin', label: 'Admin Panel', icon: ShieldCheck },
    { id: 'profile', label: 'Profile & Settings', icon: User }
  ];

  const handleSelect = (id: string) => {
    if (id === 'voice') {
      if (onOpenVoice) onOpenVoice();
    } else if (id === 'profile' || id === 'settings') {
      if (onOpenProfile) onOpenProfile();
      else onNavigate('profile');
    } else if (id === 'explore') {
      onNavigate('exam_explorer');
    } else if (id === 'career-finder') {
      onNavigate('career_finder');
    } else {
      onNavigate(id);
    }
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0F172A] border-r border-slate-800 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between shadow-xl`}
      >
        {/* Top Header */}
        <div>
          <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-sm tracking-wide">
                Navigation Menu
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-8.5rem)] scrollbar-thin">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id ||
                (item.id === 'explore' && currentView === 'exam_explorer') ||
                (item.id === 'career-finder' && currentView === 'career_finder');

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/30'
                      : item.highlight
                      ? 'bg-blue-950/40 text-blue-300 hover:bg-blue-900/50 border border-blue-800/50'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {item.badge}
                    </span>
                  )}

                  {item.voiceBadge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">
                      Voice
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom AP State & National Tag */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs">
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>APPSC & Central Focus</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tailored for GATE, APPSC Groups I-IV, UPSC, RRB & SSC.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
