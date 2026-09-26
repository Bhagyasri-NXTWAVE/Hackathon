import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Copy, Check, RotateCcw, Trash2, Sparkles, Loader2, Mic } from 'lucide-react';
import { ChatMessage, StudentProfile } from '../types';
import { getAcademicAnswer } from '../data/studyKnowledgeEngine';

interface AIChatbotViewProps {
  profile: StudentProfile;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onOpenVoice: () => void;
}

export const AIChatbotView: React.FC<AIChatbotViewProps> = ({
  profile,
  chatMessages,
  setChatMessages,
  onOpenVoice
}) => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'I am a B.Tech 2nd year CSE student. How do I start preparing for GATE 2027?',
    'What are the eligibility and syllabus details for APPSC Group II Services?',
    'How do I balance college studies with SSC CGL & Railway exam preparation?',
    'Can you explain the APPSC Group 1 selection pattern in Telugu?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: profile.preferredLanguage,
          studentProfile: profile,
          history: chatMessages
        })
      });
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.responseText || 'GovFlow AI is ready to help you succeed!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackText = getAcademicAnswer(text, profile, profile.preferredLanguage);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: '1',
        sender: 'ai',
        text: `Hello ${profile.name || 'Student'}! I am GovFlow AI, your personal competitive exam & career mentor. Ask me anything about GATE, APPSC Groups I-IV, UPSC, SSC, RRB, Banking, eligibility rules, or study planning!`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto h-[calc(100vh-6rem)] flex flex-col justify-between space-y-4">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-900 flex items-center gap-2">
              🤖 GovFlow AI
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                AI Exam Mentor
              </span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>English • Government Exam AI</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Session Memory Active ({chatMessages.length} Turns)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => handleSendMessage('Can you summarize our session memory and recap my key target exams & action steps?')}
            className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Summarize conversation memory"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Recap Memory</span>
          </button>

          <button
            onClick={onOpenVoice}
            className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Switch to Voice Mode"
          >
            <Mic className="w-4 h-4 text-purple-600 animate-pulse" />
            <span className="hidden sm:inline">Talk via Voice</span>
          </button>

          <button
            onClick={clearChat}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Context Follow-Up Chips */}
      {chatMessages.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 flex-shrink-0">Memory Follow-ups:</span>
          <button
            onClick={() => handleSendMessage('What are the exact eligibility criteria for the exam we just discussed?')}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium flex-shrink-0 transition-colors"
          >
            📋 Check Eligibility
          </button>
          <button
            onClick={() => handleSendMessage('What salary and job perks can I expect for that post?')}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium flex-shrink-0 transition-colors"
          >
            💰 Salary & Growth
          </button>
          <button
            onClick={() => handleSendMessage('Give me a 4-week study routine for the subjects we discussed.')}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium flex-shrink-0 transition-colors"
          >
            📅 4-Week Study Schedule
          </button>
        </div>
      )}

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        
        {/* Suggested Prompts if short history */}
        {chatMessages.length <= 2 && (
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 mb-4 space-y-2">
            <span className="text-xs font-bold text-blue-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Suggested Quick Prompts:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="p-2.5 rounded-xl bg-white hover:bg-blue-100/50 text-slate-700 hover:text-slate-900 text-left transition-colors border border-blue-100"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-indigo-600 text-white'
            }`}>
              {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4 text-white" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-line">{msg.text}</p>
              
              <div className="flex items-center justify-between text-[10px] opacity-70 pt-1 border-t border-slate-300/40">
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:text-slate-900 flex items-center gap-1"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-100 text-slate-600 text-xs flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span>GovFlow AI is typing personalized guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-2 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask GovFlow AI (e.g. How to prepare GATE CSE, APPSC syllabus...)"
          className="flex-1 px-4 py-3 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
        />
        
        <button
          onClick={() => handleSendMessage()}
          disabled={loading || !inputText.trim()}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
