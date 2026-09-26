import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Square, RefreshCw, X, Sparkles, Send, AlertCircle, Headphones } from 'lucide-react';
import { StudentProfile, ChatMessage } from '../types';
import { isOutOfTopicQuery, OUT_OF_TOPIC_REPLY, getAcademicAnswer } from '../data/studyKnowledgeEngine';

interface AIVoiceAgentModalProps {
  profile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSyncChatMessage: (userText: string, aiText: string) => void;
  chatMessages?: ChatMessage[];
}

// Clean markdown characters so the SpeechSynthesis doesn't read out symbols like "asterisk asterisk"
function cleanTextForSpeech(raw: string): string {
  return raw
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1') // italic
    .replace(/#{1,6}\s+/g, '') // headers
    .replace(/`([^`]+)`/g, '$1') // code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/[-•*]\s+/g, ', ') // bullets to comma pauses
    .replace(/\n+/g, '. ') // newlines to sentence ends
    .replace(/\s+/g, ' ')
    .trim();
}

export const AIVoiceAgentModal: React.FC<AIVoiceAgentModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSyncChatMessage,
  chatMessages = []
}) => {
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [userTranscript, setUserTranscript] = useState('');
  const [aiTranscript, setAiTranscript] = useState('Tap the microphone or type below to speak with GovFlow AI.');
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>('');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const silenceTimerRef = useRef<any>(null);

  // Check speech recognition support once on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSpeechSupported(false);
        setErrorMessage('Speech recognition is not natively supported in this browser. You can type queries below and hear audio answers!');
      }
    }
  }, []);

  // Cleanup speech synthesis and recognition when modal closes or unmounts
  useEffect(() => {
    return () => {
      stopVoice();
    };
  }, [isOpen]);

  const speakText = (text: string) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceState('idle');
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const cleaned = cleanTextForSpeech(text);
      if (!cleaned) {
        setVoiceState('idle');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Select matching voice (Indian English or Telugu or default)
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const langCode = profile.preferredLanguage === 'Telugu' ? 'te' : 'en';
        const matchedVoice = voices.find(v => v.lang.toLowerCase().includes(langCode) || v.lang.toLowerCase().includes('in'));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      utterance.onstart = () => {
        setVoiceState('speaking');
      };

      utterance.onend = () => {
        setVoiceState('idle');
        utteranceRef.current = null;
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        setVoiceState('idle');
        utteranceRef.current = null;
      };

      // Prevent Chromium garbage collection bug
      utteranceRef.current = utterance;
      (window as any).__activeUtterance = utterance;

      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Voice speak error:', e);
      setVoiceState('idle');
    }
  };

  const processVoiceQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) {
      setVoiceState('idle');
      return;
    }

    setVoiceState('thinking');
    setErrorMessage(null);

    // Client-side immediate check for out-of-topic
    if (isOutOfTopicQuery(trimmed)) {
      setAiTranscript(OUT_OF_TOPIC_REPLY);
      onSyncChatMessage(trimmed, OUT_OF_TOPIC_REPLY);
      speakText(OUT_OF_TOPIC_REPLY);
      return;
    }

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          language: profile.preferredLanguage,
          studentProfile: profile,
          history: chatMessages
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const reply = data.responseText || 'GovFlow AI is ready to guide your exam path!';

      setAiTranscript(reply);
      onSyncChatMessage(trimmed, reply);
      speakText(reply);
    } catch (err) {
      console.error('Voice AI network error, using local knowledge engine:', err);
      const fallbackReply = getAcademicAnswer(trimmed, profile, profile.preferredLanguage);
      setAiTranscript(fallbackReply);
      onSyncChatMessage(trimmed, fallbackReply);
      speakText(fallbackReply);
    }
  };

  const startListening = async () => {
    setErrorMessage(null);

    // Stop ongoing speech
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage('Speech recognition is not supported in this browser. Please use Chrome/Edge or type your question below.');
      return;
    }

    // Request microphone permission explicitly
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (permErr: any) {
      console.warn('Microphone permission check failed:', permErr);
      setErrorMessage('Microphone access was denied. Please allow microphone permission in your browser URL bar.');
      setVoiceState('idle');
      return;
    }

    try {
      // Abort any existing instance
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }

      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = profile.preferredLanguage === 'Telugu' ? 'te-IN' : 'en-IN';

      transcriptRef.current = '';
      setUserTranscript('');

      rec.onstart = () => {
        setVoiceState('listening');
        setErrorMessage(null);
      };

      rec.onresult = (event: any) => {
        let final = '';
        let interim = '';

        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript + ' ';
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const fullCurrent = (final + interim).trim();
        if (fullCurrent) {
          transcriptRef.current = fullCurrent;
          setUserTranscript(fullCurrent);
        }

        // Auto-silence timer: if user stops speaking for 2.0 seconds, auto-stop and process
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
        silenceTimerRef.current = setTimeout(() => {
          if (rec) {
            try { rec.stop(); } catch (e) {}
          }
        }, 2000);
      };

      rec.onerror = (event: any) => {
        console.warn('Speech recognition error event:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage('Microphone access is blocked. Please enable microphone permission in your browser address bar.');
          setVoiceState('idle');
        } else if (event.error === 'no-speech') {
          setVoiceState('idle');
          if (!transcriptRef.current.trim()) {
            setErrorMessage('No speech detected. Tap the mic and speak clearly.');
          }
        } else if (event.error === 'network') {
          setErrorMessage('Network connection error for speech recognition. You can type below instead.');
          setVoiceState('idle');
        } else if (event.error !== 'aborted') {
          setVoiceState('idle');
        }
      };

      rec.onend = () => {
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        const spoken = transcriptRef.current.trim();
        if (spoken) {
          processVoiceQuery(spoken);
        } else {
          setVoiceState('idle');
        }
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setErrorMessage('Could not initialize speech recognition. Please try typing your question below.');
      setVoiceState('idle');
    }
  };

  const handleDoneSpeaking = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    const spoken = transcriptRef.current.trim();
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    if (spoken) {
      processVoiceQuery(spoken);
    } else {
      setVoiceState('idle');
    }
  };

  const stopVoice = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) {}
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setVoiceState('idle');
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    const text = typedInput.trim();
    setUserTranscript(text);
    setTypedInput('');
    processVoiceQuery(text);
  };

  const handleQuickPrompt = (promptText: string) => {
    setUserTranscript(promptText);
    processVoiceQuery(promptText);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-5 sm:p-7 shadow-2xl relative space-y-4 sm:space-y-5 text-center max-h-[94vh] flex flex-col overflow-y-auto my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                GovFlow Voice AI
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold">
                  Live Voice & Audio
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">Language: {profile.preferredLanguage === 'Telugu' ? 'Telugu / Teluglish' : 'English'}</p>
            </div>
          </div>
          <button 
            onClick={() => { stopVoice(); onClose(); }} 
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold">
            {voiceState === 'idle' && <span className="text-slate-700">🎤 Tap microphone below to speak</span>}
            {voiceState === 'listening' && (
              <span className="text-rose-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                Listening to you... (Speak now)
              </span>
            )}
            {voiceState === 'thinking' && (
              <span className="text-amber-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                GovFlow AI is thinking...
              </span>
            )}
            {voiceState === 'speaking' && (
              <span className="text-blue-600 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                GovFlow AI is speaking...
              </span>
            )}
          </div>
        </div>

        {/* Central Large Mic Button with Waveform Animation */}
        <div className="relative flex flex-col justify-center items-center py-4">
          <div className="relative flex justify-center items-center">
            
            {/* Animated Waveform Rings */}
            {voiceState === 'listening' && (
              <>
                <div className="absolute w-36 h-36 rounded-full bg-rose-500/20 animate-ping pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full bg-rose-500/10 animate-pulse pointer-events-none" />
              </>
            )}

            {voiceState === 'speaking' && (
              <>
                <div className="absolute w-36 h-36 rounded-full bg-blue-500/20 animate-ping pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full bg-blue-500/10 animate-pulse pointer-events-none" />
              </>
            )}

            <button
              onClick={voiceState === 'idle' ? startListening : voiceState === 'listening' ? handleDoneSpeaking : stopVoice}
              className={`w-28 h-28 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform active:scale-95 cursor-pointer z-10 ${
                voiceState === 'listening'
                  ? 'bg-rose-600 shadow-rose-600/40 ring-8 ring-rose-500/20 scale-105'
                  : voiceState === 'speaking'
                  ? 'bg-blue-600 shadow-blue-600/40 ring-8 ring-blue-500/20'
                  : voiceState === 'thinking'
                  ? 'bg-amber-500 shadow-amber-500/30'
                  : 'bg-gradient-to-tr from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 shadow-purple-600/30'
              }`}
              title={voiceState === 'idle' ? 'Start Speaking' : voiceState === 'listening' ? 'Done Speaking' : 'Stop Audio'}
            >
              {voiceState === 'listening' ? (
                <div className="flex flex-col items-center">
                  <Mic className="w-10 h-10 text-white animate-pulse" />
                  <span className="text-[10px] font-bold mt-1">Tap Done</span>
                </div>
              ) : voiceState === 'speaking' ? (
                <Square className="w-10 h-10 text-white" />
              ) : voiceState === 'thinking' ? (
                <RefreshCw className="w-10 h-10 text-white animate-spin" />
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
            </button>
          </div>

          {voiceState === 'listening' && (
            <p className="text-xs text-rose-600 font-semibold mt-3 animate-pulse">
              Speak now! Tap the button when you are done speaking.
            </p>
          )}
        </div>

        {/* Transcripts Display Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-left max-h-48 overflow-y-auto">
          {userTranscript && (
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">You Said:</span>
              <p className="text-xs text-slate-800 font-medium">"{userTranscript}"</p>
            </div>
          )}

          <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-purple-700 uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" /> GovFlow AI Answer:
              </span>
              {voiceState === 'speaking' && (
                <span className="text-[10px] font-semibold text-blue-600 animate-pulse">🔊 Speaking</span>
              )}
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-normal whitespace-pre-line">{aiTranscript}</p>
          </div>
        </div>

        {/* Quick Test Prompt Chips */}
        <div className="space-y-1.5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Quick Suggestions (Tap to ask):</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Explain Dijkstra algorithm',
              'What is Article 32 of Constitution?',
              'What are Eigenvalues in Math?',
              'APPSC Group 2 eligibility & pattern',
              'GATE 2026 marks distribution',
              'Who was Potti Sreeramulu?',
              'Tell me a movie story (Out of Topic test)'
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickPrompt(chip)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-slate-200 text-[11px] font-medium text-slate-700 transition-colors text-left"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Text Input Fallback */}
        <form onSubmit={handleSendText} className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <input
            type="text"
            placeholder="Or type your question here..."
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 bg-white"
          />
          <button
            type="submit"
            disabled={!typedInput.trim() || voiceState === 'thinking'}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send & Speak</span>
          </button>
        </form>

        {/* Footer Controls Bar */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={() => {
              if (!isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              setIsMuted(!isMuted);
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1.5 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span>{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          {voiceState !== 'idle' && (
            <button
              type="button"
              onClick={stopVoice}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Stop Voice</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => speakText(aiTranscript)}
            disabled={voiceState === 'speaking' || isMuted}
            className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 disabled:opacity-40 text-blue-700 border border-blue-200 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Replay Voice</span>
          </button>
        </div>

      </div>
    </div>
  );
};
