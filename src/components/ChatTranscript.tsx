import React from 'react';
import { Volume2, VolumeX, User } from 'lucide-react';
import { ChatMessage, LanguageCode, BCP47_LANGUAGE_LABELS } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ChatTranscriptProps {
  messages: ChatMessage[];
  currentLang: LanguageCode;
  currentlySpeakingId: string | null;
  onPlaySpeech: (id: string, text: string, langCode?: LanguageCode) => void;
  onStopSpeech: () => void;
}

export const ChatTranscript: React.FC<ChatTranscriptProps> = ({
  messages,
  currentLang,
  currentlySpeakingId,
  onPlaySpeech,
  onStopSpeech,
}) => {
  const t = TRANSLATIONS[currentLang];

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4 my-4">
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        const isSpeaking = currentlySpeakingId === msg.id;

        return (
          <div
            key={msg.id}
            className={`flex gap-3 items-start ${
              isUser ? 'flex-row-reverse' : 'flex-row'
            } animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                isUser
                  ? 'bg-stone-800 text-white'
                  : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white ring-2 ring-amber-200'
              }`}
            >
              {isUser ? (
                <User className="w-5 h-5" />
              ) : (
                <span className="font-black text-sm">आ</span>
              )}
            </div>

            {/* Bubble Container */}
            <div
              className={`max-w-[85%] rounded-3xl p-4 shadow-sm border ${
                isUser
                  ? 'bg-amber-600 text-white rounded-tr-xs border-amber-500'
                  : 'bg-white text-stone-900 rounded-tl-xs border-stone-200/90'
              }`}
            >
              {/* Header inside bubble */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className={`text-[11px] font-black tracking-wide ${
                    isUser ? 'text-amber-100' : 'text-amber-800'
                  }`}
                >
                  {isUser ? 'You (நீங்கள் / మీరు / आप)' : 'AwaazAI Assistant'}
                </span>
                <span
                  className={`text-[10px] ${
                    isUser ? 'text-amber-200' : 'text-stone-400'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              {/* Message text */}
              <p className="text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
                {msg.text}
              </p>

              {/* AI Voice Playback Control Button (Requirement 7: Visible language indicator near Listen button) */}
              {!isUser && (
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (isSpeaking) {
                          onStopSpeech();
                        } else {
                          onPlaySpeech(msg.id, msg.text, msg.langCode || currentLang);
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer ${
                        isSpeaking
                          ? 'bg-amber-600 text-white ring-2 ring-amber-300 animate-pulse'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>{t.stopVoice}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>🔊 {BCP47_LANGUAGE_LABELS[msg.langCode || currentLang]}</span>
                        </>
                      )}
                    </button>

                    <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                      {t.listenToVoice}
                    </span>
                  </div>

                  {isSpeaking && (
                    <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                      {t.speaking}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
