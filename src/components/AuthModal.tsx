import React, { useState } from 'react';
import { X, Globe, Mail, Lock, User, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { StudentProfile } from '../types';
import { signInWithGoogle } from '../supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name?: string) => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  profile,
  setProfile
}) => {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      // onLoginSuccess will be handled by the auth state listener in App.tsx
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0F172A] text-white space-y-2 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg mb-2">
            <Globe className="w-5 h-5 text-white" />
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Welcome to GovFlow
          </h2>
          <p className="text-xs text-slate-300">
            Sign in to access your saved study roadmaps, alerts, and performance statistics
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          
          <div className="pt-2">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>{isLoading ? 'Connecting...' : 'Continue with Google'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
