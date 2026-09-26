import React, { useEffect } from 'react';
import { Bell, Clock, Award, FileText, CheckCircle2, Zap, X, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../types';

interface ToastNotificationProps {
  notification: NotificationItem | null;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  notification,
  onClose,
  onNavigate
}) => {
  if (!notification) return null;

  // Auto dismiss after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  // Audio cue using browser Web Audio API
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).AudioContext || (window as any).webkitAudioContext) {
        const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio context play error ignored
    }
  }, [notification]);

  const getIcon = () => {
    switch (notification.type) {
      case 'deadline':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'admit_card':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'result':
        return <Award className="w-5 h-5 text-emerald-600" />;
      case 'study_reminder':
        return <Clock className="w-5 h-5 text-purple-600" />;
      case 'quiz_readiness':
        return <Zap className="w-5 h-5 text-cyan-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBadgeStyle = () => {
    switch (notification.type) {
      case 'deadline':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'admit_card':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'result':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'study_reminder':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'quiz_readiness':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const handleActionClick = () => {
    if (notification.actionView) {
      onNavigate(notification.actionView);
    } else {
      onNavigate('notifications');
    }
    onClose();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm sm:max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 transition-all transform animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0">
            {getIcon()}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeStyle()}`}>
                ⚡ REAL-TIME ALERT: {notification.tag || 'New Update'}
              </span>
              <span className="text-[10px] text-slate-400">Just now</span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {notification.title}
            </h4>

            {notification.message && (
              <p className="text-xs text-slate-600 line-clamp-2">
                {notification.message}
              </p>
            )}

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleActionClick}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>{notification.actionLabel || 'View Update'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
