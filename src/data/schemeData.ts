import { LanguageCode, SchemeDetails } from '../types';

export const VERIFIED_SCHEME: Record<LanguageCode, SchemeDetails> = {
  'ta-IN': {
    id: 'pmmy-shishu',
    name: 'பிரதமர் முத்ரா திட்டம் - சிசு கடன் (PMMY Shishu)',
    tagline: 'மகளிர் சுயதொழில் மற்றும் சிறு வியாபாரத்திற்கான பிணையில்லா கடன் உதவி',
    category: 'சுயதொழில் & சிறு கடன் (Livelihood & Business)',
    ministry: 'நிதி அமைச்சகம், இந்திய அரசு (Ministry of Finance)',
    loanLimit: 'ரூ. 50,000 வரை (Up to ₹50,000)',
    collateral: 'பிணை அல்லது அடமானம் தேவையில்லை (Zero Collateral)',
    eligibility: [
      'இந்திய குடிமக்களான பெண்கள் (18 வயதுக்கு மேற்பட்டோர்).',
      'தையல், பூக்கடை, பால் பண்ணை, மளிகை, சிற்றுண்டி அல்லது கைவினை போன்ற வருமானம் ஈட்டும் சிறு தொழில் செய்பவர்கள் அல்லது புதிதாக தொடங்க விரும்புவோர்.',
      'எந்த வங்கியிலும் முந்தைய கடனை திருப்பிச் செலுத்தாத தவறு (Default) இல்லாதவராக இருத்தல் வேண்டும்.',
      'கிராமப்புற சுய உதவிக் குழு (SHG) உறுப்பினர்களுக்கும் முன்னுரிமை உண்டு.',
    ],
    benefits: [
      'எந்தவித சொத்து அடமானமும் (Collateral) இல்லாமல் ரூ.50,000 வரை கடன் கிடைக்கும்.',
      'விண்ணப்ப கட்டணம் அல்லது புரோசஸிங் கட்டணம் (Processing Fee) முற்றிலும் இலவசம்.',
      'குறைந்த வங்கி வட்டி விகிதம் (ஆண்டுக்கு சுமார் 8% - 10%).',
      'திருப்பிச் செலுத்த 3 முதல் 5 ஆண்டுகள் வரை எளிய தவணை வசதி.',
      'முத்ரா கார்டு (Mudra RuPay Debit Card) மூலம் தேவையான போது பணத்தை எடுத்துக் கொள்ளலாம்.',
    ],
    requiredDocuments: [
      'ஆதார் அட்டை (Aadhaar Card) அல்லது வாக்காளர் அடையாள அட்டை.',
      'வங்கி சேமிப்பு கணக்கு பாஸ்புக் (Bank Passbook with IFSC).',
      'பாஸ்போர்ட் அளவு வண்ண புகைப்படம் (2 புகைப்படங்கள்).',
      'தொழில் செய்வதற்கான குறிப்பு (எ.கா: தையல் மெஷின் வாங்கும் விலைப்பட்டியல்/Quotation).',
      'இருப்பிட சான்று (ரேஷன் கார்டு அல்லது மின்சார பில்).',
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'அருகிலுள்ள வங்கி அல்லது சி.எஸ்.சி மையம் செல்லுங்கள்',
        instruction: 'உங்கள் கிராமத்திற்கு அருகிலுள்ள அரசு/கிராம வங்கி (Canara, SBI, Indian Bank போன்றவை) அல்லது பொது சேவை மையத்திற்கு (CSC) செல்லவும்.',
      },
      {
        stepNumber: 2,
        title: 'முத்ரா "சிசு" விண்ணப்பப் படிவத்தை கேளுங்கள்',
        instruction: 'வங்கி அலுவலரிடம் "முத்ரா சிசு கடன் படிவம் (Shishu Form)" வேண்டும் என்று கேளுங்கள். இதில் உங்கள் அடிப்படை விவரங்கள் மட்டுமே இருக்கும்.',
      },
      {
        stepNumber: 3,
        title: 'ஆவணங்களை இணைத்து சமர்ப்பிக்கவும்',
        instruction: 'ஆதார் நகல், வங்கி கணக்கு புத்தகம், மற்றும் நீங்கள் வாங்க விரும்பும் உபகரணத்தின் ரசீது/கொட்டேஷன் இணைத்து கையொப்பமிடவும்.',
      },
      {
        stepNumber: 4,
        title: 'சரிபார்ப்பு மற்றும் நேரடி வங்கி வரவு',
        instruction: 'வங்கி மேலாளர் விவரங்களை சரிபார்த்தவுடன், கடன் தொகை நேரடியாக உங்கள் வங்கி கணக்கிற்கு வந்துவிடும்.',
      },
    ],
    officialUrl: 'https://www.mudra.org.in',
    officialPortalName: 'Mudra Official Portal (mudra.org.in)',
    helpline: '1800 180 1111 / 1800 11 0001 (கட்டணமில்லா தொலைபேசி)',
    disclaimer: 'கவனத்திற்கு: இந்த வழிகாட்டி கிராமப்புற பெண்களின் விழிப்புணர்விற்காக மட்டுமே. இறுதி கடன் ஒப்புதல் வங்கி விதிமுறைகளுக்கு உட்பட்டது. இடைத்தரகர்களுக்கு பணம் கொடுக்க வேண்டாம்; அரசு சேவைகளுக்கு கட்டணம் இல்லை.',
    audioSummary: 'வணக்கம். நீங்கள் பார்க்கும் திட்டம் பிரதமர் முத்ரா சிசு கடன் திட்டம். தையல், பால் பண்ணை, சிறு வியாபாரம் தொடங்கும் பெண்களுக்கு எந்தவித அடமானமும் இல்லாமல் ரூ.50,000 வரை கடன் வழங்கப்படுகிறது. இதற்கு ஆதார் அட்டை, வங்கி பாஸ்புக், மற்றும் நீங்கள் வாங்க விரும்பும் பொருட்களின் விலைப்பட்டியல் போதுமானது. அருகிலுள்ள அரசு வங்கியில் விண்ணப்பிக்கலாம்.',
  },
  'te-IN': {
    id: 'pmmy-shishu',
    name: 'ప్రధాన మంత్రి ముద్రా యోజన - శిశు రుణం (PMMY Shishu)',
    tagline: 'మహిళల స్వయం ఉపాధి మరియు చిన్న వ్యాపారాల కోసం పూచీకత్తు లేని రుణం',
    category: 'జీవనోపాధి & చిన్న రుణం (Livelihood & Business)',
    ministry: 'ఆర్థిక మంత్రిత్వ శాఖ, భారత ప్రభుత్వం (Ministry of Finance)',
    loanLimit: 'రూ. 50,000 వరకు (Up to ₹50,000)',
    collateral: 'ఎలాంటి పూచీకత్తు అవసరం లేదు (Zero Collateral)',
    eligibility: [
      'భారతీయ పౌరులైన మహిళలు (18 సంవత్సరాలు నిండిన వారు).',
      'కుట్టు పని, పాడి గేదెలు, చిన్న కిరాణా, కూరగాయల వ్యాపారం లేదా చేతి వృత్తులు ప్రారంభించాలనుకునే మహిళలు.',
      'గతంలో ఏ బ్యాంకులోనూ రుణ ఎగవేతదారుగా ఉండకూడదు.',
      'స్వయం సహాయక సంఘాల (SHG) సభ్యులకు ప్రత్యేక ప్రాధాన్యత లభిస్తుంది.',
    ],
    benefits: [
      'ఎలాంటి ఆస్తి తనఖా లేకుండా రూ. 50,000 వరకు రుణం లభిస్తుంది.',
      'దరఖాస్తు రుసుము లేదా ప్రాసెసింగ్ ఫీజు సున్నా.',
      'తక్కువ వడ్డీ రేటు (ఏడాదికి సుమారు 8% - 10%).',
      'తిరిగి చెల్లించడానికి 3 నుండి 5 సంవత్సరాల సులభ వాయిదాలు.',
      'ముద్రా డెబిట్ కార్డు ద్వారా అవసరమైనప్పుడు డబ్బులు తీసుకోవచ్చు.',
    ],
    requiredDocuments: [
      'ఆధార్ కార్డు లేదా ఓటర్ ఐడీ కార్డు.',
      'బ్యాంకు సేవింగ్స్ ఖాతా పాస్‌బుక్ కాపీ.',
      'పాస్‌పోర్ట్ సైజు ఫోటోలు (2 కాపీలు).',
      'కొనుగోలు చేయబోయే యంత్రం లేదా సామాగ్రి కొటేషన్/రసీదు.',
      'నివాస ధృవీకరణ పత్రం (రేషన్ కార్డు లేదా కరెంట్ బిల్లు).',
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'సమీపంలోని బ్యాంకు లేదా సి.ఎస్.సి కేంద్రానికి వెళ్లండి',
        instruction: 'మీ గ్రామానికి దగ్గరలోని జాతీయ లేదా గ్రామీణ బ్యాంకు (SBI, Andhra Pragathi, Union Bank మొదలైనవి) లేదా CSC కేంద్రానికి వెళ్లండి.',
      },
      {
        stepNumber: 2,
        title: 'ముద్రా "శిశు" దరఖాస్తు ఫారమ్ అడగండి',
        instruction: 'బ్యాంకు అధికారి వద్ద "ముద్రా శిశు లోన్ ఫారమ్" తీసుకొని మీ ప్రాథమిక వివరాలు నింపండి.',
      },
      {
        stepNumber: 3,
        title: 'పత్రాలు జతచేసి సమర్పించండి',
        instruction: 'ఆధార్, బ్యాంకు పాస్‌బుక్, కొటేషన్ కాపీలు జతచేసి సంతకం లేదా వేలిముద్ర వేసి ఇవ్వండి.',
      },
      {
        stepNumber: 4,
        title: 'ధృవీకరణ మరియు ఖాతాలోకి నగదు బదిలీ',
        instruction: 'బ్యాంకు పరిశీలన పూర్తి కాగానే, రుణ మొత్తం నేరుగా మీ ఖాతాలో జమ అవుతుంది.',
      },
    ],
    officialUrl: 'https://www.mudra.org.in',
    officialPortalName: 'Mudra Official Portal (mudra.org.in)',
    helpline: '1800 180 1111 / 1800 11 0001 (టోల్ ఫ్రీ నెంబర్)',
    disclaimer: 'ముఖ్య గమనిక: ఈ సమాచారం గ్రామీణ మహిళల అవగాహన కోసం మాత్రమే. రుణ మంజూరు బ్యాంకు నిబంధనలకు లోబడి ఉంటుంది. ఎవరికీ ఎలాంటి లంచాలు లేదా కమిషన్లు ఇవ్వవద్దు.',
    audioSummary: 'నమస్కారం. మీరు చూస్తున్న పథకం ప్రధాన మంత్రి ముద్రా శిశు యోజన. కుట్టు పని, పాడి గేదెలు, చిన్న వ్యాపారాలు ప్రారంభించడానికి మహిళలకు ఎలాంటి పూచీకత్తు లేకుండా 50 వేల రూపాయల వరకు రుణం లభిస్తుంది. ఆధార్ కార్డు మరియు బ్యాంకు పాస్‌బుక్ ఉంటే సరిపోతుంది. మీ సమీప ప్రభుత్వ బ్యాంకులో దరఖాస్తు చేసుకోవచ్చు.',
  },
  'hi-IN': {
    id: 'pmmy-shishu',
    name: 'प्रधानमंत्री मुद्रा योजना - शिशु ऋण (PMMY Shishu)',
    tagline: 'ग्रामीण महिलाओं के स्वरोजगार और छोटे व्यवसाय हेतु बिना गारंटी सरकारी लोन',
    category: 'आजीविका एवं स्वरोजगार (Livelihood & Business)',
    ministry: 'वित्त मंत्रालय, भारत सरकार (Ministry of Finance)',
    loanLimit: '₹50,000 तक का लोन (Up to ₹50,000)',
    collateral: 'कोई गारंटी या जमीन-जायदाद गिरवी रखने की जरूरत नहीं',
    eligibility: [
      'भारत की महिला नागरिक जिनकी उम्र 18 वर्ष या उससे अधिक हो।',
      'सिलाई-कढ़ाई, चाय-नाश्ता दुकान, डेयरी/पशुपालन, किराना, हस्तशिल्प या कोई छोटा काम शुरू करने की इच्छा रखने वाली महिलाएं।',
      'किसी भी बैंक में पूर्व में कर्ज न चुकाने का रिकॉर्ड (डिफॉल्ट) न हो।',
      'महिला स्वयं सहायता समूह (SHG) से जुड़ी बहनों को विशेष प्रोत्साहन।',
    ],
    benefits: [
      'बिना किसी गारंटी (Collateral-Free) के ₹50,000 तक की आर्थिक सहायता।',
      'आवेदन करने के लिए कोई प्रोसेसिंग फीस नहीं लगती (शून्य शुल्क)।',
      'किफायती और सरकारी ब्याज दर (लगभग 8% - 10% वार्षिक)।',
      'आसान किश्तों में 3 से 5 साल तक कर्ज चुकाने की सुविधा।',
      'मुद्रा रूपे कार्ड (Mudra Card) जिससे जरूरत के अनुसार एटीएम से पैसे निकाल सकते हैं।',
    ],
    requiredDocuments: [
      'आधार कार्ड (Aadhaar Card) या मतदाता पहचान पत्र।',
      'बैंक बचत खाता पासबुक (Bank Passbook)।',
      'पासपोर्ट साइज 2 रंगीन फोटो।',
      'खरीदने वाले सामान/मशीन का कच्चा बिल या कोटेशन (जैसे सिलाई मशीन की कीमत)।',
      'निवास प्रमाण पत्र (राशन कार्ड या बिजली बिल)।',
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'निकटतम सरकारी/ग्रामीण बैंक या CSC केंद्र जाएं',
        instruction: 'अपने गांव या कस्बे के किसी भी सरकारी बैंक (जैसे SBI, PNB, ग्रामीण बैंक) या जन सेवा केंद्र में जाएं।',
      },
      {
        stepNumber: 2,
        title: 'मुद्रा "शिशु" फॉर्म मांगें',
        instruction: 'बैंक कर्मचारी से "प्रधानमंत्री मुद्रा शिशु लोन फॉर्म" मांगें। यह 1-2 पन्नों का आसान फॉर्म होता है।',
      },
      {
        stepNumber: 3,
        title: 'दस्तावेज संलग्न करके जमा करें',
        instruction: 'आधार कार्ड, बैंक पासबुक और मशीन/सामान के कोटेशन की फोटोकॉपी लगाकर फॉर्म जमा करें।',
      },
      {
        stepNumber: 4,
        title: 'सत्यापन के बाद राशि सीधे बैंक खाते में',
        instruction: 'बैंक सत्यापन के बाद लोन का पैसा सीधे आपके बैंक खाते में क्रेडिट कर दिया जाएगा।',
      },
    ],
    officialUrl: 'https://www.mudra.org.in',
    officialPortalName: 'Mudra Official Portal (mudra.org.in)',
    helpline: '1800 180 1111 / 1800 11 0001 (टोल फ्री नंबर)',
    disclaimer: 'महत्वपूर्ण सूचना: यह जानकारी केवल ग्रामीण बहनों की सहायता और जागरूकता के लिए है। ऋण की अंतिम स्वीकृति बैंक नियमों पर आधारित होती है। किसी भी दलाल को कोई पैसा न दें।',
    audioSummary: 'नमस्ते दीदी। यह प्रधानमंत्री मुद्रा शिशु योजना है। इसमें सिलाई, डेयरी, छोटी दुकान या कोई नया काम शुरू करने के लिए बिना किसी गारंटी के 50,000 रुपये तक का लोन मिलता है। इसके लिए आधार कार्ड, बैंक पासबुक और सिलाई मशीन या सामान का कोटेशन चाहिए। आप अपने पास के सरकारी बैंक में जाकर इसका फॉर्म भर सकती हैं।',
  },
  'en-IN': {
    id: 'pmmy-shishu',
    name: 'Pradhan Mantri Mudra Yojana - Shishu Loan (PMMY)',
    tagline: 'Collateral-free micro loans to empower women entrepreneurs & small livelihoods',
    category: 'Livelihood & Small Business Support',
    ministry: 'Ministry of Finance, Government of India',
    loanLimit: 'Up to ₹50,000',
    collateral: 'Zero Collateral / No Guarantor Required',
    eligibility: [
      'Indian women citizens aged 18 years and above.',
      'Individuals wishing to start or expand small income-generating activities such as tailoring, dairy cattle, grocery shop, artisan crafts, food stalls, or beauty salon.',
      'Clean credit history with no prior bank loan default.',
      'Priority consideration for members of Women Self-Help Groups (SHGs).',
    ],
    benefits: [
      'Collateral-free credit support up to ₹50,000 without pledging land or jewelry.',
      'Zero processing fee and no hidden administrative charges.',
      'Affordable government-regulated interest rates (typically 8% - 10% per annum).',
      'Flexible repayment tenure between 3 to 5 years in simple monthly installments.',
      'Convenient Mudra RuPay Debit Card to withdraw working capital as needed.',
    ],
    requiredDocuments: [
      'Proof of Identity: Aadhaar Card or Voter ID Card.',
      'Bank Savings Account Passbook copy with clear IFSC and account number.',
      'Two recent passport-size color photographs.',
      'Quotation / Price estimate for tools/machinery (e.g. sewing machine price quote).',
      'Address proof: Ration Card, Voter ID, or Utility bill.',
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Visit nearest Public Sector / Regional Rural Bank or CSC',
        instruction: 'Go to your nearest nationalized bank (e.g. State Bank of India, Indian Bank, Canara Bank), Regional Rural Bank, or Common Services Center.',
      },
      {
        stepNumber: 2,
        title: 'Request the PMMY "Shishu" Loan Form',
        instruction: 'Ask the bank loan officer for the simple 1-page Mudra Shishu application form designed for small businesses.',
      },
      {
        stepNumber: 3,
        title: 'Attach basic documents & quotation',
        instruction: 'Attach photocopies of your Aadhaar card, bank passbook, and the quotation for the equipment or inventory you wish to purchase.',
      },
      {
        stepNumber: 4,
        title: 'Verification & Direct Account Credit',
        instruction: 'After basic verification, the sanctioned loan amount is credited directly to your bank account or paid to the equipment vendor.',
      },
    ],
    officialUrl: 'https://www.mudra.org.in',
    officialPortalName: 'Mudra Official Portal (mudra.org.in)',
    helpline: '1800 180 1111 / 1800 11 0001 (Toll-Free Helpline)',
    disclaimer: 'Notice: This prototype provides guidance for informational assistance. Final eligibility, appraisal, and disbursal are determined by the participating bank. Do not pay any fees to middlemen or unverified agents.',
    audioSummary: 'Hello. This is the Pradhan Mantri Mudra Shishu loan scheme. It offers collateral-free loans up to 50,000 rupees to help women start or grow tailoring, dairy, petty shops, or small trades. You need your Aadhaar card, bank passbook, and an equipment quote. You can apply at any nearby nationalized bank.',
  },
};

/**
 * Builds the complete scheme audio script containing all 9 sections
 * in exact top-to-bottom sequence according to the user's selected language.
 */
export function getCompleteSchemeCardSpeech(scheme: SchemeDetails, lang: LanguageCode): string {
  if (lang === 'ta-IN') {
    return [
      'வணக்கம் சகோதரி.',
      `அரசு திட்டம்: ${scheme.name}.`,
      `விளக்கம்: ${scheme.tagline}. அரசு துறை: ${scheme.ministry}.`,
      `தகுதிகள்: ${scheme.eligibility.join('. ')}.`,
      `கடன் உதவி மற்றும் முக்கிய பலன்கள்: கடன் உதவி ${scheme.loanLimit}. ${scheme.collateral}. ${scheme.benefits.join('. ')}.`,
      `தேவையான ஆவணங்கள்: ${scheme.requiredDocuments.join('. ')}.`,
      `விண்ணப்பிக்கும் நான்கு எளிய வழிகள்: ${scheme.applicationSteps.map((s) => `படி ${s.stepNumber}: ${s.title}. ${s.instruction}`).join('. ')}.`,
      `அதிகாரப்பூர்வ இணையதளம் மற்றும் உதவி எண்: இணையதளம் ${scheme.officialPortalName}. கட்டணமில்லா உதவி தொலைபேசி எண்: ${scheme.helpline}.`,
      `முக்கிய அறிவிப்பு: ${scheme.disclaimer}.`
    ].join('\n\n');
  }

  if (lang === 'te-IN') {
    return [
      'నమస్కారం అక్క.',
      `పథకం పేరు: ${scheme.name}.`,
      `వివరణ: ${scheme.tagline}. శాఖ: ${scheme.ministry}.`,
      `అర్హతలు: ${scheme.eligibility.join('. ')}.`,
      `రుణ మొత్తం మరియు ప్రయోజనాలు: సహాయం ${scheme.loanLimit}. ${scheme.collateral}. ${scheme.benefits.join('. ')}.`,
      `అవసరమైన పత్రాలు: ${scheme.requiredDocuments.join('. ')}.`,
      `దరఖాస్తు విధానం నాలుగు సులభ దశలు: ${scheme.applicationSteps.map((s) => `దశ ${s.stepNumber}: ${s.title}. ${s.instruction}`).join('. ')}.`,
      `అధికారిక వెబ్‌సైట్ మరియు హెల్ప్‌లైన్: పోర్టల్ ${scheme.officialPortalName}. టోల్ ఫ్రీ హెల్ప్‌లైన్ నంబర్: ${scheme.helpline}.`,
      `ముఖ్య గమనిక: ${scheme.disclaimer}.`
    ].join('\n\n');
  }

  if (lang === 'hi-IN') {
    return [
      'नमस्ते दीदी.',
      `योजना का नाम: ${scheme.name}.`,
      `विवरण: ${scheme.tagline}. मंत्रालय: ${scheme.ministry}.`,
      `पात्रता एवं योग्यता: ${scheme.eligibility.join('. ')}.`,
      `ऋण राशि एवं मिलने वाले लाभ: सहायता राशि ${scheme.loanLimit}. ${scheme.collateral}. ${scheme.benefits.join('. ')}.`,
      `जरूरी दस्तावेज: ${scheme.requiredDocuments.join('. ')}.`,
      `आवेदन करने के चार आसान चरण: ${scheme.applicationSteps.map((s) => `चरण ${s.stepNumber}: ${s.title}. ${s.instruction}`).join('. ')}.`,
      `आधिकारिक पोर्टल एवं हेल्पलाइन: वेबसाइट ${scheme.officialPortalName}. टोल फ्री हेल्पलाइन नंबर: ${scheme.helpline}.`,
      `महत्वपूर्ण सूचना: ${scheme.disclaimer}.`
    ].join('\n\n');
  }

  return [
    'Hello sister.',
    `Scheme Name: ${scheme.name}.`,
    `Description: ${scheme.tagline}. Ministry: ${scheme.ministry}.`,
    `Eligibility: ${scheme.eligibility.join('. ')}.`,
    `Loan Amount and Key Benefits: Assistance ${scheme.loanLimit}. ${scheme.collateral}. ${scheme.benefits.join('. ')}.`,
    `Required Documents: ${scheme.requiredDocuments.join('. ')}.`,
    `Four Easy Application Steps: ${scheme.applicationSteps.map((s) => `Step ${s.stepNumber}: ${s.title}. ${s.instruction}`).join('. ')}.`,
    `Official Website and Helpline: Portal ${scheme.officialPortalName}. Toll-free helpline number: ${scheme.helpline}.`,
    `Important Notice: ${scheme.disclaimer}.`
  ].join('\n\n');
}
