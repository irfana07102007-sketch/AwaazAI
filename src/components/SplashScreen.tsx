import React from 'react';
import { Mic, Sparkles, ShieldCheck, HeartHandshake, ArrowRight, Volume2 } from 'lucide-react';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-amber-50 via-orange-50/50 to-stone-100 p-6 sm:p-8 max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Decorative Warm Background Glows */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-28 w-56 h-56 bg-orange-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner & Trust Marker */}
      <div className="pt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          Verified Gov Assistance
        </span>
        <span className="text-xs font-semibold text-stone-500 bg-white/80 px-2.5 py-1 rounded-full border border-stone-200">
          Prototype
        </span>
      </div>

      {/* Hero Visual & Branding */}
      <div className="my-auto py-8 text-center flex flex-col items-center">
        {/* Animated Central Voice Emblem */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/30 ring-8 ring-amber-100/80 animate-pulse">
            <Mic className="w-14 h-14" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-2 shadow-md border-2 border-white">
            <Volume2 className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight mb-3">
          Awaaz<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">AI</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl font-extrabold text-stone-800 leading-snug max-w-xs mb-4">
          “Speak in Your Language. <br />
          <span className="text-amber-700">Access What You Need.</span>”
        </p>

        {/* Subtitle / Problem context */}
        <p className="text-sm font-medium text-stone-600 max-w-sm leading-relaxed px-2">
          Made for rural women to easily discover and apply for verified government schemes using voice, without complicated English or middlemen.
        </p>

        {/* Feature Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-xs">
          <span className="px-3 py-1 bg-white/90 rounded-xl text-xs font-bold text-stone-700 border border-stone-200 shadow-2xs">
            🗣️ தமிழ் • తెలుగు • हिन्दी • English
          </span>
          <span className="px-3 py-1 bg-white/90 rounded-xl text-xs font-bold text-stone-700 border border-stone-200 shadow-2xs">
            🎙️ Voice-First AI
          </span>
          <span className="px-3 py-1 bg-white/90 rounded-xl text-xs font-bold text-stone-700 border border-stone-200 shadow-2xs">
            📜 Verified Schemes
          </span>
        </div>
      </div>

      {/* Bottom CTA Action Button */}
      <div className="pb-4">
        <button
          onClick={onGetStarted}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white text-lg font-bold shadow-lg shadow-orange-600/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer ring-4 ring-amber-200/50"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-[11px] text-stone-500 mt-3 font-medium">
          No login or signup required • Completely free & secure
        </p>
      </div>
    </main>
  );
};
