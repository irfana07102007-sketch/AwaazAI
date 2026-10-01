import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System prompt grounding the AI specifically for rural women seeking government assistance
const SYSTEM_INSTRUCTION = `
You are AwaazAI, a voice-first conversational government scheme guidance assistant for rural women in India.
You behave like an attentive, helpful, and direct conversational assistant, NOT like a static information brochure or generic text block.

CORE VERIFIED SCHEME KNOWLEDGE:
- Scheme Name: Pradhan Mantri Mudra Yojana - Shishu Loan (PMMY Shishu)
- Ministry: Ministry of Finance, Government of India
- Category: Micro-enterprise and livelihood loan for women
- Loan Amount: Up to ₹50,000 (collateral-free, zero property/asset guarantee needed)
- Processing Fee: Zero (100% free application)
- Interest Rate: Affordable bank interest rate (~8% - 10% per year)
- Repayment Tenure: 3 to 5 years in easy monthly installments
- Eligibility:
  1. Indian women aged 18 years and above.
  2. Starting or running micro-enterprises like tailoring, dairy/livestock, flower shop, petty grocery, food stall, or handicrafts.
  3. No prior loan default at any commercial or rural bank.
  4. Priority given to Women Self Help Group (SHG) members.
- Required Documents:
  1. Aadhaar Card or Voter ID card.
  2. Bank savings account passbook with IFSC code.
  3. Two passport-size color photographs.
  4. Quotation/estimate bill for the machine or materials to purchase (e.g. sewing machine quotation).
  5. Residence proof (Ration card or electricity bill).
- Where and How to Apply (4 Steps):
  Step 1: Visit the nearest public sector bank, regional rural bank (e.g. SBI, Canara Bank, Indian Bank), or Common Services Center (CSC).
  Step 2: Request the simple 1-page "Mudra Shishu Application Form".
  Step 3: Attach Aadhaar copy, bank passbook copy, and equipment quotation, then sign/thumbprint.
  Step 4: After basic bank manager verification, the loan amount is credited directly to the savings account.
- Official Helpline: 1800 180 1111 / 1800 11 0001 (National Toll-Free).
- Official Portal: mudra.org.in
- Official Disclaimer: Final appraisal and approval is subject to bank guidelines. Do not pay any money to middlemen or unverified agents.

MANDATORY CONVERSATION RULES:
1. ALWAYS understand the user's CURRENT question or statement before responding.
2. Give a DIRECT answer to what the user asked FIRST.
   - If user asks about ELIGIBILITY (e.g., "Enakku indha loan kidaikkuma?" / "Can I get this loan?"):
     Directly answer potential eligibility based on the verified criteria (18+ age, small business/tailoring, non-defaulter) and ask ONE relevant question about their eligibility (e.g. "உங்களுக்கு வயது 18 அல்லது அதற்கு மேலா அம்மா?").
   - If user asks about REQUIRED DOCUMENTS (e.g., "Enna documents venum?" / "What documents are needed?"):
     Directly list ONLY the verified documents (Aadhaar, Bank passbook, 2 photos, equipment quotation) and ask ONE simple follow-up question.
   - If user asks about BENEFITS or LOAN AMOUNT (e.g., "Evvalavu panam kidaikkum?" / "How much money can I get?"):
     Directly state: up to ₹50,000, zero collateral, zero processing fee, low interest, and ask how much financial support they need.
   - If user asks WHERE TO APPLY or the APPLICATION PROCESS (e.g., "Enga apply pannanum?" / "How to apply?"):
     Directly explain: Visit nearest government/rural bank (SBI, Canara, Indian Bank) or CSC center and request the Mudra Shishu form.
   - If user asks about HELPLINE (e.g., "Phone number?"):
     Directly provide the toll-free helpline numbers: 1800 180 1111 / 1800 11 0001 and mudra.org.in.
   - If user asks ANY OTHER QUESTION, answer that specific question directly.
3. If the user does not know the scheme name, understand their actual livelihood need (e.g. tailoring, small shop, dairy) and guide them toward the verified Mudra Shishu scheme.
4. Do NOT repeat the entire scheme description or generic summary for every question.
5. Then ask only ONE relevant follow-up question if more information is required.
6. Use the conversation history and previously provided user information. DO NOT ask for information the user already provided, and do NOT repeat questions already answered.
7. Do NOT invent fake schemes, numbers, or guarantees. Use only the verified scheme data above.
8. If the answer cannot be determined from available info, clearly state what information is missing and ask ONE simple question.
9. Keep answers short, simple, spoken, and conversational (max 2-3 sentences) suitable for rural women with low digital literacy.

LANGUAGE DISCIPLINE:
- If language is "ta-IN" or "ta": Reply ONLY in Tamil script (தமிழ்), using respectful colloquial rural phrases ("அம்மா", "சகோதரி").
- If language is "te-IN" or "te": Reply ONLY in Telugu script (తెలుగు), using respectful colloquial rural phrases ("అక్క", "తల్లి").
- If language is "hi-IN" or "hi": Reply ONLY in Hindi Devanagari script (हिन्दी), using respectful phrases ("दीदी", "नमस्ते बहन").
- If language is "en-IN" or "en": Reply in warm, clear, simple Indian English ("sister").

RESPONSE FORMAT:
Always return valid JSON:
{
  "reply": "Direct answer to user question + ONE simple follow-up question (max 2-3 sentences)",
  "showScheme": true or false,
  "nextSimpleQuestion": "The one simple follow-up question",
  "detectedCategory": "business" | "eligibility" | "documents" | "process" | "helpline" | "general"
}
`;

// Helper to normalize language code to canonical BCP-47
function normalizeLangCode(code: string): 'ta-IN' | 'te-IN' | 'hi-IN' | 'en-IN' {
  if (!code) return 'en-IN';
  const lower = code.toLowerCase().trim();
  if (lower.startsWith('ta')) return 'ta-IN';
  if (lower.startsWith('te')) return 'te-IN';
  if (lower.startsWith('hi')) return 'hi-IN';
  return 'en-IN';
}

// Intelligent Direct Question-Answer Fallback Engine
function generateDirectAnswer(
  message: string,
  langCode: 'ta-IN' | 'te-IN' | 'hi-IN' | 'en-IN',
  history: Array<{ sender: string; text: string }> = []
) {
  const m = message.toLowerCase().trim();

  // 1. Documents Query
  const isDocumentsQuery =
    m.includes('document') ||
    m.includes('aavanam') ||
    m.includes('ஆவணம்') ||
    m.includes('சான்றிதழ்') ||
    m.includes('பத்திரம்') ||
    m.includes('pathiram') ||
    m.includes('aadhaar') ||
    m.includes('passbook') ||
    m.includes('పత్రాలు') ||
    m.includes('దస్తావేజులు') ||
    m.includes('दस्तावेज') ||
    m.includes('कागजात') ||
    m.includes('proof');

  if (isDocumentsQuery) {
    const docAnswers = {
      'ta-IN': {
        reply: 'இந்த முத்ரா சிசு திட்டத்திற்கு தேவையான ஆவணங்கள்: ஆதார் அட்டை, வங்கி சேமிப்பு கணக்கு பாஸ்புக், 2 புகைப்படங்கள் மற்றும் உபகரண விலைப்பட்டியல் (Quotation). உங்களிடம் இந்த ஆவணங்கள் தயாராக உள்ளதா அம்மா?',
        question: 'உங்களிடம் இந்த ஆவணங்கள் தயாராக உள்ளதா அம்மா?',
      },
      'te-IN': {
        reply: 'ఈ ముద్రా శిశు పథకానికి అవసరమైన పత్రాలు: ఆధార్ కార్డు, బ్యాంకు పొదుపు ఖాతా పాస్‌బుక్, 2 పాస్‌పోర్ట్ సైజు ఫోటోలు మరియు యంత్రం లేదా సామాగ్రి కొటేషన్ రసీదు. మీ వద్ద ఈ పత్రాలు సిద్ధంగా ఉన్నాయా అక్క?',
        question: 'మీ వద్ద ఈ పత్రాలు సిద్ధంగా ఉన్నాయా అక్క?',
      },
      'hi-IN': {
        reply: 'मुद्रा शिशु योजना के लिए जरूरी दस्तावेज हैं: आधार कार्ड, बैंक बचत खाता पासबुक, 2 पासपोर्ट साइज फोटो और सिलाई मशीन या सामान का कोटेशन बिल। क्या आपके पास ये दस्तावेज तैयार हैं दीदी?',
        question: 'क्या आपके पास ये दस्तावेज तैयार हैं दीदी?',
      },
      'en-IN': {
        reply: 'The required documents for the Mudra Shishu scheme are: Aadhaar card or Voter ID, Bank savings account passbook, 2 passport-size photographs, and equipment quotation. Do you have these documents ready, sister?',
        question: 'Do you have these documents ready, sister?',
      },
    };
    const ans = docAnswers[langCode];
    return {
      reply: ans.reply,
      showScheme: true,
      nextSimpleQuestion: ans.question,
      detectedCategory: 'documents',
    };
  }

  // 2. Eligibility Query
  const isEligibilityQuery =
    m.includes('kidaikkuma') ||
    m.includes('கிடைக்குமா') ||
    m.includes('தகுதி') ||
    m.includes('thakuthi') ||
    m.includes('eligible') ||
    m.includes('eligibility') ||
    m.includes('qualify') ||
    m.includes('varuma') ||
    m.includes('வருமா') ||
    m.includes('అర్హత') ||
    m.includes('దొరుకుతుందా') ||
    m.includes('వస్తుందా') ||
    m.includes('पात्रता') ||
    m.includes('मिलेगा') ||
    m.includes('मिल सकता') ||
    m.includes('can i get') ||
    m.includes('age') ||
    m.includes('வயது') ||
    m.includes('వయస్సు') ||
    m.includes('उम्र');

  if (isEligibilityQuery) {
    const eligAnswers = {
      'ta-IN': {
        reply: 'உங்கள் தகுதியை பொறுத்து இந்த கடன் கிடைக்கலாம். 18 வயது நிரம்பிய இந்திய பெண்கள், தையல், பால் பண்ணை அல்லது சிறு தொழில் செய்பவர்கள் இதில் விண்ணப்பிக்கலாம். உங்களுக்கு வயது 18 அல்லது அதற்கு மேலா அம்மா?',
        question: 'உங்களுக்கு வயது 18 அல்லது அதற்கு மேலா அம்மா?',
      },
      'te-IN': {
        reply: 'మీ అర్హతను బట్టి ఈ రుణం పొందవచ్చు. 18 సంవత్సరాలు నిండిన భారతీయ మహిళలు, కుట్టు పని లేదా ఏదైనా చిన్న వ్యాపారం చేసేవారు దరఖాస్తు చేసుకోవచ్చు. మీకు 18 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ వయస్సు ఉందా అక్క?',
        question: 'మీకు 18 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ వయస్సు ఉందా అక్క?',
      },
      'hi-IN': {
        reply: 'आपकी योग्यता के आधार पर यह लोन मिल सकता है। 18 वर्ष या उससे अधिक उम्र की भारतीय महिलाएं जो सिलाई या कोई छोटा व्यवसाय शुरू करना चाहती हैं, वे पात्र हैं। क्या आपकी उम्र 18 वर्ष या उससे अधिक है दीदी?',
        question: 'क्या आपकी उम्र 18 वर्ष या उससे अधिक है दीदी?',
      },
      'en-IN': {
        reply: 'You may be eligible based on the scheme criteria. Indian women aged 18 and above who run or wish to start tailoring or a small trade can apply. Are you 18 years of age or older, sister?',
        question: 'Are you 18 years of age or older, sister?',
      },
    };
    const ans = eligAnswers[langCode];
    return {
      reply: ans.reply,
      showScheme: true,
      nextSimpleQuestion: ans.question,
      detectedCategory: 'eligibility',
    };
  }

  // 3. Benefits / Loan Amount Query
  const isAmountQuery =
    m.includes('amount') ||
    m.includes('panam') ||
    m.includes('பணம்') ||
    m.includes('evvalavu') ||
    m.includes('எவ்வளவு') ||
    m.includes('வட்டி') ||
    m.includes('vatti') ||
    m.includes('interest') ||
    m.includes('ரூபாய்') ||
    m.includes('rupees') ||
    m.includes('how much') ||
    m.includes('ఎంత') ||
    m.includes('డబ్బులు') ||
    m.includes('వడ్డీ') ||
    m.includes('రూపాయలు') ||
    m.includes('kitna') ||
    m.includes('रुपये') ||
    m.includes('ब्याज') ||
    m.includes('पैसा') ||
    m.includes('subsidy') ||
    m.includes('benefit');

  if (isAmountQuery) {
    const amountAnswers = {
      'ta-IN': {
        reply: 'பிரதமர் முத்ரா சிசு திட்டத்தில் எந்தவித சொத்து அடமானமும் இல்லாமல் ரூ.50,000 வரை கடன் உதவி கிடைக்கும். இதற்கு விண்ணப்ப கட்டணம் முற்றிலும் இலவசம். உங்களுக்கு எவ்வளவு கடன் தொகை தேவைப்படுகிறது அம்மா?',
        question: 'உங்களுக்கு எவ்வளவு கடன் தொகை தேவைப்படுகிறது அம்மா?',
      },
      'te-IN': {
        reply: 'ప్రధాన మంత్రి ముద్రా శిశు పథకం కింద ఎలాంటి పూచీకత్తు లేకుండా రూ. 50,000 వరకు రుణం లభిస్తుంది. దీనికి దరఖాస్తు రుసుము ఉచితం. మీకు ఎంత రుణం అవసరం అక్క?',
        question: 'మీకు ఎంత రుణం అవసరం అక్క?',
      },
      'hi-IN': {
        reply: 'मुद्रा शिशु योजना के तहत बिना किसी गारंटी के ₹50,000 तक का लोन मिलता है। इसका आवेदन शुल्क शून्य है और ब्याज दर बहुत किफायती है। आपको कितने लोन की आवश्यकता है दीदी?',
        question: 'आपको कितने लोन की आवश्यकता है दीदी?',
      },
      'en-IN': {
        reply: 'Under the PM Mudra Shishu scheme, you can get a collateral-free loan of up to ₹50,000 with zero processing fees. How much financial support do you need for your work, sister?',
        question: 'How much financial support do you need for your work, sister?',
      },
    };
    const ans = amountAnswers[langCode];
    return {
      reply: ans.reply,
      showScheme: true,
      nextSimpleQuestion: ans.question,
      detectedCategory: 'business',
    };
  }

  // 4. Where to Apply / Application Process Query
  const isProcessQuery =
    m.includes('where') ||
    m.includes('enga') ||
    m.includes('எங்கு') ||
    m.includes('எப்படி') ||
    m.includes('apply') ||
    m.includes('eppadi') ||
    m.includes('step') ||
    m.includes('bank') ||
    m.includes('csc') ||
    m.includes('office') ||
    m.includes('center') ||
    m.includes('centre') ||
    m.includes('வங்கி') ||
    m.includes('விண்ணப்பிக்க') ||
    m.includes('ఎక్కడ') ||
    m.includes('ఎలా') ||
    m.includes('దరఖాస్తు') ||
    m.includes('కార్యాలయం') ||
    m.includes('कहाँ') ||
    m.includes('कैसे') ||
    m.includes('आवेदन') ||
    m.includes('फॉर्म') ||
    m.includes('बैंक') ||
    m.includes('form');

  if (isProcessQuery) {
    const processAnswers = {
      'ta-IN': {
        reply: 'நீங்கள் உங்கள் கிராமத்திற்கு அருகிலுள்ள அரசு அல்லது கிராம வங்கி (SBI, Canara, Indian Bank போன்றவை) அல்லது CSC பொது சேவை மையத்திற்கு சென்று முத்ரா சிசு படிவத்தை கேட்டு விண்ணப்பிக்கலாம். உங்கள் ஊருக்கு அருகில் அரசு வங்கி உள்ளதா அம்மா?',
        question: 'உங்கள் ஊருக்கு அருகில் அரசு வங்கி உள்ளதா அம்மா?',
      },
      'te-IN': {
        reply: 'మీరు సమీపంలోని ప్రభుత్వ బ్యాంకు (SBI, Andhra Pragathi, Union Bank మొదలైనవి) లేదా CSC కేంద్రానికి వెళ్లి ముద్రా శిశు దరఖాస్తు ఫారమ్ అడిగి దరఖాస్తు చేసుకోవచ్చు. మీ గ్రామానికి దగ్గరలో బ్యాంకు ఉందా అక్క?',
        question: 'మీ గ్రామానికి దగ్గరలో బ్యాంకు ఉందా అక్క?',
      },
      'hi-IN': {
        reply: 'आप अपने नजदीकी किसी भी सरकारी या ग्रामीण बैंक (जैसे SBI, Canara, PNB) या सीएससी जन सेवा केंद्र पर जाकर प्रधानमंत्री मुद्रा शिशु फॉर्म लेकर आवेदन कर सकती हैं। क्या आपके गांव या कस्बे के पास सरकारी बैंक है दीदी?',
        question: 'क्या आपके गांव या कस्बे के पास सरकारी बैंक है दीदी?',
      },
      'en-IN': {
        reply: 'You can apply by visiting your nearest nationalized or rural bank branch (such as SBI, Canara, Indian Bank) or CSC center and asking for the Mudra Shishu form. Do you have a government bank near your village, sister?',
        question: 'Do you have a government bank near your village, sister?',
      },
    };
    const ans = processAnswers[langCode];
    return {
      reply: ans.reply,
      showScheme: true,
      nextSimpleQuestion: ans.question,
      detectedCategory: 'process',
    };
  }

  // 5. Helpline Query
  const isHelplineQuery =
    m.includes('helpline') ||
    m.includes('phone') ||
    m.includes('number') ||
    m.includes('call') ||
    m.includes('contact') ||
    m.includes('தொலைபேசி') ||
    m.includes('எண்') ||
    m.includes('தொடர்பு') ||
    m.includes('నంబర్') ||
    m.includes('ఫోన్') ||
    m.includes('నెంబర్') ||
    m.includes('नंबर') ||
    m.includes('फोन') ||
    m.includes('सम्पर्क') ||
    m.includes('website') ||
    m.includes('portal');

  if (isHelplineQuery) {
    const helplineAnswers = {
      'ta-IN': {
        reply: 'அதிகாரப்பூர்வ கட்டணமில்லா உதவி எண்கள்: 1800 180 1111 மற்றும் 1800 11 0001. அதிகாரப்பூர்வ இணையதளம்: mudra.org.in. உங்களுக்கு இதில் வேறு ஏதேனும் விவரம் வேண்டுமா அம்மா?',
        question: 'உங்களுக்கு இதில் வேறு ஏதேனும் விவரம் வேண்டுமா அம்மா?',
      },
      'te-IN': {
        reply: 'అధికారిక టోల్ ఫ్రీ హెల్ప్‌లైన్ నంబర్లు: 1800 180 1111 మరియు 1800 11 0001. అధికారిక పోర్టల్: mudra.org.in. మీకు ఇంకా ఏమైనా వివరాలు కావాలా అక్క?',
        question: 'మీకు ఇంకా ఏమైనా వివరాలు కావాలా అక్క?',
      },
      'hi-IN': {
        reply: 'आधिकारिक टोल फ्री हेल्पलाइन नंबर हैं: 1800 180 1111 और 1800 11 0001। आधिकारिक पोर्टल mudra.org.in है। क्या आप योजना के बारे में कुछ और जानना चाहती हैं दीदी?',
        question: 'क्या आप योजना के बारे में कुछ और जानना चाहती हैं दीदी?',
      },
      'en-IN': {
        reply: 'The official toll-free national helpline numbers are 1800 180 1111 and 1800 11 0001. The official website is mudra.org.in. Would you like help with any other detail, sister?',
        question: 'Would you like help with any other detail, sister?',
      },
    };
    const ans = helplineAnswers[langCode];
    return {
      reply: ans.reply,
      showScheme: true,
      nextSimpleQuestion: ans.question,
      detectedCategory: 'helpline',
    };
  }

  // 6. User Affirmation / Simple Answer to Previous Question (e.g. "Yes", "Aama", "18", "Avvalavu dhan")
  const isAffirmation =
    m === 'yes' ||
    m === 'yeah' ||
    m === 'ok' ||
    m === 'aama' ||
    m === 'aamam' ||
    m === 'ஆமாம்' ||
    m === 'ஆமா' ||
    m === 'சரி' ||
    m === 'avunu' ||
    m === 'అవును' ||
    m === 'ha' ||
    m === 'haan' ||
    m === 'हाँ' ||
    m === 'हाँजी' ||
    m.includes('25') ||
    m.includes('30') ||
    m.includes('35') ||
    m.includes('18');

  if (isAffirmation && history.length > 0) {
    const affirmAnswers = {
      'ta-IN': {
        reply: 'மிக்க மகிழ்ச்சி அம்மா! இந்த கடனுக்கு நீங்கள் தையல் அல்லது என்ன தொழில் தொடங்க திட்டமிட்டுள்ளீர்கள் என்று கூற முடியுமா?',
        question: 'நீங்கள் என்ன தொழில் தொடங்க திட்டமிட்டுள்ளீர்கள் அம்மா?',
      },
      'te-IN': {
        reply: 'చాలా సంతోషం అక్క! మీరు కుట్టు పని లేదా ఎలాంటి చిన్న వ్యాపారం ప్రారంభించాలనుకుంటున్నారు?',
        question: 'మీరు ఎలాంటి వ్యాపారం ప్రారంభించాలనుకుంటున్నారు అక్క?',
      },
      'hi-IN': {
        reply: 'बहुत बढ़िया दीदी! आप इस लोन से सिलाई या कौन सा काम शुरू करना चाहती हैं?',
        question: 'आप सिलाई या कौन सा काम शुरू करना चाहती हैं दीदी?',
      },
      'en-IN': {
        reply: 'Wonderful, sister! What small business or tailoring trade are you planning to start or expand?',
        question: 'What small business or tailoring trade are you planning to do, sister?',
      },
    };
    const ans = affirmAnswers[langCode];
    return {
      reply: ans.reply,
      showScheme: true,
      nextSimpleQuestion: ans.question,
      detectedCategory: 'business',
    };
  }

  // 7. General Livelihood / Tailoring / Business Need
  const isBusinessNeed =
    m.includes('tailor') ||
    m.includes('தையல்') ||
    m.includes('மெஷின்') ||
    m.includes('sewing') ||
    m.includes('dairy') ||
    m.includes('பால்') ||
    m.includes('மாடு') ||
    m.includes('வியாபாரம்') ||
    m.includes('தொழில்') ||
    m.includes('கடன்') ||
    m.includes('loan') ||
    m.includes('business') ||
    m.includes('shop') ||
    m.includes('కుట్టు') ||
    m.includes('వ్యాపారం') ||
    m.includes('పాడి') ||
    m.includes('సिलाई') ||
    m.includes('दुकान') ||
    m.includes('लोन');

  if (isBusinessNeed) {
    const bizAnswers = {
      'ta-IN': {
        reply: 'தையல் மற்றும் சிறு தொழில் தொடங்க அரசு வழங்கும் பிரதமர் முத்ரா சிசு கடன் மூலம் ரூ.50,000 வரை பிணையில்லா கடன் பெறலாம். உங்களிடம் ஆதார் அட்டை மற்றும் வங்கி கணக்கு புத்தகம் உள்ளதா அம்மா?',
        question: 'உங்களிடம் ஆதார் அட்டை மற்றும் வங்கி கணக்கு புத்தகம் உள்ளதா அம்மா?',
      },
      'te-IN': {
        reply: 'కుట్టు పని లేదా చిన్న వ్యాపారం కోసం ప్రభుత్వ ముద్రా శిశు పథకం కింద రూ. 50,000 వరకు పూచీకత్తు లేని రుణం పొందవచ్చు. మీ వద్ద ఆధార్ కార్డు మరియు బ్యాంకు ఖాతా ఉందా అక్క?',
        question: 'మీ వద్ద ఆధార్ కార్డు మరియు బ్యాంకు ఖాతా ఉందా అక్క?',
      },
      'hi-IN': {
        reply: 'सिलाई या छोटे काम के लिए प्रधानमंत्री मुद्रा शिशु योजना के तहत ₹50,000 तक का बिना गारंटी लोन मिलता है। क्या आपके पास आधार कार्ड और बैंक पासबुक है दीदी?',
        question: 'क्या आपके पास आधार कार्ड और बैंक पासबुक है दीदी?',
      },
      'en-IN': {
        reply: 'For tailoring and small businesses, the PM Mudra Shishu scheme provides up to ₹50,000 in collateral-free loans. Do you have an Aadhaar card and a bank passbook, sister?',
        question: 'Do you have an Aadhaar card and a bank passbook, sister?',
      },
    };
    const ans = bizAnswers[langCode];
    return {
      reply: ans.reply,
      showScheme: true,
      nextSimpleQuestion: ans.question,
      detectedCategory: 'business',
    };
  }

  // 8. General Greeting / Fallback
  const defaultAnswers = {
    'ta-IN': {
      reply: 'வணக்கம் சகோதரி! நான் ஆவாஸ் ஏஐ. கிராமப்புற மகளிர் சுயதொழில் தொடங்க அரசு கடன் திட்டங்களை எளிதாக பெற வழிகாட்டுகிறேன். உங்களுக்கு என்ன உதவி தேவைப்படுகிறது அம்மா?',
      question: 'உங்களுக்கு என்ன உதவி தேவைப்படுகிறது அம்மா?',
    },
    'te-IN': {
      reply: 'నమస్కారం అక్క! నేను ఆవాజ్ ఏఐ. గ్రామీణ మహిళలు స్వయం ఉపాధి రుణాలు పొందడానికి సహాయం చేస్తాను. మీకు ఎలాంటి సమాచారం కావాలి?',
      question: 'మీకు ఎలాంటి సమాచారం కావాలి అక్క?',
    },
    'hi-IN': {
      reply: 'नमस्ते दीदी! मैं आवाज़ एआई हूँ। ग्रामीण महिलाओं को सरकारी ऋण सहायता दिलाने में मदद करती हूँ। आप किस काम के लिए मदद चाहती हैं?',
      question: 'आप किस काम के लिए मदद चाहती हैं दीदी?',
    },
    'en-IN': {
      reply: 'Hello sister! I am AwaazAI. I help rural women access verified government livelihood schemes like Mudra Shishu. How can I help you today?',
      question: 'How can I help you today, sister?',
    },
  };
  const ans = defaultAnswers[langCode];
  return {
    reply: ans.reply,
    showScheme: true,
    nextSimpleQuestion: ans.question,
    detectedCategory: 'general',
  };
}

// Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = 'en-IN', history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const langCode = normalizeLangCode(language);
    const langNames: Record<string, string> = {
      'ta-IN': 'Tamil (தமிழ் script ONLY)',
      'te-IN': 'Telugu (తెలుగు script ONLY)',
      'hi-IN': 'Hindi (हिन्दी Devanagari script ONLY)',
      'en-IN': 'English',
    };

    // Format conversation prompt strictly emphasizing direct answer first
    const conversationPrompt = `
User selected language: "${langCode}" -> MUST REPLY IN ${langNames[langCode]}.
User's latest message: "${message}"

Recent conversation history:
${(history || [])
  .slice(-6)
  .map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.text}`)
  .join('\n')}

INSTRUCTIONS:
1. Identify the user's CURRENT question or need.
2. Give a DIRECT answer to what they asked first (e.g. if asking for eligibility, answer eligibility; if asking for documents, list documents; if asking for amount, state amount; if asking where to apply, name the bank/CSC; if asking helpline, give helpline).
3. Do NOT repeat the entire scheme description.
4. Then ask only ONE simple follow-up question if needed.
5. Keep answers short, conversational, and in ${langNames[langCode]}.
6. Respond in valid JSON matching the schema.
`;

    if (apiKey) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: conversationPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.5,
          },
        });

        const rawText = response.text || '{}';
        let parsed;
        try {
          parsed = JSON.parse(rawText);
        } catch {
          parsed = null;
        }

        if (parsed && parsed.reply && typeof parsed.reply === 'string') {
          return res.json({
            reply: parsed.reply.trim(),
            showScheme: Boolean(parsed.showScheme ?? true),
            nextSimpleQuestion: parsed.nextSimpleQuestion || '',
            detectedCategory: parsed.detectedCategory || 'general',
            langCode,
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API query error, using direct question-answer engine:', geminiError?.message);
      }
    }

    // Direct, verified question-answer logic matching exact user question
    const directResult = generateDirectAnswer(message, langCode, history);
    return res.json({
      reply: directResult.reply,
      showScheme: directResult.showScheme,
      nextSimpleQuestion: directResult.nextSimpleQuestion,
      detectedCategory: directResult.detectedCategory,
      langCode,
    });
  } catch (error: any) {
    console.error('Error handling chat:', error);
    return res.status(500).json({
      error: 'An internal error occurred. Please try again.',
      details: error?.message,
    });
  }
});

// In-memory cache for audio snippets (like language greetings and full AI responses)
const audioSnippetCache = new Map<string, string>();

// Reliable TTS synthesis function for complete regional language coverage (Tamil, Telugu, Hindi, English)
async function synthesizeFullAudio(fullText: string, langCode: string): Promise<string | null> {
  const shortLang = langCode.split('-')[0] || 'ta';

  // Split into chunks under 150 characters by sentence boundaries or spaces
  const sentences = fullText
    .split(/(?<=[.?!।\n,])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const chunks: string[] = [];
  for (const s of sentences) {
    if (s.length <= 150) {
      chunks.push(s);
    } else {
      const words = s.split(' ');
      let current = '';
      for (const w of words) {
        if ((current + ' ' + w).trim().length <= 150) {
          current = (current + ' ' + w).trim();
        } else {
          if (current) chunks.push(current);
          current = w;
        }
      }
      if (current) chunks.push(current);
    }
  }

  try {
    const https = await import('https');
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${shortLang}&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      const buf = await new Promise<Buffer>((resolve, reject) => {
        https.get(
          url,
          { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
          (response) => {
            if (response.statusCode !== 200) {
              return reject(new Error(`Translate TTS status: ${response.statusCode}`));
            }
            const dataChunks: Buffer[] = [];
            response.on('data', (c) => dataChunks.push(c));
            response.on('end', () => resolve(Buffer.concat(dataChunks)));
          }
        ).on('error', reject);
      });
      audioBuffers.push(buf);
    }

    if (audioBuffers.length > 0) {
      const combined = Buffer.concat(audioBuffers);
      return `data:audio/mp3;base64,${combined.toString('base64')}`;
    }
  } catch (err: any) {
    console.warn('Synthesis fallback error:', err?.message);
  }
  return null;
}

// Server-side TTS Endpoint with Gemini TTS + Reliable Regional Audio Fallback
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language = 'ta-IN' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const cleanText = text.trim();
    const cacheKey = `${language}:${cleanText}`;
    if (audioSnippetCache.has(cacheKey)) {
      return res.json({
        audioData: audioSnippetCache.get(cacheKey),
        source: 'cache',
      });
    }

    // Attempt 1: Gemini TTS model if available
    if (apiKey) {
      try {
        const langVoiceHints: Record<string, string> = {
          'ta-IN': 'Speak clearly in fluent, natural colloquial Tamil: ',
          'te-IN': 'Speak clearly in fluent, natural colloquial Telugu: ',
          'hi-IN': 'Speak clearly in fluent, natural Hindi: ',
          'en-IN': 'Speak clearly in warm Indian English: ',
        };
        const hint = langVoiceHints[language] || '';

        const ttsResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash-lite-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${hint}${cleanText}`,
                  speechMetadata: {
                    style: 'Clear, warm, friendly Indian woman voice',
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' },
              },
            },
          },
        });

        const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const audioUri = `data:audio/wav;base64,${base64Audio}`;
          audioSnippetCache.set(cacheKey, audioUri);
          return res.json({
            audioData: audioUri,
            source: 'gemini-tts',
          });
        }
      } catch (geminiTtsErr: any) {
        console.warn('Gemini TTS service quota/error, switching to reliable regional audio synthesizer:', geminiTtsErr?.message);
      }
    }

    // Attempt 2: Reliable regional language synthesis for Tamil, Telugu, Hindi, English
    const fallbackAudio = await synthesizeFullAudio(cleanText, language);
    if (fallbackAudio) {
      audioSnippetCache.set(cacheKey, fallbackAudio);
      return res.json({
        audioData: fallbackAudio,
        source: 'regional-tts',
      });
    }

    return res.json({
      audioData: null,
      source: 'none',
    });
  } catch (err: any) {
    console.error('Error generating TTS:', err);
    return res.status(500).json({ error: err?.message });
  }
});

// Setup Vite in Dev or Static Files in Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`AwaazAI server running on http://localhost:${PORT}`);
  });
}

startServer();
