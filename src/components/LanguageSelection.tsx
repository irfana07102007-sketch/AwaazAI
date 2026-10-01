import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Check, ArrowRight, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';
import { greetingPlayer } from '../utils/speech';

interface LanguageSelectionProps {
  currentLang: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  currentLang,
  onSelectLanguage,
  isModal = false,
  onClose,
}) => {
  const [selected, setSelected] = useState<LanguageCode>(currentLang);
  const [playingVoice, setPlayingVoice] = useState<LanguageCode | null>(null);

  // Stop greeting playback on unmount
  useEffect(() => {
    return () => {
      greetingPlayer.stop();
    };
  }, []);

  const handlePreviewVoice = async (e: React.MouseEvent, lang: LanguageCode) => {
    e.stopPropagation();
    const langObj = LANGUAGES.find((l) => l.code === lang);
    if (!langObj) return;

    if (playingVoice === lang) {
      greetingPlayer.stop();
      setPlayingVoice(null);
      return;
    }

    setPlayingVoice(lang);
    await greetingPlayer.play(
      lang,
      langObj.greetingVoice,
      () => setPlayingVoice(lang),
      () => setPlayingVoice(null),
      () => setPlayingVoice(null)
    );
  };

  const handleConfirm = (lang: LanguageCode) => {
    setSelected(lang);
    greetingPlayer.stop();
    onSelectLanguage(lang);
    if (onClose) onClose();
  };

  const t = TRANSLATIONS[selected];

  const content = (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="text-center pt-2 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Step 1 of 2
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Choose Your Language
        </h2>
        <p className="text-sm font-semibold text-stone-600 mt-1">
          உங்கள் மொழியைத் தேர்ந்தெடுங்கள் • మీ భాషను ఎంచుకోండి
        </p>
        <p className="text-xs text-stone-500 mt-0.5">
          अपनी भाषा चुनें • Select comfortable language
        </p>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 gap-3.5 my-auto py-2">
        {LANGUAGES.map((lang) => {
          const isCurrent = selected === lang.code;
          return (
            <div
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] ${
                isCurrent
                  ? 'border-amber-600 bg-amber-50/90 ring-4 ring-amber-200/50 shadow-md'
                  : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-stone-50/80'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-colors ${
                    isCurrent
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-800'
                  }`}
                >
                  {lang.flagIcon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-stone-900">
                      {lang.nativeName}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                      {lang.label}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-stone-500 mt-0.5">
                    {lang.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Audio Preview & Selection check */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handlePreviewVoice(e, lang.code)}
                  title="Listen to voice greeting"
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    playingVoice === lang.code
                      ? 'bg-amber-600 text-white border-amber-600 animate-pulse'
                      : 'bg-white text-stone-700 hover:text-amber-800 hover:bg-amber-100/60 border-stone-200'
                  }`}
                >
                  {playingVoice === lang.code ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                  <span>🔊 {lang.nativeName}</span>
                </button>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                      : 'border-2 border-stone-300'
                  }`}
                >
                  {isCurrent && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Confirm */}
      <div className="pt-4">
        <button
          onClick={() => handleConfirm(selected)}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white text-base sm:text-lg font-bold shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>{t.getStarted}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-xs text-stone-500 mt-2.5 font-medium">
          You can change language anytime from top bar
        </p>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-stone-100">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-extrabold text-stone-900">
              {t.selectLanguageTitle}
            </h3>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            )}
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-amber-50/70 via-stone-50 to-orange-50/30 p-6 sm:p-8 max-w-md mx-auto shadow-2xl">
      {content}
    </div>
  );
};
