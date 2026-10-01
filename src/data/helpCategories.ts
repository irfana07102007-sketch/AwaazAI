import { HelpCategoryItem, LanguageCode } from '../types';

export const CATEGORIES_BY_LANG: Record<LanguageCode, HelpCategoryItem[]> = {
  'ta-IN': [
    {
      id: 'financial',
      icon: 'IndianRupee',
      title: 'நிதி உதவி (Financial Support)',
      description: 'தொழில் தொடங்க அல்லது சுயமாக வளர சிறு கடன் உதவி',
      samplePrompt: 'சிறு தொழில் தொடங்க ரூ.50,000 வரை கடன் அல்லது நிதி உதவி எவ்வாறு பெறுவது?',
    },
    {
      id: 'business',
      icon: 'Briefcase',
      title: 'வேலை / சுயதொழில் (Jobs / Business)',
      description: 'தையல் மெஷின், மளிகை, பால் பண்ணை போன்ற சிறு வியாபாரம்',
      samplePrompt: 'தையல் மெஷின் வாங்கி வீட்டில் இருந்தே தொழில் செய்ய என்ன அரசு உதவி உள்ளது?',
    },
    {
      id: 'education',
      icon: 'GraduationCap',
      title: 'கல்வி உதவி (Education)',
      description: 'பெண் குழந்தைகள் பள்ளி, கல்லூரி படிப்புக்கான உதவித்தொகை',
      samplePrompt: 'பெண் குழந்தைகளின் பள்ளி அல்லது கல்லூரி கல்விக்கு என்ன அரசு திட்டங்கள் உள்ளன?',
    },
    {
      id: 'housing',
      icon: 'Home',
      title: 'வீடு கட்டும் உதவி (Housing)',
      description: 'கிராமப்புற பக்கா வீடு கட்டும் பிரதான் மந்திரி ஆவாஸ் திட்டம்',
      samplePrompt: 'கிராமத்தில் பக்கா வீடு கட்ட அரசு மானிய உதவி எவ்வாறு பெறுவது?',
    },
    {
      id: 'women_support',
      icon: 'HeartHandshake',
      title: 'மகளிர் ஆதரவு (Women Support)',
      description: 'சுய உதவிக்குழு (SHG), லாக்பதி தீதி மற்றும் பெண்களுக்கான சிறப்பு சலுகைகள்',
      samplePrompt: 'மகளிர் சுய உதவி குழுவில் சேர்ந்து தொழில் தொடங்க என்ன அரசு சலுகைகள் உள்ளன?',
    },
  ],
  'te-IN': [
    {
      id: 'financial',
      icon: 'IndianRupee',
      title: 'ఆర్థిక సహాయం (Financial Support)',
      description: 'చిన్న వ్యాపారం కోసం రుణం లేదా ఆర్థిక తోడ్పాటు',
      samplePrompt: 'చిన్న వ్యాపారం ప్రారంభించడానికి ప్రభుత్వం నుండి రూ. 50,000 వరకు రుణం ఎలా పొందాలి?',
    },
    {
      id: 'business',
      icon: 'Briefcase',
      title: 'ఉపాధి / వ్యాపారం (Jobs / Business)',
      description: 'కుట్టు పని, చిన్న దుకాణం, పాడి గేదెల కొనుగోలు సహాయం',
      samplePrompt: 'కుట్టు మిషన్ కొని ఇంట్లోనే స్వయం ఉపాధి పొందడానికి ఏ ప్రభుత్వ పథకం ఉంది?',
    },
    {
      id: 'education',
      icon: 'GraduationCap',
      title: 'విద్య సహాయం (Education)',
      description: 'బాలికల చదువు మరియు కళాశాల స్కాలర్‌షిప్‌లు',
      samplePrompt: 'ఆడపిల్లల చదువు కోసం ప్రభుత్వం ఇచ్చే స్కాలర్‌షిప్ పథకాలు ఏమిటి?',
    },
    {
      id: 'housing',
      icon: 'Home',
      title: 'ఇంటి నిర్మాణం (Housing)',
      description: 'గ్రామీణ ప్రాంతంలో పక్కా ఇల్లు కట్టుకోవడానికి ప్రభుత్వ సహాయం',
      samplePrompt: 'గ్రామంలో పక్కా ఇల్లు నిర్మించుకోవడానికి ప్రభుత్వ సాయం ఎలా లభిస్తుంది?',
    },
    {
      id: 'women_support',
      icon: 'HeartHandshake',
      title: 'మహిళా సంక్షేమం (Women Support)',
      description: 'మహిళా స్వయం సహాయక సంఘాలు (SHG) మరియు ప్రత్యేక రాయితీలు',
      samplePrompt: 'మహిళా సంఘం ద్వారా స్వయం ఉపాధి రుణాలు పొందడం ఎలా?',
    },
  ],
  'hi-IN': [
    {
      id: 'financial',
      icon: 'IndianRupee',
      title: 'वित्तीय सहायता (Financial Support)',
      description: 'नया काम शुरू करने हेतु बिना गारंटी का छोटा कर्ज',
      samplePrompt: 'छोटा व्यवसाय शुरू करने के लिए सरकार से ₹50,000 तक की आर्थिक मदद कैसे लें?',
    },
    {
      id: 'business',
      icon: 'Briefcase',
      title: 'रोजगार / व्यापार (Jobs / Business)',
      description: 'सिलाई मशीन, किराना दुकान, पशुपालन व हस्तशिल्प काम',
      samplePrompt: 'सिलाई मशीन खरीदने और घर से सिलाई का काम शुरू करने के लिए कौन सी योजना है?',
    },
    {
      id: 'education',
      icon: 'GraduationCap',
      title: 'शिक्षा सहायता (Education)',
      description: 'बेटियों की स्कूल और कॉलेज पढ़ाई हेतु सरकारी छात्रवृत्ति',
      samplePrompt: 'बेटियों की उच्च शिक्षा और स्कूल फीस के लिए कौन सी सरकारी योजनाएं हैं?',
    },
    {
      id: 'housing',
      icon: 'Home',
      title: 'मकान सहायता (Housing)',
      description: 'गांव में पक्का मकान बनाने हेतु प्रधानमंत्री आवास योजना',
      samplePrompt: 'गांव में पक्का मकान बनाने के लिए सरकारी आर्थिक सहायता कैसे मिलती है?',
    },
    {
      id: 'women_support',
      icon: 'HeartHandshake',
      title: 'महिला सहायता (Women Support)',
      description: 'महिला स्वयं सहायता समूह (SHG), लखपति दीदी एवं नारी सशक्तिकरण',
      samplePrompt: 'महिला स्वयं सहायता समूह से जुड़कर आजीविका शुरू करने की क्या प्रक्रिया है?',
    },
  ],
  'en-IN': [
    {
      id: 'financial',
      icon: 'IndianRupee',
      title: 'Financial Support',
      description: 'Micro-loans and credit assistance to kickstart small ventures',
      samplePrompt: 'How can I get up to ₹50,000 collateral-free financial support to start work?',
    },
    {
      id: 'business',
      icon: 'Briefcase',
      title: 'Jobs / Business',
      description: 'Tailoring, kirana shop, dairy cattle, artisan handicrafts',
      samplePrompt: 'What government scheme helps women buy a sewing machine or start a small shop?',
    },
    {
      id: 'education',
      icon: 'GraduationCap',
      title: 'Education',
      description: 'Scholarships and educational grants for daughters and students',
      samplePrompt: 'What schemes are available for the education and schooling of girl children?',
    },
    {
      id: 'housing',
      icon: 'Home',
      title: 'Housing',
      description: 'Rural pucca housing assistance under PM Awas Yojana',
      samplePrompt: 'How can rural families apply for financial grant to construct a pucca house?',
    },
    {
      id: 'women_support',
      icon: 'HeartHandshake',
      title: 'Women Support',
      description: 'Self Help Groups (SHG), Lakhpati Didi initiative, skill training',
      samplePrompt: 'How can women join Self-Help Groups (SHGs) to receive livelihood grants and training?',
    },
  ],
};

export const QUICK_VOICE_SAMPLES: Record<LanguageCode, string[]> = {
  'ta-IN': [
    'எனக்கு தையல் மெஷின் வாங்க கடன் உதவி வேண்டும்',
    'பால் மாடு வாங்க அரசு உதவி எவ்வாறு பெறுவது?',
    'கிராமப்புற பெண்களுக்கு என்ன அரசு கடன் திட்டம் உள்ளது?',
    'முத்ரா சிசு கடன் பெற என்ன ஆவணங்கள் தேவை?',
  ],
  'te-IN': [
    'నాకు కుట్టు మిషన్ కోసం రుణం కావాలి',
    'పాడి గేదెలు కొనడానికి ప్రభుత్వ పథకం ఏమిటి?',
    'గ్రామీణ మహిళలకు ముద్రా రుణం ఎలా వస్తుంది?',
    'శిశు రుణం కోసం ఏ డాక్యుమెంట్లు కావాలి?',
  ],
  'hi-IN': [
    'मुझे सिलाई मशीन खरीदने के लिए सरकारी लोन चाहिए',
    'डेयरी या भैंस खरीदने के लिए सरकारी मदद कैसे मिलेगी?',
    'मुद्रा शिशु योजना में कितना पैसा मिलता है?',
    'आवेदन करने के लिए क्या कागजात चाहिए?',
  ],
  'en-IN': [
    'I want a loan to buy a sewing machine for tailoring',
    'How can I get government financial support for dairy cattle?',
    'What are the eligibility criteria for PM Mudra Shishu loan?',
    'What documents are needed to apply for the women micro-loan?',
  ],
};
