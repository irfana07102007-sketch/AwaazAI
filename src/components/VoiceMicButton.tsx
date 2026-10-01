import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Square, Send, Keyboard, Sparkles, AlertCircle } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { speechRecognizer, isSpeechRecognitionSupported } from '../utils/speech';

interface VoiceMicButtonProps {
  currentLang: LanguageCode;
  onTranscriptReady: (text: string) => void;
  isProcessing: boolean;
}

export const VoiceMicButton: React.FC<VoiceMicButtonProps> = ({
  currentLang,
  onTranscriptReady,
  isProcessing,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');

  // Stop listening on unmount
  useEffect(() => {
    return () => {
      speechRecognizer.stopListening();
    };
  }, []);

  const handleStartVoice = () => {
    setErrorMessage(null);
    setCurrentTranscript('');

    if (!isSpeechRecognitionSupported()) {
      setErrorMessage(
        'Speech recognition is not directly supported in this browser window. You can type your request or click any of the helpful suggestions below.'
      );
      setShowTypeInput(true);
      return;
    }

    setIsListening(true);

    speechRecognizer.startListening(
      currentLang,
      (result) => {
        setCurrentTranscript(result.transcript);
        if (result.isFinal && result.transcript.trim()) {
          setIsListening(false);
          onTranscriptReady(result.transcript.trim());
          setCurrentTranscript('');
        }
      },
      (error) => {
        console.warn('Voice recognition error:', error);
        setErrorMessage(error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleStopVoice = () => {
    speechRecognizer.stopListening();
    setIsListening(false);
    if (currentTranscript.trim()) {
      onTranscriptReady(currentTranscript.trim());
      setCurrentTranscript('');
    }
  };

  const handleSendTyped = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!typedMessage.trim() || isProcessing) return;
    onTranscriptReady(typedMessage.trim());
    setTypedMessage('');
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Listening status & recognized transcript card */}
      {isListening && (
        <div className="w-full mb-4 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-black tracking-wider uppercase text-amber-900">
                {t.listening}
              </span>
            </div>
            {/* Audio Wave Bars */}
            <div className="flex items-end gap-1 h-4">
              <span className="w-1 bg-amber-600 rounded-full animate-bounce h-3 [animation-delay:0ms]" />
              <span className="w-1 bg-amber-600 rounded-full animate-bounce h-4 [animation-delay:150ms]" />
              <span className="w-1 bg-amber-600 rounded-full animate-bounce h-2 [animation-delay:300ms]" />
              <span className="w-1 bg-amber-600 rounded-full animate-bounce h-4 [animation-delay:100ms]" />
              <span className="w-1 bg-amber-600 rounded-full animate-bounce h-3 [animation-delay:250ms]" />
            </div>
          </div>

          <p className="text-sm font-semibold text-stone-900 min-h-[1.5rem] italic">
            {currentTranscript || t.listeningHint}
          </p>

          <div className="mt-3 flex justify-end">
            <button
              onClick={handleStopVoice}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{t.stopListening}</span>
            </button>
          </div>
        </div>
      )}

      {/* Error Notice */}
      {errorMessage && (
        <div className="w-full mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-800 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-stone-400 hover:text-stone-600 font-bold ml-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary Voice Button Area */}
      {!showTypeInput ? (
        <div className="flex flex-col items-center py-2">
          {/* Main Huge Microphone Button */}
          <div className="relative">
            {/* Pulsing rings when listening */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping duration-1000 -m-3" />
                <div className="absolute inset-0 rounded-full bg-orange-400/30 animate-pulse duration-700 -m-6" />
              </>
            )}

            <button
              onClick={isListening ? handleStopVoice : handleStartVoice}
              disabled={isProcessing}
              title={isListening ? t.stopListening : t.speakProblem}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-300 active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-gradient-to-tr from-rose-600 to-amber-600 ring-8 ring-amber-300 shadow-rose-500/40 scale-105'
                  : 'bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-500 hover:from-amber-700 hover:to-orange-600 ring-6 ring-amber-200/80 shadow-orange-500/30 hover:scale-102'
              } ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isListening ? (
                <>
                  <Square className="w-9 h-9 fill-current animate-pulse mb-1" />
                  <span className="text-[10px] font-black tracking-wider uppercase">
                    Stop
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-10 h-10 sm:w-11 sm:h-11 mb-1 stroke-[2.2]" />
                  <span className="text-[11px] font-bold tracking-tight px-2 text-center leading-tight">
                    {isProcessing ? 'Thinking...' : t.speakProblem}
                  </span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs font-bold text-stone-700 mt-3 text-center">
            {isListening ? t.listeningHint : t.speakProblem}
          </p>

          {/* Toggle Type Instead */}
          <button
            onClick={() => setShowTypeInput(true)}
            className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-bold text-stone-600 hover:text-stone-900 shadow-2xs transition-all active:scale-95"
          >
            <Keyboard className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.typeInstead}</span>
          </button>
        </div>
      ) : (
        /* Type Input Drawer */
        <div className="w-full bg-white rounded-2xl border-2 border-amber-300/80 p-3 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-amber-600" />
              {t.typeInstead}
            </span>
            <button
              onClick={() => setShowTypeInput(false)}
              className="text-xs font-semibold text-amber-700 hover:underline"
            >
              Switch to Voice 🎙️
            </button>
          </div>

          <form onSubmit={handleSendTyped} className="flex gap-2">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder={t.typePlaceholder}
              disabled={isProcessing}
              className="flex-1 px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!typedMessage.trim() || isProcessing}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <span>{t.send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
