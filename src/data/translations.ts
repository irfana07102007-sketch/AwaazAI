import { LanguageCode, LanguageOption } from '../types';

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'ta-IN',
    label: 'Tamil',
    nativeName: 'தமிழ்',
    subtitle: 'தமிழில் பேச தொடங்குங்கள்',
    greetingVoice: 'வணக்கம்! தமிழில் பேசத் தொடங்குங்கள்.',
    flagIcon: '🌾',
  },
  {
    code: 'te-IN',
    label: 'Telugu',
    nativeName: 'తెలుగు',
    subtitle: 'తెలుగులో మాట్లాడటం ప్రారంభించండి',
    greetingVoice: 'నమస్కారం! తెలుగులో మాట్లాడటం ప్రారంభించండి.',
    flagIcon: '🪔',
  },
  {
    code: 'hi-IN',
    label: 'Hindi',
    nativeName: 'हिन्दी',
    subtitle: 'हिंदी में बात करना शुरू करें',
    greetingVoice: 'नमस्ते! हिंदी में बात करना शुरू करें।',
    flagIcon: '🌸',
  },
  {
    code: 'en-IN',
    label: 'English',
    nativeName: 'English',
    subtitle: 'Simple spoken English guidance',
    greetingVoice: 'Hello! Welcome to AwaazAI. Speak in your language.',
    flagIcon: '🇮🇳',
  },
];

export interface UiTranslations {
  appName: string;
  tagline: string;
  badge: string;
  getStarted: string;
  selectLanguageTitle: string;
  selectLanguageSubtitle: string;
  changeLanguage: string;
  howCanWeHelp: string;
  subHelpHint: string;
  speakProblem: string;
  listening: string;
  listeningHint: string;
  stopListening: string;
  typeInstead: string;
  typePlaceholder: string;
  send: string;
  listenToVoice: string;
  stopVoice: string;
  speaking: string;
  dontKnowWhatToAsk: string;
  dontKnowDesc: string;
  clearChat: string;
  verifiedSchemeTitle: string;
  verifiedSchemeBadge: string;
  viewSchemeDetails: string;
  eligibilityTab: string;
  benefitsTab: string;
  documentsTab: string;
  stepsTab: string;
  officialSiteButton: string;
  listenEntireScheme: string;
  stopSchemeAudio: string;
  disclaimerNotice: string;
  quickPromptsTitle: string;
  micPermissionNotice: string;
  simulateVoiceNotice: string;
  stepIndicator: string;
  govPortalBadge: string;
  backToConversation: string;
}

export const TRANSLATIONS: Record<LanguageCode, UiTranslations> = {
  'ta-IN': {
    appName: 'ஆவாஸ் AI (AwaazAI)',
    tagline: 'உங்கள் மொழியில் பேசுங்கள். உங்களுக்கு தேவையானதை பெறுங்கள்.',
    badge: 'கிராமப்புற பெண்களுக்கான குரல் வழி அரசு நலத்திட்ட வழிகாட்டி',
    getStarted: 'தொடங்குங்கள் (Get Started)',
    selectLanguageTitle: 'உங்கள் மொழியைத் தேர்ந்தெடுங்கள்',
    selectLanguageSubtitle: 'நீங்கள் பேச விரும்பும் மொழியை தொடுங்கள்',
    changeLanguage: 'மொழி மாற்று',
    howCanWeHelp: 'நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?',
    subHelpHint: 'தயங்காமல் உங்கள் தேவையை குரலில் பேசுங்கள். எ.கா: "தையல் மெஷின் வாங்க கடன் வேண்டும்", "பால் மாடு வாங்க பணம் கிடைக்குமா?"',
    speakProblem: 'உங்கள் தேவையை பேசுங்கள்',
    listening: 'கவனித்துக் கொண்டிருக்கிறோம்...',
    listeningHint: 'இப்போது உங்கள் தேவையை தெளிவாக பேசுங்கள்',
    stopListening: 'பேசி முடித்தேன்',
    typeInstead: 'டைப் செய்ய விரும்புகிறேன்',
    typePlaceholder: 'உங்கள் தேவையை இங்கே எழுதுங்கள்...',
    send: 'அனுப்பு',
    listenToVoice: 'குரலில் கேளுங்கள்',
    stopVoice: 'நிறுத்து',
    speaking: 'பேசுகிறது...',
    dontKnowWhatToAsk: 'எனக்கு என்ன கேட்பது என்று தெரியவில்லை',
    dontKnowDesc: 'கீழே உள்ள தலைப்புகளில் ஒன்றை தொடுங்கள், நாங்கள் வழிகாட்டுகிறோம்:',
    clearChat: 'புதிய உரையாடல்',
    verifiedSchemeTitle: 'உங்களுக்கான சரிபார்க்கப்பட்ட அரசு திட்டம்',
    verifiedSchemeBadge: 'அரசு அங்கீகரிக்கப்பட்ட திட்டம்',
    viewSchemeDetails: 'திட்டத்தின் முழு விவரங்களை காண்க',
    eligibilityTab: '✓ தகுதிகள்',
    benefitsTab: '💰 பலன்கள்',
    documentsTab: '📄 தேவையான ஆவணங்கள்',
    stepsTab: '📝 விண்ணப்பிக்கும் வழிகள்',
    officialSiteButton: 'அதிகாரப்பூர்வ அரசு இணையதளம்',
    listenEntireScheme: 'திட்டத்தை முழுமையாக குரலில் கேட்க',
    stopSchemeAudio: 'குரலை நிறுத்து',
    disclaimerNotice: 'முக்கிய அறிவிப்பு: இந்த தகவல் வழிகாட்டலுக்காக மட்டுமே. தகுதி மற்றும் ஒப்புதல் அரசு மற்றும் வங்கி விதிகளுக்கு உட்பட்டது. இடைத்தரகர்களை நம்பாதீர்கள்.',
    quickPromptsTitle: 'எளிய குரல் உதாரணங்கள் (தொட்டு பேசலாம்):',
    micPermissionNotice: 'மைக்ரோஃபோன் இயங்கவில்லை என்றால் டைப் செய்யலாம் அல்லது கீழே உள்ள உதாரணத்தை தொடலாம்.',
    simulateVoiceNotice: 'குரல் மாதிரி இயக்கம்',
    stepIndicator: 'படிநிலை',
    govPortalBadge: 'இந்திய அரசு அதிகாரப்பூர்வ போர்டல்',
    backToConversation: 'உரையாடலுக்கு திரும்பு',
  },
  'te-IN': {
    appName: 'ఆవాజ్ AI (AwaazAI)',
    tagline: 'మీ భాషలో మాట్లాడండి. మీకు కావాల్సిన సహాయం పొందండి.',
    badge: 'గ్రామీణ మహిళల కోసం వాయిస్ ఆధారిత ప్రభుత్వ పథకాల సహాయకుడు',
    getStarted: 'ప్రారంభించండి (Get Started)',
    selectLanguageTitle: 'మీ భాషను ఎంచుకోండి',
    selectLanguageSubtitle: 'మీరు మాట్లాడాలనుకుంటున్న భాషను తాకండి',
    changeLanguage: 'భాష మార్చండి',
    howCanWeHelp: 'మేము మీకు ఎలా సహాయం చేయవచ్చు?',
    subHelpHint: 'మీ సమస్య లేదా అవసరాన్ని మీ మాటల్లో చెప్పండి. ఉదా: "కుట్టు మిషన్ కొనడానికి లోన్ కావాలి", "పాడి గేదె కొనుగోలుకు సహాయం కావాలి"',
    speakProblem: 'మీ సమస్యను చెప్పండి',
    listening: 'వింటున్నాము...',
    listeningHint: 'ఇప్పుడు మీ మాటలు చెప్పండి',
    stopListening: 'మాట్లాడటం పూర్తయింది',
    typeInstead: 'టైప్ చేయాలనుకుంటున్నాను',
    typePlaceholder: 'మీ అవసరాన్ని ఇక్కడ టైప్ చేయండి...',
    send: 'పంపండి',
    listenToVoice: 'వాయిస్ వినండి',
    stopVoice: 'ఆపండి',
    speaking: 'మాట్లాడుతోంది...',
    dontKnowWhatToAsk: 'నాకు ఏమి అడగాలో తెలియదు',
    dontKnowDesc: 'కింది వాటిలో మీ అవసరానికి సరిపోయే అంశాన్ని ఎంచుకోండి:',
    clearChat: 'కొత్త సంభాషణ',
    verifiedSchemeTitle: 'ధృవీకరించబడిన ప్రభుత్వ పథకం',
    verifiedSchemeBadge: 'ప్రభుత్వ గుర్తింపు పొందిన పథకం',
    viewSchemeDetails: 'పథకం పూర్తి వివరాలు చూడండి',
    eligibilityTab: '✓ అర్హతలు',
    benefitsTab: '💰 ప్రయోజనాలు',
    documentsTab: '📄 అవసరమైన పత్రాలు',
    stepsTab: '📝 దరఖాస్తు విధానం',
    officialSiteButton: 'అధికారిక ప్రభుత్వ వెబ్‌సైట్',
    listenEntireScheme: 'పథకం వివరాలు వాయిస్‌లో వినండి',
    stopSchemeAudio: 'ఆడియో ఆపండి',
    disclaimerNotice: 'ముఖ్య గమనిక: ఈ సమాచారం సహాయం కొరకు మాత్రమే. అర్హత మరియు అనుమతి బ్యాంక్ నిబంధనలపై ఆధారపడి ఉంటుంది. దళారులను నమ్మవద్దు.',
    quickPromptsTitle: 'సాధారణ వాయిస్ ఉదాహరణలు:',
    micPermissionNotice: 'మైక్రోఫోన్ పని చేయకపోతే టైప్ చేయవచ్చు లేదా కింద ఉన్న ఉదాహరణను ఎంచుకోవచ్చు.',
    simulateVoiceNotice: 'వాయిస్ డెమో ప్లే చేయండి',
    stepIndicator: 'దశ',
    govPortalBadge: 'భారత ప్రభుత్వ అధికారిక పోర్టల్',
    backToConversation: 'సంభాషణకు తిరిగి వెళ్లండి',
  },
  'hi-IN': {
    appName: 'आवाज़ AI (AwaazAI)',
    tagline: 'अपनी भाषा में बोलें। अपनी जरूरत का लाभ पाएं।',
    badge: 'ग्रामीण महिलाओं के लिए आवाज-आधारित सरकारी योजना सहायक',
    getStarted: 'शुरू करें (Get Started)',
    selectLanguageTitle: 'अपनी भाषा चुनें',
    selectLanguageSubtitle: 'जिस भाषा में आप बोलना चाहती हैं उसे स्पर्श करें',
    changeLanguage: 'भाषा बदलें',
    howCanWeHelp: 'हम आपकी क्या सहायता कर सकते हैं?',
    subHelpHint: 'अपनी जरूरत सीधे बोलकर बताएं। जैसे: "सिलाई मशीन के लिए लोन चाहिए", "भैंस या गाय खरीदने के लिए सरकारी मदद"',
    speakProblem: 'अपनी समस्या बोलें',
    listening: 'सुन रहे हैं...',
    listeningHint: 'अब अपनी बात साफ आवाज में बोलें',
    stopListening: 'बोलना समाप्त हुआ',
    typeInstead: 'लिखकर पूछें',
    typePlaceholder: 'अपनी आवश्यकता यहाँ लिखें...',
    send: 'भेजें',
    listenToVoice: 'आवाज़ में सुनें',
    stopVoice: 'रोकें',
    speaking: 'बोल रहा है...',
    dontKnowWhatToAsk: 'मुझे नहीं पता क्या पूछना है',
    dontKnowDesc: 'नीचे दिए गए विषयों में से किसी एक को चुनें, हम समझाएंगे:',
    clearChat: 'नई बातचीत',
    verifiedSchemeTitle: 'आपके लिए सत्यापित सरकारी योजना',
    verifiedSchemeBadge: 'भारत सरकार द्वारा प्रमाणित',
    viewSchemeDetails: 'योजना का पूरा विवरण देखें',
    eligibilityTab: '✓ पात्रता (योग्यता)',
    benefitsTab: '💰 मिलने वाले लाभ',
    documentsTab: '📄 जरूरी दस्तावेज',
    stepsTab: '📝 आवेदन करने के आसान चरण',
    officialSiteButton: 'आधिकारिक सरकारी पोर्टल',
    listenEntireScheme: 'पूरी योजना की जानकारी आवाज़ में सुनें',
    stopSchemeAudio: 'आवाज़ रोकें',
    disclaimerNotice: 'महत्वपूर्ण सूचना: यह जानकारी केवल मार्गदर्शन के लिए है। अंतिम पात्रता बैंक और सरकारी नियमों पर निर्भर करती है। किसी भी दलाल को पैसे न दें।',
    quickPromptsTitle: 'आसान उदाहरण (क्लिक करके बोलें):',
    micPermissionNotice: 'माइक नहीं चल रहा तो लिखकर पूछें या नीचे दिए उदाहरण पर क्लिक करें।',
    simulateVoiceNotice: 'आवाज का नमूना चलाएं',
    stepIndicator: 'चरण',
    govPortalBadge: 'भारत सरकार का आधिकारिक पोर्टल',
    backToConversation: 'बातचीत पर लौटें',
  },
  'en-IN': {
    appName: 'AwaazAI',
    tagline: 'Speak in Your Language. Access What You Need.',
    badge: 'Voice-First Government Scheme Assistant for Rural Women',
    getStarted: 'Get Started',
    selectLanguageTitle: 'Choose Your Language',
    selectLanguageSubtitle: 'Select the language you feel most comfortable speaking',
    changeLanguage: 'Change Language',
    howCanWeHelp: 'How can we help you?',
    subHelpHint: 'Speak your problem naturally — e.g. "I want to start tailoring work", "Need financial support for dairy", or "How to get a small loan?"',
    speakProblem: 'Speak your problem',
    listening: 'Listening...',
    listeningHint: 'Speak clearly into your microphone now',
    stopListening: 'Done Speaking',
    typeInstead: 'Type instead',
    typePlaceholder: 'Type your question or problem here...',
    send: 'Send',
    listenToVoice: 'Listen',
    stopVoice: 'Stop Audio',
    speaking: 'Speaking...',
    dontKnowWhatToAsk: "I don't know what to ask",
    dontKnowDesc: 'Tap any category below to get guided step-by-step:',
    clearChat: 'New Conversation',
    verifiedSchemeTitle: 'Verified Government Scheme',
    verifiedSchemeBadge: 'Official Government Scheme',
    viewSchemeDetails: 'View Complete Scheme Guide',
    eligibilityTab: '✓ Eligibility',
    benefitsTab: '💰 Benefits',
    documentsTab: '📄 Required Documents',
    stepsTab: '📝 Application Steps',
    officialSiteButton: 'Official Government Website',
    listenEntireScheme: 'Listen to Scheme Details',
    stopSchemeAudio: 'Stop Audio',
    disclaimerNotice: 'Important Notice: This prototype is for informational assistance. Final eligibility and loan disbursal are subject to government and bank guidelines. Beware of unauthorized intermediaries.',
    quickPromptsTitle: 'Common spoken requests (tap to ask):',
    micPermissionNotice: 'If microphone access is restricted, you can type or tap the quick samples.',
    simulateVoiceNotice: 'Voice Demo Mode',
    stepIndicator: 'Step',
    govPortalBadge: 'Official Government of India Portal',
    backToConversation: 'Back to Chat',
  },
};
