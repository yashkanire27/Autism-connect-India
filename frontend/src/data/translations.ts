import { LanguageCode } from '../types';

export interface TranslationDictionary {
  navHome: string;
  navLearn: string;
  navGuidance: string;
  navActivities: string;
  navCommunity: string;
  navFundraising: string;
  navResources: string;
  navLogin: string;
  navGetStarted: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroExploreCta: string;
  heroLearnCta: string;
  disclaimerTitle: string;
  disclaimerBody: string;
  bentoTitle: string;
  bentoSubtitle: string;
  bentoLearnTitle: string;
  bentoLearnDesc: string;
  bentoGuidanceTitle: string;
  bentoGuidanceDesc: string;
  bentoCommunityTitle: string;
  bentoCommunityDesc: string;
  bentoResourcesTitle: string;
  bentoResourcesDesc: string;
  bentoFundraisingTitle: string;
  bentoFundraisingDesc: string;
  bentoMultiTitle: string;
  bentoMultiDesc: string;
  guidanceHeading: string;
  guidanceSubheading: string;
  guidanceStartBtn: string;
  communityHeading: string;
  communitySubheading: string;
  communityJoinBtn: string;
  fundraisingHeading: string;
  fundraisingSubheading: string;
  fundraisingSupportBtn: string;
  resourcesHeading: string;
  resourcesSubheading: string;
  resourcesSearchPlaceholder: string;
  footerTagline: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    navHome: 'Home',
    navLearn: 'Learn',
    navGuidance: 'Early Guidance',
    navActivities: 'Activities',
    navCommunity: 'Community',
    navFundraising: 'Fundraising',
    navResources: 'Resources',
    navLogin: 'Log In',
    navGetStarted: 'Get Started',
    heroBadge: 'A supportive digital space for every parent',
    heroTitle: "You're not alone on this journey.",
    heroSubtitle: 'Discover trusted information, early guidance, community support, and resources — all in one place.',
    heroExploreCta: 'Explore Autism Connect',
    heroLearnCta: 'Learn About Autism',
    disclaimerTitle: 'General Support & Information Notice',
    disclaimerBody: 'This platform provides educational information and early guidance. It is NOT a medical diagnosis. Always consult certified pediatric professionals for medical evaluations.',
    bentoTitle: 'Support that starts with understanding.',
    bentoSubtitle: 'Everything parents and caregivers need to learn, connect, and take the next step.',
    bentoLearnTitle: 'Learn & Understand',
    bentoLearnDesc: 'Clear, compassionate autism information, awareness, and evidence-based educational guides.',
    bentoGuidanceTitle: 'Early Guidance',
    bentoGuidanceDesc: 'Structured developmental checklists to help observe behaviors and prepare for consultations.',
    bentoCommunityTitle: 'Parent Community',
    bentoCommunityDesc: 'A warm, safe place to connect with other caregivers, share real experiences, and exchange guidance.',
    bentoResourcesTitle: 'Find Resources',
    bentoResourcesDesc: 'Centralized access to verified therapists, special educators, government programs, and tools.',
    bentoFundraisingTitle: 'Support & Fundraising',
    bentoFundraisingDesc: 'Help children access therapy, special equipment, and education through transparent campaigns.',
    bentoMultiTitle: 'Multilingual Support',
    bentoMultiDesc: 'Access guidance and community in English, Marathi, Hindi, Bengali, Tamil, and more.',
    guidanceHeading: 'Take the first step with confidence.',
    guidanceSubheading: 'Use our interactive early guidance tool to observe behavioral milestones and prepare for healthcare conversations.',
    guidanceStartBtn: 'Start Guidance Check',
    communityHeading: 'A community that understands.',
    communitySubheading: 'Connect with parents who have walked in your shoes and shared their stories.',
    communityJoinBtn: 'Join the Community',
    fundraisingHeading: 'Help make support more accessible.',
    fundraisingSubheading: 'Direct community fundraising to help families afford critical therapy and education tools.',
    fundraisingSupportBtn: 'Support This Campaign',
    resourcesHeading: 'Learn. Understand. Take action.',
    resourcesSubheading: 'Explore our library of curated guides, expert articles, and practical parenting strategies.',
    resourcesSearchPlaceholder: 'Search articles, therapies, guides...',
    footerTagline: 'Connecting parents with information, support, and hope.',
  },
  mr: {
    navHome: 'मुख्यपृष्ठ',
    navLearn: 'शीका',
    navGuidance: 'प्रारंभिक मार्गदर्शन',
    navActivities: 'कृती उपक्रम',
    navCommunity: 'समुदाय',
    navFundraising: 'निधी उभारणी',
    navResources: 'संसाधने',
    navLogin: 'लॉग इन',
    navGetStarted: 'प्रारंभ करा',
    heroBadge: 'प्रत्येक पालकासाठी एक सहाय्यक डिजिटल जागा',
    heroTitle: 'या प्रवासात तुम्ही एकटे नाही आहात.',
    heroSubtitle: 'विश्वसनीय माहिती, प्रारंभिक मार्गदर्शन, समुदाय पाठिंबा आणि संसाधने — सर्व एकाच ठिकाणी मिळवा.',
    heroExploreCta: 'ऑटिझम कनेक्ट एक्सप्लोर करा',
    heroLearnCta: 'ऑटिझमबद्दल जाणून घ्या',
    disclaimerTitle: 'सामान्य सहाय्य आणि माहिती सूचना',
    disclaimerBody: 'हे प्लॅटफॉर्म शैक्षणिक माहिती आणि प्रारंभिक मार्गदर्शन प्रदान करते. हे वैद्यकीय निदान नाही.',
    bentoTitle: 'समजूतदारपणाने सुरू होणारा पाठिंबा.',
    bentoSubtitle: 'पालक आणि काळजीवाहूंना शिकण्यासाठी, जोडण्यासाठी आणि पुढचे पाऊल उचलण्यासाठी आवश्यक ते सर्व.',
    bentoLearnTitle: 'शीका आणि समजून घ्या',
    bentoLearnDesc: 'ऑटिझमबद्दल स्पष्ट, संवेदनशील माहिती आणि शैक्षणिक मार्गदर्शक.',
    bentoGuidanceTitle: 'प्रारंभिक मार्गदर्शन',
    bentoGuidanceDesc: 'वर्तनाचे निरीक्षण करण्यासाठी आणि डॉक्टरांशी चर्चेसाठी उपयुक्त चेकलिस्ट.',
    bentoCommunityTitle: 'पालक समुदाय',
    bentoCommunityDesc: 'इतर काळजीवाहूंशी जोडण्यासाठी आणि अनुभव शेअर करण्यासाठी एक सुरक्षित जागा.',
    bentoResourcesTitle: 'संसाधने शोधा',
    bentoResourcesDesc: 'थेरपिस्ट, विशेष शिक्षक आणि सरकारी योजनांची एकत्रित माहिती.',
    bentoFundraisingTitle: 'सहाय्य आणि निधी उभारणी',
    bentoFundraisingDesc: 'थेरपी आणि शिक्षणासाठी पारदर्शक मोहिमांद्वारे मदत करा.',
    bentoMultiTitle: 'बहुभाषिक पाठिंबा',
    bentoMultiDesc: 'मराठी, हिंदी, इंग्रजी आणि इतर प्रादेशिक भाषांमध्ये उपलब्ध.',
    guidanceHeading: 'आत्मविश्वासाने पहिले पाऊल उचला.',
    guidanceSubheading: 'पालकांसाठी तयार केलेल्या आपल्या मार्गदर्शक साधनाद्वारे मुख्य टप्पे समजून घ्या.',
    guidanceStartBtn: 'तपासणी सुरू करा',
    communityHeading: 'तुम्हाला समजून घेणारा समुदाय.',
    communitySubheading: 'अनुभवी पालकांशी संवाद साधा आणि तुमचे विचार शेअर करा.',
    communityJoinBtn: 'समुदायात सामील व्हा',
    fundraisingHeading: 'मदत अधिक सुलभ बनवण्यास मदत करा.',
    fundraisingSubheading: 'गरजू बालकांसाठी थेरपी आणि शिक्षणासाठी थेट निधी उभारणी.',
    fundraisingSupportBtn: 'या मोहिमेस मदत करा',
    resourcesHeading: 'शीका. समजून घ्या. कृती करा.',
    resourcesSubheading: 'आमच्या मार्गदर्शक आणि तज्ज्ञांच्या लेखांचे वाचन करा.',
    resourcesSearchPlaceholder: 'लेख, थेरपी, मार्गदर्शक शोधा...',
    footerTagline: 'पालकांना माहिती, पाठिंबा आणि आशेने जोडत आहे.',
  },
  hi: {
    navHome: 'होम',
    navLearn: 'जानें',
    navGuidance: 'शुरुआती मार्गदर्शन',
    navActivities: 'गतिविधियां',
    navCommunity: 'समुदाय',
    navFundraising: 'फंडरेजिंग',
    navResources: 'संसाधन',
    navLogin: 'लॉग इन',
    navGetStarted: 'शुरू करें',
    heroBadge: 'हर माता-पिता के लिए एक सहायक डिजिटल मंच',
    heroTitle: 'आप इस यात्रा में अकेले नहीं हैं।',
    heroSubtitle: 'विश्वसनीय जानकारी, शुरुआती मार्गदर्शन, सामुदायिक सहायता और संसाधन — सब एक ही स्थान पर।',
    heroExploreCta: 'ऑटिज्म कनेक्ट देखें',
    heroLearnCta: 'ऑटिज्म के बारे में जानें',
    disclaimerTitle: 'सामान्य सहायता एवं सूचना संदेश',
    disclaimerBody: 'यह मंच केवल शैक्षणिक जानकारी और मार्गदर्शन प्रदान करता है। यह डॉक्टरी जांच या मेडिकल डायग्नोसिस नहीं है।',
    bentoTitle: 'समझ के साथ शुरू होने वाला सहयोग।',
    bentoSubtitle: 'माता-पिता और देखभाल करने वालों के लिए सीखने, जुड़ने और अगला कदम उठाने का पूरा मंच।',
    bentoLearnTitle: 'सीखें और समझें',
    bentoLearnDesc: 'ऑटिज्म के बारे में स्पष्ट, संवेदनशील जानकारी और शैक्षणिक गाइड।',
    bentoGuidanceTitle: 'शुरुआती मार्गदर्शन',
    bentoGuidanceDesc: 'व्यवहार को समझने और डॉक्टर से सलाह के लिए उपयोगी चेकलिस्ट।',
    bentoCommunityTitle: 'अभिभावक समुदाय',
    bentoCommunityDesc: 'अन्य माता-पिता से जुड़ने और अनुभव साझा करने का सुरक्षित मंच।',
    bentoResourcesTitle: 'संसाधन खोजें',
    bentoResourcesDesc: 'थेरेपिस्ट, विशेष शिक्षकों और सरकारी योजनाओं की प्रामाणिक जानकारी।',
    bentoFundraisingTitle: 'सहयोग और फंडरेजिंग',
    bentoFundraisingDesc: 'थेरेपी और शिक्षा के लिए पारदर्शी अभियानों द्वारा मदद करें।',
    bentoMultiTitle: 'बहुभाषी सहायता',
    bentoMultiDesc: 'हिंदी, मराठी, अंग्रेजी और अन्य भारतीय भाषाओं में उपलब्ध।',
    guidanceHeading: 'आत्मविश्वास के साथ पहला कदम उठाएं।',
    guidanceSubheading: 'विकास के मुख्य चरणों को समझें और डॉक्टर से परामर्श की तैयारी करें।',
    guidanceStartBtn: 'जांच शुरू करें',
    communityHeading: 'एक समुदाय जो समझता है।',
    communitySubheading: 'समान अनुभवों वाले अभिभावकों से जुड़ें और सलाह लें।',
    communityJoinBtn: 'समुदाय में शामिल हों',
    fundraisingHeading: 'सहायता को सुलभ बनाने में मदद करें।',
    fundraisingSubheading: 'थेरेपी और शिक्षा उपकरणों के लिए सीधी सामुदायिक सहायता।',
    fundraisingSupportBtn: 'अभियान का समर्थन करें',
    resourcesHeading: 'सीखें। समझें। कदम बढ़ाएं।',
    resourcesSubheading: 'विशेषज्ञ लेखों और उपयोगी गाइड का संग्रह देखें।',
    resourcesSearchPlaceholder: 'लेख, थेरेपी, गाइड खोजें...',
    footerTagline: 'माता-पिता को जानकारी, संबल और उम्मीद से जोड़ना।',
  },
  bn: {
    navHome: 'হোম',
    navLearn: 'জানুন',
    navGuidance: 'প্রাথমিক দিকনির্দেশনা',
    navActivities: 'কার্যক্রম',
    navCommunity: 'কমিউনিটি',
    navFundraising: 'তহবিল সংগ্রহ',
    navResources: 'সম্পদমালা',
    navLogin: 'লগ ইন',
    navGetStarted: 'শুরু করুন',
    heroBadge: 'প্রতিটি অভিভাবকের জন্য একটি সহায়ক ডিজিটাল প্ল্যাটফর্ম',
    heroTitle: 'এই যাত্রায় আপনি একা নন।',
    heroSubtitle: 'নির্ভরযোগ্য তথ্য, প্রাথমিক দিকনির্দেশনা, সামাজিক সহায়তা এবং সম্পদ — সবই এক জায়গায়।',
    heroExploreCta: 'অটিজম কানেক্ট এক্সপ্লোর করুন',
    heroLearnCta: 'অটিজম সম্পর্কে জানুন',
    disclaimerTitle: 'সাধারণ সহায়তা এবং তথ্য সম্পর্কিত নোটিশ',
    disclaimerBody: 'এই প্ল্যাটফর্মটি শিক্ষামূলক তথ্য এবং প্রাথমিক দিকনির্দেশনা প্রদান করে। এটি কোনো চিকিৎসাগত ডায়াগনোসিস নয়।',
    bentoTitle: 'উপলব্ধি দিয়ে শুরু হয় সহায়তা।',
    bentoSubtitle: 'অভিভাবক এবং পরিচর্যাকারীদের শেখা, যোগাযোগ এবং পরবর্তী পদক্ষেপ নেওয়ার জন্য প্রয়োজনীয় সবকিছু।',
    bentoLearnTitle: 'শিখুন এবং বুঝুন',
    bentoLearnDesc: 'অটিজম সম্পর্কিত স্পষ্ট, সহানুভূতিশীল তথ্য এবং নির্দেশিকা।',
    bentoGuidanceTitle: 'প্রাথমিক দিকনির্দেশনা',
    bentoGuidanceDesc: 'আচরণ লক্ষ্য করা এবং চিকিৎসকের পরামর্শের জন্য উপযোগী চেকলিস্ট।',
    bentoCommunityTitle: 'অভিভাবক কমিউনিটি',
    bentoCommunityDesc: 'অন্যান্য অভিভাবকদের সাথে যোগাযোগ ও অভিজ্ঞতা ভাগ করার নিরাপদ স্থান।',
    bentoResourcesTitle: 'সম্পদ অনুসন্ধান',
    bentoResourcesDesc: 'থেরাপিস্ট, বিশেষ শিক্ষাবিদ এবং সরকারি সহায়তার তথ্যসূচি।',
    bentoFundraisingTitle: 'সহায়তা ও তহবিল সংগ্রহ',
    bentoFundraisingDesc: 'থেরাপি ও শিক্ষার জন্য স্বচ্ছ অভিযানের মাধ্যমে সাহায্য করুন।',
    bentoMultiTitle: 'বহুভাষিক সহায়তা',
    bentoMultiDesc: 'বাংলা, হিন্দি, ইংরেজি এবং অন্যান্য ভাষায় ব্যবহারযোগ্য।',
    guidanceHeading: 'আত্মবিশ্বাসের সাথে প্রথম পদক্ষেপ নিন।',
    guidanceSubheading: 'আমাদের ইন্টারেক্টিভ গাইডের সাহায্যে আচরণের বিকাশ পর্যবেক্ষণ করুন।',
    guidanceStartBtn: 'যাচাই শুরু করুন',
    communityHeading: 'একটি সহানুভূতিশীল কমিউনিটি।',
    communitySubheading: 'অভিজ্ঞ অভিভাবকদের সাথে যুক্ত হন এবং আপনার মতামত শেয়ার করুন।',
    communityJoinBtn: 'কমিউনিটিতে যোগ দিন',
    fundraisingHeading: 'সহায়তাকে সহজলভ্য করতে সাহায্য করুন।',
    fundraisingSubheading: 'শিশুদের থেরাপি ও শিক্ষার সহায়তায় তহবিল প্রদান করুন।',
    fundraisingSupportBtn: 'সহযোগিতা করুন',
    resourcesHeading: 'শিখুন। বুঝুন। পদক্ষেপ নিন।',
    resourcesSubheading: 'আমাদের বিশেষজ্ঞ নিবন্ধ এবং টিপস পড়ুন।',
    resourcesSearchPlaceholder: 'নিবন্ধ, থেরাপি, গাইড খুঁজুন...',
    footerTagline: 'অভিভাবকদের তথ্য, সহায়তা এবং আশার আলোতে যুক্ত করা।',
  },
  ta: {
    navHome: 'முகப்பு',
    navLearn: 'கற்றல்',
    navGuidance: 'ஆரம்ப வழிகாட்டுதல்',
    navActivities: 'செயல்பாடுகள்',
    navCommunity: 'சமூகம்',
    navFundraising: 'நிதி திரட்டல்',
    navResources: 'வளங்கள்',
    navLogin: 'உள்நுழைவு',
    navGetStarted: 'தொடங்குங்கள்',
    heroBadge: 'ஒவ்வொரு பெற்றோருக்குமான ஆதரவு டிஜிட்டல் தளம்',
    heroTitle: 'இந்தப் பயணத்தில் நீங்கள் தனியாக இல்லை.',
    heroSubtitle: 'நம்பகமான தகவல்கள், ஆரம்ப வழிகாட்டுதல், சமூக ஆதரவு மற்றும் வளங்கள் — அனைத்தும் ஒரே இடத்தில்.',
    heroExploreCta: 'ஆட்டிசம் கனெக்ட் பார்க்க',
    heroLearnCta: 'ஆட்டிசம் பற்றி அறிய',
    disclaimerTitle: 'பொதுவான உதவி மற்றும் தகவல் குறிப்பு',
    disclaimerBody: 'இத்தளம் கல்வித் தகவல்களையும் வழிகாட்டுதலையும் மட்டுமே வழங்குகிறது. இது மருத்துவ பரிசோதனை அல்ல.',
    bentoTitle: 'புரிதலுடன் தொடங்கும் ஆதரவு.',
    bentoSubtitle: 'பெற்றோர்களும் பராமரிப்பாளர்களும் கற்க, இணைய மற்றும் அடுத்த கட்டம் செல்ல தேவையான அனைத்தும்.',
    bentoLearnTitle: 'கற்க மற்றும் புரிய',
    bentoLearnDesc: 'ஆட்டிசம் பற்றிய தெளிவான மற்றும் அன்பான கல்வி வழிகாட்டிகள்.',
    bentoGuidanceTitle: 'ஆரம்ப வழிகாட்டுதல்',
    bentoGuidanceDesc: 'நடத்தைகளை அவதானித்து மருத்துவ ஆலோசனைகளுக்கு தயாராக உதவும் பட்டியல்.',
    bentoCommunityTitle: 'பெற்றோர் சமூகம்',
    bentoCommunityDesc: 'மற்ற பராமரிப்பாளர்களுடன் இணைந்து அனுபவங்களைப் பகிர்ந்து கொள்ளும் பாதுகாப்பான இடம்.',
    bentoResourcesTitle: 'வளங்களைக் கண்டறிய',
    bentoResourcesDesc: 'சிகிச்சையாளர்கள், சிறப்பு ஆசிரியர்கள் மற்றும் அரசு திட்டங்களின் விவரங்கள்.',
    bentoFundraisingTitle: 'ஆதரவு மற்றும் நிதி திரட்டல்',
    bentoFundraisingDesc: 'சிகிச்சை மற்றும் கல்விக்கு வெளிப்படையான முறையில் நிதி உதவி செய்யுங்கள்.',
    bentoMultiTitle: 'பலமொழி ஆதரவு',
    bentoMultiDesc: 'தமிழ், ஆங்கிலம், இந்தி, மராத்தி போன்ற பல மொழிகளில் கிடைக்கிறது.',
    guidanceHeading: 'நம்பிக்கையுடன் முதல் அடியை எடுத்து வையுங்கள்.',
    guidanceSubheading: 'வளர்ச்சி நிலைகளை அவதானிக்க எங்கள் வழிகாட்டி கருவியைப் பயன்படுத்துங்கள்.',
    guidanceStartBtn: 'சோதனையைத் தொடங்குங்கள்',
    communityHeading: 'உங்களை உணரும் ஒரு சமூகம்.',
    communitySubheading: 'அனுபவமிக்க பெற்றோருடன் கலந்துரையாடி உங்கள் கதைகளைப் பகிர்ந்து கொள்ளுங்கள்.',
    communityJoinBtn: 'சமூகத்தில் இணையுங்கள்',
    fundraisingHeading: 'ஆதரவை எளிதாக்க உதவுங்கள்.',
    fundraisingSubheading: 'குழந்தைகளின் சிகிச்சை மற்றும் கல்விக்கான நேரடி நிதி உதவி.',
    fundraisingSupportBtn: 'ஆதரவு அளிக்கவும்',
    resourcesHeading: 'கற்க. புரிய. நடவடிக்கை எடுக்க.',
    resourcesSubheading: 'எங்கள் நிபுணர் கட்டுரைகள் மற்றும் வழிகாட்டிகளைப் படியுங்கள்.',
    resourcesSearchPlaceholder: 'கட்டுரைகள், சிகிச்சைகள் தேட...',
    footerTagline: 'பெற்றோரைத் தகவல், ஆதரவு மற்றும் நம்பிக்கையோடு இணைக்கிறது.',
  }
};
