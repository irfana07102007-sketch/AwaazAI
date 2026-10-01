import { LanguageCode } from '../types';

export interface SpeechRecognitionResultState {
  transcript: string;
  isFinal: boolean;
}

// Check if browser supports Web Speech API
export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export class VoiceRecognitionManager {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
      }
    }
  }

  public startListening(
    lang: LanguageCode,
    onResult: (result: SpeechRecognitionResultState) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError('Speech recognition is not supported on this browser.');
      return;
    }

    try {
      // Set recognition.lang strictly according to the selected language:
      // Tamil -> ta-IN, Telugu -> te-IN, Hindi -> hi-IN, English -> en-IN
      this.recognition.lang = lang;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece;
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        const effectiveText = finalTranscript || interimTranscript;
        onResult({
          transcript: effectiveText,
          isFinal: Boolean(finalTranscript),
        });
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition event error:', event.error);
        let errorMsg = 'Could not access microphone.';
        if (event.error === 'not-allowed') {
          errorMsg = 'Microphone permission denied. Please allow mic access or use typing.';
        } else if (event.error === 'no-speech') {
          errorMsg = 'No speech detected. Please tap and speak again.';
        } else if (event.error === 'network') {
          errorMsg = 'Speech network error. Please try again or type.';
        }
        this.isListening = false;
        onError(errorMsg);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
    } catch (e: any) {
      console.error('Error starting speech recognition:', e);
      this.isListening = false;
      onError(e?.message || 'Failed to start speech recognition');
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }

  public get active(): boolean {
    return this.isListening;
  }
}

// Text-to-Speech manager
export class VoiceSynthesisManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices(): SpeechSynthesisVoice[] {
    if (!isSpeechSynthesisSupported()) return [];
    try {
      this.voices = window.speechSynthesis.getVoices() || [];
    } catch {
      this.voices = [];
    }
    return this.voices;
  }

  /**
   * Finds the best voice strictly matching the selected language code.
   * NEVER hardcodes English or Hindi as default if Tamil or Telugu is requested.
   */
  public getBestVoiceForLang(langCode: LanguageCode): SpeechSynthesisVoice | null {
    const available = this.loadVoices();
    if (!available || available.length === 0) return null;

    const target = langCode.toLowerCase().replace('_', '-'); // e.g. "ta-in", "te-in"
    const prefix = target.split('-')[0]; // "ta", "te", "hi", "en"

    // 1. Exact BCP-47 match (e.g. 'ta-in' or 'te-in')
    const exact = available.find((v) => {
      const vLang = v.lang.toLowerCase().replace('_', '-');
      return vLang === target;
    });
    if (exact) return exact;

    // 2. Starts with same language prefix (e.g. 'ta-LK', 'te', etc.)
    const prefixMatch = available.find((v) => {
      const vLang = v.lang.toLowerCase().replace('_', '-');
      return vLang.startsWith(prefix + '-') || vLang === prefix;
    });
    if (prefixMatch) return prefixMatch;

    // 3. Search voice name for language keywords
    const keywordsMap: Record<string, string[]> = {
      ta: ['tamil', 'தமிழ்', 'valluvar', 'vani'],
      te: ['telugu', 'తెలుగు', 'mohan', 'chitra', 'geeta'],
      hi: ['hindi', 'हिन्दी', 'kalpana', 'hemant', 'lekha'],
      en: ['india', 'indian', 'en-in', 'english'],
    };

    const keywords = keywordsMap[prefix] || [prefix];
    const nameMatch = available.find((v) => {
      const fullStr = `${v.name} ${v.lang}`.toLowerCase();
      return keywords.some((kw) => fullStr.includes(kw));
    });
    if (nameMatch) return nameMatch;

    // CRITICAL: If Tamil or Telugu is selected and no browser voice is installed,
    // DO NOT return an English or Hindi voice! Returning null allows the browser
    // to use utterance.lang directly with its locale engine.
    return null;
  }

  public speak(
    text: string,
    lang: LanguageCode,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    if (!isSpeechSynthesisSupported()) {
      if (onError) onError('Speech synthesis not supported');
      return;
    }

    try {
      this.stop(); // Stop any pending speech

      // Ensure voices are fetched
      this.loadVoices();

      const utterance = new SpeechSynthesisUtterance(text);

      // ALWAYS set utterance.lang strictly to the selected BCP-47 code (ta-IN, te-IN, hi-IN, en-IN)
      utterance.lang = lang;
      utterance.rate = 0.92; // Slightly slower, clear and gentle for rural understanding
      utterance.pitch = 1.0;

      // Select voice strictly matching the selected language code
      const matchingVoice = this.getBestVoiceForLang(lang);
      if (matchingVoice) {
        utterance.voice = matchingVoice;
        console.log(`[AwaazAI TTS] Using voice: ${matchingVoice.name} (${matchingVoice.lang}) for ${lang}`);
      } else {
        console.log(`[AwaazAI TTS] No local voice object found for ${lang}, relying on utterance.lang = "${lang}"`);
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis utterance error:', e);
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
      if (onError) onError(err);
    }
  }

  /**
   * Speaks long structured text by chunking across sentences/paragraphs.
   * Prevents browser speech synthesis from timing out or cutting off.
   */
  public speakLongText(
    text: string,
    lang: LanguageCode,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    if (!isSpeechSynthesisSupported()) {
      if (onError) onError('Speech synthesis not supported');
      return;
    }

    try {
      this.stop();
      this.loadVoices();

      // Split by paragraph breaks or sentence terminals (. / ! / ? / । / \n)
      const rawChunks = text
        .split(/(?<=[.?!।\n])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (rawChunks.length === 0) {
        if (onEnd) onEnd();
        return;
      }

      let chunkIndex = 0;
      let hasStarted = false;
      let isCancelled = false;

      const speakNextChunk = () => {
        if (isCancelled || chunkIndex >= rawChunks.length) {
          this.currentUtterance = null;
          if (onEnd && !isCancelled) onEnd();
          return;
        }

        const chunk = rawChunks[chunkIndex];
        chunkIndex++;

        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = lang;
        utterance.rate = 0.92;
        utterance.pitch = 1.0;

        const matchingVoice = this.getBestVoiceForLang(lang);
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }

        utterance.onstart = () => {
          if (!hasStarted) {
            hasStarted = true;
            if (onStart) onStart();
          }
        };

        utterance.onend = () => {
          if (!isCancelled) {
            speakNextChunk();
          }
        };

        utterance.onerror = (e) => {
          console.warn('Chunk speech error:', e);
          if (!isCancelled) {
            speakNextChunk();
          }
        };

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      };

      // Store cancel hook on instance
      (this as any)._cancelLongSpeech = () => {
        isCancelled = true;
      };

      speakNextChunk();
    } catch (err) {
      console.warn('Speech synthesis long text failed:', err);
      if (onError) onError(err);
    }
  }

  public stop() {
    if ((this as any)._cancelLongSpeech) {
      (this as any)._cancelLongSpeech();
      (this as any)._cancelLongSpeech = null;
    }
    if (isSpeechSynthesisSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return isSpeechSynthesisSupported() ? window.speechSynthesis.speaking : false;
  }
}

// Dedicated Greeting Player that uses Gemini TTS audio for guaranteed, authentic pronunciation
export class GreetingVoicePlayer {
  private currentAudio: HTMLAudioElement | null = null;

  public async play(
    langCode: LanguageCode,
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    this.stop();

    // 1. Try Gemini TTS endpoint first (guaranteed authentic Tamil & Telugu pronunciation)
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: langCode }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioData) {
          const audio = new Audio(data.audioData);
          this.currentAudio = audio;

          audio.onplay = () => {
            onStart?.();
          };

          audio.onended = () => {
            this.currentAudio = null;
            onEnd?.();
          };

          audio.onerror = (e) => {
            console.warn('Audio element error, falling back to speech synthesis:', e);
            this.currentAudio = null;
            speechSynthesizer.speakLongText(text, langCode, onStart, onEnd, onError);
          };

          await audio.play();
          return;
        }
      }
    } catch (apiErr) {
      console.warn('Gemini TTS fetch failed, using SpeechSynthesis fallback:', apiErr);
    }

    // 2. Fallback to SpeechSynthesis with sentence chunking
    speechSynthesizer.speakLongText(text, langCode, onStart, onEnd, onError);
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }
    speechSynthesizer.stop();
  }

  public isPlaying(): boolean {
    return Boolean(this.currentAudio && !this.currentAudio.paused) || speechSynthesizer.isSpeaking();
  }
}

export const speechRecognizer = new VoiceRecognitionManager();
export const speechSynthesizer = new VoiceSynthesisManager();
export const greetingPlayer = new GreetingVoicePlayer();
