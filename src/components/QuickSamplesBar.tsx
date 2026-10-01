import React from 'react';
import { Mic, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { QUICK_VOICE_SAMPLES } from '../data/helpCategories';
import { TRANSLATIONS } from '../data/translations';

interface QuickSamplesBarProps {
  currentLang: LanguageCode;
  onSelectSample: (text: string) => void;
  disabled?: boolean;
}

export const QuickSamplesBar: React.FC<QuickSamplesBarProps> = ({
  currentLang,
  onSelectSample,
  disabled = false,
}) => {
  const samples = QUICK_VOICE_SAMPLES[currentLang] || QUICK_VOICE_SAMPLES['en-IN'];
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="w-full my-3">
      <div className="flex items-center gap-1.5 mb-2 px-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span className="text-xs font-black text-stone-700">
          {t.quickPromptsTitle}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {samples.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSample(sample)}
            disabled={disabled}
            className="text-left text-xs font-semibold px-3 py-2 rounded-xl bg-white hover:bg-amber-50 text-stone-800 hover:text-amber-950 border border-stone-200 hover:border-amber-300 shadow-2xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
          >
            <Mic className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="line-clamp-1">"{sample}"</span>
          </button>
        ))}
      </div>
    </div>
  );
};
