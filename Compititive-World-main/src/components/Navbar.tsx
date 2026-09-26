import React, { useState, useEffect } from 'react';
import { Sparkles, Mic, Bot, Bell, Globe, User, Menu, Search, X, Check, Shield } from 'lucide-react';
import { StudentProfile, NotificationItem } from '../types';

interface NavbarProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onOpenVoice: () => void;
  onOpenChat: () => void;
  onNavigate: (view: string) => void;
  notifications: NotificationItem[];
  onToggleSidebar: () => void;
  onOpenAuth: () => void;
  onOpenProfile?: () => void;
  isLoggedIn: boolean;
  activeView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  setProfile,
  onOpenVoice,
  onOpenChat,
  onNavigate,
  notifications,
  onToggleSidebar,
  onOpenAuth,
  onOpenProfile,
  isLoggedIn
}) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const handleLanguageChange = (lang: 'English' | 'Telugu' | 'Teluglish') => {
    setProfile(prev => ({ ...prev, preferredLanguage: lang }));
    setShowLangDropdown(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0F172A] border-b border-slate-800 text-white shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors focus:outline-none flex-shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 cursor-pointer group select-none min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-sm sm:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-blue-200 truncate max-w-[120px] xs:max-w-[160px] sm:max-w-none">
                  COMPETITIVE
                </span>
                <span className="hidden xs:inline-block font-extrabold text-sm sm:text-lg tracking-tight text-blue-400">
                  WORLD
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-md">
                  AI
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-slate-400 font-medium tracking-wide">
                Exam & Career Companion
              </p>
            </div>
          </div>
        </div>

        {/* Center: Quick Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search exams (GATE, APPSC, SSC, RRB)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                onNavigate('explore');
              }
            }}
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-800/80 border border-slate-700/80 rounded-full text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Right: AI Actions, Language, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Voice Agent Button */}
          <button
            onClick={onOpenVoice}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
            title="Talk to Competitive AI Voice Mentor"
          >
            <Mic className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span className="hidden sm:inline">Talk to AI</span>
            <span className="inline sm:hidden">Voice</span>
          </button>

          {/* AI Chatbot Button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-all hover:text-white"
            title="Open Competitive AI Chatbot"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span className="hidden md:inline">Ask AI</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
              title="Select Language"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="uppercase text-xs font-semibold">{profile.preferredLanguage.substring(0, 2)}</span>
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 z-50 text-xs text-slate-200">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                  Language Mode
                </div>
                {(['English', 'Telugu', 'Teluglish'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="w-full px-3 py-2 text-left hover:bg-slate-700 flex items-center justify-between transition-colors"
                  >
                    <span>{lang}</span>
                    {profile.preferredLanguage === lang && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
              }}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white relative transition-colors"
              aria-label="View Exam Notifications"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce shadow-xs">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-blue-400" /> Real-time Alerts ({notifications.filter(n => !n.isRead).length} Unread)
                  </span>
                  <button
                    onClick={() => {
                      setShowNotifDropdown(false);
                      onNavigate('notifications');
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                  {notifications.slice(0, 5).map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        setShowNotifDropdown(false);
                        if (notif.actionView) {
                          onNavigate(notif.actionView);
                        } else {
                          onNavigate('notifications');
                        }
                      }}
                      className={`p-3 hover:bg-slate-800/50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-blue-900/10' : ''}`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[10px]">
                          {notif.tag || 'Alert'}
                        </span>
                        <span className="text-slate-400 text-[10px]">{notif.timestamp || notif.releaseDate}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-100 line-clamp-2">
                        {notif.title}
                      </p>
                      {notif.message && (
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {notif.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-slate-800/40 border-t border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setShowNotifDropdown(false);
                      onNavigate('notifications');
                    }}
                    className="text-xs text-blue-400 hover:underline font-semibold"
                  >
                    Manage Notification Preferences & Tracked Exams →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Auth Button */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                if (onOpenProfile) onOpenProfile();
                else onNavigate('profile');
              }}
              className="p-1.5 rounded-full bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all flex items-center gap-2"
              title="My Profile & Settings"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'S'}
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-sm"
            >
              Sign In
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
