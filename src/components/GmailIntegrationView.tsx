import React, { useState, useEffect, FormEvent } from 'react';
import {
  Mail,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
  Calendar,
  ShieldCheck,
  LogOut,
  Inbox,
  FileText,
  ExternalLink
} from 'lucide-react';
import {
  signInWithGoogle,
  reconnectGmail,
  logoutGoogle,
  fetchRecentEmails,
  sendEmailViaGmail,
  getAccessToken,
  initAuthListener,
  GmailMessageSummary,
  auth
} from '../lib/gmailService';
import { StudentProfile } from '../types';

interface GmailIntegrationViewProps {
  profile: StudentProfile;
  onNavigateToView?: (view: string) => void;
}

export const GmailIntegrationView = ({
  profile
}: GmailIntegrationViewProps) => {
  const [googleUser, setGoogleUser] = useState<any>(auth.currentUser);
  const [hasToken, setHasToken] = useState<boolean>(!!getAccessToken());
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Email fetching state
  const [emails, setEmails] = useState<GmailMessageSummary[]>([]);
  const [isLoadingEmails, setIsLoadingEmails] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Send Email State
  const [recipient, setRecipient] = useState(googleUser?.email || '');
  const [subject, setSubject] = useState(`[Competitive World] Study Roadmap for ${profile.name || 'Student'}`);
  const [body, setBody] = useState(
    `Hello ${profile.name || 'Student'},\n\nHere is your requested exam prep update from Competitive World AI:\n\n` +
    `• Target Exam Focus: ${profile.targetExamId?.toUpperCase() || 'General Competitive Exams'}\n` +
    `• Daily Study Hours: ${profile.dailyStudyHours} Hours/Day\n` +
    `• Preferred Language: ${profile.preferredLanguage}\n` +
    `• Domicile State: ${profile.state}\n\n` +
    `Stay consistent with your daily study planner and mock quizzes on Competitive World!`
  );

  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
  const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(typeof window !== 'undefined' && window.self !== window.top);
  }, []);

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  useEffect(() => {
    const unsubscribe = initAuthListener(
      (user, token) => {
        setGoogleUser(user);
        setHasToken(!!token);
        if (user?.email && !recipient) {
          setRecipient(user.email);
        }
      },
      () => {
        setGoogleUser(null);
        setHasToken(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    setEmailError(null);
    setSendErrorMessage(null);
    try {
      const res = await signInWithGoogle();
      if (res) {
        setGoogleUser(res.user);
        setHasToken(true);
        if (res.user.email) setRecipient(res.user.email);
        loadRecentEmails();
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setEmailError(err.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleReconnect = async () => {
    setIsLoadingAuth(true);
    setEmailError(null);
    setSendErrorMessage(null);
    try {
      const res = await reconnectGmail();
      if (res) {
        setGoogleUser(res.user);
        setHasToken(true);
        if (res.user.email) setRecipient(res.user.email);
        loadRecentEmails();
      }
    } catch (err: any) {
      console.error('Google Reconnect failed:', err);
      setSendErrorMessage(err.message || 'Failed to reconnect with Google. Please try again.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setGoogleUser(null);
    setHasToken(false);
    setEmails([]);
  };

  const loadRecentEmails = async () => {
    const token = getAccessToken();
    if (!token) {
      setHasToken(false);
      setEmailError('No active Google access token found. Please sign in with Google to view your inbox.');
      return;
    }
    setIsLoadingEmails(true);
    setEmailError(null);
    try {
      const msgs = await fetchRecentEmails();
      setEmails(msgs);
    } catch (err: any) {
      console.error('Failed to load Gmail messages:', err);
      const msg = err.message || 'Could not load emails from Gmail.';
      if (msg.includes('401') || msg.includes('token') || msg.includes('expired')) {
        setHasToken(false);
      }
      setEmailError(msg);
    } finally {
      setIsLoadingEmails(false);
    }
  };

  const handleRequestSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSendSuccessMessage(null);
    setSendErrorMessage(null);
    if (!recipient.trim() || !subject.trim() || !body.trim()) {
      setSendErrorMessage('Please fill in all email fields (Recipient, Subject, and Body).');
      return;
    }
    // Show user confirmation dialog before executing sendEmailViaGmail
    setShowConfirmDialog(true);
  };

  const executeSendEmail = async () => {
    setShowConfirmDialog(false);
    setIsSending(true);
    setSendSuccessMessage(null);
    setSendErrorMessage(null);
    try {
      const res = await sendEmailViaGmail(recipient.trim(), subject.trim(), body.trim());
      setSendSuccessMessage(`Email sent successfully via Gmail API! Message ID: ${res.id}`);
    } catch (err: any) {
      console.error('Failed to send email:', err);
      const msg = err.message || 'Error sending email via Gmail API.';
      if (msg.includes('401') || msg.includes('token') || msg.includes('expired')) {
        setHasToken(false);
      }
      setSendErrorMessage(msg);
    } finally {
      setIsSending(false);
    }
  };

  const loadPresetTemplate = (type: 'roadmap' | 'deadline' | 'planner') => {
    if (type === 'roadmap') {
      setSubject(`[Roadmap] ${profile.name}'s Preparation Plan for ${profile.targetExamId?.toUpperCase() || 'Exams'}`);
      setBody(
        `Hi ${profile.name},\n\nHere is your personalized roadmap overview from Competitive World:\n` +
        `1. Phase 1: Foundation Building & Syllabus Coverage\n` +
        `2. Phase 2: Subject Mock Quizzes & Speed Drills\n` +
        `3. Phase 3: Revision & Previous Year Paper Analysis\n\n` +
        `Daily Goal: ${profile.dailyStudyHours} hours.\n\nKeep pushing forward!`
      );
    } else if (type === 'deadline') {
      setSubject(`[Exam Alert] Key Application Deadlines & Hall Ticket Reminders`);
      setBody(
        `Important Exam Notification Summary:\n\n` +
        `• APPSC Group II Services - Application Closing Soon\n` +
        `• SSC CGL 2026 Tier 1 - Check Exam City Intimation\n` +
        `• UPSC Civil Services - Preliminary Syllabus & Date Alert\n\n` +
        `Visit Competitive World portal to track live dates and eligibility.`
      );
    } else if (type === 'planner') {
      setSubject(`[Daily Study Schedule] AI Planner for ${profile.name}`);
      setBody(
        `Daily Study Schedule for ${profile.name}:\n\n` +
        `• Morning Session (8:00 AM - 10:30 AM): General Awareness & Polity\n` +
        `• Afternoon Session (2:00 PM - 4:00 PM): Quantitative Aptitude / Reasoning\n` +
        `• Evening Session (7:00 PM - 9:00 PM): Mock Quiz & Weak Topic Revision\n\n` +
        `Language: ${profile.preferredLanguage}`
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>Official Gmail Integration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Gmail & Study Alert Dispatcher
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect your Google account to receive exam alerts, dispatch personalized study roadmaps directly to your Gmail inbox, and monitor exam notifications.
            </p>
          </div>

          {/* Connection Status / Auth Control */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col items-center md:items-end text-center md:text-right gap-2 w-full md:w-auto">
            {googleUser && hasToken ? (
              <>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Connected to Gmail</span>
                </div>
                <p className="text-xs text-white font-semibold truncate max-w-[200px]">
                  {googleUser.email}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={handleReconnect}
                    disabled={isLoadingAuth}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                    title="Force Google to prompt consent and grant Gmail permissions again"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAuth ? 'animate-spin' : ''}`} />
                    <span>Reconnect Gmail</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-slate-300">Connect Google to enable Gmail features</p>
                <button
                  onClick={handleSignIn}
                  disabled={isLoadingAuth}
                  className="gsi-material-button w-full sm:w-auto px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all border border-slate-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{isLoadingAuth ? 'Connecting...' : 'Sign in with Google'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Standalone Tab Notice Banner for Google OAuth */}
      {(!googleUser || !hasToken) && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Important for Google OAuth Sign-In:</p>
              <p className="text-amber-800 font-medium">
                Browsers restrict Google OAuth popup windows inside embedded preview frames. If popup fails or closes immediately, click "Open in Standalone Tab" below to log in directly.
              </p>
            </div>
          </div>
          <button
            onClick={openInNewTab}
            className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors flex-shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Standalone Tab</span>
          </button>
        </div>
      )}

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Send Email via Gmail API */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Send Study Notes & Alerts
                </h2>
                <p className="text-xs text-slate-500">
                  Dispatch roadmaps & exam updates directly via Gmail API
                </p>
              </div>
            </div>
          </div>

          {/* Quick Template Selector */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-700">Quick Email Templates:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadPresetTemplate('roadmap')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Target Roadmap</span>
              </button>

              <button
                type="button"
                onClick={() => loadPresetTemplate('deadline')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Exam Deadlines</span>
              </button>

              <button
                type="button"
                onClick={() => loadPresetTemplate('planner')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Daily Schedule</span>
              </button>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleRequestSend} className="space-y-4 text-xs flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 mb-1 block">Recipient Email Address</label>
                <input
                  type="email"
                  required
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                  placeholder="e.g. student@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Email subject line"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Message Content</label>
                <textarea
                  required
                  rows={6}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-medium text-slate-900 resize-none"
                />
              </div>
            </div>

            {/* Status Messages */}
            {sendSuccessMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{sendSuccessMessage}</span>
              </div>
            )}

            {sendErrorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{sendErrorMessage}</span>
                </div>
                {(sendErrorMessage.includes('403') || sendErrorMessage.includes('SCOPE') || sendErrorMessage.includes('permission') || sendErrorMessage.includes('Reconnect')) && (
                  <button
                    type="button"
                    onClick={handleReconnect}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reconnect Gmail & Grant Scope</span>
                  </button>
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending || !hasToken}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                  hasToken
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {!hasToken
                    ? 'Sign in with Google to Send Email'
                    : isSending
                    ? 'Sending via Gmail API...'
                    : 'Send Email via Gmail'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Recent Gmail Messages */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <Inbox className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Gmail Inbox Feed
                </h2>
                <p className="text-xs text-slate-500">
                  Read exam notification emails from your Gmail account
                </p>
              </div>
            </div>

            <button
              onClick={loadRecentEmails}
              disabled={isLoadingEmails || !hasToken}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Refresh Gmail Inbox"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingEmails ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {!hasToken ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Google Sign-in Required</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Connect your Google account using the button above to view your recent Gmail messages and official notifications.
              </p>
              <button
                onClick={handleSignIn}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                Sign in with Google
              </button>
            </div>
          ) : isLoadingEmails ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-xs font-semibold text-slate-600">Fetching Gmail inbox messages...</p>
            </div>
          ) : emailError ? (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Error reading Gmail: {emailError}</span>
              </div>
              <button
                onClick={loadRecentEmails}
                className="px-3 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-bold"
              >
                Retry
              </button>
            </div>
          ) : emails.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <FileText className="w-8 h-8 text-slate-400" />
              <p className="text-xs font-bold text-slate-700">No emails loaded yet</p>
              <p className="text-[11px] text-slate-500">Click the 'Refresh' button above to read recent inbox messages.</p>
              <button
                onClick={loadRecentEmails}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm mt-2"
              >
                Load Inbox Messages
              </button>
            </div>
          ) : (
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[460px] pr-1">
              {emails.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 transition-colors space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-xs truncate max-w-[280px]">
                      {msg.subject}
                    </h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {msg.date.split(' ').slice(0, 4).join(' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-600 font-semibold truncate">
                    From: {msg.from}
                  </p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {msg.snippet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mandatory User Confirmation Dialog before sending email */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center gap-3 text-blue-600">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Confirm Sending Email
              </h3>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p><strong className="text-slate-800">Recipient:</strong> {recipient}</p>
              <p><strong className="text-slate-800">Subject:</strong> {subject}</p>
              <p className="line-clamp-3"><strong className="text-slate-800">Preview:</strong> {body}</p>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Are you sure you want to send this email via your connected Gmail account?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeSendEmail}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
