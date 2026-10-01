import React from 'react';
import { Volume2, VolumeX, Globe, RotateCcw, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentLang: LanguageCode;
  onOpenLanguageModal: () => void;
  onReset: () => void;
  isAudioPlaying: boolean;
  onStopAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onOpenLanguageModal,
  onReset,
  isAudioPlaying,
  onStopAudio,
}) => {
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 ring-2 ring-amber-100">
            <span className="text-xl font-black tracking-tight">आ</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold tracking-tight text-stone-900 leading-none">
                Awaaz<span className="text-amber-600">AI</span>
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                Gov
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 truncate max-w-[160px] xs:max-w-[200px]">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Active Audio Stop/Mute */}
          {isAudioPlaying && (
            <button
              onClick={onStopAudio}
              title="Stop audio playback"
              className="p-2 rounded-xl bg-amber-500 text-white animate-pulse hover:bg-amber-600 transition-colors shadow-sm flex items-center gap-1 text-xs font-semibold px-2.5"
            >
              <VolumeX className="w-4 h-4" />
              <span className="hidden sm:inline">{t.stopVoice}</span>
            </button>
          )}

          {/* Language Switcher Button */}
          <button
            onClick={onOpenLanguageModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-50 border border-stone-200 text-stone-800 text-xs font-bold transition-all active:scale-95 shadow-2xs"
            title={t.changeLanguage}
          >
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>{currentLangObj.nativeName}</span>
          </button>

          {/* Reset Conversation */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 active:scale-95 transition-all"
            title={t.clearChat}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
