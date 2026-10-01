/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { LanguageCode, ChatMessage } from './types';
import { TRANSLATIONS, LANGUAGES } from './data/translations';
import { SplashScreen } from './components/SplashScreen';
import { LanguageSelection } from './components/LanguageSelection';
import { Header } from './components/Header';
import { VoiceMicButton } from './components/VoiceMicButton';
import { HelpCategories } from './components/HelpCategories';
import { ChatTranscript } from './components/ChatTranscript';
import { SchemeCard } from './components/SchemeCard';
import { QuickSamplesBar } from './components/QuickSamplesBar';
import { speechSynthesizer, greetingPlayer } from './utils/speech';
import { Sparkles, ShieldCheck, HelpCircle, ArrowRight, Loader2, Volume2, BookOpen } from 'lucide-react';

type ScreenStep = 'splash' | 'language_select' | 'main';

export default function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('splash');
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('ta-IN'); // Default initial language
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [hasRevealedScheme, setHasRevealedScheme] = useState(false);
  const [manualShowScheme, setManualShowScheme] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[selectedLang] || TRANSLATIONS['ta-IN'];

  // Auto-scroll to latest message or updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing, manualShowScheme, hasRevealedScheme]);

  // Handle Speech Stop
  const handleStopAudio = () => {
    greetingPlayer.stop();
    speechSynthesizer.stop();
    setIsAudioPlaying(false);
    setSpeakingMessageId(null);
  };

  // Play AI message audio strictly in the selected/message language code
  const handlePlayMessageAudio = async (msgId: string, text: string, langToUse?: LanguageCode) => {
    handleStopAudio();
    const effectiveLang = langToUse || selectedLang;
    setSpeakingMessageId(msgId);
    setIsAudioPlaying(true);

    await greetingPlayer.play(
      effectiveLang,
      text,
      () => {
        setIsAudioPlaying(true);
        setSpeakingMessageId(msgId);
      },
      () => {
        setIsAudioPlaying(false);
        setSpeakingMessageId(null);
      },
      () => {
        setIsAudioPlaying(false);
        setSpeakingMessageId(null);
      }
    );
  };

  // Send message to Gemini server API
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isProcessing) return;

    handleStopAudio();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
      langCode: selectedLang,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          language: selectedLang,
          history: newHistory.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const replyText = data.reply || 'Thank you. I am here to assist you step by step.';
      const resLang: LanguageCode = data.langCode || selectedLang;

      const aiMsgId = `ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: replyText,
        timestamp: new Date(),
        showScheme: data.showScheme,
        langCode: resLang,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Automatically speak the AI response strictly in the selected language
      handlePlayMessageAudio(aiMsgId, replyText, resLang);

      // If Gemini matched scheme, reveal scheme card
      if (data.showScheme) {
        setHasRevealedScheme(true);
      }
    } catch (err) {
      console.error('Failed to get AI response:', err);
      // Fallback message strictly in user's selected language
      const fallbackReplies: Record<LanguageCode, string> = {
        'ta-IN': 'வணக்கம் சகோதரி, உங்கள் குரலை கேட்டு வழிகாட்டுகிறேன். சிறு தொழில், தையல் அல்லது பால் பண்ணை தொடங்க ரூ.50,000 வரை முத்ரா சிசு கடன் உதவி உள்ளது. உங்களிடம் ஆதார் அட்டை உள்ளதா?',
        'te-IN': 'నమస్కారం అక్క, మీరు కుట్టు పని లేదా వ్యాపారం కోసం ప్రభుత్వ ముద్రా రుణం రూ. 50,000 వరకు పొందవచ్చు. మీ వద్ద ఆధార్ కార్డు ఉందా?',
        'hi-IN': 'नमस्ते दीदी, आप सिलाई या किसी नए काम के लिए सरकार की मुद्रा शिशु योजना से ₹50,000 तक की मदद ले सकती हैं। क्या आपके पास आधार कार्ड है?',
        'en-IN': 'Hello sister, I am here to guide you. For tailoring or small business, the government offers up to ₹50,000 under the PM Mudra Shishu loan. Do you have an Aadhaar card?',
      };

      const fallbackText = fallbackReplies[selectedLang] || fallbackReplies['en-IN'];
      const aiMsgId = `ai-${Date.now()}`;
      const fallbackMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date(),
        showScheme: true,
        langCode: selectedLang,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      handlePlayMessageAudio(aiMsgId, fallbackText, selectedLang);
      setHasRevealedScheme(true);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset chat
  const handleResetChat = () => {
    handleStopAudio();
    setMessages([]);
    setHasRevealedScheme(false);
    setManualShowScheme(false);
  };

  // Flow Step 1: Splash Screen
  if (currentStep === 'splash') {
    return (
      <SplashScreen
        onGetStarted={() => {
          setCurrentStep('language_select');
        }}
      />
    );
  }

  // Flow Step 2: Language Selection (User must explicitly pick language)
  if (currentStep === 'language_select') {
    return (
      <LanguageSelection
        currentLang={selectedLang}
        onSelectLanguage={(lang) => {
          setSelectedLang(lang);
          setCurrentStep('main');
        }}
      />
    );
  }

  // Flow Step 3: Main Screen (Voice-first, Assistant, Scheme Card)
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      {/* Mobile-first centered frame container */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col shadow-2xl relative border-x border-stone-200">
        {/* Sticky Header */}
        <Header
          currentLang={selectedLang}
          onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          onReset={handleResetChat}
          isAudioPlaying={isAudioPlaying}
          onStopAudio={handleStopAudio}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 pb-28 overflow-y-auto">
          {/* Welcome Prompt Area */}
          <div className="text-center pt-2 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-black mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
              {t.howCanWeHelp}
            </h2>

            <p className="text-xs sm:text-sm font-medium text-stone-600 mt-2 px-2 leading-relaxed">
              {t.subHelpHint}
            </p>
          </div>

          {/* Primary Voice Microphone Area */}
          <div className="my-2 bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-50/60 p-4 rounded-3xl border border-amber-200/90 shadow-xs">
            <VoiceMicButton
              currentLang={selectedLang}
              onTranscriptReady={handleSendMessage}
              isProcessing={isProcessing}
            />

            {/* Quick Spoken Samples Bar */}
            <QuickSamplesBar
              currentLang={selectedLang}
              onSelectSample={handleSendMessage}
              disabled={isProcessing}
            />
          </div>

          {/* Help Option: "I don't know what to ask" (Requirement 8) */}
          <HelpCategories
            currentLang={selectedLang}
            onSelectPrompt={handleSendMessage}
            isProcessing={isProcessing}
          />

          {/* AI Thinking Indicator */}
          {isProcessing && (
            <div className="flex items-center gap-3 p-4 my-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin text-amber-700 shrink-0" />
              <div className="text-xs font-bold">
                <span>{t.appName} is understanding your request in {LANGUAGES.find((l) => l.code === selectedLang)?.nativeName}...</span>
              </div>
            </div>
          )}

          {/* Chat Transcript Feed */}
          <ChatTranscript
            messages={messages}
            currentLang={selectedLang}
            currentlySpeakingId={speakingMessageId}
            onPlaySpeech={handlePlayMessageAudio}
            onStopSpeech={handleStopAudio}
          />

          {/* Verified Government Scheme Showcase (Requirement 6) */}
          {/* Shown either after Gemini identifies the need, or if user toggles manual view */}
          {hasRevealedScheme || manualShowScheme ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between mt-6 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {t.verifiedSchemeTitle}
                </span>
                {manualShowScheme && !hasRevealedScheme && (
                  <button
                    onClick={() => setManualShowScheme(false)}
                    className="text-xs font-bold text-stone-500 hover:text-stone-800"
                  >
                    Hide
                  </button>
                )}
              </div>

              <SchemeCard
                currentLang={selectedLang}
                isAudioPlaying={isAudioPlaying}
                onAudioPlayingChange={setIsAudioPlaying}
              />
            </div>
          ) : (
            /* Toggle Button to inspect Verified Scheme anytime */
            <div className="mt-6 pt-4 border-t border-stone-200">
              <button
                onClick={() => setManualShowScheme(true)}
                className="w-full p-3.5 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-dashed border-emerald-500/60 text-emerald-900 font-extrabold text-xs sm:text-sm flex items-center justify-between shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-left font-black">
                    {t.viewSchemeDetails}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={scrollRef} className="h-4" />
        </main>

        {/* Modal for Language Switching anytime */}
        {isLanguageModalOpen && (
          <LanguageSelection
            currentLang={selectedLang}
            isModal={true}
            onSelectLanguage={(lang) => {
              setSelectedLang(lang);
              setIsLanguageModalOpen(false);
            }}
            onClose={() => setIsLanguageModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
