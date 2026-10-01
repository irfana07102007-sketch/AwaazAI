import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Coins,
  FileText,
  ListOrdered,
  ExternalLink,
  Volume2,
  VolumeX,
  AlertTriangle,
  PhoneCall,
  Sparkles,
  Info,
} from 'lucide-react';
import { LanguageCode, BCP47_LANGUAGE_LABELS } from '../types';
import { VERIFIED_SCHEME, getCompleteSchemeCardSpeech } from '../data/schemeData';
import { TRANSLATIONS } from '../data/translations';
import { speechSynthesizer, greetingPlayer } from '../utils/speech';

interface SchemeCardProps {
  currentLang: LanguageCode;
  isAudioPlaying: boolean;
  onAudioPlayingChange: (playing: boolean) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  currentLang,
  isAudioPlaying,
  onAudioPlayingChange,
}) => {
  const scheme = VERIFIED_SCHEME[currentLang] || VERIFIED_SCHEME['en-IN'];
  const t = TRANSLATIONS[currentLang];
  const [activeTab, setActiveTab] = useState<'eligibility' | 'benefits' | 'documents' | 'steps'>('eligibility');
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      greetingPlayer.stop();
      speechSynthesizer.stop();
    };
  }, []);

  const handleToggleAudio = async () => {
    if (isPlayingLocal || isAudioPlaying) {
      greetingPlayer.stop();
      speechSynthesizer.stop();
      setIsPlayingLocal(false);
      onAudioPlayingChange(false);
    } else {
      setIsPlayingLocal(true);
      onAudioPlayingChange(true);

      // Build complete structured response card text from top to bottom:
      // 1. Greeting
      // 2. Scheme name
      // 3. Scheme explanation
      // 4. Eligibility
      // 5. Loan/benefit details
      // 6. Required documents
      // 7. Application guidance (Steps 1-4)
      // 8. Helpline information (spoken ONLY when reaching helpline naturally)
      // 9. Official portal & disclaimer notice
      const fullText = getCompleteSchemeCardSpeech(scheme, currentLang);

      await greetingPlayer.play(
        currentLang,
        fullText,
        () => {
          setIsPlayingLocal(true);
          onAudioPlayingChange(true);
        },
        () => {
          setIsPlayingLocal(false);
          onAudioPlayingChange(false);
        },
        () => {
          setIsPlayingLocal(false);
          onAudioPlayingChange(false);
        }
      );
    }
  };

  return (
    <div ref={cardRef} className="w-full bg-white rounded-3xl border-2 border-emerald-500/40 shadow-xl overflow-hidden mt-5">
      {/* Top Banner with Official Stamp */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-800 text-white p-4 sm:p-5 relative">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600/90 text-[11px] font-black tracking-wide border border-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
            {t.verifiedSchemeBadge}
          </span>
          <span className="text-[11px] font-semibold text-emerald-100 bg-white/10 px-2.5 py-0.5 rounded-full">
            {scheme.ministry}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
          {scheme.name}
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
          {scheme.tagline}
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-emerald-600/60">
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-emerald-200 block">
              Loan Amount / உதவித் தொகை
            </span>
            <span className="text-sm font-black text-white">{scheme.loanLimit}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-emerald-200 block">
              Security / அடமானம்
            </span>
            <span className="text-sm font-black text-emerald-200">{scheme.collateral}</span>
          </div>
        </div>

        {/* Listen Scheme Audio Guide Button */}
        <div className="mt-3.5">
          <button
            onClick={handleToggleAudio}
            className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] ${
              isPlayingLocal
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-white hover:bg-emerald-50 text-emerald-950 font-black'
            }`}
          >
            {isPlayingLocal ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t.stopSchemeAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>🔊 {BCP47_LANGUAGE_LABELS[currentLang]} • {t.listenEntireScheme}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('eligibility')}
          className={`flex-1 min-w-[100px] py-3 px-2 text-center text-xs font-black border-b-2 transition-all cursor-pointer ${
            activeTab === 'eligibility'
              ? 'border-emerald-600 text-emerald-800 bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.eligibilityTab}
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          className={`flex-1 min-w-[90px] py-3 px-2 text-center text-xs font-black border-b-2 transition-all cursor-pointer ${
            activeTab === 'benefits'
              ? 'border-emerald-600 text-emerald-800 bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.benefitsTab}
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`flex-1 min-w-[110px] py-3 px-2 text-center text-xs font-black border-b-2 transition-all cursor-pointer ${
            activeTab === 'documents'
              ? 'border-emerald-600 text-emerald-800 bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.documentsTab}
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          className={`flex-1 min-w-[110px] py-3 px-2 text-center text-xs font-black border-b-2 transition-all cursor-pointer ${
            activeTab === 'steps'
              ? 'border-emerald-600 text-emerald-800 bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.stepsTab}
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="p-4 sm:p-5">
        {/* 1. ELIGIBILITY */}
        {activeTab === 'eligibility' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.eligibilityTab}</span>
            </h4>
            <ul className="space-y-2.5">
              {scheme.eligibility.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-800"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. BENEFITS */}
        {activeTab === 'benefits' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-600" />
              <span>{t.benefitsTab}</span>
            </h4>
            <ul className="space-y-2.5">
              {scheme.benefits.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm font-semibold text-stone-800"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    ₹
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{t.documentsTab}</span>
            </h4>
            <ul className="space-y-2.5">
              {scheme.requiredDocuments.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/50 border border-blue-200/80 text-xs sm:text-sm font-semibold text-stone-800"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    📄
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. APPLICATION STEPS */}
        {activeTab === 'steps' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-emerald-600" />
              <span>{t.stepsTab}</span>
            </h4>
            <div className="space-y-3">
              {scheme.applicationSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-stone-900">
                      {step.title}
                    </h5>
                    <p className="text-xs text-stone-600 font-medium mt-1 leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Website Link (Requirement 6) */}
        <div className="mt-5 pt-4 border-t border-stone-200 flex flex-col gap-2">
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <span>{t.officialSiteButton}</span>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </a>

          <div className="flex items-center justify-between text-[11px] text-stone-500 px-1 font-medium">
            <span>🌐 {scheme.officialPortalName}</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-600" />
              {scheme.helpline}
            </span>
          </div>
        </div>

        {/* Required Disclaimer Notice (Requirement 6: Do not claim guaranteed eligibility) */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>{scheme.disclaimer}</p>
        </div>
      </div>
    </div>
  );
};
