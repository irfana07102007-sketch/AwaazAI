export type LanguageCode = 'ta-IN' | 'te-IN' | 'hi-IN' | 'en-IN';

export const BCP47_LANGUAGE_LABELS: Record<LanguageCode, string> = {
  'ta-IN': 'தமிழ்',
  'te-IN': 'తెలుగు',
  'hi-IN': 'हिन्दी',
  'en-IN': 'English',
};

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  subtitle: string;
  greetingVoice: string;
  flagIcon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  showScheme?: boolean;
  audioPlaying?: boolean;
  langCode?: LanguageCode;
}

export interface SchemeStep {
  stepNumber: number;
  title: string;
  instruction: string;
  iconName?: string;
}

export interface SchemeDetails {
  id: string;
  name: string;
  tagline: string;
  category: string;
  ministry: string;
  loanLimit: string;
  collateral: string;
  eligibility: string[];
  benefits: string[];
  requiredDocuments: string[];
  applicationSteps: SchemeStep[];
  officialUrl: string;
  officialPortalName: string;
  helpline: string;
  disclaimer: string;
  audioSummary: string;
}

export interface HelpCategoryItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  samplePrompt: string;
}
