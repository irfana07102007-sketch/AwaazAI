import React, { useState } from 'react';
import {
  HelpCircle,
  IndianRupee,
  Briefcase,
  GraduationCap,
  Home,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { LanguageCode, HelpCategoryItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CATEGORIES_BY_LANG } from '../data/helpCategories';

interface HelpCategoriesProps {
  currentLang: LanguageCode;
  onSelectPrompt: (promptText: string) => void;
  isProcessing: boolean;
}

export const HelpCategories: React.FC<HelpCategoriesProps> = ({
  currentLang,
  onSelectPrompt,
  isProcessing,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const categories = CATEGORIES_BY_LANG[currentLang] || CATEGORIES_BY_LANG['en-IN'];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'IndianRupee':
        return <IndianRupee className="w-5 h-5 text-emerald-600" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-amber-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case 'Home':
        return <Home className="w-5 h-5 text-orange-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="w-full mt-4">
      {/* Accordion Header / Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-amber-100/70 hover:bg-amber-100 border border-amber-300/80 text-amber-950 font-extrabold text-sm shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-left font-black tracking-tight">
            {t.dontKnowWhatToAsk}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-amber-800">
          <span>{isOpen ? 'Hide' : 'Show 5 Needs'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Category Cards */}
      {isOpen && (
        <div className="mt-2.5 p-3 rounded-2xl bg-white border border-amber-200/80 shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs text-stone-600 font-medium mb-3 px-1">
            {t.dontKnowDesc}
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectPrompt(cat.samplePrompt);
                  setIsOpen(false);
                }}
                disabled={isProcessing}
                className="w-full text-left p-3 rounded-xl border border-stone-200 hover:border-amber-400 bg-stone-50/70 hover:bg-amber-50/60 transition-all flex items-center justify-between gap-3 active:scale-[0.98] group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-stone-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {renderIcon(cat.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900 leading-tight">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] font-medium text-stone-500 line-clamp-1 mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-400 group-hover:text-amber-600 group-hover:border-amber-300 transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
